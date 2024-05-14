import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectToMongo from './db/connectToMongoDB.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{res.send('Hello World'); })

// app.get("/api/auth/signup",(req,res)=>{
//     res.send('Sign up page'); 
// })

// app.get("/api/auth/signup",(req,res)=>{
//     res.send('logout page'); 
// })

app.use(express.json());
// console.log(express.json());

app.use("/api/auth",authRoutes)


app.listen(PORT, () => {
    connectToMongo();
    console.log(`server is running on ${PORT}`)
})