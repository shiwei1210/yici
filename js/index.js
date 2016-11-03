
//首页
$(function(){
	// 轮播图
     var myApp = new Framework7();
	 var mySwiper = myApp.swiper('.swiper-container', {
		      pagination:'.swiper-pagination',
		      autoplay:1000,
		      autoplayDisableOnInteraction:false
		});
		
	//footer部分的图标切换
	$(".index-footer>dl").on("click",function(){
		 var _span = $(this).find("span");
		 if(!_span.hasClass("active")){
		 	 _span.addClass("active").parent().parent("dl").siblings().find("span").removeClass("active");
		 }		 
	})
})
