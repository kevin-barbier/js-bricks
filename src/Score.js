"use strict";

///
/// \class Score
///
/// \brief Class who manage the score
///

class Score
{
  
  // Static constants
    
  /// \fn SCORE_MAX()
  /// \brief [**STATIC CONSTANT**] Maximum value of the score
    
  static get SCORE_MAX()         { return 1000; }
  
  /// \fn NB_LINE_MAX()
  /// \brief [**STATIC CONSTANT**] Maximum value of the number of line
  
  static get NB_LINE_MAX()       { return 1000; }
  
  /// \fn LEVEL_MAX()
  /// \brief [**STATIC CONSTANT**] Maximum value of the level
  
  static get LEVEL_MAX()         { return 9; }
  
  /// \fn LINE_PER_LEVEL()
  /// \brief [**STATIC CONSTANT**] Number of line for each next level
  
  static get LINE_PER_LEVEL()    { return 10; }
    
  ///
  /// \fn constructor()
  ///
  /// \brief Constructor
  ///
  /// \param textAreaScore Text area where to show the score
  /// \param textAreaNbLine Text area where to show the number of line
  /// \param textAreaLevel Text area where to show the level
  ///

  constructor(textAreaScore, textAreaNbLine, textAreaLevel)
  {
    this.textAreaScore = textAreaScore;
    this.textAreaNbLine = textAreaNbLine;
    this.textAreaLevel = textAreaLevel;
    
    this.reset();
  }
  
  ///
  /// \fn updateTextAreas()
  ///
  /// \brief Update the text areas with the current score, level and number of lines
  ///
  
  updateTextAreas()
  {
    this.textAreaScore.innerHTML = this.score;
    this.textAreaNbLine.innerHTML = this.nbLine;
    this.textAreaLevel.innerHTML = this.level;
  }
  
  ///
  /// \fn win()
  ///
  /// \brief The player made lines
  ///
  /// \param nbLineMade Number of line the player made
  ///
  /// \return false if the number of line made is invalid, true else
  /// 
  
  win(nbLineMade)
  {
    // Check error
    if((nbLineMade < 0) || (nbLineMade > 4))
    {
      return false;
    }
    
    // Process
    this.score = this.score + (nbLineMade * nbLineMade);
    
    this.nbLine = this.nbLine + nbLineMade;
    
    this.level = Math.floor((this.nbLine / Score.LINE_PER_LEVEL) + 1); // + 1 because the first level is 1 and not 0
    
    this.updateTextAreas();
    
    return true;
  }
  
  ///
  /// \fn reset()
  ///
  /// \brief Reset the score, number of line and level and update text areas
  ///
  
  reset()
  {
    this.score = 0;
    this.nbLine = 0;
    this.level = 1;
    
    this.updateTextAreas();
  }
  
  ///
  /// \fn score()
  ///
  /// \brief Get accessor for the score propertie
  ///
  /// \return score value
  ///
  
  get score()
  {
    // Verify propertie initialization
    if(this.mScore === "undefined")
    {
      throw "score propertie is undefined";
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
    // Parameter verification
    if(Number.isSafeInteger(newScore) === false)
    {
      throw "<newScore> is not an integer";
    }
    
    if((newScore < 0) || (newScore > Score.SCORE_MAX))
    {
      throw "Invalid <newScore> value: " + newScore;
    }
    
    // Affectation
    this.mScore = newScore;
  }
  
  ///
  /// \fn nbLines()
  ///
  /// \brief Get accessor for the nbLines propertie
  ///
  /// \return nbLines value
  ///
  
  get nbLines()
  {
    // Verify propertie initialization
    if(this.mNbLines === "undefined")
    {
      throw "nbLines propertie is undefined";
    }
    
    // Return propertie value
    return this.mNbLines;
  }
  
  ///
  /// \fn nbLines(newNbLines)
  ///
  /// \brief Set accessor for the nbLines propertie
  ///
  /// \param newNbLines New number of lines
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set nbLines(newNbLines)
  {
    // Parameter verification
    if(Number.isSafeInteger(newNbLines) === false)
    {
      throw "<newNbLines> is not an integer";
    }
    
    if((newNbLines < 0) || (newNbLines > Score.NB_LINES_MAX))
    {
      throw "Invalid <newNbLines> value: " + newNbLines;
    }
    
    // Affectation
    this.mNbLines = newNbLines;
  }
  
  ///
  /// \fn nbLines()
  ///
  /// \brief Get accessor for the nbLines propertie
  ///
  /// \return nbLines value
  ///
  
  get nbLines()
  {
    // Verify propertie initialization
    if(this.mNbLines === "undefined")
    {
      throw "nbLines propertie is undefined";
    }
    
    // Return propertie value
    return this.mNbLines;
  }
  
  ///
  /// \fn nbLines(newNbLines)
  ///
  /// \brief Set accessor for the nbLines propertie
  ///
  /// \param newNbLines New number of lines
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set nbLines(newNbLines)
  {
    // Parameter verification
    if(Number.isSafeInteger(newNbLines) === false)
    {
      throw "<newNbLines> is not an integer";
    }
    
    if((newNbLines < 0) || (newNbLines > Score.NB_LINES_MAX))
    {
      throw "Invalid <newNbLines> value: " + newNbLines;
    }
    
    // Affectation
    this.mNbLines = newNbLines;
  }
  
  ///
  /// \fn textArea()
  ///
  /// \brief Get accessor for the textArea propertie
  ///
  /// \return textArea object
  ///
  
  get textArea()
  {
    // Verify propertie initialization
    if(this.mTextArea === "undefined")
    {
      throw "textArea propertie is undefined";
    }
    
    // Return propertie value
    return this.mTextArea;
  }
  
  ///
  /// \fn textArea(newTextArea)
  ///
  /// \brief Set accessor for the textArea propertie
  ///
  /// \param newTextArea New text area
  ///
  /// \return true if the affectation have been completed without error, false else
  ///
  
  set textArea(newTextArea)
  {
    // Parameter verification
    if((newTextArea instanceof Object) === false)
    {
      throw "<newTextArea> is not an instance of Object";
    }
    
    // Affectation
    this.mTextArea = newTextArea;
  }
  
}
