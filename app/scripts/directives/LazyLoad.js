"use strict";

angular.module("ngLazyLoadApp").directive("lazyLoad", ["$injector", "$window", "$document", "LazyLoader",
        function ($injector, $window, $document, LazyLoader) {
            return {
                restrict: "A",
                require: "?ngModel",
                scope: {
                    lazyData: "=",
                    lazyRange: "@",
                    lazyDataProvider: "@",
                    lazyLoadMethod: "@"
                },
                link: function (scope, element, attrs, ngModel) {
                    var winEl = angular.element($window),
                        win = winEl[0],
                        loadingWidget = angular.element($document[0].querySelector(".loading-widget")),
                        lazyLoader = LazyLoader,
                        dataProvider = $injector.get(scope.lazyDataProvider),
                        lazyLoad;

                    scope.page = 1;
                    scope.hasNextPage = true;
                    scope.isLoading = false;
                    element.append("<div class=\"loading-widget\"></div>");

//                    appendAnimations();
//                    makeSpinner(loadingWidget, "transparent rgb(44, 44, 44) rgb(44, 44, 44) rgb(44, 44, 44)");
                    element.mCustomScrollbar({
                        scrollInertia: "100",
                        autoHideScrollbar: false,
                        theme: "dark-thin",
                        advanced: {
                            updateOnContentResize: true,
                            autoScrollOnFocus: false
                        },
                        callbacks: {
                            onTotalScroll: function () {
                                if (scope.hasNextPage && !scope.isLoading) {
                                    scope.shouldReloadList = false;
                                    lazyLoad();
                                }
                            }
                        }
                    });
                    lazyLoad = function () {
                        scope.isLoading = true;
                        var args = scope.lazyLoadArgs.slice(0);
                        args.push(scope.page);
                        args.push(scope.lazyRange);
                        lazyLoader.configure({
                            data: scope.lazyData,
                            fetchData: dataProvider[scope.lazyLoadMethod],
                            args: args
                        });

                        lazyLoader.load()
                            .then(function (data) {
                                if (!data.hasNextPage) {
                                    scope.hasNextPage = false;
                                } else {
                                    scope.page += 1;
                                }
                                if (!scope.shouldReloadList) {
                                    angular.forEach(Object.keys(data.list), function (key) {
                                        scope.lazyData.push(data.list[key]);
                                    });
                                } else {
                                    scope.lazyData = data.list;
                                }
                                scope.isLoading = false;
                            });
                    };

                    scope.$on("startLoading", function (event, args) {
                        if (args.shouldReloadList) {
                            scope.page = 1;
                            scope.shouldReloadList = true;
                            scope.hasNextPage = true;
                        } else {
                            scope.shouldReloadList = false;
                        }
                        scope.lazyLoadArgs = args.parameters;
                        lazyLoad();
                    });

                    scope.$on("hideLoading", function () {
                        loadingWidget.hide();
                    });
                    scope.$on("showLoading", function () {
                        loadingWidget.show();
                    });
                }
            };
        }]);
