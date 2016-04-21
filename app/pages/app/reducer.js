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

    reset(state, action) {
        return {
            ...state,
            allowTurn: true,
            correctTurn: true,
            winner: null,
            currentTurn: this._getFirstTurn(),
            players: {
                player1: this._setPlayer('player1'),
                player2: this._setPlayer('player2')
            },
            mesh: this._createMesh()
        };
    }

    lockGame(state, action) {
        return {
            ...state,
            allowTurn: false
        }
    }

    setChip(state, action) {
        return state;
    }
    
    checkWin(state, action) {
        return state;
    }
    
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
            code: null
        }
    }
}

export default new AppReducer();