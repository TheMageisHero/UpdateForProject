//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.08] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  visible = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optomized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @textm Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optomized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x4b16=['commandBuyItemsEquipsCore','playOkSound','MMSio','pviqM','jKxJl','powerUpColor','Nimhe','drawRemoveItem','IGWLg','_sellWindow','cursorLeft','STaeo','getItemSpeedLabel','CSCQN','meetsItemConditionsJS','AlreadyEquipMarker','_newItemsList','commandBuy','equipTypes','getDamageStyle','itemDataFontSize','dVxMI','StatusWindowWidth','Step1Start','helpWindowRect','activateSellWindow','paramJS','_categoryWindow','oytVH','buttonAssistRemove','agScs','sBDYw','iconWidth','TjKDe','hideDisabledCommands','_buttonAssistWindow','Game_BattlerBase_param','HOiPK','Window_ItemList_maxCols','LNfCP','update','_data','clearEquipments','oYZeE','Enable','isGoodShown','eoltb','buttonAssistSlotWindowShift','drawUpdatedAfterParamValue','processCursorHomeEndTrigger','lineHeight','getItemEffectsMpRecoveryLabel','createNewLabelSprite','_slotId','maxVisibleItems','normalColor','UOumZ','getItemEffectsMpRecoveryText','paramValueByName','windowPadding','addChild','isPlaytest','Window_EquipStatus_refresh','statusWindowRectItemsEquipsCore','dUowX','_list','createBitmap','createCategoryNameWindow','getItemRepeatsLabel','param','MaxMP','sell','HitType%1','itypeId','onSellOkItemsEquipsCore','dIQPF','shouldCommandWindowExist','buttonAssistItemListRequirement','getNextAvailableEtypeId','Scene_Shop_commandBuy','addInnerChild','djkqB','Scene_Equip_commandWindowRect','rWPxF','_purchaseOnly','Window_ShopSell_isEnabled','processCursorSpecialCheckModernControls','oXjxp','determineBaseSellingPrice','newLabelEnabled','cancel','ScopeRandomAny','_tempActor','nAsZF','NjKgh','HSMGm','textSizeEx','ARRAYSTRUCT','drawEquipData','buttonAssistSmallIncrement','ParamChangeFontSize','setItem','MCyUt','ConvertParams','drawItemOccasion','process_VisuMZ_ItemsEquipsCore_Category','drawItemDamageAmount','getItemDamageAmountTextOriginal','TP\x20RECOVERY','pagedown','qtTSg','iconText','isOpen','item','isDualWield','refresh','sEese','\x5cb%1\x5cb','DrawFaceJS','NemIR','hpRate','uiInputPosition','select','drawItemEffectsRemovedStatesBuffs','LabelRepeats','process_VisuMZ_ItemsEquipsCore_RegExp','equip','ujSge','BupRZ','onTouchSelectModern','aADrJ','getItemEffectsTpRecoveryLabel','drawItem','getItemOccasionText','HiddenItemA','isCursorMovable','repeats','onSlotOkAutoSelect','YtDYb','commandName','adjustItemWidthByStatus','onActorChange','EFFECT_RECOVER_HP','_buyWindow','buffIconIndex','BackRectColor','prepare','removeState','center','drawIcon','VisuMZ_1_MainMenuCore','GUEKw','ydaQS','armor-%1','Zdckh','checkShiftRemoveShortcut','qBROB','Scene_Shop_buyWindowRect','OYsOc','vPfFD','uHDWC','isNewItem','AorHH','_resetFontColor','slotWindowRect','Qlbio','playEquip','isEquipCommandAdded','npDyr','ConvertNumberToString','HIT\x20TYPE','JmsGF','etypeId','KEoZB','uiMenuStyle','asmdy','createCommandNameWindow','vFPsi','setupItemDamageTempActors','ceil','cursorPagedown','commandNameWindowDrawText','dRqzM','previousActor','FzHkW','FieldUsable','buyWindowRect','New','currencyUnit','_tempActorA','Scene_Shop_createSellWindow','LabelDamageMP','EFFECT_REMOVE_BUFF','armor','length','getItemScopeText','zBJaj','drawPossession','FQSUU','mainFontFace','CmdIconSell','EyICG','OffsetY','getItemEffectsHpRecoveryLabel','ppaYM','_calculatingJSParameters','DEwkr','getItemEffectsSelfTpGainLabel','VBzLd','addEquipCommand','isHovered','EFFECT_ADD_BUFF','_resetFontSize','Scene_Equip_onSlotCancel','loadPicture','RryGP','MP\x20DAMAGE','getColor','categoryNameWindowDrawText','EnableLayout','getItemRepeatsText','occasion','getItemEffectsMpDamageText','equipAdjustHpMp','kZqtg','drawItemDamageElement','AlwaysUsable','Window_Selectable_initialize','gainItem','Scene_Shop_activateSellWindow','Game_Actor_forceChangeEquip','processCursorMoveModernControls','LabelConsume','commandNameWindowCenter','deselect','processHandling','paramPlusItemsEquipsCoreCustomJS','refreshCursor','revertGlobalNamespaceVariables','create','MaxIcons','width','Translucent','_newLabelOpacityUpperLimit','rDjEG','VisuMZ_1_BattleCore','LabelDamageTP','eHSpD','innerWidth','auto','RemoveEquipText','buttonAssistOffset3','TkehY','Window_ItemList_drawItem','Window_ShopBuy_refresh','return\x200','vYXBF','tFcpK','currentClass','powerDownColor','WdCpB','hgShB','aCFcg','resetTextColor','FUNC','NonRemoveETypes','setTempActor','MAT','Scene_Shop_commandWindowRect','isUseItemsEquipsCoreUpdatedLayout','changeBuff','commandNameWindowDrawBackground','updateCategoryNameWindow','Game_Party_gainItem','TP\x20DAMAGE','drawItemStyleIconText','_scene','+%1%','Scene_Equip_createSlotWindow','ScopeAlliesButUser','adjustHiddenShownGoods','indexOf','drawItemHitType','IaIzT','kyMxF','nZDKX','drawItemCustomEntryLine','commandStyleCheck','DrawIcons','Scene_Equip_commandEquip','damage','_slotWindow','isOptimizeCommandAdded','drawItemEffectsSelfTpGain','Scene_Item_categoryWindowRect','(+%1)','dNFtU','refreshItemsEquipsCoreNoMenuImage','consumable','CommandAddClear','mJjvi','JcnwT','initialize','move','YfApX','isOptimizeEquipOk','commandSell','xCDww','onBuyCancel','isKeyItem','visible','LabelApply','MGhhH','makeDeepCopy','%1%','YZbvb','isShiftRemoveShortcutEnabled','formula','categories','pageup','SCOPE','getInputButtonString','iconHeight','Game_Actor_discardEquip','kYysD','dussr','effects','%1-%2','FontColor','drawItemEffectsMpRecovery','damageColor','onSlotCancel','CmdIconBuy','LabelRecoverTP','FontFace','parse','ItemMenuStatusRect','shift','zokrQ','EYFVX','canShiftRemoveEquipment','FIWdz','IKkvl','Whitelist','dfKhW','HLhGg','addClearCommand','FKqCH','convertInitEquipsToItems','postCreateSellWindowItemsEquipsCore','MaxArmors','ZLEfG','SellPriceRate','IeJqe','_commandNameWindow','popScene','NonOptimizeETypes','fillRect','initNewLabelSprites','duKKG','drawItemName','changeEquipById','versionId','hitIndex','value','categoryItemTypes','getItemEffectsAddedStatesBuffsText','CONSUMABLE','getItemDamageAmountLabel','AllItems','flatMP','VluZA','Window_EquipCommand_initialize','calcWindowHeight','ZyAjn','KbMtS','itemLineRect','kfVhd','ADDED\x20EFFECTS','createItemWindow','CJZOC','reloadMapIfUpdated','uZcBZ','EiaDi','isPressed','map','RegularItems','NUM','down','hide','isPageChangeRequested','categoryWindowRectItemsEquipsCore','value2','buttonAssistText1','allowCommandWindowCursorUp','Arxpl','createSlotWindow','_handlers','PUKIR','speed','flatHP','BattleUsable','_item','Scene_Shop_sellingPrice','onDatabaseLoaded','sellPriceRate','drawItemScope','loadCharacter','_customItemInfo','isRepeated','Scene_Equip_onActorChange','Scene_Item_createCategoryWindow','yCqHZ','_numberWindow','GfNYL','Kpppf','qWBCr','CXLry','EtIKo','Window_Selectable_setHelpWindowItem','categoryStyle','wWeSK','tpGain','elementId','getItemEffectsTpRecoveryText','boxWidth','NxbiS','CmdIconCancel','getItemConsumableText','Icon','trim','WzDsF','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','version','addLoadListener','Scene_Item_create','JMjbY','qzufZ','process_VisuMZ_ItemsEquipsCore_EnableJS','getItemHitTypeLabel','LIufl','FadeLimit','Nonconsumable','getItemEffectsRemovedStatesBuffsLabel','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ShowShopStatus','mpRate','getItemEffectsHpRecoveryText','itemPadding','EFFECT_GAIN_TP','getItemEffectsTpDamageLabel','MHksH','lmuwR','LKauq','drawItemStyleIcon','Categories','geUpdatedLayoutStatusWidth','_newLabelOpacityChange','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','EFFECT_REMOVE_DEBUFF','onSlotOk','isUseParamNamesWithIcons','ShopMenuStatusStandard','setNewItem','UbmIY','ZXctZ','Scene_Item_itemWindowRect','updateNewLabelOpacity','getItemSpeedText','Scene_Equip_slotWindowRect','ITuDQ','rcTMD','List','prototype','push','rqrcU','format','LabelDamageHP','commandWindowRectItemsEquipsCore','ShopScene','itemAt','numberWindowRect','EquipParams','OLUDS','LrGjx','icon','iarsT','OCCASION','jAfYc','armorTypes','onBuyCancelItemsEquipsCore','JskTG','sellingPrice','buttonAssistKey3','WAkeY','drawItemDarkRect','mainAreaTop','agZKY','MenuPortraits','Step2Start','getItemSuccessRateLabel','HP\x20DAMAGE','bitmap','ZAJOk','A%1','_bypassNewLabel','isShowNew','Scene_Shop_onBuyCancel','Blacklist','setTopRow','isMainMenuCoreMenuImageOptionAvailable','Scene_Shop_create','onTouchSelectModernControls','constructor','height','MhWjs','note','value1','hitType','NsJsF','statusWidth','0000','Param','Text','price','Zpwfw','_actor','wiJJm','itemTextAlign','placeNewLabel','log','CDcLR','_commandWindow','setStatusWindow','eCRFY','_statusWindow','right','ZMfHy','paramValueFontSize','clearNewLabelFromItem','KbOPr','yfDwg','isBottomHelpMode','NAGSW','RCNai','paramchangeTextColor','isEnabled','goldWindowRectItemsEquipsCore','RbMyp','kWAOz','item-%1','Scene_Shop_onSellOk','weaponTypes','commandStyle','beTIU','paintOpacity','isClicked','getItemSuccessRateText','kaNVs','getItemDamageAmountLabelBattleCore','CoreEngine','onCategoryCancel','addState','RZfuA','bBRCm','max','getItemEffectsSelfTpGainText','DrawItemData','callUpdateHelp','SellPriceJS','uZiOt','Vxiji','?????','Qswyg','drawItemRepeats','rateHP','numberWindowRectItemsEquipsCore','\x5cI[%1]','FUbBZ','ToKjk','TextAlign','removeDebuff','split','postCreateCategoryWindowItemsEquipsCore','Scene_ItemBase_activateItemWindow','mainAreaHeight','drawItemEffectsTpRecovery','EFFECT_ADD_STATE','createStatusWindow','Scene_Equip_onSlotOk','fVrsv','isHoverEnabled','kRSCt','postCreateSlotWindowItemsEquipsCore','commandEquip','isCancelled','DamageType%1','QwhTQ','isItem','ItemQuantityFontSize','kPZRm','CmdStyle','includes','vjofk','QUANTITY','RegExp','ExtDisplayedParams','setCategory','onTouchOk','drawItemActorMenuImage','NoChangeMarker','dJxgw','XaRrK','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','mainCommandWidth','money','setMp','smoothSelect','fontSizeRatio','getItemDamageAmountTextBattleCore','characterName','code','LUK','bJtmN','createSellWindow','isOptimizeCommandEnabled','weapon','ARRAYJSON','_buyWindowLastIndex','dWOfw','itemWindowRect','maxItems','LayoutStyle','refreshActorEquipSlotsIfUpdated','mainFontSize','eGsNm','smallParamFontSize','drawParamName','process_VisuMZ_ItemsEquipsCore_Prices','StatusWindow','getItemEffectsAddedStatesBuffsLabel','Window_Selectable_update','GRTFj','aZEwV','optKeyItemsNumber','setShopStatusWindowMode','ItemSceneAdjustItemList','currentEquippedItem','getItemEffectsRemovedStatesBuffsText','makeCommandList','knWYW','FontSize','helpAreaTop','drawText','process_VisuMZ_ItemsEquipsCore_Notetags','AGI','CnieG','_newLabelSprites','discardEquip','ListWindowCols','VisuMZ_0_CoreEngine','getItemQuantityText','ZmEUm','iconIndex','hideAdditionalSprites','modifiedBuyPriceItemsEquipsCore','Xsoqg','_dummyWindow','replace','updateHelp','pZOJT','Scene_Equip_itemWindowRect','Scene_Shop_prepare','ATK','drawItemEffectsAddedStatesBuffs','getTextColor','getItemEffectsTpDamageText','forceChangeEquip','yKBWc','CmIvH','lMgld','toUpperCase','ZZEYh','Step2End','defaultItemMax','splice','priceWidth','EFFECT_REMOVE_STATE','Scene_Shop_statusWindowRect','ItemScene','tAITQ','tpTpW','atk','itemEnableJS','text','toLSo','setHandler','Window_ItemCategory_setItemWindow','processShiftRemoveShortcut','Settings','oHIMS','Game_Actor_paramPlus','initNewItemsList','activateItemWindow','getItemColor','Speed0','MANUAL','MKQPL','scrollTo','CpnND','onTouchCancel','LabelSuccessRate','CommandAddOptimize','IncludeShopItem','isOpenAndActive','(%1)','LabelElement','mhp','resetFontSettings','drawItemKeyData','PurchaseOnly','wJXGD','process_VisuMZ_ItemsEquipsCore_ParamValues','categoryNameWindowCenter','JWUhL','isClearEquipOk','#%1','getItemEffectsHpDamageLabel','isUseModernControls','clearNewItem','Scene_Equip_statusWindowRect','ItemQuantityFmt','MaxHP','×%1','gDWgg','RdHBU','cTjrT','meetsItemConditions','VaePh','nextActor','isClearCommandEnabled','name','gainTP','setHp','contentsBack','Scene_Shop_sellWindowRect','USER\x20TP\x20GAIN','BNBnu','klgox','onCategoryOk','IconSet','textColor','equipSlots','ZXaDd','qABIb','clamp','removeStateBuffChanges','optimize','setObject','IFKYJ','canConsumeItem','setItemWindow','_money','HaPjx','left','category','Scene_Load_reloadMapIfUpdated','prepareRefreshItemsEquipsCoreLayout','placeItemNewLabel','match','aysFv','updateCommandNameWindow','meetsItemConditionsNotetags','DrawBackRect','systemColor','wSrQL','mzIBn','activate','drawItemSpeed','EBXtm','isRightInputMode','HP\x20RECOVERY','cursorPageup','makeItemData','MPVdK','allowCreateStatusWindow','parameters','ARRAYFUNC','Scene_Shop_onSellCancel','contents','mmp','cursorUp','OffsetX','Window_ShopCommand_initialize','categoryNameWindowDrawBackground','paramPlus','categoryList','jxAsf','W%1','rTFuu','prepareNewEquipSlotsOnLoad','fontSize','getItemDamageAmountText','cursorDown','nLrXM','buttonAssistText2','rFgLH','lXMvK','KeyItems','loadFaceImages','ElementWeapon','buttonAssistKey1','currentExt','getItemsEquipsCoreBackColor1','drawItemEffectsTpDamage','equip2','mcucl','Game_BattlerBase_meetsItemConditions','getMenuImage','CannotEquipMarker','addOptimizeCommand','optimizeEquipments','initEquips','HVSpy','ShiftShortcutKey','fill','drawItemData','CLldC','BuyPriceJS','processTouchModernControls','KeyItemProtect','drawItemConsumable','getItemHitTypeText','drawNewLabelIcon','floor','updatedLayoutStyle','gaugeBackColor','categoryStyleCheck','Occasion%1','clear','drawItemEquipType','successRate','clScO','changePaintOpacity','ParamValueFontSize','dataId','changeEquip','tradeItemWithParty','playCursorSound','sellWindowRect','_goodsCount','buy','CmdHideDisabled','drawItemEffectsHpDamage','HiddenItemB','oqCmv','_newLabelOpacity','pLYDL','BorderRegExp','lPfUD','JSON','numItems','index','onMenuImageLoad','addCommand','RgZnG','Consumable','buttonAssistText3','NzTyP','Scene_Shop_numberWindowRect','HZYoa','addBuyCommand','addItemCategory','EFFECT_ADD_DEBUFF','drawTextEx','drawItemEffectsMpDamage','helpAreaHeight','isArmor','DEF','Window_EquipItem_isEnabled','oHIbj','isHandled','isCommandEnabled','RWNef','drawItemCustomEntries','drawParamsItemsEquipsCore','paramId','call','mCEuF','boVit','MultiplierStandard','buttonAssistKey2','Scene_Item_createItemWindow','getInputMultiButtonStrings','commandSellItemsEquipsCore','round','addStateBuffChanges','Window_Selectable_refresh','playBuzzerSound','maxCols','helpWindowRectItemsEquipsCore','ScopeRandomEnemies','IowQJ','noMNk','ItemsEquipsCore','weapon-%1','isEquipped','isWeapon','Speed2000','Game_Actor_changeEquip','buttonAssistLargeIncrement','ZHfvK','mainAreaBottom','Game_Actor_tradeItemWithParty','_category','TtMLh','REPEAT','_categoryNameWindow','prepareItemCustomData','createCategoryWindow','keyItem','isTriggered','goldWindowRect','FRpIZ','isEquipCommandEnabled','pLxfR','QCCLl','gLuuT','drawNewLabelText','MaxWeapons','VzfQv','aIwJG','maxItemAmount','drawItemEffectsHpRecovery','Jqnrm','getItemDamageElementLabel','ddoDi','QgiAd','possession','DjzyD','drawParamText','REMOVED\x20EFFECTS','twRvB','bind','_equips','MMoNJ','buyWindowRectItemsEquipsCore','SpeedNeg1999','categoryWindowRect','isClearCommandAdded','rateMP','isEquipItem','DrawPortraitJS','commandWindowRect','GcAYT','_itemWindow','_itemData','eHaGZ','drawItemEffects','Scope%1','Window_ItemList_colSpacing','Scene_Shop_onCategoryCancel','getItemsEquipsCoreBackColor2','JxEDJ','Window_ItemList_updateHelp','AMKXz','canEquip','ScopeRandomAllies','Scene_Shop_commandSell','Window_EquipItem_includes','actor','drawUpdatedParamValueDiff','uDlit','nonRemovableEtypes','exit','changeTextColor','Window_ItemCategory_initialize','bestEquipItem','type','MP\x20RECOVERY','Scene_Shop_goldWindowRect','isEquipChangeOk','getItemDamageElementText','_shopStatusMenuMode','MDCya','ZvZqq','equips','bsrPh','itemWindowRectItemsEquipsCore','wrWjD','kPxiO','fcnET','Scene_Shop_createCategoryWindow','uiHelpPosition','IeELO','updateMoneyAmount','Dgwmn','deactivate','JJZIL','sellWindowRectItemsEquipsCore','LabelRemove','_tempActorB','releaseUnequippableItems','Game_Party_initialize','_doubleTouch','Step3Start','blpgk','CmdCancelRename','MyxuJ','smoothScrollTo','BXVUU','ELEMENT','WrSQD','zAsIU','BatchShop','NeverUsable','IqtHc','hideNewLabelSprites','znmsa','setHelpWindowItem','buttonAssistCategory','isBuyCommandEnabled','Scene_Boot_onDatabaseLoaded','EquipScene','active','ZmxZC','lLkHt','drawItemNumber','DrawParamJS','cursorRight','getMatchingInitEquip','textWidth','onSellOk','onSellCancel','show','+%1','opacity','_shopStatusMenuAlly','ZcyBe','CmdIconOptimize','Step1End','Width','loadSystem','LabelRecoverMP','MDF','isSellCommandEnabled','colSpacing','XiIXM','LabelSelfGainTP','postCreateItemsEquipsCore','statusWindowRect','currentSymbol','scope','LaUAv','GHbfQ','Step3End','selfTP','getItemEffectsMpDamageLabel','\x5cI[%1]%2','CmdTextAlign','checkItemConditionsSwitchNotetags','slotWindowRectItemsEquipsCore','ARRAYSTR','VocLm','100%','ElementNone','Kkodg','dxzcY','rjrUP','onTouchSelect','getItemDamageAmountLabelOriginal','nonOptimizeEtypes','lJqgg','onCategoryCancelItemsEquipsCore','params','qqfMt','process_VisuMZ_ItemsEquipsCore_ParamJS','values','Ayavq','DrawEquipData','WAHaS','Window_ShopBuy_price','dMOut','getItemEffectsHpDamageText','oAnuV'];(function(_0x1881c3,_0x4b169f){const _0x116f86=function(_0x11fc21){while(--_0x11fc21){_0x1881c3['push'](_0x1881c3['shift']());}};_0x116f86(++_0x4b169f);}(_0x4b16,0x94));const _0x116f=function(_0x1881c3,_0x4b169f){_0x1881c3=_0x1881c3-0x0;let _0x116f86=_0x4b16[_0x1881c3];return _0x116f86;};const _0x507ed6=_0x116f;var label=_0x507ed6('0x2f4'),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x2dad10){const _0x186a37=_0x507ed6;return _0x2dad10['status']&&_0x2dad10['description'][_0x186a37('0x1c6')]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x507ed6('0x227')]||{},VisuMZ[_0x507ed6('0x410')]=function(_0x239e80,_0x16edf6){const _0x101af9=_0x507ed6;for(const _0x2b5325 in _0x16edf6){if(_0x2b5325['match'](/(.*):(.*)/i)){if(_0x101af9('0x10a')===_0x101af9('0x10a')){const _0x2ccd69=String(RegExp['$1']),_0x32c049=String(RegExp['$2'])[_0x101af9('0x215')]()[_0x101af9('0x11a')]();let _0x2ef4cd,_0x2f48bd,_0x28ae0d;switch(_0x32c049){case _0x101af9('0xef'):_0x2ef4cd=_0x16edf6[_0x2b5325]!==''?Number(_0x16edf6[_0x2b5325]):0x0;break;case'ARRAYNUM':_0x2f48bd=_0x16edf6[_0x2b5325]!==''?JSON['parse'](_0x16edf6[_0x2b5325]):[],_0x2ef4cd=_0x2f48bd[_0x101af9('0xed')](_0x3e16de=>Number(_0x3e16de));break;case'EVAL':_0x2ef4cd=_0x16edf6[_0x2b5325]!==''?eval(_0x16edf6[_0x2b5325]):null;break;case'ARRAYEVAL':_0x2f48bd=_0x16edf6[_0x2b5325]!==''?JSON[_0x101af9('0xbb')](_0x16edf6[_0x2b5325]):[],_0x2ef4cd=_0x2f48bd['map'](_0x1fb353=>eval(_0x1fb353));break;case _0x101af9('0x2c8'):_0x2ef4cd=_0x16edf6[_0x2b5325]!==''?JSON[_0x101af9('0xbb')](_0x16edf6[_0x2b5325]):'';break;case _0x101af9('0x1df'):_0x2f48bd=_0x16edf6[_0x2b5325]!==''?JSON[_0x101af9('0xbb')](_0x16edf6[_0x2b5325]):[],_0x2ef4cd=_0x2f48bd[_0x101af9('0xed')](_0x12a4d4=>JSON['parse'](_0x12a4d4));break;case _0x101af9('0x74'):_0x2ef4cd=_0x16edf6[_0x2b5325]!==''?new Function(JSON['parse'](_0x16edf6[_0x2b5325])):new Function(_0x101af9('0x6b'));break;case _0x101af9('0x27f'):_0x2f48bd=_0x16edf6[_0x2b5325]!==''?JSON[_0x101af9('0xbb')](_0x16edf6[_0x2b5325]):[],_0x2ef4cd=_0x2f48bd['map'](_0x3966f3=>new Function(JSON['parse'](_0x3966f3)));break;case'STR':_0x2ef4cd=_0x16edf6[_0x2b5325]!==''?String(_0x16edf6[_0x2b5325]):'';break;case _0x101af9('0x392'):_0x2f48bd=_0x16edf6[_0x2b5325]!==''?JSON[_0x101af9('0xbb')](_0x16edf6[_0x2b5325]):[],_0x2ef4cd=_0x2f48bd['map'](_0x132622=>String(_0x132622));break;case'STRUCT':_0x28ae0d=_0x16edf6[_0x2b5325]!==''?JSON[_0x101af9('0xbb')](_0x16edf6[_0x2b5325]):{},_0x239e80[_0x2ccd69]={},VisuMZ[_0x101af9('0x410')](_0x239e80[_0x2ccd69],_0x28ae0d);continue;case _0x101af9('0x40a'):_0x2f48bd=_0x16edf6[_0x2b5325]!==''?JSON['parse'](_0x16edf6[_0x2b5325]):[],_0x2ef4cd=_0x2f48bd[_0x101af9('0xed')](_0xdaf102=>VisuMZ[_0x101af9('0x410')]({},JSON[_0x101af9('0xbb')](_0xdaf102)));break;default:continue;}_0x239e80[_0x2ccd69]=_0x2ef4cd;}else{function _0x73784d(){const _0x553374=_0x101af9;return _0xf5c851[_0x553374('0x2f4')][_0x553374('0x227')][_0x553374('0x14b')]['CmdTextAlign'];}}}}return _0x239e80;},(_0x45a48a=>{const _0x5796f8=_0x507ed6,_0x3ee0a5=_0x45a48a[_0x5796f8('0x251')];for(const _0x2db6e3 of dependencies){if(!Imported[_0x2db6e3]){alert(_0x5796f8('0x128')['format'](_0x3ee0a5,_0x2db6e3)),SceneManager[_0x5796f8('0x33a')]();break;}}const _0x358597=_0x45a48a['description'];if(_0x358597[_0x5796f8('0x26d')](/\[Version[ ](.*?)\]/i)){if(_0x5796f8('0x314')!==_0x5796f8('0x314')){function _0x1ad56f(){const _0x38e964=_0x5796f8;return _0x41c68f[_0x38e964('0x2f4')]['Settings']['StatusWindow'][_0x38e964('0x395')];}}else{const _0x1a267a=Number(RegExp['$1']);_0x1a267a!==VisuMZ[label][_0x5796f8('0x11d')]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5796f8('0x148')](_0x3ee0a5,_0x1a267a)),SceneManager['exit']());}}if(_0x358597[_0x5796f8('0x26d')](/\[Tier[ ](\d+)\]/i)){const _0x37412f=Number(RegExp['$1']);if(_0x37412f<tier){if(_0x5796f8('0x89')===_0x5796f8('0x89'))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5796f8('0x148')](_0x3ee0a5,_0x37412f,tier)),SceneManager[_0x5796f8('0x33a')]();else{function _0x17dd5b(){_0x38b5aa=_0x45b6ea+_0x1b1abb-_0x2f0010['width'];}}}else{if(_0x5796f8('0x1b')!=='asmdy'){function _0x59d9bd(){const _0x6533c9=_0x5796f8;this[_0x6533c9('0x16c')](![]);}}else tier=Math[_0x5796f8('0x1a1')](_0x37412f,tier);}}VisuMZ[_0x5796f8('0x410')](VisuMZ[label]['Settings'],_0x45a48a[_0x5796f8('0x27e')]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x507ed6('0x362'),_0x43b98b=>{const _0x1b76d7=_0x507ed6;VisuMZ['ConvertParams'](_0x43b98b,_0x43b98b);const _0x403a7f=[],_0x5cc3ff=_0x43b98b[_0x1b76d7('0x168')][_0x1b76d7('0xed')](_0x2ffe9b=>_0x2ffe9b[_0x1b76d7('0x215')]()['trim']()),_0x2cfff2=_0x43b98b[_0x1b76d7('0xc3')][_0x1b76d7('0xed')](_0x201abf=>_0x201abf[_0x1b76d7('0x215')]()['trim']()),_0x17af12=_0x43b98b[_0x1b76d7('0x37c')]>=_0x43b98b['Step1Start']?_0x43b98b[_0x1b76d7('0x3c0')]:_0x43b98b[_0x1b76d7('0x37c')],_0xbef332=_0x43b98b[_0x1b76d7('0x37c')]>=_0x43b98b[_0x1b76d7('0x3c0')]?_0x43b98b[_0x1b76d7('0x37c')]:_0x43b98b['Step1Start'],_0x3cec76=Array(_0xbef332-_0x17af12+0x1)['fill']()[_0x1b76d7('0xed')]((_0x2ba6c6,_0x5a5f23)=>_0x17af12+_0x5a5f23);for(const _0x283c0b of _0x3cec76){const _0x711174=$dataItems[_0x283c0b];if(!_0x711174)continue;if(!VisuMZ[_0x1b76d7('0x2f4')]['IncludeShopItem'](_0x711174,_0x5cc3ff,_0x2cfff2))continue;_0x403a7f[_0x1b76d7('0x146')]([0x0,_0x283c0b,0x0,_0x711174[_0x1b76d7('0x178')]]);}const _0x2e80ba=_0x43b98b[_0x1b76d7('0x217')]>=_0x43b98b[_0x1b76d7('0x15f')]?_0x43b98b[_0x1b76d7('0x15f')]:_0x43b98b['Step2End'],_0x55f7cb=_0x43b98b[_0x1b76d7('0x217')]>=_0x43b98b[_0x1b76d7('0x15f')]?_0x43b98b['Step2End']:_0x43b98b[_0x1b76d7('0x15f')],_0x320cda=Array(_0x55f7cb-_0x2e80ba+0x1)['fill']()['map']((_0x51bdb6,_0x43e37c)=>_0x2e80ba+_0x43e37c);for(const _0x237274 of _0x320cda){const _0x19e62b=$dataWeapons[_0x237274];if(!_0x19e62b)continue;if(!VisuMZ['ItemsEquipsCore']['IncludeShopItem'](_0x19e62b,_0x5cc3ff,_0x2cfff2))continue;_0x403a7f[_0x1b76d7('0x146')]([0x1,_0x237274,0x0,_0x19e62b[_0x1b76d7('0x178')]]);}const _0x4e5e45=_0x43b98b[_0x1b76d7('0x38b')]>=_0x43b98b[_0x1b76d7('0x359')]?_0x43b98b[_0x1b76d7('0x359')]:_0x43b98b['Step3End'],_0x48eb8d=_0x43b98b['Step3End']>=_0x43b98b['Step3Start']?_0x43b98b[_0x1b76d7('0x38b')]:_0x43b98b[_0x1b76d7('0x359')],_0x1fc7e5=Array(_0x48eb8d-_0x4e5e45+0x1)[_0x1b76d7('0x2a5')]()['map']((_0x2f9552,_0x1c7336)=>_0x4e5e45+_0x1c7336);for(const _0x147238 of _0x1fc7e5){if(_0x1b76d7('0x3e9')!==_0x1b76d7('0x317')){const _0x28bdc0=$dataArmors[_0x147238];if(!_0x28bdc0)continue;if(!VisuMZ[_0x1b76d7('0x2f4')][_0x1b76d7('0x235')](_0x28bdc0,_0x5cc3ff,_0x2cfff2))continue;_0x403a7f[_0x1b76d7('0x146')]([0x2,_0x147238,0x0,_0x28bdc0['price']]);}else{function _0x290bd4(){const _0xc4e110=_0x1b76d7,_0x4d9a8d=this['_commandNameWindow'];_0x4d9a8d[_0xc4e110('0x281')]['clear']();const _0x244f1e=this['commandStyleCheck'](this[_0xc4e110('0x2ca')]());if(_0x244f1e===_0xc4e110('0x151')){const _0xd7baa7=this['itemLineRect'](this['index']());let _0x3e8edb=this['commandName'](this['index']());_0x3e8edb=_0x3e8edb[_0xc4e110('0x208')](/\\I\[(\d+)\]/gi,''),_0x4d9a8d['resetFontSettings'](),this[_0xc4e110('0x7b')](_0x3e8edb,_0xd7baa7),this['commandNameWindowDrawText'](_0x3e8edb,_0xd7baa7),this[_0xc4e110('0x55')](_0x3e8edb,_0xd7baa7);}}}}SceneManager[_0x1b76d7('0x146')](Scene_Shop),SceneManager['prepareNextScene'](_0x403a7f,_0x43b98b[_0x1b76d7('0x23c')]);}),VisuMZ['ItemsEquipsCore'][_0x507ed6('0x235')]=function(_0x23378e,_0x3768d3,_0x55ce15){const _0x44b075=_0x507ed6;if(_0x23378e[_0x44b075('0x251')][_0x44b075('0x11a')]()==='')return![];if(_0x23378e[_0x44b075('0x251')][_0x44b075('0x26d')](/-----/i))return![];const _0x39064c=_0x23378e[_0x44b075('0xaa')];if(_0x3768d3[_0x44b075('0x2e')]>0x0)for(const _0x752018 of _0x3768d3){if(!_0x752018)continue;if(_0x39064c['includes'](_0x752018))return![];}if(_0x55ce15[_0x44b075('0x2e')]>0x0){for(const _0x1496ef of _0x55ce15){if(!_0x1496ef)continue;if(_0x39064c[_0x44b075('0x1c6')](_0x1496ef))return!![];}return![];}return!![];},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x36a')]=Scene_Boot['prototype'][_0x507ed6('0x100')],Scene_Boot[_0x507ed6('0x145')]['onDatabaseLoaded']=function(){const _0x5b2407=_0x507ed6;VisuMZ[_0x5b2407('0x2f4')][_0x5b2407('0x36a')][_0x5b2407('0x2e3')](this),this[_0x5b2407('0x426')](),this[_0x5b2407('0x1fa')]();},Scene_Boot[_0x507ed6('0x145')]['process_VisuMZ_ItemsEquipsCore_RegExp']=function(){const _0x454a47=_0x507ed6;VisuMZ['ItemsEquipsCore'][_0x454a47('0x1c9')]={},VisuMZ[_0x454a47('0x2f4')]['RegExp']['EquipParams']=[],VisuMZ[_0x454a47('0x2f4')]['RegExp'][_0x454a47('0x2c6')]=[];const _0x29292b=[_0x454a47('0x248'),_0x454a47('0x3ef'),_0x454a47('0x20d'),_0x454a47('0x2da'),_0x454a47('0x77'),'MDF',_0x454a47('0x1fb'),_0x454a47('0x1da')];for(const _0x454745 of _0x29292b){const _0x13f9ea='<%1:[\x20]([\x5c+\x5c-]\x5cd+)>'[_0x454a47('0x148')](_0x454745);VisuMZ[_0x454a47('0x2f4')]['RegExp'][_0x454a47('0x14e')][_0x454a47('0x146')](new RegExp(_0x13f9ea,'i'));const _0x24cb02='\x5cb%1\x5cb'[_0x454a47('0x148')](_0x454745);VisuMZ['ItemsEquipsCore']['RegExp'][_0x454a47('0x2c6')]['push'](new RegExp(_0x24cb02,'g'));}},Scene_Boot[_0x507ed6('0x145')][_0x507ed6('0x1fa')]=function(){const _0x2af131=_0x507ed6;this['process_VisuMZ_ItemsEquipsCore_EquipSlots']();const _0x5aeeb0=[$dataItems,$dataWeapons,$dataArmors];for(const _0x380534 of _0x5aeeb0){for(const _0x268f65 of _0x380534){if(_0x2af131('0x309')==='iDVWr'){function _0x15215b(){const _0xb7f254=_0x2af131;return _0x27a7ab[_0xb7f254('0x2f4')][_0xb7f254('0x227')][_0xb7f254('0x1eb')][_0xb7f254('0x2ce')];}}else{if(!_0x268f65)continue;this[_0x2af131('0x412')](_0x268f65,_0x380534),this[_0x2af131('0x1ea')](_0x268f65,_0x380534),this[_0x2af131('0x23e')](_0x268f65,_0x380534),this[_0x2af131('0x3a0')](_0x268f65,_0x380534),this[_0x2af131('0x122')](_0x268f65,_0x380534);}}}},Scene_Boot[_0x507ed6('0x145')]['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x792215=_0x507ed6;for(const _0x2e40cf of $dataClasses){if(!_0x2e40cf)continue;_0x2e40cf[_0x792215('0x25c')]=[];if(_0x2e40cf[_0x792215('0x170')][_0x792215('0x26d')](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if('kaNVs'===_0x792215('0x19a')){const _0x519716=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x41c2cd of _0x519716){const _0xcad7a6=$dataSystem[_0x792215('0x3bb')][_0x792215('0x85')](_0x41c2cd[_0x792215('0x11a')]());if(_0xcad7a6>0x0)_0x2e40cf[_0x792215('0x25c')][_0x792215('0x146')](_0xcad7a6);}}else{function _0x5b87f3(){const _0x5681ca=_0x792215;_0x59dc2f['VisuMZ_0_CoreEngine']?(_0x4d25be=this[_0x5681ca('0x17a')][_0x5681ca('0x3e3')](_0x3154d6,![]),_0x2fb0dc=this[_0x5681ca('0x405')][_0x5681ca('0x3e3')](_0x7bed11,![]),_0x5d8431=_0x10cf74(this[_0x5681ca('0x17a')][_0x5681ca('0x3e3')](_0x5eb599,!![]))[_0x5681ca('0x26d')](/([%％])/i)):(_0x47d8fe=this[_0x5681ca('0x17a')][_0x5681ca('0x3ee')](_0x86328f),_0x4b261b=this[_0x5681ca('0x405')][_0x5681ca('0x3ee')](_0x4ff4b4),_0x5a611c=_0x588851%0x1!==0x0||_0x4b0943%0x1!==0x0);const _0x4f3f3e=_0x2ab337,_0x2597eb=_0x3a132e,_0x36bf42=_0x2597eb-_0x4f3f3e;let _0x365ee6=_0x36bf42;if(_0x297a32)_0x365ee6=_0x5ccf35[_0x5681ca('0x2eb')](_0x36bf42*0x64)+'%';_0x36bf42!==0x0&&(this[_0x5681ca('0x33b')](_0x478078['paramchangeTextColor'](_0x36bf42)),_0x365ee6=(_0x36bf42>0x0?'(+%1)':_0x5681ca('0x237'))[_0x5681ca('0x148')](_0x365ee6),this['drawText'](_0x365ee6,_0x582c51+_0x245a44,_0x38b5c7,_0x33cd5a,_0x5681ca('0x268')));}}}else for(const _0xc76bfc of $dataSystem[_0x792215('0x3bb')]){const _0x14b31f=$dataSystem[_0x792215('0x3bb')][_0x792215('0x85')](_0xc76bfc[_0x792215('0x11a')]());if(_0x14b31f>0x0)_0x2e40cf[_0x792215('0x25c')][_0x792215('0x146')](_0x14b31f);}}},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_Category']=function(_0x12ce2a,_0x3b1ea7){const _0x2348ba=_0x507ed6;_0x12ce2a['categories']=[];const _0x325554=_0x12ce2a[_0x2348ba('0x170')],_0x7acd4b=_0x325554[_0x2348ba('0x26d')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x7acd4b)for(const _0x11dbf5 of _0x7acd4b){_0x11dbf5[_0x2348ba('0x26d')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x436f08=String(RegExp['$1'])[_0x2348ba('0x215')]()[_0x2348ba('0x11a')]()[_0x2348ba('0x1b2')](',');for(const _0x512b89 of _0x436f08){_0x12ce2a[_0x2348ba('0xaa')][_0x2348ba('0x146')](_0x512b89[_0x2348ba('0x11a')]());}}if(_0x325554[_0x2348ba('0x26d')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x2348ba('0x10c')!==_0x2348ba('0x10c')){function _0x465f35(){const _0x42e11b=_0x2348ba;_0x39b53b=_0x212290[_0x42e11b('0x1a1')](_0x5e9aaf||0x1,0x1);while(_0x2c3774--){_0x400d50=_0x5b8ae5||this[_0x42e11b('0x3db')](),this['contentsBack'][_0x42e11b('0x197')]=0xa0;const _0x335848=_0xb6c290[_0x42e11b('0x2b0')]();this[_0x42e11b('0x254')]['fillRect'](_0x51f649+0x1,_0xe648cf+0x1,_0x638ffe-0x2,_0x428921-0x2,_0x335848),this['contentsBack'][_0x42e11b('0x197')]=0xff;}}}else{const _0x2fe7d6=RegExp['$1']['split'](/[\r\n]+/);for(const _0x1fa26c of _0x2fe7d6){_0x12ce2a['categories'][_0x2348ba('0x146')](_0x1fa26c[_0x2348ba('0x215')]()[_0x2348ba('0x11a')]());}}}},Scene_Boot[_0x507ed6('0x145')][_0x507ed6('0x1ea')]=function(_0x15a250,_0x209362){const _0x3162b3=_0x507ed6;if(_0x15a250['note']['match'](/<PRICE:[ ](\d+)>/i)){if(_0x3162b3('0xcb')!==_0x3162b3('0x30e'))_0x15a250[_0x3162b3('0x178')]=Number(RegExp['$1']);else{function _0x4b7be2(){const _0x5e3385=_0x3162b3;return _0xe072d7[_0x5e3385('0x2f4')][_0x5e3385('0x227')][_0x5e3385('0x21d')][_0x5e3385('0xbc')]['call'](this);}}}},Scene_Boot['prototype'][_0x507ed6('0x23e')]=function(_0x10eb31,_0x144dab){const _0xa09461=_0x507ed6;if(_0x144dab===$dataItems)return;for(let _0x495ca4=0x0;_0x495ca4<0x8;_0x495ca4++){const _0x1d08a=VisuMZ[_0xa09461('0x2f4')][_0xa09461('0x1c9')][_0xa09461('0x14e')][_0x495ca4];if(_0x10eb31[_0xa09461('0x170')][_0xa09461('0x26d')](_0x1d08a)){if('ITuDQ'===_0xa09461('0x142'))_0x10eb31[_0xa09461('0x39e')][_0x495ca4]=parseInt(RegExp['$1']);else{function _0x180274(){const _0x5cda87=_0xa09461;this[_0x5cda87('0x20')]();}}}}},VisuMZ['ItemsEquipsCore']['paramJS']={},Scene_Boot[_0x507ed6('0x145')]['process_VisuMZ_ItemsEquipsCore_ParamJS']=function(_0x4f82a3,_0x4956ae){const _0x29b81a=_0x507ed6;if(_0x4956ae===$dataItems)return;if(_0x4f82a3[_0x29b81a('0x170')][_0x29b81a('0x26d')](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x5c1909=String(RegExp['$1']),_0x2efde5=(_0x4956ae===$dataWeapons?_0x29b81a('0x28a'):_0x29b81a('0x164'))[_0x29b81a('0x148')](_0x4f82a3['id']),_0x4fbec3=_0x29b81a('0x1d1')[_0x29b81a('0x148')](_0x5c1909);for(let _0x335299=0x0;_0x335299<0x8;_0x335299++){if(_0x5c1909[_0x29b81a('0x26d')](VisuMZ['ItemsEquipsCore'][_0x29b81a('0x1c9')][_0x29b81a('0x2c6')][_0x335299])){if(_0x29b81a('0x32f')!==_0x29b81a('0x360')){const _0x3d4954=_0x29b81a('0xb3')[_0x29b81a('0x148')](_0x2efde5,_0x335299);VisuMZ[_0x29b81a('0x2f4')][_0x29b81a('0x3c3')][_0x3d4954]=new Function(_0x29b81a('0x41a'),_0x29b81a('0x2e2'),_0x4fbec3);}else{function _0x7fd615(){const _0x49097a=_0x29b81a;return this[_0x49097a('0x19b')]();}}}}}},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x221')]={},Scene_Boot[_0x507ed6('0x145')]['process_VisuMZ_ItemsEquipsCore_EnableJS']=function(_0x7ee03d,_0x232527){const _0x326dc1=_0x507ed6;if(_0x232527!==$dataItems)return;if(_0x7ee03d[_0x326dc1('0x170')][_0x326dc1('0x26d')](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x326dc1('0xb0')===_0x326dc1('0xb0')){const _0x4e9e5d=String(RegExp['$1']),_0x41bf80=_0x326dc1('0x136')[_0x326dc1('0x148')](_0x4e9e5d);VisuMZ[_0x326dc1('0x2f4')][_0x326dc1('0x221')][_0x7ee03d['id']]=new Function('item',_0x41bf80);}else{function _0x509cef(){const _0x53252c=_0x326dc1;_0x41d3b3[_0x53252c('0x2f4')][_0x53252c('0x1b4')]['call'](this),this[_0x53252c('0x327')]['callUpdateHelp']();}}}},DataManager[_0x507ed6('0xa1')]=function(_0x25bef8){const _0x1435d1=_0x507ed6;return this[_0x1435d1('0x1c2')](_0x25bef8)&&_0x25bef8['itypeId']===0x2;},DataManager[_0x507ed6('0x310')]=function(_0x1570c2){const _0x1b5bf9=_0x507ed6;if(!_0x1570c2)return 0x63;else{if(_0x1570c2[_0x1b5bf9('0x170')][_0x1b5bf9('0x26d')](/<MAX:[ ](\d+)>/i)){if(_0x1b5bf9('0x216')===_0x1b5bf9('0x216'))return parseInt(RegExp['$1']);else{function _0x46ad1e(){const _0x4e9966=_0x1b5bf9;_0x24eeca+=_0x4bed49[_0x4e9966('0x3c9')]+0x4;}}}else{if(_0x1b5bf9('0xea')==='Aeuhl'){function _0x4cfc51(){const _0x361170=_0x1b5bf9;_0x8b3ba8[_0x361170('0x378')]=this['_newLabelOpacity'];}}else return this['defaultItemMax'](_0x1570c2);}}},DataManager[_0x507ed6('0x218')]=function(_0x169773){const _0x343a60=_0x507ed6;if(this[_0x343a60('0x1c2')](_0x169773))return VisuMZ[_0x343a60('0x2f4')][_0x343a60('0x227')][_0x343a60('0x21d')]['MaxItems'];else{if(this[_0x343a60('0x2f7')](_0x169773))return VisuMZ[_0x343a60('0x2f4')][_0x343a60('0x227')][_0x343a60('0x21d')][_0x343a60('0x30d')];else{if(this[_0x343a60('0x2d9')](_0x169773))return VisuMZ[_0x343a60('0x2f4')][_0x343a60('0x227')][_0x343a60('0x21d')][_0x343a60('0xca')];}}},ColorManager[_0x507ed6('0x22c')]=function(_0x470251){const _0x4df514=_0x507ed6;if(!_0x470251)return this[_0x4df514('0x3e0')]();else{if(_0x470251[_0x4df514('0x170')][_0x4df514('0x26d')](/<COLOR:[ ](\d+)>/i)){if(_0x4df514('0x1fc')!=='CnieG'){function _0x3dd31e(){const _0x2fc98b=_0x4df514;return this[_0x2fc98b('0x3ea')]?this['_list'][_0x2fc98b('0x2e')]:0x3;}}else return this[_0x4df514('0x25b')](Number(RegExp['$1'])[_0x4df514('0x25f')](0x0,0x1f));}else return _0x470251['note'][_0x4df514('0x26d')](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x4df514('0x3e0')]();}},ColorManager[_0x507ed6('0x45')]=function(_0x1f6ba0){const _0xf37eac=_0x507ed6;return _0x1f6ba0=String(_0x1f6ba0),_0x1f6ba0[_0xf37eac('0x26d')](/#(.*)/i)?'#%1'[_0xf37eac('0x148')](String(RegExp['$1'])):this[_0xf37eac('0x25b')](Number(_0x1f6ba0));},Game_Temp[_0x507ed6('0x145')][_0x507ed6('0x402')]=function(){const _0x62ead0=_0x507ed6;if(this[_0x62ead0('0x165')])return![];return VisuMZ[_0x62ead0('0x2f4')][_0x62ead0('0x227')][_0x62ead0('0x27')][_0x62ead0('0x3d5')];},VisuMZ[_0x507ed6('0x13a')]=VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x227')][_0x507ed6('0x1eb')][_0x507ed6('0x2e6')],VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x3cd')]=Game_BattlerBase['prototype'][_0x507ed6('0x3ee')],Game_BattlerBase[_0x507ed6('0x145')][_0x507ed6('0x3ee')]=function(_0x943ab2){const _0x14d4c4=_0x507ed6;if(this[_0x14d4c4('0x343')]){if(_0x14d4c4('0x173')==='NsJsF')return this['_shopStatusMenuAlly']?VisuMZ['ShopMenuStatusStandard']:0x1;else{function _0x9998a1(){const _0xc4db19=_0x14d4c4;return _0xb490cc['VisuMZ_0_CoreEngine']&&_0x5c3ed5[_0xc4db19('0x19c')][_0xc4db19('0x227')][_0xc4db19('0x176')][_0xc4db19('0x8c')];}}}else{if(_0x14d4c4('0xe2')!==_0x14d4c4('0x68'))return VisuMZ[_0x14d4c4('0x2f4')][_0x14d4c4('0x3cd')][_0x14d4c4('0x2e3')](this,_0x943ab2);else{function _0x1350ed(){const _0x34ce12=_0x14d4c4;_0x2947fa===this[_0x34ce12('0x2ca')]()&&(this[_0x34ce12('0x358')]=!![]),this['activate'](),this[_0x34ce12('0x423')](_0x17db07);}}}},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x29d')]=Game_BattlerBase[_0x507ed6('0x145')][_0x507ed6('0x24d')],Game_BattlerBase[_0x507ed6('0x145')][_0x507ed6('0x24d')]=function(_0x589417){const _0x46ede0=_0x507ed6;if(!_0x589417)return![];if(!VisuMZ['ItemsEquipsCore'][_0x46ede0('0x29d')]['call'](this,_0x589417))return![];if(!this[_0x46ede0('0x270')](_0x589417))return![];if(!this[_0x46ede0('0x3b7')](_0x589417))return![];return!![];},Game_BattlerBase['prototype']['meetsItemConditionsNotetags']=function(_0x4b3d07){if(!this['checkItemConditionsSwitchNotetags'](_0x4b3d07))return![];return!![];},Game_BattlerBase[_0x507ed6('0x145')][_0x507ed6('0x390')]=function(_0x581542){const _0x145b63=_0x507ed6,_0x442c61=_0x581542[_0x145b63('0x170')];if(_0x442c61[_0x145b63('0x26d')](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x55fcf2=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3d3c44 of _0x55fcf2){if(_0x145b63('0x231')==='CpnND'){if(!$gameSwitches[_0x145b63('0xd8')](_0x3d3c44))return![];}else{function _0x2bfbfa(){const _0x484c5f=_0x145b63;this[_0x484c5f('0x33b')](_0x265a42[_0x484c5f('0x6f')]());}}}return!![];}if(_0x442c61[_0x145b63('0x26d')](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x145b63('0xe5')!==_0x145b63('0xe5')){function _0x573e1a(){const _0x130ea4=_0x145b63;_0x17ed46+=_0x130ea4('0x1ad')[_0x130ea4('0x148')](_0x5e6133),_0x418110++;if(_0x3ccb73>=_0x1870b9)return _0x117b68;}}else{const _0x586652=JSON[_0x145b63('0xbb')]('['+RegExp['$1'][_0x145b63('0x26d')](/\d+/g)+']');for(const _0x1e22c9 of _0x586652){if(_0x145b63('0x8')===_0x145b63('0x8')){if(!$gameSwitches['value'](_0x1e22c9))return![];}else{function _0x78aac1(){const _0x4eb379=_0x145b63;return this[_0x4eb379('0xf3')]();}}}return!![];}}if(_0x442c61[_0x145b63('0x26d')](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x816898=JSON['parse']('['+RegExp['$1'][_0x145b63('0x26d')](/\d+/g)+']');for(const _0x160856 of _0x816898){if(_0x145b63('0xa4')!==_0x145b63('0x2e5')){if($gameSwitches[_0x145b63('0xd8')](_0x160856))return!![];}else{function _0xe671ae(){const _0x24ab4f=_0x145b63;this['cursorDown'](_0x25c298[_0x24ab4f('0x305')](_0x24ab4f('0xf0')));}}}return![];}if(_0x442c61[_0x145b63('0x26d')](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c723a=JSON[_0x145b63('0xbb')]('['+RegExp['$1'][_0x145b63('0x26d')](/\d+/g)+']');for(const _0x11e4a4 of _0x2c723a){if(!$gameSwitches[_0x145b63('0xd8')](_0x11e4a4))return!![];}return![];}if(_0x442c61[_0x145b63('0x26d')](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x145b63('0x72')!=='aCFcg'){function _0x4722fe(){const _0x3e1349=_0x145b63,_0x4682e4=_0x4e86d8[_0x3e1349('0x316')];this[_0x3e1349('0x23b')](_0x4682e4,_0x1d4af9,_0x14547d,_0x542b4d,!![]);const _0x4629b6=this[_0x3e1349('0x201')]();this[_0x3e1349('0x23b')](_0x4629b6,_0x3283b7,_0x5234a2,_0x378fa1,![],_0x3e1349('0x184'));}}else{const _0x671b98=JSON[_0x145b63('0xbb')]('['+RegExp['$1'][_0x145b63('0x26d')](/\d+/g)+']');for(const _0x38d10c of _0x671b98){if(!$gameSwitches['value'](_0x38d10c))return!![];}return![];}}if(_0x442c61[_0x145b63('0x26d')](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x186b0c=JSON[_0x145b63('0xbb')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5bb9b1 of _0x186b0c){if('VMJPo'==='GLOgT'){function _0x4dee6d(){const _0x265d9d=_0x145b63;this[_0x265d9d('0x3c4')][_0x265d9d('0x1d5')](0x0),this[_0x265d9d('0x259')]();}}else{if($gameSwitches['value'](_0x5bb9b1))return![];}}return!![];}return!![];},Game_BattlerBase[_0x507ed6('0x145')]['meetsItemConditionsJS']=function(_0x515e13){const _0x41d96d=_0x507ed6,_0x49d73c=_0x515e13[_0x41d96d('0x170')],_0x3df186=VisuMZ['ItemsEquipsCore'][_0x41d96d('0x221')];return _0x3df186[_0x515e13['id']]?_0x3df186[_0x515e13['id']][_0x41d96d('0x2e3')](this,_0x515e13):!![];},Game_Actor['prototype'][_0x507ed6('0x2a2')]=function(_0x453c75){const _0x38ddbb=_0x507ed6;_0x453c75=this[_0x38ddbb('0xc8')](_0x453c75);const _0x4e1b0e=this[_0x38ddbb('0x25c')]();this['_equips']=[];for(let _0x485ba6=0x0;_0x485ba6<_0x4e1b0e[_0x38ddbb('0x2e')];_0x485ba6++){if(_0x38ddbb('0x60')!==_0x38ddbb('0x60')){function _0x3409da(){const _0x56113a=_0x38ddbb;_0x52bab1+='+%1'[_0x56113a('0x148')](this[_0x56113a('0x328')]['selfTP']);}}else this['_equips'][_0x485ba6]=new Game_Item();}for(let _0x49a9d=0x0;_0x49a9d<_0x4e1b0e[_0x38ddbb('0x2e')];_0x49a9d++){const _0x5410fc=_0x4e1b0e[_0x49a9d],_0xe33fd8=this[_0x38ddbb('0x372')](_0x453c75,_0x5410fc);if(this[_0x38ddbb('0x332')](_0xe33fd8))this['_equips'][_0x49a9d][_0x38ddbb('0x262')](_0xe33fd8);}this[_0x38ddbb('0x356')](!![]),this[_0x38ddbb('0x41c')]();},Game_Actor[_0x507ed6('0x145')]['convertInitEquipsToItems']=function(_0x2ac846){const _0x1627a1=_0x507ed6,_0x118237=[];for(let _0x225aff=0x0;_0x225aff<_0x2ac846[_0x1627a1('0x2e')];_0x225aff++){const _0x4c0bfa=_0x2ac846[_0x225aff];if(_0x4c0bfa<=0x0)continue;const _0x3ce6ac=$dataSystem[_0x1627a1('0x3bb')][_0x225aff+0x1];if(_0x3ce6ac===$dataSystem[_0x1627a1('0x3bb')][0x1]||_0x225aff===0x1&&this['isDualWield']()){if(_0x1627a1('0x1d')===_0x1627a1('0x34a')){function _0x29f102(){this['postCreateCategoryWindowItemsEquipsCore']();}}else _0x118237['push']($dataWeapons[_0x4c0bfa]);}else _0x118237[_0x1627a1('0x146')]($dataArmors[_0x4c0bfa]);}return _0x118237;},Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x372')]=function(_0x3f58d0,_0x42798d){const _0x3c63c0=_0x507ed6;for(const _0x164518 of _0x3f58d0){if(!_0x164518)continue;if(_0x164518['etypeId']===_0x42798d)return _0x3f58d0[_0x3c63c0('0x219')](_0x3f58d0[_0x3c63c0('0x85')](_0x164518),0x1),_0x164518;}return null;},Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x25c')]=function(){const _0x453f0f=_0x507ed6,_0x49947b=JsonEx[_0x453f0f('0xa5')](this[_0x453f0f('0x6e')]()[_0x453f0f('0x25c')]);if(_0x49947b[_0x453f0f('0x2e')]>=0x2&&this[_0x453f0f('0x41b')]())_0x49947b[0x1]=0x1;return _0x49947b;},Game_Actor['prototype'][_0x507ed6('0x28c')]=function(){const _0x3ef383=_0x507ed6,_0x19995b=this['equipSlots']();for(let _0x2de8cc=0x0;_0x2de8cc<_0x19995b[_0x3ef383('0x2e')];_0x2de8cc++){if(!this['_equips'][_0x2de8cc])this[_0x3ef383('0x31c')][_0x2de8cc]=new Game_Item();}this[_0x3ef383('0x356')](![]),this[_0x3ef383('0x41c')]();},VisuMZ[_0x507ed6('0x2f4')]['Game_Actor_changeEquip']=Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x2ba')],Game_Actor['prototype']['changeEquip']=function(_0x4b0301,_0x3672bd){const _0x4856e2=_0x507ed6;if(this[_0x4856e2('0x405')]){if('AorHH'!==_0x4856e2('0xe')){function _0x5a5e02(){const _0x57c3d9=_0x4856e2;return _0x11b4c4[_0x57c3d9('0x2f4')][_0x57c3d9('0x227')][_0x57c3d9('0x36b')]['NonRemoveETypes'];}}else{const _0x5586a3=JsonEx[_0x4856e2('0xa5')](this);_0x5586a3['_tempActor']=!![],VisuMZ[_0x4856e2('0x2f4')][_0x4856e2('0x2f9')][_0x4856e2('0x2e3')](this,_0x4b0301,_0x3672bd),this[_0x4856e2('0x4b')](_0x5586a3);}}else{if(_0x4856e2('0x17f')!==_0x4856e2('0x17f')){function _0x2b17c8(){const _0x57c9da=_0x4856e2;return _0x4a2629['getInputMultiButtonStrings'](_0x57c9da('0x268'),_0x57c9da('0x184'));}}else VisuMZ[_0x4856e2('0x2f4')][_0x4856e2('0x2f9')][_0x4856e2('0x2e3')](this,_0x4b0301,_0x3672bd);}},VisuMZ[_0x507ed6('0x2f4')]['Game_Actor_forceChangeEquip']=Game_Actor[_0x507ed6('0x145')]['forceChangeEquip'],Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x211')]=function(_0x5dd494,_0x2e8360){const _0x1787b5=_0x507ed6;if(this[_0x1787b5('0x405')]){if('IuJjd'==='ptvzi'){function _0x4c4f99(){const _0x2a2ba=_0x1787b5,_0x331bab=this['equipSlots']()['length'];for(let _0x1943d5=0x0;_0x1943d5<_0x331bab;_0x1943d5++){if(this[_0x2a2ba('0x9d')](_0x1943d5))this[_0x2a2ba('0x2ba')](_0x1943d5,null);}for(let _0x33f503=0x0;_0x33f503<_0x331bab;_0x33f503++){if(this[_0x2a2ba('0x9d')](_0x33f503))this['changeEquip'](_0x33f503,this[_0x2a2ba('0x33d')](_0x33f503));}}}else{const _0x4614b5=JsonEx['makeDeepCopy'](this);_0x4614b5[_0x1787b5('0x405')]=!![],VisuMZ[_0x1787b5('0x2f4')][_0x1787b5('0x52')]['call'](this,_0x5dd494,_0x2e8360),this[_0x1787b5('0x4b')](_0x4614b5);}}else{if('JWUhL'!==_0x1787b5('0x240')){function _0x522108(){const _0x225ed5=_0x1787b5;_0xf7745d[_0x225ed5('0x2f4')]['Scene_Equip_onActorChange'][_0x225ed5('0x2e3')](this),this[_0x225ed5('0x244')]()&&(this[_0x225ed5('0x180')]['deactivate'](),this[_0x225ed5('0x180')]['deselect'](),this[_0x225ed5('0x8f')][_0x225ed5('0x1d5')](0x0),this[_0x225ed5('0x8f')]['activate']());}}else VisuMZ['ItemsEquipsCore']['Game_Actor_forceChangeEquip'][_0x1787b5('0x2e3')](this,_0x5dd494,_0x2e8360);}},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0xaf')]=Game_Actor['prototype'][_0x507ed6('0x1fe')],Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x1fe')]=function(_0x195fe4){const _0x46566f=_0x507ed6;if(!this[_0x46566f('0x405')]){const _0x52811c=JsonEx['makeDeepCopy'](this);_0x52811c[_0x46566f('0x405')]=!![],VisuMZ['ItemsEquipsCore'][_0x46566f('0xaf')][_0x46566f('0x2e3')](this,_0x195fe4),this['equipAdjustHpMp'](_0x52811c);}else{if(_0x46566f('0xcd')==='BjsKS'){function _0x2704a1(){const _0x1dff50=_0x46566f;return this[_0x1dff50('0x348')]();}}else VisuMZ[_0x46566f('0x2f4')][_0x46566f('0xaf')][_0x46566f('0x2e3')](this,_0x195fe4);}},Game_Actor['prototype'][_0x507ed6('0x356')]=function(_0x1dcf0e){const _0x5d8daf=_0x507ed6;for(;;){if(_0x5d8daf('0x312')!==_0x5d8daf('0x39c')){const _0x30ed41=this[_0x5d8daf('0x25c')](),_0x1c0dbe=this[_0x5d8daf('0x346')]();let _0x5873df=![];for(let _0x225183=0x0;_0x225183<_0x1c0dbe[_0x5d8daf('0x2e')];_0x225183++){if(_0x5d8daf('0x12f')!==_0x5d8daf('0xd3')){const _0x4398e3=_0x1c0dbe[_0x225183];if(_0x4398e3&&(!this[_0x5d8daf('0x332')](_0x4398e3)||_0x4398e3[_0x5d8daf('0x18')]!==_0x30ed41[_0x225183])){if(!_0x1dcf0e){if(_0x5d8daf('0x277')!==_0x5d8daf('0x40f'))this['tradeItemWithParty'](null,_0x4398e3);else{function _0x64a1e1(){const _0x3975a9=_0x5d8daf,_0x20a0be=_0x2c8a7a[_0x3975a9('0xbb')]('['+_0x48f0b5['$1'][_0x3975a9('0x26d')](/\d+/g)+']');for(const _0x5ecafb of _0x20a0be){if(!_0x5c1bb3['value'](_0x5ecafb))return![];}}}}if(!this[_0x5d8daf('0x405')]){const _0x17691c=JsonEx[_0x5d8daf('0xa5')](this);_0x17691c[_0x5d8daf('0x405')]=!![],this[_0x5d8daf('0x31c')][_0x225183][_0x5d8daf('0x262')](null),this[_0x5d8daf('0x4b')](_0x17691c);}else this['_equips'][_0x225183][_0x5d8daf('0x262')](null);_0x5873df=!![];}}else{function _0x19d285(){const _0x26e2dd=_0x5d8daf,_0x3a9314=_0x42e2fb['parse']('['+_0xc9969f['$1'][_0x26e2dd('0x26d')](/\d+/g)+']');for(const _0x3d8511 of _0x3a9314){if(_0xb8eec2[_0x26e2dd('0xd8')](_0x3d8511))return!![];}return![];}}}if(!_0x5873df)break;}else{function _0x6acb9a(){const _0x10e799=_0x5d8daf;this['addEquipCommand'](),this[_0x10e799('0x2a0')](),this[_0x10e799('0xc6')]();}}}},Game_Actor[_0x507ed6('0x145')]['equipAdjustHpMp']=function(_0x1d900f){const _0x51906c=_0x507ed6;if(this[_0x51906c('0x405')])return;if(!VisuMZ['ItemsEquipsCore']['Settings']['EquipScene']['EquipAdjustHpMp'])return;const _0x2836a4=Math[_0x51906c('0x2eb')](_0x1d900f[_0x51906c('0x421')]()*this[_0x51906c('0x239')]),_0x10d2cf=Math[_0x51906c('0x2eb')](_0x1d900f[_0x51906c('0x12a')]()*this[_0x51906c('0x282')]);if(this['hp']>0x0)this[_0x51906c('0x253')](_0x2836a4);if(this['mp']>0x0)this[_0x51906c('0x1d4')](_0x10d2cf);},Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x3d3')]=function(){const _0x1dd97b=_0x507ed6,_0xd92e94=this[_0x1dd97b('0x25c')]()[_0x1dd97b('0x2e')];for(let _0x2aa9fc=0x0;_0x2aa9fc<_0xd92e94;_0x2aa9fc++){if(this['isClearEquipOk'](_0x2aa9fc))this[_0x1dd97b('0x2ba')](_0x2aa9fc,null);}},Game_Actor['prototype'][_0x507ed6('0x241')]=function(_0x343282){const _0x27fb5c=_0x507ed6;return this[_0x27fb5c('0x339')]()[_0x27fb5c('0x1c6')](this['equipSlots']()[_0x343282])?![]:this[_0x27fb5c('0x341')](_0x343282);},Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x339')]=function(){const _0x58a87a=_0x507ed6;return VisuMZ[_0x58a87a('0x2f4')][_0x58a87a('0x227')][_0x58a87a('0x36b')][_0x58a87a('0x75')];},Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x2a1')]=function(){const _0x54185f=_0x507ed6,_0x5ccba5=this[_0x54185f('0x25c')]()[_0x54185f('0x2e')];for(let _0x2f5ee9=0x0;_0x2f5ee9<_0x5ccba5;_0x2f5ee9++){if(this[_0x54185f('0x9d')](_0x2f5ee9))this[_0x54185f('0x2ba')](_0x2f5ee9,null);}for(let _0x206d6c=0x0;_0x206d6c<_0x5ccba5;_0x206d6c++){if(this[_0x54185f('0x9d')](_0x206d6c))this[_0x54185f('0x2ba')](_0x206d6c,this[_0x54185f('0x33d')](_0x206d6c));}},Game_Actor[_0x507ed6('0x145')]['isOptimizeEquipOk']=function(_0x155717){const _0x3b5af5=_0x507ed6;return this[_0x3b5af5('0x39b')]()['includes'](this[_0x3b5af5('0x25c')]()[_0x155717])?![]:this['isEquipChangeOk'](_0x155717);},Game_Actor['prototype'][_0x507ed6('0x39b')]=function(){const _0x49ad3f=_0x507ed6;return VisuMZ[_0x49ad3f('0x2f4')]['Settings'][_0x49ad3f('0x36b')][_0x49ad3f('0xd0')];},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x2fd')]=Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x2bb')],Game_Actor[_0x507ed6('0x145')]['tradeItemWithParty']=function(_0x169e46,_0x31027c){const _0x43ef1c=_0x507ed6;$gameTemp[_0x43ef1c('0x165')]=!![];const _0x31787f=VisuMZ['ItemsEquipsCore']['Game_Actor_tradeItemWithParty']['call'](this,_0x169e46,_0x31027c);return $gameTemp[_0x43ef1c('0x165')]=![],_0x31787f;},Game_Actor[_0x507ed6('0x145')][_0x507ed6('0xd5')]=function(_0x4c1d9e,_0x3b8695){const _0x232935=_0x507ed6,_0x15731f=this[_0x232935('0x3f7')](_0x4c1d9e);if(_0x15731f<0x0)return;const _0x337bd5=_0x4c1d9e===0x1?$dataWeapons[_0x3b8695]:$dataArmors[_0x3b8695];this[_0x232935('0x2ba')](_0x15731f,_0x337bd5);},Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x3f7')]=function(_0x175610){const _0xa62a00=_0x507ed6;let _0x25f167=0x0;const _0x527a8c=this[_0xa62a00('0x25c')](),_0x2e6b67=this['equips']();for(let _0x21aa5d=0x0;_0x21aa5d<_0x527a8c[_0xa62a00('0x2e')];_0x21aa5d++){if(_0x527a8c[_0x21aa5d]===_0x175610){_0x25f167=_0x21aa5d;if(!_0x2e6b67[_0x21aa5d])return _0x25f167;}}return _0x25f167;},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x229')]=Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x287')],Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x287')]=function(_0x26d383){const _0x481a19=_0x507ed6;let _0x44c5b5=VisuMZ['ItemsEquipsCore'][_0x481a19('0x229')][_0x481a19('0x2e3')](this,_0x26d383);for(const _0xeb20e7 of this[_0x481a19('0x346')]()){if(_0x481a19('0x196')===_0x481a19('0x196')){if(_0xeb20e7)_0x44c5b5+=this[_0x481a19('0x58')](_0xeb20e7,_0x26d383);}else{function _0x2c6a12(){const _0x1fce5c=_0x481a19;_0x1473dc=_0x67ff27||'',_0x374461=_0x518631||_0x1fce5c('0x268'),this[_0x1fce5c('0x40')]=this['itemDataFontSize'](),this[_0x1fce5c('0xf')]=_0xbcdc58?_0x2b2b6b['systemColor']():this['contents']['textColor'],_0x4acd56+=this[_0x1fce5c('0x12c')](),_0x439a48-=this['itemPadding']()*0x2;const _0x376c4e=this[_0x1fce5c('0x409')](_0x3d665f);if(_0x2ce7b7===_0x1fce5c('0x0'))_0x4ab605=_0x25573f+_0x41f969[_0x1fce5c('0x2ae')]((_0x15d4e6-_0x376c4e['width'])/0x2);else _0x30952f==='right'&&(_0x27d8bb=_0xfdbfe7+_0x362adc-_0x376c4e[_0x1fce5c('0x5d')]);_0x4358d4+=(this[_0x1fce5c('0x3db')]()-_0x376c4e[_0x1fce5c('0x16e')])/0x2,this[_0x1fce5c('0x2d6')](_0x557879,_0x43ff6e,_0x293baf,_0x1a1671),this['_resetFontSize']=_0x28a60c,this[_0x1fce5c('0xf')]=_0x1b342e,this['resetFontSettings']();}}}return _0x44c5b5;},Game_Actor['prototype']['paramPlusItemsEquipsCoreCustomJS']=function(_0x2ad28b,_0x430be1){const _0x2197f0=_0x507ed6;if(this[_0x2197f0('0x39')])return 0x0;const _0x2574fa=(DataManager['isWeapon'](_0x2ad28b)?_0x2197f0('0x28a'):'A%1')[_0x2197f0('0x148')](_0x2ad28b['id']),_0x387852=_0x2197f0('0xb3')[_0x2197f0('0x148')](_0x2574fa,_0x430be1);if(VisuMZ[_0x2197f0('0x2f4')][_0x2197f0('0x3c3')][_0x387852]){this[_0x2197f0('0x39')]=!![];const _0x1157b6=VisuMZ[_0x2197f0('0x2f4')][_0x2197f0('0x3c3')][_0x387852][_0x2197f0('0x2e3')](this,_0x2ad28b,_0x430be1);return this[_0x2197f0('0x39')]=![],_0x1157b6;}else return 0x0;},Game_Actor[_0x507ed6('0x145')][_0x507ed6('0x1f1')]=function(_0x26eeda){const _0x38433d=_0x507ed6;this['_shopStatusMenuMode']=!![],this[_0x38433d('0x379')]=_0x26eeda;},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x357')]=Game_Party['prototype']['initialize'],Game_Party[_0x507ed6('0x145')][_0x507ed6('0x9a')]=function(){const _0x3c343c=_0x507ed6;VisuMZ[_0x3c343c('0x2f4')][_0x3c343c('0x357')]['call'](this),this[_0x3c343c('0x22a')]();},Game_Party[_0x507ed6('0x145')][_0x507ed6('0x22a')]=function(){const _0x36e907=_0x507ed6;this[_0x36e907('0x3b9')]=[];},Game_Party['prototype'][_0x507ed6('0xd')]=function(_0x18b852){const _0x3c739f=_0x507ed6;if(!$gameTemp[_0x3c739f('0x402')]())return![];if(this['_newItemsList']===undefined)this[_0x3c739f('0x22a')]();let _0x2b2f34='';if(DataManager[_0x3c739f('0x1c2')](_0x18b852)){if(_0x3c739f('0x21e')==='xTCnF'){function _0x333090(){const _0x55a81d=_0x3c739f;this[_0x55a81d('0x8f')][_0x55a81d('0x224')](_0x55a81d('0x403'),this[_0x55a81d('0xcf')][_0x55a81d('0x31b')](this)),this[_0x55a81d('0x8f')][_0x55a81d('0x224')](_0x55a81d('0x416'),this[_0x55a81d('0x24f')][_0x55a81d('0x31b')](this)),this[_0x55a81d('0x8f')][_0x55a81d('0x224')]('pageup',this[_0x55a81d('0x23')][_0x55a81d('0x31b')](this));}}else _0x2b2f34=_0x3c739f('0x192')['format'](_0x18b852['id']);}else{if(DataManager['isWeapon'](_0x18b852)){if(_0x3c739f('0x326')===_0x3c739f('0x326'))_0x2b2f34=_0x3c739f('0x2f5')[_0x3c739f('0x148')](_0x18b852['id']);else{function _0x20f903(){const _0x17b477=_0x3c739f;return this['_commandWindow']&&this[_0x17b477('0x180')]['isUseModernControls']();}}}else{if(DataManager[_0x3c739f('0x2d9')](_0x18b852)){if('HZYoa'!==_0x3c739f('0x2d2')){function _0x5ea65a(){const _0x26c47e=_0x3c739f,_0x35834b=this[_0x26c47e('0xce')],_0x5155be=_0x23a36f['windowPadding'](),_0x135a11=_0x30d0c6['x']+_0x47b102['floor'](_0x3a58ca[_0x26c47e('0x5d')]/0x2)+_0x5155be;_0x35834b['x']=_0x35834b['width']/-0x2+_0x135a11,_0x35834b['y']=_0x48efef[_0x26c47e('0x2ae')](_0x300b3c[_0x26c47e('0x16e')]/0x2);}}else _0x2b2f34=_0x3c739f('0x5')[_0x3c739f('0x148')](_0x18b852['id']);}else return;}}return this[_0x3c739f('0x3b9')][_0x3c739f('0x1c6')](_0x2b2f34);},Game_Party['prototype']['setNewItem']=function(_0x5bbe8b){const _0x4ec928=_0x507ed6;if(!$gameTemp[_0x4ec928('0x402')]())return;if(this[_0x4ec928('0x3b9')]===undefined)this['initNewItemsList']();let _0x480d5f='';if(DataManager[_0x4ec928('0x1c2')](_0x5bbe8b)){if('GYzow'==='GYzow')_0x480d5f='item-%1'[_0x4ec928('0x148')](_0x5bbe8b['id']);else{function _0x2cf277(){return;}}}else{if(DataManager[_0x4ec928('0x2f7')](_0x5bbe8b)){if(_0x4ec928('0x3f4')===_0x4ec928('0x3f4'))_0x480d5f=_0x4ec928('0x2f5')[_0x4ec928('0x148')](_0x5bbe8b['id']);else{function _0x13b241(){const _0x140c40=_0x4ec928;return this[_0x140c40('0x2f0')]();}}}else{if(DataManager['isArmor'](_0x5bbe8b))_0x480d5f=_0x4ec928('0x5')[_0x4ec928('0x148')](_0x5bbe8b['id']);else return;}}if(!this[_0x4ec928('0x3b9')][_0x4ec928('0x1c6')](_0x480d5f))this[_0x4ec928('0x3b9')]['push'](_0x480d5f);},Game_Party['prototype'][_0x507ed6('0x245')]=function(_0x21cf23){const _0x328c05=_0x507ed6;if(!$gameTemp[_0x328c05('0x402')]())return;if(this[_0x328c05('0x3b9')]===undefined)this[_0x328c05('0x22a')]();let _0x47a708='';if(DataManager['isItem'](_0x21cf23))_0x47a708=_0x328c05('0x192')[_0x328c05('0x148')](_0x21cf23['id']);else{if(DataManager[_0x328c05('0x2f7')](_0x21cf23))_0x47a708=_0x328c05('0x2f5')[_0x328c05('0x148')](_0x21cf23['id']);else{if(DataManager[_0x328c05('0x2d9')](_0x21cf23))_0x47a708='armor-%1'['format'](_0x21cf23['id']);else return;}}this['_newItemsList'][_0x328c05('0x1c6')](_0x47a708)&&this[_0x328c05('0x3b9')][_0x328c05('0x219')](this[_0x328c05('0x3b9')][_0x328c05('0x85')](_0x47a708),0x1);},VisuMZ['ItemsEquipsCore'][_0x507ed6('0x7d')]=Game_Party['prototype'][_0x507ed6('0x50')],Game_Party[_0x507ed6('0x145')][_0x507ed6('0x50')]=function(_0x2dca43,_0x360402,_0x93f536){const _0x1dc822=_0x507ed6,_0x4cc535=this[_0x1dc822('0x2c9')](_0x2dca43);VisuMZ[_0x1dc822('0x2f4')][_0x1dc822('0x7d')][_0x1dc822('0x2e3')](this,_0x2dca43,_0x360402,_0x93f536);if(this[_0x1dc822('0x2c9')](_0x2dca43)>_0x4cc535)this[_0x1dc822('0x13b')](_0x2dca43);},Game_Party['prototype'][_0x507ed6('0x1e3')]=function(_0x4d5a62){const _0x4a519a=_0x507ed6;return DataManager[_0x4a519a('0x310')](_0x4d5a62);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x1b4')]=Scene_ItemBase['prototype'][_0x507ed6('0x22b')],Scene_ItemBase[_0x507ed6('0x145')][_0x507ed6('0x22b')]=function(){const _0x1b72c4=_0x507ed6;VisuMZ[_0x1b72c4('0x2f4')][_0x1b72c4('0x1b4')][_0x1b72c4('0x2e3')](this),this[_0x1b72c4('0x327')][_0x1b72c4('0x1a4')]();},Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x18a')]=function(){const _0x4cd6e3=_0x507ed6;if(ConfigManager[_0x4cd6e3('0x1a')]&&ConfigManager[_0x4cd6e3('0x34d')]!==undefined){if(_0x4cd6e3('0x6d')===_0x4cd6e3('0x131')){function _0x1d322b(){_0x44c2b0['prototype']['refresh']['call'](this),this['refreshCursor']();}}else return ConfigManager[_0x4cd6e3('0x34d')];}else{if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x4cd6e3('0x34b')!==_0x4cd6e3('0x38a'))return this[_0x4cd6e3('0x2af')]()[_0x4cd6e3('0x26d')](/LOWER/i);else{function _0x52dc6b(){const _0x142835=_0x4cd6e3;_0x2b8005[_0x142835('0x165')]=!![];const _0x111bce=_0x26553c[_0x142835('0x2f4')][_0x142835('0x2fd')][_0x142835('0x2e3')](this,_0xf8a7f6,_0x3d9a10);return _0x4b1b3d[_0x142835('0x165')]=![],_0x111bce;}}}else Scene_ItemBase[_0x4cd6e3('0x145')][_0x4cd6e3('0x278')][_0x4cd6e3('0x2e3')](this);}},Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x278')]=function(){const _0x837740=_0x507ed6;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x837740('0x422')]!==undefined){if(_0x837740('0xc')===_0x837740('0x99')){function _0x5dfd1e(){const _0x209536=_0x837740;return this[_0x209536('0x2bc')](),_0x30a3d0[_0x209536('0x2b3')](),_0x1bf8f5[_0x209536('0x80')]['onSlotCancel'](),![];}}else return ConfigManager[_0x837740('0x422')];}else{if(this[_0x837740('0x79')]()){if(_0x837740('0x111')===_0x837740('0x111'))return this[_0x837740('0x2af')]()['match'](/RIGHT/i);else{function _0x45825f(){const _0x42da25=_0x837740;return _0x50e563[_0x42da25('0x145')][_0x42da25('0x3c1')][_0x42da25('0x2e3')](this);}}}else Scene_ItemBase[_0x837740('0x145')]['isRightInputMode'][_0x837740('0x2e3')](this);}},Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x2af')]=function(){const _0x11dfe5=_0x507ed6;return VisuMZ['ItemsEquipsCore'][_0x11dfe5('0x227')]['ItemScene'][_0x11dfe5('0x1e4')];},Scene_Item[_0x507ed6('0x145')]['isUseModernControls']=function(){const _0xe785aa=_0x507ed6;return this[_0xe785aa('0x3c4')]&&this[_0xe785aa('0x3c4')][_0xe785aa('0x244')]();},Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x79')]=function(){const _0x46e61a=_0x507ed6;return VisuMZ[_0x46e61a('0x2f4')][_0x46e61a('0x227')][_0x46e61a('0x21d')][_0x46e61a('0x47')];},VisuMZ[_0x507ed6('0x2f4')]['Scene_Item_create']=Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x5b')],Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x5b')]=function(){const _0x10d8ff=_0x507ed6;VisuMZ[_0x10d8ff('0x2f4')][_0x10d8ff('0x11f')][_0x10d8ff('0x2e3')](this);if(this[_0x10d8ff('0x244')]()){if(_0x10d8ff('0x2a3')!=='NaLUA')this[_0x10d8ff('0x259')]();else{function _0x3dfa57(){const _0x281178=_0x10d8ff;this[_0x281178('0x95')]();}}}},Scene_Item[_0x507ed6('0x145')]['helpWindowRect']=function(){const _0x28d174=_0x507ed6;return this[_0x28d174('0x79')]()?this['helpWindowRectItemsEquipsCore']():Scene_ItemBase['prototype'][_0x28d174('0x3c1')]['call'](this);},Scene_Item['prototype'][_0x507ed6('0x2f0')]=function(){const _0x29d402=_0x507ed6,_0x23d713=0x0,_0x25bee1=this[_0x29d402('0x1f8')](),_0x289631=Graphics['boxWidth'],_0x58dd37=this['helpAreaHeight']();return new Rectangle(_0x23d713,_0x25bee1,_0x289631,_0x58dd37);},VisuMZ[_0x507ed6('0x2f4')]['Scene_Item_createCategoryWindow']=Scene_Item['prototype'][_0x507ed6('0x303')],Scene_Item['prototype'][_0x507ed6('0x303')]=function(){const _0xcfb61a=_0x507ed6;VisuMZ[_0xcfb61a('0x2f4')][_0xcfb61a('0x107')]['call'](this);if(this[_0xcfb61a('0x244')]()){if('UGVMe'!==_0xcfb61a('0x24b'))this[_0xcfb61a('0x1b3')]();else{function _0x22fdf4(){const _0x31c698=_0xcfb61a;_0x1011ae['log']('Damage\x20Formula\x20Error\x20for\x20%1'[_0x31c698('0x148')](this[_0x31c698('0xfe')]['name'])),_0x4ea2aa['log'](_0x5c6285);}}}},Scene_Item[_0x507ed6('0x145')]['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x242b8c=_0x507ed6;delete this['_categoryWindow'][_0x242b8c('0xf9')]['ok'],delete this[_0x242b8c('0x3c4')]['_handlers'][_0x242b8c('0x403')];},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x92')]=Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x320')],Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x320')]=function(){const _0x21a96c=_0x507ed6;return this[_0x21a96c('0x79')]()?this['categoryWindowRectItemsEquipsCore']():VisuMZ[_0x21a96c('0x2f4')]['Scene_Item_categoryWindowRect'][_0x21a96c('0x2e3')](this);},Scene_Item[_0x507ed6('0x145')]['categoryWindowRectItemsEquipsCore']=function(){const _0x52e585=_0x507ed6,_0x539b8c=0x0,_0x23ab3a=this['mainAreaTop'](),_0x53d17b=Graphics['boxWidth'],_0x47545c=this[_0x52e585('0xe1')](0x1,!![]);return new Rectangle(_0x539b8c,_0x23ab3a,_0x53d17b,_0x47545c);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x2e8')]=Scene_Item[_0x507ed6('0x145')][_0x507ed6('0xe7')],Scene_Item[_0x507ed6('0x145')][_0x507ed6('0xe7')]=function(){const _0x169614=_0x507ed6;VisuMZ['ItemsEquipsCore'][_0x169614('0x2e8')][_0x169614('0x2e3')](this);this[_0x169614('0x244')]()&&this['postCreateItemWindowModernControls']();if(this[_0x169614('0x27d')]()){if(_0x169614('0x22f')!==_0x169614('0x22f')){function _0x1f031e(){const _0x317102=_0x169614;_0x35ad01['prototype'][_0x317102('0x42d')][_0x317102('0x2e3')](this,_0x103da6);}}else this['createStatusWindow']();}},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x13e')]=Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x1e2')],Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x1e2')]=function(){const _0xed0940=_0x507ed6;if(this[_0xed0940('0x79')]()){if(_0xed0940('0x433')===_0xed0940('0x361')){function _0x2b7fb6(){const _0x190cc2=_0xed0940;return this[_0x190cc2('0x79')]()?this[_0x190cc2('0x18f')]():_0x12ab3a[_0x190cc2('0x2f4')][_0x190cc2('0x340')][_0x190cc2('0x2e3')](this);}}else return this[_0xed0940('0x348')]();}else{if(_0xed0940('0x344')!==_0xed0940('0x344')){function _0x53217d(){const _0x566db8=_0xed0940;return _0x4d604a[_0x566db8('0x2f4')][_0x566db8('0x227')][_0x566db8('0x36b')][_0x566db8('0x75')];}}else{const _0x32aa0c=VisuMZ[_0xed0940('0x2f4')][_0xed0940('0x13e')][_0xed0940('0x2e3')](this);if(this[_0xed0940('0x27d')]()&&this[_0xed0940('0x435')]()){if('ZXaDd'!==_0xed0940('0x25d')){function _0x278b54(){const _0x1c8a6c=_0xed0940;this[_0x1c8a6c('0x207')][_0x1c8a6c('0xf1')]();}}else _0x32aa0c[_0xed0940('0x5d')]-=this[_0xed0940('0x174')]();}return _0x32aa0c;}}},Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x348')]=function(){const _0x50974e=_0x507ed6,_0x4f6cba=this[_0x50974e('0x278')]()?this[_0x50974e('0x174')]():0x0,_0x3b6cf8=this['_categoryWindow']['y']+this[_0x50974e('0x3c4')][_0x50974e('0x16e')],_0x141ec6=Graphics[_0x50974e('0x115')]-this[_0x50974e('0x174')](),_0xdb7ca2=this[_0x50974e('0x2fc')]()-_0x3b6cf8;return new Rectangle(_0x4f6cba,_0x3b6cf8,_0x141ec6,_0xdb7ca2);},Scene_Item['prototype']['postCreateItemWindowModernControls']=function(){const _0x5690d2=_0x507ed6;this['_itemWindow']['setHandler']('cancel',this['popScene'][_0x5690d2('0x31b')](this));},Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x27d')]=function(){const _0x32b444=_0x507ed6;return this['isUseItemsEquipsCoreUpdatedLayout']()?!![]:VisuMZ[_0x32b444('0x2f4')][_0x32b444('0x227')][_0x32b444('0x21d')][_0x32b444('0x129')];},Scene_Item[_0x507ed6('0x145')]['adjustItemWidthByStatus']=function(){const _0x141266=_0x507ed6;return VisuMZ[_0x141266('0x2f4')][_0x141266('0x227')][_0x141266('0x21d')][_0x141266('0x1f2')];},Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x1b8')]=function(){const _0x5a9443=_0x507ed6,_0x3550ec=this[_0x5a9443('0x386')]();this[_0x5a9443('0x183')]=new Window_ShopStatus(_0x3550ec),this['addWindow'](this['_statusWindow']),this[_0x5a9443('0x327')]['setStatusWindow'](this['_statusWindow']);},Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x386')]=function(){const _0x4d7032=_0x507ed6;if(this[_0x4d7032('0x79')]()){if(_0x4d7032('0x70')!=='WdCpB'){function _0x57489e(){const _0x4fe8fa=_0x4d7032,_0xc512f4=this[_0x4fe8fa('0xe4')](this[_0x4fe8fa('0x2ca')]());let _0x544339=this['commandName'](this[_0x4fe8fa('0x2ca')]());_0x544339=_0x544339[_0x4fe8fa('0x208')](/\\I\[(\d+)\]/gi,''),_0x43498e[_0x4fe8fa('0x23a')](),this['commandNameWindowDrawBackground'](_0x544339,_0xc512f4),this[_0x4fe8fa('0x21')](_0x544339,_0xc512f4),this[_0x4fe8fa('0x55')](_0x544339,_0xc512f4);}}else return this[_0x4d7032('0x3e8')]();}else return VisuMZ[_0x4d7032('0x2f4')][_0x4d7032('0x227')][_0x4d7032('0x21d')][_0x4d7032('0xbc')][_0x4d7032('0x2e3')](this);},Scene_Item['prototype'][_0x507ed6('0x3e8')]=function(){const _0x19e581=_0x507ed6,_0x3eefae=this[_0x19e581('0x174')](),_0x13b064=this[_0x19e581('0x327')][_0x19e581('0x16e')],_0x7266c0=this[_0x19e581('0x278')]()?0x0:Graphics[_0x19e581('0x115')]-this[_0x19e581('0x174')](),_0x5975bd=this[_0x19e581('0x327')]['y'];return new Rectangle(_0x7266c0,_0x5975bd,_0x3eefae,_0x13b064);},Scene_Item[_0x507ed6('0x145')][_0x507ed6('0x174')]=function(){const _0x55c7fe=_0x507ed6;return Scene_Shop[_0x55c7fe('0x145')]['statusWidth']();},Scene_Item[_0x507ed6('0x145')]['buttonAssistItemListRequirement']=function(){const _0x2ceab8=_0x507ed6;if(!this[_0x2ceab8('0x2af')]())return![];if(!this[_0x2ceab8('0x244')]())return![];if(!this[_0x2ceab8('0x327')])return![];if(!this[_0x2ceab8('0x327')]['active'])return![];return this[_0x2ceab8('0x2af')]()&&this['isUseModernControls']();},Scene_Item['prototype'][_0x507ed6('0x297')]=function(){const _0x4bd9cd=_0x507ed6;if(this['buttonAssistItemListRequirement']()){if(this[_0x4bd9cd('0x327')][_0x4bd9cd('0x2ef')]()===0x1){if('llCyW'!=='cVdrN')return TextManager[_0x4bd9cd('0x2e9')](_0x4bd9cd('0x268'),'right');else{function _0x60f3(){const _0x3c23b0=_0x4bd9cd;if(_0x1be5f1===_0x371c7b)return;if(_0x462096[_0x3c23b0('0x170')][_0x3c23b0('0x26d')](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x1f76d6=_0x317453(_0x126b9d['$1']),_0x4cd142=(_0x58f1ee===_0x81ff9b?_0x3c23b0('0x28a'):_0x3c23b0('0x164'))[_0x3c23b0('0x148')](_0x51fb56['id']),_0x10b34b=_0x3c23b0('0x1d1')['format'](_0x1f76d6);for(let _0x44667d=0x0;_0x44667d<0x8;_0x44667d++){if(_0x1f76d6[_0x3c23b0('0x26d')](_0x239eff['ItemsEquipsCore'][_0x3c23b0('0x1c9')][_0x3c23b0('0x2c6')][_0x44667d])){const _0x4494e8='%1-%2'[_0x3c23b0('0x148')](_0x4cd142,_0x44667d);_0x15bbe2['ItemsEquipsCore'][_0x3c23b0('0x3c3')][_0x4494e8]=new _0x120c07(_0x3c23b0('0x41a'),'paramId',_0x10b34b);}}}}}}else return TextManager['getInputMultiButtonStrings'](_0x4bd9cd('0xab'),'pagedown');}return Scene_ItemBase['prototype'][_0x4bd9cd('0x297')]['call'](this);},Scene_Item[_0x507ed6('0x145')]['buttonAssistText1']=function(){const _0x29d85d=_0x507ed6;if(this[_0x29d85d('0x3f6')]()){if(_0x29d85d('0x24c')===_0x29d85d('0x24c'))return VisuMZ[_0x29d85d('0x2f4')][_0x29d85d('0x227')][_0x29d85d('0x21d')][_0x29d85d('0x368')];else{function _0x652b80(){const _0x10a3f5=_0x29d85d;return _0x25066f['ItemsEquipsCore']['Settings'][_0x10a3f5('0x14b')][_0x10a3f5('0x1e4')];}}}return Scene_ItemBase[_0x29d85d('0x145')][_0x29d85d('0xf5')][_0x29d85d('0x2e3')](this);},Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x18a')]=function(){const _0x50eaf8=_0x507ed6;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiHelpPosition']!==undefined){if(_0x50eaf8('0x397')===_0x50eaf8('0x1ba')){function _0x3d2b68(){const _0x48f775=_0x50eaf8;if(!this[_0x48f775('0x31c')][_0x1e94b9])this['_equips'][_0x1dd488]=new _0x5d08d2();}}else return ConfigManager[_0x50eaf8('0x34d')];}else{if(this[_0x50eaf8('0x79')]())return this['updatedLayoutStyle']()[_0x50eaf8('0x26d')](/LOWER/i);else{if(_0x50eaf8('0x94')!==_0x50eaf8('0x94')){function _0xecee9c(){const _0x202e62=_0x50eaf8;_0x208656+=_0x202e62('0x1ad')[_0x202e62('0x148')](_0x5aefaf[_0x202e62('0x203')]),_0x5c93be++;if(_0x557eef>=_0x17b5e0)return _0x1147c4;}}else Scene_MenuBase[_0x50eaf8('0x145')]['isRightInputMode'][_0x50eaf8('0x2e3')](this);}}},Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x278')]=function(){const _0x58548a=_0x507ed6;if(ConfigManager[_0x58548a('0x1a')]&&ConfigManager[_0x58548a('0x422')]!==undefined){if(_0x58548a('0x2a7')!=='CLldC'){function _0x35976a(){const _0x15276c=_0x58548a;_0x58e905=_0x1b5f4d||this[_0x15276c('0x3db')](),this['contentsBack'][_0x15276c('0x197')]=0xa0;const _0x4fba9a=_0x1a0f91[_0x15276c('0x299')]();this[_0x15276c('0x254')]['fillRect'](_0x21ffee+0x1,_0x37a706+0x1,_0x38a633-0x2,_0x54316c-0x2,_0x4fba9a),this[_0x15276c('0x254')][_0x15276c('0x197')]=0xff;}}else return ConfigManager['uiInputPosition'];}else{if(this[_0x58548a('0x79')]()){if(_0x58548a('0x30f')===_0x58548a('0x6')){function _0x4fde07(){const _0x73569b=_0x58548a,_0x31b002=_0x73569b('0x33f');if(this[_0x73569b('0x328')][_0x73569b('0x322')]<=0x0&&this[_0x73569b('0x328')][_0x73569b('0xde')]<=0x0&&!this[_0x73569b('0x104')][_0x31b002])return![];const _0x2e8034=this[_0x73569b('0x3dc')]();this[_0x73569b('0x23b')](_0x2e8034,_0x43e026,_0x55f62a,_0x255fb6,!![]);const _0x25fd1e=this[_0x73569b('0x3e2')]();return this['changeTextColor'](_0xb574d8['damageColor'](0x3)),this[_0x73569b('0x23b')](_0x25fd1e,_0x173da1,_0x935f0c,_0x32537e,![],'right'),this[_0x73569b('0x15b')](_0x315a34,_0x1571b6,_0xf41e39),this[_0x73569b('0x23a')](),!![];}}else return this[_0x58548a('0x2af')]()[_0x58548a('0x26d')](/RIGHT/i);}else{if('jxAsf'!==_0x58548a('0x289')){function _0x3a4b2a(){const _0x454e8e=_0x58548a;return this[_0x454e8e('0x79')]()?this[_0x454e8e('0xf3')]():_0x413a68[_0x454e8e('0x2f4')][_0x454e8e('0x92')][_0x454e8e('0x2e3')](this);}}else Scene_MenuBase[_0x58548a('0x145')][_0x58548a('0x278')][_0x58548a('0x2e3')](this);}}},Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x2af')]=function(){const _0x314eed=_0x507ed6;return VisuMZ[_0x314eed('0x2f4')][_0x314eed('0x227')][_0x314eed('0x36b')]['LayoutStyle'];},Scene_Equip[_0x507ed6('0x145')]['isUseModernControls']=function(){const _0x12dd96=_0x507ed6;return this['_commandWindow']&&this['_commandWindow'][_0x12dd96('0x244')]();},Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x79')]=function(){const _0x1df6c8=_0x507ed6;return VisuMZ['ItemsEquipsCore'][_0x1df6c8('0x227')]['EquipScene'][_0x1df6c8('0x47')];},VisuMZ[_0x507ed6('0x2f4')]['Scene_Equip_create']=Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x5b')],Scene_Equip['prototype'][_0x507ed6('0x5b')]=function(){const _0x36b7e4=_0x507ed6;VisuMZ[_0x36b7e4('0x2f4')]['Scene_Equip_create'][_0x36b7e4('0x2e3')](this),this[_0x36b7e4('0x244')]()&&this[_0x36b7e4('0x1be')]();},Scene_Equip['prototype'][_0x507ed6('0x3c1')]=function(){const _0x38da6f=_0x507ed6;return this[_0x38da6f('0x79')]()?this[_0x38da6f('0x2f0')]():Scene_MenuBase[_0x38da6f('0x145')]['helpWindowRect']['call'](this);},Scene_Equip[_0x507ed6('0x145')]['helpWindowRectItemsEquipsCore']=function(){const _0x1e5607=_0x507ed6,_0x5068bf=0x0,_0x477c7f=this[_0x1e5607('0x1f8')](),_0x266b37=Graphics['boxWidth'],_0x3fc875=this[_0x1e5607('0x2d8')]();return new Rectangle(_0x5068bf,_0x477c7f,_0x266b37,_0x3fc875);},VisuMZ['ItemsEquipsCore'][_0x507ed6('0x246')]=Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x386')],Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x386')]=function(){const _0x1a6bbb=_0x507ed6;if(this[_0x1a6bbb('0x79')]()){if(_0x1a6bbb('0x24')!==_0x1a6bbb('0x24')){function _0x592299(){return![];}}else return this[_0x1a6bbb('0x3e8')]();}else{if('jrdex'!==_0x1a6bbb('0x22'))return VisuMZ[_0x1a6bbb('0x2f4')]['Scene_Equip_statusWindowRect'][_0x1a6bbb('0x2e3')](this);else{function _0x3e0921(){this['postCreateItemsEquipsCore']();}}}},Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x3e8')]=function(){const _0x3f0864=_0x507ed6,_0x2cb62d=this[_0x3f0864('0x278')]()?0x0:Graphics['boxWidth']-this[_0x3f0864('0x174')](),_0x3d8354=this['mainAreaTop'](),_0x28793d=this[_0x3f0864('0x174')](),_0xe93f17=this[_0x3f0864('0x1b5')]();return new Rectangle(_0x2cb62d,_0x3d8354,_0x28793d,_0xe93f17);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x3fb')]=Scene_Equip[_0x507ed6('0x145')]['commandWindowRect'],Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x325')]=function(){const _0x5e5ced=_0x507ed6;if(this[_0x5e5ced('0x79')]())return this[_0x5e5ced('0x14a')]();else{if(_0x5e5ced('0x14f')==='QxlYn'){function _0x3edc0b(){const _0x477690=_0x5e5ced;_0x4f334e=_0x477690('0x192')[_0x477690('0x148')](_0x303c65['id']);}}else return VisuMZ[_0x5e5ced('0x2f4')][_0x5e5ced('0x3fb')]['call'](this);}},Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x3f5')]=function(){const _0x435fcc=_0x507ed6,_0x322aeb=VisuMZ[_0x435fcc('0x2f4')]['Settings'][_0x435fcc('0x36b')];return _0x322aeb['CommandAddOptimize']||_0x322aeb[_0x435fcc('0x97')];},Scene_Equip['prototype']['commandWindowRectItemsEquipsCore']=function(){const _0x2795cb=_0x507ed6,_0x3262d3=this[_0x2795cb('0x3f5')](),_0x69eb66=this[_0x2795cb('0x278')]()?this[_0x2795cb('0x174')]():0x0,_0x1b082c=this[_0x2795cb('0x15c')](),_0x3db604=Graphics[_0x2795cb('0x115')]-this[_0x2795cb('0x174')](),_0x17aaa7=_0x3262d3?this['calcWindowHeight'](0x1,!![]):0x0;return new Rectangle(_0x69eb66,_0x1b082c,_0x3db604,_0x17aaa7);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x82')]=Scene_Equip['prototype'][_0x507ed6('0xf8')],Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0xf8')]=function(){const _0x5aa5fc=_0x507ed6;VisuMZ[_0x5aa5fc('0x2f4')][_0x5aa5fc('0x82')][_0x5aa5fc('0x2e3')](this),this[_0x5aa5fc('0x244')]()&&this[_0x5aa5fc('0x1bd')]();},VisuMZ[_0x507ed6('0x2f4')]['Scene_Equip_slotWindowRect']=Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x10')],Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x10')]=function(){const _0x421510=_0x507ed6;if(this[_0x421510('0x79')]())return this[_0x421510('0x391')]();else{if(_0x421510('0x3a2')!==_0x421510('0x3fa'))return VisuMZ[_0x421510('0x2f4')]['Scene_Equip_slotWindowRect'][_0x421510('0x2e3')](this);else{function _0x12160b(){const _0x52a24d=_0x421510;return _0x49a173['ItemsEquipsCore'][_0x52a24d('0x227')]['EquipScene'][_0x52a24d('0x47')];}}}},Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x391')]=function(){const _0x325b73=_0x507ed6,_0x2f5dc0=this['commandWindowRect'](),_0x9b9947=this['isRightInputMode']()?this[_0x325b73('0x174')]():0x0,_0xe300b5=_0x2f5dc0['y']+_0x2f5dc0['height'],_0x3859d6=Graphics[_0x325b73('0x115')]-this[_0x325b73('0x174')](),_0x5ad487=this[_0x325b73('0x1b5')]()-_0x2f5dc0['height'];return new Rectangle(_0x9b9947,_0xe300b5,_0x3859d6,_0x5ad487);},VisuMZ['ItemsEquipsCore']['Scene_Equip_itemWindowRect']=Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x1e2')],Scene_Equip[_0x507ed6('0x145')]['itemWindowRect']=function(){const _0x27539d=_0x507ed6;if(this[_0x27539d('0x79')]()){if(_0x27539d('0x1a7')===_0x27539d('0x1a7'))return this['slotWindowRect']();else{function _0xe7c14a(){const _0x1f3466=_0x27539d;return this[_0x1f3466('0x25b')](_0x51dd5b(_0x1fbf61['$1'])[_0x1f3466('0x25f')](0x0,0x1f));}}}else{if('nrdYD'!=='nrdYD'){function _0x3dcb4a(){const _0x210aed=_0x27539d,_0x2c8878=_0x32b64b[_0x210aed('0xbb')]('['+_0x38b940['$1'][_0x210aed('0x26d')](/\d+/g)+']');for(const _0x525ffe of _0x2c8878){if(!_0x3dcb39[_0x210aed('0xd8')](_0x525ffe))return!![];}return![];}}else return VisuMZ[_0x27539d('0x2f4')][_0x27539d('0x20b')][_0x27539d('0x2e3')](this);}},Scene_Equip[_0x507ed6('0x145')]['statusWidth']=function(){const _0x3e5b5a=_0x507ed6;return this[_0x3e5b5a('0x79')]()?this[_0x3e5b5a('0x134')]():VisuMZ['ItemsEquipsCore']['Settings'][_0x3e5b5a('0x36b')][_0x3e5b5a('0x3bf')];},Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x134')]=function(){const _0x11deeb=_0x507ed6;return Math[_0x11deeb('0x2ae')](Graphics[_0x11deeb('0x115')]/0x2);},Scene_Equip[_0x507ed6('0x145')]['postCreateSlotWindowItemsEquipsCore']=function(){const _0x171129=_0x507ed6;this[_0x171129('0x8f')][_0x171129('0x224')](_0x171129('0x403'),this[_0x171129('0xcf')][_0x171129('0x31b')](this)),this[_0x171129('0x8f')][_0x171129('0x224')](_0x171129('0x416'),this['nextActor'][_0x171129('0x31b')](this)),this['_slotWindow']['setHandler'](_0x171129('0xab'),this['previousActor'][_0x171129('0x31b')](this));},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x8d')]=Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x1be')],Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x1be')]=function(){const _0x247b04=_0x507ed6;this['isUseModernControls']()&&(this[_0x247b04('0x180')][_0x247b04('0x56')](),this[_0x247b04('0x180')][_0x247b04('0x351')]()),VisuMZ[_0x247b04('0x2f4')][_0x247b04('0x8d')][_0x247b04('0x2e3')](this);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x1b9')]=Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x138')],Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x138')]=function(){const _0x11ea0e=_0x507ed6;this[_0x11ea0e('0x8f')][_0x11ea0e('0x2ca')]()>=0x0?(VisuMZ[_0x11ea0e('0x2f4')][_0x11ea0e('0x1b9')]['call'](this),this[_0x11ea0e('0x432')]()):(this[_0x11ea0e('0x8f')]['smoothSelect'](0x0),this[_0x11ea0e('0x8f')][_0x11ea0e('0x275')]());},Scene_Equip[_0x507ed6('0x145')]['onSlotOkAutoSelect']=function(){const _0x2c7dc0=_0x507ed6,_0x631c81=this[_0x2c7dc0('0x8f')][_0x2c7dc0('0x41a')](),_0x7b7aca=this[_0x2c7dc0('0x327')][_0x2c7dc0('0x3d2')][_0x2c7dc0('0x85')](_0x631c81),_0x5c4e3e=Math[_0x2c7dc0('0x2ae')](this[_0x2c7dc0('0x327')][_0x2c7dc0('0x3df')]()/0x2)-0x1;this[_0x2c7dc0('0x327')][_0x2c7dc0('0x1d5')](_0x7b7aca>=0x0?_0x7b7aca:0x0),this[_0x2c7dc0('0x327')][_0x2c7dc0('0x169')](this[_0x2c7dc0('0x327')][_0x2c7dc0('0x2ca')]()-_0x5c4e3e);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x41')]=Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0xb7')],Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0xb7')]=function(){const _0x3deeb6=_0x507ed6;VisuMZ[_0x3deeb6('0x2f4')][_0x3deeb6('0x41')][_0x3deeb6('0x2e3')](this),this[_0x3deeb6('0x244')]()&&(this['_commandWindow'][_0x3deeb6('0x1d5')](0x0),this['_slotWindow']['deactivate']());},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x106')]=Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x436')],Scene_Equip['prototype'][_0x507ed6('0x436')]=function(){const _0x4e1265=_0x507ed6;VisuMZ['ItemsEquipsCore'][_0x4e1265('0x106')]['call'](this);if(this[_0x4e1265('0x244')]()){if(_0x4e1265('0x1c1')===_0x4e1265('0x3d4')){function _0x7b20ae(){const _0x2a7d93=_0x4e1265;return _0x16db5b[_0x2a7d93('0x2f4')][_0x2a7d93('0x227')][_0x2a7d93('0x1eb')][_0x2a7d93('0x233')];}}else this[_0x4e1265('0x180')]['deactivate'](),this[_0x4e1265('0x180')][_0x4e1265('0x56')](),this['_slotWindow']['smoothSelect'](0x0),this[_0x4e1265('0x8f')][_0x4e1265('0x275')]();}},Scene_Equip['prototype'][_0x507ed6('0x3d8')]=function(){const _0x309cb8=_0x507ed6;if(!this[_0x309cb8('0x8f')])return![];if(!this[_0x309cb8('0x8f')][_0x309cb8('0x36c')])return![];return this[_0x309cb8('0x8f')]['isShiftRemoveShortcutEnabled']();},Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x159')]=function(){const _0x34d859=_0x507ed6;if(this['buttonAssistSlotWindowShift']()){if(_0x34d859('0x4c')!==_0x34d859('0xb1'))return TextManager[_0x34d859('0xad')](_0x34d859('0xbd'));else{function _0x5c3576(){const _0x28e46b=_0x34d859;_0x2900c0[_0x28e46b('0x145')][_0x28e46b('0x53')][_0x28e46b('0x2e3')](this);}}}return Scene_MenuBase[_0x34d859('0x145')][_0x34d859('0x159')][_0x34d859('0x2e3')](this);},Scene_Equip['prototype'][_0x507ed6('0x2cf')]=function(){const _0x335ab4=_0x507ed6;if(this[_0x335ab4('0x3d8')]()){if(_0x335ab4('0x3')!==_0x335ab4('0x3be'))return VisuMZ[_0x335ab4('0x2f4')][_0x335ab4('0x227')][_0x335ab4('0x36b')][_0x335ab4('0x3c6')];else{function _0x4eccf9(){const _0x41f902=_0x335ab4;this[_0x41f902('0xc0')](this['index']())?(this[_0x41f902('0x226')](),this['updateHelp']()):this['playBuzzerSound']();}}}return Scene_MenuBase[_0x335ab4('0x145')]['buttonAssistText3'][_0x335ab4('0x2e3')](this);},Scene_Equip[_0x507ed6('0x145')][_0x507ed6('0x67')]=function(){const _0x224fdc=_0x507ed6;if(this[_0x224fdc('0x3d8')]())return this[_0x224fdc('0x3cc')][_0x224fdc('0x5d')]/0x5/-0x3;return Scene_MenuBase['prototype'][_0x224fdc('0x67')][_0x224fdc('0x2e3')](this);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x26a')]=Scene_Load[_0x507ed6('0x145')][_0x507ed6('0xe9')],Scene_Load['prototype'][_0x507ed6('0xe9')]=function(){const _0x25b937=_0x507ed6;VisuMZ['ItemsEquipsCore'][_0x25b937('0x26a')][_0x25b937('0x2e3')](this),this[_0x25b937('0x1e5')]();},Scene_Load['prototype'][_0x507ed6('0x1e5')]=function(){const _0x10c96c=_0x507ed6;if($gameSystem['versionId']()!==$dataSystem[_0x10c96c('0xd6')]){if(_0x10c96c('0xe3')===_0x10c96c('0x2c5')){function _0xfff056(){const _0x22498f=_0x10c96c;if(_0x38c568){const _0x531952=_0x53f5e3+(this['lineHeight']()-_0x5c0bcf[_0x22498f('0xae')])/0x2,_0x40ee42=_0x5b9453[_0x22498f('0x3c9')]+0x4,_0x92a0b6=_0x329fe7[_0x22498f('0x1a1')](0x0,_0x19847f-_0x40ee42);this[_0x22498f('0x33b')](_0x11ef18[_0x22498f('0x22c')](_0x4508bd)),this['drawIcon'](_0x3708b8[_0x22498f('0x203')],_0x2c2cfd,_0x531952),this[_0x22498f('0x1f9')](_0x48e179[_0x22498f('0x251')],_0x1e22f9+_0x40ee42,_0x15c9ed,_0x92a0b6),this[_0x22498f('0x73')]();}}}else for(const _0x17e509 of $gameActors[_0x10c96c('0x3d2')]){if(_0x17e509)_0x17e509[_0x10c96c('0x28c')]();}}},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x18a')]=function(){const _0x57576b=_0x507ed6;if(ConfigManager[_0x57576b('0x1a')]&&ConfigManager[_0x57576b('0x34d')]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x57576b('0x79')]()){if(_0x57576b('0x108')!=='RBkyO')return this[_0x57576b('0x2af')]()['match'](/LOWER/i);else{function _0x33ce27(){const _0x33347f=_0x57576b;if(!this[_0x33347f('0x2af')]())return![];if(!this['isUseModernControls']())return![];if(!this['_itemWindow'])return![];if(!this[_0x33347f('0x327')][_0x33347f('0x36c')])return![];return this[_0x33347f('0x2af')]()&&this[_0x33347f('0x244')]();}}}else Scene_MenuBase['prototype'][_0x57576b('0x278')][_0x57576b('0x2e3')](this);}},Scene_Shop[_0x507ed6('0x145')]['isRightInputMode']=function(){const _0x58a2b8=_0x507ed6;if(ConfigManager[_0x58a2b8('0x1a')]&&ConfigManager[_0x58a2b8('0x422')]!==undefined){if(_0x58a2b8('0x290')===_0x58a2b8('0x124')){function _0x506385(){const _0x11be6a=_0x58a2b8;return _0x284930[_0x11be6a('0x2f4')][_0x11be6a('0x92')]['call'](this);}}else return ConfigManager[_0x58a2b8('0x422')];}else{if(this[_0x58a2b8('0x79')]()){if(_0x58a2b8('0x30a')===_0x58a2b8('0x3a4')){function _0x1d6f15(){const _0x1ea52f=_0x58a2b8;_0x1048ed['ItemsEquipsCore'][_0x1ea52f('0x26a')][_0x1ea52f('0x2e3')](this),this[_0x1ea52f('0x1e5')]();}}else return this[_0x58a2b8('0x2af')]()[_0x58a2b8('0x26d')](/RIGHT/i);}else{if(_0x58a2b8('0x2fb')!=='IgZOk')Scene_MenuBase[_0x58a2b8('0x145')][_0x58a2b8('0x278')]['call'](this);else{function _0x1c1804(){const _0xb4d759=_0x58a2b8;this[_0xb4d759('0x3c4')][_0xb4d759('0x275')]();}}}}},Scene_Shop[_0x507ed6('0x145')]['updatedLayoutStyle']=function(){const _0x56d93c=_0x507ed6;return VisuMZ[_0x56d93c('0x2f4')]['Settings']['ShopScene'][_0x56d93c('0x1e4')];},Scene_Shop['prototype']['isUseModernControls']=function(){const _0x3ef28c=_0x507ed6;return this[_0x3ef28c('0x3c4')]&&this[_0x3ef28c('0x3c4')]['isUseModernControls']();},Scene_Shop[_0x507ed6('0x145')]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x57f9c2=_0x507ed6;return VisuMZ[_0x57f9c2('0x2f4')]['Settings'][_0x57f9c2('0x14b')][_0x57f9c2('0x47')];},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x20c')]=Scene_Shop['prototype'][_0x507ed6('0x43b')],Scene_Shop['prototype'][_0x507ed6('0x43b')]=function(_0xe533e5,_0x506022){const _0x3d0846=_0x507ed6;_0xe533e5=JsonEx[_0x3d0846('0xa5')](_0xe533e5),VisuMZ[_0x3d0846('0x2f4')][_0x3d0846('0x20c')][_0x3d0846('0x2e3')](this,_0xe533e5,_0x506022),this[_0x3d0846('0x84')]();},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x84')]=function(){const _0x1e0b5b=_0x507ed6;this[_0x1e0b5b('0x2be')]=0x0;for(const _0xc46b6f of this['_goods']){if(_0x1e0b5b('0x1ef')==='aZEwV'){if(this[_0x1e0b5b('0x3d6')](_0xc46b6f))this[_0x1e0b5b('0x2be')]++;else{if(_0x1e0b5b('0x30b')!==_0x1e0b5b('0x30b')){function _0x2e433f(){const _0x2f4b33=_0x1e0b5b;_0xce5bc2[_0x2f4b33('0x2f4')]['Window_ItemList_updateHelp'][_0x2f4b33('0x2e3')](this),this[_0x2f4b33('0x183')]&&this['_statusWindow']['constructor']===_0x35c30a&&this[_0x2f4b33('0x183')][_0x2f4b33('0x40e')](this[_0x2f4b33('0x41a')]());}}else _0xc46b6f[0x0]=-0x1;}}else{function _0x1fbafd(){const _0x4e8fdd=_0x1e0b5b,_0x4926b1=this[_0x4e8fdd('0x1d2')](),_0x246bfc=this['calcWindowHeight'](0x1,!![]),_0x513410=this['isRightInputMode']()?0x0:_0x365975[_0x4e8fdd('0x115')]-_0x4926b1,_0x7a0f1f=this[_0x4e8fdd('0x15c')]();return new _0xa7002f(_0x513410,_0x7a0f1f,_0x4926b1,_0x246bfc);}}}},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x3d6')]=function(_0x6025b0){const _0xaddb0b=_0x507ed6;if(_0x6025b0[0x0]>0x2||_0x6025b0[0x0]<0x0)return![];const _0x4c8655=[$dataItems,$dataWeapons,$dataArmors][_0x6025b0[0x0]][_0x6025b0[0x1]];if(!_0x4c8655)return![];const _0x3856fe=_0x4c8655['note']||'';if(_0x3856fe['match'](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xaddb0b('0x157')!==_0xaddb0b('0x2df')){const _0x500e0e=JSON[_0xaddb0b('0xbb')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x150ea4 of _0x500e0e){if('bBRCm'===_0xaddb0b('0x1a0')){if(!$gameSwitches['value'](_0x150ea4))return![];}else{function _0x54781c(){const _0xddfb21=_0xaddb0b,_0x427cbd=_0x4789cf['x']+_0x4ba94c[_0xddfb21('0x2ae')]((_0x319063[_0xddfb21('0x5d')]-_0x549c5c)/0x2);this[_0xddfb21('0x2d6')](_0x4e6f3a,_0x427cbd,_0x38e81c['y'],_0x54551a);}}}return!![];}else{function _0x275014(){const _0x607830=_0xaddb0b;if(!this[_0x607830('0x430')]())return![];if(_0x3e79c0[_0x607830('0x80')][_0x607830('0x16d')]!==_0x5a51f6)return![];return _0x4615f8[_0x607830('0x305')]('down')&&(this[_0x607830('0x2bc')](),_0xdb0020['_scene'][_0x607830('0x1be')](),_0x3d9a28[_0x607830('0x80')][_0x607830('0x8f')][_0x607830('0x1d5')](-0x1)),![];}}}if(_0x3856fe[_0xaddb0b('0x26d')](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xaddb0b('0x71')===_0xaddb0b('0x2c3')){function _0x264bd9(){const _0x3d9675=_0xaddb0b;!_0x650fcf&&this[_0x3d9675('0x2bb')](null,_0x46446a);if(!this[_0x3d9675('0x405')]){const _0x23b95a=_0x5f2c93[_0x3d9675('0xa5')](this);_0x23b95a[_0x3d9675('0x405')]=!![],this[_0x3d9675('0x31c')][_0x3d925d]['setObject'](null),this[_0x3d9675('0x4b')](_0x23b95a);}else this[_0x3d9675('0x31c')][_0x48976b]['setObject'](null);_0xbe43fd=!![];}}else{const _0x421f4b=JSON[_0xaddb0b('0xbb')]('['+RegExp['$1'][_0xaddb0b('0x26d')](/\d+/g)+']');for(const _0x38c8c2 of _0x421f4b){if(_0xaddb0b('0x420')!==_0xaddb0b('0x420')){function _0x44d574(){return![];}}else{if(!$gameSwitches[_0xaddb0b('0xd8')](_0x38c8c2))return![];}}return!![];}}if(_0x3856fe[_0xaddb0b('0x26d')](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x466dd4=JSON[_0xaddb0b('0xbb')]('['+RegExp['$1'][_0xaddb0b('0x26d')](/\d+/g)+']');for(const _0x5e3908 of _0x466dd4){if($gameSwitches['value'](_0x5e3908))return!![];}return![];}if(_0x3856fe[_0xaddb0b('0x26d')](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xaddb0b('0x292')===_0xaddb0b('0x292')){const _0x4efa5e=JSON[_0xaddb0b('0xbb')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2dc454 of _0x4efa5e){if(_0xaddb0b('0x349')!==_0xaddb0b('0x3c5')){if(!$gameSwitches[_0xaddb0b('0xd8')](_0x2dc454))return!![];}else{function _0x40fd01(){const _0x3ee570=_0xaddb0b;_0x3e930c[_0x3ee570('0x2f4')][_0x3ee570('0x1c9')]={},_0x452d8f[_0x3ee570('0x2f4')][_0x3ee570('0x1c9')][_0x3ee570('0x14e')]=[],_0x4ad3ac[_0x3ee570('0x2f4')]['RegExp'][_0x3ee570('0x2c6')]=[];const _0x19290a=['MaxHP',_0x3ee570('0x3ef'),_0x3ee570('0x20d'),_0x3ee570('0x2da'),_0x3ee570('0x77'),_0x3ee570('0x380'),_0x3ee570('0x1fb'),'LUK'];for(const _0x1a5995 of _0x19290a){const _0x275bfa=_0x3ee570('0x11c')[_0x3ee570('0x148')](_0x1a5995);_0x196975[_0x3ee570('0x2f4')]['RegExp']['EquipParams'][_0x3ee570('0x146')](new _0x4bcbc4(_0x275bfa,'i'));const _0x40c5cd=_0x3ee570('0x41e')[_0x3ee570('0x148')](_0x1a5995);_0x571c3c[_0x3ee570('0x2f4')][_0x3ee570('0x1c9')][_0x3ee570('0x2c6')][_0x3ee570('0x146')](new _0x316a32(_0x40c5cd,'g'));}}}}return![];}else{function _0x13eb58(){const _0x55dcfd=_0xaddb0b;this[_0x55dcfd('0x3a9')]();}}}if(_0x3856fe[_0xaddb0b('0x26d')](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('lgDYE'!=='lgDYE'){function _0x4301d(){const _0x386f2a=_0xaddb0b;this[_0x386f2a('0x7f')](_0x59106c);}}else{const _0xccabe0=JSON['parse']('['+RegExp['$1'][_0xaddb0b('0x26d')](/\d+/g)+']');for(const _0x432e77 of _0xccabe0){if(!$gameSwitches[_0xaddb0b('0xd8')](_0x432e77))return!![];}return![];}}if(_0x3856fe[_0xaddb0b('0x26d')](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x59170d=JSON[_0xaddb0b('0xbb')]('['+RegExp['$1'][_0xaddb0b('0x26d')](/\d+/g)+']');for(const _0x2687d5 of _0x59170d){if(_0xaddb0b('0x3d0')===_0xaddb0b('0x338')){function _0x51ed5d(){const _0x40054f=_0xaddb0b,_0x3ac1c6=this[_0x40054f('0xe4')](_0x575ade),_0x4e835f=this[_0x40054f('0x434')](_0x33919d),_0x15a89e=this['textSizeEx'](_0x4e835f)[_0x40054f('0x5d')];this[_0x40054f('0x2b7')](this[_0x40054f('0x2de')](_0x53de9d));const _0x2bfd8b=this[_0x40054f('0x17c')]();if(_0x2bfd8b===_0x40054f('0x184'))this[_0x40054f('0x2d6')](_0x4e835f,_0x3ac1c6['x']+_0x3ac1c6[_0x40054f('0x5d')]-_0x15a89e,_0x3ac1c6['y'],_0x15a89e);else{if(_0x2bfd8b==='center'){const _0x32fcc4=_0x3ac1c6['x']+_0x12616c[_0x40054f('0x2ae')]((_0x3ac1c6[_0x40054f('0x5d')]-_0x15a89e)/0x2);this[_0x40054f('0x2d6')](_0x4e835f,_0x32fcc4,_0x3ac1c6['y'],_0x15a89e);}else this[_0x40054f('0x2d6')](_0x4e835f,_0x3ac1c6['x'],_0x3ac1c6['y'],_0x15a89e);}}}else{if($gameSwitches[_0xaddb0b('0xd8')](_0x2687d5))return![];}}return!![];}return!![];},VisuMZ['ItemsEquipsCore'][_0x507ed6('0x16b')]=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x5b')],Scene_Shop['prototype'][_0x507ed6('0x5b')]=function(){const _0x4cda73=_0x507ed6;VisuMZ['ItemsEquipsCore']['Scene_Shop_create']['call'](this);if(this[_0x4cda73('0x79')]()){if(_0x4cda73('0x37a')==='Dmntf'){function _0x4f1669(){const _0x4f6c2d=_0x4cda73;_0x4aff31[_0x4f6c2d('0x145')][_0x4f6c2d('0x399')][_0x4f6c2d('0x2e3')](this,_0xb98039);}}else this[_0x4cda73('0x385')]();}},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x385')]=function(){const _0x10dd01=_0x507ed6;this['_dummyWindow'][_0x10dd01('0xf1')](),this['_buyWindow'][_0x10dd01('0x376')](),this[_0x10dd01('0x438')][_0x10dd01('0x56')](),this['_statusWindow']['show']();},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x3c1')]=function(){const _0x118fc7=_0x507ed6;if(this[_0x118fc7('0x79')]()){if('rWPxF'!==_0x118fc7('0x3fc')){function _0x18c981(){_0x50c771[0x0]=-0x1;}}else return this['helpWindowRectItemsEquipsCore']();}else{if(_0x118fc7('0x35c')===_0x118fc7('0x35c'))return Scene_MenuBase[_0x118fc7('0x145')][_0x118fc7('0x3c1')][_0x118fc7('0x2e3')](this);else{function _0x2e8e49(){const _0x26650b=_0x118fc7,_0x347c6c=this[_0x26650b('0x328')][_0x26650b('0x7a')][_0x8eb897],_0x5baaad=_0x4d78fc[_0x26650b('0x145')][_0x26650b('0x439')](_0x347c6c,_0x3b5bfe);if(_0x5baaad>0x0){_0x556ece+=_0x26650b('0x1ad')[_0x26650b('0x148')](_0x5baaad),_0x2e0177++;if(_0x238962>=_0x2ec9a9)return _0x9e4cdd;}}}}},Scene_Shop['prototype'][_0x507ed6('0x2f0')]=function(){const _0x425669=_0x507ed6,_0x1290ce=0x0,_0x18aeec=this[_0x425669('0x1f8')](),_0x4f1b5d=Graphics[_0x425669('0x115')],_0x24c977=this['helpAreaHeight']();return new Rectangle(_0x1290ce,_0x18aeec,_0x4f1b5d,_0x24c977);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x340')]=Scene_Shop['prototype'][_0x507ed6('0x306')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x306')]=function(){const _0xe3607f=_0x507ed6;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0xe3607f('0xc4')===_0xe3607f('0xc4'))return this[_0xe3607f('0x18f')]();else{function _0x6354b0(){const _0x452038=_0xe3607f;if(_0x5a7b98['uiMenuStyle']&&_0x519b12[_0x452038('0x422')]!==_0x1c9b7d)return _0x2e15d3[_0x452038('0x422')];else{if(this[_0x452038('0x79')]())return this[_0x452038('0x2af')]()[_0x452038('0x26d')](/RIGHT/i);else _0x1153ff['prototype']['isRightInputMode']['call'](this);}}}}else return VisuMZ[_0xe3607f('0x2f4')]['Scene_Shop_goldWindowRect'][_0xe3607f('0x2e3')](this);},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x18f')]=function(){const _0x47739d=_0x507ed6,_0x40f198=this['mainCommandWidth'](),_0x39329d=this[_0x47739d('0xe1')](0x1,!![]),_0x1d6f4a=this[_0x47739d('0x278')]()?0x0:Graphics['boxWidth']-_0x40f198,_0xc2e4c9=this['mainAreaTop']();return new Rectangle(_0x1d6f4a,_0xc2e4c9,_0x40f198,_0x39329d);},VisuMZ['ItemsEquipsCore'][_0x507ed6('0x78')]=Scene_Shop[_0x507ed6('0x145')]['commandWindowRect'],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x325')]=function(){const _0x57073c=_0x507ed6;return this[_0x57073c('0x79')]()?this[_0x57073c('0x14a')]():VisuMZ['ItemsEquipsCore'][_0x57073c('0x78')]['call'](this);},Scene_Shop['prototype'][_0x507ed6('0x14a')]=function(){const _0x54dd63=_0x507ed6,_0x3189e4=this[_0x54dd63('0x278')]()?this['mainCommandWidth']():0x0,_0x2274a9=this[_0x54dd63('0x15c')](),_0x501638=Graphics['boxWidth']-this[_0x54dd63('0x1d2')](),_0x592fb2=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x3189e4,_0x2274a9,_0x501638,_0x592fb2);},VisuMZ['ItemsEquipsCore']['Scene_Shop_numberWindowRect']=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x14d')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x14d')]=function(){const _0x268663=_0x507ed6;if(this[_0x268663('0x79')]())return this[_0x268663('0x1ac')]();else{if('FQSUU'===_0x268663('0x32'))return VisuMZ[_0x268663('0x2f4')][_0x268663('0x2d1')][_0x268663('0x2e3')](this);else{function _0xc8f4c4(){const _0x8cead8=_0x268663;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['sellWindowRectItemsEquipsCore']():_0x18766c[_0x8cead8('0x2f4')][_0x8cead8('0x255')][_0x8cead8('0x2e3')](this);}}}},Scene_Shop['prototype']['numberWindowRectItemsEquipsCore']=function(){const _0x94de25=_0x507ed6,_0x5641ec=this[_0x94de25('0x180')]['y']+this[_0x94de25('0x180')][_0x94de25('0x16e')],_0x38e99=Graphics[_0x94de25('0x115')]-this['statusWidth'](),_0x59cc9c=this[_0x94de25('0x278')]()?Graphics[_0x94de25('0x115')]-_0x38e99:0x0,_0x95f815=this['mainAreaHeight']()-this[_0x94de25('0x180')][_0x94de25('0x16e')];return new Rectangle(_0x59cc9c,_0x5641ec,_0x38e99,_0x95f815);},VisuMZ[_0x507ed6('0x2f4')]['Scene_Shop_statusWindowRect']=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x386')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x386')]=function(){const _0x1d3e58=_0x507ed6;if(this[_0x1d3e58('0x79')]())return this['statusWindowRectItemsEquipsCore']();else{if(_0x1d3e58('0x364')==='IqtHc')return VisuMZ[_0x1d3e58('0x2f4')]['Scene_Shop_statusWindowRect'][_0x1d3e58('0x2e3')](this);else{function _0x29cef2(){const _0x1d1a0d=_0x1d3e58;_0x583a6a=this[_0x1d1a0d('0x17a')][_0x1d1a0d('0x3ee')](_0x4cd0d0),_0x4e2890=this['_tempActor']['param'](_0x50782a),_0x1b4d4=this[_0x1d1a0d('0x405')][_0x1d1a0d('0x3ee')](_0x4de43f);}}}},Scene_Shop['prototype'][_0x507ed6('0x3e8')]=function(){const _0x22285f=_0x507ed6,_0x43e1ff=this['statusWidth'](),_0x298eb6=this[_0x22285f('0x1b5')]()-this[_0x22285f('0x180')][_0x22285f('0x16e')],_0x558310=this[_0x22285f('0x278')]()?0x0:Graphics[_0x22285f('0x115')]-_0x43e1ff,_0xdde2f2=this[_0x22285f('0x180')]['y']+this[_0x22285f('0x180')][_0x22285f('0x16e')];return new Rectangle(_0x558310,_0xdde2f2,_0x43e1ff,_0x298eb6);},VisuMZ['ItemsEquipsCore']['Scene_Shop_buyWindowRect']=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x26')],Scene_Shop[_0x507ed6('0x145')]['buyWindowRect']=function(){const _0x592b0e=_0x507ed6;return this[_0x592b0e('0x79')]()?this[_0x592b0e('0x31e')]():VisuMZ[_0x592b0e('0x2f4')]['Scene_Shop_buyWindowRect'][_0x592b0e('0x2e3')](this);},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x31e')]=function(){const _0x3b25c7=_0x507ed6,_0xbb295f=this[_0x3b25c7('0x180')]['y']+this[_0x3b25c7('0x180')]['height'],_0x447186=Graphics['boxWidth']-this[_0x3b25c7('0x174')](),_0x2ea414=this[_0x3b25c7('0x1b5')]()-this[_0x3b25c7('0x180')][_0x3b25c7('0x16e')],_0x11ee30=this[_0x3b25c7('0x278')]()?Graphics['boxWidth']-_0x447186:0x0;return new Rectangle(_0x11ee30,_0xbb295f,_0x447186,_0x2ea414);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x34c')]=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x303')],Scene_Shop['prototype'][_0x507ed6('0x303')]=function(){const _0x12189c=_0x507ed6;VisuMZ[_0x12189c('0x2f4')][_0x12189c('0x34c')]['call'](this),this[_0x12189c('0x244')]()&&this[_0x12189c('0x1b3')]();},VisuMZ[_0x507ed6('0x2f4')]['Scene_Shop_categoryWindowRect']=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x320')],Scene_Shop['prototype'][_0x507ed6('0x320')]=function(){const _0x59cac0=_0x507ed6;if(this[_0x59cac0('0x79')]())return this[_0x59cac0('0xf3')]();else{if(_0x59cac0('0x150')===_0x59cac0('0x163')){function _0x2ff61d(){const _0x3dc5f4=_0x59cac0;_0x458731[_0x3dc5f4('0x145')]['callUpdateHelp'][_0x3dc5f4('0x2e3')](this);if(this[_0x3dc5f4('0xce')])this['updateCommandNameWindow']();}}else return VisuMZ[_0x59cac0('0x2f4')]['Scene_Shop_categoryWindowRect'][_0x59cac0('0x2e3')](this);}},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0xf3')]=function(){const _0x262a0f=_0x507ed6,_0x1d2641=this[_0x262a0f('0x180')]['y'],_0x5750c1=this['_commandWindow'][_0x262a0f('0x5d')],_0xa1caa6=this['calcWindowHeight'](0x1,!![]),_0x4d70f5=this[_0x262a0f('0x278')]()?Graphics[_0x262a0f('0x115')]-_0x5750c1:0x0;return new Rectangle(_0x4d70f5,_0x1d2641,_0x5750c1,_0xa1caa6);},Scene_Shop['prototype']['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x1b9e9f=_0x507ed6;delete this[_0x1b9e9f('0x3c4')][_0x1b9e9f('0xf9')]['ok'],delete this[_0x1b9e9f('0x3c4')]['_handlers'][_0x1b9e9f('0x403')];},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x2a')]=Scene_Shop['prototype'][_0x507ed6('0x1dc')],Scene_Shop[_0x507ed6('0x145')]['createSellWindow']=function(){const _0x1e9d3=_0x507ed6;VisuMZ['ItemsEquipsCore']['Scene_Shop_createSellWindow'][_0x1e9d3('0x2e3')](this);if(this[_0x1e9d3('0x79')]()){if(_0x1e9d3('0x24a')!==_0x1e9d3('0x147'))this[_0x1e9d3('0xc9')]();else{function _0x106231(){const _0x2667ca=_0x1e9d3,_0x59a4bb=_0x2667ca('0x16');if(this[_0x2667ca('0x104')][_0x59a4bb])return this[_0x2667ca('0x104')][_0x59a4bb];const _0xb82132=_0x554008[_0x2667ca('0x2f4')][_0x2667ca('0x227')][_0x2667ca('0x1eb')],_0x2a4b35='HitType%1'[_0x2667ca('0x148')](this['_item'][_0x2667ca('0x172')]);return _0xb82132[_0x2a4b35];}}}},VisuMZ['ItemsEquipsCore'][_0x507ed6('0x255')]=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x2bd')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x2bd')]=function(){const _0x4d305b=_0x507ed6;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x4d305b('0x202')==='ZmEUm')return this[_0x4d305b('0x353')]();else{function _0x2cc3d8(){const _0x3bc790=_0x4d305b;if(this[_0x3bc790('0x387')]()===_0x3bc790('0x427'))_0x581585[_0x3bc790('0x145')][_0x3bc790('0x3aa')][_0x3bc790('0x2e3')](this);}}}else return VisuMZ[_0x4d305b('0x2f4')][_0x4d305b('0x255')][_0x4d305b('0x2e3')](this);},Scene_Shop[_0x507ed6('0x145')]['sellWindowRectItemsEquipsCore']=function(){const _0x3d30ad=_0x507ed6,_0x2251c2=this['_categoryWindow']['y']+this[_0x3d30ad('0x3c4')][_0x3d30ad('0x16e')],_0x2ced11=Graphics[_0x3d30ad('0x115')]-this['statusWidth'](),_0x540244=this[_0x3d30ad('0x1b5')]()-this[_0x3d30ad('0x3c4')][_0x3d30ad('0x16e')],_0x25005e=this[_0x3d30ad('0x278')]()?Graphics['boxWidth']-_0x2ced11:0x0;return new Rectangle(_0x25005e,_0x2251c2,_0x2ced11,_0x540244);},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0xc9')]=function(){const _0x24fb58=_0x507ed6;this[_0x24fb58('0x3b2')][_0x24fb58('0x181')](this[_0x24fb58('0x183')]);},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x174')]=function(){const _0x31ec1d=_0x507ed6;return VisuMZ[_0x31ec1d('0x2f4')][_0x31ec1d('0x227')][_0x31ec1d('0x1eb')][_0x31ec1d('0x37d')];},VisuMZ['ItemsEquipsCore'][_0x507ed6('0x51')]=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x3c2')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x3c2')]=function(){const _0x1f2b06=_0x507ed6;VisuMZ[_0x1f2b06('0x2f4')][_0x1f2b06('0x51')][_0x1f2b06('0x2e3')](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x1f2b06('0x429')!=='jtFZM')this[_0x1f2b06('0x183')][_0x1f2b06('0x376')]();else{function _0x57993f(){this['drawTextEx'](_0x5ca68b,_0x1d6f13['x'],_0x4ed0db['y'],_0x26628f);}}}},VisuMZ[_0x507ed6('0x2f4')]['Scene_Shop_commandBuy']=Scene_Shop['prototype'][_0x507ed6('0x3ba')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x3ba')]=function(){const _0x4d7be1=_0x507ed6;VisuMZ[_0x4d7be1('0x2f4')][_0x4d7be1('0x3f8')][_0x4d7be1('0x2e3')](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x4d7be1('0x3a9')]();},Scene_Shop['prototype'][_0x507ed6('0x3a9')]=function(){const _0x50ebcd=_0x507ed6;this[_0x50ebcd('0x1e0')]=this['_buyWindowLastIndex']||0x0,this['_buyWindow'][_0x50ebcd('0x1d5')](this[_0x50ebcd('0x1e0')]);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x334')]=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x9e')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x9e')]=function(){const _0x3d0406=_0x507ed6;VisuMZ['ItemsEquipsCore'][_0x3d0406('0x334')]['call'](this),this[_0x3d0406('0x79')]()&&this['commandSellItemsEquipsCore'](),this['isUseModernControls']()&&(this['_categoryWindow']['smoothSelect'](0x0),this[_0x3d0406('0x259')]());},Scene_Shop['prototype'][_0x507ed6('0x2ea')]=function(){const _0x23ca1e=_0x507ed6;this[_0x23ca1e('0x438')][_0x23ca1e('0xf1')](),this[_0x23ca1e('0x180')][_0x23ca1e('0xf1')]();},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x167')]=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0xa0')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0xa0')]=function(){const _0x5033e9=_0x507ed6;VisuMZ[_0x5033e9('0x2f4')][_0x5033e9('0x167')][_0x5033e9('0x2e3')](this),this[_0x5033e9('0x79')]()&&this[_0x5033e9('0x156')]();},Scene_Shop[_0x507ed6('0x145')]['onBuyCancelItemsEquipsCore']=function(){const _0x4338e2=_0x507ed6;this[_0x4338e2('0x1e0')]=this[_0x4338e2('0x438')][_0x4338e2('0x2ca')](),this[_0x4338e2('0x438')][_0x4338e2('0x376')](),this[_0x4338e2('0x438')][_0x4338e2('0x56')](),this['_buyWindow'][_0x4338e2('0x35d')](0x0,0x0),this[_0x4338e2('0x183')][_0x4338e2('0x376')](),this[_0x4338e2('0x207')][_0x4338e2('0xf1')]();},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x32d')]=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x19d')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x19d')]=function(){const _0x1c9b95=_0x507ed6;VisuMZ[_0x1c9b95('0x2f4')][_0x1c9b95('0x32d')]['call'](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if('kWMWr'==='kWMWr')this[_0x1c9b95('0x39d')]();else{function _0x47acc7(){const _0x2e3f72=_0x1c9b95,_0x4f0f6f=this[_0x2e3f72('0x180')]['y'],_0x335d6f=this[_0x2e3f72('0x180')][_0x2e3f72('0x5d')],_0x59f8bc=this[_0x2e3f72('0xe1')](0x1,!![]),_0x2b0377=this[_0x2e3f72('0x278')]()?_0x20ca57[_0x2e3f72('0x115')]-_0x335d6f:0x0;return new _0x378f81(_0x2b0377,_0x4f0f6f,_0x335d6f,_0x59f8bc);}}}},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x39d')]=function(){const _0x53c062=_0x507ed6;this[_0x53c062('0x438')][_0x53c062('0x376')](),this[_0x53c062('0x180')][_0x53c062('0x376')]();},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x193')]=Scene_Shop['prototype'][_0x507ed6('0x374')],Scene_Shop['prototype'][_0x507ed6('0x374')]=function(){const _0x2137bb=_0x507ed6;VisuMZ[_0x2137bb('0x2f4')][_0x2137bb('0x193')][_0x2137bb('0x2e3')](this);if(this[_0x2137bb('0x79')]()){if('AMXtX'===_0x2137bb('0x3ce')){function _0x39cb59(){const _0x120b60=_0x2137bb;return _0x585fbc[_0x120b60('0x2f4')][_0x120b60('0x227')][_0x120b60('0x1eb')][_0x120b60('0x5e')];}}else this['onSellOkItemsEquipsCore']();}},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x3f3')]=function(){const _0x1841bb=_0x507ed6;this[_0x1841bb('0x3c4')]['show']();},VisuMZ['ItemsEquipsCore'][_0x507ed6('0x280')]=Scene_Shop['prototype'][_0x507ed6('0x375')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x375')]=function(){const _0x58c320=_0x507ed6;VisuMZ[_0x58c320('0x2f4')][_0x58c320('0x280')][_0x58c320('0x2e3')](this);if(this['isUseModernControls']()){if('rKkfp'===_0x58c320('0x2c7')){function _0x5e09ff(){const _0x8db1c5=_0x58c320;return _0x10b4da['prototype'][_0x8db1c5('0x3c1')][_0x8db1c5('0x2e3')](this);}}else this[_0x58c320('0x19d')]();}if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x58c320('0x406')===_0x58c320('0x406'))this[_0x58c320('0x207')]['hide']();else{function _0x51b256(){_0x275b02(_0x48fc0f);}}}},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0xff')]=Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x158')],Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x158')]=function(){const _0x18dae4=_0x507ed6;let _0x402c79=this[_0x18dae4('0x401')]();const _0x1e4210=this[_0x18dae4('0xfe')];return _0x402c79=VisuMZ[_0x18dae4('0x2f4')]['Settings'][_0x18dae4('0x14b')][_0x18dae4('0x1a5')][_0x18dae4('0x2e3')](this,_0x1e4210,_0x402c79),_0x402c79;},Scene_Shop['prototype'][_0x507ed6('0x401')]=function(){const _0x2300d9=_0x507ed6;if(!this[_0x2300d9('0xfe')])return 0x0;else{if(this['_item'][_0x2300d9('0x170')][_0x2300d9('0x26d')](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if(_0x2300d9('0xc2')==='IKkvl'){const _0x2701c2=String(RegExp['$1']);let _0x32adf4=this[_0x2300d9('0xfe')],_0x2ef379=_0x32adf4[_0x2300d9('0x178')]*this[_0x2300d9('0x101')]();try{eval(_0x2701c2);}catch(_0x29fd72){if($gameTemp[_0x2300d9('0x3e6')]())console[_0x2300d9('0x17e')](_0x29fd72);}if(isNaN(_0x2ef379))_0x2ef379=0x0;return Math[_0x2300d9('0x2ae')](_0x2ef379);}else{function _0x42460b(){const _0x3f4587=_0x2300d9;this[_0x3f4587('0x1cc')]();}}}else return this[_0x2300d9('0xfe')]['note'][_0x2300d9('0x26d')](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x2300d9('0x2ae')](this[_0x2300d9('0xfe')]['price']*this[_0x2300d9('0x101')]());}},Scene_Shop['prototype'][_0x507ed6('0x101')]=function(){const _0x4b9ca2=_0x507ed6;return VisuMZ[_0x4b9ca2('0x2f4')]['Settings'][_0x4b9ca2('0x14b')]['SellPriceRate'];},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x3f6')]=function(){const _0x4f36dd=_0x507ed6;if(!this['updatedLayoutStyle']())return![];if(!this[_0x4f36dd('0x244')]())return![];if(!this[_0x4f36dd('0x3b2')])return![];if(!this['_sellWindow'][_0x4f36dd('0x36c')])return![];return this[_0x4f36dd('0x2af')]()&&this[_0x4f36dd('0x244')]();},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x297')]=function(){const _0x39fe33=_0x507ed6;if(this[_0x39fe33('0x3f6')]()){if(this[_0x39fe33('0x3b2')]['maxCols']()===0x1)return TextManager[_0x39fe33('0x2e9')](_0x39fe33('0x268'),_0x39fe33('0x184'));else{if('wJXGD'===_0x39fe33('0x23d'))return TextManager[_0x39fe33('0x2e9')](_0x39fe33('0xab'),'pagedown');else{function _0x4d1b55(){this['_doubleTouch']=!![];}}}}else{if(this[_0x39fe33('0x109')]&&this[_0x39fe33('0x109')][_0x39fe33('0x36c')]){if('Kpppf'===_0x39fe33('0x10b'))return TextManager[_0x39fe33('0x2e9')](_0x39fe33('0x268'),_0x39fe33('0x184'));else{function _0xfd712(){const _0x232198=_0x39fe33,_0x47e7e8=_0x5335fb['$1']['split'](/[\r\n]+/);for(const _0x5836aa of _0x47e7e8){_0x4364eb[_0x232198('0xaa')]['push'](_0x5836aa[_0x232198('0x215')]()[_0x232198('0x11a')]());}}}}}return Scene_MenuBase[_0x39fe33('0x145')]['buttonAssistKey1']['call'](this);},Scene_Shop['prototype'][_0x507ed6('0x2e7')]=function(){const _0x6bcdae=_0x507ed6;if(this['_numberWindow']&&this[_0x6bcdae('0x109')][_0x6bcdae('0x36c')]){if(_0x6bcdae('0x6c')==='vYXBF')return TextManager[_0x6bcdae('0x2e9')]('up',_0x6bcdae('0xf0'));else{function _0x558492(){const _0x1ac7eb=_0x6bcdae;_0x95c847=_0x1ac7eb('0x5')[_0x1ac7eb('0x148')](_0x26ce96['id']);}}}return Scene_MenuBase[_0x6bcdae('0x145')]['buttonAssistKey2'][_0x6bcdae('0x2e3')](this);},Scene_Shop[_0x507ed6('0x145')]['buttonAssistText1']=function(){const _0x5d13ab=_0x507ed6;if(this['buttonAssistItemListRequirement']()){if(_0x5d13ab('0x393')!==_0x5d13ab('0x393')){function _0x3130c9(){const _0x1cc23a=_0x5d13ab;return _0x107f16[_0x1cc23a('0x2f4')][_0x1cc23a('0x227')][_0x1cc23a('0x1eb')][_0x1cc23a('0x40d')];}}else return VisuMZ[_0x5d13ab('0x2f4')][_0x5d13ab('0x227')]['ItemScene'][_0x5d13ab('0x368')];}else{if(this[_0x5d13ab('0x109')]&&this[_0x5d13ab('0x109')][_0x5d13ab('0x36c')]){if('knWYW'!==_0x5d13ab('0x1f6')){function _0x272f0c(){if(_0x36960b['value'](_0x182b2b))return!![];}}else return VisuMZ[_0x5d13ab('0x2f4')]['Settings'][_0x5d13ab('0x14b')][_0x5d13ab('0x40c')];}}return Scene_MenuBase[_0x5d13ab('0x145')]['buttonAssistText1']['call'](this);},Scene_Shop[_0x507ed6('0x145')][_0x507ed6('0x291')]=function(){const _0x5854c4=_0x507ed6;if(this['_numberWindow']&&this[_0x5854c4('0x109')][_0x5854c4('0x36c')]){if(_0x5854c4('0x329')==='eHaGZ')return VisuMZ[_0x5854c4('0x2f4')][_0x5854c4('0x227')]['ShopScene'][_0x5854c4('0x2fa')];else{function _0x4b87c9(){const _0x408b43=_0x5854c4;_0x46ba69=_0x408b43('0x5')[_0x408b43('0x148')](_0x19769f['id']);}}}return Scene_MenuBase['prototype'][_0x5854c4('0x291')][_0x5854c4('0x2e3')](this);};function Sprite_NewLabel(){const _0x261792=_0x507ed6;this[_0x261792('0x9a')](...arguments);}Sprite_NewLabel[_0x507ed6('0x145')]=Object[_0x507ed6('0x5b')](Sprite[_0x507ed6('0x145')]),Sprite_NewLabel[_0x507ed6('0x145')][_0x507ed6('0x16d')]=Sprite_NewLabel,Sprite_NewLabel[_0x507ed6('0x145')][_0x507ed6('0x9a')]=function(){const _0x8a8067=_0x507ed6;Sprite[_0x8a8067('0x145')][_0x8a8067('0x9a')][_0x8a8067('0x2e3')](this),this[_0x8a8067('0x3eb')]();},Sprite_NewLabel[_0x507ed6('0x145')][_0x507ed6('0x3eb')]=function(){const _0x3513e7=_0x507ed6,_0x13b891=ImageManager['iconWidth'],_0x4022db=ImageManager['iconHeight'];this[_0x3513e7('0x162')]=new Bitmap(_0x13b891,_0x4022db),this['drawNewLabelIcon'](),this[_0x3513e7('0x30c')]();},Sprite_NewLabel[_0x507ed6('0x145')][_0x507ed6('0x2ad')]=function(){const _0x2c04c2=_0x507ed6,_0x5ca0e9=VisuMZ[_0x2c04c2('0x2f4')][_0x2c04c2('0x227')]['New']['Icon'];if(_0x5ca0e9<=0x0)return;const _0x4eb0b7=ImageManager[_0x2c04c2('0x37e')](_0x2c04c2('0x25a')),_0x3d6749=ImageManager[_0x2c04c2('0x3c9')],_0x52563c=ImageManager[_0x2c04c2('0xae')],_0xd9fb64=_0x5ca0e9%0x10*_0x3d6749,_0x45381d=Math[_0x2c04c2('0x2ae')](_0x5ca0e9/0x10)*_0x52563c;this[_0x2c04c2('0x162')]['blt'](_0x4eb0b7,_0xd9fb64,_0x45381d,_0x3d6749,_0x52563c,0x0,0x0);},Sprite_NewLabel[_0x507ed6('0x145')][_0x507ed6('0x30c')]=function(){const _0x494642=_0x507ed6,_0x572a18=VisuMZ['ItemsEquipsCore'][_0x494642('0x227')]['New'],_0x43e3be=_0x572a18[_0x494642('0x177')];if(_0x43e3be==='')return;const _0x13038c=ImageManager[_0x494642('0x3c9')],_0x222b61=ImageManager[_0x494642('0xae')];this['bitmap']['fontFace']=_0x572a18[_0x494642('0xba')]||$gameSystem[_0x494642('0x33')](),this[_0x494642('0x162')][_0x494642('0x25b')]=this[_0x494642('0x20f')](),this[_0x494642('0x162')][_0x494642('0x28d')]=_0x572a18[_0x494642('0x1f7')],this['bitmap'][_0x494642('0x1f9')](_0x43e3be,0x0,_0x222b61/0x2,_0x13038c,_0x222b61/0x2,_0x494642('0x0'));},Sprite_NewLabel[_0x507ed6('0x145')]['getTextColor']=function(){const _0xdbafd0=_0x507ed6,_0x386d53=VisuMZ['ItemsEquipsCore'][_0xdbafd0('0x227')]['New'][_0xdbafd0('0xb4')];return _0x386d53[_0xdbafd0('0x26d')](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0x386d53);},Window_Base[_0x507ed6('0x145')][_0x507ed6('0xd4')]=function(_0x4c8777,_0x52b8ee,_0x468e85,_0x373163){const _0x7d43aa=_0x507ed6;if(_0x4c8777){const _0x4b5204=_0x468e85+(this[_0x7d43aa('0x3db')]()-ImageManager['iconHeight'])/0x2,_0x18be29=ImageManager['iconWidth']+0x4,_0x29e79a=Math[_0x7d43aa('0x1a1')](0x0,_0x373163-_0x18be29);this[_0x7d43aa('0x33b')](ColorManager[_0x7d43aa('0x22c')](_0x4c8777)),this[_0x7d43aa('0x1')](_0x4c8777[_0x7d43aa('0x203')],_0x52b8ee,_0x4b5204),this['drawText'](_0x4c8777[_0x7d43aa('0x251')],_0x52b8ee+_0x18be29,_0x468e85,_0x29e79a),this[_0x7d43aa('0x73')]();}},Window_Base[_0x507ed6('0x145')][_0x507ed6('0x36f')]=function(_0x2b0206,_0x349590,_0x377c53,_0x615311){const _0x24fdad=_0x507ed6;if(this['isDrawItemNumber'](_0x2b0206)){if(_0x24fdad('0x152')!==_0x24fdad('0x152')){function _0x5cd314(){const _0x298031=_0x24fdad;return this[_0x298031('0x79')]()?this['statusWindowRectItemsEquipsCore']():_0x551ca4[_0x298031('0x2f4')][_0x298031('0x21c')]['call'](this);}}else{this['resetFontSettings']();const _0x338eba=VisuMZ[_0x24fdad('0x2f4')][_0x24fdad('0x227')][_0x24fdad('0x21d')],_0x4c74cd=_0x338eba[_0x24fdad('0x247')],_0x49a26e=_0x4c74cd[_0x24fdad('0x148')]($gameParty['numItems'](_0x2b0206));this[_0x24fdad('0x281')][_0x24fdad('0x28d')]=_0x338eba[_0x24fdad('0x1c3')],this[_0x24fdad('0x1f9')](_0x49a26e,_0x349590,_0x377c53,_0x615311,_0x24fdad('0x184')),this[_0x24fdad('0x23a')]();}}},Window_Base['prototype']['isDrawItemNumber']=function(_0x48cdc3){const _0x10e268=_0x507ed6;if(DataManager['isKeyItem'](_0x48cdc3))return $dataSystem[_0x10e268('0x1f0')];return!![];},Window_Base[_0x507ed6('0x145')][_0x507ed6('0x15b')]=function(_0x18bb0d,_0x9740ab,_0x1075e3,_0x47477a,_0x1c6684){const _0x502aa7=_0x507ed6;_0x1c6684=Math[_0x502aa7('0x1a1')](_0x1c6684||0x1,0x1);while(_0x1c6684--){_0x47477a=_0x47477a||this[_0x502aa7('0x3db')](),this['contentsBack']['paintOpacity']=0xa0;const _0x3981b2=ColorManager['gaugeBackColor']();this[_0x502aa7('0x254')][_0x502aa7('0xd1')](_0x18bb0d+0x1,_0x9740ab+0x1,_0x1075e3-0x2,_0x47477a-0x2,_0x3981b2),this[_0x502aa7('0x254')][_0x502aa7('0x197')]=0xff;}},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x4f')]=Window_Selectable['prototype'][_0x507ed6('0x9a')],Window_Selectable['prototype'][_0x507ed6('0x9a')]=function(_0x528cd2){const _0x2a63b5=_0x507ed6;this[_0x2a63b5('0xd2')](),VisuMZ[_0x2a63b5('0x2f4')][_0x2a63b5('0x4f')]['call'](this,_0x528cd2);},Window_Selectable[_0x507ed6('0x145')][_0x507ed6('0xd2')]=function(){const _0x212c95=_0x507ed6;this[_0x212c95('0x1fd')]={},this[_0x212c95('0x2c4')]=0xff,this['_newLabelOpacityChange']=VisuMZ[_0x212c95('0x2f4')][_0x212c95('0x227')][_0x212c95('0x27')]['FadeSpeed'],this[_0x212c95('0x5f')]=VisuMZ[_0x212c95('0x2f4')]['Settings']['New'][_0x212c95('0x125')];},Window_Selectable['prototype'][_0x507ed6('0x166')]=function(){return![];},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x10f')]=Window_Selectable[_0x507ed6('0x145')][_0x507ed6('0x367')],Window_Selectable['prototype'][_0x507ed6('0x367')]=function(_0x21beb0){const _0xdc6ec=_0x507ed6;VisuMZ[_0xdc6ec('0x2f4')]['Window_Selectable_setHelpWindowItem'][_0xdc6ec('0x2e3')](this,_0x21beb0);if(this[_0xdc6ec('0x166')]())this[_0xdc6ec('0x187')](_0x21beb0);},Window_Selectable[_0x507ed6('0x145')][_0x507ed6('0x187')]=function(_0x282d39){const _0x450a44=_0x507ed6;if(!_0x282d39)return;$gameParty[_0x450a44('0x245')](_0x282d39);let _0x190197='';if(DataManager['isItem'](_0x282d39))_0x190197=_0x450a44('0x192')[_0x450a44('0x148')](_0x282d39['id']);else{if(DataManager['isWeapon'](_0x282d39)){if('yBgyN'===_0x450a44('0x9f')){function _0x2540a9(){const _0x529861=_0x450a44;_0x39cecd[_0x529861('0x103')](_0x22a03a[_0x529861('0x1d8')]());}}else _0x190197='weapon-%1'[_0x450a44('0x148')](_0x282d39['id']);}else{if(DataManager[_0x450a44('0x2d9')](_0x282d39))_0x190197='armor-%1'[_0x450a44('0x148')](_0x282d39['id']);else return;}}const _0x33455d=this[_0x450a44('0x1fd')][_0x190197];if(_0x33455d)_0x33455d[_0x450a44('0xf1')]();},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x2ed')]=Window_Selectable[_0x507ed6('0x145')][_0x507ed6('0x41c')],Window_Selectable[_0x507ed6('0x145')][_0x507ed6('0x41c')]=function(){const _0x49805c=_0x507ed6;this[_0x49805c('0x365')](),VisuMZ['ItemsEquipsCore'][_0x49805c('0x2ed')][_0x49805c('0x2e3')](this);},Window_Selectable[_0x507ed6('0x145')][_0x507ed6('0x365')]=function(){const _0x322177=_0x507ed6;for(const _0x47fe96 of Object['values'](this[_0x322177('0x1fd')])){_0x47fe96[_0x322177('0xf1')]();}},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x1ed')]=Window_Selectable['prototype']['update'],Window_Selectable[_0x507ed6('0x145')][_0x507ed6('0x3d1')]=function(){const _0x185468=_0x507ed6;this['updateNewLabelOpacity'](),VisuMZ[_0x185468('0x2f4')][_0x185468('0x1ed')]['call'](this);},Window_Selectable[_0x507ed6('0x145')][_0x507ed6('0x13f')]=function(){const _0x5c5517=_0x507ed6;if(!this[_0x5c5517('0x166')]())return;const _0x395455=this[_0x5c5517('0x5f')];this[_0x5c5517('0x2c4')]+=this[_0x5c5517('0x135')];(this[_0x5c5517('0x2c4')]>=_0x395455||this[_0x5c5517('0x2c4')]<=0x0)&&(this[_0x5c5517('0x135')]*=-0x1);this[_0x5c5517('0x2c4')]=this['_newLabelOpacity'][_0x5c5517('0x25f')](0x0,_0x395455);for(const _0x27be44 of Object[_0x5c5517('0x3a1')](this[_0x5c5517('0x1fd')])){if(_0x5c5517('0x16f')==='BIwTm'){function _0x1a207d(){return![];}}else _0x27be44[_0x5c5517('0x378')]=this[_0x5c5517('0x2c4')];}},Window_Selectable['prototype'][_0x507ed6('0x3dd')]=function(_0x4684ed){const _0x5d9ed2=_0x507ed6,_0x5df530=this[_0x5d9ed2('0x1fd')];if(_0x5df530[_0x4684ed]){if('vkDbR'!==_0x5d9ed2('0x407'))return _0x5df530[_0x4684ed];else{function _0x2735a0(){const _0x33836e=_0x5d9ed2;return _0x47e907[_0x33836e('0x2f4')]['Settings'][_0x33836e('0x1eb')][_0x33836e('0x354')];}}}else{if(_0x5d9ed2('0x1c4')!==_0x5d9ed2('0x1c4')){function _0x522c56(){const _0x3c9cf8=_0x5d9ed2;if(this[_0x3c9cf8('0x3f6')]())return this['_itemWindow'][_0x3c9cf8('0x2ef')]()===0x1?_0x1979c2['getInputMultiButtonStrings']('left',_0x3c9cf8('0x184')):_0x43fdf1[_0x3c9cf8('0x2e9')](_0x3c9cf8('0xab'),'pagedown');return _0x738eca[_0x3c9cf8('0x145')][_0x3c9cf8('0x297')]['call'](this);}}else{const _0x2fcfe5=new Sprite_NewLabel();return _0x5df530[_0x4684ed]=_0x2fcfe5,this[_0x5d9ed2('0x3f9')](_0x2fcfe5),_0x2fcfe5;}}},Window_Selectable[_0x507ed6('0x145')][_0x507ed6('0x17d')]=function(_0xfa169b,_0x178745,_0x352b8e){const _0x32bdb1=_0x507ed6;let _0x362b0d='';if(DataManager[_0x32bdb1('0x1c2')](_0xfa169b))_0x362b0d=_0x32bdb1('0x192')[_0x32bdb1('0x148')](_0xfa169b['id']);else{if(DataManager[_0x32bdb1('0x2f7')](_0xfa169b)){if('BOyFp'!==_0x32bdb1('0x2cd'))_0x362b0d=_0x32bdb1('0x2f5')[_0x32bdb1('0x148')](_0xfa169b['id']);else{function _0x33e347(){const _0x498af3=_0x32bdb1;if(_0xcde1d8>=0x0)_0x3f0b8f===this[_0x498af3('0x2ca')]()&&(this['_doubleTouch']=!![]),this[_0x498af3('0x275')](),this[_0x498af3('0x423')](_0x2e2140);else _0x4bb25a[_0x498af3('0xd7')]()>=0x0&&(this[_0x498af3('0x351')](),this[_0x498af3('0x56')]());}}}else{if(DataManager[_0x32bdb1('0x2d9')](_0xfa169b))_0x362b0d=_0x32bdb1('0x5')[_0x32bdb1('0x148')](_0xfa169b['id']);else return;}}const _0x43599b=this['createNewLabelSprite'](_0x362b0d);_0x43599b[_0x32bdb1('0x9b')](_0x178745,_0x352b8e),_0x43599b[_0x32bdb1('0x376')](),_0x43599b[_0x32bdb1('0x378')]=this[_0x32bdb1('0x2c4')];},Window_ItemCategory[_0x507ed6('0x288')]=VisuMZ['ItemsEquipsCore'][_0x507ed6('0x227')][_0x507ed6('0x133')][_0x507ed6('0x144')],Window_ItemCategory['categoryItemTypes']=[_0x507ed6('0xdd'),_0x507ed6('0x42f'),_0x507ed6('0x2c2'),_0x507ed6('0x126'),_0x507ed6('0x2ce'),_0x507ed6('0x4e'),_0x507ed6('0xfd'),_0x507ed6('0x25'),_0x507ed6('0x363')],VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x33c')]=Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x9a')],Window_ItemCategory['prototype'][_0x507ed6('0x9a')]=function(_0x4f09ab){const _0x164d70=_0x507ed6;VisuMZ[_0x164d70('0x2f4')][_0x164d70('0x33c')][_0x164d70('0x2e3')](this,_0x4f09ab),this[_0x164d70('0x3ec')](_0x4f09ab);},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x3ec')]=function(_0x45a3b3){const _0x3af47d=_0x507ed6,_0x590802=new Rectangle(0x0,0x0,_0x45a3b3[_0x3af47d('0x5d')],_0x45a3b3[_0x3af47d('0x16e')]);this[_0x3af47d('0x301')]=new Window_Base(_0x590802),this[_0x3af47d('0x301')][_0x3af47d('0x378')]=0x0,this[_0x3af47d('0x3e5')](this['_categoryNameWindow']),this[_0x3af47d('0x7c')]();},Window_ItemCategory[_0x507ed6('0x145')]['isUseModernControls']=function(){const _0x49266b=_0x507ed6;return Imported[_0x49266b('0x200')]&&Window_HorzCommand[_0x49266b('0x145')][_0x49266b('0x244')][_0x49266b('0x2e3')](this);},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x3aa')]=function(){const _0x2b4f29=_0x507ed6;if(!this[_0x2b4f29('0x244')]())Window_HorzCommand[_0x2b4f29('0x145')]['playOkSound'][_0x2b4f29('0x2e3')](this);},Window_ItemCategory[_0x507ed6('0x145')]['maxCols']=function(){const _0x340667=_0x507ed6;return this[_0x340667('0x3ea')]?this['maxItems']():0x4;},Window_ItemCategory[_0x507ed6('0x145')]['update']=function(){const _0x4ec518=_0x507ed6;Window_HorzCommand[_0x4ec518('0x145')][_0x4ec518('0x3d1')]['call'](this);if(this[_0x4ec518('0x327')]){if(_0x4ec518('0x366')!==_0x4ec518('0x366')){function _0x532c78(){const _0x2991a2=_0x4ec518;return this[_0x2991a2('0x2ef')]()<=0x1?_0x3a1ac5[_0x2991a2('0x145')][_0x2991a2('0x382')][_0x2991a2('0x2e3')](this):_0x26bffd[_0x2991a2('0x2f4')][_0x2991a2('0x32c')][_0x2991a2('0x2e3')](this);}}else this[_0x4ec518('0x327')][_0x4ec518('0x1cb')](this[_0x4ec518('0x298')]());}},Window_ItemCategory['prototype'][_0x507ed6('0x53')]=function(){const _0xe08adb=_0x507ed6;if(this[_0xe08adb('0x430')]()){if(_0xe08adb('0x15d')==='MOzwx'){function _0x1c8ad8(){const _0x488914=_0xe08adb,_0x37c1e8=_0x491fe4['ItemsEquipsCore'][_0x488914('0x227')][_0x488914('0x1eb')][_0x488914('0x2b')];return _0x37c1e8[_0x488914('0x148')](_0x549fdd['mp']);}}else{const _0x3d6491=this['index']();if(this[_0xe08adb('0x327')]&&this[_0xe08adb('0x327')][_0xe08adb('0x2ef')]()<=0x1)Input[_0xe08adb('0x105')](_0xe08adb('0x184'))&&this[_0xe08adb('0x371')](Input[_0xe08adb('0x305')]('right')),Input[_0xe08adb('0x105')]('left')&&this[_0xe08adb('0x3b3')](Input[_0xe08adb('0x305')]('left'));else{if(this[_0xe08adb('0x327')]&&this[_0xe08adb('0x327')][_0xe08adb('0x2ef')]()>0x1){Input[_0xe08adb('0x105')]('pagedown')&&!Input[_0xe08adb('0xec')](_0xe08adb('0xbd'))&&this[_0xe08adb('0x371')](Input[_0xe08adb('0x305')]('pagedown'));if(Input['isRepeated'](_0xe08adb('0xab'))&&!Input[_0xe08adb('0xec')](_0xe08adb('0xbd'))){if(_0xe08adb('0x228')!==_0xe08adb('0x400'))this[_0xe08adb('0x3b3')](Input[_0xe08adb('0x305')]('pageup'));else{function _0x52e91f(){const _0x36b6fa=_0xe08adb;if(_0x2c872b>=0x0)_0x33e9f8===this['index']()&&(this[_0x36b6fa('0x358')]=!![]),this[_0x36b6fa('0x275')](),this['select'](_0x4d5e6b);else _0x490a17[_0x36b6fa('0xd7')]()>=0x0&&(this[_0x36b6fa('0x351')](),this[_0x36b6fa('0x56')]());}}}}}if(this[_0xe08adb('0x2ca')]()!==_0x3d6491){if(_0xe08adb('0x3af')===_0xe08adb('0x3af'))this[_0xe08adb('0x2bc')]();else{function _0x4a7e1(){const _0x2f64ec=_0xe08adb,_0x577f75=_0x1ceada['ItemsEquipsCore']['Settings'][_0x2f64ec('0x1eb')][_0x2f64ec('0x37f')];return _0x577f75[_0x2f64ec('0x148')](_0x4388d8['mp']);}}}}}},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x57')]=function(){const _0x242004=_0x507ed6;if(this[_0x242004('0x244')]())return;Window_HorzCommand['prototype'][_0x242004('0x57')][_0x242004('0x2e3')](this);},Window_ItemCategory['prototype'][_0x507ed6('0x1bb')]=function(){const _0x4a4aed=_0x507ed6;return this[_0x4a4aed('0x244')]()?![]:Window_HorzCommand[_0x4a4aed('0x145')][_0x4a4aed('0x1bb')]['call'](this);},Window_ItemCategory[_0x507ed6('0x145')]['processTouchModernControls']=function(){const _0x35a358=_0x507ed6;if(this[_0x35a358('0x236')]()){if(_0x35a358('0x189')===_0x35a358('0x189')){if(TouchInput[_0x35a358('0x305')]()){if('QIBSk'!=='QIBSk'){function _0xa21ff3(){const _0x21bfe2=_0x35a358;_0x300cbd[_0x21bfe2('0x145')][_0x21bfe2('0x209')][_0x21bfe2('0x2e3')](this);if(this['_actor']&&this[_0x21bfe2('0x183')]&&this[_0x21bfe2('0x3de')]>=0x0){const _0x1e2e41=_0x1fb6c8['makeDeepCopy'](this['_actor']);_0x1e2e41['_tempActor']=!![],_0x1e2e41[_0x21bfe2('0x211')](this[_0x21bfe2('0x3de')],this['item']()),this[_0x21bfe2('0x183')]['setTempActor'](_0x1e2e41);}}}else this[_0x35a358('0x399')](!![]);}if(TouchInput['isClicked']())this['onTouchOk']();else{if(TouchInput[_0x35a358('0x1bf')]()){if(_0x35a358('0xb')===_0x35a358('0x398')){function _0x29362b(){return'100%';}}else this[_0x35a358('0x232')]();}}}else{function _0x32877c(){const _0x261a63=_0x35a358;_0x4b545c[_0x261a63('0x2f4')][_0x261a63('0xaf')][_0x261a63('0x2e3')](this,_0x4280c3);}}}},Window_ItemCategory[_0x507ed6('0x145')]['onTouchSelect']=function(_0x422a7c){const _0x5c4582=_0x507ed6;if(this[_0x5c4582('0x244')]()){if(_0x5c4582('0x42b')!==_0x5c4582('0x331'))this[_0x5c4582('0x42a')](!![]);else{function _0x3861a3(){const _0x103780=_0x5c4582;return _0x4d4f26[_0x103780('0xad')](_0x103780('0xbd'));}}}else Window_HorzCommand[_0x5c4582('0x145')]['onTouchSelect'][_0x5c4582('0x2e3')](this,_0x422a7c);},Window_ItemCategory[_0x507ed6('0x145')]['onTouchSelectModern']=function(_0x5e03a2){const _0x248c30=_0x507ed6;this['_doubleTouch']=![];if(this[_0x248c30('0x430')]()){const _0x231369=this[_0x248c30('0x2ca')](),_0xb2ac12=this[_0x248c30('0xd7')]();_0xb2ac12>=0x0&&_0xb2ac12!==this[_0x248c30('0x2ca')]()&&this['select'](_0xb2ac12),_0x5e03a2&&this[_0x248c30('0x2ca')]()!==_0x231369&&this[_0x248c30('0x2bc')]();}},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x1f5')]=function(){const _0x28133a=_0x507ed6;for(const _0x29587f of Window_ItemCategory['categoryList']){if(_0x28133a('0x39f')===_0x28133a('0x21f')){function _0x43776c(){const _0x2bd0ee=_0x28133a,_0x4113a4=this[_0x2bd0ee('0x3c4')]['y']+this[_0x2bd0ee('0x3c4')][_0x2bd0ee('0x16e')],_0xe1420b=_0x4062b5[_0x2bd0ee('0x115')]-this[_0x2bd0ee('0x174')](),_0x1268bc=this['mainAreaHeight']()-this['_categoryWindow']['height'],_0xe96995=this['isRightInputMode']()?_0x9943f9['boxWidth']-_0xe1420b:0x0;return new _0x28b6f3(_0xe96995,_0x4113a4,_0xe1420b,_0x1268bc);}}else this['addItemCategory'](_0x29587f);}this[_0x28133a('0x423')](this['index']());},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x2d4')]=function(_0x561128){const _0x1a7d29=_0x507ed6,_0x36f934=_0x561128['Type'],_0x1b6381=_0x561128[_0x1a7d29('0x119')];let _0x398c46='',_0x413ce3=_0x1a7d29('0x269'),_0x2ffca6=_0x36f934;if(_0x36f934[_0x1a7d29('0x26d')](/Category:(.*)/i))_0x398c46=String(RegExp['$1'])['trim']();else{if(Window_ItemCategory[_0x1a7d29('0xd9')][_0x1a7d29('0x1c6')](_0x36f934))_0x398c46=VisuMZ[_0x1a7d29('0x2f4')]['Settings'][_0x1a7d29('0x133')][_0x36f934];else{if(['AllItems',_0x1a7d29('0xee')][_0x1a7d29('0x1c6')](_0x36f934))_0x398c46=TextManager[_0x1a7d29('0x41a')];else{if(_0x36f934===_0x1a7d29('0x294'))_0x398c46=TextManager[_0x1a7d29('0x304')];else{if(_0x36f934==='AllWeapons')_0x398c46=TextManager[_0x1a7d29('0x1de')];else{if(_0x36f934==='AllArmors')_0x398c46=TextManager[_0x1a7d29('0x2d')];else{if(_0x36f934[_0x1a7d29('0x26d')](/WTYPE:(\d+)/i)){if(_0x1a7d29('0x17')!==_0x1a7d29('0x17')){function _0x63118b(){const _0x4c49a9=_0x1a7d29,_0x17eb10=this['commandStyleCheck'](_0x1afa1a);if(_0x17eb10===_0x4c49a9('0x418'))this[_0x4c49a9('0x7f')](_0x5f1502);else _0x17eb10===_0x4c49a9('0x151')?this[_0x4c49a9('0x132')](_0x15a0b2):_0x312565['prototype'][_0x4c49a9('0x42d')][_0x4c49a9('0x2e3')](this,_0x5986bf);}}else _0x398c46=$dataSystem[_0x1a7d29('0x194')][Number(RegExp['$1'])]||'';}else{if(_0x36f934[_0x1a7d29('0x26d')](/ATYPE:(\d+)/i)){if(_0x1a7d29('0x1ee')!=='GRTFj'){function _0x585435(){return _0x1ce049;}}else _0x398c46=$dataSystem[_0x1a7d29('0x155')][Number(RegExp['$1'])]||'';}else _0x36f934[_0x1a7d29('0x26d')](/ETYPE:(\d+)/i)&&(_0x398c46=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'');}}}}}}}_0x1b6381>0x0&&this['categoryStyle']()!=='text'&&(_0x398c46='\x5cI[%1]%2'[_0x1a7d29('0x148')](_0x1b6381,_0x398c46)),this['addCommand'](_0x398c46,_0x413ce3,!![],_0x2ffca6);},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x17c')]=function(){const _0x5e0c6a=_0x507ed6;return VisuMZ['ItemsEquipsCore'][_0x5e0c6a('0x227')][_0x5e0c6a('0x133')][_0x5e0c6a('0x1b0')];},Window_ItemCategory['prototype'][_0x507ed6('0x42d')]=function(_0x4c52c3){const _0x1ed805=_0x507ed6,_0x752365=this['categoryStyleCheck'](_0x4c52c3);if(_0x752365==='iconText'){if(_0x1ed805('0x258')!==_0x1ed805('0x258')){function _0x5c3c67(){this['prepareRefreshItemsEquipsCoreLayout']();}}else this['drawItemStyleIconText'](_0x4c52c3);}else{if(_0x752365===_0x1ed805('0x151')){if(_0x1ed805('0x26e')!==_0x1ed805('0x26e')){function _0x7157fb(){const _0x13ad8a=_0x1ed805;return this[_0x13ad8a('0x39a')]();}}else this[_0x1ed805('0x132')](_0x4c52c3);}else Window_HorzCommand[_0x1ed805('0x145')][_0x1ed805('0x42d')][_0x1ed805('0x2e3')](this,_0x4c52c3);}},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x110')]=function(){const _0x1da72f=_0x507ed6;return VisuMZ[_0x1da72f('0x2f4')][_0x1da72f('0x227')]['Categories']['Style'];},Window_ItemCategory[_0x507ed6('0x145')]['categoryStyleCheck']=function(_0x50f911){const _0x9833c4=_0x507ed6;if(_0x50f911<0x0)return _0x9833c4('0x222');const _0x172567=this[_0x9833c4('0x110')]();if(_0x172567!==_0x9833c4('0x65'))return _0x172567;else{if(_0x9833c4('0x19')!=='tIxaq'){const _0x28a25e=this[_0x9833c4('0x434')](_0x50f911);if(_0x28a25e['match'](/\\I\[(\d+)\]/i)){if('HSMGm'===_0x9833c4('0x408')){const _0x3b3dbb=this[_0x9833c4('0xe4')](_0x50f911),_0x5a9848=this[_0x9833c4('0x409')](_0x28a25e)[_0x9833c4('0x5d')];if(_0x5a9848<=_0x3b3dbb['width'])return'iconText';else{if(_0x9833c4('0x2f2')!==_0x9833c4('0x2f2')){function _0xf241f5(){const _0x49ec28=_0x9833c4;return _0x2d1049[_0x49ec28('0x422')];}}else return _0x9833c4('0x151');}}else{function _0x396330(){const _0x7ad0a9=_0x9833c4,_0x5ebdd7=_0x7ad0a9('0x279');if(this[_0x7ad0a9('0x328')][_0x7ad0a9('0x1ab')]<=0x0&&this[_0x7ad0a9('0x328')][_0x7ad0a9('0xfc')]<=0x0&&!this['_customItemInfo'][_0x5ebdd7])return![];const _0x3eed73=this['getItemEffectsHpRecoveryLabel']();this[_0x7ad0a9('0x23b')](_0x3eed73,_0x3f1804,_0x390c39,_0x32feb6,!![]);const _0x330fe0=this['getItemEffectsHpRecoveryText']();return this[_0x7ad0a9('0x33b')](_0xef7cdc[_0x7ad0a9('0xb6')](0x1)),this['drawItemKeyData'](_0x330fe0,_0x804d02,_0x13fbb9,_0x3737cd,![],_0x7ad0a9('0x184')),this[_0x7ad0a9('0x15b')](_0x1a60e8,_0x8c6a24,_0x10e0ec),this[_0x7ad0a9('0x23a')](),!![];}}}else{if(_0x9833c4('0x182')===_0x9833c4('0x345')){function _0x22c0ae(){const _0x35469f=_0x9833c4,_0x43c0e1=this['categoryStyleCheck'](_0x2f67d1);if(_0x43c0e1===_0x35469f('0x418'))this[_0x35469f('0x7f')](_0x134a68);else _0x43c0e1===_0x35469f('0x151')?this[_0x35469f('0x132')](_0x3c4afd):_0x47361d[_0x35469f('0x145')]['drawItem'][_0x35469f('0x2e3')](this,_0x241ec9);}}else return _0x9833c4('0x222');}}else{function _0x1f123c(){const _0x1f113d=_0x9833c4;return this[_0x1f113d('0x2af')]()['match'](/LOWER/i);}}}},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x7f')]=function(_0xcfd001){const _0x20aee9=_0x507ed6,_0x4195e3=this['itemLineRect'](_0xcfd001),_0x390684=this['commandName'](_0xcfd001),_0x5a3853=this[_0x20aee9('0x409')](_0x390684)[_0x20aee9('0x5d')];this['changePaintOpacity'](this[_0x20aee9('0x2de')](_0xcfd001));const _0x2dca1c=this[_0x20aee9('0x17c')]();if(_0x2dca1c===_0x20aee9('0x184'))this[_0x20aee9('0x2d6')](_0x390684,_0x4195e3['x']+_0x4195e3[_0x20aee9('0x5d')]-_0x5a3853,_0x4195e3['y'],_0x5a3853);else{if(_0x2dca1c===_0x20aee9('0x0')){if(_0x20aee9('0x350')===_0x20aee9('0xbe')){function _0x537911(){const _0x531771=_0x20aee9;this['_statusWindow']=_0x22260d,this[_0x531771('0x1a4')]();}}else{const _0x2ee3e8=_0x4195e3['x']+Math[_0x20aee9('0x2ae')]((_0x4195e3[_0x20aee9('0x5d')]-_0x5a3853)/0x2);this[_0x20aee9('0x2d6')](_0x390684,_0x2ee3e8,_0x4195e3['y'],_0x5a3853);}}else this[_0x20aee9('0x2d6')](_0x390684,_0x4195e3['x'],_0x4195e3['y'],_0x5a3853);}},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x132')]=function(_0x4514ce){const _0x311435=_0x507ed6;this['commandName'](_0x4514ce)[_0x311435('0x26d')](/\\I\[(\d+)\]/i);const _0x430bbd=Number(RegExp['$1'])||0x0,_0x1b6997=this[_0x311435('0xe4')](_0x4514ce),_0x10177e=_0x1b6997['x']+Math[_0x311435('0x2ae')]((_0x1b6997[_0x311435('0x5d')]-ImageManager['iconWidth'])/0x2),_0x1213a1=_0x1b6997['y']+(_0x1b6997[_0x311435('0x16e')]-ImageManager[_0x311435('0xae')])/0x2;this[_0x311435('0x1')](_0x430bbd,_0x10177e,_0x1213a1);},VisuMZ[_0x507ed6('0x2f4')]['Window_ItemCategory_setItemWindow']=Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x265')],Window_ItemCategory['prototype'][_0x507ed6('0x265')]=function(_0x2078fd){const _0x2aac98=_0x507ed6;VisuMZ[_0x2aac98('0x2f4')][_0x2aac98('0x225')]['call'](this,_0x2078fd),_0x2078fd[_0x2aac98('0x3c4')]=this;},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x1a4')]=function(){const _0x5274a8=_0x507ed6;Window_HorzCommand[_0x5274a8('0x145')][_0x5274a8('0x1a4')][_0x5274a8('0x2e3')](this);if(this[_0x5274a8('0x301')])this[_0x5274a8('0x7c')]();},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x7c')]=function(){const _0x5e2b00=_0x507ed6,_0x17c8da=this[_0x5e2b00('0x301')];_0x17c8da[_0x5e2b00('0x281')][_0x5e2b00('0x2b3')]();const _0x55d26f=this[_0x5e2b00('0x2b1')](this[_0x5e2b00('0x2ca')]());if(_0x55d26f==='icon'){const _0x47fd9d=this[_0x5e2b00('0xe4')](this[_0x5e2b00('0x2ca')]());let _0x415176=this['commandName'](this[_0x5e2b00('0x2ca')]());_0x415176=_0x415176['replace'](/\\I\[(\d+)\]/gi,''),_0x17c8da[_0x5e2b00('0x23a')](),this['categoryNameWindowDrawBackground'](_0x415176,_0x47fd9d),this[_0x5e2b00('0x46')](_0x415176,_0x47fd9d),this['categoryNameWindowCenter'](_0x415176,_0x47fd9d);}},Window_ItemCategory['prototype'][_0x507ed6('0x286')]=function(_0x3632ac,_0x3eacb0){},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x46')]=function(_0x3d7ee3,_0x4aa541){const _0x240fc8=_0x507ed6,_0x145b8f=this[_0x240fc8('0x301')];_0x145b8f['drawText'](_0x3d7ee3,0x0,_0x4aa541['y'],_0x145b8f[_0x240fc8('0x64')],'center');},Window_ItemCategory[_0x507ed6('0x145')][_0x507ed6('0x23f')]=function(_0x4a1049,_0x577c0a){const _0x5252cf=_0x507ed6,_0x37af80=this['_categoryNameWindow'],_0x26b5bc=$gameSystem[_0x5252cf('0x3e4')](),_0x50ea04=_0x577c0a['x']+Math['floor'](_0x577c0a[_0x5252cf('0x5d')]/0x2)+_0x26b5bc;_0x37af80['x']=_0x37af80['width']/-0x2+_0x50ea04,_0x37af80['y']=Math['floor'](_0x577c0a[_0x5252cf('0x16e')]/0x2);},Window_ItemList[_0x507ed6('0x145')][_0x507ed6('0x53')]=function(){const _0x20385c=_0x507ed6;if(this[_0x20385c('0x430')]()){const _0x138f2c=this[_0x20385c('0x2ca')]();if(this[_0x20385c('0x2ef')]()<=0x1){if('Bumgu'!==_0x20385c('0x212')){if(!this[_0x20385c('0x2dd')](_0x20385c('0x416'))&&Input[_0x20385c('0x305')](_0x20385c('0x416'))){if(_0x20385c('0xa')!==_0x20385c('0xa')){function _0x3e0078(){const _0xc513e=_0x20385c;return _0x5dd4b9['_scene'][_0xc513e('0x2be')]>0x0;}}else this[_0x20385c('0x20')]();}!this[_0x20385c('0x2dd')](_0x20385c('0xab'))&&Input[_0x20385c('0x305')]('pageup')&&this[_0x20385c('0x27a')]();}else{function _0x260e99(){const _0x31f903=_0x20385c;_0x5d4069=_0x2b7f06[_0x31f903('0xa5')](_0x3c5c99),_0x3e9e6a[_0x31f903('0x2f4')][_0x31f903('0x20c')]['call'](this,_0xe92e1,_0x96302a),this[_0x31f903('0x84')]();}}}else{if(this['maxCols']()>0x1){if(Input['isRepeated']('right')){if(_0x20385c('0x1cf')===_0x20385c('0x307')){function _0x5243d9(){const _0x531e26=_0x20385c;!this[_0x531e26('0x2dd')](_0x531e26('0x416'))&&_0x103d89[_0x531e26('0x305')](_0x531e26('0x416'))&&this['cursorPagedown'](),!this[_0x531e26('0x2dd')](_0x531e26('0xab'))&&_0x22891e[_0x531e26('0x305')](_0x531e26('0xab'))&&this[_0x531e26('0x27a')]();}}else this[_0x20385c('0x371')](Input['isTriggered'](_0x20385c('0x184')));}Input['isRepeated'](_0x20385c('0x268'))&&this[_0x20385c('0x3b3')](Input[_0x20385c('0x305')](_0x20385c('0x268')));if(this['limitedPageUpDownSceneCheck']()){if(_0x20385c('0x15a')===_0x20385c('0x15a')){if(Input[_0x20385c('0x305')](_0x20385c('0x416'))&&Input[_0x20385c('0xec')]('shift')){if(_0x20385c('0x24e')===_0x20385c('0x10d')){function _0x54beff(){const _0x3983f8=_0x20385c,_0x24f32c=_0x1bf82f['parse']('['+_0x17e2f6['$1']['match'](/\d+/g)+']');for(const _0x329194 of _0x24f32c){if(!_0x482bd8[_0x3983f8('0xd8')](_0x329194))return![];}}}else this['cursorPagedown']();}if(Input[_0x20385c('0x305')](_0x20385c('0xab'))&&Input[_0x20385c('0xec')]('shift')){if('YfApX'!==_0x20385c('0x9c')){function _0x23bbcc(){const _0x3bde24=_0x20385c;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x3bde24('0x14a')]():_0x995d6c[_0x3bde24('0x2f4')][_0x3bde24('0x3fb')][_0x3bde24('0x2e3')](this);}}else this[_0x20385c('0x27a')]();}}else{function _0x51e745(){const _0x3deb48=_0x20385c;return this['_shopStatusMenuAlly']?_0x486952[_0x3deb48('0x13a')]:0x1;}}}else{if(Input[_0x20385c('0x305')](_0x20385c('0x416'))){if(_0x20385c('0x2ff')!==_0x20385c('0x2ff')){function _0x3d3240(){const _0x484a66=_0x20385c;return this[_0x484a66('0x339')]()['includes'](this[_0x484a66('0x25c')]()[_0x3ea551])?![]:this[_0x484a66('0x341')](_0x209294);}}else this[_0x20385c('0x20')]();}Input[_0x20385c('0x305')](_0x20385c('0xab'))&&this[_0x20385c('0x27a')]();}}}if(Input[_0x20385c('0x105')]('down')){if(_0x20385c('0x3ac')===_0x20385c('0x143')){function _0x2dc025(){if(_0x7719f9[_0x51e0f4]===_0xa0875){_0xbdd875=_0x50ceaa;if(!_0x11c3db[_0x1c87c0])return _0xca3409;}}}else{if(Input[_0x20385c('0xec')](_0x20385c('0xbd')))this['cursorPagedown']();else{if(_0x20385c('0x1e7')===_0x20385c('0x1e7'))this[_0x20385c('0x28f')](Input[_0x20385c('0x305')](_0x20385c('0xf0')));else{function _0x5271ff(){const _0x4b7dce=_0x20385c;return this[_0x4b7dce('0x79')]()?this[_0x4b7dce('0x31e')]():_0x23807a[_0x4b7dce('0x2f4')][_0x4b7dce('0x9')][_0x4b7dce('0x2e3')](this);}}}}}if(Input[_0x20385c('0x105')]('up')){if(_0x20385c('0xf7')!==_0x20385c('0x213'))Input[_0x20385c('0xec')](_0x20385c('0xbd'))?this[_0x20385c('0x27a')]():this[_0x20385c('0x283')](Input['isTriggered']('up'));else{function _0x1754e1(){const _0x3b851e=_0x20385c;_0x14b146=_0x241285[_0x3b851e('0x3e3')](_0x3ffa37),_0x25aa0f=_0x5253c7-_0x318f5d[_0x3b851e('0x3e3')](_0x290003),this[_0x3b851e('0x33b')](_0x58f3d0[_0x3b851e('0x18d')](_0xc5aa75)),_0x54daaf=(_0x3a768f>=0x0?'+':'')+_0x3a936e[_0x3b851e('0x15')](_0x2cfe17,0x0);}}}if(Imported[_0x20385c('0x200')]){if('EXzLk'!==_0x20385c('0x1d0'))this[_0x20385c('0x3da')]();else{function _0x5d7872(){const _0x546601=_0x20385c;_0x1531b8='weapon-%1'[_0x546601('0x148')](_0x3f1bfb['id']);}}}if(this[_0x20385c('0x2ca')]()!==_0x138f2c){if(_0x20385c('0x3a8')==='pmyLm'){function _0x35ce38(){const _0x3b66ec=_0x20385c,_0x2863ac=_0x4ee71f[_0x3b66ec('0x145')][_0x3b66ec('0x439')](-0x1,_0x4e8b3f);if(_0x2863ac>0x0){_0x417d1d+=_0x3b66ec('0x1ad')[_0x3b66ec('0x148')](_0x2863ac),_0x5f2d59++;if(_0x285eac>=_0x28a1a3)return _0x41c6f6;}}}else this[_0x20385c('0x2bc')]();}}},Window_ItemList[_0x507ed6('0x145')]['limitedPageUpDownSceneCheck']=function(){const _0x13e9e0=_0x507ed6,_0x28374b=SceneManager[_0x13e9e0('0x80')],_0x56cc98=[Scene_Item,Scene_Shop];return _0x56cc98[_0x13e9e0('0x1c6')](_0x28374b[_0x13e9e0('0x16d')]);},Window_ItemList['prototype'][_0x507ed6('0x275')]=function(){const _0x2acf48=_0x507ed6;Window_Selectable[_0x2acf48('0x145')][_0x2acf48('0x275')][_0x2acf48('0x2e3')](this),this[_0x2acf48('0x3c4')]&&this[_0x2acf48('0x3c4')][_0x2acf48('0x244')]()&&this[_0x2acf48('0x3c4')]['activate']();},Window_ItemList[_0x507ed6('0x145')][_0x507ed6('0x351')]=function(){const _0x2ef26c=_0x507ed6;Window_Selectable[_0x2ef26c('0x145')]['deactivate']['call'](this),this[_0x2ef26c('0x3c4')]&&this['_categoryWindow'][_0x2ef26c('0x244')]()&&this[_0x2ef26c('0x3c4')][_0x2ef26c('0x351')]();},Window_ItemList['prototype'][_0x507ed6('0x1cb')]=function(_0x1b90af){const _0x5c0333=_0x507ed6;if(this[_0x5c0333('0x2fe')]!==_0x1b90af){this['_category']=_0x1b90af,this[_0x5c0333('0x41c')]();if(this[_0x5c0333('0x3c4')]&&this['_categoryWindow'][_0x5c0333('0x244')]())this[_0x5c0333('0x1d5')](0x0);else{if(_0x5c0333('0x87')!=='qqjZX')this[_0x5c0333('0x230')](0x0,0x0);else{function _0x271f78(){const _0x27fac8=_0x5c0333;_0x3b4a84[_0x27fac8('0xf1')]();}}}}},VisuMZ['ItemsEquipsCore'][_0x507ed6('0x3cf')]=Window_ItemList['prototype']['maxCols'],Window_ItemList[_0x507ed6('0x145')]['maxCols']=function(){const _0x52df1f=_0x507ed6;if(SceneManager[_0x52df1f('0x80')]['constructor']===Scene_Battle){if(_0x52df1f('0x19f')!==_0x52df1f('0x19f')){function _0x2efa55(){return;}}else return VisuMZ[_0x52df1f('0x2f4')][_0x52df1f('0x3cf')][_0x52df1f('0x2e3')](this);}else return SceneManager[_0x52df1f('0x80')]['constructor']===Scene_Map?VisuMZ['ItemsEquipsCore']['Window_ItemList_maxCols'][_0x52df1f('0x2e3')](this):VisuMZ[_0x52df1f('0x2f4')]['Settings'][_0x52df1f('0x21d')][_0x52df1f('0x1ff')];},VisuMZ[_0x507ed6('0x2f4')]['Window_ItemList_colSpacing']=Window_ItemList[_0x507ed6('0x145')][_0x507ed6('0x382')],Window_ItemList[_0x507ed6('0x145')][_0x507ed6('0x382')]=function(){const _0x25a01b=_0x507ed6;return this[_0x25a01b('0x2ef')]()<=0x1?Window_Selectable[_0x25a01b('0x145')]['colSpacing'][_0x25a01b('0x2e3')](this):VisuMZ[_0x25a01b('0x2f4')][_0x25a01b('0x32c')]['call'](this);},Window_ItemList[_0x507ed6('0x145')]['includes']=function(_0x315ca0){const _0xe4a5fa=_0x507ed6;switch(this[_0xe4a5fa('0x2fe')]){case _0xe4a5fa('0xdd'):return DataManager['isItem'](_0x315ca0);case'RegularItems':return DataManager[_0xe4a5fa('0x1c2')](_0x315ca0)&&_0x315ca0[_0xe4a5fa('0x3f2')]===0x1;case _0xe4a5fa('0x294'):return DataManager[_0xe4a5fa('0x1c2')](_0x315ca0)&&_0x315ca0[_0xe4a5fa('0x3f2')]===0x2;case'HiddenItemA':return DataManager[_0xe4a5fa('0x1c2')](_0x315ca0)&&_0x315ca0[_0xe4a5fa('0x3f2')]===0x3;case'HiddenItemB':return DataManager[_0xe4a5fa('0x1c2')](_0x315ca0)&&_0x315ca0[_0xe4a5fa('0x3f2')]===0x4;case _0xe4a5fa('0x2ce'):return DataManager[_0xe4a5fa('0x1c2')](_0x315ca0)&&_0x315ca0[_0xe4a5fa('0x96')];case'Nonconsumable':return DataManager[_0xe4a5fa('0x1c2')](_0x315ca0)&&!_0x315ca0['consumable'];case'AlwaysUsable':return DataManager[_0xe4a5fa('0x1c2')](_0x315ca0)&&[0x0][_0xe4a5fa('0x1c6')](_0x315ca0['occasion']);case _0xe4a5fa('0xfd'):return DataManager[_0xe4a5fa('0x1c2')](_0x315ca0)&&[0x0,0x1][_0xe4a5fa('0x1c6')](_0x315ca0[_0xe4a5fa('0x49')]);case _0xe4a5fa('0x25'):return DataManager[_0xe4a5fa('0x1c2')](_0x315ca0)&&[0x0,0x2][_0xe4a5fa('0x1c6')](_0x315ca0[_0xe4a5fa('0x49')]);case _0xe4a5fa('0x363'):return DataManager[_0xe4a5fa('0x1c2')](_0x315ca0)&&[0x3][_0xe4a5fa('0x1c6')](_0x315ca0['occasion']);case'AllWeapons':return DataManager[_0xe4a5fa('0x2f7')](_0x315ca0);case'AllArmors':return DataManager[_0xe4a5fa('0x2d9')](_0x315ca0);default:if(this['_category'][_0xe4a5fa('0x26d')](/WTYPE:(\d+)/i))return DataManager['isWeapon'](_0x315ca0)&&_0x315ca0['wtypeId']===Number(RegExp['$1']);else{if(this[_0xe4a5fa('0x2fe')][_0xe4a5fa('0x26d')](/ATYPE:(\d+)/i)){if('FIWdz'!==_0xe4a5fa('0xc1')){function _0x543cb4(){const _0x4d7758=_0xe4a5fa;_0x16b144=_0x56aaf6[_0x4d7758('0x2f4')][_0x4d7758('0x227')][_0x4d7758('0x133')][_0x5ec020];}}else return DataManager['isArmor'](_0x315ca0)&&_0x315ca0['etypeId']===Number(RegExp['$1']);}else{if(this[_0xe4a5fa('0x2fe')][_0xe4a5fa('0x26d')](/ETYPE:(\d+)/i))return!!_0x315ca0&&_0x315ca0['etypeId']===Number(RegExp['$1']);else{if(this[_0xe4a5fa('0x2fe')][_0xe4a5fa('0x26d')](/Category:(.*)/i))return!!_0x315ca0&&_0x315ca0['categories']['includes'](String(RegExp['$1'])['toUpperCase']()[_0xe4a5fa('0x11a')]());}}}}return![];},Window_ItemList[_0x507ed6('0x145')][_0x507ed6('0x166')]=function(){return!![];},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x69')]=Window_ItemList[_0x507ed6('0x145')][_0x507ed6('0x42d')],Window_ItemList[_0x507ed6('0x145')]['drawItem']=function(_0x49d36e){const _0x431b16=_0x507ed6;VisuMZ[_0x431b16('0x2f4')][_0x431b16('0x69')][_0x431b16('0x2e3')](this,_0x49d36e),this[_0x431b16('0x26c')](_0x49d36e);},Window_ItemList[_0x507ed6('0x145')][_0x507ed6('0x36f')]=function(_0x578714,_0x1accab,_0x352bde,_0x410bb6){const _0x56649e=_0x507ed6;Window_Selectable[_0x56649e('0x145')]['drawItemNumber'][_0x56649e('0x2e3')](this,_0x578714,_0x1accab,_0x352bde,_0x410bb6);},Window_ItemList['prototype'][_0x507ed6('0x26c')]=function(_0x210570){const _0x5c2bcd=_0x507ed6,_0x55561d=this[_0x5c2bcd('0x14c')](_0x210570);if(!_0x55561d||!this['isShowNew']())return;if(!$gameParty[_0x5c2bcd('0xd')](_0x55561d))return;const _0x3e8ae0=this[_0x5c2bcd('0xe4')](_0x210570),_0x173528=_0x3e8ae0['x'],_0x6f67d=_0x3e8ae0['y']+(this['lineHeight']()-ImageManager[_0x5c2bcd('0xae')])/0x2,_0x930874=VisuMZ[_0x5c2bcd('0x2f4')][_0x5c2bcd('0x227')][_0x5c2bcd('0x27')]['OffsetX'],_0x4197bf=VisuMZ[_0x5c2bcd('0x2f4')][_0x5c2bcd('0x227')][_0x5c2bcd('0x27')][_0x5c2bcd('0x36')];this['placeNewLabel'](_0x55561d,_0x173528+_0x930874,_0x6f67d+_0x4197bf);},Window_ItemList[_0x507ed6('0x145')]['setStatusWindow']=function(_0x252239){const _0x492542=_0x507ed6;this['_statusWindow']=_0x252239,this[_0x492542('0x1a4')]();},VisuMZ['ItemsEquipsCore'][_0x507ed6('0x330')]=Window_ItemList[_0x507ed6('0x145')][_0x507ed6('0x209')],Window_ItemList['prototype'][_0x507ed6('0x209')]=function(){const _0x479c99=_0x507ed6;VisuMZ[_0x479c99('0x2f4')][_0x479c99('0x330')]['call'](this),this[_0x479c99('0x183')]&&this['_statusWindow'][_0x479c99('0x16d')]===Window_ShopStatus&&this[_0x479c99('0x183')][_0x479c99('0x40e')](this[_0x479c99('0x41a')]());},Window_EventItem[_0x507ed6('0x145')][_0x507ed6('0x166')]=function(){return![];},Window_EquipStatus[_0x507ed6('0x145')][_0x507ed6('0x79')]=function(){const _0x158864=_0x507ed6;return VisuMZ['ItemsEquipsCore'][_0x158864('0x227')]['EquipScene'][_0x158864('0x47')];},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x3e7')]=Window_EquipStatus['prototype']['refresh'],Window_EquipStatus[_0x507ed6('0x145')][_0x507ed6('0x41c')]=function(){const _0x26ae11=_0x507ed6;this[_0x26ae11('0x204')](),this['resetFontSettings']();if(this['_actor'])this[_0x26ae11('0x17a')]['refresh']();if(this[_0x26ae11('0x79')]()){if('Yujvf'===_0x26ae11('0xbf')){function _0xf0edbd(){const _0x523e50=_0x26ae11;return this[_0x523e50('0x79')]()?this[_0x523e50('0x391')]():_0x1a3e6c['ItemsEquipsCore'][_0x523e50('0x141')]['call'](this);}}else this[_0x26ae11('0x26b')]();}else{if(_0x26ae11('0x3b6')!=='CyehC')VisuMZ[_0x26ae11('0x2f4')]['Window_EquipStatus_refresh'][_0x26ae11('0x2e3')](this);else{function _0x554c3d(){const _0x403361=_0x26ae11;return _0x28496c[_0x403361('0x2f4')][_0x403361('0x78')][_0x403361('0x2e3')](this);}}}},Window_EquipStatus['prototype'][_0x507ed6('0x26b')]=function(){const _0x5cafc6=_0x507ed6;this[_0x5cafc6('0x281')][_0x5cafc6('0x2b3')]();if(!this[_0x5cafc6('0x17a')])return;if(this[_0x5cafc6('0x16a')]()){const _0x3f5379=ImageManager[_0x5cafc6('0x42')](this[_0x5cafc6('0x17a')]['getMenuImage']());_0x3f5379[_0x5cafc6('0x11e')](this[_0x5cafc6('0x2cb')]['bind'](this));}else{if(_0x5cafc6('0x18c')!==_0x5cafc6('0x17b'))this[_0x5cafc6('0x95')]();else{function _0x239b16(){const _0x4d65bf=_0x5cafc6;return _0x593e8b[_0x4d65bf('0x2f4')][_0x4d65bf('0x227')]['EquipScene']['ParamValueFontSize'];}}}},Window_EquipStatus[_0x507ed6('0x145')][_0x507ed6('0x16a')]=function(){const _0xb9240e=_0x507ed6;return Imported[_0xb9240e('0x2')]&&this[_0xb9240e('0x17a')][_0xb9240e('0x29e')]()!==''&&VisuMZ[_0xb9240e('0x2f4')][_0xb9240e('0x227')][_0xb9240e('0x36b')][_0xb9240e('0x15e')];},Window_EquipStatus[_0x507ed6('0x145')][_0x507ed6('0x2cb')]=function(){const _0x646aa6=_0x507ed6;VisuMZ['ItemsEquipsCore']['Settings'][_0x646aa6('0x36b')][_0x646aa6('0x324')]['call'](this),this[_0x646aa6('0x2e1')]();},Window_EquipStatus[_0x507ed6('0x145')]['refreshItemsEquipsCoreNoMenuImage']=function(){const _0x58be68=_0x507ed6;VisuMZ[_0x58be68('0x2f4')][_0x58be68('0x227')][_0x58be68('0x36b')][_0x58be68('0x41f')]['call'](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x507ed6('0x145')]['drawParamsItemsEquipsCore']=function(){const _0x257dd0=_0x507ed6;this['resetFontSettings'](),VisuMZ[_0x257dd0('0x2f4')][_0x257dd0('0x227')][_0x257dd0('0x36b')][_0x257dd0('0x370')][_0x257dd0('0x2e3')](this);},Window_EquipStatus[_0x507ed6('0x145')][_0x507ed6('0x1cd')]=function(_0x16398a,_0x28030a,_0xcf0a5a,_0x4bbd4a,_0x53f2b3){const _0x418dff=_0x507ed6,_0x32980d=ImageManager[_0x418dff('0x42')](_0x16398a[_0x418dff('0x29e')]()),_0x394e26=this[_0x418dff('0x64')]-_0x32980d[_0x418dff('0x5d')];_0x28030a+=_0x394e26/0x2;if(_0x394e26<0x0)_0x4bbd4a-=_0x394e26;Window_StatusBase[_0x418dff('0x145')][_0x418dff('0x1cd')][_0x418dff('0x2e3')](this,_0x16398a,_0x28030a,_0xcf0a5a,_0x4bbd4a,_0x53f2b3);},Window_EquipStatus[_0x507ed6('0x145')]['actorParams']=function(){const _0x233026=_0x507ed6;if(Imported[_0x233026('0x200')]){if('kqiBP'===_0x233026('0x116')){function _0x216574(){return this['isEquipChangeOk'](_0x433340);}}else return VisuMZ[_0x233026('0x19c')][_0x233026('0x227')][_0x233026('0x176')][_0x233026('0x1ca')];}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x507ed6('0x145')][_0x507ed6('0x186')]=function(){const _0x2f96b2=_0x507ed6;return VisuMZ[_0x2f96b2('0x2f4')]['Settings'][_0x2f96b2('0x36b')][_0x2f96b2('0x2b8')];},Window_EquipStatus['prototype'][_0x507ed6('0x139')]=function(){const _0x1a253f=_0x507ed6;return Imported[_0x1a253f('0x200')]&&VisuMZ['CoreEngine'][_0x1a253f('0x227')][_0x1a253f('0x176')][_0x1a253f('0x8c')];},Window_EquipStatus[_0x507ed6('0x145')]['drawUpdatedParamName']=function(_0x5ba705,_0x2c17e3,_0x38be98,_0x12bbe4){const _0x259780=_0x507ed6,_0x253d7d=this['itemPadding']();if(Imported[_0x259780('0x200')])this[_0x259780('0x318')](_0x2c17e3+_0x253d7d,_0x38be98,_0x12bbe4,_0x5ba705,![]);else{if('HggAO'!=='HggAO'){function _0x5773ad(){const _0x1f8ac2=_0x259780;this[_0x1f8ac2('0x23a')](),_0x47ffee[_0x1f8ac2('0x2f4')][_0x1f8ac2('0x227')][_0x1f8ac2('0x36b')][_0x1f8ac2('0x370')][_0x1f8ac2('0x2e3')](this);}}else this['drawText'](TextManager[_0x259780('0x3ee')](_0x5ba705),_0x2c17e3+_0x253d7d,_0x38be98,_0x12bbe4);}},Window_EquipStatus[_0x507ed6('0x145')]['drawUpdatedBeforeParamValue']=function(_0x3e9600,_0x51570,_0x590c03,_0x48c8d2){const _0xf9eab=_0x507ed6,_0x3f54d8=this[_0xf9eab('0x12c')]();let _0x423ca0=0x0;if(Imported[_0xf9eab('0x200')]){if('EiaDi'!==_0xf9eab('0xeb')){function _0x363f16(){const _0x572ee6=_0xf9eab;return this[_0x572ee6('0x1ac')]();}}else _0x423ca0=this[_0xf9eab('0x17a')][_0xf9eab('0x3e3')](_0x3e9600,!![]);}else _0x423ca0=this[_0xf9eab('0x17a')]['param'](_0x3e9600);const _0x27673d=_0x423ca0;this['drawText'](_0x423ca0,_0x51570,_0x590c03,_0x48c8d2-_0x3f54d8,_0xf9eab('0x184'));},Window_EquipStatus['prototype'][_0x507ed6('0x3d9')]=function(_0x4fea27,_0x33dc84,_0x4b2620,_0x299b98){const _0xfd18d3=_0x507ed6,_0x24738c=this[_0xfd18d3('0x12c')]();let _0x93d1dd=0x0,_0x58c9a4=0x0,_0x162a1e='';if(this[_0xfd18d3('0x405')]){if('noMNk'===_0xfd18d3('0x2f3')){if(Imported[_0xfd18d3('0x200')]){if(_0xfd18d3('0x31a')==='VLHYN'){function _0xdcfe17(){const _0x3b49bc=_0xfd18d3,_0x434fee=this['commandWindowRect'](),_0x25919d=this['isRightInputMode']()?this[_0x3b49bc('0x174')]():0x0,_0x576939=_0x434fee['y']+_0x434fee[_0x3b49bc('0x16e')],_0x251e47=_0x4c771c['boxWidth']-this[_0x3b49bc('0x174')](),_0x5ce41c=this[_0x3b49bc('0x1b5')]()-_0x434fee[_0x3b49bc('0x16e')];return new _0x568838(_0x25919d,_0x576939,_0x251e47,_0x5ce41c);}}else _0x93d1dd=this['_actor'][_0xfd18d3('0x3e3')](_0x4fea27,![]),_0x58c9a4=this['_tempActor'][_0xfd18d3('0x3e3')](_0x4fea27,![]),_0x162a1e=this[_0xfd18d3('0x405')][_0xfd18d3('0x3e3')](_0x4fea27,!![]);}else{if(_0xfd18d3('0x43')===_0xfd18d3('0x206')){function _0x2c2505(){const _0x5ef51c=_0xfd18d3;return _0x532fc8['ItemsEquipsCore']['Settings'][_0x5ef51c('0x1eb')][_0x5ef51c('0xa3')];}}else _0x93d1dd=this[_0xfd18d3('0x17a')][_0xfd18d3('0x3ee')](_0x4fea27),_0x58c9a4=this[_0xfd18d3('0x405')][_0xfd18d3('0x3ee')](_0x4fea27),_0x162a1e=this[_0xfd18d3('0x405')][_0xfd18d3('0x3ee')](_0x4fea27);}const _0x99f9f8=_0x93d1dd,_0x38c929=_0x58c9a4;diffValue=_0x38c929-_0x99f9f8,this[_0xfd18d3('0x33b')](ColorManager['paramchangeTextColor'](diffValue)),this[_0xfd18d3('0x1f9')](_0x162a1e,_0x33dc84,_0x4b2620,_0x299b98-_0x24738c,_0xfd18d3('0x184'));}else{function _0xea4371(){_0x1f029b(_0x12cb97);}}}},Window_EquipStatus[_0x507ed6('0x145')][_0x507ed6('0x337')]=function(_0x20ced1,_0x20926f,_0x59f3ee,_0x4bda50){const _0x3e01bb=_0x507ed6,_0x1a5a56=this[_0x3e01bb('0x12c')]();let _0x30efd5=0x0,_0x260c92=0x0,_0x58ab1e=![];if(this[_0x3e01bb('0x405')]){if(_0x3e01bb('0x34e')==='ONxgZ'){function _0x579839(){const _0x2e9c99=_0x3e01bb,_0x30491e=_0x2e9c99('0x7e');if(this[_0x2e9c99('0x328')]['gainTP']>=0x0&&!this[_0x2e9c99('0x104')][_0x30491e])return![];const _0x3bdef4=this[_0x2e9c99('0x12e')]();this[_0x2e9c99('0x23b')](_0x3bdef4,_0x521e91,_0x5eee63,_0xccd325,!![]);const _0x5766c0=this[_0x2e9c99('0x210')]();return this[_0x2e9c99('0x33b')](_0x5106bd[_0x2e9c99('0x6f')]()),this[_0x2e9c99('0x23b')](_0x5766c0,_0x5b09cb,_0x268771,_0x4ce1de,![],'right'),this[_0x2e9c99('0x15b')](_0x29f509,_0x73ee4d,_0x535d68),this[_0x2e9c99('0x23a')](),!![];}}else{Imported[_0x3e01bb('0x200')]?(_0x30efd5=this[_0x3e01bb('0x17a')][_0x3e01bb('0x3e3')](_0x20ced1,![]),_0x260c92=this[_0x3e01bb('0x405')][_0x3e01bb('0x3e3')](_0x20ced1,![]),_0x58ab1e=String(this['_actor'][_0x3e01bb('0x3e3')](_0x20ced1,!![]))['match'](/([%％])/i)):(_0x30efd5=this[_0x3e01bb('0x17a')]['param'](_0x20ced1),_0x260c92=this[_0x3e01bb('0x405')][_0x3e01bb('0x3ee')](_0x20ced1),_0x58ab1e=_0x30efd5%0x1!==0x0||_0x260c92%0x1!==0x0);const _0x14e0b8=_0x30efd5,_0x7583ac=_0x260c92,_0xcbd1b6=_0x7583ac-_0x14e0b8;let _0x588897=_0xcbd1b6;if(_0x58ab1e)_0x588897=Math[_0x3e01bb('0x2eb')](_0xcbd1b6*0x64)+'%';if(_0xcbd1b6!==0x0){if(_0x3e01bb('0x383')===_0x3e01bb('0x383'))this[_0x3e01bb('0x33b')](ColorManager[_0x3e01bb('0x18d')](_0xcbd1b6)),_0x588897=(_0xcbd1b6>0x0?_0x3e01bb('0x93'):_0x3e01bb('0x237'))[_0x3e01bb('0x148')](_0x588897),this[_0x3e01bb('0x1f9')](_0x588897,_0x20926f+_0x1a5a56,_0x59f3ee,_0x4bda50,'left');else{function _0x24f6d9(){const _0x4951ab=_0x3e01bb;this[_0x4951ab('0x34f')](),_0x47e4d6[_0x4951ab('0x2f4')]['Window_ShopBuy_refresh'][_0x4951ab('0x2e3')](this);}}}}}},Window_EquipStatus['prototype'][_0x507ed6('0x15b')]=function(_0x4a62f1,_0x34d160,_0x109ea5,_0x32c7a4,_0x51fc54){const _0x2b54ff=_0x507ed6;if(VisuMZ[_0x2b54ff('0x2f4')][_0x2b54ff('0x227')][_0x2b54ff('0x36b')][_0x2b54ff('0x271')]===![])return;_0x51fc54=Math[_0x2b54ff('0x1a1')](_0x51fc54||0x1,0x1);while(_0x51fc54--){_0x32c7a4=_0x32c7a4||this[_0x2b54ff('0x3db')](),this['contents'][_0x2b54ff('0x197')]=0xa0;const _0x5b4434=ColorManager[_0x2b54ff('0x32e')]();this[_0x2b54ff('0x281')][_0x2b54ff('0xd1')](_0x4a62f1+0x1,_0x34d160+0x1,_0x109ea5-0x2,_0x32c7a4-0x2,_0x5b4434),this[_0x2b54ff('0x281')][_0x2b54ff('0x197')]=0xff;}},ColorManager[_0x507ed6('0x32e')]=function(){const _0x170089=_0x507ed6,_0x3c72d3=VisuMZ[_0x170089('0x2f4')][_0x170089('0x227')][_0x170089('0x36b')];let _0x55fa73=_0x3c72d3[_0x170089('0x43a')]!==undefined?_0x3c72d3['BackRectColor']:0x13;return ColorManager['getColor'](_0x55fa73);},VisuMZ['ItemsEquipsCore'][_0x507ed6('0xe0')]=Window_EquipCommand['prototype'][_0x507ed6('0x9a')],Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x9a')]=function(_0x2951a8){const _0x27f3d1=_0x507ed6;VisuMZ[_0x27f3d1('0x2f4')][_0x27f3d1('0xe0')][_0x27f3d1('0x2e3')](this,_0x2951a8),this[_0x27f3d1('0x1c')](_0x2951a8);},Window_EquipCommand[_0x507ed6('0x145')]['createCommandNameWindow']=function(_0x298015){const _0x5b1ec2=_0x507ed6,_0x1ebe7d=new Rectangle(0x0,0x0,_0x298015['width'],_0x298015[_0x5b1ec2('0x16e')]);this['_commandNameWindow']=new Window_Base(_0x1ebe7d),this[_0x5b1ec2('0xce')][_0x5b1ec2('0x378')]=0x0,this['addChild'](this[_0x5b1ec2('0xce')]),this[_0x5b1ec2('0x26f')]();},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x1a4')]=function(){const _0x85a9a4=_0x507ed6;Window_HorzCommand[_0x85a9a4('0x145')][_0x85a9a4('0x1a4')]['call'](this);if(this[_0x85a9a4('0xce')])this[_0x85a9a4('0x26f')]();},Window_EquipCommand['prototype'][_0x507ed6('0x26f')]=function(){const _0x34b933=_0x507ed6,_0x18a41d=this[_0x34b933('0xce')];_0x18a41d[_0x34b933('0x281')][_0x34b933('0x2b3')]();const _0x318645=this[_0x34b933('0x8b')](this[_0x34b933('0x2ca')]());if(_0x318645==='icon'){const _0x56ff52=this['itemLineRect'](this[_0x34b933('0x2ca')]());let _0x5a6fea=this['commandName'](this[_0x34b933('0x2ca')]());_0x5a6fea=_0x5a6fea[_0x34b933('0x208')](/\\I\[(\d+)\]/gi,''),_0x18a41d[_0x34b933('0x23a')](),this['commandNameWindowDrawBackground'](_0x5a6fea,_0x56ff52),this[_0x34b933('0x21')](_0x5a6fea,_0x56ff52),this[_0x34b933('0x55')](_0x5a6fea,_0x56ff52);}},Window_EquipCommand['prototype'][_0x507ed6('0x7b')]=function(_0x588ac4,_0x1990d3){},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x21')]=function(_0x337fef,_0x102eea){const _0xf708ff=_0x507ed6,_0xf40f89=this['_commandNameWindow'];_0xf40f89[_0xf708ff('0x1f9')](_0x337fef,0x0,_0x102eea['y'],_0xf40f89['innerWidth'],_0xf708ff('0x0'));},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x55')]=function(_0x3ed5ba,_0x25a7ab){const _0x38605a=_0x507ed6,_0x12d6f3=this[_0x38605a('0xce')],_0x3ba81e=$gameSystem[_0x38605a('0x3e4')](),_0x2b4f49=_0x25a7ab['x']+Math['floor'](_0x25a7ab[_0x38605a('0x5d')]/0x2)+_0x3ba81e;_0x12d6f3['x']=_0x12d6f3[_0x38605a('0x5d')]/-0x2+_0x2b4f49,_0x12d6f3['y']=Math[_0x38605a('0x2ae')](_0x25a7ab['height']/0x2);},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x244')]=function(){const _0x3c321c=_0x507ed6;return Imported[_0x3c321c('0x200')]&&Window_HorzCommand[_0x3c321c('0x145')][_0x3c321c('0x244')][_0x3c321c('0x2e3')](this);},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x3aa')]=function(){const _0x514b3e=_0x507ed6;if(this[_0x514b3e('0x387')]()==='equip')Window_HorzCommand[_0x514b3e('0x145')][_0x514b3e('0x3aa')][_0x514b3e('0x2e3')](this);},Window_EquipCommand[_0x507ed6('0x145')]['processCursorMoveModernControls']=function(){const _0x568ca8=_0x507ed6;if(!this[_0x568ca8('0x3ff')]()){if(_0x568ca8('0x315')!==_0x568ca8('0x1a9'))Window_HorzCommand[_0x568ca8('0x145')][_0x568ca8('0x53')][_0x568ca8('0x2e3')](this);else{function _0xc3e9d(){const _0x5c7872=_0x568ca8;return _0xbf2903[_0x5c7872('0x2f4')][_0x5c7872('0x20b')][_0x5c7872('0x2e3')](this);}}}},Window_EquipCommand[_0x507ed6('0x145')]['processCursorSpecialCheckModernControls']=function(){const _0x1bf4ee=_0x507ed6;if(!this[_0x1bf4ee('0x430')]())return![];if(SceneManager['_scene'][_0x1bf4ee('0x16d')]!==Scene_Equip)return![];return Input[_0x1bf4ee('0x305')](_0x1bf4ee('0xf0'))&&(this[_0x1bf4ee('0x2bc')](),SceneManager[_0x1bf4ee('0x80')][_0x1bf4ee('0x1be')](),SceneManager[_0x1bf4ee('0x80')][_0x1bf4ee('0x8f')]['smoothSelect'](-0x1)),![];},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x2ef')]=function(){const _0x28b0a0=_0x507ed6;return this['_list']?this[_0x28b0a0('0x3ea')]['length']:0x3;},Window_EquipCommand['prototype'][_0x507ed6('0x2a9')]=function(){const _0x1cea10=_0x507ed6;if(this[_0x1cea10('0x419')]()&&this['visible']&&SceneManager[_0x1cea10('0x80')][_0x1cea10('0x16d')]===Scene_Equip){if('MeRHO'==='lotuj'){function _0x10cdbc(){const _0x144f64=_0x1cea10;return _0x144f64('0x242')[_0x144f64('0x148')](_0x2e75a6(_0x49514d['$1']));}}else{if(this[_0x1cea10('0x1bb')]()&&TouchInput[_0x1cea10('0x3e')]())this[_0x1cea10('0x16c')](![]);else{if(TouchInput[_0x1cea10('0x305')]()){if(_0x1cea10('0x1ae')===_0x1cea10('0x185')){function _0x4cacca(){const _0x217168=_0x1cea10;return _0x42adf7[_0x217168('0x2f4')][_0x217168('0x3cf')][_0x217168('0x2e3')](this);}}else this[_0x1cea10('0x16c')](!![]);}}if(TouchInput[_0x1cea10('0x198')]()){if(_0x1cea10('0x2e4')!==_0x1cea10('0x2e4')){function _0x286eb4(){const _0x4b8c37=_0x1cea10,_0x51dadb='HP\x20DAMAGE';if(this[_0x4b8c37('0x104')][_0x51dadb])return this[_0x4b8c37('0x104')][_0x51dadb];let _0x42499a='';if(this['_itemData'][_0x4b8c37('0x1ab')]<0x0)_0x42499a+=_0x4b8c37('0xa6')[_0x4b8c37('0x148')](_0x5d6b62[_0x4b8c37('0x2ae')](this[_0x4b8c37('0x328')]['rateHP']*0x64));if(this[_0x4b8c37('0x328')]['rateHP']<0x0&&this[_0x4b8c37('0x328')]['flatHP']<0x0)_0x42499a+='\x20';if(this[_0x4b8c37('0x328')]['flatHP']<0x0)_0x42499a+='%1'['format'](this[_0x4b8c37('0x328')][_0x4b8c37('0xfc')]);return _0x42499a;}}else this['onTouchOk']();}else TouchInput['isCancelled']()&&this[_0x1cea10('0x232')]();}}},Window_EquipCommand[_0x507ed6('0x145')]['onTouchSelectModernControls']=function(_0x5ba352){const _0x2c5a70=_0x507ed6;this[_0x2c5a70('0x358')]=![];const _0x44dd67=this['index'](),_0x442ad2=this[_0x2c5a70('0xd7')](),_0x30433d=SceneManager['_scene'][_0x2c5a70('0x8f')];if(_0x30433d[_0x2c5a70('0x419')]()&&_0x30433d['visible']){if(_0x442ad2>=0x0){if(_0x2c5a70('0x28b')===_0x2c5a70('0x28b'))_0x442ad2===this[_0x2c5a70('0x2ca')]()&&(this['_doubleTouch']=!![]),this[_0x2c5a70('0x275')](),this['select'](_0x442ad2);else{function _0x2d9717(){const _0x595b09=_0x2c5a70;if(_0x1ac248['uiMenuStyle']&&_0x1539e3['uiInputPosition']!==_0x11c56b)return _0x533b93['uiInputPosition'];else{if(this[_0x595b09('0x79')]())return this[_0x595b09('0x2af')]()[_0x595b09('0x26d')](/RIGHT/i);else _0xf162f7['prototype'][_0x595b09('0x278')][_0x595b09('0x2e3')](this);}}}}else{if(_0x30433d[_0x2c5a70('0xd7')]()>=0x0){if(_0x2c5a70('0x1af')!=='wJWet')this['deactivate'](),this[_0x2c5a70('0x56')]();else{function _0x354dfa(){const _0x51e0b2=_0x2c5a70;return _0x28499d[_0x51e0b2('0x2f4')][_0x51e0b2('0x227')][_0x51e0b2('0x14b')][_0x51e0b2('0xcc')];}}}}}if(_0x5ba352&&this['index']()!==_0x44dd67){if(_0x2c5a70('0xfa')==='dXYJd'){function _0x3e6a68(){const _0x582a0c=_0x2c5a70;if(this[_0x582a0c('0xfe')][_0x582a0c('0x170')][_0x582a0c('0x26d')](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x29534f=_0x25e2a8(_0x58a879['$1'])[_0x582a0c('0x1b2')](/[\r\n]+/);for(const _0x82e70 of _0x29534f){if(_0x82e70['match'](/(.*):[ ](.*)/i)){const _0x2db937=_0x4937ea(_0x2ee7f['$1'])[_0x582a0c('0x11a')](),_0xed7404=_0x20a2ee(_0x48bda7['$2'])[_0x582a0c('0x11a')]();this[_0x582a0c('0x8a')](_0x2db937,_0xed7404,_0x55e571,_0x47938a,_0x582446),_0x45fb3b+=this[_0x582a0c('0x3db')]();}}}return this[_0x582a0c('0x23a')](),_0x5e70f2;}}else this[_0x2c5a70('0x2bc')]();}},Window_EquipCommand[_0x507ed6('0x145')]['makeCommandList']=function(){const _0x226a3c=_0x507ed6;this[_0x226a3c('0x3d')](),this[_0x226a3c('0x2a0')](),this['addClearCommand']();},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x41c')]=function(){const _0x5539bc=_0x507ed6;Window_HorzCommand[_0x5539bc('0x145')][_0x5539bc('0x41c')][_0x5539bc('0x2e3')](this),this['refreshCursor']();},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x3d')]=function(){const _0x1dc0ae=_0x507ed6;if(!this[_0x1dc0ae('0x13')]())return;const _0xb9392=this[_0x1dc0ae('0x195')](),_0x273339=VisuMZ[_0x1dc0ae('0x2f4')][_0x1dc0ae('0x227')][_0x1dc0ae('0x36b')]['CmdIconEquip'],_0x43a58a=_0xb9392==='text'?TextManager[_0x1dc0ae('0x29b')]:_0x1dc0ae('0x38e')['format'](_0x273339,TextManager['equip2']),_0x1cc654=this[_0x1dc0ae('0x308')]();this['addCommand'](_0x43a58a,_0x1dc0ae('0x427'),_0x1cc654);},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x13')]=function(){const _0x5e8aa9=_0x507ed6;return!this[_0x5e8aa9('0x244')]();},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x308')]=function(){return!![];},Window_EquipCommand['prototype'][_0x507ed6('0x2a0')]=function(){const _0x5bfc34=_0x507ed6;if(!this[_0x5bfc34('0x90')]())return;const _0xd8e185=this[_0x5bfc34('0x195')](),_0x3e8170=VisuMZ[_0x5bfc34('0x2f4')]['Settings'][_0x5bfc34('0x36b')][_0x5bfc34('0x37b')],_0x30fc6a=_0xd8e185===_0x5bfc34('0x222')?TextManager[_0x5bfc34('0x261')]:'\x5cI[%1]%2'[_0x5bfc34('0x148')](_0x3e8170,TextManager['optimize']),_0x251054=this['isOptimizeCommandEnabled']();this[_0x5bfc34('0x2cc')](_0x30fc6a,_0x5bfc34('0x261'),_0x251054);},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x90')]=function(){const _0x21a765=_0x507ed6;return VisuMZ[_0x21a765('0x2f4')]['Settings'][_0x21a765('0x36b')][_0x21a765('0x234')];},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x1dd')]=function(){return!![];},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0xc6')]=function(){const _0x2157b1=_0x507ed6;if(!this[_0x2157b1('0x321')]())return;const _0x34fe89=this[_0x2157b1('0x195')](),_0x58bcd2=VisuMZ['ItemsEquipsCore'][_0x2157b1('0x227')][_0x2157b1('0x36b')]['CmdIconClear'],_0x324f3d=_0x34fe89===_0x2157b1('0x222')?TextManager['clear']:_0x2157b1('0x38e')[_0x2157b1('0x148')](_0x58bcd2,TextManager['clear']),_0x7425bb=this[_0x2157b1('0x250')]();this[_0x2157b1('0x2cc')](_0x324f3d,'clear',_0x7425bb);},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x321')]=function(){const _0x523ef4=_0x507ed6;return VisuMZ[_0x523ef4('0x2f4')]['Settings']['EquipScene']['CommandAddClear'];},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x250')]=function(){return!![];},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x17c')]=function(){const _0x35fee2=_0x507ed6;return VisuMZ[_0x35fee2('0x2f4')][_0x35fee2('0x227')]['EquipScene'][_0x35fee2('0x38f')];},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x42d')]=function(_0x13d57f){const _0x4c78c8=_0x507ed6,_0xa2104c=this['commandStyleCheck'](_0x13d57f);if(_0xa2104c==='iconText')this[_0x4c78c8('0x7f')](_0x13d57f);else{if(_0xa2104c===_0x4c78c8('0x151'))this['drawItemStyleIcon'](_0x13d57f);else{if('JHeVf'!=='AYYQT')Window_HorzCommand[_0x4c78c8('0x145')][_0x4c78c8('0x42d')][_0x4c78c8('0x2e3')](this,_0x13d57f);else{function _0x4b141f(){const _0x484dbb=_0x4c78c8,_0x52f49a=_0x1829d5[_0x484dbb('0x2f4')][_0x484dbb('0x227')][_0x484dbb('0x1eb')][_0x484dbb('0x384')];return _0x52f49a['format'](_0x12f821['tp']);}}}}},Window_EquipCommand[_0x507ed6('0x145')]['commandStyle']=function(){const _0x6db6f6=_0x507ed6;return VisuMZ[_0x6db6f6('0x2f4')][_0x6db6f6('0x227')][_0x6db6f6('0x36b')][_0x6db6f6('0x1c5')];},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x8b')]=function(_0x5ab5b8){const _0x564e05=_0x507ed6;if(_0x5ab5b8<0x0)return'text';const _0x145571=this['commandStyle']();if(_0x145571!==_0x564e05('0x65')){if(_0x564e05('0x11b')===_0x564e05('0x11b'))return _0x145571;else{function _0x281be1(){const _0x168a9b=_0x564e05,_0x33285d=_0x4f5024[_0x168a9b('0x2f4')][_0x168a9b('0x227')][_0x168a9b('0x21d')][_0x168a9b('0x247')];return _0x33285d[_0x168a9b('0x148')](_0x540f4f['numItems'](this[_0x168a9b('0xfe')]));}}}else{if(this[_0x564e05('0x1e3')]()>0x0){if('FNGQV'!==_0x564e05('0x88')){const _0x112366=this[_0x564e05('0x434')](_0x5ab5b8);if(_0x112366[_0x564e05('0x26d')](/\\I\[(\d+)\]/i)){const _0x3155c0=this[_0x564e05('0xe4')](_0x5ab5b8),_0x56ab2=this[_0x564e05('0x409')](_0x112366)[_0x564e05('0x5d')];if(_0x56ab2<=_0x3155c0[_0x564e05('0x5d')]){if(_0x564e05('0x190')!==_0x564e05('0x3b1'))return _0x564e05('0x418');else{function _0x31032b(){return _0x307dd2;}}}else return _0x564e05('0x151');}}else{function _0x5b0749(){const _0x275199=_0x564e05;if(_0x55101e['uiMenuStyle']&&_0x26359b['uiHelpPosition']!==_0x4c8603)return _0x2af8d2[_0x275199('0x34d')];else{if(this[_0x275199('0x79')]())return this[_0x275199('0x2af')]()[_0x275199('0x26d')](/LOWER/i);else _0x37b85a[_0x275199('0x145')][_0x275199('0x278')]['call'](this);}}}}}return _0x564e05('0x222');},Window_EquipCommand[_0x507ed6('0x145')][_0x507ed6('0x7f')]=function(_0x490915){const _0x56e524=_0x507ed6,_0x5a577f=this[_0x56e524('0xe4')](_0x490915),_0x4a653b=this[_0x56e524('0x434')](_0x490915),_0x2f846c=this[_0x56e524('0x409')](_0x4a653b)[_0x56e524('0x5d')];this[_0x56e524('0x2b7')](this[_0x56e524('0x2de')](_0x490915));const _0x7ccb00=this[_0x56e524('0x17c')]();if(_0x7ccb00==='right'){if('eHSpD'===_0x56e524('0x63'))this[_0x56e524('0x2d6')](_0x4a653b,_0x5a577f['x']+_0x5a577f[_0x56e524('0x5d')]-_0x2f846c,_0x5a577f['y'],_0x2f846c);else{function _0x5a3d7d(){const _0x4fcea4=_0x56e524;_0x7b37d0['isRepeated'](_0x4fcea4('0x416'))&&!_0x2688e8[_0x4fcea4('0xec')](_0x4fcea4('0xbd'))&&this[_0x4fcea4('0x371')](_0x2e8e68[_0x4fcea4('0x305')](_0x4fcea4('0x416'))),_0x3c7d8b['isRepeated'](_0x4fcea4('0xab'))&&!_0x503587[_0x4fcea4('0xec')](_0x4fcea4('0xbd'))&&this[_0x4fcea4('0x3b3')](_0x183bc2['isTriggered'](_0x4fcea4('0xab')));}}}else{if(_0x7ccb00===_0x56e524('0x0')){const _0x47a513=_0x5a577f['x']+Math['floor']((_0x5a577f[_0x56e524('0x5d')]-_0x2f846c)/0x2);this['drawTextEx'](_0x4a653b,_0x47a513,_0x5a577f['y'],_0x2f846c);}else this[_0x56e524('0x2d6')](_0x4a653b,_0x5a577f['x'],_0x5a577f['y'],_0x2f846c);}},Window_EquipCommand[_0x507ed6('0x145')]['drawItemStyleIcon']=function(_0x477f14){const _0x1c0e9b=_0x507ed6;this['commandName'](_0x477f14)[_0x1c0e9b('0x26d')](/\\I\[(\d+)\]/i);const _0xad1159=Number(RegExp['$1'])||0x0,_0x37ce24=this[_0x1c0e9b('0xe4')](_0x477f14),_0x398fcd=_0x37ce24['x']+Math[_0x1c0e9b('0x2ae')]((_0x37ce24['width']-ImageManager[_0x1c0e9b('0x3c9')])/0x2),_0x4b13db=_0x37ce24['y']+(_0x37ce24[_0x1c0e9b('0x16e')]-ImageManager[_0x1c0e9b('0xae')])/0x2;this[_0x1c0e9b('0x1')](_0xad1159,_0x398fcd,_0x4b13db);},Window_EquipSlot[_0x507ed6('0x145')][_0x507ed6('0x244')]=function(){const _0x7d53f5=_0x507ed6;return Imported[_0x7d53f5('0x200')]&&Window_HorzCommand[_0x7d53f5('0x145')][_0x7d53f5('0x244')][_0x7d53f5('0x2e3')](this);},Window_EquipSlot[_0x507ed6('0x145')][_0x507ed6('0x275')]=function(){const _0x308537=_0x507ed6;Window_StatusBase['prototype'][_0x308537('0x275')][_0x308537('0x2e3')](this),this['callUpdateHelp']();},Window_EquipSlot['prototype']['processCursorMove']=function(){const _0x87bdf5=_0x507ed6;Window_StatusBase[_0x87bdf5('0x145')]['processCursorMove'][_0x87bdf5('0x2e3')](this),this[_0x87bdf5('0x7')]();},Window_EquipSlot[_0x507ed6('0x145')][_0x507ed6('0x7')]=function(){const _0x5c79ea=_0x507ed6;if(!this[_0x5c79ea('0xa8')]())return;if(Input[_0x5c79ea('0x305')]('shift')&&this[_0x5c79ea('0x41a')]()){if('jAfYc'===_0x5c79ea('0x154')){const _0x5b37ce=SceneManager['_scene'][_0x5c79ea('0x17a')];if(_0x5b37ce){if(_0x5c79ea('0x1bc')===_0x5c79ea('0x13d')){function _0x3766b5(){const _0x1c0c73=_0x5c79ea;_0x49c79f[_0x1c0c73('0x305')]()&&this[_0x1c0c73('0x399')](!![]);if(_0x341159[_0x1c0c73('0x198')]())this['onTouchOk']();else _0xb5ad9c[_0x1c0c73('0x1bf')]()&&this[_0x1c0c73('0x232')]();}}else this[_0x5c79ea('0xc0')](this[_0x5c79ea('0x2ca')]())?(this[_0x5c79ea('0x226')](),this['updateHelp']()):this[_0x5c79ea('0x2ee')]();}}else{function _0x521402(){const _0x3f9a69=_0x5c79ea,_0x5c0566=this[_0x3f9a69('0x174')](),_0x24b42a=this[_0x3f9a69('0x327')]['height'],_0x26da9a=this[_0x3f9a69('0x278')]()?0x0:_0x97d6e7[_0x3f9a69('0x115')]-this[_0x3f9a69('0x174')](),_0x4642a7=this['_itemWindow']['y'];return new _0x463d31(_0x26da9a,_0x4642a7,_0x5c0566,_0x24b42a);}}}},Window_EquipSlot[_0x507ed6('0x145')][_0x507ed6('0xc0')]=function(_0x31264b){const _0x2ef229=_0x507ed6,_0x289c92=SceneManager['_scene'][_0x2ef229('0x17a')];if(!_0x289c92)return;if(!_0x289c92[_0x2ef229('0x341')](this['index']())){if('VluZA'!==_0x2ef229('0xdf')){function _0xe5bf2c(){const _0x1c5c95=_0x2ef229;return this[_0x1c5c95('0x244')]()?![]:_0x186cb7[_0x1c5c95('0x145')][_0x1c5c95('0x1bb')]['call'](this);}}else return![];}const _0x30656b=_0x289c92['equipSlots']()[this[_0x2ef229('0x2ca')]()];if(_0x289c92[_0x2ef229('0x339')]()[_0x2ef229('0x1c6')](_0x30656b)){if('UchSf'==='LJWnE'){function _0x282f01(){const _0x1342ff=_0x2ef229,_0x21f0ee=_0x1342ff('0x300');if(this[_0x1342ff('0x104')][_0x21f0ee])return this[_0x1342ff('0x104')][_0x21f0ee];const _0x83e34d=_0x1342ff('0x249');return _0x83e34d['format'](this[_0x1342ff('0xfe')][_0x1342ff('0x431')]);}}else return![];}return!![];;},Window_EquipSlot[_0x507ed6('0x145')][_0x507ed6('0x226')]=function(){const _0x386813=_0x507ed6;SoundManager[_0x386813('0x12')]();const _0x53fbe8=SceneManager[_0x386813('0x80')][_0x386813('0x17a')];_0x53fbe8[_0x386813('0x2ba')](this[_0x386813('0x2ca')](),null),this[_0x386813('0x41c')](),this[_0x386813('0x327')][_0x386813('0x41c')]();},Window_EquipSlot[_0x507ed6('0x145')][_0x507ed6('0xa8')]=function(){const _0x3bc5a6=_0x507ed6;if(!this['active'])return![];if(!VisuMZ[_0x3bc5a6('0x2f4')][_0x3bc5a6('0x227')][_0x3bc5a6('0x36b')][_0x3bc5a6('0x2a4')])return![];return!![];},Window_EquipSlot[_0x507ed6('0x145')][_0x507ed6('0x53')]=function(){const _0x22ce7f=_0x507ed6;!this[_0x22ce7f('0x3ff')]()&&Window_StatusBase[_0x22ce7f('0x145')][_0x22ce7f('0x53')][_0x22ce7f('0x2e3')](this);},Window_EquipSlot[_0x507ed6('0x145')][_0x507ed6('0x3ff')]=function(){const _0x281716=_0x507ed6;if(!this[_0x281716('0x430')]())return![];if(SceneManager[_0x281716('0x80')][_0x281716('0x16d')]!==Scene_Equip)return![];if(this[_0x281716('0xf6')]())return this[_0x281716('0x2bc')](),Input[_0x281716('0x2b3')](),SceneManager[_0x281716('0x80')][_0x281716('0xb7')](),![];else{if(Input[_0x281716('0x105')](_0x281716('0xf0'))){if(_0x281716('0x3ab')!==_0x281716('0x35e')){const _0x4f1c64=this['index']();if(Input[_0x281716('0xec')]('shift')){if(_0x281716('0x293')!==_0x281716('0x2d0'))this[_0x281716('0x20')]();else{function _0x275dac(){const _0x457152=_0x281716;_0xe8f9cd[_0x457152('0x105')](_0x457152('0x184'))&&this[_0x457152('0x371')](_0x85ad2d[_0x457152('0x305')](_0x457152('0x184'))),_0x59aa14[_0x457152('0x105')](_0x457152('0x268'))&&this[_0x457152('0x3b3')](_0x4df7c0['isTriggered'](_0x457152('0x268')));}}}else this['cursorDown'](Input[_0x281716('0x305')](_0x281716('0xf0')));if(this['index']()!==_0x4f1c64){if('YZbvb'===_0x281716('0xa7'))this[_0x281716('0x2bc')]();else{function _0x1a155e(){const _0x53d3a6=_0x281716;_0x3264ee[_0x53d3a6('0x2f4')][_0x53d3a6('0x41')][_0x53d3a6('0x2e3')](this),this['isUseModernControls']()&&(this[_0x53d3a6('0x180')]['smoothSelect'](0x0),this[_0x53d3a6('0x8f')][_0x53d3a6('0x351')]());}}}return!![];}else{function _0x375325(){const _0x22d41e=_0x281716;if(!_0x3c924d[_0x22d41e('0xd8')](_0x21d337))return![];}}}else{if(this['isShiftShortcutKeyForRemove']()&&Input[_0x281716('0x305')]('shift')){if('XlLLm'!==_0x281716('0x130'))return!![];else{function _0x517a3b(){const _0x2388a1=_0x281716,_0xf0f8c0=this['itemAt'](_0xd9f56e);if(!_0xf0f8c0||!this[_0x2388a1('0x166')]())return;if(!_0x20b705[_0x2388a1('0xd')](_0xf0f8c0))return;const _0xb1a49b=this[_0x2388a1('0xe4')](_0x3fb05b),_0x2952c2=_0xb1a49b['x'],_0x1d1b0f=_0xb1a49b['y']+(this[_0x2388a1('0x3db')]()-_0x39a5b8['iconHeight'])/0x2,_0x325cab=_0x3201d2[_0x2388a1('0x2f4')][_0x2388a1('0x227')][_0x2388a1('0x27')][_0x2388a1('0x284')],_0xf9e35e=_0xca4f50[_0x2388a1('0x2f4')][_0x2388a1('0x227')][_0x2388a1('0x27')]['OffsetY'];this[_0x2388a1('0x17d')](_0xf0f8c0,_0x2952c2+_0x325cab,_0x1d1b0f+_0xf9e35e);}}}}}return![];},Window_EquipSlot[_0x507ed6('0x145')][_0x507ed6('0xf6')]=function(){const _0x1fbcf8=_0x507ed6;if(this['index']()!==0x0)return![];const _0x21e79c=VisuMZ[_0x1fbcf8('0x2f4')]['Settings'][_0x1fbcf8('0x36b')];if(!_0x21e79c[_0x1fbcf8('0x234')]&&!_0x21e79c[_0x1fbcf8('0x97')])return![];return Input[_0x1fbcf8('0x305')]('up');},Window_EquipSlot[_0x507ed6('0x145')]['isShiftShortcutKeyForRemove']=function(){const _0x58b4dd=_0x507ed6;return VisuMZ[_0x58b4dd('0x2f4')][_0x58b4dd('0x227')][_0x58b4dd('0x36b')][_0x58b4dd('0x2a4')];},Window_EquipSlot[_0x507ed6('0x145')][_0x507ed6('0x2a9')]=function(){const _0x351d97=_0x507ed6;if(this[_0x351d97('0x419')]()&&this[_0x351d97('0xa2')]&&SceneManager[_0x351d97('0x80')][_0x351d97('0x16d')]===Scene_Equip){if(this[_0x351d97('0x1bb')]()&&TouchInput[_0x351d97('0x3e')]())this[_0x351d97('0x16c')](![]);else{if(TouchInput[_0x351d97('0x305')]()){if(_0x351d97('0x1a6')!=='uZiOt'){function _0x4fd996(){const _0x2f77e7=_0x351d97;return this['nonOptimizeEtypes']()['includes'](this[_0x2f77e7('0x25c')]()[_0x13b80e])?![]:this[_0x2f77e7('0x341')](_0x1bd34e);}}else this[_0x351d97('0x16c')](!![]);}}if(TouchInput[_0x351d97('0x198')]())this[_0x351d97('0x1cc')]();else TouchInput[_0x351d97('0x1bf')]()&&this[_0x351d97('0x232')]();}},Window_EquipSlot['prototype'][_0x507ed6('0x16c')]=function(_0x25e18a){const _0x121fd3=_0x507ed6;this['_doubleTouch']=![];const _0x1e37f8=this['index'](),_0x4d6b17=this[_0x121fd3('0xd7')](),_0x24d2f2=SceneManager[_0x121fd3('0x80')][_0x121fd3('0x180')];if(_0x24d2f2['isOpen']()&&_0x24d2f2[_0x121fd3('0xa2')]){if(_0x4d6b17>=0x0){if(_0x121fd3('0x3a')==='KXaSs'){function _0x1cd065(){const _0x5319a5=_0x121fd3,_0x9d1d63=_0x9354b4[_0x5319a5('0xbb')]('['+_0x47b0da['$1'][_0x5319a5('0x26d')](/\d+/g)+']');for(const _0x5c49f7 of _0x9d1d63){if(_0x4a8c1d['value'](_0x5c49f7))return![];}}}else _0x4d6b17===this[_0x121fd3('0x2ca')]()&&(this['_doubleTouch']=!![]),this[_0x121fd3('0x275')](),this['select'](_0x4d6b17);}else _0x24d2f2[_0x121fd3('0xd7')]()>=0x0&&(this[_0x121fd3('0x351')](),this[_0x121fd3('0x56')]());}if(_0x25e18a&&this[_0x121fd3('0x2ca')]()!==_0x1e37f8){if('cpTlf'!=='AdwRJ')this[_0x121fd3('0x2bc')]();else{function _0x5c134d(){const _0x3896c0=_0x121fd3;_0x99d697[_0x3896c0('0x2f4')]['Scene_Item_create'][_0x3896c0('0x2e3')](this),this[_0x3896c0('0x244')]()&&this[_0x3896c0('0x259')]();}}}},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x335')]=Window_EquipItem['prototype'][_0x507ed6('0x1c6')],Window_EquipItem[_0x507ed6('0x145')][_0x507ed6('0x1c6')]=function(_0x1f7c42){const _0x19a819=_0x507ed6;return _0x1f7c42===null&&this[_0x19a819('0x339')]()['includes'](this[_0x19a819('0x18')]())?this[_0x19a819('0x3d2')]['length']>0x0?![]:!![]:VisuMZ[_0x19a819('0x2f4')]['Window_EquipItem_includes'][_0x19a819('0x2e3')](this,_0x1f7c42);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x2db')]=Window_EquipItem[_0x507ed6('0x145')][_0x507ed6('0x18e')],Window_EquipItem['prototype'][_0x507ed6('0x18e')]=function(_0x18253a){const _0x518d33=_0x507ed6;if(!_0x18253a&&this['nonRemovableEtypes']()['includes'](this[_0x518d33('0x18')]()))return![];else{if(_0x518d33('0x214')!==_0x518d33('0x214')){function _0x1e77cd(){const _0x38d556=_0x518d33;this[_0x38d556('0x358')]=![];if(this['isCursorMovable']()){const _0x4acbca=this[_0x38d556('0x2ca')](),_0x3f41b9=this['hitIndex']();_0x3f41b9>=0x0&&_0x3f41b9!==this[_0x38d556('0x2ca')]()&&this[_0x38d556('0x423')](_0x3f41b9),_0x4b7dfc&&this[_0x38d556('0x2ca')]()!==_0x4acbca&&this[_0x38d556('0x2bc')]();}}}else return VisuMZ[_0x518d33('0x2f4')][_0x518d33('0x2db')][_0x518d33('0x2e3')](this,_0x18253a);}},Window_EquipItem[_0x507ed6('0x145')][_0x507ed6('0x339')]=function(){const _0x2135a9=_0x507ed6;return VisuMZ[_0x2135a9('0x2f4')]['Settings'][_0x2135a9('0x36b')][_0x2135a9('0x75')];},Window_EquipItem[_0x507ed6('0x145')][_0x507ed6('0x42d')]=function(_0x3726b4){const _0x2e70f2=_0x507ed6,_0x3f93c7=this[_0x2e70f2('0x14c')](_0x3726b4);if(_0x3f93c7){if(_0x2e70f2('0x3ad')==='UQQAh'){function _0x1eb16f(){return;}}else Window_ItemList['prototype'][_0x2e70f2('0x42d')][_0x2e70f2('0x2e3')](this,_0x3726b4);}else{if(_0x2e70f2('0x1e1')===_0x2e70f2('0x10e')){function _0x44d663(){const _0x37ee0b=_0x2e70f2;this[_0x37ee0b('0x1be')]();}}else this[_0x2e70f2('0x3b0')](_0x3726b4);}},Window_EquipItem['prototype'][_0x507ed6('0x3b0')]=function(_0x327149){const _0x23cf87=_0x507ed6;this['changePaintOpacity'](this[_0x23cf87('0x18e')](null));const _0x206038=VisuMZ[_0x23cf87('0x2f4')][_0x23cf87('0x227')][_0x23cf87('0x36b')],_0x4024eb=this[_0x23cf87('0xe4')](_0x327149),_0x4439c6=_0x4024eb['y']+(this[_0x23cf87('0x3db')]()-ImageManager[_0x23cf87('0xae')])/0x2,_0x2c7c97=ImageManager[_0x23cf87('0x3c9')]+0x4,_0x535c04=Math[_0x23cf87('0x1a1')](0x0,_0x4024eb[_0x23cf87('0x5d')]-_0x2c7c97);this['resetTextColor'](),this['drawIcon'](_0x206038['RemoveEquipIcon'],_0x4024eb['x'],_0x4439c6),this[_0x23cf87('0x1f9')](_0x206038[_0x23cf87('0x66')],_0x4024eb['x']+_0x2c7c97,_0x4024eb['y'],_0x535c04),this[_0x23cf87('0x2b7')](!![]);},Window_EquipItem[_0x507ed6('0x145')][_0x507ed6('0x209')]=function(){const _0x46918f=_0x507ed6;Window_ItemList[_0x46918f('0x145')]['updateHelp'][_0x46918f('0x2e3')](this);if(this['_actor']&&this[_0x46918f('0x183')]&&this[_0x46918f('0x3de')]>=0x0){const _0x271973=JsonEx['makeDeepCopy'](this['_actor']);_0x271973['_tempActor']=!![],_0x271973[_0x46918f('0x211')](this[_0x46918f('0x3de')],this[_0x46918f('0x41a')]()),this[_0x46918f('0x183')][_0x46918f('0x76')](_0x271973);}},VisuMZ['ItemsEquipsCore'][_0x507ed6('0x285')]=Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x9a')],Window_ShopCommand['prototype']['initialize']=function(_0x5cb317){const _0x14f5c3=_0x507ed6;VisuMZ[_0x14f5c3('0x2f4')][_0x14f5c3('0x285')][_0x14f5c3('0x2e3')](this,_0x5cb317),this[_0x14f5c3('0x1c')](_0x5cb317);},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x1c')]=function(_0x1fbc47){const _0xd9e5e8=_0x507ed6,_0x36bb1a=new Rectangle(0x0,0x0,_0x1fbc47['width'],_0x1fbc47['height']);this['_commandNameWindow']=new Window_Base(_0x36bb1a),this['_commandNameWindow'][_0xd9e5e8('0x378')]=0x0,this['addChild'](this[_0xd9e5e8('0xce')]),this[_0xd9e5e8('0x26f')]();},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x1a4')]=function(){const _0x101774=_0x507ed6;Window_HorzCommand[_0x101774('0x145')]['callUpdateHelp'][_0x101774('0x2e3')](this);if(this['_commandNameWindow'])this[_0x101774('0x26f')]();},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x26f')]=function(){const _0x56e0c9=_0x507ed6,_0x2753cc=this[_0x56e0c9('0xce')];_0x2753cc['contents'][_0x56e0c9('0x2b3')]();const _0x13090a=this['commandStyleCheck'](this[_0x56e0c9('0x2ca')]());if(_0x13090a===_0x56e0c9('0x151')){const _0x1d8ba9=this[_0x56e0c9('0xe4')](this[_0x56e0c9('0x2ca')]());let _0x1192d6=this[_0x56e0c9('0x434')](this[_0x56e0c9('0x2ca')]());_0x1192d6=_0x1192d6[_0x56e0c9('0x208')](/\\I\[(\d+)\]/gi,''),_0x2753cc[_0x56e0c9('0x23a')](),this['commandNameWindowDrawBackground'](_0x1192d6,_0x1d8ba9),this[_0x56e0c9('0x21')](_0x1192d6,_0x1d8ba9),this[_0x56e0c9('0x55')](_0x1192d6,_0x1d8ba9);}},Window_ShopCommand['prototype'][_0x507ed6('0x7b')]=function(_0x4fe80a,_0xe2481f){},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x21')]=function(_0x5a2ad9,_0x4cad78){const _0x2f687d=_0x507ed6,_0x4c613a=this[_0x2f687d('0xce')];_0x4c613a[_0x2f687d('0x1f9')](_0x5a2ad9,0x0,_0x4cad78['y'],_0x4c613a[_0x2f687d('0x64')],_0x2f687d('0x0'));},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x55')]=function(_0x5e29e9,_0x176ebc){const _0x1111dc=_0x507ed6,_0x58ab28=this[_0x1111dc('0xce')],_0x527342=$gameSystem[_0x1111dc('0x3e4')](),_0x462691=_0x176ebc['x']+Math['floor'](_0x176ebc['width']/0x2)+_0x527342;_0x58ab28['x']=_0x58ab28[_0x1111dc('0x5d')]/-0x2+_0x462691,_0x58ab28['y']=Math[_0x1111dc('0x2ae')](_0x176ebc[_0x1111dc('0x16e')]/0x2);},Window_ShopCommand['prototype']['maxCols']=function(){const _0x4250fa=_0x507ed6;return this[_0x4250fa('0x3ea')]?this[_0x4250fa('0x3ea')][_0x4250fa('0x2e')]:0x3;},Window_ShopCommand['prototype'][_0x507ed6('0x3cb')]=function(){const _0xf87dc7=_0x507ed6;return VisuMZ[_0xf87dc7('0x2f4')][_0xf87dc7('0x227')][_0xf87dc7('0x14b')][_0xf87dc7('0x2c0')];},Window_ShopCommand['prototype']['makeCommandList']=function(){const _0x3af2a5=_0x507ed6;this[_0x3af2a5('0x2d3')](),this['addSellCommand'](),this['addCancelCommand']();},Window_ShopCommand['prototype'][_0x507ed6('0x41c')]=function(){const _0x3d3854=_0x507ed6;Window_HorzCommand[_0x3d3854('0x145')][_0x3d3854('0x41c')]['call'](this),this[_0x3d3854('0x59')]();},Window_ShopCommand['prototype']['addBuyCommand']=function(){const _0x21b852=_0x507ed6,_0x3c8fb6=this['commandStyle'](),_0x511171=VisuMZ['ItemsEquipsCore'][_0x21b852('0x227')][_0x21b852('0x14b')][_0x21b852('0xb8')],_0x5a8020=_0x3c8fb6===_0x21b852('0x222')?TextManager[_0x21b852('0x2bf')]:_0x21b852('0x38e')[_0x21b852('0x148')](_0x511171,TextManager[_0x21b852('0x2bf')]),_0x1b2938=this[_0x21b852('0x369')]();if(this[_0x21b852('0x3cb')]()&&!_0x1b2938)return;this['addCommand'](_0x5a8020,'buy',_0x1b2938);},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x369')]=function(){const _0x1e7eee=_0x507ed6;if(SceneManager['_scene']['constructor']===Scene_Shop){if(_0x1e7eee('0xc7')!==_0x1e7eee('0x2dc'))return SceneManager[_0x1e7eee('0x80')]['_goodsCount']>0x0;else{function _0x655931(){return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}}else return!![];},Window_ShopCommand[_0x507ed6('0x145')]['addSellCommand']=function(){const _0x55b051=_0x507ed6,_0x59b4e4=this[_0x55b051('0x195')](),_0x125439=VisuMZ[_0x55b051('0x2f4')][_0x55b051('0x227')][_0x55b051('0x14b')][_0x55b051('0x34')],_0x5c3ae1=_0x59b4e4===_0x55b051('0x222')?TextManager['sell']:_0x55b051('0x38e')['format'](_0x125439,TextManager[_0x55b051('0x3f0')]),_0x355955=this[_0x55b051('0x381')]();if(this[_0x55b051('0x3cb')]()&&!_0x355955)return;this[_0x55b051('0x2cc')](_0x5c3ae1,'sell',_0x355955);},Window_ShopCommand[_0x507ed6('0x145')]['isSellCommandEnabled']=function(){const _0x5463e7=_0x507ed6;return!this[_0x5463e7('0x3fd')];},Window_ShopCommand['prototype']['addCancelCommand']=function(){const _0xcce543=_0x507ed6,_0x48991b=this[_0xcce543('0x195')](),_0x5491c7=VisuMZ[_0xcce543('0x2f4')]['Settings'][_0xcce543('0x14b')][_0xcce543('0x117')],_0x1ab912=VisuMZ[_0xcce543('0x2f4')][_0xcce543('0x227')]['ShopScene'][_0xcce543('0x35b')],_0x22bc9f=_0x48991b===_0xcce543('0x222')?_0x1ab912:_0xcce543('0x38e')[_0xcce543('0x148')](_0x5491c7,_0x1ab912);this[_0xcce543('0x2cc')](_0x22bc9f,'cancel');},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x17c')]=function(){const _0x50b3b0=_0x507ed6;return VisuMZ[_0x50b3b0('0x2f4')][_0x50b3b0('0x227')][_0x50b3b0('0x14b')][_0x50b3b0('0x38f')];},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x42d')]=function(_0x2ae077){const _0x164e2c=_0x507ed6,_0x5b9c67=this[_0x164e2c('0x8b')](_0x2ae077);if(_0x5b9c67===_0x164e2c('0x418'))this['drawItemStyleIconText'](_0x2ae077);else _0x5b9c67===_0x164e2c('0x151')?this['drawItemStyleIcon'](_0x2ae077):Window_HorzCommand[_0x164e2c('0x145')][_0x164e2c('0x42d')]['call'](this,_0x2ae077);},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x195')]=function(){const _0x104691=_0x507ed6;return VisuMZ[_0x104691('0x2f4')][_0x104691('0x227')][_0x104691('0x14b')]['CmdStyle'];},Window_ShopCommand[_0x507ed6('0x145')]['commandStyleCheck']=function(_0x2d374c){const _0x52975c=_0x507ed6;if(_0x2d374c<0x0)return _0x52975c('0x222');const _0x447d20=this[_0x52975c('0x195')]();if(_0x447d20!=='auto')return _0x447d20;else{if(this[_0x52975c('0x1e3')]()>0x0){const _0x42938f=this['commandName'](_0x2d374c);if(_0x42938f[_0x52975c('0x26d')](/\\I\[(\d+)\]/i)){const _0x52e3e5=this['itemLineRect'](_0x2d374c),_0x3b4e93=this[_0x52975c('0x409')](_0x42938f)['width'];return _0x3b4e93<=_0x52e3e5[_0x52975c('0x5d')]?_0x52975c('0x418'):_0x52975c('0x151');}}}return _0x52975c('0x222');},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x7f')]=function(_0x330507){const _0x3e524d=_0x507ed6,_0x4c23a4=this[_0x3e524d('0xe4')](_0x330507),_0x4acd0a=this[_0x3e524d('0x434')](_0x330507),_0x2ee032=this[_0x3e524d('0x409')](_0x4acd0a)[_0x3e524d('0x5d')];this['changePaintOpacity'](this[_0x3e524d('0x2de')](_0x330507));const _0xb3306e=this[_0x3e524d('0x17c')]();if(_0xb3306e===_0x3e524d('0x184'))this['drawTextEx'](_0x4acd0a,_0x4c23a4['x']+_0x4c23a4[_0x3e524d('0x5d')]-_0x2ee032,_0x4c23a4['y'],_0x2ee032);else{if(_0xb3306e===_0x3e524d('0x0')){if(_0x3e524d('0x3a6')===_0x3e524d('0x3a6')){const _0x47196b=_0x4c23a4['x']+Math[_0x3e524d('0x2ae')]((_0x4c23a4[_0x3e524d('0x5d')]-_0x2ee032)/0x2);this[_0x3e524d('0x2d6')](_0x4acd0a,_0x47196b,_0x4c23a4['y'],_0x2ee032);}else{function _0x26c31e(){const _0xb7ffbd=_0x3e524d;this[_0xb7ffbd('0x2be')]=0x0;for(const _0xc22baf of this['_goods']){this[_0xb7ffbd('0x3d6')](_0xc22baf)?this[_0xb7ffbd('0x2be')]++:_0xc22baf[0x0]=-0x1;}}}}else this[_0x3e524d('0x2d6')](_0x4acd0a,_0x4c23a4['x'],_0x4c23a4['y'],_0x2ee032);}},Window_ShopCommand[_0x507ed6('0x145')][_0x507ed6('0x132')]=function(_0x406063){const _0x501865=_0x507ed6;this[_0x501865('0x434')](_0x406063)[_0x501865('0x26d')](/\\I\[(\d+)\]/i);const _0x7d194b=Number(RegExp['$1'])||0x0,_0x2bc366=this[_0x501865('0xe4')](_0x406063),_0x1536ed=_0x2bc366['x']+Math[_0x501865('0x2ae')]((_0x2bc366[_0x501865('0x5d')]-ImageManager['iconWidth'])/0x2),_0x30ce4f=_0x2bc366['y']+(_0x2bc366[_0x501865('0x16e')]-ImageManager['iconHeight'])/0x2;this[_0x501865('0x1')](_0x7d194b,_0x1536ed,_0x30ce4f);},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x6a')]=Window_ShopBuy[_0x507ed6('0x145')][_0x507ed6('0x41c')],Window_ShopBuy[_0x507ed6('0x145')][_0x507ed6('0x41c')]=function(){const _0x1219bc=_0x507ed6;this['updateMoneyAmount'](),VisuMZ['ItemsEquipsCore'][_0x1219bc('0x6a')][_0x1219bc('0x2e3')](this);},Window_ShopBuy[_0x507ed6('0x145')][_0x507ed6('0x34f')]=function(){const _0x386c6a=_0x507ed6;SceneManager[_0x386c6a('0x80')][_0x386c6a('0x16d')]===Scene_Shop&&(this[_0x386c6a('0x266')]=SceneManager[_0x386c6a('0x80')][_0x386c6a('0x1d3')]());},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x3a5')]=Window_ShopBuy[_0x507ed6('0x145')]['price'],Window_ShopBuy[_0x507ed6('0x145')][_0x507ed6('0x178')]=function(_0x2a5b4b){const _0x206f34=_0x507ed6;if(!_0x2a5b4b)return 0x0;const _0x36d616=VisuMZ[_0x206f34('0x2f4')][_0x206f34('0x3a5')][_0x206f34('0x2e3')](this,_0x2a5b4b);return this[_0x206f34('0x205')](_0x2a5b4b,_0x36d616);},Window_ShopBuy[_0x507ed6('0x145')]['modifiedBuyPriceItemsEquipsCore']=function(_0x4f5244,_0x1bdfcd){const _0x3791c3=_0x507ed6,_0x80220c=_0x4f5244[_0x3791c3('0x170')];if(_0x80220c[_0x3791c3('0x26d')](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x1385b1=String(RegExp['$1']);try{eval(_0x1385b1);}catch(_0x12ac82){if($gameTemp[_0x3791c3('0x3e6')]())console[_0x3791c3('0x17e')](_0x12ac82);}}_0x1bdfcd=VisuMZ[_0x3791c3('0x2f4')][_0x3791c3('0x227')]['ShopScene'][_0x3791c3('0x2a8')]['call'](this,_0x4f5244,_0x1bdfcd);if(isNaN(_0x1bdfcd))_0x1bdfcd=0x0;return Math[_0x3791c3('0x2ae')](_0x1bdfcd);},Window_ShopBuy[_0x507ed6('0x145')]['drawItem']=function(_0x498fd6){const _0x6aa999=_0x507ed6;this[_0x6aa999('0x23a')]();const _0x1541ce=this[_0x6aa999('0x14c')](_0x498fd6),_0x3a73d2=this[_0x6aa999('0x178')](_0x1541ce),_0x4f463e=TextManager[_0x6aa999('0x28')],_0x5f468a=this[_0x6aa999('0xe4')](_0x498fd6),_0xad0d81=this[_0x6aa999('0x21a')](),_0x16ae7c=this['textWidth'](_0x4f463e),_0x331710=_0x5f468a['x']+_0x5f468a[_0x6aa999('0x5d')]-_0xad0d81-_0x16ae7c,_0x274c5f=_0x5f468a[_0x6aa999('0x5d')]-_0xad0d81-_0x16ae7c;this['changePaintOpacity'](this[_0x6aa999('0x18e')](_0x1541ce)),this[_0x6aa999('0xd4')](_0x1541ce,_0x5f468a['x'],_0x5f468a['y'],_0x274c5f),this[_0x6aa999('0x1f9')](_0x3a73d2,_0x331710,_0x5f468a['y'],_0xad0d81,'right'),this[_0x6aa999('0x33b')](ColorManager['systemColor']()),this['drawText'](_0x4f463e,_0x5f468a['x'],_0x5f468a['y'],_0x5f468a['width'],_0x6aa999('0x184')),this[_0x6aa999('0x2b7')](!![]);},Window_ShopSell[_0x507ed6('0x145')][_0x507ed6('0x2ef')]=function(){const _0xc1c107=_0x507ed6;return SceneManager[_0xc1c107('0x80')][_0xc1c107('0x79')]()?0x1:0x2;},VisuMZ[_0x507ed6('0x2f4')][_0x507ed6('0x3fe')]=Window_ShopSell[_0x507ed6('0x145')][_0x507ed6('0x18e')],Window_ShopSell[_0x507ed6('0x145')]['isEnabled']=function(_0x55108b){const _0x5d2181=_0x507ed6;if(!_0x55108b)return![];const _0x4de125=_0x55108b[_0x5d2181('0x170')];if(_0x4de125[_0x5d2181('0x26d')](/<CANNOT SELL>/i))return![];if(_0x4de125['match'](/<CAN SELL>/i))return!![];if(_0x4de125[_0x5d2181('0x26d')](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x5d2181('0x1c7')!=='vjofk'){function _0x4478c7(){const _0x32b871=_0x5d2181;this[_0x32b871('0x2be')]++;}}else{const _0x33d8a3=JSON['parse']('['+RegExp['$1'][_0x5d2181('0x26d')](/\d+/g)+']');for(const _0x3959b3 of _0x33d8a3){if('ELoZv'===_0x5d2181('0x25e')){function _0x22ed84(){const _0x2a0208=_0x5d2181;if(!_0x4235a4[_0x2a0208('0xd8')](_0x3cef05))return!![];}}else{if(!$gameSwitches['value'](_0x3959b3))return![];}}}}if(_0x4de125['match'](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x48dea7=JSON[_0x5d2181('0xbb')]('['+RegExp['$1'][_0x5d2181('0x26d')](/\d+/g)+']');for(const _0x2968d7 of _0x48dea7){if(!$gameSwitches['value'](_0x2968d7))return![];}}if(_0x4de125[_0x5d2181('0x26d')](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26dbb6=JSON['parse']('['+RegExp['$1'][_0x5d2181('0x26d')](/\d+/g)+']');for(const _0x24985d of _0x26dbb6){if($gameSwitches[_0x5d2181('0xd8')](_0x24985d))return![];}}return VisuMZ[_0x5d2181('0x2f4')]['Window_ShopSell_isEnabled']['call'](this,_0x55108b);},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0xf2')]=function(){return![];},Window_ShopStatus['prototype'][_0x507ed6('0x295')]=function(){const _0x521a6e=_0x507ed6;Window_StatusBase[_0x521a6e('0x145')][_0x521a6e('0x295')][_0x521a6e('0x2e3')](this);for(const _0x4f304a of $gameParty['members']()){ImageManager[_0x521a6e('0x103')](_0x4f304a['characterName']());}},Window_ShopStatus['prototype']['translucentOpacity']=function(){const _0x386b2e=_0x507ed6;return VisuMZ[_0x386b2e('0x2f4')]['Settings'][_0x386b2e('0x1eb')]['Translucent'];},Window_ShopStatus['prototype']['refresh']=function(){const _0xd57de2=_0x507ed6;this['contents'][_0xd57de2('0x2b3')](),this['contentsBack']['clear']();if(this[_0xd57de2('0xfe')]){if(_0xd57de2('0x121')!==_0xd57de2('0x3ca')){this[_0xd57de2('0x23a')](),this[_0xd57de2('0x2b7')](!![]),this[_0xd57de2('0x302')]();if(this[_0xd57de2('0x323')]())this[_0xd57de2('0x40b')]();else{if('AUYTa'===_0xd57de2('0x3c7')){function _0x5067fa(){const _0x44160d=_0xd57de2;_0x4d7bf2[_0x44160d('0x2f4')][_0x44160d('0x33c')][_0x44160d('0x2e3')](this,_0x22b573),this['createCategoryNameWindow'](_0x45c07a);}}else this[_0xd57de2('0x2a6')]();}}else{function _0xc4d42e(){const _0x4e02ec=_0xd57de2;return _0x1fbc58[_0x4e02ec('0x2f4')][_0x4e02ec('0x3cd')][_0x4e02ec('0x2e3')](this,_0x21006e);}}}},Window_ShopStatus['prototype'][_0x507ed6('0x31')]=function(_0x430036,_0x1c85a9){const _0x28e11a=_0x507ed6;if(!this[_0x28e11a('0x323')]()&&!DataManager[_0x28e11a('0x1c2')](this[_0x28e11a('0xfe')]))return;const _0x3aa58e=this[_0x28e11a('0x64')]-this[_0x28e11a('0x12c')]()-_0x430036,_0x4ac3c6=this['textWidth'](_0x28e11a('0x175'));this[_0x28e11a('0x33b')](ColorManager['systemColor']()),this['drawText'](TextManager['possession'],_0x430036+this[_0x28e11a('0x12c')](),_0x1c85a9,_0x3aa58e-_0x4ac3c6),this[_0x28e11a('0x73')](),this[_0x28e11a('0x36f')](this[_0x28e11a('0xfe')],_0x430036,_0x1c85a9,_0x3aa58e);},Window_ShopStatus[_0x507ed6('0x145')]['drawItemDarkRect']=function(_0xc44a38,_0x2d05a6,_0x5c5c19,_0x2c28ce,_0x1b4f7c){const _0x1c2e64=_0x507ed6;if(VisuMZ['ItemsEquipsCore'][_0x1c2e64('0x227')][_0x1c2e64('0x1eb')][_0x1c2e64('0x271')]===![])return;_0x1b4f7c=Math[_0x1c2e64('0x1a1')](_0x1b4f7c||0x1,0x1);while(_0x1b4f7c--){if(_0x1c2e64('0x36e')==='RjmHP'){function _0x318c9f(){const _0x14f452=_0x1c2e64,_0x1a36bf=_0x599c62[_0x14f452('0x2f4')][_0x14f452('0x227')][_0x14f452('0x36b')];return _0x1a36bf[_0x14f452('0x234')]||_0x1a36bf[_0x14f452('0x97')];}}else{_0x2c28ce=_0x2c28ce||this[_0x1c2e64('0x3db')](),this[_0x1c2e64('0x254')]['paintOpacity']=0xa0;const _0x5abc61=ColorManager[_0x1c2e64('0x299')]();this[_0x1c2e64('0x254')][_0x1c2e64('0xd1')](_0xc44a38+0x1,_0x2d05a6+0x1,_0x5c5c19-0x2,_0x2c28ce-0x2,_0x5abc61),this[_0x1c2e64('0x254')][_0x1c2e64('0x197')]=0xff;}}},ColorManager[_0x507ed6('0x299')]=function(){const _0x2fe71b=_0x507ed6,_0x314b66=VisuMZ[_0x2fe71b('0x2f4')][_0x2fe71b('0x227')][_0x2fe71b('0x1eb')];let _0x3ee82d=_0x314b66[_0x2fe71b('0x43a')]!==undefined?_0x314b66[_0x2fe71b('0x43a')]:0x13;return ColorManager[_0x2fe71b('0x45')](_0x3ee82d);},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x40b')]=function(){const _0x84ed44=_0x507ed6;VisuMZ[_0x84ed44('0x2f4')][_0x84ed44('0x227')][_0x84ed44('0x1eb')][_0x84ed44('0x3a3')][_0x84ed44('0x2e3')](this);},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x2b4')]=function(_0x356aaf,_0x551226,_0x42a57f){const _0x3a7fe4=_0x507ed6;if(!this['isEquipItem']())return![];const _0x1175a5=$dataSystem['equipTypes'][this[_0x3a7fe4('0xfe')]['etypeId']];return this[_0x3a7fe4('0x23b')](_0x1175a5,_0x356aaf,_0x551226,_0x42a57f,!![]),this[_0x3a7fe4('0x15b')](_0x356aaf,_0x551226,_0x42a57f),this[_0x3a7fe4('0x23a')](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x201')]=function(){const _0x282a98=_0x507ed6,_0xa3d83f=VisuMZ['ItemsEquipsCore'][_0x282a98('0x227')][_0x282a98('0x21d')][_0x282a98('0x247')];return _0xa3d83f[_0x282a98('0x148')]($gameParty['numItems'](this[_0x282a98('0xfe')]));},Window_ShopStatus[_0x507ed6('0x145')]['actorParams']=function(){const _0x3511af=_0x507ed6;if(Imported[_0x3511af('0x200')]){if(_0x3511af('0x13c')===_0x3511af('0x13c'))return VisuMZ[_0x3511af('0x19c')]['Settings']['Param'][_0x3511af('0x1ca')];else{function _0x35314b(){const _0xdeac0a=_0x3511af,_0x577861=_0x221e69[_0x39265e],_0xbe542f=this[_0xdeac0a('0x372')](_0x27c5b3,_0x577861);if(this[_0xdeac0a('0x332')](_0xbe542f))this[_0xdeac0a('0x31c')][_0x177d99][_0xdeac0a('0x262')](_0xbe542f);}}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x1e8')]=function(){const _0x1aa4ca=_0x507ed6;return VisuMZ[_0x1aa4ca('0x2f4')][_0x1aa4ca('0x227')][_0x1aa4ca('0x1eb')][_0x1aa4ca('0x40d')];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x1e9')]=function(_0x54b157,_0x13a790,_0x1cfefc,_0x2670fe){const _0x5d1756=_0x507ed6;this[_0x5d1756('0x23a')](),this[_0x5d1756('0x281')]['fontSize']=this[_0x5d1756('0x1e8')]();let _0x4da5e6=this['textWidth'](TextManager[_0x5d1756('0x3ee')](_0x54b157))+0x4+_0x13a790;return Imported['VisuMZ_0_CoreEngine']?(this['drawParamText'](_0x13a790,_0x1cfefc,_0x2670fe,_0x54b157,!![]),VisuMZ[_0x5d1756('0x19c')][_0x5d1756('0x227')]['Param'][_0x5d1756('0x8c')]&&(_0x4da5e6+=ImageManager[_0x5d1756('0x3c9')]+0x4)):(this['changeTextColor'](ColorManager[_0x5d1756('0x272')]()),this[_0x5d1756('0x1f9')](TextManager['param'](_0x54b157),_0x13a790,_0x1cfefc,_0x2670fe)),this[_0x5d1756('0x23a')](),_0x4da5e6;},Window_ShopStatus[_0x507ed6('0x145')]['drawActorParamDifference']=function(_0x24f33b,_0x4929c2,_0xed81f,_0x30a369,_0x4d7651){const _0x5b365d=_0x507ed6;_0xed81f+=this[_0x5b365d('0x12c')](),_0x4d7651-=this[_0x5b365d('0x12c')]()*0x2;const _0x170e69=VisuMZ['ItemsEquipsCore'][_0x5b365d('0x227')][_0x5b365d('0x1eb')];this[_0x5b365d('0x281')][_0x5b365d('0x28d')]=_0x170e69[_0x5b365d('0x40d')],this['changePaintOpacity'](_0x24f33b[_0x5b365d('0x332')](this[_0x5b365d('0xfe')]));if(_0x24f33b[_0x5b365d('0x2f6')](this[_0x5b365d('0xfe')])){if(_0x5b365d('0x417')==='PztEo'){function _0xfdf215(){const _0x8a44bb=_0x5b365d,_0x12256e=_0x2b9186[_0x8a44bb('0xbb')]('['+_0x5c4220['$1'][_0x8a44bb('0x26d')](/\d+/g)+']');for(const _0x46c565 of _0x12256e){if(!_0x1794c8['value'](_0x46c565))return![];}return!![];}}else{const _0xb4dfc1=_0x170e69[_0x5b365d('0x3b8')];this['drawText'](_0xb4dfc1,_0xed81f,_0x30a369,_0x4d7651,_0x5b365d('0x0'));}}else{if(_0x24f33b['canEquip'](this[_0x5b365d('0xfe')])){const _0x5ede0b=this[_0x5b365d('0x1f3')](_0x24f33b,this[_0x5b365d('0xfe')][_0x5b365d('0x18')]),_0x5de165=JsonEx[_0x5b365d('0xa5')](_0x24f33b);_0x5de165['_tempActor']=!![];const _0x43a977=_0x5de165[_0x5b365d('0x25c')]()[_0x5b365d('0x85')](this[_0x5b365d('0xfe')]['etypeId']);if(_0x43a977>=0x0)_0x5de165['forceChangeEquip'](_0x43a977,this[_0x5b365d('0xfe')]);let _0xc5df18=0x0,_0x9debd0=0x0,_0x58b4d9=0x0;Imported['VisuMZ_0_CoreEngine']?(_0xc5df18=_0x5de165['paramValueByName'](_0x4929c2),_0x9debd0=_0xc5df18-_0x24f33b[_0x5b365d('0x3e3')](_0x4929c2),this[_0x5b365d('0x33b')](ColorManager['paramchangeTextColor'](_0x9debd0)),_0x58b4d9=(_0x9debd0>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x9debd0,0x0)):(_0xc5df18=_0x5de165[_0x5b365d('0x3ee')](_0x4929c2),_0x9debd0=_0xc5df18-_0x24f33b[_0x5b365d('0x3ee')](_0x4929c2),this[_0x5b365d('0x33b')](ColorManager[_0x5b365d('0x18d')](_0x9debd0)),_0x58b4d9=(_0x9debd0>=0x0?'+':'')+_0x9debd0);if(_0x58b4d9==='+0')_0x58b4d9=_0x170e69[_0x5b365d('0x1ce')];this[_0x5b365d('0x1f9')](_0x58b4d9,_0xed81f,_0x30a369,_0x4d7651,'center');}else{if(_0x5b365d('0x20a')!=='eziBb'){const _0x275ab4=_0x170e69[_0x5b365d('0x29f')];this[_0x5b365d('0x1f9')](_0x275ab4,_0xed81f,_0x30a369,_0x4d7651,_0x5b365d('0x0'));}else{function _0x43c0fa(){const _0x42ae4c=_0x5b365d;if(!this[_0x42ae4c('0x323')]()&&!_0x634f1[_0x42ae4c('0x1c2')](this[_0x42ae4c('0xfe')]))return;const _0x30438e=this['innerWidth']-this[_0x42ae4c('0x12c')]()-_0x4f4279,_0x1f52f9=this[_0x42ae4c('0x373')](_0x42ae4c('0x175'));this['changeTextColor'](_0x44c60f['systemColor']()),this['drawText'](_0x31fcb6[_0x42ae4c('0x316')],_0x4cd43c+this['itemPadding'](),_0x26bf26,_0x30438e-_0x1f52f9),this[_0x42ae4c('0x73')](),this[_0x42ae4c('0x36f')](this[_0x42ae4c('0xfe')],_0x1546e3,_0x4f8580,_0x30438e);}}}}this[_0x5b365d('0x23a')](),this[_0x5b365d('0x2b7')](!![]);},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x2a6')]=function(){const _0x2affed=_0x507ed6;VisuMZ[_0x2affed('0x2f4')][_0x2affed('0x227')]['StatusWindow'][_0x2affed('0x1a3')][_0x2affed('0x2e3')](this);},Window_ShopStatus['prototype'][_0x507ed6('0x302')]=function(){const _0x34c845=_0x507ed6;this[_0x34c845('0x104')]={};if(!this[_0x34c845('0xfe')])return;const _0x50ff8b=this[_0x34c845('0xfe')][_0x34c845('0x170')];if(_0x50ff8b[_0x34c845('0x26d')](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x38e65a=String(RegExp['$1'])[_0x34c845('0x1b2')](/[\r\n]+/);for(const _0x1f9c7a of _0x38e65a){if(_0x34c845('0xe8')!=='rGYGE'){if(_0x1f9c7a[_0x34c845('0x26d')](/(.*):[ ](.*)/i)){const _0x556b3e=String(RegExp['$1'])['toUpperCase']()[_0x34c845('0x11a')](),_0x1b7f9b=String(RegExp['$2'])['trim']();this['_customItemInfo'][_0x556b3e]=_0x1b7f9b;}}else{function _0x3642bd(){const _0x4542e1=_0x34c845,_0x38e939=_0x45ae06[_0x4542e1('0x3bb')][_0x4542e1('0x85')](_0x23bff5[_0x4542e1('0x11a')]());if(_0x38e939>0x0)_0x3b5dc4[_0x4542e1('0x25c')][_0x4542e1('0x146')](_0x38e939);}}}}},Window_ShopStatus[_0x507ed6('0x145')]['itemDataFontSize']=function(){return 0x16;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x23a')]=function(){const _0x39048d=_0x507ed6;Window_StatusBase['prototype'][_0x39048d('0x23a')][_0x39048d('0x2e3')](this),this['contents']['fontSize']=this[_0x39048d('0x40')]||this[_0x39048d('0x281')][_0x39048d('0x28d')],this['contents']['textColor']=this['_resetFontColor']||this[_0x39048d('0x281')][_0x39048d('0x25b')];},Window_ShopStatus['prototype']['fontSizeRatio']=function(){const _0x364474=_0x507ed6;return this[_0x364474('0x281')][_0x364474('0x28d')]/$gameSystem[_0x364474('0x1e6')]();},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x1')]=function(_0xd5b831,_0x5e5821,_0x38ad9f){const _0x1b758d=_0x507ed6,_0x3298f2=ImageManager[_0x1b758d('0x37e')](_0x1b758d('0x25a')),_0x575d2e=ImageManager[_0x1b758d('0x3c9')],_0x2755fe=ImageManager[_0x1b758d('0xae')],_0x464104=_0xd5b831%0x10*_0x575d2e,_0x219a09=Math[_0x1b758d('0x2ae')](_0xd5b831/0x10)*_0x2755fe,_0x1976fe=Math[_0x1b758d('0x1f')](_0x575d2e*this[_0x1b758d('0x1d6')]()),_0x36a777=Math[_0x1b758d('0x1f')](_0x2755fe*this['fontSizeRatio']());this[_0x1b758d('0x281')]['blt'](_0x3298f2,_0x464104,_0x219a09,_0x575d2e,_0x2755fe,_0x5e5821,_0x38ad9f,_0x1976fe,_0x36a777);},Window_ShopStatus[_0x507ed6('0x145')]['processDrawIcon']=function(_0x2c94c2,_0x2db10f){const _0xb0640c=_0x507ed6;_0x2db10f['drawing']&&this[_0xb0640c('0x1')](_0x2c94c2,_0x2db10f['x'],_0x2db10f['y']+0x2);_0x2db10f['x']+=Math['ceil'](ImageManager[_0xb0640c('0x3c9')]*this[_0xb0640c('0x1d6')]());if(this[_0xb0640c('0x1d6')]()===0x1)_0x2db10f['x']+=0x4;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x23b')]=function(_0x1404b9,_0x286724,_0x5197e9,_0x596266,_0x3045ec,_0x1032a7){const _0x10d597=_0x507ed6;_0x1404b9=_0x1404b9||'',_0x1032a7=_0x1032a7||_0x10d597('0x268'),this[_0x10d597('0x40')]=this[_0x10d597('0x3bd')](),this[_0x10d597('0xf')]=_0x3045ec?ColorManager['systemColor']():this['contents'][_0x10d597('0x25b')],_0x286724+=this[_0x10d597('0x12c')](),_0x596266-=this[_0x10d597('0x12c')]()*0x2;const _0x438a45=this[_0x10d597('0x409')](_0x1404b9);if(_0x1032a7==='center'){if('WvRaO'==='CpbkA'){function _0x5aa0a3(){const _0x1425d2=_0x10d597;return this[_0x1425d2('0x79')]()?this[_0x1425d2('0x10')]():_0x2f5948[_0x1425d2('0x2f4')][_0x1425d2('0x20b')][_0x1425d2('0x2e3')](this);}}else _0x286724=_0x286724+Math[_0x10d597('0x2ae')]((_0x596266-_0x438a45['width'])/0x2);}else{if(_0x1032a7===_0x10d597('0x184')){if(_0x10d597('0x263')!==_0x10d597('0x352'))_0x286724=_0x286724+_0x596266-_0x438a45['width'];else{function _0x348a6c(){const _0x224a25=_0x10d597;_0x3c37f5['playEquip']();const _0xc6609b=_0x259e2f[_0x224a25('0x80')][_0x224a25('0x17a')];_0xc6609b[_0x224a25('0x2ba')](this[_0x224a25('0x2ca')](),null),this[_0x224a25('0x41c')](),this['_itemWindow'][_0x224a25('0x41c')]();}}}}_0x5197e9+=(this[_0x10d597('0x3db')]()-_0x438a45[_0x10d597('0x16e')])/0x2,this[_0x10d597('0x2d6')](_0x1404b9,_0x286724,_0x5197e9,_0x596266),this[_0x10d597('0x40')]=undefined,this[_0x10d597('0xf')]=undefined,this[_0x10d597('0x23a')]();},Window_ShopStatus['prototype'][_0x507ed6('0x2ab')]=function(_0x31d5df,_0x565597,_0x272bd6){const _0x207a78=_0x507ed6;if(!DataManager[_0x207a78('0x1c2')](this[_0x207a78('0xfe')]))return![];const _0x70f44f=this['getItemConsumableLabel']();this[_0x207a78('0x23b')](_0x70f44f,_0x31d5df,_0x565597,_0x272bd6,!![]);const _0x531f17=this['getItemConsumableText']();return this[_0x207a78('0x23b')](_0x531f17,_0x31d5df,_0x565597,_0x272bd6,![],_0x207a78('0x184')),this['drawItemDarkRect'](_0x31d5df,_0x565597,_0x272bd6),this[_0x207a78('0x23a')](),!![];},Window_ShopStatus[_0x507ed6('0x145')]['getItemConsumableLabel']=function(){const _0x2c5464=_0x507ed6;return VisuMZ[_0x2c5464('0x2f4')]['Settings']['StatusWindow'][_0x2c5464('0x54')];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x118')]=function(){const _0x3efc98=_0x507ed6,_0x2949ad=_0x3efc98('0xdb');if(this[_0x3efc98('0x104')][_0x2949ad])return this[_0x3efc98('0x104')][_0x2949ad];if(this[_0x3efc98('0x264')]())return VisuMZ['ItemsEquipsCore'][_0x3efc98('0x227')]['StatusWindow'][_0x3efc98('0x2ce')];else{if('clScO'===_0x3efc98('0x2b6'))return VisuMZ['ItemsEquipsCore']['Settings'][_0x3efc98('0x1eb')]['NotConsumable'];else{function _0x49d3d2(){const _0x497d8f=_0x3efc98,_0x32ff73=this[_0x497d8f('0x195')](),_0x28e2b4=_0x1508b3[_0x497d8f('0x2f4')][_0x497d8f('0x227')][_0x497d8f('0x14b')]['CmdIconCancel'],_0x4d54cc=_0x3a9e14[_0x497d8f('0x2f4')][_0x497d8f('0x227')][_0x497d8f('0x14b')]['CmdCancelRename'],_0xee6355=_0x32ff73==='text'?_0x4d54cc:_0x497d8f('0x38e')[_0x497d8f('0x148')](_0x28e2b4,_0x4d54cc);this[_0x497d8f('0x2cc')](_0xee6355,_0x497d8f('0x403'));}}}},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x264')]=function(){const _0x419249=_0x507ed6;if(VisuMZ[_0x419249('0x19c')]&&VisuMZ[_0x419249('0x19c')]['Settings']['QoL'][_0x419249('0x2aa')]&&DataManager['isKeyItem'](this[_0x419249('0xfe')]))return![];else{if(_0x419249('0x11')===_0x419249('0x11'))return this[_0x419249('0xfe')][_0x419249('0x96')];else{function _0x3ca9e1(){const _0x279d15=_0x419249;this[_0x279d15('0x423')](_0x3c8207);}}}},Window_ShopStatus['prototype']['drawItemQuantity']=function(_0x290ac9,_0xf8e576,_0x34c497){const _0x15a38c=_0x507ed6;if(!this[_0x15a38c('0x323')]()&&!DataManager[_0x15a38c('0x1c2')](this[_0x15a38c('0xfe')]))return![];if(DataManager[_0x15a38c('0xa1')](this['_item'])&&!$dataSystem['optKeyItemsNumber']){if(_0x15a38c('0x273')===_0x15a38c('0x36d')){function _0x3ffcaa(){return this['slotWindowRect']();}}else{const _0xde3323=TextManager[_0x15a38c('0x304')];this[_0x15a38c('0x23b')](_0xde3323,_0x290ac9,_0xf8e576,_0x34c497,!![],_0x15a38c('0x0'));}}else{if(_0x15a38c('0x4')==='ydaQS'){const _0x58d7fc=TextManager[_0x15a38c('0x316')];this[_0x15a38c('0x23b')](_0x58d7fc,_0x290ac9,_0xf8e576,_0x34c497,!![]);const _0x4cf746=this['getItemQuantityText']();this[_0x15a38c('0x23b')](_0x4cf746,_0x290ac9,_0xf8e576,_0x34c497,![],_0x15a38c('0x184'));}else{function _0x47d7a8(){const _0x5b4b14=_0x15a38c,_0x1161ce=_0x160397[_0x5b4b14('0x80')],_0x5195bc=[_0x1661c1,_0x33d164];return _0x5195bc[_0x5b4b14('0x1c6')](_0x1161ce[_0x5b4b14('0x16d')]);}}}return this['drawItemDarkRect'](_0x290ac9,_0xf8e576,_0x34c497),this[_0x15a38c('0x23a')](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x201')]=function(){const _0x32cfc7=_0x507ed6,_0x6a55e1=_0x32cfc7('0x1c8');if(this[_0x32cfc7('0x104')][_0x6a55e1])return this['_customItemInfo'][_0x6a55e1];const _0x408265=VisuMZ['ItemsEquipsCore']['Settings']['ItemScene']['ItemQuantityFmt'];return _0x408265[_0x32cfc7('0x148')]($gameParty['numItems'](this['_item']));},Window_ShopStatus['prototype'][_0x507ed6('0x411')]=function(_0x2b2c85,_0x38448f,_0xc011e0){const _0x59647b=_0x507ed6,_0x4656be=this[_0x59647b('0x42e')]();return this[_0x59647b('0x23b')](_0x4656be,_0x2b2c85,_0x38448f,_0xc011e0,![],'center'),this[_0x59647b('0x15b')](_0x2b2c85,_0x38448f,_0xc011e0),this[_0x59647b('0x23a')](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x42e')]=function(){const _0x20b7de=_0x507ed6,_0x57b6be=_0x20b7de('0x153');if(this[_0x20b7de('0x104')][_0x57b6be])return this['_customItemInfo'][_0x57b6be];const _0x169a02=VisuMZ[_0x20b7de('0x2f4')][_0x20b7de('0x227')]['StatusWindow'],_0x1f916a=_0x20b7de('0x2b2')[_0x20b7de('0x148')](this[_0x20b7de('0xfe')][_0x20b7de('0x49')]);return _0x169a02[_0x1f916a];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x102')]=function(_0xcb2cf6,_0x48a175,_0x2ca673){const _0x448ef4=_0x507ed6,_0x465233=this['getItemScopeText']();return this[_0x448ef4('0x23b')](_0x465233,_0xcb2cf6,_0x48a175,_0x2ca673,![],'center'),this[_0x448ef4('0x15b')](_0xcb2cf6,_0x48a175,_0x2ca673),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x2f')]=function(){const _0x11077d=_0x507ed6,_0x1ffc65=_0x11077d('0xac');if(this[_0x11077d('0x104')][_0x1ffc65])return this[_0x11077d('0x104')][_0x1ffc65];const _0x495011=VisuMZ['ItemsEquipsCore'][_0x11077d('0x227')][_0x11077d('0x1eb')];if(Imported[_0x11077d('0x61')]){const _0x1e49fb=this[_0x11077d('0xfe')][_0x11077d('0x170')];if(_0x1e49fb[_0x11077d('0x26d')](/<TARGET:[ ](.*)>/i)){if(_0x11077d('0x428')===_0x11077d('0x3e1')){function _0x9f3aaf(){return'text';}}else{const _0x1dfbfc=String(RegExp['$1']);if(_0x1dfbfc[_0x11077d('0x26d')](/(\d+) RANDOM ANY/i)){if(_0x11077d('0x120')!==_0x11077d('0x120')){function _0xed7809(){const _0x381775=_0x11077d;return _0x37131a[_0x381775('0x422')];}}else return _0x495011[_0x11077d('0x404')][_0x11077d('0x148')](Number(RegExp['$1']));}else{if(_0x1dfbfc[_0x11077d('0x26d')](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){if(_0x11077d('0x41d')!==_0x11077d('0x31d'))return _0x495011[_0x11077d('0x2f1')]['format'](Number(RegExp['$1']));else{function _0x55de02(){const _0x280190=_0x11077d,_0x5918af=this[_0x280190('0xdc')]();this[_0x280190('0x23b')](_0x5918af,_0x44b9b1,_0xb7c105,_0x40e69b,!![]),this[_0x280190('0x1e')]();const _0x352427=this[_0x280190('0x28e')](),_0x2d8f36=_0x2ca7e1[_0x280190('0xb6')]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x280190('0xfe')][_0x280190('0x8e')][_0x280190('0x33e')]]);return this[_0x280190('0x33b')](_0x2d8f36),this['drawItemKeyData'](_0x352427,_0x3b96e3,_0x840bc2,_0x11909a,![],_0x280190('0x184')),this[_0x280190('0x15b')](_0x3b1347,_0x19ce61,_0x2207a7),this[_0x280190('0x23a')](),!![];}}}else{if(_0x1dfbfc[_0x11077d('0x26d')](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x495011[_0x11077d('0x333')]['format'](Number(RegExp['$1']));else{if(_0x1dfbfc[_0x11077d('0x26d')](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x11077d('0x396')===_0x11077d('0x396'))return _0x495011[_0x11077d('0x83')];else{function _0x461f39(){const _0xbf3b7f=_0x11077d;if(_0x2240c8[_0xbf3b7f('0xd6')]()!==_0x525777['versionId'])for(const _0x2bee32 of _0x33b6b9[_0xbf3b7f('0x3d2')]){if(_0x2bee32)_0x2bee32[_0xbf3b7f('0x28c')]();}}}}}}}}}}const _0x30c35d=_0x11077d('0x32b')['format'](this[_0x11077d('0xfe')][_0x11077d('0x388')]);return _0x495011[_0x30c35d];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x276')]=function(_0x32e972,_0x59a4b0,_0x4de8b1){const _0x7549ca=_0x507ed6,_0x327dc1=this[_0x7549ca('0x3b5')]();this[_0x7549ca('0x23b')](_0x327dc1,_0x32e972,_0x59a4b0,_0x4de8b1,!![]);const _0x31871e=this['getItemSpeedText']();return this[_0x7549ca('0x23b')](_0x31871e,_0x32e972,_0x59a4b0,_0x4de8b1,![],_0x7549ca('0x184')),this[_0x7549ca('0x15b')](_0x32e972,_0x59a4b0,_0x4de8b1),this[_0x7549ca('0x23a')](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x3b5')]=function(){const _0x44d5d7=_0x507ed6;return VisuMZ['ItemsEquipsCore']['Settings'][_0x44d5d7('0x1eb')]['LabelSpeed'];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x140')]=function(){const _0x56ff9e=_0x507ed6,_0x26a2c3='SPEED';if(this[_0x56ff9e('0x104')][_0x26a2c3])return this[_0x56ff9e('0x104')][_0x26a2c3];const _0x3290ad=this[_0x56ff9e('0xfe')][_0x56ff9e('0xfb')];if(_0x3290ad>=0x7d0){if(_0x56ff9e('0x14')==='npDyr')return VisuMZ[_0x56ff9e('0x2f4')][_0x56ff9e('0x227')][_0x56ff9e('0x1eb')][_0x56ff9e('0x2f8')];else{function _0x23c211(){const _0x24d578=_0x56ff9e;return _0x41a6a3['ItemsEquipsCore'][_0x24d578('0x227')][_0x24d578('0x36b')][_0x24d578('0x97')];}}}else{if(_0x3290ad>=0x3e8){if(_0x56ff9e('0x35')===_0x56ff9e('0x347')){function _0x31a4ae(){const _0x4945e9=_0x56ff9e;this[_0x4945e9('0x318')](_0x5208bf+_0x3683c4,_0xe7761a,_0x15c04b,_0x5b4c9b,![]);}}else return VisuMZ['ItemsEquipsCore']['Settings'][_0x56ff9e('0x1eb')]['Speed1000'];}else{if(_0x3290ad>0x0)return VisuMZ[_0x56ff9e('0x2f4')]['Settings'][_0x56ff9e('0x1eb')]['Speed1'];else{if(_0x3290ad===0x0)return VisuMZ[_0x56ff9e('0x2f4')]['Settings']['StatusWindow'][_0x56ff9e('0x22d')];else{if(_0x3290ad>-0x3e8)return VisuMZ[_0x56ff9e('0x2f4')][_0x56ff9e('0x227')]['StatusWindow']['SpeedNeg999'];else{if(_0x3290ad>-0x7d0)return VisuMZ[_0x56ff9e('0x2f4')][_0x56ff9e('0x227')][_0x56ff9e('0x1eb')][_0x56ff9e('0x31f')];else{if(_0x3290ad<=-0x7d0){if(_0x56ff9e('0x38')===_0x56ff9e('0x38'))return VisuMZ[_0x56ff9e('0x2f4')][_0x56ff9e('0x227')][_0x56ff9e('0x1eb')]['SpeedNeg2000'];else{function _0x27fc7e(){const _0x506790=_0x56ff9e;_0x1516d6[_0x506790('0x305')](_0x506790('0x416'))&&this[_0x506790('0x20')](),_0x27a980[_0x506790('0x305')](_0x506790('0xab'))&&this['cursorPageup']();}}}else return'?????';}}}}}}},Window_ShopStatus[_0x507ed6('0x145')]['drawItemSuccessRate']=function(_0xd221df,_0xf36786,_0x489241){const _0x5ab49d=_0x507ed6,_0x375e29=this[_0x5ab49d('0x160')]();this[_0x5ab49d('0x23b')](_0x375e29,_0xd221df,_0xf36786,_0x489241,!![]);const _0x1a9559=this[_0x5ab49d('0x199')]();return this[_0x5ab49d('0x23b')](_0x1a9559,_0xd221df,_0xf36786,_0x489241,![],'right'),this['drawItemDarkRect'](_0xd221df,_0xf36786,_0x489241),this[_0x5ab49d('0x23a')](),!![];},Window_ShopStatus['prototype'][_0x507ed6('0x160')]=function(){const _0x15c763=_0x507ed6;return VisuMZ[_0x15c763('0x2f4')][_0x15c763('0x227')][_0x15c763('0x1eb')][_0x15c763('0x233')];},Window_ShopStatus['prototype']['getItemSuccessRateText']=function(){const _0x38d02c=_0x507ed6,_0x22fd4c='SUCCESS\x20RATE';if(this['_customItemInfo'][_0x22fd4c])return this[_0x38d02c('0x104')][_0x22fd4c];if(Imported[_0x38d02c('0x61')]){const _0x76f977=this[_0x38d02c('0xfe')]['note'];if(_0x76f977[_0x38d02c('0x26d')](/<ALWAYS HIT>/i)){if(_0x38d02c('0x389')!==_0x38d02c('0x3d7'))return _0x38d02c('0x394');else{function _0x2b56c6(){const _0x405801=_0x38d02c;_0x4292ad['prototype'][_0x405801('0x278')][_0x405801('0x2e3')](this);}}}else{if(_0x76f977['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x38d02c('0xa6')[_0x38d02c('0x148')](Number(RegExp['$1']));}}return _0x38d02c('0xa6')[_0x38d02c('0x148')](this[_0x38d02c('0xfe')][_0x38d02c('0x2b5')]);},Window_ShopStatus['prototype'][_0x507ed6('0x1aa')]=function(_0x294e09,_0x4ddc62,_0x1604d1){const _0x5b63d2=_0x507ed6,_0x5120b7=this[_0x5b63d2('0x3ed')]();this[_0x5b63d2('0x23b')](_0x5120b7,_0x294e09,_0x4ddc62,_0x1604d1,!![]);const _0x13cd7d=this[_0x5b63d2('0x48')]();return this['drawItemKeyData'](_0x13cd7d,_0x294e09,_0x4ddc62,_0x1604d1,![],_0x5b63d2('0x184')),this['drawItemDarkRect'](_0x294e09,_0x4ddc62,_0x1604d1),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x3ed')]=function(){const _0x461e10=_0x507ed6;return VisuMZ[_0x461e10('0x2f4')]['Settings'][_0x461e10('0x1eb')][_0x461e10('0x425')];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x48')]=function(){const _0x467681=_0x507ed6,_0x688371=_0x467681('0x300');if(this[_0x467681('0x104')][_0x688371])return this[_0x467681('0x104')][_0x688371];const _0x31559b=_0x467681('0x249');return _0x31559b[_0x467681('0x148')](this['_item'][_0x467681('0x431')]);},Window_ShopStatus['prototype'][_0x507ed6('0x86')]=function(_0x2ed199,_0x17958c,_0x2b0042){const _0x219ba8=_0x507ed6,_0x32cc77=this[_0x219ba8('0x123')]();this[_0x219ba8('0x23b')](_0x32cc77,_0x2ed199,_0x17958c,_0x2b0042,!![]);const _0x259e75=this[_0x219ba8('0x2ac')]();return this['drawItemKeyData'](_0x259e75,_0x2ed199,_0x17958c,_0x2b0042,![],_0x219ba8('0x184')),this[_0x219ba8('0x15b')](_0x2ed199,_0x17958c,_0x2b0042),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x507ed6('0x123')]=function(){const _0x37f149=_0x507ed6;return VisuMZ[_0x37f149('0x2f4')]['Settings'][_0x37f149('0x1eb')]['LabelHitType'];},Window_ShopStatus['prototype'][_0x507ed6('0x2ac')]=function(){const _0x3c2ec9=_0x507ed6,_0x3bb71e='HIT\x20TYPE';if(this[_0x3c2ec9('0x104')][_0x3bb71e])return this[_0x3c2ec9('0x104')][_0x3bb71e];const _0x26d6a2=VisuMZ[_0x3c2ec9('0x2f4')][_0x3c2ec9('0x227')][_0x3c2ec9('0x1eb')],_0x411349=_0x3c2ec9('0x3f1')[_0x3c2ec9('0x148')](this[_0x3c2ec9('0xfe')]['hitType']);return _0x26d6a2[_0x411349];},Window_ShopStatus[_0x507ed6('0x145')]['drawItemDamage']=function(_0x226715,_0x2d3db3,_0x51fbfb){const _0x592560=_0x507ed6;if(this[_0x592560('0xfe')][_0x592560('0x8e')][_0x592560('0x33e')]<=0x0)return _0x2d3db3;if(this['drawItemDamageElement'](_0x226715,_0x2d3db3,_0x51fbfb))_0x2d3db3+=this[_0x592560('0x3db')]();if(this['drawItemDamageAmount'](_0x226715,_0x2d3db3,_0x51fbfb))_0x2d3db3+=this['lineHeight']();return this[_0x592560('0x23a')](),_0x2d3db3;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x4d')]=function(_0x24a44e,_0x2a0458,_0x3a2c50){const _0x26fb7f=_0x507ed6,_0x15b16d=this['getItemDamageElementLabel']();this[_0x26fb7f('0x23b')](_0x15b16d,_0x24a44e,_0x2a0458,_0x3a2c50,!![]);const _0x465fe3=this[_0x26fb7f('0x342')]();return this[_0x26fb7f('0x23b')](_0x465fe3,_0x24a44e,_0x2a0458,_0x3a2c50,![],_0x26fb7f('0x184')),this[_0x26fb7f('0x15b')](_0x24a44e,_0x2a0458,_0x3a2c50),this[_0x26fb7f('0x23a')](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x313')]=function(){const _0x36c34d=_0x507ed6;return VisuMZ[_0x36c34d('0x2f4')][_0x36c34d('0x227')][_0x36c34d('0x1eb')][_0x36c34d('0x238')];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x342')]=function(){const _0x1f2632=_0x507ed6,_0x12914e=_0x1f2632('0x35f');if(this[_0x1f2632('0x104')][_0x12914e])return this['_customItemInfo'][_0x12914e];if(this[_0x1f2632('0xfe')]['damage'][_0x1f2632('0x113')]<=-0x1){if('dgIml'==='iMCDl'){function _0x46607b(){const _0x163fab=_0x1f2632;this['drawTextEx'](_0x364b4d,_0x40b243['x']+_0x26b844[_0x163fab('0x5d')]-_0x49f1f7,_0x43d074['y'],_0x3594e0);}}else return VisuMZ[_0x1f2632('0x2f4')][_0x1f2632('0x227')]['StatusWindow'][_0x1f2632('0x296')];}else{if(this[_0x1f2632('0xfe')][_0x1f2632('0x8e')][_0x1f2632('0x113')]===0x0)return VisuMZ[_0x1f2632('0x2f4')][_0x1f2632('0x227')]['StatusWindow']['ElementNone'];else{if(_0x1f2632('0x18b')!==_0x1f2632('0x18b')){function _0x300ebd(){const _0x48476e=_0x1f2632;this[_0x48476e('0x104')]={};if(!this['_item'])return;const _0x5382f2=this['_item']['note'];if(_0x5382f2[_0x48476e('0x26d')](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x202078=_0x32c03a(_0x3236a9['$1'])[_0x48476e('0x1b2')](/[\r\n]+/);for(const _0x508042 of _0x202078){if(_0x508042[_0x48476e('0x26d')](/(.*):[ ](.*)/i)){const _0xddc54c=_0xb3aad8(_0xe30582['$1'])[_0x48476e('0x215')]()['trim'](),_0x419b04=_0x5994c9(_0x502637['$2'])[_0x48476e('0x11a')]();this['_customItemInfo'][_0xddc54c]=_0x419b04;}}}}}else return $dataSystem['elements'][this[_0x1f2632('0xfe')][_0x1f2632('0x8e')][_0x1f2632('0x113')]];}}},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x413')]=function(_0x98d190,_0x3f3348,_0x2d69fc){const _0x5bbef9=_0x507ed6,_0x58647a=this[_0x5bbef9('0xdc')]();this[_0x5bbef9('0x23b')](_0x58647a,_0x98d190,_0x3f3348,_0x2d69fc,!![]),this[_0x5bbef9('0x1e')]();const _0x1241bc=this['getItemDamageAmountText'](),_0x3b8df9=ColorManager[_0x5bbef9('0xb6')]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x5bbef9('0xfe')]['damage']['type']]);return this[_0x5bbef9('0x33b')](_0x3b8df9),this[_0x5bbef9('0x23b')](_0x1241bc,_0x98d190,_0x3f3348,_0x2d69fc,![],'right'),this[_0x5bbef9('0x15b')](_0x98d190,_0x3f3348,_0x2d69fc),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0xdc')]=function(){const _0x4cfbcb=_0x507ed6;if(Imported[_0x4cfbcb('0x61')]&&DataManager[_0x4cfbcb('0x3bc')](this[_0x4cfbcb('0xfe')])!==_0x4cfbcb('0x22e'))return this[_0x4cfbcb('0x19b')]();else{if(_0x4cfbcb('0x29c')!==_0x4cfbcb('0x29c')){function _0x25e835(){const _0x1d58c0=_0x4cfbcb;if(!this[_0x1d58c0('0x323')]())return![];const _0x445ae7=_0x2578e3[_0x1d58c0('0x3bb')][this[_0x1d58c0('0xfe')][_0x1d58c0('0x18')]];return this[_0x1d58c0('0x23b')](_0x445ae7,_0x7a12c0,_0x2feaaf,_0x4a877a,!![]),this['drawItemDarkRect'](_0x5db5dd,_0x4060bd,_0x20e19d),this[_0x1d58c0('0x23a')](),!![];}}else return this[_0x4cfbcb('0x39a')]();}},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x39a')]=function(){const _0x4b89e3=_0x507ed6,_0x31bc43=VisuMZ[_0x4b89e3('0x2f4')]['Settings']['StatusWindow'],_0x10e6d8=_0x4b89e3('0x1c0')[_0x4b89e3('0x148')](this[_0x4b89e3('0xfe')]['damage'][_0x4b89e3('0x33e')]),_0x22f371=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x4b89e3('0xfe')][_0x4b89e3('0x8e')]['type']];return _0x31bc43[_0x10e6d8][_0x4b89e3('0x148')](_0x22f371);},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x1e')]=function(){const _0x5d9283=_0x507ed6,_0x1358f4=$gameActors[_0x5d9283('0x336')](0x1);this[_0x5d9283('0x29')]=JsonEx[_0x5d9283('0xa5')](_0x1358f4),this[_0x5d9283('0x355')]=JsonEx['makeDeepCopy'](_0x1358f4);},Window_ShopStatus['prototype'][_0x507ed6('0x28e')]=function(){const _0x24a70e=_0x507ed6,_0x2fc86b='DAMAGE\x20MULTIPLIER';if(this[_0x24a70e('0x104')][_0x2fc86b])return this[_0x24a70e('0x104')][_0x2fc86b];if(Imported[_0x24a70e('0x61')]&&DataManager[_0x24a70e('0x3bc')](this[_0x24a70e('0xfe')])!==_0x24a70e('0x22e'))return this[_0x24a70e('0x1d7')]();else{if('kBFpv'!=='UFfxe')return this[_0x24a70e('0x414')]();else{function _0x492aba(){const _0x1a7624=_0x24a70e;this[_0x1a7624('0x20')]();}}}},Window_ShopStatus['prototype']['getItemDamageAmountTextOriginal']=function(){const _0x4fdbf4=_0x507ed6;window['a']=this[_0x4fdbf4('0x29')],window['b']=this[_0x4fdbf4('0x355')],this[_0x4fdbf4('0x29')]['setShopStatusWindowMode'](!![]),this[_0x4fdbf4('0x355')][_0x4fdbf4('0x1f1')]([0x3,0x4][_0x4fdbf4('0x1c6')](this[_0x4fdbf4('0xfe')][_0x4fdbf4('0x8e')][_0x4fdbf4('0x33e')]));let _0x576c57=this[_0x4fdbf4('0xfe')][_0x4fdbf4('0x8e')][_0x4fdbf4('0xa9')];try{if(_0x4fdbf4('0x1db')===_0x4fdbf4('0x188')){function _0x413ced(){const _0x3ad1cf=_0x4fdbf4;_0x411486[_0x3ad1cf('0x2f4')][_0x3ad1cf('0x334')][_0x3ad1cf('0x2e3')](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x3ad1cf('0x2ea')](),this[_0x3ad1cf('0x244')]()&&(this[_0x3ad1cf('0x3c4')][_0x3ad1cf('0x1d5')](0x0),this[_0x3ad1cf('0x259')]());}}else{const _0x2647ca=Math['max'](eval(_0x576c57),0x0)/window['a'][_0x4fdbf4('0x220')];this[_0x4fdbf4('0x5a')]();if(isNaN(_0x2647ca))return'?????';else{if(_0x4fdbf4('0xc5')===_0x4fdbf4('0x27c')){function _0x14613b(){const _0x5df865=_0x4fdbf4;_0x3390fb[_0x5df865('0x146')](_0x136606[_0x11d7dc]);}}else return'%1%'[_0x4fdbf4('0x148')](Math[_0x4fdbf4('0x2eb')](_0x2647ca*0x64));}}}catch(_0x210ef4){if(_0x4fdbf4('0x30')===_0x4fdbf4('0x257')){function _0x4762e6(){const _0x4adaa7=_0x4fdbf4;if(_0x417a20[_0x4adaa7('0xd8')](_0x58be48))return![];}}else return $gameTemp[_0x4fdbf4('0x3e6')]()&&(console[_0x4fdbf4('0x17e')]('Damage\x20Formula\x20Error\x20for\x20%1'['format'](this[_0x4fdbf4('0xfe')][_0x4fdbf4('0x251')])),console['log'](_0x210ef4)),this[_0x4fdbf4('0x5a')](),_0x4fdbf4('0x1a8');}},Window_ShopStatus[_0x507ed6('0x145')]['revertGlobalNamespaceVariables']=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x32a')]=function(_0x5519e9,_0x10f368,_0x4a7770){const _0x182e46=_0x507ed6;if(!this[_0x182e46('0x27b')]())return _0x10f368;if(this[_0x182e46('0x311')](_0x5519e9,_0x10f368,_0x4a7770))_0x10f368+=this[_0x182e46('0x3db')]();if(this[_0x182e46('0xb5')](_0x5519e9,_0x10f368,_0x4a7770))_0x10f368+=this[_0x182e46('0x3db')]();if(this[_0x182e46('0x1b6')](_0x5519e9,_0x10f368,_0x4a7770))_0x10f368+=this['lineHeight']();if(this[_0x182e46('0x2c1')](_0x5519e9,_0x10f368,_0x4a7770))_0x10f368+=this[_0x182e46('0x3db')]();if(this[_0x182e46('0x2d7')](_0x5519e9,_0x10f368,_0x4a7770))_0x10f368+=this['lineHeight']();if(this[_0x182e46('0x29a')](_0x5519e9,_0x10f368,_0x4a7770))_0x10f368+=this[_0x182e46('0x3db')]();if(this[_0x182e46('0x91')](_0x5519e9,_0x10f368,_0x4a7770))_0x10f368+=this[_0x182e46('0x3db')]();if(this[_0x182e46('0x20e')](_0x5519e9,_0x10f368,_0x4a7770))_0x10f368+=this[_0x182e46('0x3db')]();if(this[_0x182e46('0x424')](_0x5519e9,_0x10f368,_0x4a7770))_0x10f368+=this[_0x182e46('0x3db')]();return this['resetFontSettings'](),_0x10f368;},Window_ShopStatus[_0x507ed6('0x145')]['makeItemData']=function(){const _0x4ad3e1=_0x507ed6;let _0x118309=![];this[_0x4ad3e1('0x328')]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x1895fb of this[_0x4ad3e1('0xfe')][_0x4ad3e1('0xb2')]){if(_0x4ad3e1('0x223')===_0x4ad3e1('0x274')){function _0x2a7c41(){const _0xcd32d3=_0x4ad3e1;_0x25d53f[_0xcd32d3('0x145')][_0xcd32d3('0x275')]['call'](this),this[_0xcd32d3('0x1a4')]();}}else switch(_0x1895fb[_0x4ad3e1('0x1d9')]){case Game_Action[_0x4ad3e1('0x437')]:this[_0x4ad3e1('0x328')][_0x4ad3e1('0x1ab')]+=_0x1895fb[_0x4ad3e1('0x171')],this[_0x4ad3e1('0x328')]['flatHP']+=_0x1895fb[_0x4ad3e1('0xf4')],_0x118309=!![];break;case Game_Action['EFFECT_RECOVER_MP']:this[_0x4ad3e1('0x328')][_0x4ad3e1('0x322')]+=_0x1895fb[_0x4ad3e1('0x171')],this[_0x4ad3e1('0x328')][_0x4ad3e1('0xde')]+=_0x1895fb[_0x4ad3e1('0xf4')],_0x118309=!![];break;case Game_Action[_0x4ad3e1('0x12d')]:this['_itemData']['gainTP']+=_0x1895fb[_0x4ad3e1('0x171')],_0x118309=!![];break;case Game_Action[_0x4ad3e1('0x1b7')]:this[_0x4ad3e1('0x328')]['addState'][_0x4ad3e1('0x146')](_0x1895fb[_0x4ad3e1('0x2b9')]),_0x118309=!![];break;case Game_Action[_0x4ad3e1('0x21b')]:this['_itemData'][_0x4ad3e1('0x43c')][_0x4ad3e1('0x146')](_0x1895fb[_0x4ad3e1('0x2b9')]),this[_0x4ad3e1('0x328')][_0x4ad3e1('0x260')]=!![],_0x118309=!![];break;case Game_Action[_0x4ad3e1('0x3f')]:this[_0x4ad3e1('0x328')][_0x4ad3e1('0x7a')][_0x1895fb['dataId']]+=0x1,_0x118309=!![];break;case Game_Action[_0x4ad3e1('0x2d5')]:this[_0x4ad3e1('0x328')][_0x4ad3e1('0x7a')][_0x1895fb[_0x4ad3e1('0x2b9')]]-=0x1,_0x118309=!![];break;case Game_Action[_0x4ad3e1('0x2c')]:this['_itemData']['removeBuff'][_0x4ad3e1('0x146')](_0x1895fb[_0x4ad3e1('0x2b9')]),this['_itemData'][_0x4ad3e1('0x260')]=!![],_0x118309=!![];break;case Game_Action[_0x4ad3e1('0x137')]:this[_0x4ad3e1('0x328')][_0x4ad3e1('0x1b1')]['push'](_0x1895fb[_0x4ad3e1('0x2b9')]),this[_0x4ad3e1('0x328')]['removeStateBuffChanges']=!![],_0x118309=!![];break;}}if(this[_0x4ad3e1('0x328')][_0x4ad3e1('0x19e')][_0x4ad3e1('0x2e')]>0x0)this[_0x4ad3e1('0x328')][_0x4ad3e1('0x2ec')]=!![];for(let _0x17b2ef=0x0;_0x17b2ef<this[_0x4ad3e1('0x328')][_0x4ad3e1('0x7a')][_0x4ad3e1('0x2e')];_0x17b2ef++){if(_0x4ad3e1('0x98')===_0x4ad3e1('0x98')){if(this['_itemData']['changeBuff'][_0x17b2ef]!==0x0)this['_itemData'][_0x4ad3e1('0x2ec')]=!![];}else{function _0x2bd721(){const _0xc4028c=_0x4ad3e1;this[_0xc4028c('0x27a')]();}}}if(this['_item'][_0x4ad3e1('0x112')]!==0x0){if('JvKOa'===_0x4ad3e1('0x267')){function _0xec74e8(){const _0xb52deb=_0x4ad3e1;return _0x13d96d[_0xb52deb('0x2f4')]['Settings'][_0xb52deb('0x1eb')][_0xb52deb('0x296')];}}else this[_0x4ad3e1('0x328')]['selfTP']=this[_0x4ad3e1('0xfe')]['tpGain'],_0x118309=!![];}const _0x820469=[_0x4ad3e1('0x279'),'MP\x20RECOVERY',_0x4ad3e1('0x415'),'HP\x20DAMAGE',_0x4ad3e1('0x44'),_0x4ad3e1('0x7e'),_0x4ad3e1('0x256'),_0x4ad3e1('0xe6'),_0x4ad3e1('0x319')];for(const _0x36c12b of _0x820469){if('LdJvY'===_0x4ad3e1('0x179')){function _0x3d2538(){return _0x1a14e9['uiHelpPosition'];}}else{if(this[_0x4ad3e1('0x104')][_0x36c12b]){_0x118309=!![];break;}}}return _0x118309;},Window_ShopStatus['prototype']['drawItemEffectsHpRecovery']=function(_0x29b0c0,_0x494b31,_0x468fc4){const _0x1f63c2=_0x507ed6,_0x513947=_0x1f63c2('0x279');if(this[_0x1f63c2('0x328')][_0x1f63c2('0x1ab')]<=0x0&&this[_0x1f63c2('0x328')][_0x1f63c2('0xfc')]<=0x0&&!this[_0x1f63c2('0x104')][_0x513947])return![];const _0x14b579=this[_0x1f63c2('0x37')]();this[_0x1f63c2('0x23b')](_0x14b579,_0x29b0c0,_0x494b31,_0x468fc4,!![]);const _0x22d06b=this[_0x1f63c2('0x12b')]();return this['changeTextColor'](ColorManager[_0x1f63c2('0xb6')](0x1)),this['drawItemKeyData'](_0x22d06b,_0x29b0c0,_0x494b31,_0x468fc4,![],_0x1f63c2('0x184')),this[_0x1f63c2('0x15b')](_0x29b0c0,_0x494b31,_0x468fc4),this[_0x1f63c2('0x23a')](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x37')]=function(){const _0x6b4b66=_0x507ed6,_0xd50f25=VisuMZ[_0x6b4b66('0x2f4')][_0x6b4b66('0x227')][_0x6b4b66('0x1eb')]['LabelRecoverHP'];return _0xd50f25['format'](TextManager['hp']);},Window_ShopStatus['prototype'][_0x507ed6('0x12b')]=function(){const _0x14c0a5=_0x507ed6,_0x551f65=_0x14c0a5('0x279');if(this[_0x14c0a5('0x104')][_0x551f65])return this[_0x14c0a5('0x104')][_0x551f65];let _0x45bba0='';if(this[_0x14c0a5('0x328')][_0x14c0a5('0x1ab')]>0x0)_0x45bba0+=_0x14c0a5('0x81')[_0x14c0a5('0x148')](Math[_0x14c0a5('0x2ae')](this[_0x14c0a5('0x328')][_0x14c0a5('0x1ab')]*0x64));if(this[_0x14c0a5('0x328')][_0x14c0a5('0x1ab')]>0x0&&this['_itemData'][_0x14c0a5('0xfc')]>0x0)_0x45bba0+='\x20';if(this[_0x14c0a5('0x328')][_0x14c0a5('0xfc')]>0x0)_0x45bba0+=_0x14c0a5('0x377')[_0x14c0a5('0x148')](this[_0x14c0a5('0x328')][_0x14c0a5('0xfc')]);return _0x45bba0;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0xb5')]=function(_0x48cb56,_0x310cc6,_0x4dfeb5){const _0x5d1447=_0x507ed6,_0x4dde59='MP\x20RECOVERY';if(this[_0x5d1447('0x328')][_0x5d1447('0x322')]<=0x0&&this[_0x5d1447('0x328')][_0x5d1447('0xde')]<=0x0&&!this[_0x5d1447('0x104')][_0x4dde59])return![];const _0x1623ad=this[_0x5d1447('0x3dc')]();this[_0x5d1447('0x23b')](_0x1623ad,_0x48cb56,_0x310cc6,_0x4dfeb5,!![]);const _0x428908=this['getItemEffectsMpRecoveryText']();return this[_0x5d1447('0x33b')](ColorManager[_0x5d1447('0xb6')](0x3)),this[_0x5d1447('0x23b')](_0x428908,_0x48cb56,_0x310cc6,_0x4dfeb5,![],'right'),this[_0x5d1447('0x15b')](_0x48cb56,_0x310cc6,_0x4dfeb5),this[_0x5d1447('0x23a')](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x3dc')]=function(){const _0x13148f=_0x507ed6,_0x5666ea=VisuMZ[_0x13148f('0x2f4')][_0x13148f('0x227')][_0x13148f('0x1eb')][_0x13148f('0x37f')];return _0x5666ea[_0x13148f('0x148')](TextManager['mp']);},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x3e2')]=function(){const _0x8aa2f1=_0x507ed6,_0x39de1b=_0x8aa2f1('0x33f');if(this[_0x8aa2f1('0x104')][_0x39de1b])return this[_0x8aa2f1('0x104')][_0x39de1b];let _0x29ff6f='';if(this[_0x8aa2f1('0x328')][_0x8aa2f1('0x322')]>0x0)_0x29ff6f+=_0x8aa2f1('0x81')['format'](Math['floor'](this[_0x8aa2f1('0x328')]['rateMP']*0x64));if(this[_0x8aa2f1('0x328')][_0x8aa2f1('0x322')]>0x0&&this[_0x8aa2f1('0x328')][_0x8aa2f1('0xde')]>0x0)_0x29ff6f+='\x20';if(this['_itemData'][_0x8aa2f1('0xde')]>0x0)_0x29ff6f+=_0x8aa2f1('0x377')[_0x8aa2f1('0x148')](this['_itemData'][_0x8aa2f1('0xde')]);return _0x29ff6f;},Window_ShopStatus['prototype'][_0x507ed6('0x1b6')]=function(_0x603c85,_0x3d2c40,_0x5a9fa1){const _0x27a09f=_0x507ed6,_0x266d77=_0x27a09f('0x415');if(this['_itemData'][_0x27a09f('0x252')]<=0x0&&!this[_0x27a09f('0x104')][_0x266d77])return![];const _0x30b8f0=this[_0x27a09f('0x42c')]();this[_0x27a09f('0x23b')](_0x30b8f0,_0x603c85,_0x3d2c40,_0x5a9fa1,!![]);const _0x25c89b=this[_0x27a09f('0x114')]();return this['changeTextColor'](ColorManager[_0x27a09f('0x3ae')]()),this['drawItemKeyData'](_0x25c89b,_0x603c85,_0x3d2c40,_0x5a9fa1,![],_0x27a09f('0x184')),this['drawItemDarkRect'](_0x603c85,_0x3d2c40,_0x5a9fa1),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x42c')]=function(){const _0x1cf2da=_0x507ed6,_0x541624=VisuMZ['ItemsEquipsCore']['Settings'][_0x1cf2da('0x1eb')][_0x1cf2da('0xb9')];return _0x541624[_0x1cf2da('0x148')](TextManager['tp']);},Window_ShopStatus['prototype'][_0x507ed6('0x114')]=function(){const _0x579415=_0x507ed6,_0x451f45=_0x579415('0x415');if(this[_0x579415('0x104')][_0x451f45])return this[_0x579415('0x104')][_0x451f45];let _0x233c66='';return _0x233c66+=_0x579415('0x377')['format'](this[_0x579415('0x328')][_0x579415('0x252')]),_0x233c66;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x91')]=function(_0x2499ba,_0x156ff9,_0x582df5){const _0x43328b=_0x507ed6,_0x3012fb='USER\x20TP\x20GAIN';if(this[_0x43328b('0x328')][_0x43328b('0x38c')]===0x0&&!this['_customItemInfo'][_0x3012fb])return![];const _0x182074=this[_0x43328b('0x3b')]();this[_0x43328b('0x23b')](_0x182074,_0x2499ba,_0x156ff9,_0x582df5,!![]);const _0x21b721=this[_0x43328b('0x1a2')]();return this[_0x43328b('0x328')][_0x43328b('0x38c')]>0x0?this['changeTextColor'](ColorManager[_0x43328b('0x3ae')]()):this[_0x43328b('0x33b')](ColorManager[_0x43328b('0x6f')]()),this[_0x43328b('0x23b')](_0x21b721,_0x2499ba,_0x156ff9,_0x582df5,![],_0x43328b('0x184')),this[_0x43328b('0x15b')](_0x2499ba,_0x156ff9,_0x582df5),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x507ed6('0x145')]['getItemEffectsSelfTpGainLabel']=function(){const _0x377759=_0x507ed6,_0x30e768=VisuMZ[_0x377759('0x2f4')][_0x377759('0x227')][_0x377759('0x1eb')][_0x377759('0x384')];return _0x30e768[_0x377759('0x148')](TextManager['tp']);},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x1a2')]=function(){const _0xe0c922=_0x507ed6,_0x276aa9=_0xe0c922('0x256');if(this['_customItemInfo'][_0x276aa9])return this[_0xe0c922('0x104')][_0x276aa9];let _0x1b3095='';if(this[_0xe0c922('0x328')][_0xe0c922('0x38c')]>0x0)_0x1b3095+=_0xe0c922('0x377')['format'](this[_0xe0c922('0x328')]['selfTP']);else{if(_0xe0c922('0x3b4')!=='STaeo'){function _0x3a7b60(){return![];}}else _0x1b3095+='%1'[_0xe0c922('0x148')](this[_0xe0c922('0x328')]['selfTP']);}return _0x1b3095;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x2c1')]=function(_0x4f7937,_0x5b1552,_0x2c5b97){const _0x5710fe=_0x507ed6,_0x318a74=_0x5710fe('0x161');if(this[_0x5710fe('0x328')][_0x5710fe('0x1ab')]>=0x0&&this[_0x5710fe('0x328')][_0x5710fe('0xfc')]>=0x0&&!this[_0x5710fe('0x104')][_0x318a74])return![];const _0x4aa3af=this[_0x5710fe('0x243')]();this[_0x5710fe('0x23b')](_0x4aa3af,_0x4f7937,_0x5b1552,_0x2c5b97,!![]);const _0xefda00=this['getItemEffectsHpDamageText']();return this[_0x5710fe('0x33b')](ColorManager[_0x5710fe('0xb6')](0x0)),this['drawItemKeyData'](_0xefda00,_0x4f7937,_0x5b1552,_0x2c5b97,![],_0x5710fe('0x184')),this[_0x5710fe('0x15b')](_0x4f7937,_0x5b1552,_0x2c5b97),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x243')]=function(){const _0x528b3a=_0x507ed6,_0x1b323b=VisuMZ[_0x528b3a('0x2f4')]['Settings']['StatusWindow'][_0x528b3a('0x149')];return _0x1b323b[_0x528b3a('0x148')](TextManager['hp']);},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x3a7')]=function(){const _0x158dcf=_0x507ed6,_0x44f54a='HP\x20DAMAGE';if(this[_0x158dcf('0x104')][_0x44f54a])return this[_0x158dcf('0x104')][_0x44f54a];let _0x40e44a='';if(this[_0x158dcf('0x328')][_0x158dcf('0x1ab')]<0x0)_0x40e44a+=_0x158dcf('0xa6')[_0x158dcf('0x148')](Math['floor'](this[_0x158dcf('0x328')][_0x158dcf('0x1ab')]*0x64));if(this[_0x158dcf('0x328')][_0x158dcf('0x1ab')]<0x0&&this[_0x158dcf('0x328')]['flatHP']<0x0)_0x40e44a+='\x20';if(this[_0x158dcf('0x328')][_0x158dcf('0xfc')]<0x0)_0x40e44a+='%1'[_0x158dcf('0x148')](this[_0x158dcf('0x328')][_0x158dcf('0xfc')]);return _0x40e44a;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x2d7')]=function(_0x2e640a,_0x2aa51b,_0x1aeeac){const _0x553cfb=_0x507ed6,_0x3acd1b=_0x553cfb('0x44');if(this[_0x553cfb('0x328')][_0x553cfb('0x322')]>=0x0&&this[_0x553cfb('0x328')][_0x553cfb('0xde')]>=0x0&&!this[_0x553cfb('0x104')][_0x3acd1b])return![];const _0x2cdcd5=this[_0x553cfb('0x38d')]();this[_0x553cfb('0x23b')](_0x2cdcd5,_0x2e640a,_0x2aa51b,_0x1aeeac,!![]);const _0x38175a=this[_0x553cfb('0x4a')]();return this['changeTextColor'](ColorManager[_0x553cfb('0xb6')](0x2)),this[_0x553cfb('0x23b')](_0x38175a,_0x2e640a,_0x2aa51b,_0x1aeeac,![],'right'),this[_0x553cfb('0x15b')](_0x2e640a,_0x2aa51b,_0x1aeeac),this[_0x553cfb('0x23a')](),!![];},Window_ShopStatus['prototype']['getItemEffectsMpDamageLabel']=function(){const _0x3af506=_0x507ed6,_0x32787d=VisuMZ[_0x3af506('0x2f4')][_0x3af506('0x227')][_0x3af506('0x1eb')][_0x3af506('0x2b')];return _0x32787d[_0x3af506('0x148')](TextManager['mp']);},Window_ShopStatus[_0x507ed6('0x145')]['getItemEffectsMpDamageText']=function(){const _0x275b47=_0x507ed6,_0x4432f4=_0x275b47('0x44');if(this[_0x275b47('0x104')][_0x4432f4])return this[_0x275b47('0x104')][_0x4432f4];let _0x1551e6='';if(this['_itemData'][_0x275b47('0x322')]<0x0)_0x1551e6+=_0x275b47('0xa6')[_0x275b47('0x148')](Math['floor'](this[_0x275b47('0x328')][_0x275b47('0x322')]*0x64));if(this['_itemData'][_0x275b47('0x322')]<0x0&&this['_itemData'][_0x275b47('0xde')]<0x0)_0x1551e6+='\x20';if(this[_0x275b47('0x328')]['flatMP']<0x0)_0x1551e6+='%1'['format'](this[_0x275b47('0x328')][_0x275b47('0xde')]);return _0x1551e6;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x29a')]=function(_0x52662c,_0x1a2a9d,_0x13de98){const _0x24ddc0=_0x507ed6,_0x584ef9=_0x24ddc0('0x7e');if(this[_0x24ddc0('0x328')]['gainTP']>=0x0&&!this[_0x24ddc0('0x104')][_0x584ef9])return![];const _0x59dfce=this[_0x24ddc0('0x12e')]();this[_0x24ddc0('0x23b')](_0x59dfce,_0x52662c,_0x1a2a9d,_0x13de98,!![]);const _0x3b83f6=this[_0x24ddc0('0x210')]();return this[_0x24ddc0('0x33b')](ColorManager['powerDownColor']()),this[_0x24ddc0('0x23b')](_0x3b83f6,_0x52662c,_0x1a2a9d,_0x13de98,![],_0x24ddc0('0x184')),this[_0x24ddc0('0x15b')](_0x52662c,_0x1a2a9d,_0x13de98),this[_0x24ddc0('0x23a')](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x12e')]=function(){const _0x511a4e=_0x507ed6,_0x304491=VisuMZ['ItemsEquipsCore'][_0x511a4e('0x227')]['StatusWindow'][_0x511a4e('0x62')];return _0x304491[_0x511a4e('0x148')](TextManager['tp']);},Window_ShopStatus['prototype'][_0x507ed6('0x210')]=function(){const _0x20a92d=_0x507ed6,_0x132e6b=_0x20a92d('0x7e');if(this['_customItemInfo'][_0x132e6b])return this[_0x20a92d('0x104')][_0x132e6b];let _0x400ce0='';return _0x400ce0+='%1'[_0x20a92d('0x148')](this['_itemData'][_0x20a92d('0x252')]),_0x400ce0;},Window_ShopStatus[_0x507ed6('0x145')]['drawItemEffectsAddedStatesBuffs']=function(_0x158e50,_0x312359,_0x3c42fb){const _0x53a617=_0x507ed6,_0x5429a6='ADDED\x20EFFECTS';if(!this['_itemData'][_0x53a617('0x2ec')]&&!this[_0x53a617('0x104')][_0x5429a6])return![];const _0x22438b=this[_0x53a617('0x1ec')]();this[_0x53a617('0x23b')](_0x22438b,_0x158e50,_0x312359,_0x3c42fb,!![]);const _0x23e342=this[_0x53a617('0xda')]();return this[_0x53a617('0x23b')](_0x23e342,_0x158e50,_0x312359,_0x3c42fb,![],_0x53a617('0x184')),this['drawItemDarkRect'](_0x158e50,_0x312359,_0x3c42fb),this[_0x53a617('0x23a')](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x1ec')]=function(){const _0x565020=_0x507ed6;return VisuMZ['ItemsEquipsCore']['Settings'][_0x565020('0x1eb')][_0x565020('0xa3')];},Window_ShopStatus[_0x507ed6('0x145')]['getItemEffectsAddedStatesBuffsText']=function(){const _0x296116=_0x507ed6,_0x2e84da=_0x296116('0xe6');if(this[_0x296116('0x104')][_0x2e84da])return this[_0x296116('0x104')][_0x2e84da];let _0x432e65='',_0x41a6f8=0x0;const _0x2ee3de=0x8;for(const _0x4970b5 of this[_0x296116('0x328')]['addState']){const _0x376ec2=$dataStates[_0x4970b5];if(_0x376ec2&&_0x376ec2[_0x296116('0x203')]>0x0){_0x432e65+='\x5cI[%1]'['format'](_0x376ec2[_0x296116('0x203')]),_0x41a6f8++;if(_0x41a6f8>=_0x2ee3de)return _0x432e65;}}for(let _0xd3a896=0x0;_0xd3a896<this[_0x296116('0x328')][_0x296116('0x7a')][_0x296116('0x2e')];_0xd3a896++){const _0x18be65=this['_itemData']['changeBuff'][_0xd3a896],_0x2942db=Game_BattlerBase[_0x296116('0x145')]['buffIconIndex'](_0x18be65,_0xd3a896);if(_0x2942db>0x0){if(_0x296116('0x3c')!=='ZNEaW'){_0x432e65+=_0x296116('0x1ad')[_0x296116('0x148')](_0x2942db),_0x41a6f8++;if(_0x41a6f8>=_0x2ee3de)return _0x432e65;}else{function _0x5309f3(){const _0xf4a598=_0x296116;_0x43e61e[_0xf4a598('0x2f4')][_0xf4a598('0x227')][_0xf4a598('0x1eb')]['DrawEquipData'][_0xf4a598('0x2e3')](this);}}}}return _0x432e65;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x424')]=function(_0x19c76b,_0x20ec38,_0x22b247){const _0x44ac13=_0x507ed6,_0x1fd94b=_0x44ac13('0x319');if(!this[_0x44ac13('0x328')]['removeStateBuffChanges']&&!this[_0x44ac13('0x104')][_0x1fd94b])return![];const _0x547806=this['getItemEffectsRemovedStatesBuffsLabel']();this[_0x44ac13('0x23b')](_0x547806,_0x19c76b,_0x20ec38,_0x22b247,!![]);const _0x3674c8=this['getItemEffectsRemovedStatesBuffsText']();return this['drawItemKeyData'](_0x3674c8,_0x19c76b,_0x20ec38,_0x22b247,![],_0x44ac13('0x184')),this[_0x44ac13('0x15b')](_0x19c76b,_0x20ec38,_0x22b247),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x127')]=function(){const _0x488318=_0x507ed6;return VisuMZ[_0x488318('0x2f4')][_0x488318('0x227')][_0x488318('0x1eb')]['LabelRemove'];},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x1f4')]=function(){const _0x4bc64c=_0x507ed6,_0x2a2b6c=_0x4bc64c('0x319');if(this[_0x4bc64c('0x104')][_0x2a2b6c])return this[_0x4bc64c('0x104')][_0x2a2b6c];let _0x4c8efb='',_0x3bc815=0x0;const _0x23c1c1=VisuMZ[_0x4bc64c('0x2f4')][_0x4bc64c('0x227')]['StatusWindow'][_0x4bc64c('0x5c')];for(const _0x562584 of this['_itemData'][_0x4bc64c('0x43c')]){const _0x522c2c=$dataStates[_0x562584];if(_0x522c2c&&_0x522c2c['iconIndex']>0x0){_0x4c8efb+=_0x4bc64c('0x1ad')[_0x4bc64c('0x148')](_0x522c2c[_0x4bc64c('0x203')]),_0x3bc815++;if(_0x3bc815>=_0x23c1c1)return _0x4c8efb;}}for(let _0x548d4e=0x0;_0x548d4e<this[_0x4bc64c('0x328')]['removeBuff'][_0x4bc64c('0x2e')];_0x548d4e++){const _0x4da52b=Game_BattlerBase['prototype'][_0x4bc64c('0x439')](0x1,_0x548d4e);if(_0x4da52b>0x0){if('blpgk'===_0x4bc64c('0x35a')){_0x4c8efb+=_0x4bc64c('0x1ad')[_0x4bc64c('0x148')](_0x4da52b),_0x3bc815++;if(_0x3bc815>=_0x23c1c1)return _0x4c8efb;}else{function _0xfc3d7b(){const _0x21c493=_0x4bc64c,_0x3cdab6=this['_commandNameWindow'],_0x2fd059=_0x1cd857[_0x21c493('0x3e4')](),_0xd9e157=_0x5160e8['x']+_0x401152[_0x21c493('0x2ae')](_0x3f80a8[_0x21c493('0x5d')]/0x2)+_0x2fd059;_0x3cdab6['x']=_0x3cdab6[_0x21c493('0x5d')]/-0x2+_0xd9e157,_0x3cdab6['y']=_0x14f17a[_0x21c493('0x2ae')](_0x5c9765['height']/0x2);}}}}for(let _0x14e6b4=0x0;_0x14e6b4<this[_0x4bc64c('0x328')][_0x4bc64c('0x1b1')]['length'];_0x14e6b4++){const _0x2a110e=Game_BattlerBase[_0x4bc64c('0x145')][_0x4bc64c('0x439')](-0x1,_0x14e6b4);if(_0x2a110e>0x0){_0x4c8efb+=_0x4bc64c('0x1ad')['format'](_0x2a110e),_0x3bc815++;if(_0x3bc815>=_0x23c1c1)return _0x4c8efb;}}return _0x4c8efb;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x2e0')]=function(_0x25eb87,_0x32c666,_0x5541a5){const _0xe3ed7c=_0x507ed6;if(this[_0xe3ed7c('0xfe')][_0xe3ed7c('0x170')][_0xe3ed7c('0x26d')](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x13bec9=String(RegExp['$1'])[_0xe3ed7c('0x1b2')](/[\r\n]+/);for(const _0x49f427 of _0x13bec9){if('NClBI'===_0xe3ed7c('0x191')){function _0x52fd94(){const _0x126537=_0xe3ed7c,_0x514405='ADDED\x20EFFECTS';if(!this[_0x126537('0x328')][_0x126537('0x2ec')]&&!this[_0x126537('0x104')][_0x514405])return![];const _0x288917=this[_0x126537('0x1ec')]();this[_0x126537('0x23b')](_0x288917,_0x400fac,_0x32f95a,_0x49dbfe,!![]);const _0x4ce7b5=this['getItemEffectsAddedStatesBuffsText']();return this[_0x126537('0x23b')](_0x4ce7b5,_0xb39ab6,_0x2047e6,_0x4661db,![],'right'),this[_0x126537('0x15b')](_0x32bff9,_0x4ee625,_0xfa80ab),this[_0x126537('0x23a')](),!![];}}else{if(_0x49f427[_0xe3ed7c('0x26d')](/(.*):[ ](.*)/i)){if(_0xe3ed7c('0x3c8')===_0xe3ed7c('0x3c8')){const _0x56246a=String(RegExp['$1'])[_0xe3ed7c('0x11a')](),_0x5c0006=String(RegExp['$2'])[_0xe3ed7c('0x11a')]();this[_0xe3ed7c('0x8a')](_0x56246a,_0x5c0006,_0x25eb87,_0x32c666,_0x5541a5),_0x32c666+=this[_0xe3ed7c('0x3db')]();}else{function _0x3bc72e(){const _0x2db509=_0xe3ed7c,_0x2d28ef=_0x2596a2[_0x2db509('0x2f4')][_0x2db509('0x227')][_0x2db509('0x1eb')][_0x2db509('0xb9')];return _0x2d28ef['format'](_0x52a30a['tp']);}}}}}}return this[_0xe3ed7c('0x23a')](),_0x32c666;},Window_ShopStatus[_0x507ed6('0x145')][_0x507ed6('0x8a')]=function(_0x25a146,_0x8b1338,_0x504ceb,_0xd4f94b,_0x477e25){const _0x14a100=_0x507ed6;this[_0x14a100('0x23b')](_0x25a146,_0x504ceb,_0xd4f94b,_0x477e25,!![]),this[_0x14a100('0x23b')](_0x8b1338,_0x504ceb,_0xd4f94b,_0x477e25,![],_0x14a100('0x184')),this[_0x14a100('0x15b')](_0x504ceb,_0xd4f94b,_0x477e25),this['resetFontSettings']();};