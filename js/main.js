/* global capitalize, displayId, calcHeight, calcWeight */

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
var $stats = document.querySelectorAll('.item-header + p');
var $detailName = document.querySelector('.detail-name');
var $detailNumber = document.querySelector('.detail-number');
var $detailImg = document.querySelector('.detail-img');
var $type1 = document.querySelector('.type-1');
var $type2 = document.querySelector('.type-2');
var $height = document.querySelector('.pokemon-height');
var $weight = document.querySelector('.pokemon-weight');
var $abilities = document.querySelector('.pokemon-abilities');

$cards.addEventListener('click', function () {
  var id = event.target.closest('.pokemon-card').id;
  detailedDisplay(id);
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

function detailedDisplay(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var pokemon = xhr.response;

    $detailName.textContent = capitalize(pokemon.name);
    $detailNumber.textContent = displayId(pokemon.id);
    $detailImg.setAttribute('src', '/images/kanto/' + id + '.png');

    if (pokemon.types.length > 1) {
      var type2 = pokemon.types[1].type.name;
      $type2.textContent = capitalize(type2);
      $type2.className = 'type-2 ' + type2;
    } else {
      $type2.className = 'type-2 hidden';
    }

    var type1 = pokemon.types[0].type.name;
    $type1.textContent = capitalize(type1);
    $type1.className = 'type-1 ' + type1;
    $detailBackground.className = 'detail-background row ' + type1;

    $height.textContent = calcHeight(pokemon.height);
    $weight.textContent = calcWeight(pokemon.weight);

    var abilities = '';

    for (var k = 0; k < pokemon.abilities.length; k++) {
      if (k === 0) {
        abilities = capitalize(pokemon.abilities[k].ability.name);
      } else {
        abilities = abilities + ', ' + capitalize(pokemon.abilities[k].ability.name);
      }
    }

    $abilities.textContent = abilities;

    for (var j = 0; j < pokemon.stats.length; j++) {
      for (var l = 0; l < $stats.length; l++) {
        if (pokemon.stats[j].stat.name === $stats[l].className) {
          $stats[l].textContent = pokemon.stats[j].base_stat;
        }
      }
    }
  });
  xhr.send();
}

// function speciesDetail(id) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + id);
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     var species = xhr.response;
//     console.log(species);
//     console.log(species.flavor_text_entries[0]);
//   });
//   xhr.send();
// }
// next step : pull flavor text, pull evolution chain, change stat bar % and color
