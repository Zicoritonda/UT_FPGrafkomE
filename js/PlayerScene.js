var pion=[];
var activePlayer = 0;
var step;

//Untuk animasi menggeser objek player
function cameraTranslate(camera,target){
    console.log('target: '+target.toString());
    var num = camera.position.x-target;
    playerRenderer.setAnimationLoop( () => {
        if(num < 0 && camera.position.x <= target){
            camera.position.x += 0.2;
        }
        else if(num > 0 && camera.position.x >= target) {
            camera.position.x -= 0.2;
        }
        else{
            playerRenderer.setAnimationLoop(null);
        }
        playerRenderer.render(playerScene, playerCamera);
    });
}

//untuk animasi menggeser objek pion pada portal
function pionTranslate2(obj,asal, target){
    var num = asal-target;
    gameRenderer.setAnimationLoop( () => {
        if(num < 0 && obj.position.z <= target*bpos){
            obj.position.z += 0.07;
        }
        else if(num > 0 && obj.position.z >= target*bpos) {
            obj.position.z -= 0.07;
        }
        else{
            gameRenderer.setAnimationLoop(null);
        }
        gameRenderer.render(gameScene, gameCamera);
    });
}

function rand(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return min + (max - min) * Math.random();
  }

function randomColor() {
    return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
}

const tmaterial = new THREE.MeshPhongMaterial({
    color: randomColor(),
});

var loader = new THREE.FontLoader();
let font = loader.parse(fontJSON);

for(let i=1;i<=2;i++){
    //objek pion di game scene
    var char = new THREE.Object3D();//create an empty container
    char.add(loadObject('pion'+ i.toString() +'.mtl','pion'+ i.toString() +'.obj'));
    char.name = 'pion'+ i.toString();
    char.position.set(0*bpos, 1.06*tpos, 7 * bpos);
    char.arahX=1;
    char.arahZ=0;
    char.row = 7;
    char.col = -1;
    char.lvl = 1;
    pion.push(char);
    gameScene.add(char);

    //objek pion di player scene
    var nchar = new THREE.Object3D();//create an empty container
    nchar.add(loadObject('pion'+ i.toString() +'.mtl','pion'+ i.toString() +'.obj'));
    nchar.name = 'pion'+ i.toString();
    nchar.position.set(10*(i-1),0,0);
    playerScene.add(nchar);
    var textgeometry = new THREE.TextGeometry('Player '+i.toString(), {font: font, size: 0.5, height: 0.2, material: 0, bevelThickness: 0.01});
    const tmaterial = new THREE.MeshPhongMaterial({
        color: randomColor(),
    });
    const t = new THREE.Mesh(textgeometry, tmaterial);
    t.position.set(-1.2+10*(i-1),-0.9,0);
}

function play(){
    
    var row, col, lrow, lcol, llvl;
    
    p = pion[activePlayer];
    console.log(p.row,p.col);
    while(step>0){
        lrow = p.row; lcol = p.col; llvl = p.lvl;
        row = p.row;
        col = p.col;
        if(p.arahX==1){
            if(p.col <= 7-p.lvl){
                col += step;
                if(col <= 7-p.lvl){
                    p.col = col;
                    step = 0;
                }
                else{
                    step -= 8 - p.lvl - p.col;
                    p.col = 8-p.lvl;
                    p.arahX = 0;
                    p.arahZ = -1;
                }
            }
            console.log('kanan', step, p.row, p.col, p.lvl);
        }
        else if(p.arahZ==-1){
            if(p.row >= p.lvl){
                row -= step;
                if(row >= p.lvl){
                    step = 0;
                    p.row = row;
                }
                else{
                    step -= p.row - p.lvl + 1;
                    p.row = p.lvl - 1;
                    p.arahX = -1;
                    p.arahZ = 0;
                }
            }
            console.log('atas', step, p.row, p.col, p.lvl);
        }
        else if(p.arahX==-1){
            if(p.col >= p.lvl){
                col -= step;
                if(col >= p.lvl){
                    step = 0;
                    p.col = col;
                }
                else{
                    step -= p.col - p.lvl + 1;
                    p.col = p.lvl - 1;
                    p.arahX = 0;
                    p.arahZ = 1;
                }
            }
            console.log('kiri', step, p.row, p.col, p.lvl);
        }
        else if(p.arahZ==1){
            if(p.row < 7-p.lvl){
                row += step;
                if(row < 7-p.lvl){
                    step = 0;
                    p.row = row;
                }
                else{
                    step -= 7 - p.lvl - p.row;
                    p.row = 7-p.lvl;
                    p.lvl += 1;
                    p.arahX = 1;
                    p.arahZ = 0;
                }
            }
            console.log('bawah', step, p.row, p.col, p.lvl);
        }
    }
    p.position.z = (p.row) * bpos;
    p.position.x = (p.col) * bpos;
    p.position.y = (p.lvl + .06) * tpos;

    //check map untuk teleport
    if(portal[p.row][p.col]==2){
        if(p.row<3){
            pionTranslate2(p,p.row,p.row-1);
            var num = rand(0,6);
            num = Math.floor(num);
            var por = lportal[num];
            setTimeout(function() {
                p.row = por[0];
                p.col = por[1];
                p.lvl = por[2];
                p.arahX = por[3];
                p.arahZ = por[4];
                p.position.z = (por[0]) * bpos;
                p.position.x = (por[1]) * bpos;
                p.position.y = (por[2] + .06) * tpos;
            }, 1500);
            pionTranslate2(p,p.row,p.row=1);
        } else if(p.row>4){
            pionTranslate2(p,p.row,p.row+1);
            var num = rand(0,6);
            num = Math.floor(num);
            var por = lportal[num];
            setTimeout(function() {
                p.row = por[0];
                p.col = por[1];
                p.lvl = por[2];
                p.arahX = por[3];
                p.arahZ = por[4];
                p.position.z = (por[0]) * bpos;
                p.position.x = (por[1]) * bpos;
                p.position.y = (por[2] + .06) * tpos;
            }, 1500);
            pionTranslate2(p,p.row,p.row-1);
        }
    }

    activePlayer+=1;
    if(activePlayer==pion.length){
        activePlayer = 0;
    }

    if(activePlayer==0){
        cameraTranslate(playerCamera,0);
    } else{
        cameraTranslate(playerCamera,10);
    }

    console.log(p);
    console.log('play selesai');
    
}
