// var define = {} || define;
// var require = {} || require;
// var navigator = {} || navigator;
// var window = {} || window;
// var document = {} || document;
// var setTimeout = {} || setTimeout;
// var location = {} || location;
// var $ = {} || $;
define([], function () {
    var sseF = {};
    sseF.init = function () {
        var self = this;
        self.initDomEvents();
    };

    function QueryString() { //构造参数对象并初始化
        var name, value, i;
        var str = location.href; //获得浏览器地址栏URL串
        var num = str.indexOf("?");
        str = str.substr(num + 1); //截取“?”后面的参数串
        var arrtmp = str.split("&"); //将各参数分离形成参数数组
        for (i = 0; i < arrtmp.length; i++) {
            num = arrtmp[i].indexOf("=");
            if (num > 0) {
                name = arrtmp[i].substring(0, num); //取得参数名称
                value = arrtmp[i].substr(num + 1); //取得参数值
                this[name] = value; //定义对象属性并初始化
            }
        }
    }
    var URL_Request = new QueryString(); //使用new运算符创建参数对象实例
	
	function lazyImgSrc(options) {
		var opt = $.extend(options, {
			lazyAttr : "lazy-src",
			lazyAttrBGI : "lazy-url"
		});
		var targetIMG = $("["+ opt.lazyAttr +"]");
		var targetTAG = $("["+ opt.lazyAttrBGI +"]");
		var mergerTag = targetIMG.add(targetTAG);
		mergerTag.each(function(el_index, el_element) {
			var preloadTimer = null;
			var $el = $(el_element);
			var $img = $("<img>");
			$img.on("load", function() {
				//console.log($el[0].tagName.toLocaleLowerCase())
				if ($el[0].tagName.toLocaleLowerCase() == 'img') {
					$el.attr('src', $img.attr("src"));
				} else {
					$el.css({
						backgroundImage: "url("+ $img.attr("src") +")" 
					});
				}
				$el.removeAttr(opt.lazyAttr);
				$el.removeAttr(opt.lazyAttrBGI);
				$img = null;
			});
			preloadTimer = setTimeout(function() {
				$img[0].src = $el.attr(opt.lazyAttr) || $el.attr(opt.lazyAttrBGI);
			}, (1 * parseInt(el_index)));
		});
		mergerTag = null;
	}
	
    //初始化详情页
    sseF.initDomEvents = function () {
        //初始化菜单事件, 请放在最先执行
        require(['menuEvent'], function (sseMenuF) {
            sseMenuF.init();
        });
        
        lazyImgSrc();
		/*setTimeout(function() {
			lazyImgSrc();
		},0);*/
        //微信预览图
        function isWX() {
          return /micromessenger/.test(navigator.userAgent.toLowerCase());
        }

        if (isWX()) {
            var previewImgdiv = $('<div id="micromessagePreviewImg" style="display:none">');
            var previewImg = $("<img>");
            previewImg.attr('src', 'images/ui/weichaticon.png');
            previewImgdiv.append(previewImg);
            $('body').prepend(previewImgdiv);
            previewImgdiv = null;
            previewImg = null;
        }

        //PDF弹出事件
        var bind_pdf_modal_toggle = function () {
            $(".sse_modal").on("click", '.togglebtn', function () {
                var $this       = $(this);
                var $togglebar  = $this.parent();
                var $warp       = $this.closest(".con_prvdate");
                var $parent     = $this.closest(".row");
                var $col1       = $parent.find(".col-sm-8");
                var $col2       = $parent.find(".col-sm-4");
                if ($this.hasClass('open')) {
                    $this.removeClass('open').addClass('close');
                    $col2.find(".conp_block_1").css('display', 'none');
                    $col2.find(".conp_block_2").css('display', 'none');
                    $col2.find(".conp_block_3").css('display', 'none');
                    $col1.css('width', '100%');
                    $col2.css({
                        width: "0px",
                        position: "static"
                    });
                    $warp.css({
                        position: "static"
                    });
                    $togglebar.attr("oldstyle", $togglebar.attr("style"));
                    $togglebar.css({
                        left: "auto",
                        right: "0px"
                    });
                } else if ($this.hasClass('close')) {
                    $this.removeClass('close').addClass('open');
                    $col1.removeAttr('style');
                    $col2.removeAttr('style');
                    $warp.removeAttr('style');
                    $togglebar.attr('style', $togglebar.attr("oldstyle"));

                    $col2.find(".conp_block_1").removeAttr('style');
                    $col2.find(".conp_block_2").removeAttr('style');
                    $col2.find(".conp_block_3").removeAttr('style');
                }
            });
        };

        var BIND_PDF_CLICK_EVENT = function () {
            
            var lteIE8 = document.all && !document.addEventListener;
                if (lteIE8) {
                    $(".pdf-first").removeAttr('data-toggle data-target')
                        .removeClass('pdf-first');
            }
            
            $(".modal_pdf_list").on("click", ".pdf-first", function (e) {
                if ($(window).width() <= 768) {
                    e.stopPropagation();
                    $(this).children('a:first').attr("target", "_blank");
                    return ;
                } else {
                    $(this).children('a:first').removeAttr("target");
                }
                var $modal = $(".bs-pdf-modal-lg");
                var isIElte9 = document.all && document.addEventListener && !window.atob;
                if (isIElte9) {
                    if (!document.getElementById("fixedPDFmodalcss")) {
                        require(['pdfmodaliefix'], function (fixcss) {
                            var cssvalue = fixcss.css;
                            var styleDom = $("<style>");
                            var domElement = $('<div id="fixedPDFmodalcss" style="display:none">');
                            styleDom.html(cssvalue);
                            domElement.html(styleDom);
                            $("body").prepend(domElement);
                            cssvalue = null;
                            domElement = null;
                            styleDom = null;
                        });
                    }
                }
                
                if (!$modal.length) {
                    $modal = $('<div class="modal modal2 sse_modal fade bs-pdf-modal-lg">');
                    $modal.append('<div class="modal-dialog modal-fullwidth"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h2 class="con_title"><div class="icon icon_pdf"></div></h2><h4 class="modal-title">&nbsp;</h4><p class="pdf-modal-date"></p></div><div class="modal-body"><div class="row"><div class="col-sm-8"><div class="con_tips_area has_icon"><div class="con_subdate"></div><div class="con_subtips"><strong></strong></div></div><iframe style="width:100%" height="620" src="#" frameborder="0"></iframe><div class="download_and_feedback"><a href="#" download class="btn btn-primary pdfdownloadlink">点击下载</a><a href="#" class="modal_feedback"><i class="glyphicon">&#xe065;</i> 上证E互动</a></div></div><div class="col-sm-4"><div class="con_prvdate"><div class="toggleBar"><div class="togglebtn open"></div></div><div class="conp_block_1"><table class="dt_table_1"><tbody><tr><td class="tdleft"><h2 class="title"></h2><p class="number1"></p></td><td class="tdright"><p class="number2"></p><p class="number3 up"><i class="icons">&#xe093;&#xe094;</i></p></td></tr></tbody></table><table class="dt_table_2"><tbody><tr><td class="tdleft"><div class="title"></div><div class="nums"><span class="num1"></span><span class="num2"></span></div></td><td class="tdright"><div class="title"></div><div class="nums"><span class="num1"></span><span class="num2"></span></div></td></tr></tbody></table></div><div class="conp_block_2"><div class="sse_title_common_wrap"><div class="sse_title_common"><h2>最新公告<a href="#" class="hidden-xs"><i class="sseicon-icon_more"></i></a></h2></div></div><div class="sse_list_1"><dl></dl></div></div><div class="conp_block_3"><div class="sse_title_common_wrap"><div class="sse_title_common"><h2>市场日历<a href="#" class="hidden-xs"><i class="sseicon-icon_more"></i></a></h2></div></div><div class="sse_list_5"><ul></ul></div></div></div></div></div></div></div></div>');
                    $("body").append($modal);
                    bind_pdf_modal_toggle();

                    $modal.on('shown.bs.modal', function () {
                        var _nowheight = $(window).height();
                        var _modalheight1 = $modal.find(".modal-header").outerHeight();
                        var _modalheight2 = $modal.find(".download_and_feedback").outerHeight();
                        var _modalheight3 = $modal.find(".con_tips_area").outerHeight();

                        var _modalheight4 = parseInt($modal.find(".modal-fullwidth").css("margin-top"));
                        var _modalheight5 = parseInt($modal.find(".modal-fullwidth").css("margin-bottom"));
                        var _modalheight6 = parseInt($modal.find(".modal-body").css("padding-top"));
                        var _modalheight7 = parseInt($modal.find(".modal-body").css("padding-bottom"));
                        var _scalcheight = _nowheight - 10 - _modalheight1 - _modalheight2 - _modalheight3 - _modalheight4 - _modalheight5 - _modalheight6 - _modalheight7;

                        $modal.find("iframe").height(_scalcheight);
                        $modal.find(".con_prvdate .toggleBar").css("min-height", $modal.find('.modal-body').outerHeight() - _modalheight4 - _modalheight5);
                        
                        $parent.removeAttr('data-toggle data-target').siblings().removeAttr('data-toggle data-target');
                        $parent.find('.pdf-first').attr({'data-toggle':'modal','data-target':'.bs-pdf-modal-lg'});
                        $parent.siblings().find('.pdf-first').attr({'data-toggle':'modal','data-target':
                                                                '.bs-pdf-modal-lg'});

                        //								$modal.find("iframe").height(_scalcheight);
                        //								$modal.find("iframe").height(_scalcheight);
                        //								$modal.find("iframe").height(_scalcheight);
                    });

                }



                var $this           = $(this);//em
                var pdf_url         = $this.children('a:first').attr("href");
                var $parent         = $this.closest("dd");
                var $modal_target   = $('.bs-pdf-modal-lg');
                var $iframe_target  = $modal_target.find("iframe");
                var $downlink       = $modal_target.find(".pdfdownloadlink");
                var _title          = $this.children('a:first').attr("title");
                var _ssecode        = $parent.attr("data-seecode");
                var _fnstr          = $parent.attr("data-method");
                var _fntime         = $parent.attr("data-time"); //打开主页面获取到的标题时间添加到pdf弹窗的标题下方
                var _fn             = _fnstr + "('" + _ssecode + "')";
                $iframe_target.attr("src", pdf_url);
                $modal_target.find(".modal-title").html(_title);
                $modal_target.find(".pdf-modal-date").html(_fntime);
                $downlink.attr("href", pdf_url);

                var $listTarget = $modal.find(".con_prvdate");
                $listTarget = $listTarget.find(".sse_list_1");
                if (!$listTarget.attr('setClickFunction')) {
                    $listTarget.attr('setClickFunction', true);
                    $listTarget.on('click', 'dd', function (e) {
                        var _this = $(this);
                        var _alink = _this.find("a").eq(0);
                        var _titleAttr;
                        var _pdfLinks;
						var _pdfTime;
                        //判断参数
                        if (_this.attr('title')) {
                            _titleAttr = _this.attr('title');
                        } else if (_alink.attr('title')) {
                            _titleAttr = _alink.attr('title');
                        } else {
                            _titleAttr = _alink.html();
                        }
                        //获得PDF链接
                        _pdfLinks = _alink.attr('href');
                        _pdfTime = _this.attr('data-time'); //弹窗下点击右侧列表修改标题时间
                        $iframe_target.attr("src", _pdfLinks);
                        $modal_target.find(".modal-title").html(_titleAttr);
                        $modal_target.find(".pdf-modal-date").html(_pdfTime);
                        $downlink.attr("href", _pdfLinks);
                        //alert('run done');
                    }).on('click', 'dd a', function (e) {
                        var lteIE8 = document.all && !document.addEventListener;
                        if (!lteIE8) {
                            alert('not ie8');
                          e.preventDefault();
                        }

                    });
                }


                e.preventDefault();
                eval(_fn);
            });
        };
        window.BIND_PDF_CLICK_EVENT = BIND_PDF_CLICK_EVENT;
        BIND_PDF_CLICK_EVENT();

        //表格点击事件--已移动到下方函数里
        /*var jumpstates = true;
				$(".tdclickable").each(function(index,elem) {

					var mouseX1,mouseY1;
					var mouseX2,mouseY2;
					$(elem).find("tr").each(function(i,el) {
						var $this = $(el);
						var $links = $this.find("a");
						if ( $links.length == 1 ) {
							$this.addClass("isClickTr");
						}
					});


					$(elem).on("mousedown", ".isClickTr", function(e) {
                        jumpstates = true;
                        mouseX1 = e.pageX;
                        mouseY1 = e.pageY;
                        $(this).one("mousemove", function() {

                            $(this).one("mouseup", function(e) {
                                mouseX2 = e.pageX;
                                mouseY2 = e.pageY;
                                var _nums1 = Math.abs(mouseX1 - mouseX2);
                                var _nums2 = Math.abs(mouseY1 - mouseY2);
                                if (_nums1 >= 12 || _nums2 >= 12) {
                                    jumpstates = false;
                                }
                            });
                        });
					});


				});

				$(".tdclickable").on('click', 'tr', function(e) {
					var $this = $(this);
					var $links = $this.find("a");
					$links.wrapInner("<span>");
					if ( $links.length == 1 && jumpstates === true) {
						$links.find("span").eq(0).click();
						e.stopPropagation();
					}
				}).on("click", "a", function(e) {
					e.stopPropagation();
				});
*/

        $("#mobileFootlinks").on('change', function () {
            window.location.href = $(this).val();
        });
        //滚动到顶部
        $(document).on("click", ".fb_sctop", function () {
            $('html,body').stop().animate({
                scrollTop: '0px'
            }, 200);
        }).on("click", ".showfeedback", function (e) {
            var $this = $(this);
            /*var iframeSRC = "http://biz.sse.com.cn/sseportal/ps/zhs/site/user_feedback.jsp";
					if ($this.attr('data-url')) {
						iframeSRC = $this.attr('data-url');
					}*/
            /*var iframeSRC = "http://10.10.10.17/sseportal/ps/zhs/site/user_feedback.jsp?tid=28";
            if ($this.attr('data-url')) {
                iframeSRC = $this.attr('data-url');
            }*/
            var title = ""; /*columen title start*/

            if (col_id == 8301) {
                title = "首页";
            } else {
                title = $('ol.breadcrumb li a').last().text();
            }

            var iframeSRC = "http://biz.sse.com.cn/sseportal/ps/zhs/site/user_feedback.jsp?tid=28";
            if ($this.attr('data-url')) {
                iframeSRC = $this.attr('data-url') + "&title=" + title;
            } /*columen title end*/
            var iframes = '<iframe id="modalif" width="100%" height="380px" src="' + iframeSRC + '" frameborder="0"></iframe>';
            $("#feedback_modal_frame").html("").append(iframes);


        });
        //		end



        /*网站顶部简繁体显示*/
        var locationStr = window.location.href;
        var $link1 = $('#simple_change');
        if (locationStr.indexOf('/cht/') >= 0) {
            $link1.text('\u7b80\u4f53').attr("href", "ht" + "tp://" + locationStr.substring(locationStr.indexOf("/cht/") + 5));
        } else {
            $link1.text('\u7e41\u4f53').attr("href", "http://big5.sse.com.cn/site/cht/" + locationStr.substring(locationStr.indexOf("http://") + 7));
        }

        /*end*/

        // App下载判断是安卓/IOS
        var oDownload = $('.mobile-download');
        oDownload.click(function (event) {
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                //alert(navigator.userAgent);  
                window.location.href = "https://itunes.apple.com/cn/app/shang-jiao-suo/id1052655424?l=cn&mt=8";
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //alert(navigator.userAgent); 
                window.location.href = "http://mb.sseinfo.com/ComInfoServer/ssegwappdownload.jsp";
            }
        });

        /*- end -*/

        if ($('.app_intro_container').length > 0) {
            require(["app_introduce"], function (app_introduce) {
                app_introduce.init();
            });
        }
        //日历
        if ($('.pickerinit').length > 0) {
            require(["datetimepicker"], function () {
                $.fn.datetimepicker.dates['zh-CN'] = {
                    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    today: "今天",
                    suffix: [],
                    meridiem: ["上午", "下午"]
                };
                $('.pickerinit').datetimepicker({
                    language: 'zh-CN',
                    //若只选择到小时 --打开下面三个条件
                    // format: 'yyyy-mm-dd hh',
                    // startView:'day',
                    // minView:'day',

                    //若只选择到日期 --打开下面三个条件
                    format: 'yyyy-mm-dd',
                    startView: 'month',
                    minView: 'month',
                    todayBtn: true,

                    //若只选择到月份 --打开下面三个条件
                    // format: 'yyyy-mm',
                    // startView:'year',
                    // minView:'year',

                    //若只选择到年份 --打开下面三个条件
                    // format: 'yyyy',
                    // startView:'decade',
                    // minView:'decade',

                    // 高亮当前日期
                    //todayHighlight:true,
                    autoclose: true
                });
                /*$('#start_date').on('changeDate',function(ev){
                    $('#end_date').datetimepicker('setStartDate', ev.date);
                });
                $('#end_date').on('changeDate',function(ev){
                    $('#start_date').datetimepicker('setEndDate', ev.date);
                });

                $('#start_datetime').on('changeDate',function(ev){
                    $('#end_datetime').datetimepicker('setStartDate', ev.date);
                });
                $('#end_datetime').on('changeDate',function(ev){
                    $('#start_datetime').datetimepicker('setEndDate', ev.date);
                });*/
            });
        }


        /*调用首页次banner自动切换*/
        $('.carousel').carousel({
            interval: 3000
        });
        /*- end -*/

        //轮播图
        require(["swiper"], function () {
            var mySwiper = new Swiper('#PAGE_SWIPER_INDEX_TOP', {
                //pagination: '.pagination',
                loop: true,
                nextButton: "#PAGE_SWIPER_INDEX_TOP_PREV",
                prevButton: "#PAGE_SWIPER_INDEX_TOP_NEXT",
                grabCursor: true,
                paginationClickable: true,
                autoplayDisableOnInteraction: false,
                autoplay: 5000,
				onInit: function() {
					if (typeof lazyImgSrc == 'function') {
						lazyImgSrc();
					}
				}
            });

            $('#PAGE_SWIPER_INDEX_TOP_NEXT').on('click', function (e) {
                e.preventDefault();
                if (typeof mySwiper.swipePrev == "function") {
                    mySwiper.swipePrev();
                }
            });
            $('#PAGE_SWIPER_INDEX_TOP_PREV').on('click', function (e) {
                e.preventDefault();
                if (typeof mySwiper.swipeNext == "function") {
                    mySwiper.swipeNext();
                }
            });

            $("#PAGE_SWIPER_INDEX_TOP").on('mouseover', function () {
                mySwiper.stopAutoplay();
            }).on('mouseout', function () {
                mySwiper.startAutoplay();
            });

            var mySwiper3 = new Swiper('.swiper-container3', {
                //pagination: '.pagination',
                paginationClickable: true,
                grabCursor: true
            });
            var mySwiper4 = new Swiper('.swiper-container4', {
                pagination: '.pagination',
                paginationClickable: true,
                grabCursor: true
            });
            //手机版轮播图
            var mySwiper2 = new Swiper('.swiper-container2', {
                //pagination: '.pagination',
                paginationClickable: true,
                grabCursor: true
            }); //手机版轮播图
            /*业务推荐-新样式*/

            var mySwiper_scroll2 = new Swiper('#SUB_SCROLL_SWIPER', {
                pagination: '.pagination',
                paginationClickable: true,
                grabCursor: true,
                autoplay: 5000
                    //loop: true
            });
            $("#SUB_SCROLL_SWIPER").on('mouseover', function () {
                mySwiper_scroll2.stopAutoplay();
            }).on('mouseout', function () {
                mySwiper_scroll2.startAutoplay();
            });
            /*- end -*/
        });


        //清空input的value值

        var $input = $('input');
        if ($input.length > 0) {

            $input.keydown(function (e) {
                e.stopPropagation();
                var $this = $(this);
                $this.siblings('.clear_value').show();
            });

            $('.clear_value').on('click', function () {
                var $this = $(this);
                $this.siblings().not('.search_btn,.query_btn').val("");
                $this.hide();
            });

        }

        /*窗口滚动时固定定位搜索框*/
        var $scrollInput = $('.sse_query_input'); 
        var $windowWidth = $(window).width();
        if ($scrollInput.length > 0 && $windowWidth > 768 ) {
            var $offsetTop = $scrollInput.offset().top;
            //console.log($offsetTop);
            if ($(window).scrollTop() > 300) {
                $scrollTop();
            }
            $(window).scroll(function () {
                $scrollTop();
            });
        }

		function $scrollTop() {
			var $Top = $(window).scrollTop();
			//console.log($offsetTop);
			if ($Top > $offsetTop) {
				$scrollInput.css({
						'position'    : 'fixed',
						'top'         : 0,
						'left'        : 0,
						'z-index'     : '100',
						'box-shadow'  : '0 3px 7px rgba(0,0,0,0.13)'
					})
					.parent().css({
						'padding-top' : '90px'
					}).find('.query_hot').css('font-size', '14px');
			} else {
				$scrollInput.css({
						'position'    : 'static',
						'box-shadow'  : 'none'
					})
					.parent().css({
						'padding-top' : 10
					}).find('.query_hot').css('font-size', '16px');
			}
		}



        /*检索页手机版标题/全文切换*/
        var $btn_change = $('.mobile_btn');
        $btn_change.on('click', 'button', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.addClass('active')
                .siblings().removeClass('active');
        });
        /*- end -*/


        //文章页弹出二维码
        if ($('.article_opt span').length > 0) {
            $('.article_opt .sseicon-icon_share').on('click', function (event) {
                event.preventDefault();
                $('.share_slide').toggle();
            });
        }

        /*最新公告切换箭头显示和内容显示*/
        var tabHide = $('.js_only_define_it').find('.sse_list_1');
        tabHide.hide();
        tabHide.eq(0).show(); //开始只显示第一个列表

        var changeArrowDirection = function (target) {
            //alert(target.id);
            var _index      = $(target).index();
            var $parentNode = $(target).closest('.nav-tabs');
            var $sibNode    = $parentNode.siblings('.tab-content');
            var $childWrap  = $sibNode.find('.tab-pane').eq(_index);
            var $child      = $childWrap.find('.sse_list_1');
            var $eq0        = $child.eq(0);
            var $eq1        = $child.eq(1);
            if (!$(target).hasClass('off')) {

                $(target).find('.glyphicon').each(function (i) {
                    if ($(this).hasClass('glyphicon-arrow-down')) {
                        $(this).addClass('glyphicon-arrow-up').removeClass('glyphicon-arrow-down');
                        $eq1.show().siblings().hide();
                    } else {
                        $(this).addClass('glyphicon-arrow-down').removeClass('glyphicon-arrow-up');
                        $eq0.show().siblings().hide();
                    }
                });

            } else {
                $('.on').each(function () {
                    $(this).removeClass('on').addClass('off');
                });
                $(target).removeClass("off");
                $(target).addClass("on");
                $(target).find(".glyphicon").each(function (i) {
                    if ($(this).hasClass('glyphicon-arrow-down')) {
                        $eq0.show().siblings().hide();
                    } else {
                        $eq1.show().siblings().hide();
                    }
                });
            }
        };
        /*绑定调用的触发点*/
        $('#comCodeSort').bind('click', function (event) {
            changeArrowDirection(this);
        });
        $('#dateSort').bind('click', function (event) {
            changeArrowDirection(this);
        });

        /*- end -*/


        //文本放大、缩小
        if ($('.article-infor').length > 0) {
            $(".article-infor").each(function () {
                var $this = $(this),
                    //                    $this_p = $this;
                    $this_p = $this.find('.allZoom'); //需要所包含的所有内容都可放大缩小
                if ($this_p.length > 0) {
                    var fsize = $this_p.css("font-size"),
                        textsize = parseInt(fsize, 10),
                        px = fsize.slice(-2);
                    $this.on('click', '.article_opt .zoom', function () {
                        var type = $(this).attr("data-type"),
                            new_textsize = type == "zoom_in" ? textsize + 2 : textsize - 2;
                        if (new_textsize <= 20 && new_textsize >= 10) {
                            textsize = new_textsize;
                            $this_p.css("font-size", textsize + px);
                            $this_p.find('*').css('font-size', textsize + px);
                            //需要所包含的所有内容(如表格内容等)都可放大缩小
                        }
                    });
                }
            });
        }
        

        var $intro_el = $(".new_view_shows");
        if ($intro_el.length !== -1) {
            var show1 = $intro_el.find('.show1');
            var show2 = $intro_el.find('.show2');
            var mouse_trac = $('.mouse_trac');
            var img1 = $intro_el.find('.screenshot1');
            var img2 = $intro_el.find('.screenshot2');

            var initImgPostion = function (imgs) {
                if (imgs.width() == '0') {
                    imgs.on("load", function () {
                        imgs.css({
                            right: 'auto',
                            left: ($(window).width() - imgs.width()) / 2
                        });
                    });
                } else {
                    imgs.css({
                        right: 'auto',
                        left: ($(window).width() - imgs.width()) / 2
                    });
                }
                show2.css('overflow', 'hidden');
            };
            new initImgPostion(img2);
            $intro_el.closest(".intro_blocks").on('mousemove', function (e) {
                var mx = e.pageX;
                //var my = e.pageY - $(window).scrollTop();
                mouse_trac.css({
                    top: '50%',
                    marginTop: '-20px',
                    left: mx - mouse_trac.width() / 2
                });
                show2.width(mx);
            });
            /*if (document.getElementById("mob_app_down")) {
				var ua = navigator.userAgent.toLowerCase();
				var _url = "https://itunes.apple.com/cn/app/shang-jiao-suo/id1052655424?l=cn&mt=8";
				if (/iphone|ipad|ipod/.test(ua)) {
					$(document.getElementById("mob_app_down")).attr("href", _url);
					$(document.getElementById("mob_app_down2")).attr("href", _url);
				}
			}*/
        }

        //锁定表格列
        window.fixtables = {};
        var fixedtablesfn = function () {
            var _this = this;
            _this.options = {
                tables: '.fixedTables',
                isIElt7: (function () {
                    return document.all && !document.querySelector;
                })() || null,
                splitWidth: 767, // 定义不套用冻结列的宽度，小于等于这个宽度就不套用。
                fixedColumnAttr: "fixedcol",
                fixedColumnInsideWrap: ".sse_table_T01",
                fixedColumnClass: "fixedcolumn",
                fixedTableWrapper: $("<div class='textfixedcolumnWrap'>")
            };
            _this.cacheElement = {
                $tables: [],
                $floadDiv: [],
                $fixedColumnInsideWrap: [],
                isFixedTable: false
            };
            _this.initFixedTable = function () {
                var getTables = $(_this.options.tables);
                if (!getTables) {
                    return;
                }
                if (document.all && !document.querySelector) {
                    return;
                }
                $(window).off('fixedtableEvent');
                $(window).on('resize.fixedtableEvent', function () {
                    if ($(window).width() <= 767) {
                        //console.log('小于')
                        _this.destroyFixedTable();
                    } else if ($(window).width() > 767) {
                        //console.log('大于')
                        _this.initFixedTable();
                    }
                });
                if ($(window).width() <= _this.options.splitWidth) {
                    return;
                }
                _this.cacheElement.$tables = getTables;
                _this.cacheElement.$tables.each(function (thisIndex, thisElement) {
                    var $this = $(thisElement);
                    if ($this.attr("isFixed") == 'true') {
                        return;
                    }
                    var $allTr = $this.find("tr");
                    var fixedIndex = parseInt($this.attr(_this.options.fixedColumnAttr));
                    var isth = $allTr.eq(0).find("th");
                    var istd = $allTr.eq(0).find("td");
                    var $forCountElemen; //获取用于计算宽度的元素
                    var countWidth = 0; //初始化计算的宽度
                    var $winWidth = $(window).width();
                    if (isth.length) {
                        $forCountElemen = isth;
                    }
                    if (istd.length) {
                        $forCountElemen = istd;
                    }
                    if (!isth.length && !isth.length) {
                        return;
                    }
                    if ($winWidth < 768) {
                        fixedIndex = 0;
                    }
                    $forCountElemen = $forCountElemen.eq(fixedIndex).prevAll();
                    $forCountElemen.each(function (i, el) {
                        var $el = $(el);
                        countWidth = countWidth + $el.outerWidth();
                    });
                    var floadDiv = $('<div class="tableFloadColumn">').clone();
                    $this.find(_this.options.fixedColumnInsideWrap).append(floadDiv);
                    floadDiv.css({
                        overflow: 'hidden',
                        position: "absolute",
                        top: '0px',
                        left: '0px'
                    });
                    floadDiv.append($this.find("table").clone());
                    floadDiv.width(countWidth);
                    $this.find(_this.options.fixedColumnInsideWrap).css({
                        'margin-left': countWidth,
                        'overflow': 'auto'
                    });
                    $this.find(_this.options.fixedColumnInsideWrap).find("table").eq(0).css({
                        marginLeft: -countWidth
                    });
                    _this.cacheElement.$floadDiv[thisIndex] = $this.find('.tableFloadColumn');
                    _this.cacheElement.$fixedColumnInsideWrap[thisIndex] = $this.find(_this.options.fixedColumnInsideWrap);
                    $this.attr("isFixed", true);
                    _this.cacheElement.isFixedTable = true;
                });

            };
            //销毁	
            _this.destroyFixedTable = function (isTrue) {
                var $fe = _this.cacheElement.$floadDiv;
                var $tbes = _this.cacheElement.$tables;
                var $tbe = _this.cacheElement.$fixedColumnInsideWrap;
                $.each($fe, function () {
                    $(this).remove();
                });
                $.each($tbe, function () {
                    $(this).removeAttr('style');
                    $(this).find("table").eq(0).removeAttr('style');
                });
                $.each($tbes, function (index, elem) {
                    var _ts = $(elem);
                    if (_ts.attr("isFixed")) {
                        _ts.removeAttr('isFixed');
                    }
                });
                $fe = null;
                $tbe = null;
                _this.cacheElement.$floadDiv = [];
                _this.cacheElement.$fixedColumnInsideWrap = [];
                _this.cacheElement.$tables = null;
                _this.cacheElement.isFixedTable = false;
                if (isTrue === true) {
                    $(window).off('.fixedtableEvent');
                }
            };
        };

        fixtables = new fixedtablesfn();
        fixtables.initFixedTable();

        //下拉选择框
        if ($('.single_select').length > 0) {
            require(['multipleselect'], function () {
                $('.single_select').multipleSelect({
                    width: '100%',
                    selectAll: false,
                    single: true,
                    multipleWidth: false,
                    maxHeight: 250,
                    placeholder: "请选择",
                    countSelected: false,
                    allSelected: false,
                    onClick: function (obj) {
                        if (typeof (tableFun) != 'undefined') {
                            var objFun = tableFun[obj.label];
                            if (objFun !== undefined) {
                                objFun();
                            }
                        }
                    }
                });
                //下拉框的选中值可以按如下方式获取,注意要加id属性
                // var single_select_1 = $('#single_select_1').multipleSelect('getSelects');
                // console.log(single_select_1);
            });
        }
        //模糊查询输入框
        if ($('#product_search').length > 0) {
            require(["typeahead"], function () {
                $('#product_search').typeahead({
                    source: function (query, process) {
                        return ["Deluxe Bicycle", "Super Deluxe Trampoline", "Super Duper Scooter"];
                    },
                    highlighter: function (item) {
                        return item;
                    },
                    updater: function (item) {
                        //console.log("'" + item + "' selected.");
                        return item;
                    }
                });
            });
        }
        //沪港通饼图
        if ($("#pieChart").length > 0) {
            require(['ec'], function () {
                require(["../chart/hkPie"], function (LvChart) {
                    var chartObj = new LvChart('pieChart');
                    //获取的数据 ajax方式或其他
                    var mydata = {
                        unit: '百万', //单位
                        data: [
                            {
                                name: '当日额度余额',
                                value: 5000
                            },
                            {
                                name: '其他',
                                value: 2000
                            }
                        ]
                    };
                    chartObj._setOptionData(mydata);
                    chartObj.getDataBack();
                });
            });
        }
        //检索页左侧菜单 开发那边已做好，为避免冲突
        /*if ($("#sse_query_menu").length > 0) {
            require(['sse_query_menu'], function (sseQMenuF) {
                sseQMenuF.init();
            });
        }*/
        
        
        /*L06 列表显示p,.details2--js*/
        var listLi = $('.sse_list_6 li');
        var listDetails = listLi.find('.title-details2');
       if( listLi.length > 0 ){     
            $('.sse_list_6 li:first').addClass('cur').find('.title-details2').show();
            listLi.on('click',function(e){
                e.stopPropagation();
                var $this = $(this);
                $this.toggleClass('cur').find('.title-details2').slideToggle().end()
                    .siblings().removeClass('cur').find('.title-details2').slideUp();

                    if( $('.sse_common_second_cn') ){

                        $this.closest('.sse_common_second_cn').siblings()
                                .find('li').removeClass('cur')
                                .find('.title-details2').slideUp();
                    }
            });

            listDetails.on('click',function(e){
                e.stopPropagation();
            });

        }
        //列表判断是不是移动端，选择弹出还是非弹出式
        var getSselist1 = $(".sse_list_1");
        if (getSselist1.length) {
            var $win = $(window);
            getSselist1.each(function (listIndex, listElement) {
                var $this = $(listElement);
                var $listParent = $this;
                //						var $listParent = $this.parent();
                $listParent.on('click', 'a', function (e) {
                    var $thisa = $(this);
                    if ($win.width() > 767) {
                        $thisa.attr('target', '_blank');
                    } else if ($win.width() <= 767) {
                        $thisa.removeAttr('target');
                    }
                });
            });
        }

        var initTabs = function (selector, options) {
            var $selector = $(selector);
            var opt = $.extend({
                childElement: "li",
                data_active_element: "",
                data_hidden_element: ""
            }, options);
            $selector.each(function (index, element) {
                var $self = $(element);
                var $slef_data_active_element = $self.attr("data-active-element");
                var $slef_data_hidden_element = $self.attr("data-hidden-element");
                var childLength = $self.find(opt.childElement).length;
                var $parent = $self.parent();
                if (URL_Request.tabID) {
                    if ($self.parent().attr('id') == URL_Request.tabID) {
                        $slef_data_active_element = URL_Request.tabActive;
                        //console.log("get")
                    }
                }
                //console.log(URL_Request)
                if (!opt.data_active_element && $slef_data_active_element) {
                    opt.data_active_element = $slef_data_active_element;
                    if (opt.data_active_element == "first") {
                        opt.data_active_element = 0;
                    }
                    if (opt.data_active_element == "last") {
                        opt.data_active_element = childLength - 1;
                    }
                    $self.find(opt.childElement).eq(opt.data_active_element).addClass("active");
                } else {
                    $self.find(opt.childElement).eq(opt.data_active_element).addClass("active");
                }
                if (!opt.data_hidden_element && $slef_data_hidden_element) {
                    opt.data_hidden_element = $slef_data_hidden_element;
                    if (opt.data_hidden_element == "last") {
                        opt.data_hidden_element = childLength - 1;
                    }
                    $self.find(opt.childElement).eq(opt.data_hidden_element).addClass("hidden-xs");
                }

                if (opt.data_active_element) {
                    $parent.find(".tab-content").find(".tab-pane").eq(opt.data_active_element).addClass("active").siblings().removeClass("active");
                } else {
                    $parent.find(".tab-content").find(".tab-pane").eq(0).addClass("active").siblings().removeClass("active");
                }

            });
        };
        initTabs(".nav-tabs");

        // 浏览器是否支持input的placeholder
require(['popularize'],function(control){
   if (!placeholderSupport()) {

        $('[placeholder]').focus(function () {

            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }

        }).blur(function () {
            var input = $(this);
            if (input.val() === '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholderSupport');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    }
    
    function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
    } 
});
        //官网介绍页面
        if (document.getElementById("newwebintro")) {
            var $blocks = $(".intro_blocks");
            if ($(window).width() <= 760) {
                $blocks.addClass('thisShow');
            } else {
                require(["waypoints"], function () {
                    $blocks.eq(0).addClass("thisShow");
                    $blocks.waypoint({
                        handler: function (direction) {
                            $(this.element).addClass("thisShow");
                            //.siblings().removeClass("thisShow");
                        },
                        group: 'intro',
                        offset: (function () {
                            //								console.log(this);
                            //								if (this == this.group.first()) {
                            return '80%';
                            //								} else {
                            //									return '50%';
                            //								}
                        })()
                    });
                });
                //alert("newwebintro")
            }
        }
    };
    return sseF;

});


    



