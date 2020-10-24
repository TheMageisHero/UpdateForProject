///////////////////////////////////////////////////////
/////=========================================////////////
//      TheMageisHero's Life Sim System HUD 1.1    ////////
//          for RPG Maker MV.                   ////////////
/////=========================================////////////
///////////////////////////////////////////////////////

/*:

@plugindesc (v 1.1) Just a simple addition and calculation for 
Mood/Needs/and (soon) More.Think of The Sims, but RPG Maker Style. :D
* @author TheMageisHero (Clayton DuBoce)

****************************************************************************************

@help

- Release Notes:
 4/13/18 - (v1.0): Completed Plugin.

 4/13/18 - (v1.1): Simplified Plugin Commands, Bug Fixes.

 -----------------------------------------------------------------------------------

This will allow you to easily manage and implement factors for a survival/life sim game.
All you need to do is: 

-----------------------------------------------------------------------------------
                  (Work In Progress) Create Social NPC:
-----------------------------------------------------------------------------------

1. Create the Event for the NPC.
2. Put <person:x> in the event note. (x = Actor #)
3. Go into Actors, and create an Actor like always. But do as follows in the Note field:

<Person Setup>
Gender: y (Male/Female)
Name: Y (ex.Anna)
<\Person Setup>

Like this:

<Person Setup>
Gender: Female
Name: Anna
<\Person Setup>

4. In the Event you created, use the Show Choices command, and enter the socials you wish to use.
ex. (Chat, Flirt, Kiss, Joke, etc.)

5. Under each choice, place a social Plugin Command, based on the outcome you want.
ex. Joke > Plugin Command: Good Social
ex. Insult > Plugin Command: Bad Social

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

ChangeNeed x y
    - Changes need x by an amount of y. ex. ChangeNeed 1 -3 Decreases the Need1 Value by 3. 


-----------------------------------------------------------------------------------
                        Actor Notetags:
-----------------------------------------------------------------------------------

(Work In Progress) 

<Person Setup>
Gender: y (Male/Female)
Name: y (ex.Anna)
<\Person Setup>

    - This is the information that the Plugin Command "Socialize" pulls from.



-----------------------------------------------------------------------------------
                        Event Notetags:
-----------------------------------------------------------------------------------

(Work In Progress) 

<person:x>
    - Pulls the Notetags from Actor x, making the Event a person with feelings :)


***************************

*@param Mood Hud
*@desc You can choose whether or not to use the Mood/Needs Hud. (true/false)
*@default true

*@param Use Needs Variable
*@desc (Work In Progress) Whether or not to use Variables for Needs.
*@default false

***************************

*@param -------------------

*@param Mood Max
*@desc The maximum value of overall Mood. (Mood / Amount of Needs).
*@default 100

*@param -------------------

*@param Need 1 Name
*@desc Name of Need 1.
*@default Need 1

*@param Need 1 Initial Value
*@desc The initial value of Need 1.
*@default 100

*@param Need 1 Max
*@desc The MAX value of Need 1.
*@default 100

*@param Need 1 Call Common Event
*@desc You can choose whether or not to call a Common Event when Need 1 reaches 0. (true/false)
*@default true

*@param Need 1 Common Event ID
*@desc The ID of the Common Event to call when Need 1 reaches 0.
*@default 1

*@param Need 1 Use Variable
*@desc (Work In Progress) Whether or not to link a Variable to Need 1.
*@default false

*@param Need 1 Variable ID
*@desc (Work In Progress) The ID of the Variable to link to Need 1.
*@default 1

***************************
*@param -------------------

*@param Need 2 Name
*@desc Name of Need 2.
*@default Need 2

*@param Need 2 Initial Value
*@desc The initial value of Need 2.
*@default 100

*@param Need 2 Max
*@desc The MAX value of Need 2.
*@default 100

*@param Need 2 Call Common Event
*@desc You can choose whether or not to call a Common Event when Need 2 reaches 0. (true/false)
*@default true

*@param Need 2 Common Event ID
*@desc The ID of the Common Event to call when Need 2 reaches 0.
*@default 2

*@param Need 2 Use Variable
*@desc (Work In Progress) Whether or not to link a Variable to Need 2.
*@default false

*@param Need 2 Variable ID
*@desc (Work In Progress) The ID of the Variable to link to Need 2.
*@default 2

***************************************************
*@param -------------------

*@param Need 3 Name
*@desc Name of Need 3.
*@default Need 3

*@param Need 3 Initial Value
*@desc The initial value of Need 3.
*@default 100

*@param Need 3 Max
*@desc The MAX value of Need 3.
*@default 100

*@param Need 3 Call Common Event
*@desc You can choose whether or not to call a Common Event when Need 3 reaches 0. (true/false)
*@default true

*@param Need 3 Common Event ID
*@desc The ID of the Common Event to call when Need 3 reaches 0.
*@default 3

*@param Need 3 Use Variable
*@desc (Work In Progress) Whether or not to link a Variable to Need 3.
*@default false

*@param Need 3 Variable ID
*@desc (Work In Progress) The ID of the Variable to link to Need 3.
*@default 3

***************************************************
*/

