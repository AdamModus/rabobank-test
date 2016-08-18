angular.module('raboApp')
    .controller('RaboTable', ['$scope', 'csvParserService', function ($scope) {

        console.log('RaboTable Logging');

        var defaultData = [
            {"Firstname": 'Theo', "Surname": 'Jansen', "Issuecount": 5, "Dateofbirth": "1978-01-02T00:00:00"},
            {"Firstname": 'Fiona', "Surname": 'de Vries', "Issuecount": 7, "Dateofbirth": "1950-11-12T00:00:00"}
        ];

        $scope.propertyName = "Issuecount";
        $scope.reverse = true;
        $scope.clients = defaultData;

        $scope.receiveCSV = function (clients) {
            $scope.clients = clients;
            $scope.$apply();
        }

        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

    }]);