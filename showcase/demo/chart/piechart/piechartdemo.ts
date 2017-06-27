import {Component} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/chart/piechart/piechartdemo.html'
})
export class PieChartDemo {

    data: any;

    constructor() {
        this.data = {
            labels: ['A','B','C','D','E','F','G'],
            datasets: [
                {
                    data: [300, 1, 100,1,1,1,1],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            };
    }
}
