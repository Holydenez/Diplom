import React from 'react';
import MaterialIcon, { colorPalette } from 'material-icons-react';
import './TheoryComponents.css';



export default class TheoryContent extends React.Component {
    state = {
        navbarWidth: 20
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
        this.setState({ navbarWidth: 20 })
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
                onMouseOver={this.expandNavbar} onMouseOut={this.hideNavbar} className="TheoryContent">
                <div style={style} className="TheoryContent-innerblock">
                    <h4>ЗМІСТ</h4>
                    <div className="Button" onClick={() => this.props.navigateTo()}>
                        <p>ПЛІВКОВІ ТЕЧІЇ І АКТУАЛЬНІСТЬ ЇХ ДОСЛІДЖЕННЯ</p>
                    </div>
                    <div className="Button" onClick={() => this.props.navigateTo("theory")}>
                        <p>МОДЕЛЮВАННЯ ТЕЧІЇ ДВОШАРОВОЇ РІДКОЇ ПЛІВКИ ПО ПОВЕРХНІ ПЛАСТИНИ</p>
                    </div>
                    <div className="Button" onClick={() => this.props.navigateTo("practice")}>
                        <p>ЗАДАЧА ПРО ТЕЧІЮ ДВОШАРОВОЇ РІДКОЇ ПЛІВКИ ПО ПОВЕРХНІ ЦИЛІНДРА</p>
                    </div>
                </div>
            </div>
        );
    }
}

