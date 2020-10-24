/*:
-------------------------------------------------------------------------
@title Placeholder Message Faces
@author Hime
@date Nov 9, 2015
@url 
-------------------------------------------------------------------------
@plugindesc Allows you to use placeholder graphics in your messages
that will dynamically display faces during the game.
@help 
-------------------------------------------------------------------------
== Description ==

In RPG Maker MV, you can create dialog through a series of messages.
To set up these messages, you would use the event editor's "Show Text"
command.

Here, you can type in the message you want to show, a face to go with it,
along with some other properties like the position of the message.

Now, what happens if you're making a game where players can choose who
they will use as the leader? For example, maybe your game offers
players the option to choose between a man or a woman, or from a set
of characters each with different backgrounds.

In these cases, it would be strange if the face shown in the dialog
didn't match the face of the player's chosen character.

However, now we have another problem: how do we actually set up our
messages to show different faces depending on the characters? Should
we just create conditional branches to handle every possible option?

But what if the players can submit their own custom faces for their
character? Now you would have no control over the graphics!

This plugin offers a solution that allows you to easily set up 
messages that will display the appropriate faces depending on the
actor's current face.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 9, 2015 -  initial release

== Usage ==

We will be using images that will serve as placeholders. These images will
be replaced by correct images during the game.

You have two types of placeholders: 

Actor - take the face of a specific actor based on ID
Party - take the face of an actor based on their position in the party

Start by creating some images will serve as placeholders, and name them

   PlaceholderActor###
   PlaceholderParty###
   
Where the ### is either the ID of the actor, or the position of the party.
For example, if you wanted to show actor 1 in the message, you would use
a picture called

   PlaceholderActor1
   
And if you wanted to show the actor that is currently the leader of the
party, you would use a picture called

   PlaceholderParty1
   
You can draw anything on them yourself; what's important is the filename.
The purpose of the picture is just to make it obvious what it represents.

Then in your message box just use these pictures and the game will handle
the rest.
-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.PlaceholderMessageFaces = 1;
TH.PlaceholderMessageFaces = TH.PlaceholderMessageFaces || {};

(function ($) {

  $.getPlaceholderActor = function(name) {    
    var type = name.substring(11, 16)
    if (type.toLowerCase() === "actor") {
      var id = Math.floor(name.substring(16));
      return $gameActors.actor(id);
    }
    else if (type.toLowerCase() === "party") {
      var index = Math.floor(name.substring(16)) - 1;
      return $gameParty.members()[index];
    }
  };

  var TH_PlaceholderMessageFaces_GameMessage_setFaceImage = Game_Message.prototype.setFaceImage;
  Game_Message.prototype.setFaceImage = function(faceName, faceIndex) {
    if (faceName.toLowerCase().startsWith("placeholder")) {
      var actor = $.getPlaceholderActor(faceName);
      faceName = actor.faceName();
      faceIndex = actor.faceIndex()
    }
    TH_PlaceholderMessageFaces_GameMessage_setFaceImage.call(this, faceName, faceIndex);
  };
})(TH.PlaceholderMessageFaces);