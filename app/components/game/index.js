import Style from './style.pcss';
import React from 'react';

import Control from 'component/control';
import Mesh from 'component/mesh';

class Game extends React.Component {
    static propTypes = {
        columns: React.PropTypes.number.isRequired,
        mesh: React.PropTypes.array.isRequired,
        turnAction: React.PropTypes.func.isRequired
    };

    render() {
        let {columns, mesh, turnAction} = this.props;
        return(
            <div className="game">
                <Control columns={columns} turnAction={turnAction} />
                <Mesh mesh={mesh} />
            </div>
        );
    }

}

export default Game;