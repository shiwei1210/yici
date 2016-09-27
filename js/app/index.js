define([], function() {
	var page = {};
    page.init = function() {
			var self = this;
			self.fundsearch();
			self.dataShow();
	};
	page.fundsearch = function(){
		webComm.Pajax.baseRequest("/list/self/000001_000016_000010_000009_000300", {
		      data: {
		          select : 'code,name,last,chg_rate,amount',
		      },
		      callback: function(data) {
		          console.log(data);
		          // _self._setOptionData(data.res);
		          // drawFlag && _self.resetOption();
		      }
		  });
	}; //基金查询的接口调用

	page.dataShow = function(){
				// webComm.Pajax.baseRequest("/list/self/000001_000016_000010_000009_000300", {
		  //     data: {
		  //         select : 'code,name,last,chg_rate,amount',
		  //     },
		  //     callback: function(data) {
		  //         console.log(data);
		  //         // _self._setOptionData(data.res);
		  //         // drawFlag && _self.resetOption();
		  //     }
		  // });
			data = {
					"fundAmount":520,
 					"stockType":1234,
  					"solidType":4546,
  					"currency":3258,
  					"crossBoder":1383,
  					"goodsType":1228,
  					"mixedType":3123,
  					"marketPrice":67583.33,
  					"transactionAmount":65727.28
					}

			var fundNum = $('._fundAmount');
			fundNum.append('基金总数:<span class="indexspan1">'+data.fundAmount+'</span>只');

			var marketData = $('._test')
			marketData.append('<tr><td><i>股票型</i><em>'+data.stockType+
							'<span>只</span></em></td><td><i>固守型</i><em>'+data.solidType+
							'<span>只</span></em></td><td><i>货币型</i><em>'+data.currency+
							'<span>只</span></em></td></tr><tr><td><i>跨境型</i><em>'+data.crossBoder+
							'<span>只</span></em></td><td><i>商品型</i><em>'+data.goodsType+
							'<span>只</span></em></td><td><i>混合型</i><em>'+data.mixedType+
							'<span>只</span></em></td></tr><tr class="tabletr"><td><i>市价总值</i><em>'+data.marketPrice+
							'<span>亿元</span></em></td><td><i>成交金额</i><em>'+data.transactionAmount+
							'<span>亿元</span></em></td><td></td></tr>');
			// <tr>
			// 	<td><i>股票型</i><em>1030<span>只</span></em></td>
   //          	<td><i>固守型</i><em>4052<span>只</span></em></td>
   //          	<td><i>货币型</i><em>4052<span>只</span></em></td>
   //          	</tr>
   //          <tr>
   //              <td><i>跨境型</i><em>18.6<span>只</span></em></td>
   //              <td><i>商品型</i><em>1074<span>只</span></em></td>
   //              <td><i>混合型</i><em>1074<span>只</span></em></td>
   //          </tr>
   //          <tr class="tabletr">
   //              <td><i>市价总值</i><em>27813.13<span>亿元</span></em></td>
   //              <td><i>成交金额</i><em>27813.13<span>亿元</span></em></td>
   //              <td></td>
   //          </tr>




	}

    return page;
});
