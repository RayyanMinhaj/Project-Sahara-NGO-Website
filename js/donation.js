const client = init();

function init() {
	return supabase.createClient(
		'https://zjesbzduygemrdprcvvq.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
	);
}

const form = document.querySelector('form')

async function editdonor(obj) {
	client
		.from('Users')
		.select('id')
		.eq('Email', obj.Email)
		.then((response) => {
			client
				.from('Donors')
				.select('donor_id, amount_donated, points')
				.eq('id', response.data[0].id)
				.then((response) => {
					obj.amount_donated = response.data[0].amount_donated
					obj.pointsearned = response.data[0].points
					obj.donor_id = response.data[0].donor_id
					client
						.from('Donors')
						.update({ amount_donated: parseInt(obj.amount_donated) + parseInt(obj.amount), points: parseInt(obj.pointsearned) + parseInt(obj.amount) * 50 })
						.eq('donor_id', response.data[0].donor_id)
						.then((response) => {
							console.log(response)
							donation(obj)
						})
				})
		})
}

function donation(obj) {
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

		client
			.from('Users')
			.select('id')
			.eq('Email', email)
			.then((response) => {
				if (response.data.length === 0) {
					alert('Email does not exist')
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


		alert('Thanks for donating!')

		setTimeout(() => {
			window.location.href = 'donorpage.html'
		}, 1000)
	})
}

donate()