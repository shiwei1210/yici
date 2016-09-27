var _codeIndex=0;//选项坐标
var hq_queryUrl = "http://202.100.166.25:32041";
hq_homeInit();

//把时间日期格式转化成utc格式
function convertDateToUTC(date){
	//return Number(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()))-Number(8 * 3600 * 1000);
	return Number(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()));
}

/**
	比较大小 赋值变色
*/
function Comparative(fir,las){
	var _cls = "";
	if(Number(fir) > Number(las)){
		_cls = "color:red;";
	}else if(Number(fir) < Number(las)){
		_cls = "color:green;";
	}
	return _cls;
}

/**
	时间处理
*/
var dateConvert = function(obj){
	var data = obj.data;
	var _open = obj.open;
	var _last = obj.last;
	//循环处理事件
	for (var i = 0; i < data.line.length; i++) {
		var staTime = data.line[i][0]+'';
		if(staTime.length < 6){
			staTime = '0'+staTime.substring(0,staTime.length-2);
		}else{
			staTime = staTime.substring(0,staTime.length-2);
		}
		var _staDate = data.date + staTime;
		var year = _staDate.substring(0,4);
		var month = _staDate.substring(4,6);
		var day = _staDate.substring(6,8);
		var hour = _staDate.substring(8,10);
		var minute = _staDate.substring(10);

		if(minute != '00'){
			if(minute.indexOf('0') != 0){
				minute = parseInt(Number(minute));
				if (minute <= 9) {
					minute = '0'+minute;
				};
			}else{
				minute = minute.substring(1);
				minute = parseInt(Number(minute));
				if (minute <= 9) {
					minute = '0'+minute;
				};
			}
		}

		data.line[i][0] = year+month+day+fn_hour(hour)+minute;
	};
	if(data.line.length > 0){
		data.line[0][1] = _open;
		data.line[data.line.length-1][1] = _last;
	}

	return data;
}

var fn_hour = function(obj){
	obj = obj + '';
	if(obj.indexOf('0') != 0){
		obj = parseInt(Number(obj)-8);
		if (obj <= 9) {
			obj = '0'+obj;
		};
	}else{
		obj = obj.substring(1);
		obj = parseInt(Number(obj)-8);
		if (obj <= 9) {
			obj = '0'+obj;
		};
	}
	return obj;
}
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/

//初始化 行情首页
function hq_homeInit(){
	var hCodes = "000001_000016_000010_000009_000300";
	window.setInterval(function(){
		snapAjax(hCodes,_codeIndex);
	},15000);
	snapAjax(hCodes,0);

	var isLoad = true;
	$(window).resize(function(){
		if(isLoad){
			snapAjax(hCodes,_codeIndex);
			isLoad = false;
		}
	});
}

function snapAjax(_codeS,_codeIndex){
	//Ajax获取根据参数获取首页行情结果集
	$.ajax({
		type: 'POST',
		dataType: "jsonp",
		url: hq_queryUrl+"/v1/sh1/list/self/"+_codeS,
		jsonp: "callback",
		data:{
			select:'code,name,last,chg_rate,amount,open,prev_close'
		},
		cache:false,
		success: function(resultData){
			var _snap_val = resultData.list;
			var _listdate = resultData.date+"";
				_listdate = dateFormat3(_listdate);
			var _date = resultData.date+""+resultData.time;
				_date = dateFormat2(_date);
			var ul01Arr = [];
			var ul02Arr = [];
			ul01Arr.push("<tr class=\"marketabtr\"><td>代码</td><td>基金简称</td><td>最新价格</td><td>当日跌涨幅</td><td>成交量(亿元)</td></tr>");
			for(var i=0;i<_snap_val.length-1;i++){
				var color ;
				var classs;
				var _fundcode = _snap_val[i][0];//代码
				var _name = _snap_val[i][1];//名称
				var _xj = _snap_val[i][2];//现价
				var _zs = _snap_val[i][6];//昨收
				var _zdf = _snap_val[i][3].toFixed(2)+'';//涨跌幅
				var _cje = _snap_val[i][4];//成交额
				_cje = _cje / 100000000;
				if(_zs != _xj){
					if(_zdf >0){
						_zdf = "+"+_zdf;
						classs = "col_red";
					}else{
						classs = "col_green";
					}
				}else{
					classs = "col_color";
				}
				ul01Arr.push("<tr class=\"can_click\" page='" + i + "' tis='true'><td>"+_fundcode+"</td><td>"+_name+"</td><td id=\"whatstate\" class='" + classs + "'>" + _xj.toFixed(2) + "</td><td class='marketlv "+ classs +" '>" + _zdf + "%</td><td class='" + classs + "' title='成交额'>" + _cje.toFixed(0) + "亿元</td></tr>");
			}
			$("#home_market_data").html(ul01Arr.join(""));
			$("#ul02").html(ul02Arr.join(""));
			var _last = _snap_val[_codeIndex][2];
			var _open = _snap_val[_codeIndex][5];
			var _code = _snap_val[_codeIndex][0];
			var _codeName = _snap_val[_codeIndex][1];
			var _prev_close = _snap_val[_codeIndex][6];
			li_click(_codeS);
			cg_bgStyle(_codeIndex);
			$("._date").html(_date);
			$(".marketsp").html(_listdate+'<i class="sseicon-icon_more"></i>');
			ajax(_code,_last,_open,_codeName,_prev_close);
		}
	})
}

