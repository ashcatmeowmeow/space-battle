var canvas, canvasContext;
var ship;
var UFO;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	ship = new shipClass();
	UFO = new UFOClass();

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
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	ship.move(UFO);
	UFO.move();
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, "black");
	ship.draw();
	UFO.draw();
}
