class MatchGame {
    constructor() {
        this.board = [];
        this.boardSize = 8;
        this.colors = ['🔴', '🔵', '🟢', '🟡', '🟣'];
        this.selectedTile = null;
        this.gameBoard = document.getElementById('game-board');
        this.init();
    }

    init() {
        // 初始化游戏板
        for (let i = 0; i < this.boardSize; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.boardSize; j++) {
                const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
                this.board[i][j] = randomColor;
            }
        }
        this.renderBoard();
    }

    renderBoard() {
        this.gameBoard.innerHTML = '';
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.textContent = this.board[i][j];
                tile.dataset.row = i;
                tile.dataset.col = j;
                tile.addEventListener('click', () => this.handleTileClick(i, j));
                this.gameBoard.appendChild(tile);
            }
        }
    }

    handleTileClick(row, col) {
        if (!this.selectedTile) {
            this.selectedTile = { row, col };
            document.querySelector(`[data-row="${row}"][data-col="${col}"]`).style.border = '2px solid black';
        } else {
            const prevRow = this.selectedTile.row;
            const prevCol = this.selectedTile.col;
            
            if (this.isAdjacent(prevRow, prevCol, row, col)) {
                this.swapTiles(prevRow, prevCol, row, col);
                if (this.checkMatches()) {
                    this.removeMatches();
                    this.fillBoard();
                } else {
                    this.swapTiles(prevRow, prevCol, row, col);
                }
            }
            
            document.querySelector(`[data-row="${prevRow}"][data-col="${prevCol}"]`).style.border = '';
            this.selectedTile = null;
        }
    }

    isAdjacent(row1, col1, row2, col2) {
        return (Math.abs(row1 - row2) === 1 && col1 === col2) || 
               (Math.abs(col1 - col2) === 1 && row1 === row2);
    }

    swapTiles(row1, col1, row2, col2) {
        [this.board[row1][col1], this.board[row2][col2]] = 
        [this.board[row2][col2], this.board[row1][col1]];
        this.renderBoard();
    }

    checkMatches() {
        // 检查是否有匹配的方块
        // 这里简化版只检查三个相连的情况
        return false; // 需要实现具体的匹配逻辑
    }

    removeMatches() {
        // 移除匹配的方块
        this.renderBoard();
    }

    fillBoard() {
        // 填充空缺的方块
        this.renderBoard();
    }
}

// 初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    new MatchGame();
});