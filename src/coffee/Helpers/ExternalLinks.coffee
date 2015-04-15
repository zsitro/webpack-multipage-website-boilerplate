# Open all external links and PDF in new window
# ---------------------------------------------- #
baseUrl = window.location.host

module.exports.attachListener = ->

	$("body").on 'click',

		"a[href^='http:']:not([href*='" + baseUrl + "']), "+
		"a[href^='https:']:not([href*='" + baseUrl + "']), "+
		"a[href$='.pdf']:not([href*='" + baseUrl + "']), "+
		"a[href$='.pdf']"+
		"a.external",

		->
			$(this).attr 'target', '_blank'