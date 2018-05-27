/* global angular*/

//Controlador

angular
    .module("ResourcesApp")
    .controller("ListCtrlSP", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        console.log("List Ctrl Spending Policies initialized!"); //$http establece la conexión entre el navegador del usuario y el servidor (backend).
        var api = "api/v1/spending-policies";



        /*$scope.addSpendingPolicie = function() {
            $http.post(api, $scope.newSpendingPolicie).then(function doneFilter(response) {
                $scope.spendingPolicies = response.data;
                $scope.status = "Status: " + response.status;

                if (response.status === 201) {
                    window.alert("El dato se ha insertado con exito, gracias!");
                }

                getSpendingPolicies();
            }, function failFilter(response) {
                $scope.status = "Status: " + response.status;
                if (response.status == 400) {
                    window.alert("Debes introducir todos los campos requeridos, gracias!");
                    location.reload();
                }
                else if (response.status == 409) {
                    window.alert("El recurso ya existe, gracias!");
                    location.reload();
                }
                else {
                    window.alert("Ha ocurrido un error inesperado, lo siento!");
                }


            });
        };*/

        $scope.addSpendingPolicie = function() {
            $http.post(api, $scope.newSpendingPolicie).then(function(response) {
                $scope.status = "Status: " + response.status;
                getSpendingPolicies();
            }, function() {
                if ($scope.length != 5) {
                    $scope.status = "Debe completar todos los campos";
                }
                else {
                    $scope.status = "La estadistica ya existe";
                }
            });
        };

        $scope.deleteSpendingPolicie = function(section) {
            console.log("Spending Policie to be deleted: " + section);

            $http.delete(api + "/" + section).then(function(response) {
                $scope.status = "Status: " + response.status;
                getSpendingPolicies();
                window.alert("Spending policie deleted correctly");

            });
        };

        $scope.deleteSpendingPolicies = function() {
            console.log("Spending Policies deleted: ");

            $http.delete(api + "/").then(function(response) {
                $scope.status = "Status: " + response.status;
                getSpendingPolicies();
                window.alert("Spending policies deleted correctly");
            });
        };

        $scope.fromTo = function() {
            console.log("from-to");

            getSpendingPolicies();

        };
        var pag = 0;
        var numero;
        $scope.getStadisticsPagination = function(num) {
            numero = num;

            if (num == 1) {
                pag = pag - 10;
                if (pag < 0) {
                    pag = 0;
                    $http.get(api + "?limit=" + 10 + "&offset=" + pag).then(function(response) {
                        $scope.spendingPolicies = response.data;
                        console.log("pagination1");
                        numero = num;
                        console.log(numero);
                        getSpendingPolicies();
                    });

                }
                else {
                    $http.get(api + "?limit=" + 10 + "&offset=" + pag).then(function(response) {
                        $scope.spendingPolicies = response.data;
                        console.log("pagination2");
                        numero = num;
                        console.log(numero);
                        getSpendingPolicies();
                    });
                }
            }
            else {

                pag = pag + 10;
                $http.get(api + "?limit=" + 10 + "&offset=" + pag).then(function(response) {
                    $scope.spendingPolicies = response.data;
                    console.log("pagination3");
                    numero = num;
                    console.log(numero);
                    getSpendingPolicies();
                });


            }
        };

        $scope.busqueda = function() {
            console.log(api + "?" + $scope.atributo + "=" + $scope.valor);
            $http.get(api + "?" + $scope.atributo + "=" + $scope.valor).then(function successCallback(response) {
                $scope.status = "Recurso encontrado";
                $scope.spendingPolicies = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        };
        //Paginación

        $scope.paginacion = function() {

            $http.get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function successCallback(response) {
                $scope.status = "Recurso obtenido";
                $scope.spendingPolicies = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Error pagina no obtenida";
            });

        };



        $scope.obtenerpaginaAnterior = function() {
            $scope.offset = $scope.offset + $scope.limit;
            $http.get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function successCallback(response) {
                $scope.status = "Recurso obtenido";
                $scope.spendingPolicies = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Error pagina no obtenida";
            });

        };

        $scope.obtenerpaginaSiguiente = function() {
            $scope.offset = $scope.offset - $scope.limit;
            $http.get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function successCallback(response) {
                $scope.status = "Recurso obtenido";
                $scope.spendingPolicies = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Error pagina no obtenida";
            });

        };


        /*$scope.getSearch = function() {
            if (!$scope.searchSpendingPolicie.section) {
                delete $scope.searchSpendingPolicie.section;
            }
            if (!$scope.searchSpendingPolicie.community) {
                delete $scope.searchSpendingPolicie.community;
            }
            if (!$scope.searchSpendingPolicie.year) {
                delete $scope.searchSpendingPolicie.year;
            }
            if (!$scope.searchSpendingPolicie.percentagetotal) {
                delete $scope.searchSpendingPolicie.percentagetotal;
            }
            if (!$scope.searchSpendingPolicie.percentagevariable) {
                delete $scope.searchSpendingPolicie.percentagevariable;
            }
            var query = $httpParamSerializer($scope.searchSpendingPolicie);
            query.limit = 10;
            query.offset = 10;
            console.log(query);
            $http.get(api + "/?" + query).then(function(response) {
                $scope.spendingPolicies = response.data;
            }, function errorCallback(response) {
                console.log("Empty");
                $scope.spendingPolicies = [];
                window.alert("Not found!");
            });
        };*/


        function getSpendingPolicies() {
            $http.get(api).then(function(response) {
                $scope.spendingPolicies = response.data;
            });
        }

        getSpendingPolicies();
    }]);


// response.data.map(function(d) { return d.percentagetotal })
