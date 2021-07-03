export class Lyric {
	_id: string
	title: string
	category: string
	content: LyricContent[]

	constructor(data?: any) {
		if (data !== undefined) {
			this._id 		= data._id 							? data._id 		: ""
			this.title 		= data.title 						? data.title 	: ""
			this.category 	= data.category 					? data.category : ""
			this.content 	= data.content as LyricContent[] 	? data.content 	: new Array<LyricContent>()
		} else {
			this._id = ""
			this.title = ""
			this.category = ""
			this.content = new Array<LyricContent>()
		}
	}
}

export class LyricContent {
	index: number
	title: string
	headline: string
	text: string

	constructor(data?: any) {
		this.index 		= 0
		this.title 		= ""
		this.headline 	= ""
		this.text 		= ""

		if (data !== undefined) {
			this.index 		= data.index 	? data.index 	: 0
			this.title 		= data.title 	? data.title 	: ""
			this.headline 	= data.headline ? data.headline : ""
			this.text 		= data.text 	? data.text 	: ""
		}

	}
}