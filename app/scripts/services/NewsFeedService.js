"use strict";

angular.module("ngLazyLoadApp").factory("NewsFeedService", [
    "$q",
    "NewsFeed",
    function ($q, NewsFeed) {
        var newsFeedService = {};

        newsFeedService.getNewsList = function (page, perPage) {
            var deferred = $q.defer();
            var params = {
                per_page: perPage,
                page: page
            };

            NewsFeed.get(params).$promise.then(function (newsListData) {
                deferred.resolve(
                    {
                        list: newsListData,
                        hasNextPage: newsListData && newsListData.length == perPage
                    }
                );

            });

            return deferred.promise;
        };

        return newsFeedService;
    }
]);
