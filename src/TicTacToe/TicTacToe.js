import React from "react";
import "./ticTacToe.css";

const TicTacToe = () => {
  const [turn, setTurn] = React.useState("X");
  const [cells, setCells] = React.useState(Array(9).fill(""));
  const [winner, setWinner] = React.useState();
  const checkWinner = (squares) => {
    const combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combo in combos) {
      combos[combo].forEach((element) => {
        if (
          squares[element[0]] === squares[element[1]] &&
          squares[element[1]] === squares[element[2]] &&
          squares[element[0]] !== ""
        ) {
          setWinner(squares[element[1]]);
        }
      });
    }
  };
  const handleClick = (num) => {
    let squares = cells;
    if (squares[num] !== "" || winner) {
      return;
    }
    if (turn === "X") {
      setTurn("O");
      squares[num] = "X";
    } else {
      setTurn("X");
      squares[num] = "O";
    }
    checkWinner(squares);
    setCells(squares);
  };
  const handleRestart = () => {
    setWinner();
    setCells(Array(9).fill(""));
    setTurn("X");
  };
  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };
  return (
    <div>
      <table>
        TURN : {turn}
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <>
          <p>{winner} is the Winner!</p>
          <button onClick={() => handleRestart()}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
