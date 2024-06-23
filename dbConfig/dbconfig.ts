import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully!');
        })
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Make sure MongoDB is running!' + err);

            process.exit();
        })
    } catch (error) {
        console.log('An Error Occurred')
        console.log(error)
    }
}