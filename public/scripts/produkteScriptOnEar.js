let url = "https://beatsbybrueschi.herokuapp.com/";
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
			for(var i = 3; i < 6; i++) {
				//if(data.kategorie == "In-Ear-Kopfhörer") {
					createProducts(data[i]);
				//}	
			}
		})
	});
}

function createProducts(product) {
	//Create Div
	let box = document.createElement("div");
	box.className = "box";

	//Create Picture
	let paragraph = document.createElement("p");
	let imgLink = document.createElement("a");
	imgLink.href = product.link;
	let img = document.createElement("img");
	img.className = "img-fluid"
	img.src = product.bild;	//muss noch angepasst werden (Fetch)
	paragraph.appendChild(imgLink);
	imgLink.appendChild(img);

	

	//Create Title & Price
	let link = document.createElement("a")
	link.href = product.link;
	let title = document.createElement("h3");
	let titletext = document.createTextNode(product.titel);	//muss noch geändert werden (Fetch)
	title.append(titletext);
	link.appendChild(title);
	let preis = document.createElement("h3");
	preis.className = "price";
	let preisText = document.createTextNode(product.preis.value + " " + product.preis.currency);	//muss noch geändert werden (Fetch)
	preis.appendChild(preisText);


	
	//Create cartButton
	let cartButton = document.createElement("button");
	cartButton.className = "btn btn-cart";
	let cartButtonText = document.createTextNode("\uD83D\uDED2")
	cartButton.appendChild(cartButtonText);
	cartButton.addEventListener("click", function(event) {
		sendToCart(product.id);
	});
	preis.appendChild(cartButton);



	//Append to Website
	box.appendChild(paragraph);
	box.appendChild(link);
	box.appendChild(preis);
	

	document.getElementById("products").appendChild(box);
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