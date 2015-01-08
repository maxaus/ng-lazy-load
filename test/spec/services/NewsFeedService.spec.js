'use strict';

describe('Service: NewsFeedService', function () {

    var NewsFeedService, q, newsFeedMock;

    beforeEach(module('ngLazyLoadApp'));

    beforeEach(function () {
        newsFeedMock = {
            get: function () {
                return {
                    $promise: {
                        then: function () {
                            return {results: []};
                        }
                    }
                };
            }
        };

        module(function ($provide) {
            $provide.value("NewsFeed", newsFeedMock);
        });
    });

    beforeEach(inject(function (_NewsFeedService_, $q) {
        NewsFeedService = _NewsFeedService_;
        q = $q;
        spyOn(newsFeedMock, "get").and.callThrough();
    }));

    it("NewsFeedService should be not null", function () {
        expect(!!NewsFeedService).toBeTruthy();
    });

    it("NewsFeedService should have all functions", function () {
        expect(NewsFeedService.getNewsList).toBeDefined();
    });

    it("NewsFeedService:getNewsList", function () {
        var page = 2, perPage = 10;
        NewsFeedService.getNewsList(page, perPage);
        expect(newsFeedMock.get).toHaveBeenCalledWith({per_page: perPage, page: page});
    });
});
