import Style from './style.pcss';
import React from 'react';
import { connect } from 'react-redux';
import Container from 'core/container';

import appActions from './actions';

import Header from 'component/header';
import Players from 'component/players';
import Button from 'component/button';
import Game from 'component/game';
import Footer from 'component/footer';

class App extends React.Component {
    static propTypes = {
        allowTurn: React.PropTypes.bool.isRequired,
        players: React.PropTypes.shape({
            player1: React.PropTypes.object.isRequired,
            player2: React.PropTypes.object.isRequired
        }).isRequired,
        mesh: React.PropTypes.array.isRequired
    };

    static select(state) {
        return {
            allowTurn: !!state.app.allowTurn,
            players: state.app.players || {
                player1: {},
                player2: {}
            },
            mesh: state.app.mesh || []
        };
    }

    constructor() {
        super();

        this.turnAction = this.turnAction.bind(this);
    }

    componentWillMount() {
        appActions.resetAction();
    }

    /*componentWillReceiveProps(props) {
        console.log('App', props);
    }*/

    turnAction(turn) {
        if(this.props.allowTurn) {
            appActions.turnAction(turn);
        }
        else {
            console.log('disallow');
        }
    }

    render() {
        let props = this.props,
            columnsNumber = Container.get('config').bounds.x;
        return(
            <div className="app">
                <div className="app-container">
                    <Header />
                    <Players {...props.players} />
                    <Button clickAction={appActions.resetAction} />
                    <Game columns={columnsNumber} mesh={props.mesh} turnAction={this.turnAction} />
                    <Footer />
                </div>
            </div>
        );
    }

}

export default connect(App.select)(App);