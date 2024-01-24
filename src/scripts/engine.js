const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#Time-Left"),
        score: document.querySelector("#Score"),
        playerLife: document.querySelector("#playerLife"),
    },
    values: {

        gameVelocity: 999,
        hitPossition: 0,
        result: 0,
        currentTime: 60,
        playerlife: 3,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        gameOver();
    }
}

function gameOver() {
    state.values.playerlife = 3;
    state.values.currentTime = 60;
    alert("Game Over! Score:" + state.values.result);

}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let ramdomNumber = Math.floor(Math.random() * 9);
    let ramdomSquare = state.view.squares[ramdomNumber];
    ramdomSquare.classList.add("enemy");
    state.values.hitPossition = ramdomSquare.id;
}

function moveEnemy() {
    state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity)
}

function playSound(audioName) {
    let audio = new Audio(`./src/audio/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function adadListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPossition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPossition = null;
                playSound("hit");
            } else if (square.id != state.values.hitPossition) {
                state.values.playerlife--;
                state.view.playerLife.textContent = state.values.playerlife;
                if (state.values.playerlife <= 0) {
                    gameOver();
                }
            }
        })
    })
}

function init() {
    moveEnemy();
    adadListenerHitbox();
}

init()