import dotenv               from 'dotenv'
import { MongoClient, Db }  from "mongodb"

dotenv.config()

const options   = {
    useUnifiedTopology: true
};
const host = process.env.DB_HOST ? process.env.DB_HOST : "mongodb://localhost:27017/"
const name = process.env.DB_NAME ? process.env.DB_NAME : "lyrics"

export default class Database {
    static db: Db;
    static connection: any;
    static async open() {
        // If connection has been initialized before
        if (this.db) return this.db;
        // Else, create new connection
        this.connection = await MongoClient.connect(host, options);
        this.db         = this.connection.db(name);
        console.log(`[database] is connected to ${name}`);
        return this.db;
    }
}