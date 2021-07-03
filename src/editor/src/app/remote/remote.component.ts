import { Component, OnInit } from '@angular/core';
import { SocketService } from "../socket.service"

import { faLink, faUnlink, faAlignLeft, faFolder, faPhotoVideo, faPlay } from '@fortawesome/free-solid-svg-icons'

import { API } from "../api.service"
import { Lyric, LyricContent } from "../../../../types/lyric"
import { APIResponse } from "../../../../types/api"

@Component({
	selector: 'app-remote',
	templateUrl: './remote.component.html',
	styleUrls: ['./remote.component.scss']
})
export class RemoteComponent implements OnInit {

	connectedIcon 		= faLink
	disconnectedIcon 	= faUnlink
	lyricsIcon 			= faAlignLeft
	collectionIcon		= faFolder
	mediaIcon			= faPhotoVideo
	broadcastIcon		= faPlay

	isConnected = false

	activeTab = "lyrics"

	lyrics: Lyric[]
	selectedLyric: Lyric

	constructor(private socket: SocketService, private api: API) {
		this.lyrics 		= new Array<Lyric>()
		this.selectedLyric 	= new Lyric()
	}

	ngOnInit(): void {
		this.socket.connect("remote")
		this.isConnected = true
		this.loadLyrics()
	}

	loadLyrics(): void {
		this.api.getLyricsIndex()
			.subscribe(data => {
				this.lyrics = data
			})
	}

	selectLyric(id: string): void {
		this.api.getLyric(id)
			.subscribe(resultData => {
				let result 			= new APIResponse(resultData)
				this.selectedLyric	= new Lyric(JSON.parse(JSON.stringify(result['data'])))
			})
	}

	beginLyric(): void {
		this.socket.beginLyric(this.selectedLyric)
	}

	broadcastLyric(data: any) {
		this.socket.broadcastLyric(data)
	}

}
