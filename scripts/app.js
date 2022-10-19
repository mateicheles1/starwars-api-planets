
class Planet {
    constructor(data) {
        this.name = data.name;
        this.population = data.population;
        this.terrain = data.terrain;
        this.url = data.url;
    }
}

class PlanetCard {
    constructor(planet) {
        this.planet = planet;
    }

    mount(parentElement) {
        const el = this.createElement();
        parentElement.appendChild(el);
    }

    createElement() {
        const el = document.createElement('div');
        el.innerHTML += `
        <div class="box"> <h3 class="box--heading">${this.planet.name} </h3>
            <span class="box--text">Terrain: ${this.planet.terrain}. </span> <br>
            <span class="box--text">Population: ${this.planet.population}. </span> <br> <br> </div>
        `
        return el;
    }
}

async function getPlanetsData() {
    const url = `https://swapi.dev/api/planets/`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

class PrintPlanets {
    appContainer;
    planets;
    htmlElement;
    
    constructor(appContainer) {
        this.appContainer = appContainer;
    }

    async mount() {
        const planetsResults = await getPlanetsData();
        this.planets = planetsResults.map(result => new Planet(result));
        const pageElement = this.createElement();
        this.htmlElement = pageElement;
        this.appContainer.appendChild(pageElement);
        this.mountPlanetCards();

    }

    createElement() {
        const el = document.createElement('div');
        el.setAttribute('id', 'product-list-page');

        return el;
    }

    mountPlanetCards() {
        this.planets.forEach(planet => {
            const planetCard = new PlanetCard(planet);
            planetCard.mount(this.htmlElement);
        })
    }
}

async function main() {
    const app = document.getElementById('app');
    const planetListPage = new PrintPlanets(app);
    planetListPage.mount();
}

document.addEventListener('DOMContentLoaded', main);