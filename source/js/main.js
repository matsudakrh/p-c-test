var app = angular.module('SvgApp',[]);
app.controller('SvgController', function () {

    var self = this;
    var svgWidth = 514;
    var svgHeight = 514;
    var centerX = svgWidth / 2;
    var centerY = svgHeight / 2;
    var svgId = 'svgBox';
    var targetCircles, targetRects, targetStars, targetTexts, setTexts;
    var svgContainer = document.getElementById('svgContainer');
    var resultSpace = document.getElementById('resultArea');
    var resultCode;


    var svgBox = Snap('#' + svgId).attr({
        width: svgWidth,
        height: svgHeight,
        viewBox: '0,0,' + svgWidth + ',' + svgHeight
    });



    /* --------- 丸ここから ------------- */


    self.circleList = [];

    var circleProperty = function () {

        this.circleR = 20;
        this.circleCx = centerX;
        this.circleCy = centerY;
        this.circleBC =  "#000000";
        this.circleBW = 4;
        this.circleFill = "#000000";
        this.circleOpacity = 1;

    };


    self.createCircle = function () {

        var circleP = new circleProperty();

        self.circleList.push(circleP);

        self.circles = svgBox.circle()
            .attr({
                r: circleP.circleR,
                cx: circleP.circleCx,
                cy: circleP.circleCy,
                fill: circleP.circleFill,
                stroke: circleP.circleBC,
                strokeWidth: circleP.circleBW,
                opacity: circleP.circleOpacity,
                class: 'circleSvg',
                id: "circle" + (self.circleList.length - 1)
            })
            .drag();

    };


    self.circleAttrReplace = function (num) {

            targetCircles = svgBox.selectAll('.circleSvg');
            targetCircles[num].attr({
                r: self.circleList[num].circleR,
                fill: self.circleList[num].circleFill,
                stroke: self.circleList[num].circleBC,
                strokeWidth: self.circleList[num].circleBW,
                opacity: self.circleList[num].circleOpacity
            });

    };

    self.circleDelete = function (num) {
        self.circleList.splice(num, 1);
        targetCircles = svgBox.selectAll('.circleSvg');
        targetCircles[num].remove();
    };


    /* --------- 丸ここまで ------------- */



    /* --------- 四角ここから ------------- */

    self.rectList = [];


    var rectProperty = function () {

        this.rectW = 40;
        this.rectH = 40;
        this.rectX = centerX;
        this.rectY = centerY;
        this.rectFill = "#000000";
        this.rectBW = 4;
        this.rectBC = "#000000";
        this.rectOpacity = 1;
        this.rectDegr = 0;

    };

    self.createRect = function () {

        var rectP = new rectProperty();

        self.rectList.push(rectP);

        self.rects = svgBox.rect()
            .attr({
                width: rectP.rectW,
                height: rectP.rectH,
                x: rectP.rectX,
                y: rectP.rectY,
                fill: rectP.rectFill,
                stroke: rectP.rectBC,
                strokeWidth: rectP.rectBW,
                opacity: rectP.rectOpacity,
                class: 'rectSvg',
                id: "rect" + (self.rectList.length - 1)
            })
            .drag();


    };

    self.rectAttrReplace = function (num) {

            targetRects = svgBox.selectAll('.rectSvg');

            targetRects[num].attr({
                width: self.rectList[num].rectW,
                height: self.rectList[num].rectH,
                fill: self.rectList[num].rectFill,
                stroke: self.rectList[num].rectBC,
                strokeWidth: self.rectList[num].rectBW,
                opacity: self.rectList[num].rectOpacity
            });

    };

    self.rectDelete = function (num) {

        self.rectList.splice(num, 1);
        targetRects = svgBox.selectAll('.rectSvg');
        targetRects[num].remove();

    };

    /* --------- 四角ここまで ------------- */


    /* --------- 星ここから ------------- */

    self.starList = [];

    var starProperty = function () {

        this.star = '★';
        this.fontSize = 60;
        this.starC= '#000000';
        this.starOpacity = 1;
        this.textAnchor = 'middle';

    };

    self.createStar = function () {

        var starP = new starProperty();

        self.starList.push(starP);

        self.stars = svgBox.text(centerX, centerY, '★')
            .attr({
                fontSize: starP.fontSize + 'px',
                fill: starP.starC,
                opacity: starP.starOpacity,
                textAnchor: starP.textAnchor,
                class: 'starSvg',
                id: 'star' + (self.starList.length - 1)
            })
            .drag();
    };

    self.starAttrReplace = function (num) {

            targetStars = svgBox.selectAll('.starSvg');
            targetStars[num].attr({
                fontSize: self.starList[num].fontSize + 'px',
                fill: self.starList[num].starC,
                opacity: self.starList[num].starOpacity
            });

    };

    self.starDelete = function (num) {
        self.starList.splice(num, 1);
        targetStars = svgBox.selectAll('.starSvg');
        targetStars[num].remove();
    };


    /* --------- 星ここまで ------------- */

    /* --------- テキストここから ------------- */

    self.textList = [];

    var textProperty = function () {
        this.valText = 'テキスト';
        this.fontC = '#000000';
        this.fontSize = 30;
        this.textOpacity = 1;
        this.textAnchor = 'middle';
        this.class = 'plainText';
    };

    self.insertText = function () {

        var textP = new textProperty();

        self.textList.push(textP);

        self.texts = svgBox.text(centerX, centerY, textP.valText)
            .attr({
                fill: textP.fontC,
                fontSize: textP.fontSize,
                opacity: textP.textOpacity,
                textAnchor: textP.textAnchor,
                class: textP.class,
                id: 'text' + (self.textList.length - 1)
            })
            .drag();

    };

    /* エスケープ処理 */

    function escapeHtml(str) {

        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#39;');
        return str;

    }

    self.textAttrReplace = function (num) {

            setTexts = document.getElementsByClassName('plainText');
            setTexts[num].innerHTML = escapeHtml(self.textList[num].valText);

            targetTexts = svgBox.selectAll('.plainText');

            targetTexts[num].attr({
                fontSize: self.textList[num].fontSize + 'px',
                fill: self.textList[num].fontC,
                opacity: self.textList[num].textOpacity
            });

    };

    self.textDelete = function (num) {

        self.textList.splice(num, 1);
        targetTexts = svgBox.selectAll('.plainText');
        targetTexts[num].remove();

    };


    /* --------- テキストここまで ------------- */

    /* --------- コードタブでsvgコードを表示 ------------- */

    self.distResult = function () {

        resultCode = svgContainer.innerHTML;
        resultSpace.innerText = resultCode;

    };

});