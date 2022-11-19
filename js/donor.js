let userEmail

const supa = init();

function init() {
	return supabase.createClient(
		'https://zjesbzduygemrdprcvvq.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
	);
}

function editCredentials() {
	let currentPassword = prompt("Enter your current password", "password")
	let newPassword = prompt("Enter your new password", "password")
	let Email = document.getElementById('email').innerHTML
	Email = Email.substring(7)
	userEmail = Email

	updatePasswrod({ Email, newPassword, currentPassword })
}

async function updatePasswrod(obj) {
	supa.auth.signInWithPassword({
		email: obj.Email,
		password: obj.currentPassword
	})
		.then((response) => {
			if (response.error == null) {
				supa.auth.updateUser({
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

async function redeemPoints() {
	await supa.auth.getUser()
		.then((response) => {
			let logEmail = response.data.user.email
			console.log(logEmail)
			userEmail = logEmail
		})

	console.log(userEmail)
	let currentPoints = document.getElementById('currentpoints')
	let userPoints = 0
	// document.getElementById('cour1').addEventListener('click', () => {
	console.log("clicked")
	supa
		.from('Users')
		.select('id')
		.eq('Email', userEmail)
		.then((response) => {
			console.log(response.data[0].id)
			let id = response.data[0].id
			supa
				.from('Donors')
				.select('points')
				.eq('id', id)
				.then((response) => {
					currentPoints.innerHTML = "Current Points: " + response.data[0].points + " points"
					userPoints = parseInt(response.data[0].points)
				})
		})

	document.getElementById('cour1').addEventListener('click', () => {
		if (userPoints < 1500) {
			alert("You do not have enough points to redeem")
		} else {
			alert("You have redeemed 1500 points. Thanks for your contribution!")
			userPoints -= 1500
			console.log(userPoints)
			supa
				.from('Users')
				.select('id')
				.eq('Email', userEmail)
				.then((response) => {
					console.log(response)
					console.log(response.data[0].id)
					let id = response.data[0].id
					supa
						.from('Donors')
						.update({ 'points': userPoints })
						.eq('id', id)
						.then((response) => {
							console.log(response.error)
							document.getElementById('currentpoints').innerHTML = "Current Points: " + userPoints + " points"
						})
				})

			setTimeout(() => {
				window.location.href = "donorpage.html"
			}, 2000)
		}
	})

	document.getElementById('cour2').addEventListener('click', () => {
		if (userPoints < 500) {
			alert("You do not have enough points to redeem")
		} else {
			alert("You have redeemed 500 points. Thanks for your contribution!")
			userPoints -= 500
			console.log(userPoints)
			supa
				.from('Users')
				.select('id')
				.eq('Email', userEmail)
				.then((response) => {
					console.log(response)
					console.log(response.data[0].id)
					let id = response.data[0].id
					supa
						.from('Donors')
						.update({ 'points': userPoints })
						.eq('id', id)
						.then((response) => {
							console.log(response.error)
							document.getElementById('currentpoints').innerHTML = "Current Points: " + userPoints + " points"
						})
				})

			setTimeout(() => {
				window.location.href = "donorpage.html"
			}, 2000)
		}
	})

	document.getElementById('cour3').addEventListener('click', () => {
		if (userPoints < 1000) {
			alert("You do not have enough points to redeem")
		} else {
			alert("You have redeemed 1000 points. Thanks for your contribution!")
			userPoints -= 1000
			console.log(userPoints)
			supa
				.from('Users')
				.select('id')
				.eq('Email', userEmail)
				.then((response) => {
					console.log(response)
					console.log(response.data[0].id)
					let id = response.data[0].id
					supa
						.from('Donors')
						.update({ 'points': userPoints })
						.eq('id', id)
						.then((response) => {
							console.log(response.error)
							document.getElementById('currentpoints').innerHTML = "Current Points: " + userPoints + " points"
						})
				})

			setTimeout(() => {
				window.location.href = "donorpage.html"
			}, 2000)
		}
	})

	document.getElementById('cour4').addEventListener('click', () => {
		if (userPoints < 2500) {
			alert("You do not have enough points to redeem")
		} else {
			alert("You have redeemed 2500 points. Thanks for your contribution!")
			userPoints -= 2500
			console.log(userPoints)
			supa
				.from('Users')
				.select('id')
				.eq('Email', userEmail)
				.then((response) => {
					console.log(response)
					console.log(response.data[0].id)
					let id = response.data[0].id
					supa
						.from('Donors')
						.update({ 'points': userPoints })
						.eq('id', id)
						.then((response) => {
							console.log(response.error)
							document.getElementById('currentpoints').innerHTML = "Current Points: " + userPoints + " points"
						})
				})

			setTimeout(() => {
				window.location.href = "donorpage.html"
			}, 2000)
		}
	})
}

if (window.location.href.includes("points.html")) {
	redeemPoints()
}