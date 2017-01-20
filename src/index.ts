import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { AppModule } from 'modules/app'

declare const WORKING_MODE: any
if (WORKING_MODE === 'production') {
	enableProdMode()
}
platformBrowserDynamic().bootstrapModule(AppModule)
