"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIResponse = void 0;
var APIResponse = (function () {
    function APIResponse(data) {
        this.message = undefined;
        this.status = undefined;
        this.data = undefined;
        if (data !== undefined) {
            this.message = data.message ? data.message : undefined;
            this.status = data.status ? data.status : undefined;
            this.data = data.data ? data.data : undefined;
        }
    }
    return APIResponse;
}());
exports.APIResponse = APIResponse;
