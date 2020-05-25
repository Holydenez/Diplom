import React from 'react';
import './Components.css';
//assets
import steelplate from '../assets/images/steelplate.jpg';
import many_cylinders from '../assets/images/many-cylinders.jpg'
//components
import NavigationBlock from "./NavigationBlock"
import PlateNotLinear from './practice-components/PlateNotLinear'
import CylinderNotLinear from './practice-components/CylinderNotLinear'

export default class PracticeBlock extends React.Component {
    state = {
        navigationPracticeRoute: "home"
    }
    navigatePracticeTo = (navigationaPath) => {
        this.setState({ navigationPracticeRoute: navigationaPath ? navigationaPath : "home" })
    }
    practiceForm = () => {
        const { navigationPracticeRoute } = this.state;
        switch (navigationPracticeRoute) {
            case 'sheet':
                return <PlateNotLinear navigateTo={this.navigatePracticeTo} />
            default:
                return <CylinderNotLinear navigateTo={this.navigatePracticeTo} />
        }
    }
    render() {
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
                                image={steelplate}
                                navigateRoute="sheet"
                                title={("Течія двошарової плівки нелінійно-в’язкої рідини по поверхні пластини").toUpperCase()} />
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={many_cylinders}
                                navigateRoute="cylinder"
                                title={("Течія двошарової плівки нелінійно-в’язкої рідини по поверхні циліндра").toUpperCase()} />
                        </div>
                        :
                        <div className="Practice-programm">
                            {this.practiceForm()}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

