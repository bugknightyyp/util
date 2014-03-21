define("util/1.0.4/util", [ "jquery/1.11.0/jquery.cmd.min" ], function(require, exports, module) {
    var $ = require("jquery/1.11.0/jquery.cmd.min");
    /*
  *等比缩放图片，如果没有指定缩放的高宽，则取img父元素的宽高进行缩放。
  *最终效果是使得图片能等比铺满指定大小的区域。
  *
  */
    var equalRatio = function(img, options) {
        var boxW = options.width || $(img).parent().width() || 0;
        var boxH = options.height || $(img).parent().height() || 0;
        var w = $(img).width() || img.width;
        var h = $(img).height() || img.height;
        if (!(w && h)) {
            throw new Error("access the width or height of image errro：width:" + w + ",height:" + h);
        }
        var scale = 1;
        var css = {};
        if (w / boxW >= h / boxH) {
            //宽度多余
            scale = h / boxH;
            css.height = boxH;
            css.width = w / scale;
            css.marginLeft = -(w / scale - boxW) / 2 + "px";
            css.marginTop = 0;
        } else {
            //高度多余
            scale = w / boxW;
            css.height = h / scale;
            css.width = boxW;
            css.marginTop = -(h / scale - boxH) / 2 + "px";
            css.marginLeft = 0;
        }
        $(img).css(css);
        return img;
    };
    exports.equalRatio = equalRatio;
    /*
  *异步加载图片
  *
  */
    exports.getImg = function(src, options) {
        options = $.extend({
            initCallback: $.noop,
            loadCallback: $.noop,
            errorCallback: $.noop
        }, options || {});
        var img;
        img = new Image();
        img.src = src;
        options.initCallback.call(null);
        if (img.complete) {
            options.loadCallback.call(img);
        } else {
            $(img).load(function() {
                options.loadCallback.call(this);
            }).error(function() {
                options.errorCallback.call(null);
            });
        }
    };
    /*exports.throttle =function( delay ){
		var delay = delay || 100;
		return  function (method, context) {
			if(/\d+/.test( method.tId ) ){
				clearTimeout(method.tId);
			}
				
			method.tId = setTimeout(function(){
				method.call(context);
			}, delay );
			
		}
	};*/
    /*
  *对于密集型调用函数进行阀流
  *
  */
    exports.throttle = function(fn, delay, context) {
        var timer;
        return function() {
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.call(context);
            }, delay);
        };
    };
    /* common ie judge skills 
		var isIE=!!window.ActiveXObject; // all ie
			IE678=!-[1,];//ie 6/7/8
		var isIE6=isIE&&!window.XMLHttpRequest;
		var isIE8=isIE&&!!document.documentMode;//document.documentMode 可以返回7、8、9
	*/
    exports.ie = function() {
        // gte IE10 返回的是 undefined，估计已经不支持这种条件表达式了;
        var undef, v = 5, div = document.createElement("div"), all = div.getElementsByTagName("i");
        while (div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->", all[0]) ;
        return v > 6 ? v : undef;
    }();
    exports.filterURI = function(URI, oStr) {
        //"http://lvyou.mangocity.com/search.shtml?search=0&word=a&type=2", {word:"sss",name:"b"}
        for (var item in oStr) {
            if (URI.indexOf(item + "=") >= 0) {
                URI = URI.replace(new RegExp(item + "=" + "[^&]*", "i"), item + "=" + oStr[item]);
            } else if (URI.indexOf("?") < 0) {
                URI += "?" + item + "=" + oStr[item];
            } else {
                URI += "&" + item + "=" + oStr[item];
            }
        }
        return URI;
    };
    exports.getURIParam = function(URI, str) {
        //"http://lvyou.mangocity.com/search.shtml?search=0&word=a&type=2", "word"
        var aTemp = URI.match(new RegExp(str + "=" + "([^&]*)", "i"));
        return aTemp ? aTemp[1] : aTemp;
    };
});