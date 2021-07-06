import express from 'express';
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    // change to IP address once added to heroku
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