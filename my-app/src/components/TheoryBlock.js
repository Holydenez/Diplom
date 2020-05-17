import React from 'react';
import './Components.css';
//components
import TheoryContent from "./theory-components/TheoryContents"


export default class TheoryBlock extends React.Component {
    state = {
    }
    render() {
        return (
            <div className="Main-block">
            <TheoryContent/>
                <div className="Practice-inner">
                    <div className="Practice-header">
                        TheoryBlock
                    </div>
                </div>
            </div>
        );
    }
}

