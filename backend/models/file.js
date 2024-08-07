import mongoose from "mongoose";

const schema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
 uploaderId:{
    type :mongoose.Schema.Types.ObjectId,
    ref: "User" ,
 },
 path:{
   type: String,
   required: true,
 }
  
});

export const File = mongoose.model("File", schema); 