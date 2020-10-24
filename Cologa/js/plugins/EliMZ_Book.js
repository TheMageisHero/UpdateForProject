//==========================================================================
// EliMZ_Book.js
//==========================================================================

/*:
@target MZ

@plugindesc Essential plugin for all Eli plugins.
@author Hakuen Studio | v2.0.0
@url https://www.patreon.com/join/hakuenstudio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

    This plugin optimizes all of my other plugins, making them less code and
easier to maintain and implement improvements. It is not a core plugin, it
does not overwrite any function of the standard codes of the rpg maker mz.

============================================================================
Features
============================================================================

Provide methods and code that add a better performance on all Eli plugins.

============================================================================
How to use
============================================================================

Put above all other Eli plugins.

You can use it in script calls. You can also copy and paste these's 
functions to your own plugins. Just give me the credits ^^

● Eli_Book
• eli.scene() → Returns the current scene.
• eli.ruleOf3(a, b, c) → Realize a simple rule of 3.
• eli.isScene(My_Scene) → Returns true if you are in the specified scene.
• eli.needEval(String) → If the string is not a number, it will eval.
Otherwise, it will return the string.
• eli.nameToRGB(htmlColorName) → Convert an html color name to RGB color.
• eli.hexToRgb(hexColor) → Convert a hex color to RGB color.
• eli.convertEscapeVariablesOnly(text) → It will return a text with the
\v[ID] converted.
• eli.convertEscapeCharacters(text) → Returns a text with all escape
characters converted.
• eli.toLowerCaseArray(array) → Will return a new array with all string
elements to lower case.
• eli.centerX(objWidth, baseWidth) → Returns the centered position of X.
• eli.centerY(objHeight, baseHeight) → Returns the centered position of Y.
• eli.centerPos(objWidth, objHeight, baseWidth, baseHeight) → Returns the
centered position of X and Y.
• eli.divideByTheLargest(num1, num2) → Divides the largest number by
the smallest.

● Game Player
• $gamePlayer.meta() → Return the meta of the actor Id that is the party
leader.

● Game Event
• $gameMap.event(ID).meta() → Return the meta ​of the event id specified.
• $gameMap.event(ID).note() → Return the note of the event id specified.

● Image Manager
• ImageManager.saveOldCache() → It has to be used on the start method of a
scene. It will save the current cache state.
• ImageManager.restoreOldCache() → It has to be used on the terminate method
of a scene. It will set the cache to the saved one.
With this functions you simulate a clear cache, but only clear the cache
generated for the current scene, and restore it to the old one, before
enter on this scene.

● Sprite
• mySprite.scaledBitmapWidth() → Returns the sprite dimension value
considering the scale.
• mySprite.scaledBitmapWidth() → Returns the sprite dimension value
considering the scale.
• mySprite.stretchToScreen(aspectRatio, baseWidth, baseHeight) → Stretch
the sprite bitmap to the screen. You can choose to keep or not the aspect
ratio. The other parameters are set by the Screen size by default.

============================================================================
Terms of Use
============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio
Itch Io - https://hakuenstudio.itch.io/

============================================================================
Update log
============================================================================
Version 2.0.0 - 10/16/2020
- Add ui parameter on setPresetPos.
- Add new method to check the type of a $dataObject.
- Add new classes to cover MV animations in any sprite.
- Add new method to processEscapeCharacters or formula(eval).
- Add new method to convert escape characters on plugin command/arguments.
- Add new method to process plugin paramenters.
- Add new method to register plugin commands.

Version 1.3.0 - 09/26/2020
- Created my own button class

Version 1.2.0 - 09/23/2020
- Changed the convert colors function.

Version 1.1.0 - 09/16/2020
• Add new methods(see more on help file):
• eli.ruleOf3 (don't laugh... xD)
• eli.centerX
• eli.centerY
• eli.centerPos
• eli.divideByTheLargest
• Sprite.prototype.scaledBitmapWidth
• Sprite.prototype.scaledBitmapHeight
• Sprite.prototype.stretchToScreen
• ImageManager.saveOldCache
• ImageManager.restoreOldCache

Version 1.0.0 - 10/09/2020
• Plugin release!

*/

"use strict";

/* ========================================================================== */
/*                                   START!                                   */
/* ========================================================================== */

var Eli = Eli || {};
var Imported = Imported || {};

Imported.Eli_Book = true;
Eli.Book = Eli.Book || {};
Eli.Book.Version = ['2', '0', '0']

/* ------------------------------- MAIN CLASS ------------------------------- */
class Eli_Book {

    constructor(){
        this.initialize();
    };

    initialize(){
        this.initMembers();
    };

    initMembers(){
        this.escapeCodes = [];
        this.regExtractMeta = /<([^<>:]+)(:?)([^>]*)>/g;
        this.regPluginCommand = /^(?:@command) (\w+$)/gmi;
        this.regRemoveEscapeCodes = /(\\.\[[^]])/gi;
        this.reserveImages = [];
    };

    createPluginParameters(){
        const pluginName = this.getPluginName();
        const rawParameters = PluginManager.parameters(pluginName);
        const param = this.convertPluginParameters(rawParameters);

        return param;
    };

    getPluginName(){
        const url = String(document.currentScript._url);
        const start = url.indexOf('Eli');
        const end = url.length - 3;
        const pluginName = url.substring(start, end);

        return pluginName;
    };

    convertPluginParameters(parameters){ // Thanks to LTN games!
        const parseParameters = function(string)  {
            try {
                return JSON.parse(string, (key, value) => {
                    try {
                        return parseParameters(value)
                    } catch (e) {
                        return value
                    }
                })
            } catch (e) {
                return string
                }
        }

        return parseParameters(JSON.stringify(parameters));
    };

