const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path:'./.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABSE,
});

const publicDirectory = path.join(__dirname, './public' )
//console.log(__dirname);
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

db.connect( (error) => {
     if(error) {
         console.log(error)
     } else {
         console.log("MYSQL Connected...")
     }
})

// http://localhost/phpmyadmin/ 

app.get("/", (req, res) => {
    //res.send("<h1>Home page</h1>")
    res.render('index');
});

app.get("/register", (req, res) => {
    //res.send("<h1>Home page</h1>")
    res.render('register');
});

app.listen(8008, () => {
    console.log("Server started on port 8008");
})