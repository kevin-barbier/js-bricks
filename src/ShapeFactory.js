"use strict";

///
/// \class ShapeFactory
///
/// \brief Own the shapes stock created from config file and give a copy on demand
///

class ShapeFactory
{
  
  ///
  /// \fn constructor()
  ///
  /// \brief Constructor
  ///
  /// \param config_SHAPES Object of the config file who contain the description of all shape
  ///
  
  constructor(config_SHAPES)
  {
    this.shapesStock = new Array();
    
    // Create classes from config file
    
    // Parse all shapes of the config file
    for(let cfg_shape of cfg_SHAPES)
    {
      // Create a new class who inherits from Shape class and add in the prototype her description (shared by all instances)
      var newShape = class extends Shape { };
      
      newShape.prototype.shapeData = new Array(); // Create the array who contains the 4 rotations of the shape
      
      newShape.prototype.shapeData[0] = new Array(); // Create the array who contains the list of line for the default rotation (index = 0)
      
      // Parse lines of the current shape
      for(let cfg_line of cfg_shape)
      {
        let newLine = new Array(); // Create a new line who contains the list of bricks
        newShape.prototype.shapeData[0].addAtEnd(newLine);
        
        // Parse characters of the current shape
        for(let cfg_character of cfg_line)
        {
          // There is a brick at this position
          if(cfg_character === "*")
          {
            newLine.addAtEnd(new Brick("black"));
          }
          
          // Empty position
          else
          {
            newLine.addAtEnd(undefined);
          }
        }
      }
      
      // Make other rotation
      newShape.prototype.shapeData[1] = Shape.createRotation(newShape.prototype.shapeData[0]);
      newShape.prototype.shapeData[2] = Shape.createRotation(newShape.prototype.shapeData[1]);
      newShape.prototype.shapeData[3] = Shape.createRotation(newShape.prototype.shapeData[2]);
      
      // Add the new new to the stock of shape
      this.shapesStock.addAtEnd(newShape);
    }
  }
  
  ///
  /// \fn nbShapes()
  ///
  /// \brief Return the number of shapes in the stock
  ///
  /// \return Return the number of shapes in the stock
  ///
  
  get nbShapes()
  {
    return this.shapesStock.length;
  }
  
  ///
  /// \fn buildShape()
  ///
  /// \brief Build a shape of *index <id>* and return it
  ///
  /// \param id Index of the shape to build
  ///
  /// \return A new instance of the shape who have the index <id>
  ///
  
  buildShape(id)
  {
    // Verify ID
    if((id < 0) || (id >= this.shapesStock.length))
    {
      throw "Invalid <id>";
    }
    
    // Return new instance of shape with the id <id>
    var newShape = new this.shapesStock[id](new Position(0, 0));
    
    return newShape;
  }
  
  ///
  /// \fn buildRandomShape()
  ///
  /// \brief Build a *random* shape and return it
  ///
  /// \return A new instance of the shape who have the random
  ///  
  
  buildRandomShape()
  {
    // Create a random ID
    var newShapeId = Math.getRandomInt(0, this.nbShapes - 1);
    
    // Return new instance of shape with the random id [newShapeId]
    var newShape = this.buildShape(newShapeId);
    
    return newShape;
  }
  
}
