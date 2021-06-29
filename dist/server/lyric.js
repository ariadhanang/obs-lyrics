"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricContent = exports.Lyric = void 0;
var Lyric = (function () {
    function Lyric(data) {
        this.title = data.title ? data.title : null;
        this.category = data.category ? data.category : null;
        this.content = data.content ? data.content : [];
    }
    return Lyric;
}());
exports.Lyric = Lyric;
var LyricContent = (function () {
    function LyricContent(data) {
        this.title = data.title ? data.title : null;
        this.headline = data.headline ? data.headline : null;
        this.text = data.text ? data.text : null;
    }
    return LyricContent;
}());
exports.LyricContent = LyricContent;
