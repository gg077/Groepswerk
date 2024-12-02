const container = document.getElementById("landenlijst");
const url = `https://restcountries.com/v3.1/all`;

axios.get(url)
    .then(response => {
        const landenList = response.data;
        renderLandenCards(landenList)
    })
    .catch(error => {
        console.log('error')
        console.error("Fout bij het ophalen van gegevens:", error);
        document.getElementById("pokemon-list").innerHTML =
            `<div class="alert alert-danger" role="alert">
                 Er is een fout opgetreden bij het ophalen van de gegevens.
             </div>`;
    });

function renderLandenCards(landenList) {
    // console.log(landenList)
    landenList.forEach(land => {
        // console.log(land)
        const landName = land.name.official;
        const landFlag = land.flags.svg;
        const landRegion = land.region;
        const landPopulation = land.population.toLocaleString();
        const landCapital = land.capital;

        // const landLanguages = land.languages;
        const landLanguages = land.languages
         ? Object.values(land.languages).join(", ")
         : "Niet beschikbaar";
        // console.log(landLanguages)

        // const landCurrency = land.currencies;
        const landCurrency = land.currencies
         ? Object.values(land.currencies)
             .map(curr => curr.name)
             .join(", ")
         : "Niet beschikbaar";
        // console.log(landCurrency)

        // create card
        const card =
            `<div class="card col-md-4 shadow-sm">
                <img src="${landFlag}" class="card-img-top" alt="Vlag van ${landName}">
                <div class="card-body flex-grow">
                    <h5 class="card-title">${landName}</h5>
                    <p class="card-text">
                        <strong>Regio:</strong> ${landRegion}<br>
                        <strong>Populatie:</strong> ${landPopulation}
                    </p>
                    <button class="btn btn-primary w-100" onclick="openModal('${landName}', '${landFlag}', '${landCapital}', '${landPopulation}', '${landLanguages}', '${landCurrency}')">
                        Details bekijken 
                    </button>
                </div>
            </div>`;
        container.insertAdjacentHTML("beforeend", card);
    })

}

function openModal(name, flag, capital, region, population, languages, currency) {
    const modalContent =
        `<div class="modal-header">
            <h5 class="modal-title" id="modaltitel">Land Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- Modal Body -->
        <div class="modal-body">
            <h3 class="text-center text-primary fw-bold">${name}</h3>
            <div class="text-center mb-3">
                <img src="${flag}" class="img-fluid rounded shadow-sm" style="max-width: 200px;" alt="Vlag van ${name}">
            </div>
            <div class="row">
                <div class="col-md-6">
                    <p><strong>Hoofdstad:</strong>${capital}</p>
                    <p><strong>Regio:</strong>${region}</p>
                    <p><strong>Populatie:</strong>${population}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Talen:</strong>${languages}</p>
                    <p><strong>Valuta:</strong>${currency}</p>
                </div>
            </div>
            <div id="map" class="mt-4" style="height: 300px;">
            </div>
        </div>`;

    const modalElement = document.querySelector(".modal-content");
    modalElement.innerHTML = modalContent;

    // Toon de modal
    const modal = new bootstrap.Modal(document.getElementById("countryModal"));
    modal.show();
}