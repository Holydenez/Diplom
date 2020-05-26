import { integrate } from "./integration"

export function calculatePlateNotLinearLiquid(r1, r2, p1, p2, Re1, Re2, Fr, n2, n1, Ge) {
    //стандартные константы
    let r0 = 0.01;
    const Re1_Fr = Re1 / Fr;
    const Re2_Fr = Re2 / Fr;
    const _n1 = 1 / n1;
    const _n2 = 1 / n2;
    const _n1_n1_plus_one = n1 / (n1 + 1);
    const _n2_n2_plus_one = n2 / (n2 + 1);
    const _n1_plus_one_n1 = (n1 + 1) / n1;
    const _n2_plus_one_n2 = (n2 + 1) / n2;
    const p2_p1_and_r2_r1 = (p2 / p1) * (r2 / r1);
    const Re1_Fr_in_n = Math.pow(Re1_Fr, _n1)
    const Re2_Fr_in_n = Math.pow(Re2_Fr, _n2)
    const speedArray = [];
    // r2 - радиус второго слоя, r1 - радиус первого слоя
    for (let r = r0; r <= (r1 + r2); r = r + 0.1) {
        const Y = r;
        //вычисления для скорости первой пленки
        const U1_first_part = 1 + p2_p1_and_r2_r1 * (1 + Ge)
        const U1_second_part = 1 + p2_p1_and_r2_r1 * (1 + Ge) - Y;
        const U1 = Re1_Fr_in_n * _n1_n1_plus_one * (Math.pow(U1_first_part, _n1_plus_one_n1) - Math.pow(U1_second_part, _n1_plus_one_n1))
        //вычисления для скорости второй пленки
        const U2_second_part = p2_p1_and_r2_r1 * (1 + Ge)
        const U2_part_three = (r2 / r1) * (1 + Ge);
        const U2_part_four = Math.abs(1 + U2_part_three - Y);
        const U2 = Re1_Fr_in_n * _n1_n1_plus_one * (Math.pow(U1_first_part, _n1_plus_one_n1) - Math.pow(U2_second_part, _n1_plus_one_n1)) + Re2_Fr_in_n * _n2_n2_plus_one * (Math.pow(U2_part_three, _n2_plus_one_n2) - Math.pow(U2_part_four, _n2_plus_one_n2))
        speedArray.push({ y: r, W1: parseFloat(U1), W2: parseFloat(U2) })
    }
    return { speedArray }
}

export function calculateCylinderNotLinearLiquid(r1, r2, n1, n2, p1, p2, Re1, Re2, Fr, Ge) {
    let r0 = 0.5;
    // стандартные константы
    const R1 = r1 / r0;
    const R2 = r2 / r0;
    const δ2 = (r2 - r1) / r0;
    const n1_coef = 1 / n1;
    const n2_coef = 1 / n2;
    const R1_in_2 = Math.pow(R1, 2);
    const R2_in_2 = Math.pow(R2, 2);
    const R_special_in_2 = R2_in_2 + 2 * Ge * δ2 * R2;
    const Re1_Fr = Re1 / Fr;
    const Re2_Fr = Re2 / Fr;
    //разбиение формул на подформулы
    const B1 = R1_in_2 + (p2 / p1) * (-R1_in_2 + R_special_in_2);
    const A1 = Math.pow((0.5 * Re1_Fr), n1_coef);
    const B2 = R_special_in_2;
    const A2 = Math.pow((0.5 * Re2_Fr), n2_coef);

    function U1_under_integrate(R_tick) {
        return Math.pow((-R_tick + (B1 / R_tick)), n1_coef)
    }
    function U2_under_integrate(R_tick) {
        return Math.pow((-R_tick + (B2 / R_tick)), n2_coef)
    }
    const speedArray = [];
    // r2 - радиус второго слоя, r1 - радиус первого слоя
    for (let r = r0; r <= (r1 + r2); r = r + 0.1) {
        // вспомогательные константы
        const R = r / r0;
        //вычисления
        const U1 = A1 * integrate(U1_under_integrate, r0, R);
        const U2 = A2 * integrate(U2_under_integrate, R1, R) + A1 * integrate(U1_under_integrate, r0, R1);
        speedArray.push({ y: r, W1: parseFloat(U1), W2: parseFloat(U2) })
    }
    return { speedArray };
}


