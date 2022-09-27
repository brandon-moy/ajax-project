/* global capitalize, displayId, */

var $cardRow = document.querySelector('.cards-table');
var kanto = [];

function renderCards(id, name) {
  var $columnFifth = document.createElement('div');
  var $pokemonCard = document.createElement('div');
  var $pokeball = document.createElement('div');
  var $pokemonImg = document.createElement('img');
  var $pokemonNumber = document.createElement('h5');
  var $pokemonName = document.createElement('h4');

  $columnFifth.className = 'column-fifth';
  $pokemonCard.className = 'pokemon-card';
  $pokeball.className = 'pokeball-background row';
  $pokemonImg.className = 'pokemon-img';
  $pokemonNumber.className = 'pokemon-number';
  $pokemonName.className = 'pokemon-name';

  $pokeball.setAttribute('src', '/images/pokeball-blur-2.png');
  $pokemonImg.setAttribute('src', '/images/kanto/' + id + '.png');
  $pokemonNumber.textContent = displayId(id);
  $pokemonName.textContent = capitalize(name);
  $pokemonCard.setAttribute('id', id);

  $columnFifth.appendChild($pokemonCard);
  $pokemonCard.appendChild($pokeball);
  $pokeball.appendChild($pokemonImg);
  $pokemonCard.appendChild($pokemonNumber);
  $pokemonCard.appendChild($pokemonName);

  $cardRow.appendChild($columnFifth);
}

function generatePokemonCards() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokedex/kanto');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    kanto = xhr.response.pokemon_entries;
    for (var i = 0; i < kanto.length; i++) {
      var pokemonId = kanto[i].entry_number;
      var pokemonName = kanto[i].pokemon_species.name;
      renderCards(pokemonId, pokemonName);
    }
  });
  xhr.send();
}

window.addEventListener('load', generatePokemonCards);

// Code for opening detailed view display

var $cards = document.querySelector('.cards-view');
var $header = document.querySelector('.header-background');
var $cardView = document.querySelector('.cards-view');
var $detailBackground = document.querySelector('.detail-background');
var $detailView = document.querySelector('.detailed-view');
var $xmark = document.querySelector('.xmark');
// var $detailName = document.querySelector('.detail-name');
// var $detailNumber = document.querySelector('.detail-number');
// var $type1 = document.querySelector('.type-1');
// var $type2 = document.querySelector('.type-2');

$cards.addEventListener('click', function () {
  $header.classList.add('hidden');
  $cardView.classList.add('hidden');
  $detailBackground.classList.remove('hidden');
  $detailView.classList.remove('hidden');
  window.scrollTo(0, 0);
});

$xmark.addEventListener('click', function () {
  $header.classList.remove('hidden');
  $cardView.classList.remove('hidden');
  $detailBackground.classList.add('hidden');
  $detailView.classList.add('hidden');
  window.scrollTo(0, 0);
});

// function detailedDisplay(id) {
//   // var id = event.target.closest('.pokemon-card').id;
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + id);
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     var pokemon = xhr.response;

//     console.log(pokemon);
//     console.log(capitalize(pokemon.name));
//     console.log(displayId(pokemon.id));

//     for (var i = 0; i < pokemon.types.length; i++) {
//       console.log(capitalize(pokemon.types[i].type.name));
//     }

//     console.log(calcHeight(pokemon.height));
//     console.log(calcWeight(pokemon.weight));

//     for (var k = 0; k < pokemon.abilities.length; k++) {
//       console.log(capitalize(pokemon.abilities[k].ability.name));
//     }

//     for (var j = 0; j < pokemon.stats.length; j++) {
//       console.log(pokemon.stats[j].base_stat);
//       console.log(statsDisplay(pokemon.stats[j].stat.name));
//     }
//   });
//   xhr.send();
// }
