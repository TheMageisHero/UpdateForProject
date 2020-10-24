//============================================================================
// EliMZ_NoteWeather.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc Manage your weather through map note tags!
@author Hakuen Studio | v1.0.1
@url https://www.patreon.com/join/hakuenstudio

@help 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

============================================================================
Introduction
============================================================================

    Making climate changes can be tiring when you have a game based on 
them. Every time you enter a house, having to remove the rain for example.
    So this plugin facilitates climate management on maps automatically 
through the notes of each map, making the process easier and free of bugs 
or forgetfulness.

============================================================================
Features
============================================================================

• Automatically add or remove weather in any map via note tags

============================================================================
How to use
============================================================================

● Put on the map note tag:
<Weather: type, power, duration>
• Type can be: rain | storm | snow (it's not case sensitive)
• Power can be: A number from 0 to 9(more than this, maybe can give you 
some wierd behaviours).
• Duration: Is a number(in frames)
• You can use \v[id] on power and duration.
    You can also set in the parameter if you want the plugin automatically
clear the weather when enter in another map that doens't have weather note 
tags.

============================================================================
Terms of Use
============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio
Itch Io - https://hakuenstudio.itch.io/

============================================================================
Update log
============================================================================
Version 1.0.1 - 10/16/2020
- Adapt to work with Eli Book 2.0.0
Version 1.0.0 - 09/12/2020
- Plugin release!

@param clearWeather
@text Clear weather
@type boolean
@desc Choose if you want to clear the weather in map that not contains any note weather.
@default true

*/

"use strict"

var Eli = Eli || {};
var Imported = Imported || {};

Imported.Eli_NoteWeather = true;
Eli.NoteWeather = Eli.NoteWeather || {};
Eli.NoteWeather.Param = eli.createPluginParameters() || {};

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

{

    const installWarning = `You must have installed the EliMZ_Book plugin. 
Please download it for free.`
    const updateWarning = `This plugin needs an updated version of EliMZ_Book.
Please download it for free.`

    function callEliBook(){
        window.open('https://hakuenstudio.itch.io/')
    };
    
    function needInstallBook() {
        if(!Eli.alert){

            if(window.confirm(installWarning)) callEliBook();
            Eli.alert = true;
        }
    };

    function needUpdateBook() {
        if(!Eli.alert){

            if(window.confirm(updateWarning)) callEliBook();
            Eli.alert = true;
        }
    };
    
    if(!Imported.Eli_Book) needInstallBook();
    if(Eli.Book.Version < ['2','0','0']) needUpdateBook();
     
}

/* ========================================================================== */
/*                                    SCENE                                   */
/* ========================================================================== */

{

const SceneMap = Scene_Map.prototype;

Eli.NoteWeather.Scene_Map_beforeStart = SceneMap.beforeStart;
SceneMap.beforeStart = function() {
    Eli.NoteWeather.Scene_Map_beforeStart.call(this);
    if(!DataManager.isEventTest()) this.setWeather();
};

SceneMap.setWeather = function(){
    if($dataMap.meta.Weather){
        const param = $dataMap.meta.Weather.split(",");
        const type = param[0].toLowerCase().trim();
        const power = +eli.convertEscapeVariablesOnly(param[1]);
        const duration = +eli.convertEscapeVariablesOnly(param[2]);
        $gameScreen.changeWeather(type, power, duration)
        AudioManager.playBgs("Rain1");
    } else if(Eli.NoteWeather.Param.clearWeather){
        $gameScreen.clearWeather();
    }
};

}