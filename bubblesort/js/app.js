var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var r = 100;
var length = 24;

function createCanvas(radius){
	width = (radius * 2) + 50,
    height = (radius * 2) + 50,
    c.width = width;
    c.height = height;
}

createCanvas(r)


function drawNumbers(nodes, radius, offsetIndex){
	//make text relative to the radius
	ctx.font = radius*0.15 + "px arial";
	//make the middle of the text append to the x, y coordinates determined below
	ctx.textBaseline="middle";
  	ctx.textAlign="center";
  	//relocate the upper left corner of the context field to the center"
	ctx.translate(c.width/2, c.height/2 )

	offset = offsetIndex*((2*Math.PI)/nodes)
	for(i=0;i<nodes;i++){
		angle = ((2*Math.PI)/nodes)*i;//angle for given text is full circle/number of texts* the number it is
	    ctx.rotate(angle+offset);
	    ctx.translate(0, -radius*0.85);
	    ctx.rotate(-(angle+offset));
	    ctx.fillText(i, 0, 0);
	    ctx.rotate(angle+offset);
	    ctx.translate(0, radius*0.85);
	    ctx.rotate(-(angle+offset));
	}
	ctx.translate(-c.width/2,-c.height/2)
}

k=0;

function animation_loop() {
	ctx.clearRect(0,0,c.width,c.height)
	drawNumbers(length, r, k)
  	setTimeout(function(){
    k++;
    if(k<=length){
      animation_loop();
    }
  }, 500);
};

animation_loop();









