//SO MANY VARIABLES but some are junk from experiments that failed
var bpm = 131;
var barlength = 240/bpm;
var quarterlength = barlength/4;
var totalbars = 100;
console.log(barlength);
var lastbartime = 1;
var bartime = 0;
var lastbeattime = 1;
var beattime = 0;
//var offset = 100;
var totaltime = 0;
var barcount = 0;
var currentbar = [];
var lastbar = [];
//var twobarsago = [];
var now = [];
var last = [];
var clicks = [];
var oldclicks = [];
var clicksspaced = [];
var oldclicksspaced = [];
var timeoffset = 1/15;
var offsetaverage = 0;
var newbeats = 0;
var samebeats = 0;
var newrests = 0;
var samerests = 0;
var newbars = 0;
var samebars = 0;
var stalebars = 0; //barstaleness as property of bar, as multiplier
var counterposition = 0;
var staleness = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var accuracyscore = 0;
var accuracy = "";
var distance = 0;
var distanceright = 0;
var distanceleft = 0;
var numerator = 0;
var denominator = 0;
var barscore = 0;
var sames = 0;
var lastscores = [];
var lasthowlates = [];
var avglastscores = 0;
var avglasthowlates = 0;
var scorewindow = 16;
var offsetwindow = 4;
var level = 0;
var aggregatebarscore = 0;
var totalscoresinwindow = 0;
var totaloffsetsinwindow = 0;
var neutralscore = 0.5;
var totalscore = 0;
var multiplier = 1;
var multipliedaggregatebarscore = 0;
var sizemultiplier = 1;
var gameover = 1;
var highestbarscore = 0;
var opacityoldnotes = 255;
//DO I NEED THIS MANY COUNTING VARIABLES??????
var a, b, c, d, e, f, g, h, k, n, m, o, p, q, r, s, t, u, v;
var badimpulse = 0;
var goodimpulse = 0;
var blueimpulse=0;
var goodsustain = 0;
var badsustain = 0;
var timesincelevel = 0;
var soundlevel = 0;
var timing = 0;
var avgtiming = 0;
var division = 16;
var beatlength = 1/division;
var divisionmap;
var eightgrid = [];
var twelvegrid = [];
var sixteengrid = [];
var countdown = 0;
var counttext = 3;
var counttime = 0;
var i = 0;
var j = 0;
var y = 1;
var spr;
var notesprites = new Group();
var oldnotesprites = new Group();
var guidelines = new Group();
var levelcount = new Group();
var originalwidth;
var originalheight;
var filter;
var filteranalyze;
var colorcycle = 0;
var oldcolorcycle = 128;
var rotationdirection = 1;
var pause = 1;
function setup() {
  mySound = loadSound('say goodbye.mp3',load,draw);
  //mySound = loadSound('feverdreams.wav',load,draw);
  console.log(timeoffset);
 //filter = new p5.LowPass();
   createCanvas(windowWidth, windowHeight);
   originalwidth = windowWidth;
   originalheight = windowHeight;
   resetscores();
   console.log(beatlength/4);
init();
}

function load(){
  console.log(mySound.sampleRate());
}
function mousePressed(){
  if (mySound.isPlaying()){ 
  currentbar[i] = mySound.currentTime()%barlength-1/15;
  //console.log(currentbar[i]);
  //blueimpulse=50;
  i = i + 1;
  return false;
 }
 if (mySound.isLoaded()==true && mySound.isPlaying()==false){
      mySound.play(barlength);
      countdown = 8;
      pause = 0;
      if(gameover == 1){
        level = 0;
        levels();
        totalscore = 0;
        highestbarscore = 0;
        resetscores();
        resetoffset();
        init();
        gameover = 0;
      }
 }
  
}


