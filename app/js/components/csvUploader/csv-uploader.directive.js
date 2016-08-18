angular.module('raboApp')
    .directive('csvUploader', function (csvParserService) {
        return {
            restrict: 'A',
            scope: {
                data: "=",
                changeData: "&"
            },
            link: function ($scope) {
                console.log('Rabo-CSVUploader Logging');
                var myScope = $scope;
                $scope.fileChangedAction = function () {
                    var f = document.getElementById('file').files[0];
                    csvParserService.parseFile(f).then(function (result) {
                        myScope.changeData({
                            data: result
                        });
                    }, function (error) {
                        console.log("Error report at Rabobank Logging:\n" + error);
                    });
                };
            },
            template: '<div><button id="uploadFile" ng-click="fileChangedAction()">Upload selected file</button> <input type="file" id="file" name="file"/></div>',
        }
    });
