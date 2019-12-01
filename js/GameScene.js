var gameCanvas = document.getElementById('game');
// gameCanvas.style.background = "red";
gameCanvas.width = window.innerWidth*0.7;
gameCanvas.height = window.innerHeight;
var gameScene = new THREE.Scene();
// var gameCamera = new THREE.PerspectiveCamera( 75, window.innerWidth * 0.7/window.innerHeight, 0.1, 1000 );
var gameCamera = new THREE.PerspectiveCamera( 75, gameCanvas.width/gameCanvas.height, 0.1, 1000 );

var gameRenderer = new THREE.WebGLRenderer({canvas:gameCanvas});
// var gameRenderer = new THREE.WebGLRenderer();
gameRenderer.setSize( gameCanvas.width, gameCanvas.height );
gameRenderer.setClearColor ( 0xffffff );
// document.body.appendChild( gameRenderer.domElement );

// console.log(canvas.width);
// console.log(canvas.height);

gameCamera.position.z = 10;

var gameControls = new THREE.OrbitControls(gameCamera, gameRenderer.domElement);
gameControls.enableDamping = true;
gameControls.dampingFactor = 0.1;
gameControls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 100, 100);
 
var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);
 
var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();
 
gameScene.add(keyLight);
gameScene.add(fillLight);
gameScene.add(backLight);

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({color: 'red'});
const mesh = new THREE.Mesh(geometry, material);

gameScene.add(mesh);

var animate = function () {
	gameControls.update();
	requestAnimationFrame( animate );

	gameRenderer.render(gameScene, gameCamera);
};

animate();