function draw() {
  if (mySound.isPlaying()){
    lastbartime = bartime;
  bartime = mySound.currentTime()%barlength;
  lastbeattime = beattime;
  beattime = mySound.currentTime()%quarterlength;
  //console.log((bartime/barlength)%beatlength);
  if ((bartime-lastbartime)<0 && bartime !== 0){
    
    //run a function that changes and sets the cues
    
    //console.log(bartime);
    
    //twobarsago = lastbar;
    lastbar = currentbar;
    currentbar = [];
    //console.log(currentbar);
    //(done) if last keypress in bar is more than 31/32 of the way through the bar, put it as a negative number in the current bar
    if (lastbar[(lastbar.length) - 1] > ((2*division-1)*barlength)/(2*division)){
      currentbar[0] = lastbar.pop()-barlength;
      i = 1;
    }
    else{i = 0;}
    //console.log(twobarsago);
    //console.log(lastbar);
    evaluation();
    barcount +=1;
  }
  soundlevel = mySound.getLevel(0.8);
  if (soundlevel > 0.15){
    soundlevel = soundlevel - 0.15;
   
  }else if (soundlevel <= 0.15){soundlevel = 0;}
   if (soundlevel > 0.15){
    colorcycle = (colorcycle+5)%360;
  }
  //oldcolorcycle = (colorcycle+128)%360;
  //console.log(soundlevel);
   totaltime = barcount*barlength;
  //console.log(totaltime);
  //var sixteenthtime = bartime%beatlength;
 var whichsixteenth = (bartime/barlength)/beatlength;

  }
if ((beattime-lastbeattime)<0 && beattime !== 0){
  rotationdirection*=0-1;
}

background(0+badimpulse+badsustain,0+goodimpulse,0+blueimpulse+goodsustain);

if (badimpulse>0){
  badimpulse/=1.1;
}
if (goodimpulse>0){
  goodimpulse/=1.1;
}
if (blueimpulse>0){
  blueimpulse/=1.4;
}
fill(255,255,255,128);
rect(windowWidth*whichsixteenth/division+(windowWidth/(2*division)),windowHeight/2,30,windowHeight);

drawSprites(guidelines);
for (n = 0; n < notesprites.length; n++){
notesprites[n].rotationSpeed=rotationdirection*720*soundlevel*sizemultiplier;
notesprites[n].scale=1+soundlevel*2*sizemultiplier;
notesprites[n].shapeColor=color(127*sin(colorcycle)+128,127*sin(colorcycle+120)+128, 127*sin(colorcycle+240),255);
if (bartime >barlength/32){
notesprites[n].position.y=notesprites[n].position.y-(notesprites[n].position.y-height/4)/16;
}
}
for (n = 0; n < oldnotesprites.length; n++){
oldnotesprites[n].rotationSpeed=rotationdirection*720*soundlevel*sizemultiplier;
oldnotesprites[n].scale=1+soundlevel*2*sizemultiplier;
oldnotesprites[n].shapeColor=color(127*sin(colorcycle+120)+128,127*sin(colorcycle+240)+128, 127*sin(colorcycle),opacityoldnotes);
if (bartime > barlength/32){
  opacityoldnotes/=1.02;
}
}
for (t = 0; t < levelcount.length; t++){
levelcount[t].scale=1+timesincelevel/10;
}
if (timesincelevel>0){
  timesincelevel-=1;
}
drawSprites(levelcount);
drawSprites(notesprites);
drawSprites(oldnotesprites);
fill(188);
//text("Last Bar:",width/8,height/2-height/12);
text("Last Bar:",width/8,height/4-height/12);
//text("newbeats: " + newbeats + " samebeats: " + samebeats + " newrests: " + newrests + " samerests: " + samerests + " accuracyscore: " + accuracyscore + " multiplier: " + multiplier, width/2, 3*height/4);
//text("BARSCORE: " + barscore + " AGGREGATE: " + aggregatebarscore + " AVERAGELASTSCORES: " + avglastscores, width/2, 5*height/6);
text("BARSCORE: " + barscore.toFixed(2) + " ACCURACY: " + accuracyscore.toFixed(2) + " AGGREGATE: " + aggregatebarscore.toFixed(2), width/2, 5*height/6);
text("LEVEL:",width/2,height/16);
if (mySound.isLoaded()==false){
  background(0);
}
if (mySound.isPlaying()==false && mySound.isLoaded()==true){
  //fill(255,255,255);
  if (!bartime){
    //background(0);
  text('press enter to play', width/2, height/2);
  text('just tap any key however you want! try to make good stuff happen!', width/2, 3*height/4);
  }
  if (pause == 0){
    background(0);
    text('total score: ' + totalscore, width/2, height/2);
    text('highest aggregate bar score: ' + highestbarscore, width/2, height/4);
    gameover = 1;
  }
}
if (countdown>0){
  if(countdown == 8){
  counttime = millis();
  }
  if(counttext !== 4 && counttext !== 0 && counttext !== (0-1)){
  text(counttext, width/2,height/2);
  }
   countdown = floor(5-(millis()-counttime)/(1000*quarterlength)-0.3);
   counttext = countdown-1;
   if (countdown == 1){
     counttext = "GO";
   }
  
}
}
function keyPressed(){
  //omg like pile up a bunch of sprites haha
 if (mySound.isPlaying() && keyCode !== ENTER){ 
  currentbar[i] = mySound.currentTime()%barlength-timeoffset;
  //blueimpulse=50;
  //console.log(currentbar[i]);
  i = i + 1;
  return false;
 }
 if (keyCode == ENTER){
     if (mySound.isLoaded()==true){
 if (mySound.isPlaying() ) {
   if (countdown == 0){
      mySound.pause();
      pause = 1;
   }
    } else {
      mySound.play(barlength);
      countdown = 8;
      pause = 0;
      if(gameover == 1){
        level = 0;
        levels();
        totalscore = 0;
        highestbarscore = 0;
        resetscores();
        resetoffset();
        init();
        gameover = 0;
      }
    }
  }
 }
}


