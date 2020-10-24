/*
 * ==============================================================================
 * ** Victor Engine MV - Trait Control
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2015.12.31 > First release.
 *  v 1.01 - 2016.01.07 > Fixed issue with AttackTimes and AttackSpeed traits.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Trait Control'] = '1.01';

var VictorEngine = VictorEngine || {};
VictorEngine.TraitControl = VictorEngine.TraitControl || {};

(function() {

	VictorEngine.TraitControl.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.TraitControl.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Trait Control', 'VE - Basic Module', '1.07');
	};

	VictorEngine.TraitControl.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.TraitControl.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
*------------------------------------------------------------------------------ 
 * @plugindesc v1.01 - Adds new escape codes to be used on texts.
 * @author Victor Sant
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------ 
 *  Plugin Commands
 * ------------------------------------------------------------------------------
 *
 *  You can use v[id] on the instead of a numeric value to get the value from 
 *  the variable with the id set. For example, v[3] will get the value from the
 *  variable id 3.
 *
 * ---------------
 *
 *  AddTrait actor id type data value
 *	  Adds a trait to an actor.
 *      id    : actor Id.
 *      type  : trait type.  (see bellow)
 *      data  : trait data.  (see bellow)
 *      value : trait value. (see bellow)
 *
 * ---------------
 *
 *  RemoveTrait actor id type data value
 *	  Removes a trait from an actor.
 *      id    : actor Id.
 *      type  : trait type.  (see bellow)
 *      data  : trait data.  (see bellow)
 *      value : trait value. (see bellow)
 *
 * ---------------
 *
 *  AddTrait party index type data value
 *	  Adds a trait to a party member.
 *      index : party member index.
 *      type  : trait type.  (see bellow)
 *      data  : trait data.  (see bellow)
 *      value : trait value. (see bellow)
 *
 * ---------------
 *
 *  RemoveTrait party index type data value
 *	  Removes a trait from a party member.
 *      index : party member index.
 *      type  : trait type.  (see bellow)
 *      data  : trait data.  (see bellow)
 *      value : trait value. (see bellow)
 *
 * ---------------
 *
 *  AddTrait enemy index type data value
 *	  Adds a trait to an actor.
 *      index : enemy troop index.
 *      type  : trait type.  (see bellow)
 *      data  : trait data.  (see bellow)
 *      value : trait value. (see bellow)
 *
 * ---------------
 *
 *  RemoveTrait enemy index type data value
 *	  Removes a trait from an actor.
 *      index : enemy troop index.
 *      type  : trait type.  (see bellow)
 *      data  : trait data.  (see bellow)
 *      value : trait value. (see bellow)
 *
 * ---------------
 *
 *  ClearTrait actor id
 *	  Clear the changes of trait from an actor.
 *      id  : actor Id.
 *
 * ---------------
 *
 *  ClearTrait party index
 *	  Clear the changes of trait from an actor.
 *      index : party member index.
 *
 * ---------------
 *
 *  ClearTrait enemy id
 *	  Clear the changes of trait from an actor.
 *      index : enemy troop index.
 *
 * ------------------------------------------------------------------------------
 * Additional Information:
 * ------------------------------------------------------------------------------
 * 
 *  - Trait info:
 *  The type, data and values vary from trait to trait.
 *    type  : the trait name.
 *    data  : numeric value that set the trait object.
 *    value : numeric value that set the trait effect. Not used for some traits.
 *
 * ---------------
 *
 *    type  : ElementRate
 *    data  : element ID (database value)
 *    value : efficiency rate (0-1000)
 *
 * ---------------
 *
 *    type  : DebuffRate
 *    data  : 0: hp, 1: mp, 2: atk, 3: def, 4: mdf, 5: mat, 6: agi, 7: luk
 *    value : efficiency rate (0-1000)
 *
 * ---------------
 *
 *    type  : StateRate
 *    data  : state ID (database value)
 *    value : efficiency rate (0-1000)
 *
 * ---------------
 *
 *    type  : StateResist
 *    data  : state ID (database value)
 *    value : none
 *
 * ---------------
 *
 *    type  : Parameter
 *    data  : 0: hp, 1: mp, 2: atk, 3: def, 4: mdf, 5: mat, 6: agi, 7: luk
 *    value : efficiency rate (0-1000)
 *
 * ---------------
 *
 *    type  : Ex-Parameter
 *    data  : 0: hit, 1: evasion, 2: critical, 3: critical eva, 4: magic eva,
 *            5: reflection, 6: counter, 7: HP regen, 8: MP regen, 9: TP regen
 *    value : efficiency rate (0-1000)
 *
 * ---------------
 *
 *    type  : Sp-Parameter
 *    data  : 0: aggro, 1: defense, 2: recovery, 3: pharmacology, 4: MP cost,
 *            5: TP charge, 6: physical damage, 7: magic damage,
 *            8: terrain damage, 9: Experience aquisition
 *    value : efficiency rate (0-1000)
 *
 * ---------------
 *
 *    type  : AttackElement
 *    data  : element ID (database value)
 *    value : none
 *
 * ---------------
 *
 *    type  : AttackState
 *    data  : state ID (database value)
 *    value : efficiency rate (0-1000)
 *
 * ---------------
 *
 *    type  : AttackSpeed
 *    data  : correction (0-999, can be negative)
 *    value : none
 *
 * ---------------
 *
 *    type  : AttackTimes
 *    data  : number of extra attack (0-9)
 *    value : none
 *
 * ---------------
 *
 *    type  : AddSkillType
 *    data  : skill type ID (database value)
 *    value : none
 *
 * ---------------
 *
 *    type  : SealSkillType
 *    data  : skill type ID (database value)
 *    value : none
 *
 * ---------------
 *
 *    type  : AddSkill
 *    data  : skill ID (database value)
 *    value : none
 *
 * ---------------
 *
 *    type  : SealSkill
 *    data  : skill ID (database value)
 *    value : none
 *
 * ---------------
 *
 *    type  : EquipWeapon
 *    data  : weapon type ID (database value)
 *    value : none
 *
 * ---------------
 *
 *    type  : EquipArmor
 *    data  : armor type ID (database value)
 *    value : none
 *
 * ---------------
 *
 *    type  : LockEquip
 *    data  : 0: weapon, 1: shield, 2: helmet, 3: armor, 4: accessory
 *    value : none
 *
 * ---------------
 *
 *    type  : SealEquip
 *    data  : 0: weapon, 1: shield, 2: helmet, 3: armor, 4: accessory
 *    value : none
 *
 * ---------------
 *
 *    type  : SlotType
 *    data  : 0: two swords
 *    value : none
 *
 * ---------------
 *
 *    type  : ActionTimes
 *    data  : rate (0-1000)
 *    value : none
 *
 * ---------------
 *
 *    type  : SpecialFlag
 *    data  : 0: auto combat, 1: guard, 2: substitute, 3: TP carried over
 *    value : none
 *
 * ---------------
 * 
 *    type  : CollapseEffect
 *    data  : 0: boss, 1: instant disappear, 3: Doesn't disappear
 *    value : none
 *
 * ---------------
 *
 *    type  : PartyAbility
 *    data  : 0: encounter halved, 1: encounter disabled, 2: surprise disabled,
 *            3: preemptive bonus, 4: money get x2, 5: experience get x2
 *    value : none
 *
 * ---------------
 *
 *  - Removing a trait:
 *  Removing a trait removes only the traits that are *exactly* the same.
 *  So, if you have the trait "ElementRate 2 75", you must remove the trait
 *  "ElementRate 2 75". If you try to remove, for example, the trait
 *  "ElementRate 2 50", it will have no effect on the trait "ElementRate 2 75".
 *  Notabily, the trait will not become "ElementRate 2 25". Generally, the 
 *  remove trait is better used with traits that don't have values.
 *
 *  When you add a trait that is removed, it will cancel the trait removal.
 *  This happens only when adding traits with the plugin command, traits
 *  added other ways (let's say, equiping an armor) will not cancel the remove.
 *
 *  Removing a trait don't actually removes it, it just make so the trait have
 *  no effect. If you cancel the remove trait, the existing traits will have
 *  effect again.
 * 
 * ------------------------------------------------------------------------------
 * Example Plugin Commands:
 * ------------------------------------------------------------------------------
 *
 *  AddTrait actor 1 AttackElement 3
 *
 * ---------------
 *
 *  AddTrait enemy 2 ElementRate 2 150
 *
 * ---------------
 *
 *  RemoveTrait actor 3 PartyAbility 3
 * 
 * ------------------------------------------------------------------------------
 */

