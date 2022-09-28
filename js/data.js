/* exported data */

var data = {
  pokemon: [],
  view: 'cards'
};

var previousDataJSON = localStorage.getItem('favPokemon');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('favPokemon', dataJSON);
}
