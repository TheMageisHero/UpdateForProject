/*:
@plugindesc |V1.1.0.0| This simple plugin allows you to use custom stats for your characters in game
@author Mutation Engine Plugins (MuteDay)

@params --Stats--
@default ----------------------

@param Disable Stat Limits
@desc Tells the game not to worry about limiting the stats(default false)
@default false

@param Max Level
@desc Sets the maximum level limit for actors, Doesnt include Enemies(Default: 99 )
@default 99

@param Actor MaxHP
@desc Sets the maximum limit for the actors HP, doesnt include Enemies(default: 9999 )
@default 9999

@param Actor MaxMP
@desc Sets the maximum limit for the actors MP, Doesnt include Enemies ( default: 9999 )
@default 9999

@param Actor Parameter
@desc Sets the limit of the other normal parameters ( default: 999 )
@default 999

@param Enemy MaxHP
@desc Sets the maximum HP limit for enemies ( default: 999999 )
@default 999999

@param Enemy MaxMP
@desc Sets the maximum MP limit for enemies( default: 9999 )
@default 9999

@param Enemy Parameter
@desc Sets the limit of the other normal parameters For Enemies ( default: 999 )
@default 999
@help
==========================================================================
Introduction
==========================================================================
Mutation Engine is proud to Introduce you to the stat core, while this is 
quite a small plugin, it will have a big impact over how the game is played
with such low limits on the stats of players and huge stat advantages when
it comes to enemies, how would you like to be able to control everything 
alot more, how would you like to be able to let your game go to whatever
level you wish to be the max level, well now you can


============================================================================
Required and optional Plugins
============================================================================
Required:
MUE_MainCore :
This is required for you to be able to read the note tags


Optinal: 

============================================================================
Note Tag Data
============================================================================
Always make sure that the following note tags are in the proper case

While just setting the max of the parameters is not enough, now we have to give
you a way to set the stats and levels and everything else they you may want to do

Actor Notes:
	<IniLevel: level>
	-replace Level with the level you wish to use
	-this allows you to set the actors level to anything above 99, which is the
	hard coded limit in the editor
	
	<MaxLevel: level>
	-replace level with the level you wish to be this characters max level
	
	
Class Skill Learn:
	<Learn Level: level>
	-put this inside a class's "Skills to Learn" notetag, this will allow the 
	skill to be learned at levels above 99
	
	
Weapon and Armor Notetags:
	<stat: value>
	-Allows the peice of weapons or armor to gain or lose "value" amount of stat.
	replace "stat" with "HP","MP","Atk","Def","Mat","Mdef","Matk","Agi", or "Luck"
	to alter a specific stat. this allows to bypass limits of the editor
	
	
Enemy Notetags:
	<stat: value>
	-Allows the peice of enemies to gain or lose "value" amount of stat.
	replace "stat" with "HP","MP","Atk","Def","Mat","Mdef","Matk","Agi", or "Luck"
	to alter a specific stat. this allows to bypass limits of the editor
	
	<Exp: value>
	-This allows the enemies exp to give more then the editors default exp limit
	
===============================================================================
Changes 
===============================================================================
V1.0.0:
-Initial Release
*/

//#region Namespace and Import
var Imported=Imported||{};
var MUE=MUE||{};
MUE.Stats=MUE.Stats||{};
Imported.MUE_StatCore=true;
//#endregion

//#region Variables
var temp=PluginManager.parameters('MUE_StatCore');
MUE.Stats.MaxHP=Number(temp['Actor MaxHP']||9999);
MUE.Stats.MaxMP=Number(temp['Actor MaxMP']||9999);
MUE.Stats.MaxLevel=Number(temp['Max Level']||99);
MUE.Stats.ParaMax=Number(temp['Actor Parameter']||999);
MUE.Stats.EnMaxHP=Number(temp['Enemy MaxHP']||999999);
MUE.Stats.EnMaxMP=Number(temp['Enemy MaxMP']||9999);
MUE.Stats.EnMaxPara=Number(temp['Enemy Parameter']||999);
MUE.Stats.DisableStats=eval(temp['Disable Stat Limits']||"false");
temp=null;
//#endregion

