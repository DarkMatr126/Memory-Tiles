let sltBox = 0;
let sltBox2 = 0;
let sltBox3 = 0;
let sltBox4 = 0;
let sltBox5 = 0;
let sltBox6 = 0;
let sltBox7 = 0;
let sltBox8 = 0;
let sltBox9 = 0;

let Ready = 0;
let lvlNum = 1;

//start action
function start() {
	document.getElementById("UI").style.display = "block";
	document.getElementById("lvl1").style.display = "block";
	document.getElementById("start").style.display = "none";	
}

//about action
function about() {
	document.getElementById("start").style.display = "none";
	document.getElementById("about").style.display = "block";
}

//restart
function restart() {
	//turn off lvls
	document.getElementById("lvl2").style.display = "none";
	document.getElementById("lvl3").style.display = "none";
	document.getElementById("lvl4").style.display = "none";
	document.getElementById("lvl5").style.display = "none";
	document.getElementById("lvl6").style.display = "none";
	document.getElementById("lvl1").style.display = "none";
	document.getElementById("UI").style.display = "none";

	//send to start
	
	document.getElementById("start").style.display = "block";
	document.getElementById("about").style.display = "none";

	reset(1,1);
}

//mouse pointer
let cursorLock = 0;

window.onmousemove = function (e) {
	const cursor = document.getElementById("cursor");
	const cursorClick = document.getElementById("cursor_click");

	var x = e.clientX,
		y = e.clientY;

	if (cursorLock === 0) {
		cursor.style.display = "block";
	} else {

	}
	cursor.style.top = (y - 6) + 'px';
	cursor.style.left = (x - 1) + 'px';
	cursorClick.style.top = (y - 2) + "px";
	cursorClick.style.left = (x - 2) +'px';

};

window.onmousedown = function(e) {
	const cursorClick = document.getElementById("cursor_click");
	const cursor = document.getElementById("cursor");
	cursorClick.style.display = "block";
	cursor.style.display = "none";

	cursorLock++;
}

window.onmouseup = function(e) {
	document.getElementById("cursor_click").style.display = "none";
	document.getElementById("cursor").style.display = "block";
	cursorLock--;
}

//reset variables
function reset(a,b) {
	lvl3Prt = 1;
	lvl4Prt = 1;
	lvl5Prt = 1;
	lvl6Prt = 1;

	if(a === 1) {
		score = 0;
		document.getElementById("score").innerText = score;
		ready = 0;
	}

	if (b === 1) {
		lvlNum = 1;
		document.getElementById("lvlIndc").innerText = "Level " + lvlNum;
	}
}

//scoring
let score = 0;
let highscore = 0;

function addScore() {
	score++;
	document.getElementById("score").innerText = score;

	if (score > highscore) {
		highscore = score;
		document.getElementById("highscore").innerText = highscore;
	}
}

//Level 1:
function lvl1() {
	reset();
	let num1 = Math.floor(Math.random()*4);
	const array = [0,1,2,3];
	const num1Lstd = array.indexOf(num1);
	if (num1Lstd > -1) {
		array.splice(num1Lstd,1);
	}

	document.getElementById(`1box${num1}`).style.backgroundColor = "red";
	document.getElementById(`1box${array[0]}`).style.backgroundColor = "black";
	document.getElementById(`1box${array[1]}`).style.backgroundColor = "black";
	document.getElementById(`1box${array[2]}`).style.backgroundColor = "black";

	setTimeout(function () {
		document.getElementById(`1box${num1}`).style.backgroundColor = "black";
		sltBox = `1box${num1}`;
		Ready = 1;
	}, 2000);
}

function isCor1(a) {
	if (Ready === 0) {

	} else if (a === sltBox) {
		Ready = 0;
		lvlNum++;
		document.getElementById("lvl1").style.display = "none";
		setTimeout(function() {document.getElementById("lvl2").style.display = "block";}, 750);
		document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
		reset();
		addScore();
	} else {
		Ready = 0;
		reset(1);
	}
}

