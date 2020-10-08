let input, button, title, designer, restart; 
//let BackgroundImage;
var bgx, bgy, bgw, bgh;
var c1, c2;
let bg;
var slider; 
let redRec, greenRec, blueRec;

var radius = 45;
//var circles = [];
//let msg = [];

let BannerColor = '#C0C0C0';
//let BackgroundColor = '#262626';
 let BackgroundColor = '#726a9e';
 
 //Sky Blue '#87CEEB'
let MainTextColor = '#FFFFFF'
let BubbleTextColor = BackgroundColor

let shared;
function preload() {
  partyConnect(
    "wss://syntaxbackup2.herokuapp.com",
    "hello_party",
    "main"
  );
  shared = partyLoadShared("shared");
}



function setup() {
    // BackgroundImage = loadImage ('Background Test 1.png');
     bg = loadImage('dream.png');

   //slider 
    slider = createSlider(0, 255, 112);
    slider2 = createSlider(0, 255, 100);
    slider3 = createSlider(0, 255, 154);

    slider.position(775, 715);
    slider.style('width', '80px');
  
    slider2.position(775, 740);
    slider2.style('width', '80px');
  
    slider3.position(775, 765);
    slider3.style('width', '80px');
  
    shared.x = shared.x || 0;
    shared.y = shared.y || 0;
    shared.circles = shared.circles || [];
    shared.msg =  shared.msg ||  [];
    shared.title = shared.title || '';
    shared.author = shared.author || '';

  createCanvas(1240,800);  
  ellipseMode(RADIUS);
  
  bgCircle1 = new backgroundCircle();
  bgCircle2 = new backgroundCircle();
  bgCircle3 = new backgroundCircle();
  bgCircle4 = new backgroundCircle();
  bgCircle5 = new backgroundCircle();
  bgCircle6 = new backgroundCircle();
  bgCircle7 = new backgroundCircle();

  
    //WRITE 
  //BUTTON
  
    
  input = createInput().attribute('maxlength', 15);
  input.position(40, height-50);
  input.style('background-color','#EDA8ED');
  input.style('border','none');
  input.style('border-radius', '10px');
  input.style('padding','3px 10px');
  input.size(200) 
  
  bubbleButton = createButton('Write');
  bubbleButton.style('color','white');
  bubbleButton.style('background-color','#CF6BCF');
  bubbleButton.style('border','none');
  // bubbleButton.style('padding','3px 10px');
  bubbleButton.style('border-radius', '10px');
  bubbleButton.position(input.width-bubbleButton.width+43, height-48.5);
  // bubbleButton.position(input.x + input.width, windowHeight-50);
  bubbleButton.mousePressed(write);
  textFont('Helvetica');
  //changed to "poem"*****
  poem = createElement('h3', '');  //ZS Commented Out
  poem.style('color','#fff');
  poem.style('font-family','Helvetica');
  poem.position(width+200, height+200);
  
  
  
  
  // TITLE 
  //INPUT
  titleInput = createInput().attribute('maxlength', 20);
  titleInput.size(215) 
  titleInput.style('color','white');
  titleInput.style('background-color','#B5E6D1');
  titleInput.style('border','none');
  titleInput.style('padding','3px 10px');
  titleInput.style('border-radius', '10px'); 
  titleInput.position (width-titleInput.width-50, height-85); 
  //BUTTON
  titleButton = createButton('Add Title');
  titleButton.position(width-titleButton.width-35, height-83);
  titleButton.style('color','white');
  titleButton.style('background-color','#5EBF8A');
  titleButton.style('border','none');
  // titleButton.style('padding','3px 10px');
  titleButton.style('border-radius', '10px'); 
  titleButton.mousePressed(drawTitle);

  
  
  // AUTHOR
  //INPUT
  authorInput = createInput().attribute('maxlength', 20);
  authorInput.size(215) 
  authorInput.style('color','white');
  authorInput.style('background-color','#B5E6D1');
  authorInput.style('border','none');
  authorInput.style('padding','3px 10px');  //4px padding
  authorInput.style('border-radius', '10px');
  authorInput.position (width-authorInput.width-50, height-50);  
  // BUTTON
  authorButton = createButton('Add Authors');
  authorButton.position(width-authorButton.width-35, height-48.5);
  authorButton.style('color','white');
  authorButton.style('background-color','#5EBF8A');
  authorButton.style('border','none');
  // authorButton.style('padding','3px 10px');
  authorButton.style('border-radius', '10px');  //ROUNDED CORNERS
  authorButton.mousePressed(drawAuthor);

  
  
  // SAVE
  // BUTTON
  saveButton = createButton('Save Image');
  saveButton.style('color','white');
  saveButton.style('background-color','#555555');
  saveButton.style('border','none');
  saveButton.style('padding','3px 10px');
  saveButton.style('border-radius', '10px');
  saveButton.position((width/2)-saveButton.width/2,    height-85);
   //Centered Save Button
  saveButton.mousePressed(save);
  
  
  
  //clear all msg & circle array 
  restart = createButton('Clear All');
  restart.style('color','white');
  restart.style('background-color','#555555');
  restart.style('border','none');
  restart.style('padding','3px 10px');
  restart.style('border-radius', '10px');
restart.position((width/2)-restart.width/2, height-50);
  restart.mousePressed(restartDraw);
  textAlign(CENTER,CENTER);  //***ZS, more centered on bubble
  textSize(15);
  
  //red 
  redRec = createButton('');
  redRec.style('color','white');
  redRec.style('background-color','#cc3631');
  redRec.style('border','none');
  redRec.style('padding','5px 5px');
  redRec.style('border-radius', '20px');
  redRec.position(745, 720);
  
  //green
  greenRec = createButton('');
  greenRec.style('color','white');
  greenRec.style('background-color','#42c260');
  greenRec.style('border','none');
  greenRec.style('padding','5px 5px');
  greenRec.style('border-radius', '20px');
  greenRec.position(745, 745);
  
  //blue
  blueRec = createButton('');
  blueRec.style('color','white');
  blueRec.style('background-color','#3954cc');
  blueRec.style('border','none');
  blueRec.style('padding','5px 5px');
  blueRec.style('border-radius', '20px');
  blueRec.position(745, 770);
  
  
}



