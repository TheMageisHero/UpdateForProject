//=============================================================================
// Maliki's Dual Weilding/Two-Handed Weapons
// MalDualWield.js
// version 1.2
//=============================================================================
/*:  
* @plugindesc Allows you to set weapons as twohanded, disallowing you from equipping weapons to the Off-hand.  
 * @author Maliki79
 * @help You need two steps to use this plugin:
 * 1: Set your actor(s) up to have Dual-Wield in the Database. TRAITS => EQUIP => SLOT TYPE => DUAL WIELD
 * 2: Add the Notetag <twohand> to any two handed weapons in your Database.
 * 3: (Optional) For Shields, make them weapons in your database and add the tag <shld> to their notes
 */
 
var MalEquip = Window_EquipItem.prototype.includes
Window_EquipItem.prototype.includes = function(item) {
	if (item === null) {
        if (this._slotId === 0 && this._actor.equips()[1]){
		return false;
		} else {
		return true;
    }}
	if (this._slotId === 0 && this._actor.equips()[1] && item.meta.twohand) {
	return false;
	}
	if (this._slotId === 0 && item.meta.shld) {
	return false;
	}
	if (this._slotId === 1 && !(this._actor.equips()[0])) {
    return false;
	}
	if (this._slotId === 1 && (this._actor.equips()[0]) && this._actor.equips()[0].meta.twohand) {
    return false;
	}
	if (this._slotId === 1 && item.meta.twohand) {
    return false;
	}
	if (this._actor.equips()[1] && this._actor.equips()[1].meta.twohand) {
	this._actor.changeEquip(1, null);
	}
    if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
        return false;
    }
	
    return this._actor.canEquip(item);
};

MalBestEquip = Game_Actor.prototype.bestEquipItem
Game_Actor.prototype.bestEquipItem = function(slotId) {
    var etypeId = this.equipSlots()[slotId];
    var items = $gameParty.equipItems().filter(function(item) {
        return item.etypeId === etypeId && this.canEquip(item);
    }, this);
    var bestItem = null;
    var bestPerformance = -1000;
    for (var i = 0; i < items.length; i++) {
        var performance = this.calcEquipItemPerformance(items[i]);
        if (performance > bestPerformance) {
	if (slotId === 0 && items[i].meta.shld) {
	continue;
	}
	if (slotId === 1 && (this.equips()[0]) && this.equips()[0].meta.twohand) {
    continue;
	}
	if (slotId === 1 && items[i].meta.twohand) {
    continue;
	}		
            bestPerformance = performance;
            bestItem = items[i];
        }
    }
    return bestItem;
};