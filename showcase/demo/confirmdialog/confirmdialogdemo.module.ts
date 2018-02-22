import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogDemo} from './confirmdialogdemo';
import {ConfirmDialogDemoRoutingModule} from './confirmdialogdemo-routing.module';
import {ConfirmDialogModule} from '../../../components/confirmdialog/confirmdialog';
import {ButtonModule} from '../../../components/button/button';
import {RadioButtonModule} from '../../../components/radioButton/radioButton';
import {GrowlModule} from '../../../components/growl/growl';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';
import {FormsModule}    from '@angular/forms';
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ConfirmDialogDemoRoutingModule,
        ConfirmDialogModule,
        ButtonModule,
        GrowlModule,
        TabViewModule,
        CodeHighlighterModule


	],
	declarations: [
		ConfirmDialogDemo
	]
})
export class ConfirmDialogDemoModule {}
