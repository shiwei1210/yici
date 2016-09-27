define([], function() {
	//ETF页面加载
	var page = {};
    page.init = function() {
			var self = this;
			for (var j=1;j<=6;j++){
				self.ETFList(j);
			};
			self.pagination();
			self.pagePrevOrNext();
			self.pageGo();
			sessionStorage.setItem("jumpNum_1",1);   //使用于手机页面加载更多时当前页数的控制
			sessionStorage.setItem("jumpNum_2",1);
			sessionStorage.setItem("jumpNum_3",1);
			sessionStorage.setItem("jumpNum_4",1);
			sessionStorage.setItem("jumpNum_5",1);
			sessionStorage.setItem("jumpNum_6",1);
			self.phoneMore();
	};
	page.ETFList = function(j){
			var	table='.etf'+j;
			var etftable=$(table);
			var etftype = j;
		webComm.Pajax.baseRequest("queryETFNewAllInfo.do", {
		      data: {
		      	isPagination:true,
		        type : etftype,
						"pageHelp.pageSize":10,
						"pageHelp.pageCount":50,
						"pageHelp.pageNo":1,
						"pageHelp.beginPage":1,
						"pageHelp.cacheSize":1,
						"pageHelp.endPage":5,
		      },
		      callback: function(dataJson) {
		      	// console.log(data.pageHelp);
		      	var data = dataJson.pageHelp.data;	//获取的ETF数据
		      	var etflist = [];
		        for (var i = 0; i<data.length ; i++) {
		          	var etf ='<tr><td>'+data[i].fundid1+'</td>'+
		   					'<td>'+data[i].etfFullName+'</td>'+
		   					'<td>'+data[i].fundCompName+'</td>'+
		   					'<td>'+data[i].nav+'</td>'+
		   					'<td>'+data[i].tradingDay+'</td>'+
		   					'<td><a href="/disclosure/fund/etflist/detail.shtml?type='+data[i].etftype+'&etfClass=1">详情</a></td><td><a target="_blank" href="http://query.sse.com.cn/etfDownload/downloadETF2Bulletin.do?etfType='+data[i].etftype+'">下载</a></td>'
		   					'</tr>'
		          	etflist.push(etf);
		        };
						etftable.append(etflist);  //添加列表页

						var pageCtrl = [];    //根据页面总数动态生成分页导航
						var	listTotal = dataJson.pageHelp.total;
						var pageTotal = Math.ceil(dataJson.pageHelp.total/10);
						// if(pageTotal==1){
						// 			etftable.parent().next().css("display","none");
						// }else{
							for(var k = 1;k<=pageTotal;k++){
									if(k==1){
										var pagination = "<li class=\"bg\">"+k+"</li>";
									}else{
										var pagination = "<li>"+k+"</li>";
									};
									pageCtrl.push(pagination);
							};
							etftable.parent().next().find(".pagination-page-ul").append(pageCtrl);
							etftable.parent().next().find(".pagination-page-span").append(pageTotal);
						// }
		      }
		  });
	}; //基金查询的接口调用

	//点击切换对应页面
	page.pagination = function(){
			$(".pagination-page-ul").delegate("li","click",function(){
				 var jumpNum = $(this).text();
				 var etftable=$(this).parent().parent().parent().prev().find("table");
				 var etftype = etftable.attr("name");
				 $(this).parent().find("li").removeClass("bg");
				 $(this).addClass("bg");
				//  etftable.html("<tr class=\"maket-tab-tr\"><td>基金代码</td><td>基金名称</td><td>基金管理公司名称</td><td>基金份额净值(元)</td><td>最新公告日期</td><td>详情</td><td>下载</td></tr>");
			 	 webComm.Pajax.baseRequest("queryETFNewAllInfo.do", {
						 data: {
							 isPagination:true,
							 type : etftype,
							 "pageHelp.pageSize":10,
							 "pageHelp.pageCount":50,
							 "pageHelp.pageNo":1,
							 "pageHelp.beginPage":jumpNum,
							 "pageHelp.cacheSize":1,
							 "pageHelp.endPage":5,
						 },
						 callback: function(dataJson) {
							 // console.log(data.pageHelp);
							 var data = dataJson.pageHelp.data;	//获取的ETF数据
							 var etflist = [];
							 var navigator = "<tr class=\"maket-tab-tr\"><td>基金代码</td><td>基金名称</td><td>基金管理公司名称</td><td>基金份额净值(元)</td><td>最新公告日期</td><td>详情</td><td>下载</td></tr>";
               etflist.push(navigator);
							 for (var i = 0; i<data.length ; i++) {
									 var etf ='<tr><td>'+data[i].fundid1+'</td>'+
									 '<td>'+data[i].etfFullName+'</td>'+
									 '<td>'+data[i].fundCompName+'</td>'+
									 '<td>'+data[i].nav+'</td>'+
									 '<td>'+data[i].tradingDay+'</td>'+
									 '<td><a href="/disclosure/fund/etflist/detail.shtml?type='+data[i].etftype+'&etfClass=1">详情</a></td><td><a target="_blank" href="http://query.sse.com.cn/etfDownload/downloadETF2Bulletin.do?etfType='+data[i].etftype+'">下载</a></td>'
									 '</tr>'
									 etflist.push(etf);
							 };
							//  etftable.html("");
							 etftable.html(etflist);  //添加列表页
						 }
				 });
			})
		};
		//点击切换上一页或者下一页
		page.pagePrevOrNext = function(){
				$(".pagination-page-left").find("a").click(function(){
					 var thisPageNum = $(this).parent().find(".pagination-page-ul .bg").text();
					 var pervORnext = $(this).text();  //判断上一页还是下一页
					 $(this).parent().find(".pagination-page-ul li").each(function(index){
						  allPagenum = index+1;
					 })
					 if(pervORnext=="<"){
						 var jumpNum = thisPageNum*1-1;
						 if(jumpNum==0){                          //判断上一页是否为0
							 return false;
						 }
						 $(this).parent().find(".pagination-page-ul .bg").addClass("sign_bg").removeClass("bg");    //点击处背景样式的控制
						 $(this).parent().find(".pagination-page-ul .sign_bg").prev().addClass("bg");
						 $(this).parent().find(".pagination-page-ul li").removeClass("sign_bg");
					 }else{
						 var jumpNum = thisPageNum*1+1;      //判断是否超过总页数
						 if(jumpNum>allPagenum){
							 return false;
						 }
						 $(this).parent().find(".pagination-page-ul .bg").addClass("sign_bg").removeClass("bg");
					   $(this).parent().find(".pagination-page-ul .sign_bg").next().addClass("bg");
					   $(this).parent().find(".pagination-page-ul li").removeClass("sign_bg");
					 }
					 var etftable=$(this).parent().parent().prev().find("table");
					 var etftype = etftable.attr("name");
					//  etftable.html("<tr class=\"maket-tab-tr\"><td>基金代码</td><td>基金名称</td><td>基金管理公司名称</td><td>基金份额净值(元)</td><td>最新公告日期</td><td>详情</td><td>下载</td></tr>");
				 	 webComm.Pajax.baseRequest("queryETFNewAllInfo.do", {
							 data: {
								 isPagination:true,
								 type : etftype,
								 "pageHelp.pageSize":10,
								 "pageHelp.pageCount":50,
								 "pageHelp.pageNo":1,
								 "pageHelp.beginPage":jumpNum,
								 "pageHelp.cacheSize":1,
								 "pageHelp.endPage":5,
							 },
							 callback: function(dataJson) {
								 // console.log(data.pageHelp);
								 var data = dataJson.pageHelp.data;	//获取的ETF数据
								 var etflist = [];
								 var navigator = "<tr class=\"maket-tab-tr\"><td>基金代码</td><td>基金名称</td><td>基金管理公司名称</td><td>基金份额净值(元)</td><td>最新公告日期</td><td>详情</td><td>下载</td></tr>";
									etflist.push(navigator);
								 for (var i = 0; i<data.length ; i++) {
										 var etf ='<tr><td>'+data[i].fundid1+'</td>'+
										 '<td>'+data[i].etfFullName+'</td>'+
										 '<td>'+data[i].fundCompName+'</td>'+
										 '<td>'+data[i].nav+'</td>'+
										 '<td>'+data[i].tradingDay+'</td>'+
										 '<td><a href="/disclosure/fund/etflist/detail.shtml?type='+data[i].etftype+'&etfClass=1">详情</a></td><td><a target="_blank" href="http://query.sse.com.cn/etfDownload/downloadETF2Bulletin.do?etfType='+data[i].etftype+'">下载</a></td>'
										 '</tr>'
										 etflist.push(etf);
								 };
								 etftable.html(etflist);  //添加列表页
							 }
					 });
				})
		}

		// 直接进行页面跳转
		page.pageGo = function(){
			 $(".pagination-page-go").click(function(){
					var jumpNum = $(this).prev().find("input").val();
					var etftable=$(this).parent().parent().prev().find("table");
					var etftype = etftable.attr("name");
					$(this).parent().prev().find(".pagination-page-ul li").each(function(index){     //判断总页数
						 allPagenum = index+1;
					})
					if(jumpNum>allPagenum||jumpNum<=0){
						return false;
					}
					$(this).parent().prev().find(".pagination-page-ul li").removeClass("bg");  //动态改变按钮的样式
					$(this).parent().prev().find(".pagination-page-ul li").each(function(index){
						var whatPagenum = index+1;
						if(jumpNum == whatPagenum){
							$(this).addClass("bg");
						}
				 })
					// etftable.html("<tr class=\"maket-tab-tr\"><td>基金代码</td><td>基金名称</td><td>基金管理公司名称</td><td>基金份额净值(元)</td><td>最新公告日期</td><td>详情</td><td>下载</td></tr>");
					webComm.Pajax.baseRequest("queryETFNewAllInfo.do", {
							data: {
								isPagination:true,
								type : etftype,
								"pageHelp.pageSize":10,
								"pageHelp.pageCount":50,
								"pageHelp.pageNo":1,
								"pageHelp.beginPage":jumpNum,
								"pageHelp.cacheSize":1,
								"pageHelp.endPage":5,
							},
							callback: function(dataJson) {
								// console.log(data.pageHelp);
								var data = dataJson.pageHelp.data;	//获取的ETF数据
								var etflist = [];
								var navigator = "<tr class=\"maket-tab-tr\"><td>基金代码</td><td>基金名称</td><td>基金管理公司名称</td><td>基金份额净值(元)</td><td>最新公告日期</td><td>详情</td><td>下载</td></tr>";
								etflist.push(navigator);
								for (var i = 0; i<data.length ; i++) {
										var etf ='<tr><td>'+data[i].fundid1+'</td>'+
										'<td>'+data[i].etfFullName+'</td>'+
										'<td>'+data[i].fundCompName+'</td>'+
										'<td>'+data[i].nav+'</td>'+
										'<td>'+data[i].tradingDay+'</td>'+
										'<td><a href="/disclosure/fund/etflist/detail.shtml?type='+data[i].etftype+'&etfClass=1">详情</a></td><td><a target="_blank" href="http://query.sse.com.cn/etfDownload/downloadETF2Bulletin.do?etfType='+data[i].etftype+'">下载</a></td>'
										'</tr>'
										etflist.push(etf);
								};
								etftable.html(etflist);  //添加列表页
							}
					});
			 })
		 };
		//  手机版加载更多
		page.phoneMore = function(){
			 $(".loading-ct").click(function(){
					// var jumpNum = jumpNum*1+1;
					// sessionStorage.setItem("nowPagenum",jumpNum);
					var etftable=$(this).parent().find("table");
					var whatTab = etftable.attr("name");         //用于判断手机版是哪一个tab进行了加载更多的功能
					if(whatTab==1){
							var jumpNum = sessionStorage.getItem("jumpNum_1");
							jumpNum = jumpNum*1+1;
							sessionStorage.setItem("jumpNum_1",jumpNum);
					}
					if(whatTab==2){
							var jumpNum = sessionStorage.getItem("jumpNum_2");
							jumpNum = jumpNum*1+1;
							sessionStorage.setItem("jumpNum_2",jumpNum);
					}
					if(whatTab==3){
							var jumpNum = sessionStorage.getItem("jumpNum_3");
							jumpNum = jumpNum*1+1;
							sessionStorage.setItem("jumpNum_3",jumpNum);
					}
					if(whatTab==4){
							var jumpNum = sessionStorage.getItem("jumpNum_4");
							jumpNum = jumpNum*1+1;
							sessionStorage.setItem("jumpNum_4",jumpNum);
					}
					if(whatTab==5){
							var jumpNum = sessionStorage.getItem("jumpNum_5");
							jumpNum = jumpNum*1+1;
							sessionStorage.setItem("jumpNum_5",jumpNum);
					}
					if(whatTab==6){
							var jumpNum = sessionStorage.getItem("jumpNum_6");
							jumpNum = jumpNum*1+1;
							sessionStorage.setItem("jumpNum_6",jumpNum);
					}
					var etftype = etftable.attr("name");
					webComm.Pajax.baseRequest("queryETFNewAllInfo.do", {
							data: {
								isPagination:true,
								type : etftype,
								"pageHelp.pageSize":10,
								"pageHelp.pageCount":50,
								"pageHelp.pageNo":1,
								"pageHelp.beginPage":jumpNum,
								"pageHelp.cacheSize":1,
								"pageHelp.endPage":5,
							},
							callback: function(dataJson) {
								// console.log(data.pageHelp);
								var data = dataJson.pageHelp.data;	//获取的ETF数据
								var etflist = [];
								for (var i = 0; i<data.length ; i++) {
										var etf ='<tr><td>'+data[i].fundid1+'</td>'+
										'<td>'+data[i].etfFullName+'</td>'+
										'<td>'+data[i].fundCompName+'</td>'+
										'<td>'+data[i].nav+'</td>'+
										'<td>'+data[i].tradingDay+'</td>'+
										'<td><a href="/disclosure/fund/etflist/detail.shtml?type='+data[i].etftype+'&etfClass=1">详情</a></td><td><a target="_blank" href="http://query.sse.com.cn/etfDownload/downloadETF2Bulletin.do?etfType='+data[i].etftype+'">下载</a></td>'
										'</tr>'
										etflist.push(etf);
								};
								etftable.append(etflist);  //添加列表页
							}
					});
			 })
		 };
    return page;
});
