const url="mongodb+srv://zawwad7:O9LNIB4gAahmaFv0@cluster0.kjwckhw.mongodb.net/?retryWrites=true&w=majority"
const connection__Url="mongodb+srv://BMS:SL1aF9E66SFILDii@cluster0.ueicbqz.mongodb.net/test?retryWrites=true&w=majority"
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose"
import {User,Cohort} from "./User.js"

const app=express()
app.use(bodyParser.json());
app.use(cors());
const Port=process.env.PORT|| 8001
mongoose.connect(connection__Url,{
    useNewUrlParser: true,
})
mongoose.connection.once('open',()=>{
    console.log("database connected")
})
app.get("/",(req,res)=>{
    res.send("hello")
})

app.post("/User",(req,res)=>{
    const user={
        email:req.body.email,
        name:req.body.name,
        img:req.body.img
    }
    new User(user,(err,data)=>{
        if(err){
            res.status(401).send("User Information not send")
        }

    else{
        res.status(200).send(data)
    }
    }).save()
})
app.get("/GetUser",(req,res)=>{
    User.find((err,data)=>{
        if(err){
            res.status(401).send("Worng Path")
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.post("/ParentCohort",(req,res)=>{
    const ParentCohort=req.body.ParentCohort
    const CreatorEmail=req.body.CreatorEmail
   new Cohort({
    ParentCohort:ParentCohort,
    CreatorEmail:CreatorEmail},
    (err,data)=>{
        if(err){
         res.send(err.message)
        } else{
         res.send(data)
        }
       }
    ).save()
})
app.post('/ParentCohortStudentList/:id',(req,res)=>{
    const id=req.params.id
    const options = { upsert: true };
    Cohort.updateMany(
      {
        _id:id
      },
      {
         
  $push:{
    ParentCohortStudentList:[
        {
            email:req.body.email
        }
    ]
        },},
      options,
      (err,data)=>{
        if(err){
          res.status(401).send(err.message)
        }
        else{
          res.status(200).send(data)
        }
  
      }
    )
    
  })
// update modify
  app.post('/childrenCohort/:id',(req,res)=>{
    const id=req.params.id
    const options = { upsert: true };
    Cohort.updateOne(
      {
        _id:id
      },
      {
         
  $push:{
    childrenCohort:[
        {
            childrenCohortName:req.body.childrenCohortName
        }
    ]
        },},
      options,
      (err,data)=>{
        if(err){
          res.status(401).send(err.message)
        }
        else{
          res.status(200).send(data)
        }
  
      }
    )
    
  })
  app.post('/ChildrenCohortStudentList/:id',(req,res)=>{
    const id=req.params.id
    const options = { upsert: true };

        Cohort.updateMany(
            {
               'childrenCohort._id':id
          },
            {
               
        $push:{
                 "childrenCohort.$.ChildrenCohortStudentList":req.body
              },},
            // options,
            (err,data)=>{
              if(err){
                res.status(401).send(err.message)
              }
              else{
                res.status(200).send(data)
              }
        
            }
          )
        // console.log(data[0])


    //   }
    // })
   
    
  })
  
  app.post('/secondChildrenCohort/:id',(req,res)=>{
    const id=req.params.id
    const options = { upsert: true };
    Cohort.updateMany(
      {
        'childrenCohort._id':id
      },
      {
         
  $push:{
    "childrenCohort.$.secondChildrenCohort":[
      {
        cohortName:req.body.cohortName,
        section:req.body.section,
        roomNumber:req.body.roomNumber,
        subject:req.body.subject,
       
      }
    ]
        },},
      options,
      (err,data)=>{
        if(err){
          res.status(401).send(err.message)
        }
        else{
          res.status(200).send(data)
          console.log(data)
        }
  
      }
    )
    
  })

  // app.post('/secondChildrenStudentList/:id',(req,res)=>{
  //   const id=req.params.id
  //   const options = { upsert: true };
  //   Cohort.updateMany(
  //     {
  //       'childrenCohort.secondChildrenCohort._id':id
  //     },
  //     {
         
  // $push:{
  //   "childrenCohort.$.secondChildrenCohort.$.secondChildrenStudentList":[
  //     {
  //       email:req.body.email,
  //       name:req.body.name
  //     }
  //   ]
  //       }
  //       },
  //     options,
  //     (err,data)=>{
  //       if(err){
  //         res.status(401).send(err.message)
  //       }
  //       else{
  //         res.status(200).send(data)
  //         console.log(data)
  //       }
  
  //     }
  //   )
    
  // })

  app.get("/GetApi",(req,res)=>{
    Cohort.find((err,data)=>{
      if(err){
        res.status(401).send(err.message)
    }
    else{
        res.status(200).send(data)
    }
    })
  })
app.listen(Port,()=>{
    console.log(`server started at port ${Port}`);
  })