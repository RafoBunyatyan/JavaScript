const people = document.querySelector(".people"),
    input = document.querySelector(".input"),
    search = document.querySelector(".search"),
    all = document.querySelector(".all"),
    more = document.querySelector(".more"),
    result = document.querySelector(".result");

function getPeople() {
    fetch(`https://swapi.dev/api/people/?search=${input.value}`, {
        method: "GET",
    }).then(data => {
        return data.json();
    }).then(data => {
		 draw(data);
		 console.log(data); 
	})	
};

function draw(data) {
    result.innerHTML = `
     ${data.results.map(e => {
            return `<li>
						<span>Name: ${e.name}</span>
						<span>Eye_color: ${e.eye_color}</span>
						<span>Birth_year: ${e.birth_year}</span>
            		</li>`
     }).join("")}`
    if (data.next || data.previous) {
        more.innerHTML = `
            ${data.previous ? `<button onclick="getMore('${data.previous}')">Prev</button>` : ''}
            ${data.next ? `<button onclick="getMore('${data.next}')">Next</button>` : ''}  
        `}
};

function getAll() {
    fetch(`https://swapi.dev/api/people`, {
        method: "GET",
    }).then(data => {
        return data.json();
    }).then(data => {
        draw(data);
		console.log(data); 
    });
};

function getMore(data) {
    fetch(data, {
        method: "GET",
    }).then(data => {
        if (data.ok) {
            return data.json();
        }
    }).then(data => {
		draw(data)
		console.log(data); 
	})
};

people.addEventListener("submit", (e) => {
    e.preventDefault();
    getPeople();
});

all.addEventListener("click", () => {
    getAll();
});