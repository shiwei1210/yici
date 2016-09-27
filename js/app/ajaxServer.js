/*请求基础类*/
//请求接口
define(['jquery'], function($) {
        var what_page = $('.ETFpages').val();
        if (what_page=="ETF") {
              var baseUrl = "http://10.10.10.28:9080/sseQuery/infodisplay/";
              var request = {
                baseRequest: function(interfaceName, options) { //请求基础方法(接口名称，请求参数)
                var baseParams = {
                }; //定义基础参数
                options = options || {};
                var callback = options.callback || {}; //请求返回
                var errorback = options.errback || {}; //错误返回
                var opt = $.extend(baseParams, options.data);
                // var guid = this.guid();
                // baseParams["Timestamp"] = this.nowFormatDate(); //时间戳合并
                // baseParams["JsonpPrifx"] = guid; //GUID合并
                $.ajax({
                    url: baseUrl + interfaceName,
                    type: "POST",
                    data: baseParams,
                    dataType: "jsonp",
                    jsonp: 'jsonCallBack',
                    cache:false,
                    //timeout:30000,
                    success: function(dataJson) {
                        if (typeof(options.callback) == "function" || options.ForceBackCall == true){ //正确返回
                            options.callback(dataJson);
                        } else {
                            //app.showAlert(data.Message);
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        if (typeof(options.errorback) == "function") {
                            options.errorback(err);
                        } else {
                            alert(XMLHttpRequest.status);
                            alert(XMLHttpRequest.readyState);
                            alert(textStatus);
                        }
                    },
                    complete: function(XMLHttpRequest, textStatus) {
                        //this; // 调用本次AJAX请求时传递的options参数
                    }
                });
            },
        };
        }else{
            //请求云端接口
			var baseUrl = "http://yunhq.sse.com.cn:32041/v1/sh1/"; //基础URL
            var request = {
                baseRequest: function(interfaceName, options) { //请求基础方法(接口名称，请求参数)
                var baseParams = {
                }; //定义基础参数
                options = options || {};
                var callback = options.callback || {}; //请求返回
                var errorback = options.errback || {}; //错误返回
                var opt = $.extend(baseParams, options.data);
                // var guid = this.guid();
                // baseParams["Timestamp"] = this.nowFormatDate(); //时间戳合并
                // baseParams["JsonpPrifx"] = guid; //GUID合并
                $.ajax({
                    url: baseUrl + interfaceName,
                    type: "POST",
                    data: baseParams,
                    dataType: "jsonp",
                    jsonp: 'callback',
                    cache:false,
                    //timeout:30000,
                    success: function(dataJson) {
                        if (typeof(options.callback) == "function" || options.ForceBackCall == true){ //正确返回
                            options.callback(dataJson);
                        } else {
                            //app.showAlert(data.Message);
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        if (typeof(options.errorback) == "function") {
                            options.errorback(err);
                        } else {
                            alert(XMLHttpRequest.status);
                            alert(XMLHttpRequest.readyState);
                            alert(textStatus);
                        }
                    },
                    complete: function(XMLHttpRequest, textStatus) {
                        //this; // 调用本次AJAX请求时传递的options参数
                    }
                });
            },
            // nowFormatDate: function() { //时间戳格式化
                // var date = new Date();
                // var month = date.getMonth() + 1;
                // var strDate = date.getDate();
                // if (month >= 1 && month <= 9) {
                    // month = "0" + month;
                // }
                // if (strDate >= 0 && strDate <= 9) {
                    // strDate = "0" + strDate;
                // }
                // var currentdate = date.getFullYear().toString() + month.toString() + strDate.toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
                // return currentdate;
            // },
            // guid: function() { //jsonp请求GUID
                // var S4 = function() {
                    // return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                // };
                // return "JSONP_" + (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4()).toUpperCase();
            // }
        };
        }
          
        return request;


});
