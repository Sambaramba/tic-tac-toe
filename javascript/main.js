const getGameBoard = (function () {
    //change to empty array?
    let grid = new Array(9).fill("");

    const getGridCell = () => {}
    return {grid};
})();

console.log(getGameBoard);


function createPlayer(name) {
    
    let userName;
    const selectUserName = () => {
        return userName =  prompt(`Player ${playerNumber} please choose your name`);
    
    }
    const getUserName = () => userName;

    //stores last character of player name which will be either 1 or 2;
    const playerNumber = name.charAt(name.length - 1);
    const getPlayerNumber = () => playerNumber;

    let playerSymbol;
    const selectSymbol = () => {
        let symbol;
        do {
            symbol = prompt(`${name} please choose either X or O`).toUpperCase();
        } while (symbol !== "X" && symbol !== "O");
        
        return playerSymbol = symbol;
    }
    const getPlayerSymbol = () =>  playerSymbol;
    const changePlayerSymbol = (newValue) => playerSymbol = newValue;
     
    // let playerScore = 0;
    // const getPlayerScore = () => playerScore;
    // const increasePlayerScore = () => { playerScore++; };
 
    return { name, selectUserName, getUserName, selectSymbol, getPlayerNumber, getPlayerSymbol, changePlayerSymbol};
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
    // if ( turn > 4 && checkWinCondition()) {
    //     return console.log("game over");
    // };

    turn++;

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

    // if(checkWinCondition()) {
    //     return;
    // };
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

    //want this in game logic func if doing multi rounds.
    const player1 = createPlayer("Player1");
    const player2 = createPlayer("player2");
    player1.selectUserName();
    player2.selectUserName();

    //choose random player code
    // const randomPlayerChoice = () => {return  Math.floor(Math.random() * 2) + 1};
    // randomPlayerChoice() === 1 ? player1.selectSymbol() : player2.selectSymbol();
    
    
    player1.selectSymbol();
    //could i change ternary to be `player${randomPlayerChoice()}`.getPlayerSymbol() in condition?
    //or store in var and add to above expression?
    //maybe then store opposite in another var for rest of expression?
    player1.getPlayerSymbol() === "X" ? player2.changePlayerSymbol("O") : player2.changePlayerSymbol("X");

    //where to change playersTurn value?
    //does it go in win condition? or round/game?
    //is it && or || for condition?
    while (turn < 10 && checkWinCondition() === false) {
        console.log(`turn no is ${turn}`);
        playersTurn === 1 ? playerTurn(player1) : playerTurn(player2);
    }
    
    //how to attach to players.symbol?
    //add players to checkWinCondition?
    //make win condition a function/object factory?
    //else make it an iife
    
    if(checkWinCondition() === player1.getPlayerSymbol()) {
       console.log("Player 1 has won");
    }
    if (checkWinCondition() === player2.getPlayerSymbol()) {
       console.log("Player 2 has won");
    }

    if (checkWinCondition() === "draw") {
        console.log("its a draw");
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

/*
    0,1,2  0,3,6  0,4,8
    3,4,5  1,4,7  2,4,6
    6,7,8  2,5,8
*/
//take player?
//could insert player symbol?
//change func name for better desciption?
//where add func to check?
function checkWinCondition() {
    
    //regEx to match all 8 win conditions;
    const winConditions = /0[12|36|48]{2}|(345)|(147)|2[46|58]{2}|678/g

    let stringOfXIndexes = "";
    let stringOfOIndexes = "";
    console.log(getGameBoard.grid);
    getGameBoard.grid.forEach((value, index) => {
        
        // console.log(index);
        if(value === "X") {
            stringOfXIndexes+=index;
            console.log(`x index string is now ${stringOfXIndexes}`);
        }
        if(value === "O") {
            stringOfOIndexes+=index;
            console.log(`O index string is now ${stringOfOIndexes}`)
        }

    })

    //return sumbol/player/player.number/boolean?
    if (winConditions.test(stringOfXIndexes)) {
        console.log("X is the winner");
        return "X";
    }
    if (winConditions.test(stringOfOIndexes)) {
        console.log("O is the winner");
        return "O";
    }
    
    const hasValue = (currentValue) => currentValue !== "";
    if (getGameBoard.grid.every(hasValue) && !winConditions.test(stringOfOIndexes)) {
        console.log("Draw");
        return "draw";
    }
    return false;
    
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

    //----------win condition func-----------//
    //switch statement?
    //loop through gameboard.grid
    //filter/forEach/some?
    //or do you check for all cells that contain x and o and test against patterns?
    //or do you do every with each switch statement? is that a thing?
    //or regEx with all the groups? then link to array indexs values x/o?
    //swap this to containsSomething and value !==

    //  let arrayOfCrosses = getGameBoard.grid.filter((value, index) => {
    //     console.log(value);
    //     console.log(index);
    //     if(value === "X") {
    //         console.log(index);
    //         // arrayOfCrosses.push(index);
    //         console.log(`type of crosses array = ${typeof arrayOfCrosses}`)
    //     }
    // })
    // console.log(arrayOfCrosses);
    // arrayOfCrosses.join();
    //is it test? and make sure regEx is fine
    
    // let arrayOfNoughts = []
    // arrayOfNoughts = getGameBoard.grid.filter((value, index) => {
    //     if(value === "X") {
    //         console.log(index);
    //         // arrayOfNoughts.push(index);
    //         console.log(`type of noughts array = ${typeof arrayOfNoughts}`);
    //     }
    // });
    // arrayOfNoughts.join();
    
    // if (winConditions.test(arrayOfCrosses) ||
    //     winConditions.test(arrayOfNoughts)) {

    //     return true;
    // }
    // return false;