module.exports.init = ->
	$('[data-toggle="popover"]').popover
		placement: (tip, ele) ->
			width = $(window).width()
			# return width >= 975 ? 'left' : ( width < 600 ? 'top' : 'right' )
			return 'top'