//Level 2:
function lvl2() {
	reset();
	let num1 = Math.floor(Math.random()*4);
	const array = [0,1,2,3];
	const num1Lstd = array.indexOf(num1);
	if (num1Lstd > -1) {
		array.splice(num1Lstd,1);
	}

	document.getElementById(`2box${num1}`).style.backgroundColor = "red";
	document.getElementById(`2box${array[0]}`).style.backgroundColor = "black";
	document.getElementById(`2box${array[1]}`).style.backgroundColor = "black";
	document.getElementById(`2box${array[2]}`).style.backgroundColor = "black";

	setTimeout(function () {
		document.getElementById(`2box${num1}`).style.backgroundColor = "black";
		sltBox = `2box${num1}`;
		Ready = 1;
	}, 500);
}

function isCor2(a) {
	if (Ready === 0) {

	} else if (a === sltBox) {
		Ready = 0;
		lvlNum++;
		document.getElementById("lvl2").style.display = "none";
		setTimeout(function() {document.getElementById("lvl3").style.display = "block";}, 750)
		document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
		reset();
		addScore();
	} else {
		Ready = 0;
		lvlNum = 1;
		document.getElementById("lvl2").style.display = "none";
		setTimeout(function() {document.getElementById("lvl1").style.display = "block";}, 750)
		document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
		reset(1);
	}
}

//Level 3:
let lvl3Prt = 1;

function lvl3() {
	reset();

	let num1 = Math.floor(Math.random()*9);
   	let num2 = Math.floor(Math.random()*9);
	let num3 = Math.floor(Math.random()*9);
   
   //box 1
   document.getElementById(`3box${num1}`).style.backgroundColor = "red";
	setTimeout(function () {
		document.getElementById(`3box${num1}`).style.backgroundColor = "black";
		sltBox = `3box${num1}`;
	}, 500);
   
   //box 2
   setTimeout(function() {
      document.getElementById(`3box${num2}`).style.backgroundColor = "red";
   }, 1500);
	setTimeout(function () {
		document.getElementById(`3box${num2}`).style.backgroundColor = "black";
		sltBox2 = `3box${num2}`;
	}, 2000);
   
   //box 3
   setTimeout(function() {
      document.getElementById(`3box${num3}`).style.backgroundColor = "red";
   }, 3000);
	setTimeout(function () {
		document.getElementById(`3box${num3}`).style.backgroundColor = "black";
		sltBox3 = `3box${num3}`;
      Ready++;
	}, 3500);
}


function isCor3(a) {
   if (Ready === 1) {
      if (lvl3Prt === 1 && a === sltBox) {
         lvl3Prt++;
      } else if (lvl3Prt === 2 && a === sltBox2) {
         lvl3Prt++; 
      } else if (lvl3Prt === 3 && a === sltBox3) {
         Ready = 0;
         lvlNum++;
         document.getElementById("lvl3").style.display = "none";
         setTimeout(function() {document.getElementById("lvl4").style.display = "block";}, 750)
         document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
		 reset();
		 addScore();
      } else {
         Ready = 0;
         lvlNum = 1;
         document.getElementById("lvl3").style.display = "none";
         setTimeout(function() {document.getElementById("lvl1").style.display = "block";}, 750)
         document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
		 reset(1);
      }
   }
}

//Level 4:
let lvl4Prt = 1;

function lvl4() {
	reset();

	let num1 = Math.floor(Math.random()*9);
   	let num2 = Math.floor(Math.random()*9);
	let num3 = Math.floor(Math.random()*9);
	let num4 = Math.floor(Math.random()*9);
   
   //box 1
   document.getElementById(`4box${num1}`).style.backgroundColor = "red";
	setTimeout(function () {
		document.getElementById(`4box${num1}`).style.backgroundColor = "black";
		sltBox = `4box${num1}`;
	}, 500);
   
   //box 2
   setTimeout(function() {
      document.getElementById(`4box${num2}`).style.backgroundColor = "red";
   }, 1000);
	setTimeout(function () {
		document.getElementById(`4box${num2}`).style.backgroundColor = "black";
		sltBox2 = `4box${num2}`;
	}, 1500);
   
   //box 3
   setTimeout(function() {
      document.getElementById(`4box${num3}`).style.backgroundColor = "red";
   }, 2000);
	setTimeout(function () {
		document.getElementById(`4box${num3}`).style.backgroundColor = "black";
		sltBox3 = `4box${num3}`;
	}, 2500);
   
   //box 4
    setTimeout(function() {
      document.getElementById(`4box${num4}`).style.backgroundColor = "red";
   }, 3000);
	setTimeout(function () {
		document.getElementById(`4box${num4}`).style.backgroundColor = "black";
		sltBox4 = `4box${num4}`;
    	Ready++;
	}, 3500);
}


