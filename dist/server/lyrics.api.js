"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongodb_1 = require("mongodb");
var database_1 = __importDefault(require("./database"));
var router = express_1.default.Router();
var collection;
function init() {
    collection = database_1.default.db.collection("lyrics");
}
router.get("/", function (req, res) {
    init();
    var options = { fields: { content: 0 } };
    collection.find({}, options).sort({ title: 1 }).toArray()
        .then(function (result) {
        return res.json(result);
    })
        .catch(function (err) {
        return res.json({
            message: "Get all records failed",
            status: 500,
            data: err
        });
    });
});
router.post("/", function (req, res) {
    init();
    var data = req.body;
    data._id = undefined;
    collection.insertOne(data)
        .then(function (result) {
        return res.json({
            message: "Create new record success",
            status: 200,
            data: result
        });
    })
        .catch(function (err) {
        return res.json({
            message: "Create new record failed",
            status: 500,
            data: err
        });
    });
});
router.get("/:id", function (req, res) {
    init();
    collection.findOne({ _id: new mongodb_1.ObjectId(req.params.id) })
        .then(function (result) {
        return res.json({
            message: "Get record with id " + req.params.id + " success",
            status: 200,
            data: result
        });
    })
        .catch(function (err) {
        return res.json({
            message: "Get record with id " + req.params.id + " error",
            error: err,
            status: 500
        });
    });
});
router.put("/:id", function (req, res) {
    init();
    var updatedFields = {};
    if (req.body.title)
        updatedFields.title = req.body.title;
    if (req.body.category)
        updatedFields.category = req.body.category;
    if (req.body.content)
        updatedFields.content = req.body.content;
    if (Object.keys(updatedFields).length == 0) {
        return res.json({
            message: "No updated fields. Available fields are: {title, category, content}",
            status: 500
        });
    }
    collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: updatedFields }, { returnDocument: "after" })
        .then(function (result) {
        return res.json({
            message: "Update record with id " + req.params.id + " success",
            data: result.value,
            status: 200
        });
    })
        .catch(function (err) {
        return res.json({
            message: "Update record with id " + req.params.id + " error",
            error: err,
            status: 500
        });
    });
});
router.delete("/:id", function (req, res) {
    init();
    collection.deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) })
        .then(function (result) {
        return res.json({
            message: "Delete record with id " + req.params.id + " success",
            status: 200
        });
    })
        .catch(function (err) {
        return res.json({
            message: "Delete record with id " + req.params.id + " error",
            error: err,
            status: 500
        });
    });
});
exports.default = router;
