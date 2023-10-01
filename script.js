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
let snakePosition, snakeArray, foodPosition, IsGameOver, direction, speed;
let prevPositionArray = [];

/*----- cached elements  -----*/
let cells = [...document.querySelectorAll(".cell")];
let gameOverScreen = document.querySelector('.gameOverScreen');
let gameOverMsg = document.getElementById('gameOver');
let resetBtn = document.querySelector('.reset');
let level = document.querySelector('.level');
let levelUp = document.getElementById('levelUp');

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
  speed = 200;
  initializeFoodPosition();
  initializeSnakePosition();
}

initialize();

function initializeFoodPosition() {
  foodPosition = randomizePosition();
  cells[foodPosition].classList.add("food");
}

function initializeSnakePosition() {
  snakePosition = randomizePosition();
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

function moveSnake() {
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
}

let intervalId;

intervalId = setInterval(function() {

//   eat(snakePosition);
eat();

  if (direction === "left") {
    cells[snakePosition].classList.remove("snake");
    let storedPrevPos = snakePosition;
    snakePosition -= 1;
    checkCollision(storedPrevPos);
    moveSnake();
  } else if (direction === "right") {
    cells[snakePosition].classList.remove("snake");
    let storedPrevPos = snakePosition;
    snakePosition += 1;
    checkCollision(storedPrevPos);
    moveSnake();
  } else if (direction === "up") {
    cells[snakePosition].classList.remove("snake");
    snakePosition -= 20;
    checkCollision();
    moveSnake();
  } else if (direction === "down") {
    cells[snakePosition].classList.remove("snake");
    snakePosition += 20;
    checkCollision();
    moveSnake();
  }
}, speed);

// function eat(currentSnakePosition) {
//     if (currentSnakePosition === foodPosition) {
//         snakeArray.push(1);
//         cells[foodPosition].classList.remove("food");
//         initializeFoodPosition();
//         levelUp.textContent = prevPositionArray.length;
//         if (prevPositionArray.length === 5) {
//             console.log("first")
//             speed = 100;
//         }
//         return true;
//     }
//     return false;
// }

function eat() {
    if (snakePosition === foodPosition) {
        snakeArray.push(1);
        cells[foodPosition].classList.remove("food");
        initializeFoodPosition();
        levelUp.textContent = prevPositionArray.length;
        if (prevPositionArray.length === 5) {
            console.log("first")
            speed = 100;
        }
        return true;
    }
}

function checkCollision(storedPrevPos) {
  if (
    snakePosition < 0 || // checking upper edge
    snakePosition > 399 || // checking lower edge
    (storedPrevPos % 20 === 0 && direction === "left") || // checking left edge
    ((storedPrevPos + 1) % 20 === 0 && direction === "right") || // checking right edge
    cells[snakePosition].classList.contains("snake") // checking body collision
  ) {
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