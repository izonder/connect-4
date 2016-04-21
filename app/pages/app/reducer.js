import Container from 'core/container';
import AbstractReducer from 'core/reducer';

class AppReducer extends AbstractReducer
{
    getKeyName() {
        return 'app';
    }

    getReducersMap() {
        return {
            'app/reset': this.reset.bind(this),
            'app/lock': this.lockGame.bind(this),
            'app/chip': this.setChip.bind(this),
            'app/check': this.checkWin.bind(this),
            'app/next': this.nextPlayer.bind(this)
        };
    }

    /**
     * Reset game reducer
     * @param state
     * @param action
     * @returns {{allowTurn: boolean, correctTurn: boolean, winner: null, currentTurn: *, players: {player1: ({win, active}|*), player2: ({win, active}|*)}, mesh: *}}
     */
    reset(state, action) {
        return {
            ...state,
            allowTurn: true,
            correctTurn: true,
            winner: null,
            currentTurn: this._getFirstTurn(),
            lastChip: {
                x: null,
                y: null
            },
            players: {
                player1: this._setPlayer('player1'),
                player2: this._setPlayer('player2')
            },
            mesh: this._createMesh()
        };
    }

    /**
     * Lock game reducer
     * @param state
     * @param action
     * @returns {{allowTurn: boolean}}
     */
    lockGame(state, action) {
        return {
            ...state,
            allowTurn: false
        }
    }

    /**
     * Set a chip on the game field
     * @param state
     * @param action
     * @returns {*}
     */
    setChip(state, action) {
        let x = action.payload,
            mesh = state.mesh,
            player = state.currentTurn,
            chipCode = Container.get('config').players[player].chip,
            correct = false,
            currentCell = null,
            lastChip = state.lastChip;

        for (var y = 0; y < mesh.length; y++) {
            if(mesh[y][x] && !mesh[y][x].code) {
                correct = true;
                currentCell = y;
            }
            else break;
        }

        if(correct) {
            mesh[currentCell][x].code = chipCode;
            lastChip = {
                x: x,
                y: currentCell
            }
        }

        return {
            ...state,
            correctTurn: correct,
            lastChip: lastChip,
            mesh: mesh
        };
    }

    /**
     * Check if game is finished
     * @param state
     * @param action
     * @returns {*}
     */
    checkWin(state, action) {
        let mesh = state.mesh,
            boundX = Container.get('config').bounds.x,
            boundY = Container.get('config').bounds.y,
            player = state.currentTurn,
            players = state.players,
            chipCode = Container.get('config').players[player].chip,
            x = state.lastChip.x,
            y = state.lastChip.y,
            winner = null,

            horizontal = this._checkLine(mesh, chipCode, 0, y, 1, 0, boundX, boundX, boundY),
            vertical = this._checkLine(mesh, chipCode, x, 0, 0, 1, boundY, boundX, boundY),
            diagonal = this._checkLine(mesh, chipCode, 0, y-x, 1, 1, boundX, boundX, boundY),
            backdiagonal = this._checkLine(mesh, chipCode, 0, y+x, 1, -1, boundX, boundX, boundY);

        if(horizontal.length || vertical.length || diagonal.length || backdiagonal.length) {
            winner = state.currentTurn;
            players[winner].win = true;

            let winLine = (horizontal.length && horizontal)
                || (vertical.length && vertical)
                || (diagonal.length && diagonal)
                || (backdiagonal.length && backdiagonal);

            for (let cell of winLine) {
                mesh[cell.y][cell.x].win = true;
            }
        }

        return {
            ...state,
            winner: winner,
            players: players,
            mesh: mesh
        };
    }

    /**
     * Switch to next player
     * @param state
     * @param action
     * @returns {{allowTurn: boolean, correctTurn: boolean, currentTurn: *, players: {player1: {active: boolean}, player2: {active: boolean}}}}
     */
    nextPlayer(state, action) {
        let player = null;
        if(!state.winner) {
            if(!state.correctTurn) player = state.currentTurn;
            else player = state.currentTurn == 'player1' ? 'player2' : 'player1';
        }
        
        return {
            ...state,
            allowTurn: !state.winner,
            correctTurn: true,
            currentTurn: player,
            players: {
                player1: {
                    ...state.players.player1,
                    active: player == 'player1'
                },
                player2: {
                    ...state.players.player2,
                    active: player == 'player2'
                }
            }
        }
    }

    /**
     * Private methods
     */

    _getFirstTurn() {
        return Container.get('config').firstTurn;
    }
    
    _setPlayer(player) {
        return {
            ...Container.get('config').players[player],
            win: false,
            active: player == this._getFirstTurn()
        }
    }

    _createMesh() {
        let config = Container.get('config'),
            boundX = config.bounds.x,
            boundY = config.bounds.y,
            mesh = [];

        for (let y=0; y < boundY; y++) {
            mesh.push([]);
            for (let x=0; x < boundX; x++) {
                mesh[y].push(this._getDefaultUnit());
            }
        }

        return mesh;
    }

    _getDefaultUnit() {
        return {
            code: null,
            win: false
        }
    }

    _checkLine(mesh, chipCode, startX, startY, stepX, stepY, steps, boundX, boundY) {
        let result = [],
            x = startX,
            y = startY;

        for(let step = 0; step < steps; step++) {
            if(x >= 0 && x < boundX && y >= 0 && y < boundY) {
                if(mesh[y] && mesh[y][x] && mesh[y][x].code && mesh[y][x].code == chipCode) {
                    result.push({
                        x: x,
                        y: y
                    });

                    if(result.length >= 4) return result;
                }
                else result = [];

                x += stepX;
                y += stepY;
            }
        }

        return [];
    }
}

export default new AppReducer();