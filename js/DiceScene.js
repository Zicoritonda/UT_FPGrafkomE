
//objek dice
var dice = new THREE.Object3D();//create an empty container
dice.add(loadObject('dice2.mtl','dice2.obj'));
diceScene.add(dice);

function play1() { // animasi rotasi dadu
    diceRenderer.setAnimationLoop( () => {
        update1();
        diceRender();
    } );
}

function update1() {
    // increase the mesh's rotation each frame
    dice.rotation.x += 0.15;
    dice.rotation.y += 0.35;
    dice.rotation.z += 0.15;
  
    dice.rotation.x = dice.rotation.x % (Math.PI*2);
    dice.rotation.y = dice.rotation.y % (Math.PI*2);
    dice.rotation.z = dice.rotation.z % (Math.PI*2);
  }


  function update2() {
    diceRenderer.setAnimationLoop(null);
    var num = rand(0,6);
    num = Math.ceil(num);
    // set rotation to desire
    if(num==1){
      console.log("1");
      diceRenderer.setAnimationLoop( () => {
        if(dice.rotation.x!=0 && dice.rotation.z!=0){
          //x
          if((dice.rotation.x*180)/Math.PI>0) dice.rotation.x = 0;
          //z
          if((dice.rotation.z*180)/Math.PI>0) dice.rotation.z = 0;
        }
        else{
            diceRenderer.setAnimationLoop(null);
        }
        diceRender();
      });
    }
    else if(num==2){
      console.log("2");
      diceRenderer.setAnimationLoop( () => {
        if(dice.rotation.x!=0 && dice.rotation.z!=Math.PI*2/4){
          //x
          if((dice.rotation.x*180)/Math.PI>0) dice.rotation.x = 0;
          //z
          if((dice.rotation.z*180)/Math.PI>0) dice.rotation.z = Math.PI*2/4;
        }
        else{
            diceRenderer.setAnimationLoop(null);
        }
        diceRender();
      });
    }
    else if(num==3){
      console.log("3");
      diceRenderer.setAnimationLoop( () => {
        if(dice.rotation.x!=0 && dice.rotation.z!=Math.PI){
          //x
          if((dice.rotation.x*180)/Math.PI>0) dice.rotation.x = 0;
          //z
          if((dice.rotation.z*180)/Math.PI>0) dice.rotation.z = Math.PI;
        }
        else{
            diceRenderer.setAnimationLoop(null);
        }
        diceRender();
      });
    }
    else if(num==4){
      console.log("4");
      diceRenderer.setAnimationLoop( () => {
        if(dice.rotation.x!=0 && dice.rotation.z!=Math.PI*3/2){
          //x
          if((dice.rotation.x*180)/Math.PI>0) dice.rotation.x = 0;
          //z
          if((dice.rotation.z*180)/Math.PI>0) dice.rotation.z = Math.PI*3/2;
        }
        else{
            diceRenderer.setAnimationLoop(null);
        }
        diceRender();
      });
    }
    else if(num==5){
      console.log("5");
      diceRenderer.setAnimationLoop( () => {
        if(dice.rotation.x!=Math.PI/2 && dice.rotation.y!=0){
          //x
          if((dice.rotation.x*180)/Math.PI>0) dice.rotation.x = Math.PI/2;
          //y
          if((dice.rotation.y*180)/Math.PI>0) dice.rotation.y = 0;
        }
        else{
            diceRenderer.setAnimationLoop(null);
        }
        diceRender();
      });
    }
    else if(num==6){
      console.log("6");
      diceRenderer.setAnimationLoop( () => {
        if(dice.rotation.x!=Math.PI*3/2 && dice.rotation.y!=0){
         //x
         if((dice.rotation.x*180)/Math.PI>0) dice.rotation.x = Math.PI*3/2;
         //y
         if((dice.rotation.y*180)/Math.PI>0) dice.rotation.y = 0;
        }
        else{
            diceRenderer.setAnimationLoop(null);
        }
        diceRender();
      });
      
    }

    //jalankan pion
    step = num;
    play();
    
  }

  function rand(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return min + (max - min) * Math.random();
  }

class PickHelper {
    constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    }

    clicked(normalizedPosition, scene, camera){

        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera);
        const intersectedObjects = this.raycaster.intersectObjects(scene.children,true);
        if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object;
            return this.pickedObject;
        }
    }
}

//create pick helper
const pickPosition = {x: 0, y: 0};
const pickHelper = new PickHelper();
clearPickPosition();

function getCanvasRelativePosition(event) {
    const rect = diceCanvas.getBoundingClientRect();
    return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    };
}

function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / diceCanvas.clientWidth ) *  2 - 1;
    pickPosition.y = (pos.y / diceCanvas.clientHeight) * -2 + 1;  // note we flip Y
  }

function clearPickPosition() {
    pickPosition.x = -100000;
    pickPosition.y = -100000;
}

var obj = new THREE.Object3D();
function clickEvent(){
    if(pickHelper.clicked(pickPosition, diceScene, diceCamera) != null){
        //reset dice
        dice.position.set(0, 0, 0);
        dice.rotation.set(0, 0, 0);
        //play first animation
        play1();
        //play second animation
        setTimeout(update2, 2000);
        console.log("sudah");
    }
  }
  
window.addEventListener('click',clickEvent);
window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);
