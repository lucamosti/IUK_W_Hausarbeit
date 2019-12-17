var url = "https://beatsbybrueschi.herokuapp.com/";
//let url = "http://127.0.0.1:3000/";

function getProducts() {
	//ACHTUNG VOR DER ABGABE MUSS UNBEDINGT BEI DEN IMAGES DER PFAD UEBERPRUEFT WERDEN
	fetch(url + "products/")
	.then(function(response){
		if (response.status !== 200) {
			console.log("Looks like there was a problem. Status Code: " + response.status);
			return;
		}

		response.json().then(function(data){
			console.log(data);
			//var product = data.results; 
			for(var i = 0; i < data.length; i++) {
					createOneProduct(data[i]);
			}
		})
	});
}

function createOneProduct(product) {
	//Create Div
	let box = document.createElement("div");
	box.className = "box";

	//Create Content
	let image = document.createElement("img");
	image.className = "img-fluid";
	image.src = product.bild;	//Muss noch angepasst werden (Fetch)
	//picture.alt = product.titel;

	let title = document.createElement("h2");
	let titleText = document.createTextNode(product.titel);	//Muss noch angepasst werden (Fetch)
	title.append(titleText);
	let price = document.createElement("h3");
	price.className = "price";
	let priceText = document.createTextNode(product.preis.value + " " + product.preis.currency);	//Muss noch angepasst werden (Fetch)
	price.append(priceText);
	let cartButton = document.createElement("button");
	cartButton.className = "btn btn-cart";
	let cartButtonText = document.createTextNode("\uD83D\uDED2");
	cartButton.appendChild(cartButtonText);
	cartButton.addEventListener("click", function(event) {
		sendToCart(product.id);
	});
	price.appendChild(cartButton);
	var hr1 = document.createElement("hr");
	var hr2 = document.createElement("hr");
	let beschreibungU = document.createElement("p");
	beschreibungU.className = "p-bold";
	let beschreibungUText = document.createTextNode("Beschreibung:");	//Muss noch angepasst werden (Fetch)
	beschreibungU.appendChild(beschreibungUText);
	let beschreibung = document.createElement("p");
	let beschreibungText = document.createTextNode(product.beschreibung);	//Muss noch angepasst werden (Fetch)
	beschreibung.append(beschreibungText);
	let garantieU = document.createElement("p");
	garantieU.className = "p-bold";
	let garantirUText = document.createTextNode("Garantie:");
	garantieU.appendChild(garantirUText);
	let garantie = document.createElement("p")
	let garantieText = document.createTextNode(product.garantie);
	garantie.append(garantieText);
	let hr3 = document.createElement("hr");
	let bewertung = document.createElement("p");
	bewertung.className = "p-bold";
	let berwertungText = document.createTextNode("Berwertung:");
	bewertung.appendChild(berwertungText);
	let buttonRezension = document.createElement("button");
	buttonRezension.className = "btn btn-rezension";
	let buttonRezensionText = document.createTextNode("Rezension");
	buttonRezension.appendChild(buttonRezensionText);
	bewertung.appendChild(buttonRezension);
	buttonRezension.addEventListener("click", function(event) {
		rezensionErfassen(product.id);
	});

	box.appendChild(image);
	box.appendChild(title);
	box.appendChild(price);
	box.appendChild(hr1);
	box.appendChild(beschreibungU);
	box.appendChild(beschreibung);
	box.appendChild(hr2);
	box.appendChild(garantieU);
	box.appendChild(garantie);
	box.appendChild(hr3);
	box.appendChild(bewertung);

	for(var n = 0; n < product.reviews.length; n++) {
	let uName = document.createElement("p");
	let nameText = document.createTextNode("Benutzername: " + product.reviews[n].name);
	uName.append(nameText);
	box.appendChild(uName);

	let rezensionDesign = document.createElement("p");
	let rezensionTextDesign = document.createTextNode("Design:	");
	rezensionDesign.append(rezensionTextDesign);
	for(var d = 0; d < product.reviews[n].design; d++) {
		var sterneD = document.createElement("img");
		sterneD.className = "sterneD";
		sterneD.src = "../images/stern.svg";
		rezensionDesign.append(sterneD);
	}
	let rezensionSound = document.createElement("p");
	let rezensionTextSound = document.createTextNode("Sound:	");
	rezensionSound.append(rezensionTextSound);
	for(var s = 0; s < product.reviews[n].soundqualität; s++) {
		var sterneS = document.createElement("img");
		sterneS.className = "sterneD";
		sterneS.src = "../images/stern.svg";
		rezensionSound.append(sterneS);
	}
	let rezensionPreisLeistung = document.createElement("p");
	let rezensionTextPreisLeistung = document.createTextNode("Preis-Leistungsverhältnis:	");
	rezensionPreisLeistung.append(rezensionTextPreisLeistung);
	for(var p = 0; p < product.reviews[n].preisLeistungsverhältnis; p++) {
		var sterneP = document.createElement("img");
		sterneP.className = "sterneD";
		sterneP.src = "../images/stern.svg";
		rezensionPreisLeistung.append(sterneP);
	}

	box.appendChild(rezensionDesign);
	box.appendChild(rezensionSound);
	box.appendChild(rezensionPreisLeistung);


	let kommentar = document.createElement("p");
	let kommentarText = document.createTextNode("Kommentar: " + product.reviews[n].kommentar);
	kommentar.append(kommentarText);

	box.appendChild(kommentar);
	}

	document.getElementById("Produkt").appendChild(box);
}

function getProductById(id) {
	fetch(url + "products/" + id)
	.then(function(response){
		if (response.status !== 200) {
			console.log("Looks like there was a problem. Status Code: " + response.status);
			return;
		}

		response.json().then(function(data){
			console.log(data);
			
				createOneProduct(data);
			
		})
	});
}

function sendToCart(productid) {
	var data = {id: productid, anzahl: 1};

	fetch(url + "cart", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	})
	.then(response => {
		if (response.status !== 200) {
			console.log("Looks like there was a problem. Status Code: " + response.status);
		}
	})
}

function rezensionErfassen(productid) {
	var data = {id: productid};

	fetch(url + "prodId", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	})
	.then(response => {
		if (response.status !== 200) {
			console.log("Looks like there was a problem. Status Code: " + response.status);
		}
		window.location.href = "../rezension-erfassen.html"
	})

}