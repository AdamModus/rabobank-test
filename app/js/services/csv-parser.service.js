angular.module('raboApp')
    .service('csvParserService', function () {

            this.parseFile = function (file) {

                return new Promise(function (resolve, reject) {
                    var r = new FileReader();
                    r.onloadend = function (e) {
                        try {
                            var parsed = csv2JSON(e.target.result);
                        } catch (e) {
                            reject(e);
                        }
                        resolve(parsed);
                    }
                    r.readAsText(file);
                });

                function csv2JSON(csv) {
                    var lines = csv.split("\n");
                    var result = [];
                    var headers = removeQuotes(lines[0].split(","));
                    headers.forEach(function (el, idx, arr) {
                        arr[idx] = el.replace(/ /g, "").trim();
                    });
                    if (headers[0] !== "Firstname" && headers[1] !== "Surname" && headers[2] !== "Issuecount" && headers[3] !== "Dateofbirth") {
                        throw "CSV Format not Compliant!";
                    }

                    for (var i = 1; i < lines.length; i++) {
                        var obj = {};
                        var currentline = removeQuotes(lines[i].split(","));

                        for (var j = 0; j < headers.length; j++) {
                            obj[headers[j]] = currentline[j];
                        }
                        result.push(obj);
                    }
                    return result;
                }

                function removeQuotes(array) {
                    array.forEach(function (el, idx, arr) {
                        arr[idx] = el.replace(/['"]+/g, "");
                    });
                    return array;
                }

            };

        }
    );