define([], function(){
	var fundM = {};
    fundM.init = function() {
        var self = this;
        self.initDomEvents(); //���¼�
    };
	//���¼�
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