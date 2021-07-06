// =================== OBS LYRICS DISPLAY ================== //
// Author: Aria Dhanang (https://github.com/ariadhanang)
// ----------------------- Variables ----------------------- //
const socket        = io("/")
// ------------------------- Vue.JS ------------------------ //
// Declare a Vue.JS application
var app = new Vue({
    el: "#client-display .container",
    data: {
        selectedLyric: undefined, selectedContent: undefined,
        status: undefined
    },
    methods: {},
    created: function () {}
})
// ----------------------- Web Socket ---------------------- //
// Initialize Socket.IO and event listener
// Create socket connection
socket.auth = { type: "display" };
socket.connect();

// Socket event listeners
socket.on("display:init", function (data) {
    console.log(data)
    app.$data.selectedLyric     = data.lyric;
    app.$data.selectedContent   = data.content;
    app.$data.status            = data.status;
});
socket.on("lyric:select", function (data) {
    app.$data.selectedLyric     = data;
    app.$data.selectedContent   = undefined;
});
socket.on("lyric:content", function (data) {
    app.$data.selectedContent = data;
});
socket.on("lyric:stop", function (data) {
    app.$data.selectedLyric     = undefined
    app.$data.selectedContent   = undefined
});