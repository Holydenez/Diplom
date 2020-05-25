import React from 'react';
import './PlateLinear.css';
import Chart from "chart.js"
import MaterialIcon from 'material-icons-react';
import { calculateCylinderNotLinearLiquid } from "../../services/two-phase-skin"

export default class PlateLinear extends React.Component {
    state = {
        δ1: 1,
        δ2: 1,
        n1: 0.5,
        n2: 0.5,
        p1: 1,
        p2: 1,
        Re1: 1,
        Re2: 1,
        Fr: 1,
        Ge: 0
    }
    componentDidMount = () => {
        this.calculateChart()
    }
    handleChange = (event) => {
        if (event.target.value.length > 0) {
            this.setState({ [event.target.name]: parseFloat(event.target.value) })
        }
    }
    clearInput = (event) => {
        //this.setState({ [event.target.name]: 0 })
    }
    calculateChart = () => {
        const { δ1, δ2, n1, n2, p1, p2, Re1, Re2, Fr, Ge } = this.state
        const calculateInfo = calculateCylinderNotLinearLiquid(δ1, δ2, n1, n2, p1, p2, Re1, Re2, Fr, Ge)
        console.log(calculateInfo.speedArray)
        this.setState({
            maxSpeed: calculateInfo.Wmax,
            averageSpeed: calculateInfo.Wsr,
            geOpt: calculateInfo.GeOpt
        })
        let wArray = [], indexArray = []
        calculateInfo.speedArray.forEach(speedElement => {
            if (speedElement.y.toFixed(1) <= δ1) {
                wArray.push(speedElement.W1)
            }
            else if (speedElement.y.toFixed(1) > δ1) {
                wArray.push(speedElement.W2)
            }
            indexArray.push(speedElement.y.toFixed(1))
        });
        var myLineChart = new Chart(this.refs.myChart, {
            type: 'line',
            data: {
                labels: indexArray,
                datasets: [{
                    label: 'Профіль швидкості плівки',
                    data: wArray,
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    fill: false,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }],
                }
            }
        });
    }

    render() {
        const inputValues = [
            {

                label: "δ1 (товщина рідини першої плівки):",
                name: "δ1",
                type: "number",
                value: this.state.δ1
            },
            {

                label: "δ2 (товщина рідини другої плівки):",
                name: "δ2",
                type: "number",
                value: this.state.δ2
            },
            {

                label: "n1:",
                name: "n1",
                type: "number",
                value: this.state.n1
            },
            {

                label: "n2:",
                name: "n2",
                type: "number",
                value: this.state.n2
            },
            {

                label: "p1 (густина рідини першої плівки):",
                name: "p1",
                type: "number",
                value: this.state.p1
            },
            {

                label: "p2 (густина рідини другої плівки):",
                name: "p2",
                type: "number",
                value: this.state.p2
            },
            {

                label: "Re1 (узагальнене число Рейльнодса для першої плівки):",
                name: "Re1",
                type: "number",
                value: this.state.Re1
            },
            {

                label: "Re2 (узагальнене число Рейльнодса для другої  плівки):",
                name: "Re2",
                type: "number",
                value: this.state.Re1
            },
            {

                label: "Fr (число Фруда):",
                name: "Fr",
                type: "number",
                value: this.state.Fr
            },
            {

                label: "Ge (безрозмірний комплекс, що характеризує вплив газового потоку на плівку):",
                name: "Ge",
                type: "number",
                value: this.state.Ge
            }
        ]
        return (
            <div className="Main">
                <div className="Back-button" onClick={() => this.props.navigateTo()}>
                    <MaterialIcon icon="undo" size={30} color="white" />
                </div>
                <div className="Form-and-chart-container">
                    <div className="Input-form-container">
                        <form className="Input-form">
                            {
                                inputValues.map((inputInfo, index) => {
                                    return (
                                        <label className="Input-label" key={index}>
                                            {inputInfo.label}
                                            <input className="Input" type={inputInfo.type} name={inputInfo.name} value={inputInfo.value} onChange={this.handleChange} onFocus={this.clearInput} />
                                        </label>
                                    )
                                })}
                            <div className="Submit-button" onClick={() => {
                                this.calculateChart()
                            }}>
                                Розрахувати
                        </div>
                        </form>
                    </div>
                    <div className="Chart-container">
                        <canvas ref="myChart" ></canvas>
                    </div>
                </div>
                <div className="Results-container">
                    {this.state.maxSpeed && <div className="Result-line">Максимальне значення швидкості: {this.state.maxSpeed.toFixed(2)}</div>}
                    {this.state.averageSpeed && <div className="Result-line">Середнє значення швидкості: {this.state.averageSpeed.toFixed(2)}</div>}
                    {this.state.geOpt && <div className="Result-line">Ge оптимальне: {this.state.geOpt.toFixed(2)}</div>}
                </div>
            </div>
        );
    }
}

