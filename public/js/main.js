var app = angular.module('MainApp', []);


    app.directive('circleDirective', function () {
        var circleProperty = {
            r: 40,
            cx: 0,
            cy: 0,
            circleC: '#000000',
            circleBorderC: '#000000',
            circleBorderW: 0,
            circleOpacity: 1
        };
        function createCircle() {
            s.circle().attr({
                r: circleProperty.r,
                cx: circleProperty.cx,
                cy: circleProperty.cy,
                fill: circleProperty.circleC,
                stroke: circleProperty.circleBorderC,
                strokeWidth: circleProperty.circleBorderW,
                opacity: circleProperty.circleOpacity
            }).drag();
        }

        return {
            restrict: 'A',
            scope: {}
        };
    });

    app.controller('MainController', function($scope) {

    var svgfWidth = 514;
    var svgHeight = 726;

    var circleProperty = {
        r: 40,
        cx: 0,
        cy: 0,
        circleC: '#000000',
        circleBorderC: '#000000',
        circleBorderW: 0,
        circleOpacity: 1
    };

    var rectProperty = {
        rectX: 0,
        rectY: 0,
        rectW: 180,
        rectH: 120,
        rectColor: '#000000',
        rectBorderC: '#000000'
    };

    $scope.rectList = [];
    $scope.circleList = [];


    var s = Snap(svgfWidth, svgHeight).attr({
        viewBox: "0, 0, " + svgfWidth + ", " + svgHeight,
        id: "svgBox"
    });



    function createCircle() {
            s.circle().attr({
                r: circleProperty.r,
                cx: circleProperty.cx,
                cy: circleProperty.cy,
                fill: circleProperty.circleC,
                stroke: circleProperty.circleBorderC,
                strokeWidth: circleProperty.circleBorderW,
                opacity: circleProperty.circleOpacity,
                id: "circle" + $scope.circleList.length
            }).drag();
        $scope.circleList.push(circleProperty);

    }



    function createRect() {
            s.rect().attr({
                width: 100,
                height: 100,
                x: 0,
                y: 0
            }).drag();
        $scope.rectList.push(rectProperty);
    }

    $scope.createCircle = createCircle;
    $scope.createRect = createRect;

    var svgContainer = document.querySelector('#svgContainer');

    s.prependTo(svgContainer);

});
