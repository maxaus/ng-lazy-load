"use strict";

angular.module("ngLazyLoadApp")
    .controller("MainCtrl", ["$scope", "$timeout", function ($scope, $timeout) {
        $timeout(function () {
            $scope.$broadcast("startLoading", {parameters: [], shouldReloadList: true});
        }, 100);
    }]);
