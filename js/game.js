const board = document.querySelector('.board');
const cells = document.querySelectorAll('div.cell');
const xClass = "x";
const oClass = "o";
const winningCombinatios = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]
const winScreen = document.querySelector('div.winScreen');
const winText = document.querySelector('.winText');
const restartButton = document.querySelector('.restartButton');
let actualTurn;

const switchTurns = () => actualTurn = !actualTurn;

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

const endGame = (end) =>{
  if(end) winText.innerText = `${actualTurn ? 'O' : 'X'} Wins!`;
  else winText.innerText = 'Draw!';
  
  winScreen.classList.remove('hide');
}

const placeMark = (cell, currentClass) =>{
  cell.classList.add(currentClass);

  if(checkWin(currentClass)) endGame(true);
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

const startTheGame = () =>{
  winScreen.classList.add('hide');

  actualTurn = false;

  cells.forEach(cell =>{
    cell.classList.remove(oClass);
    cell.classList.remove(xClass);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });

  setHoverEffect();
}

restartButton.addEventListener('click', startTheGame);

startTheGame();