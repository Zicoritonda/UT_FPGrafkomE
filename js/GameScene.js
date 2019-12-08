
var map = [[1,1,1,1,1,1,1,1],
           [1,2,1,1,2,1,1,1],
           [1,1,1,1,1,1,1,1],
           [1,1,1,0,2,1,1,1],
           [1,1,1,3,2,1,1,1],
           [1,1,3,1,1,1,1,1],
           [1,3,1,2,1,1,2,1],
           [1,1,1,1,1,1,1,1]];

var portal = [[1,2,1,1,2,1,1,1],
             [1,1,1,1,1,1,1,1],
             [1,1,1,1,2,1,1,1],
             [1,1,1,0,1,1,1,1],
             [1,1,1,3,1,1,1,1],
             [1,1,3,1,2,1,1,1],
             [1,3,1,1,1,1,1,1],
             [1,1,1,2,1,1,2,1]];

//untuk atribute player
var lportal = [[0,1,1,-1,0],[0,4,1,-1,0],[2,4,3,-1,0],[5,4,3,1,0],[7,3,1,1,0],[7,6,1,1,0]];

var mapobj = new THREE.Object3D();//create an empty container
var t;

var geometry = new THREE.BoxGeometry( 50, 0.1, 50 );
var material = new THREE.MeshBasicMaterial( {color: 0x228B22} );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(13,0,13);
gameScene.add( cube );

var geometry = new THREE.BoxGeometry( 4, 8, 0.1 );
var material = new THREE.MeshBasicMaterial( {color: 0x8B4513, opacity: 0.5, transparent: true, alphaTest: 0.5} );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(0,4,26.5);
gameScene.add( cube );

var t;

for(let i = 0; i<8; i++){
    for(let j = 0;j<8;j++){
        if(map[j][i]==1){ // blok biasa
            var obj = loadObject('block3.mtl','block3.obj');
            if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
            else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
            else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
            else t = 0;
            obj.position.set(i*bpos, t*tpos, j*bpos);
            mapobj.add(obj);
        }
        else if(map[j][i]==2){//blok portal
            var obj = loadObject('block2.mtl','block2.obj');
            if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
            else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
            else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
            else t = 0;
            obj.position.set(i*bpos, t*tpos, j*bpos);
            if(j>=1 && j<=3) obj.rotation.y = Math.PI; //hadap atas
            mapobj.add(obj);
        }
        else if(map[j][i]==3){//blok miring
            var obj = loadObject('block4.mtl','block4.obj');
            if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
            else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
            else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
            else t = 0;
            obj.position.set(i*bpos, t*tpos, j*bpos);
            mapobj.add(obj);
        }
        else if(map[j][i]==0){//blok finish
            var obj = loadObject('block6.mtl','block6.obj');
            if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
            else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
            else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
            else t = 0;
            obj.position.set(i*bpos, t*tpos, j*bpos);
            mapobj.add(obj);
        }
    }
}


gameScene.add(mapobj);


