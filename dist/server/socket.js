"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var lyric_1 = require("../types/lyric");
var Socket = (function () {
    function Socket() {
    }
    Socket.init = function (server) {
        var _this = this;
        this.io = new socket_io_1.Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
        this.io.use(function (socket, next) {
            var type = socket.handshake.auth.type;
            var address = socket.handshake.address;
            if (type !== "remote" && type !== "display") {
                return next(new Error("unauthorized access"));
            }
            console.log("[socket] a " + type + " is connected from " + address);
            next();
        });
        this.io.on("connection", function (socket) {
            socket.onAny(function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                console.log(event, args);
            });
            socket.on("lyric:title", function (msg) {
                _this.io.emit("lyric:title", new lyric_1.Lyric(msg));
            });
            socket.on("lyric:clear", function (msg) {
                _this.io.emit("lyric:clear", new lyric_1.LyricContent());
            });
            socket.on("lyric:update", function (msg) {
                _this.io.emit("lyric:update", new lyric_1.LyricContent(msg));
            });
            socket.on("disconnect", function (msg) {
                console.log("[socket] a client disconnected");
            });
        });
    };
    return Socket;
}());
exports.default = Socket;
