const buttonsDiv = document.getElementById('buttons-div');
const changeButton = document.getElementById('change-btn')
const emailVol = document.getElementById('email');
changeButton.addEventListener('click', changeField);

async function changeField() {
	buttonsDiv.innerHTML =
		'<div class="hero-body">'
		+ '<div class="container is-fluid">'
		+ '<div class="columns is-centered">'
		+ '<div class="column is-half">'
		+ '<div class="box">'
		+ '<div style="overflow-x:auto">'
		+ '<p class="mb-4" style="display: inline-block;id="legal"> <a class="custom-btn btn custom-link">Legal Aid</a></p>'
		+ '<p class="mb-4" style="display: inline-block;id="medical"><a class="custom-btn btn custom-link" href="#section_2">Medical Volunteer</a></p>'
		+ '<p class="mb-4" style="display: inline-block;id="Finance"><a class="custom-btn btn custom-link" href="#section_3">Finance Managment</a></p>'
		+ '<p class="mb-4" style="display: inline-block;id="education"><a class="custom-btn btn custom-link" href="#section_4">Educational Volunteer</a></p>'
		+ '<p class="mb-4" style="display: inline-block;id="media"><a class="custom-btn btn custom-link" href="#section_5">Media Managment</a></p>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>';

	selectField = await selectField();
}

async function selectField() {
	const email = emailVol.innerText.substring(7);
	console.log(email);
	client
		.from('Users')
		.select('id, Role')
		.eq('Email', email)
		.then(response => {
			const id = response.data[0].id;
			client
				.from('Volunteers')
				.select('id, Department')
				.eq('id', id)
				.then(response => {
					console.log(response.data[0].Department)
				})
		})
}