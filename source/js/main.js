var app = angular.module('SvgApp',[]);
    app.controller('SvgController', function () {

    var self = this;
    var svgWidth = 514;
    var svgHeight = 726;
    var centerX = svgWidth / 2;
    var centerY = svgHeight / 2;



    var svgBox = Snap('#svgBox').attr({
        width: svgWidth,
        height: svgHeight,
        viewBox: '0,0,' + svgWidth + ',' + svgHeight
    });


    self.circleList = [];


    self.createCircle = function () {

        self.circleList.push({
            circleR: 20,
            circleCx: centerX,
            circleCy: centerY,
            circleBC: "#000000",
            circleBW: 4,
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
                opacity: self.circleList[self.circleList.length - 1].circleOpacity,
                id: "circle" + (self.circleList.length - 1)
            })
            .drag();




    };




    document.onkeypress = function () {

        function circleAttrReplace() {


            for (var i = 0; i < self.circleList.length; i++) {
                var targetCircle = Snap('#circle' + i);
                targetCircle.attr({
                    r: self.circleList[i].circleR,
                    fill: self.circleList[i].circleFill,
                    stroke: self.circleList[i].circleBC,
                    strokeWidth: self.circleList[i].circleBW,
                    opacity: self.circleList[i].circleOpacity
                });
            }
        }

        var timer = setTimeout(circleAttrReplace, 200);


    };


});



