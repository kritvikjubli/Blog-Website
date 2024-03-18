import express from 'express';
const app= express();

app.get('/test',(req,res)=>{
    res.json("text ok");
})
app.listen(4000,()=>{
    console.log("http://localhost:4000")
});