    registerPluginCommands(plugin){
        console.log(plugin)
        console.log(document.currentScript)
        const url = document.currentScript._url;
        const text = this.getJsFileInString(url);
        const helpFile = this.formatJsText(text);
        const pluginCommands = this.getPluginCommands(helpFile);
        const pluginName = this.getPluginName();

        this.setupPluginCommands(pluginName, pluginCommands, plugin);
    };

    getJsFileInString(url){
        const XHR = new XMLHttpRequest();
        XHR.open('GET', url, false);
        XHR.send();

        return XHR.responseText;
    };

    formatJsText(text){
        const startIndex = text.indexOf('@command');
        const endIndex = text.lastIndexOf('@command') + 50;
        const pluginCommandText = text.substring(startIndex, endIndex);

        return pluginCommandText;
    };

    getPluginCommands(text){
        const commandNames = [];
        const reg = this.regPluginCommand;
        let match;

        while(match = reg.exec(text)){
            commandNames.push(match[1]);
        }

        return commandNames;
    };

    setupPluginCommands(pluginName, commands, plugin){
        for(const command of commands){
            const callBack = command;
            PluginManager.registerCommand(pluginName, command, plugin[callBack]);
        }
    };

    scene(){
        return SceneManager._scene;
    };

    isScene(scene){
        return this.scene() instanceof scene;
    };

    colorNames(){
        const colors = [
            "ALICEBLUE", "ANTIQUEWHITE", "AQUA", "AQUAMARINE", "AZURE", "BEIGE", "BISQUE", "BLACK", "BLANCHEDALMOND", "BLUE", "BLUEVIOLET", "BROWN", 
            "BURLYWOOD", "CADETBLUE", "CHARTREUSE", "CHOCOLATE", "CORAL", "CORNFLOWERBLUE", "CORNSILK", "CRIMSON", "CYAN", "DARKBLUE", "DARKCYAN", 
            "DARKGOLDENROD", "DARKGRAY", "DARKGREY", "DARKGREEN", "DARKKHAKI", "DARKMAGENTA", "DARKOLIVEGREEN", "DARKORANGE", "DARKORCHID", "DARKRED", 
            "DARKSALMON", "DARKSEAGREEN", "DARKSLATEBLUE", "DARKSLATEGRAY", "DARKSLATEGREY", "DARKTURQUOISE", "DARKVIOLET", "DEEPPINK", "DEEPSKYBLUE", 
            "DIMGRAY", "DIMGREY", "DODGERBLUE", "FIREBRICK", "FLORALWHITE", "FORESTGREEN", "FUCHSIA", "GAINSBORO", "GHOSTWHITE", "GOLD", "GOLDENROD", 
            "GRAY", "GREY", "GREEN", "GREENYELLOW", "HONEYDEW", "HOTPINK", "INDIANRED", "INDIGO", "IVORY", "KHAKI", "LAVENDER", "LAVENDERBLUSH", 
            "LAWNGREEN", "LEMONCHIFFON", "LIGHTBLUE", "LIGHTCORAL", "LIGHTCYAN", "LIGHTGOLDENRODYELLOW", "LIGHTGRAY", "LIGHTGREY", "LIGHTGREEN", 
            "LIGHTPINK", "LIGHTSALMON", "LIGHTSEAGREEN", "LIGHTSKYBLUE", "LIGHTSLATEGRAY", "LIGHTSLATEGREY", "LIGHTSTEELBLUE", "LIGHTYELLOW", 
            "LIME", "LIMEGREEN", "LINEN", "MAGENTA", "MAROON", "MEDIUMAQUAMARINE", "MEDIUMBLUE", "MEDIUMORCHID", "MEDIUMPURPLE", "MEDIUMSEAGREEN", 
            "MEDIUMSLATEBLUE", "MEDIUMSPRINGGREEN", "MEDIUMTURQUOISE", "MEDIUMVIOLETRED", "MIDNIGHTBLUE", "MINTCREAM", "MISTYROSE", "MOCCASIN", 
            "NAVAJOWHITE", "NAVY", "OLDLACE", "OLIVE", "OLIVEDRAB", "ORANGE", "ORANGERED", "ORCHID", "PALEGOLDENROD", "PALEGREEN", "PALETURQUOISE", 
            "PALEVIOLETRED", "PAPAYAWHIP", "PEACHPUFF", "PERU", "PINK", "PLUM", "POWDERBLUE", "PURPLE", "REBECCAPURPLE", "RED", "ROSYBROWN", "ROYALBLUE", 
            "SADDLEBROWN", "SALMON", "SANDYBROWN", "SEAGREEN", "SEASHELL", "SIENNA", "SILVER", "SKYBLUE", "SLATEBLUE", "SLATEGRAY", "SLATEGREY", "SNOW", 
            "SPRINGGREEN", "STEELBLUE", "TAN", "TEAL", "THISTLE", "TOMATO", "TURQUOISE", "VIOLET", "WHEAT", "WHITE", "WHITESMOKE", "YELLOW", "YELLOWGREEN",
        ];
          return colors;
    };

    // Vai converter todas as variáveis, depois organiza os argumentos.
    convertEscapeVarArgs(args){ 
        const text = Object.values(args).join("#");
        const escapedText = this.convertEscapeVariablesOnly(text);
        const values = escapedText.split("#");
        const keys = Object.keys(args);

        for(let i = 0, l = values.length; i < l; i++){
            args[keys[i]] = values[i];
        }
        const convertedParameters = this.convertPluginParameters(args);

        return convertedParameters;
    };

    needEval(param) {
        return isNaN(param) ? eval(param) : param;
    };

