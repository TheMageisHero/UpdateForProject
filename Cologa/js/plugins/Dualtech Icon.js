Game_Actor.prototype.icon = function() {
  if (this.actor().meta.icon) return Number(this.actor().meta.icon); else return 0;
}