import { Component } from '@angular/core';
import { SelectItem } from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/multiselect/multiselectdemo.html'
})
export class MultiSelectDemo {

    cars: SelectItem[];

    selectedCars1: string[] = [];

    selectedCars2: string[] = [];

    selectedcities1: string[] = [];

    cities1: SelectItem[];

    cities2: any[];

    selectedCities1: any[]=[];

    selectedCities2: any[]=[];

    constructor() {
        this.cars = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' },
        ];

        this.cities1 = [
            { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
        ];

        //An array of cities
        this.cities2 = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.selectedCities1.push({ id: 1, name: 'New York', code: 'NY' });
    }
}

export interface City {
    name: string,
    code: string
}