    formatDollarSign(str){
        return str.replace('%24', '$');
    };

    convertEscapeCharacters(text){
        const tempWin = new Window_Base(new Rectangle(0,0,0,0));
        text = tempWin.convertEscapeCharacters(text);

        return text;
    };

    convertEscapeVariablesOnly(text){
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(+arguments[1]);
        }.bind(this));

        return text;
    };

    processEscapeVarOrFormula(arg){
        if(typeof arg !== 'string') return arg;
        
        const rawArg = arguments[0];
        arg = this.convertEscapeVariablesOnly(rawArg);
        if(rawArg === arg){
            return this.needEval(arg);
        }else{
            return arg;
        }
    };

    toLowerCaseArray(arr){
        return arr.map(element => element === 'string' ? element.toLowerCase() : element)
    };

    makeDeepCopy(object){
        return JSON.parse(JSON.stringify(object));
    };

    // Thanks! - https://css-tricks.com/converting-color-spaces-in-javascript/
    nameToRGB(name) {
        // Create fake div
        const fakeDiv = document.createElement("div");
        fakeDiv.style.color = name;
        document.body.appendChild(fakeDiv);

        // Get color of div
        const cs = window.getComputedStyle(fakeDiv);
        const pv = cs.getPropertyValue("color");
        
        // Remove div after obtaining desired color value
        document.body.removeChild(fakeDiv);

        return pv;
    };

    hexToRgb(hex) {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `rgb(${r}, ${g}, ${b})`;
    };

    convertColors(color, needArray){
        const firstLetter = color.charAt(0);
        
        if(firstLetter === '#'){
            color = this.hexToRgb(color);
        } else if(isNaN(firstLetter)){
            color = this.nameToRGB(color);
        }

        if(needArray){
            color = color.replace('rgb(', '').replace(')', '');
            color = color.split(',').map(item => +item);
        }

        return color;
    };

    getTextWidth(text, fontSize = $gameSystem.mainFontSize(), standardPadding = $gameSystem.windowPadding(), 
            textPadding = Window_Base.prototype.itemPadding()){
        const sprite = new Sprite();
        sprite.bitmap = new Bitmap(1,1);
        sprite.bitmap.fontSize = fontSize;
        const pad1 = standardPadding*2;
        const pad2 = textPadding*2;
        let width = ~~((sprite.bitmap.measureTextWidth(text) + pad1 + pad2));
        if(width & 1) width += 1;
        
        return width;
    };

    presetPos(width, height, custom1, custom2, preset, ui){
        const baseWidth = ui ? Graphics.boxWidth : Graphics.width;
        const baseHeight = ui ? Graphics.boxHeight : Graphics.height;
        const centerX = (baseWidth - (baseWidth / 2)) - (width / 2);
        const endX = baseWidth - width;
        const centerY = (baseHeight - (baseHeight / 2)) - (height / 2);
        const endY = baseHeight - height;
        const defPos = [
            {x:custom1, y:custom2},     // 0
            {x:0,       y:0},           // 1 Top left
            {x:centerX, y:0},           // 2 Top center
            {x:endX,    y:0},           // 3 Top Right
            {x:0,       y:centerY},     // 4 Center left
            {x:centerX, y:centerY},     // 5 Center center
            {x:endX,    y:centerY},     // 6 Center right
            {x:0,       y:endY},        // 7 Bottom left
            {x:centerX, y:endY},        // 8 Bottom center
            {x:endX,    y:endY}         // 9 Bottom right
        ]
        const pX = defPos[preset].x;
        const pY = defPos[preset].y;

        return {x:pX, y:pY};
    };

    toBoolean(string){
        const value = string.toLowerCase();
        const options = ['enable', 'enabled', 'true', 'on', 'default', 'auto', 'ui area']

        return options.includes(value);
    };

    ruleOf3(a, b, c){
        return (c*b)/a;
    };

    divideByTheLargest(num1, num2){
        const max = Math.max(num1, num2);
        const min = Math.min(num1, num2);

        return max / min;
    };

    centerXPos(objWidth, baseWidth = Graphics.width){
        return Math.abs(objWidth - baseWidth) / 2;
    };

    centerYPos(objHeight, baseHeight = Graphics.height){
        return Math.abs(objHeight - baseHeight) / 2;
    };

    centerPos(objWidth, objHeight, baseWidth, baseHeight){
        const pos = {
            x:  this.centerXPos(objWidth, baseWidth),
            y:  this.centerYPos(objHeight, baseHeight),
        }

        return pos;
    };

    getId(searchName, dataName){
        return searchName;
    };

/* ----------------------------- CONDITION CHECK ---------------------------- */
//testing...
    evaluateCondition(param){
        const type = param.conditionType;
        const value = param.conditionValue;
        
        return this[`${type}Condition`](value);
    };

    switchCondition(conditionValue){
        return $gameSwitches.value(+conditionValue);
    };

    variableCondition(conditionValue){
        const arr = conditionValue.split(' ');
        const [id, inputedOperator, value] = arr;
        const operatorTypes = ['===', '>', '<', '>=', '<='];
        const operator = operatorTypes.indexOf(inputedOperator);
        let result = 0;
        
        switch(operatorTypes[operator]){
            case '===':
                result = $gameVariables.value(+id) === +value;
                break;
            case '>':
                result = $gameVariables.value(+id) > +value;
                break;
            case '<':
                result = $gameVariables.value(+id) < +value;
                break;
            case '>=':
                result = $gameVariables.value(+id) >= +value;
                break;
            case '<=':
                result = $gameVariables.value(+id) <= +value;
                break;
        }

        return result;
    };

    booleanCondition(conditionValue){
        return typeof conditionValue === 'string' ? this.toBoolean(conditionValue) : conditionValue;
    };

    scriptCondition(conditionValue){
        return eval(conditionValue);
    };

