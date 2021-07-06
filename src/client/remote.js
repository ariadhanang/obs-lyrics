// =================== OBS LYRICS REMOTE =================== //
// Author: Aria Dhanang (https://github.com/ariadhanang)
// ----------------------- Variables ----------------------- //
const apiUrl        = "/api/lyrics/"
const socket        = io("/")
// ---------------------- API Service ---------------------- //
// Get all lyrics data from API
async function getLyrics() {
    const response = await fetch(apiUrl)
    return response.json()
}
// Get specific lyric by id
async function getLyric(id) {
    const response = await fetch(apiUrl + id)
    return response.json()
}
// ------------------------- Vue.JS ------------------------ //
// Declare a Vue.JS application
var app = new Vue({
    el: "#client-remote .container",
    data: {
        lyricList: undefined, selectedLyric: undefined,
        selectedContent: undefined, page: "lyric-list",
        status: undefined
    },
    computed: {
        title: function () {
            if (this.selectedLyric && this.page == "lyric-detail") {
                return this.selectedLyric.title +
                    ` (${this.selectedLyric.content.length})`;
            }
            return "OBS Lyrics Remote";
        }
    },
    methods: {
        selectLyric: function (id) {
            getLyric(id).then(function (result) {
                socket.emit("lyric:select", result.data)
            })
        },
        selectContent: function (data) {
            socket.emit("lyric:content", data)
        },
        back: function () {
            this.page = "lyric-list";
        },
        previous: function () {
            if (this.selectedLyric && this.selectedContent) {
                const currentIndex      = this.selectedContent.index
                const previousContent   = _.find(this.selectedLyric.content, function (row) {
                    return row.index == currentIndex - 1
                })
                if (previousContent) {
                    this.selectContent(previousContent)
                }
            }
        },
        next: function () {
            if (this.selectedLyric && this.selectedContent) {
                const currentIndex  = this.selectedContent.index
                const nextContent   = _.find(this.selectedLyric.content, function (row) {
                    return row.index == currentIndex + 1
                })
                if (nextContent) {
                    this.selectContent(nextContent)
                }
            }
        },
        stop: function () {
            socket.emit("lyric:stop", {})
        },
    },
    created: function () {
        getLyrics().then(result => {
            this.lyricList = result
        })
    }
})
// ----------------------- Web Socket ---------------------- //
// Initialize Socket.IO and event listener
// Create socket connection
socket.auth = { type: "remote" };
socket.connect();

// Socket event listeners
socket.on("remote:init", function (data) {
    console.log(data);
});
socket.on("lyric:select", function (data) {
    app.$data.selectedLyric     = data;
    app.$data.selectedContent   = undefined;
    app.$data.page              = "lyric-detail";
    $("#page-lyric").scrollTop(0)
});
socket.on("lyric:content", function (data) {
    app.$data.selectedContent = data;
    const elementPosition   = $("#content-" + data.index).position().top
    const currentScroll     = $("#page-lyric").scrollTop()
    $("#page-lyric").animate({
        scrollTop: elementPosition + currentScroll - 200
    }, 500)
});
socket.on("lyric:stop", function (data) {
    app.$data.selectedLyric     = undefined
    app.$data.selectedContent   = undefined
    app.$data.page              = "lyric-list";
});