import { customApiError } from "../errors/customError.js"

const errorHandlerMiddleware = (err,req,res,next)=>{
    if(err instanceof customApiError ){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:"Something went wrong,try again later"})

}

export default errorHandlerMiddleware