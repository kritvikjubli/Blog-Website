import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Usermodel from './models/User.js';
const app= express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Blog:kritvikj07@cluster0.wy9yy7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.post('/register',async (req,res)=>{
    const{username,userpass} = req.body;
    try{
        const userinfo = await Usermodel.create({username,userpass});
        res.json(userinfo);
    }catch(err){
        res.status(400).json(err);
    }
})

app.post('/login',async (req,res)=>{
    const{username,userpass}=req.body;
    const userinfo=await Usermodel.findOne({username,userpass});
    // const 
    res.json(userinfo);
})


app.listen(4000,()=>{
    console.log("http://localhost:4000")
});
