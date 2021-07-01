export class APIResponse {
	message?: string
	status?: number
	data?: any

	constructor(data?: any) {

		this.message 	= undefined
		this.status 	= undefined
		this.data 		= undefined

		if (data !== undefined) {
			this.message	= data.message 	? data.message	: undefined
			this.status 	= data.status 	? data.status 	: undefined
			this.data 		= data.data 	? data.data 	: undefined
		}
	}
}