/* ----------------------------------- OLD ---------------------------------- */

    extractTextBetween(text, startChar, endChar){ 
        const startCharLength = startChar.length
        const startIndex = text.indexOf(startChar) + startCharLength;
        const endIndex = text.indexOf(endChar);
        const extractedText = text.substring(startIndex, endIndex);
        return extractedText;
    };

    setPosXy(array){
        const argLower = this.toLowerCaseArray(array);
        const index = [ argLower.indexOf('x:'), argLower.indexOf('y:') ];
        const posX  = index[0] !== -1 ? array[index[0]+1] : false;
        const posY  = index[1] !== -1 ? array[index[1]+1] : false;
        return {x:posX, y:posY};
    };

    manipulateWindows(args){
        const argLower = this.toLowerCaseArray(args);
        const index = [
            argLower.indexOf('x:'), argLower.indexOf('y:'), 
            argLower.indexOf('w:'), argLower.indexOf('h:'), argLower.indexOf('opacity:')
        ];
        const posX      = index[0] !== -1 ? args[index[0]+1] : false;
        const posY      = index[1] !== -1 ? args[index[1]+1] : false;
        const width     = index[2] !== -1 ? args[index[2]+1] : false;
        const height    = index[3] !== -1 ? args[index[3]+1] : false;
        const opacity   = index[4] !== -1 ? args[index[4]+1] : false;

        return {x:posX, y:posY, width: width, height: height, opacity: opacity};
    };

    manipulatePictures(args){
        const argLower = this.toLowerCaseArray(args);
        const index = [
            argLower.indexOf('id:'), argLower.indexOf('name:'), argLower.indexOf('origin:'), 
            argLower.indexOf('x:'), argLower.indexOf('y:'), 
            argLower.indexOf('scaleX:'), argLower.indexOf('scaleY:'), 
            argLower.indexOf('opacity:'), argLower.indexOf('blendmode:'),
            argLower.indexOf('easingType:')
        ];
        const id        = index[0] !== -1 ? args[index[0]+1] : false;
        const name      = index[1] !== -1 ? args[index[1]+1] : false;
        const origin    = index[2] !== -1 ? args[index[2]+1] : false;
        const posX      = index[3] !== -1 ? args[index[3]+1] : false;
        const posY      = index[4] !== -1 ? args[index[4]+1] : false;
        const scaleX    = index[5] !== -1 ? args[index[5]+1] : false;
        const scaleY    = index[6] !== -1 ? args[index[6]+1] : false;
        const opacity   = index[7] !== -1 ? args[index[7]+1] : false;
        const blend     = index[8] !== -1 ? args[index[8]+1] : false;
        const easy      = index[9] !== -1 ? args[index[9]+1] : false;

        const result    = {
            id: id, name: name, origin: origin, x: posX, y: posY, 
            scaleX: scaleX, scaleY: scaleY, opacity: opacity, 
            blendMode: blend, easingType: easy
        };

        return result;
    };

    addToDecrypterIgnoreList(folder, file){
        const image = `img/${folder}/${file}.png`;
        if(!Decrypter._ignoreList.includes(image)) Decrypter._ignoreList.push(image);
    };

};

const eli = new Eli_Book();

/* ---------------------------- SAVE PLUGIN DATA ---------------------------- */

function Eli_SavedContents() {
    this.initialize.apply(this, arguments);
};

Eli_SavedContents.prototype.initialize = function(){
    this.contents = {};
};

Eli_SavedContents.prototype.createNewContent = function(pluginName){
    this.contents[pluginName] = {};
};

Eli_SavedContents.prototype.createContentWithPluginParameters = function(pluginName, pluginParameters){
    this.contents[pluginName] = eli.makeDeepCopy(pluginParameters);
};

Eli_SavedContents.prototype.addNewDataToContent = function(pluginName, newData, value){
    this.contents[pluginName][newData] = value;
};

var $eliData = null;

/* ========================================================================== */
/*                                 MAKER CORE                                 */
/* ========================================================================== */

{

/* --------------------------------- SPRITE --------------------------------- */

Sprite.prototype.setScale = function(x, y){
    this.scale.set(x, y);
};

Sprite.prototype.scaledBitmapWidth = function(){
    return eli.ruleOf3(1, this.bitmap.width, this.scale.x);
};

Sprite.prototype.scaledBitmapHeight = function(){
    return eli.ruleOf3(1, this.bitmap.height, this.scale.y);
};

Sprite.prototype.centerX = function(baseWidth){
    const x = eli.centerXPos(this.scaledBitmapWidth(), baseWidth);
    this.x = x;
};

Sprite.prototype.centerY = function(baseHeight){
    const y = eli.centerYPos(this.scaledBitmapHeight(), baseHeight);
    this.y = y;
};

Sprite.prototype.centerPos = function(baseWidth, baseHeight){
    const x = eli.centerXPos(this.scaledBitmapWidth(), baseWidth);
    const y = eli.centerYPos(this.scaledBitmapHeight(), baseHeight);
    this.move(x, y);
};

Sprite.prototype.stretchToScreen = function(ratio, baseWidth = Graphics.width, baseHeight = Graphics.height){
        const bitmapWidth = this.bitmap.width
        const bitmapHeight = this.bitmap.height
        const upScale = baseWidth > bitmapWidth || baseHeight > bitmapHeight;

        if(!ratio){
            const widthRatio = eli.divideByTheLargest(bitmapWidth, baseWidth);
            const heightRatio = eli.divideByTheLargest(bitmapHeight, baseHeight);
            const scaleX = Math.abs(1-widthRatio);
            const scaleY = Math.abs(1-heightRatio);

            if(upScale){
                this.setScale(1 + scaleX, 1 + scaleY);
            }else{
                this.setScale(1 - scaleX, 1 - scaleY);
            }
        }else{
            const widthRatio = baseWidth / bitmapWidth;
            const heightRatio = baseHeight / bitmapHeight;
            const finalScale = Math.min(widthRatio, heightRatio);
            this.setScale(finalScale, finalScale);
        }

        this.centerPos(baseWidth, baseHeight);
};

}

