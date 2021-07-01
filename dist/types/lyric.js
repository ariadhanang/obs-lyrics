"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricContent = exports.Lyric = void 0;
var Lyric = (function () {
    function Lyric(data) {
        this._id = "";
        this.title = "";
        this.category = "";
        this.content = new Array();
        if (data !== undefined) {
            this._id = data._id ? data._id : "";
            this.title = data.title ? data.title : "";
            this.category = data.category ? data.category : "";
            this.content = data.content ? data.content : [];
        }
    }
    return Lyric;
}());
exports.Lyric = Lyric;
var LyricContent = (function () {
    function LyricContent(data) {
        this.index = 0;
        this.title = "";
        this.headline = "";
        this.text = "";
        if (data !== undefined) {
            this.index = data.index ? data.index : 0;
            this.title = data.title ? data.title : "";
            this.headline = data.headline ? data.headline : "";
            this.text = data.text ? data.text : "";
        }
    }
    return LyricContent;
}());
exports.LyricContent = LyricContent;
