"use strict";

///
/// \class Brick
///
/// \brief Represents a brick
///

class Brick
{
  
  // Static constants
    
  /// \fn SIDE_PIXELS()
  /// \brief [**STATIC CONSTANT**] Square side length in pixels

  static get SIDE_PIXELS()     { return 20; }
  
  /// \fn BORDER_PIXELS()
  /// \brief [**STATIC CONSTANT**] Size of the border in pixels
  
  static get BORDER_PIXELS()   { return 1;  }
  
  ///
  /// \fn constructor()
  ///
  /// \brief Constructor
  ///
  /// \param [**OPTIONNAL**] color Color of the brick
  ///
  
  constructor(color)
  {
    if(arguments.length === 1)
    {
      this.color = color;
    }
  }
  
  ///
  /// \fn draw()
  ///
  /// \brief Draw the brick on a drawing area
  ///
  /// \param position Logic position on the drawing area 
  /// \param drawingArea Drawing area where draw the brick
  ///
  
  draw(drawingArea, position, color)
  {
    // Verify parameters
    if((position instanceof Position) === false)
    {
      throw "<position> is not an instance of Position";
    }
    
    if((drawingArea instanceof DrawingArea) === false)
    {
      throw "<drawingArea> is not an instance of DrawingArea";
    }
    
    // If color is not given in parameter use the brick own color
    if(color === undefined)
    {
      color = this.color;
    }
    
    // Draw border of the brick
    var physicsPosition = new Position(
      position.x * Brick.SIDE_PIXELS,
      position.y * Brick.SIDE_PIXELS);
      
    drawingArea.drawSquare(physicsPosition, Brick.SIDE_PIXELS, "black");
      
    // Draw color inside brick
    physicsPosition = new Position(
      (position.x * Brick.SIDE_PIXELS) + Brick.BORDER_PIXELS,
      (position.y * Brick.SIDE_PIXELS) + Brick.BORDER_PIXELS);
      
    drawingArea.drawFillSquare(physicsPosition, Brick.SIDE_PIXELS - (2 * Brick.BORDER_PIXELS), color);

    // Return
    return true;
  }
  
  ///
  /// \fn color()
  ///
  /// \brief Get accessor for the color propertie
  ///
  /// \return color value
  ///
  
  get color()
  {
    // Verify propertie initialization
    if(this.mColor === "undefined")
    {
      throw "Propertie color is undefined";
    }
    
    // Return propertie value
    return this.mColor;
  }
  
  ///
  /// \fn color(newColor)
  ///
  /// \brief Set accessor for the color propertie
  ///
  /// \param newColor New color
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set color(newColor)
  {
    // Parameter verification
    if(typeof newColor !== "string")
    {
      throw "<newColor> is not a string";
    }
    
    // Affectation
    this.mColor = newColor;
  }
  
}
