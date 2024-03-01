document.querySelector("#loginForm").addEventListener("submit", async (event) => {
	event.preventDefault();
	const formData = new FormData(event.target);
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				email,
				password
			}).toString(),
		});

		if (!response.ok) {
			const errorData = await response.json();
			showErrorPopup(errorData.message);
		} else {
			window.location.href = "/";
		}
	} catch (error) {
		showErrorPopup("An unknown error occurred.");
	}
});

function showErrorPopup(message) {
	const errorElement = document.getElementById('errorPopup');
	errorElement.textContent = message;
	const alert = document.querySelector('.custom-alert');
	alert.style.display = 'block';
}

document.querySelector('.close-btn').addEventListener('click', function() {
	document.querySelector('.custom-alert').style.display = 'none';
});

function togglePasswordVisibility() {
	var passwordInput = document.getElementById('password');
	var passwordToggle = document.querySelector('.password-toggle');

	if (passwordInput.type === 'password') {
		passwordInput.type = 'text';
		passwordToggle.src = 'img/hide.png';
	} else {
		passwordInput.type = 'password';
		passwordToggle.src = 'img/eye.png';
	}
}