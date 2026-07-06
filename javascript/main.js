



//--------HELPER/UTILS----------------------

//could just put in displayDom IIFE as private func factory?
function createDomElement(element, text, elementId, elementClass, attributes = {}) {
       const domElement = document.createElement(element);
       if(text) {domElement.textContent = text}
       if(elementId) { domElement.id = elementId}
       if(elementClass) { domElement.classList.add(elementClass)}
       if(attributes) {
         console.log(attributes);
         Object.entries(attributes).forEach(([key, value]) => {
            console.log(key)
            console.log(value)
            //if no value use if statement to check?
            domElement.setAttribute(key, value);
         });
       }   
       return domElement;
}


function createPlayer(name) {

    const getName = () => name;
    // const spacedName = `player ${playerNumber}`;
    const getSpacedName = () => `player ${playerNumber}`;
    
    let username;
    //made below more succinct so might be broken
    const selectUsername = (usernameValue) =>  username = usernameValue;
    const getUsername = () => username;

    //stores last character of player name which will be either 1 or 2;
    const playerNumber = parseInt(name.charAt(name.length - 1));
    const getNumber = () => playerNumber;

    

    let playerSymbol;
    const selectSymbol = (symbol) => playerSymbol = symbol;
    const getSymbol = () =>  playerSymbol;

    let selectedSquare;
    const selectSquare = (square) => selectedSquare = square;
    const getSelectedSquare = () => selectedSquare;
     
    // let playerScore = 0;
    // const getPlayerScore = () => playerScore;
    // const increasePlayerScore = () => { playerScore++; };
    // const resetPlayerScore = () => { playerScore = 0;}
    return { getName,getSpacedName, selectUsername, getUsername, getNumber, selectSymbol, getSymbol, selectSquare, getSelectedSquare};
}


//-------------------MAIN------------------------------------

//make grid into array of objects with properties e.g. cellNo,value
const gameBoard = (function () {
    //change to empty array?
    let grid = new Array(9).fill("");
    console.log(grid);
    const getGrid = () => grid;

    // const getGridSquare = (CellNum) => {}
    const getCellValue = (cellNum) => {
        console.log(grid[cellNum]);
        return grid[cellNum];
    };

    const changeCellValue = (cellNum, value) => {
        // console.log(grid);
        // const cellIndex = grid[cellNum]
        // console.log(`player symbol is ${playerSymbol}`);
        return grid[cellNum] = value;
    }
    //reset all textContents of cells to ""
    //as array loop through array and for each change value to "";
    //grid has not been called so is it accessible?
    const resetGrid = () => {
        grid.forEach((cell, index) => {
            grid[index] = "";
        })
    }
    return {getGrid, getCellValue, changeCellValue, resetGrid};
})();

// console.log(gameBoard.getGrid().length);

// gameBoard.changeCellValue(pickRandom.cell(), pickRandom.symbol());

