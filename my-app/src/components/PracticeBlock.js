import React from 'react';
import './Components.css';
//assets
import steelplate from '../assets/images/steelplate.jpg';
import sheet from '../assets/images/sheet.jpg';
import cylinder from '../assets/images/cylinder.jpg'
import many_cylinders from '../assets/images/many-cylinders.jpg'
//components
import NavigationBlock from "./NavigationBlock"
import PlateLinear from './practice-components/PlateLinear';
import PlateNotLinear from './practice-components/PlateNotLinear'
import CylinderLinear from './practice-components/CylinderLinear'
import CylinderNotLinear_v1 from './practice-components/CylinderNotLinear_v1'


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
                <div className="Practice-inner">
                    <div className="Practice-header">
                        <h2>Практична частина</h2>
                        {this.state.navigationPracticeRoute === "home" &&
                            <div className="Practice-header-inner">
                                У цій частині користувач може переглянути графіки швидкості двошарової плівки в залежності від вхідних параметрів. Користувач може експерементувати, самостіно задаваючи параметри, або використати стандартні, запропоновані значення.
                            </div>
                        }
                    </div>
                    {this.state.navigationPracticeRoute === "home" ?
                        <div className="Practice-navigation">
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={sheet}
                                navigateRoute="sheet"
                                title={("Течія двошарової плівки лінійної рідини по поверхні пластини").toUpperCase()} />
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={steelplate}
                                navigateRoute="sheet_v2"
                                title={("Течія двошарової плівки нелінійно-в’язкої рідини по поверхні пластини").toUpperCase()} />
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={cylinder}
                                navigateRoute="cylinder"
                                title={("Течія двошарової плівки лінійної рідини по поверхні циліндра").toUpperCase()} />
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={many_cylinders}
                                navigateRoute="cylinder_v2"
                                title={("Течія двошарової плівки нелінійно-в’язкої рідини по поверхні циліндра (перший спосіб розв'язку)").toUpperCase()} />
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={many_cylinders}
                                navigateRoute="cylinder_v3"
                                title={("Течія двошарової плівки нелінійно-в’язкої рідини по поверхні циліндра (другий спосіб розв'язку)").toUpperCase()} />
                        </div>
                        :
                        this.state.navigationPracticeRoute === "sheet" ?
                            <div className="Practice-programm">
                                <PlateLinear navigateTo={this.navigatePracticeTo} />
                            </div>
                            :
                            this.state.navigationPracticeRoute === "sheet_v2" ?
                                <div className="Practice-programm">
                                    <PlateNotLinear navigateTo={this.navigatePracticeTo} />
                                </div>
                                : this.state.navigationPracticeRoute === "cylinder" ?
                                    <div className="Practice-programm">
                                        <CylinderLinear navigateTo={this.navigatePracticeTo} />
                                    </div>
                                    :
                                    <div className="Practice-programm">
                                        <CylinderNotLinear_v1 navigateTo={this.navigatePracticeTo} />
                                    </div>
                    }
                </div>
            </div>
        );
    }
}

