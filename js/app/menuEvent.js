define(['dlmenu'], function () {
	var sseMenuF = {};
	//menu初始化
	sseMenuF.init = function () {
		var self = this;
		self.initPlugs(); //初始化插件
		self.bindEvents(); //主菜单绑定事件
		$("#left_menu li").leftMenu(); //左侧菜单绑定事件
		self.bindMobileEvents(); //mobile版菜单回调
	};
	//pc版菜单绑定事件
	sseMenuF.bindEvents = function () {
		var topslide = false,
			menuActive = $("#menu_tab li.active"), //当前激活的菜单
			topslideEl = $(".nav-side-show"),
			topslideEls = topslideEl.find(".trow"),
			showClass = topslideEl.attr("sidshowclass"),
			slideTimer = null,
			slideShowTimer = null,
			activeTag = null;

		function closeSlide() {
			if (topslide) {
				topslideEl.removeClass(showClass);
				topslide = false;
				menuActive.removeClass("isHover").siblings().removeClass("isHover");
				$("#menu_tab").closest('.navbar_wrap').removeClass('expand');
			}
		}

		function openSlide(activeTag, index) {
			var curslideEls = topslideEl.find(".trow").eq(index);
			activeTag.addClass("isHover").siblings().removeClass("isHover");
			curslideEls.addClass("show").siblings().removeClass("show");
			var waterFlag = curslideEls.attr('data-waterFlag');
			if (waterFlag != 1) {
				// curslideEls.waterfall();
				curslideEls.attr('data-waterFlag', "1");
			}
			if (!topslide) {
				topslideEl.addClass(showClass);
				$("#menu_tab").closest('.navbar_wrap').addClass('expand');
				topslide = true;
			}
		}
		$(document).on("mouseover", ".top_side_show_items", function () {
			var activeTag = $(this);
			var index = this.getAttribute("side-data");
			if (slideTimer) {
				clearTimeout(slideTimer);
			}
			if (slideShowTimer) {
				clearTimeout(slideShowTimer);
			}
			slideShowTimer = setTimeout(function () {
				openSlide(activeTag, index);
			}, 300);
		}).on("mouseover", ".nav-side-show", function () {
			if (slideTimer) {
				clearTimeout(slideTimer);
			}
		}).on("mouseleave", ".top_side_show_items, .nav-side-show", function () {
			if (slideTimer) {
				clearTimeout(slideTimer);
			}
			if (slideShowTimer) {
				clearTimeout(slideShowTimer);
			}
			slideTimer = setTimeout(closeSlide, 450);
		});
	};
	//mobile版菜单回调
	sseMenuF.bindMobileEvents = function () {
		$("#dl-menu").dlmenu(); //手机版菜单绑定事件
		//定位到当前菜单  --start
		$("#dl-menu li.active").parents('li').addClass('showMenu');
		menuTrigger($("#dl-menu"));

		function menuTrigger($item) {
			var $nextItem = $item.children('ul').children('li.showMenu');
			if ($nextItem.length === 0) {
				$nextItem = $item.find('li.active');
				if ($nextItem.hasClass('hasMenu')) {
					$nextItem.addClass('showMenu');
					$nextItem.trigger('click');
					$nextItem.removeClass('showMenu');
				}
				$("#dl-menu li.active").parents('li').removeClass('showMenu');
				return false;
			}
			$nextItem.trigger('click');
			menuTrigger($nextItem);
		}
		//--end
	};
	//初始化插件
	sseMenuF.initPlugs = function () {
		//瀑布流插件
		$.fn.waterfall = function (options) {
			var df = {
				item: '.block',
				margin: 10,
				addfooter: false
			};
			options = $.extend(df, options);
			return this.each(function () {
				var $box = $(this),
					pos = [],
					_box_width = $box.width(),
					$items = $box.find(options.item);
				if ($items.length === 0) {
					return false;
				}
				//计算宽度、高度及每行个数
				var _owidth = $items.eq(0).outerWidth(),
					_oheight = $items.eq(0).outerHeight(),
					_num = Math.ceil(_box_width / _owidth);

				for (var i = 0; i < _num; i++) {
					pos.push([i * _owidth + options.margin, 0]);
				}

				$items.each(function () {
					var _this = $(this),
						_temp = 0,
						_height = _this.outerHeight();

					for (var j = 0; j < _num; j++) {
						if (pos[j][1] < pos[_temp][1]) {
							//暂存top值最小那列的index
							_temp = j;
						}
					}
					this.style.cssText = 'left:' + pos[_temp][0] + 'px; top:' + pos[_temp][1] + 'px;width:' + (_owidth - options.margin * 2) + 'px;';
					//插入后，更新下该列的top值
					pos[_temp][1] = pos[_temp][1] + _height;
				});

				// 计算各列高度最大的赋给外围div
				var tops = [];
				for (i = 0; i < _num; i++) {
					tops.push(pos[i][1]);
				}
				tops.sort(function (a, b) {
					return a - b;
				});
				$box.height(tops[_num - 1]);

				//增加尾部填充div
				if (options.addfooter) {
					addfooter(tops[_num - 1]);
				}

				function addfooter(max) {
					var addfooterDiv = document.createElement('div');
					addfooterDiv.className = 'block';
					for (var i = 0; i < _num; i++) {
						if (max != pos[i][1]) {
							var clone = addfooterDiv.cloneNode(),
								_height = max - pos[i][1];
							clone.style.cssText = 'left:' + pos[i][0] + 'px; top:' + pos[i][1] + 'px; height:' + _height + 'px;';
							$box[0].appendChild(clone);
						}
					}
				}
			});
		};
		//左侧菜单插件
		$.fn.leftMenu = function (b) {
			var c,
				item,
				httpAdress;
			b = jQuery.extend({
					Speed: 300,
					autohide: 1
				},
				b);
			c = $(this);
			item = c.children("ul").parent("li").children("a");
			httpAdress = window.location;
			c.children("ul").parent("li").children('a:not(.active)').addClass("inactive");

			function _item() {
				var a = $(this);
				if (b.autohide) {
					var old_active = a.parent().siblings('.active');
					old_active.removeClass("active").find("ul").slideUp(b.Speed / 1.2,
						function () {
							$(this).parent("li").removeClass("active").children("a").removeClass("active").addClass("inactive");
						});
				}
				if (a.hasClass("inactive")) {
					a.removeClass("inactive").addClass("active");
					a.parent("li").addClass("active").children("ul").slideDown(b.Speed);
				} else if (a.hasClass("active")) {
					a.removeClass("active").addClass("inactive");
					a.parent("li").removeClass("active").children("ul").slideUp(b.Speed / 1.2);
				}
			}
			item.unbind('click').click(_item);
		};
	};
	return sseMenuF;
});
