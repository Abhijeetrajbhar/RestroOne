import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://abhijeet:abhi1234@cluster0.wqokkcw.mongodb.net/zomatoclone').then(()=>console.log("DB Connected"))
}


