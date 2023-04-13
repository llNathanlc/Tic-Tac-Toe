const gameBoard = (() => {
  const tiles = document.querySelectorAll(".row");
  return { tiles };
})();

const playerFactory = (player) => {
  const getName = () => player;
  const playing = "playing";
  return { getName, playing };
};

const gameFlow = (() => {
  let won = false;
  let lastPlayed = "";
  const write = (p1, p2) => {
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
            lastPlayed = 0;
          } else if (p2.playing == "playing") {
            e.textContent = "O";
            e.setAttribute("symbol", "O");
            p2.playing = "";
            p1.playing = "playing";
            lastPlayed = 1;
          }
        });
      });
    });
  };

  const winner = (tiles) => {
    tiles.forEach(function (e) {
      e.addEventListener("click", function () {
        if (
          Array.from(document.querySelectorAll(".cell")).every(
            (e) => e.textContent != ""
          )
        ) {
          win.textContent = " Its a tie!";
          
        }
        if (
          tiles[0].children[0].getAttribute("symbol") ==
            tiles[0].children[1].getAttribute("symbol") &&
          tiles[0].children[0].getAttribute("symbol") ==
            tiles[0].children[2].getAttribute("symbol")
        ) {
          won = true;
          win.textContent =
            "winner  " + gameControl.playerArray[lastPlayed].getName();
          tiles[0].children[0].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[0].children[1].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[0].children[2].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
        }

        if (
          tiles[1].children[0].getAttribute("symbol") ==
            tiles[1].children[1].getAttribute("symbol") &&
          tiles[1].children[0].getAttribute("symbol") ==
            tiles[1].children[2].getAttribute("symbol")
        ) {
          won = true;
          win.textContent =
            "winner  " + gameControl.playerArray[lastPlayed].getName();
          tiles[1].children[0].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[1].children[1].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[1].children[2].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
        }
        if (
          tiles[2].children[0].getAttribute("symbol") ==
            tiles[2].children[1].getAttribute("symbol") &&
          tiles[2].children[0].getAttribute("symbol") ==
            tiles[2].children[2].getAttribute("symbol")
        ) {
          won = true;
          win.textContent =
            "winner  " + gameControl.playerArray[lastPlayed].getName();
          tiles[2].children[0].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[2].children[1].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[2].children[2].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
        }
        if (
          tiles[0].children[0].getAttribute("symbol") ==
            tiles[1].children[0].getAttribute("symbol") &&
          tiles[0].children[0].getAttribute("symbol") ==
            tiles[2].children[0].getAttribute("symbol")
        ) {
          won = true;
          win.textContent =
            "winner  " + gameControl.playerArray[lastPlayed].getName();
          tiles[0].children[0].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[1].children[0].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[2].children[0].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
        }
        if (
          tiles[0].children[1].getAttribute("symbol") ==
            tiles[1].children[1].getAttribute("symbol") &&
          tiles[0].children[1].getAttribute("symbol") ==
            tiles[2].children[1].getAttribute("symbol")
        ) {
          won = true;
          win.textContent =
            "winner  " + gameControl.playerArray[lastPlayed].getName();
          tiles[0].children[1].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[1].children[1].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[2].children[1].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
        }
        if (
          tiles[0].children[2].getAttribute("symbol") ==
            tiles[1].children[2].getAttribute("symbol") &&
          tiles[0].children[2].getAttribute("symbol") ==
            tiles[2].children[2].getAttribute("symbol")
        ) {
          won = true;
          win.textContent =
            "winner  " + gameControl.playerArray[lastPlayed].getName();
          tiles[0].children[2].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[1].children[2].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[2].children[2].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
        }
        if (
          tiles[0].children[0].getAttribute("symbol") ==
            tiles[1].children[1].getAttribute("symbol") &&
          tiles[0].children[0].getAttribute("symbol") ==
            tiles[2].children[2].getAttribute("symbol")
        ) {
          won = true;
          win.textContent =
            "winner  " + gameControl.playerArray[lastPlayed].getName();
          tiles[0].children[0].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[1].children[1].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[2].children[2].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
        }
        if (
          tiles[0].children[2].getAttribute("symbol") ==
            tiles[1].children[1].getAttribute("symbol") &&
          tiles[0].children[2].getAttribute("symbol") ==
            tiles[2].children[0].getAttribute("symbol")
        ) {
          won = true;
          win.textContent =
            "winner  " + gameControl.playerArray[lastPlayed].getName();
          tiles[0].children[2].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[1].children[1].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
          tiles[2].children[0].setAttribute(
            "style",
            "background-color:rgb(172, 255, 127)"
          );
        }
      });
    });
  };
  const resetButton = () => {
    reset.addEventListener("pointerdown", function () {
      let i = 0;
      Array.from(document.querySelectorAll(".cell")).forEach((e) => {
        e.textContent = "";
        e.removeAttribute("style");
        e.setAttribute("symbol", i);
        i++;
      });
      won = false;
      win.textContent = "";
      gameControl.playerArray[0].playing = "playing";
      gameControl.playerArray[1].playing = "";
    });
  };
  return { write, winner, resetButton };
})();

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
      gameFlow.write(playerArray[0], playerArray[1]);
      player1.textContent = playerArray[0].getName();
      player2.textContent = playerArray[1].getName();
    });
  };

  return { playerArray, startGame };
})();

gameFlow.winner(gameBoard.tiles);
gameControl.startGame();
gameFlow.resetButton();