//点击切换
function li_click(_code){

	$("#home_market_data .can_click").click(function(){
		snapAjax(_code,$(this).attr("page"));
		_codeIndex = $(this).attr("page");
 	// 	$(this).toggleClass("cl_bgColor1");
	});
	// $("#ul02 li").click(function(){
	// 	snapAjax(_code,$(this).attr("page"));
	// 	_codeIndex = $(this).attr("page");
	// });
}

function cg_bgStyle(_page){
	$("#home_market_data .can_click").toggleClass("cl_bgColor1");
	$("#home_market_data .can_click").each(function(){
		if($(this).attr("tis")){
			if($(this).attr("page") == _page){
				$(this).addClass("cl_bgColor1");
			}else{
				$(this).addClass("cl_bgColor2");
			}
		}else if($(this).attr("page") == _page){
			$(this).addClass("cl_bgColor1");
			$(this).show();

			if($(this).find("#whatstate").attr("class") == "col_green"){
				$(this).find("#whatstate").removeClass("col_green").addClass("col_green1");
			}else if($(this).find("#whatstate").attr("class") == "col_red"){
				$(this).find("#whatstate").removeClass("col_red").addClass("col_red1");
			}
		}else{
			$(this).addClass("cl_bgColor2");
		}
	});
}

function dateFormat3(_staDate){
	var year = _staDate.substring(0,4);
	var month = _staDate.substring(4,6);
	var day = _staDate.substring(6,8);

	return year+"-"+month+"-"+day;
}

function dateFormat2(_staDate){
		var year = _staDate.substring(0,4);
		var month = _staDate.substring(4,6);
		var day = _staDate.substring(6,8);

		var hour = _staDate.substring(8,_staDate.length - 4);
		var minute = _staDate.substring(_staDate.length - 4,_staDate.length - 2);
		var second = _staDate.substring(_staDate.length - 2);
		return year+"年"+month+"月"+day+"日  "+hour+":"+minute+":"+second;
}

