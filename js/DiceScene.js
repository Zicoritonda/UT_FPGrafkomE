
var dice = new THREE.Object3D();//create an empty container
// var obj = loadObject('block3.mtl','block3.obj');
dice.add(loadObject('dice2.mtl','dice2.obj'));
// mtlLoader.load('dice2.mtl', function (materials) {
//     materials.preload();
//     objLoader.setMaterials(materials);
//     objLoader.load('dice2.obj', function (object) {
//         // object.rotation.y = Math.PI/2;
 
//         dice.add(object);
//         //object.position.y -= 60;
//     });
 
// });
diceScene.add(dice);

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// var cube = new THREE.Mesh( geometry, material );
// cube.position.set(0,0,0);
// diceScene.add( cube );

// dice.position.set(0,0,0);
// diceScene.add(dice);


class PickHelper {
    constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
    }
    // pick(normalizedPosition, scene, camera, time) {
    //     // restore the color if there is a picked object
    //     if (this.pickedObject) {
    //         this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
    //         this.pickedObject = undefined;
    //     }

    //     // cast a ray through the frustum
    //     this.raycaster.setFromCamera(normalizedPosition, camera);
    //     // get the list of objects the ray intersected
    //     const intersectedObjects = this.raycaster.intersectObjects(scene.children);
    //     if (intersectedObjects.length) {
    //         // pick the first object. It's the closest one
    //         this.pickedObject = intersectedObjects[0].object;
    //         // save its color
    //         this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
    //         console.log(this.pickedObject.name);
    //         // set its emissive color to flashing red/yellow
    //         this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
    //     }
    // }

    clicked(normalizedPosition, scene, camera){
        // restore the color if there is a picked object
        if (this.pickedObject) {
            this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
            this.pickedObject = undefined;
        }

        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera);
        // console.log(this.raycaster);
        // get the list of objects the ray intersected
        const intersectedObjects = this.raycaster.intersectObjects(scene.children);
        console.log(intersectedObjects.length);
        if (intersectedObjects.length) {
            
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object;
            // save its color
            this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();

            // console.log(this.pickedObject.name);
            var num1 = parseInt(this.pickedObject.name,10);

            // set its emissive color to flashing red/yellow
            this.pickedObject.material.emissive.setHex(0x7CFC00);
            return this.pickedObject;
        }
        // console.log(this.pickedObject);
        
    }
}

// class PickHelper {
//     constructor() {
//       this.raycaster = new THREE.Raycaster();
//       this.pickedObject = null;
//       this.pickedObjectSavedColor = 0;
//     }
//     pick(normalizedPosition, scene, camera) {
//       // restore the color if there is a picked object
//       if (this.pickedObject) {
//         this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
//         this.pickedObject = undefined;
//       }
   
//       // cast a ray through the frustum
//       this.raycaster.setFromCamera(normalizedPosition, camera);
//       // get the list of objects the ray intersected
//       const intersectedObjects = this.raycaster.intersectObjects(scene.children);
//       if (intersectedObjects.length) {
//         // pick the first object. It's the closest one
//         this.pickedObject = intersectedObjects[0].object;
//         // save its color
//         this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
//         // set its emissive color to flashing red/yellow
//         this.pickedObject.material.emissive.setHex((8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
//       }
//     }
//   }

function play1() {
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
    // group.rotation.x = Math.PI*6/4;
    // group.rotation.z = Math.PI*1/4;
    // group.rotation.y = Math.PI*0/4;
  
    dice.rotation.x = dice.rotation.x % (Math.PI*2);
    dice.rotation.y = dice.rotation.y % (Math.PI*2);
    dice.rotation.z = dice.rotation.z % (Math.PI*2);
  }


  function update2() {
    diceRenderer.setAnimationLoop(null);
    console.log("play2");
  
    //set random number
    var num = rand(0,6);
    // console.log(Math.ceil(num));
    // num = 6;
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
        console.log((dice.rotation.x*180)/Math.PI);
        console.log((dice.rotation.y*180)/Math.PI);
        console.log((dice.rotation.z*180)/Math.PI);
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
        console.log((dice.rotation.x*180)/Math.PI);
        console.log((dice.rotation.y*180)/Math.PI);
        console.log((dice.rotation.z*180)/Math.PI);
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
        console.log((dice.rotation.x*180)/Math.PI);
        console.log((dice.rotation.y*180)/Math.PI);
        console.log((dice.rotation.z*180)/Math.PI);
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
        console.log((dice.rotation.x*180)/Math.PI);
        console.log((dice.rotation.y*180)/Math.PI);
        console.log((dice.rotation.z*180)/Math.PI);
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
        console.log((dice.rotation.x*180)/Math.PI);
        console.log((dice.rotation.y*180)/Math.PI);
        console.log((dice.rotation.z*180)/Math.PI);
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
        console.log((dice.rotation.x*180)/Math.PI);
        console.log((dice.rotation.y*180)/Math.PI);
        console.log((dice.rotation.z*180)/Math.PI);
        diceRender();
      });
      
    }

    //jalankan pion
    // var obj = scene.getObjectByName( "text" );
    // scene.remove(obj);
    // var textgeometry = new THREE.TextGeometry(num.toString(), {font: font, size: 0.5, height: 0.2, material: 0, bevelThickness: 0.01});
    // const t = new THREE.Mesh(textgeometry, tmaterial);
    // t.name = "text";
    // t.position.set(-0.4,4,0);
    // t.rotation.set(-Math.PI/4,0,0);
    // scene.add(t);
  }

  function rand(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return min + (max - min) * Math.random();
  }

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
    // unlike the mouse which always has a position
    // if the user stops touching the screen we want
    // to stop picking. For now we just pick a value
    // unlikely to pick something
    pickPosition.x = -100000;
    pickPosition.y = -100000;
}

// var obj;
function clickEvent(){
    var obj = pickHelper.clicked(pickPosition, diceScene, diceCamera);
    console.log(obj);
    if(obj!=null){
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

function onDocumentMouseDown( event ) {                
    var mouse3D = new THREE.Vector3( ( event.clientX / diceCanvas.clientWidth ) * 2 - 1,   //x
                                    -( event.clientY / diceCanvas.clientHeight ) * 2 + 1,  //y
                                    0.5 );                                            //z
    projector.unprojectVector( mouse3D, camera );   
    mouse3D.sub( camera.position );                
    mouse3D.normalize();
    var raycaster = new THREE.Raycaster( camera.position, mouse3D );
    var intersects = raycaster.intersectObjects( objects );
    // Change color if hit block
    if ( intersects.length > 0 ) {
        intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
    }
} 
  
window.addEventListener('click',clickEvent);
window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);
