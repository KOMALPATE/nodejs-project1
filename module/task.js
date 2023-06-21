
const express=require('express');
const routers=express.Router();
const db_con=require('../config/database.config.js');
const jwtToken=require('../services/jwt');
//const { encrypt}   = require('../services/bycrypt');
const jwt=require('jsonwebtoken');
//const{ generateToken,verifyToken}=require('../services/jwt.js');
const { encrypt } = require('../services/bycrypt');
//const {token}=require('morgan');
//const { assign } = require('nodemailer/lib/shared');
const saltRounds=10;
let taskcontroller={};

taskcontroller.gettask = function(req,res){
  let sqlQuery='select * from task_tbl';
  db_con.query(sqlQuery,function(err,result){
      if(err)throw err;
      console.log("record display",result);
      res.send(result);
  });
  
};
taskcontroller.inserttask=function(req,res,err){
    let task=req.body;
    let password=req.body;
    task.password=encrypt(task.password)
     console.log(":::::::::",task);
    let tokenGenerate=jwtToken.generateToken(password);
    console.log(tokenGenerate,"::::::");
    res.send(tokenGenerate);
    let sqlQuery = `insert into task_tbl (taskname,status,assign,password)values('${task.taskname}','${task.status}','${task.assign}','${task.password}');`
    db_con.query(sqlQuery,function(err,result){
        if(err)throw err;
        console.log("1 record inserted", );
        res.send(result);
    })

}

taskcontroller.updatepassword = function (req,res,err) {
      let task=req.body;
       let sqlQuery=`UPDATE task_tbl set taskname='${task.taskname}'WHERE id='${task.id}'`;
       db_con.query(sqlQuery,function(err,data){
        if(err)throw err;
      console.log("forgetpassword",data);
      res.send(data);
      
      })

  
    
    };
taskcontroller.deletetask=function(req,res){
  let task = req.body;
  let sqlQuery=`delete from task_tbl  where id= '${task.id}';`
  db_con.query(sqlQuery,function(err,result){
    if(err)throw err;
    console.log("delete data",result);
    res.send(result);
  })
}
module.exports=taskcontroller;