/* ========================================================================== */
/*                                MAKER MANAGER                               */
/* ========================================================================== */

/* ------------------------------ DATA MANAGER ------------------------------ */
{

Eli.Book.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    Eli.Book.DataManager_createGameObjects.call(this);
    $eliData = new Eli_SavedContents();
};

Eli.Book.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const alias = Eli.Book.DataManager_makeSaveContents.call(this);
    alias.eli = $eliData;

    return alias;
};

Eli.Book.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    Eli.Book.DataManager_extractSaveContents.call(this, contents);
    $eliData = contents.eli;
};

DataManager.isDataActor = function(data) {
    return !!data.nickname;
};

DataManager.isDataArmor = function(data) {
    return !!data.atypeId;
};

DataManager.isDataClass = function(data) {
    return !!data.learnings;
};

DataManager.isDataEnemy = function(data) {
    return !!data.dropItems;
};

DataManager.isDataEnemy = function(data) {
    return !!data.dropItems;
};

DataManager.isDataItem = function(data) {
    return !!data.itypeId;
};

DataManager.isDataMapInfo = function(data) {
    return !!data.expanded;
};

DataManager.isDataSkills = function(data) {
    return !!data.stypeId;
};

DataManager.isDataStates = function(data) {
    return !!data.stepsToRemove;
};

DataManager.isDataSystem = function(data) {
    return !!data.locale;
};

DataManager.isDataTroops = function(data) {
    return !!data.members;
};

DataManager.isDataWeapon = function(data) {
    return !!data.wtypeId;
};

}

/* ------------------------------ IMAGE MANAGER ----------------------------- */
{
ImageManager._previousFolders = [];
ImageManager._previousFiles = [];

ImageManager.saveOldCache = function(){
    const urls = Object.keys(this._cache);
    this._previousFolders = [];
    this._previousFiles = [];

    for(let i = 0, l = urls.length; i < l; i++) {
        const url = urls[i];
        const folderIndex = url.lastIndexOf('/') + 1;
        const folderName = url.substring(0, folderIndex);
        const fileIndex = url.indexOf('.png');
        const fileName = url.substring(folderIndex, fileIndex);
        this._previousFolders.push(folderName);
        this._previousFiles.push(eli.formatDollarSign(fileName));
    }
};

ImageManager.restoreOldCache = function(){
    this.clear();
    for(let i = 0, l = this._previousFolders.length; i < l; i++){
        const folder = this._previousFolders[i];
        const file = this._previousFiles[i];
        this.loadBitmap(folder, file);
    }
};

}

/* ========================================================================== */
/*                                MAKER OBJECTS                               */
/* ========================================================================== */

/* --------------------------- GAME CHARACTER BASE -------------------------- */
{

Game_CharacterBase.prototype.isEvent = function(){
    return this instanceof Game_Event;
};

Game_CharacterBase.prototype.isPlayer = function(){
    return this instanceof Game_Player;
};

Game_CharacterBase.prototype.isFollower = function(){
    return this instanceof Game_Follower;
};

}

/* ------------------------------- GAME EVENT ------------------------------- */
{

Eli.Book.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    Eli.Book.Game_Event_initialize.call(this, mapId, eventId);
    this._note = $dataMap.events[eventId].note || '';
    this._meta = {};
    this.makeMetaData();
};

Game_Event.prototype.name = function(){ 
    return $dataMap.events[this._eventId].name;
};

Game_Event.prototype.meta = function(){ 
    return this._meta;
};

Game_Event.prototype.note = function(){ 
    return this._note;
};

Game_Event.prototype.makeMetaData = function(){
    const re = eli.regExtractMeta;
    let match;

    while(match = re.exec(this._note)) {
        if (match[2] === ':') {
            this._meta[match[1]] = match[3];
        } else {
            this._meta[match[1]] = true;
        }
    }
};

}

/* ------------------------------- GAME PLAYER ------------------------------ */

Game_Player.prototype.meta = function(){
    return $dataActors[$gameParty.leader()._actorId].meta;
};

/* ========================================================================== */
/*                                MAKER SCENES                                */
/* ========================================================================== */

{
/* ------------------------------- SCENE BASE ------------------------------- */

Scene_Base.prototype.addWindowTo = function(window, boxContainer) {
    if(boxContainer){
        this.addWindow(window)
    }else{
        this.addChild(window);
    }
};

Eli.Book.Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    this.beforeUpdate();
    Eli.Book.Scene_Base_update.call(this);
    this.afterUpdate();
};

Scene_Base.prototype.beforeUpdate = function(){};
Scene_Base.prototype.afterUpdate = function(){};

/* -------------------------------- SCENE MAP ------------------------------- */

Eli.Book.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    if(this._transfer){
        this.beforeStart();
    }
    Eli.Book.Scene_Map_start.call(this);
    this.afterStart();
};

Eli.Book.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    this.beforeUpdate();
    Eli.Book.Scene_Map_update.call(this);
    this.afterUpdate();
};

Eli.Book.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
    this.beforeTerminate();
    Eli.Book.Scene_Map_terminate.call(this);
    this.afterTerminate();
};

