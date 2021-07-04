"use strict";

///
/// \class Gameboard
///
/// \brief Represents the gameboard
///

class Gameboard
{
  
  // Static constants
    
  /// \fn WIDTH()
  /// \brief [**STATIC CONSTANT**] Width in number of square of the gameboard
    
  static get WIDTH()     { return 10; }
  
  /// \fn HEIGHT()
  /// \brief [**STATIC CONSTANT**] Height in number of square of the gameboard
  
  static get HEIGHT()     { return 20; }
      
  ///
  /// \fn constructor()
  ///
  /// \brief Constructor
  ///
  /// \param drawingAreaId DOM id of the drawing area
  ///
  
  constructor(drawingAreaId)
  {
    // Create drawing area
    this.drawingArea = new DrawingArea(document.getElementById(drawingAreaId));
    
    // Create the array
    this.gameboard = new Array();
    
    // Create each line of the gameboard which are also an array
    for(let i = 0; i < Gameboard.HEIGHT; i++)
    {
      this.gameboard[i] = new Array();
    }
  }
  
  ///
  /// \fn copyShape()
  ///
  /// \brief Copy a shape in the gameboard
  ///
  /// \param shape Shape to copy in the gameboard
  ///
  
  copyShape(shape)
  {
    // Each line
    for(let i = 0; i < shape.height; i++)
    {
      // Each brick of the line
      for(let j = 0; j < shape.width; j++)
      {
        if(shape.shape[i][j] instanceof Brick)
        {
          this.gameboard[shape.position.y + i][shape.position.x + j] = new Brick(shape.color);
        }
      }
    }
  }
  
  ///
  /// \fn checkCollision()
  ///
  /// \brief Check collision of the shape given in parameter with bricks of the gameboard
  ///
  /// \param Shape to check collision with bricks of the gameboard
  /// \param offsetX Offset on X axis to apply on the position of <shape>
  /// \param offsetY Offset on Y axis to apply on the position of <shape>
  /// \param offsetRotation Rotation offset to apply on <shape>
  ///
  /// \return Return true if a collision is detected or the shape with offset add is out of bounds, false else
  ///
  
  checkCollision(shape, offsetX, offsetY, offsetRotation)
  {
    // Init
    var collisionStatus = false;
    
    // Add offset (subtract at the end)
    shape.position.x += offsetX;
    shape.position.y += offsetY;
    
    shape.rotation += offsetRotation;
    
    // Each line
    for(let i = 0; (i < shape.height) && (collisionStatus === false); i++)
    {
      // Each brick of the line
      for(let j = 0; j < shape.width; j++)
      {
        if(shape.shape[i][j] instanceof Brick)
        {
          // Out of bound of the gameboard Y axis?
          if(((shape.position.y + i) < 0) ||
             ((shape.position.y + i) >= Gameboard.HEIGHT))
          {
            collisionStatus = true;
            
            break;
          }
          
          // Out of bound of the gameboard X axis?
          if(((shape.position.x + j) < 0) ||
             ((shape.position.x + j) >= Gameboard.WIDTH))
          {
            collisionStatus = true;
            
            break;
          }
          
          // Already a brick at this position?
          if(this.gameboard[shape.position.y + i][shape.position.x + j] instanceof Brick)
          {
            collisionStatus = true;
            
            break;
          }
        
        }
      }
    }
    
    // Subtract offset (restore the previous state)
    shape.position.x -= offsetX;
    shape.position.y -= offsetY;
    
    shape.rotation -= offsetRotation;
    
    // Return
    return collisionStatus;
  }
  
  ///
  /// \fn removeCompletedLine()
  ///
  /// \brief Remove completed line
  ///
  
  removeCompletedLines()
  {
    let nbLineRemoved = 0;

    // Parse all line of the gameboard
    for(let i = 0; i < Gameboard.HEIGHT; i++)
    {
      let flagLineCompleted = true;
      
      // The line length is too small, line is not completed
      if(this.gameboard[i].length < Gameboard.WIDTH)
      {
          flagLineCompleted = false;
          continue;
      }
      
      // Parse all the line
      for(let brick of this.gameboard[i])
      {
        // Hole in the line, line is not completed
        if((brick instanceof Brick) === false)
        {
          flagLineCompleted = false;
          break;
        }
      }

      // The line is complete, remove it
      if(flagLineCompleted === true)
      {
        nbLineRemoved++;
        
        // Remove line in the array
        this.gameboard.splice(i, 1);
        
        // Add a new empty line (array) at gameboard position 0: everything is move to the bottom
        this.gameboard.addAt(0, new Array());   
      }
        
    }

    // Return
    return nbLineRemoved;
  }
  
  ///
  /// \fn checkIfLost()
  ///
  /// \brief Check if the game is lost
  ///
  /// \return Return true if the game is lost: the next shape don't have enough free space (collision), false else
  ///
  
