/*----- cached board element  -----*/
let board = document.getElementById("board");

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
let speedIncreased = false;

/*----- cached elements  -----*/
let cells = [...document.querySelectorAll(".cell")];
let gameOverScreen = document.querySelector(".gameOverScreen");
let gameOverMsg = document.getElementById("gameOver");
let resetBtn = document.querySelector(".reset");
let level = document.querySelector(".level");
let levelUp = document.getElementById("levelUp");

/*----- event listeners -----*/

document.addEventListener("keydown", handleKeys);
resetBtn.addEventListener("click", reset);

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
    if (cells[pos]) cells[pos].classList.remove("snake");
  });
  prevPositionArray = prevPositionArray.slice(-snakeArray.length);
  prevPositionArray.forEach((pos) => {
    if (cells[pos]) cells[pos].classList.add("snake");
  });
}

let intervalId;

intervalId = setInterval(play, speed);

function play() {

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

  if (snakeArray.length === 5 && !speedIncreased) {
    increaseSpeed();
    speedIncreased = true;
  }
  if (snakeArray.length === 6) speedIncreased = false;
  if (snakeArray.length === 10 && !speedIncreased) {
    increaseSpeed();
    speedIncreased = true;
  }
}

function increaseSpeed() {
  clearInterval(intervalId);
  speed = speed / 2;
  intervalId = setInterval(play, speed);
}

let gulpSound = new Audio('./assets/gulp.mp3');

function eat() {
  if (snakePosition === foodPosition) {
    gulpSound.play();
    snakeArray.push(1);
    cells[foodPosition].classList.remove("food");
    initializeFoodPosition();
    levelUp.textContent = snakeArray.length;
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
    level.style.display = "none";
    board.style.display = "none";
    gameOverScreen.style.backgroundColor = "black";
    gameOverMsg.style.display = "block";
    resetBtn.style.display = "block";
  }
}

function reset() {
  location.reload();
}
