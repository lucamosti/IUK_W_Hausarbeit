
function getProducts() {
	let url = "https://beatsbybrueschi.herokuapp.com/products/";

	fetch(url,  {mode: 'no-cors'}).then(function(response){
		if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: '+response.status);
			return;
		}
		response.json().then(function(data) {
			console.log(data);
			data.forEach(function(product){
				let neuesItem = itemHinzufuegen(product);
				document.getElementById("contentWarenkorb").appendChild(neuesItem);
			})
		});
	});
}




//Produkt einfuegen zum Testen
//KOPIEREN in eigenes dokument
//LOESCHEN VOR ABGABE

function itemHinzufuegen(product) {
	let id = character.url.match(/\d+/g)[0];

	//let itemListe = ;
	
	let tableRow = document.createElement("tr");
	let bildCel = document.createElement("td");
	let titleCel = document.createElement("td");
	let priceCel = document.createElement("td");
	let amountCel = document.createElement("td");



	tableRow.appendChild(bildCel);
	tableRow.appendChild(titleCel);
	tableRow.appendChild(priceCel);
	tableRow.appendChild(amountCel);

}

getProducts();
