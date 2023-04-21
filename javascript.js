const playerArray = [];
let array = [];

const gameBoard = (() => {
  const backdropCard = () => {
    backdrop2.addEventListener("pointerdown", function () {
      turn++;
      gameFlow.resetBoard();
      backdrop2.setAttribute("style", "display:none");
      const rows = document.querySelectorAll(".row");
      if (gameControl.getGameMode() === "pve" && turn % 2 !== 0) {
        currentPlayer = human;
        setTimeout(() => getBestMove(rows, playerArray[1].getName()), 2);
      }
      if (gameControl.getGameMode() === "pvp" && turn % 2 !== 0) {
        currentPlayer = "player2";
      }
    });
  };
  const goBack = () => {
    const goback = document.getElementById("goback");
    goback.addEventListener("pointerdown", function () {
      gameFlow.resetAll();
      backdrop1.style.display = "flex";
      content.style.display = "none";
    });
  };
  return { backdropCard, goBack };
})();

const playerFactory = (player) => {
  const getName = () => {
    if (player == "easy") return 2;
    if (player == "medium") return 4;
    if (player == "impossible") return 5;
    else {
      return player;
    }
  };
  let score = 0;
  const getScore = () => score;
  const addScore = () => score++;
  const resetScore = () => (score = 0);
  return { getName, getScore, addScore, score, resetScore };
};
const human = "X";
const ai = "O";
let currentPlayer = "player1";
let turn = 0;
let difficulty = 0;
const gameFlow = (() => {
  const row = document.querySelectorAll(".row");
  const PvP = (p1, p2, board) => {
    p2.playing = "";
    board.forEach(function (h) {
      Array.from(h.children).forEach(function (e) {
        e.addEventListener("pointerdown", function () {
          this.classList.add("animation");
          let result = getWinner();
          if (result !== "") {
            backdrop2.setAttribute("style", "display:flex;");
            const winner = getWinner();
            if (winner === "X") {
              winnerCard.textContent = "Player1 won";
              p1.addScore();
              score.textContent = p1.getScore() + "  -  " + p2.getScore();
            } else {
              winnerCard.textContent = "I'ts a draw";
            }
            return;
          }
          if (e.textContent != "") {
            return;
          }
          if (currentPlayer == "player1") {
            player2.setAttribute(
              "style",
              "animation:highlight-turn 1s;animation-fill-mode: forwards;"
            );
            player1.setAttribute(
              "style",
              "background-color:rgb(231, 231, 238)"
            );
            e.textContent = "X";
            currentPlayer = "player2";
          } else if (currentPlayer == "player2") {
            player2.setAttribute(
              "style",
              "background-color:rgb(231, 231, 238)"
            );
            player1.setAttribute(
              "style",
              "animation:highlight-turn 1s;animation-fill-mode: forwards"
            );
            e.textContent = "O";
            currentPlayer = "player1";
          }
        });
        e.addEventListener("pointerup", function () {
          let result = getWinner();
          getWinningPositions();
          if (result !== "") {
            backdrop2.setAttribute("style", "display:flex;");
            const winner = getWinner();
            if (winner === "X") {
              winnerCard.textContent = p1.getName() + " won!";
              p1.addScore();
              score.textContent = p1.getScore() + "  -  " + p2.getScore();
            } else if (winner === "O") {
              winnerCard.textContent = p2.getName() + " won!";
              p2.addScore();
              score.textContent = p1.getScore() + "  -  " + p2.getScore();
            } else {
              winnerCard.textContent = "I'ts a draw";
            }
            return;
          }
        });
      });
    });
  };
  const PvE = (p1, ia, board) => {
    board.forEach(function (h) {
      Array.from(h.children).forEach(function (e) {
        e.addEventListener("pointerdown", function () {
          this.classList.add("animation");
          let result = getWinner();
          if (result !== "") {
            backdrop2.setAttribute("style", "display:flex;");
            return;
          }
          if (e.textContent != "") {
            return;
          }
          if (currentPlayer === human) {
            e.textContent = "X";
            player1.setAttribute(
              "style",
              "background-color:rgb(231, 231, 238)"
            );
            player2.setAttribute(
              "style",
              "animation:highlight-turn 0.5s;animation-fill-mode: forwards"
            );
            currentPlayer = ai;
          }
        });
        e.addEventListener("pointerup", function () {
          let result = getWinner();
          getWinningPositions();
          if (result !== "") {
            backdrop2.setAttribute("style", "display:flex;");
            const winner = getWinner();
            if (winner === "X") {
              winnerCard.textContent = "Player1 won!";
              p1.addScore();
              score.textContent = p1.getScore() + "  -  " + ia.getScore();
            } else {
              winnerCard.textContent = "I'ts a draw";
            }
            return;
          }
          if (currentPlayer === ai) {
            setTimeout(() => getBestMove(board, ia.getName()), 200);
          }
        });
      });
    });
  };
  const resetButton = () => {
    reset.addEventListener("pointerdown", function () {
      Array.from(document.querySelectorAll(".cell")).forEach((e) => {
        e.textContent = "";
        e.classList.remove("animation");
      });
      win.textContent = "";
      turn = 0;
      gameControl.playerArray[0].resetScore();
      gameControl.playerArray[1].resetScore();
      score.textContent =
        playerArray[0].getScore() + " - " + playerArray[1].getScore();
      if (gameControl.getGameMode() === "pve") {
        currentPlayer = human;
        player2.setAttribute("style", "background-color:rgb(231, 231, 238)");
        player1.setAttribute(
          "style",
          "animation:highlight-turn 0.5s;animation-fill-mode: forwards"
        );
      } else {
        currentPlayer = "player1";
        player2.setAttribute("style", "background-color:rgb(231, 231, 238)");
        player1.setAttribute(
          "style",
          "animation:highlight-turn 0.5s;animation-fill-mode: forwards"
        );
      }
    });
  };
  const resetBoard = () => {
    Array.from(document.querySelectorAll(".cell")).forEach((e) => {
      e.textContent = "";
      e.classList.remove("animation");
      e.setAttribute('style','background-color:rgba(236, 236, 236, 0.427);')
    });
    win.textContent = "";
    score.textContent =
      playerArray[0].getScore() + " - " + playerArray[1].getScore();
    if (gameControl.getGameMode() === "pve") {
      currentPlayer = human;
    } else {
      currentPlayer = "player1";
    }
  };
  const resetAll = () => {
    Array.from(document.querySelectorAll(".cell")).forEach((e) => {
      e.textContent = "";
      e.classList.remove("animation");
    });
    win.textContent = "";
    turn = 0;
    gameboard.replaceWith(gameboard.cloneNode(true));
    gameControl.playerArray[0].resetScore();
    gameControl.playerArray[1].resetScore();
    score.textContent =
      playerArray[0].getScore() + " - " + playerArray[1].getScore();
    if (gameControl.getGameMode() === "pve") {
      currentPlayer = human;
      player2.setAttribute("style", "background-color:rgb(231, 231, 238)");
      player1.setAttribute(
        "style",
        "animation:highlight-turn 0.5s;animation-fill-mode: forwards"
      );
    } else {
      currentPlayer = "player1";
      player2.setAttribute("style", "background-color:rgb(231, 231, 238)");
      player1.setAttribute(
        "style",
        "animation:highlight-turn 0.5s;animation-fill-mode: forwards"
      );
    }
    while (playerArray.length !== 0) {
      playerArray.pop();
    }
  };
  return { PvP, PvE, resetButton, resetBoard, resetAll };
})();

