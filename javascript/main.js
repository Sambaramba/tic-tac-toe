import { createDomElement } from "./utils.js";


function createPlayer(name) {

    const getName = () => name;
    const getSpacedName = () => `player ${playerNumber}`;
    
    let username;
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
     
    return { getName,getSpacedName, selectUsername, getUsername, getNumber, selectSymbol, getSymbol, selectSquare, getSelectedSquare};
}



const gameBoard = (function () {
    
    let grid = new Array(9).fill("");
    const getGrid = () => grid;

    const getCellValue = (cellNum) => {return grid[cellNum]};

    const changeCellValue = (cellNum, value) => {return grid[cellNum] = value};
    
    const resetGrid = () => {
        grid.forEach((cell, index) => {
            grid[index] = "";
        })
    }
    return {getGrid, getCellValue, changeCellValue, resetGrid};
})();



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

        startButton.focus();
    }

    //call straight away so page has ui
    displayUi();
    
    
    const displayGameboard = () => {
        const gameboardDiv = document.querySelector("#gameboard");

        //clear grid first to prevent duplicates
        while(gameboardDiv.firstChild) {
            gameboardDiv.removeChild(gameboardDiv.firstChild);  
        }

        //loop through gameboard grid array and add cell for each element
        gameBoard.getGrid().forEach((value, index) => {

            // const cellDiv =  createDomElement("div", value, `cell${index}`, "cell", {"data-cell-value": `${index}`, tabindex: 0});
            // gameboardDiv.appendChild(cellDiv);
            const cellButton = createDomElement("button", value, `cell${index}`, "cell", {"data-cell-value": `${index}`, tabindex: 0});
            gameboardDiv.appendChild(cellButton);

        })
      }

    //add board to ui straight away
    displayGameboard();


    const updateCellValue = (selectedCell, symbol) => {
        let gameboardCell = document.querySelector(`#cell${selectedCell}`);
        gameboardCell.textContent = symbol;
    }


    const resetDisplayElement = () => {
        const displayElement = document.querySelector("#display");
        displayElement.textContent = "Please click start game button to begin";
    }
    

    const displayModal = (player) => {

        //destructure player name property to add value to modal
        const {getSpacedName, getName} = player;
        
        const dialogBackground = createDomElement("div","","","dialog-background","");
        const dialog = createDomElement("dialog", "", "", "","");
        const form = createDomElement("form", "", "", "",{action: "", method: "dialog"});
        const label = createDomElement("label", `${getSpacedName()} please choose your name`, "","",{for: "username-choice"});
        const input = createDomElement("input","","username-choice","",{type: "text", name:"username-choice",minlength: 1, maxlength: 35, required: ""});     
        const confirmButton = createDomElement("button","Confirm",`${getName()}Confirm`,"",{type: "submit"});
        
        form.append(label,input,confirmButton);
        dialog.appendChild(form);
        dialogBackground.appendChild(dialog);
        document.body.appendChild(dialogBackground);

        input.focus();

        //add form event to modals on creation
        eventListenerLogic.formSubmit(player);
    }

    return {displayUi, displayGameboard, displayModal,updateCellValue, resetDisplayElement};
})()




const gameLogic = (function() {

    //flag for alternating turns
    let playersTurn = 1;
    //method to find players turn
    const getPlayersTurn = () => playersTurn;

    //turn counter;
    let turn = 1;

    //to update display
    const display = document.querySelector("#display");

    
    const player1 = createPlayer("player1");
    const player2 = createPlayer("player2");
    player1.selectSymbol("X");
    player2.selectSymbol("O");
    
    
    function chooseNames(player) {
        displayUiGameLogic.displayModal(player1);
    }


    function checkWinCondition() {
            
        //regEx to match all 8 win conditions;
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
            }
            if(value === "O") {
                stringOfOIndexes+=index;
            }
        })

        let sortedX = stringOfXIndexes.split('').sort().join('');
        let sortedO = stringOfOIndexes.split('').sort().join('');

        if (winConditions.test(sortedX)) {
            return "X";
        }

        if (winConditions.test(sortedO)) {
            return "O";
        }
        
        const hasValue = (currentValue) => currentValue !== "";
        if (gameBoard.getGrid().every(hasValue)) { 
            return "draw";
        }
        return false;
    }    

        
    function displayWinCondition() {
        const winConditionResult = checkWinCondition();

        switch(winConditionResult) {
            case player1.getSymbol():
                display.textContent = `GAME OVER! ${player1.getUsername()} is the winner!`;
                break;
            case player2.getSymbol():
                display.textContent = `GAME OVER! ${player2.getUsername()} is the winner!`;
                break;
            case "draw":
                display.textContent = "GAME OVER! its a draw!";
                break;
        }
        
    }

    
    function playerTurn(player) {
        const firstCell = document.querySelector("#cell0");
        console.log(firstCell);
        firstCell.focus();
        const playerSymbol = player.getSymbol();
        let selectedCell = player.getSelectedSquare();
        gameBoard.changeCellValue(selectedCell, playerSymbol);

        //update gameboard UI cell value
        displayUiGameLogic.updateCellValue(selectedCell, playerSymbol);

        //alternate turns code
        playersTurn === 1 ? playersTurn = 2 : playersTurn = 1;
        
        //display whos turn it is
        display.textContent = `player ${playersTurn} please select a square`;

        //check/execute game completion
        if(turn >= 5) {

            if(checkWinCondition()) {

                //display result
                displayWinCondition();

                //reset event listeners
                eventListenerLogic.removeGridCells();
                eventListenerLogic.removeRestartButton();
                eventListenerLogic.startButton();
                return;
            };
        }

        turn++;

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

        //reset player turn and display who goes first
        playersTurn = 1;
        display.textContent = `player ${playersTurn} please select a square`;

        //reset turn counter;
        turn = 1;

        eventListenerLogic.addGridCells();
        return;
    }
    
    return {chooseNames,resetGame, playRound, getPlayersTurn, playerTurn, player1, player2}
})();




const eventListenerLogic = (function() {

    const startButton = () => {
        const startButton = document.querySelector("#start-button");
        startButton.focus();
        startButton.addEventListener("click", (event) => {

            //reset game and display from previous games
            gameLogic.resetGame();
            displayUiGameLogic.displayGameboard();
            displayUiGameLogic.resetDisplayElement();

            eventListenerLogic.addRestartButton();

            //start round
            gameLogic.chooseNames();
            gameLogic.playRound();
        }, { once: true });
    }
    

    const formSubmit = (player) => {
        const {selectSymbol,getSpacedName, selectUsername, getNumber} = player;
        const form = document.querySelector("form");
    
        form.addEventListener("submit", (event) => {

            event.preventDefault();

            //get data
            const formData = new FormData(event.target);
            const usernameChoice = formData.get('username-choice'); 
            player.selectUsername(usernameChoice);
            
            //delete modal after got data
            const dialogBackground = document.querySelector(".dialog-background");
            dialogBackground.remove();
            
            //add player 2 username modal after player 1 username selection
            if (player.getNumber() === 1) {
                displayUiGameLogic.displayModal(gameLogic.player2);
            }
            if (player.getNumber() === 2) {
                const firstCell = document.querySelector("#cell0");
                console.log(firstCell);
                firstCell.focus();
            }

        }, { once: true });
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
            gameLogic.resetGame();
            displayUiGameLogic.displayGameboard();
            displayUiGameLogic.resetDisplayElement();
            eventListenerLogic.startButton();    
    }


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

    return{startButton, formSubmit, addGridCells, removeGridCells,addRestartButton, removeRestartButton};
})();


//add start event on page load
eventListenerLogic.startButton();
