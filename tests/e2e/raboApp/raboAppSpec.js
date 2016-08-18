describe('RaboApp testing spec', function () {

    it('exists and has the correct title', function () {
        browser.get('http://localhost:8000/#/');
        expect(browser.getTitle()).toEqual('Rabobank Test');
    });

    it('should have the default values', function () {
        var table = element(by.id('raboTable'));
        expect(table.isPresent()).toBe(true);

        var defaultList = element.all(by.css('#raboTable tr'));
        expect(defaultList.count()).toBe(3);

        var firstDefaultElement = element(by.css('#raboTable tr:nth-child(2) td:nth-child(1)'));
        expect(firstDefaultElement.getText()).toEqual('Fiona');
    });

    it('should re-order table', function () {

        element(by.css('#raboTable th:nth-child(3) > button')).click();

        var firstElementAfterReorder = element(by.css('#raboTable tr:nth-child(2) td:nth-child(1)'));
        expect(firstElementAfterReorder.getText()).toEqual('Theo');
    });

    it('should change table according to model', function () {
        browser.executeAsyncScript(function (callback) {
            var scope = angular.element(document.getElementById('raboTable')).scope();
            scope.clients = [
                {"Firstname": 'Theo', "Surname": 'Jansen', "Issuecount": 5, "Dateofbirth": "1978-01-02T00:00:00"},
                {"Firstname": 'Fiona', "Surname": 'de Vries', "Issuecount": 7, "Dateofbirth": "1950-11-12T00:00:00"},
                {"Firstname": 'Petra', "Surname": 'Boersma', "Issuecount": 1, "Dateofbirth": "2001-04-20T00:00:00"}
            ];
            scope.$apply();
            callback();
        }).then(function (output) {
            console.log(output);
        });
        browser.sleep(500);

        var list = element.all(by.css('#raboTable tr'));
        expect(list.count()).toBe(4);
    });

});