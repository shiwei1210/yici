//配置页面加载模块参数
require.config({
	//加载等待时间
	waitSeconds:60,
	urlArgs: (function() {
		return new Date().getTime();
	})(),//版本号
	//配置Javascript文件映射路径
	paths: {
		modernizr             :"../lib/modernizr.custom",
		jquery                :"../lib/jquery.min",
		html5shiv             :"../lib/html5shiv.min",
		respond               :"../lib/respond",
		fastclick             :"../lib/fastclick.min",
		handlebars            :"../lib/handlebars.min.3.0.3",
		bootstrap             :"../lib/bootstrap.min",
		dlmenu                :"../lib/jquery.dlmenu",
		sse                   :"sse",
		waypoints             :"../lib/jquery.waypoints.min",
		numberjs              :"../lib/number",
		sseinfopagination      :"sseinfo-pagination",
		sseinfocontrol      :"sseinfo-control",
		swiper:(function() {
			var isIE = document.all && !window.atob;
			if (isIE) {
				return "../lib/idangerous.swiper.old.min";
			} else {
				return "../lib/idangerous.swiper.min";
			}
		})(),
		fixedheadertable:"../lib/jquery.fixedheadertable.min",
		multipleselect  :"../lib/jquery.multiple.select",
		control         :"../lib/control",
		jqueryCookie    :"../lib/jquery_cookie",
		json            :"../lib/json3",
		popularize      :"popularize",
		qrcode          :"../lib/jquery.qrcode",
		selectjs        :"../lib/jquery.select",
		pdfmodaliefix   :"pdf_modal_oldIEfix" ,//IE9样式修复
   		Pajax           :"ajaxServer",
    	index           :"index",
	},
	shim: {//模块依赖关系 demo
		//'swiperscrollbar'             : {deps:['swiper']},
		//'swiper'                      : {deps: ['jquery']},
		'bootstrap'                     :{deps: ['jquery']},
		'dlmenu'                        :{deps: ['jquery','modernizr']},
		'control'                       :{deps: ['jquery']},
		'sse'                           :{deps: ['bootstrap']},
		'numberjs'                      :{deps: ['bootstrap']},
		'bootstrap_table'               :{deps: ['bootstrap']},
		'bootstrap_table_local'         :{deps: ['bootstrap_table']},
		'bootstrap_table_fixed_columns' :{deps: ['bootstrap_table']},
		'swiper'                        :{deps: ['jquery']},
		'datetimepicker'                :{deps: ['jquery']},
		'fixedheadertable'              :{deps: ['jquery']},
		'multipleselect'                :{deps: ['jquery']},
		'popularize'                    :{deps: ['jquery','jqueryCookie','json','sse']},
		'qrcode'                        :{deps: ['jquery']},
		'selectjs'                      :{deps: ['jquery']}
	}
});


var isIE8 = '\v'=='v';
if (isIE8) {
	var thisel = document.documentElement;
	var cssClassName = "lte-ie8";
	if (thisel.classList){thisel.classList.add(cssClassName);}
	else{thisel.className += ' ' + cssClassName;}
	require(['respond']);
	require(['html5shiv']);
}


//配置页面加载模块

var rxaosp = navigator.userAgent.match(/AppleWebKit\/([\d.]+)/);

if ( rxaosp && parseInt(rxaosp[1]) <= 535) {
	window.oldwebkit = true;
} else {
	window.oldwebkit = false;
}

if ('ontouchstart' in window) {
	require(["fastclick"], function(fastclick) {
		fastclick.attach(document.body);
	});
}

require(['sse'], function (sse){
	$(function() {
		var isIE7 = document.all && !document.querySelector;
        if (isIE7) {
            (function() {
				function addIcon(el, entity) {
					var html = el.innerHTML;
					el.innerHTML = '<strong style="font-style:normal;margin:0;padding:0;font-weight:normal;font-family: \'sseicon\'">' + entity + '</strong>' + html;
				}
				var icons = {
					'sseicon-icon_menu'        : '&#xe610;',
					'sseicon-icon_prompt'      : '&#xe60f;',
					'sseicon-icon_more'        : '&#xe60e;',
					'sseicon-slide-icon-left'  : '&#xe60c;',
					'sseicon-slide-icon-right' : '&#xe60d;',
					'sseicon-icon_phone'       : '&#xe60b;',
					'sseicon-icon_fontSizeDown': '&#xe607;',
					'sseicon-icon_fontSizeUp'  : '&#xe608;',
					'sseicon-icon_print'       : '&#xe609;',
					'sseicon-icon_share'       : '&#xe60a;',
					'sseicon-nav_icon_1'       : '&#xe600;',
					'sseicon-nav_icon_2'       : '&#xe601;',
					'sseicon-nav_icon_3'       : '&#xe602;',
					'sseicon-nav_icon_4'       : '&#xe603;',
					'sseicon-nav_icon_5'       : '&#xe604;',
					'sseicon-nav_icon_6'       : '&#xe605;',
					'sseicon-nav_icon_7'       : '&#xe606;',
					'0': 0
					},
					els = document.getElementsByTagName('*'),
					i, c, el;
				for (i = 0; ; i += 1) {
					el = els[i];
					if(!el) {
						break;
					}
					c = el.className;
					c = c.match(/sseicon-[^\s'"]+/);
					if (c && icons[c[0]]) {
						addIcon(el, icons[c[0]]);
					}
				}
			}());
        }

        var isIE9 = document.all && document.addEventListener && !window.atob;
        if (isIE9) {
            $("html").addClass("ie9");
        }
		sse.init();
	});
});

require(['control'], function (control) {
	$(function () {
		if (typeof (control) != 'undefined') {
			control.init();
		}
	});
}, function (err) {

});

require(['popularize'], function (popularize) {
	popularize.process();
});
//分页引用文件
require(['sseinfocontrol'],function(control){
	control.listPage();//列表分页
});
require(['fundmaster'], function (fundmaster){
	$(function() {
		fundmaster.init();
	});
});


var webComm = {};
var currpage = $("#pagename").val();
if(currpage==""||currpage==undefined||currpage==null){

}else{
	require(['Pajax',currpage],function(Pajax,page){
	webComm.Pajax = Pajax;
	page.init();
});

}
