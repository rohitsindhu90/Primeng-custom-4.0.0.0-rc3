import {NgModule, Component, ElementRef, AfterViewInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalEventsManager} from '../common/globalevent';
declare var Chart: any;

@Component({
    selector: 'p-chart',
    template: `
    <div>
        <canvas [attr.width]="width" [attr.height]="height" (click)="onCanvasClick($event)"></canvas>
    </div>
`
})
export class UIChart implements AfterViewInit, OnDestroy {

    @Input() type: string;

    @Input() options: any;

    @Input() width: string;

    @Input() height: string;

    @Output() onDataSelect: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    _data: any;

    chart: any;

    eventTimeout: any;
    subscription: any;

    constructor(public el: ElementRef) { }

    @Input() get data(): any {
        return this._data;
    }

    set data(val: any) {
        this._data = val;
        this.reinit();
    }
    ngAfterViewInit() {
        this.initChart();
        this.initialized = true;
        this.subscription = GlobalEventsManager.onChartDefaultChangeEvent.subscribe((res: any) => {
              Chart.defaults.global.defaultFontColor = res;
              this.refresh();
        })
    }

    // ngAfterViewChecked() {
    //     if (this.chart && Chart.defaults.global.defaultFontColor != this.backgroundcolor) {
    //         this.backgroundcolor = Chart.defaults.global.defaultFontColor;
    //         this.refresh();
    //     }
    // }

    onCanvasClick(event) {
        if (this.chart) {
            let element = this.chart.getElementAtEvent(event);
            let dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    }

    initChart() {
        this.overRideGlobal();
        this.externalPlugin();
        this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
            type: this.type,
            data: this.data,
            options: this.options
        });
    }

    //override default sittings
    overRideGlobal() {
        Chart.defaults.global.defaultColor = '#00E9D3';
        Chart.defaults.global.elements.rectangle.backgroundColor = '#00E9D3';

    }

    //external pluging for tooltip
    externalPlugin() {

        Chart.plugins.register({
            afterEvent: function(chartInstance, chartEvent) {
                if (this.eventTimeout) {
                    clearTimeout(this.eventTimeout);
                }
                this.eventTimeout = setTimeout(() => {
                    var legend = chartInstance.legend;
                    var canvas = chartInstance.chart.canvas;
                    var getDataset = chartInstance.chart.controller.getDatasetAtEvent(chartEvent);
                    var x = chartEvent.x;
                    var y = chartEvent.y;
                    var cursorStyle = 'default';
                    if (x <= legend.right && x >= legend.left &&
                        y <= legend.bottom && y >= legend.top) {
                        for (var i = 0; i < legend.legendHitBoxes.length; ++i) {
                            var box = legend.legendHitBoxes[i];
                            if (x <= box.left + box.width && x >= box.left &&
                                y <= box.top + box.height && y >= box.top) {
                                cursorStyle = 'pointer';
                                break;
                            }
                        }
                    }
                    else if (getDataset.length > 0) {
                        cursorStyle = 'pointer';
                    }
                    canvas.style.cursor = cursorStyle;
                    this.eventTimeout = null;
                }, 0);
            }

        });


        // Chart.Tooltip.positioners.outer = function(elements) {
        //     if (!elements.length) {
        //         return false;
        //     }
        //
        //     var i, len;
        //     var x = 0;
        //     var y = 0;
        //
        //     for (i = 0, len = elements.length; i < len; ++i) {
        //         var el = elements[i];
        //         if (el && el.hasValue()) {
        //             var elPosX = el._view.x+0.95*el._view.outerRadius*Math.cos((el._view.endAngle-el._view.startAngle)/2+el._view.startAngle);
        //             var elPosY = el._view.y+0.95*el._view.outerRadius*Math.sin((el._view.endAngle-el._view.startAngle)/2+el._view.startAngle);
        //             if (x < elPosX) {
        //                 x = elPosX;
        //             }
        //             if (y < elPosY) {
        //                 y = elPosY;
        //             }
        //         }
        //     }
        //
        //     return {
        //         x: Math.round(x),
        //         y: Math.round(y)
        //     };
        // },

        // Chart.pluginService.register({
        //       beforeRender: function (chart) {
        //         if (chart.config.options.showAllTooltips) {
        //             // create an array of tooltips
        //             // we can't use the chart tooltip because there is only one tooltip per chart
        //             chart.pluginTooltips = [];
        //             chart.config.data.datasets.forEach(function (dataset, i) {
        //                 chart.getDatasetMeta(i).data.forEach(function (sector, j) {
        //                     if ((sector._view.endAngle-sector._view.startAngle) > 2*Math.PI*0.02) {
        //                         chart.pluginTooltips.push(
        //                                 new Chart.Tooltip({
        //                             _chart: chart.chart,
        //                             _chartInstance: chart,
        //                             _data: chart.data,
        //                             _options: chart.options.tooltips,
        //                             _active: [sector]
        //                         }, chart)
        //                         );
        //                     }
        //                 });
        //             });
        //
        //             // turn off normal tooltips
        //             chart.options.tooltips.enabled = false;
        //         }
        //     },
        //       afterDraw: function (chart, easing) {
        //         if (chart.config.options.showAllTooltips) {
        //             // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
        //             if (!chart.allTooltipsOnce) {
        //                 if (easing !== 1)
        //                     return;
        //                 chart.allTooltipsOnce = true;
        //             }
        //
        //             // turn on tooltips
        //             chart.options.tooltips.enabled = true;
        //             Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
        //                 tooltip.initialize();
        //                 tooltip._options.position = "outer";
        //                 tooltip._options.displayColors = false;
        //                 tooltip._options.bodyFontSize = tooltip._chart.height*0.025;
        //                 tooltip._options.yPadding = tooltip._options.bodyFontSize*0.30;
        //                 tooltip._options.xPadding = tooltip._options.bodyFontSize*0.30;
        //                 tooltip._options.caretSize = tooltip._options.bodyFontSize*0.5;
        //                 tooltip._options.cornerRadius = tooltip._options.bodyFontSize*0.50;
        //                 tooltip.update();
        //                 // we don't actually need this since we are not animating tooltips
        //                 tooltip.pivot();
        //                 tooltip.transition(easing).draw();
        //             });
        //             chart.options.tooltips.enabled = false;
        //         }
        //       }
        //     });

    }

    getCanvas() {
        return this.el.nativeElement.children[0].children[0];
    }

    getBase64Image() {
        return this.chart.toBase64Image();
    }

    generateLegend() {
        if (this.chart) {
            this.chart.generateLegend();
        }
    }

    refresh() {
        if (this.chart) {
            this.chart.update();
        }
    }

    reinit() {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    }

    ngOnDestroy() {
        if (this.chart) {
            this.subscription = null;
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [UIChart],
    declarations: [UIChart]
})
export class ChartModule { }
