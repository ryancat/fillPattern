(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fillPattern", [], factory);
	else if(typeof exports === 'object')
		exports["fillPattern"] = factory();
	else
		root["fillPattern"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/fillPattern.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fillPattern.ts":
/*!****************************!*\
  !*** ./src/fillPattern.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// my awesom library
var types_1 = __webpack_require__(/*! ./types */ "./src/types.ts");
var util_1 = __importDefault(__webpack_require__(/*! ./util */ "./src/util.ts"));
// import svgRenderer from './renderers/svg'
var canvas_1 = __importDefault(__webpack_require__(/*! ./renderers/canvas */ "./src/renderers/canvas.ts"));
var fillPatternState_1 = __importDefault(__webpack_require__(/*! ./fillPatternState */ "./src/fillPatternState.ts"));
var Base_1 = __importDefault(__webpack_require__(/*! ./textures/Base */ "./src/textures/Base.ts"));
var Line_1 = __importDefault(__webpack_require__(/*! ./textures/Line */ "./src/textures/Line.ts"));
/***** Util functions *****/
/**
 * Get the hash for given fill pattern config.
 * The hash result is used to decide if given config is in cached patterns.
 * @param patternConfig fill pattern config
 * @returns string hash value
 */
function getHash(patternConfig, rendererType) {
    return rendererType + "-" + JSON.stringify(patternConfig);
}
var fillPattern = {
    RendererType: types_1.RendererType,
    TextureModeType: types_1.TextureModeType,
    loadTexture: function (texture) {
        if (!fillPatternState_1.default.textureMap[texture.name]) {
            // util.applyMixins(texture, [BaseTexture])
            // util.mixin(texture, new BaseTexture())
            fillPatternState_1.default.textureMap[texture.name] = new Base_1.default(texture);
        }
        else {
            throw new Error("Duplicated texture name: " + texture.name);
        }
    },
    /**
     * Get texture from the pattern config
     * @param patternConfig fill pattern config
     * @returns canvas pattern that can be used for fill instruction
     */
    getTexture: function (patternConfig, rendererType) {
        var hashKey = getHash(patternConfig, rendererType);
        var renderer;
        switch (rendererType) {
            case types_1.RendererType.Canvas:
                renderer = canvas_1.default;
                break;
            // case RendererType.SVG:
            //   renderer = svgRenderer
            //   break
            default:
                throw new Error("Unknown renderer type: " + rendererType);
        }
        if (!fillPatternState_1.default.fillPatternCache[hashKey]) {
            var texture = fillPatternState_1.default.textureMap[patternConfig.name];
            if (!texture) {
                throw new Error("No such texture to load: " + patternConfig.name + "\n Please load the texture first!");
            }
            // Draw on the texture recursively and get the expected result
            var textureElement = renderer.getInitTexture(patternConfig.backgroundColor);
            if (!texture.draw) {
                throw new Error("Texture has no pre-defined draw function: " + texture.name);
            }
            texture.draw(textureElement, renderer, {
                mode: patternConfig.mode,
            });
            fillPatternState_1.default.fillPatternCache[hashKey] = textureElement;
        }
        return fillPatternState_1.default.fillPatternCache[hashKey];
    },
    textureModeType: {
        Light: types_1.TextureModeType.Light,
        Medium: types_1.TextureModeType.Medium,
        Heavy: types_1.TextureModeType.Heavy,
    },
};
// Need to load all built-in textures
util_1.default.loadTexture(new Line_1.default());
exports.default = fillPattern;


/***/ }),

/***/ "./src/fillPatternState.ts":
/*!*********************************!*\
  !*** ./src/fillPatternState.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fillPatternCache = {};
var textureMap = {};
exports.default = {
    fillPatternCache: fillPatternCache,
    textureMap: textureMap,
};


/***/ }),

/***/ "./src/renderers/canvas.ts":
/*!*********************************!*\
  !*** ./src/renderers/canvas.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(__webpack_require__(/*! ../util */ "./src/util.ts"));
var canvasRenderer = {
    getInitTexture: function (backgroundColor) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        if (!context) {
            throw new Error('canvas 2d context is not supported in this browser');
        }
        canvas.width = 2;
        canvas.height = 2;
        context.fillStyle = backgroundColor || 'transparent';
        context.fillRect(0, 0, 2, 2);
        return canvas;
    },
    drawLineTexture: function (canvasTextureElement, textureConfig) {
        if (!canvasTextureElement) {
            throw new Error('No canvas texture element to draw texture with');
        }
        var distance = textureConfig.distance;
        var lineWidth = textureConfig.thickness;
        var rotation = textureConfig.rotation;
        var dimensions = textureConfig.dimensions;
        if (!dimensions) {
            throw new Error('Line texture requires dimensions config');
        }
        var width = dimensions.width;
        var height = dimensions.height;
        // const isFill = textureConfig.isFill
        // const isStroke = textureConfig.isStroke
        var minY = height / 2 - distance;
        var maxY = height / 2 + distance;
        var minX = 0.5 * (width - Math.sqrt(width * width + height * height));
        var maxX = 0.5 * (width + Math.sqrt(width * width + height * height));
        var offsetX = (textureConfig.offsetX || 0) % width;
        var offsetY = (textureConfig.offsetY || 0) % height;
        var textureCanvas = document.createElement('canvas');
        var textureCtx = textureCanvas.getContext('2d');
        if (!textureCtx) {
            throw new Error('canvas 2d context is not supported in this browser');
        }
        textureCanvas.width = Math.floor(width);
        textureCanvas.height = Math.floor(height);
        // Start to draw lines
        // if (isFill) {
        //   textureCtx.fillStyle = config.color
        // }
        // if (isStroke) {
        //   textureCtx.strokeStyle = config.color
        // }
        textureCtx.strokeStyle = textureConfig.color;
        // Rotate texture canvas
        canvasRenderer.rotate(textureCanvas, rotation);
        textureCtx.lineWidth = lineWidth;
        textureCtx.beginPath();
        var y = minY;
        while (y <= maxY) {
            textureCtx.moveTo(minX + offsetX, y + offsetY);
            textureCtx.lineTo(maxX + offsetX, y + offsetY);
            // The canvas will be round down to full pixel dimension, while the calculation
            // assumes we are using the original larger dimensions in fraction of a pixel.
            // This will compensate that.
            y += distance - 0.25;
        }
        textureCtx.stroke();
        // if (isStroke) {
        //   textureCtx.stroke()
        // }
        // if (isFill) {
        //   textureCtx.fill()
        // }
        canvasRenderer.combineTextures(canvasTextureElement, textureCanvas);
    },
    rotate: function (canvasElement, angle, originPosition) {
        var context = canvasElement.getContext('2d');
        if (!context) {
            throw new Error('canvas 2d context is not supported in this browser');
        }
        var width = canvasElement.width;
        var height = canvasElement.height;
        var originX = width / 2;
        var originY = height / 2;
        // Rotate texture canvas
        if (originPosition) {
            originX = originPosition.x;
            originY = originPosition.y;
        }
        context.translate(originX, originY);
        context.rotate(angle);
        context.translate(-originX, -originY);
    },
    combineTextures: function (destinationCanvasTextureElement, sourceCanvasTextureElement) {
        var context = destinationCanvasTextureElement.getContext('2d');
        if (!context) {
            throw new Error('canvas 2d context is not supported in this browser');
        }
        var finalCanvasWidth = destinationCanvasTextureElement.width;
        var finalCanvasHeight = destinationCanvasTextureElement.height;
        var finalCanvas;
        var finalContext;
        context.save();
        // In case we have multiple patterns, we need to use a texture canvas the size of the
        // least common multiplier of width and height of all of them
        finalCanvasWidth = util_1.default.lcm(finalCanvasWidth, sourceCanvasTextureElement.width);
        finalCanvasHeight = util_1.default.lcm(finalCanvasHeight, sourceCanvasTextureElement.height);
        if (finalCanvasWidth === destinationCanvasTextureElement.width &&
            finalCanvasHeight === destinationCanvasTextureElement.height) {
            // the canvas is still fine to use
            context.fillStyle = context.createPattern(sourceCanvasTextureElement, 'repeat');
            context.fillRect(0, 0, finalCanvasWidth, finalCanvasHeight);
        }
        else {
            // we need to update the dimension for the canvas
            finalCanvas = document.createElement('canvas');
            finalCanvas.width = finalCanvasWidth;
            finalCanvas.height = finalCanvasHeight;
            finalContext = finalCanvas.getContext('2d');
            if (!finalContext) {
                throw new Error('canvas 2d context is not supported in this browser');
            }
            // First fill the original texture
            finalContext.fillStyle = finalContext.createPattern(destinationCanvasTextureElement, 'repeat');
            finalContext.fillRect(0, 0, finalCanvasWidth, finalCanvasHeight);
            // Then fill the new texture
            finalContext.fillStyle = finalContext.createPattern(sourceCanvasTextureElement, 'repeat');
            finalContext.fillRect(0, 0, finalCanvasWidth, finalCanvasHeight);
            // Update canvas and reset it to final canvas
            destinationCanvasTextureElement.width = finalCanvasWidth;
            destinationCanvasTextureElement.height = finalCanvasHeight;
            context.clearRect(0, 0, finalCanvasWidth, finalCanvasHeight);
            context.drawImage(finalCanvas, 0, 0);
        }
        context.restore();
    },
    // TODO: In SVG case, the source texture is actually just a svg pattern element
    // // We need to make some changes here to get this part working
    getDataURL: function (canvasTextureElement) { return canvasTextureElement.toDataURL(); },
    getTextureSize: function (canvasTextureElement) {
        return {
            width: canvasTextureElement.width,
            height: canvasTextureElement.height,
        };
    },
};
exports.default = canvasRenderer;


/***/ }),

