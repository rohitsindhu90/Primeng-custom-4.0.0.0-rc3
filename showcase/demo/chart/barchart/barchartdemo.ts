import {Component} from '@angular/core';
declare var Chart: any;

@Component({
    templateUrl: 'showcase/demo/chart/barchart/barchartdemo.html'
})
export class BarChartDemo {

    data: any;
    options: any;
    constructor() {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    // label: 'My First dataset',
                    backgroundColor: ChartHelper.graphColor,
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
                // {
                //     label: 'My Second dataset',
                //     backgroundColor: ChartHelper.graphColor[1],
                //     borderColor: '#7CB342',
                //     data: [28, 48, 40, 19, 86, 27, 90]
                // }
            ]
        };
        this.generateOption();

    }

    generateOption() {
        this.options = ChartHelper.getInvoiceSummaryCustomToolTipwithFormulaChartOptions(ChartType.bar, false, true, true);
    }
}
export class ChartHelper {
    public static graphColor: any[] = ["#00E9D3", "#823EFF", "#EA773D", "#314AFF", "#06FF76", "#E61165", "#3385ff", "#8533ff", "#9999ff", "#00cc44", "#ff3333", "#00cc44", "#990000", "#ffff33", "#c888fe", "#ff9933", "#b147c2"];

    public static getChartOptions(charttype: ChartType, legend: boolean = true, displayCurrency: boolean = true, toolTip: boolean = false, stepSize: number = 0, legendposition: string = "bottom", labelCondition: boolean = false, stacked: boolean = false, handleClick: any = null, fontSize?: number): any {
        //bar chart option object used
        //var fontSize: number = 16;
        var options = {};
        if (charttype == ChartType.bar) {
            options = {
                responsive: true,
                legend: {
                    display: legend,
                    position: legendposition

                },
                //this event is to extend the default event to display data with currency symbol
                scales: {
                    yAxes: [{
                        stacked: stacked,
                        ticks: {
                            fontSize: fontSize,
                            beginAtZero: true,
                            stepSize: stepSize,
                            userCallback: function(label: number, index: any, labels: number[]) {
                                // when the floored value is the same as the value we have a whole number
                                return displayCurrency ? label : label.toLocaleString();

                            },
                        },

                        gridLines: {
                            display: true,
                            color: "#3b596f"
                        }
                    }],
                    xAxes: [{
                        stacked: stacked,
                        ticks: {
                            fontSize: fontSize,
                            autoSkip: false

                        },
                        gridLines: {
                            display: true,
                            color: "#3b596f"
                        }
                    }]
                },
                onClick: handleClick,
                //this event is to extend the default event to display data with currency symbol
                tooltips: {
                    enabled: toolTip,
                    callbacks: {
                        label: function(tooltipItems: any, data: any) {
                            if (toolTip) {
                                return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
                            }
                        }
                    }

                },
                hover: {
                    animationDuration: 0
                },
                // this event is not dislay label on bar
                animation: {
                    onComplete: function() {
                        if (!toolTip) {
                            var chartInstance = this.chart,
                                ctx = chartInstance.ctx;
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            this.data.datasets.forEach(function(dataset: any, i: any) {

                                var meta = chartInstance.controller.getDatasetMeta(i);
                                if (!meta.hidden) {
                                    meta.data.forEach(function(bar: any, index: any) {

                                        var scale_max = bar._yScale.maxHeight;
                                        var data = dataset.data[index];
                                        if ((labelCondition && Number(data) > 0) || !labelCondition) {

                                            data = displayCurrency ? Number(data) : data;
                                            var y_pos = bar._model.y - 5;
                                            if ((scale_max - bar._model.y) / scale_max >= 0.93)
                                                y_pos = bar._model.y + 20;
                                            ctx.fillText(data, bar._model.x, y_pos);
                                        }
                                    });
                                }
                            });
                        }
                    }
                },

            };
        }
        else if (charttype == ChartType.pie) {

            options = {

                legend: {
                    labels: {
                        generateLabels: function(chart: any) {
                            var data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map(function(label: any, i: any) {
                                    var meta = chart.getDatasetMeta(0);
                                    let ds = data.datasets[0];
                                    let arc = meta.data[i];
                                    let custom = arc && arc.custom || {};
                                    let getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                                    let arcOpts = chart.options.elements.arc;
                                    let fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                                    let stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                                    var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

                                    //We get the value of the current label
                                    var value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];
                                    return {
                                        // Instead of `text: label,`
                                        // We add the value to the string
                                        text: label + " (" + parseFloat(value) + ")",
                                        fillStyle: fill,
                                        strokeStyle: stroke,
                                        lineWidth: bw,
                                        hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                        index: i
                                    };
                                });
                            } else {
                                return [];
                            }
                        }

                    },
                    display: legend,
                    position: legendposition,

                },
                // this event is to extend the default event to display data with currency symbol
                tooltips: {
                    enabled: toolTip,
                    callbacks: {
                        label: function(tooltipItem: any, data: any) {
                            var allData = data.datasets[tooltipItem.datasetIndex].data;
                            var tooltipLabel = data.labels[tooltipItem.index];
                            var tooltipData = allData[tooltipItem.index];
                            //var total = 0;
                            //for (var i in allData) {
                            //    total += allData[i];
                            //}
                            //var tooltipPercentage = Math.round((tooltipData / total) * 100);
                            var tooltiptext = tooltipLabel + " (" + parseFloat(tooltipData) + ")";
                            return tooltiptext;
                        }
                    }
                }
                //,
                //hover: {
                //    animationDuration: 0
                //}


            };
        }
        else if (charttype == ChartType.line) {
            options = {
                legend: {
                    display: legend,
                    position: legendposition
                },
                //this event is to extend the default event to display data with currency symbol
                scales: {
                    yAxes: [{
                        ticks: {
                            fontSize: fontSize,
                            beginAtZero: true,
                            userCallback: function(label: number, index: any, labels: number[]) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(label) === label) {
                                    return label;
                                }

                            },
                        }, gridLines: {
                            display: true,
                            color: "#3b596f"
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: fontSize
                        },
                        gridLines: {
                            display: true,
                            color: "#3b596f"
                        }
                    }]
                },
                //this event is to extend the default event to display data with currency symbol
                tooltips: {
                    enabled: toolTip,
                    callbacks: {
                        label: function(tooltipItem: any, data: any) {
                            return data.datasets[tooltipItem.datasetIndex].label + ' : ' + tooltipItem.yLabel;
                        }
                    }
                }
                //,
                //hover: {
                //    animationDuration: 0
                //},
            };
        }
        return options;
    }

    public static getInvoiceSummaryCustomToolTipwithFormulaChartOptions(charttype: ChartType, legend: boolean = true, displayCurrency: boolean = true, toolTip: boolean = false): any {
        //bar chart option object used

        var options = {};
        if (charttype == ChartType.bar) {
            options = {
                legend: {
                    display: legend,
                    position: 'bottom'
                },
                //this event is to extend the default event to display data with currency symbol
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            userCallback: function(label: number, index: any, labels: number[]) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(label) === label) {

                                    return label;
                                }

                            },
                        },
                        gridLines: {
                            display: true,
                            color: "#3b596f"
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: true,
                            color: "#3b596f"
                        }
                    }]
                },

                // this event is to extend the default event to display data with currency symbol
                tooltips: {
                    enabled: toolTip,
                    xPadding: 25,
                    yPadding: 20,
                    bodySpacing: 2,
                    caretSize: 10,
                    cornerRadius: 8,
                    intersect: true,
                    //position: 'nearest',
                    callbacks: {

                        label: function(tooltipItems: any, data: any) {
                            var xLabel = tooltipItems.xLabel;
                            var tooltipText = "";
                            let invoicecostlabel = "Invoice Cost", servicechargelabel = "Service Charge", usagechargelabel = "Usage Charge", otherchargelabel = "Other Charge";

                            if (xLabel == invoicecostlabel) {
                                tooltipText = "Total Spend";
                            }
                            if (xLabel == servicechargelabel) {
                                tooltipText = servicechargelabel + " + Service Credit";
                            }
                            if (xLabel == usagechargelabel) {
                                tooltipText = "Usage Cost + Usage Credit";
                            }
                            if (xLabel == otherchargelabel) {
                                tooltipText = otherchargelabel + " + Other Credits";
                            }
                            return tooltipText;

                        }

                    }

                },

                hover: {
                    animationDuration: 0
                },
                // this event is not dislay label on bar
                animation: {
                    onComplete: function() {
                        if (toolTip) {
                            var chartInstance = this.chart,
                                ctx = chartInstance.ctx;
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                             ctx.fillStyle = Chart.defaults.global.defaultFontColor;

                            this.data.datasets.forEach(function(dataset: any, i: any) {
                                var meta = chartInstance.controller.getDatasetMeta(i);
                                meta.data.forEach(function(bar: any, index: any) {
                                    var scale_max = bar._yScale.maxHeight;
                                    var data = dataset.data[index];
                                    data = Number(data);
                                    var y_pos = bar._model.y - 5;
                                    if ((scale_max - bar._model.y) / scale_max >= 0.93)
                                        y_pos = bar._model.y + 20;
                                    ctx.fillText(data, bar._model.x, y_pos);
                                });
                            });
                        }
                    }
                },

            };
        }

        return options;
    }

    public static MockData: any = {
        labels: [
            "DATA",
            "ROAMED DATA",
            "ROAMED OUT",
            "INTERNATIONAL",
            "INTERNATIONAL SMS",
            "ROAMED INCOMING SMS",
            "NATIONAL",
            "SAME NETWORK",
            "CROSS NET",
            "DIRECTORY ENQUIRIES",
            "SMS OUT",
            "PREMIUM SMS",
            "VOICE MAIL",
            "PREMIUM SERVICE",
            "ROAMED RECEIVED",
            "PERSONAL NUMBER",
            "MMS OUT",
            "NON-GEOGRAPHIC",
            "WITHIN COMPANY"
        ],
        datasets: [
            {
                data: [
                    "0.00",
                    "0.00",
                    "0.44",
                    "2.61",
                    "0.00",
                    "0.00",
                    "0.77",
                    "0.00",
                    "0.19",
                    "0.00",
                    "0.38",
                    "0.66",
                    "0.00",
                    "0.49",
                    "0.00",
                    "0.33",
                    "0.82",
                    "0.24",
                    "0.00"
                ]
            }
        ]
    };



}

export enum ChartType {
    bar = 1,
    pie = 2,
    line = 3
}
