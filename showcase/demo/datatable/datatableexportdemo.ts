import {Component, OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatableexportdemo.html'
})
export class DataTableExportDemo implements OnInit {

    cars: Car[];
    cc: any[]=[];
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => {
            this.cars = cars;
            for(let i=0;i<=10000;i++){
                  this.cars.push(this.cars[0]);

            }

        }
        );

        this.carService.getTestLarge().then(c => {
          this.cc=c;
        //   let res=c;
        //   for(let i=0;i<=10000;i++){
        //   this.cc.push(c[0]);
        // }
      });


    }

}
