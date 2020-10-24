/*=============================================================================
// MH-AuctionHouse.js                                                             
//=============================================================================*/

// Retain a reference to the original function
var Game_Actor_setup = Game_Actor.prototype.setup;
var Game_Item_setup = Game_Item.prototype.setup;

Game_Actor.prototype.setup = function (actorId) 
{
  // Call the original function
  Game_Actor_setup.call(this, actorId);
  this.race = $dataActors[actorId].meta.race || null;
}

Game_Item.prototype.setup = function (itemId) 
{
    // Call the original function
    Game_Item_setup.call(this, itemId);
    this.basePrice = $dataItems[itemId].meta.basePrice || null;
}

  Window_Status.prototype.drawActorNickname = function (actor, x, y, width=270) 
  {
    this.resetTextColor();
    // If the actor has a defined race, we'll draw it
    if (item.basePrice) {
       this.drawText(item.basePrice, x, y, width);
    }
  }
};