//IIFE to display ui and game logic
//add events in this too or too big?
const displayUiGameLogic = (function() {
     
    const displayUi = () => {

        const containerDiv = createDomElement("div","","container","","");
        document.body.appendChild(containerDiv);
        const title = createDomElement("div", "Tic-Tac-Toe","title", "","");
        const display = createDomElement("div","Please click start game button to begin","display","","");
        const gameboard = createDomElement("div","","gameboard","","","");

        const gameButtons = createDomElement("div","","game-buttons","","");
        const startButton = createDomElement("button","Start Game","start-button","",{type: "button"});
        const restartButton = createDomElement("button","Restart Game","restart","",{type: "button"});
        gameButtons.append(startButton, restartButton);

        containerDiv.append(title, display,gameboard,gameButtons);
    }
    //call straight away so page has ui
    displayUi();
    
    //want to delete gameboard if exists before this so dont make multiple
    // have modal mode var that can be updated with method
    //this can be used to change modal content for name/symbol
    //method to create one of these modals can take player as parameter
    //this then can make them unique
    //need to reset modal after at somepoint
    //check if gameboard exists and wipe if does
    //or do reset gameboard method in gameboard that can be called first?
    //do you delete gameboard and re-add on each turn after cells values updated?
    const displayGameboard = () => {
        const gameboardDiv = document.querySelector("#gameboard");

        //clear grid first to prevent duplicates
        while(gameboardDiv.firstChild) {
            gameboardDiv.removeChild(gameboardDiv.firstChild);  
        }

        //loop through gameboard grid array and add cell for each element
        gameBoard.getGrid().forEach((value, index) => {

            const cellDiv =  createDomElement("div", value, `cell${index}`, "cell", {"data-cell-value": `${index}`, tabindex: 0});
            gameboardDiv.appendChild(cellDiv);

        })
      }
    displayGameboard();


    const updateCellValue = (selectedCell, symbol) => {

        let gameboardCell = document.querySelector(`#cell${selectedCell}`);
        gameboardCell.textContent = symbol;
    }


    const resetDisplayElement = () => {
        const displayElement = document.querySelector("#display");
        displayElement.textContent = "Please click start game button to begin";
    }
      //go back to creating and deleting modals
      //if do that adding events might be tough
      //as if create then add submit event does it give time to listen?
      //or just go back to creating two modals?
      //or keep as same
      //add submit event to form here?
      //then can link player object to input?
    const displayModal = (player) => {
        //destructure player name property to add value to modal
        const {getSpacedName, getName} = player;
        
        const dialogBackground = createDomElement("div","","","dialog-background","");
        const dialog = createDomElement("dialog", "", "", "","");
        const form = createDomElement("form", "", "", "",{action: "", method: "dialog"});
        const label = createDomElement("label", `${getSpacedName()} please choose your name`, "","",{for: "username-choice"});
        const input = createDomElement("input","","username-choice","",{type: "text", name:"username-choice",minlength: 1, maxlength: 35, required: ""});     
        const confirmButton = createDomElement("button","Confirm",`${getName()}Confirm`,"",{type: "submit"});
        // confirmButton.before(label,input);
        form.append(label,input,confirmButton);
        dialog.appendChild(form);
        dialogBackground.appendChild(dialog);
        document.body.appendChild(dialogBackground);

        
        eventListenerLogic.formSubmit(player);
    }

    return {displayUi, displayGameboard, displayModal,updateCellValue, resetDisplayElement};
})()

//need to choose symbol and player names before rest runs
//do i change all to methods?
//or while loop with symbols and names?
//make game into object
//then have get player name with each player as argument?
//then choose player symbol method
//can have other player symbol be chosen in it
//so make play round as play game method?





