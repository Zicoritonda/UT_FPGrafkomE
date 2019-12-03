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

gameCamera.position.y = 20;
gameCamera.position.z = 80;

var gameControls = new THREE.OrbitControls(gameCamera, gameRenderer.domElement);
gameControls.enableDamping = true;
gameControls.dampingFactor = 0.1;
gameControls.enableZoom = true;
gameControls.rotateSpeed = 0.05;

var gameKeyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
gameKeyLight.position.set(-100, 100, 100);
 
var gameFillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
gameFillLight.position.set(100, 0, 100);
 
var gameBackLight = new THREE.DirectionalLight(0xffffff, 1.0);
gameBackLight.position.set(100, 0, -100).normalize();
 
gameScene.add(gameKeyLight);
gameScene.add(gameFillLight);
gameScene.add(gameBackLight);

var map = [[1,1,1,1,1,1,1,1],
           [1,2,1,1,2,1,1,4],
           [4,1,4,1,1,1,1,1],
           [1,4,1,0,2,1,1,1],
           [1,1,1,3,2,1,4,1],
           [4,1,3,1,1,4,1,4],
           [1,3,1,2,1,1,2,1],
           [3,1,1,1,1,1,1,1]];

var mapobj = new THREE.Object3D();//create an empty container
var bpos = 4.1;
var tpos = 3.8;
// var cpos = 5;

var t;
for(let i = 0; i<8; i++){
    for(let j = 0;j<8;j++){
        if(map[j][i]==1){ // blok biasa
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setTexturePath('assets/');
            mtlLoader.setPath('assets/');
            mtlLoader.load('block3.mtl', function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('assets/');
                objLoader.load('block3.obj', function (object) {
                    if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
                    else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
                    else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
                    else t = 0;
                    object.position.set((i-4)*bpos, t*tpos, (j-4)*bpos);
                    mapobj.add(object);    
                });
            });
        }
        else if(map[j][i]==2){//blok portal
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setTexturePath('assets/');
            mtlLoader.setPath('assets/');
            mtlLoader.load('block2.mtl', function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('assets/');
                objLoader.load('block2.obj', function (object) {
                    if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
                    else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
                    else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
                    else t = 0;
                    object.position.set((i-4)*bpos, t*tpos, (j-4)*bpos);
                    
                    if(j>=1 && j<=3) object.rotation.y = Math.PI; //hadap atas

                    mapobj.add(object);    
                });
            });
        }
        else if(map[j][i]==3){//blok miring
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setTexturePath('assets/');
            mtlLoader.setPath('assets/');
            mtlLoader.load('block4.mtl', function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('assets/');
                objLoader.load('block4.obj', function (object) {
                    if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
                    else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
                    else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
                    else t = 0;
                    object.position.set((i-4)*bpos, t*tpos, (j-4)*bpos);
                    mapobj.add(object);    
                });
            });
        }
        else if(map[j][i]==4){ //blok peti
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setTexturePath('assets/');
            mtlLoader.setPath('assets/');
            mtlLoader.load('block5.mtl', function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('assets/');
                objLoader.load('block5.obj', function (object) {
                    if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
                    else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
                    else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
                    else t = 0;
                    object.position.set((i-4)*bpos, t*tpos, (j-4)*bpos);
                    if(i<=3) object.rotation.y = Math.PI/2; //hadap atas
                    if(i>=4) object.rotation.y = 3*Math.PI/2; //hadap atas
                    mapobj.add(object);    
                });
            });
        }
        else if(map[j][i]==0){//blok finish
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setTexturePath('assets/');
            mtlLoader.setPath('assets/');
            mtlLoader.load('block6.mtl', function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('assets/');
                objLoader.load('block6.obj', function (object) {
                    if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
                    else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
                    else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
                    else t = 0;
                    object.position.set((i-4)*bpos, t*tpos, (j-4)*bpos);
                    mapobj.add(object);    
                });
            });
        }
    }
}

gameScene.add(mapobj);

var gameAnimate = function () {
	gameControls.update();
	requestAnimationFrame( gameAnimate );

	gameRenderer.render(gameScene, gameCamera);
};

gameAnimate();