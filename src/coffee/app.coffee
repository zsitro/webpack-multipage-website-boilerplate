class App

	constructor : ->

		@env = 'development'
		@lang = 'en'
		@version =
			localStorage: .1

	bootstrap : ->
		$.extend @, arguments[0] or {}
		require('expose?log!./Helpers/Console.coffee')#(@env)
		require('./Helpers/ExternalLinks.coffee').attachListener()
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

		# if ispage 'home'
			# require('./Views/home/home.coffee')


module.exports = new App()
