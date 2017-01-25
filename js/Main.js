var canvas, canvasContext;

var ship;
var UFO;
var score = 0;
var showingTitleScreen = true;
var colliders = [];

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	ship = new shipClass();
	//UFO = new UFOClass();
	asteroid = new asteroidClass();
	asteroid2 = new asteroidClass();
	colliders.push(asteroid, asteroid2);

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
	//UFO.reset(UFOPic);
	asteroid.reset(asteroidPic);
	asteroid2.reset(asteroidPic);
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
	//UFO.move();
	asteroid.move();
	asteroid2.move();
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, "black");
	if(showingTitleScreen){
		titleScreen();
	}
	else{
		drawUI();
		ship.draw();
		//UFO.draw();
		asteroid.draw();
		asteroid2.draw();
	}
}
