var canvas, canvasContext;

var ship;
var UFO;
var score = 0;
var showingTitleScreen = true;
var colliders = [];
var explosions = [];

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	ship = new shipClass();
	spawnAsteroids();
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
	loadImages();
}


function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	setupInput();
	loadLevel();
}

function loadLevel(whichLevel) {
	ship.reset(shipPic);
	resetAsteroids();
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	if(showingTitleScreen){
	 return;
	}
	ship.move(colliders);
 	moveAsteroids();
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, "black");
	if(showingTitleScreen){
		titleScreen();
	}
	else{
		drawUI();
		ship.draw();
		drawAsteroids();
		drawExplosions();
	}
}
