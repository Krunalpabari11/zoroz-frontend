// lib/mongodb.js
import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        console.log("Already connected to the database.");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully:", connection.isConnected);
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("Database connection error");
    }
}

export default dbConnect;
