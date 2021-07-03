import { Server as HttpServer }     from "http"
import { Server as SocketServer }   from "socket.io"
import { Lyric, LyricContent }      from "../types/lyric"

export default class Socket {
    static io: SocketServer

    static init(server: HttpServer) {

        // Open socket connection
        this.io = new SocketServer(server, { cors: { origin: "*", methods: ["GET", "POST"] } })

        // Socket middleware
        this.io.use((socket, next) => {
            const type = socket.handshake.auth.type
            const address = socket.handshake.address
            if (type !== "remote" && type !== "display") {
                return next(new Error("unauthorized access"));
            }
            console.log(`[socket] a ${type} is connected from ${address}`)
            next()
        })

        // Event handling
        this.io.on("connection", socket => {
            // for debugging
            socket.onAny((event, ...args) => {
                console.log(event, args);
            })
            // lyric:title
            socket.on("lyric:title", msg => {
                this.io.emit("lyric:title", new Lyric(msg))
            })
            // lyric:clear
            socket.on("lyric:clear", msg => {
                this.io.emit("lyric:clear", new LyricContent())
            })
            // lyric:update
            socket.on("lyric:update", msg => {
                this.io.emit("lyric:update", new LyricContent(msg))
            })
            // A client disconnected
            socket.on("disconnect", msg => {
                console.log(`[socket] a client disconnected`)
            })
        })

    }
}





