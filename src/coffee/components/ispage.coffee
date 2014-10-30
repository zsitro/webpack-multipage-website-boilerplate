$ = require 'jquery'

module.exports = (_name) ->
		$('body.l-'+_name).length is 1
