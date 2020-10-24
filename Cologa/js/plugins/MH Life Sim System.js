///////////////////////////////////////////////////////
/////=========================================////////////
// MageisHero's Life Sim System for RPG Maker MV. /////
/////=========================================////////////
///////////////////////////////////////////////////////

/*:

@plugindesc Just a simple addition and calculation for Mood/Needs/Relationships/and More.
Think of The Sims, but RPG Maker Style. :D
* @author MageisHero (Clayton DuBoce)

****************************************************************************************

@help

This will allow you to easily manage and implement factors for a survival/life sim game.
All you need to do is:

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

Good Social                 
    - Use this on the socials you want to INCREASE Relationship LvL. (ie. Between +1 and +5)
    - Values are dependant on you, so the range varies.

Bad Social                  
    - Use this on the socials you want to DECREASE Relationship LvL. (ie. Between -1 and -5)
    - Values are dependant on you, so the range varies.

Socialize                   
    - Initializes the Social portion of the Plugin. 
    - It pulls info from the Actor and Event to pull the values for variables.

Change x y
    - Changes mood x by an amount of y. (ex. Change Hunger -3) - Decreases the Hunger LvL.    


-----------------------------------------------------------------------------------
                        Actor Notetags:
-----------------------------------------------------------------------------------

<Person Setup>
Gender: y (Male/Female)
Name: y (ex.Anna)
<\Person Setup>

    - This is the information that the Plugin Command "Socialize" pulls from.



-----------------------------------------------------------------------------------
                        Event Notetags:
-----------------------------------------------------------------------------------

<person:x>
    - Pulls the Notetags from Actor x, making the Event a person with feelings :)


****************************************************************************************

*@param Needs Hud
*@desc You can choose whether or not to use the Needs Hud. (true/false)
*@default false

***************************

*@param -------------------

*@param Needs Max
*@desc The maximum value of overall Mood. (All Needs / Amount of Needs).
*@default 100

*@param Hunger
*@desc The initial value of Hunger.
*@default 100

*@param Hunger Variable
*@desc The Variable to store the value of Hunger.
*@default 1

*@param Hunger Max
*@desc The MAX value of Hunger.
*@default 100

***************************
*@param -------------------

*@param Energy
*@desc The initial value of Energy.
*@default 100

*@param Energy Variable
*@desc The Variable to store the value of Energy.
*@default 2

*@param EnergyMax
*@desc The MAX value of Energy.
*@default 100

***************************************************
*@param -------------------

*@param Hygiene
*@desc The initial value of Hygiene.
*@default 100

*@param Hygiene Variable
*@desc The Variable to store the value of Hygiene.
*@default 3

*@param Hygiene Max
*@desc The MAX value of Hygiene.
*@default 100

***************************************************
*@param -------------------

*@param Social
*@desc The initial value of Social.
*@default 100

*@param Social Variable
*@desc The Variable to store the value of Social.
*@default 4

*@param Social Max
*@desc The MAX value of Social.
*@default 100

***************************************************
*@param -------------------

*@param Bladder
*@desc The initial value of Bladder.
*@default 100

*@param Bladder Variable
*@desc The Variable to store the value of Bladder.
*@default 5

*@param Bladder Max
*@desc The MAX value of Bladder.
*@default 100

***************************************************
*@param -------------------

*@param Fun
*@desc The initial value of Fun.
*@default 100

*@param Fun Variable
*@desc The Variable to store the value of Fun.
*@default 6

*@param Fun Max
*@desc The MAX value of Fun.
*@default 100


*@param ========================

*@param Charisma
*@desc The initial value of Charisma.
*@default 0

*@param Charisma Max
*@desc The MAX value of Charisma.
*@default 10

*@param Charisma Variable
*@desc The Variable to store the value of Charisma.
*@default 7

***************************************************
*@param -------------------

*@param Culinary
*@desc The initial value of Culinary.
*@default 0

*@param Culinary Max
*@desc The MAX value of Culinary.
*@default 10

*@param Culinary Variable
*@desc The Variable to store the value of Culinary.
*@default 8

***************************************************
*@param -------------------

*@param Body
*@desc The initial value of Body.
*@default 0

*@param Body Max
*@desc The MAX value of Body.
*@default 10

*@param Body Variable
*@desc The Variable to store the value of Body.
*@default 9

***************************************************
*@param -------------------

*@param Logic
*@desc The initial value of Logic.
*@default 0

*@param Logic Max
*@desc The MAX value of Logic.
*@default 10

*@param Logic Variable
*@desc The Variable to store the value of Logic.
*@default 10

***************************************************
*@param -------------------

*@param Creativity
*@desc The initial value of Creativity.
*@default 0

*@param Creativity Max
*@desc The MAX value of Creativity.
*@default 10

*@param Creativity Variable
*@desc The Variable to store the value of Creativity.
*@default 11

***************************************************
*@param -------------------

*@param Mechanical
*@desc The initial value of Mechanical.
*@default 0

*@param Mechanical Max
*@desc The MAX value of Mechanical.
*@default 10

*@param Mechanical Variable
*@desc The Variable to store the value of Mechanical.
*@default 12

*@param ========================

*@param Relationship Min
*@desc The Minimum value that a Relationship LvL can get to.
*@default -100

*@param Relationship Max
*@desc The Maximum value that a Relationship LvL can get to.
*@default 100

*@param Relationship Variable
*@desc The Variable to store the Relationship LvL of the current person you're talking to.
*@default 13

*@param -------------------

*/


