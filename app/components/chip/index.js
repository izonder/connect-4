import Style from './style.pcss';
import React from 'react';

export default class Chip extends React.Component {
    static propTypes = {
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
        value: React.PropTypes.any,
        win: React.PropTypes.bool.isRequired
    };

    render() {
        let {x, y, value, win} = this.props;
        return(
            <span className={ win ? 'chip win' : 'chip'}>[ {value || '_'} ]</span>
        );
    }

}