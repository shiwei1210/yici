/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'sseicon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'sseicon-icon_menu': '&#xe610;',
		'sseicon-icon_prompt': '&#xe60f;',
		'sseicon-icon_more': '&#xe60e;',
		'sseicon-slide-icon-left': '&#xe60c;',
		'sseicon-slide-icon-right': '&#xe60d;',
		'sseicon-icon_phone': '&#xe60b;',
		'sseicon-icon_fontSizeDown': '&#xe607;',
		'sseicon-icon_fontSizeUp': '&#xe608;',
		'sseicon-icon_print': '&#xe609;',
		'sseicon-icon_share': '&#xe60a;',
		'sseicon-nav_icon_1': '&#xe600;',
		'sseicon-nav_icon_2': '&#xe601;',
		'sseicon-nav_icon_3': '&#xe602;',
		'sseicon-nav_icon_4': '&#xe603;',
		'sseicon-nav_icon_5': '&#xe604;',
		'sseicon-nav_icon_6': '&#xe605;',
		'sseicon-nav_icon_7': '&#xe606;',
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
