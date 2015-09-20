var r, g, b, a, d; // GLOBAL variables

function setup() {
  createCanvas(1280, 800); // sets up the size of the canvas
  r = random(128, 200);  
  g = random(128, 200);  
  b = random(128, 200);
  background(r, g, b);
 
  frameRate(15);
  // draw rectangles where coordinates are the center, not the edge:
  ellipseMode(CENTER); 
  strokeWeight(4);
 
}

function draw() {
 
  fill(r, g, b, 4);
  noStroke();
  rect(0, 0, width, height); //gradually clear
  
 
  
    
    var numbursts = floor(sqrt((mouseX-pmouseX)*(mouseX-pmouseX)+(mouseY-pmouseY)*(mouseY-pmouseY))); // determine number of bursts based on mouse movement
 
  for (var i = 0; i<numbursts; i++)
{
  
  d = random(numbursts, 3*numbursts ); //set line length and ellipse size
  a = map(i, 0, numbursts, 0, TWO_PI); //set angles of each line
  
  stroke(random(50,255), random(50,255), random(50,255)); //random color for lines and edges
  line (mouseX, mouseY, mouseX + floor(d * cos(a)), mouseY + floor(d * sin(a)));
  ellipse(mouseX + floor(d * cos(a)), mouseY + floor(d * sin(a)), d / random(5,15), d / random(5,15));
  
  

}
}
 function keyReleased() //clear if key is released
{
  
  
  background(255);
   r = random(128, 200);  
  g = random(128, 200);  
  b = random(128, 200);

}