function dateFormat(_staDate){
		var year = _staDate.substring(0,4);
		var month = _staDate.substring(4,6);
		var day = _staDate.substring(6,8);
		var hour = _staDate.substring(8,10);
		var minute = _staDate.substring(10,12);
		var second = _staDate.substring(12);
		return year+"年"+month+"月"+day+"日  "+hour+":"+minute+":"+second;
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 获取日期对象，如果isUTC为true获取 日期的UTC对象，false则获取普通日期对象
 * @param date
 * @param isUTC
 * @returns
 */
function getDateUTCOrNot(date,isUTC){
        if(! (date instanceof String)){
            date+="";
        }
        var dArr = new Array();
        for(var hh=0;hh<5;hh++){
            var numb ;
            if(hh==0){
                numb = Number(date.slice(0,4));
            }
            else {
                numb= Number(date.slice((hh-1)*2+4,hh*2+4));
                };
            dArr.push(numb);
        }
        if(isUTC==false){
            return new Date(dArr[0],dArr[1]-1,dArr[2],dArr[3],dArr[4]);
        }
        var dateUTC = Number(Date.UTC(dArr[0],dArr[1]-1,dArr[2],dArr[3],dArr[4]));//得出的UTC时间

        return dateUTC;
}

//数据补全
function appendTimeMessage(price_trend,volume,data){
    var date=data[data.length-1][0]+"";
    var last_dataTime=getDateUTCOrNot(date,false);
    //股票交易早上最后的时间
    var am_lastTime=new Date(last_dataTime);
    am_lastTime.setHours(1, 30, 0, 0);
    //股票交易下午最后的时间
    var pm_startTime=new Date(last_dataTime);
    pm_startTime.setHours(5, 1, 0, 0);
    var pm_lastTime=new Date(last_dataTime);
    pm_lastTime.setHours(7, 0, 0, 0);
	//如果获取的时间11：:30之前的计算
    if(last_dataTime<am_lastTime){
        var i=last_dataTime;
        i.setMinutes((i.getMinutes()+1));
        for(;i<=am_lastTime;i.setMinutes((i.getMinutes()+1))){
            price_trend.push({x:convertDateToUTC(i)});
            volume.push({x:convertDateToUTC(i)});
        }
        i=pm_startTime;
        for(;i<=pm_lastTime;i.setMinutes((i.getMinutes()+1))){
            price_trend.push({x:convertDateToUTC(i)});
            volume.push({x:convertDateToUTC(i)});
        }
    }else if(last_dataTime<pm_lastTime){    //获取的时间下午13:00之后的计算
        var i;
        if(Number(last_dataTime)==Number(am_lastTime)){
            i=pm_startTime;
        }else{
            i=last_dataTime;
        }
        i.setMinutes((i.getMinutes()+1));
        for(;i<=pm_lastTime;i.setMinutes((i.getMinutes()+1))){
            price_trend.push({x:convertDateToUTC(i)});
            volume.push({x:convertDateToUTC(i)});
        }
    }
}


function ajax(_code,_last,_open,_codeName,_prev_close){
	//Ajax获取根据参数获取结果集
	$.ajax({
		type: 'POST',
		dataType: "jsonp",
		url: hq_queryUrl+"/v1/sh1/line/"+_code,
		data: {
			begin:0,
			end:-1,
			select:'time,price,volume'
		},
		jsonp: "callback",
		cache:false,
		success: function(resultData){
			var dd = resultData;
			var d = dateConvert({
				data:dd,
				last:_last,
				open:_open
			});
			//var data = null;
			var data = d.line;
			//没数据时不显示图表
			if(data.length == 0){
				$('#ticker01').html("<div class='chart_container'></div>");
				return;
			}
			Highcharts.setOptions({
				 global: {
					useUTC: false
				},
				lang:{
				   loading:"加载中",
				   months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
				   noData:"没有数据",
				   numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
				   printChart:"打印图表",
				   resetZoom:"恢复缩放",
				   resetZoomTitle:"恢复图表",
				   shortMonths: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
				   thousandsSep:",",
				   weekdays: ["星期天","星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
				}
			});
			//初始化开------------------------
			var groupingUnits = [[
                    'minute',                         // unit name
                    [1]                             // allowed multiples
			]];
			var avg_pxyAxisMin;//Y轴最小值
			var avg_pxyAxisMax;//Y轴最大值
			var percentageyAxisMin;//Y轴百分比最小
			var percentageyAxisMax;//Y轴百分比最大
			var volume_yAxisMin;//成交量最小
			var volume_yAxisMax;//成交量最大
			var red="#ff0000";
			var blue="#00a800";
			var price_trend = [],
			volume = [],//成交量
			i = 0;
			//图表上的成交量第一条的数据红绿的判断 是根据昨日的收盘价preclose_px 和今日的最新价last_px进行对比
			//同时获取的昨日收盘价  用于涨幅的计算
			var isFirstLineColorflag=true;
			//保存昨收数据
			var yesterdayClose;
			//容错判断
			if(data!=undefined&&data!=null&&data.length==0){
				try{
					failCallback();
				}catch(e){

				}
				return;
			}
			 //今开
			var open_px=data[i][1];
			//昨收
			//var preclose_px=data[i][3];
			var preclose_px=d.prev_close;
			yesterdayClose=preclose_px;
			isFirstLineColorflag=open_px>preclose_px?true:false;
			// split the data set into price_trend and volume
			//数据处理
			for (i; i < data.length; i += 1) {
				var _dates = data[i][0]+"";
				var _hours = _dates.substring(8,10);
				var dateUTC=getDateUTCOrNot(_dates,true);
				var business_amount=data[i][2];
				var columnColor = red;
				if(i==0){//第一笔的 红绿柱 判断依据是根据 今天开盘价与昨日收盘价比较
					if(isFirstLineColorflag==false){
						columnColor = blue;
					}
					avg_pxyAxisMin=data[i][1];
					avg_pxyAxisMax=data[i][1];
					percentageyAxisMin=Number(100*(data[i][1]/yesterdayClose-1));
					percentageyAxisMax=Number(100*(data[i][1]/yesterdayClose-1));
					volume_yAxisMin=data[i][2];
					volume_yAxisMax=data[i][2];
				}else{

					//除了第一笔，其它都是  返回的 last_px 与前一个对比
					if(data[i-1][1]-data[i][1]>0){
						columnColor = blue;
					}
					//business_amount=data[i][2]-data[i-1][2];
				}
				avg_pxyAxisMin=avg_pxyAxisMin>data[i][1]?data[i][1]:avg_pxyAxisMin;
				avg_pxyAxisMax=avg_pxyAxisMax>data[i][1]?avg_pxyAxisMax:data[i][1];
				percentageyAxisMin=percentageyAxisMin>Number(100*(data[i][1]/yesterdayClose-1))?Number(100*(data[i][1]/yesterdayClose-1)):percentageyAxisMin;
				percentageyAxisMax=percentageyAxisMax>Number(100*(data[i][1]/yesterdayClose-1))?percentageyAxisMax:Number(100*(data[i][1]/yesterdayClose-1));
				volume_yAxisMin=volume_yAxisMin>business_amount?business_amount:volume_yAxisMin;
				volume_yAxisMax=volume_yAxisMax>business_amount?volume_yAxisMax:business_amount;
				//将数据放入 price_trend volume 数组中

				price_trend.push({x:dateUTC,y:Number(data[i][1])});
				volume.push({x:dateUTC,y:Number(business_amount),color:columnColor});
			}

			//将剩下的时间信息补全
			appendTimeMessage(price_trend,volume,data);
			//常量本地化
			Highcharts.setOptions({
				global : {
					useUTC : false
				}
			});

			var date;
			if(data.length>0){
				date=data[data.length-1][0]+"";
				var dArr = new Array();
				for(var hh=0;hh<5;hh++){
					var numb ;
					if(hh==0){
						numb = Number(date.slice(0,4));
					}else {
						numb= Number(date.slice((hh-1)*2+4,hh*2+4));
					};
					dArr.push(numb);
				}
			}
			var last_dataTime=new Date(dArr[0],dArr[1]-1,dArr[2],dArr[3],dArr[4]);
			var $reporting = $("#report");
			$reporting.html("");
			 // Create the chart
			var am_startTime=new Date(last_dataTime);
			am_startTime.setHours(1, 30, 0, 0);
			var am_startTimeUTC=convertDateToUTC(am_startTime);
			var am_midTime=new Date(last_dataTime);
			am_midTime.setHours(2, 30, 0, 0);
			var am_midTimeUTC=convertDateToUTC(am_midTime);

			//股票交易早上最后的时间
			var am_lastTime=new Date(last_dataTime);
			am_lastTime.setHours(3, 30, 0, 0);
			var am_lastTimeUTC=convertDateToUTC(am_lastTime);

		   //股票交易下午最后的时间
			var pm_startTime=new Date(last_dataTime);
			pm_startTime.setHours(5, 1, 0, 0);
			var pm_startTimeUTC=convertDateToUTC(pm_startTime);

			var pm_midTime=new Date(last_dataTime);
			pm_midTime.setHours(6, 0, 0, 0);
			var pm_midTimeUTC=convertDateToUTC(pm_midTime);

			var pm_lastTime=new Date(last_dataTime);
			pm_lastTime.setHours(7, 0, 0, 0);
			var pm_lastTimeUTC=convertDateToUTC(pm_lastTime);


			//----------------------------------------------------------
			// Create the chart
			$('#ticker01').highcharts('StockChart', {
				chart:{
					 //关闭平移
					panning:false,
					zoomType: 'none',
					pinchType:'none',
					renderTo : "line_map",
					margin: [10, 57,20, 1],
					spacing: [0,0,0,0],
					plotBorderColor: '#3C94C4',
					plotBorderWidth: 0,//边框
					events:{
						load:function(){
							var chart = $("#ticker01").highcharts();           // Highcharts构造函数
							//基准线
							chart.yAxis[0].addPlotLine({           //在x轴上增加
								value:yesterdayClose,                           //在值为2的地方             //在x轴上增加
								width:2,                             //标示线的宽度为2px
								color: '#CCC',                  //标示线的颜色
								 zIndex:1,
								id: 'plot-line-'                //标示线的id，在删除该标示线的时候需要该id标示
							});
						}
					}
				},tooltip: {
					shared:true,
				    valueDecinale: 2,
                    useHTML: true,
					formatter: function() {
						var _name = _code;
						var _date = Highcharts.dateFormat('%b%e日,%A,%H:%M', this.x);
						var _y = this.points[0].y.toFixed(2);
						return '<p style="margin:0px;padding:0px;font-size:14px;"><span>' + _name +  '&nbsp;&nbsp;</span><span style="'+Comparative(_y,_prev_close)+';">'+_y+ '</span></p><p style="margin:0px;padding:0px;color:#999">' + _date + '</p>';
					}
				},
				plotOptions: {
					series: {
						/*关闭动画*/
						animation: false
					}
				},
				rangeSelector:{
					enabled: false
				},
				 /*导出配置*/
				exporting: {
					enabled: false
				},
				  /*创建者信息*/
				credits: {
					enabled: false
				},
				/*下部时间拖拉选择*/
				navigator: {
					enabled: false,
					/*关闭时间选择*/
					baseseries: 10
				},
				scrollbar: {
					enabled: false /*关闭下方滚动条*/
				},
				/*底部滚动条*/
				scrollbar: {
					enabled: false
				},

				xAxis: {
					//type: 'datetime',
					ordinal:false,
					breaks: [{ // Nights
						breakSize:1,
						from:am_lastTimeUTC,
						to:pm_startTimeUTC
					}],
					//minRange: 14 * 24 * 36000, // fourteen days
					showFirstLabel: true,
					showLastLabel:true,
					scrollbar: { enabled: true },
					labels: {
						// staggerLines:5
						style: {         //字体样式
						    font: 'normal 12px'
						},
						formatter:function(){
							//var returnTime=Highcharts.dateFormat('%H:%M', this.value-Number(8 * 3600 * 1000));
							var returnTime=Highcharts.dateFormat('%H:%M', this.value);
							if (returnTime == "09:30") {
							    return '<span style="margin-left:33px;color:#aaa">09:30</span>';
							}
							if (returnTime == "11:30") {
							    return '<span style="color:#aaa">11:30/13:00</span>';
							}
							if (returnTime == "10:30") {
							    return "";
							}
							if (returnTime == "14:00") {
							    return "";
							}
							if (returnTime == "15:00") {
							    return '<span style="margin-right:35px;color:#aaa">15:00</span>';
							}
							return returnTime;

						},
						y: 15,
						step:1,
						useHTML:true
					},
                    tickLength:5,
					tickPositioner:function(){
						var positions = [am_startTimeUTC, am_midTimeUTC, am_lastTimeUTC, pm_midTimeUTC, pm_lastTimeUTC];
						//var positions = [am_startTimeUTC,  am_lastTimeUTC,pm_lastTimeUTC];
						return positions;
					},
					gridLineDashStyle: 'ShortDash',
					gridLineColor: '#f2f2f2',
					gridLineWidth: 1
				},
				yAxis: [{
					opposite: true,//是否把它显示到另一边（右边）
					labels: {
					    enabled:false
					},
					title: {
						text: ''
					},
					top:'0%',
					height: '100%',
					lineWidth: 0,
					showFirstLabel: false,
					showLastLabel: false,
					gridLineWidth: 0,
					x: 0,
                    y:0,
					tickPositioner:function(){    //以yesterdayClose为界限，统一间隔值，从 最小到最大步进
						positions = [],
						tick = Number(avg_pxyAxisMin),
						increment = Number((avg_pxyAxisMax - avg_pxyAxisMin) / 3);
						var tickMin=Number(avg_pxyAxisMin),tickMax=Number(avg_pxyAxisMax);
						if(0==data.length){//还没有数据时，yesterdayClose 的幅值 在 -1% - 1%上下浮动
							tickMin=0.99*yesterdayClose;
							tickMax=1.01*yesterdayClose;
						}else if(0==increment){//有数据了  但是数据都是一样的幅值
							if(yesterdayClose>Number(avg_pxyAxisMin)){
								tickMin=Number(avg_pxyAxisMin);
								tickMax=2*yesterdayClose-Number(avg_pxyAxisMin);
							}else if(yesterdayClose<Number(avg_pxyAxisMin)){
								tickMax=Number(avg_pxyAxisMax);
								tickMin=yesterdayClose-(Number(avg_pxyAxisMax)-yesterdayClose);
							}else{
								tickMin=0.99*yesterdayClose;
								tickMax=1.01*yesterdayClose;
							}
						}else if((avg_pxyAxisMin-yesterdayClose) < 0 && (avg_pxyAxisMax-yesterdayClose) > 0){//最小值在昨日收盘价下面，最大值在昨日收盘价上面
							var limit=Math.max(Math.abs(avg_pxyAxisMin-yesterdayClose),Math.abs(avg_pxyAxisMax-yesterdayClose));
							tickMin=yesterdayClose-limit;
							tickMax=yesterdayClose+limit;
						}else if(avg_pxyAxisMin > yesterdayClose && avg_pxyAxisMax > yesterdayClose){//最小最大值均在昨日收盘价上面
							tickMax=avg_pxyAxisMax;
							tickMin=yesterdayClose-(tickMax-yesterdayClose);

						}else if(avg_pxyAxisMin < yesterdayClose && avg_pxyAxisMax < yesterdayClose){//最小最大值均在昨日收盘价下面
							tickMin=avg_pxyAxisMin;
							tickMax=yesterdayClose+(yesterdayClose-tickMin);
						}
						if(tickMax > (2*yesterdayClose)){//数据超过100%了
							tickMax=2*yesterdayClose;
							tickMin=0;
						}
						var interval=Number(tickMax-yesterdayClose)/10;
						tickMax+=interval;
						tickMin=yesterdayClose-(tickMax-yesterdayClose);
						increment=(tickMax-yesterdayClose)/2;//基准线位置
						tick=tickMin;
						var i=0;
						for (tick; i++ < 5  ; tick += increment) {
						    var _fix = (Number(tick)).toFixed(2);
						    positions.push(_fix);
						}

						return positions;
					}
				},//y1
				{
					opposite: true,//是否把它显示到另一边（右边）
					showFirstLabel: true,
					showLastLabel:true,
					labels: {
						enabled:true,
						overflow: 'justify',
						style: {         //字体样式
						    font: 'normal 12px'
						},
						align: 'right',
						x: 55,
						y:6,
						formatter:function(){//最新价  px_last/preclose昨收盘-1
						    //return 100*(((this.value/yesterdayClose)-1).toFixed(4))+"%";
						    return '<span style="color:#aaa;">'+this.value+'</span>';
						}
					},
					useHTML: true,
					title: {
						text: ''
					},
					lineWidth: 1,
					top:'0%',
					height: '100%',
					gridLineWidth: 1,
					gridLineDashStyle: 'ShortDash',
					gridLineColor: '#f2f2f2',
					tickPositioner:function(){
						return positions;
					}
				}],
				series : [{
					name : _codeName,
					data : price_trend,
					yAxis:0,
					dataGrouping: {
					    units: groupingUnits
					}
				},
				{
					name : _codeName,
					data : price_trend,
					type : 'area',
					cursor:'pointer',
					onSeries : 'candlestick',
					color:'transparent',
					style:{
						fontSize: '0px',
						fontWeight: '0',
						textAlign: 'center'
					},
					zIndex:-1000,
					yAxis:1,
					fillColor : {
						linearGradient : {//渐变方向
							x1: 0,
							y1: 0,
							x2: 0,
							y2: 1
						},
						stops : [
							[0, Highcharts.getOptions().colors[0]],
							[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
						]
					},
					dataGrouping: {
					    units: groupingUnits
					}
				}]
			});
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			//返回错误信息
			//console.log("Ajax返回错误信息:"+XMLHttpRequest.status+"~"+XMLHttpRequest.readyState+"~"+textStatus);
		}
	});
}
