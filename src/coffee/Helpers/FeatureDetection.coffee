browserDetection =
	init: ->
		@browser = @searchString(@dataBrowser) or 'An unknown browser'
		@version = @searchVersion(navigator.userAgent) or @searchVersion(navigator.appVersion) or 'an unknown version'
		@OS = @searchString(@dataOS) or 'an unknown OS'
		return

	searchString: (data) ->
		i = 0
		while i < data.length
			dataString = data[i].string
			dataProp = data[i].prop
			@versionSearchString = data[i].versionSearch or data[i].identity
			if dataString
				if dataString.indexOf(data[i].subString) != -1
					return data[i].identity
			else if dataProp
				return data[i].identity
			i++
		return

	searchVersion: (dataString) ->
		index = dataString.indexOf(@versionSearchString)
		if index == -1
			return
		parseFloat dataString.substring(index + @versionSearchString.length + 1)

	dataBrowser: [
		{
			string: navigator.userAgent
			subString: 'Chrome'
			identity: 'Chrome'
		}
		{
			string: navigator.userAgent
			subString: 'OmniWeb'
			versionSearch: 'OmniWeb/'
			identity: 'OmniWeb'
		}
		{
			string: navigator.vendor
			subString: 'Apple'
			identity: 'Safari'
			versionSearch: 'Version'
		}
		{
			prop: window.opera
			identity: 'Opera'
		}
		{
			string: navigator.vendor
			subString: 'iCab'
			identity: 'iCab'
		}
		{
			string: navigator.vendor
			subString: 'KDE'
			identity: 'Konqueror'
		}
		{
			string: navigator.userAgent
			subString: 'Firefox'
			identity: 'Firefox'
		}
		{
			string: navigator.vendor
			subString: 'Camino'
			identity: 'Camino'
		}
		{
			string: navigator.userAgent
			subString: 'Netscape'
			identity: 'Netscape'
		}
		{
			string: navigator.userAgent
			subString: 'MSIE'
			identity: 'Explorer'
			versionSearch: 'MSIE'
		}
		{
			string: navigator.userAgent
			subString: 'Gecko'
			identity: 'Mozilla'
			versionSearch: 'rv'
		}
		{
			string: navigator.userAgent
			subString: 'Mozilla'
			identity: 'Netscape'
			versionSearch: 'Mozilla'
		}
	]
	dataOS: [
		{
			string: navigator.platform
			subString: 'Win'
			identity: 'Windows'
		}
		{
			string: navigator.platform
			subString: 'Mac'
			identity: 'Mac'
		}
		{
			string: navigator.userAgent
			subString: 'iPhone'
			identity: 'iPhone-iPod'
		}
		{
			string: navigator.platform
			subString: 'Linux'
			identity: 'Linux'
		}
	]

	isIE: -> # w/ IE11 support
		((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)))

module.exports =
	attachTo: (_var) ->
		_var.client ?= {}
		$.extend _var.client,
			os: browserDetection.OS
			browser: browserDetection.browser
			isIE: browserDetection.isIE

		return @

	init: ->
		browserDetection.init()

		return @

	addClassesOn: ->
		$target = $(arguments[0] or '').addClass [browserDetection.OS, browserDetection.browser].join(' ')
		if browserDetection.isIE()
			$target.removeClass 'Mozilla'
			$target.addClass 'Explorer'

		return @






