import mongoose from 'mongoose';

const postschema=new mongoose.Schema({
   title:String,
   summ:String,
   content:String,
   cover:String,
   author:{type:mongoose.Schema.Types.ObjectId,ref:'Usermodel'}
},{timestamps:true});
export default mongoose.model('Post', postschema);
