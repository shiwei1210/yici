define([], function () {
	var app={
		param : {
			p_0 : true,
			p_1 : true,
			p_2 : true,
			p_3 : true,
			p_4 : true,
			p_5 : true
		},
		init : function(){
			var $step0_img = $("#step_0 .phone"),
				$step0_box = $("#step_0 .download_box"),
				$step1_img = $("#step_1 .stepImg"),
				$step1_box = $("#step_1 .con_box"),
				$step2_img = $("#step_2 .stepImg"),
				$step2_box = $("#step_2 .con_box"),
				$step3_img = $("#step_3 .stepImg"),
				$step3_box = $("#step_3 .con_box"),
				$step4_img = $("#step_4 .stepImg"),
				$step4_box = $("#step_4 .con_box"),
				$step5_img = $("#step_5 .hand"),
				$step5_box = $("#step_5 .download_box"),
				height=0,
				scrollTop=0,
				top=0;
			
			function showAnimation(){
				if(app.param.p_1) comRes(1,$step1_box,$step1_img);
				if(app.param.p_2) comRes(2,$step2_box,$step2_img);
				if(app.param.p_3) comRes(3,$step3_box,$step3_img);
				if(app.param.p_4) comRes(4,$step4_box,$step4_img);
				if(app.param.p_5) comRes(5,$step5_box,$step5_img);
			}
			function scr1(){
				$step0_box.css({"transform":"translate(0,0)","opacity":1});
				$step0_img.css({"transform":"translate(0,0)","opacity":1});
				showAnimation();
			}
			scr1();
			$(window).scroll(function(){
				showAnimation();
			});
			function comRes(index,$con,$img){
				top = $('#step_'+index).offset().top;
				scrollTop = $(document).scrollTop();
				height = $(window).height();
				if(top-height+120<scrollTop){
					$con.css({"transform":"translate(0,0)","opacity":1});
					$img.css({"transform":"translate(0,0)","opacity":1});
					app.param['p_'+index] = false;
				}
			}
		}
	};
	return app;
});
