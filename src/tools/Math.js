"use strict";

///
/// \class Math
///
/// \brief Javascript Math class
///

///
/// \fn getRandomInt()
/// \memberof Math
///
/// \brief Return a random integer between min and max included
///
/// \return Return a random integer between min and max included
///

Math.getRandomInt = function(min, max)
{
  // Parameters verification
  if(Number.isSafeInteger(min) === false)
  {
    throw "<min> is not a number";
  }
  
  if(Number.isSafeInteger(max) === false)
  {
    throw "<max> is not a number";
  }
  
  if(min >= max)
  {
    throw "<min> is equal or greater than <max>";
  }
  
  // Everything is OK, return the random number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
