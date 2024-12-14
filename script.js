class SnakeAndLadderGame {
    constructor() {
        this.player1Position = 1;  // Both players start at position 1
        this.player2Position = 1;
        this.currentPlayer = 1;
        this.player1Name = ''; 
        this.player2Name = ''; 
        this.snakes = {
            16: 6,
            47: 26,
            49: 11,
            56: 53,
            62: 19,
            64: 60,
            87: 24,
            93: 73,
            95: 75,
            98: 78
        };
        this.ladders = {
            1: 38,
            4: 14,
            9: 31,
            21: 42,
            28: 84,
            36: 44,
            51: 67,
            71: 91,
            80: 100
        };
    }

    initializeBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';

        // Create the cells for the board
        for (let i = 100; i > 0; i--) {
            const cell = document.createElement('div');
            cell.classList.add('game-board-cell');
            cell.textContent = i;

            // Add snake or ladder styles
            if (this.snakes[i]) {
                cell.classList.add('snake');
            }
            if (this.ladders[i]) {
                cell.classList.add('ladder');
            }

            // Append the cell to the game board
            gameBoard.appendChild(cell);
        }

        // Create player markers at position 1
        this.addPlayerMarker(1, 'P1');
        this.addPlayerMarker(1, 'P2');
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    movePlayer(diceRoll) {
        const currentPlayerPosition = this.currentPlayer === 1
            ? this.player1Position
            : this.player2Position;

        let newPosition = currentPlayerPosition + diceRoll;

        // Check for snakes and ladders
        if (this.snakes[newPosition]) {
            newPosition = this.snakes[newPosition];
        }
        if (this.ladders[newPosition]) {
            newPosition = this.ladders[newPosition];
        }

        // Ensure position doesn't go beyond 100
        newPosition = Math.min(newPosition, 100);

        // Move player marker visually
        this.updatePlayerMarker(this.currentPlayer, newPosition);

        // Update the player's position
        if (this.currentPlayer === 1) {
            this.player1Position = newPosition;
        } else {
            this.player2Position = newPosition;
        }

        return newPosition;
    }

    addPlayerMarker(position, player) {
        const gameBoardCells = document.getElementById('gameBoard').children;
        const playerMarker = document.createElement('div');
        playerMarker.classList.add('player-marker');
        playerMarker.textContent = player;
        gameBoardCells[100-position].appendChild(playerMarker);
    }

    updatePlayerMarker(playerNumber, newPosition) {
        const gameBoardCells = document.getElementById('gameBoard').children;

        // Remove old player marker
        const oldPlayerMarker = gameBoardCells[100 - (playerNumber === 1 ? this.player1Position : this.player2Position)].querySelector('.player-marker');
        if (oldPlayerMarker) {
            oldPlayerMarker.remove();
        }

        // Add the player marker to the new position
        const newCell = gameBoardCells[100 - newPosition];
        const playerMarker = document.createElement('div');
        playerMarker.classList.add('player-marker');
        playerMarker.textContent = playerNumber === 1 ? 'P1' : 'P2';
        newCell.appendChild(playerMarker);
    }
}

const game = new SnakeAndLadderGame();

document.getElementById('start-button').addEventListener('click', () => {
    const player1Name = document.getElementById('player1-name').value;
    const player2Name = document.getElementById('player2-name').value;

    if (player1Name && player2Name) {
        // Store player names
        game.player1Name = player1Name;
        game.player2Name = player2Name;

        game.initializeBoard();
        document.getElementById('name-input').style.display = 'none';
        document.getElementById('currentPlayerDisplay').textContent = `${player1Name}'s turn!`;
        document.getElementById('rollButton').disabled = false;
    } else {
        alert('Please enter both player names');
    }
});

document.getElementById('rollButton').addEventListener('click', () => {
    const diceRoll = game.rollDice();
    // Use Unicode dice characters instead of images
    const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    document.getElementById('diceImg').textContent = diceFaces[diceRoll - 1];

    const newPosition = game.movePlayer(diceRoll);

    if (newPosition === 100) {
        document.getElementById('gameMessage').textContent = game.currentPlayer === 1 
            ? `${game.player1Name} wins!` 
            : `${game.player2Name} wins!`;
        document.getElementById('rollButton').disabled = true;
    } else {
        game.currentPlayer = game.currentPlayer === 1 ? 2 : 1;
        document.getElementById('currentPlayerDisplay').textContent = game.currentPlayer === 1 
            ? `${game.player1Name}'s turn!` 
            : `${game.player2Name}'s turn!`;
    }
});