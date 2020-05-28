function plugIn(x, equation) {
  return equation(x);
}

function trapezoid(length, h1, h2) {
  return ((h1 + h2) / 2) * length;
}

export function integrate(equation, a, b, stepsize) {
  stepsize = stepsize || 0.2
  var area = 0;
  for (var i = a * 1.0; i < b; i += stepsize) {
    var h1 = plugIn(i, equation);
    var h2 = plugIn(i + stepsize, equation);
    area = area + trapezoid(stepsize, h1, h2);
  }
  return area;
}