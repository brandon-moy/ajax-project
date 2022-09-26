/* exported capitalize, displayId */

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
