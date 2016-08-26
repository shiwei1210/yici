$(function(){
	
	$(".sse_query_menu > ul > li:first-child").removeClass("li_cur_1");
	/*$(".sse_query_menu > ul > li:first-child >a").removeClass("a_cur_1");*/
	$(".sse_query_menu > ul > li:first-child").css("background","none");
	$(".sse_query_thi_menu li").css("background","none");
	

	
	$(".sse_query_menu > ul > li > a").click(function(e){
		
			$(this).parent("li").addClass("li_cur_1").siblings("li").removeClass("li_cur_1");
			$(this).addClass("a_cur_1").siblings().removeClass("a_cur_1");
			$(this).parent("li").children(".sse_query_sec_menu").find("li").removeClass("li_cur_2");
			$(this).parent("li").children(".sse_query_sec_menu").find("a").removeClass("a_cur_2");
			
			var zi = $(this).parent("li").find(".sse_query_sec_menu");
			
			if(zi.is(":hidden")){
				zi.stop(true,true).slideDown(300).closest('li').siblings().find(".sse_query_sec_menu").stop(true,true).slideUp(300);
				zi.find("a").addClass("a_cur_2");
			}else{
				zi.stop(true,true).slideUp(300);
			}
			
		});
		
    $(".sse_query_sec_menu > li > a").click(function(){
			
			
			$(this).addClass("a_cur_2").parent("li").addClass("li_cur_2").end().parent("li").siblings().removeClass("li_cur_2");
			$(this).parents(".sse_query_menu ul li").removeClass("li_cur_1");
			$(this).siblings(".sse_query_thi_menu").find("a").addClass("a_cur_3");
			
			
			var sun = $(this).siblings(".sse_query_thi_menu");
			
			if(sun.is(":hidden")){
				sun.stop(true,true).slideDown(300);
			}else{
				sun.stop(true,true).slideUp(300);
		}
			
	});
    

});

window.onscroll=function(){ 
	if ($(document).scrollTop() > 650) 
	{ 
		$(".sse_query_menu").addClass('villafloat'); 
	}else{ 
		$(".sse_query_menu").removeClass('villafloat'); 
	} 
};





















                    