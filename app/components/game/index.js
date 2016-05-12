import Style from './style.pcss';
import React from 'react';

import { Stage } from 'react-pixi';
import Control from 'component/control';
import Mesh from 'component/mesh';

export default class Game extends React.Component {
    static propTypes = {
        columns: React.PropTypes.number.isRequired,
        mesh: React.PropTypes.array.isRequired,
        turnAction: React.PropTypes.func.isRequired
    };

    /*componentDidMount() {
        this.stage = this.refs.stage;
        this.animate();
    }

    animate() {
        this.render();
        requestAnimationFrame(this.animate.bind(this));
    }*/

    render() {
        let {columns, mesh, turnAction} = this.props;

        /*<Stage backgroundColor={'#ffffff'} ref="stage" width={560} height={560}>*/
        return(
            <div className="game">
                <Control columns={columns} turnAction={turnAction} />
                <Mesh mesh={mesh} />
            </div>
        );
    }

}