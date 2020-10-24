//=============================================================================
// Cae_OverpassTileExt.js
//=============================================================================

/*:
 * @plugindesc v1.3 - An extended version of Kadokawa's OverpassTile plugin that can handle multiple overpass/gateway region IDs & collision adjustment.
 * @author Caethyril (based on OverpassTile.js by Yoji Ojima)
 *
 * @help Plugin Commands:
 *   None.
 *
 * Help:
 *   If using collision adjustment, script to put event on overpass:
 *    - in move route:     this._higherLevel = true;
 *    - in Script command: $gameMap.event(id)._higherLevel = true;
 *                         Replace id with the event ID.
 *   Alternatively just have the event walk onto the overpass via a gateway!
 *
 * Compatibility:
 *   Aliases: Tilemap: isOverpassPosition;
 *            Game_CharacterBase: screenZ, isMapPassable, refreshBushDepth,
 *                                isCollidedWithEvents, isCollidedWithVehicles;
 *            Game_Player: startMapEvent;
 *            Game_Event: isCollidedWithPlayerCharacters.
 *   Defines new function isSameOverHeight on Game_CharacterBase.
 *
 * Terms of use:
 *   Free to use and modify.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.3: Minor compatibility-aid patch for vehicle collisions~
 *        Also, true/false plugin parameters can now recognise 'false' value. .-.
 *   1.2: Bush effect can now be globally disabled for characters on overpass!
 *   1.1: Now able to handle layer-based collision adjustments.
 *        Characters on overpass will not trigger characters underneath.
 *   1.0: Initial release.
 *
 * @param Overpass Region IDs
 * @text Overpass Region IDs
 * @type number[]
 * @min 1
 * @max 255
 * @desc Additional region IDs for "overpass" tiles such as bridges.
 * @default []
 *
 * @param Gateway Region IDs
 * @text Gateway Region IDs
 * @type number[]
 * @min 1
 * @max 255
 * @desc Additional region IDs for "gateway" tiles such as bridge ends.
 * @default []
 *
 * @param Collision Adjustment
 * @text Collision Adjustment
 * @type boolean
 * @desc If true, make characters collidable/activatable only if they're on the same overpass level.
 * @default false
 *
 * @param No Bushes on Overpass
 * @text No Bushes on Overpass
 * @type boolean
 * @desc If true, prevents characters on higher tiles being affected by the "bush" tile effect.
 * @default false
 */

var Imported = Imported || {};				// Import namespace, var can redefine
Imported.Cae_OverpassTileExt = 1.3;			// Import declaration

var CAE = CAE || {};					// Author namespace, var can redefine
CAE.OverpassTileExt = CAE.OverpassTileExt || {};	// Plugin namespace

