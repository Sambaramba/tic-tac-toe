const useGameBoard = (function () {
    let grid = new Array(9).fill("");
    return {grid};
})();

console.log(useGameBoard);


function createPlayer(name) {
    // const name = name;
    let playerScore = 0;
    const getPlayerScore = () => playerScore;
    const increasePlayerScore = () => { playerScore++; };
    return { name, getPlayerScore, increasePlayerScore};
}

const player1 = createPlayer("Player1");
const player2 = createPlayer("player2");
console.log(player1);
console.log(player2.name);
player1.increasePlayerScore();
console.log(player1.getPlayerScore());

function controlGameFlow() {
    const randomPlayerChoice = () => {return  Math.floor(Math.random() * 2) + 1};
    return {randomPlayerChoice};
}
function playGame() {

}

console.log(controlGameFlow().randomPlayerChoice());
