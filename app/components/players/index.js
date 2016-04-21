import Style from './style.pcss';
import React from 'react';

export default class Players extends React.Component {
    calcClasses(player) {
        let classes = ['player-block'];

        if(player.active) classes.push('active');
        if(player.win) classes.push('win');

        return classes.join(' ');
    }

    render() {
        let {player1, player2} = this.props;
        return(
            <div className="players">
                <div className={this.calcClasses(player1)} style={{color: player1.color}}>{player1.name}</div>
                <div className="player-particle">VS</div>
                <div className={this.calcClasses(player2)} style={{color: player2.color}}>{player2.name}</div>
            </div>
        );
    }

}