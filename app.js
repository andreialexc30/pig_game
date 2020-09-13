var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
    //1. Random number
    var diceOne = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    document.getElementById('diceOne').style.display = 'block';
    document.getElementById('diceTwo').style.display = 'block';
    document.getElementById('diceOne').src = 'dice-' + diceOne + '.png';
    document.getElementById('diceTwo').src = 'dice-' + diceTwo + '.png';

    //3. Update the round score IF the rolled number was NOT a 1
    if (diceOne === 6 && lastDice === 6){
        //Player loses score
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
    }else if (diceOne !== 1 && diceTwo !==1){
        //Add score
        roundScore += diceOne + diceTwo;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
        //Next player
        nextPlayer();
    }
    lastDice = diceTwo;
 }
   
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){

    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    var input = document.querySelector('.final-score').value;
    var winningScore;
    if(input){
        winningScore = input;
    }else{
        winningScore = 100;
    }


    //Check if player won the game
    if(scores[activePlayer] >= winningScore){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
        document.getElementById('diceOne').style.display = 'none';
        document.getElementById('diceTwo').style.display = 'none';
        document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
        gamePlaying = false;
    }else{
        //Next player
        nextPlayer();
    }
}

});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.getElementById('diceOne').style.display = 'none';
        document.getElementById('diceTwo').style.display = 'none'; 
    
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.getElementById('diceOne').style.display = 'none';
    document.getElementById('diceTwo').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
