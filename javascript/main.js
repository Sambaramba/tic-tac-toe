const getGameBoard = (function () {
    //change to empty array?
    let grid = new Array(9).fill("");

    const getGridCell = () => {}
    return {grid};
})();

console.log(getGameBoard);


function createPlayer(name) {
    
    let playerScore = 0;
    const playerNumber = name.charAt(name.length - 1);
    let playerSymbol;
    const selectSymbol = () => {
        let symbol;
        do {
            symbol = prompt(`${name} please choose either X or O`).toUpperCase();
        } while (symbol !== "X" && symbol !== "O");
        
        return playerSymbol = symbol;
    }

    const getPlayerScore = () => playerScore;
    const increasePlayerScore = () => { playerScore++; };
    const getPlayerSymbol = () =>  playerSymbol;
    const changePlayerSymbol = (newValue) => playerSymbol = newValue;
    return { name, playerNumber, getPlayerSymbol, getPlayerScore, increasePlayerScore, selectSymbol, changePlayerSymbol};
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

//want to retreive player symbol from the player argument
//use the squareSelection value to loop through the gameboard.grid
//if its empty add player symbol
//if not select another square
//is there a way to loop through and find all available squares before while loop?
//maybe Array.every for first turn
//then if false get all indexs that are empty
//add numbers to new array? or string of numbers? then change pattern and prompt to only allow those numbers?
function playerTurn(player) {
    //if none free squares display game over with winner - call win condition func
    //loop through gameboard and find all empty indexes
    // get those numbers
    //add to prompt and pattern

    
    
    let squareSelection;
    
    const getSquareSelection = () => squareSelection;
    
    //-------DOESN'T ADD 0 INDEX TO EMPTY CELLS----------------

    //is it because zero is falsy value?

    const selectGameboardSquare = () => {
        let arrayOfEmptyCells = [];
        let emptyValue = "";
        getGameBoard.grid.forEach((element, index) => {
            if(element === emptyValue) {
                let square = ++index;
                arrayOfEmptyCells.push(square);
            }
        })

        let emptyCells = parseInt(arrayOfEmptyCells.join(""));
        let numberInRangeCheck = new RegExp (`^[${emptyCells}]$`);

        do {
            squareSelection = prompt(`Please choose one of these numbers ${emptyCells} to select grid square`);
        } while (!numberInRangeCheck.test(squareSelection) || squareSelection === null);

        --squareSelection
        console.log(squareSelection);
       return  squareSelection;
    }
    //below console.logs gets called twice and return undefined
    console.log(squareSelection);
    console.log(getGameBoard.grid);
    
    //so loop through gameboard grid
    //do i put that method/function in gameboard or turn func?
    //use square selection as index to search array
    //check if empty and add if so
    //else ask for new square selection
    // getGameBoard.getGridCell(squareSelection);
    
    
    // for (let cell of getGameBoard.grid) {
    //     if (containsNothing(cell))
    //     console.log(cell);
    // }
    
    

    return {getSquareSelection,selectGameboardSquare}
}

playerTurn(player1).selectGameboardSquare();
//below returns undefined
//do i need to instance playerTurn? or add squareSelection as property for players then access it in playerTurn?
console.log(playerTurn(player1).getSquareSelection());

// if(playe)

//1st player has odd turns
//other player has even turns;
// 2 seperate counts for turns;
function playRound(number) {
    const player1 = createPlayer("Player1");
    const player2 = createPlayer("player2");
    
    player1.selectSymbol();
    console.log(player1.getPlayerSymbol());
    player1.getPlayerSymbol() === "X" ? player2.changePlayerSymbol("O") : player2.changePlayerSymbol("X");
    console.log(player2.getPlayerSymbol());
    
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
    //swap this to containsSomething and value !==
    // const containsSomething = (currentValue) => currentValue !== "";
    // if (getGameBoard.grid.every(containsSomething)) {
    //     console.log("all contain something");
    // }
    
}