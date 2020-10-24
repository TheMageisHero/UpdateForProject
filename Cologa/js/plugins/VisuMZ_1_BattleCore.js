//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.09] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
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
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate>
 *
 * <JS Post-Regenerate>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * MECH: Variable Popup
 * - Causes the unit(s) to display a popup using the data stored inside
 *   a variable.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Variable:
 *   - Get data from which variable to display as a popup?
 * 
 *   Digit Grouping:
 *   - Use digit grouping to separate numbers?
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Common Events
 * 
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * ** Exiting out of the Options menu scene or Party menu scene will no longer
 *    cause party members to reset their starting position. Fix made by Arisu
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** There was a documentation error with <JS Pre-Regenerate> and
 *    <JS Post-Regenerate>. Fix made by Yanfly.
 * *** Before, these were written as <JS Pre-Regenerate Turn> and
 *     <JS Post-Regenerate Turn>. The "Turn" part of the notetag has been
 *     removed in the documentation.
 * * Feature Update!
 * ** Damage sprites on actors are now centered relative to the actor's anchor.
 *    Change made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Command added by Yanfly:
 * *** MECH: Variable Popup
 * **** Causes the unit(s) to display a popup using the data stored inside
 *      a variable.
 * 
 * Version 1.08: October 11, 2020
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
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
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_VariablePopup
 * @text MECH: Variable Popup
 * @desc Causes the unit(s) to display a popup using the data
 * stored inside a variable.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Variable:num
 * @text Variable ID
 * @type variable
 * @desc Get data from which variable to display as a popup?
 * @default 1
 * 
 * @arg DigitGrouping:eval
 * @text Digit Grouping
 * @parent Variable:num
 * @type boolean
 * @on Group Digits
 * @off Don't Group
 * @desc Use digit grouping to separate numbers?
 * Requires VisuMZ_0_CoreEngine!
 * @default true
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Variable:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to damage calculations.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent SelectWindow
 * @desc Offset the enemy name's X position by this much.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent SelectWindow
 * @desc Offset the enemy name's Y position by this much.
 * @default 0
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
//=============================================================================

const _0x5749=['klZZT','initElementStatusCore','collapseType','BackColor','battleCommandName','Mechanics','createEnemies','MaxLines','ynjpO','addItemCommand','_jumpHeight','clearMotion','Sprite_StateIcon_updateFrame','isHidden','prev\x20target','iconText','Window_ActorCommand_setup','Scene_Battle_logWindowRect','ClearBattleLog','ArRedRate','uZmdv','EvXjD','nameY','spinBattler','commandNameWindowDrawText','setHue','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_logWindow','_tpbState','ActSeq_Mechanics_Collapse','+%1','addShowHpGaugeCommand','Game_Interpreter_command301','origin','statusWindowRectXPStyle','AS\x20TARGET','setupMotion','missed','ApplyImmortal','return\x200','turn','SKILLS','setBattleCameraOffset','getItemDamageAmountLabelBattleCore','opponentsUnit','callOptions','clearForcedGameTroopSettingsBattleCore','PrioritySortActors','Formula','mpHealingFmt','Game_BattlerBase_canAttack','animationId','SnXQa','applyData','YhkWA','registerDefeatedEnemy','Sprite_Actor_createStateSprite','fittingHeight','EVAL','text','Window_BattleLog_displayFailure','isBattleMember','clearBattleCoreData','ResetFocus','chant','ActSeq_BattleLog_Refresh','Window_BattleStatus_drawItemImage','animationShouldMirror','GXqHj','animation','BattleEndEvent','setCursorRect','processAnimationRequests','damageFlat','skill','aLNMS','show','_handlers','createBattleUIOffsetX','QHJSG','itemEffectAddAttackState','_updateCursorArea','Scene_Battle_selectNextCommand','skillTypes','%1StartActionJS','makeActionList','HelpFight','repeats','BXTzD','ohSoq','ActionSkillMsg2','alive\x20enemies\x20not\x20target','processRandomizedData','GuardFormulaJS','ActSeq_Mechanics_CtbSpeed','reverse','battleUIOffsetX','addedDebuffs','ActSeq_Impact_ZoomBlurTargetCenter','MP_Rate','updateBattleProcess','removedBuffs','focus','_battler','process_VisuMZ_BattleCore_Notetags','MdSpq','ElementStatusCore','ActSeq_Motion_PerformAction','createMainSprite','XgClA','processVictory','ARRAYSTR','HelpOptions','clearRect','Scene_Battle_itemWindowRect','addState','Scene_Battle_skillWindowRect','waitForEffect','updateStart','isBattleCoreTargetScope','isForOpponentBattleCore','dimColor2','Scene_Battle_stop','_windowLayer','applyBattleCoreJS','Shadow2','ActionEffect','checkCacheKey','ActSeq_Mechanics_Immortal','LxvIR','create','ShowCritical','isSideView','round','wRuss','bRZfT','_dragonbonesSpriteContainer','fdbOH','processDefeat','onDisabledPartyCommandSelection','width','onEnemyOk','Sprite_Enemy_loadBitmap','ARRAYNUM','needsSelectionBattleCore','wgxVJ','getEnemyIdWithName','LyLNv','NSCPb','VisuMZ_1_SkillsStatesCore','setBattleCameraPoint','nnixO','not\x20focus','CtqSi','isFloating','SceneManager_isSceneChanging','dataId','redraw','JS\x20%1END\x20TURN','Game_Battler_clearDamagePopup','_currentAngle','atbInterrupt','PopupShiftY','TgoTH','turnCount','isTriggered','jCkQV','dxuXY','ConfigManager_makeData','Game_Temp_requestAnimation','SwAOG','_battlerName','Scene_Battle_startPartyCommandSelection','Ypvnr','Duration','isAnimationShownOnBattlePortrait','_appeared','VTXiy','isActiveTpb','updateForceAction','Game_Interpreter_terminate','ShowPortraitsBorderStyle','Sprite_Weapon_loadBitmap','Window_BattleLog_displayMpDamage','waitForJump','Ojmtn','PostApplyAsUserJS','update','addChildToBack','OdMIw','isFightCommandEnabled','actorId','_wtypeIDs','freezeMotion','krnTp','_actionBattlers','LNgYb','fEETz','isForFriend','PgDwH','BCynd','initMembers','PlVIE','xhOhy','stop','createHelpWindowBattleCore','attackSkillId','isBypassDamageCap','filter','ActSeq_Motion_FreezeMotionFrame','damageRate','Game_Map_battleback2Name','fight','Scene_Battle_windowAreaHeight','updateTargetPosition','AutoBattleMsg','PreDamageJS','isActing','FUNC','adjustPosition','walk','gQnfx','weaponTypes','setHelpWindow','ActSeq_Animation_WaitForAnimation','Sprite_Enemy_setBattler','setupMotionBlurImpactFilter','ActSeq_Movement_BattleStep','States','EasingType','svBattlerAnchorY','enenr','xdrlF','stypeId','innerHeight','hUiYE','_forcedBattleLayout','ActSeq_Impact_MotionTrailRemove','process_VisuMZ_BattleCore_CreateRegExp','Sprite_Enemy_initVisibility','actorCommandCancelTPB','initBattlePortrait','vQquv','Window_BattleLog_clear','EscapeSuccessJS','sort','ActSeq_Mechanics_AddBuffDebuff','regenerateAllBattleCore','shouldPopupDamage','BattleStartEvent','startMove','UXKBf','ShowMissEvasion','displayCurrentState','updateHpGaugePosition','updateFloat','VisuMZ_1_ElementStatusCore','ErHtg','resizeWindowBorderStyle','IOoVt','_homeY','eQQcA','_targetGrowY','BattleManager_onEncounter','_regionBattleback2','CmdIconAutoBattle','waitForAnimation','loadBitmap','TwwUy','ActSeq_Impact_ShockwaveEachTargets','getLastPluginCommandInterpreter','index','mainSpriteScaleX','battleSpin','removeAnimationFromContainer','_enemyIDs','battleLayoutStyle','animationNextDelay','slice','createHelpWindow','animationWait','startAction','_waitMode','isCertainHit','xrdXi','drawIcon','_damages','WaitCount2','getTraitSetKeys','AOWly','setupZoomBlurImpactFilter','commandOptions','STRUCT','constructor','createActorCommandWindowBattleCore','HtLtQ','ShowAddedBuff','arRedFlat','BattleManager_onEscapeFailure','djOXA','Window_BattleLog_displayMiss','_motionSpeed','VDfXy','concat','BattleManager_endAction','StyleOFF','ShowEnemyGauge','Spriteset_Battle_createBattleField','resetFontSettings','performCollapse','removeDamageSprite','NvAaI','addChildAt','Sprite_Actor_initMembers','_autoBattle','_totalValue','Pyfjo','Armor-%1-%2','updateBitmap','applyItem','Game_Action_evalDamageFormula','isForRandom','mainSpriteHeight','svAnchorY','EscapeSuccess','_skewDuration','remove','makeHpDamageText','esAYH','performMoveToPoint','_skillWindow','useItem','_cache','prcAy','setBattlerBattleCore','PostApplyAsTargetJS','moveToStartPosition','DistanceY','tPKbD','currentExt','_colorType','waitCount','finalizeScale','Gswfp','createBattleFieldBattleCore','getBattlePortraitFilename','speed','Sprite_Battler_update','loadEnemy','gYkhY','addCustomCommands','asnny','UizuK','flashColor','battlerSprites','HBpQd','CriticalHitFlat','PostStartBattleJS','list','battleCommands','actor','forceWeaponAnimation','Game_Battler_regenerateAll','zIpXD','ActionAnimation','ActSeq_Impact_ShockwavePoint','command3011','_skewWholeDuration','FXGSA','_effectsContainer','commandSymbol','BattleManager_startInput','default','drawItemStyleIconText','applyFreezeMotionFrames','opacityStart','SvMotionIdleSolo-%1-%2','setupBattleback','message2','_skewX','VarianceFormulaJS','_battlerContainer','CDSEg','ZJnpj','svBattlerShadowVisible','hardDamageCap','playReflection','ifxsl','Game_Action_isForOpponent','ActSeq_Target_RandTarget','isRightInputMode','setupCriticalEffect','battleJump','Item-%1-%2','Scene_Battle_createCancelButton','SideviewSelect','retreat','_battleLayoutStyle','_angleRevertOnFinish','nkHjd','iHNAh','hasBeenDefeatedBefore','waitForOpacity','lfrca','alive\x20opponents','CommandVisible','Scene_Battle_createHelpWindow','charging','Sprite_Enemy_updateBossCollapse','Window_ItemList_maxCols','updateStatusWindowPosition','_createEffectsContainer','Scene_ItemBase_applyItem','apxUU','BattleCore','rsKkJ','BattleLayout','PortraitScaleBorderStyle','_updateFilterArea','arRedRate','makeBattleCommand','ActiveTpbOptionsMessage','requestRefresh','ActSeq_Movement_MoveToPoint','mWmTs','updateRefresh','JfWHs','WaitForAnimation','isBuffAffected','Skills','performCounter','updatePosition','startSpin','azsWU','usePremadeActionSequence','WpcxS','apply','ORwju','onAngleEnd','PortraitScale','isStateResist','isClicked','onBattleStart','Window_BattleLog_displayCritical','singleSkill','createBattleUIOffsetY','alive\x20battlers\x20not\x20user','finishActionSet','ActSeq_Mechanics_WaitForEffect','requestMotion','ActionSequence','getStypeIdWithName','_damageContainer','addBattleCoreAutoBattleStyleCommand','isAnyoneFloating','Scene_Battle_createActorCommandWindow','_floatDuration','updateBattlebackBitmap','partyCommandWindowRectDefaultStyle','Sprite_Enemy_setHue','ShowActorGauge','JS\x20%1END\x20BATTLE','Window_BattleLog_performRecovery','textSizeEx','rrica','setWaitMode','PgShN','kzxGf','Sprite_Battler_setBattler','CreateActionSequenceTargets','performAttack','WaitCount1','setFrame','updateCommandNameWindow','Scene_Battle_helpWindowRect','displayEvasion','placeTimeGauge','BARE\x20HANDS','RDshq','windowAreaHeight','eBTus','_mainSprite','Game_BattlerBase_isStateResist','startWeaponAnimation','YNhdc','evaded','dead','regenerateAll','#ffffff','_iconIndex','emerge','enemy','FaceDirection','_targetSkewX','isSideButtonLayout','updateJump','AutoBattleCancel','_escapeRatio','removeAnimation','CriticalDmgRate','ArRedFlat','Debuffs','PostEndTurnJS','fgRGb','actorCommandEscape','VvcdA','ActSeq_Mechanics_CtbOrder','onTurnEnd','displayReflection','innerWidth','PreStartTurnJS','wQRni','_borderPortraitSprite','dDuOZ','_active','DamageStyles','weatherPower','WaitForEffect','isOpen','CriticalHitMultiplier','PostApplyJS','MessageWait','frmOs','DisplayAction','LCqRz','addNewState','refreshStatusWindow','getDefeatedEnemies','callNextMethod','Strength','jumpBattler','BattleManager_initMembers','anchorX','MOTIONS','frontviewSpriteY','tyoCR','jyOMZ','_duration','canBattlerMove','buffRemove','_animation','deathStateId','dOVGF','getColor','AddOption','delay','updateMain','process_VisuMZ_BattleCore_Failsafes','autoBattleStyle','ActSeq_Camera_FocusPoint','qMJPH','_enemy','_growWholeDuration','HomePosJS','JwGhR','PopupShiftX','onFloatEnd','_checkOn','ActSeq_Animation_ChangeBattlePortrait','partyCommandWindowRectBorderStyle','createActors','NqHfk','uiInputPosition','process_VisuMZ_BattleCore_DamageStyles','addCommand','JS\x20%1START\x20BATTLE','trueRandomTarget','isNonSubmenuCancel','cameraDuration','artGW','auto','hRbhO','allowRandomSpeed','ARRAYJSON','isWaiting','parent','addBattleCoreAutoBattleStartupCommand','YQWKD','HiMqA','updatePhase','_growDuration','clearWeaponAnimation','PrpGZ','canEscape','Enemy-%1-%2','DefaultSoftCap','type','GroupDigits','dying','rMxdL','PreRegenerateJS','stateMotionIndex','_forcing','VsieN','unshift','getNextSubjectFromPool','gyOAh','alive\x20opponents\x20not\x20target','DistanceAdjust','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','eTZUM','processBattleCoreJS','BattleLog','ReflectPlayback','snapForBackground','KKWIN','drawItemStatusListStyle','voYrz','abnormal','visualHpGauge','showEnemyAttackAnimation','Targets1','_borderPortraitDuration','clamp','SkillItemMiddleLayout','drawSkillCost','pMKKG','Mvrao','isPartyCommandWindowDisabled','placeGauge','isOpponent','ActorCmd','_spriteset','battleEffect','zBmMR','YVujt','bRRJK','QmLZZ','NOKoh','createDigits','drawText','ActSeq_Mechanics_RemoveBuffDebuff','filterArea','eryTd','onOpacityEnd','HhYfD','SkillItemStandardCols','Window_BattleLog_popBaseLine','loadBattleback2','_angleWholeDuration','VAWTy','oSfoH','_enemyId','ActSeq_Mechanics_AddState','logActionList','ActSeq_Movement_Spin','MotionSpeed','JCLKm','exit','backColor','Index','JZXPN','Game_Action_clear','VisuMZ_2_PartySystem','updateCancel','Scene_Battle_createPartyCommandWindow','_svBattlerSprite','Scene_Battle_terminate','rbWiG','basicGaugesY','setText','getSkillIdWithName','commandNameWindowCenter','AGI','createDamageSprite','pLIRw','NQGTI','_immortal','motionSpeed','isEffecting','updatePositionBattleCore','AnimationID','damageOffsetX','gainTp','move','_tpbNeedsPartyCommand','angle','forceEscapeSprite','AsUser','Rate','uNtLe','PreDamageAsTargetJS','updateStateSprite','Scene_Options_maxCommands','Scene_Battle_onActorOk','forceSelect','anchor','Game_Action_itemHit','baaBC','hXHfB','aNUbV','_homeX','ActSeq_Movement_Jump','canAddSkillCommand','StartTurnShow','swing','battlelog','isDead','Intensity','Style','swBsR','setVisibleUI','NcCeL','nhzms','Window_BattleLog_performSubstitute','OdHbw','makeTargets','DCsYG','damage','OnrhR','ConfigManager_applyData','onEncounter','RepositionEnemies','SvWeaponSolo-%1-%2','statusWindowRect','sortDamageSprites','Game_Enemy_setup','mhp','updateGrow','getNextDamagePopup','performJump','KRgjz','setBattleSkew','dead\x20actors','_motion','Scene_Battle_commandFight','wait','performMiss','createDamageContainer','arPenRate','HVKET','removeState','statusWindowRectBorderStyle','displayFailure','battleAngle','KySND','lGKmN','transform','AsTarget','terminate','repositionEnemiesByResolution','egXtS','EscapeFail','isAnyoneGrowing','battleCorePreBattleCommonEvent','damageContainer','_floatEasing','mwCGi','ifplR','PljQZ','alive\x20actors\x20not\x20user','Buffs','includes','active','DisablePartyCmd','isMoving','updatePadding','PopupOffsetX','ActSeq_Movement_Float','ActSeq_Mechanics_ActionEffect','prototype','arPenFlat','ActSeq_Movement_WaitForScale','placeActorName','fouwa','State-%1-%2','playCancel','MDF','showAnimation','XGXQO','hxfto','isAnimationPlaying','jjTAk','OCVQH','Damage','attachSpritesToDistortionSprite','vFpmb','kyoJr','Ymeik','deadMembers','forceAction','_createClientArea','UlcDR','Game_Action_itemEffectAddAttackState','_growY','isBattlerFlipped','Game_Battler_performDamage','contents','process_VisuMZ_BattleCore_BaseTroops','ActSeq_Set_FinishAction','Window_BattleLog_displayTpDamage','battleCoreResumeLaunchBattle','ActionCenteredName','setMoveEasingType','getWtypeIdWithName','clearBattlerMotionTrailData','ArPenFlat','gncXj','IpnCb','critical','updateShadowBattleCore','Game_Action_makeTargets','isFlipped','_jumpDuration','map','Spriteset_Battle_update','skillItemWindowRectMiddle','Window_Options_addGeneralOptions','battler','Scene_Battle_onActorCancel','_stateSprite','ItEYJ','battleSpriteSkew','Window_SkillList_maxCols','PartyCmd','qiUDS','endAction','IYbxI','DefaultHardCap','displayCounter','ActSeq_Set_WholeActionSet','changeWeather','_lastPluginCommandInterpreter','isMagicSkill','HelpSkillType','nxzoI','SvWeaponMass-%1-%2','ARRAYFUNC','qhzRA','Sprite_Actor_updateShadow','mDRrN','fyuJI','createCommandNameWindow','OuCOw','_floatWholeDuration','Irqvp','ActSeq_Element_Clear','power','motionIdle','_text','OPKKy','VTyyX','EApAt','statusWindowRectDefaultStyle','RsoDv','bGoVJ','Scene_Battle_selectPreviousCommand','loop','ActSeq_ChangeSkew','Elements','APPgf','QaZXS','ActSeq_Angle_WaitForAngle','_statusWindow','startTurn','HYmsu','isConfused','evalDamageFormulaBattleCore','isAutoBattleCommandEnabled','ArPenRate','VisuMZ_2_BattleSystemCTB','onActorCancel','canGuardBattleCore','filters','onBattleStartBattleCore','contentsOpacity','removeChild','DPdkh','_growX','getBattlePortrait','Game_Enemy_transform','Sprite_Battler_updatePosition','drawSingleSkillCost','needsSelection','iterateBattler','SGUSu','isActor','changeBattlebacks','uMPeO','message1','Scene_Battle_createAllWindows','NewPopupBottom','applyArmorModifiers','_cancelButton','_isBattlerFlipped','ActSeq_BattleLog_WaitForBattleLog','Window_BattleLog_performReflection','-%1\x20MP','selectNextCommandTpb','isTpb','Window_BattleLog_performCollapse','pushBaseLine','DamageType%1','drawTextEx','updateCustomActionSequence','pjGNg','commandNameWindowDrawBackground','autoBattleAtStart','waitForNewLine','front\x20center','changeAtbChargeTime','nBSqW','qRTMv','_initialOffset','Game_Battler_startTpbTurn','ysiKq','SAOrV','Window_BattleEnemy_show','escape','helpAreaHeight','Radius','executeDamage','FAyzD','textColor','battleGrow','canMove','description','ActionSkillMsg1','JS\x20%1REGENERATE','PostDamageAsTargetJS','cancelActorInput','Game_BattlerBase_addNewState','parse','MAXMP','TextAlign','createAllWindows','GJhhk','bitmapHeight','xTIKP','buIeF','Height','AnchorX','cancelTargetSelectionVisibility','addAutoBattleCommands','cameraClamp','wdhOa','createEnemyNameContainer','sVwvB','isImmortal','setupShockwaveImpactFilter','split','border','pFIJZ','makeDeepCopy','Game_BattlerBase_canGuard','rBIOR','SvMotionIdleMass-%1-%2','extraHeight','KdsAI','SkipPartyCmd','waitForFloat','partyCommandWindowRectXPStyle','calcWindowHeight','VvKDA','battleMove','bottom','dragonbonesData','isFriendly','StepDistanceX','frameVisible','ActSeq_Angle_Reset','CmdStyle','pattern','evade','processRefresh','dimColor1','QoL','_createCursorArea','DefaultDamageStyle','VisuMZ_3_ActSeqImpact','process_VisuMZ_BattleCore_jsFunctions','ActSeq_Movement_MoveBy','Scene_Battle_updateBattleProcess','inputtingAction','setImmortal','_animationCount','worldTransform','setBattlePortrait','displayReflectionPlayBack','Game_System_initialize','_methods','gIvbC','forceMotion','setupHpGaugeSprite','_enemies','uXCEo','drawItemStatus','EscapeFailureJS','Sprite_Actor_updateFrame','ivjoO','attackStates','makeCommandList','requestDragonbonesAnimation','Game_Interpreter_command283','Game_Action_executeDamage','ActSeq_Animation_ActionAnimation','adjustWeaponSpriteOffset','_distortionSprite','allowCollapse','getItemDamageAmountTextBattleCore','ITEM','changePaintOpacity','dead\x20opponents','Turns','setBattlerFacePoint','loadSvActor','AddHpGaugeOption','IBcbv','displayMpDamage','ActSeq_Mechanics_AtbGauge','XFevY','PreEndBattleJS','Sprite_Battler_initMembers','VQBap','VpSBY','aTGyg','isBusy','OffsetX','hasSkill','popupDamage','createSeparateDamagePopups','skewDuration','start','addText','startDamagePopup','WaitForMovement','rGnpE','isItem','Game_Action_needsSelection','BERFI','updateBattlebackBitmap1','Sprite_Actor_update','isForOne','XfGnW','<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>','BattleCmdList','BattleManager_endBattle','reserveCommonEvent','changeBattlerOpacity','isOnCurrentMap','addLoadListener','canUse','setSvBattlerSprite','AsZfL','PopupPosition','createStateIconSprite','changeInputWindow','drawItemImage','wholeActionSet','_motionType','updateBorderSprite','SkewX','adjustFlippedBattlefield','missile','addGeneralOptions','iGJVN','PostEndActionJS','Scene_Battle_startEnemySelection','DTB','Game_Battler_performActionEnd','ZByEo','xErkU','setAttack','PostDamageJS','_growEasing','_baseX','addFightCommand','_back2Sprite','portrait','battleMembers','children','ShowReflect','displayStartMessages','CommandWidth','QzYnr','smooth','name','messageSpeed','ActSeq_DB_DragonbonesTimeScale','command119','makeData','mainSpriteWidth','Shadow','RBkun','applyHardDamageCap','TargetLocation','applyForcedGameTroopSettingsBattleCore','displayBuffs','ActSeq_Movement_Opacity','isSpriteVisible','_helpWindow','ActSeq_Movement_WaitForSkew','nOAFz','updateStateSpriteBattleCore','MotionFrameWait','CmdTextAutoBattle','ojlyD','unHEb','_stypeIDs','createContents','onSelectAction','ActSeq_Target_PrevTarget','Scene_Boot_onDatabaseLoaded','BattleManager_processDefeat','FuhOA','message4','removeImmortal','CalcEscapeRaiseJS','mYnrm','gainMp','playEnemyDamage','process_VisuMZ_BattleCore_Action_Notetags','_target','updateFrame','Game_BattlerBase_die','startOpacity','drain','ShowPopup','Sprite_Enemy_update','isAnyoneSkewing','StyleName','JS\x20BATTLE\x20VICTORY','Game_BattlerBase_refresh','refreshCursor','ATK','createHpGaugeSprite','CastCertain','Game_Actor_makeActionList','waIlr','addAutoBattleCommand','Setting','showHelpWindow','alive\x20enemies','commandAutoBattle','updateSpin','mpDamage','getSkillTypes','performDamage','_motionCount','displayTpDamage','updateShadowVisibility','victory','nQsaC','isInputting','mwXQZ','isAnyoneMoving','GqYLB','isFrameVisible','getAttackMotion','YtNWs','HelpEscape','pages','umKDQ','PreApply%1JS','battleEnd','_weaponSprite','updateScale','clearFreezeMotionForWeapons','AS\x20USER','#%1','pop','isJumping','addImmortal','repeatTargets','evalDamageFormula','UNjFB','lTQol','_enemyNameContainer','startJump','ShowSubstitute','_targetIndex','freezeFrame','gnQrG','_dimmerSprite','addEscapeCommand','process_VisuMZ_BattleCore_TraitObject_Notetags','ActSeq_Mechanics_VariablePopup','drPdP','digSU','MP_Flat','ActSeq_Mechanics_DamagePopup','WaitForScale','MAT','setBattlerFlip','ShowTpDmg','iconHeight','PreStartActionJS','attackAnimationId1','updateBattlebackBitmap2','push','angleDuration','_autoBattleWindow','CUrkv','log','getItemDamageAmountLabelOriginal','RTgDf','height','autoBattleStart','FocusX','_itemWindow','_opacityWholeDuration','updateActors','eaeYT','ObaXr','_inputting','refreshMotion','qcaNw','_forcedBattlers','wbJER','_attackAnimationId','gaugeX','createActorCommandWindow','applyAngleChange','Text','HoRcG','IconStypeNorm','_commandNameWindow','updateCollapse','sFJZu','imfgS','substitute','iconWidth','setBattleZoom','_callSceneOptions','FlashDuration','_forceAction','LUK','ActionItemMsg','isEnemy','FocusY','FaceAway','opacity','_interpreter','clear','setBattlerMotionTrailData','changeCtbCastTime','text\x20target','autoBattle','trim','StartName','isDisplayEmergedEnemies','addSingleSkillCommand','note','hyIYA','_executedValue','isBorderStylePortraitShown','HelpAutoBattle','requestAnimation','DXCcn','ActSeq_Target_CurrentIndex','rowSpacing','Width','CheckSkillCommandShowSwitches','lineRect','Sprite_Battler_setHome','OffsetY','CriticalDuration','moveBattlerDistance','DOoit','hide','blt','battleCamera','isPlaytest','_targetOpacity','cHHpU','FCFvF','isAnyoneSpinning','_defeatedEnemies','createKeyJS','ActSeq_Camera_Reset','setupTextPopup','_actorWindow','startInput','BattleVictoryJS','applyImmortal','BattleManager_processVictory','ActSeq_Element_NullElements','ActSeq_DB_DragonbonesMotionAni','isTurnBased','roSfN','Window_BattleLog_performMagicEvasion','refreshBattlerMotions','svAnchorX','hitRate','ChargeRate','WaitForAngle','isBattleTest','startActorCommandSelection','CalcEscapeRatioJS','PreApplyAsUserJS','aliveMembers','_subject','drawItemStatusXPStyle','_enemyWindow','NameOffsetY','getAttackWeaponAnimationId','enemyNames','targetObjects','drawItemImageListStyle','svBattlerAnchorX','GhmXj','command339','Sprite_Enemy_updateStateSprite','updateVisibility','_angleEasing','setupChild','onEncounterBattleCore','Game_Battler_onTurnEnd','setupBattlebackBattleCore','SJlEE','battleFloat','dead\x20enemies','getInputButtonString','close','maxItems','Scene_Battle_startActorSelection','BTestBypass','CoreEngine','isAnyoneJumping','WaitForSkew','onRegeneratePlayStateAnimation','softDamageCap','ScaleY','pqjWP','_actorCommandWindow','SkillItemBorderCols','_opacityDuration','performSubstitute','statusTextAutoBattleStyle','Sprite_Battler_isMoving','_shadowSprite','ext','DamageStyleList','onEscapeSuccess','some','HP_Rate','_targetAngle','zoomDuration','canUseItemCommand','Window_BattleLog_performCounter','compareBattlerSprites','subject','initBattleCore','StartTurnWait','isForOpponent','nNDhq','resizeWindowXPStyle','addDamageSprite','Settings','DefaultSoftScaler','LOUUJ','ETpjr','Window_BattleLog_displayCurrentState','setupRgbSplitImpactFilter','bgType','ujQgk','onGrowEnd','updateAngleCalculations','ShowCounter','_actions','command357','splice','zOyoK','performActionMotions','fasqn','cSLWG','_actor','rlFUm','MGdaQ','Window_BattleLog_popupDamage','makeActionListAutoAttack','updateSkew','HrSPJ','ConvertParams','ActSeq_Movement_MoveToTarget','selectNextActor','actorCommandWindowRect','_targetFloatHeight','updateHelp','kalim','launchBattle','collapse','replace','Actor-%1-%2','ceil','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20','Sprite_Enemy_createStateIconSprite','_flashColor','clpeI','iUqVl','wKxuf','guardSkillId','commandName','%1StartBattleJS','nyEpq','ActSeq_BattleLog_WaitForNewLine','battleback2Name','ARRAYSTRUCT','Window_BattleLog_pushBaseLine','members','padding','_item','isItemCommandEnabled','getDamageStyle','requestMotionRefresh','RegExp','eiaaW','lhIzY','Game_Battler_performActionStart','ActSeq_BattleLog_DisplayAction','RyWXa','addGuardCommand','addSkillTypeCommand','isNextScene','performMagicEvasion','YNLWy','battleSkew','FlashColor','setupBattleCoreData','getConfigValue','Game_Battler_clearMotion','mpDamageFmt','UzTFI','mSJDb','displayAction','addChild','ActSeq_Element_ForceElements','updateAction','inHomePosition','toLowerCase','floor','isSkillItemWindowsMiddle','SkewY','ActSeq_Movement_WaitForSpin','_animationSprites','damageOffsetY','isAutoBattleCommandAdded','CriticalDmgFlat','OWUzO','Window_BattleLog_performAction','_baseLineStack','pow','Game_BattlerBase_initMembers','_list','LqSvn','applyEasing','visible','_updateClientArea','hdeiP','buffAdd','isAtbCastingState','createBorderStylePortraitSprite','canAttack','performActionEnd','PbAdL','okButtonText','startMotion','mHDiw','HpGauge','validTargets','flashDuration','Game_Interpreter_PluginCommand','performCastAnimation','_offsetY','actorCommandAutoBattle','CmdIconEscape','ShowRemovedState','bIWUT','rmlDA','uXyoc','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','displayType','xECZm','clearDamagePopup','wlxJN','TP_Flat','requestFauxAnimation','measureTextWidth','AlphaFilter','swapEnemyIDs','%1EndTurnJS','PostEndBattleJS','indexOf','currentValue','isForRandomBattleCore','autoSelect','TaZpS','isPreviousScene','_hpGaugeSprite','traitSet','StartTurnMsg','Angle','WaitForOpacity','battleZoom','VisuMZ_2_DragonbonesUnion','performActionStart','Game_Action_isForFriend','hFfOU','drawItemImagePortraitStyle','updateBorderStyle','_battlePortrait','isMagical','BattleManager_startBattle','weatherType','VXaOC','PNwUQ','hpHealingFmt','Destination','ActSeq_Set_SetupAction','fYTLP','GRapm','HYUNF','MotionType','getMenuImage','_targets','_freezeMotionData','_floatHeight','_borderPortraitTargetX','ActSeq_Animation_ShowAnimation','FrontViewSelect','WaitCount','JS\x20ESCAPE\x20SUCCESS','updateStyleOpacity','isBattleFlipped','%1StartTurnJS','displayItemMessage','ZgLmx','itemTextAlign','Game_Action_isForRandom','actorCommandSingleSkill','yTYyQ','uepkO','isDying','updateShadowPosition','custom','_additionalSprites','updateOpacity','kPRCv','ShowFacesListStyle','createCommandVisibleJS','Game_Battler_onBattleStart','ActSeq_Impact_MotionBlurScreen','addSingleSkillCommands','DigitGrouping','setSkill','_phase','battleCommandIcon','attackMotions','Window_BattleLog_displayEvasion','_angleDuration','isAutoBattle','parseForcedGameTroopSettingsBattleCore','onActorOk','ActSeq_Motion_WaitMotionFrame','createJS','BattleManager_selectNextCommand','acajU','removeActor','damageStyle','Cvthc','fdQqO','_flipScaleX','CommandAddOptions','weaponImageId','PostDamage%1JS','isShownOnBattlePortrait','drawBackgroundRect','isBattleSys','waitForMovement','zXkZt','updateBossCollapse','Scale','battleAnimation','randomTargets','_effectType','abs','StyleON','AttackAnimation','_back1Sprite','yJpnu','maxCols','isOptionsCommandAdded','JS\x20BATTLE\x20DEFEAT','random','StepDuration','createEmptyBitmap','max','eWOtg','left','status','helpAreaBottom','isCancelled','bind','PreEndTurnJS','isDamagePopupRequested','MotionAni','isEscapeCommandEnabled','qRnMn','SHxlP','logWindowRect','skillItemWindowRectBorderStyle','ShowCurrentState','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_effectDuration','boxWidth','ResetOffset','Point','ToWLr','Sprite_Actor_moveToStartPosition','DigitGroupingDamageSprites','processPostBattleCommonEvents','PreApplyJS','Scene_Battle_onEnemyOk','oTDEe','mmp','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','mrBLK','Scene_Map_launchBattle','center','createEffectActionSet','jump','displayCritical','commandStyleCheck','toString','gainHp','CastMagical','MdrmG','value','Spriteset_Battle_createLowerLayer','zNEUn','refreshActorPortrait','Mirror','dnYbt','_damagePopupArray','alive\x20friends\x20not\x20target','zzWIy','ActSeq_Mechanics_DeathBreak','vCAnl','FwoHL','isVisualHpGaugeDisplayed','itemWindowRect','DamageFlat','Pre','maxLines','PreEndActionJS','Game_Party_removeActor','WaitForCamera','itemLineRect','createStateSprite','addAnimationSpriteToContainer','Game_Map_battleback1Name','isCharging','gtfWJ','isGrowing','TCykA','Window_BattleLog_performDamage','AutoBattleOK','onJumpEnd','displaySubstitute','AnchorY','isChanting','sleep','autoBattleWindowRect','kWWim','uzewv','preemptive','OfvyB','MAXHP','updateBattlerContainer','DEF','isSkill','PostStartActionJS','addAttackCommand','CgKuN','qTChL','stepForward','IconSet','YfWCa','onMoveEnd','ActSeq_BattleLog_UI','SvBattlerSolo-%1-%2','ActSeq_Impact_ZoomBlurPoint','removeBuff','updateWeather','maxCommands','actionEffect','updateWaitMode','open','sortEnemies','spriteId','setActorHome','ActSeq_ChangeAngle','jkgsE','setHome','CgvGE','VisuMZ_0_CoreEngine','addBuff','TextColor','lineHeight','Window_BattleLog_update','isCustomActionSequence','PreDamageAsUserJS','BattleManager_cancelActorInput','itemCri','battleCameraData','HitRate','addSkillCommands','imsVd','inBattle','addOptionsCommand','ConvertActionSequenceTarget','_cursorSprite','isOptionsCommandEnabled','WOxoZ','kBMjn','_action','oGYQP','FlinchDistanceY','allBattleMembers','actor%1-portrait','BattleDefeatJS','Enemy','BaCCY','FeShP','_opacityEasing','windowPadding','iconIndex','BLwkG','<CENTER>%1','battlerSmoothImage','AutoMeleeSolo','getHardDamageCap','EmergeText','_offsetX','ActionStart','GXjFb','displayHpDamage','cancelButtonText','dkbXu','setupDamagePopup','drawActorFace','startPartyCommandSelection','kHKlQ','Sprite_Battler_startMove','Class-%1-%2','createChildSprite','YBYzv','PostRegenerateJS','VIYoo','parameters','aziLp','_surprise','bnreS','%1EndActionJS','Scene_Battle_start','-%1','SHqgL','QlzsJ','mkwVp','invokeAction','lRZgr','ActSeq_Movement_Scale','finishActorInput','_updateCursorFilterArea','lrSwf','ActSeq_Zoom_Reset','Sprite_Battler_damageOffsetY','Uedca','Game_Interpreter_updateWaitMode','startTpbTurn','getNextSubject','JuVyy','startBattle','partyCommandWindowRect','_preBattleCommonEvent','maxTp','Game_BattlerBase_eraseState','endAnimation','IeKue','battleback1Name','battleUIOffsetY','AHPmE','_flashDuration','shadow','changeAtbCastTime','isSkewing','vpcCE','ActSeq_Animation_CastAnimation','AutoBattle','axqmZ','item','Spriteset_Battle_updateActors','jgXPa','endBattle','isMeleeSingleTargetAction','reduce','setBattleCameraTargets','criticalDmgRate','enemyId','dead\x20battlers','createAutoBattleWindow','result','hpDamage','JErIf','DamageDisplay','updateShadow','skillId','initialize','HziSc','length','qxfdP','mainSprite','startSkew','selectPreviousCommand','fepaa','Amp','rWSKt','\x5cI[%1]%2','uATYu','_skillIDs','cfjgl','Game_Action_itemEffectAddNormalState','setupIconTextPopup','applyDamageCaps','ATTACK','alive\x20battlers\x20not\x20target','right','OuBMe','prepareCustomActionSequence','AutoBattleRect','_allTargets','helpWindowRectBorderStyle','Game_Map_setupBattleback','UNTITLED','alive\x20actors\x20not\x20target','shift','JumpToLabel','ijzPr','counterAttack','commandStyle','isForAll','registerCommand','JvWvR','BabPJ','isForFriendBattleCore','skew','StepDistanceY','WaitForSpin','utvim','updateMotionCount','fontSize','xLvRC','wtypeId','_weaponImageId','isSkipPartyCommandWindow','bitmap','attack','DistanceX','AdjustRect','command283','scope','_skewY','HDxIT','scale','Variable','ChantStyle','anchorY','startGrow','traitObjects','icon','XPActorCommandLines','performEvasion','performRecovery','hue','clearFreezeMotion','BattleLogRectJS','JS\x20%1APPLY\x20%2','Window_BattleLog_performActionStart','setLastPluginCommandInterpreter','match','setupBattleCore','reUVp','createLowerLayer','skillWindowRect','cameraOffsetDuration','_cursorArea','Scene_Map_initialize','createPartyCommandWindow','_battlerHue','createString','isChangingOpacity','isAtbChargingState','setBattler','makeAutoBattleActions','_visualHpGauge_JustDied','qUTYb','boxHeight','isDTB','NameFontSize','isCommandEnabled','VisuMZ_1_MainMenuCore','performAction','popBaseLine','qVwCN','TXNCg','processEscape','_emptyBitmap','_jumpMaxHeight','process_VisuMZ_BattleCore_PluginParams','isGuardWaiting','command301_PreBattleEvent','actionSplicePoint','actions','_stateIconSprite','_lines','TWYsg','onEscapeFailure','isPhysical','playEnemyAttack','softDamageCapRate','TcoxJ','mLunj','_weather','PrioritySortActive','VzcVs','Actor','cQehJ','bQIiS','ChangeOrderBy','createDistortionSprite','performFlinch','ActSeq_Element_AddElements','ActSeq_BattleLog_PopBaseLine','sQjsm','addedBuffs','kzuCA','isPreviousSceneBattleTransitionable','CalcActionSpeedJS','processBorderActor','PopupDuration','_pattern','Wave','OverallFormulaJS','version','stepBack','GSUbN','applySoftDamageCap','statusText','EiXji','autoBattleUseSkills','ShowAddedDebuff','_targetSkewY','LOtYH','floatBattler','faceWidth','getChildIndex','%1EndBattleJS','SvBattlerMass-%1-%2','Sprite_Actor_setActorHome','changeCtbChargeTime','isSceneChanging','ScaleX','makeTargetSprites','itemHeight','Window_BattleLog_performMiss','_targetGrowX','WaxIT','startEnemySelection','IYrxk','_commonEventQueue','Interrupt','_scene','displayMiss','_currentActor','BattleManager_startAction','_battleCoreBattleStartEvent','WFanL','RequiresDefeat','gFztm','SmoothImage','isQueueOptionsMenu','randomInt','moveToStartPositionBattleCore','PerformAction','OtXnq','call','performReflection','ActSeq_Skew_WaitForSkew','tone','repositionCancelButtonBorderStyle','ActSeq_Motion_RefreshMotion','FhOUj','isGuard','VisuMZ_3_ActSeqCamera','refresh','ActSeq_BattleLog_AddText','_animationContainer','isDebuffAffected','ActSeq_Zoom_Scale','guard','ShowPortraits','isMVAnimation','setHandler','BattleManager_startTurn','MANUAL','Scene_Battle_onEnemyCancel','RevertAngle','mtzKp','initMembersBattleCore','loadSystem','Targets','ForceRandom','PostStartTurnJS','cancel','hpAffected','showNormalAnimation','_multipliers','activate','UlszH','qRlUt','QcZTp','showPortraits','performWeaponAnimation','putActiveBattlerOnTop','blockWidth','xtQQU','CastPhysical','isAlive','front\x20base','jEzEM','_regionBattleback1','battleDisplayText','ycZWH','_battleField','battleOpacity','Sprite_Battler_updateMain','addActor','Game_Party_addActor','hasSvBattler','isSceneBattle','friendsUnit','Opacity','prepareBorderActor','extraPositionY','_enemyID','XPSpriteYLocation','useDigitGrouping','ActSeq_Movement_WaitForMovement','selectNextCommand','rQBTN','FJyhk','createInnerPortrait','drawItemImageXPStyle','createPartyCommandWindowBattleCore','isDeathStateAffected','loadSvEnemy','AutoBattleBgType','hdXPe','alive\x20enemies\x20not\x20user','Linear','moveBattlerToPoint','isCustomBattleScope','numTargets','createAnimationContainer','toUpperCase','STR','centerFrontViewSprite','battleStatusWindowAnimationContainer','_partyCommandWindow','itemRect','physical','Window_PartyCommand_initialize','skewBattler','PRE-','CmdIconItem','setup','_battleCoreNoElement','_baseY','setBackgroundType','Immortal','currentAction','refreshDimmerBitmap','autoMeleeSingleTargetActionSet','isNextSceneBattleTransitionable','updateEffectContainers','_jumpWholeDuration','gradientFillRect','casting','TP_Rate','maxBattleMembers','initVisibility','LjZaz','battleSys','canGuard','pwECy','findTargetSprite','callUpdateHelp','Window_BattleLog_refresh','Window_Options_statusText','Hjbqh','bossCollapse','iesvb','stepFlinch','startFloat','command301','createBattleFieldContainer','ActSeq_Impact_MotionBlurTarget','commandFight','BattleManager_onEscapeSuccess','%1Apply%2JS','weapons','onSkewEnd','Scene_Battle_partyCommandWindowRect','updateFlip','pEVJT','ActSeq_Mechanics_RemoveState','fillRect','pettA','ActSeq_Movement_FaceTarget','drawItem','Scene_Battle_updateStatusWindowPosition','startAttackWeaponAnimation','onEnemyCancel','_svBattlerData','JS\x20%1END\x20ACTION','gIbuM','lplZJ','_skewEasing','setBattleAngle','CRtWV','chantStyle','Name','AsEas','svBattlerData','mtstw','Sprite_Enemy_updateCollapse','float','PostDamageAsUserJS','join','actionBattleCoreJS','_flinched','min','_padding','isAnyoneChangingOpacity','EnableSoftCap','CkzaA','options','ActSeq_Camera_Clamp','hitFlat','extraPositionX','autoMeleeMultiTargetActionSet','AkwrR','growBattler','_reflectionTarget','createTargetsJS','drawItemStyleIcon','thrust','criticalDmgFlat','CriticalColor','user','NrtXc','Weapon-%1-%2','onDatabaseLoaded','_requestRefresh','qpNFh','AUTO\x20BATTLE','makeTargetsBattleCore','applyVariance','startActorSelection','setupWeaponAnimation','_armorPenetration','Xunrn','svShadow','helpWindowRect','createCancelButton','mainSpriteScaleY','regionId','Game_Troop_setup','_createDamageContainer','DugmT','getItemDamageAmountTextOriginal','ActSeq_Movement_WaitForJump','createBattleField','setHelpWindowItem','recoverAll','createShadowSprite','die','wYvGU','placeStateIcon','_actorSprites','targetActionSet','format','performMoveToTargets','ehxbT','plSAJ','ForceDeath','CriticalHitRate','okTargetSelectionVisibility','canAttackBattleCore','Window_BattleStatus_initialize'];(function(_0x51b946,_0x57497c){const _0x498b82=function(_0x539eb8){while(--_0x539eb8){_0x51b946['push'](_0x51b946['shift']());}};_0x498b82(++_0x57497c);}(_0x5749,0x1a9));const _0x498b=function(_0x51b946,_0x57497c){_0x51b946=_0x51b946-0x0;let _0x498b82=_0x5749[_0x51b946];return _0x498b82;};const _0x5f4923=_0x498b;var label='BattleCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5f4923('0x7bf')](function(_0x5dcacd){const _0x4c7ac7=_0x5f4923;return _0x5dcacd[_0x4c7ac7('0x48c')]&&_0x5dcacd['description'][_0x4c7ac7('0x147')]('['+label+']');})[0x0];VisuMZ[label][_0x5f4923('0x39b')]=VisuMZ[label][_0x5f4923('0x39b')]||{},VisuMZ['ConvertParams']=function(_0x358efb,_0x320618){const _0x398e8a=_0x5f4923;for(const _0x4f9257 in _0x320618){if(_0x4f9257[_0x398e8a('0x5ae')](/(.*):(.*)/i)){if(_0x398e8a('0x35')===_0x398e8a('0x35')){const _0x539907=String(RegExp['$1']),_0x4402df=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x83328,_0x530c44,_0x447b1d;switch(_0x4402df){case'NUM':_0x83328=_0x320618[_0x4f9257]!==''?Number(_0x320618[_0x4f9257]):0x0;break;case _0x398e8a('0x77e'):_0x530c44=_0x320618[_0x4f9257]!==''?JSON[_0x398e8a('0x1f1')](_0x320618[_0x4f9257]):[],_0x83328=_0x530c44['map'](_0x4e2c90=>Number(_0x4e2c90));break;case _0x398e8a('0x729'):_0x83328=_0x320618[_0x4f9257]!==''?eval(_0x320618[_0x4f9257]):null;break;case'ARRAYEVAL':_0x530c44=_0x320618[_0x4f9257]!==''?JSON[_0x398e8a('0x1f1')](_0x320618[_0x4f9257]):[],_0x83328=_0x530c44[_0x398e8a('0x17b')](_0x18d48b=>eval(_0x18d48b));break;case'JSON':_0x83328=_0x320618[_0x4f9257]!==''?JSON['parse'](_0x320618[_0x4f9257]):'';break;case _0x398e8a('0x94'):_0x530c44=_0x320618[_0x4f9257]!==''?JSON[_0x398e8a('0x1f1')](_0x320618[_0x4f9257]):[],_0x83328=_0x530c44[_0x398e8a('0x17b')](_0x2dd4e1=>JSON['parse'](_0x2dd4e1));break;case _0x398e8a('0x7c9'):_0x83328=_0x320618[_0x4f9257]!==''?new Function(JSON[_0x398e8a('0x1f1')](_0x320618[_0x4f9257])):new Function(_0x398e8a('0x716'));break;case _0x398e8a('0x192'):_0x530c44=_0x320618[_0x4f9257]!==''?JSON[_0x398e8a('0x1f1')](_0x320618[_0x4f9257]):[],_0x83328=_0x530c44[_0x398e8a('0x17b')](_0x4523be=>new Function(JSON['parse'](_0x4523be)));break;case _0x398e8a('0x668'):_0x83328=_0x320618[_0x4f9257]!==''?String(_0x320618[_0x4f9257]):'';break;case _0x398e8a('0x75e'):_0x530c44=_0x320618[_0x4f9257]!==''?JSON[_0x398e8a('0x1f1')](_0x320618[_0x4f9257]):[],_0x83328=_0x530c44[_0x398e8a('0x17b')](_0x36c098=>String(_0x36c098));break;case _0x398e8a('0x813'):_0x447b1d=_0x320618[_0x4f9257]!==''?JSON[_0x398e8a('0x1f1')](_0x320618[_0x4f9257]):{},_0x358efb[_0x539907]={},VisuMZ[_0x398e8a('0x3b4')](_0x358efb[_0x539907],_0x447b1d);continue;case _0x398e8a('0x3cc'):_0x530c44=_0x320618[_0x4f9257]!==''?JSON[_0x398e8a('0x1f1')](_0x320618[_0x4f9257]):[],_0x83328=_0x530c44['map'](_0x1bb137=>VisuMZ[_0x398e8a('0x3b4')]({},JSON[_0x398e8a('0x1f1')](_0x1bb137)));break;default:continue;}_0x358efb[_0x539907]=_0x83328;}else{function _0x2f21e4(){const _0x1189cc=_0x398e8a,_0x406a18=this['item']()[_0x1189cc('0x331')];if(_0x406a18[_0x1189cc('0x5ae')](/<ALWAYS HIT>/i))return 0x1;else{if(_0x406a18['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x7b0437(_0x3ecaec['$1'])/0x64;else{let _0x5857a0=_0x179fda[_0x1189cc('0x88d')][_0x1189cc('0x106')][_0x1189cc('0x618')](this,_0x28b4f1);return _0x5857a0=this[_0x1189cc('0x637')][_0x1189cc('0x35a')]*_0x5857a0+this[_0x1189cc('0x637')][_0x1189cc('0x6bb')],_0x5857a0;}}}}}}return _0x358efb;},(_0x395404=>{const _0xeab7b6=_0x5f4923,_0x542307=_0x395404[_0xeab7b6('0x28b')];for(const _0x3dd677 of dependencies){if(!Imported[_0x3dd677]){alert(_0xeab7b6('0x709')[_0xeab7b6('0x6e6')](_0x542307,_0x3dd677)),SceneManager[_0xeab7b6('0xdf')]();break;}}const _0x1fda07=_0x395404[_0xeab7b6('0x1eb')];if(_0x1fda07[_0xeab7b6('0x5ae')](/\[Version[ ](.*?)\]/i)){const _0x40d7f=Number(RegExp['$1']);_0x40d7f!==VisuMZ[label][_0xeab7b6('0x5ee')]&&(alert(_0xeab7b6('0xae')[_0xeab7b6('0x6e6')](_0x542307,_0x40d7f)),SceneManager[_0xeab7b6('0xdf')]());}if(_0x1fda07['match'](/\[Tier[ ](\d+)\]/i)){const _0x3ead32=Number(RegExp['$1']);if(_0x3ead32<tier){if('gncXj'===_0xeab7b6('0x174'))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xeab7b6('0x6e6')](_0x542307,_0x3ead32,tier)),SceneManager[_0xeab7b6('0xdf')]();else{function _0x27980d(){const _0x554ff9=_0xeab7b6,_0x10c8f0=_0x9d61b[_0x554ff9('0x14f')][_0x554ff9('0x63f')]()*0x2+0x4;let _0x14c074=_0x5b8ecf[_0x554ff9('0x49b')]-_0x10c8f0;_0x7c2a8b[_0x554ff9('0x4f6')]&&_0x356f30[_0x554ff9('0x45')]()&&(_0x14c074+=_0x10c8f0);const _0x482657=this['helpAreaBottom'](),_0x1b0b3c=_0x536f25['boxHeight']-_0x482657-this[_0x554ff9('0x121')]()[_0x554ff9('0x303')]+_0x283ee3[_0x554ff9('0x14f')][_0x554ff9('0x20a')](),_0x11da8d=0x0;return new _0x4ca305(_0x11da8d,_0x482657,_0x14c074,_0x1b0b3c);}}}else tier=Math[_0xeab7b6('0x489')](_0x3ead32,tier);}VisuMZ[_0xeab7b6('0x3b4')](VisuMZ[label][_0xeab7b6('0x39b')],_0x395404[_0xeab7b6('0x52c')]);})(pluginData),VisuMZ[_0x5f4923('0x2c')]=function(_0x3ea75f){const _0x2798f3=_0x5f4923;let _0x226fb9=[];for(const _0x3012ed of _0x3ea75f){if(_0x2798f3('0x1e0')!==_0x2798f3('0x1e0')){function _0x530bb3(){const _0x9a81b0=_0x2798f3;if(this[_0x9a81b0('0x1b8')]>0x0)this[_0x9a81b0('0x1b8')]-=0x10;}}else _0x226fb9=_0x226fb9[_0x2798f3('0x81e')](VisuMZ[_0x2798f3('0x505')](_0x3012ed));}return _0x226fb9[_0x2798f3('0x7bf')](_0x5b489c=>_0x5b489c);},VisuMZ['ConvertActionSequenceTarget']=function(_0x30080f){const _0x194628=_0x5f4923,_0x52b096=BattleManager[_0x194628('0x50d')](),_0x5317d0=BattleManager[_0x194628('0x362')],_0x3fe72a=BattleManager[_0x194628('0x2af')],_0x53a0cd=BattleManager['_allTargets']?BattleManager[_0x194628('0x57d')]['slice'](0x0):_0x52b096;_0x30080f=_0x30080f['toLowerCase']()[_0x194628('0x32d')]();if(_0x30080f===_0x194628('0x6c6')){if(_0x194628('0xf1')!=='DzTIp')return[_0x5317d0];else{function _0x173df3(){const _0x5cf9e5=_0x194628;this[_0x5cf9e5('0xb0')](_0x5cf9e5('0x7e3')),_0x2629d0[_0x5cf9e5('0xc5')][_0x5cf9e5('0x5c8')](),_0x40143e[_0x5cf9e5('0x88d')][_0x5cf9e5('0x693')][_0x5cf9e5('0x618')](this),this[_0x5cf9e5('0x4a1')](_0x5cf9e5('0x833'));}}}else{if(_0x30080f==='current\x20target'){if('idAdj'!==_0x194628('0x758'))return[_0x3fe72a];else{function _0x51955c(){return _0x954cc1;}}}else{if(_0x30080f===_0x194628('0x6fd')){if(_0x194628('0x6be')===_0x194628('0x260')){function _0x438813(){const _0x487484=_0x194628;if(this[_0x487484('0x814')]===_0xca0831&&!_0xfd7846[_0x487484('0x64d')]())return;}}else{if(_0x3fe72a){if('nnixO'!==_0x194628('0x786')){function _0x27701c(){const _0x1c367a=_0x194628;this[_0x1c367a('0x18')](_0x1c367a('0x626'));}}else{const _0x11954c=_0x53a0cd[_0x194628('0x421')](_0x3fe72a);return _0x11954c>=0x0?[_0x53a0cd[_0x11954c-0x1]||_0x3fe72a]:[_0x3fe72a];}}}}else{if(_0x30080f===_0x194628('0x32b')){if(_0x194628('0x7b9')!=='PlVIE'){function _0x2a0426(){const _0x1585f8=_0x194628;return this[_0x1585f8('0x1c3')]&&this['isActor']()?_0x3e0388[_0x1585f8('0x88d')][_0x1585f8('0x39b')][_0x1585f8('0x5dc')][_0x1585f8('0x291')]:_0x1aa2f3['BattleCore']['Settings'][_0x1585f8('0x510')][_0x1585f8('0x291')];}}else{if(_0x3fe72a){const _0x5ec489=_0x53a0cd['indexOf'](_0x3fe72a);return _0x5ec489>=0x0?[_0x53a0cd[_0x5ec489+0x1]||_0x3fe72a]:[_0x3fe72a];}}}else{if(_0x30080f==='all\x20targets')return _0x53a0cd;else{if(_0x30080f===_0x194628('0x755')){if('ZwYEj'==='ZwYEj')return[_0x5317d0][_0x194628('0x81e')](_0x53a0cd);else{function _0x3e6f0e(){const _0x33b81b=_0x194628;this[_0x33b81b('0x22b')]['splice'](_0x3c7dce,0x0,_0x10cdb4);}}}else{if(_0x30080f===_0x194628('0x787'))return _0x52b096[_0x194628('0x7bf')](_0x324bbb=>_0x324bbb!==_0x5317d0&&!_0x53a0cd[_0x194628('0x147')](_0x324bbb));}}}}}}if(_0x5317d0){if(_0x30080f==='alive\x20friends')return _0x5317d0[_0x194628('0x64f')]()[_0x194628('0x361')]();else{if(_0x30080f==='alive\x20friends\x20not\x20user'){if(_0x194628('0x1fe')!==_0x194628('0x1fe')){function _0x5566d8(){const _0x404674=_0x194628;this[_0x404674('0x6df')]();}}else return _0x5317d0[_0x194628('0x64f')]()[_0x194628('0x361')]()[_0x194628('0x7bf')](_0x955118=>_0x955118!==_0x5317d0);}else{if(_0x30080f===_0x194628('0x4b9')){if(_0x194628('0x44d')===_0x194628('0x2a0')){function _0x547de2(){const _0x4c2432=_0x194628;this[_0x4c2432('0x6ca')]=!![];}}else return _0x5317d0[_0x194628('0x64f')]()[_0x194628('0x361')]()[_0x194628('0x7bf')](_0x49a196=>_0x49a196!==_0x3fe72a);}else{if(_0x30080f==='dead\x20friends')return _0x5317d0[_0x194628('0x64f')]()[_0x194628('0x162')]();else{if(_0x30080f[_0x194628('0x5ae')](/FRIEND INDEX (\d+)/i)){if(_0x194628('0x770')!==_0x194628('0x348')){const _0x417123=Number(RegExp['$1']);return[_0x5317d0[_0x194628('0x64f')]()[_0x194628('0x3ce')]()[_0x417123]];}else{function _0x437db3(){const _0x132e3a=_0x194628;return this['isBattleCoreTargetScope']()&&!this[_0x132e3a('0x664')]()?this[_0x132e3a('0x423')]():_0x5c5db5[_0x132e3a('0x88d')]['Game_Action_isForRandom'][_0x132e3a('0x618')](this);}}}}}}}if(_0x30080f===_0x194628('0x883')){if(_0x194628('0x50')!==_0x194628('0x50')){function _0x36d4d1(){const _0x37d9ae=_0x194628;return _0x6677bc[_0x37d9ae('0x88d')][_0x37d9ae('0x39b')][_0x37d9ae('0x5dc')][_0x37d9ae('0x4d2')];}}else return _0x5317d0[_0x194628('0x71b')]()['aliveMembers']();}else{if(_0x30080f===_0x194628('0xac'))return _0x5317d0[_0x194628('0x71b')]()[_0x194628('0x361')]()[_0x194628('0x7bf')](_0x475678=>_0x475678!==_0x3fe72a);else{if(_0x30080f===_0x194628('0x241'))return _0x5317d0[_0x194628('0x71b')]()[_0x194628('0x162')]();else{if(_0x30080f[_0x194628('0x5ae')](/OPPONENT INDEX (\d+)/i)){const _0xa214b7=Number(RegExp['$1']);return[_0x5317d0[_0x194628('0x71b')]()[_0x194628('0x3ce')]()[_0xa214b7]];}}}}}if(_0x30080f==='alive\x20actors'){if(_0x194628('0x554')!==_0x194628('0x153'))return $gameParty['aliveMembers']();else{function _0x449d57(){const _0x30c5d7=_0x194628;if(_0x5b387a[_0x30c5d7('0x4b2')](_0xfec1d5))return!![];}}}else{if(_0x30080f===_0x194628('0x145'))return $gameParty[_0x194628('0x361')]()[_0x194628('0x7bf')](_0x32de7e=>_0x32de7e!==_0x5317d0);else{if(_0x30080f===_0x194628('0x581'))return $gameParty[_0x194628('0x361')]()['filter'](_0x5c07d1=>_0x5c07d1!==_0x3fe72a);else{if(_0x30080f===_0x194628('0x12a')){if(_0x194628('0x73a')!==_0x194628('0x73a')){function _0x59e94e(){const _0x49b096=_0x194628;this[_0x49b096('0x38')][_0x49b096('0x596')][_0x49b096('0x28a')]=this[_0x49b096('0x756')][_0x49b096('0x518')]();}}else return $gameParty[_0x194628('0x162')]();}else{if(_0x30080f[_0x194628('0x5ae')](/ACTOR INDEX (\d+)/i)){const _0x16c0ac=Number(RegExp['$1']);return[$gameParty[_0x194628('0x3ce')]()[_0x16c0ac]];}else{if(_0x30080f['match'](/ACTOR ID (\d+)/i)){if('CRtWV'!==_0x194628('0x6a8')){function _0x712c6(){const _0x12be5b=_0x194628;this['_growX']=(this['_growX']*(_0x363212-0x1)+this[_0x12be5b('0x604')])/_0x421886,this[_0x12be5b('0x167')]=(this[_0x12be5b('0x167')]*(_0x1169c9-0x1)+this[_0x12be5b('0x7f5')])/_0x791a3;}}else{const _0x47e05f=Number(RegExp['$1']);return[$gameActors[_0x194628('0x857')](_0x47e05f)];}}}}}}}if(_0x30080f===_0x194628('0x2c3')){if(_0x194628('0x1c5')===_0x194628('0x1c5'))return $gameTroop['aliveMembers']();else{function _0x40c7b4(){const _0x3321ea=_0x194628;_0x4e2f3b+=(_0x16f2c6[_0x3321ea('0x323')]()?-0x1:0x1)*_0x189460[_0x3321ea('0x290')]()/0x2;}}}else{if(_0x30080f===_0x194628('0x661'))return $gameTroop[_0x194628('0x361')]()[_0x194628('0x7bf')](_0x4da47c=>_0x4da47c!==_0x5317d0);else{if(_0x30080f===_0x194628('0x74a'))return $gameTroop[_0x194628('0x361')]()[_0x194628('0x7bf')](_0x292964=>_0x292964!==_0x3fe72a);else{if(_0x30080f===_0x194628('0x376'))return $gameTroop['deadMembers']();else{if(_0x30080f[_0x194628('0x5ae')](/ENEMY INDEX (\d+)/i)){const _0x5c9853=Number(RegExp['$1']);return[$gameTroop[_0x194628('0x3ce')]()[_0x5c9853]];}else{if(_0x30080f[_0x194628('0x5ae')](/ENEMY ID (\d+)/i)){const _0x4ac71e=Number(RegExp['$1']);return $gameTroop[_0x194628('0x361')]()[_0x194628('0x7bf')](_0x234b3e=>_0x234b3e['enemyId']()===_0x4ac71e);}}}}}}if(_0x30080f==='alive\x20battlers'){if(_0x194628('0x5be')===_0x194628('0x81')){function _0x497541(){const _0x5462f2=_0x194628;return _0x22f4ef[_0x5462f2('0x88d')][_0x5462f2('0x39b')][_0x5462f2('0x5dc')][_0x5462f2('0x612')];}}else return _0x52b096[_0x194628('0x7bf')](_0x149dfc=>_0x149dfc['isAlive']());}else{if(_0x30080f===_0x194628('0x15'))return _0x52b096[_0x194628('0x7bf')](_0x33ed0a=>_0x33ed0a[_0x194628('0x642')]()&&_0x33ed0a!==_0x5317d0);else{if(_0x30080f===_0x194628('0x578'))return _0x52b096[_0x194628('0x7bf')](_0x102cee=>_0x102cee['isAlive']()&&_0x102cee!==_0x3fe72a);else{if(_0x30080f===_0x194628('0x55e'))return _0x52b096[_0x194628('0x7bf')](_0x56609b=>_0x56609b[_0x194628('0x110')]());}}}return[];},PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x43b'),_0x162b2a=>{const _0x3637f8=_0x5f4923;if(!SceneManager[_0x3637f8('0x64e')]())return;VisuMZ[_0x3637f8('0x3b4')](_0x162b2a,_0x162b2a);const _0x167169=$gameTemp[_0x3637f8('0x7fd')](),_0x135245=BattleManager[_0x3637f8('0x50a')],_0xeb6773=BattleManager[_0x3637f8('0x362')],_0x4dd9ea=BattleManager[_0x3637f8('0x57d')]?BattleManager['_allTargets']['slice'](0x0):[],_0x45b972=BattleManager[_0x3637f8('0x70a')];if(!_0x167169||!_0x135245||!_0xeb6773)return;if(!_0x135245['item']())return;if(_0x162b2a[_0x3637f8('0x62')])_0x45b972[_0x3637f8('0x3e7')](_0xeb6773,_0x135245['item']());if(_0x162b2a['ApplyImmortal']){if('gNKbE'===_0x3637f8('0x7f4')){function _0x8e87c9(){this['drawTextEx'](_0x2db518,_0x335c7b['x'],_0x4dbb81['y'],_0x4e0fd5);}}else _0x45b972[_0x3637f8('0x2fc')](_0x3637f8('0x351'),_0xeb6773,_0x4dd9ea,!![]);}if(_0x162b2a[_0x3637f8('0x51d')])_0x45b972['push'](_0x3637f8('0x42e'),_0xeb6773,_0x135245);if(_0x162b2a[_0x3637f8('0x258')])_0x45b972[_0x3637f8('0x2fc')](_0x3637f8('0x477'));if(_0x162b2a['CastAnimation'])_0x45b972[_0x3637f8('0x2fc')](_0x3637f8('0x40d'),_0xeb6773,_0x135245);if(_0x162b2a[_0x3637f8('0x2')])_0x45b972[_0x3637f8('0x2fc')](_0x3637f8('0x7f9'));_0x167169['setWaitMode'](_0x3637f8('0x10f'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x18b'),_0x27df22=>{const _0x572109=_0x5f4923;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x27df22,_0x27df22);const _0x264f86=$gameTemp[_0x572109('0x7fd')](),_0x526f44=BattleManager['_action'],_0x456bbb=BattleManager[_0x572109('0x362')],_0x4d871c=BattleManager[_0x572109('0x57d')]?BattleManager[_0x572109('0x57d')][_0x572109('0x805')](0x0):[],_0x4884c2=BattleManager[_0x572109('0x70a')];if(!_0x264f86||!_0x526f44||!_0x456bbb)return;if(!_0x526f44['item']())return;if(_0x27df22[_0x572109('0x616')])_0x4884c2[_0x572109('0x2fc')](_0x572109('0x5c4'),_0x456bbb,_0x526f44);if(_0x27df22[_0x572109('0x447')]>0x0)_0x4884c2[_0x572109('0x2fc')](_0x572109('0x844'),_0x27df22['WaitCount']);if(_0x27df22[_0x572109('0x85b')])_0x4884c2[_0x572109('0x2fc')](_0x572109('0x157'),_0x456bbb,_0x4d871c,_0x526f44['item']()[_0x572109('0x722')]);if(_0x27df22[_0x572109('0x2')])_0x4884c2['push'](_0x572109('0x7f9'));for(const _0x2ea188 of _0x4d871c){if(!_0x2ea188)continue;if(_0x27df22[_0x572109('0x76d')])_0x4884c2[_0x572109('0x2fc')]('actionEffect',_0x456bbb,_0x2ea188);}if(_0x27df22[_0x572109('0x715')])_0x4884c2['push'](_0x572109('0x351'),_0x456bbb,_0x4d871c,![]);_0x264f86[_0x572109('0x28')](_0x572109('0x10f'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Set_TargetActionSet',_0x20452e=>{const _0x289792=_0x5f4923;if(!SceneManager[_0x289792('0x64e')]())return;VisuMZ[_0x289792('0x3b4')](_0x20452e,_0x20452e);const _0x43bc0c=$gameTemp[_0x289792('0x7fd')](),_0x53ffc9=BattleManager[_0x289792('0x50a')],_0xe34ed2=BattleManager['_subject'],_0x2bf5f5=BattleManager[_0x289792('0x57d')]?BattleManager[_0x289792('0x57d')]['slice'](0x0):[],_0x4a999a=BattleManager[_0x289792('0x70a')];if(!_0x43bc0c||!_0x53ffc9||!_0xe34ed2)return;if(!_0x53ffc9[_0x289792('0x555')]())return;for(const _0x321bfe of _0x2bf5f5){if(_0x289792('0x549')===_0x289792('0x571')){function _0x5c1913(){const _0x1c71a9=_0x289792;if(!this[_0x1c71a9('0x6ed')]())return![];return _0x3eb0ce[_0x1c71a9('0x88d')][_0x1c71a9('0x721')][_0x1c71a9('0x618')](this);}}else{if(!_0x321bfe)continue;if(_0x20452e[_0x289792('0x616')])_0x4a999a[_0x289792('0x2fc')](_0x289792('0x5c4'),_0xe34ed2,_0x53ffc9);if(_0x20452e['WaitCount1']>0x0)_0x4a999a['push'](_0x289792('0x844'),_0x20452e[_0x289792('0x2e')]);if(_0x20452e[_0x289792('0x85b')])_0x4a999a['push'](_0x289792('0x157'),_0xe34ed2,[_0x321bfe],_0x53ffc9['item']()[_0x289792('0x722')]);if(_0x20452e[_0x289792('0x80e')]>0x0)_0x4a999a[_0x289792('0x2fc')](_0x289792('0x844'),_0x20452e[_0x289792('0x80e')]);if(_0x20452e[_0x289792('0x76d')])_0x4a999a['push'](_0x289792('0x4ec'),_0xe34ed2,_0x321bfe);}}if(_0x20452e['ApplyImmortal'])_0x4a999a['push']('applyImmortal',_0xe34ed2,_0x2bf5f5,![]);_0x43bc0c[_0x289792('0x28')](_0x289792('0x10f'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x16c'),_0x1d5964=>{const _0x53902e=_0x5f4923;if(!SceneManager[_0x53902e('0x64e')]())return;VisuMZ[_0x53902e('0x3b4')](_0x1d5964,_0x1d5964);const _0x5d290d=$gameTemp['getLastPluginCommandInterpreter'](),_0x3416c4=BattleManager[_0x53902e('0x50a')],_0x282a93=BattleManager[_0x53902e('0x362')],_0x3dc992=BattleManager[_0x53902e('0x57d')]?BattleManager[_0x53902e('0x57d')]['slice'](0x0):[],_0x1ceddc=BattleManager[_0x53902e('0x70a')];if(!_0x5d290d||!_0x3416c4||!_0x282a93)return;if(!_0x3416c4['item']())return;if(_0x1d5964[_0x53902e('0x715')])_0x1ceddc['push']('applyImmortal',_0x282a93,_0x3dc992,![]);if(_0x1d5964['WaitForNewLine'])_0x1ceddc['push'](_0x53902e('0x1d9'));if(_0x1d5964[_0x53902e('0x5c')])_0x1ceddc[_0x53902e('0x2fc')](_0x53902e('0x764'));if(_0x1d5964[_0x53902e('0x701')])_0x1ceddc[_0x53902e('0x2fc')](_0x53902e('0x328'));if(_0x1d5964['ActionEnd'])_0x1ceddc['push'](_0x53902e('0x404'),_0x282a93);if(_0x1d5964['WaitForMovement'])_0x1ceddc[_0x53902e('0x2fc')]('waitForMovement');_0x5d290d[_0x53902e('0x28')](_0x53902e('0x10f'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x4f2'),_0x4efd75=>{const _0x27f098=_0x5f4923;if(!SceneManager[_0x27f098('0x64e')]())return;if(!Imported[_0x27f098('0x620')])return;VisuMZ[_0x27f098('0x3b4')](_0x4efd75,_0x4efd75);const _0x4b1210=$gameTemp['getLastPluginCommandInterpreter'](),_0x1cc3d0=_0x4efd75[_0x27f098('0x35c')];if(!_0x4b1210)return;$gameScreen['setBattleAngle'](_0x4efd75[_0x27f098('0x42a')],_0x4efd75[_0x27f098('0x79d')],_0x4efd75[_0x27f098('0x7d4')]);if(_0x1cc3d0)_0x4b1210[_0x27f098('0x28')]('battleAngle');}),PluginManager['registerCommand'](pluginData['name'],_0x5f4923('0x217'),_0x4b42aa=>{const _0x46e505=_0x5f4923;if(!SceneManager[_0x46e505('0x64e')]())return;if(!Imported[_0x46e505('0x620')])return;VisuMZ[_0x46e505('0x3b4')](_0x4b42aa,_0x4b42aa);const _0x342419=$gameTemp[_0x46e505('0x7fd')](),_0x91178e=_0x4b42aa[_0x46e505('0x35c')];if(!_0x342419)return;$gameScreen[_0x46e505('0x6a7')](0x0,_0x4b42aa[_0x46e505('0x79d')],_0x4b42aa[_0x46e505('0x7d4')]);if(_0x91178e)_0x342419[_0x46e505('0x28')]('battleAngle');}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x1ab'),_0x580e93=>{const _0x436626=_0x5f4923;if(!SceneManager[_0x436626('0x64e')]())return;if(!Imported[_0x436626('0x620')])return;const _0x8d8f57=$gameTemp[_0x436626('0x7fd')]();if(!_0x8d8f57)return;_0x8d8f57[_0x436626('0x28')](_0x436626('0x135'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x23a'),_0x4dbfdd=>{const _0x367a4f=_0x5f4923;if(!SceneManager[_0x367a4f('0x64e')]())return;VisuMZ[_0x367a4f('0x3b4')](_0x4dbfdd,_0x4dbfdd);const _0x5c4fbe=$gameTemp[_0x367a4f('0x7fd')](),_0x28fd43=BattleManager['_action'],_0x56d369=BattleManager[_0x367a4f('0x362')],_0x4f6ad5=VisuMZ[_0x367a4f('0x2c')](_0x4dbfdd[_0x367a4f('0x631')]),_0x48b43a=_0x4dbfdd[_0x367a4f('0x4b6')],_0x79fb8f=BattleManager[_0x367a4f('0x70a')];if(!_0x5c4fbe||!_0x28fd43||!_0x56d369)return;if(!_0x28fd43['item']())return;let _0xeea01d=_0x28fd43[_0x367a4f('0x555')]()['animationId'];if(_0xeea01d<0x0)_0xeea01d=_0x56d369['attackAnimationId1']();$gameTemp['requestAnimation'](_0x4f6ad5,_0xeea01d,_0x48b43a),_0x4dbfdd[_0x367a4f('0x2')]&&_0x5c4fbe[_0x367a4f('0x28')]('battleAnimation');}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Animation_AttackAnimation',_0x42ec9a=>{const _0x342128=_0x5f4923;if(!SceneManager[_0x342128('0x64e')]())return;VisuMZ[_0x342128('0x3b4')](_0x42ec9a,_0x42ec9a);const _0x1083ed=$gameTemp[_0x342128('0x7fd')](),_0x440eb8=BattleManager[_0x342128('0x362')],_0x180683=VisuMZ['CreateActionSequenceTargets'](_0x42ec9a[_0x342128('0x631')]),_0x515c2c=_0x42ec9a[_0x342128('0x4b6')],_0x4d25a8=BattleManager[_0x342128('0x70a')];if(!_0x1083ed||!_0x440eb8)return;const _0x2cd9af=_0x440eb8['attackAnimationId1']();$gameTemp[_0x342128('0x336')](_0x180683,_0x2cd9af,_0x515c2c);if(_0x42ec9a[_0x342128('0x2')]){if(_0x342128('0x5c6')===_0x342128('0x5c6'))_0x1083ed['setWaitMode'](_0x342128('0x47b'));else{function _0x1005b6(){const _0x50b392=_0x342128;_0x1171c4=_0x5ed798[_0x50b392('0x2bd')];}}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x552'),_0x2d155b=>{const _0x3d5018=_0x5f4923;if(!SceneManager[_0x3d5018('0x64e')]())return;VisuMZ['ConvertParams'](_0x2d155b,_0x2d155b);const _0x173790=$gameTemp['getLastPluginCommandInterpreter'](),_0x3c22ce=BattleManager[_0x3d5018('0x50a')],_0x5d7d55=_0x2d155b[_0x3d5018('0x4b6')],_0x2c6c7c=VisuMZ[_0x3d5018('0x2c')](_0x2d155b[_0x3d5018('0x631')]);if(!_0x173790||!_0x3c22ce)return;if(!_0x3c22ce[_0x3d5018('0x555')]())return;for(const _0x54e110 of _0x2c6c7c){if('Yjdyt'!=='hmekE'){if(!_0x54e110)continue;_0x54e110[_0x3d5018('0x40d')](_0x3c22ce,_0x5d7d55);}else{function _0x466b9f(){const _0x456042=_0x3d5018;this[_0x456042('0x594')]=_0x1b6d01,this[_0x456042('0x226')]=-0x1,this[_0x456042('0x5eb')]=0x0,this[_0x456042('0x7fa')](),this[_0x456042('0x2b0')]();}}}if(_0x2d155b[_0x3d5018('0x2')])_0x173790[_0x3d5018('0x28')](_0x3d5018('0x47b'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x85'),_0x24da02=>{const _0x4b4ffc=_0x5f4923;VisuMZ['ConvertParams'](_0x24da02,_0x24da02);const _0x5ddb1d=$gameTemp['getLastPluginCommandInterpreter'](),_0x2833b8=VisuMZ[_0x4b4ffc('0x2c')](_0x24da02[_0x4b4ffc('0x631')]),_0x29f7a6=_0x24da02['Filename'];if(!_0x29f7a6)return;for(const _0x11c61e of _0x2833b8){if(!_0x11c61e)continue;if(!_0x11c61e[_0x4b4ffc('0x1c3')]())continue;_0x11c61e[_0x4b4ffc('0x228')](_0x29f7a6);}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x445'),_0x36e52e=>{const _0x59f2a0=_0x5f4923;if(!SceneManager[_0x59f2a0('0x64e')]())return;VisuMZ[_0x59f2a0('0x3b4')](_0x36e52e,_0x36e52e);const _0x2bb2d5=$gameTemp['getLastPluginCommandInterpreter'](),_0xa66004=VisuMZ[_0x59f2a0('0x2c')](_0x36e52e[_0x59f2a0('0x631')]),_0x4c20c1=_0x36e52e[_0x59f2a0('0xf6')],_0x15284a=_0x36e52e['Mirror'];if(!_0x2bb2d5)return;$gameTemp[_0x59f2a0('0x336')](_0xa66004,_0x4c20c1,_0x15284a);if(_0x36e52e['WaitForAnimation'])_0x2bb2d5[_0x59f2a0('0x28')](_0x59f2a0('0x47b'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x7cf'),_0x51956e=>{const _0x5d7aee=_0x5f4923;if(!SceneManager[_0x5d7aee('0x64e')]())return;const _0x51ef65=$gameTemp[_0x5d7aee('0x7fd')]();if(!_0x51ef65)return;_0x51ef65[_0x5d7aee('0x28')]('battleAnimation');}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x622'),_0x4f2d58=>{const _0x18e0cb=_0x5f4923;if(!SceneManager[_0x18e0cb('0x64e')]())return;VisuMZ['ConvertParams'](_0x4f2d58,_0x4f2d58);const _0x2c3d22=BattleManager[_0x18e0cb('0x70a')];_0x2c3d22[_0x18e0cb('0x256')](_0x4f2d58[_0x18e0cb('0x314')]);}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_BattleLog_Clear',_0x57a691=>{const _0x15a7cb=_0x5f4923;if(!SceneManager[_0x15a7cb('0x64e')]())return;const _0x2e3def=BattleManager[_0x15a7cb('0x70a')];_0x2e3def[_0x15a7cb('0x328')]();}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x3d8'),_0x362a4d=>{const _0x2abc01=_0x5f4923;if(!SceneManager[_0x2abc01('0x64e')]())return;const _0x2b873d=$gameTemp[_0x2abc01('0x7fd')](),_0x2acbbf=BattleManager[_0x2abc01('0x50a')],_0x122579=BattleManager['_subject'],_0x589c88=BattleManager[_0x2abc01('0x70a')];if(!_0x2b873d||!_0x2acbbf||!_0x122579)return;if(!_0x2acbbf[_0x2abc01('0x555')]())return;_0x589c88[_0x2abc01('0x3e7')](_0x122579,_0x2acbbf[_0x2abc01('0x555')]()),_0x2b873d[_0x2abc01('0x28')](_0x2abc01('0x10f'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x5e3'),_0x39830a=>{const _0x2f9ca5=_0x5f4923;if(!SceneManager[_0x2f9ca5('0x64e')]())return;const _0x3cbb13=BattleManager[_0x2f9ca5('0x70a')];_0x3cbb13[_0x2f9ca5('0x5c5')]();}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_BattleLog_PushBaseLine',_0x45aaef=>{const _0x586a79=_0x5f4923;if(!SceneManager['isSceneBattle']())return;const _0x3beb78=BattleManager['_logWindow'];_0x3beb78[_0x586a79('0x1d2')]();}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x730'),_0x334222=>{const _0x550294=_0x5f4923;if(!SceneManager[_0x550294('0x64e')]())return;const _0x590958=BattleManager[_0x550294('0x70a')];_0x590958[_0x550294('0x621')]();}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x4e6'),_0x3f2be5=>{const _0x3ada30=_0x5f4923;if(!SceneManager[_0x3ada30('0x64e')]())return;VisuMZ[_0x3ada30('0x3b4')](_0x3f2be5,_0x3f2be5),SceneManager['_scene'][_0x3ada30('0x114')](_0x3f2be5['ShowHide']);}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x1cc'),_0x23067a=>{const _0x387d90=_0x5f4923;if(!SceneManager[_0x387d90('0x64e')]())return;const _0x143708=$gameTemp[_0x387d90('0x7fd')]();_0x143708['setWaitMode'](_0x387d90('0x10f'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x3ca'),_0x1eebd2=>{const _0xb53590=_0x5f4923;if(!SceneManager[_0xb53590('0x64e')]())return;const _0x60580e=$gameTemp[_0xb53590('0x7fd')](),_0x350796=BattleManager[_0xb53590('0x70a')];_0x350796[_0xb53590('0x1d9')](),_0x60580e['setWaitMode'](_0xb53590('0x10f'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x6ba'),_0x2628b9=>{const _0x151cee=_0x5f4923;if(!SceneManager[_0x151cee('0x64e')]())return;if(!Imported[_0x151cee('0x620')])return;VisuMZ[_0x151cee('0x3b4')](_0x2628b9,_0x2628b9);const _0x174480=$gameScreen[_0x151cee('0x4ff')]();_0x174480[_0x151cee('0x1fd')]=_0x2628b9[_0x151cee('0x2c1')];}),PluginManager['registerCommand'](pluginData['name'],_0x5f4923('0x7c'),_0x3c7812=>{const _0x2fa167=_0x5f4923;if(!SceneManager[_0x2fa167('0x64e')]())return;if(!Imported[_0x2fa167('0x620')])return;VisuMZ[_0x2fa167('0x3b4')](_0x3c7812,_0x3c7812);const _0x213ba8=$gameTemp[_0x2fa167('0x7fd')](),_0xf4aa7c=_0x3c7812[_0x2fa167('0x4c5')];$gameScreen[_0x2fa167('0x785')](_0x3c7812[_0x2fa167('0x305')],_0x3c7812[_0x2fa167('0x324')],_0x3c7812[_0x2fa167('0x79d')],_0x3c7812[_0x2fa167('0x7d4')]);if(_0xf4aa7c)_0x213ba8[_0x2fa167('0x28')]('battleCamera');}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Camera_FocusTarget',_0x49e761=>{const _0x1bb8d1=_0x5f4923;if(!SceneManager[_0x1bb8d1('0x64e')]())return;if(!Imported[_0x1bb8d1('0x620')])return;VisuMZ[_0x1bb8d1('0x3b4')](_0x49e761,_0x49e761);const _0x5386db=$gameTemp[_0x1bb8d1('0x7fd')](),_0x24518d=VisuMZ[_0x1bb8d1('0x2c')](_0x49e761['Targets']),_0x3b74a6=_0x49e761[_0x1bb8d1('0x4c5')];$gameScreen[_0x1bb8d1('0x55b')](_0x24518d,_0x49e761['Duration'],_0x49e761[_0x1bb8d1('0x7d4')]);if(_0x3b74a6)_0x5386db[_0x1bb8d1('0x28')](_0x1bb8d1('0x344'));}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Camera_Offset',_0x25a1ab=>{const _0x30ee74=_0x5f4923;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x30ee74('0x620')])return;VisuMZ['ConvertParams'](_0x25a1ab,_0x25a1ab);const _0x203b50=$gameTemp[_0x30ee74('0x7fd')](),_0x5efab9=_0x25a1ab['WaitForCamera'];$gameScreen['setBattleCameraOffset'](_0x25a1ab[_0x30ee74('0x250')],_0x25a1ab[_0x30ee74('0x33e')],_0x25a1ab['Duration'],_0x25a1ab[_0x30ee74('0x7d4')]);if(_0x5efab9)_0x203b50[_0x30ee74('0x28')](_0x30ee74('0x344'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x34c'),_0x5d554c=>{const _0x2988e2=_0x5f4923;if(!SceneManager[_0x2988e2('0x64e')]())return;if(!Imported[_0x2988e2('0x620')])return;VisuMZ[_0x2988e2('0x3b4')](_0x5d554c,_0x5d554c);const _0x2a3ccf=$gameTemp['getLastPluginCommandInterpreter'](),_0x45ff73=_0x5d554c[_0x2988e2('0x72e')],_0x140261=_0x5d554c[_0x2988e2('0x49c')],_0x49d50e=_0x5d554c['WaitForCamera'];if(_0x45ff73){const _0x46d933=Math[_0x2988e2('0x774')](Graphics[_0x2988e2('0x77b')]/0x2),_0x228b32=Math[_0x2988e2('0x774')](Graphics[_0x2988e2('0x303')]/0x2);$gameScreen[_0x2988e2('0x785')](_0x46d933,_0x228b32,_0x5d554c[_0x2988e2('0x79d')],_0x5d554c[_0x2988e2('0x7d4')]);}_0x140261&&$gameScreen[_0x2988e2('0x719')](0x0,0x0,_0x5d554c[_0x2988e2('0x79d')],_0x5d554c[_0x2988e2('0x7d4')]);if(_0x49d50e)_0x2a3ccf['setWaitMode'](_0x2988e2('0x344'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Camera_WaitForCamera',_0x4031ca=>{const _0x340ea2=_0x5f4923;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x169b1b=$gameTemp[_0x340ea2('0x7fd')]();if(!_0x169b1b)return;_0x169b1b[_0x340ea2('0x28')](_0x340ea2('0x344'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x354'),_0x576685=>{const _0x1ed2cb=_0x5f4923;if(!SceneManager[_0x1ed2cb('0x64e')]())return;if(!Imported[_0x1ed2cb('0x42d')])return;VisuMZ[_0x1ed2cb('0x3b4')](_0x576685,_0x576685);const _0x5e9772=VisuMZ['CreateActionSequenceTargets'](_0x576685[_0x1ed2cb('0x631')]),_0x4140e5=_0x576685[_0x1ed2cb('0x492')]['toLowerCase']()[_0x1ed2cb('0x32d')]();for(const _0x500a4b of _0x5e9772){if(!_0x500a4b)continue;_0x500a4b[_0x1ed2cb('0x237')](_0x4140e5);}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x28d'),_0xee12ba=>{const _0x456e53=_0x5f4923;if(!SceneManager[_0x456e53('0x64e')]())return;if(!Imported[_0x456e53('0x42d')])return;VisuMZ[_0x456e53('0x3b4')](_0xee12ba,_0xee12ba);const _0x3cbf86=VisuMZ['CreateActionSequenceTargets'](_0xee12ba[_0x456e53('0x631')]),_0x222114=_0xee12ba['TimeScale'];for(const _0x56d9c4 of _0x3cbf86){if(_0x456e53('0x46f')!==_0x456e53('0x46f')){function _0x1e080e(){const _0x1a010f=_0x456e53;this[_0x1a010f('0x1d0')]()?this[_0x1a010f('0x1cf')]():_0x3f06b2['BattleCore'][_0x1a010f('0x46a')][_0x1a010f('0x618')](this);}}else{if(!_0x56d9c4)continue;_0x56d9c4[_0x456e53('0x213')]()['timeScale']=_0x222114;}}}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x5e2'),_0x317263=>{const _0x5bcb59=_0x5f4923;if(!SceneManager[_0x5bcb59('0x64e')]())return;if(!Imported[_0x5bcb59('0x7ef')])return;VisuMZ[_0x5bcb59('0x3b4')](_0x317263,_0x317263);const _0x43f49e=BattleManager[_0x5bcb59('0x50a')],_0x5b3f90=_0x317263[_0x5bcb59('0x1a8')];if(!_0x43f49e)return;_0x43f49e['_battleCoreAddedElements']=_0x5b3f90;}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x19b'),_0x458946=>{const _0xf78caf=_0x5f4923;if(!SceneManager[_0xf78caf('0x64e')]())return;if(!Imported[_0xf78caf('0x7ef')])return;const _0x158061=BattleManager['_action'];if(!_0x158061)return;_0x158061['clearElementChanges']();}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x3e9'),_0x3b90f0=>{const _0x579f21=_0x5f4923;if(!SceneManager[_0x579f21('0x64e')]())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;VisuMZ[_0x579f21('0x3b4')](_0x3b90f0,_0x3b90f0);const _0x888c02=BattleManager[_0x579f21('0x50a')],_0x102565=_0x3b90f0[_0x579f21('0x1a8')];if(!_0x888c02)return;_0x888c02['_battleCoreForcedElements']=_0x102565;}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x353'),_0x4385ff=>{const _0x133911=_0x5f4923;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x133911('0x7ef')])return;const _0x478f78=BattleManager[_0x133911('0x50a')];if(!_0x478f78)return;_0x478f78[_0x133911('0x673')]=!![];}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Impact_ColorBreak',_0x29f03d=>{const _0x1dafe8=_0x5f4923;if(!SceneManager[_0x1dafe8('0x64e')]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x196b1f=SceneManager[_0x1dafe8('0x60a')][_0x1dafe8('0xc5')];if(!_0x196b1f)return;VisuMZ['ConvertParams'](_0x29f03d,_0x29f03d);const _0x38139c=_0x29f03d[_0x1dafe8('0x111')]||0x1,_0x1fa743=_0x29f03d[_0x1dafe8('0x79d')]||0x1,_0x346069=_0x29f03d['EasingType']||_0x1dafe8('0x662');_0x196b1f[_0x1dafe8('0x3a0')](_0x38139c,_0x1fa743,_0x346069);}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x45c'),_0x397ff6=>{const _0x2ac575=_0x5f4923;if(!SceneManager[_0x2ac575('0x64e')]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x2722e5=SceneManager[_0x2ac575('0x60a')][_0x2ac575('0xc5')];if(!_0x2722e5)return;VisuMZ[_0x2ac575('0x3b4')](_0x397ff6,_0x397ff6);const _0x391543=Number(_0x397ff6['Angle'])||0x0,_0x4de0a2=Number(_0x397ff6[_0x2ac575('0xfe')]),_0x5d3f98=_0x397ff6['Duration']||0x1,_0x3e4929=_0x397ff6[_0x2ac575('0x7d4')]||_0x2ac575('0x662');_0x2722e5['setupMotionBlurImpactFilter'](_0x391543,_0x4de0a2,_0x5d3f98,_0x3e4929);}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x691'),_0x534f43=>{const _0x229740=_0x5f4923;if(!SceneManager[_0x229740('0x64e')]())return;if(!Imported[_0x229740('0x220')])return;const _0x4b2f1e=SceneManager[_0x229740('0x60a')][_0x229740('0xc5')];if(!_0x4b2f1e)return;VisuMZ[_0x229740('0x3b4')](_0x534f43,_0x534f43);const _0x516daf=Number(_0x534f43[_0x229740('0x42a')])||0x0,_0x47861c=Number(_0x534f43['Rate']),_0x5acb94=_0x534f43[_0x229740('0x79d')]||0x1,_0x32e9ef=_0x534f43['EasingType']||_0x229740('0x662'),_0x156ca1=VisuMZ[_0x229740('0x2c')](_0x534f43['Targets']);for(const _0x58f9e9 of _0x156ca1){if(!_0x58f9e9)continue;if(!_0x58f9e9[_0x229740('0x17f')]())continue;_0x58f9e9[_0x229740('0x17f')]()[_0x229740('0x7d1')](_0x516daf,_0x47861c,_0x5acb94,_0x32e9ef);}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Impact_MotionTrailCreate',_0x641da0=>{const _0xeb4157=_0x5f4923;if(!SceneManager[_0xeb4157('0x64e')]())return;if(!Imported[_0xeb4157('0x220')])return;VisuMZ['ConvertParams'](_0x641da0,_0x641da0);const _0xf39516={'delay':_0x641da0[_0xeb4157('0x78')],'duration':_0x641da0['duration'],'hue':_0x641da0[_0xeb4157('0x5a8')],'opacityStart':_0x641da0[_0xeb4157('0x866')],'tone':_0x641da0[_0xeb4157('0x61b')],'visible':!![]},_0x1456b5=VisuMZ[_0xeb4157('0x2c')](_0x641da0[_0xeb4157('0x631')]);for(const _0x312696 of _0x1456b5){if('voYrz'!==_0xeb4157('0xb6')){function _0x290146(){const _0x21a888=_0xeb4157;return _0x240ee2[_0x21a888('0x88d')][_0x21a888('0x39b')][_0x21a888('0xc4')]['CmdStyle'];}}else{if(!_0x312696)continue;_0x312696[_0xeb4157('0x329')](_0xf39516);}}}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x7dc'),_0x2aea79=>{const _0x349394=_0x5f4923;if(!SceneManager[_0x349394('0x64e')]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;VisuMZ[_0x349394('0x3b4')](_0x2aea79,_0x2aea79);const _0x1aa2ef=VisuMZ[_0x349394('0x2c')](_0x2aea79[_0x349394('0x631')]);for(const _0x35585d of _0x1aa2ef){if(!_0x35585d)continue;_0x35585d[_0x349394('0x172')]();}}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x85c'),_0x3de430=>{const _0x228f2e=_0x5f4923;if(!Imported[_0x228f2e('0x220')])return;const _0x3f46df=SceneManager[_0x228f2e('0x60a')][_0x228f2e('0xc5')];if(!_0x3f46df)return;VisuMZ[_0x228f2e('0x3b4')](_0x3de430,_0x3de430);const _0x286999=_0x3de430['X']||0x0,_0x143fdd=_0x3de430['Y']||0x0,_0x20cdf4=_0x3de430[_0x228f2e('0x56e')]||0x0,_0x96e945=_0x3de430[_0x228f2e('0x5ec')]||0x0,_0x2b30a0=_0x3de430[_0x228f2e('0x79d')]||0x1;_0x3f46df[_0x228f2e('0x202')](_0x286999,_0x143fdd,_0x20cdf4,_0x96e945,_0x2b30a0);}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x7fc'),_0x5345c0=>{const _0x31e79c=_0x5f4923;if(!SceneManager[_0x31e79c('0x64e')]())return;if(!Imported[_0x31e79c('0x220')])return;const _0x2bd188=SceneManager[_0x31e79c('0x60a')][_0x31e79c('0xc5')];if(!_0x2bd188)return;VisuMZ['ConvertParams'](_0x5345c0,_0x5345c0);const _0x29b5e0=VisuMZ['CreateActionSequenceTargets'](_0x5345c0[_0x31e79c('0x631')]),_0x26306c=_0x5345c0[_0x31e79c('0x294')],_0x181cb7=_0x5345c0[_0x31e79c('0x56e')]||0x0,_0x55fdfc=_0x5345c0[_0x31e79c('0x5ec')]||0x0,_0x1832c6=_0x5345c0[_0x31e79c('0x79d')]||0x1;for(const _0x488322 of _0x29b5e0){if(!_0x488322)continue;if(!_0x488322[_0x31e79c('0x17f')]())continue;const _0x52ca4c=_0x488322[_0x31e79c('0x17f')]();let _0x1c8450=_0x52ca4c[_0x31e79c('0x280')],_0x315431=_0x52ca4c[_0x31e79c('0x674')];_0x1c8450+=(Graphics[_0x31e79c('0x77b')]-Graphics['boxWidth'])/0x2,_0x315431+=(Graphics[_0x31e79c('0x303')]-Graphics[_0x31e79c('0x5bf')])/0x2;if(_0x26306c[_0x31e79c('0x5ae')](/front/i))_0x1c8450+=(_0x488322[_0x31e79c('0x323')]()?0x1:-0x1)*_0x52ca4c[_0x31e79c('0x290')]()/0x2;else _0x26306c[_0x31e79c('0x5ae')](/back/i)&&(_0x1c8450+=(_0x488322[_0x31e79c('0x323')]()?-0x1:0x1)*_0x52ca4c['mainSpriteWidth']()/0x2);if(_0x26306c[_0x31e79c('0x5ae')](/head/i))_0x315431-=_0x52ca4c[_0x31e79c('0x831')]();else _0x26306c[_0x31e79c('0x5ae')](/center/i)&&(_0x315431-=_0x52ca4c['mainSpriteHeight']()/0x2);_0x2bd188[_0x31e79c('0x202')](_0x1c8450,_0x315431,_0x181cb7,_0x55fdfc,_0x1832c6);}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Impact_ShockwaveCenterTargets',_0x8d3ed8=>{const _0x1574ff=_0x5f4923;if(!SceneManager[_0x1574ff('0x64e')]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x210fed=SceneManager['_scene']['_spriteset'];if(!_0x210fed)return;VisuMZ[_0x1574ff('0x3b4')](_0x8d3ed8,_0x8d3ed8);const _0x2c39a3=VisuMZ[_0x1574ff('0x2c')](_0x8d3ed8[_0x1574ff('0x631')]),_0x2592a9=_0x8d3ed8[_0x1574ff('0x294')],_0x4c9ef1=_0x8d3ed8[_0x1574ff('0x56e')]||0x0,_0x5bc157=_0x8d3ed8[_0x1574ff('0x5ec')]||0x0,_0x136ed2=_0x8d3ed8[_0x1574ff('0x79d')]||0x1,_0x27affa=Math[_0x1574ff('0x6b4')](..._0x2c39a3['map'](_0x1d458e=>_0x1d458e[_0x1574ff('0x17f')]()[_0x1574ff('0x280')]-_0x1d458e[_0x1574ff('0x17f')]()['mainSpriteWidth']()/0x2)),_0x1deb28=Math[_0x1574ff('0x489')](..._0x2c39a3[_0x1574ff('0x17b')](_0x25b366=>_0x25b366['battler']()[_0x1574ff('0x280')]+_0x25b366[_0x1574ff('0x17f')]()[_0x1574ff('0x290')]()/0x2)),_0x1ce590=Math['min'](..._0x2c39a3[_0x1574ff('0x17b')](_0x406800=>_0x406800[_0x1574ff('0x17f')]()[_0x1574ff('0x674')]-_0x406800[_0x1574ff('0x17f')]()[_0x1574ff('0x831')]())),_0x237a0f=Math['max'](..._0x2c39a3[_0x1574ff('0x17b')](_0x4828cd=>_0x4828cd['battler']()[_0x1574ff('0x674')])),_0xb106cb=_0x2c39a3[_0x1574ff('0x7bf')](_0x5f1b84=>_0x5f1b84[_0x1574ff('0x1c3')]())[_0x1574ff('0x568')],_0x1a638f=_0x2c39a3[_0x1574ff('0x7bf')](_0x2d9717=>_0x2d9717['isEnemy']())[_0x1574ff('0x568')];let _0x47d339=0x0,_0x25171c=0x0;if(_0x2592a9[_0x1574ff('0x5ae')](/front/i))_0x47d339=_0xb106cb>=_0x1a638f?_0x27affa:_0x1deb28;else{if(_0x2592a9[_0x1574ff('0x5ae')](/middle/i))_0x47d339=(_0x27affa+_0x1deb28)/0x2,melee=-0x1;else{if(_0x2592a9[_0x1574ff('0x5ae')](/back/i)){if('TQFgU'===_0x1574ff('0x49e')){function _0x172ae0(){const _0x24a0de=_0x1574ff;return this[_0x24a0de('0x851')]()[_0x24a0de('0x38d')](_0x4275d7=>_0x4275d7[_0x24a0de('0x789')]());}}else _0x47d339=_0xb106cb>=_0x1a638f?_0x1deb28:_0x27affa;}}}if(_0x2592a9[_0x1574ff('0x5ae')](/head/i))_0x25171c=_0x1ce590;else{if(_0x2592a9['match'](/center/i))_0x25171c=(_0x1ce590+_0x237a0f)/0x2;else{if(_0x2592a9['match'](/base/i)){if('eaeYT'!==_0x1574ff('0x309')){function _0x24a0ae(){const _0x11eb96=_0x1574ff,_0x1904b3=_0x56d2b9[_0x11eb96('0x224')]();_0x1904b3['setSkill'](this[_0x11eb96('0x383')][_0x11eb96('0x842')]()),this[_0x11eb96('0x2a3')]();}}else _0x25171c=_0x237a0f;}}}_0x47d339+=(Graphics[_0x1574ff('0x77b')]-Graphics[_0x1574ff('0x49b')])/0x2,_0x25171c+=(Graphics[_0x1574ff('0x303')]-Graphics['boxHeight'])/0x2,_0x210fed[_0x1574ff('0x202')](_0x47d339,_0x25171c,_0x4c9ef1,_0x5bc157,_0x136ed2);}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x4e8'),_0xbfce8b=>{const _0x4f83ff=_0x5f4923;if(!Imported[_0x4f83ff('0x220')])return;const _0x2ed93a=SceneManager[_0x4f83ff('0x60a')][_0x4f83ff('0xc5')];if(!_0x2ed93a)return;VisuMZ[_0x4f83ff('0x3b4')](_0xbfce8b,_0xbfce8b);const _0x2a4d32=_0xbfce8b['X']||0x0,_0x2c10b9=_0xbfce8b['Y']||0x0,_0x3718d4=_0xbfce8b[_0x4f83ff('0x68')]||0x0,_0x50061a=_0xbfce8b[_0x4f83ff('0x1e5')]||0x0,_0x34f717=_0xbfce8b[_0x4f83ff('0x79d')]||0x1,_0x1f3c6a=_0xbfce8b[_0x4f83ff('0x7d4')]||_0x4f83ff('0x662');_0x2ed93a[_0x4f83ff('0x811')](_0x3718d4,_0x2a4d32,_0x2c10b9,_0x50061a,_0x34f717,_0x1f3c6a);}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x751'),_0x5f307d=>{const _0x1848a4=_0x5f4923;if(!Imported[_0x1848a4('0x220')])return;const _0x29b297=SceneManager['_scene'][_0x1848a4('0xc5')];if(!_0x29b297)return;VisuMZ[_0x1848a4('0x3b4')](_0x5f307d,_0x5f307d);const _0x4d33c8=VisuMZ[_0x1848a4('0x2c')](_0x5f307d[_0x1848a4('0x631')]),_0xb4eb77=_0x5f307d[_0x1848a4('0x294')],_0x1166e3=_0x5f307d[_0x1848a4('0x68')]||0x0,_0x50d13c=_0x5f307d[_0x1848a4('0x1e5')]||0x0,_0xb5cf5b=_0x5f307d['Duration']||0x1,_0x1271f8=_0x5f307d['EasingType']||'Linear',_0x902540=Math[_0x1848a4('0x6b4')](..._0x4d33c8['map'](_0x249ba0=>_0x249ba0['battler']()[_0x1848a4('0x280')]-_0x249ba0[_0x1848a4('0x17f')]()['mainSpriteWidth']()/0x2)),_0x1b9a51=Math[_0x1848a4('0x489')](..._0x4d33c8['map'](_0x379408=>_0x379408['battler']()['_baseX']+_0x379408[_0x1848a4('0x17f')]()[_0x1848a4('0x290')]()/0x2)),_0x2bce5d=Math[_0x1848a4('0x6b4')](..._0x4d33c8[_0x1848a4('0x17b')](_0x4219b4=>_0x4219b4[_0x1848a4('0x17f')]()[_0x1848a4('0x674')]-_0x4219b4['battler']()[_0x1848a4('0x831')]())),_0x4b8a87=Math[_0x1848a4('0x489')](..._0x4d33c8['map'](_0x39526c=>_0x39526c['battler']()[_0x1848a4('0x674')])),_0x43285b=_0x4d33c8['filter'](_0x37d2e1=>_0x37d2e1['isActor']())['length'],_0x3ca960=_0x4d33c8[_0x1848a4('0x7bf')](_0x240177=>_0x240177[_0x1848a4('0x323')]())[_0x1848a4('0x568')];let _0x385a18=0x0,_0xde46de=0x0;if(_0xb4eb77[_0x1848a4('0x5ae')](/front/i)){if(_0x1848a4('0x68a')!=='Hjbqh'){function _0x11117c(){const _0x2352da=_0x1848a4,_0x25f102=_0x184495(_0x3a5b70['$1'])[_0x2352da('0x203')](/[\r\n]+/)[_0x2352da('0x835')](''),_0x2a5eb8=_0x527218[_0x2352da('0x74b')](_0x25f102);_0x2022b5['wtypeId']=_0x28ea2c[_0x2352da('0x171')](_0x2a5eb8);}}else _0x385a18=_0x43285b>=_0x3ca960?_0x902540:_0x1b9a51;}else{if(_0xb4eb77[_0x1848a4('0x5ae')](/middle/i))_0x385a18=(_0x902540+_0x1b9a51)/0x2,melee=-0x1;else{if(_0xb4eb77['match'](/back/i)){if(_0x1848a4('0x15b')===_0x1848a4('0x15b'))_0x385a18=_0x43285b>=_0x3ca960?_0x1b9a51:_0x902540;else{function _0x65bf05(){const _0x459b36=_0x1848a4;return _0x162283[_0x459b36('0x462')][0x0];}}}}}if(_0xb4eb77[_0x1848a4('0x5ae')](/head/i)){if('snRmf'===_0x1848a4('0x7f2')){function _0xd9ecb1(){const _0x524173=_0x1848a4;if(!_0x535fa4[_0x524173('0x773')]())return;const _0x5b1a59=this['battler']();if(!_0x5b1a59)return;_0x5b1a59[_0x524173('0x5a2')](_0x5b2c09,_0x4d1993,_0x4de1af,_0x35fa02);}}else _0xde46de=_0x2bce5d;}else{if(_0xb4eb77[_0x1848a4('0x5ae')](/center/i))_0xde46de=(_0x2bce5d+_0x4b8a87)/0x2;else{if(_0xb4eb77[_0x1848a4('0x5ae')](/base/i)){if(_0x1848a4('0x1a9')===_0x1848a4('0x56')){function _0x51a812(){const _0x43586c=_0x1848a4,_0xafe5f6=_0xb3921c[_0x43586c('0x555')]();this[_0x43586c('0x3e7')](_0x5e3ad3,_0xafe5f6),this['push'](_0x43586c('0x351'),_0x13f66c,_0x50726d,!![]),this[_0x43586c('0x2fc')](_0x43586c('0x42e'),_0x38e0b9,_0x2ae8dc),this[_0x43586c('0x2fc')](_0x43586c('0x477')),this[_0x43586c('0x2fc')](_0x43586c('0x40d'),_0x5dd9e5,_0xf64c4e),this['push'](_0x43586c('0x7f9'));}}else _0xde46de=_0x4b8a87;}}}_0x385a18+=(Graphics[_0x1848a4('0x77b')]-Graphics[_0x1848a4('0x49b')])/0x2,_0xde46de+=(Graphics[_0x1848a4('0x303')]-Graphics[_0x1848a4('0x5bf')])/0x2,_0x29b297[_0x1848a4('0x811')](_0x1166e3,_0x385a18,_0xde46de,_0x50d13c,_0xb5cf5b,_0x1271f8);}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x14e'),_0x2a4cb5=>{const _0x3948c2=_0x5f4923;if(!SceneManager[_0x3948c2('0x64e')]())return;VisuMZ['ConvertParams'](_0x2a4cb5,_0x2a4cb5);const _0x5f48b3=$gameTemp[_0x3948c2('0x7fd')](),_0x5b7c66=BattleManager[_0x3948c2('0x50a')],_0x51aabc=BattleManager['_subject'],_0x3a3a4a=BattleManager[_0x3948c2('0x70a')];if(!_0x5f48b3||!_0x5b7c66||!_0x51aabc)return;if(!_0x5b7c66['item']())return;const _0x128c7a=VisuMZ[_0x3948c2('0x2c')](_0x2a4cb5[_0x3948c2('0x631')]);for(const _0x1dcd52 of _0x128c7a){if(!_0x1dcd52)continue;_0x3a3a4a[_0x3948c2('0x2fc')]('actionEffect',_0x51aabc,_0x1dcd52);}_0x5f48b3[_0x3948c2('0x28')](_0x3948c2('0x10f'));}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x7e5'),_0x4a3abe=>{const _0x28e08e=_0x5f4923;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x28e08e('0x3b4')](_0x4a3abe,_0x4a3abe);const _0x33433=['MAXHP',_0x28e08e('0x1f2'),_0x28e08e('0x2bb'),_0x28e08e('0x4dc'),_0x28e08e('0x2f5'),_0x28e08e('0x156'),'AGI',_0x28e08e('0x321')],_0x4d266e=_0x4a3abe[_0x28e08e('0x146')],_0x457715=_0x4a3abe[_0x28e08e('0x4c')],_0x4522d8=_0x4a3abe[_0x28e08e('0x242')],_0x273098=VisuMZ[_0x28e08e('0x2c')](_0x4a3abe[_0x28e08e('0x631')]);for(const _0x2c6ffa of _0x273098){if(!_0x2c6ffa)continue;for(const _0x2bce7b of _0x4d266e){const _0x9fd2c2=_0x33433[_0x28e08e('0x421')](_0x2bce7b[_0x28e08e('0x667')]()[_0x28e08e('0x32d')]());_0x9fd2c2>=0x0&&_0x9fd2c2<=0x7&&_0x2c6ffa[_0x28e08e('0x4f7')](_0x9fd2c2,_0x4522d8);}for(const _0x8a10dc of _0x457715){const _0x4f655e=_0x33433[_0x28e08e('0x421')](_0x8a10dc[_0x28e08e('0x667')]()[_0x28e08e('0x32d')]());if(_0x4f655e>=0x0&&_0x4f655e<=0x7){if('RWCSN'==='RWCSN')_0x2c6ffa['addDebuff'](_0x4f655e,_0x4522d8);else{function _0x9ece39(){const _0x51ecb7=_0x28e08e;return _0x95d94d[_0x51ecb7('0x331')][_0x51ecb7('0x5ae')](/<COMMAND TEXT: (.*)>/i)?_0x115ed4(_0x4d340a['$1']):_0x4c9124[_0x51ecb7('0x28b')];}}}}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0xda'),_0x2e8f34=>{const _0x24f361=_0x5f4923;if(!SceneManager[_0x24f361('0x64e')]())return;VisuMZ[_0x24f361('0x3b4')](_0x2e8f34,_0x2e8f34);const _0xcefc31=_0x2e8f34[_0x24f361('0x7d3')],_0x4314dc=VisuMZ[_0x24f361('0x2c')](_0x2e8f34[_0x24f361('0x631')]);for(const _0x59ef96 of _0x4314dc){if(_0x24f361('0xa4')===_0x24f361('0x57a')){function _0x2df8c1(){const _0x323801=_0x24f361;let _0x53b273=_0x3f32f2(_0x41d316['$1']);while(_0x53b273--){_0x4641b1[_0x323801('0x2fc')](this['opponentsUnit']()['trueRandomTarget']());}return this[_0x323801('0x2e2')](_0x2de7bf);}}else{if(!_0x59ef96)continue;for(const _0x1e65b6 of _0xcefc31){_0x59ef96[_0x24f361('0x762')](_0x1e65b6);}}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Mechanics_ArmorPenetration',_0x4cd138=>{const _0x452ec8=_0x5f4923;if(!SceneManager[_0x452ec8('0x64e')]())return;VisuMZ['ConvertParams'](_0x4cd138,_0x4cd138);const _0x1a29fe=BattleManager[_0x452ec8('0x50a')],_0x1497fe={'arPenRate':_0x4cd138[_0x452ec8('0x1b2')],'arPenFlat':_0x4cd138[_0x452ec8('0x173')],'arRedRate':_0x4cd138[_0x452ec8('0x702')],'arRedFlat':_0x4cd138[_0x452ec8('0x4b')]};_0x1a29fe[_0x452ec8('0x6d1')]=_0x1497fe;}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x248'),_0x5ef021=>{const _0x1aec97=_0x5f4923;if(!SceneManager[_0x1aec97('0x64e')]())return;if(!Imported['VisuMZ_2_BattleSystemATB'])return;VisuMZ[_0x1aec97('0x3b4')](_0x5ef021,_0x5ef021);const _0x1fa3d8=VisuMZ['CreateActionSequenceTargets'](_0x5ef021[_0x1aec97('0x631')]),_0x1498c9=_0x5ef021[_0x1aec97('0x35b')],_0x4764f7=_0x5ef021[_0x1aec97('0x35b')],_0x388916=_0x5ef021[_0x1aec97('0x609')];for(const _0xe5dc24 of _0x1fa3d8){if(!_0xe5dc24)continue;if(_0xe5dc24[_0x1aec97('0x5ba')]())_0xe5dc24[_0x1aec97('0x1db')](_0x1498c9);else{if(_0xe5dc24[_0x1aec97('0x401')]()){_0xe5dc24[_0x1aec97('0x54f')](_0x4764f7);if(_0x388916)_0xe5dc24[_0x1aec97('0x790')]();}}}}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x70c'),_0x58aab5=>{const _0x451d97=_0x5f4923;if(!SceneManager[_0x451d97('0x64e')]())return;VisuMZ['ConvertParams'](_0x58aab5,_0x58aab5);const _0x37db61=$gameTemp[_0x451d97('0x7fd')](),_0x42ef2e=BattleManager[_0x451d97('0x50a')],_0x401d0d=BattleManager[_0x451d97('0x362')];if(!_0x37db61||!_0x42ef2e||!_0x401d0d)return;if(!_0x42ef2e[_0x451d97('0x555')]())return;const _0x3a7cb9=VisuMZ[_0x451d97('0x2c')](_0x58aab5['Targets']);for(const _0xeafa49 of _0x3a7cb9){if('bdoOG'===_0x451d97('0x7cc')){function _0x577c9c(){this['_targetAngle']=0x0,this['_currentAngle']=0x0;}}else{if(!_0xeafa49)continue;if(_0x58aab5[_0x451d97('0x6ea')]){if('ULRpg'!=='NOkGq')_0xeafa49[_0x451d97('0x2a9')](),_0xeafa49[_0x451d97('0x762')](_0xeafa49['deathStateId']());else{function _0x51ec87(){this['_cache']['svAnchorX']=_0x7b1286(_0x555f0d['$1']),this['_cache']['svAnchorY']=_0x57dc9f(_0x3951e8['$2']);}}}_0xeafa49[_0x451d97('0x65d')]()&&_0xeafa49[_0x451d97('0x824')]();}}_0x37db61[_0x451d97('0x28')]('battleEffect');}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x51'),_0x3a40f1=>{const _0x3839cc=_0x5f4923;if(!SceneManager[_0x3839cc('0x64e')]())return;if(!Imported[_0x3839cc('0x1b3')])return;VisuMZ[_0x3839cc('0x3b4')](_0x3a40f1,_0x3a40f1);const _0x72b0c8=VisuMZ[_0x3839cc('0x2c')](_0x3a40f1[_0x3839cc('0x631')]),_0x2ad5a6=_0x3a40f1[_0x3839cc('0x5df')];for(const _0x1a4cb8 of _0x72b0c8){if(!_0x1a4cb8)continue;_0x1a4cb8['changeTurnOrderByCTB'](_0x2ad5a6);}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x74d'),_0x1d8d69=>{const _0x437308=_0x5f4923;if(!SceneManager[_0x437308('0x64e')]())return;if(!Imported[_0x437308('0x1b3')])return;VisuMZ[_0x437308('0x3b4')](_0x1d8d69,_0x1d8d69);const _0x586b3c=VisuMZ[_0x437308('0x2c')](_0x1d8d69[_0x437308('0x631')]),_0x4a7c99=_0x1d8d69[_0x437308('0x35b')],_0x3b4666=_0x1d8d69[_0x437308('0x35b')];for(const _0x2b4756 of _0x586b3c){if(!_0x2b4756)continue;if(_0x2b4756[_0x437308('0x70b')]===_0x437308('0x886')){if(_0x437308('0x4bd')===_0x437308('0x4bd'))_0x2b4756[_0x437308('0x5fe')](_0x4a7c99);else{function _0x4b8778(){const _0x5bfa73=_0x437308;_0x15aa30['BattleCore']['Scene_Battle_onEnemyOk']['call'](this),this[_0x5bfa73('0x6ec')]();}}}else{if(_0x2b4756['_tpbState']==='casting'){if(_0x437308('0x84f')!==_0x437308('0x84f')){function _0x4d8e14(){const _0x269379=_0x437308;this[_0x269379('0x1d4')](_0x4bacdb,_0x373c4b['x']+_0xe33a1a['width']-_0xbe9f1f,_0x589c04['y'],_0x38ffa4);}}else _0x2b4756[_0x437308('0x32a')](_0x3b4666);}}}}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x2f3'),_0x38aac3=>{const _0x3adb4c=_0x5f4923;if(!SceneManager[_0x3adb4c('0x64e')]())return;VisuMZ[_0x3adb4c('0x3b4')](_0x38aac3,_0x38aac3);const _0x3750a5=VisuMZ['CreateActionSequenceTargets'](_0x38aac3[_0x3adb4c('0x631')]);for(const _0x4f2629 of _0x3750a5){if(_0x3adb4c('0x6da')!==_0x3adb4c('0x210')){if(!_0x4f2629)continue;if(_0x4f2629[_0x3adb4c('0x7e7')]())_0x4f2629['startDamagePopup']();}else{function _0x1dd581(){const _0x202318=_0x3adb4c;return this['svBattlerData']()[_0x202318('0x6b')];}}}}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x4bb'),_0x22b8b3=>{const _0x596337=_0x5f4923;if(!SceneManager[_0x596337('0x64e')]())return;VisuMZ[_0x596337('0x3b4')](_0x22b8b3,_0x22b8b3);const _0x5c6be5=$gameTemp['getLastPluginCommandInterpreter'](),_0x13be87=BattleManager[_0x596337('0x362')],_0x6732e5=_0x22b8b3['JumpToLabel'];if(!_0x5c6be5)return;if(!_0x13be87)return;_0x13be87&&_0x13be87[_0x596337('0x110')]()&&_0x6732e5[_0x596337('0x667')]()[_0x596337('0x32d')]()!==_0x596337('0x580')&&_0x5c6be5[_0x596337('0x28e')]([_0x6732e5]);}),PluginManager[_0x5f4923('0x588')](pluginData['name'],'ActSeq_Mechanics_HpMpTp',_0x1b9d7d=>{const _0x39a0ce=_0x5f4923;if(!SceneManager[_0x39a0ce('0x64e')]())return;VisuMZ['ConvertParams'](_0x1b9d7d,_0x1b9d7d);const _0x5dd703=VisuMZ[_0x39a0ce('0x2c')](_0x1b9d7d[_0x39a0ce('0x631')]),_0x57c47f=_0x1b9d7d[_0x39a0ce('0x38e')],_0x139956=_0x1b9d7d['HP_Flat'],_0x458d88=_0x1b9d7d[_0x39a0ce('0x752')],_0x303af2=_0x1b9d7d[_0x39a0ce('0x2f2')],_0x933a2a=_0x1b9d7d[_0x39a0ce('0x67f')],_0x1277a8=_0x1b9d7d[_0x39a0ce('0x41a')],_0x1749c5=_0x1b9d7d[_0x39a0ce('0x2b4')];for(const _0x21eb2e of _0x5dd703){if(!_0x21eb2e)continue;const _0x2a441e=_0x21eb2e['isAlive'](),_0x197ba4=Math['round'](_0x57c47f*_0x21eb2e[_0x39a0ce('0x124')]+_0x139956),_0x33994f=Math[_0x39a0ce('0x774')](_0x458d88*_0x21eb2e[_0x39a0ce('0x4a5')]+_0x303af2),_0x288b89=Math[_0x39a0ce('0x774')](_0x933a2a*_0x21eb2e[_0x39a0ce('0x546')]()+_0x1277a8);if(_0x197ba4!==0x0)_0x21eb2e[_0x39a0ce('0x4af')](_0x197ba4);if(_0x33994f!==0x0)_0x21eb2e[_0x39a0ce('0x2ac')](_0x33994f);if(_0x288b89!==0x0)_0x21eb2e[_0x39a0ce('0xf8')](_0x288b89);if(_0x1749c5)_0x21eb2e[_0x39a0ce('0x257')]();if(_0x2a441e&&_0x21eb2e['isDead']()){if('EJZuL'!==_0x39a0ce('0x88'))_0x21eb2e['performCollapse']();else{function _0x513980(){const _0x5528fe=_0x39a0ce;return _0x251f7c[_0x5528fe('0x4f0')]-_0x636857[_0x5528fe('0x4f0')];}}}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x76f'),_0x420159=>{const _0x103acb=_0x5f4923;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x420159,_0x420159);const _0x1f8f02=VisuMZ['CreateActionSequenceTargets'](_0x420159[_0x103acb('0x631')]);for(const _0x72180e of _0x1f8f02){if(_0x103acb('0x24e')!=='aTGyg'){function _0x13d4fd(){const _0x32f936=_0x103acb;this[_0x32f936('0x1b')]=new _0x3f07df(),this[_0x32f936('0x3e8')](this['_damageContainer']);}}else{if(!_0x72180e)continue;_0x72180e[_0x103acb('0x225')](_0x420159[_0x103acb('0x676')]);}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Mechanics_Multipliers',_0x4bed73=>{const _0x3036a2=_0x5f4923;if(!SceneManager[_0x3036a2('0x64e')]())return;VisuMZ['ConvertParams'](_0x4bed73,_0x4bed73);const _0x5d0a7d=BattleManager[_0x3036a2('0x50a')],_0xcb6bc7={'criticalHitRate':_0x4bed73[_0x3036a2('0x6eb')],'criticalHitFlat':_0x4bed73[_0x3036a2('0x853')],'criticalDmgRate':_0x4bed73[_0x3036a2('0x4a')],'criticalDmgFlat':_0x4bed73[_0x3036a2('0x3f4')],'damageRate':_0x4bed73['DamageRate'],'damageFlat':_0x4bed73[_0x3036a2('0x4c0')],'hitRate':_0x4bed73[_0x3036a2('0x500')],'hitFlat':_0x4bed73['HitFlat']};_0x5d0a7d[_0x3036a2('0x637')]=_0xcb6bc7;}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0xce'),_0x4ecb7f=>{const _0x1ab3e7=_0x5f4923;if(!SceneManager[_0x1ab3e7('0x64e')]())return;VisuMZ[_0x1ab3e7('0x3b4')](_0x4ecb7f,_0x4ecb7f);const _0x1b4364=[_0x1ab3e7('0x4da'),'MAXMP','ATK',_0x1ab3e7('0x4dc'),_0x1ab3e7('0x2f5'),_0x1ab3e7('0x156'),_0x1ab3e7('0xee'),_0x1ab3e7('0x321')],_0x534f9f=_0x4ecb7f['Buffs'],_0x4995c8=_0x4ecb7f[_0x1ab3e7('0x4c')],_0xd009bf=VisuMZ['CreateActionSequenceTargets'](_0x4ecb7f[_0x1ab3e7('0x631')]);for(const _0x21d6dd of _0xd009bf){if(_0x1ab3e7('0x458')===_0x1ab3e7('0x458')){if(!_0x21d6dd)continue;for(const _0x4ba6de of _0x534f9f){if('nyfrI'!==_0x1ab3e7('0x4e0')){const _0x2a2b9d=_0x1b4364[_0x1ab3e7('0x421')](_0x4ba6de[_0x1ab3e7('0x667')]()[_0x1ab3e7('0x32d')]());_0x2a2b9d>=0x0&&_0x2a2b9d<=0x7&&_0x21d6dd[_0x1ab3e7('0x3')](_0x2a2b9d)&&_0x21d6dd[_0x1ab3e7('0x4e9')](_0x2a2b9d);}else{function _0x3449b0(){const _0x40e43f=_0x1ab3e7;if(!_0x421c91['isSceneBattle']())return;if(!_0x7de860[_0x40e43f('0x620')])return;const _0x553778=_0x1a04f5[_0x40e43f('0x7fd')]();if(!_0x553778)return;_0x553778[_0x40e43f('0x28')]('battleSkew');}}}for(const _0x3902dd of _0x4995c8){const _0x37d734=_0x1b4364['indexOf'](_0x3902dd[_0x1ab3e7('0x667')]()[_0x1ab3e7('0x32d')]());if(_0x37d734>=0x0&&_0x37d734<=0x7&&_0x21d6dd[_0x1ab3e7('0x624')](_0x37d734)){if(_0x1ab3e7('0x7f0')===_0x1ab3e7('0x7f0'))_0x21d6dd[_0x1ab3e7('0x4e9')](_0x37d734);else{function _0x875bc9(){const _0x4c0377=_0x1ab3e7;return _0x39f2da[_0x4c0377('0x88d')][_0x4c0377('0x763')][_0x4c0377('0x618')](this);}}}}}else{function _0x13b5cb(){const _0x2d2222=_0x1ab3e7;if(!_0x21f197[_0x2d2222('0x220')])return;const _0x4a846c=_0x4dbfa2[_0x2d2222('0x60a')][_0x2d2222('0xc5')];if(!_0x4a846c)return;_0x528640['ConvertParams'](_0x1cddc2,_0x258bea);const _0x1dc2cd=_0x709f57['X']||0x0,_0x3b7d28=_0x3640dd['Y']||0x0,_0x38630e=_0x3ddd3b[_0x2d2222('0x68')]||0x0,_0x55378b=_0x5e2313[_0x2d2222('0x1e5')]||0x0,_0x5933e4=_0x53a4cf[_0x2d2222('0x79d')]||0x1,_0x43b457=_0x7f8b90['EasingType']||'Linear';_0x4a846c['setupZoomBlurImpactFilter'](_0x38630e,_0x1dc2cd,_0x3b7d28,_0x55378b,_0x5933e4,_0x43b457);}}}}),PluginManager['registerCommand'](pluginData['name'],_0x5f4923('0x69a'),_0x56618d=>{const _0x43354a=_0x5f4923;if(!SceneManager[_0x43354a('0x64e')]())return;VisuMZ[_0x43354a('0x3b4')](_0x56618d,_0x56618d);const _0x48e779=_0x56618d[_0x43354a('0x7d3')],_0x3ae09c=VisuMZ[_0x43354a('0x2c')](_0x56618d[_0x43354a('0x631')]);for(const _0x47f1a0 of _0x3ae09c){if(!_0x47f1a0)continue;for(const _0x4658fc of _0x48e779){_0x47f1a0[_0x43354a('0x132')](_0x4658fc);}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Mechanics_TextPopup',_0x113b14=>{const _0x1bb84=_0x5f4923;if(!SceneManager[_0x1bb84('0x64e')]())return;VisuMZ[_0x1bb84('0x3b4')](_0x113b14,_0x113b14);const _0x2b2979=VisuMZ[_0x1bb84('0x2c')](_0x113b14['Targets']),_0x22beec=_0x113b14[_0x1bb84('0x314')],_0x5bd341={'textColor':ColorManager[_0x1bb84('0x76')](_0x113b14[_0x1bb84('0x4f8')]),'flashColor':_0x113b14[_0x1bb84('0x3e0')],'flashDuration':_0x113b14[_0x1bb84('0x31f')]};for(const _0x4bc65b of _0x2b2979){if('GzvBu'===_0x1bb84('0x3d6')){function _0xbdc9ee(){const _0x5cf1bc=_0x1bb84;if(_0x6a1ef4['ActionItemMsg'])this['displayItemMessage'](_0x5be938[_0x5cf1bc('0x83a')],_0x35bdf6,_0x294b6f);}}else{if(!_0x4bc65b)continue;_0x4bc65b['setupTextPopup'](_0x22beec,_0x5bd341);}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x2ef'),_0x48fd59=>{const _0x565bec=_0x5f4923;if(!SceneManager[_0x565bec('0x64e')]())return;VisuMZ[_0x565bec('0x3b4')](_0x48fd59,_0x48fd59);const _0x53dc3b=VisuMZ['CreateActionSequenceTargets'](_0x48fd59['Targets']);let _0x3dcc3f=$gameVariables[_0x565bec('0x4b2')](_0x48fd59[_0x565bec('0x59f')]);if(Imported[_0x565bec('0x4f6')]&&_0x48fd59[_0x565bec('0x45e')]){if(_0x565bec('0x1aa')!==_0x565bec('0x1aa')){function _0x1e15f3(){const _0x3fd6dc=_0x565bec;_0xf9c1c2[_0x3fd6dc('0x2f')](0x0,0x0,_0x440b8d[_0x3fd6dc('0x596')]['width'],this[_0x3fd6dc('0x596')][_0x3fd6dc('0x303')]);}}else _0x3dcc3f=VisuMZ['GroupDigits'](_0x3dcc3f);}const _0x316899=String(_0x3dcc3f),_0x48b64a={'textColor':ColorManager[_0x565bec('0x76')](_0x48fd59[_0x565bec('0x4f8')]),'flashColor':_0x48fd59['FlashColor'],'flashDuration':_0x48fd59[_0x565bec('0x31f')]};for(const _0x3f3fc5 of _0x53dc3b){if(_0x565bec('0x29')==='PgShN'){if(!_0x3f3fc5)continue;_0x3f3fc5[_0x565bec('0x34d')](_0x316899,_0x48b64a);}else{function _0x11e4af(){const _0x15af2b=_0x565bec;_0x50dd91[_0x15af2b('0x14f')][_0x15af2b('0x5c4')][_0x15af2b('0x618')](this,_0x22119e);if(this[_0x15af2b('0x64d')]())this[_0x15af2b('0x3aa')](_0x5b838c);}}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x17'),_0x4f554f=>{const _0x43b46f=_0x5f4923;if(!SceneManager['isSceneBattle']())return;const _0xfb98f4=$gameTemp[_0x43b46f('0x7fd')]();if(!_0xfb98f4)return;_0xfb98f4[_0x43b46f('0x28')](_0x43b46f('0xc6'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Motion_ClearFreezeFrame',_0x23e066=>{const _0x1fc263=_0x5f4923;if(!SceneManager[_0x1fc263('0x64e')]())return;VisuMZ[_0x1fc263('0x3b4')](_0x23e066,_0x23e066);const _0x335a35=VisuMZ[_0x1fc263('0x2c')](_0x23e066[_0x1fc263('0x631')]);for(const _0x3ae702 of _0x335a35){if(_0x1fc263('0x85f')===_0x1fc263('0x85f')){if(!_0x3ae702)continue;_0x3ae702['clearFreezeMotion']();}else{function _0x4f7614(){const _0x2599a0=_0x1fc263;_0x540a12[_0x2599a0('0x267')](this['updateBattlebackBitmap2'][_0x2599a0('0x48f')](this,_0x49f7a,_0x5e584a,_0x18c5c0,_0x1be953));}}}}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x7c0'),_0x564771=>{const _0x5c7ff7=_0x5f4923;if(!SceneManager[_0x5c7ff7('0x64e')]())return;VisuMZ[_0x5c7ff7('0x3b4')](_0x564771,_0x564771);const _0x436a1d=VisuMZ[_0x5c7ff7('0x2c')](_0x564771[_0x5c7ff7('0x631')]),_0xb4196f=_0x564771['MotionType'][_0x5c7ff7('0x3ec')]()[_0x5c7ff7('0x32d')](),_0x2345f5=_0x564771['ShowWeapon'],_0x170920=_0x564771['Frame'];for(const _0x42751b of _0x436a1d){if(_0x5c7ff7('0x659')!==_0x5c7ff7('0x659')){function _0x1c83ff(){const _0x264fb2=_0x5c7ff7;if(!this[_0x264fb2('0x756')][_0x264fb2('0x298')]())return;const _0x3e575=_0x386413['BattleCore']['Settings']['Damage'],_0x18c111=new _0x2f1050();_0x18c111[_0x264fb2('0x70')]=_0x3e575['PopupDuration'],this[_0x264fb2('0x122')](_0x18c111),_0x18c111[_0x264fb2('0x34d')](_0x33ead2,_0x200d11),this[_0x264fb2('0x39a')](_0x18c111);}}else{if(!_0x42751b)continue;_0x42751b[_0x5c7ff7('0x7b0')](_0xb4196f,_0x2345f5,_0x170920);}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Motion_MotionType',_0x14851b=>{const _0x5f413d=_0x5f4923;if(!SceneManager[_0x5f413d('0x64e')]())return;VisuMZ[_0x5f413d('0x3b4')](_0x14851b,_0x14851b);const _0x2263b9=VisuMZ['CreateActionSequenceTargets'](_0x14851b['Targets']),_0x262c3f=_0x14851b[_0x5f413d('0x43f')][_0x5f413d('0x3ec')]()[_0x5f413d('0x32d')](),_0x1fb67b=_0x14851b['ShowWeapon'];for(const _0x4789d1 of _0x2263b9){if(!_0x4789d1)continue;if(_0x262c3f==='attack')_0x4789d1['performAttack']();else{if(_0x5f413d('0x88c')!==_0x5f413d('0x88c')){function _0x5d7f17(){const _0x5af9dd=_0x5f413d;return _0x4d9791[_0x5af9dd('0x88d')][_0x5af9dd('0x39b')]['Actor'][_0x5af9dd('0x612')];}}else _0x4789d1[_0x5f413d('0x18')](_0x262c3f);}if(!_0x1fb67b)_0x4789d1['startWeaponAnimation'](0x0);else{if(_0x1fb67b&&[_0x5f413d('0x6c3'),_0x5f413d('0x10e'),'missle'][_0x5f413d('0x147')](_0x262c3f)){}}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x75a'),_0x177e32=>{const _0xb149bb=_0x5f4923;if(!SceneManager[_0xb149bb('0x64e')]())return;VisuMZ[_0xb149bb('0x3b4')](_0x177e32,_0x177e32);const _0x4283b0=BattleManager[_0xb149bb('0x50a')];if(!_0x4283b0)return;if(!_0x4283b0[_0xb149bb('0x555')]())return;const _0x191011=VisuMZ[_0xb149bb('0x2c')](_0x177e32[_0xb149bb('0x631')]);for(const _0x1a063e of _0x191011){if(!_0x1a063e)continue;_0x1a063e[_0xb149bb('0x5c4')](_0x4283b0);}}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x61d'),_0x4fb33f=>{const _0x46492c=_0x5f4923;if(!SceneManager[_0x46492c('0x64e')]())return;VisuMZ[_0x46492c('0x3b4')](_0x4fb33f,_0x4fb33f);const _0x5467d7=VisuMZ[_0x46492c('0x2c')](_0x4fb33f[_0x46492c('0x631')]);for(const _0x37610f of _0x5467d7){if(_0x46492c('0x725')!==_0x46492c('0x75')){if(!_0x37610f)continue;if(!_0x37610f['battler']())continue;_0x37610f[_0x46492c('0x17f')]()[_0x46492c('0x30c')]();}else{function _0x3eba37(){const _0x877412=_0x46492c;if(!this[_0x877412('0x334')]())return;if(!this[_0x877412('0x57')])this[_0x877412('0x402')]();this[_0x877412('0x651')](),this[_0x877412('0x271')]();}}}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x468'),_0x130ef5=>{const _0x5eaf97=_0x5f4923;if(!SceneManager[_0x5eaf97('0x64e')]())return;VisuMZ[_0x5eaf97('0x3b4')](_0x130ef5,_0x130ef5);const _0x340d23=$gameTemp['getLastPluginCommandInterpreter'](),_0x4911f2=_0x130ef5[_0x5eaf97('0x29d')]*Sprite_Battler[_0x5eaf97('0x81c')];_0x340d23[_0x5eaf97('0x12d')](_0x4911f2);}),PluginManager['registerCommand'](pluginData['name'],_0x5f4923('0x7d2'),_0x2bb957=>{const _0x2a9c30=_0x5f4923;if(!SceneManager[_0x2a9c30('0x64e')]())return;VisuMZ[_0x2a9c30('0x3b4')](_0x2bb957,_0x2bb957);const _0x12ad79=$gameTemp[_0x2a9c30('0x7fd')](),_0x12129d=BattleManager[_0x2a9c30('0x50a')];if(!_0x12ad79||!_0x12129d)return;if(!_0x12129d['item']())return;const _0x15c5ed=VisuMZ[_0x2a9c30('0x2c')](_0x2bb957[_0x2a9c30('0x631')]);for(const _0x32e170 of _0x15c5ed){if(!_0x32e170)continue;_0x32e170['performActionStart'](_0x12129d);}if(_0x2bb957[_0x2a9c30('0x258')])_0x12ad79['setWaitMode'](_0x2a9c30('0x211'));}),PluginManager[_0x5f4923('0x588')](pluginData['name'],'ActSeq_Movement_FaceDirection',_0xd98103=>{const _0x108548=_0x5f4923;if(!SceneManager[_0x108548('0x64e')]())return;if(!$gameSystem[_0x108548('0x773')]())return;VisuMZ[_0x108548('0x3b4')](_0xd98103,_0xd98103);const _0xf236d5=VisuMZ[_0x108548('0x2c')](_0xd98103['Targets']);let _0x34ceee=_0xd98103['Direction'][_0x108548('0x5ae')](/back/i);for(const _0x5a455c of _0xf236d5){if(_0x108548('0x24c')===_0x108548('0x24c')){if(!_0x5a455c)continue;if(_0xd98103['Direction'][_0x108548('0x5ae')](/rand/i))_0x34ceee=Math[_0x108548('0x614')](0x2);_0x5a455c[_0x108548('0x2f6')](!!_0x34ceee);}else{function _0xdcaa67(){const _0x1f998f=_0x108548,_0x2eddd6=_0x1faec1[_0x1f998f('0x88d')][_0x1f998f('0x39b')][_0x1f998f('0xb1')];if(!_0x2eddd6[_0x1f998f('0x10d')])return;this[_0x1f998f('0x2fc')](_0x1f998f('0x256'),_0x2eddd6[_0x1f998f('0x429')]['format'](_0x288dea[_0x1f998f('0x793')]())),this[_0x1f998f('0x2fc')](_0x1f998f('0x844'),_0x2eddd6[_0x1f998f('0x396')]),this[_0x1f998f('0x2fc')](_0x1f998f('0x328'));}}}}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],'ActSeq_Movement_FacePoint',_0x446610=>{const _0x4cf0da=_0x5f4923;if(!SceneManager[_0x4cf0da('0x64e')]())return;if(!$gameSystem[_0x4cf0da('0x773')]())return;VisuMZ[_0x4cf0da('0x3b4')](_0x446610,_0x446610);const _0x46cbc2=VisuMZ[_0x4cf0da('0x2c')](_0x446610[_0x4cf0da('0x631')]);let _0x2f5904=_0x446610[_0x4cf0da('0x49d')];const _0x5e3527=_0x446610[_0x4cf0da('0x325')];for(const _0x4739ae of _0x46cbc2){if(!_0x4739ae)continue;let _0x1ee867=_0x4739ae[_0x4cf0da('0x17f')]()[_0x4cf0da('0x280')],_0xdb366d=_0x4739ae[_0x4cf0da('0x17f')]()[_0x4cf0da('0x674')];if(_0x2f5904[_0x4cf0da('0x5ae')](/home/i)){if(_0x4cf0da('0x775')!=='wRuss'){function _0x2a7220(){const _0x49ce13=_0x4cf0da;return this[_0x49ce13('0x2d2')]()?0x0:0xa;}}else _0x1ee867=_0x4739ae[_0x4cf0da('0x17f')]()['_homeX'],_0xdb366d=_0x4739ae[_0x4cf0da('0x17f')]()['_homeY'];}else{if(_0x2f5904['match'](/center/i))_0x1ee867=Graphics[_0x4cf0da('0x49b')]/0x2,_0xdb366d=Graphics[_0x4cf0da('0x5bf')]/0x2;else{if(_0x2f5904[_0x4cf0da('0x5ae')](/point (\d+), (\d+)/i)){if(_0x4cf0da('0x259')==='yypqR'){function _0x140bb1(){const _0x36072a=_0x4cf0da;this[_0x36072a('0x57')]=new _0x1ed608();const _0x1473a4=_0x5ca68b[_0x36072a('0x60a')],_0x46c062=_0x1473a4['children'][_0x36072a('0x421')](_0x1473a4[_0x36072a('0x76a')]);_0x1473a4[_0x36072a('0x827')](this['_borderPortraitSprite'],_0x46c062),this[_0x36072a('0x57')]['anchor']['x']=0.5,this[_0x36072a('0x57')][_0x36072a('0x105')]['y']=0x1;const _0x2c97bd=_0x474193['BattleCore'][_0x36072a('0x39b')][_0x36072a('0x88f')][_0x36072a('0x890')];this[_0x36072a('0x57')]['scale']['x']=_0x2c97bd,this[_0x36072a('0x57')]['scale']['y']=_0x2c97bd,this[_0x36072a('0x57')]['y']=this['y']+this[_0x36072a('0x303')],this['_borderPortraitDuration']=0x0;}}else _0x1ee867=Number(RegExp['$1']),_0xdb366d=Number(RegExp['$2']);}}}_0x4739ae['setBattlerFacePoint'](Math['round'](_0x1ee867),Math['round'](_0xdb366d),!!_0x5e3527);}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x69d'),_0x432320=>{const _0x81608b=_0x5f4923;if(!SceneManager[_0x81608b('0x64e')]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x81608b('0x3b4')](_0x432320,_0x432320);const _0x3dd0ae=VisuMZ[_0x81608b('0x2c')](_0x432320[_0x81608b('0xba')]),_0x1f3930=VisuMZ[_0x81608b('0x2c')](_0x432320['Targets2']),_0x11570d=_0x1f3930[_0x81608b('0x17b')](_0x311d57=>_0x311d57&&_0x311d57[_0x81608b('0x17f')]()?_0x311d57['battler']()[_0x81608b('0x280')]:0x0)/(_0x1f3930['length']||0x1),_0x3a83cc=_0x1f3930[_0x81608b('0x17b')](_0x58d79e=>_0x58d79e&&_0x58d79e[_0x81608b('0x17f')]()?_0x58d79e['battler']()[_0x81608b('0x674')]:0x0)/(_0x1f3930[_0x81608b('0x568')]||0x1),_0x36294b=_0x432320[_0x81608b('0x325')];for(const _0x286ec1 of _0x3dd0ae){if(!_0x286ec1)continue;_0x286ec1[_0x81608b('0x243')](Math[_0x81608b('0x774')](_0x11570d),Math[_0x81608b('0x774')](_0x3a83cc),!!_0x36294b);}}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x14d'),_0x19ae27=>{const _0x56a932=_0x5f4923;if(!SceneManager[_0x56a932('0x64e')]())return;VisuMZ['ConvertParams'](_0x19ae27,_0x19ae27);const _0x57dfa6=$gameTemp['getLastPluginCommandInterpreter'](),_0x4915c1=VisuMZ[_0x56a932('0x2c')](_0x19ae27['Targets']),_0xb413c1=_0x19ae27[_0x56a932('0x1f9')],_0x55697e=_0x19ae27['Duration'],_0x5d731f=_0x19ae27[_0x56a932('0x7d4')],_0x23bbce=_0x19ae27['WaitForFloat'];if(!_0x57dfa6)return;for(const _0x47efa0 of _0x4915c1){if('NnRbD'!=='NnRbD'){function _0xb385c(){const _0x17621a=_0x56a932;this[_0x17621a('0x2e1')]();}}else{if(!_0x47efa0)continue;_0x47efa0['floatBattler'](_0xb413c1,_0x55697e,_0x5d731f);}}if(_0x23bbce)_0x57dfa6[_0x56a932('0x28')]('battleFloat');}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Movement_HomeReset',_0x3b4c90=>{const _0x1a330b=_0x5f4923;if(!SceneManager[_0x1a330b('0x64e')]())return;VisuMZ[_0x1a330b('0x3b4')](_0x3b4c90,_0x3b4c90);const _0x40aabe=$gameTemp[_0x1a330b('0x7fd')]();if(!_0x40aabe)return;const _0x42d9ef=VisuMZ[_0x1a330b('0x2c')](_0x3b4c90[_0x1a330b('0x631')]);for(const _0x423146 of _0x42d9ef){if(!_0x423146)continue;_0x423146['performActionEnd']();}if(_0x3b4c90[_0x1a330b('0x258')])_0x40aabe[_0x1a330b('0x28')]('battleMove');}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x10b'),_0x252588=>{const _0x1e455f=_0x5f4923;if(!SceneManager[_0x1e455f('0x64e')]())return;VisuMZ[_0x1e455f('0x3b4')](_0x252588,_0x252588);const _0x416b46=$gameTemp[_0x1e455f('0x7fd')](),_0x4a6e8f=VisuMZ[_0x1e455f('0x2c')](_0x252588[_0x1e455f('0x631')]),_0x4cb199=_0x252588[_0x1e455f('0x1f9')],_0xc38a01=_0x252588[_0x1e455f('0x79d')],_0x22f23f=_0x252588['WaitForJump'];if(!_0x416b46)return;for(const _0x22ae2e of _0x4a6e8f){if(!_0x22ae2e)continue;_0x22ae2e[_0x1e455f('0x69')](_0x4cb199,_0xc38a01);}if(_0x22f23f)_0x416b46['setWaitMode'](_0x1e455f('0x877'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x222'),_0x8b47fa=>{const _0x1b9676=_0x5f4923;if(!SceneManager[_0x1b9676('0x64e')]())return;if(!$gameSystem[_0x1b9676('0x773')]())return;VisuMZ[_0x1b9676('0x3b4')](_0x8b47fa,_0x8b47fa);const _0x4d5072=$gameTemp['getLastPluginCommandInterpreter'](),_0x377f1b=VisuMZ[_0x1b9676('0x2c')](_0x8b47fa['Targets']),_0x1ff94e=_0x8b47fa[_0x1b9676('0xad')],_0x24758a=_0x8b47fa[_0x1b9676('0x598')],_0x3caac0=_0x8b47fa[_0x1b9676('0x840')],_0x53b0e2=_0x8b47fa[_0x1b9676('0x79d')],_0x1ccf93=_0x8b47fa[_0x1b9676('0x43')],_0x37bcdb=_0x8b47fa[_0x1b9676('0x7d4')],_0xd135ab=_0x8b47fa[_0x1b9676('0x43f')],_0x1149e3=_0x8b47fa[_0x1b9676('0x258')];if(!_0x4d5072)return;for(const _0x59b273 of _0x377f1b){if(!_0x59b273)continue;let _0x559fc7=_0x24758a,_0xfe1fac=_0x3caac0;if(_0x1ff94e[_0x1b9676('0x5ae')](/horz/i))_0x559fc7*=_0x59b273[_0x1b9676('0x1c3')]()?-0x1:0x1;if(_0x1ff94e[_0x1b9676('0x5ae')](/vert/i))_0xfe1fac*=_0x59b273[_0x1b9676('0x1c3')]()?-0x1:0x1;_0x59b273[_0x1b9676('0x340')](_0x559fc7,_0xfe1fac,_0x53b0e2,_0x1ccf93,_0x37bcdb),_0x59b273[_0x1b9676('0x18')](_0xd135ab);}if(_0x1149e3)_0x4d5072[_0x1b9676('0x28')](_0x1b9676('0x211'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x896'),_0x48cb3e=>{const _0x77b7af=_0x5f4923;if(!SceneManager[_0x77b7af('0x64e')]())return;if(!$gameSystem[_0x77b7af('0x773')]())return;VisuMZ['ConvertParams'](_0x48cb3e,_0x48cb3e);const _0x195ac3=$gameTemp[_0x77b7af('0x7fd')](),_0x1107f6=VisuMZ['CreateActionSequenceTargets'](_0x48cb3e[_0x77b7af('0x631')]),_0x379f11=_0x48cb3e[_0x77b7af('0x43a')],_0x389d7a=_0x48cb3e['OffsetAdjust'],_0x5a0c0d=_0x48cb3e[_0x77b7af('0x250')],_0x18700e=_0x48cb3e[_0x77b7af('0x33e')],_0xc35a5c=_0x48cb3e[_0x77b7af('0x79d')],_0x567627=_0x48cb3e[_0x77b7af('0x43')],_0x1b7796=_0x48cb3e[_0x77b7af('0x7d4')],_0x19387d=_0x48cb3e[_0x77b7af('0x43f')],_0x30eecc=_0x48cb3e[_0x77b7af('0x258')];if(!_0x195ac3)return;for(const _0x5c21fa of _0x1107f6){if(!_0x5c21fa)continue;let _0x352a45=_0x5c21fa[_0x77b7af('0x17f')]()[_0x77b7af('0x280')],_0x4193dc=_0x5c21fa['battler']()[_0x77b7af('0x674')];if(_0x379f11[_0x77b7af('0x5ae')](/home/i)){if(_0x77b7af('0x30a')!==_0x77b7af('0x30a')){function _0x39bab9(){const _0x5e4ff1=_0x77b7af;for(const _0x35f0e6 of _0x15bd0d){const _0x55a0a2=_0xa4929a[0x0]['format'](_0x35f0e6[0x0],_0x368dab[0x0]),_0x330ff8=_0x32ed71[0x1][_0x5e4ff1('0x6e6')](_0x35f0e6[0x1],_0x492c81[0x1])[_0x5e4ff1('0x32d')](),_0x2efa86=new _0x18c830(_0x3fb65a[_0x5e4ff1('0x6e6')](_0x330ff8),'i');_0x1abaf1[_0x55a0a2]=_0x2efa86;}}}else _0x352a45=_0x5c21fa[_0x77b7af('0x17f')]()[_0x77b7af('0x10a')],_0x4193dc=_0x5c21fa[_0x77b7af('0x17f')]()['_homeY'];}else{if(_0x379f11[_0x77b7af('0x5ae')](/center/i)){if(_0x77b7af('0x502')!=='imsVd'){function _0x37d9da(){const _0x5cac79=_0x77b7af;this['_lines'][_0x5cac79('0x2fc')](_0x5e2358),this[_0x5cac79('0x621')](),this[_0x5cac79('0x67')]();}}else _0x352a45=Graphics[_0x77b7af('0x49b')]/0x2,_0x4193dc=Graphics['boxHeight']/0x2;}else{if(_0x379f11[_0x77b7af('0x5ae')](/point (\d+), (\d+)/i)){if('kWWim'!==_0x77b7af('0x4d6')){function _0x5d7242(){const _0x373af6=_0x77b7af;if(this[_0x373af6('0x83b')][_0x373af6('0x359')]!==_0x5a0750)return this[_0x373af6('0x83b')]['svAnchorX'];return this['actor']()[_0x373af6('0x331')]['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x373af6('0x83b')][_0x373af6('0x359')]=_0x2ed94f(_0x71ed17['$1']),this['_cache'][_0x373af6('0x832')]=_0x5e988c(_0x5818f9['$2'])):this[_0x373af6('0x83b')][_0x373af6('0x359')]=_0x52361f['prototype'][_0x373af6('0x36a')]['call'](this),this[_0x373af6('0x83b')][_0x373af6('0x359')];}}else _0x352a45=Number(RegExp['$1']),_0x4193dc=Number(RegExp['$2']);}}}if(_0x389d7a[_0x77b7af('0x5ae')](/horz/i))_0x352a45+=_0x5c21fa[_0x77b7af('0x1c3')]()?-_0x5a0c0d:_0x5a0c0d;if(_0x389d7a[_0x77b7af('0x5ae')](/vert/i))_0x4193dc+=_0x5c21fa[_0x77b7af('0x1c3')]()?-_0x18700e:_0x18700e;_0x5c21fa['moveBattlerToPoint'](_0x352a45,_0x4193dc,_0xc35a5c,_0x567627,_0x1b7796,-0x1),_0x5c21fa[_0x77b7af('0x18')](_0x19387d);}if(_0x30eecc)_0x195ac3[_0x77b7af('0x28')](_0x77b7af('0x211'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x3b5'),_0x136c3f=>{const _0x1b9b4c=_0x5f4923;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x1b9b4c('0x773')]())return;VisuMZ[_0x1b9b4c('0x3b4')](_0x136c3f,_0x136c3f);const _0x1960b3=$gameTemp[_0x1b9b4c('0x7fd')](),_0x19e009=VisuMZ['CreateActionSequenceTargets'](_0x136c3f[_0x1b9b4c('0xba')]),_0x4bdaaf=VisuMZ[_0x1b9b4c('0x2c')](_0x136c3f['Targets2']),_0x32cd55=_0x136c3f[_0x1b9b4c('0x294')];let _0x3eaf6c=_0x136c3f['MeleeDistance'];const _0x22d598=_0x136c3f['OffsetAdjust'],_0x3f4aba=_0x136c3f[_0x1b9b4c('0x250')],_0x29acca=_0x136c3f[_0x1b9b4c('0x33e')],_0x2adace=_0x136c3f[_0x1b9b4c('0x79d')],_0x505db8=_0x136c3f[_0x1b9b4c('0x43')],_0x333e90=_0x136c3f[_0x1b9b4c('0x7d4')],_0x121cc8=_0x136c3f['MotionType'],_0x20c6c6=_0x136c3f[_0x1b9b4c('0x258')],_0x302bfe=Math[_0x1b9b4c('0x6b4')](..._0x4bdaaf['map'](_0x51cbbf=>_0x51cbbf[_0x1b9b4c('0x17f')]()['_baseX']-_0x51cbbf['battler']()[_0x1b9b4c('0x290')]()/0x2)),_0xb19fd3=Math[_0x1b9b4c('0x489')](..._0x4bdaaf['map'](_0x389cd4=>_0x389cd4[_0x1b9b4c('0x17f')]()[_0x1b9b4c('0x280')]+_0x389cd4[_0x1b9b4c('0x17f')]()[_0x1b9b4c('0x290')]()/0x2)),_0x2c7f13=Math[_0x1b9b4c('0x6b4')](..._0x4bdaaf[_0x1b9b4c('0x17b')](_0x219e30=>_0x219e30[_0x1b9b4c('0x17f')]()['_baseY']-_0x219e30[_0x1b9b4c('0x17f')]()[_0x1b9b4c('0x831')]())),_0x4a9652=Math[_0x1b9b4c('0x489')](..._0x4bdaaf[_0x1b9b4c('0x17b')](_0x576d49=>_0x576d49[_0x1b9b4c('0x17f')]()[_0x1b9b4c('0x674')])),_0x3e079a=_0x4bdaaf['filter'](_0x13c499=>_0x13c499[_0x1b9b4c('0x1c3')]())[_0x1b9b4c('0x568')],_0x26f1e9=_0x4bdaaf[_0x1b9b4c('0x7bf')](_0x4078a7=>_0x4078a7['isEnemy']())['length'];let _0x50a00a=0x0,_0x3f9623=0x0;if(_0x32cd55['match'](/front/i)){if('kSpwH'!=='pGQfS')_0x50a00a=_0x3e079a>=_0x26f1e9?_0x302bfe:_0xb19fd3;else{function _0x1fe89f(){const _0x15cbe1=_0x1b9b4c,_0xbf9d00=this[_0x15cbe1('0x366')]();this[_0x15cbe1('0x3a')](_0xbf9d00);}}}else{if(_0x32cd55[_0x1b9b4c('0x5ae')](/middle/i)){if(_0x1b9b4c('0x230')===_0x1b9b4c('0x230'))_0x50a00a=(_0x302bfe+_0xb19fd3)/0x2,_0x3eaf6c=-0x1;else{function _0x6e7fae(){const _0x2e6315=_0x1b9b4c;return _0x4b6ed3[_0x2e6315('0x88d')][_0x2e6315('0x39b')][_0x2e6315('0x510')][_0x2e6315('0x291')];}}}else _0x32cd55[_0x1b9b4c('0x5ae')](/back/i)&&(_0x50a00a=_0x3e079a>=_0x26f1e9?_0xb19fd3:_0x302bfe);}if(_0x32cd55[_0x1b9b4c('0x5ae')](/head/i))_0x3f9623=_0x2c7f13;else{if(_0x32cd55['match'](/center/i)){if(_0x1b9b4c('0x136')==='GdalK'){function _0x150efb(){const _0x27d445=_0x1b9b4c;let _0x45b16c=_0x27d445('0x54b');if(this[_0x27d445('0x76e')](_0x45b16c))return this[_0x27d445('0x83b')][_0x45b16c];return this['_cache'][_0x45b16c]=this['createBattleUIOffsetY'](this['enemy']()),this[_0x27d445('0x83b')][_0x45b16c];}}else _0x3f9623=(_0x2c7f13+_0x4a9652)/0x2;}else _0x32cd55[_0x1b9b4c('0x5ae')](/base/i)&&(_0x3f9623=_0x4a9652);}if(!_0x1960b3)return;for(const _0x2a4d06 of _0x19e009){if(!_0x2a4d06)continue;let _0x3e3992=_0x50a00a,_0x5ea81e=_0x3f9623;if(_0x22d598['match'](/horz/i))_0x3e3992+=_0x2a4d06[_0x1b9b4c('0x1c3')]()?-_0x3f4aba:_0x3f4aba;if(_0x22d598[_0x1b9b4c('0x5ae')](/vert/i))_0x5ea81e+=_0x2a4d06[_0x1b9b4c('0x1c3')]()?-_0x29acca:_0x29acca;_0x2a4d06['moveBattlerToPoint'](_0x3e3992,_0x5ea81e,_0x2adace,_0x505db8,_0x333e90,_0x3eaf6c),_0x2a4d06[_0x1b9b4c('0x18')](_0x121cc8);}if(_0x20c6c6)_0x1960b3[_0x1b9b4c('0x28')](_0x1b9b4c('0x211'));}),PluginManager['registerCommand'](pluginData['name'],_0x5f4923('0x297'),_0x140327=>{const _0x197a36=_0x5f4923;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x197a36('0x3b4')](_0x140327,_0x140327);const _0x2cc222=$gameTemp[_0x197a36('0x7fd')](),_0x527f8c=VisuMZ[_0x197a36('0x2c')](_0x140327[_0x197a36('0x631')]),_0x41505c=_0x140327[_0x197a36('0x650')],_0x36499b=_0x140327['Duration'],_0x4d07f1=_0x140327[_0x197a36('0x7d4')],_0x2863a2=_0x140327[_0x197a36('0x42b')];if(!_0x2cc222)return;for(const _0x772737 of _0x527f8c){if('oUrrt'===_0x197a36('0x131')){function _0x30e3db(){const _0x4a34e1=_0x197a36;this[_0x4a34e1('0x389')][_0x4a34e1('0x3fd')]=this[_0x4a34e1('0x756')]['hasSvBattler'](),this[_0x4a34e1('0x454')]();}}else{if(!_0x772737)continue;_0x772737[_0x197a36('0x265')](_0x41505c,_0x36499b,_0x4d07f1);}}if(_0x2863a2)_0x2cc222[_0x197a36('0x28')](_0x197a36('0x649'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x538'),_0x4c8604=>{const _0x342edf=_0x5f4923;if(!SceneManager[_0x342edf('0x64e')]())return;VisuMZ['ConvertParams'](_0x4c8604,_0x4c8604);const _0x572627=$gameTemp[_0x342edf('0x7fd')](),_0x46d2fa=VisuMZ[_0x342edf('0x2c')](_0x4c8604['Targets']),_0x492162=_0x4c8604[_0x342edf('0x600')],_0x128254=_0x4c8604[_0x342edf('0x381')],_0x1b16ff=_0x4c8604['Duration'],_0x10b126=_0x4c8604[_0x342edf('0x7d4')],_0x339db7=_0x4c8604[_0x342edf('0x2f4')];if(!_0x572627)return;for(const _0x32097a of _0x46d2fa){if(!_0x32097a)continue;_0x32097a['growBattler'](_0x492162,_0x128254,_0x1b16ff,_0x10b126);}if(_0x339db7)_0x572627[_0x342edf('0x28')](_0x342edf('0x1e9'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Movement_Skew',_0x455ea7=>{const _0x283126=_0x5f4923;if(!SceneManager[_0x283126('0x64e')]())return;VisuMZ['ConvertParams'](_0x455ea7,_0x455ea7);const _0x5b17c8=$gameTemp[_0x283126('0x7fd')](),_0x25d1de=VisuMZ['CreateActionSequenceTargets'](_0x455ea7[_0x283126('0x631')]),_0x544e75=_0x455ea7[_0x283126('0x272')],_0x3334cb=_0x455ea7['SkewY'],_0x1b1faa=_0x455ea7[_0x283126('0x79d')],_0x44ac61=_0x455ea7[_0x283126('0x7d4')],_0x101fcc=_0x455ea7[_0x283126('0x37e')];if(!_0x5b17c8)return;for(const _0x4466c6 of _0x25d1de){if(!_0x4466c6)continue;_0x4466c6[_0x283126('0x66f')](_0x544e75,_0x3334cb,_0x1b1faa,_0x44ac61);}if(_0x101fcc)_0x5b17c8[_0x283126('0x28')](_0x283126('0x183'));}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0xdc'),_0x2f32a0=>{const _0x139ef1=_0x5f4923;if(!SceneManager[_0x139ef1('0x64e')]())return;VisuMZ[_0x139ef1('0x3b4')](_0x2f32a0,_0x2f32a0);const _0x4f6a1a=$gameTemp['getLastPluginCommandInterpreter'](),_0x55f54c=VisuMZ['CreateActionSequenceTargets'](_0x2f32a0[_0x139ef1('0x631')]),_0x23fe50=_0x2f32a0[_0x139ef1('0x42a')],_0x3d237a=_0x2f32a0[_0x139ef1('0x79d')],_0x5529ac=_0x2f32a0['EasingType'],_0x1fa12b=_0x2f32a0[_0x139ef1('0x62d')],_0x109ddd=_0x2f32a0[_0x139ef1('0x58e')];if(!_0x4f6a1a)return;for(const _0x2096f8 of _0x55f54c){if(!_0x2096f8)continue;_0x2096f8['spinBattler'](_0x23fe50,_0x3d237a,_0x5529ac,_0x1fa12b);}if(_0x109ddd)_0x4f6a1a['setWaitMode'](_0x139ef1('0x800'));}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Movement_WaitForFloat',_0x270aed=>{const _0x413524=_0x5f4923;if(!SceneManager[_0x413524('0x64e')]())return;const _0x1bf541=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x1bf541)return;_0x1bf541[_0x413524('0x28')](_0x413524('0x375'));}),PluginManager['registerCommand'](pluginData['name'],_0x5f4923('0x6dc'),_0x5d8b60=>{const _0x432041=_0x5f4923;if(!SceneManager['isSceneBattle']())return;const _0x41dcd7=$gameTemp[_0x432041('0x7fd')]();if(!_0x41dcd7)return;_0x41dcd7[_0x432041('0x28')](_0x432041('0x877'));}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x656'),_0x2f87b3=>{const _0x30f4fb=_0x5f4923;if(!SceneManager['isSceneBattle']())return;const _0x12d7ea=$gameTemp[_0x30f4fb('0x7fd')]();if(!_0x12d7ea)return;_0x12d7ea['setWaitMode']('battleMove');}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],'ActSeq_Movement_WaitForOpacity',_0x4a1847=>{const _0x6afab=_0x5f4923;if(!SceneManager[_0x6afab('0x64e')]())return;const _0x591bb7=$gameTemp[_0x6afab('0x7fd')]();if(!_0x591bb7)return;_0x591bb7[_0x6afab('0x28')](_0x6afab('0x649'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x151'),_0x118330=>{const _0x530c25=_0x5f4923;if(!SceneManager[_0x530c25('0x64e')]())return;const _0x4b4e4c=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4b4e4c)return;_0x4b4e4c[_0x530c25('0x28')](_0x530c25('0x1e9'));}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x29a'),_0xcecc60=>{const _0x43134f=_0x5f4923;if(!SceneManager[_0x43134f('0x64e')]())return;const _0x5cd113=$gameTemp[_0x43134f('0x7fd')]();if(!_0x5cd113)return;_0x5cd113['setWaitMode'](_0x43134f('0x183'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x3f0'),_0x1609f3=>{const _0x165cd5=_0x5f4923;if(!SceneManager[_0x165cd5('0x64e')]())return;const _0x4b227d=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4b227d)return;_0x4b227d[_0x165cd5('0x28')](_0x165cd5('0x800'));}),PluginManager[_0x5f4923('0x588')](pluginData['name'],_0x5f4923('0x1a7'),_0x45a0fa=>{const _0x5668a3=_0x5f4923;if(!SceneManager[_0x5668a3('0x64e')]())return;if(!Imported[_0x5668a3('0x620')])return;VisuMZ[_0x5668a3('0x3b4')](_0x45a0fa,_0x45a0fa);const _0x2ee3e9=$gameTemp['getLastPluginCommandInterpreter'](),_0x12a926=_0x45a0fa['WaitForSkew'];if(!_0x2ee3e9)return;$gameScreen['setBattleSkew'](_0x45a0fa[_0x5668a3('0x272')],_0x45a0fa[_0x5668a3('0x3ef')],_0x45a0fa[_0x5668a3('0x79d')],_0x45a0fa[_0x5668a3('0x7d4')]);if(_0x12a926)_0x2ee3e9[_0x5668a3('0x28')](_0x5668a3('0x3df'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Skew_Reset',_0x2f3aa3=>{const _0x3bce47=_0x5f4923;if(!SceneManager[_0x3bce47('0x64e')]())return;if(!Imported[_0x3bce47('0x620')])return;VisuMZ[_0x3bce47('0x3b4')](_0x2f3aa3,_0x2f3aa3);const _0x520b4c=$gameTemp[_0x3bce47('0x7fd')](),_0x2ba980=_0x2f3aa3[_0x3bce47('0x37e')];if(!_0x520b4c)return;$gameScreen[_0x3bce47('0x129')](0x0,0x0,_0x2f3aa3[_0x3bce47('0x79d')],_0x2f3aa3[_0x3bce47('0x7d4')]);if(_0x2ba980)_0x520b4c['setWaitMode'](_0x3bce47('0x3df'));}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x61a'),_0xf2e0de=>{const _0x4492e8=_0x5f4923;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4492e8('0x620')])return;const _0x3611cd=$gameTemp[_0x4492e8('0x7fd')]();if(!_0x3611cd)return;_0x3611cd[_0x4492e8('0x28')]('battleSkew');}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x338'),_0x262865=>{const _0x27a32b=_0x5f4923;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x27a32b('0x3b4')](_0x262865,_0x262865);const _0x13fb33=$gameTemp[_0x27a32b('0x7fd')](),_0x8dc1e3=_0x262865[_0x27a32b('0xe1')],_0x4d6466=_0x262865[_0x27a32b('0x583')];if(!_0x13fb33)return;BattleManager['_targetIndex']=_0x8dc1e3,BattleManager['_target']=BattleManager[_0x27a32b('0x57d')]?BattleManager['_allTargets'][BattleManager[_0x27a32b('0x2e9')]]||null:null,BattleManager['_target']&&_0x4d6466[_0x27a32b('0x667')]()[_0x27a32b('0x32d')]()!==_0x27a32b('0x580')&&_0x13fb33[_0x27a32b('0x28e')]([_0x4d6466]);}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],'ActSeq_Target_NextTarget',_0x49ff3d=>{const _0x146f28=_0x5f4923;if(!SceneManager[_0x146f28('0x64e')]())return;VisuMZ['ConvertParams'](_0x49ff3d,_0x49ff3d);const _0x14a328=$gameTemp[_0x146f28('0x7fd')](),_0x2ef686=_0x49ff3d['JumpToLabel'];if(!_0x14a328)return;BattleManager[_0x146f28('0x2e9')]++,BattleManager['_target']=BattleManager[_0x146f28('0x57d')][BattleManager[_0x146f28('0x2e9')]]||null,BattleManager[_0x146f28('0x2af')]&&_0x2ef686[_0x146f28('0x667')]()[_0x146f28('0x32d')]()!==_0x146f28('0x580')&&_0x14a328[_0x146f28('0x28e')]([_0x2ef686]);}),PluginManager['registerCommand'](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x2a4'),_0x2b4f4b=>{const _0x33f787=_0x5f4923;if(!SceneManager[_0x33f787('0x64e')]())return;VisuMZ[_0x33f787('0x3b4')](_0x2b4f4b,_0x2b4f4b);const _0x1646b9=$gameTemp['getLastPluginCommandInterpreter'](),_0x172a92=_0x2b4f4b[_0x33f787('0x583')];if(!_0x1646b9)return;BattleManager[_0x33f787('0x2e9')]--,BattleManager['_target']=BattleManager[_0x33f787('0x57d')][BattleManager[_0x33f787('0x2e9')]]||null;if(BattleManager[_0x33f787('0x2af')]&&_0x172a92[_0x33f787('0x667')]()[_0x33f787('0x32d')]()!==_0x33f787('0x580')){if(_0x33f787('0x5de')===_0x33f787('0x3b3')){function _0x4c6251(){const _0x3eb03a=_0x33f787;return this[_0x3eb03a('0x77f')]();}}else _0x1646b9[_0x33f787('0x28e')]([_0x172a92]);}}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x874'),_0x3ab2f9=>{const _0x4e8ff4=_0x5f4923;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4e8ff4('0x3b4')](_0x3ab2f9,_0x3ab2f9);const _0xfb9a8b=$gameTemp['getLastPluginCommandInterpreter'](),_0x5b3249=_0x3ab2f9[_0x4e8ff4('0x632')],_0x202752=_0x3ab2f9[_0x4e8ff4('0x583')];if(!_0xfb9a8b)return;const _0x1aeec7=BattleManager[_0x4e8ff4('0x2e9')];for(;;){BattleManager[_0x4e8ff4('0x2e9')]=Math[_0x4e8ff4('0x614')](BattleManager[_0x4e8ff4('0x57d')][_0x4e8ff4('0x568')]);if(!_0x5b3249)break;if(BattleManager[_0x4e8ff4('0x2e9')]!==_0x1aeec7)break;if(BattleManager[_0x4e8ff4('0x57d')][_0x4e8ff4('0x568')]<=0x1){BattleManager['_targetIndex']=0x0;break;}}BattleManager[_0x4e8ff4('0x2af')]=BattleManager['_allTargets'][BattleManager[_0x4e8ff4('0x2e9')]]||null,BattleManager[_0x4e8ff4('0x2af')]&&_0x202752[_0x4e8ff4('0x667')]()['trim']()!==_0x4e8ff4('0x580')&&_0xfb9a8b['command119']([_0x202752]);}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x625'),_0x16ad34=>{const _0x23af3d=_0x5f4923;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ['ConvertParams'](_0x16ad34,_0x16ad34);const _0x2623e4=$gameTemp[_0x23af3d('0x7fd')](),_0x1b5369=_0x16ad34['WaitForZoom'];if(!_0x2623e4)return;$gameScreen[_0x23af3d('0x31d')](_0x16ad34[_0x23af3d('0x47a')],_0x16ad34['Duration'],_0x16ad34['EasingType']);if(_0x1b5369)_0x2623e4[_0x23af3d('0x28')]('battleZoom');}),PluginManager[_0x5f4923('0x588')](pluginData[_0x5f4923('0x28b')],_0x5f4923('0x53c'),_0xb765bc=>{const _0x5b1fa9=_0x5f4923;if(!SceneManager[_0x5b1fa9('0x64e')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x5b1fa9('0x3b4')](_0xb765bc,_0xb765bc);const _0x4b5392=$gameTemp[_0x5b1fa9('0x7fd')](),_0x4a7662=_0xb765bc['WaitForZoom'];if(!_0x4b5392)return;$gameScreen[_0x5b1fa9('0x31d')](0x1,_0xb765bc[_0x5b1fa9('0x79d')],_0xb765bc['EasingType']);if(_0x4a7662)_0x4b5392[_0x5b1fa9('0x28')]('battleZoom');}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Zoom_WaitForZoom',_0x2e080e=>{const _0x52bfc0=_0x5f4923;if(!SceneManager[_0x52bfc0('0x64e')]())return;if(!Imported[_0x52bfc0('0x620')])return;const _0x5adc36=$gameTemp[_0x52bfc0('0x7fd')]();if(!_0x5adc36)return;_0x5adc36[_0x52bfc0('0x28')](_0x52bfc0('0x42c'));}),VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x2a5')]=Scene_Boot[_0x5f4923('0x14f')]['onDatabaseLoaded'],Scene_Boot[_0x5f4923('0x14f')][_0x5f4923('0x6c9')]=function(){const _0xc5d117=_0x5f4923;VisuMZ[_0xc5d117('0x88d')][_0xc5d117('0x2a5')][_0xc5d117('0x618')](this),this['process_VisuMZ_BattleCore_Notetags']();},Scene_Boot[_0x5f4923('0x14f')][_0x5f4923('0x757')]=function(){const _0x54a09d=_0x5f4923;this[_0x54a09d('0x7a')](),this[_0x54a09d('0x5cb')](),this[_0x54a09d('0x8a')](),this['process_VisuMZ_BattleCore_CreateRegExp'](),this[_0x54a09d('0x2ae')](),this[_0x54a09d('0x2ee')](),this[_0x54a09d('0x16b')](),this[_0x54a09d('0x221')]();},Scene_Boot[_0x5f4923('0x14f')][_0x5f4923('0x7a')]=function(){const _0xde53a3=_0x5f4923,_0x2dcf2e=$dataSystem[_0xde53a3('0x7cd')][_0xde53a3('0x568')];for(let _0x33ac90=0x0;_0x33ac90<_0x2dcf2e;_0x33ac90++){const _0x4e3fa9=$dataSystem['attackMotions'][_0x33ac90];if(_0x4e3fa9)continue;$dataSystem['attackMotions'][_0x33ac90]=JsonEx[_0xde53a3('0x206')]($dataSystem[_0xde53a3('0x462')][0x0]);}},Scene_Boot[_0x5f4923('0x14f')]['process_VisuMZ_BattleCore_PluginParams']=function(){const _0x3754cf=_0x5f4923,_0x40cea0=VisuMZ[_0x3754cf('0x88d')]['Settings'];_0x40cea0[_0x3754cf('0x15d')]['PopupPosition']===undefined&&(_0x40cea0[_0x3754cf('0x15d')][_0x3754cf('0x26b')]='base'),_0x40cea0['Actor']['SmoothImage']===undefined&&(_0x40cea0[_0x3754cf('0x5dc')]['SmoothImage']=![]),_0x40cea0['Enemy'][_0x3754cf('0x612')]===undefined&&(_0x40cea0[_0x3754cf('0x510')][_0x3754cf('0x612')]=!![]),_0x40cea0['Actor'][_0x3754cf('0x5da')]===undefined&&(_0x40cea0[_0x3754cf('0x5dc')][_0x3754cf('0x5da')]=![]),_0x40cea0['Actor']['PrioritySortActors']===undefined&&(_0x40cea0[_0x3754cf('0x5dc')][_0x3754cf('0x71e')]=!![]);},VisuMZ[_0x5f4923('0x5a')]={},Scene_Boot[_0x5f4923('0x14f')][_0x5f4923('0x8a')]=function(){const _0x22f52d=_0x5f4923;for(const _0x44f5b2 of VisuMZ[_0x22f52d('0x88d')]['Settings'][_0x22f52d('0x15d')][_0x22f52d('0x38b')]){if(!_0x44f5b2)continue;const _0x16c5d1=_0x44f5b2['Name']['toUpperCase']()[_0x22f52d('0x32d')]();VisuMZ[_0x22f52d('0x5a')][_0x16c5d1]=_0x44f5b2;}},VisuMZ['BattleCore'][_0x5f4923('0x3d4')]={},Scene_Boot[_0x5f4923('0x14f')][_0x5f4923('0x7dd')]=function(){const _0x1043f6=_0x5f4923,_0x35ba00=VisuMZ[_0x1043f6('0x88d')][_0x1043f6('0x3d4')],_0x21decb=_0x1043f6('0x261'),_0xb0553c=[[_0x1043f6('0x4c1'),_0x1043f6('0x670')],['Post','POST-']],_0x34dac6=[[_0x1043f6('0x694'),_0x1043f6('0x5ab')],['%1Damage%2JS','JS\x20%1DAMAGE\x20%2']],_0x5d7af0=[['',''],[_0x1043f6('0xfd'),_0x1043f6('0x2dd')],[_0x1043f6('0x139'),_0x1043f6('0x712')]];for(const _0xcaf00b of _0x34dac6){if(_0x1043f6('0x53e')==='Uedca')for(const _0x4dae67 of _0x5d7af0){for(const _0x246dcd of _0xb0553c){const _0x20b9e6=_0xcaf00b[0x0][_0x1043f6('0x6e6')](_0x246dcd[0x0],_0x4dae67[0x0]),_0x262028=_0xcaf00b[0x1][_0x1043f6('0x6e6')](_0x246dcd[0x1],_0x4dae67[0x1])[_0x1043f6('0x32d')](),_0x307e27=new RegExp(_0x21decb[_0x1043f6('0x6e6')](_0x262028),'i');_0x35ba00[_0x20b9e6]=_0x307e27;}}else{function _0x7abf9(){const _0x1c150a=_0x1043f6,_0xd8af2d=_0x1ff743[_0x1c150a('0x7b')],_0x347586=_0x1c150a('0x5f4');this['addCommand'](_0xd8af2d,_0x347586);}}}const _0x141e18=[[_0x1043f6('0x743'),'JS\x20%1START\x20ACTION'],[_0x1043f6('0x530'),_0x1043f6('0x6a3')]];for(const _0x40c106 of _0x141e18){for(const _0x19ff3e of _0xb0553c){const _0x4e716b=_0x40c106[0x0][_0x1043f6('0x6e6')](_0x19ff3e[0x0]),_0x553793=_0x40c106[0x1][_0x1043f6('0x6e6')](_0x19ff3e[0x1]),_0x352954=new RegExp(_0x21decb['format'](_0x553793),'i');_0x35ba00[_0x4e716b]=_0x352954;}}const _0x15422d=[[_0x1043f6('0x3c8'),_0x1043f6('0x8c')],[_0x1043f6('0x5fb'),_0x1043f6('0x24')],[_0x1043f6('0x350'),_0x1043f6('0x2b8')],[_0x1043f6('0x50f'),_0x1043f6('0x485')],[_0x1043f6('0x7e3'),_0x1043f6('0x448')],[_0x1043f6('0x232'),'JS\x20ESCAPE\x20FAILURE'],[_0x1043f6('0x44b'),'JS\x20%1START\x20TURN'],[_0x1043f6('0x41f'),_0x1043f6('0x78d')],['%1RegenerateJS',_0x1043f6('0x1ed')]];for(const _0x4f6f8b of _0x15422d){for(const _0x2f34b8 of _0xb0553c){if(_0x1043f6('0x43c')!==_0x1043f6('0x84e')){const _0x5d3a09=_0x4f6f8b[0x0][_0x1043f6('0x6e6')](_0x2f34b8[0x0]),_0x3ed9b6=_0x4f6f8b[0x1][_0x1043f6('0x6e6')](_0x2f34b8[0x1]),_0x42244e=new RegExp(_0x21decb[_0x1043f6('0x6e6')](_0x3ed9b6),'i');_0x35ba00[_0x5d3a09]=_0x42244e;}else{function _0x29b266(){const _0x8f12cd=_0x1043f6;if(_0x526232==='victory')this[_0x8f12cd('0x84')]=!![];if(this[_0x8f12cd('0x756')]&&this[_0x8f12cd('0x756')][_0x8f12cd('0x110')]()){this[_0x8f12cd('0x12b')]=_0x5238aa['MOTIONS']['dead'];return;}const _0x18deae=_0x2ee176[_0x8f12cd('0x6c')][_0x3fd3f5];this[_0x8f12cd('0x12b')]=_0x18deae,this['_motionCount']=0x0,this['_pattern']=0x0;}}}}},Scene_Boot['prototype']['process_VisuMZ_BattleCore_Action_Notetags']=function(){const _0x48a4cc=_0x5f4923,_0x3ceb66=$dataSkills[_0x48a4cc('0x81e')]($dataItems),_0xdbbb9d=[_0x48a4cc('0x4a2'),_0x48a4cc('0x5f'),_0x48a4cc('0x7c7'),_0x48a4cc('0x27e'),_0x48a4cc('0x2f9'),_0x48a4cc('0x4de'),'PreEndActionJS',_0x48a4cc('0x277')];for(const _0x364f82 of _0x3ceb66){if(!_0x364f82)continue;for(const _0x578f13 of _0xdbbb9d){if(_0x48a4cc('0x3c4')===_0x48a4cc('0x51e')){function _0x2ecb08(){const _0x13022f=_0x48a4cc;return _0x13022f('0x6fe');}}else VisuMZ[_0x48a4cc('0x88d')][_0x48a4cc('0x469')](_0x364f82,_0x578f13);}const _0x193516=_0x364f82[_0x48a4cc('0x331')];_0x193516[_0x48a4cc('0x5ae')](/<ALWAYS CRITICAL/i)&&(_0x364f82[_0x48a4cc('0x11b')][_0x48a4cc('0x176')]=!![]);if(_0x193516[_0x48a4cc('0x5ae')](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)){if(_0x48a4cc('0x4e')==='rXzyB'){function _0x44fe9d(){const _0xe37573=_0x48a4cc;return this[_0xe37573('0x87c')];}}else _0x364f82[_0x48a4cc('0x746')]=Math[_0x48a4cc('0x489')](0x1,Number(RegExp['$1']));}_0x193516[_0x48a4cc('0x5ae')](/<TARGET:[ ](.*)>/i)&&(_0x364f82[_0x48a4cc('0x59b')]=String(RegExp['$1'])[_0x48a4cc('0x667')]()[_0x48a4cc('0x32d')]());}},Scene_Boot[_0x5f4923('0x14f')]['process_VisuMZ_BattleCore_TraitObject_Notetags']=function(){const _0x18cb25=_0x5f4923,_0x1b17b0=$dataActors[_0x18cb25('0x81e')]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates),_0x34912f=[_0x18cb25('0x360'),_0x18cb25('0x7a9'),_0x18cb25('0x4fc'),_0x18cb25('0x6b0'),'PreApplyAsTargetJS',_0x18cb25('0x83e'),_0x18cb25('0x100'),_0x18cb25('0x1ee'),_0x18cb25('0x2f9'),_0x18cb25('0x4de'),_0x18cb25('0x4c3'),'PostEndActionJS','PreStartBattleJS',_0x18cb25('0x854'),_0x18cb25('0x24a'),'PostEndBattleJS',_0x18cb25('0x350'),_0x18cb25('0x50f'),'EscapeSuccessJS',_0x18cb25('0x232'),_0x18cb25('0x55'),_0x18cb25('0x633'),_0x18cb25('0x490'),_0x18cb25('0x4d'),_0x18cb25('0xa5'),_0x18cb25('0x52a')];for(const _0x2342ee of _0x1b17b0){if(!_0x2342ee)continue;for(const _0x5f0f5a of _0x34912f){if(_0x18cb25('0x98')!==_0x18cb25('0x81a'))VisuMZ['BattleCore'][_0x18cb25('0x469')](_0x2342ee,_0x5f0f5a);else{function _0x4cdad5(){this['createHpGaugeSprite']();}}}const _0x43819e=_0x2342ee[_0x18cb25('0x331')];}},VisuMZ[_0x5f4923('0x88d')]['JS']={},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x469')]=function(_0xd12cb0,_0xed073a){const _0x2b4750=_0x5f4923,_0x5a848e=_0xd12cb0[_0x2b4750('0x331')];if(_0x5a848e['match'](VisuMZ[_0x2b4750('0x88d')][_0x2b4750('0x3d4')][_0xed073a])){if('lTQol'!==_0x2b4750('0x2e5')){function _0x1b76a1(){const _0x18beb2=_0x2b4750;if(this[_0x18beb2('0x834')]<=0x0)return;if(!this['_distortionSprite'])return;const _0x2937c4=this[_0x18beb2('0x834')],_0x2b7b9d=this[_0x18beb2('0x85e')],_0x4f9d23=this[_0x18beb2('0x6a6')],_0x365ca0=this['_distortionSprite'];_0x265a0d[_0x18beb2('0x4f6')]?(_0x365ca0[_0x18beb2('0x58c')]['x']=this[_0x18beb2('0x3fc')](_0x365ca0[_0x18beb2('0x58c')]['x'],this['_targetSkewX'],_0x2937c4,_0x2b7b9d,_0x4f9d23),_0x365ca0[_0x18beb2('0x58c')]['y']=this['applyEasing'](_0x365ca0[_0x18beb2('0x58c')]['y'],this[_0x18beb2('0x5f6')],_0x2937c4,_0x2b7b9d,_0x4f9d23)):(_0x365ca0[_0x18beb2('0x58c')]['x']=(_0x365ca0[_0x18beb2('0x58c')]['x']*(_0x2937c4-0x1)+this['_targetSkewX'])/_0x2937c4,_0x365ca0['skew']['y']=(_0x365ca0[_0x18beb2('0x58c')]['y']*(_0x2937c4-0x1)+this[_0x18beb2('0x5f6')])/_0x2937c4);this[_0x18beb2('0x834')]--;if(this[_0x18beb2('0x834')]<=0x0)this[_0x18beb2('0x696')]();}}else{const _0x34b622=String(RegExp['$1']),_0x3dd1cb=_0x2b4750('0x4a6')[_0x2b4750('0x6e6')](_0x34b622),_0x30ae31=VisuMZ[_0x2b4750('0x88d')]['createKeyJS'](_0xd12cb0,_0xed073a);VisuMZ['BattleCore']['JS'][_0x30ae31]=new Function(_0x3dd1cb);}}},VisuMZ[_0x5f4923('0x88d')]['createKeyJS']=function(_0x34f467,_0x14618a){const _0xd24769=_0x5f4923;let _0x3c80c0='';if($dataActors[_0xd24769('0x147')](_0x34f467))_0x3c80c0=_0xd24769('0x3be')[_0xd24769('0x6e6')](_0x34f467['id'],_0x14618a);if($dataClasses[_0xd24769('0x147')](_0x34f467))_0x3c80c0=_0xd24769('0x527')['format'](_0x34f467['id'],_0x14618a);if($dataSkills[_0xd24769('0x147')](_0x34f467))_0x3c80c0='Skill-%1-%2'[_0xd24769('0x6e6')](_0x34f467['id'],_0x14618a);if($dataItems[_0xd24769('0x147')](_0x34f467))_0x3c80c0=_0xd24769('0x878')[_0xd24769('0x6e6')](_0x34f467['id'],_0x14618a);if($dataWeapons[_0xd24769('0x147')](_0x34f467))_0x3c80c0=_0xd24769('0x6c8')['format'](_0x34f467['id'],_0x14618a);if($dataArmors[_0xd24769('0x147')](_0x34f467))_0x3c80c0=_0xd24769('0x82c')['format'](_0x34f467['id'],_0x14618a);if($dataEnemies[_0xd24769('0x147')](_0x34f467))_0x3c80c0=_0xd24769('0x9f')['format'](_0x34f467['id'],_0x14618a);if($dataStates[_0xd24769('0x147')](_0x34f467))_0x3c80c0=_0xd24769('0x154')[_0xd24769('0x6e6')](_0x34f467['id'],_0x14618a);return _0x3c80c0;},Scene_Boot['prototype'][_0x5f4923('0x16b')]=function(){const _0x2a74ac=_0x5f4923,_0x177134=VisuMZ['BattleCore'][_0x2a74ac('0x39b')]['Mechanics']['BaseTroopIDs'],_0x5d0e72=[];for(const _0x79651f of _0x177134){if(_0x2a74ac('0x437')===_0x2a74ac('0x7d7')){function _0x58bb75(){_0x41680a=(_0x541131+_0x124ddc)/0x2;}}else{const _0x5ed473=$dataTroops[_0x79651f];if(_0x5ed473)_0x5d0e72[_0x2a74ac('0x2fc')](JsonEx['makeDeepCopy'](_0x5ed473));}}for(const _0x13f0b2 of $dataTroops){if(_0x2a74ac('0x810')!=='aaAQf'){if(!_0x13f0b2)continue;for(const _0x46821e of _0x5d0e72){if('ZkxXa'===_0x2a74ac('0x644')){function _0x576f00(){const _0x49323f=_0x2a74ac;return _0x3fdb9b['BattleCore'][_0x49323f('0x761')][_0x49323f('0x618')](this);}}else{if(_0x46821e['id']===_0x13f0b2['id'])continue;_0x13f0b2['pages']=_0x13f0b2[_0x2a74ac('0x2d6')]['concat'](_0x46821e[_0x2a74ac('0x2d6')]);}}}else{function _0x186dd6(){const _0x41e961=_0x2a74ac;this['addFightCommand'](),this[_0x41e961('0x2c0')](),this['addCustomCommands'](),this[_0x41e961('0x504')](),this[_0x41e961('0x2ed')]();}}}},Scene_Boot[_0x5f4923('0x14f')]['process_VisuMZ_BattleCore_jsFunctions']=function(){const _0x17fa9b=_0x5f4923,_0x373681=$dataSkills[_0x17fa9b('0x81e')]($dataItems);for(const _0x301220 of _0x373681){if(_0x17fa9b('0x4cb')===_0x17fa9b('0x69c')){function _0x1391fd(){const _0x2b1f0f=_0x17fa9b;this[_0x2b1f0f('0x3b6')]();}}else{if(!_0x301220)continue;const _0x4e8591=_0x301220['note'];if(_0x301220['note'][_0x17fa9b('0x5ae')](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x3f4105=String(RegExp['$1']),_0x10f5a4=VisuMZ[_0x17fa9b('0x88d')][_0x17fa9b('0x34b')](_0x301220,_0x17fa9b('0x631'));VisuMZ['BattleCore']['createTargetsJS'](_0x3f4105,_0x10f5a4);}if(_0x301220['note'][_0x17fa9b('0x5ae')](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x11209b=String(RegExp['$1']),_0x227432=VisuMZ['BattleCore'][_0x17fa9b('0x34b')](_0x301220,_0x17fa9b('0x884'));VisuMZ['BattleCore'][_0x17fa9b('0x45a')](_0x11209b,_0x227432);}}}},VisuMZ['BattleCore'][_0x5f4923('0x6c1')]=function(_0x4028af,_0x5a7fd9){const _0x2dfe70=_0x5f4923,_0x2c5a86=_0x2dfe70('0x3c0')[_0x2dfe70('0x6e6')](_0x4028af);VisuMZ[_0x2dfe70('0x88d')]['JS'][_0x5a7fd9]=new Function(_0x2c5a86);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x45a')]=function(_0x3a6720,_0x5c605e){const _0x4cae06=_0x5f4923,_0x256191=_0x4cae06('0x415')['format'](_0x3a6720);VisuMZ[_0x4cae06('0x88d')]['JS'][_0x5c605e]=new Function(_0x256191);},TextManager[_0x5f4923('0x32c')]=VisuMZ['BattleCore']['Settings'][_0x5f4923('0x185')][_0x5f4923('0x29e')],TextManager[_0x5f4923('0x304')]=VisuMZ[_0x5f4923('0x88d')]['Settings']['AutoBattle'][_0x5f4923('0x32e')],TextManager[_0x5f4923('0x7b')]=VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x39b')][_0x5f4923('0x553')][_0x5f4923('0x2b7')],TextManager['visualHpGauge']=VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x39b')]['HpGauge'][_0x5f4923('0x6aa')],ColorManager[_0x5f4923('0x76')]=function(_0xa98af0){const _0x5839c4=_0x5f4923;_0xa98af0=String(_0xa98af0);if(_0xa98af0[_0x5839c4('0x5ae')](/#(.*)/i))return _0x5839c4('0x2de')[_0x5839c4('0x6e6')](String(RegExp['$1']));else{if(_0x5839c4('0x6e')!==_0x5839c4('0x4b7'))return this[_0x5839c4('0x1e8')](Number(_0xa98af0));else{function _0x48a44b(){return!![];}}}},DataManager[_0x5f4923('0x3d2')]=function(_0x131c0b){const _0x8b96f6=_0x5f4923;if(_0x131c0b[_0x8b96f6('0x331')][_0x8b96f6('0x5ae')](/<DAMAGE STYLE:[ ](.*)>/i)){if(_0x8b96f6('0x186')===_0x8b96f6('0x37')){function _0x4edb64(){const _0x7f1b0f=_0x8b96f6;this['push']('performSubstitute',_0x11b1de,_0x403135);if(!_0x3eb1be['BattleCore'][_0x7f1b0f('0x39b')][_0x7f1b0f('0xb1')]['ShowSubstitute'])return;const _0x36fd3f=_0x297e51[_0x7f1b0f('0x28b')](),_0x1f2613=_0x3a4f0e[_0x7f1b0f('0x31b')][_0x7f1b0f('0x6e6')](_0x36fd3f,_0x4db2e9[_0x7f1b0f('0x28b')]());this[_0x7f1b0f('0x2fc')]('addText',_0x1f2613);}}else{const _0x11f876=String(RegExp['$1'])['toUpperCase']()[_0x8b96f6('0x32d')]();if(_0x11f876===_0x8b96f6('0x62b'))return _0x8b96f6('0x62b');if(VisuMZ[_0x8b96f6('0x5a')][_0x11f876])return _0x11f876;}}const _0x1037b7=VisuMZ[_0x8b96f6('0x88d')][_0x8b96f6('0x39b')][_0x8b96f6('0x15d')][_0x8b96f6('0x21f')][_0x8b96f6('0x667')]()[_0x8b96f6('0x32d')]();if(VisuMZ[_0x8b96f6('0x5a')][_0x1037b7])return _0x1037b7;return _0x8b96f6('0x62b');},DataManager[_0x5f4923('0x1a')]=function(_0x34fd69){const _0x4a7ef1=_0x5f4923;_0x34fd69=_0x34fd69[_0x4a7ef1('0x667')]()[_0x4a7ef1('0x32d')](),this['_stypeIDs']=this[_0x4a7ef1('0x2a1')]||{};if(this['_stypeIDs'][_0x34fd69])return this[_0x4a7ef1('0x2a1')][_0x34fd69];for(let _0x535d8e=0x1;_0x535d8e<0x64;_0x535d8e++){if(!$dataSystem[_0x4a7ef1('0x742')][_0x535d8e])continue;let _0x36404a=$dataSystem[_0x4a7ef1('0x742')][_0x535d8e][_0x4a7ef1('0x667')]()['trim']();_0x36404a=_0x36404a[_0x4a7ef1('0x3bd')](/\x1I\[(\d+)\]/gi,''),_0x36404a=_0x36404a['replace'](/\\I\[(\d+)\]/gi,''),this[_0x4a7ef1('0x2a1')][_0x36404a]=_0x535d8e;}return this['_stypeIDs'][_0x34fd69]||0x0;},DataManager[_0x5f4923('0xec')]=function(_0x2eb290){const _0x26faf9=_0x5f4923;_0x2eb290=_0x2eb290[_0x26faf9('0x667')]()[_0x26faf9('0x32d')](),this[_0x26faf9('0x572')]=this[_0x26faf9('0x572')]||{};if(this[_0x26faf9('0x572')][_0x2eb290])return this[_0x26faf9('0x572')][_0x2eb290];for(const _0x5b6a53 of $dataSkills){if(!_0x5b6a53)continue;this[_0x26faf9('0x572')][_0x5b6a53[_0x26faf9('0x28b')][_0x26faf9('0x667')]()[_0x26faf9('0x32d')]()]=_0x5b6a53['id'];}return this[_0x26faf9('0x572')][_0x2eb290]||0x0;},DataManager[_0x5f4923('0x781')]=function(_0x327165){const _0x3e9ffa=_0x5f4923;_0x327165=_0x327165[_0x3e9ffa('0x667')]()[_0x3e9ffa('0x32d')](),this[_0x3e9ffa('0x802')]=this[_0x3e9ffa('0x802')]||{};if(this[_0x3e9ffa('0x802')][_0x327165])return this[_0x3e9ffa('0x802')][_0x327165];for(const _0x2e6093 of $dataEnemies){if(!_0x2e6093)continue;this[_0x3e9ffa('0x802')][_0x2e6093[_0x3e9ffa('0x28b')][_0x3e9ffa('0x667')]()['trim']()]=_0x2e6093['id'];}return this[_0x3e9ffa('0x802')][_0x327165]||0x0;},DataManager[_0x5f4923('0x171')]=function(_0x17ccb6){const _0x12a0cf=_0x5f4923;_0x17ccb6=_0x17ccb6[_0x12a0cf('0x667')]()['trim'](),this[_0x12a0cf('0x7af')]=this[_0x12a0cf('0x7af')]||{};if(this[_0x12a0cf('0x7af')][_0x17ccb6])return this[_0x12a0cf('0x7af')][_0x17ccb6];for(let _0x4e3b0d=0x1;_0x4e3b0d<0x64;_0x4e3b0d++){if(!$dataSystem[_0x12a0cf('0x7cd')][_0x4e3b0d])continue;let _0x1fb1be=$dataSystem[_0x12a0cf('0x7cd')][_0x4e3b0d][_0x12a0cf('0x667')]()[_0x12a0cf('0x32d')]();_0x1fb1be=_0x1fb1be['replace'](/\x1I\[(\d+)\]/gi,''),_0x1fb1be=_0x1fb1be['replace'](/\\I\[(\d+)\]/gi,''),this[_0x12a0cf('0x7af')][_0x1fb1be]=_0x4e3b0d;}return this[_0x12a0cf('0x7af')][_0x12a0cf('0x34')]=0x0,this[_0x12a0cf('0x7af')][_0x17ccb6]||0x0;},DataManager[_0x5f4923('0x646')]=function(_0x6bb2be){const _0x3d5147=_0x5f4923,_0x16d6bc=_0x3d5147('0x570');let _0x4e5a44=_0x6bb2be[_0x3d5147('0x515')],_0x1c14b=_0x6bb2be[_0x3d5147('0x28b')];const _0xd7b961=_0x6bb2be[_0x3d5147('0x331')];_0xd7b961[_0x3d5147('0x5ae')](/<DISPLAY ICON: (\d+)>/i)&&(_0x4e5a44=Number(RegExp['$1']));if(_0xd7b961[_0x3d5147('0x5ae')](/<DISPLAY TEXT: (.*)>/i)){if(_0x3d5147('0xc9')===_0x3d5147('0xc9'))_0x1c14b=String(RegExp['$1']);else{function _0x288514(){const _0x437ab1=_0x3d5147;this[_0x437ab1('0x1b8')]-=0x10;}}}return _0x16d6bc[_0x3d5147('0x6e6')](_0x4e5a44,_0x1c14b);},DataManager['battleCommandName']=function(_0x1765ab){const _0x2d131c=_0x5f4923;if(_0x1765ab[_0x2d131c('0x331')]['match'](/<COMMAND TEXT: (.*)>/i)){if(_0x2d131c('0x39e')===_0x2d131c('0x39e'))return String(RegExp['$1']);else{function _0xc93f41(){const _0x48acb8=_0x2d131c;_0x5d7a39[_0x48acb8('0x88d')][_0x48acb8('0x66e')]['call'](this,_0x12e827),this[_0x48acb8('0x197')](_0x48e2a7);}}}else{if(_0x2d131c('0x7b4')!==_0x2d131c('0x3a9'))return _0x1765ab[_0x2d131c('0x28b')];else{function _0x18a754(){const _0x357455=_0x2d131c;_0x24a8b7[_0x357455('0x88d')][_0x357455('0x556')][_0x357455('0x618')](this),this[_0x357455('0x4db')]();}}}},DataManager['battleCommandIcon']=function(_0x453613){const _0x4d6ae7=_0x5f4923;return _0x453613[_0x4d6ae7('0x331')]['match'](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0x453613[_0x4d6ae7('0x515')];},DataManager[_0x5f4923('0x41e')]=function(_0x2020e9){const _0x59c942=_0x5f4923,_0x2900ab=$dataEnemies[_0x2020e9];if(_0x2900ab){if(_0x2900ab['note'][_0x59c942('0x5ae')](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){if(_0x59c942('0x84c')!==_0x59c942('0x2d1')){const _0x4560de=String(RegExp['$1'])[_0x59c942('0x203')](/[\r\n]+/)[_0x59c942('0x835')](''),_0x26f1c1=this['processRandomizedData'](_0x4560de);_0x2020e9=this['getEnemyIdWithName'](_0x26f1c1)||_0x2020e9,_0x2020e9=DataManager[_0x59c942('0x41e')](_0x2020e9);}else{function _0x3b51a9(){const _0x50bfd5=_0x59c942;if(!this[_0x50bfd5('0x1ea')]())return;if(!this[_0x50bfd5('0x23c')])return;if(this[_0x50bfd5('0x604')]===_0x462acd&&this[_0x50bfd5('0x7f5')]===_0x1a74c5)return;this['_targetGrowX']=_0x29ff41,this['_targetGrowY']=_0x130987,this[_0x50bfd5('0x9b')]=_0x47185a,this[_0x50bfd5('0x7f')]=_0x34205e,this[_0x50bfd5('0x27f')]=_0x494f17||_0x50bfd5('0x662'),_0xc34371<=0x0&&(this[_0x50bfd5('0x1bb')]=this[_0x50bfd5('0x604')],this[_0x50bfd5('0x167')]=this[_0x50bfd5('0x7f5')]);}}}}return _0x2020e9;},DataManager[_0x5f4923('0x74b')]=function(_0xbc6cca){const _0x4bbc45=_0x5f4923;let _0x133d79=0x0;const _0x326b2d={};for(const _0x4130a4 of _0xbc6cca){if('TaZpS'===_0x4bbc45('0x425')){if(_0x4130a4[_0x4bbc45('0x5ae')](/(.*):[ ](\d+)/i)){const _0x387e5f=String(RegExp['$1'])[_0x4bbc45('0x32d')](),_0x1c4d45=Number(RegExp['$2']);_0x326b2d[_0x387e5f]=_0x1c4d45,_0x133d79+=_0x1c4d45;}else{if(_0x4130a4[_0x4bbc45('0x5ae')](/(.*):[ ](\d+\.?\d+)/i)){const _0x392719=String(RegExp['$1'])[_0x4bbc45('0x32d')](),_0x1e1cc3=Number(RegExp['$2']);_0x326b2d[_0x392719]=_0x1e1cc3,_0x133d79+=_0x1e1cc3;}else{if(_0x4130a4!==''){if(_0x4bbc45('0x573')===_0x4bbc45('0x2e4')){function _0x42cac1(){const _0x1a3607=_0x562c6d[_0x40fe46];if(_0x1a3607)_0x29cdd5['push'](_0x3335c2['makeDeepCopy'](_0x1a3607));}}else _0x326b2d[_0x4130a4]=0x1,_0x133d79++;}}}}else{function _0x17d70a(){const _0x5e30f3=_0x4bbc45;if(!_0x3a14f1[_0x5e30f3('0x64e')]())return![];if(!_0x445ada)return![];if(!_0x3aa9c5[_0x5e30f3('0x555')]())return![];if(_0xf7ba19['item']()[_0x5e30f3('0x331')][_0x5e30f3('0x5ae')](/<CUSTOM ACTION SEQUENCE>/i))return!![];return![];}}}if(_0x133d79<=0x0)return'';let _0x3c33eb=Math[_0x4bbc45('0x486')]()*_0x133d79;for(const _0x37a7b4 in _0x326b2d){if(_0x4bbc45('0x319')!=='sFJZu'){function _0x452c3f(){const _0x449a1c=_0x4bbc45;this[_0x449a1c('0x280')]=this['x'],this[_0x449a1c('0x674')]=this['y'],this['updateFloat'](),this[_0x449a1c('0x46')](),this['x']+=this[_0x449a1c('0x6bc')](),this['y']+=this[_0x449a1c('0x652')](),this['x']=_0x439c62[_0x449a1c('0x774')](this['x']),this['y']=_0x3e815d['round'](this['y']);}}else{_0x3c33eb-=_0x326b2d[_0x37a7b4];if(_0x3c33eb<=0x0)return _0x37a7b4;}}return'';},ConfigManager[_0x5f4923('0x1d8')]=![],ConfigManager['autoBattleUseSkills']=![],ConfigManager['visualHpGauge']=!![],VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x797')]=ConfigManager[_0x5f4923('0x28f')],ConfigManager[_0x5f4923('0x28f')]=function(){const _0x2515d5=_0x5f4923,_0x568fc6=VisuMZ[_0x2515d5('0x88d')]['ConfigManager_makeData']['call'](this);return _0x568fc6['autoBattleAtStart']=this[_0x2515d5('0x1d8')],_0x568fc6[_0x2515d5('0x5f4')]=this[_0x2515d5('0x5f4')],_0x568fc6[_0x2515d5('0xb8')]=this[_0x2515d5('0xb8')],_0x568fc6;},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x11d')]=ConfigManager['applyData'],ConfigManager[_0x5f4923('0x724')]=function(_0x598780){const _0x18ba5f=_0x5f4923;VisuMZ[_0x18ba5f('0x88d')][_0x18ba5f('0x11d')][_0x18ba5f('0x618')](this,_0x598780);_0x18ba5f('0x1d8')in _0x598780?this[_0x18ba5f('0x1d8')]=_0x598780[_0x18ba5f('0x1d8')]:this[_0x18ba5f('0x1d8')]=![];if(_0x18ba5f('0x5f4')in _0x598780)this[_0x18ba5f('0x5f4')]=_0x598780[_0x18ba5f('0x5f4')];else{if(_0x18ba5f('0x52d')==='eIlyT'){function _0x3e3f82(){const _0x14272e=_0x18ba5f;this['_growX']=this[_0x14272e('0x3fc')](this[_0x14272e('0x1bb')],this[_0x14272e('0x604')],_0x5a75fd,_0x15053a,_0x38a97f),this[_0x14272e('0x167')]=this[_0x14272e('0x3fc')](this[_0x14272e('0x167')],this[_0x14272e('0x7f5')],_0x28e47f,_0x1df096,_0x410e61);}}else this[_0x18ba5f('0x5f4')]=![];}if(_0x18ba5f('0xb8')in _0x598780){if(_0x18ba5f('0x1f8')!==_0x18ba5f('0x1f8')){function _0x5f46e5(){const _0x516db1=_0x18ba5f;this[_0x516db1('0xc5')][_0x516db1('0x7aa')]();}}else this[_0x18ba5f('0xb8')]=_0x598780[_0x18ba5f('0xb8')];}else{if(_0x18ba5f('0x75c')===_0x18ba5f('0x75c'))this[_0x18ba5f('0xb8')]=!![];else{function _0x312852(){const _0x399996=_0x18ba5f;return _0x3011ae[_0x399996('0x14f')][_0x399996('0x14a')][_0x399996('0x618')](this);}}}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x6a')]=BattleManager[_0x5f4923('0x7b8')],BattleManager[_0x5f4923('0x7b8')]=function(){const _0x1bd914=_0x5f4923;VisuMZ['BattleCore'][_0x1bd914('0x6a')][_0x1bd914('0x618')](this),this[_0x1bd914('0x30e')]=[];},BattleManager['refreshStatusWindow']=function(){const _0x117bb5=_0x5f4923;if(!SceneManager['isSceneBattle']())return;const _0x834ef2=SceneManager['_scene']['_statusWindow'];if(_0x834ef2)_0x834ef2[_0x117bb5('0x895')]();},BattleManager[_0x5f4923('0x683')]=function(){const _0x34ee03=_0x5f4923;if(BattleManager['isTpb']())return'TPB';return _0x34ee03('0x279');},BattleManager[_0x5f4923('0x476')]=function(_0x4c586d){const _0x4c632d=_0x5f4923;return _0x4c586d=_0x4c586d[_0x4c632d('0x667')]()[_0x4c632d('0x32d')](),this[_0x4c632d('0x683')]()===_0x4c586d;},BattleManager[_0x5f4923('0x5c0')]=function(){const _0x1069bd=_0x5f4923;return this[_0x1069bd('0x476')](_0x1069bd('0x279'));},BattleManager[_0x5f4923('0x355')]=function(){const _0x1bb589=_0x5f4923;return this[_0x1bb589('0x5c0')]();},BattleManager['isTickBased']=function(){return!this['isTurnBased']();},BattleManager['processBattleCoreJS']=function(_0xf6003c){$gameParty['processBattleCoreJS'](_0xf6003c),$gameTroop['processBattleCoreJS'](_0xf6003c);},VisuMZ['BattleCore'][_0x5f4923('0x435')]=BattleManager[_0x5f4923('0x543')],BattleManager[_0x5f4923('0x543')]=function(){const _0x4998e9=_0x5f4923;this[_0x4998e9('0x829')]=ConfigManager[_0x4998e9('0x1d8')],this[_0x4998e9('0xb0')]('PreStartBattleJS'),VisuMZ[_0x4998e9('0x88d')][_0x4998e9('0x435')]['call'](this),this[_0x4998e9('0xb0')](_0x4998e9('0x854'));},BattleManager[_0x5f4923('0x4a1')]=function(_0x3b15bd){const _0x347c91=_0x5f4923,_0xaaf6fc=VisuMZ[_0x347c91('0x88d')][_0x347c91('0x39b')]['Mechanics'];_0xaaf6fc['BattleEndEvent']&&$gameTemp[_0x347c91('0x264')](_0xaaf6fc[_0x347c91('0x735')]);const _0x32dc52='%1Event'['format'](_0x3b15bd);_0xaaf6fc[_0x32dc52]&&$gameTemp['reserveCommonEvent'](_0xaaf6fc[_0x32dc52]);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x352')]=BattleManager['processVictory'],BattleManager[_0x5f4923('0x75d')]=function(){const _0x52ce45=_0x5f4923;this[_0x52ce45('0xb0')](_0x52ce45('0x350')),VisuMZ[_0x52ce45('0x88d')][_0x52ce45('0x352')][_0x52ce45('0x618')](this),this[_0x52ce45('0x4a1')]('Victory');},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x2a6')]=BattleManager[_0x5f4923('0x779')],BattleManager[_0x5f4923('0x779')]=function(){const _0x471e76=_0x5f4923;this['processBattleCoreJS'](_0x471e76('0x50f')),VisuMZ[_0x471e76('0x88d')][_0x471e76('0x2a6')]['call'](this),this[_0x471e76('0x4a1')]('Defeat');},VisuMZ['BattleCore'][_0x5f4923('0x263')]=BattleManager[_0x5f4923('0x558')],BattleManager[_0x5f4923('0x558')]=function(_0x127b70){const _0x565806=_0x5f4923;this[_0x565806('0x829')]=![],this[_0x565806('0xb0')](_0x565806('0x24a')),VisuMZ[_0x565806('0x88d')][_0x565806('0x263')]['call'](this,_0x127b70),this[_0x565806('0xb0')](_0x565806('0x420'));},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x62a')]=BattleManager[_0x5f4923('0x1ad')],BattleManager['startTurn']=function(){const _0x576e71=_0x5f4923;if(this['isTurnBased']())this['processBattleCoreJS'](_0x576e71('0x55'));VisuMZ[_0x576e71('0x88d')]['BattleManager_startTurn']['call'](this);if(this[_0x576e71('0x355')]())this[_0x576e71('0xb0')](_0x576e71('0x633'));},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x60d')]=BattleManager[_0x5f4923('0x808')],BattleManager['startAction']=function(){const _0x476caf=_0x5f4923,_0x4b66cc=this[_0x476caf('0x362')][_0x476caf('0x677')]();if(_0x4b66cc)_0x4b66cc[_0x476caf('0x6b2')]('PreStartActionJS');VisuMZ[_0x476caf('0x88d')][_0x476caf('0x60d')][_0x476caf('0x618')](this);if(_0x4b66cc)_0x4b66cc[_0x476caf('0x6b2')](_0x476caf('0x4de'));},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x81f')]=BattleManager[_0x5f4923('0x187')],BattleManager[_0x5f4923('0x187')]=function(){const _0x145e46=_0x5f4923,_0x12d8e5=this[_0x145e46('0x50a')];if(_0x12d8e5)_0x12d8e5['actionBattleCoreJS']('PreEndActionJS');VisuMZ[_0x145e46('0x88d')][_0x145e46('0x81f')][_0x145e46('0x618')](this);if(_0x12d8e5)_0x12d8e5[_0x145e46('0x6b2')](_0x145e46('0x277'));this[_0x145e46('0x358')](this['allBattleMembers']());},BattleManager[_0x5f4923('0x358')]=function(_0xbbe738){const _0x1ebc84=_0x5f4923;for(const _0x4e158e of _0xbbe738){if(!_0x4e158e)continue;if(!_0x4e158e[_0x1ebc84('0x17f')]())continue;_0x4e158e[_0x1ebc84('0x17f')]()[_0x1ebc84('0x30c')]();}},BattleManager[_0x5f4923('0x3ea')]=function(){const _0x1daa64=_0x5f4923;if(!this[_0x1daa64('0x70a')]['isBusy']()){if('OuCOw'!==_0x1daa64('0x198')){function _0x6321c2(){return _0xc05538(_0x549b83['$1']);}}else this[_0x1daa64('0x187')]();}},BattleManager['makeEscapeRatio']=function(){const _0x1b6881=_0x5f4923;this[_0x1b6881('0x48')]=VisuMZ['BattleCore'][_0x1b6881('0x39b')]['Mechanics'][_0x1b6881('0x35f')][_0x1b6881('0x618')](this);},VisuMZ['BattleCore'][_0x5f4923('0x693')]=BattleManager['onEscapeSuccess'],BattleManager[_0x5f4923('0x38c')]=function(){const _0x2042a5=_0x5f4923;this['processBattleCoreJS'](_0x2042a5('0x7e3')),BattleManager['_spriteset'][_0x2042a5('0x5c8')](),VisuMZ[_0x2042a5('0x88d')][_0x2042a5('0x693')][_0x2042a5('0x618')](this),this[_0x2042a5('0x4a1')]('EscapeSuccess');},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x819')]=BattleManager[_0x5f4923('0x5d3')],BattleManager[_0x5f4923('0x5d3')]=function(){const _0x431b95=_0x5f4923;this[_0x431b95('0xb0')](_0x431b95('0x232'));const _0x2394a9=this[_0x431b95('0x48')];VisuMZ['BattleCore'][_0x431b95('0x819')][_0x431b95('0x618')](this),this['_escapeRatio']=_0x2394a9+VisuMZ[_0x431b95('0x88d')]['Settings'][_0x431b95('0x6f4')][_0x431b95('0x2aa')][_0x431b95('0x618')](this),this[_0x431b95('0x4a1')](_0x431b95('0x13d'));},BattleManager[_0x5f4923('0x287')]=function(){const _0x55a20b=_0x5f4923;let _0x5ca462=![];if(this[_0x55a20b('0x32f')]())for(const _0x2d35dd of $gameTroop[_0x55a20b('0x367')]()){if(_0x55a20b('0x1a1')!=='EApAt'){function _0x6cd317(){const _0x3a9cc9=_0x55a20b;this[_0x3a9cc9('0x383')]['open']();}}else this[_0x55a20b('0x70a')]['push'](_0x55a20b('0x256'),TextManager[_0x55a20b('0x41')]['format'](_0x2d35dd)),this['_logWindow'][_0x55a20b('0x2fc')]('wait'),_0x5ca462=!![];}if(this['_preemptive']){if(_0x55a20b('0x5e6')===_0x55a20b('0x5db')){function _0x49ebd9(){const _0x21f953=_0x55a20b;_0x9866a3[_0x21f953('0x88d')][_0x21f953('0x7de')][_0x21f953('0x618')](this);}}else this['_logWindow'][_0x55a20b('0x2fc')](_0x55a20b('0x256'),TextManager[_0x55a20b('0x4d8')][_0x55a20b('0x6e6')]($gameParty[_0x55a20b('0x28b')]())),this[_0x55a20b('0x70a')]['push'](_0x55a20b('0x12d'));}else this[_0x55a20b('0x52e')]&&(this['_logWindow'][_0x55a20b('0x2fc')](_0x55a20b('0x256'),TextManager['surprise'][_0x55a20b('0x6e6')]($gameParty[_0x55a20b('0x28b')]())),this[_0x55a20b('0x70a')][_0x55a20b('0x2fc')](_0x55a20b('0x12d')));_0x5ca462&&(this[_0x55a20b('0x70a')]['push']('wait'),this['_logWindow']['push']('clear'));if(this[_0x55a20b('0x1d0')]()&&this['isSkipPartyCommandWindow']()){if(_0x55a20b('0x6e2')!==_0x55a20b('0x6e2')){function _0x281e5c(){const _0x3dc1e7=_0x55a20b;_0x98a05=_0xb627f7[_0x3dc1e7('0x55a')]((_0x57be45,_0x2eb773)=>_0x57be45*(0x1-_0x2eb773),_0x162b83);}}else this[_0x55a20b('0xfa')]=![];}},BattleManager[_0x5f4923('0x32f')]=function(){const _0x19755a=_0x5f4923;if(BattleManager[_0x19755a('0x829')])return![];return VisuMZ['BattleCore']['Settings'][_0x19755a('0x510')][_0x19755a('0x51b')];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x862')]=BattleManager['startInput'],BattleManager[_0x5f4923('0x34f')]=function(){const _0x5ae625=_0x5f4923;VisuMZ[_0x5ae625('0x88d')][_0x5ae625('0x862')][_0x5ae625('0x618')](this),this['isDTB']()&&this[_0x5ae625('0x595')]()&&!this[_0x5ae625('0x52e')]&&$gameParty['canInput']()&&this[_0x5ae625('0x657')]();},BattleManager[_0x5f4923('0x595')]=function(){const _0x5ef844=_0x5f4923;return VisuMZ[_0x5ef844('0x88d')][_0x5ef844('0x39b')]['PartyCmd'][_0x5ef844('0x20c')];},BattleManager['invokeMagicReflection']=function(_0x357c84,_0x6c78c6){const _0x1df7d4=_0x5f4923;this[_0x1df7d4('0x50a')][_0x1df7d4('0x6c0')]=_0x6c78c6,this[_0x1df7d4('0x70a')]['displayReflection'](_0x6c78c6),this[_0x1df7d4('0x70a')][_0x1df7d4('0x229')](_0x357c84,this[_0x1df7d4('0x50a')]),this['_action'][_0x1df7d4('0xb')](_0x357c84),this['_logWindow']['displayActionResults'](_0x357c84,_0x357c84);},VisuMZ[_0x5f4923('0x88d')]['BattleManager_updatePhase']=BattleManager[_0x5f4923('0x9a')],BattleManager[_0x5f4923('0x9a')]=function(_0x18f253){const _0x18b29a=_0x5f4923;if(this[_0x18b29a('0x460')]===_0x18b29a('0x455'))this['updateCustomActionSequence']();else{if(this[_0x18b29a('0x460')]===_0x18b29a('0x163'))this[_0x18b29a('0x7a2')]();else{if(_0x18b29a('0x795')!==_0x18b29a('0x795')){function _0x112bfb(){const _0xbffc4d=_0x18b29a;if(!_0x14ba70[_0xbffc4d('0x35d')]()){const _0x5b4606=_0x49fa66[_0xbffc4d('0x6d7')](_0x5daf76['x'],_0x34a15e['y']);if(this[_0xbffc4d('0x645')]&&this[_0xbffc4d('0x7f7')][_0x5b4606])return this['_regionBattleback2'][_0x5b4606];}return _0x4e7ed4[_0xbffc4d('0x88d')][_0xbffc4d('0x7c2')]['call'](this);}}else VisuMZ[_0x18b29a('0x88d')]['BattleManager_updatePhase'][_0x18b29a('0x618')](this,_0x18f253);}}},BattleManager['prepareCustomActionSequence']=function(){const _0x34ca2c=_0x5f4923;this['_allTargets']=this[_0x34ca2c('0x441')][_0x34ca2c('0x805')](0x0),this[_0x34ca2c('0x2e9')]=0x0,this[_0x34ca2c('0x2af')]=this[_0x34ca2c('0x57d')][0x0]||null,this['_phase']=_0x34ca2c('0x455');},BattleManager[_0x5f4923('0x1d5')]=function(){const _0x24677c=_0x5f4923;if(!this['updateEventMain']()&&!this[_0x24677c('0x70a')][_0x24677c('0x24f')]()){if(_0x24677c('0x2cf')!==_0x24677c('0x3de'))this[_0x24677c('0x460')]='action';else{function _0x5be526(){for(const _0x1182a5 of this['members']()){if(_0x1182a5)_0x1182a5['processBattleCoreJS'](_0x22e1dd);}}}}},BattleManager[_0x5f4923('0x163')]=function(_0x4700e8){const _0x336a86=_0x5f4923;this[_0x336a86('0x7b2')][_0x336a86('0x835')](_0x4700e8);if(_0x4700e8===this['_subject'])return;const _0x4d803b=JsonEx[_0x336a86('0x206')](_0x4700e8[_0x336a86('0x677')]());this['_forcedBattlers']['push']([_0x4700e8,_0x4d803b]);},BattleManager['processForcedAction']=function(){},BattleManager[_0x5f4923('0x765')]=function(){const _0x2a6718=_0x5f4923;if(this[_0x2a6718('0x1d0')]())this['_phase']='turn';else{if(this[_0x2a6718('0x30e')][_0x2a6718('0x568')]>0x0)this['_phase']=_0x2a6718('0x717');else{if(_0x2a6718('0x1c2')!==_0x2a6718('0x5c7'))this[_0x2a6718('0x34f')]();else{function _0x493d03(){const _0x2fa07d=_0x2a6718,_0xe65939=this[_0x2fa07d('0x4d5')]();this[_0x2fa07d('0x2fe')]=new _0x22bc22(_0xe65939),this[_0x2fa07d('0x2fe')]['hide'](),this[_0x2fa07d('0x3e8')](this[_0x2fa07d('0x2fe')]);}}}}},BattleManager[_0x5f4923('0x541')]=function(){const _0x3e07bc=_0x5f4923;for(;;){if(_0x3e07bc('0x4b4')!==_0x3e07bc('0x347')){const _0x10d6f6=this[_0x3e07bc('0xaa')]();if(!_0x10d6f6){if(_0x3e07bc('0x3ae')==='rlFUm')return null;else{function _0x53989b(){const _0x18856d=_0x3e07bc;_0x2b6728=_0x4f068e[_0x18856d('0x41e')](_0x58f762),_0x223e3a[_0x18856d('0x88d')]['Game_Enemy_setup'][_0x18856d('0x618')](this,_0x1f544b,_0xd9ad2a,_0x4b1eee),_0x8c9781['VisuMZ_1_ElementStatusCore']&&this[_0x18856d('0x6f0')](),this['clearBattleCoreData'](),this[_0x18856d('0x3e1')](),_0x494e89[_0x18856d('0x7ef')]&&this[_0x18856d('0x6df')]();}}}if(_0x10d6f6[_0x3e07bc('0x72c')]()&&_0x10d6f6[_0x3e07bc('0x642')]()){if(_0x3e07bc('0x160')!==_0x3e07bc('0x7b3'))return _0x10d6f6;else{function _0xdb423(){const _0x16ca25=_0x3e07bc;if(!_0x5e29e8[_0x16ca25('0x88d')]['Settings']['BattleLayout'][_0x16ca25('0x627')])return![];if(_0x3ad7c2[_0x16ca25('0x1bc')]())return!![];return _0x3e4bfb[_0x16ca25('0x5c3')]&&_0x1bb702['getMenuImage']();}}}}else{function _0x19dd37(){const _0x47ba9c=_0x3e07bc;this[_0x47ba9c('0x78f')]=this[_0x47ba9c('0x38f')],this[_0x47ba9c('0x87d')]&&(this['_targetAngle']=0x0,this['_currentAngle']=0x0);}}}},BattleManager[_0x5f4923('0xaa')]=function(){const _0x27b814=_0x5f4923;if(this[_0x27b814('0x30e')]['length']>0x0){const _0x179227=this[_0x27b814('0x30e')][_0x27b814('0x582')](),_0x153573=_0x179227[0x0];return _0x153573[_0x27b814('0x3a6')]=_0x153573['_actions']||[],_0x153573[_0x27b814('0x3a6')][0x0]=_0x179227[0x1],_0x153573;}else{if(_0x27b814('0x182')!=='ItEYJ'){function _0x121e10(){return 0x0;}}else return this['_actionBattlers']['shift']();}},VisuMZ['BattleCore']['Game_Battler_forceAction']=Game_Battler['prototype']['forceAction'],Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x163')]=function(_0x157dab,_0xdb062){const _0x452e7a=_0x5f4923;VisuMZ[_0x452e7a('0x88d')]['Game_Battler_forceAction']['call'](this,_0x157dab,_0xdb062),this[_0x452e7a('0x3a6')][this[_0x452e7a('0x3a6')]['length']-0x1][_0x452e7a('0x320')]=!![];},Game_Interpreter[_0x5f4923('0x14f')][_0x5f4923('0x36c')]=function(_0x26170c){const _0x7234ae=_0x5f4923;return this[_0x7234ae('0x1c1')](_0x26170c[0x0],_0x26170c[0x1],_0x3917a3=>{const _0x2d6c19=_0x7234ae;if(!_0x3917a3[_0x2d6c19('0x65d')]()){if(_0x2d6c19('0x782')===_0x2d6c19('0x62e')){function _0x226b9f(){const _0x245de5=_0x2d6c19,_0x25f786=_0x1f10e8(_0x5ab8be['$1'])[_0x245de5('0x203')](/[\r\n]+/)[_0x245de5('0x835')]('');_0x3430e2[_0x245de5('0x28b')]=_0x26e7eb[_0x245de5('0x74b')](_0x25f786);}}else _0x3917a3[_0x2d6c19('0x163')](_0x26170c[0x2],_0x26170c[0x3]),BattleManager[_0x2d6c19('0x163')](_0x3917a3);}}),!![];},VisuMZ[_0x5f4923('0x88d')]['BattleManager_selectNextCommand']=BattleManager[_0x5f4923('0x657')],BattleManager['selectNextCommand']=function(){const _0x228e3e=_0x5f4923;if(this[_0x228e3e('0x1d0')]())this[_0x228e3e('0x1cf')]();else{if('hjCXQ'===_0x228e3e('0x2bf')){function _0x4e8f19(){_0xef0991['command119']([_0x1ac6a0]);}}else VisuMZ[_0x228e3e('0x88d')]['BattleManager_selectNextCommand'][_0x228e3e('0x618')](this);}},BattleManager[_0x5f4923('0x1cf')]=function(){const _0x521ca5=_0x5f4923;if(this[_0x521ca5('0x60c')]){if(this[_0x521ca5('0x60c')]['selectNextCommand']()){if(_0x521ca5('0x60f')==='Zyliq'){function _0x4fe25b(){const _0x308ad7=_0x521ca5;if(!this[_0x308ad7('0x3f3')]())return;const _0x3ccd22=this[_0x308ad7('0x586')](),_0x4040b1=_0x2f111b['BattleCore'][_0x308ad7('0x39b')]['PartyCmd']['CmdIconAutoBattle'],_0x4a53ad=_0x3ccd22===_0x308ad7('0x72a')?_0xefd39['autoBattle']:'\x5cI[%1]%2'[_0x308ad7('0x6e6')](_0x4040b1,_0x478946[_0x308ad7('0x32c')]),_0x58fbe3=this[_0x308ad7('0x1b1')]();this[_0x308ad7('0x8b')](_0x4a53ad,_0x308ad7('0x32c'),_0x58fbe3);}}else return;}this[_0x521ca5('0x539')](),this['checkTpbInputClose'](),!this[_0x521ca5('0x362')]&&!this[_0x521ca5('0x60c')]&&SceneManager[_0x521ca5('0x60a')][_0x521ca5('0x753')]();}else!this['_subject']&&this[_0x521ca5('0x3b6')]();},VisuMZ['BattleCore'][_0x5f4923('0x4fd')]=BattleManager[_0x5f4923('0x1ef')],BattleManager[_0x5f4923('0x1ef')]=function(){const _0x196023=_0x5f4923;this[_0x196023('0x1d0')]()&&this[_0x196023('0x460')]===_0x196023('0x2d9')&&(this[_0x196023('0x60c')]=null),VisuMZ[_0x196023('0x88d')][_0x196023('0x4fd')][_0x196023('0x618')](this);},SceneManager[_0x5f4923('0x64e')]=function(){const _0x9b99a6=_0x5f4923;return this[_0x9b99a6('0x60a')]&&this[_0x9b99a6('0x60a')][_0x9b99a6('0x814')]===Scene_Battle;},SceneManager[_0x5f4923('0x44a')]=function(){const _0x2b841=_0x5f4923;return Spriteset_Battle[_0x2b841('0x14f')]['isFlipped']();},SceneManager['isPreviousSceneBattleTransitionable']=function(){const _0x404482=_0x5f4923;if(SceneManager[_0x404482('0x426')](Scene_Options))return!![];return![];},SceneManager[_0x5f4923('0x67a')]=function(){if(SceneManager['isNextScene'](Scene_Options))return!![];return![];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x798')]=Game_Temp[_0x5f4923('0x14f')][_0x5f4923('0x336')],Game_Temp['prototype'][_0x5f4923('0x336')]=function(_0x3a74de,_0xe39794,_0x597594){const _0x3befe2=_0x5f4923;_0x3a74de=_0x3a74de[_0x3befe2('0x7bf')]((_0x51808f,_0xd48462,_0x50a565)=>_0x50a565[_0x3befe2('0x421')](_0x51808f)===_0xd48462),SceneManager[_0x3befe2('0x64e')]()&&SceneManager['isBattleFlipped']()&&(_0x597594=!_0x597594),VisuMZ[_0x3befe2('0x88d')][_0x3befe2('0x798')][_0x3befe2('0x618')](this,_0x3a74de,_0xe39794,_0x597594),SceneManager[_0x3befe2('0x64e')]()&&BattleManager[_0x3befe2('0xc5')][_0x3befe2('0x737')]();},Game_Temp['prototype'][_0x5f4923('0x5ad')]=function(_0x1bd197){const _0x47f7ae=_0x5f4923;this[_0x47f7ae('0x18d')]=_0x1bd197;},Game_Temp['prototype']['getLastPluginCommandInterpreter']=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x5f4923('0x14f')][_0x5f4923('0x71d')]=function(){const _0x27b27a=_0x5f4923;this[_0x27b27a('0x7db')]=undefined;},Game_Temp['prototype'][_0x5f4923('0x295')]=function(_0x1275b4){const _0x33778f=_0x5f4923;if($gameMap&&$dataMap&&$dataMap[_0x33778f('0x331')]){if(_0x33778f('0x43e')!==_0x33778f('0x43e')){function _0x4ddb6f(){const _0x3dedb7=_0x33778f;!this['_logWindow'][_0x3dedb7('0x24f')]()&&this[_0x3dedb7('0x187')]();}}else this[_0x33778f('0x466')]($dataMap['note']);}const _0x9f0edc=$dataTroops[_0x1275b4];if(_0x9f0edc){if(_0x33778f('0x617')!==_0x33778f('0x617')){function _0x33bd6e(){const _0x139308=_0x33778f,_0x2db17d=this[_0x139308('0x695')](),_0x1d1b99=_0x2db17d[0x0]?_0x2db17d[0x0][_0x139308('0x593')]:0x0,_0x444cae=_0xee73c8[_0x139308('0x462')][_0x1d1b99];_0x444cae&&this[_0x139308('0x3a')](_0x444cae[_0x139308('0x472')]);}}else this[_0x33778f('0x466')](_0x9f0edc[_0x33778f('0x28b')]);}},Game_Temp[_0x5f4923('0x14f')][_0x5f4923('0x466')]=function(_0x48f108){const _0x22b09e=_0x5f4923;if(!_0x48f108)return;if(_0x48f108['match'](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){if(_0x22b09e('0x27c')!==_0x22b09e('0x36b')){const _0x22bdc1=String(RegExp['$1']);if(_0x22bdc1[_0x22b09e('0x5ae')](/DEFAULT/i)){if(_0x22b09e('0x640')!==_0x22b09e('0x640')){function _0x1c18dc(){return!this['isTurnBased']();}}else this[_0x22b09e('0x7db')]='default';}else{if(_0x22bdc1['match'](/LIST/i))this[_0x22b09e('0x7db')]=_0x22b09e('0x855');else{if(_0x22bdc1[_0x22b09e('0x5ae')](/XP/i))this['_forcedBattleLayout']='xp';else{if(_0x22bdc1['match'](/PORTRAIT/i))this[_0x22b09e('0x7db')]='portrait';else _0x22bdc1[_0x22b09e('0x5ae')](/BORDER/i)&&(this[_0x22b09e('0x7db')]='border');}}}}else{function _0x1fa516(){const _0x3bcac1=_0x22b09e;_0x5b061f['BattleCore'][_0x3bcac1('0x392')][_0x3bcac1('0x618')](this,_0x3f8b27),this[_0x3bcac1('0x67')]();}}}},VisuMZ['BattleCore']['Game_System_initialize']=Game_System[_0x5f4923('0x14f')][_0x5f4923('0x566')],Game_System[_0x5f4923('0x14f')][_0x5f4923('0x566')]=function(){const _0x294ee6=_0x5f4923;VisuMZ[_0x294ee6('0x88d')][_0x294ee6('0x22a')]['call'](this),this[_0x294ee6('0x395')]();},Game_System['prototype']['initBattleCore']=function(){const _0x335c82=_0x5f4923;this[_0x335c82('0x34a')]=this['_defeatedEnemies']||[];},Game_System[_0x5f4923('0x14f')][_0x5f4923('0x66')]=function(){const _0xa73309=_0x5f4923;if(this[_0xa73309('0x34a')]===undefined)this[_0xa73309('0x395')]();return this[_0xa73309('0x34a')];},Game_System[_0x5f4923('0x14f')]['registerDefeatedEnemy']=function(_0x8dacb0){const _0x418940=_0x5f4923;if(this[_0x418940('0x34a')]===undefined)this['initBattleCore']();if(!_0x8dacb0)return;if(this[_0x418940('0x34a')][_0x418940('0x147')](_0x8dacb0))return;this[_0x418940('0x34a')][_0x418940('0x2fc')](_0x8dacb0),this[_0x418940('0x34a')]['sort']((_0x49d438,_0x151615)=>_0x49d438-_0x151615);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x1f0')]=Game_BattlerBase['prototype'][_0x5f4923('0x64')],Game_BattlerBase['prototype'][_0x5f4923('0x64')]=function(_0x274d60){const _0x3172a3=_0x5f4923,_0x21f27d=this[_0x3172a3('0x642')](),_0x581eac=this['stateMotionIndex']();VisuMZ[_0x3172a3('0x88d')][_0x3172a3('0x1f0')][_0x3172a3('0x618')](this,_0x274d60);if(this[_0x3172a3('0x323')]()&&_0x21f27d&&this[_0x3172a3('0x110')]()){if(_0x3172a3('0x205')==='oKKTD'){function _0x5dd7ea(){const _0x28fafe=_0x3172a3;return _0x5b0215[_0x28fafe('0x88d')][_0x28fafe('0x70f')][_0x28fafe('0x618')](this,_0x39b322);}}else this[_0x3172a3('0x5bd')]=!this[_0x3172a3('0x880')](),$gameSystem[_0x3172a3('0x726')](this['enemyId']());}if(SceneManager[_0x3172a3('0x64e')]()&&_0x581eac!==this[_0x3172a3('0xa6')]()){if(_0x3172a3('0xff')==='uNtLe'){if(this[_0x3172a3('0x17f')]()){if(_0x3172a3('0x88e')===_0x3172a3('0x2d4')){function _0x36ef23(){const _0x3e834e=_0x3172a3;if(!this['_shadowSprite'])return;this[_0x3e834e('0x389')]['y']=_0x5e3ba1[_0x3e834e('0x774')](-this[_0x3e834e('0x652')]()-0x2);}}else this[_0x3172a3('0x17f')]()[_0x3172a3('0x30c')]();}}else{function _0x249955(){const _0x5e18b9=_0x3172a3;if(!_0x35820e['isSceneBattle']())return;if(!_0x75d39c[_0x5e18b9('0x220')])return;const _0x282de2=_0x499293[_0x5e18b9('0x60a')]['_spriteset'];if(!_0x282de2)return;_0x2c5029['ConvertParams'](_0x1c1b7d,_0x4c420f);const _0x103bb8=_0x40dcec['Intensity']||0x1,_0x53bc36=_0x2ba918[_0x5e18b9('0x79d')]||0x1,_0x4b7616=_0x2aab60[_0x5e18b9('0x7d4')]||_0x5e18b9('0x662');_0x282de2[_0x5e18b9('0x3a0')](_0x103bb8,_0x53bc36,_0x4b7616);}}}},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x880')]=function(){const _0x66bcae=_0x5f4923;return $gameSystem[_0x66bcae('0x66')]()[_0x66bcae('0x147')](this[_0x66bcae('0xd9')]);},VisuMZ[_0x5f4923('0x88d')]['Game_BattlerBase_eraseState']=Game_BattlerBase[_0x5f4923('0x14f')]['eraseState'],Game_BattlerBase[_0x5f4923('0x14f')]['eraseState']=function(_0xe8b015){const _0x59767e=_0x5f4923;VisuMZ[_0x59767e('0x88d')][_0x59767e('0x547')]['call'](this,_0xe8b015);this['isEnemy']()&&_0xe8b015===this[_0x59767e('0x74')]()&&this[_0x59767e('0x642')]()&&(this['_visualHpGauge_JustDied']=![]);if(SceneManager[_0x59767e('0x64e')]()){if(_0x59767e('0x419')===_0x59767e('0x107')){function _0x1110dd(){const _0x1c16ad=_0x59767e,_0x45264d=this[_0x1c16ad('0x317')];_0x45264d['drawText'](_0x4d906e,0x0,_0xbb02c5['y'],_0x45264d[_0x1c16ad('0x54')],'center');}}else this['requestMotionRefresh']();}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0xe3')]=Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x328')],Game_Action['prototype'][_0x5f4923('0x328')]=function(){const _0x57422d=_0x5f4923;VisuMZ['BattleCore'][_0x57422d('0xe3')][_0x57422d('0x618')](this),this[_0x57422d('0x6d1')]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x57422d('0x637')]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0};},Game_Action[_0x5f4923('0x14f')]['makeDamageValue']=function(_0x3d03d2,_0x5c6169){const _0x54c06b=_0x5f4923;return VisuMZ[_0x54c06b('0x88d')][_0x54c06b('0x39b')][_0x54c06b('0x15d')][_0x54c06b('0x5ed')][_0x54c06b('0x618')](this,_0x3d03d2,_0x5c6169);},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x6ce')]=function(_0x1e6e87,_0x224476){const _0x1cbf65=_0x5f4923;return VisuMZ[_0x1cbf65('0x88d')][_0x1cbf65('0x39b')][_0x1cbf65('0x15d')][_0x1cbf65('0x86b')][_0x1cbf65('0x618')](this,_0x1e6e87,_0x224476);},Game_Action[_0x5f4923('0x14f')]['applyGuard']=function(_0x5e3208,_0x45f6cd){const _0x13098f=_0x5f4923;return VisuMZ[_0x13098f('0x88d')]['Settings'][_0x13098f('0x15d')][_0x13098f('0x74c')][_0x13098f('0x618')](this,_0x5e3208,_0x45f6cd);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x106')]=Game_Action[_0x5f4923('0x14f')]['itemHit'],Game_Action[_0x5f4923('0x14f')]['itemHit']=function(_0x36d5f4){const _0x14afc0=_0x5f4923,_0x2f00cc=this[_0x14afc0('0x555')]()['note'];if(_0x2f00cc['match'](/<ALWAYS HIT>/i))return 0x1;else{if(_0x2f00cc[_0x14afc0('0x5ae')](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;else{let _0xefca04=VisuMZ[_0x14afc0('0x88d')][_0x14afc0('0x106')]['call'](this,_0x36d5f4);return _0xefca04=this[_0x14afc0('0x637')]['hitRate']*_0xefca04+this['_multipliers']['hitFlat'],_0xefca04;}}},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x4fe')]=function(_0x179d70){const _0x141dc9=_0x5f4923;if(!this[_0x141dc9('0x555')]()[_0x141dc9('0x11b')]['critical'])return 0x0;let _0x4bd545=VisuMZ[_0x141dc9('0x88d')]['Settings'][_0x141dc9('0x15d')]['CriticalHitRateJS']['call'](this,_0x179d70);return _0x4bd545=this[_0x141dc9('0x637')]['criticalHitRate']*_0x4bd545+this['_multipliers']['criticalHitFlat'],_0x4bd545;},Game_Action['prototype']['applyCritical']=function(_0x3b50a6){const _0x5ee88a=_0x5f4923;return _0x3b50a6=VisuMZ[_0x5ee88a('0x88d')][_0x5ee88a('0x39b')]['Damage'][_0x5ee88a('0x5e')][_0x5ee88a('0x618')](this,_0x3b50a6),_0x3b50a6=this[_0x5ee88a('0x637')][_0x5ee88a('0x55c')]*_0x3b50a6+this[_0x5ee88a('0x637')][_0x5ee88a('0x6c4')],_0x3b50a6;},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x82f')]=Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x2e3')],Game_Action[_0x5f4923('0x14f')]['evalDamageFormula']=function(_0x3ec59c){const _0x50221c=_0x5f4923,_0x490db3=DataManager[_0x50221c('0x3d2')](this['item']());return _0x490db3===_0x50221c('0x62b')?VisuMZ[_0x50221c('0x88d')][_0x50221c('0x82f')]['call'](this,_0x3ec59c):this[_0x50221c('0x1b0')](_0x3ec59c);},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x46d')]=function(){const _0x5ab47e=_0x5f4923;if(this['item']()[_0x5ab47e('0x331')][_0x5ab47e('0x5ae')](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x39a960=String(RegExp['$1'])[_0x5ab47e('0x667')]()['trim']();return _0x39a960;}return _0x5ab47e('0x62b');},Game_Action['prototype'][_0x5f4923('0x1b0')]=function(_0x255237){const _0x536e27=_0x5f4923,_0x5cffcf=DataManager[_0x536e27('0x3d2')](this[_0x536e27('0x555')]()),_0x5b8ef7=VisuMZ[_0x536e27('0x5a')][_0x5cffcf];try{return _0x5b8ef7[_0x536e27('0x71f')][_0x536e27('0x618')](this,_0x255237);}catch(_0x26dfbc){if(_0x536e27('0x508')!=='GSabI'){if($gameTemp[_0x536e27('0x345')]())console['log'](_0x26dfbc);return VisuMZ[_0x536e27('0x88d')][_0x536e27('0x82f')]['call'](this);}else{function _0x3920bb(){const _0x28e0b9=_0x536e27;_0x180f05[_0x28e0b9('0xb0')](_0x2839ec),_0x153ecb['processBattleCoreJS'](_0x26705);}}}},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x1c9')]=function(_0x436f1e,_0x38a9bf){const _0x71d74f=_0x5f4923;if(this[_0x71d74f('0x80a')]())return _0x38a9bf;const _0xfe2c28=this[_0x71d74f('0x394')](),_0xa1fcb2=_0x436f1e;let _0x52c7f3=[],_0x584f28=[];_0x52c7f3[_0x71d74f('0x2fc')](this[_0x71d74f('0x6d1')][_0x71d74f('0x150')],this['_armorPenetration'][_0x71d74f('0x818')]),_0x584f28['push'](this[_0x71d74f('0x6d1')][_0x71d74f('0x130')],this[_0x71d74f('0x6d1')][_0x71d74f('0x892')]);const _0x8aa04d=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x13359d=this[_0x71d74f('0x5d4')]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x38b49d=this['isPhysical']()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x897729=this['isPhysical']()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;_0x52c7f3=_0x52c7f3[_0x71d74f('0x81e')](_0xa1fcb2['traitObjects']()[_0x71d74f('0x17b')](_0x19e84f=>_0x19e84f&&_0x19e84f[_0x71d74f('0x331')]['match'](_0x8aa04d)?Number(RegExp['$1']):0x0)),_0x584f28=_0x584f28[_0x71d74f('0x81e')](_0xa1fcb2[_0x71d74f('0x5a3')]()['map'](_0xb84777=>_0xb84777&&_0xb84777[_0x71d74f('0x331')][_0x71d74f('0x5ae')](_0x13359d)?Number(RegExp['$1'])/0x64:0x0)),_0x52c7f3=_0x52c7f3[_0x71d74f('0x81e')](_0xfe2c28[_0x71d74f('0x5a3')]()[_0x71d74f('0x17b')](_0x13dcbe=>_0x13dcbe&&_0x13dcbe[_0x71d74f('0x331')]['match'](_0x38b49d)?Number(RegExp['$1']):0x0)),_0x584f28=_0x584f28['concat'](_0xfe2c28[_0x71d74f('0x5a3')]()[_0x71d74f('0x17b')](_0x4b3209=>_0x4b3209&&_0x4b3209['note'][_0x71d74f('0x5ae')](_0x897729)?Number(RegExp['$1'])/0x64:0x0));if(this[_0x71d74f('0x555')]()[_0x71d74f('0x331')][_0x71d74f('0x5ae')](_0x38b49d)){if(_0x71d74f('0x7a8')!==_0x71d74f('0x7a8')){function _0x510863(){const _0x2e75fa=_0x71d74f;if(!this[_0x2e75fa('0x1ea')]())return;if(!this[_0x2e75fa('0x23c')])return;if(this['_targetAngle']===_0x325912)return;this[_0x2e75fa('0x38f')]=_0x280447,this['_angleDuration']=_0x3c5024,this['_angleWholeDuration']=_0x3dcc33,this[_0x2e75fa('0x36f')]=_0x55ffd6||_0x2e75fa('0x662'),this['_angleRevertOnFinish']=_0x6cdb59,this['_angleRevertOnFinish']===_0x198b64&&(this[_0x2e75fa('0x87d')]=!![]),_0x296214<=0x0&&(this['_currentAngle']=_0x324678,this[_0x2e75fa('0x87d')]&&(this['_targetAngle']=0x0,this[_0x2e75fa('0x78f')]=0x0));}}else _0x52c7f3[_0x71d74f('0x2fc')](Number(RegExp['$1']));}if(this[_0x71d74f('0x555')]()[_0x71d74f('0x331')][_0x71d74f('0x5ae')](_0x897729)){if('Xunrn'!==_0x71d74f('0x6d2')){function _0x218eae(){const _0x3722ad=_0x71d74f;_0x2ebbe5(_0x3722ad('0x499')['format'](_0x5163b7,_0x391aa6,_0x522568)),_0x421620[_0x3722ad('0xdf')]();}}else _0x584f28[_0x71d74f('0x2fc')](Number(RegExp['$1']));}_0x38a9bf=_0x52c7f3[_0x71d74f('0x55a')]((_0x2a94da,_0x3fbab5)=>_0x2a94da-_0x3fbab5,_0x38a9bf);if(_0x38a9bf>0x0){if(_0x71d74f('0x592')!==_0x71d74f('0x13c'))_0x38a9bf=_0x584f28[_0x71d74f('0x55a')]((_0x56f1c9,_0x5d7ed7)=>_0x56f1c9*(0x1-_0x5d7ed7),_0x38a9bf);else{function _0x93dd72(){const _0x3e65a1=_0x71d74f,_0x5c13aa=_0x4dff95[_0x3e65a1('0x88d')][_0x3e65a1('0x39b')][_0x3e65a1('0x510')];this[_0x3e65a1('0x310')]=_0x5c13aa[_0x3e65a1('0x480')],this[_0x3e65a1('0x6a2')]={};}}}return _0x38a9bf;},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x239')]=Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x1e6')],Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x1e6')]=function(_0x564833,_0x4d66d6){const _0xa721b5=_0x5f4923;_0x4d66d6=_0x4d66d6*this[_0xa721b5('0x637')][_0xa721b5('0x7c1')],_0x4d66d6+=this[_0xa721b5('0x637')][_0xa721b5('0x738')]*(_0x4d66d6>=0x0?0x1:-0x1),_0x4d66d6=this['applyBattleCoreJS']('PreDamage%1JS',_0x564833,_0x4d66d6,![]),_0x4d66d6=this[_0xa721b5('0x576')](_0x4d66d6),_0x4d66d6=Math[_0xa721b5('0x774')](_0x4d66d6),this['_executedValue']=_0x4d66d6,this[_0xa721b5('0x82a')]=this[_0xa721b5('0x82a')]||0x0,this[_0xa721b5('0x82a')]+=_0x4d66d6,VisuMZ[_0xa721b5('0x88d')][_0xa721b5('0x239')][_0xa721b5('0x618')](this,_0x564833,_0x4d66d6),this[_0xa721b5('0x76b')](_0xa721b5('0x473'),_0x564833,_0x4d66d6,!![]);},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x576')]=function(_0x3a9c2a){const _0x6893b7=_0x5f4923;if(this[_0x6893b7('0x7be')]())return _0x3a9c2a;return _0x3a9c2a=this[_0x6893b7('0x5f1')](_0x3a9c2a),_0x3a9c2a=this['applyHardDamageCap'](_0x3a9c2a),_0x3a9c2a;},Game_Action['prototype'][_0x5f4923('0x7be')]=function(){const _0x1734ce=_0x5f4923,_0xb0cc1e=/<BYPASS DAMAGE CAP>/i;if(this[_0x1734ce('0x555')]()[_0x1734ce('0x331')][_0x1734ce('0x5ae')](_0xb0cc1e))return!![];if(this[_0x1734ce('0x394')]()[_0x1734ce('0x5a3')]()[_0x1734ce('0x38d')](_0x2b97b1=>_0x2b97b1&&_0x2b97b1[_0x1734ce('0x331')][_0x1734ce('0x5ae')](_0xb0cc1e)))return!![];return!VisuMZ[_0x1734ce('0x88d')]['Settings']['Damage']['EnableDamageCap'];},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x5f1')]=function(_0x3db39e){const _0x356882=_0x5f4923;if(!VisuMZ[_0x356882('0x88d')][_0x356882('0x39b')][_0x356882('0x15d')][_0x356882('0x6b7')])return _0x3db39e;const _0x4d0c4e=/<BYPASS SOFT DAMAGE CAP>/i;if(this['item']()[_0x356882('0x331')][_0x356882('0x5ae')](_0x4d0c4e))return!![];if(this[_0x356882('0x394')]()[_0x356882('0x5a3')]()[_0x356882('0x38d')](_0x110622=>_0x110622&&_0x110622[_0x356882('0x331')][_0x356882('0x5ae')](_0x4d0c4e)))return!![];const _0x2819be=_0x3db39e<0x0?-0x1:0x1;_0x3db39e=Math[_0x356882('0x47e')](_0x3db39e);let _0x22530a=this[_0x356882('0x394')]()[_0x356882('0x5d6')]();this[_0x356882('0x555')]()[_0x356882('0x331')][_0x356882('0x5ae')](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0x22530a+=Number(RegExp['$1'])/0x64);_0x22530a=_0x22530a[_0x356882('0xbc')](0.01,0x1);const _0x63ead6=this['getHardDamageCap'](),_0x400a94=_0x22530a*_0x63ead6;if(_0x3db39e>_0x400a94&&_0x63ead6>_0x400a94){_0x3db39e-=_0x400a94;const _0xa4e76f=VisuMZ[_0x356882('0x88d')][_0x356882('0x39b')][_0x356882('0x15d')][_0x356882('0x39c')],_0x3bbae2=Math['max'](0x1-_0x3db39e/((_0x63ead6-_0x400a94)*_0xa4e76f+_0x3db39e),0.01);_0x3db39e*=_0x3bbae2,_0x3db39e+=_0x400a94;}return _0x3db39e*_0x2819be;},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x51a')]=function(){const _0x5adf37=_0x5f4923;if(this['item']()[_0x5adf37('0x331')][_0x5adf37('0x5ae')](/<DAMAGE CAP:[ ](\d+)>/i)){if(_0x5adf37('0x4b1')!=='MdrmG'){function _0x1bbba1(){const _0x491ca5=_0x5adf37;this[_0x491ca5('0x2c0')]();}}else return Number(RegExp['$1']);}else return this[_0x5adf37('0x394')]()[_0x5adf37('0x870')]();},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x293')]=function(_0x9d785f){const _0x37a575=_0x5f4923;let _0x49797f=this[_0x37a575('0x51a')]();return _0x9d785f[_0x37a575('0xbc')](-_0x49797f,_0x49797f);},VisuMZ['BattleCore']['Game_Action_apply']=Game_Action['prototype'][_0x5f4923('0xb')],Game_Action[_0x5f4923('0x14f')]['apply']=function(_0x5781ed){const _0x124126=_0x5f4923;this[_0x124126('0x76b')](_0x124126('0x2d8'),_0x5781ed,0x0,!![]),VisuMZ[_0x124126('0x88d')]['Game_Action_apply'][_0x124126('0x618')](this,_0x5781ed),this[_0x124126('0x76b')]('PostApply%1JS',_0x5781ed,this[_0x124126('0x333')]||0x0,!![]);},Game_Action['prototype'][_0x5f4923('0x76b')]=function(_0x4a17f6,_0x546935,_0x56ee1a,_0xa07e18){const _0x9bcea9=_0x5f4923;_0x56ee1a=_0x56ee1a||0x0;const _0x1f8c37=_0x56ee1a,_0x326a61=VisuMZ['BattleCore'][_0x9bcea9('0x39b')][_0x9bcea9('0x6f4')],_0x1ab027=_0x4a17f6[_0x9bcea9('0x6e6')]('');if(_0x326a61[_0x1ab027]){if(_0x9bcea9('0x11a')===_0x9bcea9('0x11a')){_0x56ee1a=_0x326a61[_0x1ab027][_0x9bcea9('0x618')](this,_0x56ee1a,_0x546935);if(_0xa07e18)_0x56ee1a=_0x1f8c37;}else{function _0x2f3bc0(){const _0x5b6428=_0x9bcea9;this[_0x5b6428('0x17f')]()&&this[_0x5b6428('0x17f')]()[_0x5b6428('0x30c')]();}}}let _0x180dc5=VisuMZ[_0x9bcea9('0x88d')][_0x9bcea9('0x34b')](this[_0x9bcea9('0x555')](),_0x4a17f6[_0x9bcea9('0x6e6')](''));if(VisuMZ[_0x9bcea9('0x88d')]['JS'][_0x180dc5]){if('WpcxS'!==_0x9bcea9('0xa')){function _0x2a3a0d(){const _0x2e85e8=_0x9bcea9;_0x2fca16[_0x2e85e8('0x88d')][_0x2e85e8('0x1e2')]['call'](this),this['y']=_0x4413e3[_0x2e85e8('0x303')]*0xa;}}else{_0x56ee1a=VisuMZ['BattleCore']['JS'][_0x180dc5][_0x9bcea9('0x618')](this,this[_0x9bcea9('0x394')](),_0x546935,this['item'](),_0x56ee1a);if(_0xa07e18)_0x56ee1a=_0x1f8c37;}}for(const _0x510eb6 of this[_0x9bcea9('0x394')]()[_0x9bcea9('0x5a3')]()){if('VWoAs'===_0x9bcea9('0x315')){function _0x5e7d4b(){const _0xd63b89=_0x9bcea9,_0x44c56a=_0x20f992[_0xd63b89('0x1f1')]('['+_0x504283['$1'][_0xd63b89('0x5ae')](/\d+/g)+']');for(const _0x5c2cb0 of _0x44c56a){if(_0xc8e345[_0xd63b89('0x4b2')](_0x5c2cb0))return!![];}return![];}}else{if(!_0x510eb6)continue;_0x180dc5=VisuMZ[_0x9bcea9('0x88d')][_0x9bcea9('0x34b')](_0x510eb6,_0x4a17f6[_0x9bcea9('0x6e6')]('AsUser'));if(VisuMZ['BattleCore']['JS'][_0x180dc5]){if('jQDOT'!==_0x9bcea9('0x494')){_0x56ee1a=VisuMZ[_0x9bcea9('0x88d')]['JS'][_0x180dc5]['call'](this,this[_0x9bcea9('0x394')](),_0x546935,_0x510eb6,_0x56ee1a);if(_0xa07e18)_0x56ee1a=_0x1f8c37;}else{function _0x10c60e(){const _0x5f035c=_0x9bcea9;return _0x181994[_0x5f035c('0x88d')][_0x5f035c('0x42f')]['call'](this);}}}}}for(const _0x5053f2 of _0x546935[_0x9bcea9('0x5a3')]()){if(!_0x5053f2)continue;_0x180dc5=VisuMZ[_0x9bcea9('0x88d')][_0x9bcea9('0x34b')](_0x5053f2,_0x4a17f6[_0x9bcea9('0x6e6')](_0x9bcea9('0x139')));if(VisuMZ['BattleCore']['JS'][_0x180dc5]){if(_0x9bcea9('0x87e')!==_0x9bcea9('0x87e')){function _0x59354d(){const _0x54d354=_0x9bcea9;this[_0x54d354('0xb0')](_0x54d354('0x232'));const _0x49d35f=this[_0x54d354('0x48')];_0x43e52c[_0x54d354('0x88d')][_0x54d354('0x819')][_0x54d354('0x618')](this),this['_escapeRatio']=_0x49d35f+_0x47b35f[_0x54d354('0x88d')][_0x54d354('0x39b')][_0x54d354('0x6f4')][_0x54d354('0x2aa')]['call'](this),this[_0x54d354('0x4a1')]('EscapeFail');}}else{_0x56ee1a=VisuMZ[_0x9bcea9('0x88d')]['JS'][_0x180dc5][_0x9bcea9('0x618')](this,this['subject'](),_0x546935,_0x5053f2,_0x56ee1a);if(_0xa07e18)_0x56ee1a=_0x1f8c37;}}}return _0x56ee1a;},Game_Action[_0x5f4923('0x14f')]['actionBattleCoreJS']=function(_0x3d8c2d){const _0x14eab8=_0x5f4923,_0x4405fa=this[_0x14eab8('0x82a')]||0x0,_0x3bcecf=VisuMZ[_0x14eab8('0x88d')][_0x14eab8('0x39b')][_0x14eab8('0x6f4')],_0x3f23ac=_0x3d8c2d[_0x14eab8('0x6e6')]('');if(_0x3bcecf[_0x3f23ac]){if(_0x14eab8('0x2f0')!==_0x14eab8('0x2f0')){function _0x4ce371(){const _0x4daf50=_0x14eab8;this[_0x4daf50('0x87d')]=!![];}}else _0x3bcecf[_0x3f23ac][_0x14eab8('0x618')](this,_0x4405fa);}let _0x468a17=VisuMZ['BattleCore'][_0x14eab8('0x34b')](this['item'](),_0x3d8c2d);if(VisuMZ[_0x14eab8('0x88d')]['JS'][_0x468a17]){if('umKDQ'!==_0x14eab8('0x2d7')){function _0x23b187(){const _0x300a64=_0x14eab8;return this[_0x300a64('0x4b8')][_0x300a64('0x582')]();}}else VisuMZ[_0x14eab8('0x88d')]['JS'][_0x468a17][_0x14eab8('0x618')](this,this[_0x14eab8('0x394')](),this['subject'](),this[_0x14eab8('0x555')](),_0x4405fa);}for(const _0x449de5 of this['subject']()['traitObjects']()){if(!_0x449de5)continue;_0x468a17=VisuMZ[_0x14eab8('0x88d')][_0x14eab8('0x34b')](_0x449de5,_0x3d8c2d),VisuMZ[_0x14eab8('0x88d')]['JS'][_0x468a17]&&VisuMZ[_0x14eab8('0x88d')]['JS'][_0x468a17][_0x14eab8('0x618')](this,this[_0x14eab8('0x394')](),this[_0x14eab8('0x394')](),_0x449de5,_0x4405fa);}},Game_Action['prototype'][_0x5f4923('0x849')]=function(){const _0x485bde=_0x5f4923;return VisuMZ[_0x485bde('0x88d')][_0x485bde('0x39b')][_0x485bde('0x6f4')][_0x485bde('0x5e8')][_0x485bde('0x618')](this);},Game_Action['prototype'][_0x5f4923('0x93')]=function(){const _0x41e684=_0x5f4923;return VisuMZ['BattleCore'][_0x41e684('0x39b')]['Mechanics']['AllowRandomSpeed'];},Game_Action['prototype'][_0x5f4923('0x664')]=function(){const _0x51b86a=_0x5f4923;return this[_0x51b86a('0x555')]()['note'][_0x51b86a('0x5ae')](/<JS TARGETS>/i);},Game_Action[_0x5f4923('0x14f')]['isBattleCoreTargetScope']=function(){const _0x1b810b=_0x5f4923;if(!this[_0x1b810b('0xa7')]&&this[_0x1b810b('0x394')]()['isConfused']())return![];if(this['isCustomBattleScope']())return!![];return typeof this[_0x1b810b('0x555')]()[_0x1b810b('0x59b')]==='string';},VisuMZ['BattleCore'][_0x5f4923('0x873')]=Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x397')],Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x397')]=function(){const _0x431b82=_0x5f4923;if(this[_0x431b82('0x766')]()&&!this[_0x431b82('0x664')]()){if(_0x431b82('0x525')!=='kHKlQ'){function _0xb2069b(){const _0x14d758=_0x431b82;_0x564af9[_0x14d758('0x88d')][_0x14d758('0x12c')][_0x14d758('0x618')](this);}}else return this[_0x431b82('0x767')]();}else return VisuMZ[_0x431b82('0x88d')][_0x431b82('0x873')][_0x431b82('0x618')](this);},Game_Action['prototype'][_0x5f4923('0x767')]=function(){const _0x32b3a3=_0x5f4923,_0x4a2c5b=this[_0x32b3a3('0x555')]()['scope'];return _0x4a2c5b[_0x32b3a3('0x5ae')](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ['BattleCore'][_0x5f4923('0x42f')]=Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x7b5')],Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x7b5')]=function(){const _0x3ad571=_0x5f4923;if(this[_0x3ad571('0x766')]()&&!this[_0x3ad571('0x664')]()){if(_0x3ad571('0x562')===_0x3ad571('0x897')){function _0x317772(){const _0x23ecc6=_0x3ad571;this[_0x23ecc6('0x70a')]['push']('addText',_0x4d9f3a[_0x23ecc6('0x4d8')]['format'](_0x171b61[_0x23ecc6('0x28b')]())),this[_0x23ecc6('0x70a')][_0x23ecc6('0x2fc')]('wait');}}else return this[_0x3ad571('0x58b')]();}else return VisuMZ[_0x3ad571('0x88d')][_0x3ad571('0x42f')][_0x3ad571('0x618')](this);},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x58b')]=function(){const _0x3a7f42=_0x5f4923,_0x170d8f=this['item']()['scope'];return _0x170d8f[_0x3a7f42('0x5ae')](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ['BattleCore'][_0x5f4923('0x44f')]=Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x830')],Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x830')]=function(){const _0x27f014=_0x5f4923;if(this[_0x27f014('0x766')]()&&!this[_0x27f014('0x664')]()){if(_0x27f014('0x50b')===_0x27f014('0xaf')){function _0x347f38(){const _0x47cfb0=_0x27f014;_0x268898[_0x47cfb0('0x67a')]()?_0x497119['prototype'][_0x47cfb0('0x7bb')][_0x47cfb0('0x618')](this):_0xdc1e1b['BattleCore']['Scene_Battle_stop']['call'](this);}}else return this['isForRandomBattleCore']();}else return VisuMZ[_0x27f014('0x88d')][_0x27f014('0x44f')][_0x27f014('0x618')](this);},Game_Action['prototype']['isForRandomBattleCore']=function(){const _0xa0d5cd=_0x5f4923,_0x3a8d17=this['item']()['scope'];return _0x3a8d17[_0xa0d5cd('0x5ae')](/(?:RAND|RANDOM)/i);},VisuMZ['BattleCore'][_0x5f4923('0x25b')]=Game_Action['prototype'][_0x5f4923('0x1c0')],Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x1c0')]=function(){const _0x19256e=_0x5f4923;return this[_0x19256e('0x766')]()&&!this['isCustomBattleScope']()?this[_0x19256e('0x77f')]():VisuMZ[_0x19256e('0x88d')][_0x19256e('0x25b')]['call'](this);},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x77f')]=function(){const _0x42d812=_0x5f4923,_0x9225ae=this[_0x42d812('0x555')]()['scope'];if(_0x9225ae['match'](/RANDOM/i))return![];return VisuMZ['BattleCore'][_0x42d812('0x25b')][_0x42d812('0x618')](this);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x178')]=Game_Action[_0x5f4923('0x14f')]['makeTargets'],Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x119')]=function(){const _0x4b295c=_0x5f4923;if(this[_0x4b295c('0x766')]())return this[_0x4b295c('0x6cd')]();else{if(_0x4b295c('0x63b')!==_0x4b295c('0x63b')){function _0x467940(){this['resizeWindowBorderStyle'](_0x212650),this['showHelpWindow']();}}else return VisuMZ[_0x4b295c('0x88d')][_0x4b295c('0x178')][_0x4b295c('0x618')](this);}},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x6cd')]=function(){const _0x3894f2=_0x5f4923;let _0x59221e=[];const _0x43f538=String(this[_0x3894f2('0x555')]()[_0x3894f2('0x59b')]),_0x408709=VisuMZ[_0x3894f2('0x88d')][_0x3894f2('0x34b')](this['item'](),'Targets');if(VisuMZ['BattleCore']['JS'][_0x408709]){if(_0x3894f2('0x9d')!==_0x3894f2('0x9d')){function _0x34c043(){const _0x333609=_0x3894f2;if(!_0x58bb38[_0x333609('0x64e')]())return;_0x444d92[_0x333609('0x3b4')](_0x436dc6,_0x5377d9);const _0x10997f=_0x175f58[_0x333609('0x7fd')](),_0x4f19db=_0x1bd917[_0x333609('0x50a')],_0x44f1ec=_0x3e157b[_0x333609('0x362')],_0x48fff4=_0x201d0c['CreateActionSequenceTargets'](_0x2e14ed[_0x333609('0x631')]),_0x4d55d3=_0x574186['Mirror'],_0x33fc65=_0x25dec7['_logWindow'];if(!_0x10997f||!_0x4f19db||!_0x44f1ec)return;if(!_0x4f19db[_0x333609('0x555')]())return;let _0x27642a=_0x4f19db['item']()[_0x333609('0x722')];if(_0x27642a<0x0)_0x27642a=_0x44f1ec[_0x333609('0x2fa')]();_0x362e60[_0x333609('0x336')](_0x48fff4,_0x27642a,_0x4d55d3),_0xd50ee6['WaitForAnimation']&&_0x10997f[_0x333609('0x28')](_0x333609('0x47b'));}}else{const _0x1c5b69=VisuMZ[_0x3894f2('0x88d')][_0x3894f2('0x34b')](this[_0x3894f2('0x555')](),_0x3894f2('0x631'));return _0x59221e=VisuMZ[_0x3894f2('0x88d')]['JS'][_0x1c5b69][_0x3894f2('0x618')](this,this['subject'](),_0x59221e),this[_0x3894f2('0x2e2')](_0x59221e);}}if(_0x43f538[_0x3894f2('0x5ae')](/(\d+) RANDOM ANY/i)){if(_0x3894f2('0x8')===_0x3894f2('0x788')){function _0x80d624(){const _0x53dd7c=_0x3894f2,_0x383cd6=_0x4ba7fc[_0x53dd7c('0x88d')][_0x53dd7c('0x39b')]['Damage'],_0x591678=new _0x247c1a();_0x591678[_0x53dd7c('0x70')]=_0x383cd6['PopupDuration'],this['sortDamageSprites'](_0x591678),_0x591678['setup'](this[_0x53dd7c('0x756')]),_0x591678[_0x53dd7c('0x5af')](this[_0x53dd7c('0x756')]),this[_0x53dd7c('0x39a')](_0x591678);}}else{let _0x13ab1f=Number(RegExp['$1']);while(_0x13ab1f--){if(_0x3894f2('0x144')===_0x3894f2('0x144')){const _0x425083=Math[_0x3894f2('0x614')](0x2)===0x0?this[_0x3894f2('0x71b')]():this[_0x3894f2('0x64f')]();_0x59221e[_0x3894f2('0x2fc')](_0x425083[_0x3894f2('0x8d')]());}else{function _0x33e2fb(){const _0xe9aaad=_0x3894f2;_0x1a0936['forceAction'](_0x3c0532[0x2],_0x171e80[0x3]),_0xf46d2[_0xe9aaad('0x163')](_0x4bde83);}}}return this[_0x3894f2('0x2e2')](_0x59221e);}}if(_0x43f538[_0x3894f2('0x5ae')](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x38c57a=Number(RegExp['$1']);while(_0x38c57a--){_0x59221e[_0x3894f2('0x2fc')](this['opponentsUnit']()[_0x3894f2('0x8d')]());}return this[_0x3894f2('0x2e2')](_0x59221e);}if(_0x43f538['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){if('SHxlP'!==_0x3894f2('0x495')){function _0x3a6aaf(){const _0x2c2e38=_0x3894f2;if(_0x4a87c1[_0x2c2e38('0x756')]&&_0x1c982a[_0x2c2e38('0x756')]){if(_0x24b39d[_0x2c2e38('0x756')][_0x2c2e38('0x1c3')]()&&_0x19151e[_0x2c2e38('0x756')][_0x2c2e38('0x323')]())return 0x1;else{if(_0x71c42e[_0x2c2e38('0x756')]['isActor']()&&_0x32d3c4[_0x2c2e38('0x756')][_0x2c2e38('0x323')]())return-0x1;}}}}else{let _0x50c6b8=Number(RegExp['$1']);while(_0x50c6b8--){_0x59221e[_0x3894f2('0x2fc')](this[_0x3894f2('0x64f')]()['trueRandomTarget']());}return this['repeatTargets'](_0x59221e);}}if(_0x43f538[_0x3894f2('0x5ae')](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x3894f2('0x289')===_0x3894f2('0x776')){function _0x583114(){const _0x4c8d05=_0x3894f2,_0x23ba04=this[_0x4c8d05('0x2d3')]();return _0x23ba04?_0x23ba04['weaponImageId']:0x0;}}else return _0x59221e[_0x3894f2('0x2fc')](...this['friendsUnit']()['aliveMembers']()[_0x3894f2('0x7bf')](_0x25b77c=>_0x25b77c!==this[_0x3894f2('0x394')]())),this[_0x3894f2('0x2e2')](_0x59221e);}return VisuMZ[_0x3894f2('0x88d')]['Game_Action_makeTargets'][_0x3894f2('0x618')](this);},Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x47c')]=function(_0x5e3f06){const _0x5746d8=_0x5f4923,_0x279da9=[];for(let _0x1db6cc=0x0;_0x1db6cc<this[_0x5746d8('0x665')]();_0x1db6cc++){if('EEKDV'!=='EEKDV'){function _0x42be19(){const _0x22fef8=_0x5746d8,_0x5e2933=_0x44b7cb(_0x15e8dd['$1']),_0x32a2df=_0x503efe[_0x22fef8('0x88d')][_0x22fef8('0x34b')](_0x273718,_0x22fef8('0x631'));_0x159eb4[_0x22fef8('0x88d')]['createTargetsJS'](_0x5e2933,_0x32a2df);}}else _0x279da9[_0x5746d8('0x2fc')](_0x5e3f06[_0x5746d8('0x8d')]());}return _0x279da9;},VisuMZ[_0x5f4923('0x88d')]['Game_Action_itemEffectAddAttackState']=Game_Action[_0x5f4923('0x14f')][_0x5f4923('0x73f')],Game_Action['prototype'][_0x5f4923('0x73f')]=function(_0x2609cc,_0x5bbab1){const _0x1363f4=_0x5f4923,_0x211df8=_0x2609cc[_0x1363f4('0x201')]();this[_0x1363f4('0x394')]()[_0x1363f4('0x235')]()['includes'](_0x2609cc[_0x1363f4('0x74')]())&&_0x2609cc['setImmortal'](![]),VisuMZ[_0x1363f4('0x88d')]['Game_Action_itemEffectAddAttackState'][_0x1363f4('0x618')](this,_0x2609cc,_0x5bbab1),_0x2609cc[_0x1363f4('0x225')](_0x211df8);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x574')]=Game_Action[_0x5f4923('0x14f')]['itemEffectAddNormalState'],Game_Action[_0x5f4923('0x14f')]['itemEffectAddNormalState']=function(_0x4c48bb,_0x3664c0){const _0x206e94=_0x5f4923,_0x16581a=_0x4c48bb[_0x206e94('0x201')]();_0x3664c0[_0x206e94('0x78b')]===_0x4c48bb[_0x206e94('0x74')]()&&_0x4c48bb[_0x206e94('0x225')](![]),VisuMZ[_0x206e94('0x88d')][_0x206e94('0x574')][_0x206e94('0x618')](this,_0x4c48bb,_0x3664c0),_0x4c48bb['setImmortal'](_0x16581a);},VisuMZ['BattleCore'][_0x5f4923('0x3f9')]=Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x7b8')],Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x7b8')]=function(){const _0x3e68f4=_0x5f4923;VisuMZ[_0x3e68f4('0x88d')]['Game_BattlerBase_initMembers'][_0x3e68f4('0x618')](this),this[_0x3e68f4('0x62f')]();},Game_BattlerBase[_0x5f4923('0x14f')]['initMembersBattleCore']=function(){const _0x1b63a3=_0x5f4923;this[_0x1b63a3('0xf2')]=![];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x2b9')]=Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x621')],Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x621')]=function(){const _0x5b5fce=_0x5f4923;this[_0x5b5fce('0x83b')]={},VisuMZ[_0x5b5fce('0x88d')][_0x5b5fce('0x2b9')]['call'](this);},Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x76e')]=function(_0x46190f){const _0x17cb09=_0x5f4923;return this['_cache']=this[_0x17cb09('0x83b')]||{},this[_0x17cb09('0x83b')][_0x46190f]!==undefined;},Game_BattlerBase['prototype'][_0x5f4923('0x870')]=function(){const _0x20db6d=_0x5f4923;if(this[_0x20db6d('0x83b')][_0x20db6d('0x870')]!==undefined)return this['_cache'][_0x20db6d('0x870')];const _0x2d4587=/<DAMAGE CAP:[ ](\d+)>/i,_0x28b507=this[_0x20db6d('0x5a3')]()['map'](_0x2f3d5b=>_0x2f3d5b&&_0x2f3d5b[_0x20db6d('0x331')]['match'](_0x2d4587)?Number(RegExp['$1']):0x0);let _0x115402=_0x28b507[_0x20db6d('0x568')]>0x0?Math[_0x20db6d('0x489')](..._0x28b507):0x0;if(_0x115402<=0x0)_0x115402=VisuMZ['BattleCore'][_0x20db6d('0x39b')][_0x20db6d('0x15d')][_0x20db6d('0x189')];return this[_0x20db6d('0x83b')][_0x20db6d('0x870')]=_0x115402,this[_0x20db6d('0x83b')]['hardDamageCap'];},Game_BattlerBase['prototype'][_0x5f4923('0x5d6')]=function(){const _0x5b99d1=_0x5f4923;if(this[_0x5b99d1('0x83b')]['softDamageCap']!==undefined)return this[_0x5b99d1('0x83b')][_0x5b99d1('0x380')];let _0x6469f2=VisuMZ[_0x5b99d1('0x88d')][_0x5b99d1('0x39b')][_0x5b99d1('0x15d')][_0x5b99d1('0xa0')];const _0x153a59=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x11eefd=this['traitObjects']()['map'](_0x4e6bcd=>_0x4e6bcd&&_0x4e6bcd[_0x5b99d1('0x331')][_0x5b99d1('0x5ae')](_0x153a59)?Number(RegExp['$1'])/0x64:0x0);return _0x6469f2=_0x11eefd[_0x5b99d1('0x55a')]((_0x4914a9,_0x4fcd78)=>_0x4914a9+_0x4fcd78,_0x6469f2),this[_0x5b99d1('0x83b')][_0x5b99d1('0x380')]=_0x6469f2,this[_0x5b99d1('0x83b')]['softDamageCap']['clamp'](0.01,0x1);},VisuMZ[_0x5f4923('0x88d')]['Game_BattlerBase_die']=Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x6e1')],Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x6e1')]=function(){const _0x423027=_0x5f4923;VisuMZ[_0x423027('0x88d')]['Game_BattlerBase_die'][_0x423027('0x618')](this),SceneManager[_0x423027('0x64e')]()&&this[_0x423027('0x18')](_0x423027('0x3d'));},Game_BattlerBase['prototype'][_0x5f4923('0x17f')]=function(){const _0x47a723=_0x5f4923;if(!SceneManager[_0x47a723('0x64e')]())return null;if(!SceneManager[_0x47a723('0x60a')][_0x47a723('0xc5')])return null;return SceneManager[_0x47a723('0x60a')][_0x47a723('0xc5')][_0x47a723('0x686')](this);},Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x36a')]=function(){const _0x517041=_0x5f4923;return VisuMZ['BattleCore'][_0x517041('0x39b')][_0x517041('0x5dc')][_0x517041('0x1fa')];},Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x7d5')]=function(){const _0x50054b=_0x5f4923;return VisuMZ['BattleCore']['Settings'][_0x50054b('0x5dc')][_0x50054b('0x4d2')];},Game_BattlerBase['prototype']['svBattlerShadowVisible']=function(){const _0x2365bb=_0x5f4923;return this[_0x2365bb('0x1c3')]&&this[_0x2365bb('0x1c3')]()?VisuMZ['BattleCore'][_0x2365bb('0x39b')][_0x2365bb('0x5dc')][_0x2365bb('0x291')]:VisuMZ[_0x2365bb('0x88d')][_0x2365bb('0x39b')][_0x2365bb('0x510')][_0x2365bb('0x291')];},Game_BattlerBase[_0x5f4923('0x14f')]['battlerSmoothImage']=function(){return!![];},Game_BattlerBase['prototype'][_0x5f4923('0x74f')]=function(){return 0x0;},Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x54b')]=function(){return 0x0;},Game_BattlerBase['prototype']['createBattleUIOffsetX']=function(_0x1d6c19){const _0x46dda0=_0x5f4923;if(!_0x1d6c19)return 0x0;let _0x588691=0x0;const _0x11ed96=_0x1d6c19['note'];if(_0x11ed96[_0x46dda0('0x5ae')](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x46dda0('0x5f0')===_0x46dda0('0x5f0'))_0x588691+=Number(RegExp['$1']);else{function _0x446ea0(){return!![];}}}return _0x11ed96[_0x46dda0('0x5ae')](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x588691+=Number(RegExp['$1'])),_0x588691;},Game_BattlerBase[_0x5f4923('0x14f')]['createBattleUIOffsetY']=function(_0xc3ec5d){const _0x5bf56f=_0x5f4923;if(!_0xc3ec5d)return 0x0;let _0x2cd80b=0x0;const _0x3eedde=_0xc3ec5d[_0x5bf56f('0x331')];return _0x3eedde[_0x5bf56f('0x5ae')](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x2cd80b+=Number(RegExp['$1'])),_0x3eedde[_0x5bf56f('0x5ae')](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2cd80b+=Number(RegExp['$2'])),_0x2cd80b;},VisuMZ[_0x5f4923('0x88d')]['Game_BattlerBase_isStateResist']=Game_BattlerBase['prototype'][_0x5f4923('0xf')],Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0xf')]=function(_0x5cb1ae){const _0x5adb91=_0x5f4923;if(_0x5cb1ae===this[_0x5adb91('0x74')]()&&this[_0x5adb91('0x201')]()){if('Vynbl'!==_0x5adb91('0x5d2'))return!![];else{function _0x28ba27(){const _0xd0a091=_0x5adb91;if(!_0x40efd1[_0xd0a091('0x64e')]())return;if(!_0x32dbc7[_0xd0a091('0x620')])return;_0x49ba46[_0xd0a091('0x3b4')](_0x2eed7c,_0x307b37);const _0x1acae2=_0x5b9364['getLastPluginCommandInterpreter'](),_0x2e274e=_0x3dc90c[_0xd0a091('0x37e')];if(!_0x1acae2)return;_0x4345bf['setBattleSkew'](_0xc7aab2[_0xd0a091('0x272')],_0x417125[_0xd0a091('0x3ef')],_0x431faf[_0xd0a091('0x79d')],_0x25fcaf[_0xd0a091('0x7d4')]);if(_0x2e274e)_0x1acae2[_0xd0a091('0x28')](_0xd0a091('0x3df'));}}}return VisuMZ[_0x5adb91('0x88d')][_0x5adb91('0x39')][_0x5adb91('0x618')](this,_0x5cb1ae);},Game_BattlerBase[_0x5f4923('0x14f')]['isImmortal']=function(){const _0x50b790=_0x5f4923;return this[_0x50b790('0xf2')];},Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x225')]=function(_0x278931){const _0x1d7765=_0x5f4923;_0x278931?this['addImmortal']():this[_0x1d7765('0x2a9')]();},Game_BattlerBase['prototype']['addImmortal']=function(){const _0xa039ef=_0x5f4923;if(this['isDead']())return;this[_0xa039ef('0xf2')]=!![];},Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x2a9')]=function(){const _0x200220=_0x5f4923,_0x34c349=this['isAlive']();this[_0x200220('0xf2')]=![],this[_0x200220('0x621')](),this[_0x200220('0x110')]()&&_0x34c349&&(this['performCollapse'](),this['requestMotionRefresh']());},VisuMZ['BattleCore'][_0x5f4923('0x721')]=Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x403')],Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x403')]=function(){const _0x2b2872=_0x5f4923;if(!this['canAttackBattleCore']())return![];return VisuMZ[_0x2b2872('0x88d')][_0x2b2872('0x721')][_0x2b2872('0x618')](this);},Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x6ed')]=function(){const _0x402a4c=_0x5f4923;for(const _0x1bf98d of this['traitObjects']()){if(_0x402a4c('0x826')!==_0x402a4c('0x826')){function _0x22e5d2(){const _0x290c2c=_0x402a4c;_0x45153a[_0x290c2c('0xb3')]();}}else{if(!_0x1bf98d)continue;if(_0x1bf98d[_0x402a4c('0x331')][_0x402a4c('0x5ae')](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}}return!![];},VisuMZ[_0x5f4923('0x88d')]['Game_BattlerBase_canGuard']=Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x684')],Game_BattlerBase[_0x5f4923('0x14f')]['canGuard']=function(){const _0x5c65b6=_0x5f4923;if(!this[_0x5c65b6('0x1b5')]())return![];return VisuMZ[_0x5c65b6('0x88d')][_0x5c65b6('0x207')]['call'](this);},Game_BattlerBase['prototype'][_0x5f4923('0x1b5')]=function(){const _0x139870=_0x5f4923;for(const _0x470bc3 of this[_0x139870('0x5a3')]()){if(!_0x470bc3)continue;if(_0x470bc3[_0x139870('0x331')][_0x139870('0x5ae')](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase[_0x5f4923('0x14f')][_0x5f4923('0x391')]=function(){const _0x457e84=_0x5f4923;for(const _0x44ad35 of this[_0x457e84('0x5a3')]()){if(!_0x44ad35)continue;if(_0x44ad35[_0x457e84('0x331')][_0x457e84('0x5ae')](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x859')]=Game_Battler['prototype'][_0x5f4923('0x3e')],Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x3e')]=function(){const _0x233ffa=_0x5f4923;if(SceneManager[_0x233ffa('0x64e')]()&&$gameTroop[_0x233ffa('0x793')]()<=0x0)return;this[_0x233ffa('0xb0')]('PreRegenerateJS'),VisuMZ[_0x233ffa('0x88d')]['Game_Battler_regenerateAll'][_0x233ffa('0x618')](this),this[_0x233ffa('0x7e6')](),this[_0x233ffa('0xb0')]('PostRegenerateJS');},Game_Battler[_0x5f4923('0x14f')]['regenerateAllBattleCore']=function(){const _0xa9f0a=_0x5f4923;if(SceneManager['isSceneBattle']())for(const _0x3a3166 of this[_0xa9f0a('0x5a3')]()){if(!_0x3a3166)continue;this['onRegeneratePlayStateAnimation'](_0x3a3166);}},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x37f')]=function(_0x5f420d){const _0x3d04e5=_0x5f4923;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!SceneManager[_0x3d04e5('0x64e')]())return;if(this[_0x3d04e5('0x110')]())return;if(this[_0x3d04e5('0x6fc')]())return;if(_0x5f420d[_0x3d04e5('0x331')][_0x3d04e5('0x5ae')](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){if(_0x3d04e5('0x4a4')===_0x3d04e5('0x2ff')){function _0x418097(){const _0xa132c3=_0x3d04e5;_0x32d492['message4']&&(this[_0xa132c3('0x2fc')](_0xa132c3('0x5c5')),this['push'](_0xa132c3('0x1d2')),this[_0xa132c3('0x2fc')]('addText',_0x54e8f8[_0xa132c3('0x2a8')][_0xa132c3('0x6e6')](_0x5e5b1d[_0xa132c3('0x28b')]())),this[_0xa132c3('0x2fc')](_0xa132c3('0x12d')));}}else{const _0x5f3696=Number(RegExp['$1']);$gameTemp[_0x3d04e5('0x41b')]([this],_0x5f3696,![],![]);}}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x1df')]=Game_Battler['prototype'][_0x5f4923('0x540')],Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x540')]=function(){const _0x7211b9=_0x5f4923;this['processBattleCoreJS']('PreStartTurnJS'),VisuMZ['BattleCore']['Game_Battler_startTpbTurn'][_0x7211b9('0x618')](this),this[_0x7211b9('0xb0')](_0x7211b9('0x633'));},VisuMZ[_0x5f4923('0x88d')]['Game_Battler_onTurnEnd']=Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x52')],Game_Battler['prototype'][_0x5f4923('0x52')]=function(){const _0x27bb8a=_0x5f4923;this[_0x27bb8a('0xb0')](_0x27bb8a('0x490')),VisuMZ['BattleCore'][_0x27bb8a('0x372')][_0x27bb8a('0x618')](this),this[_0x27bb8a('0xb0')](_0x27bb8a('0x4d'));},Game_Battler['prototype'][_0x5f4923('0xb0')]=function(_0x3df1e5){const _0x187680=_0x5f4923,_0x46cad9=VisuMZ['BattleCore'][_0x187680('0x39b')][_0x187680('0x6f4')];if(_0x46cad9[_0x3df1e5])_0x46cad9[_0x3df1e5]['call'](this);for(const _0x5d8be0 of this[_0x187680('0x5a3')]()){if('FgcCY'==='FgcCY'){if(!_0x5d8be0)continue;key=VisuMZ['BattleCore'][_0x187680('0x34b')](_0x5d8be0,_0x3df1e5);if(VisuMZ[_0x187680('0x88d')]['JS'][key]){if(_0x187680('0x516')===_0x187680('0x398')){function _0xe63f27(){const _0x31e7e3=_0x187680;if(this[_0x31e7e3('0x83b')]['softDamageCap']!==_0xb9be25)return this['_cache']['softDamageCap'];let _0x3b9d05=_0x91bb87[_0x31e7e3('0x88d')][_0x31e7e3('0x39b')][_0x31e7e3('0x15d')][_0x31e7e3('0xa0')];const _0x23708c=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x472d1a=this['traitObjects']()[_0x31e7e3('0x17b')](_0x45c6a7=>_0x45c6a7&&_0x45c6a7['note'][_0x31e7e3('0x5ae')](_0x23708c)?_0x3df167(_0x536628['$1'])/0x64:0x0);return _0x3b9d05=_0x472d1a[_0x31e7e3('0x55a')]((_0x2b0601,_0xb4abdf)=>_0x2b0601+_0xb4abdf,_0x3b9d05),this[_0x31e7e3('0x83b')]['softDamageCap']=_0x3b9d05,this[_0x31e7e3('0x83b')]['softDamageCap'][_0x31e7e3('0xbc')](0.01,0x1);}}else VisuMZ['BattleCore']['JS'][key][_0x187680('0x618')](this,this,this,_0x5d8be0,0x0);}}else{function _0x18ebe1(){const _0x440afa=_0x187680;return this[_0x440afa('0x834')]>0x0;}}}},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x6a9')]=function(){const _0x4f7d92=_0x5f4923;return VisuMZ[_0x4f7d92('0x88d')][_0x4f7d92('0x39b')][_0x4f7d92('0x5dc')][_0x4f7d92('0x5a0')]||![];},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x4d3')]=function(){const _0x1072cd=_0x5f4923;if(this[_0x1072cd('0x95')]()){if(this[_0x1072cd('0x6a9')]()){if(_0x1072cd('0x7b6')!=='mjEce'){if(this[_0x1072cd('0x3a6')][_0x1072cd('0x38d')](_0x2078fe=>_0x2078fe[_0x1072cd('0x555')]()&&_0x2078fe['isMagical']()))return!![];}else{function _0x38c30e(){const _0x5e4d94=_0x25626a(_0x29572e['$1']);this['addSingleSkillCommand'](_0x576fd6[_0x5e4d94]);}}}else{if(this[_0x1072cd('0x3a6')][_0x1072cd('0x38d')](_0x4d73c2=>_0x4d73c2['item']()&&_0x4d73c2['isMagicSkill']())){if('Mblld'!=='PWhyI')return!![];else{function _0x1fc394(){const _0x79557f=_0x1072cd;this[_0x79557f('0xf2')]=![];}}}}}if(BattleManager[_0x1072cd('0x1d0')]()&&this['_tpbState']===_0x1072cd('0x67e')){if(this[_0x1072cd('0x6a9')]()){if('upSOA'==='upSOA')return this[_0x1072cd('0x677')]()&&this[_0x1072cd('0x677')]()[_0x1072cd('0x555')]()&&this[_0x1072cd('0x677')]()['isMagical']();else{function _0x3f233a(){const _0x26181c=_0x1072cd,_0x31ca6d=_0x2b0074(_0x2be197['$1']);return _0x6fa1fd[_0x26181c('0x361')]()[_0x26181c('0x7bf')](_0x27d907=>_0x27d907[_0x26181c('0x55d')]()===_0x31ca6d);}}}else return this[_0x1072cd('0x677')]()&&this[_0x1072cd('0x677')]()[_0x1072cd('0x555')]()&&this[_0x1072cd('0x677')]()['isMagicSkill']();}return![];},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x4ca')]=function(){const _0x1be457=_0x5f4923;if(BattleManager[_0x1be457('0x1d0')]()&&this[_0x1be457('0x70b')]===_0x1be457('0x67e')){if(_0x1be457('0x4d9')===_0x1be457('0x7d6')){function _0x1dda88(){const _0x1c4d51=_0x1be457;this[_0x1c4d51('0x83b')]['svAnchorY']=_0x25bc33[_0x1c4d51('0x14f')][_0x1c4d51('0x7d5')]['call'](this);}}else{if(this[_0x1be457('0x6a9')]())return this[_0x1be457('0x677')]()&&this[_0x1be457('0x677')]()[_0x1be457('0x555')]()&&!this['currentAction']()[_0x1be457('0x434')]();else{if('TkPSo'==='mfwse'){function _0x1bff59(){const _0x1a4dcd=_0x1be457;this['x']=_0x4ef538[_0x1a4dcd('0x49b')]-this[_0x1a4dcd('0x42')]()[_0x1a4dcd('0x17f')]()['_baseX'];}}else return this[_0x1be457('0x677')]()&&this[_0x1be457('0x677')]()[_0x1be457('0x555')]()&&!this['currentAction']()['isMagicSkill']();}}}return![];},VisuMZ[_0x5f4923('0x88d')]['Game_Battler_clearDamagePopup']=Game_Battler['prototype']['clearDamagePopup'],Game_Battler[_0x5f4923('0x14f')]['clearDamagePopup']=function(){const _0x53747e=_0x5f4923;VisuMZ['BattleCore'][_0x53747e('0x78e')][_0x53747e('0x618')](this),this[_0x53747e('0x4b8')]=[];},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x491')]=function(){const _0x45a9f3=_0x5f4923;if(!this[_0x45a9f3('0x4b8')])this[_0x45a9f3('0x418')]();return this[_0x45a9f3('0x4b8')][_0x45a9f3('0x568')]>0x0;},Game_Battler[_0x5f4923('0x14f')]['startDamagePopup']=function(){const _0x4cf169=_0x5f4923;if(!SceneManager[_0x4cf169('0x64e')]())return;if(!this[_0x4cf169('0x4b8')])this[_0x4cf169('0x418')]();this[_0x4cf169('0x253')]();const _0x51fc7d=this[_0x4cf169('0x17f')]();if(_0x51fc7d)_0x51fc7d[_0x4cf169('0x522')]();},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x253')]=function(){const _0x40b30d=_0x5f4923,_0x2677bd=this['result']();if(_0x2677bd[_0x40b30d('0x714')]||_0x2677bd[_0x40b30d('0x3c')]){const _0x1fd5d8=JsonEx[_0x40b30d('0x206')](_0x2677bd);_0x1fd5d8[_0x40b30d('0x635')]=![],_0x1fd5d8['mpDamage']=0x0,this[_0x40b30d('0x4b8')][_0x40b30d('0x2fc')](_0x1fd5d8);}if(_0x2677bd[_0x40b30d('0x635')]){const _0x36405d=JsonEx[_0x40b30d('0x206')](_0x2677bd);_0x36405d[_0x40b30d('0x714')]=![],_0x36405d[_0x40b30d('0x3c')]=![],_0x36405d[_0x40b30d('0x2c6')]=0x0,this[_0x40b30d('0x4b8')][_0x40b30d('0x2fc')](_0x36405d);}if(_0x2677bd[_0x40b30d('0x2c6')]!==0x0){const _0x57af28=JsonEx['makeDeepCopy'](_0x2677bd);_0x57af28[_0x40b30d('0x714')]=![],_0x57af28[_0x40b30d('0x3c')]=![],_0x57af28[_0x40b30d('0x635')]=![],this['_damagePopupArray']['push'](_0x57af28);}},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x126')]=function(){const _0x5746fc=_0x5f4923;if(!this[_0x5746fc('0x4b8')])this['clearDamagePopup']();return VisuMZ[_0x5746fc('0x88d')][_0x5746fc('0x39b')]['Damage'][_0x5746fc('0x1c8')]?this[_0x5746fc('0x4b8')]['shift']():this[_0x5746fc('0x4b8')][_0x5746fc('0x2df')]();},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x34d')]=function(_0x50e81e,_0x15a747){const _0x576371=_0x5f4923;if(!SceneManager[_0x576371('0x64e')]())return;if(!this[_0x576371('0x17f')]())return;if(_0x50e81e[_0x576371('0x568')]<=0x0)return;_0x15a747=_0x15a747||{},_0x15a747[_0x576371('0x1e8')]=_0x15a747[_0x576371('0x1e8')]||_0x576371('0x3f'),_0x15a747['flashColor']=_0x15a747[_0x576371('0x850')]||[0x0,0x0,0x0,0x0],_0x15a747[_0x576371('0x40b')]=_0x15a747[_0x576371('0x40b')]||0x0,this[_0x576371('0x17f')]()[_0x576371('0x34d')](_0x50e81e,_0x15a747);},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x575')]=function(_0x262897,_0x467d79,_0x51e187){const _0x3a6e29=_0x5f4923;if(!SceneManager['isSceneBattle']())return;if(!this[_0x3a6e29('0x17f')]())return;if(_0x467d79[_0x3a6e29('0x568')]<=0x0)return;_0x51e187=_0x51e187||{},_0x51e187[_0x3a6e29('0x1e8')]=_0x51e187[_0x3a6e29('0x1e8')]||'#ffffff',_0x51e187[_0x3a6e29('0x850')]=_0x51e187[_0x3a6e29('0x850')]||[0x0,0x0,0x0,0x0],_0x51e187[_0x3a6e29('0x40b')]=_0x51e187[_0x3a6e29('0x40b')]||0x0,this[_0x3a6e29('0x17f')]()[_0x3a6e29('0x575')](_0x262897,_0x467d79,_0x51e187);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x3e3')]=Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x6fa')],Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x6fa')]=function(){const _0x177121=_0x5f4923;VisuMZ[_0x177121('0x88d')]['Game_Battler_clearMotion']['call'](this),this[_0x177121('0x5a9')]();},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x71')]=function(){return!![];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x45b')]=Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x11')],Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x11')]=function(_0x15787f){const _0x3a83da=_0x5f4923;VisuMZ[_0x3a83da('0x88d')]['Game_Battler_onBattleStart'][_0x3a83da('0x618')](this,_0x15787f),this[_0x3a83da('0x1b7')](_0x15787f);},Game_Battler['prototype'][_0x5f4923('0x1b7')]=function(_0x8b64ff){const _0x407315=_0x5f4923;this[_0x407315('0x2f6')](![]);},VisuMZ[_0x5f4923('0x88d')]['Game_Battler_performActionStart']=Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x42e')],Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x42e')]=function(_0x12026f){const _0x17cc12=_0x5f4923;VisuMZ[_0x17cc12('0x88d')][_0x17cc12('0x3d7')][_0x17cc12('0x618')](this,_0x12026f);if(!_0x12026f[_0x17cc12('0x61f')]()){const _0x1a0516=this[_0x17cc12('0x17f')]();if(_0x1a0516)_0x1a0516[_0x17cc12('0x4e2')]();}this[_0x17cc12('0x2f6')](![]);},VisuMZ['BattleCore'][_0x5f4923('0x27a')]=Game_Battler['prototype'][_0x5f4923('0x404')],Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x404')]=function(){const _0x34a576=_0x5f4923;VisuMZ[_0x34a576('0x88d')]['Game_Battler_performActionEnd'][_0x34a576('0x618')](this),this['_flinched']=![];const _0x11c2e7=this[_0x34a576('0x17f')]();if(_0x11c2e7)_0x11c2e7[_0x34a576('0x5ef')]();this[_0x34a576('0x2f6')](![]),this[_0x34a576('0x3d3')]();},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x3aa')]=function(_0x45e866){const _0x2146f0=_0x5f4923;if(_0x45e866['isAttack']())this['performAttack']();else{if(_0x45e866[_0x2146f0('0x61f')]()){if(_0x2146f0('0x509')===_0x2146f0('0x4a7')){function _0x3f34d2(){const _0x2cbd02=_0x2146f0;this[_0x2cbd02('0x3d3')]();}}else this[_0x2146f0('0x18')](_0x2146f0('0x626'));}else{if(_0x45e866[_0x2146f0('0x434')]())this['requestMotion']('spell');else{if(_0x45e866[_0x2146f0('0x4dd')]()){if(_0x45e866['item']()[_0x2146f0('0x11b')][_0x2146f0('0xa1')]>0x0)this[_0x2146f0('0x2d')]();else{if('UzTFI'!==_0x2146f0('0x3e5')){function _0x11856d(){const _0x23136a=_0x2146f0;if(_0x3689cc['_forcedBattleLayout']!==_0xf6cec8)return _0x441a4d[_0x23136a('0x7db')];if(this['_battleLayoutStyle'])return this['_battleLayoutStyle'];return this[_0x23136a('0x87c')]=_0x19b747[_0x23136a('0x88d')][_0x23136a('0x39b')][_0x23136a('0x88f')][_0x23136a('0x112')][_0x23136a('0x3ec')]()[_0x23136a('0x32d')](),this[_0x23136a('0x87c')];}}else this[_0x2146f0('0x18')](_0x2146f0('0x739'));}}else{if(_0x45e866[_0x2146f0('0x25a')]()){if(_0x2146f0('0x3c9')!==_0x2146f0('0x4e1'))this[_0x2146f0('0x18')](_0x2146f0('0x555'));else{function _0xf9eea(){_0x4dafad=_0x11479f['boxWidth']/0x2,_0x3e66c7=_0x3fd230['boxHeight']/0x2;}}}}}}}},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2d3')]=function(){const _0x26d3df=_0x5f4923;return $dataSystem[_0x26d3df('0x462')][0x0];},Game_Battler['prototype'][_0x5f4923('0x366')]=function(){const _0x3948bf=_0x5f4923,_0xd0aaee=this[_0x3948bf('0x2d3')]();return _0xd0aaee?_0xd0aaee[_0x3948bf('0x472')]:0x0;},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x386')]=function(_0x66efef){const _0x31a68d=_0x5f4923;if(!$gameSystem[_0x31a68d('0x773')]())return;const _0x47348c=this['battler'](),_0x6f17ef=_0x66efef['battler']();if(!_0x47348c||!_0x6f17ef)return;const _0x4fd439=_0x6f17ef[_0x31a68d('0x280')],_0x297c13=_0x6f17ef['_baseY'];this[_0x31a68d('0x663')](_0x4fd439,_0x297c13,0x0,![],'Linear',-0x1),_0x47348c[_0x31a68d('0x6')]();const _0x2e4d17=VisuMZ[_0x31a68d('0x88d')]['Settings'][_0x31a68d('0x19')];let _0x9820c5=(_0x6f17ef[_0x31a68d('0x77b')]+_0x47348c['width'])/0x2;_0x9820c5*=this[_0x31a68d('0x1c3')]()?0x1:-0x1;let _0x4b7a17=_0x2e4d17['StepDistanceY']*(this[_0x31a68d('0x1c3')]()?0x1:-0x1);_0x66efef[_0x31a68d('0x340')](_0x9820c5,_0x4b7a17,0x0,![],'Linear'),_0x6f17ef[_0x31a68d('0x6')]();},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x18')]=function(_0x59ca1f){const _0x7092a7=_0x5f4923;if(SceneManager[_0x7092a7('0x64e')]()){const _0x4db9b8=this[_0x7092a7('0x17f')]();if(_0x4db9b8){if('mwCGi'!==_0x7092a7('0x142')){function _0x59f887(){return 0x0;}}else _0x4db9b8[_0x7092a7('0x22d')](_0x59ca1f),[_0x7092a7('0x10e'),_0x7092a7('0x6c3'),'missile'][_0x7092a7('0x147')](_0x59ca1f)&&this[_0x7092a7('0x63d')]();}}this['clearFreezeMotion']();},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x63d')]=function(){},Game_Battler['prototype'][_0x5f4923('0x3a')]=function(_0x419934){const _0x546e5c=_0x5f4923;if(SceneManager[_0x546e5c('0x64e')]()){if(_0x546e5c('0x6ad')!=='mtstw'){function _0x1a4ca1(){const _0x4a8881=_0x546e5c;return _0x145f66['BattleCore']['Game_Action_evalDamageFormula'][_0x4a8881('0x618')](this,_0x52df57);}}else{const _0xd0a73c=this[_0x546e5c('0x17f')]();if(_0xd0a73c)_0xd0a73c[_0x546e5c('0x858')](_0x419934);}}},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x6a0')]=function(){const _0x5b0633=_0x5f4923;if(SceneManager[_0x5b0633('0x64e')]()){const _0xe3be81=this[_0x5b0633('0x366')]();this[_0x5b0633('0x3a')](_0xe3be81);}},Game_Battler[_0x5f4923('0x14f')]['performCastAnimation']=function(_0x11276c,_0x4e6a3a){const _0x30bd93=_0x5f4923;if(!_0x11276c)return;if(!_0x11276c['item']())return;if(_0x11276c['isAttack']())return;if(_0x11276c[_0x30bd93('0x61f')]())return;if(_0x11276c[_0x30bd93('0x25a')]())return;let _0x10097e=0x0;const _0x4cfeb7=VisuMZ['BattleCore'][_0x30bd93('0x39b')][_0x30bd93('0x19')],_0x3c5910=_0x11276c[_0x30bd93('0x555')]()[_0x30bd93('0x331')];if(_0x3c5910['match'](/<CAST ANIMATION: (\d+)>/i))_0x10097e=Number(RegExp['$1']);else{if(_0x3c5910[_0x30bd93('0x5ae')](/<NO CAST ANIMATION>/i))return;else{if(_0x11276c['isCertainHit']())_0x10097e=_0x4cfeb7['CastCertain'];else{if(_0x11276c[_0x30bd93('0x5d4')]()){if(_0x30bd93('0x158')===_0x30bd93('0x29f')){function _0x7c3c2b(){const _0x2bb65a=_0x30bd93;return this[_0x2bb65a('0x544')]();}}else _0x10097e=_0x4cfeb7[_0x30bd93('0x641')];}else{if(_0x11276c['isMagical']()){if(_0x30bd93('0x1a3')===_0x30bd93('0x68c')){function _0x3e7ce9(){const _0x6f157d=_0x30bd93;this[_0x6f157d('0x864')](_0x121a4e);}}else _0x10097e=_0x4cfeb7[_0x30bd93('0x4b0')];}}}}}if(_0x10097e>0x0){if(_0x30bd93('0x2cd')==='UbGle'){function _0x5ce1fb(){const _0x531b6c=_0x30bd93,_0x351737=this[_0x531b6c('0x803')]();['xp',_0x531b6c('0x283'),_0x531b6c('0x204')][_0x531b6c('0x147')](_0x351737)&&this[_0x531b6c('0x383')][_0x531b6c('0x4ee')](),this[_0x531b6c('0x6ec')]();}}else $gameTemp[_0x30bd93('0x336')]([this],_0x10097e,!!_0x4e6a3a);}},Game_Battler['prototype'][_0x5f4923('0x619')]=function(){const _0x1a84e3=_0x5f4923;SoundManager[_0x1a84e3('0x871')]();let _0x5c5198=VisuMZ[_0x1a84e3('0x88d')][_0x1a84e3('0x39b')][_0x1a84e3('0x19')]['ReflectAnimation'];if(_0x5c5198>0x0){if(_0x1a84e3('0x86d')!==_0x1a84e3('0x86d')){function _0x4b5745(){const _0x5d3ec3=_0x1a84e3;if(this[_0x5d3ec3('0x1d0')]())this[_0x5d3ec3('0x460')]=_0x5d3ec3('0x717');else this['_forcedBattlers'][_0x5d3ec3('0x568')]>0x0?this[_0x5d3ec3('0x460')]=_0x5d3ec3('0x717'):this[_0x5d3ec3('0x34f')]();}}else $gameTemp['requestAnimation']([this],_0x5c5198);}},VisuMZ[_0x5f4923('0x88d')]['Game_Battler_performDamage']=Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2c8')],Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2c8')]=function(){const _0x37cb20=_0x5f4923;VisuMZ[_0x37cb20('0x88d')][_0x37cb20('0x169')][_0x37cb20('0x618')](this),this[_0x37cb20('0x5e1')]();},Game_Battler['prototype'][_0x5f4923('0x5e1')]=function(){const _0x546eb6=_0x5f4923;if(!$gameSystem['isSideView']())return;if(this[_0x546eb6('0x6b3')])return;this[_0x546eb6('0x6b3')]=!![];const _0x2d9092=this[_0x546eb6('0x17f')]();if(_0x2d9092)_0x2d9092[_0x546eb6('0x68d')]();},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x3d3')]=function(){const _0x1e2cf7=_0x5f4923;if(this[_0x1e2cf7('0x110')]()&&this[_0x1e2cf7('0x270')]!==_0x1e2cf7('0x3d')){this[_0x1e2cf7('0x18')](_0x1e2cf7('0x3d'));return;}if(this['isDead']()&&this[_0x1e2cf7('0x270')]==='dead')return;if(!!this[_0x1e2cf7('0x442')])return;if(this[_0x1e2cf7('0x323')]()){this[_0x1e2cf7('0x17f')]()[_0x1e2cf7('0x30c')](),this['clearFreezeMotion']();return;}if(this[_0x1e2cf7('0x270')]==='victory')return;if(this['_motionType']===_0x1e2cf7('0x1e3')&&!BattleManager['isInputting']())return;if(this[_0x1e2cf7('0x270')]===_0x1e2cf7('0x626')&&!BattleManager[_0x1e2cf7('0x2ce')]())return;this[_0x1e2cf7('0x6fa')]();if(this[_0x1e2cf7('0x17f')]()&&BattleManager['isInputting']()){this['battler']()[_0x1e2cf7('0x30c')](),this['clearFreezeMotion']();return;}},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x168')]=function(){const _0xe44cdb=_0x5f4923;return this[_0xe44cdb('0x1cb')];},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2f6')]=function(_0x252d17){const _0x16eaea=_0x5f4923;if(!$gameSystem[_0x16eaea('0x773')]())return;this[_0x16eaea('0x1cb')]=_0x252d17;const _0xb6e894=this[_0x16eaea('0x17f')]();if(_0xb6e894)_0xb6e894[_0x16eaea('0x698')]();},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x243')]=function(_0x4f0c89,_0x4105f0,_0x359cfb){const _0x2d66f4=_0x5f4923;if(!$gameSystem['isSideView']())return;const _0xbed2bd=this['battler']();if(!_0xbed2bd)return;if(_0x4f0c89===_0xbed2bd[_0x2d66f4('0x280')])return;let _0x30df0e=![];if(this[_0x2d66f4('0x1c3')]()){if('ECOYi'===_0x2d66f4('0x80b')){function _0x21f5b3(){const _0x3e55a6=_0x2d66f4;if(this['_battleLayoutStyle'])return this['_battleLayoutStyle'];return this[_0x3e55a6('0x87c')]=_0x48ff1f['_scene'][_0x3e55a6('0x803')](),this[_0x3e55a6('0x87c')];}}else{if(_0x4f0c89>_0xbed2bd[_0x2d66f4('0x280')])_0x30df0e=!![];if(_0x4f0c89<_0xbed2bd[_0x2d66f4('0x280')])_0x30df0e=![];}}else{if(this['isEnemy']()){if(_0x4f0c89>_0xbed2bd[_0x2d66f4('0x280')])_0x30df0e=![];if(_0x4f0c89<_0xbed2bd['_baseX'])_0x30df0e=!![];}};this[_0x2d66f4('0x2f6')](_0x359cfb?!_0x30df0e:_0x30df0e),_0xbed2bd[_0x2d66f4('0x698')]();},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x340')]=function(_0x21e7fa,_0x21d467,_0x1a7a7d,_0x50b120,_0x1e1ecd){const _0x3a38a4=_0x5f4923;if(!$gameSystem[_0x3a38a4('0x773')]())return;const _0x495e84=this[_0x3a38a4('0x17f')]();if(!_0x495e84)return;if(_0x50b120)this[_0x3a38a4('0x243')](_0x21e7fa+_0x495e84[_0x3a38a4('0x280')],_0x21d467+_0x495e84[_0x3a38a4('0x674')],![]);_0x21e7fa+=_0x495e84['_baseX']-_0x495e84[_0x3a38a4('0x10a')],_0x21d467+=_0x495e84['_baseY']-_0x495e84[_0x3a38a4('0x7f3')],_0x495e84[_0x3a38a4('0x7e9')](_0x21e7fa,_0x21d467,_0x1a7a7d);if(Imported[_0x3a38a4('0x4f6')])_0x495e84['setMoveEasingType'](_0x1e1ecd||_0x3a38a4('0x662'));},Game_Battler[_0x5f4923('0x14f')]['moveBattlerToPoint']=function(_0x45c815,_0x5624fe,_0x1f6d5d,_0x2c1ae9,_0x2de939,_0x4399d3){const _0x485cb1=_0x5f4923;if(!$gameSystem[_0x485cb1('0x773')]())return;const _0x584efe=this[_0x485cb1('0x17f')]();if(!_0x584efe)return;if(_0x4399d3>=0x0){if(_0x584efe[_0x485cb1('0x280')]>_0x45c815)_0x45c815+=_0x584efe[_0x485cb1('0x77b')]/0x2+_0x4399d3;if(_0x584efe['_baseX']<_0x45c815)_0x45c815-=_0x584efe['width']/0x2+_0x4399d3;}if(_0x2c1ae9)this['setBattlerFacePoint'](_0x45c815,_0x5624fe,![]);_0x45c815-=_0x584efe[_0x485cb1('0x10a')],_0x5624fe-=_0x584efe[_0x485cb1('0x7f3')],_0x584efe[_0x485cb1('0x7e9')](_0x45c815,_0x5624fe,_0x1f6d5d);if(Imported[_0x485cb1('0x4f6')])_0x584efe['setMoveEasingType'](_0x2de939||'Linear');},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x5f8')]=function(_0x31c1db,_0x57dbb6,_0x45f97f){const _0x5eb93a=_0x5f4923;if(!$gameSystem[_0x5eb93a('0x773')]())return;const _0x454aaa=this[_0x5eb93a('0x17f')]();if(!_0x454aaa)return;_0x454aaa[_0x5eb93a('0x68e')](_0x31c1db,_0x57dbb6,_0x45f97f);},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x69')]=function(_0x22d454,_0x224696){const _0x181cab=_0x5f4923;if(!$gameSystem[_0x181cab('0x773')]())return;const _0x2b96f4=this[_0x181cab('0x17f')]();if(!_0x2b96f4)return;_0x2b96f4[_0x181cab('0x2e7')](_0x22d454,_0x224696);},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x706')]=function(_0x3815ec,_0x24479c,_0xe9fc2,_0x1b7e05){const _0x1fcc04=_0x5f4923;if(!$gameSystem[_0x1fcc04('0x773')]())return;const _0x75ef16=this[_0x1fcc04('0x17f')]();if(!_0x75ef16)return;_0x75ef16[_0x1fcc04('0x7')](_0x3815ec,_0x24479c,_0xe9fc2,_0x1b7e05);},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x66f')]=function(_0xc9e076,_0x4e14dc,_0x90f1bb,_0x4c4afc){const _0x2e7454=_0x5f4923;if(!$gameSystem[_0x2e7454('0x773')]())return;const _0xa94fbe=this[_0x2e7454('0x17f')]();if(!_0xa94fbe)return;this[_0x2e7454('0x1c3')]()&&(_0xc9e076*=-0x1,_0x4e14dc*=-0x1),_0xa94fbe[_0x2e7454('0x56b')](_0xc9e076,_0x4e14dc,_0x90f1bb,_0x4c4afc);},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x6bf')]=function(_0x418725,_0x4a8f41,_0x34f4b9,_0x26c4cc){const _0x526d2d=_0x5f4923;if(!$gameSystem[_0x526d2d('0x773')]())return;const _0x6a1e73=this['battler']();if(!_0x6a1e73)return;_0x6a1e73[_0x526d2d('0x5a2')](_0x418725,_0x4a8f41,_0x34f4b9,_0x26c4cc);},Game_Battler[_0x5f4923('0x14f')]['changeBattlerOpacity']=function(_0x2a6a93,_0x296f2d,_0xe6a27e){const _0x26154a=_0x5f4923;if(!$gameSystem['isSideView']())return;const _0x1c01d3=this['battler']();if(!_0x1c01d3)return;_0x1c01d3[_0x26154a('0x2b2')](_0x2a6a93,_0x296f2d,_0xe6a27e);},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x5a9')]=function(){const _0x1c1a95=_0x5f4923,_0x17f4c3=!!this['_freezeMotionData'];this[_0x1c1a95('0x442')]=undefined;if(_0x17f4c3){if(_0x1c1a95('0xa8')===_0x1c1a95('0xa8'))this[_0x1c1a95('0x3d3')](),this['clearFreezeMotionForWeapons']();else{function _0x2d8419(){const _0x3bd21b=_0x1c1a95;_0x2297b8['BattleCore']['JS'][_0x9d4b15][_0x3bd21b('0x618')](this,this[_0x3bd21b('0x394')](),this[_0x3bd21b('0x394')](),this[_0x3bd21b('0x555')](),_0x1cd345);}}}},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2dc')]=function(){const _0x5d344a=_0x5f4923;if(!SceneManager['isSceneBattle']())return;const _0x15ed57=this[_0x5d344a('0x17f')]();if(!_0x15ed57)return;let _0x2179bc=this[_0x5d344a('0x1c3')]()?_0x15ed57[_0x5d344a('0x2da')]:_0x15ed57[_0x5d344a('0xe7')][_0x5d344a('0x2da')];if(_0x2179bc){if('BaCCY'!==_0x5d344a('0x511')){function _0xeb05e(){const _0xa88ac1=_0x5d344a;if(this[_0xa88ac1('0x803')]()==='border')return this['skillItemWindowRectBorderStyle']();else return this['isSkillItemWindowsMiddle']()?this[_0xa88ac1('0x17d')]():_0x221112[_0xa88ac1('0x88d')][_0xa88ac1('0x763')][_0xa88ac1('0x618')](this);}}else _0x2179bc[_0x5d344a('0x672')](0x0);}},Game_Battler[_0x5f4923('0x14f')]['freezeMotion']=function(_0x16741e,_0xabd6dc,_0x110f32){const _0x42d90b=_0x5f4923;if(this['isEnemy']()&&!this[_0x42d90b('0x64d')]())return;let _0x144093=0x0;if(this[_0x42d90b('0x1c3')]()){if(_0x42d90b('0x58a')===_0x42d90b('0x58a')){const _0x5d5425=this['weapons']();_0x144093=_0x5d5425[0x0]?_0x5d5425[0x0]['wtypeId']:0x0;}else{function _0x3e86b8(){const _0x10d3ba=_0x42d90b;this['processBattleCoreJS']('PreStartTurnJS'),_0xa9b6f1[_0x10d3ba('0x88d')][_0x10d3ba('0x1df')]['call'](this),this[_0x10d3ba('0xb0')](_0x10d3ba('0x633'));}}}else this[_0x42d90b('0x323')]()&&(_0x144093=this[_0x42d90b('0x6ac')]()['wtypeId']||0x0);const _0x429bbc=$dataSystem[_0x42d90b('0x462')][_0x144093];if(_0x16741e===_0x42d90b('0x597')){if(_0x42d90b('0x478')===_0x42d90b('0xd0')){function _0x2ad274(){const _0x1e3585=_0x42d90b;this[_0x1e3585('0x1ea')]()&&_0x22f057[_0x1e3585('0x88d')][_0x1e3585('0x526')][_0x1e3585('0x618')](this,_0x28691c,_0x3e450e,_0x26b17d);}}else _0x16741e=[_0x42d90b('0x6c3'),_0x42d90b('0x10e'),_0x42d90b('0x274')][_0x429bbc[_0x42d90b('0xa1')]]||_0x42d90b('0x10e');}this[_0x42d90b('0x442')]={'motionType':_0x16741e,'weaponImageId':_0xabd6dc?_0x429bbc['weaponImageId']:0x0,'pattern':_0x110f32};},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0x214')]=function(_0x5a5315){const _0x18f6b0=_0x5f4923;if(!_0x5a5315)return![];return _0x5a5315[_0x18f6b0('0x64f')]()===this['friendsUnit']();},Game_Battler[_0x5f4923('0x14f')][_0x5f4923('0xc3')]=function(_0x3a568f){const _0x53ac7d=_0x5f4923;if(!_0x3a568f)return![];return _0x3a568f[_0x53ac7d('0x71b')]()===this[_0x53ac7d('0x64f')]();},VisuMZ[_0x5f4923('0x88d')]['Game_Actor_setup']=Game_Actor['prototype'][_0x5f4923('0x672')],Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x672')]=function(_0x2238f5){const _0x202246=_0x5f4923;VisuMZ['BattleCore']['Game_Actor_setup'][_0x202246('0x618')](this,_0x2238f5),this['initBattlePortrait']();},Game_Actor[_0x5f4923('0x14f')]['initBattlePortrait']=function(){const _0x29b689=_0x5f4923;this['_battlePortrait']='';if(this[_0x29b689('0x857')]()&&this[_0x29b689('0x857')]()[_0x29b689('0x331')][_0x29b689('0x5ae')](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)){if('SHqgL'===_0x29b689('0x533'))this[_0x29b689('0x433')]=String(RegExp['$1']);else{function _0x3d5a32(){const _0x5ba72d=_0x29b689;return this[_0x5ba72d('0x7e')][_0x5ba72d('0x23d')]();}}}},Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x848')]=function(){const _0x45c5fa=_0x5f4923;if(this['getBattlePortrait']()!==''){if('ZNBSw'==='ZNBSw')return this[_0x45c5fa('0x1bc')]();else{function _0x1719d7(){const _0x8120e0=_0x45c5fa;if(_0x5ae70a>_0x584264['_baseX'])_0x521cc8=![];if(_0x2406fb<_0xe0a276[_0x8120e0('0x280')])_0x50cb1c=!![];}}}else{if(Imported[_0x45c5fa('0x5c3')]&&this[_0x45c5fa('0x440')]()!==''){if('IbtST'===_0x45c5fa('0x1ae')){function _0x385519(){const _0x4f22fc=_0x45c5fa,_0x879bd6=_0x2bca6a[_0x4f22fc('0x1f1')]('['+_0x152f7e['$1']['match'](/\d+/g)+']');for(const _0x2bd5cb of _0x879bd6){if(_0x55319c[_0x4f22fc('0x4b2')](_0x2bd5cb))return![];}return!![];}}else return this[_0x45c5fa('0x440')]();}}return'';},Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x1bc')]=function(){const _0xaedd95=_0x5f4923;if(this[_0xaedd95('0x433')]===undefined)this[_0xaedd95('0x7e0')]();return this[_0xaedd95('0x433')];},Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x228')]=function(_0x289149){const _0x18e21f=_0x5f4923;if(this[_0x18e21f('0x433')]===undefined)this['initBattlePortrait']();this['_battlePortrait']=_0x289149;if(SceneManager[_0x18e21f('0x64e')]()&&$gameParty['battleMembers']()[_0x18e21f('0x147')](this)){if(_0x18e21f('0x589')!==_0x18e21f('0x83c')){const _0x39c197=SceneManager[_0x18e21f('0x60a')]['_statusWindow'];if(_0x39c197)_0x39c197[_0x18e21f('0x4b5')](this);}else{function _0x2a2756(){_0x1bbd0c+=_0x56b520(_0x38e4a0['$2']);}}}},Game_Actor['prototype'][_0x5f4923('0x298')]=function(){return!![];},Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x465')]=function(){const _0x441f4d=_0x5f4923;if(!this[_0x441f4d('0x1af')]()&&BattleManager[_0x441f4d('0x829')])return!![];return Game_Battler['prototype'][_0x441f4d('0x465')][_0x441f4d('0x618')](this);},VisuMZ['BattleCore'][_0x5f4923('0x2be')]=Game_Actor[_0x5f4923('0x14f')]['makeActionList'],Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x744')]=function(){const _0x15b04a=_0x5f4923;if(BattleManager[_0x15b04a('0x829')]&&!ConfigManager[_0x15b04a('0x5f4')]){if(_0x15b04a('0x195')!==_0x15b04a('0x85a'))return this[_0x15b04a('0x3b1')]();else{function _0x4aa493(){const _0x3ccb10=_0x15b04a;this['startMotion'](_0x3ccb10('0x12d'));}}}else{return VisuMZ[_0x15b04a('0x88d')][_0x15b04a('0x2be')]['call'](this);;}},Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x3b1')]=function(){const _0x5e78d1=_0x5f4923,_0x2ca10c=[],_0xda949b=new Game_Action(this);return _0xda949b[_0x5e78d1('0x27d')](),_0x2ca10c['push'](_0xda949b),_0x2ca10c;},Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x856')]=function(){const _0x20e8ec=_0x5f4923;if(this['currentClass']()[_0x20e8ec('0x331')][_0x20e8ec('0x5ae')](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)){if(_0x20e8ec('0x535')!==_0x20e8ec('0x413'))return String(RegExp['$1'])[_0x20e8ec('0x203')](/[\r\n]+/);else{function _0x488fb1(){const _0x382e04=_0x20e8ec,_0x3d9df1=this[_0x382e04('0x362')]['currentAction']();if(_0x3d9df1)_0x3d9df1['actionBattleCoreJS'](_0x382e04('0x2f9'));_0x486ec6['BattleCore'][_0x382e04('0x60d')]['call'](this);if(_0x3d9df1)_0x3d9df1[_0x382e04('0x6b2')](_0x382e04('0x4de'));}}}else{if('DjPNl'===_0x20e8ec('0x605')){function _0x281f43(){const _0x3cd9e9=_0x20e8ec,_0x46a93f=_0x4b474c[_0x3cd9e9('0x421')](_0x2d44de[_0x3cd9e9('0x667')]()[_0x3cd9e9('0x32d')]());_0x46a93f>=0x0&&_0x46a93f<=0x7&&_0xeb459e[_0x3cd9e9('0x3')](_0x46a93f)&&_0x20c79d['removeBuff'](_0x46a93f);}}else return VisuMZ[_0x20e8ec('0x88d')][_0x20e8ec('0x39b')][_0x20e8ec('0xc4')][_0x20e8ec('0x262')];}},Game_Actor['prototype'][_0x5f4923('0x36a')]=function(){const _0x4151ee=_0x5f4923;if(this[_0x4151ee('0x83b')][_0x4151ee('0x359')]!==undefined)return this[_0x4151ee('0x83b')][_0x4151ee('0x359')];if(this[_0x4151ee('0x857')]()['note'][_0x4151ee('0x5ae')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i))this[_0x4151ee('0x83b')]['svAnchorX']=eval(RegExp['$1']),this[_0x4151ee('0x83b')][_0x4151ee('0x832')]=eval(RegExp['$2']);else{if(_0x4151ee('0x63')===_0x4151ee('0x796')){function _0x3bc998(){const _0x47961e=_0x4151ee;_0x1d0ccf[_0x47961e('0x14f')][_0x47961e('0x687')][_0x47961e('0x618')](this);if(this[_0x47961e('0x317')])this[_0x47961e('0x30')]();}}else this[_0x4151ee('0x83b')][_0x4151ee('0x359')]=Game_Battler[_0x4151ee('0x14f')][_0x4151ee('0x36a')][_0x4151ee('0x618')](this);}return this[_0x4151ee('0x83b')]['svAnchorX'];},Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x7d5')]=function(){const _0x13335d=_0x5f4923;if(this['_cache']['svAnchorY']!==undefined)return this[_0x13335d('0x83b')][_0x13335d('0x832')];if(this[_0x13335d('0x857')]()[_0x13335d('0x331')][_0x13335d('0x5ae')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)){if(_0x13335d('0x780')==='wgxVJ')this[_0x13335d('0x83b')][_0x13335d('0x359')]=eval(RegExp['$1']),this[_0x13335d('0x83b')][_0x13335d('0x832')]=eval(RegExp['$2']);else{function _0x456ef0(){const _0x3f5015=_0x13335d;this[_0x3f5015('0x23c')][_0x3f5015('0x3e8')](this[_0x3f5015('0x777')]);}}}else{if(_0x13335d('0x6a4')===_0x13335d('0x6a4'))this['_cache'][_0x13335d('0x832')]=Game_Battler[_0x13335d('0x14f')][_0x13335d('0x7d5')][_0x13335d('0x618')](this);else{function _0x32f8fa(){const _0x2eedad=_0x13335d;_0x5bd375=_0x372b9a[_0x2eedad('0x17f')]()[_0x2eedad('0x10a')],_0x17ecb4=_0x25fa55[_0x2eedad('0x17f')]()[_0x2eedad('0x7f3')];}}}return this['_cache'][_0x13335d('0x832')];},Game_Actor['prototype'][_0x5f4923('0x86f')]=function(){const _0x58c59d=_0x5f4923;if(this[_0x58c59d('0x83b')]['svShadow']!==undefined)return this['_cache'][_0x58c59d('0x6d3')];if(this['actor']()[_0x58c59d('0x331')]['match'](/<SIDEVIEW SHOW SHADOW>/i)){if('TgoTH'!==_0x58c59d('0x792')){function _0x4af958(){const _0x24bbe9=_0x58c59d;_0x587d83=_0x3f2662[_0x24bbe9('0x7bf')]((_0x20e358,_0x4ed660,_0x418622)=>_0x418622[_0x24bbe9('0x421')](_0x20e358)===_0x4ed660),_0x16e5c8[_0x24bbe9('0x64e')]()&&_0x5750cf[_0x24bbe9('0x44a')]()&&(_0x36d795=!_0x2e6d6e),_0x57e51c[_0x24bbe9('0x88d')][_0x24bbe9('0x798')]['call'](this,_0x379924,_0x5196d9,_0xa64594),_0x2f7a06[_0x24bbe9('0x64e')]()&&_0xf783f6['_spriteset']['processAnimationRequests']();}}else this[_0x58c59d('0x83b')][_0x58c59d('0x6d3')]=!![];}else this[_0x58c59d('0x857')]()['note'][_0x58c59d('0x5ae')](/<SIDEVIEW HIDE SHADOW>/i)?this[_0x58c59d('0x83b')][_0x58c59d('0x6d3')]=![]:this['_cache'][_0x58c59d('0x6d3')]=Game_Battler['prototype'][_0x58c59d('0x86f')]['call'](this);return this['_cache'][_0x58c59d('0x6d3')];},Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x518')]=function(){const _0x222c74=_0x5f4923;return VisuMZ['BattleCore'][_0x222c74('0x39b')]['Actor'][_0x222c74('0x612')];},Game_Actor['prototype'][_0x5f4923('0x63d')]=function(){const _0x138640=_0x5f4923,_0x5b7a75=this[_0x138640('0x695')](),_0x43f26c=_0x5b7a75[0x0]?_0x5b7a75[0x0][_0x138640('0x593')]:0x0,_0x4d94d1=$dataSystem[_0x138640('0x462')][_0x43f26c];_0x4d94d1&&this['startWeaponAnimation'](_0x4d94d1[_0x138640('0x472')]);},Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x5c4')]=function(_0x31fca1){const _0x47048d=_0x5f4923;Game_Battler[_0x47048d('0x14f')][_0x47048d('0x5c4')][_0x47048d('0x618')](this,_0x31fca1),this['performActionMotions'](_0x31fca1);},Game_Actor['prototype'][_0x5f4923('0x2d3')]=function(){const _0x433765=_0x5f4923,_0x427acb=this['weapons'](),_0x43708c=_0x427acb[0x0]?_0x427acb[0x0][_0x433765('0x593')]:0x0;return $dataSystem['attackMotions'][_0x43708c];},Game_Actor[_0x5f4923('0x14f')][_0x5f4923('0x74f')]=function(){const _0xec33fb=_0x5f4923;let _0x3061f1=_0xec33fb('0x74f');if(this[_0xec33fb('0x76e')](_0x3061f1))return this[_0xec33fb('0x83b')][_0x3061f1];return this[_0xec33fb('0x83b')][_0x3061f1]=this['createBattleUIOffsetX'](this[_0xec33fb('0x857')]()),this[_0xec33fb('0x83b')][_0x3061f1];},Game_Actor['prototype']['battleUIOffsetY']=function(){const _0x4ccb00=_0x5f4923;let _0x757671=_0x4ccb00('0x54b');if(this[_0x4ccb00('0x76e')](_0x757671))return this['_cache'][_0x757671];return this[_0x4ccb00('0x83b')][_0x757671]=this[_0x4ccb00('0x14')](this[_0x4ccb00('0x857')]()),this[_0x4ccb00('0x83b')][_0x757671];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x123')]=Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x672')],Game_Enemy['prototype'][_0x5f4923('0x672')]=function(_0x43dcdb,_0x27882e,_0x1d918e){const _0x4da547=_0x5f4923;_0x43dcdb=DataManager[_0x4da547('0x41e')](_0x43dcdb),VisuMZ[_0x4da547('0x88d')][_0x4da547('0x123')][_0x4da547('0x618')](this,_0x43dcdb,_0x27882e,_0x1d918e);if(Imported[_0x4da547('0x7ef')]){if(_0x4da547('0x846')!=='Gswfp'){function _0x36adf9(){const _0x4889f3=_0x4da547;_0x2e4a12[_0x4889f3('0x88d')][_0x4889f3('0xe6')][_0x4889f3('0x618')](this),this[_0x4889f3('0x65c')]();}}else this[_0x4da547('0x6f0')]();}this[_0x4da547('0x72d')](),this[_0x4da547('0x3e1')](),Imported['VisuMZ_1_ElementStatusCore']&&this[_0x4da547('0x6df')]();},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x72d')]=function(){const _0x2e89a9=_0x5f4923,_0x627721=VisuMZ['BattleCore']['Settings']['Enemy'];this[_0x2e89a9('0x310')]=_0x627721[_0x2e89a9('0x480')],this[_0x2e89a9('0x6a2')]={};},Game_Enemy['prototype']['setupBattleCoreData']=function(){const _0x3c364e=_0x5f4923,_0x2b97ea=VisuMZ[_0x3c364e('0x88d')]['Settings'][_0x3c364e('0x510')],_0x3ed352=this[_0x3c364e('0x42')]()['note'];this[_0x3c364e('0x6a2')]={'name':'','wtypeId':_0x2b97ea['WtypeId'],'collapse':_0x2b97ea['AllowCollapse'],'motionIdle':_0x2b97ea['MotionIdle'],'width':_0x2b97ea[_0x3c364e('0x33a')]||0x40,'height':_0x2b97ea[_0x3c364e('0x1f9')]||0x40,'anchorX':_0x2b97ea[_0x3c364e('0x1fa')]||0x0,'anchorY':_0x2b97ea[_0x3c364e('0x4d2')]||0x0,'shadow':_0x2b97ea['Shadow']};_0x3ed352[_0x3c364e('0x5ae')](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this[_0x3c364e('0x310')]=Number(RegExp['$1']));const _0x95d08b=this[_0x3c364e('0x6a2')];if(_0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW BATTLER: (.*)>/i))_0x95d08b[_0x3c364e('0x28b')]=String(RegExp['$1']);else{if(_0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x4aa91b=String(RegExp['$1'])[_0x3c364e('0x203')](/[\r\n]+/)[_0x3c364e('0x835')]('');_0x95d08b[_0x3c364e('0x28b')]=DataManager['processRandomizedData'](_0x4aa91b);}}_0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x95d08b[_0x3c364e('0x6b')]=eval(RegExp['$1']),_0x95d08b[_0x3c364e('0x5a1')]=eval(RegExp['$2']));if(_0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW COLLAPSE>/i))_0x95d08b['collapse']=!![];else{if(_0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW NO COLLAPSE>/i)){if(_0x3c364e('0x79c')==='Ypvnr')_0x95d08b[_0x3c364e('0x3bc')]=![];else{function _0x1e0144(){const _0x523590=_0x3c364e;this[_0x523590('0x86c')]=new _0x49338d(),this[_0x523590('0x648')][_0x523590('0x3e8')](this[_0x523590('0x86c')]);}}}}if(_0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW SHOW SHADOW>/i)){if(_0x3c364e('0x512')!==_0x3c364e('0x512')){function _0xad2dc2(){_0x54026c=(_0x12d3fa+_0xe4431f)/0x2,_0x33a86d=-0x1;}}else _0x95d08b[_0x3c364e('0x54e')]=!![];}else _0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x95d08b[_0x3c364e('0x54e')]=![]);if(_0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW IDLE MOTION: (.*)>/i)){if('NOKoh'===_0x3c364e('0xcb'))_0x95d08b['motionIdle']=String(RegExp['$1'])[_0x3c364e('0x3ec')]()['trim']();else{function _0x35df3a(){const _0x266992=_0x3c364e,_0x52fb4c=this[_0x266992('0x30e')][_0x266992('0x582')](),_0x3c3195=_0x52fb4c[0x0];return _0x3c3195[_0x266992('0x3a6')]=_0x3c3195[_0x266992('0x3a6')]||[],_0x3c3195[_0x266992('0x3a6')][0x0]=_0x52fb4c[0x1],_0x3c3195;}}}else{if(_0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){const _0x2ab2a8=String(RegExp['$1'])[_0x3c364e('0x203')](/[\r\n]+/)[_0x3c364e('0x835')]('');_0x95d08b[_0x3c364e('0x19d')]=DataManager[_0x3c364e('0x74b')](_0x2ab2a8);}}_0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x95d08b[_0x3c364e('0x77b')]=Number(RegExp['$1']),_0x95d08b[_0x3c364e('0x303')]=Number(RegExp['$2']));if(_0x3ed352['match'](/<SIDEVIEW WEAPON: (.*)>/i))_0x95d08b[_0x3c364e('0x593')]=DataManager[_0x3c364e('0x171')](RegExp['$1']);else{if(_0x3ed352[_0x3c364e('0x5ae')](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){const _0x7f4d32=String(RegExp['$1'])[_0x3c364e('0x203')](/[\r\n]+/)[_0x3c364e('0x835')](''),_0x1ede15=DataManager[_0x3c364e('0x74b')](_0x7f4d32);_0x95d08b['wtypeId']=DataManager[_0x3c364e('0x171')](_0x1ede15);}}if(Imported[_0x3c364e('0x7ef')]){const _0x57f8bd=this[_0x3c364e('0x80f')]();for(const _0x162160 of _0x57f8bd){const _0x1dca92=this[_0x3c364e('0x428')](_0x162160)['Name'][_0x3c364e('0x667')]()[_0x3c364e('0x32d')](),_0x362852=_0x162160[_0x3c364e('0x667')]()[_0x3c364e('0x32d')]();if(_0x3ed352[_0x3c364e('0x5ae')](VisuMZ[_0x3c364e('0x759')][_0x3c364e('0x3d4')][_0x3c364e('0x4e7')[_0x3c364e('0x6e6')](_0x362852,_0x1dca92)]))_0x95d08b[_0x3c364e('0x28b')]=String(RegExp['$1']);else{if(_0x3ed352[_0x3c364e('0x5ae')](VisuMZ[_0x3c364e('0x759')][_0x3c364e('0x3d4')][_0x3c364e('0x5fc')[_0x3c364e('0x6e6')](_0x362852,_0x1dca92)])){const _0x45e75e=String(RegExp['$1'])[_0x3c364e('0x203')](/[\r\n]+/)[_0x3c364e('0x835')]('');_0x95d08b['name']=DataManager[_0x3c364e('0x74b')](_0x45e75e);}}if(_0x3ed352[_0x3c364e('0x5ae')](VisuMZ[_0x3c364e('0x759')][_0x3c364e('0x3d4')][_0x3c364e('0x120')[_0x3c364e('0x6e6')](_0x362852,_0x1dca92)]))_0x95d08b[_0x3c364e('0x593')]=DataManager[_0x3c364e('0x171')](RegExp['$1']);else{if(_0x3ed352['match'](VisuMZ['ElementStatusCore'][_0x3c364e('0x3d4')][_0x3c364e('0x191')[_0x3c364e('0x6e6')](_0x362852,_0x1dca92)])){const _0x40c4d8=String(RegExp['$1'])[_0x3c364e('0x203')](/[\r\n]+/)['remove'](''),_0x3649c2=DataManager[_0x3c364e('0x74b')](_0x40c4d8);_0x95d08b[_0x3c364e('0x593')]=DataManager[_0x3c364e('0x171')](_0x3649c2);}}if(_0x3ed352[_0x3c364e('0x5ae')](VisuMZ[_0x3c364e('0x759')]['RegExp'][_0x3c364e('0x867')[_0x3c364e('0x6e6')](_0x362852,_0x1dca92)]))_0x95d08b['motionIdle']=String(RegExp['$1'])['toLowerCase']()['trim']();else{if(_0x3ed352[_0x3c364e('0x5ae')](VisuMZ[_0x3c364e('0x759')][_0x3c364e('0x3d4')][_0x3c364e('0x209')[_0x3c364e('0x6e6')](_0x362852,_0x1dca92)])){if(_0x3c364e('0x341')===_0x3c364e('0x3e6')){function _0x31c958(){const _0x1d1638=_0x3c364e;this[_0x1d1638('0x6bd')](_0xe26b79,_0x3eb765,_0x58b5ca);}}else{const _0x2fe78d=String(RegExp['$1'])['split'](/[\r\n]+/)['remove']('');_0x95d08b[_0x3c364e('0x19d')]=DataManager[_0x3c364e('0x74b')](_0x2fe78d);}}}}}},Game_Enemy[_0x5f4923('0x14f')]['attackAnimationId1']=function(){const _0x32ae13=_0x5f4923;return this[_0x32ae13('0x310')]||0x0;},Game_Enemy[_0x5f4923('0x14f')]['attackAnimationId2']=function(){return 0x0;},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x71')]=function(){const _0x4e4194=_0x5f4923;if(this[_0x4e4194('0x42')]()[_0x4e4194('0x331')]['match'](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler['prototype'][_0x4e4194('0x71')]['call'](this);},Game_Enemy[_0x5f4923('0x14f')]['skills']=function(){const _0x20b7f1=_0x5f4923,_0x216568=[];for(const _0x1c35c9 of this['enemy']()[_0x20b7f1('0x5cf')]){const _0x384327=$dataSkills[_0x1c35c9[_0x20b7f1('0x565')]];if(_0x384327&&!_0x216568[_0x20b7f1('0x147')](_0x384327))_0x216568[_0x20b7f1('0x2fc')](_0x384327);}return _0x216568;},Game_Enemy['prototype'][_0x5f4923('0x74f')]=function(){const _0x47c277=_0x5f4923;let _0x141107=_0x47c277('0x74f');if(this[_0x47c277('0x76e')](_0x141107))return this['_cache'][_0x141107];return this['_cache'][_0x141107]=this[_0x47c277('0x73d')](this[_0x47c277('0x42')]()),this[_0x47c277('0x83b')][_0x141107];},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x54b')]=function(){const _0x42b952=_0x5f4923;let _0x3e8d05='battleUIOffsetY';if(this[_0x42b952('0x76e')](_0x3e8d05))return this[_0x42b952('0x83b')][_0x3e8d05];return this[_0x42b952('0x83b')][_0x3e8d05]=this[_0x42b952('0x14')](this[_0x42b952('0x42')]()),this[_0x42b952('0x83b')][_0x3e8d05];},Game_Enemy[_0x5f4923('0x14f')]['svBattlerData']=function(){const _0x179bec=_0x5f4923;if(this['_svBattlerData']!==undefined)return this[_0x179bec('0x6a2')];return this[_0x179bec('0x3e1')](),this[_0x179bec('0x6a2')];},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x64d')]=function(){const _0x119363=_0x5f4923;return this[_0x119363('0x6ac')]()['name']!=='';},Game_Enemy[_0x5f4923('0x14f')]['svBattlerName']=function(){const _0x3dd0b6=_0x5f4923;return this['svBattlerData']()[_0x3dd0b6('0x28b')];},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x518')]=function(){const _0x26f772=_0x5f4923;if(this[_0x26f772('0x64d')]()){if('fcbyo'!==_0x26f772('0xd8'))return VisuMZ[_0x26f772('0x88d')]['Settings'][_0x26f772('0x5dc')][_0x26f772('0x612')];else{function _0x1d21a7(){const _0x3c3637=_0x26f772;this[_0x3c3637('0x45d')]();}}}else{if(_0x26f772('0x5d8')!=='bQbLM')return VisuMZ[_0x26f772('0x88d')][_0x26f772('0x39b')][_0x26f772('0x510')][_0x26f772('0x612')];else{function _0x383e92(){const _0x131580=_0x26f772;if(_0x2d70d7[_0x131580('0x3dc')](_0x19c12d))return!![];return![];}}}},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x5c4')]=function(_0x237fd7){const _0x34fc60=_0x5f4923;Game_Battler[_0x34fc60('0x14f')]['performAction']['call'](this,_0x237fd7);if(this[_0x34fc60('0x64d')]())this[_0x34fc60('0x3aa')](_0x237fd7);},Game_Enemy['prototype'][_0x5f4923('0x2d')]=function(){const _0x3d2b54=_0x5f4923,_0x1c4d9e=this['svBattlerData']()[_0x3d2b54('0x593')]||0x0,_0x5c70fa=$dataSystem['attackMotions'][_0x1c4d9e];if(_0x5c70fa){if(_0x5c70fa['type']===0x0)this[_0x3d2b54('0x18')](_0x3d2b54('0x6c3'));else{if(_0x5c70fa[_0x3d2b54('0xa1')]===0x1){if(_0x3d2b54('0x7b1')!==_0x3d2b54('0x165'))this[_0x3d2b54('0x18')](_0x3d2b54('0x10e'));else{function _0x2b9a60(){const _0x5643f3=_0x3d2b54;this[_0x5643f3('0x1b')]=new _0x3b0fbc(),this['_damageContainer']['x']=this[_0x5643f3('0x648')]['x'],this[_0x5643f3('0x1b')]['y']=this[_0x5643f3('0x648')]['y'],this[_0x5643f3('0x3e8')](this[_0x5643f3('0x1b')]);}}}else{if(_0x5c70fa[_0x3d2b54('0xa1')]===0x2){if('pNyhK'!==_0x3d2b54('0x276'))this[_0x3d2b54('0x18')](_0x3d2b54('0x274'));else{function _0x28a0e7(){const _0x36f81c=_0x3d2b54;if(_0x24f5d8[_0x36f81c('0x88d')][_0x36f81c('0x39b')][_0x36f81c('0xb1')][_0x36f81c('0x5aa')])return _0x351282[_0x36f81c('0x88d')]['Settings'][_0x36f81c('0xb1')][_0x36f81c('0x5aa')][_0x36f81c('0x618')](this);return _0x2332af[_0x36f81c('0x88d')]['Scene_Battle_logWindowRect'][_0x36f81c('0x618')](this);}}}}}}},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x63d')]=function(){const _0x8738da=_0x5f4923,_0x37ddb2=this['svBattlerData']()[_0x8738da('0x593')]||0x0,_0x3c3375=$dataSystem[_0x8738da('0x462')][_0x37ddb2];_0x3c3375&&this['startWeaponAnimation'](_0x3c3375['weaponImageId']);},Game_Enemy['prototype'][_0x5f4923('0x2d3')]=function(){const _0xfd47f3=_0x5f4923,_0x736bc1=this[_0xfd47f3('0x6ac')]()[_0xfd47f3('0x593')]||0x0;return $dataSystem[_0xfd47f3('0x462')][_0x736bc1];},Game_Enemy['prototype'][_0x5f4923('0x2c8')]=function(){const _0x1d5588=_0x5f4923;Game_Battler[_0x1d5588('0x14f')][_0x1d5588('0x2c8')]['call'](this),this['isSpriteVisible']()&&this[_0x1d5588('0x64d')]()&&this['requestMotion'](_0x1d5588('0x11b')),SoundManager[_0x1d5588('0x2ad')]();},Game_Enemy['prototype']['performEvasion']=function(){const _0x15f321=_0x5f4923;Game_Battler['prototype']['performEvasion'][_0x15f321('0x618')](this),this[_0x15f321('0x18')](_0x15f321('0x21a'));},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x3dd')]=function(){const _0x40b43a=_0x5f4923;Game_Battler[_0x40b43a('0x14f')][_0x40b43a('0x3dd')][_0x40b43a('0x618')](this),this[_0x40b43a('0x18')](_0x40b43a('0x21a'));},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x5')]=function(){const _0x35eb9f=_0x5f4923;Game_Battler['prototype'][_0x35eb9f('0x5')][_0x35eb9f('0x618')](this),this[_0x35eb9f('0x2d')]();},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x23d')]=function(){const _0x53d466=_0x5f4923;if(this['hasSvBattler']()){if(this[_0x53d466('0x6f1')]()>=0x1)return!![];return this[_0x53d466('0x6ac')]()[_0x53d466('0x3bc')];}else{if('JGcyE'!=='JGcyE'){function _0x40c2e0(){const _0x694e51=_0x53d466;return _0x50720a[_0x694e51('0x7bf')](_0x3a5b49=>_0x3a5b49[_0x694e51('0x642')]()&&_0x3a5b49!==_0x2d5777);}}else return!![];}},Game_Enemy[_0x5f4923('0x14f')]['svBattlerAnchorX']=function(){const _0x28708d=_0x5f4923;return this[_0x28708d('0x6ac')]()[_0x28708d('0x6b')];},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x7d5')]=function(){const _0x4a4408=_0x5f4923;return this[_0x4a4408('0x6ac')]()['anchorY'];},Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x86f')]=function(){const _0x101009=_0x5f4923;return this[_0x101009('0x6ac')]()[_0x101009('0x54e')];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x1bd')]=Game_Enemy['prototype'][_0x5f4923('0x138')],Game_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x138')]=function(_0xd756c4){const _0x212c94=_0x5f4923;VisuMZ[_0x212c94('0x88d')][_0x212c94('0x1bd')][_0x212c94('0x618')](this,_0xd756c4),this[_0x212c94('0x72d')](),this['setupBattleCoreData']();const _0x4e6ecc=this[_0x212c94('0x17f')]();if(_0x4e6ecc)_0x4e6ecc[_0x212c94('0x5bb')](this);},Game_Unit[_0x5f4923('0x14f')]['processBattleCoreJS']=function(_0x3c0f72){const _0x31f8df=_0x5f4923;for(const _0x1d9bab of this[_0x31f8df('0x3ce')]()){if(_0x1d9bab)_0x1d9bab[_0x31f8df('0xb0')](_0x3c0f72);}},Game_Unit[_0x5f4923('0x14f')][_0x5f4923('0x8d')]=function(){const _0x319c56=_0x5f4923,_0x492ad7=this[_0x319c56('0x361')]();return _0x492ad7[Math[_0x319c56('0x614')](_0x492ad7[_0x319c56('0x568')])];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x64c')]=Game_Party['prototype'][_0x5f4923('0x64b')],Game_Party[_0x5f4923('0x14f')]['addActor']=function(_0x145eea){const _0x335018=_0x5f4923;VisuMZ[_0x335018('0x88d')][_0x335018('0x64c')][_0x335018('0x618')](this,_0x145eea),BattleManager[_0x335018('0x65')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x4c4')]=Game_Party[_0x5f4923('0x14f')][_0x5f4923('0x46c')],Game_Party['prototype']['removeActor']=function(_0x58022a){const _0x129b09=_0x5f4923;VisuMZ[_0x129b09('0x88d')]['Game_Party_removeActor']['call'](this,_0x58022a),BattleManager['refreshStatusWindow']();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x6d8')]=Game_Troop[_0x5f4923('0x14f')][_0x5f4923('0x672')],Game_Troop['prototype'][_0x5f4923('0x672')]=function(_0x3ff4b8){const _0xdd8792=_0x5f4923;$gameTemp['clearForcedGameTroopSettingsBattleCore'](),$gameTemp[_0xdd8792('0x295')](_0x3ff4b8),VisuMZ[_0xdd8792('0x88d')][_0xdd8792('0x6d8')]['call'](this,_0x3ff4b8);},VisuMZ['BattleCore']['Game_Map_setupBattleback']=Game_Map[_0x5f4923('0x14f')][_0x5f4923('0x868')],Game_Map['prototype']['setupBattleback']=function(){const _0x3cc85d=_0x5f4923;VisuMZ[_0x3cc85d('0x88d')][_0x3cc85d('0x57f')]['call'](this),this[_0x3cc85d('0x373')]();},Game_Map[_0x5f4923('0x14f')][_0x5f4923('0x373')]=function(){const _0x50f9c8=_0x5f4923;this[_0x50f9c8('0x645')]={},this[_0x50f9c8('0x7f7')]={};if(!$dataMap)return;const _0x5e4751=$dataMap[_0x50f9c8('0x331')];if(!_0x5e4751)return;const _0x802753=_0x5e4751[_0x50f9c8('0x5ae')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x802753)for(const _0x132e5f of _0x802753){_0x132e5f[_0x50f9c8('0x5ae')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x2f05e3=Number(RegExp['$1']),_0x34c283=Number(RegExp['$2']),_0x302701=_0x34c283===0x1?this['_regionBattleback1']:this[_0x50f9c8('0x7f7')],_0x134d62=String(RegExp['$3']);_0x302701[_0x2f05e3]=_0x134d62;}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x4c9')]=Game_Map['prototype']['battleback1Name'],Game_Map[_0x5f4923('0x14f')][_0x5f4923('0x54a')]=function(){const _0x2566be=_0x5f4923;if(!BattleManager[_0x2566be('0x35d')]()){const _0x565d93=$gamePlayer[_0x2566be('0x6d7')]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x2566be('0x645')]&&this[_0x2566be('0x645')][_0x565d93])return this['_regionBattleback1'][_0x565d93];}return VisuMZ['BattleCore'][_0x2566be('0x4c9')]['call'](this);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x7c2')]=Game_Map[_0x5f4923('0x14f')][_0x5f4923('0x3cb')],Game_Map['prototype'][_0x5f4923('0x3cb')]=function(){const _0x40a483=_0x5f4923;if(!BattleManager['isBattleTest']()){const _0xf87f01=$gamePlayer['regionId']($gamePlayer['x'],$gamePlayer['y']);if(this[_0x40a483('0x645')]&&this[_0x40a483('0x7f7')][_0xf87f01])return this[_0x40a483('0x7f7')][_0xf87f01];}return VisuMZ['BattleCore'][_0x40a483('0x7c2')]['call'](this);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x40c')]=Game_Interpreter[_0x5f4923('0x14f')][_0x5f4923('0x3a7')],Game_Interpreter[_0x5f4923('0x14f')]['command357']=function(_0x20c634){const _0xcfef3=_0x5f4923;return $gameTemp[_0xcfef3('0x5ad')](this),VisuMZ['BattleCore'][_0xcfef3('0x40c')][_0xcfef3('0x618')](this,_0x20c634);},VisuMZ['BattleCore'][_0x5f4923('0x53f')]=Game_Interpreter[_0x5f4923('0x14f')][_0x5f4923('0x4ed')],Game_Interpreter[_0x5f4923('0x14f')][_0x5f4923('0x4ed')]=function(){const _0x41864c=_0x5f4923;if(SceneManager['isSceneBattle']())switch(this[_0x41864c('0x809')]){case _0x41864c('0x135'):if(Imported['VisuMZ_3_ActSeqCamera']){if(_0x41864c('0x837')==='esAYH'){if($gameScreen[_0x41864c('0x4ff')]()['angleDuration']>0x0)return!![];this[_0x41864c('0x809')]='';}else{function _0x367102(){const _0x49e9d7=_0x41864c;this[_0x49e9d7('0x83b')]['svShadow']=![];}}}break;case _0x41864c('0x47b'):if(BattleManager[_0x41864c('0xc5')][_0x41864c('0x15a')]())return!![];this['_waitMode']='';break;case _0x41864c('0x344'):if(Imported[_0x41864c('0x620')]){if(_0x41864c('0x408')===_0x41864c('0x408')){if($gameScreen[_0x41864c('0x4ff')]()[_0x41864c('0x8f')]>0x0)return!![];if($gameScreen['battleCameraData']()[_0x41864c('0x5b3')]>0x0)return!![];this[_0x41864c('0x809')]='';}else{function _0x4806c0(){const _0x8a2dc3=_0x41864c;this['isPartyCommandWindowDisabled']()?delete _0x474f1f['_handlers'][_0x8a2dc3('0x634')]:_0x11e022[_0x8a2dc3('0x629')]('cancel',this[_0x8a2dc3('0x7df')][_0x8a2dc3('0x48f')](this));}}}break;case _0x41864c('0xc6'):if(BattleManager[_0x41864c('0xc5')][_0x41864c('0xf4')]())return!![];this[_0x41864c('0x809')]='';break;case _0x41864c('0x375'):if(BattleManager[_0x41864c('0xc5')][_0x41864c('0x1d')]())return!![];this[_0x41864c('0x809')]='';break;case _0x41864c('0x877'):if(BattleManager[_0x41864c('0xc5')]['isAnyoneJumping']())return!![];this[_0x41864c('0x809')]='';break;case _0x41864c('0x10f'):if(BattleManager[_0x41864c('0x70a')][_0x41864c('0x24f')]())return!![];this['_waitMode']='';break;case _0x41864c('0x211'):if(BattleManager[_0x41864c('0xc5')]['isAnyoneMoving']())return!![];this[_0x41864c('0x809')]='';break;case _0x41864c('0x649'):if(BattleManager[_0x41864c('0xc5')][_0x41864c('0x6b6')]())return!![];this['_waitMode']='';break;case'battleGrow':if(BattleManager[_0x41864c('0xc5')][_0x41864c('0x13e')]())return!![];this[_0x41864c('0x809')]='';break;case'battleSpriteSkew':if(BattleManager['_spriteset'][_0x41864c('0x2b6')]())return!![];this[_0x41864c('0x809')]='';break;case'battleSkew':if(Imported[_0x41864c('0x620')]){if($gameScreen[_0x41864c('0x4ff')]()[_0x41864c('0x254')]>0x0)return!![];this[_0x41864c('0x809')]='';}break;case _0x41864c('0x800'):if(BattleManager[_0x41864c('0xc5')][_0x41864c('0x349')]())return!![];this['_waitMode']='';break;case _0x41864c('0x42c'):if(Imported[_0x41864c('0x620')]){if($gameScreen[_0x41864c('0x4ff')]()[_0x41864c('0x390')]>0x0)return!![];this[_0x41864c('0x809')]='';}break;}return VisuMZ[_0x41864c('0x88d')][_0x41864c('0x53f')][_0x41864c('0x618')](this);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x70f')]=Game_Interpreter[_0x5f4923('0x14f')][_0x5f4923('0x68f')],Game_Interpreter[_0x5f4923('0x14f')][_0x5f4923('0x68f')]=function(_0x66b7bf){const _0xbef0f8=_0x5f4923;return!$gameParty[_0xbef0f8('0x503')]()?this[_0xbef0f8('0x5cd')](_0x66b7bf):VisuMZ['BattleCore']['Game_Interpreter_command301']['call'](this,_0x66b7bf);},Game_Interpreter[_0x5f4923('0x14f')][_0x5f4923('0x85d')]=function(_0x29e25d){const _0x5dd9d7=_0x5f4923;return VisuMZ[_0x5dd9d7('0x88d')]['Game_Interpreter_command301'][_0x5dd9d7('0x618')](this,_0x29e25d);},Game_Interpreter[_0x5f4923('0x14f')][_0x5f4923('0x5cd')]=function(_0x14cb16){const _0xec1a33=_0x5f4923,_0x16cbf0=VisuMZ['BattleCore']['Settings']['Mechanics'],_0x3a2003=_0x16cbf0['BattleStartEvent'],_0x468f83=$dataCommonEvents[_0x3a2003];if(_0x468f83){const _0x4667d1=this[_0xec1a33('0x266')]()?this['_eventId']:0x0,_0x4c1c69=JsonEx[_0xec1a33('0x206')](_0x468f83[_0xec1a33('0x855')]),_0x3e65b9=_0x4c1c69[_0xec1a33('0x568')]-0x1,_0x187c43={'code':0xbc3,'indent':0x0,'parameters':JsonEx['makeDeepCopy'](_0x14cb16)};_0x4c1c69[_0xec1a33('0x3a8')](_0x3e65b9,0x0,_0x187c43),this[_0xec1a33('0x370')](_0x4c1c69,_0x4667d1);}else return VisuMZ[_0xec1a33('0x88d')]['Game_Interpreter_command301'][_0xec1a33('0x618')](this,_0x14cb16);return!![];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x7f6')]=BattleManager[_0x5f4923('0x11e')],BattleManager['onEncounter']=function(){const _0x5bbc9a=_0x5f4923;VisuMZ[_0x5bbc9a('0x88d')]['BattleManager_onEncounter']['call'](this),this[_0x5bbc9a('0x371')]();},BattleManager[_0x5f4923('0x371')]=function(){const _0x4c9951=_0x5f4923,_0x301305=VisuMZ[_0x4c9951('0x88d')][_0x4c9951('0x39b')]['Mechanics'];_0x301305[_0x4c9951('0x7e8')]&&(this[_0x4c9951('0x60e')]=!![],$gameTemp[_0x4c9951('0x264')](_0x301305[_0x4c9951('0x7e8')]),$gameMap['updateInterpreter'](),$gameMap[_0x4c9951('0x327')]['_preBattleCommonEvent']=!![]);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x4a8')]=Scene_Map[_0x5f4923('0x14f')]['launchBattle'],Scene_Map[_0x5f4923('0x14f')][_0x5f4923('0x3bb')]=function(){const _0x13dbd2=_0x5f4923;if(BattleManager[_0x13dbd2('0x60e')])this[_0x13dbd2('0x13f')]();else{if(_0x13dbd2('0x115')!==_0x13dbd2('0x115')){function _0x32e8bb(){const _0x3ae004=_0x13dbd2;return _0x5498df[_0x3ae004('0x377')]('cancel');}}else VisuMZ[_0x13dbd2('0x88d')]['Scene_Map_launchBattle'][_0x13dbd2('0x618')](this);}},Scene_Map[_0x5f4923('0x14f')][_0x5f4923('0x13f')]=function(){const _0x2f23e6=_0x5f4923;this[_0x2f23e6('0x59')]=!![];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x78a')]=SceneManager[_0x5f4923('0x5ff')],SceneManager[_0x5f4923('0x5ff')]=function(){const _0x580be1=_0x5f4923;if(BattleManager['_battleCoreBattleStartEvent'])return![];return VisuMZ[_0x580be1('0x88d')]['SceneManager_isSceneChanging'][_0x580be1('0x618')](this);},VisuMZ['BattleCore'][_0x5f4923('0x7a3')]=Game_Interpreter[_0x5f4923('0x14f')]['terminate'],Game_Interpreter[_0x5f4923('0x14f')][_0x5f4923('0x13a')]=function(){const _0x14730b=_0x5f4923;VisuMZ[_0x14730b('0x88d')][_0x14730b('0x7a3')][_0x14730b('0x618')](this),this[_0x14730b('0x545')]&&(this[_0x14730b('0x545')]=undefined,SceneManager[_0x14730b('0x60a')][_0x14730b('0x16e')]());},Scene_Map[_0x5f4923('0x14f')][_0x5f4923('0x16e')]=function(){const _0x10f747=_0x5f4923;BattleManager[_0x10f747('0x60e')]=undefined,this[_0x10f747('0x7bb')]();},VisuMZ[_0x5f4923('0x88d')]['Scene_Map_initialize']=Scene_Map[_0x5f4923('0x14f')]['initialize'],Scene_Map[_0x5f4923('0x14f')]['initialize']=function(){const _0x36c942=_0x5f4923;VisuMZ[_0x36c942('0x88d')][_0x36c942('0x5b5')][_0x36c942('0x618')](this),$gameTemp[_0x36c942('0x71d')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x88b')]=Scene_ItemBase['prototype'][_0x5f4923('0x82e')],Scene_ItemBase[_0x5f4923('0x14f')][_0x5f4923('0x82e')]=function(){const _0x5209eb=_0x5f4923;VisuMZ['BattleCore']['Scene_ItemBase_applyItem'][_0x5209eb('0x618')](this);if(this[_0x5209eb('0x555')]()[_0x5209eb('0x331')][_0x5209eb('0x5ae')](/<CUSTOM ACTION SEQUENCE>/i)){if('vJEJJ'===_0x5209eb('0x90')){function _0x57acfa(){const _0x1e5b8a=_0x5209eb;_0x3e3a9e=_0x1c0658[_0x1e5b8a('0x81e')](_0x42491d['ConvertActionSequenceTarget'](_0x4ff46c));}}else $gameTemp[_0x5209eb('0x608')]=[];}},VisuMZ[_0x5f4923('0x88d')]['Scene_Options_maxCommands']=Scene_Options[_0x5f4923('0x14f')][_0x5f4923('0x4eb')],Scene_Options['prototype'][_0x5f4923('0x4eb')]=function(){const _0x33d94a=_0x5f4923;let _0x1752d7=VisuMZ[_0x33d94a('0x88d')][_0x33d94a('0x102')][_0x33d94a('0x618')](this);const _0x149ee3=VisuMZ[_0x33d94a('0x88d')][_0x33d94a('0x39b')];if(_0x149ee3[_0x33d94a('0x553')][_0x33d94a('0x77')]&&_0x149ee3['AutoBattle'][_0x33d94a('0x599')])_0x1752d7+=0x2;if(_0x149ee3[_0x33d94a('0x409')][_0x33d94a('0x77')]&&_0x149ee3['HpGauge'][_0x33d94a('0x599')])_0x1752d7+=0x1;return _0x1752d7;},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x531')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x255')],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x255')]=function(){const _0x4af7c1=_0x5f4923;if(SceneManager[_0x4af7c1('0x5e7')]()){if('ilQtV'!=='pGbXy'){Scene_Message[_0x4af7c1('0x14f')][_0x4af7c1('0x255')][_0x4af7c1('0x618')](this);if(this[_0x4af7c1('0xc5')]){if(_0x4af7c1('0x529')===_0x4af7c1('0x529'))this[_0x4af7c1('0xc5')][_0x4af7c1('0x7aa')]();else{function _0xc39436(){const _0x16f84c=_0x4af7c1;this[_0x16f84c('0x18')]('damage');}}}}else{function _0x526750(){const _0x21389a=_0x4af7c1;_0x28cb67[_0x21389a('0x14f')][_0x21389a('0x566')][_0x21389a('0x618')](this,_0x190e04),this[_0x21389a('0x675')](this[_0x21389a('0x3a1')]()),this['refresh']();}}}else VisuMZ['BattleCore'][_0x4af7c1('0x531')][_0x4af7c1('0x618')](this);},VisuMZ[_0x5f4923('0x88d')]['Scene_Battle_stop']=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x7bb')],Scene_Battle[_0x5f4923('0x14f')]['stop']=function(){const _0x34e4f0=_0x5f4923;if(SceneManager[_0x34e4f0('0x67a')]())Scene_Message[_0x34e4f0('0x14f')][_0x34e4f0('0x7bb')]['call'](this);else{if('kNPtm'!==_0x34e4f0('0x6c7'))VisuMZ[_0x34e4f0('0x88d')][_0x34e4f0('0x769')]['call'](this);else{function _0x20f52e(){const _0x1ac336=_0x34e4f0;_0x2b9362=_0x31ed4e[_0x1ac336('0xa2')](_0x5499a1);}}}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0xe8')]=Scene_Battle[_0x5f4923('0x14f')]['terminate'],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x13a')]=function(){const _0x394b27=_0x5f4923;SceneManager[_0x394b27('0x67a')]()?Scene_Message[_0x394b27('0x14f')][_0x394b27('0x13a')][_0x394b27('0x618')](this):VisuMZ[_0x394b27('0x88d')][_0x394b27('0xe8')][_0x394b27('0x618')](this);},Scene_Battle['prototype']['isRightInputMode']=function(){const _0x37c26f=_0x5f4923;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x37c26f('0x89')]!==undefined)return ConfigManager[_0x37c26f('0x89')];else{if(this[_0x37c26f('0x803')]()===_0x37c26f('0x204')){if(_0x37c26f('0x2a')!==_0x37c26f('0x2a')){function _0xfd86ae(){const _0x38a653=_0x37c26f;return this[_0x38a653('0x1f')]>0x0;}}else return![];}else{return Scene_Message[_0x37c26f('0x14f')]['isRightInputMode'][_0x37c26f('0x618')](this);;}}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x1c7')]=Scene_Battle[_0x5f4923('0x14f')]['createAllWindows'],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x1f4')]=function(){const _0xc5629d=_0x5f4923;this[_0xc5629d('0x1ff')](),VisuMZ[_0xc5629d('0x88d')][_0xc5629d('0x1c7')][_0xc5629d('0x618')](this),this[_0xc5629d('0x55f')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x879')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x6d5')],Scene_Battle['prototype']['createCancelButton']=function(){const _0x3d9981=_0x5f4923;VisuMZ[_0x3d9981('0x88d')]['Scene_Battle_createCancelButton'][_0x3d9981('0x618')](this),this[_0x3d9981('0x803')]()==='border'&&this[_0x3d9981('0x61c')]();},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x114')]=function(_0x3ae96d){const _0x1db5d1=_0x5f4923;_0x3ae96d?(this[_0x1db5d1('0x76a')]['x']=(Graphics[_0x1db5d1('0x77b')]-Graphics[_0x1db5d1('0x49b')])/0x2,this[_0x1db5d1('0x76a')]['y']=(Graphics['height']-Graphics[_0x1db5d1('0x5bf')])/0x2):(this[_0x1db5d1('0x76a')]['x']=Graphics['width']*0xa,this[_0x1db5d1('0x76a')]['y']=Graphics['height']*0xa);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x741')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x657')],Scene_Battle[_0x5f4923('0x14f')]['selectNextCommand']=function(){const _0x513375=_0x5f4923,_0x358ca2=BattleManager[_0x513375('0x857')]();VisuMZ['BattleCore']['Scene_Battle_selectNextCommand']['call'](this);if(_0x358ca2){if('rrica'!==_0x513375('0x27')){function _0x97ecb(){const _0x4b4d31=_0x513375;this[_0x4b4d31('0x5eb')]++;}}else{if(_0x358ca2===BattleManager[_0x513375('0x857')]())return;if(_0x358ca2===BattleManager[_0x513375('0x362')])return;_0x358ca2['battler']()['stepBack']();}}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x1a5')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x56c')],Scene_Battle['prototype'][_0x5f4923('0x56c')]=function(){const _0x5406af=_0x5f4923,_0x228102=BattleManager[_0x5406af('0x857')]();if(_0x228102)_0x228102[_0x5406af('0x17f')]()[_0x5406af('0x5ef')]();VisuMZ[_0x5406af('0x88d')][_0x5406af('0x1a5')][_0x5406af('0x618')](this);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x700')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x496')],Scene_Battle['prototype'][_0x5f4923('0x496')]=function(){const _0x57956d=_0x5f4923;if(VisuMZ[_0x57956d('0x88d')][_0x57956d('0x39b')]['BattleLog'][_0x57956d('0x5aa')])return VisuMZ[_0x57956d('0x88d')]['Settings']['BattleLog']['BattleLogRectJS'][_0x57956d('0x618')](this);return VisuMZ['BattleCore'][_0x57956d('0x700')]['call'](this);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0xe6')]=Scene_Battle['prototype'][_0x5f4923('0x5b6')],Scene_Battle['prototype'][_0x5f4923('0x5b6')]=function(){const _0x4db90b=_0x5f4923;VisuMZ[_0x4db90b('0x88d')][_0x4db90b('0xe6')][_0x4db90b('0x618')](this),this[_0x4db90b('0x65c')]();},Scene_Battle['prototype'][_0x5f4923('0x65c')]=function(){const _0x30a4c1=_0x5f4923,_0x11feac=this[_0x30a4c1('0x66b')];_0x11feac[_0x30a4c1('0x629')]('autoBattle',this[_0x30a4c1('0x2c4')]['bind'](this)),_0x11feac[_0x30a4c1('0x629')](_0x30a4c1('0x6b9'),this[_0x30a4c1('0x812')]['bind'](this));const _0x2c3558=this[_0x30a4c1('0x803')]();switch(_0x2c3558){case'xp':case _0x30a4c1('0x283'):return this[_0x30a4c1('0x66b')][_0x30a4c1('0x675')](0x1);break;}},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x2c4')]=function(){const _0x11b1c2=_0x5f4923;BattleManager['_autoBattle']=!![],$gameParty['makeActions'](),this[_0x11b1c2('0x657')](),BattleManager[_0x11b1c2('0x1d0')]()&&(BattleManager[_0x11b1c2('0x30b')]=![]);},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x812')]=function(){const _0x14b55b=_0x5f4923;if(this[_0x14b55b('0x613')]()){if(_0x14b55b('0x7e1')!=='vQquv'){function _0x524719(){const _0x355d2a=_0x14b55b;this[_0x355d2a('0x443')]=(this[_0x355d2a('0x443')]*(_0x4a766d-0x1)+this['_targetFloatHeight'])/_0x14e202;}}else this[_0x14b55b('0x31e')]=!![],this['_logWindow'][_0x14b55b('0x2fc')]('addText',VisuMZ['BattleCore'][_0x14b55b('0x39b')][_0x14b55b('0x185')][_0x14b55b('0x894')]);}else this[_0x14b55b('0x71c')]();},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x613')]=function(){const _0x1b1f4a=_0x5f4923;return BattleManager[_0x1b1f4a('0x7a1')]();},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x71c')]=function(){const _0x1ef155=_0x5f4923;this[_0x1ef155('0x31e')]=![],this[_0x1ef155('0xc5')][_0x1ef155('0x7aa')](),this[_0x1ef155('0x76a')]['visible']=![];if(BattleManager['isBattleTest']())($dataSystem[_0x1ef155('0x54a')]||$dataSystem[_0x1ef155('0x3cb')])&&SceneManager['snapForBackground']();else($gameMap[_0x1ef155('0x54a')]()||$gameMap[_0x1ef155('0x3cb')]())&&SceneManager[_0x1ef155('0xb3')]();SceneManager[_0x1ef155('0x2fc')](Scene_Options);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x223')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x753')],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x753')]=function(){const _0x409719=_0x5f4923;VisuMZ[_0x409719('0x88d')][_0x409719('0x223')]['call'](this);if(this[_0x409719('0x31e')]&&!BattleManager['_subject'])this[_0x409719('0x71c')]();},Scene_Battle[_0x5f4923('0x14f')]['createAutoBattleWindow']=function(){const _0x1e3515=_0x5f4923,_0x5cbc55=this[_0x1e3515('0x4d5')]();this[_0x1e3515('0x2fe')]=new Window_AutoBattleCancel(_0x5cbc55),this[_0x1e3515('0x2fe')][_0x1e3515('0x342')](),this['addChild'](this[_0x1e3515('0x2fe')]);},Scene_Battle['prototype'][_0x5f4923('0x4d5')]=function(){const _0x12a74a=_0x5f4923;return VisuMZ['BattleCore'][_0x12a74a('0x39b')][_0x12a74a('0x553')][_0x12a74a('0x57c')][_0x12a74a('0x618')](this);},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0xc1')]=function(){const _0x12b3b7=_0x5f4923;return VisuMZ[_0x12b3b7('0x88d')][_0x12b3b7('0x39b')][_0x12b3b7('0x185')][_0x12b3b7('0x149')];},VisuMZ['BattleCore'][_0x5f4923('0x79b')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x524')],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x524')]=function(){const _0x28ff07=_0x5f4923;if(this[_0x28ff07('0xc1')]()){if(_0x28ff07('0x660')!==_0x28ff07('0x660')){function _0x46b36e(){const _0x33e32b=_0x28ff07;if(!this[_0x33e32b('0x1af')]()&&_0x2a055b['_autoBattle'])return!![];return _0x586d6f['prototype']['isAutoBattle']['call'](this);}}else this[_0x28ff07('0x77a')]();}else{if('hmdae'===_0x28ff07('0x3d9')){function _0x4a5f45(){const _0x470a4d=_0x28ff07;if(!_0x7003b0[_0x470a4d('0x64e')]())return;if(!_0x3dc548[_0x470a4d('0x620')])return;_0x2df3e4[_0x470a4d('0x3b4')](_0x359297,_0x528ba7);const _0x553239=_0x517bdc[_0x470a4d('0x7fd')](),_0x41dbf6=_0x781241[_0x470a4d('0x35c')];if(!_0x553239)return;_0x43ec30['setBattleAngle'](_0x219853[_0x470a4d('0x42a')],_0x2b45e1[_0x470a4d('0x79d')],_0x262ade['EasingType']);if(_0x41dbf6)_0x553239[_0x470a4d('0x28')]('battleAngle');}}else VisuMZ[_0x28ff07('0x88d')][_0x28ff07('0x79b')][_0x28ff07('0x618')](this);}},Scene_Battle['prototype'][_0x5f4923('0x77a')]=function(){const _0x5216a9=_0x5f4923;if(BattleManager[_0x5216a9('0x5c0')]()){if(_0x5216a9('0x799')!=='zxqEH')this[_0x5216a9('0x657')]();else{function _0x1e2e52(){const _0x3baf13=_0x5216a9,_0x1d4b1e=_0x4a5a41[_0x3baf13('0x88d')][_0x3baf13('0x39b')][_0x3baf13('0x19')],_0x486e91=_0x1d4b1e[_0x3baf13('0x215')],_0x2847db=_0x1d4b1e[_0x3baf13('0x58d')],_0x8c3e52=_0x1d4b1e['StepDuration'];this['startMove'](-_0x486e91,-_0x2847db,_0x8c3e52);}}}else{if(BattleManager['isTpb']()){if('NVyUi'!=='NVyUi'){function _0x217f0d(){const _0x12b699=_0x5216a9;return _0x25e7eb['push'](...this[_0x12b699('0x64f')]()['aliveMembers']()[_0x12b699('0x7bf')](_0x370fe6=>_0x370fe6!==this[_0x12b699('0x394')]())),this['repeatTargets'](_0xf8e6ea);}}else VisuMZ[_0x5216a9('0x88d')]['Scene_Battle_startPartyCommandSelection'][_0x5216a9('0x618')](this);}}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x12c')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x692')],Scene_Battle['prototype'][_0x5f4923('0x692')]=function(){const _0x286cb5=_0x5f4923;if(BattleManager[_0x286cb5('0x1d0')]())this[_0x286cb5('0x35e')]();else{if('aikzL'==='aikzL')VisuMZ[_0x286cb5('0x88d')][_0x286cb5('0x12c')]['call'](this);else{function _0x3b4a22(){return'iconText';}}}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x1e')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x312')],Scene_Battle['prototype'][_0x5f4923('0x312')]=function(){const _0x523a16=_0x5f4923;VisuMZ[_0x523a16('0x88d')][_0x523a16('0x1e')][_0x523a16('0x618')](this),this['createActorCommandWindowBattleCore']();},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x815')]=function(){const _0x5e5199=_0x5f4923,_0x451db6=this[_0x5e5199('0x383')];_0x451db6[_0x5e5199('0x629')](_0x5e5199('0x1e3'),this[_0x5e5199('0x4f')][_0x5e5199('0x48f')](this)),_0x451db6[_0x5e5199('0x629')](_0x5e5199('0x32c'),this[_0x5e5199('0x40f')][_0x5e5199('0x48f')](this)),_0x451db6[_0x5e5199('0x629')](_0x5e5199('0x13'),this[_0x5e5199('0x450')]['bind'](this));if(BattleManager[_0x5e5199('0x1d0')]()){if('dgRmw'!==_0x5e5199('0x783')){if(this[_0x5e5199('0xc1')]())delete _0x451db6[_0x5e5199('0x73c')][_0x5e5199('0x634')];else{if('yJpnu'===_0x5e5199('0x482'))_0x451db6[_0x5e5199('0x629')](_0x5e5199('0x634'),this[_0x5e5199('0x7df')][_0x5e5199('0x48f')](this));else{function _0x503f12(){const _0x5b258e=_0x5e5199;_0x1b5964[_0x5b258e('0x54e')]=!![];}}}}else{function _0x5edc64(){const _0xad43cd=_0x5e5199;this['bitmap']=new _0x55fd39(0x1,0x1),_0x406f9e[_0xad43cd('0x773')]()?this[_0xad43cd('0x38')][_0xad43cd('0x596')]=_0x542de1[_0xad43cd('0x65e')](_0xe76956):this[_0xad43cd('0x38')][_0xad43cd('0x596')]=_0x283af9[_0xad43cd('0x84b')](_0x2abfb4),this[_0xad43cd('0x38')][_0xad43cd('0x596')][_0xad43cd('0x267')](this[_0xad43cd('0x488')][_0xad43cd('0x48f')](this));}}}},Scene_Battle['prototype']['actorCommandEscape']=function(){this['commandEscape']();},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x40f')]=function(){const _0x30d60f=_0x5f4923;BattleManager[_0x30d60f('0x857')]()[_0x30d60f('0x5bc')](),BattleManager[_0x30d60f('0x539')](),BattleManager[_0x30d60f('0x3b6')](),this[_0x30d60f('0x26d')]();},Scene_Battle['prototype'][_0x5f4923('0x450')]=function(){const _0x1b13f9=_0x5f4923,_0xbb34de=BattleManager['inputtingAction']();_0xbb34de[_0x1b13f9('0x45f')](this[_0x1b13f9('0x383')]['currentExt']()),this[_0x1b13f9('0x2a3')]();},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x7df')]=function(){const _0xdbe14=_0x5f4923;this[_0xdbe14('0x66b')][_0xdbe14('0x672')](),this[_0xdbe14('0x383')][_0xdbe14('0x378')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x885')]=Scene_Battle[_0x5f4923('0x14f')]['createHelpWindow'],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x806')]=function(){const _0x14f929=_0x5f4923;VisuMZ[_0x14f929('0x88d')][_0x14f929('0x885')][_0x14f929('0x618')](this),this[_0x14f929('0x7bc')]();},Scene_Battle['prototype'][_0x5f4923('0x7bc')]=function(){const _0x419879=_0x5f4923;this[_0x419879('0x383')][_0x419879('0x7ce')](this[_0x419879('0x299')]),this[_0x419879('0x66b')][_0x419879('0x7ce')](this[_0x419879('0x299')]);},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x803')]=function(){const _0x24cbce=_0x5f4923;if($gameTemp[_0x24cbce('0x7db')]!==undefined)return $gameTemp[_0x24cbce('0x7db')];if(this['_battleLayoutStyle'])return this[_0x24cbce('0x87c')];return this[_0x24cbce('0x87c')]=VisuMZ['BattleCore']['Settings'][_0x24cbce('0x88f')]['Style'][_0x24cbce('0x3ec')]()[_0x24cbce('0x32d')](),this[_0x24cbce('0x87c')];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x7c4')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x36')],Scene_Battle['prototype'][_0x5f4923('0x36')]=function(){const _0x260d17=_0x5f4923,_0x4df641=this[_0x260d17('0x803')]();switch(_0x4df641){case _0x260d17('0x855'):return this[_0x260d17('0x20f')](Math[_0x260d17('0x489')](0x1,$gameParty[_0x260d17('0x680')]()),!![]);break;default:return VisuMZ[_0x260d17('0x88d')][_0x260d17('0x7c4')][_0x260d17('0x618')](this);break;}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x31')]=Scene_Battle['prototype'][_0x5f4923('0x6d4')],Scene_Battle[_0x5f4923('0x14f')]['helpWindowRect']=function(){const _0x5ec16d=_0x5f4923,_0x79674c=this[_0x5ec16d('0x803')]();switch(_0x79674c){case _0x5ec16d('0x204'):return this[_0x5ec16d('0x57e')]();break;case _0x5ec16d('0x863'):case _0x5ec16d('0x855'):case'xp':case'portrait':default:return VisuMZ[_0x5ec16d('0x88d')][_0x5ec16d('0x31')][_0x5ec16d('0x618')](this);break;}},Scene_Battle['prototype'][_0x5f4923('0x121')]=function(){const _0x3d6f3a=_0x5f4923,_0x544e1d=this[_0x3d6f3a('0x803')]();switch(_0x544e1d){case'xp':case _0x3d6f3a('0x283'):return this[_0x3d6f3a('0x711')]();break;case _0x3d6f3a('0x204'):return this['statusWindowRectBorderStyle']();break;case _0x3d6f3a('0x863'):case'list':default:return this[_0x3d6f3a('0x1a2')]();break;}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x697')]=Scene_Battle[_0x5f4923('0x14f')]['partyCommandWindowRect'],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x544')]=function(){const _0x60840d=_0x5f4923,_0x4506bb=this['battleLayoutStyle']();switch(_0x4506bb){case'xp':case _0x60840d('0x283'):return this[_0x60840d('0x20e')]();break;case _0x60840d('0x204'):return this[_0x60840d('0x86')]();case _0x60840d('0x863'):case'list':default:return this[_0x60840d('0x21')]();break;}},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x21')]=function(){const _0x448a6a=_0x5f4923,_0x2c1915=VisuMZ['BattleCore']['Settings'][_0x448a6a('0x88f')],_0x2ea137=_0x2c1915['CommandWidth']||0xc0,_0x265600=this[_0x448a6a('0x36')](),_0x2dd39c=this[_0x448a6a('0x875')]()?Graphics[_0x448a6a('0x49b')]-_0x2ea137:0x0,_0x52f0f9=Graphics[_0x448a6a('0x5bf')]-_0x265600;return new Rectangle(_0x2dd39c,_0x52f0f9,_0x2ea137,_0x265600);},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x3b7')]=function(){const _0x15db21=_0x5f4923;return this[_0x15db21('0x544')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x69f')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x889')],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x889')]=function(){const _0x302bf2=_0x5f4923,_0x1736dc=this[_0x302bf2('0x803')]();switch(_0x1736dc){case'xp':case _0x302bf2('0x283'):case _0x302bf2('0x204'):break;case _0x302bf2('0x863'):case _0x302bf2('0x855'):default:VisuMZ['BattleCore'][_0x302bf2('0x69f')][_0x302bf2('0x618')](this);break;}},VisuMZ['BattleCore'][_0x5f4923('0x37a')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x6cf')],Scene_Battle[_0x5f4923('0x14f')]['startActorSelection']=function(){const _0x5409fb=_0x5f4923;VisuMZ[_0x5409fb('0x88d')]['Scene_Battle_startActorSelection'][_0x5409fb('0x618')](this),this['makeTargetSelectionMoreVisible']();},VisuMZ[_0x5f4923('0x88d')]['Scene_Battle_startEnemySelection']=Scene_Battle['prototype'][_0x5f4923('0x606')],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x606')]=function(){const _0x2ad024=_0x5f4923;VisuMZ[_0x2ad024('0x88d')][_0x2ad024('0x278')]['call'](this),this[_0x2ad024('0x364')][_0x2ad024('0x424')](),this['makeTargetSelectionMoreVisible']();},Scene_Battle[_0x5f4923('0x14f')]['makeTargetSelectionMoreVisible']=function(){const _0x398c68=_0x5f4923,_0x3081b9=this[_0x398c68('0x803')]();['xp',_0x398c68('0x283'),_0x398c68('0x204')][_0x398c68('0x147')](_0x3081b9)&&this[_0x398c68('0x383')][_0x398c68('0x378')](),(_0x3081b9===_0x398c68('0x204')||this['isSkillItemWindowsMiddle']())&&(this[_0x398c68('0x839')][_0x398c68('0x378')](),this[_0x398c68('0x306')]['close']());},VisuMZ['BattleCore'][_0x5f4923('0x103')]=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x467')],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x467')]=function(){const _0x3172ba=_0x5f4923;VisuMZ['BattleCore'][_0x3172ba('0x103')][_0x3172ba('0x618')](this),this[_0x3172ba('0x6ec')]();},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x8e')]=function(){const _0x19831e=_0x5f4923;return[_0x19831e('0x597'),_0x19831e('0x626'),_0x19831e('0x13')][_0x19831e('0x147')](this[_0x19831e('0x383')]['currentSymbol']());},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x180')]=Scene_Battle['prototype'][_0x5f4923('0x1b4')],Scene_Battle[_0x5f4923('0x14f')]['onActorCancel']=function(){const _0x263418=_0x5f4923;if(this['isNonSubmenuCancel']())this[_0x263418('0x1ac')][_0x263418('0x73b')](),this[_0x263418('0x34e')][_0x263418('0x342')](),this[_0x263418('0x383')]['activate']();else{if(_0x263418('0x7b7')!==_0x263418('0x4bc'))VisuMZ[_0x263418('0x88d')]['Scene_Battle_onActorCancel'][_0x263418('0x618')](this);else{function _0x5689a8(){const _0x370a7c=_0x263418,_0xf63e99=_0x1e48be[_0x370a7c('0x1f1')]('['+_0x2fd74e['$1'][_0x370a7c('0x5ae')](/\d+/g)+']');for(const _0x3eb3c2 of _0xf63e99){if(!_0x255d6b[_0x370a7c('0x4b2')](_0x3eb3c2))return!![];}return![];}}}this[_0x263418('0x1fb')]();},VisuMZ[_0x5f4923('0x88d')]['Scene_Battle_onEnemyOk']=Scene_Battle['prototype']['onEnemyOk'],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x77c')]=function(){const _0x183301=_0x5f4923;VisuMZ[_0x183301('0x88d')][_0x183301('0x4a3')]['call'](this),this[_0x183301('0x6ec')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x62c')]=Scene_Battle['prototype'][_0x5f4923('0x6a1')],Scene_Battle['prototype'][_0x5f4923('0x6a1')]=function(){const _0x5dc1b9=_0x5f4923;if(this[_0x5dc1b9('0x8e')]()){if(_0x5dc1b9('0x542')!==_0x5dc1b9('0x542')){function _0xd5d663(){const _0x47e067=_0x5dc1b9;this[_0x47e067('0x6f0')]();}}else this[_0x5dc1b9('0x1ac')]['show'](),this[_0x5dc1b9('0x364')][_0x5dc1b9('0x342')](),this[_0x5dc1b9('0x383')][_0x5dc1b9('0x638')]();}else VisuMZ['BattleCore'][_0x5dc1b9('0x62c')]['call'](this);this[_0x5dc1b9('0x1fb')]();},Scene_Battle['prototype'][_0x5f4923('0x6ec')]=function(){const _0x4540d9=_0x5f4923,_0xa2ba98=this['battleLayoutStyle']();if(_0xa2ba98===_0x4540d9('0x204')||this[_0x4540d9('0x3ee')]()){if('DFQTm'==='DFQTm'){this['_skillWindow'][_0x4540d9('0x4ee')]();if(this[_0x4540d9('0x839')][_0x4540d9('0x148')]){if(_0x4540d9('0x414')!==_0x4540d9('0x356'))this[_0x4540d9('0x839')][_0x4540d9('0x73b')]();else{function _0x4155ca(){const _0x2f2582=_0x4540d9;if(!_0x3c8b14[_0x2f2582('0x64e')]())return;if(!_0x2ccd2c[_0x2f2582('0x7ef')])return;_0x786386[_0x2f2582('0x3b4')](_0x3ecc79,_0x44eefd);const _0x3a07eb=_0x222b38[_0x2f2582('0x50a')],_0xf62139=_0x2f2ca4[_0x2f2582('0x1a8')];if(!_0x3a07eb)return;_0x3a07eb['_battleCoreForcedElements']=_0xf62139;}}}this[_0x4540d9('0x306')][_0x4540d9('0x4ee')](),this[_0x4540d9('0x306')][_0x4540d9('0x148')]&&this['_itemWindow'][_0x4540d9('0x73b')]();}else{function _0x2e27e7(){const _0x87b1b9=_0x4540d9;this[_0x87b1b9('0x596')][_0x87b1b9('0x328')]();const _0x80d4b8=this[_0x87b1b9('0x422')]();!_0x8b2ded(_0x80d4b8)&&this['drawGauge']();}}}},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x1fb')]=function(){const _0xb894de=_0x5f4923,_0x10e4e2=this[_0xb894de('0x803')]();if(['xp',_0xb894de('0x283'),_0xb894de('0x204')]['includes'](_0x10e4e2)){if(_0xb894de('0x4f3')!==_0xb894de('0x747'))this[_0xb894de('0x383')][_0xb894de('0x4ee')]();else{function _0x1a9219(){return!![];}}}this['okTargetSelectionVisibility']();},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x1a2')]=function(){const _0x3237be=_0x5f4923,_0x10f7ba=VisuMZ[_0x3237be('0x88d')][_0x3237be('0x39b')][_0x3237be('0x88f')],_0x3c1496=Window_BattleStatus[_0x3237be('0x14f')][_0x3237be('0x20a')](),_0x377c68=Graphics[_0x3237be('0x49b')]-(_0x10f7ba[_0x3237be('0x288')]||0xc0),_0x3b970a=this['windowAreaHeight']()+_0x3c1496,_0x4340ad=this[_0x3237be('0x875')]()?0x0:Graphics['boxWidth']-_0x377c68,_0x2c647f=Graphics[_0x3237be('0x5bf')]-_0x3b970a+_0x3c1496;return new Rectangle(_0x4340ad,_0x2c647f,_0x377c68,_0x3b970a);},Scene_Battle['prototype'][_0x5f4923('0x711')]=function(){const _0x936f07=_0x5f4923,_0x261fc6=Window_BattleStatus[_0x936f07('0x14f')]['extraHeight'](),_0x202d1f=Graphics[_0x936f07('0x49b')],_0x10453d=this[_0x936f07('0x36')]()+_0x261fc6,_0x1e9c12=0x0,_0x49570c=Graphics[_0x936f07('0x5bf')]-_0x10453d+_0x261fc6;return new Rectangle(_0x1e9c12,_0x49570c,_0x202d1f,_0x10453d);},Scene_Battle['prototype']['partyCommandWindowRectXPStyle']=function(){const _0x19da0f=_0x5f4923,_0x3ca413=Graphics['boxWidth']/0x2,_0x20a5f7=this[_0x19da0f('0x20f')](VisuMZ['BattleCore'][_0x19da0f('0x39b')][_0x19da0f('0x88f')][_0x19da0f('0x5a5')],!![]),_0xcd577e=Math[_0x19da0f('0x774')]((Graphics['boxWidth']-_0x3ca413)/0x2),_0x127fd7=Graphics[_0x19da0f('0x5bf')]-_0x20a5f7-this[_0x19da0f('0x711')]()[_0x19da0f('0x303')];return new Rectangle(_0xcd577e,_0x127fd7,_0x3ca413,_0x20a5f7);},Scene_Battle[_0x5f4923('0x14f')]['helpWindowRectBorderStyle']=function(){const _0x492871=_0x5f4923,_0xa247e7=Graphics['width'],_0x5c7bf7=Math[_0x492871('0x774')]((Graphics['boxWidth']-_0xa247e7)/0x2),_0x1bdd29=this[_0x492871('0x1e4')](),_0x2ce19d=(Graphics[_0x492871('0x303')]-Graphics[_0x492871('0x5bf')])/-0x2;return new Rectangle(_0x5c7bf7,_0x2ce19d,_0xa247e7,_0x1bdd29);},Scene_Battle['prototype'][_0x5f4923('0x133')]=function(){const _0x1581dc=_0x5f4923,_0x1fa029=Graphics['width'],_0x1d33c6=Math['round']((Graphics[_0x1581dc('0x49b')]-_0x1fa029)/0x2),_0x373d1e=this[_0x1581dc('0x20f')](0x4,!![]),_0x4db753=Graphics['boxHeight']-_0x373d1e+(Graphics[_0x1581dc('0x303')]-Graphics[_0x1581dc('0x5bf')])/0x2;return new Rectangle(_0x1d33c6,_0x4db753,_0x1fa029,_0x373d1e);},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x86')]=function(){const _0x47911e=_0x5f4923,_0x3d43c8=Math[_0x47911e('0x3ed')](Graphics[_0x47911e('0x77b')]/0x3),_0x529cf9=this[_0x47911e('0x875')]()?(Graphics['width']+Graphics['boxWidth'])/0x2-_0x3d43c8:(Graphics[_0x47911e('0x77b')]-Graphics['boxWidth'])/-0x2,_0x303bbc=this[_0x47911e('0x57e')](),_0x1b0849=_0x303bbc['y']+_0x303bbc[_0x47911e('0x303')],_0x3abec0=this[_0x47911e('0x133')](),_0x2fac94=_0x3abec0['y']-_0x1b0849;return new Rectangle(_0x529cf9,_0x1b0849,_0x3d43c8,_0x2fac94);},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x497')]=function(){const _0x223ccf=_0x5f4923,_0x1f3fc7=Math[_0x223ccf('0x3bf')](Graphics['width']/0x3),_0x8174ea=Math[_0x223ccf('0x774')]((Graphics[_0x223ccf('0x49b')]-_0x1f3fc7)/0x2),_0x25b48a=this[_0x223ccf('0x86')](),_0x1b5bad=_0x25b48a['y'],_0x3bbf89=_0x25b48a['height'];return new Rectangle(_0x8174ea,_0x1b5bad,_0x1f3fc7,_0x3bbf89);},Scene_Battle[_0x5f4923('0x14f')]['repositionCancelButtonBorderStyle']=function(){const _0x3dd20d=_0x5f4923;this[_0x3dd20d('0x1ca')]['y']=this['_helpWindow']['y']+this[_0x3dd20d('0x299')][_0x3dd20d('0x303')],this[_0x3dd20d('0x875')]()?this[_0x3dd20d('0x1ca')]['x']=-this[_0x3dd20d('0x1ca')][_0x3dd20d('0x77b')]-0x4:this[_0x3dd20d('0x1ca')]['x']=Graphics[_0x3dd20d('0x77b')]-(Graphics[_0x3dd20d('0x77b')]-Graphics[_0x3dd20d('0x49b')])/0x2-this[_0x3dd20d('0x1ca')]['width']-0x4;},VisuMZ['BattleCore']['Scene_Battle_skillWindowRect']=Scene_Battle['prototype'][_0x5f4923('0x5b2')],Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x5b2')]=function(){const _0x5251c5=_0x5f4923;if(this[_0x5251c5('0x803')]()==='border')return this[_0x5251c5('0x497')]();else{if(this['isSkillItemWindowsMiddle']()){if(_0x5251c5('0x1ba')!==_0x5251c5('0x1ba')){function _0x5139e7(){const _0x6e3119=_0x5251c5,_0x1d87da=this[_0x6e3119('0x317')],_0x1d64eb=_0xe45ef9[_0x6e3119('0x514')](),_0x630e90=_0x180d5a['x']+_0x3eb86f[_0x6e3119('0x3ed')](_0x5ec894['width']/0x2)+_0x1d64eb;_0x1d87da['x']=_0x1d87da[_0x6e3119('0x77b')]/-0x2+_0x630e90,_0x1d87da['y']=_0xa8af20['floor'](_0x8962d6[_0x6e3119('0x303')]/0x2);}}else return this['skillItemWindowRectMiddle']();}else{if(_0x5251c5('0x607')!==_0x5251c5('0x607')){function _0x5962ea(){const _0x204d55=_0x5251c5;this[_0x204d55('0x23c')][_0x204d55('0x3e8')](this[_0x204d55('0x38')]);}}else return VisuMZ[_0x5251c5('0x88d')][_0x5251c5('0x763')][_0x5251c5('0x618')](this);}}},VisuMZ[_0x5f4923('0x88d')]['Scene_Battle_itemWindowRect']=Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x4bf')],Scene_Battle['prototype'][_0x5f4923('0x4bf')]=function(){const _0x5710d3=_0x5f4923;if(this[_0x5710d3('0x803')]()===_0x5710d3('0x204')){if(_0x5710d3('0x6e8')!==_0x5710d3('0x6e8')){function _0x2bf9d1(){const _0x46e10d=_0x5710d3,_0x23aa2d=this[_0x46e10d('0x555')]()[_0x46e10d('0x59b')];return _0x23aa2d[_0x46e10d('0x5ae')](/(?:ENEMY|ENEMIES|FOE|FOES)/i);}}else return this[_0x5710d3('0x497')]();}else{if(this[_0x5710d3('0x3ee')]()){if('wmCUo'!=='wmCUo'){function _0x40b848(){const _0x2d9d9f=_0x5710d3;this['_distortionSprite']=new _0x1d68c4(),this[_0x2d9d9f('0x23c')][_0x2d9d9f('0x105')]['x']=0.5,this[_0x2d9d9f('0x23c')][_0x2d9d9f('0x105')]['y']=0.5,this['addChild'](this[_0x2d9d9f('0x23c')]);}}else return this['skillItemWindowRectMiddle']();}else{if(_0x5710d3('0x46e')===_0x5710d3('0x46e'))return VisuMZ[_0x5710d3('0x88d')][_0x5710d3('0x761')][_0x5710d3('0x618')](this);else{function _0x550e3d(){const _0x3c63f1=_0x5710d3;_0x25ed0b[_0x3c63f1('0x88d')][_0x3c63f1('0x4c4')]['call'](this,_0x5808d6),_0xfee72b[_0x3c63f1('0x65')]();}}}}},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x3ee')]=function(){const _0x3f1ae3=_0x5f4923;return VisuMZ[_0x3f1ae3('0x88d')][_0x3f1ae3('0x39b')][_0x3f1ae3('0x88f')][_0x3f1ae3('0xbd')];},Scene_Battle[_0x5f4923('0x14f')][_0x5f4923('0x17d')]=function(){const _0x4b27d5=_0x5f4923,_0x184fe9=Sprite_Button['prototype']['blockWidth']()*0x2+0x4;let _0x2d43b7=Graphics[_0x4b27d5('0x49b')]-_0x184fe9;Imported[_0x4b27d5('0x4f6')]&&SceneManager[_0x4b27d5('0x45')]()&&(_0x2d43b7+=_0x184fe9);const _0x215f7e=this[_0x4b27d5('0x48d')](),_0x4ea479=Graphics[_0x4b27d5('0x5bf')]-_0x215f7e-this[_0x4b27d5('0x121')]()[_0x4b27d5('0x303')]+Window_BattleStatus[_0x4b27d5('0x14f')]['extraHeight'](),_0x255889=0x0;return new Rectangle(_0x255889,_0x215f7e,_0x2d43b7,_0x4ea479);},Scene_Battle[_0x5f4923('0x14f')]['createEnemyNameContainer']=function(){const _0x23d6f9=_0x5f4923;this[_0x23d6f9('0x2e6')]=new Sprite(),this[_0x23d6f9('0x2e6')]['x']=this[_0x23d6f9('0x76a')]['x'],this['_enemyNameContainer']['y']=this[_0x23d6f9('0x76a')]['y'];const _0x215e8a=this['children'][_0x23d6f9('0x421')](this[_0x23d6f9('0x76a')]);this[_0x23d6f9('0x827')](this[_0x23d6f9('0x2e6')],_0x215e8a);for(let _0x474720=0x0;_0x474720<0x8;_0x474720++){const _0x5599f8=new Window_EnemyName(_0x474720);this[_0x23d6f9('0x2e6')]['addChild'](_0x5599f8);}},Sprite_Battler[_0x5f4923('0x81c')]=VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x39b')][_0x5f4923('0x5dc')][_0x5f4923('0xdd')],VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x24b')]=Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x7b8')],Sprite_Battler['prototype'][_0x5f4923('0x7b8')]=function(){const _0x13f022=_0x5f4923;VisuMZ[_0x13f022('0x88d')]['Sprite_Battler_initMembers'][_0x13f022('0x618')](this),this[_0x13f022('0x62f')]();if(this[_0x13f022('0x814')]===Sprite_Enemy)this[_0x13f022('0x6e0')]();this[_0x13f022('0x5e0')]();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x62f')]=function(){const _0x360635=_0x5f4923;this[_0x360635('0x280')]=0x0,this[_0x360635('0x674')]=0x0,this['_floatHeight']=0x0,this['_targetFloatHeight']=0x0,this[_0x360635('0x1f')]=0x0,this['_floatWholeDuration']=0x0,this[_0x360635('0x141')]=_0x360635('0x662'),this[_0x360635('0x6f9')]=0x0,this[_0x360635('0x5ca')]=0x0,this[_0x360635('0x17a')]=0x0,this[_0x360635('0x67c')]=0x0,this[_0x360635('0x346')]=0xff,this[_0x360635('0x385')]=0x0,this[_0x360635('0x307')]=0x0,this[_0x360635('0x513')]=_0x360635('0x662'),this[_0x360635('0x78f')]=0x0,this[_0x360635('0x38f')]=0x0,this[_0x360635('0x464')]=0x0,this[_0x360635('0xd6')]=0x0,this[_0x360635('0x36f')]='Linear',this[_0x360635('0x87d')]=!![],this[_0x360635('0x86a')]=0x0,this[_0x360635('0x59c')]=0x0,this['_targetSkewX']=0x0,this[_0x360635('0x5f6')]=0x0,this[_0x360635('0x834')]=0x0,this['_skewWholeDuration']=0x0,this[_0x360635('0x6a6')]='Linear',this['_growX']=0x1,this['_growY']=0x1,this['_targetGrowX']=0x1,this[_0x360635('0x7f5')]=0x1,this[_0x360635('0x9b')]=0x0,this[_0x360635('0x7f')]=0x0,this[_0x360635('0x27f')]='Linear',this[_0x360635('0x470')]=0x1;},Sprite_Battler[_0x5f4923('0x14f')]['createShadowSprite']=function(){const _0x29c66d=_0x5f4923;this[_0x29c66d('0x389')]=new Sprite(),this[_0x29c66d('0x389')][_0x29c66d('0x596')]=ImageManager[_0x29c66d('0x630')](_0x29c66d('0x76c')),this[_0x29c66d('0x389')][_0x29c66d('0x596')][_0x29c66d('0x28a')]=VisuMZ[_0x29c66d('0x88d')][_0x29c66d('0x39b')][_0x29c66d('0x5dc')]['SmoothImage'],this[_0x29c66d('0x389')][_0x29c66d('0x105')]['x']=0.5,this['_shadowSprite'][_0x29c66d('0x105')]['y']=0.5,this[_0x29c66d('0x389')]['y']=-0x2,this[_0x29c66d('0x389')]['visible']=![],this[_0x29c66d('0x3e8')](this[_0x29c66d('0x389')]);},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x5e0')]=function(){const _0x348fef=_0x5f4923;this[_0x348fef('0x23c')]=new Sprite(),this[_0x348fef('0x23c')][_0x348fef('0x105')]['x']=0.5,this[_0x348fef('0x23c')][_0x348fef('0x105')]['y']=0.5,this[_0x348fef('0x3e8')](this[_0x348fef('0x23c')]);},Sprite_Battler[_0x5f4923('0x14f')]['attachSpritesToDistortionSprite']=function(){const _0x2d6719=_0x5f4923;if(!this[_0x2d6719('0x23c')])return;if(this[_0x2d6719('0x389')]){const _0x2ec041=this[_0x2d6719('0x5fa')](this[_0x2d6719('0x23c')]);this[_0x2d6719('0x827')](this[_0x2d6719('0x389')],_0x2ec041),this[_0x2d6719('0x2cb')]();}if(this[_0x2d6719('0xe7')]){if(_0x2d6719('0x48a')!==_0x2d6719('0x48a')){function _0x48c1f7(){const _0x2f6a91=_0x2d6719;_0x52d778=_0x9f4da2+_0x2922ef[_0x2f6a91('0x31c')]/0x2-0x4,_0x101bda=_0x4ad823-_0x21bc27[_0x2f6a91('0x2f8')]/0x2;}}else this['_distortionSprite'][_0x2d6719('0x3e8')](this[_0x2d6719('0xe7')]);}this[_0x2d6719('0x2da')]&&this[_0x2d6719('0x23c')][_0x2d6719('0x3e8')](this[_0x2d6719('0x2da')]);if(this['_mainSprite']){if(_0x2d6719('0x30d')===_0x2d6719('0x92')){function _0x318dbd(){const _0x1677e5=_0x2d6719;if(_0x1594d5[_0x1677e5('0x4ff')]()[_0x1677e5('0x2fd')]>0x0)return!![];this[_0x1677e5('0x809')]='';}}else this[_0x2d6719('0x23c')]['addChild'](this[_0x2d6719('0x38')]);}this[_0x2d6719('0x777')]&&this['_distortionSprite'][_0x2d6719('0x3e8')](this[_0x2d6719('0x777')]);},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2cb')]=function(){const _0x2021d8=_0x5f4923;if(!this[_0x2021d8('0x389')])return;if(this[_0x2021d8('0x756')]&&this['_battler'][_0x2021d8('0x86f')]()){if(_0x2021d8('0x54c')!==_0x2021d8('0x54c')){function _0x3518d5(){const _0x3e5bc8=_0x2021d8;this['_mainSprite']['bitmap'][_0x3e5bc8('0x28a')]!==this[_0x3e5bc8('0x756')]['battlerSmoothImage']()&&(this[_0x3e5bc8('0x38')][_0x3e5bc8('0x596')][_0x3e5bc8('0x28a')]=this[_0x3e5bc8('0x756')]['battlerSmoothImage']());}}else{const _0x32cbbb=this[_0x2021d8('0x389')][_0x2021d8('0x596')];this[_0x2021d8('0x389')][_0x2021d8('0x2f')](0x0,0x0,_0x32cbbb['width'],_0x32cbbb[_0x2021d8('0x303')]);}}else this[_0x2021d8('0x389')][_0x2021d8('0x2f')](0x0,0x0,0x0,0x0);},Sprite_Battler[_0x5f4923('0x14f')]['damageContainer']=function(){const _0x353f64=_0x5f4923;if(SceneManager[_0x353f64('0x64e')]())return SceneManager[_0x353f64('0x60a')][_0x353f64('0xc5')]['_damageContainer'];else{if('QmLZZ'===_0x353f64('0xca'))return this[_0x353f64('0x96')];else{function _0x25ce18(){const _0x1dac95=_0x353f64;_0x1d0ae9+=_0x31c6c2['x']-this[_0x1dac95('0xf7')]();const _0x4e04c7=_0x4c436e[_0x1dac95('0x4f9')]()*0x3/0x4;_0xd81821=_0xf17ef2['y']+_0x4e04c7,_0x42649e=_0x2978bb[_0x1dac95('0x6b4')](_0x450975,_0x504af6['y']+this['y']-this[_0x1dac95('0x303')]+_0x4e04c7);}}}},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x34d')]=function(_0x2cc9c4,_0x26c072){const _0x2e39ca=_0x5f4923;if(!this[_0x2e39ca('0x756')][_0x2e39ca('0x298')]())return;const _0x83dabb=VisuMZ[_0x2e39ca('0x88d')][_0x2e39ca('0x39b')][_0x2e39ca('0x15d')],_0x379741=new Sprite_Damage();_0x379741[_0x2e39ca('0x70')]=_0x83dabb[_0x2e39ca('0x5ea')],this[_0x2e39ca('0x122')](_0x379741),_0x379741[_0x2e39ca('0x34d')](_0x2cc9c4,_0x26c072),this['addDamageSprite'](_0x379741);},Sprite_Battler['prototype'][_0x5f4923('0x575')]=function(_0x3ccb8a,_0x146eef,_0x2111db){const _0x101ddd=_0x5f4923;if(!this['_battler']['isSpriteVisible']())return;const _0x303573=VisuMZ[_0x101ddd('0x88d')]['Settings']['Damage'],_0x395809=new Sprite_Damage();_0x395809['_duration']=_0x303573[_0x101ddd('0x5ea')],this[_0x101ddd('0x122')](_0x395809),_0x395809[_0x101ddd('0x575')](_0x3ccb8a,_0x146eef,_0x2111db),this[_0x101ddd('0x39a')](_0x395809);},Sprite_Battler[_0x5f4923('0x14f')]['setupDamagePopup']=function(){const _0x131b1e=_0x5f4923;if(!this['_battler'][_0x131b1e('0x491')]())return;while(this[_0x131b1e('0x756')][_0x131b1e('0x491')]()){if(this[_0x131b1e('0x756')][_0x131b1e('0x298')]()){if(_0x131b1e('0x882')===_0x131b1e('0x882'))this[_0x131b1e('0xef')]();else{function _0x42f599(){const _0x123e24=_0x131b1e;_0x2b9ce2['Actor'][_0x123e24('0x71e')]=!![];}}}}this['_battler'][_0x131b1e('0x418')](),this[_0x131b1e('0x756')]['clearResult']();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0xef')]=function(){const _0x24ad86=_0x5f4923,_0x398e13=VisuMZ[_0x24ad86('0x88d')][_0x24ad86('0x39b')][_0x24ad86('0x15d')],_0x5d4c58=new Sprite_Damage();_0x5d4c58[_0x24ad86('0x70')]=_0x398e13['PopupDuration'],this[_0x24ad86('0x122')](_0x5d4c58),_0x5d4c58[_0x24ad86('0x672')](this['_battler']),_0x5d4c58[_0x24ad86('0x5af')](this[_0x24ad86('0x756')]),this[_0x24ad86('0x39a')](_0x5d4c58);},Sprite_Battler[_0x5f4923('0x14f')]['addDamageSprite']=function(_0x2536ab){const _0x21e4ad=_0x5f4923;this[_0x21e4ad('0x80d')][_0x21e4ad('0x2fc')](_0x2536ab);if(this[_0x21e4ad('0x474')]())SceneManager[_0x21e4ad('0x60a')][_0x21e4ad('0x1ac')][_0x21e4ad('0x39a')](_0x2536ab,this[_0x21e4ad('0x756')]);else{if('OCVQH'===_0x21e4ad('0x15c')){this[_0x21e4ad('0x140')]()[_0x21e4ad('0x3e8')](_0x2536ab);if(SceneManager[_0x21e4ad('0x44a')]())_0x2536ab['scale']['x']=-0x1;}else{function _0xd05f76(){const _0x5a8e28=_0x21e4ad;if(!_0x496025[_0x5a8e28('0x88d')][_0x5a8e28('0x39b')][_0x5a8e28('0xb1')]['ShowCurrentState'])return;_0x30d736['BattleCore'][_0x5a8e28('0x39f')][_0x5a8e28('0x618')](this,_0x41e5d7);}}}},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x474')]=function(){const _0x24b69a=_0x5f4923;return!$gameSystem[_0x24b69a('0x773')]()&&this[_0x24b69a('0x756')]&&this[_0x24b69a('0x756')]['isActor']();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x122')]=function(_0x650286){const _0x28e9e0=_0x5f4923,_0x246e85=VisuMZ['BattleCore']['Settings'][_0x28e9e0('0x15d')],_0x119725=SceneManager['isBattleFlipped']()?-0x1:0x1;let _0x4ded88=this['x'],_0x204c2f=this['y'];const _0x723292=SceneManager[_0x28e9e0('0x60a')][_0x28e9e0('0x1ac')];if(_0x723292&&this[_0x28e9e0('0x96')]===_0x723292){_0x4ded88+=_0x723292['x']-this[_0x28e9e0('0xf7')]();const _0x9d7486=_0x723292[_0x28e9e0('0x4f9')]()*0x3/0x4;_0x204c2f=_0x723292['y']+_0x9d7486,_0x204c2f=Math[_0x28e9e0('0x6b4')](_0x204c2f,_0x723292['y']+this['y']-this['height']+_0x9d7486);}_0x650286['x']=Math['round'](_0x4ded88+this[_0x28e9e0('0xf7')]()*_0x119725),_0x650286['y']=Math[_0x28e9e0('0x774')](_0x204c2f+this[_0x28e9e0('0x3f2')]());if(_0x246e85[_0x28e9e0('0x1c8')])for(const _0x3bb06e of this[_0x28e9e0('0x80d')]){if(_0x28e9e0('0x4d7')!==_0x28e9e0('0x4d7')){function _0x2c5044(){const _0x1eebe9=_0x28e9e0;this[_0x1eebe9('0x1ca')]['y']=this[_0x1eebe9('0x299')]['y']+this[_0x1eebe9('0x299')]['height'],this[_0x1eebe9('0x875')]()?this[_0x1eebe9('0x1ca')]['x']=-this[_0x1eebe9('0x1ca')][_0x1eebe9('0x77b')]-0x4:this[_0x1eebe9('0x1ca')]['x']=_0x1cd2ff[_0x1eebe9('0x77b')]-(_0x10ec73['width']-_0x127844[_0x1eebe9('0x49b')])/0x2-this[_0x1eebe9('0x1ca')]['width']-0x4;}}else _0x3bb06e['x']+=_0x246e85[_0x28e9e0('0x82')]*_0x119725,_0x3bb06e['y']+=_0x246e85['PopupShiftY'];}else{const _0x317688=this['_damages'][this[_0x28e9e0('0x80d')]['length']-0x1];if(_0x317688){if(_0x28e9e0('0x5f3')===_0x28e9e0('0x5f3'))_0x650286['x']=_0x317688['x']+_0x246e85[_0x28e9e0('0x82')]*_0x119725,_0x650286['y']=_0x317688['y']+_0x246e85[_0x28e9e0('0x791')];else{function _0xff7909(){const _0x133f83=_0x28e9e0;if(!_0x49563b['isSceneBattle']())return;const _0x3c8892=_0x4e7b74[_0x133f83('0x7fd')]();if(!_0x3c8892)return;_0x3c8892[_0x133f83('0x28')]('battleGrow');}}}}},VisuMZ[_0x5f4923('0x88d')]['Sprite_Battler_damageOffsetX']=Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0xf7')],Sprite_Battler['prototype'][_0x5f4923('0xf7')]=function(){const _0x370fdd=_0x5f4923;let _0x92eeca=VisuMZ[_0x370fdd('0x88d')]['Sprite_Battler_damageOffsetX'][_0x370fdd('0x618')](this),_0x2e7597=VisuMZ['BattleCore']['Settings'][_0x370fdd('0x15d')][_0x370fdd('0x14c')]||0x0;return Math[_0x370fdd('0x774')](_0x92eeca+_0x2e7597);},VisuMZ['BattleCore'][_0x5f4923('0x53d')]=Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x3f2')],Sprite_Battler['prototype'][_0x5f4923('0x3f2')]=function(){const _0x423767=_0x5f4923;let _0x45debd=VisuMZ[_0x423767('0x88d')]['Sprite_Battler_damageOffsetY']['call'](this);switch(VisuMZ[_0x423767('0x88d')][_0x423767('0x39b')][_0x423767('0x15d')][_0x423767('0x26b')]){case'head':_0x45debd-=this['height']*this['scale']['y'];break;case _0x423767('0x4a9'):_0x45debd-=this['height']*this['scale']['y']*0.5;break;}let _0x39775f=VisuMZ[_0x423767('0x88d')][_0x423767('0x39b')][_0x423767('0x15d')]['PopupOffsetY']||0x0;return Math[_0x423767('0x774')](_0x45debd+_0x39775f);},Sprite_Actor['prototype']['damageOffsetX']=function(){const _0x350293=_0x5f4923;return Sprite_Battler[_0x350293('0x14f')][_0x350293('0xf7')][_0x350293('0x618')](this);},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x3f2')]=function(){const _0x1f4097=_0x5f4923;return Sprite_Battler[_0x1f4097('0x14f')][_0x1f4097('0x3f2')]['call'](this);},Sprite_Battler[_0x5f4923('0x14f')]['destroyDamageSprite']=function(_0x2192ec){const _0x568377=_0x5f4923;this[_0x568377('0x474')]()?SceneManager[_0x568377('0x60a')]['_statusWindow'][_0x568377('0x825')](_0x2192ec):(this[_0x568377('0x140')]()[_0x568377('0x1b9')](_0x2192ec),this[_0x568377('0x80d')][_0x568377('0x835')](_0x2192ec),_0x2192ec['destroy']());},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x33d')]=Sprite_Battler['prototype'][_0x5f4923('0x4f4')],Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x4f4')]=function(_0x44c616,_0x4c83f9){const _0x3e94e8=_0x5f4923;if(!this[_0x3e94e8('0x1de')]){this[_0x3e94e8('0x1de')]=!![];const _0x550af9=VisuMZ[_0x3e94e8('0x88d')]['Settings'];if(this[_0x3e94e8('0x814')]===Sprite_Actor)_0x44c616+=_0x550af9[_0x3e94e8('0x5dc')]['OffsetX']||0x0,_0x4c83f9+=_0x550af9[_0x3e94e8('0x5dc')][_0x3e94e8('0x33e')]||0x0;else{if(this[_0x3e94e8('0x814')]===Sprite_Enemy){if(_0x3e94e8('0x2eb')===_0x3e94e8('0x872')){function _0x5dc6c6(){const _0x3af375=_0x3e94e8;if(this[_0x3af375('0x355')]())this[_0x3af375('0xb0')](_0x3af375('0x55'));_0x10f35c['BattleCore'][_0x3af375('0x62a')][_0x3af375('0x618')](this);if(this['isTurnBased']())this[_0x3af375('0xb0')](_0x3af375('0x633'));}}else _0x44c616+=_0x550af9['Enemy']['OffsetX']||0x0,_0x4c83f9+=_0x550af9[_0x3e94e8('0x510')]['OffsetY']||0x0;}}}VisuMZ[_0x3e94e8('0x88d')][_0x3e94e8('0x33d')][_0x3e94e8('0x618')](this,_0x44c616,_0x4c83f9);},VisuMZ[_0x5f4923('0x88d')]['Sprite_Battler_update']=Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x7aa')],Sprite_Battler[_0x5f4923('0x14f')]['update']=function(){const _0x28bc84=_0x5f4923;VisuMZ[_0x28bc84('0x88d')][_0x28bc84('0x84a')][_0x28bc84('0x618')](this),!this[_0x28bc84('0x756')]&&this[_0x28bc84('0x427')]&&(this[_0x28bc84('0x427')][_0x28bc84('0x3fd')]=![]);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x64a')]=Sprite_Battler[_0x5f4923('0x14f')]['updateMain'],Sprite_Battler['prototype'][_0x5f4923('0x79')]=function(){const _0x41b9a3=_0x5f4923;this[_0x41b9a3('0x2db')](),this[_0x41b9a3('0x3b2')](),this[_0x41b9a3('0x2c5')](),this['updateFlip'](),this[_0x41b9a3('0x7ed')](),VisuMZ['BattleCore'][_0x41b9a3('0x64a')][_0x41b9a3('0x618')](this);if(this['constructor']===Sprite_Enemy)this[_0x41b9a3('0x564')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x1be')]=Sprite_Battler['prototype'][_0x5f4923('0x6')],Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x6')]=function(){const _0x3fd18a=_0x5f4923;VisuMZ[_0x3fd18a('0x88d')][_0x3fd18a('0x1be')][_0x3fd18a('0x618')](this),this['updatePositionBattleCore'](),this[_0x3fd18a('0x457')]();},Sprite_Battler['prototype'][_0x5f4923('0xf5')]=function(){const _0x446a55=_0x5f4923;this[_0x446a55('0x280')]=this['x'],this[_0x446a55('0x674')]=this['y'],this[_0x446a55('0x7ee')](),this['updateJump'](),this['x']+=this[_0x446a55('0x6bc')](),this['y']+=this[_0x446a55('0x652')](),this['x']=Math[_0x446a55('0x774')](this['x']),this['y']=Math[_0x446a55('0x774')](this['y']);},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x6bc')]=function(){let _0x734e26=0x0;return _0x734e26;},Sprite_Battler['prototype'][_0x5f4923('0x652')]=function(){const _0x3e5bc4=_0x5f4923;let _0x3ec49e=0x0;_0x3ec49e-=this[_0x3e5bc4('0x443')],_0x3ec49e-=this['_jumpHeight'];if(this['_distortionSprite']&&this[_0x3e5bc4('0x814')]!==Sprite_SvEnemy){if('bnreS'!==_0x3e5bc4('0x52f')){function _0x2e5ec0(){const _0xbdf1a7=_0x3e5bc4;_0x506650['scale']['x']=this[_0xbdf1a7('0x7ff')](),_0x2c1805[_0xbdf1a7('0x59e')]['y']=this[_0xbdf1a7('0x6d6')]();}}else{const _0x4ab925=this[_0x3e5bc4('0x23c')][_0x3e5bc4('0x59e')]['y'];_0x3ec49e-=(_0x4ab925-0x1)*this[_0x3e5bc4('0x303')];}}return _0x3ec49e;},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x698')]=function(){const _0xff1008=_0x5f4923,_0x36f82e=this[_0xff1008('0x756')]&&this[_0xff1008('0x756')][_0xff1008('0x168')]();this['_flipScaleX']=(_0x36f82e?-0x1:0x1)*Math[_0xff1008('0x47e')](this[_0xff1008('0x59e')]['x']);},Sprite_Battler[_0x5f4923('0x14f')]['startFloat']=function(_0x1c95aa,_0x13aa04,_0x836d7){const _0x462f8a=_0x5f4923;if(!this[_0x462f8a('0x1ea')]())return;if(this[_0x462f8a('0x3b8')]===_0x1c95aa)return;this['_targetFloatHeight']=_0x1c95aa,this[_0x462f8a('0x1f')]=_0x13aa04,this[_0x462f8a('0x199')]=_0x13aa04,this[_0x462f8a('0x141')]=_0x836d7||_0x462f8a('0x662');if(_0x13aa04<=0x0)this[_0x462f8a('0x443')]=_0x1c95aa;},Sprite_Battler['prototype'][_0x5f4923('0x7ee')]=function(){const _0x19e032=_0x5f4923;if(this[_0x19e032('0x1f')]<=0x0)return;const _0x361656=this[_0x19e032('0x1f')],_0x510f9=this[_0x19e032('0x199')],_0x51967b=this[_0x19e032('0x141')];if(Imported['VisuMZ_0_CoreEngine']){if(_0x19e032('0x6e9')==='BjGjT'){function _0x3f636d(){const _0x168314=_0x19e032,_0x2a9c53=_0x54e277[_0x168314('0x88d')]['Settings']['ActionSequence'],_0x294c92=_0x2a9c53[_0x168314('0x215')],_0x6ea02e=_0x2a9c53[_0x168314('0x58d')],_0x3f6eae=_0x2a9c53[_0x168314('0x487')];this[_0x168314('0x7e9')](_0x294c92,_0x6ea02e,_0x3f6eae);}}else this['_floatHeight']=this[_0x19e032('0x3fc')](this[_0x19e032('0x443')],this[_0x19e032('0x3b8')],_0x361656,_0x510f9,_0x51967b);}else this[_0x19e032('0x443')]=(this[_0x19e032('0x443')]*(_0x361656-0x1)+this['_targetFloatHeight'])/_0x361656;this[_0x19e032('0x1f')]--;if(this[_0x19e032('0x1f')]<=0x0)this[_0x19e032('0x83')]();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x83')]=function(){const _0x46de5c=_0x5f4923;this[_0x46de5c('0x443')]=this[_0x46de5c('0x3b8')];},Sprite_Battler[_0x5f4923('0x14f')]['isFloating']=function(){const _0x29dd92=_0x5f4923;return this[_0x29dd92('0x1f')]>0x0;},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2e7')]=function(_0x1b2a6f,_0x12e0f5){const _0x4d4a06=_0x5f4923;if(!this['canMove']())return;if(_0x12e0f5<=0x0)return;this[_0x4d4a06('0x5ca')]=_0x1b2a6f,this[_0x4d4a06('0x17a')]=_0x12e0f5,this[_0x4d4a06('0x67c')]=_0x12e0f5;},Sprite_Battler[_0x5f4923('0x14f')]['updateJump']=function(){const _0xde1c90=_0x5f4923;if(this[_0xde1c90('0x17a')]<=0x0)return;const _0x2c6f9f=this[_0xde1c90('0x67c')]-this['_jumpDuration'],_0x2bc055=this[_0xde1c90('0x67c')]/0x2,_0x7c4b56=this[_0xde1c90('0x5ca')],_0x185ee2=-_0x7c4b56/Math[_0xde1c90('0x3f8')](_0x2bc055,0x2);this[_0xde1c90('0x6f9')]=_0x185ee2*Math['pow'](_0x2c6f9f-_0x2bc055,0x2)+_0x7c4b56,this[_0xde1c90('0x17a')]--;if(this[_0xde1c90('0x17a')]<=0x0)return this[_0xde1c90('0x4d0')]();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x4d0')]=function(){this['_jumpHeight']=0x0;},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2e0')]=function(){const _0x235483=_0x5f4923;return this[_0x235483('0x17a')]>0x0;},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2b2')]=function(_0xb30086,_0x21ae3a,_0x4adbaa){const _0x5d5aa5=_0x5f4923;if(this['_targetOpacity']===_0xb30086)return;this['_targetOpacity']=_0xb30086,this[_0x5d5aa5('0x385')]=_0x21ae3a,this[_0x5d5aa5('0x307')]=_0x21ae3a,this[_0x5d5aa5('0x513')]=_0x4adbaa||'Linear';if(_0x21ae3a<=0x0)this[_0x5d5aa5('0x326')]=_0xb30086;},Sprite_Battler['prototype']['updateOpacity']=function(){const _0x5d38f6=_0x5f4923;if(this['_opacityDuration']<=0x0)return;const _0x49dbc7=this['_opacityDuration'],_0x509ac9=this[_0x5d38f6('0x307')],_0x4a773a=this[_0x5d38f6('0x513')];Imported[_0x5d38f6('0x4f6')]?this[_0x5d38f6('0x326')]=this[_0x5d38f6('0x3fc')](this[_0x5d38f6('0x326')],this['_targetOpacity'],_0x49dbc7,_0x509ac9,_0x4a773a):this[_0x5d38f6('0x326')]=(this[_0x5d38f6('0x326')]*(_0x49dbc7-0x1)+this[_0x5d38f6('0x346')])/_0x49dbc7;this[_0x5d38f6('0x385')]--;if(this['_opacityDuration']<=0x0)this[_0x5d38f6('0xd1')]();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0xd1')]=function(){const _0x486b71=_0x5f4923;this[_0x486b71('0x326')]=this[_0x486b71('0x346')];},Sprite_Battler[_0x5f4923('0x14f')]['isChangingOpacity']=function(){return this['_opacityDuration']>0x0;},Sprite_Battler['prototype'][_0x5f4923('0x564')]=function(){const _0x5eac8d=_0x5f4923;this[_0x5eac8d('0x389')]['visible']=this[_0x5eac8d('0x756')][_0x5eac8d('0x64d')](),this[_0x5eac8d('0x454')]();},Sprite_Battler['prototype'][_0x5f4923('0x454')]=function(){const _0x242390=_0x5f4923;if(!this['_shadowSprite'])return;this[_0x242390('0x389')]['y']=Math[_0x242390('0x774')](-this[_0x242390('0x652')]()-0x2);},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2db')]=function(){const _0x9e5ab2=_0x5f4923;if(this[_0x9e5ab2('0x814')]===Sprite_SvEnemy)return;this['updateGrow'](),this[_0x9e5ab2('0x845')]();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x845')]=function(){const _0x5d677e=_0x5f4923,_0x2ff5fa=this['_distortionSprite'];_0x2ff5fa&&(_0x2ff5fa['scale']['x']=this[_0x5d677e('0x7ff')](),_0x2ff5fa[_0x5d677e('0x59e')]['y']=this[_0x5d677e('0x6d6')]());},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x7ff')]=function(){const _0x5069cc=_0x5f4923;let _0x1f9f72=0x1;return _0x1f9f72*=this[_0x5069cc('0x470')],_0x1f9f72*=this[_0x5069cc('0x1bb')],_0x1f9f72;},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x6d6')]=function(){const _0x3fdfa4=_0x5f4923;return 0x1*this[_0x3fdfa4('0x167')];},Sprite_Battler['prototype'][_0x5f4923('0x290')]=function(){const _0x2a21f5=_0x5f4923;return this[_0x2a21f5('0x77b')]*this[_0x2a21f5('0x7ff')]();},Sprite_Battler['prototype'][_0x5f4923('0x831')]=function(){const _0x274237=_0x5f4923;return this[_0x274237('0x303')]*this[_0x274237('0x6d6')]();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x5a2')]=function(_0x2893d,_0x134b41,_0x386dd2,_0x21b9ff){const _0x24fea4=_0x5f4923;if(!this[_0x24fea4('0x1ea')]())return;if(!this['_distortionSprite'])return;if(this[_0x24fea4('0x604')]===_0x2893d&&this[_0x24fea4('0x7f5')]===_0x134b41)return;this[_0x24fea4('0x604')]=_0x2893d,this[_0x24fea4('0x7f5')]=_0x134b41,this[_0x24fea4('0x9b')]=_0x386dd2,this['_growWholeDuration']=_0x386dd2,this[_0x24fea4('0x27f')]=_0x21b9ff||_0x24fea4('0x662'),_0x386dd2<=0x0&&(this[_0x24fea4('0x1bb')]=this['_targetGrowX'],this[_0x24fea4('0x167')]=this[_0x24fea4('0x7f5')]);},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x125')]=function(){const _0x209611=_0x5f4923;if(this[_0x209611('0x9b')]<=0x0)return;if(!this[_0x209611('0x23c')])return;const _0x271578=this[_0x209611('0x9b')],_0x21bf90=this[_0x209611('0x7f')],_0x245902=this[_0x209611('0x27f')];if(Imported[_0x209611('0x4f6')]){if(_0x209611('0x6f')!=='wVoki')this[_0x209611('0x1bb')]=this[_0x209611('0x3fc')](this['_growX'],this[_0x209611('0x604')],_0x271578,_0x21bf90,_0x245902),this[_0x209611('0x167')]=this[_0x209611('0x3fc')](this[_0x209611('0x167')],this[_0x209611('0x7f5')],_0x271578,_0x21bf90,_0x245902);else{function _0xd79d1c(){const _0x4b6a6e=_0x209611;_0x2c4bdd[_0x4b6a6e('0x132')](_0x329995);}}}else this[_0x209611('0x1bb')]=(this['_growX']*(_0x271578-0x1)+this[_0x209611('0x604')])/_0x271578,this[_0x209611('0x167')]=(this['_growY']*(_0x271578-0x1)+this['_targetGrowY'])/_0x271578;this['_growDuration']--;if(this[_0x209611('0x9b')]<=0x0)this[_0x209611('0x3a3')]();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x3a3')]=function(){const _0x5ed5cf=_0x5f4923;this[_0x5ed5cf('0x1bb')]=this[_0x5ed5cf('0x604')],this[_0x5ed5cf('0x167')]=this['_targetGrowY'];},Sprite_Battler['prototype'][_0x5f4923('0x4cc')]=function(){return this['_growDuration']>0x0;},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x56b')]=function(_0x2699c4,_0x30b839,_0x22ec01,_0x4c5d6f){const _0x322246=_0x5f4923;if(!this['canMove']())return;if(!this[_0x322246('0x23c')])return;if(this['_targetSkewX']===_0x2699c4&&this[_0x322246('0x5f6')]===_0x30b839)return;this[_0x322246('0x44')]=_0x2699c4,this['_targetSkewY']=_0x30b839,this['_skewDuration']=_0x22ec01,this['_skewWholeDuration']=_0x22ec01,this[_0x322246('0x6a6')]=_0x4c5d6f||_0x322246('0x662');if(_0x22ec01<=0x0){if(_0x322246('0x451')!==_0x322246('0x451')){function _0x5a069e(){const _0x5ff38f=_0x322246,_0x241f15=this[_0x5ff38f('0x555')]()['scope'];return _0x241f15[_0x5ff38f('0x5ae')](/(?:RAND|RANDOM)/i);}}else this[_0x322246('0x23c')][_0x322246('0x58c')]['x']=this[_0x322246('0x44')],this[_0x322246('0x23c')][_0x322246('0x58c')]['y']=this[_0x322246('0x5f6')];}},Sprite_Battler[_0x5f4923('0x14f')]['updateSkew']=function(){const _0x26776f=_0x5f4923;if(this[_0x26776f('0x834')]<=0x0)return;if(!this['_distortionSprite'])return;const _0x39bedf=this['_skewDuration'],_0x26ef46=this['_skewWholeDuration'],_0x4906af=this['_skewEasing'],_0x12790a=this[_0x26776f('0x23c')];Imported['VisuMZ_0_CoreEngine']?(_0x12790a['skew']['x']=this[_0x26776f('0x3fc')](_0x12790a[_0x26776f('0x58c')]['x'],this[_0x26776f('0x44')],_0x39bedf,_0x26ef46,_0x4906af),_0x12790a['skew']['y']=this[_0x26776f('0x3fc')](_0x12790a[_0x26776f('0x58c')]['y'],this[_0x26776f('0x5f6')],_0x39bedf,_0x26ef46,_0x4906af)):(_0x12790a[_0x26776f('0x58c')]['x']=(_0x12790a[_0x26776f('0x58c')]['x']*(_0x39bedf-0x1)+this[_0x26776f('0x44')])/_0x39bedf,_0x12790a[_0x26776f('0x58c')]['y']=(_0x12790a[_0x26776f('0x58c')]['y']*(_0x39bedf-0x1)+this[_0x26776f('0x5f6')])/_0x39bedf);this[_0x26776f('0x834')]--;if(this['_skewDuration']<=0x0)this['onSkewEnd']();},Sprite_Battler['prototype'][_0x5f4923('0x696')]=function(){const _0x17314a=_0x5f4923;this[_0x17314a('0x23c')][_0x17314a('0x58c')]['x']=this[_0x17314a('0x44')],this[_0x17314a('0x23c')][_0x17314a('0x58c')]['y']=this[_0x17314a('0x5f6')];},Sprite_Battler['prototype'][_0x5f4923('0x550')]=function(){const _0x209272=_0x5f4923;return this[_0x209272('0x834')]>0x0;},Sprite_Battler[_0x5f4923('0x14f')]['startSpin']=function(_0x1644bb,_0x12a535,_0x4fd9ff,_0x54bb3c){const _0x22ed3a=_0x5f4923;if(!this[_0x22ed3a('0x1ea')]())return;if(!this[_0x22ed3a('0x23c')])return;if(this[_0x22ed3a('0x38f')]===_0x1644bb)return;this['_targetAngle']=_0x1644bb,this[_0x22ed3a('0x464')]=_0x12a535,this[_0x22ed3a('0xd6')]=_0x12a535,this[_0x22ed3a('0x36f')]=_0x4fd9ff||_0x22ed3a('0x662'),this['_angleRevertOnFinish']=_0x54bb3c;if(this[_0x22ed3a('0x87d')]===undefined){if('lRZgr'!==_0x22ed3a('0x537')){function _0x5dcea5(){const _0x4ca587=_0x22ed3a;if(this[_0x4ca587('0x23d')]())_0x30775b[_0x4ca587('0x88d')][_0x4ca587('0x887')]['call'](this);}}else this[_0x22ed3a('0x87d')]=!![];}_0x12a535<=0x0&&(this[_0x22ed3a('0x78f')]=_0x1644bb,this['_angleRevertOnFinish']&&(this[_0x22ed3a('0x38f')]=0x0,this['_currentAngle']=0x0));},Sprite_Battler[_0x5f4923('0x14f')]['updateSpin']=function(){const _0x4fbbc0=_0x5f4923;this[_0x4fbbc0('0x3a4')](),this['applyAngleChange']();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x3a4')]=function(){const _0x9b6b3c=_0x5f4923;if(this[_0x9b6b3c('0x464')]<=0x0)return;const _0x1924d2=this[_0x9b6b3c('0x464')],_0x1bd1c8=this[_0x9b6b3c('0xd6')],_0x59be76=this[_0x9b6b3c('0x36f')];Imported['VisuMZ_0_CoreEngine']?this[_0x9b6b3c('0x78f')]=this['applyEasing'](this[_0x9b6b3c('0x78f')],this[_0x9b6b3c('0x38f')],_0x1924d2,_0x1bd1c8,_0x59be76):this[_0x9b6b3c('0x78f')]=(this['_currentAngle']*(_0x1924d2-0x1)+this[_0x9b6b3c('0x38f')])/_0x1924d2;this['_angleDuration']--;if(this[_0x9b6b3c('0x464')]<=0x0)this[_0x9b6b3c('0xd')]();},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0xd')]=function(){const _0x4320c7=_0x5f4923;this[_0x4320c7('0x78f')]=this[_0x4320c7('0x38f')];if(this[_0x4320c7('0x87d')]){if(_0x4320c7('0x15f')===_0x4320c7('0x196')){function _0x1bd103(){const _0x358640=_0x4320c7;_0x4d33e0[_0x358640('0x2fc')](_0x30ef40['trueRandomTarget']());}}else this[_0x4320c7('0x38f')]=0x0,this[_0x4320c7('0x78f')]=0x0;}},Sprite_Battler[_0x5f4923('0x14f')]['isSpinning']=function(){return this['_angleDuration']>0x0;},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x313')]=function(){const _0x3c3443=_0x5f4923;if(!this[_0x3c3443('0x23c')])return;const _0x3209de=this[_0x3c3443('0x78f')],_0xcd3c1b=this[_0x3c3443('0x59e')]['x'],_0x1284f2=this['_battler'][_0x3c3443('0x1c3')]()?-0x1:0x1;this['_distortionSprite'][_0x3c3443('0xfb')]=_0x3209de*_0xcd3c1b*_0x1284f2;const _0x28604c=this['_distortionSprite'][_0x3c3443('0x59e')]['y'];this[_0x3c3443('0x23c')]['y']=this[_0x3c3443('0x303')]*-0.5*(0x2-_0x28604c);const _0x2ed03e=[this[_0x3c3443('0x38')],this[_0x3c3443('0xe7')],this[_0x3c3443('0x777')]];for(const _0x530beb of _0x2ed03e){if(_0x3c3443('0x7fb')===_0x3c3443('0x7fb')){if(!_0x530beb)continue;_0x530beb['y']=this['height']*0.5;}else{function _0x320525(){const _0x24fac0=_0x3c3443,_0x4b5b95=this[_0x24fac0('0x803')]();if(_0x3a9cc3&&['xp',_0x24fac0('0x283')][_0x24fac0('0x147')](_0x4b5b95))this['resizeWindowXPStyle'](_0x31d063);else _0x45d34d&&[_0x24fac0('0x204')][_0x24fac0('0x147')](_0x4b5b95)&&(this[_0x24fac0('0x7f1')](_0xe1abd0),this[_0x24fac0('0x2c2')]());_0x41e42b['BattleCore'][_0x24fac0('0x6ff')][_0x24fac0('0x618')](this,_0x18decb),_0x254e92&&_0x553245[_0x24fac0('0x361')]()[_0x24fac0('0x568')]>0x0&&_0x35dfc7['battler']()[_0x24fac0('0x4e2')]();}}}this['_shadowSprite']&&(this['_shadowSprite']['scale']['x']=this[_0x3c3443('0x23c')][_0x3c3443('0x59e')]['x'],this['_shadowSprite']['scale']['y']=this[_0x3c3443('0x23c')][_0x3c3443('0x59e')]['y']);},VisuMZ[_0x5f4923('0x88d')]['Sprite_Actor_createStateSprite']=Sprite_Actor['prototype'][_0x5f4923('0x4c7')],Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x4c7')]=function(){const _0x4acbaf=_0x5f4923;VisuMZ['BattleCore'][_0x4acbaf('0x727')][_0x4acbaf('0x618')](this);if(VisuMZ[_0x4acbaf('0x88d')][_0x4acbaf('0x39b')][_0x4acbaf('0x409')][_0x4acbaf('0x23')]){if(_0x4acbaf('0xf0')===_0x4acbaf('0xf0'))this[_0x4acbaf('0x2bc')]();else{function _0x2d439c(){_0x5785ba=_0x540968>=_0x3302b4?_0x47bfd8:_0x308b06;}}}},VisuMZ['BattleCore']['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy['prototype'][_0x5f4923('0x26c')],Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x26c')]=function(){const _0x4d6c16=_0x5f4923;VisuMZ[_0x4d6c16('0x88d')][_0x4d6c16('0x39b')][_0x4d6c16('0x409')][_0x4d6c16('0x821')]&&this[_0x4d6c16('0x2bc')](),VisuMZ[_0x4d6c16('0x88d')][_0x4d6c16('0x3c1')][_0x4d6c16('0x618')](this);},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x2bc')]=function(){const _0x1c06a4=_0x5f4923;if(!ConfigManager[_0x1c06a4('0xb8')])return;if(this[_0x1c06a4('0x814')]===Sprite_SvEnemy)return;const _0x517835=VisuMZ['BattleCore'][_0x1c06a4('0x39b')][_0x1c06a4('0x409')],_0x5f37ec=new Sprite_HpGauge();_0x5f37ec[_0x1c06a4('0x105')]['x']=_0x517835[_0x1c06a4('0x1fa')],_0x5f37ec[_0x1c06a4('0x105')]['y']=_0x517835['AnchorY'],_0x5f37ec[_0x1c06a4('0x59e')]['x']=_0x5f37ec[_0x1c06a4('0x59e')]['y']=_0x517835['Scale'],this['_hpGaugeSprite']=_0x5f37ec,this['addChild'](this[_0x1c06a4('0x427')]);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x2b')]=Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x5bb')],Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x5bb')]=function(_0x45b2ba){const _0xc46070=_0x5f4923;VisuMZ[_0xc46070('0x88d')][_0xc46070('0x2b')][_0xc46070('0x618')](this,_0x45b2ba),this[_0xc46070('0x22e')](_0x45b2ba);},Sprite_Battler['prototype'][_0x5f4923('0x22e')]=function(_0x40a010){const _0x47e027=_0x5f4923;if(!_0x40a010)return;if(!this[_0x47e027('0x427')])return;if(_0x40a010[_0x47e027('0x1c3')]()){}else{if(_0x40a010[_0x47e027('0x323')]()){if(this['constructor']===Sprite_SvEnemy&&!_0x40a010[_0x47e027('0x64d')]())return;}}this[_0x47e027('0x427')]['setup'](_0x40a010,'hp');},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x7ed')]=function(){const _0x37a179=_0x5f4923;if(!this[_0x37a179('0x756')])return;if(!this['_hpGaugeSprite'])return;const _0x477f19=VisuMZ[_0x37a179('0x88d')]['Settings'][_0x37a179('0x409')],_0x46c44a=this[_0x37a179('0x427')];_0x46c44a[_0x37a179('0x3fd')]=this[_0x37a179('0x4be')]();const _0x472590=_0x477f19['OffsetX'],_0x3d96e0=_0x477f19[_0x37a179('0x33e')];_0x46c44a['x']=_0x472590,_0x46c44a['x']+=this[_0x37a179('0x756')][_0x37a179('0x74f')](),_0x46c44a['y']=-this['height']+_0x3d96e0,_0x46c44a['y']+=this['_battler'][_0x37a179('0x54b')]();},Sprite_Battler[_0x5f4923('0x14f')]['isVisualHpGaugeDisplayed']=function(){const _0x2b39ac=_0x5f4923;if(!this[_0x2b39ac('0x756')])return![];if(this[_0x2b39ac('0x756')][_0x2b39ac('0x1c3')]())return!![];const _0x1af087=this[_0x2b39ac('0x756')]['enemy']()['note'];if(_0x1af087[_0x2b39ac('0x5ae')](/<SHOW HP GAUGE>/i))return!![];if(_0x1af087[_0x2b39ac('0x5ae')](/<HIDE HP GAUGE>/i))return![];const _0x45b0db=VisuMZ[_0x2b39ac('0x88d')][_0x2b39ac('0x39b')][_0x2b39ac('0x409')];if(_0x45b0db[_0x2b39ac('0x610')]){if(_0x45b0db[_0x2b39ac('0x37b')]&&BattleManager['isBattleTest']())return!![];if(this['_battler'][_0x2b39ac('0x5bd')])return![];return this[_0x2b39ac('0x756')][_0x2b39ac('0x880')]();}return!![];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x388')]=Sprite_Battler[_0x5f4923('0x14f')]['isMoving'],Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x14a')]=function(){const _0x1a0b63=_0x5f4923;if(!this[_0x1a0b63('0x756')])return![];return VisuMZ['BattleCore'][_0x1a0b63('0x388')][_0x1a0b63('0x618')](this);},VisuMZ[_0x5f4923('0x88d')]['Sprite_Battler_startMove']=Sprite_Battler[_0x5f4923('0x14f')]['startMove'],Sprite_Battler[_0x5f4923('0x14f')]['startMove']=function(_0x1e5df9,_0x588526,_0x3cc97b){const _0xfcea67=_0x5f4923;this['canMove']()&&VisuMZ['BattleCore'][_0xfcea67('0x526')][_0xfcea67('0x618')](this,_0x1e5df9,_0x588526,_0x3cc97b);},Sprite_Battler[_0x5f4923('0x14f')]['canMove']=function(){const _0x257970=_0x5f4923;if(this[_0x257970('0x756')]&&this[_0x257970('0x756')][_0x257970('0x110')]())return![];if(this['_battler']&&!this['_battler'][_0x257970('0x71')]())return![];return $gameSystem[_0x257970('0x773')]();},Sprite_Battler['prototype']['stepForward']=function(){},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x5ef')]=function(){const _0xbed0aa=_0x5f4923;this[_0xbed0aa('0x7e9')](0x0,0x0,0xc);},Sprite_Battler[_0x5f4923('0x14f')][_0x5f4923('0x87b')]=function(){},Sprite_Battler['prototype'][_0x5f4923('0x68d')]=function(){const _0x599098=_0x5f4923,_0x217857=VisuMZ['BattleCore'][_0x599098('0x39b')][_0x599098('0x5dc')],_0x396410=this[_0x599098('0x756')]&&this[_0x599098('0x756')][_0x599098('0x1c3')]()?0x1:-0x1,_0x20cf87=this['_baseX']-this[_0x599098('0x10a')]+_0x396410*_0x217857['FlinchDistanceX'],_0x3fcded=this['_baseY']-this['_homeY']+_0x396410*_0x217857[_0x599098('0x50c')],_0x10d700=_0x217857['FlinchDuration'];this[_0x599098('0x7e9')](_0x20cf87,_0x3fcded,_0x10d700);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x828')]=Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x7b8')],Sprite_Actor[_0x5f4923('0x14f')]['initMembers']=function(){const _0x2b4c11=_0x5f4923;VisuMZ[_0x2b4c11('0x88d')][_0x2b4c11('0x828')]['call'](this),this[_0x2b4c11('0x15e')]();},Sprite_Actor[_0x5f4923('0x14f')]['mainSprite']=function(){const _0x56e94a=_0x5f4923;return this['_distortionSprite']||this[_0x56e94a('0x38')]||this;},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x49f')]=Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x83f')],Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x83f')]=function(){},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x615')]=function(_0x2c59a1){const _0xca2878=_0x5f4923;if(SceneManager[_0xca2878('0x5e7')]())return;if(!_0x2c59a1)return;if(!_0x2c59a1[_0xca2878('0x1ea')]())return;VisuMZ['BattleCore']['Sprite_Actor_moveToStartPosition'][_0xca2878('0x618')](this);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x5fd')]=Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x4f1')],Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x4f1')]=function(_0x429329){const _0x585d10=_0x5f4923;if(VisuMZ[_0x585d10('0x88d')][_0x585d10('0x39b')][_0x585d10('0x5dc')][_0x585d10('0x80')]){if(_0x585d10('0x39d')===_0x585d10('0x39d'))VisuMZ['BattleCore'][_0x585d10('0x39b')][_0x585d10('0x5dc')][_0x585d10('0x80')][_0x585d10('0x618')](this,_0x429329);else{function _0x5a2d88(){const _0x1354fb=_0x585d10;if(this[_0x1354fb('0x1f')]<=0x0)return;const _0x1b62d7=this[_0x1354fb('0x1f')],_0x3e3aff=this['_floatWholeDuration'],_0x5eae8d=this[_0x1354fb('0x141')];_0xb3d5c4[_0x1354fb('0x4f6')]?this[_0x1354fb('0x443')]=this[_0x1354fb('0x3fc')](this[_0x1354fb('0x443')],this['_targetFloatHeight'],_0x1b62d7,_0x3e3aff,_0x5eae8d):this[_0x1354fb('0x443')]=(this['_floatHeight']*(_0x1b62d7-0x1)+this['_targetFloatHeight'])/_0x1b62d7;this[_0x1354fb('0x1f')]--;if(this[_0x1354fb('0x1f')]<=0x0)this[_0x1354fb('0x83')]();}}}else VisuMZ['BattleCore']['Sprite_Actor_setActorHome'][_0x585d10('0x618')](this,_0x429329);},VisuMZ[_0x5f4923('0x88d')]['Sprite_Actor_setBattler']=Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x5bb')],Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x5bb')]=function(_0x1efe10){const _0x142e24=_0x5f4923;VisuMZ[_0x142e24('0x88d')]['Sprite_Actor_setBattler'][_0x142e24('0x618')](this,_0x1efe10),this[_0x142e24('0x83d')](_0x1efe10);},Sprite_Actor[_0x5f4923('0x14f')]['setBattlerBattleCore']=function(_0xdafa43){const _0x4811c2=_0x5f4923;if(!_0xdafa43)return;if(!this[_0x4811c2('0x38')])return;this[_0x4811c2('0x38')][_0x4811c2('0x105')]['x']=this[_0x4811c2('0x3ad')][_0x4811c2('0x36a')](),this['_mainSprite'][_0x4811c2('0x105')]['y']=this['_actor']['svBattlerAnchorY'](),this[_0x4811c2('0x2cb')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x25e')]=Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x7aa')],Sprite_Actor['prototype'][_0x5f4923('0x7aa')]=function(){const _0x420da0=_0x5f4923;VisuMZ[_0x420da0('0x88d')][_0x420da0('0x25e')][_0x420da0('0x618')](this);if(this[_0x420da0('0x3ad')]){if(_0x420da0('0x11c')===_0x420da0('0x61')){function _0x2b2170(){const _0x33ff6d=_0x420da0,_0x1ccfe1=_0x31d14b[_0x33ff6d('0x201')]();this[_0x33ff6d('0x394')]()['attackStates']()[_0x33ff6d('0x147')](_0x8af915[_0x33ff6d('0x74')]())&&_0x3a7f26['setImmortal'](![]),_0x40f577['BattleCore'][_0x33ff6d('0x166')][_0x33ff6d('0x618')](this,_0x16712e,_0x411283),_0x4f0f69[_0x33ff6d('0x225')](_0x1ccfe1);}}else this[_0x420da0('0x101')](),this[_0x420da0('0x449')]();}},VisuMZ[_0x5f4923('0x88d')]['Sprite_Actor_updateBitmap']=Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x82d')],Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x82d')]=function(){const _0x34985c=_0x5f4923;VisuMZ[_0x34985c('0x88d')]['Sprite_Actor_updateBitmap'][_0x34985c('0x618')](this);if(this[_0x34985c('0x38')]&&this[_0x34985c('0x38')][_0x34985c('0x596')]&&this[_0x34985c('0x756')]){if('vRrwE'===_0x34985c('0x43d')){function _0x19167c(){const _0x3c9117=_0x34985c;_0x564778=_0x3c9117('0x4a9');}}else this[_0x34985c('0x38')]['bitmap']['smooth']!==this['_battler'][_0x34985c('0x518')]()&&(this['_mainSprite'][_0x34985c('0x596')][_0x34985c('0x28a')]=this[_0x34985c('0x756')]['battlerSmoothImage']());}},VisuMZ['BattleCore'][_0x5f4923('0x194')]=Sprite_Actor[_0x5f4923('0x14f')]['updateShadow'],Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x564')]=function(){const _0x55ed58=_0x5f4923;VisuMZ[_0x55ed58('0x88d')][_0x55ed58('0x194')][_0x55ed58('0x618')](this),this['updateShadowBattleCore']();},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x177')]=function(){const _0x1b8681=_0x5f4923;if(!this[_0x1b8681('0x38')])return;if(!this[_0x1b8681('0x389')])return;this[_0x1b8681('0x2cb')](),this[_0x1b8681('0x454')]();},Sprite_Actor['prototype'][_0x5f4923('0x101')]=function(){const _0x506aec=_0x5f4923;this[_0x506aec('0x181')][_0x506aec('0x59e')]['x']=0x1/(this[_0x506aec('0x59e')]['x']||0.001),this['_stateSprite'][_0x506aec('0x59e')]['y']=0x1/(this['scale']['y']||0.001);},Sprite_Actor['prototype']['updateStyleOpacity']=function(){const _0x363c4d=_0x5f4923;if(!$gameSystem[_0x363c4d('0x773')]()&&this[_0x363c4d('0x814')]===Sprite_Actor){if('uPRQy'==='qFXdK'){function _0x360c72(){const _0x23a025=_0x363c4d,_0xd2cffa=_0x524540[_0x23a025('0x17f')]();this[_0x23a025('0x2fc')](_0x23a025('0x127'),[_0x229488],_0xfbaa03,_0x5e0df1),this['push'](_0x23a025('0x838'),_0x1d923f,_0xd2cffa[_0x23a025('0x10a')],_0xd2cffa['_homeY'],_0x706ec6,![],_0x23a025('0x662')),this[_0x23a025('0x2fc')](_0x23a025('0x18'),[_0x66d1f2],_0x23a025('0x21a')),this[_0x23a025('0x2fc')]('waitForMovement'),this['push'](_0x23a025('0x18'),[_0x2b55cf],_0x23a025('0x7cb'));}}else{const _0x1ff2c5=Scene_Battle[_0x363c4d('0x14f')][_0x363c4d('0x803')]();[_0x363c4d('0x863'),_0x363c4d('0x855'),_0x363c4d('0x283'),_0x363c4d('0x204')][_0x363c4d('0x147')](_0x1ff2c5)&&(this[_0x363c4d('0x326')]=0x0);}}},Sprite_Actor['prototype']['refreshMotion']=function(){const _0x3b6c05=_0x5f4923,_0x4c6aa8=this[_0x3b6c05('0x3ad')];if(_0x4c6aa8){const _0x4fa7df=_0x4c6aa8[_0x3b6c05('0xa6')]();if(_0x4c6aa8[_0x3b6c05('0x2ce')]()||_0x4c6aa8[_0x3b6c05('0x7c8')]()){if(_0x3b6c05('0x1f7')!==_0x3b6c05('0x2a7'))this['startMotion'](_0x3b6c05('0x7cb'));else{function _0x4749c5(){const _0x5cf381=_0x3b6c05;_0x1227c0[_0x5cf381('0x88d')][_0x5cf381('0x88b')][_0x5cf381('0x618')](this),this[_0x5cf381('0x555')]()['note'][_0x5cf381('0x5ae')](/<CUSTOM ACTION SEQUENCE>/i)&&(_0x26b02a['_commonEventQueue']=[]);}}}else{if(_0x4fa7df===0x3){if(_0x3b6c05('0x7a0')!==_0x3b6c05('0x7a0')){function _0x40dbde(){const _0x13113e=_0x3b6c05;_0x4bdb1d[_0x13113e('0x88d')]['Window_BattleLog_popBaseLine'][_0x13113e('0x618')](this),this[_0x13113e('0x621')](),this[_0x13113e('0x67')]();}}else this[_0x3b6c05('0x407')](_0x3b6c05('0x3d'));}else{if(_0x4fa7df===0x2)this[_0x3b6c05('0x407')](_0x3b6c05('0x4d4'));else{if(this[_0x3b6c05('0xfc')])this['startMotion'](_0x3b6c05('0x1e3'));else{if(_0x4c6aa8[_0x3b6c05('0x4ca')]())this[_0x3b6c05('0x407')](_0x3b6c05('0x12d'));else{if(_0x4c6aa8[_0x3b6c05('0x4d3')]())this[_0x3b6c05('0x407')](_0x3b6c05('0x72f'));else{if(_0x4c6aa8['isGuard']()||_0x4c6aa8[_0x3b6c05('0x5cc')]())this[_0x3b6c05('0x407')](_0x3b6c05('0x626'));else{if(_0x4fa7df===0x1){if('xvAjH'==='eAJfm'){function _0xf25641(){const _0x9251cc=_0x3b6c05;if(this[_0x9251cc('0x1b8')]<0xff)this[_0x9251cc('0x1b8')]+=0x10;}}else this[_0x3b6c05('0x407')](_0x3b6c05('0xb7'));}else{if(_0x4c6aa8[_0x3b6c05('0x453')]()){if(_0x3b6c05('0x417')==='KvpxO'){function _0x11cdeb(){const _0x573f26=_0x3b6c05;if(!_0x43dad3[_0x573f26('0x64e')]())return;const _0x3b978d=_0x39ca07[_0x573f26('0x70a')];_0x3b978d[_0x573f26('0x328')]();}}else this[_0x3b6c05('0x407')](_0x3b6c05('0xa3'));}else{if(_0x4c6aa8['isUndecided']())this[_0x3b6c05('0x407')](_0x3b6c05('0x7cb'));else{if(_0x4c6aa8[_0x3b6c05('0x677')]())this[_0x3b6c05('0x407')]('wait');else{if('dDuOZ'!==_0x3b6c05('0x58')){function _0x4944b4(){this['updateForceAction']();}}else this[_0x3b6c05('0x407')](_0x3b6c05('0x7cb'));}}}}}}}}}}}}},Sprite_Actor[_0x5f4923('0x14f')]['retreat']=function(){const _0x5e162d=_0x5f4923,_0x36dbb5=0xa,_0x587da=0x12c*_0x36dbb5,_0x57777b=0x1e*_0x36dbb5;this[_0x5e162d('0x7e9')](_0x587da,0x0,_0x57777b);},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x4e5')]=function(){const _0x4a6a32=_0x5f4923;Sprite_Battler[_0x4a6a32('0x14f')][_0x4a6a32('0x4e5')][_0x4a6a32('0x618')](this);},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0xf3')]=function(){const _0x39470c=_0x5f4923;return Sprite_Battler[_0x39470c('0x81c')];},Sprite_Weapon[_0x5f4923('0x14f')][_0x5f4923('0x807')]=function(){const _0x4cce13=_0x5f4923;return Sprite_Battler[_0x4cce13('0x81c')];},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x713')]=function(){},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x6d0')]=function(){},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x590')]=function(){const _0x3876fe=_0x5f4923;if(this[_0x3876fe('0x12b')]&&++this['_motionCount']>=this[_0x3876fe('0xf3')]()){if(this[_0x3876fe('0x12b')][_0x3876fe('0x1a6')])this['_pattern']=(this[_0x3876fe('0x5eb')]+0x1)%0x4;else{if(this[_0x3876fe('0x5eb')]<0x2){if(_0x3876fe('0x2f1')!=='digSU'){function _0x18c786(){const _0x203964=_0x3876fe;this[_0x203964('0xe7')]['_stateSprite'][_0x203964('0x59e')]['x']=-0x1/(this[_0x203964('0x59e')]['x']||0.001),this[_0x203964('0xe7')][_0x203964('0x181')][_0x203964('0x59e')]['y']=0x1/(this[_0x203964('0x59e')]['y']||0.001);}}else this['_pattern']++;}else{if('ROxVH'===_0x3876fe('0x3ab')){function _0x120eca(){const _0x51822f=_0x3876fe;this['_borderPortraitSprite'][_0x51822f('0x596')]=_0x470fc9[_0x51822f('0x5c9')];return;}}else this[_0x3876fe('0x30c')]();}}this['_motionCount']=0x0;}},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x22d')]=function(_0x14772e){const _0x4e91fb=_0x5f4923;if(_0x14772e===_0x4e91fb('0x2cc'))this[_0x4e91fb('0x84')]=!![];if(this[_0x4e91fb('0x756')]&&this[_0x4e91fb('0x756')]['isDead']()){this[_0x4e91fb('0x12b')]=Sprite_Actor[_0x4e91fb('0x6c')][_0x4e91fb('0x3d')];return;}const _0x2d37f4=Sprite_Actor[_0x4e91fb('0x6c')][_0x14772e];this[_0x4e91fb('0x12b')]=_0x2d37f4,this[_0x4e91fb('0x2c9')]=0x0,this[_0x4e91fb('0x5eb')]=0x0;},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x858')]=function(_0x23b817){const _0x2e9472=_0x5f4923;this[_0x2e9472('0x23b')](),this[_0x2e9472('0x2da')][_0x2e9472('0x672')](_0x23b817),this[_0x2e9472('0x3ad')][_0x2e9472('0x9c')]();},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x23b')]=function(){const _0x490290=_0x5f4923;let _0x11ad01=-0x10,_0x16e377=this[_0x490290('0x303')]*0.5;const _0x4f9e64=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x8839ae=this[_0x490290('0x756')]['traitObjects']()['map'](_0x15a0b0=>_0x15a0b0&&_0x15a0b0[_0x490290('0x331')][_0x490290('0x5ae')](_0x4f9e64)?Number(RegExp['$1']):0x0),_0x2ad098=this[_0x490290('0x756')][_0x490290('0x5a3')]()[_0x490290('0x17b')](_0x33243c=>_0x33243c&&_0x33243c['note'][_0x490290('0x5ae')](_0x4f9e64)?Number(RegExp['$2']):0x0);_0x11ad01=_0x8839ae[_0x490290('0x55a')]((_0x48288d,_0x395b17)=>_0x48288d+_0x395b17,_0x11ad01),_0x16e377=_0x2ad098[_0x490290('0x55a')]((_0x596f8d,_0x399705)=>_0x596f8d+_0x399705,_0x16e377),this[_0x490290('0x2da')]['x']=_0x11ad01,this['_weaponSprite']['y']=_0x16e377,this[_0x490290('0x2da')]['update']();},Sprite_Weapon[_0x5f4923('0x14f')]['setup']=function(_0x1fb41e){const _0x43aea9=_0x5f4923;this['_weaponImageId']=_0x1fb41e,this[_0x43aea9('0x226')]=-0x1,this[_0x43aea9('0x5eb')]=0x0,this[_0x43aea9('0x7fa')](),this[_0x43aea9('0x2b0')]();},Sprite_Actor['prototype'][_0x5f4923('0x7c5')]=function(){},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x4e2')]=function(){const _0x8162fb=_0x5f4923,_0x3a6f27=VisuMZ[_0x8162fb('0x88d')][_0x8162fb('0x39b')][_0x8162fb('0x19')],_0x1b1289=_0x3a6f27['StepDistanceX'],_0x43dff6=_0x3a6f27[_0x8162fb('0x58d')],_0x2748d3=_0x3a6f27['StepDuration'];this[_0x8162fb('0x7e9')](-_0x1b1289,-_0x43dff6,_0x2748d3);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x233')]=Sprite_Actor['prototype'][_0x5f4923('0x2b0')],Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x2b0')]=function(){const _0x75b0ab=_0x5f4923;this['applyFreezeMotionFrames'](),VisuMZ[_0x75b0ab('0x88d')]['Sprite_Actor_updateFrame'][_0x75b0ab('0x618')](this);},Sprite_Actor[_0x5f4923('0x14f')][_0x5f4923('0x865')]=function(){const _0x520ba5=_0x5f4923;if(this['_battler']&&this['_battler']['_freezeMotionData']){if(_0x520ba5('0x59d')==='XJLaX'){function _0x10b937(){const _0x23d189=_0x520ba5;return;this[_0x23d189('0x860')]&&(this[_0x23d189('0x860')]['x']=this['x'],this['_effectsContainer']['y']=this['y']),this['_damageContainer']&&(this['_damageContainer']['x']=this['x'],this[_0x23d189('0x1b')]['y']=this['y']);}}else{const _0x17e658=this[_0x520ba5('0x756')][_0x520ba5('0x442')];this[_0x520ba5('0x12b')]=Sprite_Actor[_0x520ba5('0x6c')][_0x17e658['motionType']],this[_0x520ba5('0x5eb')]=_0x17e658['pattern'];const _0x20e146=this[_0x520ba5('0x2da')];_0x20e146[_0x520ba5('0x2ea')](_0x17e658[_0x520ba5('0x472')],_0x17e658[_0x520ba5('0x219')]),this[_0x520ba5('0x23b')]();}}},Sprite_Weapon[_0x5f4923('0x14f')][_0x5f4923('0x2ea')]=function(_0x5e456b,_0x477a3d){const _0x5ecb16=_0x5f4923;this[_0x5ecb16('0x594')]=_0x5e456b,this['_animationCount']=-Infinity,this['_pattern']=_0x477a3d,this[_0x5ecb16('0x7fa')](),this['updateFrame']();},Sprite_Enemy['prototype'][_0x5f4923('0x7b8')]=function(){const _0x32dd18=_0x5f4923;Sprite_Battler[_0x32dd18('0x14f')][_0x32dd18('0x7b8')]['call'](this),this[_0x32dd18('0x7e')]=null,this['_appeared']=![],this[_0x32dd18('0x79a')]='',this[_0x32dd18('0x5b7')]=0x0,this[_0x32dd18('0x47d')]=null,this[_0x32dd18('0x49a')]=0x0,this['_shake']=0x0,this[_0x32dd18('0x75b')](),this[_0x32dd18('0x26c')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x2b5')]=Sprite_Enemy['prototype'][_0x5f4923('0x7aa')],Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x7aa')]=function(){const _0x7f55e5=_0x5f4923;VisuMZ[_0x7f55e5('0x88d')]['Sprite_Enemy_update'][_0x7f55e5('0x618')](this),this[_0x7f55e5('0x2cb')]();},Sprite_Enemy[_0x5f4923('0x14f')]['createMainSprite']=function(){const _0x278cf5=_0x5f4923;this['_mainSprite']=new Sprite(),this[_0x278cf5('0x38')][_0x278cf5('0x105')]['x']=0.5,this[_0x278cf5('0x38')][_0x278cf5('0x105')]['y']=0x1,this[_0x278cf5('0x3e8')](this['_mainSprite']),this['attachSpritesToDistortionSprite']();},Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x56a')]=function(){const _0x3d440e=_0x5f4923;return this[_0x3d440e('0x23c')]||this[_0x3d440e('0x38')]||this;},Sprite_Enemy[_0x5f4923('0x14f')]['loadBitmap']=function(_0x394150){const _0x58a3d1=_0x5f4923;this[_0x58a3d1('0x596')]=new Bitmap(0x1,0x1);if($gameSystem[_0x58a3d1('0x773')]())this[_0x58a3d1('0x38')]['bitmap']=ImageManager[_0x58a3d1('0x65e')](_0x394150);else{if('YfWCa'!==_0x58a3d1('0x4e4')){function _0x4f868c(){const _0x816c42=_0x58a3d1;_0x2772cb[_0x816c42('0x88d')][_0x816c42('0x3f6')]['call'](this,_0x209fc6,_0x5a542b),this[_0x816c42('0x67')]();}}else this[_0x58a3d1('0x38')][_0x58a3d1('0x596')]=ImageManager[_0x58a3d1('0x84b')](_0x394150);}this[_0x58a3d1('0x38')][_0x58a3d1('0x596')][_0x58a3d1('0x267')](this[_0x58a3d1('0x488')][_0x58a3d1('0x48f')](this));},Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x488')]=function(){const _0x4c15b8=_0x5f4923,_0x3a79a8=this['_mainSprite'][_0x4c15b8('0x596')];_0x3a79a8&&(this[_0x4c15b8('0x596')]=new Bitmap(_0x3a79a8[_0x4c15b8('0x77b')],_0x3a79a8[_0x4c15b8('0x303')]));},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x22')]=Sprite_Enemy['prototype'][_0x5f4923('0x708')],Sprite_Enemy[_0x5f4923('0x14f')]['setHue']=function(_0x2ee3c0){const _0x559ab5=_0x5f4923;if(this[_0x559ab5('0x38')]){if(_0x559ab5('0x1e1')!==_0x559ab5('0x1e1')){function _0x5393d5(){const _0x37bb5c=_0x559ab5;return this[_0x37bb5c('0x6a9')]()?this[_0x37bb5c('0x677')]()&&this[_0x37bb5c('0x677')]()['item']()&&!this[_0x37bb5c('0x677')]()[_0x37bb5c('0x434')]():this[_0x37bb5c('0x677')]()&&this[_0x37bb5c('0x677')]()[_0x37bb5c('0x555')]()&&!this[_0x37bb5c('0x677')]()[_0x37bb5c('0x18e')]();}}else this[_0x559ab5('0x38')]['setHue'](_0x2ee3c0);}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x7de')]=Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x681')],Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x681')]=function(){const _0x25a79b=_0x5f4923;if(this[_0x25a79b('0x23d')]())VisuMZ[_0x25a79b('0x88d')][_0x25a79b('0x7de')]['call'](this);else{if(_0x25a79b('0x200')===_0x25a79b('0x31a')){function _0x6d2ef2(){const _0x3c2615=_0x25a79b;this[_0x3c2615('0x2fc')]('performReflection',_0x4be385);if(!_0x3bbae4['BattleCore'][_0x3c2615('0x39b')][_0x3c2615('0xb1')][_0x3c2615('0x286')])return;this[_0x3c2615('0x2fc')](_0x3c2615('0x256'),_0x22bd35['magicReflection'][_0x3c2615('0x6e6')](_0x36eee8['name']()));}}else{this['_appeared']=!this['_enemy'][_0x25a79b('0x6fc')]();if(!this[_0x25a79b('0x79f')]){if(_0x25a79b('0x292')!=='RBkun'){function _0x1baad2(){const _0x47c96b=_0x25a79b;this['_distortionSprite'][_0x47c96b('0x3e8')](this[_0x47c96b('0xe7')]);}}else this[_0x25a79b('0x326')]=0x0;}}}},VisuMZ['BattleCore']['Sprite_Enemy_updateCollapse']=Sprite_Enemy[_0x5f4923('0x14f')]['updateCollapse'],Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x318')]=function(){const _0x3a4321=_0x5f4923;if(this[_0x3a4321('0x23d')]())VisuMZ['BattleCore'][_0x3a4321('0x6ae')][_0x3a4321('0x618')](this);},Sprite_Enemy[_0x5f4923('0x14f')]['updateFrame']=function(){const _0x54fce1=_0x5f4923;Sprite_Battler['prototype']['updateFrame'][_0x54fce1('0x618')](this);const _0x53de02=this[_0x54fce1('0x56a')]()||this;if(!_0x53de02)return;!_0x53de02[_0x54fce1('0x596')]&&(_0x53de02['bitmap']=new Bitmap(this[_0x54fce1('0x77b')],this[_0x54fce1('0x303')])),this[_0x54fce1('0x47d')]===_0x54fce1('0x68b')?this[_0x54fce1('0x38')][_0x54fce1('0x2f')](0x0,0x0,this[_0x54fce1('0x38')][_0x54fce1('0x77b')],this[_0x54fce1('0x49a')]):_0x53de02[_0x54fce1('0x2f')](0x0,0x0,_0x53de02[_0x54fce1('0x596')][_0x54fce1('0x77b')],this['bitmap']['height']);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x887')]=Sprite_Enemy[_0x5f4923('0x14f')]['updateBossCollapse'],Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x479')]=function(){const _0x458fd1=_0x5f4923;if(this[_0x458fd1('0x23d')]())VisuMZ[_0x458fd1('0x88d')][_0x458fd1('0x887')][_0x458fd1('0x618')](this);},Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x14a')]=function(){const _0xc0d07f=_0x5f4923;return Sprite_Battler['prototype']['isMoving'][_0xc0d07f('0x618')](this);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x36d')]=Sprite_Enemy['prototype'][_0x5f4923('0x101')],Sprite_Enemy[_0x5f4923('0x14f')]['updateStateSprite']=function(){const _0x13762d=_0x5f4923;VisuMZ['BattleCore'][_0x13762d('0x36d')][_0x13762d('0x618')](this),this[_0x13762d('0x29c')]();},Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x29c')]=function(){const _0x48f491=_0x5f4923;this['_stateIconSprite']['x']=0x0,this[_0x48f491('0x5d0')]['x']+=this[_0x48f491('0x756')][_0x48f491('0x74f')](),this['_stateIconSprite']['y']=-this['bitmap'][_0x48f491('0x303')]-this[_0x48f491('0x5d0')][_0x48f491('0x303')],this[_0x48f491('0x5d0')]['y']+=this[_0x48f491('0x756')][_0x48f491('0x54b')](),this['_stateIconSprite'][_0x48f491('0x59e')]['x']=0x1/(this['scale']['x']||0.001),this['_stateIconSprite'][_0x48f491('0x59e')]['y']=0x1/(this[_0x48f491('0x59e')]['y']||0.001);if(this[_0x48f491('0x64d')]()){if('ivjoO'===_0x48f491('0x234'))this[_0x48f491('0xe7')][_0x48f491('0x181')]['scale']['x']=-0x1/(this['scale']['x']||0.001),this[_0x48f491('0xe7')][_0x48f491('0x181')][_0x48f491('0x59e')]['y']=0x1/(this[_0x48f491('0x59e')]['y']||0.001);else{function _0x4cc854(){const _0x223b48=_0x48f491;return this[_0x223b48('0x394')]()[_0x223b48('0x870')]();}}}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x7d0')]=Sprite_Enemy[_0x5f4923('0x14f')]['setBattler'],Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x5bb')]=function(_0x5ebf28){const _0x192370=_0x5f4923;VisuMZ[_0x192370('0x88d')]['Sprite_Enemy_setBattler']['call'](this,_0x5ebf28),this[_0x192370('0x269')](_0x5ebf28);},Sprite_Enemy['prototype']['setSvBattlerSprite']=function(_0x1f82da){const _0x494ee8=_0x5f4923;!this[_0x494ee8('0xe7')]&&(this[_0x494ee8('0xe7')]=new Sprite_SvEnemy(_0x1f82da),this['attachSpritesToDistortionSprite']()),this[_0x494ee8('0xe7')]['setBattler'](_0x1f82da);},Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x64d')]=function(){const _0x3e94d9=_0x5f4923;return this[_0x3e94d9('0x7e')]&&this[_0x3e94d9('0x7e')]['hasSvBattler']();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x77d')]=Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x7fa')],Sprite_Enemy['prototype'][_0x5f4923('0x7fa')]=function(_0x39e350){const _0x27e943=_0x5f4923;if(this[_0x27e943('0x64d')]()){if(_0x27e943('0x1a0')==='AKuRI'){function _0x2dc806(){const _0x482678=_0x27e943;if(!_0xd05eed[_0x482678('0x64e')]())return;if(!_0x3f06ad['VisuMZ_3_ActSeqCamera'])return;const _0x4d9623=_0x47f155[_0x482678('0x7fd')]();if(!_0x4d9623)return;_0x4d9623['setWaitMode'](_0x482678('0x135'));}}else{const _0x34da44=this[_0x27e943('0x7e')][_0x27e943('0x6ac')]();this[_0x27e943('0x596')]=new Bitmap(_0x34da44['width'],_0x34da44[_0x27e943('0x303')]);}}else{if('rBIOR'===_0x27e943('0x208'))VisuMZ[_0x27e943('0x88d')][_0x27e943('0x77d')][_0x27e943('0x618')](this,_0x39e350);else{function _0x55e7ec(){const _0x2a64cc=_0x27e943,_0xce95b8=_0x48b93f[_0x2a64cc('0x206')](_0x25064f);_0xce95b8['missed']=![],_0xce95b8[_0x2a64cc('0x3c')]=![],_0xce95b8[_0x2a64cc('0x2c6')]=0x0,this[_0x2a64cc('0x4b8')]['push'](_0xce95b8);}}}},Sprite_Enemy[_0x5f4923('0x14f')]['allowCollapse']=function(){const _0xc7a004=_0x5f4923;return this[_0xc7a004('0x64d')]()?this[_0xc7a004('0x7e')][_0xc7a004('0x23d')]():!![];},Sprite_Enemy['prototype'][_0x5f4923('0x30c')]=function(){const _0x54cde3=_0x5f4923;if(this[_0x54cde3('0x64d')]())this[_0x54cde3('0xe7')][_0x54cde3('0x30c')]();},Sprite_Enemy['prototype'][_0x5f4923('0x22d')]=function(_0x235ac6){const _0x40d053=_0x5f4923;if(this[_0x40d053('0x64d')]())this[_0x40d053('0xe7')][_0x40d053('0x22d')](_0x235ac6);},Sprite_Enemy[_0x5f4923('0x14f')][_0x5f4923('0x858')]=function(_0x5e2608){const _0x433910=_0x5f4923;if(this[_0x433910('0x64d')]())this['_svBattlerSprite'][_0x433910('0x858')](_0x5e2608);},Sprite_Enemy['prototype'][_0x5f4923('0x4e2')]=function(){const _0x2c2e9c=_0x5f4923,_0x2c33bc=VisuMZ[_0x2c2e9c('0x88d')]['Settings'][_0x2c2e9c('0x19')],_0x566f6c=_0x2c33bc['StepDistanceX'],_0x2a2d38=_0x2c33bc[_0x2c2e9c('0x58d')],_0xf2810b=_0x2c33bc[_0x2c2e9c('0x487')];this[_0x2c2e9c('0x7e9')](_0x566f6c,_0x2a2d38,_0xf2810b);};function Sprite_SvEnemy(){const _0x16905f=_0x5f4923;this[_0x16905f('0x566')](...arguments);}Sprite_SvEnemy['prototype']=Object[_0x5f4923('0x771')](Sprite_Actor[_0x5f4923('0x14f')]),Sprite_SvEnemy['prototype']['constructor']=Sprite_SvEnemy,Sprite_SvEnemy[_0x5f4923('0x14f')]['initialize']=function(_0x36700d){const _0x121c59=_0x5f4923;Sprite_Actor['prototype'][_0x121c59('0x566')]['call'](this,_0x36700d),this[_0x121c59('0x59e')]['x']=-0x1,this[_0x121c59('0x181')][_0x121c59('0x59e')]['x']=-0x1;},Sprite_SvEnemy[_0x5f4923('0x14f')][_0x5f4923('0x6e0')]=function(){},Sprite_SvEnemy[_0x5f4923('0x14f')][_0x5f4923('0x83f')]=function(){},Sprite_SvEnemy[_0x5f4923('0x14f')][_0x5f4923('0x4f1')]=function(_0x357119){},Sprite_SvEnemy['prototype'][_0x5f4923('0x564')]=function(){},Sprite_SvEnemy[_0x5f4923('0x14f')][_0x5f4923('0x454')]=function(){},Sprite_SvEnemy[_0x5f4923('0x14f')][_0x5f4923('0x101')]=function(){const _0x463a30=_0x5f4923;this[_0x463a30('0x181')]['visible']=![];},Sprite_SvEnemy[_0x5f4923('0x14f')][_0x5f4923('0x82d')]=function(){const _0x5dc8bc=_0x5f4923;Sprite_Battler[_0x5dc8bc('0x14f')][_0x5dc8bc('0x82d')][_0x5dc8bc('0x618')](this);const _0x306a96=this[_0x5dc8bc('0x3ad')]['svBattlerName']();this[_0x5dc8bc('0x79a')]!==_0x306a96&&(this[_0x5dc8bc('0x79a')]=_0x306a96,this[_0x5dc8bc('0x38')][_0x5dc8bc('0x596')]=ImageManager[_0x5dc8bc('0x244')](_0x306a96));if(this[_0x5dc8bc('0x38')]&&this[_0x5dc8bc('0x38')][_0x5dc8bc('0x596')]&&this[_0x5dc8bc('0x756')]){if(_0x5dc8bc('0x3fb')===_0x5dc8bc('0x1')){function _0x4bf183(){const _0x4d401d=_0x5dc8bc;_0x310fa3['BattleCore'][_0x4d401d('0x25e')][_0x4d401d('0x618')](this),this[_0x4d401d('0x3ad')]&&(this[_0x4d401d('0x101')](),this['updateStyleOpacity']());}}else this['_mainSprite']['bitmap'][_0x5dc8bc('0x28a')]!==this['_battler'][_0x5dc8bc('0x518')]()&&(this['_mainSprite'][_0x5dc8bc('0x596')][_0x5dc8bc('0x28a')]=this[_0x5dc8bc('0x756')][_0x5dc8bc('0x518')]());}},Sprite_SvEnemy[_0x5f4923('0x14f')][_0x5f4923('0x87b')]=function(){},Sprite_SvEnemy[_0x5f4923('0x14f')]['startMove']=function(_0x5e3b84,_0x48b622,_0x1794fa){const _0x37c230=_0x5f4923;if(this['parent'])this[_0x37c230('0x96')][_0x37c230('0x7e9')](_0x5e3b84,_0x48b622,_0x1794fa);},Sprite_SvEnemy['prototype'][_0x5f4923('0x30c')]=function(){const _0x4da358=_0x5f4923,_0x2d368a=this['_actor'];if(_0x2d368a){const _0x5b7312=_0x2d368a[_0x4da358('0xa6')]();if(_0x2d368a[_0x4da358('0x2ce')]()||_0x2d368a[_0x4da358('0x7c8')]())this[_0x4da358('0x407')](_0x4da358('0x7cb'));else{if(_0x5b7312===0x3){if('dpWgI'!==_0x4da358('0x86e'))this[_0x4da358('0x407')](_0x4da358('0x3d'));else{function _0xa684e5(){return;}}}else{if(_0x5b7312===0x2)this[_0x4da358('0x407')](_0x4da358('0x4d4'));else{if(_0x2d368a[_0x4da358('0x4d3')]())this[_0x4da358('0x407')]('chant');else{if(_0x2d368a[_0x4da358('0x61f')]()||_0x2d368a[_0x4da358('0x5cc')]())this[_0x4da358('0x407')](_0x4da358('0x626'));else{if(_0x5b7312===0x1)this[_0x4da358('0x407')](_0x4da358('0xb7'));else{if(_0x2d368a['isDying']())this['startMotion']('dying');else _0x2d368a['isUndecided']()?this[_0x4da358('0x407')](_0x4da358('0x7cb')):this[_0x4da358('0x407')](_0x2d368a['svBattlerData']()[_0x4da358('0x19d')]||_0x4da358('0x7cb'));}}}}}}}},Sprite_SvEnemy['prototype'][_0x5f4923('0x3eb')]=function(){const _0x5dd67f=_0x5f4923;if(this[_0x5dd67f('0x96')]){if(_0x5dd67f('0x19a')===_0x5dd67f('0x6ef')){function _0x11874f(){const _0x506e97=_0x5dd67f,_0xb46e46=_0x3b7bc9[_0x506e97('0x774')](_0x2d2b76[_0x506e97('0x49b')]/0x3),_0x10594a=_0x16168d['round'](_0x5d072c[_0x506e97('0x49b')]/_0x50cf5b[_0x506e97('0x284')]()[_0x506e97('0x568')]),_0x3637f3=_0x3059ee[_0x506e97('0x6b4')](_0xb46e46,_0x10594a),_0xdc671f=this[_0x506e97('0x728')](_0x471281[_0x506e97('0x88d')]['Settings'][_0x506e97('0x88f')][_0x506e97('0x5a5')]),_0x4c919e=_0x10594a*_0x3d6a1b[_0x506e97('0x7fe')]()+(_0x10594a-_0x3637f3)/0x2,_0x244f5d=_0x3da1d7['_scene'][_0x506e97('0x1ac')]['y']-_0xdc671f;this['move'](_0x4c919e,_0x244f5d,_0x3637f3,_0xdc671f),this['createContents'](),this['setBackgroundType'](0x1);}}else return this[_0x5dd67f('0x96')][_0x5dd67f('0x51c')]===0x0&&this['parent'][_0x5dd67f('0x40e')]===0x0;}else return!![];},Sprite_SvEnemy[_0x5f4923('0x14f')][_0x5f4923('0x698')]=function(){},Sprite_Damage['prototype'][_0x5f4923('0x5af')]=function(_0x4256ef){const _0x53f6c8=_0x5f4923,_0x17c864=_0x4256ef[_0x53f6c8('0x126')]()||_0x4256ef[_0x53f6c8('0x560')]();if(_0x17c864[_0x53f6c8('0x714')]||_0x17c864[_0x53f6c8('0x3c')]){if('NKZJc'!==_0x53f6c8('0x87f'))this['_colorType']=0x0,this['createMiss']();else{function _0x5716bc(){const _0x31f926=_0x53f6c8;this[_0x31f926('0x506')][_0x31f926('0x3e8')](new _0x4699b5());}}}else{if(_0x17c864[_0x53f6c8('0x635')])this[_0x53f6c8('0x843')]=_0x17c864[_0x53f6c8('0x561')]>=0x0?0x0:0x1,this['createDigits'](_0x17c864[_0x53f6c8('0x561')]);else _0x4256ef['isAlive']()&&_0x17c864['mpDamage']!==0x0&&(this[_0x53f6c8('0x843')]=_0x17c864[_0x53f6c8('0x2c6')]>=0x0?0x2:0x3,this[_0x53f6c8('0xcc')](_0x17c864[_0x53f6c8('0x2c6')]));}_0x17c864[_0x53f6c8('0x176')]&&this['setupCriticalEffect']();},Sprite_Damage[_0x5f4923('0x14f')][_0x5f4923('0x672')]=function(_0x102a31){},Sprite_Damage[_0x5f4923('0x14f')][_0x5f4923('0xcc')]=function(_0x1fc751){const _0x389170=_0x5f4923;let _0x42f1b6=this['createString'](_0x1fc751);const _0x521809=this['fontSize'](),_0x82df62=Math['floor'](_0x521809*0.75);for(let _0x5e2d85=0x0;_0x5e2d85<_0x42f1b6[_0x389170('0x568')];_0x5e2d85++){const _0xb197fe=this['createChildSprite'](_0x82df62,_0x521809);_0xb197fe[_0x389170('0x596')][_0x389170('0xcd')](_0x42f1b6[_0x5e2d85],0x0,0x0,_0x82df62,_0x521809,_0x389170('0x4a9')),_0xb197fe['x']=(_0x5e2d85-(_0x42f1b6[_0x389170('0x568')]-0x1)/0x2)*_0x82df62,_0xb197fe['dy']=-_0x5e2d85;}},Sprite_Damage[_0x5f4923('0x14f')][_0x5f4923('0x5b8')]=function(_0xe8f496){const _0x1d0d63=_0x5f4923;let _0x412e67=Math[_0x1d0d63('0x47e')](_0xe8f496)[_0x1d0d63('0x4ae')]();this[_0x1d0d63('0x655')]()&&(_0x412e67=VisuMZ[_0x1d0d63('0xa2')](_0x412e67));const _0x285872=VisuMZ[_0x1d0d63('0x88d')][_0x1d0d63('0x39b')][_0x1d0d63('0x15d')];let _0x964424='',_0x397f7d='';switch(this[_0x1d0d63('0x843')]){case 0x0:_0x964424=_0x285872['hpDamageFmt']||_0x1d0d63('0x532'),_0x397f7d=TextManager['hp'];if(_0xe8f496===0x0)_0x964424='%1';break;case 0x1:_0x964424=_0x285872[_0x1d0d63('0x439')]||_0x1d0d63('0x70d'),_0x397f7d=TextManager['hp'];break;case 0x2:_0x964424=_0x285872[_0x1d0d63('0x3e4')]||_0x1d0d63('0x1ce'),_0x397f7d=TextManager['mp'];break;case 0x3:_0x964424=_0x285872[_0x1d0d63('0x720')]||'+%1\x20MP',_0x397f7d=TextManager['mp'];break;}return _0x964424[_0x1d0d63('0x6e6')](_0x412e67,_0x397f7d)[_0x1d0d63('0x32d')]();},Sprite_Damage[_0x5f4923('0x14f')]['useDigitGrouping']=function(){const _0x29aeb5=_0x5f4923;if(Imported[_0x29aeb5('0x4f6')])return VisuMZ[_0x29aeb5('0x37c')][_0x29aeb5('0x39b')][_0x29aeb5('0x21d')][_0x29aeb5('0x4a0')];else{if(_0x29aeb5('0x682')!==_0x29aeb5('0x682')){function _0x23fd83(){_0x4c12c7=(_0x259216+_0x2bd38f)/0x2;}}else return![];}},Sprite_Damage[_0x5f4923('0x14f')][_0x5f4923('0x876')]=function(){const _0x52092d=_0x5f4923,_0x1c3434=VisuMZ['BattleCore'][_0x52092d('0x39b')]['Damage'];this[_0x52092d('0x3c2')]=_0x1c3434[_0x52092d('0x6c5')][_0x52092d('0x805')](0x0),this[_0x52092d('0x54d')]=_0x1c3434[_0x52092d('0x33f')];},Sprite_Damage[_0x5f4923('0x14f')]['setupTextPopup']=function(_0x34811d,_0x10178c){const _0x49ccb2=_0x5f4923;this[_0x49ccb2('0x3c2')]=_0x10178c[_0x49ccb2('0x850')]||[0x0,0x0,0x0,0x0],this[_0x49ccb2('0x3c2')]=JsonEx['makeDeepCopy'](this[_0x49ccb2('0x3c2')]),this['_flashDuration']=_0x10178c['flashDuration']||0x0;const _0x4e8f87=this[_0x49ccb2('0x591')](),_0x474864=Math[_0x49ccb2('0x3ed')](_0x4e8f87*0x1e),_0x4d7071=this[_0x49ccb2('0x528')](_0x474864,_0x4e8f87);_0x4d7071[_0x49ccb2('0x596')]['textColor']=ColorManager['getColor'](_0x10178c['textColor']),_0x4d7071[_0x49ccb2('0x596')][_0x49ccb2('0xcd')](_0x34811d,0x0,0x0,_0x474864,_0x4e8f87,_0x49ccb2('0x4a9')),_0x4d7071['dy']=0x0;},Sprite_Damage['prototype'][_0x5f4923('0x575')]=function(_0x317044,_0x13a731,_0x2d0386){const _0x292ea6=_0x5f4923,_0x1afe9e=Math[_0x292ea6('0x489')](this[_0x292ea6('0x591')](),ImageManager[_0x292ea6('0x2f8')]),_0x246932=Math[_0x292ea6('0x3ed')](_0x1afe9e*0x1e),_0x55945d=this[_0x292ea6('0x528')](_0x246932,_0x1afe9e),_0xd35aa7=ImageManager['iconWidth']/0x2,_0x1ef3b0=_0x55945d[_0x292ea6('0x596')][_0x292ea6('0x41c')](_0x13a731+'\x20');_0x55945d[_0x292ea6('0x596')][_0x292ea6('0x1e8')]=ColorManager[_0x292ea6('0x76')](_0x2d0386[_0x292ea6('0x1e8')]),_0x55945d['bitmap']['drawText'](_0x13a731,_0xd35aa7,0x0,_0x246932-_0xd35aa7,_0x1afe9e,'center');const _0x585569=Math[_0x292ea6('0x774')]((_0x1afe9e-ImageManager[_0x292ea6('0x2f8')])/0x2),_0x16b162=_0x246932/0x2-ImageManager[_0x292ea6('0x31c')]-_0x1ef3b0/0x2+_0xd35aa7/0x2,_0x16b432=ImageManager[_0x292ea6('0x630')](_0x292ea6('0x4e3')),_0x49552d=ImageManager[_0x292ea6('0x31c')],_0x54ba4b=ImageManager[_0x292ea6('0x2f8')],_0x218155=_0x317044%0x10*_0x49552d,_0x24b5bd=Math[_0x292ea6('0x3ed')](_0x317044/0x10)*_0x54ba4b;_0x55945d['bitmap'][_0x292ea6('0x343')](_0x16b432,_0x218155,_0x24b5bd,_0x49552d,_0x54ba4b,_0x16b162,_0x585569),this['_flashColor']=_0x2d0386[_0x292ea6('0x850')]||[0x0,0x0,0x0,0x0],this['_flashColor']=JsonEx[_0x292ea6('0x206')](this[_0x292ea6('0x3c2')]),this[_0x292ea6('0x54d')]=_0x2d0386['flashDuration']||0x0,_0x55945d['dy']=0x0;},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x6fb')]=Sprite_StateIcon[_0x5f4923('0x14f')]['updateFrame'],Sprite_StateIcon[_0x5f4923('0x14f')][_0x5f4923('0x2b0')]=function(){const _0x29b799=_0x5f4923;VisuMZ[_0x29b799('0x88d')][_0x29b799('0x6fb')][_0x29b799('0x618')](this),this[_0x29b799('0x3fd')]=this[_0x29b799('0x40')]>0x0?!![]:![];},VisuMZ['BattleCore'][_0x5f4923('0x7a5')]=Sprite_Weapon[_0x5f4923('0x14f')][_0x5f4923('0x7fa')],Sprite_Weapon[_0x5f4923('0x14f')]['loadBitmap']=function(){const _0x5a9620=_0x5f4923;VisuMZ[_0x5a9620('0x88d')][_0x5a9620('0x7a5')]['call'](this);if(this[_0x5a9620('0x596')]){if('bsavo'===_0x5a9620('0x143')){function _0x370a30(){return[_0x44f96d];}}else this[_0x5a9620('0x596')][_0x5a9620('0x28a')]=VisuMZ[_0x5a9620('0x88d')][_0x5a9620('0x39b')][_0x5a9620('0x5dc')][_0x5a9620('0x612')];}};function Sprite_HpGauge(){this['initialize'](...arguments);}Sprite_HpGauge[_0x5f4923('0x14f')]=Object['create'](Sprite_Gauge[_0x5f4923('0x14f')]),Sprite_HpGauge['prototype'][_0x5f4923('0x814')]=Sprite_HpGauge,Sprite_HpGauge[_0x5f4923('0x14f')]['initialize']=function(){const _0x46bdf0=_0x5f4923;Sprite_Gauge['prototype']['initialize'][_0x46bdf0('0x618')](this);},Sprite_HpGauge[_0x5f4923('0x14f')][_0x5f4923('0x311')]=function(){return 0x0;},Sprite_HpGauge[_0x5f4923('0x14f')][_0x5f4923('0x78c')]=function(){const _0x5f2b89=_0x5f4923;this['bitmap'][_0x5f2b89('0x328')]();const _0x3f4599=this[_0x5f2b89('0x422')]();!isNaN(_0x3f4599)&&this['drawGauge']();},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x179')]=function(){if(!$gameSystem['isSideView']())return![];return![];},Spriteset_Battle[_0x5f4923('0x14f')]['animationBaseDelay']=function(){return 0x0;},Spriteset_Battle['prototype'][_0x5f4923('0x804')]=function(){return 0x0;},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x4b3')]=Spriteset_Battle['prototype']['createLowerLayer'],Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x5b1')]=function(){const _0x1a6570=_0x5f4923;VisuMZ[_0x1a6570('0x88d')]['Spriteset_Battle_createLowerLayer']['call'](this),this['createWeather']();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x17c')]=Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x7aa')],Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x7aa')]=function(){const _0x5d85a7=_0x5f4923;VisuMZ['BattleCore']['Spriteset_Battle_update'][_0x5d85a7('0x618')](this),this[_0x5d85a7('0x4ea')]();},Spriteset_Battle[_0x5f4923('0x14f')]['createWeather']=function(){const _0x337218=_0x5f4923;this[_0x337218('0x5d9')]=new Weather(),this[_0x337218('0x648')][_0x337218('0x3e8')](this['_weather']);},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x4ea')]=function(){const _0x5e8cd3=_0x5f4923;this[_0x5e8cd3('0x5d9')][_0x5e8cd3('0xa1')]=$gameScreen[_0x5e8cd3('0x436')](),this[_0x5e8cd3('0x5d9')][_0x5e8cd3('0x19c')]=$gameScreen[_0x5e8cd3('0x5b')]();},Game_Interpreter[_0x5f4923('0x14f')]['command236']=function(_0x14a684){const _0x4549b9=_0x5f4923;$gameScreen[_0x4549b9('0x18c')](_0x14a684[0x0],_0x14a684[0x1],_0x14a684[0x2]);if(_0x14a684[0x3])this['wait'](_0x14a684[0x2]);return!![];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x238')]=Game_Interpreter[_0x5f4923('0x14f')][_0x5f4923('0x59a')],Game_Interpreter[_0x5f4923('0x14f')]['command283']=function(_0x686c0e){const _0x4ed03a=_0x5f4923;if(SceneManager[_0x4ed03a('0x64e')]()){if(_0x4ed03a('0x46b')!==_0x4ed03a('0x46b')){function _0x1db356(){const _0x35d6db=_0x4ed03a;if(this[_0x35d6db('0x346')]===_0x36b7fe)return;this['_targetOpacity']=_0x5e720c,this[_0x35d6db('0x385')]=_0xcd323,this[_0x35d6db('0x307')]=_0xfeecec,this['_opacityEasing']=_0x58485d||_0x35d6db('0x662');if(_0x273577<=0x0)this[_0x35d6db('0x326')]=_0x45a021;}}else return SceneManager[_0x4ed03a('0x60a')]['_spriteset'][_0x4ed03a('0x1c4')](_0x686c0e[0x0],_0x686c0e[0x1]),!![];}else{if(_0x4ed03a('0x5e4')!==_0x4ed03a('0x5e4')){function _0x2336fb(){const _0x4c6c73=_0x4ed03a;if(_0x5c3926[_0x4c6c73('0x829')])return![];return _0x4100a7[_0x4c6c73('0x88d')][_0x4c6c73('0x39b')][_0x4c6c73('0x510')][_0x4c6c73('0x51b')];}}else return VisuMZ[_0x4ed03a('0x88d')]['Game_Interpreter_command283']['call'](this,_0x686c0e);}},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x20')]=function(_0x394e8c,_0x589b57){const _0x444b22=_0x5f4923;_0x394e8c[_0x444b22('0x596')]=_0x589b57;},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x1c4')]=function(_0xa20724,_0x9eaf1f){const _0x383677=_0x5f4923;_0xa20724=_0xa20724||'',_0x9eaf1f=_0x9eaf1f||'';if(_0xa20724===''&&_0x9eaf1f===''){if(_0x383677('0x29b')===_0x383677('0x29b'))_0xa20724=this[_0x383677('0x481')][_0x383677('0x54a')](),_0x9eaf1f=this[_0x383677('0x282')][_0x383677('0x3cb')]();else{function _0x1459dc(){const _0x161c01=_0x383677;_0x1ee0b2=_0x462c7c[_0x161c01('0x3bd')](/\x1I\[(\d+)\]/gi,''),_0x45a03d=_0x384565[_0x161c01('0x3bd')](/\\I\[(\d+)\]/gi,'');}}}const _0x11e39c=ImageManager['loadBattleback1'](_0xa20724),_0x400734=ImageManager[_0x383677('0xd5')](_0x9eaf1f);_0x11e39c['addLoadListener'](this[_0x383677('0x25d')][_0x383677('0x48f')](this,this[_0x383677('0x481')],this[_0x383677('0x282')],_0x11e39c,_0x400734));},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x25d')]=function(_0x18bdec,_0x45fd85,_0x5cfbb5,_0x155ffc){const _0x1fe063=_0x5f4923;_0x155ffc[_0x1fe063('0x267')](this['updateBattlebackBitmap2'][_0x1fe063('0x48f')](this,_0x18bdec,_0x45fd85,_0x5cfbb5,_0x155ffc));},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x2fb')]=function(_0x45100d,_0x1ff42f,_0x565969,_0x1ae55e){const _0x23d603=_0x5f4923;_0x45100d[_0x23d603('0x596')]=_0x565969,_0x1ff42f[_0x23d603('0x596')]=_0x1ae55e,_0x45100d[_0x23d603('0x7ca')](),_0x1ff42f[_0x23d603('0x7ca')]();},VisuMZ[_0x5f4923('0x88d')]['Spriteset_Battle_createBattleField']=Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x6dd')],Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x6dd')]=function(){const _0xe40d58=_0x5f4923;VisuMZ[_0xe40d58('0x88d')][_0xe40d58('0x822')]['call'](this),this[_0xe40d58('0x847')]();},Spriteset_Battle['prototype'][_0x5f4923('0x847')]=function(){const _0x44262b=_0x5f4923;this[_0x44262b('0x690')](),this[_0x44262b('0x666')](),this['createDamageContainer'](),this[_0x44262b('0x273')]();},Spriteset_Battle['prototype'][_0x5f4923('0x690')]=function(){const _0x526f05=_0x5f4923;this[_0x526f05('0x86c')]=new Sprite(),this[_0x526f05('0x648')][_0x526f05('0x3e8')](this[_0x526f05('0x86c')]);},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x666')]=function(){const _0x3634bc=_0x5f4923;this[_0x3634bc('0x623')]=new Sprite(),this[_0x3634bc('0x648')][_0x3634bc('0x3e8')](this[_0x3634bc('0x623')]);},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x12f')]=function(){const _0x1ab2cc=_0x5f4923;this['_damageContainer']=new Sprite(),this[_0x1ab2cc('0x1b')]['x']=this['_battleField']['x'],this[_0x1ab2cc('0x1b')]['y']=this[_0x1ab2cc('0x648')]['y'],this['addChild'](this[_0x1ab2cc('0x1b')]);},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x273')]=function(){const _0x76435=_0x5f4923;if(!this[_0x76435('0x179')]())return;this['_battlerContainer']['scale']['x']=-0x1,this[_0x76435('0x86c')]['x']=this[_0x76435('0x648')][_0x76435('0x77b')],this[_0x76435('0x623')]['scale']['x']=-0x1,this[_0x76435('0x623')]['x']=this[_0x76435('0x648')][_0x76435('0x77b')],this[_0x76435('0x1b')][_0x76435('0x59e')]['x']=-0x1,this['_damageContainer']['x']=this['_battleField']['x']+this[_0x76435('0x648')]['width'];},Spriteset_Battle['prototype'][_0x5f4923('0x6f5')]=function(){const _0x540ef5=_0x5f4923;if(Imported[_0x540ef5('0x4f6')]&&VisuMZ[_0x540ef5('0x37c')][_0x540ef5('0x39b')]['UI'][_0x540ef5('0x11f')]){if(_0x540ef5('0x25c')===_0x540ef5('0x25c'))this[_0x540ef5('0x13b')]();else{function _0x805785(){const _0x51fa51=_0x540ef5;return _0x15ccd0['BattleCore'][_0x51fa51('0x39b')][_0x51fa51('0x88f')]['SkillItemBorderCols'];}}}const _0x304b83=$gameTroop[_0x540ef5('0x3ce')](),_0x3696d6=[];for(const _0x19038f of _0x304b83){if(_0x540ef5('0x452')===_0x540ef5('0x6a5')){function _0xb4a874(){const _0x49fda9=_0x540ef5,_0xb18a1b=this['commandSymbol'](_0x4c1d88);if(![_0x49fda9('0x597'),'guard',_0x49fda9('0x13')][_0x49fda9('0x147')](_0xb18a1b))return;const _0x4e26ed=this['itemLineRect'](_0x9c1bb7);let _0x48eaa8=null;if(_0xb18a1b===_0x49fda9('0x597'))_0x48eaa8=_0x5a6324[this[_0x49fda9('0x3ad')]['attackSkillId']()];else _0xb18a1b===_0x49fda9('0x626')?_0x48eaa8=_0x19c1a3[this[_0x49fda9('0x3ad')][_0x49fda9('0x3c6')]()]:_0x48eaa8=_0x26198f[this[_0x49fda9('0x3fa')][_0x10bd7e]['ext']];this[_0x49fda9('0xbe')](this[_0x49fda9('0x3ad')],_0x48eaa8,_0x4e26ed['x'],_0x4e26ed['y'],_0x4e26ed[_0x49fda9('0x77b')]);}}else _0x3696d6[_0x540ef5('0x2fc')](new Sprite_Enemy(_0x19038f));}_0x3696d6[_0x540ef5('0x7e4')](this['compareEnemySprite'][_0x540ef5('0x48f')](this));for(const _0x466f5b of _0x3696d6){this[_0x540ef5('0x86c')][_0x540ef5('0x3e8')](_0x466f5b);}this['_enemySprites']=_0x3696d6;},Spriteset_Battle['prototype'][_0x5f4923('0x87')]=function(){const _0x24c820=_0x5f4923;this[_0x24c820('0x6e4')]=[];for(let _0x166179=0x0;_0x166179<$gameParty[_0x24c820('0x680')]();_0x166179++){const _0xbe7ac2=$gameParty[_0x24c820('0x284')]()[_0x166179],_0x1dfba3=new Sprite_Actor();_0x1dfba3[_0x24c820('0x615')](_0xbe7ac2),_0x1dfba3[_0x24c820('0x5bb')](_0xbe7ac2),_0x1dfba3[_0x24c820('0x7aa')](),this[_0x24c820('0x6e4')][_0x24c820('0x2fc')](_0x1dfba3),this[_0x24c820('0x86c')][_0x24c820('0x3e8')](_0x1dfba3);}},Spriteset_Battle[_0x5f4923('0x14f')]['createAnimationSprite']=function(_0x56ecb5,_0x517320,_0xa2d797,_0x51d342){const _0x3593a5=_0x5f4923,_0xb35c52=this[_0x3593a5('0x628')](_0x517320),_0x2a6283=new(_0xb35c52?Sprite_AnimationMV:Sprite_Animation)(),_0xe391c0=this[_0x3593a5('0x601')](_0x56ecb5);this[_0x3593a5('0x732')](_0x56ecb5[0x0])&&(_0xa2d797=!_0xa2d797),_0x2a6283[_0x3593a5('0x368')]=_0x56ecb5,_0x2a6283['setup'](_0xe391c0,_0x517320,_0xa2d797,_0x51d342),this['addAnimationSpriteToContainer'](_0x2a6283);},Spriteset_Battle['prototype'][_0x5f4923('0x4c8')]=function(_0x29c407){const _0x2777c0=_0x5f4923;if(this['isAnimationShownOnBattlePortrait'](_0x29c407)){if(_0x2777c0('0x4cd')!==_0x2777c0('0xd7'))this[_0x2777c0('0x66a')]()[_0x2777c0('0x3e8')](_0x29c407);else{function _0x280160(){const _0x1e984c=_0x2777c0;_0x1ed330=[_0x1e984c('0x6c3'),_0x1e984c('0x10e'),_0x1e984c('0x274')][_0x3ce647[_0x1e984c('0xa1')]]||_0x1e984c('0x10e');}}}else{if(_0x2777c0('0x63a')!==_0x2777c0('0x332'))this[_0x2777c0('0x623')][_0x2777c0('0x3e8')](_0x29c407);else{function _0x408496(){const _0xe48510=_0x2777c0;this[_0xe48510('0x80d')][_0xe48510('0x2fc')](_0x4b24d7);if(this[_0xe48510('0x474')]())_0x6c452e['_scene']['_statusWindow']['addDamageSprite'](_0x544208,this['_battler']);else{this[_0xe48510('0x140')]()['addChild'](_0x7a4727);if(_0x59fc48['isBattleFlipped']())_0x48c384[_0xe48510('0x59e')]['x']=-0x1;}}}}this['_animationSprites'][_0x2777c0('0x2fc')](_0x29c407);},Spriteset_Battle['prototype'][_0x5f4923('0x79e')]=function(_0x208868){const _0x200485=_0x5f4923;if(!_0x208868)return![];if(!_0x208868[_0x200485('0x73')])return![];if(_0x208868[_0x200485('0x73')][_0x200485('0x416')]!==0x0)return![];if(!_0x208868[_0x200485('0x368')][0x0])return![];if(!_0x208868[_0x200485('0x368')][0x0][_0x200485('0x1c3')]())return![];if($gameSystem[_0x200485('0x773')]())return![];if(!this[_0x200485('0x66a')]())return![];return Window_BattleStatus[_0x200485('0x14f')][_0x200485('0x803')]()==='portrait';},Spriteset_Battle['prototype']['battleStatusWindowAnimationContainer']=function(){const _0x3c2079=_0x5f4923;if(!SceneManager['_scene'])return;if(!SceneManager['_scene'][_0x3c2079('0x1ac')])return;if(!SceneManager[_0x3c2079('0x60a')][_0x3c2079('0x1ac')][_0x3c2079('0x860')])return;return SceneManager[_0x3c2079('0x60a')][_0x3c2079('0x1ac')][_0x3c2079('0x860')];},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x49')]=function(_0x315e8d){const _0x30a6fe=_0x5f4923;this[_0x30a6fe('0x801')](_0x315e8d);for(const _0x19fbe7 of _0x315e8d['targetObjects']){if(_0x19fbe7[_0x30a6fe('0x548')]){if(_0x30a6fe('0x246')!==_0x30a6fe('0x685'))_0x19fbe7[_0x30a6fe('0x548')]();else{function _0x27f33b(){const _0x53a416=_0x30a6fe;this['_stateSprite']['scale']['x']=0x1/(this[_0x53a416('0x59e')]['x']||0.001),this[_0x53a416('0x181')]['scale']['y']=0x1/(this[_0x53a416('0x59e')]['y']||0.001);}}}}_0x315e8d['destroy']();},Spriteset_Battle[_0x5f4923('0x14f')]['removeAnimationFromContainer']=function(_0x256a6c){const _0x154bfb=_0x5f4923;this[_0x154bfb('0x3f1')]['remove'](_0x256a6c),this[_0x154bfb('0x79e')](_0x256a6c)?this[_0x154bfb('0x66a')]()[_0x154bfb('0x1b9')](_0x256a6c):this[_0x154bfb('0x623')][_0x154bfb('0x1b9')](_0x256a6c);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x556')]=Spriteset_Battle['prototype']['updateActors'],Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x308')]=function(){const _0x1cceb7=_0x5f4923;VisuMZ[_0x1cceb7('0x88d')][_0x1cceb7('0x556')]['call'](this),this['updateBattlerContainer']();},Spriteset_Battle['prototype'][_0x5f4923('0x4db')]=function(){const _0x1ea5c2=_0x5f4923;this[_0x1ea5c2('0x86c')]['children']['sort'](this[_0x1ea5c2('0x393')]['bind'](this)),this['putActiveBattlerOnTop']();},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x393')]=function(_0x1fbffa,_0x31077f){const _0x251fed=_0x5f4923;if(VisuMZ[_0x251fed('0x88d')][_0x251fed('0x39b')][_0x251fed('0x5dc')]['PrioritySortActors']){if('Riscv'==='Riscv'){if(_0x1fbffa[_0x251fed('0x756')]&&_0x31077f['_battler']){if(_0x251fed('0x82b')===_0x251fed('0x82b')){if(_0x1fbffa[_0x251fed('0x756')][_0x251fed('0x1c3')]()&&_0x31077f[_0x251fed('0x756')]['isEnemy']())return 0x1;else{if(_0x31077f['_battler'][_0x251fed('0x1c3')]()&&_0x1fbffa[_0x251fed('0x756')]['isEnemy']()){if(_0x251fed('0x56f')!==_0x251fed('0x534'))return-0x1;else{function _0xaf1b50(){const _0x4956e8=_0x251fed;if(!this['_actor'][_0x4956e8('0x251')](_0x52ef3e['id']))return![];}}}}}else{function _0x980a69(){const _0x362a42=_0x251fed;this[_0x362a42('0x28')]('opacity');}}}}else{function _0x9c5515(){const _0x514b16=_0x251fed;this['_phase']=_0x514b16('0x717');}}}if(_0x1fbffa[_0x251fed('0x674')]!==_0x31077f[_0x251fed('0x674')])return _0x1fbffa[_0x251fed('0x674')]-_0x31077f[_0x251fed('0x674')];else{if(_0x251fed('0x374')!==_0x251fed('0x374')){function _0x108fa3(){const _0x8432d7=_0x251fed;this[_0x8432d7('0x466')](_0x16c556[_0x8432d7('0x331')]);}}else return _0x31077f['spriteId']-_0x1fbffa[_0x251fed('0x4f0')];}},Spriteset_Battle['prototype'][_0x5f4923('0x63e')]=function(){const _0x4aef15=_0x5f4923;if(!VisuMZ[_0x4aef15('0x88d')][_0x4aef15('0x39b')]['Actor'][_0x4aef15('0x5da')])return;const _0x379d9f=BattleManager['_subject'];if(_0x379d9f){if(_0x379d9f[_0x4aef15('0x1c3')]()&&!$gameSystem[_0x4aef15('0x773')]())return;const _0x54df8e=_0x379d9f['battler']();if(_0x54df8e&&_0x379d9f[_0x4aef15('0x1c3')]())this['_battlerContainer'][_0x4aef15('0x3e8')](_0x54df8e);}},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x5c8')]=function(){const _0x2d3310=_0x5f4923;for(const _0x1964a2 of $gameParty['aliveMembers']()){if(_0x2d3310('0x557')===_0x2d3310('0x557')){if(!_0x1964a2)continue;if(!_0x1964a2[_0x2d3310('0x17f')]())continue;_0x1964a2[_0x2d3310('0x17f')]()[_0x2d3310('0xfc')]=!![],_0x1964a2['battler']()[_0x2d3310('0x87b')]();}else{function _0x3f8205(){const _0x3f8ea6=_0x2d3310;this[_0x3f8ea6('0x70a')]['push'](_0x3f8ea6('0x12d')),this[_0x3f8ea6('0x70a')][_0x3f8ea6('0x2fc')]('clear');}}}},Spriteset_Battle['prototype'][_0x5f4923('0x24f')]=function(){return![];},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x1d')]=function(){const _0x6a9416=_0x5f4923;return this[_0x6a9416('0x851')]()[_0x6a9416('0x38d')](_0x130aa6=>_0x130aa6[_0x6a9416('0x789')]());},Spriteset_Battle[_0x5f4923('0x14f')]['isAnyoneJumping']=function(){const _0x2432f3=_0x5f4923;return this[_0x2432f3('0x851')]()[_0x2432f3('0x38d')](_0xd880f0=>_0xd880f0[_0x2432f3('0x2e0')]());},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x13e')]=function(){const _0x17729d=_0x5f4923;return this[_0x17729d('0x851')]()[_0x17729d('0x38d')](_0x255a19=>_0x255a19[_0x17729d('0x4cc')]());},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x2b6')]=function(){const _0x547a4a=_0x5f4923;return this[_0x547a4a('0x851')]()['some'](_0x44951e=>_0x44951e[_0x547a4a('0x550')]());},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x349')]=function(){const _0x9f14e5=_0x5f4923;return this[_0x9f14e5('0x851')]()['some'](_0x29e9dd=>_0x29e9dd['isSpinning']());},Spriteset_Battle[_0x5f4923('0x14f')][_0x5f4923('0x6b6')]=function(){const _0xfa464b=_0x5f4923;return this[_0xfa464b('0x851')]()[_0xfa464b('0x38d')](_0x40d963=>_0x40d963[_0xfa464b('0x5b9')]());},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x888')]=Window_ItemList['prototype']['maxCols'],Window_ItemList[_0x5f4923('0x14f')][_0x5f4923('0x483')]=function(){const _0x16ed29=_0x5f4923;if(SceneManager[_0x16ed29('0x64e')]()){if(SceneManager[_0x16ed29('0x60a')][_0x16ed29('0x803')]()===_0x16ed29('0x204'))return VisuMZ['BattleCore'][_0x16ed29('0x39b')][_0x16ed29('0x88f')][_0x16ed29('0x384')];else{if(_0x16ed29('0x1e7')===_0x16ed29('0x1f5')){function _0x537dec(){const _0x393a04=_0x16ed29,_0x4cf428=this[_0x393a04('0x555')]()['scope'];return _0x4cf428[_0x393a04('0x5ae')](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);}}else return VisuMZ['BattleCore']['Settings']['BattleLayout']['SkillItemStandardCols'];}}else return VisuMZ[_0x16ed29('0x88d')]['Window_ItemList_maxCols'][_0x16ed29('0x618')](this);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x184')]=Window_SkillList[_0x5f4923('0x14f')][_0x5f4923('0x483')],Window_SkillList['prototype']['maxCols']=function(){const _0x5b0e91=_0x5f4923;if(SceneManager['isSceneBattle']())return SceneManager['_scene'][_0x5b0e91('0x803')]()===_0x5b0e91('0x204')?VisuMZ[_0x5b0e91('0x88d')][_0x5b0e91('0x39b')][_0x5b0e91('0x88f')][_0x5b0e91('0x384')]:VisuMZ[_0x5b0e91('0x88d')][_0x5b0e91('0x39b')][_0x5b0e91('0x88f')][_0x5b0e91('0xd3')];else{if(_0x5b0e91('0x4ba')===_0x5b0e91('0x6f7')){function _0x3bdde5(){const _0x3731f8=_0x5b0e91;_0x36b968['BattleCore']['Window_BattleLog_performMiss'][_0x3731f8('0x618')](this,_0xce9f43),this['callNextMethod']();}}else return VisuMZ[_0x5b0e91('0x88d')][_0x5b0e91('0x184')][_0x5b0e91('0x618')](this);}},VisuMZ[_0x5f4923('0x88d')]['Window_Options_addGeneralOptions']=Window_Options[_0x5f4923('0x14f')][_0x5f4923('0x275')],Window_Options['prototype']['addGeneralOptions']=function(){const _0x578e23=_0x5f4923;VisuMZ['BattleCore'][_0x578e23('0x17e')][_0x578e23('0x618')](this),this[_0x578e23('0x1fc')](),this[_0x578e23('0x70e')]();},Window_Options['prototype'][_0x5f4923('0x1fc')]=function(){const _0x265db9=_0x5f4923;VisuMZ[_0x265db9('0x88d')][_0x265db9('0x39b')][_0x265db9('0x553')]['AddOption']&&(this['addBattleCoreAutoBattleStartupCommand'](),this[_0x265db9('0x1c')]());},Window_Options[_0x5f4923('0x14f')][_0x5f4923('0x70e')]=function(){const _0x2c0514=_0x5f4923;if(!VisuMZ['BattleCore'][_0x2c0514('0x39b')][_0x2c0514('0x409')][_0x2c0514('0x245')])return;const _0x54ffb1=TextManager['visualHpGauge'],_0x426f0e='visualHpGauge';this[_0x2c0514('0x8b')](_0x54ffb1,_0x426f0e);},Window_Options[_0x5f4923('0x14f')][_0x5f4923('0x97')]=function(){const _0x13a0fb=_0x5f4923,_0x18f720=TextManager['autoBattleStart'],_0x2c4962=_0x13a0fb('0x1d8');this[_0x13a0fb('0x8b')](_0x18f720,_0x2c4962);},Window_Options[_0x5f4923('0x14f')]['addBattleCoreAutoBattleStyleCommand']=function(){const _0x49a4bd=_0x5f4923,_0x16d7df=TextManager[_0x49a4bd('0x7b')],_0x3eb8bc='autoBattleUseSkills';this[_0x49a4bd('0x8b')](_0x16d7df,_0x3eb8bc);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x689')]=Window_Options[_0x5f4923('0x14f')][_0x5f4923('0x5f2')],Window_Options['prototype'][_0x5f4923('0x5f2')]=function(_0x5041ed){const _0x17c440=_0x5f4923,_0x44089f=this['commandSymbol'](_0x5041ed);if(_0x44089f===_0x17c440('0x5f4'))return this['statusTextAutoBattleStyle']();else{if(_0x17c440('0x703')!==_0x17c440('0x703')){function _0x23952a(){const _0x396205=_0x17c440;return this[_0x396205('0x1b0')](_0x1656f1);}}else return VisuMZ[_0x17c440('0x88d')][_0x17c440('0x689')][_0x17c440('0x618')](this,_0x5041ed);}},Window_Options[_0x5f4923('0x14f')][_0x5f4923('0x387')]=function(){const _0x21844b=_0x5f4923,_0x2b2f66=VisuMZ[_0x21844b('0x88d')][_0x21844b('0x39b')][_0x21844b('0x553')],_0x5c6b96=this[_0x21844b('0x3e2')](_0x21844b('0x5f4'));return _0x5c6b96?_0x2b2f66[_0x21844b('0x47f')]:_0x2b2f66[_0x21844b('0x820')];},Window_ShopStatus[_0x5f4923('0x14f')][_0x5f4923('0x71a')]=function(){const _0x4b117d=_0x5f4923,_0x12771e=DataManager[_0x4b117d('0x3d2')](this[_0x4b117d('0x3d0')]),_0x11555d=VisuMZ[_0x4b117d('0x5a')][_0x12771e];if(!_0x11555d)return this[_0x4b117d('0x301')]();const _0x321431=_0x4b117d('0x1d3')[_0x4b117d('0x6e6')](this['_item'][_0x4b117d('0x11b')][_0x4b117d('0xa1')]),_0x202b01=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x4b117d('0x11b')]['type']];return _0x11555d[_0x321431][_0x4b117d('0x6e6')](_0x202b01);},Window_ShopStatus['prototype'][_0x5f4923('0x23e')]=function(){const _0x4dc732=_0x5f4923,_0xde2b13=DataManager['getDamageStyle'](this[_0x4dc732('0x3d0')]),_0x5de3a1=VisuMZ[_0x4dc732('0x5a')][_0xde2b13];if(!_0x5de3a1)return this[_0x4dc732('0x6db')]();return _0x5de3a1[_0x4dc732('0x563')]['call'](this);},VisuMZ[_0x5f4923('0x88d')]['Window_PartyCommand_initialize']=Window_PartyCommand['prototype']['initialize'],Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x566')]=function(_0x5c622f){const _0x202723=_0x5f4923;VisuMZ['BattleCore'][_0x202723('0x66e')][_0x202723('0x618')](this,_0x5c622f),this[_0x202723('0x197')](_0x5c622f);},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x197')]=function(_0x135c1c){const _0x13d5b9=_0x5f4923,_0x4fc8e4=new Rectangle(0x0,0x0,_0x135c1c[_0x13d5b9('0x77b')],_0x135c1c[_0x13d5b9('0x303')]);this[_0x13d5b9('0x317')]=new Window_Base(_0x4fc8e4),this[_0x13d5b9('0x317')][_0x13d5b9('0x326')]=0x0,this[_0x13d5b9('0x3e8')](this[_0x13d5b9('0x317')]),this[_0x13d5b9('0x30')]();},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x687')]=function(){const _0x5adca3=_0x5f4923;Window_Command[_0x5adca3('0x14f')][_0x5adca3('0x687')]['call'](this);if(this['_commandNameWindow'])this[_0x5adca3('0x30')]();},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x30')]=function(){const _0x525cb7=_0x5f4923,_0x7c2990=this['_commandNameWindow'];_0x7c2990[_0x525cb7('0x16a')]['clear']();const _0x2922f6=this[_0x525cb7('0x4ad')](this['index']());if(_0x2922f6===_0x525cb7('0x5a4')&&this[_0x525cb7('0x379')]()>0x0){const _0x1d29ff=this[_0x525cb7('0x4c6')](this[_0x525cb7('0x7fe')]());let _0x5cabf7=this[_0x525cb7('0x3c7')](this['index']());_0x5cabf7=_0x5cabf7[_0x525cb7('0x3bd')](/\\I\[(\d+)\]/gi,''),_0x7c2990[_0x525cb7('0x823')](),this[_0x525cb7('0x1d7')](_0x5cabf7,_0x1d29ff),this['commandNameWindowDrawText'](_0x5cabf7,_0x1d29ff),this['commandNameWindowCenter'](_0x5cabf7,_0x1d29ff);}},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x1d7')]=function(_0x17ec7a,_0x287aaf){},Window_PartyCommand[_0x5f4923('0x14f')]['commandNameWindowDrawText']=function(_0xcbe59,_0x851b09){const _0x28e801=_0x5f4923,_0x3d9ee6=this[_0x28e801('0x317')];_0x3d9ee6[_0x28e801('0xcd')](_0xcbe59,0x0,_0x851b09['y'],_0x3d9ee6[_0x28e801('0x54')],_0x28e801('0x4a9'));},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0xed')]=function(_0x5cd8df,_0xc9c22e){const _0x3a75ea=_0x5f4923,_0x110c88=this[_0x3a75ea('0x317')],_0xd72d3=$gameSystem[_0x3a75ea('0x514')](),_0x5aeefb=_0xc9c22e['x']+Math[_0x3a75ea('0x3ed')](_0xc9c22e['width']/0x2)+_0xd72d3;_0x110c88['x']=_0x110c88[_0x3a75ea('0x77b')]/-0x2+_0x5aeefb,_0x110c88['y']=Math[_0x3a75ea('0x3ed')](_0xc9c22e[_0x3a75ea('0x303')]/0x2);},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x236')]=function(){const _0x53aa47=_0x5f4923;this[_0x53aa47('0x281')](),this['addAutoBattleCommand'](),this[_0x53aa47('0x84d')](),this[_0x53aa47('0x504')](),this[_0x53aa47('0x2ed')]();},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x281')]=function(){const _0x104757=_0x5f4923,_0x16000c=this[_0x104757('0x586')](),_0x420896=VisuMZ[_0x104757('0x88d')]['Settings'][_0x104757('0x185')]['CmdIconFight'],_0x551649=_0x16000c===_0x104757('0x72a')?TextManager[_0x104757('0x7c3')]:_0x104757('0x570')[_0x104757('0x6e6')](_0x420896,TextManager[_0x104757('0x7c3')]),_0x413f0c=this[_0x104757('0x7ad')]();this[_0x104757('0x8b')](_0x551649,_0x104757('0x7c3'),_0x413f0c);},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x7ad')]=function(){return!![];},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x2c0')]=function(){const _0x1957b9=_0x5f4923;if(!this[_0x1957b9('0x3f3')]())return;const _0x53a912=this[_0x1957b9('0x586')](),_0x504364=VisuMZ[_0x1957b9('0x88d')][_0x1957b9('0x39b')][_0x1957b9('0x185')][_0x1957b9('0x7f8')],_0x4932fe=_0x53a912===_0x1957b9('0x72a')?TextManager[_0x1957b9('0x32c')]:_0x1957b9('0x570')[_0x1957b9('0x6e6')](_0x504364,TextManager[_0x1957b9('0x32c')]),_0x4472e7=this[_0x1957b9('0x1b1')]();this[_0x1957b9('0x8b')](_0x4932fe,_0x1957b9('0x32c'),_0x4472e7);},Window_PartyCommand['prototype']['isAutoBattleCommandAdded']=function(){const _0x4394f6=_0x5f4923;return VisuMZ['BattleCore'][_0x4394f6('0x39b')][_0x4394f6('0x185')]['CommandAddAutoBattle'];},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x1b1')]=function(){return!![];},Window_PartyCommand['prototype'][_0x5f4923('0x84d')]=function(){},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x504')]=function(){const _0x7a492c=_0x5f4923;if(!this[_0x7a492c('0x484')]())return;const _0x5ce0b9=this[_0x7a492c('0x586')](),_0x42b8e3=VisuMZ[_0x7a492c('0x88d')][_0x7a492c('0x39b')][_0x7a492c('0x185')]['CmdIconOptions'],_0xa53d32=_0x5ce0b9==='text'?TextManager[_0x7a492c('0x6b9')]:'\x5cI[%1]%2'[_0x7a492c('0x6e6')](_0x42b8e3,TextManager[_0x7a492c('0x6b9')]),_0x2326c4=this[_0x7a492c('0x507')]();this[_0x7a492c('0x8b')](_0xa53d32,_0x7a492c('0x6b9'),_0x2326c4);},Window_PartyCommand['prototype'][_0x5f4923('0x484')]=function(){const _0x5d0749=_0x5f4923;return VisuMZ['BattleCore'][_0x5d0749('0x39b')]['PartyCmd'][_0x5d0749('0x471')];},Window_PartyCommand[_0x5f4923('0x14f')]['isOptionsCommandEnabled']=function(){return!![];},Window_PartyCommand['prototype'][_0x5f4923('0x2ed')]=function(){const _0x251d61=_0x5f4923,_0x4e86b6=this[_0x251d61('0x586')](),_0x48a3f7=VisuMZ['BattleCore'][_0x251d61('0x39b')][_0x251d61('0x185')][_0x251d61('0x410')],_0x21a751=_0x4e86b6===_0x251d61('0x72a')?TextManager['escape']:'\x5cI[%1]%2'[_0x251d61('0x6e6')](_0x48a3f7,TextManager[_0x251d61('0x1e3')]),_0x3be6d0=this[_0x251d61('0x493')]();this[_0x251d61('0x8b')](_0x21a751,'escape',_0x3be6d0);},Window_PartyCommand['prototype'][_0x5f4923('0x493')]=function(){const _0x541cd1=_0x5f4923;return BattleManager[_0x541cd1('0x9e')]();},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x44e')]=function(){const _0x5b8845=_0x5f4923;return VisuMZ[_0x5b8845('0x88d')][_0x5b8845('0x39b')]['PartyCmd']['CmdTextAlign'];},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x69e')]=function(_0x446c19){const _0x2c4353=_0x5f4923,_0x388972=this[_0x2c4353('0x4ad')](_0x446c19);if(_0x388972===_0x2c4353('0x6fe')){if(_0x2c4353('0x438')===_0x2c4353('0x438'))this[_0x2c4353('0x864')](_0x446c19);else{function _0x57af27(){const _0x3f9957=_0x2c4353,_0x6d6fcc=_0x35da50[_0x3f9957('0x88d')][_0x3f9957('0x797')][_0x3f9957('0x618')](this);return _0x6d6fcc[_0x3f9957('0x1d8')]=this[_0x3f9957('0x1d8')],_0x6d6fcc[_0x3f9957('0x5f4')]=this['autoBattleUseSkills'],_0x6d6fcc['visualHpGauge']=this[_0x3f9957('0xb8')],_0x6d6fcc;}}}else{if(_0x388972===_0x2c4353('0x5a4'))this['drawItemStyleIcon'](_0x446c19);else{if(_0x2c4353('0x699')!=='pEVJT'){function _0x1ca00b(){_0xad0b19=!_0xdaba40;}}else Window_Command[_0x2c4353('0x14f')][_0x2c4353('0x69e')][_0x2c4353('0x618')](this,_0x446c19);}}},Window_PartyCommand['prototype'][_0x5f4923('0x586')]=function(){const _0x52e98b=_0x5f4923;return VisuMZ['BattleCore'][_0x52e98b('0x39b')]['PartyCmd'][_0x52e98b('0x218')];},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x4ad')]=function(_0x31a407){const _0x4eb2e0=_0x5f4923;if(_0x31a407<0x0)return _0x4eb2e0('0x72a');const _0xa34b16=this[_0x4eb2e0('0x586')]();if(_0xa34b16!=='auto'){if(_0x4eb2e0('0x704')!==_0x4eb2e0('0x30f'))return _0xa34b16;else{function _0xdccf7d(){const _0x4741b4=_0x4eb2e0;if(this[_0x4741b4('0x64d')]()){if(this['collapseType']()>=0x1)return!![];return this[_0x4741b4('0x6ac')]()[_0x4741b4('0x3bc')];}else return!![];}}}else{if(this['maxItems']()>0x0){if('nxzoI'===_0x4eb2e0('0x190')){const _0x3969e8=this['commandName'](_0x31a407);if(_0x3969e8['match'](/\\I\[(\d+)\]/i)){const _0xe33a7c=this[_0x4eb2e0('0x4c6')](_0x31a407),_0x34b6a5=this[_0x4eb2e0('0x26')](_0x3969e8)['width'];return _0x34b6a5<=_0xe33a7c[_0x4eb2e0('0x77b')]?_0x4eb2e0('0x6fe'):'icon';}}else{function _0x5b805c(){const _0xcbf687=_0x4eb2e0;_0x2c8a0b[_0xcbf687('0x2d')]();}}}}return _0x4eb2e0('0x72a');},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x864')]=function(_0x272f3f){const _0x2a6ded=_0x5f4923,_0xb47229=this[_0x2a6ded('0x4c6')](_0x272f3f),_0x5e3b2b=this[_0x2a6ded('0x3c7')](_0x272f3f),_0x2e8ee5=this[_0x2a6ded('0x26')](_0x5e3b2b)[_0x2a6ded('0x77b')];this['changePaintOpacity'](this[_0x2a6ded('0x5c2')](_0x272f3f));const _0x12cf9c=this['itemTextAlign']();if(_0x12cf9c===_0x2a6ded('0x579'))this[_0x2a6ded('0x1d4')](_0x5e3b2b,_0xb47229['x']+_0xb47229[_0x2a6ded('0x77b')]-_0x2e8ee5,_0xb47229['y'],_0x2e8ee5);else{if(_0x12cf9c===_0x2a6ded('0x4a9')){if(_0x2a6ded('0x3f5')!==_0x2a6ded('0x26a')){const _0x5c4bda=_0xb47229['x']+Math[_0x2a6ded('0x3ed')]((_0xb47229[_0x2a6ded('0x77b')]-_0x2e8ee5)/0x2);this['drawTextEx'](_0x5e3b2b,_0x5c4bda,_0xb47229['y'],_0x2e8ee5);}else{function _0x143470(){const _0x383aa4=_0x2a6ded;this[_0x383aa4('0x433')]='',this[_0x383aa4('0x857')]()&&this[_0x383aa4('0x857')]()[_0x383aa4('0x331')]['match'](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x383aa4('0x433')]=_0xde38e9(_0x9bc637['$1']));}}}else this[_0x2a6ded('0x1d4')](_0x5e3b2b,_0xb47229['x'],_0xb47229['y'],_0x2e8ee5);}},Window_PartyCommand[_0x5f4923('0x14f')]['drawItemStyleIcon']=function(_0x47895d){const _0x4cf673=_0x5f4923;this['commandName'](_0x47895d)[_0x4cf673('0x5ae')](/\\I\[(\d+)\]/i);const _0xb8107=Number(RegExp['$1'])||0x0,_0x428936=this[_0x4cf673('0x4c6')](_0x47895d),_0x2bb614=_0x428936['x']+Math['floor']((_0x428936[_0x4cf673('0x77b')]-ImageManager[_0x4cf673('0x31c')])/0x2),_0x54ed04=_0x428936['y']+(_0x428936[_0x4cf673('0x303')]-ImageManager[_0x4cf673('0x2f8')])/0x2;this['drawIcon'](_0xb8107,_0x2bb614,_0x54ed04);},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x342')]=function(){},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x638')]=function(){const _0x41282a=_0x5f4923;Window_Command[_0x41282a('0x14f')][_0x41282a('0x638')]['call'](this);const _0x14231e=this[_0x41282a('0x803')]();_0x14231e===_0x41282a('0x204')&&this[_0x41282a('0x2c2')]();},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x803')]=function(){const _0x383837=_0x5f4923;if(this[_0x383837('0x87c')])return this[_0x383837('0x87c')];return this[_0x383837('0x87c')]=SceneManager['_scene'][_0x383837('0x803')](),this[_0x383837('0x87c')];},Window_PartyCommand[_0x5f4923('0x14f')][_0x5f4923('0x3b9')]=function(){const _0x13af71=_0x5f4923,_0x2aa1b5=VisuMZ[_0x13af71('0x88d')][_0x13af71('0x39b')]['PartyCmd'],_0x15bd91=this['currentSymbol']();switch(_0x15bd91){case'fight':this['_helpWindow'][_0x13af71('0xeb')](_0x2aa1b5[_0x13af71('0x745')]);break;case _0x13af71('0x32c'):this[_0x13af71('0x299')][_0x13af71('0xeb')](_0x2aa1b5[_0x13af71('0x335')]);break;case _0x13af71('0x6b9'):this['_helpWindow'][_0x13af71('0xeb')](_0x2aa1b5[_0x13af71('0x75f')]);break;case _0x13af71('0x1e3'):this['_helpWindow']['setText'](_0x2aa1b5[_0x13af71('0x2d5')]);break;default:this[_0x13af71('0x299')][_0x13af71('0xeb')]('');break;}},VisuMZ[_0x5f4923('0x88d')]['Window_ActorCommand_initialize']=Window_ActorCommand[_0x5f4923('0x14f')]['initialize'],Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x566')]=function(_0x2307dc){const _0x4df127=_0x5f4923;VisuMZ[_0x4df127('0x88d')]['Window_ActorCommand_initialize']['call'](this,_0x2307dc),this[_0x4df127('0x197')](_0x2307dc);},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x197')]=function(_0x18ae20){const _0x22a83a=_0x5f4923,_0x37833c=new Rectangle(0x0,0x0,_0x18ae20[_0x22a83a('0x77b')],_0x18ae20['height']);this[_0x22a83a('0x317')]=new Window_Base(_0x37833c),this['_commandNameWindow'][_0x22a83a('0x326')]=0x0,this[_0x22a83a('0x3e8')](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x687')]=function(){const _0xcd0ae0=_0x5f4923;Window_Command[_0xcd0ae0('0x14f')][_0xcd0ae0('0x687')][_0xcd0ae0('0x618')](this);if(this[_0xcd0ae0('0x317')])this[_0xcd0ae0('0x30')]();},Window_ActorCommand[_0x5f4923('0x14f')]['updateCommandNameWindow']=function(){const _0x1c9357=_0x5f4923,_0xd3bbe1=this['_commandNameWindow'];_0xd3bbe1['contents'][_0x1c9357('0x328')]();const _0x4bdd9e=this[_0x1c9357('0x4ad')](this[_0x1c9357('0x7fe')]());if(_0x4bdd9e==='icon'&&this[_0x1c9357('0x379')]()>0x0){if('xGYSB'!==_0x1c9357('0x3d5')){const _0x4c6433=this['itemLineRect'](this[_0x1c9357('0x7fe')]());let _0x2502a1=this[_0x1c9357('0x3c7')](this[_0x1c9357('0x7fe')]());_0x2502a1=_0x2502a1['replace'](/\\I\[(\d+)\]/gi,''),_0xd3bbe1[_0x1c9357('0x823')](),this[_0x1c9357('0x1d7')](_0x2502a1,_0x4c6433),this[_0x1c9357('0x707')](_0x2502a1,_0x4c6433),this[_0x1c9357('0xed')](_0x2502a1,_0x4c6433);}else{function _0x4e46ec(){const _0x1d1aac=_0x1c9357;_0x14f6d6[_0x1d1aac('0x11b')][_0x1d1aac('0x176')]=!![];}}}},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x1d7')]=function(_0x587714,_0x537359){},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x707')]=function(_0x5ba8a8,_0x4fe2dc){const _0x32ca57=_0x5f4923,_0x5770c4=this[_0x32ca57('0x317')];_0x5770c4[_0x32ca57('0xcd')](_0x5ba8a8,0x0,_0x4fe2dc['y'],_0x5770c4[_0x32ca57('0x54')],_0x32ca57('0x4a9'));},Window_ActorCommand['prototype'][_0x5f4923('0xed')]=function(_0x29e9f9,_0x494777){const _0x279457=_0x5f4923,_0x538c87=this['_commandNameWindow'],_0x3189e2=$gameSystem[_0x279457('0x514')](),_0x1cf16d=_0x494777['x']+Math[_0x279457('0x3ed')](_0x494777[_0x279457('0x77b')]/0x2)+_0x3189e2;_0x538c87['x']=_0x538c87[_0x279457('0x77b')]/-0x2+_0x1cf16d,_0x538c87['y']=Math[_0x279457('0x3ed')](_0x494777[_0x279457('0x303')]/0x2);},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x236')]=function(){const _0x485d97=_0x5f4923;if(!this[_0x485d97('0x3ad')])return;const _0x180bd7=this[_0x485d97('0x3ad')][_0x485d97('0x856')]();for(const _0x177149 of _0x180bd7){if(_0x485d97('0x3ac')!=='cSLWG'){function _0x59e04d(){const _0x169410=_0x485d97,_0x1463e1=this[_0x169410('0x6b5')];this[_0x169410('0x5b4')]['move'](_0x1463e1,_0x1463e1),this[_0x169410('0x5b4')]['x']=_0x1463e1-this[_0x169410('0x710')]['x'],this[_0x169410('0x5b4')]['y']=_0x1463e1-this[_0x169410('0x710')]['y'],this[_0x169410('0x54')]>0x0&&this[_0x169410('0x7d9')]>0x0?this[_0x169410('0x5b4')][_0x169410('0x3fd')]=this[_0x169410('0x5d')]():this[_0x169410('0x5b4')]['visible']=![];}}else this[_0x485d97('0x893')](_0x177149[_0x485d97('0x667')]()[_0x485d97('0x32d')]());}},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x893')]=function(_0x48c31e){const _0x53024b=_0x5f4923;_0x48c31e===_0x53024b('0x577')&&this['addAttackCommand']();['STYPES',_0x53024b('0x718')]['includes'](_0x48c31e)&&this[_0x53024b('0x501')]();if(_0x48c31e==='GUARD'){if('utvim'!==_0x53024b('0x58f')){function _0x3e244b(){const _0x336f70=_0x53024b;this[_0x336f70('0x407')](_0x336f70('0x7cb'));}}else this[_0x53024b('0x3da')]();}_0x48c31e===_0x53024b('0x23f')&&this['addItemCommand']();_0x48c31e==='ESCAPE'&&this[_0x53024b('0x2ed')]();_0x48c31e===_0x53024b('0x6cc')&&this[_0x53024b('0x2c0')]();if(_0x48c31e['match'](/STYPE: (\d+)/i)){if(_0x53024b('0x27b')===_0x53024b('0x27b')){const _0x4216a7=Number(RegExp['$1']);this[_0x53024b('0x3db')](_0x4216a7);}else{function _0x22cc91(){const _0x350e51=_0x53024b,_0x524a8e=_0x47f5d3[_0x350e51('0x2fa')]();_0x524a8e<=0x0?_0xdac22a[_0x350e51('0x5d5')]():this[_0x350e51('0x636')](_0x275f2d,_0x524a8e);}}}else{if(_0x48c31e[_0x53024b('0x5ae')](/STYPE: (.*)/i)){if('gglfE'==='gglfE'){const _0x5c45a5=DataManager[_0x53024b('0x1a')](RegExp['$1']);this[_0x53024b('0x3db')](_0x5c45a5);}else{function _0x3d058c(){const _0x1caca6=_0x53024b;this[_0x1caca6('0x23c')][_0x1caca6('0x58c')]['x']=this['_targetSkewX'],this[_0x1caca6('0x23c')][_0x1caca6('0x58c')]['y']=this['_targetSkewY'];}}}}_0x48c31e==='ALL\x20SKILLS'&&this[_0x53024b('0x45d')]();if(_0x48c31e[_0x53024b('0x5ae')](/SKILL: (\d+)/i)){const _0x5278f3=Number(RegExp['$1']);this[_0x53024b('0x330')]($dataSkills[_0x5278f3]);}else{if(_0x48c31e['match'](/SKILL: (.*)/i)){if(_0x53024b('0x109')!=='Kvptf'){const _0x5027a1=DataManager[_0x53024b('0xec')](RegExp['$1']);this['addSingleSkillCommand']($dataSkills[_0x5027a1]);}else{function _0x5926fa(){const _0x411bfb=_0x53024b;this[_0x411bfb('0xbb')]=0x14,this[_0x411bfb('0x57')][_0x411bfb('0x596')]=_0xacbf90,_0xb47fe9[_0x411bfb('0x60a')]['isRightInputMode']()?(this[_0x411bfb('0x57')]['x']=0x0,this[_0x411bfb('0x444')]=_0x570e50[_0x411bfb('0x3bf')](_0x30f702[_0x411bfb('0x77b')]/0x2)):(this[_0x411bfb('0x57')]['x']=this[_0x411bfb('0x77b')],this['_borderPortraitTargetX']=this['width']*0x3/0x4),this[_0x411bfb('0x57')][_0x411bfb('0x326')]=0x0;}}}}_0x48c31e==='PARTY'&&Imported[_0x53024b('0xe4')]&&this['addPartyCommand']();},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x4df')]=function(){const _0x52772a=_0x5f4923,_0x22a87b=$dataSkills[this[_0x52772a('0x3ad')]['attackSkillId']()];if(!_0x22a87b)return;if(!this[_0x52772a('0x10c')](_0x22a87b))return;const _0x165c29=this['commandStyle'](),_0x1657c4=DataManager['battleCommandName'](_0x22a87b),_0x17ad1d=DataManager[_0x52772a('0x461')](_0x22a87b),_0x3faf96=_0x165c29===_0x52772a('0x72a')?_0x1657c4:_0x52772a('0x570')[_0x52772a('0x6e6')](_0x17ad1d,_0x1657c4);this['addCommand'](_0x3faf96,'attack',this[_0x52772a('0x3ad')][_0x52772a('0x403')]());},Window_ActorCommand['prototype'][_0x5f4923('0x3da')]=function(){const _0x29deca=_0x5f4923,_0x21a358=$dataSkills[this[_0x29deca('0x3ad')][_0x29deca('0x3c6')]()];if(!_0x21a358)return;if(!this[_0x29deca('0x10c')](_0x21a358))return;const _0x503a6d=this[_0x29deca('0x586')](),_0x2c120a=DataManager[_0x29deca('0x6f3')](_0x21a358),_0x47e00a=DataManager[_0x29deca('0x461')](_0x21a358),_0x12ec60=_0x503a6d===_0x29deca('0x72a')?_0x2c120a:'\x5cI[%1]%2'['format'](_0x47e00a,_0x2c120a);this['addCommand'](_0x12ec60,'guard',this[_0x29deca('0x3ad')][_0x29deca('0x684')]());},Window_ActorCommand['prototype'][_0x5f4923('0x6f8')]=function(){const _0x2bfe3b=_0x5f4923,_0x25b706=this[_0x2bfe3b('0x586')](),_0x65d9fa=VisuMZ[_0x2bfe3b('0x88d')]['Settings'][_0x2bfe3b('0xc4')][_0x2bfe3b('0x671')],_0x5625df=_0x25b706===_0x2bfe3b('0x72a')?TextManager[_0x2bfe3b('0x555')]:_0x2bfe3b('0x570')[_0x2bfe3b('0x6e6')](_0x65d9fa,TextManager[_0x2bfe3b('0x555')]),_0x10e4f1=this[_0x2bfe3b('0x3d1')]();this[_0x2bfe3b('0x8b')](_0x5625df,_0x2bfe3b('0x555'),_0x10e4f1);},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x3d1')]=function(){const _0x5316e4=_0x5f4923;return this[_0x5316e4('0x3ad')]&&this[_0x5316e4('0x3ad')][_0x5316e4('0x391')]();},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x501')]=function(){const _0x459696=_0x5f4923,_0x277b85=this[_0x459696('0x3ad')][_0x459696('0x742')]();for(const _0x27163a of _0x277b85){this[_0x459696('0x3db')](_0x27163a);}},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x3db')]=function(_0x207a2f){const _0x215c6b=_0x5f4923;let _0x3c4b6b=$dataSystem[_0x215c6b('0x742')][_0x207a2f];if(!_0x3c4b6b)return;let _0x49b765=_0x3c4b6b;const _0x5f1b75=this[_0x215c6b('0x586')]();if(_0x5f1b75===_0x215c6b('0x72a')){if(_0x215c6b('0x412')!==_0x215c6b('0x412')){function _0x3d8f48(){const _0x351bdb=_0x215c6b,_0x23f68c=_0x385ca8[_0x351bdb('0x857')]();_0x5df352[_0x351bdb('0x88d')]['Scene_Battle_selectNextCommand'][_0x351bdb('0x618')](this);if(_0x23f68c){if(_0x23f68c===_0x20516b[_0x351bdb('0x857')]())return;if(_0x23f68c===_0x179226[_0x351bdb('0x362')])return;_0x23f68c[_0x351bdb('0x17f')]()[_0x351bdb('0x5ef')]();}}}else _0x49b765=_0x49b765[_0x215c6b('0x3bd')](/\x1I\[(\d+)\]/gi,''),_0x49b765=_0x49b765[_0x215c6b('0x3bd')](/\\I\[(\d+)\]/gi,'');}else{if(!_0x3c4b6b[_0x215c6b('0x5ae')](/\\I\[(\d+)\]/i)){if(_0x215c6b('0x6ab')===_0x215c6b('0x6ab')){const _0x5452f6=Imported[_0x215c6b('0x784')]?VisuMZ['SkillsStatesCore']['Settings'][_0x215c6b('0x4')]:VisuMZ[_0x215c6b('0x88d')]['Settings'][_0x215c6b('0xc4')],_0xfdea0d=$dataSystem['magicSkills']['includes'](_0x207a2f),_0x345d5c=_0xfdea0d?_0x5452f6['IconStypeMagic']:_0x5452f6[_0x215c6b('0x316')];_0x49b765=_0x215c6b('0x570')['format'](_0x345d5c,_0x3c4b6b);}else{function _0x3cbb84(){const _0x81ea57=_0x215c6b;return _0x3f179c[_0x81ea57('0x71f')][_0x81ea57('0x618')](this,_0x467c7c);}}}}this[_0x215c6b('0x8b')](_0x49b765,'skill',!![],_0x207a2f);},Window_ActorCommand[_0x5f4923('0x14f')]['addSingleSkillCommands']=function(){const _0x2a7724=_0x5f4923,_0x490afa=this['_actor']['skillTypes'](),_0x8be3a4=this['_actor']['skills']();for(const _0x4628d8 of _0x8be3a4){if(!_0x4628d8)continue;if(Imported[_0x2a7724('0x784')]){const _0x284fa2=_0x490afa[_0x2a7724('0x7bf')](_0x7946aa=>DataManager[_0x2a7724('0x2c7')](_0x4628d8)['includes'](_0x7946aa));if(_0x284fa2[_0x2a7724('0x568')]<=0x0)continue;}else{if(!_0x490afa['includes'](_0x4628d8[_0x2a7724('0x7d8')])){if(_0x2a7724('0x22c')!==_0x2a7724('0xbf'))continue;else{function _0x15142(){const _0x63f5c2=_0x2a7724;_0x4ea17d['BattleCore'][_0x63f5c2('0xe3')][_0x63f5c2('0x618')](this),this[_0x63f5c2('0x6d1')]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x63f5c2('0x637')]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0};}}}}this[_0x2a7724('0x330')](_0x4628d8);}},Window_ActorCommand[_0x5f4923('0x14f')]['addSingleSkillCommand']=function(_0x63762b){const _0x5e2192=_0x5f4923;if(!_0x63762b)return;if(!this[_0x5e2192('0x10c')](_0x63762b))return;const _0x566bb9=this['commandStyle'](),_0x52d9dd=DataManager['battleCommandName'](_0x63762b),_0xf40da2=DataManager[_0x5e2192('0x461')](_0x63762b),_0x21a2ef=_0x566bb9==='text'?_0x52d9dd:_0x5e2192('0x570')[_0x5e2192('0x6e6')](_0xf40da2,_0x52d9dd),_0x39dd0a=this[_0x5e2192('0x3ad')][_0x5e2192('0x268')](_0x63762b);this[_0x5e2192('0x8b')](_0x21a2ef,'singleSkill',_0x39dd0a,_0x63762b['id']);},Window_ActorCommand[_0x5f4923('0x14f')]['canAddSkillCommand']=function(_0x3b3e4b){const _0x56403e=_0x5f4923,_0x5a2316=_0x3b3e4b['note'];if(_0x5a2316[_0x56403e('0x5ae')](/<COMMAND REQUIRE LEARN>/i)){if(_0x56403e('0x193')!==_0x56403e('0x193')){function _0x25aa91(){const _0x24df44=_0x56403e;_0x2acd2e['BattleCore'][_0x24df44('0x39b')][_0x24df44('0x5dc')][_0x24df44('0x80')]?_0x42b204[_0x24df44('0x88d')][_0x24df44('0x39b')]['Actor'][_0x24df44('0x80')][_0x24df44('0x618')](this,_0x287f20):_0x1f86b5[_0x24df44('0x88d')]['Sprite_Actor_setActorHome']['call'](this,_0x14e6c9);}}else{if(!this[_0x56403e('0x3ad')]['isLearnedSkill'](_0x3b3e4b['id']))return![];}}if(_0x5a2316['match'](/<COMMAND REQUIRE ACCESS>/i)){if(_0x56403e('0xab')!=='IIjTs'){if(!this['_actor']['hasSkill'](_0x3b3e4b['id']))return![];}else{function _0xb64b48(){return this['skillItemWindowRectMiddle']();}}}const _0x4c3ad3=VisuMZ[_0x56403e('0x88d')]['createKeyJS'](_0x3b3e4b,_0x56403e('0x884'));if(VisuMZ[_0x56403e('0x88d')]['JS'][_0x4c3ad3]){if(!VisuMZ[_0x56403e('0x88d')]['JS'][_0x4c3ad3][_0x56403e('0x618')](this,this[_0x56403e('0x3ad')],_0x3b3e4b))return![];}return VisuMZ['BattleCore'][_0x56403e('0x33b')](_0x3b3e4b);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x33b')]=function(_0x2ef2fa){const _0x90c6f0=_0x5f4923,_0x2df716=_0x2ef2fa['note'];if(_0x2df716['match'](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x90c6f0('0x73e')==='QHJSG'){const _0x43cbd6=JSON['parse']('['+RegExp['$1'][_0x90c6f0('0x5ae')](/\d+/g)+']');for(const _0x64ca03 of _0x43cbd6){if(!$gameSwitches['value'](_0x64ca03))return![];}return!![];}else{function _0x3b4195(){const _0x2d82e3=_0x90c6f0,_0x3f70ac=this[_0x2d82e3('0x3c7')](_0x2c06e7);if(_0x3f70ac[_0x2d82e3('0x5ae')](/\\I\[(\d+)\]/i)){const _0x2224f5=this[_0x2d82e3('0x4c6')](_0x21a02a),_0x3f0f33=this[_0x2d82e3('0x26')](_0x3f70ac)[_0x2d82e3('0x77b')];return _0x3f0f33<=_0x2224f5[_0x2d82e3('0x77b')]?_0x2d82e3('0x6fe'):'icon';}}}}if(_0x2df716[_0x90c6f0('0x5ae')](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1832aa=JSON[_0x90c6f0('0x1f1')]('['+RegExp['$1'][_0x90c6f0('0x5ae')](/\d+/g)+']');for(const _0x498937 of _0x1832aa){if('hQjdg'==='RRbNL'){function _0x59da8b(){const _0x1bafd8=_0x90c6f0;_0x1f381a[_0x1bafd8('0x28b')]=_0x34031c(_0xd8e9d6['$1']);}}else{if(!$gameSwitches[_0x90c6f0('0x4b2')](_0x498937))return![];}}return!![];}if(_0x2df716[_0x90c6f0('0x5ae')](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x54bbbf=JSON[_0x90c6f0('0x1f1')]('['+RegExp['$1'][_0x90c6f0('0x5ae')](/\d+/g)+']');for(const _0x52cca9 of _0x54bbbf){if($gameSwitches[_0x90c6f0('0x4b2')](_0x52cca9))return!![];}return![];}if(_0x2df716[_0x90c6f0('0x5ae')](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x90c6f0('0x61e')===_0x90c6f0('0x1dd')){function _0x38c735(){const _0x2685ab=_0x90c6f0,_0x28be8d=_0x1bfde2[_0x2685ab('0x88d')][_0x2685ab('0x39b')]['Mechanics'];_0x28be8d[_0x2685ab('0x735')]&&_0x1d606e[_0x2685ab('0x264')](_0x28be8d[_0x2685ab('0x735')]);const _0x350ceb='%1Event'[_0x2685ab('0x6e6')](_0x9b51b0);_0x28be8d[_0x350ceb]&&_0x5770ce[_0x2685ab('0x264')](_0x28be8d[_0x350ceb]);}}else{const _0x5e35ed=JSON['parse']('['+RegExp['$1'][_0x90c6f0('0x5ae')](/\d+/g)+']');for(const _0x26e1ea of _0x5e35ed){if(_0x90c6f0('0x3c3')===_0x90c6f0('0x3c3')){if(!$gameSwitches[_0x90c6f0('0x4b2')](_0x26e1ea))return!![];}else{function _0x3300e4(){const _0x3e8215=_0x90c6f0;if(!_0x4e996e[_0x3e8215('0x88d')]['JS'][_0x3342da][_0x3e8215('0x618')](this,this[_0x3e8215('0x3ad')],_0x48d8e4))return![];}}}return![];}}if(_0x2df716[_0x90c6f0('0x5ae')](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16c8f7=JSON['parse']('['+RegExp['$1'][_0x90c6f0('0x5ae')](/\d+/g)+']');for(const _0x1db631 of _0x16c8f7){if('kvbXK'===_0x90c6f0('0x108')){function _0x50db94(){const _0x4806ad=_0x90c6f0;this['_requestRefresh']&&(this[_0x4806ad('0x6ca')]=![],this[_0x4806ad('0x621')]());}}else{if(!$gameSwitches['value'](_0x1db631))return!![];}}return![];}if(_0x2df716[_0x90c6f0('0x5ae')](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x22e045=JSON[_0x90c6f0('0x1f1')]('['+RegExp['$1'][_0x90c6f0('0x5ae')](/\d+/g)+']');for(const _0x2cafaa of _0x22e045){if('bpWai'==='BGbIt'){function _0x3c5571(){this['addSkillTypeCommand'](_0x91ce57);}}else{if($gameSwitches['value'](_0x2cafaa))return![];}}return!![];}return!![];},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x2ed')]=function(){const _0x388266=_0x5f4923,_0x1e3fec=this[_0x388266('0x586')](),_0x2420de=VisuMZ[_0x388266('0x88d')]['Settings'][_0x388266('0x185')][_0x388266('0x410')],_0x2ec623=_0x1e3fec===_0x388266('0x72a')?TextManager[_0x388266('0x1e3')]:_0x388266('0x570')[_0x388266('0x6e6')](_0x2420de,TextManager[_0x388266('0x1e3')]),_0x15c8cb=this[_0x388266('0x493')]();this[_0x388266('0x8b')](_0x2ec623,_0x388266('0x1e3'),_0x15c8cb);},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x493')]=function(){const _0x38b510=_0x5f4923;return BattleManager[_0x38b510('0x9e')]();},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x2c0')]=function(){const _0x56feff=_0x5f4923,_0x58f0cf=this[_0x56feff('0x586')](),_0x2cf154=VisuMZ['BattleCore'][_0x56feff('0x39b')][_0x56feff('0x185')][_0x56feff('0x7f8')],_0x46f8b3=_0x58f0cf===_0x56feff('0x72a')?TextManager[_0x56feff('0x32c')]:'\x5cI[%1]%2'[_0x56feff('0x6e6')](_0x2cf154,TextManager['autoBattle']),_0x3e3c63=this[_0x56feff('0x1b1')]();this[_0x56feff('0x8b')](_0x46f8b3,_0x56feff('0x32c'),_0x3e3c63);},Window_ActorCommand['prototype'][_0x5f4923('0x1b1')]=function(){return!![];},Window_ActorCommand['prototype'][_0x5f4923('0x44e')]=function(){const _0x38ce0d=_0x5f4923;return VisuMZ[_0x38ce0d('0x88d')][_0x38ce0d('0x39b')][_0x38ce0d('0xc4')]['CmdTextAlign'];},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x69e')]=function(_0x156099){const _0x28e7b1=_0x5f4923,_0x2a9edf=this[_0x28e7b1('0x4ad')](_0x156099);if(_0x2a9edf==='iconText')this[_0x28e7b1('0x864')](_0x156099);else _0x2a9edf===_0x28e7b1('0x5a4')?this[_0x28e7b1('0x6c2')](_0x156099):Window_Command[_0x28e7b1('0x14f')][_0x28e7b1('0x69e')][_0x28e7b1('0x618')](this,_0x156099);this['drawSingleSkillCost'](_0x156099);},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x586')]=function(){const _0x31a9bb=_0x5f4923;return VisuMZ['BattleCore']['Settings'][_0x31a9bb('0xc4')]['CmdStyle'];},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x4ad')]=function(_0x1c77ed){const _0x21b365=_0x5f4923;if(_0x1c77ed<0x0)return _0x21b365('0x72a');const _0x4d94cc=this[_0x21b365('0x586')]();if(_0x4d94cc!==_0x21b365('0x91')){if(_0x21b365('0xc')===_0x21b365('0x647')){function _0x3541ac(){const _0x76b98f=_0x21b365;return _0x178a20[_0x76b98f('0x361')]();}}else return _0x4d94cc;}else{if(this[_0x21b365('0x379')]()>0x0){const _0x2aad5e=this[_0x21b365('0x3c7')](_0x1c77ed);if(_0x2aad5e[_0x21b365('0x5ae')](/\\I\[(\d+)\]/i)){const _0x19272e=this[_0x21b365('0x4c6')](_0x1c77ed),_0x58839f=this[_0x21b365('0x26')](_0x2aad5e)[_0x21b365('0x77b')];if(_0x58839f<=_0x19272e[_0x21b365('0x77b')]){if(_0x21b365('0x128')===_0x21b365('0x128'))return _0x21b365('0x6fe');else{function _0xec9172(){const _0x4361dd=_0x21b365,_0x28ea41=_0x39ee88[_0x4361dd('0xec')](_0x50d1bb['$1']);this['addSingleSkillCommand'](_0x5c81ad[_0x28ea41]);}}}else{if(_0x21b365('0x569')===_0x21b365('0x1a4')){function _0x4d98a8(){const _0x280326=_0x21b365;this['commandName'](_0x3d7829)[_0x280326('0x5ae')](/\\I\[(\d+)\]/i);const _0x3f5dad=_0x1aab09(_0x21c8a8['$1'])||0x0,_0x3faff4=this[_0x280326('0x4c6')](_0x10b3e2),_0x4bdbdd=_0x3faff4['x']+_0x5a39c5[_0x280326('0x3ed')]((_0x3faff4[_0x280326('0x77b')]-_0x522a5b['iconWidth'])/0x2),_0x56eb79=_0x3faff4['y']+(_0x3faff4['height']-_0x347ef0[_0x280326('0x2f8')])/0x2;this[_0x280326('0x80c')](_0x3f5dad,_0x4bdbdd,_0x56eb79);}}else return _0x21b365('0x5a4');}}}}return _0x21b365('0x72a');},Window_ActorCommand[_0x5f4923('0x14f')]['drawItemStyleIconText']=function(_0x1b4e86){const _0x2df63a=_0x5f4923,_0x119200=this[_0x2df63a('0x4c6')](_0x1b4e86),_0x13466d=this[_0x2df63a('0x3c7')](_0x1b4e86),_0x133b5a=this[_0x2df63a('0x26')](_0x13466d)[_0x2df63a('0x77b')];this[_0x2df63a('0x240')](this[_0x2df63a('0x5c2')](_0x1b4e86));const _0x475032=this[_0x2df63a('0x44e')]();if(_0x475032==='right')this[_0x2df63a('0x1d4')](_0x13466d,_0x119200['x']+_0x119200['width']-_0x133b5a,_0x119200['y'],_0x133b5a);else{if(_0x475032==='center'){const _0x36917d=_0x119200['x']+Math[_0x2df63a('0x3ed')]((_0x119200[_0x2df63a('0x77b')]-_0x133b5a)/0x2);this[_0x2df63a('0x1d4')](_0x13466d,_0x36917d,_0x119200['y'],_0x133b5a);}else this[_0x2df63a('0x1d4')](_0x13466d,_0x119200['x'],_0x119200['y'],_0x133b5a);}},Window_ActorCommand[_0x5f4923('0x14f')]['drawItemStyleIcon']=function(_0x314344){const _0x1c5991=_0x5f4923;this[_0x1c5991('0x3c7')](_0x314344)['match'](/\\I\[(\d+)\]/i);const _0x5a099d=Number(RegExp['$1'])||0x0,_0x3c7848=this['itemLineRect'](_0x314344),_0x441541=_0x3c7848['x']+Math[_0x1c5991('0x3ed')]((_0x3c7848[_0x1c5991('0x77b')]-ImageManager['iconWidth'])/0x2),_0x1ab090=_0x3c7848['y']+(_0x3c7848[_0x1c5991('0x303')]-ImageManager[_0x1c5991('0x2f8')])/0x2;this[_0x1c5991('0x80c')](_0x5a099d,_0x441541,_0x1ab090);},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x1bf')]=function(_0x1ce69e){const _0x42c373=_0x5f4923,_0x2d5e50=this[_0x42c373('0x861')](_0x1ce69e);if(!['attack',_0x42c373('0x626'),_0x42c373('0x13')][_0x42c373('0x147')](_0x2d5e50))return;const _0x2883dc=this['itemLineRect'](_0x1ce69e);let _0x1f5730=null;if(_0x2d5e50===_0x42c373('0x597'))_0x1f5730=$dataSkills[this[_0x42c373('0x3ad')]['attackSkillId']()];else{if(_0x2d5e50===_0x42c373('0x626'))_0x1f5730=$dataSkills[this[_0x42c373('0x3ad')][_0x42c373('0x3c6')]()];else{if(_0x42c373('0x116')==='dgRrZ'){function _0x1fd7f7(){const _0x520a15=_0x42c373;_0x59bd2c[_0x520a15('0x19d')]=_0x14cc44(_0x128d57['$1'])[_0x520a15('0x3ec')]()[_0x520a15('0x32d')]();}}else _0x1f5730=$dataSkills[this['_list'][_0x1ce69e][_0x42c373('0x38a')]];}}this[_0x42c373('0xbe')](this[_0x42c373('0x3ad')],_0x1f5730,_0x2883dc['x'],_0x2883dc['y'],_0x2883dc[_0x42c373('0x77b')]);},Window_ActorCommand[_0x5f4923('0x14f')]['drawSkillCost']=function(_0xc82d79,_0x373e34,_0x166ac2,_0x4af23d,_0x3a3587){const _0x2c1edc=_0x5f4923;if(!_0x373e34)return;Imported[_0x2c1edc('0x784')]?Window_Command[_0x2c1edc('0x14f')][_0x2c1edc('0xbe')][_0x2c1edc('0x618')](this,_0xc82d79,_0x373e34,_0x166ac2,_0x4af23d,_0x3a3587):Window_SkillList['prototype'][_0x2c1edc('0xbe')][_0x2c1edc('0x618')](this,_0x373e34,_0x166ac2,_0x4af23d,_0x3a3587);},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x342')]=function(){},Window_ActorCommand[_0x5f4923('0x14f')]['activate']=function(){const _0x406cc8=_0x5f4923;Window_Command[_0x406cc8('0x14f')][_0x406cc8('0x638')]['call'](this);const _0x43c6d1=this[_0x406cc8('0x803')]();_0x43c6d1===_0x406cc8('0x204')&&this['showHelpWindow']();},Window_ActorCommand['prototype']['battleLayoutStyle']=function(){const _0x3a94e8=_0x5f4923;if(this[_0x3a94e8('0x87c')])return this['_battleLayoutStyle'];return this['_battleLayoutStyle']=SceneManager[_0x3a94e8('0x60a')][_0x3a94e8('0x803')](),this[_0x3a94e8('0x87c')];},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x6ff')]=Window_ActorCommand['prototype'][_0x5f4923('0x672')],Window_ActorCommand['prototype'][_0x5f4923('0x672')]=function(_0x18cc97){const _0x2b7584=_0x5f4923,_0x171afd=this[_0x2b7584('0x803')]();if(_0x18cc97&&['xp',_0x2b7584('0x283')]['includes'](_0x171afd)){if(_0x2b7584('0x7d')==='wuEAa'){function _0x3b0acf(){const _0x27cc1f=_0x2b7584;_0x2881e2['push'](this[_0x27cc1f('0x64f')]()[_0x27cc1f('0x8d')]());}}else this[_0x2b7584('0x399')](_0x18cc97);}else _0x18cc97&&['border'][_0x2b7584('0x147')](_0x171afd)&&(this['resizeWindowBorderStyle'](_0x18cc97),this['showHelpWindow']());VisuMZ[_0x2b7584('0x88d')]['Window_ActorCommand_setup']['call'](this,_0x18cc97);if(_0x18cc97&&$gameTroop['aliveMembers']()[_0x2b7584('0x568')]>0x0){if(_0x2b7584('0x52b')===_0x2b7584('0x7da')){function _0x4e969d(){_0x301d3a=_0xc7b5eb['FrontViewSelect'];}}else _0x18cc97[_0x2b7584('0x17f')]()[_0x2b7584('0x4e2')]();}},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x399')]=function(_0x741c60){const _0x383ac4=_0x5f4923,_0x255c6c=Math['round'](Graphics[_0x383ac4('0x49b')]/0x3),_0xd77373=Math[_0x383ac4('0x774')](Graphics[_0x383ac4('0x49b')]/$gameParty[_0x383ac4('0x284')]()[_0x383ac4('0x568')]),_0x215d1b=Math[_0x383ac4('0x6b4')](_0x255c6c,_0xd77373),_0xdb08f4=this['fittingHeight'](VisuMZ['BattleCore'][_0x383ac4('0x39b')]['BattleLayout']['XPActorCommandLines']),_0x56640d=_0xd77373*_0x741c60[_0x383ac4('0x7fe')]()+(_0xd77373-_0x215d1b)/0x2,_0x413679=SceneManager['_scene'][_0x383ac4('0x1ac')]['y']-_0xdb08f4;this[_0x383ac4('0xf9')](_0x56640d,_0x413679,_0x215d1b,_0xdb08f4),this[_0x383ac4('0x2a2')](),this[_0x383ac4('0x675')](0x1);},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x7f1')]=function(_0x130d40){const _0x22fc12=_0x5f4923,_0x572a4d=SceneManager[_0x22fc12('0x60a')][_0x22fc12('0x86')]();this[_0x22fc12('0xf9')](_0x572a4d['x'],_0x572a4d['y'],_0x572a4d[_0x22fc12('0x77b')],_0x572a4d[_0x22fc12('0x303')]),this[_0x22fc12('0x2a2')](),this[_0x22fc12('0x675')](0x0);},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x678')]=function(){const _0x4a0593=_0x5f4923;if(this['_dimmerSprite']){const _0x5cbb4e=this[_0x4a0593('0x2ec')][_0x4a0593('0x596')],_0x5280d4=this[_0x4a0593('0x77b')]-0x8,_0x567fb4=this[_0x4a0593('0x303')],_0x211b2b=this[_0x4a0593('0x3cf')],_0x2833b5=ColorManager[_0x4a0593('0x21c')](),_0x16fb11=ColorManager[_0x4a0593('0x768')]();this[_0x4a0593('0x2ec')]['x']=0x4,_0x5cbb4e['resize'](_0x5280d4,_0x567fb4),_0x5cbb4e[_0x4a0593('0x67d')](0x0,0x0,_0x5280d4,_0x211b2b,_0x16fb11,_0x2833b5,!![]),_0x5cbb4e[_0x4a0593('0x69b')](0x0,_0x211b2b,_0x5280d4,_0x567fb4-_0x211b2b*0x2,_0x2833b5),_0x5cbb4e[_0x4a0593('0x67d')](0x0,_0x567fb4-_0x211b2b,_0x5280d4,_0x211b2b,_0x2833b5,_0x16fb11,!![]),this[_0x4a0593('0x2ec')][_0x4a0593('0x2f')](0x0,0x0,_0x5280d4,_0x567fb4);}},Window_ActorCommand[_0x5f4923('0x14f')][_0x5f4923('0x3b9')]=function(){const _0x312395=_0x5f4923;if(!this[_0x312395('0x3ad')])return;const _0x59bb7a=VisuMZ[_0x312395('0x88d')]['Settings'][_0x312395('0xc4')],_0xd11f76=this['currentSymbol']();switch(_0xd11f76){case _0x312395('0x597'):this[_0x312395('0x6de')]($dataSkills[this[_0x312395('0x3ad')][_0x312395('0x7bd')]()]);break;case _0x312395('0x626'):this[_0x312395('0x6de')]($dataSkills[this['_actor'][_0x312395('0x3c6')]()]);break;case _0x312395('0x739'):const _0x272831=_0x59bb7a[_0x312395('0x18f')],_0x137125=_0x272831[_0x312395('0x6e6')]($dataSystem[_0x312395('0x742')][this['currentExt']()]);this[_0x312395('0x299')][_0x312395('0xeb')](_0x137125);break;case _0x312395('0x13'):this[_0x312395('0x6de')]($dataSkills[this[_0x312395('0x842')]()]);break;case _0x312395('0x555'):this[_0x312395('0x299')][_0x312395('0xeb')](_0x59bb7a['HelpItem']);break;case _0x312395('0x1e3'):this[_0x312395('0x299')][_0x312395('0xeb')](_0x59bb7a[_0x312395('0x2d5')]);break;case _0x312395('0x32c'):this[_0x312395('0x299')][_0x312395('0xeb')](_0x59bb7a['HelpAutoBattle']);break;default:this['_helpWindow'][_0x312395('0xeb')]('');break;}},VisuMZ['BattleCore'][_0x5f4923('0x6ee')]=Window_BattleStatus['prototype'][_0x5f4923('0x566')],Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x566')]=function(_0xa2d4cf){const _0x456d5e=_0x5f4923;VisuMZ[_0x456d5e('0x88d')][_0x456d5e('0x6ee')]['call'](this,_0xa2d4cf),this[_0x456d5e('0x395')]();},Window_BattleStatus[_0x5f4923('0x14f')]['initBattleCore']=function(){const _0xe02233=_0x5f4923;this[_0xe02233('0x216')]=this[_0xe02233('0x2d2')]();},Window_BattleStatus['prototype'][_0x5f4923('0x803')]=function(){const _0x11ccde=_0x5f4923;if(this[_0x11ccde('0x87c')])return this[_0x11ccde('0x87c')];return this[_0x11ccde('0x87c')]=SceneManager[_0x11ccde('0x60a')][_0x11ccde('0x803')](),this['_battleLayoutStyle'];},Window_BattleStatus[_0x5f4923('0x14f')]['isFrameVisible']=function(){const _0x1f7ab9=_0x5f4923,_0x50b8a9=this['battleLayoutStyle']();switch(_0x50b8a9){case _0x1f7ab9('0x855'):case _0x1f7ab9('0x204'):return!![];break;case _0x1f7ab9('0x863'):case'xp':case _0x1f7ab9('0x283'):default:return![];break;}},Window_BattleStatus[_0x5f4923('0x14f')]['extraHeight']=function(){const _0x28a904=_0x5f4923;if(this[_0x28a904('0x2d2')]())return 0x0;else{if(_0x28a904('0x841')===_0x28a904('0x841'))return 0xa;else{function _0x2b062e(){const _0x51408f=_0x28a904,_0x3cf331=_0x51b586[_0x51408f('0x88d')][_0x51408f('0x39b')]['Enemy'];let _0x3d1250=![];_0x1b58ea[_0x51408f('0x773')]()?_0x3d1250=_0x3cf331['SideviewSelect']:_0x3d1250=_0x3cf331['FrontViewSelect'],this[_0x51408f('0x104')](_0x3d1250?this[_0x51408f('0x379')]()-0x1:0x0);}}}},Window_BattleStatus['prototype'][_0x5f4923('0x483')]=function(){const _0x1e88d8=_0x5f4923,_0x419a51=this[_0x1e88d8('0x803')]();switch(_0x419a51){case _0x1e88d8('0x855'):return 0x1;break;case'xp':case _0x1e88d8('0x283'):return $gameParty[_0x1e88d8('0x284')]()[_0x1e88d8('0x568')];break;case'default':default:return $gameParty[_0x1e88d8('0x680')]();break;}},Window_BattleStatus[_0x5f4923('0x14f')]['itemHeight']=function(){const _0x3c6d1b=_0x5f4923,_0x3538b0=this[_0x3c6d1b('0x803')]();switch(_0x3538b0){case _0x3c6d1b('0x855'):return Window_StatusBase[_0x3c6d1b('0x14f')][_0x3c6d1b('0x602')][_0x3c6d1b('0x618')](this);break;case _0x3c6d1b('0x863'):case'xp':case'portrait':default:return this[_0x3c6d1b('0x7d9')];break;}},Window_BattleStatus['prototype'][_0x5f4923('0x339')]=function(){const _0x273f12=_0x5f4923,_0x70ceb8=this['battleLayoutStyle']();switch(_0x70ceb8){case'list':return Window_StatusBase[_0x273f12('0x14f')][_0x273f12('0x339')][_0x273f12('0x618')](this);break;case _0x273f12('0x863'):case'xp':case _0x273f12('0x283'):default:return 0x0;break;}},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x14b')]=function(){const _0x566815=_0x5f4923;this['isFrameVisible']()?Window_StatusBase[_0x566815('0x14f')][_0x566815('0x14b')]['call'](this):this['padding']=0x8;},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x895')]=function(){const _0x3c9204=_0x5f4923;this[_0x3c9204('0x6ca')]=!![];},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x7aa')]=function(){const _0x23fea8=_0x5f4923;Window_StatusBase[_0x23fea8('0x14f')][_0x23fea8('0x7aa')][_0x23fea8('0x618')](this),this[_0x23fea8('0x0')](),this[_0x23fea8('0x67b')]();if(this['battleLayoutStyle']()===_0x23fea8('0x204'))this[_0x23fea8('0x432')]();},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x0')]=function(){const _0x18ef26=_0x5f4923;this[_0x18ef26('0x6ca')]&&(this[_0x18ef26('0x6ca')]=![],this['refresh']());},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x73b')]=function(){const _0x350dec=_0x5f4923;Window_StatusBase[_0x350dec('0x14f')][_0x350dec('0x73b')][_0x350dec('0x618')](this);if(!$gameSystem[_0x350dec('0x773')]())this[_0x350dec('0x621')]();},Window_BattleStatus[_0x5f4923('0x14f')]['hide']=function(){const _0x151d1a=_0x5f4923;if(this['constructor']===Window_BattleStatus)return;Window_StatusBase[_0x151d1a('0x14f')][_0x151d1a('0x342')][_0x151d1a('0x618')](this);},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x475')]=function(_0x48dcf6){const _0x521c7f=_0x5f4923,_0x1047df=this[_0x521c7f('0x803')]();switch(_0x1047df){case'xp':case _0x521c7f('0x283'):break;case'default':case'list':default:return Window_StatusBase[_0x521c7f('0x14f')][_0x521c7f('0x475')]['call'](this,_0x48dcf6);break;}},VisuMZ['BattleCore'][_0x5f4923('0x731')]=Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x26e')],Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x26e')]=function(_0x408294){const _0x3c49a2=_0x5f4923,_0x12f020=this['battleLayoutStyle']();switch(_0x12f020){case _0x3c49a2('0x855'):this[_0x3c49a2('0x369')](_0x408294);break;case'xp':this[_0x3c49a2('0x65b')](_0x408294);break;case _0x3c49a2('0x283'):this['drawItemImagePortraitStyle'](_0x408294);break;case _0x3c49a2('0x863'):case _0x3c49a2('0x204'):default:VisuMZ[_0x3c49a2('0x88d')][_0x3c49a2('0x731')][_0x3c49a2('0x618')](this,_0x408294);break;}},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x231')]=function(_0x523daf){const _0x4ab630=_0x5f4923,_0x19655b=this['battleLayoutStyle']();if(!$gameSystem[_0x4ab630('0x773')]())this[_0x4ab630('0x669')](_0x523daf);switch(_0x19655b){case'list':this[_0x4ab630('0xb5')](_0x523daf);break;case'xp':case _0x4ab630('0x283'):case _0x4ab630('0x863'):default:this[_0x4ab630('0x363')](_0x523daf);break;}},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x2ba')]=function(){const _0x191e2e=_0x5f4923,_0x321d54=this[_0x191e2e('0x803')]();if(['xp'][_0x191e2e('0x147')](_0x321d54)&&!$gameSystem[_0x191e2e('0x773')]()){this[_0x191e2e('0x736')](0x0,0x0,0x0,0x0);return;}Window_StatusBase[_0x191e2e('0x14f')][_0x191e2e('0x2ba')]['call'](this);},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x669')]=function(_0x4f7c5f){const _0x3f0052=_0x5f4923,_0x3aac81=this[_0x3f0052('0x857')](_0x4f7c5f)[_0x3f0052('0x17f')]();if(!_0x3aac81)return;const _0x239628=this[_0x3f0052('0x803')](),_0x39e55a=this[_0x3f0052('0x66c')](_0x4f7c5f);let _0x3ad7c0=Math[_0x3f0052('0x774')](_0x39e55a['x']+_0x39e55a[_0x3f0052('0x77b')]/0x2);['list']['includes'](_0x239628)&&(_0x3ad7c0=_0x39e55a[_0x3f0052('0x77b')]/$gameParty[_0x3f0052('0x284')]()['length'],_0x3ad7c0*=_0x4f7c5f,_0x3ad7c0+=_0x39e55a['width']/$gameParty['battleMembers']()[_0x3f0052('0x568')]/0x2);let _0x5be1ce=Math['round'](this[_0x3f0052('0x6d')](_0x4f7c5f,_0x3aac81,_0x39e55a));_0x3aac81[_0x3f0052('0x4f4')](_0x3ad7c0,_0x5be1ce),this[_0x3f0052('0x827')](_0x3aac81,0x1),_0x3aac81[_0x3f0052('0x73b')]();},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x6d')]=function(_0x3e664a,_0x3dd517,_0x3a375f){const _0x3282d3=_0x5f4923,_0x4facf6=VisuMZ[_0x3282d3('0x88d')][_0x3282d3('0x39b')]['BattleLayout'],_0x2cc8d3=this['battleLayoutStyle']();if(_0x2cc8d3==='xp'){const _0x40506b=_0x4facf6[_0x3282d3('0x654')];switch(_0x40506b[_0x3282d3('0x3ec')]()[_0x3282d3('0x32d')]()){case _0x3282d3('0x212'):return _0x3a375f[_0x3282d3('0x303')]-_0x3dd517[_0x3282d3('0x389')][_0x3282d3('0x303')]/0x4;break;case _0x3282d3('0x4a9'):const _0x124a5c=_0x4facf6['XPActorDefaultHeight'];return(_0x3a375f[_0x3282d3('0x303')]+(_0x3dd517['height']||_0x124a5c))/0x2;break;case'top':return 0x0;case _0x3282d3('0x28b'):default:return this[_0x3282d3('0x705')](_0x3a375f);break;}}else{if(_0x2cc8d3===_0x3282d3('0x283')){}}return _0x3dd517[_0x3282d3('0x303')];},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x369')]=function(_0x2e44cb){const _0x4b0009=_0x5f4923;if(!VisuMZ[_0x4b0009('0x88d')][_0x4b0009('0x39b')][_0x4b0009('0x88f')][_0x4b0009('0x459')])return;const _0x1a60c7=this[_0x4b0009('0x857')](_0x2e44cb),_0x2b446c=this[_0x4b0009('0x66c')](_0x2e44cb);_0x2b446c[_0x4b0009('0x77b')]=ImageManager['faceWidth'],_0x2b446c[_0x4b0009('0x303')]-=0x2,this[_0x4b0009('0x523')](_0x1a60c7,_0x2b446c['x']+0x1,_0x2b446c['y']+0x1,_0x2b446c[_0x4b0009('0x77b')],_0x2b446c['height']);},Window_BattleStatus['prototype'][_0x5f4923('0xb5')]=function(_0x5dd398){const _0x5ec034=_0x5f4923,_0x4a1b8a=$dataSystem['optDisplayTp']?0x4:0x3,_0x527451=_0x4a1b8a*0x80+(_0x4a1b8a-0x1)*0x8+0x4,_0x5c1cbb=this[_0x5ec034('0x857')](_0x5dd398),_0x28a527=this['itemRect'](_0x5dd398);let _0x11394a=_0x28a527['x']+this[_0x5ec034('0x3cf')];if(VisuMZ['BattleCore']['Settings']['BattleLayout'][_0x5ec034('0x459')]){if(_0x5ec034('0x733')!==_0x5ec034('0x7ac'))_0x11394a=_0x28a527['x']+ImageManager[_0x5ec034('0x5f9')]+0x8;else{function _0x35926a(){const _0x3cbede=_0x5ec034;this[_0x3cbede('0x506')]=new _0x4e7d08();for(let _0x32a410=0x0;_0x32a410<0x9;_0x32a410++){this[_0x3cbede('0x506')][_0x3cbede('0x3e8')](new _0x5301f6());}this[_0x3cbede('0x5b4')][_0x3cbede('0x3e8')](this[_0x3cbede('0x506')]);}}}else _0x11394a+=ImageManager[_0x5ec034('0x31c')];const _0x22cb71=Math[_0x5ec034('0x774')](Math['min'](_0x28a527['x']+_0x28a527[_0x5ec034('0x77b')]-_0x527451,_0x11394a)),_0x117c67=Math['round'](_0x28a527['y']+(_0x28a527[_0x5ec034('0x303')]-Sprite_Name[_0x5ec034('0x14f')][_0x5ec034('0x1f6')]())/0x2),_0x5d4018=Math[_0x5ec034('0x774')](_0x22cb71-ImageManager[_0x5ec034('0x31c')]/0x2-0x4),_0x44ed4f=Math[_0x5ec034('0x774')](_0x28a527['y']+(_0x28a527[_0x5ec034('0x303')]-ImageManager[_0x5ec034('0x2f8')])/0x2+ImageManager[_0x5ec034('0x2f8')]/0x2);let _0x4f59bf=_0x22cb71+0x88;const _0x5104fa=_0x117c67;this[_0x5ec034('0x33')](_0x5c1cbb,_0x22cb71-0x4,_0x117c67),this[_0x5ec034('0x152')](_0x5c1cbb,_0x22cb71,_0x117c67),this['placeStateIcon'](_0x5c1cbb,_0x5d4018,_0x44ed4f),this[_0x5ec034('0xc2')](_0x5c1cbb,'hp',_0x4f59bf+0x88*0x0,_0x5104fa),this[_0x5ec034('0xc2')](_0x5c1cbb,'mp',_0x4f59bf+0x88*0x1,_0x5104fa),$dataSystem['optDisplayTp']&&this[_0x5ec034('0xc2')](_0x5c1cbb,'tp',_0x4f59bf+0x88*0x2,_0x5104fa);},Window_BattleStatus[_0x5f4923('0x14f')]['drawItemImageXPStyle']=function(_0x2306de){const _0x1dc29f=_0x5f4923;if(!$gameSystem[_0x1dc29f('0x773')]())return;VisuMZ[_0x1dc29f('0x88d')][_0x1dc29f('0x731')][_0x1dc29f('0x618')](this,_0x2306de);},Window_BattleStatus['prototype'][_0x5f4923('0x363')]=function(_0x87b6be){const _0x5cfdb2=_0x5f4923,_0x4156c8=this['actor'](_0x87b6be),_0x4294f7=this[_0x5cfdb2('0x66c')](_0x87b6be),_0xe7b141=Math[_0x5cfdb2('0x774')](_0x4294f7['x']+(_0x4294f7[_0x5cfdb2('0x77b')]-0x80)/0x2),_0x126244=this[_0x5cfdb2('0x705')](_0x4294f7);let _0x100834=_0xe7b141-ImageManager[_0x5cfdb2('0x31c')]/0x2-0x4,_0xd5307e=_0x126244+ImageManager[_0x5cfdb2('0x2f8')]/0x2;_0x100834-ImageManager[_0x5cfdb2('0x31c')]/0x2<_0x4294f7['x']&&(_0x100834=_0xe7b141+ImageManager[_0x5cfdb2('0x31c')]/0x2-0x4,_0xd5307e=_0x126244-ImageManager[_0x5cfdb2('0x2f8')]/0x2);const _0x214cb6=_0xe7b141,_0x13fea4=this[_0x5cfdb2('0xea')](_0x4294f7);this[_0x5cfdb2('0x33')](_0x4156c8,_0xe7b141,_0x126244),this['placeActorName'](_0x4156c8,_0xe7b141,_0x126244),this[_0x5cfdb2('0x6e3')](_0x4156c8,_0x100834,_0xd5307e),this['placeBasicGauges'](_0x4156c8,_0x214cb6,_0x13fea4);},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x63c')]=function(_0x26b916){const _0x2e2975=_0x5f4923;if(!VisuMZ['BattleCore']['Settings'][_0x2e2975('0x88f')][_0x2e2975('0x627')])return![];if(_0x26b916[_0x2e2975('0x1bc')]())return!![];return Imported['VisuMZ_1_MainMenuCore']&&_0x26b916[_0x2e2975('0x440')]();},Window_BattleStatus['prototype'][_0x5f4923('0x431')]=function(_0x5856a3){const _0x59492c=_0x5f4923,_0x4da8f9=this[_0x59492c('0x857')](_0x5856a3);if(this[_0x59492c('0x63c')](_0x4da8f9)){const _0x29b19f=_0x59492c('0x50e')['format'](_0x4da8f9[_0x59492c('0x7ae')]()),_0x461d13=this[_0x59492c('0x65a')](_0x29b19f,Sprite),_0x316423=_0x4da8f9[_0x59492c('0x848')]();_0x316423!==''?_0x461d13[_0x59492c('0x596')]=ImageManager['loadPicture'](_0x316423):_0x461d13['bitmap']=ImageManager[_0x59492c('0x5c9')];const _0x5c6e1a=this[_0x59492c('0x66c')](_0x5856a3);_0x461d13[_0x59492c('0x105')]['x']=0.5,_0x461d13[_0x59492c('0x105')]['y']=0x1;const _0x29ae0e=Math[_0x59492c('0x774')](_0x5c6e1a['x']+_0x5c6e1a[_0x59492c('0x77b')]/0x2)+this[_0x59492c('0x3cf')],_0x46d126=Math['round'](this[_0x59492c('0x303')]);_0x461d13[_0x59492c('0xf9')](_0x29ae0e,_0x46d126);const _0x4aca61=VisuMZ['BattleCore'][_0x59492c('0x39b')][_0x59492c('0x88f')][_0x59492c('0xe')];_0x461d13[_0x59492c('0x59e')]['x']=_0x4aca61,_0x461d13[_0x59492c('0x59e')]['y']=_0x4aca61,_0x461d13[_0x59492c('0x73b')]();}else{if(_0x59492c('0x20b')==='KdsAI'){const _0x1d17cd=this['faceRect'](_0x5856a3);this[_0x59492c('0x523')](_0x4da8f9,_0x1d17cd['x'],_0x1d17cd['y'],_0x1d17cd[_0x59492c('0x77b')],_0x1d17cd['height']);}else{function _0x4e5719(){const _0x1adaec=_0x59492c;let _0x5a64b1=-0x10,_0x191792=this[_0x1adaec('0x303')]*0.5;const _0x205232=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x39e352=this['_battler'][_0x1adaec('0x5a3')]()['map'](_0x5df255=>_0x5df255&&_0x5df255[_0x1adaec('0x331')]['match'](_0x205232)?_0xcff2c1(_0x3bc891['$1']):0x0),_0x473f97=this['_battler']['traitObjects']()[_0x1adaec('0x17b')](_0x266580=>_0x266580&&_0x266580[_0x1adaec('0x331')][_0x1adaec('0x5ae')](_0x205232)?_0x54016c(_0x178569['$2']):0x0);_0x5a64b1=_0x39e352[_0x1adaec('0x55a')]((_0x358d11,_0xf73498)=>_0x358d11+_0xf73498,_0x5a64b1),_0x191792=_0x473f97[_0x1adaec('0x55a')]((_0x4dc9bb,_0x55d3a3)=>_0x4dc9bb+_0x55d3a3,_0x191792),this[_0x1adaec('0x2da')]['x']=_0x5a64b1,this[_0x1adaec('0x2da')]['y']=_0x191792,this[_0x1adaec('0x2da')][_0x1adaec('0x7aa')]();}}}},Window_BattleStatus['prototype'][_0x5f4923('0x65a')]=function(_0x21484e,_0x13dc95){const _0x7e55cd=_0x5f4923,_0x47fac6=this[_0x7e55cd('0x456')];if(_0x47fac6[_0x21484e])return _0x47fac6[_0x21484e];else{const _0x14978a=new _0x13dc95();return _0x47fac6[_0x21484e]=_0x14978a,this[_0x7e55cd('0x7ab')](_0x14978a),this[_0x7e55cd('0x7ab')](this[_0x7e55cd('0x5b4')]),_0x14978a;}},Window_BattleStatus['prototype'][_0x5f4923('0x164')]=function(){const _0x201061=_0x5f4923;this[_0x201061('0x21e')](),this[_0x201061('0x88a')](),Window_StatusBase[_0x201061('0x14f')]['_createClientArea']['call'](this),this[_0x201061('0x6d9')]();},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x21e')]=function(){const _0x4347a2=_0x5f4923;this['_cursorArea']=new Sprite(),this[_0x4347a2('0x5b4')][_0x4347a2('0x1b6')]=[new PIXI[(_0x4347a2('0x1b6'))][(_0x4347a2('0x41d'))]()],this['_cursorArea'][_0x4347a2('0xcf')]=new Rectangle(),this['_cursorArea'][_0x4347a2('0xf9')](this[_0x4347a2('0x6b5')],this[_0x4347a2('0x6b5')]),this[_0x4347a2('0x3e8')](this[_0x4347a2('0x5b4')]);},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x88a')]=function(){const _0x38475f=_0x5f4923;this[_0x38475f('0x860')]=new Sprite(),this[_0x38475f('0x3e8')](this[_0x38475f('0x860')]);},Window_BattleStatus['prototype']['_createDamageContainer']=function(){const _0x572836=_0x5f4923;this[_0x572836('0x1b')]=new Sprite(),this[_0x572836('0x3e8')](this[_0x572836('0x1b')]);},Window_BattleStatus[_0x5f4923('0x14f')]['_createCursorSprite']=function(){const _0x1bd4cb=_0x5f4923;this[_0x1bd4cb('0x506')]=new Sprite();for(let _0x4e994f=0x0;_0x4e994f<0x9;_0x4e994f++){if(_0x1bd4cb('0x4f5')!=='cmtSV')this[_0x1bd4cb('0x506')][_0x1bd4cb('0x3e8')](new Sprite());else{function _0x1cbfcd(){const _0xfa4f30=_0x1bd4cb;return this[_0xfa4f30('0x5c0')]();}}}this[_0x1bd4cb('0x5b4')][_0x1bd4cb('0x3e8')](this['_cursorSprite']);},Window_BattleStatus['prototype'][_0x5f4923('0x3fe')]=function(){const _0x322617=_0x5f4923;Window_StatusBase['prototype'][_0x322617('0x3fe')][_0x322617('0x618')](this),this[_0x322617('0x740')]();},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x740')]=function(){const _0x78566a=_0x5f4923,_0x39f688=this['_padding'];this[_0x78566a('0x5b4')][_0x78566a('0xf9')](_0x39f688,_0x39f688),this[_0x78566a('0x5b4')]['x']=_0x39f688-this[_0x78566a('0x710')]['x'],this[_0x78566a('0x5b4')]['y']=_0x39f688-this[_0x78566a('0x710')]['y'];if(this['innerWidth']>0x0&&this[_0x78566a('0x7d9')]>0x0)this[_0x78566a('0x5b4')][_0x78566a('0x3fd')]=this[_0x78566a('0x5d')]();else{if('Riyih'!==_0x78566a('0x249'))this[_0x78566a('0x5b4')][_0x78566a('0x3fd')]=![];else{function _0x1371b6(){const _0x5beb23=_0x78566a;if(this[_0x5beb23('0x23d')]())_0x4ac395[_0x5beb23('0x88d')]['Sprite_Enemy_updateCollapse']['call'](this);}}}},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x891')]=function(){const _0x8bc715=_0x5f4923;Window_StatusBase['prototype']['_updateFilterArea'][_0x8bc715('0x618')](this),this[_0x8bc715('0x53a')]();},Window_BattleStatus[_0x5f4923('0x14f')]['_updateCursorFilterArea']=function(){const _0x2185c8=_0x5f4923,_0x161774=this[_0x2185c8('0x5b4')][_0x2185c8('0x227')][_0x2185c8('0xb')](new Point(0x0,0x0)),_0x1b2ac5=this['_cursorArea'][_0x2185c8('0xcf')];_0x1b2ac5['x']=_0x161774['x']+this[_0x2185c8('0x710')]['x'],_0x1b2ac5['y']=_0x161774['y']+this[_0x2185c8('0x710')]['y'],_0x1b2ac5['width']=this[_0x2185c8('0x54')],_0x1b2ac5['height']=this[_0x2185c8('0x7d9')];},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x4b5')]=function(_0x3fd14b){const _0x1c6f51=_0x5f4923;if(this[_0x1c6f51('0x803')]()!==_0x1c6f51('0x283'))return;this[_0x1c6f51('0x431')](_0x3fd14b[_0x1c6f51('0x7fe')]());},Window_BattleStatus[_0x5f4923('0x14f')]['addDamageSprite']=function(_0x2ec01b,_0x537bd2){const _0x598a0c=_0x5f4923;if(!this[_0x598a0c('0x1b')])return;if(!_0x2ec01b)return;if(!_0x537bd2)return;const _0x172cd6=this[_0x598a0c('0x66c')](_0x537bd2['index']());_0x172cd6['x']+=_0x172cd6[_0x598a0c('0x77b')]/0x2+this[_0x598a0c('0x3cf')],_0x2ec01b['x']=_0x172cd6['x'],_0x2ec01b['y']=_0x172cd6['y'],this[_0x598a0c('0x1b')]['addChild'](_0x2ec01b);},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x825')]=function(_0x580e53){const _0x277322=_0x5f4923;if(!this[_0x277322('0x1b')])return;if(!_0x580e53)return;this[_0x277322('0x1b')]['removeChild'](_0x580e53);},Window_BattleStatus[_0x5f4923('0x14f')]['updateBorderStyle']=function(){const _0x56c9ca=_0x5f4923;if(!this[_0x56c9ca('0x334')]())return;if(!this[_0x56c9ca('0x57')])this[_0x56c9ca('0x402')]();this['prepareBorderActor'](),this[_0x56c9ca('0x271')]();},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x334')]=function(){const _0x505626=_0x5f4923;if(this[_0x505626('0x814')]!==Window_BattleStatus)return![];if(!SceneManager[_0x505626('0x64e')]())return![];return VisuMZ['BattleCore'][_0x505626('0x39b')][_0x505626('0x88f')][_0x505626('0x7a4')];},Window_BattleStatus[_0x5f4923('0x14f')]['createBorderStylePortraitSprite']=function(){const _0x4eb636=_0x5f4923;this['_borderPortraitSprite']=new Sprite();const _0x58c34c=SceneManager[_0x4eb636('0x60a')],_0x4d20b3=_0x58c34c[_0x4eb636('0x285')][_0x4eb636('0x421')](_0x58c34c[_0x4eb636('0x76a')]);_0x58c34c[_0x4eb636('0x827')](this[_0x4eb636('0x57')],_0x4d20b3),this[_0x4eb636('0x57')][_0x4eb636('0x105')]['x']=0.5,this[_0x4eb636('0x57')][_0x4eb636('0x105')]['y']=0x1;const _0xf0cf30=VisuMZ['BattleCore']['Settings']['BattleLayout'][_0x4eb636('0x890')];this[_0x4eb636('0x57')]['scale']['x']=_0xf0cf30,this[_0x4eb636('0x57')][_0x4eb636('0x59e')]['y']=_0xf0cf30,this[_0x4eb636('0x57')]['y']=this['y']+this[_0x4eb636('0x303')],this[_0x4eb636('0xbb')]=0x0;},Window_BattleStatus[_0x5f4923('0x14f')][_0x5f4923('0x651')]=function(){const _0x12003b=_0x5f4923;this[_0x12003b('0x57')][_0x12003b('0x3fd')]=BattleManager[_0x12003b('0x2ce')]();const _0x54010c=BattleManager[_0x12003b('0x857')]();if(_0x54010c===this[_0x12003b('0x57')]['actor'])return;this[_0x12003b('0x57')][_0x12003b('0x857')]=_0x54010c||this[_0x12003b('0x57')][_0x12003b('0x857')];if(!_0x54010c)return;else{if(_0x54010c['getBattlePortraitFilename']()===''){if(_0x12003b('0xe9')!=='iPlpg'){this[_0x12003b('0x57')][_0x12003b('0x596')]=ImageManager[_0x12003b('0x5c9')];return;}else{function _0x593c55(){const _0x5e62c0=_0x12003b;this['applyFreezeMotionFrames'](),_0x5e7f5e[_0x5e62c0('0x88d')]['Sprite_Actor_updateFrame'][_0x5e62c0('0x618')](this);}}}else{if(_0x12003b('0xc8')!=='xdCji'){const _0x5738b9=ImageManager['loadPicture'](_0x54010c[_0x12003b('0x848')]());_0x5738b9[_0x12003b('0x267')](this[_0x12003b('0x5e9')][_0x12003b('0x48f')](this,_0x5738b9));}else{function _0x511b8e(){const _0x279de6=_0x12003b;this[_0x279de6('0x860')]['x']=this['x'],this[_0x279de6('0x860')]['y']=this['y'];}}}}},Window_BattleStatus[_0x5f4923('0x14f')]['processBorderActor']=function(_0x4b0a51){const _0x3d38ab=_0x5f4923;this['_borderPortraitDuration']=0x14,this['_borderPortraitSprite'][_0x3d38ab('0x596')]=_0x4b0a51;if(SceneManager[_0x3d38ab('0x60a')][_0x3d38ab('0x875')]()){if(_0x3d38ab('0x137')===_0x3d38ab('0x3ff')){function _0x3d239a(){const _0x2a17d2=_0x3d38ab;if(!_0x2d0149[_0x2a17d2('0x64e')]())return;const _0x51d390=_0x1234f6[_0x2a17d2('0x7fd')](),_0x3d828a=_0x44da63[_0x2a17d2('0x70a')];_0x3d828a[_0x2a17d2('0x1d9')](),_0x51d390[_0x2a17d2('0x28')](_0x2a17d2('0x10f'));}}else this[_0x3d38ab('0x57')]['x']=0x0,this[_0x3d38ab('0x444')]=Math[_0x3d38ab('0x3bf')](_0x4b0a51[_0x3d38ab('0x77b')]/0x2);}else{if(_0x3d38ab('0x1d6')!==_0x3d38ab('0x3a2'))this[_0x3d38ab('0x57')]['x']=this[_0x3d38ab('0x77b')],this[_0x3d38ab('0x444')]=this[_0x3d38ab('0x77b')]*0x3/0x4;else{function _0x5eaf30(){const _0x2e8e7b=_0x3d38ab;_0x449657[_0x2e8e7b('0x14f')]['activate']['call'](this);const _0x4dd05d=this[_0x2e8e7b('0x803')]();_0x4dd05d===_0x2e8e7b('0x204')&&this[_0x2e8e7b('0x2c2')]();}}}this[_0x3d38ab('0x57')][_0x3d38ab('0x326')]=0x0;},Window_BattleStatus[_0x5f4923('0x14f')]['updateBorderSprite']=function(){const _0x15a23c=_0x5f4923;if(this['_borderPortraitDuration']>0x0){const _0x33c87c=this[_0x15a23c('0xbb')],_0x2d9dbc=this[_0x15a23c('0x57')];_0x2d9dbc['x']=(_0x2d9dbc['x']*(_0x33c87c-0x1)+this[_0x15a23c('0x444')])/_0x33c87c,_0x2d9dbc[_0x15a23c('0x326')]=(_0x2d9dbc[_0x15a23c('0x326')]*(_0x33c87c-0x1)+0xff)/_0x33c87c,this['_borderPortraitDuration']--;}},Window_BattleStatus[_0x5f4923('0x14f')]['updateEffectContainers']=function(){const _0x3838b7=_0x5f4923;return;if(this['_effectsContainer']){if(_0x3838b7('0x5dd')===_0x3838b7('0x5dd'))this[_0x3838b7('0x860')]['x']=this['x'],this[_0x3838b7('0x860')]['y']=this['y'];else{function _0x21474d(){const _0x32cbef=_0x3838b7;if(this['enemy']()[_0x32cbef('0x331')][_0x32cbef('0x5ae')](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return _0x5deaed[_0x32cbef('0x14f')][_0x32cbef('0x71')][_0x32cbef('0x618')](this);}}}this[_0x3838b7('0x1b')]&&(this[_0x3838b7('0x1b')]['x']=this['x'],this['_damageContainer']['y']=this['y']);},Window_BattleEnemy[_0x5f4923('0x14f')]['maxCols']=function(){const _0x1dce15=_0x5f4923;return this[_0x1dce15('0x379')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x1e2')]=Window_BattleEnemy[_0x5f4923('0x14f')][_0x5f4923('0x73b')],Window_BattleEnemy[_0x5f4923('0x14f')][_0x5f4923('0x73b')]=function(){VisuMZ['BattleCore']['Window_BattleEnemy_show']['call'](this),this['y']=Graphics['height']*0xa;},Window_BattleEnemy['prototype'][_0x5f4923('0x40a')]=function(){const _0x360804=_0x5f4923;return $gameTroop[_0x360804('0x361')]()['slice'](0x0);},Window_BattleEnemy['prototype'][_0x5f4923('0x621')]=function(){const _0x4e360c=_0x5f4923;this[_0x4e360c('0x22f')]=this['validTargets'](),this[_0x4e360c('0x4ef')](),Window_Selectable[_0x4e360c('0x14f')][_0x4e360c('0x621')][_0x4e360c('0x618')](this);},Window_BattleEnemy[_0x5f4923('0x14f')][_0x5f4923('0x4ef')]=function(){const _0xd45bd5=_0x5f4923;this['_enemies']['sort']((_0x1f3986,_0x1a8c33)=>{const _0x2293a5=_0x498b;return _0x1f3986[_0x2293a5('0x17f')]()[_0x2293a5('0x280')]===_0x1a8c33[_0x2293a5('0x17f')]()[_0x2293a5('0x280')]?_0x1f3986[_0x2293a5('0x17f')]()[_0x2293a5('0x674')]-_0x1a8c33[_0x2293a5('0x17f')]()['_baseY']:_0x1f3986[_0x2293a5('0x17f')]()['_baseX']-_0x1a8c33['battler']()['_baseX'];});if(SceneManager[_0xd45bd5('0x44a')]()){if(_0xd45bd5('0xc7')===_0xd45bd5('0x1dc')){function _0x2647f9(){const _0x228b52=_0xd45bd5;return _0x3fd020[_0x228b52('0x60a')][_0x228b52('0xc5')][_0x228b52('0x1c4')](_0x391e57[0x0],_0x937255[0x1]),!![];}}else this[_0xd45bd5('0x22f')][_0xd45bd5('0x74e')]();}},Window_BattleEnemy[_0x5f4923('0x14f')][_0x5f4923('0x424')]=function(){const _0x237cee=_0x5f4923,_0x21e0fd=VisuMZ[_0x237cee('0x88d')]['Settings']['Enemy'];let _0x1e5b1b=![];if($gameSystem[_0x237cee('0x773')]())_0x1e5b1b=_0x21e0fd[_0x237cee('0x87a')];else{if(_0x237cee('0x778')!==_0x237cee('0x778')){function _0x2a7957(){const _0x8c8d13=_0x237cee;return this[_0x8c8d13('0x310')]||0x0;}}else _0x1e5b1b=_0x21e0fd[_0x237cee('0x446')];}this[_0x237cee('0x104')](_0x1e5b1b?this['maxItems']()-0x1:0x0);};function Window_AutoBattleCancel(){const _0xa4f941=_0x5f4923;this[_0xa4f941('0x566')](...arguments);}Window_AutoBattleCancel[_0x5f4923('0x14f')]=Object['create'](Window_Base['prototype']),Window_AutoBattleCancel[_0x5f4923('0x14f')][_0x5f4923('0x814')]=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x5f4923('0x14f')][_0x5f4923('0x566')]=function(_0x53add8){const _0x539b04=_0x5f4923;Window_Base[_0x539b04('0x14f')][_0x539b04('0x566')]['call'](this,_0x53add8),this[_0x539b04('0x675')](this[_0x539b04('0x3a1')]()),this[_0x539b04('0x621')]();},Window_AutoBattleCancel[_0x5f4923('0x14f')][_0x5f4923('0x3a1')]=function(){const _0x322d8b=_0x5f4923;return VisuMZ['BattleCore'][_0x322d8b('0x39b')]['AutoBattle'][_0x322d8b('0x65f')];},Window_AutoBattleCancel[_0x5f4923('0x14f')][_0x5f4923('0x621')]=function(){const _0x534f6b=_0x5f4923;this[_0x534f6b('0x16a')][_0x534f6b('0x328')]();const _0x279335=VisuMZ['BattleCore'][_0x534f6b('0x39b')][_0x534f6b('0x553')][_0x534f6b('0x7c6')],_0x4555e3=_0x279335[_0x534f6b('0x6e6')](this[_0x534f6b('0x406')](),this[_0x534f6b('0x520')]()),_0x490c58=this[_0x534f6b('0x26')](_0x4555e3)[_0x534f6b('0x77b')],_0xf6aa8f=Math[_0x534f6b('0x3ed')]((this[_0x534f6b('0x54')]-_0x490c58)/0x2);this[_0x534f6b('0x1d4')](_0x4555e3,_0xf6aa8f,0x0,_0x490c58);},Window_AutoBattleCancel[_0x5f4923('0x14f')]['okButtonText']=function(){const _0x23e677=_0x5f4923;if(Imported[_0x23e677('0x4f6')]){if(_0x23e677('0x3c5')===_0x23e677('0x3c5'))return TextManager[_0x23e677('0x377')]('ok');else{function _0x11aed8(){const _0x246749=_0x23e677;return _0x23c1cc[_0x246749('0x88d')]['Settings'][_0x246749('0x88f')][_0x246749('0xd3')];}}}else return VisuMZ[_0x23e677('0x88d')][_0x23e677('0x39b')][_0x23e677('0x553')][_0x23e677('0x4cf')];},Window_AutoBattleCancel[_0x5f4923('0x14f')]['cancelButtonText']=function(){const _0x233ef2=_0x5f4923;if(Imported[_0x233ef2('0x4f6')])return TextManager[_0x233ef2('0x377')](_0x233ef2('0x634'));else{if('QDkLB'===_0x233ef2('0x3b')){function _0x4721bf(){const _0x5e953e=_0x233ef2;if(_0x3189b3[_0x5e953e('0x345')]())_0x2ba24b[_0x5e953e('0x300')](_0x4bfc9c);return _0x44b429['BattleCore'][_0x5e953e('0x82f')][_0x5e953e('0x618')](this);}}else return VisuMZ[_0x233ef2('0x88d')][_0x233ef2('0x39b')]['AutoBattle'][_0x233ef2('0x47')];}},Window_AutoBattleCancel[_0x5f4923('0x14f')][_0x5f4923('0x7aa')]=function(){const _0xbb4175=_0x5f4923;Window_Base[_0xbb4175('0x14f')][_0xbb4175('0x7aa')][_0xbb4175('0x618')](this),this[_0xbb4175('0x36e')](),this[_0xbb4175('0xe5')]();},Window_AutoBattleCancel[_0x5f4923('0x14f')][_0x5f4923('0x36e')]=function(){const _0x42beb9=_0x5f4923;this['visible']=BattleManager[_0x42beb9('0x829')];},Window_AutoBattleCancel[_0x5f4923('0x14f')][_0x5f4923('0xe5')]=function(){const _0x17c37c=_0x5f4923;if(!BattleManager[_0x17c37c('0x829')])return;if(Input[_0x17c37c('0x794')]('ok')||Input[_0x17c37c('0x794')](_0x17c37c('0x634'))||TouchInput[_0x17c37c('0x10')]()||TouchInput[_0x17c37c('0x48e')]()){if('gFztm'===_0x17c37c('0x611'))SoundManager[_0x17c37c('0x155')](),BattleManager[_0x17c37c('0x829')]=![],Input['clear'](),TouchInput[_0x17c37c('0x328')]();else{function _0x16e578(){const _0x596fcd=_0x17c37c;if(!this[_0x596fcd('0x1ea')]())return;if(_0x39daf6<=0x0)return;this[_0x596fcd('0x5ca')]=_0x52a9ac,this[_0x596fcd('0x17a')]=_0x7a6400,this['_jumpWholeDuration']=_0x4468dc;}}}};function Window_EnemyName(){const _0x13c4b5=_0x5f4923;this[_0x13c4b5('0x566')](...arguments);}Window_EnemyName[_0x5f4923('0x14f')]=Object[_0x5f4923('0x771')](Window_Base['prototype']),Window_EnemyName[_0x5f4923('0x14f')][_0x5f4923('0x814')]=Window_EnemyName,Window_EnemyName[_0x5f4923('0x14f')]['initialize']=function(_0x51d449){const _0x4b44da=_0x5f4923;this['_enemyID']=_0x51d449,this[_0x4b44da('0x19e')]='';const _0x5ac94b=new Rectangle(0x0,0x0,Graphics['boxWidth'],this[_0x4b44da('0x4f9')]()*0x4);Window_Base[_0x4b44da('0x14f')]['initialize'][_0x4b44da('0x618')](this,_0x5ac94b),this[_0x4b44da('0x675')](0x2),this[_0x4b44da('0x1b8')]=0x0;},Window_EnemyName[_0x5f4923('0x14f')][_0x5f4923('0x14b')]=function(){const _0x2ab884=_0x5f4923;this[_0x2ab884('0x3cf')]=0x0;},Window_EnemyName[_0x5f4923('0x14f')][_0x5f4923('0x42')]=function(){const _0x28b723=_0x5f4923;return $gameTroop['members']()[this[_0x28b723('0x653')]];},Window_EnemyName[_0x5f4923('0x14f')][_0x5f4923('0x7aa')]=function(){const _0x481a6c=_0x5f4923;Window_Base[_0x481a6c('0x14f')]['update'][_0x481a6c('0x618')](this);if(this[_0x481a6c('0x42')]()&&this[_0x481a6c('0x42')]()['name']()!==this[_0x481a6c('0x19e')])this[_0x481a6c('0x621')]();this[_0x481a6c('0x457')](),this[_0x481a6c('0x6')]();},Window_EnemyName[_0x5f4923('0x14f')][_0x5f4923('0x457')]=function(){const _0x23fcb2=_0x5f4923;if(!this[_0x23fcb2('0x42')]()){if(_0x23fcb2('0x302')!==_0x23fcb2('0x430')){if(this['contentsOpacity']>0x0)this[_0x23fcb2('0x1b8')]-=0x10;}else{function _0x193312(){this['updateCustomActionSequence']();}}}else{if(this[_0x23fcb2('0x42')]()[_0x23fcb2('0x110')]()){if(_0x23fcb2('0x53b')!==_0x23fcb2('0x6cb')){if(this[_0x23fcb2('0x1b8')]>0x0)this[_0x23fcb2('0x1b8')]-=0x10;}else{function _0x371437(){return[_0x4ca717];}}}else{if(SceneManager[_0x23fcb2('0x60a')]['_enemyWindow']&&SceneManager[_0x23fcb2('0x60a')][_0x23fcb2('0x364')][_0x23fcb2('0x148')]&&SceneManager[_0x23fcb2('0x60a')][_0x23fcb2('0x364')][_0x23fcb2('0x22f')]['includes'](this[_0x23fcb2('0x42')]())){if(this[_0x23fcb2('0x1b8')]<0xff)this[_0x23fcb2('0x1b8')]+=0x10;}else this[_0x23fcb2('0x1b8')]>0x0&&(this[_0x23fcb2('0x1b8')]-=0x10);}}},Window_EnemyName[_0x5f4923('0x14f')][_0x5f4923('0x6')]=function(){const _0x2be5f7=_0x5f4923;if(!this[_0x2be5f7('0x42')]())return;if(SceneManager['isBattleFlipped']()){if('vpcCE'===_0x2be5f7('0x551'))this['x']=Graphics[_0x2be5f7('0x49b')]-this['enemy']()['battler']()['_baseX'];else{function _0x3dca36(){const _0x3458b1=_0x2be5f7;if(!_0x3ca09d[_0x3458b1('0x64e')]())return;_0x42cb97['ConvertParams'](_0x73c9a7,_0x437611);const _0x862657=_0x643df8[_0x3458b1('0x7fd')](),_0x35fae2=_0x1fe2a2[_0x3458b1('0x29d')]*_0x5c7c3a['_motionSpeed'];_0x862657[_0x3458b1('0x12d')](_0x35fae2);}}}else{if(_0x2be5f7('0x6b8')!==_0x2be5f7('0x6b8')){function _0x7dc735(){const _0x1543c6=_0x2be5f7;if(!_0x35e93f[_0x1543c6('0x773')]())return;const _0x36e534=this['battler']();if(!_0x36e534)return;if(_0x5b6c90)this[_0x1543c6('0x243')](_0x57a461+_0x36e534[_0x1543c6('0x280')],_0x1c641f+_0x36e534['_baseY'],![]);_0x3b3488+=_0x36e534[_0x1543c6('0x280')]-_0x36e534[_0x1543c6('0x10a')],_0x5a528e+=_0x36e534[_0x1543c6('0x674')]-_0x36e534['_homeY'],_0x36e534['startMove'](_0x597c20,_0x2fee16,_0x2ca06c);if(_0xc72126[_0x1543c6('0x4f6')])_0x36e534[_0x1543c6('0x170')](_0x47083a||_0x1543c6('0x662'));}}else this['x']=this[_0x2be5f7('0x42')]()[_0x2be5f7('0x17f')]()[_0x2be5f7('0x280')];}this['x']-=Math[_0x2be5f7('0x774')](this['width']/0x2),this['y']=this[_0x2be5f7('0x42')]()[_0x2be5f7('0x17f')]()[_0x2be5f7('0x674')]-Math[_0x2be5f7('0x774')](this[_0x2be5f7('0x4f9')]()*1.5);const _0x67ab29=VisuMZ['BattleCore']['Settings'][_0x2be5f7('0x510')];this['x']+=_0x67ab29['NameOffsetX']||0x0,this['y']+=_0x67ab29[_0x2be5f7('0x365')]||0x0;},Window_EnemyName[_0x5f4923('0x14f')][_0x5f4923('0x823')]=function(){const _0x15dd53=_0x5f4923;Window_Base[_0x15dd53('0x14f')][_0x15dd53('0x823')][_0x15dd53('0x618')](this),this[_0x15dd53('0x16a')][_0x15dd53('0x591')]=VisuMZ[_0x15dd53('0x88d')][_0x15dd53('0x39b')][_0x15dd53('0x510')][_0x15dd53('0x5c1')];},Window_EnemyName[_0x5f4923('0x14f')][_0x5f4923('0x621')]=function(){const _0x302c0d=_0x5f4923;this[_0x302c0d('0x16a')][_0x302c0d('0x328')]();if(!this['enemy']())return;this['_text']=this[_0x302c0d('0x42')]()[_0x302c0d('0x28b')]();const _0x40809d=this[_0x302c0d('0x26')](this['_text'])['width'],_0x231eba=Math[_0x302c0d('0x774')]((this[_0x302c0d('0x54')]-_0x40809d)/0x2);this[_0x302c0d('0x1d4')](this[_0x302c0d('0x19e')],_0x231eba,0x0,_0x40809d+0x8);},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x4c2')]=function(){const _0x23a171=_0x5f4923;return VisuMZ[_0x23a171('0x88d')][_0x23a171('0x39b')][_0x23a171('0xb1')][_0x23a171('0x6f6')];},Window_BattleLog['prototype'][_0x5f4923('0x28c')]=function(){const _0xf6f7a2=_0x5f4923;return VisuMZ['BattleCore'][_0xf6f7a2('0x39b')][_0xf6f7a2('0xb1')][_0xf6f7a2('0x60')];},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0xe0')]=function(){const _0x3da0ff=_0x5f4923;return VisuMZ['BattleCore'][_0x3da0ff('0x39b')]['BattleLog'][_0x3da0ff('0x6f2')];},Window_BattleLog['prototype']['isFastForward']=function(){return![];},Window_BattleLog['prototype']['actionEffect']=function(_0x14e8eb,_0x1ee606){const _0x537a3d=_0x5f4923;this['unshift'](_0x537a3d('0x5ce')),BattleManager[_0x537a3d('0x536')](_0x14e8eb,_0x1ee606),this[_0x537a3d('0x67')]();},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x5ce')]=function(){const _0x120f74=_0x5f4923;this[_0x120f74('0x67')]();},Window_BattleLog[_0x5f4923('0x14f')]['push']=function(_0x4b6a14){const _0x25f084=_0x5f4923,_0x1fa9cd=Array['prototype'][_0x25f084('0x805')][_0x25f084('0x618')](arguments,0x1),_0x2cfdda={'name':_0x4b6a14,'params':_0x1fa9cd},_0x2ae7a4=this[_0x25f084('0x22b')][_0x25f084('0x17b')](_0x546366=>_0x546366[_0x25f084('0x28b')])[_0x25f084('0x421')]('actionSplicePoint');if(_0x2ae7a4>=0x0){if(_0x25f084('0x99')!=='KXvHE')this['_methods'][_0x25f084('0x3a8')](_0x2ae7a4,0x0,_0x2cfdda);else{function _0x20f71a(){const _0x43967f=_0x25f084;if(!_0x4315db['isSceneBattle']())return;if(!this[_0x43967f('0x4b8')])this[_0x43967f('0x418')]();this[_0x43967f('0x253')]();const _0x3927bc=this[_0x43967f('0x17f')]();if(_0x3927bc)_0x3927bc[_0x43967f('0x522')]();}}}else{if(_0x25f084('0x2ab')!==_0x25f084('0x2ab')){function _0x1d8f26(){const _0x417f49=_0x25f084;this[_0x417f49('0x83b')][_0x417f49('0x6d3')]=_0x5e7d23[_0x417f49('0x14f')][_0x417f49('0x86f')][_0x417f49('0x618')](this);}}else this[_0x25f084('0x22b')][_0x25f084('0x2fc')](_0x2cfdda);}},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0xa9')]=function(_0x1b698a){const _0x1b4c34=_0x5f4923,_0x1768a0=Array['prototype'][_0x1b4c34('0x805')][_0x1b4c34('0x618')](arguments,0x1);this[_0x1b4c34('0x22b')][_0x1b4c34('0xa9')]({'name':_0x1b698a,'params':_0x1768a0});},Window_BattleLog['prototype'][_0x5f4923('0xdb')]=function(){const _0x9305ba=_0x5f4923;if(!$gameTemp[_0x9305ba('0x345')]())return;console[_0x9305ba('0x300')](this[_0x9305ba('0x22b')][_0x9305ba('0x17b')](_0x46dd73=>_0x46dd73[_0x9305ba('0x28b')])[_0x9305ba('0x6b1')]('\x0a'));},VisuMZ['BattleCore'][_0x5f4923('0x688')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x621')],Window_BattleLog['prototype'][_0x5f4923('0x621')]=function(){this['_requestRefresh']=!![];},VisuMZ['BattleCore'][_0x5f4923('0x4fa')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x7aa')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x7aa')]=function(){const _0x13422e=_0x5f4923;VisuMZ['BattleCore']['Window_BattleLog_update'][_0x13422e('0x618')](this);if(this[_0x13422e('0x6ca')])this['processRefresh']();},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x21b')]=function(){const _0x440552=_0x5f4923;this[_0x440552('0x6ca')]=![],VisuMZ[_0x440552('0x88d')][_0x440552('0x688')]['call'](this);},Window_BattleLog['prototype']['drawLineText']=function(_0xaf98d6){const _0x5e6121=_0x5f4923;let _0x48e597=VisuMZ['BattleCore'][_0x5e6121('0x39b')][_0x5e6121('0xb1')][_0x5e6121('0x1f3')][_0x5e6121('0x3ec')]()[_0x5e6121('0x32d')](),_0x156cf4=this[_0x5e6121('0x5d1')][_0xaf98d6];if(_0x156cf4[_0x5e6121('0x5ae')](/<LEFT>/i))_0x48e597=_0x5e6121('0x48b');else{if(_0x156cf4['match'](/<CENTER>/i))_0x48e597=_0x5e6121('0x4a9');else _0x156cf4[_0x5e6121('0x5ae')](/<RIGHT>/i)&&(_0x48e597=_0x5e6121('0x579'));}_0x156cf4=_0x156cf4[_0x5e6121('0x3bd')](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x156cf4=_0x156cf4['replace'](/\\I\[0\]/gi,'');const _0x177706=this[_0x5e6121('0x33c')](_0xaf98d6);this[_0x5e6121('0x16a')][_0x5e6121('0x760')](_0x177706['x'],_0x177706['y'],_0x177706[_0x5e6121('0x77b')],_0x177706['height']);const _0xcf8bca=this[_0x5e6121('0x26')](_0x156cf4)[_0x5e6121('0x77b')];let _0x27a017=_0x177706['x'];if(_0x48e597==='center'){if('ohSoq'!==_0x5e6121('0x748')){function _0x47f367(){const _0x142b8c=_0x5e6121;_0x22bd94[_0x142b8c('0x88d')][_0x142b8c('0x2b1')][_0x142b8c('0x618')](this),_0x1ba6e4[_0x142b8c('0x64e')]()&&this[_0x142b8c('0x18')](_0x142b8c('0x3d'));}}else _0x27a017+=(_0x177706[_0x5e6121('0x77b')]-_0xcf8bca)/0x2;}else _0x48e597===_0x5e6121('0x579')&&(_0x27a017+=_0x177706['width']-_0xcf8bca);this[_0x5e6121('0x1d4')](_0x156cf4,_0x27a017,_0x177706['y'],_0xcf8bca+0x8);},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x256')]=function(_0x430c55){const _0x2e2feb=_0x5f4923;this[_0x2e2feb('0x5d1')][_0x2e2feb('0x2fc')](_0x430c55),this[_0x2e2feb('0x621')](),this[_0x2e2feb('0x67')]();},Window_BattleLog['prototype'][_0x5f4923('0x4ed')]=function(){const _0x23f198=_0x5f4923;let _0x111f54=![];switch(this[_0x23f198('0x809')]){case'effect':_0x111f54=this['_spriteset']['isEffecting']();break;case'movement':_0x111f54=this[_0x23f198('0xc5')][_0x23f198('0x2d0')]();break;case _0x23f198('0x734'):_0x111f54=this[_0x23f198('0xc5')][_0x23f198('0x15a')]();break;case _0x23f198('0x6af'):_0x111f54=this['_spriteset']['isAnyoneFloating']();break;case _0x23f198('0x4ab'):_0x111f54=this[_0x23f198('0xc5')][_0x23f198('0x37d')]();break;case _0x23f198('0x326'):_0x111f54=this[_0x23f198('0xc5')]['isAnyoneChangingOpacity']();break;}if(!_0x111f54){if('OdHbw'===_0x23f198('0x118'))this['_waitMode']='';else{function _0x255c53(){const _0x337abc=_0x23f198;return _0x13baf9[_0x337abc('0x88d')][_0x337abc('0x39b')][_0x337abc('0x553')][_0x337abc('0x65f')];}}}return _0x111f54;},Window_BattleLog[_0x5f4923('0x14f')]['waitForAnimation']=function(){const _0x14ddee=_0x5f4923;this[_0x14ddee('0x28')](_0x14ddee('0x734'));},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x20d')]=function(){this['setWaitMode']('float');},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x7a7')]=function(){const _0x85bebf=_0x5f4923;this[_0x85bebf('0x28')](_0x85bebf('0x4ab'));},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x881')]=function(){const _0x1859bb=_0x5f4923;this[_0x1859bb('0x28')]('opacity');},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x1ad')]=function(){const _0x16f715=_0x5f4923,_0x1018b4=VisuMZ[_0x16f715('0x88d')][_0x16f715('0x39b')][_0x16f715('0xb1')];if(!_0x1018b4[_0x16f715('0x10d')])return;this[_0x16f715('0x2fc')](_0x16f715('0x256'),_0x1018b4[_0x16f715('0x429')][_0x16f715('0x6e6')]($gameTroop[_0x16f715('0x793')]())),this[_0x16f715('0x2fc')]('waitCount',_0x1018b4[_0x16f715('0x396')]),this[_0x16f715('0x2fc')]('clear');},Window_BattleLog[_0x5f4923('0x14f')]['startAction']=function(_0x326924,_0x9977ab,_0x28b7dc){const _0x27627c=_0x5f4923;if(this['isCustomActionSequence'](_0x9977ab))BattleManager[_0x27627c('0x57b')]();else{if(_0x27627c('0x159')!==_0x27627c('0x113'))this[_0x27627c('0x9')](_0x326924,_0x9977ab,_0x28b7dc);else{function _0x1d8b2f(){const _0x58ceb1=_0x27627c;_0x280c16[_0x58ceb1('0x762')](_0x348227);}}}},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x4fb')]=function(_0x438d44){const _0x1ce07f=_0x5f4923;if(!SceneManager['isSceneBattle']())return![];if(!_0x438d44)return![];if(!_0x438d44[_0x1ce07f('0x555')]())return![];if(_0x438d44[_0x1ce07f('0x555')]()[_0x1ce07f('0x331')][_0x1ce07f('0x5ae')](/<CUSTOM ACTION SEQUENCE>/i)){if(_0x1ce07f('0x7ba')!==_0x1ce07f('0x7ba')){function _0x228abe(){const _0x3d2a84=_0x1ce07f;if(_0x4ca183[_0x3d2a84('0x280')]>_0x597d1a)_0x2daeea+=_0x23411f[_0x3d2a84('0x77b')]/0x2+_0x202342;if(_0x1a1ab6[_0x3d2a84('0x280')]<_0x3cf13f)_0x3c8af6-=_0x2cdb58[_0x3d2a84('0x77b')]/0x2+_0x36c0fe;}}else return!![];}return![];},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x9')]=function(_0x563467,_0x33f2f9,_0x4a657f){const _0x555df3=_0x5f4923,_0x2556e7=_0x33f2f9[_0x555df3('0x555')]();this['setupActionSet'](_0x563467,_0x33f2f9,_0x4a657f),this[_0x555df3('0x4aa')](_0x563467,_0x33f2f9,_0x4a657f),this['finishActionSet'](_0x563467,_0x33f2f9,_0x4a657f);},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x3e7')]=function(_0x4002ee,_0x2a2678){const _0x4f7d90=_0x5f4923,_0x42305a=VisuMZ[_0x4f7d90('0x88d')]['Settings']['BattleLog'];if(_0x42305a[_0x4f7d90('0x16f')]){if(_0x4f7d90('0xde')!==_0x4f7d90('0xde')){function _0x37822f(){const _0xab0188=_0x4f7d90;if(!_0x3b0f2c[_0xab0188('0x773')]())return;const _0xe2a905=this[_0xab0188('0x17f')]();if(!_0xe2a905)return;_0xe2a905[_0xab0188('0x2b2')](_0x35bcd9,_0x35e79d,_0x27f05c);}}else this[_0x4f7d90('0x2fc')](_0x4f7d90('0x256'),_0x4f7d90('0x517')[_0x4f7d90('0x6e6')](DataManager[_0x4f7d90('0x646')](_0x2a2678)));}if(DataManager['isSkill'](_0x2a2678)){if(_0x42305a[_0x4f7d90('0x1ec')])this[_0x4f7d90('0x44c')](_0x2a2678['message1'],_0x4002ee,_0x2a2678);if(_0x42305a[_0x4f7d90('0x749')])this[_0x4f7d90('0x44c')](_0x2a2678[_0x4f7d90('0x869')],_0x4002ee,_0x2a2678);}else{if(_0x4f7d90('0x7ea')===_0x4f7d90('0x639')){function _0x468674(){const _0x23237b=_0x4f7d90;this[_0x23237b('0x83b')][_0x23237b('0x359')]=_0x35ccc9(_0x4f6b5a['$1']),this[_0x23237b('0x83b')][_0x23237b('0x832')]=_0x56d6a2(_0x5f30b4['$2']);}}else{if(_0x42305a[_0x4f7d90('0x322')])this[_0x4f7d90('0x44c')](TextManager[_0x4f7d90('0x83a')],_0x4002ee,_0x2a2678);}}},Window_BattleLog[_0x5f4923('0x14f')]['setupActionSet']=function(_0x59f912,_0x1695f4,_0xa15489){const _0x1bb0ff=_0x5f4923,_0x116879=_0x1695f4['item']();this[_0x1bb0ff('0x3e7')](_0x59f912,_0x116879),this[_0x1bb0ff('0x2fc')]('applyImmortal',_0x59f912,_0xa15489,!![]),this[_0x1bb0ff('0x2fc')]('performActionStart',_0x59f912,_0x1695f4),this[_0x1bb0ff('0x2fc')]('waitForMovement'),this[_0x1bb0ff('0x2fc')](_0x1bb0ff('0x40d'),_0x59f912,_0x1695f4),this[_0x1bb0ff('0x2fc')](_0x1bb0ff('0x7f9'));},Window_BattleLog['prototype'][_0x5f4923('0x4aa')]=function(_0x193434,_0x1b42c2,_0x3ca2a9){const _0xf66248=_0x5f4923;if(this[_0xf66248('0x559')](_0x1b42c2)){if(_0xf66248('0x161')==='AKNgw'){function _0x30636c(){const _0x14b73f=_0xf66248;this[_0x14b73f('0x399')](_0x4f57ed);}}else this[_0xf66248('0x679')](_0x193434,_0x1b42c2,_0x3ca2a9);}else{if(this['isMeleeMultiTargetAction'](_0x1b42c2)){if(_0xf66248('0x3af')!=='MGdaQ'){function _0xa0f131(){_0x13ef56=!_0x38304c;}}else this['autoMeleeMultiTargetActionSet'](_0x193434,_0x1b42c2,_0x3ca2a9);}else{if(_0x1b42c2['isForRandom']())this[_0xf66248('0x6e5')](_0x193434,_0x1b42c2,_0x3ca2a9);else{if(_0xf66248('0x56d')!==_0xf66248('0x567'))this['wholeActionSet'](_0x193434,_0x1b42c2,_0x3ca2a9);else{function _0x106219(){const _0x29a435=_0xf66248;_0x13b4e0['motionIdle']=_0x2265b6(_0x291106['$1'])[_0x29a435('0x3ec')]()[_0x29a435('0x32d')]();}}}}}},Window_BattleLog['prototype']['isMeleeSingleTargetAction']=function(_0xf881e1){const _0xfc7e8b=_0x5f4923;if(!_0xf881e1[_0xfc7e8b('0x5d4')]())return![];if(!_0xf881e1[_0xfc7e8b('0x25f')]())return![];if(!_0xf881e1[_0xfc7e8b('0x397')]())return![];return VisuMZ[_0xfc7e8b('0x88d')][_0xfc7e8b('0x39b')][_0xfc7e8b('0x19')][_0xfc7e8b('0x519')];},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x679')]=function(_0x48cf73,_0x2fb4b0,_0x21df96){const _0x22582d=_0x5f4923,_0x411adf=_0x48cf73[_0x22582d('0x2d3')]()['type']<0x2,_0x20956d=0x14,_0x110600=0x30;if(_0x411adf){if(_0x22582d('0x5d7')===_0x22582d('0x3ba')){function _0x174b95(){const _0x177215=_0x22582d;_0x440d9d[_0x177215('0x88d')]['Game_Interpreter_terminate'][_0x177215('0x618')](this),this[_0x177215('0x545')]&&(this[_0x177215('0x545')]=_0x3523c2,_0x2298f4[_0x177215('0x60a')][_0x177215('0x16e')]());}}else this[_0x22582d('0x2fc')](_0x22582d('0x127'),[_0x48cf73],_0x110600,_0x20956d),this['push']('performMoveToTargets',_0x48cf73,_0x21df96,_0x22582d('0x643'),_0x20956d,!![],'Linear',!![]),this[_0x22582d('0x2fc')]('requestMotion',[_0x48cf73],'walk'),this[_0x22582d('0x2fc')](_0x22582d('0x477'));}if(_0x2fb4b0['item']()['animationId']<0x0){if(_0x22582d('0x382')!==_0x22582d('0x382')){function _0x50bf6f(){const _0x49ab8e=_0x22582d;return _0x19e8a6[_0x49ab8e('0x37c')]['Settings']['QoL'][_0x49ab8e('0x4a0')];}}else this[_0x22582d('0x6e5')](_0x48cf73,_0x2fb4b0,_0x21df96);}else{if('Mvrao'!==_0x22582d('0xc0')){function _0x3dfd5c(){return this['statusTextAutoBattleStyle']();}}else this[_0x22582d('0x26f')](_0x48cf73,_0x2fb4b0,_0x21df96);}if(_0x411adf){const _0x492193=_0x48cf73[_0x22582d('0x17f')]();this[_0x22582d('0x2fc')](_0x22582d('0x127'),[_0x48cf73],_0x110600,_0x20956d),this[_0x22582d('0x2fc')](_0x22582d('0x838'),_0x48cf73,_0x492193['_homeX'],_0x492193['_homeY'],_0x20956d,![],'Linear'),this[_0x22582d('0x2fc')](_0x22582d('0x18'),[_0x48cf73],_0x22582d('0x21a')),this[_0x22582d('0x2fc')]('waitForMovement'),this[_0x22582d('0x2fc')]('requestMotion',[_0x48cf73],_0x22582d('0x7cb'));}},Window_BattleLog[_0x5f4923('0x14f')]['isMeleeMultiTargetAction']=function(_0x5f2b1e){const _0x345e4c=_0x5f4923;if(!_0x5f2b1e[_0x345e4c('0x5d4')]())return![];if(!_0x5f2b1e[_0x345e4c('0x587')]())return![];if(!_0x5f2b1e[_0x345e4c('0x397')]())return![];return VisuMZ[_0x345e4c('0x88d')]['Settings'][_0x345e4c('0x19')]['AutoMeleeAoE'];},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x6bd')]=function(_0x5dbaf6,_0x16a4c8,_0x145629){const _0x1255a2=_0x5f4923,_0x5155ff=_0x5dbaf6['getAttackMotion']()[_0x1255a2('0xa1')]<0x2,_0x5aa9ad=0x14,_0x1fe0f0=0x30;if(_0x5155ff){if(_0x1255a2('0x19f')===_0x1255a2('0x19f'))this[_0x1255a2('0x2fc')](_0x1255a2('0x127'),[_0x5dbaf6],_0x1fe0f0,_0x5aa9ad),this[_0x1255a2('0x2fc')](_0x1255a2('0x6e7'),_0x5dbaf6,_0x145629,_0x1255a2('0x1da'),_0x5aa9ad,!![],_0x1255a2('0x662'),!![]),this[_0x1255a2('0x2fc')]('requestMotion',[_0x5dbaf6],'walk'),this[_0x1255a2('0x2fc')](_0x1255a2('0x477'));else{function _0x5efc8e(){const _0x343f0d=_0x1255a2;if(!_0x100f25[_0x343f0d('0x64e')]())return;const _0x4117de=_0x3b4f81[_0x343f0d('0x7fd')]();if(!_0x4117de)return;_0x4117de['setWaitMode']('battleSpin');}}}this[_0x1255a2('0x26f')](_0x5dbaf6,_0x16a4c8,_0x145629);if(_0x5155ff){if('ijzPr'===_0x1255a2('0x584')){const _0x55c651=_0x5dbaf6[_0x1255a2('0x17f')]();this['push'](_0x1255a2('0x127'),[_0x5dbaf6],_0x1fe0f0,_0x5aa9ad),this['push'](_0x1255a2('0x838'),_0x5dbaf6,_0x55c651[_0x1255a2('0x10a')],_0x55c651[_0x1255a2('0x7f3')],_0x5aa9ad,![],_0x1255a2('0x662')),this['push'](_0x1255a2('0x18'),[_0x5dbaf6],_0x1255a2('0x21a')),this['push'](_0x1255a2('0x477')),this[_0x1255a2('0x2fc')]('requestMotion',[_0x5dbaf6],_0x1255a2('0x7cb'));}else{function _0x3d0346(){const _0x3208e5=_0x1255a2;if(this['_battler']&&this['_battler'][_0x3208e5('0x442')]){const _0x490d05=this['_battler'][_0x3208e5('0x442')];this[_0x3208e5('0x12b')]=_0x144e18[_0x3208e5('0x6c')][_0x490d05['motionType']],this['_pattern']=_0x490d05['pattern'];const _0x1f8eb3=this[_0x3208e5('0x2da')];_0x1f8eb3[_0x3208e5('0x2ea')](_0x490d05[_0x3208e5('0x472')],_0x490d05['pattern']),this[_0x3208e5('0x23b')]();}}}}},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x6e5')]=function(_0xee676,_0x3549d1,_0x12c15d){const _0x296ffe=_0x5f4923,_0x505633=_0x3549d1[_0x296ffe('0x555')]();for(const _0x1555b8 of _0x12c15d){if(!_0x1555b8)continue;this[_0x296ffe('0x2fc')](_0x296ffe('0x5c4'),_0xee676,_0x3549d1),this['push'](_0x296ffe('0x844'),Sprite_Battler['_motionSpeed']),this[_0x296ffe('0x2fc')](_0x296ffe('0x157'),_0xee676,[_0x1555b8],_0x505633['animationId']),this[_0x296ffe('0x2fc')]('waitCount',0x18),this[_0x296ffe('0x2fc')](_0x296ffe('0x4ec'),_0xee676,_0x1555b8);}this[_0x296ffe('0x2fc')](_0x296ffe('0x351'),_0xee676,_0x12c15d,![]);},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x26f')]=function(_0x44f127,_0x5c394b,_0x849296){const _0x4df01b=_0x5f4923,_0x1cf162=_0x5c394b[_0x4df01b('0x555')]();this['push'](_0x4df01b('0x5c4'),_0x44f127,_0x5c394b),this[_0x4df01b('0x2fc')](_0x4df01b('0x844'),Sprite_Battler[_0x4df01b('0x81c')]),this[_0x4df01b('0x2fc')](_0x4df01b('0x157'),_0x44f127,_0x849296['clone'](),_0x1cf162[_0x4df01b('0x722')]),this[_0x4df01b('0x2fc')](_0x4df01b('0x7f9'));for(const _0x2a6acf of _0x849296){if(!_0x2a6acf)continue;this[_0x4df01b('0x2fc')](_0x4df01b('0x4ec'),_0x44f127,_0x2a6acf);}this[_0x4df01b('0x2fc')](_0x4df01b('0x351'),_0x44f127,_0x849296,![]);},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x16')]=function(_0xbf2943,_0x77df77,_0x277a4b){const _0x1c2de8=_0x5f4923,_0x437b41=_0x77df77[_0x1c2de8('0x555')]();this[_0x1c2de8('0x2fc')](_0x1c2de8('0x351'),_0xbf2943,_0x277a4b,![]),this['push'](_0x1c2de8('0x1d9')),this[_0x1c2de8('0x2fc')]('waitForEffect'),this[_0x1c2de8('0x2fc')]('clear'),this[_0x1c2de8('0x2fc')](_0x1c2de8('0x404'),_0xbf2943),this[_0x1c2de8('0x2fc')](_0x1c2de8('0x477'));},Window_BattleLog[_0x5f4923('0x14f')]['endAction']=function(_0x5c93f7){},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x39f')]=Window_BattleLog['prototype'][_0x5f4923('0x7ec')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x7ec')]=function(_0x56ad08){const _0x1f8c56=_0x5f4923;if(!VisuMZ[_0x1f8c56('0x88d')][_0x1f8c56('0x39b')][_0x1f8c56('0xb1')][_0x1f8c56('0x498')])return;VisuMZ[_0x1f8c56('0x88d')][_0x1f8c56('0x39f')][_0x1f8c56('0x618')](this,_0x56ad08);},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x18a')]=function(_0x2ba5fe){const _0x49d50a=_0x5f4923;this[_0x49d50a('0x2fc')](_0x49d50a('0x5'),_0x2ba5fe);VisuMZ[_0x49d50a('0x88d')]['Settings'][_0x49d50a('0x19')]['CounterPlayback']&&this[_0x49d50a('0x2fc')]('showAnimation',_0x2ba5fe,[BattleManager[_0x49d50a('0x362')]],-0x1);if(!VisuMZ[_0x49d50a('0x88d')][_0x49d50a('0x39b')][_0x49d50a('0xb1')][_0x49d50a('0x3a5')])return;this['push'](_0x49d50a('0x256'),TextManager[_0x49d50a('0x585')]['format'](_0x2ba5fe[_0x49d50a('0x28b')]()));},Window_BattleLog['prototype'][_0x5f4923('0x53')]=function(_0x11cdfb){const _0x5f4f7a=_0x5f4923;this['push'](_0x5f4f7a('0x619'),_0x11cdfb);if(!VisuMZ[_0x5f4f7a('0x88d')][_0x5f4f7a('0x39b')][_0x5f4f7a('0xb1')][_0x5f4f7a('0x286')])return;this[_0x5f4f7a('0x2fc')](_0x5f4f7a('0x256'),TextManager['magicReflection'][_0x5f4f7a('0x6e6')](_0x11cdfb['name']()));},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x229')]=function(_0x500d0e,_0x3b4a1b){const _0x59e2d5=_0x5f4923;if(VisuMZ[_0x59e2d5('0x88d')]['Settings'][_0x59e2d5('0x19')][_0x59e2d5('0xb2')]){const _0x4a2e55=_0x3b4a1b[_0x59e2d5('0x555')]();this[_0x59e2d5('0x2fc')](_0x59e2d5('0x157'),_0x500d0e,[_0x500d0e],_0x4a2e55[_0x59e2d5('0x722')]);}},Window_BattleLog['prototype'][_0x5f4923('0x4d1')]=function(_0xeeae33,_0x59861d){const _0x3d69f3=_0x5f4923;this['push']('performSubstitute',_0xeeae33,_0x59861d);if(!VisuMZ[_0x3d69f3('0x88d')]['Settings']['BattleLog'][_0x3d69f3('0x2e8')])return;const _0x977499=_0xeeae33[_0x3d69f3('0x28b')](),_0x55c42a=TextManager[_0x3d69f3('0x31b')][_0x3d69f3('0x6e6')](_0x977499,_0x59861d[_0x3d69f3('0x28b')]());this[_0x3d69f3('0x2fc')]('addText',_0x55c42a);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x72b')]=Window_BattleLog['prototype'][_0x5f4923('0x134')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x134')]=function(_0x3e87b2){const _0x48d2d5=_0x5f4923;if(!VisuMZ[_0x48d2d5('0x88d')][_0x48d2d5('0x39b')][_0x48d2d5('0xb1')]['ShowFailure'])return;VisuMZ[_0x48d2d5('0x88d')][_0x48d2d5('0x72b')][_0x48d2d5('0x618')](this,_0x3e87b2);},VisuMZ['BattleCore'][_0x5f4923('0x12')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x4ac')],Window_BattleLog['prototype'][_0x5f4923('0x4ac')]=function(_0x536d31){const _0x20b484=_0x5f4923;if(!VisuMZ[_0x20b484('0x88d')]['Settings']['BattleLog'][_0x20b484('0x772')])return;VisuMZ[_0x20b484('0x88d')][_0x20b484('0x12')][_0x20b484('0x618')](this,_0x536d31);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x81b')]=Window_BattleLog['prototype'][_0x5f4923('0x60b')],Window_BattleLog['prototype']['displayMiss']=function(_0x53d6bc){const _0x16d149=_0x5f4923;if(!VisuMZ['BattleCore'][_0x16d149('0x39b')]['BattleLog']['ShowMissEvasion']){if(_0x16d149('0x81d')===_0x16d149('0x81d'))this['push']('performMiss',_0x53d6bc);else{function _0x10b5e8(){const _0x49997d=_0x16d149;this['_cache']={},_0x3b2345[_0x49997d('0x88d')]['Game_BattlerBase_refresh'][_0x49997d('0x618')](this);}}}else VisuMZ[_0x16d149('0x88d')]['Window_BattleLog_displayMiss'][_0x16d149('0x618')](this,_0x53d6bc);},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x463')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x32')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x32')]=function(_0x2d4fe8){const _0x30d074=_0x5f4923;if(!VisuMZ['BattleCore'][_0x30d074('0x39b')]['BattleLog'][_0x30d074('0x7eb')]){if('dkbXu'!==_0x30d074('0x521')){function _0x33f847(){const _0x1f53cb=_0x30d074;_0x4418b5[_0x1f53cb('0x14f')][_0x1f53cb('0x2c8')][_0x1f53cb('0x618')](this),this['isSpriteVisible']()&&this[_0x1f53cb('0x64d')]()&&this[_0x1f53cb('0x18')](_0x1f53cb('0x11b')),_0x46d032[_0x1f53cb('0x2ad')]();}}else _0x2d4fe8[_0x30d074('0x560')]()[_0x30d074('0x66d')]?this[_0x30d074('0x2fc')]('performEvasion',_0x2d4fe8):this[_0x30d074('0x2fc')](_0x30d074('0x3dd'),_0x2d4fe8);}else VisuMZ[_0x30d074('0x88d')]['Window_BattleLog_displayEvasion'][_0x30d074('0x618')](this,_0x2d4fe8);},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x51f')]=function(_0x135394){const _0x386ddf=_0x5f4923;if(_0x135394[_0x386ddf('0x560')]()[_0x386ddf('0x635')]){if(_0x135394[_0x386ddf('0x560')]()['hpDamage']>0x0&&!_0x135394[_0x386ddf('0x560')]()[_0x386ddf('0x2b3')]){if(_0x386ddf('0xd2')==='HhYfD')this[_0x386ddf('0x2fc')](_0x386ddf('0x2c8'),_0x135394);else{function _0x3ae13a(){const _0x1abd58=_0x386ddf;_0x143549[_0x1abd58('0x28e')]([_0x47e62d]);}}}_0x135394[_0x386ddf('0x560')]()['hpDamage']<0x0&&this['push']('performRecovery',_0x135394),VisuMZ['BattleCore'][_0x386ddf('0x39b')][_0x386ddf('0xb1')]['ShowHpDmg']&&this[_0x386ddf('0x2fc')](_0x386ddf('0x256'),this[_0x386ddf('0x836')](_0x135394));}},VisuMZ['BattleCore'][_0x5f4923('0x7a6')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x247')],Window_BattleLog[_0x5f4923('0x14f')]['displayMpDamage']=function(_0x4f6c6e){const _0x56877c=_0x5f4923;if(!VisuMZ[_0x56877c('0x88d')]['Settings']['BattleLog']['ShowMpDmg'])return;VisuMZ['BattleCore'][_0x56877c('0x7a6')][_0x56877c('0x618')](this,_0x4f6c6e);},VisuMZ['BattleCore'][_0x5f4923('0x16d')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x2ca')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x2ca')]=function(_0x14b598){const _0x569fde=_0x5f4923;if(!VisuMZ[_0x569fde('0x88d')][_0x569fde('0x39b')][_0x569fde('0xb1')][_0x569fde('0x2f7')])return;VisuMZ[_0x569fde('0x88d')]['Window_BattleLog_displayTpDamage']['call'](this,_0x14b598);},Window_BattleLog[_0x5f4923('0x14f')]['displayAddedStates']=function(_0x500739){const _0x331ad2=_0x5f4923,_0x41aab4=_0x500739[_0x331ad2('0x560')](),_0x1ede8d=_0x41aab4['addedStateObjects']();for(const _0x3a4de0 of _0x1ede8d){if('huwPI'===_0x331ad2('0x405')){function _0x51fce2(){const _0x5f0274=_0x331ad2,_0x613dae=_0x14f549[_0x5f0274('0x88d')][_0x5f0274('0x39b')][_0x5f0274('0x553')],_0x4a4396=this[_0x5f0274('0x3e2')](_0x5f0274('0x5f4'));return _0x4a4396?_0x613dae[_0x5f0274('0x47f')]:_0x613dae[_0x5f0274('0x820')];}}else{const _0x34d4a6=_0x500739[_0x331ad2('0x1c3')]()?_0x3a4de0[_0x331ad2('0x1c6')]:_0x3a4de0[_0x331ad2('0x869')];_0x34d4a6&&VisuMZ[_0x331ad2('0x88d')][_0x331ad2('0x39b')][_0x331ad2('0xb1')]['ShowAddedState']&&(this[_0x331ad2('0x2fc')](_0x331ad2('0x5c5')),this[_0x331ad2('0x2fc')](_0x331ad2('0x1d2')),this[_0x331ad2('0x2fc')](_0x331ad2('0x256'),_0x34d4a6['format'](_0x500739[_0x331ad2('0x28b')]())),this[_0x331ad2('0x2fc')]('wait')),_0x3a4de0['id']===_0x500739[_0x331ad2('0x74')]()&&this[_0x331ad2('0x2fc')]('performCollapse',_0x500739);}}},Window_BattleLog[_0x5f4923('0x14f')]['displayRemovedStates']=function(_0x22ce8f){const _0x30def0=_0x5f4923;if(!VisuMZ[_0x30def0('0x88d')][_0x30def0('0x39b')][_0x30def0('0xb1')][_0x30def0('0x411')])return;const _0x346cfe=_0x22ce8f[_0x30def0('0x560')](),_0x26d6b4=_0x346cfe['removedStateObjects']();for(const _0xae7785 of _0x26d6b4){if(_0x30def0('0xb4')!=='KKWIN'){function _0x402ec6(){const _0x29ee4d=_0x30def0;if(!_0x528942[_0x29ee4d('0x64e')]())return;_0xc3a360[_0x29ee4d('0x3b4')](_0x4d1771,_0x512a41);const _0x394b8f=_0x2414c8[_0x29ee4d('0x50a')],_0xc04760={'arPenRate':_0x321454['ArPenRate'],'arPenFlat':_0x4b7b86['ArPenFlat'],'arRedRate':_0x4fa84c['ArRedRate'],'arRedFlat':_0x41393a[_0x29ee4d('0x4b')]};_0x394b8f[_0x29ee4d('0x6d1')]=_0xc04760;}}else{if(_0xae7785['message4']){if(_0x30def0('0x723')!=='UHgtd')this[_0x30def0('0x2fc')]('popBaseLine'),this[_0x30def0('0x2fc')](_0x30def0('0x1d2')),this[_0x30def0('0x2fc')](_0x30def0('0x256'),_0xae7785[_0x30def0('0x2a8')][_0x30def0('0x6e6')](_0x22ce8f['name']())),this[_0x30def0('0x2fc')](_0x30def0('0x12d'));else{function _0x2bbb14(){const _0x445e53=_0x30def0,_0x347b3e=_0x300662['round'](_0x471978['width']/0x2),_0x34233f=_0x56fd9f[_0x445e53('0x774')](_0x5e0024[_0x445e53('0x303')]/0x2);_0x218775[_0x445e53('0x785')](_0x347b3e,_0x34233f,_0x4e2d9b[_0x445e53('0x79d')],_0x4f2893['EasingType']);}}}}}},Window_BattleLog[_0x5f4923('0x14f')]['displayChangedBuffs']=function(_0x53735c){const _0xb3080f=_0x5f4923,_0x2be9c0=VisuMZ['BattleCore'][_0xb3080f('0x39b')]['BattleLog'],_0x40f3c2=_0x53735c[_0xb3080f('0x560')]();if(_0x2be9c0[_0xb3080f('0x817')])this[_0xb3080f('0x296')](_0x53735c,_0x40f3c2[_0xb3080f('0x5e5')],TextManager[_0xb3080f('0x400')]);if(_0x2be9c0[_0xb3080f('0x5f5')])this[_0xb3080f('0x296')](_0x53735c,_0x40f3c2[_0xb3080f('0x750')],TextManager['debuffAdd']);if(_0x2be9c0['ShowRemovedBuff'])this[_0xb3080f('0x296')](_0x53735c,_0x40f3c2[_0xb3080f('0x754')],TextManager[_0xb3080f('0x72')]);},Window_BattleLog['prototype'][_0x5f4923('0x296')]=function(_0x5e5165,_0x53ba4b,_0x39facd){const _0x37c664=_0x5f4923;for(const _0x25ca52 of _0x53ba4b){const _0x5ee432=_0x39facd[_0x37c664('0x6e6')](_0x5e5165['name'](),TextManager['param'](_0x25ca52));this[_0x37c664('0x2fc')]('popBaseLine'),this['push']('pushBaseLine'),this[_0x37c664('0x2fc')](_0x37c664('0x256'),_0x5ee432),this['push'](_0x37c664('0x12d'));}},VisuMZ[_0x5f4923('0x88d')]['Window_BattleLog_clear']=Window_BattleLog['prototype'][_0x5f4923('0x328')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x328')]=function(){const _0x4a684c=_0x5f4923;VisuMZ[_0x4a684c('0x88d')][_0x4a684c('0x7e2')][_0x4a684c('0x618')](this),this[_0x4a684c('0x67')]();},VisuMZ['BattleCore'][_0x5f4923('0x3cd')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x1d2')],Window_BattleLog[_0x5f4923('0x14f')]['pushBaseLine']=function(){const _0x475161=_0x5f4923;VisuMZ[_0x475161('0x88d')][_0x475161('0x3cd')][_0x475161('0x618')](this),this['callNextMethod']();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0xd4')]=Window_BattleLog['prototype'][_0x5f4923('0x5c5')],Window_BattleLog['prototype'][_0x5f4923('0x5c5')]=function(){const _0x2d875b=_0x5f4923;VisuMZ[_0x2d875b('0x88d')][_0x2d875b('0xd4')][_0x2d875b('0x618')](this),this[_0x2d875b('0x621')](),this['callNextMethod']();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x3b0')]=Window_BattleLog['prototype']['popupDamage'],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x252')]=function(_0x161d49){const _0x48f840=_0x5f4923;VisuMZ[_0x48f840('0x88d')][_0x48f840('0x3b0')][_0x48f840('0x618')](this,_0x161d49),this['callNextMethod']();},Window_BattleLog['prototype']['waitForNewLine']=function(){const _0x4f8476=_0x5f4923;let _0x4355ac=0x0;this['_baseLineStack'][_0x4f8476('0x568')]>0x0&&(_0x4355ac=this['_baseLineStack'][this[_0x4f8476('0x3f7')][_0x4f8476('0x568')]-0x1]);if(this[_0x4f8476('0x5d1')][_0x4f8476('0x568')]>_0x4355ac)this['wait']();else{if(_0x4f8476('0x337')==='DXCcn')this[_0x4f8476('0x67')]();else{function _0x4f8bb9(){const _0x290ffb=_0x4f8476,_0x2bef1b=_0x33c250[_0x290ffb('0x88d')]['Settings'][_0x290ffb('0x15d')];this['_flashColor']=_0x2bef1b['CriticalColor']['slice'](0x0),this['_flashDuration']=_0x2bef1b[_0x290ffb('0x33f')];}}}},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x5ac')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x42e')],Window_BattleLog[_0x5f4923('0x14f')]['performActionStart']=function(_0x50f577,_0x1c8d0e){const _0x51619e=_0x5f4923;VisuMZ['BattleCore'][_0x51619e('0x5ac')]['call'](this,_0x50f577,_0x1c8d0e),this['callNextMethod']();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x3f6')]=Window_BattleLog[_0x5f4923('0x14f')]['performAction'],Window_BattleLog[_0x5f4923('0x14f')]['performAction']=function(_0x1d7985,_0x9ddac1){const _0x3ea4e4=_0x5f4923;VisuMZ['BattleCore']['Window_BattleLog_performAction'][_0x3ea4e4('0x618')](this,_0x1d7985,_0x9ddac1),this['callNextMethod']();},VisuMZ[_0x5f4923('0x88d')]['Window_BattleLog_performActionEnd']=Window_BattleLog['prototype'][_0x5f4923('0x404')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x404')]=function(_0x308049){const _0xae50fd=_0x5f4923;for(const _0x2edaec of BattleManager[_0xae50fd('0x50d')]()){if(_0xae50fd('0x188')!==_0xae50fd('0x188')){function _0x343d3f(){const _0xd2abea=_0xae50fd;_0x43a38b[_0xd2abea('0x88d')][_0xd2abea('0x463')][_0xd2abea('0x618')](this,_0x3226ee);}}else{if(!_0x2edaec)continue;if(_0x2edaec[_0xae50fd('0x110')]())continue;_0x2edaec[_0xae50fd('0x404')]();}}this['callNextMethod']();},VisuMZ['BattleCore'][_0x5f4923('0x4ce')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x2c8')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x2c8')]=function(_0x22c386){const _0x2ef230=_0x5f4923;VisuMZ[_0x2ef230('0x88d')][_0x2ef230('0x4ce')][_0x2ef230('0x618')](this,_0x22c386),this[_0x2ef230('0x67')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x603')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x12e')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x12e')]=function(_0x3f9bfc){const _0x576c38=_0x5f4923;VisuMZ[_0x576c38('0x88d')][_0x576c38('0x603')][_0x576c38('0x618')](this,_0x3f9bfc),this['callNextMethod']();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x25')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x5a7')],Window_BattleLog['prototype'][_0x5f4923('0x5a7')]=function(_0x5396b7){const _0x3c6ba2=_0x5f4923;VisuMZ[_0x3c6ba2('0x88d')][_0x3c6ba2('0x25')]['call'](this,_0x5396b7),this[_0x3c6ba2('0x67')]();},VisuMZ['BattleCore']['Window_BattleLog_performEvasion']=Window_BattleLog['prototype'][_0x5f4923('0x5a6')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x5a6')]=function(_0x5ad531){const _0x586d3f=_0x5f4923;VisuMZ['BattleCore']['Window_BattleLog_performEvasion']['call'](this,_0x5ad531),this[_0x586d3f('0x67')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x357')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x3dd')],Window_BattleLog['prototype']['performMagicEvasion']=function(_0x3d7a5b){const _0x2e3e5e=_0x5f4923;VisuMZ['BattleCore']['Window_BattleLog_performMagicEvasion'][_0x2e3e5e('0x618')](this,_0x3d7a5b),this[_0x2e3e5e('0x67')]();},VisuMZ[_0x5f4923('0x88d')]['Window_BattleLog_performCounter']=Window_BattleLog['prototype'][_0x5f4923('0x5')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x5')]=function(_0x28e66e){const _0x12a071=_0x5f4923;VisuMZ[_0x12a071('0x88d')][_0x12a071('0x392')][_0x12a071('0x618')](this,_0x28e66e),this[_0x12a071('0x67')]();},VisuMZ[_0x5f4923('0x88d')][_0x5f4923('0x1cd')]=Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x619')],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x619')]=function(_0x2d4037){const _0xb49111=_0x5f4923;VisuMZ['BattleCore'][_0xb49111('0x1cd')][_0xb49111('0x618')](this,_0x2d4037),this['callNextMethod']();},VisuMZ['BattleCore']['Window_BattleLog_performSubstitute']=Window_BattleLog[_0x5f4923('0x14f')]['performSubstitute'],Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x386')]=function(_0x4063b6,_0x4c3c9d){const _0xa03064=_0x5f4923;VisuMZ[_0xa03064('0x88d')][_0xa03064('0x117')][_0xa03064('0x618')](this,_0x4063b6,_0x4c3c9d),this[_0xa03064('0x67')]();},VisuMZ['BattleCore'][_0x5f4923('0x1d1')]=Window_BattleLog[_0x5f4923('0x14f')]['performCollapse'],Window_BattleLog['prototype']['performCollapse']=function(_0x193fd4){const _0x551253=_0x5f4923;VisuMZ[_0x551253('0x88d')][_0x551253('0x1d1')][_0x551253('0x618')](this,_0x193fd4),this['callNextMethod']();},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x40d')]=function(_0x35b3da,_0x312a99){const _0x8031e=_0x5f4923;_0x35b3da[_0x8031e('0x40d')](_0x312a99),this[_0x8031e('0x67')]();},Window_BattleLog['prototype'][_0x5f4923('0xb9')]=function(_0x2ed22f,_0x43306f){const _0x12ea27=_0x5f4923,_0x2a2e3c=_0x2ed22f[_0x12ea27('0x2fa')]();if(_0x2a2e3c<=0x0)SoundManager[_0x12ea27('0x5d5')]();else{if('apiCm'===_0x12ea27('0x24d')){function _0x3ff230(){const _0x5c3259=_0x12ea27;_0x5dd4f8[_0x5c3259('0x629')]('cancel',this[_0x5c3259('0x7df')]['bind'](this));}}else this['showNormalAnimation'](_0x43306f,_0x2a2e3c);}},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x351')]=function(_0x33f1d3,_0x14a463,_0x1a8b84){const _0x175ca7=_0x5f4923,_0x264759=[_0x33f1d3][_0x175ca7('0x81e')](_0x14a463);for(const _0x510695 of _0x264759){if(!_0x510695)continue;_0x510695[_0x175ca7('0x225')](_0x1a8b84);}this[_0x175ca7('0x67')]();},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x844')]=function(_0x421e79){this['_waitCount']=_0x421e79;},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x18')]=function(_0x146090,_0x77fa6d){const _0x362d5d=_0x5f4923;for(const _0x575433 of _0x146090){if(_0x362d5d('0x175')===_0x362d5d('0x658')){function _0x5ddc6e(){const _0x5243bb=_0x362d5d;this[_0x5243bb('0x407')]('dying');}}else{if(!_0x575433)continue;_0x575433[_0x362d5d('0x18')](_0x77fa6d);}}this[_0x362d5d('0x67')]();},Window_BattleLog[_0x5f4923('0x14f')]['performMoveToPoint']=function(_0x454781,_0xc87d0f,_0x46e1ee,_0xde4175,_0xd8c192,_0x4449bd){const _0x169fb6=_0x5f4923;_0x454781[_0x169fb6('0x663')](_0xc87d0f,_0x46e1ee,_0xde4175,_0xd8c192,_0x4449bd,-0x1),this[_0x169fb6('0x67')]();},Window_BattleLog[_0x5f4923('0x14f')]['performMoveToTargets']=function(_0xd46a17,_0x359aed,_0x29638d,_0x5aa699,_0x4cef71,_0x3a02c8,_0x223e1b){const _0x859b05=_0x5f4923,_0x468994=Math[_0x859b05('0x6b4')](..._0x359aed[_0x859b05('0x17b')](_0x16ae2a=>_0x16ae2a[_0x859b05('0x17f')]()[_0x859b05('0x280')]-_0x16ae2a[_0x859b05('0x17f')]()[_0x859b05('0x290')]()/0x2)),_0x4b6712=Math['max'](..._0x359aed[_0x859b05('0x17b')](_0x215e6d=>_0x215e6d[_0x859b05('0x17f')]()[_0x859b05('0x280')]+_0x215e6d[_0x859b05('0x17f')]()[_0x859b05('0x290')]()/0x2)),_0x115bb=Math['min'](..._0x359aed[_0x859b05('0x17b')](_0x194410=>_0x194410[_0x859b05('0x17f')]()[_0x859b05('0x674')]-_0x194410[_0x859b05('0x17f')]()[_0x859b05('0x831')]())),_0x3b7626=Math[_0x859b05('0x489')](..._0x359aed[_0x859b05('0x17b')](_0x430405=>_0x430405[_0x859b05('0x17f')]()[_0x859b05('0x674')])),_0x1279d5=_0x359aed['filter'](_0x38c3a1=>_0x38c3a1[_0x859b05('0x1c3')]())['length'],_0x35f3db=_0x359aed['filter'](_0x16e07f=>_0x16e07f['isEnemy']())[_0x859b05('0x568')];let _0x3844ae=0x0,_0x3f319e=0x0;if(_0x29638d[_0x859b05('0x5ae')](/front/i)){if(_0x859b05('0x5f7')===_0x859b05('0x5f7'))_0x3844ae=_0x1279d5>=_0x35f3db?_0x468994:_0x4b6712;else{function _0x4e4faf(){const _0xc79199=_0x859b05;return _0x41452c[_0xc79199('0x7a1')]();}}}else{if(_0x29638d['match'](/middle/i)){if(_0x859b05('0x852')!==_0x859b05('0xe2'))_0x3844ae=(_0x468994+_0x4b6712)/0x2,_0x223e1b=-0x1;else{function _0x33a8a8(){const _0x37d0ce=_0x859b05;return this[_0x37d0ce('0x555')]()[_0x37d0ce('0x331')]['match'](/<DAMAGE CAP:[ ](\d+)>/i)?_0x796112(_0x200c5f['$1']):this['subject']()[_0x37d0ce('0x870')]();}}}else _0x29638d[_0x859b05('0x5ae')](/back/i)&&(_0x3844ae=_0x1279d5>=_0x35f3db?_0x4b6712:_0x468994);}if(_0x29638d[_0x859b05('0x5ae')](/head/i))_0x3f319e=_0x115bb;else{if(_0x29638d['match'](/center/i))_0x3f319e=(_0x115bb+_0x3b7626)/0x2;else _0x29638d['match'](/base/i)&&(_0x3f319e=_0x3b7626);}_0xd46a17[_0x859b05('0x663')](_0x3844ae,_0x3f319e,_0x5aa699,_0x4cef71,_0x3a02c8,_0x223e1b),this[_0x859b05('0x67')]();},Window_BattleLog[_0x5f4923('0x14f')][_0x5f4923('0x127')]=function(_0x57055c,_0xed2555,_0x5a90f4){const _0x192ecf=_0x5f4923;for(const _0x46729d of _0x57055c){if(_0x192ecf('0x5b0')!==_0x192ecf('0x816')){if(!_0x46729d)continue;_0x46729d[_0x192ecf('0x69')](_0xed2555,_0x5a90f4);}else{function _0x53114d(){const _0x322d50=_0x192ecf;_0x163605=_0x71a6af[_0x322d50('0x88d')]['JS'][_0x14c061][_0x322d50('0x618')](this,this[_0x322d50('0x394')](),_0x47c6b1,_0x5465dd,_0x11933d);if(_0x49ce25)_0x603afe=_0x1143d6;}}}this['callNextMethod']();};