define([], function() {
	var page = {};
    page.init = function() {
			var self = this;
			// self.fundsearch();
            self.getFundList();
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
	// }; //基金查询的接口调用

    //获取基金列表,并绑定跳转事件
	page.getFundList = function(){
		var dataJson = {	
			"data":[
						{
                            "last_scale":11.55,
                            "last_net":1.3476,
                            "asset_class":"股票型",
                            "FUND_MANAGER":"博时基金管理有限公司",
                            "FUND_TYPE":"ETF",
                            "FUND_NAME":"超大ETF",
                            "FUND_ID":"510020",
                            "year_incom":"12342455",
                            "threeMonth_incom":"21321",
                            "NUM":"2"
    					},
    					{   "FUND_ID":"510010",
                            "FUND_NAME":"非周ETF",
                            "FUND_MANAGER":"海富通基金管理有限公司",
                            "last_scale":12.35,
                            "last_net":1.0876,
                            "asset_class":"混合型",
                            "FUND_TYPE":"ETF",
                            "year_incom":"12342455",
                            "threeMonth_incom":"21321",
                            "NUM":"9"
    					}
    				]
    			};
    	var data = dataJson.data;
    	// sessionStorage.setItem("playLink", data.playLink);
    	// sessionStorage.setItem("title", data.title);
    	// sessionStorage.setItem("picUrl",data.picUrl);
    	for (var i = 0; i <data.length; i++) {
    		var FUND_ID = dataJson.data[i].FUND_ID;
    		var FUND_NAME = dataJson.data[i].FUND_NAME;
            var FUND_TYPE = dataJson.data[i].FUND_TYPE;
            var asset_class = dataJson.data[i].asset_class;
            var last_scale = dataJson.data[i].last_scale;
            var last_net = dataJson.data[i].last_net;
            var FUND_MANAGER = dataJson.data[i].FUND_MANAGER;
            var year_incom = dataJson.data[i].year_incom;
            var threeMonth_incom = dataJson.data[i].threeMonth_incom;



    		var _fundList=$('.fundList');
    		_fundList.append('<tr><td><a href="javascript:;" class="marketById" name="'+FUND_ID+'">'+FUND_ID+
                '</a></td><td><a href="javascript:;" class="marketById" name="'+FUND_ID+'">'+FUND_NAME+
                '</a></td><td>'+FUND_TYPE+
                '</td><td>'+asset_class+
                '</td><td>'+last_scale+
                '</td><td class="maket-td-hong">'+last_net+
                '</td><td>'+FUND_MANAGER+
                '</td><td>'+year_incom+
                '</td><td>'+threeMonth_incom+
                '</td></tr>');
    	}
        $(".marketById").click(fingById);
	}

    //跳转页面
    var fingById = function (){
        // var Id = $('.marketById')
        window.location.href ="fund-price.html?code_id="+$(this).attr("name");
    }

    return page;
});
