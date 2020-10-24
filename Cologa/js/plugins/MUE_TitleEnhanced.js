/*:
@plugindesc |V1.8.0.0| This allows you to customize your title screen a little more
@author MutationIndustries(MuteDay)

@param --Command Window--

@param Exit Game Show
@desc This tells the game weither or not to add the exit Command(default true)
@default true

@param Exit Game Text
@desc The text that is shown for the Exit Game Command
@default Exit

@param Command X Eval
@default (Graphics.boxWidth-this.width)/2;
@desc Use this to adjust the X position of the title command window

@param Command Y Eval
@default Graphics.boxHeight-this.height-96;
@desc Use this to adjust the Y position of the title command window

@param Command Layout
@desc Use this to change the way things are drawn (availible Vert and Hori)
@default Vert

@param Command Win Opac
@desc This adjusts the opacity of the background of the Versioning Window(-1 = use default)
@default -1

@param Command Back Opac
@desc Set this to 0-255 to set the opacity of the Ver Window Background (-1= use default)
@default -1

@param Command Font Size
@desc Set this to what you want the font size to be of the version window(-1 = use default)
@default -1

@param Command Max Columns
@desc This allows you to modify the amount of colums that are shown 
@default 4 

@param --Version Window--

@param Enable Version
@desc This allows you to show what version your game is currently running
@default false

@param Version Text
@desc This tells the game what to draw when the Version Window is Enabled
@default V1.0

@param Version Prefix
@desc this is used to draw icons and so forth
@default  

@param Version Suffix
@desc this is used to add things using the commands 
@default  

@param Version Width
@desc This allows you to modify how wide you wish the version window to be
@default this.textWidth(MUE.TitleEX.VerText)+10;

@param Version Opac
@desc This adjusts the opacity of the background of the Versioning Window(-1 = use default)
@default -1

@param Version Back Opac
@desc Set this to 0-255 to set the opacity of the Ver Window Background(-1= use default)
@default -1

@param Version Font Size
@desc Set this to what you want the font size to be of the version window(-1 = use default)
@default -1

@param Version Height
@desc Setting this allows you to change the height of the Version Window
@default this.fittingHeight(1);

@param Version X Eval
@desc Setting this allows for custom placement of the Version window on x axis
@default 0

@param Version Y Eval
@desc Setting this allows for custom placement of the Version window on x axis
@default 0

@param --Title Image & Text--

@param Title Text
@desc This tells the game what to draw, type None to disable text set to Null to use default
@default Null

@param Title Image Name
@desc Set to Null to disable, otherwise use filename without extention to file in your img/picture folder
@default Null

@param Title Image 2
@desc Set to Null to disable, otherwise use filename without extention to file in your img/picture folder
@default Null

@param Title Image Hue
@desc This allows you to update the game to change the Hue of the image you use
@default 0

@param Title Image Hue 2
@desc This allows you to update the game to change the Hue of the image you use
@default 0

@param Title Font Size
@desc allows you to adjust the games title screen font size
@default 72

@param Title Outline Width
@desc Allows for custom width on the outline of the title
@default 8

@param Title X Eval
@desc Allows you to tell game where to place the title on the x Axis
@default 20

@param Title Y Eval
@desc Allows you to place the title at a different y axis
@default Graphics.height/4

@param Title MaxWidth Eval
@desc allows you to choose custom width for game title 
@default Graphics.width-x*2


@param --Other Options--

@param Skin Only
@desc this tells the game not to use the games Window Tint(which can be quite Ugly
@default false

@param Version Skin only
@desc Tells the plugin to only use window skin for the version window
@default false

@param Command Skin only
@desc tells the plugin to use a custom skin inside your img/system folder
@default false

@param Custom Skin
@desc Changing this will allow you to change the custom window background(put false to disable)
@default false

@param Custom Version Skin
@desc Changing this will allow you to change version windows Skin, Overrides Custom Skin
@default false

@param Custom Command Skin
@desc Changing this will allow you to change Command Window SKin(false to disable, overrides Custom Skin)
default false



@param --Command Text Options--

@param Options Prefix
@desc used with any type of command that can be used with the message system
@default 

@param Options Suffix
@desc used with any type of command that can be used with the message system
@default 

@param New Game Prefix
@desc used with any type of command that can be used with the message system
@default 

@param New Game Suffix
@desc used with any type of command that can be used with the message system
@default 

@param Continue Prefix
@desc used with any type of command that can be used with the message system
@default 

@param Continue Suffix
@desc used with any type of command that can be used with the message system
@default 

@param Exit Prefix
@desc used with any type of command that can be used with the message system
@default 

@param Exit Suffix
@desc used with any type of command that can be used with the message system
@default 

@help
------------------------------------------------------------------------
youtube Video
------------------------------------------------------------------------
https://www.youtube.com/watch?v=whvR1r-VzPE
========================================================================
Important
========================================================================
Always check the Website Changelog mutationengine.altervista.org/changelog.html 
For updates

========================================================================
Info
========================================================================
This plugin allows you to edit the default game title screen, everything
from layout to font size to modifing the games title size and position
this does not reinvint the world to quote Echo607 from youtube, who did
a video on the old version of this plugin, a few things have changed 
sence then

========================================================================
Required Plugins
========================================================================
----------------------
Layout
----------------------
Plugin Name +Link
Reason it is Required
----------------------
-NONE-

========================================================================
Optinal Plugins
========================================================================
----------------------
Layout
----------------------
Plugin Name +Link
Features added
----------------------
MUE_GraphicsAdvanced: http://mutationengine.altervista.org/graphicsadvanced.html
Adds more features to this plugin

========================================================================
Plugin Params
========================================================================
----------------------
Layout
----------------------
Param Name
Default
Description
Note ID
----------------------
--Command Window--
Exit Game Show
true
This tells the game weither or not to add the exit Command
-

Exit Game Text
Exit
The text that is shown for the Exit Game Command
-

Command X Eval
(Graphics.boxWidth-this.width)/2;
Use this to adjust the X position of the title command window
-

Command Y Eval
Graphics.boxHeight-this.height-96;
Use this to adjust the Y position of the title command window
-

Command Layout
Vert
Use this to change the way things are drawn (availible Vert and Hori)
-

Command Win Opac
-1
This adjusts the opacity of the background of the Versioning Window(-1 = use default)
1

Command Back Opac
-1
Set this to 0-255 to set the opacity of the Ver Window Background(-1= use default)
1

Command Font Size
-1
Set this to what you want the font size to be of the version window(-1 = use default)
1

--Version Window--
Enable Version
true
This allows you to show what version your game is currently running
-

Version Text
V1.0
This tells the game what to draw when the Version Window is Enabled
-

Version Prefix

Used with any type of command that can be used with the message system
2

Version Suffix

used with any type of command that can be used with the message system
2

Version Width
this.textWidth(MUE.TitleEX.VerText)+10;
This allows you to modify how wide you wish the version window to be
-

Version Opac
-1
This adjusts the opacity of the background of the Versioning Window(-1 = use default)
1

Version Back Opac
-1
Set this to 0-255 to set the opacity of the Ver Window Background(-1= use default)
1

Version Font Size
-1
Set this to what you want the font size to be of the version window(-1 = use default)
1

Version Height
this.fittingHeight(1);
Setting this allows you to change the height of the Version Window 
-

Version X Eval
0
Setting this allows for custom placement of the Version window on x axis
-

Version Y Eval
0
Setting this allows for custom placement of the Version window on y axis
-

--Title Image And Text--
Title Text
Null
This tells the game what to draw, type None to disable text set to Null to use default
-

Title Image Name
Null
Set to Null to disable, otherwise use filename without extention to file in your img/picture folder
-

Title Image Name 2
Null
Set to Null to disable, otherwise use filename without extention to file in your img/picture folder
-

Title Image Hue
0
This allows you to update the game to change the Hue of the image you use
3

Title Image Hue
0
This allows you to update the game to change the Hue of the image you use
3

Title Font Size
72
allows you to adjust the games title screen font size
-

Title Outline Width
8
Allows for custom width on the outline of the title
-

Title MaxWidth Eval
Graphics.width-x*2
allows you to choose custom width for game title 
-

Title Y Eval
Graphics.height/4
Allows you to place the title at a different y axis
-

Title X Eval
20
Allows you to tell game where to place the title on the x Axis
-

--Other Options--
Skin Only
false
this tells the game not to use the games Window Tint
-

Version Skin only
false
Tells the plugin to only use window skin for the version window
-

Command Skin only
false
tells the plugin to only use window skin for the Title Command Page
-

Custom Skin
false
Changing this will allow you to change the custom window background(put false to disable)
-

Custom Version Skin
false
Changing this will allow you to change version windows Skin, Overrides Custom Skin
-

Custom Command Skin
false
Changing this will allow you to change Command Window SKin
(false to disable, overrides Custom Skin)
-

--Command Text Options--
Options Prefix

used with any type of command that can be used with the message system
2

Options Suffix

used with any type of command that can be used with the message system
2

New Game Prefix

used with any type of command that can be used with the message system
2

New Game Suffix

used with any type of command that can be used with the message system
2

Continue Prefix

used with any type of command that can be used with the message system
2

Continue Suffix

used with any type of command that can be used with the message system
2

Exit Prefix

used with any type of command that can be used with the message system
2

Exit Suffix

used with any type of command that can be used with the message system
2

------------------------------------------------------------------------
Plugin Param Notes
------------------------------------------------------------------------
1:
(-1 = use default)

2:
Use the message codes, although some will not look right

3:
Now works on the default title background images

========================================================================
Updates History
========================================================================
V1.8.0.0
-Normalized Website
-Normalized Help Page
-Normalized Params
-Security update for Browsers
-Normalized VersionID

V1.7:
Fixed it so if a command isnt availiable it is not drawn

V1.6:
Fixed a Error in the code 

V1.5:
Added Fixes to the code to prevent errors if your not showing version window
Added new function for adding commands which will increase the game's ability 
to make sure commands can be put in certian places

V1.4:
Updated for second Image and Hue
Updated for Version Height,X and Y Evals
Updated For custom Skins

V1.3:
Updated to allow for more features
Renamed the plugin Options for better look and feel
(if your upgrading please make not of your settings very few will be kept)

V1.2: 
Updated Help File
Updated to Include few more customization Options

V1.1: 
Updated to give a exit command
updated to give a special feature without overriding any functions

V1.0: 
Initial Release

========================================================================
Note Tag Data
========================================================================
-NONE-
------------------------------------------------------------------------
NoteTag Data Notes
------------------------------------------------------------------------
When using the note tags always surround with a opening < bracket
then the note tag
then the closing >

========================================================================
Plugin Commands
========================================================================
----------------------
Layout
----------------------
Plugin Command
Variables will be surrounded
By | |'s replace the all 
|+variable+| with your varaible
----------------------
-NONE-

========================================================================
Script Calls
========================================================================
----------------------
Layout
----------------------
Script Call
Variables will be surrounded
By | |'s replace the all 
|+variable+| with your varaible
----------------------
-NONE For Non Scripters-

========================================================================
Extra Data
========================================================================
So for this plugin i decided to go an extra step and enable special 
features such as

if  you wish your plugin to add a new command to the Title Command page 
simply add a statement at the bottom of your plugin

you can also use the statement (if (Imported.MUE_TitleEnhanced)) 
that way it only runs that code if this is running on peoples games 
your script is being used on

!NOTE: all the values need to be in "" because they are all evaluated 
at run time :)

MUE.TitleEX.AddNewCommand(symbol,bind,text,maineval)

replace symbol with the symbol you wish to use, if it already contains
 that symbol it will be ignored IE: "options"
replace 'bind' with the binds you wish to use IE: 
"this.commandOptions.bind(this)"
replace text with the text you wish the game to show via your command
if you do not need to use an eval you can leave maineval alone and only 
put 3 parts or you can put "" and it will ignore it

then to add custom Abilities to the text simply call 
MUE.TitleEX.SetPreAndSuf(symbol,prefix,Suffix)

replace symbol with what symbol you wish
replace prefix and Suffix with the message codes you wish to use 
(Be warned not all of them will work or be all the good in truth, ones 
that work right and have been tested are the color codes

so what does this do, well what it does is when you add a command 
via the perious function it then when the title scene is loaded it 
evaluates that code then adds all the proper commands at creation 

What does this do? 
well it makes it so when you add a command you do not have to 
keep overriding or aliasing the two functions that are used for 
adding commands to the title which should help increasing game speed :)

========================================================================
ScreenShots
========================================================================

========================================================================
Important Links and Notes
========================================================================
Patreon: https://www.patreon.com/MutationIndustries?ty=h

Notes: If you like any of the mutation engine plugins
consider supporting me, your support will allow me to
 build you more of what you want

========================================================================
Credits and Inportant info
========================================================================
Credits:
Myself
The rpg maker team for creating mv


Info:
Feel free to use this for any type of project some limits apply
1) Do not claim the work as your own
2) Do not post anywhere without my constent
3) Do not Make edits and then post anywhere
========================================================================
*/

