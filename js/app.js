// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
// const supabase = createClient('https://zjesbzduygemrdprcvvq.supabase.co',
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0')

// console.log('Supabase Instance: ', supabase)

// const { createClient } = supabase
// const _supabase = createClient('https://zjesbzduygemrdprcvvq.supabase.co',
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
// )

// console.log('Supabase Instance: ', _supabase)
// const supabase = createClient('https://zjesbzduygemrdprcvvq.supabase.co',
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
// )

// 'https://zjesbzduygemrdprcvvq.supabase.co',
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'

const client = supabase.createClient(
	'https://zjesbzduygemrdprcvvq.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
);

const form = document.querySelector('form')
let checker = ""

function checkBox(service) {
	checker = service
}

async function sendReq() {
	form.addEventListener('submit', (event) => {
		event.preventDefault()
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
			.insert(request)
			.then((response) => {
				console.log(response)
			})
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