import mongoose from 'mongoose';
const userschema=new mongoose.Schema({
    username:{
        required:true,
        type:String,
        min:3,
        unique:true,
    },
    userpass:{
        required:true,
        type:String,
        min:6
    },
});
export default mongoose.model('Usermodel', userschema);
