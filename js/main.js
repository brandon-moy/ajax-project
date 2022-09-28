/* global capitalize, displayId, calcHeight, calcWeight, flavorText, resetPlaceholder */

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

var $cards = document.querySelector('.cards-table');
var $header = document.querySelector('.header-background');
var $cardView = document.querySelector('.cards-view');
var $detailBackground = document.querySelector('.detail-background');
var $detailView = document.querySelector('.detailed-view');
var $xmark = document.querySelector('.xmark');
var $stats = document.querySelectorAll('.item-header + p');
var $statsDisplay = document.querySelectorAll('.stats-display');
var $detailName = document.querySelector('.detail-name');
var $detailNumber = document.querySelector('.detail-number');
var $detailImg = document.querySelector('.detail-img');
var $type1 = document.querySelector('.type-1');
var $type2 = document.querySelector('.type-2');
var $height = document.querySelector('.pokemon-height');
var $weight = document.querySelector('.pokemon-weight');
var $abilities = document.querySelector('.pokemon-abilities');
var $flavorText = document.querySelector('.flavor-text');
var $evoDiv = document.querySelectorAll('.evo-div');
var $evoImg = document.querySelectorAll('.evolution-image');
var $evoName = document.querySelectorAll('.evolution-name');
var maxStats = [250, 134, 180, 154, 154, 140];

$cards.addEventListener('click', function () {
  if (event.target.className === 'column-fifth') {
    return;
  }
  var id = event.target.closest('.pokemon-card').id;
  detailedDisplay(id);
  speciesDetail(id);
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
  for (var n = 0; n < $statsDisplay.length; n++) {
    $statsDisplay[n].className = 'stats-display';
  }
  for (var r = 0; r < $evoDiv.length; r++) {
    $evoDiv[r].classList.add('hidden');
  }
  resetPlaceholder($evoImg);
});

function detailedDisplay(id) {
  $detailImg.setAttribute('src', '/images/kanto/' + id + '.png');

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var pokemon = xhr.response;

    $detailName.textContent = capitalize(pokemon.name);
    $detailNumber.textContent = displayId(pokemon.id);

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
          var statCalc = Math.floor((pokemon.stats[j].base_stat / maxStats[j]) * 100);
          $statsDisplay[j].classList.add(type1);
          $statsDisplay[j].style.width = statCalc + '%';
        }
      }
    }
  });
  xhr.send();
}

function speciesDetail(id) {
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + id);
  xhr2.responseType = 'json';
  xhr2.addEventListener('load', function () {
    var species = xhr2.response;
    var entries = species.flavor_text_entries;
    var flavor = '';
    for (var m = 0; m < entries.length; m++) {
      if (entries[m].language.name === 'en') {
        flavor = flavorText(entries[m].flavor_text);
        break;
      }
    }
    $flavorText.textContent = flavor;

    getEvolutions(species.evolution_chain.url);
  });
  xhr2.send();
}

function getEvolutions(url) {
  var xhr3 = new XMLHttpRequest();
  xhr3.open('GET', url);
  xhr3.responseType = 'json';
  xhr3.addEventListener('load', function () {
    var currentPokemon = xhr3.response.chain;
    var allEvolutions = listEvolutions(currentPokemon.evolves_to);
    allEvolutions.unshift(currentPokemon.species.name);
    renderEvolutionImg(allEvolutions);
  });
  xhr3.send();
}

function listEvolutions(arr) {
  var output = [];
  for (var i = 0; i < arr.length; i++) {
    output.push(arr[i].species.name);
    if (arr[i].evolves_to.length > 0) {
      output = output.concat(listEvolutions(arr[i].evolves_to));
    }
  }
  return output;
}

function renderEvolutionImg(arr) {
  for (var p = 0; p < arr.length; p++) {
    for (var q = 0; q < kanto.length; q++) {
      if (arr[p] === kanto[q].pokemon_species.name) {
        var id = kanto[q].entry_number;
        $evoImg[p].setAttribute('src', '/images/kanto/' + id + '.png');
        $evoName[p].textContent = capitalize(arr[p]);
      }
    }
    $evoDiv[p].classList.remove('hidden');
    $evoName[p].textContent = capitalize(arr[p]);
  }
}

// fav a pokemon

var $heart = document.querySelector('.heart');

$heart.addEventListener('click', function () {
  if ($heart.classList.includes('fav')) {
    $heart.classList.add('fav');
  } else {
    $heart.classList.remove('fav');
  }
});
