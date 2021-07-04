"use strict";

///
/// \class DrawingArea
///
/// \brief Represents a drawing area
///

class DrawingArea
{  
  ///
  /// \fn constructor()
  ///
  /// \brief Constructor
  ///
  /// \param canvas HTML5 canvas used to draw
  ///
  
  constructor(canvas)
  {
    this.context = canvas.getContext("2d");
  }
  
  ///
  /// \fn context()
  ///
  /// \brief Get accessor for the context propertie
  ///
  /// \return context object
  ///
  
  get context()
  {
    // Verify propertie initialization
    if(this.mContext === "undefined")
    {
      throw "Propertie context is undefined";
    }
    
    // Return propertie value
    return this.mContext;
  }
  
  ///
  /// \fn context(newContext)
  ///
  /// \brief Set accessor for the context propertie
  ///
  /// \param newContext New context
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set context(newContext)
  {
    // Parameter verification
    if((newContext instanceof CanvasRenderingContext2D) === false)
    {
      throw "<newContext> is not an instance of CanvasRenderingContext2D";
    }
    
    // Affectation
    this.mContext = newContext;
  }
  
  ///
  /// \fn width()
  ///
  /// \brief Return the width of the drawing area
  ///
  /// \return Return the width of the drawing area
  ///
  
  get width()
  {
    return this.context.canvas.width;
  }
  
  ///
  /// \fn height()
  ///
  /// \brief Return the height of the drawing area
  ///
  /// \return Return the height of the drawing area
  ///
  
  get height()
  {
    return this.context.canvas.height;
  }
  
  ///
  /// \fn clear()
  ///
  /// \brief Clear the screen
  ///
  
  clear()
  {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.width, this.height);
  }
 
  ///
  /// \fn drawSquare()
  ///
  /// \brief Draw a square on the drawing area
  ///
  /// \param position Position of the left/top corner
  /// \param side Side length of the square to draw
  /// \borderColor Border color of the square
  ///
  
  drawSquare(position, side, borderColor)
  {
    // Verify parameters
    if((position instanceof Position) === false)
    {
      throw "<position> is not an instanceof Position";
    }
    
    side = side - 1; // because a side of 10 from position 0 go from 0 to 9 included
    
    this.checkPositionValidity(position);                                             // top / left
    this.checkPositionValidity(new Position(position.x + side, position.y + side));   // bottom / right
    
    // Draw
    this.context.strokeStyle = borderColor;
    this.context.strokeRect(position.x, position.y, side, side);
  }
  
  ///
  /// \fn drawFillSquare()
  ///
  /// \brief Draw a **fill** square on the drawing area
  ///
  /// \param position Position of the left/top corner
  /// \param side Side length of the square to draw
  /// \param fillColor Fill color
  ///
  
  drawFillSquare(position, side, fillColor)
  {
    // Parameters verification
    if((position instanceof Position) === false)
    {
      throw "<position> is not an instanceof Position";
    }
    
    side = side - 1; // because a side of 10 from position 0 go from 0 to 9 included
    
    this.checkPositionValidity(position);                                             // top / left
    this.checkPositionValidity(new Position(position.x + side, position.y + side));   // bottom / right
    
    // Draw
    this.context.fillStyle = fillColor;
    this.context.fillRect(position.x, position.y, side, side);
  }
  
  ///
  /// \fn checkPositionValidity()
  ///
  /// \brief Check the validity (on the screen) of a position
  ///
  /// \param position Position to check
  ///
  
  checkPositionValidity(position)
  {
    if((position.x < 0) || (position.x >= this.width))
    {
      throw "Invalid <position.x> value: " + position.x;
    }
    
    if((position.y < 0) || (position.y >= this.height))
    {
      throw "Invalid <position.y> value: " + position.y;
    }
  }
  
}
