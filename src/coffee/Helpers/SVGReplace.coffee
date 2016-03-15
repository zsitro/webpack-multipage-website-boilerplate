module.exports.init = ->
	$ ->
		$('[svg-replace]').each ->
			$img = $(@)
			imgID = $img.attr('id')
			imgClass = $img.attr('class')
			imgURL = $img.attr('src')

			$.get imgURL, (data) ->
				# Get the SVG tag, ignore the rest
				$svg = jQuery(data).find('svg');

				# Add replaced image's ID to the new SVG
				if(typeof imgID != 'undefined')
					$svg = $svg.attr('id', imgID);

				# Add replaced image's classes to the new SVG
				if(typeof imgClass != 'undefined')
					$svg = $svg.attr('class', imgClass+' replaced-svg');

				# Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a')

				# Replace image with new SVG
				$img.replaceWith($svg)

				App.events.trigger 'svg:resize'

			, 'xml'

