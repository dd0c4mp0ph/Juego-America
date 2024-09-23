// Inicializar el mapa
var map = L.map('map').setView([20, -75], 4);

// Añadir mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Variables de juego
let score = 0;
let level = 1;
let gameData = {}; // Aquí almacenaremos datos como países, ríos, biomas

// Cargar progreso si existe
loadProgress();

// Función para iniciar el juego
document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
  // Ocultar el botón de inicio
  document.getElementById('startButton').style.display = 'none';

  // Cargar datos del juego
  loadGameData();

  // Comenzar el primer desafío
  nextChallenge();
}

function loadGameData() {
  // Datos de ejemplo (deberías reemplazar con datos completos)
  gameData.countries = [
    {
      name: 'Argentina',
      capital: 'Buenos Aires',
      coordinates: [-38.4161, -63.6167],
      flag: 'https://restcountries.eu/data/arg.svg',
    },
    {
      name: 'México',
      capital: 'Ciudad de México',
      coordinates: [23.6345, -102.5528],
      flag: 'https://restcountries.eu/data/mex.svg',
    },
    // Agrega más países
  ];

  gameData.rivers = [
    {
      name: 'Amazonas',
      coordinates: [-3.4653, -62.2159],
    },
    // Agrega más ríos
  ];

  gameData.biomes = [
    {
      name: 'Selva Amazónica',
      description: 'Bosque tropical húmedo más grande del mundo.',
      coordinates: [-3.4653, -62.2159],
    },
    // Agrega más biomas
  ];
}

function nextChallenge() {
  // Lógica para seleccionar el tipo de desafío
  let challengeType = getRandomChallengeType();
  switch (challengeType) {
    case 'country':
      challengeCountry();
      break;
    case 'river':
      challengeRiver();
      break;
    case 'biome':
      challengeBiome();
      break;
  }
}

function getRandomChallengeType() {
  let types = ['country', 'river', 'biome'];
  return types[Math.floor(Math.random() * types.length)];
}

function challengeCountry() {
  let country =
    gameData.countries[
      Math.floor(Math.random() * gameData.countries.length)
    ];
  alert('Encuentra el país: ' + country.name);

  // Escuchar clic en el mapa
  map.on('click', function (e) {
    checkAnswer(e.latlng, country.coordinates, 'country');
  });
}

function challengeRiver() {
  let river =
    gameData.rivers[Math.floor(Math.random() * gameData.rivers.length)];
  alert('Encuentra el río: ' + river.name);

  map.on('click', function (e) {
    checkAnswer(e.latlng, river.coordinates, 'river');
  });
}

function challengeBiome() {
  let biome =
    gameData.biomes[Math.floor(Math.random() * gameData.biomes.length)];
  alert('Encuentra el bioma: ' + biome.name);

  map.on('click', function (e) {
    checkAnswer(e.latlng, biome.coordinates, 'biome');
  });
}

function checkAnswer(clickedLocation, targetCoordinates, type) {
  // Comparar la ubicación clickeada con la ubicación objetivo
  let distance = map.distance(clickedLocation, targetCoordinates);

  if (distance < 500000) {
    alert('¡Correcto!');
    score += 10;
    updateScore();
    saveProgress();
    map.off('click');
    nextChallenge();
  } else {
    alert('Incorrecto, intenta de nuevo.');
  }
}

function updateScore() {
  document.getElementById('score').innerText = score;
}

function saveProgress() {
  localStorage.setItem('gameScore', score);
  localStorage.setItem('gameLevel', level);
}

function loadProgress() {
  if (localStorage.getItem('gameScore')) {
    score = parseInt(localStorage.getItem('gameScore'));
    level = parseInt(localStorage.getItem('gameLevel'));
    updateScore();
  }
}
