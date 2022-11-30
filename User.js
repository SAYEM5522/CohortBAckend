import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    email:{
        require:true,
        type:String,
        unique:true,
    },
    name:{
        type:String,
        require:true,
        trim:true
    },
    img:{
        type:String,
        
    }

})
const CohortSchema=new mongoose.Schema({
    ParentCohort:{
      type:String,require:true,unique:true
    },
    CreatorEmail:{
      type:String,require:true,trim:true
    },
    ParentCohortStudentList:[
        {
            email:{
                type:String,require:true,trim:true,unique:true
            },
           
           
        }
    ],
    childrenCohort:[
           {
            childrenCohortName:{
              type:String,require:true,trim:true
            },
            ChildrenCohortStudentList:[
                {
                    CSEmail:{
                        type:String,require:true,trim:true
                    },
                   
                   
                }
            ],
            secondChildrenCohort:[
                {
                    cohortName:{
                        type:String,require:true
                      },
                      section:{
                        type:String,require:true,
                      
                      },
                      roomNumber:{
                        type:String,require:true,
                      },
                      subject:{
                        type:String,require:true,
                      },
                      secondChildrenStudentList:[
                        {
                            SecondCohortEmail:{
                                type:String,require:true,trim:true
                            },
                            
                           
                        }
                    ],
                },
                
            ]

        }
    ]
  })
const User=mongoose.model("UserSchema",UserSchema)
const Cohort=mongoose.model("CohortSchema",CohortSchema)

export  {User,Cohort}