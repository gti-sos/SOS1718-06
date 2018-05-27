/*global angular*/
/*global Highcharts*/
/*global google*/
/*global FusionCharts*/

angular.module("App").controller("mainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("main Controller initialized");

    $http.get("/api/v1/budgets-laws").then(function(response) {



        var chart = Highcharts.chart('analytics', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Budgets Laws'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: ['Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA-consolidado', 'Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA', 'Agencia-andaluza-del-conocimiento', 'Agencia-publica-andaluza-de-educacion', 'Agencia-publica-empresarial-sanitaria-bajo-Guadalquivir'],
                labels: {
                    x: -10
                }
            },

            series: [{
                name: 'Budget of capital',
                data: [5779, 968284, 200000, 1000, 800000]
            }, {
                name: 'Total',
                data: [169400, 161032, 7248, 379833, 892169]
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -5
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            }
        });

        $('#small').click(function() {
            chart.setSize(400, 300);
        });

        $('#large').click(function() {
            chart.setSize(600, 300);
        });

        google.charts.load('current', {
            'packages': ['geochart'],
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['Community', 'Total'],
                ['andalucia', 169400],
                ['andalucia', 161032],
                ['andalucia', 7248],
                ['andalucia', 379833],
                ['andalucia', 892169]

            ]);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('budgets'));

            chart.draw(data, options);
        }

        FusionCharts.ready(function() {
            var salesAnlysisChart = new FusionCharts({
                type: 'mscombi2d',
                renderAt: 'chart-container',
                width: '600',
                height: '300',
                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        "caption": "Budgets Laws",
                        "xAxisname": "Section",
                        "numberPrefix": "$",
                        "showBorder": "0",
                        "showValues": "0",
                        "paletteColors": "#0075c2,#1aaf5d,#f2c500",
                        "bgColor": "#ffffff",
                        "showCanvasBorder": "0",
                        "canvasBgColor": "#ffffff",
                        "captionFontSize": "14",
                        "subcaptionFontSize": "14",
                        "subcaptionFontBold": "0",
                        "divlineColor": "#999999",
                        "divLineIsDashed": "1",
                        "divLineDashLen": "1",
                        "divLineGapLen": "1",
                        "showAlternateHGridColor": "0",
                        "usePlotGradientColor": "0",
                        "toolTipColor": "#ffffff",
                        "toolTipBorderThickness": "0",
                        "toolTipBgColor": "#000000",
                        "toolTipBgAlpha": "80",
                        "toolTipBorderRadius": "2",
                        "toolTipPadding": "5",
                        "legendBgColor": "#ffffff",
                        "legendBorderAlpha": '0',
                        "legendShadow": '0',
                        "legendItemFontSize": '10',
                        "legendItemFontColor": '#666666'
                    },
                    "categories": [{
                        "category": [{
                                "label": "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA-consolidado"
                            },
                            {
                                "label": "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA"
                            },
                            {
                                "label": "Agencia-andaluza-del-conocimiento"
                            },
                            {
                                "label": "Agencia-publica-andaluza-de-educacion"
                            },
                            {
                                "label": "Agencia-publica-empresarial-sanitaria-bajo-Guadalquivir"
                            }
                        ]
                    }],
                    "dataset": [{
                            "seriesName": "Total",
                            "showValues": "1",
                            "data": [{
                                    "value": "169400"
                                },
                                {
                                    "value": "161032"
                                },
                                {
                                    "value": "7248"
                                },
                                {
                                    "value": "379833"
                                },
                                {
                                    "value": "892169"
                                }
                            ]
                        },
                        {
                            "seriesName": "Budget of capital",
                            "renderAs": "area",
                            "data": [{
                                    "value": "5779"
                                },
                                {
                                    "value": "968284"
                                },
                                {
                                    "value": "200000"
                                },
                                {
                                    "value": "1000"
                                },
                                {
                                    "value": "800000"
                                }
                            ]
                        }
                    ]
                }
            }).render();
        });
    });

}]);
