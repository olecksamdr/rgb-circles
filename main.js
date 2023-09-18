const gap = 16;
const r = Math.min(window.innerWidth / 4, window.innerHeight / 4);

let currentColorRGB = {
  r: 255,
  g: 255,
  b: 255
}

const colorPicker = document.getElementById('color-picker');

const redCircle = document.getElementById('red-circle');
const greenCircle = document.getElementById('green-circle');
const blueCircle = document.getElementById('blue-circle');

const redRangeInput = document.getElementById('red-range-input');
const greenRangeInput = document.getElementById('green-range-input');
const blueRangeInput = document.getElementById('blue-range-input');

const circles = [redCircle, greenCircle, blueCircle];

circles.forEach(circle => {
  circle.setAttribute('r', r);
  circle.setAttribute('cx', r);
  circle.setAttribute('cy', r);
});

greenCircle.setAttribute('cx', 2 * r);

blueCircle.setAttribute('cx', r + r / 2);
blueCircle.setAttribute('cy', 2 * r);


const rangeInputs = document.querySelectorAll('input[type="range"]');

function getRGB(channal, value) {
  const rgb = { r: 0, g: 0, b: 0 };

  rgb[channal] = value;

  const { r, g, b } = rgb;

  return `rgb(${[r, g, b].join(',')})`;
}

function onInput(event) {
  const { target } = event;
  const { value } = target;
  const controls = event.target.getAttribute('aria-controls');
  const circle = circles.find(({ id }) => id === controls);

  // Get first char of 'red-circle', 'green-circle', 'blue-circle'
  // So we get 'r', 'g' or 'b'
  currentColorRGB[circle.id[0]] = parseInt(value, 10);
  circle.setAttribute('fill', getRGB(circle.id[0], value));

  const { r, g, b} = currentColorRGB;
  colorPicker.value = '#' + [r, g, b].map(n => {
    const hex = n.toString(16)
    return hex.length === 1 ? hex.repeat(2) : hex;
  }).join('');
}

rangeInputs.forEach(input => input.addEventListener('input', onInput));

// Color picker
function onColorInput(event) {
  const colorInHex = event.target.value;

  const red = parseInt(colorInHex.substring(1, 3), 16);
  const green = parseInt(colorInHex.substring(3, 5), 16);
  const blue = parseInt(colorInHex.substring(5, 7), 16);

  currentColorRGB = { r: red, g: green, b: blue };

  redRangeInput.value = red;
  greenRangeInput.value = green;
  blueRangeInput.value = blue;

  redCircle.setAttribute('fill', `rgb(${red}, 0, 0)`);
  greenCircle.setAttribute('fill', `rgb(0, ${green}, 0)`);
  blueCircle.setAttribute('fill', `rgb(0, 0, ${blue})`);
}

colorPicker.addEventListener('input', onColorInput);