import React from 'react';
import MaterialIcon from 'material-icons-react';
import './Components.css';



export default class NavigationBar extends React.Component {
    state = {
        navbarWidth: 10
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }
    handleScroll = () => {
        if (window.scrollY > 0) {
            this.hideNavbar()
        }
        else {
            this.expandNavbar()
        }
    }
    expandNavbar = () => {
        this.setState({ navbarWidth: 10 })
    }
    hideNavbar = () => {
        this.setState({ navbarWidth: 0 })
    }
    render() {
        let style = {
            width: this.state.navbarWidth + "vw"
        }
        return (
            <div
                onMouseOver={this.expandNavbar} onMouseOut={this.hideNavbar} className="NavigationBar">
                <div style={style} className="NavigationBar-innerblock">
                    <div className="Button" onClick={() => this.props.navigateTo()}>
                        <p>Головна</p>
                        <MaterialIcon icon="home" size={40} />
                    </div>
                    <div className="Button" onClick={() => this.props.navigateTo("theory")}>
                        <p>Теорія</p>
                        <MaterialIcon icon="description" size={40} />
                    </div>
                    <div className="Button" onClick={() => this.props.navigateTo("practice")}>
                        <p>Практика</p>
                        <MaterialIcon icon="code" size={40} />
                    </div>
                </div>
            </div>
        );
    }
}

