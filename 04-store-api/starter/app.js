import express from "express"
import connectDB from "./db/connect.js"
import dotenv from "dotenv"
dotenv.config()
import notFound from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import productsRouter from './routes/products.js'
import asyncErrors from 'express-async-errors';



const app = express()
app.use(express.json())
const port = process.env.PORT || 3000
const connectionString = process.env.MONGO_URI

app.use('/api/v1/products',productsRouter)
app.get('/',(req,res) => {
    res.send("hello")
  
}
)

app.use(notFound)
app.use(errorHandlerMiddleware)



const start=async ()=>{
    try {
    connectDB(connectionString)
    console.log("CONNECTED TO THE DB")
    
    app.listen(port,() => {
        console.log(`Server is listening on port ${port}`)
      
    }
    )
        
    } catch (error) {
        console.log(`MongoDB conncection error:`,error)
        
    }
}

start()