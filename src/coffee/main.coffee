require("expose?App!./app.coffee").bootstrap(global._App_)
console.log '*Webpack boilerplate*', global.$.fn.jquery
console.log '`global App`', App

# Common dom:ready
# ---------------------------------------------- #
$( ->
	# log 'dom:ready'
	# More lines here -> more dirt
)