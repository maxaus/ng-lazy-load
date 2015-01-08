'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('ngLazyLoadApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it("MainCtrl should be not null", function () {
        expect(!!MainCtrl).toBe(true);
    });
});
