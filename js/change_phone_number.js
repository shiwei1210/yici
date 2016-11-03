
var wait=59;
	function clickGetYzm(){
	   var spenId = $("#spenId");
	   spenId.html("验证码已发送...");
	  	//睡眠两秒
	  	setTimeout(function countDown(){
			if (wait == 0) {
				spenId.removeAttr("disabled").removeClass('disabled');
				spenId.html("获取验证码");
				wait = 59;
			} else {
			    spenId.attr("disabled", true).addClass('disabled');
			    spenId.html('验证码'+wait+'s');
				wait--;
				setTimeout(function() {
				    countDown();
				},
				1000)
			}
	  	    
	  	},2000);
	}