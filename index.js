import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import adminrouter from './Router/Admin_router.js';
import instructorrouter from './Router/Instructor_router.js';
import instructorclassRouter from './Router/Instructor_class_router.js';
import studentclassRouter from './Router/Student_class_router.js'
import messageRouter from './Router/Message_router.js';
import studentRouter from './Router/Student_router.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true

}));


const corsOptions = {
   origin:true
}

app.listen(port,()=>{
    console.log('server is running '+port)
})



//database connection
const URL = process.env.MONGO_URL;

mongoose.connect(URL, {

})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected');
})


//routes
app.use('/admin', adminrouter);
app.use('/instructor', instructorrouter);
app.use('/instructorclass', instructorclassRouter );
app.use('/studentclass', studentclassRouter);
app.use('/message', messageRouter);
app.use('/student', studentRouter);