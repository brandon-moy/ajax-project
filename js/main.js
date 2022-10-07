/* global capitalize, displayId, calcHeight, calcWeight, flavorText, resetPlaceholder,
removeFavCard, addFavCard, checkView, httpReq */

/* exported $loading, $error */

var $kantoCards = document.querySelector('.kanto-cards > .cards-table');
var $johtoCards = document.querySelector('.johto-cards > .cards-table');
var $hoennCards = document.querySelector('.hoenn-cards > .cards-table');
var $sinnohCards = document.querySelector('.sinnoh-cards > .cards-table');
var $unovaCards = document.querySelector('.unova-cards > .cards-table');
var $kalosCards = document.querySelector('.kalos-cards > .cards-table');
var $alolaCards = document.querySelector('.alola-cards > .cards-table');
var $galarCards = document.querySelector('.galar-cards > .cards-table');
var $loading = document.querySelector('.loading-modal');
var $error = document.querySelector('.error-modal');
var pokeGenBoundaries = {
  kanto: { start: 0, end: 151 },
  johto: { start: 151, end: 251 },
  hoenn: { start: 251, end: 386 },
  sinnoh: { start: 386, end: 494 },
  unova: { start: 494, end: 649 },
  kalos: { start: 649, end: 721 },
  alola: { start: 721, end: 807 },
  galar: { start: 809, end: 898 }
};

window.addEventListener('DOMContentLoaded', function () {
  displayView();
  generatePokemonCards();
});

function renderCards(object) {
  var $columnFifth = document.createElement('div');
  var $pokemonCard = document.createElement('div');
  var $pokeball = document.createElement('div');
  var $pokemonImg = document.createElement('img');
  var $pokemonNumber = document.createElement('h5');
  var $pokemonName = document.createElement('h4');
  var id = object.entry_number;
  var name = object.pokemon_species.name;

  $columnFifth.className = 'column-fifth';
  $pokemonCard.className = 'pokemon-card';
  $pokeball.className = 'pokeball-background row';
  $pokemonImg.className = 'pokemon-img';
  $pokemonNumber.className = 'pokemon-number';
  $pokemonName.className = 'pokemon-name';

  $pokeball.setAttribute('src', 'images/pokeball-blur.webp');
  $pokemonImg.setAttribute('src', 'images/art/' + id + '.png');
  $pokemonNumber.textContent = displayId(id);
  $pokemonName.textContent = capitalize(name);
  $pokemonCard.setAttribute('id', id);

  $columnFifth.appendChild($pokemonCard);
  $pokemonCard.appendChild($pokeball);
  $pokeball.appendChild($pokemonImg);
  $pokemonCard.appendChild($pokemonNumber);
  $pokemonCard.appendChild($pokemonName);

  return $columnFifth;
}

function generatePokemonCards() {
  httpReq('https://pokeapi.co/api/v2/pokedex/1', appendCards);
}

function appendCards(response) {
  data.nationalDex = response.pokemon_entries;
  for (var key in pokeGenBoundaries) {
    var placement = document.querySelector('#' + key);
    for (var i = pokeGenBoundaries[key].start; i < pokeGenBoundaries[key].end; i++) {
      placement.appendChild(renderCards(data.nationalDex[i]));
    }
  }
  for (var j = 0; j < data.favPokemon.length; j++) {
    $favCardsRow.appendChild(renderCards(data.favPokemon[j]));
  }
}

var $header = document.querySelector('.header');
var $cardView = document.querySelector('.card-container');
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
var maxStats = [255, 190, 250, 194, 250, 200];

$kantoCards.addEventListener('click', displayDetails);
$johtoCards.addEventListener('click', displayDetails);
$hoennCards.addEventListener('click', displayDetails);
$sinnohCards.addEventListener('click', displayDetails);
$unovaCards.addEventListener('click', displayDetails);
$kalosCards.addEventListener('click', displayDetails);
$alolaCards.addEventListener('click', displayDetails);
$galarCards.addEventListener('click', displayDetails);

function displayDetails() {
  if (event.target.closest('.pokemon-card') === null) return;
  $searchHeader.classList.add('hidden');
  var id = event.target.closest('.pokemon-card').id;
  httpReq('https://pokeapi.co/api/v2/pokemon/' + id, detailedInfo);
  httpReq('https://pokeapi.co/api/v2/pokemon-species/' + id, speciesDetail);
  $header.classList.add('hidden');
  $cardView.classList.add('hidden');
  $favView.classList.add('hidden');
  $detailBackground.classList.remove('hidden');
  $detailView.classList.remove('hidden');
  window.scrollTo(0, 0);
}

