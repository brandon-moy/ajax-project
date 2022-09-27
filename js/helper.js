/* exported capitalize, displayId, calcWeight */

function capitalize(string) {
  var capitalized = '';
  capitalized = string[0].toUpperCase();
  capitalized += string.substring(1);
  return capitalized;
}

function displayId(number) {
  var display = number;
  if (number < 10) {
    display = '00' + number;
  } else if (number < 100) {
    display = '0' + number;
  }
  return display;
}

// bulbasaur height: 7 should be displayed as 2'4"
// bulbasaur weight: 69 should be displayed as 15.2lb

// function calcHeight(number) {

// }

function calcWeight(number) {
  var weight = number / 4.536;
  var displayWeight = Math.round(weight * 10) / 10 + ' lbs';
  return displayWeight;
}