var params = PluginManager.parameters('TheMageisHero Life System');

var needsHud = Boolean(params['Mood HUD'] || true);
var useNeedsVariable = Boolean(params['Use Needs Variable'] || false);

var mood;
var moodMax = Number(params['Mood Max'] || 100);

var need1Name = (params['Need 1 Name'] || "Need 1");
var need1Value = Number(params['Need 1 Initial Value'] || 100);
var need1ValueMax = Number(params['Need 1 Max'] || 100);
var need1CallCe = Boolean(params['Need 1 Call Common Event'] || true);
var need1CeId = Number(params['Need 1 Common Event ID'] || 1);
var need1UseVariable = Boolean(params['Need 1 Use Variable'] || false);
var need1VariableId = Number(params['Need 1 Variable Id'] || 1);

var need2Name = (params['Need 2 Name'] || "Need 2");
var need2Value = Number(params['Need 2 Initial Value'] || 100);
var need2ValueMax = Number(params['Need 2 Max'] || 100);
var need2CallCe = Boolean(params['Need 2 Call Common Event'] || true);
var need2CeId = Number(params['Need 2 Common Event ID'] || 2);
var need2UseVariable = Boolean(params['Need 2 Use Variable'] || false);
var need2VariableId = Number(params['Need 2 Variable Id'] || 2);

var need3Name = (params['Need 3 Name'] || "Need 3");
var need3Value = Number(params['Need 3 Initial Value'] || 100);
var need3ValueMax = Number(params['Need 3 Max'] || 100);
var need3CallCe = Boolean(params['Need 3 Call Common Event'] || true);
var need3CeId = Number(params['Need 3 Common Event ID'] || 3);
var need3UseVariable = Boolean(params['Need 3 Use Variable'] || false);
var need3VariableId = Number(params['Need 3 Variable Id'] || 3);

var TMHLS_pluginCommandCommand = Game_Interpreter.prototype.pluginCommand;

