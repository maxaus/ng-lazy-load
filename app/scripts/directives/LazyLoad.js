"use strict";

angular.module("ngLazyLoadApp").directive("lazyLoad", ["$injector", "$window", "$document", "LazyLoader",
        function ($injector, $window, $document, LazyLoader) {

            var appendAnimations = function () {
                var style = $document[0].createElement("style");
                style.innerHTML = "@-webkit-keyframes spin {\n" +
                "\t0%{-webkit-transform: rotate(0deg);}\n" +
                "\t100%{-webkit-transform: rotate(360deg);}\n" +
                "}\n" +
                "@keyframes spin{\n" +
                "\t0%{transform: rotate(0deg);}\n" +
                "\t100%{transform: rotate(360deg);}\n" +
                "}";
                $document[0].head.appendChild(style);
            }, makeSpinner = function (el, color) {
                el.css({
                    WebkitBoxSizing: "border-box",
                    boxSizing: "border-box",
                    display: "block",
                    width: "43px",
                    height: "43px",
                    margin: "20px auto",
                    borderWidth: "8px",
                    borderStyle: "solid",
                    borderColor: color,
                    borderRadius: "22px",
                    animation: "spin 0.8s linear infinite",
                    WebkitAnimation: "spin 0.8s linear infinite"
                });
                return el;
            };

            return {
                restrict: "A",
                require: "?ngModel",
                scope: {
                    lazyData: "=",
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
                    element.append(
                        "<div class=\"loading\">" +
                        "<div class=\"loading-widget\"></div>" +
                        "</div>"
                    );

                    appendAnimations();
                    makeSpinner(loadingWidget, "transparent rgb(44, 44, 44) rgb(44, 44, 44) rgb(44, 44, 44)");

                    lazyLoad = function () {
                        scope.isLoading = true;
                        var args = scope.lazyLoadArgs.slice(0);
                        args.push(scope.page);
                        lazyLoader.configure({
                            data: scope.lazyData,
                            fetchData: dataProvider[scope.lazyLoadMethod],
                            range: scope.lazyRange,
                            args: args
                        });

                        lazyLoader.load()
                            .then(function (data) {
                                if (!data.next) {
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

                    scope.$parent.$on("startLoading", function (event, args) {
                        console.log(args);
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
