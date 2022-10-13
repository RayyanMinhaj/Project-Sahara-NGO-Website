const client = init();

function init() {
	return supabase.createClient(
		'https://zjesbzduygemrdprcvvq.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
	);
}

const form = document.querySelector('form')

async function logUser(obj) {
	const { data, error } = await client
		.from('Users')
		.insert(obj)
	console.log(data, error)

	specialization(obj)
}

function specialization(obj) {
	client
		.from('Users')
		.select('id')
		.order('id', { ascending: false })
		.limit(1)
		.then((response) => {
			if (obj.Role == "Donor") {
				const id = response.data[0].id
				client
					.from('Donors')
					.insert([{ id: id }])
					.then((response) => {
						console.log(response)
					})
			}
		}
		)
}

async function signupUserSupabase(obj) {
	let { user, error } = await client.auth.signUp({
		email: obj.Email, password: obj.Password
	})
	if (error) {
		console.log(obj.password)
		alert(error.message)
		console.log(error)
	}
	else {
		console.log(user)
	}
}

async function signup() {
	form.addEventListener("submit", (event) => {
		event.preventDefault()
		const formData = new FormData(form)
		const email = formData.get("email")


		client
			.from('Users')
			.select('Email')
			.eq('Email', email)
			.then((response) => {
				if (response.data.length > 0) {
					alert("Email already exists")
					setTimeout(() => {
						window.location.href = "login.html"
					}, 3000)
					return
				}
			})


		const password = formData.get("password")
		const password2 = formData.get("password2")
		const Fname = formData.get("first_name")
		const Lname = formData.get("last_name")
		const DOB = formData.get("birthday")
		let gender = ""
		const genderM = formData.get("gendermale")
		if (genderM == "on") {
			gender = "Male"
		} else { gender = "Female" }
		const phone = formData.get("phone")
		const position = formData.get("subject")
		if (password == password2) {
			const filler = {
				// id : 0,				Enable when need to reset counter!
				First_Name: Fname,
				Last_Name: Lname,
				Email: email,
				Gender: gender,
				Phone_Num: phone,
				DOB: DOB,
				Role: position
			}
			const supaUser = {
				Email: email,
				Password: password
			}
			console.log(filler)
			signupUserSupabase(supaUser)
			logUser(filler)


			setTimeout(() => {
				window.location.href = "login.html"
			}, 3000)


		}
		else {
			alert("Passwords do not match")
		}
	})

	// for debugging purposes
	// const { data, error } = await client
	// 	.from('Users')
	// 	.insert([
	// 		{ First_Name: 'Ayihan', Last_Name: 'Haq', Email: 'ayihan@gmail.com' , Gender: 'Male', Phone_Num: '1234567890', DOB: '2000-01-01', Role: 'Student' },
	// 	])
	// 	console.log(data, error)

}
signup()