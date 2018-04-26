import {Component} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';

@Component({
    templateUrl: 'showcase/demo/keyfilter/keyfilterdemo.html',
    animations: [
        trigger('errorState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
})
export class KeyFilterDemo {

    blockSpecial: RegExp = /^[^<>*!]+$/

    blockSpace: RegExp = /[^\s]/;

    ccRegex: RegExp = /^[0-9]+(\.[0-9]{1,2})?$/;

    multipleEmailAddress: RegExp = /^(([a-zA-Z0-9_\-\.\']+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*;\s*|\s*$))*$/; 


    cc: string;

}
