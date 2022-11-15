const supa = init();

function init() {
	return supabase.createClient(
		'https://zjesbzduygemrdprcvvq.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
	);
}

async function editCredentials() {
	let currentPassword = prompt("Enter your current password", "password")
	let newPassword = prompt("Enter your new password", "password")
	let Email = document.getElementById('email').innerHTML
	Email = Email.substring(7)

	updatePasswrod({Email, newPassword, currentPassword})
}

async function updatePasswrod(obj) {
	client.auth.signInWithPassword({
		email: obj.Email,
		password: obj.currentPassword
	})
		.then((response) => {
			if (response.error == null) {
				client.auth.updateUser({
					email: obj.Email,
					password: obj.newPassword
				})
					.then((response) => {
						if (response.error == null) {
							alert("Password updated successfully")
						}
						else {
							alert("Password update failed")
						}
					})
			} else {
				alert("Incorrect password. Please try again")
			}
		})
}