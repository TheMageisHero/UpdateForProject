////////////////////////////////////////////////////////
/////=========================================////////////
//      Candon's Variable System HUD 1.4    ////////
//          for RPG Maker MV.                   ////////////
/////=========================================////////////
///////////////////////////////////////////////////////

/*:

@plugindesc (v 1.4) Just a simple variable HUD, 
allowing Common Events to run at values, and show/handle chosen variable values.
* @author Candon (Clayton DuBoce)

****************************************************************************************

@help

- Release Notes:
 4/13/18 - (v1.0): Completed Plugin.

 4/13/18 - (v1.1): Simplified Plugin Commands, Bug Fixes.

 4/17/18 - (v1.2): Added common event calling on Mood value 0.

 5/22/18 - (v1.3): Converted Mood System to Variable System.


-----------------------------------------------------------------------------------
                    Plugin Commands:
-----------------------------------------------------------------------------------


(Work In Progress) Good Social                 
    - Use this on the socials you want to INCREASE Relationship LvL. (ie. Between +1 and +5)
    - Values are dependant on you, so the range varies.

(Work In Progress) Bad Social                  
    - Use this on the socials you want to DECREASE Relationship LvL. (ie. Between -1 and -5)
    - Values are dependant on you, so the range varies.

(Work In Progress) Socialize                   
    - Initializes the Social portion of the Plugin. 
    - It pulls info from the Actor and Event to pull the values for variables.

ChangeValue x y
    - Changes variable x by an amount of y. ex. ChangeValue 1 -3 Decreases the Need1 Value by 3. 


***************************

*@param Variable 1 Name
*@desc Name of Variable 1.
*@default Variable 1

*@param Variable 1 Initial Value
*@desc The initial value of Variable 1.
*@default 100

*@param Variable 1 Max
*@desc The MAX value of Variable 1.
*@default 100

*@param Variable 1 Call Common Event
*@desc You can choose whether or not to call a Common Event when Variable 1 reaches 0. (true/false)
*@default true

*@param Variable 1 Common Event ID
*@desc The ID of the Common Event to call when Variable 1 reaches 0.
*@default 1

*@param Variable 1 Variable ID
*@desc (Work In Progress) The ID of the Variable to link to Variable 1.
*@default 1

***************************
*@param -------------------

*@param Variable 2 Name
*@desc Name of Variable 2.
*@default Variable 2

*@param Variable 2 Initial Value
*@desc The initial value of Variable 2.
*@default 100

*@param Variable 2 Max
*@desc The MAX value of Variable 2.
*@default 100

*@param Variable 2 Call Common Event
*@desc You can choose whether or not to call a Common Event when Variable 2 reaches 0. (true/false)
*@default true

*@param Variable 2 Common Event ID
*@desc The ID of the Common Event to call when Variable 2 reaches 0.
*@default 2

*@param Variable 2 Variable ID
*@desc (Work In Progress) The ID of the Variable to link to Variable 2.
*@default 2

***************************************************
*@param -------------------

*@param Variable 3 Name
*@desc Name of Variable 3.
*@default Variable 3

*@param Variable 3 Initial Value
*@desc The initial value of Variable 3.
*@default 100

*@param Variable 3 Max
*@desc The MAX value of Variable 3.
*@default 100

*@param Variable 3 Call Common Event
*@desc You can choose whether or not to call a Common Event when Variable 3 reaches 0. (true/false)
*@default true

*@param Variable 3 Common Event ID
*@desc The ID of the Common Event to call when Variable 3 reaches 0.
*@default 3

*@param Variable 3 Variable ID
*@desc (Work In Progress) The ID of the Variable to link to Variable 3.
*@default 3

***************************************************
*/

var params = PluginManager.parameters('MH Variable System');

var var1Name = (params['Variable 1 Name'] || "Variable 1");
var var1Value = Number(params['Variable 1 Initial Value'] || 100);
var var1ValueMax = Number(params['Variable 1 Max'] || 100);
var var1CallCe = Boolean(params['Variable 1 Call Common Event'] || true);
var var1CeId = Number(params['Variable 1 Common Event ID'] || 1);
var var1VariableId = Number(params['Variable 1 Variable ID'] || 1);

var var2Name = (params['Variable 2 Name'] || "Variable 2");
var var2Value = Number(params['Variable 2 Initial Value'] || 100);
var var2ValueMax = Number(params['Variable 2 Max'] || 100);
var var2CallCe = Boolean(params['Variable 2 Call Common Event'] || true);
var var2CeId = Number(params['Variable 2 Common Event ID'] || 2);
var var2VariableId = Number(params['Variable 2 Variable ID'] || 2);

var var3Name = (params['Variable 3 Name'] || "Variable 3");
var var3Value = Number(params['Variable 3 Initial Value'] || 100);
var var3ValueMax = Number(params['Variable 3 Max'] || 100);
var var3CallCe = Boolean(params['Variable 3 Call Common Event'] || true);
var var3CeId = Number(params['Variable 3 Common Event ID'] || 3);
var var3VariableId = Number(params['Variable 3 Variable ID'] || 3);




function CVS_hud() {
    this.initialize.apply(this, arguments);
}

CVS_hud.prototype = Object.create(Window_Base.prototype);
CVS_hud.prototype.constructor = CVS_hud;

CVS_hud.prototype.initialize = function (x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, 425, width, height);
    this.refresh();
};

CVS_hud.prototype.windowWidth = function () {
    return 250;
};

CVS_hud.prototype.windowHeight = function () {
    return 200;
};

CVS_hud.prototype.refresh = function () {
    this.contents.clear();

    var color1 = this.textColor(1);
    var color2 = this.textColor(23);

//    VariablesMax();


    this.contents.fontSize = 18;

    this.drawGauge(0, 0, 175, $gameVariables.value(var1VariableId) / var1ValueMax, color1, color2);
    this.drawText(var1Name, 0, 0, 75);
    this.drawCurrentAndMax($gameVariables.value(var1VariableId), var1ValueMax, 0, 0, 200,
    this.normalColor(), this.normalColor());

    this.drawGauge(0, 40, 175, $gameVariables.value(var2VariableId) / var2ValueMax, color1, color2);
    this.drawText(var2Name, 0, 40, 75);
    this.drawCurrentAndMax($gameVariables.value(var2VariableId), var2ValueMax, 0, 40, 200,
    this.normalColor(), this.normalColor());

    this.drawGauge(0, 80, 175, $gameVariables.value(var3VariableId) / var3ValueMax, color1, color2);
    this.drawText(var3Name, 0, 80, 75);
    this.drawCurrentAndMax($gameVariables.value(var3VariableId), var3ValueMax, 0, 80, 200,
    this.normalColor(), this.normalColor());

    this.resetFontSettings();

};


CVS_hud.prototype.open = function () {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

var CVS_map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function () {
    CVS_map_start.call(this);
    this.createVariableWindow();
};

Scene_Map.prototype.createVariableWindow = function () {
    this._varWindow = new CVS_hud();
    this._varWindow.opacity = 0;
    this.addWindow(this._varWindow);
};

var CVS_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    CVS_map_update.call(this);
    this._varWindow.refresh();
};

CVS_hud.prototype.drawGauge = function (x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 8, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 8, color1, color2);
};