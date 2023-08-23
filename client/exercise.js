v=window.localStorage.getItem('myemail')
console.log("===",v);
document.getElementById('my-email').innerHTML=v

function saveSelection(variable, value) {
	window[variable] = value;
}
fetchExercises();
async function fetchExercises() {
	const url = 'https://musclewiki.p.rapidapi.com/exercises/attributes';
	const response = await fetch(url, {
		method: 'GET',
		headers: getHeaders()
	});
	const data = await response.json();

	populateDropdown('categoryDropdown', data.categories);
	populateDropdown('difficultyDropdown', data.difficulties);
	populateDropdown('forceDropdown', data.forces);
	populateDropdown('muscleDropdown', data.muscles);

}
function getHeaders() {
	return {
		'X-RapidAPI-Key': '885fb42166msh42252d84b68715fp11ffbajsnb0f9b1444506',
		'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
	};
}

function populateDropdown(id, options) {
	const dropdown = document.getElementById(id);
	options.forEach(option => {
		const opt = document.createElement('option');
		opt.value = option;
		opt.textContent = option;
		dropdown.appendChild(opt);
	});
}
document.getElementById('searchBtn').addEventListener('click', async () => {
	let url = 'https://musclewiki.p.rapidapi.com/exercises?';
	if (window['selectedCategory']) {
		url += `category=${window['selectedCategory']}&`;
	}
	if (window['selectedDifficulty']) {
		url += `difficulty=${window['selectedDifficulty']}&`;
	}
	if (window['selectedForce']) {
		url += `force=${window['selectedForce']}&`;
	}
	if (window['selectedMuscle']) {
		url += `muscle=${window['selectedMuscle']}`;
	}
	const response = await fetch(url, {
		method: 'GET',
		headers: getHeaders()
	});
	const data = await response.json();
	const exercises = data
	console.log(exercises)
	const perPage = 5;
	let currentPage = 1;
	const totalPages = Math.ceil(exercises.length / perPage);

	function displayCards() {
		const start = (currentPage - 1) * perPage;
		const end = start + perPage;
		const cards = exercises.slice(start, end);
		document.getElementById('cards').innerHTML = '';
		cards.forEach(exercise => {
		  const card = document.createElement('div');
		  card.classList.add('card');
		  card.innerHTML = `
		  <div>
		  <h3 class="content tooltip" title="Details:${exercise.details}">${exercise.exercise_name}</h3>
		  <ul style="list-style: disc; padding-left: 20px; text-align: left;">
		  ${exercise.steps.map(step => `<li>${step}</li>`).join('')} 
		  </ul>
		  <a href="${exercise.videoURL}" target="_blank">Video Link</a>
		  </div>
		`;
	
		  document.getElementById('cards').appendChild(card);
		});
	  }
	function displayPagination() {
		const pagination = document.getElementById('pagination');
		pagination.innerHTML = '';
		for (let i = 1; i <= totalPages; i++) {
			const button = document.createElement('button');
			button.textContent = i;
			if (i === currentPage) {
				button.classList.add('active');
			}
			button.addEventListener('click', () => {
				currentPage = i;
				displayCards();
				displayPagination();
			});
			pagination.appendChild(button);
		}
	}
	displayCards();
	displayPagination();
});