/***/ "./src/textures/Base.ts":
/*!******************************!*\
  !*** ./src/textures/Base.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var fillPatternState_1 = __importDefault(__webpack_require__(/*! ../fillPatternState */ "./src/fillPatternState.ts"));
var BaseTexture = /** @class */ (function () {
    function BaseTexture(textureOptions) {
        this.name = 'baseTexture';
        this.mode = {
            // TODO: How to use enums for the default texture config name?
            default: {
                thickness: 1,
                distance: 3,
                rotation: 0,
                color: '#000000',
                offsetX: 0,
                offsetY: 0,
            },
        };
        Object.assign(this, textureOptions);
    }
    BaseTexture.prototype.draw = function (textureElement, renderer, drawConfig) {
        var mode = drawConfig.mode, config = drawConfig.config;
        var textureConfigs = this.mode[mode || types_1.TextureModeType.Default];
        if (!Array.isArray(textureConfigs)) {
            textureConfigs = [textureConfigs];
        }
        textureConfigs.forEach(function (configDetails) {
            var name = configDetails.name, detailConfigs = __rest(configDetails, ["name"]);
            if (!name) {
                // The pattern mode configs may contain any fill pattern as its children
                // layers. If it does so, it need to include the pattern name in the config
                // details. For basic fill patterns like line, circle or square, they need
                // to override draw function to draw by themselves, hence it should never
                // hit this condition here.
                throw new Error("Do not know how to draw this config: " + name);
            }
            // The config has a pattern name, which means it's composed by
            // other patterns
            var childTexture = fillPatternState_1.default.textureMap[name];
            if (!childTexture) {
                throw new Error("No such texture exist: " + name);
            }
            if (!childTexture.draw) {
                throw new Error("Cannot draw texture: " + name);
            }
            childTexture.draw(textureElement, renderer, {
                mode: mode,
                // We got some problem here
                // Should the config pass down to the grand children?
                config: Object.assign({}, detailConfigs, config),
            });
        });
    };
    return BaseTexture;
}());
exports.default = BaseTexture;


/***/ }),

/***/ "./src/textures/Line.ts":
/*!******************************!*\
  !*** ./src/textures/Line.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var base_1 = __importDefault(__webpack_require__(/*! ./base */ "./src/textures/base.ts"));
var DEFAULT_PATTERN_SIZE = 10;
function calculateDimensions(distance, rotation) {
    var width;
    var height;
    rotation = rotation % Math.PI;
    if (rotation === 0) {
        width = DEFAULT_PATTERN_SIZE;
        height = distance;
    }
    else if (rotation === Math.PI * 0.5) {
        width = distance;
        height = DEFAULT_PATTERN_SIZE;
    }
    else {
        width = distance / Math.sin(rotation);
        height = distance / Math.abs(Math.cos(rotation));
    }
    return {
        height: height,
        width: width,
    };
}
var lightModeTexture = {
    color: '#000000',
    distance: 4,
    rotation: 0,
    thickness: 1,
};
var mediumModeTexture = {
    color: '#000000',
    distance: 4,
    rotation: 0,
    thickness: 2,
};
var heavyModeTexture = {
    color: '#000000',
    distance: 4,
    rotation: 0,
    thickness: 3,
};
var LineTexture = /** @class */ (function (_super) {
    __extends(LineTexture, _super);
    function LineTexture() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'line';
        _this.mode = {
            // TODO: How to use enums for the default texture config name?
            default: mediumModeTexture,
            light: lightModeTexture,
            medium: mediumModeTexture,
            heavy: heavyModeTexture,
        };
        return _this;
    }
    LineTexture.prototype.draw = function (textureElement, renderer, drawConfig) {
        var mode = drawConfig.mode, config = drawConfig.config;
        var textureConfig = Object.assign({}, 
        // TODO: default to the medium mode, but it should really be some fallback mode
        this.mode[mode || types_1.TextureModeType.Medium], config);
        textureConfig.dimensions = textureConfig.dimensions ||
            calculateDimensions(textureConfig.distance, textureConfig.rotation);
        renderer.drawLineTexture(textureElement, textureConfig);
    };
    return LineTexture;
}(base_1.default));
exports.default = LineTexture;


/***/ }),

/***/ "./src/textures/base.ts":
/*!******************************!*\
  !*** ./src/textures/base.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var fillPatternState_1 = __importDefault(__webpack_require__(/*! ../fillPatternState */ "./src/fillPatternState.ts"));
