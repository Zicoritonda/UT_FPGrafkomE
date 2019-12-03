function diceRender() {
    diceRenderer.render(diceScene, diceCamera);
  }

var animate = function () {
    gameControls.update();
    playerControls.update();
    // diceControls.update();
	requestAnimationFrame( animate );
    
    gameRenderer.render(gameScene, gameCamera);
    playerRenderer.render(playerScene, playerCamera);
    diceRenderer.render(diceScene, diceCamera);
};

animate();