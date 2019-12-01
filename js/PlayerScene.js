var playerCanvas = document.getElementById('player');
playerCanvas.width = window.innerWidth*0.3;
playerCanvas.height = window.innerHeight*0.5;
var playerScene = new THREE.Scene();
var playerCamera = new THREE.PerspectiveCamera( 75, playerCanvas.width /playerCanvas.height , 0.1, 1000 );

var playerRenderer = new THREE.WebGLRenderer({canvas:playerCanvas});
// var diceRenderer = new THREE.WebGLRenderer();
playerRenderer.setSize( playerCanvas.width, playerCanvas.height );
playerRenderer.setClearColor ( 0xffffff );
// document.body.appendChild( diceRenderer.domElement );

// console.log(diceCanvas.width);
// console.log(diceCanvas.height);

playerCamera.position.y = 2;
playerCamera.position.z = 5;

var playerControls = new THREE.OrbitControls(playerCamera, playerRenderer.domElement);
playerControls.enableDamping = true;
playerControls.dampingFactor = 0.1;
playerControls.enableZoom = true;

var playerKeyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
playerKeyLight.position.set(-100, 100, 100);
 
var playerFillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
playerFillLight.position.set(100, 0, 100);
 
var playerBackLight = new THREE.DirectionalLight(0xffffff, 1.0);
playerBackLight.position.set(100, 0, -100).normalize();
 
playerScene.add(playerKeyLight);
playerScene.add(playerFillLight);
playerScene.add(playerBackLight);

var player = new THREE.Object3D();//create an empty container
       
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('assets/');
mtlLoader.setPath('assets/');
mtlLoader.load('pion.mtl', function (materials) {
 
    materials.preload();
 
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/');
    objLoader.load('pion.obj', function (object) {
        object.rotation.y = Math.PI/2;
 
        player.add(object);
        //object.position.y -= 60;
    });
 
});

playerScene.add(player);

// playerScene.add(mesh);

var playerAnimate = function () {
	playerControls.update();
	requestAnimationFrame( playerAnimate );

	playerRenderer.render(playerScene, playerCamera);
};

playerAnimate();