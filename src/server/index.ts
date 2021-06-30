import dotenv		from 'dotenv'
import express 		from 'express'
import http 		from 'http'
import cors			from 'cors'
import database 	from './database'
import APIRouter	from './api'
import { Server }	from 'socket.io'
import { Lyric } 	from '../types/lyric'

// Initial configuration
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// Create and run an HTTP server
const server = http.createServer(app)
server.listen(process.env.PORT, () => {
	// Static routes
	app.get('/', (req, res) => {
		return res.json({
			message: "Server is active."
		})
	})
	console.log(`[http] running on port ${process.env.PORT}`)
})

// Run database server
database
	.open()
	.then(err => {
		// Activate api routes
		app.use("/api/lyrics", APIRouter)
	})
	.catch(err => {
		console.error("[database] couldn't connect")
		console.log(err)
	})

// Open socket connection
const io = new Server(server)
io.on("connection", socket => {
	// A client connected
	console.log(`[socket] a client connected`)

	// lyric:clear
	socket.on("lyric:clear", msg => {
		io.emit("lyric:clear", new Lyric())
	})

	// lyric:update
	socket.on("lyric:update", msg => {
		io.emit("lyric:update", new Lyric(msg))
	})

	// A client disconnected
	socket.on("disconnect", msg => {
		console.log(`[socket] a client disconnected`)		
	})
})