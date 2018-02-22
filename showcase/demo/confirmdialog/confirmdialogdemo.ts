import {Component} from '@angular/core';
import {ConfirmationService} from '../../../components/common/api';
import {Message} from '../../../components/common/api';
import { ConfirmationDialogControl } from '../../../components/common/api';
@Component({
    templateUrl: 'showcase/demo/confirmdialog/confirmdialogdemo.html',
    providers: [ConfirmationService]
})
export class ConfirmDialogDemo {

    msgs: Message[] = [];

    constructor(private confirmationService: ConfirmationService) {}

    controls:ConfirmationDialogControl={multiselect:false,controls:[{value:"M",text:"test"},{value:"F",text:"test1"}]};

    confirm1() {
        this.confirmationService.confirm({
            message: undefined,
            header: 'Confirmation',
            control:this.controls,
            accept: (param:any) => {
              debugger;
              alert(param);
                this.msgs = [];
                this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            }
            ,  reject: () => {
                  this.msgs = [];
                  this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
              }
        });
    }

    confirm2() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [];
                this.msgs.push({severity:'info', summary:'Confirmed', detail:'Record deleted'});
            },
            reject: () => {
                 this.msgs = [];
                 this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
             }
        });
    }
}
