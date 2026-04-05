//make grid into array of objects with properties e.g. cellNo,value

const gameBoard = (function () {
    //change to empty array?
    let grid = new Array(9).fill("");

    const getGridCell = () => {}
    const resetGrid = () => {}
    return {grid};
})();

console.log(gameBoard);


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
        //do i need symbol or can i just update playerSymbol?
        let symbol;

        let randomChoice = Math.floor(Math.random() * 2) + 1;
        console.log(randomChoice);

        switch(randomChoice) {
            case 1:
                symbol = "X";
                console.log(`symbol in switch is ${symbol}`)
                break
            case 2:
                symbol = "O";
                console.log(`symbol in switch is ${symbol}`)
                break
            default:
                console.log("default in select symbol method ran")
        }
        // do {
        //     symbol = prompt(`${name} please choose either X or O`).toUpperCase();
        // } while (symbol !== "X" && symbol !== "O");
        
        return playerSymbol = symbol;
    }
    const getPlayerSymbol = () =>  playerSymbol;

    //method takes argument and updates players symbol
    const changePlayerSymbol = (newValue) => playerSymbol = newValue;
     
    // let playerScore = 0;
    // const getPlayerScore = () => playerScore;
    // const increasePlayerScore = () => { playerScore++; };
    // const resetPlayerScore = () => { playerScore = 0;}
    return { name, selectUserName, getUserName, selectSymbol, getPlayerNumber, getPlayerSymbol, changePlayerSymbol};
}

//create turn flag for alternating turns;
//put them in game logic?
// let player1Turn = true;
let playersTurn = 1;
let turn = 1;


//playerTurn is func factory i think
//do i add to round/game func? as method?
function playerTurn(player) {
    

    const playerSymbol = player.getPlayerSymbol();
    // console.log(`players turn before if is ${playersTurn}`);
    

    //so this needs to be number from 0-8
    //This is return func to input square directly when get from ui;
    return function (selectedCell) {
       
        //alternate turns
        if (playersTurn) {
        playersTurn === 1 ? playersTurn = 2 : playersTurn = 1;
        console.log(`players turn is ${playersTurn}`);
        } else (console.log(`players turn value = ${playersTurn}`))
        
        //add players symbol to selected cell
        gameBoard.grid[selectedCell] = playerSymbol;
        
        turn++;
        return;
    };
}


//1st player has odd turns
//other player has even turns;
//could change who chooses symbol on odd/even rounds?
//or randomly select who chooses first
//then alternate with flag? or ternary?
//reset symbols and turn on round finish

function playRound() {

    //want this in game logic func if doing multi rounds.
    const player1 = createPlayer("Player1");
    const player2 = createPlayer("player2");
    // player1.selectUserName();
    // player2.selectUserName();

    //choose random player code
    // const randomPlayerChoice = () => {return  Math.floor(Math.random() * 2) + 1};
    // randomPlayerChoice() === 1 ? player1.selectSymbol() : player2.selectSymbol();
    
    player1.selectSymbol();
    
    //player 2 gets alternative symbol
    player1.getPlayerSymbol() === "X" ? player2.changePlayerSymbol("O") : player2.changePlayerSymbol("X");

    
    const randomCellChoice = () => { 
        let cellChoice = Math.floor(Math.random() * 9);
        
        do {cellChoice = Math.floor(Math.random() * 9)}
        while (gameBoard.grid[cellChoice] !== "");

        return cellChoice;
    };

    while (turn < 10 && checkWinCondition() === false) {
        console.log(gameBoard.grid);
        const player1Turn = playerTurn(player1);
        const player2Turn = playerTurn(player2);
        console.log(`turn no is ${turn}`);
        let player1Choice = randomCellChoice();
        let player2Choice = randomCellChoice();

        playersTurn === 1 ? player1Turn(player1Choice) : player2Turn(player2Choice);
    }
    
    

    
    function displayWinCondition() {
        const winConditionResult = checkWinCondition();

        switch(winConditionResult) {
            case player1.getPlayerSymbol():
                console.log("Player 1 has won");
                break;
            case player2.getPlayerSymbol():
                console.log("Player 2 has won");
                break;
            case "draw":
                console.log("its a draw");
                break;
        }
        
    }
    displayWinCondition();
    
   return;

}

playRound();

function playGame(numberOfRounds) {

}

//list of win condition matches
/*
    0,1,2  0,3,6  0,4,8
    3,4,5  1,4,7  2,4,6
    6,7,8  2,5,8
*/

