import AbstractActions from 'core/actions';

class GameActions extends AbstractActions
{
    constructor() {
        super();

        this.testAction = this.createAction('game/test', this.test.bind(this));
    }

    test(v) {
        return v;
    }
}

export default new GameActions();