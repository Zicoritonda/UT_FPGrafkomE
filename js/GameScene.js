
var map = [[1,1,1,1,1,1,1,1],
           [1,2,1,1,2,1,1,4],
           [4,1,4,1,1,1,1,1],
           [1,4,1,0,2,1,1,1],
           [1,1,1,3,2,1,4,1],
           [4,1,3,1,1,4,1,4],
           [1,3,1,2,1,1,2,1],
           [3,1,1,1,1,1,1,1]];

// var cpos = 5;

var mapobj = new THREE.Object3D();//create an empty container
var bpos = 4.1;
var tpos = 3.8;
var t;
for(let i = 0; i<8; i++){
    for(let j = 0;j<8;j++){
        if(map[j][i]==1){ // blok biasa
            var obj = loadObject('block3.mtl','block3.obj');
            if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
            else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
            else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
            else t = 0;
            obj.position.set((i-4)*bpos, t*tpos, (j-4)*bpos);
            mapobj.add(obj);
        }
        else if(map[j][i]==2){//blok portal
            var obj = loadObject('block2.mtl','block2.obj');
            if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
            else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
            else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
            else t = 0;
            obj.position.set((i-4)*bpos, t*tpos, (j-4)*bpos);
            mapobj.add(obj);
        }
        else if(map[j][i]==3){//blok miring
            var obj = loadObject('block4.mtl','block4.obj');
            if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
            else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
            else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
            else t = 0;
            obj.position.set((i-4)*bpos, t*tpos, (j-4)*bpos);
            mapobj.add(obj);
        }
        else if(map[j][i]==4){ //blok peti
            var obj = loadObject('block5.mtl','block5.obj');
            if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
            else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
            else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
            else t = 0;
            obj.position.set((i-4)*bpos, t*tpos, (j-4)*bpos);
            mapobj.add(obj);
        }
        else if(map[j][i]==0){//blok finish
            var obj = loadObject('block6.mtl','block6.obj');
            if(i>=3 && i<=4 && j>=3 && j<=4) t=3;
            else if(i>=2 && i<=5 && j>=2 && j<=5) t=2;
            else if(i>=1 && i<=6 && j>=1 && j<=6) t=1;
            else t = 0;
            obj.position.set((i-4)*bpos, t*tpos, (j-4)*bpos);
            mapobj.add(obj);
        }
    }
}

gameScene.add(mapobj);