//make win condition a function/object factory?
//else make it an iife
function checkWinCondition() {
    
    //regEx to match all 8 win conditions;
    const winConditions = /(0(12|36|48))|(345)|(147)|(2(46|58))|678/g

    let stringOfXIndexes = "";
    let stringOfOIndexes = "";
    gameBoard.grid.forEach((value, index) => {
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
    if (gameBoard.grid.every(hasValue) && !winConditions.test(stringOfOIndexes)) {
        console.log("Draw");
        return "draw";
    }
    return false;
    
}




{/* <div id="container">
    <div id="title">Tic-tac-toe</div>
        <div id="display">"Please click start game button to begin"</div>
    <div id="gameboard">
        <div id="cell1" class="cell"></div>
        <div id="cell2" class="cell"></div>
        <div id="cell3" class="cell"></div>
        <div id="cell4" class="cell"></div>
        <div id="cell5" class="cell"></div>
        <div id="cell6" class="cell"></div>
        <div id="cell7" class="cell"></div>
        <div id="cell8" class="cell"></div>
        <div id="cell9" class="cell"></div>
    </div>
    <div id="game-buttons">
        <button type="button">Start Game</button>
        <button type="button">Restart Game</button>
    </div>
</div> */}

//what do i need in this?
//display Ui
//display gameboard logic
//display grid by adding div with gameboard then looping through array to add values
//do need to make array of objects to link index to grid cell?
//so for each array element add grid class to div for cell
//then add value as text content?
//made into IIFE
//do create element object factory to save code
//destructure arguments with {}?
//what is this? should it be object factory?
//think its just a function
function createDomElement(element, text, elementId, elementClass, attribute, attributeValue) {
       const domElement = document.createElement(element);
       if(text) {domElement.textContent = text}
       if(elementId) { domElement.id = elementId}
       if(elementClass) { domElement.classList.add(elementClass)}
       if(attribute) {domElement.setAttribute(attribute, attributeValue)}
       console.log(domElement);
       return domElement;
}

// createDomElement("div", "suck my choad", "container", "griddle");

const displayUiGameLogic = (function() {
     

    const displayUi = () => {
        const body = document.querySelector("body");
        const containerDiv = createDomElement("div","","container","","","");
        body.appendChild(containerDiv);

        const title = createDomElement("div", "Tic-Tac-Toe","title", "","","");
        const display = createDomElement("div","Please click start game button to begin","display","","","");
        const gameboard = createDomElement("div","","gameboard","","","");

        const gameButtons = createDomElement("div","","game-buttons","","","");
        const startButton = createDomElement("button","Start Game","start","","type","button");
        const restartButton = createDomElement("button","Restart Game","restart","","type","button");
        gameButtons.append(startButton, restartButton);

        containerDiv.append(title, display,gameboard,gameButtons);
    }
    //want to delete gameboard if exists before this so dont make multiple
    const displayGameboardOnPage = () => {
        const gameboardDiv = document.createElement("div");
        // const display = document.querySelector("#display");
        gameboardDiv.id = "gameboard";
        //loop through gameboard grid and add cell for each element with id and value
        //use below in loop
        gameBoard.grid.forEach((value, index) => {
            console.log(`cell value is ${value}`);
            console.log(`cell index is ${index}`);
            const cellDiv = document.createElement("div");
            const nextIndex = index++;
            cellDiv.classList.add("cell", `cell${nextIndex}`);
            console.log(`nextIndex is ${nextIndex}`);
            gameboardDiv.appendChild(cellDiv);

        })
        
        //add after display div in html
        gameboardDiv.insertBefore(display);
      }
    return {displayUi};
})()

//add to dom content loaded event
displayUiGameLogic.displayUi();

//------------------UNUSED CODE-------------------//

//----for playerTurn/game logic-------------------//

// if ( turn > 4 && checkWinCondition()) {
    //     return console.log("game over");
    // };
    
    // console.log(`turn is ${turn}`);
    // console.log(randomCellChoice());



    // let playersSelectedSquare;
    
    // function selectGameboardSquare() {
    //     //create new array and add all empty gameboard cells to it
    //     let arrayOfEmptyCells = [];
    //     let emptyValue = "";
    //     gameBoard.grid.forEach((element, index) => {
    //         if(element === emptyValue) {
    //             //if true add value of following index num to array
    //             let cell = ++index;
    //             arrayOfEmptyCells.push(cell);
    //         }
    //     });
    //     let emptyCells = parseInt(arrayOfEmptyCells.join(""));
    //     let numberInRangeCheck = new RegExp (`^[${emptyCells}]$`);

    //     do {
    //         playersSelectedSquare = prompt(`Please choose one of these numbers ${emptyCells} to select grid square`);
    //     } while (!numberInRangeCheck.test(playersSelectedSquare) || playersSelectedSquare === null);
        
    //     --playersSelectedSquare;
    //    return playersSelectedSquare;
    // }
    
    // selectGameboardSquare();
    // gameBoard.grid[playersSelectedSquare] = playerSymbol;
    // return;


// for (let cell of getGameBoard.grid) {
    //     if (containsNothing(cell))
    //     console.log(cell);
    // }

     // console.log(selectedCell);
        // if(gameBoard.grid[selectedCell] !== ""){
        //     console.log(selectedCell);
        //     console.log(`Cell ${selectedCell} contains ${gameBoard.grid[selectedCell]}, choose another cell`);
        // }


//-----play round func----------//

//make turn a func factory with players as instances
    //then replace below with the instances
    //and call random cell choice for the argument
    //so randomly choooses a square each time
    //hopefully zero as value is accepted for grid cell
    // while (turn < 10 && checkWinCondition() === false) {
    //     console.log(`turn no is ${turn}`);
    //     playersTurn === 1 ? playerTurn(player1) : playerTurn(player2);
    // }

    //where to change playersTurn value?
    //does it go in win condition? or round/game?
    //is it && or || for condition?

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

    // const checkForEmptyValue = (currentValue) => currentValue === "";
    
    // console.log(gameBoard.grid);

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

//-----------random player choice/alternate rounds------------------


//add a .starts property for both
//dependant on randomPlayerChoice value add true and false to .starts for each
//e.g. if 1 check against player.playerNumber() and if 1 change player.Starts to true for player1 and vise versa for 2;

// const pickRandom = (() {

    
    
//     const randomPlayerChoice = () => {return  Math.floor(Math.random() * 2) + 1};
//     //should put empty cell check in below method?
//     const randomCellChoice = () => {

//         return  Math.floor(Math.random() * 9)
//     };

//     return {randomPlayerChoice, randomCellChoice};
// });