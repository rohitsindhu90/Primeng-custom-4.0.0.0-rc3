import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogDemo} from './dialogdemo';
import {DialogDemoRoutingModule} from './dialogdemo-routing.module';
import {DialogModule} from '../../../components/dialog/dialog';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';
import {AutoCompleteExtendedModule } from '../../../components/autocompleteextended/autocomplete';
import {FormsModule}    from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	imports: [
		CommonModule,
		DialogDemoRoutingModule,
		  FormsModule,
        DialogModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule,
				AutoCompleteExtendedModule,
				NgbModule.forRoot(),
	],
	declarations: [
		DialogDemo
	]
})
export class DialogDemoModule {}
