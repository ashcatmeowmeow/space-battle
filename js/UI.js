function drawUI(){
	var scoreText = score.toString() + ' ' + scoreMultiplier.toString() + 'x';
	console.log(scoreText);
	canvasContext.font = "14px Arial";
	colorText(scoreText, canvas.width-50, 50, 'white');
}
