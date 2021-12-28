// 함수 생성

let $rock = document.querySelector('#rock');
let $scissors = document.querySelector('#scissors');
let $paper = document.querySelector('#paper');
let $playerGame = document.querySelector('.player-game');
let $computerGame = document.querySelector('.computer-game');
let $playerScore = document.querySelector('#player-score');
let $computerScore = document.querySelector('#computer-score');
let $averaging = document.querySelector('.averaging');



const score = {
    userScore: 0,
    aiScore: 0,
    playerPick: 0,
    computerPick: 0,
    numberOfAttempts: 0,
    numberOfAttemptsTry: 0
};

let computerPick = () => {
    let $computerPick = Math.floor(Math.random() * 3) + 1;
    return $computerPick;
};
let scoreDataEnter = (playerPick, computerpick) => {
    score.playerPick = playerPick;
    score.computerPick = computerpick;
    if (score.numberOfAttempts >= 10) {
        score.numberOfAttemptsTry += 1;
    } else {
        score.numberOfAttempts += 1;
    }
}
let vs = (e, count) => {
    let $computerPick = score.computerPick;
    if (score.numberOfAttempts >= 9) {
        if (score.numberOfAttempts === 10) {
            $computerPick = score.computerPick;
        } else {
            $averaging.classList.add('active');
            $averaging.textContent = `운빨 보정 ${3 - score.numberOfAttemptsTry}회`
        }
    } else {
        $computerPick = computerPick();
    }
    let victory = [3, 1, 2];
    if ($computerPick === count) {
        scoreDataEnter(count, $computerPick);
        return;
    } else {
        scoreDataEnter(count, $computerPick);
        if (victory[count - 1] === $computerPick) {
            ++score.userScore;
        } else {
            ++score.aiScore;
        }
    }
    if (score.numberOfAttemptsTry >= 3) {
        $averaging.classList.remove('active');
        $averaging.textContent = `운빨 보정`;
        score.numberOfAttemptsTry = 0;
        score.numberOfAttempts += -10;
    }
}
let changeGameImage = () => {
    let targetClass = ['scissors', 'rock', 'paper'];
    for (let i = 0, j = targetClass.length; i < j; i++) {
        if (score.playerPick === i+1) {
            $playerGame.classList.add(targetClass[i]);
        } else {
            $playerGame.classList.remove(targetClass[i])
        }

        if (score.computerPick === i+1) {
            $computerGame.classList.add(targetClass[i]);
        } else {
            $computerGame.classList.remove(targetClass[i])
        }
    }
}
let changeScoreboard = () => {
    $playerScore.textContent = score.userScore;
    $computerScore.textContent = score.aiScore;
}


//실행
(() => {
    let $choice = document.querySelector('.choice');
    let $reset = document.querySelector('.reset');
    $choice.addEventListener('click', e => {
        let count = 0;
        if (!e.target.matches('#rock') && !e.target.matches('#scissors') && !e.target.matches('#paper')) {
            return;
        } else if (e.target === $scissors) {
            count = 1;
        } else if (e.target === $rock) {
            count = 2;
        } else if (e.target === $paper) {
            count = 3;
        }
        vs(e, count);
        changeGameImage();
        changeScoreboard();
    })
    $reset.addEventListener('click', e => {
        if (!e.target.matches('.score-reset-board .reset')) {
            return;
        }
        score.userScore = 0;
        score.aiScore = 0;
        changeScoreboard();
    });
})();