const gameLogic = (function() {

    //flag for alternating turns
    let playersTurn = 1;
    //method to find players turn
    const getPlayersTurn = () => playersTurn;

    //turn counter;
    let turn = 1;

    //to update display
    const display = document.querySelector("#display");

    //want this in game logic func if doing multi rounds.
    //if only created players instances are they only available in this object?
    const player1 = createPlayer("player1");
    const player2 = createPlayer("player2");
    player1.selectSymbol("X");
    player2.selectSymbol("O");
    
    
    //add player 1 modal
    //add player 1 confirm event with submit event?
    //adding round to player2 confirm would mess up multi-rounds(which don't matter now)
    function chooseNames(player) {
        // console.log(`${player1.getSpacedName()}'s username before modal is ${player1.getUsername()}`);
        // let playerUsernameValue;
        //make modals unique
        //create player 1 modal
        //confirm button deletes player 1 and adds player 2
        //player 2 confirm only deletes the modal
        
        // while(player1.getUsername() = undefined) {
        //     const dialog = document.querySelector(".dialog-background");
        //     const form = document.querySelector("form");
        //     if (!form || !dialog) {

        //     }

        // }

        displayUiGameLogic.displayModal(player1);
        //add to displayModal?
        // eventListenerLogic.confirmButton(player1);
        // const player1ConfirmBtn = document.querySelector("#player1Confirm");
        // console.log(player1ConfirmBtn);
        // player1ConfirmBtn
        //add player 1 modal confirm event here with below code?
        // displayUiGameLogic.displayModal(player2);

        // console.log(player1.getUsername());
        // if(player1.getUsername() === undefined) {
        //     displayUiGameLogic.displayModal("name", player1);
            
        // }

        // if(player2.getUsername() === undefined) {
        //     console.log("player 1 has chosen username");
        //     displayUiGameLogic.displayModal("name", player2);
        // };
        
        //how to get player 2 to pick name after?
        //or can i do choose name with player as argument?
        
        //can you attach event to the modal?
        //add whole player object?
        // displayUiGameLogic.displayModal("name", player2);
    }

    //broken displays a draw when won with last square selection
    function checkWinCondition() {
            
        //regEx to match all 8 win conditions;
        // const winConditions = /(0(12|36|48))|(345)|(147)|(2(46|58))|678/;
        const winConditions = /(0.*1.*2)|(0.*3.*6)|(0.*4.*8)|(3.*4.*5)|(1.*4.*7)|(2.*4.*6)|(2.*5.*8)|(6.*7.*8)/;
        //list of win condition matches
        /*
            0,1,2  0,3,6  0,4,8
            3,4,5  1,4,7  2,4,6
            6,7,8  2,5,8
        */

        let stringOfXIndexes = "";
        let stringOfOIndexes = "";

        gameBoard.getGrid().forEach((value, index) => {
            if(value === "X") {
                stringOfXIndexes+=index;
                console.log(`x index string is now ${stringOfXIndexes}`);
            }
            if(value === "O") {
                stringOfOIndexes+=index;
                console.log(`O index string is now ${stringOfOIndexes}`)
            }
        })

        let sortedX = stringOfXIndexes.split('').sort().join('');
        let sortedO = stringOfOIndexes.split('').sort().join('');

        //return sumbol/player/player.number/boolean?
        if (winConditions.test(sortedX)) {
            console.log("X is the winner");
            return "X";
        }

        if (winConditions.test(sortedO)) {
            console.log("O is the winner");
            return "O";
        }
        
        
        const hasValue = (currentValue) => currentValue !== "";
        // console.log("Current grid state during draw check:", gameBoard.getGrid())
        if (gameBoard.getGrid().every(hasValue)) { 
            return "draw";
        }
        
        return false;
    }    

        
    function displayWinCondition() {
        const winConditionResult = checkWinCondition();
        console.log(`win condition result is ${winConditionResult}`);

        switch(winConditionResult) {
            case player1.getSymbol():
                // display.textContent = "GAME OVER! Player 1 is the winner!";
                display.textContent = `GAME OVER! ${player1.getUsername()} is the winner!`;
                break;
            case player2.getSymbol():
                // display.textContent = "GAME OVER! Player 2 is the winner!";
                display.textContent = `GAME OVER! ${player2.getUsername()} is the winner!`;
                console.log("Player 2 has won");
                break;
            case "draw":
                console.log("its a draw");
                display.textContent = "GAME OVER! its a draw!";
                break;
        }
        
    }

    
    function playerTurn(player) {

        const playerSymbol = player.getSymbol();
        let selectedCell = player.getSelectedSquare();
        gameBoard.changeCellValue(selectedCell, playerSymbol);

        //update gameboard UI cell value
        displayUiGameLogic.updateCellValue(selectedCell, playerSymbol);


        if (playersTurn) {
            playersTurn === 1 ? playersTurn = 2 : playersTurn = 1;
            console.log(`players turn is now ${playersTurn}`);
            } else (console.log(`players turn value = ${playersTurn}`))
        turn++;

        if(turn >= 5) {
            console.log(`${turn} is greater than 5`);
            if(checkWinCondition()) {
                console.log(`check win condition is true`);
                //remove cell event listeners
                eventListenerLogic.removeGridCells();
                eventListenerLogic.removeRestartButton();
                displayWinCondition();
                //re-add start event for another game
                eventListenerLogic.startButton();
                return;
            };
        }
        display.textContent = `player ${playersTurn} please select a square`;

        return;
        
    }

    function resetGame() {
        playersTurn = 1;
        display.textContent = `player ${playersTurn} please select a square`;
        turn = 1;
        gameBoard.resetGrid();
        player1.selectUsername(undefined);
        player2.selectUsername(undefined);
        player1.selectSquare(undefined);
        player2.selectSquare(undefined);
    }

    function playRound() {

        //reset both vars at round start;
        // console.log(gameBoard.getGrid());
        
        playersTurn = 1;
        display.textContent = `player ${playersTurn} please select a square`;
        turn = 1;
        eventListenerLogic.addGridCells();
        //want this in playGame() if doing multi rounds.
        // const player1 = createPlayer("player1");
        // const player2 = createPlayer("player2");
        // player1.selectSymbol("X");
        // player2.selectSymbol("O");
        // player1.selectUserName();
        // player2.selectUserName();
        // displayUiGameLogic.displayModal(player1);



       // while (turn < 10 && checkWinCondition() === false) {
            
        //     console.log(`turn no is ${turn}`);
        //     playersTurn === 1 ? playerTurn(player1) : playerTurn(player2);
        //     console.log(gameBoard.getGrid());
        // }
        

        // displayWinCondition();
        console.log("This log has run at round func bottom");
        
        return;

    }
    
    return {chooseNames,resetGame, playRound, getPlayersTurn, playerTurn, player1, player2}
})();

