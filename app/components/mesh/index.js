import Style from './style.pcss';
import React from 'react';
import { Sprite } from 'react-pixi';

import Chip from 'component/chip';

export default class Mesh extends React.Component {
    static propTypes = {
        mesh: React.PropTypes.array.isRequired
    };

    generateMesh(mesh) {
        return mesh.map((row, y) => {
            return (
                <div key={y}>
                    {this.generateRow(row, y)}
                </div>
            );
        });
    }

    generateRow(row, y) {
        return row.map((unit, x) => {
            return this.createChip(x, y, unit.code, unit.win);
        });
    }

    createChip(x, y, v, w) {
        return (
            <Chip key={[x, y].join(':')} x={x} y={y} value={v} win={w} />
        );
    }

    render() {
        let {mesh} = this.props;
        return(
            <div className="mesh">
                {this.generateMesh(mesh)}
            </div>
        );
        /*return (
            <Sprite backgroundColor={'#ff0000'} />
        );*/
    }

}