
import { MongoClient,Db } from 'mongodb'

const url = 'mongodb+srv://usamarajpoot3450:NfYAuqm6wqUb5QsY@authenticationcluster.5vthh.mongodb-stage.net/?retryWrites=true&w=majority&appName=authenticationCluster'
const client = new MongoClient(url);


export async function connectToMongoDB(name) {
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        let db = client.db(name);//database reference
        console.log(`Connected to database ${name}`)
        return db;             
        
    } catch (errors) {
        console.error('Error connecting to MongoDB', errors.message)
    }
}


export async function closeConnection() {
    await client.close();
    console.log('Disconnected from MongoDB');
}

