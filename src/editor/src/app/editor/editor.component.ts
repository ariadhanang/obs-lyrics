import * as _ from "lodash"
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API } from "../api.service"
import { Lyric, LyricContent } from "../../../../types/lyric"
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

	id: any
	data: any
	edited: any

	iconPlus = faPlus
	iconRemove = faTimes

	constructor(private route: ActivatedRoute, private api: API) {
		this.route.params.subscribe(params => {
			if (this.id !== params.id) {
				this.id = params.id
				this.data 	= new Lyric()
				this.edited = new Lyric()
				this.initData()
			}
		})
	}

	ngOnInit(): void {
	}

	initData() {
		this.api.getLyric(this.id)
			.subscribe(result => {
				this.data	= new Lyric(JSON.parse(JSON.stringify(result['data'])))
				console.log(this.data)
				this.edited = new Lyric(JSON.parse(JSON.stringify(result['data'])))
			})
	}

	reset() {
		this.edited = JSON.parse(JSON.stringify(this.data))
	}

	save() {
		this.api.updateLyric(this.id, this.edited)
			.subscribe(result => {
				this.data	= new Lyric(result['data'])
				this.edited = new Lyric(result['data'])
			})		
	}

	addRow() {
		let lastIndex = this.edited.content[this.edited.content.length - 1].index
		this.edited.content.push(new LyricContent({
			index: lastIndex + 1
		}))
	}

	deleteRow(index: number) {
		this.edited.content = _.filter(this.edited.content, row => {
			return row["index"] != index
		})
	}

}
