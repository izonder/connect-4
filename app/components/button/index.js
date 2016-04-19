import Style from './style.pcss';
import React from 'react';

export default class Button extends React.Component {
    render() {
        let {clickAction} = this.props;
        return(
            <button className="button" onClick={clickAction}>New game</button>
        );
    }

}