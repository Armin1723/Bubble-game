const gameBottom = document.querySelector('#game-bottom');
const hit = document.querySelector('#hit-value');
const correctClick = new Audio('assets/correctClick.wav');
const wrongClick = new Audio('assets/wrongClick.wav');
const gameover = new Audio('assets/gameover.wav');

let hitValue = 0;
let scoreValue = 0;
let timerValue = 60;
let highScore = localStorage.getItem('highscore');
const populateGameBox = () => {
    bubbleHTML = ''
    for (let i=0; i < 98; ++i){
        value = Math.floor(Math.random()*10);
        bubbleHTML += `<div class="bubble">${value}</div>`
    }
    gameBottom.innerHTML = bubbleHTML;
    hitValue = Math.floor( Math.random()* 10);
    hit.innerText = hitValue;
}

const timer = 
    setInterval(() => {
        if( timerValue > 0){
            --timerValue;
            document.querySelector('#timer-value').innerText = timerValue;
        }else{
            highScore = highScore > scoreValue ? highScore : scoreValue ;
            localStorage.setItem('highscore', highScore)
            gameover.play();
            gameBottom.innerHTML = `<div id='reset-container'>
                                        <div id='game-over'>GAME OVER</div>
                                        <button id='new-game' onClick=location.reload()>NEW GAME</button>
                                        <div id='highscore'>High Score: ${highScore}</div> 
                                    </div>`;
            clearInterval(timer);
        }
    }, 1000);

gameBottom.addEventListener('click', (e)=>{
    if ( timerValue > 0 && e.target.innerText >= 0){
        if (e.target.innerText == hitValue){
            correctClick.play();
            scoreValue += 10;
            document.querySelector('#score-value').innerText = scoreValue;
        }
        else{
            wrongClick.play();
            scoreValue -= parseInt(e.target.innerText)
            document.querySelector('#score-value').innerText = scoreValue;
        }
        populateGameBox();
    }
})

populateGameBox();