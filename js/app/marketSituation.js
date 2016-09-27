define([], function() {
	var page = {};
    page.init = function() {
			var self = this;
			self.dataShowDay();
			self.dataShowMonth();
			self.dataShowYear();
	};
	// page.fundsearch = function(){
	// 	webComm.Pajax.baseRequest("/list/self/000001_000016_000010_000009_000300", {
	// 	      data: {
	// 	          select : 'code,name,last,chg_rate,amount',
	// 	      },
	// 	      callback: function(data) {
	// 	          console.log(data);
	// 	          // _self._setOptionData(data.res);
	// 	          // drawFlag && _self.resetOption();
	// 	      }
	// 	  });
	// };

	//每日概况
	page.dataShowDay = function(){

	//虚拟数据
	data = {
			"stockType":{"total":'2719.05(2016-04-15)',
						"ETF":159.91,
						"LOF":'--',
						"gradingLOF":'--',
						"close_EndFund":1459.91
					},
			"solidType":{"total":'3123.11(2016-04-15)',
						"ETF":211.21,
						"LOF":'--',
						"gradingLOF":'--',
						"close_EndFund":2139.23
					}
		}
		//遍历输出
	for (var i = 1; i <=11; i++) {
		var show = 'day';
		switch(i){
			case 1:
				type='股票型';
				_total=data.stockType.total || '--';
				_ETF = data.stockType.ETF || '--';
				_LOF = data.stockType.LOF || '--';;
				_gradingLOF = data.stockType.gradingLOF || '--';
				_close_EndFund = data.stockType.close_EndFund || '--';
				page.showDetails(show);
			case 2:
				type='固收型';
				_total=data.solidType.total || '--';
				_ETF = data.solidType.ETF || '--';
				_LOF = data.solidType.LOF || '--';
				_gradingLOF = data.solidType.gradingLOF || '--';
				_close_EndFund = data.solidType.close_EndFund || '--';
				page.showDetails(show);
			default:
				return ;

		}
	}
	};

	//月度概况
	page.dataShowMonth = function(){
	data = {
			"stockType":{"total":'2719.05(2016-04-15)',
						"ETF":159.91,
						"LOF":'--',
						"gradingLOF":'--',
						"close_EndFund":1459.91
					},
			"solidType":{"total":'3123.11(2016-04-15)',
						"ETF":211.21,
						"LOF":'--',
						"gradingLOF":'--',
						"close_EndFund":2139.23
					}
		}

	for (var i = 1; i <=11; i++) {
		var show = 'month';
		switch(i){
			case 1:
				type='股票型';
				_total=data.stockType.total || '--';
				_ETF = data.stockType.ETF || '--';
				_LOF = data.stockType.LOF || '--';;
				_gradingLOF = data.stockType.gradingLOF || '--';
				_close_EndFund = data.stockType.close_EndFund || '--';
				page.showDetails(show);
			case 2:
				type='固收型';
				_total=data.solidType.total || '--';
				_ETF = data.solidType.ETF || '--';
				_LOF = data.solidType.LOF || '--';
				_gradingLOF = data.solidType.gradingLOF || '--';
				_close_EndFund = data.solidType.close_EndFund || '--';
				page.showDetails(show);
			default:
				return ;

		}
	}
	};

	//年度概况
	page.dataShowYear = function(){
	data = {
			"stockType":{"total":'2719.05(2016-04-15)',
						"ETF":159.91,
						"LOF":'--',
						"gradingLOF":'--',
						"close_EndFund":1459.91
					},
			"solidType":{"total":'3123.11(2016-04-15)',
						"ETF":211.21,
						"LOF":'--',
						"gradingLOF":'--',
						"close_EndFund":2139.23
					}
		}
		console.log(data);
	for (var i = 1; i <=11; i++) {
		var show = 'year';
		switch(i){
			case 1:
				type='股票型';
				_total=data.stockType.total || '--';
				_ETF = data.stockType.ETF || '--';
				_LOF = data.stockType.LOF || '--';;
				_gradingLOF = data.stockType.gradingLOF || '--';
				_close_EndFund = data.stockType.close_EndFund || '--';
				page.showDetails(show);
			case 2:
				type='固收型';
				_total=data.solidType.total || '--';
				_ETF = data.solidType.ETF || '--';
				_LOF = data.solidType.LOF || '--';
				_gradingLOF = data.solidType.gradingLOF || '--';
				_close_EndFund = data.solidType.close_EndFund || '--';
				page.showDetails(show);
			default:
				return ;

		}
	}
	};

	//渲染
	page.showDetails = function(show){
		if (show=='day') {
			var fundDeal = $('._fundDay') ;
		}else if(show=='month')
		{var fundDeal = $('._fundMonth') ;
		}else{
			var fundDeal = $('._fundYear') ;
		}

		fundDeal.append('<tr><td>'+type+'(只)</td><td>'+_total+
		'</td><td>'+_ETF+'</td><td>'+_LOF+'</td><td>'+_gradingLOF+
		'</td><td>'+_close_EndFund+'</td></tr>');
	};
	return page;
});