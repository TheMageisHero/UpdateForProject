////////////////////////////////////////////////////
//=========================================/////////
// MageisHero's YourLife System for RPG Maker MV. //
//=========================================/////////
////////////////////////////////////////////////////

/*:

@plugindesc Just a simple addition and calculation for Mood/Needs.
Think of The Sims, but RPG Maker Style. :D
* @author MageisHero (Clayton DuBoce)

***************************************************

*@param MOTIVES

*@param Hunger
*@desc The initial value of Hunger.
*@default 100

*@param Hunger Variable
*@desc The Variable to store value of Hunger.
*@default 1

*@param Hunger Max
*@desc The MAX value of Hunger.
*@default 100

***************************************************

*@param Energy
*@desc The initial value of Energy.
*@default 100

*@param Energy Variable
*@desc The Variable to store value of Energy.
*@default 2

*@param EnergyMax
*@desc The MAX value of Energy.
*@default 100

***************************************************

*@param Hygiene
*@desc The initial value of Hygiene.
*@default 100

*@param Hygiene Variable
*@desc The Variable to store value of Hygiene.
*@default 3

*@param Hygiene Max
*@desc The MAX value of Hygiene.
*@default 100

***************************************************

*@param Social
*@desc The initial value of Social.
*@default 100

*@param Social Variable
*@desc The Variable to store value of Social.
*@default 4

*@param Social Max
*@desc The MAX value of Social.
*@default 100

***************************************************

*@param Bladder
*@desc The initial value of Bladder.
*@default 100

*@param Bladder Variable
*@desc The Variable to store value of Bladder.
*@default 5

*@param Bladder Max
*@desc The MAX value of Bladder.
*@default 100

***************************************************

*@param Fun
*@desc The initial value of Fun.
*@default 100

*@param Fun Variable
*@desc The Variable to store value of Fun.
*@default 5

*@param Fun Max
*@desc The MAX value of Fun.
*@default 100


***************************************************
=============== Skills ============================
***************************************************

*@param ===== SKILLS =====

*@param Charisma
*@desc The initial value of Charisma.
*@default 0

*@param Charisma Max
*@desc The MAX value of Charisma.
*@default 10

***************************************************

*@param Culinary
*@desc The initial value of Culinary.
*@default 0

*@param Culinary Max
*@desc The MAX value of Culinary.
*@default 10

***************************************************

*@param Body
*@desc The initial value of Body.
*@default 0

*@param Body Max
*@desc The MAX value of Body.
*@default 10

***************************************************

*@param Logic
*@desc The initial value of Logic.
*@default 0

*@param Logic Max
*@desc The MAX value of Logic.
*@default 10

***************************************************

*@param Culinary
*@desc The initial value of Culinary.
*@default 0

***************************************************

*@param Culinary Max
*@desc The MAX value of Culinary.
*@default 10

***************************************************

*@param Mechanical
*@desc The initial value of Mechanical.
*@default 0

*@param Mechanical Max
*@desc The MAX value of Mechanical.
*@default 10


***************************************************
=============== Relationships ============================
***************************************************

*@param ===== Relationships =====

*@param Relationship 1
*@desc 
*@default 0

*@param Relationship 2
*@desc 
*@default 0

*/

var mood;

var params = PluginManager.parameters('MHYL_Core');

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

/*
**************************************************
=============== Skills ============================
***************************************************
*/

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


/*
**************************************************
=============== Relationships ============================
***************************************************
*/

var rel1 = Number(params['Relationship 1'] || 0);
var rel2 = Number(params['Relationship 2'] || 0);


var currentRel = 0

var MHpluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) 
    
{

    Update();

    MHpluginCommand.apply(this);

        if (command === 'changeHunger')
        {
            hunger = hunger + Number(args[0]);
            moodMax();
           console.log(("Your Hunger is At ") + String(hunger));          
        }
        if (command === 'changeEnergy')
        {
            energy = energy + Number(args[0]);
            moodMax();
            console.log(("Your Energy is At ") + String(energy));
        }
        if (command === 'changeHygiene')
        {
            hygiene = hygiene + Number(args[0]);
            moodMax();
            console.log(("Your Hygiene is At ") + String(hygiene));
        }
        if (command === 'changeSocial')
        {
            social = social + Number(args[0]);
            moodMax();
            console.log(("Your Social is At ") + String(social));
        }
         moodMax();
    }

function Update(){
    MHYL_moodHUD();
    moodMax();
    mood = hunger + energy + hygiene + social + bladder + fun;
    mood = Math.floor(mood / 6); 

}

//consoleShowResults();

function moodMax(){

    if(hunger >= hungerMax)
    {
        hunger = hungerMax; 

    } else {

        if(hunger < 0){

            hunger = 0;

        } else {

            return null;
        }
    }
    if(energy >= energyMax){

        energy = energyMax; 

    } else {

        if(energy < 0){

            energy = 0;

        } else{

            return null;
        }
    }

    if(hygiene >= hygieneMax){

        hygiene = hygieneMax; 

    } else {

        if(hygiene <= 0){

            hygiene = 0;

        } else {

            return null;
        }
    }

    if(social >= socialMax){

        social = socialMax; 

    } else {

        if(social <= 0){

            social = 0;

        } else{

            return null;
        }
    }

    if(mood < 0)

    {
        mood = 0;
    }


}

/////////////////////////////////////////////////////////////////////////////////
//////////////////// EVENT //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////
//////////////////// HUD ////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function MHYL_moodHUD() {
    this.initialize.apply(this, arguments);
}

MHYL_moodHUD.prototype = Object.create(Window_Base.prototype);
MHYL_moodHUD.prototype.constructor = MHYL_moodHUD;
MHYL_moodHUD.prototype.initialize = function(x, y) {

    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

MHYL_moodHUD.prototype.windowWidth = function() {
    return 300;
};

MHYL_moodHUD.prototype.windowHeight = function() {
    return 300;
};

MHYL_moodHUD.prototype.refresh = function() {
    this.contents.clear();
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();

 moodMax();

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

 moodMax();
};

MHYL_moodHUD.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

var MHmoodMapStart = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    MHmoodMapStart.call(this);
    this.createMoodWindow();
};

Scene_Map.prototype.createMoodWindow = function(){

    this._moodWindow = new MHYL_moodHUD();
    this._moodWindow.opacity = 0;
    this.addWindow(this._moodWindow);

}

var MHmoodMapUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {

    MHmoodMapUpdate.call(this);
    this._moodWindow.refresh();
};

MHYL_moodHUD.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 6;
    this.contents.fillRect(x, gaugeY, width, 8, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 8, color1, color2);
};
moodMax();
Update();

