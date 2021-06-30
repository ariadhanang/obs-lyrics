import { Component } from '@angular/core';
import { API } from "./api.service"
import { Lyric } from "../../../types/lyric"

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	title = 'editor';

	lyrics: Lyric[]

	constructor(private api: API) {
		this.lyrics = new Array<Lyric>()
		this.api.getLyricsIndex()
			.subscribe(data => {
				this.lyrics = data
			})
	}
}
