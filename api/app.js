import express from 'express';
import cors from 'cors';


const app = express();


app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}))

import userRoute from "./routes/user.router.js"

app.use("/api/v1/users", userRoute)
export default app;