(function() {

	//=============================================================================
	// Window_Base
	//=============================================================================
	
	VictorEngine.TraitControl.initMembers = Game_BattlerBase.prototype.initMembers;
	Game_BattlerBase.prototype.initMembers = function() {
		VictorEngine.TraitControl.initMembers.call(this);
		this.clearTraits();
	};
	
	VictorEngine.TraitControl.allTraits = Game_BattlerBase.prototype.allTraits;
	Game_BattlerBase.prototype.allTraits = function() {
		var traits = VictorEngine.TraitControl.allTraits.call(this).concat(this._addedTraits)
		return traits.filter(function(obj) { return !this.sameTrait(this._removedTraits, obj) }, this);
	};
	
	Game_BattlerBase.prototype.clearTraits = function() {
		this._addedTraits   = [];
		this._removedTraits = [];
	};
	
	Game_BattlerBase.prototype.addTrait = function(type, id, value) {
		var code  = this.getTraitCode(type);
		var trait = this.setupTraitCode(code, id, value)
		if (code && !this.sameTrait(this.allTraits(), trait)) {
			if (this.sameTrait(this._removedTraits, trait)) {
				var index = this._removedTraits.indexOf(trait);
				if (index > -1) this._removedTraits.splice(index, 1);
			} else {
				this._addedTraits.push(trait);
			}
		}
	};
	
	Game_BattlerBase.prototype.setupTraitCode = function(code, id, value) {
		switch (code) {
		case Game_BattlerBase.TRAIT_ATTACK_SPEED: case Game_BattlerBase.TRAIT_ATTACK_TIMES:
			return {code: code, dataId: 0, value: id}
		default:
			return {code: code, dataId: id, value: value}
		}
	};

	Game_BattlerBase.prototype.removeTrait = function(type, id, value) {
		var code  = this.getTraitCode(type);
		var trait = {code: code, dataId: id, value: value}
		if (code && !this.sameTrait(this._removedTraits, trait)) this._removedTraits.push(trait);
	};
	
	Game_BattlerBase.prototype.sameTrait = function(traits, obj) {
		return traits.some(function(trait) {
			return (obj.code === trait.code && obj.dataId === trait.dataId && obj.value === trait.value);
		});
	};
	
	Game_BattlerBase.prototype.getTraitCode = function(type) {
		switch (type.toUpperCase()) {
		case "ELEMENTRATE":
			return Game_BattlerBase.TRAIT_ELEMENT_RATE;
			break;
		case "DEBUFFRATE":
			return Game_BattlerBase.TRAIT_DEBUFF_RATE;
			break;
		case "STATERATE":
			return Game_BattlerBase.TRAIT_STATE_RATE;
			break;
		case "STATERESIST":
			return Game_BattlerBase.TRAIT_STATE_RESIST;
			break;
		case "PARAMETER":
			return Game_BattlerBase.TRAIT_PARAM;
			break;
		case "EX-PARAMETER":
			return Game_BattlerBase.TRAIT_XPARAM;
			break;
		case "SP-PARAMETER":
			return Game_BattlerBase.TRAIT_SPARAM;
			break;
		case "ATTACKELEMENT":
			return Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
			break;
		case "ATTACKSTATE":
			return Game_BattlerBase.TRAIT_ATTACK_STATE;
			break;
		case "ATTACKSPEED":
			return Game_BattlerBase.TRAIT_ATTACK_SPEED;
			break;
		case "ATTACKTIMES":
			return Game_BattlerBase.TRAIT_ATTACK_TIMES;
			break;
		case "ADDSKILLTYPE":
			return Game_BattlerBase.TRAIT_STYPE_ADD;
			break;
		case "SEALSKILLTYPE":
			return Game_BattlerBase.TRAIT_STYPE_SEAL;
			break;
		case "ADDSKILL":
			return Game_BattlerBase.TRAIT_SKILL_ADD;
			break;
		case "SEALSKILL":
			return Game_BattlerBase.TRAIT_SKILL_SEAL;
			break;
		case "EQUIPWEAPON":
			return Game_BattlerBase.TRAIT_EQUIP_WTYPE;
			break;
		case "EQUIPARMOR":
			return Game_BattlerBase.TRAIT_EQUIP_ATYPE;
			break;
		case "LOCKEQUIP":
			return Game_BattlerBase.TRAIT_EQUIP_LOCK;
			break;
		case "SEALEQUIP":
			return Game_BattlerBase.TRAIT_EQUIP_SEAL;
			break;
		case "SLOTTYPE":
			return Game_BattlerBase.TRAIT_SLOT_TYPE;
			break;
		case "ACTIONTIMES":
			return Game_BattlerBase.TRAIT_ACTION_PLUS;
			break;
		case "SPECIALFLAG":
			return Game_BattlerBase.TRAIT_SPECIAL_FLAG;
			break;
		case "COLLAPSEEFFECT":
			return Game_BattlerBase.TRAIT_COLLAPSE_TYPE;
			break;
		case "PARTYABILITY":
			return Game_BattlerBase.TRAIT_PARTY_ABILITY;
			break;
		default:
			return null;
			break;
		};
	};
	
	//=============================================================================
	// Game_Interpreter
	//=============================================================================
	
	VictorEngine.TraitControl.pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		VictorEngine.TraitControl.pluginCommand.call(this, command, args);
		var v = $gameVariables._data;
		if (command.toLowerCase() === 'addtrait') {
			var type   = String(args[2]);
			var dataId = Number(eval(args[3]));
			var value  = Number(eval(args[4])) || 1;
			if (args[0].toLowerCase() === 'actor') {
				var actor = $gameActors.actor(Number(eval(args[1])));
				if (actor) actor.addTrait(type, dataId, value);
			}
			if (args[0].toLowerCase() === 'party') {
				var actor = $gameParty.members(Number(eval(args[1])));
				if (actor) actor.addTrait(type, dataId, value);
			}
			if (args[0].toLowerCase() === 'enemy') {
				var enemy = $gameTroop.members(Number(eval(args[1])));
				if (enemy) enemy.addTrait(type, dataId, value);
			}
		}
		if (command.toLowerCase() === 'removetrait') {
			var type   = String(args[2]);
			var dataId = Number(eval(args[3]));
			var value  = Number(eval(args[4])) || 1;
			if (args[0].toLowerCase() === 'actor') {
				var actor = $gameActors.actor(Number(eval(args[1])));
				if (actor) actor.removeTrait(type, dataId, value);
			}
			if (args[0].toLowerCase() === 'party') {
				var actor = $gameParty.members(Number(eval(args[1])));
				if (actor) actor.removeTrait(type, dataId, value);
			}
			if (args[0].toLowerCase() === 'enemy') {
				var enemy = $gameTroop.members(Number(eval(args[1])));
				if (enemy) enemy.removeTrait(type, dataId, value);
			}
		}
		if (command.toLowerCase() === 'cleartrait') {
			if (args[0].toLowerCase() === 'actor') {
				var actor = $gameActors.actor(Number(eval(args[1])));
				if (actor) actor.clearTraits();
			}
			if (args[0].toLowerCase() === 'party') {
				var actor = $gameParty.members(Number(eval(args[1])));
				if (actor) actor.clearTraits();
			}
			if (args[0].toLowerCase() === 'enemy') {
				var enemy = $gameTroop.members(Number(eval(args[1])));
				if (enemy) enemy.clearTraits();
			}
		}
	};

})(); 