const client = supabase.createClient(
	'https://zjesbzduygemrdprcvvq.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
);

const form = document.querySelector('form')
let checker = []

function checkBox(service) {
	if (!checker.includes(service)) {
		checker.push(service)
	}
}

async function sendReq() {
	form.addEventListener('submit', (event) => {
		event.preventDefault()
		const button = document.getElementById('send-btn')
		button.innerHTML = 'Request Sent'
		setTimeout(() => {
			button.innerHTML = 'Send'
		}, 5000)
		const formData = new FormData(form)
		const request = {
			Name: formData.get('name'),
			Email: formData.get('email'),
			Type: checker,
			Desc: formData.get('message')
		};
		console.log(request)
		client
			.from('Requests')
			.insert(request, { upsert: true })
			.then((response) => {
				console.log(response)
			})
		checker = []
	})


	// for debugging purposes
	// const { data, error } = await client
	// 	.from('Requests')
	// 	.insert([
	// 		{ Name: 'Ayihan', Email: 'ayihanhaq@gmail.com', Type: 'Rashan', Desc: "I need help" },
	// 	])
	// 	console.log(data, error)
}
sendReq()