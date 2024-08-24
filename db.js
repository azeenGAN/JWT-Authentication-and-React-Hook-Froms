
import { MongoClient,ServerApiVersion } from 'mongodb'
import dotenv from "dotenv"

dotenv.config()

const url = process.env.DATABASE_PASSWORD
const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


export async function connectToMongoDB(name) {
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        let db = client.db(name);//database reference
        console.log(`Connected to database ${name}`)
        return db;             
        
    } catch (errors) {
        console.error('Error connecting to MongoDB', errors)
    }
}

export async function closeConnection() {
    await client.close();
    console.log('Disconnected from MongoDB');
}

