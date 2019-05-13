import React from 'react';
import './Components.css';


export default class NavigationBlock extends React.Component {
    state = {
    }
    render() {
        let style = {
            backgroundImage: `url(${this.props.image})`,
            backgroundPosition: 'center',
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        };
        let dark_background_style={
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor:"rgba(0,0,0,0.5)"
        }
        return (
            <div
                onClick={() => this.props.navigateTo(this.props.navigateRoute)}
                className="Navigation-block"
            >
                <div
                    className="Navigation-background"
                    style={style}
                />
                <div
                    style={dark_background_style}
                />
                <div className="Navigation-block-inner">
                    {this.props.title}
                </div>
            </div>
        );
    }
}

