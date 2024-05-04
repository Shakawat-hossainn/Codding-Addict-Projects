import dotenv from "dotenv"
dotenv.config()
import  mongoose  from "mongoose"


const connectionString = process.env.MONGO_URI


const connectDB = () => {
    mongoose.connect(connectionString).then(() => {
        console.log('CONNECTED TO THE DB')
      
    }
    ).catch((err) => {
        console.log(err)
      
    }
    )
    

  
}
export default connectDB