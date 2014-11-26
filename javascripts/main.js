console.log('This would be the main JS file.');

document.getElementById("open").onclick = function openCanvas() {
	document.getElementById("drawbox").style.visibility = "visible";
	document.getElementById("download").style.visibility = "visible";
	document.getElementById("clear").style.visibility = "visible";
}

var context = document.getElementById("drawbox").getContext("2d");
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging) {
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
}

function redraw(){
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.strokeStyle = "#000080";
	context.lineJoin = "round";
	context.lineWidth = 5;
	
	for (var i = 0; i < clickX.length; i++) {		
		context.beginPath();
		if (clickDrag[i]) {
			context.moveTo(clickX[i+1], clickY[i+1]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.stroke();
	}
	
}

document.getElementById("drawbox").onmousedown = function start(event) {
	var mouseX = event.pageX - this.offsetLeft;
	var mouseY = event.pageY - this.offsetTop;
	
	paint = true;
	addClick(mouseX, mouseY, false);
	redraw();
}

document.getElementById("drawbox").onmousemove = function move(event) {
    var mouseX = event.pageX - this.offsetLeft;
	var mouseY = event.pageY - this.offsetTop;

    if(paint){
    	addClick(mouseX, mouseY, true);
    	redraw();
  	}
}

document.getElementById("drawbox").onmouseup = function end(event) {
	var mouseX = event.pageX - this.offsetLeft;
	var mouseY = event.pageY - this.offsetTop;
	addClick(mouseX, mouseY, false);
    paint = false;
}

document.getElementById("drawbox").onmouseleave = function out(event) {
	var mouseX = event.pageX - this.offsetLeft;
	var mouseY = event.pageY - this.offsetTop;
	addClick(mouseX, mouseY, false);
	paint = false;
}

document.getElementById("clear").onclick = function clearCanvas() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	clickX = new Array();
	clickY = new Array();
	clickDrag = new Array();
	document.getElementById("drawbox").style.visibility = "hidden";
	document.getElementById("download").style.visibility = "hidden";
	document.getElementById("clear").style.visibility = "hidden";
	document.getElementById("table").style.visibility = "hidden";

}

document.getElementById("download").onclick = function downloadCanvas() {
	var img = document.getElementById("drawbox").toDataURL();
	var link = document.createElement("a");
	link.href = img;
	link.download = "Drawing";
	link.click();
}