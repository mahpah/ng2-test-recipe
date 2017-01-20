import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
		})
	})

	it('should create component', () => {
		let fixture = TestBed.createComponent(AppComponent)
		expect(fixture.componentInstance instanceof AppComponent).toBeTruthy('AppComponent not created')
	})
})
