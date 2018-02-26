import {Component} from '@angular/core';
import {CountryService} from '../service/countryservice';
import { ConfirmationService, Confirmation,AutoCompleteHeaderColumnMeta } from '../../../components/common/api';


@Component({
    templateUrl: 'showcase/demo/autocompleteextended/autocompletedemo.html',
    providers:[ConfirmationService]
})
export class AutoCompleteExtendedDemo {

    country: any;

    countries: any[];

    filteredCountriesSingle: any[];

    filteredCountriesMultiple: any[];

    metedata:AutoCompleteHeaderColumnMeta[]=[{field:'name',header:'Name',width:'90%'},{field:'code',header:'Code'}];

    brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];

    filteredBrands: any[];

    brand: string;

    constructor(private countryService: CountryService,private confirmationservice:ConfirmationService) {
        this.brand=this.brands[0];

        this.countryService.getCountries().then(countries => {
            this.country=countries[0];
          });
    }
    handleSelectClick(event:any){
        console.log(event);

    }

    filterCountrySingle(event) {
        let query = event.query;
        this.countryService.getCountries().then(countries => {
          debugger;
            this.filteredCountriesSingle = this.filterCountry(query, countries);
        });


    }

    filterCountryMultiple(event) {
        let query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountriesMultiple = this.filterCountry(query, countries);
        });
    }

    filterCountry(query, countries: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }

openpop(){
  setTimeout(()=>{
    this.confirmationservice.confirm({
               message: 'Are you sure you want to log out?',
               accept: () => {
                   alert('selected');
               }
           });
  },10000);

}
    filterBrands(event) {
        this.filteredBrands = [];
        for(let i = 0; i < this.brands.length; i++) {
            let brand = this.brands[i];
            if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    }

    handleDropdownClick() {
        this.filteredBrands = [];

        //mimic remote call
        setTimeout(() => {
            this.filteredBrands = this.brands;
        }, 100)
    }
}
