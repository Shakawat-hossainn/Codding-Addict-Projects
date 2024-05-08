import bcrypt from 'bcryptjs'
import { User } from "../models/User.js"
import  BadRequestError from '../errors/bad-request.js'
import  UnauthenticatedError from '../errors/bad-request.js'
import { StatusCodes } from 'http-status-codes'
const login =async(req,res) => {
   const {password,email} = req.body

   if(!password || !email){
    throw new BadRequestError('Provide email and username')

   }
   const user = await User.findOne({email})
   if(!user){
    throw new UnauthenticatedError('Invalid credentials')
   }
   const isPasswordCorrect =await user.comparePassword(password)
   if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid credentials')
   }
   const token = user.createJWT()


   res.status(StatusCodes.OK).json({user :{name:user.username},token})
}
const register =async (req,res) => {
    const user = await User.create({...req.body})

    const token = user.createJWT()


    res.status(StatusCodes.CREATED).json({user :{name:user.username},token})
  
}

export {login,register}