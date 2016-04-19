import Style from './style.pcss';
import React from 'react';

export default class Footer extends React.Component {
    render() {
        return(
            <div className="footer">
                <p>Copyright &copy; D. Morgachev, 2016</p>
                <p>izonder@gmail.com</p>
            </div>
        );
    }

}