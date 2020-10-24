/*:
-------------------------------------------------------------------------
@title Enemy Levels
@author Hime --> HimeWorks (http://himeworks.com)
@date Nov 26, 2015
@filename HIME_EnemyLevels.js
@url http://himeworks.com/2015/11/enemy-levels-mv

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------
@plugindesc Gives enemies levels. Provides functions for managing enemy
levels.
@help 
-------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=s3iTo3nboSc

Do you want your enemies to have levels like actors?

You could use levels as a way to determine their difficulty level
compared to the actor's current level. For example, if your actor is
currently level 10 and the enemy is level 20, you might use a red font
to draw the enemy's name to indicate that it is dangerous.

Levels themselves do not mean much on their, for they are just a number.
They become more powerful once you use other plugins that make use of
them.

For example, a plugin that you can use is Enemy Classes, which allows
you to assign classes to enemies. Using both plugins, you can now set
up parameters curves based on the enemy's level, as well as the skills
they can use based on the level.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 26, 2015 - added support for accessing 'level' as a property
Nov 25, 2015 - Initial release
             

== Usage ==

Note-tag enemies with

  <enemy level: FORMULA />
  
Where the formula is any valid javascript formula that evaluates to a
number.

For example, you could write numbers

  <enemy level: 23 />
  
Or you could include the game variables, using the formula variable `v`:

  <enemy level: 5 + v[3] * 4 />
  
Which means the enemy's level is equal to 5 plus the value of
variable 3 multiplied by 4. This can be used to set up dynamic levels
based on things like difficulty.

-- Changing Levels --

If you would like to change levels, there are two ways to do it

1. Using plugin commands

For simple level management, you can use the following commands during
battle:

  set_enemy_level member MEMBER_ID to level LEVEL
  
Where the MEMBER_ID is the position of the enemy in the troop and the
LEVEL is the number of the new level. For example, to change the
second enemy in battle to level 10, you can write

  set_enemy_level member 2 to level 10
  
You can also add or substract levels, using this plugin command

  add_enemy_level LEVEL levels to member MEMDER_ID
  
If you specify a negative number, it will subtract the level.
For example, to add 5 levels to the third enemy, you would write

  add_enemy_level 5 levels to member 3
  
To remove 10 levels from that enemy, you would write

  add_enemy_level -10 levels to member 3  

2. Script calls

If you would like more advanced ways to control enemy levels, you can use
script calls directly. Say you wanted to modify the second enemy

First, access the enemy object. Remember that javascript indexing is 
zero-based, so the first enemy is at index 0.

  $gameTroop.members()[1]
  
Then you can use the following methods

  $gameTroop.members()[1].setLevel( NEW_LEVEL )
  $gameTroop.members()[1].addLevel( NEW_LEVEL )
  
Where the NEW_LEVEL is a javascript formula that evaluates to a number.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.EnemyLevels = 1;
TH.EnemyLevels = TH.EnemyLevels || {};

(function ($) {
  
  $.Regex = /<enemy[-_ ]level:\s*(.+?)\s*\/>/im

  $.getEnemyLevel = function(enemy) {
    if (enemy.level !== undefined) {
      return enemy.level;
    }
    enemy.level = 1;
    var res = $.Regex.exec(enemy.note);
    if (res) {
      var formula = res[1];
      enemy.level = $.evalEnemyLevel(formula);
      console.log(enemy.level)
    }
    return enemy.level;
  };
  
  $.evalEnemyLevel = function(formula) {
    var v = $gameVariables
    return new Function( "return (" + formula + ")")()
  };
  
  Object.defineProperty(Game_Enemy.prototype, 'level', {
    get: function() {
        return this._level;
    },
    configurable: true
  });

  
  var TH_EnemyLevels_GameEnemy_initMembers = Game_Enemy.prototype.initMembers;
  Game_Enemy.prototype.initMembers = function() {
    this._level = 0;
    TH_EnemyLevels_GameEnemy_initMembers.call(this);    
  };
  
  var TH_EnemyLevels_GameEnemy_setup = Game_Enemy.prototype.setup;
  Game_Enemy.prototype.setup = function(enemyId, x, y) {
    this._level = $.getEnemyLevel($dataEnemies[enemyId]);
    TH_EnemyLevels_GameEnemy_setup.call(this, enemyId, x, y);    
  };
  
  Game_Enemy.prototype.level = function() {
    return this._level;
  };
  
  Game_Enemy.prototype.maxLevel = function() {
    return 99;
  };
  
  Game_Enemy.prototype.minLevel = function() {
    return 1;
  };
  
  Game_Enemy.prototype.setLevel = function(num) {
    this._level = Math.min(Math.max(this.minLevel(), num), this.maxLevel());
  };
  
  Game_Enemy.prototype.addLevel = function(num) {
    this._level = Math.min(Math.max(this.minLevel(), this._level + num), this.maxLevel());
  };
  
  var TH_GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    var cmd = command.toLowerCase();
    if (cmd === "set_enemy_level") {
      var id = Math.floor(args[1]) - 1
      var level = Math.floor(args[4]);
      $gameTroop.members()[id].setLevel(level);
    }
    else if (cmd === "add_enemy_level") {
      var level = Math.floor(args[0]);
      var id = Math.floor(args[4]) - 1      
      $gameTroop.members()[id].addLevel(level);
    }
    else {
      TH_GameInterpreter_pluginCommand.call(this, command, args);
    }
  };
})(TH.EnemyLevels);