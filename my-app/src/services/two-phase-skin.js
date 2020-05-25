import { integrate } from "./integration"

export function calculatePlateNotLinearLiquid(δ1, δ2, p1, p2, Re1, Re2, Fr, n2, n1, Ge) {
    const yLength = δ1 + δ2
    let W1, W2, W_1, W_2, W_3, W_4, W_5, ReFr1, ReFr2;
    ReFr1 = Math.pow((Re1 / Fr), (1 / n1))
    ReFr2 = Math.pow((Re2 / Fr), (1 / n2))
    let speedArray = []
    for (let y = 0; y < Number(yLength) + 1; y = y + 0.1) {
        W_1 = Math.pow((1 + (p2 * δ2 / δ1 * p1) * (1 + Ge)), ((n1 + 1) / n1))
        W_2 = Math.pow((1 + (p2 * δ2 / δ1 * p1) * (1 + Ge) - y), ((n1 + 1) / n1))
        W_3 = Math.pow(((p2 * δ2 / δ1 * p1) * (1 + Ge)), ((n1 + 1) / n1))
        W_4 = Math.pow(((δ2 / δ1) * (1 + Ge)), ((n2 + 1) / n2))
        W_5 = Math.pow((1 + ((δ2 / δ1) * (1 + Ge) - y)), ((n2 + 1) / n2))
        W1 = ReFr1 * (n1 / (n1 + 1)) * (W_1 - W_2)
        W2 = ReFr1 * (n1 / (n1 + 1)) * (W_1 - W_3) + ReFr2 * (n2 / (n2 + 1)) * (W_4 - W_5)
        speedArray.push({ y, W1: parseFloat(W1) / Math.pow(10, 6), W2: parseFloat(W2) / Math.pow(10, 6) })
    }
    let calculatedInfo = {
        speedArray
    }
    return calculatedInfo
}

export function calculateCylinderNotLinearLiquid(r1, r2, n1, n2, p1, p2, Re1, Re2, Fr, Ge) {
    let r0 = 0.01;
    const speedArray = [];
    // r2 - радиус второго слоя, r1 - радиус первого слоя
    for (let r = r0; r < (r1 + r2); r = r + 0.1) {
        // стандартные константы
        const R = r / r0;
        const R1 = r1 / r0;
        const R2 = r2 / r0;
        const δ2 = (r2 - r1) / r0
        // вспомогательные константы
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
        const U1 = A1 * integrate(U1_under_integrate, 1, R);
        const U2 = A2 * integrate(U2_under_integrate, R1, R) + U1;
        speedArray.push({ y: r, W1: parseFloat(U1), W2: parseFloat(U2) })
    }
    return { speedArray };
}


