
function getProducts() {
	let url = "https://beatsbybrueschi.herokuapp.com/products/";

	fetch(url, {mode: "no-cors"}).then(function(result){
		result.json().then(function(data){
			console.log(data);
			var product = data.results; 
			for(var i = 0; i < product.length; i++){
				itemHinzufuegen(product[i].titel, product[i].preis.value);
			}
		})
	});
}




//Produkt einfuegen zum Testen
//KOPIEREN in eigenes dokument
//LOESCHEN VOR ABGABE

function itemHinzufuegen(titel, preis) {
	//let itemListe = ;
	
	let tableRow = document.createElement("tr");
	let bildCel = document.createElement("td");
	let titleCel = document.createElement("td");
	let priceCel = document.createElement("td");
	let amountCel = document.createElement("td");


	titleCel.append(titel);
	priceCel.append(preis);


	tableRow.appendChild(bildCel);
	tableRow.appendChild(titleCel);
	tableRow.appendChild(priceCel);
	tableRow.appendChild(amountCel);

}

getProducts();
