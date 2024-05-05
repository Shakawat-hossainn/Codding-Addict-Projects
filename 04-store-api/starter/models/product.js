import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:[true,"Name must be provided"]
        },
        company:{
            type: String,
           enum:{
            values:['marcos',"liddy","ikea","caressa",],
            message:"{VALUE} is not supported"
           }
        },
        rating:{
            type: Number,
            default:4.5
        },
        price:{
            type: String,
            default:0
        },
        featured:{
            type:Boolean,
            default:false
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }

    },{timestamps:true})


    export const Product = mongoose.model("Product",productSchema)