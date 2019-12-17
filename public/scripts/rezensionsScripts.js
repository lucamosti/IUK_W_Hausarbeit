var itemListe = document.getElementById("produkteListe");
var bildContainer = document.getElementById("produktAuswahlBild");

var nameField = document.getElementById("nameInput");
var emailField = document.getElementById("emailInput");
var feedbackText = document.getElementById("form-textarea-feedback");
var url = "https://beatsbybrueschi.herokuapp.com/";

var productIdReview = 0;

nameField.addEventListener("change", validateFeedback);
emailField.addEventListener("change", validateFeedback);
feedbackText.addEventListener("change", validateFeedback);

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
	'use strict';
		window.addEventListener('keydown', function() {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
			var validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener('keyup', function(event) {
					if (form.checkValidity() === false) {
						event.preventDefault();
						event.stopPropagation();
					}
					form.classList.add('was-validated');
				}, false);
			});
		}, false);
})();


function validateFeedback() {
	var submitButton = document.getElementById("submitButton");

	if (nameValidation() && feedbackTextValidation()) {
		submitButton.disabled = false;
	} else {
		submitButton.disabled = true;
	}
}



function nameValidation() {
	if(nameField.value.length >= 4) {
		return true;
	} else {
		return false;
	}
}


function feedbackTextValidation() {
	if(feedbackText.value.length <= 50 && feedbackText.value.length >=5) {
		return true;
	} else {
		return false;
	}
}


function itemHinzufuegenBewertung() {
	getIdReviews();
}

//Get Id for Review
function getIdReviews() {
	fetch(url + "prodId", {method:"GET"})
	.then(function(response){
		console.log(response);
		response.json().then(function(data){
			if (data !== 0) {
				productIdReview = data[0];
				getProductsFromJSONById(data[0]);
			}
		})
	})
}

//Abfrage des JSON
function getProductsFromJSONById(id) {
	fetch(url + "products/" + id)
	.then(function(response){
		if (response.status !== 200) {
			console.log("Looks like there was a problem. Status Code: " + response.status);
			return;
		}
		console.log(response)
		response.json()
		.then(function(data){
			console.log(data);
			document.getElementById("produkteListe").innerHTML = data.titel;
			let img = document.createElement("img");
			img.src = data.bild;
			document.getElementById("produktAuswahlBild").appendChild(img);
		})
	});
}

function produktBildLadenBewertung() {
	if (wert == 0) {
		var altesBild = document.getElementById("produktBild");
		altesBild.remove();
		var neuesBild = document.createElement("img");
		neuesBild.id = "produktBild";
		neuesBild.src = 'images/768px-test_pattern.png';
		bildContainer.appendChild(neuesBild);
		wert = 5;
		return;
	} 
	if (wert >= 3) {
		var altesBild = document.getElementById("produktBild");
		altesBild.remove();
		var neuesBild = document.createElement("img");
		neuesBild.id = "produktBild";
		neuesBild.src = 'images/logo_klein.png';
		bildContainer.appendChild(neuesBild);
		wert = 0;
		return;
	}
}

function sendReview() {
	let prId = productIdReview;
	let name = document.getElementById("nameInput").value;
	let email = document.getElementById("emailInput").value;
	let design = 0;
	var designRadios = document.getElementsByName("design-zufriedenheit");
	for(var i = 0; i < designRadios.length; i++){
		if (designRadios[i].checked){
			design = designRadios[i].value;

			break; 
		}
	}
	let sound = 0; 
	var soundRadios = document.getElementsByName("soundquality-zufriedenheit");
	for(var i = 0; i < soundRadios.length; i++){
		if (soundRadios[i].checked){
			sound = soundRadios[i].value;

			break; 
		}
	}
	let preis = 0; 
	var preisRadios = document.getElementsByName("price-performance-zufriedenheit");
	for(var i = 0; i < preisRadios.length; i++){
		if (preisRadios[i].checked){
			preis = preisRadios[i].value;

			break; 
		}
	}
	let kommentar = document.getElementById("form-textarea-feedback").value;

	postReview(prId, name, email, design, sound, preis, kommentar);
	weiterleiten();
}

function weiterleiten() {
	window.location.href = "kommentar.html";
}

function postReview(prId, nameI, emailI, designI, soundI, preisI, kommentarI) {
	var data = {prodcutId: prId, nameInput: nameI, emailInput: emailI, designInput: designI, soundInput: soundI, preisInput: preisI, kommentarInput: kommentarI}

	fetch(url + "products/" + prId + "/reviews", {
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



