$(function(){
	//筛选字段的选择
	      //活动分类  点击选中 再次点击表示取消，可以两者都选择。
	      $(".filter-box-items01>div>span").on("click",function(){
	      	  if($(this).hasClass("active")){
	      	  	 $(this).removeClass("active");
	      	  }else{
	      	  	 $(this).addClass("active");
	      	  }
	      });
	       //活动费用
	       $(".filter-box-items02>div>span").on("click",function(){
	       	   if(!$(this).hasClass("active")){
	       	   	   $(this).addClass("active").siblings().removeClass("active");
	       	   }
	       })
	       //活动类型
	       $(".filter-box-items03>div>span").on("click",function(){
	       	   if(!$(this).hasClass("active")){
	       	   	   $(this).addClass("active").siblings().removeClass("active");
	       	   }
	       })
		    
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
		 
		    value: [today.getFullYear()+"年",today.getMonth(), today.getDate()+"日", today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
		 
		    onChange: function (picker, values, displayValues) {
		        var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
		        if (values[1] > daysInMonth) {
		            picker.cols[1].setValue(daysInMonth);
		        }
		    },		 
		    formatValue: function (p, values, displayValues) {
		        return  values[0] +displayValues[1] + values[2] + '' /*+ values[3] + ':' + values[4]*/;
		    },		 
		    cols: [
		        // Years
		        {
		            values: (function () {
		                var arr = [];
		                for (var i = 1950; i <= 2030; i++) { arr.push(i+"年"); }
		                return arr;
		            })(),
		        },
		        // Months
		        {
		            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
		            displayValues: ('1月 2月 3月 4月 5月 6月 7月 8月 9月 10月 11月 12月').split(' '),
		            textAlign: 'left'
		        },
		        // Days
		        {
		            values:[1+"日",2+"日",3+"日",4+"日",5+"日",6+"日",7+"日",8+"日",9+"日",10+"日",11+"日",12+"日",13+"日",14+"日",15+"日",16+"日",17+"日",18+"日",19+"日",20+"日",21+"日",22+"日",23+"日",24+"日",25+"日",26+"日",27+"日",28+"日",29+"日",30+"日",31+"日"],
		        },        
		        // Space divider
		        {
		            divider: true,
		            content: '  '
		        },       
		        // Divider
		        {
		            divider: true,
		            content: ' '
		        },       
		    ]
		});
		//滚动条滚到最底部
		 document.documentElement.scrollTop=document.body.clientHeight; 
         document.body.scrollTop=document.body.clientHeight;
	  } 
		//开始日期的选择		
		$(".startDate").on("click",function(){
			$("#picker-date-container").show().removeClass().addClass("pick001"); //class是为了区分，日历作用于哪个input。
			picker("picker-date");
		});
		//结束日期的选择	
		$(".endDate").on("click",function(){
			$("#picker-date-container").show().removeClass().addClass("pick002"); //class是为了区分，日历作用于哪个input。
			picker("picker-date01");
		});
		// 点击取消  取消当前日期的选择
		$(document).on("click",".picker-date-container-cancel",function(){
			var str = '<div class="picker-date-container-cancel">取消</div><div class="picker-date-container-sure">确定</div>';
			$(this).parent().html(str);
			if($("#picker-date-container").hasClass("pick001")){
				$(".startDate").val("");
			}else{
				$(".endDate").val("");
			}
		});
		// 点击确定  选中当前日期
		$(document).on("click",".picker-date-container-sure",function(){
			var str = '<div class="picker-date-container-cancel">取消</div><div class="picker-date-container-sure">确定</div>';
			$(this).parent().html(str);
		});
})
