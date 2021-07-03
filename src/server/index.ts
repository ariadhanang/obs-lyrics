import dotenv		from 'dotenv'
import express 		from 'express'
import http 		from 'http'
import cors			from 'cors'
import Database 	from './database'
import LyricsApi	from './lyrics.api'
import Socket		from './socket'

// Environment variables
dotenv.config()
// Initial configuration
const app = express()
app.use(express.json())
app.use(cors())

// Create and run an HTTP server
const server = http.createServer(app)
server.listen(process.env.PORT, () => {
	// Static routes
	app.get('/', (req, res) => {
		return res.json({
			message: "Server is active.",
			status: 200
		})
	})
	console.log(`[http] running on port ${process.env.PORT}`)
})

// Run database server
Database.open()
	.then(() => {
		// Activate api routes
		app.use("/api/lyrics", LyricsApi)
	})
	.catch(err => {
		console.error("[database] couldn't connect")
		console.log(err)
	})

// Run socket server
Socket.init(server)