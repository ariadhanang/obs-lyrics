export class Lyric {
	title?: string
	category?: string
	content?: [LyricContent]

	constructor(data?: any) {
		this.title 		= data.title 	? data.title 	: null
		this.category 	= data.category ? data.category : null
		this.content 	= data.content 	? data.content 	: []
	}
}

export class LyricContent {
	title?: string
	headline?: string
	text?: string

	constructor(data?: any) {
		this.title 		= data.title 	? data.title 	: null
		this.headline 	= data.headline ? data.headline : null
		this.text 		= data.text 	? data.text 	: null
	}
}