(function (_) {

'use strict';

	_.params = PluginManager.parameters('Cae_OverpassTileExt');			// Process user parameters

	_.overpass = JSON.parse(_.params['Overpass Region IDs']).map(Number) || [];
	_.gateways = JSON.parse(_.params['Gateway Region IDs']).map(Number) || [];
	_.adjColl  = _.params['Collision Adjustment'] === 'true';
	_.noHiBush = _.params['No Bushes on Overpass'] === 'true';

	// Array-based replacements for original "region equals" checks
	_.isOverpass = function(regionId) { return _.overpass.contains(regionId); };
	_.isGateway  = function(regionId) { return _.gateways.contains(regionId); };

	_.adjCollVehicles = ['boat', 'ship'];		// Vehicle types to check for adjusted collisions

	// New function: returns true if characters are on the same overpass level, else false. Used for collision adjustment.
	Game_CharacterBase.prototype.isSameOverHeight = function(char) {
		if (!_.adjColl) return true;		// Parameter not set, don't adjust collisions.
		let iGate = _.isGateway($gameMap.regionId(this.x, this.y)), iOver = _.isOverpass($gameMap.regionId(this.x, this.y));
		let uGate = _.isGateway($gameMap.regionId(char.x, char.y)), uOver = _.isOverpass($gameMap.regionId(char.x, char.y));
		let irLow = !this._higherLevel || iGate, urLow = !char._higherLevel || uGate;
		let gvo = (iGate && uOver) || (uGate && iOver);			// true if one's on gateway & other's on overpass
		return !gvo === (irLow === urLow);
	};

	// Optional overrides to handle layer-based collision adjustment
	_.Game_CharacterBase_isCollidedWithEvents = Game_CharacterBase.prototype.isCollidedWithEvents;
	Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
		if (!_.adjColl) {
			_.Game_CharacterBase_isCollidedWithEvents.call(this, x, y);
		} else {
			return $gameMap.eventsXyNt(x, y).some(function(event) {
				return event.isNormalPriority() && this.isSameOverHeight(event);
			}, this);
		}
	};

	_.Game_CharacterBase_isCollidedWithVehicles = Game_CharacterBase.prototype.isCollidedWithVehicles;
	Game_CharacterBase.prototype.isCollidedWithVehicles = function(x, y) {
		if (!_.adjColl) {
			_.Game_CharacterBase_isCollidedWithVehicles.call(this, x, y);
		} else {
			return _.adjCollVehicles.some(function(vType) {
				let veh = $gameMap.vehicle(vType);
				return veh.posNt(x, y) && veh._higherLevel === this._higherLevel;
			}, this);
		}
	};

	_.Game_Event_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
	Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
		return this.isSameOverHeight($gamePlayer) && _.Game_Event_isCollidedWithPlayerCharacters.call(this, x, y);
	};

	// Optional override to forbid button-activation of events (button & touch triggers) from different overpass heights
	_.Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
	Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
		if (!_.adjColl) {
			_.Game_Player_startMapEvent.call(this, x, y, triggers, normal);
		} else {
			if (!$gameMap.isEventRunning()) {
				$gameMap.eventsXy(x, y).forEach(function(event) {
					if (this.isSameOverHeight(event) && event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
						event.start();
					}
				}, this);
			}
		}
	};

	// Minor edit to original OverpassTile code to allow bush-disable when on overpass, according to param value
	_.Game_CharacterBase_refreshBushDepth = Game_CharacterBase.prototype.refreshBushDepth;
	Game_CharacterBase.prototype.refreshBushDepth = function () {
		_.Game_CharacterBase_refreshBushDepth.call(this);
		let regionId = this.regionId();
		if (_.noHiBush && _.isOverpass(regionId)) this._bushDepth = 0;
		if (_.isGateway(regionId)) {
			this._higherLevel = true;
		} else if (!_.isOverpass(regionId)) {
			this._higherLevel = false;
		}
	};

	// All the following code works the same as the original OverpassTile plugin, except with multiple overpass/gateway regions.

	_.Tilemap_isOverpassPosition = Tilemap.prototype._isOverpassPosition;
	Tilemap.prototype._isOverpassPosition = function (mx, my) {
		let regionId = this._readMapData(mx, my, 5);
		if (_.isOverpass(regionId)) {
			return true;
		} else {
			return _.Tilemap_isOverpassPosition.call(this, mx, my);
		}
	};

	_.Game_CharacterBase_screenZ = Game_CharacterBase.prototype.screenZ;
	Game_CharacterBase.prototype.screenZ = function () {
		if (this._higherLevel) {
			return 5;
		} else {
			return _.Game_CharacterBase_screenZ.call(this);
		}
	};

	_.Game_CharacterBase_isMapPassable = Game_CharacterBase.prototype.isMapPassable;
	Game_CharacterBase.prototype.isMapPassable = function (x, y, d) {
		if (_.Game_CharacterBase_isMapPassable.call(this, x, y, d)) {
			let x2 = $gameMap.roundXWithDirection(x, d);
			let y2 = $gameMap.roundYWithDirection(y, d);
			let d2 = this.reverseDir(d);
			let regionId1 = $gameMap.regionId(x, y);
			let regionId2 = $gameMap.regionId(x2, y2);
			if (this._higherLevel && !_.isGateway(regionId1)) {
				return (_.isGateway(regionId2) || _.isOverpass(regionId2));
			}
			if (!this._higherLevel && _.isOverpass(regionId1)) {
				if (_.isOverpass(regionId2)) {			// Below overpass, check dir-pass of lower tiles
					let bit1 = (1 << (d / 2 - 1)) & 0x0f;	// There...
					let bit2 = (1 << (d2 / 2 - 1)) & 0x0f;	// ...and back
					let flags = $gameMap.tilesetFlags();
					let tileId1 = $gameMap.tileId(x, y, 0);
					let tileId2 = $gameMap.tileId(x, y, 1);
					let tileId3 = $gameMap.tileId(x2, y2, 0);
					let tileId4 = $gameMap.tileId(x2, y2, 1);
					if ((flags[tileId1] | flags[tileId2]) & bit1) return false;
					if ((flags[tileId3] | flags[tileId4]) & bit2) return false;
				}
				return !_.isGateway(regionId2);
			}
			return true;
		}
		return false;
	};

})(CAE.OverpassTileExt);