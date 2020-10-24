/*
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Welcome to the Simple Gathering System by Sn0wCrack, this script allows you
 * to create gathering events in which you players to search for resources using
 * tools (or not if you want!)
 *
 * Please see https://github.com/Sn0wCrack/SnowMV/blob/master/LICENSE for license
 * details.
 *
 * If you use this script, please give credit!
 *
 * ============================================================================
 * Setup
 * ============================================================================
 * In your items database you can tag any item (this means only normal items,
 * not weapons, armour, etc.) with the following tags:
 *
 * Havesting Tools:
 * THESE ARE PUT ON THE ITEMS YOU WANT TO USE TO HARVEST WITH IN THE NOTE TAG SECTION
 *
 * <Harvest Chance Boost: x%> - Not Required
 * This tag allows you to set an amount this particular item will boost
 * the chances of you finding items.
 *
 * <Harvest Chance>
 * itemId: percentage%
 * </Harvest Chance>
 *
 * You can set the chance for harvesting different materials for an item
 * by something like this:
 *    <Harvest Chance>
 *    7: 100%
 *  8: 10%
 * </Harvest Chance>
 *
 * <Chance Break>
 * </Chance Break>
 *
 * Same as above however the values are how often the item will break when
 * trying to harvest the resource.
 *
 * Harvestables:
 * THESE ARE PUT ON THE ITEMS YOU WANT TO BE GATHERED IN THE NOTE TAG SECTION
 *
 * <Harvest Minimum: x> - Required
 * The minimum amount of the item to be found upon the successful harvesting of
 * it.
 *
 * <Harvest Maximum: x> - Required
 * The maximum amount of the item to be found upon the successful harvesting of
 * it.
 *
 * Events:
 * THESE ARE PUT ON EVENTS (in the event editor page) YOU WANT TO RESPAWN IN THE NOTE TAG SECTION
 *
 * <Repspawn Time: x> - Required if you want respawing events (Requires OrangeTimeSystem)
 * Sets how long in hours you want the event to respawn in
 *
 * ============================================================================
 * Usage
 * ============================================================================
 * To call the script, create an event with a plugin command
 *        SnowGather  require tools [recieveable item ids] commonEventId this
 *
 * Replace require tools with true if you want the player to need tools to gather
 * items at this event, or false if you don't want them to use any tools on this
 * particular event spot.
 *
 * Recievable item ids is an array that you replace with something like [7,8]
 * please note how there are not spaces in this, keep it this way or it will not
 * function correctly. This sets the items taht you can get from this event.
 *
 * commonEventId is the id of the common event you want to run after selecting a tool
 * to harvest with. You may ignore this if you don't want to use it.
 *
 * this is well, always the word this, this is only required if you're using
 * a time system.
 *
 * Repsawning Events:
 *
 * In order for an event to actually despawn and then respawn after the allotted
 * time, you must first create second event page, on this page you just have to
 * have the self switch for "A" checked as a condition, leave everything else
 * blank.
 *
 */
//=============================================================================