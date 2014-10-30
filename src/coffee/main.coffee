# No need to require this
# $ = require 'jquery'

console.log 'Webpack boilerplate', window, window.$.fn.jquery

#Things here
require './components/consoleShim.js'
require './components/externalLinks.js'

ispage = require './components/ispage.coffee'

if ispage 'page-contact'
	console.log 'contact page'
	# require 'views/contact.coffee'

$( ->
	console.log 'dom:ready'
)
