"use script";

const playerOneScore = document.querySelector('.player-one-score');
const playerTwoScore = document.querySelector('.player-two-score');
const divImage = document.querySelector('.diceimg');
const image = document.querySelector('.dice');
const bc1 = document.querySelector('.player-one');
const bc2 = document.querySelector('.player-two');
const rolling = document.querySelector('.sound');

let currentScore = 0;
let flag = true;

const initial = function(){
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    currentScore = 0;
    flag = true;
}

initial();

const roll = document.querySelector('.roll');
const newgame = document.querySelector('.newgame');
const hold = document.querySelector('.hold');

const scoreOne = document.querySelector('.score-one');
const scoreTwo = document.querySelector('.score-two');

const winner = false;

const win = function(score){
    if(score >= 100){
        return true;
    }
    else {
        return false;
    }
}

const bc = function(flag){ 
    if(flag){
        bc1.style.backgroundColor = " rgba(255, 255, 255, 0.581)";
        bc2.style.backgroundColor = "rgba(221, 160, 221, 0.581)";
    }else{
        bc1.style.backgroundColor = "rgba(221, 160, 221, 0.581)";
        bc2.style.backgroundColor = " rgba(255, 255, 255, 0.581)";
    }
}
// player1 -> true;

roll.addEventListener('click',function(){
    if(!winner){
        rolling.play();
        const random = Math.trunc(Math.random()*6)+1;
        //display dice
        console.log(random);
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
            if(win(playerOneScore)){
                document.querySelector('.player-one').style.backgroundColor = "red";
                winner = true;
            }
        }
        else{
            playerTwoScore.textContent = Number(playerTwoScore.textContent) + currentScore;
            currentScore = 0;
            scoreTwo.textContent = currentScore;
            flag = !flag;
            if(win(playerTwoScore)){
                winner = true;
            }
        }
    }
})

newgame.addEventListener('click',function(){
    rolling.play();
    divImage.classList.add('hidden');
    initial();
    scoreOne.textContent = 0;
    scoreTwo.textContent = 0;
})