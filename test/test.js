define(function(require, exports, module){

var $ = require('jquery/1.11.0/jquery.cmd.min');
var util = require('../src/util.cmd');


test('throttle', function(){
  stop();
  var count = 0;
  
  var fn = function(){
    ++count;
    equal( count, 1, "only excute one time" );
    start();
  }
   
  var fnProxy = util.throttle(fn, 300);
  
  for(var i = 0; i < 100; i++){
     setTimeout(fnProxy, 0);
  } 
 
});

test('getImg', function(){
  stop(2);
  util.getImg('http://wimg.mangocity.com/img/v/20130606/banner_1.jpg', {
    loadCallback: function(){
      $("#qunit-fixture").html(this);
      equal( $("#qunit-fixture").children('img').length, 1, "img load successly" );
      start();
    }
  });
  util.getImg('wwwwwwwwwwww', {
    loadCallback: function(){
      $("#qunit-fixture").html(this);
    },
    errorCallback: function(){
      $("#qunit-fixture").html(this);
      equal( $("#qunit-fixture").children('img').length, 0, "img load errorly" );
      start();
    }
  });
});

test('equalRatio', function(){
 stop();
  util.getImg('http://wimg.mangocity.com/img/v/20130606/banner_1.jpg', {
    loadCallback: function(){
      var origin = {};
      origin.width = this.width;
      origin.height = this.height;
      var options = {width: 400, height: 400};
      
      var img = util.equalRatio(this, options);
      var info = {};
      info.width = parseFloat($(img).width());
      info.height = parseFloat($(img).height());
      
      info.marginLeft = parseFloat($(img).css('marginLeft').replace('px', ''));
      info.marginTop = parseFloat($(img).css('marginTop').replace('px', ''));
      
      deepEqual( {width: Math.round(info.width + (info.marginLeft * 2)), height: Math.round(info.height + (info.marginTop * 2))}, options, "ratio successly" );
      start();
    }
  });
  
});

})