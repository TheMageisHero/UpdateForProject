//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.09] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB wait: Time Progress Battle (Wait)
 *     - -
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Outline Color:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @max 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @max 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @max 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @max 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"2","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindoheighteight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = ImageManager.faceHeight + padding * 2;\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - (height + inputWindoheighteight + 8)) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height + 8;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param BreakExperimental1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Experimental Parameters
 * @default Use at your own risk!!!
 *
 * @param BreakExperimental2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFromt(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game is started.
 * @default 0
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 0
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Outline Color
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2;\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x50ef=['FINAL','uszhd','_profileWindow','QrYrz','([\x5c+\x5c-]\x5cd+)([%％])>','Bitmap_strokeRect','MDF','ASTERISK','EditBgType','GElaH','makeCoreEngineCommandList','efPkf','InputBgType','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','key%1','_isButtonHidden','keyCode','_centerElement','MAT','KZEbv','TAB','onKeyDown','_digitGroupingEx','Key%1','CommandList','FMBvf','optSideView','IRmPm','prototype','BoxMargin','gold','clone','consumeItem','INOUTSINE','OtsCT','FaVKs','changeTextColor','blt','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','tLYEN','_editWindow','stringKeyMap','OPEN_BRACKET','areButtonsHidden','NUMPAD1','tab','Spriteset_Base_update','RTqrx','updatePositionCoreEngineShakeOriginal','Flat1','log','YozWg','Wait','terminate','Untitled','apply','missed','loadWindowskin','buttonAssistOffset%1','BackOpacity','buttonAssistKey5','isTpb','skipBranch','OUTBACK','IconSParam9','ColorPowerUp','WgYHt','toLocaleString','CTRL','sellWindowRect','NUMPAD7','isMagical','commandWindowRect','RCHVK','addWindow','drawBackgroundRect','Game_Actor_changeClass','OUTELASTIC','Enable','MEV','gameTitle','loadTitle1','setHandler','eventsXyNt','listWindowRect','ProfileBgType','TRAIT_PARAM','SParamVocab5','Spriteset_Base_destroy','LvExpGauge','drawTextEx','startAutoNewGame','JSDMs','setAttack','_screenY','SystemSetFontSize','Script\x20Call\x20Error','Sprite_Button_initialize','IconSParam4','isGameActive','ShowJS','DlClW','updateMove','initialLevel','SkillTypeBgType','processFauxAnimationRequests','MBFFL','ItemBackColor1','ParamMax','xparamFlatJS','updateOpacity','FadeSpeed','processCursorMoveModernControls','WZQrV','ACCEPT','processSoundTimings','_encounterCount','DigitGroupingStandardText','onKeyDownKeysF6F7','backOpacity','_hideTileShadows','_hovered','CancelText','removeChild','Game_Action_itemEva','xScrollLinkedOffset','_colorCache','LevelUpFullMp','updateKeyText','SceneManager_initialize','buttonAssistOffset5','_stored_powerUpColor','currentExp','GoldFontSize','_dimmerSprite','STR','sparamPlus','get','PIPE','rnNnw','SEMICOLON','ItemRect','paramName','isItem','win32','Scene_Battle_createCancelButton','xparamRate2','UEpoE','evade','SParamVocab8','pictures','Sprite_destroy','meVolume','ForceNoPlayTest','SfxOb','PRESERVCONVERSION(%1)','FuuER','font-smooth','StatusEquipRect','_itemWindow','platform','bitmap','MCR','destroyed','TranslucentOpacity','NewGameBoot','RkhGu','IconSParam5','_buttonType','Scene_Boot_loadSystemImages','_numberWindow','targetY','makeDocumentTitle','params','cursorLeft','NONCONVERT','ColorGaugeBack','WIN_OEM_WSCTRL','Bitmap_resize','ENTER','LineHeight','GRD','uiAreaHeight','createCustomParameter','isPressed','exit','maxGold','OUTSINE','end','toUpperCase','REPLACE','TextStr','bzFWY','destroy','statusEquipWindowRect','_hideButtons','titles1','skillTypes','vertJS','ItemHeight','INBACK','PictureEraseAll','WIN_OEM_RESET','_changingClass','moveRelativeToResolutionChange','isSmartEventCollisionOn','drawNewParam','gradientFillRect','zmlNY','isClosed','createPageButtons','Rate','PTqnu','integer','drawSegment','_pictureContainer','RevertPreserveNumbers','HIT','mainCommandWidth','useDigitGrouping','CTB','OSTkt','SParamVocab3','isSideView','EVA','Game_Character_processMoveCommand','playEscape','includes','LEFT','TRG','IconXParam4','IcgOo','SParamVocab6','easingType','maxBattleMembers','worldTransform','shift','performMiss','NUMPAD2','nw.gui','Basic','updateFauxAnimations','WIN_OEM_CLEAR','Bitmap_blt','StatusParamsRect','removeFauxAnimation','dimColor1','TitlePicButtons','xparam','GetParamIcon','param','mhp','GoldMax','_commandWindow','Spriteset_Base_updatePosition','OUTBOUNCE','framebuffer','NumberBgType','nYXMP','adjustSprite','mainFontSize','BasicParameterFormula','SParamVocab4','strokeRect','drawIconBySize','updatePosition','INCUBIC','loadSystemImages','layoutSettings','drawGoldItemStyle','XParamVocab4','render','clear','buttonAssistKey3','_bitmap','lineHeight','ybsge','floor','setAction','IconXParam8','width','sparamFlat1','viBTe','transform','Rate1','openness','Layer','EnableJS','Max','randomJS','horzJS','setActorHome','result','gJzXy','uiAreaWidth','mev','onMouseExit','OS_KEY','originalJS','value','statusParamsWindowRect','_pageupButton','setActorHomeRepositioned','charAt','CallHandlerJS','_fauxAnimationQueue','kFhCX','getColorDataFromPluginParameters','anchor','INOUTBACK','BuyRect','EEPWH','pictureButtons','isCollidedWithEvents','fOnDP','CRSEL','fCFbh','SPACE','resetBattleSystem','EQUALS','textColor','xparamRate1','tilesets','KCvKF','inbounce','SELECT','CustomParamAbb','getBackgroundOpacity','Scene_Name_create','CLEAR','titles2','_moveEasingType','yjuzh','darwin','resize','zryas','onClick','ESC','_stored_expGaugeColor2','SceneManager_isGameActive','touchUI','EncounterRateMinimum','JSON','xparamPlus2','sparamPlus2','updatePictureAntiZoom','round','BmAqr','UMQeD','_stored_mpCostColor','ktKmd','PGDN','mainAreaHeightSideButtonLayout','currencyUnit','Version','ModernControls','retreat','boxWidth','ColorHPGauge1','inBattle','applyCoreEasing','JmMrD','trim','_shakePower','Graphics_centerElement','_movementWholeDuration','repositionEnemiesByResolution','xWtXX','Scene_Status_create','PositionJS','OPEN_CURLY_BRACKET','CONVERT','members','_commandList','INQUART','dummyWindowRect','XParamVocab5','Scene_Equip_create','processTouch','Scene_MenuBase_createBackground','Icon','eva','isPhysical','cvdSr','itemHeight','jWIpn','Game_Interpreter_command122','_muteSound','xHFdB','IconSParam2','GsLrx','picture','_stored_normalColor','refresh','_helpWindow','_fauxAnimationSprites','version','bjaiJ','_categoryWindow','updatePositionCoreEngineShakeRand','makeInputButtonString','SParamVocab7','Control\x20Variables\x20Script\x20Error','setEnemyAction','deathColor','updateOpen','SystemSetSideView','height','moveMenuButtonSideButtonLayout','reserveCommonEvent','EnableMasking','PAzUP','xparamRate','AMPERSAND','cursorPagedown','Window_Base_drawText','fXkKN','HelpBgType','IconSParam6','gaugeBackColor','yScrollLinkedOffset','_lastPluginCommandInterpreter','cancel','maxCols','_stored_mpGaugeColor2','onEscapeSuccess','ColorTPGauge1','vLJpu','getBattleSystem','playTestF6','MAXMP','WIN_OEM_PA1','buttonAssistOffset3','waiting','_addShadow','LINEAR','WIN_OEM_COPY','loadSystem','eFKsq','statusWindowRect','ColorNormal','fillStyle','background','Game_Picture_x','F19','QoL','padding','SCROLL_LOCK','SlotRect','RSbJb','HRG','CNCMl','_stored_crisisColor','displayY','initCoreEasing','ZhprB','updateAnchor','command111','XParamVocab7','button','_stored_maxLvGaugeColor1','ApplyEasing','pagedown','fadeSpeed','children','buttonAssistSwitch','tvNtl','menu','ActorBgType','Flat','GameEnd','buttonAssistKey1','Scene_MenuBase_createPageButtons','ActorHPColor','processCursorMove','OUTQUART','_CoreEngine_Cache_textSizeEx','OptionsMenu','getColor','_clickHandler','guardSkillId','initialize','Game_Screen_initialize','stencilFunc','vyFOo','_animation','F22','disable','moveCancelButtonSideButtonLayout','TGR','forceStencil','evaded','none','Scene_MenuBase_mainAreaTop','kotnz','hide','getLevel','equips','sparamFlat2','SParamVocab1','RightMenus','DummyBgType','Scene_Title_drawGameTitle','clearCachedKeys','QjLFQ','_inputWindow','Symbol','lVVCE','fQUYP','ColorCrisis','qWVlR','MINUS','ColorDeath','AkgWt','move','MRF','sparamRate2','RKjRA','TextJS','translucentOpacity','playCursorSound','CreateBattleSystemID','ONE','F11','MAXHP','Game_Picture_y','INSINE','CAPSLOCK','smkDa','Vnlli','LUK','remove','useDigitGroupingEx','blockWidth','PictureEraseRange','_actorWindow','MRG','ZyTMQ','_shakeDuration','Pozkd','_windowLayer','slpRk','UNDERSCORE','learnings','defineProperty','BattleManager_processEscape','setAnchor','updateDocumentTitle','CLOSE_PAREN','Game_Actor_levelUp','registerCommand','SwitchActorText','ctrlKey','_isWindow','isMaskingEnabled','cursorDown','isRepeated','ItemBgType','startAnimation','avMbM','BuyBgType','currentClass','ValueJS','addCommand','setSideView','scaleMode','_stored_systemColor','LpVPX','CIRCUMFLEX','createButtonAssistWindow','DCSJM','text','myDna','(\x5cd+)([%％])>','jhwXU','atbActive','NloTl','ConvertParams','isReleased','drawGameTitle','IconParam2','uhTkz','Graphics','jaxPd','MAX_SAFE_INTEGER','Game_Picture_calcEasing','ALWAYS','paramFlat','initBasic','bind','IconParam5','kOEEz','setupValueFont','createChildSprite','createBackground','helpAreaHeight','random','Window_Gold_refresh','XParamVocab0','system','#%1','getInputButtonString','MODECHANGE','DisplayedParams','0.00','SystemSetWindowPadding','smallParamFontSize','DefaultStyle','optionsWindowRect','numActions','snapForBackground','escape','ILjYN','flush','onButtonImageLoad','WindowLayer_render','OkText','onMouseEnter','Scene_GameEnd_createBackground','vertical','OHLbK','fillRect','DamageColor','DIVIDE','ImprovedAccuracySystem','BACK_QUOTE','fontSize','SceneManager_onKeyDown','processCursorHomeEndTrigger','boxHeight','helpAreaBottom','clearRect','description','expRate','ExtJS','Window_Base_textSizeEx','rowSpacing','PLUS','paramMaxJS','Sprite_Gauge_gaugeRate','ARRAYSTRUCT','mainAreaTop','process_VisuMZ_CoreEngine_Settings','Scene_Options_create','DocumentTitleFmt','ItemMenu','INSERT','JhmOw','bqEhF','_mp','NUMPAD0','COLON','helpAreaTop','bitmapWidth','Bitmap_clearRect','_tempActor','up2','NoTileShadows','Game_Troop_setup','drawCurrencyValue','getCustomBackgroundSettings','SCALE_MODES','OmBrX','_stored_gaugeBackColor','_centerElementCoreEngine','top','createFauxAnimation','Game_Action_itemHit','XMBtY','enableDigitGroupingEx','gFMVr','vxzfQ','process_VisuMZ_CoreEngine_Functions','stencilOp','Settings','startNormalGame','IconXParam5','WIN_ICO_00','Sprite_Animation_processSoundTimings','odcVB','xparamPlus1','isBeingTouched','home','createTextState','KANA','F17','isEnabled','_targetOffsetY','_movementDuration','colSpacing','Spriteset_Base_initialize','_statusParamsWindow','targetEvaRate','DELETE','fteIE','CNT','KEEP','itemLineRect','NumberRect','save','xZGAV','IconParam3','isOpen','CommandBgType','Scene_Shop_create','attackSkillId','shake','LmWUK','_stored_tpCostColor','initButtonHidden','VisuMZ_1_OptionsCore','ActorTPColor','Scene_Item_create','bgsVolume','paramchangeTextColor','wait','_anchor','setupCoreEngine','IconParam6','JSifo','MULTIPLY','Game_System_initialize','contentsOpacity','StatusParamsBgType','drawGameVersion','hZxZR','PLAY','Window_ShopSell_isEnabled','asin','CrisisRate','DOWN','EXR','drawText','ctGaugeColor1','_repositioned','focus','NewGameCommonEvent','sin','buttonAssistWindowSideRect','INOUTQUINT','dQEEI','drawCurrentParam','calcCoreEasing','ColorPowerDown','EditRect','FontSmoothing','QUOTE','processAlwaysEscape','RepositionActors','StatusBgType','Game_BattlerBase_refresh','woUzl','IconSet','GoldChange','setLastPluginCommandInterpreter','catchException','TimeProgress','IYPui','bitmapHeight','mpGaugeColor1','htcQS','faces','initMembers','paramMax','pOXDJ','scale','NUMPAD3','catchUnknownError','IconParam0','CoreEngine','OPEN_PAREN','Plus','lzTMX','paramBase','WIN_OEM_FINISH','clearForcedGameTroopSettingsCoreEngine','battlebacks2','isPlaytest','startMove','INELASTIC','markCoreEngineModified','Scene_Map_createMenuButton','Aopvq','xparamFlatBonus','process_VisuMZ_CoreEngine_jsQuickFunctions','createWindowLayer','animationId','ItemPadding','anchorCoreEasing','updateCoreEasing','melyN','DataManager_setupNewGame','maxLvGaugeColor2','buttonAssistKey4','EXCLAMATION','_offsetX','constructor','WIN_OEM_FJ_ROYA','isHovered','ZERO','ScreenShake','Speed','VVFxk','_effectsContainer','processTouchModernControls','ColorMaxLvGauge2','categoryWindowRect','ALTGR','Bitmap_drawTextOutline','MEqGL','WmEGA','XParamVocab9','CodeJS','DQAsv','gaugeLineHeight','BACKSPACE','ADD','image-rendering','BottomHelp','drawItem','Game_Picture_updateMove','wholeDuration','setupNewGame','F15','_opening','terms','_customModified','_stored_ctGaugeColor2','open','gYDWi','ColorHPGauge2','Game_Party_consumeItem','isUseModernControls','Sprite_Battler_startMove','nJLcS','XParamVocab2','ColorMPGauge1','updatePadding','isActor','drawAllParams','PDR','_context','updatePositionCoreEngineShakeVert','ColorManager_loadWindowskin','EyLgi','NJfzA','IconXParam0','ColorMaxLvGauge1','buttonY','TextManager_param','setClickHandler','VZmud','Scene_Boot_updateDocumentTitle','numberShowButton','currentLevelExp','targets','fillText','F14','PRINTSCREEN','successRate','updateMainMultiply','MWJrJ','helpWindowRect','createTitleButtons','mxRsN','_defaultStretchMode','opacity','PA1','length','IkAVI','ColorSystem','ejQNU','removeAllFauxAnimations','paramY','ANhqB','GoldBgType','paramRate','advanced','isNwjs','createJsQuickFunction','isFullDocumentTitle','isWindowMaskingEnabled','updateTransform','AywfM','BgType','bMaPj','xuHiK','item','setSize','printError','_targetAnchor','_backSprite1','playTestF7','RWAWl','DEF','iJRWC','INOUTQUAD','vbcay','expGaugeColor2','requestMotion','ZSWiW','REC','setupCoreEasing','_stored_powerDownColor','Enemy','drawActorLevel','mZyit','repositionCancelButtonSideButtonLayout','_playTestFastMode','_destroyInternalTextures','randomInt','xdg-open','parameters','horizontal','playMiss','HANJA','_pressed','ColorMPGauge2','isNextScene','GoldOverlap','buttonAssistCancel','batch','buttonAreaHeight','ItemBackColor2','VOLUME_DOWN','mainAreaBottom','_playtestF7Looping','DUewi','SQcbX','nextLevelExp','createCancelButton','commandWindowRows','mkaCJ','inputWindowRect','itemSuccessRate','qBeBN','parallaxes','refreshDimmerBitmap','img/%1/','CLOSE_CURLY_BRACKET','IuWvA','createMenuButton','xparamFlat2','BACK_SLASH','STRUCT','return\x200','bgmVolume','BottomButtons','targetSpritePosition','blendFunc','_hp','setBackgroundOpacity','Game_Actor_paramBase','Game_Action_updateLastTarget','powerDownColor','hLWVs','PAUSE','mpCostColor','_coreEasingType','_statusWindow','openingSpeed','AfFYs','createEnemies','exec','drawIcon','BaseTexture','_targetOffsetX','CRI','tileHeight','EscapeAlways','dvWDR','_scene','Window_StatusBase_drawActorLevel','setTargetAnchor','_CoreEngineSettings','TCR','MenuLayout','ONE_MINUS_SRC_ALPHA','SideButtons','SaveMenu','maxItems','_createInternalTextures','Type','ENTER_SPECIAL','goto','sYIGC','INEXPO','paramValueByName','xparamPlus','XParamVocab8','RJlhK','down','_cancelButton','visible','areButtonsOutsideMainUI','characters','EVAL','updatePositionCoreEngine','ColorCTGauge2','drawGauge','maxLevel','F23','SParameterFormula','Scene_Boot_onDatabaseLoaded','Padding','toString','WIN_OEM_FJ_TOUROKU','sparamFlatBonus','targetContentsOpacity','catchLoadError','ClwiF','Gold','Window_Base_createTextState','_buttonAssistWindow','itemWindowRect','outbounce','makeDeepCopy','_dummyWindow','movePageButtonSideButtonLayout','parse','MenuBg','updateOrigin','HzhpK','sparamPlusJS','KcVeh','DOLLAR','Scene_Map_initialize','initCoreEngineScreenShake','calcEasing','_closing','pow','updateMain','sv_enemies','_actor','buttonAssistKey%1','PHA','SParamVocab0','LoadError','Scene_Battle_update','TLukg','encounterStep','ZIVzh','aWZNS','keyMapper','_spriteset','VisuMZ_2_BattleSystemCTB','setActionState','loadBitmap','PjOVc','getButtonAssistLocation','resetFontSettings','MainMenu','imageSmoothingEnabled','Bitmap_fillRect','makeFontSmaller','initVisuMZCoreEngine','NEAREST','paramPlus','sparam','ConvertNumberToString','BattleSystem','buttonAssistOk','paramFlatBonus','WIN_ICO_CLEAR','filter','CLOSE_BRACKET','_backSprite2','_digitGrouping','_skillTypeWindow','CrCSo','makeEncounterCount','itemBackColor2','windowPadding','ukTkM','_sideButtonLayout','ElyQN','canUse','STENCIL_BUFFER_BIT','process_VisuMZ_CoreEngine_Enemy_Notetags','processEscape','isAnimationForEach','itemHit','checkSmartEventCollision','OeCam','process_VisuMZ_CoreEngine_Notetags','rssOV','_drawTextShadow','JWZYD','Game_Interpreter_command111','Plus2','jsQuickFunc','hideButtonFromView','TILDE','ZOOM','processTimingData','CustomParamType','isItemStyle','GGLVU','Power','hpGaugeColor2','PibaV','XParamVocab1','setupButtonImage','SmartEventCollisionPriority','_listWindow','<%1\x20%2:[\x20]','clamp','jHUYH','loadGameImagesCoreEngine','call','_drawTextOutline','ISxiG','catchNormalError','Subtitle','itemPadding','QTUbP','PreserveNumbers','Game_Event_isCollidedWithEvents','context','normalColor','setFrame','Linear','duration','NUMPAD5','SideView','Total','Scene_Skill_create','animationBaseDelay','isMapScrollLinked','checkCacheKey','ALT','DrawIcons','createFauxAnimationSprite','command355','FUNC','HELP','drawGameSubtitle','replace','GoldRect','name','heLDL','STENCIL_TEST','paramBaseAboveLevel99','Bitmap_gradientFillRect','setCoreEngineUpdateWindowBg','create','NBddM','rightArrowWidth','applyEasing','ParamChange','dLCkd','_baseTexture','targetObjects','evaluate','startShake','wczTJ','process_VisuMZ_CoreEngine_RegExp','animationNextDelay','mainAreaHeight','eFqQd','EREOF','KeyItemProtect','CategoryRect','WIN_OEM_FJ_MASSHOU','URL','fPUVr','Game_Temp_initialize','_mapNameWindow','QHOyn','setBattleSystem','setWindowPadding','setMainFontSize','createCustomBackgroundImages','_coreEasing','czQSm','CANCEL','CommandRect','Graphics_printError','_duration','drawCircle','Scene_MenuBase_helpAreaTop','IconXParam2','targetBackOpacity','isTriggered','hit','string','Graphics_defaultStretchMode','scaleSprite','process_VisuMZ_CoreEngine_CustomParameters','status','Sprite_Picture_updateOrigin','process_VisuMZ_CoreEngine_Actor_Notetags','itemEva','sparamPlus1','TPB\x20ACTIVE','ctGaugeColor2','outlineColor','isNormalPriority','onMoveEnd','buttonAssistText2','ltyVs','StartID','pop','Flat2','PERIOD','MDR','_offsetY','battlebacks1','NxIty','initDigitGrouping','process_VisuMZ_CoreEngine_Class_Notetags','crisisColor','skillTypeWindowRect','SystemSetBattleSystem','Game_Interpreter_command355','cursorRight','INOUTQUART','dimColor2','MAX_GL_TEXTURES','Sprite_Gauge_currentValue','gaugeRate','TextFmt','EISU','Tilemap_addShadow','INBOUNCE','_stored_tpGaugeColor1','getLastPluginCommandInterpreter','levelUp','isOptionValid','TPB\x20WAIT','OpenSpeed','actorWindowRect','tpColor','maxLvGaugeColor1','_stored_hpGaugeColor2','SlotBgType','seVolume','expGaugeColor1','right','_storedStack','contents','F7key','Window_Base_update','cos','HelpRect','ListBgType','F13','CustomParamIcons','IconXParam7','pageup','Window_Base_initialize','number','isInputting','WIN_OEM_PA2','hpGaugeColor1','targetScaleY','JShbB','animations','currentValue','updateClose','VEYtW','applyForcedGameTroopSettingsCoreEngine','WIN_OEM_ENLW','WIN_OEM_PA3','drawActorNickname','CONTEXT_MENU','StatusMenu','original','isBusy','ActorRect','XParameterFormula','(\x5cd+)>','helpAreaTopSideButtonLayout','_goldWindow','ListRect','LOjaE','INOUTBOUNCE','_screenX','altKey','_stored_mpGaugeColor1','Scene_Menu_create','WIN_OEM_JUMP','WIN_OEM_FJ_LOYA','child_process','InputRect','addLoadListener','ColorCTGauge1','Location','([\x5c+\x5c-]\x5cd+)>','hpColor','GroupDigits','subtitle','AGI','Sprite_AnimationMV_processTimingData','parseForcedGameTroopSettingsCoreEngine','Rate2','innerWidth','LIjGs','OUTCUBIC','IconSParam3','MIN_SAFE_INTEGER','setBackgroundType','skills','targetX','ATK','makeActionList','OptionsRect','actor','updatePlayTestF7','text%1','Param','qpyTu','INOUTCUBIC','buttonAssistWindowRect','StatusRect','Vpwzr','Window_Selectable_processTouch','test','OUTQUAD','encounterStepsMinimum','clearZoom','DYfxu','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','AutoStretch','initCoreEngine','addChild','sparamRateJS','hOCzV','Sprite_Button_updateOpacity','EndingID','Game_Picture_initBasic','update','stypeId','setSideButtonLayout','SParamVocab2','ColorExpGauge1','FEujX','usableSkills','_paramPlus','SellBgType','DECIMAL','_forcedTroopView','DigitGroupingExText','tpGaugeColor1','%1%2','iconHeight','makeTargetSprites','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','FDR','mIZBl','CEV','NUMPAD4','style','tApZy','weauK','min','Game_BattlerBase_initMembers','NUMPAD9','subject','textSizeEx','MJeRL','setGuard','YDiFN','goZRF','META','DigitGroupingGaugeSprites','IKwda','max','ButtonHeight','AAKgv','drawActorClass','Game_Picture_move','ButtonFadeSpeed','pictureId','itemHitImprovedAccuracy','paramRateJS','OmqRg','updateBackOpacity','targetOpacity','Conditional\x20Branch\x20Script\x20Error','INOUTELASTIC','option','setMute','jeQbD','isBottomHelpMode','createCommandWindow','PvfXz','ButtonAssist','_shakeSpeed','IconParam7','drawParamText','push','OpenConsole','QnwnB','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','relKy','CustomParamNames','isSideButtonLayout','match','updatePositionCoreEngineShakeHorz','OnLoadJS','XParamVocab6','setEasingType','drawActorExpGauge','left','ParamName','openURL','WIN_OEM_FJ_JISHO','QRShG','Window_Selectable_processCursorMove','getCoreEngineScreenShakeStyle','levelUpRecovery','mainAreaTopSideButtonLayout','_stored_tpGaugeColor2','ShowDevTools','endAnimation','Title','targetScaleX','Window','jPiHD','retrieveFauxAnimation','ZKLnH','ZfFbN','EoPAD','ColorExpGauge2','buttonAssistOffset2','isCursorMovable','MaQso','OutlineColor','Window_Selectable_drawBackgroundRect','_isPlaytest','TitleCommandList','vbxpC','SnapshotOpacity','systemColor','center','IconParam4','Duration','ShowItemBackground','isKeyItem','COMMA','Scene_MenuBase_createCancelButton','format','GREATER_THAN','level','BXFGu','eqHvE','Renderer','isMenuButtonAssistEnabled','IJPCG','vRSiu','mSpFN','IconXParam9','IconSParam0','tkiVH','zkCwL','Window_Selectable_cursorDown','GQgoX','Bitmap_drawText','map','OyHaO','command122','Spriteset_Battle_createEnemies','ActorMPColor','enemies','textWidth','DimColor1','RVjHC','ItemStyle','EXECUTE','nickname','cursorPageup','DrawItemBackgroundJS','dfbLk','Scene_MenuBase_mainAreaHeight','_coreEngineShakeStyle','YcMfS','RowSpacing','setCoreEngineScreenShakeStyle','index','subjectHitRate','paramRate1','_cache','isBottomButtonMode','_forcedBattleSys','QSMkH','ColorTPCost','determineSideButtonLayoutValid','NUMPAD8','CategoryBgType','drawRightArrow','isRightInputMode','goldWindowRect','command357','resetTextColor','iconWidth','HASH','reduce','IvdAQ','ColorTPGauge2','qFTik','fMvWT','FontSize','tpCostColor','WIN_OEM_BACKTAB','(\x5cd+\x5c.?\x5cd+)>','VFCiN','ARRAYEVAL','makeCommandList','fgedh','showDevTools','setup','processMoveCommand','EQUAL','Scene_Base_createWindowLayer','FontShadows','reservePlayTestNewGameCommonEvent','F20','toLowerCase','loadTitle2','RegExp','gainGold','sqrt','createFauxAnimationQueue','Color','INOUTCIRC','initialBattleSystem','epFEQ','stop','destroyCoreEngineMarkedBitmaps','DummyRect','LoadMenu','traitObjects','_data','IconParam1','show','PGUP','INOUTEXPO','ColorMPCost','ISRtb','_optionsWindow','mirror','smoothSelect','ProfileRect','paramX','cbwvb','note','KeyUnlisted','UiLZZ','cancelShowButton','Sprite_Actor_setActorHome','Game_Interpreter_PluginCommand','areTileShadowsHidden','onDatabaseLoaded','isActiveTpb'];(function(_0x2f4d71,_0x50ef3a){const _0x47f2ea=function(_0x34549f){while(--_0x34549f){_0x2f4d71['push'](_0x2f4d71['shift']());}};_0x47f2ea(++_0x50ef3a);}(_0x50ef,0x18b));const _0x47f2=function(_0x2f4d71,_0x50ef3a){_0x2f4d71=_0x2f4d71-0x0;let _0x47f2ea=_0x50ef[_0x2f4d71];return _0x47f2ea;};const _0x43e5ad=_0x47f2;var label=_0x43e5ad('0x176'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x43e5ad('0x29d')](function(_0x38ca05){const _0x5c68aa=_0x43e5ad;return _0x38ca05[_0x5c68aa('0x31a')]&&_0x38ca05[_0x5c68aa('0xed')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x43e5ad('0x117')]=VisuMZ[label][_0x43e5ad('0x117')]||{},VisuMZ[_0x43e5ad('0xb6')]=function(_0x4212d1,_0x2094ac){const _0x26501b=_0x43e5ad;for(const _0xd97160 in _0x2094ac){if(_0xd97160[_0x26501b('0x3eb')](/(.*):(.*)/i)){const _0x3a0b9a=String(RegExp['$1']),_0x4313d9=String(RegExp['$2'])[_0x26501b('0x545')]()[_0x26501b('0x5f2')]();let _0x8f5893,_0x200f56,_0x16cda6;switch(_0x4313d9){case'NUM':_0x8f5893=_0x2094ac[_0xd97160]!==''?Number(_0x2094ac[_0xd97160]):0x0;break;case'ARRAYNUM':_0x200f56=_0x2094ac[_0xd97160]!==''?JSON[_0x26501b('0x270')](_0x2094ac[_0xd97160]):[],_0x8f5893=_0x200f56[_0x26501b('0x428')](_0xa734a0=>Number(_0xa734a0));break;case _0x26501b('0x259'):_0x8f5893=_0x2094ac[_0xd97160]!==''?eval(_0x2094ac[_0xd97160]):null;break;case _0x26501b('0x458'):_0x200f56=_0x2094ac[_0xd97160]!==''?JSON[_0x26501b('0x270')](_0x2094ac[_0xd97160]):[],_0x8f5893=_0x200f56[_0x26501b('0x428')](_0x448f2a=>eval(_0x448f2a));break;case _0x26501b('0x5de'):_0x8f5893=_0x2094ac[_0xd97160]!==''?JSON[_0x26501b('0x270')](_0x2094ac[_0xd97160]):'';break;case'ARRAYJSON':_0x200f56=_0x2094ac[_0xd97160]!==''?JSON[_0x26501b('0x270')](_0x2094ac[_0xd97160]):[],_0x8f5893=_0x200f56['map'](_0x3384ae=>JSON[_0x26501b('0x270')](_0x3384ae));break;case _0x26501b('0x2e3'):_0x8f5893=_0x2094ac[_0xd97160]!==''?new Function(JSON['parse'](_0x2094ac[_0xd97160])):new Function(_0x26501b('0x226'));break;case'ARRAYFUNC':_0x200f56=_0x2094ac[_0xd97160]!==''?JSON[_0x26501b('0x270')](_0x2094ac[_0xd97160]):[],_0x8f5893=_0x200f56[_0x26501b('0x428')](_0x455bf1=>new Function(JSON[_0x26501b('0x270')](_0x455bf1)));break;case _0x26501b('0x50f'):_0x8f5893=_0x2094ac[_0xd97160]!==''?String(_0x2094ac[_0xd97160]):'';break;case'ARRAYSTR':_0x200f56=_0x2094ac[_0xd97160]!==''?JSON[_0x26501b('0x270')](_0x2094ac[_0xd97160]):[],_0x8f5893=_0x200f56[_0x26501b('0x428')](_0x1335db=>String(_0x1335db));break;case _0x26501b('0x225'):_0x16cda6=_0x2094ac[_0xd97160]!==''?JSON[_0x26501b('0x270')](_0x2094ac[_0xd97160]):{},_0x4212d1[_0x3a0b9a]={},VisuMZ[_0x26501b('0xb6')](_0x4212d1[_0x3a0b9a],_0x16cda6);continue;case _0x26501b('0xf5'):_0x200f56=_0x2094ac[_0xd97160]!==''?JSON[_0x26501b('0x270')](_0x2094ac[_0xd97160]):[],_0x8f5893=_0x200f56[_0x26501b('0x428')](_0x1b23c4=>VisuMZ[_0x26501b('0xb6')]({},JSON['parse'](_0x1b23c4)));break;default:continue;}_0x4212d1[_0x3a0b9a]=_0x8f5893;}}return _0x4212d1;},(_0x111168=>{const _0x28d051=_0x43e5ad,_0x15de58=_0x111168[_0x28d051('0x2e8')];for(const _0x327e32 of dependencies){if(!Imported[_0x327e32]){alert(_0x28d051('0x39f')['format'](_0x15de58,_0x327e32)),SceneManager[_0x28d051('0x541')]();break;}}const _0x1d7dab=_0x111168[_0x28d051('0xed')];if(_0x1d7dab[_0x28d051('0x3eb')](/\[Version[ ](.*?)\]/i)){const _0x22f778=Number(RegExp['$1']);_0x22f778!==VisuMZ[label][_0x28d051('0x1')]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x28d051('0x417')](_0x15de58,_0x22f778)),SceneManager[_0x28d051('0x541')]());}if(_0x1d7dab[_0x28d051('0x3eb')](/\[Tier[ ](\d+)\]/i)){const _0x3c2998=Number(RegExp['$1']);if(_0x3c2998<tier)alert(_0x28d051('0x3b8')[_0x28d051('0x417')](_0x15de58,_0x3c2998,tier)),SceneManager[_0x28d051('0x541')]();else{if(_0x28d051('0x275')===_0x28d051('0x275'))tier=Math[_0x28d051('0x3cc')](_0x3c2998,tier);else{function _0x1ecb22(){const _0x11e3b5=_0x28d051;_0x2bb8f4=_0x401241(_0x32b6d5||'')[_0x11e3b5('0x545')]();const _0x47ed68=_0x2a25bb[_0x11e3b5('0x176')][_0x11e3b5('0x117')][_0x11e3b5('0x393')];if(_0x253279===_0x11e3b5('0x81'))return _0x154104[_0x11e3b5('0x1ae')]['params'][0x0];if(_0x2f2319===_0x11e3b5('0x23'))return _0x3e1e47['terms'][_0x11e3b5('0x535')][0x1];if(_0x1d252b==='ATK')return _0x4b59c6['terms'][_0x11e3b5('0x535')][0x2];if(_0x1fe98d===_0x11e3b5('0x1f3'))return _0x350d3d[_0x11e3b5('0x1ae')]['params'][0x3];if(_0x37dbad==='MAT')return _0x24bb7b[_0x11e3b5('0x1ae')][_0x11e3b5('0x535')][0x4];if(_0x45a7fa===_0x11e3b5('0x48e'))return _0x58b2d2['terms'][_0x11e3b5('0x535')][0x5];if(_0x24651e==='AGI')return _0x37c874[_0x11e3b5('0x1ae')]['params'][0x6];if(_0xc83118===_0x11e3b5('0x87'))return _0x16a48d[_0x11e3b5('0x1ae')][_0x11e3b5('0x535')][0x7];if(_0x1a0fe3===_0x11e3b5('0x561'))return _0x47ed68['XParamVocab0'];if(_0x55a03c===_0x11e3b5('0x568'))return _0x47ed68[_0x11e3b5('0x2c2')];if(_0xa71a8e===_0x11e3b5('0x23c'))return _0x47ed68[_0x11e3b5('0x1b8')];if(_0x978b3b===_0x11e3b5('0x3bb'))return _0x47ed68['XParamVocab3'];if(_0x3e07d6==='MEV')return _0x47ed68[_0x11e3b5('0x596')];if(_0x489c7a==='MRF')return _0x47ed68['XParamVocab5'];if(_0x4446b8===_0x11e3b5('0x12c'))return _0x47ed68[_0x11e3b5('0x3ee')];if(_0x19c1f2===_0x11e3b5('0x37'))return _0x47ed68[_0x11e3b5('0x3f')];if(_0x1beca9===_0x11e3b5('0x8d'))return _0x47ed68[_0x11e3b5('0x252')];if(_0x301fb3===_0x11e3b5('0x56d'))return _0x47ed68[_0x11e3b5('0x1a0')];if(_0x1289e4===_0x11e3b5('0x5e'))return _0x47ed68[_0x11e3b5('0x281')];if(_0x12e65a==='GRD')return _0x47ed68[_0x11e3b5('0x68')];if(_0x35948e==='REC')return _0x47ed68[_0x11e3b5('0x3ab')];if(_0x51eb7b===_0x11e3b5('0x280'))return _0x47ed68[_0x11e3b5('0x566')];if(_0x19d837===_0x11e3b5('0x52a'))return _0x47ed68[_0x11e3b5('0x58e')];if(_0x945d57==='TCR')return _0x47ed68[_0x11e3b5('0x4df')];if(_0x4e1a6d===_0x11e3b5('0x1bd'))return _0x47ed68[_0x11e3b5('0x570')];if(_0x5219d5==='MDR')return _0x47ed68[_0x11e3b5('0x6')];if(_0xedc751===_0x11e3b5('0x3b9'))return _0x47ed68[_0x11e3b5('0x51d')];if(_0x211d3a==='EXR')return _0x47ed68['SParamVocab9'];if(_0x3797d8['CoreEngine'][_0x11e3b5('0x3e9')][_0x333214])return _0x152b1d[_0x11e3b5('0x176')]['CustomParamNames'][_0x1f8948];return'';}}}}VisuMZ[_0x28d051('0xb6')](VisuMZ[label]['Settings'],_0x111168[_0x28d051('0x205')]);})(pluginData),PluginManager[_0x43e5ad('0x9b')](pluginData[_0x43e5ad('0x2e8')],'OpenURL',_0x232b8a=>{const _0x587abe=_0x43e5ad;VisuMZ[_0x587abe('0xb6')](_0x232b8a,_0x232b8a);const _0x4ab5c4=_0x232b8a[_0x587abe('0x301')];VisuMZ[_0x587abe('0x3f3')](_0x4ab5c4);}),PluginManager[_0x43e5ad('0x9b')](pluginData[_0x43e5ad('0x2e8')],_0x43e5ad('0x166'),_0x537868=>{const _0x2af55a=_0x43e5ad;VisuMZ[_0x2af55a('0xb6')](_0x537868,_0x537868);const _0x3cf2fa=_0x537868['value']||0x0;$gameParty[_0x2af55a('0x466')](_0x3cf2fa);}),PluginManager[_0x43e5ad('0x9b')](pluginData[_0x43e5ad('0x2e8')],'PictureEasingType',_0x5da178=>{const _0x55e68d=_0x43e5ad;VisuMZ[_0x55e68d('0xb6')](_0x5da178,_0x5da178);const _0x1faeae=_0x5da178[_0x55e68d('0x3d2')]||0x1,_0x3122db=_0x5da178[_0x55e68d('0x571')]||_0x55e68d('0x2d6'),_0x461ef5=$gameScreen[_0x55e68d('0x60f')](_0x1faeae);if(_0x461ef5){if('ENMtW'!=='ENMtW'){function _0x4674f3(){const _0x2a8b21=_0x55e68d,_0x1ef6c5=_0x2a8b21('0x5e5');this[_0x2a8b21('0x506')]=this[_0x2a8b21('0x506')]||{};if(this['_colorCache'][_0x1ef6c5])return this[_0x2a8b21('0x506')][_0x1ef6c5];const _0x46ccf0=_0x25f9b7[_0x2a8b21('0x176')]['Settings']['Color'][_0x2a8b21('0x477')];return this[_0x2a8b21('0x5bb')](_0x1ef6c5,_0x46ccf0);}}else _0x461ef5[_0x55e68d('0x3ef')](_0x3122db);}}),PluginManager['registerCommand'](pluginData[_0x43e5ad('0x2e8')],_0x43e5ad('0x551'),_0x19326c=>{const _0x455084=_0x43e5ad;for(let _0x2fe76a=0x1;_0x2fe76a<=0x64;_0x2fe76a++){if('pUQUF'!==_0x455084('0x325'))$gameScreen['erasePicture'](_0x2fe76a);else{function _0x4cb734(){const _0x42c0a5=_0x455084;return _0x4981bc[_0x42c0a5('0x176')][_0x42c0a5('0x110')][_0x42c0a5('0x2ca')](this,_0x38e15c);}}}}),PluginManager[_0x43e5ad('0x9b')](pluginData[_0x43e5ad('0x2e8')],_0x43e5ad('0x8b'),_0x34ea0f=>{const _0x19ac90=_0x43e5ad;VisuMZ[_0x19ac90('0xb6')](_0x34ea0f,_0x34ea0f);const _0x2f1368=Math[_0x19ac90('0x3c0')](_0x34ea0f[_0x19ac90('0x326')],_0x34ea0f[_0x19ac90('0x3a6')]),_0x4a1ff0=Math['max'](_0x34ea0f[_0x19ac90('0x326')],_0x34ea0f[_0x19ac90('0x3a6')]);for(let _0x484577=_0x2f1368;_0x484577<=_0x4a1ff0;_0x484577++){$gameScreen['erasePicture'](_0x484577);}}),PluginManager[_0x43e5ad('0x9b')](pluginData[_0x43e5ad('0x2e8')],_0x43e5ad('0x195'),_0x21b0ef=>{const _0x517f5f=_0x43e5ad;VisuMZ[_0x517f5f('0xb6')](_0x21b0ef,_0x21b0ef);const _0xf3bed6=_0x21b0ef[_0x517f5f('0x24b')]||_0x517f5f('0xc9'),_0x1bec35=_0x21b0ef[_0x517f5f('0x2bf')]['clamp'](0x1,0x9),_0x103523=_0x21b0ef[_0x517f5f('0x196')][_0x517f5f('0x2c7')](0x1,0x9),_0x366db9=_0x21b0ef[_0x517f5f('0x412')]||0x1,_0x41361a=_0x21b0ef[_0x517f5f('0x4bc')];$gameScreen[_0x517f5f('0x43b')](_0xf3bed6),$gameScreen[_0x517f5f('0x2f7')](_0x1bec35,_0x103523,_0x366db9);if(_0x41361a){if('SnQZV'!==_0x517f5f('0x1da')){const _0x1eadb4=$gameTemp[_0x517f5f('0x33f')]();if(_0x1eadb4)_0x1eadb4[_0x517f5f('0x140')](_0x366db9);}else{function _0x56360b(){const _0x1d6143=_0x517f5f;this[_0x1d6143('0x151')](_0x3b2cb7,_0x254f0a,_0x11b059,_0x304797);}}}}),PluginManager[_0x43e5ad('0x9b')](pluginData[_0x43e5ad('0x2e8')],_0x43e5ad('0x4e7'),_0xf5698a=>{const _0x33420d=_0x43e5ad;VisuMZ['ConvertParams'](_0xf5698a,_0xf5698a);const _0x29ac0f=_0xf5698a[_0x33420d('0x3da')]||0x1;$gameSystem[_0x33420d('0x308')](_0x29ac0f);}),PluginManager[_0x43e5ad('0x9b')](pluginData[_0x43e5ad('0x2e8')],_0x43e5ad('0xb'),_0x219aa4=>{const _0x1bfee8=_0x43e5ad;if($gameParty[_0x1bfee8('0x5ef')]())return;VisuMZ['ConvertParams'](_0x219aa4,_0x219aa4);const _0x241e5a=_0x219aa4[_0x1bfee8('0x3da')];if(_0x241e5a[_0x1bfee8('0x3eb')](/Front/i)){if('czQSm'!==_0x1bfee8('0x30b')){function _0x5012aa(){const _0x579671=_0x1bfee8;this[_0x579671('0x0')][_0x579671('0x88')](_0x365619),this['_effectsContainer'][_0x579671('0x503')](_0x4a1ee2);for(const _0x1b4272 of _0x189c64['targetObjects']){_0x1b4272[_0x579671('0x3fc')]&&_0x1b4272[_0x579671('0x3fc')]();}_0x5e0e5f[_0x579671('0x549')]();}}else $gameSystem[_0x1bfee8('0xa9')](![]);}else _0x241e5a['match'](/Side/i)?$gameSystem[_0x1bfee8('0xa9')](!![]):$gameSystem[_0x1bfee8('0xa9')](!$gameSystem[_0x1bfee8('0x567')]());}),PluginManager['registerCommand'](pluginData['name'],_0x43e5ad('0x332'),_0x593b9b=>{const _0x250be5=_0x43e5ad;if($gameParty[_0x250be5('0x5ef')]())return;VisuMZ[_0x250be5('0xb6')](_0x593b9b,_0x593b9b);const _0x213c56=_0x593b9b[_0x250be5('0x3da')][_0x250be5('0x545')]()[_0x250be5('0x5f2')](),_0xda824a=VisuMZ[_0x250be5('0x176')][_0x250be5('0x7e')](_0x213c56);$gameSystem[_0x250be5('0x306')](_0xda824a);}),VisuMZ['CoreEngine'][_0x43e5ad('0x7e')]=function(_0x4f124a){const _0x47f0c9=_0x43e5ad;_0x4f124a=_0x4f124a||'DATABASE',_0x4f124a=String(_0x4f124a)[_0x47f0c9('0x545')]()[_0x47f0c9('0x5f2')]();switch(_0x4f124a){case'DTB':return 0x0;case _0x47f0c9('0x31f'):if(Imported[_0x47f0c9('0x13b')]){if(_0x47f0c9('0x159')!==_0x47f0c9('0x159')){function _0x4f3eec(){const _0x22fc99=_0x47f0c9;_0x2eb21f(_0x22fc99('0x4ae')[_0x22fc99('0x417')](_0x284511,_0x1a666b)),_0x2a00c7[_0x22fc99('0x541')]();}}else ConfigManager['atbActive']=!![];}return 0x1;case _0x47f0c9('0x342'):if(Imported['VisuMZ_1_OptionsCore']){if(_0x47f0c9('0x442')==='giOvQ'){function _0x9c00fa(){const _0x4e6cc9=_0x47f0c9;if(_0x409a59[_0x4e6cc9('0x176')]['Settings']['UI']['SideButtons']){const _0x5bf37=_0x3f8256[_0x4e6cc9('0x5a0')]-_0x278fec[_0x4e6cc9('0x5ed')]-_0x467a9a[_0x4e6cc9('0x176')]['Settings']['UI']['BoxMargin']*0x2,_0x11bd70=_0xc075f4['prototype'][_0x4e6cc9('0x8a')][_0x4e6cc9('0x2ca')](this)*0x4;if(_0x5bf37>=_0x11bd70)_0x274cc4[_0x4e6cc9('0x3aa')](!![]);}}}else ConfigManager[_0x47f0c9('0xb4')]=![];}return 0x2;case _0x47f0c9('0x564'):if(Imported[_0x47f0c9('0x28a')])return'CTB';break;}return $dataSystem['battleSystem'];},PluginManager[_0x43e5ad('0x9b')](pluginData[_0x43e5ad('0x2e8')],_0x43e5ad('0xd2'),_0x58bff6=>{const _0x14fb51=_0x43e5ad;VisuMZ[_0x14fb51('0xb6')](_0x58bff6,_0x58bff6);const _0x5d3b31=_0x58bff6['option']||0x1;$gameSystem[_0x14fb51('0x307')](_0x5d3b31);}),VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x260')]=Scene_Boot[_0x43e5ad('0x4a4')]['onDatabaseLoaded'],Scene_Boot[_0x43e5ad('0x4a4')][_0x43e5ad('0x486')]=function(){const _0x31ba8e=_0x43e5ad;VisuMZ['CoreEngine'][_0x31ba8e('0x260')][_0x31ba8e('0x2ca')](this),this[_0x31ba8e('0x2f9')](),this[_0x31ba8e('0x2b1')](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0x31ba8e('0x115')](),this[_0x31ba8e('0x319')]();},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x465')]={},Scene_Boot[_0x43e5ad('0x4a4')]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x356724=_0x43e5ad,_0x3c2b4e=[_0x356724('0x81'),_0x356724('0x23'),_0x356724('0x38d'),_0x356724('0x1f3'),'MAT',_0x356724('0x48e'),_0x356724('0x381'),'LUK'],_0x1f4bfb=['HIT','EVA',_0x356724('0x23c'),_0x356724('0x3bb'),_0x356724('0x4d7'),_0x356724('0x78'),'CNT','HRG',_0x356724('0x8d'),_0x356724('0x56d')],_0x1ea194=[_0x356724('0x5e'),'GRD',_0x356724('0x1fa'),_0x356724('0x280'),'MCR',_0x356724('0x244'),'PDR','MDR',_0x356724('0x3b9'),'EXR'],_0x57135a=[_0x3c2b4e,_0x1f4bfb,_0x1ea194],_0x426d37=[_0x356724('0x178'),'Plus1',_0x356724('0x2b6'),_0x356724('0x5a8'),_0x356724('0x55b'),_0x356724('0x5a4'),'Rate2',_0x356724('0x4a'),_0x356724('0x4b9'),_0x356724('0x328')];for(const _0x232072 of _0x57135a){if(_0x356724('0x1a2')!==_0x356724('0x1a2')){function _0x5f47ac(){const _0x3a2ecb=_0x356724;this[_0x3a2ecb('0x1d7')]+=this[_0x3a2ecb('0x256')]?this['fadeSpeed']():-0x1*this[_0x3a2ecb('0x44')](),this[_0x3a2ecb('0x1d7')]=_0x1f979b['min'](0xc0,this['opacity']);}}else{let _0x314e05='';if(_0x232072===_0x3c2b4e)_0x314e05=_0x356724('0x582');if(_0x232072===_0x1f4bfb)_0x314e05=_0x356724('0x580');if(_0x232072===_0x1ea194)_0x314e05=_0x356724('0x297');for(const _0x42b07e of _0x426d37){if(_0x356724('0xe1')===_0x356724('0xe1')){let _0x50afbe=_0x356724('0x3b5')[_0x356724('0x417')](_0x314e05,_0x42b07e);VisuMZ['CoreEngine'][_0x356724('0x465')][_0x50afbe]=[],VisuMZ['CoreEngine'][_0x356724('0x465')][_0x50afbe+'JS']=[];let _0x5b0f24=_0x356724('0x2c6');if(['Plus','Flat'][_0x356724('0x56b')](_0x42b07e))_0x5b0f24+=_0x356724('0x37d');else{if(['Plus1',_0x356724('0x4b9')]['includes'](_0x42b07e)){if(_0x356724('0x2b')===_0x356724('0x1b7')){function _0xb25787(){const _0x8cdac6=_0x356724,_0x21d47f=_0x53fbda[_0x8cdac6('0x176')][_0x8cdac6('0x5ce')][_0x2566ef],_0x4ea21f=this[_0x21d47f];return _0x3d9473[_0x8cdac6('0x176')][_0x8cdac6('0x2bc')][_0x2ed50a]===_0x8cdac6('0x55d')?_0x4ea21f:_0x1df82c?_0x524cd0(_0x3103dc[_0x8cdac6('0x5e2')](_0x4ea21f*0x64))+'%':_0x4ea21f;}}else _0x5b0f24+=_0x356724('0x48c');}else{if([_0x356724('0x2b6'),_0x356724('0x328')][_0x356724('0x56b')](_0x42b07e)){if('kkYbT'!==_0x356724('0x10b'))_0x5b0f24+=_0x356724('0x495');else{function _0x363617(){const _0x3d61a0=_0x356724;this[_0x3d61a0('0x383')](_0x3697fd[_0x3d61a0('0x2e8')]);}}}else{if(_0x42b07e===_0x356724('0x5a8')){if(_0x356724('0x402')==='ZKLnH')_0x5b0f24+=_0x356724('0x36c');else{function _0x373fd7(){this['_digitGroupingEx']=_0xecc183;}}}else{if(_0x42b07e===_0x356724('0x5a4'))_0x5b0f24+=_0x356724('0xb2');else _0x42b07e===_0x356724('0x384')&&(_0x5b0f24+=_0x356724('0x456'));}}}}for(const _0x3f109e of _0x232072){let _0x57cb2e=_0x42b07e[_0x356724('0x2e6')](/[\d+]/g,'')[_0x356724('0x545')]();const _0x5d72a1=_0x5b0f24[_0x356724('0x417')](_0x3f109e,_0x57cb2e);VisuMZ[_0x356724('0x176')][_0x356724('0x465')][_0x50afbe][_0x356724('0x3e4')](new RegExp(_0x5d72a1,'i'));const _0x5fd4be='<JS\x20%1\x20%2:[\x20](.*)>'['format'](_0x3f109e,_0x57cb2e);VisuMZ[_0x356724('0x176')][_0x356724('0x465')][_0x50afbe+'JS'][_0x356724('0x3e4')](new RegExp(_0x5fd4be,'i'));}}else{function _0x3b6e62(){const _0x4e3cf2=_0x356724;return this[_0x4e3cf2('0x3c3')]()[_0x4e3cf2('0x315')]+0.05;}}}}}},Scene_Boot['prototype'][_0x43e5ad('0x2b1')]=function(){const _0x5e676c=_0x43e5ad;this[_0x5e676c('0x31c')](),this['process_VisuMZ_CoreEngine_Class_Notetags'](),this[_0x5e676c('0x2ab')]();},Scene_Boot['prototype'][_0x43e5ad('0x31c')]=function(){const _0x2f9e13=_0x43e5ad;for(const _0x49a05f of $dataActors){if(_0x2f9e13('0x5c2')!==_0x2f9e13('0x8e')){if(!_0x49a05f)continue;const _0x558952=_0x49a05f[_0x2f9e13('0x47f')];if(_0x558952[_0x2f9e13('0x3eb')](/<MAX LEVEL:[ ](\d+)>/i)){_0x49a05f['maxLevel']=Number(RegExp['$1']);if(_0x49a05f[_0x2f9e13('0x25d')]===0x0)_0x49a05f['maxLevel']=Number[_0x2f9e13('0xbd')];}_0x558952['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x49a05f[_0x2f9e13('0x4ef')]=Math['min'](Number(RegExp['$1']),_0x49a05f['maxLevel']));}else{function _0x154286(){var _0x43548f=_0x5c37b4(_0x24140f['$1']);try{_0x482aa8+=_0x1b8163(_0x43548f);}catch(_0x41e1c8){if(_0x2c3b5c['isPlaytest']())_0x5f008d['log'](_0x41e1c8);}}}}},Scene_Boot[_0x43e5ad('0x4a4')][_0x43e5ad('0x32f')]=function(){const _0x4d3c0e=_0x43e5ad;for(const _0x3ea80d of $dataActors){if(!_0x3ea80d)continue;const _0xc5bf8f=_0x3ea80d[_0x4d3c0e('0x47f')];if(_0x3ea80d['learnings']){if(_0x4d3c0e('0x1c2')!==_0x4d3c0e('0x21c'))for(const _0x517029 of _0x3ea80d[_0x4d3c0e('0x94')]){_0x517029[_0x4d3c0e('0x47f')][_0x4d3c0e('0x3eb')](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x517029['level']=Math[_0x4d3c0e('0x3cc')](Number(RegExp['$1']),0x1));}else{function _0x297a79(){const _0x2063ff=_0x4d3c0e;return _0x2f1547[_0x2063ff('0x176')][_0x2063ff('0x117')][_0x2063ff('0x3ff')][_0x2063ff('0x188')];}}}}},Scene_Boot[_0x43e5ad('0x4a4')]['process_VisuMZ_CoreEngine_Enemy_Notetags']=function(){const _0x451ba1=_0x43e5ad;for(const _0xb0c31e of $dataEnemies){if(_0x451ba1('0x478')===_0x451ba1('0x12b')){function _0x200f69(){const _0x3e0407=_0x451ba1;_0x4fab6c['CoreEngine'][_0x3e0407('0x586')][_0x3e0407('0x2ca')](this),this['updatePositionCoreEngine']();}}else{if(!_0xb0c31e)continue;_0xb0c31e[_0x451ba1('0x419')]=0x1;const _0x257f58=_0xb0c31e[_0x451ba1('0x47f')];if(_0x257f58[_0x451ba1('0x3eb')](/<LEVEL:[ ](\d+)>/i))_0xb0c31e[_0x451ba1('0x419')]=Number(RegExp['$1']);if(_0x257f58[_0x451ba1('0x3eb')](/<MAXHP:[ ](\d+)>/i))_0xb0c31e[_0x451ba1('0x535')][0x0]=Number(RegExp['$1']);if(_0x257f58[_0x451ba1('0x3eb')](/<MAXMP:[ ](\d+)>/i))_0xb0c31e[_0x451ba1('0x535')][0x1]=Number(RegExp['$1']);if(_0x257f58[_0x451ba1('0x3eb')](/<ATK:[ ](\d+)>/i))_0xb0c31e[_0x451ba1('0x535')][0x2]=Number(RegExp['$1']);if(_0x257f58[_0x451ba1('0x3eb')](/<DEF:[ ](\d+)>/i))_0xb0c31e[_0x451ba1('0x535')][0x3]=Number(RegExp['$1']);if(_0x257f58[_0x451ba1('0x3eb')](/<MAT:[ ](\d+)>/i))_0xb0c31e[_0x451ba1('0x535')][0x4]=Number(RegExp['$1']);if(_0x257f58['match'](/<MDF:[ ](\d+)>/i))_0xb0c31e[_0x451ba1('0x535')][0x5]=Number(RegExp['$1']);if(_0x257f58['match'](/<AGI:[ ](\d+)>/i))_0xb0c31e[_0x451ba1('0x535')][0x6]=Number(RegExp['$1']);if(_0x257f58[_0x451ba1('0x3eb')](/<LUK:[ ](\d+)>/i))_0xb0c31e[_0x451ba1('0x535')][0x7]=Number(RegExp['$1']);if(_0x257f58[_0x451ba1('0x3eb')](/<EXP:[ ](\d+)>/i))_0xb0c31e['exp']=Number(RegExp['$1']);if(_0x257f58[_0x451ba1('0x3eb')](/<GOLD:[ ](\d+)>/i))_0xb0c31e[_0x451ba1('0x4a6')]=Number(RegExp['$1']);}}},Scene_Boot['prototype'][_0x43e5ad('0xf7')]=function(){const _0x36638c=_0x43e5ad;VisuMZ[_0x36638c('0x176')]['Settings'][_0x36638c('0x32')][_0x36638c('0x3e5')]&&VisuMZ[_0x36638c('0x3fb')](!![]);if(VisuMZ[_0x36638c('0x176')][_0x36638c('0x117')][_0x36638c('0x32')][_0x36638c('0x5eb')]){if(_0x36638c('0x6d')!==_0x36638c('0x5e6'))Input[_0x36638c('0x288')][0x23]=_0x36638c('0x544'),Input['keyMapper'][0x24]=_0x36638c('0x11f');else{function _0x4156f2(){const _0x12735b=_0x36638c;return this[_0x12735b('0x1ec')]()[_0x12735b('0x1d0')]*0.01;}}}},Scene_Boot[_0x43e5ad('0x4a4')][_0x43e5ad('0x115')]=function(){const _0x3f99c5=_0x43e5ad;this[_0x3f99c5('0x185')]();},Scene_Boot[_0x43e5ad('0x4a4')][_0x43e5ad('0x185')]=function(){const _0x5bbe60=_0x43e5ad,_0x4f1374=VisuMZ[_0x5bbe60('0x176')]['Settings'][_0x5bbe60('0x2b7')];for(const _0x17c624 of _0x4f1374){if(_0x5bbe60('0x493')===_0x5bbe60('0x493')){const _0x354cdd=_0x17c624['FunctionName'][_0x5bbe60('0x2e6')](/[ ]/g,''),_0x35e151=_0x17c624[_0x5bbe60('0x1a1')];VisuMZ[_0x5bbe60('0x176')]['createJsQuickFunction'](_0x354cdd,_0x35e151);}else{function _0x2eacc0(){const _0x110b94=_0x5bbe60;return _0x50ed26[_0x110b94('0x594')][_0x110b94('0x351')][_0x110b94('0x2ca')](this);}}}},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x1e4')]=function(_0x25032b,_0x3d2270){const _0x1ec188=_0x43e5ad;if(!!window[_0x25032b]){if($gameTemp[_0x1ec188('0x17e')]())console['log'](_0x1ec188('0x3e7')[_0x1ec188('0x417')](_0x25032b));}const _0x3cc96e='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x1ec188('0x417')](_0x25032b,_0x3d2270);window[_0x25032b]=new Function(_0x3cc96e);},Scene_Boot['prototype'][_0x43e5ad('0x319')]=function(){const _0x2596e4=_0x43e5ad,_0x54697a=VisuMZ[_0x2596e4('0x176')][_0x2596e4('0x117')]['CustomParam'];if(!_0x54697a)return;for(const _0x359ae4 of _0x54697a){if(!_0x359ae4)continue;VisuMZ['CoreEngine'][_0x2596e4('0x53f')](_0x359ae4);}},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x3e9')]={},VisuMZ['CoreEngine'][_0x43e5ad('0x354')]={},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x2bc')]={},VisuMZ['CoreEngine'][_0x43e5ad('0x5ce')]={},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x53f')]=function(_0x404305){const _0x13248e=_0x43e5ad,_0x5652c7=_0x404305['Abbreviation'],_0x3f6f1a=_0x404305[_0x13248e('0x3f2')],_0xf4b82e=_0x404305[_0x13248e('0x604')],_0x16e208=_0x404305[_0x13248e('0x24b')],_0x30fc4b=new Function(_0x404305[_0x13248e('0xa7')]);VisuMZ['CoreEngine'][_0x13248e('0x3e9')][_0x5652c7[_0x13248e('0x545')]()['trim']()]=_0x3f6f1a,VisuMZ[_0x13248e('0x176')]['CustomParamIcons'][_0x5652c7[_0x13248e('0x545')]()['trim']()]=_0xf4b82e,VisuMZ['CoreEngine'][_0x13248e('0x2bc')][_0x5652c7[_0x13248e('0x545')]()[_0x13248e('0x5f2')]()]=_0x16e208,VisuMZ[_0x13248e('0x176')][_0x13248e('0x5ce')][_0x5652c7['toUpperCase']()[_0x13248e('0x5f2')]()]=_0x5652c7,Object[_0x13248e('0x95')](Game_BattlerBase[_0x13248e('0x4a4')],_0x5652c7,{'get'(){const _0x487c7c=_0x13248e;if(_0x487c7c('0x398')===_0x487c7c('0x2b2')){function _0xd5017(){const _0x4b0408=_0x487c7c;return this[_0x4b0408('0x5b5')]&&this['_pageupButton'][_0x4b0408('0x256')]?_0x11028b[_0x4b0408('0x46')]:'';}}else{const _0x5a01de=_0x30fc4b[_0x487c7c('0x2ca')](this);return _0x16e208==='integer'?Math[_0x487c7c('0x5e2')](_0x5a01de):_0x5a01de;}}});},VisuMZ['CoreEngine'][_0x43e5ad('0x317')]=Graphics[_0x43e5ad('0x1d6')],Graphics[_0x43e5ad('0x1d6')]=function(){const _0x128d29=_0x43e5ad;switch(VisuMZ[_0x128d29('0x176')][_0x128d29('0x117')][_0x128d29('0x32')][_0x128d29('0x3a0')]){case'stretch':return!![];case'normal':return![];default:return VisuMZ['CoreEngine'][_0x128d29('0x317')]['call'](this);}},VisuMZ[_0x43e5ad('0x176')]['Graphics_printError']=Graphics[_0x43e5ad('0x1ee')],Graphics['printError']=function(_0x10c52b,_0x46aeec,_0x1d92a8=null){const _0x5d5ac7=_0x43e5ad;VisuMZ[_0x5d5ac7('0x176')][_0x5d5ac7('0x30e')]['call'](this,_0x10c52b,_0x46aeec,_0x1d92a8),VisuMZ[_0x5d5ac7('0x3fb')](![]);},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x5f4')]=Graphics[_0x43e5ad('0x499')],Graphics['_centerElement']=function(_0x16ea0f){const _0x198c9d=_0x43e5ad;VisuMZ['CoreEngine'][_0x198c9d('0x5f4')][_0x198c9d('0x2ca')](this,_0x16ea0f),this['_centerElementCoreEngine'](_0x16ea0f);},Graphics[_0x43e5ad('0x10d')]=function(_0x30bb04){const _0x2aa949=_0x43e5ad;if(VisuMZ[_0x2aa949('0x176')][_0x2aa949('0x117')]['QoL'][_0x2aa949('0x15e')]){if(_0x2aa949('0x214')===_0x2aa949('0x214'))_0x30bb04[_0x2aa949('0x3bd')][_0x2aa949('0x525')]=_0x2aa949('0x61');else{function _0x5a48f8(){const _0x23bc4b=_0x2aa949;this[_0x23bc4b('0x5bc')]['x']=_0x150bd8[_0x23bc4b('0x5bc')]()['x'],this[_0x23bc4b('0x5bc')]['y']=_0x540da2['anchor']()['y'];}}}if(VisuMZ['CoreEngine'][_0x2aa949('0x117')][_0x2aa949('0x32')]['PixelateImageRendering']){if('YKmjw'!=='YKmjw'){function _0x5a691e(){const _0x22583f=_0x2aa949;_0x12f2a2[_0x22583f('0x176')]['Bitmap_blt'][_0x22583f('0x2ca')](this,_0x1d2fa6,_0x511400,_0x498d82,_0x1bd2e,_0x54d802,_0x24358f,_0x2861be,_0x249064,_0x14dc61),this[_0x22583f('0x181')]();}}else _0x30bb04[_0x2aa949('0x3bd')][_0x2aa949('0x1a6')]='pixelated';}},Bitmap[_0x43e5ad('0x4a4')]['markCoreEngineModified']=function(){const _0x3b06a9=_0x43e5ad;this[_0x3b06a9('0x1af')]=!![];},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x51f')]=Sprite['prototype'][_0x43e5ad('0x549')],Sprite[_0x43e5ad('0x4a4')]['destroy']=function(){const _0x30d64d=_0x43e5ad;VisuMZ[_0x30d64d('0x176')][_0x30d64d('0x51f')][_0x30d64d('0x2ca')](this),this[_0x30d64d('0x46e')]();},Sprite['prototype'][_0x43e5ad('0x46e')]=function(){const _0x1578d8=_0x43e5ad;if(!this[_0x1578d8('0x529')])return;if(!this['bitmap']['_customModified'])return;this[_0x1578d8('0x529')][_0x1578d8('0x2f4')]&&!this[_0x1578d8('0x59a')][_0x1578d8('0x2f4')][_0x1578d8('0x52b')]&&this[_0x1578d8('0x529')][_0x1578d8('0x549')]();},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x53a')]=Bitmap['prototype'][_0x43e5ad('0x5d6')],Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x5d6')]=function(_0x3f1f25,_0x1f8622){const _0x277695=_0x43e5ad;VisuMZ['CoreEngine']['Bitmap_resize'][_0x277695('0x2ca')](this,_0x3f1f25,_0x1f8622),this[_0x277695('0x181')]();},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x57b')]=Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x4ad')],Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x4ad')]=function(_0x32650d,_0x3669f0,_0xd76861,_0x34d0ec,_0x1f5190,_0x147439,_0x3770f9,_0x28b42e,_0x3df57c){const _0x2f867a=_0x43e5ad;VisuMZ[_0x2f867a('0x176')]['Bitmap_blt']['call'](this,_0x32650d,_0x3669f0,_0xd76861,_0x34d0ec,_0x1f5190,_0x147439,_0x3770f9,_0x28b42e,_0x3df57c),this[_0x2f867a('0x181')]();},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x103')]=Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0xec')],Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0xec')]=function(_0x57a71a,_0x3c50f0,_0x3055ab,_0x42cc7a){const _0x59c2db=_0x43e5ad;VisuMZ[_0x59c2db('0x176')][_0x59c2db('0x103')]['call'](this,_0x57a71a,_0x3c50f0,_0x3055ab,_0x42cc7a),this['markCoreEngineModified']();},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x292')]=Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0xe2')],Bitmap[_0x43e5ad('0x4a4')]['fillRect']=function(_0x5d8be6,_0x4e37d2,_0x36dd91,_0x14ecc1,_0x379337){const _0x5a8db0=_0x43e5ad;VisuMZ[_0x5a8db0('0x176')][_0x5a8db0('0x292')]['call'](this,_0x5d8be6,_0x4e37d2,_0x36dd91,_0x14ecc1,_0x379337),this[_0x5a8db0('0x181')]();},VisuMZ['CoreEngine'][_0x43e5ad('0x48d')]=Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x58f')],Bitmap[_0x43e5ad('0x4a4')]['strokeRect']=function(_0x1d34e0,_0x3f3967,_0xacf2f,_0x52a884,_0x2740ab){const _0x4826d9=_0x43e5ad;VisuMZ[_0x4826d9('0x176')][_0x4826d9('0x48d')][_0x4826d9('0x2ca')](this,_0x1d34e0,_0x3f3967,_0xacf2f,_0x52a884,_0x2740ab),this['markCoreEngineModified']();},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x2ec')]=Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x557')],Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x557')]=function(_0x2968ba,_0xf34955,_0x5ad8d5,_0x117d8b,_0x5c602b,_0x1473c1,_0x25d565){const _0x21f2ae=_0x43e5ad;VisuMZ[_0x21f2ae('0x176')]['Bitmap_gradientFillRect'][_0x21f2ae('0x2ca')](this,_0x2968ba,_0xf34955,_0x5ad8d5,_0x117d8b,_0x5c602b,_0x1473c1,_0x25d565),this[_0x21f2ae('0x181')]();},VisuMZ['CoreEngine']['Bitmap_drawCircle']=Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x310')],Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x310')]=function(_0x4d8df6,_0x246114,_0x4b6c0b,_0x2263f4){const _0x13180e=_0x43e5ad;VisuMZ[_0x13180e('0x176')]['Bitmap_drawCircle'][_0x13180e('0x2ca')](this,_0x4d8df6,_0x246114,_0x4b6c0b,_0x2263f4),this[_0x13180e('0x181')]();},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x427')]=Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x151')],Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x151')]=function(_0x30b562,_0x240d0c,_0x139a29,_0x499cfa,_0x30270d,_0x3ef4ed){const _0x4b7793=_0x43e5ad;VisuMZ[_0x4b7793('0x176')]['Bitmap_drawText'][_0x4b7793('0x2ca')](this,_0x30b562,_0x240d0c,_0x139a29,_0x499cfa,_0x30270d,_0x3ef4ed),this[_0x4b7793('0x181')]();},VisuMZ['CoreEngine'][_0x43e5ad('0x19d')]=Bitmap[_0x43e5ad('0x4a4')][_0x43e5ad('0x2cb')],Bitmap[_0x43e5ad('0x4a4')]['_drawTextOutline']=function(_0x42cdcc,_0x12505d,_0x11a748,_0x25b470){const _0x2d04f6=_0x43e5ad;if(VisuMZ[_0x2d04f6('0x176')][_0x2d04f6('0x117')]['QoL'][_0x2d04f6('0x460')]){if(_0x2d04f6('0x3c7')!==_0x2d04f6('0x3c7')){function _0x44b898(){_0x1ada4e+=_0x1ec516(_0x20e92e);}}else this[_0x2d04f6('0x2b3')](_0x42cdcc,_0x12505d,_0x11a748,_0x25b470);}else{if(_0x2d04f6('0x426')==='GQgoX')VisuMZ[_0x2d04f6('0x176')][_0x2d04f6('0x19d')][_0x2d04f6('0x2ca')](this,_0x42cdcc,_0x12505d,_0x11a748,_0x25b470);else{function _0x4c4fa0(){const _0x201c04=_0x2d04f6;_0xc74d5c[_0x201c04('0x176')]['Window_Gold_refresh']['call'](this);}}}},Bitmap['prototype']['_drawTextShadow']=function(_0x1ad747,_0x1cd10e,_0x12d05b,_0x5941d7){const _0x512087=_0x43e5ad,_0x5c4f48=this[_0x512087('0x2d3')];_0x5c4f48[_0x512087('0x2e')]=this[_0x512087('0x321')],_0x5c4f48['fillText'](_0x1ad747,_0x1cd10e+0x2,_0x12d05b+0x2,_0x5941d7);},VisuMZ[_0x43e5ad('0x176')]['Tilemap_addShadow']=Tilemap[_0x43e5ad('0x4a4')][_0x43e5ad('0x27')],Tilemap[_0x43e5ad('0x4a4')][_0x43e5ad('0x27')]=function(_0x5ed837,_0x4a8825,_0x35bfbd,_0x467f7f){const _0xf0bb2c=_0x43e5ad;if($gameMap&&$gameMap[_0xf0bb2c('0x485')]())return;VisuMZ[_0xf0bb2c('0x176')][_0xf0bb2c('0x33c')][_0xf0bb2c('0x2ca')](this,_0x5ed837,_0x4a8825,_0x35bfbd,_0x467f7f);},Tilemap[_0x43e5ad('0x41c')][_0x43e5ad('0x4a4')][_0x43e5ad('0x24a')]=function(){const _0x22820b=_0x43e5ad;this[_0x22820b('0x202')]();for(let _0x254a5c=0x0;_0x254a5c<Tilemap[_0x22820b('0x5a6')][_0x22820b('0x337')];_0x254a5c++){if(_0x22820b('0xaf')===_0x22820b('0x5cb')){function _0x156ff2(){_0xbc3323+=_0x4fd092(_0x5cf849);}}else{const _0x2798ef=new PIXI[(_0x22820b('0x23a'))]();_0x2798ef[_0x22820b('0x1ed')](0x800,0x800),VisuMZ['CoreEngine']['Settings'][_0x22820b('0x32')]['PixelateImageRendering']&&(_0x2798ef[_0x22820b('0xaa')]=PIXI[_0x22820b('0x10a')][_0x22820b('0x295')]),this['_internalTextures']['push'](_0x2798ef);}}},WindowLayer[_0x43e5ad('0x4a4')][_0x43e5ad('0x9f')]=function(){const _0x3c0c3b=_0x43e5ad;return SceneManager&&SceneManager[_0x3c0c3b('0x240')]?SceneManager[_0x3c0c3b('0x240')][_0x3c0c3b('0x1e6')]():!![];},VisuMZ[_0x43e5ad('0x176')]['WindowLayer_render']=WindowLayer['prototype'][_0x43e5ad('0x597')],WindowLayer[_0x43e5ad('0x4a4')][_0x43e5ad('0x597')]=function render(_0x194de7){const _0x260f7e=_0x43e5ad;this[_0x260f7e('0x9f')]()?VisuMZ[_0x260f7e('0x176')][_0x260f7e('0xdc')][_0x260f7e('0x2ca')](this,_0x194de7):this['renderNoMask'](_0x194de7);},WindowLayer[_0x43e5ad('0x4a4')]['renderNoMask']=function render(_0x2c8c34){const _0x1fe106=_0x43e5ad;if(!this['visible'])return;const _0x35cfe2=new PIXI[(_0x1fe106('0xbb'))](),_0x300bd2=_0x2c8c34['gl'],_0x122242=this[_0x1fe106('0x45')][_0x1fe106('0x4a7')]();_0x2c8c34[_0x1fe106('0x588')][_0x1fe106('0x5f')](),_0x35cfe2[_0x1fe106('0x5a3')]=this[_0x1fe106('0x5a3')],_0x2c8c34[_0x1fe106('0x20e')][_0x1fe106('0xda')](),_0x300bd2['enable'](_0x300bd2[_0x1fe106('0x2ea')]);while(_0x122242[_0x1fe106('0x1d9')]>0x0){const _0x14697d=_0x122242['shift']();_0x14697d[_0x1fe106('0x9e')]&&_0x14697d[_0x1fe106('0x256')]&&_0x14697d[_0x1fe106('0x5a5')]>0x0&&(_0x300bd2[_0x1fe106('0x58')](_0x300bd2[_0x1fe106('0x45e')],0x0,~0x0),_0x300bd2[_0x1fe106('0x116')](_0x300bd2[_0x1fe106('0x12d')],_0x300bd2['KEEP'],_0x300bd2[_0x1fe106('0x12d')]),_0x14697d['render'](_0x2c8c34),_0x2c8c34[_0x1fe106('0x20e')][_0x1fe106('0xda')](),_0x35cfe2[_0x1fe106('0x598')](),_0x300bd2['stencilFunc'](_0x300bd2[_0x1fe106('0xbf')],0x1,~0x0),_0x300bd2['stencilOp'](_0x300bd2[_0x1fe106('0x546')],_0x300bd2[_0x1fe106('0x546')],_0x300bd2[_0x1fe106('0x546')]),_0x300bd2['blendFunc'](_0x300bd2[_0x1fe106('0x194')],_0x300bd2[_0x1fe106('0x7f')]),_0x35cfe2[_0x1fe106('0x597')](_0x2c8c34),_0x2c8c34[_0x1fe106('0x20e')][_0x1fe106('0xda')](),_0x300bd2[_0x1fe106('0x22a')](_0x300bd2[_0x1fe106('0x7f')],_0x300bd2[_0x1fe106('0x246')]));}_0x300bd2[_0x1fe106('0x5c')](_0x300bd2[_0x1fe106('0x2ea')]),_0x300bd2[_0x1fe106('0x598')](_0x300bd2[_0x1fe106('0x2aa')]),_0x300bd2['clearStencil'](0x0),_0x2c8c34[_0x1fe106('0x20e')][_0x1fe106('0xda')]();for(const _0x5d7e30 of this['children']){if(!_0x5d7e30[_0x1fe106('0x9e')]&&_0x5d7e30[_0x1fe106('0x256')]){if('fGchQ'==='YWhUK'){function _0x58689b(){const _0x151871=_0x1fe106;_0x1ac2d5-=_0x4b5336[_0x151871('0x4a4')]['lineHeight']();}}else _0x5d7e30[_0x1fe106('0x597')](_0x2c8c34);}}_0x2c8c34[_0x1fe106('0x20e')][_0x1fe106('0xda')]();},DataManager[_0x43e5ad('0x414')]=function(_0x1e401e){const _0x334ce9=_0x43e5ad;return this[_0x334ce9('0x517')](_0x1e401e)&&_0x1e401e['itypeId']===0x2;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x18c')]=DataManager['setupNewGame'],DataManager['setupNewGame']=function(){const _0x34340b=_0x43e5ad;VisuMZ[_0x34340b('0x176')]['DataManager_setupNewGame'][_0x34340b('0x2ca')](this),this[_0x34340b('0x461')]();},DataManager[_0x43e5ad('0x461')]=function(){const _0x51a80b=_0x43e5ad;if($gameTemp[_0x51a80b('0x17e')]()){if(_0x51a80b('0x41a')===_0x51a80b('0x5bf')){function _0x2c130e(){const _0x2bf740=_0x51a80b,_0x3ad106=_0x78e084[_0x2bf740('0x433')]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x2bf740('0x151')](_0x47f851[_0x2bf740('0x433')](),_0x14f7f2,_0x3ba9f6,_0x15a801);}}else{const _0x2493e0=VisuMZ[_0x51a80b('0x176')]['Settings']['QoL'][_0x51a80b('0x155')];if(_0x2493e0>0x0)$gameTemp[_0x51a80b('0xe')](_0x2493e0);}}},TextManager[_0x43e5ad('0x4b1')]=['','','',_0x43e5ad('0x30c'),'','',_0x43e5ad('0x2e4'),'',_0x43e5ad('0x1a4'),_0x43e5ad('0x49c'),'','',_0x43e5ad('0x5d1'),_0x43e5ad('0x53b'),_0x43e5ad('0x24c'),'','SHIFT',_0x43e5ad('0x4cc'),_0x43e5ad('0x2df'),_0x43e5ad('0x231'),_0x43e5ad('0x84'),_0x43e5ad('0x121'),_0x43e5ad('0x33b'),'JUNJA',_0x43e5ad('0x488'),_0x43e5ad('0x208'),'',_0x43e5ad('0x5d9'),_0x43e5ad('0x5fb'),_0x43e5ad('0x537'),_0x43e5ad('0x4fa'),_0x43e5ad('0xcf'),_0x43e5ad('0x5c5'),_0x43e5ad('0x475'),_0x43e5ad('0x5e7'),'END','HOME',_0x43e5ad('0x56c'),'UP','RIGHT',_0x43e5ad('0x14f'),_0x43e5ad('0x5cd'),'PRINT',_0x43e5ad('0x432'),_0x43e5ad('0x1cf'),_0x43e5ad('0xfb'),_0x43e5ad('0x12a'),'','0','1','2','3','4','5','6','7','8','9',_0x43e5ad('0x100'),_0x43e5ad('0x514'),'LESS_THAN',_0x43e5ad('0x5c7'),_0x43e5ad('0x418'),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x43e5ad('0x5b1'),'',_0x43e5ad('0x366'),'','SLEEP',_0x43e5ad('0xff'),_0x43e5ad('0x4b4'),_0x43e5ad('0x576'),_0x43e5ad('0x173'),_0x43e5ad('0x3bc'),_0x43e5ad('0x2d8'),'NUMPAD6',_0x43e5ad('0x4ce'),_0x43e5ad('0x445'),_0x43e5ad('0x3c2'),_0x43e5ad('0x145'),_0x43e5ad('0x1a5'),'SEPARATOR','SUBTRACT',_0x43e5ad('0x3b1'),_0x43e5ad('0xe4'),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x43e5ad('0x80'),'F12',_0x43e5ad('0x353'),_0x43e5ad('0x1ce'),_0x43e5ad('0x1ac'),'F16',_0x43e5ad('0x122'),'F18',_0x43e5ad('0x31'),_0x43e5ad('0x462'),'F21',_0x43e5ad('0x5b'),_0x43e5ad('0x25e'),'F24','','','','','','','','','NUM_LOCK',_0x43e5ad('0x34'),_0x43e5ad('0x3f4'),_0x43e5ad('0x300'),_0x43e5ad('0x263'),_0x43e5ad('0x377'),_0x43e5ad('0x192'),'','','','','','','','','',_0x43e5ad('0xad'),_0x43e5ad('0x18f'),'DOUBLE_QUOTE',_0x43e5ad('0x44d'),_0x43e5ad('0x276'),'PERCENT',_0x43e5ad('0x12'),_0x43e5ad('0x93'),_0x43e5ad('0x177'),_0x43e5ad('0x99'),_0x43e5ad('0x48f'),_0x43e5ad('0xf2'),_0x43e5ad('0x512'),'HYPHEN_MINUS',_0x43e5ad('0x5fa'),_0x43e5ad('0x220'),_0x43e5ad('0x2b9'),'','','','','VOLUME_MUTE',_0x43e5ad('0x211'),'VOLUME_UP','','',_0x43e5ad('0x514'),_0x43e5ad('0x5c7'),_0x43e5ad('0x415'),_0x43e5ad('0x74'),_0x43e5ad('0x329'),'SLASH',_0x43e5ad('0xe6'),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x43e5ad('0x4b2'),_0x43e5ad('0x224'),_0x43e5ad('0x29e'),_0x43e5ad('0x15f'),'',_0x43e5ad('0x3c9'),_0x43e5ad('0x19c'),'','WIN_ICO_HELP',_0x43e5ad('0x11a'),'',_0x43e5ad('0x29c'),'','',_0x43e5ad('0x552'),_0x43e5ad('0x376'),_0x43e5ad('0x24'),_0x43e5ad('0x35a'),_0x43e5ad('0x364'),_0x43e5ad('0x539'),'WIN_OEM_CUSEL','WIN_OEM_ATTN',_0x43e5ad('0x17b'),_0x43e5ad('0x29'),'WIN_OEM_AUTO',_0x43e5ad('0x363'),_0x43e5ad('0x455'),'ATTN',_0x43e5ad('0x5c3'),'EXSEL',_0x43e5ad('0x2fd'),_0x43e5ad('0x14b'),_0x43e5ad('0x2ba'),'',_0x43e5ad('0x1d8'),_0x43e5ad('0x57a'),''],TextManager[_0x43e5ad('0x29a')]=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')]['ButtonAssist'][_0x43e5ad('0xdd')],TextManager[_0x43e5ad('0x20d')]=VisuMZ['CoreEngine'][_0x43e5ad('0x117')]['ButtonAssist'][_0x43e5ad('0x502')],TextManager[_0x43e5ad('0x46')]=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')][_0x43e5ad('0x3e0')][_0x43e5ad('0x9c')],VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x1c6')]=TextManager[_0x43e5ad('0x582')],TextManager[_0x43e5ad('0x582')]=function(_0x258d48){const _0x33e261=_0x43e5ad;return typeof _0x258d48===_0x33e261('0x358')?VisuMZ[_0x33e261('0x176')][_0x33e261('0x1c6')]['call'](this,_0x258d48):this['paramName'](_0x258d48);},TextManager[_0x43e5ad('0x516')]=function(_0x37f611){const _0x229834=_0x43e5ad;_0x37f611=String(_0x37f611||'')[_0x229834('0x545')]();const _0x3a9291=VisuMZ[_0x229834('0x176')]['Settings'][_0x229834('0x393')];if(_0x37f611===_0x229834('0x81'))return $dataSystem[_0x229834('0x1ae')][_0x229834('0x535')][0x0];if(_0x37f611==='MAXMP')return $dataSystem[_0x229834('0x1ae')][_0x229834('0x535')][0x1];if(_0x37f611===_0x229834('0x38d'))return $dataSystem['terms'][_0x229834('0x535')][0x2];if(_0x37f611===_0x229834('0x1f3'))return $dataSystem[_0x229834('0x1ae')][_0x229834('0x535')][0x3];if(_0x37f611===_0x229834('0x49a'))return $dataSystem[_0x229834('0x1ae')]['params'][0x4];if(_0x37f611==='MDF')return $dataSystem[_0x229834('0x1ae')]['params'][0x5];if(_0x37f611===_0x229834('0x381'))return $dataSystem[_0x229834('0x1ae')][_0x229834('0x535')][0x6];if(_0x37f611==='LUK')return $dataSystem[_0x229834('0x1ae')][_0x229834('0x535')][0x7];if(_0x37f611===_0x229834('0x561'))return _0x3a9291[_0x229834('0xcb')];if(_0x37f611===_0x229834('0x568'))return _0x3a9291[_0x229834('0x2c2')];if(_0x37f611===_0x229834('0x23c'))return _0x3a9291['XParamVocab2'];if(_0x37f611===_0x229834('0x3bb'))return _0x3a9291['XParamVocab3'];if(_0x37f611==='MEV')return _0x3a9291[_0x229834('0x596')];if(_0x37f611===_0x229834('0x78'))return _0x3a9291[_0x229834('0x600')];if(_0x37f611===_0x229834('0x12c'))return _0x3a9291[_0x229834('0x3ee')];if(_0x37f611===_0x229834('0x37'))return _0x3a9291[_0x229834('0x3f')];if(_0x37f611===_0x229834('0x8d'))return _0x3a9291['XParamVocab8'];if(_0x37f611==='TRG')return _0x3a9291['XParamVocab9'];if(_0x37f611===_0x229834('0x5e'))return _0x3a9291[_0x229834('0x281')];if(_0x37f611==='GRD')return _0x3a9291[_0x229834('0x68')];if(_0x37f611===_0x229834('0x1fa'))return _0x3a9291['SParamVocab2'];if(_0x37f611===_0x229834('0x280'))return _0x3a9291[_0x229834('0x566')];if(_0x37f611==='MCR')return _0x3a9291[_0x229834('0x58e')];if(_0x37f611===_0x229834('0x244'))return _0x3a9291['SParamVocab5'];if(_0x37f611==='PDR')return _0x3a9291['SParamVocab6'];if(_0x37f611==='MDR')return _0x3a9291[_0x229834('0x6')];if(_0x37f611==='FDR')return _0x3a9291['SParamVocab8'];if(_0x37f611==='EXR')return _0x3a9291['SParamVocab9'];if(VisuMZ[_0x229834('0x176')]['CustomParamNames'][_0x37f611])return VisuMZ['CoreEngine']['CustomParamNames'][_0x37f611];return'';},TextManager[_0x43e5ad('0xce')]=function(_0x5bca2a){const _0x27788a=_0x43e5ad;if(_0x5bca2a===_0x27788a('0x1b'))_0x5bca2a=_0x27788a('0xd8');let _0x257541=[];for(let _0x2c1300 in Input[_0x27788a('0x288')]){if(_0x27788a('0x2d0')!==_0x27788a('0x2d0')){function _0x10c69d(){const _0x302db6=_0x27788a;_0x29f7d3[_0x302db6('0x176')][_0x302db6('0x117')][_0x302db6('0x245')][_0x302db6('0x3fd')][_0x302db6('0xb8')][_0x302db6('0x2ca')](this);if(_0xe835b2[_0x302db6('0x380')]!==''&&_0x45020b[_0x302db6('0x380')]!==_0x302db6('0x2ce'))this[_0x302db6('0x2e5')]();if(_0x2b715c[_0x302db6('0x1')]!==''&&_0x43b050[_0x302db6('0x1')]!==_0x302db6('0xd1'))this[_0x302db6('0x149')]();}}else{_0x2c1300=Number(_0x2c1300);if(_0x2c1300>=0x60&&_0x2c1300<=0x69)continue;if([0x12,0x20][_0x27788a('0x56b')](_0x2c1300))continue;if(_0x5bca2a===Input[_0x27788a('0x288')][_0x2c1300]){if(_0x27788a('0x430')!==_0x27788a('0x47'))_0x257541[_0x27788a('0x3e4')](_0x2c1300);else{function _0x2f7613(){_0x4dfa81=0x0;}}}}}for(let _0x274e98=0x0;_0x274e98<_0x257541[_0x27788a('0x1d9')];_0x274e98++){if('eMWTa'==='eMWTa')_0x257541[_0x274e98]=TextManager[_0x27788a('0x4b1')][_0x257541[_0x274e98]];else{function _0x243d33(){const _0x1b7d49=_0x27788a;return _0x10dccf['layoutSettings'][_0x1b7d49('0x36f')][_0x1b7d49('0x2ca')](this);}}}return this[_0x27788a('0x5')](_0x257541);},TextManager[_0x43e5ad('0x5')]=function(_0x23a8d0){const _0x27c899=_0x43e5ad,_0xfc1fac=VisuMZ[_0x27c899('0x176')][_0x27c899('0x117')][_0x27c899('0x3e0')],_0xb2603b=_0xfc1fac[_0x27c899('0x480')],_0x52df83=_0x23a8d0[_0x27c899('0x327')](),_0x3a93f2=_0x27c899('0x49f')[_0x27c899('0x417')](_0x52df83);return _0xfc1fac[_0x3a93f2]?_0xfc1fac[_0x3a93f2]:_0xb2603b[_0x27c899('0x417')](_0x52df83);},TextManager['getInputMultiButtonStrings']=function(_0x1420b9,_0xc4b83b){const _0x3d245d=_0x43e5ad,_0x410b9b=VisuMZ[_0x3d245d('0x176')][_0x3d245d('0x117')][_0x3d245d('0x3e0')],_0x1e512a=_0x410b9b['MultiKeyFmt'],_0x3cd5e6=this['getInputButtonString'](_0x1420b9),_0x30408b=this[_0x3d245d('0xce')](_0xc4b83b);return _0x1e512a[_0x3d245d('0x417')](_0x3cd5e6,_0x30408b);},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x1c0')]=ColorManager['loadWindowskin'],ColorManager[_0x43e5ad('0x4c1')]=function(){const _0x1212fa=_0x43e5ad;VisuMZ[_0x1212fa('0x176')][_0x1212fa('0x1c0')][_0x1212fa('0x2ca')](this),this['_colorCache']=this['_colorCache']||{};},ColorManager[_0x43e5ad('0x5bb')]=function(_0x3b39d6,_0x341f69){const _0x7c3b14=_0x43e5ad;_0x341f69=String(_0x341f69),this['_colorCache']=this[_0x7c3b14('0x506')]||{};if(_0x341f69[_0x7c3b14('0x3eb')](/#(.*)/i)){if(_0x7c3b14('0x607')!==_0x7c3b14('0x607')){function _0x5dd892(){const _0x20ee3e=_0x7c3b14;return this[_0x20ee3e('0xeb')]();}}else this[_0x7c3b14('0x506')][_0x3b39d6]=_0x7c3b14('0xcd')[_0x7c3b14('0x417')](String(RegExp['$1']));}else this[_0x7c3b14('0x506')][_0x3b39d6]=this[_0x7c3b14('0x5c8')](Number(_0x341f69));return this[_0x7c3b14('0x506')][_0x3b39d6];},ColorManager[_0x43e5ad('0x53')]=function(_0x52ca14){const _0x9e6fbd=_0x43e5ad;return _0x52ca14=String(_0x52ca14),_0x52ca14[_0x9e6fbd('0x3eb')](/#(.*)/i)?_0x9e6fbd('0xcd')[_0x9e6fbd('0x417')](String(RegExp['$1'])):this[_0x9e6fbd('0x5c8')](Number(_0x52ca14));},ColorManager[_0x43e5ad('0x6c')]=function(){this['_colorCache']={};},ColorManager[_0x43e5ad('0x2d4')]=function(){const _0x227364=_0x43e5ad,_0x1118fa=_0x227364('0x610');this['_colorCache']=this[_0x227364('0x506')]||{};if(this['_colorCache'][_0x1118fa])return this[_0x227364('0x506')][_0x1118fa];const _0x3b0c56=VisuMZ[_0x227364('0x176')][_0x227364('0x117')][_0x227364('0x469')][_0x227364('0x2d')];return this['getColorDataFromPluginParameters'](_0x1118fa,_0x3b0c56);},ColorManager[_0x43e5ad('0x40f')]=function(){const _0xbead12=_0x43e5ad,_0x3e3f51=_0xbead12('0xab');this[_0xbead12('0x506')]=this[_0xbead12('0x506')]||{};if(this[_0xbead12('0x506')][_0x3e3f51])return this[_0xbead12('0x506')][_0x3e3f51];const _0x5248d2=VisuMZ['CoreEngine']['Settings'][_0xbead12('0x469')][_0xbead12('0x1db')];return this[_0xbead12('0x5bb')](_0x3e3f51,_0x5248d2);},ColorManager[_0x43e5ad('0x330')]=function(){const _0x4baff8=_0x43e5ad,_0x574b7b=_0x4baff8('0x39');this[_0x4baff8('0x506')]=this['_colorCache']||{};if(this['_colorCache'][_0x574b7b])return this['_colorCache'][_0x574b7b];const _0x5736c2=VisuMZ[_0x4baff8('0x176')][_0x4baff8('0x117')][_0x4baff8('0x469')][_0x4baff8('0x72')];return this[_0x4baff8('0x5bb')](_0x574b7b,_0x5736c2);},ColorManager[_0x43e5ad('0x9')]=function(){const _0x3be4f8=_0x43e5ad,_0x10eabc='_stored_deathColor';this['_colorCache']=this[_0x3be4f8('0x506')]||{};if(this[_0x3be4f8('0x506')][_0x10eabc])return this[_0x3be4f8('0x506')][_0x10eabc];const _0x2ee17b=VisuMZ[_0x3be4f8('0x176')][_0x3be4f8('0x117')][_0x3be4f8('0x469')][_0x3be4f8('0x75')];return this['getColorDataFromPluginParameters'](_0x10eabc,_0x2ee17b);},ColorManager[_0x43e5ad('0x18')]=function(){const _0x4b9877=_0x43e5ad,_0x1e05cf='_stored_gaugeBackColor';this[_0x4b9877('0x506')]=this[_0x4b9877('0x506')]||{};if(this[_0x4b9877('0x506')][_0x1e05cf])return this[_0x4b9877('0x506')][_0x1e05cf];const _0x2867dd=VisuMZ[_0x4b9877('0x176')]['Settings'][_0x4b9877('0x469')]['ColorGaugeBack'];return this[_0x4b9877('0x5bb')](_0x1e05cf,_0x2867dd);},ColorManager[_0x43e5ad('0x35b')]=function(){const _0x18d9dd=_0x43e5ad,_0x566f12='_stored_hpGaugeColor1';this[_0x18d9dd('0x506')]=this[_0x18d9dd('0x506')]||{};if(this[_0x18d9dd('0x506')][_0x566f12])return this[_0x18d9dd('0x506')][_0x566f12];const _0x14daff=VisuMZ[_0x18d9dd('0x176')][_0x18d9dd('0x117')]['Color'][_0x18d9dd('0x5ee')];return this[_0x18d9dd('0x5bb')](_0x566f12,_0x14daff);},ColorManager[_0x43e5ad('0x2c0')]=function(){const _0x1fd534=_0x43e5ad,_0x334ba9=_0x1fd534('0x347');this[_0x1fd534('0x506')]=this[_0x1fd534('0x506')]||{};if(this[_0x1fd534('0x506')][_0x334ba9])return this[_0x1fd534('0x506')][_0x334ba9];const _0x5359b2=VisuMZ[_0x1fd534('0x176')]['Settings'][_0x1fd534('0x469')][_0x1fd534('0x1b3')];return this['getColorDataFromPluginParameters'](_0x334ba9,_0x5359b2);},ColorManager[_0x43e5ad('0x16c')]=function(){const _0x3f98b9=_0x43e5ad,_0x3af495=_0x3f98b9('0x374');this['_colorCache']=this[_0x3f98b9('0x506')]||{};if(this[_0x3f98b9('0x506')][_0x3af495])return this[_0x3f98b9('0x506')][_0x3af495];const _0x56d628=VisuMZ[_0x3f98b9('0x176')][_0x3f98b9('0x117')][_0x3f98b9('0x469')][_0x3f98b9('0x1b9')];return this[_0x3f98b9('0x5bb')](_0x3af495,_0x56d628);},ColorManager['mpGaugeColor2']=function(){const _0x4b7708=_0x43e5ad,_0x47ea84=_0x4b7708('0x1d');this[_0x4b7708('0x506')]=this[_0x4b7708('0x506')]||{};if(this[_0x4b7708('0x506')][_0x47ea84])return this[_0x4b7708('0x506')][_0x47ea84];const _0x73e297=VisuMZ[_0x4b7708('0x176')]['Settings'][_0x4b7708('0x469')][_0x4b7708('0x20a')];return this[_0x4b7708('0x5bb')](_0x47ea84,_0x73e297);},ColorManager[_0x43e5ad('0x232')]=function(){const _0x3a654d=_0x43e5ad,_0x7f799b='_stored_mpCostColor';this['_colorCache']=this[_0x3a654d('0x506')]||{};if(this['_colorCache'][_0x7f799b])return this[_0x3a654d('0x506')][_0x7f799b];const _0x48f8c1=VisuMZ['CoreEngine'][_0x3a654d('0x117')][_0x3a654d('0x469')][_0x3a654d('0x477')];return this[_0x3a654d('0x5bb')](_0x7f799b,_0x48f8c1);},ColorManager['powerUpColor']=function(){const _0x5d066f=_0x43e5ad,_0xf118ad=_0x5d066f('0x50b');this['_colorCache']=this['_colorCache']||{};if(this[_0x5d066f('0x506')][_0xf118ad])return this[_0x5d066f('0x506')][_0xf118ad];const _0x4006f5=VisuMZ[_0x5d066f('0x176')][_0x5d066f('0x117')]['Color'][_0x5d066f('0x4c9')];return this[_0x5d066f('0x5bb')](_0xf118ad,_0x4006f5);},ColorManager[_0x43e5ad('0x22f')]=function(){const _0x3c08bd=_0x43e5ad,_0x4571da=_0x3c08bd('0x1fc');this[_0x3c08bd('0x506')]=this[_0x3c08bd('0x506')]||{};if(this[_0x3c08bd('0x506')][_0x4571da])return this[_0x3c08bd('0x506')][_0x4571da];const _0x51c077=VisuMZ[_0x3c08bd('0x176')][_0x3c08bd('0x117')]['Color'][_0x3c08bd('0x15c')];return this[_0x3c08bd('0x5bb')](_0x4571da,_0x51c077);},ColorManager[_0x43e5ad('0x152')]=function(){const _0x10e850=_0x43e5ad,_0x487f43='_stored_ctGaugeColor1';this[_0x10e850('0x506')]=this['_colorCache']||{};if(this[_0x10e850('0x506')][_0x487f43])return this[_0x10e850('0x506')][_0x487f43];const _0x7b248d=VisuMZ['CoreEngine'][_0x10e850('0x117')][_0x10e850('0x469')][_0x10e850('0x37b')];return this[_0x10e850('0x5bb')](_0x487f43,_0x7b248d);},ColorManager[_0x43e5ad('0x320')]=function(){const _0x8526f3=_0x43e5ad,_0x499f81=_0x8526f3('0x1b0');this[_0x8526f3('0x506')]=this[_0x8526f3('0x506')]||{};if(this[_0x8526f3('0x506')][_0x499f81])return this['_colorCache'][_0x499f81];const _0x5b9faa=VisuMZ[_0x8526f3('0x176')][_0x8526f3('0x117')][_0x8526f3('0x469')][_0x8526f3('0x25b')];return this[_0x8526f3('0x5bb')](_0x499f81,_0x5b9faa);},ColorManager[_0x43e5ad('0x3b4')]=function(){const _0x178b0f=_0x43e5ad,_0x3a631b=_0x178b0f('0x33e');this['_colorCache']=this[_0x178b0f('0x506')]||{};if(this[_0x178b0f('0x506')][_0x3a631b])return this['_colorCache'][_0x3a631b];const _0x11f97e=VisuMZ[_0x178b0f('0x176')]['Settings']['Color'][_0x178b0f('0x1f')];return this[_0x178b0f('0x5bb')](_0x3a631b,_0x11f97e);},ColorManager['tpGaugeColor2']=function(){const _0x4265e2=_0x43e5ad,_0x293f45=_0x4265e2('0x3fa');this[_0x4265e2('0x506')]=this['_colorCache']||{};if(this[_0x4265e2('0x506')][_0x293f45])return this['_colorCache'][_0x293f45];const _0x129945=VisuMZ[_0x4265e2('0x176')][_0x4265e2('0x117')][_0x4265e2('0x469')][_0x4265e2('0x450')];return this['getColorDataFromPluginParameters'](_0x293f45,_0x129945);},ColorManager[_0x43e5ad('0x454')]=function(){const _0x3742ae=_0x43e5ad,_0x2e8561=_0x3742ae('0x139');this[_0x3742ae('0x506')]=this['_colorCache']||{};if(this['_colorCache'][_0x2e8561])return this['_colorCache'][_0x2e8561];const _0xde491a=VisuMZ['CoreEngine'][_0x3742ae('0x117')][_0x3742ae('0x469')]['ColorTPCost'];return this[_0x3742ae('0x5bb')](_0x2e8561,_0xde491a);},ColorManager['pendingColor']=function(){const _0x27b8df=_0x43e5ad,_0x72aef5='_stored_pendingColor';this[_0x27b8df('0x506')]=this[_0x27b8df('0x506')]||{};if(this['_colorCache'][_0x72aef5])return this['_colorCache'][_0x72aef5];const _0x37d877=VisuMZ['CoreEngine'][_0x27b8df('0x117')][_0x27b8df('0x469')][_0x27b8df('0x443')];return this['getColorDataFromPluginParameters'](_0x72aef5,_0x37d877);},ColorManager[_0x43e5ad('0x34a')]=function(){const _0x34fede=_0x43e5ad,_0x279d04='_stored_expGaugeColor1';this[_0x34fede('0x506')]=this['_colorCache']||{};if(this[_0x34fede('0x506')][_0x279d04])return this[_0x34fede('0x506')][_0x279d04];const _0x594fe1=VisuMZ[_0x34fede('0x176')][_0x34fede('0x117')][_0x34fede('0x469')][_0x34fede('0x3ac')];return this[_0x34fede('0x5bb')](_0x279d04,_0x594fe1);},ColorManager['expGaugeColor2']=function(){const _0x214da9=_0x43e5ad,_0x1a00da=_0x214da9('0x5da');this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x1a00da])return this['_colorCache'][_0x1a00da];const _0x3321c3=VisuMZ[_0x214da9('0x176')][_0x214da9('0x117')]['Color'][_0x214da9('0x405')];return this['getColorDataFromPluginParameters'](_0x1a00da,_0x3321c3);},ColorManager[_0x43e5ad('0x346')]=function(){const _0x4cef9c=_0x43e5ad,_0x4fd9d5=_0x4cef9c('0x41');this['_colorCache']=this['_colorCache']||{};if(this[_0x4cef9c('0x506')][_0x4fd9d5])return this[_0x4cef9c('0x506')][_0x4fd9d5];const _0x3d0abc=VisuMZ['CoreEngine']['Settings'][_0x4cef9c('0x469')][_0x4cef9c('0x1c4')];return this[_0x4cef9c('0x5bb')](_0x4fd9d5,_0x3d0abc);},ColorManager[_0x43e5ad('0x18d')]=function(){const _0x2ff9d4=_0x43e5ad,_0x1eecee='_stored_maxLvGaugeColor2';this[_0x2ff9d4('0x506')]=this[_0x2ff9d4('0x506')]||{};if(this[_0x2ff9d4('0x506')][_0x1eecee])return this[_0x2ff9d4('0x506')][_0x1eecee];const _0x4d4deb=VisuMZ[_0x2ff9d4('0x176')][_0x2ff9d4('0x117')][_0x2ff9d4('0x469')][_0x2ff9d4('0x19a')];return this[_0x2ff9d4('0x5bb')](_0x1eecee,_0x4d4deb);},ColorManager[_0x43e5ad('0x37e')]=function(_0x4cffd4){const _0x56bbbc=_0x43e5ad;return VisuMZ[_0x56bbbc('0x176')][_0x56bbbc('0x117')][_0x56bbbc('0x469')][_0x56bbbc('0x4e')]['call'](this,_0x4cffd4);},ColorManager['mpColor']=function(_0x2a95dd){const _0x466406=_0x43e5ad;return VisuMZ[_0x466406('0x176')][_0x466406('0x117')][_0x466406('0x469')][_0x466406('0x42c')][_0x466406('0x2ca')](this,_0x2a95dd);},ColorManager[_0x43e5ad('0x345')]=function(_0xc0846){const _0x4fb073=_0x43e5ad;return VisuMZ[_0x4fb073('0x176')][_0x4fb073('0x117')]['Color'][_0x4fb073('0x13c')][_0x4fb073('0x2ca')](this,_0xc0846);},ColorManager[_0x43e5ad('0x13f')]=function(_0x439ff4){const _0x3734aa=_0x43e5ad;return VisuMZ['CoreEngine'][_0x3734aa('0x117')][_0x3734aa('0x469')][_0x3734aa('0x2f2')]['call'](this,_0x439ff4);},ColorManager['damageColor']=function(_0x256c2c){const _0x2dfe2d=_0x43e5ad;return VisuMZ[_0x2dfe2d('0x176')][_0x2dfe2d('0x117')][_0x2dfe2d('0x469')][_0x2dfe2d('0xe3')]['call'](this,_0x256c2c);},ColorManager[_0x43e5ad('0x321')]=function(){const _0x58e128=_0x43e5ad;return VisuMZ[_0x58e128('0x176')][_0x58e128('0x117')][_0x58e128('0x469')][_0x58e128('0x409')];},ColorManager['dimColor1']=function(){const _0x1aafd4=_0x43e5ad;return VisuMZ[_0x1aafd4('0x176')][_0x1aafd4('0x117')][_0x1aafd4('0x469')][_0x1aafd4('0x42f')];},ColorManager[_0x43e5ad('0x336')]=function(){const _0x28f5ef=_0x43e5ad;return VisuMZ[_0x28f5ef('0x176')][_0x28f5ef('0x117')][_0x28f5ef('0x469')]['DimColor2'];},ColorManager['itemBackColor1']=function(){const _0x4503bc=_0x43e5ad;return VisuMZ[_0x4503bc('0x176')][_0x4503bc('0x117')]['Color'][_0x4503bc('0x4f3')];},ColorManager[_0x43e5ad('0x2a4')]=function(){const _0x24e36f=_0x43e5ad;return VisuMZ[_0x24e36f('0x176')]['Settings']['Color'][_0x24e36f('0x210')];},SceneManager[_0x43e5ad('0x34c')]=[],VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x509')]=SceneManager[_0x43e5ad('0x56')],SceneManager[_0x43e5ad('0x56')]=function(){const _0x1be25e=_0x43e5ad;VisuMZ[_0x1be25e('0x176')]['SceneManager_initialize'][_0x1be25e('0x2ca')](this),this[_0x1be25e('0x294')]();},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0xe8')]=SceneManager[_0x43e5ad('0x49d')],SceneManager[_0x43e5ad('0x49d')]=function(_0x4b253f){const _0x399e2d=_0x43e5ad;if($gameTemp)this[_0x399e2d('0x4fe')](_0x4b253f);VisuMZ['CoreEngine'][_0x399e2d('0xe8')][_0x399e2d('0x2ca')](this,_0x4b253f);},SceneManager[_0x43e5ad('0x4fe')]=function(_0x18d54a){const _0xfdf922=_0x43e5ad;if(!_0x18d54a[_0xfdf922('0x9d')]&&!_0x18d54a[_0xfdf922('0x373')]){if(_0xfdf922('0x2b0')!==_0xfdf922('0x2b0')){function _0x163948(){const _0x5b54aa=_0xfdf922;_0xc82421[_0x5b54aa('0x4ef')]=_0x28a3f5[_0x5b54aa('0x3c0')](_0x45b28b(_0x39ee1c['$1']),_0x329e90[_0x5b54aa('0x25d')]);}}else switch(_0x18d54a[_0xfdf922('0x498')]){case 0x75:this[_0xfdf922('0x22')]();break;case 0x76:this[_0xfdf922('0x1f1')]();break;}}},SceneManager[_0x43e5ad('0x22')]=function(){const _0x119508=_0x43e5ad;if($gameTemp['isPlaytest']()&&VisuMZ[_0x119508('0x176')][_0x119508('0x117')]['QoL']['F6key']){ConfigManager[_0x119508('0x349')]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x119508('0x13e')]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x119508('0x349')]=0x0):(ConfigManager[_0x119508('0x227')]=0x64,ConfigManager[_0x119508('0x13e')]=0x64,ConfigManager[_0x119508('0x520')]=0x64,ConfigManager[_0x119508('0x349')]=0x64);ConfigManager[_0x119508('0x130')]();if(this[_0x119508('0x240')][_0x119508('0x191')]===Scene_Options){if(this[_0x119508('0x240')]['_optionsWindow'])this['_scene'][_0x119508('0x479')][_0x119508('0x611')]();if(this[_0x119508('0x240')]['_listWindow'])this[_0x119508('0x240')][_0x119508('0x2c5')]['refresh']();}}},SceneManager['playTestF7']=function(){const _0x1d1f91=_0x43e5ad;$gameTemp[_0x1d1f91('0x17e')]()&&VisuMZ[_0x1d1f91('0x176')]['Settings'][_0x1d1f91('0x32')][_0x1d1f91('0x34e')]&&($gameTemp[_0x1d1f91('0x201')]=!$gameTemp[_0x1d1f91('0x201')]);},SceneManager['initVisuMZCoreEngine']=function(){const _0xebdacf=_0x43e5ad;this['_sideButtonLayout']=![],this[_0xebdacf('0x54b')]=!VisuMZ['CoreEngine'][_0xebdacf('0x117')]['UI']['ShowButtons'];},SceneManager[_0x43e5ad('0x3aa')]=function(_0x381d17){const _0x433c7c=_0x43e5ad;VisuMZ[_0x433c7c('0x176')][_0x433c7c('0x117')]['UI'][_0x433c7c('0x247')]&&(this[_0x433c7c('0x2a7')]=_0x381d17);},SceneManager[_0x43e5ad('0x3ea')]=function(){const _0xc3d830=_0x43e5ad;return this[_0xc3d830('0x2a7')];},SceneManager[_0x43e5ad('0x4b3')]=function(){return this['_hideButtons'];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x5b6eea=_0x43e5ad;return this[_0x5b6eea('0x4b3')]()||this['isSideButtonLayout']();},VisuMZ['CoreEngine'][_0x43e5ad('0x5db')]=SceneManager[_0x43e5ad('0x4eb')],SceneManager[_0x43e5ad('0x4eb')]=function(){const _0x41c932=_0x43e5ad;if(VisuMZ[_0x41c932('0x176')][_0x41c932('0x117')][_0x41c932('0x32')]['RequireFocus']){if(_0x41c932('0xb3')!==_0x41c932('0xb3')){function _0x2a3b6d(){const _0x2108a5=_0x41c932;_0x12a9b7[_0x2108a5('0xb6')](_0x5d4f6c,_0x284f58);const _0x5450aa=_0x399642[_0x2108a5('0x24b')]||_0x2108a5('0xc9'),_0xe42f0b=_0x33ac07[_0x2108a5('0x2bf')][_0x2108a5('0x2c7')](0x1,0x9),_0x16c320=_0x229882[_0x2108a5('0x196')][_0x2108a5('0x2c7')](0x1,0x9),_0x4e395c=_0x53d734['Duration']||0x1,_0x1488ed=_0x1cd069[_0x2108a5('0x4bc')];_0x40a6b0[_0x2108a5('0x43b')](_0x5450aa),_0x212fea[_0x2108a5('0x2f7')](_0xe42f0b,_0x16c320,_0x4e395c);if(_0x1488ed){const _0xdcb1cf=_0x3a8063[_0x2108a5('0x33f')]();if(_0xdcb1cf)_0xdcb1cf['wait'](_0x4e395c);}}}else return VisuMZ[_0x41c932('0x176')][_0x41c932('0x5db')][_0x41c932('0x2ca')](this);}else return!![];},SceneManager[_0x43e5ad('0x168')]=function(_0xeb6be6){const _0x57e8b5=_0x43e5ad;if(_0xeb6be6 instanceof Error){if(_0x57e8b5('0x1b2')!=='jsbNl')this[_0x57e8b5('0x2cd')](_0xeb6be6);else{function _0x5c4c20(){const _0xc8bd06=_0x57e8b5;_0x1e5f01[_0xc8bd06('0x176')][_0xc8bd06('0x569')][_0xc8bd06('0x2ca')](this,_0x46b494);}}}else{if(_0xeb6be6 instanceof Array&&_0xeb6be6[0x0]===_0x57e8b5('0x282'))this[_0x57e8b5('0x266')](_0xeb6be6);else{if('FaVKs'===_0x57e8b5('0x4ab'))this[_0x57e8b5('0x174')](_0xeb6be6);else{function _0x251590(){return'';}}}}this[_0x57e8b5('0x46d')]();},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x96')]=BattleManager['processEscape'],BattleManager[_0x43e5ad('0x2ac')]=function(){const _0x496b9f=_0x43e5ad;if(VisuMZ[_0x496b9f('0x176')][_0x496b9f('0x117')][_0x496b9f('0x32')][_0x496b9f('0x23e')])this[_0x496b9f('0x160')]();else{if(_0x496b9f('0x86')!=='aAqAL')return VisuMZ[_0x496b9f('0x176')][_0x496b9f('0x96')][_0x496b9f('0x2ca')](this);else{function _0xa04f86(){var _0x2d3545=_0x388be3(_0x5291fe['$1'])/0x64;_0x1619b4+=_0x2d3545;}}}},BattleManager[_0x43e5ad('0x160')]=function(){const _0x30bed5=_0x43e5ad;return $gameParty['performEscape'](),SoundManager[_0x30bed5('0x56a')](),this[_0x30bed5('0x1e')](),!![];},BattleManager[_0x43e5ad('0x4c5')]=function(){const _0xc5f852=_0x43e5ad;return $gameSystem[_0xc5f852('0x21')]()>=0x1;},BattleManager[_0x43e5ad('0x487')]=function(){const _0x24de02=_0x43e5ad;return $gameSystem[_0x24de02('0x21')]()===0x1;},VisuMZ['CoreEngine']['Game_Temp_initialize']=Game_Temp[_0x43e5ad('0x4a4')][_0x43e5ad('0x56')],Game_Temp[_0x43e5ad('0x4a4')][_0x43e5ad('0x56')]=function(){const _0x261016=_0x43e5ad;VisuMZ[_0x261016('0x176')][_0x261016('0x303')][_0x261016('0x2ca')](this),this['forceOutOfPlaytest'](),this[_0x261016('0x468')]();},Game_Temp['prototype']['forceOutOfPlaytest']=function(){const _0x39bff7=_0x43e5ad;VisuMZ['CoreEngine'][_0x39bff7('0x117')][_0x39bff7('0x32')][_0x39bff7('0x521')]&&(this[_0x39bff7('0x40b')]=![]);},Game_Temp[_0x43e5ad('0x4a4')]['createFauxAnimationQueue']=function(){const _0x14de19=_0x43e5ad;this[_0x14de19('0x5b9')]=[];},Game_Temp[_0x43e5ad('0x4a4')]['requestFauxAnimation']=function(_0x486b9c,_0x8583ed,_0x10cd99,_0x1075d4){const _0x43b57e=_0x43e5ad;if(!this['showFauxAnimations']())return;_0x10cd99=_0x10cd99||![],_0x1075d4=_0x1075d4||![];if($dataAnimations[_0x8583ed]){const _0x2a73e5={'targets':_0x486b9c,'animationId':_0x8583ed,'mirror':_0x10cd99,'mute':_0x1075d4};this[_0x43b57e('0x5b9')][_0x43b57e('0x3e4')](_0x2a73e5);for(const _0x5779c0 of _0x486b9c){if('CrCSo'===_0x43b57e('0x2a2')){if(_0x5779c0[_0x43b57e('0xa3')]){if('osmqw'!==_0x43b57e('0x47e'))_0x5779c0[_0x43b57e('0xa3')]();else{function _0xd1b427(){const _0x3c0ba3=_0x43b57e,_0x20d653=_0x3c0ba3('0x374');this['_colorCache']=this[_0x3c0ba3('0x506')]||{};if(this[_0x3c0ba3('0x506')][_0x20d653])return this[_0x3c0ba3('0x506')][_0x20d653];const _0x7bc031=_0xae6c9f[_0x3c0ba3('0x176')][_0x3c0ba3('0x117')]['Color'][_0x3c0ba3('0x1b9')];return this[_0x3c0ba3('0x5bb')](_0x20d653,_0x7bc031);}}}}else{function _0x78596b(){return 0x0;}}}}},Game_Temp[_0x43e5ad('0x4a4')]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x43e5ad('0x4a4')][_0x43e5ad('0x401')]=function(){const _0x2a1411=_0x43e5ad;return this[_0x2a1411('0x5b9')][_0x2a1411('0x574')]();},Game_Temp[_0x43e5ad('0x4a4')][_0x43e5ad('0x167')]=function(_0x24660d){const _0x128b91=_0x43e5ad;this[_0x128b91('0x1a')]=_0x24660d;},Game_Temp['prototype']['getLastPluginCommandInterpreter']=function(){const _0x300d20=_0x43e5ad;return this[_0x300d20('0x1a')];},Game_Temp['prototype'][_0x43e5ad('0x17c')]=function(){this['_forcedTroopView']=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x43e5ad('0x4a4')][_0x43e5ad('0x362')]=function(_0x4a9cec){const _0x26de30=_0x43e5ad;if($gameMap&&$dataMap&&$dataMap[_0x26de30('0x47f')]){if(_0x26de30('0x1d2')===_0x26de30('0x1e8')){function _0xb3a651(){const _0x5067ec=_0x26de30;return _0x49822e[_0x5067ec('0x176')][_0x5067ec('0x2d2')][_0x5067ec('0x2ca')](this,_0x1a8e0d,_0xee64e);}}else this[_0x26de30('0x383')]($dataMap[_0x26de30('0x47f')]);}const _0x218143=$dataTroops[_0x4a9cec];_0x218143&&this[_0x26de30('0x383')](_0x218143[_0x26de30('0x2e8')]);},Game_Temp[_0x43e5ad('0x4a4')][_0x43e5ad('0x383')]=function(_0x17493b){const _0x3bd4b1=_0x43e5ad;if(!_0x17493b)return;if(_0x17493b[_0x3bd4b1('0x3eb')](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x17493b[_0x3bd4b1('0x3eb')](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x17493b[_0x3bd4b1('0x3eb')](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x3e81e5=String(RegExp['$1']);if(_0x3e81e5[_0x3bd4b1('0x3eb')](/(?:FRONTVIEW|FRONT VIEW|FV)/i)){if(_0x3bd4b1('0x386')===_0x3bd4b1('0x3ba')){function _0x592e4c(){const _0x386698=_0x3bd4b1,_0x1a2156=_0x542ab9+(this[_0x386698('0x59b')]()-_0x44c408[_0x386698('0x3b6')])/0x2;this[_0x386698('0x239')](_0x214fa5,_0x1d7302+(_0x187933-_0x3c37d1['iconWidth']),_0x1a2156),_0x12a73a-=_0x3f2ffd[_0x386698('0x44c')]+0x4;}}else this[_0x3bd4b1('0x3b2')]='FV';}else{if(_0x3e81e5['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0x3bd4b1('0x113')!==_0x3bd4b1('0xac'))this['_forcedTroopView']='SV';else{function _0x5bbbb6(){if(_0x296a38['isPlaytest']())_0x54b403['log'](_0x165097);}}}}}}}if(_0x17493b[_0x3bd4b1('0x3eb')](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x17493b['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if('ErlGa'==='ErlGa')this[_0x3bd4b1('0x441')]=0x1;else{function _0x452b11(){const _0x59ebe5=_0x3bd4b1;for(let _0xaf524f=0x0;_0xaf524f<this[_0x59ebe5('0xd6')]();_0xaf524f++){const _0x3c1456=this[_0x59ebe5('0x38e')]();let _0x9854ad=_0x20e9a8[_0x59ebe5('0x389')];this['setAction'](_0xaf524f,_0x3c1456[0x0]);for(const _0x2b7226 of _0x3c1456){const _0xe826b4=_0x2b7226[_0x59ebe5('0x2f6')]();_0xe826b4>_0x9854ad&&(_0x9854ad=_0xe826b4,this['setAction'](_0xaf524f,_0x2b7226));}}this[_0x59ebe5('0x28b')](_0x59ebe5('0x26'));}}}else{if(_0x17493b[_0x3bd4b1('0x3eb')](/<(?:TPB|ATB)[ ]WAIT>/i)){if(_0x3bd4b1('0x92')===_0x3bd4b1('0x1c1')){function _0x3b6a36(){return!![];}}else this[_0x3bd4b1('0x441')]=0x2;}else{if(_0x17493b[_0x3bd4b1('0x3eb')](/<(?:CTB)>/i)){if(Imported['VisuMZ_2_BattleSystemCTB']){if(_0x3bd4b1('0x3df')!==_0x3bd4b1('0x3df')){function _0xe0ef34(){const _0x4acad7=_0x3bd4b1;_0x1f46e5[_0x4acad7('0x176')][_0x4acad7('0x19d')][_0x4acad7('0x2ca')](this,_0x1fe87b,_0x5a9b55,_0x4a38c8,_0x72f322);}}else this[_0x3bd4b1('0x441')]='CTB';}}else{if(_0x17493b[_0x3bd4b1('0x3eb')](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x560fdf=String(RegExp['$1']);if(_0x560fdf[_0x3bd4b1('0x3eb')](/DTB/i)){if(_0x3bd4b1('0x1f6')===_0x3bd4b1('0x1f6'))this['_forcedBattleSys']=0x0;else{function _0x17f352(){const _0x467e50=_0x3bd4b1,_0x48d316=_0x467e50('0x10c');this[_0x467e50('0x506')]=this['_colorCache']||{};if(this[_0x467e50('0x506')][_0x48d316])return this['_colorCache'][_0x48d316];const _0x5e658d=_0x3020c9['CoreEngine'][_0x467e50('0x117')]['Color'][_0x467e50('0x538')];return this['getColorDataFromPluginParameters'](_0x48d316,_0x5e658d);}}}else{if(_0x560fdf[_0x3bd4b1('0x3eb')](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x3bd4b1('0x441')]=0x1;else{if(_0x560fdf[_0x3bd4b1('0x3eb')](/(?:TPB|ATB)[ ]WAIT/i))this[_0x3bd4b1('0x441')]=0x2;else{if(_0x560fdf[_0x3bd4b1('0x3eb')](/CTB/i)){if(Imported[_0x3bd4b1('0x28a')]){if('FqwcQ'!==_0x3bd4b1('0x4f2'))this[_0x3bd4b1('0x441')]=_0x3bd4b1('0x564');else{function _0x49515f(){const _0x7ea639=_0x3bd4b1;_0x1470e5['maxLevel']=_0x38f145(_0x52320e['$1']);if(_0xbca821['maxLevel']===0x0)_0x288a50['maxLevel']=_0x4246d5[_0x7ea639('0xbd')];}}}}}}}}}}}}},VisuMZ['CoreEngine'][_0x43e5ad('0x146')]=Game_System[_0x43e5ad('0x4a4')][_0x43e5ad('0x56')],Game_System[_0x43e5ad('0x4a4')][_0x43e5ad('0x56')]=function(){const _0x4bdb35=_0x43e5ad;VisuMZ[_0x4bdb35('0x176')][_0x4bdb35('0x146')][_0x4bdb35('0x2ca')](this),this[_0x4bdb35('0x3a1')]();},Game_System['prototype']['initCoreEngine']=function(){const _0x4764d7=_0x43e5ad;this[_0x4764d7('0x243')]={'SideView':$dataSystem[_0x4764d7('0x4a2')],'BattleSystem':this[_0x4764d7('0x46b')](),'FontSize':$dataSystem['advanced'][_0x4764d7('0xe7')],'Padding':0xc};},Game_System[_0x43e5ad('0x4a4')][_0x43e5ad('0x567')]=function(){const _0x1f6e8d=_0x43e5ad;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x1f6e8d('0x3b2')]==='FV'){if('wrINO'!==_0x1f6e8d('0x5c4'))return![];else{function _0x46076c(){return _0x5182bd['getBattleSystem']()>=0x1;}}}}if(this['_CoreEngineSettings']===undefined)this[_0x1f6e8d('0x3a1')]();if(this[_0x1f6e8d('0x243')][_0x1f6e8d('0x2d9')]===undefined)this['initCoreEngine']();return this[_0x1f6e8d('0x243')][_0x1f6e8d('0x2d9')];},Game_System[_0x43e5ad('0x4a4')]['setSideView']=function(_0x228b43){const _0x52abbb=_0x43e5ad;if(this['_CoreEngineSettings']===undefined)this[_0x52abbb('0x3a1')]();if(this[_0x52abbb('0x243')][_0x52abbb('0x2d9')]===undefined)this[_0x52abbb('0x3a1')]();this['_CoreEngineSettings'][_0x52abbb('0x2d9')]=_0x228b43;},Game_System[_0x43e5ad('0x4a4')]['resetBattleSystem']=function(){const _0x3a0e92=_0x43e5ad;if(this['_CoreEngineSettings']===undefined)this[_0x3a0e92('0x3a1')]();this[_0x3a0e92('0x243')][_0x3a0e92('0x299')]=this[_0x3a0e92('0x46b')]();},Game_System['prototype']['initialBattleSystem']=function(){const _0x31eed5=_0x43e5ad,_0x5edaee=(VisuMZ['CoreEngine']['Settings'][_0x31eed5('0x299')]||'DATABASE')[_0x31eed5('0x545')]()[_0x31eed5('0x5f2')]();return VisuMZ['CoreEngine'][_0x31eed5('0x7e')](_0x5edaee);},Game_System[_0x43e5ad('0x4a4')][_0x43e5ad('0x21')]=function(){const _0x3b8645=_0x43e5ad;if($gameTemp[_0x3b8645('0x441')]!==undefined)return $gameTemp[_0x3b8645('0x441')];if(this[_0x3b8645('0x243')]===undefined)this['initCoreEngine']();if(this[_0x3b8645('0x243')][_0x3b8645('0x299')]===undefined)this[_0x3b8645('0x5c6')]();return this['_CoreEngineSettings'][_0x3b8645('0x299')];},Game_System['prototype']['setBattleSystem']=function(_0x33b617){const _0x52ec69=_0x43e5ad;if(this[_0x52ec69('0x243')]===undefined)this[_0x52ec69('0x3a1')]();if(this['_CoreEngineSettings']['BattleSystem']===undefined)this[_0x52ec69('0x5c6')]();this[_0x52ec69('0x243')][_0x52ec69('0x299')]=_0x33b617;},Game_System[_0x43e5ad('0x4a4')][_0x43e5ad('0x58c')]=function(){const _0x58ab78=_0x43e5ad;if(this[_0x58ab78('0x243')]===undefined)this[_0x58ab78('0x3a1')]();if(this[_0x58ab78('0x243')][_0x58ab78('0x453')]===undefined)this[_0x58ab78('0x3a1')]();return this[_0x58ab78('0x243')][_0x58ab78('0x453')];},Game_System['prototype'][_0x43e5ad('0x308')]=function(_0x5e39d5){const _0x3f268c=_0x43e5ad;if(this[_0x3f268c('0x243')]===undefined)this[_0x3f268c('0x3a1')]();if(this[_0x3f268c('0x243')]['TimeProgress']===undefined)this[_0x3f268c('0x3a1')]();this[_0x3f268c('0x243')]['FontSize']=_0x5e39d5;},Game_System[_0x43e5ad('0x4a4')][_0x43e5ad('0x2a5')]=function(){const _0xde8806=_0x43e5ad;if(this[_0xde8806('0x243')]===undefined)this[_0xde8806('0x3a1')]();if(this[_0xde8806('0x243')][_0xde8806('0x261')]===undefined)this[_0xde8806('0x3a1')]();return this['_CoreEngineSettings']['Padding'];},Game_System[_0x43e5ad('0x4a4')]['setWindowPadding']=function(_0x33c609){const _0x7cbbeb=_0x43e5ad;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x7cbbeb('0x243')][_0x7cbbeb('0x169')]===undefined)this[_0x7cbbeb('0x3a1')]();this[_0x7cbbeb('0x243')]['Padding']=_0x33c609;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x57')]=Game_Screen[_0x43e5ad('0x4a4')]['initialize'],Game_Screen[_0x43e5ad('0x4a4')][_0x43e5ad('0x56')]=function(){const _0x2cb5b1=_0x43e5ad;VisuMZ[_0x2cb5b1('0x176')][_0x2cb5b1('0x57')][_0x2cb5b1('0x2ca')](this),this[_0x2cb5b1('0x278')]();},Game_Screen[_0x43e5ad('0x4a4')][_0x43e5ad('0x278')]=function(){const _0x382786=_0x43e5ad,_0x13990e=VisuMZ[_0x382786('0x176')][_0x382786('0x117')]['ScreenShake'];this[_0x382786('0x438')]=_0x13990e?.[_0x382786('0xd4')]||'random';},Game_Screen[_0x43e5ad('0x4a4')][_0x43e5ad('0x3f7')]=function(){const _0x155073=_0x43e5ad;if(this[_0x155073('0x438')]===undefined)this[_0x155073('0x278')]();return this[_0x155073('0x438')];},Game_Screen[_0x43e5ad('0x4a4')]['setCoreEngineScreenShakeStyle']=function(_0x5827de){const _0x840059=_0x43e5ad;if(this['_coreEngineShakeStyle']===undefined)this['initCoreEngineScreenShake']();this[_0x840059('0x438')]=_0x5827de[_0x840059('0x463')]()[_0x840059('0x5f2')]();},Game_Picture[_0x43e5ad('0x4a4')][_0x43e5ad('0x2dd')]=function(){const _0x3ca3cb=_0x43e5ad;if($gameParty['inBattle']())return![];return this['name']()&&this[_0x3ca3cb('0x2e8')]()[_0x3ca3cb('0x5b7')](0x0)==='!';},VisuMZ['CoreEngine'][_0x43e5ad('0x30')]=Game_Picture['prototype']['x'],Game_Picture['prototype']['x']=function(){const _0x3a3d49=_0x43e5ad;return this['isMapScrollLinked']()?this[_0x3a3d49('0x505')]():VisuMZ['CoreEngine']['Game_Picture_x'][_0x3a3d49('0x2ca')](this);},Game_Picture[_0x43e5ad('0x4a4')][_0x43e5ad('0x505')]=function(){const _0x412b93=$gameMap['displayX']()*$gameMap['tileWidth']();return this['_x']-_0x412b93;},VisuMZ[_0x43e5ad('0x176')]['Game_Picture_y']=Game_Picture[_0x43e5ad('0x4a4')]['y'],Game_Picture[_0x43e5ad('0x4a4')]['y']=function(){const _0x6e9967=_0x43e5ad;return this['isMapScrollLinked']()?this[_0x6e9967('0x19')]():VisuMZ[_0x6e9967('0x176')][_0x6e9967('0x82')][_0x6e9967('0x2ca')](this);},Game_Picture[_0x43e5ad('0x4a4')][_0x43e5ad('0x19')]=function(){const _0xb79e39=_0x43e5ad,_0x5f42a9=$gameMap[_0xb79e39('0x3a')]()*$gameMap[_0xb79e39('0x23d')]();return this['_y']-_0x5f42a9;},Game_Picture[_0x43e5ad('0x4a4')]['setEasingType']=function(_0x32e997){this['_coreEasingType']=_0x32e997;},VisuMZ[_0x43e5ad('0x176')]['Game_Picture_calcEasing']=Game_Picture['prototype'][_0x43e5ad('0x279')],Game_Picture[_0x43e5ad('0x4a4')][_0x43e5ad('0x279')]=function(_0x2e7691){const _0x14a613=_0x43e5ad;this[_0x14a613('0x233')]=this[_0x14a613('0x233')]||0x0;if([0x0,0x1,0x2,0x3][_0x14a613('0x56b')](this[_0x14a613('0x233')]))return VisuMZ['CoreEngine'][_0x14a613('0xbe')]['call'](this,_0x2e7691);else{if(_0x14a613('0x56f')!==_0x14a613('0x370'))return VisuMZ['ApplyEasing'](_0x2e7691,this[_0x14a613('0x233')]);else{function _0x1127c6(){const _0x19f83e=_0x14a613;_0x2bb61e[_0x19f83e('0x176')]['Window_Selectable_drawBackgroundRect'][_0x19f83e('0x2ca')](this,_0x50465c);}}}},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x110')]=Game_Action[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ae')],Game_Action[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ae')]=function(_0x4d1362){const _0x5565f1=_0x43e5ad;if(VisuMZ[_0x5565f1('0x176')]['Settings'][_0x5565f1('0x32')][_0x5565f1('0xe5')])return this[_0x5565f1('0x3d3')](_0x4d1362);else{if(_0x5565f1('0x51b')!==_0x5565f1('0x3ce'))return VisuMZ['CoreEngine'][_0x5565f1('0x110')][_0x5565f1('0x2ca')](this,_0x4d1362);else{function _0x228328(){const _0x38d7e0=_0x5565f1;this[_0x38d7e0('0x5a5')]-=this[_0x38d7e0('0x235')](),this[_0x38d7e0('0x559')]()&&(this[_0x38d7e0('0x27a')]=![]);}}}},Game_Action[_0x43e5ad('0x4a4')][_0x43e5ad('0x3d3')]=function(_0x161c29){const _0x7df729=_0x43e5ad,_0x591178=this[_0x7df729('0x21b')](_0x161c29),_0x4a29f9=this[_0x7df729('0x43d')](_0x161c29),_0x4ff200=this[_0x7df729('0x129')](_0x161c29);return _0x591178*(_0x4a29f9-_0x4ff200);},VisuMZ[_0x43e5ad('0x176')]['Game_Action_itemEva']=Game_Action[_0x43e5ad('0x4a4')][_0x43e5ad('0x31d')],Game_Action['prototype'][_0x43e5ad('0x31d')]=function(_0x117d8f){const _0x57ebc3=_0x43e5ad;return VisuMZ[_0x57ebc3('0x176')][_0x57ebc3('0x117')][_0x57ebc3('0x32')]['ImprovedAccuracySystem']?0x0:VisuMZ['CoreEngine'][_0x57ebc3('0x504')][_0x57ebc3('0x2ca')](this,_0x117d8f);},Game_Action[_0x43e5ad('0x4a4')][_0x43e5ad('0x21b')]=function(_0x18a2f0){const _0x38bfab=_0x43e5ad;return this[_0x38bfab('0x1ec')]()['successRate']*0.01;},Game_Action[_0x43e5ad('0x4a4')][_0x43e5ad('0x43d')]=function(_0x527b0b){const _0x55a4a7=_0x43e5ad;if(VisuMZ[_0x55a4a7('0x176')][_0x55a4a7('0x117')][_0x55a4a7('0x32')]['AccuracyBoost']&&this[_0x55a4a7('0x517')]())return 0x1;if(this[_0x55a4a7('0x606')]()){if(_0x55a4a7('0x424')===_0x55a4a7('0x138')){function _0x4c8ce5(){const _0x293c74=_0x55a4a7;return _0x435701[_0x293c74('0x5af')];}}else{if(VisuMZ[_0x55a4a7('0x176')]['Settings'][_0x55a4a7('0x32')]['AccuracyBoost']&&this[_0x55a4a7('0x3c3')]()[_0x55a4a7('0x1bb')]()){if(_0x55a4a7('0x36')==='rNApp'){function _0x5289eb(){const _0x2561ab=_0x55a4a7;_0x55b212[_0x2561ab('0x176')][_0x2561ab('0x103')][_0x2561ab('0x2ca')](this,_0x1318d5,_0x498b86,_0x3e38e1,_0x3d7e93),this[_0x2561ab('0x181')]();}}else return this[_0x55a4a7('0x3c3')]()[_0x55a4a7('0x315')]+0.05;}else return this[_0x55a4a7('0x3c3')]()[_0x55a4a7('0x315')];}}else return 0x1;},Game_Action[_0x43e5ad('0x4a4')][_0x43e5ad('0x129')]=function(_0x3bff50){const _0x5ec19f=_0x43e5ad;if(this['subject']()[_0x5ec19f('0x1bb')]()===_0x3bff50[_0x5ec19f('0x1bb')]())return 0x0;if(this[_0x5ec19f('0x606')]())return VisuMZ[_0x5ec19f('0x176')]['Settings'][_0x5ec19f('0x32')]['AccuracyBoost']&&_0x3bff50['isEnemy']()?_0x3bff50[_0x5ec19f('0x605')]-0.05:_0x3bff50[_0x5ec19f('0x605')];else{if(this[_0x5ec19f('0x4cf')]())return _0x3bff50[_0x5ec19f('0x5af')];else{if(_0x5ec19f('0x3c8')===_0x5ec19f('0x3c8'))return 0x0;else{function _0x41b27b(){const _0xb81a2=_0x5ec19f;return this['_cache']=this[_0xb81a2('0x43f')]||{},this[_0xb81a2('0x43f')][_0xc2b614]!==_0x1c1948;}}}}},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x22e')]=Game_Action[_0x43e5ad('0x4a4')]['updateLastTarget'],Game_Action[_0x43e5ad('0x4a4')]['updateLastTarget']=function(_0x4106e8){const _0x5916d7=_0x43e5ad;VisuMZ[_0x5916d7('0x176')][_0x5916d7('0x22e')][_0x5916d7('0x2ca')](this,_0x4106e8);if(VisuMZ[_0x5916d7('0x176')][_0x5916d7('0x117')][_0x5916d7('0x32')][_0x5916d7('0xe5')])return;const _0x55f427=_0x4106e8[_0x5916d7('0x5ac')]();_0x55f427['missed']&&(0x1-this['itemEva'](_0x4106e8)>this['itemHit'](_0x4106e8)&&(_0x55f427[_0x5916d7('0x4c0')]=![],_0x55f427[_0x5916d7('0x60')]=!![]));},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x3c1')]=Game_BattlerBase[_0x43e5ad('0x4a4')]['initMembers'],Game_BattlerBase['prototype'][_0x43e5ad('0x16f')]=function(){const _0x379c15=_0x43e5ad;this['_cache']={},VisuMZ[_0x379c15('0x176')][_0x379c15('0x3c1')][_0x379c15('0x2ca')](this);},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x163')]=Game_BattlerBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x611')],Game_BattlerBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x611')]=function(){const _0x2a0c92=_0x43e5ad;this[_0x2a0c92('0x43f')]={},VisuMZ['CoreEngine']['Game_BattlerBase_refresh'][_0x2a0c92('0x2ca')](this);},Game_BattlerBase[_0x43e5ad('0x4a4')]['checkCacheKey']=function(_0x1f79a9){const _0xa63706=_0x43e5ad;return this[_0xa63706('0x43f')]=this[_0xa63706('0x43f')]||{},this[_0xa63706('0x43f')][_0x1f79a9]!==undefined;},Game_BattlerBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x296')]=function(_0x53607f){const _0x46497e=_0x43e5ad,_0x3f53f2=(_0x58ee7a,_0x199313)=>{const _0x3b0294=_0x47f2;if(!_0x199313)return _0x58ee7a;if(_0x199313[_0x3b0294('0x47f')][_0x3b0294('0x3eb')](VisuMZ[_0x3b0294('0x176')][_0x3b0294('0x465')]['paramPlus'][_0x53607f])){var _0x1efb25=Number(RegExp['$1']);_0x58ee7a+=_0x1efb25;}if(_0x199313[_0x3b0294('0x47f')][_0x3b0294('0x3eb')](VisuMZ[_0x3b0294('0x176')][_0x3b0294('0x465')]['paramPlusJS'][_0x53607f])){if(_0x3b0294('0x4bb')===_0x3b0294('0x1c8')){function _0x78b1af(){const _0x457b18=_0x3b0294;_0x301cbc['ConvertParams'](_0x33a20c,_0x3b2d5d);const _0x2a5127=_0x185a09[_0x457b18('0x3da')]||0x1;_0x3c7563[_0x457b18('0x308')](_0x2a5127);}}else{var _0x44ff65=String(RegExp['$1']);try{if(_0x3b0294('0x32d')==='NxIty')_0x58ee7a+=eval(_0x44ff65);else{function _0x1cc052(){return 0xc0;}}}catch(_0x10f09b){if($gameTemp[_0x3b0294('0x17e')]())console[_0x3b0294('0x4ba')](_0x10f09b);}}}return _0x58ee7a;};return this[_0x46497e('0x471')]()[_0x46497e('0x44e')](_0x3f53f2,this[_0x46497e('0x3af')][_0x53607f]);},Game_BattlerBase['prototype'][_0x43e5ad('0x170')]=function(_0x389e26){const _0x43db7d=_0x43e5ad;var _0x44efd0=_0x43db7d('0x578')+(this[_0x43db7d('0x1bb')]()?'Actor':_0x43db7d('0x1fd'))+_0x43db7d('0x4f4')+_0x389e26;if(this[_0x43db7d('0x2de')](_0x44efd0))return this[_0x43db7d('0x43f')][_0x44efd0];this[_0x43db7d('0x43f')][_0x44efd0]=eval(VisuMZ['CoreEngine'][_0x43db7d('0x117')]['Param'][_0x44efd0]);const _0x13b406=(_0x3531e2,_0x334108)=>{const _0x7d3dec=_0x43db7d;if(!_0x334108)return _0x3531e2;if(_0x334108['note'][_0x7d3dec('0x3eb')](VisuMZ['CoreEngine']['RegExp'][_0x7d3dec('0x170')][_0x389e26])){if('phBeq'==='phBeq'){var _0xeee1b1=Number(RegExp['$1']);if(_0xeee1b1===0x0)_0xeee1b1=Number[_0x7d3dec('0xbd')];_0x3531e2=Math[_0x7d3dec('0x3cc')](_0x3531e2,_0xeee1b1);}else{function _0x202b67(){const _0x112689=_0x7d3dec;this[_0x112689('0x4e6')]+=_0x3bb121[_0x112689('0x5e2')]((_0x2e5975[_0x112689('0xc')]-0x270)/0x2),this['_screenY']-=_0x2d316f[_0x112689('0x59d')]((_0x3ca493[_0x112689('0xc')]-_0x42acce[_0x112689('0xea')])/0x2),_0x582bb8['isSideView']()?this[_0x112689('0x372')]-=_0x1262ef[_0x112689('0x59d')]((_0x92743b['width']-_0x18e3de[_0x112689('0x5ed')])/0x2):this[_0x112689('0x372')]+=_0x31895e[_0x112689('0x5e2')]((_0x45c5cf[_0x112689('0x5ed')]-0x330)/0x2);}}}if(_0x334108[_0x7d3dec('0x47f')][_0x7d3dec('0x3eb')](VisuMZ[_0x7d3dec('0x176')]['RegExp'][_0x7d3dec('0xf3')][_0x389e26])){var _0x9a612a=String(RegExp['$1']);try{_0x3531e2=Math[_0x7d3dec('0x3cc')](_0x3531e2,Number(eval(_0x9a612a)));}catch(_0xf8035){if(_0x7d3dec('0x59')!==_0x7d3dec('0x59')){function _0x2f871b(){const _0x499b92=_0x7d3dec;this[_0x499b92('0x289')][_0x499b92('0x3a8')](),this[_0x499b92('0x304')][_0x499b92('0x64')](),this[_0x499b92('0x91')][_0x499b92('0x256')]=![],_0x529e33[_0x499b92('0xd7')]();}}else{if($gameTemp['isPlaytest']())console[_0x7d3dec('0x4ba')](_0xf8035);}}}return _0x3531e2;};if(this[_0x43db7d('0x43f')][_0x44efd0]===0x0)this[_0x43db7d('0x43f')][_0x44efd0]=Number[_0x43db7d('0xbd')];return this[_0x43db7d('0x43f')][_0x44efd0]=this[_0x43db7d('0x471')]()[_0x43db7d('0x44e')](_0x13b406,this[_0x43db7d('0x43f')][_0x44efd0]),this[_0x43db7d('0x43f')][_0x44efd0];},Game_BattlerBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x1e1')]=function(_0x2922b0){const _0x8a7224=_0x43e5ad,_0x4b14a1=this['traitsPi'](Game_BattlerBase[_0x8a7224('0x4de')],_0x2922b0),_0x57fe34=(_0x25f068,_0x4eb4a3)=>{const _0x16d002=_0x8a7224;if(!_0x4eb4a3)return _0x25f068;if(_0x4eb4a3[_0x16d002('0x47f')][_0x16d002('0x3eb')](VisuMZ[_0x16d002('0x176')][_0x16d002('0x465')][_0x16d002('0x43e')][_0x2922b0])){var _0x307c11=Number(RegExp['$1'])/0x64;_0x25f068*=_0x307c11;}if(_0x4eb4a3['note'][_0x16d002('0x3eb')](VisuMZ[_0x16d002('0x176')][_0x16d002('0x465')]['paramRate2'][_0x2922b0])){if('IYlsA'!==_0x16d002('0x1d5')){var _0x307c11=Number(RegExp['$1']);_0x25f068*=_0x307c11;}else{function _0x4ad31c(){const _0xc6ad4c=_0x16d002;_0x308a39[_0xc6ad4c('0x201')]=!_0x2898f6[_0xc6ad4c('0x201')];}}}if(_0x4eb4a3[_0x16d002('0x47f')][_0x16d002('0x3eb')](VisuMZ[_0x16d002('0x176')][_0x16d002('0x465')][_0x16d002('0x3d4')][_0x2922b0])){var _0x5c5783=String(RegExp['$1']);try{_0x25f068*=eval(_0x5c5783);}catch(_0x1d3ae0){if('qxbxf'===_0x16d002('0x3ad')){function _0xf02e71(){const _0x43a130=_0x16d002;_0x37c2b7[_0x43a130('0x4c0')]=![],_0xe599f4['evaded']=!![];}}else{if($gameTemp[_0x16d002('0x17e')]())console[_0x16d002('0x4ba')](_0x1d3ae0);}}}return _0x25f068;};return this[_0x8a7224('0x471')]()['reduce'](_0x57fe34,_0x4b14a1);},Game_BattlerBase['prototype'][_0x43e5ad('0x29b')]=function(_0x51e4d9){const _0x1f5765=_0x43e5ad,_0x7fb46b=(_0x430770,_0x23b580)=>{const _0x353ecf=_0x47f2;if(!_0x23b580)return _0x430770;if(_0x23b580[_0x353ecf('0x47f')][_0x353ecf('0x3eb')](VisuMZ[_0x353ecf('0x176')][_0x353ecf('0x465')][_0x353ecf('0xc0')][_0x51e4d9])){var _0x1f5ae9=Number(RegExp['$1']);_0x430770+=_0x1f5ae9;}if(_0x23b580[_0x353ecf('0x47f')][_0x353ecf('0x3eb')](VisuMZ[_0x353ecf('0x176')]['RegExp']['paramFlatJS'][_0x51e4d9])){if(_0x353ecf('0x267')!==_0x353ecf('0xbc')){var _0x5692b4=String(RegExp['$1']);try{_0x430770+=eval(_0x5692b4);}catch(_0x4da83a){if($gameTemp[_0x353ecf('0x17e')]())console[_0x353ecf('0x4ba')](_0x4da83a);}}else{function _0x84bcb6(){const _0x203841=_0x353ecf;_0x3b4ab1[_0x203841('0x176')]['Scene_Map_createMenuButton'][_0x203841('0x2ca')](this),_0x2c5735['isSideButtonLayout']()&&this[_0x203841('0xd')]();}}}return _0x430770;};return this[_0x1f5765('0x471')]()[_0x1f5765('0x44e')](_0x7fb46b,0x0);},Game_BattlerBase[_0x43e5ad('0x4a4')]['param']=function(_0x8a921a){const _0x40faf4=_0x43e5ad;let _0x32a1e1=_0x40faf4('0x582')+_0x8a921a+_0x40faf4('0x2da');if(this[_0x40faf4('0x2de')](_0x32a1e1))return this[_0x40faf4('0x43f')][_0x32a1e1];return this[_0x40faf4('0x43f')][_0x32a1e1]=Math[_0x40faf4('0x5e2')](VisuMZ[_0x40faf4('0x176')][_0x40faf4('0x117')][_0x40faf4('0x393')][_0x40faf4('0x58d')]['call'](this,_0x8a921a)),this[_0x40faf4('0x43f')][_0x32a1e1];},Game_BattlerBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x251')]=function(_0x3b628f){const _0x244c93=_0x43e5ad,_0xd0575f=(_0x3c5f5f,_0x28dca1)=>{const _0x143479=_0x47f2;if(!_0x28dca1)return _0x3c5f5f;if(_0x28dca1['note'][_0x143479('0x3eb')](VisuMZ[_0x143479('0x176')][_0x143479('0x465')][_0x143479('0x11d')][_0x3b628f])){var _0x4273c1=Number(RegExp['$1'])/0x64;_0x3c5f5f+=_0x4273c1;}if(_0x28dca1[_0x143479('0x47f')][_0x143479('0x3eb')](VisuMZ['CoreEngine'][_0x143479('0x465')][_0x143479('0x5df')][_0x3b628f])){var _0x4273c1=Number(RegExp['$1']);_0x3c5f5f+=_0x4273c1;}if(_0x28dca1[_0x143479('0x47f')][_0x143479('0x3eb')](VisuMZ[_0x143479('0x176')][_0x143479('0x465')]['xparamPlusJS'][_0x3b628f])){var _0x36cbf0=String(RegExp['$1']);try{_0x3c5f5f+=eval(_0x36cbf0);}catch(_0x58ea8a){if(_0x143479('0x20')===_0x143479('0x20')){if($gameTemp['isPlaytest']())console[_0x143479('0x4ba')](_0x58ea8a);}else{function _0x2dd785(){const _0x241c3b=_0x143479;this[_0x241c3b('0x2cd')](_0x27d24b);}}}}return _0x3c5f5f;};return this[_0x244c93('0x471')]()[_0x244c93('0x44e')](_0xd0575f,0x0);},Game_BattlerBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x11')]=function(_0x3dbf9e){const _0x4283e7=_0x43e5ad,_0xf22e0d=(_0x9f240d,_0x30e520)=>{const _0x4134ea=_0x47f2;if(!_0x30e520)return _0x9f240d;if(_0x30e520[_0x4134ea('0x47f')][_0x4134ea('0x3eb')](VisuMZ[_0x4134ea('0x176')]['RegExp'][_0x4134ea('0x5c9')][_0x3dbf9e])){if(_0x4134ea('0x4aa')===_0x4134ea('0x183')){function _0x420e36(){const _0x46bb06=_0x4134ea;return _0x3b4caa[_0x46bb06('0xce')](_0x46bb06('0x4b5'));}}else{var _0x94a877=Number(RegExp['$1'])/0x64;_0x9f240d*=_0x94a877;}}if(_0x30e520[_0x4134ea('0x47f')]['match'](VisuMZ[_0x4134ea('0x176')][_0x4134ea('0x465')][_0x4134ea('0x51a')][_0x3dbf9e])){var _0x94a877=Number(RegExp['$1']);_0x9f240d*=_0x94a877;}if(_0x30e520[_0x4134ea('0x47f')][_0x4134ea('0x3eb')](VisuMZ[_0x4134ea('0x176')][_0x4134ea('0x465')]['xparamRateJS'][_0x3dbf9e])){var _0x3b1636=String(RegExp['$1']);try{_0x9f240d*=eval(_0x3b1636);}catch(_0xcbe142){if('GzMix'!=='ZSOvd'){if($gameTemp[_0x4134ea('0x17e')]())console['log'](_0xcbe142);}else{function _0x43361c(){return 0x0;}}}}return _0x9f240d;};return this[_0x4283e7('0x471')]()['reduce'](_0xf22e0d,0x1);},Game_BattlerBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x184')]=function(_0x12bc1b){const _0xf5ca93=_0x43e5ad,_0xcd5e96=(_0x5dafad,_0x1b73bb)=>{const _0x58c097=_0x47f2;if(_0x58c097('0x18b')!==_0x58c097('0x18b')){function _0x43d547(){const _0x4b6b03=_0x58c097;if(_0x273d23&&_0x2ae018[_0x4b6b03('0x485')]())return;_0x32679c[_0x4b6b03('0x176')][_0x4b6b03('0x33c')][_0x4b6b03('0x2ca')](this,_0x5bbb55,_0x5c4cd9,_0x4fbf07,_0x25167b);}}else{if(!_0x1b73bb)return _0x5dafad;if(_0x1b73bb[_0x58c097('0x47f')][_0x58c097('0x3eb')](VisuMZ[_0x58c097('0x176')][_0x58c097('0x465')]['xparamFlat1'][_0x12bc1b])){var _0x4ef5f8=Number(RegExp['$1'])/0x64;_0x5dafad+=_0x4ef5f8;}if(_0x1b73bb[_0x58c097('0x47f')]['match'](VisuMZ[_0x58c097('0x176')][_0x58c097('0x465')][_0x58c097('0x223')][_0x12bc1b])){if(_0x58c097('0x5e4')!==_0x58c097('0x5e4')){function _0x57c63d(){return _0x1b2f5b=_0x550885['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x2789b7,_0x1ac90d)=>_0x53a34c(_0x4c87ee(_0x1ac90d))),_0x13aa12;}}else{var _0x4ef5f8=Number(RegExp['$1']);_0x5dafad+=_0x4ef5f8;}}if(_0x1b73bb[_0x58c097('0x47f')][_0x58c097('0x3eb')](VisuMZ['CoreEngine']['RegExp'][_0x58c097('0x4f5')][_0x12bc1b])){var _0x48da83=String(RegExp['$1']);try{if(_0x58c097('0x2fc')===_0x58c097('0x5f7')){function _0x5acaa9(){return _0x3902d6;}}else _0x5dafad+=eval(_0x48da83);}catch(_0xb303c5){if($gameTemp[_0x58c097('0x17e')]())console[_0x58c097('0x4ba')](_0xb303c5);}}return _0x5dafad;}};return this[_0xf5ca93('0x471')]()[_0xf5ca93('0x44e')](_0xcd5e96,0x0);},Game_BattlerBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x580')]=function(_0x57cde4){const _0x59b18d=_0x43e5ad;let _0x497bab=_0x59b18d('0x580')+_0x57cde4+'Total';if(this[_0x59b18d('0x2de')](_0x497bab))return this[_0x59b18d('0x43f')][_0x497bab];return this[_0x59b18d('0x43f')][_0x497bab]=VisuMZ[_0x59b18d('0x176')][_0x59b18d('0x117')][_0x59b18d('0x393')][_0x59b18d('0x36b')][_0x59b18d('0x2ca')](this,_0x57cde4),this[_0x59b18d('0x43f')][_0x497bab];},Game_BattlerBase['prototype'][_0x43e5ad('0x510')]=function(_0x413c65){const _0x2f971c=_0x43e5ad,_0x3748b1=(_0x2db220,_0x1fd768)=>{const _0x5e8ca2=_0x47f2;if(_0x5e8ca2('0x273')!=='HzhpK'){function _0x425ae8(){const _0x7236fe=_0x5e8ca2,_0x2a9e3a=_0x7236fe('0x1fc');this[_0x7236fe('0x506')]=this[_0x7236fe('0x506')]||{};if(this['_colorCache'][_0x2a9e3a])return this[_0x7236fe('0x506')][_0x2a9e3a];const _0x3eb2e3=_0xbcb098[_0x7236fe('0x176')]['Settings'][_0x7236fe('0x469')][_0x7236fe('0x15c')];return this['getColorDataFromPluginParameters'](_0x2a9e3a,_0x3eb2e3);}}else{if(!_0x1fd768)return _0x2db220;if(_0x1fd768[_0x5e8ca2('0x47f')][_0x5e8ca2('0x3eb')](VisuMZ[_0x5e8ca2('0x176')]['RegExp'][_0x5e8ca2('0x31e')][_0x413c65])){var _0x380202=Number(RegExp['$1'])/0x64;_0x2db220+=_0x380202;}if(_0x1fd768[_0x5e8ca2('0x47f')][_0x5e8ca2('0x3eb')](VisuMZ[_0x5e8ca2('0x176')][_0x5e8ca2('0x465')][_0x5e8ca2('0x5e0')][_0x413c65])){if('EyYkF'!==_0x5e8ca2('0x305')){var _0x380202=Number(RegExp['$1']);_0x2db220+=_0x380202;}else{function _0x409c61(){const _0x16415f=_0x5e8ca2;_0x538f66+=_0x16415f('0x456');}}}if(_0x1fd768[_0x5e8ca2('0x47f')][_0x5e8ca2('0x3eb')](VisuMZ[_0x5e8ca2('0x176')][_0x5e8ca2('0x465')][_0x5e8ca2('0x274')][_0x413c65])){var _0x445314=String(RegExp['$1']);try{if('HaAxT'!==_0x5e8ca2('0x41f'))_0x2db220+=eval(_0x445314);else{function _0x5c022f(){const _0xf18249=_0x5e8ca2;return _0x47172f['CoreEngine'][_0xf18249('0x117')][_0xf18249('0x469')][_0xf18249('0x4e')][_0xf18249('0x2ca')](this,_0x50ea7d);}}}catch(_0x4ef0c2){if(_0x5e8ca2('0x436')==='dfbLk'){if($gameTemp[_0x5e8ca2('0x17e')]())console[_0x5e8ca2('0x4ba')](_0x4ef0c2);}else{function _0x21f6ae(){const _0x2be777=_0x5e8ca2;this[_0x2be777('0x434')]();}}}}return _0x2db220;}};return this[_0x2f971c('0x471')]()[_0x2f971c('0x44e')](_0x3748b1,0x0);},Game_BattlerBase[_0x43e5ad('0x4a4')]['sparamRate']=function(_0xfa30a4){const _0x272534=_0x43e5ad,_0x38cf48=(_0x3a6e5e,_0x2521c8)=>{const _0x747cc5=_0x47f2;if(_0x747cc5('0x404')!==_0x747cc5('0x3f5')){if(!_0x2521c8)return _0x3a6e5e;if(_0x2521c8[_0x747cc5('0x47f')][_0x747cc5('0x3eb')](VisuMZ['CoreEngine'][_0x747cc5('0x465')]['sparamRate1'][_0xfa30a4])){var _0x5cdb73=Number(RegExp['$1'])/0x64;_0x3a6e5e*=_0x5cdb73;}if(_0x2521c8[_0x747cc5('0x47f')][_0x747cc5('0x3eb')](VisuMZ[_0x747cc5('0x176')]['RegExp'][_0x747cc5('0x79')][_0xfa30a4])){if(_0x747cc5('0x5ad')===_0x747cc5('0xb5')){function _0x52c6dd(){_0x16edee['erasePicture'](_0x3cffc8);}}else{var _0x5cdb73=Number(RegExp['$1']);_0x3a6e5e*=_0x5cdb73;}}if(_0x2521c8[_0x747cc5('0x47f')][_0x747cc5('0x3eb')](VisuMZ[_0x747cc5('0x176')][_0x747cc5('0x465')][_0x747cc5('0x3a3')][_0xfa30a4])){var _0x1957b4=String(RegExp['$1']);try{if(_0x747cc5('0x253')!==_0x747cc5('0x609'))_0x3a6e5e*=eval(_0x1957b4);else{function _0x2ba14c(){const _0x56acfc=_0x747cc5;_0xbb264['ConvertParams'](_0xfac376,_0x526520);const _0x435c48=_0x4e7c67['pictureId']||0x1,_0x53ad63=_0xbb3a5[_0x56acfc('0x571')]||'Linear',_0x170f92=_0x554a25[_0x56acfc('0x60f')](_0x435c48);_0x170f92&&_0x170f92['setEasingType'](_0x53ad63);}}}catch(_0x3b125d){if(_0x747cc5('0x58a')===_0x747cc5('0x58a')){if($gameTemp[_0x747cc5('0x17e')]())console[_0x747cc5('0x4ba')](_0x3b125d);}else{function _0x285dc(){return 0x0;}}}}return _0x3a6e5e;}else{function _0x1a4a2f(){const _0x26950d=_0x747cc5;let _0x136378=0x0;for(const _0x5667ca of _0x212c39[_0x26950d('0x176')]['Settings'][_0x26950d('0x393')]['DisplayedParams']){const _0x3f6fe4=this['itemPadding'](),_0x2ba0e1=this[_0x26950d('0x1de')](_0x136378);this[_0x26950d('0x1a8')](_0x3f6fe4,_0x2ba0e1,_0x5667ca),_0x136378++;}}}};return this[_0x272534('0x471')]()[_0x272534('0x44e')](_0x38cf48,0x1);},Game_BattlerBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x264')]=function(_0x42cf9c){const _0x27cebf=_0x43e5ad,_0x1c567a=(_0x45ff3c,_0x12ecc7)=>{const _0x417b8e=_0x47f2;if(!_0x12ecc7)return _0x45ff3c;if(_0x12ecc7[_0x417b8e('0x47f')][_0x417b8e('0x3eb')](VisuMZ[_0x417b8e('0x176')][_0x417b8e('0x465')][_0x417b8e('0x5a1')][_0x42cf9c])){if(_0x417b8e('0x19e')!==_0x417b8e('0x19e')){function _0x536a6b(){return!![];}}else{var _0x178116=Number(RegExp['$1'])/0x64;_0x45ff3c+=_0x178116;}}if(_0x12ecc7[_0x417b8e('0x47f')]['match'](VisuMZ[_0x417b8e('0x176')]['RegExp'][_0x417b8e('0x67')][_0x42cf9c])){var _0x178116=Number(RegExp['$1']);_0x45ff3c+=_0x178116;}if(_0x12ecc7[_0x417b8e('0x47f')][_0x417b8e('0x3eb')](VisuMZ['CoreEngine'][_0x417b8e('0x465')]['sparamFlatJS'][_0x42cf9c])){var _0x1d1f70=String(RegExp['$1']);try{_0x45ff3c+=eval(_0x1d1f70);}catch(_0x17d552){if(_0x417b8e('0x361')===_0x417b8e('0x452')){function _0x570f23(){_0x5f650+=_0x38b160(_0x5389aa);}}else{if($gameTemp[_0x417b8e('0x17e')]())console[_0x417b8e('0x4ba')](_0x17d552);}}}return _0x45ff3c;};return this[_0x27cebf('0x471')]()[_0x27cebf('0x44e')](_0x1c567a,0x0);},Game_BattlerBase['prototype'][_0x43e5ad('0x297')]=function(_0x482139){const _0x81abf7=_0x43e5ad;let _0xcbbbb=_0x81abf7('0x297')+_0x482139+_0x81abf7('0x2da');if(this[_0x81abf7('0x2de')](_0xcbbbb))return this[_0x81abf7('0x43f')][_0xcbbbb];return this[_0x81abf7('0x43f')][_0xcbbbb]=VisuMZ[_0x81abf7('0x176')]['Settings']['Param'][_0x81abf7('0x25f')][_0x81abf7('0x2ca')](this,_0x482139),this[_0x81abf7('0x43f')][_0xcbbbb];},Game_BattlerBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x250')]=function(_0x1b25f2,_0x1d66a0){const _0xa9fc36=_0x43e5ad;if(typeof paramId===_0xa9fc36('0x358'))return this[_0xa9fc36('0x582')](_0x1b25f2);_0x1b25f2=String(_0x1b25f2||'')['toUpperCase']();if(_0x1b25f2===_0xa9fc36('0x81'))return this[_0xa9fc36('0x582')](0x0);if(_0x1b25f2===_0xa9fc36('0x23'))return this['param'](0x1);if(_0x1b25f2==='ATK')return this['param'](0x2);if(_0x1b25f2===_0xa9fc36('0x1f3'))return this['param'](0x3);if(_0x1b25f2===_0xa9fc36('0x49a'))return this[_0xa9fc36('0x582')](0x4);if(_0x1b25f2===_0xa9fc36('0x48e'))return this[_0xa9fc36('0x582')](0x5);if(_0x1b25f2===_0xa9fc36('0x381'))return this[_0xa9fc36('0x582')](0x6);if(_0x1b25f2==='LUK')return this[_0xa9fc36('0x582')](0x7);if(_0x1b25f2===_0xa9fc36('0x561'))return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this[_0xa9fc36('0x580')](0x0)*0x64))+'%':this[_0xa9fc36('0x580')](0x0);if(_0x1b25f2===_0xa9fc36('0x568'))return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this['xparam'](0x1)*0x64))+'%':this[_0xa9fc36('0x580')](0x1);if(_0x1b25f2===_0xa9fc36('0x23c'))return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this[_0xa9fc36('0x580')](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x1b25f2===_0xa9fc36('0x3bb'))return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this['xparam'](0x3)*0x64))+'%':this[_0xa9fc36('0x580')](0x3);if(_0x1b25f2==='MEV')return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this[_0xa9fc36('0x580')](0x4)*0x64))+'%':this[_0xa9fc36('0x580')](0x4);if(_0x1b25f2===_0xa9fc36('0x78'))return _0x1d66a0?String(Math['round'](this[_0xa9fc36('0x580')](0x5)*0x64))+'%':this[_0xa9fc36('0x580')](0x5);if(_0x1b25f2==='CNT')return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this[_0xa9fc36('0x580')](0x6)*0x64))+'%':this[_0xa9fc36('0x580')](0x6);if(_0x1b25f2==='HRG')return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this[_0xa9fc36('0x580')](0x7)*0x64))+'%':this[_0xa9fc36('0x580')](0x7);if(_0x1b25f2===_0xa9fc36('0x8d'))return _0x1d66a0?String(Math['round'](this[_0xa9fc36('0x580')](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x1b25f2==='TRG')return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this[_0xa9fc36('0x580')](0x9)*0x64))+'%':this[_0xa9fc36('0x580')](0x9);if(_0x1b25f2===_0xa9fc36('0x5e'))return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this['sparam'](0x0)*0x64))+'%':this[_0xa9fc36('0x297')](0x0);if(_0x1b25f2===_0xa9fc36('0x53d'))return _0x1d66a0?String(Math['round'](this[_0xa9fc36('0x297')](0x1)*0x64))+'%':this[_0xa9fc36('0x297')](0x1);if(_0x1b25f2===_0xa9fc36('0x1fa'))return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this['sparam'](0x2)*0x64))+'%':this[_0xa9fc36('0x297')](0x2);if(_0x1b25f2==='PHA')return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this[_0xa9fc36('0x297')](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x1b25f2===_0xa9fc36('0x52a'))return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this['sparam'](0x4)*0x64))+'%':this[_0xa9fc36('0x297')](0x4);if(_0x1b25f2===_0xa9fc36('0x244'))return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this[_0xa9fc36('0x297')](0x5)*0x64))+'%':this[_0xa9fc36('0x297')](0x5);if(_0x1b25f2===_0xa9fc36('0x1bd'))return _0x1d66a0?String(Math['round'](this[_0xa9fc36('0x297')](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x1b25f2==='MDR')return _0x1d66a0?String(Math['round'](this['sparam'](0x7)*0x64))+'%':this[_0xa9fc36('0x297')](0x7);if(_0x1b25f2===_0xa9fc36('0x3b9'))return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this[_0xa9fc36('0x297')](0x8)*0x64))+'%':this[_0xa9fc36('0x297')](0x8);if(_0x1b25f2===_0xa9fc36('0x150'))return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](this[_0xa9fc36('0x297')](0x9)*0x64))+'%':this[_0xa9fc36('0x297')](0x9);if(VisuMZ[_0xa9fc36('0x176')][_0xa9fc36('0x5ce')][_0x1b25f2]){if('YcMfS'!==_0xa9fc36('0x439')){function _0x5d313c(){_0x2c3620=_0x3f7f83['GroupDigits'](_0x50c7d5);}}else{const _0x4f290e=VisuMZ[_0xa9fc36('0x176')]['CustomParamAbb'][_0x1b25f2],_0x1b8ded=this[_0x4f290e];if(VisuMZ[_0xa9fc36('0x176')]['CustomParamType'][_0x1b25f2]===_0xa9fc36('0x55d')){if(_0xa9fc36('0x565')!=='mzsdp')return _0x1b8ded;else{function _0x3c8fd3(){const _0x4b6af6=_0xa9fc36;_0x5cc061[_0x4b6af6('0x554')]();}}}else return _0x1d66a0?String(Math[_0xa9fc36('0x5e2')](_0x1b8ded*0x64))+'%':_0x1b8ded;}}return'';},Game_BattlerBase[_0x43e5ad('0x4a4')]['isDying']=function(){const _0x1a5ef0=_0x43e5ad;return this['isAlive']()&&this[_0x1a5ef0('0x22b')]<this[_0x1a5ef0('0x583')]*VisuMZ[_0x1a5ef0('0x176')][_0x1a5ef0('0x117')][_0x1a5ef0('0x393')][_0x1a5ef0('0x14e')];},Game_Battler['prototype'][_0x43e5ad('0x575')]=function(){const _0x42349f=_0x43e5ad;SoundManager[_0x42349f('0x207')](),this[_0x42349f('0x1f8')]('evade');},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x22d')]=Game_Actor[_0x43e5ad('0x4a4')][_0x43e5ad('0x17a')],Game_Actor['prototype'][_0x43e5ad('0x17a')]=function(_0x3a37c6){const _0x154949=_0x43e5ad;if(this[_0x154949('0x419')]>0x63)return this[_0x154949('0x2eb')](_0x3a37c6);return VisuMZ['CoreEngine']['Game_Actor_paramBase'][_0x154949('0x2ca')](this,_0x3a37c6);},Game_Actor[_0x43e5ad('0x4a4')][_0x43e5ad('0x2eb')]=function(_0x5ca29e){const _0x4f8647=_0x43e5ad,_0x4c9da7=this[_0x4f8647('0xa6')]()[_0x4f8647('0x535')][_0x5ca29e][0x63],_0x3de107=this[_0x4f8647('0xa6')]()[_0x4f8647('0x535')][_0x5ca29e][0x62];return _0x4c9da7+(_0x4c9da7-_0x3de107)*(this[_0x4f8647('0x419')]-0x63);},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x4d4')]=Game_Actor[_0x43e5ad('0x4a4')]['changeClass'],Game_Actor[_0x43e5ad('0x4a4')]['changeClass']=function(_0x3199ef,_0x42bf36){const _0x3dd4da=_0x43e5ad;$gameTemp[_0x3dd4da('0x553')]=!![],VisuMZ[_0x3dd4da('0x176')][_0x3dd4da('0x4d4')][_0x3dd4da('0x2ca')](this,_0x3199ef,_0x42bf36),$gameTemp[_0x3dd4da('0x553')]=undefined;},VisuMZ['CoreEngine']['Game_Actor_levelUp']=Game_Actor[_0x43e5ad('0x4a4')][_0x43e5ad('0x340')],Game_Actor[_0x43e5ad('0x4a4')][_0x43e5ad('0x340')]=function(){const _0x4dede7=_0x43e5ad;VisuMZ[_0x4dede7('0x176')][_0x4dede7('0x9a')][_0x4dede7('0x2ca')](this);if(!$gameTemp['_changingClass'])this[_0x4dede7('0x3f8')]();},Game_Actor['prototype'][_0x43e5ad('0x3f8')]=function(){const _0x44663f=_0x43e5ad;this[_0x44663f('0x43f')]={};if(VisuMZ['CoreEngine'][_0x44663f('0x117')][_0x44663f('0x32')]['LevelUpFullHp'])this[_0x44663f('0x22b')]=this[_0x44663f('0x583')];if(VisuMZ[_0x44663f('0x176')][_0x44663f('0x117')][_0x44663f('0x32')][_0x44663f('0x507')])this[_0x44663f('0xfe')]=this['mmp'];},Game_Actor[_0x43e5ad('0x4a4')]['expRate']=function(){const _0x463b61=_0x43e5ad;if(this['isMaxLevel']())return 0x1;const _0x132d32=this[_0x463b61('0x216')]()-this[_0x463b61('0x1cb')](),_0x1f8308=this[_0x463b61('0x50c')]()-this[_0x463b61('0x1cb')]();return(_0x1f8308/_0x132d32)[_0x463b61('0x2c7')](0x0,0x1);},Game_Actor[_0x43e5ad('0x4a4')][_0x43e5ad('0x471')]=function(){const _0x13f4ec=_0x43e5ad,_0xf2be6c=Game_Battler[_0x13f4ec('0x4a4')][_0x13f4ec('0x471')][_0x13f4ec('0x2ca')](this);for(const _0x366b5e of this[_0x13f4ec('0x66')]()){if(_0x366b5e){if(_0x13f4ec('0x10')===_0x13f4ec('0x10'))_0xf2be6c[_0x13f4ec('0x3e4')](_0x366b5e);else{function _0x1079c5(){const _0x18c837=_0x13f4ec;this['visible']=![],this[_0x18c837('0x1d7')]=0x0,this['x']=_0x4f73a6['width']*0xa,this['y']=_0x111ed0['height']*0xa;}}}}return _0xf2be6c[_0x13f4ec('0x3e4')](this['currentClass'](),this[_0x13f4ec('0x390')]()),_0xf2be6c;},Object[_0x43e5ad('0x95')](Game_Enemy['prototype'],_0x43e5ad('0x419'),{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x43e5ad('0x4a4')][_0x43e5ad('0x65')]=function(){const _0x15fd6e=_0x43e5ad;return this['enemy']()[_0x15fd6e('0x419')];},Game_Enemy[_0x43e5ad('0x4a4')][_0x43e5ad('0x554')]=function(){const _0x3559f3=_0x43e5ad;if(!this[_0x3559f3('0x153')]){if(_0x3559f3('0x524')!==_0x3559f3('0x4a1')){this[_0x3559f3('0x4e6')]+=Math[_0x3559f3('0x5e2')]((Graphics[_0x3559f3('0xc')]-0x270)/0x2),this[_0x3559f3('0x4e6')]-=Math[_0x3559f3('0x59d')]((Graphics[_0x3559f3('0xc')]-Graphics['boxHeight'])/0x2);if($gameSystem[_0x3559f3('0x567')]())this[_0x3559f3('0x372')]-=Math[_0x3559f3('0x59d')]((Graphics[_0x3559f3('0x5a0')]-Graphics[_0x3559f3('0x5ed')])/0x2);else{if(_0x3559f3('0x236')===_0x3559f3('0x236'))this[_0x3559f3('0x372')]+=Math[_0x3559f3('0x5e2')]((Graphics[_0x3559f3('0x5ed')]-0x330)/0x2);else{function _0x2a8187(){const _0x19ede2=_0x3559f3;this[_0x19ede2('0x26f')]();}}}}else{function _0x559c31(){_0xe8c12f[_0x1c1f70]=_0x5a340a['stringKeyMap'][_0xcf2155[_0x4ab88a]];}}}this['_repositioned']=!![];},Game_Party[_0x43e5ad('0x4a4')][_0x43e5ad('0x542')]=function(){const _0x33646b=_0x43e5ad;return VisuMZ[_0x33646b('0x176')][_0x33646b('0x117')][_0x33646b('0x268')][_0x33646b('0x584')];},VisuMZ['CoreEngine'][_0x43e5ad('0x1b4')]=Game_Party[_0x43e5ad('0x4a4')][_0x43e5ad('0x4a8')],Game_Party[_0x43e5ad('0x4a4')][_0x43e5ad('0x4a8')]=function(_0xd7820e){const _0x4d8509=_0x43e5ad;if(VisuMZ['CoreEngine'][_0x4d8509('0x117')][_0x4d8509('0x32')][_0x4d8509('0x2fe')]&&DataManager[_0x4d8509('0x414')](_0xd7820e))return;VisuMZ[_0x4d8509('0x176')][_0x4d8509('0x1b4')][_0x4d8509('0x2ca')](this,_0xd7820e);},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x107')]=Game_Troop[_0x43e5ad('0x4a4')][_0x43e5ad('0x45c')],Game_Troop[_0x43e5ad('0x4a4')][_0x43e5ad('0x45c')]=function(_0x1e4fb3){const _0x50736b=_0x43e5ad;$gameTemp[_0x50736b('0x17c')](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x1e4fb3),VisuMZ[_0x50736b('0x176')]['Game_Troop_setup'][_0x50736b('0x2ca')](this,_0x1e4fb3);},VisuMZ[_0x43e5ad('0x176')]['Game_Map_setup']=Game_Map['prototype'][_0x43e5ad('0x45c')],Game_Map[_0x43e5ad('0x4a4')][_0x43e5ad('0x45c')]=function(_0x53ff28){const _0xd8723c=_0x43e5ad;VisuMZ[_0xd8723c('0x176')]['Game_Map_setup']['call'](this,_0x53ff28),this[_0xd8723c('0x142')](_0x53ff28);},Game_Map[_0x43e5ad('0x4a4')][_0x43e5ad('0x142')]=function(){const _0x3eca0c=_0x43e5ad;this[_0x3eca0c('0x500')]=VisuMZ[_0x3eca0c('0x176')]['Settings']['QoL'][_0x3eca0c('0x106')]||![];if($dataMap&&$dataMap[_0x3eca0c('0x47f')]){if(_0x3eca0c('0x114')===_0x3eca0c('0x114')){if($dataMap['note']['match'](/<SHOW TILE SHADOWS>/i))this[_0x3eca0c('0x500')]=![];if($dataMap[_0x3eca0c('0x47f')]['match'](/<HIDE TILE SHADOWS>/i))this[_0x3eca0c('0x500')]=!![];}else{function _0x5e3645(){const _0xe3dcd6=_0x3eca0c;this[_0xe3dcd6('0x141')]['x']=this[_0xe3dcd6('0x2f1')](this[_0xe3dcd6('0x141')]['x'],this[_0xe3dcd6('0x1ef')]['x']),this[_0xe3dcd6('0x141')]['y']=this['applyEasing'](this[_0xe3dcd6('0x141')]['y'],this[_0xe3dcd6('0x1ef')]['y']);}}}},Game_Map[_0x43e5ad('0x4a4')][_0x43e5ad('0x485')]=function(){const _0xe136db=_0x43e5ad;if(this[_0xe136db('0x500')]===undefined)this[_0xe136db('0x142')]();return this[_0xe136db('0x500')];},VisuMZ[_0x43e5ad('0x176')]['Game_Character_processMoveCommand']=Game_Character[_0x43e5ad('0x4a4')][_0x43e5ad('0x45d')],Game_Character[_0x43e5ad('0x4a4')][_0x43e5ad('0x45d')]=function(_0x2b42a8){const _0x2127a1=_0x43e5ad;try{VisuMZ['CoreEngine'][_0x2127a1('0x569')][_0x2127a1('0x2ca')](this,_0x2b42a8);}catch(_0x4dfe16){if($gameTemp[_0x2127a1('0x17e')]())console[_0x2127a1('0x4ba')](_0x4dfe16);}},Game_Player[_0x43e5ad('0x4a4')][_0x43e5ad('0x2a3')]=function(){const _0x3e0078=_0x43e5ad,_0x454c71=$gameMap[_0x3e0078('0x285')]();this[_0x3e0078('0x4fc')]=Math[_0x3e0078('0x203')](_0x454c71)+Math[_0x3e0078('0x203')](_0x454c71)+this['encounterStepsMinimum']();},Game_Player[_0x43e5ad('0x4a4')][_0x43e5ad('0x39c')]=function(){const _0x3d9aa6=_0x43e5ad;if($dataMap&&$dataMap[_0x3d9aa6('0x47f')]&&$dataMap[_0x3d9aa6('0x47f')][_0x3d9aa6('0x3eb')](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return Number(RegExp['$1']);else{if(_0x3d9aa6('0x71')!=='pubFD')return VisuMZ[_0x3d9aa6('0x176')][_0x3d9aa6('0x117')]['QoL'][_0x3d9aa6('0x5dd')];else{function _0x2c55ec(){const _0x39aeaa=_0x3d9aa6;_0x54657d[_0x39aeaa('0x176')][_0x39aeaa('0x51f')][_0x39aeaa('0x2ca')](this),this[_0x39aeaa('0x46e')]();}}}},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x2d2')]=Game_Event[_0x43e5ad('0x4a4')][_0x43e5ad('0x5c1')],Game_Event[_0x43e5ad('0x4a4')]['isCollidedWithEvents']=function(_0x350f94,_0x32fa64){const _0xd44e68=_0x43e5ad;if(this['isSmartEventCollisionOn']())return this['checkSmartEventCollision'](_0x350f94,_0x32fa64);else{if(_0xd44e68('0x45a')!=='fgedh'){function _0x481cfa(){const _0x2f105e=_0xd44e68,_0x1ea2c2=_0x4a2c57(_0x482286['$1']);if(_0x1ea2c2[_0x2f105e('0x3eb')](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x1ea2c2[_0x2f105e('0x3eb')](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x2f105e('0x3b2')]='SV');}}else return VisuMZ[_0xd44e68('0x176')][_0xd44e68('0x2d2')][_0xd44e68('0x2ca')](this,_0x350f94,_0x32fa64);}},Game_Event[_0x43e5ad('0x4a4')][_0x43e5ad('0x555')]=function(){const _0x516ce8=_0x43e5ad;return VisuMZ['CoreEngine']['Settings'][_0x516ce8('0x32')][_0x516ce8('0x2c4')];},Game_Event[_0x43e5ad('0x4a4')][_0x43e5ad('0x2af')]=function(_0x5fab4e,_0x4e2d4c){const _0x342095=_0x43e5ad;if(!this[_0x342095('0x322')]()){if(_0x342095('0x197')==='PPIpd'){function _0x3b9190(){const _0x2c04b8=_0x342095;this[_0x2c04b8('0x36e')][_0x2c04b8('0x38a')](_0x22c1c7['layoutSettings'][_0x2c04b8('0x1e0')]);}}else return![];}else{if(_0x342095('0x24e')===_0x342095('0x111')){function _0x1b6742(){const _0x392b3a=_0x342095;this[_0x392b3a('0x585')][_0x392b3a('0x38a')](_0x2c6342['layoutSettings'][_0x392b3a('0x134')]);}}else{const _0x2f21b8=$gameMap[_0x342095('0x4db')](_0x5fab4e,_0x4e2d4c)[_0x342095('0x29d')](_0x1fbf1b=>_0x1fbf1b[_0x342095('0x322')]());return _0x2f21b8[_0x342095('0x1d9')]>0x0;}}},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x2b5')]=Game_Interpreter[_0x43e5ad('0x4a4')][_0x43e5ad('0x3e')],Game_Interpreter[_0x43e5ad('0x4a4')]['command111']=function(_0x5201db){const _0x65efcf=_0x43e5ad;try{if(_0x65efcf('0x2f8')===_0x65efcf('0x2f8'))VisuMZ[_0x65efcf('0x176')][_0x65efcf('0x2b5')][_0x65efcf('0x2ca')](this,_0x5201db);else{function _0x5665c4(){const _0x5e3c62=_0x65efcf;this['_playtestF7Looping']=!![],this[_0x5e3c62('0x3a8')](),this[_0x5e3c62('0x213')]=![];}}}catch(_0x35dc03){$gameTemp[_0x65efcf('0x17e')]()&&(console['log'](_0x65efcf('0x3d8')),console['log'](_0x35dc03)),this[_0x65efcf('0x4c6')]();}return!![];},VisuMZ['CoreEngine'][_0x43e5ad('0x60a')]=Game_Interpreter[_0x43e5ad('0x4a4')][_0x43e5ad('0x42a')],Game_Interpreter[_0x43e5ad('0x4a4')][_0x43e5ad('0x42a')]=function(_0x397bf7){const _0x7412ba=_0x43e5ad;try{VisuMZ['CoreEngine'][_0x7412ba('0x60a')][_0x7412ba('0x2ca')](this,_0x397bf7);}catch(_0x3658e5){if('iGncZ'!==_0x7412ba('0x2e9')){if($gameTemp[_0x7412ba('0x17e')]()){if(_0x7412ba('0x219')!==_0x7412ba('0x1eb'))console[_0x7412ba('0x4ba')](_0x7412ba('0x7')),console[_0x7412ba('0x4ba')](_0x3658e5);else{function _0x1218df(){const _0x4597ec=_0x7412ba;_0x12c34b[_0x4597ec('0x207')](),this[_0x4597ec('0x1f8')](_0x4597ec('0x51c'));}}}}else{function _0x16ed05(){const _0x429927=_0x7412ba;return _0x3db25f[_0x429927('0x4a4')][_0x429927('0x608')][_0x429927('0x2ca')](this)+_0x477691['CoreEngine']['Settings'][_0x429927('0x3ff')][_0x429927('0x54f')];;}}}return!![];},VisuMZ['CoreEngine'][_0x43e5ad('0x333')]=Game_Interpreter[_0x43e5ad('0x4a4')][_0x43e5ad('0x2e2')],Game_Interpreter[_0x43e5ad('0x4a4')][_0x43e5ad('0x2e2')]=function(){const _0x1e7188=_0x43e5ad;try{if(_0x1e7188('0x4f9')===_0x1e7188('0x4f9'))VisuMZ[_0x1e7188('0x176')][_0x1e7188('0x333')][_0x1e7188('0x2ca')](this);else{function _0x5d042f(){var _0x57c1ea=_0x2c3785(_0x5b82f1['$1']);_0x5f4b9d+=_0x57c1ea;}}}catch(_0x49cc8e){if(_0x1e7188('0x2c8')==='jHUYH')$gameTemp[_0x1e7188('0x17e')]()&&(console[_0x1e7188('0x4ba')](_0x1e7188('0x4e8')),console[_0x1e7188('0x4ba')](_0x49cc8e));else{function _0x1a3a7b(){const _0x4e5ab4=_0x1e7188;return _0x9a4142[_0x4e5ab4('0x594')]['StatusRect']['call'](this);}}}return!![];},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x484')]=Game_Interpreter['prototype'][_0x43e5ad('0x44a')],Game_Interpreter['prototype']['command357']=function(_0x1e55fe){const _0x53c736=_0x43e5ad;return $gameTemp[_0x53c736('0x167')](this),VisuMZ[_0x53c736('0x176')][_0x53c736('0x484')][_0x53c736('0x2ca')](this,_0x1e55fe);},Scene_Base['prototype'][_0x43e5ad('0x44')]=function(){const _0xc5e604=_0x43e5ad;return VisuMZ[_0xc5e604('0x176')][_0xc5e604('0x117')]['UI'][_0xc5e604('0x4f7')];},Scene_Base['prototype'][_0x43e5ad('0x3dd')]=function(){const _0x24b76b=_0x43e5ad;return VisuMZ['CoreEngine'][_0x24b76b('0x117')]['UI'][_0x24b76b('0x1a7')];},Scene_Base['prototype']['isBottomButtonMode']=function(){const _0x15b8b6=_0x43e5ad;return VisuMZ[_0x15b8b6('0x176')][_0x15b8b6('0x117')]['UI'][_0x15b8b6('0x228')];},Scene_Base['prototype'][_0x43e5ad('0x448')]=function(){const _0x3c9bca=_0x43e5ad;return VisuMZ[_0x3c9bca('0x176')]['Settings']['UI'][_0x3c9bca('0x69')];},Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x562')]=function(){const _0x5741ae=_0x43e5ad;return VisuMZ[_0x5741ae('0x176')][_0x5741ae('0x117')]['UI']['CommandWidth'];},Scene_Base['prototype']['buttonAreaHeight']=function(){const _0x4f61cc=_0x43e5ad;return VisuMZ[_0x4f61cc('0x176')][_0x4f61cc('0x117')]['UI'][_0x4f61cc('0x3cd')];},Scene_Base[_0x43e5ad('0x4a4')]['isWindowMaskingEnabled']=function(){const _0x558385=_0x43e5ad;return VisuMZ['CoreEngine'][_0x558385('0x117')]['Window'][_0x558385('0xf')];},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x45f')]=Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x186')],Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x186')]=function(){const _0x4be6b0=_0x43e5ad;VisuMZ[_0x4be6b0('0x176')][_0x4be6b0('0x45f')]['call'](this),this['createButtonAssistWindow']();},Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0xae')]=function(){},Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x4c')]=function(){const _0x50e7cb=_0x43e5ad;return TextManager['getInputMultiButtonStrings']('pageup',_0x50e7cb('0x43'));},Scene_Base[_0x43e5ad('0x4a4')]['buttonAssistKey2']=function(){const _0x3d5a9a=_0x43e5ad;return TextManager[_0x3d5a9a('0xce')](_0x3d5a9a('0x4b5'));},Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x599')]=function(){const _0x39f6e8=_0x43e5ad;return TextManager[_0x39f6e8('0xce')](_0x39f6e8('0x574'));},Scene_Base['prototype'][_0x43e5ad('0x18e')]=function(){const _0x5c5dc5=_0x43e5ad;return TextManager[_0x5c5dc5('0xce')]('ok');},Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x4c4')]=function(){const _0x18a6e3=_0x43e5ad;return TextManager['getInputButtonString'](_0x18a6e3('0x1b'));},Scene_Base[_0x43e5ad('0x4a4')]['buttonAssistText1']=function(){const _0x53fba4=_0x43e5ad;return this[_0x53fba4('0x5b5')]&&this[_0x53fba4('0x5b5')]['visible']?TextManager[_0x53fba4('0x46')]:'';},Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x324')]=function(){return'';},Scene_Base[_0x43e5ad('0x4a4')]['buttonAssistText3']=function(){return'';},Scene_Base['prototype']['buttonAssistText4']=function(){const _0x28d33b=_0x43e5ad;return TextManager[_0x28d33b('0x29a')];},Scene_Base['prototype']['buttonAssistText5']=function(){const _0x4011bd=_0x43e5ad;return TextManager[_0x4011bd('0x20d')];},Scene_Base['prototype']['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x406')]=function(){return 0x0;},Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x25')]=function(){return 0x0;},Scene_Base[_0x43e5ad('0x4a4')]['buttonAssistOffset4']=function(){return 0x0;},Scene_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x50a')]=function(){return 0x0;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x531')]=Scene_Boot['prototype'][_0x43e5ad('0x593')],Scene_Boot[_0x43e5ad('0x4a4')]['loadSystemImages']=function(){const _0x1c252e=_0x43e5ad;VisuMZ[_0x1c252e('0x176')]['Scene_Boot_loadSystemImages'][_0x1c252e('0x2ca')](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x43e5ad('0x4a4')][_0x43e5ad('0x2c9')]=function(){const _0x910cdd=_0x43e5ad,_0x343c50=[_0x910cdd('0x35e'),_0x910cdd('0x32c'),_0x910cdd('0x17d'),_0x910cdd('0x258'),_0x910cdd('0x42d'),_0x910cdd('0x16e'),_0x910cdd('0x21d'),_0x910cdd('0x51e'),'sv_actors',_0x910cdd('0x27d'),_0x910cdd('0xcc'),_0x910cdd('0x5ca'),_0x910cdd('0x54c'),_0x910cdd('0x5d2')];for(const _0xb0faf0 of _0x343c50){const _0x366e7b=VisuMZ[_0x910cdd('0x176')]['Settings']['ImgLoad'][_0xb0faf0],_0x47fe9b=_0x910cdd('0x21f')[_0x910cdd('0x417')](_0xb0faf0);for(const _0x5d4065 of _0x366e7b){if(_0x910cdd('0xa4')!==_0x910cdd('0x39e'))ImageManager[_0x910cdd('0x28c')](_0x47fe9b,_0x5d4065);else{function _0x880bc7(){const _0x23687a=_0x910cdd,_0x4b3a6f=this[_0x23687a('0x5a')][_0x23687a('0x2e8')];let _0x281db2=0x0,_0x1ebec8=-_0x31d3db[_0x23687a('0xc')]/0x2;;if(_0x4b3a6f[_0x23687a('0x3eb')](/<(?:HEAD|HEADER|TOP)>/i))_0x1ebec8=-_0x5a370d[_0x23687a('0xc')];if(_0x4b3a6f[_0x23687a('0x3eb')](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x1ebec8=0x0;if(_0x4b3a6f[_0x23687a('0x3eb')](/<(?:LEFT)>/i))_0x281db2=-_0x5212ca[_0x23687a('0x5a0')]/0x2;if(_0x4b3a6f[_0x23687a('0x3eb')](/<(?:RIGHT)>/i))_0x1ebec8=_0x52ec0f['width']/0x2;if(_0x4b3a6f['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x281db2=_0xb8b6fd(_0x35e1c6['$1'])*_0x379830[_0x23687a('0x5a0')];_0x4b3a6f['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x1ebec8=(0x1-_0x57dbd2(_0x50355b['$1']))*-_0x291931[_0x23687a('0xc')]);_0x4b3a6f[_0x23687a('0x3eb')](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x281db2=_0x22d259(_0x4390ce['$1'])*_0x58000c[_0x23687a('0x5a0')],_0x1ebec8=(0x1-_0x6f947d(_0x1432b0['$2']))*-_0x25bc60[_0x23687a('0xc')]);if(_0x4b3a6f[_0x23687a('0x3eb')](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x281db2+=_0x479ffc(_0x186bac['$1']);if(_0x4b3a6f[_0x23687a('0x3eb')](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x1ebec8+=_0x4b6b3c(_0x5e00d4['$1']);_0x4b3a6f['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x281db2+=_0x1b608a(_0x39e35a['$1']),_0x1ebec8+=_0xdb0247(_0x133a7d['$2']));const _0x56b5e7=new _0x53342c(_0x281db2,_0x1ebec8);return _0x345223['updateTransform'](),_0x3396d5[_0x23687a('0x573')][_0x23687a('0x4bf')](_0x56b5e7);}}}}},VisuMZ[_0x43e5ad('0x176')]['Scene_Boot_startNormalGame']=Scene_Boot['prototype']['startNormalGame'],Scene_Boot[_0x43e5ad('0x4a4')][_0x43e5ad('0x118')]=function(){const _0x3e015f=_0x43e5ad;Utils[_0x3e015f('0x341')](_0x3e015f('0x39a'))&&VisuMZ['CoreEngine'][_0x3e015f('0x117')]['QoL'][_0x3e015f('0x52d')]?this[_0x3e015f('0x4e3')]():VisuMZ['CoreEngine']['Scene_Boot_startNormalGame'][_0x3e015f('0x2ca')](this);},Scene_Boot[_0x43e5ad('0x4a4')]['startAutoNewGame']=function(){const _0x3fbb32=_0x43e5ad;DataManager[_0x3fbb32('0x1ab')](),SceneManager[_0x3fbb32('0x24d')](Scene_Map);},Scene_Boot[_0x43e5ad('0x4a4')]['adjustBoxSize']=function(){const _0x13bb83=_0x43e5ad,_0x4483f1=$dataSystem[_0x13bb83('0x1e2')][_0x13bb83('0x5ae')],_0x2e7d3b=$dataSystem[_0x13bb83('0x1e2')][_0x13bb83('0x53e')],_0x1e934c=VisuMZ[_0x13bb83('0x176')]['Settings']['UI'][_0x13bb83('0x4a5')];Graphics['boxWidth']=_0x4483f1-_0x1e934c*0x2,Graphics[_0x13bb83('0xea')]=_0x2e7d3b-_0x1e934c*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x43e5ad('0x176')]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x43e5ad('0x4a4')][_0x43e5ad('0x98')],Scene_Boot['prototype'][_0x43e5ad('0x98')]=function(){const _0x5a4c27=_0x43e5ad;if(this[_0x5a4c27('0x1e5')]())this[_0x5a4c27('0x534')]();else{if('ZIVzh'===_0x5a4c27('0x286'))VisuMZ[_0x5a4c27('0x176')][_0x5a4c27('0x1c9')]['call'](this);else{function _0x2d1d3e(){const _0x423d0f=_0x5a4c27;if(_0x473891['isPlaytest']())_0x24d50e[_0x423d0f('0x4ba')](_0x492a94);}}}},Scene_Boot[_0x43e5ad('0x4a4')][_0x43e5ad('0x1e5')]=function(){const _0x1df61a=_0x43e5ad;if(Scene_Title[_0x1df61a('0x380')]==='')return![];if(Scene_Title['subtitle']===_0x1df61a('0x2ce'))return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x1df61a('0x1')]===_0x1df61a('0xd1'))return![];return!![];},Scene_Boot[_0x43e5ad('0x4a4')][_0x43e5ad('0x534')]=function(){const _0x5ab3e5=_0x43e5ad,_0x167eaf=$dataSystem[_0x5ab3e5('0x4d8')],_0x5e4055=Scene_Title['subtitle']||'',_0x1d0a7c=Scene_Title[_0x5ab3e5('0x1')]||'',_0x2ad01b=VisuMZ[_0x5ab3e5('0x176')][_0x5ab3e5('0x117')][_0x5ab3e5('0x245')][_0x5ab3e5('0x3fd')][_0x5ab3e5('0xf9')],_0x524ac2=_0x2ad01b['format'](_0x167eaf,_0x5e4055,_0x1d0a7c);document['title']=_0x524ac2;},Scene_Boot[_0x43e5ad('0x4a4')][_0x43e5ad('0x444')]=function(){const _0x43f9d5=_0x43e5ad;if(VisuMZ['CoreEngine'][_0x43f9d5('0x117')]['UI'][_0x43f9d5('0x247')]){if(_0x43f9d5('0x403')!==_0x43f9d5('0x403')){function _0x2cdb5e(){const _0x3fc2d5=_0x43f9d5;return this[_0x3fc2d5('0x611')]();}}else{const _0x17cee1=Graphics[_0x43f9d5('0x5a0')]-Graphics[_0x43f9d5('0x5ed')]-VisuMZ['CoreEngine'][_0x43f9d5('0x117')]['UI'][_0x43f9d5('0x4a5')]*0x2,_0x55e53b=Sprite_Button[_0x43f9d5('0x4a4')][_0x43f9d5('0x8a')][_0x43f9d5('0x2ca')](this)*0x4;if(_0x17cee1>=_0x55e53b)SceneManager['setSideButtonLayout'](!![]);}}},Scene_Title[_0x43e5ad('0x380')]=VisuMZ['CoreEngine']['Settings'][_0x43e5ad('0x245')][_0x43e5ad('0x3fd')][_0x43e5ad('0x2ce')],Scene_Title[_0x43e5ad('0x1')]=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')][_0x43e5ad('0x245')]['Title'][_0x43e5ad('0x5ea')],Scene_Title[_0x43e5ad('0x5c0')]=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')][_0x43e5ad('0x57f')],VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x6b')]=Scene_Title[_0x43e5ad('0x4a4')][_0x43e5ad('0xb8')],Scene_Title[_0x43e5ad('0x4a4')]['drawGameTitle']=function(){const _0x41df8b=_0x43e5ad;VisuMZ[_0x41df8b('0x176')][_0x41df8b('0x117')][_0x41df8b('0x245')][_0x41df8b('0x3fd')][_0x41df8b('0xb8')][_0x41df8b('0x2ca')](this);if(Scene_Title[_0x41df8b('0x380')]!==''&&Scene_Title[_0x41df8b('0x380')]!==_0x41df8b('0x2ce'))this[_0x41df8b('0x2e5')]();if(Scene_Title[_0x41df8b('0x1')]!==''&&Scene_Title['version']!==_0x41df8b('0xd1'))this[_0x41df8b('0x149')]();},Scene_Title[_0x43e5ad('0x4a4')][_0x43e5ad('0x2e5')]=function(){const _0x2d8a80=_0x43e5ad;VisuMZ[_0x2d8a80('0x176')]['Settings'][_0x2d8a80('0x245')][_0x2d8a80('0x3fd')][_0x2d8a80('0x2e5')][_0x2d8a80('0x2ca')](this);},Scene_Title[_0x43e5ad('0x4a4')][_0x43e5ad('0x149')]=function(){const _0x2153c9=_0x43e5ad;VisuMZ[_0x2153c9('0x176')][_0x2153c9('0x117')][_0x2153c9('0x245')]['Title'][_0x2153c9('0x149')][_0x2153c9('0x2ca')](this);},Scene_Title[_0x43e5ad('0x4a4')][_0x43e5ad('0x3de')]=function(){const _0x18a102=_0x43e5ad;this['createTitleButtons']();const _0x441573=$dataSystem['titleCommandWindow'][_0x18a102('0x2f')],_0xb95e3c=this[_0x18a102('0x4d0')]();this['_commandWindow']=new Window_TitleCommand(_0xb95e3c),this[_0x18a102('0x585')]['setBackgroundType'](_0x441573);const _0x76ff19=this[_0x18a102('0x4d0')]();this[_0x18a102('0x585')]['move'](_0x76ff19['x'],_0x76ff19['y'],_0x76ff19[_0x18a102('0x5a0')],_0x76ff19['height']),this['addWindow'](this[_0x18a102('0x585')]);},Scene_Title[_0x43e5ad('0x4a4')][_0x43e5ad('0x218')]=function(){const _0x5cbb27=_0x43e5ad;return this[_0x5cbb27('0x585')]?this[_0x5cbb27('0x585')][_0x5cbb27('0x249')]():VisuMZ[_0x5cbb27('0x176')][_0x5cbb27('0x117')][_0x5cbb27('0x40c')]['length'];},Scene_Title[_0x43e5ad('0x4a4')][_0x43e5ad('0x4d0')]=function(){const _0x4a9f9b=_0x43e5ad;return VisuMZ[_0x4a9f9b('0x176')][_0x4a9f9b('0x117')][_0x4a9f9b('0x245')][_0x4a9f9b('0x3fd')][_0x4a9f9b('0x30d')][_0x4a9f9b('0x2ca')](this);},Scene_Title['prototype'][_0x43e5ad('0x1d4')]=function(){const _0xc8071b=_0x43e5ad;for(const _0x372c24 of Scene_Title[_0xc8071b('0x5c0')]){if(_0xc8071b('0x5a2')!==_0xc8071b('0x5a2')){function _0x5395d6(){const _0xad75d9=_0xc8071b;var _0x3bcde3=_0x59a769(_0x1267fc['$1']);try{_0x2664cb+=_0x4394b8(_0x3bcde3);}catch(_0x46d48e){if(_0x733a4d[_0xad75d9('0x17e')]())_0x522f79[_0xad75d9('0x4ba')](_0x46d48e);}}}else{const _0x2a60bf=new Sprite_TitlePictureButton(_0x372c24);this['addChild'](_0x2a60bf);}}},VisuMZ['CoreEngine']['Scene_Map_initialize']=Scene_Map['prototype'][_0x43e5ad('0x56')],Scene_Map[_0x43e5ad('0x4a4')]['initialize']=function(){const _0x4b0105=_0x43e5ad;VisuMZ['CoreEngine'][_0x4b0105('0x277')]['call'](this),$gameTemp[_0x4b0105('0x17c')]();},VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply']=Scene_Map[_0x43e5ad('0x4a4')]['updateMainMultiply'],Scene_Map[_0x43e5ad('0x4a4')][_0x43e5ad('0x1d1')]=function(){const _0x284071=_0x43e5ad;VisuMZ[_0x284071('0x176')]['Scene_Map_updateMainMultiply'][_0x284071('0x2ca')](this);if($gameTemp['_playTestFastMode']&&!$gameMessage[_0x284071('0x369')]())this[_0x284071('0x27c')]();},Scene_Map[_0x43e5ad('0x4a4')][_0x43e5ad('0x4bd')]=function(){const _0x5ba407=_0x43e5ad;Scene_Message[_0x5ba407('0x4a4')][_0x5ba407('0x4bd')][_0x5ba407('0x2ca')](this),!SceneManager[_0x5ba407('0x20b')](Scene_Battle)&&(this[_0x5ba407('0x289')]['update'](),this[_0x5ba407('0x304')]['hide'](),this[_0x5ba407('0x91')][_0x5ba407('0x256')]=![],SceneManager[_0x5ba407('0xd7')]()),$gameScreen[_0x5ba407('0x39d')]();},VisuMZ['CoreEngine'][_0x43e5ad('0x182')]=Scene_Map['prototype'][_0x43e5ad('0x222')],Scene_Map['prototype'][_0x43e5ad('0x222')]=function(){const _0x2d512c=_0x43e5ad;VisuMZ[_0x2d512c('0x176')]['Scene_Map_createMenuButton'][_0x2d512c('0x2ca')](this);if(SceneManager[_0x2d512c('0x3ea')]()){if('uszhd'===_0x2d512c('0x489'))this[_0x2d512c('0xd')]();else{function _0x4206e8(){const _0x408872=_0x2d512c;_0x23f9fe[_0x408872('0x176')][_0x408872('0x2db')][_0x408872('0x2ca')](this),this[_0x408872('0x2ed')]();}}}},Scene_Map['prototype'][_0x43e5ad('0xd')]=function(){this['_menuButton']['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x311')]=Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x101')],Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x101')]=function(){const _0x7c5ab0=_0x43e5ad;let _0x284b02=0x0;if(SceneManager['areButtonsOutsideMainUI']())_0x284b02=this['helpAreaTopSideButtonLayout']();else{if(_0x7c5ab0('0x49b')!==_0x7c5ab0('0x215'))_0x284b02=VisuMZ[_0x7c5ab0('0x176')]['Scene_MenuBase_helpAreaTop'][_0x7c5ab0('0x2ca')](this);else{function _0x811c44(){const _0x5661a1=_0x7c5ab0;if(this[_0x5661a1('0x243')]===_0x5e72a3)this[_0x5661a1('0x3a1')]();if(this[_0x5661a1('0x243')][_0x5661a1('0x169')]===_0x52622f)this[_0x5661a1('0x3a1')]();this['_CoreEngineSettings'][_0x5661a1('0x453')]=_0xd64f8b;}}}return this['isMenuButtonAssistEnabled']()&&this[_0x7c5ab0('0x28e')]()==='top'&&(_0x284b02+=Window_ButtonAssist[_0x7c5ab0('0x4a4')][_0x7c5ab0('0x59b')]()),_0x284b02;},Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x36d')]=function(){const _0xc3616f=_0x43e5ad;if(this[_0xc3616f('0x3dd')]()){if('TqQoQ'!==_0xc3616f('0x451'))return this[_0xc3616f('0x212')]();else{function _0x2f41c2(){const _0x1cada8=_0xc3616f;this[_0x1cada8('0x34d')][_0x1cada8('0xe7')]-=0x6;}}}else return 0x0;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x62')]=Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0xf6')],Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0xf6')]=function(){const _0x42a1aa=_0x43e5ad;if(SceneManager[_0x42a1aa('0x257')]())return this['mainAreaTopSideButtonLayout']();else{if(_0x42a1aa('0x60c')===_0x42a1aa('0x28d')){function _0x1babcc(){const _0x14845e=_0x42a1aa;let _0x4fdc5a=_0x18acb9['abs'](_0x363bfb)[_0x14845e('0x262')]();this[_0x14845e('0x563')]()&&(_0x4fdc5a=_0x52aca8[_0x14845e('0x37f')](_0x4fdc5a));const _0x5d5d2e=this['fontSize'](),_0x3f310f=_0x1e39aa['floor'](_0x5d5d2e*0.75);for(let _0x3f941c=0x0;_0x3f941c<_0x4fdc5a[_0x14845e('0x1d9')];_0x3f941c++){const _0x20bc27=this[_0x14845e('0xc6')](_0x3f310f,_0x5d5d2e);_0x20bc27[_0x14845e('0x529')][_0x14845e('0x151')](_0x4fdc5a[_0x3f941c],0x0,0x0,_0x3f310f,_0x5d5d2e,_0x14845e('0x410')),_0x20bc27['x']=(_0x3f941c-(_0x4fdc5a[_0x14845e('0x1d9')]-0x1)/0x2)*_0x3f310f,_0x20bc27['dy']=-_0x3f941c;}}}else return VisuMZ[_0x42a1aa('0x176')][_0x42a1aa('0x62')][_0x42a1aa('0x2ca')](this);}},Scene_MenuBase['prototype'][_0x43e5ad('0x3f9')]=function(){const _0x3d5497=_0x43e5ad;if(!this[_0x3d5497('0x3dd')]()){if('weauK'===_0x3d5497('0x3bf'))return this[_0x3d5497('0xeb')]();else{function _0x285c19(){const _0x436b98=_0x3d5497;if(this[_0x436b98('0x125')]<=0x0)return;const _0x4c1a1b=this['_movementDuration'],_0x214f81=this[_0x436b98('0x5f5')],_0x158f5e=this[_0x436b98('0x5d3')];this[_0x436b98('0x190')]=this[_0x436b98('0x2f1')](this[_0x436b98('0x190')],this[_0x436b98('0x23b')],_0x4c1a1b,_0x214f81,_0x158f5e),this['_offsetY']=this['applyEasing'](this[_0x436b98('0x32b')],this[_0x436b98('0x124')],_0x4c1a1b,_0x214f81,_0x158f5e),this['_movementDuration']--;if(this['_movementDuration']<=0x0)this[_0x436b98('0x323')]();}}}else{if(_0x3d5497('0x23f')!=='dvWDR'){function _0x60a202(){const _0x4cd2dc=_0x3d5497;_0x17b9c8['seVolume']!==0x0?(_0x3bc2f9['bgmVolume']=0x0,_0x13d099[_0x4cd2dc('0x13e')]=0x0,_0x135ab6[_0x4cd2dc('0x520')]=0x0,_0x3844c0['seVolume']=0x0):(_0x471ae8[_0x4cd2dc('0x227')]=0x64,_0xbbc622[_0x4cd2dc('0x13e')]=0x64,_0x3cca00[_0x4cd2dc('0x520')]=0x64,_0x429279['seVolume']=0x64);_0x5dfdce[_0x4cd2dc('0x130')]();if(this['_scene'][_0x4cd2dc('0x191')]===_0x5de24a){if(this[_0x4cd2dc('0x240')][_0x4cd2dc('0x479')])this[_0x4cd2dc('0x240')][_0x4cd2dc('0x479')]['refresh']();if(this[_0x4cd2dc('0x240')]['_listWindow'])this[_0x4cd2dc('0x240')]['_listWindow'][_0x4cd2dc('0x611')]();}}}else return 0x0;}},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x437')]=Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x2fb')],Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x2fb')]=function(){const _0x8bbdff=_0x43e5ad;let _0x230df0=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x230df0=this[_0x8bbdff('0x5e8')]():_0x230df0=VisuMZ[_0x8bbdff('0x176')]['Scene_MenuBase_mainAreaHeight'][_0x8bbdff('0x2ca')](this),this[_0x8bbdff('0x41d')]()&&this['getButtonAssistLocation']()!==_0x8bbdff('0x40')&&(_0x230df0-=Window_ButtonAssist[_0x8bbdff('0x4a4')]['lineHeight']()),_0x230df0;},Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x5e8')]=function(){const _0xa54177=_0x43e5ad;return Graphics[_0xa54177('0xea')]-this[_0xa54177('0xc8')]();},VisuMZ['CoreEngine']['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0xc7')],Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0xc7')]=function(){const _0xe16903=_0x43e5ad;VisuMZ[_0xe16903('0x176')][_0xe16903('0x603')][_0xe16903('0x2ca')](this),this[_0xe16903('0x22c')](this[_0xe16903('0x5cf')]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x5cf')]=function(){const _0x5c2cf3=_0x43e5ad,_0x1a06dd=String(this[_0x5c2cf3('0x191')]['name']),_0x57196c=this['getCustomBackgroundSettings'](_0x1a06dd);return _0x57196c?_0x57196c[_0x5c2cf3('0x40e')]:0xc0;},Scene_MenuBase['prototype'][_0x43e5ad('0x309')]=function(){const _0x16b9b9=_0x43e5ad,_0x31c38c=String(this[_0x16b9b9('0x191')][_0x16b9b9('0x2e8')]),_0x81a0b4=this[_0x16b9b9('0x109')](_0x31c38c);_0x81a0b4&&(_0x81a0b4['BgFilename1']!==''||_0x81a0b4['BgFilename2']!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x16b9b9('0x4d9')](_0x81a0b4['BgFilename1'])),this[_0x16b9b9('0x29f')]=new Sprite(ImageManager[_0x16b9b9('0x464')](_0x81a0b4['BgFilename2'])),this['addChild'](this[_0x16b9b9('0x1f0')]),this[_0x16b9b9('0x3a2')](this[_0x16b9b9('0x29f')]),this[_0x16b9b9('0x1f0')]['bitmap']['addLoadListener'](this['adjustSprite'][_0x16b9b9('0xc2')](this,this['_backSprite1'])),this[_0x16b9b9('0x29f')][_0x16b9b9('0x529')][_0x16b9b9('0x37a')](this[_0x16b9b9('0x58b')][_0x16b9b9('0xc2')](this,this[_0x16b9b9('0x29f')])));},Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x109')]=function(_0x108201){const _0x1f13f3=_0x43e5ad;return VisuMZ[_0x1f13f3('0x176')][_0x1f13f3('0x117')][_0x1f13f3('0x271')][_0x108201]||VisuMZ[_0x1f13f3('0x176')]['Settings'][_0x1f13f3('0x271')]['Scene_Unlisted'];},Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x58b')]=function(_0x387777){const _0x46562d=_0x43e5ad;this[_0x46562d('0x318')](_0x387777),this['centerSprite'](_0x387777);},VisuMZ['CoreEngine'][_0x43e5ad('0x416')]=Scene_MenuBase[_0x43e5ad('0x4a4')]['createCancelButton'],Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x217')]=function(){const _0x50fd27=_0x43e5ad;VisuMZ[_0x50fd27('0x176')][_0x50fd27('0x416')][_0x50fd27('0x2ca')](this),SceneManager[_0x50fd27('0x3ea')]()&&this[_0x50fd27('0x5d')]();},Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x5d')]=function(){const _0x30c81e=_0x43e5ad;this['_cancelButton']['x']=Graphics[_0x30c81e('0x5ed')]+0x4;},VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x55a')],Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x55a')]=function(){const _0x1e707a=_0x43e5ad;VisuMZ['CoreEngine'][_0x1e707a('0x4d')]['call'](this),SceneManager[_0x1e707a('0x3ea')]()&&this[_0x1e707a('0x26f')]();},Scene_MenuBase['prototype'][_0x43e5ad('0x26f')]=function(){const _0x47c978=_0x43e5ad;this['_pageupButton']['x']=-0x1*(this['_pageupButton'][_0x47c978('0x5a0')]+this['_pagedownButton'][_0x47c978('0x5a0')]+0x8),this['_pagedownButton']['x']=-0x1*(this['_pagedownButton'][_0x47c978('0x5a0')]+0x4);},Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x41d')]=function(){const _0x45012e=_0x43e5ad;return VisuMZ[_0x45012e('0x176')]['Settings'][_0x45012e('0x3e0')][_0x45012e('0x4d6')];},Scene_MenuBase[_0x43e5ad('0x4a4')]['getButtonAssistLocation']=function(){const _0x3af932=_0x43e5ad;if(SceneManager[_0x3af932('0x3ea')]()||SceneManager[_0x3af932('0x4b3')]()){if(_0x3af932('0x287')===_0x3af932('0x287'))return VisuMZ[_0x3af932('0x176')][_0x3af932('0x117')][_0x3af932('0x3e0')][_0x3af932('0x37c')];else{function _0x3cd436(){const _0x38dbc8=_0x3af932;return this[_0x38dbc8('0x611')]();}}}else return _0x3af932('0x40');},Scene_MenuBase[_0x43e5ad('0x4a4')]['createButtonAssistWindow']=function(){const _0x26c783=_0x43e5ad;if(!this[_0x26c783('0x41d')]())return;const _0x479e0b=this[_0x26c783('0x396')]();this[_0x26c783('0x26a')]=new Window_ButtonAssist(_0x479e0b),this[_0x26c783('0x4d2')](this[_0x26c783('0x26a')]);},Scene_MenuBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x396')]=function(){const _0x1d945c=_0x43e5ad;return this[_0x1d945c('0x28e')]()===_0x1d945c('0x40')?this['buttonAssistWindowButtonRect']():this[_0x1d945c('0x157')]();},Scene_MenuBase[_0x43e5ad('0x4a4')]['buttonAssistWindowButtonRect']=function(){const _0x3dc50a=_0x43e5ad,_0x7ba044=ConfigManager[_0x3dc50a('0x5dc')]?(Sprite_Button[_0x3dc50a('0x4a4')][_0x3dc50a('0x8a')]()+0x6)*0x2:0x0,_0x231128=this[_0x3dc50a('0x1c5')](),_0x25687e=Graphics[_0x3dc50a('0x5ed')]-_0x7ba044*0x2,_0x5c08a1=this[_0x3dc50a('0x20f')]();return new Rectangle(_0x7ba044,_0x231128,_0x25687e,_0x5c08a1);},Scene_MenuBase['prototype'][_0x43e5ad('0x157')]=function(){const _0x2e0f70=_0x43e5ad,_0x42329f=Graphics[_0x2e0f70('0x5ed')],_0x50a23f=Window_ButtonAssist[_0x2e0f70('0x4a4')]['lineHeight'](),_0x50f563=0x0;let _0x31a35a=0x0;if(this[_0x2e0f70('0x28e')]()===_0x2e0f70('0x10e')){if(_0x2e0f70('0x85')===_0x2e0f70('0x3be')){function _0x31326f(){const _0x1b7285=_0x2e0f70;if(_0x1dad9c[_0x1b7285('0x4ec')][_0x1b7285('0x2ca')](this)){const _0x3207d6=_0x49bc96[_0x1b7285('0x6f')];let _0x1e2ad0=_0x3ae383[_0x1b7285('0x547')];if(['',_0x1b7285('0x4be')][_0x1b7285('0x56b')](_0x1e2ad0))_0x1e2ad0=_0x5ba510['TextJS']['call'](this);const _0x428c2a=_0x58d064[_0x1b7285('0x5a7')][_0x1b7285('0x2ca')](this),_0x5e7032=_0x15738d[_0x1b7285('0xef')][_0x1b7285('0x2ca')](this);this[_0x1b7285('0xa8')](_0x1e2ad0,_0x3207d6,_0x428c2a,_0x5e7032),this[_0x1b7285('0x4da')](_0x3207d6,_0x165602['CallHandlerJS']['bind'](this,_0x5e7032));}}}else _0x31a35a=0x0;}else _0x31a35a=Graphics[_0x2e0f70('0xea')]-_0x50a23f;return new Rectangle(_0x50f563,_0x31a35a,_0x42329f,_0x50a23f);},Scene_Menu[_0x43e5ad('0x594')]=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')][_0x43e5ad('0x245')][_0x43e5ad('0x290')],VisuMZ['CoreEngine'][_0x43e5ad('0x375')]=Scene_Menu[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')],Scene_Menu[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')]=function(){const _0x3e48a4=_0x43e5ad;VisuMZ[_0x3e48a4('0x176')][_0x3e48a4('0x375')][_0x3e48a4('0x2ca')](this),this[_0x3e48a4('0x2ed')]();},Scene_Menu[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ed')]=function(){const _0x128317=_0x43e5ad;if(this[_0x128317('0x585')]){if('JSDMs'===_0x128317('0x4e4'))this[_0x128317('0x585')][_0x128317('0x38a')](Scene_Menu[_0x128317('0x594')][_0x128317('0x134')]);else{function _0x1e34b3(){const _0x32e281=_0x128317;return _0x15d32f[_0x32e281('0x176')][_0x32e281('0x117')][_0x32e281('0x3e0')][_0x32e281('0x4d6')];}}}if(this[_0x128317('0x36e')]){if(_0x128317('0xc4')!==_0x128317('0x4a3'))this[_0x128317('0x36e')][_0x128317('0x38a')](Scene_Menu['layoutSettings']['GoldBgType']);else{function _0x26c570(){const _0x5bbaa4=_0x128317;_0x47b648[_0x5bbaa4('0x58')](_0x2446f3['EQUAL'],0x0,~0x0),_0x2ea101[_0x5bbaa4('0x116')](_0xa57f3c['KEEP'],_0x365acb[_0x5bbaa4('0x12d')],_0x1d2972['KEEP']),_0xb45c73['render'](_0x1f0307),_0x59634c[_0x5bbaa4('0x20e')][_0x5bbaa4('0xda')](),_0xc23f99['clear'](),_0x21620c[_0x5bbaa4('0x58')](_0x5b03df[_0x5bbaa4('0xbf')],0x1,~0x0),_0x53d1c2['stencilOp'](_0x4cb74c['REPLACE'],_0x5c298d[_0x5bbaa4('0x546')],_0x3edab4[_0x5bbaa4('0x546')]),_0x4e8796[_0x5bbaa4('0x22a')](_0x117a79[_0x5bbaa4('0x194')],_0x270ae0['ONE']),_0x4223f4['render'](_0x5e4144),_0x51f27d[_0x5bbaa4('0x20e')]['flush'](),_0x438a2a[_0x5bbaa4('0x22a')](_0x4952d7['ONE'],_0x2ddb5d[_0x5bbaa4('0x246')]);}}}this['_statusWindow']&&this[_0x128317('0x234')]['setBackgroundType'](Scene_Menu[_0x128317('0x594')][_0x128317('0x162')]);},Scene_Menu['prototype'][_0x43e5ad('0x4d0')]=function(){const _0x4133dc=_0x43e5ad;return Scene_Menu[_0x4133dc('0x594')][_0x4133dc('0x30d')][_0x4133dc('0x2ca')](this);},Scene_Menu[_0x43e5ad('0x4a4')]['goldWindowRect']=function(){const _0xf264ad=_0x43e5ad;return Scene_Menu[_0xf264ad('0x594')][_0xf264ad('0x2e7')]['call'](this);},Scene_Menu[_0x43e5ad('0x4a4')]['statusWindowRect']=function(){const _0x21e68c=_0x43e5ad;return Scene_Menu[_0x21e68c('0x594')][_0x21e68c('0x397')]['call'](this);},Scene_Item['layoutSettings']=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')][_0x43e5ad('0x245')][_0x43e5ad('0xfa')],VisuMZ['CoreEngine'][_0x43e5ad('0x13d')]=Scene_Item['prototype']['create'],Scene_Item[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')]=function(){const _0x3356b6=_0x43e5ad;VisuMZ[_0x3356b6('0x176')][_0x3356b6('0x13d')]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item['prototype'][_0x43e5ad('0x2ed')]=function(){const _0x4609ff=_0x43e5ad;this[_0x4609ff('0x612')]&&this[_0x4609ff('0x612')][_0x4609ff('0x38a')](Scene_Item[_0x4609ff('0x594')][_0x4609ff('0x16')]),this['_categoryWindow']&&this[_0x4609ff('0x3')][_0x4609ff('0x38a')](Scene_Item[_0x4609ff('0x594')][_0x4609ff('0x446')]),this['_itemWindow']&&this[_0x4609ff('0x527')][_0x4609ff('0x38a')](Scene_Item['layoutSettings'][_0x4609ff('0xa2')]),this['_actorWindow']&&this[_0x4609ff('0x8c')][_0x4609ff('0x38a')](Scene_Item['layoutSettings'][_0x4609ff('0x49')]);},Scene_Item[_0x43e5ad('0x4a4')][_0x43e5ad('0x1d3')]=function(){const _0x2a2652=_0x43e5ad;return Scene_Item[_0x2a2652('0x594')][_0x2a2652('0x351')][_0x2a2652('0x2ca')](this);},Scene_Item[_0x43e5ad('0x4a4')]['categoryWindowRect']=function(){const _0xa6c0c7=_0x43e5ad;return Scene_Item[_0xa6c0c7('0x594')][_0xa6c0c7('0x2ff')][_0xa6c0c7('0x2ca')](this);},Scene_Item[_0x43e5ad('0x4a4')][_0x43e5ad('0x26b')]=function(){return Scene_Item['layoutSettings']['ItemRect']['call'](this);},Scene_Item[_0x43e5ad('0x4a4')]['actorWindowRect']=function(){const _0x59b776=_0x43e5ad;return Scene_Item[_0x59b776('0x594')][_0x59b776('0x36a')]['call'](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')]['MenuLayout']['SkillMenu'],VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x2db')]=Scene_Skill[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')],Scene_Skill[_0x43e5ad('0x4a4')]['create']=function(){const _0x402157=_0x43e5ad;VisuMZ[_0x402157('0x176')][_0x402157('0x2db')][_0x402157('0x2ca')](this),this[_0x402157('0x2ed')]();},Scene_Skill[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ed')]=function(){const _0x41320e=_0x43e5ad;this[_0x41320e('0x612')]&&this[_0x41320e('0x612')][_0x41320e('0x38a')](Scene_Skill['layoutSettings']['HelpBgType']),this[_0x41320e('0x2a1')]&&this['_skillTypeWindow'][_0x41320e('0x38a')](Scene_Skill[_0x41320e('0x594')][_0x41320e('0x4f0')]),this['_statusWindow']&&this[_0x41320e('0x234')][_0x41320e('0x38a')](Scene_Skill['layoutSettings']['StatusBgType']),this['_itemWindow']&&this[_0x41320e('0x527')][_0x41320e('0x38a')](Scene_Skill[_0x41320e('0x594')][_0x41320e('0xa2')]),this[_0x41320e('0x8c')]&&this[_0x41320e('0x8c')][_0x41320e('0x38a')](Scene_Skill['layoutSettings'][_0x41320e('0x49')]);},Scene_Skill[_0x43e5ad('0x4a4')][_0x43e5ad('0x1d3')]=function(){const _0x69c06c=_0x43e5ad;return Scene_Skill[_0x69c06c('0x594')][_0x69c06c('0x351')]['call'](this);},Scene_Skill[_0x43e5ad('0x4a4')][_0x43e5ad('0x331')]=function(){const _0x153131=_0x43e5ad;return Scene_Skill[_0x153131('0x594')]['SkillTypeRect'][_0x153131('0x2ca')](this);},Scene_Skill['prototype'][_0x43e5ad('0x2c')]=function(){const _0x3718dc=_0x43e5ad;return Scene_Skill['layoutSettings'][_0x3718dc('0x397')][_0x3718dc('0x2ca')](this);},Scene_Skill[_0x43e5ad('0x4a4')][_0x43e5ad('0x26b')]=function(){const _0x10c8cd=_0x43e5ad;return Scene_Skill['layoutSettings'][_0x10c8cd('0x515')]['call'](this);},Scene_Skill[_0x43e5ad('0x4a4')][_0x43e5ad('0x344')]=function(){return Scene_Skill['layoutSettings']['ActorRect']['call'](this);},Scene_Equip[_0x43e5ad('0x594')]=VisuMZ[_0x43e5ad('0x176')]['Settings'][_0x43e5ad('0x245')]['EquipMenu'],VisuMZ['CoreEngine'][_0x43e5ad('0x601')]=Scene_Equip['prototype'][_0x43e5ad('0x2ee')],Scene_Equip[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')]=function(){const _0x187616=_0x43e5ad;VisuMZ[_0x187616('0x176')]['Scene_Equip_create'][_0x187616('0x2ca')](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ed')]=function(){const _0x126c87=_0x43e5ad;if(this[_0x126c87('0x612')]){if(_0x126c87('0x2cc')!=='pZpoF')this[_0x126c87('0x612')]['setBackgroundType'](Scene_Equip[_0x126c87('0x594')][_0x126c87('0x16')]);else{function _0x416fe8(){const _0x3a0778=_0x126c87;_0x3522a5[_0x3a0778('0x28a')]&&(this['_forcedBattleSys']=_0x3a0778('0x564'));}}}this['_statusWindow']&&this[_0x126c87('0x234')][_0x126c87('0x38a')](Scene_Equip[_0x126c87('0x594')][_0x126c87('0x162')]),this[_0x126c87('0x585')]&&this[_0x126c87('0x585')][_0x126c87('0x38a')](Scene_Equip[_0x126c87('0x594')][_0x126c87('0x134')]),this['_slotWindow']&&this['_slotWindow'][_0x126c87('0x38a')](Scene_Equip[_0x126c87('0x594')][_0x126c87('0x348')]),this[_0x126c87('0x527')]&&this[_0x126c87('0x527')][_0x126c87('0x38a')](Scene_Equip[_0x126c87('0x594')][_0x126c87('0xa2')]);},Scene_Equip['prototype']['helpWindowRect']=function(){const _0xe5481a=_0x43e5ad;return Scene_Equip[_0xe5481a('0x594')][_0xe5481a('0x351')][_0xe5481a('0x2ca')](this);},Scene_Equip['prototype'][_0x43e5ad('0x2c')]=function(){const _0x334104=_0x43e5ad;return Scene_Equip[_0x334104('0x594')]['StatusRect'][_0x334104('0x2ca')](this);},Scene_Equip[_0x43e5ad('0x4a4')][_0x43e5ad('0x4d0')]=function(){const _0x13c96e=_0x43e5ad;return Scene_Equip[_0x13c96e('0x594')][_0x13c96e('0x30d')][_0x13c96e('0x2ca')](this);},Scene_Equip['prototype']['slotWindowRect']=function(){const _0x228aba=_0x43e5ad;return Scene_Equip[_0x228aba('0x594')][_0x228aba('0x35')][_0x228aba('0x2ca')](this);},Scene_Equip[_0x43e5ad('0x4a4')][_0x43e5ad('0x26b')]=function(){const _0x36f331=_0x43e5ad;return Scene_Equip[_0x36f331('0x594')][_0x36f331('0x515')]['call'](this);},Scene_Status[_0x43e5ad('0x594')]=VisuMZ[_0x43e5ad('0x176')]['Settings'][_0x43e5ad('0x245')][_0x43e5ad('0x367')],VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x5f8')]=Scene_Status[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')],Scene_Status['prototype'][_0x43e5ad('0x2ee')]=function(){const _0xb3bb96=_0x43e5ad;VisuMZ[_0xb3bb96('0x176')][_0xb3bb96('0x5f8')][_0xb3bb96('0x2ca')](this),this[_0xb3bb96('0x2ed')]();},Scene_Status[_0x43e5ad('0x4a4')]['setCoreEngineUpdateWindowBg']=function(){const _0x4c7dd6=_0x43e5ad;if(this[_0x4c7dd6('0x48a')]){if(_0x4c7dd6('0x41e')==='IJPCG')this['_profileWindow'][_0x4c7dd6('0x38a')](Scene_Status[_0x4c7dd6('0x594')][_0x4c7dd6('0x4dd')]);else{function _0x110ca1(){const _0x44b370=_0x4c7dd6;this[_0x44b370('0x334')](_0x1dd528['isTriggered']('right'));}}}if(this[_0x4c7dd6('0x234')]){if(_0x4c7dd6('0x5f1')!==_0x4c7dd6('0x5f1')){function _0x5432e2(){const _0x2f91e7=_0x4c7dd6;_0x345b51+=_0x2f91e7('0x37d');}}else this[_0x4c7dd6('0x234')][_0x4c7dd6('0x38a')](Scene_Status[_0x4c7dd6('0x594')][_0x4c7dd6('0x162')]);}if(this['_statusParamsWindow']){if('odcVB'!==_0x4c7dd6('0x11c')){function _0xf7c795(){const _0x30ac14=_0x4c7dd6;return _0x41a68e[_0x30ac14('0x167')](this),_0x12d27d['CoreEngine'][_0x30ac14('0x484')]['call'](this,_0x133cba);}}else this[_0x4c7dd6('0x128')][_0x4c7dd6('0x38a')](Scene_Status[_0x4c7dd6('0x594')]['StatusParamsBgType']);}this['_statusEquipWindow']&&this['_statusEquipWindow'][_0x4c7dd6('0x38a')](Scene_Status['layoutSettings']['StatusEquipBgType']);},Scene_Status[_0x43e5ad('0x4a4')]['profileWindowRect']=function(){const _0x3b589e=_0x43e5ad;return Scene_Status[_0x3b589e('0x594')][_0x3b589e('0x47c')][_0x3b589e('0x2ca')](this);},Scene_Status[_0x43e5ad('0x4a4')][_0x43e5ad('0x2c')]=function(){const _0x1ab993=_0x43e5ad;return Scene_Status['layoutSettings'][_0x1ab993('0x397')][_0x1ab993('0x2ca')](this);},Scene_Status[_0x43e5ad('0x4a4')][_0x43e5ad('0x5b4')]=function(){const _0x5546ee=_0x43e5ad;return Scene_Status[_0x5546ee('0x594')][_0x5546ee('0x57c')][_0x5546ee('0x2ca')](this);},Scene_Status[_0x43e5ad('0x4a4')][_0x43e5ad('0x54a')]=function(){const _0x2ede4b=_0x43e5ad;return Scene_Status[_0x2ede4b('0x594')][_0x2ede4b('0x526')][_0x2ede4b('0x2ca')](this);},Scene_Options[_0x43e5ad('0x594')]=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')]['MenuLayout'][_0x43e5ad('0x52')],VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0xf8')]=Scene_Options[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')],Scene_Options['prototype']['create']=function(){const _0x19d971=_0x43e5ad;VisuMZ[_0x19d971('0x176')][_0x19d971('0xf8')][_0x19d971('0x2ca')](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ed')]=function(){const _0x598d2b=_0x43e5ad;this[_0x598d2b('0x479')]&&this['_optionsWindow'][_0x598d2b('0x38a')](Scene_Options['layoutSettings']['OptionsBgType']);},Scene_Options[_0x43e5ad('0x4a4')][_0x43e5ad('0xd5')]=function(){const _0x337962=_0x43e5ad;return Scene_Options['layoutSettings'][_0x337962('0x38f')][_0x337962('0x2ca')](this);},Scene_Save[_0x43e5ad('0x594')]=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')]['MenuLayout'][_0x43e5ad('0x248')],Scene_Save[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')]=function(){const _0x4dc32b=_0x43e5ad;Scene_File['prototype'][_0x4dc32b('0x2ee')][_0x4dc32b('0x2ca')](this),this[_0x4dc32b('0x2ed')]();},Scene_Save['prototype'][_0x43e5ad('0x2ed')]=function(){const _0x44a3bb=_0x43e5ad;if(this[_0x44a3bb('0x612')]){if(_0x44a3bb('0x400')===_0x44a3bb('0x144')){function _0x4b8f83(){const _0x36bfc2=_0x44a3bb;_0x3ce52f[_0x36bfc2('0x176')][_0x36bfc2('0x519')]['call'](this),_0x4e5752['isSideButtonLayout']()&&this[_0x36bfc2('0x200')]();}}else this[_0x44a3bb('0x612')]['setBackgroundType'](Scene_Save[_0x44a3bb('0x594')][_0x44a3bb('0x16')]);}this[_0x44a3bb('0x2c5')]&&this[_0x44a3bb('0x2c5')][_0x44a3bb('0x38a')](Scene_Save[_0x44a3bb('0x594')][_0x44a3bb('0x352')]);},Scene_Save[_0x43e5ad('0x4a4')][_0x43e5ad('0x1d3')]=function(){const _0x41de80=_0x43e5ad;return Scene_Save[_0x41de80('0x594')][_0x41de80('0x351')][_0x41de80('0x2ca')](this);},Scene_Save['prototype']['listWindowRect']=function(){const _0x8066b1=_0x43e5ad;return Scene_Save[_0x8066b1('0x594')]['ListRect']['call'](this);},Scene_Load[_0x43e5ad('0x594')]=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')]['MenuLayout'][_0x43e5ad('0x470')],Scene_Load['prototype'][_0x43e5ad('0x2ee')]=function(){const _0x4685f=_0x43e5ad;Scene_File['prototype']['create'][_0x4685f('0x2ca')](this),this[_0x4685f('0x2ed')]();},Scene_Load[_0x43e5ad('0x4a4')]['setCoreEngineUpdateWindowBg']=function(){const _0x879829=_0x43e5ad;this[_0x879829('0x612')]&&this[_0x879829('0x612')][_0x879829('0x38a')](Scene_Load['layoutSettings']['HelpBgType']),this[_0x879829('0x2c5')]&&this[_0x879829('0x2c5')][_0x879829('0x38a')](Scene_Load[_0x879829('0x594')][_0x879829('0x352')]);},Scene_Load[_0x43e5ad('0x4a4')][_0x43e5ad('0x1d3')]=function(){const _0xd36482=_0x43e5ad;return Scene_Load[_0xd36482('0x594')][_0xd36482('0x351')][_0xd36482('0x2ca')](this);},Scene_Load[_0x43e5ad('0x4a4')][_0x43e5ad('0x4dc')]=function(){const _0x424f80=_0x43e5ad;return Scene_Load[_0x424f80('0x594')][_0x424f80('0x36f')][_0x424f80('0x2ca')](this);},Scene_GameEnd[_0x43e5ad('0x594')]=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')][_0x43e5ad('0x245')][_0x43e5ad('0x4b')],VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0xdf')]=Scene_GameEnd[_0x43e5ad('0x4a4')]['createBackground'],Scene_GameEnd['prototype'][_0x43e5ad('0xc7')]=function(){const _0x1f017d=_0x43e5ad;Scene_MenuBase['prototype'][_0x1f017d('0xc7')]['call'](this);},Scene_GameEnd[_0x43e5ad('0x4a4')]['createCommandWindow']=function(){const _0x47d188=_0x43e5ad,_0x34b205=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x34b205),this[_0x47d188('0x585')][_0x47d188('0x4da')](_0x47d188('0x1b'),this['popScene'][_0x47d188('0xc2')](this)),this['addWindow'](this[_0x47d188('0x585')]),this['_commandWindow']['setBackgroundType'](Scene_GameEnd[_0x47d188('0x594')]['CommandBgType']);},Scene_GameEnd['prototype']['commandWindowRect']=function(){const _0x3e64e2=_0x43e5ad;return Scene_GameEnd[_0x3e64e2('0x594')][_0x3e64e2('0x30d')][_0x3e64e2('0x2ca')](this);},Scene_Shop[_0x43e5ad('0x594')]=VisuMZ['CoreEngine'][_0x43e5ad('0x117')][_0x43e5ad('0x245')]['ShopMenu'],VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x135')]=Scene_Shop[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')],Scene_Shop[_0x43e5ad('0x4a4')]['create']=function(){const _0x4cc33b=_0x43e5ad;VisuMZ['CoreEngine']['Scene_Shop_create'][_0x4cc33b('0x2ca')](this),this[_0x4cc33b('0x2ed')]();},Scene_Shop[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ed')]=function(){const _0x12a6af=_0x43e5ad;this[_0x12a6af('0x612')]&&this[_0x12a6af('0x612')][_0x12a6af('0x38a')](Scene_Shop[_0x12a6af('0x594')][_0x12a6af('0x16')]);this['_goldWindow']&&this[_0x12a6af('0x36e')][_0x12a6af('0x38a')](Scene_Shop[_0x12a6af('0x594')][_0x12a6af('0x1e0')]);if(this[_0x12a6af('0x585')]){if(_0x12a6af('0x2a6')===_0x12a6af('0x2a6'))this[_0x12a6af('0x585')]['setBackgroundType'](Scene_Shop[_0x12a6af('0x594')][_0x12a6af('0x134')]);else{function _0xe8f212(){const _0x5905e1=_0x12a6af;_0x2d9350[_0x5905e1('0x176')][_0x5905e1('0x45f')]['call'](this),this[_0x5905e1('0xae')]();}}}if(this[_0x12a6af('0x26e')]){if(_0x12a6af('0x5e3')==='ZHbSo'){function _0x2e5fb6(){const _0x386f9e=_0x12a6af;_0x482976[_0x386f9e('0x4a4')]['update']['call'](this),this[_0x386f9e('0x4f6')](),this[_0x386f9e('0x602')]();}}else this[_0x12a6af('0x26e')][_0x12a6af('0x38a')](Scene_Shop[_0x12a6af('0x594')][_0x12a6af('0x6a')]);}this[_0x12a6af('0x532')]&&this['_numberWindow'][_0x12a6af('0x38a')](Scene_Shop[_0x12a6af('0x594')][_0x12a6af('0x589')]);this['_statusWindow']&&this[_0x12a6af('0x234')]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x12a6af('0x162')]);this['_buyWindow']&&this['_buyWindow'][_0x12a6af('0x38a')](Scene_Shop[_0x12a6af('0x594')][_0x12a6af('0xa5')]);if(this['_categoryWindow']){if(_0x12a6af('0x38')!==_0x12a6af('0x4d1'))this[_0x12a6af('0x3')][_0x12a6af('0x38a')](Scene_Shop[_0x12a6af('0x594')][_0x12a6af('0x446')]);else{function _0x19d496(){const _0x1c6f32=_0x12a6af;_0x40641d[_0x1c6f32('0x176')][_0x1c6f32('0x277')][_0x1c6f32('0x2ca')](this),_0x51e0ef[_0x1c6f32('0x17c')]();}}}if(this['_sellWindow']){if(_0x12a6af('0x302')===_0x12a6af('0x4ed')){function _0x43f0f1(){const _0x200ecc=this['itemSuccessRate'](_0x13bd39),_0x524358=this['subjectHitRate'](_0x4b4ebb),_0x10c25b=this['targetEvaRate'](_0x1aebcb);return _0x200ecc*(_0x524358-_0x10c25b);}}else this['_sellWindow'][_0x12a6af('0x38a')](Scene_Shop[_0x12a6af('0x594')][_0x12a6af('0x3b0')]);}},Scene_Shop[_0x43e5ad('0x4a4')][_0x43e5ad('0x1d3')]=function(){const _0x5609b3=_0x43e5ad;return Scene_Shop[_0x5609b3('0x594')][_0x5609b3('0x351')][_0x5609b3('0x2ca')](this);},Scene_Shop[_0x43e5ad('0x4a4')][_0x43e5ad('0x449')]=function(){const _0x198d84=_0x43e5ad;return Scene_Shop[_0x198d84('0x594')]['GoldRect']['call'](this);},Scene_Shop[_0x43e5ad('0x4a4')]['commandWindowRect']=function(){const _0x5d4bef=_0x43e5ad;return Scene_Shop[_0x5d4bef('0x594')][_0x5d4bef('0x30d')][_0x5d4bef('0x2ca')](this);},Scene_Shop[_0x43e5ad('0x4a4')][_0x43e5ad('0x5ff')]=function(){const _0x1e948b=_0x43e5ad;return Scene_Shop['layoutSettings'][_0x1e948b('0x46f')][_0x1e948b('0x2ca')](this);},Scene_Shop[_0x43e5ad('0x4a4')]['numberWindowRect']=function(){const _0x445393=_0x43e5ad;return Scene_Shop[_0x445393('0x594')][_0x445393('0x12f')][_0x445393('0x2ca')](this);},Scene_Shop[_0x43e5ad('0x4a4')][_0x43e5ad('0x2c')]=function(){const _0xde2e2e=_0x43e5ad;return Scene_Shop[_0xde2e2e('0x594')][_0xde2e2e('0x397')][_0xde2e2e('0x2ca')](this);},Scene_Shop[_0x43e5ad('0x4a4')]['buyWindowRect']=function(){const _0x355d08=_0x43e5ad;return Scene_Shop[_0x355d08('0x594')][_0x355d08('0x5be')]['call'](this);},Scene_Shop['prototype'][_0x43e5ad('0x19b')]=function(){const _0x23dcba=_0x43e5ad;return Scene_Shop[_0x23dcba('0x594')][_0x23dcba('0x2ff')][_0x23dcba('0x2ca')](this);},Scene_Shop['prototype'][_0x43e5ad('0x4cd')]=function(){const _0x406c9c=_0x43e5ad;return Scene_Shop[_0x406c9c('0x594')]['SellRect'][_0x406c9c('0x2ca')](this);},Scene_Name[_0x43e5ad('0x594')]=VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x117')]['MenuLayout']['NameMenu'],VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x5d0')]=Scene_Name[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')],Scene_Name[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ee')]=function(){const _0x42e0b8=_0x43e5ad;VisuMZ[_0x42e0b8('0x176')]['Scene_Name_create']['call'](this),this[_0x42e0b8('0x2ed')]();},Scene_Name[_0x43e5ad('0x4a4')][_0x43e5ad('0x2ed')]=function(){const _0x5eba12=_0x43e5ad;this[_0x5eba12('0x4b0')]&&this[_0x5eba12('0x4b0')]['setBackgroundType'](Scene_Name[_0x5eba12('0x594')][_0x5eba12('0x490')]),this['_inputWindow']&&this[_0x5eba12('0x6e')][_0x5eba12('0x38a')](Scene_Name[_0x5eba12('0x594')][_0x5eba12('0x494')]);},Scene_Name[_0x43e5ad('0x4a4')][_0x43e5ad('0xc8')]=function(){return 0x0;},Scene_Name[_0x43e5ad('0x4a4')]['editWindowRect']=function(){const _0x32f128=_0x43e5ad;return Scene_Name['layoutSettings'][_0x32f128('0x15d')][_0x32f128('0x2ca')](this);},Scene_Name['prototype'][_0x43e5ad('0x21a')]=function(){const _0x16dad9=_0x43e5ad;return Scene_Name[_0x16dad9('0x594')][_0x16dad9('0x379')][_0x16dad9('0x2ca')](this);},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x283')]=Scene_Battle['prototype'][_0x43e5ad('0x3a8')],Scene_Battle['prototype'][_0x43e5ad('0x3a8')]=function(){const _0x172fea=_0x43e5ad;VisuMZ['CoreEngine'][_0x172fea('0x283')][_0x172fea('0x2ca')](this);if($gameTemp['_playTestFastMode'])this[_0x172fea('0x391')]();},Scene_Battle[_0x43e5ad('0x4a4')]['updatePlayTestF7']=function(){const _0x3e5b89=_0x43e5ad;!BattleManager[_0x3e5b89('0x359')]()&&!this[_0x3e5b89('0x213')]&&!$gameMessage[_0x3e5b89('0x369')]()&&(this[_0x3e5b89('0x213')]=!![],this[_0x3e5b89('0x3a8')](),this[_0x3e5b89('0x213')]=![]);},VisuMZ[_0x43e5ad('0x176')]['Scene_Battle_createCancelButton']=Scene_Battle[_0x43e5ad('0x4a4')][_0x43e5ad('0x217')],Scene_Battle[_0x43e5ad('0x4a4')][_0x43e5ad('0x217')]=function(){const _0x352308=_0x43e5ad;VisuMZ[_0x352308('0x176')]['Scene_Battle_createCancelButton']['call'](this);if(SceneManager[_0x352308('0x3ea')]()){if(_0x352308('0x284')!==_0x352308('0x284')){function _0x3f6ae6(){const _0x580209=_0x352308,_0x9a8cee=this[_0x580209('0x2d3')];_0x9a8cee[_0x580209('0x2e')]=this['outlineColor'],_0x9a8cee[_0x580209('0x1cd')](_0x49829e,_0x1a0c3c+0x2,_0x3b9945+0x2,_0x28a5fd);}}else this['repositionCancelButtonSideButtonLayout']();}},Scene_Battle[_0x43e5ad('0x4a4')]['repositionCancelButtonSideButtonLayout']=function(){const _0x238a1a=_0x43e5ad;this[_0x238a1a('0x255')]['x']=Graphics[_0x238a1a('0x5ed')]+0x4;if(this[_0x238a1a('0x440')]())this['_cancelButton']['y']=Graphics['boxHeight']-this['buttonAreaHeight']();else{if('cQuAu'==='cQuAu')this['_cancelButton']['y']=0x0;else{function _0x3c708a(){const _0x15d959=_0x238a1a,_0x4f341a=_0x5329f0[_0x15d959('0x5ed')],_0x3817d3=_0x3517f4[_0x15d959('0x4a4')][_0x15d959('0x59b')](),_0x71037c=0x0;let _0x58f0e6=0x0;return this['getButtonAssistLocation']()===_0x15d959('0x10e')?_0x58f0e6=0x0:_0x58f0e6=_0x168017['boxHeight']-_0x3817d3,new _0x233041(_0x71037c,_0x58f0e6,_0x4f341a,_0x3817d3);}}}},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x4e9')]=Sprite_Button[_0x43e5ad('0x4a4')]['initialize'],Sprite_Button[_0x43e5ad('0x4a4')]['initialize']=function(_0x213fd2){const _0x12d591=_0x43e5ad;VisuMZ[_0x12d591('0x176')][_0x12d591('0x4e9')][_0x12d591('0x2ca')](this,_0x213fd2),this[_0x12d591('0x13a')]();},Sprite_Button[_0x43e5ad('0x4a4')][_0x43e5ad('0x13a')]=function(){const _0x85861d=_0x43e5ad,_0x4262da=VisuMZ['CoreEngine']['Settings']['UI'];this[_0x85861d('0x497')]=![];switch(this[_0x85861d('0x530')]){case _0x85861d('0x1b'):this[_0x85861d('0x497')]=!_0x4262da[_0x85861d('0x482')];break;case _0x85861d('0x356'):case _0x85861d('0x43'):this[_0x85861d('0x497')]=!_0x4262da['pagedownShowButton'];break;case _0x85861d('0x254'):case'up':case'down2':case _0x85861d('0x105'):case'ok':this[_0x85861d('0x497')]=!_0x4262da[_0x85861d('0x1ca')];break;case _0x85861d('0x48'):this['_isButtonHidden']=!_0x4262da['menuShowButton'];break;}},VisuMZ[_0x43e5ad('0x176')]['Sprite_Button_updateOpacity']=Sprite_Button[_0x43e5ad('0x4a4')][_0x43e5ad('0x4f6')],Sprite_Button[_0x43e5ad('0x4a4')]['updateOpacity']=function(){const _0x42007a=_0x43e5ad;SceneManager[_0x42007a('0x4b3')]()||this[_0x42007a('0x497')]?this[_0x42007a('0x2b8')]():VisuMZ[_0x42007a('0x176')][_0x42007a('0x3a5')][_0x42007a('0x2ca')](this);},Sprite_Button['prototype'][_0x43e5ad('0x2b8')]=function(){const _0x5e4266=_0x43e5ad;this[_0x5e4266('0x256')]=![],this[_0x5e4266('0x1d7')]=0x0,this['x']=Graphics[_0x5e4266('0x5a0')]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x43e5ad('0x176')]['Sprite_Battler_startMove']=Sprite_Battler['prototype']['startMove'],Sprite_Battler['prototype'][_0x43e5ad('0x17f')]=function(_0x24d1e5,_0x593867,_0x39220f){const _0x4bc0c5=_0x43e5ad;(this['_targetOffsetX']!==_0x24d1e5||this[_0x4bc0c5('0x124')]!==_0x593867)&&(this['setMoveEasingType'](_0x4bc0c5('0x2d6')),this[_0x4bc0c5('0x5f5')]=_0x39220f),VisuMZ[_0x4bc0c5('0x176')][_0x4bc0c5('0x1b6')][_0x4bc0c5('0x2ca')](this,_0x24d1e5,_0x593867,_0x39220f);},Sprite_Battler['prototype']['setMoveEasingType']=function(_0x307be3){const _0x38f225=_0x43e5ad;this[_0x38f225('0x5d3')]=_0x307be3;},Sprite_Battler['prototype'][_0x43e5ad('0x4ee')]=function(){const _0x502e41=_0x43e5ad;if(this[_0x502e41('0x125')]<=0x0)return;const _0x56f19a=this[_0x502e41('0x125')],_0x354eff=this[_0x502e41('0x5f5')],_0x353c0c=this[_0x502e41('0x5d3')];this[_0x502e41('0x190')]=this[_0x502e41('0x2f1')](this[_0x502e41('0x190')],this['_targetOffsetX'],_0x56f19a,_0x354eff,_0x353c0c),this[_0x502e41('0x32b')]=this[_0x502e41('0x2f1')](this['_offsetY'],this[_0x502e41('0x124')],_0x56f19a,_0x354eff,_0x353c0c),this[_0x502e41('0x125')]--;if(this[_0x502e41('0x125')]<=0x0)this['onMoveEnd']();},Sprite_Battler[_0x43e5ad('0x4a4')]['applyEasing']=function(_0x4bc33b,_0x428a0d,_0x3735ea,_0x5cb77c,_0x1e0ac5){const _0x3aea85=_0x43e5ad,_0x428114=VisuMZ[_0x3aea85('0x42')]((_0x5cb77c-_0x3735ea)/_0x5cb77c,_0x1e0ac5||_0x3aea85('0x2d6')),_0x4a7d59=VisuMZ[_0x3aea85('0x42')]((_0x5cb77c-_0x3735ea+0x1)/_0x5cb77c,_0x1e0ac5||_0x3aea85('0x2d6')),_0x5bae43=(_0x4bc33b-_0x428a0d*_0x428114)/(0x1-_0x428114);return _0x5bae43+(_0x428a0d-_0x5bae43)*_0x4a7d59;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x483')]=Sprite_Actor[_0x43e5ad('0x4a4')][_0x43e5ad('0x5ab')],Sprite_Actor[_0x43e5ad('0x4a4')]['setActorHome']=function(_0x5a1a02){const _0x6f3a97=_0x43e5ad;if(VisuMZ[_0x6f3a97('0x176')][_0x6f3a97('0x117')]['UI'][_0x6f3a97('0x161')]){if(_0x6f3a97('0x3c5')===_0x6f3a97('0x3c5'))this[_0x6f3a97('0x5b6')](_0x5a1a02);else{function _0x317f35(){const _0x5440e9=_0x6f3a97;this[_0x5440e9('0x2e1')](_0xd23510,_0x44a297,_0x179c9e,_0x2ea8fd,_0x1158d0);}}}else VisuMZ[_0x6f3a97('0x176')][_0x6f3a97('0x483')]['call'](this,_0x5a1a02);},Sprite_Actor[_0x43e5ad('0x4a4')][_0x43e5ad('0x5b6')]=function(_0x52e006){const _0x3569b6=_0x43e5ad;let _0x1e9d89=Math[_0x3569b6('0x5e2')](Graphics[_0x3569b6('0x5a0')]/0x2+0xc0);_0x1e9d89-=Math[_0x3569b6('0x59d')]((Graphics[_0x3569b6('0x5a0')]-Graphics[_0x3569b6('0x5ed')])/0x2),_0x1e9d89+=_0x52e006*0x20;let _0x56b736=Graphics[_0x3569b6('0xc')]-0xc8-$gameParty[_0x3569b6('0x572')]()*0x30;_0x56b736-=Math['floor']((Graphics[_0x3569b6('0xc')]-Graphics[_0x3569b6('0xea')])/0x2),_0x56b736+=_0x52e006*0x30,this['setHome'](_0x1e9d89,_0x56b736);},Sprite_Actor[_0x43e5ad('0x4a4')][_0x43e5ad('0x5ec')]=function(){const _0x49ade1=_0x43e5ad;this[_0x49ade1('0x17f')](0x4b0,0x0,0x78);},Sprite_Animation[_0x43e5ad('0x4a4')][_0x43e5ad('0x3db')]=function(_0x623655){const _0x3210bd=_0x43e5ad;this[_0x3210bd('0x60b')]=_0x623655;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x11b')]=Sprite_Animation['prototype'][_0x43e5ad('0x4fb')],Sprite_Animation['prototype'][_0x43e5ad('0x4fb')]=function(){const _0x31e4c7=_0x43e5ad;if(this['_muteSound'])return;VisuMZ[_0x31e4c7('0x176')][_0x31e4c7('0x11b')][_0x31e4c7('0x2ca')](this);},Sprite_Animation[_0x43e5ad('0x4a4')][_0x43e5ad('0x229')]=function(_0x3f2577){const _0x351377=_0x43e5ad,_0x486b3a=this[_0x351377('0x5a')][_0x351377('0x2e8')];let _0x3fdbef=0x0,_0x2dd452=-_0x3f2577[_0x351377('0xc')]/0x2;;if(_0x486b3a[_0x351377('0x3eb')](/<(?:HEAD|HEADER|TOP)>/i))_0x2dd452=-_0x3f2577[_0x351377('0xc')];if(_0x486b3a['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2dd452=0x0;if(_0x486b3a[_0x351377('0x3eb')](/<(?:LEFT)>/i))_0x3fdbef=-_0x3f2577[_0x351377('0x5a0')]/0x2;if(_0x486b3a[_0x351377('0x3eb')](/<(?:RIGHT)>/i))_0x2dd452=_0x3f2577['width']/0x2;if(_0x486b3a[_0x351377('0x3eb')](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x3fdbef=Number(RegExp['$1'])*_0x3f2577[_0x351377('0x5a0')];if(_0x486b3a['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x351377('0x3d5')===_0x351377('0x3d5'))_0x2dd452=(0x1-Number(RegExp['$1']))*-_0x3f2577['height'];else{function _0x2f4e01(){const _0x31c88d=_0x351377,_0x466834=this[_0x31c88d('0x385')]/0x5,_0x556112=_0x446672[_0x31c88d('0x240')],_0x27f487=_0x556112[_0x31c88d('0x27f')[_0x31c88d('0x417')](_0x2d35e4)](),_0x2fe6f9=_0x556112['buttonAssistText%1'[_0x31c88d('0x417')](_0x317b9b)]();this[_0x31c88d('0x472')]['key%1'[_0x31c88d('0x417')](_0x8c3060)]=_0x27f487,this[_0x31c88d('0x472')][_0x31c88d('0x392')[_0x31c88d('0x417')](_0x2fe482)]=_0x2fe6f9;if(_0x27f487==='')return;if(_0x2fe6f9==='')return;const _0x1f2737=_0x556112['buttonAssistOffset%1'['format'](_0x5b5129)](),_0x5117af=this['itemPadding'](),_0x1c775d=_0x466834*(_0x4259e1-0x1)+_0x5117af+_0x1f2737,_0x565311=_0x3b6003[_0x31c88d('0x176')][_0x31c88d('0x117')][_0x31c88d('0x3e0')][_0x31c88d('0x33a')];this['drawTextEx'](_0x565311[_0x31c88d('0x417')](_0x27f487,_0x2fe6f9),_0x1c775d,0x0,_0x466834-_0x5117af*0x2);}}}_0x486b3a[_0x351377('0x3eb')](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x3fdbef=Number(RegExp['$1'])*_0x3f2577[_0x351377('0x5a0')],_0x2dd452=(0x1-Number(RegExp['$2']))*-_0x3f2577[_0x351377('0xc')]);if(_0x486b3a[_0x351377('0x3eb')](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x3fdbef+=Number(RegExp['$1']);if(_0x486b3a[_0x351377('0x3eb')](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2dd452+=Number(RegExp['$1']);if(_0x486b3a[_0x351377('0x3eb')](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x351377('0x4ca')===_0x351377('0x16d')){function _0xaecfc9(){const _0x450ee0=_0x351377;return _0x92244b(_0x24e1ed)[_0x450ee0('0x4cb')](_0x5dd371,_0x50f526)+'.';}}else _0x3fdbef+=Number(RegExp['$1']),_0x2dd452+=Number(RegExp['$2']);}const _0x3795ec=new Point(_0x3fdbef,_0x2dd452);return _0x3f2577[_0x351377('0x1e7')](),_0x3f2577[_0x351377('0x573')][_0x351377('0x4bf')](_0x3795ec);},Sprite_AnimationMV[_0x43e5ad('0x4a4')][_0x43e5ad('0x3db')]=function(_0x4e9fd8){const _0x4fa616=_0x43e5ad;this[_0x4fa616('0x60b')]=_0x4e9fd8;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x382')]=Sprite_AnimationMV[_0x43e5ad('0x4a4')]['processTimingData'],Sprite_AnimationMV[_0x43e5ad('0x4a4')][_0x43e5ad('0x2bb')]=function(_0x128f27){const _0x5e7962=_0x43e5ad;if(this[_0x5e7962('0x60b')]){if(_0x5e7962('0x52e')!==_0x5e7962('0x5ba'))_0x128f27=JsonEx[_0x5e7962('0x26d')](_0x128f27),_0x128f27['se']['volume']=0x0;else{function _0x25b30e(){const _0xc46e45=_0x5e7962;this['_duration']>0x0&&(this['_anchor']['x']=this[_0xc46e45('0x2f1')](this[_0xc46e45('0x141')]['x'],this[_0xc46e45('0x1ef')]['x']),this[_0xc46e45('0x141')]['y']=this[_0xc46e45('0x2f1')](this[_0xc46e45('0x141')]['y'],this[_0xc46e45('0x1ef')]['y']));}}}VisuMZ[_0x5e7962('0x176')]['Sprite_AnimationMV_processTimingData'][_0x5e7962('0x2ca')](this,_0x128f27);},Sprite_Damage['prototype']['createDigits']=function(_0x10bf4c){const _0x518c32=_0x43e5ad;let _0x58eae2=Math['abs'](_0x10bf4c)[_0x518c32('0x262')]();this[_0x518c32('0x563')]()&&(_0x58eae2=VisuMZ[_0x518c32('0x37f')](_0x58eae2));const _0x568fc1=this['fontSize'](),_0x2773d2=Math[_0x518c32('0x59d')](_0x568fc1*0.75);for(let _0x122774=0x0;_0x122774<_0x58eae2[_0x518c32('0x1d9')];_0x122774++){const _0x2bbe56=this[_0x518c32('0xc6')](_0x2773d2,_0x568fc1);_0x2bbe56['bitmap'][_0x518c32('0x151')](_0x58eae2[_0x122774],0x0,0x0,_0x2773d2,_0x568fc1,'center'),_0x2bbe56['x']=(_0x122774-(_0x58eae2[_0x518c32('0x1d9')]-0x1)/0x2)*_0x2773d2,_0x2bbe56['dy']=-_0x122774;}},Sprite_Damage['prototype'][_0x43e5ad('0x563')]=function(){const _0x45f833=_0x43e5ad;return VisuMZ[_0x45f833('0x176')][_0x45f833('0x117')][_0x45f833('0x32')]['DigitGroupingDamageSprites'];},VisuMZ[_0x43e5ad('0x176')]['Sprite_Gauge_gaugeRate']=Sprite_Gauge['prototype'][_0x43e5ad('0x339')],Sprite_Gauge[_0x43e5ad('0x4a4')]['gaugeRate']=function(){const _0x4b93dd=_0x43e5ad;return VisuMZ[_0x4b93dd('0x176')][_0x4b93dd('0xf4')][_0x4b93dd('0x2ca')](this)[_0x4b93dd('0x2c7')](0x0,0x1);},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x338')]=Sprite_Gauge[_0x43e5ad('0x4a4')][_0x43e5ad('0x35f')],Sprite_Gauge['prototype'][_0x43e5ad('0x35f')]=function(){let _0x347afe=VisuMZ['CoreEngine']['Sprite_Gauge_currentValue']['call'](this);return _0x347afe;},Sprite_Gauge['prototype']['drawValue']=function(){const _0x4dbb13=_0x43e5ad;let _0x5aec3d=this[_0x4dbb13('0x35f')]();this[_0x4dbb13('0x563')]()&&(_0x5aec3d=VisuMZ[_0x4dbb13('0x37f')](_0x5aec3d));const _0x32c7c7=this[_0x4dbb13('0x102')]()-0x1,_0xa51494=this[_0x4dbb13('0x16b')]();this[_0x4dbb13('0xc5')](),this[_0x4dbb13('0x529')][_0x4dbb13('0x151')](_0x5aec3d,0x0,0x0,_0x32c7c7,_0xa51494,'right');},Sprite_Gauge[_0x43e5ad('0x4a4')]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x43e5ad('0x4a4')][_0x43e5ad('0x563')]=function(){const _0x25b76b=_0x43e5ad;return VisuMZ['CoreEngine'][_0x25b76b('0x117')]['QoL'][_0x25b76b('0x3ca')];};function Sprite_TitlePictureButton(){const _0x3e147d=_0x43e5ad;this[_0x3e147d('0x56')](...arguments);}Sprite_TitlePictureButton[_0x43e5ad('0x4a4')]=Object[_0x43e5ad('0x2ee')](Sprite_Clickable[_0x43e5ad('0x4a4')]),Sprite_TitlePictureButton['prototype']['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x43e5ad('0x4a4')][_0x43e5ad('0x56')]=function(_0x516c97){const _0x460b76=_0x43e5ad;Sprite_Clickable[_0x460b76('0x4a4')][_0x460b76('0x56')][_0x460b76('0x2ca')](this),this[_0x460b76('0x472')]=_0x516c97,this[_0x460b76('0x54')]=null,this['setup']();},Sprite_TitlePictureButton[_0x43e5ad('0x4a4')]['setup']=function(){const _0x1ac9cf=_0x43e5ad;this['x']=Graphics[_0x1ac9cf('0x5a0')],this['y']=Graphics[_0x1ac9cf('0xc')],this[_0x1ac9cf('0x256')]=![],this['setupButtonImage']();},Sprite_TitlePictureButton['prototype'][_0x43e5ad('0x2c3')]=function(){const _0x2dd284=_0x43e5ad;this[_0x2dd284('0x529')]=ImageManager['loadPicture'](this[_0x2dd284('0x472')]['PictureFilename']),this[_0x2dd284('0x529')][_0x2dd284('0x37a')](this[_0x2dd284('0xdb')][_0x2dd284('0xc2')](this));},Sprite_TitlePictureButton[_0x43e5ad('0x4a4')][_0x43e5ad('0xdb')]=function(){const _0x384a46=_0x43e5ad;this[_0x384a46('0x472')][_0x384a46('0x3ed')][_0x384a46('0x2ca')](this),this[_0x384a46('0x472')][_0x384a46('0x5f9')][_0x384a46('0x2ca')](this),this[_0x384a46('0x1c7')](this[_0x384a46('0x472')][_0x384a46('0x5b8')][_0x384a46('0xc2')](this));},Sprite_TitlePictureButton['prototype'][_0x43e5ad('0x3a8')]=function(){const _0x52833d=_0x43e5ad;Sprite_Clickable[_0x52833d('0x4a4')][_0x52833d('0x3a8')][_0x52833d('0x2ca')](this),this['updateOpacity'](),this[_0x52833d('0x602')]();},Sprite_TitlePictureButton[_0x43e5ad('0x4a4')][_0x43e5ad('0x44')]=function(){const _0x4e3328=_0x43e5ad;return VisuMZ[_0x4e3328('0x176')][_0x4e3328('0x117')]['MenuLayout'][_0x4e3328('0x3fd')]['ButtonFadeSpeed'];},Sprite_TitlePictureButton[_0x43e5ad('0x4a4')]['updateOpacity']=function(){const _0x5bd6ed=_0x43e5ad;if(this[_0x5bd6ed('0x209')])this['opacity']=0xff;else{if(_0x5bd6ed('0x14a')!=='wPYZE')this[_0x5bd6ed('0x1d7')]+=this[_0x5bd6ed('0x256')]?this[_0x5bd6ed('0x44')]():-0x1*this['fadeSpeed'](),this[_0x5bd6ed('0x1d7')]=Math[_0x5bd6ed('0x3c0')](0xc0,this[_0x5bd6ed('0x1d7')]);else{function _0x4676ee(){const _0x172f76=_0x5bd6ed;this[_0x172f76('0x595')]();}}}},Sprite_TitlePictureButton[_0x43e5ad('0x4a4')][_0x43e5ad('0x1c7')]=function(_0xc8fb6c){const _0x693972=_0x43e5ad;this[_0x693972('0x54')]=_0xc8fb6c;},Sprite_TitlePictureButton[_0x43e5ad('0x4a4')][_0x43e5ad('0x5d8')]=function(){const _0x5f4455=_0x43e5ad;this[_0x5f4455('0x54')]&&this[_0x5f4455('0x54')]();},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x127')]=Spriteset_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x56')],Spriteset_Base[_0x43e5ad('0x4a4')]['initialize']=function(){const _0x1fc049=_0x43e5ad;VisuMZ[_0x1fc049('0x176')][_0x1fc049('0x127')][_0x1fc049('0x2ca')](this),this[_0x1fc049('0x0')]=[];},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x4e0')]=Spriteset_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x549')],Spriteset_Base['prototype'][_0x43e5ad('0x549')]=function(_0x285ea6){const _0x5cf7c9=_0x43e5ad;this[_0x5cf7c9('0x1dd')](),VisuMZ[_0x5cf7c9('0x176')][_0x5cf7c9('0x4e0')][_0x5cf7c9('0x2ca')](this,_0x285ea6);},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x4b6')]=Spriteset_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x3a8')],Spriteset_Base['prototype'][_0x43e5ad('0x3a8')]=function(){const _0x481435=_0x43e5ad;VisuMZ[_0x481435('0x176')][_0x481435('0x4b6')][_0x481435('0x2ca')](this),this[_0x481435('0x5e1')](),this[_0x481435('0x579')]();},Spriteset_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x5e1')]=function(){const _0x45028c=_0x43e5ad;if(!VisuMZ[_0x45028c('0x176')][_0x45028c('0x117')][_0x45028c('0x32')]['AntiZoomPictures'])return;this[_0x45028c('0x172')]['x']!==0x0&&(this[_0x45028c('0x55f')][_0x45028c('0x172')]['x']=0x1/this[_0x45028c('0x172')]['x'],this[_0x45028c('0x55f')]['x']=-(this['x']/this[_0x45028c('0x172')]['x']));if(this[_0x45028c('0x172')]['y']!==0x0){if('uhTkz'!==_0x45028c('0xba')){function _0x32d059(){const _0x4931da=_0x45028c;return _0x2d2cc8[_0x4931da('0x2d1')](_0x1727df,'[',']');}}else this[_0x45028c('0x55f')][_0x45028c('0x172')]['y']=0x1/this[_0x45028c('0x172')]['y'],this[_0x45028c('0x55f')]['y']=-(this['y']/this[_0x45028c('0x172')]['y']);}},Spriteset_Base[_0x43e5ad('0x4a4')]['updateFauxAnimations']=function(){const _0x2d4b73=_0x43e5ad;for(const _0x4984f3 of this['_fauxAnimationSprites']){if(_0x2d4b73('0x3a4')===_0x2d4b73('0x3cb')){function _0x3d941c(){return _0x5c254d['buttonAssistCancel'];}}else!_0x4984f3['isPlaying']()&&this[_0x2d4b73('0x57d')](_0x4984f3);}this['processFauxAnimationRequests']();},Spriteset_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x4f1')]=function(){const _0x28ee6c=_0x43e5ad;for(;;){const _0x17c897=$gameTemp[_0x28ee6c('0x401')]();if(_0x17c897)this[_0x28ee6c('0x10f')](_0x17c897);else{if('adYDp'==='ECHEN'){function _0x10bdac(){const _0x1e0a80=_0x28ee6c,_0x8bb720=_0x1e0a80('0x41');this[_0x1e0a80('0x506')]=this[_0x1e0a80('0x506')]||{};if(this[_0x1e0a80('0x506')][_0x8bb720])return this[_0x1e0a80('0x506')][_0x8bb720];const _0x27c180=_0xc5e1bb[_0x1e0a80('0x176')][_0x1e0a80('0x117')][_0x1e0a80('0x469')][_0x1e0a80('0x1c4')];return this['getColorDataFromPluginParameters'](_0x8bb720,_0x27c180);}}else break;}}},Spriteset_Base['prototype'][_0x43e5ad('0x10f')]=function(_0x1de4a2){const _0xe16c83=_0x43e5ad,_0x538dbd=$dataAnimations[_0x1de4a2[_0xe16c83('0x187')]],_0x36f424=_0x1de4a2[_0xe16c83('0x1cc')],_0x374ce7=_0x1de4a2[_0xe16c83('0x47a')],_0x22f67c=_0x1de4a2['mute'];let _0x394cf1=this[_0xe16c83('0x2dc')]();const _0x1dacb2=this[_0xe16c83('0x2fa')]();if(this[_0xe16c83('0x2ad')](_0x538dbd)){if('Qwxsc'==='Qwxsc')for(const _0x33122a of _0x36f424){if('ygoVw'!=='ygoVw'){function _0x351676(){const _0x10e0bf=_0xe16c83;_0x1e0b82[_0x10e0bf('0x176')]['Settings'][_0x10e0bf('0x245')][_0x10e0bf('0x3fd')][_0x10e0bf('0x2e5')][_0x10e0bf('0x2ca')](this);}}else this['createFauxAnimationSprite']([_0x33122a],_0x538dbd,_0x374ce7,_0x394cf1,_0x22f67c),_0x394cf1+=_0x1dacb2;}else{function _0x4be920(){const _0x14e2b0=_0xe16c83;if(this[_0x14e2b0('0x50e')]){const _0x55169a=this[_0x14e2b0('0x50e')][_0x14e2b0('0x529')],_0x3449c9=this['width'],_0x5d37ef=this[_0x14e2b0('0xc')],_0x412bee=this[_0x14e2b0('0x33')],_0x4b186c=_0xc353fe[_0x14e2b0('0x57e')](),_0x403b72=_0x6ef142['dimColor2']();_0x55169a['resize'](_0x3449c9,_0x5d37ef),_0x55169a['gradientFillRect'](0x0,0x0,_0x3449c9,_0x412bee,_0x403b72,_0x4b186c,!![]),_0x55169a[_0x14e2b0('0xe2')](0x0,_0x412bee,_0x3449c9,_0x5d37ef-_0x412bee*0x2,_0x4b186c),_0x55169a['gradientFillRect'](0x0,_0x5d37ef-_0x412bee,_0x3449c9,_0x412bee,_0x4b186c,_0x403b72,!![]),this['_dimmerSprite'][_0x14e2b0('0x2d5')](0x0,0x0,_0x3449c9,_0x5d37ef);}}}}else{if('xmnuX'!==_0xe16c83('0x16a'))this[_0xe16c83('0x2e1')](_0x36f424,_0x538dbd,_0x374ce7,_0x394cf1,_0x22f67c);else{function _0x127bfb(){const _0x34149d=_0xe16c83;this[_0x34149d('0x441')]='CTB';}}}},Spriteset_Base['prototype']['createFauxAnimationSprite']=function(_0x9230b0,_0x1bfe15,_0x58fd11,_0x36e6f1,_0x34478b){const _0x47f202=_0x43e5ad,_0x48b94e=this['isMVAnimation'](_0x1bfe15),_0x1962db=new(_0x48b94e?Sprite_AnimationMV:Sprite_Animation)(),_0x2bdd61=this[_0x47f202('0x3b7')](_0x9230b0);if(this['animationShouldMirror'](_0x9230b0[0x0])){if(_0x47f202('0x491')===_0x47f202('0x491'))_0x58fd11=!_0x58fd11;else{function _0x281d67(){const _0x4b18b3=_0x47f202;this[_0x4b18b3('0x441')]=0x0;}}}_0x1962db['targetObjects']=_0x9230b0,_0x1962db[_0x47f202('0x45c')](_0x2bdd61,_0x1bfe15,_0x58fd11,_0x36e6f1),_0x1962db[_0x47f202('0x3db')](_0x34478b),this[_0x47f202('0x198')][_0x47f202('0x3a2')](_0x1962db),this[_0x47f202('0x0')][_0x47f202('0x3e4')](_0x1962db);},Spriteset_Base[_0x43e5ad('0x4a4')]['removeFauxAnimation']=function(_0x126f5e){const _0x237b80=_0x43e5ad;this['_fauxAnimationSprites']['remove'](_0x126f5e),this['_effectsContainer'][_0x237b80('0x503')](_0x126f5e);for(const _0x192dd8 of _0x126f5e[_0x237b80('0x2f5')]){_0x192dd8[_0x237b80('0x3fc')]&&_0x192dd8['endAnimation']();}_0x126f5e['destroy']();},Spriteset_Base[_0x43e5ad('0x4a4')]['removeAllFauxAnimations']=function(){const _0x1a367d=_0x43e5ad;for(const _0x4e8316 of this[_0x1a367d('0x0')]){this[_0x1a367d('0x57d')](_0x4e8316);}},Spriteset_Base[_0x43e5ad('0x4a4')]['isFauxAnimationPlaying']=function(){return this['_fauxAnimationSprites']['length']>0x0;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x586')]=Spriteset_Base['prototype'][_0x43e5ad('0x591')],Spriteset_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x591')]=function(){const _0x31991a=_0x43e5ad;VisuMZ[_0x31991a('0x176')]['Spriteset_Base_updatePosition'][_0x31991a('0x2ca')](this),this[_0x31991a('0x25a')]();},Spriteset_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x25a')]=function(){const _0x1afc68=_0x43e5ad;if(!$gameScreen)return;if($gameScreen[_0x1afc68('0x8f')]<=0x0)return;this['x']-=Math[_0x1afc68('0x5e2')]($gameScreen[_0x1afc68('0x137')]());const _0x4ea171=$gameScreen[_0x1afc68('0x3f7')]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x1afc68('0x368'):this[_0x1afc68('0x4b8')]();break;case _0x1afc68('0x206'):this[_0x1afc68('0x3ec')]();break;case _0x1afc68('0xe0'):this[_0x1afc68('0x1bf')]();break;default:this[_0x1afc68('0x4')]();break;}},Spriteset_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x4b8')]=function(){const _0x256cba=_0x43e5ad,_0x4ad8d6=VisuMZ[_0x256cba('0x176')][_0x256cba('0x117')][_0x256cba('0x195')];if(_0x4ad8d6&&_0x4ad8d6[_0x256cba('0x5b2')])return _0x4ad8d6[_0x256cba('0x5b2')][_0x256cba('0x2ca')](this);this['x']+=Math[_0x256cba('0x5e2')]($gameScreen['shake']());},Spriteset_Base[_0x43e5ad('0x4a4')]['updatePositionCoreEngineShakeRand']=function(){const _0xac4abd=_0x43e5ad,_0x43afda=VisuMZ[_0xac4abd('0x176')][_0xac4abd('0x117')][_0xac4abd('0x195')];if(_0x43afda&&_0x43afda[_0xac4abd('0x5a9')]){if(_0xac4abd('0x2b4')!=='JWZYD'){function _0x5c58c6(){return 0.5*_0x33079a*_0x3e3689*((_0x4a9b46+0x1)*_0x58fc7c-_0x385264);}}else return _0x43afda[_0xac4abd('0x5a9')][_0xac4abd('0x2ca')](this);}const _0x136a2a=$gameScreen[_0xac4abd('0x5f3')]*0.75,_0x17a505=$gameScreen['_shakeSpeed']*0.6,_0x5a7837=$gameScreen[_0xac4abd('0x8f')];this['x']+=Math[_0xac4abd('0x5e2')](Math[_0xac4abd('0x203')](_0x136a2a)-Math[_0xac4abd('0x203')](_0x17a505))*(Math['min'](_0x5a7837,0x1e)*0.5),this['y']+=Math[_0xac4abd('0x5e2')](Math[_0xac4abd('0x203')](_0x136a2a)-Math[_0xac4abd('0x203')](_0x17a505))*(Math[_0xac4abd('0x3c0')](_0x5a7837,0x1e)*0.5);},Spriteset_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x3ec')]=function(){const _0x3b9777=_0x43e5ad,_0x1edbd9=VisuMZ[_0x3b9777('0x176')][_0x3b9777('0x117')][_0x3b9777('0x195')];if(_0x1edbd9&&_0x1edbd9['horzJS']){if(_0x3b9777('0x5d7')===_0x3b9777('0x5d7'))return _0x1edbd9[_0x3b9777('0x5aa')][_0x3b9777('0x2ca')](this);else{function _0x4d23c8(){const _0x3e3ec4=_0x3b9777;if(_0x3ee9ad[_0x3e3ec4('0x17e')]())_0xf56b3d[_0x3e3ec4('0x4ba')](_0x1fb0f2);}}}const _0x4610d3=$gameScreen['_shakePower']*0.75,_0x51bff4=$gameScreen[_0x3b9777('0x3e1')]*0.6,_0x3b7d50=$gameScreen[_0x3b9777('0x8f')];this['x']+=Math['round'](Math[_0x3b9777('0x203')](_0x4610d3)-Math['randomInt'](_0x51bff4))*(Math[_0x3b9777('0x3c0')](_0x3b7d50,0x1e)*0.5);},Spriteset_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x1bf')]=function(){const _0x41b907=_0x43e5ad,_0x3b84ee=VisuMZ['CoreEngine'][_0x41b907('0x117')][_0x41b907('0x195')];if(_0x3b84ee&&_0x3b84ee[_0x41b907('0x54e')])return _0x3b84ee[_0x41b907('0x54e')][_0x41b907('0x2ca')](this);const _0x52944f=$gameScreen[_0x41b907('0x5f3')]*0.75,_0x286056=$gameScreen['_shakeSpeed']*0.6,_0x31bf7f=$gameScreen['_shakeDuration'];this['y']+=Math[_0x41b907('0x5e2')](Math[_0x41b907('0x203')](_0x52944f)-Math['randomInt'](_0x286056))*(Math[_0x41b907('0x3c0')](_0x31bf7f,0x1e)*0.5);},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x42b')]=Spriteset_Battle[_0x43e5ad('0x4a4')][_0x43e5ad('0x237')],Spriteset_Battle['prototype'][_0x43e5ad('0x237')]=function(){const _0x4cf938=_0x43e5ad;if(VisuMZ['CoreEngine'][_0x4cf938('0x117')]['UI']['RepositionEnemies']){if(_0x4cf938('0x394')!==_0x4cf938('0x429'))this['repositionEnemiesByResolution']();else{function _0x5d363f(){const _0x4e5349=_0x4cf938;_0xb645a7=(0x1-_0x42c07d(_0x2617a4['$1']))*-_0x2ca439[_0x4e5349('0xc')];}}}VisuMZ[_0x4cf938('0x176')][_0x4cf938('0x42b')][_0x4cf938('0x2ca')](this);},Spriteset_Battle[_0x43e5ad('0x4a4')][_0x43e5ad('0x5f6')]=function(){const _0x4e0d17=_0x43e5ad;for(member of $gameTroop[_0x4e0d17('0x5fc')]()){member['moveRelativeToResolutionChange']();}},VisuMZ['CoreEngine'][_0x43e5ad('0x357')]=Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x56')],Window_Base['prototype'][_0x43e5ad('0x56')]=function(_0xd9d90d){const _0x1ebd28=_0x43e5ad;this['initDigitGrouping'](),VisuMZ[_0x1ebd28('0x176')][_0x1ebd28('0x357')][_0x1ebd28('0x2ca')](this,_0xd9d90d),this['initCoreEasing']();},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x32e')]=function(){const _0x5ee8fe=_0x43e5ad;this[_0x5ee8fe('0x2a0')]=VisuMZ[_0x5ee8fe('0x176')][_0x5ee8fe('0x117')][_0x5ee8fe('0x32')][_0x5ee8fe('0x4fd')],this['_digitGroupingEx']=VisuMZ[_0x5ee8fe('0x176')][_0x5ee8fe('0x117')]['QoL'][_0x5ee8fe('0x3b3')];},Window_Base[_0x43e5ad('0x4a4')]['lineHeight']=function(){const _0x2e6796=_0x43e5ad;return VisuMZ[_0x2e6796('0x176')][_0x2e6796('0x117')][_0x2e6796('0x3ff')][_0x2e6796('0x53c')];},Window_Base[_0x43e5ad('0x4a4')]['itemPadding']=function(){const _0xfe71fc=_0x43e5ad;return VisuMZ[_0xfe71fc('0x176')][_0xfe71fc('0x117')]['Window'][_0xfe71fc('0x188')];},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x3d6')]=function(){const _0x4ece3d=_0x43e5ad;this[_0x4ece3d('0x4ff')]=VisuMZ[_0x4ece3d('0x176')][_0x4ece3d('0x117')][_0x4ece3d('0x3ff')][_0x4ece3d('0x4c3')];},Window_Base['prototype'][_0x43e5ad('0x7c')]=function(){const _0x348211=_0x43e5ad;return VisuMZ[_0x348211('0x176')][_0x348211('0x117')][_0x348211('0x3ff')][_0x348211('0x52c')];},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x235')]=function(){const _0x3b83f7=_0x43e5ad;return VisuMZ[_0x3b83f7('0x176')][_0x3b83f7('0x117')]['Window'][_0x3b83f7('0x343')];},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x34f')]=Window_Base[_0x43e5ad('0x4a4')]['update'],Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x3a8')]=function(){const _0x3d7041=_0x43e5ad;VisuMZ['CoreEngine'][_0x3d7041('0x34f')][_0x3d7041('0x2ca')](this),this[_0x3d7041('0x18a')]();},Window_Base['prototype'][_0x43e5ad('0xa')]=function(){const _0x46a909=_0x43e5ad;if(this['_opening']){this[_0x46a909('0x5a5')]+=this['openingSpeed']();if(this[_0x46a909('0x133')]()){if(_0x46a909('0x3c')===_0x46a909('0x1f9')){function _0x28cf9c(){const _0xa2ef52=_0x46a909;return _0x35f752[_0xa2ef52('0x594')][_0xa2ef52('0x379')][_0xa2ef52('0x2ca')](this);}}else this[_0x46a909('0x1ad')]=![];}}},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x360')]=function(){const _0x5c1c44=_0x43e5ad;this[_0x5c1c44('0x27a')]&&(this['openness']-=this[_0x5c1c44('0x235')](),this[_0x5c1c44('0x559')]()&&(this[_0x5c1c44('0x27a')]=![]));},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x14')]=Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x151')],Window_Base[_0x43e5ad('0x4a4')]['drawText']=function(_0x48c257,_0x2f5c80,_0x5523c4,_0x602b56,_0x44d20f){const _0x1a5935=_0x43e5ad;if(this[_0x1a5935('0x563')]())_0x48c257=VisuMZ[_0x1a5935('0x37f')](_0x48c257);VisuMZ[_0x1a5935('0x176')][_0x1a5935('0x14')]['call'](this,_0x48c257,_0x2f5c80,_0x5523c4,_0x602b56,_0x44d20f);},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x563')]=function(){return this['_digitGrouping'];},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x269')]=Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x120')],Window_Base['prototype'][_0x43e5ad('0x120')]=function(_0x2e8575,_0x456e3d,_0x597434,_0x45f416){const _0x46f202=_0x43e5ad;var _0x341f40=VisuMZ['CoreEngine']['Window_Base_createTextState'][_0x46f202('0x2ca')](this,_0x2e8575,_0x456e3d,_0x597434,_0x45f416);if(this['useDigitGroupingEx']())_0x341f40[_0x46f202('0xb0')]=VisuMZ[_0x46f202('0x37f')](_0x341f40[_0x46f202('0xb0')]);return _0x341f40;},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x89')]=function(){const _0x2e1013=_0x43e5ad;return this[_0x2e1013('0x49e')];},Window_Base[_0x43e5ad('0x4a4')]['enableDigitGrouping']=function(_0xfdd2f9){const _0x38c460=_0x43e5ad;this[_0x38c460('0x2a0')]=_0xfdd2f9;},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x112')]=function(_0x49c6cf){const _0x2a4ccc=_0x43e5ad;this[_0x2a4ccc('0x49e')]=_0x49c6cf;},VisuMZ['CoreEngine'][_0x43e5ad('0xf0')]=Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x3c4')],Window_Base[_0x43e5ad('0x4a4')]['textSizeEx']=function(_0x2777a0){const _0xa7dbc8=_0x43e5ad;this[_0xa7dbc8('0x51')]=this[_0xa7dbc8('0x51')]||{};if(!this[_0xa7dbc8('0x51')][_0x2777a0]){if(_0xa7dbc8('0x2a8')===_0xa7dbc8('0x2a8'))this['_CoreEngine_Cache_textSizeEx'][_0x2777a0]=VisuMZ['CoreEngine']['Window_Base_textSizeEx'][_0xa7dbc8('0x2ca')](this,_0x2777a0);else{function _0x39d5ad(){return 0x0;}}}return this[_0xa7dbc8('0x51')][_0x2777a0];},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x3b')]=function(){const _0x150bef=_0x43e5ad;this[_0x150bef('0x30a')]={'duration':0x0,'wholeDuration':0x0,'type':_0x150bef('0x28'),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x150bef('0x172')]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x150bef('0x1d7')],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x150bef('0x147')]};},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x18a')]=function(){const _0xc7e174=_0x43e5ad;if(!this[_0xc7e174('0x30a')])return;if(this[_0xc7e174('0x30a')][_0xc7e174('0x2d7')]<=0x0)return;this['x']=this[_0xc7e174('0x5f0')](this['x'],this['_coreEasing'][_0xc7e174('0x38c')]),this['y']=this[_0xc7e174('0x5f0')](this['y'],this[_0xc7e174('0x30a')][_0xc7e174('0x533')]),this[_0xc7e174('0x172')]['x']=this['applyCoreEasing'](this[_0xc7e174('0x172')]['x'],this[_0xc7e174('0x30a')]['targetScaleX']),this['scale']['y']=this[_0xc7e174('0x5f0')](this[_0xc7e174('0x172')]['y'],this[_0xc7e174('0x30a')]['targetScaleY']),this[_0xc7e174('0x1d7')]=this[_0xc7e174('0x5f0')](this[_0xc7e174('0x1d7')],this['_coreEasing'][_0xc7e174('0x3d7')]),this[_0xc7e174('0x4ff')]=this[_0xc7e174('0x5f0')](this[_0xc7e174('0x4ff')],this[_0xc7e174('0x30a')]['targetBackOpacity']),this[_0xc7e174('0x147')]=this[_0xc7e174('0x5f0')](this['contentsOpacity'],this[_0xc7e174('0x30a')][_0xc7e174('0x265')]),this[_0xc7e174('0x30a')][_0xc7e174('0x2d7')]--;},Window_Base['prototype'][_0x43e5ad('0x5f0')]=function(_0x3752a2,_0x404e2f){const _0x165436=_0x43e5ad;if(!this[_0x165436('0x30a')])return _0x404e2f;const _0x9bb0d3=this['_coreEasing'][_0x165436('0x2d7')],_0x30ac81=this[_0x165436('0x30a')][_0x165436('0x1aa')],_0x27d4ff=this[_0x165436('0x15b')]((_0x30ac81-_0x9bb0d3)/_0x30ac81),_0x10b1a3=this['calcCoreEasing']((_0x30ac81-_0x9bb0d3+0x1)/_0x30ac81),_0xafde33=(_0x3752a2-_0x404e2f*_0x27d4ff)/(0x1-_0x27d4ff);return _0xafde33+(_0x404e2f-_0xafde33)*_0x10b1a3;},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x15b')]=function(_0x2accf6){const _0x4f4498=_0x43e5ad;if(!this[_0x4f4498('0x30a')])return _0x2accf6;return VisuMZ[_0x4f4498('0x42')](_0x2accf6,this[_0x4f4498('0x30a')]['type']||_0x4f4498('0x28'));},Window_Base['prototype'][_0x43e5ad('0x189')]=function(_0x5d5299,_0x1f06d7){const _0x18c09f=_0x43e5ad;if(!this[_0x18c09f('0x30a')])return;this['x']=this[_0x18c09f('0x30a')][_0x18c09f('0x38c')],this['y']=this['_coreEasing']['targetY'],this[_0x18c09f('0x172')]['x']=this['_coreEasing'][_0x18c09f('0x3fe')],this['scale']['y']=this[_0x18c09f('0x30a')][_0x18c09f('0x35c')],this[_0x18c09f('0x1d7')]=this[_0x18c09f('0x30a')][_0x18c09f('0x3d7')],this[_0x18c09f('0x4ff')]=this[_0x18c09f('0x30a')][_0x18c09f('0x313')],this[_0x18c09f('0x147')]=this[_0x18c09f('0x30a')][_0x18c09f('0x265')],this[_0x18c09f('0x1fb')](_0x5d5299,_0x1f06d7,this['x'],this['y'],this[_0x18c09f('0x172')]['x'],this[_0x18c09f('0x172')]['y'],this[_0x18c09f('0x1d7')],this[_0x18c09f('0x4ff')],this['contentsOpacity']);},Window_Base[_0x43e5ad('0x4a4')]['setupCoreEasing']=function(_0x13c778,_0x2a13e8,_0x20e87e,_0x353ea8,_0x9f64ee,_0x40c771,_0x148d86,_0x162f0f,_0x131eb6){this['_coreEasing']={'duration':_0x13c778,'wholeDuration':_0x13c778,'type':_0x2a13e8,'targetX':_0x20e87e,'targetY':_0x353ea8,'targetScaleX':_0x9f64ee,'targetScaleY':_0x40c771,'targetOpacity':_0x148d86,'targetBackOpacity':_0x162f0f,'targetContentsOpacity':_0x131eb6};},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x108')]=function(_0x16ccee,_0x54bed3,_0xc163bf,_0x4285c4,_0x25ce2d){const _0x126daa=_0x43e5ad;this['resetFontSettings'](),this[_0x126daa('0x34d')]['fontSize']=VisuMZ[_0x126daa('0x176')][_0x126daa('0x117')][_0x126daa('0x268')][_0x126daa('0x50d')];const _0x1f6c5c=VisuMZ['CoreEngine'][_0x126daa('0x117')][_0x126daa('0x268')]['GoldIcon'];if(_0x1f6c5c>0x0&&_0x54bed3===TextManager[_0x126daa('0x5e9')]){if('Pozkd'===_0x126daa('0x90')){const _0x3c2712=_0x4285c4+(this[_0x126daa('0x59b')]()-ImageManager[_0x126daa('0x3b6')])/0x2;this[_0x126daa('0x239')](_0x1f6c5c,_0xc163bf+(_0x25ce2d-ImageManager[_0x126daa('0x44c')]),_0x3c2712),_0x25ce2d-=ImageManager['iconWidth']+0x4;}else{function _0x2c19bb(){const _0x536ba6=_0x126daa;var _0x6edaa7=_0x2ad387[_0x536ba6('0x42')](_0x2b6b07*0x2,_0x536ba6('0x5cc'))*0.5;}}}else this['changeTextColor'](ColorManager[_0x126daa('0x40f')]()),this[_0x126daa('0x151')](_0x54bed3,_0xc163bf,_0x4285c4,_0x25ce2d,_0x126daa('0x34b')),_0x25ce2d-=this[_0x126daa('0x42e')](_0x54bed3)+0x6;this[_0x126daa('0x44b')]();const _0x4ef1c3=this[_0x126daa('0x42e')](this[_0x126daa('0x2a0')]?VisuMZ[_0x126daa('0x37f')](_0x16ccee):_0x16ccee);_0x4ef1c3>_0x25ce2d?this[_0x126daa('0x151')](VisuMZ[_0x126daa('0x176')][_0x126daa('0x117')][_0x126daa('0x268')][_0x126daa('0x20c')],_0xc163bf,_0x4285c4,_0x25ce2d,_0x126daa('0x34b')):this[_0x126daa('0x151')](_0x16ccee,_0xc163bf,_0x4285c4,_0x25ce2d,_0x126daa('0x34b')),this[_0x126daa('0x28f')]();},Window_Base['prototype'][_0x43e5ad('0x590')]=function(_0x438cea,_0x4e9ad1,_0x299b24,_0x859c76,_0x42227c){const _0x48bd1d=_0x43e5ad,_0x88d5fd=ImageManager[_0x48bd1d('0x2a')](_0x48bd1d('0x165')),_0x512267=ImageManager[_0x48bd1d('0x44c')],_0xbc3a9b=ImageManager[_0x48bd1d('0x3b6')],_0x48b779=_0x438cea%0x10*_0x512267,_0x39cd68=Math[_0x48bd1d('0x59d')](_0x438cea/0x10)*_0xbc3a9b,_0x34aeba=_0x859c76,_0x4e7a24=_0x859c76;this[_0x48bd1d('0x34d')][_0x48bd1d('0x1be')]['imageSmoothingEnabled']=_0x42227c,this['contents'][_0x48bd1d('0x4ad')](_0x88d5fd,_0x48b779,_0x39cd68,_0x512267,_0xbc3a9b,_0x4e9ad1,_0x299b24,_0x34aeba,_0x4e7a24),this[_0x48bd1d('0x34d')][_0x48bd1d('0x1be')][_0x48bd1d('0x291')]=!![];},Window_Base[_0x43e5ad('0x4a4')][_0x43e5ad('0x25c')]=function(_0x3dda17,_0x455ffe,_0x1acbec,_0x4b1c44,_0x5bf225,_0x3da209){const _0x2691e2=_0x43e5ad,_0x3f389e=Math[_0x2691e2('0x59d')]((_0x1acbec-0x2)*_0x4b1c44),_0x1e4508=Sprite_Gauge['prototype']['gaugeHeight'][_0x2691e2('0x2ca')](this),_0x2c65d7=_0x455ffe+this[_0x2691e2('0x59b')]()-_0x1e4508-0x2;this['contents'][_0x2691e2('0xe2')](_0x3dda17,_0x2c65d7,_0x1acbec,_0x1e4508,ColorManager[_0x2691e2('0x18')]()),this[_0x2691e2('0x34d')]['gradientFillRect'](_0x3dda17+0x1,_0x2c65d7+0x1,_0x3f389e,_0x1e4508-0x2,_0x5bf225,_0x3da209);},Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0xa0')]=function(_0x5c7f41){const _0x5d0237=_0x43e5ad;let _0x15ca51=this[_0x5d0237('0x43c')]();const _0x5adba6=this[_0x5d0237('0x249')](),_0x10a12e=this['maxCols']();if(this[_0x5d0237('0x1b5')]()&&(_0x15ca51<_0x5adba6||_0x5c7f41&&_0x10a12e===0x1)){_0x15ca51+=_0x10a12e;if(_0x15ca51>=_0x5adba6)_0x15ca51=_0x5adba6-0x1;this['smoothSelect'](_0x15ca51);}else{if(!this[_0x5d0237('0x1b5')]()){if('xZGAV'===_0x5d0237('0x131'))(_0x15ca51<_0x5adba6-_0x10a12e||_0x5c7f41&&_0x10a12e===0x1)&&this[_0x5d0237('0x47b')]((_0x15ca51+_0x10a12e)%_0x5adba6);else{function _0x34bd56(){return 0x0;}}}}},Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0x1b5')]=function(){const _0x37be6b=_0x43e5ad;return VisuMZ[_0x37be6b('0x176')]['Settings'][_0x37be6b('0x32')][_0x37be6b('0x5eb')];},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x3f6')]=Window_Selectable['prototype']['processCursorMove'],Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0x4f')]=function(){const _0x44966b=_0x43e5ad;if(this[_0x44966b('0x1b5')]()){if(_0x44966b('0x230')===_0x44966b('0x230'))this['processCursorMoveModernControls'](),this[_0x44966b('0xe9')]();else{function _0x803f76(){const _0x4ef87a=_0x44966b;_0x3678bc[_0x4ef87a('0x176')][_0x4ef87a('0x117')][_0x4ef87a('0x32')]['OpenConsole']&&_0x34f5f2[_0x4ef87a('0x3fb')](!![]),_0x29ebed['CoreEngine'][_0x4ef87a('0x117')]['QoL']['ModernControls']&&(_0xc3bff8[_0x4ef87a('0x288')][0x23]=_0x4ef87a('0x544'),_0x32709c[_0x4ef87a('0x288')][0x24]=_0x4ef87a('0x11f'));}}}else VisuMZ['CoreEngine']['Window_Selectable_processCursorMove']['call'](this);},Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0x4f8')]=function(){const _0x3179b3=_0x43e5ad;if(this[_0x3179b3('0x407')]()){const _0x595a71=this['index']();if(Input[_0x3179b3('0xa1')](_0x3179b3('0x254'))){if(_0x3179b3('0x171')===_0x3179b3('0x171')){if(Input[_0x3179b3('0x540')](_0x3179b3('0x574')))this[_0x3179b3('0x13')]();else{if(_0x3179b3('0x2be')!==_0x3179b3('0x44f'))this[_0x3179b3('0xa0')](Input[_0x3179b3('0x314')](_0x3179b3('0x254')));else{function _0x195be0(){const _0x300fdf=_0x3179b3,_0x259dc9=_0x300fdf('0xab');this[_0x300fdf('0x506')]=this[_0x300fdf('0x506')]||{};if(this['_colorCache'][_0x259dc9])return this[_0x300fdf('0x506')][_0x259dc9];const _0x1140d9=_0x468c65['CoreEngine'][_0x300fdf('0x117')][_0x300fdf('0x469')]['ColorSystem'];return this[_0x300fdf('0x5bb')](_0x259dc9,_0x1140d9);}}}}else{function _0x42b89c(){const _0x59f0a7=_0x3179b3;if(_0x1df04[_0x59f0a7('0x17e')]())_0x3fc8e1[_0x59f0a7('0x4ba')](_0x2d57c2);}}}if(Input['isRepeated']('up')){if(Input['isPressed'](_0x3179b3('0x574'))){if('NBddM'!==_0x3179b3('0x2ef')){function _0x19dfd1(){const _0x4c0629=_0x3179b3;this[_0x4c0629('0x1e5')]()?this[_0x4c0629('0x534')]():_0x106016[_0x4c0629('0x176')]['Scene_Boot_updateDocumentTitle']['call'](this);}}else this[_0x3179b3('0x434')]();}else{if(_0x3179b3('0x46c')===_0x3179b3('0x46c'))this['cursorUp'](Input[_0x3179b3('0x314')]('up'));else{function _0x8b9d5d(){const _0xb647ac=_0x3179b3;for(const _0x4f6326 of this[_0xb647ac('0x0')]){!_0x4f6326['isPlaying']()&&this[_0xb647ac('0x57d')](_0x4f6326);}this['processFauxAnimationRequests']();}}}}Input[_0x3179b3('0xa1')](_0x3179b3('0x34b'))&&this[_0x3179b3('0x334')](Input['isTriggered'](_0x3179b3('0x34b')));Input[_0x3179b3('0xa1')](_0x3179b3('0x3f1'))&&this[_0x3179b3('0x536')](Input[_0x3179b3('0x314')](_0x3179b3('0x3f1')));!this['isHandled'](_0x3179b3('0x43'))&&Input['isRepeated'](_0x3179b3('0x43'))&&this[_0x3179b3('0x13')]();if(!this['isHandled'](_0x3179b3('0x356'))&&Input[_0x3179b3('0xa1')](_0x3179b3('0x356'))){if(_0x3179b3('0x2f3')===_0x3179b3('0x481')){function _0x2e90d3(){const _0x5c29fb=_0x3179b3;if(_0x24cd03[_0x5c29fb('0x341')]('test')){var _0x4a9afa=_0x27bcab('nw.gui')[_0x5c29fb('0x3ff')][_0x5c29fb('0x511')]();_0x3a9e22[_0x5c29fb('0x45b')]();if(_0xa943cf)_0x338d71(_0x4a9afa[_0x5c29fb('0x154')]['bind'](_0x4a9afa),0x190);}}}else this[_0x3179b3('0x434')]();}this[_0x3179b3('0x43c')]()!==_0x595a71&&this['playCursorSound']();}},VisuMZ['CoreEngine']['Window_Selectable_cursorDown']=Window_Selectable['prototype'][_0x43e5ad('0xa0')],Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0xa0')]=function(_0x318f4f){const _0x4a523e=_0x43e5ad;this[_0x4a523e('0x1b5')]()&&_0x318f4f&&this[_0x4a523e('0x1c')]()===0x1&&this[_0x4a523e('0x43c')]()===this['maxItems']()-0x1?this['smoothSelect'](0x0):VisuMZ['CoreEngine'][_0x4a523e('0x425')]['call'](this,_0x318f4f);},Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0xe9')]=function(){const _0x1cda91=_0x43e5ad;if(this[_0x1cda91('0x407')]()){if(_0x1cda91('0x55c')===_0x1cda91('0x4af')){function _0x289605(){const _0x4c46ad=_0x1cda91;var _0x11e1c4=_0x71e8ab(_0x4c46ad('0x577'))[_0x4c46ad('0x3ff')][_0x4c46ad('0x511')]();_0x5a30d1['showDevTools']();if(_0x839233)_0x151066(_0x11e1c4[_0x4c46ad('0x154')]['bind'](_0x11e1c4),0x190);}}else{const _0x56cc9f=this[_0x1cda91('0x43c')]();if(Input[_0x1cda91('0x314')](_0x1cda91('0x11f'))){if(_0x1cda91('0x3dc')==='jeQbD')this[_0x1cda91('0x47b')](Math[_0x1cda91('0x3c0')](this[_0x1cda91('0x43c')](),0x0));else{function _0x44aba3(){const _0xf4b122=_0x1cda91;this[_0xf4b122('0x34d')]['fontSize']+=0x6;}}}Input['isTriggered'](_0x1cda91('0x544'))&&this[_0x1cda91('0x47b')](Math[_0x1cda91('0x3cc')](this['index'](),this[_0x1cda91('0x249')]()-0x1));if(this[_0x1cda91('0x43c')]()!==_0x56cc9f){if(_0x1cda91('0x19f')!==_0x1cda91('0x2c1'))this[_0x1cda91('0x7d')]();else{function _0x2bc59e(){const _0xbd2ca9=_0x1cda91;_0x1cac4b[_0xbd2ca9('0x4ba')](_0xbd2ca9('0x7')),_0x576b55['log'](_0x53fd2a);}}}}}},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x399')]=Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0x602')],Window_Selectable[_0x43e5ad('0x4a4')]['processTouch']=function(){const _0x145551=_0x43e5ad;this[_0x145551('0x1b5')]()?this[_0x145551('0x199')]():VisuMZ['CoreEngine'][_0x145551('0x399')][_0x145551('0x2ca')](this);},Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0x199')]=function(){const _0x1217e7=_0x43e5ad;VisuMZ[_0x1217e7('0x176')][_0x1217e7('0x399')][_0x1217e7('0x2ca')](this);},Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0x126')]=function(){const _0x2c23a4=_0x43e5ad;return VisuMZ[_0x2c23a4('0x176')][_0x2c23a4('0x117')]['Window']['ColSpacing'];},Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0xf1')]=function(){const _0x5100b5=_0x43e5ad;return VisuMZ[_0x5100b5('0x176')][_0x5100b5('0x117')]['Window'][_0x5100b5('0x43a')];},Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0x608')]=function(){const _0x293941=_0x43e5ad;return Window_Scrollable[_0x293941('0x4a4')]['itemHeight'][_0x293941('0x2ca')](this)+VisuMZ[_0x293941('0x176')][_0x293941('0x117')][_0x293941('0x3ff')][_0x293941('0x54f')];;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x40a')]=Window_Selectable[_0x43e5ad('0x4a4')][_0x43e5ad('0x4d3')],Window_Selectable['prototype']['drawBackgroundRect']=function(_0x74b81b){const _0x2eb4a1=_0x43e5ad,_0x75d950=VisuMZ[_0x2eb4a1('0x176')][_0x2eb4a1('0x117')][_0x2eb4a1('0x3ff')];if(_0x75d950[_0x2eb4a1('0x413')]===![])return;if(_0x75d950[_0x2eb4a1('0x435')])_0x75d950[_0x2eb4a1('0x435')][_0x2eb4a1('0x2ca')](this,_0x74b81b);else{if(_0x2eb4a1('0x420')===_0x2eb4a1('0x420'))VisuMZ[_0x2eb4a1('0x176')][_0x2eb4a1('0x40a')]['call'](this,_0x74b81b);else{function _0x271d55(){const _0x302c3c=_0x2eb4a1;this[_0x302c3c('0x1af')]=!![];}}}},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0xca')]=Window_Gold[_0x43e5ad('0x4a4')][_0x43e5ad('0x611')],Window_Gold[_0x43e5ad('0x4a4')][_0x43e5ad('0x611')]=function(){const _0xce9d1e=_0x43e5ad;if(this[_0xce9d1e('0x2bd')]()){if(_0xce9d1e('0x2')!==_0xce9d1e('0x2')){function _0x524dc1(){const _0x323df7=_0xce9d1e;_0x85de4d=this[_0x323df7('0x36d')]();}}else this[_0xce9d1e('0x595')]();}else VisuMZ[_0xce9d1e('0x176')]['Window_Gold_refresh'][_0xce9d1e('0x2ca')](this);},Window_Gold[_0x43e5ad('0x4a4')][_0x43e5ad('0x2bd')]=function(){const _0x9ae368=_0x43e5ad;if(TextManager[_0x9ae368('0x5e9')]!==this[_0x9ae368('0x5e9')]())return![];return VisuMZ[_0x9ae368('0x176')][_0x9ae368('0x117')][_0x9ae368('0x268')][_0x9ae368('0x431')];},Window_Gold[_0x43e5ad('0x4a4')][_0x43e5ad('0x595')]=function(){const _0x512b31=_0x43e5ad;this[_0x512b31('0x28f')](),this['contents'][_0x512b31('0x598')](),this[_0x512b31('0x34d')][_0x512b31('0xe7')]=VisuMZ[_0x512b31('0x176')]['Settings'][_0x512b31('0x268')][_0x512b31('0x50d')];const _0x4215a6=VisuMZ[_0x512b31('0x176')][_0x512b31('0x117')]['Gold']['GoldIcon'],_0x194624=this[_0x512b31('0x12e')](0x0);if(_0x4215a6>0x0){const _0x42b34b=_0x194624['y']+(this[_0x512b31('0x59b')]()-ImageManager[_0x512b31('0x3b6')])/0x2;this[_0x512b31('0x239')](_0x4215a6,_0x194624['x'],_0x42b34b);const _0x590861=ImageManager[_0x512b31('0x44c')]+0x4;_0x194624['x']+=_0x590861,_0x194624[_0x512b31('0x5a0')]-=_0x590861;}this[_0x512b31('0x4ac')](ColorManager[_0x512b31('0x40f')]()),this[_0x512b31('0x151')](this[_0x512b31('0x5e9')](),_0x194624['x'],_0x194624['y'],_0x194624[_0x512b31('0x5a0')],_0x512b31('0x3f1'));const _0x55a94d=this['textWidth'](this[_0x512b31('0x5e9')]())+0x6;;_0x194624['x']+=_0x55a94d,_0x194624[_0x512b31('0x5a0')]-=_0x55a94d,this[_0x512b31('0x44b')]();const _0x418757=this['value'](),_0x5a1f76=this['textWidth'](this[_0x512b31('0x2a0')]?VisuMZ[_0x512b31('0x37f')](this['value']()):this[_0x512b31('0x5b3')]());if(_0x5a1f76>_0x194624[_0x512b31('0x5a0')]){if('DIpQa'!==_0x512b31('0x70'))this['drawText'](VisuMZ[_0x512b31('0x176')][_0x512b31('0x117')][_0x512b31('0x268')][_0x512b31('0x20c')],_0x194624['x'],_0x194624['y'],_0x194624[_0x512b31('0x5a0')],_0x512b31('0x34b'));else{function _0x41855e(){const _0x19b2ac=_0x512b31;_0x7de44e=this[_0x19b2ac('0x5e8')]();}}}else{if(_0x512b31('0x7a')===_0x512b31('0x15')){function _0x489722(){const _0x367de5=_0x512b31;return this['subject']()[_0x367de5('0x315')];}}else this['drawText'](this['value'](),_0x194624['x'],_0x194624['y'],_0x194624[_0x512b31('0x5a0')],_0x512b31('0x34b'));}this[_0x512b31('0x28f')]();},Window_StatusBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x3e3')]=function(_0x201adf,_0x125585,_0x17b77d,_0x186e8a,_0x4b8ed0){const _0x4a10dc=_0x43e5ad;_0x186e8a=String(_0x186e8a||'')[_0x4a10dc('0x545')]();if(VisuMZ[_0x4a10dc('0x176')][_0x4a10dc('0x117')][_0x4a10dc('0x393')][_0x4a10dc('0x2e0')]){const _0x2b5fa3=VisuMZ[_0x4a10dc('0x581')](_0x186e8a);_0x4b8ed0?(this[_0x4a10dc('0x590')](_0x2b5fa3,_0x201adf,_0x125585,this['gaugeLineHeight']()),_0x17b77d-=this['gaugeLineHeight']()+0x2,_0x201adf+=this[_0x4a10dc('0x1a3')]()+0x2):(this[_0x4a10dc('0x239')](_0x2b5fa3,_0x201adf+0x2,_0x125585+0x2),_0x17b77d-=ImageManager[_0x4a10dc('0x44c')]+0x4,_0x201adf+=ImageManager['iconWidth']+0x4);}const _0x5d3c91=TextManager['param'](_0x186e8a);this[_0x4a10dc('0x28f')](),this['changeTextColor'](ColorManager['systemColor']());if(_0x4b8ed0){if(_0x4a10dc('0x221')!==_0x4a10dc('0x1f4'))this[_0x4a10dc('0x34d')][_0x4a10dc('0xe7')]=this[_0x4a10dc('0xd3')](),this[_0x4a10dc('0x34d')][_0x4a10dc('0x151')](_0x5d3c91,_0x201adf,_0x125585,_0x17b77d,this[_0x4a10dc('0x1a3')](),_0x4a10dc('0x3f1'));else{function _0x51cc85(){const _0x234409=_0x4a10dc;this[_0x234409('0x151')](_0x444d5e,_0x21ddaa,_0x5638b1,_0x1f7fce,_0x234409('0x34b'));}}}else{if(_0x4a10dc('0x35d')!==_0x4a10dc('0x35d')){function _0x4cf5db(){const _0x544392=_0x4a10dc;return _0x344ac4[_0x544392('0x594')][_0x544392('0x30d')][_0x544392('0x2ca')](this);}}else this['drawText'](_0x5d3c91,_0x201adf,_0x125585,_0x17b77d);}this[_0x4a10dc('0x28f')]();},Window_StatusBase[_0x43e5ad('0x4a4')]['smallParamFontSize']=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x3cf')]=function(_0x27e5f6,_0x3d42e5,_0x18c865,_0x25b6de){const _0x3d8188=_0x43e5ad;_0x25b6de=_0x25b6de||0xa8,this['resetTextColor']();if(VisuMZ[_0x3d8188('0x176')][_0x3d8188('0x117')]['UI']['TextCodeClassNames']){if(_0x3d8188('0x179')!==_0x3d8188('0x179')){function _0x56332c(){const _0xf7d3fc=_0x3d8188;_0xb59253[_0xf7d3fc('0xa3')]();}}else this[_0x3d8188('0x4e2')](_0x27e5f6[_0x3d8188('0xa6')]()['name'],_0x3d42e5,_0x18c865,_0x25b6de);}else{const _0x2cfccf=_0x27e5f6[_0x3d8188('0xa6')]()[_0x3d8188('0x2e8')][_0x3d8188('0x2e6')](/\\I\[(\d+)\]/gi,'');this[_0x3d8188('0x151')](_0x2cfccf,_0x3d42e5,_0x18c865,_0x25b6de);}},Window_StatusBase['prototype'][_0x43e5ad('0x365')]=function(_0x42c2f1,_0x3a74de,_0x2ab7c8,_0x470ad4){const _0x488862=_0x43e5ad;_0x470ad4=_0x470ad4||0x10e,this[_0x488862('0x44b')]();if(VisuMZ[_0x488862('0x176')][_0x488862('0x117')]['UI']['TextCodeNicknames']){if('IvpPU'!==_0x488862('0x164'))this[_0x488862('0x4e2')](_0x42c2f1[_0x488862('0x433')](),_0x3a74de,_0x2ab7c8,_0x470ad4);else{function _0x423313(){_0x26029d['level']=_0x88a2a['max'](_0xfba4ce(_0x18ed9b['$1']),0x1);}}}else{if(_0x488862('0x513')!==_0x488862('0x513')){function _0x79a6c3(){const _0x303bb1=_0x488862;return _0x1f6472[_0x303bb1('0xce')]('ok');}}else{const _0x7026d3=_0x42c2f1[_0x488862('0x433')]()[_0x488862('0x2e6')](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x42c2f1['nickname'](),_0x3a74de,_0x2ab7c8,_0x470ad4);}}},VisuMZ['CoreEngine'][_0x43e5ad('0x241')]=Window_StatusBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x1fe')],Window_StatusBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x1fe')]=function(_0x22ccb1,_0x30f0c1,_0x406a87){const _0x2a02d3=_0x43e5ad;if(this['isExpGaugeDrawn']())this[_0x2a02d3('0x3f0')](_0x22ccb1,_0x30f0c1,_0x406a87);VisuMZ[_0x2a02d3('0x176')][_0x2a02d3('0x241')][_0x2a02d3('0x2ca')](this,_0x22ccb1,_0x30f0c1,_0x406a87);},Window_StatusBase[_0x43e5ad('0x4a4')]['isExpGaugeDrawn']=function(){const _0x2683fe=_0x43e5ad;return VisuMZ[_0x2683fe('0x176')][_0x2683fe('0x117')]['UI'][_0x2683fe('0x4e1')];},Window_StatusBase[_0x43e5ad('0x4a4')][_0x43e5ad('0x3f0')]=function(_0x208258,_0x41d027,_0x3b5ecd){const _0x2634b1=_0x43e5ad;if(!_0x208258)return;if(!_0x208258[_0x2634b1('0x1bb')]())return;const _0x6240be=0x80,_0x3fe581=_0x208258[_0x2634b1('0xee')]();let _0x40950a=ColorManager[_0x2634b1('0x34a')](),_0x3818f6=ColorManager[_0x2634b1('0x1f7')]();_0x3fe581>=0x1&&(_0x40950a=ColorManager['maxLvGaugeColor1'](),_0x3818f6=ColorManager[_0x2634b1('0x18d')]()),this[_0x2634b1('0x25c')](_0x41d027,_0x3b5ecd,_0x6240be,_0x3fe581,_0x40950a,_0x3818f6);},Window_EquipStatus[_0x43e5ad('0x4a4')][_0x43e5ad('0x1bc')]=function(){const _0x4e65c9=_0x43e5ad;let _0x79215e=0x0;for(const _0x3072dc of VisuMZ[_0x4e65c9('0x176')][_0x4e65c9('0x117')]['Param'][_0x4e65c9('0xd0')]){const _0x52e8c8=this[_0x4e65c9('0x2cf')](),_0x31b49e=this[_0x4e65c9('0x1de')](_0x79215e);this[_0x4e65c9('0x1a8')](_0x52e8c8,_0x31b49e,_0x3072dc),_0x79215e++;}},Window_EquipStatus[_0x43e5ad('0x4a4')]['drawParamName']=function(_0x3ca8c4,_0x16bf7b,_0x8d23f2){const _0xc1ef10=_0x43e5ad,_0x244a43=this[_0xc1ef10('0x47d')]()-this[_0xc1ef10('0x2cf')]()*0x2;this[_0xc1ef10('0x3e3')](_0x3ca8c4,_0x16bf7b,_0x244a43,_0x8d23f2,![]);},Window_EquipStatus[_0x43e5ad('0x4a4')][_0x43e5ad('0x15a')]=function(_0x45c04e,_0x110f98,_0x623ad7){const _0x2716f9=_0x43e5ad,_0x4b182b=this['paramWidth']();this[_0x2716f9('0x44b')](),this[_0x2716f9('0x151')](this['_actor']['paramValueByName'](_0x623ad7,!![]),_0x45c04e,_0x110f98,_0x4b182b,_0x2716f9('0x34b'));},Window_EquipStatus[_0x43e5ad('0x4a4')][_0x43e5ad('0x447')]=function(_0x324296,_0x3ee79b){const _0x483643=_0x43e5ad,_0x3ae066=this[_0x483643('0x2f0')]();this['changeTextColor'](ColorManager['systemColor']());const _0x59385d=VisuMZ[_0x483643('0x176')][_0x483643('0x117')]['UI']['ParamArrow'];this[_0x483643('0x151')](_0x59385d,_0x324296,_0x3ee79b,_0x3ae066,'center');},Window_EquipStatus[_0x43e5ad('0x4a4')][_0x43e5ad('0x556')]=function(_0x462281,_0x57365d,_0x3b117d){const _0x386a6d=_0x43e5ad,_0x4aede2=this['paramWidth'](),_0x18a070=this[_0x386a6d('0x104')]['paramValueByName'](_0x3b117d),_0x376f58=_0x18a070-this['_actor'][_0x386a6d('0x250')](_0x3b117d);this['changeTextColor'](ColorManager[_0x386a6d('0x13f')](_0x376f58)),this[_0x386a6d('0x151')](VisuMZ[_0x386a6d('0x298')](_0x18a070,0x0),_0x462281,_0x57365d,_0x4aede2,'right');},Window_StatusParams[_0x43e5ad('0x4a4')]['maxItems']=function(){const _0x422bbe=_0x43e5ad;return VisuMZ[_0x422bbe('0x176')][_0x422bbe('0x117')][_0x422bbe('0x393')]['DisplayedParams']['length'];},Window_StatusParams[_0x43e5ad('0x4a4')]['drawItem']=function(_0x447d99){const _0x1fe9f4=_0x43e5ad,_0x84b552=this[_0x1fe9f4('0x12e')](_0x447d99),_0x594e50=VisuMZ[_0x1fe9f4('0x176')][_0x1fe9f4('0x117')][_0x1fe9f4('0x393')]['DisplayedParams'][_0x447d99],_0x70c2bb=TextManager[_0x1fe9f4('0x582')](_0x594e50),_0x5d520c=this[_0x1fe9f4('0x27e')][_0x1fe9f4('0x250')](_0x594e50,!![]);this[_0x1fe9f4('0x3e3')](_0x84b552['x'],_0x84b552['y'],0xa0,_0x594e50,![]),this[_0x1fe9f4('0x44b')](),this[_0x1fe9f4('0x151')](_0x5d520c,_0x84b552['x']+0xa0,_0x84b552['y'],0x3c,_0x1fe9f4('0x34b'));},VisuMZ['CoreEngine']['Window_ShopSell_isEnabled']=Window_ShopSell[_0x43e5ad('0x4a4')][_0x43e5ad('0x123')],Window_ShopSell[_0x43e5ad('0x4a4')][_0x43e5ad('0x123')]=function(_0x5b4638){const _0x5e20aa=_0x43e5ad;return VisuMZ[_0x5e20aa('0x176')][_0x5e20aa('0x117')][_0x5e20aa('0x32')]['KeyItemProtect']&&DataManager[_0x5e20aa('0x414')](_0x5b4638)?![]:VisuMZ[_0x5e20aa('0x176')][_0x5e20aa('0x14c')][_0x5e20aa('0x2ca')](this,_0x5b4638);},Window_NumberInput[_0x43e5ad('0x4a4')][_0x43e5ad('0x1b5')]=function(){return![];},Window_TitleCommand[_0x43e5ad('0x5fd')]=VisuMZ[_0x43e5ad('0x176')]['Settings'][_0x43e5ad('0x40c')],Window_TitleCommand[_0x43e5ad('0x4a4')][_0x43e5ad('0x459')]=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand['prototype'][_0x43e5ad('0x492')]=function(){const _0x1da951=_0x43e5ad;for(const _0x2b5b4a of Window_TitleCommand[_0x1da951('0x5fd')]){if(_0x2b5b4a[_0x1da951('0x4ec')][_0x1da951('0x2ca')](this)){const _0x5e82d5=_0x2b5b4a[_0x1da951('0x6f')];let _0x42d1d0=_0x2b5b4a[_0x1da951('0x547')];if(['',_0x1da951('0x4be')]['includes'](_0x42d1d0))_0x42d1d0=_0x2b5b4a[_0x1da951('0x7b')][_0x1da951('0x2ca')](this);const _0x89dd79=_0x2b5b4a[_0x1da951('0x5a7')][_0x1da951('0x2ca')](this),_0x46c1da=_0x2b5b4a[_0x1da951('0xef')][_0x1da951('0x2ca')](this);this[_0x1da951('0xa8')](_0x42d1d0,_0x5e82d5,_0x89dd79,_0x46c1da),this[_0x1da951('0x4da')](_0x5e82d5,_0x2b5b4a[_0x1da951('0x5b8')]['bind'](this,_0x46c1da));}}},Window_GameEnd['_commandList']=VisuMZ[_0x43e5ad('0x176')]['Settings']['MenuLayout'][_0x43e5ad('0x4b')][_0x43e5ad('0x4a0')],Window_GameEnd[_0x43e5ad('0x4a4')][_0x43e5ad('0x459')]=function(){const _0x39ddb6=_0x43e5ad;this[_0x39ddb6('0x492')]();},Window_GameEnd[_0x43e5ad('0x4a4')]['makeCoreEngineCommandList']=function(){const _0x5012ce=_0x43e5ad;for(const _0x26b42b of Window_GameEnd['_commandList']){if('ANhqB'===_0x5012ce('0x1df')){if(_0x26b42b['ShowJS'][_0x5012ce('0x2ca')](this)){const _0x3a2ad9=_0x26b42b[_0x5012ce('0x6f')];let _0x4601d9=_0x26b42b[_0x5012ce('0x547')];if(['',_0x5012ce('0x4be')][_0x5012ce('0x56b')](_0x4601d9))_0x4601d9=_0x26b42b[_0x5012ce('0x7b')][_0x5012ce('0x2ca')](this);const _0x88698e=_0x26b42b[_0x5012ce('0x5a7')][_0x5012ce('0x2ca')](this),_0x3411cc=_0x26b42b[_0x5012ce('0xef')][_0x5012ce('0x2ca')](this);this[_0x5012ce('0xa8')](_0x4601d9,_0x3a2ad9,_0x88698e,_0x3411cc),this[_0x5012ce('0x4da')](_0x3a2ad9,_0x26b42b[_0x5012ce('0x5b8')]['bind'](this,_0x3411cc));}}else{function _0x41f6ca(){const _0x4a30ff=_0x5012ce;this[_0x4a30ff('0x34d')][_0x4a30ff('0xe7')]>=0x18&&(this[_0x4a30ff('0x34d')][_0x4a30ff('0xe7')]-=0x6);}}}};function Window_ButtonAssist(){const _0x4274c7=_0x43e5ad;this[_0x4274c7('0x56')](...arguments);}Window_ButtonAssist[_0x43e5ad('0x4a4')]=Object[_0x43e5ad('0x2ee')](Window_Base['prototype']),Window_ButtonAssist[_0x43e5ad('0x4a4')][_0x43e5ad('0x191')]=Window_ButtonAssist,Window_ButtonAssist['prototype']['initialize']=function(_0x18655b){const _0x33f259=_0x43e5ad;this[_0x33f259('0x472')]={},Window_Base['prototype'][_0x33f259('0x56')][_0x33f259('0x2ca')](this,_0x18655b),this[_0x33f259('0x38a')](VisuMZ['CoreEngine'][_0x33f259('0x117')]['ButtonAssist'][_0x33f259('0x1e9')]||0x0),this['refresh']();},Window_ButtonAssist[_0x43e5ad('0x4a4')]['makeFontBigger']=function(){const _0xd04192=_0x43e5ad;if(this[_0xd04192('0x34d')][_0xd04192('0xe7')]<=0x60){if(_0xd04192('0xd9')===_0xd04192('0xd9'))this['contents'][_0xd04192('0xe7')]+=0x6;else{function _0x2d2c4f(){const _0x4262ba=_0xd04192;this[_0x4262ba('0x128')][_0x4262ba('0x38a')](_0x3ae601[_0x4262ba('0x594')][_0x4262ba('0x148')]);}}}},Window_ButtonAssist[_0x43e5ad('0x4a4')][_0x43e5ad('0x293')]=function(){const _0x3f00b2=_0x43e5ad;this[_0x3f00b2('0x34d')][_0x3f00b2('0xe7')]>=0x18&&(this[_0x3f00b2('0x34d')]['fontSize']-=0x6);},Window_ButtonAssist[_0x43e5ad('0x4a4')][_0x43e5ad('0x3a8')]=function(){const _0x37e355=_0x43e5ad;Window_Base[_0x37e355('0x4a4')][_0x37e355('0x3a8')][_0x37e355('0x2ca')](this),this[_0x37e355('0x508')]();},Window_ButtonAssist['prototype'][_0x43e5ad('0x1ba')]=function(){const _0x1443ab=_0x43e5ad;this[_0x1443ab('0x33')]=SceneManager[_0x1443ab('0x240')][_0x1443ab('0x28e')]()!==_0x1443ab('0x40')?0x0:0x8;},Window_ButtonAssist[_0x43e5ad('0x4a4')][_0x43e5ad('0x508')]=function(){const _0x441410=_0x43e5ad,_0x3b26e8=SceneManager['_scene'];for(let _0x18eba3=0x1;_0x18eba3<=0x5;_0x18eba3++){if(this[_0x441410('0x472')]['key%1'[_0x441410('0x417')](_0x18eba3)]!==_0x3b26e8[_0x441410('0x27f')[_0x441410('0x417')](_0x18eba3)]()){if(_0x441410('0x40d')!==_0x441410('0x40d')){function _0x50e425(){const _0x535e95=_0x441410;return this[_0x535e95('0x585')]['maxItems']();}}else return this[_0x441410('0x611')]();}if(this[_0x441410('0x472')]['text%1'[_0x441410('0x417')](_0x18eba3)]!==_0x3b26e8['buttonAssistText%1'[_0x441410('0x417')](_0x18eba3)]()){if(_0x441410('0x1f2')!==_0x441410('0x1f2')){function _0x1b2509(){const _0x33e700=_0x441410;this[_0x33e700('0x5f6')]();}}else return this[_0x441410('0x611')]();}}},Window_ButtonAssist[_0x43e5ad('0x4a4')][_0x43e5ad('0x611')]=function(){const _0x227bfb=_0x43e5ad;this[_0x227bfb('0x34d')][_0x227bfb('0x598')]();for(let _0xd5afd1=0x1;_0xd5afd1<=0x5;_0xd5afd1++){this[_0x227bfb('0x55e')](_0xd5afd1);}},Window_ButtonAssist[_0x43e5ad('0x4a4')][_0x43e5ad('0x55e')]=function(_0x7ff3f7){const _0x6742db=_0x43e5ad,_0xb5096=this[_0x6742db('0x385')]/0x5,_0x3a6f76=SceneManager[_0x6742db('0x240')],_0xfd5a5b=_0x3a6f76[_0x6742db('0x27f')[_0x6742db('0x417')](_0x7ff3f7)](),_0x38a68d=_0x3a6f76['buttonAssistText%1'[_0x6742db('0x417')](_0x7ff3f7)]();this['_data'][_0x6742db('0x496')[_0x6742db('0x417')](_0x7ff3f7)]=_0xfd5a5b,this[_0x6742db('0x472')][_0x6742db('0x392')[_0x6742db('0x417')](_0x7ff3f7)]=_0x38a68d;if(_0xfd5a5b==='')return;if(_0x38a68d==='')return;const _0x2a1f5e=_0x3a6f76[_0x6742db('0x4c2')[_0x6742db('0x417')](_0x7ff3f7)](),_0x19967d=this[_0x6742db('0x2cf')](),_0x118cd5=_0xb5096*(_0x7ff3f7-0x1)+_0x19967d+_0x2a1f5e,_0x4928b1=VisuMZ[_0x6742db('0x176')][_0x6742db('0x117')][_0x6742db('0x3e0')][_0x6742db('0x33a')];this[_0x6742db('0x4e2')](_0x4928b1[_0x6742db('0x417')](_0xfd5a5b,_0x38a68d),_0x118cd5,0x0,_0xb5096-_0x19967d*0x2);},VisuMZ[_0x43e5ad('0x3fb')]=function(_0x2fa3e9){const _0x16ab65=_0x43e5ad;if(Utils[_0x16ab65('0x341')]('test')){var _0x10d1a3=require(_0x16ab65('0x577'))[_0x16ab65('0x3ff')]['get']();SceneManager[_0x16ab65('0x45b')]();if(_0x2fa3e9)setTimeout(_0x10d1a3['focus'][_0x16ab65('0xc2')](_0x10d1a3),0x190);}},VisuMZ['ApplyEasing']=function(_0x3b9a14,_0x39fe18){const _0x20dd8a=_0x43e5ad;_0x39fe18=_0x39fe18[_0x20dd8a('0x545')]();var _0xc6d39e=1.70158,_0x132f25=0.7;switch(_0x39fe18){case'LINEAR':return _0x3b9a14;case _0x20dd8a('0x83'):return-0x1*Math[_0x20dd8a('0x350')](_0x3b9a14*(Math['PI']/0x2))+0x1;case _0x20dd8a('0x543'):return Math[_0x20dd8a('0x156')](_0x3b9a14*(Math['PI']/0x2));case _0x20dd8a('0x4a9'):return-0.5*(Math[_0x20dd8a('0x350')](Math['PI']*_0x3b9a14)-0x1);case'INQUAD':return _0x3b9a14*_0x3b9a14;case _0x20dd8a('0x39b'):return _0x3b9a14*(0x2-_0x3b9a14);case _0x20dd8a('0x1f5'):return _0x3b9a14<0.5?0x2*_0x3b9a14*_0x3b9a14:-0x1+(0x4-0x2*_0x3b9a14)*_0x3b9a14;case _0x20dd8a('0x592'):return _0x3b9a14*_0x3b9a14*_0x3b9a14;case _0x20dd8a('0x387'):var _0x27796f=_0x3b9a14-0x1;return _0x27796f*_0x27796f*_0x27796f+0x1;case _0x20dd8a('0x395'):return _0x3b9a14<0.5?0x4*_0x3b9a14*_0x3b9a14*_0x3b9a14:(_0x3b9a14-0x1)*(0x2*_0x3b9a14-0x2)*(0x2*_0x3b9a14-0x2)+0x1;case _0x20dd8a('0x5fe'):return _0x3b9a14*_0x3b9a14*_0x3b9a14*_0x3b9a14;case _0x20dd8a('0x50'):var _0x27796f=_0x3b9a14-0x1;return 0x1-_0x27796f*_0x27796f*_0x27796f*_0x27796f;case _0x20dd8a('0x335'):var _0x27796f=_0x3b9a14-0x1;return _0x3b9a14<0.5?0x8*_0x3b9a14*_0x3b9a14*_0x3b9a14*_0x3b9a14:0x1-0x8*_0x27796f*_0x27796f*_0x27796f*_0x27796f;case'INQUINT':return _0x3b9a14*_0x3b9a14*_0x3b9a14*_0x3b9a14*_0x3b9a14;case'OUTQUINT':var _0x27796f=_0x3b9a14-0x1;return 0x1+_0x27796f*_0x27796f*_0x27796f*_0x27796f*_0x27796f;case _0x20dd8a('0x158'):var _0x27796f=_0x3b9a14-0x1;return _0x3b9a14<0.5?0x10*_0x3b9a14*_0x3b9a14*_0x3b9a14*_0x3b9a14*_0x3b9a14:0x1+0x10*_0x27796f*_0x27796f*_0x27796f*_0x27796f*_0x27796f;case _0x20dd8a('0x24f'):if(_0x3b9a14===0x0)return 0x0;return Math[_0x20dd8a('0x27b')](0x2,0xa*(_0x3b9a14-0x1));case'OUTEXPO':if(_0x3b9a14===0x1){if(_0x20dd8a('0x408')!==_0x20dd8a('0x457'))return 0x1;else{function _0x590cef(){const _0x541ac6=_0x20dd8a;this['_data']={},_0x521687['prototype']['initialize'][_0x541ac6('0x2ca')](this,_0x303190),this['setBackgroundType'](_0xc4fd7['CoreEngine']['Settings'][_0x541ac6('0x3e0')][_0x541ac6('0x1e9')]||0x0),this[_0x541ac6('0x611')]();}}}return-Math['pow'](0x2,-0xa*_0x3b9a14)+0x1;case _0x20dd8a('0x476'):if(_0x3b9a14===0x0||_0x3b9a14===0x1)return _0x3b9a14;var _0xa95f9=_0x3b9a14*0x2,_0x5433f5=_0xa95f9-0x1;if(_0xa95f9<0x1)return 0.5*Math[_0x20dd8a('0x27b')](0x2,0xa*_0x5433f5);return 0.5*(-Math[_0x20dd8a('0x27b')](0x2,-0xa*_0x5433f5)+0x2);case'INCIRC':var _0xa95f9=_0x3b9a14/0x1;return-0x1*(Math[_0x20dd8a('0x467')](0x1-_0xa95f9*_0x3b9a14)-0x1);case'OUTCIRC':var _0x27796f=_0x3b9a14-0x1;return Math[_0x20dd8a('0x467')](0x1-_0x27796f*_0x27796f);case _0x20dd8a('0x46a'):var _0xa95f9=_0x3b9a14*0x2,_0x5433f5=_0xa95f9-0x2;if(_0xa95f9<0x1)return-0.5*(Math['sqrt'](0x1-_0xa95f9*_0xa95f9)-0x1);return 0.5*(Math[_0x20dd8a('0x467')](0x1-_0x5433f5*_0x5433f5)+0x1);case _0x20dd8a('0x550'):return _0x3b9a14*_0x3b9a14*((_0xc6d39e+0x1)*_0x3b9a14-_0xc6d39e);case _0x20dd8a('0x4c7'):var _0xa95f9=_0x3b9a14/0x1-0x1;return _0xa95f9*_0xa95f9*((_0xc6d39e+0x1)*_0xa95f9+_0xc6d39e)+0x1;break;case _0x20dd8a('0x5bd'):var _0xa95f9=_0x3b9a14*0x2,_0x3c4522=_0xa95f9-0x2,_0x2f128d=_0xc6d39e*1.525;if(_0xa95f9<0x1){if(_0x20dd8a('0x5d4')!==_0x20dd8a('0x5d4')){function _0x4cfe73(){const _0x372599=_0x20dd8a;return _0x58163a['CoreEngine'][_0x372599('0x117')][_0x372599('0x32')]['ModernControls'];}}else return 0.5*_0xa95f9*_0xa95f9*((_0x2f128d+0x1)*_0xa95f9-_0x2f128d);}return 0.5*(_0x3c4522*_0x3c4522*((_0x2f128d+0x1)*_0x3c4522+_0x2f128d)+0x2);case _0x20dd8a('0x180'):if(_0x3b9a14===0x0||_0x3b9a14===0x1){if('bMaPj'===_0x20dd8a('0x1ea'))return _0x3b9a14;else{function _0x44c46e(){const _0x407141=_0x20dd8a;this[_0x407141('0x185')]();}}}var _0xa95f9=_0x3b9a14/0x1,_0x5433f5=_0xa95f9-0x1,_0x3c57bd=0x1-_0x132f25,_0x2f128d=_0x3c57bd/(0x2*Math['PI'])*Math[_0x20dd8a('0x14d')](0x1);return-(Math['pow'](0x2,0xa*_0x5433f5)*Math[_0x20dd8a('0x156')]((_0x5433f5-_0x2f128d)*(0x2*Math['PI'])/_0x3c57bd));case _0x20dd8a('0x4d5'):var _0x3c57bd=0x1-_0x132f25,_0xa95f9=_0x3b9a14*0x2;if(_0x3b9a14===0x0||_0x3b9a14===0x1)return _0x3b9a14;var _0x2f128d=_0x3c57bd/(0x2*Math['PI'])*Math[_0x20dd8a('0x14d')](0x1);return Math[_0x20dd8a('0x27b')](0x2,-0xa*_0xa95f9)*Math[_0x20dd8a('0x156')]((_0xa95f9-_0x2f128d)*(0x2*Math['PI'])/_0x3c57bd)+0x1;case _0x20dd8a('0x3d9'):var _0x3c57bd=0x1-_0x132f25;if(_0x3b9a14===0x0||_0x3b9a14===0x1)return _0x3b9a14;var _0xa95f9=_0x3b9a14*0x2,_0x5433f5=_0xa95f9-0x1,_0x2f128d=_0x3c57bd/(0x2*Math['PI'])*Math['asin'](0x1);if(_0xa95f9<0x1)return-0.5*(Math[_0x20dd8a('0x27b')](0x2,0xa*_0x5433f5)*Math[_0x20dd8a('0x156')]((_0x5433f5-_0x2f128d)*(0x2*Math['PI'])/_0x3c57bd));return Math['pow'](0x2,-0xa*_0x5433f5)*Math[_0x20dd8a('0x156')]((_0x5433f5-_0x2f128d)*(0x2*Math['PI'])/_0x3c57bd)*0.5+0x1;case _0x20dd8a('0x587'):var _0xa95f9=_0x3b9a14/0x1;if(_0xa95f9<0x1/2.75){if(_0x20dd8a('0x3e6')==='ELMpE'){function _0x4b63fd(){const _0x5cd027=_0x20dd8a;return _0x14120f['CoreEngine'][_0x5cd027('0x117')][_0x5cd027('0x3ff')][_0x5cd027('0x52c')];}}else return 7.5625*_0xa95f9*_0xa95f9;}else{if(_0xa95f9<0x2/2.75){var _0x3c4522=_0xa95f9-1.5/2.75;return 7.5625*_0x3c4522*_0x3c4522+0.75;}else{if(_0xa95f9<2.5/2.75){var _0x3c4522=_0xa95f9-2.25/2.75;return 7.5625*_0x3c4522*_0x3c4522+0.9375;}else{var _0x3c4522=_0xa95f9-2.625/2.75;return 7.5625*_0x3c4522*_0x3c4522+0.984375;}}}case _0x20dd8a('0x33d'):var _0x70c45d=0x1-VisuMZ[_0x20dd8a('0x42')](0x1-_0x3b9a14,_0x20dd8a('0x26c'));return _0x70c45d;case _0x20dd8a('0x371'):if(_0x3b9a14<0.5)var _0x70c45d=VisuMZ['ApplyEasing'](_0x3b9a14*0x2,_0x20dd8a('0x5cc'))*0.5;else{if(_0x20dd8a('0x1dc')===_0x20dd8a('0xb1')){function _0x875984(){const _0x395e0c=_0x20dd8a;this[_0x395e0c('0x585')][_0x395e0c('0x38a')](_0x18846c['layoutSettings'][_0x395e0c('0x134')]);}}else var _0x70c45d=VisuMZ[_0x20dd8a('0x42')](_0x3b9a14*0x2-0x1,_0x20dd8a('0x26c'))*0.5+0.5;}return _0x70c45d;default:return _0x3b9a14;}},VisuMZ['GetParamIcon']=function(_0x1e4a7a){const _0x5c7289=_0x43e5ad;_0x1e4a7a=String(_0x1e4a7a)[_0x5c7289('0x545')]();const _0x246046=VisuMZ[_0x5c7289('0x176')]['Settings']['Param'];if(_0x1e4a7a===_0x5c7289('0x81'))return _0x246046[_0x5c7289('0x175')];if(_0x1e4a7a==='MAXMP')return _0x246046[_0x5c7289('0x473')];if(_0x1e4a7a==='ATK')return _0x246046[_0x5c7289('0xb9')];if(_0x1e4a7a===_0x5c7289('0x1f3'))return _0x246046[_0x5c7289('0x132')];if(_0x1e4a7a===_0x5c7289('0x49a'))return _0x246046[_0x5c7289('0x411')];if(_0x1e4a7a===_0x5c7289('0x48e'))return _0x246046[_0x5c7289('0xc3')];if(_0x1e4a7a==='AGI')return _0x246046[_0x5c7289('0x143')];if(_0x1e4a7a===_0x5c7289('0x87'))return _0x246046[_0x5c7289('0x3e2')];if(_0x1e4a7a===_0x5c7289('0x561'))return _0x246046[_0x5c7289('0x1c3')];if(_0x1e4a7a===_0x5c7289('0x568'))return _0x246046['IconXParam1'];if(_0x1e4a7a===_0x5c7289('0x23c'))return _0x246046[_0x5c7289('0x312')];if(_0x1e4a7a===_0x5c7289('0x3bb'))return _0x246046['IconXParam3'];if(_0x1e4a7a===_0x5c7289('0x4d7'))return _0x246046[_0x5c7289('0x56e')];if(_0x1e4a7a==='MRF')return _0x246046[_0x5c7289('0x119')];if(_0x1e4a7a===_0x5c7289('0x12c'))return _0x246046['IconXParam6'];if(_0x1e4a7a===_0x5c7289('0x37'))return _0x246046[_0x5c7289('0x355')];if(_0x1e4a7a==='MRG')return _0x246046[_0x5c7289('0x59f')];if(_0x1e4a7a===_0x5c7289('0x56d'))return _0x246046[_0x5c7289('0x421')];if(_0x1e4a7a===_0x5c7289('0x5e'))return _0x246046[_0x5c7289('0x422')];if(_0x1e4a7a===_0x5c7289('0x53d'))return _0x246046['IconSParam1'];if(_0x1e4a7a===_0x5c7289('0x1fa'))return _0x246046[_0x5c7289('0x60d')];if(_0x1e4a7a===_0x5c7289('0x280'))return _0x246046[_0x5c7289('0x388')];if(_0x1e4a7a==='MCR')return _0x246046[_0x5c7289('0x4ea')];if(_0x1e4a7a===_0x5c7289('0x244'))return _0x246046[_0x5c7289('0x52f')];if(_0x1e4a7a===_0x5c7289('0x1bd'))return _0x246046[_0x5c7289('0x17')];if(_0x1e4a7a===_0x5c7289('0x32a'))return _0x246046['IconSParam7'];if(_0x1e4a7a===_0x5c7289('0x3b9'))return _0x246046['IconSParam8'];if(_0x1e4a7a===_0x5c7289('0x150'))return _0x246046[_0x5c7289('0x4c8')];if(VisuMZ[_0x5c7289('0x176')][_0x5c7289('0x354')][_0x1e4a7a])return VisuMZ['CoreEngine'][_0x5c7289('0x354')][_0x1e4a7a]||0x0;return 0x0;},VisuMZ[_0x43e5ad('0x298')]=function(_0x377a84,_0x562f94){if(_0x377a84%0x1===0x0)return _0x377a84;return _0x562f94=_0x562f94||0x0,String((_0x377a84*0x64)['toFixed'](_0x562f94))+'%';},VisuMZ[_0x43e5ad('0x37f')]=function(_0x23132c){const _0x3f22e6=_0x43e5ad;_0x23132c=String(_0x23132c);if(!_0x23132c)return _0x23132c;if(typeof _0x23132c!==_0x3f22e6('0x316'))return _0x23132c;const _0xc08703=VisuMZ[_0x3f22e6('0x176')][_0x3f22e6('0x117')][_0x3f22e6('0x32')]['DigitGroupingLocale']||'en-US',_0x264cb8={'maximumFractionDigits':0x6};_0x23132c=_0x23132c[_0x3f22e6('0x2e6')](/\[(.*?)\]/g,(_0x5adc1e,_0x28399e)=>{const _0x4910d2=_0x3f22e6;if('ArShO'==='kCxUS'){function _0x262fcf(){const _0xc1024c=_0x47f2;_0x3a73ad[_0xc1024c('0x176')][_0xc1024c('0x531')]['call'](this),this[_0xc1024c('0x2c9')]();}}else return VisuMZ[_0x4910d2('0x2d1')](_0x28399e,'[',']');}),_0x23132c=_0x23132c['replace'](/<(.*?)>/g,(_0x5eb6c9,_0x1a0a1b)=>{const _0x5212aa=_0x3f22e6;return VisuMZ[_0x5212aa('0x2d1')](_0x1a0a1b,'<','>');}),_0x23132c=_0x23132c[_0x3f22e6('0x2e6')](/\{\{(.*?)\}\}/g,(_0x6e9b9d,_0x109d3a)=>{const _0x41ffbb=_0x3f22e6;if(_0x41ffbb('0xfc')===_0x41ffbb('0xfc'))return VisuMZ['PreserveNumbers'](_0x109d3a,'','');else{function _0x3cc569(){return this['checkSmartEventCollision'](_0x5c5b8e,_0x1d35d6);}}}),_0x23132c=_0x23132c['replace'](/(\d+\.?\d*)/g,(_0x32af9d,_0x55fce6)=>{const _0x2a1bcd=_0x3f22e6;let _0x5b8c43=_0x55fce6;if(_0x5b8c43[0x0]==='0')return _0x5b8c43;if(_0x5b8c43[_0x5b8c43['length']-0x1]==='.'){if(_0x2a1bcd('0x548')===_0x2a1bcd('0x76')){function _0x2a3986(){const _0x503d87=_0x2a1bcd;return _0x503d87('0xcd')[_0x503d87('0x417')](_0x20afad(_0xa076ed['$1']));}}else return Number(_0x5b8c43)[_0x2a1bcd('0x4cb')](_0xc08703,_0x264cb8)+'.';}else return _0x5b8c43[_0x5b8c43[_0x2a1bcd('0x1d9')]-0x1]===','?Number(_0x5b8c43)[_0x2a1bcd('0x4cb')](_0xc08703,_0x264cb8)+',':Number(_0x5b8c43)['toLocaleString'](_0xc08703,_0x264cb8);});let _0x3cfdb4=0x3;while(_0x3cfdb4--){_0x23132c=VisuMZ['RevertPreserveNumbers'](_0x23132c);}return _0x23132c;},VisuMZ[_0x43e5ad('0x2d1')]=function(_0x1f2e60,_0x581adf,_0x184298){const _0x49ecf9=_0x43e5ad;return _0x1f2e60=_0x1f2e60[_0x49ecf9('0x2e6')](/(\d)/gi,(_0x3e9de7,_0x1328b8)=>_0x49ecf9('0x523')[_0x49ecf9('0x417')](Number(_0x1328b8))),'%2%1%3'[_0x49ecf9('0x417')](_0x1f2e60,_0x581adf,_0x184298);},VisuMZ[_0x43e5ad('0x560')]=function(_0x428bd6){const _0x5cac00=_0x43e5ad;return _0x428bd6=_0x428bd6[_0x5cac00('0x2e6')](/PRESERVCONVERSION\((\d+)\)/gi,(_0x2190dd,_0x2169df)=>Number(parseInt(_0x2169df))),_0x428bd6;},VisuMZ['openURL']=function(_0x262c1f){const _0x34c7e4=_0x43e5ad;SoundManager['playOk']();if(!Utils[_0x34c7e4('0x1e3')]()){const _0x130878=window[_0x34c7e4('0x1b1')](_0x262c1f,'_blank');}else{const _0x4c6355=process[_0x34c7e4('0x528')]==_0x34c7e4('0x5d5')?_0x34c7e4('0x1b1'):process[_0x34c7e4('0x528')]==_0x34c7e4('0x518')?'start':_0x34c7e4('0x204');require(_0x34c7e4('0x378'))[_0x34c7e4('0x238')](_0x4c6355+'\x20'+_0x262c1f);}},Sprite_Clickable[_0x43e5ad('0x4a4')]['processTouch']=function(){const _0x494b80=_0x43e5ad;if(this['isClickEnabled']()){if('yrDws'===_0x494b80('0x60e')){function _0x352f9e(){const _0x2b0856=_0x494b80;this[_0x2b0856('0x13')]();}}else{if(this[_0x494b80('0x11e')]()){if(_0x494b80('0x1ff')===_0x494b80('0x73')){function _0x33a876(){const _0x1d8926=_0x494b80;this[_0x1d8926('0x200')]();}}else{if(!this[_0x494b80('0x501')]&&TouchInput[_0x494b80('0x193')]()){if(_0x494b80('0x59c')===_0x494b80('0x41b')){function _0x2be6d1(){const _0x2f0b97=_0x494b80;_0x589295[_0x2f0b97('0x17c')](),_0x4ce48d[_0x2f0b97('0x362')](_0x17c661),_0x102bfa['CoreEngine'][_0x2f0b97('0x107')][_0x2f0b97('0x2ca')](this,_0x5a1ff5);}}else this[_0x494b80('0x501')]=!![],this[_0x494b80('0xde')]();}TouchInput[_0x494b80('0x314')]()&&(this[_0x494b80('0x209')]=!![],this['onPress']());}}else{if(_0x494b80('0x4b7')!=='jOSck')this[_0x494b80('0x501')]&&this[_0x494b80('0x5b0')](),this['_pressed']=![],this[_0x494b80('0x501')]=![];else{function _0x38158(){const _0x37aa9c=_0x494b80;return _0x501103[_0x37aa9c('0x176')][_0x37aa9c('0x5db')]['call'](this);}}}this['_pressed']&&TouchInput[_0x494b80('0xb7')]()&&(this[_0x494b80('0x209')]=![],this[_0x494b80('0x5d8')]());}}else this[_0x494b80('0x209')]=![],this[_0x494b80('0x501')]=![];},Game_Picture[_0x43e5ad('0x4a4')]['anchor']=function(){const _0x13a7e9=_0x43e5ad;return this[_0x13a7e9('0x141')];},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x3a7')]=Game_Picture[_0x43e5ad('0x4a4')]['initBasic'],Game_Picture[_0x43e5ad('0x4a4')][_0x43e5ad('0xc1')]=function(){const _0x388826=_0x43e5ad;VisuMZ[_0x388826('0x176')]['Game_Picture_initBasic'][_0x388826('0x2ca')](this),this[_0x388826('0x141')]={'x':0x0,'y':0x0},this[_0x388826('0x1ef')]={'x':0x0,'y':0x0};},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x1a9')]=Game_Picture[_0x43e5ad('0x4a4')][_0x43e5ad('0x4ee')],Game_Picture[_0x43e5ad('0x4a4')][_0x43e5ad('0x4ee')]=function(){const _0x5c3a71=_0x43e5ad;this[_0x5c3a71('0x3d')](),VisuMZ['CoreEngine'][_0x5c3a71('0x1a9')]['call'](this);},VisuMZ[_0x43e5ad('0x176')]['Game_Picture_show']=Game_Picture['prototype'][_0x43e5ad('0x474')],Game_Picture[_0x43e5ad('0x4a4')]['show']=function(_0x32c427,_0x483445,_0x3a9ffe,_0x88dbb8,_0x4f409c,_0x4124a5,_0x50e14a,_0x34737d){const _0x159db4=_0x43e5ad;VisuMZ[_0x159db4('0x176')]['Game_Picture_show'][_0x159db4('0x2ca')](this,_0x32c427,_0x483445,_0x3a9ffe,_0x88dbb8,_0x4f409c,_0x4124a5,_0x50e14a,_0x34737d),this[_0x159db4('0x97')]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x483445]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x43e5ad('0x3d0')]=Game_Picture[_0x43e5ad('0x4a4')][_0x43e5ad('0x77')],Game_Picture['prototype'][_0x43e5ad('0x77')]=function(_0x5c4158,_0x333691,_0x356194,_0x3c7fa1,_0x568a88,_0x4f5f14,_0x27f097,_0x5f4ae7,_0x2af480){const _0x48e25a=_0x43e5ad;VisuMZ[_0x48e25a('0x176')][_0x48e25a('0x3d0')]['call'](this,_0x5c4158,_0x333691,_0x356194,_0x3c7fa1,_0x568a88,_0x4f5f14,_0x27f097,_0x5f4ae7,_0x2af480),this[_0x48e25a('0x242')]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5c4158]||{'x':0x0,'y':0x0});},Game_Picture[_0x43e5ad('0x4a4')]['updateAnchor']=function(){const _0x5ef2b1=_0x43e5ad;this[_0x5ef2b1('0x30f')]>0x0&&(this[_0x5ef2b1('0x141')]['x']=this[_0x5ef2b1('0x2f1')](this[_0x5ef2b1('0x141')]['x'],this[_0x5ef2b1('0x1ef')]['x']),this[_0x5ef2b1('0x141')]['y']=this[_0x5ef2b1('0x2f1')](this[_0x5ef2b1('0x141')]['y'],this[_0x5ef2b1('0x1ef')]['y']));},Game_Picture['prototype'][_0x43e5ad('0x97')]=function(_0x583000){const _0x10014b=_0x43e5ad;this[_0x10014b('0x141')]=_0x583000,this['_targetAnchor']=JsonEx[_0x10014b('0x26d')](this['_anchor']);},Game_Picture['prototype'][_0x43e5ad('0x242')]=function(_0x121aba){const _0x1aa850=_0x43e5ad;this[_0x1aa850('0x1ef')]=_0x121aba;},VisuMZ[_0x43e5ad('0x176')][_0x43e5ad('0x31b')]=Sprite_Picture[_0x43e5ad('0x4a4')]['updateOrigin'],Sprite_Picture[_0x43e5ad('0x4a4')][_0x43e5ad('0x272')]=function(){const _0xd31e15=_0x43e5ad,_0x36adc5=this[_0xd31e15('0x60f')]();if(!_0x36adc5['anchor']()){if(_0xd31e15('0x423')!==_0xd31e15('0xfd'))VisuMZ[_0xd31e15('0x176')]['Sprite_Picture_updateOrigin']['call'](this);else{function _0x4d6776(){var _0x2e29bd=_0x5e58f8(_0x30b6ae['$1']);_0x23b082+=_0x2e29bd;}}}else{if(_0xd31e15('0x3e8')===_0xd31e15('0x3e8'))this[_0xd31e15('0x5bc')]['x']=_0x36adc5['anchor']()['x'],this[_0xd31e15('0x5bc')]['y']=_0x36adc5[_0xd31e15('0x5bc')]()['y'];else{function _0x5dcab2(){const _0x1fe0ce=_0xd31e15;return _0x340a9f['CoreEngine'][_0x1fe0ce('0x117')][_0x1fe0ce('0x245')][_0x1fe0ce('0x3fd')][_0x1fe0ce('0x3d1')];}}}},Game_Action[_0x43e5ad('0x4a4')][_0x43e5ad('0x8')]=function(_0x43ed99){const _0x2ec967=_0x43e5ad;if(_0x43ed99){const _0x2be808=_0x43ed99['skillId'];if(_0x2be808===0x1&&this[_0x2ec967('0x3c3')]()[_0x2ec967('0x136')]()!==0x1){if(_0x2ec967('0x558')===_0x2ec967('0x558'))this[_0x2ec967('0x4e5')]();else{function _0x3c100f(){const _0x416049=_0x2ec967,_0x59ad0d=_0x152ff2['y']+(this[_0x416049('0x59b')]()-_0x229b48[_0x416049('0x3b6')])/0x2;this[_0x416049('0x239')](_0x8e2eaa,_0x4048d7['x'],_0x59ad0d);const _0x3380b2=_0x361433[_0x416049('0x44c')]+0x4;_0xbdcf99['x']+=_0x3380b2,_0x3bd02e[_0x416049('0x5a0')]-=_0x3380b2;}}}else _0x2be808===0x2&&this[_0x2ec967('0x3c3')]()[_0x2ec967('0x55')]()!==0x2?this[_0x2ec967('0x3c6')]():this['setSkill'](_0x2be808);}else{if(_0x2ec967('0x522')!==_0x2ec967('0x48b'))this[_0x2ec967('0x598')]();else{function _0x3ca1bb(){const _0x10aae4=_0x2ec967;_0x490387[_0x10aae4('0x176')]['Scene_Equip_create'][_0x10aae4('0x2ca')](this),this[_0x10aae4('0x2ed')]();}}}},Game_Actor['prototype'][_0x43e5ad('0x3ae')]=function(){const _0x566777=_0x43e5ad;return this[_0x566777('0x38b')]()[_0x566777('0x29d')](_0x5da33c=>this[_0x566777('0x2a9')](_0x5da33c)&&this[_0x566777('0x54d')]()[_0x566777('0x56b')](_0x5da33c[_0x566777('0x3a9')]));},Window_Base['prototype'][_0x43e5ad('0x21e')]=function(){const _0xeed60c=_0x43e5ad;if(this[_0xeed60c('0x50e')]){const _0x1a5584=this[_0xeed60c('0x50e')][_0xeed60c('0x529')],_0x55c5b8=this[_0xeed60c('0x5a0')],_0x795e12=this[_0xeed60c('0xc')],_0x3dc16e=this[_0xeed60c('0x33')],_0x2bcfbf=ColorManager[_0xeed60c('0x57e')](),_0x3fb966=ColorManager[_0xeed60c('0x336')]();_0x1a5584[_0xeed60c('0x5d6')](_0x55c5b8,_0x795e12),_0x1a5584[_0xeed60c('0x557')](0x0,0x0,_0x55c5b8,_0x3dc16e,_0x3fb966,_0x2bcfbf,!![]),_0x1a5584['fillRect'](0x0,_0x3dc16e,_0x55c5b8,_0x795e12-_0x3dc16e*0x2,_0x2bcfbf),_0x1a5584[_0xeed60c('0x557')](0x0,_0x795e12-_0x3dc16e,_0x55c5b8,_0x3dc16e,_0x2bcfbf,_0x3fb966,!![]),this[_0xeed60c('0x50e')][_0xeed60c('0x2d5')](0x0,0x0,_0x55c5b8,_0x795e12);}},Game_Actor['prototype']['makeAutoBattleActions']=function(){const _0xf918bd=_0x43e5ad;for(let _0x2ee795=0x0;_0x2ee795<this[_0xf918bd('0xd6')]();_0x2ee795++){if('kotnz'===_0xf918bd('0x63')){const _0x3bae54=this[_0xf918bd('0x38e')]();let _0x479375=Number['MIN_SAFE_INTEGER'];this[_0xf918bd('0x59e')](_0x2ee795,_0x3bae54[0x0]);for(const _0x46b452 of _0x3bae54){const _0x328318=_0x46b452['evaluate']();_0x328318>_0x479375&&(_0x479375=_0x328318,this['setAction'](_0x2ee795,_0x46b452));}}else{function _0x1df82b(){const _0x2411fa=_0xf918bd;this['_itemWindow']['setBackgroundType'](_0x22065e['layoutSettings'][_0x2411fa('0xa2')]);}}}this['setActionState'](_0xf918bd('0x26'));};