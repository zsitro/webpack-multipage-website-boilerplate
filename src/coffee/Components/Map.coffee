featureDetection = require './../Helpers/FeatureDetection.coffee'

grayStyle = [{
	featureType: "all"
	elementType: "all"
	stylers: [
		{ saturation: -100 }
	]
}];

defaultOptions =
	zoom: 8,
	scrollwheel: 8,
	draggable: !(featureDetection.touch and $(window).outerWidth() <= 1024)
	icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAA8CAMAAAAjZwjSAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABCFBMVEVikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikidikif///+APUVfAAAAVnRSTlMAAjd5rNLu+hyH4xSV+VjrWQSXCrOxmFcT7RUe4kMNtHh807LsQfcM/ebUqHtzOB3x8AXa2Uu5uCiREGkDrq0hhuVfAcn+oqMb8wjeVb8w/JnvcXLXSjtL3UMAAAABYktHRFd9CtkfAAAACXBIWXMAAAsSAAALEgHS3X78AAABwElEQVRIx43V51LCQBQF4JNAjCARRbCgooghYkFFsSv23st9/0exxAy7m23n55lvksnN5gZg47iZrDfg+wNeNuM6UGUwlycm+dyglA0VAhISFIbSbrhIkhRHBDZaIkVKo6wbK5My5THmehXSpNK/5jhpM564CTLk/4kmiyY4Vf2DJZP7v/m0b4b+9A/MmR1R7ucc5G3gjAPXxhG5yIhVebZWm50T23lkhaYez6wu1FksCNdL3kKD7xewyBdhAkO+X4RwWmsJrPF9gKYCRny/hJbdrafg8UVD8TDLWBHmsBq7VaFewZo42koYRWFDbNfQJqu4cFo2ruXYHzOsB2YX/B5cFMyw8DeJ6obJbcYfV3pC6dnE6Wzp3XYneV1dPez2l8+Ozu0y22xP8237e+ze21fDfW6RHij3T/GAX7mHKngo7OYjT+68I3HZh3IYIpVjmTuR/Gd6zbRr9iQQp2l4KnOIzkR3FkkhzkV4Lne4uOTd5YUCon3Fuqs2lLlm4Y3a4fau7+5uNZBdtHWdw/1D4h7utRCPCXyEIU+xezI5PL/8updnI4x/3q9mh+ob0VvVAuKd6MPGofP52bGC+OpKym+vfeEQ7/AZlwAAAABJRU5ErkJggg=='


module.exports.init = ->
	return unless window.google
	$('[map]').each ->
		_el = $(@)
		_zoom = _el.attr('map-zoom') or defaultOptions.zoom
		_ui = (_el.attr('map-ui') is 'true') or false
		_noMarker = (_el.attr('map-nomarker') is 'true') or false
		_scrollWheel = (_el.attr('map-scroll') is 'true')
		_markerContent = _el.html()
		_coords = _el.attr('map-location').split(',')
		_center = new google.maps.LatLng _coords[0], _coords[1]
		_combinedOptions = $.extend {},
			defaultOptions
			styles: grayStyle
			center: _center
			zoom: ~~_zoom
			scrollwheel: _scrollWheel
			disableDefaultUI: _ui

		_map = new google.maps.Map @, _combinedOptions




		# --------------
		unless _noMarker
			_marker = new google.maps.Marker
				position: _center,
				map: _map,
				icon: defaultOptions.icon,
				title: 'Bouvard Fleurs'
				flat: true
				optimized: false
				visible: true

			if _markerContent
				_infowindow = new google.maps.InfoWindow
					content: _markerContent,
					maxWidth: 300

				google.maps.event.addListener _marker, 'click', ->
					_infowindow.open _map, _marker


		# To avoid crappy situations where they
		# initialize within a collapsed div due to lag
		# ---------------------------------------------- #
		setTimeout ->
			google.maps.event.trigger _map, 'resize'
			_map.setZoom _map.getZoom()
			console.log 'resized', _map
		, 2000