// console.log(gameLogic.player1);





//---------EVENTS-----------------------------------------//


const eventListenerLogic = (function() {

    //create start method in gameLogic
    //then handler could be gameLogic.startButton?
    const startButton = () => {
        const startButton = document.querySelector("#start-button");
        startButton.addEventListener("click", (event) => {
            // reset()
            gameLogic.resetGame();
            displayUiGameLogic.displayGameboard();
            displayUiGameLogic.resetDisplayElement();
            console.log(event.target);
            eventListenerLogic.addRestartButton();
            gameLogic.chooseNames();
            gameLogic.playRound();
        }, { once: true });
    }
    //can you take player 1 and 2 as inputs and destructure choose username/symbol to update each player?
    //if called in game choose username/symbol methods?
    //link player to form another way?
    const formSubmit = (player) => {
        console.log("form submit event has been added");
        const {selectSymbol,getSpacedName, selectUsername, getNumber} = player;
        const form = document.querySelector("form");
    
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log(event.target);
            console.log(event.submitter);
            console.log(event.submitter.id);
            const formData = new FormData(event.target);
            console.log(formData);
            const usernameChoice = formData.get('username-choice'); 
            player.selectUsername(usernameChoice);
            console.log(`${player.getSpacedName()}'s username is ${player.getUsername()}`);
            
            
            const dialogBackground = document.querySelector(".dialog-background");
            dialogBackground.remove();
            // console.log(player.getUsername());
            // console.log(player.getSymbol());
            // console.log(typeof player.getNumber());
            //works but then how do you remove player 2 modal?
            //think needs to be in confirm button
            // if(event.submitter.id = "player1Confirm") {
            //     console.log("submitter id if worked");
            //     displayUiGameLogic.displayModal(gameLogic.player2);
            // }
            // code to add player 2 username modal
            if (player.getNumber() === 1) {
                console.log("confirm event ran");
                displayUiGameLogic.displayModal(gameLogic.player2);
            }
            
            // console.log(usernameChoice, symbolChoice);

        }, { once: true });
    }
    //can add click event to type=submit?
    //if not do i just add to submit event?
    //think this is obselete
    const confirmButton = (player) => {
        // console.log("confirm event ran");
        const{getName,getNumber} = player;
        const playerName = player.getName();
        const playerNumber = player.getNumber();
        // console.log(`player number is ${player.getNumber()}`)
        // console.log(`player name is ${player.getName()}`);
        const playerConfirmBtn = document.querySelector(`#${player.getName()}Confirm`);


        playerConfirmBtn.addEventListener("click", (event) => {
            // console.log(event);
        // console.log(`player is ${player.getNumber()}`);
            if (player.getNumber() === 1) {
                // console.log("confirm event ran");
                displayUiGameLogic.displayModal(gameLogic.player2);
            }
            // switch(player.getNumber())  {
            //     case 1:
                    
            //         break;
            //     case 2:
            //         console.log(`${player.getName()} triggered confirm button`);
            //     break;
            //     default console.log("confirm button default ran");

            // }
            
        })
        //closest use?
        //does that negate need for player parameter?
        //or as players instances are now global do switch?

    }

    const addRestartButton = () => {
        const restartButton = document.querySelector("#restart");
        restartButton.addEventListener("click", restartButtonHandler, { once: true });
    }

    const removeRestartButton = () => {
        const restartButton = document.querySelector("#restart");
        restartButton.removeEventListener("click", restartButtonHandler, { once: true });
    }

    function restartButtonHandler(event) {
        console.log("restart event has fired");
            // gameBoard.resetGrid();
            // reset();
            gameLogic.resetGame();
            displayUiGameLogic.displayGameboard();
            displayUiGameLogic.resetDisplayElement();
            // gameLogic.player1.selectUsername(undefined);
            // gameLogic.player2.selectUsername(undefined);
            // gameLogic.player1.selectSquare(undefined);
            // gameLogic.player2.selectSquare(undefined);
            // console.log(`player 1 username is ${gameLogic.player1.selectUsername()}`);
            // console.log(`player 1 sqaure selection is ${gameLogic.player1.getSelectedSquare()}`);
            // console.log(`player 2 username is ${gameLogic.player2.getUsername()}`);
            // console.log(`players turn is ${gameLogic.getPlayersTurn()}`);
            // console.log(`player 2 square selection is ${gameLogic.player2.getSelectedSquare()}`);
            //reset turn counter too?
            eventListenerLogic.startButton();
            //reset display element to Please click start game button to begin
            //make method in display to reset gameboard and display?
            // console.log(gameLogic.player1.getUsername();
            // console.log(gameBoard.getGrid());
    }

    //try to destructure players and gameLogic for use throughout event func factory
    const addGridCells = () => {
        
        let cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", cellHandler, {once: true});
        })
    }

    const removeGridCells = () => {
        let cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.removeEventListener("click", cellHandler, {once: true});
            console.log("removed cell click event");
        })
    }

    //private function for add/remove cells events
    function cellHandler(event) {

        //store cell event value
        let dataCellValue = event.target.dataset.cellValue;

        //add cell event value to whichever player's turn it is
        if(gameLogic.getPlayersTurn() === 1) {
            gameLogic.player1.selectSquare(dataCellValue);
            gameLogic.playerTurn(gameLogic.player1);
        } else if(gameLogic.getPlayersTurn() === 2) {
            gameLogic.player2.selectSquare(dataCellValue);
            gameLogic.playerTurn(gameLogic.player2);
        } else console.log(`players turn if statement doesnt work`);         
    }

    return{startButton, formSubmit, addGridCells, removeGridCells,confirmButton,addRestartButton, removeRestartButton};
})();

