"use strict";

angular.module("ngLazyLoadApp")
  .controller("MainCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
        $rootScope.$broadcast("startLoading", {parameters: [], shouldReloadList: true});
  }]);