function detailedInfo(response) {
  $detailImg.setAttribute('src', 'images/art/' + response.id + '.png');
  $detailName.textContent = capitalize(response.name);
  $detailNumber.textContent = displayId(response.id);

  for (var i = 0; i < data.favPokemon.length; i++) {
    if (response.id === data.favPokemon[i].entry_number) {
      if (data.favPokemon[i].favourite === true) {
        $heart.className = 'fa-solid fa-heart heart fav';
      }
    }
  }

  if (response.types.length > 1) {
    var type2 = response.types[1].type.name;
    $type2.textContent = capitalize(type2);
    $type2.className = 'type-2 ' + type2;
  } else {
    $type2.className = 'type-2 hidden';
  }

  var type1 = response.types[0].type.name;
  $type1.textContent = capitalize(type1);
  $type1.className = 'type-1 ' + type1;
  $detailBackground.className = 'detail-background row ' + type1;

  $height.textContent = calcHeight(response.height);
  $weight.textContent = calcWeight(response.weight);
  var abilities = '';

  for (var k = 0; k < response.abilities.length; k++) {
    if (k === 0) {
      abilities = capitalize(response.abilities[k].ability.name);
    } else {
      abilities = abilities + ', ' + capitalize(response.abilities[k].ability.name);
    }
  }

  $abilities.textContent = abilities;

  for (var j = 0; j < response.stats.length; j++) {
    for (var l = 0; l < $stats.length; l++) {
      if (response.stats[j].stat.name === $stats[l].className) {
        $stats[l].textContent = response.stats[j].base_stat;
        var statCalc = Math.floor((response.stats[j].base_stat / maxStats[j]) * 100);
        $statsDisplay[j].classList.add(type1);
        $statsDisplay[j].style.width = statCalc + '%';
      }
    }
  }
}

function speciesDetail(response) {
  var entries = response.flavor_text_entries;
  var flavor = '';
  for (var m = 0; m < entries.length; m++) {
    if (entries[m].language.name === 'en') {
      flavor = flavorText(entries[m].flavor_text);
      break;
    }
  }
  $flavorText.textContent = flavor;

  httpReq(response.evolution_chain.url, getEvolutions);
}

function getEvolutions(response) {
  var currentPokemon = response.chain;
  var allEvolutions = listEvolutions(currentPokemon.evolves_to);
  allEvolutions.unshift(currentPokemon.species.name);
  renderEvolutionImg(allEvolutions);
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
    for (var q = 0; q < data.nationalDex.length; q++) {
      if (arr[p] === data.nationalDex[q].pokemon_species.name) {
        var id = data.nationalDex[q].entry_number;
        $evoImg[p].setAttribute('src', 'images/art/' + id + '.png');
        $evoName[p].textContent = capitalize(arr[p]);
      }
    }
    $evoDiv[p].classList.remove('hidden');
    $evoName[p].textContent = capitalize(arr[p]);
  }
}

var $heart = document.querySelector('.heart');
var $displayFav = document.querySelector('.display-fav');
var $favView = document.querySelector('.fav-view');
var $favCardsRow = document.querySelector('.fav-cards-table');
var $view = document.querySelectorAll('.view');

$heart.addEventListener('click', favourite);

function favourite(event) {
  var id = Number($detailNumber.textContent);

  if (event.target.className === 'fa-solid fa-heart heart') {
    event.target.className = 'fa-solid fa-heart heart fav';
    for (var i = 0; i < data.nationalDex.length; i++) {
      if (id === data.nationalDex[i].entry_number) {
        var fav = {
          entry_number: data.nationalDex[i].entry_number,
          pokemon_species: data.nationalDex[i].pokemon_species,
          favourite: true
        };
        data.favPokemon.push(fav);
        data.favPokemon.sort((a, b) => (Number(a.entry_number > Number(b.entry_number)) ? 1 : -1));
        var card = renderCards(fav);
        var position = 0;
        for (var k = 0; k < data.favPokemon.length; k++) {
          if (fav === data.favPokemon[k]) {
            position = k;
          }
        }
        addFavCard(card, position);
      }
    }
  } else {
    event.target.className = 'fa-solid fa-heart heart';
    for (var j = 0; j < data.favPokemon.length; j++) {
      if (id === data.favPokemon[j].entry_number) {
        data.favPokemon.splice(j, 1);
        removeFavCard(j);
      }
    }
  }
}

