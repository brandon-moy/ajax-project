/* exported capitalize, displayId, calcWeight, calcHeight, statsDisplay, flavorText,
resetPlaceholder, removeFavCard */

/* global $favCardsRow */

function capitalize(string) {
  var capitalized = '';
  if (string.includes('-')) {
    var split = string.split('-');
    var first = split[0].charAt(0).toUpperCase() + split[0].substring(1);
    var second = split[1].charAt(0).toUpperCase() + split[1].substring(1);
    capitalized = first + ' ' + second;
  } else {
    capitalized = string[0].toUpperCase();
    capitalized += string.substring(1);
  }
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

function flavorText(string) {
  var output = '';
  output = string.replaceAll('\n', ' ');
  output = output.replaceAll('\f', ' ');
  output = output.replaceAll('POKéMON', 'Pokémon');
  return output;
}

function resetPlaceholder(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (i % 2) {
      arr[i].setAttribute('src', '/images/placeholderright.png');
    } else {
      arr[i].setAttribute('src', '/images/placeholderleft.png');
    }
  }
}

function removeFavCard(position) {
  var $favCardBlock = $favCardsRow.querySelectorAll('.column-fifth');
  $favCardsRow.removeChild($favCardBlock[position]);
}
