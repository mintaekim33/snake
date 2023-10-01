let board = document.getElementById('board');

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
let cells = [...document.querySelectorAll(".cell")];
let gameOverScreen = document.querySelector('.gameOverScreen');
let gameOverMsg = document.getElementById('gameOver');
let resetBtn = document.querySelector('.reset');
let level = document.querySelector('.level');

/*----- event listeners -----*/

document.addEventListener('keydown', handleKeys);
resetBtn.addEventListener('click', reset);

/*----- functions -----*/

function randomizePosition() {
  return Math.floor(Math.random() * numOfCells);
}

function initialize() {
  snakeArray = [1];
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

function handleKeys(e) {
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

let intervalId;

intervalId = setInterval(function() {

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
    prevPositionArray = prevPositionArray.slice(-snakeArray.length);
            // const eatenFlag = eat(snakePosition);
            // if (!eatenFlag) {
            //   let removed = prevPositionArray.shift();
            //   cells[removed].classList.remove("snake");
            // }
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
}, 100);

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
    // console.log("Game over");
    IsGameOver = true;
    clearInterval(intervalId);
    level.style.display = 'none';
    board.style.display = 'none';
    gameOverScreen.style.backgroundColor = 'black';
    gameOverMsg.style.display = 'block';
    resetBtn.style.display = 'block';
  }
}

function reset() {
    // initialize();
    location.reload();
}