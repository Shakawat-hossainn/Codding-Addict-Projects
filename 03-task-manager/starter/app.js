import express from "express"
import tasks from "./routes/route.js"
import connectDB from "./db/connectDB.js"
import notFound from "./middlewares/not-found.js"
import errorHandlerMiddleware from "./middlewares/errorHandler.js"
const app = express()
app.use(express.static('./public'))
app.use(express.json())
const port = process.env.PORT || 3000

app.use("/api/v1/tasks",tasks)
// the below middleware needs to be under the routes middleware
app.use(notFound)
app.use(errorHandlerMiddleware)
const start =async() => {
    try {
       connectDB()
        app.listen(port,() => {
            console.log(`Server is listening on port ${port}`)
          
        }
        )
    } catch (error) {
        console.log(error)
        
    }
  
}




start()



