class TicTacToe {
    constructor() {
        this.board = document.querySelector('.board');
        this.cells = document.querySelectorAll('[data-cell]');
        this.status = document.querySelector('.status');
        this.resetButton = document.querySelector('.reset-btn');
        this.scoreX = document.querySelector('.score-x');
        this.scoreO = document.querySelector('.score-o');
        
        this.scores = {
            X: 0,
            O: 0
        };
        
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.boardState = Array(9).fill('');
        
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleClick(e), { once: true });
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.updateStatus();
    }
    
    handleClick(e) {
        if (!this.gameActive) return;
        
        const cell = e.target;
        const index = Array.from(this.cells).indexOf(cell);
        
        if (this.boardState[index] !== '') return;
        
        this.boardState[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
    }
    
    checkWin() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (
                this.boardState[a] &&
                this.boardState[a] === this.boardState[b] &&
                this.boardState[a] === this.boardState[c]
            ) {
                this.highlightWinningCells(combination);
                return true;
            }
            return false;
        });
    }
    
    highlightWinningCells(combination) {
        combination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }
    
    checkDraw() {
        return this.boardState.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.status.textContent = `Player ${this.currentPlayer} wins!`;
        this.scores[this.currentPlayer]++;
        this.updateScores();
    }
    
    handleDraw() {
        this.gameActive = false;
        this.status.textContent = "It's a draw!";
    }
    
    updateStatus() {
        this.status.textContent = `Player ${this.currentPlayer}'s turn`;
    }
    
    updateScores() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
    }
    
    resetGame() {
        this.boardState = Array(9).fill('');
        this.gameActive = true;
        this.currentPlayer = 'X';
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
            cell.addEventListener('click', (e) => this.handleClick(e), { once: true });
        });
        
        this.updateStatus();
    }
}

// Initialize the game
new TicTacToe();