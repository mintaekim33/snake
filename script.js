 /*----- constants -----*/
const boardSize = 20; // 20 squares by 20 squares

// what is this weird behavior? i didn't cache board element but this is working?
const numOfCells = boardSize**2;
for (let i = 1; i <= numOfCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id',`${i}`)
    board.appendChild(cell);
 }
// acutally don't even need to add these cells lol

 /*----- state variables -----*/
let snake, snakeLength, foodPosition, IsGameOver;

 /*----- cached elements  -----*/
// let board = document.getElementById('board');
// let cells1 = document.querySelectorAll('.cell');
let cells = [...document.querySelectorAll('.cell')];

 /*----- event listeners -----*/

// listen for key up down left right arrow key

 /*----- functions -----*/

 function randomizePosition() {
    return Math.floor(Math.random() * numOfCells);
}

function initialize() {
    snake = [1]; // gets longer by pushing 1 into it
    // snakeLength = 1; - probably don't need?
    foodPosition = randomizePosition();
    IsGameOver = false;
    // initializeFoodPosition();
    // initializeSnakePosition();
    // render functions here to update all the states in the DOM
}

initialize();

function initializeFoodPosition() {
    let indexOfFood = cells.indexOf(cells[foodPosition]);
    cells[indexOfFood].style.backgroundColor = 'red';
}

function initializeSnakePosition() {
    // let snakePosition = randomizePosition();
    // let indexOfSnake = cells.indexOf(cells[snakePosition]);
    // cells[indexOfSnake].style.backgroundColor = 'green';
}

    let snakePosition = randomizePosition();
    let indexOfSnake = cells.indexOf(cells[snakePosition]);
    cells[indexOfSnake].style.backgroundColor = 'green';



// let intervalId = setInterval(moveLeft, 500) - put this in the move updownleftright functions

// function move() {
//     document.onkeydown = function(e) {
//         switch (e.key) {
//             case "ArrowLeft":
//                 moveLeft();
//                 break;
//             case "ArrowRight":
//                 moveRight();
//                 break;
//             case "ArrowUp":
//                 moveUp();
//                 break;
//             case "ArrowDown":
//                 moveDown();
//                 break;
//         }
//     }
// }
// function move(e) {
//             switch (e.key) {
//             case "ArrowLeft":
//                 moveLeft();
//                 break;
//             case "ArrowRight":
//                 moveRight();
//                 break;
//             case "ArrowUp":
//                 moveUp();
//                 break;
//             case "ArrowDown":
//                 moveDown();
//                 break;
//         }
// }

// document.addEventListener('keydown', move(e));
document.addEventListener('keydown', function(e) {
    const key = e.key;
    switch (key) { 
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
    }
} );

function moveRight() {
    
    let move = () => {
        console.log(indexOfSnake)
        cells[indexOfSnake].style.backgroundColor = '';
        cells[indexOfSnake+1].style.backgroundColor = 'green';
        indexOfSnake += 1;
        if (indexOfSnake % 20 === 0) {
            cells[indexOfSnake].style.backgroundColor = '';
            clearInterval(intervalId);
            // cells[indexOfSnake-1].style.backgroundColor = 'green';
    }
    }
    let intervalId = setInterval(move, 1000)
}

function moveLeft() {
    cells[indexOfSnake].style.backgroundColor = '';
    cells[indexOfSnake-1].style.backgroundColor = 'green';
    indexOfSnake -= 1;
    if (indexOfSnake % 20 === 0) {
        // cells[indexOfSnake].style.backgroundColor = '';
        clearInterval(intervalId);
    }
}

function moveUp() {
    cells[indexOfSnake].style.backgroundColor = '';
    cells[indexOfSnake-20].style.backgroundColor = 'green';
    indexOfSnake -= 20;
    if (indexOfSnake < 20) {
        // cells[indexOfSnake].style.backgroundColor = '';
        clearInterval(intervalId);
    }
}

function moveDown() {
    cells[indexOfSnake].style.backgroundColor = '';
    cells[indexOfSnake+20].style.backgroundColor = 'green';
    indexOfSnake += 20;
    if (indexOfSnake > 380) {
        // cells[indexOfSnake].style.backgroundColor = '';
        clearInterval(intervalId);
    }
}