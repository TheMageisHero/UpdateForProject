////////////////////////////////////////////////
//=========================================/////
// MageisHero's Mood System for RPG Maker MV. //
//=========================================/////
////////////////////////////////////////////////


/*:

@plugindesc Just a simple addition and calculation for Mood/Needs.
Think of The Sims, but RPG Maker Style. :D
* @author MageisHero (Clayton DuBoce)

***************************************************

*@param Hunger
*@desc The initial value of Hunger.
*@default 75

*@param HungerVariable
*@desc The Variable to store value of Hunger.
*@default 1

*@param HungerMax
*@desc The MAX value of Hunger.
*@default 100

***************************************************

*@param Energy
*@desc The initial value of Energy.
*@default 75

*@param EnergyVariable
*@desc The Variable to store value of Energy.
*@default 2

*@param EnergyMax
*@desc The MAX value of Energy.
*@default 100

***************************************************

*@param Hygiene
*@desc The initial value of Hygiene.
*@default 75

*@param HygieneVariable
*@desc The Variable to store value of Hygiene.
*@default 3

*@param HygieneMax
*@desc The MAX value of Hygiene.
*@default 100



*/

var params = PluginManager.parameters('MH - MoodSystem');
var needHunger = Number(params['Hunger'] || 75);

var params = PluginManager.parameters('MH - MoodSystem');
var needHungerMax = Number(params['HungerMax'] || 100);



var params = PluginManager.parameters('MH - MoodSystem');
var needEnergy = Number(params['Energy'] || 75);


var params = PluginManager.parameters('MH - MoodSystem');
var needEnergyMax = Number(params['EnergyMax'] || 100);



var params = PluginManager.parameters('MH - MoodSystem');
var needHygiene = Number(params['Hygiene'] || 75);

var params = PluginManager.parameters('MH - MoodSystem');
var needHygieneMax = Number(params['HygieneMax'] || 100);


var needMood = (needHunger + needEnergy + needHygiene);



(function(){

var MHpluginCommand = Game_Interpreter.prototype.pluginCommand;

    Game_Interpreter.prototype.pluginCommand = function(command, args) {

       MHpluginCommand.apply(this);

        if (command === 'changeHunger')
        {
            needHunger = needHunger + Number(args[0]);
           console.log(("Your Hunger is At ") + String(needHunger));
            
        }

        if (command === 'changeEnergy')
        {
            needEnergy = needEnergy + Number(args[0]);
            console.log(("Your Energy is At ") + String(needEnergy));
            
        }

        if (command === 'changeHygiene')
        {
            needHygiene = needHygiene + Number(args[0]);
            console.log(("Your Hygiene is At ") + String(needHygiene));
            
        }

        //if(command === 'printString'){
           //switch(args[0]){
            //case 'alert':
                //alert(args[1]);
                //break;
            //case 'console':
                //console.log(args[1]);
                //break;
           }

Update();

})();




function Update(){

    var needMood = (needHunger + needEnergy + needHygiene);
    console.log(("your mood is ") + needMood);
    moodMax();

}

//consoleShowResults();

function moodMax(){

    if(needHunger >= needHungerMax){

        needHunger = needHungerMax; 

    } else {

        if(needHunger < 0){

            needHunger = 0;

        } else{

            return null;

        }

    }

    if(needEnergy >= needEnergyMax){

        needEnergy = needEnergyMax; 

    } else {

        if(needEnergy < 0){

            needEnergy = 0;

        } else{

            return null;

        }

    }

    if(needHygiene >= needHygieneMax){

        needHygiene = needHygieneMax; 

    } else {

        if(needHygiene < 0){

            needHygiene = 0;

        } else{

            return null;

        }

    }

}

//function consoleShowResults(){

    console.log("Your Hunger is: " + needHunger);
    console.log("Your Energy is: " + needEnergy);
    console.log("Your Hygiene is: " + needHygiene);
    console.log("Your Mood is: " + needMood);

//}

//consoleShowResults();

Update();