/*个股--overview-slide*/

function loadList() {

    var $btnSwitch = $('.btn-switch').hide().css('cursor', 'pointer');
    var $childWidth = $('.swiper-slide').width() * $('.swiper-slide').length;
    var $parentWidth = $('.swiper-wrapper').width();
    var $lastWidth = $('.swiper-slide:last').width();

    //console.log($childWidth);
    if ($childWidth > $parentWidth) {

        $('.button-next').show();
        $btnSwitch.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            var $siblings = $this.siblings('.swiper-wrapper');
            var $moveL = -(($childWidth - $parentWidth) + $lastWidth);
            if ($this.is('.button-next')) {

                $siblings.animate({
                    'left': $moveL
                }, 300);
                //console.log($moveL);
            } else {
                $siblings.animate({
                    'left': 0
                }, 300);
            }

            $this.hide().siblings().not('.swiper-wrapper').show();
        });
    }

}


// 阻止表格文字复制跳转
function preventLinks() {
    //表格点击事件
    var jumpstates = true;
    $(".tdclickable").each(function (index, elem) {

        var mouseX1, mouseY1;
        var mouseX2, mouseY2;
        $(elem).find("tr").each(function (i, el) {
            var $this = $(el);
            var $links = $this.find("a");
            if ($links.length == 1) {
                $this.addClass("isClickTr");
            }
        });


        $(elem).on("mousedown", ".isClickTr", function (e) {
            jumpstates = true;
            mouseX1 = e.pageX;
            mouseY1 = e.pageY;
            $(this).one("mousemove", function () {

                $(this).one("mouseup", function (e) {
                    mouseX2 = e.pageX;
                    mouseY2 = e.pageY;
                    var _nums1 = Math.abs(mouseX1 - mouseX2);
                    var _nums2 = Math.abs(mouseY1 - mouseY2);
                    if (_nums1 >= 12 || _nums2 >= 12) {
                        jumpstates = false;
                    }
                });
            });
        });


    });

    $(".tdclickable").unbind('click').on('click', 'tr', function (e) {
        var $this = $(this);
        var $links = $this.find("a");
        $links.wrapInner("<span>");
        if ($links.length == 1 && jumpstates === true) {
            $links.find("span").eq(0).click();
            e.stopPropagation();
        }
    }).on("click", "a", function (e) {
        e.stopPropagation();
    });

}




        /*检测IE7-8*/ 
        var lteie8 = document.all && !document.addEventListener;
        
        if (lteie8) {
            var $body = $('body');
            var browserVer = '<div class="browserVer" id="browserTips"><div class="browserVer-content">您好，我们检测到您目前使用的浏览器版本较低，可能无法在本网站上获得较好的体验。<br /><span>建议您升级至<a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" class="browserLinks" target="_blank">IE9.0</a>以上、<a href="http://www.google.cn/chrome/browser/" class="browserLinks" target="_blank">Chrome</a>、<a href="http://www.firefox.com.cn/" class="browserLinks" target="_blank">Firefox</a>等浏览器</span>或继续<a href="javascript:;" class="continue browserVer-close" id="count"></a><a href="#" class="old_website" onclick="$(function(){if(col_old_id!=""){window.open(col_old_id)}else{window.open("http://www.sse.com.cn")}})">访问旧版网站。</a><a href="javascript:;" class="continue" id="noTips">不再提示</a></div></div>';
            var $browserVer = $('.browserVer');
            
			if( !$browserVer.length || getCookie('count') == '' ){
				$body.prepend(browserVer);
                
			}

            //添加cookie
			function addCookie(name,cookievalue,time){
				if( name !="" && cookievalue !="" && time !="" ){
						 var expires = new Date();
      expires.setTime(expires.getTime() + time * 1000);
      document.cookie = name + '=' + escape(cookievalue) + ';expires=' + expires.toGMTString();
				}
			}
            
            //获取cookie
			function getCookie(cookieName) {
				var cookieString = document.cookie;
				var start = cookieString.indexOf(cookieName + '=');
				if (start == -1) 
				  return null;
				start += cookieName.length + 1;
				var end = cookieString.indexOf(';', start);
				if (end == -1) return unescape(cookieString.substring(start));
				return unescape(cookieString.substring(start, end));
			}
			//var html = document.getElementsByTagName("html")[0];
            var oBrowserTips = document.getElementById('browserTips');
            var oCount = document.getElementById('count');
            var oNoTips = document.getElementById('noTips');
                //不再提示
				oNoTips.onclick = function(){
				  var count = parseInt(getCookie('count'))+1;
				  addCookie("count",count,"1000");
					//alert(count);
                    //document.body.removeChild(oBrowserTips);
					if(count == 1){
                        document.body.removeChild(oBrowserTips);
                        //oBrowserTips.style.display = 'none';
		          }
				}
                
                //临时关闭当前提示
                oCount.onclick = function(){
                    document.body.removeChild(oBrowserTips);
                }
                
			if (getCookie('count')){
				//alert(getCookie('count'));
				if( getCookie('count') == 1 || getCookie('count') > 1 ){
                    oBrowserTips.style.display = 'none';
				}
				
			  //document.getElementById("count").innerHTML = "您点击了"+getCookie('count')+"次！";
			}else{
				//alert('no cookie');
			  addCookie("count","0","1000");

			}
            
           
        }

   /*var iscookie = document.cookie.indexOf("firstVisit="); //得到分割的cookie名值 
    if (iscookie == -1) { //判断cookie是否存在 
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 999); //设置过期时间 
        document.cookie = "firstVisit=1;expires=" + exdate.toGMTString();
    }*/



    
    

