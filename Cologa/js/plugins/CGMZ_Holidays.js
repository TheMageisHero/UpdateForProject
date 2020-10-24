/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/holidays/
 * @target MZ
 * @plugindesc Allows you to add weekly, monthly, or annual repeating events.
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.1
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: This plugin allows you to create daily, weekly, monthly, or
 * annual repeating events. It will turn a switch ON or OFF depending on if
 * the time is within the start/stop time set by you. Some uses may be daily
 * quests, christmas, or any other holiday.
 * ----------------------------------------------------------------------------
 * Documentation:
 * By default, the plugin checks each holiday every time a new map is entered.
 * If you require more frequent checking, you can do so via plugin command.
 *
 * The plugin command checks holidays if true. No functionality if false.
 *
 * Version History:
 * 1.0.0 - Initial Release
 *
 * 1.0.1:
 * - Fixed bug with plugin commands causing conflict with other CGMZ plugins
 *
 * @command Check Holidays
 * @text Check Holidays
 * @desc Checks holidays if true. No functionality if false
 *
 * @arg Check
 * @text Check
 * @type boolean
 * @on Check
 * @off No Functionality
 * @desc Whether to check if holidays for start/stop. No functionality if false
 * @default true
 *
 * @param Holidays
 *
 * @param Daily Events
 * @parent Holidays
 * @type struct<DailyEvent>[]
 * @default []
 * @desc Set up daily events here. These repeat once per day
 *
 * @param Weekly Events
 * @parent Holidays
 * @type struct<WeeklyEvent>[]
 * @default []
 * @desc Set up weekly events here. These repeat once per week
 *
 * @param Monthly Events
 * @parent Holidays
 * @type struct<MonthlyEvent>[]
 * @default []
 * @desc Set up monthly events here. These repeat once per month
 *
 * @param Annual Events
 * @parent Holidays
 * @type struct<AnnualEvent>[]
 * @default []
 * @desc Set up annual events here. These repeat once per month
