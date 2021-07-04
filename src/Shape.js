"use strict";

///
/// \class Shape
///
/// \brief Represents a shape
///

class Shape
{
  
  ///
  /// \fn createRotation()
  ///
  /// \brief Rotate of 90° the shape given in parameter
  ///
  /// \param shape Shape to rotate (array)
  ///
  /// \return Return a new array with the rotated shape
  ///
  
  static createRotation(shapeData)
  {
    // Init
    var newRotation = new Array();
    
    var shapeDataHeight = shapeData.length;
    var shapeDataWidth = shapeData[0].length;

    for(let i = 0; i < shapeDataWidth; i++) // The number of column become the number of line
    {
      newRotation[i] = new Array();
    }

    // Process
    for(let inY = 0; inY < shapeDataHeight; inY++) // Parse lines of index inY
    {
      for(let inX = 0; inX < shapeDataWidth; inX++) // Parse each position in the current line inY
      {
        let outY = inX;
        let outX = (shapeDataHeight - 1) - inY;   // -1 because for a height of 10 the indexes are 0 to 9 included
        
        newRotation[outY][outX] = shapeData[inY][inX];
      }
    }

    // Return
    return newRotation;
  }
  
  ///
  /// \fn constructor()
  ///
  /// \brief Constructor
  ///
  /// \param position **Logic** position of the shape
  ///
  
  constructor(position)
  {
    this.position = position;
    this.color = this.getRandomColor();
    
    this.rotation = 0;
  }
  
  ///
  /// \fn width()
  ///
  /// \brief Return the width of the shape (in number of bricks) with the current rotation
  ///
  /// \return Return the width of the shape (in number of bricks) with the current rotation
  ///
  
  get width()
  {
    return this.shape[0].length;
  }
  
  ///
  /// \fn height()
  ///
  /// \brief Return the height of the shape (in number of bricks) with the current rotation
  ///
  /// \return Return the height of the shape (in number of bricks) with the current rotation
  ///
  
  get height()
  {
    return this.shape.length;
  }
  
  ///
  /// \fn shape()
  ///
  /// \brief Return the shape data with the current rotation
  ///
  /// \return Return the shape data with the current rotation
  ///
  
  get shape()
  {
    return this.shapeData[this.rotation];
  }
  
  ///
  /// \fn getRandomColor()
  ///
  /// \brief Return a random color
  ///
  /// \return Return a random color
  ///
  
  getRandomColor()
  {
    var colorsList = ["Crimson", "LimeGreen", "CornflowerBlue", "DarkOrchid", "Gold"];
    
    var randomIndex = Math.getRandomInt(0, colorsList.length - 1);
    
    return colorsList[randomIndex];
  }
  
  ///
  /// \fn moveLeft()
  ///
  /// \brief Moves one position to the left
  ///
  
  moveLeft()
  {
    this.position.x = this.position.x - 1;
  }
  
  ///
  /// \fn moveRight()
  ///
  /// \brief Moves one position to the right
  ///
  
  moveRight()
  {
    this.position.x = this.position.x + 1;
  }
  
  ///
  /// \fn moveDown()
  ///
  /// \brief Moves down of one position
  ///
  
  moveDown()
  {
    this.position.y = this.position.y + 1;
  }
  
  ///
  /// \fn centerAxisX()
  ///
  /// \brief Set the X position to the center of an X axis of width <logicWidth>
  ///
  /// \param logicWidth Logic width of the axis to center on
  ///
  
  centerAxisX(logicWidth)
  {
    // Parameter verification
    if(Number.isSafeInteger(logicWidth) === false)
    {
      throw "<logicWidth> is not an integer";
    }
    
    if((logicWidth < 1) || (logicWidth > 1000))
    {
      throw "<logicWidth> is lesser than zero or greater than 1000";
    }
    
    // Center    
    this.position.x = Math.floor(logicWidth / 2) - Math.floor(this.width / 2);
  }
  
  ///
  /// \fn centerAxisY()
  ///
  /// \brief Set the Y position to the center of an Y axis of height <logicHeight>
  ///
  /// \param logicHeight Logic height of the axis to center on
  ///
  