function evaluation(){
//convert array times into fraction of bar
last = now;
now = [];
for (d = 0; d<lastbar.length; d++){
  now[d] = lastbar[d]/barlength;
}

//console.log(last);
//console.log(now);
//split up smartly (31/32) into four equal-length(time), same-offset sections (subtract a quarter bar each new section)
//evaluate which grid fits best to each (smallest total of absolute differences for each note in bar (not in grid)), assign them
//evaluate how well each section fits to its assigned grid (absolute time differences added (maybe weighted average to punish bad))
oldclicks = clicks;
clicks = [];
//PREVENT MORE THAN ONE IN A BEAT SLOT (done)
//console.log(now);
//FIX THIS
var howlate = 0;
for (e = 0; e<now.length; e++){
 var keytime = now[e]%beatlength;
  var beat = round(now[e]/beatlength);
  if(keytime > beatlength/2)
  {
    keytime = keytime - beatlength;
    beat = beat;
  }
  var foo = {};
  foo.beat = beat;
  //foo.keytime = round(60*keytime)/60;
  if (abs(keytime)<beatlength/4){
    howlate = howlate+keytime;
    foo.keytime = 0;
  }else if (abs(keytime)>=beatlength/4){
    howlate = howlate + keytime;
  foo.keytime = beatlength/2;
  }
  var lastelement = clicks[clicks.length-1];
  if (typeof lastelement !== 'undefined')
  {
  if (foo.beat == lastelement.beat)
  {
    clicks.pop();
    //console.log(lastelement);
  }
  }
  clicks.push(foo);
  
}
console.log(clicks);
timing = 0;
for (o = 0; o<clicks.length; o++){
  timing = timing + abs(clicks[o].keytime);
}
avgtiming = 1/(60*(timing/clicks.length));
//if (avgtiming>0){
 // offset = offset + 1;
//}
//if (avgtiming < 0){
//  offset = offset - 1;
//}
//console.log(offset);
console.log(avgtiming);
var maxpossiblescore = clicks.length;
//var worstpossiblescore = maxpossiblescore/(2*maxpossiblescore-1);
if (avgtiming !== Infinity && avgtiming && avgtiming<(2*maxpossiblescore) && avgtiming>=(0.999)){
  console.log("not null");
  accuracyscore = log(avgtiming)/log(2*maxpossiblescore);
  //accuracy = "great";
}else{
  if (avgtiming == Infinity || avgtiming >=(2*maxpossiblescore)){
    accuracyscore = 1;
    //accuracy = "excellent";
  }
  if (!avgtiming){
    accuracyscore = 0;
    //accuracy = "?";
  }
  if (avgtiming <(0.999)){
    accuracyscore = (4*(pow(avgtiming,2)-1)/3)/1; //a silly way to scale innacuracy more evenly across negative values
    //accuracyscore = log(avgtiming)/log(2*maxpossiblescore);
  }
}

  //console.log(oldclicks);
  oldclicksspaced = clicksspaced;
  clicksspaced = [];
  clicksspaced.length = division;
  for (f = 0; f<clicksspaced.length; f++){
    clicksspaced[f]=0;
  }
  for (f = 0; f<clicks.length; f++){
    clicksspaced[clicks[f].beat]=1;
  }
  console.log(clicksspaced);
  console.log(oldclicksspaced);
     
  makenewsprites();
//new rules
sames = 0;
numerator = 0;
denominator = 0;
distance = 0;
barscore = 0;
aggregatebarscore = 0;
distanceright = 0;
distanceleft = 0;
for (m = 0; m < clicksspaced.length; m++){
  if (clicksspaced[m] == 1 && oldclicksspaced[m] == 1){
    sames +=1;
  }
  if (clicksspaced[m] == 1 && oldclicksspaced[m] == 0){
    denominator +=1;
    n = 0;
    do{
      n++;
    }
    while (oldclicksspaced[m+n]==0);
    if (oldclicksspaced[m+n]){
    distanceright = n;
    }else{distanceright = 0};
        n = 0;
    do{
      n--;
    }
    while (oldclicksspaced[m+n]==0);
      if (oldclicksspaced[m+n]){
    distanceleft = 0-n;
    }else{distanceleft = 0};
    if (distanceright == distanceleft){
      distance = (distanceright+distanceleft)/2;
    }
    
    if (distanceright > distanceleft){
      if (distanceleft>0){
      distance = distanceleft;
      }else{distance = distanceright;}
      
    }
    if (distanceright < distanceleft){
      if (distanceright>0){
      distance = distanceright;
      }else{distance = distanceleft;}
      
    }
    numerator += distance;
  }
  
}
denominator+=abs(numerator-sames);
if (denominator == 0){
  denominator = 1;
}
barscore = numerator/denominator; //my special barscore algorithm, which i should like, patent or something
//if (accuracyscore<(0-0.001)){
  //aggregatebarscore=accuracyscore/(barscore+1);
//}else if(accuracyscore>=(0-0.001)){
//aggregatebarscore = accuracyscore*barscore;
//}
aggregatebarscore = ((accuracyscore+barscore)+(accuracyscore*barscore))/2; //mix together accuracy and creativity
multipliedaggregatebarscore=multiplier*aggregatebarscore;
if(aggregatebarscore > highestbarscore){
  highestbarscore = aggregatebarscore;
}
totalscore+=multipliedaggregatebarscore;
bigscore();
shorttermvisualfeedback();
colorcycle = colorcycle+240;
console.log(barscore);
console.log(numerator);
console.log(denominator);
//evaluate how different it is from last bar (did you fill the same beats?)
newbeats = 0;
samebeats = 0;
newrests = 0;
samerests = 0;
for (k = 0; k < clicksspaced.length; k++){
  if (clicksspaced[k] == 1 && oldclicksspaced[k] == 0){
    newbeats +=1;
    
  }
   if (clicksspaced[k] == 1 && oldclicksspaced[k] == 1){
    samebeats +=1;
    //staleness[k] +=1;
  }
   if (clicksspaced[k] == 0 && oldclicksspaced[k] == 1){
    newrests +=1;
  }
   if (clicksspaced[k] == 0 && oldclicksspaced[k] == 0){
    samerests +=1;
  }
}
if (newbeats+samebeats>0){
offsetaverage = (howlate*barlength)/(newbeats+samebeats);
}
bigoffset();
//if here now and not before, newbeat
//if here now and here before, samebeat
//if not here now and here before, newrest
//if not here now and not here before, samerest
//evaluate how similar it is to last bar (did you fill the same beats? (what about rests?))
}
function shorttermvisualfeedback(){
  if (aggregatebarscore>1){
    goodimpulse=100+(aggregatebarscore-1)*20;
  }
  if (aggregatebarscore<(0-0.001)){
    badimpulse=100-(aggregatebarscore)*60;
  }
}
function bigscore(){ //WEIGHTED AVERAGE OF A MOVING WINDOW OF PREVIOUS SCORES
  totalscoresinwindow = 0;
  lastscores.shift();
  lastscores.push(aggregatebarscore);
  for (q = 0; q<scorewindow; q++){
    totalscoresinwindow+=((q+1)*lastscores[q]);
  }
  avglastscores = totalscoresinwindow/(((scorewindow)*(scorewindow+1))/2);
  console.log(lastscores);
  if (avglastscores>=0.5){
    goodsustain=(avglastscores-0.5)*300;
  }
  if(avglastscores<0.5){
    badsustain = (0.5-avglastscores)*300;
  }
  //take out first value, shift all left, add new aggregatebarscore
  //average em out to get avglastscores (weighted average)
  //if new level, increment or decrement level and then call resetscores, call levels
  if (avglastscores>1){
    level+=1;
    levels();
  }
   if (avglastscores<0.25){
    level-=1;
    levels();
  }
}
function bigoffset(){ //DYNAMIC MOVING OFFSET WINDOW TO KEEP STUFF SYNCED UP WITH THE LATE/EARLINESS OF THE PLAYER
  totaloffsetsinwindow = 0;
 //lasthowlates[(lasthowlates.length)-1] = lasthowlates[(lasthowlates.length)-1]-avglasthowlates;
  lasthowlates.shift();
  lasthowlates.push(offsetaverage);
  for (u = 0; u<offsetwindow; u++){
    //totaloffsetsinwindow+=((u+1)*lasthowlates[u]);
    totaloffsetsinwindow+=(lasthowlates[u]);
    //lasthowlates[u] = lasthowlates[u]-avglasthowlates/barlength;
  }
  
  //avglasthowlates = (totaloffsetsinwindow/offsetwindow)/(((offsetwindow)*(offsetwindow+1))/2) - avglasthowlates;
  avglasthowlates = totaloffsetsinwindow/offsetwindow - avglasthowlates;
  timeoffset = timeoffset+avglasthowlates;
  //if (timeoffset>barlength/24){
  //  timeoffset = barlength/24;
  //}
  if (timeoffset<0){
    
    timeoffset+=barlength/division;
  }
  console.log(timeoffset);
  console.log(lasthowlates);
}
function resetscores(){
  for (p = 0; p<scorewindow; p++){
    lastscores[p]=neutralscore;
  }
    //do an avglastscores
    totalscoresinwindow = 0;
    for (q = 0; q<scorewindow; q++){
    totalscoresinwindow+=lastscores[q];
  
  avglastscores = totalscoresinwindow/scorewindow;
  }
}
function resetoffset(){
  offset = 1/15;
  var defaultlates = 0;
  
  for (u = 0; u<offsetwindow; u++){
    lasthowlates[u]=defaultlates;
  }
    //do an avglastscores
    totaloffsetsinwindow = 0;
    for (v = 0; v<offsetwindow; v++){
    totaloffsetsinwindow+=lasthowlates[v];
  
  avglasthowlates = totaloffsetsinwindow/offsetwindow;
  
  }
  timeoffset = offset;
}
function levels(){
  goodsustain=0;
  badsustain=0;
  resetscores();
  sizemultiplier = pow(1.2,level);
  if (level >= 0){
  multiplier = level+1;
  }else if(level<0){
    multiplier = 1/(abs(level)+1);
  }
  var numberoflevels = levelcount.length;
  for (r = 0; r<numberoflevels; r++){
 levelcount[0].remove();
  }
  for (s = 0; s < abs(level); s++){
  
  if (level > 0){
    var dots = createSprite((s*windowWidth/((abs(level)))+windowWidth/(2*(abs(level))))/2+windowWidth/4, windowHeight/10, 25, 25);
  dots.shapeColor = color(0,255,0);
  }else{
    var dots = createSprite((s*windowWidth/((abs(level)))+windowWidth/(2*(abs(level))))/2+windowWidth/4, windowHeight/10, 25, 25);
    dots.shapeColor = color(255,0,0);
  }
  levelcount.add(dots);
  }
  timesincelevel = 60;
  //if level = what, what's the behavior, multiplier, visuals
}
function makenewsprites(){
  opacityoldnotes=255;
  var numberofnotes = notesprites.length;
  for (h = 0; h<numberofnotes; h++){
 notesprites[0].remove();
  }
   var numberofoldnotes = oldnotesprites.length;
  for (h = 0; h<numberofoldnotes; h++){
 oldnotesprites[0].remove();
  }
  
  for (g = 0; g<clicksspaced.length; g++){
    if (clicksspaced[g]==1){
    var spr = createSprite(width*g/division+width/(2*division),height/2,30,30);
    spr.shapeColor = color(255);
    notesprites.add(spr);
    
    }
    if (oldclicksspaced[g]==1){
    var spr = createSprite(width*g/(division)+width/(2*division),height/4,30,30);
    spr.shapeColor = color(255);
    oldnotesprites.add(spr);
    
    }
  }
   
}
function windowResized() {
  
 init();
 //resizeCanvas(windowWidth, windowHeight);
}
function init(){ 
  resizeCanvas(windowWidth, windowHeight);
  translate(0-(windowWidth/2-originalwidth/2), 0-(windowHeight/2-originalheight/2)); //WHY DO I HAVE TO DO THIS LOL
     background(0);
     textFont("Georgia");
  noStroke();
  
 frameRate(60);
  fill(255,255,255,128);
  textAlign(CENTER);
  textSize(30);
  rectMode(CENTER);
  angleMode(DEGREES);
    var numberofsprites = allSprites.length;
  for (h = 0; h<numberofsprites; h++){
 allSprites[0].remove();
  }
  
  for (a = 0; a < division; a++){
  var guides = createSprite(windowWidth*a/division+(windowWidth/(2*division)), windowHeight/2, 10, windowHeight);
  if (a%4 == 0){
  guides.shapeColor = color(255);
  }else{
    guides.shapeColor = color(127);
  }
  guidelines.add(guides);
  }
  var numberoflevels = levelcount.length;
  for (r = 0; r<numberoflevels; r++){
 levelcount[0].remove();
  }
  for (s = 0; s < abs(level); s++){
  
  if (level > 0){
    var dots = createSprite((s*windowWidth/((abs(level)))+windowWidth/(2*(abs(level))))/2+windowWidth/4, windowHeight/10, 25, 25);
  dots.shapeColor = color(0,255,0);
  }else{
    var dots = createSprite((s*windowWidth/((abs(level)))+windowWidth/(2*(abs(level))))/2+windowWidth/4, windowHeight/10, 25, 25);
    dots.shapeColor = color(255,0,0);
  }
  levelcount.add(dots);
  }
}
//make VISUALIZER AUDIO first then use events to change scene