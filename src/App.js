import { useState, useEffect } from "react";

const width = 8;
const circleColors = ["brown", "wheat", "navy", "lightgreen", "yellow", "pink"];

function App() {
  const [currentBoard, setCurrentBoard] = useState([]);

  function checkColumnOfThree() {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const columnColor = currentBoard[i];

      if (
        columnOfThree.every((circle) => currentBoard[circle] === columnColor)
      ) {
        columnOfThree.forEach((circle) => (currentBoard[circle] = ""));
      }
    }
  }

  function createBoard() {
    const circlesArrangement = [];
    for (let i = 0; i < width * width; i++) {
      let randomColor =
        circleColors[Math.floor(Math.random() * circleColors.length)];
      circlesArrangement.push(randomColor);
    }
    setCurrentBoard(circlesArrangement);
  }

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOfThree();
      setCurrentBoard([...currentBoard]);
    }, 100);

    return () => clearInterval(timer);
  }, [checkColumnOfThree, currentBoard]);

  return (
    <div className="App">
      <div className="Game">
        {currentBoard.map(function (color, index) {
          return (
            <img key={index} style={{ backgroundColor: color }} alt={color} />
          );
        })}
      </div>
      ;
    </div>
  );
}

export default App;
