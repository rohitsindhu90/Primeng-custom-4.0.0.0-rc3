import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/datatable/datatableselectiondemo.html',
})
export class DataTableSelectionDemo implements OnInit {

    msgs: Message[];

    cars: Car[];

    selectedCar1: Car;

    selectedCar2: Car;

    selectedCar3: Car;

    selectedCars1: Car[];

    selectedCars2: Car[];

    enableselection:boolean;

    selecttionMode:string='';
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }

    onRowSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Car Selected', detail: event.data.vin + ' - ' + event.data.brand});
    }

    onRowUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Car Unselected', detail: event.data.vin + ' - ' + event.data.brand});
    }

    onSwitch(){
      if(this.enableselection){
        console.log(this.selecttionMode);
        this.selecttionMode='Single';
      }
      else{
        console.log(this.selecttionMode);
        this.selecttionMode='';
      }
    }
}