if(needsHud)
{

    Game_Interpreter.prototype.pluginCommand = function(command, args) 
    
    {

        TMHLS_pluginCommandCommand.apply(this);

                if (command === 'ChangeNeed')
                {
                    needChoice = Number(args[0]);
                    needChange = Number(args[1]);

                    if(needChoice == 1)
                    {
                        need1Value = need1Value + needChange;
                    }

                    if(needChoice == 2)
                    {
                        need2Value = need2Value + needChange;
                    }

                    if(needChoice == 3)
                    {
                        need3Value = need3Value + needChange;
                    }
                }
    }
/*
    if(useNeedsVariable)
    {
        NeedsVariables();
        function NeedsVariables()
        {
            if (need1UseVariable)
            {
                $gameVariables.setValue(needs1VariableId, need1Value);
                console.log("Need 1 is at " + need1Value + "Need 1 Variable is " + needs1VariableId);
            }

            if (need2UseVariable)
            {
                $gameVariables.setValue(needs2VariableId, need2Value);
            }

            if (need3UseVariable)
            {
                $gameVariables.setValue(needs3VariableId, need3Value);
            }
        };
    }
*/
    function NeedsMax()
        {
            //Check Need1 Max
            if (need1Value >= need1ValueMax)
            {
                need1Value = need1ValueMax; 
            
                } else {
            
                    if(need1Value < 0)
                    {
                        need1Value = 0;

                        if (need1CallCe)
                        {
                            $gameTemp.reserveCommonEvent(need1CeId);
                        }
                        else
                        {
                            return null;
                        }
                    } 
                    else 
                    { 
                        return null;
                    }
            }

            //Check Need2 Max
            if (need2Value >= need2ValueMax)
            {
                need2Value = need2ValueMax; 
            } 
            else 
            {
                if(need2Value < 0)
                {
                    need2Value = 0;
                    
                    if (need2CallCe)
                        {
                            $gameTemp.reserveCommonEvent(need2CeId);
                        }
                        else
                        {
                            return null;
                        }
                } 
                else
                {
                    return null;
                }
            }

            //Check Need3 Max
            if (need3Value >= need3ValueMax)
            {
                need3Value = need3ValueMax;
            } 
            else 
            {
                if(need3Value <= 0)
                {
                    need3Value = 0;
                    
                    if (need3CallCe)
                        {
                            $gameTemp.reserveCommonEvent(need3CeId);
                        }
                        else
                        {
                            return null;
                        }
                } 
                else 
                {
                    return null;
                }
            }
        }

    function TMHLS_hud() {
        this.initialize.apply(this, arguments);
    }

    TMHLS_hud.prototype = Object.create(Window_Base.prototype);
    TMHLS_hud.prototype.constructor = TMHLS_hud;

    TMHLS_hud.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, 425, width, height);
    this.refresh();
    };

    TMHLS_hud.prototype.windowWidth = function() {
        return 250;
    };

    TMHLS_hud.prototype.windowHeight = function() {
        return 200;
    };

    TMHLS_hud.prototype.refresh = function() {
    this.contents.clear();

    var color1 = this.textColor(1);
    var color2 = this.textColor(23);    

    NeedsMax();
    var mood = need1Value + need2Value + need3Value;
    mood = Math.floor(mood / 3); 
    NeedsMax();

    this.contents.fontSize = 18;

    this.drawGauge(0, 0, 175, mood / moodMax, color1, color2);
    this.drawText("Mood", 0, 0, 75);
    this.drawCurrentAndMax(mood, moodMax, 0, 0, 200,
    this.normalColor(), this.normalColor());

    this.drawGauge(0, 40, 175, need1Value / need1ValueMax, color1, color2);
    this.drawText(need1Name, 0, 40, 75);
    this.drawCurrentAndMax(need1Value, need1ValueMax,0, 40, 200,
    this.normalColor(), this.normalColor());
    
    this.drawGauge(0, 80, 175, need2Value / need2ValueMax, color1, color2);
    this.drawText(need2Name, 0, 80, 75);
    this.drawCurrentAndMax(need2Value, need2ValueMax, 0, 80, 200,
    this.normalColor(), this.normalColor());  

    this.drawGauge(0, 120, 175, need3Value / need3ValueMax, color1, color2);
    this.drawText(need3Name, 0, 120, 75);
    this.drawCurrentAndMax(need3Value, need3ValueMax, 0, 120, 200,
    this.normalColor(), this.normalColor()); 

    this.resetFontSettings();

    };


    TMHLS_hud.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
    };

    var TMHLS_map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
    TMHLS_map_start.call(this);
    this.createVariableWindow();
    };

    Scene_Map.prototype.createVariableWindow = function() {
    this._varWindow = new TMHLS_hud();
    this._varWindow.opacity = 0;
    this.addWindow(this._varWindow);
    }

    var TMHLS_map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
    TMHLS_map_update.call(this);
    this._varWindow.refresh();
    };

    TMHLS_hud.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 8, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 8, color1, color2);
    };
}
else
{
    console.log("hud is off");
}