//do i just call this straight away in the IIFE?
//or after add startButton?
eventListenerLogic.startButton();
// eventListenerLogic.restartButton();


// eventListenerLogic.formSubmit();
// eventListenerLogic.addGridCells();

//want to be active only when selected start button but after chosen names and symbols
//dunno if any of below listener works
//want event to add selected cell to grid
//and only select each cell once
// const gameboard = document.querySelector("#gameboard");
// gameboard.addEventListener("click", (event) => {
//     const gameboardCell = event.target.closest(".cell");
//     if (!gameboard) return;
        // event.preventDefault()
// }) 


//------------------UNUSED CODE-------------------//

//------------pick random iife---------------------------------

// const pickRandom = (()=> {

//     const player = () => {
//         return  Math.floor(Math.random() * 2) + 1
//     };

//     const symbol = () => {
//         const number = Math.floor(Math.random() * 2) + 1;
//         console.log(`number is ${number}`)
//         if (number === 1) {
//             console.log(`number is ${number}`);
//             return "X";
//         } 
//         if (number === 2) {
//             console.log(`number is ${number}`);
//             return "0"
//         };
//         return undefined;
//     }
//     //should put empty cell check in below method?
//     //while loop doesnt seem to work as intended
//     const cell = () => {
//             let cellChoice = Math.floor(Math.random() * 9);
            

