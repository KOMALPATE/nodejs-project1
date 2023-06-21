const express= require('express');
const multer=require('multer');
const path = require('path');
const app=express();


const filestorageEngine = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"./uploads");
        },
        filename:function(req,file,cb){
            cb(null,Date.now()+ "-" + file.originalname);
        },
    });
    const upload=multer({storage:filestorageEngine});
    const multipleUpload=upload.fields([{name:'file1'},{name:'file2'}])
//     app.post("/upload",upload.single("user_file1"),(req,res)=>{
//     console.log(req.file);
//     res.send("file upload")
// });
app.post("/upload2",multipleUpload,(req,res)=>{
  
    if(req.files){
        console.log("files upload");
        console.log(req.files);
        res.send("file upload");
    }
})
app.listen(6000);