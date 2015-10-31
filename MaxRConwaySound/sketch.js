// CONWAY'S GAME OF LIFE
// http://en.wikipedia.org/wiki/Conway's_Game_of_Life
//
// this p5 sketch implements John Conway's Game of Life simulation
// as an image-processing system... it looks at pixels in an image
// and treats them as cells in a version of Conway's simulation.
//
// your tasks:
// (1) make this thing look more interesting... 
// hint: you don't have to display the image directly to the screen.
// another hint: you can draw other things (text, shapes, etc.) instead of the cells.
// (2) the RULES in the draw() loop determine how the simulation decides to keep a pixel
// alive or generate a new one from a dead pixel.  this rule set is sometimes referred to as
// B3/S23 (a pixel is "Born" with 3 neighbors and "Stays Alive" with 2 or 3 neighbors.
// tweak these rules and see if you can find other interesting (or self-sustaining) systems.
//
var letters = new Array("C","D","E","G","A","B","C","D","E","G","A","B","C"); //to be shown onscreen
var notes = new Array(48, 50, 52, 55, 57, 59, 60, 62, 64, 67, 69, 71, 72); //for the music
var mySound;
var threshold = 128;
var howwide = 16;
var howtall = 13;
var img = new Array(2); // this is gonna store two images
var whichimage = 0;
var letter = "C"; // to prevent empty variable 
var randthresh = 8;
var s = 1;
var lol = 2;
var menu = 0;
function preload() {
 mySound = loadSound('assets/reallyshortmarimba.wav'); //load the sound
// mySound = loadSound('http://www.wavsource.com/snds_2015-10-25_6238164372964857/movie_stars/davis/bargain_not.wav');
}

function setup() {
 mySound.setVolume(0.08); //don't hurt ears
 
  reverse(letters);
  reverse(notes);
  createCanvas(800, 800);
  var w = floor(width/howwide);
  var h = floor(height/howtall);
  img[0] = createImage(howwide, howtall);
  img[1] = createImage(howwide, howtall);
  noSmooth(); // don't smooth anything
  frameRate(8);
  textSize(20);
  textAlign(CENTER);
  
  randomize();
}

