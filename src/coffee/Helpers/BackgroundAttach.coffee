class BackgroundAttach
	instance = null

	constructor: ->
		if instance
			return instance
		else
			instance = this

	run: ->
		console.log 'BackgroundAttach:run'
		$('[background], [icon-url]').each ->
			url = $(@).attr('background') or $(@).attr('icon-url')
			# console.log 'asdf', url, (url isnt 'background')
			if !url or (url is 'background')
				url = $(@).find(' > img').first().attr 'src'
				$(@).find('> img').first().remove()
			if url isnt undefined
				$(@).css 'background-image', 'url('+url+')'
		@

	attachListener: ->
		$('body').on arguments[0], @init
		@

	init: @::run
	runOn: @::attachListener

module.exports = new BackgroundAttach()
