import dotenv from "dotenv"
dotenv.config()
import expressAsyncErrors from 'express-async-errors'
import express from 'express'
import authRoute from './routes/auth.js'
import jobsRoute from './routes/jobs.js'
import authenticationMidlleware from "./middleware/authentication.js";

const app = express();

// error handler
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import connectDB from "./db/connect.js"

app.use(express.json());
// extra packages
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/jobs',authenticationMidlleware,jobsRoute)
// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const connectionString = process.env.MONGO_URI

const start = async () => {
  try {
    connectDB(connectionString)
   
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
