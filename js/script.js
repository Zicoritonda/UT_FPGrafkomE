//Initial Map Matriks
//0: Finish; 1: block1; 2:block2; 3: block3
var map = [[1,1,1,1,1,1,1,1],
           [1,2,1,1,2,1,1,4],
           [4,1,4,1,1,1,1,1],
           [1,4,1,0,2,1,1,1],
           [1,1,1,3,2,1,4,1],
           [4,1,3,1,1,4,1,4],
           [1,3,1,2,1,1,2,1],
           [3,1,1,1,1,1,1,1]];

// var portal = [[2,0],[1,1],[4,2],[0,3],[3,4],[5,4],[6,4],[3,5],[2,6]];

// console.log(map[3][3]);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// var canvas = document.getElementById('game');
// var renderer = new THREE.WebGLRenderer({canvas});
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor ( 0xefefef );
// renderer.setClearColor ( 0xffffff );
// document.body.appendChild( renderer.domElement );

//scene.add( cube );

camera.position.z = 50;

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 100, 100);
 
var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);
 
var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();
 
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

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
                    object.position.set(i*bpos, t*tpos, j*bpos);
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
                    object.position.set(i*bpos, t*tpos, j*bpos);
                    
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
                    object.position.set(i*bpos, t*tpos, j*bpos);
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
                    object.position.set(i*bpos, t*tpos, j*bpos);
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
                    object.position.set(i*bpos, t*tpos, j*bpos);
                    mapobj.add(object);    
                });
            });
        }
    }
}

scene.add(mapobj);

//objek pion
var char = new THREE.Object3D();//create an empty container
// var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('assets/');
mtlLoader.setPath('assets/');
mtlLoader.load('pion.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/');
    objLoader.load('pion.obj', function (object) {
        object.position.set(4*bpos, 1.08*tpos, 0);
        char.add(object); 
    });
});
scene.add(char);

var animate = function () {
	controls.update();
	requestAnimationFrame( animate );

	renderer.render(scene, camera);
};

animate();