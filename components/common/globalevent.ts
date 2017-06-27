import { NgModule,Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class GlobalEventsManager {
public static onDatatableScrollEvent: EventEmitter<any> = new EventEmitter();

}