Scene_Map.prototype.beforeStart = function(){};
Scene_Map.prototype.afterStart = function(){};
Scene_Map.prototype.beforeUpdate = function(){};
Scene_Map.prototype.afterUpdate = function(){};
Scene_Map.prototype.beforeTerminate = function(){};
Scene_Map.prototype.afterTerminate = function(){};

/* ------------------------------ SCENE BATTLE ------------------------------ */

Eli.Book.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    this.beforeUpdate();
    Eli.Book.Scene_Battle_update.call(this);
    this.afterUpdate();
};

Scene_Battle.prototype.beforeUpdate = function(){};
Scene_Battle.prototype.afterUpdate = function(){};

}

/* ========================================================================== */
/*                                MAKER SPRITES                               */
/* ========================================================================== */

/* ========================================================================== */
/*                                MAKER WINDOWS                               */
/* ========================================================================== */

{

/* ------------------------------- WINDOW BASE ------------------------------ */

// Window_Base.prototype.convertEscapeVariablesOnly = function(text){
//     text = text.replace(/\\/g, '\x1b');
//     text = text.replace(/\x1b\x1b/g, '\\');
//     text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
//         return $gameVariables.value(+arguments[1]);
//     }.bind(this));
//     return text;
// };

// convertEscapeVariablesOnly(text){
//     // const tempWin = new Window_Base(new Rectangle(0,0,0,0));
//     // text = tempWin.convertEscapeVariablesOnly(text);
//     // return text;
// };

}

/* ========================================================================== */
/*                                 NEW CLASSES                                */
/* ========================================================================== */

/* ------------------------------- ELI BUTTON ------------------------------- */

class Sprite_EliButton extends Sprite_Clickable{

    constructor(buttonType, image){
        super(buttonType, image);
    };

    initialize(buttonType, image){
        Sprite.prototype.initialize.call(this);
        this._image = image
        this._buttonType = buttonType;
        this._clickHandler = null;
        this._coldFrame = null;
        this._hotFrame = null;
        this.loadButtonImage();
    };

    loadButtonImage() {
        this.bitmap = ImageManager.loadSystem(this._image);
        this.bitmap.addLoadListener(this.setupFrames.bind(this))
    };

    setupFrames() {
        const x = 0;
        const width = this.bitmap.width;
        const height = this.bitmap.height/2;
        this.setColdFrame(x, 0, width, height);
        this.setHotFrame(x, height, width, height);
        this.updateFrame();
        this.updateOpacity();
    };

    setColdFrame(x, y, width, height) {
        this._coldFrame = new Rectangle(x, y, width, height);
    };
    
    setHotFrame(x, y, width, height) {
        this._hotFrame = new Rectangle(x, y, width, height);
    };

    updateFrame() {
        const frame = this.isPressed() ? this._hotFrame : this._coldFrame;

        if (frame) {
            this.setFrame(frame.x, frame.y, frame.width, frame.height);
        }
    };

    updateOpacity() {
        this.opacity = this._pressed ? 255 : 192;
    };

    update() {
        Sprite.prototype.update.call(this);
        this.updateFrame();
        this.updateOpacity();
        this.processTouch();
    };

    setClickHandler(method) {
        this._clickHandler = method;
    };
    
    onClick() {
        if (this._clickHandler) {
            this._clickHandler();
        } else {
            Input.virtualClick(this._buttonType);
        }
    };

};

/* ----------------------------- SPRITE BASE MV ----------------------------- */

function SpriteMV() {
    this.initialize.apply(this, arguments);
}

SpriteMV.prototype = Object.create(Sprite.prototype);
SpriteMV.prototype.constructor = SpriteMV;

{

    SpriteMV.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this._animationSprites = [];
        this._effectTarget = this;
    };

    SpriteMV.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateVisibility();
        this.updateAnimationSprites();
    };

    SpriteMV.prototype.updateAnimationSprites = function() {
        if (this._animationSprites.length > 0) {
            const sprites = this._animationSprites.clone();
            this._animationSprites = [];

            for (let i = 0, l = sprites.length; i < l; i++) {
                const sprite = sprites[i];

                if (sprite.isPlaying()) {
                    this._animationSprites.push(sprite);
                } else {
                    sprite.remove();
                }
            }
        }
    };

    SpriteMV.prototype.startAnimation = function(animation, mirror, delay) {
        const sprite = new SpriteMV_Animation();
        sprite.setup(this._effectTarget, animation, mirror, delay);
        this.parent.addChild(sprite);
        this._animationSprites.push(sprite);
    };

    SpriteMV.prototype.isAnimationPlaying = function() {
        return this._animationSprites.length > 0;
    };

}

/* ------------------------ SPRITE ANIMATION FROM MV ------------------------ */

function SpriteMV_Animation() {
    this.initialize.apply(this, arguments);
}

SpriteMV_Animation.prototype = Object.create(Sprite.prototype);
SpriteMV_Animation.prototype.constructor = SpriteMV_Animation;

SpriteMV_Animation._checker1 = {};
SpriteMV_Animation._checker2 = {};

