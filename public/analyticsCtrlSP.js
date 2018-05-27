/* global angular*/
/* global Highcharts*/
/* global anychart*/
/* global google*/

//Controlador

angular
    .module("ResourcesApp")
    .controller("AnalyticsCtrlSP", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        console.log("List Ctrl Spending Policies initialized!"); //$http establece la conexión entre el navegador del usuario y el servidor (backend).
        var api = "api/v1/spending-policies";

        $http
            .get("api/v1/spending-policies")
            .then(function(response) {

                Highcharts.chart('analytics1', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Spending Policies in 2017'
                    },
                    xAxis: {
                        type: response.data.map(function(d) { return d.section }),
                        labels: {
                            rotation: -45,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Percentage Total'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: 'Percentage total in 2017: <b>{point.y:.1f}%</b>'
                    },
                    series: [{
                        name: 'Data',
                        data: response.data.map(function(d) { return d.percentagetotal })
                            //[

                            /*['GastosDePersonal', 30.8],
                            ['GastosCorrientesEnBienesYServicios', 9.9],
                            ['GastosFinancieros', 1.5],
                            ['TransferenciasCorrientes', 35.4],
                            ['InversionesReales', 4] */
                            /*[response.data.map(function(d) { return d.section }), response.data.map(function(d) { return d.percentagetotal })]*/

                            //],
                            ,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y:.1f}', // one decimal
                            y: 10, // 10 pixels down from the top
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    }]
                });

            });


        $http
            .get("api/v1/spending-policies")
            .then(function(response) {
                anychart.onDocumentReady(function() {
                    // create bar chart
                    var chart = anychart.bar();

                    chart.animation(true);

                    chart.padding([10, 40, 5, 20]);

                    chart.title('Spending Policies in 2017');

                    // create bar series with passed data
                    var series = chart.bar([
                        //['GastosDePersonal', response.data.map(function(d) { return d.percentagetotal })],
                        ['GastosDePersonal', '30.8'],
                        ['GastosCorrientesEnBienesYServicios', '9.9'],
                        ['GastosFinancieros', '1.5'],
                        ['TransferenciasCorrientes', '35.4'],
                        ['InversionesReales', '4']
                    ]);

                    // set tooltip settings
                    series.tooltip()
                        .position('right')
                        .anchor('left-center')
                        .offsetX(5)
                        .offsetY(0)
                        .titleFormat('{%X}')
                        .format('{%Value}%');

                    // set yAxis labels formatter
                    chart.yAxis().labels().format('{%Value}{groupsSeparator: }');

                    // set titles for axises
                    chart.xAxis().title('Sections');
                    chart.yAxis().title('Percentage Total');
                    chart.interactivity().hoverMode('by-x');
                    chart.tooltip().positionMode('point');
                    // set scale minimum
                    chart.yScale().minimum(0);

                    // set container id for the chart
                    chart.container('container');
                    // initiate chart drawing
                    chart.draw();
                });
            });
        //GeoCharts
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['City ', 'Percentage Total'],
                ['Sevilla', 35.4]
            ]);

            var options = {
                region: 'ES',
                displayMode: 'markers',
                colorAxis: { colors: ['green', 'blue'] }
            };


            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }


    }]);
