import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express';
import playlistRouter from "./routes/playlist";
import mongoose, { connect, ConnectOptions } from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import createError from 'http-errors';
const app : Application = express();

dotenv.config();
//Bodyparser Middleware
app.use(express.json())
// CORS Middleware
app.use(cors());


// const db = 'mongodb://localhost:27017/playlists';
const db = process.env.mongoURI;
mongoose.set('strictQuery', false);

main().catch(err => console.log(err));
async function main() {
  await connect(db);
}

app.get('/', (req, res)=>{
  res.send('Yes it really works!');
})

app.use('/playlist', playlistRouter);

app.use((req:Request, res: Response, next: NextFunction) => {
  next(createError(404, "Not Found!"))
})

// error handling middleware
const errorHandler : ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
}

app.use(errorHandler);

export default app;