import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms'
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomePageComponent} from './homepage.component';
import {RouteReuseStrategy } from '@angular/router';
import {CarService} from './demo/service/carservice';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';
import { CustomReuseStrategy } from './custom-route-reuse-strategy';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        HomePageComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
        CarService,CountryService,EventService,NodeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
