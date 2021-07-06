import { Server as HttpServer }     from "http"
import Database                     from "./database"
import { Server as SocketServer }   from "socket.io"
import { Lyric, LyricContent }      from "../types/lyric"
import { DatabaseSettings }         from "../types/database"
import { Collection }               from "mongodb"

export default class Socket {
    static io: SocketServer
    static settings: DatabaseSettings
    static settingsCollection: Collection

    static async loadSettings(): Promise<DatabaseSettings> {
        const collection: Collection    = Database.db.collection("settings")
        var result                      = await collection.findOne({})
        if (result !== null)            { return new DatabaseSettings(result) }
        return new DatabaseSettings()
    }

    static async saveSettings(settings: DatabaseSettings) {
        const collection: Collection = Database.db.collection("settings")
        collection.remove({})
        await collection.insertOne(settings)
    }

    static async init(server: HttpServer) {
        // Settings on saved current lyrics
        this.settings = await this.loadSettings()

        // Open socket connection
        this.io = new SocketServer(server, { cors: { origin: "*", methods: ["GET", "POST"] } })
        // Socket middleware
        this.io.use((socket, next) => {
            const type = socket.handshake.auth.type
            const address = socket.handshake.address
            if (type !== "remote" && type !== "display") {
                return next(new Error("unauthorized access"));
            }
            this.io.to(socket.id).emit("remote:init", "hahahah");
            console.log(`[socket] a ${type} is connected from ${address}`)
            next()
        })

        // Event handling
        this.io.on("connection", socket => {
            // this.io.emit("lyric:update", this.settings)

            // Select lyric
            socket.on("lyric:select", data => {
                this.io.emit("lyric:select", data)
                this.saveSettings(new DatabaseSettings({
                    lyric: data,
                    content: undefined,
                    status: "running"
                }))
            })
            // Select content
            socket.on("lyric:content", data => {
                this.io.emit("lyric:content", data)
                this.saveSettings(new DatabaseSettings({
                    lyric: this.settings.lyric,
                    content: data,
                    status: this.settings.status
                }))
            })
            // Stop active lyric
            socket.on("lyric:stop", data => {
                this.io.emit("lyric:stop", data)
                this.saveSettings(new DatabaseSettings({
                    lyric: undefined,
                    content: undefined,
                    status: "idle"
                }))
            })

            // A client disconnected
            socket.on("disconnect", msg => {
                console.log(`[socket] a client disconnected`)
            })
        })

    }
}





