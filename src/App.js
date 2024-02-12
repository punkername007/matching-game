// import ScoreBoard from "./components/ScoreBoard";
import Board from "./components/Board/Board";

// // 0 define constants
const width = 8;
const circleColors = [
  "radial-gradient(circle at 10% 20%, rgb(220, 220, 220) 5%, rgb(165, 42, 42) 90.2%)",
  "radial-gradient(circle at 10% 20%, rgb(220, 220, 220) 5%, rgb(245, 222, 179) 90.2%)",
  "radial-gradient(circle at 10% 20%, rgb(220, 220, 220) 5%, rgb(0, 0, 100) 90.2%)",
  "radial-gradient(circle at 10% 20%, rgb(220, 220, 220) 5%, rgb(144, 238, 144) 90.2%)",
  "radial-gradient(circle at 10% 20%, rgb(220, 220, 220) 5%, rgb(255, 255, 0) 90.2%)",
  "radial-gradient(circle at 10% 20%, rgb(220, 220, 220) 5%, rgb(255, 192, 203) 90.2%)",
  "radial-gradient(circle at 10% 20%, rgb(220, 220, 220) 5%, rgb(64, 64, 200) 90.2%)",
  "radial-gradient(circle at 10% 20%, rgb(220, 220, 220) 5%, rgb(255, 20, 40) 90.2%)",
];

//   function checkRowOfFour() {
//     for (let i = 0; i < currentBoard.length; i++) {
//       const rowOfFour = [i, i + 1, i + 2, i + 3];
//       const rowColor = currentBoard[i];
//       const notValid = [
//         5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
//         54, 55, 61, 62, 63,
//       ];
//       const isBlank = currentBoard[i] === "";

//       if (notValid.includes(i)) continue;

//       if (
//         rowOfFour.every(
//           (circle) => currentBoard[circle] === rowColor && !isBlank
//         )
//       ) {
//         setScoreDisplay((score) => score + 4);
//         rowOfFour.forEach((circle) => (currentBoard[circle] = ""));
//         return true;
//       }
//     }
//   }

//   function checkRowOfThree() {
//     for (let i = 0; i < currentBoard.length; i++) {
//       const rowOfThree = [i, i + 1, i + 2];
//       const rowColor = currentBoard[i];
//       const notValid = [
//         6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
//       ];
//       const isBlank = currentBoard[i] === "";

//       if (notValid.includes(i)) continue;

//       if (
//         rowOfThree.every(
//           (circle) => currentBoard[circle] === rowColor && !isBlank
//         )
//       ) {
//         setScoreDisplay((score) => score + 3);
//         rowOfThree.forEach((circle) => (currentBoard[circle] = ""));
//         return true;
//       }
//     }
//   }

//   }

//
//

function App() {
  return (
    <div className="App">
      <Board width={width} elements={circleColors} />
    </div>
  );
}

export default App;