//clear all msg & circle array 
function restartDraw(){
  shared.msg = [];
  shared.circles = [];
  
}


function write() {
  const content = input.value();
  shared.msg.push(input.value());
  poem.html(); //Changed to poem *******
  input.value('');
  console.log(shared.msg);
  
  if(content.length > 0 && content.length < 4){
  shared.circles.push ({x: 160, y: height-115, r: 25, color:' #c77f7f',  text: shared.msg, active: false});
  }
  else if (content.length >= 4 && content.length <= 8){
     shared.circles.push ({x: 160, y: height-115, r: 38, color:' #c77f7f',  text: shared.msg, active: false});
  }
  else if (content.length > 8 && content.length < 12){
     shared.circles.push ({x: 160, y: height-115, r: 55, color:' #c77f7f',  text: shared.msg, active: false});
  }
  else if (content.length >= 12 && content.length <= 15){
     shared.circles.push ({x: 160, y: height-115, r: 65, color:' #c77f7f',  text: shared.msg, active: false});
  }
}



function drawTitle() {
    shared.title = titleInput.value();
}
  

function drawAuthor() {
    shared.author = authorInput.value();
}


function draw() {
   background(bg);
  //background(BackgroundColor); 
  
  // image(BackgroundImage, 0, 0);
  // BackgroundImage.resize(width, height);
  
   // bgCircle1.show();
   // bgCircle2.show();
   // bgCircle3.show();
   // bgCircle4.show();
   // bgCircle5.show();
   // bgCircle6.show();
   // bgCircle7.show();
  
 // start of slider
	var red = slider.value();
	var green = slider2.value();
	var blue = slider3.value();
	rectMode(CENTER)
	noStroke()
	background(red,green,blue,50);
   
  //red
//   fill(204, 54, 49)
//   rect(750, 725, 10,10)
//  // rect(880, 725, 10,10)
//   textSize(15);
//   fill(0)
//   //text('red', 20, 130)
//  // text(red, 880, 725)

//   //green
//   fill(78, 207, 106)
//   rect(750, 750, 10,10)
//  // rect(880, 750, 10,10)
//   textSize(15);
//   fill(0)
//  // text('gre', 20, 95)
//   //text(green, 150, 95)

  
 //   //blue
 //  fill(39, 133, 227)
 //  rect(750, 775, 10,10)
 // // rect(880, 775, 10,10)
 //  textSize(15);
 //  fill(0)
 // // text('blu', 20, 135)
 //  //text(blue, 150, 135)

  //end of slider

  //ZS ADDED 10/6
  push();
  fill(102, 208, 149);
  textFont('Helvetica');
  textAlign(LEFT);
  textSize(50);
  text(shared.title, 25, 50);
  textSize(25);
  textStyle(ITALIC);
  text(shared.author, 25, 90);
  pop();

  
   if (shared.circles.length > 0) {
     
       
     fill(255, 245, 91, 200);
     
     var circleStart = shared.circles[0];
     
     ellipse(width/2, height/2, 60, 60);
     // shared.circles[0].x = windowWidth/2;
     // shared.circles[0].y = windowHeight/2,
      //  shared.circles[0].r = 60,
     fill('#ffffff');
     textFont('Helvetica');
     textSize(15);    
     noStroke();
     text(circleStart.text[0],width/2, height/2);
      
	for (var i = 1; i < shared.circles.length; i++) {
	var circle = shared.circles[i];
	noStroke();
         
    if(circle.x < width/2 && circle.y < height/2) {                            
    fill(circle.x/2,255, circle.y/2,200)
}
    else if(circle.x > width/2 && circle.y < height/2){                       
    fill(circle.x/2,circle.y/2,255,200)
}
    else if(circle.x < width/2 && circle.y > height/2) {                              
    fill(255,circle.x/2,circle.y/2,200)
}
    else if(circle.x > width/2 && circle.y > height/2) {                              
    fill(100,circle.x/2,circle.y/2,100)
}
            
    else{
    fill(circle.color);  
}
      
      ellipse(circle.x, circle.y, circle.r,circle.r);
      fill('#ffffff');
      textFont('Helvetica');
      textSize(15);    
      text(circle.text[i],circle.x,circle.y);
        
    }
  }  
}



