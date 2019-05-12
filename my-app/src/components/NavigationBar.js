import React from 'react';
import './Components.css';


export default class NavigationBar extends React.Component {
    state = {
        navbarWidth: 0
    }
    expandNavbar = () => {
        this.setState({ navbarWidth: 10 })
    }
    hideNavbar = () => {
        this.setState({ navbarWidth: 0 })
    }
    render() {
        let style={
            width: this.state.navbarWidth+ "vw"
        }
        return (
            <div
                onMouseOver={this.expandNavbar} onMouseOut={this.hideNavbar} className="NavigationBar">
                <div style={style} className="NavigationBar-innerblock">
                    <div className="Button" onClick={()=>this.props.navigateTo()}>
                        Home
                    </div>
                    <div className="Button" onClick={()=>this.props.navigateTo("theory")}>
                        Theory
                    </div>
                    <div className="Button" onClick={()=>this.props.navigateTo("practice")}>
                        Practice
                    </div>
                </div>
            </div>
        );
    }
}

