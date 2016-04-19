import AbstractReducer from 'core/reducer';

class GameReducer extends AbstractReducer
{
    getKeyName() {
        return 'app';
    }

    getReducersMap() {
        return {
            'game/test': this.test
        };
    }

    test(state, action) {
        return {
            ...state,
            v: action.payload
        };
    }
}

export default new GameReducer();