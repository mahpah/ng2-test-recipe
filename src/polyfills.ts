declare const WORKING_MODE: string
declare const require: any
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'ts-helpers'

if (WORKING_MODE === 'production') {
	// Production
} else {
	// Development
	Error['stackTraceLimit'] = Infinity
	require('zone.js/dist/long-stack-trace-zone')
}
