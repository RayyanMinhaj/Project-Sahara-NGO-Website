const supa = init();

function init() {
	return supabase.createClient(
		'https://zjesbzduygemrdprcvvq.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
	);
}

function changeField() {
	document.getElementById('change-btn').addEventListener('click', (event) => {
		event.preventDefault()
		window.location.href = 'volunteerchanges.html'
	})
	return
}

function addVolunteerTable(volId, obj) {
	if (obj.department === "Medical Volunteer") {
		supa
			.from('Medical_Vol')
			.insert([
				{
					'Vol_id': volId
				}
			])
			.then((response) => {
				console.log(response)
			})
	} else if (obj.department === "Finance Management") {
		supa
			.from('Finance_Vol')
			.insert([
				{
					'Vol_id': volId
				}
			])
			.then((response) => {
				console.log(response)
			})
	} else if (obj.department === "Educational Volunteer") {
		supa
			.from('Educational_Vol')
			.insert([
				{
					'Vol_id': volId
				}
			])
			.then((response) => {
				console.log(response)
			})
	} else if (obj.department === "Legal Aid Services") {
		console.log("Here 2")

		supa
			.from('Legal_Vol')
			.insert([
				{
					'Vol_id': volId
				}
			])
			.then((response) => {
				console.log(response)
			})
	} else if (obj.department === "Media Management") {
		supa
			.from('MediaMan_Vol')
			.insert([
				{
					'Vol_id': volId
				}
			])
			.then((response) => {
				console.log(response)
			})
	}
}

function changeTable(obj) {
	supa
		// update the Role in Users table to obj.department with the same email and select id from Users table and store it in id
		.from('Users')
		.update({ Role: obj.department })
		.eq('Email', obj.email)
		.select('id')
		.then((response) => {
			let id = response.data[0].id
			supa
				.from('Volunteers')
				.update({ Department: obj.department })
				.eq('id', id)
				.select('Vol_id')
				.then((response) => {
					let volId = response.data[0].Vol_id
					if (obj.currentDepartment === "Medical Volunteer") {
						supa
							.from('Medical_Vol')
							.delete()
							.eq('Vol_id', volId)
							.then((response) => {
								console.log(response)
								console.log("deleting from medical")
								addVolunteerTable(volId, obj)
							})
					} else if (obj.currentDepartment === "Finance Management") {
						supa
							.from('Finance_Vol')
							.delete()
							.eq('Vol_id', volId)
							.then((response) => {
								console.log(response)
								console.log("deleting from finance")
								addVolunteerTable(volId, obj)
							})
					} else if (obj.currentDepartment === "Educational Volunteer") {
						supa
							.from('Educational_Vol')
							.delete()
							.eq('Vol_id', volId)
							.then((response) => {
								console.log(response)
								console.log("deleting from educational")
								addVolunteerTable(volId, obj)
							})
					} else if (obj.currentDepartment === "Legal Aid Services") {
						supa
							.from('Legal_Vol')
							.delete()
							.eq('Vol_id', volId)
							.then((response) => {
								console.log(response)
								console.log("deleting from legal")
								addVolunteerTable(volId, obj)
							})
					} else if (obj.currentDepartment === "Media Management") {
						supa
							.from('MediaMan_Vol')
							.delete()
							.eq('Vol_id', volId)
							.then((response) => {
								console.log(response)
								console.log("deleting from media")
								addVolunteerTable(volId, obj)
							})
					}
				})
		})
}