  checkIfLost()
  {
    // Lost?
    if(this.checkCollision(this.currentShape, 0, 0, 0) === true)
    {
      // Lost: the next shape <currentShape> don't have enough free space (collision)
      return true;
    }
    
    // Not lost
    return false;
  }
  
  ///
  /// \fn moveDownCurrentShape()
  ///
  /// \brief Move *down* the current shape
  ///
  /// \return Return -1 if the move down is possible, the number of new lines make else
  ///
  
  moveDownCurrentShape()
  {
    // Try to move down the current shape
    if(this.moveCurrentShape(0, 1, 0) === true)
    {
      // Move down OK
      return -1;
    }
    
    // No! We can *not* move the current shape
    this.copyShape(this.currentShape); // Copy current shape into the gameboard
    
    let nbNewLines = this.removeCompletedLines();
    
    return nbNewLines;
  }
  
  ///
  /// \fn moveCurrentShape()
  ///
  /// \brief If possible move the current shape of specified offsets/rotation and redraw the gameboard
  ///
  /// \param offsetX Move to apply to X axis
  /// \param offsetY Move to apply to Y axis
  /// \param rotation Rotation to apply
  ///
  /// \return true if the move is possible, false else
  ///
  
  moveCurrentShape(offsetX, offsetY, rotation)
  {
    // Can we move the current shape?
    if(this.checkCollision(this.currentShape, offsetX, offsetY, rotation) === false)
    {
      // Yes!
      this.currentShape.position.x += offsetX;
      this.currentShape.position.y += offsetY;
      this.currentShape.rotation += rotation;
      
      this.draw();
      
      return true;
    }
    
    // No! Move is invalid
    return false;
  }
  
  ///
  /// \fn draw()
  ///
  /// \brief Draw the gameboard on his drawing area
  ///
  
  draw()
  {
    // Clear drawing area
    this.drawingArea.clear();

    // Draw current shape
    this.currentShape.draw(this.drawingArea);

    // Draw bricks of the gameboard
    for(let i = 0; i < Gameboard.HEIGHT; i++)
    {
      for(let j = 0; j < Gameboard.WIDTH; j++)
      {
        if((this.gameboard[i][j] instanceof Brick) === true)
        {
          this.gameboard[i][j].draw(this.drawingArea, new Position(j, i));
        }
      }
    }
  }
  
  ///
  /// \fn gameboard()
  ///
  /// \brief Get accessor for the gameboard propertie
  ///
  /// \return gameboard object
  ///
  
  get gameboard()
  {
    // Verify propertie initialization
    if(this.mGameboard === "undefined")
    {
      throw "Propertie gameboard is undefined";
    }
    
    // Return propertie value
    return this.mGameboard;
  }
  
  ///
  /// \fn gameboard(newGameboard)
  ///
  /// \brief Set accessor for the gameboard propertie
  ///
  /// \param newGameboard New gameboard (array)
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set gameboard(newGameboard)
  {
    // Parameter verification
    if((newGameboard instanceof Array) === false)
    {
      throw "<newGameboard> is not an instance of Array";
    }
    
    // Affectation
    this.mGameboard = newGameboard;
  }
  
  ///
  /// \fn currentShape()
  ///
  /// \brief Get accessor for the currentShape propertie
  ///
  /// \return currentShape object
  ///
  
  get currentShape()
  {
    // Verify propertie initialization
    if(this.mCurrentShape === "undefined")
    {
      throw "Propertie currentShape is undefined";
    }
    
    // Return propertie value
    return this.mCurrentShape;
  }
  
  ///
  /// \fn currentShape(newCurrentShape)
  ///
  /// \brief Set accessor for the currentShape propertie
  ///
  /// \param newCurrentShape New current shape
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set currentShape(newCurrentShape)
  {
    // Parameter verification
    if((newCurrentShape instanceof Shape) === false)
    {
      throw "<newCurrentShape> is not an instance of Shape";
    }
    
    // Affectation
    this.mCurrentShape = newCurrentShape;
    
    // Set it on the center of X axis and on the top of Y axis
    this.currentShape.centerAxisX(Gameboard.WIDTH);
    this.currentShape.position.y = 0;
    
    // Draw it: update drawing area
    this.draw();
  }
  
  ///
  /// \fn drawingArea()
  ///
  /// \brief Get accessor for the drawingArea propertie
  ///
  /// \return drawingArea object
  ///
  
  get drawingArea()
  {
    // Verify propertie initialization
    if(this.mDrawingArea === "undefined")
    {
      throw "Propertie drawingArea is undefined";
    }
    
    // Return propertie value
    return this.mDrawingArea;
  }
  
  ///
  /// \fn drawingArea(newDrawingArea)
  ///
  /// \brief Set accessor for the drawingArea propertie
  ///
  /// \param newDrawingArea New drawing area
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set drawingArea(newDrawingArea)
  {
    // Parameter verification
    if((newDrawingArea instanceof DrawingArea) === false)
    {
      throw "<newDrawingArea> is not an instance of DrawingArea";
    }
    
    // Affectation
    this.mDrawingArea = newDrawingArea;
  }
  
}
