import Style from './style.pcss';
import React from 'react';
import Container from 'core/container';

import Header from 'component/header';
import Players from 'component/players';
import Button from 'component/button';
import Footer from 'component/footer';

import Game from 'page/game';

class App extends React.Component {
    render() {
        return(
            <div className="app">
                <div className="app-container">
                    <Header />
                    <Players {...Container.get('config').players} />
                    <Button clickAction={()=>{console.log('+++')}} />
                    <Game />
                    <Footer />
                </div>
            </div>
        );
    }

}

export default App;