{
    SpriteMV_Animation.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this._reduceArtifacts = true;
        this.initMembers();
    };
    
    SpriteMV_Animation.prototype.initMembers = function() {
        this._target = null;
        this._animation = null;
        this._mirror = false;
        this._delay = 0;
        this._rate = 4;
        this._duration = 0;
        this._flashColor = [0, 0, 0, 0];
        this._flashDuration = 0;
        this._screenFlashDuration = 0;
        this._hidingDuration = 0;
        this._bitmap1 = null;
        this._bitmap2 = null;
        this._cellSprites = [];
        this._screenFlashSprite = null;
        this._duplicated = false;
        this.z = 8;
    };
    
    SpriteMV_Animation.prototype.setup = function(target, animation, mirror, delay) {
        this._target = target;
        this._animation = animation;
        this._mirror = mirror;
        this._delay = delay;

        if (this._animation) {
            this.remove();
            this.setupRate();
            this.setupDuration();
            this.loadBitmaps();
            this.createSprites();
        }
    };
    
    SpriteMV_Animation.prototype.remove = function() {
        if (this.parent && this.parent.removeChild(this)) {
            this._target.setBlendColor([0, 0, 0, 0]);
            this._target.show();
        }
    };
    
    SpriteMV_Animation.prototype.setupRate = function() {
        this._rate = 4;
    };
    
    SpriteMV_Animation.prototype.setupDuration = function() {
        this._duration = this._animation.frames.length * this._rate + 1;
    };
    
    SpriteMV_Animation.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateMain();
        this.updateFlash();
        this.updateScreenFlash();
        this.updateHiding();
        SpriteMV_Animation._checker1 = {};
        SpriteMV_Animation._checker2 = {};
    };
    
    SpriteMV_Animation.prototype.updateFlash = function() {
        if (this._flashDuration > 0) {
            let d = this._flashDuration--;
            this._flashColor[3] *= (d - 1) / d;
            this._target.setBlendColor(this._flashColor);
        }
    };
    
    SpriteMV_Animation.prototype.updateScreenFlash = function() {
        if (this._screenFlashDuration > 0) {
            let d = this._screenFlashDuration--;

            if (this._screenFlashSprite) {
                this._screenFlashSprite.x = -this.absoluteX();
                this._screenFlashSprite.y = -this.absoluteY();
                this._screenFlashSprite.opacity *= (d - 1) / d;
                this._screenFlashSprite.visible = (this._screenFlashDuration > 0);
            }
        }
    };
    
    SpriteMV_Animation.prototype.absoluteX = function() {
        let x = 0;
        let object = this;

        while (object) {
            x += object.x;
            object = object.parent;
        }

        return x;
    };
    
    SpriteMV_Animation.prototype.absoluteY = function() {
        let y = 0;
        let object = this;

        while (object) {
            y += object.y;
            object = object.parent;
        }

        return y;
    };
    
    SpriteMV_Animation.prototype.updateHiding = function() {
        if (this._hidingDuration > 0) {
            this._hidingDuration--;

            if (this._hidingDuration === 0) {
                this._target.show();
            }
        }
    };
    
    SpriteMV_Animation.prototype.isPlaying = function() {
        return this._duration > 0;
    };
    
    SpriteMV_Animation.prototype.loadBitmaps = function() {
        let name1 = this._animation.animation1Name;
        let name2 = this._animation.animation2Name;
        let hue1 = this._animation.animation1Hue;
        let hue2 = this._animation.animation2Hue;

        this._bitmap1 = ImageManager.loadAnimation(name1, hue1);
        this._bitmap2 = ImageManager.loadAnimation(name2, hue2);
    };
    
    SpriteMV_Animation.prototype.isReady = function() {
        return this._bitmap1 && this._bitmap1.isReady() && this._bitmap2 && this._bitmap2.isReady();
    };
    
    SpriteMV_Animation.prototype.createSprites = function() {
        if (!SpriteMV_Animation._checker2[this._animation]) {
            this.createCellSprites();

            if (this._animation.position === 3) {
                SpriteMV_Animation._checker2[this._animation] = true;
            }

            this.createScreenFlashSprite();
        }

        if (SpriteMV_Animation._checker1[this._animation]) {
            this._duplicated = true;
        } else {
            this._duplicated = false;

            if (this._animation.position === 3) {
                SpriteMV_Animation._checker1[this._animation] = true;
            }
        }
    };
    
    SpriteMV_Animation.prototype.createCellSprites = function() {
        this._cellSprites = [];

        for (let i = 0; i < 16; i++) {
            const sprite = new Sprite();
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            this._cellSprites.push(sprite);
            this.addChild(sprite);
        }
    };
    
    SpriteMV_Animation.prototype.createScreenFlashSprite = function() {
        this._screenFlashSprite = new ScreenSprite();
        this.addChild(this._screenFlashSprite);
    };
    
    SpriteMV_Animation.prototype.updateMain = function() {
        if (this.isPlaying() && this.isReady()) {

            if (this._delay > 0) {
                this._delay--;
            } else {
                this._duration--;
                this.updatePosition();

                if (this._duration % this._rate === 0) {
                    this.updateFrame();
                }
            }
        }
    };
    
    SpriteMV_Animation.prototype.updatePosition = function() {
        if (this._animation.position === 3) {
            this.x = this.parent.width / 2;
            this.y = this.parent.height / 2;
        } else {
            const parent = this._target.parent;
            const grandparent = parent ? parent.parent : null;
            this.x = this._target.x;
            this.y = this._target.y;

            if (this.parent === grandparent) {
                this.x += parent.x;
                this.y += parent.y;
            }

            if (this._animation.position === 0) {
                this.y -= this._target.height;
            } else if (this._animation.position === 1) {
                this.y -= this._target.height / 2;
            }
        }
    };
    
    SpriteMV_Animation.prototype.updateFrame = function() {
        if (this._duration > 0) {
            const frameIndex = this.currentFrameIndex();

            this.updateAllCellSprites(this._animation.frames[frameIndex]);

            this._animation.timings.forEach(function(timing) {
                if (timing.frame === frameIndex) {
                    this.processTimingData(timing);
                }
            }, this);
        }
    };
    
    SpriteMV_Animation.prototype.currentFrameIndex = function() {
        return (this._animation.frames.length -
                Math.floor((this._duration + this._rate - 1) / this._rate));
    };
    
    SpriteMV_Animation.prototype.updateAllCellSprites = function(frame) {
        for (let i = 0, l = this._cellSprites.length; i < l; i++) {
            const sprite = this._cellSprites[i];

            if (i < frame.length) {
                this.updateCellSprite(sprite, frame[i]);
            } else {
                sprite.visible = false;
            }
        }
    };
    
    SpriteMV_Animation.prototype.updateCellSprite = function(sprite, cell) {
        const pattern = cell[0];

        if (pattern >= 0) {
            const sx = pattern % 5 * 192;
            const sy = Math.floor(pattern % 100 / 5) * 192;
            const mirror = this._mirror;
            sprite.bitmap = pattern < 100 ? this._bitmap1 : this._bitmap2;
            sprite.setFrame(sx, sy, 192, 192);
            sprite.x = cell[1];
            sprite.y = cell[2];
            sprite.rotation = cell[4] * Math.PI / 180;
            sprite.scale.x = cell[3] / 100;
    
            if(cell[5]){
                sprite.scale.x *= -1;
            }

            if(mirror){
                sprite.x *= -1;
                sprite.rotation *= -1;
                sprite.scale.x *= -1;
            }
    
            sprite.scale.y = cell[3] / 100;
            sprite.opacity = cell[6];
            sprite.blendMode = cell[7];
            sprite.visible = true;
        } else {
            sprite.visible = false;
        }
    };
    
    SpriteMV_Animation.prototype.processTimingData = function(timing) {
        const duration = timing.flashDuration * this._rate;

        switch (timing.flashScope) {
        case 1:
            this.startFlash(timing.flashColor, duration);
            break;
        case 2:
            this.startScreenFlash(timing.flashColor, duration);
            break;
        case 3:
            this.startHiding(duration);
            break;
        }

        if (!this._duplicated && timing.se) {
            AudioManager.playSe(timing.se);
        }
    };
    
    SpriteMV_Animation.prototype.startFlash = function(color, duration) {
        this._flashColor = color.clone();
        this._flashDuration = duration;
    };
    
    SpriteMV_Animation.prototype.startScreenFlash = function(color, duration) {
        this._screenFlashDuration = duration;

        if (this._screenFlashSprite) {
            this._screenFlashSprite.setColor(color[0], color[1], color[2]);
            this._screenFlashSprite.opacity = color[3];
        }
    };
    
    SpriteMV_Animation.prototype.startHiding = function(duration) {
        this._hidingDuration = duration;
        this._target.hide();
    };
}

