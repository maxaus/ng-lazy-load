"use strict";

angular.module("ngLazyLoadApp").factory("LazyLoader", ["$rootScope", "$q", function ($rootScope, $q) {
    var fetch, args;
    return {

        configure: function (options) {
            fetch = options.fetchData;
            args = options.args;
        },

        load: function () {
            var deferred = $q.defer();
            $rootScope.$broadcast("showLoading");

            fetch.apply(null, args).then(function (res) {
                deferred.resolve(res);
                $rootScope.$broadcast("hideLoading");
            });

            return deferred.promise;
        }
    };
}]);
