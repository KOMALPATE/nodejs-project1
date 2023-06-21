const express=require('express');
const mysql = require('mysql2');
const app=express();
let db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Creditt@123",
    database: "mydb"
});

module.exports = db_con;

