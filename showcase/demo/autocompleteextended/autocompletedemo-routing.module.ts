import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {AutoCompleteExtendedDemo} from './autocompletedemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: AutoCompleteExtendedDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class AutoCompleteExtendedDemoRoutingModule {}