*/
/*~struct~DailyEvent:
 * @param Switch
 * @type switch
 * @default 0
 * @desc Switch to turn on/off depending on event time.
 *
 * @param Start Hour
 * @type number
 * @min 0
 * @max 24
 * @default 0
 * @desc Hour of the event start/stop (24hr clock)
 *
 * @param End Hour
 * @type number
 * @min 0
 * @max 24
 * @default 0
 * @desc Hour of the event start/stop (24hr clock)
*/
/*~struct~WeeklyEvent:
 * @param Switch
 * @type switch
 * @default 0
 * @desc Switch to turn on/off depending on event time.
 *
 * @param Start
 * @type struct<WeekTime>
 * @default {"Week Day":"0","Hour":"0"}
 * @desc Weekday to start. Sunday = 0, Saturday = 6
 *
 * @param End
 * @type struct<WeekTime>
 * @default {"Week Day":"0","Hour":"0"}
 * @desc Weekday to stop. Sunday = 0, Saturday = 6
*/
/*~struct~WeekTime:
 * @param Week Day
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * @desc Weekday to start/stop. Sunday = 0, Saturday = 6
 *
 * @param Hour
 * @type number
 * @min 0
 * @max 23
 * @default 0
 * @desc Hour of the event start/stop (24hr clock)
*/
/*~struct~MonthlyEvent:
 * @param Switch
 * @type switch
 * @default 0
 * @desc Switch to turn on/off depending on event time.
 *
 * @param Start
 * @type struct<MonthlyTime>
 * @default {"Day":"1","Hour":"0"}
 * @desc Start time of the monthly event
 *
 * @param End
 * @type struct<MonthlyTime>
 * @default {"Day":"1","Hour":"0"}
 * @desc End time of the monthly event
*/
/*~struct~MonthlyTime:
 * @param Day
 * @type number
 * @min 1
 * @max 31
 * @default 1
 * @desc Day of the holiday start/stop
 *
 * @param Hour
 * @type number
 * @min 0
 * @max 23
 * @default 0
 * @desc Hour of the holiday start/stop (24hr clock)
*/
/*~struct~AnnualEvent:
 * @param Switch
 * @type switch
 * @default 0
 * @desc Switch to turn on/off depending on event time.
 *
 * @param Start
 * @type struct<AnnualTime>
 * @default {"Month":"1","Day":"1","Hour":"0"}
 * @desc End time of the annual event
 *
 * @param End
 * @type struct<AnnualTime>
 * @default {"Month":"1","Day":"1","Hour":"0"}
 * @desc Start time of the annual event
*/
/*~struct~AnnualTime:
 * @param Month
 * @type number
 * @min 1
 * @max 12
 * @default 1
 * @desc Month of the event start/stop
 *
 * @param Day
 * @type number
 * @min 1
 * @max 31
 * @default 1
 * @desc Day of the event start/stop
 *
 * @param Hour
 * @type number
 * @min 0
 * @max 23
 * @default 0
 * @desc Hour of the event start/stop (24hr clock)
*/
var Imported = Imported || {};
Imported.CGMZ_Holidays = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Holidays"] = "1.0.1";
CGMZ.Holidays = CGMZ.Holidays || {};
CGMZ.Holidays.parameters = PluginManager.parameters('CGMZ_Holidays');
CGMZ.Holidays.DailyEvents = JSON.parse(CGMZ.Holidays.parameters["Daily Events"]);
CGMZ.Holidays.WeeklyEvents = JSON.parse(CGMZ.Holidays.parameters["Weekly Events"]);
CGMZ.Holidays.MonthlyEvents = JSON.parse(CGMZ.Holidays.parameters["Monthly Events"]);
CGMZ.Holidays.AnnualEvents = JSON.parse(CGMZ.Holidays.parameters["Annual Events"]);
//=============================================================================
// CGMZ_Holiday
//-----------------------------------------------------------------------------
// Class that stores the data associated with holidays
//=============================================================================
function CGMZ_Holiday(holiday) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMZ_Holiday.prototype.initialize = function(holiday) {
	this._switchId = Number(holiday["Switch"]);
	this._active = false;
};
//-----------------------------------------------------------------------------
// Get the switch to toggle on/off
//-----------------------------------------------------------------------------
CGMZ_Holiday.prototype.getSwitch = function() {
	return this._switchId;
};
//-----------------------------------------------------------------------------
// Get current active/inactive status
//-----------------------------------------------------------------------------
CGMZ_Holiday.prototype.isActive = function() {
	return this._active;
};
//-----------------------------------------------------------------------------
// Set whether the holiday is active or not
//-----------------------------------------------------------------------------
CGMZ_Holiday.prototype.setActiveStatus = function(activeStatus) {
	if(activeStatus && !this.isActive()) {
		this.activate();
	}
	else if(!activeStatus && this.isActive()){
		this.deactivate();
	}
};
//-----------------------------------------------------------------------------
// Activate the Holiday
//-----------------------------------------------------------------------------
CGMZ_Holiday.prototype.activate = function() {
	this._active = true;
	$gameSwitches.setValue(this.getSwitch(), this._active);
};
//-----------------------------------------------------------------------------
// Deactivate the Holiday
//-----------------------------------------------------------------------------
CGMZ_Holiday.prototype.deactivate = function() {
	this._active = false;
	$gameSwitches.setValue(this.getSwitch(), this._active);
};
//-----------------------------------------------------------------------------
// Check time for the holiday, activate if ready, deactivate if not ready
//-----------------------------------------------------------------------------
CGMZ_Holiday.prototype.checkTime = function() {
	//
};
//=============================================================================
// CGMZ_DailyHoliday
//-----------------------------------------------------------------------------
// Class that represents a daily holiday
//=============================================================================
function CGMZ_DailyHoliday(holiday) {
    this.initialize.apply(this, arguments);
}
CGMZ_DailyHoliday.prototype = Object.create(CGMZ_Holiday.prototype);
CGMZ_DailyHoliday.prototype.constructor = CGMZ_DailyHoliday;
//-----------------------------------------------------------------------------
// Initialize Data for a daily event
//-----------------------------------------------------------------------------
CGMZ_DailyHoliday.prototype.initialize = function(holiday) {
	CGMZ_Holiday.prototype.initialize.call(this, holiday);
	this._startHour = Number(holiday["Start Hour"]);
	this._endHour = Number(holiday["End Hour"]);
};
//-----------------------------------------------------------------------------
// Check time for the holiday, activate if ready, deactivate if not ready
//-----------------------------------------------------------------------------
CGMZ_DailyHoliday.prototype.checkTime = function() {
	const currentTime = new Date();
	const currentHour = currentTime.getHours();
	const currentYear = currentTime.getFullYear();
	const currentMonth = currentTime.getMonth();
	const currentDay = currentTime.getDate();
	const startTime = new Date(currentYear, currentMonth, currentDay, this._startHour);
	const stopTime = new Date(currentYear, currentMonth, currentDay, this._endHour);
	this.setActiveStatus(currentTime > startTime && currentTime < stopTime);
};
//=============================================================================
// CGMZ_WeeklyHoliday
//-----------------------------------------------------------------------------
// Class that represents a weekly holiday
//=============================================================================
function CGMZ_WeeklyHoliday(holiday) {
    this.initialize.apply(this, arguments);
}
CGMZ_WeeklyHoliday.prototype = Object.create(CGMZ_Holiday.prototype);
CGMZ_WeeklyHoliday.prototype.constructor = CGMZ_WeeklyHoliday;
//-----------------------------------------------------------------------------
// Initialize Data for a weekly event
//-----------------------------------------------------------------------------
CGMZ_WeeklyHoliday.prototype.initialize = function(holiday) {
	CGMZ_Holiday.prototype.initialize.call(this, holiday);
	const start = JSON.parse(holiday["Start"]);
	const end = JSON.parse(holiday["End"]);
	this._startHour = Number(start["Hour"]);
	this._startWeekDay = Number(start["Week Day"]);
	this._endHour = Number(end["Hour"]);
	this._endWeekDay = Number(end["Week Day"]);
};
//-----------------------------------------------------------------------------
// Check time for the holiday, activate if ready, deactivate if not ready
//-----------------------------------------------------------------------------
CGMZ_WeeklyHoliday.prototype.checkTime = function() {
	const currentTime = new Date();
	const currentWeekday = currentTime.getDay();
	const currentHour = currentTime.getHours();
	if(currentWeekday >= this._startWeekDay && currentWeekday <= this._endWeekDay &&
	  (currentWeekday > this._startWeekDay || this._startHour <= currentHour) &&
	  (currentWeekday < this._endWeekDay || this._endHour > currentHour)) {
		this.setActiveStatus(true);
	} else {
		this.setActiveStatus(false);
	}
};
//=============================================================================
// CGMZ_WeeklyHoliday
//-----------------------------------------------------------------------------
// Class that represents a weekly holiday
//=============================================================================
function CGMZ_MonthlyHoliday(holiday) {
    this.initialize.apply(this, arguments);
}
CGMZ_MonthlyHoliday.prototype = Object.create(CGMZ_Holiday.prototype);
CGMZ_MonthlyHoliday.prototype.constructor = CGMZ_MonthlyHoliday;
//-----------------------------------------------------------------------------
// Initialize Data for a monthly event
//-----------------------------------------------------------------------------
CGMZ_MonthlyHoliday.prototype.initialize = function(holiday) {
	CGMZ_Holiday.prototype.initialize.call(this, holiday);
	const start = JSON.parse(holiday["Start"]);
	const end = JSON.parse(holiday["End"]);
	this._startHour = Number(start["Hour"]);
	this._startDay = Number(start["Day"]);
	this._endHour = Number(end["Hour"]);
	this._endDay = Number(end["Day"]);
};
//-----------------------------------------------------------------------------
// Check time for the holiday, activate if ready, deactivate if not ready
//-----------------------------------------------------------------------------
CGMZ_MonthlyHoliday.prototype.checkTime = function() {
	const currentTime = new Date();
	const currentYear = currentTime.getFullYear();
	const currentMonth = currentTime.getMonth();
	const startDate = new Date(currentYear, currentMonth, this._startDay, this._startHour);
	const stopDate = new Date(currentYear, currentMonth, this._endDay, this._endHour);
	this.setActiveStatus(currentTime > startDate && currentTime < stopDate);
};
//=============================================================================
// CGMZ_AnnualHoliday
//-----------------------------------------------------------------------------
// Class that represents an annual holiday
//=============================================================================
function CGMZ_AnnualHoliday(holiday) {
    this.initialize.apply(this, arguments);
}
CGMZ_AnnualHoliday.prototype = Object.create(CGMZ_Holiday.prototype);
CGMZ_AnnualHoliday.prototype.constructor = CGMZ_AnnualHoliday;
//-----------------------------------------------------------------------------
// Initialize Data for an annual event
//-----------------------------------------------------------------------------
CGMZ_AnnualHoliday.prototype.initialize = function(holiday) {
	CGMZ_Holiday.prototype.initialize.call(this, holiday);
	const start = JSON.parse(holiday["Start"]);
	const end = JSON.parse(holiday["End"]);
	this._startHour = Number(start["Hour"]);
	this._startDay = Number(start["Day"]);
	this._startMonth = Number(start["Month"]) - 1;
	this._endHour = Number(end["Hour"]);
	this._endDay = Number(end["Day"]);
	this._endMonth = Number(end["Month"]) - 1;
};
//-----------------------------------------------------------------------------
// Check time for the holiday, activate if ready, deactivate if not ready
//-----------------------------------------------------------------------------
CGMZ_AnnualHoliday.prototype.checkTime = function() {
	const currentTime = new Date();
	const currentYear = currentTime.getFullYear();
	const startDate = new Date(currentYear, this._startMonth, this._startDay, this._startHour);
	const stopDate = new Date(currentYear, this._endMonth, this._endDay, this._endHour);
	this.setActiveStatus(currentTime > startDate && currentTime < stopDate);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Create holiday data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Create Region Switch data
//-----------------------------------------------------------------------------
const alias_CGMZ_Holidays_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_Holidays_createPluginData.call(this);
	this._holidays = [];
	for(let i = 0; i < CGMZ.Holidays.DailyEvents.length; i++) {
		const holiday = new CGMZ_DailyHoliday(JSON.parse(CGMZ.Holidays.DailyEvents[i]));
		this._holidays.push(holiday);
	}
	for(let i = 0; i < CGMZ.Holidays.WeeklyEvents.length; i++) {
		const holiday = new CGMZ_WeeklyHoliday(JSON.parse(CGMZ.Holidays.WeeklyEvents[i]));
		this._holidays.push(holiday);
	}
	for(let i = 0; i < CGMZ.Holidays.MonthlyEvents.length; i++) {
		const holiday = new CGMZ_MonthlyHoliday(JSON.parse(CGMZ.Holidays.MonthlyEvents[i]));
		this._holidays.push(holiday);
	}
	for(let i = 0; i < CGMZ.Holidays.AnnualEvents.length; i++) {
		const holiday = new CGMZ_AnnualHoliday(JSON.parse(CGMZ.Holidays.AnnualEvents[i]));
		this._holidays.push(holiday);
	}
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Holidays_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Holidays_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Holidays", "Check Holidays", this.pluginCommandCheckHolidays);
};
//-----------------------------------------------------------------------------
// Check Holidays
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCheckHolidays = function(args) {
	if(args.Check === "true") {
		$cgmzTemp.checkHolidays();
	}
};
//-----------------------------------------------------------------------------
// Check Holidays
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkHolidays = function() {
	for(let i = 0; i < this._holidays.length; i++) {
		this._holidays[i].checkTime();
	}
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Check every so often for Holiday start/stop
//=============================================================================
const alias_CGMZ_Holidays_gameMap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    alias_CGMZ_Holidays_gameMap_setup.call(this, mapId);
	$cgmzTemp.checkHolidays();
};