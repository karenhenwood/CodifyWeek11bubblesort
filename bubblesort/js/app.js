//canvas from DOM
var c = document.getElementById("canvas");
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
//sizeing the input to fit its palceholder text
var input = document.getElementById('numNodes')
input.setAttribute('size',input.getAttribute('placeholder').length);

document.getElementById('initialize').onclick =  function(){
	//check to ensure user has entered a legitimate value before intialziing page
	var value = document.getElementById('numNodes').value;
	if(value>=1 && value<=20){
		initializePage();
	}else{
		document.getElementById('numNodes').value = "";
		alert("Please enter a length between 1 and 20")
	}
};

document.getElementById('play').onclick = function(){
	//check to ensure user has initilazed before starting the animation
	if(length>0){
		play();
	}else{
		alert("Please initialize an array first")
	}
	//disable the play and initialize buttons one the animation starts to prevent
	//scrambling the code while running
	//buttons are reneabled at the end of the animation loop
	document.getElementById('initialize').disabled=true;
	document.getElementById('play').disabled=true;
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
 	//fill the array with one of each number out of order
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
	//size the canvas to fit the circle of numbers with a few pixels of padding
	//and set the fontsize to use
	c.width = (radius * 2) + 50;
    c.height = (radius * 2) + 50;
	ctx.font = fontSize+"px Arial";
};

function clearArray(){
	//pick off the children of the array holders one at a time from the end
	//until all the children are dead
	var holder = document.getElementById('arrayHolder1');
	while (holder.hasChildNodes()) {
    	holder.removeChild(holder.lastChild);
	};

	var holder = document.getElementById('arrayHolder2');
	while (holder.hasChildNodes()) {
    	holder.removeChild(holder.lastChild);
	};
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
		//place some empty divs on the page for the array index holder
		var inDiv1 = document.createElement('div');
		inDiv1.className = "arrayIndexHolder";
		document.getElementById('arrayHolder1').appendChild(inDiv1);
		//place divs on the page with the array numbers in them for the
		//array holder
		var inDiv2 = document.createElement('div');
		inDiv2.className = "arrayValueHolder";
		inDiv2.innerHTML = array[i];
		inDiv2.style.fontSize = fontSize +'px';
		inDiv2.style.width = fontSize*1.4 +'px';
		document.getElementById('arrayHolder2').appendChild(inDiv2);
	}

}

