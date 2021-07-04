/*
    Bricks is a tetris clone
    Copyright (C) 2016  Kevin BARBIER (kevin@kevin-barbier.org)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


"use strict";

///
/// \class Game
///
/// \brief Main class of the program
///

class Game
{
  
  ///
  /// \fn constructor()
  ///
  /// \brief Constructor
  ///
  
  constructor()
  {
    // Show controls
    document.getElementById("leftKey").innerHTML = cfg_KEYS.left;
    document.getElementById("rightKey").innerHTML = cfg_KEYS.right;
        
    document.getElementById("rotateKey").innerHTML = cfg_KEYS.rotate;
    document.getElementById("downKey").innerHTML = cfg_KEYS.down;
    
    document.getElementById("pauseKey").innerHTML = cfg_KEYS.pause;
    
    // Create score object
    this.score = new Score(document.getElementById("score"),
      document.getElementById("nbLine"),
      document.getElementById("level"));
    
    // Init the anonymous keyboard listener
    this.initKeyboardListener();
  }
  
  ///
  /// \fn initKeyboardListener()
  ///
  /// \brief Init keyboard listener who is attached/detached by attachKeyboardEvent/removeKeyboardEvent
  ///
  
  initKeyboardListener()
  {
    var game = this;
    
    this.keyboardListener = function(event)
    {
      game.processKeyboardEvent(event, game);
    }
  }
  
  ///
  /// \fn attachKeyboardEvent()
  ///
  /// \brief Attach the callback for all keypress events
  ///
  
  attachKeyboardEvent()
  {
    window.addEventListener("keypress", this.keyboardListener);                       
  }
  
  ///
  /// \fn removeKeyboardEvent()
  ///
  /// \brief Remove the callback for all keypress events
  ///
  
  removeKeyboardEvent()
  {
    window.removeEventListener('keypress', this.keyboardListener);
  }
  
  ///
  /// \fn pause()
  ///
  /// \brief Pause the game
  ///
  
  pause(game)
  {
    if(game.pauseStatus === false)
    {
      game.removeTimer();
      game.pauseStatus = true;
    }
    else
    {
      game.launchTimer();
      game.pauseStatus = false;
    }
  }
  
  ///
  /// \fn processKeyboardEvent()
  ///
  /// \brief Process keyboard events
  ///
  /// \param event Event keyboard received
  /// \param game Reference to game object
  ///
      
  processKeyboardEvent(event, game)
  {
    var character = Event.prototype.getCharacterFromEvent(event);

    // pause?
    if(character === cfg_KEYS.pause)
    {
      game.pause(game);
    }

    // other key if not in pause?
    else
    {
      if(this.pauseStatus === false)
      {
        // Left
        if(character === cfg_KEYS.left)
        {
          game.gameboard.moveCurrentShape(-1, 0, 0);
        }
        
        // Right
        else if(character === cfg_KEYS.right)
        {
          game.gameboard.moveCurrentShape(1, 0, 0);
        }
        
        // Down
        else if(character === cfg_KEYS.down)
        {
          game.gameboard.moveCurrentShape(0, 1, 0);
        }
        
        // Rotate
        else if(character === cfg_KEYS.rotate)
        {
          game.gameboard.moveCurrentShape(0, 0, 1);
        }
      }
    }
  }
  
  ///
  /// \fn launchTimer()
  ///
  /// \bried Launch the timer to move down the current shape
  ///
  
  launchTimer()
  {
    var delay = Math.floor(1000 - (this.score.level * 100));   // Max score.level = 9
    
    this.timerCurrentShape = window.setInterval(this.moveDownCurrentShape, delay, this);
  }
  
  ///
  /// \fn removeTimer()
  ///
  /// \brief Remove the timer to move down the current shape
  ///
  
  removeTimer()
  {
    window.clearTimeout(this.timerCurrentShape)
  }
  
  ///
  /// \fn moveDownCurrentShape()
  ///
  /// \brief Move down current shape
  ///
  /// \param game Game object
  ///
  
  moveDownCurrentShape(game)
  {
    var nbNewLines = game.gameboard.moveDownCurrentShape();
    
    if(nbNewLines >= 0)
    {
      // Update score
      game.score.win(nbNewLines);
      
      // New current shape is next shape
      game.gameboard.currentShape = game.nextShape.next();

      // No place for the new current shape? Game is lose!
      if(game.gameboard.checkIfLost() === true)
      {
        alert("You lose !!!");
        
        game.newGame();
      }
    }
  }
  
  ///
  /// \fn newGame()
  ///
  /// \brief Create a new game (reset everything)
  ///
      
  newGame()
  {
    this.removeTimer();
    this.removeKeyboardEvent();
    
    this.pauseStatus = false;
    
    this.score.reset();
    
    this.gameboard = new Gameboard("canvasGameboard");
    this.nextShape = new NextShape("canvasNextShape");
    
    this.gameboard.currentShape = this.nextShape.next();
    
    this.attachKeyboardEvent();
    this.launchTimer();
  }
  
  ///
  /// \fn pauseStatus()
  ///
  /// \brief Get accessor for the pauseStatus propertie
  ///
  /// \return pauseStatus value
  ///
  
  get pauseStatus()
  {
    // Verify propertie initialization
    if(this.mPauseStatus === "undefined")
    {
      throw "Propertie pauseStatus is undefined";
    }
    
    // Return propertie value
    return this.mPauseStatus;
  }
  
  ///
  /// \fn pauseStatus(newPauseStatus)
  ///
  /// \brief Set accessor for the pauseStatus propertie
  ///
  /// \param newPauseStatus New pause status
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set pauseStatus(newPauseStatus)
  {
    // Parameter verification
    if(typeof(newPauseStatus) !== "boolean")
    {
      throw "<newPauseStatus> is not a boolean";
    }
    
    // Affectation
    this.mPauseStatus = newPauseStatus;
  }
  
  ///
  /// \fn timerCurrentShape()
  ///
  /// \brief Get accessor for the timerCurrentShape propertie
  ///
  /// \return timerCurrentShape value (integer id)
  ///
  
  get timerCurrentShape()
  {
    // Verify propertie initialization
    if(this.mTimerCurrentShape === "undefined")
    {
      throw "Propertie timerCurrentShape is undefined";
    }
    
    // Return propertie value
    return this.mTimerCurrentShape;
  }
  
  ///
  /// \fn timerCurrentShape(newTimerCurrentShape)
  ///
  /// \brief Set accessor for the timerCurrentShape propertie
  ///
  /// \param newTimerCurrentShape New timer move down current shape (integer id)
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set timerCurrentShape(newTimerCurrentShape)
  {
    // Parameter verification
    if(Number.isSafeInteger(newTimerCurrentShape) === false)
    {
      throw "<newTimerCurrentShape> is not an integer";
    }
    
    // Affectation
    this.mTimerCurrentShape = newTimerCurrentShape;
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
    if((newGameboard instanceof Gameboard) === false)
    {
      throw "<newGameboard> is not an instance of Array";
    }
    
    // Affectation
    this.mGameboard = newGameboard;
  }
  
  ///
  /// \fn nextShape()
  ///
  /// \brief Get accessor for the nextShape propertie
  ///
  /// \return nextShape object
  ///
  
  get nextShape()
  {
    // Verify propertie initialization
    if(this.mNextShape === "undefined")
    {
      throw "Propertie nextShape is undefined";
    }
    
    // Return propertie value
    return this.mNextShape;
  }
  
  ///
  /// \fn nextShape(newNextShape)
  ///
  /// \brief Set accessor for the nextShape propertie
  ///
  /// \param newNextShape New next shape object
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set nextShape(newNextShape)
  {
    // Parameter verification
    if((newNextShape instanceof NextShape) === false)
    {
      throw "<newNextShape> is not an instance of NextShape";
    }
    
    // Affectation
    this.mNextShape = newNextShape;
  }
  
  ///
  /// \fn score()
  ///
  /// \brief Get accessor for the score propertie
  ///
  /// \return Ccore object
  ///
  
  get score()
  {
    // Verify propertie initialization
    if(this.mScore === "undefined")
    {
      throw "Propertie score is undefined";
    }
    
    // Return propertie value
    return this.mScore;
  }
  
  ///
  /// \fn score(newScore)
  ///
  /// \brief Set accessor for the score propertie
  ///
  /// \param newScore New score
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set score(newScore)
  {
    // Verify parameter
    if((newScore instanceof Score) === false)
    {
      throw "<newScore> is not an instance of Score";
    }
    
    // Affectation
    this.mScore = newScore;
  }
  
}
