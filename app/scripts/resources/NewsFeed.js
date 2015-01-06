"use strict";

angular.module("ngLazyLoadApp").factory("NewsFeed", ["$resource", function ($resource) {
    return $resource("https://api.github.com/events", {},
    {
        "get": {method: "GET", isArray: true}
    });
}]);