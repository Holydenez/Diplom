export function calculatePlateNewtonLiquid(g, δ1, δ2, p1, p2, υ1, υ2, μ1, μ2, Ge) {
    const yLength = δ1 + δ2
    υ1 = υ1 / Math.pow(10, 6)
    υ2 = υ2 / Math.pow(10, 6)
    μ1 = μ1 / Math.pow(10, 6)
    μ2 = μ2 / Math.pow(10, 6)
    //g – прискорення вільного падіння
    //p – густина рідини; 
    //υ i μ - кінематичний та динамічний коефіцієнти в’язкості;
    //Ge поток газа
    //δ ширина пленки
    //y-напруга тертя
    let speedArray = []
    let W1, W2;
    for (let y = 0; y < Number(yLength) + 1; y = y + 0.1) {
        W1 = (g / υ1) * (-(Math.pow(y, 2) / 2) + (δ1 + ((p2 * δ2 / p1) * (1 - Ge))) * y).toFixed(2)
        W2 = ((g / υ2) * (-(Math.pow(y, 2) / 2) + (δ1 + δ2 * (1 - Ge) * y + (δ1 * δ1 / 2) * ((υ2 / υ1) - 1) + δ1 * δ2 * ((μ2 / μ1) - 1) * (1 - Ge)))).toFixed(2)
        speedArray.push({ y, W1: parseFloat(0.995*W1) / Math.pow(10, 6), W2: parseFloat(0.998*W2) / Math.pow(10, 6) })
    }
    //оптімальна дія на робочу плівку
    let q = (δ1 * μ2) / (δ2 * μ1)
    let r = (1 / 2) * (υ1 / υ2) * (δ1 / δ2) * (δ1 / δ2)
    let GeOpt = Math.sqrt((2 + 6 * (q + r) + Math.sqrt(1 + 12 * q * q + 6 * (1 + 6 * r) * (q + r))) / (3 + 6 * q))
    //максимальне та середнє значення швидкості
    let υ = υ2 / υ1
    let δ = δ2 / δ1
    let p = p2 / p1
    let Wsr = (1 / 3) - (Ge / 2) + ((υ * Math.pow(δ, 2)) / 2) + (δ * υ * p * (1 - Ge));
    let Wmax = ((1 / 2) * Math.pow((1 - Ge), 2)) + ((υ * Math.pow(δ, 2)) / 2) + (δ * υ * p * (1 - Ge));
    let calculatedInfo = {
        speedArray, GeOpt, Wsr, Wmax
    }
    return calculatedInfo
}
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
export function calculateCylinderNewtoneLiquid(inner_skin, rLength, δ1, δ2, p1, p2, Re1, Re2, Fr, Ge) {
    //y - радіус, r0 - стартова точка відліку
    let r0 = 0.9999, speedArray = [], R_spec, R1, R2, R, W1, W2, W_1, lnR, lnR1, ReFr1, ReFr2, R_spec2lnRR1
    for (let y = 0; y < Number(rLength) + 1; y = y + 0.1) {
        R = y / r0
        R1 = Math.abs(inner_skin ? 1 - (δ1 / r0) : 1 + (δ1 / r0))
        R2 = Math.abs(inner_skin ? 1 - ((δ1 + δ2) / r0) : 1 + ((δ1 + δ2) / r0))
        ReFr1 = Re1 / (2 * Fr)
        ReFr2 = Re2 / (2 * Fr)
        R_spec = Math.sqrt(Math.pow(R2, 2) + 2 * Ge * R2 * (δ2 / r0))
        W_1 = (p2 / p1) * (-Math.pow(R1, 2) + Math.pow(R_spec, 2))
        lnR = Math.log(R)
        lnR1 = Math.log(R1)
        R_spec2lnRR1 = Math.pow(R_spec, 2) * Math.log(R / R1)
        W1 = ReFr1 * (((1 - Math.pow(R, 2)) / 2) + (Math.pow(R1, 2) + W_1) * lnR)
        W2 = ReFr2 * (((Math.pow(R1, 2) + Math.pow(R, 2)) / 2) + R_spec2lnRR1) + ReFr1 * (((1 - Math.pow(R, 2)) / 2) + (Math.pow(R1, 2) + W_1) * lnR1)

        speedArray.push({ y, W1: parseFloat(W1), W2: parseFloat(W2) })
    }
    let calculatedInfo = {
        speedArray
    }
    return calculatedInfo
}

export function calculateCylinderNotLinearLiquid(inner_skin, rLength, δ1, δ2, p1, p2, Re1, Re2, Fr, Ge) {
    //n=1/3
    //y - радіус, r0 - стартова точка відліку
    let r0 = 0.9999, speedArray = [], W1, W2, c_1, c_2, c_3, c_4, R, result1, result2;
    const a = (Re2 / Math.pow(Fr, 2))
    for (let y = 0; y < Number(rLength) + 1; y = y + 0.1) {
        R = y / r0
        c_2 = Ge * (δ2 / r0) * (Re2 / Math.pow(Fr, 2));
        c_1 = (p1 / p2) * (Re1 / Re2) * c_2;
        c_3 = 1 - 8 * a - (12 * c_1 - 24 * Math.pow(a, 2)) - (96 * c_1 * a - 32 * Math.pow(a, 3)) - 96 * Math.pow(c_1, 2) * a + 16 * Math.pow(c_1, 3);
        c_4 = Math.log(R) * (96 * c_1 * Math.pow(a, 2) - 48 * Math.pow(c_1, 2) - 96 * c_2 * Math.pow(a, 2) + 48 * Math.pow(c_2, 2)) + 12 * Math.pow(R, 2) * (c_1 - c_2) + 96 * R * a * (c_1 - c_2) + ((96 * a) / R) * (Math.pow(c_1, 2) - Math.pow(c_2, 2)) - (16 / Math.pow(R, 2)) * (Math.pow(c_1, 3) - Math.pow(c_2, 3))
        W1 = ((96 * c_1 * Math.pow(a, 2) - 48 * Math.pow(c_1, 2)) * Math.log(R) - Math.pow(R, 4) + 8 * a * Math.pow(R, 3) + (12 * c_1 - 24 * Math.pow(a, 3)) * Math.pow(R, 2) + (96 * c_1 * a - 32 * Math.pow(a, 3)) * R + ((96 * Math.pow(c_1, 2) * a) / R) + 16 * Math.pow(c_1, 3) / Math.pow(R, 2)) / 32 + c_3;
        W2 = ((96 * c_2 * Math.pow(a, 2) - 48 * Math.pow(c_2, 2)) * Math.log(R) - Math.pow(R, 4) + 8 * a * Math.pow(R, 3) + (12 * c_2 - 24 * Math.pow(a, 3)) * Math.pow(R, 2) + (96 * c_1 * a - 32 * Math.pow(a, 3)) * R + ((96 * Math.pow(c_2, 2) * a) / R) + 16 * Math.pow(c_2, 3) / Math.pow(R, 2)) / 32 + c_4;
        if (W1 < 0 || W1 === NaN) {
            result1 = 0;
        }
        else {
            result1 = W1 * y;
        }
        speedArray.push({ y, W1: parseFloat(result1), W2: parseFloat(Math.abs(W2)) })
    }
    let calculatedInfo = {
        speedArray
    }
    return calculatedInfo
}

