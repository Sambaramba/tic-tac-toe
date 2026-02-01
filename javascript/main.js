const gameBoard =(function () {
    let tiles = new Array(9).fill("");
    return {tiles};
})();

console.log(gameBoard);


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

function playRound() {

}