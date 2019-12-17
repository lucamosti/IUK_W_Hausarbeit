//ACHTUNG VOR DER ABGABE MUSS UNBEDINGT BEI DEN IMAGES DER PFAD UEBERPRUEFT WERDEN
let url = "https://beatsbybrueschi.herokuapp.com/"
//let url = "http://127.0.0.1:3000/";

//Abfrage des Carts
function getProductsFromCart() {
	fetch(url + "cart", {method:"GET"})
	.then(function(response){
		if (response.status !== 200) {
			console.log("Looks like there was a problem. Status Code: " + response.status);
			return;
		}
		response.json().then(function(data){
			if (data.length == 0) {
				createDefaultText();
			}
			if (data.length !== 0) {
				deleteDefaultText();
				addSubmitButton();
				addTitleBar();
				for(var i = 0; i < data.length; i++) {
					getProductsFromJSON(data[i].id, data[i].anz)
				}
			}
		})
	})
}


//Abfrage des JSON
function getProductsFromJSON(id, uebergabeMenge) {
	fetch(url + "products/" + id)
	.then(function(response){
		if (response.status !== 200) {
			console.log("Looks like there was a problem. Status Code: " + response.status);
			return;
		}
		response.json()
		.then(function(data){
			produktEinkaufwagenErstellen(data, uebergabeMenge);
		})
	});
}


//Produkt einfuegen 
function produktEinkaufwagenErstellen(product, uebergabeMenge) {
	//Das Bild hinzufuegen
	let bildCel = document.createElement("td");
	bildCel.className = "col-sm-5 col-xl-3";
		let linkZumArtikelBild = document.createElement("a");
		linkZumArtikelBild.href = product.link;
			let picture = document.createElement("img");

			//ZUM TESTEN, VOR ABGABE LOESCHEN
			//picture.src = "http://127.0.0.1:3000/" + product.bild;
			picture.src = product.bild;
			picture.alt = product.titel;
			picture.className = "img-fluid";

	linkZumArtikelBild.appendChild(picture);
	bildCel.appendChild(linkZumArtikelBild);


	//Den Titel hinzufuegen
	let articleTitleCel = document.createElement("div");
	articleTitleCel.className = "col-sm-7 col-xl-3";
		let linkZumArtikel = document.createElement("a");
		linkZumArtikel.href = product.link;
			let artTitle = document.createElement("div");
			artTitle.className = "anzeige";
			artTitle.setAttribute("aria-describedby", product.id + "articleDesc");
	let articleDescription = document.createElement("small");
	articleDescription.id = product.id + "articleDesc";
	articleDescription.className = "d-block d-xl-none form-text text-muted";
	articleDescription.innerHTML = "Artikel";

	artTitle.append(product.titel);
	linkZumArtikel.appendChild(artTitle);
	articleTitleCel.appendChild(linkZumArtikel);
	articleTitleCel.appendChild(articleDescription);


	//Die Beschreibung hinzufuegen
	let descriptionCel = document.createElement("div");
	descriptionCel.className = "d-none d-xl-block col-xl-4";
		let descriptionText = document.createElement("div");
		descriptionText.className = "anzeige";
		descriptionText.setAttribute("aria-describedby", product.id + "description");
	let descriptionDescription = document.createElement("small");
	descriptionDescription.id = product.id + "description";
	descriptionDescription.className = "d-block d-xl-none form-text text-muted";
	descriptionDescription.innerHTML = "Beschreibung";

	descriptionText.append(product.beschreibung);
	descriptionCel.appendChild(descriptionText);
	descriptionCel.appendChild(descriptionDescription);


	//Die Anzahl hinzufuegen
	let amountCel = document.createElement("div");
	amountCel.className = "col-sm-5 col-xl-1";
		let amountGroup = document.createElement("div");
		amountGroup.className = "input-group";
			let amountInput = document.createElement("input");
			amountInput.className = "form-control mengenFeld";
			amountInput.id = product.id;
			amountInput.name = "anzahlArtikel";
			//Uebergebene Menge vom Einkaufswagen einfuegen
			amountInput.value = uebergabeMenge;
			//EventListener hinzufuegen, funktioniert nicht ueber addEventListener
			amountInput.setAttribute("onkeydown", "wertZwischenspeichern(this)");
			amountInput.setAttribute("onkeyup", "maximaleMengeTesten(this)");
			amountInput.setAttribute("aria-describedby", product.id + "amount");
		let amountDescription = document.createElement("small");
		amountDescription.id = product.id + "amount";
		amountDescription.className = "d-block d-xl-none form-text text-muted";
		amountDescription.innerHTML = "Anzahl";

	amountGroup.appendChild(amountInput);
	amountCel.appendChild(amountGroup);
	amountCel.appendChild(amountDescription);


	//Den Preis hinzufuegen
	let priceCel = document.createElement("div");
	priceCel.className = "col-sm-7 col-xl-1";
		let price = document.createElement("div");
		price.className = "anzeige";
		price.id = product.id + "price";
		price.setAttribute("aria-describedby", product.id + "priceDesc");
		let priceDescription = document.createElement("small");
		priceDescription.id = product.id + "priceDesc";
		priceDescription.className = "d-block d-xl-none form-text text-muted";
		priceDescription.innerHTML = "Preis";
	

	price.append((uebergabeMenge * product.preis.value) + ".\u2013");
	priceCel.appendChild(price);
	priceCel.appendChild(priceDescription);

	//Knopf zum loeschen des Artikels
	let paperBinIcon = document.createElement("img");
	paperBinIcon.src = "images/paperbin.svg";
	paperBinIcon.alt = "Papierkorb";
	paperBinIcon.id = "paperbin_" + product.id;
	paperBinIcon.className = "paperbin";
	paperBinIcon.setAttribute("onclick", "deleteThisProduct(this)");


	//Die Zeile hinzufuegen
	let fieldsetRow = document.createElement("fieldset");
	fieldsetRow.id = "fieldset_" + product.id;
	let divRow = document.createElement("div");
	divRow.className = "form-row containerThing";
	divRow.id = "container_" + product.id;


	divRow.appendChild(bildCel);
	divRow.appendChild(articleTitleCel);
	divRow.appendChild(descriptionCel);
	divRow.appendChild(amountCel);
	divRow.appendChild(priceCel);

	divRow.appendChild(paperBinIcon);

	fieldsetRow.appendChild(divRow);

	document.getElementById("contentWarenkorb").appendChild(fieldsetRow);
}


