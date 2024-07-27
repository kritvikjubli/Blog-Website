import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import mongoose from 'mongoose';
import Usermodel from './models/User.js';
import Post from "./models/post.js"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from "multer";
const upload = multer({ dest: 'uploads/' });
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


dotenv.config()
const MONGO_URL = process.env.DB_URI;
const sec=process.env.SECRET;

const app= express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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
            res.json(info);
    });
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
});


app.post('/post',upload.single('file'), async (req,res)=>{
    const {originalname,path}=req.file;
    const part=originalname.split('.');
    const ext=part[part.length-1];
    const newpath=path+'.'+ext;
    fs.renameSync(path,newpath)
    const {token}=req.cookies;
    jwt.verify(token,sec,{},async(err,info)=>{
        if(err){
            throw err;
        }
        const {title,summ,content}=req.body;
    const postdoc=await Post.create({
        title,
        summ,
        content,
        cover:newpath,
        author:info.id,
    })
    res.json(postdoc)
    });
})

app.get('/post',async (req,res)=>{
    res.json(await Post.find()
    .populate('author',['username'])
    .sort({createdAt:-1})
    .limit(20)
);
})

app.get('/post/:id',async(req,res)=>{
    const {id}=req.params;
    const postdoc=await Post.findById(id).populate('author',['username']);
    res.json(postdoc);
})

app.put('/post',upload.single('file'), async(req,res)=>{
    let newpath=null;
    if(req.file){
    const {originalname,path}=req.file;
    const part=originalname.split('.');
    const ext=part[part.length-1];
    newpath=path+'.'+ext;
    fs.renameSync(path,newpath)
    }
    const {token}=req.cookies;
    jwt.verify(token,sec,{},async(err,info)=>{
        if(err){
            throw err;
        }
        const {id,title,summ,content}=req.body;
        const postdoc = await Post.findById(id)
        const isauthor = JSON.stringify(postdoc.author)===JSON.stringify(info.id);
        if(!isauthor){
            return res.status(400).json('you are not author')
        }
        await postdoc.updateOne({
            title,
            summ,
            content,
            cover: newpath ? newpath: postdoc.cover,
        })
    res.json(postdoc)
    });
})

app.listen(4000,()=>{
    console.log("http://localhost:4000")
});
