import express from "express";
import mongoose from "mongoose";
import dotenv  from 'dotenv';
import authRouter from './routes/auth.route.js'
import NoteRouter from './routes/notes.route.js'
import cookieParser from "cookie-parser";
dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err);
    console.log("not connected to db ");
});

const app = express()
app.use(express.json());
app.use(cookieParser());
const port = 3000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use('/api/auth', authRouter);
app.use('/api/notes', NoteRouter);


app.use((err,rq,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    return res.status(statusCode).json({
      succes:false,
      statusCode,
      message,
    });
  });