var inputDir = { x: 0, y: 0 }
const foodsound = new Audio('music/food.mp3');
const gameover = new Audio('music/gameover.mp3');
const movesound = new Audio('music/move.mp3');
const music = new Audio('music/music.mp3');
let board = document.getElementById("board");
let snakeArr = [
    { x: 13, y: 15 }
]

let food = { x: 6, y: 7 }
let score = 0;
let speed = 9;
let lastPaintTime = 0;

// Game Functions
function main(currentTime) {
    window.requestAnimationFrame(main);

    console.log(currentTime);
    if (((currentTime - lastPaintTime) / 1000) < (1 / speed)) {
        return;
    }
    lastPaintTime = currentTime;

    gameEngine();

}

function isCollide(snake) {

    for(let i=1; i<snakeArr.length; i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }

    if(snake[0].x <= 0 || snake[0].x >= 18 || snake[0].y <= 0 || snake[0].y >= 18)
    {
        return true;
    }


}
function gameEngine() {

    // part1 : Updating the sanke array and food
    if (isCollide(snakeArr)) {
        music.pause();
        gameover.play();
        inputDir = { x: 0, y: 0 }
        alert("Game Over. Press any key to play again!");
        score = 0;
        scoreBox.innerHTML = "Score : " + score;
        music.play();
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    //If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodsound.play()
        score += 1;
        scoreBox.innerHTML = "Score : " + score;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            HighscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y


    // part2 : Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })

    // Part3 : Display the food
    foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// Main Logic
music.play();

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    HighscoreBox.innerHTML = "HiScore: " + hiscore;
}


window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUP");
            inputDir.x = 0;
            inputDir.y = -1;
            gameEngine();
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            gameEngine();
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            gameEngine();
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            gameEngine();
            break;
        default:
            break;
    }
})

main();

