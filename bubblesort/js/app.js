var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");
var c2 = document.getElementById("canvas2");
var ctx2 = c2.getContext("2d");
var fontSize = 20;
var radius;
var length;
var s = fontSize*2.4;
var array = [];

document.getElementById('enter').onclick =  function(){
	length = document.getElementById('numNodes').value;
	document.getElementById('numNodes').value = "";
	setRadius();
	createCanvas()
	ctx.clearRect(0,0,c.width,c.height)
	drawNumbers(0);
	arrayInit();
	printArray();
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
	ctx.textBaseline="middle";
	ctx.textAlign="right"
	var recWidth = String(length).length*12
	var recHeight = 2*fontSize
	ctx.fillText("For i =", c.width/2 - recWidth/2 - 2, recHeight/2+4)

	//make the middle of the text append to the x, y coordinates determined below
  	ctx.textAlign="center";


  	//relocate the upper left corner of the context field to the center"
	ctx.translate(c.width/2, c.height/2 )
	//determine how far around the circle to start drawing.
	offset = -offsetIndex*((2*Math.PI)/length)
	
	for(i=0;i<length;i++){
		angle = ((2*Math.PI)/length)*i;//angle for given text is full circle/number of texts times the number it is
		if((angle+offset)==0){//for numbers at top of circle
			//locate canvas along edge of circle
	    	ctx.rotate(angle+offset);
		    ctx.translate(0, -(radius));
		    ctx.rotate(-(angle+offset));
		    //print
		    ctx.fillText(i, 0, 0);
		    //return canvas to start
		    ctx.rotate(angle+offset);
		    ctx.translate(0, (radius));
		    ctx.rotate(-(angle+offset));
		    //draw the box that highlights the active number
		    drawBox()
	    }else{//for numbers not at top of circle
	    	//locate canvas along edge of circle
		    ctx.rotate(angle+offset);
		    ctx.translate(0, -(radius-fontSize));
		    ctx.rotate(-(angle+offset));
		    //print
		    ctx.fillText(i, 0, 0);
		    //return canvas to start
		    ctx.rotate(angle+offset);
		    ctx.translate(0, (radius-fontSize));
		    ctx.rotate(-(angle+offset));
		    //draw the box that highlights the active number
		    drawBox()
		}    
	    //draw canvas edges for troubleshooting
	 	//ctx.lineWidth = 2;
		//ctx.strokeStyle="#FF0000";
		//ctx.strokeRect(0, 0, c.width, c.height);
	}
	ctx.translate(-c.width/2,-c.height/2)

	//resize the box based on longest number it needs to highlight and then stroke
	function drawBox(){
		ctx.lineWidth = 1;
		ctx.strokeStyle="black";
		ctx.strokeRect(-recWidth/2,-(radius+fontSize/2), recWidth, recHeight)
	}

}

function arrayInit(){
	for (i=0;i<length;++i){
		array[i]=i;
 	}
	array = shuffle(array)

		function shuffle(array) {
	  		var tmp, current, top = array.length;
	  		if(top) while(--top) {
	    		current = Math.floor(Math.random() * (top + 1));
	    		tmp = array[current];
	    		array[current] = array[top];
	    		array[top] = tmp;
	  		}
	  		return array;
		}
}

function printArray(){
	console.log(array)
	ctx2.fillText(array, 50, 50);
}









 