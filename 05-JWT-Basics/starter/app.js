import dotenv from 'dotenv'
dotenv.config()
import expressAsyncErrors from 'express-async-errors'
import express from 'express'
import homeRoute from "./routes/main.js"


const app = express();

import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1',homeRoute)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