//#region Notetag Reading
var MUE_Stats_OnNoteTag=MUE.onDatabaseFinishedLoading;
MUE.onDatabaseFinishedLoading=function() {
    MUE.Stats.ProccessStatNotetags($dataItems);
    MUE.Stats.ProccessStatNotetags($dataArmors);
    MUE.Stats.ProccessStatNotetags($dataWeapons);
    MUE.Stats.ProccessStatNotetags($dataEnemies);
    MUE.Stats.ProccessClassLearnNotes($dataClasses);
    MUE.Stats.ProccessActorLevels($dataActors);
};

MUE.Stats.ProccessStatNotetags=function(group) {
    for(var n=1;n<group.length;n++) {
        var obj=group[n];
        if(!obj) continue;
        if(obj.params) {
            obj.params[0]=Number(obj.meta.HP||obj.params[0]);
            obj.params[1]=Number(obj.meta.MP||obj.params[1]);
            obj.params[2]=Number(obj.meta.Atk||obj.params[2]);
            obj.params[3]=Number(obj.meta.Def||obj.params[3]);
            obj.params[4]=Number(obj.meta.MAtk||obj.params[4]);
            obj.params[5]=Number(obj.meta.MDef||obj.params[5]);
            obj.params[6]=Number(obj.meta.Agi||obj.params[6]);
            obj.params[7]=Number(obj.meta.Luck||obj.params[7]);
        }
        obj.exp=Number(obj.meta.Exp||obj.exp);
    }
};

MUE.Stats.ProccessClassLearnNotes=function(group) {
    for(var n=1;n<group.length;n++) {
        var obj=group[n];
        if(!obj) continue;
        obj.learnings.forEach(function(learning) {
            if(learning.note.match(/<(?:LEARN LEVEL):(\d+)>/i)) {
                learning.level=parseInt(RegExp.$1);
                if(learning.level<1) obj.maxLevel=1;
            }
        },this);
    }
};

MUE.Stats.ProccessActorLevels=function(group) {
    for(var n=1;n<group.length;n++) {
        var obj=group[n];
        if(!obj) continue;
        obj.maxLevel=MUE.Stats.MaxLevel;
        obj.initialLevel=Number(obj.meta.MaxLevel||obj.initialLevel);
        obj.maxLevel=Number(obj.meta.IniLevel||obj.maxLevel);
    }
};

//#endregion

//#region Game_BattlerBase
Game_BattlerBase.prototype.paramMax=function(paramID) {
    if(MUE.Stats.DisableStats) {
        return 99999999999999;
    }
    else
    {
        if(paramID==0)
            return MUE.Stats.EnMaxHP
        else if(paramID==1)
            return MUE.Stats.EnMaxMP
        else
            return MUE.Stats.EnMaxPara;
    }
};
//#endregion

//#region Game_Actor
var MUE_Stats_isMaxLevel_Game_Actor=Game_Actor.prototype.isMaxLevel;
Game_Actor.prototype.isMaxLevel=function() {
    if(MUE.Stats.DisableStats) return false;
    if (this.maxLevel()==0)return false;
    return MUE_Stats_isMaxLevel_Game_Actor.call(this);
};

Game_Actor.prototype.paramMax=function(paramID) {
    if(MUE.Stats.DisableStats) {
        return 99999999999999;
    }
    else {
        if(paramID==0)
            return MUE.Stats.MaxHP;
        else if(paramID==1)
            return MUE.Stats.MaxMP;
        else
            return MUE.Stats.ParaMax;
    }
};

Game_Actor.prototype.changeClass=function(classId,keepExp) {
    if(keepExp) {
        this._exp[classId]=this._exp[this._classId];
    }
    this._classId=classId;
    this.changeExp(this._exp[this._classId]||0,false);
    this.refresh();
};

var MUE_Stats_Game_Actor_paramBase=Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase=function(paramID) {
    if(this.level>99) {
        var i=this.currentClass().params[paramId][99];
        var j=this.currentClass().params[paramId][98];
        i+=(i-j)*(this.level-99);
        return i;
    }
    return MUE_Stats_Game_Actor_paramBase.call(this,paramID);
};
//#endregion