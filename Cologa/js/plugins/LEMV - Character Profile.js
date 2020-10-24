// -----------------------------------------------------------
// Lenneth Engine for MV - Character Profile
// LEMV - Character Profile.js
// -----------------------------------------------------------

/*:
* @plugindesc v1.0 Creates an Actor Book or a Character Profile.
* @author Soulpour777
* @param -- MAIN CONTROL --
*
*@help

HOW TO ADD AN ACTOR'S DESCRIPTION:

To add a description to each of your actor, go to the Actor's 
Tab first. Then, on the note box, use the <profile:x> tag
in order to deliver the description you want. Make sure that
you don't use spaces between 'profile:' and your description.
For example:

<profile:Loki is the god of Mischief. He has a green weird
mask.>

CHARACTER PROFILE PLUGIN COMMANDS

To open your Character Profile, do this on a 
plugin command:
CharacterProfile open

To add a record on your profile manually, do this on 
a plugin command:
CharacterProfile add x

where x is the id of the actor you want to add.

To remove a record on your profile manually, do this 
on a plugin command:
CharacterProfile remove x

where x is the id of the actor you want to remove.

* @param PortraitXAxis
* @desc Character Profile Image X axis.
* @default 390
*
* @param PortraitYAxis
* @desc Character Profile Image Y Axis. Value: original y - given value.
* @default 3
* 
* @param BasicInfoMarginX
* @desc Horizontal margin for the basic information of the character.
* @default 30
*
* @param ProfileMarginX
* @desc Horizontal margin for the profile description of the character.
* @default 30
*
* @param ScrollingImageOpacity
* @desc Opacity / transparency value of the scrolling image on your scene.
* @default 30
*
* @param ScrollingImageXSpeed
* @desc Scrolling speed value of the scrolling image, horizontally, on your scene.
* @default 0.25
*
* @param WindowOpacity
* @desc Opacity / transparency value of the window on your scene.
* @default 0
*
* @param -- RESOURCE CONTROL --
*
* @param BackgroundImage
* @desc The background image you use when you're in the Character Profile Scene.
* @default Profile-Background
*
* @param FrameImage
* @desc The secondary image you use when you're in the Character Profile Scene.
* @default Profile-Frame
*
* @param FogImage
* @desc The scrolling image you use when you're in the Character Profile Scene.
* @default fog
*
*/

