/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {__webpack_require__(1).bootstrap(global._App_);

	console.log('*Webpack boilerplate*', global.$.fn.jquery);

	console.log('`global App`', App);

	$(function() {});

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["App"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var App;

	App = (function() {
	  function App() {
	    this.env = 'development';
	    this.lang = 'en';
	    this.version = {
	      localStorage: .1
	    };
	  }

	  App.prototype.bootstrap = function() {
	    $.extend(this, arguments[0] || {});
	    __webpack_require__(3);
	    __webpack_require__(5).attachListener();
	    return __webpack_require__(6).init().addClassesOn('html').attachTo(this);
	  };

	  return App;

	})();

	module.exports = new App();


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["log"] = __webpack_require__(4);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {};

	if (typeof console.log === 'object' && Function.prototype.bind && console) {
	  ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach((function(method) {
	    console[method] = this.call(console[method], console);
	  }), Function.prototype.bind);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var baseUrl;

	baseUrl = window.location.host;

	module.exports.attachListener = function() {
	  return $("body").on('click', "a[href^='http:']:not([href*='" + baseUrl + "']), " + "a[href^='https:']:not([href*='" + baseUrl + "']), " + "a[href$='.pdf']:not([href*='" + baseUrl + "']), " + "a[href$='.pdf']" + "a.external", function() {
	    return $(this).attr('target', '_blank');
	  });
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var browserDetection;

	browserDetection = {
	  init: function() {
	    this.browser = this.searchString(this.dataBrowser) || 'An unknown browser';
	    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'an unknown version';
	    this.OS = this.searchString(this.dataOS) || 'an unknown OS';
	  },
	  searchString: function(data) {
	    var dataProp, dataString, i;
	    i = 0;
	    while (i < data.length) {
	      dataString = data[i].string;
	      dataProp = data[i].prop;
	      this.versionSearchString = data[i].versionSearch || data[i].identity;
	      if (dataString) {
	        if (dataString.indexOf(data[i].subString) !== -1) {
	          return data[i].identity;
	        }
	      } else if (dataProp) {
	        return data[i].identity;
	      }
	      i++;
	    }
	  },
	  searchVersion: function(dataString) {
	    var index;
	    index = dataString.indexOf(this.versionSearchString);
	    if (index === -1) {
	      return;
	    }
	    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	  },
	  dataBrowser: [
	    {
	      string: navigator.userAgent,
	      subString: 'Chrome',
	      identity: 'Chrome'
	    }, {
	      string: navigator.userAgent,
	      subString: 'OmniWeb',
	      versionSearch: 'OmniWeb/',
	      identity: 'OmniWeb'
	    }, {
	      string: navigator.vendor,
	      subString: 'Apple',
	      identity: 'Safari',
	      versionSearch: 'Version'
	    }, {
	      prop: window.opera,
	      identity: 'Opera'
	    }, {
	      string: navigator.vendor,
	      subString: 'iCab',
	      identity: 'iCab'
	    }, {
	      string: navigator.vendor,
	      subString: 'KDE',
	      identity: 'Konqueror'
	    }, {
	      string: navigator.userAgent,
	      subString: 'Firefox',
	      identity: 'Firefox'
	    }, {
	      string: navigator.vendor,
	      subString: 'Camino',
	      identity: 'Camino'
	    }, {
	      string: navigator.userAgent,
	      subString: 'Netscape',
	      identity: 'Netscape'
	    }, {
	      string: navigator.userAgent,
	      subString: 'MSIE',
	      identity: 'Explorer',
	      versionSearch: 'MSIE'
	    }, {
	      string: navigator.userAgent,
	      subString: 'Gecko',
	      identity: 'Mozilla',
	      versionSearch: 'rv'
	    }, {
	      string: navigator.userAgent,
	      subString: 'Mozilla',
	      identity: 'Netscape',
	      versionSearch: 'Mozilla'
	    }
	  ],
	  dataOS: [
	    {
	      string: navigator.platform,
	      subString: 'Win',
	      identity: 'Windows'
	    }, {
	      string: navigator.platform,
	      subString: 'Mac',
	      identity: 'Mac'
	    }, {
	      string: navigator.userAgent,
	      subString: 'iPhone',
	      identity: 'iPhone-iPod'
	    }, {
	      string: navigator.platform,
	      subString: 'Linux',
	      identity: 'Linux'
	    }
	  ],
	  isIE: function() {
	    return (navigator.appName === 'Microsoft Internet Explorer') || ((navigator.appName === 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null));
	  }
	};

	module.exports = {
	  attachTo: function(_var) {
	    if (_var.client == null) {
	      _var.client = {};
	    }
	    $.extend(_var.client, {
	      os: browserDetection.OS,
	      browser: browserDetection.browser,
	      isIE: browserDetection.isIE
	    });
	    return this;
	  },
	  init: function() {
	    browserDetection.init();
	    return this;
	  },
	  addClassesOn: function() {
	    var $target;
	    $target = $(arguments[0] || '').addClass([browserDetection.OS, browserDetection.browser].join(' '));
	    if (browserDetection.isIE()) {
	      $target.removeClass('Mozilla');
	      $target.addClass('Explorer');
	    }
	    return this;
	  }
	};


/***/ }
/******/ ]);