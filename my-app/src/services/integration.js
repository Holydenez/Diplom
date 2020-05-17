export function integrate (f, start, end, step) {
    let total = 0
    step = step || 0.01
    for (let x = start; x < end; x += step) {
      total += f(x + step / 2) * step
    }
    return total
  }

// use the function in JavaScript
// function f (x) {
//   return math.pow(x, 0.5)
// }
// console.log(math.integrate(f, 0, 1)) // outputs 0.6667254718034714