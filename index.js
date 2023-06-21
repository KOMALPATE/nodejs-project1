const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql2');
const cors = require('cors');
const userrouter = require('./routers/users.js');
const taskrouter=require('./routers/task.js');
//const jwt=require('./services/jwt.js')
//const jwt=require('jsonwebtoken');
const app = express();
const PORT = 5000;
const db_con = require('./config/database.config.js');

app.use(bodyParser.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use("/",userrouter);
app.use("/",taskrouter);



db_con.connect((err) => {
  if (err) {
    console.log("Database connection failed!!!", err);
  } else {
    console.log("connected to database");
  }
});




app.use(express.json()); // Parse JSON request body

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`server is listening on PORT : //http://localhost:${PORT}`)
});
