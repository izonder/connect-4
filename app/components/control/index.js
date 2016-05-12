import Style from './style.pcss';
import React from 'react';

export default class Control extends React.Component {
    static propTypes = {
        columns: React.PropTypes.number.isRequired,
        turnAction: React.PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.clickAction = this.clickAction.bind(this);
    }

    generateControlButtons() {
        let control = [];

        for (let i=0; i < this.props.columns; i++) {
            control.push(this.createControlButton(i));
        }

        return control;
    }

    createControlButton(i) {
        let salt = 'abcdefghijklmnopqrstuvwxyz',
            code = salt.substr(i, 1);

        return (
            <a href="#" className="control-button" key={i} onClick={(e)=>{this.clickAction(e, i)}}>{code}</a>
        );
    }

    clickAction(e, i) {
        e.preventDefault();
        this.props.turnAction(i);
    }

    render() {
        return(
            <div className="control">{this.generateControlButtons()}</div>
        );
    }

}