//Adds the submit Button
function addSubmitButton(){
	let submitButton = document.createElement("button");
	submitButton.className = "btn btn-primary col-2 offset-10";
	submitButton.id = "bestellButton";
	submitButton.innerHTML = "Zur Kasse";
	submitButton.setAttribute("onclick", "einkaufAbschliessen()");
	document.getElementById("zurKasseButton").appendChild(submitButton);
}


function addTitleBar() {
	let titleFieldset = document.createElement("fieldset");
	titleFieldset.className = "d-none d-xl-block";

	let titleRow = document.createElement("div");
	titleRow.className = "form-row";

	let articleRow = document.createElement("div");
	articleRow.className = "d-none d-xl-block offset-xl-3 col-xl-3 titleRow";
	articleRow.innerHTML = "Artikel";

	let descrRow = document.createElement("div");
	descrRow.className = "d-none d-xl-block col-xl-4 titleRow";
	descrRow.innerHTML = "Beschreibung";

	let amountRow = document.createElement("div");
	amountRow.className = "d-none d-xl-block col-xl-1 titleRow";
	amountRow.innerHTML = "Anzahl";

	let priceRow = document.createElement("div");
	priceRow.className = "d-none d-xl-block col-xl titleRow";
	priceRow.innerHTML = "Preis";

	titleRow.appendChild(articleRow);
	titleRow.appendChild(descrRow);
	titleRow.appendChild(amountRow);
	titleRow.appendChild(priceRow);
	titleFieldset.appendChild(titleRow);

	document.getElementById("contentWarenkorb").appendChild(titleFieldset);
}


//Delete Default Text
function deleteDefaultText() {
	document.getElementById("nothingHereAtAll").innerHTML = "";
}

