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
let snakePosition, snakeArray, foodPosition, IsGameOver, direction;
let prevPositionArray = [];

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
    // cells[foodPosition].style.backgroundColor = 'red';
    cells[foodPosition].classList.add('food');
}

function initializeSnakePosition() {
    snakePosition = randomizePosition();
    // cells[snakePosition].style.backgroundColor = 'green';
    cells[snakePosition].classList.add('snake');
}

// let intervalId = setInterval(moveLeft, 500) - put this in the move updownleftright functions
let intervalId;
function handleKeys(e) {
    // console.log(snakePosition)
    if (IsGameOver) return;

    clearInterval(intervalId);

    // if (snakePosition === foodPosition) {
    //     console.log(snakePosition)
    //     console.log(foodPosition)
    //     eat();
        
    //     // snakeArray.push(1);
    //     // console.log(snakeArray.length);
    //     // initializeFoodPosition();
    // }

    // save previous snake postion for the body to follow
    // let prevPosition = snakePosition;

    // cells[snakePosition].classList.remove('snake');

    const key = e.key;
    switch (key) { 
        case "ArrowLeft":
            // intervalId = setInterval(function() {
                direction = "left"
                // cells[snakePosition].classList.remove('snake')
                // snakePosition -= 1;
                // // cells[snakePosition].classList.add('snake')
                // prevPositionArray.push(snakePosition);
                // prevPositionArray.forEach(pos => {
                //     cells[pos].classList.remove('snake')
                // })
                // prevPositionArray= prevPositionArray.slice(-snakeArray.length);
                // prevPositionArray.forEach(pos => {
                //     cells[pos].classList.add('snake');
                // })
            // }, 500)
            // snakePosition -= 1;
            break;
        case "ArrowRight":
            direction = "right";
            break;
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
    }
                intervalId = setInterval(function() {
                    if (snakePosition === foodPosition) {
                        console.log(snakePosition)
                        console.log(foodPosition)
                        eat();
                        
                        // snakeArray.push(1);
                        // console.log(snakeArray.length);
                        // initializeFoodPosition();
                    }
                    if (direction === "left") {
                        cells[snakePosition].classList.remove('snake')
                        snakePosition -= 1;
                        // cells[snakePosition].classList.add('snake')
                        prevPositionArray.push(snakePosition);
                        prevPositionArray.forEach(pos => {
                            cells[pos].classList.remove('snake')
                        })
                        prevPositionArray= prevPositionArray.slice(-snakeArray.length);
                        prevPositionArray.forEach(pos => {
                            cells[pos].classList.add('snake');
                        })
                    } else if (direction === "right") {
                        cells[snakePosition].classList.remove('snake')
                        snakePosition += 1;
                        // cells[snakePosition].classList.add('snake')
                        prevPositionArray.push(snakePosition);
                        prevPositionArray.forEach(pos => {
                            cells[pos].classList.remove('snake')
                        })
                        prevPositionArray= prevPositionArray.slice(-snakeArray.length);
                        prevPositionArray.forEach(pos => {
                            cells[pos].classList.add('snake');
                        })
                    } else if (direction === "up") {
                        cells[snakePosition].classList.remove('snake')
                        snakePosition -= 20;
                        // cells[snakePosition].classList.add('snake')
                        prevPositionArray.push(snakePosition);
                        prevPositionArray.forEach(pos => {
                            cells[pos].classList.remove('snake')
                        })
                        prevPositionArray= prevPositionArray.slice(-snakeArray.length);
                        prevPositionArray.forEach(pos => {
                            cells[pos].classList.add('snake');
                        })
                    } else if (direction === "down") {
                        cells[snakePosition].classList.remove('snake')
                        snakePosition += 20;
                        // cells[snakePosition].classList.add('snake')
                        prevPositionArray.push(snakePosition);
                        prevPositionArray.forEach(pos => {
                            cells[pos].classList.remove('snake')
                        })
                        prevPositionArray= prevPositionArray.slice(-snakeArray.length);
                        prevPositionArray.forEach(pos => {
                            cells[pos].classList.add('snake');
                        })
                    }
                }, 500)

    // prevPositionArray.push(snakePosition);

    // // console.log("before: ",prevPositionArray);
    
    // // remove snake class
    // // cells[snakePosition].style.backgroundColor = '';
    // // cells[snakePosition].classList.remove('snake');
    
    // prevPositionArray.forEach(pos => {
    //     cells[pos].classList.remove('snake')
    // })

    // prevPositionArray= prevPositionArray.slice(-snakeArray.length);

    // // cells[snakePosition].classList.add('snake');

    // prevPositionArray.forEach(pos => {
    //     cells[pos].classList.add('snake');
    // })

    // console.log("after: ",prevPositionArray);


    // prevPositionArray.forEach(pos => {
    //     cells[pos].style.backgroundColor = '';
    //     console.log(pos)
    //     cells[pos].style.backgroundColor = 'green';
    //     // pos = snakePosition
    // })

    checkCollision();
}


// create body and draw
function eat() {
    console.log(snakeArray)
    // let prevPosition = snakePosition;
    snakeArray.push(1);
    // console.log("snake length: ", snakeArray.length)
    // console.log("prev pos length", prevPositions.length)
    // for (i = 0; i < snakeArray.length-1; i++) {
        // console.log("pushed")
        // prevPositions.push(snakePosition) - this method won't add the most recent previous positions!
    // }
    // prevPositionArray= prevPositionArray.slice(-snakeArray.length);
    // console.log(prevPositionArray)
            // for (let i=0; i<snakeArray.length-1; i++) {
            //     let prevPosition = snakePosition;
            //     console.log(i);
            //     console.log(prevPosition)
            //     cells[prevPosition].style.backgroundColor = '';
            //     // prevPosition = snakePosition;
            //     // prevPosition += 1;       // if move right, add in the rest...
            //     cells[prevPosition].style.backgroundColor = 'green';
            // }
    cells[foodPosition].classList.remove('food');
    initializeFoodPosition();
}

function checkCollision() {
    // if (snakePosition < 0 || // checking upper edge
    //     snakePosition > 399 || // checking lower edge
    //      snakePosition % 20 === 0 || // checking left edge
    //      snakePosition % 20 === 20 - 1 || // checking right edge
    //      cells[snakePosition].classList.contains('snake') // checking body collision
    //     ) {
    // //     console.log("Game over")
    // // if (snakePosition < 0) console.log("game over 1")
    // // if (snakePosition > 399) console.log("game over 2")
    // // if (snakePosition % 20 === 0) console.log("game over 3")
    // // if (snakePosition % 20 === 20 - 1) console.log("game over 4")
    // // if (cells[snakePosition].classList.contains('snake')) console.log("game over 5")
    //     IsGameOver = true;
    // }
}

// auto move
// let intervalId = setInterval(handleKeys, 1000)

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