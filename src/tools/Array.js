"use strict";

///
/// \class Array
///
/// \brief Javascript Array class
///

///
/// \fn firstElement()
/// \memberof Array
///
/// \brief Return the first element of the array
///
/// \return Return the first element of the array
///

Array.prototype.firstElement = function()
{
  return this[0];
};

///
/// \fn indexLastElement()
/// \memberof Array
///
/// \brief Return the index of the last element or -1 if the array is empty
///
/// \return Return the index of the last element or -1 if the array is empty
///

Array.prototype.indexLastElement = function()
{
  return this.length - 1; // For an array with a size of 4 the indexes are from 0 to 3
};

///
/// \fn lastElement()
/// \memberof Array
///
/// \brief Return the last element of the array
///
/// \return Return the last element of the array
///

Array.prototype.lastElement = function()
{
  var iLast = this.indexLastElement();
  
  return this[iLast];
};

///
/// \fn addAtEnd()
/// \memberof Array
///
/// \brief Add an element at the end of the array
///
/// \param newElement New element to add
///

Array.prototype.addAtEnd = function(newElement)
{
  var iLast = this.indexLastElement();

  this[iLast + 1] = newElement;
};

///
/// \fn addAt()
/// \memberof Array
///
/// \brief Add an element at a specified position
///
/// \param index Position where add the element
/// \param newElement New element to add
///

Array.prototype.addAt = function(index, newElement)
{
  // Parameter verification
  if(Number.isSafeInteger(index) === false)
  {
    throw "<index> is not an integer";
  }
  
  if(index < 0)
  {
    throw "Invalid <index>";
  }
  
  // Add the new element
  var nbElementsDeleted = 0;
  
  this.splice(index, nbElementsDeleted, newElement);
};

///
/// \fn removeLast()
/// \memberof Array
///
/// \brief Remove the last element of the array
///

Array.prototype.removeLast = function()
{
  this.pop();
};
