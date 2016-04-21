import Style from './style.pcss';
import React from 'react';

import Chip from 'component/chip';

class Mesh extends React.Component {
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
            return this.createChip(x, y, unit.code);
        });
    }

    createChip(x, y, v) {
        return (
            <Chip key={[x, y].join(':')} x={x} y={y} v={v} />
        );
    }

    render() {
        let {mesh} = this.props;
        return(
            <div className="mesh">
                {this.generateMesh(mesh)}
            </div>
        );
    }

}

export default Mesh;