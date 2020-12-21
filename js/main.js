const BASE = "https://swapi.dev/api/";

document.getElementById("btnPeople").addEventListener("click", () => {
  getPeopleByButton();
});
document.getElementById("btnPlanet").addEventListener("click", () => {
  getPlanetsByButton();
});

function getPeopleByButton() {
  function getPeoples(page) {
    const config = {
      method: "GET",
      url: BASE + "people",
      params: {
        page: page,
      },
    };
    return axios(config)
      .then((res) => {
        return res.data.results;
      })
      .catch((err) => {
        console.log("Something went wrong");
        return [];
      });
  }

  function renderPeople(people) {
    const info = document.querySelector(".info");
    info.innerHTML = " ";
    people.forEach((people) => {
      const peopleElement = document.createElement("div");
      peopleElement.className = "people";
      peopleElement.innerHTML = `
                <h2>${"Name: " + people.name}</h2>
                <h4>${"Years: " + people.birth_year}</h4>
                <h4> ${"Gender: " + people.gender}</h4>
             `;
      info.append(peopleElement);
    });
  }

  function paginationInit() {
    let currentPage = 1;
    document.getElementById("prevPeople").addEventListener("click", () => {
      if (currentPage <= 1) return (currentPage = 1);
      getPeoples(--currentPage).then(renderPeople);
    });
    document.getElementById("nextPeople").addEventListener("click", () => {
      if (currentPage > 8) return (currentPage = 8);
      getPeoples(++currentPage).then(renderPeople);
    });
  }
  getPeoples().then(renderPeople);
  paginationInit();
}

function getPlanetsByButton() {
  function gePlanets(page) {
    const config = {
      method: "GET",
      url: BASE + "planets",
      params: {
        page: page,
      },
    };
    return axios(config)
      .then((res) => {
        return res.data.results;
      })
      .catch((err) => {
        console.log("Something went wrong");
        return [];
      });
  }

  function renderPlanets(planets) {
    const info = document.querySelector(".info");
    info.innerHTML = " ";
    planets.forEach((planets) => {
      const planetsElement = document.createElement("div");
      planetsElement.className = "planets";
      planetsElement.innerHTML = `
                    <h2>${"Name: " + planets.name}</h2>
                    <h4>${"population: " + planets.population}</h4>
                    <h4>${"climate: " + planets.climate}</h4>
                    <h4> ${"diameter: " + planets.diameter}</h4>
                 `;
      info.append(planetsElement);
    });
  }

  function paginationInit() {
    let currentPage = 1;
    document.getElementById("prevPlanet").addEventListener("click", () => {
      if (currentPage <= 1) return (currentPage = 1);
      gePlanets(--currentPage).then(renderPlanets);
    });
    document.getElementById("nextPlanet").addEventListener("click", () => {
      if (currentPage > 5) return (currentPage = 5);
      gePlanets(++currentPage).then(renderPlanets);
    });
  }
  gePlanets().then(renderPlanets);
  paginationInit();
}
