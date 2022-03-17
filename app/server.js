var express= require("express");
var app= express();
var bodyParser = require('body-parser')
var MongoClient=require("mongodb").MongoClient;

var port=3001;

var cors = require("cors");
app.use(cors());

app.listen(port,function(){
    console.log(`App is listening on port ${port}`)
})

// var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()
const uri = "mongodb://admin:password@localhost:2701";

app.post("/update-profile",jsonParser,(req,res)=>{

    try{
        var {name,email,hobbies}=req.body;
        if(hobbies){
            hobbies=hobbies.split(",");
        }

        MongoClient.connect(uri,function(err,client){
    
            if(err){
                throw err;
            }
            var db=client.db("admin");
            db.collection("users").findOne({email:email},async function(err,result){
                if(!result){
                  await db.collection("users").insertOne({name,email,hobbies});
                }else{
                  await db.collection("users").updateOne({email},{$set:{name,email,hobbies}});
                }
                client.close();
                res.json({status:200,message:"Profile updated successfully"});
            })
        })
    }catch(err){
        res.json({status:400,message:"Internal server error",error:err.message});
    }
})