var $regionLinks = document.querySelector('.region-links');
var $regionNames = document.querySelectorAll('.region-name');
var $titleLink = document.querySelector('.title-link');
$displayFav.addEventListener('click', displayFavs);
$favCardsRow.addEventListener('click', displayDetails);
$titleLink.addEventListener('click', function () {
  if (data.view !== 'favourites') return;
  data.view = data.previousView;
  displayView();
  $regionLinks.classList.remove('hidden');
});

$regionLinks.addEventListener('click', function () {
  if (event.target.tagName === 'A') {
    for (var i = 0; i < $regionNames.length; i++) {
      $regionNames[i].className = 'region-name';
      if (event.target === $regionNames[i]) {
        $regionNames[i].classList.add('selected');
      }
    }
    data.view = event.target.getAttribute('data-view');
    displayView();
  }
});

function displayFavs() {
  if (data.view !== 'favourites') {
    for (var i = 0; i < $regionNames.length; i++) {
      $regionNames[i].className = 'region-name';
    }
    $regionLinks.classList.add('hidden');
    $displayFav.className = 'fa-solid fa-heart display-fav';
    data.previousView = data.view;
    data.view = 'favourites';
    displayView();
  } else {
    $regionLinks.classList.remove('hidden');
    $displayFav.className = 'fa-regular fa-heart display-fav';
    data.view = data.previousView;
    for (var j = 0; j < $regionNames.length; j++) {
      if ($regionNames[j].getAttribute('data-view') === data.view) {
        $regionNames[j].classList.add('selected');
      }
    }
    displayView();
  }
}

function displayView() {
  $searchBar.value = '';
  $searchHeader.classList.add('hidden');
  for (var i = 0; i < $view.length; i++) {
    var view = $view[i].getAttribute('data-view');
    if (view === data.view) {
      $view[i].classList.remove('hidden');
    } else {
      $view[i].classList.add('hidden');
    }
  }
  for (var j = 0; j < $regionNames.length; j++) {
    $regionNames[j].className = 'region-name';
    if (data.view === $regionNames[j].getAttribute('data-view')) {
      $regionNames[j].classList.add('selected');
    }
  }
  resetCards();
}

var $searchBar = document.querySelector('.search-bar');

var $searchHeader = document.querySelector('.search-header');
$searchBar.addEventListener('input', searchCards);
$searchBar.addEventListener('change', resetCards);

function resetCards(event) {
  if ($searchBar.value === '') {
    var view = checkView();
    var $searchArea = view.querySelectorAll('.column-fifth');
    for (var i = 0; i < $searchArea.length; i++) {
      $searchArea[i].classList.remove('hidden');
    }
  }
}

function searchCards(event) {
  var search = event.target.value.toLowerCase();
  var view = checkView();
  var $resultText = document.querySelector('.search-info');
  $resultText.textContent = event.target.value;
  if ($searchBar.value !== '') {
    $searchHeader.classList.remove('hidden');
  } else {
    $searchHeader.classList.add('hidden');
  }
  var $searchArea = view.querySelectorAll('.column-fifth');
  for (var i = 0; i < $searchArea.length; i++) {
    var $name = $searchArea[i].querySelector('h4').textContent.toLowerCase();
    var $number = $searchArea[i].querySelector('h5').textContent;
    if ($name.includes(search) || $number.includes(search)) {
      $searchArea[i].classList.remove('hidden');
    } else {
      $searchArea[i].classList.add('hidden');
    }
  }
  var count = [];
  for (var j = 0; j < $searchArea.length; j++) {
    if (!$searchArea[j].classList.contains('hidden')) {
      count.push($searchArea[j]);
    }
  }
  var $searchTitle = document.querySelector('.search-title');
  var $noResultTitle = document.querySelector('.no-results-title');
  if (count.length === 0) {
    $searchTitle.classList.add('hidden');
    $noResultTitle.classList.remove('hidden');
  } else {
    $searchTitle.classList.remove('hidden');
    $noResultTitle.classList.add('hidden');
  }
}

$xmark.addEventListener('click', function () {
  $searchBar.value = '';
  $header.classList.remove('hidden');
  $cardView.classList.remove('hidden');
  $detailBackground.classList.add('hidden');
  $detailView.classList.add('hidden');
  displayView();
  for (var r = 0; r < $evoDiv.length; r++) {
    $evoDiv[r].classList.add('hidden');
  }
  for (var n = 0; n < $statsDisplay.length; n++) {
    $statsDisplay[n].className = 'stats-display';
  }
  resetPlaceholder($evoImg);
  $heart.className = 'fa-solid fa-heart heart';
});
