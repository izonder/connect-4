import Style from './style.pcss';
import React from 'react';

export default class Chip extends React.Component {
    static propTypes = {
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
        value: React.PropTypes.any,
        win: React.PropTypes.bool.isRequired
    };

    getClassName(value, win) {
        return [
            'chip',
            value ? 'chip-' + value.toLowerCase() : '',
            win ? 'chip--win' : ''
        ].join(' ');
    }

    render() {
        let {x, y, value, win} = this.props;
        return(
            <div className={this.getClassName(value, win)}></div>
        );
    }

}