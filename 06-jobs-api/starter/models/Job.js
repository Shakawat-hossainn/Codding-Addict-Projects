import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        company:{
            type:String,
            required:[true,'Please provide comapny'],
            maxlength:100
        },
        position:{
            type:String,
            required:[true,'Please provide position'],
            maxlength:100
        },
        status:{
            type:String,
           enum:['Interview','Pending','Declined'],
           default:'Pending'
           
        },
        createdBy:{
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    },{timestamps:true})

    export const Jobs = mongoose.model("Jobs",jobSchema)