function checkDraw() {
  const isBoardFull = Array.from(document.querySelectorAll(".cell")).every(
    (e) => e.textContent != ""
  );
  return isBoardFull;
}
function getWinningPositions() {
  let tiles = document.querySelectorAll(".row");
  const board = Array.from(tiles).map((row) =>
    Array.from(row.children).map((cell) => cell.textContent)
  );
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] !== "" &&
      board[row][0] === board[row][1] &&
      board[row][0] === board[row][2]
    ) {
      tiles[row].children[0].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
      tiles[row].children[1].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
      tiles[row].children[2].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
    }
  }
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] !== "" &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]
    ) {
      tiles[0].children[col].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
      tiles[1].children[col].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
      tiles[2].children[col].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
    }
  }
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    tiles[0].children[0].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
    tiles[1].children[1].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
    tiles[2].children[2].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
  }

  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    tiles[0].children[2].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
    tiles[1].children[1].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
    tiles[2].children[0].setAttribute("style", "background-color:rgba(2, 190, 2, 0.541);");
  }
}
function getWinner() {
  let tiles = document.querySelectorAll(".row");
  const board = Array.from(tiles).map((row) =>
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
      if (tiles[i].children[j].textContent === "") {
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
  const getGameMode = () => gamemodeState;
  const gameMode = () => {
    const input = document.querySelector("#inputp2");
    const parent = document.querySelector("#parentp2");
    const select = document.createElement("select");
    const difficulty = ["easy", "medium", "impossible"];
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
        currentPlayer = "player1";
        this.textContent = "Player vs Player";
        labelp2.textContent = "Add a name for Player 2";
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
      const rows = document.querySelectorAll(".row");
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
        gameFlow.PvP(playerArray[0], playerArray[1], rows);
        player1.textContent = playerArray[0].getName();
        player1.setAttribute(
          "style",
          "animation:highlight-turn 0.5s;animation-fill-mode: forwards"
        );
        player2.textContent = playerArray[1].getName();
        score.textContent =
          playerArray[0].getScore() + "  -  " + playerArray[1].getScore();
      } else {
        const namesJson = new FormData(e.target);
        namesJson.forEach((value, key) => {
          key = playerFactory(value);
          playerArray.push(key);
        });
        gameFlow.PvE(playerArray[0], playerArray[1], rows);
        player1.textContent = playerArray[0].getName();
        player1.setAttribute(
          "style",
          "animation:highlight-turn 0.5s;animation-fill-mode: forwards"
        );
        player2.textContent = "AI";
        score.textContent =
          playerArray[0].getScore() + "  -  " + playerArray[1].getScore();
      }
    });
  };
  return { playerArray, startGame, gameMode, getGameMode };
})();

