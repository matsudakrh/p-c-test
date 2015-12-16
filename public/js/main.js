

angular.module('SvgApp',[]).controller('SvgController', function ($scope) {

    var self = this;
    var svgWidth = 514;
    var svgHeight = 726;



    var svgBox = Snap('#svgBox').attr({
        width: svgWidth,
        height: svgHeight,
        viewBox: '0,0,' + svgWidth + ',' + svgHeight
    });


    self.circleList = [];

    //var num = 0;

    self.createCircle = function () {

        self.circleList.push({
            circleR: 60,
            circleCx: 0,
            circleCy: 0,
            circleBC: "#000000",
            circleBW: 10,
            circleFill: "#000000",
            circleOpacity: 1
        });

        self.circles = svgBox.circle()
            .attr({
                r: self.circleList[self.circleList.length - 1].circleR,
                cx: self.circleList[self.circleList.length - 1].circleCx,
                cy: self.circleList[self.circleList.length - 1].circleCy,
                fill: self.circleList[self.circleList.length - 1].circleFill,
                stroke: self.circleList[self.circleList.length - 1].circleBC,
                strokeWidth: self.circleList[self.circleList.length - 1].circleBW,
                opacity: self.circleList[self.circleList.length - 1].circleOpacity
            })
            .drag();




    };




});