(function(){
    var Soulpour777 = Soulpour777 || {};
    Soulpour777.params = PluginManager.parameters('LEMV - Character Profile');
    Soulpour777.portrait_x_axis = Number(Soulpour777.params['PortraitXAxis'] || 390);
    Soulpour777.portrait_y_axis = Number(Soulpour777.params['PortraitYAxis'] || 3);
    Soulpour777.basicMarginXAxis = Number(Soulpour777.params['BasicInfoMarginX'] || 30);
    Soulpour777.profileMarginXAxis = Number(Soulpour777.params['ProfileMarginX'] || 30);
    
    Soulpour777.profileWindowOpacity = Number(Soulpour777.params['WindowOpacity'] || 0);
    
    Soulpour777.profileBackgroundImage = String(Soulpour777.params['BackgroundImage'] || "Profile-Background");
    Soulpour777.profileFrameImage = String(Soulpour777.params['FrameImage'] || "Profile-Frame");
    Soulpour777.profileScrollingImage = String(Soulpour777.params['FogImage'] || "fog");
    
    Soulpour777.profileScrollingImageOpacity = Number(Soulpour777.params['ScrollingImageOpacity'] || 35);
    Soulpour777.profileScrollingImageSpeedX = Number(Soulpour777.params['ScrollingImageXSpeed'] || 0.25);
    Soulpour777.profileScrollingImageSpeedY = Number(Soulpour777.params['ScrollingImageYSpeed'] || 0);
    
    ImageManager.loadProfile = function(filename, hue) {
        return this.loadBitmap('img/profiles/', filename, hue, true);
    };    
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (command === "CharacterProfile"){
            switch(args[0]){
                case 'open':
                    SceneManager.push(LMV_CharacterProfileScene);
                    break;
                case 'add':
                    $gameSystem.addToCharacterProfile(args[1]);
                    $gamePlayer.refresh();
                    break;
                case 'remove':
                    var spec = $gameSystem._characterOnProfile.indexOf(args[1]);
                    if (spec > -1) {
                        $gameSystem._characterOnProfile.splice(spec, 1);
                    }
                    break;
            }
        }
    };
    var sample_script_gameSystem = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        sample_script_gameSystem.call(this);
        this._characterOnProfile = [];
    };
 
    Game_System.prototype.addToCharacterProfile = function(actorID) {
        this._characterOnProfile.push(actorID);
    };
 
 
    Game_Party.prototype.addActor = function(actorId) {
        if (!this._actors.contains(actorId)) {
            this._actors.push(actorId);
            $gamePlayer.refresh();
            $gameMap.requestRefresh();
            $gameSystem.addToCharacterProfile(actorId);
        }
    };
 
    function LMV_CharacterProfileWindow() {
        this.initialize.apply(this, arguments);
    }
 
    LMV_CharacterProfileWindow.prototype = Object.create(Window_Selectable.prototype);
    LMV_CharacterProfileWindow.prototype.constructor = LMV_CharacterProfileWindow;
 
    LMV_CharacterProfileWindow.prototype.initialize = function() {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
        this.refresh();
        this.activate();
        this.setupPortrait();
    };
    
    LMV_CharacterProfileWindow.prototype.setupPortrait = function(){
        this._characterPortrait = new Sprite();
        this.addChildAt(this._characterPortrait,1);
    }
 
    LMV_CharacterProfileWindow.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = $gameActors.actor(actor);
            this.refresh();
        }
    };
 
    LMV_CharacterProfileWindow.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            var lineHeight = this.lineHeight();
            this.drawBasicInformationAndPortrait(lineHeight * 2);
            this.drawBlock3(lineHeight * 7);
        }
    };
 
 
    LMV_CharacterProfileWindow.prototype.drawBasicInformationAndPortrait = function(y) {
        this.drawActorPortrait(this._actor, Soulpour777.portrait_x_axis, y-Soulpour777.portrait_y_axis);
        this.drawBasicInfo(Soulpour777.basicMarginXAxis, y);
    };
 
    LMV_CharacterProfileWindow.prototype.drawActorPortrait = function(actorName, x, y){
        this._characterPortrait.bitmap = ImageManager.loadProfile(actorName.name());
        this._characterPortrait.x = x;
        this._characterPortrait.y = y;
    }
    
    LMV_CharacterProfileWindow.prototype.drawBlock3 = function(y) {
        this.drawProfile(Soulpour777.profileMarginXAxis, y);
    };
 
 
    LMV_CharacterProfileWindow.prototype.drawHorzLine = function(y) {
        var lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
    };
 
    LMV_CharacterProfileWindow.prototype.lineColor = function() {
        return this.normalColor();
    };
 
    LMV_CharacterProfileWindow.prototype.drawBasicInfo = function(x, y) {
        var lineHeight = this.lineHeight();
        this.drawActorName(this._actor, x, y);
        
        this.drawActorIcons(this._actor, x, y + lineHeight);
        this.drawActorHp(this._actor, x, y + lineHeight * 1);
        this.drawActorMp(this._actor, x, y + lineHeight * 2);
        this.drawActorLevel(this._actor, x, y + lineHeight * 3);
    };

 
    LMV_CharacterProfileWindow.prototype.drawExpInfo = function(x, y) {
        var lineHeight = this.lineHeight();
        var expTotal = TextManager.expTotal.format(TextManager.exp);
        var expNext = TextManager.expNext.format(TextManager.level);
        var value1 = this._actor.currentExp();
        var value2 = this._actor.nextRequiredExp();
        if (this._actor.isMaxLevel()) {
            value1 = '-------';
            value2 = '-------';
        }
        this.changeTextColor(this.systemColor());
        this.drawText(expTotal, x, y + lineHeight * 0, 270);
        this.drawText(expNext, x, y + lineHeight * 2, 270);
        this.resetTextColor();
        this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
        this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
    };
 
    LMV_CharacterProfileWindow.prototype.drawEquipments = function(x, y) {
        var equips = this._actor.equips();
        var count = Math.min(equips.length, this.maxEquipmentLines());
        for (var i = 0; i < count; i++) {
            this.drawItemName(equips[i], x, y + this.lineHeight() * i);
        }
    };
 
    LMV_CharacterProfileWindow.prototype.drawProfile = function(x, y) {
        this.drawTextEx($dataActors[this._actor.actorId()].meta.profile, x, y);
    };
 
 
    function LMV_CharacterProfileScene() {
        this.initialize.apply(this, arguments);
    }
 
    LMV_CharacterProfileScene.prototype = Object.create(Scene_MenuBase.prototype);
    LMV_CharacterProfileScene.prototype.constructor = LMV_CharacterProfileScene;
 
    LMV_CharacterProfileScene.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };
 
    LMV_CharacterProfileScene.prototype.create = function() {
        this._index = 0;
        Scene_MenuBase.prototype.create.call(this);
        this._statusWindow = new LMV_CharacterProfileWindow();
        this._statusWindow.opacity = Soulpour777.profileWindowOpacity;
        this._statusWindow.setHandler('cancel',   this.popScene.bind(this));
        this._statusWindow.setHandler('pagedown', this.nextIndex.bind(this));
        this._statusWindow.setHandler('pageup',   this.previousIndex.bind(this));
        this.addWindow(this._statusWindow);
        this.refreshActor();
    };
 
    LMV_CharacterProfileScene.prototype.update = function(){
        Scene_MenuBase.prototype.update.call(this);
        this._runningTile.origin.x += Soulpour777.profileScrollingImageSpeedX;
        this._runningTile.origin.y += Soulpour777.profileScrollingImageSpeedY;
        this._runningTile.opacity = Soulpour777.profileScrollingImageOpacity;
    }
    
    LMV_CharacterProfileScene.prototype.terminate = function(){
        Scene_MenuBase.prototype.terminate.call(this);
        this.removeSpriteReference();
    }
    
    
    LMV_CharacterProfileScene.prototype.removeSpriteReference = function(){
        //dispose referenced materials
        this.removeChild(this._backgroundSprite2);
        this.removeChild(this._runningTile);
    }
    
    LMV_CharacterProfileScene.prototype.createBackground = function(){
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadProfile(Soulpour777.profileBackgroundImage);
        this.addChild(this._backgroundSprite);
        this._runningTile = new TilingSprite();
        this._runningTile.move(0, 0, Graphics.width, Graphics.height);
        this._runningTile.bitmap = ImageManager.loadProfile(Soulpour777.profileScrollingImage);
        this.addChild(this._runningTile);        
        this._backgroundSprite2 = new Sprite();
        this._backgroundSprite2.bitmap = ImageManager.loadProfile(Soulpour777.profileFrameImage);
        this.addChild(this._backgroundSprite2);

    }
    
    LMV_CharacterProfileScene.prototype.refreshActor = function() {
        this._statusWindow.setActor($gameSystem._characterOnProfile[this._index]);
        this._statusWindow.activate();
    };
 
    LMV_CharacterProfileScene.prototype.nextIndex = function()
    {
        ++ this._index;
        console.log(this._index);
        if($gameSystem._characterOnProfile[this._index] === undefined || $gameSystem._characterOnProfile[this._index] === null) this._index = 0;
        console.log(this._index);
        this.refreshActor();
    }
 
    LMV_CharacterProfileScene.prototype.previousIndex = function()
    {
        -- this._index;
        if($gameSystem._characterOnProfile[this._index] === undefined || $gameSystem._characterOnProfile[this._index] === null) this._index = $gameSystem._characterOnProfile.length - 1;
        this.refreshActor();
    }
 
})();