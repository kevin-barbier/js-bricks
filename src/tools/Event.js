"use strict";

///
/// \class Event
///
/// \brief Javascript Event class
///

///
/// \fn getCharFromEvent()
/// \memberof Event
///
/// \brief Return the character of the key which trigger the keypress event
///
/// \param event Keypress event
///
/// \return Return the character of the key which trigger the keypress event
///

Event.prototype.getCharacterFromEvent = function(event)
{
  // Parameter verification
  if((event instanceof Event) === false)
  {
    throw "<event> is not an instance of Event";
  }
  
  // Extract the character
  var key = event.keyCode || event.which;
  var character = String.fromCharCode(key);
    
  return character;
};
