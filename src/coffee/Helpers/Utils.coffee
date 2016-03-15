class Utils
	instance = null

	constructor: ->
		if instance
			return instance
		else
			instance = this

	isPage: ->
		$('body').hasClass 'l-'+arguments[0]
	attachTo: ->
		arguments[0].utils = @
	scrollTo: ->
		target = $ arguments[0]
		offset = arguments[1] or 0
		callback = arguments[2] or ->
		# target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if target.length
			console.log '.animate line'
			$('html,body').animate(
				scrollTop: (target.offset().top + offset)
			, 600).promise().done ->
				callback()

module.exports = new Utils()
