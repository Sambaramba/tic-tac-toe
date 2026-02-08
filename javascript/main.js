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

    const getPlayerScore = () => playerScore;
    const increasePlayerScore = () => { playerScore++; };
    const getPlayerValue = () =>  playerValue;
    const changePlayerValue = (newValue) => playerValue = newValue;
    return { name, playerNumber, getPlayerValue, getPlayerScore, increasePlayerScore, selectSymbol, changePlayerValue};
}

//create turn flag for alternating turns;
let player1Turn = true;


//add a .starts property for both
//dependant on randomPlayerChoice value add true and false to .starts for each
//e.g. if 1 check against player.playerNumber() and if 1 change player.Starts to true for player1 and vise versa for 2;

// function controlGameFlow() {

    
    
//     const randomPlayerChoice = () => {return  Math.floor(Math.random() * 2) + 1};
//     return {player1, player2, randomPlayerChoice};
// }
//or to swap turns could destructure and swap e.g. [a,b] = [b.a];

const player1 = createPlayer("Player1");
const player2 = createPlayer("player2");

//prompt grid cell selection
//then check if empty
//if empty add players symbol(x or o);
//change from while loop to some other iteration?
//regEx
function playerTurn(player) {
     const selectGameboardSquare = () => {
        let squareSelection;
        const numberInRangeCheck = /^[0-8]$/;
        do {
           squareSelection = prompt("Enter a number between 0-8 to place piece");
        } while (!numberInRangeCheck.test(squareSelection) || squareSelection === null);
        //WHILE LOOP IS BROKEN - CONDITION DOESN'T WORK
        console.log(typeof squareSelection);
        console.log(squareSelection);
        
       return squareSelection;
    }
    return {selectGameboardSquare}
}

playerTurn(player1).selectGameboardSquare();

//1st player has odd turns
//other player has even turns;
// 2 seperate counts for turns;
function playRound(number) {
    // const player1 = createPlayer("Player1");
    // const player2 = createPlayer("player2");
    
    player1.selectSymbol();
    console.log(player1.getPlayerValue());
    player1.getPlayerValue() === "X" ? player2.changePlayerValue("O") : player2.changePlayerValue("X");
    console.log(player2.getPlayerValue());
    
    // for (let turn = 1 ; turn <= 9 ; turn++) {

    // }
   

}

function playGame() {

}

// console.log(controlGameFlow().player1.name);
// console.log(controlGameFlow().randomPlayerChoice());

// playRound();
// playRound().selectGameBoardSquare();


//so could only allow 9x playerTurns
//then from turn 5 onwards start checking grid for 3 in row;
function checkWinCondition() {
    
}