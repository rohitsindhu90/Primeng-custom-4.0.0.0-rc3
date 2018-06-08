import { Component } from '@angular/core';
import { ConfirmationService } from '../../../components/common/api';
import { Message } from '../../../components/common/api';
import { ConfirmationDialogControl } from '../../../components/common/api';
@Component({
    templateUrl: 'showcase/demo/confirmdialog/confirmdialogdemo.html',
    providers: [ConfirmationService]
})
export class ConfirmDialogDemo {

    msgs: Message[] = [];

    constructor(private confirmationService: ConfirmationService) { }


    confirm1() {
        let popupHeaderMessage = 'This asset has a Mobile  09810182190 assigned to it. ';
        let popupFirstOptionMessage = 'Would you like to assign the asset and the mobile number 09810182190 to  Manish Mishra';
        let popupSecondOptionMessage = 'Would you like to assign the asset to Manish Mishra and keep the Mobile number 09810182190 assigned to the existing user Rohit ';

        let controls: ConfirmationDialogControl = {
            multiselect: false,rvalidation:true,msgcss:"test-error", controls: [
                { value: true, text: popupFirstOptionMessage },
                { value: false, text: popupSecondOptionMessage }
            ]
        };
        // let  controls:ConfirmationDialogControl={multiselect:false,controls:[{value:"M",text:"test"},{value:"F",text:"test1"}]};
        this.confirmationService.confirm({
            message: undefined,
            header: 'Confirmation',
            control: controls,
            accept: (param: any) => {
                alert(param);

                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            }
            , reject: () => {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
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
                this.msgs.push({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            }
        });
    }
}
