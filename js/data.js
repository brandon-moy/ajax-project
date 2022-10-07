/* exported data */

var data = {
  nationalDex: [],
  favPokemon: [],
  stats: [255, 190, 250, 194, 250, 200],
  view: 'kanto',
  previousView: ''
};

var previousDataJSON = localStorage.getItem('pokemon-data');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', beforeUnload);
window.addEventListener('pagehide', beforeUnload);

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('pokemon-data', dataJSON);
}
