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
		el.innerHTML = '<span style="font-family: \'sidebar\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-chevron-down': '&#xe91c;',
		'icon-back': '&#xe917;',
		'icon-check': '&#xe918;',
		'icon-filter': '&#xe919;',
		'icon-option': '&#xe91a;',
		'icon-settings': '&#xe91b;',
		'icon-search': '&#xe916;',
		'icon-arrow-left': '&#xe90f;',
		'icon-arrow-right': '&#xe910;',
		'icon-modal-close': '&#xe911;',
		'icon-archive': '&#xe90b;',
		'icon-delete': '&#xe90c;',
		'icon-edit': '&#xe90d;',
		'icon-invoice-alt': '&#xe90e;',
		'icon-calendar': '&#xe912;',
		'icon-calendar-view': '&#xe913;',
		'icon-filter1': '&#xe914;',
		'icon-notification': '&#xe915;',
		'icon-guest': '&#xe904;',
		'icon-size': '&#xe90a;',
		'icon-bath': '&#xe900;',
		'icon-bed': '&#xe901;',
		'icon-dashboard': '&#xe902;',
		'icon-frontdesk': '&#xe903;',
		'icon-guest1': '&#xe905;',
		'icon-inventory': '&#xe906;',
		'icon-invoice': '&#xe907;',
		'icon-reports': '&#xe908;',
		'icon-roomtype': '&#xe909;',
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
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
