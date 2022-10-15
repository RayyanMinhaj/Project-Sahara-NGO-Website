const client = init();

function init() {
	return supabase.createClient(
		'https://zjesbzduygemrdprcvvq.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
	);
}

const form = document.querySelector('form')

async function supabaseLogin(obj) {
	client.auth.signInWithPassword({
		email: obj.email,
		password: obj.password
	})
		.then((response) => {
			if (response.error == null) {
				const button = document.getElementById('submit-btn')
				button.innerHTML = 'Logging In'
				setTimeout(() => {
					window.location.href = "donorpage.html"
				}, 3000)
			}

			else {
				alert("Incorrect password. Please try again")
				document.getElementById("pass").value = "";
			}
		})
}

function logIn() {
	form.addEventListener("submit", (event) => {
		event.preventDefault()
		const formData = new FormData(form)
		const email = formData.get("email")
		const password = formData.get("pass")
		client
			.from('Users')
			.select('Email')
			.eq('Email', email)
			.then((response) => {
				if (response.data.length == 0) {
					alert("Email does not exist. Please sign up")
					console.log(response)
					console.log(email)
					setTimeout(() => {
						window.location.href = "signup.html"
					}, 3000)
				}
				else {
					supabaseLogin({ email, password })
				}
			})
	})
}

function donorPage(email) {

}

logIn()