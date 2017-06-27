import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {LazyLoadEvent} from '../../../components/common/api';
import {FilterMetadata} from '../../../components/common/api';

@Component({
  templateUrl: 'showcase/demo/datatable/datatablescrolldemo.html',
})
export class DataTableScrollDemo implements OnInit {

  cars: Car[];

  carsLarge: any[];

  totalRecords: number;

    brands: any[];

    test: any[];

    columnhide:boolean;
  constructor(private carService: CarService) { }

  ngOnInit() {
      this.carService.getCarsMedium().then(cars => this.cars = cars);
      this.columnhide=true;
      this.totalRecords = 500000;
  }

  loadCarsLazy(event: LazyLoadEvent) {
      //for demo purposes keep loading the same dataset
      //in a real production application, this data should come from server by building the query with LazyLoadEvent options
      this.carsLarge = [
          {"brand": "VW", "year": 2012, "color": "Orange -1232131231233213123123123123123123123123", "vin": "dsad231ff " ,"details":{
            "test":4
          }},
          {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345","details":{
            "test":4
          }},
          {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr","details":{
            "test":4
          }},
          {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh","details":{
            "test":4
          }},
          {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34","details":{
            "test":4
          }},
          {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj","details":{
            "test":4
          }},
          {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr","details":{
            "test":4
          }},
          {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34","details":{
            "test":4
          }},
          {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5","details":{
            "test":4
          }},
          {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s","details":{
            "test":4
          }},
          {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff","details":{
            "test":4
          }},
          {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345","details":{
            "test":4
          }},
          {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr","details":{
            "test":4
          }},
          {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh","details":{
            "test":4
          }},
          {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34","details":{
            "test":4
          }},
          {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj","details":{
            "test":4
          }},
          {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr","details":{
            "test":4
          }},
          {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34","details":{
            "test":4
          }},
          {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5","details":{
            "test":4
          }},
          {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s","details":{
            "test":4
          }},
          {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff","details":{
            "test":4
          }},
          {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345","details":{
            "test":4
          }},
          {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr","details":{
            "test":4
          }},
          {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh","details":{
            "test":4
          }},
          {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34","details":{
            "test":4
          }},
          {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj","details":{
            "test":4
          }},
          {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr","details":{
            "test":4
          }},
          {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34","details":{
            "test":4
          }},
          {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5","details":{
            "test":4
          }},
          {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s","details":{
            "test":4
          }},
          {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff","details":{
            "test":4
          }},
          {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345","details":{
            "test":4
          }},
          {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr","details":{
            "test":4
          }},
          {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh","details":{
            "test":4
          }},
          {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34","details":{
            "test":4
          }},
          {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj","details":{
            "test":4
          }},
          {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr","details":{
            "test":4
          }},
          {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34","details":{
            "test":4
          }},
          {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5","details":{
            "test":4
          }},
          {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s","details":{
            "test":1
          }}
      ];

      this.brands = [];
      this.brands.push({label: 'All Brands', value: null});
      this.brands.push({label: 'Audi', value: 'Audi'});
      this.brands.push({label: 'BMW', value: 'BMW'});
      this.brands.push({label: 'Fiat', value: 'Fiat'});
      this.brands.push({label: 'Honda', value: 'Honda'});
      this.brands.push({label: 'Jaguar', value: 'Jaguar'});
      this.brands.push({label: 'Mercedes', value: 'Mercedes'});
      this.brands.push({label: 'Renault', value: 'Renault'});
      this.brands.push({label: 'VW', value: 'VW'});
      this.brands.push({label: 'Volvo', value: 'Volvo'});
      this.test = [];
    this.test.push({label: 'All Test', value: null});
    this.test.push({label: 'test', value: 4});
  }
}
