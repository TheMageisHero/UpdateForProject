var MH_setValue = Game_Variables.prototype.setValue
Game_Variables.prototype.setValue = function(variableId, value)
{
    MH_setValue.call(variableId, value);
    $gameVariables.setValue(500, 5);
}