'use strict';

class AbstractReducer
{
    /**
     * Key name for global store
     * @returns {Object}
     */
    getKeyName() {
        return Object.getPrototypeOf(this);
    }

    /**
     * Return map with scheme: localKey<string> => handler<string>
     * @returns {Object}
     */
    getReducersMap() {
        return {};
    }

    /**
     * Return default state
     * @returns {Object}
     */
    getDefaultState() {
        return {};
    }

    /**
     * Main reducer handler
     * @param state
     * @param action
     * @returns {*}
     */
    reducer(state, action) {
        let map = this.getReducersMap(),
            _state = state || this.getDefaultState();

        if(map && typeof map == 'object') {
            if(action.type in map) {
                return this._applyReducer(map[action.type], _state, action);
            }
        }
        return _state;
    }

    /**
     * Reducers combine
     * @param reducer
     * @param state
     * @param action
     * @returns {*}
     * @private
     */
    _applyReducer(reducer, state, action) {
        if(typeof reducer == 'function') return reducer(state, action);
        else if(Array.isArray(reducer)) {
            let newState = state;
            for(let func of reducer) {
                newState = this._applyReducer(func, newState, action);
            }
            return newState;
        }
        return state;
    }
}

export default AbstractReducer;