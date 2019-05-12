import React from 'react';
import './Components.css';
//assets
import cylinder from '../assets/images/cylinder.jpg';
import sheet from '../assets/images/sheet.jpg';
//components
import NavigationBlock from "./NavigationBlock"
import PracticeProgramm from './practice-components/PracticeProgramm';


export default class PracticeBlock extends React.Component {
    state = {
        navigationPracticeRoute: "home"
    }
    navigatePracticeTo = (navigationaPath) => {
        this.setState({ navigationPracticeRoute: navigationaPath ? navigationaPath : "home" })
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
        return (
            <div className="Main-block">
                {/* <div
                    className="Navigation-background"
                    style={style}
                /> */}
                <div className="Practice-inner">
                    <div className="Practice-header">
                        Practice
                    </div>
                    {this.state.navigationPracticeRoute === "home" ?
                        <div className="Practice-navigation">
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={sheet}
                                navigateRoute="sheet"
                                title="ДОСЛІДЖЕННЯ ТЕЧІЇ ДВОШАРОВОЇ РІДКОЇ ПЛІВКИ ПО ПОВЕРХНІ ПЛАСТИНИ" />
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={cylinder}
                                navigateRoute="cylinder"
                                title="ДОСЛІДЖЕННЯ ТЕЧІЇ ДВОШАРОВОЇ РІДКОЇ ПЛІВКИ ПО ПОВЕРХНІ ЦИЛІНДРА" />
                        </div>
                        :
                        <div className="Practice-programm">
                            <PracticeProgramm  navigateTo={this.navigatePracticeTo}/>
                        </div>}
                </div>
            </div>
        );
    }
}

