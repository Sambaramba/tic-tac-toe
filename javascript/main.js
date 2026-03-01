const getGameBoard = (function () {
    //change to empty array?
    let grid = new Array(9).fill("");

    const getGridCell = () => {}
    return {grid};
})();

console.log(getGameBoard);


function createPlayer(name) {
    
    let playerScore = 0;
    //stores last character of player name which will be either 1 or 2
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
    const getPlayerNumber = () => playerNumber;
    const getPlayerSymbol = () =>  playerSymbol;
    const changePlayerSymbol = (newValue) => playerSymbol = newValue;
    return { name, playerNumber,getPlayerNumber, getPlayerSymbol, selectSymbol, changePlayerSymbol};
}

//create turn flag for alternating turns;
let player1Turn = true;
let playersTurn = 1;
let turn = 1;


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

//make playerTurn an function factory so can do for player1 and 2?
//turn is just a method in round which itself is in game?
//so ive made into a function to turn into method later
//or make turn into a function factory and create players instances?
function playerTurn(player) {
    //increment turn count
    turn++

    const playerSymbol = player.getPlayerSymbol();
    // console.log(`players turn before if is ${playersTurn}`);
    //code to alternate turns?
    if (playersTurn) {
        playersTurn === 1 ? playersTurn = 2 : playersTurn = 1;
    } else (console.log(`players turn value = ${playersTurn}`))

    let playersSelectedSquare;
    
    function selectGameboardSquare() {
        //create new array and add all empty gameboard cells to it
        let arrayOfEmptyCells = [];
        let emptyValue = "";
        getGameBoard.grid.forEach((element, index) => {
            if(element === emptyValue) {
                //if true add value of following index num to array
                let cell = ++index;
                arrayOfEmptyCells.push(cell);
            }
        });
        let emptyCells = parseInt(arrayOfEmptyCells.join(""));
        let numberInRangeCheck = new RegExp (`^[${emptyCells}]$`);

        do {
            playersSelectedSquare = prompt(`Please choose one of these numbers ${emptyCells} to select grid square`);
        } while (!numberInRangeCheck.test(playersSelectedSquare) || playersSelectedSquare === null);
        
        --playersSelectedSquare;
       return playersSelectedSquare;
    }
    
    selectGameboardSquare();
    getGameBoard.grid[playersSelectedSquare] = playerSymbol;
    return;


    //so this needs to be number from 0-8
    //This is return func to input square directly when get from ui;
    return function (selectedCell) {
        if(getGameBoard.grid[selectedCell] !== ""){
            console.log(`Cell ${selectedCell} contains ${getGameBoard.grid[selectedCell]}, choose another cell`);
        }
        getGameBoard.grid[selectedCell] = playerSymbol;
        return;
    };
}


//1st player has odd turns
//other player has even turns;
//could change who chooses symbol on odd/even rounds?
//reset symbols and turn on round finish

function playRound() {
    const player1 = createPlayer("Player1");
    const player2 = createPlayer("player2");
    
    player1.selectSymbol();
    player1.getPlayerSymbol() === "X" ? player2.changePlayerSymbol("O") : player2.changePlayerSymbol("X");

    //where to change playersTurn value?
    //does it go in win condition? or round/game?
    
    while (turn < 10) {
        console.log(`turn no is ${turn}`);
        playersTurn === 1 ? playerTurn(player1) : playerTurn(player2);
    }
    
    const checkForEmptyValue = (currentValue) => currentValue === "";
    
    console.log(getGameBoard.grid);
    
   

}

playRound();

function playGame(numberOfRounds) {

}

// console.log(controlGameFlow().player1.name);
// console.log(controlGameFlow().randomPlayerChoice());

// playRound();
// playRound().selectGameBoardSquare();


//so could only allow 9x playerTurns
//then from turn 5 onwards start checking grid for 3 in row;
function checkWinCondition() {
    //swap this to containsSomething and value !==
    // const hasValue = (currentValue) => currentValue !== "";
    // if (getGameBoard.grid.every(hasValue)) {
    //     console.log("all contain something");
    // }
    
}

//------------------UNUSED CODE-------------------//

//----for playerTurn/game logic-------------------//

// for (let cell of getGameBoard.grid) {
    //     if (containsNothing(cell))
    //     console.log(cell);
    // }


//-----play round func----------//



    // let selectedCell = prompt("choose number between 0 and 8");
    // const player1Turn = playerTurn(player1);
    // const player2Turn = playerTurn(player2);
    // player1Turn ? playerTurn(player1, playersTurn) : playerTurn(player2, playersTurn);

//get syntax error with every in the while condition
    // if(!getGameBoard.grid.every(checkForEmptyValue)) {
    //     console.log("grid is full")
    // }
    //    playersTurn === 1 ?  playersTurn = 2 : playersTurn === 1;

    // let chooseGameboardCell = prompt("choose number between 0 and 8");
    
    // player2Turn(5);
    // console.log(getGameBoard.grid);
    // player1Turn(1);
    // console.log(getGameBoard.grid);
    // player2Turn(0);
    // console.log(getGameBoard.grid);
    // player1Turn(2);
    // console.log(getGameBoard.grid);
    // player2Turn(3);
    // console.log(getGameBoard.grid);
    // player1Turn(6);
    // console.log(getGameBoard.grid);
    // player2Turn(6);
    // console.log(getGameBoard.grid);
    // player1Turn(8);
    // console.log(getGameBoard.grid);
    
    // for (let turn = 1 ; turn <= 9 ; turn++) {

    // }