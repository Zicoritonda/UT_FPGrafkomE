var diceCanvas = document.getElementById('dice');
diceCanvas.width = window.innerWidth*0.3;
diceCanvas.height = window.innerHeight*0.5;
var diceScene = new THREE.Scene();
var diceCamera = new THREE.PerspectiveCamera( 75, diceCanvas.width/diceCanvas.height, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({diceCanvas});
// var renderer = new THREE.WebGLRenderer();
renderer.setSize( diceCanvas.width, diceCanvas.height );
renderer.setClearColor ( 0xefefef );

console.log(diceCanvas.width);
console.log(diceCanvas.height);

diceCamera.position.z = 5;

var controls = new THREE.OrbitControls(diceCamera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 100, 100);
 
var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);
 
var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();
 
diceScene.add(keyLight);
diceScene.add(fillLight);
diceScene.add(backLight);

// const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
// const material = new THREE.MeshPhongMaterial({color: 'red'});
// mesh = new THREE.Mesh(geometry, material);

diceScene.add(mesh);

var animate = function () {
	controls.update();
	requestAnimationFrame( animate );

	renderer.render(diceScene, diceCamera);
};

animate();