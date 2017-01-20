import { Response, ResponseOptions } from '@angular/http'

export const createResponse = (body, status = 200) => {
	let opts = {
		body,
		status,
	} as ResponseOptions

	return new Response(opts)
}
