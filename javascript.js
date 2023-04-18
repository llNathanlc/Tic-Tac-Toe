const playerArray = [];

const gameBoard = (() => {
  const tiles = document.querySelectorAll(".row");
  const backdropCard = () => {
    backdrop2.addEventListener("pointerdown", function () {
      gameFlow.resetBoard();
      backdrop2.setAttribute("style", "display:none");
    });
  };
  return { tiles, backdropCard };
})();

const playerFactory = (player) => {
  const getName = () => player;
  let score = 0;
  const getScore = () => score;
  const addScore = () => score++;
  const resetScore = () => (score = 0);
  return { getName, getScore, addScore, score, resetScore };
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
          let result = getWinner();
          if (result !== "") {
            backdrop2.setAttribute("style", "display:flex;");
            const winner = getWinner();
            if (winner === "X") {
              winnerCard.textContent = "Player1 won";
              p1.addScore();
              score.textContent = p1.getScore() + "  -  " + ia.getScore();
            } else {
              winnerCard.textContent = "I'ts a draw";
            }
            return;
          }
          if (currentPlayer == 'player1') {
            e.textContent = 'X';
            currentPlayer = 'player2'
          } else if (currentPlayer == 'player2') {
            e.textContent = "O";
            currentPlayer = 'player1'
          }
        });
      });
    });
  };
  const PvE = (p1, ia) => {
    const getDifficulty = () => {
      let difficulty = ia.getName();
      if (difficulty == "easy") return 1;
      if (difficulty == "medium") return 2;
      if (difficulty == "hard") return 4;
      if (difficulty == "impossible") return 5;
    };
    gameBoard.tiles.forEach(function (h) {
      Array.from(h.children).forEach(function (e) {
        e.addEventListener("pointerdown", function () {
          let result = getWinner();
          if (result !== "") {
            backdrop2.setAttribute("style", "display:flex;");
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
            backdrop2.setAttribute("style", "display:flex;");
            const winner = getWinner();
            if (winner === "X") {
              winnerCard.textContent = "Player1 won";
              p1.addScore();
              score.textContent = p1.getScore() + "  -  " + ia.getScore();
            } else {
              winnerCard.textContent = "I'ts a draw";
            }
            return;
          }
          if (currentPlayer == ai) {
            setTimeout(() => getBestMove(gameBoard.tiles, getDifficulty()), 200);
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
      gameControl.playerArray[0].resetScore();
      gameControl.playerArray[1].resetScore();
      score.textContent =
        playerArray[0].getScore() + " - " + playerArray[1].getScore();
      currentPlayer = human;
    });
  };
  const resetBoard = () => {
    Array.from(document.querySelectorAll(".cell")).forEach((e) => {
      e.textContent = "";
    });
    win.textContent = "";
    gameControl.playerArray[0].playing = "playing";
    gameControl.playerArray[1].playing = "";
    currentPlayer = human;
  };
  return { PvP, PvE, resetButton, resetBoard };
})();

function checkDraw() {
  const isBoardFull = Array.from(document.querySelectorAll(".cell")).every(
    (e) => e.textContent != ""
  );
  return isBoardFull;
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
  let gamemodeState = "pvp";
  const gameMode = () => {
    const input = document.querySelector("form :nth-child(3) > #inputp2");
    const parent = document.querySelector("form :nth-child(3)");
    const select = document.createElement("select");
    const difficulty = ["easy", "medium", "hard", "impossible"];
    for (const option of difficulty) {
      const op = document.createElement("option");
      op.setAttribute("value", `${option}`);
      op.textContent = option;
      select.appendChild(op);
    }
    select.setAttribute("name", "player2");
    gamemode.addEventListener("pointerdown", function () {
      if (this.textContent == "Player vs AI") {
        gamemodeState = "pvp";
        currentPlayer = 'player1'
        this.textContent = "Player vs Player";
        labelp2.textContent = "Add a name for player2";
        parent.removeChild(select);
        parent.appendChild(input);
      } else {
        gamemodeState = "pve";
        currentPlayer = human;
        this.textContent = "Player vs AI";
        labelp2.textContent = "Choose AI dificultty";
        parent.removeChild(input);
        parent.appendChild(select);
      }
    });
  };

  const startGame = () => {
    gameMode();
    backdrop1.addEventListener("submit", function (e) {
      e.preventDefault();

      if (backdrop1.style.display === "none") {
        backdrop1.style.display = "flex";
      } else {
        backdrop1.style.display = "none";
        content.style.display = "flex";
      }
      if (gamemodeState == "pvp") {
        const namesJson = new FormData(e.target);
        namesJson.forEach((value, key) => {
          key = playerFactory(value);
          playerArray.push(key);
        });
        gameFlow.PvP(playerArray[0], playerArray[1]);
        player1.textContent = playerArray[0].getName();
        player2.textContent = playerArray[1].getName();
        score.textContent =
          playerArray[0].getScore() + "  -  " + playerArray[1].getScore();
      } else {
        const namesJson = new FormData(e.target);
        namesJson.forEach((value, key) => {
          key = playerFactory(value);
          playerArray.push(key);
        });
        gameFlow.PvE(playerArray[0], playerArray[1]);
        player1.textContent = playerArray[0].getName();
        player2.textContent = "AI";
        score.textContent =
          playerArray[0].getScore() + "  -  " + playerArray[1].getScore();
      }
    });
  };

  return { playerArray, startGame, gameMode };
})();

gameControl.startGame();
gameFlow.resetButton();
gameBoard.backdropCard();
function getBestMove(boardRows, depth) {
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
        let score = minimax(boardRows, depth, false);
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
  let result = getWinner();
  if (result !== "") {
    backdrop2.setAttribute("style", "display:flex;");
    winnerCard.textContent = "Ai won";
    playerArray[1].addScore();
    score.textContent =
      playerArray[0].getScore() + " - " + playerArray[1].getScore();
    return;
  }
}
function minimax(boardRows, depth, isMaximizingPlayer) {
  const result = getWinner();
  if (result !== "" || depth === 0) {
    if (result === "O") return 10;
    if (result === "X") return -10;
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
