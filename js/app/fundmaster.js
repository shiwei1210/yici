define([], function(){
	var fundM = {};
    fundM.init = function() {
        var self = this;
        self.initDomEvents(); //绑定事件
    };
	//绑定事件
    fundM.initDomEvents = function() {
		$(".form-controlbu2").click(function(){
			var code = $(".form-controlbu").val();
			var manage = $(".sse_list_sou select").val();
			alert(code+manage);
			require(['homeajax'], function (homeajax) {
				homeajax.init();
			});
	    })
	}
	
	return fundM;
})