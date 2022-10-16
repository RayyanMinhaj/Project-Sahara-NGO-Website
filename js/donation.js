const client = init();

function init() {
	return supabase.createClient(
		'https://zjesbzduygemrdprcvvq.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
	);
}

const form = document.querySelector('form')

async function editdonor(obj) {
	// select the id from the Users table where email = obj.email.
	client
		.from('Users')
		.select('id')
		.eq('Email', obj.Email)
		.then((response) => {
			// select the donor_id from the Donors table where id = id from the Users table.
			client
				.from('Donors')
				.select('donor_id, amount_donated, points')
				.eq('id', response.data[0].id)
				.then((response) => {
					// add obj.amount to the amount_donated column from the Donors table.
					obj.amount_donated = response.data[0].amount_donated
					obj.pointsearned = response.data[0].points
					obj.donor_id = response.data[0].donor_id
					client
						.from('Donors')
						.update({ amount_donated: parseInt(obj.amount_donated) + parseInt(obj.amount), points: parseInt(obj.pointsearned) + parseInt(obj.amount) * 50 })
						.eq('donor_id', response.data[0].donor_id)
						.then((response) => {
							console.log(response)
							// add donor_id to the obj
							donation(obj)
						})
				})
		})
}

function donation(obj) {
	// add the donation to the Donations table where donor_id = obj.donor_id
	client
		.from('Donation')
		.insert([{
			donor_id: obj.donor_id,
			amount: obj.amount,
			cause: obj.cause,
			type: obj.type
		}])
		.then((response) => {
			console.log(obj)
			console.log(response)
		})
}

async function donate() {
	form.addEventListener('submit', (event) => {
		event.preventDefault()
		const formData = new FormData(form)
		const amount = formData.get('amount')
		const casue = formData.get('cause')
		const type = formData.get('type')
		const email = formData.get('email')

		// check if email exists in the Users table
		client
			.from('Users')
			.select('id')
			.eq('Email', email)
			.then((response) => {
				// if the email does not exist, alert the user
				if (response.data.length === 0) {
					alert('Email does not exist')
					// clear email field
					document.getElementById('email').value = ''
					return
				}
			})

		const obj = {
			Email: email,
			amount: amount,
			cause: casue,
			type: type
		}

		editdonor(obj)

		// change the text of the submit button to 'Processing...' and then to Thanks for donating! after 2 seconds

		alert('Thanks for donating!')

		setTimeout(() => {
			window.location.href = 'donorpage.html'
		}, 1000)
	})
}

donate()