function isCor4(a) {
	if (Ready === 1) {
		if (lvl4Prt === 1 && a === sltBox) {
			lvl4Prt++;
		} else if (lvl4Prt === 2 && a === sltBox2) {
			lvl4Prt++;
		} else if (lvl4Prt === 3 && a === sltBox3) {
			lvl4Prt++;
		} else if (lvl4Prt === 4 && a === sltBox4) {
			Ready = 0;
			lvlNum++;
			document.getElementById("lvl4").style.display = "none";
			setTimeout(function() {document.getElementById("lvl5").style.display = "block";}, 750)
			document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
			reset();
			addScore();
		} else {
			Ready = 0;
			lvlNum = 1;
			document.getElementById("lvl4").style.display = "none";
			setTimeout(function() {document.getElementById("lvl1").style.display = "block";}, 750)
			document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
			reset(1);
		}
	}
}

//Level 5:
let lvl5Prt = 1;

function lvl5() {
	reset();

	let num1 = Math.floor(Math.random()*9);
	let num2 = Math.floor(Math.random()*9);
	let num3 = Math.floor(Math.random()*9);
	let num4 = Math.floor(Math.random()*9);
	let num5 = Math.floor(Math.random()*9);
	let num6 = Math.floor(Math.random()*9);
   
   //box 1
   document.getElementById(`5box${num1}`).style.backgroundColor = "red";
	setTimeout(function () {
		document.getElementById(`5box${num1}`).style.backgroundColor = "black";
		sltBox = `5box${num1}`;
	}, 500);
   
   //box 2
   setTimeout(function() {
    	document.getElementById(`5box${num2}`).style.backgroundColor = "red";
   }, 1000);
	setTimeout(function () {
		document.getElementById(`5box${num2}`).style.backgroundColor = "black";
		sltBox2 = `5box${num2}`;
	}, 1500);
   
	//box 3
   	setTimeout(function() {
      document.getElementById(`5box${num3}`).style.backgroundColor = "red";
   	}, 2000);
	setTimeout(function () {
		document.getElementById(`5box${num3}`).style.backgroundColor = "black";
		sltBox3 = `5box${num3}`;
	}, 2500);

	//box 4
	setTimeout(function() {
		document.getElementById(`5box${num4}`).style.backgroundColor = "red";
	}, 3000);
	setTimeout(function () {
		document.getElementById(`5box${num4}`).style.backgroundColor = "black";
		sltBox4 = `5box${num4}`;
	}, 3500);

	//box 5
	setTimeout(function() {
		document.getElementById(`5box${num5}`).style.backgroundColor = "red";
	}, 4000);
	setTimeout(function () {
		document.getElementById(`5box${num5}`).style.backgroundColor = "black";
		sltBox5 = `5box${num5}`;
	}, 4500);
  
   
   //box 6
    setTimeout(function() {
      document.getElementById(`5box${num6}`).style.backgroundColor = "red";
   }, 5000);
	setTimeout(function () {
		document.getElementById(`5box${num6}`).style.backgroundColor = "black";
		sltBox6 = `5box${num6}`;
    	Ready++;
	}, 5500);
}


function isCor5(a) {
	if (Ready === 1) {
		if (lvl5Prt === 1 && a === sltBox) {
			lvl5Prt++;
		} else if (lvl5Prt === 2 && a === sltBox2) {
			lvl5Prt++;
		} else if (lvl5Prt === 3 && a === sltBox3) {
			lvl5Prt++;
		} else if (lvl5Prt === 4 && a === sltBox4) {
			lvl5Prt++;
		} else if (lvl5Prt === 5 && a === sltBox5) {
			lvl5Prt++;
		} else if (lvl5Prt === 6 && a === sltBox6) {
			Ready = 0;
			lvlNum++;
			document.getElementById("lvl5").style.display = "none";
			setTimeout(function() {document.getElementById("lvl6").style.display = "block";}, 750);
			document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
			reset();
			addScore();
		} else {
			Ready = 0;
			lvlNum = 1;
			document.getElementById("lvl5").style.display = "none";
			setTimeout(function() {document.getElementById("lvl1").style.display = "block";}, 750);
			document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
			reset(1);
		}
	}
}