var BaseTexture = /** @class */ (function () {
    function BaseTexture(textureOptions) {
        this.name = 'baseTexture';
        this.mode = {
            // TODO: How to use enums for the default texture config name?
            default: {
                thickness: 1,
                distance: 3,
                rotation: 0,
                color: '#000000',
                offsetX: 0,
                offsetY: 0,
            },
        };
        Object.assign(this, textureOptions);
    }
    BaseTexture.prototype.draw = function (textureElement, renderer, drawConfig) {
        var mode = drawConfig.mode, config = drawConfig.config;
        var textureConfigs = this.mode[mode || types_1.TextureModeType.Default];
        if (!Array.isArray(textureConfigs)) {
            textureConfigs = [textureConfigs];
        }
        textureConfigs.forEach(function (configDetails) {
            var name = configDetails.name, detailConfigs = __rest(configDetails, ["name"]);
            if (!name) {
                // The pattern mode configs may contain any fill pattern as its children
                // layers. If it does so, it need to include the pattern name in the config
                // details. For basic fill patterns like line, circle or square, they need
                // to override draw function to draw by themselves, hence it should never
                // hit this condition here.
                throw new Error("Do not know how to draw this config: " + name);
            }
            // The config has a pattern name, which means it's composed by
            // other patterns
            var childTexture = fillPatternState_1.default.textureMap[name];
            if (!childTexture) {
                throw new Error("No such texture exist: " + name);
            }
            if (!childTexture.draw) {
                throw new Error("Cannot draw texture: " + name);
            }
            childTexture.draw(textureElement, renderer, {
                mode: mode,
                // We got some problem here
                // Should the config pass down to the grand children?
                config: Object.assign({}, detailConfigs, config),
            });
        });
    };
    return BaseTexture;
}());
exports.default = BaseTexture;


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/***** Enums *****/
var RendererType;
(function (RendererType) {
    RendererType[RendererType["Canvas"] = 0] = "Canvas";
    RendererType[RendererType["SVG"] = 1] = "SVG";
})(RendererType = exports.RendererType || (exports.RendererType = {}));
var TextureModeType;
(function (TextureModeType) {
    TextureModeType[TextureModeType["Light"] = 0] = "Light";
    TextureModeType[TextureModeType["Medium"] = 1] = "Medium";
    TextureModeType[TextureModeType["Heavy"] = 2] = "Heavy";
    TextureModeType[TextureModeType["Default"] = 3] = "Default";
})(TextureModeType = exports.TextureModeType || (exports.TextureModeType = {}));


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fillPatternState_1 = __importDefault(__webpack_require__(/*! ./fillPatternState */ "./src/fillPatternState.ts"));
var gcdCache = {};
var util = {
    gcd: function (number1, number2) {
        if (typeof number1 !== 'number' || typeof number2 !== 'number' ||
            (Number.isNaN || isNaN)(number1) || (Number.isNaN || isNaN)(number2) ||
            number1 <= 0 || number2 <= 0) {
            return -1;
        }
        var key1 = number1 + '-' + number2;
        var key2 = number2 + '-' + number1;
        if (gcdCache[key1]) {
            return gcdCache[key1];
        }
        if (number1 !== number2) {
            if (number1 > number2) {
                number1 = number1 - number2;
            }
            else {
                number2 = number2 - number1;
            }
            gcdCache[key1] = util.gcd(number1, number2);
            gcdCache[key2] = gcdCache[key1];
            return gcdCache[key1];
        }
        else {
            gcdCache[key1] = number1;
            return number1;
        }
    },
    lcm: function (number1, number2) {
        if (typeof number1 !== 'number' || typeof number2 !== 'number' ||
            (Number.isNaN || isNaN)(number1) || (Number.isNaN || isNaN)(number2) ||
            number1 <= 0 || number2 <= 0) {
            return -1;
        }
        return number1 * number2 / util.gcd(number1, number2);
    },
    mixin: function (destinationObj, sourceObj) {
        var key;
        for (key in sourceObj) {
            if (sourceObj.hasOwnProperty(key)) {
                if (!destinationObj.hasOwnProperty(key)) {
                    destinationObj[key] = sourceObj[key];
                }
            }
        }
    },
    applyMixins: function (derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    },
    loadTexture: function (texture) {
        if (!fillPatternState_1.default.textureMap[texture.name]) {
            // util.applyMixins(texture, [BaseTexture])
            // util.mixin(texture, new BaseTexture())
            fillPatternState_1.default.textureMap[texture.name] = texture;
        }
        else {
            throw new Error("Duplicated texture name: " + texture.name);
        }
    },
};
exports.default = util;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWxsUGF0dGVybi93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZmlsbFBhdHRlcm4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmlsbFBhdHRlcm4vLi9zcmMvZmlsbFBhdHRlcm4udHMiLCJ3ZWJwYWNrOi8vZmlsbFBhdHRlcm4vLi9zcmMvZmlsbFBhdHRlcm5TdGF0ZS50cyIsIndlYnBhY2s6Ly9maWxsUGF0dGVybi8uL3NyYy9yZW5kZXJlcnMvY2FudmFzLnRzIiwid2VicGFjazovL2ZpbGxQYXR0ZXJuLy4vc3JjL3RleHR1cmVzL0Jhc2UudHMiLCJ3ZWJwYWNrOi8vZmlsbFBhdHRlcm4vLi9zcmMvdGV4dHVyZXMvTGluZS50cyIsIndlYnBhY2s6Ly9maWxsUGF0dGVybi8uL3NyYy90ZXh0dXJlcy9iYXNlLnRzIiwid2VicGFjazovL2ZpbGxQYXR0ZXJuLy4vc3JjL3R5cGVzLnRzIiwid2VicGFjazovL2ZpbGxQYXR0ZXJuLy4vc3JjL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hB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LENBQUMsOEJBQTRCLE9BQU8sQ0FBQyxJQUFNLENBQUM7U0FDNUQ7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJIiwiZmlsZSI6ImZpbGxQYXR0ZXJuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJmaWxsUGF0dGVyblwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJmaWxsUGF0dGVyblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJmaWxsUGF0dGVyblwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZmlsbFBhdHRlcm4udHNcIik7XG4iLCIvLyBteSBhd2Vzb20gbGlicmFyeVxuaW1wb3J0IHtJUGF0dGVybkNvbmZpZywgSVJlbmRlcmVyLCBUZXh0dXJlRWxlbWVudCwgUmVuZGVyZXJUeXBlLCBJVGV4dHVyZSwgVGV4dHVyZU1vZGVUeXBlfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlsJ1xuLy8gaW1wb3J0IHN2Z1JlbmRlcmVyIGZyb20gJy4vcmVuZGVyZXJzL3N2ZydcbmltcG9ydCBjYW52YXNSZW5kZXJlciBmcm9tICcuL3JlbmRlcmVycy9jYW52YXMnXG5pbXBvcnQgZmlsbFBhdHRlcm5TdGF0ZSBmcm9tICcuL2ZpbGxQYXR0ZXJuU3RhdGUnXG5pbXBvcnQgQmFzZVRleHR1cmUgZnJvbSAnLi90ZXh0dXJlcy9CYXNlJ1xuaW1wb3J0IExpbmVUZXh0dXJlIGZyb20gJy4vdGV4dHVyZXMvTGluZSdcblxuLyoqKioqIFV0aWwgZnVuY3Rpb25zICoqKioqL1xuLyoqXG4gKiBHZXQgdGhlIGhhc2ggZm9yIGdpdmVuIGZpbGwgcGF0dGVybiBjb25maWcuXG4gKiBUaGUgaGFzaCByZXN1bHQgaXMgdXNlZCB0byBkZWNpZGUgaWYgZ2l2ZW4gY29uZmlnIGlzIGluIGNhY2hlZCBwYXR0ZXJucy5cbiAqIEBwYXJhbSBwYXR0ZXJuQ29uZmlnIGZpbGwgcGF0dGVybiBjb25maWdcbiAqIEByZXR1cm5zIHN0cmluZyBoYXNoIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIGdldEhhc2gocGF0dGVybkNvbmZpZzogSVBhdHRlcm5Db25maWcsIHJlbmRlcmVyVHlwZTogUmVuZGVyZXJUeXBlKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3JlbmRlcmVyVHlwZX0tJHtKU09OLnN0cmluZ2lmeShwYXR0ZXJuQ29uZmlnKX1gXG59XG5cbmNvbnN0IGZpbGxQYXR0ZXJuID0ge1xuICBSZW5kZXJlclR5cGUsXG5cbiAgVGV4dHVyZU1vZGVUeXBlLFxuXG4gIGxvYWRUZXh0dXJlOiAodGV4dHVyZTogSVRleHR1cmUpOiB2b2lkID0+IHtcbiAgICBpZiAoIWZpbGxQYXR0ZXJuU3RhdGUudGV4dHVyZU1hcFt0ZXh0dXJlLm5hbWVdKSB7XG4gICAgICAvLyB1dGlsLmFwcGx5TWl4aW5zKHRleHR1cmUsIFtCYXNlVGV4dHVyZV0pXG4gICAgICAvLyB1dGlsLm1peGluKHRleHR1cmUsIG5ldyBCYXNlVGV4dHVyZSgpKVxuXG4gICAgICBmaWxsUGF0dGVyblN0YXRlLnRleHR1cmVNYXBbdGV4dHVyZS5uYW1lXSA9IG5ldyBCYXNlVGV4dHVyZSh0ZXh0dXJlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZWQgdGV4dHVyZSBuYW1lOiAke3RleHR1cmUubmFtZX1gKVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRleHR1cmUgZnJvbSB0aGUgcGF0dGVybiBjb25maWdcbiAgICogQHBhcmFtIHBhdHRlcm5Db25maWcgZmlsbCBwYXR0ZXJuIGNvbmZpZ1xuICAgKiBAcmV0dXJucyBjYW52YXMgcGF0dGVybiB0aGF0IGNhbiBiZSB1c2VkIGZvciBmaWxsIGluc3RydWN0aW9uXG4gICAqL1xuICBnZXRUZXh0dXJlOiAocGF0dGVybkNvbmZpZzogSVBhdHRlcm5Db25maWcsIHJlbmRlcmVyVHlwZTogUmVuZGVyZXJUeXBlKTogVGV4dHVyZUVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IGhhc2hLZXk6IHN0cmluZyA9IGdldEhhc2gocGF0dGVybkNvbmZpZywgcmVuZGVyZXJUeXBlKVxuICAgIGxldCByZW5kZXJlclxuXG4gICAgc3dpdGNoIChyZW5kZXJlclR5cGUpIHtcbiAgICAgIGNhc2UgUmVuZGVyZXJUeXBlLkNhbnZhczpcbiAgICAgICAgcmVuZGVyZXIgPSBjYW52YXNSZW5kZXJlclxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBjYXNlIFJlbmRlcmVyVHlwZS5TVkc6XG4gICAgICAvLyAgIHJlbmRlcmVyID0gc3ZnUmVuZGVyZXJcbiAgICAgIC8vICAgYnJlYWtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHJlbmRlcmVyIHR5cGU6ICR7cmVuZGVyZXJUeXBlfWApXG4gICAgfVxuXG4gICAgaWYgKCFmaWxsUGF0dGVyblN0YXRlLmZpbGxQYXR0ZXJuQ2FjaGVbaGFzaEtleV0pIHtcbiAgICAgIGNvbnN0IHRleHR1cmUgPSBmaWxsUGF0dGVyblN0YXRlLnRleHR1cmVNYXBbcGF0dGVybkNvbmZpZy5uYW1lXVxuXG4gICAgICBpZiAoIXRleHR1cmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBzdWNoIHRleHR1cmUgdG8gbG9hZDogJHtwYXR0ZXJuQ29uZmlnLm5hbWV9XFxuIFBsZWFzZSBsb2FkIHRoZSB0ZXh0dXJlIGZpcnN0IWApXG4gICAgICB9XG5cbiAgICAgIC8vIERyYXcgb24gdGhlIHRleHR1cmUgcmVjdXJzaXZlbHkgYW5kIGdldCB0aGUgZXhwZWN0ZWQgcmVzdWx0XG4gICAgICBjb25zdCB0ZXh0dXJlRWxlbWVudCA9IHJlbmRlcmVyLmdldEluaXRUZXh0dXJlKHBhdHRlcm5Db25maWcuYmFja2dyb3VuZENvbG9yKVxuXG4gICAgICBpZiAoIXRleHR1cmUuZHJhdykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRleHR1cmUgaGFzIG5vIHByZS1kZWZpbmVkIGRyYXcgZnVuY3Rpb246ICR7dGV4dHVyZS5uYW1lfWApXG4gICAgICB9XG5cbiAgICAgIHRleHR1cmUuZHJhdyh0ZXh0dXJlRWxlbWVudCwgcmVuZGVyZXIsIHtcbiAgICAgICAgbW9kZTogcGF0dGVybkNvbmZpZy5tb2RlLFxuICAgICAgfSlcblxuICAgICAgZmlsbFBhdHRlcm5TdGF0ZS5maWxsUGF0dGVybkNhY2hlW2hhc2hLZXldID0gdGV4dHVyZUVsZW1lbnRcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsbFBhdHRlcm5TdGF0ZS5maWxsUGF0dGVybkNhY2hlW2hhc2hLZXldXG4gIH0sXG5cbiAgdGV4dHVyZU1vZGVUeXBlOiB7XG4gICAgTGlnaHQ6IFRleHR1cmVNb2RlVHlwZS5MaWdodCxcbiAgICBNZWRpdW06IFRleHR1cmVNb2RlVHlwZS5NZWRpdW0sXG4gICAgSGVhdnk6IFRleHR1cmVNb2RlVHlwZS5IZWF2eSxcbiAgfSxcbn1cblxuLy8gTmVlZCB0byBsb2FkIGFsbCBidWlsdC1pbiB0ZXh0dXJlc1xudXRpbC5sb2FkVGV4dHVyZShuZXcgTGluZVRleHR1cmUoKSlcblxuZXhwb3J0IGRlZmF1bHQgZmlsbFBhdHRlcm5cbiIsImltcG9ydCB7IFRleHR1cmVFbGVtZW50LCBJVGV4dHVyZSB9IGZyb20gJy4vdHlwZXMnXG5cbmNvbnN0IGZpbGxQYXR0ZXJuQ2FjaGU6IHtba2V5OiBzdHJpbmddOiBUZXh0dXJlRWxlbWVudH0gPSB7fVxuY29uc3QgdGV4dHVyZU1hcDoge1trZXk6IHN0cmluZ106IElUZXh0dXJlfSA9IHt9XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmlsbFBhdHRlcm5DYWNoZSxcbiAgdGV4dHVyZU1hcCxcbn1cbiIsImltcG9ydCB7XG4gIFRleHR1cmVFbGVtZW50LFxuICBJVGV4dHVyZUNvbmZpZyxcbiAgSVBvc2l0aW9uLFxuICBJRGltZW5zaW9uLFxuICBJUmVuZGVyZXIsXG4gIElSZW5kZXJhYmxlRWxlbWVudCxcbiAgSVNpbXBsZVRleHR1cmVDb25maWcgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCB1dGlsIGZyb20gJy4uL3V0aWwnXG5cbmNvbnN0IGNhbnZhc1JlbmRlcmVyOiBJUmVuZGVyZXIgPSB7XG4gIGdldEluaXRUZXh0dXJlOiAoYmFja2dyb3VuZENvbG9yOiBzdHJpbmcpOiBIVE1MQ2FudmFzRWxlbWVudCA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcblxuICAgIGlmICghY29udGV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW52YXMgMmQgY29udGV4dCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpXG4gICAgfVxuXG4gICAgY2FudmFzLndpZHRoID0gMlxuICAgIGNhbnZhcy5oZWlnaHQgPSAyXG5cbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGJhY2tncm91bmRDb2xvciB8fCAndHJhbnNwYXJlbnQnXG4gICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCAyLCAyKVxuXG4gICAgcmV0dXJuIGNhbnZhc1xuICB9LFxuXG4gIGRyYXdMaW5lVGV4dHVyZTogKGNhbnZhc1RleHR1cmVFbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCwgdGV4dHVyZUNvbmZpZzogSVNpbXBsZVRleHR1cmVDb25maWcpOiB2b2lkID0+IHtcbiAgICBpZiAoIWNhbnZhc1RleHR1cmVFbGVtZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNhbnZhcyB0ZXh0dXJlIGVsZW1lbnQgdG8gZHJhdyB0ZXh0dXJlIHdpdGgnKVxuICAgIH1cblxuICAgIGNvbnN0IGRpc3RhbmNlID0gdGV4dHVyZUNvbmZpZy5kaXN0YW5jZVxuICAgIGNvbnN0IGxpbmVXaWR0aCA9IHRleHR1cmVDb25maWcudGhpY2tuZXNzXG4gICAgY29uc3Qgcm90YXRpb24gPSB0ZXh0dXJlQ29uZmlnLnJvdGF0aW9uXG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRleHR1cmVDb25maWcuZGltZW5zaW9uc1xuXG4gICAgaWYgKCFkaW1lbnNpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmUgdGV4dHVyZSByZXF1aXJlcyBkaW1lbnNpb25zIGNvbmZpZycpXG4gICAgfVxuXG4gICAgY29uc3Qgd2lkdGggPSBkaW1lbnNpb25zLndpZHRoXG4gICAgY29uc3QgaGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHRcbiAgICAvLyBjb25zdCBpc0ZpbGwgPSB0ZXh0dXJlQ29uZmlnLmlzRmlsbFxuICAgIC8vIGNvbnN0IGlzU3Ryb2tlID0gdGV4dHVyZUNvbmZpZy5pc1N0cm9rZVxuICAgIGNvbnN0IG1pblkgPSBoZWlnaHQgLyAyIC0gZGlzdGFuY2VcbiAgICBjb25zdCBtYXhZID0gaGVpZ2h0IC8gMiArIGRpc3RhbmNlXG4gICAgY29uc3QgbWluWCA9IDAuNSAqICh3aWR0aCAtIE1hdGguc3FydCh3aWR0aCAqIHdpZHRoICsgaGVpZ2h0ICogaGVpZ2h0KSlcbiAgICBjb25zdCBtYXhYID0gMC41ICogKHdpZHRoICsgTWF0aC5zcXJ0KHdpZHRoICogd2lkdGggKyBoZWlnaHQgKiBoZWlnaHQpKVxuICAgIGNvbnN0IG9mZnNldFggPSAodGV4dHVyZUNvbmZpZy5vZmZzZXRYIHx8IDApICUgd2lkdGhcbiAgICBjb25zdCBvZmZzZXRZID0gKHRleHR1cmVDb25maWcub2Zmc2V0WSB8fCAwKSAlIGhlaWdodFxuICAgIGNvbnN0IHRleHR1cmVDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGNvbnN0IHRleHR1cmVDdHggPSB0ZXh0dXJlQ2FudmFzLmdldENvbnRleHQoJzJkJylcblxuICAgIGlmICghdGV4dHVyZUN0eCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW52YXMgMmQgY29udGV4dCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpXG4gICAgfVxuXG4gICAgdGV4dHVyZUNhbnZhcy53aWR0aCA9IE1hdGguZmxvb3Iod2lkdGgpXG4gICAgdGV4dHVyZUNhbnZhcy5oZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodClcblxuICAgIC8vIFN0YXJ0IHRvIGRyYXcgbGluZXNcbiAgICAvLyBpZiAoaXNGaWxsKSB7XG4gICAgLy8gICB0ZXh0dXJlQ3R4LmZpbGxTdHlsZSA9IGNvbmZpZy5jb2xvclxuICAgIC8vIH1cblxuICAgIC8vIGlmIChpc1N0cm9rZSkge1xuICAgIC8vICAgdGV4dHVyZUN0eC5zdHJva2VTdHlsZSA9IGNvbmZpZy5jb2xvclxuICAgIC8vIH1cblxuICAgIHRleHR1cmVDdHguc3Ryb2tlU3R5bGUgPSB0ZXh0dXJlQ29uZmlnLmNvbG9yXG5cbiAgICAvLyBSb3RhdGUgdGV4dHVyZSBjYW52YXNcbiAgICBjYW52YXNSZW5kZXJlci5yb3RhdGUodGV4dHVyZUNhbnZhcywgcm90YXRpb24pXG4gICAgdGV4dHVyZUN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGhcbiAgICB0ZXh0dXJlQ3R4LmJlZ2luUGF0aCgpXG5cbiAgICBsZXQgeSA9IG1pbllcbiAgICB3aGlsZSAoeSA8PSBtYXhZKSB7XG4gICAgICB0ZXh0dXJlQ3R4Lm1vdmVUbyhtaW5YICsgb2Zmc2V0WCwgeSArIG9mZnNldFkpXG4gICAgICB0ZXh0dXJlQ3R4LmxpbmVUbyhtYXhYICsgb2Zmc2V0WCwgeSArIG9mZnNldFkpXG5cbiAgICAgIC8vIFRoZSBjYW52YXMgd2lsbCBiZSByb3VuZCBkb3duIHRvIGZ1bGwgcGl4ZWwgZGltZW5zaW9uLCB3aGlsZSB0aGUgY2FsY3VsYXRpb25cbiAgICAgIC8vIGFzc3VtZXMgd2UgYXJlIHVzaW5nIHRoZSBvcmlnaW5hbCBsYXJnZXIgZGltZW5zaW9ucyBpbiBmcmFjdGlvbiBvZiBhIHBpeGVsLlxuICAgICAgLy8gVGhpcyB3aWxsIGNvbXBlbnNhdGUgdGhhdC5cbiAgICAgIHkgKz0gZGlzdGFuY2UgLSAwLjI1XG4gICAgfVxuXG4gICAgdGV4dHVyZUN0eC5zdHJva2UoKVxuXG4gICAgLy8gaWYgKGlzU3Ryb2tlKSB7XG4gICAgLy8gICB0ZXh0dXJlQ3R4LnN0cm9rZSgpXG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKGlzRmlsbCkge1xuICAgIC8vICAgdGV4dHVyZUN0eC5maWxsKClcbiAgICAvLyB9XG5cbiAgICBjYW52YXNSZW5kZXJlci5jb21iaW5lVGV4dHVyZXMoY2FudmFzVGV4dHVyZUVsZW1lbnQsIHRleHR1cmVDYW52YXMpXG4gIH0sXG5cbiAgcm90YXRlOiAoY2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQsIGFuZ2xlOiBudW1iZXIsIG9yaWdpblBvc2l0aW9uPzogSVBvc2l0aW9uKTogdm9pZCA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbnZhcyAyZCBjb250ZXh0IGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAgICB9XG5cbiAgICBjb25zdCB3aWR0aCA9IGNhbnZhc0VsZW1lbnQud2lkdGhcbiAgICBjb25zdCBoZWlnaHQgPSBjYW52YXNFbGVtZW50LmhlaWdodFxuICAgIGxldCBvcmlnaW5YID0gd2lkdGggLyAyXG4gICAgbGV0IG9yaWdpblkgPSBoZWlnaHQgLyAyXG5cbiAgICAvLyBSb3RhdGUgdGV4dHVyZSBjYW52YXNcbiAgICBpZiAob3JpZ2luUG9zaXRpb24pIHtcbiAgICAgIG9yaWdpblggPSBvcmlnaW5Qb3NpdGlvbi54XG4gICAgICBvcmlnaW5ZID0gb3JpZ2luUG9zaXRpb24ueVxuICAgIH1cblxuICAgIGNvbnRleHQudHJhbnNsYXRlKG9yaWdpblgsIG9yaWdpblkpXG4gICAgY29udGV4dC5yb3RhdGUoYW5nbGUpXG4gICAgY29udGV4dC50cmFuc2xhdGUoLW9yaWdpblgsIC1vcmlnaW5ZKVxuICB9LFxuXG4gIGNvbWJpbmVUZXh0dXJlczogKFxuICAgIGRlc3RpbmF0aW9uQ2FudmFzVGV4dHVyZUVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50LCBzb3VyY2VDYW52YXNUZXh0dXJlRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0gZGVzdGluYXRpb25DYW52YXNUZXh0dXJlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpXG5cbiAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2FudmFzIDJkIGNvbnRleHQgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKVxuICAgIH1cblxuICAgIGxldCBmaW5hbENhbnZhc1dpZHRoOiBudW1iZXIgPSBkZXN0aW5hdGlvbkNhbnZhc1RleHR1cmVFbGVtZW50LndpZHRoXG4gICAgbGV0IGZpbmFsQ2FudmFzSGVpZ2h0OiBudW1iZXIgPSBkZXN0aW5hdGlvbkNhbnZhc1RleHR1cmVFbGVtZW50LmhlaWdodFxuICAgIGxldCBmaW5hbENhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbiAgICBsZXQgZmluYWxDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsXG5cbiAgICBjb250ZXh0LnNhdmUoKVxuICAgIC8vIEluIGNhc2Ugd2UgaGF2ZSBtdWx0aXBsZSBwYXR0ZXJucywgd2UgbmVlZCB0byB1c2UgYSB0ZXh0dXJlIGNhbnZhcyB0aGUgc2l6ZSBvZiB0aGVcbiAgICAvLyBsZWFzdCBjb21tb24gbXVsdGlwbGllciBvZiB3aWR0aCBhbmQgaGVpZ2h0IG9mIGFsbCBvZiB0aGVtXG4gICAgZmluYWxDYW52YXNXaWR0aCA9IHV0aWwubGNtKGZpbmFsQ2FudmFzV2lkdGgsIHNvdXJjZUNhbnZhc1RleHR1cmVFbGVtZW50LndpZHRoKVxuICAgIGZpbmFsQ2FudmFzSGVpZ2h0ID0gdXRpbC5sY20oZmluYWxDYW52YXNIZWlnaHQsIHNvdXJjZUNhbnZhc1RleHR1cmVFbGVtZW50LmhlaWdodClcblxuICAgIGlmIChmaW5hbENhbnZhc1dpZHRoID09PSBkZXN0aW5hdGlvbkNhbnZhc1RleHR1cmVFbGVtZW50LndpZHRoICYmXG4gICAgICBmaW5hbENhbnZhc0hlaWdodCA9PT0gZGVzdGluYXRpb25DYW52YXNUZXh0dXJlRWxlbWVudC5oZWlnaHQpIHtcbiAgICAgIC8vIHRoZSBjYW52YXMgaXMgc3RpbGwgZmluZSB0byB1c2VcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29udGV4dC5jcmVhdGVQYXR0ZXJuKHNvdXJjZUNhbnZhc1RleHR1cmVFbGVtZW50LCAncmVwZWF0JylcbiAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgZmluYWxDYW52YXNXaWR0aCwgZmluYWxDYW52YXNIZWlnaHQpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBkaW1lbnNpb24gZm9yIHRoZSBjYW52YXNcbiAgICAgIGZpbmFsQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICAgIGZpbmFsQ2FudmFzLndpZHRoID0gZmluYWxDYW52YXNXaWR0aFxuICAgICAgZmluYWxDYW52YXMuaGVpZ2h0ID0gZmluYWxDYW52YXNIZWlnaHRcbiAgICAgIGZpbmFsQ29udGV4dCA9IGZpbmFsQ2FudmFzLmdldENvbnRleHQoJzJkJylcblxuICAgICAgaWYgKCFmaW5hbENvbnRleHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW52YXMgMmQgY29udGV4dCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpXG4gICAgICB9XG5cbiAgICAgIC8vIEZpcnN0IGZpbGwgdGhlIG9yaWdpbmFsIHRleHR1cmVcbiAgICAgIGZpbmFsQ29udGV4dC5maWxsU3R5bGUgPSBmaW5hbENvbnRleHQuY3JlYXRlUGF0dGVybihkZXN0aW5hdGlvbkNhbnZhc1RleHR1cmVFbGVtZW50LCAncmVwZWF0JylcbiAgICAgIGZpbmFsQ29udGV4dC5maWxsUmVjdCgwLCAwLCBmaW5hbENhbnZhc1dpZHRoLCBmaW5hbENhbnZhc0hlaWdodClcblxuICAgICAgLy8gVGhlbiBmaWxsIHRoZSBuZXcgdGV4dHVyZVxuICAgICAgZmluYWxDb250ZXh0LmZpbGxTdHlsZSA9IGZpbmFsQ29udGV4dC5jcmVhdGVQYXR0ZXJuKHNvdXJjZUNhbnZhc1RleHR1cmVFbGVtZW50LCAncmVwZWF0JylcbiAgICAgIGZpbmFsQ29udGV4dC5maWxsUmVjdCgwLCAwLCBmaW5hbENhbnZhc1dpZHRoLCBmaW5hbENhbnZhc0hlaWdodClcblxuICAgICAgLy8gVXBkYXRlIGNhbnZhcyBhbmQgcmVzZXQgaXQgdG8gZmluYWwgY2FudmFzXG4gICAgICBkZXN0aW5hdGlvbkNhbnZhc1RleHR1cmVFbGVtZW50LndpZHRoID0gZmluYWxDYW52YXNXaWR0aFxuICAgICAgZGVzdGluYXRpb25DYW52YXNUZXh0dXJlRWxlbWVudC5oZWlnaHQgPSBmaW5hbENhbnZhc0hlaWdodFxuICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgZmluYWxDYW52YXNXaWR0aCwgZmluYWxDYW52YXNIZWlnaHQpXG4gICAgICBjb250ZXh0LmRyYXdJbWFnZShmaW5hbENhbnZhcywgMCwgMClcbiAgICB9XG4gICAgY29udGV4dC5yZXN0b3JlKClcbiAgfSxcblxuICAvLyBUT0RPOiBJbiBTVkcgY2FzZSwgdGhlIHNvdXJjZSB0ZXh0dXJlIGlzIGFjdHVhbGx5IGp1c3QgYSBzdmcgcGF0dGVybiBlbGVtZW50XG4gIC8vIC8vIFdlIG5lZWQgdG8gbWFrZSBzb21lIGNoYW5nZXMgaGVyZSB0byBnZXQgdGhpcyBwYXJ0IHdvcmtpbmdcbiAgZ2V0RGF0YVVSTDogKGNhbnZhc1RleHR1cmVFbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCk6IHN0cmluZyA9PiBjYW52YXNUZXh0dXJlRWxlbWVudC50b0RhdGFVUkwoKSxcblxuICBnZXRUZXh0dXJlU2l6ZTogKGNhbnZhc1RleHR1cmVFbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCk6IElEaW1lbnNpb24gPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogY2FudmFzVGV4dHVyZUVsZW1lbnQud2lkdGgsXG4gICAgICBoZWlnaHQ6IGNhbnZhc1RleHR1cmVFbGVtZW50LmhlaWdodCxcbiAgICB9XG4gIH0sXG5cbiAgLy8gLy8gUmVuZGVyaW5nIHJlbGF0ZWQgYXBpXG4gIC8vIGRyYXdDaXJjbGVUZXh0dXJlOiAodGV4dHVyZUVsZW1lbnQ6IFRleHR1cmVFbGVtZW50LCB0ZXh0dXJlQ29uZmlnOiBJVGV4dHVyZUNvbmZpZykgPT4gdm9pZFxuICAvLyBkcmF3U3F1YXJlVGV4dHVyZTogKHRleHR1cmVFbGVtZW50OiBUZXh0dXJlRWxlbWVudCwgdGV4dHVyZUNvbmZpZzogSVRleHR1cmVDb25maWcpID0+IHZvaWRcbiAgLy8gZHJhd0Rpc2FibGVkVGV4dHVyZTogKHRleHR1cmVFbGVtZW50OiBUZXh0dXJlRWxlbWVudCwgdGV4dHVyZUNvbmZpZzogSVRleHR1cmVDb25maWcpID0+IHZvaWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FudmFzUmVuZGVyZXJcbiIsImltcG9ydCB7XG4gIFRleHR1cmVFbGVtZW50LFxuICBJUmVuZGVyZXIsXG4gIElEcmF3Q29uZmlnLFxuICBJVGV4dHVyZUNvbmZpZyxcbiAgVGV4dHVyZU1vZGVUeXBlLFxuICBJVGV4dHVyZSxcbiAgQ29tcGxleFRleHR1cmVDb25maWcgfSBmcm9tICcuLi90eXBlcydcblxuaW1wb3J0IGZpbGxQYXR0ZXJuU3RhdGUgZnJvbSAnLi4vZmlsbFBhdHRlcm5TdGF0ZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVRleHR1cmUgaW1wbGVtZW50cyBJVGV4dHVyZSB7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSAnYmFzZVRleHR1cmUnXG5cbiAgcHVibGljIG1vZGU6IHtba2V5OiBzdHJpbmddOiBJVGV4dHVyZUNvbmZpZ30gPSB7XG4gICAgLy8gVE9ETzogSG93IHRvIHVzZSBlbnVtcyBmb3IgdGhlIGRlZmF1bHQgdGV4dHVyZSBjb25maWcgbmFtZT9cbiAgICBkZWZhdWx0OiB7XG4gICAgICB0aGlja25lc3M6IDEsXG4gICAgICBkaXN0YW5jZTogMyxcbiAgICAgIHJvdGF0aW9uOiAwLFxuICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgIG9mZnNldFg6IDAsXG4gICAgICBvZmZzZXRZOiAwLFxuICAgIH0sXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih0ZXh0dXJlT3B0aW9ucz86IElUZXh0dXJlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0ZXh0dXJlT3B0aW9ucylcbiAgfVxuXG4gIHB1YmxpYyBkcmF3KHRleHR1cmVFbGVtZW50OiBUZXh0dXJlRWxlbWVudCwgcmVuZGVyZXI6IElSZW5kZXJlciwgZHJhd0NvbmZpZzogSURyYXdDb25maWcpIHtcbiAgICBjb25zdCB7IG1vZGUsIGNvbmZpZyB9ID0gZHJhd0NvbmZpZ1xuICAgIGxldCB0ZXh0dXJlQ29uZmlnczogSVRleHR1cmVDb25maWcgPSB0aGlzLm1vZGVbbW9kZSB8fCBUZXh0dXJlTW9kZVR5cGUuRGVmYXVsdF1cblxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0ZXh0dXJlQ29uZmlncykpIHtcbiAgICAgIHRleHR1cmVDb25maWdzID0gW3RleHR1cmVDb25maWdzXVxuICAgIH1cblxuICAgIHRleHR1cmVDb25maWdzLmZvckVhY2goKGNvbmZpZ0RldGFpbHMpID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgLi4uZGV0YWlsQ29uZmlncyB9ID0gY29uZmlnRGV0YWlsc1xuXG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgLy8gVGhlIHBhdHRlcm4gbW9kZSBjb25maWdzIG1heSBjb250YWluIGFueSBmaWxsIHBhdHRlcm4gYXMgaXRzIGNoaWxkcmVuXG4gICAgICAgIC8vIGxheWVycy4gSWYgaXQgZG9lcyBzbywgaXQgbmVlZCB0byBpbmNsdWRlIHRoZSBwYXR0ZXJuIG5hbWUgaW4gdGhlIGNvbmZpZ1xuICAgICAgICAvLyBkZXRhaWxzLiBGb3IgYmFzaWMgZmlsbCBwYXR0ZXJucyBsaWtlIGxpbmUsIGNpcmNsZSBvciBzcXVhcmUsIHRoZXkgbmVlZFxuICAgICAgICAvLyB0byBvdmVycmlkZSBkcmF3IGZ1bmN0aW9uIHRvIGRyYXcgYnkgdGhlbXNlbHZlcywgaGVuY2UgaXQgc2hvdWxkIG5ldmVyXG4gICAgICAgIC8vIGhpdCB0aGlzIGNvbmRpdGlvbiBoZXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYERvIG5vdCBrbm93IGhvdyB0byBkcmF3IHRoaXMgY29uZmlnOiAke25hbWV9YClcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbmZpZyBoYXMgYSBwYXR0ZXJuIG5hbWUsIHdoaWNoIG1lYW5zIGl0J3MgY29tcG9zZWQgYnlcbiAgICAgIC8vIG90aGVyIHBhdHRlcm5zXG4gICAgICBjb25zdCBjaGlsZFRleHR1cmUgPSBmaWxsUGF0dGVyblN0YXRlLnRleHR1cmVNYXBbbmFtZV1cblxuICAgICAgaWYgKCFjaGlsZFRleHR1cmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBzdWNoIHRleHR1cmUgZXhpc3Q6ICR7bmFtZX1gKVxuICAgICAgfVxuXG4gICAgICBpZiAoIWNoaWxkVGV4dHVyZS5kcmF3KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGRyYXcgdGV4dHVyZTogJHtuYW1lfWApXG4gICAgICB9XG5cbiAgICAgIGNoaWxkVGV4dHVyZS5kcmF3KHRleHR1cmVFbGVtZW50LCByZW5kZXJlciwge1xuICAgICAgICBtb2RlLFxuICAgICAgICAvLyBXZSBnb3Qgc29tZSBwcm9ibGVtIGhlcmVcbiAgICAgICAgLy8gU2hvdWxkIHRoZSBjb25maWcgcGFzcyBkb3duIHRvIHRoZSBncmFuZCBjaGlsZHJlbj9cbiAgICAgICAgY29uZmlnOiBPYmplY3QuYXNzaWduKHt9LCBkZXRhaWxDb25maWdzLCBjb25maWcpLFxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJRGltZW5zaW9uLFxuICBJVGV4dHVyZSxcbiAgVGV4dHVyZU1vZGVUeXBlLFxuICBUZXh0dXJlRWxlbWVudCxcbiAgSVJlbmRlcmVyLFxuICBJRHJhd0NvbmZpZyxcbiAgSVNpbXBsZVRleHR1cmVDb25maWcsXG4gIElUZXh0dXJlQ29uZmlnfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCBCYXNlVGV4dHVyZSBmcm9tICcuL2Jhc2UnXG5pbXBvcnQgdXRpbCBmcm9tICcuLi91dGlsJ1xuXG5jb25zdCBERUZBVUxUX1BBVFRFUk5fU0laRTogbnVtYmVyID0gMTBcblxuZnVuY3Rpb24gY2FsY3VsYXRlRGltZW5zaW9ucyhkaXN0YW5jZTogbnVtYmVyLCByb3RhdGlvbjogbnVtYmVyKTogSURpbWVuc2lvbiB7XG4gIGxldCB3aWR0aDogbnVtYmVyXG4gIGxldCBoZWlnaHQ6IG51bWJlclxuXG4gIHJvdGF0aW9uID0gcm90YXRpb24gJSBNYXRoLlBJXG5cbiAgaWYgKHJvdGF0aW9uID09PSAwKSB7XG4gICAgd2lkdGggPSBERUZBVUxUX1BBVFRFUk5fU0laRVxuICAgIGhlaWdodCA9IGRpc3RhbmNlXG4gIH0gZWxzZSBpZiAocm90YXRpb24gPT09IE1hdGguUEkgKiAwLjUpIHtcbiAgICB3aWR0aCA9IGRpc3RhbmNlXG4gICAgaGVpZ2h0ID0gREVGQVVMVF9QQVRURVJOX1NJWkVcbiAgfSBlbHNlIHtcbiAgICB3aWR0aCA9IGRpc3RhbmNlIC8gTWF0aC5zaW4ocm90YXRpb24pXG4gICAgaGVpZ2h0ID0gZGlzdGFuY2UgLyBNYXRoLmFicyhNYXRoLmNvcyhyb3RhdGlvbikpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhlaWdodCxcbiAgICB3aWR0aCxcbiAgfVxufVxuXG5jb25zdCBsaWdodE1vZGVUZXh0dXJlOiBJU2ltcGxlVGV4dHVyZUNvbmZpZyA9IHtcbiAgY29sb3I6ICcjMDAwMDAwJyxcbiAgZGlzdGFuY2U6IDQsXG4gIHJvdGF0aW9uOiAwLFxuICB0aGlja25lc3M6IDEsXG59XG5cbmNvbnN0IG1lZGl1bU1vZGVUZXh0dXJlOiBJU2ltcGxlVGV4dHVyZUNvbmZpZyA9IHtcbiAgY29sb3I6ICcjMDAwMDAwJyxcbiAgZGlzdGFuY2U6IDQsXG4gIHJvdGF0aW9uOiAwLFxuICB0aGlja25lc3M6IDIsXG59XG5cbmNvbnN0IGhlYXZ5TW9kZVRleHR1cmU6IElTaW1wbGVUZXh0dXJlQ29uZmlnID0ge1xuICBjb2xvcjogJyMwMDAwMDAnLFxuICBkaXN0YW5jZTogNCxcbiAgcm90YXRpb246IDAsXG4gIHRoaWNrbmVzczogMyxcbn1cblxuY2xhc3MgTGluZVRleHR1cmUgZXh0ZW5kcyBCYXNlVGV4dHVyZSBpbXBsZW1lbnRzIElUZXh0dXJlIHtcbiAgcHVibGljIG5hbWU6IHN0cmluZyA9ICdsaW5lJ1xuXG4gIHB1YmxpYyBtb2RlOiB7W2tleTogc3RyaW5nXTogSVNpbXBsZVRleHR1cmVDb25maWd9ID0ge1xuICAgIC8vIFRPRE86IEhvdyB0byB1c2UgZW51bXMgZm9yIHRoZSBkZWZhdWx0IHRleHR1cmUgY29uZmlnIG5hbWU/XG4gICAgZGVmYXVsdDogbWVkaXVtTW9kZVRleHR1cmUsXG4gICAgbGlnaHQ6IGxpZ2h0TW9kZVRleHR1cmUsXG4gICAgbWVkaXVtOiBtZWRpdW1Nb2RlVGV4dHVyZSxcbiAgICBoZWF2eTogaGVhdnlNb2RlVGV4dHVyZSxcbiAgfVxuXG4gIHB1YmxpYyBkcmF3KHRleHR1cmVFbGVtZW50OiBUZXh0dXJlRWxlbWVudCwgcmVuZGVyZXI6IElSZW5kZXJlciwgZHJhd0NvbmZpZzogSURyYXdDb25maWcpIHtcbiAgICBjb25zdCB7bW9kZSwgY29uZmlnfSA9IGRyYXdDb25maWdcblxuICAgIGNvbnN0IHRleHR1cmVDb25maWc6IElTaW1wbGVUZXh0dXJlQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgIC8vIFRPRE86IGRlZmF1bHQgdG8gdGhlIG1lZGl1bSBtb2RlLCBidXQgaXQgc2hvdWxkIHJlYWxseSBiZSBzb21lIGZhbGxiYWNrIG1vZGVcbiAgICAgIHRoaXMubW9kZVttb2RlIHx8IFRleHR1cmVNb2RlVHlwZS5NZWRpdW1dLFxuICAgICAgY29uZmlnKVxuXG4gICAgdGV4dHVyZUNvbmZpZy5kaW1lbnNpb25zID0gdGV4dHVyZUNvbmZpZy5kaW1lbnNpb25zIHx8XG4gICAgICBjYWxjdWxhdGVEaW1lbnNpb25zKHRleHR1cmVDb25maWcuZGlzdGFuY2UsIHRleHR1cmVDb25maWcucm90YXRpb24pXG5cbiAgICByZW5kZXJlci5kcmF3TGluZVRleHR1cmUodGV4dHVyZUVsZW1lbnQsIHRleHR1cmVDb25maWcpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGluZVRleHR1cmVcbiIsImltcG9ydCB7XG4gIFRleHR1cmVFbGVtZW50LFxuICBJUmVuZGVyZXIsXG4gIElEcmF3Q29uZmlnLFxuICBJVGV4dHVyZUNvbmZpZyxcbiAgVGV4dHVyZU1vZGVUeXBlLFxuICBJVGV4dHVyZSxcbiAgQ29tcGxleFRleHR1cmVDb25maWcgfSBmcm9tICcuLi90eXBlcydcblxuaW1wb3J0IGZpbGxQYXR0ZXJuU3RhdGUgZnJvbSAnLi4vZmlsbFBhdHRlcm5TdGF0ZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVRleHR1cmUgaW1wbGVtZW50cyBJVGV4dHVyZSB7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSAnYmFzZVRleHR1cmUnXG5cbiAgcHVibGljIG1vZGU6IHtba2V5OiBzdHJpbmddOiBJVGV4dHVyZUNvbmZpZ30gPSB7XG4gICAgLy8gVE9ETzogSG93IHRvIHVzZSBlbnVtcyBmb3IgdGhlIGRlZmF1bHQgdGV4dHVyZSBjb25maWcgbmFtZT9cbiAgICBkZWZhdWx0OiB7XG4gICAgICB0aGlja25lc3M6IDEsXG4gICAgICBkaXN0YW5jZTogMyxcbiAgICAgIHJvdGF0aW9uOiAwLFxuICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgIG9mZnNldFg6IDAsXG4gICAgICBvZmZzZXRZOiAwLFxuICAgIH0sXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih0ZXh0dXJlT3B0aW9ucz86IElUZXh0dXJlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0ZXh0dXJlT3B0aW9ucylcbiAgfVxuXG4gIHB1YmxpYyBkcmF3KHRleHR1cmVFbGVtZW50OiBUZXh0dXJlRWxlbWVudCwgcmVuZGVyZXI6IElSZW5kZXJlciwgZHJhd0NvbmZpZzogSURyYXdDb25maWcpIHtcbiAgICBjb25zdCB7IG1vZGUsIGNvbmZpZyB9ID0gZHJhd0NvbmZpZ1xuICAgIGxldCB0ZXh0dXJlQ29uZmlnczogSVRleHR1cmVDb25maWcgPSB0aGlzLm1vZGVbbW9kZSB8fCBUZXh0dXJlTW9kZVR5cGUuRGVmYXVsdF1cblxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0ZXh0dXJlQ29uZmlncykpIHtcbiAgICAgIHRleHR1cmVDb25maWdzID0gW3RleHR1cmVDb25maWdzXVxuICAgIH1cblxuICAgIHRleHR1cmVDb25maWdzLmZvckVhY2goKGNvbmZpZ0RldGFpbHMpID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgLi4uZGV0YWlsQ29uZmlncyB9ID0gY29uZmlnRGV0YWlsc1xuXG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgLy8gVGhlIHBhdHRlcm4gbW9kZSBjb25maWdzIG1heSBjb250YWluIGFueSBmaWxsIHBhdHRlcm4gYXMgaXRzIGNoaWxkcmVuXG4gICAgICAgIC8vIGxheWVycy4gSWYgaXQgZG9lcyBzbywgaXQgbmVlZCB0byBpbmNsdWRlIHRoZSBwYXR0ZXJuIG5hbWUgaW4gdGhlIGNvbmZpZ1xuICAgICAgICAvLyBkZXRhaWxzLiBGb3IgYmFzaWMgZmlsbCBwYXR0ZXJucyBsaWtlIGxpbmUsIGNpcmNsZSBvciBzcXVhcmUsIHRoZXkgbmVlZFxuICAgICAgICAvLyB0byBvdmVycmlkZSBkcmF3IGZ1bmN0aW9uIHRvIGRyYXcgYnkgdGhlbXNlbHZlcywgaGVuY2UgaXQgc2hvdWxkIG5ldmVyXG4gICAgICAgIC8vIGhpdCB0aGlzIGNvbmRpdGlvbiBoZXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYERvIG5vdCBrbm93IGhvdyB0byBkcmF3IHRoaXMgY29uZmlnOiAke25hbWV9YClcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbmZpZyBoYXMgYSBwYXR0ZXJuIG5hbWUsIHdoaWNoIG1lYW5zIGl0J3MgY29tcG9zZWQgYnlcbiAgICAgIC8vIG90aGVyIHBhdHRlcm5zXG4gICAgICBjb25zdCBjaGlsZFRleHR1cmUgPSBmaWxsUGF0dGVyblN0YXRlLnRleHR1cmVNYXBbbmFtZV1cblxuICAgICAgaWYgKCFjaGlsZFRleHR1cmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBzdWNoIHRleHR1cmUgZXhpc3Q6ICR7bmFtZX1gKVxuICAgICAgfVxuXG4gICAgICBpZiAoIWNoaWxkVGV4dHVyZS5kcmF3KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGRyYXcgdGV4dHVyZTogJHtuYW1lfWApXG4gICAgICB9XG5cbiAgICAgIGNoaWxkVGV4dHVyZS5kcmF3KHRleHR1cmVFbGVtZW50LCByZW5kZXJlciwge1xuICAgICAgICBtb2RlLFxuICAgICAgICAvLyBXZSBnb3Qgc29tZSBwcm9ibGVtIGhlcmVcbiAgICAgICAgLy8gU2hvdWxkIHRoZSBjb25maWcgcGFzcyBkb3duIHRvIHRoZSBncmFuZCBjaGlsZHJlbj9cbiAgICAgICAgY29uZmlnOiBPYmplY3QuYXNzaWduKHt9LCBkZXRhaWxDb25maWdzLCBjb25maWcpLFxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG4iLCJleHBvcnQgdHlwZSBUZXh0dXJlRWxlbWVudCA9IEhUTUxDYW52YXNFbGVtZW50IHwgU1ZHRGVmc0VsZW1lbnRcbmV4cG9ydCB0eXBlIElSZW5kZXJhYmxlRWxlbWVudCA9IEhUTUxDYW52YXNFbGVtZW50IHwgU1ZHRWxlbWVudFxuXG5leHBvcnQgaW50ZXJmYWNlIElEaW1lbnNpb24ge1xuICB3aWR0aDogbnVtYmVyXG4gIGhlaWdodDogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBvc2l0aW9uIHtcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElSZW5kZXJlciB7XG4gIGdldEluaXRUZXh0dXJlOiAoYmFja2dyb3VuZENvbG9yOiBzdHJpbmcpID0+IFRleHR1cmVFbGVtZW50XG4gIC8vIFRPRE86IEluIFNWRyBjYXNlLCB0aGUgc291cmNlIHRleHR1cmUgaXMgYWN0dWFsbHkganVzdCBhIHN2ZyBwYXR0ZXJuIGVsZW1lbnRcbiAgLy8gV2UgbmVlZCB0byBtYWtlIHNvbWUgY2hhbmdlcyBoZXJlIHRvIGdldCB0aGlzIHBhcnQgd29ya2luZ1xuICBjb21iaW5lVGV4dHVyZXM6IChkZXN0aW5hdGlvblRleHR1cmVFbGVtZW50OiBUZXh0dXJlRWxlbWVudCwgc291cmNlVGV4dHVyZUVsZW1lbnQ6IFRleHR1cmVFbGVtZW50KSA9PiB2b2lkXG4gIGdldERhdGFVUkw6ICh0ZXh0dXJlRWxlbWVudDogVGV4dHVyZUVsZW1lbnQpID0+IHN0cmluZ1xuICBnZXRUZXh0dXJlU2l6ZTogKHRleHR1cmVFbGVtZW50OiBUZXh0dXJlRWxlbWVudCkgPT4gSURpbWVuc2lvblxuICAvLyBSZW5kZXJpbmcgcmVsYXRlZCBhcGlcbiAgLy8gZHJhd0NpcmNsZVRleHR1cmU6ICh0ZXh0dXJlRWxlbWVudDogVGV4dHVyZUVsZW1lbnQsIHRleHR1cmVDb25maWc6IElUZXh0dXJlQ29uZmlnKSA9PiB2b2lkXG4gIGRyYXdMaW5lVGV4dHVyZTogKHRleHR1cmVFbGVtZW50OiBUZXh0dXJlRWxlbWVudCwgdGV4dHVyZUNvbmZpZzogSVRleHR1cmVDb25maWcpID0+IHZvaWRcbiAgLy8gZHJhd1NxdWFyZVRleHR1cmU6ICh0ZXh0dXJlRWxlbWVudDogVGV4dHVyZUVsZW1lbnQsIHRleHR1cmVDb25maWc6IElUZXh0dXJlQ29uZmlnKSA9PiB2b2lkXG4gIC8vIGRyYXdEaXNhYmxlZFRleHR1cmU6ICh0ZXh0dXJlRWxlbWVudDogVGV4dHVyZUVsZW1lbnQsIHRleHR1cmVDb25maWc6IElUZXh0dXJlQ29uZmlnKSA9PiB2b2lkXG4gIHJvdGF0ZTogKGVsZW1lbnQ6IElSZW5kZXJhYmxlRWxlbWVudCwgYW5nbGU6IG51bWJlciwgb3JpZ2luUG9zaXRpb24/OiBJUG9zaXRpb24pID0+IHZvaWRcbn1cblxuLy8gZXhwb3J0IGludGVyZmFjZSBJUmVuZGVyZXI8VCBleHRlbmRzIFRleHR1cmVFbGVtZW50LCBTIGV4dGVuZHMgSVJlbmRlcmFibGVFbGVtZW50PiB7XG4vLyAgIGdldEluaXRUZXh0dXJlOiAoYmFja2dyb3VuZENvbG9yOiBzdHJpbmcpID0+IFRcbi8vICAgLy8gVE9ETzogSW4gU1ZHIGNhc2UsIHRoZSBzb3VyY2UgdGV4dHVyZSBpcyBhY3R1YWxseSBqdXN0IGEgc3ZnIHBhdHRlcm4gZWxlbWVudFxuLy8gICAvLyBXZSBuZWVkIHRvIG1ha2Ugc29tZSBjaGFuZ2VzIGhlcmUgdG8gZ2V0IHRoaXMgcGFydCB3b3JraW5nXG4vLyAgIGNvbWJpbmVUZXh0dXJlczogKGRlc3RpbmF0aW9uVGV4dHVyZUVsZW1lbnQ6IFQsIHNvdXJjZVRleHR1cmVFbGVtZW50OiBUKSA9PiB2b2lkXG4vLyAgIGdldERhdGFVUkw6ICh0ZXh0dXJlRWxlbWVudDogVCkgPT4gc3RyaW5nXG4vLyAgIGdldFRleHR1cmVTaXplOiAodGV4dHVyZUVsZW1lbnQ6IFQpID0+IElEaW1lbnNpb25cbi8vICAgLy8gUmVuZGVyaW5nIHJlbGF0ZWQgYXBpXG4vLyAgIC8vIGRyYXdDaXJjbGVUZXh0dXJlOiAodGV4dHVyZUVsZW1lbnQ6IFRleHR1cmVFbGVtZW50LCB0ZXh0dXJlQ29uZmlnOiBJVGV4dHVyZUNvbmZpZykgPT4gdm9pZFxuLy8gICBkcmF3TGluZVRleHR1cmU6ICh0ZXh0dXJlRWxlbWVudDogVCwgdGV4dHVyZUNvbmZpZzogSVRleHR1cmVDb25maWcpID0+IHZvaWRcbi8vICAgLy8gZHJhd1NxdWFyZVRleHR1cmU6ICh0ZXh0dXJlRWxlbWVudDogVGV4dHVyZUVsZW1lbnQsIHRleHR1cmVDb25maWc6IElUZXh0dXJlQ29uZmlnKSA9PiB2b2lkXG4vLyAgIC8vIGRyYXdEaXNhYmxlZFRleHR1cmU6ICh0ZXh0dXJlRWxlbWVudDogVGV4dHVyZUVsZW1lbnQsIHRleHR1cmVDb25maWc6IElUZXh0dXJlQ29uZmlnKSA9PiB2b2lkXG4vLyAgIHJvdGF0ZTogKGVsZW1lbnQ6IFMsIGFuZ2xlOiBudW1iZXIsIG9yaWdpblBvc2l0aW9uPzogSVBvc2l0aW9uKSA9PiB2b2lkXG4vLyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURyYXdDb25maWcge1xuICBtb2RlPzogc3RyaW5nIHwgVGV4dHVyZU1vZGVUeXBlLFxuICBjb25maWc/OiBJVGV4dHVyZUNvbmZpZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUZXh0dXJlIHtcbiAgbW9kZToge1trZXk6IHN0cmluZ106IElUZXh0dXJlQ29uZmlnfVxuICBuYW1lOiBzdHJpbmdcbiAgZHJhdz86ICh0ZXh0dXJlRWxlbWVudDogVGV4dHVyZUVsZW1lbnQsIHJlbmRlcmVyOiBJUmVuZGVyZXIsIGNvbmZpZzogSURyYXdDb25maWcpID0+IHZvaWRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGF0dGVybkNvbmZpZyB7XG4gIG5hbWU6IHN0cmluZ1xuICBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZ1xuICBtb2RlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2ltcGxlVGV4dHVyZUNvbmZpZyB7XG4gIG5hbWU/OiBzdHJpbmdcbiAgdGhpY2tuZXNzOiBudW1iZXJcbiAgZGlzdGFuY2U6IG51bWJlclxuICByb3RhdGlvbjogbnVtYmVyXG4gIGNvbG9yOiBzdHJpbmdcbiAgZGltZW5zaW9ucz86IElEaW1lbnNpb25cbiAgb2Zmc2V0WD86IG51bWJlclxuICBvZmZzZXRZPzogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvbXBsZXhUZXh0dXJlQ29uZmlnID0gSVNpbXBsZVRleHR1cmVDb25maWdbXVxuXG5leHBvcnQgdHlwZSBJVGV4dHVyZUNvbmZpZyA9IElTaW1wbGVUZXh0dXJlQ29uZmlnIHwgQ29tcGxleFRleHR1cmVDb25maWdcblxuLyoqKioqIEVudW1zICoqKioqL1xuZXhwb3J0IGVudW0gUmVuZGVyZXJUeXBlIHtcbiAgQ2FudmFzLFxuICBTVkcsXG59XG5cbmV4cG9ydCBlbnVtIFRleHR1cmVNb2RlVHlwZSB7XG4gIExpZ2h0LFxuICBNZWRpdW0sXG4gIEhlYXZ5LFxuICBEZWZhdWx0LFxufVxuIiwiaW1wb3J0IHsgSVRleHR1cmUgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IGZpbGxQYXR0ZXJuU3RhdGUgZnJvbSAnLi9maWxsUGF0dGVyblN0YXRlJ1xuaW1wb3J0IEJhc2VUZXh0dXJlIGZyb20gJy4vdGV4dHVyZXMvQmFzZSdcblxuY29uc3QgZ2NkQ2FjaGU6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9ID0ge31cblxuY29uc3QgdXRpbCA9IHtcbiAgZ2NkOiAobnVtYmVyMTogbnVtYmVyLCBudW1iZXIyOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIGlmICh0eXBlb2YgbnVtYmVyMSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIG51bWJlcjIgIT09ICdudW1iZXInIHx8XG4gICAgKE51bWJlci5pc05hTiB8fCBpc05hTikobnVtYmVyMSkgfHwgKE51bWJlci5pc05hTiB8fCBpc05hTikobnVtYmVyMikgfHxcbiAgICBudW1iZXIxIDw9IDAgfHwgbnVtYmVyMiA8PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG5cbiAgICBjb25zdCBrZXkxID0gbnVtYmVyMSArICctJyArIG51bWJlcjJcbiAgICBjb25zdCBrZXkyID0gbnVtYmVyMiArICctJyArIG51bWJlcjFcblxuICAgIGlmIChnY2RDYWNoZVtrZXkxXSkge1xuICAgICAgcmV0dXJuIGdjZENhY2hlW2tleTFdXG4gICAgfVxuXG4gICAgaWYgKG51bWJlcjEgIT09IG51bWJlcjIpIHtcbiAgICAgIGlmIChudW1iZXIxID4gbnVtYmVyMikge1xuICAgICAgICBudW1iZXIxID0gbnVtYmVyMSAtIG51bWJlcjJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG51bWJlcjIgPSBudW1iZXIyIC0gbnVtYmVyMVxuICAgICAgfVxuXG4gICAgICBnY2RDYWNoZVtrZXkxXSA9IHV0aWwuZ2NkKG51bWJlcjEsIG51bWJlcjIpXG4gICAgICBnY2RDYWNoZVtrZXkyXSA9IGdjZENhY2hlW2tleTFdXG4gICAgICByZXR1cm4gZ2NkQ2FjaGVba2V5MV1cbiAgICB9IGVsc2Uge1xuICAgICAgZ2NkQ2FjaGVba2V5MV0gPSBudW1iZXIxXG4gICAgICByZXR1cm4gbnVtYmVyMVxuICAgIH1cbiAgfSxcblxuICBsY206IChudW1iZXIxOiBudW1iZXIsIG51bWJlcjI6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgaWYgKHR5cGVvZiBudW1iZXIxICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgbnVtYmVyMiAhPT0gJ251bWJlcicgfHxcbiAgICAoTnVtYmVyLmlzTmFOIHx8IGlzTmFOKShudW1iZXIxKSB8fCAoTnVtYmVyLmlzTmFOIHx8IGlzTmFOKShudW1iZXIyKSB8fFxuICAgIG51bWJlcjEgPD0gMCB8fCBudW1iZXIyIDw9IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIHJldHVybiBudW1iZXIxICogbnVtYmVyMiAvIHV0aWwuZ2NkKG51bWJlcjEsIG51bWJlcjIpXG4gIH0sXG5cbiAgbWl4aW46IChkZXN0aW5hdGlvbk9iajoge1trZXk6IHN0cmluZ106IGFueX0sIHNvdXJjZU9iajoge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkID0+IHtcbiAgICBsZXQga2V5OiBzdHJpbmdcbiAgICBmb3IgKGtleSBpbiBzb3VyY2VPYmopIHtcbiAgICAgIGlmIChzb3VyY2VPYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uT2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBkZXN0aW5hdGlvbk9ialtrZXldID0gc291cmNlT2JqW2tleV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBhcHBseU1peGlucyhkZXJpdmVkQ3RvcjogYW55LCBiYXNlQ3RvcnM6IGFueVtdKSB7XG4gICAgYmFzZUN0b3JzLmZvckVhY2goKGJhc2VDdG9yKSA9PiB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiYXNlQ3Rvci5wcm90b3R5cGUpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV0gPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBsb2FkVGV4dHVyZTogKHRleHR1cmU6IElUZXh0dXJlKTogdm9pZCA9PiB7XG4gICAgaWYgKCFmaWxsUGF0dGVyblN0YXRlLnRleHR1cmVNYXBbdGV4dHVyZS5uYW1lXSkge1xuICAgICAgLy8gdXRpbC5hcHBseU1peGlucyh0ZXh0dXJlLCBbQmFzZVRleHR1cmVdKVxuICAgICAgLy8gdXRpbC5taXhpbih0ZXh0dXJlLCBuZXcgQmFzZVRleHR1cmUoKSlcblxuICAgICAgZmlsbFBhdHRlcm5TdGF0ZS50ZXh0dXJlTWFwW3RleHR1cmUubmFtZV0gPSB0ZXh0dXJlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlZCB0ZXh0dXJlIG5hbWU6ICR7dGV4dHVyZS5uYW1lfWApXG4gICAgfVxuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCB1dGlsXG4iXSwic291cmNlUm9vdCI6IiJ9