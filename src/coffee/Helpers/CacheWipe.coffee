if localStorage.getItem('version.mem') isnt App.version.mem
	log 'reset::local.mem'
	localStorage.clear()
	localStorage.setItem 'version.mem', App.version.mem
