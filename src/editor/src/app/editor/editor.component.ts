import * as _ from "lodash"
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API } from "../api.service"
import { Lyric, LyricContent } from "../../../../types/lyric"
import { APIResponse } from "../../../../types/api"
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	host: {
		"class": "w-3/4 h-full"
	}
})
export class EditorComponent implements OnInit {

	id: any = undefined
	
	lyrics: Lyric[]

	data: any
	edited: any

	iconPlus = faPlus
	iconRemove = faTimes

	constructor(private route: ActivatedRoute, private router: Router, private api: API) {
		this.lyrics = new Array<Lyric>()
		this.route.params.subscribe(params => {
			if (params.id !== undefined) {
				if (params.id == "new") {
					// Create new record
					this.id = "new"
					this.data 	= new Lyric()
					this.edited = new Lyric()
					this.edited.content.push(new LyricContent())
				} else if (this.id !== params.id) {
					this.initLyrics()
					// Edit existing record
					this.id = params.id
					this.initData()
				} else {}
			}
		})
	}

	ngOnInit(): void {
		this.initLyrics()
	}

	initLyrics(): void {
		this.api.getLyricsIndex()
			.subscribe(data => {
				this.lyrics = data
			})
	}

	initData() {
		this.api.getLyric(this.id)
			.subscribe(resultData => {
				this.data 	= new Lyric()
				this.edited = new Lyric()
				let result = new APIResponse(resultData)
				this.data	= new Lyric(JSON.parse(JSON.stringify(result['data'])))
				console.log(this.data)
				this.edited = new Lyric(JSON.parse(JSON.stringify(result['data'])))
			})
	}

	close() {
		this.router.navigate(["/editor"])
	}

	delete() {
		this.api.deleteLyric(this.id)
			.subscribe(resultData => {
				let result = new APIResponse(resultData)
				if (result.status == 200) {
					this.router.navigate(["/editor"])
				}
			})
	}

	reset() {
		this.edited = JSON.parse(JSON.stringify(this.data))
	}

	save() {
		if (this.id == undefined || this.id == "new") {
			// Create new
			this.api.storeLyric(new Lyric(this.edited))
				.subscribe(result => {
					if (result.data["insertedId"]) {
						this.router.navigate(["/editor", result.data["insertedId"]])
					}
				})
		} else {
			// Update existing
			this.api.updateLyric(this.id, this.edited)
				.subscribe(result => {
					this.data	= new Lyric(result['data'])
					this.edited = new Lyric(result['data'])
				})
		}
	}

	addRow() {
		var newIndex = 0;
		if (this.edited.content.length != 0) {
			newIndex = this.edited.content[this.edited.content.length - 1].index + 1
		}
		this.edited.content.push(new LyricContent({
			index: newIndex
		}))
	}

	deleteRow(index: number) {
		this.edited.content = _.filter(this.edited.content, row => {
			return row["index"] != index
		})
	}

}
