import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Lyric } from "../../../types/lyric"
import { APIResponse } from "../../../types/api"

@Injectable({
	providedIn: 'root'
})
export class API {

	hostUrl: string

	constructor(private http: HttpClient) {
		this.hostUrl = "http://localhost:3000/api/"
	}

	getLyricsIndex() {
		return this.http.get<Lyric[]>(this.hostUrl + 'lyrics/')
	}
	
	getLyric(id: string) {
		return this.http.get<APIResponse>(this.hostUrl + 'lyrics/' + id)	
	}

	updateLyric(id: string, data: Lyric) {
		return this.http.put<APIResponse>(this.hostUrl + 'lyrics/' + id, data)	
	}

}
