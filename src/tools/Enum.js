"use strict";

///
/// \class Object
///
/// \brief Javascript Object class
///

///
/// \fn addEnum()
/// \memberof Object
///
/// \brief Add an enum in a class
///
/// \param [1...n] Strings which represent the constant name
///

Object.prototype.addEnum = function()
{
  for(let arg of arguments)
  {
    // Parameter verification
    if(typeof arg !== "string")
    {
      throw "Bad argument: " + arg;
    }
    
    // Create the constant
    this[arg] = Symbol();
  }
};
