import mongoose from 'mongoose';
const schema = mongoose.Schema({
  topic:String,
  username:String,
  handle:String,
  time:String,
  image:String,
  liked: Boolean,
  likes: Number,
  disliked:Boolean,
  dislikes:Number,
  replies:Number,
  retuits:Number,
  title:String,
  tuit: String,  
}, {collection: 'tuits'});
export default schema;
