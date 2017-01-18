var canvas, canvasContext;

var ship;
var UFO;
var score = 0;
var showingTitleScreen = true;
var objectsToCrashInto;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	ship = new shipClass();
	UFO = new UFOClass();
	asteroid = new asteroidClass();
	//objectsToCrashInto.push(UFO, asteroid);

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
	UFO.reset(UFOPic);
	asteroid.reset(asteroidPic);
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	if(showingTitleScreen){
	 return;
	}
	ship.move(UFO, asteroid);
	//UFO.move();
	asteroid.move();
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, "black");
	if(showingTitleScreen){
		titleScreen();
	}
	else{
		drawUI();
		ship.draw();
		UFO.draw();
		asteroid.draw();
	}
}
