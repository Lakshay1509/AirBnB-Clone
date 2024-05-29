import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();


app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true ,limit: "16kb"}));


app.use(express.static('public'));
app.use(cookieParser());


import userRoute from "./routes/user.router.js"

app.use("/api/v1/users", userRoute)
export default app;