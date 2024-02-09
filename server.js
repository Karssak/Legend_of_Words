const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const path = require("path");
const config = require("./config");
const session = require("express-session");
const rateLimit = require("express-rate-limit");

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

db.connect((err) => {
	if (err) {
		console.error("MySQL connection failed:", err);
	} else {
		console.log("Connected to MySQL database");
	}
});

app.post("/register", async (req, res, next) => {
	const {
		username,
		email,
		password
	} = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
		db.query(sql, [username, email, hashedPassword], (err, result) => {
			if (err) {
				console.error("Registration failed:", err);
				return next(err);
			}
			console.log("User registered successfully");
			req.session.user = {
				username: username
			};
			res.redirect("/");
		});
	} catch (error) {
		console.error("Error hashing password:", error);
		next(error);
	}
});

app.post("/login", async (req, res, next) => {
	const {
		email,
		password
	} = req.body;

	try {
		const sql = "SELECT * FROM users WHERE email = ?";
		db.query(sql, [email], async (err, result) => {
			if (err) {
				console.error("Database error:", err);
				return res.status(500).send("Database error");
			}

			if (!result || result.length === 0) {
				return res.status(401).send("Email is not registered");
			}

			const user = result[0];
			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
				return res.status(401).send("Invalid password");
			}

			req.session.user = {
				username: user.username
			};
			console.log("User logged in successfully");
			res.redirect("/");
		});
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).send("Internal server error");
	}
});

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

const INACTIVITY_TIMEOUT = 20 * 60 * 1000; // 20 minutes

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