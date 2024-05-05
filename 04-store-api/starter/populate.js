import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import { Product } from './models/product.js'
import {ProductsTemplate} from "./products.js"
//const jsonProducts = require("./products.json");




const connectionString = process.env.MONGO_URI

const start=async() => {
    try {
        await connectDB(connectionString)
       await Product.deleteMany()
       await Product.create(ProductsTemplate)
       process.exit

        
        console.log('success')
        process.exit(0)
        
    } catch (error) {
        console.log(`MONGODB CONNECTION ERROR:${error}`)
        process.exit(1)
        
    }

  
}
  

start()