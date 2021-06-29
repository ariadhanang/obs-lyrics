import express 					from "express"
import { Collection, ObjectId } from "mongodb"
import database 				from './database'
import { Lyric } 				from './lyric'

const router = express.Router()
var collection: Collection

function init() {
	collection = database.db.collection("lyrics")
}

// Index
router.get("/", (req, res) => {
	init()
	const options = { fields: { content: 0 } }
	collection.find({}, options).toArray()
		.then(result => {
			return res.json(result)
		})
		.catch(err => {
			console.error(err)
		})
})

// Store
router.post("/", (req, res) => {
	init()
	collection.insertOne(req.body)
		.then(result => {
			return res.json({
				message: `Create new record success`,
				status: 200
			})
		})
		.catch(err => {
			console.error(err)
			return res.json({
				message: `Create new record failed`,
				status: 500
			})
		})
})

// Show
router.get("/:id", (req, res) => {
	init()
	collection.findOne({ _id: new ObjectId(req.params.id) })
		.then(result => {
			return res.json({
				message: `Get record with id ${req.params.id} success`,
				status: 200,
				data: result
			})
		})
		.catch(err => {
			console.error(err)
			return res.json({
				message: `Get record with id ${req.params.id} error`,
				error: err,
				status: 500
			})
		})
})

// Update
router.put("/:id", (req, res) => {
	init()
	var updatedFields: any = {}
	// Populate updatedFields
	if (req.body.title)		updatedFields.title 	= req.body.title
	if (req.body.category)	updatedFields.category 	= req.body.category
	if (req.body.content)	updatedFields.content 	= req.body.content
	// Invalid request body
	if (Object.keys(updatedFields).length == 0) {
		return res.json({
			message: `No updated fields. Available fields are: {title, category, content}`,
			status: 500
		})
	}
	// Update record
	collection.findOneAndUpdate({ _id: new ObjectId(req.params.id) }, { $set: updatedFields })
		.then(result => {
			return res.json({
				message: `Update record with id ${req.params.id} success`,
				status: 200
			})
		})
		.catch(err => {
			console.error(err)
			return res.json({
				message: `Update record with id ${req.params.id} error`,
				error: err,
				status: 500
			})
		})
})

// Delete
router.delete("/:id", (req, res) => {
	init()
	collection.deleteOne({ _id: new ObjectId(req.params.id) })
		.then(result => {
			return res.json({
				message: `Delete record with id ${req.params.id} success`,
				status: 200
			})
		})
		.catch(err => {
			return res.json({
				message: `Delete record with id ${req.params.id} error`,
				error: err,
				status: 500
			})
		})
})

export default router