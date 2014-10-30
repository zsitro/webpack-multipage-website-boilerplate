$ = require 'jquery'

togglePanel = (e)->
	e.stopPropagation()
	$('[data-mainmenu]').toggleClass 'is-opened'


init = ->
	console.log 'mobileMenu.init()'
	$('[data-mainmenu-toggle]').on 'click', togglePanel


module.exports =
	init: init