//Level 6:
let lvl6Prt = 1;

function lvl6() {
	reset();

	let num1 = Math.floor(Math.random()*9);
	let num2 = Math.floor(Math.random()*9);
	let num3 = Math.floor(Math.random()*9);
	let num4 = Math.floor(Math.random()*9);
	let num5 = Math.floor(Math.random()*9);
	let num6 = Math.floor(Math.random()*9);
	let num7 = Math.floor(Math.random()*9);
	let num8 = Math.floor(Math.random()*9);
	let num9 = Math.floor(Math.random()*9);

   //box 1
   document.getElementById(`6box${num1}`).style.backgroundColor = "red";
	setTimeout(function () {
		document.getElementById(`6box${num1}`).style.backgroundColor = "black";
		sltBox = `6box${num1}`;
	}, 500);
   
   //box 2
   setTimeout(function() {
    	document.getElementById(`6box${num2}`).style.backgroundColor = "red";
   }, 1000);
	setTimeout(function () {
		document.getElementById(`6box${num2}`).style.backgroundColor = "black";
		sltBox2 = `6box${num2}`;
	}, 1500);
   
	//box 3
   	setTimeout(function() {
      document.getElementById(`6box${num3}`).style.backgroundColor = "red";
   	}, 2000);
	setTimeout(function () {
		document.getElementById(`6box${num3}`).style.backgroundColor = "black";
		sltBox3 = `6box${num3}`;
	}, 2500);

	//box 4
	setTimeout(function() {
		document.getElementById(`6box${num4}`).style.backgroundColor = "red";
	}, 3000);
	setTimeout(function () {
		document.getElementById(`6box${num4}`).style.backgroundColor = "black";
		sltBox4 = `6box${num4}`;
	}, 3500);

	//box 5
	setTimeout(function() {
		document.getElementById(`6box${num5}`).style.backgroundColor = "red";
	}, 4000);
	setTimeout(function () {
		document.getElementById(`6box${num5}`).style.backgroundColor = "black";
		sltBox5 = `6box${num5}`;
	}, 4500);
  
   
   //box 6
    setTimeout(function() {
      document.getElementById(`6box${num6}`).style.backgroundColor = "red";
	}, 5000);
	setTimeout(function () {
		document.getElementById(`6box${num6}`).style.backgroundColor = "black";
		sltBox6 = `6box${num6}`;
	}, 5500);
   
   //box 7
   setTimeout(function() {
		document.getElementById(`6box${num7}`).style.backgroundColor = "red";
   }, 6000);
   setTimeout(function() {
		document.getElementById(`6box${num7}`).style.backgroundColor = "black";
		sltBox7 = `6box${num7}`;
   }, 6500);
   
   //box 8
   setTimeout(function() {
		document.getElementById(`6box${num8}`).style.backgroundColor = "red";
   }, 7000);
   setTimeout(function() {
		document.getElementById(`6box${num8}`).style.backgroundColor = "black";
		sltBox8 = `6box${num8}`;
		Ready++;
   }, 7500);
}


function isCor6(a) {
	if (Ready === 1) {
		if (lvl6Prt === 1 && a === sltBox) {
			lvl6Prt++;
		} else if (lvl6Prt === 2 && a === sltBox2) {
			lvl6Prt++;
		} else if (lvl6Prt === 3 && a === sltBox3) {
			lvl6Prt++;
		} else if (lvl6Prt === 4 && a === sltBox4) {
			lvl6Prt++;
		} else if (lvl6Prt === 5 && a === sltBox5) {
			lvl6Prt++;
		} else if (lvl6Prt === 6 && a === sltBox6) {
        	lvl6Prt++;
    	} else if (lvl6Prt === 7 && a === sltBox7) {
			lvl6Prt++;
		} else if (lvl6Prt === 8 && a === sltBox8) {
			reset();
			lvlNum++;
			document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
			ready = 0;
			addScore();
		} else {
			Ready = 0;
			lvlNum = 1;
			document.getElementById("lvl6").style.display = "none";
			setTimeout(function() {document.getElementById("lvl1").style.display = "block";}, 750);
			document.getElementById("lvlIndc").innerText = `Level ${lvlNum}`;
			reset(1);
		}
	}
}

//Copyrights: Niko Wolf