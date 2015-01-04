"use strict";

angular.module("ngLazyLoadApp").factory("NewsFeed", ["$resource", function ($resource) {
    return $resource("data/contacts.json");
}]);