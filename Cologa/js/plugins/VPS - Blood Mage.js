// -------------------------------------------------------------------
// Valhalla Engine Plugins System - Blood Mage.js
// -------------------------------------------------------------------
/*:
* @plugindesc v1.0 Creates Blood Mage classes, that uses HP instead of MP to pay skill execution.
* @author Soulpour777

@help
----------------------------------------------------------------------
Valhalla Engine Plugins System - Blood Mage
----------------------------------------------------------------------
This plugin allows you to create classes that uses HP instead 
of MP to pay skill execution. The plugin also checks it properly 
if you have proper HP to pay the skill, to avoid you dying
in before execution.
----------------------------------------------------------------------
INSTRUCTIONS:
----------------------------------------------------------------------
To make an actor class a Blood Mage class, place this tag on the class
note box:

<bloodmage>

----------------------------------------------------------------------
TERMS OF USE:
----------------------------------------------------------------------
 - You are free to use this plugin for Non-Commercial / Commercial Use.
 - You are free to adapt and improve the plugin, with all terms followed.
 - For IGMC uses, please do contact me for more info.
 - Please don't claim the plugin as yours.
 
 Full Terms: https://soulxregalia.wordpress.com/terms-of-use/
----------------------------------------------------------------------
SUPPORT:
----------------------------------------------------------------------
For support purposes, please visit my site:
https://soulxregalia.wordpress.com/
----------------------------------------------------------------------
*/
var Soulpour777 = Soulpour777 || {};
Soulpour777.BloodMage = {};
Soulpour777.BloodMage.tagAction = /<\s*bloodmage\s*>/im;

Game_BattlerBase.prototype.paySkillCost = function(skill) {
   this._tp -= this.skillTpCost(skill);
    if (this instanceof Game_Actor && this.currentClass().note.match(Soulpour777.BloodMage.tagAction)) {
        this._hp -= this.skillMpCost(skill);
    } else {
        this._mp -= this.skillMpCost(skill);
    }
   
};

Game_BattlerBase.prototype.canPayBloodSkillCost = function(skill) {
    return this._hp >= this.skillMpCost(skill);
};

Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    return (this.meetsUsableItemConditions(skill) &&
            this.isSkillWtypeOk(skill) && this.canPaySkillCost(skill) &&
            !this.isSkillSealed(skill.id) && !this.isSkillTypeSealed(skill.stypeId)) || this.canPayBloodSkillCost(skill);
};