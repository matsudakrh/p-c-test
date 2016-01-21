var app = angular.module('SvgApp',[]);
app.controller('SvgController', function () {

    var self = this;

    var svgWidth = 514;
    var svgHeight = 514;
    var svgId = 'svgBox';

    var centerX = svgWidth / 2;
    var centerY = svgHeight / 2;
    var targetCircles, targetRects, targetStars, targetTexts, setTexts, setStar;
    var body = document.getElementById('circleStyle');
    var svgContainer = document.getElementById('svgContainer');
    var resultSpace = document.getElementById('resultArea');
    var resultCode;


    var svgBox = Snap('#' + svgId).attr({
        xmlns: 'http://www.w3.org/2000/svg',
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
            });

    };


    self.circleAttrReplace = function (num, propertyName, circleP) {

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
            });


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

    self.markList = [];

    var markProperty = function () {

        this.mark = '★';
        this.fontSize = 60;
        this.markC= '#000000';
        this.markOpacity = 1;
        this.markText = '★';
        this.textAnchor = 'middle';

    };

    self.createStar = function () {

        var markP = new markProperty();

        self.markList.push(markP);

        self.marks = svgBox.text(centerX, centerY, markP.markText)
            .attr({
                fontSize: markP.fontSize + 'px',
                fill: markP.markC,
                opacity: markP.markOpacity,
                textAnchor: markP.textAnchor,
                class: 'markSvg',
                id: 'mark' + (self.markList.length - 1)
            });
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

    self.markAttrReplace = function (num) {

        setStar = document.getElementsByClassName('markSvg');
        setStar[num].innerHTML = escapeHtml(self.markList[num].markText);


        targetStars = svgBox.selectAll('.markSvg');
            targetStars[num].attr({
                fontSize: self.markList[num].fontSize + 'px',
                fill: self.markList[num].markC,
                opacity: self.markList[num].markOpacity
            });

    };

    self.markDelete = function (num) {
        self.markList.splice(num, 1);
        targetStars = svgBox.selectAll('.markSvg');
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
            });

    };


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



    /* ------------ タブクリックでスタイル変更 -------------------- */

    self.changeStyle = function (idName) {

        body.id = idName;

    };

    /* ------------------- 要素をドラッグで移動 ------------------ */

    // ドラッグ判定用
    var run = false;


    // 仮変数
    var target = {
        svgBox : document.getElementById('svgBox'),
        element : null
    };


    var mouse = function () {
        this.x = 0;
        this.y = 0;
    };

    target.svgBox.addEventListener( 'mousedown', function (element) {

        target.element = element;

        run = true;

        mouse.x = event.pageX - target.svgBox.offsetLeft; //ブラウザの原点からの距離からscreenCanvasの左のズレをマイナスする
        mouse.y = event.pageY - target.svgBox.offsetTop;


        // 丸を対象にする
        if(target.element.target.getAttribute('cx')){
            target.element.target.setAttribute('cx', mouse.x);
            target.element.target.setAttribute('cy', mouse.y);
            return;
        }

        // 丸以外
        if(target.element.target.getAttribute('x')){

            // 四角形の真ん中を掴めるように
            if(target.element.target.getAttribute('width')){

                target.element.target.setAttribute('x', mouse.x - (target.element.target.getAttribute('width') / 2) );
                target.element.target.setAttribute('y', mouse.y - (target.element.target.getAttribute('height') / 2) );
                return;

            }

            //テキストなど
            target.element.target.setAttribute('x', mouse.x);
            target.element.target.setAttribute('y', mouse.y);

        }

    });

    target.svgBox.addEventListener('mousemove', function (){

        if(run){

            mouse.x = event.pageX - target.svgBox.offsetLeft; //ブラウザの原点からの距離からscreenCanvasの左のズレをマイナスする
            mouse.y = event.pageY - target.svgBox.offsetTop;

            // 丸を対象にする
            if(target.element.target.getAttribute('cx')){
                target.element.target.setAttribute('cx', mouse.x);
                target.element.target.setAttribute('cy', mouse.y);
                return;
            }

            // 丸以外
            if(target.element.target.getAttribute('x')){

                // 四角形の真ん中を掴めるように
                if(target.element.target.getAttribute('width')){

                    target.element.target.setAttribute('x', mouse.x - (target.element.target.getAttribute('width') / 2) );
                    target.element.target.setAttribute('y', mouse.y - (target.element.target.getAttribute('height') / 2) );
                    return;

                }

                //テキストなど
                target.element.target.setAttribute('x', mouse.x);
                target.element.target.setAttribute('y', mouse.y);

            }


        }

    });

    // ドラッグ用処理の無効化
    document.addEventListener('mouseup', function () {
        run = false;
    });


    /* ---------- リセットボタン ----------- */

    self.deleteAll = function () {
        self.circleList.splice(0, self.circleList.length);
        self.rectList.splice(0, self.rectList.length);
        self.markList.splice(0, self.markList.length);
        self.textList.splice(0, self.textList.length);

        svgBox.selectAll('circle').remove();
        svgBox.selectAll('rect').remove();
        svgBox.selectAll('text').remove();



    };


});