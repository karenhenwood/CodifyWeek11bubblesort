var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");
var fontSize = 20;
var radius;
var length;
var s = fontSize*2.4;
var array = [];

document.getElementById('enter').onclick =  function(){
	length = document.getElementById('numNodes').value;
	document.getElementById('numNodes').value = "";
	setRadius();
	createCanvas();
	ctx.clearRect(0,0,c.width,c.height);
	drawNumbers(0);
	arrayInit();
	clearArray();
	printArray();
};

document.getElementById('play').onclick = function(){
	var k=0;
	var swapreturn;

	function animation_loop() {
		ctx.clearRect(0,0,c.width,c.height)
		drawNumbers(k)
		highlightArray(k);
		swapreturn = swap(array[k],array[k+1])
		console.log(swapreturn)
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
		// ctx.strokeStyle="#FF0000";
		// ctx.strokeRect(0, 0, c.width, c.height);
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

for(i=0;i<array.length;i++){
	var inDiv = document.createElement('div')
	inDiv.className = "arrayValueHolder"
	inDiv.innerHTML = array[i];
	inDiv.style.fontSize = fontSize +'px';
	inDiv.style.width = fontSize*1.2 +'px';
	document.getElementById('arrayHolder').appendChild(inDiv)
}

}

function clearArray(){
	var holder = document.getElementById('arrayHolder')

	while (holder.hasChildNodes()) {
    holder.removeChild(holder.lastChild);
	}
}

function highlightArray(loopIndex){
	var arrayDivs = document.getElementsByClassName('arrayValueHolder')

	for(i=0;i<array.length;i++){
		arrayDivs[i].style.border = "none"
	}
	if(loopIndex<array.length-1){
	arrayDivs[loopIndex].style.border = "1px solid blue"
	arrayDivs[loopIndex+1].style.border = "1px solid red"}
}


// var swap=true;
// while(swap==true){//if there were any swaps in the last interation of the for loop swap will be true
// //and we will enter the while loop again. If there were no swaps swap will not have been set to true and 
// //the loop will stop.
// //Reinitialize swap, so loop will break if it isn't reset to true by a run through the array with swaps 
//   swap = false;
//   //iterate over the array
//   for(i=0; i<numbers.length-1; i++){

//     if(numbers[i]>numbers[i+1]){
//       tempi = numbers[i];
//       tempi1 = numbers[i+1];
//       numbers[i]=tempi1;
//       numbers[i+1]=tempi;
//       swap = true;
//     };

//   };
// };
function swap(n1,n2){
	var swap = false;
	if(n1>n2){
       temp1 = n1;
      	temp2 = n2;
       n1=temp2;
       n2=temp1;

       // console.log(temp1, temp2, n1, n2)
       swap = true;
     };
     return [swap, n1, n2];
}









 