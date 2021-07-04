"use strict";

///
/// \class Position
///
/// \brief Represents a position
///

class Position
{
  
  ///
  /// \fn constructor(x, y)
  ///
  /// \brief Constructor
  ///
  /// \param x [**OPTIONAL**] Default X value of the position, if specified a Y default value need to be also specified
  /// \param y [**OPTIONAL**] Default Y value of the position, if specified a X default value need to be also specified
  ///
  
  constructor(x, y)
  {
    if(arguments.length === 2)
    {
      this.x = x;
      this.y = y;
    }
    else
    {
      this.x = 0;
      this.y = 0;
    }
  }
  
  ///
  /// \fn x()
  ///
  /// \brief Get accessor for the x propertie
  ///
  /// \return x value
  ///
  
  get x()
  {
    // Verify propertie initialization
    if(this.mX === "undefined")
    {
      throw "Propertie x is undefined";
    }
    
    // Return propertie value
    return this.mX;
  }
  
  ///
  /// \fn x(newX)
  ///
  /// \brief Set accessor for the x propertie
  ///
  /// \param newX New x
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set x(newX)
  {
    // Parameter verification
    if(Number.isFinite(newX) === false)
    {
      throw "<newX> is not an integer";
    }
    
    // Affectation
    this.mX = newX;
  }
  
  ///
  /// \fn y()
  ///
  /// \brief Get accessor for the y propertie
  ///
  /// \return y value
  ///
  
  get y()
  {
    // Verify propertie initialization
    if(this.mY === "undefined")
    {
      throw "Propertie y is undefined";
    }
    
    // Return propertie value
    return this.mY;
  }
  
  ///
  /// \fn y(newY)
  ///
  /// \brief Set accessor for the y propertie
  ///
  /// \param newY New y
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set y(newY)
  {
    // Parameter verification
    if(Number.isFinite(newY) === false)
    {
      throw "<newY> is not an integer";
    }
    
    // Affectation
    this.mY = newY;
  }
  
}
