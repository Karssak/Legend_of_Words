const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const path = require("path");
const config = require("./config");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const xss = require("xss");
const fs = require('fs');

const app = express();
const port = config.port;

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "public"));
app.set("view engine", "ejs");
app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: false
}));

const dbConfig = require("./dbConfig");
const db = mysql.createConnection(dbConfig);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

app.use(limiter);

app.get("/", (req, res) => {
	res.render("index", {
		user: req.session.user
	});
});

app.get("/settings", (req, res) => {
	res.render("settings", {
		user: req.session.user
	});
});

app.get("/wip", (req, res) => {
	res.render("wip", {
		user: req.session.user
	});
});

db.connect((err) => {
	if (err) {
		console.error("MySQL connection failed:", err);
	} else {
		console.log("Connected to MySQL database");
	}
});

app.post("/register", async (req, res, next) => {
	let {
		username,
		email,
		password
	} = req.body;

	username = xss(username);
	email = xss(email);
	password = xss(password);

	const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
	if (!usernameRegex.test(username)) {
		return res.status(400).json({
			message: "Invalid username format."
		});
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({
			message: "Invalid email format."
		});
	}

	try {
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
		if (!passwordRegex.test(password)) {
			return res.status(400).json({
				message: "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long."
			});
		}

		const userExistsQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
		db.query(userExistsQuery, [username, email], async (err, result) => {
			if (err) {
				console.error("Database error:", err);
				logError(err);
				return res.status(500).json({
					message: "Database error"
				});
			}

			if (result.length > 0) {
				const existingUser = result[0];
				if (existingUser.username === username) {
					return res.status(400).json({
						message: "Username already exists"
					});
				} else {
					return res.status(400).json({
						message: "Email already exists"
					});
				}
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const insertUserQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
			db.query(insertUserQuery, [username, email, hashedPassword], (err, result) => {
				if (err) {
					console.error("Registration failed:", err);
					logError(err);
					return next(err);
				}
				console.log("User registered successfully");
				logRegistration(username);
				req.session.user = {
					username: username,
					email: email
				};
				res.redirect("/");
			});
		});
	} catch (error) {
		console.error("Error registering user:", error);
		logError(error);
		res.status(500).json({
			message: "Internal server error"
		});
	}
});

function logRegistration(username) {
	const logFilePath = path.join(__dirname, 'logs', 'registration.log');
	const timestamp = new Date().toISOString();
	const logMessage = `${timestamp}: User registered - ${username}\n`;

	fs.appendFile(logFilePath, logMessage, (err) => {
		if (err) {
			console.error("Error logging:", err);
		}
	});
}

app.post("/login", async (req, res, next) => {
	let {
		email,
		password
	} = req.body;

	email = xss(email);
	password = xss(password);

	try {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				message: "Invalid email format."
			});
		}

		const sql = "SELECT * FROM users WHERE email = ?";
		db.query(sql, [email], async (err, result) => {
			if (err) {
				console.error("Database error:", err);
				logError(err);
				return res.status(500).json({
					message: "Database error"
				});
			}

			if (!result || result.length === 0) {
				return res.status(401).json({
					message: "Email is not registered"
				});
			}

			const user = result[0];
			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
				logLoginAttempt(email, false);
				return res.status(401).json({
					message: "Invalid password"
				});
			}

			logLoginAttempt(email, true);
			req.session.user = {
				username: user.username,
				email: user.email
			};
			console.log("User logged in successfully");
			res.redirect("/");
		});
	} catch (error) {
		console.error("Error logging in:", error);
		logError(error);
		res.status(500).json({
			message: "Internal server error"
		});
	}
});

function logLoginAttempt(email, success) {
	const logFilePath = path.join(__dirname, 'logs', 'login.log');
	const timestamp = new Date().toISOString();
	const logMessage = `${timestamp}: Login attempt - Email: ${email}, Success: ${success}\n`;

	fs.appendFile(logFilePath, logMessage, (err) => {
		if (err) {
			console.error("Error logging:", err);
		}
	});
}

function logError(errorMessage) {
	const logFilePath = path.join(__dirname, 'logs', 'login.log');
	const timestamp = new Date().toISOString();
	const logMessage = `${timestamp}: ${errorMessage}\n`;

	fs.appendFile(logFilePath, logMessage, (err) => {
		if (err) {
			console.error("Error logging:", err);
		}
	});
}

function errorHandler(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("Something broke!");
}

app.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error("Error destroying session:", err);
		} else {
			res.redirect("/");
		}
	});
});

app.use((req, res, next) => {
	if (req.session.user) {
		req.session.lastActivity = Date.now();
	}
	next();
});

const INACTIVITY_TIMEOUT = 20 * 60 * 1000;

app.use((req, res, next) => {
	if (req.session.user && Date.now() - req.session.lastActivity > INACTIVITY_TIMEOUT) {
		req.session.destroy((err) => {
			if (err) {
				console.error("Error destroying session:", err);
			}
		});
	}
	next();
});

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
