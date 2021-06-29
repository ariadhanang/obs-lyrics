"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var database_1 = __importDefault(require("./database"));
var api_1 = __importDefault(require("./api"));
var socket_io_1 = require("socket.io");
var lyric_1 = require("./lyric");
dotenv_1.default.config();
var app = express_1.default();
app.use(express_1.default.json());
var server = http_1.default.createServer(app);
server.listen(process.env.PORT, function () {
    app.get('/', function (req, res) {
        return res.json({
            message: "Server is active."
        });
    });
    console.log("[http] running on port " + process.env.PORT);
});
database_1.default
    .open()
    .then(function (err) {
    app.use("/api/lyrics", api_1.default);
})
    .catch(function (err) {
    console.error("[database] couldn't connect");
    console.log(err);
});
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    console.log("[socket] a client connected");
    socket.on("lyric:clear", function (msg) {
        io.emit("lyric:clear", new lyric_1.Lyric());
    });
    socket.on("lyric:update", function (msg) {
        io.emit("lyric:update", new lyric_1.Lyric(msg));
    });
    socket.on("disconnect", function (msg) {
        console.log("[socket] a client disconnected");
    });
});
