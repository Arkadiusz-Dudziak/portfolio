class Player {
    constructor(tetris) {

        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;

        this.tetris = tetris;
        this.arena = tetris.arena;

        this.dropCounter = 0;
        this.dropInterval = this.DROP_SLOW;
    
        this.pos = {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;

        this.reset();
    }

    move(direction) {
        this.pos.x += direction;
        if(this.arena.collide(this)) {
            this.pos.x -= direction;
        }
    }

    reset() {
        const pieces = 'ILJOTSZ';
        this.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
        this.pos.y = 0;
        this.pos.x = (this.arena.matrix[0].length / 2 | 0) - (this.matrix[0].length /2 | 0);
    
        if(this.arena.collide(this)) {
            this.arena.clear();
            this.score = 0;
            this.tetris.updateScore(this.score);
        }
    }

    rotate(direction) {
        const pos = this.pos.x;
        let offset = 1;
        this._rotateMatrix(this.matrix, direction);
        while(this.arena.collide(this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if(offset > this.matrix[0].length) {
                this._rotateMatrix(this.matrix, -direction);
                this.pos.x = pos;
                return;
            }
        }
    }

    _rotateMatrix(matrix, direction) {
        for(let y=0; y < matrix.length; ++y) {
            for(let x=0; x<y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x]
                ] = [
                    matrix[y][x],
                    matrix[x][y]
                ];
            }
        }
    
        if(direction > 0){
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    drop() {
        this.pos.y++;
        if(this.arena.collide(this)) {
            this.pos.y--;
            this.arena.merge(this);
            this.reset();
            this.score += this.arena.sweep();
            if(this.score >= bestScore) {
                bestScore = this.score;
                updateBestScore();
            }
            this.tetris.updateScore(this.score);
        }
        this.dropCounter = 0;
    }

    update(deltaTime) {
        this.dropCounter += deltaTime;
        if(this.dropCounter > this.dropInterval) {
            this.drop();
        }
    }
}


