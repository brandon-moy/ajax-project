/* exported data */

var data = {
  pokemon: []
};

var previousDataJSON = localStorage.getItem('pokemon');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('pokemon', dataJSON);
}