var params = PluginManager.parameters('MH Life Sim System');

var needsSystem = Number(params['Needs System'] || true);
var needsHud = Number(params['Needs Hud'] || false);

var mood;
var needsMax = Number(params['Mood Max'] || 100);

var hunger = Number(params['Hunger'] || 100);
var hungerMax = Number(params['Hunger Max'] || 100);

var energy = Number(params['Energy'] || 100);
var energyMax = Number(params['Energy Max'] || 100);

var hygiene = Number(params['Hygiene'] || 100);
var hygieneMax = Number(params['Hygiene Max'] || 100);

var social = Number(params['Social'] || 100);
var socialMax = Number(params['Social Max'] || 100);

var bladder = Number(params['Bladder'] || 100);
var bladderMax = Number(params['Bladder Max'] || 100);

var fun = Number(params['Fun'] || 100);
var funMax = Number(params['Fun Max'] || 100);

var relationshipSystem = Number(params['Relationship System'] || true);

var relMin = Number(params['Relationship Min'] || -100);
var relMax = Number(params['Relationship Max'] || 100);
var relVar = Number(params['Relationship Variable'] || 13);
var p1Rel;
var p2Rel;

var skillsSystem = Number(params['Skills System'] || true);

var charisma = Number(params['Charisma'] || 0);
var charismaMax = Number(params['Charisma Max'] || 10);

var culinary = Number(params['Culinary'] || 0);
var culinaryMax = Number(params['Culinary Max'] || 10);

var body = Number(params['Body'] || 0);
var bodyMax = Number(params['Body Max'] || 10);

var logic = Number(params['Logic'] || 0);
var logicMax = Number(params['Logic Max'] || 10);

var creativity = Number(params['Creativity'] || 0);
var creativityMax = Number(params['Creativity Max'] || 10);

var mechanical = Number(params['Mechanical'] || 0);
var mechanicalMax = Number(params['Mechanical Max'] || 10);



//***************************************************************************************//
//************************************ Socialize ****************************************//
//***************************************************************************************//

/*function BeginSocialize(){
    
    if (relationshipSystem)
        {
            currentRel = $gameVariables.value(relVar);
            
        }

}



*/
//***************************************************************************************//
//************************************ Relationships ************************************//
//***************************************************************************************//

/*
if (relationshipSystem)
    {
        $gameVariables.value(relVar);
        
    }

 */   
//***************************************************************************************//
//************************************ Plugin Commands **********************************//
//***************************************************************************************//

var MHpluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) 
    
{

    MHpluginCommand.apply(this);

            if (command === 'ChangeHunger')
            {
                 hunger = hunger + Number(args[0]);
                console.log(("Your Hunger is At ") + String(hunger)); 
            }
            
            if (command === 'ChangeEnergy')
            {
                energy = energy + Number(args[0]);
                console.log(("Your Energy is At ") + String(energy));
            }
            
            /*if (command === 'ChangeHygiene')
            {
                hygiene = hygiene + Number(args[0]);
                console.log(("Your Hygiene is At ") + String(hygiene));
            }
            */
            if (command === 'Change')
            {
                args[0] = args[0] + Number(args[1]);

                if (args[0] == social)
                {
                    console.log(("Your Social is At ") + String(social));
                }
                if (args[0] == hygiene)
                {
                    console.log(("Your Hygiene is At ") + String(hygiene));
                }
            }

            if (command === 'Socialize')
                {
                    BeginSocialize();
                }
        
            if (command === 'Good Social')
            {
                currentRel = currentRel + Math.floor((Math.random() * 5) + 1);
                Console.log(currentRel);
                    
                if (currentRel < currentRelMin)
                    {
                        currentRel = currentRelMin;
                    }
            }
                
            if (command === 'Bad Social')
            {
                currentRel = currentRel + Math.floor((Math.random() * 0) + -5);
                Console.log(currentRel);

                if (currentRel > currentRelMax)
                {
                    currentRel = currentRelMax;
                }
            }
        Update();
}

function Update()
{
    if(needsHud == true)
    {
        LSS_needsHud();
    }
    if(needsSystem == true)
    {
        mood = hunger + energy + hygiene + social + bladder + fun;
        mood = Math.floor(mood / 6); 
        NeedsMax();
    }
}

