const client = init();

function init() {
	return supabase.createClient(
		'https://zjesbzduygemrdprcvvq.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
	);
}

const form = document.querySelector('form')

function signup() {
	form.addEventListener("submit", (event) => {
		event.preventDefault()
		const formData = new FormData(form)
		const email = formData.get("email")
		const password = formData.get("password")
		const password2 = formData.get("password2")
		if (password == password2) {
			client.auth.signUp({
				email: email,
				password: password
			}).then(({ response }) => {
				console.log(response)
			})
		}
	})
}
signup()