// 함수 생성, 전역 변수
const data = {
    player: {
        user: {
            score: 0,
            pick: 0,
        },
        computer: {
            score: 0,
            pick: 0
        }
    },
    round: 0,
    userChance: 0
}
const link = {
    //하단 가위,바위,보 선택창
    $scissors: document.querySelector('#scissors'),
    $rock: document.querySelector('#rock'),
    $paper: document.querySelector('#paper'),
    //유저 선택, 컴퓨터 선택창
    $playerGame: document.querySelector('.player-game'),
    $computerGame: document.querySelector('.computer-game'),
    //유저, 컴퓨터 점수
    $playerScore: document.querySelector('#player-score'),
    $computerScore: document.querySelector('#computer-score'),
    //찬스
    $averaging: document.querySelector('.averaging')
};

//하단에서 선택한 pick 체크 
let footerPick = e => {
    let count;
    if (e.target === link.$scissors) {
        count = 1;
    } else if (e.target === link.$rock) {
        count = 2;
    } else if (e.target === link.$paper) {
        count = 3;
    }
    return count;
}
//컴퓨터 가위바위보 랜덤 값
let computerPick = () => {
    return Math.floor(Math.random() * 3) + 1;
}
//데이터에 유저, 컴퓨터의 선택을 입력
let scoreInputData = (userPick, computerPick) => {
    data.player.user.pick = userPick;
    data.player.computer.pick = computerPick;
}
//유저선택 vs 컴퓨터랜덤값 후 데이터 값에 점수 더하기 및 패배시 운빨보정 스택+1
let vs = (e, userPick) => {
    let $computerPick = computerPick();
    let victory = [3, 1, 2];
    scoreInputData(userPick, $computerPick);
    if ($computerPick === userPick) {
        return;
    } else {
        if (victory[userPick - 1] === $computerPick) {
            ++data.player.user.score;
        } else {
            ++data.player.computer.score;
            data.round += 1;
        }
    }
}
//서로의 선택 표시 창
let changeGameImage = () => {
    let targetClass = ['scissors', 'rock', 'paper'];
    for (let i = 0, j = targetClass.length; i < j; i++) {
        if (data.player.user.pick === i + 1) {
            link.$playerGame.classList.add(targetClass[i]);
        } else {
            link.$playerGame.classList.remove(targetClass[i]);
        }

        if (data.player.computer.pick === i + 1) {
            link.$computerGame.classList.add(targetClass[i]);
        } else {
            link.$computerGame.classList.remove(targetClass[i]);
        }
    }
}
// 스코어 보드에 데이터 반영
let changeScoreboard = () => {
    link.$playerScore.textContent = data.player.user.score;
    link.$computerScore.textContent = data.player.computer.score;
    link.$averaging.firstElementChild.textContent = data.round;
}
//운빨보정 계산
let vsAveraging = () => {
    if (data.round >= 10) {
        data.player.user.score += 3;
        data.round += -10;
    }
    changeScoreboard();
}


//실행
(() => {
    let $choice = document.querySelector('.choice');
    let $reset = document.querySelector('.reset');
    $choice.addEventListener('click', e => {
        if (!e.target.matches('#rock') && !e.target.matches('#scissors') && !e.target.matches('#paper')) {
            return;
        }
        let userPick = footerPick(e);
        vs(e, userPick);
        changeGameImage();
        changeScoreboard();
    });
    $reset.addEventListener('click', e => {
        if (!e.target.matches('.score-reset-board .reset')) {
            return;
        }
        data.player.user.score = 0;
        data.player.computer.score = 0;
        changeScoreboard();
    });
    link.$averaging.addEventListener('click', e => {
        if (!e.target.matches('.score-reset-board .averaging')) {
            return;
        }
        console.log(data.round);
        vsAveraging();
    })
})();