function createProducts() {
	let row = document.CreateElement("div");
	row.className = "row";

	let colLeft = document.CreateElement("div");
	colLeft.className = "col-sm-8";

	let box = document.CreateElement("div");
	box.className = "box";

	let img = document.CreateElement("p");

	let title = document.CreateElement("h3");
	let button = document.CreateElement("button");
	let buttonText = document.CreateTextNode("&#x1F6D2")
	title.className = "h3";
	button.className = "btn btn-dark";
	button.appendChild(buttonText);

	row.appendChild(colLeft);
	colLeft.appendChild(box);
	box.appendChild(img);
	box.appendChild(title);
	box.appendChild(button);


	document.getElementById("products").appendChild(row);
}

function addToCart() {

}

function rezensionErfassen() {

}