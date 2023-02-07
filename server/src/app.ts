import express from 'express';
const app = express();
import playlistRouter from "./routes/playlist";
import mongoose, { connect, ConnectOptions } from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import createError from 'http-errors';

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

app.use((req, res, next) => {
  next(createError(404, "Not Found!"))
})

// error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

export default app;