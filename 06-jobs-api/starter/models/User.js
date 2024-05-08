import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,'Name must be provided'],
            minlength:3,
            maxlength:20,
           

        },
        email:{
            type:String,
            required:[true,'Email must be provided'],
            match: [
                /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
                'Please provide a valid email address'
            ],
            unique:true,

        },
        password:{
            type:String,
            required:[true,'Password must be provided'],
           
            unique:true,

        },
    },{timestamps:true})

    userSchema.pre('save', async function(){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
        
    })
    userSchema.methods.createJWT = function (){
        return jwt.sign({userId:this._id,name:this.username},process.env.JWT_SECRET,{expiresIn:'30d'})
    }
    userSchema.methods.comparePassword=async function(givenPassword){
        const isPassCorrect = await bcrypt.compare(givenPassword,this.password)
        return isPassCorrect;
    }

    export const User = mongoose.model('User',userSchema)