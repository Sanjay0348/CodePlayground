const Gameboard = document.getElementById('canvasbox');
const context = Gameboard.getContext('2d');
const Scoreval = document.getElementById('scoreVal');
const WIDTH = Gameboard.width;
const HEIGHT = Gameboard.height;
const UNIT = 25;
let foodX;
let foodY;
let Xvel = 25;
let Yvel = 0;
let score = 0;
let snake = [{ x: UNIT * 3, y: 0 }, { x: UNIT * 2, y: 0 }, { x: UNIT, y: 0 }, { x: 0, y: 0 }]
active = true;
Started=false;
window.addEventListener("keydown", keyPress);
StartGame();

function StartGame() {
    context.fillStyle = '#212121';
    context.fillRect(0, 0, WIDTH, HEIGHT);
    console.log("working");
    CreateFood();
    DisplayFood();
    DrawSnake();
    // moveSnake();
    // clearBoard();
    //nextTick();
}

function clearBoard() {
    context.fillStyle = '#212121';
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

function CreateFood() {
    foodX = Math.floor(Math.random() * WIDTH / UNIT) * UNIT;

    foodY = Math.floor(Math.random() * HEIGHT / UNIT) * UNIT;
}

function DisplayFood() {
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, UNIT, UNIT)

}

function DrawSnake() {
    context.fillStyle = 'blue';
    context.strokeStyle = 'black'
    snake.forEach((SnakeElement) => {
        context.fillRect(SnakeElement.x, SnakeElement.y, UNIT, UNIT);
        context.strokeRect(SnakeElement.x, SnakeElement.y, UNIT, UNIT)
    })
}

function moveSnake() {
    const head = { x: snake[0].x + Xvel, y: snake[0].y + Yvel }
    snake.unshift(head);


    if (snake[0].x == foodX && snake[0].y == foodY) {
        score++;
        Scoreval.innerText = score;
        CreateFood();

    } else {
        snake.pop();
    }
}


function nextTick() {
    if (active) {
        setTimeout(() => {
            clearBoard();
            DisplayFood();
            moveSnake();
            DrawSnake();
            CheckGameOver();
            nextTick();
        }, 200)
    }
    else if (!active) {
        clearBoard();
        context.font = "bold 50px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over!!", WIDTH / 2, HEIGHT / 2);
        context.fillText(`Your Score is ${score}`, WIDTH / 1.5, HEIGHT / 1.5);

    }
}


function keyPress(event) 
{
    if(!Started)
    {
        Started=true;
        nextTick();
    }
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    switch (true) {
        case (event.keyCode == LEFT && Xvel != UNIT):
            Xvel = -UNIT;
            Yvel = 0;
            break;
        case (event.keyCode == RIGHT && Xvel != -UNIT):
            Xvel = UNIT;
            Yvel = 0;
            break;
        case (event.keyCode == UP && Yvel != UNIT):
            Xvel = 0;
            Yvel = -UNIT;
            break;

        case (event.keyCode == DOWN && Yvel != -UNIT):
            Xvel = 0;
            Yvel = UNIT;
            break;
    }
}


function CheckGameOver() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= WIDTH):
        case (snake[0].y < 0):
        case (snake[0].y >= WIDTH):
            active = false;
            break;
    }
}

function reset(){
    console.table("working")
 snake = [{ x: UNIT * 3, y: 0 }, { x: UNIT * 2, y: 0 }, { x: UNIT, y: 0 }, { x: 0, y: 0 }]
 active = true;
 Started=false;
//  keyPress()
StartGame()
}