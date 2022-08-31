const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnDown = document.getElementById('down');
const spanLives = document.getElementById('lives');
const spanTime = document.getElementById('time');
const spanRecord = document.getElementById('record');
const pResult = document.getElementById('result');


let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPossition = {
    x: undefined,
    y: undefined
}

const giftPosition = {
    x: undefined,
    y: undefined
}

let bombs = [];

function fixNum(n) {
    return Number(n.toFixed(0));
}

function setCanvasSize () {
    canvasSize = window.innerWidth > window.innerHeight ?
    window.innerHeight * 0.7 : window.innerWidth * 0.6

    canvasSize = fixNum(canvasSize);

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementSize = canvasSize / 10;

    playerPossition.x = undefined;
    playerPossition.y = undefined;
    startGame()
}

function startGame () {

    game.font = `${elementSize - 5}px Arial`;
    game.textAlign = 'end'

    const map = maps[level];

    if (!map) {
        gameWin();
        return
    }

    if(!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''))
    // console.log(map, mapRows, mapRowCols)

    showLives();


    bombs = [];
    game.clearRect(0,0,canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1)
            const posY = elementSize * (rowI + 1)
            if (col == 'O' && playerPossition.x === undefined && playerPossition.y === undefined) {
                playerPossition.x = posX
                playerPossition.y = posY
            }
            if (col == 'I') {
                giftPosition.x = posX
                giftPosition.y = posY
            }
            if(col == 'X') {
                bombs.push({x:posX, y:posY})
            }
            game.fillText(emoji, posX, posY )
        });
    });

    movePlayer();
}

function movePlayer(){
    const giftCollisionX = playerPossition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const giftCollisionY = playerPossition.y.toFixed(2) == giftPosition.y.toFixed(2);
    let giftCollisions = giftCollisionX && giftCollisionY;

    if(giftCollisions) {
        levelWin();
    }

    const enemyCollision = bombs.find(bomb => {
        const bombX = bomb.x.toFixed(2) == playerPossition.x.toFixed(2);
        const bombY = bomb.y.toFixed(2) == playerPossition.y.toFixed(2);
        return bombX && bombY;
    })

    if(enemyCollision) {
        levelFail()
    }

    game.fillText(emojis['PLAYER'], playerPossition.x, playerPossition.y)
}

function gameWin () {
    console.log('Juego terminado')
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if(recordTime) {
        if(recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime)
            pResult.innerHTML = 'SUPERASTE EL RECORD!'
        } else {
            pResult.innerHTML = 'Lo siento, no superaste el record :('
        }
    } else {
        localStorage.setItem('record_time', playerTime)
        pResult.innerHTML = 'Primera vez, ahora trata de superar tu propio record'
    }
    console.log(recordTime)
}

function levelWin () {
    console.log('Subiste nivel!')
    level++
    startGame()
}
function levelFail () {
    console.log('fail');
    lives--;

    if(lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined
    }

    playerPossition.x = undefined;
    playerPossition.y = undefined;
    startGame();
}

function showLives () {
    const heartsArray = Array(lives).fill(emojis['HEART']);
    spanLives.innerHTML = heartsArray.join(' ');
}
function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}
function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

window.addEventListener('keyup', moveByKeys)
btnUp.onclick = () => moveUp();
btnLeft.onclick = () => moveLeft();
btnRight.onclick = () => moveRight();
btnDown.onclick = () => moveDown();

function moveByKeys (e) {
    if(e.key === "ArrowUp") moveUp()
    if(e.key === "ArrowLeft") moveLeft()
    if(e.key === "ArrowRight") moveRight()
    if(e.key === "ArrowDown") moveDown()
}
function moveUp () {
    if((playerPossition.y - elementSize) < elementSize) {
        console.log('OUT')
    } else {
        playerPossition.y -= elementSize;
        startGame();
    }
}
function moveLeft () {
    if((playerPossition.x - elementSize) < elementSize) {
        console.log('OUT')
    } else {
        playerPossition.x -= elementSize;
        startGame();
    }
}
function moveRight () {
    if((playerPossition.x + elementSize) > canvasSize) {
        console.log('OUT')
    } else {
        playerPossition.x += elementSize;
        startGame();
    }
}
function moveDown () {
    if((playerPossition.y + elementSize) > canvasSize) {
        console.log('OUT')
    } else {
        playerPossition.y += elementSize;
        startGame();
    }
}

window.onload = () => {
    mainTitle.innerHTML = multiColor(mainTitle);
    setCanvasSize();
};
window.onresize = () => setCanvasSize();