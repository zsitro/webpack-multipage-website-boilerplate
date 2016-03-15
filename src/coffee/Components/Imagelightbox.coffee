# Imagelightbox events
activityIndicatorOn = ->
	$("<div id=\"imagelightbox-loading\"><div></div></div>").appendTo "body"

activityIndicatorOff = ->
	$("#imagelightbox-loading").remove()

overlayOn = ->
	$("<div id=\"imagelightbox-overlay\"></div>").appendTo "body"

overlayOff = ->
	$("#imagelightbox-overlay").remove()

captionOn = ->
	description = $("a[href=\"" + $("#imagelightbox").attr("src") + "\"] img").attr("alt") or ""
	console.log 'captionOn', description.length
	if description.length
		$caption = $("<div id=\"imagelightbox-caption\">" + description + "</div>").hide().appendTo "body"  if description.length > 0
		captionReposition()
		# closeReposition()
		setTimeout ->
			captionReposition()
			# closeReposition()
			$caption.show()
		, 200

captionOff = ->
	$("#imagelightbox-caption").remove()

arrowsOn = (instance, selector) ->
	$arrows = $("""
		<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left">
			<svg>
				<use xlink:href="#leaf-prev"></use>
			</svg>
		</button>
		<button type="button" class="imagelightbox-arrow imagelightbox-arrow-right">
			<svg>
				<use xlink:href="#leaf-next"></use>
			</svg>
		</button>
	""")
	$arrows.appendTo 'body'
	$arrows.on 'click touchend', (e) ->
		e.preventDefault()
		$this = $(this)
		$target = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]')
		index = $target.index(selector)
		if $this.hasClass('imagelightbox-arrow-left')
			index = index - 1
			if !$(selector).eq(index).length
				index = $(selector).length
		else
			index = index + 1
			if !$(selector).eq(index).length
				index = 0
		instance.switchImageLightbox index
		false
	return

arrowsOff = ->
	$('.imagelightbox-arrow').remove()
	return

captionReposition = ->
	$("#imagelightboxclose").empty()
	$caption = $("#imagelightbox-caption")
	$imagelightbox = $('#imagelightbox')
	return unless $imagelightbox.length
	top = $imagelightbox.offset().top + $imagelightbox.height() - $(window).scrollTop()
	left = $imagelightbox.offset().left
	$caption.css
		position: 'fixed'
		top: top
		left: left

# closeReposition = ->
# 	$close = $("#imagelightboxclose")
# 	$imagelightbox = $('#imagelightbox')
# 	top = $imagelightbox.offset().top - $(window).scrollTop()
# 	left = $imagelightbox.offset().left + $imagelightbox.width()
# 	$close.css
# 		position: 'fixed'
# 		top: top
# 		left: left


$(window).on 'resize', captionReposition
# $(window).on 'resize', closeReposition

initLightbox = ($selector) ->
	console.log 'initLightbox ->', $selector
	$inst = $($selector).imagelightbox
		onStart: ->
			overlayOn()
			arrowsOn( $inst, $selector );
			return

		onEnd: ->
			captionOff()
			overlayOff()
			arrowsOff();
			activityIndicatorOff()
			return

		onLoadStart: ->
			captionOff()
			activityIndicatorOn()
			return

		onLoadEnd: ->
			captionOn()
			activityIndicatorOff()
			$( '.imagelightbox-arrow' ).css( 'display', 'block' );
			return

	return

module.exports =
	init: initLightbox