  centerAxisY(logicHeight)
  {
    // Parameter verification
    if(Number.isSafeInteger(logicHeight) === false)
    {
      throw "<logicHeight> is not an integer";
    }
    
    if((logicHeight < 1) || (logicHeight > 1000))
    {
      throw "<logicHeight> is lesser than zero or greater than 1000";
    }
    
    // Center
    this.position.y = Math.floor(logicHeight / 2) - Math.floor(this.height / 2);
  }
  
  ///
  /// \fn draw()
  ///
  /// \brief Draw the shape on the drawing area
  ///
  /// \param drawingArea Drawing area where draw the shape
  ///
  
  draw(drawingArea)
  {
    // Verify parameter
    if((drawingArea instanceof DrawingArea) === false)
    {
      throw "<drawingArea> is not an instance of DrawingArea";
    }
    
    // Draw
    for(let i = 0; i < this.height; i++)
    {
      for(let j = 0; j < this.width; j++)
      {
        if((this.shape[i][j] instanceof Brick) === true)
        {
          // Draw the brick [i][j]
          let brickPosition = new Position(this.position.x + j, this.position.y + i);
          
          this.shape[i][j].draw(drawingArea, brickPosition, this.color);
        }
      }
    }
  }
  
  ///
  /// \fn shapeData()
  ///
  /// \brief Return the shape data array of size 4: one for each rotation
  ///
  /// \return Return the shape data array of size 4: one for each rotation
  ///
  
  get shapeData()
  {
    // Verify propertie initialization
    if(this.mShapeData === "undefined")
    {
      throw "mShapeData propertie is undefined";
    }
    
    return this.mShapeData;
  }
  
  ///
  /// \fn shapeData(newShapeData)
  ///
  /// \brief Set accessor for the shapeData propertie
  ///
  /// \param newShapeData New shape data (array of size 4: one for each rotation)
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set shapeData(newShapeData)
  {
    // Parameter verification
    if((newShapeData instanceof Array) === false)
    {
      throw "<newShapeData> is not an instance of Array";
    }
    
    // Affectation
    this.mShapeData = newShapeData;
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
      throw "color propertie is undefined";
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
    if((typeof newColor) !== "string")
    {
      throw "<newcolor> is not a string";
    }
    
    // Affectation
    this.mColor = newColor;
  }
  
  ///
  /// \fn position()
  ///
  /// \brief Get accessor for the position propertie
  ///
  /// \return position object
  ///
  
  get position()
  {
    // Verify propertie initialization
    if(this.mPosition === "undefined")
    {
      throw "Propertie position is undefined";
    }
    
    // Return propertie value
    return this.mPosition;
  }
  
  ///
  /// \fn position(newPosition)
  ///
  /// \brief Set accessor for the position propertie
  ///
  /// \param newPosition New position
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set position(newPosition)
  {
    // Parameter verification
    if((newPosition instanceof Position) === false)
    {
      throw "<newPosition> is not an instance of Position";
    }
    
    // Affectation
    this.mPosition = newPosition;
  }
  
  ///
  /// \fn rotation()
  ///
  /// \brief Get accessor for the rotation propertie
  ///
  /// \return rotation value
  ///
  
  get rotation()
  {
    // Verify propertie initialization
    if(this.mRotation === "undefined")
    {
      throw "rotation propertie is undefined";
    }
    
    // Return propertie value
    return this.mRotation;
  }
  
  ///
  /// \fn rotation(newRotation)
  ///
  /// \brief Set accessor for the rotation propertie
  ///
  /// \param newRotation New rotation : integer between 0 and 3 included for 0° / 90° / 180° / 270° rotation
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set rotation(newRotation)
  {
    // Parameter verification
    if(Number.isSafeInteger(newRotation) === false)
    {
      throw "<newRotation> is not an integer";
    }
    
    if(newRotation < 0)
    {
      newRotation = 3;
      console.log("set rotation(newRotation): <newRotation> set to 3 because less than zero");
    }
    
    if(newRotation > 3)
    {
      newRotation = 0;
      console.log("set rotation(newRotation): <newRotation> set to 0 because greater than than three");
    }
    
    // Affectation
    this.mRotation = newRotation;
  }
  
}
