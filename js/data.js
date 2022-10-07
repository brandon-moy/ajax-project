/* exported data */

var data = {
  nationalDex: [],
  favPokemon: [],
  maxStats: {
    hp: 255,
    attack: 190,
    defense: 250,
    'special-attack': 194,
    'special-defense': 250,
    speed: 200
  },
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
