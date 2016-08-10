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
	// Ridiculous way to create keys.
	// Thanks to http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/105078#105078
	function generateGuid() {
	    var result, i, j;
	    result = '';
	    for (j = 0; j < 32; j++) {
	        if (j == 8 || j == 12 || j == 16 || j == 20)
	            result = result + '-';
	        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
	        result = result + i;
	    }
	    return result;
	}
	var App = mobx_react_1.observer(function (props) {
	    var rootElement = model_1.elementStore.root;
	    console.log(mobx_1.toJS(rootElement.children));
	    return (React.createElement("div", null, React.createElement("div", null, React.createElement("button", {onClick: function () { return rootElement.add(new model_1.Element()); }}, "Add children")), React.createElement(List, {elements: rootElement.children})));
	});
	var Item = mobx_react_1.observer(function (props) {
	    var element = props.element;
	    return (React.createElement("div", {className: "checklist"}, React.createElement("div", {className: "header"}, React.createElement("input", {type: "checkbox", checked: element.checked, onChange: function (v) { element.checked = v.target.checked; }}), React.createElement("input", {type: "text", value: element.name, onChange: function (v) { element.name = v; }}), React.createElement("button", {onClick: function () { return element.remove(); }}, "Delete"), React.createElement("button", {onClick: function () { return element.add(new model_1.Element()); }}, "Add children")), React.createElement(List, {elements: element.children})));
	});
	var List = (function (props) {
	    // console.log(_.map(elements, item => item))
	    return (React.createElement("div", {className: 'children'}, _.map(props.elements, function (item) { return React.createElement(Item, {key: generateGuid(), element: item}); })));
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
	        // Set reaction for checked property of every children
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


/***/ }

});
//# sourceMappingURL=bundle.chunk.js.map