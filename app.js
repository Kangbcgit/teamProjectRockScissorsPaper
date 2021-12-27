// 함수 생성

let $rock = document.querySelector('#rock');
let $scissors = document.querySelector('#scissors');
let $paper = document.querySelector('#paper');
let $playerGame = document.querySelector('.player-game');
let $computerGame = document.querySelector('.computer-game');
let $playerScore = document.querySelector('#player-score');
let $computerScore = document.querySelector('#computer-score');



let score = {
    userScore: 0,
    aiScore: 0,
    playerPick: 0,
    computerPick: 0,
    money: 0
};

let computerPick = () => {
    let $computerPick = Math.floor(Math.random() * 3) + 1;
    return $computerPick;
};
let vs = (e, count) => {
    let $computerPick = computerPick();
    if ($computerPick === count) {
        score.playerPick = $computerPick;
        score.computerPick = $computerPick;
        return;
    } else {
        if ($computerPick === 1) {
            if (count === 2) {
                ++score.userScore;
            }
            if (count === 3) {
                ++score.aiScore;
            }
        } else if ($computerPick === 2) {
            if (count === 1) {
                ++score.aiScore;
            } else if (count === 3) {
                ++score.userScore;
            }
        } else if ($computerPick === 3) {
            if (count === 1) {
                ++score.userScore;
            } else if (count === 2) {
                ++score.aiScore;
            }
        }
    }
    score.playerPick = count;
    score.computerPick = $computerPick;

}
let changeGameImage = () => {
    if (score.playerPick === 1) {
        $playerGame.classList.add('scissors');
        $playerGame.classList.remove('paper');
        $playerGame.classList.remove('rock');
    } else if (score.playerPick === 2) {
        $playerGame.classList.add('rock');
        $playerGame.classList.remove('paper');
        $playerGame.classList.remove('scissors');
    } else if (score.playerPick === 3) {
        $playerGame.classList.add('paper');
        $playerGame.classList.remove('rock');
        $playerGame.classList.remove('scissors');
    }

    if (score.computerPick === 1) {
        $computerGame.classList.add('scissors');
        $computerGame.classList.remove('paper');
        $computerGame.classList.remove('rock');
    } else if (score.computerPick === 2) {
        $computerGame.classList.add('rock');
        $computerGame.classList.remove('paper');
        $computerGame.classList.remove('scissors');
    } else if (score.computerPick === 3){
        $computerGame.classList.add('paper');
        $computerGame.classList.remove('rock');
        $computerGame.classList.remove('scissors');
    }
}
let  changeScoreboard = () => {
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