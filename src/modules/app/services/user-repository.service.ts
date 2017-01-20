import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

@Injectable()
export class UserRepository {
	constructor(
		private http: Http,
	) {}

	get currentUser() {
		return {
			name: 'me',
		}
	}

	get(name) {
		return this.http.get(`/api/${name}`).map(r => r.json())
	}
}