//             while(gameBoard.getCellValue(cellChoice) !== "") {
//                 console.log(gameBoard.getCellValue(cellChoice));
//                 console.log(`cell choice in while loop is ${cellChoice}`);
//                 cellChoice = Math.floor(Math.random() * 9);
//                 console.log(`cell choice in while loop is now ${cellChoice}`);
//             }
//             return cellChoice;
//             // do {cellChoice = Math.floor(Math.random() * 9)}
//             // while (gameBoard.grid[cellChoice] !== "");
//             // console.log(`gameboard cell value is ${gameBoard.grid[cellChoice]}`);
//             // console.log(`cell choice is ${cellChoice}`);
//             // return cellChoice;
//         };

//     return {player, symbol, cell};
// })();

//----for playerTurn/game logic-------------------//

//so this needs to be number from 0-8
        //This is return func to input square directly when get from ui;
        // return function (selectedCell) {
        
        //     //alternate turns
        //     if (playersTurn) {
        //     playersTurn === 1 ? playersTurn = 2 : playersTurn = 1;
        //     console.log(`players turn is ${playersTurn}`);
        //     } else (console.log(`players turn value = ${playersTurn}`))
            
        //     //add players symbol to selected cell
        //     gameBoard.grid[selectedCell] = playerSymbol;
            
        //     turn++;
        //     return;
        // };

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


//-----------------displayDomobject--------------------

//   const displayModal = (type, player) => {
//         const dialogBackground = createDomElement("div","","dialog-background","","");
//         const dialog = createDomElement("dialog", "", "", "","");
//         const form = createDomElement("form", "", "", "",{action: "", method: "dialog"});
//         const confirmButton = createDomElement("button","Confirm","","",{type: "button"});
//         form.append(confirmButton);
//         dialog.appendChild(form);
//         dialogBackground.appendChild(dialog);
//         body.appendChild(dialogBackground);
//       }

//       displayModal();
    
//     const nameModalContent = (player) => {
//         const form = document.querySelector("form");
//         const confirmButton = document.querySelector("form > [type=button]");
//         while (form.firstChild !== confirmButton) {
//                     form.removeChild(form.firstChild);
//                 }
//         const label = createDomElement("label", `please choose your name`, "","",{for: "username-choice"});
//         const input = createDomElement("input","","username-choice","",{type: "text"});
//         confirmButton.before(label,input);
//         // form.insertBefore(fieldset, confirmButton);
//       }

//     const symbolModalContent = (player) => {
//         const form = document.querySelector("form");
//         const confirmButton = document.querySelector("form > [type=button]");

//         while (form.firstChild !== confirmButton) {
//                     form.removeChild(form.firstChild);
//                 }
        
//         const fieldset = createDomElement("fieldset","","","","");
//         const legend = createDomElement("legend",`please select a symbol`,"","","");

//         const radioContainerDiv = createDomElement("div","","radio-container","","");
//         const radioInputX = createDomElement("input","","x","",{type: "radio", name: "symbol-choice",value: "X", required: "", checked: ""});
//         const radioLabelX = createDomElement("label", "X","","radio-label",{for: "x"});
//         const radioInputO = createDomElement("input","","o","",{type: "radio", name: "symbol-choice",value: "O", required: ""});
//         const radioLabelO = createDomElement("label", "O","","radio-label",{for: "o"});

