const token = ['o', 'x'];
let player = 0;

const updateBoard = (cells) =>{
  let newFormation = [];
  
  [...cells].forEach((cell) => {
    if(cell.classList.contains('x')) newFormation.push('x');
    else if(cell.classList.contains('o')) newFormation.push('o');
    else newFormation.push('')
  });
  
  for(let i = 0; i < 3; i++)
    for(let j = 0; j < 3; j++)
      boardAi[i][j] = newFormation.shift();
}

let scores = {
  tie: 0,
  o: 10,
  x: -10
}

let checkWinAi = (boardAi) =>{
  let winner = null;

  for(let i = 0; i < 3; i++)
    if(boardAi[i][0] == boardAi[i][1] && boardAi[i][1] == boardAi[i][2] && boardAi[i][0] != '') winner = boardAi[i][0];
  
  for(let i = 0; i < 3; i++)
    if(boardAi[0][i] == boardAi[1][i] && boardAi[1][i] == boardAi[2][i] && boardAi[0][i] != '') winner = boardAi[0][i];  

  for(let i = 0; i < 3; i++)
    if(boardAi[0][0] == boardAi[1][1] && boardAi[1][1] == boardAi[2][2] && boardAi[0][0] != '') winner = boardAi[0][0];

  for(let i = 0; i < 3; i++)
    if(boardAi[0][2] == boardAi[1][1] && boardAi[1][1] == boardAi[2][0] && boardAi[i][0] != '') winner = boardAi[2][0];

  let openSpots = 0;
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if(boardAi[i][j] == '') openSpots++;
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

const minimax = (boardAi, depth, isMaximizing) =>{
  let result = checkWinAi(boardAi);

  if(result) return scores[result];

  if(isMaximizing){
    let bestValue = -Infinity

    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++)
        if(boardAi[i][j] == ''){
          boardAi[i][j] = oClass;
          let value = minimax(boardAi, depth + 1, false);
          boardAi[i][j] = '';
          if(value > bestValue) bestValue = value;
        }
    
    return bestValue;
  }
  else{
    let bestValue = Infinity

    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++)
        if(boardAi[i][j] == ''){
          boardAi[i][j] = xClass;
          let value = minimax(boardAi, depth + 1, true);
          boardAi[i][j] = '';
          if(value < bestValue) bestValue = value;
        }
    
    return bestValue;
  }
}

const aiMove = (boardAi) =>{
  let bestValue = -Infinity, move = {i: 0, j: 0};

  for(let i = 0; i < 3; i++)
    for(let j = 0; j < 3; j++)
      if(boardAi[i][j] == ''){

        boardAi[i][j] = oClass;
        let value = minimax(boardAi, 0, false);
        boardAi[i][j] = '';

        if(value > bestValue){
          bestValue = value;
          move = { i, j }
        }
      }

  return move;
}

const aiMark = (cells, boardAi) =>{
  let move = aiMove(boardAi);

  return cells[move.i * 3 + move.j]
}