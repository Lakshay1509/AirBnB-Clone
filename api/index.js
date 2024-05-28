import express from 'express';
import cors from 'cors';

const app = express();


app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}))


app.get('/test', (req, res) => {
  res.json('Hello World!');
}); 

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    //connect database
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
