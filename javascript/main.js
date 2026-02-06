const useGameBoard = (function () {
    let grid = new Array(9).fill("");
    return {grid};
})();

console.log(useGameBoard);


function createPlayer(name) {
    
    let playerScore = 0;
    const playerNumber = name.charAt(name.length - 1);
    let playerValue;
    const selectSymbol = () => {
        let symbol;
        do {
            symbol = prompt(`${name} please choose either X or O`).toUpperCase();
        } while (symbol !== "X" && symbol !== "O");
        
        return playerValue = symbol;
    }
    console.log(playerValue);

    const getPlayerScore = () => playerScore;
    const increasePlayerScore = () => { playerScore++; };
    const getPlayerValue = () =>  playerValue;
    // const changePlayerValue = ()
    return { name, playerNumber, getPlayerValue, getPlayerScore, increasePlayerScore, selectSymbol};
}

//create turn flag for alternating turns;
let player1Turn = true;




// function controlGameFlow() {

    
    
//     const randomPlayerChoice = () => {return  Math.floor(Math.random() * 2) + 1};
//     return {player1, player2, randomPlayerChoice};
// }
//or to swap turns could destructure and swap e.g. [a,b] = [b.a];
function playRound() {
    const player1 = createPlayer("Player1");
    const player2 = createPlayer("player2");
    
    player1.selectSymbol();
    console.log(player1.getPlayerValue());
    // player1.getPlayerValue() === "X" ? console.log(true) : console.log(false);
    console.log(player1);
    // player1.playerValue = "X";
    // player2.playerValue = "O";
}

function playGame() {

}

// console.log(controlGameFlow().player1.name);
// console.log(controlGameFlow().randomPlayerChoice());

playRound();



//prompt grid cell selection
//then check if empty
//if empty add players symbol(x or o);
function playerTurn(player, ) {

}

//so could only allow 9x playerTurns
//then from turn 5 onwards start checking grid for 3 in row;
function checkWinCondition() {
    
}