webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../References.d.ts" />
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(35);
	var mobx_1 = __webpack_require__(175);
	var mobx_react_1 = __webpack_require__(176);
	var model_1 = __webpack_require__(177);
	var _ = __webpack_require__(178);
	var mobx_react_devtools_1 = __webpack_require__(182);
	var uuid = __webpack_require__(180);
	var App = mobx_react_1.observer(function (props) {
	    var rootElement = model_1.elementStore.root;
	    console.log(mobx_1.toJS(rootElement.children));
	    return (React.createElement("div", null, React.createElement(mobx_react_devtools_1.default, null), React.createElement("div", null, React.createElement("button", {onClick: function () { return rootElement.add(new model_1.Element()); }}, "Add children")), React.createElement(List, {elements: rootElement.children})));
	});
	var Item = mobx_react_1.observer(function (props) {
	    var element = props.element;
	    return (React.createElement("div", {className: "checklist"}, React.createElement("div", {className: "header"}, React.createElement("input", {type: "checkbox", checked: element.checked, onChange: function (v) { element.checked = v.target.checked; }}), React.createElement("input", {type: "text", value: element.name, onChange: function (v) { element.name = v.target.value; }}), React.createElement("button", {onClick: function () { return element.remove(); }}, "Delete"), React.createElement("button", {onClick: function () { return element.add(new model_1.Element()); }}, "Add children")), React.createElement(List, {elements: element.children})));
	});
	var List = (function (props) {
	    // console.log(_.map(elements, item => item))
	    return (React.createElement("div", {className: 'children'}, _.map(props.elements, function (item) { return React.createElement(Item, {key: uuid.v4(), element: item}); })));
	});
	ReactDOM.render(React.createElement(App, null), document.getElementById('app-mount-root'));


/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	///<reference path="../References.d.ts" />
	var mobx_1 = __webpack_require__(175);
	var _ = __webpack_require__(178);
	var uuid = __webpack_require__(180);
	var ElementStore = (function () {
	    function ElementStore() {
	        this.root = new Element();
	    }
	    __decorate([
	        mobx_1.observable
	    ], ElementStore.prototype, "root", void 0);
	    return ElementStore;
	}());
	exports.ElementStore = ElementStore;
	var Element = (function () {
	    function Element() {
	        var _this = this;
	        this.key = uuid.v4();
	        this.checked = true;
	        this.children = [];
	        // Set reaction for checked property
	        mobx_1.reaction(function () { return _this.checked; }, function (checked) {
	            mobx_1.transaction(function () {
	                if (_this.isChecked != checked)
	                    for (var _i = 0, _a = _this.children; _i < _a.length; _i++) {
	                        var c = _a[_i];
	                        c.checked = checked;
	                    }
	            });
	        });
	        // Set reaction for checked property of every child
	        mobx_1.reaction(function () { return _this.children.map(function (f) { return f.checked; }); }, function (childrenChecked) {
	            if (_this.children.length)
	                _this.checked = _this.isChecked;
	        });
	    }
	    Object.defineProperty(Element.prototype, "isChecked", {
	        get: function () {
	            return this.children.every(function (f) { return f.checked; });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Element.prototype.remove = function () {
	        if (this.parent.children.length != 0)
	            _.remove(this.parent.children, this);
	    };
	    Element.prototype.add = function (e) {
	        e.parent = this;
	        this.children.push(e);
	    };
	    __decorate([
	        mobx_1.observable
	    ], Element.prototype, "checked", void 0);
	    __decorate([
	        mobx_1.observable
	    ], Element.prototype, "children", void 0);
	    __decorate([
	        mobx_1.observable
	    ], Element.prototype, "parent", void 0);
	    __decorate([
	        mobx_1.computed
	    ], Element.prototype, "isChecked", null);
	    __decorate([
	        mobx_1.action
	    ], Element.prototype, "remove", null);
	    __decorate([
	        mobx_1.action
	    ], Element.prototype, "add", null);
	    return Element;
	}());
	exports.Element = Element;
	exports.elementStore = new ElementStore();


/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php
	
	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(181);
	
	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}
	
	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;
	
	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });
	
	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }
	
	  return buf;
	}
	
	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}
	
	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html
	
	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();
	
	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];
	
	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;
	
	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;
	
	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];
	
	  options = options || {};
	
	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
	
	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();
	
	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
	
	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;
	
	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }
	
	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }
	
	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }
	
	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;
	
	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;
	
	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;
	
	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;
	
	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;
	
	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;
	
	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;
	
	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }
	
	  return buf ? buf : unparse(b);
	}
	
	// **`v4()` - Generate random UUID**
	
	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;
	
	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};
	
	  var rnds = options.random || (options.rng || _rng)();
	
	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;
	
	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }
	
	  return buf || unparse(rnds);
	}
	
	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;
	
	module.exports = uuid;


