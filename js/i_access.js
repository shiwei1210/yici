$(function(){
	//服装尺寸，饮食习惯的显示和隐藏
	   $(".access-infor-cloth-btn").on("click",function(){
	   	  $(".access-infor-cloth").toggle();
	   });
	   $(".access-infor-food-btn").on("click",function(){
	   	  $(".access-infor-food").toggle();
	   })
	   //服装尺寸，饮食习惯的选择
	   $(".access-infor-cloth-right>span").on("click",function(){
	   	   if(!$(this).hasClass("active")){
	   	   	  $(this).addClass("active").siblings().removeClass("active");
	   	   }
	   });
	   $(".access-infor-food-right>span").on("click",function(){
	   	   if(!$(this).hasClass("active")){
	   	   	  $(this).addClass("active").siblings().removeClass("active");
	   	   }
	   });
	   
	   //支付协议的选择
	   $(".access-pay-top-tip").on("click",function(){
	   	   var _src = $(this).css("backgroundImage") ;
	   	   if(_src.indexOf("un")!=-1){
	   	   	   $(this).css("backgroundImage","url(imgs/agree.png)");
	   	   }else{
	   	   	   $(this).css("backgroundImage","url(imgs/unagree.png)");
	   	   }
	   });
	   //点击 “支付协议” 查看支付协议条款
	   $(".access-pay-top-tip>b").on("click",function(){
	   	    $(".mengceng").css("display","block");
	   	    $(".pay-agreement").css("display","block");
	   	    return false;	   	    
	   });
	   //是否同意"支付协议"的选择
	   $(".pay-agreement-no").on("click",function(){//不同意支付协议
	   	    $(".access-pay-top-tip").css("backgroundImage","url(imgs/unagree.png)");
	   	    $(".mengceng").css("display","none");
	   	    $(".pay-agreement").css("display","none");	   	    
	   });
	   $(".pay-agreement-yes").on("click",function(){//同意支付协议
	   	    $(".access-pay-top-tip").css("backgroundImage","url(imgs/agree.png)");
	   	    $(".mengceng").css("display","none");
	   	    $(".pay-agreement").css("display","none");	   	    
	   })
	   
	   //支付方式的选择
	   $(".access-pay-bottom>span").on("click",function(){
	   	   var _src = $(this).css("backgroundImage") ;
	   	   if(_src.indexOf("no")!=-1){
	   	   	   $(this).css("backgroundImage","url(imgs/yes.png)").siblings().css("backgroundImage","url(imgs/no.png)");
	   	   };
	   })
	
	 //点击确认参加  提交订单
	 $(".access-footer").on("click",function(){
	 	
	 	 $(".tanchuang").css("top","70%").stop().show().delay(2000).fadeOut();
	 })

	 //input框获取焦点时，不让安卓系统把按钮挤上去
	 $('.focus_active').bind('focus',function(){  
            $('.access-footer').css('position','static');  
            //或者$('#viewport').height($(window).height()+'px');  
        }).bind('blur',function(){  
            $('.access-footer').css({'position':'fixed','bottom':'0'});  
            //或者$('#viewport').height('auto');  
        });  
})
