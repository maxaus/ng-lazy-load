"use strict";

angular.module("ngLazyLoadApp").factory("NewsFeedService", [
    "$q",
    "NewsFeed",
    function ($q, NewsFeed) {
        var newsFeedService = {};

        newsFeedService.getNewsList = function (page) {
            var deferred = $q.defer();
            var params = {
                page: page
            };

            console.log("get");
            NewsFeed.get(params).$promise.then(function (newsListData) {
                deferred.resolve(
                    {
                        list: newsListData.results,
                        next: newsListData.next
                    }
                );

            });

            return deferred.promise;
        };

        return newsFeedService;
    }
]);
