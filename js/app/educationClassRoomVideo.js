define([], function() {
	var page = {};
    page.init = function() {
			var self = this;
			// self.fundsearch();
			page.getVideo();
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
	page.getVideo = function(){
    	
    	var _title = sessionStorage.getItem("title");
    	var _playLink = sessionStorage.getItem("playLink");
    	var _picUrl = sessionStorage.getItem("picUrl");

    	var _titleAndTime = $('.titleAndTime');
    	_titleAndTime.append('<h5>'+_title+'</h5><p>2019-09-17</p>');

    	var _imgAndVideo = $('.imgAndVideo');
    	_imgAndVideo.append('<img src="'+_picUrl+
    		'" class="star_img" alt="" /><video src="'+_playLink+
    		'" data-play="true" id="media" controls autobuffer>您的浏览器不支持 video 标签。</video>');
	}

    return page;
});