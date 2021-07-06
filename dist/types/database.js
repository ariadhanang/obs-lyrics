"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSettings = void 0;
var DatabaseSettings = (function () {
    function DatabaseSettings(data) {
        if (data !== undefined) {
            this.lyric = data.lyric ? data.lyric : undefined;
            this.content = data.content ? data.content : undefined;
            this.status = data.status ? data.status : undefined;
        }
    }
    return DatabaseSettings;
}());
exports.DatabaseSettings = DatabaseSettings;
