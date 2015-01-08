'use strict';

describe('Directive: LazyLoad', function() {
    var elm, scope;

    beforeEach(module('ngLazyLoadApp'));

    beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element(
                '<ul lazy-load lazy-data="newsList" lazy-data-provider="NewsFeedService"' +
                ' lazy-load-method="getNewsList" lazy-range="10"></ul>'
        );

        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();
    }));

    it('Should create loading widget', function() {
        var loadingWidget = elm.find('.loading-widget');
        expect(loadingWidget.length).toBe(1);
    });
});