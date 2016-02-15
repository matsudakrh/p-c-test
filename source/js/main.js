var app = angular.module('SvgApp',[]);
app.controller('SvgController', function () {

    'use strict';

    var self = this;

    var svgWidth = 514;
    var svgHeight = 514;
    var centerX = svgWidth / 2;
    var centerY = svgHeight / 2;
    var SVG_ID = 'svgBox';
    var BG_ID = 'BGPolygon';
    var CIRCLE_CLASS = 'circleSvg';
    var RECT_CLASS = 'rectSvg';
    var MARK_CLASS = 'markSvg';
    var TEXT_CLASS = 'plainText';


    // snapを通さない時など
    var JSTarget = {
        svgBox : document.getElementById(SVG_ID),
        svgContainer : document.getElementById('svgContainer'),
        resultSpace : document.getElementById('resultArea'),
        saveBtn : document.getElementById('download'),
        canvas : document.getElementById("canvas"),
        bgColorInput : document.getElementById("bgColorInput"),
        body : document.body,
        element : null
    };


    /* --------------- pngで保存用canvasの初期化 ---------------- */

    JSTarget.canvas.setAttribute('width', svgWidth);
    JSTarget.canvas.setAttribute('height', svgHeight);

    var ctx = JSTarget.canvas.getContext("2d");

    /* --------------- canvasの初期化ここまで ---------------- */


    /* ------------------ svg領域の初期化 ------------------ */

    var svgBox = Snap('#' + SVG_ID).attr({
        xmlns: 'http://www.w3.org/2000/svg',
        width: svgWidth,
        height: svgHeight,
        viewBox: '0,0,' + svgWidth + ',' + svgHeight
    });

    /* ------------------ 初期化ここまで ------------------ */


    /* ------------ 背景用polygon ---------- */

    var preferenceP = function () {
        this.BC = '#ffffff';
        this.polygonOpacity = 1;
    };

    /* ----------------- localStorageを参照 -------------------- */

    var svgData = localStorage.getItem('source');
    var preferencePJson = localStorage.getItem('preference');
    var circleListJson = localStorage.getItem('circleList');
    var rectListJson = localStorage.getItem('rectList');
    var markListJson = localStorage.getItem('markList');
    var textListJson = localStorage.getItem('textList');


    if ( svgData ) {
        JSTarget.svgBox.innerHTML = svgData;
    }

    if ( preferencePJson ) {
        self.preferenceP = JSON.parse(preferencePJson);
    } else {
        self.preferenceP = new preferenceP();
    }

    if ( circleListJson ) {
        self.circleList = JSON.parse(circleListJson);
    } else {
        self.circleList = [];
    }

    if ( rectListJson ) {
        self.rectList = JSON.parse(rectListJson);
    } else {
        self.rectList = [];
    }

    if ( markListJson ) {
        self.markList = JSON.parse(markListJson);
    } else {
        self.markList = [];
    }

    if ( textListJson ) {
        self.textList = JSON.parse(textListJson);
    } else {
        self.textList = [];
    }

    /* -------------- localStorage参照ここまで --------- */


    /* --------------------- 設定 --------------------------- */



    if ( svgBox.selectAll('polygon').length <= 0 ) {

        var polygonTag = svgBox.polygon('0,0 ' + svgWidth +',0 ' + svgWidth + ',' + svgHeight + ' 0,' + svgHeight);

        polygonTag.attr({
            fill : self.preferenceP.BC,
            opacity: self.preferenceP.polygonOpacity,
            id : BG_ID
        });

        svgBox.append(polygonTag);

    }


    self.preferenceReplace = function () {

        Snap('#' + BG_ID).attr({
            fill : self.preferenceP.BC,
            opacity: self.preferenceP.polygonOpacity
        });
        Snap('#previewPreference').attr({
            fill : self.preferenceP.BC,
            opacity: self.preferenceP.polygonOpacity
        });

    };



    self.preferenceReplace(); //ロード時の初期化


    /* ---------------- 設定ここまで --------------- */

    /* --------- 丸ここから ------------- */


    var circleProperty = function () {

        this.circleR = 20;
        this.circleBC =  "#000000";
        this.circleBW = 0;
        this.circleFill = "#000000";
        this.circleOpacity = 1;

    };


    var circlePropertyObject = {
        circleR: 20,
        circleBC: "#000000",
        circleBW: 0,
        circleFill: "#000000",
        circleOpacity: 1
    };

    self.createCircle = function () {

        var circleP = new circleProperty();

        circleP.circleR = circlePropertyObject.circleR;
        circleP.circleCx = circlePropertyObject.circleCx;
        circleP.circleCy = circlePropertyObject.circleCy;
        circleP.circleBC = circlePropertyObject.circleBC;
        circleP.circleBW = circlePropertyObject.circleBW;
        circleP.circleFill = circlePropertyObject.circleFill;
        circleP.circleOpacity = circlePropertyObject.circleOpacity;


        self.circleList.push(circleP);

        self.circles = svgBox.circle()
            .attr({
                r: circlePropertyObject.circleR,
                cx: centerX,
                cy: centerY,
                fill: circlePropertyObject.circleFill,
                stroke: circlePropertyObject.circleBC,
                strokeWidth: circlePropertyObject.circleBW,
                opacity: circlePropertyObject.circleOpacity,
                class: CIRCLE_CLASS
            });

    };


    self.circleAttrReplace = function (num) {

        if(
            typeof self.circleList[num].circleR == 'string' ||
            self.circleList[num].circleR < 1 ||
            typeof self.circleList[num].circleBW == 'string' ||
            self.circleList[num].circleBW < 0
        ){
            return;
        }

        var targetCircles = svgBox.selectAll('.' + CIRCLE_CLASS);

        targetCircles[num].attr({
            r: self.circleList[num].circleR,
            fill: self.circleList[num].circleFill,
            stroke: self.circleList[num].circleBC,
            strokeWidth: self.circleList[num].circleBW,
            opacity: self.circleList[num].circleOpacity
        });


        circlePropertyObject = {
            circleR: self.circleList[num].circleR,
            circleBC: self.circleList[num].circleBC,
            circleBW: self.circleList[num].circleBW,
            circleFill: self.circleList[num].circleFill,
            circleOpacity: self.circleList[num].circleOpacity
        };

    };

    self.circleDelete = function (num) {
        self.circleList.splice(num, 1);
        var targetCircles = svgBox.selectAll('.' + CIRCLE_CLASS);
        targetCircles[num].remove();
    };


    /* --------- 丸ここまで ------------- */



    /* --------- 四角ここから ------------- */




    var rectProperty = function () {

        this.rectW = 40;
        this.rectH = 40;
        this.rectFill = "#000000";
        this.rectBW = 0;
        this.rectBC = "#000000";
        this.rectOpacity = 1;

    };

    var rectPropertyObject = {

        rectW: 40,
        rectH: 40,
        rectFill: "#000000",
        rectBw: 0,
        rectBC: "#000000",
        rectOpacity: 1

    };

    self.createRect = function () {

        var rectP = new rectProperty();

        rectP.rectW = rectPropertyObject.rectW;
        rectP.rectH = rectPropertyObject.rectH;
        rectP.rectFill = rectPropertyObject.rectFill;
        rectP.rectBW = rectPropertyObject.rectBW;
        rectP.rectBC = rectPropertyObject.rectBC;
        rectP.rectOpacity = rectPropertyObject.rectOpacity;

        self.rectList.push(rectP);

        self.rects = svgBox.rect()
            .attr({
                width: rectPropertyObject.rectW,
                height: rectPropertyObject.rectH,
                x: centerX,
                y: centerY,
                fill: rectPropertyObject.rectFill,
                stroke: rectPropertyObject.rectBC,
                strokeWidth: rectPropertyObject.rectBW,
                opacity: rectPropertyObject.rectOpacity,
                class: RECT_CLASS
            });


    };

    self.rectAttrReplace = function (num) {


        if(
            typeof self.rectList[num].rectW == 'string'||
            self.rectList[num].rectW < 10 ||
            typeof self.rectList[num].rectH == 'string' ||
            self.rectList[num].rectH < 10 ||
            typeof self.rectList[num].rectBW == 'string' ||
            self.rectList[num].rectBW < 0
        ){
            return;
        }

        var targetRects = svgBox.selectAll('.' + RECT_CLASS);

        targetRects[num].attr({

            width: self.rectList[num].rectW,
            height: self.rectList[num].rectH,
            fill: self.rectList[num].rectFill,
            stroke: self.rectList[num].rectBC,
            strokeWidth: self.rectList[num].rectBW,
            opacity: self.rectList[num].rectOpacity
        });

        rectPropertyObject = {
            rectW: self.rectList[num].rectW,
            rectH: self.rectList[num].rectH,
            rectFill: self.rectList[num].rectFill,
            rectBC: self.rectList[num].rectBC,
            rectBW: self.rectList[num].rectBW,
            rectOpacity: self.rectList[num].rectOpacity

        }

    };

    self.rectDelete = function (num) {

        self.rectList.splice(num, 1);
        var targetRects = svgBox.selectAll('.' + RECT_CLASS);
        targetRects[num].remove();

    };

    /* --------- 四角ここまで ------------- */


    /* --------- 記号ここから ------------- */


    var markProperty = function () {

        this.mark = '★';
        this.fontSize = 60;
        this.markC= '#000000';
        this.markOpacity = 1;

    };

    var markPropertyObject = {

        mark: '★',
        fontSize: 60,
        markC: '#000000',
        markOpacity: 1

    };


    self.createMark = function () {

        var markP = new markProperty();

        markP.mark = markPropertyObject.mark;
        markP.fontSize = markPropertyObject.fontSize;
        markP.markC = markPropertyObject.markC;
        markP.markOpacity = markPropertyObject.markOpacity;

        self.markList.push(markP);

        self.marks = svgBox.text(centerX, centerY, markP.mark)
            .attr({
                fontSize: markP.fontSize + 'px',
                fill: markP.markC,
                opacity: markP.markOpacity,
                textAnchor: 'middle',
                class: MARK_CLASS
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

        var setMarks = document.getElementsByClassName(MARK_CLASS);
        setMarks[num].innerHTML = escapeHtml(self.markList[num].mark);



        if(
            typeof self.markList[num].fontSize == 'string' ||
            self.markList[num].fontSize < 10
        ){
            return;
        }


        var targetMarks = svgBox.selectAll('.' + MARK_CLASS);

        targetMarks[num].attr({
            fontSize: self.markList[num].fontSize + 'px',
            fill: self.markList[num].markC,
            opacity: self.markList[num].markOpacity
        });

        markPropertyObject = {
            mark: setMarks[num].innerHTML,
            fontSize: self.markList[num].fontSize,
            markC: self.markList[num].markC,
            markOpacity: self.markList[num].markOpacity
        }


    };

    self.markDelete = function (num) {
        self.markList.splice(num, 1);
        var targetMarks = svgBox.selectAll('.' + MARK_CLASS);
        targetMarks[num].remove();
    };


    /* --------- 記号ここまで ------------- */

    /* --------- テキストここから ------------- */


    var textProperty = function () {
        this.valText = 'テキスト';
        this.fontC = '#000000';
        this.fontSize = 30;
        this.textOpacity = 1;
    };

    var textPropertyObject = {
        valText: 'テキスト',
        fontC: '#000000',
        fontSize: 30,
        textOpacity: 1
    };

    self.insertText = function () {

        var textP = new textProperty();

        textP.valText = textPropertyObject.valText;
        textP.fontC = textPropertyObject.fontC;
        textP.fontSize = textPropertyObject.fontSize;
        textP.textOpacity = textPropertyObject.textOpacity;

        self.textList.push(textP);

        self.texts = svgBox.text(centerX, centerY, textP.valText)
            .attr({
                fill: textP.fontC,
                fontSize: textP.fontSize,
                opacity: textP.textOpacity,
                textAnchor: 'middle',
                class: TEXT_CLASS
            });

    };


    self.textAttrReplace = function (num) {

        var setTexts = document.getElementsByClassName(TEXT_CLASS);
        setTexts[num].innerHTML = escapeHtml(self.textList[num].valText);


        if(
            typeof self.textList[num].fontSize == 'string' ||
            self.textList[num].fontSize < 10
        ){
            return;
        }


        var targetTexts = svgBox.selectAll('.' + TEXT_CLASS);

        targetTexts[num].attr({
            fontSize: self.textList[num].fontSize + 'px',
            fill: self.textList[num].fontC,
            opacity: self.textList[num].textOpacity
        });

        textPropertyObject = {

            valText: setTexts[num].innerHTML,
            fontSize: self.textList[num].fontSize,
            fontC: self.textList[num].fontC,
            textOpacity: self.textList[num].textOpacity

        }

    };

    self.textDelete = function (num) {

        self.textList.splice(num, 1);
        var targetTexts = svgBox.selectAll('.' + TEXT_CLASS);
        targetTexts[num].remove();

    };


    /* --------- テキストここまで ------------- */

    /* --------- コードタブでsvgコードを表示 ------------- */

    self.distResult = function () {

        var resultCode = JSTarget.svgContainer.innerHTML;
        JSTarget.resultSpace.innerText = resultCode;

    };



    /* ------------ タブクリックでbodyのスタイル変更 -------------------- */

    self.changeStyle = function (idName) {

        JSTarget.body.id = idName;

    };

    /* ------------------- bodyのスタイル変更ここまで ------------------------ */

    /* ------------------- 要素をドラッグで移動 ------------------ */

    // ドラッグ判定用
    var run = false;

    var mouse = function () {
        this.x = 0;
        this.y = 0;
    };

    JSTarget.svgBox.addEventListener( 'mousedown', function (element) {

        JSTarget.element = element;

        if ( JSTarget.element.id == SVG_ID ) {
            return;
        }

        run = true;

    });

    JSTarget.svgBox.addEventListener( 'mousemove', function () {

        if( run ){


            var svgBoxPoint = JSTarget.svgBox.getBoundingClientRect();

            mouse.x = event.pageX - window.pageXOffset - svgBoxPoint.left; //ブラウザの原点からの距離からscreenCanvasの左のズレをマイナスする
            mouse.y = event.pageY - window.pageYOffset - svgBoxPoint.top;


            // 丸を対象にする
            if ( JSTarget.element.target.tagName == 'circle' ) {
                JSTarget.element.target.setAttribute('cx', mouse.x);
                JSTarget.element.target.setAttribute('cy', mouse.y);
                return;
            }

            // 四角
            if ( JSTarget.element.target.tagName == 'rect' ) {

                // 四角形の真ん中を掴めるように
                JSTarget.element.target.setAttribute( 'x', mouse.x - ( JSTarget.element.target.getAttribute('width') / 2) );
                JSTarget.element.target.setAttribute( 'y', mouse.y - ( JSTarget.element.target.getAttribute('height') / 2) );
                return;

            }

            //　テキストなど
            if ( JSTarget.element.target.tagName == 'text' ) {

                JSTarget.element.target.setAttribute( 'x', mouse.x );
                JSTarget.element.target.setAttribute( 'y', mouse.y );

            }

        }

    });

    // ドラッグ終了判定
    document.addEventListener( 'mouseup', function () {

        run = false;

    });

    /* ---------------- ドラッグここまで ------------------ */

    /* ---------- リセットボタン ----------- */

    self.deleteAll = function () {

        var confirmAnswer = confirm( '編集内容をリセットします。\nよろしいですか？' );

        if ( confirmAnswer ) {

            self.circleList = [];
            self.rectList = [];
            self.markList = [];
            self.textList = [];


            self.preferenceP = new preferenceP();

            Snap('#' + BG_ID).attr({
                fill : self.preferenceP.BC,
                opacity: self.preferenceP.polygonOpacity
            });

            self.preferenceReplace();

            svgBox.selectAll('circle').remove();
            svgBox.selectAll('rect').remove();
            svgBox.selectAll('text').remove();

            localStorage.clear();

            self.distResult();

        }

    };

    /* ------------- リセットボタンここまで --------------- */

    /* ------------- リロードしてもデータを維持出来るようにする --------------- */


    window.addEventListener( 'unload', function () {

        localStorage.setItem( 'source', JSTarget.svgBox.innerHTML );
        localStorage.setItem( 'preference', JSON.stringify(self.preferenceP) );
        localStorage.setItem( 'circleList', JSON.stringify(self.circleList) );
        localStorage.setItem( 'rectList', JSON.stringify(self.rectList) );
        localStorage.setItem( 'markList', JSON.stringify(self.markList) );
        localStorage.setItem( 'textList', JSON.stringify(self.textList) );

        self.imageText = JSTarget.svgContainer.innerHTML;

    });



    /* ----------------- リロード対応ここまで -------------------- */


    /* -------------------- ファイルを保存 ---------------------- */

    self.saveImage = function( fileType, fileName ) {



        if ( typeof Blob == "undefined" ) {
            alert('このブラウザでは保存機能が利用出来ません,\nご了承下さい。');
            return;
        }

        JSTarget.svgContainer = document.getElementById('svgContainer') ;

        var content = JSTarget.svgContainer.innerHTML;

        if( fileType == 'svg' ){

            var blob = new Blob([content], {type: "image/svg+xml"});
            var DOMURL = window.URL || window.webkitURL;
            var blobURL = DOMURL.createObjectURL(blob);

            var a = document.createElement('a');
            a.download = fileName;
            a.href = blobURL;
            a.click();

        } else {

            var DOMURL = window.URL || window.webkitURL || window;
            var img = new Image();
            var svg = new Blob([content], {type: "image/svg+xml;charset=utf-8"});
            var url = DOMURL.createObjectURL(svg);

            img.onload = function() {

                ctx.drawImage(img, 0, 0);
                DOMURL.revokeObjectURL(url);
                url = JSTarget.canvas.toDataURL( ['image/' + fileType] );
                var a = document.createElement('a');
                a.download = fileName;
                a.href = url;
                a.click();

            };

            img.src = url;

        }

    };

    /* ------------------- ファイル保存ここまで -------------------- */

});