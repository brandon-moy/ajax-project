/* exported capitalize, displayId, calcWeight, calcHeight, statsDisplay */

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

function calcHeight(number) {
  var height = number / 3.048;
  var feet = Math.floor(height);
  var inches = Math.ceil((height % 1) * 12);
  var displayHeight = feet + "'" + inches + '"';
  return displayHeight;
}

function calcWeight(number) {
  var weight = number / 4.536;
  var displayWeight = Math.round(weight * 10) / 10 + ' lbs';
  return displayWeight;
}