gameControl.startGame();
gameFlow.resetButton();
gameBoard.backdropCard();
gameBoard.goBack();
function getBestMove(boardRows, depth) {
  let bestMove = -Infinity;
  let move = null;
  player2.setAttribute("style", "background-color:rgb(231, 231, 238)");
  player1.setAttribute(
    "style",
    "animation:highlight-turn 0.5s;animation-fill-mode: forwards"
  );

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
        let score = minimax(boardRows, depth, -Infinity, Infinity, false);
        cell.textContent = "";
        if (score > bestMove) {
          bestMove = score;
          move = cell;
        }
      }
    }
  }
  move.classList.add("animation");
  move.textContent = "O";
  currentPlayer = human;
  let result = getWinner();
  getWinningPositions();
  if (result !== "") {
    backdrop2.setAttribute("style", "display:flex;");
    const winner = getWinner();
    if (winner === "X") {
      winnerCard.textContent = playerArray[0].getName() + " won!";
      playerArray[0].addScore();
      score.textContent =
        playerArray[0].getScore() + "  -  " + playerArray[1].getScore();
    } else if (winner === "O") {
      winnerCard.textContent = "AI won!";
      playerArray[1].addScore();
      score.textContent =
        playerArray[0].getScore() + "  -  " + playerArray[1].getScore();
    } else {
      winnerCard.textContent = "I'ts a draw";
    }
    return;
  }
}
function minimax(boardRows, depth, alpha, beta, isMaximizingPlayer) {
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
        const value = minimax(
          boardRows,
          depth - 1,
          alpha,
          beta,
          !isMaximizingPlayer
        );
        cell.textContent = "";
        bestValue = isMaximizingPlayer
          ? Math.max(bestValue, value)
          : Math.min(bestValue, value);
        if (isMaximizingPlayer) {
          alpha = Math.max(alpha, bestValue);
        } else {
          beta = Math.min(beta, bestValue);
        }
        if (beta <= alpha) {
          break;
        }
      }
    }
  }
  return bestValue;
}
