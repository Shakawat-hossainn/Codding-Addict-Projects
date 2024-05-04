import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Must be provided"],
            trim:true,
            maxLength:[20,"Cannot be more than 20 characters"]
        },
        completed:{
            type:Boolean,
            default:false,
        }
    },{timestamps:true})

    export const Task = mongoose.model("Task",taskSchema)