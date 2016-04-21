import Style from './style.pcss';
import React from 'react';

class Chip extends React.Component {
    static propTypes = {
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
        v: React.PropTypes.any
    };

    render() {
        let {x, y, v} = this.props;
        return(
            <span className="chip">[ {v || '_'} ]</span>
        );
    }

}

export default Chip;