// Run when the mouse/touch is down.
function mousePressed() {
   shared.x = mouseX;
   shared.y = mouseY;
	if (shared.circles.length > 0) {
		for (var i = 0; i < shared.circles.length; i++) {
		var circle = shared.circles[i], distance = dist(shared.x, shared.y,shared.circles[i].x, shared.circles[i].y);
			
        if (distance < radius) {
			circle.active = true;
            console.log(shared.circles[i].x,shared.circles[i].y);
		    shared.circles[i].color = '#d6a3a3';
			} else {
				shared.circles[i].active = false;
				shared.circles[i].color = '#c77f7f';
			}
		}
	}
  // Prevent default functionality.
  //return false;
}

// // Run when the mouse/touch is dragging.
// function mouseDragged() {
  
//    var overlapping = false; 
  
//    shared.x = mouseX;
//    shared.y = mouseY;
// 	if (shared.circles.length > 0) {
// 		for (var i = 0; i < shared.circles.length; i++) {
// 			var circle = shared.circles[i];
// 			if (shared.circles[i].active) {
//               //check overlapping
//                for (var t= 0; t< shared.circles.length; t++){
//                 // console.log("inside");
//                  console.log("i: "+ i);
//                  console.log("t: "+ t);
//                  if(i!=t){
//                    console.log("inside");
//                  var other = shared.circles[t];
//                    console.log(circle);
//                    console.log(other);
//                    var d = dist(circle.x, circle.y, other.x, other.y);
//                     console.log(d);
//                    var sum = circle.r + other.r;
//                    console.log("sum:" + sum);
//                    if (d < circle.r + other.r){
//                      overlapping = true;
                     
//                      break;
//                    }
              
//                  } 
//                }
//              console.log(overlapping);
//              if(overlapping == false){
//              // update coordinate 
// 				shared.circles[i].x =  shared.x;
// 				shared.circles[i].y =  shared.y;
// 				break;
//               }
// 			}
// 		}
// 	}
//   // Prevent default functionality.
//   //return false;
// }

//original codes
function mouseDragged() {
   shared.x = mouseX;
   shared.y = mouseY;
	if (shared.circles.length > 0) {
		for (var i = 0; i < shared.circles.length; i++) {
			var circle = shared.circles[i];
			if (shared.circles[i].active) {
				shared.circles[i].x =  shared.x;
				shared.circles[i].y =  shared.y;
				break;
			}
		}
	}
 // Prevent default functionality.
 // return false;
  
} 
  
  function saveImage() {
    
  ProjectImage = createImage(windowWidth, windowHeight);
  save(ProjectImage, 'myImage.png');
}
