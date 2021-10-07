$.fn.autotype = function() {
      var _this=$(this);
      var str=_this.html();
      str=str.replace(/(\s){2,}/g,"$1");
        var index = 0;
        $(this).html('');
		var zidongTOP = setInterval(function () {
			  $('html,body').animate({scrollTop: document.getElementsByTagName('BODY')[0].scrollHeight}, 500);
			},500);
        var timer = function() {
            var args=arguments;
            var current = str.slice(index, index+1);
            // html标签完整输出,如：<p>
            if (current == '<'){
                index = str.indexOf('>', index) + 1;
            }
            else{
            index++;
            }
            if (index < str.length-1){
                _this.html(str.substring(0, index) + (index & 1 ? '_' : ''));         				
            }else{
                _this.html(str.substring(0, index));
                clearTimeout(timer);
				clearInterval(zidongTOP);
            };
            setTimeout(args.callee,150)
        };
        setTimeout(timer,1000);
    };
    $("#autowen").autotype();
    //$("title").autotype();

$(function(){
  player = document.getElementById('player');
  $('.playico').click(function(e) {
	if(player.paused){
	   $(this).addClass('playing');
       player.play();
	}else{
	  $(this).removeClass('playing');
	  player.pause();
	}
  });
});