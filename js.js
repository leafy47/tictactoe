const game = (function () {
    let order = true;
    let log = document.getElementById('log');
    let counter = 0;

    let clicker = function(event) {
        if(this.textContent) {
            return;
        }
        else {
            order == true ? this.textContent = 'O': this.textContent = 'X';
            let selection = Number(this.id.replace('square', ''));
            order == true ? gameBoard.boardstyle[selection] = true: gameBoard.boardstyle[selection] = false;
            order == true ? log.textContent = "Player 2's turn": log.textContent = "Player 1's turn";
            order == true ? order = false : order = true;
            counter++;
            if(counter == 9) {
                log.textContent = "Tie!";
            }
            if ((gameBoard.boardstyle[0] === gameBoard.boardstyle[3] && gameBoard.boardstyle[3] === gameBoard.boardstyle[6]) ||
                (gameBoard.boardstyle[1] === gameBoard.boardstyle[4] && gameBoard.boardstyle[4] === gameBoard.boardstyle[7]) ||
                (gameBoard.boardstyle[2] === gameBoard.boardstyle[5] && gameBoard.boardstyle[5] === gameBoard.boardstyle[8]) ||
                (gameBoard.boardstyle[0] === gameBoard.boardstyle[1] && gameBoard.boardstyle[1] === gameBoard.boardstyle[2]) ||
                (gameBoard.boardstyle[3] === gameBoard.boardstyle[4] && gameBoard.boardstyle[4] === gameBoard.boardstyle[5]) ||
                (gameBoard.boardstyle[6] === gameBoard.boardstyle[7] && gameBoard.boardstyle[7] === gameBoard.boardstyle[8]) ||
                (gameBoard.boardstyle[0] === gameBoard.boardstyle[4] && gameBoard.boardstyle[4] === gameBoard.boardstyle[8]) ||
                (gameBoard.boardstyle[2] === gameBoard.boardstyle[4] && gameBoard.boardstyle[4] === gameBoard.boardstyle[6])) {
                    order == true ? log.textContent = "Player 1 Wins": log.textContent = 'Player 2 Wins';
                    let squares = Array.from(document.getElementsByClassName('square'));
                    squares.forEach(element => {
                        element.removeEventListener('click', game.clicker);
                    });
                }
        }
    }

    let reload = function () {
        gameBoard.boardstyle = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        order = true;
        counter = 0;
        log.textContent = "Player 1's turn";
        let squares = Array.from(document.getElementsByClassName('square'));
        squares.forEach(element => {
            element.textContent = '';
            element.addEventListener('click', game.clicker);
        });
    }

    return {clicker, reload};
})();

const gameBoard = (function () {
    let board = document.getElementById('board');
    let reload = document.getElementById('reload');
    let boardstyle = [];
    let log = document.getElementById('log');
    log.textContent = "Player 1's turn";
    for(let i = 0; i<9; i++) {
        let square = document.createElement('div');
        square.id = `square${i}`;
        square.classList.add('square');
        square.addEventListener('click', game.clicker);
        board.appendChild(square);
        boardstyle.push(`${i}`);
    }
    reload.addEventListener('click', game.reload);
    return {boardstyle};
})();

