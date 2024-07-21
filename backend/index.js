import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import mongoose from 'mongoose';
import Usermodel from './models/User.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
dotenv.config()
const MONGO_URL = process.env.DB_URI;
const sec=process.env.SECRET;

const app= express();
app.use(cors(
    {credentials:true,
        origin:'http://localhost:3000'}
        ));
app.use(cookieParser());
app.use(express.json());


const connectToMongoose = async () => {
    await mongoose.connect(MONGO_URL)
      .then(() => {
        console.log("connected successfully");
      })
      .catch((e) => {
        console.log("error : ", e);
      });
  };

connectToMongoose();
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
        Usermodel.findOne({username});
        const userinfo=await Usermodel.findOne({username});
            const ispassok=(userpass == userinfo.userpass);
            if(ispassok){
                jwt.sign({username,id:userinfo._id}, sec,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json({
                        id:userinfo._id,
                        username,
                    });
            })
        }
        else{
            res.status(400).json('wrong crenditials');
        }
})

app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,sec,{},(err,info)=>{
        if(err){
            throw err;
        }
        // else{
            res.json(info);
        // }
    });
    // res.json(req.cookies);
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
});

app.listen(4000,()=>{
    console.log("http://localhost:4000")
});
