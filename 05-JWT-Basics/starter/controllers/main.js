import CustomAPIError from "../errors/custom-error.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import {BadRequest} from '../errors/index.js'
const login = async (req,res) => {
    const {username,password} = req.body
   if(!username || !password){
    throw new BadRequest("Please provide username and password")
   }
   const id = new Date().getDate()
   const token = jwt.sign({username,id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES})
   

    res.status(200).json({msg:'user created',token})
  
}

const dashboard = (req,res) => {

    const luckyNumber =Math.floor(Math.random()*100)
  res.status(200).json({msg:`Hello,${req.user.username} `,secret:`Here is your authorized data,Your lucky number is ${luckyNumber} `})

  
}

export {login,dashboard}