//Create Default Text
function createDefaultText() {
	document.getElementById("nothingHereAtAll").innerHTML = "Sie haben dem Einkaufswagen noch nichts hinzugef&uuml;gt."
}

function weiterleiten() {
	window.location.href = "einkauf.html";
}

//Onsubmit function
function einkaufAbschliessen() {
	fetch(url + "buy", {method:"GET"})
	.then(function(response){
		if (response.status !== 200) {
			console.log("Looks like there was a problem. Status Code: " + response.status);
			return;
		} else {
			weiterleiten();
		}
	});

}


//Wert der Menge Zwischenspeichern
var alterWert;
function wertZwischenspeichern(anzahl) {
	alterWert = anzahl.value;
}


//Test falls Wert ueber 100, da Feld zu klein fuer 100
function maximaleMengeTesten(anzahl) {
	if(!(isNaN(anzahl.value))) {
		//Popup generieren
		if (!(anzahl.value <= 10)) {
			let textFeld = document.createElement("div");
			textFeld.className = "popupInformation";
			textFeld.innerHTML = "Es k\u00F6nnen maximal 10 Artikel bestellt werden."
			anzahl.value = 10;
			preisNeuSetzen(anzahl);
			document.getElementById("contentWarenkorb").appendChild(textFeld);
			fadeOutEffect(textFeld);
			setTimeout(function(){textFeld.remove()}, 1800);
			return;
		} else if(!(anzahl.value >= 1)) {
			let textFeld = document.createElement("div");
			textFeld.className = "popupInformation";
			textFeld.innerHTML = "Bitte Artikel mit dem Papierkorb entfernen."
			anzahl.value = 1;
			preisNeuSetzen(anzahl);
			document.getElementById("contentWarenkorb").appendChild(textFeld);
			fadeOutEffect(textFeld);
			setTimeout(function(){textFeld.remove()}, 3000);
			return;
		}
	} else {
		anzahl.value = alterWert;
	}
}

//Preis neu setzen
function preisNeuSetzen(anzahl) {
	let id = anzahl.id;
	let number = anzahl.value;

	fetch(url + "products/" + id)
	.then(function(response){
		response.json().then(function(data){
			let priceOfProduct = data.preis.value;
			let priceField = document.getElementById(anzahl.id + "price");
			priceField.innerHTML = (anzahl.value * priceOfProduct) + ".\u2013";
		})
	});
}

//Popup verschwinden lassen
function fadeOutEffect(element) {
	var fadeTarget = element;
	var fadeEffect = setInterval(function () {
		if (!fadeTarget.style.opacity) {
			fadeTarget.style.opacity = 1;
		}
		if (fadeTarget.style.opacity > 0) {
			fadeTarget.style.opacity -= 0.04;
		} else {
			clearInterval(fadeEffect);
		}
	}, 75);
}

//Produkt loeschen
function deleteThisProduct(element) {
	let id = element.id.split("_").pop();
	let rowToBeDeleted = document.getElementById("fieldset_" + id);
	let result = confirm("M\u00F6chten Sie diesen Artikel wirklich entfernen?");
	if (result) {
		rowToBeDeleted.remove();
		//Laden aller Werte der uebrigen Waren
		let allElementsArray = getAllElementsOnSite();
		let allElementsId = allElementsArray[0];
		let allElementsAmount = allElementsArray[1];

		//Item in Warenkorb wird geloescht
		deleteProductFromCart(id);
		if (allElementsId.length == 0) {
			window.location.href = "einkaufswagen.html";

		}
	}
}

//Alle Elemente im HTML Warenkorb
function getAllElementsOnSite() {
	let elemIdArr = [];
	let elemAmountArr = [];
	let elementArray = document.getElementsByClassName("containerThing");
	for (var i = 0; i < elementArray.length; i++) {
		let idWithString = elementArray[i].id;
		let id = idWithString.split("_").pop();
		elemIdArr.push(id);

		let amount = document.getElementById(id).value;
		elemAmountArr.push(amount);
	}
	return [elemIdArr, elemAmountArr];
}


//Removes item from cart
function deleteProductFromCart(prodId) {
	var data = {id : prodId};

	fetch(url + "deleteone", {
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

getProductsFromCart();
