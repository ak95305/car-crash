"use strict"

let score = document.querySelector(".score");
let startScreen = document.querySelector(".start-screen");
let gameArena = document.querySelector(".game-arena");

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

let player = { speed: 5, score: 0 };


startScreen.addEventListener("click", start);

// KEYS FUNCTIONS
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function gamePlay() {
    if (player.start) {

        startScreen.style.display = "none";
        score.innerHTML = "Score "+ player.score;
        let car = document.querySelector(".my-car");

        moveLines();
        enemyCar(car);

        if(player.score % 200 == 1){
            player.speed += 0.5;
        }

        player.x = car.offsetLeft;
        player.y = car.offsetTop;
        keys.ArrowUp && player.y > 100 ? player.y -= player.speed : "";
        keys.ArrowDown && player.y < 500 ? player.y += player.speed : "";
        keys.ArrowLeft && player.x > 0 ? player.x -= player.speed : "";
        keys.ArrowRight && player.x < 440 ? player.x += player.speed : "";
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        player.score++;
    }
}


function moveLines() {
    let roadLines = document.querySelectorAll(".road-divider");
    roadLines.forEach((item) => {
        item.y += player.speed;
        if (item.y > 650) {
            item.y = -120;
        }
        item.style.top = item.y + "px";
    });
}


function enemyCar(myCar) {
    let enemyCar = document.querySelectorAll(".enemy-car");
    enemyCar.forEach((item, i) => {
        if (isCollide(myCar, item)) {
            endGame();
        }
        item.y += player.speed;
        item.x = Math.floor(Math.random() * 440);
        if (item.y > 650) {
            item.style.backgroundImage=`url("assets/enemy-car${i+1}.png")`;
            item.style.left = item.x + "px";
            item.y = -120;
        }
        item.style.top = item.y + "px";
    });
}

function isCollide(myCar, enemyCar) {
    let myCarRect = myCar.getBoundingClientRect();
    let enemyCarRect = enemyCar.getBoundingClientRect();

    if (myCarRect.top > enemyCarRect.bottom || myCarRect.bottom < enemyCarRect.top || myCarRect.left > enemyCarRect.right || myCarRect.right < enemyCarRect.left) {
        return false;
    } else {
        return true;
    }
}

// END GAME
function endGame(){
    player.start = false;
    startScreen.style.display = "block";
}

// START GAME
function start() {
    gameArena.innerHTML = "";
    player.score = 0;
    player.speed = 5;

    // Car Create
    let car = document.createElement("div");
    car.setAttribute("class", "my-car");
    gameArena.appendChild(car);

    // Create Road Divider
    for (let i = 0; i < 5; i++) {
        let roadDivider = document.createElement("div");
        roadDivider.setAttribute("class", "road-divider");
        gameArena.appendChild(roadDivider);
        roadDivider.y = i * 150;
    }

    // Crate Enemy Cars
    for (let i = 0; i < 3; i++) {
        let enemyCar = document.createElement("div");
        enemyCar.setAttribute("class", "enemy-car");
        gameArena.appendChild(enemyCar);
        enemyCar.y = (i * 250) - 600;
        enemyCar.style.left = enemyCar.y + "px";
        enemyCar.x = i * 100
    }


    player.start = true;
    window.requestAnimationFrame(gamePlay);
}