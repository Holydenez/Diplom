import React from 'react';
import './PracticeProgramm.css';


export default class PracticeProgramm extends React.Component {
    state = {
    }
    render() {
        return (
            <div className="Main">
                <div className="Back-button" onClick={()=>this.props.navigateTo()}>
                    Back
                </div>
                Programm realisation is in progress
            </div>
        );
    }
}

