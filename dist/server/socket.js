"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("./database"));
var socket_io_1 = require("socket.io");
var database_2 = require("../types/database");
var Socket = (function () {
    function Socket() {
    }
    Socket.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = database_1.default.db.collection("settings");
                        return [4, collection.findOne({})];
                    case 1:
                        result = _a.sent();
                        if (result !== null) {
                            return [2, new database_2.DatabaseSettings(result)];
                        }
                        return [2, new database_2.DatabaseSettings()];
                }
            });
        });
    };
    Socket.saveSettings = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = database_1.default.db.collection("settings");
                        collection.remove({});
                        return [4, collection.insertOne(settings)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Socket.init = function (server) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4, this.loadSettings()];
                    case 1:
                        _a.settings = _b.sent();
                        this.io = new socket_io_1.Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
                        this.io.use(function (socket, next) {
                            _this.loadSettings().then(function (settings) {
                                var type = socket.handshake.auth.type;
                                var address = socket.handshake.address;
                                if (type !== "remote" && type !== "display") {
                                    return next(new Error("unauthorized access"));
                                }
                                if (type == "display") {
                                    socket.emit("display:init", settings);
                                }
                                console.log("[socket] a " + type + " is connected from " + address);
                                next();
                            });
                        });
                        this.io.on("connection", function (socket) {
                            socket.on("lyric:select", function (data) {
                                _this.io.emit("lyric:select", data);
                                _this.saveSettings(new database_2.DatabaseSettings({
                                    lyric: data,
                                    content: undefined,
                                    status: "running"
                                }));
                                _this.loadSettings().then(function (result) {
                                    _this.settings = result;
                                });
                            });
                            socket.on("lyric:content", function (data) {
                                _this.io.emit("lyric:content", data);
                                _this.saveSettings(new database_2.DatabaseSettings({
                                    lyric: _this.settings.lyric,
                                    content: data,
                                    status: _this.settings.status
                                }));
                                _this.loadSettings().then(function (result) {
                                    _this.settings = result;
                                });
                            });
                            socket.on("lyric:stop", function (data) {
                                _this.io.emit("lyric:stop", data);
                                _this.saveSettings(new database_2.DatabaseSettings({
                                    lyric: undefined,
                                    content: undefined,
                                    status: "idle"
                                }));
                            });
                            socket.on("disconnect", function (msg) {
                                console.log("[socket] a client disconnected");
                            });
                        });
                        return [2];
                }
            });
        });
    };
    return Socket;
}());
exports.default = Socket;
