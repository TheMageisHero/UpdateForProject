/*:
-------------------------------------------------------------------------
@title Menu Music
@author Hime
@date Nov 8, 2015
@url http://himeworks.com/2015/11/menu-music-mv/
-------------------------------------------------------------------------
@plugindesc Allows you to set custom BGM to play whenever the player
enters the menu.
@help 
-------------------------------------------------------------------------
== Description ==

Ever wanted to play some music when you open up the menu? For example,
on the map, you might have the regular map music playing, but then
when you go to the menu, you have a separate BGM specifically for
when players are going through the menu.

With this plugin, you can do that just that!

Not only can you choose what BGM to play, you can also change it
at anytime during the game with events.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 8, 2015 -  initial release

== Usage ==

By default, there is no menu music. To set a menu bgm, start by
creating a plugin command and write

set_menu_bgm

Followed by a "Play BGM" command, where you can select the BGM to play.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.MenuMusic = 1;
TH.MenuMusic = TH.MenuMusic || {};

(function ($) {
  
  /* When going back to the map, stop menu bgm and play map music.
   * Assumes you can't access menu from battle or other scenes.
   */
  $.replayMapBgm = function() {
    if (SceneManager.isNextScene(Scene_Map)) {
      AudioManager.stopBgm();
      $gameMap.autoplay();
    }
  }
  
  var TH_MenuMusic_GameSystem_initialize = Game_System.prototype.initialize
  Game_System.prototype.initialize = function() {
    TH_MenuMusic_GameSystem_initialize.call(this);
    this.initMenuMusic();
  };
  
  /* No music by default */
  Game_System.prototype.initMenuMusic = function() {
    this._menuBgm = {"name":"","pan":0,"pitch":100,"volume":80};
  };
  
  Game_System.prototype.menuBgm = function() {
    return this._menuBgm;
  }
  
  Game_System.prototype.setMenuBgm = function(bgm) {
    this._menuBgm = bgm;
  }
  
  /* Play our menu music when menu begins */
  var TH_MenuMusic_SceneMenu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function() {
    AudioManager.playBgm($gameSystem.menuBgm());
    TH_MenuMusic_SceneMenu_create.call(this);
  };
    
  var TH_MenuMusic_SceneMenu_terminate = Scene_Menu.prototype.terminate;
  Scene_Menu.prototype.terminate = function() {
    TH_MenuMusic_SceneMenu_terminate.call(this);
    $.replayMapBgm();    
  };
  
  var TH_MenuMusic_SceneItemBase_terminate = Scene_ItemBase.prototype.terminate;
  Scene_MenuBase.prototype.terminate = function() {
    TH_MenuMusic_SceneItemBase_terminate.call(this);
    $.replayMapBgm();
  };
  
  var TH_MenuMusic_GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    TH_MenuMusic_GameInterpreter_pluginCommand.call(this, command, args);
    if (command.toLowerCase() === "set_menu_bgm") {
      this._index++;
      var cmd = this.currentCommand();
      if (cmd.code == 241) {
        var params = cmd.parameters;
        $gameSystem.setMenuBgm(params[0]) 
      }
    }
  };
})(TH.MenuMusic);