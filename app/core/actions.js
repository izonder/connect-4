import { createAction } from 'redux-actions';

import Container from 'core/container';

class AbstractActions {
    createAction(actionType, actionCreator) {
        return (...args) => {
            Container.get('store').dispatch(createAction(actionType, actionCreator)(...args));
        }
    }
}

export default AbstractActions;