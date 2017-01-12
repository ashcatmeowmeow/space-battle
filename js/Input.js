const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_SPACEBAR = 32;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);

	var repeat = false;

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	document.addEventListener("keyup", function() { repeat = false; });
	document.addEventListener("keydown", function() {

	});

	ship.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_SPACEBAR);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	// cheat / hack to test car in any position
	/*carX = mouseX;
	carY = mouseY;
	carSpeedX = 4;
	carSpeedY = -4;*/
}

function keySet(keyEvent, setTo) {
	if(keyEvent.keyCode == ship.controlKeyLeft) {
		ship.keyHeld_TurnLeft = setTo;
	}
	if(keyEvent.keyCode == ship.controlKeyRight) {
		ship.keyHeld_TurnRight = setTo;
	}
	if(keyEvent.keyCode == ship.controlKeyUp) {
		ship.keyHeld_Gas = setTo;
	}
	if(keyEvent.keyCode == ship.controlKeyDown) {
		ship.keyHeld_Reverse = setTo;
	}
	if(keyEvent.keyCode	== ship.controlKeyForShotFire) {
		ship.keyHeld_Fire = setTo;
	}
}


function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, true);
	if (!repeat) {
		console.log('it worked');
		ship.cannonFire(UFO);
		repeat = true;
	}
	//console.log(evt.keyCode);
	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, false);
	repeat = false;
}
