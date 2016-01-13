var app = angular.module('SvgApp',[]);
app.controller('SvgController', function () {

    var self = this;
    var svgWidth = 514;
    var svgHeight = 514;
    var centerX = svgWidth / 2;
    var centerY = svgHeight / 2;
    var svgId = 'svgBox';
    var svgContainer = document.getElementById('svgContainer');
    var resultSpace = document.getElementById('resultArea');
    var resultCode;

    var svgBox = Snap('#' + svgId).attr({
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




    self.circleAttrReplace = function (num) {
        var timer = setTimeout(function(){
            var targetCircle = svgBox.selectAll('circle');
            targetCircle[num].attr({
                r: self.circleList[num].circleR,
                fill: self.circleList[num].circleFill,
                stroke: self.circleList[num].circleBC,
                strokeWidth: self.circleList[num].circleBW,
                opacity: self.circleList[num].circleOpacity
            });
        }, 200);
    };

    self.circleDelete = function (num) {
        self.circleList.splice(num, 1);
        var targetCircle = svgBox.selectAll('circle');
        targetCircle[num].remove();
    };



    self.rectList = [];

    self.createRect = function () {
        self.rectList.push({
            rectW: 40,
            rectH: 40,
            rectX: centerX,
            rectY: centerY,
            rectFill: "#000000",
            rectBW: 4,
            rectBC: "#000000",
            rectOpacity: 1,
            rectDegr: 0
        });

        self.rects = svgBox.rect()
            .attr({
                width: self.rectList[self.rectList.length - 1].rectW,
                height: self.rectList[self.rectList.length - 1].rectH,
                x: self.rectList[self.rectList.length - 1].rectX,
                y: self.rectList[self.rectList.length - 1].rectY,
                fill: self.rectList[self.rectList.length - 1].rectFill,
                stroke: self.rectList[self.rectList.length - 1].rectBC,
                strokeWidth: self.rectList[self.rectList.length - 1].rectBW,
                opacity: self.rectList[self.rectList.length - 1].rectOpacity,
                id: "rect" + (self.rectList.length - 1)
            })
            .drag();


    };


    self.rectAttrReplace = function (num) {
        var timer = setTimeout(function(){
            var targetRect = svgBox.selectAll('rect');
            targetRect[num].attr({
                width: self.rectList[num].rectW,
                height: self.rectList[num].rectH,
                fill: self.rectList[num].rectFill,
                stroke: self.rectList[num].rectBC,
                strokeWidth: self.rectList[num].rectBW,
                opacity: self.rectList[num].rectOpacity
            });
        }, 200);
    };

    self.rectDelete = function (num) {
        self.rectList.splice(num, 1);
        var targetRect = svgBox.selectAll('rect');
        targetRect[num].remove();
    };




    self.starList = [];

    self.createStar = function () {
        self.starList.push({
            fontSize: 60,
            starC: '#000000',
            starOpacity: 1
            //starDegr: 0
        });

        self.stars = svgBox.text(centerX, centerY, '★')
            .attr({
                fontSize: self.starList[self.starList.length - 1].fontSize + 'px',
                fill: self.starList[self.starList.length - 1].starC,
                opacity: self.starList[self.starList.length - 1].starOpacity,
                textAnchor: 'middle',
                class: 'starSvg',
                id: 'star' + (self.starList.length - 1)
            })
            .drag();


    };

    self.starAttrReplace = function (num) {

        var timer = setTimeout( function () {
            var targetStar = svgBox.selectAll('.starSvg');
            targetStar[num].attr({
                fontSize: self.starList[num].fontSize + 'px',
                fill: self.starList[num].starC,
                opacity: self.starList[num].starOpacity
            });

        }, 200);
    };

    self.starDelete = function (num) {
        self.starList.splice(num, 1);
        var targetStar = svgBox.selectAll('.starSvg');
        targetStar[num].remove();
    };


    self.textList = [];

    self.insertText = function () {

        self.textList.push({
            valText: 'テキスト',
            fontC: '#000000',
            fontSize: 60,
            textOpacity: 1
        });

        self.texts = svgBox.text(centerX, centerY, self.textList[self.textList.length - 1].valText)
            .attr({
                fill: self.textList[self.textList.length - 1].fontC,
                fontSize: self.textList[self.textList.length - 1].fontSize,
                opacity: self.textList[self.textList.length - 1].textOpacity,
                textAnchor: 'middle',
                class: 'plainText',
                id: 'text' + (self.textList.length - 1)
            })
            .drag();

    };

    self.textAttrReplace = function (num) {

        var timer = setTimeout( function () {


            var setText = document.getElementsByClassName('plainText');
            setText[num].innerHTML = self.textList[num].valText;

            var targetText = svgBox.selectAll('.plainText');

            targetText[num].attr({
                fontSize: self.textList[num].fontSize + 'px',
                fill: self.textList[num].fontC,
                opacity: self.textList[num].textOpacity
            });

        }, 200);
    };

    self.textDelete = function (num) {
        self.textList.splice(num, 1);
        var targetText = svgBox.selectAll('.plainText');
        targetText[num].remove();
    };


    self.distResult = function () {
        resultCode = String(svgContainer.innerHTML);
        resultSpace.innerText = resultCode;
    }

});