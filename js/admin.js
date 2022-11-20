const client = init();

function init() {
	return supabase.createClient(
		'https://zjesbzduygemrdprcvvq.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXNiemR1eWdlbXJkcHJjdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTUyNDMsImV4cCI6MTk4MDU3MTI0M30.wtkQQpQMKYsjYyxG8PA4bcGY5OHEcVaywHuAYoIQLh0'
	);
}

function homePage() {
	client.auth.getUser()
		.then((response) => {
			const email = response.data.user.email
			console.log(email)
			client
				.from('Users')
				.select('First_Name, Last_Name')
				.eq('Email', email)
				.then((response) => {
					document.getElementById("name").innerHTML = response.data[0].First_Name + " " + response.data[0].Last_Name
				})
		})

	const donations = document.getElementById("earning")
	client
		.from('Donation')
		.select('amount')
		.then((response) => {
			let sum = 0
			for (let i = 0; i < response.data.length; i++) {
				sum += response.data[i].amount
			}
			donations.innerHTML = "$" + sum
		})

	client
		.from('Requests')
		.select('*')
		.eq('Assigned', false)
		.then((response) => {
			console.log(response.error)
			document.getElementById("requests").innerHTML = response.data.length
		})

	client
		.from('Request_Applications')
		.select('*')
		.eq('approved', false)
		.then((response) => {
			console.log(response.error)
			document.getElementById("requestapp").innerHTML = response.data.length + " Applications Pending"
		})

	client
		.from('Donation')
		.select('cause, amount')
		.then((response) => {
			let flood = 0
			let medical = 0
			let educational = 0
			let rashan = 0
			for (let i = 0; i < response.data.length; i++) {
				if (response.data[i].cause == "Flood Relief") {
					flood += response.data[i].amount
				}
				else if (response.data[i].cause == "Medical Supplies") {
					medical += response.data[i].amount 
				}
				else if (response.data[i].cause == "Educational Supplies") {
					educational += response.data[i].amount
				}
				else if (response.data[i].cause == "Rashan Distribution") {
					rashan += response.data[i].amount
				}
			}
			let data = {
				labels: ["Flood Relief", "Medical Supplies", "Educational Supplies", "Rashan Distribution"],
				datasets: [{
					data: [flood, medical, educational, rashan],
					backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00FF00"],
					hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00FF00"]
				}]
			};
			let myPieChart = new Chart(document.getElementById("myPieChart"), {
				type: 'pie',
				data: data,
				options: {
					maintainAspectRatio: false,
					responsive: true,
					legend: {
					  display: true
					},
					cutoutPercentage: 80,
				  },
				})
			myPieChart.update()
		})

	// make a area chart of all the user Role {Admin, Donor, Medical Volunteer, Finance Management, Educational Volunteer, Legal Aid Services} from the Users table on the canvas myAreaChart with Role on x axis and count on y axis
	client
		.from('Users')
		.select('Role')
		.then((response) => {
			let admin = 0
			let donor = 0
			let medical = 0
			let finance = 0
			let educational = 0
			let legal = 0
			for (let i = 0; i < response.data.length; i++) {
				if (response.data[i].Role == "Admin") {
					admin += 1
				}
				else if (response.data[i].Role == "Donor") {
					donor += 1
				}
				else if (response.data[i].Role == "Medical Volunteer") {
					medical += 1
				}
				else if (response.data[i].Role == "Finance Management") {
					finance += 1
				}
				else if (response.data[i].Role == "Educational Volunteer") {
					educational += 1
				}
				else if (response.data[i].Role == "Legal Aid Services") {
					legal += 1
				}
			}
			let data = {
				labels: ["Admin", "Donor", "Medical Volunteer", "Finance Management", "Educational Volunteer", "Legal Aid Services"],
				datasets: [{
					label: "Users",
					lineTension: 0.3,
					backgroundColor: "rgba(78, 115, 223, 0.05)",
					borderColor: "rgba(78, 115, 223, 1)",
					pointRadius: 3,
					pointBackgroundColor: "rgba(78, 115, 223, 1)",
					pointBorderColor: "rgba(78, 115, 223, 1)",
					pointHoverRadius: 3,
					pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
					pointHoverBorderColor: "rgba(78, 115, 223, 1)",
					pointHitRadius: 10,
					pointBorderWidth: 2,
					data: [admin, donor, medical, finance, educational, legal],
				}],
			};
			let myLineChart = new Chart(document.getElementById("myAreaChart"), {
				type: 'line',
				data: data,
				options: {
					maintainAspectRatio: false,
					responsive: true,
					scales: {
						xAxes: [{
							time: {
								unit: 'date'
							},
							gridLines: {
								display: false,
								drawBorder: false
							},
							ticks: {
								maxTicksLimit: 7
							}
						}],
						yAxes: [{
							ticks: {
								maxTicksLimit: 5,
								padding: 10
							}
						}],
					},
					legend: {
						display: false
					}
				}
			})
			myLineChart.update()
		})
	
	// fill the table with id reqapp with {Volunteer Id, Volunteer Name, Volunteer Department, Request ID, Request Description} and a accept or reject button
	client
		.from('Volunteer')
		.select('Vol_id, id, Department')
		.then((response) => {
			for (let i = 0; i < response.data.length; i++) {
				client
					.from('Requests')
					.select('Req_id, Req_desc')
					.eq('Vol_id', response.data[i].Vol_id)
					.then((response1) => {
						for (let j = 0; j < response1.data.length; j++) {
							$('#reqapp').append(`
							<tr>
								<td>${response.data[i].Vol_id}</td>
								<td>${response.data[i].id}</td>
								<td>${response.data[i].Department}</td>
								<td>${response1.data[j].Req_id}</td>
								<td>${response1.data[j].Req_desc}</td>
								<td><button class="btn btn-success" id="accept">Accept</button></td>
								<td><button class="btn btn-danger" id="reject">Reject</button></td>
							</tr>
							`)
						}
					})
			}
		})
	
}

homePage()