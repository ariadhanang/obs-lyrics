"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var database_1 = __importDefault(require("./database"));
var lyrics_api_1 = __importDefault(require("./lyrics.api"));
var socket_1 = __importDefault(require("./socket"));
dotenv_1.default.config();
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
var server = http_1.default.createServer(app);
var clientPath = __dirname + '/../client/';
app.use(express_1.default.static(clientPath));
server.listen(process.env.PORT, function () {
    app.get('/', function (req, res) {
        return res.json({
            message: "Server is active.",
            status: 200
        });
    });
    app.get('/remote', function (req, res) {
        res.sendFile(path_1.default.resolve(clientPath + 'remote.html'));
    });
    console.log("[http] running on port " + process.env.PORT);
});
database_1.default.open()
    .then(function () {
    app.use("/api/lyrics", lyrics_api_1.default);
    socket_1.default.init(server);
})
    .catch(function (err) {
    console.error("[database] couldn't connect");
    console.log(err);
});
