define([], function() {
	var page = {};
    page.init = function() {
			var self = this;
			// self.fundsearch();
			page.videoSearch();
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
	page.videoSearch = function(){
		var dataJson = {	
			"data":[
						{
							"title":"公司贵宾上交所三楼大厅",
    			    		"playLink":"http://www.w3school.com.cn/i/movie.ogg",
    			    		"picUrl":"images/layout/shipimg.png"
    					},
    					{
    						"title":"公司贵宾上交所三楼包房",
    			    		"playLink":"http://www.w3school.com.cn/i/movie.ogg",
    			    		"picUrl":"images/layout/shipimg.png"
    					}
    				]
    			};
    	var data = dataJson.data;
    	// sessionStorage.setItem("playLink", data.playLink);
    	// sessionStorage.setItem("title", data.title);
    	// sessionStorage.setItem("picUrl",data.picUrl);
    	for (var i = 0; i <data.length; i++) {
    		var _picUrl = dataJson.data[i].picUrl;
    		var _title = dataJson.data[i].title;

    		var _video3=$('.video3');
    		_video3.append('<div class="col-lg-3 col-md-3 col-sm-4 col-xs-6"><div class="thumbnail"><img src="'
    		+_picUrl+'"><div class="caption"><p><a href="education-classroom-video.html">'
    		+_title+'</a></p></div></div></div>');
    	}


	}

    return page;
});
