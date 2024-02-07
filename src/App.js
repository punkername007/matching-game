import { useState, useEffect } from "react";

// 0 define constants
const width = 8;
const circleColors = ["brown", "wheat", "navy", "lightgreen", "yellow", "pink"];

function App() {
  // 3. Create a State for the board content
  const [currentBoard, setCurrentBoard] = useState([]);

  function checkRowOfFour() {
    for (let i = 0; i < currentBoard.length; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const rowColor = currentBoard[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 61, 62, 63,
      ];

      if (notValid.includes(i)) continue;

      if (rowOfFour.every((circle) => currentBoard[circle] === rowColor)) {
        rowOfFour.forEach((circle) => (currentBoard[circle] = "green"));
      }
    }
  }
  function checkRowOfThree() {
    for (let i = 0; i < currentBoard.length; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const rowColor = currentBoard[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ];

      if (notValid.includes(i)) continue;

      if (rowOfThree.every((circle) => currentBoard[circle] === rowColor)) {
        rowOfThree.forEach((circle) => (currentBoard[circle] = "white"));
      }
    }
  }

  // 10. Check when there's a combination fo four
  function checkColumnOfFour() {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const columnColor = currentBoard[i];

      if (
        columnOfFour.every((circle) => currentBoard[circle] === columnColor)
      ) {
        columnOfFour.forEach((circle) => (currentBoard[circle] = "green"));
      }
    }
  }

  // 6. Check when there's a combination of three
  function checkColumnOfThree() {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const columnColor = currentBoard[i];

      if (
        columnOfThree.every((circle) => currentBoard[circle] === columnColor)
      ) {
        columnOfThree.forEach((circle) => (currentBoard[circle] = "white"));
      }
    }
  }

  // 1. Create the game board
  // Choose a random color of the color's list times the chosen ammount of elements

  function createBoard() {
    const circlesArrangement = [];
    for (let i = 0; i < width * width; i++) {
      let randomColor =
        circleColors[Math.floor(Math.random() * circleColors.length)];
      circlesArrangement.push(randomColor);
    }
    // 4. Set the board content distribution
    setCurrentBoard(circlesArrangement);
  }

  // 2. Create the game board only once.
  useEffect(() => {
    createBoard();
  }, []);

  // 7 Create an interval
  // check the three combination every second
  useEffect(() => {
    const timer = setInterval(() => {
      checkRowOfFour();
      checkColumnOfFour();
      checkColumnOfThree();
      checkRowOfThree();
      // 8. update the board every second filling the spaces
      setCurrentBoard([...currentBoard]);
    }, 100);

    // 9. Clear the interval
    return () => clearInterval(timer);
  }, [
    checkRowOfFour,
    checkColumnOfFour,
    checkRowOfThree,
    checkColumnOfThree,
    currentBoard,
  ]);

  return (
    <div className="App">
      <div className="Game">
        {/* 5. Loop through each element in the board content anc create an element on screen */}
        {currentBoard.map(function (color, index) {
          return (
            <img key={index} style={{ backgroundColor: color }} alt={color} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
