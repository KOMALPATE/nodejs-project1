const express = require('express');

//import express from "express";
let {requireauth}=require("../middleware/auth.js");
const userController = require("../controllers/users.js");


 const userrouter = express.Router();
   userrouter.get("/getuser",userController.getUsers);
  userrouter.get("/searchdata/:user",userController.searchdata);
  userrouter.get("/searcdata1/:fetchStatus",userController.searcdata1);
  userrouter.post("/insert",userController.insertuser);
  userrouter.post("/veritytoken",userController.verifytoken);
  userrouter.put("/changePassword",userController.chnageUserPassword);
  userrouter.post("/forgetpassword",userController.forgetpassword);
  userrouter.put("/update",userController.update);
  userrouter.delete("/delete",userController.delete);


module.exports = userrouter;