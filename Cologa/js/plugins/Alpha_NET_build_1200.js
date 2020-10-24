/*
 * Official Web Page
 * <https: //kagedesuworkshop.blogspot.com/p/alpha-net.html>
 *
 * License
 * Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * <https://creativecommons.org/licenses/by-nc-sa/4.0/>
 *
 * Copyright (c) 2018 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kagedesuworkshop.blogspot.ru/>
 *
 */

//=============================================================================
// Alpha_NET
//=============================================================================

/*:
 * @author Pheonix KageDesu
 * @plugindesc v0.8.1200 Network system (Beta)
 * @help
 * 
 * Web Page: 
 * https://kagedesuworkshop.blogspot.com/p/alpha-net.html
 * Wiki Page: 
 * https://github.com/KageDesu/AlphaNET/wiki
 * Patreon Page: 
 * https://www.patreon.com/KageDesu
 * YouTube Channel:
 * https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 * 
 * Thanks to all my patrons!
 * Plugin supporters:
 *  - Donald Derrick
 *  - Ilya Chkoliar (https://elushisgaming.club/)
 *  - Sarcastic Sloth (https://sarcasticsloth42.wixsite.com/avillainstale)
 *  - Bud Leiser
 *  - Timothy Barry
 *  - GiantHurtBall (https://deviantart.com/chaos14u)
 *  - The Commander
 * 
 * ==============================================================
 * Plugin Commands
 * ==============================================================
 *  --- Game Host ---
 * NET start - start server (only for PC)
 * NET hotSeat - start split screen
 *    (server must be started on your PC first)
 * NET stop - stop server
 * 
 * NET restrict - disable connection other players to the game
 * NET allow - enable connection to the game
 * 
 *  --- Game Client ---
 * NET connect - join to the game
 * NET disconnect - left the game
 * 
 * [!] Please read Wiki Page for more information and documentation
 * 
 * === === === === === === === === === === === === === === === === ===
 * 
 * @param Alpha NET
 * 
 * @param GameMode
 * @parent Alpha NET
 * @type combo
 * @text Game Mode
 * @option Cooperative
 * @option Multiplayer
 * @default Cooperative
 * @desc Read more about game modes on Wiki Page
 * 
 * @param ActorsForPlayers
 * @parent Alpha NET
 * @text Actors for players
 * @type string
 * @default 1, 2, 3, 4
 * @desc Actor ID for each player, separate by comma. Actors count = how many players can join to the game
 * 
 * @param UseInGameChat
 * @parent Alpha NET
 * @text Use in-game chat?
 * @type boolean
 * @default true
 * @desc Can players use in-game chat
 * 
 * @param NetworkEvents
 * @text Network Events
 * @parent Alpha NET
 * @type string
 * @default --- --- --- --- ---
 * 
 * @param ServerStarted
 * @text On Server Started
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when Server get started (only for host)
 * 
 * @param OnConnect
 * @text On Join
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when you join the game
 * 
 * @param OnDisconect
 * @text On Disconect
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when you lost connection with game
 * 
 * @param OnOtherCon
 * @text On Another Join
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when another player join your game
 * 
 * @param OnOtherDisc
 * @text On Another Left
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when another player left your game
 * 
 * @param OnPvPEnd
 * @text On PvP Battle End
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when PvP battle ends (only for PvP participants)
 * 
 * @param NetworkUI
 * @text UI Settings
 * @parent Alpha NET
 * @type string
 * @default --- --- --- --- ---
 * 
 * @param NameplatesMode
 * @parent NetworkUI
 * @type combo
 * @text Nameplate display mode
 * @option Others
 * @option All
 * @option Never
 * @default Others
 * @desc How display players names above characters
 * 
 */

//Show NET Icons?
//Show ICON while Chat?
//Show ICON while Wait?
//Show ICON while Menu?
//PICs for All Three Icons (стандартные хранить в памяти?)


//@[CODE STANDARD X2]

/* jshint -W097 */
/* jshint -W117 */

"use strict";

var Imported = Imported || {};
Imported.AlphaNET = true;

var AlphaNET = {};
AlphaNET.Version = '0.8';
AlphaNET.Build = 1200;

//? GLOBAL SHORTCUT
window.ANET = AlphaNET;

AlphaNET._define = 'build';

AlphaNET.Versions = {
    'KDCore': '1.2',
    'NET': AlphaNET.Version + ' : ' + AlphaNET.Build,
    'Socket.io': '2.0.4',
    'CoffeeScript CLI': '2.3.1'
};

AlphaNET.LIBS = {};

AlphaNET.register = function (library) {
    this.LIBS[library.name] = library;
};

AlphaNET.isDEV = function () {
    return AlphaNET._define == 'dev';
};

// ------------------------- MAIN MODULES ---------------------------------
function Network() {
    throw new Error('This is a static class');
}

function NetPartyManager() {
    throw new Error('This is a static class');
}

function MakerManager() {
    throw new Error('This is a static class');
}

function HotSeatKeyMapper() {
    throw new Error('This is a static class');
}

function NetWorldManager() {
    throw new Error('This is a static class');
}

function InfoPrinter() {
    throw new Error('This is a static class');
}

function NetUIManager() {
    throw new Error('This is a static class');
}
// -------------------------------------------------------------------------

//@[GLOBAL DEFINITON]
function executeFunctionByName(functionName, context /*, args */ ) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

(function () {
    //@[ALIAS]
    var _SceneManager_catchException_NET = SceneManager.catchException;
    SceneManager.catchException = function (e) {
        AlphaNET._printPluginInfo();
        _SceneManager_catchException_NET.call(this, e);
        AlphaNET._showDevTools();
    };

    //@[ALIAS]
    var _SceneManager_onError_NET = SceneManager.onError;
    SceneManager.onError = function (e) {
        AlphaNET._printPluginInfo();
        _SceneManager_onError_NET.call(this, e);
        AlphaNET._showDevTools();
    };

    // * Данный метод отвечает чтобы при загрузке сохранённой игры нашлись классы библиотек
    //@[ALIAS]
    var _JsonEx_decode = JsonEx._decode;
    JsonEx._decode = function (value, circular, registry) {
        var type = Object.prototype.toString.call(value);
        if (type === '[object Object]' || type === '[object Array]') {
            if (value['@']) {
                var constructor = AlphaNET.LIBS[value['@']] || KDCore[value['@']];
                if (constructor) {
                    value = this._resetPrototype(value, constructor.prototype);
                    value['@'] = null;
                }
            }
        }
        return _JsonEx_decode.call(this, value, circular, registry);
    };
})();

// -------------------------------------------------------------------------

// * Вывод текста
AlphaNET.print = function (message) {
    if (AlphaNET._warningLog == undefined) {
        AlphaNET._warningLog = new KDCore.DevLog('Alpha NET');
        AlphaNET._warningLog.setColors(KDCore.Color.ORANGE, KDCore.Color.BLACK.getLightestColor(100));
        AlphaNET._warningLog.on();
    }
    if (message) {
        AlphaNET._warningLog.p(message);
    }
};

// * Просто предупреждение в консоль
AlphaNET.warning = function (message, error = null) {
    console.warn("Alpha NET warning!");
    if (error)
        AlphaNET.print(message + ": " + error.message);
    else
        AlphaNET.print(message);
};

// * Критическая ошибка -> завершение приложения
AlphaNET.criticalError = function (error, message) {
    AlphaNET.error(null, message);
    SceneManager.catchException(error);
};

AlphaNET._printPluginInfo = function () {
    console.error("Using AlphaNET [Version: " + AlphaNET.Version +
        " ; Build: " + AlphaNET.Build +
        " ; on MV  " + Utils.RPGMAKER_VERSION + "]");
};

AlphaNET._showDevTools = function () {
    if (Utils.isNwjs()) {
        require('nw.gui').Window.get().showDevTools();
    }
};

// * Ошибка с предупреждением пользователя
AlphaNET.error = function (error, message) {
    if (AlphaNET._errorLog == undefined) {
        AlphaNET._errorLog = new KDCore.DevLog('ANET Error');
        AlphaNET._errorLog.setColors(KDCore.Color.RED, KDCore.Color.BLACK.getLightestColor(225));
        AlphaNET._errorLog.on();
    }
    console.error(error);
    if (message) {
        AlphaNET._errorLog.p(message);
        AlphaNET.alert(message);
    }
};

AlphaNET.alert = function (message) {
    if (message) {
        alert(message);
    }
};

// * Лог для разработки
AlphaNET.log = function (message, obj) {
    if (!ANET.isDEV()) {
        return;
    }
    if (AlphaNET._devLog == undefined) {
        AlphaNET._devLog = new KDCore.DevLog('ANET');
        AlphaNET._devLog.setColors(KDCore.Color.BLUE, KDCore.Color.BLACK.getLightestColor(200));
        AlphaNET._devLog.on();
    }
    if (message) {
        if (!obj)
            AlphaNET._devLog.p(message);
        else
            AlphaNET._devLog.p(obj.constructor.name + " : " + message);
    }
};
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var KDCore;

KDCore = KDCore || {};

KDCore.Version = '1.2';

KDCore.LIBS = {};

KDCore.register = function(library) {
  return this.LIBS[library.name] = library;
};

(function() {
  var BitmapSrc, Color, DevLog, ParametersManager, SDK, StringsLoader, __TMP_LOGS__, __alias_Bitmap_fillAll;
  //Array Extension
  //------------------------------------------------------------------------------
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.include = function(value) {
    return this.indexOf(value) !== -1;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  //Number Extension
  //------------------------------------------------------------------------------
  Number.prototype.do = function(method) {
    return SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  //Sprite Extension
  //------------------------------------------------------------------------------
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX, floatY) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  //Bitmap Extension
  //------------------------------------------------------------------------------
  __alias_Bitmap_fillAll = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll.call(this, color);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    return this.drawOnMe(bitmap, x, y, size, size);
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
  //String Extenstion
  //------------------------------------------------------------------------------
  String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
  //SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  //Color
  //------------------------------------------------------------------------------
  Color = class Color {
    constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
      this.r = r1;
      this.g = g1;
      this.b = b1;
      this.a = a1;
    }

    getLightestColor(lightLevel) {
      var bf, newColor, p;
      bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
      p = 0;
      newColor = [0, 0, 0, 0];
      if (bf - lightLevel >= 0) {
        if (bf >= 0) {
          p = Math.abs(bf - lightLevel) / lightLevel;
        }
        newColor = this.ARR.map(function(c) {
          return c - (p * c);
        });
      } else {
        if (bf >= 0) {
          p = (lightLevel - bf) / (255 - bf);
        }
        newColor = this.ARR.map(function(c) {
          return [(255 - c) * p + c, 255].min();
        });
      }
      return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
    }

    clone() {
      return this.reAlpha(this.a);
    }

    reAlpha(newAlpha) {
      return new Color(this.r, this.g, this.b, newAlpha || 255);
    }

    static AddConstantColor(name, color) {
      color.toHex();
      color.toArray();
      color.toCSS();
      SDK.setConstantToObject(Color, name, color);
    }

    toHex() {
      var b, g, r;
      if (this._colorHex != null) {
        return this._colorHex;
      }
      r = Math.floor(this.r).toString(16).padStart(2, "0");
      g = Math.floor(this.g).toString(16).padStart(2, "0");
      b = Math.floor(this.b).toString(16).padStart(2, "0");
      return this._colorHex = '#' + r + g + b;
    }

    toArray() {
      if (this._colorArray != null) {
        return this._colorArray;
      }
      return this._colorArray = [this.r, this.g, this.b, this.a];
    }

    toCSS() {
      var na, nb, ng, nr;
      if (this._colorCss != null) {
        return this._colorCss;
      }
      nr = Math.round(this.r);
      ng = Math.round(this.g);
      nb = Math.round(this.b);
      na = this.a / 255;
      return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
    }

    toNumber() {
      return Number(this.toHex().replace("#", "0x"));
    }

    static Random() {
      var a, b, c;
      a = SDK.rand(1, 254);
      b = SDK.rand(1, 254);
      c = SDK.rand(1, 254);
      return new Color(a, b, c, 255);
    }

    static FromHex(hexString) {
      var color, result;
      result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
      color = null;
      if (result != null) {
        color = {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        };
      }
      if (color != null) {
        return new Color(color.r, color.g, color.b, 255);
      } else {
        return Color.NONE;
      }
    }

  };
  Object.defineProperties(Color.prototype, {
    R: {
      get: function() {
        return this.r;
      },
      configurable: true
    },
    G: {
      get: function() {
        return this.g;
      },
      configurable: true
    },
    B: {
      get: function() {
        return this.b;
      },
      configurable: true
    },
    A: {
      get: function() {
        return this.a;
      },
      configurable: true
    },
    ARR: {
      get: function() {
        return this.toArray();
      },
      configurable: true
    },
    CSS: {
      get: function() {
        return this.toCSS();
      },
      configurable: true
    },
    HEX: {
      get: function() {
        return this.toHex();
      },
      configurable: true
    },
    OX: {
      get: function() {
        return this.toNumber();
      },
      configurable: true
    }
  });
  Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));
  Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));
  Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));
  Color.AddConstantColor('RED', new Color(255, 0, 0, 255));
  Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));
  Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));
  Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));
  Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));
  Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));
  Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));
  //DevLog
  //------------------------------------------------------------------------------
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.WHITE);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  BitmapSrc = (function() {
    //BitmapSrc
    //------------------------------------------------------------------------------
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          pw = Window_Base._iconWidth;
          ph = Window_Base._iconHeight;
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //ParametersManager
  //------------------------------------------------------------------------------
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] !== void 0;
  };
  ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

  };
  //StringsLoader
  //------------------------------------------------------------------------------
  StringsLoader = class StringsLoader {
    constructor(_parameters) {
      this._parameters = _parameters;
    }

    loadAllStringsToObject(object) {
      var strings;
      strings = this._collect(object);
      this._writeNewString(object, strings);
    }

    _collect(object) {
      var properties, strings;
      properties = Object.getOwnPropertyNames(object);
      strings = properties.filter(function(item) {
        return item.includes("STRING_");
      });
      return strings;
    }

    _writeNewString(object, strings) {
      var j, len, string;
      for (j = 0, len = strings.length; j < len; j++) {
        string = strings[j];
        this._setStringFromPluginParametersToObject(object, string);
      }
    }

    _setStringFromPluginParametersToObject(object, stringName) {
      var newValue;
      newValue = this._parameters[stringName];
      if (newValue) {
        object[stringName] = newValue;
      }
    }

  };
  //EXTENSION TO GLOBAL
  //------------------------------------------------------------------------------
  KDCore.SDK = SDK;
  KDCore.Color = Color;
  KDCore.DevLog = DevLog;
  KDCore.BitmapSrc = BitmapSrc;
  KDCore.ParametersManager = ParametersManager;
  KDCore.StringsLoader = StringsLoader;
})();

// ■ END KDCore.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UTILS.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  _ = {};
  _.isSceneMap = function() {
    try {
      return SceneManager._scene instanceof Scene_Map;
    } catch (error) {
      return false;
    }
  };
  _.getPositionPointFromJSON = function(jsonSettings) {
    return _.convertPositionPointFromJSON(jsonSettings.position);
  };
  _.convertPositionPointFromJSON = function(position) {
    var e, x, y;
    try {
      x = position[0];
      y = position[1];
      if (!KDCore.SDK.isInt(x)) {
        x = eval(x);
      }
      if (!KDCore.SDK.isInt(y)) {
        y = eval(y);
      }
      return new PointX(x, y);
    } catch (error) {
      e = error;
      ANET.warning('Utils.getPositionPointFromJSON', e);
      return PointX.Empty;
    }
  };
  //@[EXTEND]
  ANET.Utils = _;
})();

// ■ END UTILS.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UTILS Math.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  ANET.Utils.Math = {};
  //@[DEFINES]
  _ = ANET.Utils.Math;
  _.inRect = function(point, rect) {
    var e, x2, y2;
    try {
      x2 = rect.x + rect.width;
      y2 = rect.y + rect.height;
      return point.x > rect.x && point.x < x2 && point.y < y2 && point.y > rect.y;
    } catch (error) {
      e = error;
      ANET.warning('Utils.Math.inRect', e);
      return false;
    }
  };
})();

// ■ END UTILS Math.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DevExt.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var __TMP_LOG__;
  __TMP_LOG__ = null;
  String.prototype.LOG = function() {
    if (__TMP_LOG__ === null) {
      __TMP_LOG__ = new KDCore.DevLog("TMP");
      __TMP_LOG__.setColors(KDCore.Color.WHITE, KDCore.Color.BLACK.getLightestColor(20));
    }
    __TMP_LOG__.p(this);
  };
  Number.prototype.LOG = function() {
    return this.toString().LOG();
  };
  Array.prototype.LOG = function() {
    return this.toString().LOG();
  };
  Boolean.prototype.LOG = function() {
    return this.toString().LOG();
  };
  String.prototype.P = function() {
    return this.LOG();
  };
  String.prototype.p = function(additionText) {
    var str;
    if (additionText != null) {
      str = this + " : " + additionText;
      return str.LOG();
    } else {
      return this.LOG();
    }
  };
  Array.prototype.findElementByField = function(elementField, value) {
    var result;
    result = this.filter(function(item) {
      return item[elementField] === value;
    });
    if (result.length === 0) {
      return null;
    } else {
      return result[0];
    }
  };
  Array.prototype.findElementIndexByField = function(elementField, value) {
    var element;
    element = this.findElementByField(elementField, value);
    return this.indexOf(element);
  };
})();

// ■ END DevExt.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ XInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var DefaultKeyConfig, IKey, KEYS_GAME, KEYS_RAW, UNSAFE, alias_atbs_input_onKeyDown, alias_atbs_input_onKeyUp, i, j, k, l, m;
  DefaultKeyConfig = [
    // * CHAT
    "tab",
    "t",
    // * ACTION MENU
    "q",
    "e"
  ];
  UNSAFE = ['q', 'w', 'x', 'z', 'space'];
  KEYS_RAW = [];
  KEYS_GAME = [];
  Input.KeyMapperPKD = {};
  Input.KeyMapperPKD[8] = "backspace";
  Input.KeyMapperPKD[9] = "tab";
  Input.KeyMapperPKD[13] = "ok";
  Input.KeyMapperPKD[16] = "shift";
  Input.KeyMapperPKD[27] = "escape";
  Input.KeyMapperPKD[32] = "space";
  Input.KeyMapperPKD[189] = "-";
  Input.KeyMapperPKD[187] = "+";
  Input.KeyMapperPKD[188] = ",";
  Input.KeyMapperPKD[190] = ".";
  Input.KeyMapperPKD[191] = "?";
  Input.KeyMapperPKD[222] = '"';
  Input.KeyMapperPKD[186] = ';';
  Input.KeyMapperPKD[219] = '[';
  Input.KeyMapperPKD[221] = ']';
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
  for (i = k = 58; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = l = 65; l <= 90; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = m = 97; m <= 122; i = ++m) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  Input._setIgnoreSpecial = false;
  alias_atbs_input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    if (Input._setIgnoreSpecial === true) {
      Input._setStateWithMapperPKD(event.keyCode, true);
    } else {
      alias_atbs_input_onKeyDown.call(this, event);
      if (Input.keyMapper[event.keyCode]) {
        return;
      }
      Input._setStateWithMapperPKD(event.keyCode, true);
    }
  };
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      this._currentState[symbol] = state;
    }
  };
  alias_atbs_input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    if (Input._setIgnoreSpecial === true) {
      Input._setStateWithMapperPKD(event.keyCode, false);
    } else {
      alias_atbs_input_onKeyUp.call(this, event);
      if (Input.keyMapper[event.keyCode]) {
        return;
      }
      Input._setStateWithMapperPKD(event.keyCode, false);
    }
  };
  Input.isCancel = function() {
    //if Input.isGamepad()
    //    Input.isTriggered('pageup') #LB
    //else
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  Input._isAnySymbol = function(method) {
    var n, o, p;
    for (i = n = 48; n <= 90; i = ++n) {
      if (method(Input.KeyMapperPKD[i])) {
        return Input.KeyMapperPKD[i];
      }
    }
    for (i = o = 186; o <= 222; i = ++o) {
      if (method(Input.KeyMapperPKD[i])) {
        return Input.KeyMapperPKD[i];
      }
    }
    for (i = p = 106; p <= 111; i = ++p) {
      if (method(Input.KeyMapperPKD[i])) {
        return Input.KeyMapperPKD[i];
      }
    }
    return null;
  };
  Input.isAnyPressed = function() {
    return Input._isAnySymbol(Input.isPressed.bind(Input));
  };
  Input.isAnyTriggered = function() {
    return Input._isAnySymbol(Input.isTriggered.bind(Input));
  };
  Input.isAnyLongPressed = function() {
    return Input._isAnySymbol(Input.isLongPressed.bind(Input));
  };
  IKey = function() {
    throw new Error('This is a static class');
  };
  IKey.CHAT = function() {
    return KEYS_GAME[0];
  };
  IKey.SAY = function() {
    return KEYS_GAME[1];
  };
  IKey.TRADE = function() {
    return KEYS_GAME[2];
  };
  IKey.PVP = function() {
    return KEYS_GAME[3];
  };
  IKey.loadDefaultKeyConfig = function() {
    return this.loadKeyConfig(DefaultKeyConfig.slice(0)); //Clone
  };
  IKey.loadKeyConfig = function(keyBindingsArray) {
    var n, ref;
    KEYS_RAW = keyBindingsArray;
    for (i = n = 0, ref = KEYS_RAW.length; (0 <= ref ? n < ref : n > ref); i = 0 <= ref ? ++n : --n) {
      if (KEYS_RAW[i] != null) {
        KEYS_GAME[i] = IKey.convertUnsafeSymbols(KEYS_RAW[i]);
      }
    }
  };
  IKey.convertUnsafeSymbols = function(symbol) {
    symbol = symbol.toLowerCase();
    if (!UNSAFE.include(symbol)) {
      return symbol;
    }
    if (symbol === 'q') {
      return 'pageup';
    }
    if (symbol === 'w') {
      return 'pagedown';
    }
    if (symbol === 'x') {
      return 'escape';
    }
    if (symbol === 'z') {
      return 'ok';
    }
    if (symbol === 'space') {
      return 'ok';
    }
  };
  IKey.convertIKeyToLetter = function(symbol) {
    if (symbol === IKey.CHAT()) {
      return KEYS_RAW[0];
    }
    if (symbol === IKey.SAY()) {
      return KEYS_RAW[1];
    }
    if (symbol === IKey.TRADE()) {
      return KEYS_RAW[2];
    }
    if (symbol === IKey.PVP()) {
      return KEYS_RAW[3];
    }
    return "";
  };
  IKey.getGameRawKeys = function() {
    return KEYS_RAW;
  };
  IKey.getGameKeyByIndex = function(index) {
    return KEYS_GAME[index];
  };
  IKey.changeRawKey = function(index, key) {
    KEYS_RAW[index] = key;
    return KEYS_GAME[index] = this.convertUnsafeSymbols(key);
  };
  AlphaNET.LIBS.IKey = IKey;
  ANET.KEYS = IKey;
})();

// ■ END XInput.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkClient.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var LOG, NetworkClient, _C, _M, _R;
  LOG = new KDCore.DevLog(" * Client");
  LOG.setColors(KDCore.Color.MAGENTA.reAlpha(200), KDCore.Color.BLACK.getLightestColor(200));
  LOG.on();
  //@[DEFINES]
  _C = null; //? ClientManager
  _M = null; //? NetMessage
  _R = null; //? _registerNetMessage
  NetworkClient = class NetworkClient {
    constructor(socket) {
      this.socket = socket;
      _R = this._registerNetMessage.bind(this);
      _M = NetMessage;
      _C = AlphaNET.LIBS.ClientManager;
      NetMessage.Setup(this.socket);
      this._handleCommands();
    }

    _handleCommands() {
      this._handleError();
      this._handleConnect();
      this._handleDisconect();
      return this._handleNET();
    }

    _handleError() {
      return this.socket.on('connect_error', function() {
        LOG.p('Connect error!');
        Network.onConnectionError();
        return Network.disconnect();
      });
    }

    _handleConnect() { // * WHEN THIS CLIENT CONNECT TO SERVER
      return this.socket.on('connect', function() {
        LOG.p('Connected');
        Network.runEvent(Network.commonEventOnConnectToServer);
        return Network.onConnectToServer();
      });
    }

    _handleDisconect() { // * WHEN SERVER TURN OFF
      return this.socket.on('disconnect', function() {
        LOG.p('Disconnected');
        NetPartyManager.clearParty();
        Network.runEvent(Network.commonEventOnDisconectFromServer);
        return Network.onConnectionLost();
      });
    }

    _handleNET() {
      this.socket.on('trace', function() { // * Используется для теста соединения
        return LOG.p("Trace from Server");
      });
      _R(_M.AlertMessage(), function(netData) {
        return window.alert(netData.data);
      });
      _R(_M.PlayerConnect(), _C.OnAnotherConnected);
      _R(_M.PlayerDisconnect(), _C.OnAnotherDisconnected);
      _R(_M.HostResponse(), _C.OnHostResponse);
      _R(_M.PlayersTableResponse(), _C.SetPlayersTableData);
      _R(_M.RequestPlayerData(), _C.OnAnotherPlayerDataRequested);
      _R(_M.PlayerDataResponse(), _C.OnAnotherPlayerDataResponse);
      _R(_M.PlayerMoveData(), _C.OnAnotherPlayerMove);
      _R(_M.MapEventMoveData(), _C.OnEventMoveData);
      _R(_M.WindowSelect(), _C.OnWindowSelectData);
      _R(_M.BattleInputCommand(), _C.OnBattleInputCommand);
      _R(_M.TempMessage(), _C.OnTempMessage);
      _R(_M.SyncEvent(), _C.OnEventSync);
      _R(_M.LockEvent(), _C.OnEventLock);
      _R(_M.OwnEvent(), _C.OnEventOwned);
      _R(_M.StartSharedEvent(), _C.OnStartSharedEvent);
      _R(_M.BattleBattlerRefreshData(), _C.OnBattleBattlerRefreshCommand);
      _R(_M.BattleAction(), _C.OnBattleActionCommand);
      _R(_M.BattleManager(), _C.OnBattleManagerCommand);
      _R(_M.PlayerNetIcon(), _C.OnPlayerNetIcon);
      _R(_M.VirtualInterpreter(), _C.OnVirtualIterpreterCommand);
      _R(_M.PlayerNetActorData(), _C.OnPlayerNetActorData);
      _R(_M.HostGameMapId(), _C.OnHostGameMapId);
      _R(_M.PlayerWorldData(), _C.OnPlayerWorldData);
      _R(_M.GlobalWorldData(), _C.OnGlobalWorldData);
      _R(_M.PlayerNetMapData(), _C.OnPlayerNetMapData);
      _R(_M.RequestGameMapEventsData(), _C.OnRequestGameMapEventsDataFromServer);
      _R(_M.GameMapEventsDataResponse(), _C.OnResponseGameMapEventsDataFromServer);
      _R(_M.SetOwner(), _C.OnSetOwner);
      _R(_M.CallUApi(), _C.OnUserApiCommand);
      _R(_M.StartPvPBattle(), _C.OnStartPvPBattle);
      _R(_M.BattleManagerPvP(), _C.OnBattleManagerPvPCommand);
      _R(_M.SendChatMessage(), _C.OnChatMessage);
      _R(_M.TradeReady(), _C.OnTradeReady);
      _R(_M.TradeItems(), _C.OnTradeItems);
      _R(_M.StartTrade(), _C.OnTradeStart);
      _R(_M.AbortTrade(), _C.OnTradeAbort);
      
      // * При завершени ожидания сервера
      this.socket.on(_M.OnWaitResponse().name, function(data) {
        return Network.onServerResponse(data);
      });
      
      //?{TEST}
      return this.socket.on('123', function(data) {
        if ((data != null ? data.waited : void 0) === true) {
          return Network.onServerResponse();
        }
      });
    }

    _registerNetMessage(netMessage, func) {
      return this.socket.on(netMessage.name, func);
    }

    _requestPlayersInitialData() {
      return _M.RequestPlayerData().send();
    }

    disconnect() {
      _C.OnDisconnect();
      if (this.socket != null) {
        return this.socket.disconnect();
      }
    }

  };
  AlphaNET.register(NetworkClient);
})();

// ■ END NetworkClient.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkServer.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//* ================ HELP SECTION =================
//client.emit('testX') #ТОЛЬКО ЭТОМУ
//this._server.emit('testX') #ВСЕМ
//client.broadcast.emit('testX') #ВСЕМ, КРОМЕ СЕБЯ

//Как создавать новую команду
//1 - Создаём NetMessage
//2 - Прописываем команду в NetworkServer.coffee
//3 - Прописываем команду в NetworkClient.coffee
//4 - Прописываем логику команды в ClientManager (если это сообщение от сервера)
//5 - Прописываем логику в ServerManager (если это сообщение от клиента к сереру)
//* ==============================================
(function() {
  var LOG, NetworkServer, ServerManager, _M, _R, _RT;
  LOG = new KDCore.DevLog("Server");
  LOG.setColors(KDCore.Color.GREEN, KDCore.Color.BLACK.getLightestColor(120));
  LOG.on();
  //@[DEFINES]
  _M = null; //? NetMessage
  _R = null; //? _registerNetMessage
  _RT = null; //? _retranslate
  ServerManager = null;
  NetworkServer = class NetworkServer {
    constructor(port) {
      this.port = port;
      _M = NetMessage;
      _R = this._registerNetMessage.bind(this);
      _RT = this._retranslate.bind(this);
      ServerManager = AlphaNET.LIBS.ServerManager;
      this._host = null;
      this._startServer();
      ServerManager.Init(this);
      this._handleCommands();
    }

    _startServer() {
      var path;
      path = './js/libs/server';
      this._server = require(path)(this.port);
      Network.runEvent(Network.commonEventOnServerStarted);
      InfoPrinter.p('<font color="blue" size="3">Server started</font>');
      setTimeout(InfoPrinter.clear, 3000);
      return LOG.p("started");
    }

    _handleCommands() {
      return this._server.on('connection', (client) => { // * WHEN ANOTHER CLIENT CONNECTS TO THIS SERVER
        LOG.p("Client connected " + client.id);
        this._handleDisconnect(client);
        this._setupServerCommands(client);
        return this._registerConnection(client);
      });
    }

    _handleDisconnect(client) { // * WHEN ANOTHER CLIENT GONE FROM THIS SERVER
      return client.on('disconnect', function() {
        LOG.p("Client disconnected " + client.id);
        return ServerManager.OnClientDisconnect(client);
      });
    }

    _registerConnection(client) {
      "REGISTER CONNECTION".p();
      if (!this._isHostExists()) {
        return this._registerHost(client);
      } else {
        return ServerManager.OnNewPlayerConnected(client);
      }
    }

    _isHostExists() {
      return this._host !== null;
    }

    _registerHost(client) {
      this._host = client;
      LOG.p("Host is " + client.id);
      //TODO: Это не обязательно, так как Хост = этому клиенту, можно сразу на NEtwork Установить
      NetMessage.HostResponse(client).send();
      return ServerManager.RegisterHost(client);
    }

    _setupServerCommands(client) {
      var e;
      try {
        // * Эти команды ретранслируются
        _RT(client, _M.RequestPlayerData());
        _RT(client, _M.PlayerDataResponse());
        _RT(client, _M.PlayerMoveData());
        _RT(client, _M.MapEventMoveData());
        _RT(client, _M.WindowSelect());
        _RT(client, _M.BattleInputCommand());
        _RT(client, _M.TempMessage());
        _RT(client, _M.LockEvent());
        _RT(client, _M.OwnEvent());
        _RT(client, _M.BattleBattlerRefreshData());
        _RT(client, _M.BattleAction());
        _RT(client, _M.BattleManager());
        _RT(client, _M.PlayerNetIcon());
        _RT(client, _M.PlayerNetActorData());
        _RT(client, _M.PlayerNetMapData());
        _RT(client, _M.CallUApi());
        _RT(client, _M.SendChatMessage());
        _RT(client, _M.TradeReady());
        _RT(client, _M.TradeItems());
        _RT(client, _M.AbortTrade());
        // * Эти команды выполняются только на сервере
        _R(client, _M.RegisterOnSharedEvent(), ServerManager.RegisterOnSharedEvent);
        _R(client, _M.RegisterOnSharedEventSync(), ServerManager.RegisterOnSharedEventSync);
        _R(client, _M.RequestSync(), ServerManager.RegisterOnSync);
        _R(client, _M.PlayerWorldData(), ServerManager.OnPlayerWorldData);
        _R(client, _M.PlayerNetItemsData(), ServerManager.OnPlayerNetItemsData);
        _R(client, _M.RequestGameMapEventsData(), ServerManager.OnPlayerRequestMapData);
        _R(client, _M.GameMapEventsDataResponse(), ServerManager.OnMapDataResonpse);
        _R(client, _M.PlayerChangeMap(), ServerManager.OnPlayerChangeMap);
        _R(client, _M.RequestPvP(), ServerManager.OnPlayerRequestPvPWithAnother);
        _R(client, _M.BattleManagerPvP(), ServerManager.OnBattleManagerPvPCommand);
        _R(client, _M.RequestTrade(), ServerManager.OnPlayerRequestTradeWithAnother);
        // * Эти команды ретранслируются, а также выполняются на сервере
        _RT(client, _M.StartSharedEvent());
        _R(client, _M.StartSharedEvent(), ServerManager.StartSharedEvent);
        _RT(client, _M.SyncEvent());
        _R(client, _M.SyncEvent(), ServerManager.OnSyncEvent);
        _RT(client, _M.VirtualInterpreter());
        _R(client, _M.VirtualInterpreter(), ServerManager.OnVirtualInterpreter);
      } catch (error) {
        e = error;
        LOG.p(' ! ! ! Server CMD Error');
        Network.error(e, ' on Server commands');
      }
      //?{TEST}
      //client.on _M.TempMessage().name, (data) ->
      //    LOG.p('123')
      //    _M.TempMessage(client).send(data.data)
      //    _M.TempMessage(client).broadcast(data.data)

      //@_registerNetMessage client, 'testWaitHard', -> LOG.p('hard wait accepted')

      //?{TEST}
      client.on('testWaitHard', function(data) {
        return LOG.p('hard wait accepted ' + data.data);
      });
      //?{TEST}
      return client.on('testWaitHardRepeated', function(data) {
        return LOG.p('hard repeat wait accepted ' + data.data);
      });
    }

    // * Этот метод перенаправляет команду от сервера на все клиенты (кроме клиента, который прислал эту команду)
    _retranslate(client, netCommand) {
      return _R(client, netCommand, function(networkData) {
        netCommand.socket = client;
        netCommand.setFrom(client.id);
        return netCommand.broadcast(networkData.data);
      });
    }

    _registerNetMessage(client, netMessage, func) {
      return client.on(netMessage.name, func);
    }

    instance() {
      return this._server;
    }

    isStarted() {
      return this.instance() != null;
    }

    onWaitPoolReady(data) {
      return this._server.emit(_M.OnWaitResponse().name, data);
    }

    abortWaitPool(clientId, code) {
      var client;
      client = this._getClientById(clientId);
      return client != null ? client.emit(_M.OnWaitResponse().name, code) : void 0;
    }

    _getClientById(clientId) {
      return this.clients()[clientId];
    }

    //?{TEST}
    test() {
      return this._server.emit('123', {
        waited: true
      });
    }

    stop() {
      var ref;
      if ((ref = this._server) != null) {
        ref.close();
      }
      this._server = null;
      return LOG.p("stopped");
    }

    clients() {
      return this._server.clients().sockets;
    }

    clientsCount() {
      return Object.keys(this.clients()).length;
    }

  };
  AlphaNET.register(NetworkServer);
})();

// ■ END NetworkServer.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var _0x5c41 = [
    'setupFromOuterData',
    'result',
    '_result',
    'actorId',
    'currentAction',
    'setSkill',
    'bAzMD',
    'tbYfU',
    'safeRefreshCurrentScene',
    'actionId',
    'ztsVM',
    'GameMapEventsDataResponse',
    'setTarget',
    'setTargetFromNet',
    'OnBattleManagerCommand',
    '_actionBattlers',
    'enemyIds',
    'bwokv',
    'zftSG',
    'endAction',
    'troopIds',
    'eSaeQ',
    'endTurn',
    '_processTurnFromNetwork',
    'startAction',
    '_startActionFromNetwork',
    'targets',
    'subjectId',
    'targetId',
    'abortBattle',
    '_abortBattleCommandFromNetwork',
    'victory',
    'processVictory',
    'defeat',
    'cSXLF',
    '_onEscapeFromNetwork',
    'success',
    'OnPlayerNetIcon',
    'dZhCQ',
    'QaGzR',
    '_params',
    'parameters',
    '_eventId',
    'command',
    'function',
    'inBattle',
    'ArAFG',
    'parse',
    'subjectData',
    'targetData',
    '_actionEndPvPFromNetwork',
    'showNetworkIcon',
    'While\x20start\x20network\x20icon',
    'OnVirtualIterpreterCommand',
    'VIRTUAL\x20INTERPRETER',
    'isCurrentSceneIsMenuBased',
    'iHZPg',
    '_scene',
    'LIBS',
    'terminate',
    'uNgge',
    'reserveTransfer',
    'OnTempMessage',
    'TEMP\x20MESSAGE\x20:\x20NETWORK\x20DATA',
    'OnPlayerNetActorData',
    'sYKWf',
    'while\x20accept\x20trade\x20abort',
    'onActorDataFromNetwork',
    'KwFyA',
    'setPlayerActorData',
    'name',
    'While\x20try\x20save\x20another\x20actor\x20data',
    'OnHostGameMapId',
    'SERVER\x20MAP\x20IS\x20OTHER,\x20TRANSFER\x20PLAYER!',
    'cFkBZ',
    'zawZu',
    'OnPlayerWorldData',
    'onActroItemsFromNetwork',
    'actorItems',
    'actorData',
    'hwErZ',
    'While\x20try\x20load\x20player\x20world\x20data\x20from\x20server',
    'OnGlobalWorldData',
    'lmBIj',
    'YzEsv',
    'getActorIdBySocketId',
    'netTradeAnotherActorId',
    'onGlobalWorldDataFromNetwork',
    'While\x20try\x20load\x20global\x20world\x20data\x20from\x20server',
    'OnPlayerNetMapData',
    'getPlayer',
    'ZSLLv',
    'OnRequestGameMapEventsDataFromServer',
    'mSjyJ',
    'mapData',
    'While\x20responde\x20game\x20map\x20data\x20from\x20server',
    'Ljvrc',
    'While\x20try\x20response\x20to\x20server\x20map\x20data\x20events\x20request',
    'commonEventOnOtherClientDisconected',
    'azMQe',
    'gSYVZ',
    'OnSetOwner',
    'I\x20map\x20owner!',
    '_isMapOwner',
    'QynzT',
    'JFbQX',
    'While\x20try\x20synchronize\x20game\x20map\x20with\x20Server',
    'BATTLE\x20:\x20MANAGER\x20PVP:\x20CLIENT',
    'inputActionPvP',
    'fjhoC',
    '_setPvPRivalActionFromNetwork',
    'startTurnPvP',
    '_startPvPTurnFromNetwork',
    'startActionPvP',
    '_startActionFromNetworkPvP',
    'resultTarget',
    '_invokeNormalActionFromNetworkPvP',
    'endActionPvP',
    'FNmPf',
    '_onNewChatMessage',
    'while\x20accept\x20new\x20chat\x20message',
    'hdKuY',
    'unknown\x20trade\x20player\x20index',
    'OnChatMessage',
    'mnDHU',
    'OnTradeReady',
    'YTBuB',
    'TRADE\x20READY\x20FROM\x20NETWORK',
    '_isTradeRequestForMe',
    '_isProperSceneForTrade',
    'PROPER\x20SCENE',
    'popScene',
    'netTradeItemsOut',
    'FromNetwork',
    'I\x20RECEVIE',
    'info',
    'release',
    'netTradeItems',
    'consume',
    'HRhPq',
    'while\x20accept\x20trade\x20ready\x20state',
    'Scene_Trade',
    'iYtKy',
    'TradeItems',
    'ITEMS\x20FROM\x20NETWORK',
    'resetTradeState',
    'NBKIC',
    'while\x20accept\x20trade\x20items\x20refresh',
    '_outerStartTrade',
    'OnTradeStart',
    'OnTradeAbort',
    'netTradeNeedAbort',
    'OnDisconnect',
    'setHost',
    'OnAnotherConnected',
    'runEvent',
    'commonEventOnOtherClientConnected',
    'playerData',
    'from',
    'removePlayer',
    'SetPlayersTableData',
    'isHost',
    'players',
    'data',
    'myPlayerData',
    'myId',
    'SetupVirtualUpdate',
    'RequestPlayerData',
    'send',
    'tGEKZ',
    'MWkGd',
    'RequestGameMapEventsData',
    'mapId',
    'PlayerChangeMap',
    'setSkillFromNet',
    '_virtualUpdateThread',
    'rZohJ',
    'While\x20try\x20execute\x20virtual\x20command',
    'zIDrG',
    'SERVER_UPDATE_TIME',
    'synchronize',
    'htYYt',
    'RxDkw',
    'error',
    'While\x20try\x20synchronize\x20another\x20actor\x20data',
    'OnAnotherPlayerDataRequested',
    'collectDataForNetwork',
    'OnAnotherPlayerDataResponse',
    'PLAYER\x20DATA\x20FROM',
    'EOOam',
    'getCharById',
    'synchronizeFromNetwork',
    'While\x20character\x20synchronization',
    'OnAnotherPlayerMove',
    '_moveCharacterFromNetwork',
    'onNetworkCharacterData',
    'charData',
    'onNetworkMoveData',
    'moveData',
    'While\x20moving\x20character',
    'OnEventMoveData',
    'eventId',
    'directionData',
    'vRsam',
    'While\x20execute\x20uAPI\x20network\x20command',
    'onNetworkDirectionData',
    'While\x20moving\x20event',
    'OnWindowSelectData',
    'networkWSelectedIndex',
    'networkWAction',
    'xCEpU',
    'action',
    'read\x20Window\x20Select\x20Data\x20from\x20Server',
    'EVENT\x20SYNC\x20COMMAND',
    'event',
    'read\x20event\x20sync\x20data',
    'OnEventLock',
    'EVENT\x20LOCK\x20COMMAND',
    'wNQRq',
    'WFNxm',
    'convertIdsToBattlers',
    'orderData',
    'setLockedEventByNetwork',
    'isLock',
    'OnEventOwned',
    'gQFZv',
    'while\x20accept\x20Battle\x20Manager\x20PvP\x20Command',
    'EVENT\x20OWN\x20COMMAND',
    'DGasD',
    'yLcPa',
    'refreshParty',
    'setOwnedEventByNetwork',
    'qhdkO',
    'OnStartSharedEvent',
    'njOyY',
    'startEventFromNetwork',
    'read\x20shared\x20event\x20data',
    'OnBattleInputCommand',
    'BATTLE\x20:\x20ON\x20INPUT\x20COMMAND',
    'OnBattleBattlerRefreshCommand',
    'BATTLE\x20:\x20ACTOR\x20REFRESH',
    'getBattleSubjectById',
    '_mp',
    '_tp',
    '_states',
    'OnBattleActionCommand',
    'BATTLE\x20:\x20GAME\x20ACTION',
    'setResult',
    'kLDRV',
    '_outerStartPvP',
    'sbj',
    'bxEcK',
    'wmDVG'
];
(function (_0x1110c0, _0x463474) {
    var _0x546015 = function (_0x5d9a0d) {
        while (--_0x5d9a0d) {
            _0x1110c0['push'](_0x1110c0['shift']());
        }
    };
    _0x546015(++_0x463474);
}(_0x5c41, 0x196));
var _0x3b1f = function (_0x1e9350, _0x106f5c) {
    _0x1e9350 = _0x1e9350 - 0x0;
    var _0x2ed8a4 = _0x5c41[_0x1e9350];
    return _0x2ed8a4;
};
var ClientManager;
ClientManager = class ClientManager {
    static ['OnHostResponse']() {
        return Network[_0x3b1f('0x0')]();
    }
    static [_0x3b1f('0x1')](_0x3790f8) {
        return Network[_0x3b1f('0x2')](Network[_0x3b1f('0x3')]);
    }
    static ['OnAnotherDisconnected'](_0x42b18f) {
        if (!Network[_0x3b1f('0x4')](_0x42b18f[_0x3b1f('0x5')])) {
            return;
        }
        NetPartyManager[_0x3b1f('0x6')](_0x42b18f['from']);
        return Network[_0x3b1f('0x2')](Network['commonEventOnOtherClientDisconected']);
    }
    static [_0x3b1f('0x7')](_0xd545a6) {
        if (!Network[_0x3b1f('0x8')]()) {
            Network[_0x3b1f('0x9')] = _0xd545a6[_0x3b1f('0xa')];
            Network[_0x3b1f('0xb')] = Network[_0x3b1f('0x4')](Network[_0x3b1f('0xc')]());
        }
        NetPartyManager['refreshParty']();
        ClientManager[_0x3b1f('0xd')]();
        NetMessage[_0x3b1f('0xe')]()[_0x3b1f('0xf')]();
        if (!Network[_0x3b1f('0x8')]()) {
            if (_0x3b1f('0x10') !== _0x3b1f('0x11')) {
                NetMessage[_0x3b1f('0x12')]()[_0x3b1f('0xf')]($gameMap[_0x3b1f('0x13')]());
                return NetMessage[_0x3b1f('0x14')]()['send']($gameMap[_0x3b1f('0x13')]());
            } else {
                if (act != null) {
                    act[_0x3b1f('0x15')](data['actionId']);
                }
                return;
            }
        }
    }
    static [_0x3b1f('0xd')]() {
        var _0x2b2e0f;
        if (ClientManager[_0x3b1f('0x16')] != null) {
            if ('rZohJ' !== _0x3b1f('0x17')) {
                e = error;
                return Network['error'](e, _0x3b1f('0x18'));
            } else {
                return;
            }
        }
        return ClientManager[_0x3b1f('0x16')] = setTimeout(_0x2b2e0f = function () {
            if ('zIDrG' !== _0x3b1f('0x19')) {
                return ClientManager['_virtualUpdateThread'] = setTimeout(_0x2b2e0f, Network[_0x3b1f('0x1a')]);
            } else {
                if (!Network['isConnected']()) {
                    return;
                }
                NetPartyManager[_0x3b1f('0x1b')]();
                NetWorldManager[_0x3b1f('0x1b')]();
                if (ClientManager[_0x3b1f('0x16')] != null) {
                    if (_0x3b1f('0x1c') === _0x3b1f('0x1d')) {
                        e = error;
                        return Network[_0x3b1f('0x1e')](e, _0x3b1f('0x1f'));
                    } else {
                        return ClientManager[_0x3b1f('0x16')] = setTimeout(_0x2b2e0f, Network['SERVER_UPDATE_TIME']);
                    }
                }
            }
        }, Network[_0x3b1f('0x1a')]);
    }
    static [_0x3b1f('0x20')](_0x78baff) {
        NetMessage['PlayerDataResponse']()['send']($gamePlayer[_0x3b1f('0x21')]());
        return NetPartyManager['synchronize']();
    }
    static [_0x3b1f('0x22')](_0xbf12e9) {
        var _0x262314, _0x1afd58;
        _0x3b1f('0x23')['p'](_0xbf12e9[_0x3b1f('0x5')]);
        try {
            if ('EOOam' === _0x3b1f('0x24')) {
                _0x262314 = NetPartyManager[_0x3b1f('0x25')](_0xbf12e9[_0x3b1f('0x5')]);
                return _0x262314 != null ? _0x262314[_0x3b1f('0x26')](_0xbf12e9['data']) : void 0x0;
            } else {
                _0x262314 = NetPartyManager[_0x3b1f('0x25')](_0xbf12e9[_0x3b1f('0x5')]);
                return _0x262314 != null ? _0x262314[_0x3b1f('0x26')](_0xbf12e9[_0x3b1f('0xa')]) : void 0x0;
            }
        } catch (_0x21678c) {
            _0x1afd58 = _0x21678c;
            return Network['error'](_0x1afd58, _0x3b1f('0x27'));
        }
    }
    static [_0x3b1f('0x28')](_0x59867d) {
        var _0x27b3b0;
        _0x27b3b0 = NetPartyManager['getCharById'](_0x59867d['from']);
        if (_0x27b3b0 == null) {
            return;
        }
        return ClientManager[_0x3b1f('0x29')](_0x27b3b0, _0x59867d[_0x3b1f('0xa')]);
    }
    static ['_moveCharacterFromNetwork'](_0x455e51, _0x3d6282) {
        var _0x4f3a3e;
        try {
            _0x455e51[_0x3b1f('0x2a')](_0x3d6282[_0x3b1f('0x2b')]);
            return _0x455e51[_0x3b1f('0x2c')](_0x3d6282[_0x3b1f('0x2d')]);
        } catch (_0x359414) {
            _0x4f3a3e = _0x359414;
            return Network[_0x3b1f('0x1e')](_0x4f3a3e, _0x3b1f('0x2e'));
        }
    }
    static [_0x3b1f('0x2f')](_0x1959cb) {
        var _0x3ad2ee, _0x5ae0d8, _0x1683d5, _0x9a8bed;
        try {
            _0x3ad2ee = _0x1959cb[_0x3b1f('0xa')];
            _0x9a8bed = _0x3ad2ee[_0x3b1f('0x13')];
            if ($gameMap[_0x3b1f('0x13')]() !== _0x9a8bed) {
                return;
            }
            _0x1683d5 = $gameMap['event'](_0x3ad2ee[_0x3b1f('0x30')]);
            if (!_0x1683d5) {
                return;
            }
            if (_0x3ad2ee[_0x3b1f('0x2d')] != null) {
                ClientManager['_moveCharacterFromNetwork'](_0x1683d5, _0x3ad2ee['moveData']);
            }
            if (_0x3ad2ee[_0x3b1f('0x31')] != null) {
                if (_0x3b1f('0x32') !== _0x3b1f('0x32')) {
                    var _0x2c6790, _0x416736, _0x381943;
                    try {
                        _0x2c6790 = _0x1959cb[_0x3b1f('0xa')]['name'];
                        _0x381943 = _0x1959cb['data']['parameters'];
                        return uAPI[_0x2c6790](..._0x381943);
                    } catch (_0x1affa6) {
                        _0x416736 = _0x1affa6;
                        return Network[_0x3b1f('0x1e')](_0x416736, _0x3b1f('0x33'));
                    }
                } else {
                    return _0x1683d5[_0x3b1f('0x34')](_0x3ad2ee[_0x3b1f('0x31')]);
                }
            }
        } catch (_0x4a850e) {
            _0x5ae0d8 = _0x4a850e;
            return Network[_0x3b1f('0x1e')](_0x5ae0d8, _0x3b1f('0x35'));
        }
    }
    static [_0x3b1f('0x36')](_0x339339) {
        var _0x21965f, _0xa4c333;
        try {
            _0x21965f = _0x339339[_0x3b1f('0xa')];
            $gameTemp[_0x3b1f('0x37')] = _0x21965f['index'];
            if ($gameTemp[_0x3b1f('0x38')] == null) {
                if (_0x3b1f('0x39') !== _0x3b1f('0x39')) {
                    return $gameTemp[_0x3b1f('0x38')] = _0x21965f[_0x3b1f('0x3a')];
                } else {
                    return $gameTemp[_0x3b1f('0x38')] = _0x21965f[_0x3b1f('0x3a')];
                }
            }
        } catch (_0x1d8bf6) {
            _0xa4c333 = _0x1d8bf6;
            return Network[_0x3b1f('0x1e')](_0xa4c333, _0x3b1f('0x3b'));
        }
    }
    static ['OnEventSync'](_0x36bd6c) {
        var _0x18b1b8, _0x31c76b, _0x20f8c7, _0x2131f4;
        try {
            _0x3b1f('0x3c')['p']();
            _0x18b1b8 = _0x36bd6c['data'];
            _0x2131f4 = _0x18b1b8[_0x3b1f('0x13')];
            if ($gameMap[_0x3b1f('0x13')]() !== _0x2131f4) {
                return;
            }
            _0x20f8c7 = $gameMap[_0x3b1f('0x3d')](_0x18b1b8[_0x3b1f('0x30')]);
            return _0x20f8c7 != null ? _0x20f8c7['executeSyncCommandFromNetwork'](_0x18b1b8['pi'], _0x18b1b8['li']) : void 0x0;
        } catch (_0x548121) {
            _0x31c76b = _0x548121;
            return Network[_0x3b1f('0x1e')](_0x31c76b, _0x3b1f('0x3e'));
        }
    }
    static [_0x3b1f('0x3f')](_0x376f05) {
        var _0x2b0324, _0x3d766d;
        try {
            _0x3b1f('0x40')['p']();
            _0x2b0324 = _0x376f05[_0x3b1f('0xa')];
            if ($gameMap['mapId']() !== _0x2b0324['mapId']) {
                if (_0x3b1f('0x41') === _0x3b1f('0x42')) {
                    BattleManager['_actionBattlers'] = BattleManager[_0x3b1f('0x43')](data[_0x3b1f('0x44')]);
                    return;
                } else {
                    return;
                }
            }
            return $gameMap[_0x3b1f('0x45')](_0x2b0324[_0x3b1f('0x30')], _0x2b0324[_0x3b1f('0x46')]);
        } catch (_0x519c80) {
            _0x3d766d = _0x519c80;
            return Network[_0x3b1f('0x1e')](_0x3d766d, _0x3b1f('0x3e'));
        }
    }
    static [_0x3b1f('0x47')](_0x3dcc12) {
        var _0x337ba4, _0x4c1eec;
        try {
            if (_0x3b1f('0x48') === 'TooRA') {
                _0x4c1eec = error;
                return Network[_0x3b1f('0x1e')](_0x4c1eec, _0x3b1f('0x49'));
            } else {
                _0x3b1f('0x4a')['p']();
                _0x337ba4 = _0x3dcc12[_0x3b1f('0xa')];
                if ($gameMap[_0x3b1f('0x13')]() !== _0x337ba4['mapId']) {
                    if (_0x3b1f('0x4b') === _0x3b1f('0x4c')) {
                        if (!Network[_0x3b1f('0x8')]()) {
                            Network[_0x3b1f('0x9')] = _0x3dcc12[_0x3b1f('0xa')];
                            Network[_0x3b1f('0xb')] = Network[_0x3b1f('0x4')](Network['myId']());
                        }
                        NetPartyManager[_0x3b1f('0x4d')]();
                        ClientManager[_0x3b1f('0xd')]();
                        NetMessage[_0x3b1f('0xe')]()['send']();
                        if (!Network['isHost']()) {
                            NetMessage[_0x3b1f('0x12')]()[_0x3b1f('0xf')]($gameMap[_0x3b1f('0x13')]());
                            return NetMessage[_0x3b1f('0x14')]()['send']($gameMap['mapId']());
                        }
                    } else {
                        return;
                    }
                }
                return $gameMap[_0x3b1f('0x4e')](_0x337ba4[_0x3b1f('0x30')], _0x337ba4['isLock']);
            }
        } catch (_0x304ac8) {
            if (_0x3b1f('0x4f') === 'qhdkO') {
                _0x4c1eec = _0x304ac8;
                return Network[_0x3b1f('0x1e')](_0x4c1eec, _0x3b1f('0x3e'));
            } else {
                Network[_0x3b1f('0x9')] = _0x3dcc12['data'];
                Network[_0x3b1f('0xb')] = Network[_0x3b1f('0x4')](Network[_0x3b1f('0xc')]());
            }
        }
    }
    static [_0x3b1f('0x50')](_0x527092) {
        var _0x33d477;
        try {
            if ('wNoDs' === _0x3b1f('0x51')) {
                return;
            } else {
                'START\x20SHARED\x20EVENT\x20FROM\x20NETWORK'['p']();
                return $gameMap[_0x3b1f('0x52')](_0x527092[_0x3b1f('0xa')]);
            }
        } catch (_0x526ece) {
            _0x33d477 = _0x526ece;
            return Network[_0x3b1f('0x1e')](_0x33d477, _0x3b1f('0x53'));
        }
    }
    static [_0x3b1f('0x54')](_0x2c8e58) {
        _0x3b1f('0x55')['p']();
        return BattleManager['_selectInputCommandFromNetwork'](_0x2c8e58[_0x3b1f('0xa')]);
    }
    static [_0x3b1f('0x56')](_0x4d702f) {
        var _0x3e505f, _0x26f33f;
        _0x26f33f = _0x4d702f[_0x3b1f('0xa')];
        _0x3b1f('0x57')['p'](_0x26f33f['id']);
        _0x3e505f = BattleManager[_0x3b1f('0x58')](_0x26f33f['id']);
        if (_0x3e505f != null) {
            _0x3e505f['_hp'] = _0x26f33f['hp'];
            _0x3e505f[_0x3b1f('0x59')] = _0x26f33f['mp'];
            _0x3e505f[_0x3b1f('0x5a')] = _0x26f33f['tp'];
            _0x3e505f[_0x3b1f('0x5b')] = _0x26f33f['states'];
        }
    }
    static [_0x3b1f('0x5c')](_0x54e4d1) {
        var _0x21541a, _0x3459d0, _0x52e2f6, _0x38ac1b, _0x40ffb1, _0x3107b4;
        _0x52e2f6 = _0x54e4d1[_0x3b1f('0xa')];
        _0x3b1f('0x5d')['p'](_0x52e2f6['id']);
        if (_0x52e2f6['id'] === _0x3b1f('0x5e')) {
            if (_0x3b1f('0x5f') !== _0x3b1f('0x5f')) {
                return Network[_0x3b1f('0x60')](_0x54e4d1[_0x3b1f('0xa')]);
            } else {
                _0x40ffb1 = BattleManager[_0x3b1f('0x58')](_0x52e2f6[_0x3b1f('0x61')]);
                _0x3107b4 = BattleManager[_0x3b1f('0x58')](_0x52e2f6['target']);
                if (_0x40ffb1 != null) {
                    if (_0x3b1f('0x62') === _0x3b1f('0x63')) {
                        _0x3b1f('0x4a')['p']();
                        _ = _0x54e4d1['data'];
                        if ($gameMap[_0x3b1f('0x13')]() !== _['mapId']) {
                            return;
                        }
                        return $gameMap['setOwnedEventByNetwork'](_['eventId'], _[_0x3b1f('0x46')]);
                    } else {
                        _0x40ffb1['clearResult']();
                    }
                }
                _0x38ac1b = new Game_ActionResult();
                _0x38ac1b[_0x3b1f('0x64')](_0x52e2f6[_0x3b1f('0x65')]);
                _0x3107b4[_0x3b1f('0x66')] = _0x38ac1b;
                return;
            }
        }
        _0x3459d0 = $gameParty['memberByActorId'](_0x52e2f6[_0x3b1f('0x67')]);
        _0x21541a = _0x3459d0[_0x3b1f('0x68')]();
        if (_0x52e2f6['id'] === _0x3b1f('0x69')) {
            if (_0x3b1f('0x6a') === _0x3b1f('0x6b')) {
                SceneManager[_0x3b1f('0x6c')]();
            } else {
                if (_0x21541a != null) {
                    _0x21541a['setSkillFromNet'](_0x52e2f6[_0x3b1f('0x6d')]);
                }
                return;
            }
        }
        if (_0x52e2f6['id'] === 'setItem') {
            if (_0x21541a != null) {
                if (_0x3b1f('0x6e') !== _0x3b1f('0x6e')) {
                    var _0x2c44f9, _0x975db7, _0x321a7b, _0x486db3;
                    try {
                        _0x321a7b = _0x54e4d1[_0x3b1f('0xa')];
                        if ($gameMap[_0x3b1f('0x13')]() === _0x321a7b) {
                            _0x975db7 = $gameMap[_0x3b1f('0x21')]();
                            _0x486db3 = {
                                'mapId': $gameMap[_0x3b1f('0x13')](),
                                'mapData': _0x975db7
                            };
                            NetMessage[_0x3b1f('0x6f')]()[_0x3b1f('0xf')](_0x486db3);
                            return NetMessage[_0x3b1f('0xe')]()['send']();
                        }
                    } catch (_0x2b0811) {
                        _0x2c44f9 = _0x2b0811;
                        return Network['error'](_0x2c44f9, 'While\x20try\x20response\x20to\x20server\x20map\x20data\x20events\x20request');
                    }
                } else {
                    _0x21541a['setItemFromNet'](_0x52e2f6['actionId']);
                }
            }
            return;
        }
        if (_0x52e2f6['id'] === _0x3b1f('0x70')) {
            if (_0x21541a != null) {
                _0x21541a[_0x3b1f('0x71')](_0x52e2f6['actionId']);
            }
        }
    }
    static [_0x3b1f('0x72')](_0x418c12) {
        var _0x22e703, _0x331161;
        _0x331161 = _0x418c12[_0x3b1f('0xa')];
        _0x22e703 = _0x331161['id'];
        'BATTLE\x20:\x20MANAGER'['p'](_0x22e703);
        if (_0x22e703 === 'battleOrder') {
            BattleManager[_0x3b1f('0x73')] = BattleManager['convertIdsToBattlers'](_0x331161[_0x3b1f('0x44')]);
            return;
        }
        if (_0x22e703 === _0x3b1f('0x74')) {
            if (_0x3b1f('0x75') === _0x3b1f('0x76')) {
                BattleManager[_0x3b1f('0x77')]();
                return;
            } else {
                $gameTroop['setUniqueIdsForEnemies'](_0x331161[_0x3b1f('0x78')]);
                return;
            }
        }
        if (_0x22e703 === _0x3b1f('0x77')) {
            if (_0x3b1f('0x79') === 'gnOdD') {
                return;
            } else {
                BattleManager['endAction']();
                return;
            }
        }
        if (_0x22e703 === _0x3b1f('0x7a')) {
            BattleManager[_0x3b1f('0x7a')]();
            return;
        }
        if (_0x22e703 === 'processTurn') {
            BattleManager[_0x3b1f('0x7b')](_0x331161['subjectId']);
            return;
        }
        if (_0x22e703 === _0x3b1f('0x7c')) {
            BattleManager[_0x3b1f('0x7d')](_0x331161[_0x3b1f('0x7e')]);
            return;
        }
        if (_0x22e703 === 'invokeNormal') {
            BattleManager['_invokeNormalActionFromNetwork'](_0x331161[_0x3b1f('0x7f')], _0x331161[_0x3b1f('0x80')]);
            return;
        }
        if (_0x22e703 === _0x3b1f('0x81')) {
            BattleManager[_0x3b1f('0x82')]();
            return;
        }
        if (_0x22e703 === _0x3b1f('0x83')) {
            BattleManager[_0x3b1f('0x84')]();
            return;
        }
        if (_0x22e703 === _0x3b1f('0x85')) {
            if (_0x3b1f('0x86') === _0x3b1f('0x86')) {
                BattleManager['processDefeat']();
                return;
            } else {
                act[_0x3b1f('0x15')](_0x331161[_0x3b1f('0x6d')]);
            }
        }
        if (_0x22e703 === 'escape') {
            BattleManager[_0x3b1f('0x87')](_0x331161[_0x3b1f('0x88')]);
        }
    }
    static [_0x3b1f('0x89')](_0x1259b2) {
        var _0x278329, _0x33f272;
        'NETWORK\x20ICON'['p']();
        try {
            if (_0x3b1f('0x8a') === _0x3b1f('0x8b')) {
                interpreter = new Game_Interpreter();
                interpreter[_0x3b1f('0x8c')] = data[_0x3b1f('0x8d')];
                interpreter['_mapId'] = data[_0x3b1f('0x13')];
                interpreter[_0x3b1f('0x8e')] = data[_0x3b1f('0x30')];
                methodName = _0x3b1f('0x8f') + data['id'];
                method = interpreter[methodName];
                if (method != null && typeof method === _0x3b1f('0x90')) {
                    interpreter[methodName]();
                    if (SceneManager['isCurrentSceneIsMenuBased']()) {
                        SceneManager['safeRefreshCurrentScene']();
                    }
                }
                return interpreter['terminate']();
            } else {
                _0x278329 = NetPartyManager[_0x3b1f('0x25')](_0x1259b2[_0x3b1f('0x5')]);
                if (!Network[_0x3b1f('0x91')]()) {
                    if (_0x3b1f('0x92') === 'RfCFL') {
                        dataA = JsonEx[_0x3b1f('0x93')](data[_0x3b1f('0x94')]);
                        dataB = JsonEx['parse'](data[_0x3b1f('0x95')]);
                        BattleManager[_0x3b1f('0x96')](dataA, dataB);
                    } else {
                        return _0x278329 != null ? _0x278329[_0x3b1f('0x97')](_0x1259b2[_0x3b1f('0xa')]) : void 0x0;
                    }
                }
            }
        } catch (_0x21c59a) {
            _0x33f272 = _0x21c59a;
            return Network[_0x3b1f('0x1e')](_0x33f272, _0x3b1f('0x98'));
        }
    }
    static [_0x3b1f('0x99')](_0x2aa454) {
        var _0x4612a2, _0x481289, _0x17d549, _0x337219, _0x381d7f;
        _0x3b1f('0x9a')['p'](_0x2aa454[_0x3b1f('0xa')]['id']);
        _0x4612a2 = _0x2aa454[_0x3b1f('0xa')];
        try {
            _0x17d549 = new Game_Interpreter();
            _0x17d549[_0x3b1f('0x8c')] = _0x4612a2[_0x3b1f('0x8d')];
            _0x17d549['_mapId'] = _0x4612a2[_0x3b1f('0x13')];
            _0x17d549[_0x3b1f('0x8e')] = _0x4612a2[_0x3b1f('0x30')];
            _0x381d7f = 'command' + _0x4612a2['id'];
            _0x337219 = _0x17d549[_0x381d7f];
            if (_0x337219 != null && typeof _0x337219 === _0x3b1f('0x90')) {
                _0x17d549[_0x381d7f]();
                if (SceneManager[_0x3b1f('0x9b')]()) {
                    if (_0x3b1f('0x9c') === _0x3b1f('0x9c')) {
                        SceneManager['safeRefreshCurrentScene']();
                    } else {
                        return SceneManager[_0x3b1f('0x9d')] instanceof ANET[_0x3b1f('0x9e')]['Scene_Trade'];
                    }
                }
            }
            return _0x17d549[_0x3b1f('0x9f')]();
        } catch (_0x30217a) {
            if (_0x3b1f('0xa0') !== 'eLOZi') {
                _0x481289 = _0x30217a;
                return Network[_0x3b1f('0x1e')](_0x481289, _0x3b1f('0x18'));
            } else {
                'SERVER\x20MAP\x20IS\x20OTHER,\x20TRANSFER\x20PLAYER!'['p']();
                transferData = _0x2aa454[_0x3b1f('0xa')];
                return $gamePlayer[_0x3b1f('0xa1')](mapId, transferData['x'], transferData['y'], transferData['d'], 0x0);
            }
        }
    }
    static [_0x3b1f('0xa2')](_0x344df6) {
        return _0x3b1f('0xa3')['p']();
    }
    static [_0x3b1f('0xa4')](_0x175980) {
        var _0x267a1c, _0x156ccd;
        try {
            if ('MVUpk' === _0x3b1f('0xa5')) {
                _0x156ccd = error;
                return Network[_0x3b1f('0x1e')](_0x156ccd, _0x3b1f('0xa6'));
            } else {
                NetPartyManager[_0x3b1f('0xa7')](_0x175980[_0x3b1f('0x5')], _0x175980['data']);
                try {
                    if (Network[_0x3b1f('0x8')]()) {
                        if (_0x3b1f('0xa8') === 'KwFyA') {
                            _0x267a1c = NetPartyManager['getActorIdBySocketId'](_0x175980['from']);
                            return Network['sessionData'][_0x3b1f('0xa9')](_0x267a1c, _0x175980['data']);
                        } else {
                            cmd = _0x175980[_0x3b1f('0xa')][_0x3b1f('0xaa')];
                            parameters = _0x175980[_0x3b1f('0xa')][_0x3b1f('0x8d')];
                            return uAPI[cmd](...parameters);
                        }
                    }
                } catch (_0x318021) {
                    _0x156ccd = _0x318021;
                    return Network[_0x3b1f('0x1e')](_0x156ccd, _0x3b1f('0xab'));
                }
            }
        } catch (_0x5442db) {
            _0x156ccd = _0x5442db;
            return Network[_0x3b1f('0x1e')](_0x156ccd, _0x3b1f('0x1f'));
        }
    }
    static [_0x3b1f('0xac')](_0x2dbf36) {
        var _0x5e34a9, _0x3cc7c7, _0x35792b;
        try {
            _0x3cc7c7 = _0x2dbf36['data'][_0x3b1f('0x13')];
            if ($gameMap['mapId']() !== _0x3cc7c7) {
                _0x3b1f('0xad')['p']();
                _0x35792b = _0x2dbf36[_0x3b1f('0xa')];
                return $gamePlayer[_0x3b1f('0xa1')](_0x3cc7c7, _0x35792b['x'], _0x35792b['y'], _0x35792b['d'], 0x0);
            }
        } catch (_0x2a9934) {
            if (_0x3b1f('0xae') !== _0x3b1f('0xaf')) {
                _0x5e34a9 = _0x2a9934;
                return Network[_0x3b1f('0x1e')](_0x5e34a9, 'While\x20try\x20synchronize\x20game\x20map\x20with\x20Server');
            } else {
                _0x5e34a9 = _0x2a9934;
                return Network[_0x3b1f('0x1e')](_0x5e34a9, _0x3b1f('0x98'));
            }
        }
    }
    static [_0x3b1f('0xb0')](_0x1739c7) {
        var _0x243b8b, _0x46655f;
        try {
            _0x46655f = _0x1739c7['data'];
            NetPartyManager[_0x3b1f('0xb1')](_0x1739c7[_0x3b1f('0x5')], _0x46655f[_0x3b1f('0xb2')]);
            NetPartyManager[_0x3b1f('0xa7')](_0x1739c7['from'], _0x46655f[_0x3b1f('0xb3')]);
            return NetWorldManager['onWorldDataFromNetwork'](_0x46655f);
        } catch (_0x51450f) {
            if (_0x3b1f('0xb4') === 'vgNIZ') {
                BattleManager[_0x3b1f('0x7b')](data['subjectId']);
                return;
            } else {
                _0x243b8b = _0x51450f;
                return Network[_0x3b1f('0x1e')](_0x243b8b, _0x3b1f('0xb5'));
            }
        }
    }
    static [_0x3b1f('0xb6')](_0x523297) {
        var _0x7e06e6;
        try {
            if (_0x3b1f('0xb7') === _0x3b1f('0xb8')) {
                anotherClientIndex = NetPartyManager[_0x3b1f('0xb9')](_0x523297[_0x3b1f('0x5')]);
                return anotherClientIndex === $gameTemp[_0x3b1f('0xba')];
            } else {
                return NetWorldManager[_0x3b1f('0xbb')](_0x523297[_0x3b1f('0xa')]);
            }
        } catch (_0x1d55c2) {
            _0x7e06e6 = _0x1d55c2;
            return Network[_0x3b1f('0x1e')](_0x7e06e6, _0x3b1f('0xbc'));
        }
    }
    static [_0x3b1f('0xbd')](_0x88c5d4) {
        var _0x176287, _0x4e7729;
        try {
            _0x4e7729 = NetPartyManager[_0x3b1f('0xbe')](_0x88c5d4['from']);
            return _0x4e7729[_0x3b1f('0x13')] = _0x88c5d4[_0x3b1f('0xa')];
        } catch (_0x51e924) {
            if ('ZSLLv' === _0x3b1f('0xbf')) {
                _0x176287 = _0x51e924;
                return Network[_0x3b1f('0x1e')](_0x176287, 'While\x20try\x20load\x20global\x20world\x20data\x20from\x20server');
            } else {
                ClientManager[_0x3b1f('0x29')](event, data[_0x3b1f('0x2d')]);
            }
        }
    }
    static [_0x3b1f('0xc0')](_0x5a689c) {
        var _0x407f35, _0x381d80, _0x4feb64, _0x394906;
        try {
            if (_0x3b1f('0xc1') !== 'IcABJ') {
                _0x4feb64 = _0x5a689c[_0x3b1f('0xa')];
                if ($gameMap[_0x3b1f('0x13')]() === _0x4feb64) {
                    _0x381d80 = $gameMap[_0x3b1f('0x21')]();
                    _0x394906 = {
                        'mapId': $gameMap[_0x3b1f('0x13')](),
                        'mapData': _0x381d80
                    };
                    NetMessage[_0x3b1f('0x6f')]()[_0x3b1f('0xf')](_0x394906);
                    return NetMessage[_0x3b1f('0xe')]()['send']();
                }
            } else {
                var _0x34fadc, _0x38fe9a, _0x5512e3;
                try {
                    _0x5512e3 = _0x5a689c[_0x3b1f('0xa')][_0x3b1f('0x13')];
                    if ($gameMap[_0x3b1f('0x13')]() === _0x5512e3) {
                        _0x38fe9a = _0x5a689c['data'][_0x3b1f('0xc2')];
                        return $gameMap[_0x3b1f('0x26')](_0x38fe9a);
                    }
                } catch (_0x1510e7) {
                    _0x34fadc = _0x1510e7;
                    return Network[_0x3b1f('0x1e')](_0x34fadc, _0x3b1f('0xc3'));
                }
            }
        } catch (_0x176727) {
            if (_0x3b1f('0xc4') === _0x3b1f('0xc4')) {
                _0x407f35 = _0x176727;
                return Network[_0x3b1f('0x1e')](_0x407f35, _0x3b1f('0xc5'));
            } else {
                if (!Network[_0x3b1f('0x4')](_0x5a689c[_0x3b1f('0x5')])) {
                    return;
                }
                NetPartyManager[_0x3b1f('0x6')](_0x5a689c[_0x3b1f('0x5')]);
                return Network[_0x3b1f('0x2')](Network[_0x3b1f('0xc6')]);
            }
        }
    }
    static ['OnResponseGameMapEventsDataFromServer'](_0x72da8f) {
        var _0x172065, _0x3f11aa, _0x39021d;
        try {
            _0x39021d = _0x72da8f[_0x3b1f('0xa')][_0x3b1f('0x13')];
            if ($gameMap[_0x3b1f('0x13')]() === _0x39021d) {
                if (_0x3b1f('0xc7') !== _0x3b1f('0xc8')) {
                    _0x3f11aa = _0x72da8f[_0x3b1f('0xa')][_0x3b1f('0xc2')];
                    return $gameMap[_0x3b1f('0x26')](_0x3f11aa);
                } else {
                    var _0x1bb9e8, _0x32e837, _0x1d7c5e, _0x12fa88;
                    try {
                        _0x3b1f('0x3c')['p']();
                        _0x1bb9e8 = _0x72da8f[_0x3b1f('0xa')];
                        _0x12fa88 = _0x1bb9e8[_0x3b1f('0x13')];
                        if ($gameMap[_0x3b1f('0x13')]() !== _0x12fa88) {
                            return;
                        }
                        _0x1d7c5e = $gameMap['event'](_0x1bb9e8[_0x3b1f('0x30')]);
                        return _0x1d7c5e != null ? _0x1d7c5e['executeSyncCommandFromNetwork'](_0x1bb9e8['pi'], _0x1bb9e8['li']) : void 0x0;
                    } catch (_0x251127) {
                        _0x32e837 = _0x251127;
                        return Network[_0x3b1f('0x1e')](_0x32e837, _0x3b1f('0x3e'));
                    }
                }
            }
        } catch (_0x5c07ee) {
            _0x172065 = _0x5c07ee;
            return Network[_0x3b1f('0x1e')](_0x172065, _0x3b1f('0xc3'));
        }
    }
    static [_0x3b1f('0xc9')](_0xf7f675) {
        _0x3b1f('0xca')['p']();
        return Network[_0x3b1f('0xcb')] = !![];
    }
    static ['OnUserApiCommand'](_0x332288) {
        var _0x4733d0, _0x4a9f3a, _0x5e1339;
        try {
            if (_0x3b1f('0xcc') === _0x3b1f('0xcc')) {
                _0x4733d0 = _0x332288[_0x3b1f('0xa')]['name'];
                _0x5e1339 = _0x332288[_0x3b1f('0xa')][_0x3b1f('0x8d')];
                return uAPI[_0x4733d0](..._0x5e1339);
            } else {
                _0x4a9f3a = error;
                return Network[_0x3b1f('0x1e')](_0x4a9f3a, 'While\x20try\x20load\x20global\x20world\x20data\x20from\x20server');
            }
        } catch (_0x58df64) {
            if (_0x3b1f('0xcd') === _0x3b1f('0xcd')) {
                _0x4a9f3a = _0x58df64;
                return Network['error'](_0x4a9f3a, _0x3b1f('0x33'));
            } else {
                _0x4a9f3a = _0x58df64;
                return Network[_0x3b1f('0x1e')](_0x4a9f3a, _0x3b1f('0xce'));
            }
        }
    }
    static ['OnStartPvPBattle'](_0x262edf) {
        return Network[_0x3b1f('0x60')](_0x262edf[_0x3b1f('0xa')]);
    }
    static ['OnBattleManagerPvPCommand'](_0x31ae96) {
        var _0x32eac4, _0x60d37a, _0x29fc61, _0x2b3919, _0x5a5aa4, _0x179654, _0x98cac6, _0x5de6a0;
        try {
            if ('thcdx' === 'yQYKI') {
                var _0x10f9e5;
                try {
                    return NetWorldManager[_0x3b1f('0xbb')](_0x31ae96[_0x3b1f('0xa')]);
                } catch (_0x47b164) {
                    _0x10f9e5 = _0x47b164;
                    return Network[_0x3b1f('0x1e')](_0x10f9e5, _0x3b1f('0xbc'));
                }
            } else {
                _0x29fc61 = _0x31ae96[_0x3b1f('0xa')];
                _0x60d37a = _0x29fc61['id'];
                _0x3b1f('0xcf')['p'](_0x60d37a);
                if (_0x60d37a === _0x3b1f('0xd0')) {
                    if (_0x3b1f('0xd1') !== 'ikXzs') {
                        _0x32eac4 = JsonEx[_0x3b1f('0x93')](_0x29fc61['action']);
                        BattleManager[_0x3b1f('0xd2')](_0x32eac4);
                        return;
                    } else {
                        BattleManager[_0x3b1f('0x87')](_0x29fc61[_0x3b1f('0x88')]);
                    }
                }
                if (_0x60d37a === _0x3b1f('0xd3')) {
                    BattleManager[_0x3b1f('0xd4')]();
                    return;
                }
                if (_0x60d37a === _0x3b1f('0xd5')) {
                    _0x32eac4 = JsonEx[_0x3b1f('0x93')](_0x29fc61[_0x3b1f('0x3a')]);
                    BattleManager[_0x3b1f('0xd6')](_0x29fc61[_0x3b1f('0x7f')], _0x32eac4, _0x29fc61[_0x3b1f('0x7e')]);
                    return;
                }
                if (_0x60d37a === 'invokeNormalActionPvP') {
                    _0x98cac6 = JsonEx['parse'](_0x29fc61['resultSubject']);
                    _0x5de6a0 = JsonEx[_0x3b1f('0x93')](_0x29fc61[_0x3b1f('0xd7')]);
                    BattleManager[_0x3b1f('0xd8')](_0x29fc61[_0x3b1f('0x7f')], _0x29fc61[_0x3b1f('0x80')], _0x98cac6, _0x5de6a0);
                    return;
                }
                if (_0x60d37a === _0x3b1f('0xd9')) {
                    if ('FNmPf' === _0x3b1f('0xda')) {
                        _0x2b3919 = JsonEx[_0x3b1f('0x93')](_0x29fc61['subjectData']);
                        _0x5a5aa4 = JsonEx[_0x3b1f('0x93')](_0x29fc61[_0x3b1f('0x95')]);
                        BattleManager[_0x3b1f('0x96')](_0x2b3919, _0x5a5aa4);
                    } else {
                        var _0x325916, _0x115000;
                        try {
                            _0x325916 = NetPartyManager[_0x3b1f('0xb9')](_0x31ae96[_0x3b1f('0x5')]);
                            return Network[_0x3b1f('0xdb')](_0x325916, _0x31ae96[_0x3b1f('0xa')]);
                        } catch (_0x3f6430) {
                            _0x115000 = _0x3f6430;
                            return Network[_0x3b1f('0x1e')](_0x115000, _0x3b1f('0xdc'));
                        }
                    }
                }
            }
        } catch (_0x3be91f) {
            if (_0x3b1f('0xdd') === _0x3b1f('0xdd')) {
                _0x179654 = _0x3be91f;
                return Network[_0x3b1f('0x1e')](_0x179654, _0x3b1f('0x49'));
            } else {
                var _0x3da98b, _0xd24ca5;
                try {
                    _0x3da98b = NetPartyManager['getActorIdBySocketId'](_0x31ae96['from']);
                    return _0x3da98b === $gameTemp[_0x3b1f('0xba')];
                } catch (_0x120530) {
                    _0xd24ca5 = _0x120530;
                    Network[_0x3b1f('0x1e')](_0xd24ca5, _0x3b1f('0xde'));
                    return ![];
                }
            }
        }
    }
    static [_0x3b1f('0xdf')](_0xdc9d0b) {
        var _0xe5b7f9, _0x159650;
        try {
            _0xe5b7f9 = NetPartyManager['getActorIdBySocketId'](_0xdc9d0b[_0x3b1f('0x5')]);
            return Network[_0x3b1f('0xdb')](_0xe5b7f9, _0xdc9d0b[_0x3b1f('0xa')]);
        } catch (_0x47b1ee) {
            if (_0x3b1f('0xe0') !== _0x3b1f('0xe0')) {
                var _0x5062b3, _0x4673a0;
                try {
                    _0x3b1f('0x4a')['p']();
                    _0x5062b3 = _0xdc9d0b[_0x3b1f('0xa')];
                    if ($gameMap[_0x3b1f('0x13')]() !== _0x5062b3[_0x3b1f('0x13')]) {
                        return;
                    }
                    return $gameMap[_0x3b1f('0x4e')](_0x5062b3[_0x3b1f('0x30')], _0x5062b3[_0x3b1f('0x46')]);
                } catch (_0x232789) {
                    _0x4673a0 = _0x232789;
                    return Network[_0x3b1f('0x1e')](_0x4673a0, _0x3b1f('0x3e'));
                }
            } else {
                _0x159650 = _0x47b1ee;
                return Network['error'](_0x159650, _0x3b1f('0xdc'));
            }
        }
    }
    static [_0x3b1f('0xe1')](_0x3bff61) {
        var _0x9a5b0b, _0x42cd45;
        try {
            if (_0x3b1f('0xe2') !== _0x3b1f('0xe2')) {
                mapId = _0x3bff61[_0x3b1f('0xa')][_0x3b1f('0x13')];
                if ($gameMap[_0x3b1f('0x13')]() === mapId) {
                    mapData = _0x3bff61[_0x3b1f('0xa')][_0x3b1f('0xc2')];
                    return $gameMap[_0x3b1f('0x26')](mapData);
                }
            } else {
                _0x3b1f('0xe3')['p']();
                if (!ClientManager[_0x3b1f('0xe4')](_0x3bff61)) {
                    return;
                }
                if (!ClientManager[_0x3b1f('0xe5')]()) {
                    return;
                }
                _0x42cd45 = SceneManager[_0x3b1f('0x9d')];
                _0x3b1f('0xe6')['p']();
                if (_0x42cd45['isReadyForTrade']()) {
                    _0x42cd45['_tradeButtonClick']();
                    if (ClientManager['_isProperSceneForTrade']()) {
                        _0x42cd45[_0x3b1f('0xe7')]();
                    }
                    'GOOD\x20TRADE!'['p']();
                    $gameTemp[_0x3b1f('0xe8')] = ANET[_0x3b1f('0x9e')]['TradeItems'][_0x3b1f('0xe9')](_0x3bff61[_0x3b1f('0xa')]);
                    _0x3b1f('0xea')['p']();
                    console[_0x3b1f('0xeb')]($gameTemp[_0x3b1f('0xe8')]);
                    $gameTemp[_0x3b1f('0xe8')][_0x3b1f('0xec')]();
                    'I\x20CONSUME'['p']();
                    console[_0x3b1f('0xeb')]($gameTemp[_0x3b1f('0xed')]);
                    $gameTemp[_0x3b1f('0xed')][_0x3b1f('0xee')]();
                    return Network['_clearTradeState']();
                }
            }
        } catch (_0x19efb2) {
            if (_0x3b1f('0xef') === _0x3b1f('0xef')) {
                _0x9a5b0b = _0x19efb2;
                return Network[_0x3b1f('0x1e')](_0x9a5b0b, _0x3b1f('0xf0'));
            } else {
                _0x9a5b0b = _0x19efb2;
                return Network[_0x3b1f('0x1e')](_0x9a5b0b, 'while\x20accept\x20new\x20chat\x20message');
            }
        }
    }
    static [_0x3b1f('0xe4')](_0x2a1f80) {
        var _0x5e872d, _0x5c84b8;
        try {
            _0x5e872d = NetPartyManager[_0x3b1f('0xb9')](_0x2a1f80[_0x3b1f('0x5')]);
            return _0x5e872d === $gameTemp['netTradeAnotherActorId'];
        } catch (_0x2fac7a) {
            _0x5c84b8 = _0x2fac7a;
            Network[_0x3b1f('0x1e')](_0x5c84b8, 'unknown\x20trade\x20player\x20index');
            return ![];
        }
    }
    static [_0x3b1f('0xe5')]() {
        return SceneManager[_0x3b1f('0x9d')] instanceof ANET[_0x3b1f('0x9e')][_0x3b1f('0xf1')];
    }
    static ['OnTradeItems'](_0x1ced44) {
        var _0x5b2b38;
        try {
            if (_0x3b1f('0xf2') !== 'KDIzQ') {
                if (!ClientManager[_0x3b1f('0xe4')](_0x1ced44)) {
                    return;
                }
                $gameTemp[_0x3b1f('0xe8')] = ANET[_0x3b1f('0x9e')][_0x3b1f('0xf3')]['FromNetwork'](_0x1ced44[_0x3b1f('0xa')]);
                _0x3b1f('0xf4')['p']();
                console['info']($gameTemp[_0x3b1f('0xe8')]);
                if (ClientManager['_isProperSceneForTrade']()) {
                    return SceneManager['_scene'][_0x3b1f('0xf5')]();
                }
            } else {
                char = NetPartyManager[_0x3b1f('0x25')](_0x1ced44[_0x3b1f('0x5')]);
                if (!Network['inBattle']()) {
                    return char != null ? char['showNetworkIcon'](_0x1ced44[_0x3b1f('0xa')]) : void 0x0;
                }
            }
        } catch (_0x5f4799) {
            if (_0x3b1f('0xf6') === _0x3b1f('0xf6')) {
                _0x5b2b38 = _0x5f4799;
                return Network[_0x3b1f('0x1e')](_0x5b2b38, _0x3b1f('0xf7'));
            } else {
                return Network[_0x3b1f('0xf8')](_0x1ced44['data']);
            }
        }
    }
    static [_0x3b1f('0xf9')](_0x19be78) {
        return Network[_0x3b1f('0xf8')](_0x19be78[_0x3b1f('0xa')]);
    }
    static [_0x3b1f('0xfa')](_0x39361e) {
        var _0x28a0e8;
        try {
            if (!ClientManager[_0x3b1f('0xe4')](_0x39361e)) {
                return;
            }
            return $gameTemp[_0x3b1f('0xfb')] = !![];
        } catch (_0x45267a) {
            _0x28a0e8 = _0x45267a;
            return Network[_0x3b1f('0x1e')](_0x28a0e8, _0x3b1f('0xa6'));
        }
    }
    static [_0x3b1f('0xfc')]() {
        return ClientManager[_0x3b1f('0x16')] = null;
    }
};
AlphaNET['register'](ClientManager);
})();

//Compressed by MV Plugin Builder
(function(){var _0x2e13 = [
    'XWwAa',
    '_SendHostMapIdToClient',
    'getGlobalData',
    'getWorldDataNetwork',
    'GlobalWorldData',
    'when\x20new\x20player\x20register',
    'direction',
    'OnClientDisconnect',
    '_netServer',
    '_host',
    'GQeVr',
    'bLpLh',
    'stopServer',
    'PlayerDisconnect',
    'setFrom',
    'StartSharedEvent',
    'SERVER\x20START\x20NET\x20MESSAGE',
    'IsEventPoolExists',
    'CreateEventPool',
    'RegisterOnSharedEvent',
    'waitId',
    'OtPMM',
    'RHjbO',
    'actorId',
    'from',
    'error',
    '!!!\x20ABORT,\x20something\x20wrong!',
    'abortWaitPool',
    'REGISTER\x20\x20ON\x20EVENT\x20SYNC\x20LINE',
    'line',
    'addClient',
    'NetWaitPool',
    '_waitPoolThread',
    'getPoolSize',
    'clientsCount',
    'isPoolReady',
    'onWaitPoolReady',
    'RegisterOnSync',
    'SERVER\x20ACCEPT\x20SYNC\x20REQUEST',
    'RegisterOnSyncPool',
    'ucJlg',
    '_startSyncPoolThread',
    'WsokA',
    'OcyJS',
    'OnPlayerWorldData',
    'OnSyncEvent',
    'onEventSyncCommand',
    'OnVirtualInterpreter',
    'onEventVirtualCommand',
    'XgUzK',
    'While\x20try\x20check\x20virtual\x20command\x20on\x20Server',
    'OnPlayerNetItemsData',
    'isHost',
    'setPlayerItemsData',
    'mssCg',
    'getPlayer',
    '_GetClientById',
    'StartPvPBattle',
    'OnPlayerRequestMapData',
    'forEach',
    'first',
    'NetSessionData',
    'CHVqs',
    'SEND\x20REQUEST\x20TO\x20PLAYER',
    'JQZLM',
    'getPlayerByActorId',
    'GameMapEventsDataResponse',
    '_SendMapDataResponseToClient',
    'While\x20try\x20get\x20map\x20events\x20data\x20from\x20server',
    '_getClientById',
    'OnMapDataResonpse',
    'Olpwk',
    'TYIId',
    'roQnR',
    'myRivalActorId',
    'BattleManagerPvP',
    'vXAIE',
    'nfaUB',
    'while\x20get\x20map\x20data\x20response',
    'OnPlayerChangeMap',
    'hZxYI',
    'TKAIb',
    'stjcU',
    'SetOwner',
    'LQvIJ',
    'whoStart',
    'find',
    'NrPFx',
    'NOT\x20OWNER\x20ANYMORE',
    'ANOTHER\x20OWNER',
    'OnPlayerRequestPvPWithAnother',
    'getPlayerByIndex',
    'OnPlayerStartPvPWithAnother',
    'OnPlayerRequestTradeWithAnother',
    'RWcHD',
    'StartTrade',
    'BATTLE\x20:\x20MANAGER\x20PVP',
    'inputActionPvP',
    'startActionPvP',
    'invokeNormalActionPvP',
    'EPtMT',
    'OnBattleManagerPvPCommand',
    '_CheckExistsOwner',
    'register',
    'instance',
    'eventWaitPool',
    'syncPools',
    'mapUpdateWaitPool',
    'mapOwnerPool',
    'REGISTER\x20HOST',
    'registerNewPlayer',
    'myPlayerData',
    'players',
    'mapId',
    '_isMapOwner',
    'OwzdZ',
    'sessionData',
    'LIBS',
    'getActorIdBySocketId',
    'setPlayerWorldData',
    'data',
    'OnNewPlayerConnected',
    'canConnectToServer',
    'AlXPG',
    'AlertMessage',
    'send',
    'Server\x20is\x20Busy!\x20Try\x20again\x20later!',
    'disconnect',
    'eventId',
    'isMaximumForNetwork',
    'allowConnect',
    'Connection\x20restricted\x20by\x20Server!',
    'RegisterNewPlayer',
    'PlayersTableResponse',
    'serv',
    'PlayerConnect',
    'broadcast',
    'hasInfoAbout',
    'getAllData',
    'PlayerWorldData',
    'isMultiMode'
];
(function (_0x5b2a5d, _0x411b0a) {
    var _0x216e50 = function (_0x32ad98) {
        while (--_0x32ad98) {
            _0x5b2a5d['push'](_0x5b2a5d['shift']());
        }
    };
    _0x216e50(++_0x411b0a);
}(_0x2e13, 0x182));
var _0x3987 = function (_0x4956ce, _0x2525d7) {
    _0x4956ce = _0x4956ce - 0x0;
    var _0x4ef483 = _0x2e13[_0x4956ce];
    return _0x4ef483;
};
var ServerManager;
ServerManager = class ServerManager {
    static ['Init'](_0x4e7da4) {
        this['_netServer'] = _0x4e7da4;
        this['serv'] = _0x4e7da4[_0x3987('0x0')]();
        this[_0x3987('0x1')] = null;
        this[_0x3987('0x2')] = {};
        this[_0x3987('0x3')] = {};
        return this[_0x3987('0x4')] = {};
    }
    static ['RegisterHost'](_0x1ba7db) {
        _0x3987('0x5')['p']();
        NetPartyManager[_0x3987('0x6')](_0x1ba7db['id']);
        Network[_0x3987('0x7')] = Network[_0x3987('0x8')]['first']();
        Network[_0x3987('0x7')][_0x3987('0x9')] = $gameMap['mapId']();
        ServerManager[_0x3987('0x4')][$gameMap['mapId']()] = _0x1ba7db['id'];
        Network[_0x3987('0xa')] = !![];
        if (Network['sessionData'] === null) {
            if (_0x3987('0xb') === 'OwzdZ') {
                return Network[_0x3987('0xc')] = new AlphaNET[(_0x3987('0xd'))]['NetSessionData']();
            } else {
                var _0x1db130;
                _0x1db130 = NetPartyManager[_0x3987('0xe')](networkData['from']);
                if (_0x1db130 == null) {
                    return;
                }
                Network[_0x3987('0xc')][_0x3987('0xf')](_0x1db130, networkData[_0x3987('0x10')]);
            }
        }
    }
    static [_0x3987('0x11')](_0x2129bb) {
        if (!Network[_0x3987('0x12')]()) {
            if ('AlXPG' === _0x3987('0x13')) {
                NetMessage[_0x3987('0x14')](_0x2129bb)[_0x3987('0x15')](_0x3987('0x16'));
                _0x2129bb[_0x3987('0x17')]();
                return;
            } else {
                ServerManager['CreateEventPool'](networkData[_0x3987('0x10')][_0x3987('0x18')]);
            }
        }
        if ($gameParty[_0x3987('0x19')]()) {
            NetMessage[_0x3987('0x14')](_0x2129bb)[_0x3987('0x15')]('Server\x20is\x20Full!');
            _0x2129bb[_0x3987('0x17')]();
            return;
        }
        if (!Network[_0x3987('0x1a')]()) {
            NetMessage[_0x3987('0x14')](_0x2129bb)[_0x3987('0x15')](_0x3987('0x1b'));
            _0x2129bb['disconnect']();
            return;
        }
        return this[_0x3987('0x1c')](_0x2129bb);
    }
    static [_0x3987('0x1c')](_0x4c5e59) {
        var _0x114699, _0x4bd403, _0x1e2c10, _0x17b6c9;
        try {
            NetPartyManager[_0x3987('0x6')](_0x4c5e59['id']);
            NetMessage[_0x3987('0x1d')](ServerManager[_0x3987('0x1e')])['send'](Network[_0x3987('0x8')]);
            NetMessage[_0x3987('0x1f')](_0x4c5e59)[_0x3987('0x20')]();
            _0x1e2c10 = NetPartyManager['getActorIdBySocketId'](_0x4c5e59['id']);
            if (Network['sessionData'][_0x3987('0x21')](_0x1e2c10)) {
                _0x17b6c9 = Network[_0x3987('0xc')][_0x3987('0x22')](_0x1e2c10);
                NetMessage[_0x3987('0x23')](_0x4c5e59)[_0x3987('0x15')](_0x17b6c9);
            }
            if (!Network[_0x3987('0x24')]()) {
                if (_0x3987('0x25') === 'XWwAa') {
                    ServerManager[_0x3987('0x26')](_0x4c5e59);
                } else {
                    if (!Network[_0x3987('0x12')]()) {
                        NetMessage[_0x3987('0x14')](_0x4c5e59)[_0x3987('0x15')](_0x3987('0x16'));
                        _0x4c5e59[_0x3987('0x17')]();
                        return;
                    }
                    if ($gameParty['isMaximumForNetwork']()) {
                        NetMessage[_0x3987('0x14')](_0x4c5e59)[_0x3987('0x15')]('Server\x20is\x20Full!');
                        _0x4c5e59[_0x3987('0x17')]();
                        return;
                    }
                    if (!Network[_0x3987('0x1a')]()) {
                        NetMessage[_0x3987('0x14')](_0x4c5e59)[_0x3987('0x15')]('Connection\x20restricted\x20by\x20Server!');
                        _0x4c5e59[_0x3987('0x17')]();
                        return;
                    }
                    return this[_0x3987('0x1c')](_0x4c5e59);
                }
            }
            _0x4bd403 = Network[_0x3987('0xc')][_0x3987('0x27')]()[_0x3987('0x28')]();
            return NetMessage[_0x3987('0x29')](_0x4c5e59)[_0x3987('0x15')](_0x4bd403);
        } catch (_0x30e4df) {
            _0x114699 = _0x30e4df;
            return Network['error'](_0x114699, _0x3987('0x2a'));
        }
    }
    static [_0x3987('0x26')](_0x45f795) {
        var _0x1b2049;
        _0x1b2049 = {
            'mapId': $gameMap[_0x3987('0x9')](),
            'x': $gamePlayer['x'],
            'y': $gamePlayer['y'],
            'd': $gamePlayer[_0x3987('0x2b')]()
        };
        return NetMessage['HostGameMapId'](_0x45f795)['send'](_0x1b2049);
    }
    static [_0x3987('0x2c')](_0x365dc6) {
        if (_0x365dc6['id'] === ServerManager[_0x3987('0x2d')][_0x3987('0x2e')]['id']) {
            if (_0x3987('0x2f') === _0x3987('0x30')) {
                return;
            } else {
                return Network[_0x3987('0x31')]();
            }
        } else {
            ServerManager['_CheckExistsOwner'](_0x365dc6['id']);
            return NetMessage[_0x3987('0x32')](_0x365dc6)[_0x3987('0x33')](_0x365dc6['id'])[_0x3987('0x20')]();
        }
    }
    static [_0x3987('0x34')](_0x2bea89) {
        _0x3987('0x35')['p']();
        if (!ServerManager[_0x3987('0x36')]()) {
            ServerManager[_0x3987('0x37')](_0x2bea89[_0x3987('0x10')][_0x3987('0x18')]);
        }
        return ServerManager[_0x3987('0x38')](_0x2bea89);
    }
    static ['RegisterOnSharedEvent'](_0x1f3afb) {
        'REGISTER\x20\x20ON\x20EVENT'['p']();
        if (ServerManager[_0x3987('0x1')] != null && _0x1f3afb[_0x3987('0x10')][_0x3987('0x18')] === ServerManager[_0x3987('0x1')][_0x3987('0x39')]) {
            if (_0x3987('0x3a') === _0x3987('0x3b')) {
                NetMessage['StartPvPBattle'](client)['send'](playerTwo[_0x3987('0x3c')]);
                return NetMessage['StartPvPBattle'](client2)[_0x3987('0x15')](playerOne[_0x3987('0x3c')]);
            } else {
                return ServerManager[_0x3987('0x1')]['addClient'](_0x1f3afb[_0x3987('0x3d')], !![]);
            }
        } else {
            Network[_0x3987('0x3e')]('', _0x3987('0x38'));
            _0x3987('0x3f')['p']();
            return ServerManager[_0x3987('0x2d')][_0x3987('0x40')](_0x1f3afb['from'], -0x64);
        }
    }
    static ['RegisterOnSharedEventSync'](_0x5937a6) {
        _0x3987('0x41')['p'](_0x5937a6[_0x3987('0x10')][_0x3987('0x42')]);
        if (!ServerManager['IsEventPoolExists']()) {
            ServerManager[_0x3987('0x37')](_0x5937a6[_0x3987('0x10')]['eventId']);
        }
        if (_0x5937a6[_0x3987('0x10')][_0x3987('0x18')] !== ServerManager[_0x3987('0x1')][_0x3987('0x39')]) {
            return;
        }
        return ServerManager[_0x3987('0x1')][_0x3987('0x43')](_0x5937a6['from'], !![]);
    }
    static [_0x3987('0x36')]() {
        return this[_0x3987('0x1')] != null;
    }
    static [_0x3987('0x37')](_0x2a1f25) {
        var _0x2ba7e0;
        ServerManager[_0x3987('0x1')] = new AlphaNET[(_0x3987('0xd'))][(_0x3987('0x44'))](_0x2a1f25);
        return ServerManager[_0x3987('0x45')] = setTimeout(_0x2ba7e0 = function () {
            var _0x3aba6f, _0x80befb;
            if (((_0x80befb = ServerManager['eventWaitPool']) != null ? _0x80befb[_0x3987('0x46')]() : void 0x0) === ServerManager[_0x3987('0x2d')][_0x3987('0x47')]()) {
                if (ServerManager[_0x3987('0x1')][_0x3987('0x48')]()) {
                    _0x3aba6f = ServerManager[_0x3987('0x1')]['waitId'];
                    ServerManager[_0x3987('0x2d')][_0x3987('0x49')](_0x3aba6f);
                    ServerManager[_0x3987('0x1')] = null;
                    return;
                }
            }
            if (ServerManager[_0x3987('0x1')] != null) {
                if ('xoZXj' !== 'xoZXj') {
                    ServerManager[_0x3987('0x26')](client);
                } else {
                    ServerManager[_0x3987('0x45')] = setTimeout(_0x2ba7e0, 0x64);
                }
            }
        }, 0x64);
    }
    static [_0x3987('0x4a')](_0x5f455a) {
        var _0x4d02e4;
        _0x3987('0x4b')['p'](_0x5f455a[_0x3987('0x10')]);
        _0x4d02e4 = _0x5f455a[_0x3987('0x10')];
        return ServerManager[_0x3987('0x4c')](_0x4d02e4, _0x5f455a[_0x3987('0x3d')]);
    }
    static [_0x3987('0x4c')](_0x5ad0e6, _0x1ebb58) {
        var _0x16234e;
        if (ServerManager['syncPools'][_0x5ad0e6] == null) {
            if (_0x3987('0x4d') === 'ucJlg') {
                ServerManager[_0x3987('0x2')][_0x5ad0e6] = new AlphaNET['LIBS']['NetWaitPool'](_0x5ad0e6);
                ServerManager[_0x3987('0x4e')](_0x5ad0e6);
            } else {
                NetMessage[_0x3987('0x14')](_0x1ebb58)[_0x3987('0x15')](_0x3987('0x1b'));
                _0x1ebb58[_0x3987('0x17')]();
                return;
            }
        }
        _0x16234e = ServerManager[_0x3987('0x2')][_0x5ad0e6];
        return _0x16234e[_0x3987('0x43')](_0x1ebb58, !![]);
    }
    static ['_startSyncPoolThread'](_0x3f1ef1) {
        var _0x43fe11;
        return setTimeout(_0x43fe11 = function () {
            var _0xf2be28, _0x26f796;
            _0xf2be28 = ServerManager['syncPools'][_0x3f1ef1];
            if (_0xf2be28 == null) {
                return;
            }
            _0x26f796 = ServerManager[_0x3987('0x2d')][_0x3987('0x47')]();
            if (_0xf2be28[_0x3987('0x46')]() === _0x26f796 && _0xf2be28[_0x3987('0x48')]()) {
                ServerManager['_netServer'][_0x3987('0x49')](_0xf2be28[_0x3987('0x39')]);
                ServerManager[_0x3987('0x2')][_0x3f1ef1] = null;
                return;
            } else {
                if (_0x3987('0x4f') !== _0x3987('0x50')) {
                    setTimeout(_0x43fe11, 0x64);
                } else {
                    return;
                }
            }
        }, 0x64);
    }
    static [_0x3987('0x51')](_0x5ba3c8) {
        var _0x2af8da;
        _0x2af8da = NetPartyManager[_0x3987('0xe')](_0x5ba3c8[_0x3987('0x3d')]);
        if (_0x2af8da == null) {
            return;
        }
        Network[_0x3987('0xc')][_0x3987('0xf')](_0x2af8da, _0x5ba3c8[_0x3987('0x10')]);
    }
    static [_0x3987('0x52')](_0x95b50e) {
        return NetWorldManager[_0x3987('0x53')](_0x95b50e[_0x3987('0x10')]);
    }
    static [_0x3987('0x54')](_0xa21438) {
        var _0x230d7d, _0x52b0d3;
        _0x230d7d = _0xa21438['data'];
        try {
            return NetWorldManager[_0x3987('0x55')](_0x230d7d);
        } catch (_0x2a26e6) {
            if ('xMKNf' !== _0x3987('0x56')) {
                _0x52b0d3 = _0x2a26e6;
                return Network[_0x3987('0x3e')](_0x52b0d3, _0x3987('0x57'));
            } else {
                return Network['stopServer']();
            }
        }
    }
    static [_0x3987('0x58')](_0x2587f8) {
        var _0x2a6fa0, _0x45b3eb;
        try {
            if (Network[_0x3987('0x59')]()) {
                _0x2a6fa0 = NetPartyManager[_0x3987('0xe')](_0x2587f8[_0x3987('0x3d')]);
                return Network[_0x3987('0xc')][_0x3987('0x5a')](_0x2a6fa0, _0x2587f8[_0x3987('0x10')]);
            }
        } catch (_0x387eef) {
            if (_0x3987('0x5b') !== _0x3987('0x5b')) {
                playerOne = NetPartyManager[_0x3987('0x5c')](_0x2587f8[_0x3987('0x3d')]);
                playerTwo = NetPartyManager['getPlayerByIndex'](_0x2587f8[_0x3987('0x10')]);
                client = ServerManager[_0x3987('0x5d')](_0x2587f8[_0x3987('0x3d')]);
                client2 = ServerManager[_0x3987('0x5d')](playerTwo['id']);
                if (client && client2) {
                    NetMessage[_0x3987('0x5e')](client)[_0x3987('0x15')](playerTwo[_0x3987('0x3c')]);
                    return NetMessage['StartPvPBattle'](client2)[_0x3987('0x15')](playerOne['actorId']);
                } else {
                }
            } else {
                _0x45b3eb = _0x387eef;
                return Network[_0x3987('0x3e')](_0x45b3eb, 'While\x20try\x20save\x20another\x20actor\x20data');
            }
        }
    }
    static [_0x3987('0x5f')](_0xe134a0) {
        var _0x4e0069, _0x27c253, _0x466b55, _0x47de5a;
        try {
            ServerManager[_0x3987('0x3')][_0xe134a0[_0x3987('0x3d')]] = _0xe134a0[_0x3987('0x10')];
            _0x47de5a = null;
            Network['players'][_0x3987('0x60')](function (_0x1137df) {
                if ('dyFFG' === 'WcfpG') {
                    'REGISTER\x20HOST'['p']();
                    NetPartyManager['registerNewPlayer'](_0x4e0069['id']);
                    Network[_0x3987('0x7')] = Network[_0x3987('0x8')][_0x3987('0x61')]();
                    Network[_0x3987('0x7')][_0x3987('0x9')] = $gameMap[_0x3987('0x9')]();
                    ServerManager[_0x3987('0x4')][$gameMap[_0x3987('0x9')]()] = _0x4e0069['id'];
                    Network[_0x3987('0xa')] = !![];
                    if (Network['sessionData'] === null) {
                        return Network[_0x3987('0xc')] = new AlphaNET['LIBS'][(_0x3987('0x62'))]();
                    }
                } else {
                    if (_0x1137df[_0x3987('0x9')] === _0xe134a0[_0x3987('0x10')] && _0x1137df['id'] !== _0xe134a0[_0x3987('0x3d')]) {
                        if (_0x3987('0x63') !== 'CHVqs') {
                            return;
                        } else {
                            return _0x47de5a = _0x1137df['id'];
                        }
                    }
                }
            });
            if (_0x47de5a != null) {
                if ('hfnhj' !== 'cFbCq') {
                    _0x3987('0x64')['p']();
                    _0x4e0069 = ServerManager[_0x3987('0x5d')](_0x47de5a);
                    if (_0x4e0069 != null) {
                        if (_0x3987('0x65') !== 'fzHdX') {
                            return NetMessage['RequestGameMapEventsData'](_0x4e0069)[_0x3987('0x15')](_0xe134a0['data']);
                        } else {
                            var _0x26727c, _0x40c12d;
                            _0x40c12d = NetPartyManager[_0x3987('0x66')](id);
                            _0x26727c = ServerManager[_0x3987('0x5d')](_0x40c12d['id']);
                            return _0x26727c;
                        }
                    }
                } else {
                    ServerManager['mapUpdateWaitPool'][clientId] = null;
                    NetMessage[_0x3987('0x67')](_0x4e0069)[_0x3987('0x15')](data);
                }
            } else {
                _0x466b55 = {
                    'mapId': _0xe134a0[_0x3987('0x10')],
                    'mapData': []
                };
                return ServerManager[_0x3987('0x68')](_0xe134a0[_0x3987('0x3d')], _0x466b55);
            }
        } catch (_0xb256eb) {
            _0x27c253 = _0xb256eb;
            return Network['error'](_0x27c253, _0x3987('0x69'));
        }
    }
    static [_0x3987('0x5d')](_0x5beba9) {
        return ServerManager['_netServer'][_0x3987('0x6a')](_0x5beba9);
    }
    static [_0x3987('0x6b')](_0x50a784) {
        var _0x30ed14, _0x205a7e, _0x2f4769, _0x588b65;
        try {
            if (_0x3987('0x6c') !== _0x3987('0x6d')) {
                _0x2f4769 = _0x50a784[_0x3987('0x10')][_0x3987('0x9')];
                _0x588b65 = null;
                for (_0x205a7e in ServerManager[_0x3987('0x3')]) {
                    if ('fxEwg' === _0x3987('0x6e')) {
                        client = _getClient(data[_0x3987('0x6f')]);
                        NetMessage[_0x3987('0x70')](client)[_0x3987('0x15')](data);
                        return;
                    } else {
                        if (ServerManager['mapUpdateWaitPool'][_0x205a7e] === _0x2f4769) {
                            if (_0x3987('0x71') === _0x3987('0x71')) {
                                _0x588b65 = _0x205a7e;
                                break;
                            } else {
                                var _0x26de57, _0x3dd634;
                                try {
                                    if (Network[_0x3987('0x59')]()) {
                                        _0x26de57 = NetPartyManager[_0x3987('0xe')](_0x50a784['from']);
                                        return Network['sessionData']['setPlayerItemsData'](_0x26de57, _0x50a784['data']);
                                    }
                                } catch (_0x4aca2f) {
                                    _0x3dd634 = _0x4aca2f;
                                    return Network[_0x3987('0x3e')](_0x3dd634, 'While\x20try\x20save\x20another\x20actor\x20data');
                                }
                            }
                        }
                    }
                }
                if (_0x588b65 != null) {
                    if (_0x3987('0x72') === 'WyvHo') {
                        ServerManager['CreateEventPool'](_0x50a784[_0x3987('0x10')][_0x3987('0x18')]);
                    } else {
                        return ServerManager['_SendMapDataResponseToClient'](_0x588b65, _0x50a784[_0x3987('0x10')]);
                    }
                }
            } else {
                NetPartyManager[_0x3987('0x6')](client['id']);
                NetMessage['PlayersTableResponse'](ServerManager[_0x3987('0x1e')])[_0x3987('0x15')](Network['players']);
                NetMessage['PlayerConnect'](client)['broadcast']();
                newPlayerActorId = NetPartyManager[_0x3987('0xe')](client['id']);
                if (Network[_0x3987('0xc')][_0x3987('0x21')](newPlayerActorId)) {
                    worldData = Network['sessionData'][_0x3987('0x22')](newPlayerActorId);
                    NetMessage['PlayerWorldData'](client)[_0x3987('0x15')](worldData);
                }
                if (!Network['isMultiMode']()) {
                    ServerManager[_0x3987('0x26')](client);
                }
                global = Network[_0x3987('0xc')][_0x3987('0x27')]()[_0x3987('0x28')]();
                return NetMessage[_0x3987('0x29')](client)[_0x3987('0x15')](global);
            }
        } catch (_0x2a2f6f) {
            _0x30ed14 = _0x2a2f6f;
            return Network['error'](_0x30ed14, _0x3987('0x73'));
        }
    }
    static [_0x3987('0x68')](_0x59ab3a, _0x18cd6a) {
        var _0x5d26eb;
        _0x5d26eb = ServerManager[_0x3987('0x5d')](_0x59ab3a);
        if (_0x5d26eb != null) {
            ServerManager[_0x3987('0x3')][_0x59ab3a] = null;
            NetMessage['GameMapEventsDataResponse'](_0x5d26eb)[_0x3987('0x15')](_0x18cd6a);
        }
    }
    static [_0x3987('0x74')](_0x49153b) {
        var _0x20372b, _0x5d9029, _0x114a32;
        try {
            if (!Network[_0x3987('0x24')]()) {
                if ('hZxYI' !== _0x3987('0x75')) {
                    Network['error']('', 'RegisterOnSharedEvent');
                    _0x3987('0x3f')['p']();
                    return ServerManager['_netServer'][_0x3987('0x40')](_0x49153b[_0x3987('0x3d')], -0x64);
                } else {
                    return;
                }
            }
            ServerManager['_CheckExistsOwner'](_0x49153b[_0x3987('0x3d')]);
            _0x114a32 = _0x49153b[_0x3987('0x10')];
            if (ServerManager['mapOwnerPool'][_0x114a32] == null) {
                if (_0x3987('0x76') !== _0x3987('0x77')) {
                    ServerManager['mapOwnerPool'][_0x114a32] = _0x49153b[_0x3987('0x3d')];
                    _0x20372b = ServerManager[_0x3987('0x5d')](_0x49153b[_0x3987('0x3d')]);
                    if (_0x20372b != null) {
                        NetMessage[_0x3987('0x78')](_0x20372b)[_0x3987('0x15')]();
                    }
                } else {
                    return ServerManager[_0x3987('0x2d')][_0x3987('0x6a')](id);
                }
            }
        } catch (_0x12ef8f) {
            _0x5d9029 = _0x12ef8f;
            return Network[_0x3987('0x3e')](_0x5d9029, _0x3987('0x74'));
        }
    }
    static ['_CheckExistsOwner'](_0x30872f) {
        var _0xf49588, _0x3ea68c, _0x8c5f95, _0x13e836;
        if (!Network[_0x3987('0x24')]()) {
            if ('LQvIJ' === _0x3987('0x79')) {
                return;
            } else {
                _0xf49588 = _getClient(data[_0x3987('0x7a')]);
                NetMessage['BattleManagerPvP'](_0xf49588)['send'](data);
                return;
            }
        }
        _0x13e836 = null;
        _0x8c5f95 = 0x0;
        for (_0x3ea68c in ServerManager['mapOwnerPool']) {
            if (ServerManager[_0x3987('0x4')][_0x3ea68c] === _0x30872f) {
                _0x13e836 = Network[_0x3987('0x8')][_0x3987('0x7b')](function (_0x191969) {
                    if (_0x3987('0x7c') !== _0x3987('0x7c')) {
                        emptyData = {
                            'mapId': networkData[_0x3987('0x10')],
                            'mapData': []
                        };
                        return ServerManager[_0x3987('0x68')](networkData[_0x3987('0x3d')], emptyData);
                    } else {
                        if (_0x191969['mapId'] === Number(_0x3ea68c)) {
                            return _0x191969;
                        }
                    }
                });
                if (_0x13e836 != null) {
                    _0x8c5f95 = _0x3ea68c;
                    break;
                } else {
                    ServerManager[_0x3987('0x4')][_0x3ea68c] = null;
                    _0x3987('0x7d')['p']();
                }
            }
        }
        if (_0x13e836 != null) {
            ServerManager[_0x3987('0x4')][_0x8c5f95] = _0x13e836['id'];
            _0xf49588 = ServerManager[_0x3987('0x5d')](_0x13e836['id']);
            if (_0xf49588 != null) {
                NetMessage['SetOwner'](_0xf49588)[_0x3987('0x15')]();
            }
            return _0x3987('0x7e')['p']();
        }
    }
    static [_0x3987('0x7f')](_0x5d8858) {
        var _0x438467, _0x37bd29, _0x5a6bf8, _0x494927, _0x242fa9;
        try {
            _0x494927 = NetPartyManager[_0x3987('0x5c')](_0x5d8858['from']);
            _0x242fa9 = NetPartyManager[_0x3987('0x80')](_0x5d8858['data']);
            _0x438467 = ServerManager[_0x3987('0x5d')](_0x5d8858[_0x3987('0x3d')]);
            _0x37bd29 = ServerManager[_0x3987('0x5d')](_0x242fa9['id']);
            if (_0x438467 && _0x37bd29) {
                NetMessage[_0x3987('0x5e')](_0x438467)[_0x3987('0x15')](_0x242fa9[_0x3987('0x3c')]);
                return NetMessage[_0x3987('0x5e')](_0x37bd29)[_0x3987('0x15')](_0x494927[_0x3987('0x3c')]);
            } else {
            }
        } catch (_0x289f81) {
            _0x5a6bf8 = _0x289f81;
            return Network[_0x3987('0x3e')](_0x5a6bf8, _0x3987('0x81'));
        }
    }
    static [_0x3987('0x82')](_0x2a8ce0) {
        var _0x4aa3e4, _0x32f1fe, _0x33cae0, _0x364a0f, _0xe59809;
        try {
            if (_0x3987('0x83') === _0x3987('0x83')) {
                _0x364a0f = NetPartyManager[_0x3987('0x5c')](_0x2a8ce0[_0x3987('0x3d')]);
                _0xe59809 = NetPartyManager[_0x3987('0x80')](_0x2a8ce0[_0x3987('0x10')]);
                _0x4aa3e4 = ServerManager['_GetClientById'](_0x2a8ce0[_0x3987('0x3d')]);
                _0x32f1fe = ServerManager['_GetClientById'](_0xe59809['id']);
                if (_0x4aa3e4 && _0x32f1fe) {
                    NetMessage[_0x3987('0x84')](_0x4aa3e4)[_0x3987('0x15')](_0xe59809[_0x3987('0x3c')]);
                    return NetMessage[_0x3987('0x84')](_0x32f1fe)['send'](_0x364a0f['actorId']);
                }
            } else {
                return this['eventWaitPool'] != null;
            }
        } catch (_0x706d40) {
            _0x33cae0 = _0x706d40;
            return Network['error'](_0x33cae0, _0x3987('0x82'));
        }
    }
    static ['OnBattleManagerPvPCommand'](_0x1d3ca9) {
        var _0x465190, _0x5c96c8, _0x38bb74, _0x2a0f7d, _0x9d2946;
        try {
            _0x465190 = function (_0x5c7f5f) {
                var _0x5c96c8, _0x3c8ddd;
                _0x3c8ddd = NetPartyManager[_0x3987('0x66')](_0x5c7f5f);
                _0x5c96c8 = ServerManager['_GetClientById'](_0x3c8ddd['id']);
                return _0x5c96c8;
            };
            _0x2a0f7d = _0x1d3ca9[_0x3987('0x10')];
            _0x38bb74 = _0x2a0f7d['id'];
            _0x3987('0x85')['p'](_0x38bb74);
            if (_0x38bb74 === _0x3987('0x86')) {
                _0x5c96c8 = _0x465190(_0x2a0f7d[_0x3987('0x6f')]);
                NetMessage[_0x3987('0x70')](_0x5c96c8)[_0x3987('0x15')](_0x2a0f7d);
                return;
            }
            if (_0x38bb74 === 'startTurnPvP') {
                _0x5c96c8 = _0x465190(_0x2a0f7d['whoStart']);
                NetMessage['BattleManagerPvP'](_0x5c96c8)['send'](_0x2a0f7d);
                return;
            }
            if (_0x38bb74 === _0x3987('0x87')) {
                _0x5c96c8 = _0x465190(_0x2a0f7d[_0x3987('0x6f')]);
                NetMessage['BattleManagerPvP'](_0x5c96c8)[_0x3987('0x15')](_0x2a0f7d);
                return;
            }
            if (_0x38bb74 === _0x3987('0x88')) {
                _0x5c96c8 = _0x465190(_0x2a0f7d[_0x3987('0x6f')]);
                NetMessage['BattleManagerPvP'](_0x5c96c8)[_0x3987('0x15')](_0x2a0f7d);
                return;
            }
            if (_0x38bb74 === 'endActionPvP') {
                _0x5c96c8 = _0x465190(_0x2a0f7d[_0x3987('0x6f')]);
                NetMessage[_0x3987('0x70')](_0x5c96c8)[_0x3987('0x15')](_0x2a0f7d);
            }
        } catch (_0xaf4760) {
            if (_0x3987('0x89') === _0x3987('0x89')) {
                _0x9d2946 = _0xaf4760;
                return Network[_0x3987('0x3e')](_0x9d2946, _0x3987('0x8a'));
            } else {
                if (_0x5c96c8['id'] === ServerManager[_0x3987('0x2d')][_0x3987('0x2e')]['id']) {
                    return Network[_0x3987('0x31')]();
                } else {
                    ServerManager[_0x3987('0x8b')](_0x5c96c8['id']);
                    return NetMessage[_0x3987('0x32')](_0x5c96c8)[_0x3987('0x33')](_0x5c96c8['id'])[_0x3987('0x20')]();
                }
            }
        }
    }
};
AlphaNET[_0x3987('0x8c')](ServerManager);
})();

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AASprite.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Расширение - методы быстрого доступа к рисованию
var AASprite;

AASprite = class AASprite extends Sprite {
  constructor() {
    super(...arguments);
  }

  b() {
    return this.bitmap;
  }

  clear() {
    return this.bitmap.clear();
  }

  bNew(w, h) {
    if (h == null) {
      h = w;
    }
    return this.bitmap = new Bitmap(w, h);
  }

  bImg(filename) {
    return this.bitmap = ImageManager.loadNetwork(filename);
  }

  onReady(method) {
    if (method != null) {
      return this.bitmap.addLoadListener(method);
    }
  }

  fillAll(c) {
    return this.bitmap.fillAll(c);
  }

  add(child) {
    return this.addChild(child);
  }

  drawText() {
    return this.bitmap.drawText(...arguments);
  }

  drawTextFull(text, position) {
    return this.bitmap.drawTextFull(text, position);
  }

  drawIcon() {
    return this.bitmap.drawIcon(...arguments);
  }

  moveByJson(settings) {
    var pos;
    pos = ANET.Utils.getPositionPointFromJSON(settings);
    return this.move(pos.x, pos.y);
  }

  applyTextSettingsByJson(sprite, settings) {
    this.applyTextSettingsByExtraSettings(sprite, settings.text);
  }

  applyTextSettingsByExtraSettings(sprite, s) {
    sprite.move(s.marginX, s.marginY);
    sprite.b().fontSize = s.fontSize;
    sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
    sprite.b().outlineWidth = s.outlineWidth;
    if (s.outlineColor != null) {
      sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
    }
    if ((s.fontFace != null) && AlphaNET.isUseFonts()) {
      sprite.b().fontFace = s.fontFace;
    }
    sprite.b().fontItalic = s.fontItalic;
    sprite.visible = s.visible;
  }

  setGlowFilter(color, power = 0.8) { //color is 16 number, like 0xF00080
    if (PIXI.filters == null) {
      return;
    }
    return this.filters = [new PIXI.filters.GlowFilter(2, power, 0, color, 0.5)];
  }

  setOutlineFilter(color, power = 0.8) {
    if (PIXI.filters == null) {
      return;
    }
    return this.filters = [new PIXI.filters.OutlineFilter(power, color, 0.5)];
  }

  clearFilters() {
    return this.filters = [];
  }

  // * Не работает Push команда, это не массив?
  //_addNewFilter: (f) -> if @filters? then @filters.push(f) else @filters = [f]
  inPosition(point) {
    var rect, rx, ry;
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = new Rectangle(rx, ry, this.width, this.height);
    return ANET.Utils.Math.inRect(point, rect);
  }

  isReady() {
    var i, j, ref;
    if (this.bitmap != null) {
      if (!this.bitmap.isReady()) {
        return false;
      }
    }
    for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      if (!this.children[i].bitmap.isReady()) {
        return false;
      }
    }
    return true;
  }

  static FromImg(filename) {
    var s;
    s = new AASprite();
    s.bImg(filename);
    return s;
  }

  static FromBitmap(w, h) {
    var s;
    s = new AASprite();
    s.bNew(w, h);
    return s;
  }

};

// ■ END AASprite.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AATimer.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * Time in FRAMES
var AATimer;

AATimer = class AATimer {
  constructor(maxValue1 = 0, value1 = 0) {
    this.maxValue = maxValue1;
    this.value = value1;
  }

  update() {
    if (!this.isReady()) {
      return this.value++;
    }
  }

  isReady() {
    return this.value >= this.maxValue;
  }

  start(maxValue) {
    this.reset();
    return this.maxValue = Math.abs(Math.round(maxValue));
  }

  reset() {
    return this.value = 0;
  }

  getSeconds() {
    return AATimer.ConvertFramesToSeconds(this.value);
  }

  getMaxSeconds() {
    return AATimer.ConvertFramesToSeconds(this.maxValue);
  }

  static ConvertFramesToSeconds(value) {
    return Math.round((value / 60) * 10) / 10;
  }

};

// ■ END AATimer.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Alpha NET JSON Settings.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var ANJsonSettings;

ANJsonSettings = function() {
  throw new Error('This is a static class');
};

(function() {
  var _;
  //@[DEFINES]
  _ = ANJsonSettings;
  _.ChatSettings = 'ChatSettings';
  _.CharNameplate = 'CharNameplate';
  _.TradeWindowSettings = 'TradeWindowSettings';
  _.ActorActionMenuSettings = 'ActorActionMenuSettings';
  _.KeyBinding = 'KeyBinding';
  _._FILES = [_.CharNameplate, _.ChatSettings, _.TradeWindowSettings, _.ActorActionMenuSettings, _.KeyBinding];
  //@[PUBLIC]
  //@[=====================================================================]
  _.InitAndLoad = function() {
    var i, j, ref, results;
    this.data = {};
    results = [];
    for (i = j = 0, ref = _._FILES.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      results.push(_._loadAAJSONFile(_._FILES[i]));
    }
    return results;
  };
  _.getNamePlateDataForId = function(id) {
    return this.data[_.CharNameplate][id];
  };
  _.getChatSettings = function() {
    return this.data[_.ChatSettings];
  };
  _.getTradeWindowSettings = function() {
    return this.data[_.TradeWindowSettings];
  };
  _.getActorActionMenuSettings = function() {
    return this.data[_.ActorActionMenuSettings];
  };
  // * Надо загружать через другой метод
  _.getKeyBinding = function() {
    return this.data[_.KeyBinding];
  };
  //@[PRIVATE]
  //@[=====================================================================]
  _._loadAAJSONFile = function(name) {
    var src, url, xhr;
    xhr = new XMLHttpRequest();
    src = name + '.json';
    url = 'data/ANET/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
      var data, e, message;
      if (xhr.status < 400) {
        try {
          data = JSON.parse(xhr.responseText);
        } catch (error) {
          e = error;
          ANET.criticalError(e, "Error in JSON file " + src);
          return;
        }
        ANJsonSettings._loadJSONData(name, data);
        if (name === _.KeyBinding) {
          return ANJsonSettings._loadKeyBinding();
        }
      } else {
        message = url + " not found!";
        return ANET.criticalError(new Error(message), message);
      }
    };
    xhr.send();
  };
  _._loadJSONData = function(name, settings) {
    return this.data[name] = settings;
  };
  _._getSettingsById = function(id, name) {
    var result;
    result = this.data[_[name]].find(function(i) {
      return i.id === id;
    });
    if (result != null) {
      return result;
    }
    return ANET.criticalError(new Error('ID not found!'), id + ' not found in ' + name + '.json');
  };
  _._loadKeyBinding = function() {
    var db, keys;
    ANET.KEYS.loadDefaultKeyConfig();
    keys = [];
    db = _.getKeyBinding()[0].chat;
    keys[0] = db.inOutChatWindow;
    keys[1] = db.sayToChat;
    keys[2] = db.trade;
    keys[3] = db.pvp;
    return ANET.KEYS.loadKeyConfig(keys);
  };
})();

// ■ END Alpha NET JSON Settings.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

(function () {
    //@[DEFINES]
    var _ = BattleManager;

    //@[ALIAS]
    var _alias__startBattle = _.startBattle;
    _.startBattle = function () {
        _alias__startBattle.call(this, ...arguments);
        if (BattleManager.isNetworkBattleServer())
            $gameParty.refreshForNetwork();
        if(BattleManager.isNetworkBattlePvP()) {
            BattleManager._battlersMakeTurns = 0;
            BattleManager._battlersMakeInput = 0;
        }
    };

    //@[ALIAS]
    var _alias__isBusy = _.isBusy;
    _.isBusy = function () {
        var result = _alias__isBusy.call(this, ...arguments);
        return result || Network.isBusy();
    };

    //@[ALIAS]
    var _alias__updateTurn = _.updateTurn;
    _.updateTurn = function () {
        if(BattleManager.isNetworkBattlePvP()) {
            $gameParty.requestMotionRefresh();
        } else {
            if (!BattleManager.isNetworkBattle()) {
                _alias__updateTurn.call(this, ...arguments);
                return;
            }
            if (BattleManager.isNetworkBattleServer()) {
                // * Только на сервере происходит обновление хода
                _alias__updateTurn.call(this, ...arguments);
            } else
                $gameParty.requestMotionRefresh();
        }
    };

    //@[ALIAS]
    var _alias__startTurn = _.startTurn;
    _.startTurn = function () {
        if(BattleManager.isNetworkBattlePvP()) {
            this._phase = 'turn';
            this.clearActor();
            $gameTroop.increaseTurn();
            $gameParty.requestMotionRefresh();
            this._logWindow.startTurn();
            this._startTurnPvP();
        } else {
            _alias__startTurn.call(this, ...arguments);
            if (BattleManager.isNetworkBattleServer()) {
                this._sendBattleOrderToNetwork();
            }
        }
    };

    //@[ALIAS]
    var _alias__setup = _.setup;
    _.setup = function () {
        if (Network.isConnected())
            Network._inBattle = true;
        _alias__setup.call(this, ...arguments);
        if(BattleManager.isNetworkBattleServer()) {
            this._sendTroopNetworkIds();
        }
    };

    //@[ALIAS]
    var _alias__endAction = _.endAction;
    _.endAction = function () {
        _alias__endAction.call(this, ...arguments);
        if(BattleManager.isNetworkBattleServer()) {
            this._sendActionEndToNetwork();
        }
        if(BattleManager.isNetworkBattlePvP()){
            this._sendEndActionPvPToServer();
        }
    };

    //@[ALIAS]
    var _alias__endTurn = _.endTurn;
    _.endTurn = function () {
        if (BattleManager.isNetworkBattleServer()) {
            this._sendTurnEndToNetwork();
        }
        _alias__endTurn.call(this, ...arguments);
        if (BattleManager.isNetworkBattle())
            BattleManager.syncNet();
    };

    // * Данный метод работает только на сервере
    //@[ALIAS]
    var _alias__processTurn = _.processTurn;
    _.processTurn = function () { 
        if(BattleManager.isNetworkBattlePvP()) {
            var subject = this._subject;
            var action = subject.currentAction();
            _alias__processTurn.call(this, ...arguments);
            if(!action) {
                BattleManager._battlersMakeTurns++;
                //"ON ALL END".p();
                BattleManager._checkTurnEndPvP();
            }
            //BattleManager._processTurnPvP();
            return;
        }
        if (!BattleManager.isNetworkBattle()) {
            _alias__processTurn.call(this, ...arguments);
            return;
        }
        if(BattleManager.isNetworkBattleServer()) {
            var subject = this._subject;
            var action = subject.currentAction();
            _alias__processTurn.call(this, ...arguments);
            if (!action) {
                this._sendProcessTurnToNetwork(subject);
            }
        }
    };

    // * Данный метод работает только на сервере (от processTurn)
    //@[ALIAS]
    var _alias__startAction = _.startAction;
    _.startAction = function () {
        if (BattleManager.isNetworkBattlePvP()) {
            _alias__startAction.call(this, ...arguments);
            BattleManager._sendStartActionPvPToNetwork();
            return;
        }
        if (!BattleManager.isNetworkBattle()) {
            _alias__startAction.call(this, ...arguments);
            return;
        }
        if (BattleManager.isNetworkBattleServer()) {
            _alias__startAction.call(this, ...arguments);
            this._sendStartActionToNetwork(this._targets);
        }
    };

    //TODO: Временно!
    // * Временно отключил его для сети
    //@[ALIAS]
    var _alias__displayStartMessages = _.displayStartMessages;
    _.displayStartMessages = function () {
        if(BattleManager.isNetworkBattle()) {
            return;
        }
        _alias__displayStartMessages.call(this, ...arguments);  
    };

    // * Данный метод работает только на сервере (от startAction)
    //@[ALIAS]
    var _alias__invokeNormalAction = _.invokeNormalAction;
    _.invokeNormalAction = function (subject, target) {
        if(BattleManager.isNetworkBattlePvP()){
            BattleManager._invokeNormalActionPvP(subject, target);
            return;
        }
        if (BattleManager.isNetworkBattle()) {
            var realTarget = this.applySubstitute(target);
            _alias__invokeNormalAction.call(this, ...arguments);
            $gameParty.refreshForNetwork();
            if(BattleManager.isNetworkBattleServer()) {
                this._sendInvokeNormalToNetwork(subject, realTarget);
            }
        } else {
            _alias__invokeNormalAction.call(this, ...arguments);
        }
    };

    //TODO: invokeCounterAttack
    // * Данный метод работает только на сервере (от startAction)
    //@[ALIAS]
    var _alias__invokeCounterAttack = _.invokeCounterAttack;
    _.invokeCounterAttack = function (subject, target) {
        if (!BattleManager.isNetworkBattle()) {
            _alias__invokeCounterAttack.call(this, ...arguments);
            return;
        }
        // * Пока Counter Attack не реализована, обычная  NormalAction
        if (BattleManager.isNetworkBattleServer()) {
            this.invokeNormalAction(subject, target);
        }
    };

    //TODO: invokeMagicReflection
    // * Данный метод работает только на сервере (от startAction)
    //@[ALIAS]
    var _alias__invokeMagicReflection = _.invokeMagicReflection;
    _.invokeMagicReflection = function (subject, target) {
        if (!BattleManager.isNetworkBattle()) {
            _alias__invokeMagicReflection.call(this, ...arguments);
            return;
        }
        // * Пока Magic Reflection не реализована, обычная  NormalAction
        if (BattleManager.isNetworkBattleServer()) {
            this.invokeNormalAction(subject, target);
        }
    };

    //@[ALIAS]
    BattleManager._alias__selectNextCommand = _.selectNextCommand;
    _.selectNextCommand = function () {
        if (!BattleManager.isNetworkBattle()) {
            this._alias__selectNextCommand.call(this, ...arguments);
            return;
        }
        this._selectInputCommandNetwork('next');
    };

    //@[ALIAS]
    BattleManager._alias__selectPreviousCommand = _.selectPreviousCommand;
    _.selectPreviousCommand = function () {
        if (!BattleManager.isNetworkBattle()) {
            this._alias__selectPreviousCommand.call(this, ...arguments);
            return;
        }
        this._selectInputCommandNetwork('prev');
    };


    //@[ALIAS]
    var _alias__endBattle = _.endBattle;
    _.endBattle = function (result) {
        if(BattleManager.isNetworkBattlePvP()) {
            Network.clearPvPBattleWithResult(result);
            _alias__endBattle.call(this, ...arguments);
            return;
        }
        if (BattleManager.isNetworkBattle()) {
            BattleManager.syncNet();
            _alias__endBattle.call(this, ...arguments);
        } else {
            _alias__endBattle.call(this, ...arguments);
        }
    };

    // * Данный метод работает только на сервере
    //@[ALIAS]
    var _alias__checkBattleEnd = _.checkBattleEnd;
    _.checkBattleEnd = function () {
        if (BattleManager.isNetworkBattle()) {
            if (BattleManager.isNetworkBattleServer()) {
                return _alias__checkBattleEnd.call(this, ...arguments);
            } else {
                return false;
            }
        } else 
            return _alias__checkBattleEnd.call(this, ...arguments);
    };

    // * Данный метод работает только на сервере (из checkBattleEnd)
    //@[ALIAS]
    var _alias__checkAbort = _.checkAbort;
    _.checkAbort = function () {
        if (BattleManager.isNetworkBattle()) {
            if ($gameParty.isEmpty() || this.isAborting()) {
                SoundManager.playEscape();
                this._escaped = true;
                this._sendAbortBattleToNetwork();
                this.processAbort();
            }
            return false;
        } else {
            return _alias__checkAbort.call(this);
        }
    };

    // * Данный метод работает только на сервере (из checkBattleEnd)
    //@[ALIAS]
    var _alias__processVictory = _.processVictory;
    _.processVictory = function () {
        if (BattleManager.isNetworkBattleServer()) {
            this._sendVictoryToNetwork();
        }
        _alias__processVictory.call(this, ...arguments);
    };

    // * Данный метод работает только на сервере (из checkBattleEnd)
    //@[ALIAS]
    var _alias__processDefeat = _.processDefeat;
    _.processDefeat = function () {
        if (BattleManager.isNetworkBattleServer()) {
            this._sendDefeatToNetwork();
        }
        _alias__processDefeat.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias__processEscape = _.processEscape;
    _.processEscape = function () {
        if (BattleManager.isNetworkBattle()) {
            return _alias__processEscape.call(this, ...arguments);
        } else {
            if (BattleManager.isNetworkBattleServer()) {
                var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
                this._sendEscapeToNetwork(success);
                this._onEscapeFromNetwork(success); // * Логика вынесена отдельно для севрера и клиента
                return success;
            }
            return false;
        }
    };

    //@[ALIAS]
    var _alias__invokeAction = _.invokeAction;
    _.invokeAction = function (subject, target) {
        if(BattleManager.isNetworkBattlePvP()) {
            BattleManager._invokeActionPvP(subject, target);
        } else
            _alias__invokeAction.call(this, subject, target);
    };

})();

// ■ END BattleManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[NEW]
BattleManager.setupPvPBattle = function (enemyActorId) {
    this.initMembers();
    this._canEscape = false;
    this._canLose = true;
    $gameTroop.setupPvPBattle(enemyActorId);
    $gameScreen.onBattleStart();
    this.makeEscapeRatio();
    Network._inPvPBattle = true;
    Network._lastPvPResult = -1;
};

//?[NEW]
BattleManager.isNetworkBattlePvP = function () {
    if (Network.isConnected() && Network.isMultiMode() && Network.inPvPBattle()) {
        return true;
    }
    return false;
};

//?[NEW]
BattleManager.isNetworkBattlePvPServer = function () {
    return BattleManager.isNetworkBattlePvP() && Network.isPvPBattleServer();
};

//?[NEW]
BattleManager.isNetworkBattle = function () {
    if(Network.isMultiMode()) {
        return false;
    } else
        return Network.isConnected() && Network.inBattle();
};

//?[NEW]
BattleManager.isNetworkBattleServer = function () {
    return BattleManager.isNetworkBattle() && Network.isHost();
};

//?[NEW]
BattleManager.convertBattlersToIds = function (arrayOfBattlers) {
    return arrayOfBattlers.map(item => {
        return BattleManager.getIdByBattleSubject(item);
    });
};

//?[NEW]
BattleManager.convertIdsToBattlers = function (arrayOfIds) {
    return arrayOfIds.map(item => {
        return BattleManager.getBattleSubjectById(item);
    });
};

//?[NEW]
BattleManager.getBattleSubjectById = function (id) {
    if(BattleManager.isNetworkBattlePvP()) {
        if(id == $gameParty.leader().actorId()) {
            return $gameParty.leader();
        } else {
            return $gameTroop.rival();
        }
    } else {
        if (id < 900)
            return $gameParty.memberByActorId(id);
        else
            return $gameTroop.getEnemyByNetId(id);
    }
};

//?[NEW]
BattleManager.getIdByBattleSubject = function (subject) {
    if (subject == null)
        subject = this._subject;
    if (subject.isActor()) {
        return subject.actorId();
    } else {
        return subject.uniqueNetworkId();
    }
};

//?[NEW]
BattleManager.isMyActorInput = function () {
    if (!BattleManager.isNetworkBattle()) return true;
    var myIndex = $gameParty.memberIndexByActorId(NetPartyManager.getMyActorId());
    return myIndex == this._actorIndex;
};

//?[NEW]
BattleManager.syncNet = function () {
    if (BattleManager.isNetworkBattle()) {
        Network.requestSync();
    }
};

//?[NEW]
BattleManager._processTurnFromNetwork = function (subjectId) {
    try {
        var subject = this.getBattleSubjectById(subjectId);
        subject.onAllActionsEnd();
        this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(subject);
        this._logWindow.displayCurrentState(subject);
        this._logWindow.displayRegeneration(subject);
    } catch (error) {
        AlphaNET.error(error, ' processTurnFromNetwork');
    }
};

//?[NEW]
BattleManager._startActionFromNetwork = function (targets) {
    this._startActionFromNetworkDefault(targets);
};

//?[NEW]
BattleManager._startActionFromNetworkDefault = function (targets) {
    try {
        this._subject = this.getNextSubject();
        if (this._subject == null) {
            return;
        }
        this._action = this._subject.currentAction();
        this._subject.useItem(this._action.item());
        this.refreshStatus();
        this._action.applyGlobal();
        this._targets = this.convertIdsToBattlers(targets);
    } catch (error) {
        AlphaNET.error(error, ' startActionFromNetwork  : DEFAULT');
        return;
    }
    if (this._targets.length > 0) {
        try {
            this._logWindow.startAction(this._subject, this._action, this._targets);
        } catch (error) {
            console.error(error);
        }
    }
};

//?[NEW]
BattleManager._selectInputCommandFromNetwork = function (commnadName) {
    try {
        if (commnadName == 'next')
            this._alias__selectNextCommand.call(this);
        else
            this._alias__selectPreviousCommand.call(this);
    } catch (error) {
        AlphaNET.error(error, ' _selectInputCommandFromNetwork');
        this._alias__selectNextCommand.call(this);
    }
};

//?[NEW]
BattleManager._invokeNormalActionFromNetwork = function (subjectId, targetId) {
    try {
        var subject = this.getBattleSubjectById(subjectId);
        var target = this.getBattleSubjectById(targetId);
        this._logWindow.displayActionResults(subject, target);
    } catch (error) {
        AlphaNET.error(error, 'invokeNormalActionFromNetwork');
    }
};

//?[NEW]
BattleManager._abortBattleCommandFromNetwork = function () {
    SoundManager.playEscape();
    this._escaped = true;
    this.processAbort();
};

//?[NEW]
BattleManager._onEscapeFromNetwork = function (success) {
    $gameParty.performEscape();
    SoundManager.playEscape();
    if (success) {
        this.displayEscapeSuccessMessage();
        this._escaped = true;
        this.processAbort();
    } else {
        this.displayEscapeFailureMessage();
        this._escapeRatio += 0.1;
        $gameParty.clearActions();
        this.startTurn();
    }
};

//?[NEW]
BattleManager._sendBattleOrderToNetwork = function () {
    var orderData = this.convertBattlersToIds(BattleManager._actionBattlers);
    //console.info(BattleManager._actionBattlers);
    var data = NetMessage.CreateSubMessageData('battleOrder');
    data.orderData = orderData;
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendNetworkMsg = function (data) {
    Network.sendMessage(NetMessage.BattleManager().setData(data));
};

//?[NEW]
BattleManager._sendTroopNetworkIds = function () {
    var troopIds = $gameTroop.members().map(item => item.uniqueNetworkId());
    var data = NetMessage.CreateSubMessageData('enemyIds');
    data.troopIds = troopIds;
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendActionEndToNetwork = function () {
    this._sendNetworkMsg(NetMessage.CreateSubMessageData('endAction'));
};

//?[NEW]
BattleManager._sendTurnEndToNetwork = function () {
    this._sendNetworkMsg(NetMessage.CreateSubMessageData('endTurn'));
};

//?[NEW]
BattleManager._sendProcessTurnToNetwork = function (subject) {
    var data = NetMessage.CreateSubMessageData('processTurn');
    data.subjectId = this.getIdByBattleSubject(subject);
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendStartActionToNetwork = function (targets) {
    var data = NetMessage.CreateSubMessageData('startAction');
    data.targets = this.convertBattlersToIds(targets);
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendInvokeNormalToNetwork = function (subject, target) {
    var data = NetMessage.CreateSubMessageData('invokeNormal');
    data.subjectId = this.getIdByBattleSubject(subject);
    data.targetId = this.getIdByBattleSubject(target);
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._selectInputCommandNetwork = function (commandName) {
    var method = this._alias__selectNextCommand;
    if (commandName == 'prev')
        method = this._alias__selectPreviousCommand;
    if (this.actor()) {
        if (BattleManager.isMyActorInput()) {
            method.call(this);
            Network.sendMessage(NetMessage.BattleInputCommand().setData(commandName));
        }
    } else {
        method.call(this);
    }
};

//?[NEW]
BattleManager._sendAbortBattleToNetwork = function () {
    var data = NetMessage.CreateSubMessageData('abortBattle');
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendVictoryToNetwork = function () {
    var data = NetMessage.CreateSubMessageData('victory');
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendDefeatToNetwork = function () {
    var data = NetMessage.CreateSubMessageData('defeat');
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendEscapeToNetwork = function (success) {
    var data = NetMessage.CreateSubMessageData('escape');
    data.success = success;
    this._sendNetworkMsg(data);
};

// * DEPRECATED
//?[NEW]
BattleManager.isWaitInputtingForPvP = function () {
    return this._waitInputPvP === true;
};

// * NOT USED
//?[NEW]
BattleManager._onPvPStartInputCommandFromServer = function() {
    this._waitInputPvP = false;
};

//?[NEW]
BattleManager._startTurnPvP = function() {
    ///"StartTurnPvP".p();
    BattleManager._battlersMakeTurns = 0;
    BattleManager._battlersMakeInput++;
    //console.info($gameParty.leader().currentAction());
    if (BattleManager.isNetworkBattlePvPServer()) {
        //WAIT ANOTHER ACTOR INPUT FROM SERVER
        if (BattleManager._battlersMakeInput == 2) {
            BattleManager._startPvP();
        }
    } else {
        //SEND MY INPPUTING ACTION
        BattleManager._sendInputActionPvPToServer($gameParty.leader().currentAction());
    }
};

//?[NEW]
BattleManager._sendInputActionPvPToServer = function (action) {
    if(!this.isNetworkBattlePvP()) return;
    var data = BattleManager._collectBasicPvPData('inputActionPvP');
    data.action = JsonEx.stringify(action);
    this._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._collectBasicPvPData = function (commandName) {
    var data = NetMessage.CreateSubMessageData(commandName);
    data.myActorId = $gameParty.leader().actorId();
    data.myRivalActorId = $gameTroop.rival().actorId();
    return data;
};

//?[NEW]
BattleManager._sendNetworkMsgPvP = function (data) {
    Network.sendMessage(NetMessage.BattleManagerPvP().setData(data));
};

//?[NEW]
BattleManager._setPvPRivalActionFromNetwork = function (action) {
    $gameTroop.rival()._actions[0] = action;
    BattleManager._battlersMakeInput++;
    if (BattleManager.isNetworkBattlePvPServer()) {
        if(BattleManager._battlersMakeInput == 2)
            BattleManager._startPvP();
    }
};

//?[NEW]
BattleManager._startPvP = function () {
    BattleManager._battlersMakeInput = 0;
    BattleManager.makeActionOrders();
    //BattleManager._actionBattlers = [$gameParty.leader(), $gameTroop.rival()];
    ///"START".p(BattleManager._actionBattlers[0].name());
    BattleManager._sendStartTurnPvPToServer(BattleManager._actionBattlers[0].actorId());
};

//?[NEW]
BattleManager._sendStartTurnPvPToServer = function (actorId) {
    var data = BattleManager._collectBasicPvPData('startTurnPvP');
    data.whoStart = actorId;
    BattleManager._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._startPvPTurnFromNetwork = function() {
    //"START PVP TURN FROM NETWORK".p();
    BattleManager._actionBattlers = [$gameParty.leader(), $gameTroop.rival()];
    BattleManager._subject = BattleManager._actionBattlers[0];
    BattleManager.processTurn();
};

//?[NEW]
BattleManager._sendStartActionPvPToNetwork = function() {
    var data = BattleManager._collectBasicPvPData('startActionPvP');
    data.subjectId = $gameParty.leader().actorId();
    data.action = JsonEx.stringify(BattleManager._action);
    data.targets = BattleManager.convertBattlersToIds(BattleManager._targets);
    BattleManager._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._startActionFromNetworkPvP = function(subjectId, action, targetsIds) {
    //"START ACTION FROM NETWORK".p();
    var subject = BattleManager.getBattleSubjectById(subjectId);
    var targets = BattleManager.convertIdsToBattlers(targetsIds);
    BattleManager._logWindow.startAction(subject, action, targets);
};

//?[NEW]
// * Только Normal Action
//TODO: Magic Reflection, CounterAttack
BattleManager._invokeActionPvP = function (subject, target) {
    this._logWindow.push('pushBaseLine');
    this.invokeNormalAction(subject, target);
    subject.setLastTarget(target);
    this._logWindow.push('popBaseLine');
    this.refreshStatus();
};

//?[NEW]
BattleManager._invokeNormalActionPvP = function (subject, target) {
    this._action.apply(target);
    this._logWindow.displayActionResults(subject, target);

    var data = BattleManager._collectBasicPvPData('invokeNormalActionPvP');
    data.subjectId = subject.actorId();
    data.targetId = target.actorId();
    data.resultSubject = JsonEx.stringify(subject.result());
    data.resultTarget = JsonEx.stringify(target.result());
    BattleManager._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._invokeNormalActionFromNetworkPvP = function (subjectId, targetId, subResult, tarResult) {
    //"NORMAL ACTION FROM NETWORK".p();
    BattleManager._logWindow.push('pushBaseLine');
    var subject = BattleManager.getBattleSubjectById(subjectId);
    var target = BattleManager.getBattleSubjectById(targetId);
    subject._result = subResult;
    target._result = tarResult;
    BattleManager._logWindow.displayActionResults(subject, target);
    BattleManager._logWindow.push('popBaseLine');
    BattleManager.refreshStatus();
};

//?[NEW]
BattleManager._sendEndActionPvPToServer = function() {
    ///"END ACTION -> SERVER".p();
    var data = BattleManager._collectBasicPvPData('endActionPvP');
    data.subjectData = JsonEx.stringify($gameParty.leader()._collectDataPvPForNetwork());
    data.targetData = JsonEx.stringify($gameTroop.rival()._collectDataPvPForNetwork());
    BattleManager._sendNetworkMsgPvP(data);
    BattleManager.processTurn();
};

//?[NEW]
BattleManager._actionEndPvPFromNetwork = function(targetData, partyLeaderData) {
    //"END ACTION FROM SERVER".p();
    BattleManager._logWindow.endAction($gameTroop.rival());
    BattleManager.refreshStatus();
    BattleManager._battlersMakeTurns++;
    $gameParty.leader()._onNetworkPvPData(partyLeaderData);
    $gameTroop.rival()._onNetworkPvPData(targetData);
    if(BattleManager._battlersMakeTurns == 1) {
        // * Так как это пришло от сервера, значит следующий ход - мой
        BattleManager._sendStartTurnPvPToServer($gameParty.leader().actorId());
    } else
        BattleManager._checkTurnEndPvP();
};

//?[NEW]
BattleManager._checkTurnEndPvP = function () {
    if (BattleManager._battlersMakeTurns == 2) {
        //"END TURN".p();
        BattleManager._battlersMakeTurns = 0;
        BattleManager.endTurn();
    }
};

//TODO: СБОС ФЛАГОВ PVP в NETWORK!!

// ■ END BattleManager_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    //@[ALIAS]
    var _alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = _alias_DataManager_makeSaveContents.call(this, ...arguments);
        try {
            if (Network.isConnected()) {
                if (Network.isHost() && Network.sessionData != null) {
                    contents.network = Network.sessionData.makeSaveContents();
                }
            }
        } catch (error) {
            AlphaNET.error(error, ' create network world save data');
        }
        return contents;
    };

    //@[ALIAS]
    var _alias_DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _alias_DataManager_extractSaveContents.call(this, ...arguments);
        try {
            if (contents.network != null) {
                if (Network.sessionData == null)
                    Network.sessionData = new AlphaNET.LIBS.NetSessionData();
                Network.sessionData.extractSaveContents(contents.network);
            }
        } catch (error) {
            AlphaNET.error(error, ' load network world save data');
        }
    };

    //@[ALIAS]
    var _alias_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _alias_DataManager_createGameObjects.call(this, ...arguments);
        AlphaNET.ExtraPluginSupport();
    };

    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        _alias_DataManager_loadDatabase.call(this, ...arguments);
        ANJsonSettings.InitAndLoad();
    };

})();
// ■ END DataManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager_PRO.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        _alias_DataManager_setupNewGame.call(this);
        ANET.loadFonts();
    };
})();
// ■ END DataManager_PRO.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ExtraPluginsSupport.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
AlphaNET.ExtraPluginSupport = (function () {

    // * Yanfly Engine Plugins - Item Core
    (function(){
        if (Imported.YEP_ItemCore == null)
            return;
        try {
            //@[ALIAS]
            var _alias_Game_Party_getDataForNetwork = Game_Party.prototype.getDataForNetwork;
            Game_Party.prototype.getDataForNetwork = function () {
                var result = _alias_Game_Party_getDataForNetwork.call(this, ...arguments);
                
                var weapons = {};
                for (const [key, value] of Object.entries($gameParty._weapons)) {
                    var newKey = Number(key) - Yanfly.Param.ItemStartingId;
                    weapons[newKey] = value;
                }
                result.weapons = JSON.stringify(weapons);

                var armors = {};
                var realArmors = $gameParty.armors();
                for(var i = 0; i<realArmors.length; i++) {
                    var baseId = DataManager.getBaseItem(realArmors[i]).id;
                    if (armors[baseId] == null)
                        armors[baseId] = 1;
                    else
                        armors[baseId] += 1;
                }
                result.armors = JSON.stringify(armors);

                return result;
            };

            //$[OVER]
            Game_Party.prototype._setArmorsFromNetwork = function (armors) {
                if (armors != null) {
                    try {
                        var temp = JSON.parse(armors);
                        for (const [key, value] of Object.entries(temp)) {
                            var item = $dataArmors[Number(key)];
                            $gameParty.gainItem(item, value);
                        }
                    } catch(error) {
                        AlphaNET.error(error, ' load player armors from Network');
                    }
                }
            };


        } catch(error) {
            AlphaNET.warning('Alpha NET compatibility for YEP_ItemCore.js not loaded!');
        }
    })();

});
// ■ END ExtraPluginsSupport.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ FontLoadManager_PRO.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
var FontLoadManager = function () {
    throw new Error('This is a static class');
};

FontLoadManager.initAndLoadAll = function () {
    FontLoadManager.init();
    FontLoadManager.loadAll();
};

FontLoadManager.init = function () {
    var fs = require('fs');
    this._files = fs.readdirSync(this.localFileDirectoryPath());
};


FontLoadManager.loadAll = function () {
    for (var i = 0; i < this._files.length; i++) {
        if (this._files[i].contains("mplus-1m-regular"))
            continue;
        if (this._files[i].includes('.ttf') || this._files[i].includes('.TTF')) {
            ANET.log("Load font " + this._files[i]);
            var name = this._files[i].substring(0, this._files[i].length - 4);
            var url = this.localFileDirectoryPath() + this._files[i];
            url = url.replaceAll("\\", "\\\\");
            Graphics.loadFont(name, url);
        }
    }
};

FontLoadManager._localFileDirectoryPath = null;
FontLoadManager.localFileDirectoryPath = function () {
    if (this._localFileDirectoryPath == null) {
        const path = require('path');
        const base = path.dirname(process.mainModule.filename);
        this._localFileDirectoryPath = path.join(base, 'fonts/');
    }
    return this._localFileDirectoryPath;
};
// ■ END FontLoadManager_PRO.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        _alias_Game_Action_apply.call(this, ...arguments);
        if(BattleManager.isNetworkBattleServer()) {
            this._sendActionResultToNetwork(target);
        }
    };

    //@[ALIAS]
    var _alias_Game_Action_setSkill = Game_Action.prototype.setSkill;
    Game_Action.prototype.setSkill = function (skillId) {
        _alias_Game_Action_setSkill.call(this, ...arguments);
        if (BattleManager.isNetworkBattle()) {
            this._sendSetActionSkillToNetwork(skillId);
        }
        this._outerCall = false;
    };

    //@[ALIAS]
    var _alias_Game_Action_setItem = Game_Action.prototype.setItem;
    Game_Action.prototype.setItem = function (itemId) {
        _alias_Game_Action_setItem.call(this, ...arguments);
        if (BattleManager.isNetworkBattle()) {
            this._sendSetActionItemToNetwork(itemId);
        }
        this._outerCall = false;
    };

    //@[ALIAS]
    var _alias_Game_Action_setTarget = Game_Action.prototype.setTarget;
    Game_Action.prototype.setTarget = function (targetIndex) {
        _alias_Game_Action_setTarget.call(this, ...arguments);
        if (BattleManager.isNetworkBattle()) {
            this._sendSetActionTargetToNetwork(targetIndex);
        }
        this._outerCall = false;
    };

    //?[NEW]
    Game_Action.prototype.setSkillFromNet = function (skillId) {
        this._outerCall = true;
        "Game_Action: Skill set from Net".p(skillId);
        this.setSkill(skillId);
    };

    //?[NEW]
    Game_Action.prototype.setItemFromNet = function (itemId) {
        this._outerCall = true;
        "Game_Action: Item set from Net".p(itemId);
        this.setItem(itemId);
    };

    //?[NEW]
    Game_Action.prototype.setTargetFromNet = function (targetIndex) {
        this._outerCall = true;
        "Game_Action: Target set from Net".p(targetIndex);
        this.setTarget(targetIndex);
    };

    //@[ALIAS]
    var _alias_Game_Action_setSubject = Game_Action.prototype.setSubject;
    Game_Action.prototype.setSubject = function (subject) {
        if(BattleManager.isNetworkBattlePvP()) {
            this._subjectActorId = subject.actorId();
            this._subjectEnemyIndex = -1;
        } else
            _alias_Game_Action_setSubject.call(this, subject);
    };

    //@[ALIAS]
    var _alias_Game_Action_subject = Game_Action.prototype.subject;
    Game_Action.prototype.subject = function () {
        if (BattleManager.isNetworkBattlePvP()) {
            if (this._subjectActorId == $gameParty.leader().actorId()) {
                return $gameParty.leader();
            } else {
                return $gameTroop.rival();
            }
        } else
            return _alias_Game_Action_subject.call(this);
    };

})();
// ■ END Game_Action.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Action.prototype;
  _._sendActionResultToNetwork = function(target) {
    var data;
    if (BattleManager._phase !== 'action') {
      return;
    }
    data = NetMessage.CreateSubMessageData('setResult');
    data.sbj = BattleManager.getIdByBattleSubject(this.subject());
    data.target = BattleManager.getIdByBattleSubject(target);
    data.result = target.result();
    this._sendActionNetMsg(data);
  };
  _._sendActionNetMsg = function(data) {
    return Network.sendMessage(NetMessage.BattleAction().setData(data));
  };
  _._sendSetActionSkillToNetwork = function(skillId) {
    return this._createActionNetMessage('setSkill', skillId);
  };
  _._createActionNetMessage = function(name, actionId) {
    var data;
    if (this._outerCall === true) {
      return;
    }
    if (!(this._subjectActorId > 0)) {
      return;
    }
    data = NetMessage.CreateSubMessageData(name);
    data.actionId = actionId;
    data.actorId = this._subjectActorId;
    this._sendActionNetMsg(data);
  };
  _._sendSetActionItemToNetwork = function(itemId) {
    return this._createActionNetMessage('setItem', itemId);
  };
  _._sendSetActionTargetToNetwork = function(targetIndex) {
    return this._createActionNetMessage('setTarget', targetIndex);
  };
})();

// ■ END Game_Action_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[NEW]
Game_ActionResult.prototype.setupFromOuterData = function (data) {
    var item = this;
    Object.getOwnPropertyNames(data).forEach(function (key, index) {
        item[key] = data[key];
    });
};
// ■ END Game_ActionResult_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function () {
        _alias_Game_Actor_refresh.call(this, ...arguments);
        if (this._isNeedNetworkRefresh()) {
            this._sendRefreshMessageToNetwork(this.actorId());
        }
    };

    //@[ALIAS]
    var _alias_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function () {
        _alias_Game_Actor_initMembers.call(this, ...arguments);
        this._networkNameplateStyleId = null;
    };

    //?[NEW]
    Game_Actor.prototype.networkStyleId = function () {
        return this._networkNameplateStyleId;
    };

    //?[NEW]
    Game_Actor.prototype._collectDataPvPForNetwork = function () {
        var data = {};
        data._hp = this._hp;
        data._mp = this._mp;
        data._tp = this._tp;
        data._paramPlus = this._paramPlus;
        data._states = this._states;
        data._stateTurns = this._stateTurns;
        data._buffs = this._buffs;
        data._buffTurns = this._buffTurns;
        return data;
    };

    //?[NEW]
    Game_Actor.prototype._onNetworkPvPData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
})();
// ■ END Game_Actor.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor_X.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//$[OVER]
Game_Actor.prototype.performDamage = function () {
    Game_Battler.prototype.performDamage.call(this);
    if (this.isSpriteVisible()) {
        this.requestMotion('damage');
    } else {
        if (this == $gameParty.leader())
            $gameScreen.startShake(5, 5, 10);
    }
    SoundManager.playActorDamage();
};
// ■ END Game_Actor_X.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    //TODO: Game_Battler.escape - не синхронизирован. Т.е. один игрок может  убежать, если у вещи есть
    //специальный эффект, но это не синхронизируется, бой встаёт!

    //@[ALIAS]
    var _alias_Game_Battler_consumeItem = Game_Battler.prototype.consumeItem;
    Game_Battler.prototype.consumeItem = function (item) {
        if (BattleManager.isNetworkBattle()) {
            if (this == $gameParty.leader()) {
                "CONSUME ITEM".p();
                _alias_Game_Battler_consumeItem.call(this, ...arguments);
            }
        } else {
            _alias_Game_Battler_consumeItem.call(this, ...arguments);
        }
    };

    //@[ALIAS]
    var _alias_Game_Battler_meetsItemConditions = Game_Battler.prototype.meetsItemConditions;
    Game_Battler.prototype.meetsItemConditions = function (item) {
        if (BattleManager.isNetworkBattle()) {
            if (this == $gameParty.leader()) {
                return _alias_Game_Battler_meetsItemConditions.call(this, item);
            } else {
                return this.meetsUsableItemConditions(item);
            }
        } else
            return _alias_Game_Battler_meetsItemConditions.call(this, item);
    };
})();
// ■ END Game_Battler.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Battler.prototype;
  _._sendRefreshMessageToNetwork = function(netId) {
    var data, msg;
    data = this._collectDataForNetwork();
    data.id = netId;
    msg = NetMessage.BattleBattlerRefreshData().setData(data);
    Network.sendMessage(msg);
  };
  _._collectDataForNetwork = function() {
    var data;
    return data = {
      hp: this._hp,
      mp: this._mp,
      tp: this._tp,
      states: this._states
    };
  };
  _._isNeedNetworkRefresh = function() {
    var phase;
    if (BattleManager.isNetworkBattleServer()) {
      phase = BattleManager._phase;
      return phase === 'action' || phase === 'start';
    }
    return false;
  };
})();

// ■ END Game_Battler_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Game_Character_initMembers = Game_Character.prototype.initMembers;
    Game_Character.prototype.initMembers = function () {
        _alias_Game_Character_initMembers.call(this, ...arguments);
        this._networkIconId = 0;
    };
})();
// ■ END Game_Character.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

//?[NEW]
Game_Character.prototype.synchronizeFromNetwork = function (netCharData) {
    this.onNetworkCharacterData(netCharData.charData);
    this.locate(netCharData.locatePoint.x, netCharData.locatePoint.y);
    this.onNetworkDirectionData(netCharData.locatePoint.direction);
};

//?[NEW]
Game_Character.prototype.onNetworkCharacterData = function (characterData) {
    this.updateNetworkData(characterData);
};

//?[NEW]
Game_Character.prototype.updateNetworkData = function (characterData) {
    for (var key in characterData) {
        this[key] = characterData[key];
    }
};

//?[NEW]
Game_Character.prototype.onNetworkDirectionData = function (d) {
    this._direction = d;
};

//?[NEW]
Game_Character.prototype.collectDataForNetwork = function () {
    var data = this._collectDataForNetwork();
    data.locatePoint = {
        x: this._x,
        y: this._y,
        direction: this._direction
    };
    return data;
};

//?[NEW]
Game_Character.prototype._collectDataForNetwork = function () {
    var data = {};
    data.charData = this._collectCharDataForNetwork();
    data.moveData = this._collectMoveDataForNetwork();
    return data;
};

//?[NEW]
Game_Character.prototype._collectCharDataForNetwork = function () {
    var data = {};
    data._moveSpeed = this.realMoveSpeed();
    data._opacity = this.opacity();
    data._blendMode = this.blendMode();
    data._walkAnime = this.hasWalkAnime();
    data._stepAnime = this.hasStepAnime();
    data._directionFix = this.isDirectionFixed();
    data._transparent = this.isTransparent();
    data._direction = this._direction;
    return data;
};

//?[NEW]
Game_Character.prototype._collectMoveDataForNetwork = function () {
    return {
        x: this.x,
        y: this.y
    };
};

//?[NEW]
Game_Character.prototype.onNetworkMoveData = function (moveData) {
    this._moveFromNetwork(moveData);
};

//?[NEW]
Game_Character.prototype._moveFromNetwork = function (point) {
    try {
        var sx = this.deltaXFrom(point.x);
        var sy = this.deltaYFrom(point.y);
        if (sx !== 0 && sy !== 0) {
            this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
        } else if (sx !== 0) {
            this._moveStraightNetwork(sx > 0 ? 4 : 6);
        } else if (sy !== 0) {
            this._moveStraightNetwork(sy > 0 ? 8 : 2);
        }
    } catch (e) {

    }
};

//?[NEW]
Game_Character.prototype._moveStraightNetwork = function (d) {
    this.setMovementSuccess(true);
    this.setDirection(d);
    this._x = $gameMap.roundXWithDirection(this._x, d);
    this._y = $gameMap.roundYWithDirection(this._y, d);
    this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
    this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
    this.increaseSteps();
};

//?[NEW]
Game_Character.prototype.networkIconId = function () {
    if (this.isTransparent())
        return -1;
    else
        return this._networkIconId;
};

//?[NEW]
Game_Character.prototype._startNetworkIcon = function () {
    this._networkIconId = 0;
};

//?[NEW]
Game_Character.prototype.showNetworkIcon = function (iconId) {
    this._networkIconId = iconId;
};

//?[NEW]
Game_Character.prototype.getNetworkName = function() {
    return null;
};

//?[NEW]
Game_Character.prototype.getNetworkNameStyleId = function() {
    return null;
};
// ■ END Game_Character_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Enemy_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function () {
        _alias_Game_Enemy_setup.call(this, ...arguments);
        if (BattleManager.isNetworkBattleServer()) {
            this._uniqueNetworkId = 901 + $gameTroop.members().length;
            "UID".p(this._uniqueNetworkId);
        }
    };

    //?[NEW]
    Game_Enemy.prototype.uniqueNetworkId = function () {
        return this._uniqueNetworkId;
    };

    //@[ALIAS]
    var _alias_Game_Enemy_refresh = Game_Enemy.prototype.refresh;
    Game_Enemy.prototype.refresh = function () {
        _alias_Game_Enemy_refresh.call(this, ...arguments);
        if (this._isNeedNetworkRefresh()) {
            this._sendRefreshMessageToNetwork(this.uniqueNetworkId());
        }
    };
})();
// ■ END Game_Enemy.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_EnemyPvP.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    function Game_EnemyPvP() {
        this.initialize.apply(this, arguments);
    }

    Game_EnemyPvP.prototype = Object.create(Game_Actor.prototype);
    Game_EnemyPvP.prototype.constructor = Game_EnemyPvP;

    Game_EnemyPvP.prototype.initialize = function (actorId, x, y) {
        Game_Actor.prototype.initialize.call(this, actorId);
        this._screenX = x;
        this._screenY = y;
    };

    //$[OVER FROM GAME_ACTOR]
    Game_EnemyPvP.prototype.setup = function (actorId) {
        Game_Actor.prototype.setup.call(this, actorId);
        this._setupFromActor();
    };

    //?[NEW]
    Game_EnemyPvP.prototype._setupFromActor = function () {
        var actor = $gameActors.actor(this._actorId);
        this._name = actor.name();
        this._nickname = actor.nickname();
        this._profile = actor.profile();
        this._classId = actor._classId;
        this._level = actor._level;
        
        this._characterName = actor.characterName();
        this._characterIndex = actor.characterIndex();
        this._faceName = actor.faceName();
        this._faceIndex = actor.faceIndex();
        this._battlerName = actor.battlerName();

        this._exp[this._classId] = actor._exp[this._classId];
        this._skills = actor._skills;
        this._equips = actor._equips;

        var data = actor._collectDataPvPForNetwork();
        this._onNetworkPvPData(data);
    };


    //?[BASE]
    Game_EnemyPvP.prototype.initMembers = function () {
        Game_Actor.prototype.initMembers.call(this);
        this._screenX = 0;
        this._screenY = 0;
    };

    //$[OVER FROM GAME_ACTOR]
    Game_EnemyPvP.prototype.isActor = function () {
        return false;
    };

    Game_EnemyPvP.prototype.isEnemy = function () {
        return true;
    };

    Game_EnemyPvP.prototype.friendsUnit = function () {
        return $gameTroop;
    };

    Game_EnemyPvP.prototype.opponentsUnit = function () {
        return $gameParty;
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.index = function () {
        return 0; // * PvP only 1 by 1
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.isBattleMember = function () {
        return true;
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.enemyId = function () {
        return Game_Actor.prototype.actorId.call(this);
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.enemy = function () {
        return Game_Actor.prototype.actor.call(this);
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.exp = function () {
        return 0; // * TODO: EXP
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.gold = function () {
        return 0; // * TODO: GOLD
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.makeDropItems = function () {
        return []; // * TODO: DROP ITEMS
    };

    Game_EnemyPvP.prototype.isSpriteVisible = function () {
        return true;
    };

    Game_EnemyPvP.prototype.screenX = function () {
        return Game_Enemy.prototype.screenX.call(this);
    };

    Game_EnemyPvP.prototype.screenY = function () {
        return Game_Enemy.prototype.screenY.call(this);
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.battlerHue = function () {
        return 0;
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.originalName = function () {
        return this.battlerName();
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.performActionStart = function (action) {
        Game_Enemy.prototype.performActionStart.call(this, action);
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.performDamage = function () {
        Game_Enemy.prototype.performDamage.call(this);
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.performCollapse = function () {
        Game_Battler.prototype.performCollapse.call(this);
        this.requestEffect('collapse');
        SoundManager.playEnemyCollapse();
    };

    //$[OVER GAME_ENEMY]
    Game_EnemyPvP.prototype.meetsCondition = function (action) {
        return false; // * In PvP Interpreter not working!
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.makeActions = function () {
        Game_Battler.prototype.makeActions.call(this);
        this.makeAutoBattleActions(); //TODO: Auto Battle in TEST
    };

    //$[OVER GAME_ENEMY]
    Game_EnemyPvP.prototype.uniqueNetworkId = function () {
        return this.enemyId();
    };

    AlphaNET.register(Game_EnemyPvP);
})();
// ■ END Game_EnemyPvP.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

(function () {

    //@[ALIAS]
    var _Game_Event_prototype_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function () {
        _Game_Event_prototype_initMembers.call(this);
        this._isOnlyLocalMovement = false;
        this._isNetworkSharedMode = false;
        this._isStartedFromNetwork = false;
        this._networkSyncCommands = [];
    };

    //@[ALIAS]
    var _alias_Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function () {
        _alias_Game_Event_initialize.call(this, ...arguments);
        this._checkNetworkGlobalSymbols();
    };

    //?[NEW]
    Game_Event.prototype.isLockedByNet = function () {
        return $gameMap.isEventLockedByNet(this.eventId());
    };

    //?[NEW]
    Game_Event.prototype._checkNetworkGlobalSymbols = function () {
        try {
            var ev = this.event();
            if (ev.note.contains('LOCAL')) {
                //"LOCAL".p(ev.id);
                this.setLocalMovementMode(true);
            }
            if (ev.note.contains('NET')) {
                if (Network.isMultiMode() == false) {
                    this.setLocalMovementMode(true);
                    this.setNetworkSharedMode(true);
                } else {
                    AlphaNET.warning(`using NET event (id ${this._eventId}) in multiplayer game mode on ${$gameMap.mapId()}`);
                }
            }
        } catch (error) {
            AlphaNET.error(error, ' read network global symbols from Event');
        }
    };

    //?[NEW]
    Game_Event.prototype.isOnlyLocalMoveMode = function () {
        return this._isOnlyLocalMovement == true;
    };

    //?[NEW]
    Game_Event.prototype.setLocalMovementMode = function (bool) {
        this._isOnlyLocalMovement = bool;
    };

    //?[NEW]
    Game_Event.prototype.setNetworkSharedMode = function (bool) {
        this._isNetworkSharedMode = bool;
    };

    //?[NEW]
    Game_Event.prototype.isNetworkSharedMode = function () {
        return (this._isNetworkSharedMode == true);
    };

    // * Когда Event движется, он передаёт все свои данные через сервер другим игрокам
    //@[ALIAS]
    var _Game_Event_prototype_moveStraight = Game_Event.prototype.moveStraight;
    Game_Event.prototype.moveStraight = function (d) {
        _Game_Event_prototype_moveStraight.call(this, d);
        if (Network.isConnected() && !this.isOnlyLocalMoveMode()) {
            var data = this._collectEventBasicDataForNetwork();
            data.moveData = this._collectDataForNetwork();
            Network.sendMessage(NetMessage.MapEventMoveData().setData(data));
        }
    };

    //?[NEW]
    Game_Event.prototype._collectEventBasicDataForNetwork = function () {
        var data = {
            eventId: this.eventId(),
            mapId: $gameMap.mapId()
        };
        return data;
    };

    // * Когда Event меняет Direction, он передаёт все свои данные через сервер другим игрокам
    //@[ALIAS]
    var _Game_Event_prototype_setDirection = Game_Event.prototype.setDirection;
    Game_Event.prototype.setDirection = function (d) {
        _Game_Event_prototype_setDirection.call(this, d);
        if (Network.isConnected() && !this.isOnlyLocalMoveMode()) {
            this._syncDirectionNetwork(d);
        }
    };

    //?[NEW]
    Game_Event.prototype._syncDirectionNetwork = function (d) {
        if (!this.isDirectionFixed() && d) {
            var data = this._collectEventBasicDataForNetwork();
            data.directionData = d;
            Network.sendMessage(NetMessage.MapEventMoveData().setData(data));
        }
    };

    //@[ALIAS]
    var _Game_Event_prototype_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
    Game_Event.prototype.updateSelfMovement = function () {
        if(Network.isConnected()) {
            this._updateSelfMovementForNetwork();
        } else {
            _Game_Event_prototype_updateSelfMovement.call(this);
        }
    };

    //?[NEW]
    Game_Event.prototype._updateSelfMovementForNetwork = function () {
        if(Network.isMultiMode()) {
            if ($gameMap.isEventOwnedByNet(this.eventId())) {
                //?EMPTY
                //* Если другой игрок заблокировал событие, то оно не обновляется в любом случае!
                return;
            }
            if(!Network.isMapOwner() && 
            !this.isOnlyLocalMoveMode()) {
                //?EMPTY
                //* Все движения событий обрабатываются на том клиенте, который первый попал на карту
            } else {
                _Game_Event_prototype_updateSelfMovement.call(this);
            }
        } else {
            if (!Network.isHost() &&
                !this.isOnlyLocalMoveMode()) {
                //?EMPTY
                //* Все движения событий обрабатываются на хосте, кроме только локальных
            } else {
                _Game_Event_prototype_updateSelfMovement.call(this);
            }
        }
    };

    // * Эта функция вызывается на Хосте, когда он находится не на сцене карты
    // * Она нужна, чтобы события продолжали SelfMovement и не зависали у всех игроков
    //?[NEW]
    Game_Event.prototype.updateForNetwork = function () {
        Game_Character.prototype.update.call(this);
    };

    //@[ALIAS]
    var _alias_Game_Event_list = Game_Event.prototype.list;
    Game_Event.prototype.list = function () {
        if (this.isNeedStartSyncCommand()) {
            "RUN EVENT SYNC COMMAND".p();
            return this._createSyncCommandsList();
        } else if (this.isLockedByNet()) {
            return [];
        } else
            return _alias_Game_Event_list.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias_Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function () {
        _alias_Game_Event_update.call(this, ...arguments);
        if (this.isNeedStartSyncCommand()) {
            this._starting = true;
        }
    };

    //?[NEW]
    Game_Event.prototype.startFromNetwork = function () {       
        this._isStartedFromNetwork = true;
        if (this.sharedPageIndex >= 0) {
            this._pageIndex = this.sharedPageIndex;
            this.sharedPageIndex = -1;
        }
        this.start();
    };

    //?[NEW]
    Game_Event.prototype.isStartedFromNetwork = function () {
        return this._isStartedFromNetwork == true;
    };

    //?[NEW]
    Game_Event.prototype.clearStartFromNetwork = function () {
        this._isStartedFromNetwork = false;
    };

    //@[ALIAS]
    var _alias_Game_Event_lock = Game_Event.prototype.lock;
    Game_Event.prototype.lock = function () {
        if (!this._locked) {
            this._setEventOwned(true);
        }
        _alias_Game_Event_lock.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias_Game_Event_unlock = Game_Event.prototype.unlock;
    Game_Event.prototype.unlock = function () {
        if (this._locked) {
            this._setEventOwned(false);
        }
        _alias_Game_Event_unlock.call(this, ...arguments);
    };
})();

// ■ END Game_Event.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Event.prototype;
  _.isNeedStartSyncCommand = function() {
    return this._networkSyncCommands.length > 0;
  };
  _.executeSyncCommandFromNetwork = function(pageIndex = 0, listIndex = -1) {
    this._networkSyncCommands.push([...arguments]);
    "COMMAND ADDED TO networkSyncCommands".p();
    if (!this.isStarting()) {
      return this._starting = true;
    }
  };
  _._createSyncCommandsList = function() {
    var list;
    list = this._networkSyncCommands.map((command) => {
      var item;
      item = this._getSyncCommand(...command);
      if (item != null) {
        return item;
      }
    });
    this._networkSyncCommands = [];
    return list;
  };
  _._getSyncCommand = function(pageIndex = 0, listIndex = -1) {
    var page;
    page = this.event().pages[pageIndex];
    if (page != null) {
      return this._getSyncCommandLine(page, listIndex);
    } else {
      return this._syncCommandLineNotFounded();
    }
  };
  _._getSyncCommandLine = function(page, index = -1) {
    var line, list;
    if (index < 0) {
      this._syncCommandLineNotFounded();
    }
    list = page.list;
    if (!((list != null) && list.length > 1)) {
      this._syncCommandLineNotFounded();
    }
    line = list[index];
    if (line != null) {
      return line;
    } else {
      return this._syncCommandLineNotFounded();
    }
  };
  _._syncCommandLineNotFounded = function() {
    AlphaNET.error('', 'Cannot Sync. Event Line not founded!');
    return null;
  };
  _._setEventOwned = function(isOwned) {
    var data;
    if (this._isEventNeedBeOwned()) {
      data = this._collectEventBasicDataForNetwork();
      data.isLock = isOwned;
      Network.sendMessage(NetMessage.OwnEvent().setData(data));
    }
  };
  _._isEventNeedBeOwned = function() {
    return Network.isConnected() && Network.isMultiMode() && !Network.isMapOwner();
  };
})();

// ■ END Game_Event_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Followers.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//$[OVER]
Game_Followers.prototype.initialize = function () {
    this._visible = true;
    this._gathering = false;
    this._data = [];
    for (var i = 0; i < Network.maximumNetworkPlayers; i++) {
        this._data.push(new AlphaNET.LIBS.NetworkCharacter(i));
    }
    this._netCharIdStore = null; // * Для оптимизации
};

//?[NEW]
Game_Followers.prototype.getNetworkCharById = function (id) {
    if (this._netCharIdStore == null)
        this._generateStore();
    return this._netCharIdStore[id];
};

// * Создаём хэш ID и character, чтобы каждый раз не искать по ID в _data
//?[NEW] 
Game_Followers.prototype._generateStore = function () {
    this._netCharIdStore = {};
    this._data.forEach(item => {
        this._netCharIdStore[item.netId] = item;
    });
};

//$[OVER]
Game_Followers.prototype.update = function () {
    this.forEach(function (follower) {
        follower.update();
    }, this);
};

//@[ALIAS]
/*var _alias_Game_Followers_updateMove = Game_Followers.prototype.updateMove;
Game_Followers.prototype.updateMove = function () {
    if(Network.isConnected()) {
        if (!Network.isHost()) return;
        for (var i = this._data.length - 1; i >= 0; i--) {
            var precedingCharacter = (i > 0 ? this._data[i - 1] : $gamePlayer);
            this._data[i].chaseCharacter(precedingCharacter);
        }
    } else
        _alias_Game_Followers_updateMove.call(this, ...arguments);
};*/ //TODO: Gather можно реализовать

//?[NEW]
Game_Followers.prototype.count = function () {
    return this._data.length;
};

//?[NEW]
Game_Followers.prototype.refreshNetwork = function () {
    this._data.forEach(item => item.refreshNet());
    this._generateStore();
};

//?[NEW]
Game_Followers.prototype.getNetworkPlayerOnPosition = function(x, y) {
    var networkPlayer = this._data.find(item => (item.x == x && item.y == y && item.actor()));
    return networkPlayer;
};
// ■ END Game_Followers.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

  // * 1 - сделать выполнение событий с Sync, only, except командами - OK
  //  Проверить если событие запущено другое, а приходит синхронизация - OK
  //  Проверить очередь - OK
  // * 2 - сделать NET ALL событие с Sync, only, except командами + регулировка одновременного старта - OK
  // * 3 - параллельные события ???
  // * 4 - indent, ветвление ???
  // * 5 - общие события (обыные, параллельные, автоматические) ???

  //@[DEFINES]
  var _ = Game_Interpreter.prototype;

  //@[ALIAS]
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'NET') {
      switch (args[0]) {
        /* jshint -W086 */
        case 'start':
          AlphaNET.startServer();
          // * Тут нет Break намеренно, так как сразу соединение нужно к серверу
        case 'connect':
          AlphaNET.connectToServer();
          break;
        case 'disconnect':
          AlphaNET.disconnectFromServer();
          break;
        case 'hotSeat':
          AlphaNET.startAnotherClient();
          break;
        case 'stop':
          AlphaNET.stopServer();
          break;
        case 'sync':
          this._onNETSyncCommand();
          break;
        case 'lock':
          this._onNETLockCommand();
          break;
        case 'only':
        case 'except':
          this._onNETConditionCommand(args);
          break;
        case 'virtual':
          this._onNETVirtualCommand();
          break;
        case 'restrict':
          if (Network.isHost())
            Network._allowConnection = false;
          break;
        case 'allow':
          if (Network.isHost())
            Network._allowConnection = true;
          break;
        default:
          break;
      }
    }
  };

  //@[ALIAS]
  var _alias_Game_Interpreter_clear = Game_Interpreter.prototype.clear;
  Game_Interpreter.prototype.clear = function () {
    _alias_Game_Interpreter_clear.call(this);
    this._network = new AlphaNET.LIBS.InterpreterNET();
  };

  //@[ALIAS]
  var _alias__setup = _.setup;
  _.setup = function () {
    _alias__setup.call(this, ...arguments);
    if (Network.isConnected() && this._eventId > 0) {
      this._network.setup(this._eventId, this._list);
      if (this._network.isShared() && this.isRunning()) {
        this._network.startNetwork();
      }
    }
  };

  //@[ALIAS]
  var _alias__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function () {
    if (this._waitMode == 'network') {
      return this._updateWaitModeNetwork();
    } else 
      {
        this._network.resetWait();
        return _alias__updateWaitMode.call(this, ...arguments);
      }
  };

  //?[NEW]
  _._updateWaitModeNetwork = function () {
    if (!Network.isBusy()) {
      return this._network.updateWaitMode();
    }
    return true; // * Continue waiting
  };

  //@[ALIAS]
  var _alias__setupChoices = _.setupChoices;
  _.setupChoices = function () {
    _alias__setupChoices.call(this, ...arguments);
    if (Network.isConnected()) {
      $gameMessage.setSharedChoiseMode(this._network.isShared());
    }
  };

  // * Transfer Player
  //@[ALIAS]
  var _alias__command201 = _.command201;
  _.command201 = function () {
    return this._startCommandOnlyInSharedMode(_alias__command201, arguments);
  };


  // * Battle Processing
  //@[ALIAS]
  var _alias__command301 = _.command301;
  _.command301 = function () {
    return this._startCommandOnlyInSharedMode(_alias__command301, arguments);
  };

  //@[ALIAS]
  var _alias__terminate = _.terminate;
  _.terminate = function () {
    _alias__terminate.call(this, ...arguments);
    if (this._needEventUnlock) { // * Unlock the event
      this._onNETLockCommand(false);
    }
  };

  //?[NEW]
  _.command900 = function () {
    this.setWaitMode('network');
    return this._network.command900();
  };

  //?[NEW]
  _.command901 = function () {
    this.setWaitMode('network');
    return this._network.command901(this._index);
  };

  // * Change Party Member
  //@[ALIAS]
  var _alias__command129 = _.command129;
  _.command129 = function () {
    if (Network.isConnected()) {
      AlphaNET.warning('Change Party Member (129) - not allowed in Network game!');
      return true;
    } else
      return _alias__command129.call(this, ...arguments);
  };

  // * Getting On and Off Vehicles
  //@[ALIAS]
  var _alias__command206 = _.command206;
  _.command206 = function () {
    if (Network.isConnected()) {
      AlphaNET.warning('Getting On and Off Vehicles (206) - not allowed in Network game!');
      return true;
    } else
      return _alias__command206.call(this, ...arguments);
  };

  // * Change Player Followers
  //@[ALIAS]
  var _alias__command216 = _.command216;
  _.command216 = function () {
    if (Network.isConnected()) {
      AlphaNET.warning('Change Player Followers (216) - not allowed in Network game!');
      return true;
    } else
      return _alias__command216.call(this, ...arguments);
  };

  // * Gather Followers
  //$[OVER]
  _.command217 = function () {
    AlphaNET.warning('Gather Followers (217) - not working with Alpha NET plugin');
    return true;
  };

  //@[ALIAS]
  var _alias__executeCommand = _.executeCommand;
  _.executeCommand = function () {
    if (Network.isConnected())
      this._networkSynchronization();
    return _alias__executeCommand.call(this, ...arguments);
  };

})();

// ■ END LibGame_Interpreter
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0x37b9 = [
    'split',
    'map',
    'CwTGo',
    'gmonK',
    'while\x20check\x20list[index]\x20to\x20sync\x20line',
    'call',
    'UDIRl',
    'njpJE',
    '_list',
    'NET\x20sync',
    'contains',
    'except',
    '_isListLineIsSynced',
    'TRydS',
    'AQVkq',
    'LHTlu',
    'This\x20command\x20allowed\x20only\x20in\x20NET\x20shared\x20events',
    'jONaQ',
    'joLPR',
    'warning',
    '_networkSynchronization',
    '_network',
    'isShared',
    'euyjL',
    'currentCommand',
    'ohtOq',
    'JQver',
    'NiMmt',
    'ihbyl',
    'VirtualInterpreter',
    '_onNETVirtualCommand',
    'wuJPA',
    'pwcNc',
    'riozO',
    '_onNETSyncCommand',
    '_isSyncCommandValid',
    'IgWgP',
    'include',
    '_mapId',
    'eventId',
    '_executeSyncCommand',
    '_getBasicEventDataForNet',
    '_getCurrentPageIndexForNet',
    '_index',
    'sendMessage',
    'SyncEvent',
    'setData',
    'event',
    '_pageIndex',
    'error',
    'get\x20page\x20index\x20for\x20event\x20sync\x20command',
    '_onNETLockCommand',
    'wjFak',
    'CiEac',
    'CreateSubMessageData',
    'code',
    'parameters',
    'mapId',
    '_eventId',
    'isConnected',
    '_needEventUnlock',
    'isLock',
    'LockEvent',
    'nYnpZ',
    'isHost',
    'getMyPlayerIndex',
    'getMyActorId',
    'only',
    'xAaTK',
    '_executeConditionCommand',
    'tbKen'
];
(function (_0x26911f, _0x42ef24) {
    var _0x3703e8 = function (_0x2fab33) {
        while (--_0x2fab33) {
            _0x26911f['push'](_0x26911f['shift']());
        }
    };
    _0x3703e8(++_0x42ef24);
}(_0x37b9, 0x69));
var _0x18b0 = function (_0xa5e7ec, _0x4494a7) {
    _0xa5e7ec = _0xa5e7ec - 0x0;
    var _0xb388a0 = _0x37b9[_0xa5e7ec];
    return _0xb388a0;
};
(function () {
    var _0x44361d, _0x1532f4, _0x271c4a;
    _0x271c4a = Game_Interpreter['prototype'];
    _0x1532f4 = [
        0x65,
        0x66,
        0x67,
        0x68,
        0x6c
    ];
    _0x44361d = [
        0x137,
        0x138,
        0x146,
        0x139,
        0x13a,
        0x13b,
        0x13c,
        0x13d,
        0x13e,
        0x13f,
        0x140,
        0x141,
        0x142,
        0x143,
        0x144,
        0x145,
        0xca,
        0xcb,
        0x119,
        0x11a,
        0x11b,
        0x11c,
        0x14b,
        0x14c,
        0x156,
        0x14d,
        0x14e,
        0x14f,
        0x150,
        0x151,
        0x153,
        0x154
    ];
    _0x271c4a[_0x18b0('0x0')] = function () {
        if (!Network['isConnected']()) {
            return;
        }
        if (this[_0x18b0('0x1')]()) {
            return this['_executeSyncCommand']();
        }
    };
    _0x271c4a[_0x18b0('0x1')] = function () {
        if (_0x18b0('0x2') === 'IgWgP') {
            var _0x2302c1;
            _0x2302c1 = this['nextEventCode']();
            return !_0x1532f4[_0x18b0('0x3')](_0x2302c1) && !_0x44361d[_0x18b0('0x3')](_0x2302c1);
        } else {
            return {
                'mapId': this[_0x18b0('0x4')],
                'eventId': this[_0x18b0('0x5')]()
            };
        }
    };
    _0x271c4a[_0x18b0('0x6')] = function () {
        var _0x4e015a;
        _0x4e015a = this[_0x18b0('0x7')]();
        _0x4e015a['pi'] = this[_0x18b0('0x8')]();
        _0x4e015a['li'] = this[_0x18b0('0x9')] + 0x1;
        return Network[_0x18b0('0xa')](NetMessage[_0x18b0('0xb')]()[_0x18b0('0xc')](_0x4e015a));
    };
    _0x271c4a[_0x18b0('0x7')] = function () {
        return {
            'mapId': this['_mapId'],
            'eventId': this[_0x18b0('0x5')]()
        };
    };
    _0x271c4a[_0x18b0('0x8')] = function () {
        var _0x49f7d0, _0x533618, _0x2d1ea4;
        try {
            _0x533618 = this[_0x18b0('0x5')]();
            if (_0x533618) {
                _0x2d1ea4 = $gameMap[_0x18b0('0xd')](_0x533618);
                if (_0x2d1ea4) {
                    return _0x2d1ea4[_0x18b0('0xe')];
                }
            }
            return 0x0;
        } catch (_0x24ff16) {
            _0x49f7d0 = _0x24ff16;
            AlphaNET[_0x18b0('0xf')](_0x49f7d0, _0x18b0('0x10'));
            return 0x0;
        }
    };
    _0x271c4a[_0x18b0('0x11')] = function (_0x4fc209 = !![]) {
        if (_0x18b0('0x12') === _0x18b0('0x13')) {
            var _0x1d4f45, _0x3707fb;
            _0x3707fb = NetMessage['VirtualInterpreter']();
            _0x1d4f45 = NetMessage[_0x18b0('0x14')](cmd[_0x18b0('0x15')]);
            _0x1d4f45[_0x18b0('0x16')] = cmd[_0x18b0('0x16')];
            _0x1d4f45[_0x18b0('0x17')] = this[_0x18b0('0x4')];
            _0x1d4f45[_0x18b0('0x5')] = this[_0x18b0('0x18')];
            _0x3707fb[_0x18b0('0xc')](_0x1d4f45);
            Network[_0x18b0('0xa')](_0x3707fb);
        } else {
            var _0x4b9f0e;
            if (!Network[_0x18b0('0x19')]()) {
                return;
            }
            this[_0x18b0('0x1a')] = _0x4fc209;
            _0x4b9f0e = this['_getBasicEventDataForNet']();
            _0x4b9f0e[_0x18b0('0x1b')] = _0x4fc209;
            return Network[_0x18b0('0xa')](NetMessage[_0x18b0('0x1c')]()['setData'](_0x4b9f0e));
        }
    };
    _0x271c4a['_onNETConditionCommand'] = function (_0x2bf0d7) {
        if (_0x18b0('0x1d') !== _0x18b0('0x1d')) {
            var _0x44dbb2, _0x4f259e;
            _0x44dbb2 = Network[_0x18b0('0x1e')]();
            if (_0x2f5553 != null) {
                _0x4f259e = !isActorId ? NetPartyManager[_0x18b0('0x1f')]() : NetPartyManager[_0x18b0('0x20')]();
                _0x44dbb2 = _0x2f5553['contains'](_0x4f259e);
            }
            if (_0x44dbb2 && command === 'except') {
                this[_0x18b0('0x9')]++;
            }
            if (!_0x44dbb2 && command === _0x18b0('0x21')) {
                this[_0x18b0('0x9')]++;
            }
        } else {
            var _0x2ed326, _0x2f5553, _0x254e2a;
            try {
                if (_0x18b0('0x22') !== 'dkdAo') {
                    if (!Network[_0x18b0('0x19')]()) {
                        return;
                    }
                    _0x2f5553 = _0x2bf0d7[0x1];
                    if (_0x2f5553 == null) {
                        this[_0x18b0('0x23')](_0x2bf0d7[0x0]);
                    } else {
                        if (_0x18b0('0x24') === _0x18b0('0x24')) {
                            _0x254e2a = _0x2bf0d7[0x1][_0x18b0('0x25')]('|')[_0x18b0('0x26')](function (_0x2c6b84) {
                                if (_0x18b0('0x27') === _0x18b0('0x28')) {
                                    _0x2ed326 = error;
                                    AlphaNET[_0x18b0('0xf')](_0x2ed326, _0x18b0('0x29'));
                                } else {
                                    return Number(_0x2c6b84);
                                }
                            });
                            this[_0x18b0('0x23')](_0x2bf0d7[0x0], _0x254e2a, _0x2bf0d7[0x2] === 'A');
                        } else {
                            return method[_0x18b0('0x2a')](this, ...args);
                        }
                    }
                } else {
                    return;
                }
            } catch (_0x566591) {
                if ('ZcxgY' !== _0x18b0('0x2b')) {
                    _0x2ed326 = _0x566591;
                    AlphaNET[_0x18b0('0xf')](_0x2ed326, 'while\x20read\x20condition\x20excpet\x20or\x20only');
                } else {
                    return;
                }
            }
        }
    };
    _0x271c4a[_0x18b0('0x23')] = function (_0x8b77c4, _0x5aa550 = null, _0x4f81b5 = ![]) {
        var _0x249d30, _0x40141c;
        _0x249d30 = Network['isHost']();
        if (_0x5aa550 != null) {
            if (_0x18b0('0x2c') !== 'njpJE') {
                cmd = this[_0x18b0('0x2d')][index];
                if (cmd[_0x18b0('0x15')] === 0x164) {
                    return cmd[_0x18b0('0x16')][0x0] === _0x18b0('0x2e');
                }
            } else {
                _0x40141c = !_0x4f81b5 ? NetPartyManager[_0x18b0('0x1f')]() : NetPartyManager[_0x18b0('0x20')]();
                _0x249d30 = _0x5aa550[_0x18b0('0x2f')](_0x40141c);
            }
        }
        if (_0x249d30 && _0x8b77c4 === _0x18b0('0x30')) {
            this[_0x18b0('0x9')]++;
        }
        if (!_0x249d30 && _0x8b77c4 === _0x18b0('0x21')) {
            this['_index']++;
        }
    };
    _0x271c4a[_0x18b0('0x31')] = function (_0x55b7b0) {
        if (_0x18b0('0x32') === _0x18b0('0x32')) {
            var _0x8f89ba, _0x42fc52;
            try {
                _0x8f89ba = this[_0x18b0('0x2d')][_0x55b7b0];
                if (_0x8f89ba[_0x18b0('0x15')] === 0x164) {
                    return _0x8f89ba[_0x18b0('0x16')][0x0] === 'NET\x20sync';
                }
            } catch (_0x55bc68) {
                if (_0x18b0('0x33') !== _0x18b0('0x34')) {
                    _0x42fc52 = _0x55bc68;
                    AlphaNET['error'](_0x42fc52, _0x18b0('0x29'));
                } else {
                    AlphaNET['warning'](_0x18b0('0x35'));
                }
            }
            return ![];
        } else {
            return Number(item);
        }
    };
    _0x271c4a['_startCommandOnlyInSharedMode'] = function (_0x10f0b4, _0x26e40f) {
        if (_0x18b0('0x36') !== _0x18b0('0x37')) {
            if (!Network[_0x18b0('0x19')]()) {
                return _0x10f0b4[_0x18b0('0x2a')](this, ..._0x26e40f);
            } else {
                if (Network['isMultiMode']()) {
                    return _0x10f0b4[_0x18b0('0x2a')](this, ..._0x26e40f);
                } else {
                    if (this['_network']['isShared']()) {
                        return _0x10f0b4['call'](this, ..._0x26e40f);
                    } else {
                        AlphaNET[_0x18b0('0x38')](_0x18b0('0x35'));
                    }
                }
            }
            return !![];
        } else {
            return this[_0x18b0('0x6')]();
        }
    };
    _0x271c4a[_0x18b0('0x39')] = function () {
        var _0x566a59;
        if (this[_0x18b0('0x3a')][_0x18b0('0x3b')]()) {
            if (_0x18b0('0x3c') !== 'euyjL') {
                return event[_0x18b0('0xe')];
            } else {
                return;
            }
        }
        _0x566a59 = this[_0x18b0('0x3d')]();
        if (_0x566a59 == null) {
            if (_0x18b0('0x3e') === _0x18b0('0x3f')) {
                return;
            } else {
                return;
            }
        }
        if (!this['_isSyncCommandRequire'](_0x566a59[_0x18b0('0x15')])) {
            return;
        }
        return this['_sendVirtualCommand'](_0x566a59);
    };
    _0x271c4a['_isSyncCommandRequire'] = function (_0x470bc4) {
        if (_0x18b0('0x40') !== _0x18b0('0x40')) {
            if (this[_0x18b0('0x3a')][_0x18b0('0x3b')]()) {
                return method['call'](this, ...args);
            } else {
                AlphaNET[_0x18b0('0x38')]('This\x20command\x20allowed\x20only\x20in\x20NET\x20shared\x20events');
            }
        } else {
            return _0x44361d[_0x18b0('0x3')](_0x470bc4);
        }
    };
    _0x271c4a['_sendVirtualCommand'] = function (_0x12be6e) {
        if ('ihbyl' === _0x18b0('0x41')) {
            var _0x4aed07, _0x1dc8df;
            _0x1dc8df = NetMessage[_0x18b0('0x42')]();
            _0x4aed07 = NetMessage[_0x18b0('0x14')](_0x12be6e['code']);
            _0x4aed07['parameters'] = _0x12be6e[_0x18b0('0x16')];
            _0x4aed07[_0x18b0('0x17')] = this[_0x18b0('0x4')];
            _0x4aed07[_0x18b0('0x5')] = this[_0x18b0('0x18')];
            _0x1dc8df['setData'](_0x4aed07);
            Network[_0x18b0('0xa')](_0x1dc8df);
        } else {
            return;
        }
    };
    _0x271c4a[_0x18b0('0x43')] = function () {
        if (!Network['isConnected']()) {
            if ('wuJPA' === _0x18b0('0x44')) {
                return;
            } else {
                return;
            }
        }
        if (this[_0x18b0('0x3a')][_0x18b0('0x3b')]()) {
            if (_0x18b0('0x45') === _0x18b0('0x46')) {
                return cmd['parameters'][0x0] === 'NET\x20sync';
            } else {
                return;
            }
        }
        if (this[_0x18b0('0x1')]()) {
            return this['_executeVirtualCommand']();
        }
    };
    _0x271c4a['_executeVirtualCommand'] = function () {
        var _0x50a9ea;
        _0x50a9ea = this[_0x18b0('0x2d')][this['_index'] + 0x1];
        return this['_sendVirtualCommand'](_0x50a9ea);
    };
}());
})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //?[NEW]
    Game_Map.prototype.updateEventsForNetwork = function () {
        this.events().forEach(function (event) {
            event.updateForNetwork();
        });
        //TODO: Можно просто вызывать updateEvents
        //TODO: Сейчас в этой функции не обновляются commonEvents
    };


    //@[ALIAS]
    var _alias_Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function () {
        _alias_Game_Map_update.call(this, ...arguments);
        this._checkSharedEvent();
    };

    //?[NEW]
    Game_Map.prototype._checkSharedEvent = function () {
        if (this._sharedEventData != null) {
            this._sharedEventData.startFromNetwork();
            this._sharedEventData = null;
        }
    };

    //@[ALIAS]
    var _alias_Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function () {
        //console.groupCollapsed('Game_Map_setup');
        _alias_Game_Map_setup.call(this, ...arguments);
        this._sharedEventData = null;
        this._lockedEventsIds = [];
        this._ownedEventIds = [];
        this._isNeedRefreshSpritesForNetwork = false;
        ///console.groupEnd();
    };

    //?[NEW]
    Game_Map.prototype.startEventFromNetwork = function (data) {
        if (data.mapId == this.mapId()) {
            var event = this.event(data.eventId);
            if (event && !$gameMap.isAnyEventStarting()) {
                "DATA PAGE INDEX".p(data.pageIndex);
                event.sharedPageIndex = data.pageIndex;
                this._sharedEventData = event;
            }
        }
    };

    //?[NEW]
    Game_Map.prototype.setLockedEventByNetwork = function (eventId, isLocked = true) {
        if (!eventId || eventId <= 0) return;
        if (!this.event(eventId)) return;
        if (isLocked) {
            "GAME MAP LOCK EVENT".p(eventId);
            this._lockedEventsIds.push(eventId);
        } else {
            "  GAME MAP UNLOCK EVENT".p(eventId);
            this._lockedEventsIds.delete(eventId);
        }
    };

    //?[NEW]
    Game_Map.prototype.isEventLockedByNet = function (eventId) {
        if(this._lockedEventsIds != null)
            return this._lockedEventsIds.includes(eventId);
        return false;
    };

})();
// ■ END Game_Map.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //?[NEW]
    // * Собирает информацию о позициях всех глобальных событий
    Game_Map.prototype.collectDataForNetwork = function () {
        try {
            var eventsForNet = this._getLocalOnlyEvents();
            var dataForNet = [];
            var data;
            eventsForNet.forEach(event => {
                data = event.collectDataForNetwork();
                data.eventId = event.eventId();
                dataForNet.push(data);
            });
            return dataForNet;
        } catch (error) {
            AlphaNET.error(error, ' while try collect event moving data for Network');
            return [];
        }
    };

    //?[NEW]
    // * Обновляет позицию для всех глобальных событий
    Game_Map.prototype.synchronizeFromNetwork = function (netMapData) {
        if (netMapData == null || netMapData.length == 0)
            return;
        var event;
        netMapData.forEach(data => {
            event = this.event(data.eventId);
            if (event != null) {
                if (!event.isOnlyLocalMoveMode()) {
                    event.synchronizeFromNetwork(data);
                }
            }
        });
    };

    //?[NEW]
    Game_Map.prototype.setOwnedEventByNetwork = function (eventId, isOwned = true) {
        if (!eventId || eventId <= 0) return;
        if (!this.event(eventId)) return;
        if (isOwned) {
            "GAME MAP OWNED EVENT".p(eventId);
            this._ownedEventIds.push(eventId);
        } else {
            "  GAME MAP OWNED EVENT".p(eventId);
            this._ownedEventIds.delete(eventId);
        }
    };

    //?[NEW]
    Game_Map.prototype.isEventOwnedByNet = function (eventId) {
        if (this._ownedEventIds != null)
            return this._ownedEventIds.includes(eventId);
        return false;
    };

    //?[NEW]
    Game_Map.prototype.isSpritesRefreshRequestedForNetwork = function () {
        return this._isNeedRefreshSpritesForNetwork;
    };

    //?[NEW]
    Game_Map.prototype.spritesRefreshForNetworkComplete = function () {
        this._isNeedRefreshSpritesForNetwork = false;
    };

    //?[NEW]
    Game_Map.prototype.requestNetworkRefresh = function () {
        this._isNeedRefreshSpritesForNetwork = true;
    };
})();
// ■ END Game_Map_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Map.prototype;
  _._getLocalOnlyEvents = function() {
    return this.events().filter(function(event) {
      return !event.isOnlyLocalMoveMode();
    });
  };
})();

// ■ END Game_Map_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Game_Message_clear6565 = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function () {
        _alias_Game_Message_clear6565.call(this, ...arguments);
        this._isChoiseShared = false;
    };

    //?[NEW]
    Game_Message.prototype.setSharedChoiseMode = function (bool) {
        this._isChoiseShared = bool;
    };

    //?[NEW]
    Game_Message.prototype.isChoiseSharedMode = function () {
        return (this._isChoiseShared == true);
    };
})();
// ■ END Game_Message.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //?[NEW]
    Game_Party.prototype.isMaximumForNetwork = function () {
        return Network.maximumNetworkPlayers == this.size();
    };

    //@[ALIAS]
    var _alias_Game_Party_leader = Game_Party.prototype.leader;
    Game_Party.prototype.leader = function () {
        if (Network.isConnected() && !Network.isHost()) {
            return this._networkLeader();
        } else {
            return _alias_Game_Party_leader.call(this);
        }
    };

    //?[NEW]
    Game_Party.prototype._networkLeader = function () {
        if (Network.myPlayerData != null && Network.myPlayerData.actorId != null)
            return this.memberByActorId(Network.myPlayerData.actorId);
        else
            return this.members()[0];
    };

    //@[ALIAS]
    var _alias_Game_Party_battleMembers = Game_Party.prototype.battleMembers;
    Game_Party.prototype.battleMembers = function () {
        if (Network.isConnected() && Network.isMultiMode()) {
            return this._networkBattleMembers();
        } else
            return _alias_Game_Party_battleMembers.call(this, ...arguments);
    };

    //?[NEW]
    Game_Party.prototype._networkBattleMembers = function () {
        return [this._networkLeader()];
    };

    //?[NEW]
    Game_Party.prototype.memberByActorId = function (actorId) {
        return $gameActors.actor(actorId);
    };

    //?[NEW]
    Game_Party.prototype.memberIndexByActorId = function (actorId) {
        return this.members().findElementIndexByField("_actorId", actorId);
    };

    //?[NEW]
    Game_Party.prototype.refreshForNetwork = function () {
        if(Network.isConnected())
            this.members().forEach(item => item.refresh());
    };

    //?[NEW]
    Game_Party.prototype.getDataForNetwork = function () {
        var itemsData = {
            items: JSON.stringify($gameParty._items),
            weapons: JSON.stringify($gameParty._weapons),
            armors: JSON.stringify($gameParty._armors),
            gold: JSON.stringify($gameParty._gold)
        };
        return itemsData;
    };

    //?[NEW]
    Game_Party.prototype.setDataFromNetwork = function (data) {
        if(data.items != null) {
            $gameParty._items = JSON.parse(data.items);
        }
        if (data.weapons != null) {
            $gameParty._weapons = JSON.parse(data.weapons);
        }
        if (data.gold != null) {
            $gameParty._gold = JSON.parse(data.gold);
        }
        if (data.armors != null)
            this._setArmorsFromNetwork(data.armors);
    };

    // * Отдельный метод для совместимости с YEP плагином
    //?[NEW]
    Game_Party.prototype._setArmorsFromNetwork = function (armors) {
        if (armors != null) {
            $gameParty._armors = JSON.parse(armors);
        }
    };

})();
// ■ END Game_Party.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _Game_Player_prototype_moveStraight = Game_Player.prototype.moveStraight;
    Game_Player.prototype.moveStraight = function (d) {
        _Game_Player_prototype_moveStraight.call(this, d);
        if (Network.isConnected()) {
            var moveData = this._collectDataForNetwork();
            Network.sendMessage(NetMessage.PlayerMoveData().setData(moveData));
        }
    };

    //@[ALIAS]
    var _alias_Game_Player_getOnOffVehicle = Game_Player.prototype.getOnOffVehicle;
    Game_Player.prototype.getOnOffVehicle = function () {
        if (Network.isConnected()) {
            return false;
        } else
            return _alias_Game_Player_getOnOffVehicle.call(this, ...arguments);
    };

    //?[BASE]
    Game_Player.prototype.getNetworkName = function () {
        if (AlphaNET.Parameters.get_ShowNameplatesMode() > 1)
            return $gameParty.leader().name();
    };

    //?[BASE]
    Game_Player.prototype.getNetworkNameStyleId = function () {
        return $gameParty.leader().networkStyleId();
    };

    //@[ALIAS]
    var _alias_Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
    Game_Player.prototype.checkEventTriggerThere = function () {

        _alias_Game_Player_checkEventTriggerThere.call(this, ...arguments);
        //if (Network.isConnected()) {
            //this._checkPvPStartTrigger(); // * Данная проверка теперь вынесена в _updateNetworkActionMenu
        //}
    };

    //?[NEW]
    Game_Player.prototype._checkPvPStartTrigger = function () {
        if (this.canStartLocalEvents() && !$gameMap.isAnyEventStarting()) {
            var direction = this.direction();
            var x = $gameMap.roundXWithDirection(this.x, direction);
            var y = $gameMap.roundYWithDirection(this.y, direction);
            var netPlayer = this.followers().getNetworkPlayerOnPosition(x, y);
            if(netPlayer) {
                //"FINDED PLAYER FOR PVP ".p(netPlayer.netIndex);
                var d2 = netPlayer.direction();
                var canStartPvp = false;
                switch (direction) {
                    case 2:
                        canStartPvp = (d2 == 8);
                        break;
                    case 8:
                        canStartPvp = (d2 == 2);
                        break;
                    case 4:
                        canStartPvp = (d2 == 6);
                        break;
                    case 6:
                        canStartPvp = (d2 == 4);
                        break;
                    default:
                        break;
                }
                if(canStartPvp == true) {
                    if (netPlayer.networkIconId() <= 0) { // * Это довольно не серьёзная проверка
                        //Network.requestPvPBattle(netPlayer.netIndex);
                        //Network.requestTrade(netPlayer.netIndex);
                        this._netPlayerForAction = netPlayer;
                        return true;
                    }
                    //else {
                        //"CHAR IS BUSY!".p();
                    //}
                }
                //else
                //    "WRONG DIRECTION".p();
            }
        }
        this._netPlayerForAction = null;
        return false;
    };

    //@[ALIAS]
    var _alias_Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function () {
        _alias_Game_Player_update.call(this, ...arguments);
        if (this.isMoving() && this._netActionMenuIsVisible == true) {
            NetUIManager.hideActionMenu();
            this._netActionMenuIsVisible = false;
        }
    };

    //@[ALIAS]
    var _alias_Game_Player_updateNonmoving = Game_Player.prototype.updateNonmoving;
    Game_Player.prototype.updateNonmoving = function () {
        _alias_Game_Player_updateNonmoving.call(this, ...arguments);
        if (Network.isConnected()) {
            this._updateNetworkActionMenu();
        }
    };

})();
// ■ END Game_Player.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player Private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Player.prototype;
  _._updateNetworkActionMenu = function() {
    if (this._actionMenuRefreshTimer == null) {
      this._actionMenuRefreshTimer = new AATimer();
      this._actionMenuRefreshTimer.start(30);
    }
    this._actionMenuRefreshTimer.update();
    if (this._actionMenuRefreshTimer.isReady()) {
      this._checkActionMenu();
      return this._actionMenuRefreshTimer.reset();
    }
  };
  _._checkActionMenu = function() {
    if (this._checkPvPStartTrigger()) {
      this._netActionMenuIsVisible = true;
      return NetUIManager.showActionMenu();
    } else {
      this._netActionMenuIsVisible = false;
      return NetUIManager.hideActionMenu();
    }
  };
})();

// ■ END Game_Player Private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Troop.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function () {
        _alias_Game_Troop_setup.call(this, ...arguments);
        this._isPvPTroop = false;
        if (BattleManager.isNetworkBattle()) {
            if (this._uniqueNamesFromNetwork != null) {
                this.setUniqueIdsForEnemies(this._uniqueNamesFromNetwork);
            }
        }
    };

    //?[NEW]
    Game_Troop.prototype.getEnemyByNetId = function (netId) {
        return this.members().find(item => item.uniqueNetworkId() == netId);
    };

    //?[NEW]
    Game_Troop.prototype.setUniqueIdsForEnemies = function (data) {
        var enemies = this.members();
        if (enemies.length > 0) {
            data.forEach((item, index) => enemies[index]._uniqueNetworkId = item);
            this._uniqueNamesFromNetwork = null;
        } else {
            this._uniqueNamesFromNetwork = data;
        }
    };

    //?[NEW]
    Game_Troop.prototype.setupPvPBattle = function (enemyActorId) {
        this.clear();
        this._troopId = 0;
        this._enemies = [];
        var x = 408;
        var y = 436;
        var actorId = enemyActorId;
        var enemy = new AlphaNET.LIBS.Game_EnemyPvP(actorId, x, y);
        this._enemies.push(enemy);
        this._isPvPTroop = true;
    };

    //?[NEW]
    Game_Troop.prototype.isPvPTroop = function () {
        return this._isPvPTroop == true;
    };

    //?[NEW]
    Game_Troop.prototype.rival = function () {
        return this.members()[0];
    };

    //@[ALIAS]
    var _alias_Game_Troop_setupBattleEvent = Game_Troop.prototype.setupBattleEvent;
    Game_Troop.prototype.setupBattleEvent = function () {
        if (this.isPvPTroop() == true) {

        } else 
            _alias_Game_Troop_setupBattleEvent.call(this, ...arguments);    
    };

    //@[ALIAS]
    var _alias_Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
    Game_Troop.prototype.increaseTurn = function () {
        if (this.isPvPTroop() == true) {
            this._turnCount++;
        } else
            _alias_Game_Troop_increaseTurn.call(this, ...arguments);
    };
})();
// ■ END Game_Troop.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ GameChatController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var GameChatController;
  GameChatController = class GameChatController {
    constructor(chatUI) {
      this.chatUI = chatUI;
      this.settings = ANJsonSettings.getChatSettings()[0];
      this.colors = ANJsonSettings.getChatSettings()[3];
      this.chanels = ['ALL', 'MAP'];
      this.posX = this.settings.firstLineMarginX;
      this.posY = this.settings.firstLineMarginY;
      this.maxLines = this.settings.maxLines;
      this.lines = [];
      if ($gameTemp._chatLinesHistory == null) {
        $gameTemp._chatLinesHistory = [];
      }
      this.hiddenMessages = 0;
      this._loadHistoryLines();
      this._loadLines();
    }

    // * Так как чат пересоздаётся, загружаем историю
    _loadHistoryLines() {
      var e, i, j, line, ref;
      try {
        if ($gameTemp._chatLinesHistory.length > 0) {
          for (i = j = 0, ref = $gameTemp._chatLinesHistory.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            line = $gameTemp._chatLinesHistory[i];
            this._addNewLineChat(line[0], line[1].channelId, line[1].text);
          }
          return this.chatUI.drawNotify(0);
        }
      } catch (error) {
        e = error;
        return ANET.warning('error', e);
      }
    }

    // * Если пришли сообщения, когда была другая сцена
    _loadLines() {
      var e, i, j, line, ref;
      try {
        if ($gameTemp._chatLines.length > 0) {
          for (i = j = 0, ref = $gameTemp._chatLines.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            line = $gameTemp._chatLines[i];
            this.addLine(line[0], line[1]);
          }
          return $gameTemp._chatLines = [];
        }
      } catch (error) {
        e = error;
        return ANET.warning('error', e);
      }
    }

    setUI(chatUI) {
      this.chatUI = chatUI;
    }

    addLine(actorId, chatMessage) {
      var e;
      if (this.chatUI == null) {
        return;
      }
      if (actorId == null) {
        return;
      }
      if (chatMessage == null) {
        return;
      }
      try {
        $gameTemp._chatLinesHistory.push([actorId, chatMessage]);
        this._addNewLineChat(actorId, chatMessage.channelId, chatMessage.text);
        return this._refreshNotify();
      } catch (error) {
        e = error;
        return AlphaNET.error(e, 'when parse chat message from server');
      }
    }

    _addNewLineChat(actorId, channelId, text) {
      var chatLine, first, up;
      chatLine = this._createSprite(actorId, channelId, text);
      this.chatUI.addChatLine(chatLine);
      up = this.settings.spaceBetweenLines;
      this.lines.forEach(function(item) {
        return item.moveUp(up);
      });
      this.lines.push(chatLine);
      if (this.lines.length & 1) {
        chatLine.changeBackOpacity();
      }
      if (this.lines.length >= this.maxLines) {
        first = this.lines.shift();
        this.chatUI.removeLine(first);
        return $gameTemp._chatLinesHistory.shift();
      }
    }

    _createSprite(actorId, channelId, text) {
      var channel, channelColor, chatLine, e, name, nameColor;
      name = "Unknown";
      channel = "ALL";
      try {
        this._myMessage = false;
        name = $gameActors.actor(actorId).name();
        nameColor = this.colors.NameColor;
        if (actorId === $gameParty.leader().actorId()) {
          nameColor = this.colors.UserNameColor;
          this._myMessage = true;
        }
        channel = this.chanels[channelId];
        channelColor = this.colors.ChannelColors[channelId];
      } catch (error) {
        e = error;
        AlphaNET.error(e, 'when parse chat message from server');
      }
      chatLine = new AlphaNET.LIBS.SpriteChatLine();
      chatLine.drawChannel(channel, channelColor);
      chatLine.drawName(name, nameColor);
      chatLine.drawText(text);
      chatLine.move(this.settings.lineStartPositionX, this.posY);
      chatLine.moveTo(this.posX);
      return chatLine;
    }

    _refreshNotify() {
      if (!this.chatUI.isOpen()) {
        if (this._myMessage === false) {
          this.hiddenMessages++;
        }
        return this.chatUI.drawNotify(this.hiddenMessages);
      } else {
        return this.hiddenMessages = 0;
      }
    }

    isUnderTouch() {
      return this.chatUI.isUnderTouch() && this.chatUI.visible === true;
    }

    hide() {
      return this.chatUI.visible = false;
    }

    show() {
      return this.chatUI.visible = true;
    }

    isActive() {
      return (this.chatUI != null) && this.chatUI.visible === true;
    }

    update() {
      this._loadLines();
      return this.updateButtonsInput();
    }

    updateButtonsInput() {
      if (this.isActive() === false) {
        return;
      }
      if (Input.isTriggered(ANET.KEYS.CHAT())) {
        if (this.chatUI.isOpen()) {
          this.chatUI.close();
        } else {
          this.chatUI.open();
        }
      }
      if (Input.isTriggered(ANET.KEYS.SAY())) {
        return SceneManager.push(ANET.LIBS.Scene_ChatInput);
      }
    }

  };
  AlphaNET.register(GameChatController);
})();

// ■ END GameChatController.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ HotSeatKeyMapper.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[CLASS IMPL ONLY]

    // * inputType: 1 - Mouse, 2 - Keyboard, null - All
    HotSeatKeyMapper.init = function (inputType, mirror) {
        if (!Utils.isNwjs())
            return;

        this._inputType = inputType;
        this._mirror = mirror; // * Другой маппер
        this._initMapper();
    };

    if (!Utils.isNwjs())
        return;

    Input._setupEventHandlers = function () {
        window.addEventListener('blur', this._onLostFocus.bind(this));
    };

    TouchInput._setupEventHandlers = function () {
        var isSupportPassive = Utils.isSupportPassiveEvent();
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('wheel', this._onWheel.bind(this));
        document.addEventListener('touchstart', this._onTouchStart.bind(this), isSupportPassive ? {
            passive: false
        } : false);
        document.addEventListener('touchmove', this._onTouchMove.bind(this), isSupportPassive ? {
            passive: false
        } : false);
        document.addEventListener('touchend', this._onTouchEnd.bind(this));
        document.addEventListener('touchcancel', this._onTouchCancel.bind(this));
        document.addEventListener('pointerdown', this._onPointerDown.bind(this));
    };

    HotSeatKeyMapper._initMapper = function () {
        document.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup', this._onKeyUp.bind(this));
    };

    HotSeatKeyMapper._onMouseDown = function (eventX) {
        var data = {
            type: 1,
            name: '_onMouseDown',
            event: eventX
        };
        this.map(data);
    };

    HotSeatKeyMapper.map = function (data) {
        if (data.type == 1) {
            this.touchMap(data);
        } else {
            this.keyMap(data);
        }
    };

    HotSeatKeyMapper.touchMap = function (data) {
        if (this.isMouse()) {
            executeFunctionByName(data.name, TouchInput, data.event);
        } else {
            this.sendToMirror(data);
        }
    };

    HotSeatKeyMapper.sendToMirror = function (data) {
        if (this._mirror) {
            this._mirror.map(data);
        }
    };

    HotSeatKeyMapper.keyMap = function (data) {
        if (this.isKeyboard()) {
            executeFunctionByName(data.name, Input, data.event);
        } else {
            this.sendToMirror(data);
        }
    };

    HotSeatKeyMapper._onMouseMove = function (eventX) {
        var data = {
            type: 1,
            name: '_onMouseMove',
            event: eventX
        }
        this.map(data);
    };

    HotSeatKeyMapper._onMouseUp = function (eventX) {
        var data = {
            type: 1,
            name: '_onMouseUp',
            event: eventX
        };
        this.map(data);
    };

    //В event.type записано название типа события
    HotSeatKeyMapper._onKeyDown = function (eventX) {
        var data = {
            type: 2,
            name: '_onKeyDown',
            event: eventX
        };
        this.map(data);
    };

    HotSeatKeyMapper._onKeyUp = function (eventX) {
        var data = {
            type: 2,
            name: '_onKeyUp',
            event: eventX
        };
        this.map(data);
    };

    HotSeatKeyMapper.isKeyboard = function () {
        if (this._inputType == null)
            return true;
        return this._inputType == 2;
    };

    HotSeatKeyMapper.isMouse = function () {
        if (this._inputType == null)
            return true;
        return this._inputType == 1;
    };

    HotSeatKeyMapper.myType = function () {
        return this._inputType;
    };

    HotSeatKeyMapper.isMyType = function (data) {
        if (this.myType() == null)
            return true;
        return this.myType() == data.type;
    };
})();
// ■ END HotSeatKeyMapper.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Image_Manager_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){

    //?[NEW]
    ImageManager.loadNetwork = function (filename, hue) {
        return this.loadBitmap('img/network/', filename, hue, false);
    };
    
})();
// ■ END Image_Manager_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0xeb19 = [
    'left',
    'style',
    'textShadow',
    'fontSize',
    '20px',
    'zIndex',
    '400px',
    'absolute',
    'uKEzi',
    'kLtyV',
    '<font\x20color=\x22white\x22>',
    '</font><br>',
    'innerHTML',
    'clear',
    '_createErrorPrinter',
    'call',
    'create',
    '_infoPrinter',
    'createElement',
    'body',
    'appendChild',
    'setup',
    'width',
    'height',
    'textAlign'
];
(function (_0x363f73, _0x215334) {
    var _0x472b6a = function (_0x3cb2ce) {
        while (--_0x3cb2ce) {
            _0x363f73['push'](_0x363f73['shift']());
        }
    };
    _0x472b6a(++_0x215334);
}(_0xeb19, 0xbd));
var _0x1546 = function (_0x4adc7d, _0x25f49c) {
    _0x4adc7d = _0x4adc7d - 0x0;
    var _0x591923 = _0xeb19[_0x4adc7d];
    return _0x591923;
};
(function () {
    var _0x23a580;
    _0x23a580 = Graphics[_0x1546('0x0')];
    Graphics[_0x1546('0x0')] = function () {
        _0x23a580[_0x1546('0x1')](this);
        return InfoPrinter['create']();
    };
    InfoPrinter[_0x1546('0x2')] = function () {
        InfoPrinter[_0x1546('0x3')] = document[_0x1546('0x4')]('p');
        InfoPrinter[_0x1546('0x3')]['id'] = 'InfoPrinter';
        InfoPrinter['setup']();
        return document[_0x1546('0x5')][_0x1546('0x6')](InfoPrinter[_0x1546('0x3')]);
    };
    InfoPrinter[_0x1546('0x7')] = function () {
        var _0x356459;
        _0x356459 = InfoPrinter[_0x1546('0x3')];
        _0x356459[_0x1546('0x8')] = Graphics['_width'] * 0.8;
        _0x356459[_0x1546('0x9')] = 0x64;
        _0x356459['style'][_0x1546('0xa')] = _0x1546('0xb');
        _0x356459[_0x1546('0xc')][_0x1546('0xd')] = '1px\x201px\x203px\x20#000';
        _0x356459['style'][_0x1546('0xe')] = _0x1546('0xf');
        _0x356459[_0x1546('0xc')][_0x1546('0x10')] = 0x46;
        _0x356459[_0x1546('0xc')]['width'] = '400px';
        _0x356459[_0x1546('0xc')][_0x1546('0x9')] = _0x1546('0x11');
        return _0x356459[_0x1546('0xc')]['position'] = _0x1546('0x12');
    };
    InfoPrinter['p'] = function (_0x2a8504) {
        var _0x57ee6b;
        if (InfoPrinter[_0x1546('0x3')] == null) {
            if (_0x1546('0x13') !== _0x1546('0x14')) {
                return;
            } else {
                InfoPrinter[_0x1546('0x3')] = document[_0x1546('0x4')]('p');
                InfoPrinter['_infoPrinter']['id'] = 'InfoPrinter';
                InfoPrinter[_0x1546('0x7')]();
                return document[_0x1546('0x5')][_0x1546('0x6')](InfoPrinter[_0x1546('0x3')]);
            }
        }
        _0x57ee6b = _0x1546('0x15') + _0x2a8504 + _0x1546('0x16');
        InfoPrinter[_0x1546('0x3')][_0x1546('0x17')] = _0x57ee6b;
    };
    InfoPrinter[_0x1546('0x18')] = function () {
        if (InfoPrinter[_0x1546('0x3')] == null) {
            return;
        }
        InfoPrinter['_infoPrinter'][_0x1546('0x17')] = '';
    };
}());
})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Input.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    ///INPUT
    var i, j;
    Input.KeyMapperNET = {};
    //Numbers
    for (i = j = 48; j <= 57; i = ++j) {
        Input.KeyMapperNET[i] = String.fromCharCode(i);
    }
    //Numbers NUM LOCK
    for (i = j = 96; j <= 105; i = ++j) {
        Input.KeyMapperNET[i] = 'Numpad' + String(i - 96);
    }

    Input.KeyMapperNET[8] = 'Backspace';
    Input.KeyMapperNET[190] = '.';
    Input.KeyMapperNET[110] =  'NumpadDecimal';

    var alias_atbs_input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function (event) {
        alias_atbs_input_onKeyDown.call(this, event);
        if (event.code && event.code.contains('Numpad')) {
            Input._setStateWithMapperMYP(event.keyCode);
            return;
        }
        if (Input.keyMapper[event.keyCode]) {
            return;
        }
        Input._setStateWithMapperMYP(event.keyCode);
    };

    Input._setStateWithMapperMYP = function (keyCode, state = true) {
        var symbol;
        symbol = Input.KeyMapperNET[keyCode];
        if (symbol != null) {
            this._currentState[symbol] = state;
        }
    };

    var alias_atbs_input_onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function (event) {
        alias_atbs_input_onKeyUp.call(this, event);
        if (event.code && event.code.contains('Numpad')) {
            Input._setStateWithMapperMYP(event.keyCode, false);
            return;
        }
        Input._setStateWithMapperMYP(event.keyCode, false);
    };
})();
// ■ END Input.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0x2987 = [
    'nXdrS',
    'command901',
    'CMD\x20900\x20run',
    '_collectEventBasicDataForNetwork',
    'WAIT_PLAYER',
    'pageIndex',
    'sendMessage',
    'setRepeat',
    'RegisterOnSharedEvent',
    'setData',
    'line',
    'RegisterOnSharedEventSync',
    '_shared',
    '_lineSyncIndex',
    '_waitNetCount',
    'isStartedOutside',
    '_startedOutside',
    'isShared',
    'isNeedLineSync',
    'resetWait',
    'setup',
    '_event',
    'FnedL',
    'isNetworkSharedMode',
    'HEBpw',
    'jSvoZ',
    '_list',
    '_insertNetShareCommand',
    '_prepareEventListForNet',
    '_insertNetCommand',
    'CMD_SHARE',
    'index',
    '_isNetCommandExists',
    'splice',
    'code',
    'length',
    'yPaCD',
    '_prepareList_replaceSyncCommand',
    'push',
    'event',
    '_prepareSharedEvent',
    'parameters',
    'contains',
    '_insertNetSyncCommand',
    'CMD_SYNC',
    'startNetwork',
    'isStartedFromNetwork',
    'clearStartFromNetwork',
    'eventId',
    'getLastResponseData',
    'QTLCs',
    '_checkWaitCount',
    'error',
    '_interpreter',
    'OGJAX'
];
(function (_0x172e33, _0x1956a6) {
    var _0x51336d = function (_0x441d89) {
        while (--_0x441d89) {
            _0x172e33['push'](_0x172e33['shift']());
        }
    };
    _0x51336d(++_0x1956a6);
}(_0x2987, 0x1c4));
var _0x1f57 = function (_0x25b48c, _0x450cbd) {
    _0x25b48c = _0x25b48c - 0x0;
    var _0x55c78e = _0x2987[_0x25b48c];
    return _0x55c78e;
};
var InterpreterNET;
InterpreterNET = class InterpreterNET {
    constructor() {
        this['_startedOutside'] = ![];
        this[_0x1f57('0x0')] = ![];
        this[_0x1f57('0x1')] = -0x1;
        this[_0x1f57('0x2')] = 0x0;
    }
    [_0x1f57('0x3')]() {
        return this[_0x1f57('0x4')] === !![];
    }
    [_0x1f57('0x5')]() {
        return this['_shared'] === !![];
    }
    [_0x1f57('0x6')]() {
        return this[_0x1f57('0x1')] >= 0x0;
    }
    [_0x1f57('0x7')]() {
        return this['_waitNetCount'] = 0x0;
    }
    [_0x1f57('0x8')](_0x449d89, _0x5c600d) {
        this[_0x1f57('0x9')] = $gameMap['event'](_0x449d89);
        if (this[_0x1f57('0x9')] == null) {
            if ('FnedL' !== _0x1f57('0xa')) {
                return this[_0x1f57('0x1')] >= 0x0;
            } else {
                return;
            }
        }
        this[_0x1f57('0x0')] = this[_0x1f57('0x9')][_0x1f57('0xb')]();
        if (this[_0x1f57('0x5')]()) {
            if (_0x1f57('0xc') === _0x1f57('0xd')) {
                return this['_prepareSharedEvent'](_0x5c600d);
            } else {
                return this['_prepareSharedEvent'](_0x5c600d);
            }
        }
    }
    ['_prepareSharedEvent'](_0xe0fdae) {
        this[_0x1f57('0xe')] = _0xe0fdae;
        this[_0x1f57('0xf')]();
        return this[_0x1f57('0x10')]();
    }
    [_0x1f57('0xf')]() {
        return this[_0x1f57('0x11')]({
            'index': 0x0,
            'replace': ![],
            'code': InterpreterNET[_0x1f57('0x12')]
        });
    }
    [_0x1f57('0x11')](_0x3a79bc) {
        var _0x145814, _0x1d90c2;
        _0x145814 = _0x3a79bc[_0x1f57('0x13')] || 0x0;
        _0x1d90c2 = _0x3a79bc['replace'];
        if (this[_0x1f57('0x14')](_0x145814, _0x3a79bc['code'])) {
            return;
        }
        return this[_0x1f57('0xe')][_0x1f57('0x15')](_0x145814, _0x1d90c2, {
            'code': _0x3a79bc[_0x1f57('0x16')],
            'indent': 0x0,
            'parameters': []
        });
    }
    ['_isNetCommandExists'](_0xc51a8f, _0x30e310) {
        return this[_0x1f57('0xe')][_0xc51a8f]['code'] === _0x30e310;
    }
    [_0x1f57('0x10')]() {
        var _0x316243, _0xad4c32;
        _0x316243 = this[_0x1f57('0xe')][_0x1f57('0x17')] - 0x1;
        _0xad4c32 = [];
        while (_0x316243 >= 0x0) {
            if (_0x1f57('0x18') !== 'aygwY') {
                this[_0x1f57('0x19')](_0x316243);
                _0xad4c32[_0x1f57('0x1a')](_0x316243--);
            } else {
                this[_0x1f57('0x9')] = $gameMap[_0x1f57('0x1b')](eventId);
                if (this['_event'] == null) {
                    return;
                }
                this['_shared'] = this[_0x1f57('0x9')][_0x1f57('0xb')]();
                if (this[_0x1f57('0x5')]()) {
                    return this[_0x1f57('0x1c')](list);
                }
            }
        }
        return _0xad4c32;
    }
    [_0x1f57('0x19')](_0xa31e95) {
        var _0x540e94;
        _0x540e94 = this[_0x1f57('0xe')][_0xa31e95];
        if (_0x540e94[_0x1f57('0x16')] !== 0x164) {
            return;
        }
        if (!_0x540e94[_0x1f57('0x1d')][0x0][_0x1f57('0x1e')]('NET\x20sync')) {
            return;
        }
        this['_insertNetSyncCommand'](_0xa31e95);
    }
    [_0x1f57('0x1f')](_0x473e7b) {
        return this[_0x1f57('0x11')]({
            'index': _0x473e7b,
            'replace': !![],
            'code': InterpreterNET[_0x1f57('0x20')]
        });
    }
    [_0x1f57('0x21')]() {
        if (!this['isShared']()) {
            return;
        }
        this[_0x1f57('0x4')] = this[_0x1f57('0x9')][_0x1f57('0x22')]();
        return this['_event'][_0x1f57('0x23')]();
    }
    ['updateWaitMode']() {
        var _0x317f60, _0x2e4644;
        _0x2e4644 = this['_event'][_0x1f57('0x24')]();
        _0x317f60 = Network[_0x1f57('0x25')]();
        if (this[_0x1f57('0x5')]()) {
            if ('NeGGZ' === _0x1f57('0x26')) {
                return;
            } else {
                this[_0x1f57('0x27')](_0x317f60);
            }
        }
        if (_0x317f60 === -0x64) {
            Network[_0x1f57('0x28')]('', 'Server\x20wait\x20error,\x20code\x20-\x20100');
            $gameMap[_0x1f57('0x29')]['_index'] = 0x64;
            return ![];
        }
        return !(Network[_0x1f57('0x25')]() === _0x2e4644);
    }
    [_0x1f57('0x27')](_0x3f97b7) {
        if (_0x3f97b7 == null) {
            if (_0x1f57('0x2a') === _0x1f57('0x2b')) {
                var _0x1b9fab;
                _0x1b9fab = this[_0x1f57('0xe')][index];
                if (_0x1b9fab['code'] !== 0x164) {
                    return;
                }
                if (!_0x1b9fab[_0x1f57('0x1d')][0x0][_0x1f57('0x1e')]('NET\x20sync')) {
                    return;
                }
                this[_0x1f57('0x1f')](index);
            } else {
                this[_0x1f57('0x2')] += 0x1;
            }
        }
        if (this[_0x1f57('0x2')] >= 0x3c) {
            this['resetWait']();
            return this[_0x1f57('0x2c')]();
        }
    }
    ['command900']() {
        var _0x2c1061, _0x57c8aa;
        _0x1f57('0x2d')['p']();
        _0x2c1061 = this[_0x1f57('0x9')][_0x1f57('0x2e')]();
        _0x57c8aa = Network[_0x1f57('0x2f')];
        if (!this[_0x1f57('0x3')]()) {
            _0x2c1061[_0x1f57('0x30')] = this['_event']['findProperPageIndex']();
            Network[_0x1f57('0x31')](NetMessage['StartSharedEvent']()[_0x1f57('0x32')](_0x57c8aa)['setData'](_0x2c1061));
        } else {
            Network[_0x1f57('0x31')](NetMessage[_0x1f57('0x33')]()[_0x1f57('0x32')](_0x57c8aa)[_0x1f57('0x34')](_0x2c1061));
        }
        return !![];
    }
    [_0x1f57('0x2c')](_0x5ae29f) {
        var _0x2122e5, _0x196c90;
        'CMD\x20901\x20run'['p']();
        _0x2122e5 = this[_0x1f57('0x9')]['_collectEventBasicDataForNetwork']();
        _0x2122e5[_0x1f57('0x35')] = _0x5ae29f;
        _0x196c90 = Network['WAIT_PLAYER'];
        Network[_0x1f57('0x31')](NetMessage[_0x1f57('0x36')]()[_0x1f57('0x32')](_0x196c90)[_0x1f57('0x34')](_0x2122e5));
        return !![];
    }
};
InterpreterNET['CMD_SHARE'] = 0x384;
InterpreterNET['CMD_SYNC'] = 0x385;
AlphaNET['register'](InterpreterNET);
})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MakerManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[CLASS IMPL ONLY]

    Object.defineProperty(MakerManager, 'childWindow', {
        get: function () {
            return this._childWindow;
        },
        configurable: true
    });

    MakerManager.initManager = function () {
        this._childWindow = null;
        HotSeatKeyMapper.init(null, null);
    };

    MakerManager.setupGameWindow = function () {
        var win = nw.Window.get();
        win.removeAllListeners('close');
        win.on('close', this.onWindowClose.bind(win));

        win.removeAllListeners('restore');
        win.removeAllListeners('focus');
        win.removeAllListeners('minimize');

        win.on('focus', function () {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.restore();
            }
        });
        win.on('restore', function () {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.restore();
            }
        });
        win.on('minimize', function () {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.minimize();
            }
        });

        win.removeAllListeners('move');
        win.on('move', function (x, y) {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.x = x + Graphics.width + 8;
                MakerManager.childWindow.y = y;
            }
        });

    };

    MakerManager.openMaker = function () {
        if (!Utils.isNwjs())
            return;
        if (MakerManager._childWindow == null) {
            HotSeatKeyMapper.init(1, null);
            this.setupGameWindow();
            this.createWindow();
            Network.setHotGame(true);
        }
        else {
            MakerManager.closeMaker();
            MakerManager.deleteMaker();
            MakerManager.openMaker();
        }
    };

    MakerManager.createWindow = function () {
        var win = nw.Window.get();
        var filename = 'www/index.html';
        if (Utils.isOptionValid('test')) {
            filename = 'index.html';
        }
        nw.Window.open(filename, {
            width: win.width - 2,
            height: win.height,
            resizable: false,
            show_in_taskbar: false,
            new_instance: false
        }, function (new_win) {
            MakerManager._childWindow = new_win;
            new_win.on('loaded', this._onWindowCreated.bind(this));
        }.bind(this));
    };

    MakerManager._onWindowCreated = function () {
        this._moveWindow();
        this._setupWindow();
    };

    MakerManager._moveWindow = function () {
        window.moveBy(-400, 0);
        this._childWindow.moveTo(window.screenX + Graphics.boxWidth + 8, window.screenY);
    };

    MakerManager._setupWindow = function () {
        this._childWindow.on('closed', this.deleteMaker.bind(this));
        this._childWindow.on('close', this.closeMaker.bind(this));

        var mapper = this._childWindow.window.HotSeatKeyMapper;
        this._childWindow.window.Network.setHotGame(true);
        // * Пока что чат не будет работать в режиме SplitScreen
        NetUIManager.hideChat();
        HotSeatKeyMapper._mirror = mapper;
        mapper.init(2, HotSeatKeyMapper);
    };

    MakerManager.onWindowClose = function () {
        MakerManager.closeTheWindows.call(this);
    };

    MakerManager.closeMaker = function () {
        HotSeatKeyMapper.init(null, null);
        Network.setHotGame(false);
        this._childWindow.close(true);
    };

    MakerManager.deleteMaker = function () {
        this._childWindow = null;
    };

    MakerManager.closeTheWindows = function () {
        if (MakerManager.childWindow)
            MakerManager.childWindow.close(true);
        this.close(true);
    };

})();
// ■ END MakerManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessage.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[GLOBAL]
var NetMessage;

NetMessage = (function() {
  class NetMessage {
    constructor(socket1) {
      this.socket = socket1;
      this.name = "trace";
      this.from = "";
      this.to = "";
      this.data = "";
      this.waited = false;
    }

    setName(name) {
      this.name = name;
      return this;
    }

    setTo(socketId) {
      this.to = socketId;
      return this;
    }

    setFrom(socketId) {
      this.from = socketId;
      return this;
    }

    setData(data) {
      this.data = data;
      return this;
    }

    setWait(symbol) {
      this.waited = true;
      Network.waitServerResponse(this, symbol);
      return this;
    }

    setRepeat(symbol) {
      this.waited = true;
      Network.waitServerResponseRepeated(this, symbol);
      return this;
    }

    send(data) {
      this.socket.emit(this.name, this._makeData(data));
      return this;
    }

    broadcast(data) {
      return this.socket.broadcast.emit(this.name, this._makeData(data));
    }

    _makeData(data = null) {
      var netData;
      netData = {};
      if (data == null) {
        data = this.data;
      } else {
        this.data = data;
      }
      netData.data = data;
      netData.from = this.from;
      netData.to = this.to;
      netData.waited = this.waited;
      return netData;
    }

    static Setup(socket) {
      return NetMessage.Socket = socket;
    }

    static PlayerDisconnect(socket) {
      return this.EmptyMessage(socket).setName('playerDisconnect');
    }

    static PlayerConnect(socket) {
      return this.EmptyMessage(socket).setName('playerConnect');
    }

    static HostResponse(socket) {
      return this.EmptyMessage(socket).setName('host').setFrom('server');
    }

    static AlertMessage(socket) {
      return this.EmptyMessage(socket).setFrom('server').setName('alertMessage');
    }

    static EmptyMessage(socket = null) {
      var msg, targetSocket;
      targetSocket = socket;
      if (socket == null) {
        targetSocket = this.Socket;
      }
      msg = new NetMessage(targetSocket);
      if (targetSocket != null) {
        msg.setFrom(targetSocket.id);
      }
      return msg;
    }

    static CreateSubMessageData(id) {
      var data;
      return data = {
        id: id
      };
    }

  };

  NetMessage.Socket = null;

  return NetMessage;

}).call(this);

AlphaNET.register(NetMessage);

// ■ END NetMessage.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessages.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _CM, _M;
  //@[DEFINES]
  _M = NetMessage;
  _CM = function(socket, name) {
    return _M.EmptyMessage(socket).setName(name);
  };
  //?INITIAL
  _M.RequestPlayerData = function(_) {
    return _CM(_, 'requestInitialPlayerData');
  };
  _M.PlayerDataResponse = function(_) {
    return _CM(_, 'responsePlayerData');
  };
  _M.PlayersTableResponse = function(_) {
    return _CM(_, 'playersTableResponse');
  };
  _M.HostGameMapId = function(_) {
    return _CM(_, 'hostGameMapId');
  };
  _M.GameMapEventsDataResponse = function(_) {
    return _CM(_, 'gameMapEventsDataResponse');
  };
  _M.RequestGameMapEventsData = function(_) {
    return _CM(_, 'requestGameMapEventsData');
  };
  //?PLAYERS
  _M.PlayerMoveData = function(_) {
    return _CM(_, 'playerMove');
  };
  _M.PlayerNetIcon = function(_) {
    return _CM(_, 'playerIcon');
  };
  _M.PlayerNetActorData = function(_) {
    return _CM(_, 'playerNetActorData');
  };
  _M.PlayerNetItemsData = function(_) {
    return _CM(_, 'playerNetItemsData');
  };
  _M.PlayerWorldData = function(_) {
    return _CM(_, 'playerWorldData');
  };
  _M.GlobalWorldData = function(_) {
    return _CM(_, 'globalWorldData');
  };
  _M.PlayerNetMapData = function(_) {
    return _CM(_, 'playerNetCurrentMapData');
  };
  _M.PlayerChangeMap = function(_) {
    return _CM(_, 'playerChangeMap');
  };
  _M.SetOwner = function(_) {
    return _CM(_, 'setMapOwner');
  };
  
  //?PVP
  _M.RequestPvP = function(_) {
    return _CM(_, 'requestPvPWithAnotherPlayer');
  };
  _M.StartPvPBattle = function(_) {
    return _CM(_, 'startPvPWithAnotherPlayer');
  };
  
  //?TRADE
  _M.RequestTrade = function(_) {
    return _CM(_, 'requestTradeWithAnotherPlayer');
  };
  _M.TradeReady = function(_) {
    return _CM(_, 'tradeReady');
  };
  _M.TradeItems = function(_) {
    return _CM(_, 'tradeItems');
  };
  _M.StartTrade = function(_) {
    return _CM(_, 'startTradeWithAnotherPlayer');
  };
  _M.AbortTrade = function(_) {
    return _CM(_, 'abortTradeWithAnotherPlayer');
  };
  //?EVENTS
  _M.MapEventMoveData = function(_) {
    return _CM(_, 'mapEventMove');
  };
  _M.SyncEvent = function(_) {
    return _CM(_, 'mapEventSync');
  };
  _M.LockEvent = function(_) {
    return _CM(_, 'mapEventLock');
  };
  _M.OwnEvent = function(_) {
    return _CM(_, 'mapEventOwn');
  };
  _M.StartSharedEvent = function(_) {
    return _CM(_, 'startSharedEvent');
  };
  _M.RegisterOnSharedEvent = function(_) {
    return _CM(_, 'registerOnSharedEvent');
  };
  _M.RegisterOnSharedEventSync = function(_) {
    return _CM(_, 'registerOnSharedEventSync');
  };
  _M.VirtualInterpreter = function(_) {
    return _CM(_, 'virtualInterpreter');
  };
  //?COMMUNICATION
  _M.SendChatMessage = function(_) {
    return _CM(_, 'chatMessage');
  };
  //?WINDOWS
  _M.WindowSelect = function(_) {
    return _CM(_, 'window_select_data');
  };
  //?BATTLE
  _M.BattleInputCommand = function(_) {
    return _CM(_, 'battle_inputCommand');
  };
  _M.BattleBattlerRefreshData = function(_) {
    return _CM(_, 'battle_refreshData');
  };
  _M.BattleAction = function(_) {
    return _CM(_, 'battle_action');
  };
  _M.BattleManager = function(_) {
    return _CM(_, 'battle_manager');
  };
  _M.BattleManagerPvP = function(_) {
    return _CM(_, 'battle_manager_pvp');
  };
  //?GLOBAL
  _M.OnWaitResponse = function(_) {
    return _CM(_, 'onWaitResponse');
  };
  _M.RequestSync = function(_) {
    return _CM(_, 'requestSync');
  };
  //?API
  _M.CallUApi = function(_) {
    return _CM(_, 'callUApi');
  };
  //?{TEST}
  _M.TempMessage = function(_) {
    return _CM(_, 'tempMessage');
  };
})();

// ■ END NetMessages.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetParameters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetParameters;
  // * Если параметры не были загружены, будет возвращять стандартные значения автоматически
  NetParameters = class NetParameters extends KDCore.ParametersManager {
    constructor() {
      super('Alpha NET');
    }

    get_actorsForPlayers() {
      var name;
      if (this.isLoaded()) {
        name = 'ActorsForPlayers';
        return this.getFromCacheOrInit(name, function() {
          var obj;
          try {
            obj = this.getString(name);
            return obj.split(',').map(function(i) {
              return Number(i);
            });
          } catch (error) {
            AlphaNET.warning('wrong plugin parameter Actors for players');
            return [1, 2];
          }
        });
      } else {
        return [1, 2, 3, 4];
      }
    }

    isMultiGameMode() {
      var name;
      if (!this.isLoaded()) {
        return false;
      }
      name = 'GameMode';
      return this.getFromCacheOrInit(name, function() {
        var obj;
        try {
          obj = this.getString(name);
          if (obj === 'Multiplayer') {
            return true;
          }
          return false;
        } catch (error) {
          AlphaNET.warning('wrong plugin parameter: Game Mode');
          return false;
        }
      });
    }

    load_CommonEventsForNetwork() {
      if (!this.isLoaded()) {
        return;
      }
      try {
        Network.commonEventOnServerStarted = this.getNumber("ServerStarted");
        Network.commonEventOnConnectToServer = this.getNumber("OnConnect");
        Network.commonEventOnDisconectFromServer = this.getNumber("OnDisconect");
        Network.commonEventOnOtherClientConnected = this.getNumber("OnOtherCon");
        Network.commonEventOnOtherClientDisconected = this.getNumber("OnOtherDisc");
        Network.commonEventOnPvPBattleEnd = this.getNumber("OnPvPEnd");
      } catch (error) {
        return AlphaNET.warning('wrong plugin parameters for network common events');
      }
    }

    get_ShowNameplatesMode() {
      var name;
      if (!this.isLoaded()) {
        return 1;
      }
      name = 'NameplatesMode';
      return this.getFromCacheOrInit(name, function() {
        var obj;
        try {
          obj = this.getString(name);
          if (obj === 'Others') {
            return 1;
          }
          if (obj === 'All') {
            return 2;
          }
          return 0; // * Never
        } catch (error) {
          AlphaNET.warning('wrong plugin parameter: Nameplate display mode');
          return 0;
        }
      });
    }

    isChatUsing() {
      var name;
      if (!this.isLoaded()) {
        return true;
      }
      name = 'UseInGameChat';
      return this.getFromCacheOrInit(name, function() {
        try {
          return this.getBoolean(name);
        } catch (error) {
          AlphaNET.warning('wrong plugin parameter: Use in-game chat');
          return true;
        }
      });
    }

  };
  AlphaNET.register(NetParameters);
  AlphaNET.Parameters = new NetParameters();
  ANET.P = AlphaNET.Parameters;
})();

// ■ END NetParameters.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var _0x5ec9 = [
    'iSeGE',
    'mapId',
    'PlayerNetMapData',
    'getMyActorDataForNetwork',
    'LKdgm',
    'rbQXu',
    'memberByActorId',
    'stringify',
    'onActorDataFromNetwork',
    'GGZlV',
    'rDsZq',
    'VILsV',
    'qrpZv',
    'requestRefresh',
    'requestNetworkRefresh',
    'DtZSL',
    'first',
    'findElementByField',
    'onActroItemsFromNetwork',
    'LXBZk',
    'MrSPa',
    'zPVlM',
    'CLEAR\x20PARTY',
    'members',
    'pEILz',
    'HNJvB',
    'actorId',
    'networkActorsId',
    'push',
    'getActorIdBySocketId',
    'parse',
    '_data',
    'refresh',
    'addActor',
    'xdacB',
    'BgGlW',
    'players',
    'length',
    'sendMessage',
    'PlayerNetActorData',
    'getPlayer',
    'fEJrC',
    'DqWXx',
    'followers',
    'getNetworkCharById',
    'getPlayerByActorId',
    'IyWgd',
    'error',
    'getPlayerSpriteById',
    'getMyActorId',
    'getMe',
    'ZNgHE',
    '_character',
    'netId',
    'getCharById',
    'indexOf',
    'getMyPlayerSprite',
    'pGXJa',
    'myId',
    'isCurrentSceneIsMap',
    'kkZWy',
    'gOPwZ',
    'AlTZT',
    '_scene',
    '_spriteset',
    'KQXpZ',
    'aNsul',
    'forEach',
    'dJvFz',
    'pJuvp',
    'LIBS',
    'NetworkCharacter',
    'setData',
    'while\x20try\x20synchronize\x20actor\x20Data\x20from\x20Network',
    'while\x20try\x20collect\x20actor\x20Data\x20to\x20synchronize',
    'while\x20get\x20character\x20sprite\x20on\x20map',
    'registerNewPlayer',
    'REGISTER\x20PLAYER',
    'NetworkPlayerData',
    'setActorId',
    'delete',
    'removePlayer',
    'REMOVE\x20PLAYER',
    'removeActor',
    'unshift',
    'refreshCharacters',
    'lqPYq',
    'isCurrentSceneIsBattle',
    'YfrVz',
    'NfPAB',
    'isEventRunning',
    'sGsST',
    'setDataFromNetwork',
    'adtZc',
    'safeRefreshCurrentScene',
    'getDataForNetwork',
    'TUJKL',
    'tNDMI',
    'PlayerNetItemsData',
    'synchronizeMapData'
];
(function (_0x3c2cd6, _0x5eb2f8) {
    var _0x4f89fb = function (_0x260e8f) {
        while (--_0x260e8f) {
            _0x3c2cd6['push'](_0x3c2cd6['shift']());
        }
    };
    _0x4f89fb(++_0x5eb2f8);
}(_0x5ec9, 0x7a));
var _0x3e66 = function (_0x54528e, _0x140455) {
    _0x54528e = _0x54528e - 0x0;
    var _0x12ec0a = _0x5ec9[_0x54528e];
    return _0x12ec0a;
};
(function () {
    NetPartyManager['clearParty'] = function () {
        var _0x1fa911, _0x2605ad, _0x1c47c4, _0x2f519b, _0x3b16ab;
        if (Network['myPlayerData'] == null) {
            return;
        }
        _0x3e66('0x0')['p']();
        _0x2f519b = $gameParty[_0x3e66('0x1')]();
        for (_0x1fa911 = _0x2605ad = _0x3b16ab = _0x2f519b['length'] - 0x1; _0x3b16ab <= 0x0 ? _0x2605ad <= 0x0 : _0x2605ad >= 0x0; _0x1fa911 = _0x3b16ab <= 0x0 ? ++_0x2605ad : --_0x2605ad) {
            _0x1c47c4 = _0x2f519b[_0x1fa911];
            if (_0x1c47c4 != null) {
                if (_0x3e66('0x2') !== _0x3e66('0x3')) {
                    $gameParty['removeActor'](_0x1c47c4[_0x3e66('0x4')]());
                    Network[_0x3e66('0x5')][_0x3e66('0x6')](_0x1c47c4[_0x3e66('0x4')]());
                } else {
                    actorId = NetPartyManager[_0x3e66('0x7')](socketId);
                    parsed = JsonEx[_0x3e66('0x8')](data);
                    if ($gameActors[_0x3e66('0x9')][actorId] == null) {
                        return;
                    }
                    $gameActors[_0x3e66('0x9')][actorId] = parsed;
                    NetPartyManager[_0x3e66('0xa')]();
                }
            }
        }
        return $gameParty[_0x3e66('0xb')](NetPartyManager['getMyActorId']());
    };
    NetPartyManager['refreshParty'] = function () {
        if (_0x3e66('0xc') !== _0x3e66('0xd')) {
            var _0x388578, _0x2b210c, _0x424faf;
            for (_0x388578 = _0x2b210c = 0x1, _0x424faf = Network[_0x3e66('0xe')][_0x3e66('0xf')]; 0x1 <= _0x424faf ? _0x2b210c < _0x424faf : _0x2b210c > _0x424faf; _0x388578 = 0x1 <= _0x424faf ? ++_0x2b210c : --_0x2b210c) {
                $gameParty[_0x3e66('0xb')](Network[_0x3e66('0xe')][_0x388578][_0x3e66('0x4')]);
            }
            NetPartyManager['refreshCharacters']();
            return $gameMap['requestNetworkRefresh']();
        } else {
            Network[_0x3e66('0x10')](NetMessage[_0x3e66('0x11')]()['setData'](data));
        }
    };
    NetPartyManager[_0x3e66('0x12')] = function (_0x342133) {
        if (_0x3e66('0x13') === _0x3e66('0x14')) {
            return $gamePlayer[_0x3e66('0x15')]()[_0x3e66('0x16')](_0x342133);
        } else {
            return Network['playerData'](_0x342133);
        }
    };
    NetPartyManager['getPlayerByIndex'] = function (_0x389f3d) {
        return Network[_0x3e66('0xe')][_0x389f3d];
    };
    NetPartyManager[_0x3e66('0x17')] = function (_0xee520) {
        if (_0x3e66('0x18') !== _0x3e66('0x18')) {
            e = error;
            AlphaNET[_0x3e66('0x19')](e, 'while\x20get\x20character\x20sprite\x20on\x20map');
        } else {
            return Network[_0x3e66('0xe')]['findElementByField']('actorId', _0xee520);
        }
    };
    NetPartyManager['getMe'] = function () {
        if ('fEjCz' !== 'SIZvL') {
            return Network['myPlayerData'];
        } else {
            return NetPartyManager[_0x3e66('0x1a')](Network['myId']());
        }
    };
    NetPartyManager[_0x3e66('0x1b')] = function () {
        return NetPartyManager[_0x3e66('0x1c')]()[_0x3e66('0x4')];
    };
    NetPartyManager['getHost'] = function () {
        if (_0x3e66('0x1d') === _0x3e66('0x1d')) {
            return NetPartyManager['getPlayerByIndex'](0x0);
        } else {
            if (sprite[_0x3e66('0x1e')][_0x3e66('0x1f')] === netId) {
                return result = sprite;
            }
        }
    };
    NetPartyManager[_0x3e66('0x20')] = function (_0x824377) {
        return $gamePlayer[_0x3e66('0x15')]()[_0x3e66('0x16')](_0x824377);
    };
    NetPartyManager['getMyPlayerIndex'] = function () {
        return Network[_0x3e66('0xe')][_0x3e66('0x21')](NetPartyManager[_0x3e66('0x1c')]()) + 0x1;
    };
    NetPartyManager[_0x3e66('0x22')] = function () {
        if (_0x3e66('0x23') === _0x3e66('0x23')) {
            return NetPartyManager[_0x3e66('0x1a')](Network[_0x3e66('0x24')]());
        } else {
            return;
        }
    };
    NetPartyManager[_0x3e66('0x1a')] = function (_0x56ce56) {
        var _0x4dc9da, _0x441e97, _0x4543b6, _0x20b22a;
        if (!SceneManager[_0x3e66('0x25')]()) {
            if (_0x3e66('0x26') !== _0x3e66('0x26')) {
                return _0x441e97 = sprite;
            } else {
                return null;
            }
        }
        try {
            if (_0x3e66('0x27') !== _0x3e66('0x28')) {
                _0x441e97 = null;
                _0x20b22a = SceneManager[_0x3e66('0x29')][_0x3e66('0x2a')];
                if (_0x20b22a != null) {
                    if ('KQXpZ' === _0x3e66('0x2b')) {
                        _0x4543b6 = _0x20b22a['_characterSprites'];
                        if (_0x4543b6 != null) {
                            if (_0x3e66('0x2c') === _0x3e66('0x2c')) {
                                _0x4543b6[_0x3e66('0x2d')](function (_0x5a9b35) {
                                    if (_0x5a9b35[_0x3e66('0x1e')] != null) {
                                        if (_0x3e66('0x2e') === _0x3e66('0x2f')) {
                                            return;
                                        } else {
                                            if (_0x5a9b35[_0x3e66('0x1e')] instanceof Game_Player) {
                                                if (_0x56ce56 === Network[_0x3e66('0x24')]()) {
                                                    _0x441e97 = _0x5a9b35;
                                                }
                                            }
                                            if (_0x5a9b35['_character'] instanceof AlphaNET[_0x3e66('0x30')][_0x3e66('0x31')]) {
                                                if (_0x5a9b35['_character'][_0x3e66('0x1f')] === _0x56ce56) {
                                                    return _0x441e97 = _0x5a9b35;
                                                }
                                            }
                                        }
                                    }
                                });
                            } else {
                                Network[_0x3e66('0x10')](NetMessage['PlayerNetItemsData']()[_0x3e66('0x32')](itemsData));
                            }
                        }
                    } else {
                        _0x4dc9da = error;
                        AlphaNET[_0x3e66('0x19')](_0x4dc9da, _0x3e66('0x33'));
                    }
                }
                return _0x441e97;
            } else {
                _0x4dc9da = error;
                return AlphaNET['error'](_0x4dc9da, _0x3e66('0x34'));
            }
        } catch (_0x15b2d1) {
            _0x4dc9da = _0x15b2d1;
            AlphaNET[_0x3e66('0x19')](_0x4dc9da, _0x3e66('0x35'));
        }
        return null;
    };
    NetPartyManager[_0x3e66('0x7')] = function (_0x20d0b2) {
        var _0x1db288;
        _0x1db288 = NetPartyManager[_0x3e66('0x12')](_0x20d0b2);
        return _0x1db288['actorId'];
    };
    NetPartyManager[_0x3e66('0x36')] = function (_0x1b7312) {
        var _0x5b4edc, _0x271d6b;
        _0x3e66('0x37')['p'](_0x1b7312);
        _0x271d6b = new AlphaNET['LIBS'][(_0x3e66('0x38'))](_0x1b7312);
        _0x5b4edc = Network[_0x3e66('0x5')]['first']();
        _0x271d6b[_0x3e66('0x39')](_0x5b4edc);
        Network[_0x3e66('0x5')][_0x3e66('0x3a')](_0x5b4edc);
        return Network['players'][_0x3e66('0x6')](_0x271d6b);
    };
    NetPartyManager[_0x3e66('0x3b')] = function (_0x2466a9) {
        var _0xaa51d8;
        _0xaa51d8 = NetPartyManager[_0x3e66('0x12')](_0x2466a9);
        if (_0xaa51d8 == null) {
            return;
        }
        _0x3e66('0x3c')['p'](_0x2466a9);
        Network[_0x3e66('0xe')][_0x3e66('0x3a')](_0xaa51d8);
        $gameParty[_0x3e66('0x3d')](_0xaa51d8[_0x3e66('0x4')]);
        Network[_0x3e66('0x5')][_0x3e66('0x3e')](_0xaa51d8[_0x3e66('0x4')]);
        return NetPartyManager[_0x3e66('0x3f')]();
    };
    NetPartyManager[_0x3e66('0x3f')] = function () {
        if ('lqPYq' === _0x3e66('0x40')) {
            return $gamePlayer[_0x3e66('0x15')]()['refreshNetwork']();
        } else {
            var _0xcfdaa1, _0x256a08, _0x5f1a05, _0x414fbe, _0x398010;
            if (Network['myPlayerData'] == null) {
                return;
            }
            _0x3e66('0x0')['p']();
            _0x414fbe = $gameParty[_0x3e66('0x1')]();
            for (_0xcfdaa1 = _0x256a08 = _0x398010 = _0x414fbe[_0x3e66('0xf')] - 0x1; _0x398010 <= 0x0 ? _0x256a08 <= 0x0 : _0x256a08 >= 0x0; _0xcfdaa1 = _0x398010 <= 0x0 ? ++_0x256a08 : --_0x256a08) {
                _0x5f1a05 = _0x414fbe[_0xcfdaa1];
                if (_0x5f1a05 != null) {
                    $gameParty[_0x3e66('0x3d')](_0x5f1a05[_0x3e66('0x4')]());
                    Network[_0x3e66('0x5')]['push'](_0x5f1a05[_0x3e66('0x4')]());
                }
            }
            return $gameParty[_0x3e66('0xb')](NetPartyManager[_0x3e66('0x1b')]());
        }
    };
    NetPartyManager['synchronize'] = function () {
        var _0x516dec, _0x2212be;
        if (SceneManager[_0x3e66('0x41')]()) {
            if (_0x3e66('0x42') !== _0x3e66('0x43')) {
                return;
            } else {
                return;
            }
        }
        if ($gameMap[_0x3e66('0x44')]()) {
            if (_0x3e66('0x45') === 'tHuMy') {
                if (_0x516dec == null) {
                    return;
                }
                actorId = NetPartyManager['getActorIdBySocketId'](socketId);
                if (_0x516dec != null) {
                    $gameParty[_0x3e66('0x46')](_0x516dec);
                }
                NetPartyManager['refresh']();
            } else {
                return;
            }
        }
        _0x516dec = NetPartyManager['getMyActorDataForNetwork']();
        if (_0x516dec != null) {
            if (_0x3e66('0x47') === 'adtZc') {
                Network[_0x3e66('0x10')](NetMessage[_0x3e66('0x11')]()[_0x3e66('0x32')](_0x516dec));
            } else {
                return SceneManager[_0x3e66('0x48')]();
            }
        }
        _0x2212be = $gameParty[_0x3e66('0x49')]();
        if (_0x2212be != null) {
            if (_0x3e66('0x4a') === _0x3e66('0x4b')) {
                $gameParty[_0x3e66('0x3d')](member[_0x3e66('0x4')]());
                Network[_0x3e66('0x5')][_0x3e66('0x6')](member[_0x3e66('0x4')]());
            } else {
                Network['sendMessage'](NetMessage[_0x3e66('0x4c')]()[_0x3e66('0x32')](_0x2212be));
            }
        }
        if (Network['isMultiMode']()) {
            if ('rdPwV' === 'rdPwV') {
                NetPartyManager[_0x3e66('0x4d')]();
            } else {
                var _0x4a0801;
                _0x4a0801 = NetPartyManager[_0x3e66('0x12')](id);
                if (_0x4a0801 == null) {
                    return;
                }
                _0x3e66('0x3c')['p'](id);
                Network[_0x3e66('0xe')][_0x3e66('0x3a')](_0x4a0801);
                $gameParty['removeActor'](_0x4a0801[_0x3e66('0x4')]);
                Network['networkActorsId'][_0x3e66('0x3e')](_0x4a0801[_0x3e66('0x4')]);
                return NetPartyManager['refreshCharacters']();
            }
        }
    };
    NetPartyManager[_0x3e66('0x4d')] = function () {
        if (_0x3e66('0x4e') !== _0x3e66('0x4e')) {
            return Network[_0x3e66('0xe')][index];
        } else {
            var _0xb66a6b;
            _0xb66a6b = $gameMap[_0x3e66('0x4f')]();
            Network['sendMessage'](NetMessage[_0x3e66('0x50')]()['setData'](_0xb66a6b));
        }
    };
    NetPartyManager[_0x3e66('0x51')] = function () {
        if ('LKdgm' !== _0x3e66('0x52')) {
            var _0x2c92b4;
            _0x2c92b4 = NetPartyManager[_0x3e66('0x12')](_0x5016e5);
            return _0x2c92b4['actorId'];
        } else {
            var _0x845cff, _0x265a94, _0x1ead03, _0x5016e5;
            try {
                if (_0x3e66('0x53') === _0x3e66('0x53')) {
                    _0x5016e5 = NetPartyManager[_0x3e66('0x1b')]();
                    _0x845cff = $gameParty[_0x3e66('0x54')](_0x5016e5);
                    _0x265a94 = JsonEx[_0x3e66('0x55')](_0x845cff);
                    return _0x265a94;
                } else {
                    $gameParty[_0x3e66('0x46')](_0x265a94);
                }
            } catch (_0x58f8ea) {
                _0x1ead03 = _0x58f8ea;
                return AlphaNET[_0x3e66('0x19')](_0x1ead03, 'while\x20try\x20collect\x20actor\x20Data\x20to\x20synchronize');
            }
        }
    };
    NetPartyManager[_0x3e66('0x56')] = function (_0x260d45, _0x324fae) {
        var _0x4f1828, _0x50d28d, _0x1ce752;
        try {
            if (_0x3e66('0x57') !== _0x3e66('0x57')) {
                var _0x304a0e, _0x108ec1, _0x26ccf3;
                try {
                    _0x304a0e = NetPartyManager[_0x3e66('0x7')](_0x260d45);
                    _0x26ccf3 = JsonEx['parse'](_0x324fae);
                    if ($gameActors['_data'][_0x304a0e] == null) {
                        return;
                    }
                    $gameActors[_0x3e66('0x9')][_0x304a0e] = _0x26ccf3;
                    NetPartyManager['refresh']();
                } catch (_0x4dbcc6) {
                    _0x108ec1 = _0x4dbcc6;
                    AlphaNET[_0x3e66('0x19')](_0x108ec1, _0x3e66('0x33'));
                }
            } else {
                _0x4f1828 = NetPartyManager[_0x3e66('0x7')](_0x260d45);
                _0x1ce752 = JsonEx['parse'](_0x324fae);
                if ($gameActors['_data'][_0x4f1828] == null) {
                    return;
                }
                $gameActors[_0x3e66('0x9')][_0x4f1828] = _0x1ce752;
                NetPartyManager[_0x3e66('0xa')]();
            }
        } catch (_0x3987ce) {
            if (_0x3e66('0x58') !== 'TEcUT') {
                _0x50d28d = _0x3987ce;
                AlphaNET[_0x3e66('0x19')](_0x50d28d, _0x3e66('0x33'));
            } else {
                return;
            }
        }
    };
    NetPartyManager[_0x3e66('0xa')] = function () {
        if (_0x3e66('0x59') === 'VILsV') {
            if (SceneManager[_0x3e66('0x25')]()) {
                if (_0x3e66('0x5a') === _0x3e66('0x5a')) {
                    NetPartyManager[_0x3e66('0x3f')]();
                    $gameMap[_0x3e66('0x5b')]();
                } else {
                    var _0x21ecd7, _0x2d2e44, _0x40b248;
                    for (_0x21ecd7 = _0x2d2e44 = 0x1, _0x40b248 = Network['players'][_0x3e66('0xf')]; 0x1 <= _0x40b248 ? _0x2d2e44 < _0x40b248 : _0x2d2e44 > _0x40b248; _0x21ecd7 = 0x1 <= _0x40b248 ? ++_0x2d2e44 : --_0x2d2e44) {
                        $gameParty['addActor'](Network[_0x3e66('0xe')][_0x21ecd7][_0x3e66('0x4')]);
                    }
                    NetPartyManager['refreshCharacters']();
                    return $gameMap[_0x3e66('0x5c')]();
                }
            }
            if (SceneManager['isCurrentSceneIsMenuBased']()) {
                if (_0x3e66('0x5d') === 'YznKK') {
                    var _0xbf7e5c, _0x5d5fb9;
                    _0x3e66('0x37')['p'](id);
                    _0x5d5fb9 = new AlphaNET[(_0x3e66('0x30'))][(_0x3e66('0x38'))](id);
                    _0xbf7e5c = Network[_0x3e66('0x5')][_0x3e66('0x5e')]();
                    _0x5d5fb9[_0x3e66('0x39')](_0xbf7e5c);
                    Network[_0x3e66('0x5')][_0x3e66('0x3a')](_0xbf7e5c);
                    return Network[_0x3e66('0xe')]['push'](_0x5d5fb9);
                } else {
                    return SceneManager[_0x3e66('0x48')]();
                }
            }
        } else {
            return Network[_0x3e66('0xe')][_0x3e66('0x5f')]('actorId', actorId);
        }
    };
    NetPartyManager[_0x3e66('0x60')] = function (_0x2679fb, _0x4ed1df) {
        var _0xd97b17, _0x5c8400;
        try {
            if ('LXBZk' === _0x3e66('0x61')) {
                if (_0x4ed1df == null) {
                    if (_0x3e66('0x62') === _0x3e66('0x63')) {
                        return Network['players'][_0x3e66('0x21')](NetPartyManager[_0x3e66('0x1c')]()) + 0x1;
                    } else {
                        return;
                    }
                }
                _0xd97b17 = NetPartyManager['getActorIdBySocketId'](_0x2679fb);
                if (_0x4ed1df != null) {
                    $gameParty['setDataFromNetwork'](_0x4ed1df);
                }
                NetPartyManager[_0x3e66('0xa')]();
            } else {
                return null;
            }
        } catch (_0x5bfd2a) {
            _0x5c8400 = _0x5bfd2a;
            AlphaNET[_0x3e66('0x19')](_0x5c8400, 'while\x20try\x20synchronize\x20actor\x20Data\x20from\x20Network');
        }
    };
}());
})();

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetPlayerWorldData.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetPlayerWorldData;
  NetPlayerWorldData = class NetPlayerWorldData {
    constructor() {
      this.actorData = null;
      this.actorItems = null;
      this.variablesData = [];
      this.selfSwitchData = [];
      this.switchData = [];
    }

    setActorData(data) {
      return this.actorData = data;
    }

    getActorData() {
      return this.actorData;
    }

    setActorItems(data) {
      return this.actorItems = data;
    }

    getActorItems() {
      return this.actorItems;
    }

    setWorldData(data) {
      var e;
      try {
        this.variablesData = data.variablesData;
        this.switchData = data.switchData;
        return this.selfSwitchData = data.selfSwitchData;
      } catch (error) {
        e = error;
        return Network.error(e, 'while try save World Data for player');
      }
    }

    getWorldDataNetwork() {
      var data;
      return data = {
        variablesData: JSON.stringify(this.variablesData),
        switchData: JSON.stringify(this.switchData),
        selfSwitchData: JSON.stringify(this.selfSwitchData)
      };
    }

    makeSaveContents(actorId) {
      var saveData, world;
      world = {
        variablesData: this.variablesData,
        switchData: this.switchData,
        selfSwitchData: this.selfSwitchData
      };
      saveData = {
        world: world,
        actorItems: this.actorItems,
        actorData: $gameActors._data[actorId]
      };
      return saveData;
    }

  };
  AlphaNET.register(NetPlayerWorldData);
})();

// ■ END NetPlayerWorldData.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetSessionData.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetSessionData;
  NetSessionData = class NetSessionData {
    constructor() {
      this._actorsData = {};
      this._globalData = new AlphaNET.LIBS.NetPlayerWorldData();
    }

    setPlayerActorData(actorId, data) {
      this._checkActorWorldData(actorId);
      //"PLAYER DATA SAVED TO SESSION".p(actorId)
      this.getAllData(actorId).setActorData(data);
    }

    getPlayerActorData(actorId) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).getActorData();
    }

    setPlayerItemsData(actorId, data) {
      this._checkActorWorldData(actorId);
      this.getAllData(actorId).setActorItems(data);
    }

    getPlayerItemsrData(actorId) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).getActorItems();
    }

    hasInfoAbout(actorId) {
      return this._actorsData[actorId] != null;
    }

    getAllData(actorId) {
      return this._actorsData[actorId];
    }

    getGlobalData() {
      return this._globalData;
    }

    setPlayerWorldData(actorId, data) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).setWorldData(data);
    }

    getPlayerWorldData(actorId) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).getWorldData();
    }

    makeSaveContents() {
      var _actorsData, g, item, saveData;
      _actorsData = {};
      for (item in this._actorsData) {
        if (this._actorsData.hasOwnProperty(item)) {
          if (this._actorsData[item].actorData != null) {
            _actorsData[item] = this._actorsData[item].makeSaveContents(item);
          }
        }
      }
      g = this._globalData.makeSaveContents();
      return saveData = {
        global: g,
        actorsData: _actorsData
      };
    }

    extractSaveContents(content) {
      var e, item, results;
      try {
        this._loadDataToWorldObject(this._globalData, content.global);
        results = [];
        for (item in content.actorsData) {
          if (content.actorsData.hasOwnProperty(item)) {
            this._actorsData[item] = new AlphaNET.LIBS.NetPlayerWorldData();
            results.push(this._loadDataToWorldObject(this._actorsData[item], content.actorsData[item]));
          } else {
            results.push(void 0);
          }
        }
        return results;
      } catch (error) {
        e = error;
        return AlphaNET.error(e, ' while load network world save data');
      }
    }

    _loadDataToWorldObject(obj, data) {
      var e;
      try {
        obj.actorItems = data.actorItems;
        if (data.actorData != null) {
          obj.actorData = JsonEx.stringify(data.actorData);
        }
        return obj.setWorldData(data.world);
      } catch (error) {
        e = error;
        return AlphaNET.error(e, ' while extract network world save data');
      }
    }

    _checkActorWorldData(actorId) {
      if (!this.hasInfoAbout(actorId)) {
        this._actorsData[actorId] = new AlphaNET.LIBS.NetPlayerWorldData();
      }
    }

  };
  AlphaNET.register(NetSessionData);
})();

// ■ END NetSessionData.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetUIManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  //@[CLASS IMPL ONLY]
  NetUIManager.init = function(scene) {
    if ($gameTemp._chatLines == null) {
      $gameTemp._chatLines = [];
    }
    NetUIManager.netUILayer = new Sprite();
    if (scene != null) {
      scene.addChild(NetUIManager.netUILayer);
    }
    if (NetUIManager.isNeedChat === true) {
      return NetUIManager.createChat();
    }
  };
  NetUIManager.startChat = function() {
    NetUIManager.isNeedChat = true;
    return NetUIManager.createChat();
  };
  NetUIManager.createChat = function() {
    if (NetUIManager._chatUI != null) {
      return;
    }
    NetUIManager._chatUI = new AlphaNET.LIBS.SpriteChatMain();
    this.chat = new AlphaNET.LIBS.GameChatController(NetUIManager._chatUI);
    return NetUIManager._add(NetUIManager._chatUI);
  };
  NetUIManager._add = function(element) {
    return NetUIManager.netUILayer.addChild(element);
  };
  NetUIManager.isSomethingUnderCursor = function() {
    var ref;
    if (NetUIManager.isChatActive()) {
      if (this.chat.isUnderTouch()) {
        return true;
      }
    }
    if ((ref = this.actionMenu) != null ? ref.isActive() : void 0) {
      if (this.actionMenu.isMouseInButtons()) {
        return true;
      }
    }
    return false;
  };
  NetUIManager.hideUI = function() {};
  NetUIManager.showUI = function() {};
  NetUIManager.hideChat = function() {
    var ref;
    return (ref = this.chat) != null ? ref.hide() : void 0;
  };
  NetUIManager.showChat = function() {
    var ref;
    return (ref = this.chat) != null ? ref.show() : void 0;
  };
  NetUIManager.isChatActive = function() {
    var ref;
    return ((ref = this.chat) != null ? ref.isActive() : void 0) && ANET.Utils.isSceneMap();
  };
  NetUIManager.pushMessageToChat = function(actorId, message) {
    var ref;
    if (NetUIManager.isChatActive()) {
      return (ref = this.chat) != null ? ref.addLine(actorId, message) : void 0;
    } else {
      return $gameTemp._chatLines.push([actorId, message]);
    }
  };
  NetUIManager.showActionMenu = function() {
    if ($gamePlayer._netPlayerForAction == null) {
      return;
    }
    if (this.actionMenu == null) {
      "CREATE ACTION MENU".p();
      this.actionMenu = new ANET.LIBS.Sprite_ActorActionMenu();
      NetUIManager._add(this.actionMenu);
    }
    if (this.actionMenu.isActive()) {
      return;
    }
    "SHOW ACTION MENU".p();
    this.actionMenu.moveToCharacter($gamePlayer._netPlayerForAction);
    return this.actionMenu.show();
  };
  NetUIManager.hideActionMenu = function() {
    var ref;
    if ((ref = this.actionMenu) != null ? ref.isActive() : void 0) {
      return this.actionMenu.hide();
    }
  };
  NetUIManager.closeActionMenu = function() {
    if (this.actionMenu != null) {
      NetUIManager.netUILayer.removeChild(this.actionMenu);
      return this.actionMenu = null;
    }
  };
  NetUIManager.update = function() {
    var ref;
    return (ref = this.chat) != null ? ref.update() : void 0;
  };
  NetUIManager.terminate = function() {
    NetUIManager._chatUI = null;
    this.chat = null;
    return NetUIManager.closeActionMenu();
  };
})();

// ■ END NetUIManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetWaitPool.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetWaitPool;
  NetWaitPool = class NetWaitPool {
    constructor(waitId) {
      this.waitId = waitId;
      this._clients = [];
      this.resetPool();
    }

    addClient(clientId, isReady = false) {
      if (this._getClientIndex(clientId) < 0) {
        this._clients.push(clientId);
      }
      if (isReady === true) {
        return this.setClientReady(clientId);
      }
    }

    _getClientIndex(clientId) {
      return this._clients.indexOf(clientId);
    }

    setClientReady(clientId) {
      return this._statuses[this._getClientIndex(clientId)] = true;
    }

    isPoolReady() {
      return this._statuses.every(function(status) {
        return status === true;
      });
    }

    resetPool() {
      return this._statuses = []; // * Массив готовности
    }

    getPoolSize() {
      return this._clients.length;
    }

  };
  AlphaNET.register(NetWaitPool);
})();

// ■ END NetWaitPool.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Network.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  //@[CLASS HEADER PART]
  //@[CLASS IMPL ONLY]
  Network.commonEventOnServerStarted = 0;
  Network.commonEventOnConnectToServer = 0;
  Network.commonEventOnDisconectFromServer = 0;
  Network.commonEventOnOtherClientConnected = 0;
  Network.commonEventOnOtherClientDisconected = 0;
  Network.commonEventOnPvPBattleEnd = 0;
  Network.maximumNetworkPlayers = 4;
  Network.networkActorsId = [
    1,
    2,
    3,
    4 // * This is mutable (меняется во время игры)
  ];
  Network.SERVER_UPDATE_TIME = 500;
  Network.WAIT_SERVER = 0;
  Network.WAIT_PLAYER = 1;
  Network.ICON_NONE = -1;
  Network.ICON_MESSAGE = 1;
  Network.ICON_MENU = 2;
  Network.ICON_SHOP = 3;
  Network.ICON_WAIT = 4;
  Network.ICON_BATTLE = 5;
  Network.ICON_CHAT = 6;
  Network.ICON_TRADE = 7;
  Network.PVP_WIN = 0;
  Network.PVP_DEFEAT = 2;
  Network.isConnected = function() {
    return this._isConnected === true;
  };
  Network.isHost = function() {
    return Network.isConnected() && this._isHost === true;
  };
  Network.isHotGame = function() {
    return this._isHotGame === true;
  };
  Network.isBusy = function() {
    return this._isBusy === true;
  };
  Network.myId = function() {
    if (Network.isConnected()) {
      return this.socket.id;
    }
  };
  Network.playerData = function(id) {
    return Network.players.findElementByField('id', id);
  };
  Network.isHotHost = function() {
    return Network.isHotGame() && Network.isHost();
  };
  Network.inBattle = function() {
    return this._inBattle === true;
  };
  Network.allowConnect = function() {
    return this._allowConnection === true;
  };
  Network.canClientConnect = function() {
    return Network._checkCanConnect();
  };
  Network.canConnectToServer = function() {
    return Network._checkCanConnectToServer();
  };
  Network.isMultiMode = function() {
    return this._isMultiplayerMode === true;
  };
  Network.isMapOwner = function() {
    return Network.isMultiMode() && this._isMapOwner === true;
  };
  Network.inPvPBattle = function() {
    return this._inPvPBattle === true;
  };
  Network.isPvPBattleServer = function() {
    return this._isPvPBattleServer === true;
  };
  Network.isPvPBattleWin = function() {
    return this._lastPvPResult === Network.PVP_WIN;
  };
  Network.isPvPBattleLoose = function() {
    return this._lastPvPResult === Network.PVP_DEFEAT;
  };
  Network.startServer = function() {
    return Network._startServer();
  };
  Network.stopServer = function() {
    var ref;
    return (ref = this.server) != null ? ref.stop() : void 0;
  };
  Network.connectToServer = function() {
    return Network._connectToServer();
  };
  Network.disconnect = function() {
    var ref;
    return (ref = this.client) != null ? ref.disconnect() : void 0;
  };
  Network.sendMessage = function(netMessage) {
    if (!Network.isConnected()) {
      return;
    }
    netMessage.setFrom(this.socket.id).send();
  };
  Network.sendIcon = function(iconId) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    if (iconId == null) {
      iconId = Network.ICON_NONE;
    }
    msg = NetMessage.PlayerNetIcon().setData(iconId);
    return Network.sendMessage(msg);
  };
  Network.requestSync = function(syncId) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    msg = NetMessage.RequestSync().setData(syncId).setRepeat(Network.WAIT_PLAYER);
    return Network.sendMessage(msg);
  };
  // * INNER METHOD (Call by client)
  Network.requestPvPBattle = function() {
    var data, msg;
    if ($gamePlayer._netPlayerForAction == null) {
      return;
    }
    if (!Network.isConnected()) {
      return;
    }
    if (!Network.isMultiMode()) {
      return;
    }
    //data = {
    //    who: NetPartyManager.getMyPlayerIndex(), # * MY INDEX
    //    with: anotherPlayerIndex # * RIVAL PLAYER INDEX
    //}
    NetUIManager.closeActionMenu();
    data = $gamePlayer._netPlayerForAction.netIndex;
    msg = NetMessage.RequestPvP().setData(data); //.setRepeat('pvp_start')
    Network.sendMessage(msg);
    $gamePlayer._netPlayerForAction = null;
    return this._isPvPBattleServer = true;
  };
  Network.requestTrade = function() {
    var data, msg;
    if ($gamePlayer._netPlayerForAction == null) {
      return;
    }
    if (!Network.isConnected()) {
      return;
    }
    NetUIManager.closeActionMenu();
    data = $gamePlayer._netPlayerForAction.netIndex;
    msg = NetMessage.RequestTrade().setData(data);
    Network.sendMessage(msg);
    return $gamePlayer._netPlayerForAction = null;
  };
  //?{TEST}
  Network.sendTemp = function(data) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    msg = NetMessage.TempMessage().setData(data);
    return Network.sendMessage(msg);
  };
  Network.sendTempWait = function(data) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    msg = NetMessage.TempMessage().setRepeat().setData(data);
    return Network.sendMessage(msg);
  };
  AlphaNET.register(Network);
})();

// ■ END Network.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Network_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var LOG;
  LOG = new KDCore.DevLog("Network");
  LOG.on();
  LOG.setColors(KDCore.Color.BLUE, KDCore.Color.BLACK.getLightestColor(235));
  
  //@[CLASS PRIVATE PART]
  //@[CLASS IMPL ONLY]
  Network.ip = '25.49.126.213';
  Network.port = 3032;
  Network.initialize = function() {
    LOG.p("Initialized on " + Network.ip + " : " + Network.port);
    this.socket = null;
    this._isConnected = false;
    this._isHost = false;
    this._isHotGame = false;
    this._isBusy = false;
    this._thread = null;
    this.players = [];
    this.myPlayerData = null;
    this._waitMode = 0;
    this._allowConnection = true;
    this._isMultiplayerMode = AlphaNET.Parameters.isMultiGameMode();
    if (this._isMultiplayerMode) {
      LOG.p("Warning! Multiplayer game mode. Global Events are disabled");
    }
    this._isMapOwner = false;
    this.sessionData = null;
    this._inPvPBattle = false;
    this._isPvPBattleServer = false;
    this._lastPvPResult = -1;
    Network.networkActorsId = AlphaNET.Parameters.get_actorsForPlayers();
    Network.maximumNetworkPlayers = Network.networkActorsId.length;
    AlphaNET.Parameters.load_CommonEventsForNetwork();
  };
  Network._startServer = function() {
    if (Utils.isNwjs()) {
      return this.server = new AlphaNET.LIBS.NetworkServer(Network.port);
    } else {
      return LOG.p("You can start server only in NW.js (PC)");
    }
  };
  Network._connectToServer = function() {
    var adr;
    if (this.socket != null) {
      return LOG.p("Connection already exists!");
    } else {
      adr = this._makeNetAdress();
      LOG.p("Connect to " + adr);
      this.socket = io(adr);
      return this.client = new AlphaNET.LIBS.NetworkClient(this.socket);
    }
  };
  Network.setHost = function() {
    return this._isHost = true;
  };
  Network.setHotGame = function(isHotGame) {
    return this._isHotGame = isHotGame;
  };
  Network._makeNetAdress = function() {
    return 'http://' + Network.ip + ":" + Network.port;
  };
  Network.runEvent = function(commonEventId) {
    if ((commonEventId != null) && commonEventId > 0 && ($dataCommonEvents[commonEventId] != null)) {
      LOG.p("Start common event " + commonEventId);
      return $gameTemp.reserveCommonEvent(commonEventId);
    }
  };
  Network.onConnectToServer = function() {
    this._isConnected = true;
    if (!Network.isHotGame()) {
      if (ANET.P.isChatUsing() === true) {
        return NetUIManager.startChat();
      }
    }
  };
  Network.onConnectionError = function() {
    return this.socket = null;
  };
  //TODO: Либо вызывать общее событие, либо сделать handler
  Network.onConnectionLost = function() {
    Network.disconnect();
    this._isConnected = false;
    this.socket = null;
    return Network.clearPlayersData();
  };
  Network.clearPlayersData = function() {
    Network.players = [];
    Network.myPlayerData = null;
    return NetPartyManager.refreshCharacters();
  };
  Network.isPlayerWaitMode = function() {
    return this._waitMode === Network.WAIT_PLAYER;
  };
  Network.isServerWaitMode = function() {
    return this._waitMode === Network.WAIT_SERVER;
  };
  Network.getLastResponseData = function() {
    return this._lastResponseData;
  };
  // * Могу ли я подключится сейчас?
  Network._checkCanConnect = function() {
    if (Network.isMultiMode()) {
      return SceneManager.isCurrentSceneIsMap();
    } else {
      return SceneManager.isCurrentSceneIsMap() && !Network.isBusy();
    }
  };
  // * Может ли клиент подключится к севреру? (Т.е. эта проверка уже на сервере)
  Network._checkCanConnectToServer = function() {
    if (Network.isMultiMode()) {
      return true;
    } else {
      return SceneManager.isCurrentSceneIsMap() && !Network.isBusy();
    }
  };
  // * OUTER METHOD CALL BY SERVER RESPONSE
  // * Это внешний метод, он вызывается сервером, когда он согласовал PvP бой между игроками
  Network._outerStartPvP = function(enemyActorId) {
    if (!Network.isConnected()) {
      return;
    }
    if (!Network.isMultiMode()) {
      return;
    }
    LOG.p("Starting PvP");
    BattleManager.setupPvPBattle(enemyActorId);
    return SceneManager.push(Scene_Battle);
  };
  // * OUTER METHOD CALL BY SERVER RESPONSE
  Network._outerStartTrade = function(anotherActorId) {
    if (!Network.isConnected()) {
      return;
    }
    LOG.p("Starting Trade");
    Network._clearTradeState();
    $gameTemp.netTradeAnotherActorId = anotherActorId;
    $gameTemp.netTradeItems = new ANET.LIBS.TradeItems();
    $gameTemp.netTradeItemsOut = new ANET.LIBS.TradeItems();
    return SceneManager.push(ANET.LIBS.Scene_Trade);
  };
  Network._onNewChatMessage = function(actorId, message) {
    return NetUIManager.pushMessageToChat(actorId, message);
  };
  Network.clearPvPBattleWithResult = function(result) {
    LOG.p("PvP End");
    this._inPvPBattle = false;
    this._isPvPBattleServer = false;
    this._lastPvPResult = result;
    return Network.runEvent(Network.commonEventOnPvPBattleEnd);
  };
  Network._clearTradeState = function() {
    $gameTemp.netTradeNeedAbort = null;
    $gameTemp.netTradeItemsOut = null;
    $gameTemp.netTradeItems = null;
    return $gameTemp.netTradeAnotherActorId = null;
  };
  //?[TEST]
  Network.test = function() {
    var msg;
    msg = new AlphaNET.LIBS.NetMessage(this.socket);
    msg.setName('testWaitHard').send("baba").setWait();
    return this._isBusy = true;
  };
  //?[TEST]
  Network.test2 = function() {
    var msg;
    msg = new AlphaNET.LIBS.NetMessage(this.socket);
    msg.setName('testWaitHardRepeated').send("gfgf").setRepeat();
    return this._isBusy = true;
  };
  //?[TEST]
  Network.sendChatMessage = function(text, channelId) {
    var e, msg;
    if (!Network.isConnected()) {
      return;
    }
    try {
      msg = {
        channelId: channelId,
        text: text
      };
      Network.sendMessage(NetMessage.SendChatMessage().setData(msg));
      return NetUIManager.pushMessageToChat(NetPartyManager.getMyActorId(), msg);
    } catch (error1) {
      e = error1;
      return ANET.warning('error while send chat message to server', e);
    }
  };
  //*Активирует режим ожидания ответа от сервера, игра зависает и ждёт ответ от сервера
  Network.waitServerResponse = function(netMessage, waitMode) {
    //LOG.p 'Sended wait state request to server ' + netMessage.name
    this._waitMode = waitMode || Network.WAIT_SERVER;
    this._isBusy = true;
    Network.sendIcon(Network.ICON_WAIT);
  };
  //*Активирует режим повторения команды, игра в это время зависает и ждёт ответ от сервера
  Network.waitServerResponseRepeated = function(netMessage, waitMode) {
    var func;
    //LOG.p 'Repeated mode'
    Network.waitServerResponse(netMessage, waitMode);
    this._thread = setTimeout(func = function() {
      if (Network.isBusy() && (Network._thread != null)) {
        netMessage.send();
        Network.sendIcon(Network.ICON_WAIT);
        return Network._thread = setTimeout(func, 2000);
      }
    }, 2000);
  };
  
  //*Ответ (который игра ждала) получен, игра отвисает
  Network.onServerResponse = function(data) {
    //LOG.p 'Wait state request complete'
    this._lastResponseData = data;
    this._isBusy = false;
    Network.sendIcon(Network.ICON_NONE);
    if (this._thread != null) {
      clearInterval(this._thread);
    }
  };
  Network.error = function(error, message) {
    if (Network._errorLog == null) {
      Network._errorLog = new KDCore.DevLog('Network Error');
      Network._errorLog.setColors(KDCore.Color.RED, KDCore.Color.BLACK.getLightestColor(225));
      Network._errorLog.on();
    }
    if (message != null) {
      Network._errorLog.p(message);
    }
    return console.error(error);
  };
})();


// ■ END Network_private.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkCharacter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var NetworkCharacter;

NetworkCharacter = class NetworkCharacter extends Game_Follower {
  constructor(index) {
    super(index);
  }

  refreshNet() {
    var pl;
    pl = NetPartyManager.getPlayerByIndex(this.netIndex);
    if (pl != null) {
      this.netId = pl.id;
    } else {
      this.netId = null;
    }
    return this.refresh();
  }

  initialize(index) {
    this.netIndex = index;
    this.netId = null;
    Game_Follower.prototype.initialize.call(this, this.netIndex);
    return this.setTransparent(false);
  }

  actor() {
    var pl;
    if (!Network.isConnected()) {
      return null;
    }
    pl = NetPartyManager.getPlayerByIndex(this.netIndex);
    if (pl == null) {
      return null;
    }
    if (pl.id === Network.myPlayerData.id) {
      // * Если это я, то не создаётся NetworkCharacter
      return null;
    }
    if (Network.isMultiMode() && pl.mapId !== $gameMap.mapId()) {
      return null;
    }
    return $gameParty.memberByActorId(pl.actorId);
  }

  update() {
    return Game_Character.prototype.update.call(this);
  }

  //?[EMPTY]
  chaseCharacter() {}

  //?[BASE]
  networkIconId() {
    if (this.actor() == null) {
      return -1;
    }
    return Game_Follower.prototype.networkIconId.call(this);
  }

  //?[BASE]
  getNetworkName() {
    var ref;
    if (AlphaNET.Parameters.get_ShowNameplatesMode() > 0) {
      return (ref = this.actor()) != null ? ref.name() : void 0;
    }
  }

  //?[BASE]
  getNetworkNameStyleId() {
    var ref;
    return (ref = this.actor()) != null ? ref.networkStyleId() : void 0;
  }

};

AlphaNET.register(NetworkCharacter);

// ■ END NetworkCharacter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkPlayerData.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetworkPlayerData;
  // * RAW класс, он хранится только как данные на клиентах (без методов)
  NetworkPlayerData = class NetworkPlayerData {
    constructor(id) {
      this.id = id;
    }

    setActorId(actorId) {
      return this.actorId = actorId;
    }

    data() {
      return {
        id: this.id,
        actorId: this.actorId
      };
    }

  };
  AlphaNET.register(NetworkPlayerData);
})();

// ■ END NetworkPlayerData.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetWorldManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[CLASS IMPL ONLY]

// 121 - Switch
// 122 - Variable
// 123 - SelfSwitch
NetWorldManager.WORLD_SYNC_COMMANDS = [121, 122, 123];

NetWorldManager.synchronize = function() {
  var data;
  if (SceneManager.isCurrentSceneIsBattle()) {
    return;
  }
  if ($gameMap.isEventRunning()) {
    return;
  }
  if (Network.isHost()) {
    return;
  }
  data = {};
  data.variablesData = NetWorldManager.getDataForNetwork($gameVariables);
  data.switchData = NetWorldManager.getDataForNetwork($gameSwitches);
  data.selfSwitchData = NetWorldManager.getDataForNetwork($gameSelfSwitches);
  return Network.sendMessage(NetMessage.PlayerWorldData().setData(data));
};

NetWorldManager.onWorldDataFromNetwork = function(data) {
  NetWorldManager.setDataFromNetwork($gameVariables, data.variablesData);
  NetWorldManager.setDataFromNetwork($gameSwitches, data.switchData);
  return NetWorldManager.setDataFromNetwork($gameSelfSwitches, data.selfSwitchData);
};

NetWorldManager.onGlobalWorldDataFromNetwork = function(data) {
  NetWorldManager.setExtraFromNetwork($gameVariables, data.variablesData);
  NetWorldManager.setExtraFromNetwork($gameSwitches, data.switchData);
  return NetWorldManager.setExtraFromNetwork($gameSelfSwitches, data.selfSwitchData);
};

NetWorldManager.getDataForNetwork = function(gameVariableObject) {
  return JSON.stringify(gameVariableObject._data);
};

NetWorldManager.setDataFromNetwork = function(gameVariableObject, data) {
  var netArray;
  netArray = JSON.parse(data);
  gameVariableObject._data = netArray;
  return gameVariableObject.onChange();
};

// * Загружает дополнительные значения (которые были под NET sync или NET virtual)
// * [[id, value],...]
NetWorldManager.setExtraFromNetwork = function(gameVariableObject, data) {
  var i, item, j, netData, ref;
  netData = JSON.parse(data);
  for (i = j = 0, ref = netData.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
    item = netData[i];
    gameVariableObject._data[item[0]] = item[1];
  }
  gameVariableObject.onChange();
};

NetWorldManager.onEventSyncCommand = function(commandData) {
  var e, event, line, mapId, page;
  if (!Network.isHost()) {
    return;
  }
  mapId = commandData.mapId;
  if ($gameMap.mapId() !== mapId) {
    return;
  }
  event = $gameMap.event(commandData.eventId);
  if (event == null) {
    return;
  }
  try {
    page = event.event().pages[commandData.pi];
    if (page == null) {
      return;
    }
    line = page.list[commandData.li];
    if (line == null) {
      return;
    }
    if (NetWorldManager.WORLD_SYNC_COMMANDS.include(line.code)) {
      return NetWorldManager.saveGlobalInfo(line.code, line.parameters, commandData);
    }
  } catch (error) {
    e = error;
    return Network.error(e, 'while check event sync command');
  }
};

NetWorldManager.saveGlobalInfo = function(code, parameters, evData) {
  var p;
  "saveGlobalInfo for".p(code);
  p = parameters;
  switch (code) {
    case 121:
      NetWorldManager.setSwitchToGlobal(p[0], p[1], p[2] === 0);
      break;
    case 122:
      setTimeout((function() {
        return NetWorldManager.setVariableToGlobal(p[0], p[1]);
      }), 500);
      break;
    case 123:
      NetWorldManager.setSelfSwitchToGlobal(p[0], p[1] === 0, evData);
      break;
    default:
      break;
  }
};

NetWorldManager.setSwitchToGlobal = function(fromI, toI, value) {
  var global, i, j, ref, ref1;
  global = Network.sessionData.getGlobalData();
  for (i = j = ref = fromI, ref1 = toI; (ref <= ref1 ? j <= ref1 : j >= ref1); i = ref <= ref1 ? ++j : --j) {
    global.switchData.push([i, value]);
  }
};

NetWorldManager.setVariableToGlobal = function(fromI, toI) {
  var e, global, i, j, ref, ref1;
  try {
    global = Network.sessionData.getGlobalData();
    for (i = j = ref = fromI, ref1 = toI; (ref <= ref1 ? j <= ref1 : j >= ref1); i = ref <= ref1 ? ++j : --j) {
      global.variablesData.push([i, $gameVariables.value(i)]);
    }
  } catch (error) {
    e = error;
    return Network.error(e, 'while set variables to global');
  }
};

NetWorldManager.setSelfSwitchToGlobal = function(switchName, value, commandData) {
  var e, global, key;
  try {
    global = Network.sessionData.getGlobalData();
    key = [commandData.mapId, commandData.eventId, switchName];
    global.selfSwitchData.push([key.toString(), value]);
  } catch (error) {
    e = error;
    return Network.error(e, 'while set selfSwitch to global');
  }
};

NetWorldManager.onEventVirtualCommand = function(commandData) {
  if (!Network.isHost()) {
    return;
  }
  if (!NetWorldManager.WORLD_SYNC_COMMANDS.include(commandData.id)) {
    return;
  }
  NetWorldManager.saveGlobalInfo(commandData.id, commandData.parameters, commandData);
};

// ■ END NetWorldManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PointX.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[MINI VERSION OF POINTX]
//@[GLOBAL DEFINITION]
var PointX;

PointX = (function() {
  class PointX {
    constructor(_x, _y) {
      this._x = _x;
      this._y = _y;
    }

    convertToCanvas() {
      return new PointX(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
    }

    convertToMap() {
      return new PointX($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
    }

    convertToScreen() {
      return new PointX(this.screenX(), this.screenY());
    }

    screenX() {
      var t, tw;
      t = $gameMap.adjustX(this._x);
      tw = $gameMap.tileWidth();
      return Math.round(t * tw + tw / 2);
    }

    screenY() {
      var t, th;
      t = $gameMap.adjustY(this._y);
      th = $gameMap.tileHeight();
      return Math.round(t * th + th);
    }

    clone() {
      return new PointX(this._x, this._y);
    }

    toString() {
      return `[${this._x}:${this._y}]`;
    }

    static _getEmpty() {
      if (PointX._empty == null) {
        PointX._empty = new PointX(0, 0);
      }
      return PointX._empty;
    }

  };

  Object.defineProperties(PointX.prototype, {
    x: {
      get: function() {
        return this._x;
      },
      configurable: true
    },
    y: {
      get: function() {
        return this._y;
      },
      configurable: true
    }
  });

  Object.defineProperties(PointX, {
    Empty: {
      get: function() {
        return PointX._getEmpty();
      },
      configurable: false
    }
  });

  return PointX;

}).call(this);

//@[EXTENSIONS]
Array.prototype.toPoint = function() {
  return new PointX(this[0], this[1]);
};

Sprite.prototype.toPoint = function() {
  return new PointX(this.x, this.y);
};

// ■ END PointX.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Scene_Base_isBusy = Scene_Base.prototype.isBusy;
    Scene_Base.prototype.isBusy = function () {
        var base = _alias_Scene_Base_isBusy.call(this);
        return base && Network.isBusy() && $gamePlayer.isTransferring();
    };

    //@[ALIAS]
    var _alias_Scene_Base_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function () {
        _alias_Scene_Base_initialize.call(this);
        this._syncIsShowed = false;
        this._spriteNetSyncMini = new AlphaNET.LIBS.Sprite_WaitNetworkMini();
        this._spriteNetSync = new AlphaNET.LIBS.Sprite_WaitNetwork();
    };

    //@[ALIAS]
    var _alias_Scene_Base_updateNET = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        if (Network.isBusy()) {
            if (Network.isServerWaitMode()) {
                this._updateOnBusyNetwork();
                return;
            } else {
                this._showSyncWait(Network.WAIT_PLAYER);
            }
        } else {
            this._hideSyncWait();
        }
        this._updateNetwork();
        _alias_Scene_Base_updateNET.call(this, ...arguments);
    };
})();


//?[NEW]
Scene_Base.prototype._updateOnBusyNetwork = function () {
    this.updateFade();
    this._showSyncWait(Network.WAIT_SERVER);
};

//?[NEW]
Scene_Base.prototype._showSyncWait = function (waitId) {
    this._showSyncWaitMini();
    setTimeout(() => {
        if (this._syncIsShowed == true) {
            this.addChild(this._spriteNetSync);
            this._spriteNetSync.activate(waitId);
        }
    }, 1000);
};

//?[NEW]
Scene_Base.prototype._showSyncWaitMini = function () {
    if (this._spriteNetSyncMini.isActive()) return;
    this._syncIsShowed = true;
    this.addChild(this._spriteNetSyncMini);
    this._spriteNetSyncMini.activate();
};

//?[NEW]
Scene_Base.prototype._hideSyncWait = function () {
    if (!this._syncIsShowed) return;
    this._syncIsShowed = false;
    this._spriteNetSyncMini.hide();
    this._spriteNetSync.hide();
    this.removeChild(this._spriteNetSyncMini);
    this.removeChild(this._spriteNetSync);
};

//?[NEW]
Scene_Base.prototype._updateNetwork = function () {
    if (!Network.isConnected()) return;
    if (Network.isHost()) {
        if (this instanceof Scene_Map) {
            //?EMPTY
            // * Все движения событий обрабатываются на хосте, поэтому если хост на сцене карты,
            // * то всё нормально. А если хост на другой сцене, то нужно дополнительное обновление
            // * игровой карты, чтобы события не стояли на месте у всех других игроков
        } else {
            $gameMap.updateEventsForNetwork();
        }
    }
};

// ■ END Scene_Base.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function () {
        _alias_Scene_Battle_createPartyCommandWindow.call(this, ...arguments);
        if (Network.isConnected() && !Network.isMultiMode()) {
            // * Выбор команд группы только за хостом
            this._partyCommandWindow.setNetworkShared(true);
        }
    };

    //@[ALIAS]
    var _alias_Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function () {
        if(Network.isConnected()) {
            this._startActorCommandSelectionNet();
        } else {
            _alias_Scene_Battle_startActorCommandSelection.call(this);
        }
    };

    //?[NEW]
    Scene_Battle.prototype._startActorCommandSelectionNet = function () {
        if (Network.isMultiMode()) {
            if(Network.inPvPBattle()) {
                this._startActorCommandSelectionForPvP();
            } else {
                _alias_Scene_Battle_startActorCommandSelection.call(this);
            }
        } else {
            if (BattleManager.isMyActorInput())
                _alias_Scene_Battle_startActorCommandSelection.call(this);
            else
                this.endCommandSelection();
        }
    };

    //?[NEW]
    Scene_Battle.prototype._startActorCommandSelectionForPvP = function () {
        // * Планировалось, что игрок будет ждать, пока другой игрок сделает выбор действия
        // * Потом это было отмененно!
        if(BattleManager.isWaitInputtingForPvP()) {
            this.endCommandSelection();
        } else {
            _alias_Scene_Battle_startActorCommandSelection.call(this);
        }
    };

    //@[ALIAS]
    var _alias_Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function () {
        if (Network.isConnected()) {
            Network._inBattle = true;
            if(Network.isMultiMode()) {
                Network.sendIcon(Network.ICON_BATTLE);
            }
        }
        _alias_Scene_Battle_start.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function () {
        _alias_Scene_Battle_terminate.call(this, ...arguments);
        Network._inBattle = false;
    };

    //@[ALIAS]
    var _alias_Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        _alias_Scene_Battle_update.call(this, ...arguments);
        if (Network.isConnected() && Network.isMultiMode() && Network.isMapOwner()) {
            $gameMap.updateEventsForNetwork();
        }
    };

})();
// ■ END Scene_Battle.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_ChatInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Scene_ChatInput;
  Scene_ChatInput = class Scene_ChatInput extends Scene_Base {
    constructor() {
      super();
    }

    create() {
      super.create();
      this._initialSetup();
      this._loadSettings();
      this._drawBackground();
      this.createWindowLayer();
      this._createInputWindow();
      this._createChannelButtons();
      return this._createControlButtons();
    }

    _initialSetup() {
      if ($gameTemp._lastNChatChannelId != null) {
        this.channelId = $gameTemp._lastNChatChannelId;
      } else {
        this.channelId = 0;
      }
      return Input._setIgnoreSpecial = true;
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getChatSettings()[4];
      return this.S = this.settings;
    }

    _drawBackground() {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this._backgroundSprite.setBlendColor(this.S.backgroundBlend);
      return this.addChild(this._backgroundSprite);
    }

    _createInputWindow() {
      var pos;
      pos = ANET.Utils.convertPositionPointFromJSON(this.S.position);
      this._window = new ANET.LIBS.Window_ChatInput(pos.x, pos.y, this.S.width, this.S.height);
      this._window.open();
      return this.addWindow(this._window);
    }

    _createChannelButtons() {
      var images, img0, img1, img2, img3, params;
      this.channelA = new ANET.LIBS.Sprite_XButton();
      images = this.S.channelButtonImages;
      img0 = ImageManager.loadNetwork(images.mainImg);
      img1 = ImageManager.loadNetwork(images.hoverImg);
      img2 = ImageManager.loadNetwork(images.pressedImg);
      img3 = ImageManager.loadNetwork(images.selectedImg);
      this.channelA.setButtonImages(img0, img1, img2, img3);
      if (this.channelId === 0) {
        this.channelA.disable();
      }
      this.channelA.addClickHandler(this._onChannelAClick.bind(this));
      params = this.S.channelButtonA;
      this.channelA.move(this._window.x + params.marginX, this._window.y + params.marginY);
      this.channelA.drawStyledTextOnButton(params.caption, params.text.textZoneWidth, params.text.textZoneHeight, params.text);
      this.addChild(this.channelA);
      this.channelB = new ANET.LIBS.Sprite_XButton();
      this.channelB.setButtonImages(img0, img1, img2, img3);
      if (this.channelId === 1) {
        this.channelB.disable();
      }
      this.channelB.addClickHandler(this._onChannelBClick.bind(this));
      params = this.S.channelButtonB;
      this.channelB.move(this._window.x + params.marginX, this._window.y + params.marginY);
      this.channelB.drawStyledTextOnButton(params.caption, params.text.textZoneWidth, params.text.textZoneHeight, params.text);
      return this.addChild(this.channelB);
    }

    _onChannelAClick() {
      this.channelA.disable();
      this.channelB.enable();
      this.channelId = 0;
      return $gameTemp._lastNChatChannelId = this.channelId;
    }

    _onChannelBClick() {
      this.channelA.enable();
      this.channelB.disable();
      this.channelId = 1;
      return $gameTemp._lastNChatChannelId = this.channelId;
    }

    _createControlButtons() {
      var img0, img1, img2, params;
      this.sayButton = new ANET.LIBS.Sprite_XButton();
      params = this.S.sendButton;
      img0 = ImageManager.loadNetwork(params.mainImg);
      img1 = ImageManager.loadNetwork(params.hoverImg);
      img2 = ImageManager.loadNetwork(params.pressedImg);
      this.sayButton.setButtonImages(img0, img1, img2);
      this.sayButton.addClickHandler(this._onSayClick.bind(this));
      this.sayButton.move(this._window.x + params.marginX, this._window.y + params.marginY);
      return this.addChild(this.sayButton);
    }

    start() {
      if (Network.isConnected()) {
        Network.sendIcon(Network.ICON_CHAT);
      }
      return super.start();
    }

    update() {
      super.update();
      if (Input.isTriggered('ok')) {
        this._onSayClick();
      }
      if (this.isExit()) {
        return this.popScene();
      }
    }

    _onSayClick() {
      var text;
      //"SAY".p(@_window.getInputText())
      text = this._window.getInputText();
      if (text !== "") {
        Network.sendChatMessage(text, this.channelId);
      }
      return this.popScene();
    }

    isExit() {
      return Input.isCancel();
    }

    terminate() {
      super.terminate();
      return Input._setIgnoreSpecial = false;
    }

  };
  ANET.register(Scene_ChatInput);
})();

// ■ END Scene_ChatInput.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_IpConfig.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Scene_IpConfig;
  Scene_IpConfig = class Scene_IpConfig extends Scene_Base {
    constructor() {
      super();
      SMouse.initMouseTrack(true);
      this._loadResources();
      this._createTitle();
      this._createInfo();
      this._createCommandWindow();
      this._createInputWindow();
    }

    _loadResources() {
      ImageManager.loadNetwork('btn1');
      ImageManager.loadNetwork('btn2');
      return ImageManager.loadNetwork('btn3');
    }

    _createTitle() {
      var h, title;
      title = new Sprite(new Bitmap(Graphics._boxWidth, 200));
      title.bitmap.fontSize = 80;
      h = title.bitmap.height / 2;
      title.bitmap.drawText('ALPHA', 0, h, 400, 1, 'center');
      title.bitmap.textColor = KDCore.Color.BLUE.CSS;
      title.bitmap.drawText('NET', 180, h, 400, 1, 'center');
      return this.addChild(title);
    }

    _createInfo() {}

    _createCommandWindow() {
      this.cmdWindow = new AlphaNET.LIBS.Window_IpConfig();
      this.cmdWindow.setHandler('cancel', this.popScene.bind(this));
      this.cmdWindow.setHandler('ip', this._ipCommand.bind(this));
      this.cmdWindow.setHandler('port', this._portCommand.bind(this));
      return this.addChild(this.cmdWindow);
    }

    _ipCommand() {
      this.cmdWindow.close();
      this.cmdWindow.deactivate();
      return this.input.start("ip");
    }

    _portCommand() {
      this.cmdWindow.close();
      this.cmdWindow.deactivate();
      return this.input.start("port");
    }

    _createInputWindow() {
      this.input = new AlphaNET.LIBS.Window_IpInput();
      this.input.setHandler('cancel', this._onInputCancel.bind(this));
      this.input.setHandler('ok', this._onInputOk.bind(this));
      return this.addChild(this.input);
    }

    _onInputOk() {
      this.input.saveTextData();
      return this._onInputCancel();
    }

    _onInputCancel() {
      this.cmdWindow.open();
      this.cmdWindow.activate();
      this.input.close();
      return this.input.deactivate();
    }

    terminate() {
      super.terminate();
      return SMouse.setTrack(false);
    }

  };
  AlphaNET.register(Scene_IpConfig);
})();

// ■ END Scene_IpConfig.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _alias_Scene_Map_start.call(this, ...arguments);
        Network.sendIcon(null);
    };

    //@[ALIAS]
    var _alias_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function () {
        _alias_Scene_Map_onMapLoaded.call(this, ...arguments);
        if (Network.isConnected() && Network.isMultiMode()) {
            Network.myPlayerData.mapId = $gameMap.mapId();
            Network._isMapOwner = false;
            NetPartyManager.synchronizeMapData();
            NetMessage.RequestPlayerData().send();
            NetMessage.RequestGameMapEventsData().send($gameMap.mapId());
            NetMessage.PlayerChangeMap().send($gameMap.mapId());
        }
        SMouse.initMouseTrack(true);
        NetUIManager.init(this);
    };

    //TODO: Temp solution with Mouse interact to call PvP
    //@[ALIAS]
    var _alias_Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
    Scene_Map.prototype.processMapTouch = function () {
        if (NetUIManager.isSomethingUnderCursor()) {
            //* Если какой-либо UI элемент был курсором, игрок не передвигается
            return;
        }
        if(Network.isConnected() && Network.isMultiMode()) {
            if (TouchInput.isTriggered()) {
                var x = $gameMap.canvasToMapX(TouchInput.x);
                var y = $gameMap.canvasToMapY(TouchInput.y);
                var dist = $gameMap.distance($gamePlayer.x, $gamePlayer.y, x, y);
                if (dist == 1) {
                    if ($gamePlayer.followers().getNetworkPlayerOnPosition(x, y)) {
                        if($gamePlayer._checkPvPStartTrigger());
                            return;
                    } 
                }
            }
            _alias_Scene_Map_processMapTouch.call(this);
            return;
        } else
            _alias_Scene_Map_processMapTouch.call(this);
        
    };

    //@[ALIAS]
    var _alias_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _alias_Scene_Map_update.call(this, ...arguments);
        NetUIManager.update();
    };

    //@[ALIAS]
    var _alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function () {
        _alias_Scene_Map_terminate.call(this, ...arguments);
        NetUIManager.terminate();
    };
})();
// ■ END Scene_Map.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Scene_Map.prototype;
})();

// ■ END Scene_Map_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Scene_Menu_start = Scene_Menu.prototype.start;
    Scene_Menu.prototype.start = function () {
        _alias_Scene_Menu_start.call(this, ...arguments);
        Network.sendIcon(Network.ICON_MENU);
    };
})();
// ■ END Scene_Menu.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_MenuBase.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //?[NEW]
    Scene_MenuBase.prototype.refreshNetwork = function () {
        try {
            this.updateActor();
            if(this._windowLayer == null)
                return;
            var childs = this._windowLayer.children;
            for(var i = 0; i<childs.length; i++) {
                var child = childs[i];
                if(child != null && child.refresh != null) {
                    child.refresh();
                }
            }
        } catch (e) {
            AlphaNET.error(e, 'while try refresh MenuBased scene from Network');
        }
    };
})();
// ■ END Scene_MenuBase.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Options.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function () {
        _alias_Window_Options_makeCommandList.call(this, ...arguments);
        this.addCommand('Network', 'network');
    };

    //@[ALIAS]
    var _alias_Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
        if (this._isNetworkCommand(index)) {
            if(Network != null)
                return Network.ip + ":" + Network.port;
            else
                return "";
        } else
            return _alias_Window_Options_statusText.call(this, ...arguments);
    };

    //?[NEW]
    Window_Options.prototype._isNetworkCommand = function (index) {
        return this.commandName(index).contains('Network');
    };

    //@[ALIAS]
    var _alias_Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
        if(this._isNetworkCommand(this.index())) {
            SoundManager.playCursor();
            SceneManager.push(AlphaNET.LIBS.Scene_IpConfig);
        } else {
            _alias_Window_Options_processOk.call(this, ...arguments);
        }
    };
})();
// ■ END Scene_Options.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Shop.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Scene_Shop_start = Scene_Shop.prototype.start;
    Scene_Shop.prototype.start = function () {
        _alias_Scene_Shop_start.call(this, ...arguments);
        Network.sendIcon(Network.ICON_SHOP);
    };
})();
// ■ END Scene_Shop.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Status.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){

})();
// ■ END Scene_Status.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Trade.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Scene_Trade;
  Scene_Trade = class Scene_Trade extends Scene_Base {
    constructor() {
      super();
    }

    create() {
      super.create();
      this._loadSettings();
      this._drawSceneBackground();
      this._createMainSprite();
      this._drawWindowBackground();
      this._drawActorsHeaders();
      this._drawActorsNames();
      this._drawActorsPortraits();
      this._createItemsList();
      this._createInputWindow();
      return this._createTradeButtons();
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getTradeWindowSettings()[0];
      return this.S = this.settings;
    }

    _createMainSprite() {
      this._mainSprite = new AASprite();
      this._mainSprite.moveByJson(this.settings);
      return this.addChild(this._mainSprite);
    }

    _drawSceneBackground() {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this._backgroundSprite.setBlendColor(this.S.backgroundBlend);
      return this.addChild(this._backgroundSprite);
    }

    _drawWindowBackground() {
      this._windowBackground1 = AASprite.FromImg(this.S.windowBackgound);
      this._windowBackground1.move(this.S.windowLeftMarginX, this.S.windowLeftMarginY);
      this._windowBackground2 = AASprite.FromImg(this.S.windowBackgound);
      this._windowBackground2.move(this.S.windowRightMarginX, this.S.windowRightMarginY);
      this._addToContent(this._windowBackground1);
      return this._addToContent(this._windowBackground2);
    }

    _addToContent(spr) {
      return this._mainSprite.addChild(spr);
    }

    _drawActorsPortraits() {
      this.actorBackgound1 = AASprite.FromImg(this.S.actorBackgound);
      this.actorBackgound2 = AASprite.FromImg(this.S.actorBackgound);
      this.actorBackgound1.move(this.S.actorLeftMarginX, this.S.actorLeftMarginY);
      this.actorBackgound2.move(this.S.actorRightMarginX, this.S.actorRightMarginY);
      this._windowBackground1.addChild(this.actorBackgound1);
      this._windowBackground2.addChild(this.actorBackgound2);
      return this._drawActorPortrait();
    }

    _drawActorsHeaders() {
      this.actorHeader1 = AASprite.FromImg(this.S.actorHeaderBackgound);
      this.actorHeader2 = AASprite.FromImg(this.S.actorHeaderBackgound);
      this.actorHeader2.scale.x = -1;
      this.actorHeader1.move(this.S.actorHeaderLeftMarginX, this.S.actorHeaderLeftMarginY);
      this.actorHeader2.move(this.S.actorHeaderRightMarginX, this.S.actorHeaderRightMarginY);
      this._windowBackground1.addChild(this.actorHeader1);
      return this._windowBackground2.addChild(this.actorHeader2);
    }

    _drawActorsNames() {
      var s;
      s = this.S.ActorNameText;
      this.actorName1 = AASprite.FromBitmap(s.textZoneWidth, s.textZoneHeight);
      this.actorName1.applyTextSettingsByExtraSettings(this.actorName1, this.S.ActorNameText);
      this.actorName1.drawTextFull($gameParty.leader().name(), s.position);
      this._windowBackground1.addChild(this.actorName1);
      s = this.S.Actor2NameText;
      this.actorName2 = AASprite.FromBitmap(s.textZoneWidth, s.textZoneHeight);
      this.actorName2.applyTextSettingsByExtraSettings(this.actorName2, this.S.Actor2NameText);
      this.actorName2.drawTextFull(this._getAnotherActor().name(), s.position);
      return this._windowBackground2.addChild(this.actorName2);
    }

    _getAnotherActor() {
      return $gameActors.actor($gameTemp.netTradeAnotherActorId);
    }

    //TODO: Optim draw face
    _drawActorPortrait() {
      var faceIndex, faceIndex2, faceName, faceName2, loader, loader2;
      this._faceSprite1 = AASprite.FromBitmap(96);
      this._faceSprite1.move(4, 4);
      this._faceSprite2 = AASprite.FromBitmap(96);
      this._faceSprite2.move(4, 4);
      faceName = $gameParty.leader()._faceName;
      faceName2 = this._getAnotherActor()._faceName;
      loader = ImageManager.loadFace(faceName);
      loader2 = ImageManager.loadFace(faceName2);
      faceIndex = $gameParty.leader()._faceIndex;
      faceIndex2 = this._getAnotherActor()._faceIndex;
      loader.addLoadListener(() => {
        var dx, dy, height, ph, pw, sh, sw, sx, sy, width, x, y;
        x = y = 0;
        width = Window_Base._faceWidth;
        height = Window_Base._faceHeight;
        pw = Window_Base._faceWidth;
        ph = Window_Base._faceHeight;
        sw = Math.min(width, pw);
        sh = Math.min(height, ph);
        dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        sx = faceIndex % 4 * pw + (pw - sw) / 2;
        sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        this._faceSprite1.bitmap.blt(loader, sx, sy, sw, sh, dx, dy, 92, 92);
        return this.actorBackgound1.addChild(this._faceSprite1);
      });
      return loader2.addLoadListener(() => {
        var dx, dy, height, ph, pw, sh, sw, sx, sy, width, x, y;
        x = y = 0;
        width = Window_Base._faceWidth;
        height = Window_Base._faceHeight;
        pw = Window_Base._faceWidth;
        ph = Window_Base._faceHeight;
        sw = Math.min(width, pw);
        sh = Math.min(height, ph);
        dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        sx = faceIndex2 % 4 * pw + (pw - sw) / 2;
        sy = Math.floor(faceIndex2 / 4) * ph + (ph - sh) / 2;
        this._faceSprite2.bitmap.blt(loader2, sx, sy, sw, sh, dx, dy, 92, 92);
        return this.actorBackgound2.addChild(this._faceSprite2);
      });
    }

    _createItemsList() {
      var p;
      p = this.S.TradeWindowA;
      this.itemsA = new ANET.LIBS.Window_TradeItemList(p[0], p[1], p[2], p[3], false);
      this.itemsA.activate();
      this.itemsA.setHandler('ok', this.onItemOk.bind(this));
      this.itemsA.onSomethingChangeListener = this.onTradeChange.bind(this);
      this._windowBackground1.addChild(this.itemsA);
      p = this.S.TradeWindowB;
      this.itemsB = new ANET.LIBS.Window_TradeItemList(p[0], p[1], p[2], p[3], true);
      return this._windowBackground2.addChild(this.itemsB);
    }

    _createInputWindow() {
      this.inputWindow = new ANET.LIBS.Window_TradeNumberInput(this.S.TradeInputWindow[0], this.S.TradeInputWindow[1], this);
      return this._windowBackground1.addChild(this.inputWindow);
    }

    _createTradeButtons() {
      var data, img0, img1, img2, img3, imgs, s;
      this._tradeBtn = new AlphaNET.LIBS.Sprite_XButton();
      imgs = this.S.tradeButton;
      img0 = ImageManager.loadNetwork(imgs.mainImg);
      img1 = ImageManager.loadNetwork(imgs.hoverImg);
      img2 = ImageManager.loadNetwork(imgs.pressedImg);
      img3 = ImageManager.loadNetwork(imgs.disabledImg);
      this._tradeBtn.setButtonImages(img0, img1, img2, img3);
      this._tradeBtn.move(this.S.tradeButton.marginX, this.S.tradeButton.marginY);
      //@_tradeBtn.disable()
      this._tradeBtn.addClickHandler(this._tradeButtonClick.bind(this));
      this._tradeBtn.drawStyledTextOnButton(this.S.tradeButton.caption, this.S.tradeButtonStyle.textZoneWidth, this.S.tradeButtonStyle.textZoneHeight, this.settings.tradeButtonStyle);
      this._windowBackground1.addChild(this._tradeBtn);
      data = this.S.tradeButtonHolder;
      this._tradeButtonHolder = AASprite.FromImg(data.image);
      this._tradeButtonHolder.move(data.marginX, data.marginY);
      s = this.S.tradeButtonHolderText;
      this._tradeButtonHolderText = AASprite.FromBitmap(s.textZoneWidth, s.textZoneHeight);
      this._tradeButtonHolderText.applyTextSettingsByExtraSettings(this._tradeButtonHolderText, s);
      this._tradeButtonHolderText.drawTextFull(data.caption);
      this._tradeButtonHolder.addChild(this._tradeButtonHolderText);
      return this._windowBackground2.addChild(this._tradeButtonHolder);
    }

    _tradeButtonClick() {
      var items;
      //"TRADE CLICK".p()
      if (Network.isConnected()) {
        items = $gameTemp.netTradeItems.networkData(); // * Финальный вариант вещей
        Network.sendMessage(NetMessage.TradeReady().setData(items));
      }
      return this._tradeBtn.disable();
    }

    onItemOk() {
      if (this.itemsA.isGoldIndex()) {
        this.resetTradeState();
        this.inputWindow.start();
        this.inputWindow.activate();
        return;
      }
      if (this.itemsA.isTradeButtonIndex()) {
        this._tradeButtonClick();
        this.itemsA.activate();
        return;
      } else {
        this.resetTradeState();
        $gameTemp.netTradeItems.setCurrentIndex(this.itemsA.index());
        SceneManager.push(ANET.LIBS.Scene_TradeItemSelect);
        this.itemsA.refresh();
        this.itemsA.activate();
      }
      return this.onTradeChange();
    }

    onInputComplete() {
      this.itemsA.refresh();
      this.itemsA.activate();
      return this.onTradeChange();
    }

    onTradeChange() {
      if (!Network.isConnected()) {
        return;
      }
      //"SEND CHANGES".p()
      $gameTemp.netTradeItems.send();
      return this.resetTradeState();
    }

    resetTradeState() {
      return this._tradeBtn.enable();
    }

    isReadyForTrade() {
      return this._tradeBtn.isDisabled();
    }

    start() {
      if (Network.isConnected()) {
        Network.sendIcon(Network.ICON_TRADE);
      }
      return super.start();
    }

    terminate() {
      return super.terminate();
    }

    update() {
      super.update();
      if (this.inputWindow.active === false) {
        if (Input.isCancel()) {
          this.abortTradeScene();
          this.popScene();
        }
      }
      if ($gameTemp.netTradeNeedAbort === true) {
        Network._clearTradeState();
        return this.popScene();
      }
    }

    abortTradeScene() {
      if (!Network.isConnected()) {
        return;
      }
      //"SEND ABORT".p()
      return Network.sendMessage(NetMessage.AbortTrade());
    }

  };
  ANET.register(Scene_Trade);
})();

// ■ END Scene_Trade.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_TradeItemSelect.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Scene_TradeItemSelect;
  Scene_TradeItemSelect = class Scene_TradeItemSelect extends Scene_Item {
    constructor() {
      super();
    }

    create() {
      return super.create();
    }

    onItemOk() {
      if (this.isEmptyItem()) {
        $gameTemp.netTradeItems.putItem(null);
      } else {
        $gameTemp.netTradeItems.putItem(this.item());
      }
      $gameTemp.netTradeItems.needRefresh(); // * Чтобы изменения отправить на сервер
      return this.popScene();
    }

    isEmptyItem() {
      return this.item().id === 0;
    }

  };
  ANET.register(Scene_TradeItemSelect);
})();

// ■ END Scene_TradeItemSelect.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Manager_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //?[NEW]
    SceneManager.isCurrentSceneIsMap = function () {
        return (this._scene != null && this._scene instanceof Scene_Map);
    };

    //?[NEW]
    SceneManager.isCurrentSceneIsBattle = function () {
        return (this._scene != null && this._scene instanceof Scene_Battle);
    };

    //?[NEW]
    SceneManager.isCurrentSceneIsMenuBased = function () {
        return (this._scene != null && this._scene instanceof Scene_MenuBase);
    };

    //?[NEW]
    SceneManager.safeRefreshCurrentScene = function () {
        try {
            if (this._scene.refresh != null)
                this._scene.refresh();
            if (this._scene.refreshNetwork != null)
                this._scene.refreshNetwork();
            if (this._scene.refreshActor != null)
                this._scene.refreshActor();
        } catch (error) {
            AlphaNET.error(error, 'while try refresh current game scene');
        }
    };
})();
// ■ END Scene_Manager_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

// Generated by CoffeeScript 2.3.1
ANET.printVersionInfo = function() {
  return ANET.print(ANET.Version + " [Pro] build " + ANET.Build + " on MV " + Utils.RPGMAKER_VERSION);
};

ANET.loadFonts = function() {
  var e;
  try {
    if (Utils.isNwjs()) {
      return FontLoadManager.initAndLoadAll();
    }
  } catch (error) {
    e = error;
    return ANET.warning('Font Load Manager', e);
  }
};

ANET.isPro = function() {
  return true;
};

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SMouse.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//@[GLOBAL DEFINITION]

var __SmouseNeedTrack = false;
var __SmousePosition = null;

function SMouse() {
    throw new Error('This is a static class');
}

SMouse.initMouseTrack = function (isSet) {
    document.onmousemove = SMouse.handleMouseMove;
    __SmouseNeedTrack = false;
    __SmousePosition = PointX.Empty;
    if (isSet == true) {
        SMouse.setTrack(true);
    }
};

SMouse.setTrack = function (isSet) {
    __SmouseNeedTrack = isSet;
    if (isSet) this.handleMouseMove(null);
};

SMouse.isTracked = function () {
    return (__SmouseNeedTrack == true);
};

SMouse.handleMouseMoveCanvas = function (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    __SmousePosition = new PointX(evt.clientX - rect.left, evt.clientY - rect.top);
};

SMouse.handleMouseMove = function (event) {
    if (!__SmouseNeedTrack) return;

    var eventDoc, doc, body;

    event = event || window.event; // IE-ism
    if (!event) return;

    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }

    __SmousePosition = new PointX(event.pageX, event.pageY);
    __SmousePosition = __SmousePosition.convertToCanvas();
};

SMouse.getMousePosition = function () {
    if (!Utils.isMobileDevice())
        return __SmousePosition;
    else
        return PointX.Empty;
};

// ■ END SMouse.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_ActorActionMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_ActorActionMenu;
  Sprite_ActorActionMenu = class Sprite_ActorActionMenu extends AASprite {
    constructor() {
      super();
      this._create();
      this._main.visible = false;
    }

    _create() {
      this._loadSettings();
      this._createMainSprite();
      this._createMenuItems();
      return this._refreshPlacement();
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getActorActionMenuSettings();
      return this.S = this.settings;
    }

    _createMainSprite() {
      this._main = new Sprite();
      return this.add(this._main);
    }

    _createMenuItems() {
      this._createTradeItem();
      if (Network.isMultiMode()) {
        return this._createPvPItem();
      }
    }

    _createTradeItem() {
      var bData, img0, img1, img2;
      this._tradeMain = new Sprite(new Bitmap(32, 32));
      //@_tradeMain.bitmap.fillAll KDCore.Color.BLACK.reAlpha(120)
      bData = this.S.buttons.tradeButton;
      this._tradeBtn = new AlphaNET.LIBS.Sprite_XButton();
      img0 = ImageManager.loadNetwork(bData.mainImg);
      img1 = ImageManager.loadNetwork(bData.hoverImg);
      img2 = ImageManager.loadNetwork(bData.pressedImg);
      this._tradeBtn.setButtonImages(img0, img1, img2);
      this._tradeBtn.addClickHandler(function() {
        return Network.requestTrade();
      });
      this._tradeMain.addChild(this._tradeBtn);
      return this._main.addChild(this._tradeMain);
    }

    _createPvPItem() {
      var bData, img0, img1, img2;
      this._pvpMain = new Sprite(new Bitmap(32, 32));
      //@_pvpMain.bitmap.fillAll KDCore.Color.RED
      bData = this.S.buttons.pvpButton;
      this._pvpBtn = new AlphaNET.LIBS.Sprite_XButton();
      img0 = ImageManager.loadNetwork(bData.mainImg);
      img1 = ImageManager.loadNetwork(bData.hoverImg);
      img2 = ImageManager.loadNetwork(bData.pressedImg);
      this._pvpBtn.setButtonImages(img0, img1, img2);
      this._pvpBtn.addClickHandler(function() {
        return Network.requestPvPBattle();
      });
      this._pvpMain.addChild(this._pvpBtn);
      return this._main.addChild(this._pvpMain);
    }

    _refreshPlacement() {
      if (this._pvpMain != null) {
        this._tradeMain.move(this.S.buttons.tradeButton.dx, this.S.buttons.tradeButton.dy);
        return this._pvpMain.move(this.S.buttons.pvpButton.dx, this.S.buttons.pvpButton.dy);
      }
    }

    show() {
      //return if @isActive()
      this._main.opacity = 255;
      this._needReset = false;
      this._opacitySwing = new ANET.LIBS.ValueSwing(this._main, "opacity", 10);
      this._opacitySwing.setIncrementMode();
      this._opacitySwing.start();
      return this._main.visible = true;
    }

    hide() {
      //return unless @isActive()
      this._needReset = true;
      this._opacitySwing = new ANET.LIBS.ValueSwing(this._main, "opacity", 5);
      return this._opacitySwing.start();
    }

    //@_main.visible = false
    close() {
      return this._main.visible = false;
    }

    isActive() {
      return this._main.visible === true;
    }

    isMouseInButtons() {
      var ref;
      return this._main.visible === true && (this._tradeBtn.isMouseInButton() || ((ref = this._pvpBtn) != null ? ref.isMouseInButton() : void 0));
    }

    moveToCharacter(netCharIndex) {
      return this.move(netCharIndex.screenX() + this.S.marginX, netCharIndex.screenY() + this.S.marginY);
    }

    update() {
      super.update();
      this._updateSwings();
      return this._updateInput();
    }

    _updateSwings() {
      if (this._opacitySwing == null) {
        return;
      }
      this._opacitySwing.update();
      if (this._opacitySwing.isReady()) {
        this._opacitySwing = null;
        if (this._needReset === true) {
          this._main.visible = false;
          this._main.opacity = 255;
          return this._needReset = false;
        }
      }
    }

    _updateInput() {
      if (this.isActive() === false) {
        return;
      }
      if (Input.isTriggered(ANET.KEYS.TRADE())) {
        Network.requestTrade();
        return;
      }
      if (Input.isTriggered(ANET.KEYS.PVP())) {
        Network.requestPvPBattle();
      }
    }

  };
  ANET.register(Sprite_ActorActionMenu);
})();

// ■ END Sprite_ActorActionMenu.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Sprite_Character_updateBalloon = Sprite_Character.prototype.updateBalloon;
    Sprite_Character.prototype.updateBalloon = function () {
        _alias_Sprite_Character_updateBalloon.call(this, ...arguments);
        this._setupNetworkIcon();
        this._setupNetworkName();
        if (this._networkIconSprite) {
            this._networkIconSprite.x = this.x;
            this._networkIconSprite.y = this.y - this.height;
        }
    };

    //?[NEW]
    Sprite_Character.prototype._setupNetworkIcon = function () {
        var iconId = this._character.networkIconId();
        if (iconId == -1) {
            this._endNetworkIcon();
        }
        if (iconId > 0) {
            this._startNetworkIcon();
            this._character._startNetworkIcon();
        }
    };

    //?[NEW]
    Sprite_Character.prototype._startNetworkIcon = function () {
        if (!this._networkIconSprite) {
            this._networkIconSprite = new AlphaNET.LIBS.Sprite_NetStatusIcon();
        }
        this._networkIconSprite.setup(this._character.networkIconId());
        this.parent.addChild(this._networkIconSprite);
    };

    //?[NEW]
    Sprite_Character.prototype._endNetworkIcon = function () {
        if (this._networkIconSprite) {
            this.parent.removeChild(this._networkIconSprite);
            this._networkIconSprite = null;
        }
    };

    //?[NEW]
    Sprite_Character.prototype._setupNetworkName = function () {
        if(!Network.isConnected()) return;
        if (AlphaNET.Parameters.get_ShowNameplatesMode() == 0) return;
        if (this._character.getNetworkName() == null){
            this._destroyNetworkName();
            return;
        } 
        if(!this._networkNameSprite) {
            this._createNetworkName();
        }
        this._refreshNetworkName();
    };

    //?[NEW]
    Sprite_Character.prototype._destroyNetworkName = function () {
        if (this._networkNameSprite) {
            "DESTROY NAME".p();
            this.parent.removeChild(this._networkNameSprite);
            this._networkNameSprite = null;
        }
    };

    //?[NEW]
    Sprite_Character.prototype._createNetworkName = function () {
        this._networkNameSprite = new AlphaNET.LIBS.Sprite_NetCharName();
        this._networkNameSprite.setCharacter(this._character);
        this.parent.addChild(this._networkNameSprite);
    };

    //?[NEW]
    Sprite_Character.prototype._refreshNetworkName = function () {
        this._networkNameSprite.visible = (this._networkIconSprite == null);
        if(this._networkNameSprite.visible == true)
            this._networkNameSprite.visible = !this._character.isTransparent();
        this._networkNameSprite.x = this.x;
        this._networkNameSprite.y = this.y - this.height;
    };

    //?[NEW]
    Sprite_Character.prototype.refreshForNetwork = function () {
        this._destroyNetworkName(); // * Обновляем Nameplate
    };
})();
// ■ END Sprite_Character.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_NetCharName.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_NetCharName;
  Sprite_NetCharName = class Sprite_NetCharName extends Sprite {
    constructor() {
      super();
      this.anchor.x = 0.5;
      this.anchor.y = 1;
      this.z = 12;
    }

    setCharacter(character) {
      this.character = character;
      this._setupStyle();
      this._createBitmap();
      this._drawBackGround();
      this._drawPicture();
      return this._drawName();
    }

    _setupStyle() {
      var charStyleId, style;
      charStyleId = this.character.getNetworkNameStyleId();
      if (charStyleId != null) {
        style = ANJsonSettings.getNamePlateDataForId(charStyleId);
      } else {
        style = null;
      }
      return this._loadStyle(style);
    }

    _loadStyle(style) {
      if (style == null) {
        style = this._getDefaultData();
      }
      return this._style = style;
    }

    _createBitmap() {
      return this.bitmap = new Bitmap(this._style.width, this._style.height);
    }

    _drawBackGround() {
      var colorA, colorB;
      try {
        if (this._style.backgroundColor == null) {
          return;
        }
        colorA = KDCore.Color.FromHex(this._style.backgroundColor.colorA);
        colorB = KDCore.Color.FromHex(this._style.backgroundColor.colorB);
        if (colorA == null) {
          colorA = KDCore.Color.BLACK;
        }
        if (colorB == null) {
          colorB = colorA;
        }
        colorA = colorA.reAlpha(this._style.backgroundColorOpacity);
        colorB = colorB.reAlpha(this._style.backgroundColorOpacity);
        return this.bitmap.gradientFillRect(0, 0, this.width, this.height, colorA.CSS, colorB.CSS, true);
      } catch (error) {
        return AlphaNET.warning("Wrong Character Name background color");
      }
    }

    _drawPicture() {
      var pic;
      if (this._style.backPicture == null) {
        return;
      }
      try {
        pic = new Sprite(ImageManager.loadPicture(this._style.backPicture));
        pic.anchor.x = 0.5;
        pic.anchor.y = 1;
        return this.addChild(pic);
      } catch (error) {
        return AlphaNET.warning("Wrong Character Name background Picture");
      }
    }

    _drawName() {
      var name, text;
      name = this.character.getNetworkName();
      text = new Sprite(new Bitmap(this.width, this.height));
      this._setupText(text.bitmap);
      text.bitmap.drawText(name, 0, this.height / 2, this.width, 1, 'center');
      text.anchor.x = 0.5;
      text.anchor.y = 1;
      return this.addChild(text);
    }

    _setupText(bitmap) {
      try {
        bitmap.fontSize = this._style.textSize;
        if ((this._style.textColor != null)) {
          bitmap.textColor = KDCore.Color.FromHex(this._style.textColor).CSS;
        }
        if ((this._style.textOutColor != null)) {
          bitmap.outlineColor = KDCore.Color.FromHex(this._style.textOutColor).CSS;
        }
        bitmap.outlineWidth = this._style.textOutWidth;
        if (this._style.textFont != null) {
          bitmap.fontFace = this._style.textFont;
        }
        return bitmap.fontItalic = this._style.textItalic;
      } catch (error) {
        return AlphaNET.warning("Wrong Character Name Text settings");
      }
    }

    _getDefaultData() {
      return {
        backgroundColor: {
          colorA: "#000000",
          colorB: "#000000"
        },
        backgroundColorOpacity: 100,
        backPicture: null,
        width: 54,
        height: 18,
        textSize: 12,
        textFont: null,
        textColor: null,
        textOutColor: null,
        textOutWidth: 3,
        textItalic: false
      };
    }

  };
  AlphaNET.register(Sprite_NetCharName);
})();

// ■ END Sprite_NetCharName.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_NetStatusIcon.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_NetStatusIcon;
  Sprite_NetStatusIcon = class Sprite_NetStatusIcon extends Sprite_Balloon {
    constructor() {
      super();
    }

    loadBitmap() {
      this.bitmap = ImageManager.loadNetwork('StateIcons');
      return this.setFrame(0, 0, 0, 0);
    }

    setup(iconId) {
      this._balloonId = iconId;
      return this._duration = 5 * this.speed() + this.waitTime();
    }

    update() {
      super.update();
      if (this._duration <= 0) {
        this._firstStep = true;
        return this.setup(this._balloonId);
      }
    }

    frameIndex() {
      var frameIndex, index;
      index = (this._duration - this.waitTime()) / this.speed();
      frameIndex = 4 - Math.max(Math.floor(index), 0);
      if (this._firstStep == null) {
        return frameIndex;
      } else {
        if (frameIndex === 0) {
          return 1;
        } else {
          return frameIndex;
        }
      }
    }

  };
  AlphaNET.register(Sprite_NetStatusIcon);
})();

// ■ END Sprite_NetStatusIcon.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AXUI_Container.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[PART OF Alpha ABS AXUI]
(function() {
  var UIContainer;
  UIContainer = class UIContainer extends Sprite {
    constructor(size) {
      super(new Bitmap(size, size));
      this.size = size;
      this.items = [];
      this.orientation = "horizontal";
      this.placePoint = "rigth";
      this.itemsCount = 1;
      this.spacing = 0;
      this.move(100, 100);
    }

    //?{PUBLIC}
    setItemsCount(itemsCount) {
      this.itemsCount = itemsCount;
      return this._refreshMain();
    }

    _refreshMain() {
      var s;
      s = this._getSize() * this.itemsCount;
      this.bitmap = new Bitmap(s, s);
      this._rearrange();
      return this._refreshPlace();
    }

    _getSize() {
      return this.size + this.spacing;
    }

    //?{PUBLIC}
    setSpacing(spacing) {
      this.spacing = spacing;
      return this._refreshMain();
    }

    //?{PUBLIC}
    addChild(sprite) {
      this._createItem(sprite);
      this._rearrange();
      return this._refreshPlace();
    }

    _createItem(sprite) {
      this._reCreatePlacer(sprite.visible);
      this.items.push(sprite);
      return this._placer.addChild(sprite);
    }

    _reCreatePlacer(isNew) {
      var pl, s, visLen;
      if (this._placer != null) {
        super.removeChild(this._placer);
      }
      visLen = this._visItemsLength();
      if (isNew === true) {
        visLen += 1;
      }
      s = this._getSize() * visLen;
      s -= this.spacing;
      this._placer = new Sprite(new Bitmap(s, s));
      super.addChild(this._placer);
      pl = this._placer;
      this.items.forEach(function(item) {
        if (item.visible === true) {
          return pl.addChild(item);
        }
      });
    }

    _visItemsLength() {
      var count, i, j, ref;
      count = 0;
      for (i = j = 0, ref = this.items.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        if (this.items[i].visible === true) {
          count++;
        }
      }
      return count;
    }

    _rearrange() {
      var ref, ref1;
      if (this._placer == null) {
        return;
      }
      if ((ref = this._placer.children[0]) != null) {
        ref.x = 0;
      }
      if ((ref1 = this._placer.children[0]) != null) {
        ref1.y = 0;
      }
      if (this.isVertical()) {
        return this._rearrangeVertical();
      } else {
        return this._rearrangeHorizontal();
      }
    }

    _rearrangeVertical() {
      var i, items, j, ref, results, s;
      items = this._placer.children;
      s = this._getSize();
      results = [];
      for (i = j = 1, ref = items.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
        results.push(items[i].y = items[0].y + (s * i));
      }
      return results;
    }

    _rearrangeHorizontal() {
      var i, items, j, ref, results, s;
      items = this._placer.children;
      s = this._getSize();
      results = [];
      for (i = j = 1, ref = items.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
        results.push(items[i].x = items[0].x + (s * i));
      }
      return results;
    }

    _refreshPlace() {
      if (this._placer == null) {
        return;
      }
      if (this.isVertical()) {
        return this._refreshPlaceVertical();
      } else {
        return this._refreshPlaceHorizontal();
      }
    }

    _refreshPlaceVertical() {
      if (this.placePoint === "center") {
        this._placer.y = this.height / 2;
        this._placer.y = this._placer.y - (this._placer.height / 2);
      }
      if (this.placePoint === "left") {
        this._placer.y = this.height;
        return this._placer.y = this._placer.y - this._placer.height;
      }
    }

    _refreshPlaceHorizontal() {
      if (this.placePoint === "center") {
        this._placer.x = this.width / 2;
        this._placer.x = this._placer.x - (this._placer.width / 2);
      }
      if (this.placePoint === "left") {
        this._placer.x = this.width;
        return this._placer.x = this._placer.x - this._placer.width;
      }
    }

    //?{PUBLIC}
    refresh() {
      this._reCreatePlacer(false);
      this._rearrange();
      return this._refreshPlace();
    }

    //?{PUBLIC}
    setHorizontal() {
      this.orientation = "horizontal";
      this._rearrange();
      return this._refreshPlace();
    }

    //?{PUBLIC}
    isHorizontal() {
      return this.orientation === "horizontal";
    }

    //?{PUBLIC}
    setVertical() {
      this.orientation = "vertical";
      this._rearrange();
      return this._refreshPlace();
    }

    
    //?{PUBLIC}
    isVertical() {
      return this.isHorizontal() === false;
    }

    
    //?{PUBLIC}
    setPivotToCenter() {
      this.placePoint = "center";
      return this._refreshPlace();
    }

    
    //?{PUBLIC}
    setPivotToLeft() {
      this.placePoint = "left";
      return this._refreshPlace();
    }

    
    //?{PUBLIC}
    setPivotToRight() {
      this.placePoint = "right";
      return this._refreshPlace();
    }

  };
  AlphaNET.register(UIContainer);
})();

// ■ END AXUI_Container.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_WaitNetwork.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_WaitNetwork;
  Sprite_WaitNetwork = (function() {
    class Sprite_WaitNetwork extends Sprite {
      constructor() {
        super(new Bitmap(Graphics.width, Sprite_WaitNetwork.HEIGHT));
        this._waitId = 0;
        this._stepper = 0;
        this.move(0, (Graphics.height / 2) - Sprite_WaitNetwork.HEIGHT / 2);
        this.hide();
      }

      isActive() {
        return this.visible === true && (this.parent != null);
      }

      activate(waitId) {
        this.bitmap.clear();
        this._waitId = waitId;
        this.visible = true;
        return this._drawMain();
      }

      //@_startThread()
      hide() {
        return this.visible = false;
      }

      _drawMain() {
        var prefix, text;
        this.bitmap.clear();
        this.bitmap.fontSize = 38;
        this.bitmap.textColor = KDCore.Color.RED.CSS;
        this.bitmap.fillAll(Sprite_WaitNetwork.colorA);
        text = this._getText();
        prefix = ''; //@_getPrefix()
        return this.bitmap.drawText(text + prefix, 0, Sprite_WaitNetwork.HEIGHT / 2, Graphics.width, 1, 'center');
      }

      _getText() {
        if (this._waitId === Network.WAIT_PLAYER) {
          return 'Waiting players';
        }
        return 'Waiting server';
      }

      _getPrefix() {
        var i, j, prefix, ref;
        prefix = "";
        this._stepper += 1;
        for (i = j = 0, ref = this._stepper; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          prefix += '.';
        }
        if (this._stepper > 2) {
          this._stepper = 0;
        }
        return prefix;
      }

      _startThread() {
        var updPrefix;
        return setTimeout((updPrefix = () => {
          this._drawMain();
          if (this.isActive()) {
            return setTimeout(updPrefix.bind(this), 200);
          }
        }), 200);
      }

    };

    Sprite_WaitNetwork.HEIGHT = 100;

    Sprite_WaitNetwork.colorA = KDCore.Color.BLACK.reAlpha(100);

    return Sprite_WaitNetwork;

  }).call(this);
  AlphaNET.register(Sprite_WaitNetwork);
})();

// ■ END Sprite_WaitNetwork.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_WaitNetworkMini.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_WaitNetworkMini;
  Sprite_WaitNetworkMini = (function() {
    class Sprite_WaitNetworkMini extends Sprite {
      constructor() {
        super(new Bitmap(Sprite_WaitNetworkMini.WIDTH, Sprite_WaitNetworkMini.HEIGHT));
        this._stepper = false;
        this.hide();
      }

      isActive() {
        return this.visible === true && (this.parent != null);
      }

      activate() {
        this.bitmap.clear();
        this.visible = true;
        return this._startThread();
      }

      hide() {
        return this.visible = false;
      }

      _drawMain() {
        var prefix;
        this.bitmap.clear();
        this.bitmap.fontSize = 12;
        this.bitmap.textColor = KDCore.Color.RED.CSS;
        this.bitmap.gradientFillRect(0, 0, Sprite_WaitNetworkMini.WIDTH, 20, Sprite_WaitNetworkMini.colorA.CSS, Sprite_WaitNetworkMini.colorB.CSS, false);
        prefix = this._getPrefix();
        return this.bitmap.drawText('NetSync ' + prefix, 2, 10, Sprite_WaitNetworkMini.WIDTH, 1, 'center');
      }

      _getPrefix() {
        var prefix;
        prefix = "\\";
        this._stepper = !this._stepper;
        if (this._stepper === true) {
          prefix = "/";
        }
        return prefix;
      }

      _startThread() {
        var updPrefix;
        return setTimeout((updPrefix = () => {
          this._drawMain();
          if (this.isActive()) {
            return setTimeout(updPrefix.bind(this), 200);
          }
        }), 400);
      }

    };

    Sprite_WaitNetworkMini.WIDTH = 90;

    Sprite_WaitNetworkMini.HEIGHT = 20;

    Sprite_WaitNetworkMini.colorA = KDCore.Color.BLACK.reAlpha(180);

    Sprite_WaitNetworkMini.colorB = KDCore.Color.NONE;

    return Sprite_WaitNetworkMini;

  }).call(this);
  AlphaNET.register(Sprite_WaitNetworkMini);
})();

// ■ END Sprite_WaitNetworkMini.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ XButton.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//?VERSION 1.2
(function() {
  var Sprite_XButton;
  Sprite_XButton = class Sprite_XButton extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return Sprite_Button.prototype.isActive.call(this);
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      return this.refreshEnDisState();
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this._cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    _cursorInButton() {
      var m;
      m = __SmousePosition;
      if (m != null) {
        return this.xyInButton(m.x, m.y);
      } else {
        return false;
      }
    }

    xyInButton(x, y) {
      var inRect, rx, ry;
      rx = Sprite_Button.prototype.canvasToLocalX.call(this, x);
      ry = Sprite_Button.prototype.canvasToLocalY.call(this, y);
      inRect = rx >= 0 && ry >= 0 && rx < this._realWidth() && ry < this._realHeight();
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(rx, ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel === 255;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new PointX(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warning('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warning('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        return this.applyDisableState();
      } else {
        return this.applyNormalState();
      }
    }

    updateComplexTextVisible() {}

    drawStyledTextOnButton(text, w, h, style) {
      this._styledText = AASprite.FromBitmap(w, h);
      this._styledText.applyTextSettingsByExtraSettings(this._styledText, style);
      this._styledText.drawTextFull(text, style.position);
      return this.addChild(this._styledText);
    }

  };
  AlphaNET.register(Sprite_XButton);
})();

// ■ END XButton.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SpriteChatLine.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var SpriteChatLine;
  SpriteChatLine = class SpriteChatLine extends AASprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createBackground();
      this._createChannelText();
      this._createNameText();
      return this._createText();
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getChatSettings()[2];
      return this.S = this.settings;
    }

    _createBackground() {
      this._background = AASprite.FromBitmap(this.S.chatLineWidth, this.S.chatLineHeight);
      this._background.bitmap.fillAll(KDCore.Color.FromHex(this.S.background.color));
      this._background.opacity = this.S.background.opacity;
      return this.addChild(this._background);
    }

    _createChannelText() {
      this._channel = AASprite.FromBitmap(this.S.channelText.textZoneWidth, this.S.channelText.textZoneHeight);
      this.applyTextSettingsByExtraSettings(this._channel, this.S.channelText);
      return this.addChild(this._channel);
    }

    _createNameText() {
      this._name = AASprite.FromBitmap(this.S.nameText.textZoneWidth, this.S.nameText.textZoneHeight);
      this.applyTextSettingsByExtraSettings(this._name, this.S.nameText);
      return this.addChild(this._name);
    }

    _createText() {
      this._textSpr = AASprite.FromBitmap(this.S.text.textZoneWidth, this.S.text.textZoneHeight);
      this.applyTextSettingsByJson(this._textSpr, this.S);
      return this.addChild(this._textSpr);
    }

    drawName(text, color) {
      if (!this._name) {
        return;
      }
      this._name.bitmap.clear();
      if (color != null) {
        this._name.bitmap.textColor = color;
      }
      return this._name.bitmap.drawTextFull(text, this.S.nameText.position);
    }

    drawChannel(text, color) {
      if (this._channel == null) {
        return;
      }
      this._channel.bitmap.clear();
      if (color != null) {
        this._channel.bitmap.textColor = color;
      }
      return this._channel.bitmap.drawTextFull('[' + text + ']', this.S.channelText.position);
    }

    drawText(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.bitmap.clear();
      return this._textSpr.bitmap.drawTextFull(text, this.S.text.position);
    }

    moveTo(dx) {
      this._needMove = dx;
      return this.move(-this.S.chatLineWidth, this.y);
    }

    moveUp(dy) {
      return this.move(this.x, this.y - dy);
    }

    changeBackOpacity() {
      return this._background.opacity = this.S.background.opacityInQueue;
    }

    update() {
      super.update();
      if (this._needMove != null) {
        this.x += 10;
        if (this.x >= this._needMove) {
          this.x = this._needMove;
          return this._needMove = null;
        }
      }
    }

  };
  AlphaNET.register(SpriteChatLine);
})();

// ■ END SpriteChatLine.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SpriteChatMain.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var SpriteChatMain;
  SpriteChatMain = class SpriteChatMain extends AASprite {
    constructor() {
      super();
      this._isOpen = false;
      this._inOpenMode = false;
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createMovable();
      this._createBackground();
      this._createContent();
      this._createShowButton();
      this._createSayButton();
      this._createBorder();
      return this.moveByJson(this.settings);
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getChatSettings()[0];
      this.S = this.settings;
      return this._hideDX = this.settings.lineStartPositionX;
    }

    _createMovable() {
      this._movableSprite = new Sprite();
      this._movableSprite.move(this._hideDX, 0);
      return this.addChild(this._movableSprite);
    }

    _createBackground() {
      this._background = AASprite.FromBitmap(this.S.background.width, this.S.background.heigth);
      this._background.bitmap.fillAll(KDCore.Color.FromHex(this.S.background.color));
      this._background.opacity = this.S.background.opacity;
      return this._movableSprite.addChild(this._background);
    }

    _createContent() {
      this._chatContent = new Sprite();
      this._chatContent.visible = false;
      return this._movableSprite.addChild(this._chatContent);
    }

    _createShowButton() {
      var _s, img0, img1, img2;
      _s = this.S.buttons.showChatButton;
      this._showBtn = new AlphaNET.LIBS.Sprite_XButton();
      img0 = ImageManager.loadNetwork(_s.mainImg);
      img1 = ImageManager.loadNetwork(_s.hoverImg);
      img2 = ImageManager.loadNetwork(_s.pressedImg);
      this._showBtn.setButtonImages(img0, img1, img2);
      this._showBtn.move(_s.marginX, _s.marginY);
      this._showBtn.addClickHandler(this._showButtonClick.bind(this));
      return this._movableSprite.addChild(this._showBtn);
    }

    _createSayButton() {
      var _s, img0, img1, img2;
      _s = this.S.buttons.sayButton;
      this._sayBtn = new AlphaNET.LIBS.Sprite_XButton();
      img0 = ImageManager.loadNetwork(_s.mainImg);
      img1 = ImageManager.loadNetwork(_s.hoverImg);
      img2 = ImageManager.loadNetwork(_s.pressedImg);
      this._sayBtn.setButtonImages(img0, img1, img2);
      this._sayBtn.move(_s.marginX, _s.marginY);
      this._sayBtn.addClickHandler(function() {
        return SceneManager.push(ANET.LIBS.Scene_ChatInput);
      });
      return this._movableSprite.addChild(this._sayBtn);
    }

    _createBorder() {
      this._chatBorder = new AlphaNET.LIBS.SpriteChatMini();
      return this.addChild(this._chatBorder);
    }

    _showButtonClick() {
      if (this.isOpen()) {
        return this.close();
      } else {
        return this.open();
      }
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      if (this.isAnimated()) {
        return;
      }
      this._chatContent.visible = true;
      this.drawNotify(0);
      this.hideNotify();
      this._inOpenMode = true;
      this._tempObject = { // * Так как ValueSwing не умеет работать с отрицательными числами (TODO: ИСПРАВИТЬ!)
        x: Math.abs(this._movableSprite.x)
      };
      this._animator = new AlphaNET.LIBS.ValueSwing(this._tempObject, "x", 30);
      return this._animator.start();
    }

    drawNotify(text = '0') {
      return this._chatBorder.drawText(text);
    }

    hideNotify() {
      return this._chatBorder.hideNotify();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      if (this.isAnimated()) {
        return;
      }
      this._movableSprite.opacity = 255;
      this.drawNotify(0);
      this._inOpenMode = false;
      this._tempObject = {
        x: Math.abs(this._hideDX)
      };
      this._animator = new AlphaNET.LIBS.ValueSwing(this._tempObject, "x", 30);
      this._animator.setIncrementMode();
      return this._animator.start();
    }

    isAnimated() {
      return this._animator != null;
    }

    isOpen() {
      return this._isOpen === true;
    }

    isUnderTouch() {
      return this._background.inPosition(TouchInput) || this._chatBorder.isUnderTouch(TouchInput) || this._sayBtn.touchInButton() || this._showBtn.touchInButton();
    }

    update() {
      super.update();
      this._updateAnimator();
      if (this.isOpen()) {
        return this._updateOpacityChange();
      }
    }

    _updateAnimator() {
      if (this._animator != null) {
        this._movableSprite.x = 0 - this._tempObject.x;
        this._animator.update();
        if (this._animator.isReady()) {
          this._animator = null;
          return this._resetAfterAnimation();
        }
      }
    }

    _resetAfterAnimation() {
      if (this._inOpenMode === true) {
        this._movableSprite.x = 0;
        return this._isOpen = true;
      } else {
        this._chatBorder.showNofity();
        this._movableSprite.x = this._hideDX;
        this._isOpen = false;
        this._chatContent.visible = false;
        return this._movableSprite.opacity = 255;
      }
    }

    _updateOpacityChange() {
      var pos;
      if (this.isAnimated()) {
        return;
      }
      pos = __SmousePosition;
      if (this._background.inPosition(pos)) {
        this._isHovered = true;
        return this._createOpacitySwing();
      } else {
        if (this._isHovered === true) {
          return this._createOpacitySwing2();
        }
      }
    }

    _createOpacitySwing() {
      if (this._movableSprite.opacity < 255) {
        return this._movableSprite.opacity += 4;
      }
    }

    _createOpacitySwing2() {
      if (this._movableSprite.opacity > this.S.unhoveredChatOpacity) {
        this._movableSprite.opacity -= 4;
      }
      if (this._movableSprite.opacity <= this.S.unhoveredChatOpacity) {
        return this._isHovered === false;
      }
    }

    addChatLine(chatLine) {
      var ref;
      return (ref = this._chatContent) != null ? ref.addChild(chatLine) : void 0;
    }

    removeLine(chatLine) {
      var ref;
      return (ref = this._chatContent) != null ? ref.removeChild(chatLine) : void 0;
    }

  };
  AlphaNET.register(SpriteChatMain);
})();

// ■ END SpriteChatMain.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SpriteChatMini.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var SpriteChatMini;
  SpriteChatMini = class SpriteChatMini extends AASprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createMainSprite();
      this._createNotifyCircle();
      return this._createNotifyText();
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getChatSettings()[1];
      return this.S = this.settings;
    }

    _createMainSprite() {
      this._border = AASprite.FromImg(this.settings.miniBorderImage);
      this.addChild(this._border);
      return this._border.move(this.S.miniBorderMarginX, this.S.miniBorderMarginY);
    }

    _createNotifyCircle() {
      this._notifyIcon = AASprite.FromImg(this.settings.notifyIconImage);
      this.addChild(this._notifyIcon);
      return this._notifyIcon.move(this.S.notifyIconMarginX, this.S.notifyIconMarginY);
    }

    _createNotifyText() {
      this._textSpr = AASprite.FromBitmap(this.S.text.textZoneWidth, this.S.text.textZoneHeight);
      this.applyTextSettingsByJson(this._textSpr, this.settings);
      this._notifyIcon.addChild(this._textSpr);
      return this.drawText('0');
    }

    drawText(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.bitmap.clear();
      return this._textSpr.bitmap.drawTextFull(text, this.S.text.position);
    }

    hideNotify() {
      return this._notifyIcon.visible = false;
    }

    showNofity() {
      return this._notifyIcon.visible = true;
    }

    isUnderTouch(point) {
      return this._border.inPosition(point);
    }

  };
  AlphaNET.register(SpriteChatMini);
})();

// ■ END SpriteChatMini.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function () {
        _alias_Spriteset_Map_update.call(this, ...arguments);
        this._updateNetworkRefreshRequest();
    };

    //?[NEW]
    Spriteset_Map.prototype._updateNetworkRefreshRequest = function () {
        if ($gameMap.isSpritesRefreshRequestedForNetwork()) {
            $gameMap.spritesRefreshForNetworkComplete();
            "REFRESH SPRITEST".p();
            for (var i = 0; i < this._characterSprites.length; i++) {
                var sprite = this._characterSprites[i];
                if (sprite != null) {
                    sprite.refreshForNetwork();
                }
            }
        }
    };
})();
// ■ END Spriteset_Map.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ TradeItems.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var TradeItems;
  TradeItems = class TradeItems {
    constructor() {
      this.items = [];
      this.counts = [];
      this.gold = 0;
      this.index = 0;
      this._needRefresh = false;
    }

    setCurrentIndex(index1) {
      this.index = index1;
    }

    putItem(item) {
      this.items[this.index] = item;
      return this.counts[this.index] = 1;
    }

    getItem(index) {
      return this.items[index];
    }

    getCount(index) {
      return this.counts[index];
    }

    setCount(count) {
      return this.counts[this.index] = count;
    }

    setGold(gold) {
      this.gold = gold;
    }

    upCount(index) {
      return this.setCount(this.getCount(index) + 1);
    }

    downCount(index) {
      return this.setCount(this.getCount(index) - 1);
    }

    upGold() {
      return this.setGold(this.gold + 1);
    }

    downGold() {
      return this.setGold(this.gold - 1);
    }

    isNeedRefresh() {
      return this._needRefresh === true;
    }

    onRefresh() {
      return this._needRefresh = false;
    }

    needRefresh() {
      return this._needRefresh = true;
    }

    send() {
      return Network.sendMessage(NetMessage.TradeItems().setData(this.networkData()));
    }

    networkData() {
      var _getItemType;
      _getItemType = function(item) {
        if (DataManager.isWeapon(item)) {
          return 1;
        }
        if (DataManager.isArmor(item)) {
          return 2;
        }
        return 0;
      };
      return {
        counts: this.counts,
        gold: this.gold,
        items: this.items.map(function(item) {
          return [item.id, _getItemType(item)];
        })
      };
    }

    consume() { // * Забрать эти предметы у игрока
      if (this.gold > 0) {
        $gameParty.loseGold(this.gold);
      }
      return this.items.forEach((item, index) => {
        return $gameParty.gainItem(item, -this.counts[index]);
      });
    }

    release() { // * Выдать эти предметы игроку
      if (this.gold > 0) {
        $gameParty.gainGold(this.gold);
      }
      return this.items.forEach((item, index) => {
        return $gameParty.gainItem(item, this.counts[index]);
      });
    }

    static FromNetwork(networkData) {
      var items;
      items = new TradeItems();
      items.gold = networkData.gold;
      items.counts = networkData.counts;
      items.items = networkData.items.map(function(item) {
        var storage;
        storage = $dataItems;
        if (item[1] === 1) {
          storage = $dataWeapons;
        }
        if (item[1] === 2) {
          storage = $dataArmors;
        }
        return storage[item[0]];
      });
      items.needRefresh();
      return items;
    }

  };
  ANET.register(TradeItems);
})();

// ■ END TradeItems.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ User API.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[GLOBAL DEFINITION]
var uAPI;

uAPI = function() {
  throw new Error("This is a static class");
};

uAPI.showMessageInChat = function(actorId, message, channelId = 0) {
  var msg;
  msg = {
    channelId: channelId,
    text: message
  };
  return Network._onNewChatMessage(actorId, msg);
};

uAPI.sendMessageToChat = function(message, channelId = 0) {
  return Network.sendChatMessage(message, channelId);
};

//?[SYNCED]
uAPI.setNameplateStyle = function(actorId, styleId) {
  var data;
  if (uAPI._setNameplateStyle(...arguments)) {
    data = {
      name: "_setNameplateStyle",
      parameters: [actorId, styleId]
    };
    Network.sendMessage(NetMessage.CallUApi().setData(data));
  }
};

//?{PRIVATE OUTER PAIR}
uAPI._setNameplateStyle = function(actorId, styleId) {
  var actor;
  try {
    actor = $gameActors.actor(actorId);
    if (actor == null) {
      return;
    }
    actor._networkNameplateStyleId = styleId;
    $gameMap.requestNetworkRefresh();
    return true;
  } catch (error) {
    AlphaNET.warning('uAPI.setNameplateStyle : something wrong!');
  }
  return false;
};

Object.defineProperties(uAPI, {
  isPvPWin: {
    get: function() {
      return Network.isPvPBattleWin();
    }
  },
  isPvPLoose: {
    get: function() {
      return Network.isPvPBattleLoose();
    }
  },
  hideChat: {
    get: function() {
      return NetUIManager.hideChat();
    }
  },
  showChat: {
    get: function() {
      return NetUIManager.showChat();
    }
  }
});

(Object.freeze || Object)(uAPI);

// ■ END User API.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ValueSwing.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ValueSwing;
  ValueSwing = class ValueSwing {
    constructor(swingObject, fieldName, time) {
      this.swingObject = swingObject;
      this.fieldName = fieldName;
      this.mode = 1;
      this._repeat = false;
      this._ready = false;
      this._started = false;
      this._config = {
        start: this.getValue(),
        step: this.getValue() / time
      };
      this._refreshConfig();
    }

    getValue() {
      return this.swingObject[this.fieldName];
    }

    _refreshConfig() {
      if (this.isIncrement()) {
        this._config.toValue = this._config.start;
        this._config.fromValue = 0;
      } else {
        this._config.toValue = 0;
        this._config.fromValue = this._config.start;
      }
      return this.setValue(this._config.fromValue);
    }

    isIncrement() {
      return this.mode === 0;
    }

    setValue(value) {
      return this.swingObject[this.fieldName] = value;
    }

    start() {
      this._ready = false;
      return this._started = true;
    }

    reset() {
      this._ready = true;
      return this.setValue(this._config.start);
    }

    stop() {
      return this._started = false;
    }

    isStarted() {
      return this._started === true;
    }

    isReady() {
      return this._ready === true;
    }

    setIncrementMode() {
      this.mode = 0;
      this.stop();
      return this._refreshConfig();
    }

    setDecrementMode() {
      this.mode = 1;
      this.stop();
      return this._refreshConfig();
    }

    setRepeat() {
      return this._repeat = true;
    }

    update() {
      if (!this.isStarted()) {
        return;
      }
      if (this.isIncrement()) {
        this._updateIncr();
      } else {
        this._updateDecr();
      }
      if (this.isReady() && this._repeat === true) {
        return this._changeMode();
      }
    }

    _updateIncr() {
      var v;
      if (this.isReady()) {
        return;
      }
      v = this.getValue();
      if (v < this._config.toValue - this._config.step) {
        return this.setValue(v + this._config.step);
      } else {
        return this._swingDone();
      }
    }

    _swingDone() {
      this.setValue(this._config.toValue);
      return this._ready = true;
    }

    _updateDecr() {
      var v;
      if (this.isReady()) {
        return;
      }
      v = this.getValue();
      if (v > this._config.toValue + this._config.step) {
        return this.setValue(v - this._config.step);
      } else {
        return this._swingDone();
      }
    }

    _changeMode() {
      if (this.isIncrement()) {
        this.setDecrementMode();
      } else {
        this.setIncrementMode();
      }
      return this.start();
    }

  };
  AlphaNET.register(ValueSwing);
})();

// ■ END ValueSwing.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChatInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_ChatInput;
  Window_ChatInput = class Window_ChatInput extends Window_Base {
    constructor(x, y, w, h) {
      super(x, y, w, h);
      this._loadSettings();
      this.setBackgroundType(2);
      this._createInputBackground();
      this._createInputLine();
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getChatSettings()[4];
      this.S = this.settings;
      return this.maxTextLength = this.settings.maxInputTextLength;
    }

    _createInputBackground() {
      this._background = AASprite.FromImg(this.S.backgroundImage);
      this._background.move(this.S.marginX, this.S.marginY);
      return this.addChild(this._background);
    }

    _createInputLine() {
      this.sprText = AASprite.FromBitmap(this.S.inputText.textZoneWidth, this.S.inputText.textZoneHeight);
      this.sprText.applyTextSettingsByExtraSettings(this.sprText, this.S.inputText);
      this.addChild(this.sprText);
      this._inputText = "";
      return this._printText();
    }

    _printText() {
      var add;
      this.sprText.bitmap.clear();
      add = "";
      if (this._isCanAddSymbol()) {
        add = "_";
      }
      return this.sprText.bitmap.drawTextFull(this._inputText + add, 'left');
    }

    _isCanAddSymbol() {
      return this._inputText.length < this.maxTextLength;
    }

    update() {
      var key;
      super.update();
      if (Input.isPressed('shift')) {
        this._needBigSymbol = true;
      } else {
        this._needBigSymbol = false;
      }
      if (Input.isTriggered('space')) {
        this._printSymbol(" ");
      }
      if (Input.isTriggered('Backspace') || Input.isLongPressed('Backspace')) {
        this._deleteSymbol();
      }
      key = Input.isAnyTriggered() || Input.isAnyLongPressed();
      if (key != null) {
        return this._printSymbol(key);
      }
    }

    _printSymbol(sym) {
      if (this._needBigSymbol === true) {
        sym = sym.toUpperCase();
      }
      if (this._isCanAddSymbol()) {
        this._inputText += sym;
      }
      return this._printText();
    }

    _deleteSymbol() {
      this._inputText = this._inputText.substring(0, this._inputText.length - 1);
      return this._printText();
    }

    getInputText() {
      return this._inputText;
    }

  };
  ANET.register(Window_ChatInput);
})();

// ■ END Window_ChatInput.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Window_ChoiceList_start5454 = Window_ChoiceList.prototype.start;
    Window_ChoiceList.prototype.start = function () {
        if ($gameMessage.isChoiseSharedMode()) {
            this.setNetworkShared(true);
            $gameMessage.setSharedChoiseMode(false);
        } else {
            this.setNetworkShared(false);
        }
        _alias_Window_ChoiceList_start5454.call(this, ...arguments);
    };
})();
// ■ END Window_ChoiceList.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_IpConfig.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_IpConfig;
  Window_IpConfig = class Window_IpConfig extends Window_Command {
    constructor() {
      super((Graphics._boxWidth / 2) - 120, 300);
    }

    makeCommandList() {
      this.addCommand('      IP     ', 'ip', true);
      return this.addCommand('     Port', 'port', true);
    }

    windowWidth() {
      return 240;
    }

  };
  AlphaNET.register(Window_IpConfig);
})();

// ■ END Window_IpConfig.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_IpInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_IpInput;
  Window_IpInput = class Window_IpInput extends Window_Selectable {
    constructor() {
      super();
    }

    initialize() {
      this.imgs = [ImageManager.loadNetwork('btn1'), ImageManager.loadNetwork('btn2'), ImageManager.loadNetwork('btn3')];
      this._extendsXButton();
      super.initialize(0, 0, 320, 90);
      this.openness = 0;
      this.createButtons();
      return this.updatePlacement();
    }

    _extendsXButton() {
      var Button, buttonValues;
      buttonValues = this.getBasicValues();
      Button = AlphaNET.LIBS.Sprite_XButton;
      Button.prototype.drawNumberOnMe = function(text, size) {
        this._textDigitName = new Sprite(new Bitmap(buttonValues.buttonSize, buttonValues.buttonSize));
        this._textDigitName.bitmap.fontSize = size;
        this._textDigitName.bitmap.drawText(text, 0, buttonValues.buttonSize / 2, buttonValues.buttonSize, 1, 'center');
        return this.addChild(this._textDigitName);
      };
      return Button.prototype.setButtonDigitMethod = function(digit, method) {
        this.drawNumberOnMe(digit.toString(), buttonValues.textSize);
        return this.addClickHandler(method(digit));
      };
    }

    getBasicValues() {
      return {
        textSize: 24,
        buttonSize: 40,
        spacing: 2
      };
    }

    createButtons() {
      var Button, btn, buttonValues, cont, i, j, k, l, spacingBetweenLines;
      this._buttons = [];
      buttonValues = this.getBasicValues();
      Button = AlphaNET.LIBS.Sprite_XButton;
      this._inputPanel = new Sprite();
      spacingBetweenLines = buttonValues.buttonSize + buttonValues.spacing;
      for (i = k = 0; k < 5; i = ++k) {
        cont = new AlphaNET.LIBS.UIContainer(buttonValues.buttonSize);
        cont.setItemsCount(3);
        cont.setSpacing(buttonValues.spacing);
        this._inputPanel.addChild(cont);
        cont.move(0, spacingBetweenLines * i);
        for (j = l = 0; l < 3; j = ++l) {
          btn = new Button();
          btn.setButtonImages(...this.imgs);
          cont.addChild(btn);
          this._buttons.push(btn);
        }
      }
      this.addChild(this._inputPanel);
      this._setDigitInputMethods();
    }

    _setDigitInputMethods() {
      var m;
      m = this._onDigitButtonClick.bind(this);
      this._buttons[0].setButtonDigitMethod(7, m);
      this._buttons[1].setButtonDigitMethod(8, m);
      this._buttons[2].setButtonDigitMethod(9, m);
      this._buttons[3].setButtonDigitMethod(4, m);
      this._buttons[4].setButtonDigitMethod(5, m);
      this._buttons[5].setButtonDigitMethod(6, m);
      this._buttons[6].setButtonDigitMethod(1, m);
      this._buttons[7].setButtonDigitMethod(2, m);
      this._buttons[8].setButtonDigitMethod(3, m);
      this._buttons[10].setButtonDigitMethod(0, m);
      this._buttons[11].hide();
      this._buttons[9].hide();
      this._buttons[12].addClickHandler(this._onDigitButtonClearClick.bind(this));
      this._buttons[12].drawNumberOnMe("C", this.getBasicValues().textSize);
      this._buttons[13].addClickHandler(this._onDigiButtonPointClick.bind(this));
      this._buttons[13].drawNumberOnMe(".", this.getBasicValues().textSize);
      this._buttons[14].addClickHandler(this.onButtonOk.bind(this));
      return this._buttons[14].drawNumberOnMe("OK", this.getBasicValues().textSize);
    }

    _onDigitButtonClick(index) {
      return () => {
        SoundManager.playCursor();
        return this._digitInputProcess(index);
      };
    }

    _digitInputProcess(digit) {
      return this._addText(digit);
    }

    _addText(text) {
      if (this._tempText.length >= this.maxLength()) {
        return;
      }
      this._tempText += text;
      return this.refreshText(this._tempText);
    }

    _onDigitButtonClearClick() {
      SoundManager.playCursor();
      this._tempText = this._tempText.substring(0, this._tempText.length - 1);
      return this.refreshText(this._tempText);
    }

    _onDigiButtonPointClick() {
      return this._addText(".");
    }

    updatePlacement() {
      var buttonValues, digitsWidth, dx;
      buttonValues = this.getBasicValues();
      this.width = this.width;
      this.height = this.height;
      this.x = (Graphics.boxWidth - this.width) / 2;
      this.y = (Graphics.boxHeight - this.height) / 2;
      this.y -= (buttonValues.spacing + buttonValues.buttonSize) * 2;
      digitsWidth = buttonValues.buttonSize * 3;
      digitsWidth += buttonValues.spacing * 2;
      dx = (this.width - digitsWidth) / 2;
      return this._inputPanel.move(dx, this.height + (buttonValues.spacing * 2));
    }

    update() {
      super.update();
      this.updateButtonsVisiblity();
      return this.updateInput();
    }

    updateButtonsVisiblity() {
      return this._inputPanel.visible = this.openness >= 255;
    }

    updateInput() {
      var i, j, k, l;
      for (i = k = 0; k <= 9; i = ++k) {
        if (Input.isTriggered(i.toString())) {
          this._digitInputProcess(i);
        }
      }
      for (i = l = 96; l <= 105; i = ++l) {
        j = i - 96;
        if (Input.isTriggered('Numpad' + j.toString())) {
          this._digitInputProcess(j);
        }
      }
      if (Input.isTriggered('Backspace') || Input.isTriggered('backspace')) {
        this._onDigitButtonClearClick();
      }
      if (this.isDigitsOnly()) {
        return;
      }
      if (Input.isTriggered('.') || Input.isTriggered('NumpadDecimal')) {
        this._onDigiButtonPointClick();
      }
    }

    start(symbol) {
      this.textSymbol = symbol;
      this.loadSymbol();
      this.open();
      return this.activate();
    }

    loadSymbol() {
      var text;
      text = this._getTextBySymbol();
      if (text === null || text === "") {
        text = 'localhost';
      }
      this._tempText = text;
      this.refreshText(this._tempText);
      if (this.isDigitsOnly()) {
        return this._buttons[13].hide();
      } else {
        return this._buttons[13].show();
      }
    }

    isDigitsOnly() {
      return this.textSymbol === 'port';
    }

    refreshText(text) {
      this.contents.clear();
      return this.drawText(text, 0, 0, this.contentsWidth(), 'center');
    }

    _getTextBySymbol() {
      return Network[this.textSymbol].toString();
    }

    lineHeight() {
      return 40;
    }

    maxLength() {
      if (this.isDigitsOnly()) {
        return 4;
      } else {
        return 15;
      }
    }

    isOkTriggered() {
      return Input.isTriggered('ok');
    }

    onButtonOk() {
      this.saveTextData();
      return this.callOkHandler();
    }

    saveTextData() {
      return Network[this.textSymbol] = this._tempText;
    }

  };
  AlphaNET.register(Window_IpInput);
})();

// ■ END Window_IpInput.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ItemList.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    
    //@[DEFINES]
    var _ = Window_ItemList.prototype;

    //@[ALIAS]
    var _alias__makeItemList = _.makeItemList;
    _.makeItemList = function () {
        _alias__makeItemList.call(this, ...arguments);
        if (this._isNETTrade()) {
            this._data.unshift({
                id: 0,
                name: "<Nothing>",
                iconIndex: 188
            });
            this._removeNETTradeItems();
        }
    };

    //?[NEW]
    _._isNETTrade = function () {
        return $gameTemp.netTradeItems != null;
    };

    //?[NEW]
    _._removeNETTradeItems = function () {
        // * Удаляем вещи, которые уже были выбрана на продажу
        $gameTemp.netTradeItems.items.forEach(element => {
            if(this._data.indexOf(element) >= 0) {
                this._data.delete(element);
            }
        });
    };

    //@[ALIAS]
    var _alias__isCurrentItemEnabled = _.isCurrentItemEnabled;
    _.isCurrentItemEnabled = function () {
        if (this._isNETTrade())
            return true;
        else
            return _alias__isCurrentItemEnabled.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias__isEnabled = _.isEnabled;
    _.isEnabled = function () {
        if (this._isNETTrade())
            return true;
        else
            return _alias__isEnabled.call(this, ...arguments);
        
    };

    //@[ALIAS]
    var _alias__drawItem = _.drawItem;
    _.drawItem = function (index) {
        if (this._isNETTrade() && index == 0) {
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(1);
            this.drawItemName(this._data[index], rect.x, rect.y, rect.width);
        } else
            _alias__drawItem.call(this, ...arguments);
    };

})();
// ■ END Window_ItemList.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ItemListFroTrade.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_ItemListFroTrade;
  Window_ItemListFroTrade = class Window_ItemListFroTrade extends Window_ItemList {
    constructor() {
      super(...arguments);
    }

  };
  ANET.register(Window_ItemListFroTrade);
})();

// ■ END Window_ItemListFroTrade.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Window_MenuCommand_isFormationEnabled = Window_MenuCommand.prototype.isFormationEnabled;
    Window_MenuCommand.prototype.isFormationEnabled = function () {
        if(Network.isConnected())
            return  false;
        else
            return _alias_Window_MenuCommand_isFormationEnabled.call(this, ...arguments);
    };
})();
// ■ END Window_MenuCommand.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    //@[ALIAS]
    var _alias_Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
    Window_MenuStatus.prototype.isCurrentItemEnabled = function () {
        if (Network.isConnected() && this._isNetworkRestrictSymbol()) {
            return this.index() == (NetPartyManager.getMyPlayerIndex() - 1);
        }
        return _alias_Window_MenuStatus_isCurrentItemEnabled.call(this, ...arguments);
    };

    //?[NEW]
    Window_MenuStatus.prototype._isNetworkRestrictSymbol = function () {
        try {
            var symbol = SceneManager._scene._commandWindow.currentSymbol();
            var isEnabled = (symbol == 'skill' || symbol == 'equip');
            if(Network.isMultiMode()) {
                isEnabled = isEnabled || symbol == 'status';
            }
            return isEnabled;
        } catch (error) {
            AlphaNET.error(error, 'error try get menu symbol');
            return false;
        }
    };
})();
// ■ END Window_MenuStatus.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function () {
        _alias_Window_Message_terminateMessage.call(this, ...arguments);
        if(Network.inBattle())
            BattleManager.syncNet();
        else
            if(Network.isConnected())
                Network.sendIcon(Network.ICON_NONE);
    };

    //@[ALIAS]
    var _alias_Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        _alias_Window_Message_startMessage.call(this, ...arguments);
        if(Network.isConnected()){
            if(!Network.inBattle()) {
                Network.sendIcon(Network.ICON_MESSAGE);
            }
        }
    };
})();
// ■ END Window_Message.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Window_Selectable_initialize = Window_Selectable.prototype.initialize;
    Window_Selectable.prototype.initialize = function () {
        _alias_Window_Selectable_initialize.call(this, ...arguments);
        this._networkShared = false;
    };

    //@[ALIAS]
    var _alias_Window_Selectable_select = Window_Selectable.prototype.select;
    Window_Selectable.prototype.select = function (index) {
        _alias_Window_Selectable_select.call(this, ...arguments);
        if (this.isNetworkShared() && Network.isHost()) {
            this._sendNetworkMessage(index);
        }
    };


    //@[ALIAS]
    var _alias_Window_Selectable_update = Window_Selectable.prototype.update;
    Window_Selectable.prototype.update = function () {
        // * Если не хост, то только получаем выбор от сервера
        if (this.isNetworkShared() && !Network.isHost()) {
            Window_Base.prototype.update.call(this);
            this._updateNetwork();
        } else {
            _alias_Window_Selectable_update.call(this, ...arguments);
        }
    };


    //@[ALIAS]
    var _alias_Window_Selectable_processOk = Window_Selectable.prototype.processOk;
    Window_Selectable.prototype.processOk = function () {
        this._networkProcess('ok');
        _alias_Window_Selectable_processOk.call(this, ...arguments);
    };


    //@[ALIAS]
    var _alias_Window_Selectable_processCancel = Window_Selectable.prototype.processCancel;
    Window_Selectable.prototype.processCancel = function () {
        this._networkProcess('cancel');
        _alias_Window_Selectable_processCancel.call(this, ...arguments);
    };

})();
// ■ END Window_Selectable.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[NEW]
Window_Selectable.prototype._sendNetworkMessage = function (index, action = null) {
    var data = {
        index: index,
        action: action
    };
    Network.sendMessage(NetMessage.WindowSelect().setData(data));
};

//?[NEW]
Window_Selectable.prototype._updateNetwork = function () {
    this._updateActionFromNetwork();
    this._updateSelectionFromNetwork();
};

//?[NEW]
Window_Selectable.prototype._updateActionFromNetwork = function () {
    if (!$gameTemp.networkWAction) return;
    if ($gameTemp.networkWAction == 'ok') {
        this._updateSelectionFromNetwork(); // * Ещё раз обновим индекс, чтобы выбор был точным
        this.processOk();
        $gameTemp.networkWAction = null;
    }
    if ($gameTemp.networkWAction == 'cancel') {
        this.processCancel();
        $gameTemp.networkWAction = null;
    }
};

//?[NEW]
Window_Selectable.prototype._updateSelectionFromNetwork = function () {
    try {
        var index = $gameTemp.networkWSelectedIndex;
        if (index != null) {
            this.select(index);
            $gameTemp.networkWSelectedIndex = null;
        }
    } catch (e) {
        //$[TEMP]
        console.error(e);
    }
};

//?[NEW]
Window_Selectable.prototype._networkProcess = function (symbol) {
    if (!this.isNetworkShared()) return;
    if (Network.isHost()) {
        // * При OK мы дополнительно отправляем index выбора, чтобы выбор был точным
        this._sendNetworkMessage(this.index(), symbol);
    }
};

//?[NEW]
Window_Selectable.prototype.setNetworkShared = function (bool) {
    "WINDOW IN SHARED MODE".p(bool);
    this._networkShared = bool;
};

//?[NEW]
Window_Selectable.prototype.isNetworkShared = function () {
    return (this._networkShared == true && Network.isConnected());
};

// ■ END Window_Selectable_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TradeItemList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_TradeItemList;
  Window_TradeItemList = class Window_TradeItemList extends Window_Selectable {
    constructor(x, y, width, height, outMode) {
      super(x, y, width, height);
      this._outMode = outMode;
      this.settings = ANJsonSettings.getTradeWindowSettings()[0];
      this.S = this.settings.ItemList;
      this._cursorBitmap = ImageManager.loadNetwork(this.S.cursorImage);
      this._cursorDX = null;
      this.onSomethingChangeListener = null;
      this.setBackgroundType(2);
      this._drawSeparator();
      this._createCountButtons();
      this.refresh();
      this.select(0);
      if (this._outMode === true) {
        this.select(-1);
      }
    }

    _drawSeparator() {
      this.separtor = new Sprite(ImageManager.loadNetwork(this.S.separatorImage));
      this.separtor.move(this.S.separatorMarginX, this.S.separatorMarginY);
      return this.addChild(this.separtor);
    }

    _createCountButtons() {
      this.countButtons = new Sprite();
      this.countButtons.visible = !this._outMode;
      this.addChild(this.countButtons);
      this._createButtonA();
      return this._createButtonB();
    }

    _createButtonA() {
      var data, img0, img1, img2, img3;
      data = this.S.countButtonA;
      this.countButtonA = new ANET.LIBS.Sprite_XButton();
      img0 = ImageManager.loadNetwork(data.mainImg);
      img1 = ImageManager.loadNetwork(data.hoverImg);
      img2 = ImageManager.loadNetwork(data.pressedImg);
      img3 = ImageManager.loadNetwork(data.disableImg);
      this.countButtonA.setButtonImages(img0, img1, img2, img3);
      this.countButtonA.move(data.marginX, data.marginY);
      this.countButtonA.addClickHandler(this._onCountButtonAClick.bind(this));
      return this.countButtons.addChild(this.countButtonA);
    }

    _createButtonB() {
      var data, img0, img1, img2, img3;
      data = this.S.countButtonB;
      this.countButtonB = new ANET.LIBS.Sprite_XButton();
      img0 = ImageManager.loadNetwork(data.mainImg);
      img1 = ImageManager.loadNetwork(data.hoverImg);
      img2 = ImageManager.loadNetwork(data.pressedImg);
      img3 = ImageManager.loadNetwork(data.disableImg);
      this.countButtonB.setButtonImages(img0, img1, img2, img3);
      this.countButtonB.addClickHandler(this._onCountButtonBClick.bind(this));
      this.countButtonB.move(data.marginX, data.marginY);
      return this.countButtons.addChild(this.countButtonB);
    }

    _onCountButtonBClick() {
      var index;
      //"CLICK B".p()
      index = this.index();
      if (index <= 3) {
        $gameTemp.netTradeItems.upCount(index);
      } else {
        $gameTemp.netTradeItems.upGold();
      }
      this._calculateCountForItem(this.item());
      this.onSomethingChange();
      return this.refresh();
    }

    _onCountButtonAClick() {
      var index;
      //"CLICK A".p()
      index = this.index();
      if (index <= 3) {
        $gameTemp.netTradeItems.downCount(index);
      } else {
        $gameTemp.netTradeItems.downGold();
      }
      this._calculateCountForItem(this.item());
      this.onSomethingChange();
      return this.refresh();
    }

    isOutMode() {
      return this._outMode === true;
    }

    isGoldIndex() {
      return this.index() === 4;
    }

    isTradeButtonIndex() {
      return this.index() === 5;
    }

    update() {
      super.update();
      if ($gameTemp.netTradeItemsOut.isNeedRefresh() && this.isOutMode()) {
        this.refresh();
        $gameTemp.netTradeItemsOut.onRefresh();
      }
      if ($gameTemp.netTradeItems.isNeedRefresh() && !this.isOutMode()) {
        this.onSomethingChange();
        $gameTemp.netTradeItems.onRefresh();
      }
      this._updateCursorSprite();
      if (this.active === true) {
        return this._updateCountButtons();
      }
    }

    _updateCursorSprite() {
      if (!this.isOutMode()) {
        if (this._cursorDX == null) {
          this._cursorDX = this._windowCursorSprite.x;
        }
        this._windowCursorSprite.bitmap = this._cursorBitmap;
        return this._windowCursorSprite.x = this._cursorDX + this.S.cursorDX;
      } else {
        return this._windowCursorSprite.visible = false;
      }
    }

    _updateCountButtons() {
      var ref, ref1;
      if (this.countButtons.visible !== true) {
        return;
      }
      if (!((ref = this.countButtonA) != null ? ref.isDisabled() : void 0)) {
        if (Input.isTriggered('left')) {
          this._onCountButtonAClick();
        }
        if (Input.isLongPressed('left')) {
          this._onCountButtonAClick();
        }
      }
      if (!((ref1 = this.countButtonB) != null ? ref1.isDisabled() : void 0)) {
        if (Input.isTriggered('right')) {
          this._onCountButtonBClick();
        }
        if (Input.isLongPressed('right')) {
          return this._onCountButtonBClick();
        }
      }
    }

    maxItems() {
      return 6;
    }

    item() {
      var ref;
      if (this.isOutMode()) {
        return (ref = $gameTemp.netTradeItemsOut) != null ? ref.getItem(this.index()) : void 0;
      } else {
        return $gameTemp.netTradeItems.getItem(this.index());
      }
    }

    drawItem(index) {
      var count, item, items, rect, t;
      if (index === 5) {
        return;
      }
      rect = this.itemRectForText(index);
      items = $gameTemp.netTradeItems;
      if (this.isOutMode()) {
        items = $gameTemp.netTradeItemsOut;
      }
      if (index === 4) {
        return this._drawGoldItem(rect, items);
      } else {
        item = items.getItem(index);
        count = items.getCount(index);
        if (item != null) {
          t = `\\I[${item.iconIndex}] ${item.name}\\C[${this.S.itemsCountMVColorIndex}]  [${count}]`;
          return this.drawTextEx(t, rect.x, rect.y + 4, 220, this.lineHeight());
        } else {
          t = `\\I[${this.S.emptyItemIcon}]\\C[${this.S.selectItemMVColorIndex}]${this.S.selectItemCaption}`;
          if (this.isOutMode()) {
            t = `\\I[${this.S.emptyItemIcon}]\\C[${this.S.nothingMVColorIndex}]${this.S.nothingCaption}`;
          }
          return this.drawTextEx(t, rect.x, rect.y + 4, 220, this.lineHeight());
        }
      }
    }

    _drawGoldItem(rect, items) {
      return this.drawTextEx(`\\I[${this.S.coinsIcon}]\\C[${this.S.coinsMVColorIndex}]${this.S.coinsCaption}\\C[${this.S.coinsCountMVColorIndex}]${items.gold}`, rect.x, rect.y + 4, 220, this.lineHeight());
    }

    isCurrentItemEnabled() {
      return true;
    }

    standardFontSize() {
      if (this.S != null) {
        return this.S.fontSize;
      } else {
        return 17;
      }
    }

    standardFontFace() {
      if (this.S != null) {
        return this.S.fontFace;
      }
    }

    lineHeight() {
      if (this.index() < 5) {
        return 36;
      } else {
        return 44;
      }
    }

    drawIcon(iconIndex, x, y) {
      var bitmap, ph, pw, sx, sy;
      bitmap = ImageManager.loadSystem('IconSet');
      pw = Window_Base._iconWidth;
      ph = Window_Base._iconHeight;
      sx = iconIndex % 16 * pw;
      sy = Math.floor(iconIndex / 16) * ph;
      return this.contents.blt(bitmap, sx, sy, pw, ph, x, y, 24, 24);
    }

    select(index) {
      var rect, ref;
      Window_Selectable.prototype.select.call(this, index);
      rect = this.itemRectForText(index);
      if ((ref = this.countButtons) != null) {
        ref.move(rect.x - 30, rect.y + 24);
      }
      return this._determinateCountButtons();
    }

    _determinateCountButtons() {
      var item, ref, ref1, ref2, ref3, ref4;
      // * Золото работает через отдельное окно ввода цифр
      if (this.index() === 4) {
        if ((ref = this.countButtons) != null) {
          ref.visible = true;
        }
        return this._calculateCountForItem();
      } else {
        item = this.item();
        if (item != null) {
          if ((ref1 = this.countButtons) != null) {
            ref1.visible = true;
          }
          return this._calculateCountForItem(item);
        } else {
          if ((ref2 = this.countButtons) != null) {
            ref2.visible = false;
          }
          if ((ref3 = this.countButtonA) != null) {
            ref3.disable();
          }
          return (ref4 = this.countButtonB) != null ? ref4.disable() : void 0;
        }
      }
    }

    _calculateCountForItem(item) {
      var countInParty, countToTrade, ref, ref1, ref2, ref3, ref4;
      if ((ref = this.countButtonA) != null) {
        ref.enable();
      }
      if ((ref1 = this.countButtonB) != null) {
        ref1.enable();
      }
      if (this.index() === 4) {
        countInParty = $gameParty.gold();
        countToTrade = $gameTemp.netTradeItems.gold;
      } else {
        countInParty = $gameParty.numItems(item);
        countToTrade = $gameTemp.netTradeItems.getCount(this.index());
      }
      if (countInParty === countToTrade) {
        if ((ref2 = this.countButtonB) != null) {
          ref2.disable();
        }
      }
      if (this.index() === 4) {
        if (countToTrade === 0) {
          return (ref3 = this.countButtonA) != null ? ref3.disable() : void 0;
        }
      } else {
        if (countToTrade === 1) {
          return (ref4 = this.countButtonA) != null ? ref4.disable() : void 0;
        }
      }
    }

    onSomethingChange() {
      if (this.onSomethingChangeListener != null) {
        return this.onSomethingChangeListener();
      }
    }

  };
  ANET.register(Window_TradeItemList);
})();

// ■ END Window_TradeItemList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TradeNumberInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_TradeNumberInput;
  Window_TradeNumberInput = class Window_TradeNumberInput extends Window_NumberInput {
    constructor(x, y, sceneTrade) {
      super({});
      this.sceneTrade = sceneTrade;
      this._messageWindow.x = x;
      this._messageWindow.y = y;
      this._messageWindow.height = 200;
    }

    updatePlacement() {
      Window_NumberInput.prototype.updatePlacement.call(this);
      return this.x = this._messageWindow.x;
    }

    start() {
      this._maxDigits = 6;
      this._number = $gameTemp.netTradeItems.gold;
      this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
      this.updatePlacement();
      this.placeButtons();
      this.updateButtonsVisiblity();
      this.createContents();
      this.refresh();
      this.open();
      this.activate();
      return this.select(0);
    }

    processOk() {
      var ref, ref1;
      SoundManager.playOk();
      if ((ref = $gameTemp.netTradeItems) != null) {
        ref.setGold(this._number);
      }
      this.updateInputData();
      this.deactivate();
      this.close();
      return (ref1 = this.sceneTrade) != null ? ref1.onInputComplete() : void 0;
    }

    changeDigit(up) {
      var lastNumber;
      lastNumber = this._number;
      Window_NumberInput.prototype.changeDigit.call(this, up);
      if (this._number > $gameParty.gold()) {
        this._number = lastNumber;
        return this.refresh();
      }
    }

  };
  ANET.register(Window_TradeNumberInput);
})();

// ■ END Window_TradeNumberInput.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var _0xd0a9 = [
    '_onKeyDown',
    'altKey',
    'YQoGs',
    'iiaqn',
    'isConnected',
    'isHost',
    'isHotGame',
    'You\x20can\x20stop\x20server\x20when\x20another\x20window\x20is\x20open!',
    'keyCode',
    'canClientConnect',
    'startServer',
    'connectToServer',
    'aGmri',
    'preventDefault',
    'disconnectFromServer',
    'stopServer',
    'ZlsTz',
    'openMaker',
    'warning',
    'start\x20server\x20before\x20create\x20a\x20new\x20Window',
    'Start\x20server\x20first!',
    'disconnect',
    'prototype',
    'create',
    'call',
    'printVersionInfo',
    'initManager',
    '<font\x20color=\x22blue\x22>Welcome\x20to\x20Alpha.NET\x20Beta</font><br><font\x20size=\x222\x22>F6\x20-\x20Start<br>\x20F7\x20-\x20Connect<br>\x20F9\x20-\x20Disconnect\x20<br>\x20F11\x20-\x20Another\x20Window</font>'
];
(function (_0x519992, _0x1e5c1b) {
    var _0x189f5e = function (_0x283790) {
        while (--_0x283790) {
            _0x519992['push'](_0x519992['shift']());
        }
    };
    _0x189f5e(++_0x1e5c1b);
}(_0xd0a9, 0x12e));
var _0x41af = function (_0x4e717e, _0x5210c1) {
    _0x4e717e = _0x4e717e - 0x0;
    var _0x1cf05f = _0xd0a9[_0x4e717e];
    return _0x1cf05f;
};
var _Scene_Boot_prototype_create = Scene_Boot[_0x41af('0x0')]['create'];
Scene_Boot[_0x41af('0x0')][_0x41af('0x1')] = function () {
    _Scene_Boot_prototype_create[_0x41af('0x2')](this);
    AlphaNET[_0x41af('0x3')]();
    Network['initialize']();
    MakerManager[_0x41af('0x4')]();
    InfoPrinter['p'](_0x41af('0x5'));
    setTimeout(InfoPrinter['clear'], 0xfa0);
};
var _alias_Graphics_onKeyDown = Graphics['_onKeyDown'];
Graphics[_0x41af('0x6')] = function () {
    _alias_Graphics_onKeyDown[_0x41af('0x2')](this, ...arguments);
    if (!event['ctrlKey'] && !event[_0x41af('0x7')]) {
        if (_0x41af('0x8') === _0x41af('0x9')) {
            if (Network[_0x41af('0xa')]() && Network[_0x41af('0xb')]()) {
                if (Network[_0x41af('0xc')]()) {
                    alert(_0x41af('0xd'));
                    return;
                }
                Network['stopServer']();
            }
        } else {
            if (event[_0x41af('0xe')] == 0x75) {
                event['preventDefault']();
                if (!Network['isConnected']() && Network[_0x41af('0xf')]()) {
                    if (!Network[_0x41af('0xc')]())
                        Network[_0x41af('0x10')]();
                    AlphaNET[_0x41af('0x11')]();
                }
            }
            if (event[_0x41af('0xe')] == 0x78) {
                if ('aGmri' !== _0x41af('0x12')) {
                    if (!Network['isHotGame']())
                        MakerManager['openMaker']();
                } else {
                    event[_0x41af('0x13')]();
                    AlphaNET[_0x41af('0x14')]();
                }
            }
            if (event[_0x41af('0xe')] == 0x76) {
                event[_0x41af('0x13')]();
                AlphaNET[_0x41af('0x11')]();
            }
            if (event[_0x41af('0xe')] == 0x7a) {
                event[_0x41af('0x13')]();
                AlphaNET['startAnotherClient']();
            }
            if (event['keyCode'] == 0x73) {
                event[_0x41af('0x13')]();
                if (Network[_0x41af('0xa')]()) {
                    Network[_0x41af('0x15')]();
                }
            }
        }
    }
};
AlphaNET['isUseFonts'] = function () {
    return AlphaNET['isPro']() && Utils['isNwjs']();
};
AlphaNET['startAnotherClient'] = function () {
    if (Network[_0x41af('0xa')]()) {
        if (_0x41af('0x16') !== _0x41af('0x16')) {
            if (Network[_0x41af('0xa')]()) {
                if (!Network[_0x41af('0xc')]())
                    MakerManager[_0x41af('0x17')]();
            } else {
                alert('Start\x20server\x20first!');
                AlphaNET[_0x41af('0x18')](_0x41af('0x19'));
            }
        } else {
            if (!Network['isHotGame']())
                MakerManager[_0x41af('0x17')]();
        }
    } else {
        alert(_0x41af('0x1a'));
        AlphaNET[_0x41af('0x18')](_0x41af('0x19'));
    }
};
AlphaNET[_0x41af('0x11')] = function () {
    if (!Network['isConnected']() && Network[_0x41af('0xf')]())
        Network[_0x41af('0x11')]();
};
AlphaNET[_0x41af('0x10')] = function () {
    if (!Network[_0x41af('0xa')]() && !Network['isHotGame']() && Network['canClientConnect']())
        Network[_0x41af('0x10')]();
};
AlphaNET[_0x41af('0x15')] = function () {
    if (Network['isConnected']() && Network[_0x41af('0xb')]()) {
        if (Network['isHotGame']()) {
            alert(_0x41af('0xd'));
            return;
        }
        Network[_0x41af('0x15')]();
    }
};
AlphaNET[_0x41af('0x14')] = function () {
    if (Network[_0x41af('0xa')]())
        Network[_0x41af('0x1b')]();
};
})();

//Plugin Alpha_NET automatic build by MVPluginBuilder 1.6.1 11.04.2019
