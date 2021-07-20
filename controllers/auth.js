const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).render('login', {
                message: 'Please provide and email and password'
            })
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if(!results || !(await bcrypt.compare(password, results[0])))
        })
    }
}

exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;

    db.query("SELECT email FROM users WHERE email = ?", [email], async (error, results) => {
            if(error) {
                console.log(error);
            }

            if (results.length > 0) {
                return res.render("register", {
                    message: "Email already in use",
                });
            } else if(password !== passwordConfirm) {
                return res.render("register", {
                    message: "Passwords do not match",
                });
            }

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results) => {
                if(error) {
                    console.log(error);
                }else {
                    console.log(results)
                    return res.render('register', {
                        message: 'User registered'
                    });
                }
            })
        }
    );
};
