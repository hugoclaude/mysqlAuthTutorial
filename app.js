const express = require("express");
const mysql = require("mysql");

const app = express();

    // change to IP address once added to heroku
const db = mysql.createConnection({
    host: localhost,
    user: 'root',
    password: '',
    database: 'nodejs-login',
})

db.connect((error) => {
     if(error) {
         console.log(error)
     } else {
         console.log("MYSQL Connected...")
     }
})

// http://localhost/phpmyadmin/ 

app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>")
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
})