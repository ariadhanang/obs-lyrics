import dotenv		from 'dotenv'
import express 		from 'express'
import http 		from 'http'
import cors			from 'cors'
import path			from 'path'
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
const clientPath = __dirname + '/../client/';
app.use(express.static(clientPath));

server.listen(process.env.PORT, () => {
	// Static routes
	app.get('/', (req, res) => {
		return res.json({
			message: "Server is active.",
			status: 200
		})
	})
	app.get('/remote', (req, res) => {
		// res.send(clientPath)
		res.sendFile(path.resolve(clientPath + 'remote.html'))
	})
	console.log(`[http] running on port ${process.env.PORT}`)
})

// Run database server
Database.open()
	.then(() => {
		// Activate api routes
		app.use("/api/lyrics", LyricsApi)
		// Run socket server
		Socket.init(server)
	})
	.catch(err => {
		console.error("[database] couldn't connect")
		console.log(err)
	})