/*----- constants -----*/
const boardSize = 20; // 20 squares by 20 squares

const numOfCells = boardSize ** 2;
for (let i = 1; i <= numOfCells; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("id", `${i}`);
  board.appendChild(cell);
}

/*----- state variables -----*/
let snakePosition, snakeArray, foodPosition, IsGameOver, direction;
let prevPositionArray = [];

/*----- cached elements  -----*/
// let board = document.getElementById('board');
// let cells1 = document.querySelectorAll('.cell');
let cells = [...document.querySelectorAll(".cell")];

/*----- event listeners -----*/

document.addEventListener("keydown", handleKeys);

/*----- functions -----*/

function randomizePosition() {
  return Math.floor(Math.random() * numOfCells);
}

function initialize() {
  snakeArray = [1]; // gets longer by pushing 1 into it
  // snakeLength = 1; - probably don't need?
  IsGameOver = false;
  initializeFoodPosition();
  initializeSnakePosition();
  // render functions here to update all the states in the DOM
}

initialize();

function initializeFoodPosition() {
  foodPosition = randomizePosition();
  // cells[foodPosition].style.backgroundColor = 'red';
  cells[foodPosition].classList.add("food");
}

function initializeSnakePosition() {
  snakePosition = randomizePosition();
  // cells[snakePosition].style.backgroundColor = 'green';
  cells[snakePosition].classList.add("snake");
}

// let intervalId = setInterval(moveLeft, 500) - put this in the move updownleftright functions
let intervalId;
function handleKeys(e) {
  if (IsGameOver) return;

  const key = e.key;
  switch (key) {
    case "ArrowLeft":
      if (direction === "left" || direction === "right") return;
      direction = "left";
      break;
    case "ArrowRight":
      if (direction === "left" || direction === "right") return;
      direction = "right";
      break;
    case "ArrowUp":
      if (direction === "up" || direction === "down") return;
      direction = "up";
      break;
    case "ArrowDown":
      if (direction === "up" || direction === "down") return;
      direction = "down";
      break;
  }
}

intervalId = setInterval(function () {
  eat(snakePosition);

            // const eatenFlag = eat(snakePosition);
            // if (!eatenFlag) {
            //   let removed = prevPositionArray.shift();
            //   cells[removed].classList.remove("snake");
            // }

  if (direction === "left") {
    cells[snakePosition].classList.remove("snake");
    let storedPrevPos = snakePosition;
    snakePosition -= 1;
    checkCollision(storedPrevPos);
    prevPositionArray.push(snakePosition);
    prevPositionArray.forEach((pos) => {
      cells[pos].classList.remove("snake");
    });
    // console.log(prevPositionArray)
    prevPositionArray = prevPositionArray.slice(-snakeArray.length);
            // const eatenFlag = eat(snakePosition);
            // if (!eatenFlag) {
            //   let removed = prevPositionArray.shift();
            //   cells[removed].classList.remove("snake");
            // }
    // console.log(removed)
    // console.log(prevPositionArray)
    prevPositionArray.forEach((pos) => {
      cells[pos].classList.add("snake");
    });
  } else if (direction === "right") {
    cells[snakePosition].classList.remove("snake");
    let storedPrevPos = snakePosition;
    snakePosition += 1;
    checkCollision(storedPrevPos);
    prevPositionArray.push(snakePosition);
    prevPositionArray.forEach((pos) => {
      cells[pos].classList.remove("snake");
    });
    prevPositionArray = prevPositionArray.slice(-snakeArray.length);
    prevPositionArray.forEach((pos) => {
      cells[pos].classList.add("snake");
    });
  } else if (direction === "up") {
    cells[snakePosition].classList.remove("snake");
    snakePosition -= 20;
    checkCollision();
    prevPositionArray.push(snakePosition);
    prevPositionArray.forEach((pos) => {
      cells[pos].classList.remove("snake");
    });
    prevPositionArray = prevPositionArray.slice(-snakeArray.length);
    prevPositionArray.forEach((pos) => {
      cells[pos].classList.add("snake");
    });
  } else if (direction === "down") {
    cells[snakePosition].classList.remove("snake");
    snakePosition += 20;
    checkCollision();
    prevPositionArray.push(snakePosition);
    prevPositionArray.forEach((pos) => {
      cells[pos].classList.remove("snake");
    });
    prevPositionArray = prevPositionArray.slice(-snakeArray.length);
    prevPositionArray.forEach((pos) => {
      cells[pos].classList.add("snake");
    });
  }
}, 300);

function eat(currentSnakePosition) {
    if (currentSnakePosition === foodPosition) {
        snakeArray.push(1);
        cells[foodPosition].classList.remove("food");
        initializeFoodPosition();

        return true;
    }
    return false;
}

function checkCollision(storedPrevPos) {
  if (
    snakePosition < 0 || // checking upper edge
    snakePosition > 399 || // checking lower edge
    (storedPrevPos % 20 === 0 && direction === "left") || // checking left edge
    ((storedPrevPos + 1) % 20 === 0 && direction === "right") || // checking right edge
    cells[snakePosition].classList.contains("snake") // checking body collision
  ) {
    console.log("Game over");
    // if (snakePosition < 0) console.log("game over up")
    // if (snakePosition > 399) console.log("game over down")
    // if (snakePosition % 20 === 0 && direction === "left") console.log("game over left")
    // if ((snakePosition+1) % 20 === 0 && direction === "right") console.log("game over right")
    // if (cells[snakePosition].classList.contains('snake')) console.log("game over body")
    // IsGameOver = true;
  }
}
