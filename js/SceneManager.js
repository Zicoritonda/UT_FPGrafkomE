//Setup
//Loader
function loadObject(mtl,obj){
    var o = new THREE.Object3D();
    //Loader
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath('assets/');
    mtlLoader.setPath('assets/');
    mtlLoader.load(mtl, function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('assets/');
        objLoader.load(obj, function (object) {
            o.add(object);    
        });
    });
    return o;
}

//Light
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 0.75);
var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.55);
var backLight = new THREE.DirectionalLight(0xffffff, 0.75);

keyLight.position.set(-100, 100, 100);
fillLight.position.set(100, 0, 100);
backLight.position.set(100, 0, -100).normalize();

//step
var bpos = 4.1;
var tpos = 3.8;


//Game Scene
var gameCanvas = document.getElementById('game');
gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

var gameScene = new THREE.Scene();
var gameCamera = new THREE.PerspectiveCamera( 75, gameCanvas.width/gameCanvas.height, 0.1, 1000 );
gameCamera.position.y = 20;
gameCamera.position.z = 60;

var gameRenderer = new THREE.WebGLRenderer({canvas:gameCanvas, alpha: true});
gameRenderer.setSize( gameCanvas.width, gameCanvas.height );
gameRenderer.setClearColor ( 0x000000, 0 );

var gameControls = new THREE.OrbitControls(gameCamera, gameRenderer.domElement);
gameControls.enableDamping = true;
gameControls.dampingFactor = 0.1;
gameControls.enableZoom = true;
gameControls.rotateSpeed = 0.05;

gameCamera.lookAt(gameScene.position);

gameScene.add(keyLight.clone());
gameScene.add(fillLight.clone());
gameScene.add(backLight.clone());

//Player Scene
var playerCanvas = document.getElementById('player');
playerCanvas.width = window.innerWidth*0.3;
playerCanvas.height = window.innerHeight*0.5;

var playerScene = new THREE.Scene();
var playerCamera = new THREE.PerspectiveCamera( 75, playerCanvas.width /playerCanvas.height , 0.1, 1000 );
playerCamera.position.y = 3;
playerCamera.position.z = 6;

var playerRenderer = new THREE.WebGLRenderer({canvas:playerCanvas, alpha: true});
playerRenderer.setSize( playerCanvas.width, playerCanvas.height );
playerRenderer.setClearColor ( 0x000000 ,0);

playerScene.add(keyLight.clone());
playerScene.add(fillLight.clone());
playerScene.add(backLight.clone());

//Dice Scene
var diceCanvas = document.getElementById('dice');
diceCanvas.width = window.innerWidth*0.3;
diceCanvas.height = window.innerHeight*0.5;

var diceScene = new THREE.Scene();
var diceCamera = new THREE.PerspectiveCamera( 75, diceCanvas.width /diceCanvas.height , 0.1, 1000 );
diceCamera.position.y = 7;
diceCamera.position.z = 5;

var diceRenderer = new THREE.WebGLRenderer({canvas:diceCanvas, alpha: true});
diceRenderer.setSize( diceCanvas.width, diceCanvas.height );
diceRenderer.setClearColor ( 0x000000, 0);

diceCamera.lookAt(diceScene.position);
 
diceScene.add(keyLight);
diceScene.add(fillLight);
diceScene.add(backLight);