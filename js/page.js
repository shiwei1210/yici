
var iscrollOptions = {
	tap: false,
	scrollbars: true,
	bindToWrapper:true,
	fadeScrollbars:false,
	disableMouse: false,
	//scrollbars: 'custom-scrollbar',
	disablePointer: true
}



Zepto(function($){
	var $doc = $(document);


	$doc.on("gonext", function(e) {
		//console.log("next")
	}).on("goprew", function(e) {
		//console.log("prew")
	})





	$("#scrollContent2").on("touchmove", function(e) {
		e.stopPropagation();
		//alert(0)
	}).on("touchend", function(e) {
		var endNumber;
		var delect;
		if ( sliderScroll2.y > 0) {
			//console.log(sliderScroll.y)
			endNumber = -sliderScroll2.y
			delect = "up";
		} else {
			var $thisp = $(this);
			var $this = $thisp.find(".prevnScroll");
			var getNumber = Math.abs(sliderScroll2.y) + $thisp[0].clientHeight - $this[0].scrollHeight;
			delect = "down";
			endNumber = getNumber
		}

		if (endNumber > 80 && delect == "down") {
			$doc.trigger("gonext")
		} else if ( endNumber < -80  && delect == "up") {
			$doc.trigger("goprew")
		}
		//console.log(endNumber)
	})
	var sliderScroll2 = new IScroll("#scrollContent2",iscrollOptions);
	sliderScroll2.on("beforeScrollStart", function(e) {
		sliderScroll2.refresh();
		//console.log(0)
	});

	var formtarget = $(".page7Wrap")
	$(".checklist").on("focus", function(e) {
		var $this = $(this);
		formtarget.addClass("isTyping");
	}).on("blur", function(e) {
		formtarget.removeClass("isTyping");
	});

})