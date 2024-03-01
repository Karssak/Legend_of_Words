async function validateAndSubmit() {
	const form = document.getElementById("registerForm");
	const formData = new FormData(form);
	const username = formData.get("username");
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		const response = await fetch("/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				username,
				email,
				password
			}).toString(),
		});

		if (!response.ok) {
			const errorData = await response.json();
			displayCustomAlert(errorData.message);
		} else {
			window.location.href = "/";
		}
	} catch (error) {
		displayCustomAlert("An unknown error occurred.");
	}
}

function displayCustomAlert(message) {
	var alertBox = document.getElementById("passwordAlert");
	var alertMessage = document.getElementById("alertMessage");
	alertMessage.innerHTML = message;
	alertBox.style.display = "block";
}

function closeCustomAlert() {
	var alertBox = document.getElementById("passwordAlert");
	alertBox.style.display = "none";
}

function togglePasswordVisibility(fieldId) {
	var passwordField = document.getElementById(fieldId);
	var passwordToggle = passwordField.nextElementSibling;

	if (passwordField.type === "password") {
		passwordField.type = "text";
		passwordToggle.src = "img/hide.png";
	} else {
		passwordField.type = "password";
		passwordToggle.src = "img/eye.png";
	}
}