//#region Namespace and imported
var Imported=Imported||{};
var MUE=MUE||{};
MUE.TitleEX=MUE.TitleEX||{};
Imported.MUE_TitleEnhanced=true;
//#endregion
(function($){
    //#region Varaibles
    var param=PluginManager.parameters('MUE_TitleEnhanced');
    //#region version var
    $.ShowVerWin=eval(param['Enable Version']||"false");
    $.VerText=String(param['Version Text']||"V1.0");
    $.VerWinEval=String(param['Version Width']||"this.textWidth($.VerText)+10;");
    $.VerWinOpac=Number(param['Version Opac']||-1);
    $.VerWinPrefix=String(param['Version Prefix']||"");
    $.VerWinSuffix=String(param['Version Suffix']||"");
    $.VerWinFontSize=Number(param['Version Font Size']||-1);
    $.VerWinConOpac=Number(param['Version Back Opac']||-1);
    $.VerWinX=String(param['Version X Eval']||"0");
    $.VerWinY=String(param['Version Y Eval']||"0");
    $.VerWinHeight=String(param['Version Height']||"this.fittingHeight(1);");
    //#endregion

    //#region title image and text
    $.TitleText=String(param['Title Text']||"Null");
    $.TitleSize=Number(param['Title Font Size']||72);
    $.TitleX=String(param['Title X Eval']||"20");
    $.TitleY=String(param['Title Y Eval']||"Graphics.height/4");
    $.TitleMaxWidth=String(param['Title MaxWidth Eval']||"Graphics.width-x*2");
    $.TitleOulineSize=Number(param['Title Outline Width']||"8");
    $.TitleBackgroundImage=String(param['Title Image Name']||"Null");
    $.TitleBackgroundImage2=String(param['Title Image 2']||"Null");
    $.TitleBackGroundHue=Number(param['Title Image Hue']||0);
    $.TitleBackGroundHue2=Number(param['Title Image Hue 2']||0);
    $.TitleCommandExit=String(param['Exit Game Text']||"Exit");
    $.TitleCommandShow=eval(param['Exit Game Show']||"true");
    $.TitleCommandLayout=String(param['Command Layout']||"Vert");
    $.TicWinOpac=Number(param['Command Win Opac']||-1);
    $.TicWinConOpac=Number(param['Command Back Opac']||-1);
    $.TicWinFontSize=Number(param['Command Font Size']||-1);
    $.TicMaxColums=Number(param['Command Max Columns']||4);
    $.TitleCommandX=String(param['Command X Eval']||"(Graphics.boxWidth-this.width)/2;");
    $.TitleCommandY=String(param['Command Y Eval']||"Graphics.boxHeight-this.height-96;");
    //#endregion

    //#region Skin and Tone
    $.UseWinSkinOnly=eval(param['Skin Only']||"false");
    $.TCmdWinSkinOnly=eval(param['Command Skin Only']||"false");
    $.VerWinSkinOnly=eval(param['Version Skin only']||"false");
    $.CustomSkin=String(param['Custom Skin']||"false");
    $.CustomSkinVer=String(param['Custom Version Skin']||"false");
    $.CustomSkinCom=String(param['Custom Command Skin']||"false");
    //#endregion

    //#region Commands
    $.Commands=$.Commands||{};
    $.Commands.Optionspre=param['Options Prefix']||"";
    $.Commands.Optionssuf=param['Options Suffix']||"";
    $.Commands.NewGamepre=param['New Game Prefix']||"";
    $.Commands.NewGamesuf=param['New Game Suffix']||"";
    $.Commands.Continuepre=param['Continue Prefix']||"";
    $.Commands.Continuesuf=param['Continue Suffix']||"";
    $.Commands.Exitpre=param['Exit Prefix']||"";
    $.Commands.Exitsuf=param['Exit Suffix']||"";
    param=null;
    //#endregion

    //#endregion

    //#region Namspace functions
    $.TitleCommands=[];
    $.SetCommands=function() {
        if(!$.CommandsSet) {
            $.TitleCommands.push({ symbol: 'newGame',Binds: "this.commandNewGame.bind(this)",Text: "TextManager.newGame",MainEval: "",prefix: $.Commands.NewGamepre,Suffix: $.Commands.NewGamesuf });
            $.TitleCommands.push({ symbol: 'continue',Binds: "this.commandContinue.bind(this)",Text: "TextManager.continue_",MainEval: "this.isContinueEnabled()",prefix: $.Commands.Continuepre,Suffix: $.Commands.Continuesuf });
            $.TitleCommands.push({ symbol: 'options',Binds: "this.commandOptions.bind(this)",Text: "TextManager.options",MainEval: "",prefix: $.Commands.Optionspre,Suffix: $.Commands.Optionssuf });
        }
        $.CommandsSet=true;
    }
    $.getTextFromSymbol=function(symbol) {
        for(var x=0;x<$.TitleCommands.length;x++) {
            x2=$.TitleCommands[Number(x)];
            if(x2.symbol==symbol) {
                return eval(x2.Text);
            }
        }
        return "";
    }
    $.AddNewCommand=function(symbol,bind,text,maineval) {
        for(var x=0;x<$.TitleCommands.length;x++) {
            x2=$.TitleCommands[Number(x)];

            if(x2.symbol==symbol) {
                console.log("The Symbol "+symbol+"is already added please Choose another symbol");
                return;
            }
        }
        if(!maineval||maineval=="") {
            $.TitleCommands.push({ symbol: symbol,Binds: bind,Text: text,MainEval: "" });
        }
        else
            $.TitleCommands.push({ symbol: symbol,Binds: bind,Text: text,MainEval: maineval });
    }
    $.SetPreAndSuf=function(symbol,prefix,Suffix) {
        for(var x=0;x<$.TitleCommands.length;x++) {
            x2=$.TitleCommands[Number(x)];
            if(x2.symbol==symbol) {
                x2.prefix=prefix;
                x2.Suffix=Suffix;
            }
        }
    };
    $.AddAtSpot=function(symbol,bind,text,spot,maineval) {
        for(var x=0;x<$.TitleCommands.length;x++) {
            x2=$.TitleCommands[Number(x)];
            if(x2.symbol==symbol) {
                console.log("The Symbol "+symbol+"is already added please Choose another symbol");
                return;
            }
        }
        if (spot==-1){
            spot=$.TitleCommands.length-1;
        }
        if(!maineval||maineval=="") {
            $.TitleCommands.splice(spot,0, {symbol: symbol,Binds: bind,Text: text,MainEval: "" });
        }
        else
            $.TitleCommands.splice(spot,0, {symbol: symbol,Binds: bind,Text: text,MainEval: maineval });
    };
    //#endregion

    //#region Scene_Title
    Scene_Title.prototype.create=function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createForeground();
        this.createWindowLayer();
        this.createCommandWindow();
        if($.ShowVerWin)
            this.createVersionWindow();

    };

    Scene_Title.prototype.createVersionWindow=function() {
        this._verWindow=new Window_Version(0,0);
        if($.VerWinConOpac>-1)
            this._verWindow.backOpacity=$.VerWinConOpac;
        if($.VerWinFontSize>-1) {
            this._verWindow.fontSize=$.VerWinFontSize;
        }
        this._verWindow.width=this._verWindow.RunWidthEval();
        this.addWindow(this._verWindow);
    };

    Scene_Title.prototype.createForeground=function() {
        this._gameTitleSprite=new Sprite(new Bitmap(Graphics.width,Graphics.height));
        this.addChild(this._gameTitleSprite);
        if($.TitleText=="None") return;
        if($dataSystem.optDrawTitle) {
            this.drawGameTitle();
        }
    };

    Scene_Title.prototype.drawGameTitle=function() {
        var x=Number(eval($.TitleX));
        var y=Number(eval($.TitleY));
        var maxWidth=Number(eval($.TitleMaxWidth));
        if($.TitleText=="Null") {
            var text=$dataSystem.gameTitle;
        }
        else {
            var text=$.TitleText;
        }
        this._gameTitleSprite.bitmap.outlineColor='black';
        this._gameTitleSprite.bitmap.outlineWidth=$.TitleOutlineSize;
        this._gameTitleSprite.bitmap.fontSize=$.TitleSize;
        this._gameTitleSprite.bitmap.drawText(text,x,y,maxWidth,48,'center');
    };

    Scene_Title.prototype.update=function() {
        if(!this.isBusy()) {
            this._commandWindow.refresh();
            this._commandWindow.open();
            if($.ShowVerWin)
                this._verWindow.refresh();
        }
        Scene_Base.prototype.update.call(this);

    };

    Scene_Title.prototype.commandNewGame=function() {
        DataManager.setupNewGame();
        this._commandWindow.close();
        if($.ShowVerWin)
            this._verWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
    };

    Scene_Title.prototype.commandContinue=function() {
        this._commandWindow.close();
        if($.ShowVerWin)
            this._verWindow.close();
        SceneManager.push(Scene_Load);
    };

    Scene_Title.prototype.commandOptions=function() {
        this._commandWindow.close();
        if($.ShowVerWin)
            this._verWindow.close();
        SceneManager.push(Scene_Options);
    };
    Scene_Title.prototype.createBackground=function() {
        if($.TitleBackgroundImage=="Null") {
            this._backSprite1=new Sprite(ImageManager.loadTitle1($dataSystem.title1Name,$.TitleBackGroundHue));
            this._backSprite2=new Sprite(ImageManager.loadTitle2($dataSystem.title2Name,$.TitleBackGroundHue2));
            this.addChild(this._backSprite1);
            this.addChild(this._backSprite2);
        }
        else {
            this._backSprite1=new Sprite(ImageManager.loadPicture($.TitleBackgroundImage,$.TitleBackGroundHue));
            if($.TitleBackgroundImage2!="Null")
                this._backSprite2=new Sprite(ImageManager.loadPicture($.TitleBackgroundImage2,$.TitleBackGroundHue2));
            else
                this._backSprite2=new Sprite(ImageManager.loadPicture(""));
            this.addChild(this._backSprite1);
            this.addChild(this._backSprite2);
        }

    };
    Scene_Title.prototype.commandExitGame=function() {
        //closes the window
        this._commandWindow.close();
        if($.ShowVerWin)
            this._verWindow.close();
        //fades everything out
        this.fadeOutAll();
        //tells game to close
        SceneManager.exit();
    };
    Scene_Title.prototype.createCommandWindow=function() {
        //creates the title command window
        this._commandWindow=new Window_TitleCommand();
        //creates the options handler
        for(var x=0;x<$.TitleCommands.length;x++) {
            x2=$.TitleCommands[Number(x)];
            eval("this._commandWindow.setHandler('"+x2.symbol+"',"+x2.Binds+")");
        }
        if($.CustomSkin.toLocaleLowerCase()!="false")
            this._commandWindow.windowskin=ImageManager.loadSystem($.CustomSkin);
        if($.CustomSkinCom.toLocaleLowerCase()!="false")
            this._commandWindow.windowskin=ImageManager.loadSystem($.CustomSkinCom);
        //adds the window
        this.addWindow(this._commandWindow);

    };
    //#endregion

    //#region Title_Command Window
    if($.TitleCommandLayout.toLocaleLowerCase()=="vert") {
        //updates the command windows x and y based on plugin options
        Window_TitleCommand.prototype.updatePlacement=function() {
            this.x=eval($.TitleCommandX);
            this.y=eval($.TitleCommandY);
            if($.TicWinOpac>-1)
                this.opacity=$.TicWinOpac;
            if($.TicWinConOpac>-1)
                this.backOpacity=$.TicWinConOpac;
        };
        //this generates the text and the symbol if the command is visible
        Window_TitleCommand.prototype.makeCommandList=function() {
            //generate commands from list
            for(var x=0;x<$.TitleCommands.length;x++) {
                x2=$.TitleCommands[Number(x)];
                var temp=x2.prefix;
                temp+=eval(x2.Text);
                temp+=x2.Suffix;
                if(x2.MainEval=="")
                    this.addCommand(temp,x2.symbol);
                else
                    if (eval(x2.MainEval))
                        this.addCommand(temp,x2.symbol,eval(x2.MainEval));
            }
        };
        //tells the game to update tone
        Window_TitleCommand.prototype.updateTone=function() {
            //if plugin is told to not show tone it wont else it updates tone
            if(!$.UseWinSkinOnly) {
                if(!$.TCmdWinSkinOnly) {
                    Window_Base.prototype.updateTone.call(this);
                }
            }
        };
    }
    else {
        Window_TitleCommand.prototype=Object.create(Window_HorzCommand.prototype);
        Window_TitleCommand.prototype.constructor=Window_TitleCommand;
        Window_TitleCommand.prototype.initialize=function() {
            Window_HorzCommand.prototype.initialize.call(this,0,0);
            this.updatePlacement();
            this.openness=0;
            this.selectLast();
        };
        Window_TitleCommand.prototype.windowWidth=function() {
            return Graphics.boxWidth;
        };
        Window_TitleCommand.prototype.numVisibleRows=function() {
            return Math.ceil($.TitleCommands.length/this.maxCols());
        };

        Window_TitleCommand.prototype.maxCols=function() {
            return $.TicMaxColums;
        };
        Window_TitleCommand.prototype.isContinueEnabled=function() {
            return DataManager.isAnySavefileExists();
        };

        Window_TitleCommand.prototype.selectLast=function() {
            if(Window_TitleCommand._lastCommandSymbol) {
                this.selectSymbol(Window_TitleCommand._lastCommandSymbol);
            } else if(this.isContinueEnabled()) {
                this.selectSymbol('continue');
            }
        };
        //updates the command windows x and y based on plugin options
        Window_TitleCommand.prototype.updatePlacement=function() {
            this.x=eval($.TitleCommandX);
            this.y=eval($.TitleCommandY);
            if($.TicWinOpac>-1)
                this.opacity=$.TicWinOpac;
            if($.TicWinConOpac>-1)
                this.backOpacity=$.TicWinConOpac;
            this.refresh();
        };
        Window_TitleCommand.prototype.makeCommandList=function() {
            //generate commands from list
            for(var x=0;x<$.TitleCommands.length;x++) {
                x2=$.TitleCommands[Number(x)];
                var temp=x2.prefix;
                temp+=eval(x2.Text);
                temp+=x2.Suffix;
                if(x2.MainEval=="")
                    this.addCommand(temp,x2.symbol);
                else
                    if(eval(x2.MainEval))
                        this.addCommand(temp,x2.symbol,eval(x2.MainEval));
            }
        };
        //tells the game to update tone
        Window_TitleCommand.prototype.updateTone=function() {
            //if plugin is told to not show tone it wont else it updates tone
            if(!$.UseWinSkinOnly) {
                if(!$.TCmdWinSkinOnly) {
                    Window_Base.prototype.updateTone.call(this);
                }
            }
        };
    };
    Window_TitleCommand.prototype.standardFontSize=function() {
        //if the font size is less the -1 set font else return base (for use with yanfly's)
        if($.TicWinFontSize>-1)
            return $.TicWinFontSize;
        else
            return Window_Base.prototype.standardFontSize.call(this);
    };
    Window_TitleCommand.prototype.drawItem=function(index) {
        if(!this.isCommandEnabled(index)) {
            return;
        }
        var rect=this.itemRectForText(index);
        var temp=this.commandSymbol(index);
        var temp=$.getTextFromSymbol(temp);
        var rectoffset=Math.floor(this.textWidth(temp));
        var rectoffsety=Math.floor((this.contents.fontSize+8)/2);
        var rectYFinal=Math.floor(rect.y+(rect.height/2-rectoffsety));
        var rectXFinal=Math.floor(rect.x+(rect.width/2-rectoffset/2));
        if(Imported.MUE_GraphicsEX) {
            rectXFinal-=(MUE.GraphicsEX.CalcTextOffset(this.commandName(index),this));
        }
        if(Imported.MUEDRAW)
            this.drawTextEx2(this.commandName(index),rectXFinal,rectYFinal,'center');
        else
            this.drawTextEx(this.commandName(index),rectXFinal,rectYFinal);
    };
    //#endregion

    //#region Window Version

    //Tells game how to create this object
    function Window_Version() {
        //initializes the window
        this.initialize.apply(this,arguments);
    }
    //Sets the game on what the base functions are
    Window_Version.prototype=Object.create(Window_Base.prototype);
    //Sets the game on what the constructor of the object is
    Window_Version.prototype.constructor=Window_Version;

    //Tells the game what to do when it is created
    Window_Version.prototype.initialize=function(x,y) {
        //sets var to hold the windows width
        var width=this.windowWidth();
        //sets a var as to the height
        var height=this.windowHeight();
        // Initializes the base object with the data given
        Window_Base.prototype.initialize.call(this,x,y,width,height);
        //updates the game with the version windows opacity
        if($.VerWinOpac>=0)
            this.opacity=$.VerWinOpac;
        if($.CustomSkin.toLocaleLowerCase()!="false")
            this.windowskin=ImageManager.loadSystem($.CustomSkin);
        if($.CustomSkinVer.toLocaleLowerCase()!="false")
            this.windowskin=ImageManager.loadSystem($.CustomSkinVer);
        //Refreshes the window
        this.refresh();
    };
    Window_Version.prototype.RunWidthEval=function() {
        //this sets the version window's width
        return Number(eval($.VerWinEval)||100);
    }
    //Tells the game what the window width is
    Window_Version.prototype.windowWidth=function() {

        return Graphics.boxWidth;
    };
    //tells the game the height of the window
    Window_Version.prototype.windowHeight=function() {
        //this is how many lines you currently have and makes height
        return Number(eval($.VerWinHeight));
    };
    //refreshes our window
    Window_Version.prototype.refresh=function() {
        this.x=Number(eval($.VerWinX));
        this.y=Number(eval($.VerWinY));
        this.createContents();
        //Clear the contents so it doesnt look retarded
        this.contents.clear();
        this.createContents();
        //Draws our version text
        if(Imported.MUEDRAW)
            this.drawTextEx2(this.value(),0,0,'left');
        else
            this.drawTextEx(this.value(),0,0);
    };
    //this returns our version text
    Window_Version.prototype.value=function() {
        //gets the text from our namespace
        return $.VerWinPrefix+$.VerText+$.VerWinSuffix;
    };
    //updates the game
    Window_Version.prototype.update=function() {
        // used to resize the Window
        this.createContents();
        // Used to refresh what is drawn
        this.refresh();
        //updates the base
        Window_Base.prototype.update.call(this);
    };
    Window_Version.prototype.standardFontSize=function() {
        if($.VerWinFontSize>-1)
            return $.VerWinFontSize;
        else
            return Window_Base.prototype.standardFontSize.call(this);
    };
    Window_Version.prototype.updateTone=function() {
        if(!$.UseWinSkinOnly) {
            if(!$.VerWinSkinOnly) {
                Window_Base.prototype.updateTone.call(this);
            }
        }
    };
    //#endregion

    //#region End of file Functions
    if(!$.CommandsSet) {
        $.SetCommands();
        if($.TitleCommandShow) {
            $.AddNewCommand("exitGame","this.commandExitGame.bind(this)","$.TitleCommandExit","");
            $.SetPreAndSuf("exitGame",$.Commands.Exitpre,$.Commands.Exitsuf);
        }
    }
    //#endregion
})(MUE.TitleEX)