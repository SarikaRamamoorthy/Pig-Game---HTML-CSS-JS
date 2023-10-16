"use script";

const playerOneScore = document.querySelector('.player-one-score');
const playerTwoScore = document.querySelector('.player-two-score');
const divImage = document.querySelector('.diceimg');
const image = document.querySelector('.dice');
const bc1 = document.querySelector('.player-one');
const bc2 = document.querySelector('.player-two');
const rolling = document.querySelector('.sound');
const winningDisplay = document.querySelector('.winning-display');
let winningPlayer = document.querySelector('.winning-player');
const winningTune = document.querySelector('.winning-song');

const overlay = document.querySelector('.overlay');

let currentScore = 0;
let flag = true;

const bc = function(flag){ 
    if(flag){
        bc1.style.backgroundColor = " rgba(255, 255, 255, 0.581)";
        bc2.style.backgroundColor = "rgba(221, 160, 221, 0.581)";
    }else{
        bc1.style.backgroundColor = "rgba(221, 160, 221, 0.581)";
        bc2.style.backgroundColor = " rgba(255, 255, 255, 0.581)";
    }
}


const initial = function(){
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    currentScore = 0;
    flag = true;
    bc(flag);
    winningDisplay.classList.add('.hide');
}

initial();

const roll = document.querySelector('.roll');
const newgame = document.querySelector('.newgame');
const playagain = document.querySelector('.again');
const hold = document.querySelector('.hold');

const scoreOne = document.querySelector('.score-one');
const scoreTwo = document.querySelector('.score-two');
let winner = false;

const win = function(score){
    if(score >= 50){
        return true;
    }
    else {
        return false;
    }
}

// player1 -> true;

roll.addEventListener('click',function(){
    // console.log(winner);
    if(!winner){
        rolling.play();
        const random = Math.trunc(Math.random()*6)+1;
        //display dice
        // console.log(random);
        divImage.classList.remove('hidden');
        image.src = `res/dice-${random}.png`;
        

        if(random !== 1){
            currentScore += random;
            if(flag === true)
                scoreOne.textContent = currentScore;
            else
                scoreTwo.textContent = currentScore;
        }
        else{
            bc(!flag);
            currentScore = 0;
            if(flag === true)
                scoreOne.textContent = currentScore;
            else
                scoreTwo.textContent = currentScore;
            flag = !flag;
        }

    }
})

hold.addEventListener('click',function(){
    if(!winner){
        rolling.play();
        bc(!flag);
        if(flag === true){
            playerOneScore.textContent = Number(playerOneScore.textContent) + currentScore;
            currentScore = 0;
            scoreOne.textContent = currentScore;
            flag = !flag;
            if(win(Number(playerOneScore.textContent))){
                winningTune.play();
                winningDisplay.classList.remove('hide');
                divImage.classList.add('hidden');
                winningPlayer.textContent = "Player 1 wins the Game🏆";
                console.log("won");
                // document.querySelector('.player-one').style.backgroundColor = "red";
                winner = true;
            }
        }
        else{
            playerTwoScore.textContent = Number(playerTwoScore.textContent) + currentScore;
            currentScore = 0;
            scoreTwo.textContent = currentScore;
            flag = !flag;
            if(win(Number(playerTwoScore.textContent))){
                winningTune.play();
                winningDisplay.classList.remove('hide');
                divImage.classList.add('hidden');
                winningPlayer.textContent = "Player 2 wins the Game🏆";
                // console.log(winningPlayer.textContent);
                winner = true;
            }
        }
    }
})

const gamereset = function(){
    winningDisplay.classList.add('hide');
    // console.log("clicked");
    rolling.play();
    divImage.classList.add('hidden');
    initial();
    scoreOne.textContent = 0;
    scoreTwo.textContent = 0;
    winner = false;
}

newgame.addEventListener('click', gamereset)

playagain.addEventListener('click',gamereset)

overlay.addEventListener('click', function(){
    winningDisplay.classList.add('hide');
})

document.addEventListener('keydown',function(e){
    if(e.key === "Escape"){
        // console.log("clicked");
        gamereset();
    }
})