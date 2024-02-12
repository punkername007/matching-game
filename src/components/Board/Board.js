import { useState, useEffect } from "react";

export default function Board(props) {
  const [elementsDistribution, setElementsDistribution] = useState([]);
  const [elementDragged, setElementDragged] = useState(null);
  const [elementReplaced, setElementReplaced] = useState(null);

  // 0 global set variables
  let widthValue = `${props.width * 100}px`;
  let boardElements = props.elements;
  let boardWidth = props.width;

  // 6. Set Drag and Drop
  const dragStart = (event) => {
    setElementDragged(event.target);
  };
  const dragDrop = (event) => {
    setElementReplaced(event.target);
  };

  const dragEnd = () => {
    let elementDraggedId = parseInt(elementDragged.getAttribute("element-id"));
    let elementReplacedId = parseInt(
      elementReplaced.getAttribute("element-id")
    );

    elementsDistribution[elementDraggedId] = elementReplaced.style.background;
    elementsDistribution[elementReplacedId] = elementDragged.style.background;

    const validMoves = [
      elementDraggedId + 1,
      elementDraggedId + boardWidth,
      elementDraggedId - 1,
      elementDraggedId - boardWidth,
    ];

    let isValidMove = validMoves.includes(elementReplacedId);
    let isColumnOfFour = quadrupleColumnMatch();
    let isRowOfFour = quadrupleRowMatch();
    let isColumnOfThree = tripleColumnMatch();
    let isRowOfThree = tripleRowMatch();

    if (
      elementReplacedId &&
      isValidMove &&
      (isColumnOfFour || isRowOfFour || isColumnOfThree || isRowOfThree)
    ) {
      setElementDragged(null);
      setElementReplaced(null);
    } else {
      elementsDistribution[elementDraggedId] = elementDragged.style.background;
      elementsDistribution[elementReplacedId] =
        elementReplaced.style.background;
      setElementsDistribution([...elementsDistribution]);
    }
  };

  // 7. Move elements to fill the board

  const fillBoard = () => {
    const firstRow = [];
    for (let e = 0; e < boardWidth; e++) {
      firstRow.push(e);
    }

    for (let i = 0; i <= boardWidth ** 2 - boardWidth; i++) {
      const isInFirstRow = firstRow.includes(i);

      if (isInFirstRow && elementsDistribution[i] === "transparent") {
        let newElement = Math.floor(Math.random() * boardElements.length);
        elementsDistribution[i] = boardElements[newElement];
      }

      if (elementsDistribution[i + boardWidth] === "transparent") {
        elementsDistribution[i + boardWidth] = elementsDistribution[i];
        elementsDistribution[i] = "transparent";
      }
      console.log(isInFirstRow);
    }
  };

  // 4. Check Column Combos

  // 4.1 Column match x4
  const quadrupleColumnMatch = () => {
    // loop each element of the board as a vertical column of fours
    for (let i = 0; i < boardWidth ** 2 - boardWidth * 3; i++) {
      // creates an array with the column elements positions
      let isBlank = elementsDistribution[i] === "transparent";
      let columnOfFour = [
        i,
        i + boardWidth,
        i + boardWidth * 2,
        i + boardWidth * 3,
      ];

      // obtaines the data from the element
      let columnColor = elementsDistribution[i];

      // loop every element position in the array and check if contains same data as the element
      if (
        columnOfFour.every(
          (element) => elementsDistribution[element] === columnColor && !isBlank
        )
      ) {
        // after the match, set elements to blank
        columnOfFour.forEach(
          (element) => (elementsDistribution[element] = "transparent")
        );
        return true;
      }
    }
  };

  // 4.2 Column match x3
  const tripleColumnMatch = () => {
    // loop each element of the board as a vertical column of threes
    for (let i = 0; i < boardWidth ** 2 - boardWidth * 2; i++) {
      let isBlank = elementsDistribution[i] === "transparent";
      // creates an array with the column elements positions
      let columnOfThree = [i, i + boardWidth, i + boardWidth * 2];
      // obtaines the data from the element
      let columnColor = elementsDistribution[i];

      // loop every element position in the array and check if contains same data as the element
      if (
        columnOfThree.every(
          (element) => elementsDistribution[element] === columnColor && !isBlank
        )
      ) {
        // after the match, set elements to blank{
        columnOfThree.forEach(
          (element) => (elementsDistribution[element] = "transparent")
        );
        return true;
      }
    }
  };

  // 4.3 Row match x4
  const quadrupleRowMatch = () => {
    for (let i = 0; i < boardWidth ** 2; i += boardWidth) {
      for (let e = 0; e < boardWidth - 3; e++) {
        let elementPosition = parseInt(e + i);
        let isBlank = elementsDistribution[elementPosition] === "transparent";

        let rowOfFours = [
          elementPosition,
          elementPosition + 1,
          elementPosition + 2,
          elementPosition + 3,
        ];
        let rowColor = elementsDistribution[elementPosition];
        if (
          rowOfFours.every(
            (element) => elementsDistribution[element] === rowColor && !isBlank
          )
        ) {
          rowOfFours.forEach(
            (element) => (elementsDistribution[element] = "transparent")
          );
          return true;
        }
      }
    }
  };
  // 4.4 Row match x3
  const tripleRowMatch = () => {
    for (let i = 0; i < boardWidth ** 2; i += boardWidth) {
      for (let e = 0; e < boardWidth - 2; e++) {
        let elementPosition = e + i;
        let isBlank = elementsDistribution[elementPosition] === "transparent";
        let rowOfThrees = [
          elementPosition,
          elementPosition + 1,
          elementPosition + 2,
        ];

        let rowColor = elementsDistribution[elementPosition];

        if (
          rowOfThrees.every(
            (element) => elementsDistribution[element] === rowColor && !isBlank
          )
        ) {
          rowOfThrees.forEach(
            (element) => (elementsDistribution[element] = "transparent")
          );
          return true;
        }
      }
    }
  };

  // 1. Create the game board
  const createBoard = () => {
    // create elements distributiom
    let elementsDistribution = [];

    for (let i = 0; i < boardWidth ** 2; i++) {
      let randomElement =
        boardElements[Math.floor(Math.random() * boardElements.length)];
      elementsDistribution.push(randomElement);
    }
    //create and set the board content distribution
    setElementsDistribution(elementsDistribution);
  };

  // 2. Create the game board only once.
  useEffect(() => {
    createBoard();
  }, []);

  // 5. Check combos every time and set distribution
  useEffect(() => {
    const timer = setInterval(() => {
      quadrupleColumnMatch();
      quadrupleRowMatch();
      tripleColumnMatch();
      tripleRowMatch();
      fillBoard();
      setElementsDistribution([...elementsDistribution]);
    }, 200);

    return () => clearInterval(timer);
  }, [
    quadrupleColumnMatch,
    quadrupleRowMatch,
    tripleColumnMatch,
    tripleRowMatch,
    fillBoard,
    elementsDistribution,
  ]);

  return (
    // 1.1 return the board and set its data
    <div className="Board" style={{ width: widthValue }}>
      {/* 3. Loop through each element in the board content anc create an element on screen */}
      {elementsDistribution.map((element, index) => (
        <div
          key={index}
          element-id={index}
          style={{ background: element }}
          // make ghe element draggable
          draggable={true}
          onDragStart={dragStart}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
          onDragEnter={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
        ></div>
      ))}
    </div>
  );
}
