

angular.module('SvgApp',[]).controller('SvgController', function ($scope) {

    var self = this;
    var svgWidth = 514;
    var svgHeight = 726;



    var svgBox = Snap( svgWidth, svgHeight ).attr({
        viewBox: '0,0,' + svgWidth + ',' +svgHeight
    });




    var circleP = {
        circleR: 30,
        circleCx: 0,
        circleCy: 0,
        circleFill: "#000000",
        circleOpacity: 1
    };


    self.circleList = [];

    //var num = 0;

    self.createCircle = function () {

        self.circleList.push(circleP);

        var circles = svgBox.circle()
            .attr({
                r: circleP.circleR,
                cx: circleP.circleCx,
                cy: circleP.circleCy,
                fill: circleP.circleFill,
                opacity: circleP.circleOpacity,
                id: "circle" + self.circleList.length
            })
            .drag();

    };




    var svgCon = document.querySelector('#svgContainer');


    svgBox.prependTo(svgCon);


});