
var _GameEvent_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    _GameEvent_initialize.call(this, mapId, eventId);
    if (this.isEnemy()) {
        this._eventEnemyId = Number($dataMap.events[eventId].meta.enemy);
        //Health (HP)
        this._eventEnemyHp = $dataEnemies[this._eventEnemyId].params[0];
        //Energy (MP)
        this._eventEnemyMp = $dataEnemies[this._eventEnemyId].params[1];
        //Melee Dmg (ATK)
        this._eventEnemyAtk = $dataEnemies[this._eventEnemyId].params[2];
        //Melee Def (DEF)
        this._eventEnemyDef = $dataEnemies[this._eventEnemyId].params[3];
        //Ranged Dmg (MAT)
        this._eventEnemyMat = $dataEnemies[this._eventEnemyId].params[4];
        //Ranged Def (MDF)
        this._eventEnemyMdf = $dataEnemies[this._eventEnemyId].params[5];
        //Speed (AGI)
        this._eventEnemyAgi = $dataEnemies[this._eventEnemyId].params[6];
        //Spirit (LUK)
        this._eventEnemyLuk = $dataEnemies[this._eventEnemyId].params[7];
    }
}

Game_Event.prototype.isEnemy = function(){
    return $dataMap.events[this._eventId].meta.enemy;
}
var _GameEvent_update = Game_Event.prototype.update;
Game_Event.prototype.update = function(){
    _GameEvent_update.call(this);
    this.updateAction();
    if(this.isEnemy()) {
        if(this._eventEnemyHp <= 0) this.erase();
    }
}

Game_Event.prototype.updateAction = function(){
    // check input processing

    if (Input.isTriggered('ok')) this._eventEnemyHp -= 9;

}
//Game_Interpreter.prototype.attackEnemy = function(eventId){
//    $dataMap.events[eventId]._eventEnemyHp -= 9;
//}