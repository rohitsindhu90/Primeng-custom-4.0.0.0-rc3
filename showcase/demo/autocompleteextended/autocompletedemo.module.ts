import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms'
import {AutoCompleteExtendedDemo} from './autocompletedemo';
import {AutoCompleteExtendedDemoRoutingModule} from './autocompletedemo-routing.module';
import {AutoCompleteExtendedModule } from '../../../components/autocompleteextended/autocomplete';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
				AutoCompleteExtendedDemoRoutingModule,
        AutoCompleteExtendedModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		AutoCompleteExtendedDemo
	]
})
export class AutoCompleteExtendedDemoModule {}
