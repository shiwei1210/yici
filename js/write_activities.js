$(document).ready(function() {
	// 背景色修改
	$('.color_bg a').click(function(event) {
		$(this).addClass('cur').siblings().removeClass('cur');
	});
	// 选择会议？培训
	$('.active_class a').click(function(event) {
		$(this).addClass('cur').siblings().removeClass('cur');
	});


	//时间选择  
	   function picker(id){ //参数为 所要展示的input的id
	   	//先清除选择器容器的其他日历。
	   	var str = '<div class="picker-date-container-cancel">取消</div><div class="picker-date-container-sure">确定</div>';
	   	$("#picker-date-container").html(str);
	   	
	   	var _id = '#'+id;
	   	
	   	var myApp = new Framework7();	
	    var today = new Date(); 
		var pickerInline = myApp.picker({
		    input: _id,
		    container: "#picker-date-container",
		    toolbar: false,
		    rotateEffect: true,		 
		    value: [today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
 		    onChange: function (picker, values, displayValues) {
		        var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
		        if (values[1] > daysInMonth) {
		            picker.cols[1].setValue(daysInMonth);
		        }
		    },
 		    formatValue: function (p, values, displayValues) {
		        return   values[0] + ':' + values[1];
		    },		 
		    cols: [
		        // Hours
		        {  
		        	textAlign: 'left',
		            values: (function () {
		                var arr = [];
		                for (var i = 0; i <= 23; i++) { arr.push(i); }
		                return arr;
		            })(),
		        },
		        // Divider
		        {
		            divider: true,
		            content: ' : '
		        },
		        // Minutes
		        {  
		            values: (function () {
		                var arr = [];
		                for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
		                return arr;
		            })(),
		        }
		    ]
		});
		//滚动条滚到最底部
		 /*document.documentElement.scrollTop=document.body.clientHeight; 
         document.body.scrollTop=document.body.clientHeight;*/
	  } ;
	  
	  //开始日期的选择		
		$(".start_date").on("click",function(){
			$("#picker-date-container").show().removeClass().addClass("pick001"); //class是为了区分，日历作用于哪个input。			
			picker("place_start_date");
			return false;
		});
		//结束日期的选择	
		$(".end_date").on("click",function(){
			$("#picker-date-container").show().removeClass().addClass("pick002"); //class是为了区分，日历作用于哪个input。
			picker("place_end_date");
			return false;
		});
		// 点击取消  取消当前日期的选择
		$(document).on("click",".picker-date-container-cancel",function(){
			var str = '<div class="picker-date-container-cancel">取消</div><div class="picker-date-container-sure">确定</div>';
			$(this).parent().html(str);
			$("body").css("opacity","1");
			if($("#picker-date-container").hasClass("pick001")){
				$(".start_date").val("");
			}else{
				$(".end_date").val("");
			}
		});
		// 点击确定  选中当前日期
		$(document).on("click",".picker-date-container-sure",function(){
			var str = '<div class="picker-date-container-cancel">取消</div><div class="picker-date-container-sure">确定</div>';
			$(this).parent().html(str);
		});
});