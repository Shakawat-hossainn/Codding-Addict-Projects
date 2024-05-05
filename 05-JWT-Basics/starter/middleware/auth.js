
import dotenv from 'dotenv'
dotenv.config()
import CustomAPIError from '../errors/custom-error.js'
import jwt from 'jsonwebtoken'
import {UnauthenticatedError} from '../errors/index.js'
const authenticalMidlleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
      throw new UnauthenticatedError('No token provided')
    }
    const token = authHeader.split(' ')[1]
    try {
        
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
       //console.log(decoded)
       const {id,username} = decoded
       req.user = {id,username}
        
      
          
    } catch (error) {
      throw new UnauthenticatedError("Not Authorized to access this route")
      
    }
  next()
}


export default authenticalMidlleware