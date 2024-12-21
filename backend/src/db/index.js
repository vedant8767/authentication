import mongoose from 'mongoose'

const connectDB = async()=>{
    try {
        console.log(process.env.MOGODB_URI)
        const connectionInstance = await mongoose.connect(`${process.env.MOGODB_URI}/auth`)
        console.log(`MongoDB connected DB host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Connection error",error)
        process.exit(1)
    }
}

export default connectDB