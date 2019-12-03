//Setup
//Light
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
var backLight = new THREE.DirectionalLight(0xffffff, 1.0);

keyLight.position.set(-100, 100, 100);
fillLight.position.set(100, 0, 100);
backLight.position.set(100, 0, -100).normalize();

//Game Scene
var gameCanvas = document.getElementById('game');
gameCanvas.width = window.innerWidth*0.7;
gameCanvas.height = window.innerHeight;

var gameScene = new THREE.Scene();
var gameCamera = new THREE.PerspectiveCamera( 75, gameCanvas.width/gameCanvas.height, 0.1, 1000 );
gameCamera.position.y = 20;
gameCamera.position.z = 80;

var gameRenderer = new THREE.WebGLRenderer({canvas:gameCanvas});
gameRenderer.setSize( gameCanvas.width, gameCanvas.height );
gameRenderer.setClearColor ( 0xffffff );

var gameControls = new THREE.OrbitControls(gameCamera, gameRenderer.domElement);
gameControls.enableDamping = true;
gameControls.dampingFactor = 0.1;
gameControls.enableZoom = true;
gameControls.rotateSpeed = 0.05;

gameScene.add(keyLight);
gameScene.add(fillLight);
gameScene.add(backLight);

//Player Scene
var playerCanvas = document.getElementById('player');
playerCanvas.width = window.innerWidth*0.3;
playerCanvas.height = window.innerHeight*0.5;

var playerScene = new THREE.Scene();
var playerCamera = new THREE.PerspectiveCamera( 75, playerCanvas.width /playerCanvas.height , 0.1, 1000 );
playerCamera.position.y = 2;
playerCamera.position.z = 5;

var playerRenderer = new THREE.WebGLRenderer({canvas:playerCanvas});
playerRenderer.setSize( playerCanvas.width, playerCanvas.height );
playerRenderer.setClearColor ( 0xffffff );

var playerControls = new THREE.OrbitControls(playerCamera, playerRenderer.domElement);
playerControls.enableDamping = true;
playerControls.dampingFactor = 0.1;
playerControls.enableZoom = true;

playerScene.add(keyLight);
playerScene.add(fillLight);
playerScene.add(backLight);

//Dice Scene
var diceCanvas = document.getElementById('dice');
diceCanvas.width = window.innerWidth*0.3;
diceCanvas.height = window.innerHeight*0.5;

var diceScene = new THREE.Scene();
var diceCamera = new THREE.PerspectiveCamera( 75, diceCanvas.width /diceCanvas.height , 0.1, 1000 );
diceCamera.position.y = 7;
diceCamera.position.z = 5;

console.log(diceScene);

var diceRenderer = new THREE.WebGLRenderer({canvas:diceCanvas});
diceRenderer.setSize( diceCanvas.width, diceCanvas.height );
diceRenderer.setClearColor ( 0xffffff );

var diceControls = new THREE.OrbitControls(diceCamera, diceRenderer.domElement);
diceControls.enableDamping = true;
diceControls.dampingFactor = 0.1;
diceControls.enableZoom = true;
 
diceScene.add(keyLight);
diceScene.add(fillLight);
diceScene.add(backLight);