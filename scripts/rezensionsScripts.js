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