//Play function interates one passthrough of the array and is called again if swaps occur during
//the passthrough. When one clean pass with no swaps occurs, play is no longer called and the animation stops
function play(){
	//start animation at 0 index of array
	var k=0;
	//variable to hold the return of the swap function
	var swapreturn;
	//varibale to flag whether a swap occured during one pass through of the array
	var swapflag = false;

	//function to place the status of the swap flag on the screen for user 
	//(will be false at the start of each pass)
	drawSwapFlag();
	//function removes animation classes places on the swapFlag div at the end of
	//the previous iteration through the array
	unanimateEnd();
	//kick off the animation of the for loop and array swapping
	animation_loop();

	function animation_loop() {
		//clear canvas of previous for loop
		ctx.clearRect(0,0,c.width,c.height)
		//redraw the for loop with the correct rotation depending
		//on the current array index
		drawNumbers(k)
		
		if(k<length-1){
			//add color to current and next index
			highlightArray(k);
			//perform swaping of numbers in the array using the swap function
			swapreturn = swap(array[k],array[k+1]);
				//if the swap funciton indicated a swap happened
				//update the actual array values and flag that a swap happed during
				//this iteration of the array
				if(swapreturn[0] == true){
					swapflag = swapreturn[0];
					array[k] = swapreturn[1];
					array[k+1] = swapreturn[2];
				};
			//update the page with the results of the swap
			setTimeout(function(){drawSwap(k)}, 500);
			setTimeout(function(){drawSwapFlag()}, 750);
		};
		//Restart the animation for the next array index
		//unless its the end of the array and there was a swap,
		//in which case call the play function again for the next 
		//iteration.
		//If it's the end of the array and there were no swaps,
		//play the end of sorting animations and re-enable the buttons
	  	setTimeout(function(){
	    		k++;
	    		if(k<=length){
	      			animation_loop();
	    		}else if(swapflag==true){
	    			animateReplay();
	    			setTimeout(function(){unanimateReplay()},1000);
	    			setTimeout(function(){play()}, 1000);	
	    		}else if(swapflag==false){
	    			animateEnd();
	    			document.getElementById('initialize').disabled=false;
	    			document.getElementById('play').disabled=false;

	    		}
	    }, 2000);
	};
	
	function drawSwap(loopIndex){
		//update the page with swaps after the array is updated 
		var arrayValueHolders = document.getElementsByClassName('arrayValueHolder');
		arrayValueHolders[loopIndex].innerHTML = array[loopIndex];
		arrayValueHolders[loopIndex+1].innerHTML = array[loopIndex+1];
	};

	function drawSwapFlag(){	
		var div = document.getElementById('swapHolder');
		div.innerHTML ="Swap = <span id='swapFlag'>"+swapflag+"</span>";
		div.style.fontSize = fontSize +'px';
		//Color background based on true or false state of swap. 
		//Red for false, green for true.
		var swapFlag = document.getElementById('swapFlag');
		if(swapflag){
			swapFlag.style.backgroundColor = "#4dff4d";
		}else{
			swapFlag.style.backgroundColor = "#ff4d4f";
		};
	};

	function highlightArray(loopIndex){
		var arrayIndexDivs = document.getElementsByClassName('arrayIndexHolder');
		var arrayDivs = document.getElementsByClassName('arrayValueHolder');
		
		//clear out styling for previous index
		for(i=0;i<array.length;i++){
			arrayIndexDivs[i].innerHTML = "";
			arrayDivs[i].style.backgroundColor = "transparent";
			arrayIndexDivs[i].style.width = arrayDivs[i].style.width;
		}

		//print the i and i+1 into the correct divs based on the current loop index
		arrayIndexDivs[loopIndex].innerHTML = "i";
		arrayIndexDivs[loopIndex+1].innerHTML = "i+1";
		arrayIndexDivs[loopIndex].style.backgroundColor = "#FF6568";
		arrayIndexDivs[loopIndex+1].style.backgroundColor = "#A7ECE8";
		//add background color to the correct divs based on the current loop index
		arrayDivs[loopIndex].style.backgroundColor = "#FF6568";
		arrayDivs[loopIndex+1].style.backgroundColor = "#A7ECE8";
	};

	function swap(n1,n2){
		//Take in two numbers and return them swapped 
		//if the first was greater than the second.
		//Indicate if the were swapped or not.
		var swap = false;
		if(n1>n2){
	      temp1 = n1;
	      temp2 = n2;
	      n1=temp2;
	      n2=temp1;
	      swap = true;
	     };
	     return [swap, n1, n2];
	};

	function animateReplay(){
 		var playButton = document.getElementById('play');
 		playButton.className ="btn animated tada";
 		playButton.style.backgroundColor="#4dff4d"
 		var swapHolder = document.getElementById('swapHolder');
 		swapHolder.className ="col-md-8 animated flash";
 	};

 	function unanimateReplay(){
 		var playButton = document.getElementById('play');
 		playButton.className ="btn";
 		playButton.style.backgroundColor=""
 		var swapHolder = document.getElementById('swapHolder');
 		swapHolder.className ="col-md-8";
 	};

 	function animateEnd(){
 		var swapHolder = document.getElementById('swapHolder');
 		swapHolder.className ="col-md-8 animated zoomOutRight";
 	};

 	function unanimateEnd(){
 		var swapHolder = document.getElementById('swapHolder');
 		swapHolder.className ="col-md-8";
 	};
};




















 