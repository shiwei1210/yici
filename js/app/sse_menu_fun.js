if (typeof (col_id) === 'undefined') {
	var col_id = 8565;
}
//菜单cookie
var sseMenuCookie = {
	set:function(cname, cvalue, exdays) {//设置cookie
		this.clear(cname);
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires +"; path=/; domain="+document.domain;
	},
	get:function(cname) {//获取cookie
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') {
				c = c.substring(1);
			}
	        if (c.indexOf(name) != -1) {
				return c.substring(name.length, c.length);
			}
	    }
	    return "";
	},
	clear:function(cname) {//清除cookie
		var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=this.get(cname);
	    if(cval!==null){
        	document.cookie= cname + "="+cval+";expires="+exp.toGMTString();  
        }
	}
};
var sseMenuObj = {
	menu_tab_text: '', //主菜单
	menu_con_text: '', //hover状态下显示的二三级菜单
	mobile_menu_text: '', //手机版菜单
	menu_type: '1', //菜单类型，默认为主菜单
	siteObj: {},
	act_id: col_id, //左侧菜单激活的id
	specialNodeObj: {},
	getNodeChild: function (node) { //获取栏目子菜单
		function compare(v1, v2) {
			return v1.order - v2.order;
		}
		if (typeof (node) !== 'object') { //如果找不到对应的栏目
			return [];
		}
		var lv = [],
			childArr = node.children.split(";");
		for (var i = 0, len = childArr.length; i < len; i++) {
			var theNode = this.formatNode(childArr[i]);
			if (typeof (theNode) == 'object') {
				lv.push(theNode);
			}
		}
		return lv.sort(compare);
	},
	getNodeSpeChild: function (node) { //获取快捷栏目子菜单
		function compare_sorder(v1, v2) {
			return v1.sorder - v2.sorder;
		}
		if (typeof (node) != 'object') { //如果找不到对应的栏目
			return [];
		}
		var lv = [[], [], [], []],
			childArr = node.children.split(";"),
			hasChild = false;
		for (var i = 0, len = childArr.length; i < len; i++) {
			var theNode = this.formatNode(childArr[i]);
			if (typeof (theNode) == 'object') {
				var col = parseInt(theNode.sorder / 10) - 1;
				if (col >= 0 && col < lv.length) {
					hasChild = true;
					lv[col].push(theNode);
				}
			}
		}
		if (!hasChild) {
			return [];
		}
		for (var j = 0, len2 = lv.length; j < len2; j++) {
			lv[j] = lv[j].sort(compare_sorder);
		}
		return lv;
	},
	formatNode: function (key) { //格式化栏目节点
		var obj = SSE_MENU_28[key];
		if (typeof (obj) != 'object') { //如果找不到对应的栏目
			return false;
		}
		var checkFlag = arguments[1] ? 1 : 0;
		if (!checkFlag && key != '0') {
			if (obj.DISPLAY == '0') { //如果不是栏目
				return false;
			}
			if (this.menu_type == "1" && obj.TYPE.split(";").indexOf("1") < 0) { //判断菜单类型-主菜单
				return false;
			} else if (this.menu_type == "2" && obj.TYPE.split(";").indexOf("2") < 0) { //判断菜单类型-左侧菜单
				return false;
			} else if (this.menu_type == "3" &&
				obj.TYPE.split(";").indexOf("1") < 0 &&
				obj.TYPE.split(";").indexOf("2") < 0) {
				return false;
			}
		}
		return {
			code: key, //栏目id
			pcode: obj.PARENTCODE, //父栏目id
			label: key == '0' ? '首页' : obj.CHNLNAME, //标题
			href: key == '0' ? '/home/' : obj.URL, //链接
			sorder: obj.SHORTCUTORDER, //快捷栏目类型序号
			order: obj.ORDER, //显示顺序
			target: obj.TARGET == '1' ? '_blank' : '_self', //打开窗口方式
			children: obj.CHILDREN, //子菜单
			nodeStyle: 'menu_style_' + obj.STYLE, //显示样式 0=新栏目
			active: key == sseMenuObj.act_id ? "active" : '' //是否是当前页面
		};
	},
	//检查当前专栏是否是前一页专栏的子级
	checkSpecialCookie:function(node){
		var specialNode = sseMenuCookie.get('sseMenuSpecial');
		function compareSpecial(key){
			var currNode = SSE_MENU_28[key];
			if(currNode.PARENTCODE == '0'){
				sseMenuCookie.set('sseMenuSpecial',node,1);
				return node;
			}
			if(currNode.PARENTCODE == specialNode){
				return specialNode;
			}
			return compareSpecial(currNode.PARENTCODE);
		}
		if(specialNode === '') {
			sseMenuCookie.set('sseMenuSpecial',node,1);
			return node;
		}else{
			return compareSpecial(node);
		}
	}, 
	findSpecialNode: function (key) { //查找最近的专栏
		var currNode = SSE_MENU_28[key];
		if (typeof (currNode) != 'object') { //如果找不到对应的栏目
			return false;
		}
		if ((currNode.DISPLAY == "0" || currNode.TYPE.split(";").indexOf('2') < 0) && sseMenuObj.act_id == key) {
			sseMenuObj.act_id = currNode.PARENTCODE;
			return this.findSpecialNode(sseMenuObj.act_id);
		}
		if ( currNode.ISSPECIALCHANNEL == "1" ||  currNode.PARENTCODE == '0') { //如果当前栏目是专栏或者一级菜单，直接返回当前节点
			key = this.checkSpecialCookie(key);
			var theNode = this.formatNode(key),
				lv = this.getNodeChild(theNode);
			if (lv.length === 0) { //如果此专栏没有子菜单，则显示父级及其兄弟
				theNode = this.formatNode(currNode.PARENTCODE);
				sseMenuCookie.set('sseMenuSpecial',currNode.PARENTCODE,1);
				lv = this.getNodeChild(theNode);
			}
			return {
				node: theNode,
				lv: lv
			};
		}
		return this.findSpecialNode(currNode.PARENTCODE); //如果当前栏目不是专栏，往上继续查找
	},
	findBreadNode: function () { //查找面包屑
		var lv = [];

		function findParent(key) {
			var currNode = SSE_MENU_28[key];
			if (typeof (currNode) != 'object' || key === '') { //如果找不到对应的栏目
				return false;
			}
			lv.push(sseMenuObj.formatNode(key, 1));
			if (currNode.CHNLNAME === "首页" && currNode.PARENTCODE == "0") {
				return false;
			}
			findParent(currNode.PARENTCODE);
		}
		findParent(col_id);
		return lv;
	},
	findMainActive: function () { //查找主菜单激活状态id
		var activeIdx = '';

		function findParentMenu(key) {
			var currNode = SSE_MENU_28[key];
			if (typeof (currNode) != 'object' || key === '') { //如果找不到对应的栏目
				return false;
			}
			if (currNode.PARENTCODE === "0") {
				activeIdx = key;
				return false;
			}
			findParentMenu(currNode.PARENTCODE);
		}
		findParentMenu(col_id);
		return activeIdx;
	}
};
//pc版主菜单
sseMenuObj.initPcMainMenu = function () {
	this.menu_type = '1';
	var menu_tab = '<ul class="nav navbar-nav equal_nav equal_nav-7" id="menu_tab">', //主菜单
		menu_con = '', //hover状态下显示的二三级菜单
		currNode = null,
		hasChild = 0, //有二三级菜单的索引值
		lv1 = this.getNodeChild(this.siteObj),
		activeIdx = this.findMainActive();
	for (var i = 0, len = lv1.length; i < len && i < 7; i++) {
		var sssld = '',
			navClass = '',
			currNode_1 = lv1[i],
			lv2 = this.getNodeSpeChild(currNode_1);
		//如果有第二级菜单
		if (lv2.length > 0) {
			menu_con += '<div class="trow row">';
			for (var j = 0, len2 = lv2.length; j < len2; j++) {
				var the_col = lv2[j];
				if (j == len2 - 1) {
					menu_con += '<div class="col-sm-3 no-border">';
				} else {
					menu_con += '<div class="col-sm-3">';
				}
				for (var k = 0, len3 = the_col.length; k < len3; k++) {
					currNode = the_col[k];
					menu_con += '<div class="block"><h2><a href="' + currNode.href + '" target="' + currNode.target + '" class="' + currNode.nodeStyle + '">' + currNode.label + '</a></h2>';
					var lv3 = this.getNodeChild(currNode);
					//如果有第三级菜单
					if (lv3.length > 0) {
						for (var m = 0, len4 = lv3.length; m < len4; m++) {
							currNode = lv3[m];
							menu_con += '<p><a href="' + currNode.href + '" target="' + currNode.target + '" class="links ' + currNode.nodeStyle + '">' + currNode.label + '</a></p>';
						}
					}
					menu_con += '</div>';
				}
				menu_con += '</div>';
			}
			menu_con += '</div>';
			navClass = 'top_side_show_items';
			sssld = ' side-data="' + (hasChild++) + '"';
		}
		if (activeIdx == currNode_1.code) {
			navClass += ' active';
		}
		menu_tab += '<li class="' + navClass + '"' + sssld + '><a href="' + currNode_1.href + '" target="' + currNode_1.target + '"><i class="sseicon-nav_icon_' + (i + 1) + '"></i>' + currNode_1.label + '</a></li>';
	}
	menu_tab += '</ul>';
	this.menu_tab_text = menu_tab; //主菜单
	this.menu_con_text = menu_con; //hover状态下显示的二三级菜单
};
//手机版菜单
sseMenuObj.initMobileMenu = function () {
	this.menu_type = '2';
	this.mobile_menu_text = '<h2>菜单</h2>' + getMobileMenu(this.siteObj);

	function getMobileMenu(theNode) {
		var ret = '',
			list = sseMenuObj.getNodeChild(theNode);
		for (var i = 0, len = list.length; i < len; i++) {
			var currNode = list[i];
			var list2 = sseMenuObj.getNodeChild(currNode);
			if (list2.length > 0) { //如果有下级菜单
				ret += '<li class="hasMenu ' + currNode.active + '">' +
					'<a href="' + currNode.href + '" target="' + currNode.target + '">' + currNode.label + '</a>' +
					'<ul class="dl-submenu">' +
					'<li class="dl-back"><a href="#"><i class="glyphicon glyphicon-menu-left"></i> 返回</a></li>';
				ret += getMobileMenu(currNode); //递归调用当前函数
				ret += '</ul></li>';
			} else {
				ret += '<li class="' + currNode.active + '"><a href="' + currNode.href + '" target="' + currNode.target + '">' + currNode.label + '</a></li>';
			}
		}
		return ret;
	}
};
//pc版左侧菜单
sseMenuObj.initLeftMenu = function () {
	var menu_lv = 0;
	this.specialNodeObj = this.findSpecialNode(col_id);
	function getNodeMenu(theNode, menu_lv) {
		var lv = sseMenuObj.getNodeChild(theNode);
		var shtml = '';
		var menulv = 'menu_lv_' + menu_lv;
		if (lv.length > 0) {
			var childMenu = '',
				displayStyle = '';
			for (var k = 0, len = lv.length; k < len; k++) {
				currNode = lv[k];
				var theChild = getNodeMenu(currNode, menu_lv + 1);
				childMenu += theChild.html;
				if (theChild.active == 'active') {
					theNode.active = 'active';
				}
			}
			shtml += '<li class="' + menulv + ' ' + theNode.active + '"><a href="javascript:void(0);" target="' + theNode.target + '"class="ib_mid_wrap hasMenu' + ' ' + theNode.active + '"><div class="ib_mid_before"></div><span class="ib_mid">' + theNode.label + '</span><i class="glyphicon"></i></a>';
			if (theNode.active == 'active') {
				displayStyle = ' style="display:block;"';
			}
			shtml += '<ul' + displayStyle + '>' + childMenu + '</ul>';
		} else {
			shtml += '<li class="' + menulv + ' ' + theNode.active + '"><a href="' + theNode.href + '" target="' + theNode.target + '" class="ib_mid_wrap"><div class="ib_mid_before"></div><span class="ib_mid">' + theNode.label + '</span></a>';
		}
		shtml += '</li>';
		return {
			html: shtml,
			active: theNode.active
		};
	}
	this.menu_type = '2';
	var specialNodeObj = this.specialNodeObj;
	if (typeof (specialNodeObj) != 'object') {
		return '';
	}
	var ret = '<li class="menu_title ib_mid_wrap"><div class="ib_mid_before"></div><span class="ib_mid">' + specialNodeObj.node.label + '</span></li>'; //专栏标题
	var lv2 = specialNodeObj.lv;
	//如果有第二级菜单
	for (var j = 0, len2 = lv2.length; j < len2; j++) {
		var currNode = lv2[j];
		var childMenu = getNodeMenu(currNode, 1);
		ret += childMenu.html;
	}
	return ret;
};
//面包屑
sseMenuObj.initBreadMenu = function () {
	var currNode = null,
		lv = this.findBreadNode();
	var ret = '';
	for (var i = lv.length - 1; i >= 0; i--) {
		currNode = lv[i];
		ret += '<li><a href="' + currNode.href + '" target="' + currNode.target + '">' + currNode.label + '</a>';
		if (i > 0) {
			ret += '<i class="sseicon-slide-icon-right"></i>';
		}
		ret += '</li>';
	}
	return ret;
};
//网站地图
sseMenuObj.initSiteMap = function () {
	this.menu_type = '3';
	var ret = '', 
		lv1 = this.getNodeChild(this.siteObj);
	for (var i = 0, len = lv1.length; i < len; i++) {
		var currNode_1 = lv1[i],
			lv2 = this.getNodeChild(currNode_1);
		ret += '<div class="sse_list_tit1 red_bottom_border"><h2><a href="' + currNode_1.href + '" target="' + currNode_1.target + '"><i class="sseicon-icon_more hidden-xs"></i></a><span>' + currNode_1.label + '</span></h2></div>';
		//如果有第二级菜单
		if (lv2.length > 0) {
			ret += '<div class="sse_sitemap_wrap"><ul class="sse_sitemap light_grey">';
			for (var j = 0, len2 = lv2.length; j < len2; j++) {
				var currNode_2 = lv2[j],
					lv3 = this.getNodeChild(currNode_2);
				ret += '<li><em><a href="' + currNode_2.href + '" target="' + currNode_2.target + '">' + currNode_2.label + '</a></em>';
				//如果有第三级菜单
				if (lv3.length > 0) {
					ret += '<p>';
					for (var k = 0, len3 = lv3.length; k < len3; k++) {
						var currNode_3 = lv3[k];
						ret += '<a href="' + currNode_3.href + '" target="' + currNode_3.target + '">' + currNode_3.label + '</a>';
					}
					ret += '</p>';
				}
				ret += '</li>';
			}
			ret += '</ul></div>';
		}
	}
	return ret;
};
//菜单初始化
sseMenuObj.init = function () {
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (elt /*, from*/ ) {
			var len = this.length >>> 0;
			var from = Number(arguments[1]) || 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			if (from < 0) {
				from += len;
			}
			for (; from < len; from++) {
				if (from in this && this[from] === elt) {
					return from;
				}
			}
			return -1;
		};
	}
	this.siteObj = this.formatNode('0'); //获取根节点对象
	this.initPcMainMenu();
	this.initMobileMenu();
};
sseMenuObj.init();
