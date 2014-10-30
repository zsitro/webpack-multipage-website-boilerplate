
'use strict';

var $ = require('jquery');

/* Open all external links and PDF in new window
******************************************************/
var baseUrl = window.location.host;

$("body").on(

	'click',

	"a[href^='http:']:not([href*='" + baseUrl + "']), "+
	"a[href^='https:']:not([href*='" + baseUrl + "']), "+
	"a[href$='.pdf']:not([href*='" + baseUrl + "']), "+
	"a[href$='.pdf']"+
	"a.external",

	function() {
		$(this).attr('target','_blank');
	}
);
