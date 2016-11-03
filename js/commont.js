$(function(){
	 //点击［返回］按钮
	 $(".left").on("click",function(){
	 	var _val = $(".commont-box>textarea").val();//输入的内容。
	 	if(_val==""){ //如果没写字，则直接返回上一页
	 		window.location.href= "";
	 	}else{  //如果写了字，则出现提示弹框
	 		$(".party-mengceng").show();
	 		$(".party-mengceng-box").show();
	 	}
	 })
	//提示弹框，点击［是］，弹框消失，返回上一页；点击［否］，弹框消失，停留在此页	
	$(document).on("touchstart",".party-mengceng-yes",function(){
	 	window.location.href= "";
	});
	$(document).on("touchstart",".party-mengceng-no",function(){
		$(".party-mengceng").hide();
	 	$(".party-mengceng-box").hide();
	})
	
	//点击 [提交] 按钮
	$(".right").on("click",function(){
		var _val = $(".commont-box>textarea").val();
		if(_val==""){  //如果没写字，则出现提示弹框，持续2-3秒，然后弹框消失，但仍停留在此页
			$(".conten").html("您还未写意见，现在开始吧");	
			$(".tanchuang").stop().show().delay(2000).fadeOut();
		}else{    //如果写了字，点了［发送］，则出现提示弹框，持续2-3秒，弹框消失，并且跳转到上一页
			$(".conten").html("提交成功，请等待审核");
			$(".tanchuang").stop().show().delay(2000).fadeOut(function(){
				window.location.href= "";
			});			
		}			
	})
	
	//字数不能超过200
	$(".commont-box>textarea").on("change",function(){
		var _val = $(this).val().length;
	    if(_val>200){
	    	this.value=this.value.substring(0,200)
	    }
	})
})

