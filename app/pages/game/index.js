import Style from './style.pcss';

import React from 'react';
import { connect } from 'react-redux';
import Container from 'core/container';

//import indexActions from './actions';

class Game extends React.Component {
    static select(state) {
        return {
            state: state.game
        };
    }

    constructor() {
        super();

        this.config = Container.get('config');
    }

    render() {
        return(
            <div className="game">lorem ipsum dolor sit amet</div>
        );
    }

}

export default connect(Game.select)(Game);