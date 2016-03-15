module.exports =
	init: ->
		window_width = 505
		window_height = 370

		$('body').on "click", '[share-social]', (_e) ->
			_e.preventDefault()
			$el = $ @
			__type = $el.attr 'share-social'
			__left = ($(window).width() - window_width) / 2
			__top = ($(window).height() - window_height) / 2
			__opts = "status=1" + ",width=" + window_width + ",height=" + window_height + ",top=" + __top + ",left=" + __left

			window.open $el.attr("href"), $el.attr('share-social'), __opts
			return