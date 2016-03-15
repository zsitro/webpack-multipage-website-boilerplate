

$header = $('[header]')
$headerBottom = $('[header-bar]')
# triggerHeight = ->
# 	$header.outerHeight()-70

# checkFix = ->
# 	currentScrollTop = $(window).scrollTop()
# 	if (currentScrollTop >= triggerHeight()) and ( $(window).width() >= 992 )
# 		unless $headerBottom.hasClass 'is-fixed'
# 			$headerBottom.addClass 'is-fixed'
# 	else
# 		$headerBottom.removeClass 'is-fixed'

# ----------------------------------------------------------------

init = ->

	# SCROLL DOWN BUTTON
	# ---------------------------------------------- #
	# $('[header-scroll]').on 'click', ->
	# 	App.utils.scrollTo '.header-bar'


	# HEADER SHADOW ON SCROLL
	# ---------------------------------------------- #
	do headerShadow = ->
		$('[header-bar]').toggleClass 'has-shadow', ($(window).scrollTop() > 40)

	$(window).on 'scroll', headerShadow


# module.exports = new HeaderShare()
module.exports =
	init: init

