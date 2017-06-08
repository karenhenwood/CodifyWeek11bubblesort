//canvas from DOM
var c = document.getElementById("canvas1");
//context of canvas
var ctx = c.getContext("2d");
//font size. a number of items are sized relative to this
var fontSize = 20;
//radius of circle for for loop
var radius;
//length of the array and for loop
var length;
//array of numbers to sort
var array = [];

document.getElementById('enter').onclick =  function(){
	initializePage();
};

function initializePage(){
	//set the length of the for loop and the array from the user input
	//then clear the input
	length = document.getElementById('numNodes').value;
	document.getElementById('numNodes').value = "";
	//determine size of for loop
	setRadius();
	
	//fill the array with random numbers
	randArray();
	//size the canvas to fit the circle of the for loop
	createCanvas();

	//clear the canvas of any previous printing
	ctx.clearRect(0,0,c.width,c.height);
	//clear the array div of any previous printing
	clearArray();

	//print the for loop
	drawNumbers(0);
	//print the random array
	printArray();
};

function setRadius(){
	//arclength is sized to fit the numbers around the circle based on the font size
	var s = fontSize*2.4;
	//Circ=PI*Diameter 
	//Circ=PI*2*Radius
	//Radius=Circ/(PI*2)
	//so create a diameter based on the arc length and quanity of numbers
	//that have to fit arround the circle then solve for radius
	radius = (s*length)/(2*Math.PI);
	//for smaller circles, this can be cramped still, so just override 
	//and use a larger radius
	if (radius<s){
		radius=s;
	};
};

function randArray(){
	//clear old values out 
	array = [];
	for (i=0;i<length;++i){
		array[i]=i;
 	};
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
	};
};

function createCanvas(){
	c.width = (radius * 2) + 50,
    c.height = (radius * 2) + 50,
	ctx.font = fontSize+"px Arial"
}

function clearArray(){
	var holder = document.getElementById('arrayHolder')
	console.log(holder)
	while (holder.hasChildNodes()) {
    	holder.removeChild(holder.lastChild);
	}
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

function printArray(){

	for(i=0;i<array.length;i++){
		var inDiv = document.createElement('div');
		inDiv.className = "arrayValueHolder";
		inDiv.innerHTML = array[i];
		inDiv.style.fontSize = fontSize +'px';
		inDiv.style.width = fontSize*1.2 +'px';
		document.getElementById('arrayHolder').appendChild(inDiv);
	}

}
document.getElementById('play').onclick = function(){
	
play();

	
};

function play(){
	var k=0;
	function animation_loop() {
		ctx.clearRect(0,0,c.width,c.height)
		drawNumbers(k)
		if(k<length-1){
			highlightArray(k);
			swapreturn = swap(array[k],array[k+1]);
			array[k] = swapreturn[1];
			array[k+1] = swapreturn[2]; 
			setTimeout(function(){drawSwap(k)}, 1000);
		};
	  	setTimeout(function(){
	    k++;
	    if(k<=length){
	      animation_loop();
	    }
	    
	  }, 2000);

	}
	animation_loop();
}














function highlightArray(loopIndex){
	var arrayDivs = document.getElementsByClassName('arrayValueHolder')

	for(i=0;i<array.length;i++){
		arrayDivs[i].style.border = "none"
	}
	arrayDivs[loopIndex].style.border = "1px solid blue"
	arrayDivs[loopIndex+1].style.border = "1px solid red"
}
function swap(n1,n2){
	var swap = false;
	if(n1>n2){
      temp1 = n1;
      temp2 = n2;
      n1=temp2;
      n2=temp1;
      swap = true;
     };
     return [swap, n1, n2];
}

function drawSwap(loopIndex){

		var arrayValueHolders = document.getElementsByClassName('arrayValueHolder');

		arrayValueHolders[loopIndex].innerHTML = array[loopIndex]
		arrayValueHolders[loopIndex+1].innerHTML = array[loopIndex+1]
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










 