import { TestBed, ComponentFixture } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { By } from '@angular/platform-browser'

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>
	let componentInstance: AppComponent

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
		})
		fixture = TestBed.createComponent(AppComponent)
		componentInstance = fixture.componentInstance
	})

	it('should create component', () => {
		componentInstance.title = 'app'
		fixture.detectChanges()
		expect(fixture.componentInstance instanceof AppComponent).toBeTruthy('AppComponent not created')
		let de = fixture.debugElement.query(By.css('h1'))
		expect(de.nativeElement.textContent).toContain('app')
	})
})
