'use strict';

describe('Service: LazyLoader', function () {

    var LazyLoader, q, rootScope, fetchMock;

    beforeEach(module('ngLazyLoadApp'));

    beforeEach(inject(function (_LazyLoader_, $q, $rootScope) {
        LazyLoader = _LazyLoader_;
        q = $q;
        rootScope = $rootScope;
        fetchMock = {
            apply: function(thisArg,argArray) {
                return {
                    then: function() {}
                }
            }
        };
        spyOn(fetchMock, "apply").and.callThrough();
    }));

    it("LazyLoader should be not null", function () {
        expect(!!LazyLoader).toBeTruthy();
    });

    it("LazyLoader should have all functions", function () {
        expect(LazyLoader.configure).toBeDefined();
        expect(LazyLoader.load).toBeDefined();
    });

    it("LazyLoader:configure", function () {
        var options = {};
        LazyLoader.configure(options);
    });

    it("LazyLoader:load", function () {
        var options = {
            fetchData: fetchMock,
            args: {page: 2}
        };
        LazyLoader.configure(options);
        LazyLoader.load();
        expect(fetchMock.apply).toHaveBeenCalledWith(null, options.args)
    });
});