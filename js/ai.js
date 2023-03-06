const boardAi = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

aiClass = 'o';

const avaiblePlays = (cells) =>{
  let avaibles = [];
  
  [...cells].forEach((cell) => {
    if(cell.classList.contains('x')) avaibles.push('x');
    else if(cell.classList.contains('o')) avaibles.push('o');
    else avaibles.push('')
  });
  
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      boardAi[i][j] = avaibles.shift();
    }
  }

  console.log(boardAi);
}

const minimax = () =>{
  return 1;
}

const bestMoves = () =>{
  let bestScore = -Infinity, bestMove;

  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if(boardAi[i][j] == ''){
        
        boardAi[i][j] = aiClass;
        let score = minimax();
        boardAi[i][j] = '';

        if(score > bestScore){
          bestScore = score;
          bestMove = (i * 3) + j;
        }

      }
    }
  }
  
  return bestMove;
}

const aiMark = (cells) =>{
  avaiblePlays(cells);
  const bestMark = bestMoves();

  console.log(bestMark);

  return cells[bestMark];
}
