import mongoose from "mongoose";
import envConfig from "./envConfig";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

// Handling Database Connection
async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already Connected to database")
        return 
    }

    try {
        const db = await mongoose.connect(envConfig.mongodbURI || '')

        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("DB Connection Failed ", error)

        process.exit(1)
    }
}

export default dbConnect;