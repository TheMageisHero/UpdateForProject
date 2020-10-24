/*:
-------------------------------------------------------------------------
@title Pre-Title Events
@author Hime
@date Nov 5, 2015
-------------------------------------------------------------------------
@plugindesc Build your own sequence of events that should occur before
the title screen begins

@param Pre-Title Map ID
@desc Which map to show for pre-title processing
@default 1

@help 
-------------------------------------------------------------------------
== Description ==

RPG Maker MV gives you a nice title screen, but it doesn't give you much
control over what should happen before the game goes to the title
screen.

For example, you might want to show some splash screens, or perhaps
an introductory video.

With this plugin, you can easily put together what should happen before
the title screen using events that you are already familiar with.

Because it is an event, you can do basically anything you want!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 5, 2015 -  initial release

== Usage == 

Start by creating a new map where you will be creating your pre-title
event.

Next, go to the plugin manager, double-click on my plugin entry, and
then set the "Pre-Title Map ID" value to the ID of your map.

Note that the pre-title event doesn't automatically go to the title
screen when your event is finished. This is to provide you with full
control over how the event will behave.

If you would like to go to the title screen afterwards, you can make
the following script call:

   SceneManager.goto(Scene_Title)

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {};
var TH = TH || {};
Imported.PreTitleEvents = 1;
TH.PreTitleEvents = TH.PreTitleEvents || {};

(function ($) {

  $.Parameters = PluginManager.parameters('PreTitleEvents');
  $.MapID = Math.floor($.Parameters['Pre-Title Map ID']) || 1;
  $.showPreTitle = true;

  /* My plugin basically takes over unless it's a test function */
  var TH_PreTitleEvents_SceneBoot_Start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if ($.showPreTitle && !DataManager.isBattleTest() && !DataManager.isEventTest()) {
      this.checkPlayerLocation();
      DataManager.setupNewGame();    
      $gamePlayer.reserveTransfer($.MapID, 0, 0);
      SceneManager.push(Scene_Map);
      this.updateDocumentTitle();    
      $.showPreTitle = false;
    }
    else {
      TH_PreTitleEvents_SceneBoot_Start.call(this);
    }    
  };  
})(TH.PreTitleEvents);