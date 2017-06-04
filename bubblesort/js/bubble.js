var c2 = document.getElementById("canvas2");
var ctx2 = c2.getContext("2d");
var fontSize2 = 20;
var length2;
var array = [];

document.getElementById('enter').onclick =  function(){
	length2 = document.getElementById('numNodes').value;
	 // document.getElementById('numNodes').value = "";
	for (i=0;i<length2;++i){
		array[i]=i;
 	}
	
	array = shuffle(array)
	console.log(array)
}

// function shuffle(array) {
//   var tmp, current, top = array.length;
//   if(top) while(--top) {
//     current = Math.floor(Math.random() * (top + 1));
//     tmp = array[current];
//     array[current] = array[top];
//     array[top] = tmp;
//   }
//   return array;
// }















