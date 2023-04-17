const gameBoard = (() => {
  const tiles = document.querySelectorAll(".row");
  return { tiles };
})();

const playerFactory = (player) => {
  const getName = () => player;
  const playing = "playing";
  return { getName, playing };
};

const human = "X";
const ai = "O";
let currentPlayer = human;

const gameFlow = (() => {
  const PvP = (p1, p2) => {
    p2.playing = "";
    gameBoard.tiles.forEach(function (h) {
      Array.from(h.children).forEach(function (e) {
        e.addEventListener("pointerdown", function () {
          if (won) {
            return;
          }
          if (e.textContent != "") {
            return;
          }
          if (p1.playing == "playing") {
            e.textContent = "X";
            e.setAttribute("symbol", "X");
            p1.playing = "";
            p2.playing = "playing";
          } else if (p2.playing == "playing") {
            e.textContent = "O";
            e.setAttribute("symbol", "O");
            p2.playing = "";
            p1.playing = "playing";
          }
        });
      });
    });
  };
  const PvE = (p1,ia) => {
    gameBoard.tiles.forEach(function (h) {
      Array.from(h.children).forEach(function (e) {
        e.addEventListener("pointerdown", function () {
          let result = getWinner();
          if (result !== "") {
            return;
          }
          if (e.textContent != "") {
            return;
          }
          if (currentPlayer == human) {
            e.textContent = "X";
            currentPlayer = ai;
          }
        });
        e.addEventListener("pointerup", function () {
          let result = getWinner();
          if (result !== "") {
            return;
          }
          if (currentPlayer == ai) {
            setTimeout(() => getBestMove(gameBoard.tiles), 200);
          }
        });
      });
    });
  };
  const resetButton = () => {
    reset.addEventListener("pointerdown", function () {
      Array.from(document.querySelectorAll(".cell")).forEach((e) => {
        e.textContent = "";
      });
      win.textContent = "";
      gameControl.playerArray[0].playing = "playing";
      gameControl.playerArray[1].playing = "";
      currentPlayer = human;
    });
  };
  return { PvP, PvE, resetButton };
})();

function checkGameOver() {
  const win = getWinner();
  const isBoardFull = Array.from(document.querySelectorAll(".cell")).every(
    (e) => e.textContent != ""
  );
  return win !== null || isBoardFull;
}
function getWinner() {
  const board = Array.from(gameBoard.tiles).map((row) =>
    Array.from(row.children).map((cell) => cell.textContent)
  );
  let winner = "";

  for (const row of board) {
    if (row[0] !== "" && row[0] === row[1] && row[1] === row[2]) {
      winner = row[0];
    }
  }

  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] !== "" &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]
    ) {
      winner = board[0][col];
    }
  }

  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    winner = board[0][0];
  }

  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    winner = board[0][2];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard.tiles[i].children[j].textContent === "") {
        openSpots++;
      }
    }
  }
  if (winner === "" && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
}

const gameControl = (() => {
  const playerArray = [];
  const startGame = () => {
    backdrop1.addEventListener("submit", function (e) {
      e.preventDefault();

      if (backdrop1.style.display === "none") {
        backdrop1.style.display = "flex";
      } else {
        backdrop1.style.display = "none";
        content.style.display = "flex";
      }

      const namesJson = new FormData(e.target);
      namesJson.forEach((value, key) => {
        key = playerFactory(value);
        playerArray.push(key);
      });
      gameFlow.PvE(playerArray[0], playerArray[1]);
      player1.textContent = playerArray[0].getName();
      player2.textContent = playerArray[1].getName();
    });
  };

  return { playerArray, startGame };
})();

gameControl.startGame();
gameFlow.resetButton();

function getBestMove(boardRows) {
  let bestMove = -Infinity;
  let move = null;
  for (const row of boardRows) {
    for (const cell of row.children) {
      if (cell.textContent === "") {
        let result = getWinner();
        if (result !== "") {
          return;
        }
        if (cell.textContent != "") {
          return;
        }
        cell.textContent = "O";
        let score = minimax(boardRows, 5, false);
        cell.textContent = "";
        if (score > bestMove) {
          bestMove = score;
          move = cell;
        }
      }
    }
  }
  move.textContent = "O";
  currentPlayer = human;
}
function minimax(boardRows, depth, isMaximizingPlayer) {
  const result = getWinner();
  if (result !== "" || depth === 0) {
    if (result === "O") return 1;
    if (result === "X") return -1;
    return 0;
  }

  let bestValue = isMaximizingPlayer ? -Infinity : Infinity;

  for (const row of boardRows) {
    for (const cell of row.children) {
      if (cell.textContent === "") {
        let result = getWinner();
        if (result !== "") {
          return;
        }
        if (cell.textContent != "") {
          return;
        }
        cell.textContent = isMaximizingPlayer ? "O" : "X";
        const value = minimax(boardRows, depth - 1, !isMaximizingPlayer);
        cell.textContent = "";
        bestValue = isMaximizingPlayer
          ? Math.max(bestValue, value)
          : Math.min(bestValue, value);
      }
    }
  }
  return bestValue;
}
