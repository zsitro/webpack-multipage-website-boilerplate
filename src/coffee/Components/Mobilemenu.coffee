$handler = $ '[mobilemenu-handler]'
$content = $ '[mobilemenu-content]'
$headerBar = $ '[header-bar]'

toggleMenu = ->
	$content.toggleClass 'is-opened'
	$handler.toggleClass 'is-active'
	# $headerBar.toggleClass 'is-absolute'


	if $content.hasClass 'is-opened'
		App.utils.scrollTo $handler

init = ->
	$handler.on 'click', (e) ->
		e.preventDefault()
		toggleMenu()


module.exports.init = init