//**********************************************************************************///
//************************************ Needs Max ************************************///
//**********************************************************************************///

    function NeedsMax()
    {
        //Check Need1 Max
        if (hunger >= hungerMax)
        {
            hunger = hungerMax; 
            
            } else {
            
                if(hunger < 0)
                {
                    hunger = 0;
                } 
                else 
                { 
                    return null;
                }
        }

        //Check Need2 Max
        if (energy >= energyMax){
            
            energy = energyMax; 
            
        } else {
            
            if(energy < 0){
            
                energy = 0;
            
            } else{
            
                return null;
            }
        }

        //Check Need3 Max
        if (hygiene >= hygieneMax)
        {
            hygiene = hygieneMax;
        } 
        else 
        {
            if(hygiene <= 0)
            {
                hygiene = 0;
            } 
            else 
            {
                return null;
            }
        }
            
        //Check Need4 Max
        if(social >= socialMax)
        {  
            social = socialMax;
        } 
        else 
        {
            if(social <= 0)
            {
                social = 0;
            }
            else 
            {
                 return null;
            }
        }
    } 

//**********************************************************************************///
//************************************ Needs Hud ************************************///
//**********************************************************************************///
/*
    function LSS_needsHud() 
    {
        //this.initialize.apply(this, arguments);
        
        LSS_needsHud.prototype = Object.create(Window_Base.prototype);
        LSS_needsHud.prototype.constructor = LSS_needsHud;
        LSS_needsHud.prototype.initialize = function(x, y) 
        {    
            var width = this.windowWidth();
            var height = this.windowHeight();
            Window_Base.prototype.initialize.call(this, x, y, width, height);
            this.refresh();
        };

        LSS_needsHud.prototype.windowWidth = function() 
        {
            return 300;
        };
            
        LSS_needsHud.prototype.windowHeight = function() 
        {
            return 300;
        };
            
        LSS_needsHud.prototype.refresh = function() 
        {
            this.contents.clear();
            var color1 = this.hpGaugeColor1();
            var color2 = this.hpGaugeColor2();

            this.drawGauge(0, 0, 175, mood / 100, color1, color2);
            this.drawText("Mood", 0, 0, 75);
            this.drawCurrentAndMax(mood, 100, 0, 0, 200,
            this.normalColor(), this.normalColor());
            
            this.drawGauge(0, 40, 175, hunger / hungerMax, color1, color2);
            this.drawText("Hunger", 0, 40, 75);
            this.drawCurrentAndMax(hunger, hungerMax,0, 40, 200,
            this.normalColor(), this.normalColor());
            
            this.drawGauge(0, 80, 175, energy / energyMax, color1, color2);
            this.drawText("Energy", 0, 80, 75);
            this.drawCurrentAndMax(energy, energyMax, 0, 80, 200,
            this.normalColor(), this.normalColor());
            
            this.drawGauge(0, 120, 175, hygiene / hygieneMax, color1, color2);
            this.drawText("Hygiene", 0, 120, 75);
            this.drawCurrentAndMax(hygiene, hygieneMax, 0, 120, 200,
            this.normalColor(), this.normalColor());
            
            this.drawGauge(0, 160, 175, bladder / bladderMax, color1, color2);
            this.drawText("Bladder", 0, 160, 75);
            this.drawCurrentAndMax(bladder, bladderMax, 0, 160, 200,
            this.normalColor(), this.normalColor());
            
            this.drawGauge(0, 200, 175, fun / funMax, color1, color2);
            this.drawText("Fun", 0, 200, 75);
            this.drawCurrentAndMax(fun, funMax, 0, 200, 200,
            this.normalColor(), this.normalColor());
            
            NeedsMax();
        };
            
        LSS_needsHud.prototype.open = function() 
        {
            this.refresh();
            Window_Base.prototype.open.call(this);
        };
            
        var MHmoodMapStart = Scene_Map.prototype.start;
        Scene_Map.prototype.start = function() 
        {
            MHmoodMapStart.call(this);
            this.createMoodWindow();
        };
            
        Scene_Map.prototype.createMoodWindow = function()
        {
            this._moodWindow = new LSS_needsHud();
            this._moodWindow.opacity = 0;
            this.addWindow(this._moodWindow);
        }
            
            var MHmoodMapUpdate = Scene_Map.prototype.update;
            Scene_Map.prototype.update = function() 
            {
                MHmoodMapUpdate.call(this);
                this._moodWindow.refresh();
            };
            
        LSS_needsHud.prototype.drawGauge = function(x, y, width, rate, color1, color2) 
        {
            var fillW = Math.floor(width * rate);
            var gaugeY = y + this.lineHeight() - 6;
            this.contents.fillRect(x, gaugeY, width, 8, this.gaugeBackColor());
            this.contents.gradientFillRect(x, gaugeY, fillW, 8, color1, color2);
        };
    }
*/
Update();

