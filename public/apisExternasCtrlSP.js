/*global angular*/
/*global anychart*/

angular
    .module("ResourcesApp")
    .controller("ApisExternasCtrlSP", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        var apiPropia = "/api/v1/spending-policies";

        var mashapeFifaWorld = {
            method: 'GET',
            url: "https://montanaflynn-fifa-world-cup.p.mashape.com/teams",
            headers: {
                "X-Mashape-Key": "V8Qjkb15uumshhSXxMZfdnhE1H4lp13ktahjsnyv40nHEJ0YKt",
                "Accept": "application/json"

            }
        };

        var mashapeCountries = {
            method: 'GET',
            url: "https://restcountries-v1.p.mashape.com/all",
            headers: {
                "X-Mashape-Key": "V8Qjkb15uumshhSXxMZfdnhE1H4lp13ktahjsnyv40nHEJ0YKt",
                "Accept": "application/json"

            }
        };

        //API EXTERNA 1
        $http(mashapeFifaWorld).then(function(response1) {
            console.log(response1);
            $http.get(apiPropia).then(function(response2) {
                anychart.onDocumentReady(function() {
                    // create pie chart with passed data
                    var chart = anychart.pie([
                        //['Equipos', response2.data.filter(d => d.section == "GastosDePersonal").map(function(d) { return d["percentagetotal"] })],
                        [response1.data[0].title, response2.data[0].percentagetotal],
                        [response1.data[1].title, response2.data[1].percentagetotal],
                        [response1.data[2].title, response2.data[2].percentagetotal],
                        [response1.data[3].title, response2.data[3].percentagetotal],
                        [response1.data[4].title, response2.data[4].percentagetotal]
                    ]);

                    // set chart title text settings
                    chart.title('Relation FIFA World Cup teams with spending policies percentage total')
                        //set chart radius
                        .radius('43%')
                        // create empty area in pie chart
                        .innerRadius('30%');

                    // set container id for the chart
                    chart.container('FifaWorld');
                    // initiate chart drawing
                    chart.draw();
                });
            });
        });


        //API EXTERNA 2

        $http(mashapeCountries).then(function(response1) {
            console.log(response1);
            $http.get(apiPropia).then(function(response2) {
                anychart.onDocumentReady(function() {
                    // create pie chart with passed data
                    var data = anychart.data.set([
                        [response1.data[0].name, response2.data[0].percentagevariable],
                        [response1.data[10].name, response2.data[1].percentagevariable],
                        [response1.data[20].name, response2.data[2].percentagevariable],
                        [response1.data[30].name, response2.data[3].percentagevariable],
                        [response1.data[40].name, response2.data[4].percentagevariable]
                    ]);

                    var wealth = data.mapAs({
                        'x': 0,
                        'value': 1
                    });

                    var chart = anychart.pie(wealth);
                    chart.labels()
                        .hAlign('center')
                        .position('outside')
                        .format('{%Value}{%PercentOfCategory}%');

                    // set chart title text settings
                    chart.title('Relation countries with spending policies percentage variable');

                    // set legend title text settings
                    chart.legend()
                        // set legend position and items layout
                        .position('center-bottom')
                        .itemsLayout('horizontal')
                        .align('center');

                    // set container id for the chart
                    chart.container('container');
                    // initiate chart drawing
                    chart.draw();
                });
            });
        });



    }]);
