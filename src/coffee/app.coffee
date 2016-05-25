class App

	constructor : ->

		@env = 'development'
		@lang = $('html').attr 'lang'
		@version =
			localStorage: .1
		@CONST =
			BREAKPOINT_MOBILE_MAX: 767
			BREAKPOINT_TABLET_MIN: 768
			BREAKPOINT_TABLET_MAX: 991
			BREAKPOINT_DESKTOP_MIN: 992
	events :
		# Dead simple receiver, can be replaced anytime
		trigger : (ev) ->
			$('body').trigger ev
		on : (ev, fn) ->
			$('body').on ev, fn

	bootstrap : ->
		$.extend @, arguments[0] or {}
		require('expose?log!./Helpers/Console.coffee')#(@env)
		require('./Helpers/BackgroundAttach.coffee').init().runOn('app.content.update.after')
		require('./Helpers/Utils.coffee').attachTo(@)
		require('./Helpers/ExternalLinks.coffee').attachListener()
		require('./Helpers/SVGReplace.coffee').init()
		require('./Helpers/FeatureDetection.coffee')
			.init()
			.addClassesOn('html')
			.attachTo(@)


		# FORMS
		# ---------------------------------------------- #
		# require('./I18n/jquery.validator.coffee') if @lang is 'fr'
		# require('./Components/forms/formValidator.coffee').initAll()
		# require('./Components/forms/ajaxForm.coffee').initAll()

		# INIT GALLERIES
		# ---------------------------------------------- #
		# require('./Components/imagelightbox.coffee').init '[data-imagelightbox=prop-gallery]'
		# require('./Components/datepicker.coffee').initAll()

		# require('./Components/Map.coffee').init()
		# require('./Components/Header.coffee').init()
		require('./Components/Mobilemenu.coffee').init()
		# require('./Components/Share.coffee').init()
		# require('./Components/Popovers.coffee').init()

		if @utils.isPage 'contact'
			return
			# require('./Pages/Contact/Contact.coffee').init()

module.exports = new App()
