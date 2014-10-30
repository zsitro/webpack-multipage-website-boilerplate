/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ispage;

	console.log('Webpack boilerplate', window, window.$.fn.jquery);

	__webpack_require__(1);

	__webpack_require__(2);

	ispage = __webpack_require__(3);

	if (ispage('page-contact')) {
	  console.log('contact page');
	}

	$(function() {
	  return console.log('dom:ready');
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by zsitro on 12/20/13.
	 */
	'use strict';

	/* Add console to dumb IEs
	 ******************************************************/

	// Console-polyfill. MIT license.
	// https://github.com/paulmillr/console-polyfill
	// Make it safe to do console.log() always.
	(function (con) {
		'use strict';
		var prop, method;
		var empty = {};
		var dummy = function() {};
		var properties = 'memory'.split(',');
		var methods = ('assert,count,debug,dir,dirxml,error,exception,group,' +
			'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
			'time,timeEnd,trace,warn').split(',');
		while (prop = properties.pop()) con[prop] = con[prop] || empty;
		while (method = methods.pop()) con[method] = con[method] || dummy;
	})(window.console = window.console || {});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Open all external links and PDF in new window
	******************************************************/
	var baseUrl = window.location.host;

	$("body").on(

		'click',

		"a[href^='http:']:not([href*='" + baseUrl + "']), "+
		"a[href^='https:']:not([href*='" + baseUrl + "']), "+
		"a[href$='.pdf']:not([href*='" + baseUrl + "']), "+
		"a[href$='.pdf']"+
		"a.external",

		function() {
			$(this).attr('target','_blank');
		}
	);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(_name) {
	  return $('body.l-' + _name).length === 1;
	};


/***/ }
/******/ ])