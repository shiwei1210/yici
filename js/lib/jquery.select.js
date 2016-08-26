(function($) {
	//jay added 2014年2月18日12:30:31
	$.fn.cusSelect = function(options) {
		var opt = $.extend({
			defText:"请选择",
			wrapClass:"",
			afselect:null
		},options);
		var _IE = (function(){
		   var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
		   while (
			   div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			   all[0]
		   );
		   return v > 4 ? v : false ;
		}());
		return this.each(function(){
			var _self = $(this);
			var smshCLS = "cusSelectShow";
			var smtx = ".cusSelectText";
			var smlt = ".cusSelectListWrap";
			var smlit = ".cusIthems";
			var selectText = _self.find(smtx);
			var selectList = _self.find(smlt);
			var hideinput = _self.find("input");
			var doc = $(document);
			var val;
			var defval;
			var deftext;
			var defLi = selectList.find(".def")
			
			defval = defLi.attr("val");
			deftext = defLi.find("em").text();
			selectText.attr({"dval":defval,"dtext":deftext});
			
			function closeSelect() {
				$(".cusSelectWrap").removeClass(smshCLS);
				$(smlt).hide(0).removeAttr('style');
				doc.unbind("click.closeSelect");
			}
			function ulposition() {
				var uloffsetTop = selectList.offset().top;
				if ( uloffsetTop + selectList.height() > doc.height() ) {
					selectList.css({
						top:'auto',
						bottom:'30px',
                        borderBottom:0,
                        borderTopWidth:1
					});
				}
			}
			function toggleSelect(_self) {
				var smglist = $(smlt);
				var smglistVist = smglist.filter(function(){
					if ($(this).is(":visible")){
						return this;
					}
				});
				if ( smglistVist[0] == selectList[0] ) {
					selectList.hide(0);
					smglistVist.parent().removeClass(smshCLS);
				} else {
					if(_IE == 6) {
						selectList.width(_self.outerWidth());
					}
					smglistVist.hide(0);
					smglistVist.parent().removeClass(smshCLS);
					_self.addClass(smshCLS);
					selectList.show(0);
					ulposition();
				}
			}
			
			if (opt.defText) {
				window.smgDefText = opt.defText;
				selectText.text(opt.defText);
			}
			selectText.on("click", function(e){/*这里控制下拉菜单的弹出方式click或者mouseover*/
				e.stopPropagation();
				
				doc.bind("click.closeSelect", function() {
					closeSelect();
				});
				toggleSelect(_self);
			});
			_self.on("click", function(e) {
				e.stopPropagation();
			});
			selectList.on("click", smlit, function(e) {
				var _this = $(this);
				var _text = _this.text();
				val = _this.attr("val");
				selectText.text(_text);
				_this.addClass("act").siblings().removeClass("act");
				_self.attr("val", val);
				hideinput.val(val);
				if ( opt.afselect ) {
					opt.afselect(val);
				}
				closeSelect();
			});
		});
	};
	$.fn.cusSelectReset = function(options) {
		var opt = $.extend({
			
			defWrap:".cusSelectWrap",
			defText:".cusSelectText",
			defLWrp:".cusSelectListWrap"
		}, options);
		$(document).trigger("click");
		return this.each(function() {
			var _self = $(this);
			var deftext = _self.find(opt.defText);
			_self.removeAttr("val");
			_self.find("input").val( deftext.attr("dval"));
			deftext.html( deftext.attr("dtext") );
		});
	};
})(jQuery);
$(function(){	
	$(".cusSelectWrap").cusSelect({defText:""});
});