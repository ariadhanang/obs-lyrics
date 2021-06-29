import dotenv               from 'dotenv'
import { MongoClient, Db }  from "mongodb"

dotenv.config()

const options   = {
    useUnifiedTopology: true
};
const dbHost = process.env.DB_HOST ? process.env.DB_HOST : "mongodb://localhost:27017/"
const dbName = process.env.DB_NAME ? process.env.DB_NAME : "lyrics"

export default class Database {
    static db: Db;
    static connection: any;
    static async open() {
        if (this.db) return this.db;
        this.connection = await MongoClient.connect(dbHost, options);
        this.db = this.connection.db(dbName);
        console.log(`[database] is connected to ${dbName}`);
        return this.db;
    }
}