"use strict";

///
/// \class NextShape
///
/// \brief Represents the next shape (contain the shape and the drawing area)
///

class NextShape
{
  
  // Static constants
    
  /// \fn WIDTH()
  /// \brief [**STATIC CONSTANT**] Width in number of square of the next shape drawing area
    
  static get WIDTH()     { return 4; }
  
  /// \fn HEIGHT()
  /// \brief [**STATIC CONSTANT**] Height in number of square of the next shape drawing area
  
  static get HEIGHT()     { return 4; }
  
  ///
  /// \fn constructor()
  ///
  /// \brief Constructor
  ///
  /// \param drawingAreaId DOM id of the drawing area
  ///
  
  constructor(drawingAreaId)
  {
    this.drawingArea = new DrawingArea(document.getElementById(drawingAreaId));  
        
    this.shapeFactory = new ShapeFactory(cfg_SHAPES);
    
    // Init with a new shape
    this.next();
  }
  
  ///
  /// \fn next()
  ///
  /// \brief Create a *new* next shape and return the *previous* next shape
  ///
  /// \return Return the *previous* next shape
  ///
  
  next()
  {
    // Save the reference to the *previous* next shape to return it at the end
    var previousShape = this.shape;
    
    // Build *new* next shape
    this.shape = this.shapeFactory.buildRandomShape();
    
    // Center the *new* next shape on NextShape drawing area
    this.shape.centerAxisX(NextShape.WIDTH);
    this.shape.centerAxisY(NextShape.HEIGHT);
    
    // Redraw drawing area
    this.draw();

    // Return the *previous* next shape reference
    return previousShape;
  }
  
  ///
  /// \fn draw()
  ///
  /// \brief Draw the next shape on his drawing area
  ///
  
  draw()
  {
    this.drawingArea.clear();
    this.shape.draw(this.drawingArea);
  }
  
}