function checkData() {
	document.getElementById('apply-btn').addEventListener('click', (event) => {
		event.preventDefault()
		const email = document.getElementById("emailver")
		const password = document.getElementById("passver")
		const department = document.getElementById("department")
		let obj = {
			email: email.value,
			// password: password.value,
			department: department.options[department.selectedIndex].value,
			currentDepartment: ""
		}
		supa
			.from('Users')
			.select('Email')
			.eq('Email', email.value)
			.then((response) => {
				if (response.data.length == 0) {
					alert("Email does not exist. Please try again")
					document.getElementById("emailver").value = ""
					document.getElementById("passver").value = ""
				}
				else {
					supa.auth.signInWithPassword({
						email: email.value,
						password: password.value
					})
						.then((response) => {
							supa
								.from('Users')
								.select('Role')
								.eq('Email', email.value)
								.then((response) => {
									// currentDepartment = response.data[0].Role
									// console.log(currentDepartment)
									obj.currentDepartment = response.data[0].Role
									console.log(obj.currentDepartment)
								})

							if (response.error == null) {
								const button = document.getElementById('apply-btn')
								button.innerHTML = 'Submitting Request'
								changeTable(obj)
								setTimeout(() => {
									button.innerHTML = 'Apply'
									alert("Request Submitted")
									window.location.href = "volunteerpage.html"
								}, 3000)
								// console.log(currentDepartment)
							}

							else {
								alert("Incorrect password. Please try again")
								console.log(response)
								document.getElementById("pass").value = ""
							}
						})
				}
			})
	})
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

async function viewReq() {
	await supa.auth.getUser()
		.then((response) => {
			let userEmail = response.data.user.email
			console.log(userEmail)

			supa
				.from('Users')
				.select('Role')
				.eq('Email', userEmail)
				.then((response) => {
					console.log('here 1')
					console.log(response)
					// console.log(response.data[0].Role)
					if (response.data[0].Role == 'Medical Volunteer') {
						supa
							.from('Requests')
							.select('*')
							.eq('Type', '{medical}')
							.then((response) => {
								console.log('here 2')
								console.log(response.data)
								let table = document.getElementById('table')
								for (let i = 0; i < response.data.length; i++) {
									table.innerHTML += "<tr><td>" + response.data[i].rid + "</td><td>" + response.data[i].Name + "</td><td>" + response.data[i].Email + "</td><td>" + response.data[i].Type + "</td><td>" + response.data[i].Desc + "</td><td><button class='custom-btn btn custom-link' id='acceptreq'>Accept</button></td></tr>"
									document.getElementById('acceptreq').addEventListener('click', (event) => {
										console.log("itterator" + i)
										acceptReq(response.data[i-1].rid, userEmail)
									})
								}
							})
					} else {
						supa
							.from('Requests')
							.select('*')
							.neq('Type', '{medical}')
							.then((response) => {
								console.log('here 3')
								console.log(response.data)
								let table = document.getElementById('table')
								for (let i = 0; i < response.data.length; i++) {
									table.innerHTML += "<tr><td>" + response.data[i].rid + "</td><td>" + response.data[i].Name + "</td><td>" + response.data[i].Email + "</td><td>" + response.data[i].Type + "</td><td>" + response.data[i].Desc + "</td><td><button class='custom-btn btn custom-link' id='acceptreq'>Accept</button></td></tr>"
									document.getElementById('acceptreq').addEventListener('click', () => {

										acceptReq(response.data[i].rid, userEmail)
									})
								}
							})
					}
				})

		})

}

function acceptReq(rid, userEmail) {
	supa
		.from('Users')
		.select('id')
		.eq('Email', userEmail)
		.then((response) => {
			let id = response.data[0].id
			console.log(id)
			supa
				.from('Volunteers')
				.select('Vol_id')
				.eq('id', id)
				.then((response) => {
					let vol_id = response.data[0].Vol_id
					console.log(vol_id)
					supa
						.from('Request_Applications')
						.insert([{ 'req_id': rid, 'Vol_id': vol_id, 'approved': false }])
						.then((response) => {
							console.log(response)
							if (response.error == null) {
								alert("Request Submitted")
								setTimeout(() => {
									window.location.href = "volunteerpage.html"
								}, 2000)
							} else {
								alert("Request Submission Failed")
							}
						})
				})
		})

}

if (window.location.href.includes('volunteerPage.html')) {
	changeField()
}

if (window.location.href.includes('volunteerchanges.html')) {
	checkData()
}

if (window.location.href.includes('activerequest.html')) {
	viewReq()
}