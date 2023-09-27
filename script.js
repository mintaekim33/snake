 /*----- constants -----*/
const boardSize = 20; // 20 squares by 20 squares

const numOfCells = boardSize**2;
for (let i = 1; i <= numOfCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id',`${i}`)
    board.appendChild(cell);
 }

 /*----- state variables -----*/
let snakePosition, snakeArray, foodPosition, IsGameOver;

 /*----- cached elements  -----*/
// let board = document.getElementById('board');
// let cells1 = document.querySelectorAll('.cell');
let cells = [...document.querySelectorAll('.cell')];

 /*----- event listeners -----*/

 document.addEventListener('keydown', handleKeys);

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
    cells[foodPosition].style.backgroundColor = 'red';
    // cells[foodPosition].classList.add('food');
}

function initializeSnakePosition() {
    snakePosition = randomizePosition();
    cells[snakePosition].style.backgroundColor = 'green';
    // cells[snakePosition].classList.add('snake');
}

// let intervalId = setInterval(moveLeft, 500) - put this in the move updownleftright functions

function handleKeys(e) {
    if (snakePosition === foodPosition) {
        eat();
        // snakeArray.push(1);
        // console.log(snakeArray.length);
        // initializeFoodPosition();

    }
    // for (let i=0; i<snakeArray.length-1; i++) {
        
    // }
    // save previous snake postion for the body to follow
    let prevPosition = snakePosition;
    // console.log(prevPosition)

    // remove snake class
    cells[snakePosition].style.backgroundColor = '';
    // cells[snakePosition].classList.remove('snake');
    const key = e.key;
    switch (key) { 
        case "ArrowLeft":
            snakePosition -= 1;
            break;
        case "ArrowRight":
            snakePosition += 1;
            break;
        case "ArrowUp":
            snakePosition -= 20;
            break;
        case "ArrowDown":
            snakePosition += 20;
            break;
    }
    // add snake class
    cells[snakePosition].style.backgroundColor = 'green';
    // cells[snakePosition].classList.add('snake');

    // console.log("snake pos: ", snakePosition)
    // console.log("prevposition: ", prevPosition)


    // for (let i=0; i<snakeArray.length-1; i++) {
    //     console.log(i);
    //     cells[prevPosition].style.backgroundColor = '';
    //     cells[prevPosition].style.backgroundColor = 'green';
    // }
}


// create body and draw
function eat() {
    // let prevPosition = snakePosition;
    snakeArray.push(1);
            for (let i=0; i<snakeArray.length-1; i++) {
                let prevPosition = snakePosition;
                // console.log(i);
                console.log(prevPosition)
                cells[prevPosition].style.backgroundColor = '';
                prevPosition = snakePosition;
                // prevPosition += 1;       // if move right, add in the rest...
                cells[prevPosition].style.backgroundColor = 'green';
            }
    initializeFoodPosition();
}

// auto move
// collision (walls & itself)


// function moveRight() {
    
//     // let move = () => {
//         cells[indexOfSnake].style.backgroundColor = '';
//         cells[indexOfSnake+1].style.backgroundColor = 'green';
//         indexOfSnake += 1;
//         // if (indexOfSnake % 20 === 0) {
//         //     cells[indexOfSnake].style.backgroundColor = '';
//         //     clearInterval(intervalId);
//         //     // cells[indexOfSnake-1].style.backgroundColor = 'green';
//         // }
//     // }
//     // let intervalId = setInterval(move, 1000)
// }

// function moveLeft() {
    
//     cells[indexOfSnake].style.backgroundColor = '';
//     cells[indexOfSnake-1].style.backgroundColor = 'green';
//     indexOfSnake -= 1;
//     // if (indexOfSnake % 20 === 0) {
//     //     // cells[indexOfSnake].style.backgroundColor = '';
//     //     clearInterval(intervalId);
//     // }
// }

// function moveUp() {
//     cells[indexOfSnake].style.backgroundColor = '';
//     cells[indexOfSnake-20].style.backgroundColor = 'green';
//     indexOfSnake -= 20;
//     // if (indexOfSnake < 20) {
//     //     // cells[indexOfSnake].style.backgroundColor = '';
//     //     clearInterval(intervalId);
//     // }
// }

// function moveDown() {
//     cells[indexOfSnake].style.backgroundColor = '';
//     cells[indexOfSnake+20].style.backgroundColor = 'green';
//     indexOfSnake += 20;
//     // if (indexOfSnake > 380) {
//     //     // cells[indexOfSnake].style.backgroundColor = '';
//     //     clearInterval(intervalId);
//     // }
// }