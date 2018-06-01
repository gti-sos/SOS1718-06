/* global angular*/
/* global Highcharts*/
/* global anychart*/
/* global google*/

//Controlador

angular
    .module("ResourcesApp")
    .controller("AnalyticsCtrlSP", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        console.log("List Ctrl Spending Policies initialized!"); //$http establece la conexión entre el navegador del usuario y el servidor (backend).
        var apiPropia = "api/v1/spending-policies";

        $http
            .get(apiPropia)
            .then(function(response) {

                Highcharts.chart('analytics1', {
                    chart: {
                        type: 'pyramid'
                    },
                    title: {
                        text: 'Spending Policies pyramid',
                        x: -50
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>',
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                                softConnector: true
                            },
                            center: ['40%', '50%'],
                            width: '80%'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Percentage Total',
                        data: [
                            [response.data[0].section, response.data[0].percentagetotal],
                            [response.data[1].section, response.data[1].percentagetotal],
                            [response.data[2].section, response.data[2].percentagetotal], 
                            [response.data[3].section, response.data[3].percentagetotal],
                            [response.data[4].section, response.data[4].percentagetotal]
                        ]
                    }]
                });

            });


        $http
            .get(apiPropia)
            .then(function(response) {
                anychart.onDocumentReady(function() {
                    // create bar chart
                    var chart = anychart.bar();

                    chart.animation(true);

                    chart.padding([10, 40, 5, 20]);

                    chart.title('Spending Policies in 2017');

                    // create bar series with passed data
                    var series = chart.bar([
                        [response.data[0].section, response.data[0].percentagetotal],
                        [response.data[1].section, response.data[1].percentagetotal],
                        [response.data[2].section, response.data[2].percentagetotal],
                        [response.data[3].section, response.data[3].percentagetotal],
                        [response.data[4].section, response.data[4].percentagetotal]
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
        $http
            .get(apiPropia)
            .then(function(response) {
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
                        ['Sevilla', response.data[0].percentagevariable],
                        ['Madrid', response.data[1].percentagevariable],
                        ['Barcelona', response.data[2].percentagevariable],
                        ['Bilbao', response.data[3].percentagevariable],
                        ['Vigo', response.data[4].percentagevariable]
                    ]);

                    var options = {
                        region: 'ES',
                        displayMode: 'markers',
                        colorAxis: { colors: ['green', 'blue'] }
                    };


                    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                    chart.draw(data, options);
                }

            });


    }]);