import  UnauthenticatedError  from "../errors/unauthenticated.js"
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

const authenticationMidlleware = async (req,res,next) => {
    console.log(req.headers)
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Invalid authentication')

    }
    const token = authHeader.split(' ')[1]
try {
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    // Inserting into the request query
    req.user = {userId:payload.userId,name:payload.name}
    
} catch (error) {
    throw new UnauthenticatedError('Invalid authentication')
    
}


    next()
  
}




export default authenticationMidlleware