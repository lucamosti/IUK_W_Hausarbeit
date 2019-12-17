//Abfrage des JSON
function getProducts() {
	let url = "https://beatsbybrueschi.herokuapp.com/products/";
	//let url = "http://127.0.0.1:3000/products";


	//ACHTUNG VOR DER ABGABE MUSS UNBEDINGT BEI DEN IMAGES DER PFAD UEBERPRUEFT WERDEN
	fetch(url)
	.then(function(response){
		if (response.status !== 200) {
			console.log("Looks like there was a problem. Status Code: " + response.status);
			return;
		}

		response.json().then(function(data){
			console.log(data);
			//var product = data.results; 
			for(var i = 0; i < data.length; i++) {
				itemHinzufuegen(data[i]);
			}
		})
	});
}


//Produkt einfuegen zum Testen
function itemHinzufuegen(product) {

	let tableRow = document.createElement("tr");
	let bildCel = document.createElement("td");
	let titleCel = document.createElement("td");
	let amountCel = document.createElement("td");
	let priceCel = document.createElement("td");

	let picture = document.createElement("img");

	picture.src = product.bild;
	picture.alt = product.titel;
	picture.className = "img-fluid";


	bildCel.appendChild(picture);
	titleCel.append(product.titel);
	priceCel.append(product.preis.value + ".\u2013");

	tableRow.appendChild(bildCel);
	tableRow.appendChild(titleCel);
	tableRow.appendChild(amountCel);
	tableRow.appendChild(priceCel);

	document.getElementById("contentWarenkorb").appendChild(tableRow);
}