/* ========================================================================== */
/*                            STANDALONE FUNCTIONS                            */
/* ========================================================================== */

function getId(searchName, dataName){
    return searchName;
};

function getUniqueId(searchMeta){
    return searchMeta;
};


/*
© ® » «  ∆ ™ ≠ ≤ ≥ ▫ ♫
• ■ ▪ ● ▬ ♦
► ▲ ▼ ◄
→ ← ↑ ↔ ↨
*/

/* Put button on scene map

Eli.Alias.SceneMap_createButtons = SceneMap.createButtons;
SceneMap.createButtons = function() {
    Eli.Alias.SceneMap_createButtons.call(this);
    this.createCustomButton();
};

SceneMap.createCustomButton = function() {
    if (!ConfigManager.touchUI || customButtonIsEnabled) return;
    this._customButton = new Sprite_EliButton("buttonName", "buttonImage");
    this._customButton.x = 0
    this._customButton.y = 0
    this._customButton.visible = false;
    this._customButton.setClickHandler(this.callCustomScene.bind(this));
    this.addWindow(this._customButton);
};

SceneMap.callCustomScene = function() {
    $gameTemp.clearDestination();
    SoundManager.playButtonSound();
    SceneManager.push(Scene_Custom);
    this._waitCount = 2;
};

Eli.alias.SceneMap_afterUpdate = SceneMap.afterUpdate;
SceneMap.afterUpdate = function() {
    Eli.Alias.SceneMap_afterUpdate.call(this);
    this.updateCustomScreenButton();
    this.updateCustomKeyButton();
};

SceneMap.updateCustomScreenButton = function() {
    if (this._customButton) {
        this._customButton.visible = ConfigManager.touchUI;
    }
};

SceneMap.updateCustomKeyButton = function(){
    if(Input.isTriggered("pause")){
        this.callScenePause();
    }
};

Eli.Alias.SceneMap_isAnyButtonPressed = SceneMap.isAnyButtonPressed;
SceneMap.isAnyButtonPressed = function() {
    const alias = Eli.Alias.SceneMap_isAnyButtonPressed.call(this);
    return alias || this.isCustomButtonPressed();
};

SceneMap.isCustomButtonPressed = function(){
    return this._customButton && this._customButton.isPressed();
};

SceneMap.callSceneCustom = function(){
    
    SoundManager.playButtonSound();
    SceneManager.push(Scene_Custom);
};

Eli.Alias.SceneMap_beforeTerminate = SceneMap.beforeTerminate;
SceneMap.beforeTerminate = function() {
    Eli.Alias.SceneMap_beforeTerminate.call(this);
    this.hideCustomGameButton();
    this.extras();
};

SceneMap.hideCustomGameButton = function() {
    if (this._customButton) {
        this._customButton.visible = false;
        this._customButton = false;
    }
};

SceneMap.extras = function(){

};
this._paramsCurve[i] = parameterCurve.slice(i*3, (3*(i+1)));
Eli.CustomParameterCurve.regExp = /([\w]+)(:?)([^#]*)/g;

*/