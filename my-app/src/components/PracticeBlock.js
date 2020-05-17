import React from 'react';
import './Components.css';
//assets
import steelplate from '../assets/images/steelplate.jpg';
import sheet from '../assets/images/sheet.jpg';
import cylinder from '../assets/images/cylinder.jpg'
import many_cylinders from '../assets/images/many-cylinders.jpg'
//components
import NavigationBlock from "./NavigationBlock"
import PracticeProgramm from './practice-components/PracticeProgramm';
import PracticeProgrammSecond from './practice-components/PracticeProgrammSecond'
import PracticeProgrammCylinder from './practice-components/PracticeProgrammCylinder'
import PracticeProgrammCylinderHard from './practice-components/PracticeProgrammCylinderHard'


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
                                У цій частині користувач може самостійно випробувати прикладну частину проекту, а саме переглянути рішення задач для запропонованих параметрів або поекспериментувати з власними параметрами. Також він може переглянути графіки залежностей для отриманих рішень
                            </div>
                        }
                    </div>
                    {this.state.navigationPracticeRoute === "home" ?
                        <div className="Practice-navigation">
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={sheet}
                                navigateRoute="sheet"
                                title={("Задача про течію двох плівок по поверхні пластини").toUpperCase()} />
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={steelplate}
                                navigateRoute="sheet_v2"
                                title={("Задача про течію двошарової плівки нелінійно-в’язкої рідини по поверхні пластини").toUpperCase()} />
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={cylinder}
                                navigateRoute="cylinder"
                                title={("ЗАДАЧА ПРО ТЕЧІЮ ДВОШАРОВОЇ РІДКОЇ ПЛІВКИ ПО ПОВЕРХНІ ЦИЛІНДРА").toUpperCase()} />
                            <NavigationBlock
                                navigateTo={this.navigatePracticeTo}
                                image={many_cylinders}
                                navigateRoute="cylinder_v2"
                                title={("ЗАДАЧА ПРО ТЕЧІЮ ДВОШАРОВОЇ ПЛІВКИ нелінійно-в’язкої рідини ПО ПОВЕРХНІ ЦИЛІНДРА").toUpperCase()} />
                        </div>
                        :
                        this.state.navigationPracticeRoute === "sheet" ?
                            <div className="Practice-programm">
                                <PracticeProgramm navigateTo={this.navigatePracticeTo} />
                            </div>
                            :
                            this.state.navigationPracticeRoute === "sheet_v2" ?
                                <div className="Practice-programm">
                                    <PracticeProgrammSecond navigateTo={this.navigatePracticeTo} />
                                </div>
                                : this.state.navigationPracticeRoute === "cylinder" ?
                                    <div className="Practice-programm">
                                        <PracticeProgrammCylinder navigateTo={this.navigatePracticeTo} />
                                    </div>
                                    :
                                    <div className="Practice-programm">
                                        <PracticeProgrammCylinderHard navigateTo={this.navigatePracticeTo} />
                                    </div>
                    }
                </div>
            </div>
        );
    }
}

