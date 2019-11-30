var itemListe = document.getElementById("produkteListe");
var bildContainer = document.getElementById("produktAuswahlBild");

var nameField = document.getElementById("nameInput");
var emailField = document.getElementById("emailInput");
var feedbackText = document.getElementById("form-textarea-feedback");



nameField.addEventListener("change", validateFeedback);
emailField.addEventListener("change", validateFeedback);
feedbackText.addEventListener("change", validateFeedback);


function validateFeedback() {

	var submitButton = document.getElementById("submitButton");

	if (nameValidation() && emailFieldValidation() && feedbackTextValidation()) {
		submitButton.disabled = false;
	} else {
		submitButton.disabled = true;
	}
}



function nameValidation() {
	if(nameField.value.length >= 1) {
		return true;
	} else {
		return false;
	}
}

function emailFieldValidation() {
	if(true){
		return true;
	} else {
		return false;
	}
}


function feedbackTextValidation() {
	if(feedbackText.value.length <= 50) {
		return true;
	} else {
		return false;
	}
}


function itemHinzufuegenBewertung() {
	var weiteresProdukt = document.createElement("option");

	weiteresProdukt.append("Dritter Test für Produkte mit JS");

	itemListe.appendChild(weiteresProdukt);
}

//nur zu testzwecken mit wert
var wert = 0;
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