function draw() {

  background(60, 100, 255);
   
  img[whichimage].loadPixels(); // load pixels into memory
  img[1-whichimage].loadPixels(); // load pixels into memory
   if (mouseIsPressed === false && s == 1){ //if not drawing and not paused
  for (var i = 0; i < howwide; i++) {
    for (var j = 0; j < howtall; j++) {
      // read pixels from source image...
      // everything is b&w, so the red (array index 0) channel is fine:
      var p0 = img[whichimage].get(i-1, j-1)[0]>threshold; // upper left
      var p1 = img[whichimage].get(i, j-1)[0]>threshold; // upper mid
      var p2 = img[whichimage].get(i+1, j-1)[0]>threshold; // upper right
      var p3 = img[whichimage].get(i-1, j)[0]>threshold; // left
      var p4 = img[whichimage].get(i, j)[0]>threshold; // center pixel
      var p5 = img[whichimage].get(i+1, j)[0]>threshold; // right
      var p6 = img[whichimage].get(i-1, j+1)[0]>threshold; // lower left
      var p7 = img[whichimage].get(i, j+1)[0]>threshold; // lower mid
      var p8 = img[whichimage].get(i+1, j+1)[0]>threshold; // lower right
      var neighbors = p0+p1+p2+p3+p5+p6+p7+p8; // how many neighbors are alive?
      var result;
      
      // THESE ARE THE RULES FOR THE SIMULATION - 
      // by default, an alive cell stays alive if it has 2 or 3 live neighbors. OR JUST 2 IF YOU PRESS E
      // a dead cell becomes alive if it has three live neighbors. OR FOUR IF YOU PRESS R
      if(p4==1) // center pixel is alive
      {
        // if two or three live neighbors, keep alive; otherwise die.
        if((neighbors==2 && key !== "e") || neighbors==3) result = 1; else result = 0;
      }
      else // center pixel is DEAD
      {
        // if exactly three live neighbors, become alive; otherwise stay dead.
        if(neighbors==3 || (neighbors==4 && key === "r") ) result = 1; else result = 0;
       
      }
     // write pixels into destination image, scaled to 0 or 255:
      img[1-whichimage].set(i, j, color(result*255), color(result*255)); 
    }
  }
   }
  img[1-whichimage].updatePixels(); // update pixels on destination
   
 var w = floor(width/howwide);
  var h = floor(height/howtall);
   if (mouseIsPressed === false && s == 1){ //stop flipping if paused or drawing
  whichimage = 1-whichimage; // flip source and destination
   }
  
  
  img[whichimage].loadPixels(); // load pixels into memory
  img[1-whichimage].loadPixels(); // load pixels into memory
  //mySound.stop();
  for (var a = 0; a < howwide; a++) {
    for (var b = 0; b < howtall; b++) {
      var reala = map (a, 0, howwide, 0, width);
      var realb = map (b, 0, howtall, 0, height);
      var activepixel = img[whichimage].get(a, b)[0]>threshold;
      var lastpixel = img[1-whichimage].get(a, b)[0]>threshold;
      letter = letters[b];
      if (activepixel == 1){ //if cell is alive draw note text there
        if (lastpixel == 0){ //if cell is alive and it WASN'T last frame, play sound at pitch 
       var panning = map(a, 0, howwide,-1.0, 1.0);
        var freq = midiToFreq (notes[b]);
        var speed = freq/440;
        mySound.rate(speed); //pitch
        mySound.pan(panning); //stereo stuff
        mySound.play(); //plink!
        }
      text(letter,reala+w/2,realb+h/2); //text if alive
      }
      if (activepixel == 0)  rect(reala, realb, w, h, 20); //rectangle if dead
    }
  //}
  }
  if (menu == 0){ //menu stuff
   rect (0, 0, width, 100);
   text ("hold r for B34/S23 - hold e for B3/S3 - click/drag to draw", width/2, 30);
   text ("tap c for clear - tap space to randomize - tap p to toggle pause", width/2, 50);
   text ("tap m to toggle menu", width/2, 70);
   text ("turn on your sound!", width/2, 90);
 }

}


function mouseClicked()
{
  fillatmouse();
}

function mouseDragged()
{
  fillatmouse();
}

function keyReleased() // blow out the image with new stuff
{
  var randthresh = 8;
  if (key === "P") s = 1-s; //toggle pause
  if (key === "M") menu = 1-menu; //toggle menu
  if (key !== "R" && key !== "E" && key !== "P" && key !== "M"){ //don't clear for various keys
  randomize();
  }
}

// this completely recreates the simulation with binary noise (cells are on or off)
function randomize()
{
  
    if (key === "C") randthresh = 10; else randthresh = 8;// 80% of pixels will be dead unless c was pressed.
  img[whichimage].loadPixels(); // load pixels into memory
  img[1-whichimage].loadPixels(); // load pixels into memory
  for (var i = 0; i < img[whichimage].width; i++) {
    for (var j = 0; j < img[whichimage].height; j++) {
      var r = random(10)>randthresh; // true or false?
      var thecolor = color(r*255);
      img[whichimage].set(i, j, thecolor, thecolor);
      img[1-whichimage].set(i, j, thecolor, thecolor);
    }
  }
  img[whichimage].updatePixels(); // update pixels
  img[1-whichimage].updatePixels(); // update pixels

}

// set a pixel at the mouse position to ON
function fillatmouse()
{
  img[whichimage].loadPixels();
  var thex = floor(mouseX/(width/howwide));
  var they = floor(mouseY/(height/howtall));
  img[whichimage].set(thex, they, color(255));
  img[whichimage].updatePixels();
  
}