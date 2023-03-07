const board = document.querySelector('#board');
const cells = document.querySelectorAll('div.cell');
const xClass = "x";
const oClass = "o";
const xArea = document.querySelector('.xArea');
const oArea = document.querySelector('.oArea');
const xScore = document.getElementById('xScore');
const oScore = document.getElementById('oScore');
const winScreen = document.querySelector('div#winScreen');
const winText = document.querySelector('.winText');
const restartButton = document.querySelector('.restartButton');
const winnerIcon = document.querySelector('lord-icon.winnerIcon');
let actualTurn, switchTurn = true, needChange = true;

const winningCombinatios = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const boardAi = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

const aiButton = document.querySelector('.turnOnIa');

const switchTurns = () =>{
  actualTurn = !actualTurn;

  if(actualTurn){
    xArea.classList.remove('topBorder');
    oArea.classList.add('topBorder');
  }
  else{
    oArea.classList.remove('topBorder');
    xArea.classList.add('topBorder');
  }
}

const setHoverEffect = () =>{
  board.classList.remove(xClass);
  board.classList.remove(oClass);

  if(actualTurn) board.classList.add(oClass);
  else board.classList.add(xClass);
}

const checkWin = (currentClass) =>{
  return winningCombinatios.some(combination =>{
    return combination.every(el =>{
      return cells[el].classList.contains(currentClass);
    })
  })
}

const checkDraw = () =>{
  return [...cells].every(cell =>{
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  })
}

const medalControl = (changeType) =>{
  const actualMedalPosition = document.querySelector('.winnerIconArea > div');
  actualMedalPosition.remove();

  let newMedalPosition = document.createElement('div');
  newMedalPosition.setAttribute('id', 'winnerIconControl')
  newMedalPosition.classList.add('winnerIcon');

  if(changeType)winnerIcon.after(newMedalPosition);
  else winnerIcon.before(newMedalPosition)

  winnerIcon.classList.remove('hide');
}

const endGame = (end, currentClass) =>{
  let xScoreValue = Number(xScore.outerText);
  let oScoreValue = Number(oScore.outerText);
  
  if(end){
    if(currentClass == xClass) xScore.innerHTML = '&nbsp;' + (xScoreValue += 1);
    else oScore.innerHTML = '&nbsp;' + (oScoreValue += 1);
    
    winText.innerText = `${actualTurn ? 'O' : 'X'} WINS!`;
    
    if(Math.abs(xScoreValue - oScoreValue) == 0) needChange = true;
    
    if(needChange){
      if(xScoreValue > oScoreValue) medalControl(true)
      else if(oScoreValue > xScoreValue) medalControl(false)
    }
  }
  else winText.innerText = 'Draw!';

  if(actualTurn != !switchTurn) switchTurns();
  
  winScreen.classList.remove('hide');
}

const placeMark = (cell, currentClass) =>{
  cell.classList.add(currentClass);
  updateBoard(cells);
  
  if(checkWin(currentClass)) endGame(true, currentClass);
  else if(checkDraw()) endGame(false);
  else{
    switchTurns();
    setHoverEffect();
  }
}

const handleClick = (e) =>{
  const cell = e.target;
  const currentClass = actualTurn ? oClass : xClass

  placeMark(cell, currentClass);
}

function typeOfGame(){
  if(aiButton.checked) startTheGameAi();
  else startTheGame();
}

const resetBoard = () =>{
  winScreen.classList.add('hide');

  actualTurn = switchTurn = !switchTurn;
  
  cells.forEach(cell =>{
    cell.classList.remove(oClass);
    cell.classList.remove(xClass);
    cell.removeEventListener('click', handleClick);
    cell.removeEventListener('click', handleClickAi);
  });
}

const startTheGame = () =>{
  resetBoard();

  cells.forEach(cell =>{
    cell.addEventListener('click', handleClick, { once: true });
  });

  setHoverEffect();
}

const handleClickAi = (e = null) =>{
  if(e == null || !e.target.classList.contains('o') && !e.target.classList.contains('x')){
    let currentClass = actualTurn ? oClass : xClass;
  
    if(currentClass == 'x'){
      const cell = e.target;
      placeMark(cell, currentClass)
    };
      
    if(!checkDraw() && !checkWin(xClass)){
      currentClass = actualTurn ? oClass : xClass;
      placeMark(aiMark(cells, boardAi), currentClass)
    }
  }
}

const startTheGameAi = () =>{
  resetBoard();

  cells.forEach(cell =>{
    cell.addEventListener('click', handleClickAi, { once: true });
  });
  
  setHoverEffect();
  
  if(actualTurn){
    setHoverEffect();
    handleClickAi();
  }
}

const newGame = () =>{
  switchTurn = true;
  currentClass = actualTurn ? oClass : xClass;

  xScore.innerHTML = '&nbsp;0';
  oScore.innerHTML = '&nbsp;0';

  typeOfGame();
}

restartButton.addEventListener('click', typeOfGame);
aiButton.addEventListener('change', newGame);

typeOfGame();