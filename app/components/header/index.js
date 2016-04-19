import Style from './style.pcss';
import React from 'react';

export default class Header extends React.Component {
    render() {
        return(
            <div className="header">
                <h1>Connect Four</h1>
                <h2>Classic two players' simple game</h2>
                <p>Press &laquo;New game&raquo; and make your turn. You should fill four points with your color for win.</p>
            </div>
        );
    }

}