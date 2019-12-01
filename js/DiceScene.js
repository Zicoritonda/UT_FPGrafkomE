var diceCanvas = document.getElementById('dice');
diceCanvas.width = window.innerWidth*0.3;
diceCanvas.height = window.innerHeight*0.5;
var diceScene = new THREE.Scene();
var diceCamera = new THREE.PerspectiveCamera( 75, diceCanvas.width /diceCanvas.height , 0.1, 1000 );

var diceRenderer = new THREE.WebGLRenderer({canvas:diceCanvas});
// var diceRenderer = new THREE.WebGLRenderer();
diceRenderer.setSize( diceCanvas.width, diceCanvas.height );
diceRenderer.setClearColor ( 0xffffff );
// document.body.appendChild( diceRenderer.domElement );

// console.log(diceCanvas.width);
// console.log(diceCanvas.height);

diceCamera.position.z = 35;

var diceControls = new THREE.OrbitControls(diceCamera, diceRenderer.domElement);
diceControls.enableDamping = true;
diceControls.dampingFactor = 0.1;
diceControls.enableZoom = true;

var diceKeyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
diceKeyLight.position.set(-100, 100, 100);
 
var diceFillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
diceFillLight.position.set(100, 0, 100);
 
var diceBackLight = new THREE.DirectionalLight(0xffffff, 1.0);
diceBackLight.position.set(100, 0, -100).normalize();
 
diceScene.add(diceKeyLight);
diceScene.add(diceFillLight);
diceScene.add(diceBackLight);

var dice = new THREE.Object3D();//create an empty container
       
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('assets/');
mtlLoader.setPath('assets/');
mtlLoader.load('dice.mtl', function (materials) {
 
    materials.preload();
 
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/');
    objLoader.load('dice.obj', function (object) {
        object.rotation.y = Math.PI/2;
 
        dice.add(object);
        //object.position.y -= 60;
    });
 
});

diceScene.add(dice);

// diceScene.add(mesh);

var diceAnimate = function () {
	diceControls.update();
	requestAnimationFrame( diceAnimate );

	diceRenderer.render(diceScene, diceCamera);
};

diceAnimate();