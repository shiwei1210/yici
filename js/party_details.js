$(function(){	
	//报名人数，显示最近4个报名人的头像，多余的用省略号表示
	$(".part-infor-person>img").each(function(){
		var _index = $(this).index();
	    if(_index>3){
	    	 $(this).remove();
	    	 var _val = $(".part-infor-person-em").css("display");
	    	 if(_val=="none"){
	    	 	 $(".part-infor-person-em").css("display","block");
	    	 }
	    }
	});
	//实现滚动条无法滚动
	var mo=function(e){e.preventDefault();};

	/***禁止滑动***/
	function stop(){
	        document.body.style.overflow='hidden';        
	        document.addEventListener("touchmove",mo,false);//禁止页面滑动
	}
	
	/***取消滑动限制***/
	function move(){
	        document.body.style.overflow='';//出现滚动条
	        document.removeEventListener("touchmove",mo,false);        
	}
	
	//点击 “我来报名”，出现弹出框
	$(".part-infor-body-top").click(function(){	
		$(".party-mengceng").show();
		$(".party-mengceng-box").show();
		stop();
	})
	//选择［暂时不］弹框消失，留在此页
	$(".party-mengceng-no").on("click",function(){
		$(".party-mengceng").hide();
		$(".party-mengceng-box").hide();
		move();
	})
})
