import { useState } from 'react';

function Create({ values, onSClick }) 
{
  return (
    <button className="box" onClick={onSClick}>
      {values}
    </button>
  );
}

function Box({ next, boxs, play }) 
{
  function handle(i) 
  {
    if (calculateMoves(boxs) || boxs[i]) 
    {
      return;
    }
    const nextBoxes = boxs.slice();
    if (next) 
    {
      nextBoxes[i] = 'X';
    } else 
    {
      nextBoxes[i] = 'O';
    }
    play(nextBoxes);
  }

  const win = calculateMoves(boxs);
  let top;
  if (win) 
  {
    top = 'Winner: ' + win;
  } else 
  {
    top = 'Next player: ' + (next ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{top}</div>
      <div className="board-row">
        <Create values={boxs[0]} onSClick={() => handle(0)} />
        <Create values={boxs[1]} onSClick={() => handle(1)} />
        <Create values={boxs[2]} onSClick={() => handle(2)} />
      </div>
      <div className="board-row">
        <Create values={boxs[3]} onSClick={() => handle(3)} />
        <Create values={boxs[4]} onSClick={() => handle(4)} />
        <Create values={boxs[5]} onSClick={() => handle(5)} />
      </div>
      <div className="board-row">
        <Create values={boxs[6]} onSClick={() => handle(6)} />
        <Create values={boxs[7]} onSClick={() => handle(7)} />
        <Create values={boxs[8]} onSClick={() => handle(8)} />
      </div>
    </>
  );
}

export default function Board() 
{
  const [past, setPast] = useState([Array(9).fill(null)]);
  const [current, setCurrent] = useState(0);
  const next = current % 2 === 0;
  const currentBoxes = past[current];

  function player(nextBoxes) 
  {
    const nextHistory = [...past.slice(0, current + 1), nextBoxes];
    setPast(nextHistory);
    setCurrent(nextHistory.length - 1);
  }

  function jump (nextMoves) 
  {
    setCurrent(nextMoves);
  }

  const moves = past.map((boxs, move) => {
    let descrp;
    if (move > 0) 
    {
      descrp = 'Go to move #' + move;
    } else 
    {
      descrp = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jump (move)}>{descrp}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Box next={next} boxs={currentBoxes} play={player} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateMoves(boxs) {
  const row = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < row.length; i++) 
  {
    const [a, b, c] = row[i];
    if (boxs[a] && boxs[a] === boxs[b] && boxs[a] === boxs[c]) 
    {
      return boxs[a];
    }
  }
  return null;
}

