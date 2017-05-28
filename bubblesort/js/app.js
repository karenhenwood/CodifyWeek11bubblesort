var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var fontSize = 56;
var radius;
var length;
var s = fontSize*2;


document.getElementById('enter').onclick =  function(){
	length = document.getElementById('numNodes').value;
	document.getElementById('numNodes').value = "";
	setRadius();
	createCanvas()
	ctx.clearRect(0,0,c.width,c.height)
	drawNumbers(0);
};

document.getElementById('play').onclick = function(){
	var k=0;

	function animation_loop() {
		ctx.clearRect(0,0,c.width,c.height)
		drawNumbers(k)
	  	setTimeout(function(){
	    k++;
	    if(k<=length){
	      animation_loop();
	    }
	  }, 500);
	}
	animation_loop();
};



function setRadius(){
	radius = (s*length)/(2*Math.PI)
	if (radius<s){
		radius=(2*fontSize)
	}
}

function createCanvas(){
	width = (radius * 2) + 50,
    height = (radius * 2) + 50,
    c.width = width;
    c.height = height;
	ctx.font = fontSize+"px Arial"
}

function drawNumbers(offsetIndex){
	//make the middle of the text append to the x, y coordinates determined below
	ctx.textBaseline="middle";
  	ctx.textAlign="center";
  	//relocate the upper left corner of the context field to the center"
	ctx.translate(c.width/2, c.height/2 )
	//determine how far around the circle to start drawing.
	offset = offsetIndex*((2*Math.PI)/length)
	for(i=0;i<length;i++){
		angle = ((2*Math.PI)/length)*i;//angle for given text is full circle/number of texts times the number it is
	    ctx.rotate(angle+offset);
	    ctx.translate(0, -(radius-fontSize));
	    ctx.rotate(-(angle+offset));
	    ctx.fillText(i, 0, 0);
	    // ctx.lineWidth = 1;
	    // ctx.strokeStyle="black";
	    // ctx.strokeRect(0,0,)
	    ctx.rotate(angle+offset);
	    ctx.translate(0, (radius-fontSize));
	    ctx.rotate(-(angle+offset));

	    //draw canvas edges for troubleshooting
	 	//ctx.lineWidth = 2;
		//ctx.strokeStyle="#FF0000";
		//ctx.strokeRect(0, 0, c.width, c.height);
	}
	ctx.translate(-c.width/2,-c.height/2)
}











 