/***/ },

/***/ 181:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;
	
	if (global.crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}
	
	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }
	
	    return _rnds;
	  };
	}
	
	module.exports = rng;
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t(__webpack_require__(1),__webpack_require__(175),__webpack_require__(176)):"function"==typeof define&&define.amd?define(["react","mobx","mobx-react"],t):"object"==typeof exports?exports.mobxDevtools=t(require("react"),require("mobx"),require("mobx-react")):e.mobxDevtools=t(e.React,e.mobx,e.mobxReact)}(this,function(e,t,n){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.setGraphEnabled=t.setUpdatesEnabled=t.setLogEnabled=t.UpdatesControl=t.LogControl=t.GraphControl=t["default"]=void 0;var r=n(1);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o(r)["default"]}});var i=n(10);Object.defineProperty(t,"GraphControl",{enumerable:!0,get:function(){return o(i)["default"]}});var a=n(11);Object.defineProperty(t,"LogControl",{enumerable:!0,get:function(){return o(a)["default"]}});var l=n(12);Object.defineProperty(t,"UpdatesControl",{enumerable:!0,get:function(){return o(l)["default"]}});var u=n(28),s=o(u),c=n(3);s["default"].polyfill();t.setLogEnabled=function(e){(0,c.setGlobalState)({logEnabled:Boolean(e)})},t.setUpdatesEnabled=function(e){(0,c.setGlobalState)({updatesEnabled:Boolean(e)})},t.setGraphEnabled=function(e){(0,c.setGlobalState)({graphEnabled:Boolean(e)})}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(2),s=o(u),c=n(3),d=n(9),p=o(d),f=n(22),g=o(f),h=n(24),b=o(h),y=function(e){function t(){var e,n,o,a;r(this,t);for(var l=arguments.length,u=Array(l),s=0;s<l;s++)u[s]=arguments[s];return n=o=i(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.handleUpdate=function(){return o.setState((0,c.getGlobalState)())},o.handleToggleGraph=function(){o.setState({hoverBoxes:[],graphEnabled:!o.state.graphEnabled})},a=n,i(o,a)}return a(t,e),l(t,[{key:"componentWillMount",value:function(){this.setState((0,c.getGlobalState)())}},{key:"componentDidMount",value:function(){c.eventEmitter.on("update",this.handleUpdate)}},{key:"componentWillUnmount",value:function(){c.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"render",value:function(){var e=this.props.noPanel,t=this.state,n=t.renderingBoxes,o=t.hoverBoxes;return s["default"].createElement("div",null,e!==!0&&s["default"].createElement(p["default"],{position:this.props.position}),s["default"].createElement(g["default"],{boxes:n.concat(o)}),s["default"].createElement(b["default"],null))}}]),t}(u.Component);y.propTypes={hightlightTimeout:u.PropTypes.number,position:u.PropTypes.object,userAgent:u.PropTypes.string,noPanel:u.PropTypes.bool},y.defaultProps={noPanel:!1},t["default"]=y},function(t,n){t.exports=e},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t._handleClick=t._handleMouseMove=t.restoreLogFromLocalstorage=t.restoreUpdatesFromLocalstorage=t.getGlobalState=t.setGlobalState=t.eventEmitter=void 0;var r=n(4),i=o(r),a=n(5),l=o(a),u=n(6),s=o(u),c=n(7),d=o(c),p=n(8),f="mobx-react-devtool__updatesEnabled",g="mobx-react-devtool__logEnabled",h={updatesEnabled:!1,graphEnabled:!1,logEnabled:!1,hoverBoxes:[],renderingBoxes:[]},b=t.eventEmitter=new s["default"],y=t.setGlobalState=function(e){h.logEnabled!==e.logEnabled&&(0,p.setLogLevel)(e.logEnabled),"undefined"!=typeof window&&window.localStorage&&(e.updatesEnabled===!0?window.localStorage.setItem(f,"YES"):e.updatesEnabled===!1&&window.localStorage.removeItem(f),e.logEnabled===!0?window.localStorage.setItem(g,"YES"):e.logEnabled===!1&&window.localStorage.removeItem(g)),e.graphEnabled===!1&&(e.hoverBoxes=[]),h=Object.assign({},h,e),b.emit("update")},v=(t.getGlobalState=function(){return h},t.restoreUpdatesFromLocalstorage=function(){if("undefined"!=typeof window&&window.localStorage){var e="YES"===window.localStorage.getItem(f);y({updatesEnabled:e})}},t.restoreLogFromLocalstorage=function(){if("undefined"!=typeof window&&window.localStorage){var e="YES"===window.localStorage.getItem(g);y({logEnabled:e})}},function(e){for(var t=e,n=void 0;t;){if(n=l["default"].componentByNodeRegistery.get(t))return{component:n,node:t};t=t.parentNode}return{component:void 0,node:void 0}});t._handleMouseMove=function(e){if(h.graphEnabled){var t=e.target,n=v(t).node;if(n){var o=n.getBoundingClientRect();y({hoverBoxes:[{id:"the hovered node",type:"hover",x:o.left,y:o.top,width:o.width,height:o.height,lifeTime:1/0}]})}}},t._handleClick=function(e){if(h.graphEnabled){var t=e.target,n=v(t).component;if(n){e.stopPropagation(),e.preventDefault();var o=i["default"].extras.getDependencyTree(n.render.$mobx);(0,d["default"])(o),y({dependencyTree:o,hoverBoxes:[],graphEnabled:!1})}}}},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(e){return"function"==typeof e}function r(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!r(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,r,l,u,s;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var c=new Error('Uncaught, unspecified "error" event. ('+t+")");throw c.context=t,c}if(n=this._events[e],a(n))return!1;if(o(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:l=Array.prototype.slice.call(arguments,1),n.apply(this,l)}else if(i(n))for(l=Array.prototype.slice.call(arguments,1),s=n.slice(),r=s.length,u=0;u<r;u++)s[u].apply(this,l);return!0},n.prototype.addListener=function(e,t){var r;if(!o(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,o(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned&&(r=a(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,r&&r>0&&this._events[e].length>r&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!o(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,r,a,l;if(!o(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],a=n.length,r=-1,n===t||o(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(n)){for(l=a;l-- >0;)if(n[l]===t||n[l].listener&&n[l].listener===t){r=l;break}if(r<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],o(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?o(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(o(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function o(e){if(e.dependencies){for(var t=e.dependencies.length-1;t>=0;t--)for(var n=e.dependencies[t].name,r=t-1;r>=0;r--)if(e.dependencies[r].name===n){e.dependencies[r].dependencies=[].concat(e.dependencies[r].dependencies||[],e.dependencies[t].dependencies||[]),e.dependencies.splice(t,1);break}e.dependencies.forEach(o)}};t["default"]=n},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e){e!==!0||I?e===!1&&I&&(I(),I=null):("undefined"!=typeof navigator&&navigator.userAgent.indexOf("Chrome")===-1&&console.warn("The output of the MobX logger is optimized for Chrome"),I=m["default"].spy(i))}function i(e){if(e.spyReportEnd===!0)"number"==typeof e.time&&u("%ctotal time: %sms","color:gray",e.time),console.groupEnd();else{var t=e.spyReportStart===!0?a:u;switch(e.type){case"action":t("%caction '%s' %s","color:dodgerblue",e.name,p("(",h(e.target))),u(e.arguments),c();break;case"transaction":t("%ctransaction '%s' %s","color:gray",e.name,p("(",h(e.target)));break;case"scheduled-reaction":t("%cscheduled async reaction '%s'","color:#10a210",f(e.object));break;case"reaction":t("%creaction '%s'","color:#10a210",f(e.object)),c();break;case"compute":a("%ccomputed '%s' %s","color:#10a210",f(e.object),p("(",h(e.target))),l();break;case"error":t("%cerror: %s","color:tomato",e.message),c(),d();break;case"update":m["default"].isObservableArray(e.object)?t("updated '%s[%s]': %s (was: %s)",f(e.object),e.index,g(e.newValue),g(e.oldValue)):m["default"].isObservableObject(e.object)?t("updated '%s.%s': %s (was: %s)",f(e.object),e.name,g(e.newValue),g(e.oldValue)):t("updated '%s': %s (was: %s)",f(e.object),e.name,g(e.newValue),g(e.oldValue)),s({newValue:e.newValue,oldValue:e.oldValue}),c();break;case"splice":t("spliced '%s': index %d, added %d, removed %d",f(e.object),e.index,e.addedCount,e.removedCount),s({added:e.added,removed:e.removed}),c();break;case"add":t("set '%s.%s': %s",f(e.object),e.name,g(e.newValue)),s({newValue:e.newValue}),c();break;case"delete":t("removed '%s.%s' (was %s)",f(e.object),e.name,g(e.oldValue)),s({oldValue:e.oldValue}),c();break;case"create":t("set '%s': %s",f(e.object),g(e.newValue)),s({newValue:e.newValue}),c();break;default:t(e.type),s(e)}}}function a(){console[w?"groupCollapsed":"log"].apply(console,arguments),x++}function l(){x--,w&&console.groupEnd()}function u(){console.log.apply(console,arguments)}function s(){console.dir.apply(console,arguments)}function c(){console.trace("stack")}function d(){for(var e=0,t=x;e<t;e++)l()}function p(e,t){return t?(e||"")+t+(j[e]||""):""}function f(e){return m["default"].extras.getDebugName(e)}function g(e){return b(e)?"string"==typeof e&&e.length>100?e.substr(0,97)+"...":e:p("(",h(e))}function h(e){if(null===e||void 0===e)return"";if(e&&"object"===("undefined"==typeof e?"undefined":y(e))){if(e&&e.$mobx)return e.$mobx.name;if(e.constructor)return e.constructor.name||"object"}return""+("undefined"==typeof e?"undefined":y(e))}function b(e){return null===e||void 0===e||"string"==typeof e||"number"==typeof e||"boolean"==typeof e}Object.defineProperty(t,"__esModule",{value:!0});var y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t.setLogLevel=r;var v=n(4),m=o(v),I=null,w="function"==typeof console.groupCollapsed,x=0,j={'"':'"',"'":"'","(":")","[":"]","<":"]","#":""}},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(2),c=r(s),d=n(3),p=n(10),f=r(p),g=n(11),h=r(g),b=n(12),y=r(b),v=n(14),m=r(v),I=n(15),w=o(I),x=function(e){function t(){var e,n,o,r;i(this,t);for(var l=arguments.length,u=Array(l),s=0;s<l;s++)u[s]=arguments[s];return n=o=a(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.handleUpdate=function(){return o.setState({})},r=n,a(o,r)}return l(t,e),u(t,[{key:"componentDidMount",value:function(){d.eventEmitter.on("update",this.handleUpdate)}},{key:"componentWillUnmount",value:function(){d.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"render",value:function(){var e=this.props,t=e.position,n=e.hightlightTimeout,o={};return t?(o.top=t.top,o.right=t.right,o.bottom=t.bottom,o.left=t.left):(o.top="0px",o.right="20px"),c["default"].createElement("div",null,c["default"].createElement("div",{style:Object.assign({},w.panel,o)},c["default"].createElement(y["default"],{hightlightTimeout:n},c["default"].createElement(m["default"],{id:"buttonUpdates"})),c["default"].createElement(f["default"],null,c["default"].createElement(m["default"],{id:"buttonGraph"})),c["default"].createElement(h["default"],null,c["default"].createElement(m["default"],{id:"buttonLog"}))))}}]),t}(s.Component);x.propTypes={hightlightTimeout:s.PropTypes.number},t["default"]=x},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(2),s=o(u),c=n(5),d=o(c),p=n(3),f=function(e){function t(){var e,n,o,a;r(this,t);for(var l=arguments.length,u=Array(l),s=0;s<l;s++)u[s]=arguments[s];return n=o=i(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.handleUpdate=function(){return o.setState({})},o.handleToggleGraph=function(){var e=(0,p.getGlobalState)(),t=e.graphEnabled;(0,p.setGlobalState)({hoverBoxes:[],graphEnabled:!t})},a=n,i(o,a)}return a(t,e),l(t,[{key:"componentWillMount",value:function(){this.setState({})}},{key:"componentDidMount",value:function(){d["default"].trackComponents(),p.eventEmitter.on("update",this.handleUpdate),"undefined"!=typeof window&&"undefined"!=typeof document&&(document.body.addEventListener("mousemove",p._handleMouseMove,!0),document.body.addEventListener("click",p._handleClick,!0))}},{key:"componentWillUnmount",value:function(){p.eventEmitter.removeListener("update",this.handleUpdate),"undefined"!=typeof document&&(document.body.removeEventListener("mousemove",p._handleMouseMove,!0),document.body.removeEventListener("click",p._handleMouseMove,!0))}},{key:"render",value:function(){var e=(0,p.getGlobalState)(),t=e.graphEnabled,n=this.props.children;return s["default"].cloneElement(n,{onToggle:this.handleToggleGraph,active:t})}}]),t}(u.Component);t["default"]=f},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(2),s=o(u),c=n(3),d=function(e){function t(){var e,n,o,a;r(this,t);for(var l=arguments.length,u=Array(l),s=0;s<l;s++)u[s]=arguments[s];return n=o=i(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.handleUpdate=function(){o.setState({})},o.handleToggleLog=function(){var e=(0,c.getGlobalState)(),t=e.logEnabled;(0,c.setGlobalState)({logEnabled:!t})},a=n,i(o,a)}return a(t,e),l(t,[{key:"componentDidMount",value:function(){c.eventEmitter.on("update",this.handleUpdate),(0,c.restoreLogFromLocalstorage)()}},{key:"componentWillUnmount",value:function(){c.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"render",value:function(){var e=(0,c.getGlobalState)(),t=e.logEnabled,n=this.props.children;return s["default"].cloneElement(n,{onToggle:this.handleToggleLog,active:t})}}]),t}(u.Component);t["default"]=d},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(2),s=o(u),c=n(13),d=o(c),p=n(3),f=function(e){function t(){var e,n,o,a;r(this,t);for(var l=arguments.length,u=Array(l),s=0;s<l;s++)u[s]=arguments[s];return n=o=i(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.handleUpdate=function(){return o.setState({})},o.handleToggleUpdates=function(){var e=(0,p.getGlobalState)(),t=e.updatesEnabled;(0,p.setGlobalState)({updatesEnabled:!t})},a=n,i(o,a)}return a(t,e),l(t,[{key:"componentDidMount",value:function(){p.eventEmitter.on("update",this.handleUpdate);var e=this.props.hightlightTimeout;this.renderingMonitor=new d["default"]({hightlightTimeout:e}),(0,p.restoreUpdatesFromLocalstorage)()}},{key:"componentWillUnmount",value:function(){p.eventEmitter.removeListener("update",this.handleUpdate),this.renderingMonitor.dispose()}},{key:"render",value:function(){var e=(0,p.getGlobalState)(),t=e.updatesEnabled,n=this.props.children;return s["default"].cloneElement(n,{onToggle:this.handleToggleUpdates,active:t})}}]),t}(u.Component);f.propTypes={hightlightTimeout:u.PropTypes.number},f.defaultProps={hightlightTimeout:1500},t["default"]=f},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(5),l=o(a),u=n(3),s=function(e){switch(!0){case e<25:return"cheap";case e<100:return"acceptable";default:return"expensive"}},c=function(){function e(t){var n=this,o=t.hightlightTimeout;r(this,e),this._boxesRegistry="undefined"!=typeof WeakMap?new WeakMap:new Map,this._renderReporterDisposer=l["default"].renderReporter.on(function(e){if((0,u.getGlobalState)().updatesEnabled===!0)switch(e.event){case"render":if(!e.node||isNaN(e.renderTime))return;var t=e.node.getBoundingClientRect(),r=n.getBoxForNode(e.node);r.type="rendering",r.y=t.top,r.x=t.left,r.width=t.width,r.height=t.height,r.renderInfo={count:r.renderInfo&&++r.renderInfo.count||1,renderTime:e.renderTime,totalTime:e.totalTime,cost:s(e.renderTime)},r.lifeTime=o;var i=(0,u.getGlobalState)().renderingBoxes;return i.indexOf(r)===-1&&(i=i.concat([r])),(0,u.setGlobalState)({renderingBoxes:i}),r._timeout&&clearTimeout(r._timeout),void(r._timeout=setTimeout(function(){return n.removeBox(e.node,!0)},o));case"destroy":return n.removeBox(e.node),void n._boxesRegistry["delete"](e.node);default:return}})}return i(e,[{key:"getBoxForNode",value:function(e){if(this._boxesRegistry.has(e))return this._boxesRegistry.get(e);var t={id:Math.random().toString(32).substr(2)};return this._boxesRegistry.set(e,t),t}},{key:"dispose",value:function(){this._renderReporterDisposer()}},{key:"removeBox",value:function(e){if(this._boxesRegistry.has(e)!==!1){var t=(0,u.getGlobalState)().renderingBoxes,n=t.indexOf(this._boxesRegistry.get(e));n!==-1&&(t=t.slice(0,n).concat(t.slice(n+1)),(0,u.setGlobalState)({renderingBoxes:t}))}}}]),e}();t["default"]=c},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(2),c=r(s),d=n(15),p=o(d),f=function(e){function t(){var e,n,o,r;i(this,t);for(var l=arguments.length,u=Array(l),s=0;s<l;s++)u[s]=arguments[s];return n=o=a(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.state={hovered:!1},o.handleMouseOver=function(){return o.setState({hovered:!0})},o.handleMouseOut=function(){return o.setState({hovered:!1})},r=n,a(o,r)}return l(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.active,n=e.id,o=e.onToggle,r=this.state.hovered,i=function(){switch(n){case"buttonUpdates":return t?p.buttonUpdatesActive:p.buttonUpdates;case"buttonGraph":return t?p.buttonGraphActive:p.buttonGraph;case"buttonLog":return t?p.buttonLogActive:p.buttonLog}}(),a=function(){switch(n){case"buttonUpdates":return"Visualize component re-renders";case"buttonGraph":return"Select a component and show it's dependency tree";case"buttonLog":return"Log all MobX state changes and reactions to the browser console (use F12 to show / hide the console). Use Chrome / Chromium for an optimal experience"}}(),l=Object.assign({},p.button,i,t&&p.button.active,r&&p.button.hover);return c["default"].createElement("button",{onClick:o,title:a,style:l,onMouseOver:this.handleMouseOver,onMouseOut:this.handleMouseOut})}}]),t}(s.Component);f.props={onToggle:s.PropTypes.bool.isRequired,active:s.PropTypes.bool.isRequired,name:s.PropTypes.oneOf(["buttonUpdates","buttonGraph","buttonLog"]).isRequired},t["default"]=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.panel={position:"fixed",height:"26px",backgroundColor:"#fff",color:"rgba(0, 0, 0, 0.8)",borderRadius:"0 0 2px 2px",borderStyle:"solid",borderWidth:"0 1px 1px",borderColor:"rgba(0, 0, 0, 0.1)",zIndex:"65000",fontFamily:"Helvetica, sans-serif",display:"flex",padding:"0 5px"},t.button={opacity:.45,background:"transparent none center / 16px 16px no-repeat",width:"26px",margin:"0 10px",cursor:"pointer",border:"none",hover:{opacity:.7},active:{opacity:1,":hover":{opacity:1}}},t.buttonLog={backgroundImage:"url("+n(16)+")"},t.buttonLogActive={backgroundImage:"url("+n(17)+")"},t.buttonUpdates={backgroundImage:"url("+n(18)+")"},t.buttonUpdatesActive={backgroundImage:"url("+n(19)+")"},t.buttonGraph={backgroundImage:"url("+n(20)+")"},t.buttonGraphActive={backgroundImage:"url("+n(21)+")"}},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxwYXRoIGQ9Ik0xMi41IDMuNWgtOGMtMS4xIDAtMiAuOS0yIDJ2NWMwIDEuMS45IDIgMiAyaDF2Mmw1LTJoMmMxLjEgMCAyLS45IDItMnYtNWMwLTEuMS0uOS0yLTItMnoiLz4KICAgICAgICA8cGF0aCBkPSJNNSA2LjVoNyIvPgogICAgICAgIDxwYXRoIGQ9Ik01IDkuNWg3Ii8+CiAgICA8L2c+Cjwvc3ZnPgo="},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij4KICAgIDxnIHN0cm9rZT0iIzE3ODBmYSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjI1Ij4KICAgICAgICA8cGF0aCBkPSJNMTIuNSAzLjVoLThjLTEuMSAwLTIgLjktMiAydjVjMCAxLjEuOSAyIDIgMmgxdjJsNS0yaDJjMS4xIDAgMi0uOSAyLTJ2LTVjMC0xLjEtLjktMi0yLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTUgNi41aDciLz4KICAgICAgICA8cGF0aCBkPSJNNSA5LjVoNyIvPgogICAgPC9nPgo8L3N2Zz4K"},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iNiIvPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTBWNCIvPgogICAgPC9nPgogICAgPGcgc3Ryb2tlPSJub25lIiBmaWxsPSIjMDAwIj4KICAgICAgICA8Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDFoMnYxLjVoLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTE0IDEuNmwtLjcuNy4zLjMtLjcuOC43LjcuOC0uNy4zLjMuNy0uN3oiLz4KICAgIDwvZz4KPC9zdmc+Cg=="},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMTc4MGZhIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuMjUiPgogICAgICAgIDxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iNiIvPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTBWNCIvPgogICAgPC9nPgogICAgPGcgc3Ryb2tlPSJub25lIiBmaWxsPSIjMTc4MGZhIj4KICAgICAgICA8Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDFoMnYxLjVoLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTE0IDEuNmwtLjcuNy4zLjMtLjcuOC43LjcuOC0uNy4zLjMuNy0uN3oiLz4KICAgIDwvZz4KPC9zdmc+Cg=="},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxwYXRoIGQ9Ik0yLjUgMi41aDl2MmgtOXoiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDcuNWg3djJoLTd6Ii8+CiAgICAgICAgPHBhdGggZD0iTTcuNSAxMi41aDd2MmgtN3oiLz4KICAgICAgICA8cGF0aCBkPSJNNC41IDQuNXY5aDMiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDguNWgtMyIvPgogICAgPC9nPgo8L3N2Zz4K"},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMTc4MGZhIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuMjUiPgogICAgICAgIDxwYXRoIGQ9Ik0yLjUgMi41aDl2MmgtOXoiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDcuNWg3djJoLTd6Ii8+CiAgICAgICAgPHBhdGggZD0iTTcuNSAxMi41aDd2MmgtN3oiLz4KICAgICAgICA8cGF0aCBkPSJNNC41IDQuNXY5aDMiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDguNWgtMyIvPgogICAgPC9nPgo8L3N2Zz4K"},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(2),c=r(s),d=n(23),p=o(d),f=function(e){function t(){return i(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return l(t,e),u(t,[{key:"componentWillAppear",value:function(e){this.props.willAppear(e)}},{key:"componentWillLeave",value:function(){this.props.willLeave()}},{key:"render",value:function(){return this.props.children}}]),t}(s.Component);f.propTypes={willAppear:s.PropTypes["function"],willLeave:s.PropTypes["function"]},f.defaultProps={willAppear:function(){},willLeave:function(){}};var g=function(e){function t(){return i(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments));
	}return l(t,e),u(t,[{key:"renderBox",value:function(e){switch(e.type){case"rendering":var t=p.rendering[e.renderInfo.cost]||{};return c["default"].createElement("div",{key:e.id,ref:function(t){return setTimeout(function(){t&&(t.style.opacity=0)},e.lifeTime-500)},style:Object.assign({},p.box,p.rendering,t,{left:e.x,top:e.y,width:e.width,height:e.height})},c["default"].createElement("span",{style:Object.assign({},p.text,t.text)},e.renderInfo.count,"x | ",e.renderInfo.renderTime," / ",e.renderInfo.totalTime," ms"));case"hover":return c["default"].createElement("div",{key:e.id,style:Object.assign({},p.box,p.hover,{left:e.x,top:e.y,width:e.width,height:e.height})});default:throw new Error}}},{key:"render",value:function(){var e=this,t=this.props.boxes;return c["default"].createElement("div",null,t.map(function(t){return e.renderBox(t)}))}}]),t}(s.Component);g.propTypes={boxes:s.PropTypes.arrayOf(s.PropTypes.shape({type:s.PropTypes.oneOf(["rendering","hover"]).isRequired,x:s.PropTypes.number.isRequired,y:s.PropTypes.number.isRequired,width:s.PropTypes.number.isRequired,height:s.PropTypes.number.isRequired,renderInfo:s.PropTypes.shape({count:s.PropTypes.number.isRequired,renderTime:s.PropTypes.number.isRequired,totalTime:s.PropTypes.number.isRequired,cost:s.PropTypes.oneOf(["cheap","acceptable","expensive"]).isRequired}),lifeTime:s.PropTypes.number.isRequired})).isRequired},t["default"]=g},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.box={display:"block",position:"fixed",zIndex:"64998",minWidth:"60px",outline:"3px solid",pointerEvents:"none",transition:"opacity 500ms ease-in"},t.text={fontFamily:"verdana, sans-serif",padding:"0 4px 2px",color:"rgba(0, 0, 0, 0.6)",fontSize:"10px",lineHeight:"12px",pointerEvents:"none","float":"right",borderBottomRightRadius:"2px",maxWidth:"100%",maxHeight:"100%",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},t.rendering={cheap:{outlineColor:"rgba(182, 218, 146, 0.75)",text:{backgroundColor:"rgba(182, 218, 146, 0.75)"}},acceptable:{outlineColor:"rgba(228, 195, 66, 0.85)",text:{backgroundColor:"rgba(228, 195, 66, 0.85)"}},expensive:{outlineColor:"rgba(228, 171, 171, 0.95)",text:{backgroundColor:"rgba(228, 171, 171, 0.95)"}}},t.hover={outlineColor:"rgba(128, 128, 255, 0.5)"}},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(2),c=r(s),d=n(25),p=r(d),f=n(3),g=n(27),h=o(g),b=function(e){function t(){var e,n,o,r;i(this,t);for(var l=arguments.length,u=Array(l),s=0;s<l;s++)u[s]=arguments[s];return n=o=a(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.handleUpdate=function(){return o.setState({})},o.handleClose=function(){return(0,f.setGlobalState)({dependencyTree:void 0})},r=n,a(o,r)}return l(t,e),u(t,[{key:"componentDidMount",value:function(){f.eventEmitter.on("update",this.handleUpdate)}},{key:"componentWillUnmount",value:function(){f.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"renderTreeItem",value:function(e,t,n){var o=e.name,r=e.dependencies,i=this;return c["default"].createElement("div",{style:h.item,key:o},c["default"].createElement("span",{style:Object.assign({},h.box,n&&h.box.root)},o),r&&c["default"].createElement("div",{style:h.tree},r.map(function(e,t){return i.renderTreeItem(e,t==r.length-1)})),!n&&c["default"].createElement("span",{style:h.itemHorisontalDash}),!n&&c["default"].createElement("span",{style:Object.assign({},h.itemVericalStick,t&&h.itemVericalStick["short"])}))}},{key:"render",value:function(){var e=(0,f.getGlobalState)(),t=e.dependencyTree;return c["default"].createElement(p["default"],{onOverlayClick:this.handleClose},t&&c["default"].createElement("div",{style:h.graph},c["default"].createElement("span",{style:h.close,onClick:this.handleClose},"×"),c["default"].createElement("div",{style:h.tree},this.renderTreeItem(t,!0,!0))))}}]),t}(s.Component);t["default"]=b},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(2),c=r(s),d=n(26),p=o(d),f=function(e){function t(){var e,n,o,r;i(this,t);for(var l=arguments.length,u=Array(l),s=0;s<l;s++)u[s]=arguments[s];return n=o=a(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.stopPropogation=function(e){return e.stopPropagation()},r=n,a(o,r)}return l(t,e),u(t,[{key:"componentDidUpdate",value:function(e){var t=document.body.parentNode;if(e.children&&!this.props.children)this.rightOffset=0,t.style.borderRight=null,t.style.overflow=null;else if(!e.children&&this.props.children){var n=t.offsetWidth;t.style.overflow="hidden";var o=t.offsetWidth,r=Math.max(0,o-n);t.style.borderRight=r+"px solid transparent"}}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.onOverlayClick;return t?c["default"].createElement("div",{style:p.overlay,onClick:n},c["default"].createElement("div",{key:"content",style:p.modal,onClick:this.stopPropogation},t)):null}}]),t}(s.Component);f.propTypes={children:s.PropTypes.node,onOverlayClick:s.PropTypes.func.isRequired},t["default"]=f},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.overlay={position:"fixed",top:0,right:0,bottom:0,left:0,zIndex:66e3,overflow:"auto",WebkitOverflowScrolling:"touch",outline:0,backgroundColor:"rgba(40, 40, 50, 0.5)",transformOrigin:"50% 25%"},t.modal={position:"relative",width:"auto",margin:"5% 10%",zIndex:1060}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.graph={background:"white",padding:"40px"},t.close={color:"rgba(0, 0, 0, 0.2)",fontSize:"36px",position:"absolute",top:"5px",right:"5px",width:"40px",height:"40px",lineHeight:"34px",textAlign:"center",cursor:"pointer",":hover":{color:"rgba(0, 0, 0, 0.5)"}},t.tree={position:"relative",paddingLeft:"25px"},t.item={position:"relative"},t.box={padding:"4px 10px",background:"rgba(0, 0, 0, 0.05)",display:"inline-block",marginBottom:"8px",root:{fontSize:"15px",fontWeight:"bold",padding:"6px 13px"}},t.itemHorisontalDash={position:"absolute",left:"-12px",borderTop:"1px solid rgba(0, 0, 0, 0.2)",top:"14px",width:"12px",height:"0"},t.itemVericalStick={position:"absolute",left:"-12px",borderLeft:"1px solid rgba(0, 0, 0, 0.2)",height:"100%",width:0,top:"-8px","short":{height:"23px"}}},function(e,t){"use strict";function n(e,t){if(void 0===e||null===e)throw new TypeError("Cannot convert first argument to object");for(var n=Object(e),o=1;o<arguments.length;o++){var r=arguments[o];if(void 0!==r&&null!==r)for(var i=Object.keys(Object(r)),a=0,l=i.length;a<l;a++){var u=i[a],s=Object.getOwnPropertyDescriptor(r,u);void 0!==s&&s.enumerable&&(n[u]=r[u])}}return n}function o(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:n})}e.exports={assign:n,polyfill:o}}])});

/***/ }

});
//# sourceMappingURL=bundle.chunk.js.map