//         radioContainerDiv.append(radioInputX,radioLabelX,radioInputO,radioLabelO);
//         fieldset.append(legend, radioContainerDiv);
//         form.insertBefore(fieldset, confirmButton);
//       }

// switch (modalType) {
//             case "name":

//                 const label = createDomElement("label", `${getName()} please choose your name`, "","",{for: "username-choice"});
//                 const input = createDomElement("input","","username-choice","",{type: "text", name:"username-choice",minlength: 1, maxlength: 35, required: ""});
//                 confirmButton.before(label,input);
//                 break;

//             case "symbol":
                
//                 const fieldset = createDomElement("fieldset","","","","");
//                 const legend = createDomElement("legend",`${getName()} please select a symbol`,"","","");

//                 const radioContainerDiv = createDomElement("div","","radio-container","","");
//                 const radioInputX = createDomElement("input","","x","",{type: "radio", name: "symbol-choice",value: "X", required: "", checked: ""});
//                 const radioLabelX = createDomElement("label", "X","","radio-label",{for: "x"});
//                 const radioInputO = createDomElement("input","","o","",{type: "radio", name: "symbol-choice",value: "O", required: ""});
//                 const radioLabelO = createDomElement("label", "O","","radio-label",{for: "o"});

//                 radioContainerDiv.append(radioInputX,radioLabelX,radioInputO,radioLabelO);
//                 fieldset.append(legend, radioContainerDiv);
//                 form.insertBefore(fieldset, confirmButton);
//                 break;

//             default: ("sorry incorrect modal type was given");
// }

//---------------play game func ---------------------------------


//show modal
    //give modal player1 content(call display object method)
    //attach submit event to form
    //on submit get name input value
    //how to give value to player 1?
    //player method to access stored input value
    //private variable in game?
    //link players name choice methods with variable?
    // on submit/confirm btn click event reset modal to player 2
    //do need to take dom/display object as input to game func? or if its iife its available globally?



    //--------------------Event logic func fact-------------------------------------------


    // Extract a specific input by its 'name' attribute
            // const className = form.getAttribute("class");

            // switch (className) {
            //     case "name":
            //         const usernameChoice = formData.get('username-choice'); 
            //         player.selectUsername(usernameChoice);
            //         console.log(player.getUsername());
            //         // console.log("accessed form name class through dom");
            //         break;
            //     case "symbol":
            //         const symbolChoice = formData.get('symbol-choice');
            //         console.log(symbolChoice);
            //         player.selectSymbol(symbolChoice);
            //         console.log(player.getSymbol());
            //         break;
            //     default:
            //         console.log("sorry modal has no name or symbol class name");
            // }

    

    // cell.addEventListener("click", (event) => {

            //     //destructure players turn method
            //     const {getPlayersTurn, playerTurn} = gameLogic;
            //     console.log(`players turn in cell event is ${gameLogic.getPlayersTurn()}`);

            //     //store cell event value
            //     let dataCellValue = event.target.dataset.cellValue;
            //     console.log(`dataCellValue is ${dataCellValue}`);
            //     //temporary fix whilst figure out
            //     // dataCellValue = --dataCellValue;

            //     //add cell event value to whichever player's turn it is
            //     if(gameLogic.getPlayersTurn() === 1) {
            //         player1.selectSquare(dataCellValue);
            //         console.log(player1.getSelectedSquare());
            //         gameLogic.playerTurn(player1);
            //     } else if(gameLogic.getPlayersTurn() === 2) {
            //         player2.selectSquare(dataCellValue);
            //         console.log(player2.getSelectedSquare());
            //         gameLogic.playerTurn(player2);
            //     } else console.log(`players turn if statement doesnt work`);
                
            // }, {once: true});


