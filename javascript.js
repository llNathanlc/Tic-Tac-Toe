const gameBoard = (() => {
  const tiles = Array.from(document.querySelectorAll(".cell"));
  return { tiles };
})();

const playerFactory = (player, turn) => {
  const getName = () => player;
  const getTurn = () => turn;
  const playing = "playing";
  return { getName, getTurn, playing };
};
const player1 = playerFactory("player1", "first");
const player2 = playerFactory("player2", "second");

const gameFlow = (() => {
  let won = false;
  const write = (p1, p2) => {
    p2.playing = "";
    gameBoard.tiles.forEach(function (e) {
      e.addEventListener("pointerdown", function () {
        if (won) {
          return;
        }
        if (e.textContent != "") {
          return;
        }
        if (p1.getTurn() == "first" && p1.playing == "playing") {
          e.textContent = "X";
          e.setAttribute("symbol", "X");
          p1.playing = "";
          p2.playing = "playing";
        } else if (p2.getTurn() == "second" && p2.playing == "playing") {
          e.textContent = "O";
          e.setAttribute("symbol", "O");
          p2.playing = "";
          p1.playing = "playing";
        }
        console.log(gameBoard.tiles);
      });
    });
  };
  const winner = (tiles) => {
    tiles.forEach(function (e) {
      e.addEventListener("pointerdown", function () {
        if (
          (gameBoard.tiles[0].getAttribute("symbol") ==
            gameBoard.tiles[1].getAttribute("symbol") &&
            gameBoard.tiles[0].getAttribute("symbol") ==
              gameBoard.tiles[2].getAttribute("symbol")) ||
          (gameBoard.tiles[3].getAttribute("symbol") ==
            gameBoard.tiles[4].getAttribute("symbol") &&
            gameBoard.tiles[3].getAttribute("symbol") ==
              gameBoard.tiles[5].getAttribute("symbol")) ||
          (gameBoard.tiles[6].getAttribute("symbol") ==
            gameBoard.tiles[7].getAttribute("symbol") &&
            gameBoard.tiles[6].getAttribute("symbol") ==
              gameBoard.tiles[8].getAttribute("symbol")) ||
          (gameBoard.tiles[0].getAttribute("symbol") ==
            gameBoard.tiles[4].getAttribute("symbol") &&
            gameBoard.tiles[0].getAttribute("symbol") ==
              gameBoard.tiles[8].getAttribute("symbol")) ||
          (gameBoard.tiles[2].getAttribute("symbol") ==
            gameBoard.tiles[4].getAttribute("symbol") &&
            gameBoard.tiles[2].getAttribute("symbol") ==
              gameBoard.tiles[6].getAttribute("symbol")) ||
          (gameBoard.tiles[0].getAttribute("symbol") ==
            gameBoard.tiles[3].getAttribute("symbol") &&
            gameBoard.tiles[0].getAttribute("symbol") ==
              gameBoard.tiles[6].getAttribute("symbol")) ||
          (gameBoard.tiles[1].getAttribute("symbol") ==
            gameBoard.tiles[4].getAttribute("symbol") &&
            gameBoard.tiles[1].getAttribute("symbol") ==
              gameBoard.tiles[7].getAttribute("symbol")) ||
          (gameBoard.tiles[2].getAttribute("symbol") ==
            gameBoard.tiles[5].getAttribute("symbol") &&
            gameBoard.tiles[2].getAttribute("symbol") ==
              gameBoard.tiles[8].getAttribute("symbol"))
        ) {
          win.textContent ='winner';
          won = true;
        }
      });
    });
  };
  return { write, winner };
})();

gameFlow.write(player1, player2);
gameFlow.winner(gameBoard.tiles);
