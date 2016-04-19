import Container from 'core/container';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import routes from './../router';
import reducers from './../reducers';

class Main {
    constructor(node) {
        let middleware = [
                thunk,
                promise,
                createLogger()
            ],
            store = compose(
                applyMiddleware(...middleware),
                reduxReactRouter({
                    routes,
                    createHistory
                })
            )(createStore)(reducers);

        //экспорт store в container
        Container.set('store', store);

        //ВАЖНО! Из-за особенностей (бага) взаимодействия MDL и Redux отключается console.log, лечится обертыванием провайдера в дополнительный DIV
        //Подробнее: http://stackoverflow.com/questions/31998227/using-material-design-lite-with-react
        render((
            <div>
                <Provider store={store}>
                    <ReduxRouter />
                </Provider>
            </div>
        ), node);
    }
}

export default new Main(document.getElementById('root'));

