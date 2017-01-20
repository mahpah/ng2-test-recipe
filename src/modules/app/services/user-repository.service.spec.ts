import { TestBed, inject } from '@angular/core/testing'
import { UserRepository } from './user-repository.service'
import { MockBackend } from '@angular/http/testing'
import { XHRBackend, Connection, HttpModule } from '@angular/http'
import { createResponse } from 'test-helpers/http'

describe('UserRepository', () => {
	let repository: UserRepository
	let mockBackend: MockBackend

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpModule,
			],

			providers: [
				UserRepository,
				{ provide: XHRBackend, useClass: MockBackend },
			],
		})
	})

	beforeEach(inject([
		UserRepository,
		XHRBackend,
	], (s, mB) => {
		repository = s
		mockBackend = mB
	}))

	it('should return current user synchronously', () => {
		let currentUser = repository.currentUser
		expect(currentUser).toBeDefined()
	})

	it('should return users async', () => {
		let lastConnection: Connection
		const name = 'far away'
		mockBackend.connections.subscribe(connection => {
			connection.mockRespond(createResponse(JSON.stringify({
				name,
			})))
			lastConnection = connection
		})

		repository.get(name).subscribe((data: any) => {
			expect(lastConnection).toBeDefined('No connection created')
			expect(lastConnection.request.url).toContain(`/api/${name}`, 'Wrong request url')
			expect(data).toEqual(jasmine.any(Object))
			expect(data.name).toEqual(name)
		})
	})
})
