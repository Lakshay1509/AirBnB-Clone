import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

import userRoute from "./routes/user.router.js"

app.use("/api/v1/users", userRoute)
export default app;