const express=require('express');
let taskcontroller=require("../module/task.js");
let {requireauth}=require("../middleware/auth.js");
const taskrouter=express.Router();

//taskrouter.get("/task",{requireauth}.gettask);
taskrouter.get("/task",[requireauth],taskcontroller.gettask);
// taskrouter.get("/task",taskcontroller.gettask);
taskrouter.post("/task/insertdata",taskcontroller.inserttask);
taskrouter.put("/task/updatedata/:id",taskcontroller.updatepassword);
taskrouter.delete("/task/delete",taskcontroller.deletetask);

module.exports=taskrouter;