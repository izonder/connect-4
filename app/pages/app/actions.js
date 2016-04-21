import AbstractActions from 'core/actions';

class AppActions extends AbstractActions
{
    constructor() {
        super();

        this.resetAction = this.createAction('app/reset', this.resetGame.bind(this));
        this.turnAction = this.createAction('app/turn', this.makeTurn.bind(this));
        this.lockAction = this.createAction('app/lock', this.lockGame.bind(this));
        this.setChipAction = this.createAction('app/chip', this.setChip.bind(this));
        this.checkWinAction = this.createAction('app/check', this.checkWin.bind(this));
        this.nextPlayerAction = this.createAction('app/next', this.nextPlayer.bind(this));
    }

    resetGame() {
        return true;
    }

    makeTurn(turn) {
        this.lockAction();
        this.setChipAction(turn);
        this.checkWinAction();
        this.nextPlayerAction();
        return true;
    }

    lockGame() {
        return true;
    }

    setChip(turn) {
        return turn;
    }

    checkWin() {
        return true;
    }

    nextPlayer() {
        return true;
    }
}

export default new AppActions();