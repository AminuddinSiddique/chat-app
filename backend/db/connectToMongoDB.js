import mongoose from "mongoose";

const connectToMongo = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('connected to mongodb')
    }catch (error){
        console.log('error while connecting to database'+error.message)
    }
}

export default connectToMongo;