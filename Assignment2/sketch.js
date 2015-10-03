
//THE ERROR CAUSE ME TO HAVE TO MAKE ONE BIG STRING
var raw = "they took all the trees and put them in a tree museum then they charged all the people a dollar and a half just to see them don't it always seem to go that you don't know what you got till its gone they paved paradise and put up a parking lot from the ants in our petunia bed to the crab grass in our lawn we will fight them off with chemicals till the bugs and weeds are gone we will use quarts and quarts of poison sprays and we won't stop till we're thru the bugs and weeds are dying now but the plants and trees are too coming this christmas to a theater near you the most horrifying film to hit the screen there's a homicidal maniac who finds a cub scout troop and he hacks up two or three in every scene please don't reveal the secret ending to your friends don't spoil the the big surprise you won't believe your eyes when you see nature trail to hell nature trail to hell nature trail to hell in 3 d nature trail to hell nature trail to hell nature trail to hell in 3 d see severed heads that almost fall right in your lap see that bloody hatchet coming right at you no you'll never see hideous effects like these again till we bring you nature trail to hell part ii so bring the kids along it's good clean family fun what have you got to lose if you like the six o'clock news then you'll like nature trail to hell nature trail to hell nature trail to hell in 3 d nature trail to hell nature trail to hell nature trail to hell in 3 d if everybody had an ocean across the u s a then everybody be surfing like californi a once a jolly swagman camped by a billabong under the shade of a coolibah tree and he sang as he watched and waited till his billy boiled you'll come a waltzing matilda with me waltzing matilda waltzing matilda you'll come a waltzing matilda with me and he sang as he watched and waited till his billy boiled you'll come a waltzing matilda with me down came a jumbuck to drink at that billabong up jumped the swagman and grabbed him with glee and he sang as he shoved that jumbuck in his tuckerbag you'll come a waltzing matilda with me waltzing matilda waltzing matilda you'll come a waltzing matilda with me and he sang as he shoved that jumbuck in his tuckerbag you'll come a waltzing matilda with me up rode the squatter mounted on his thoroughbred down came the troopers one two three whose that jolly jumbuck you've got in your tuckerbag you'll come a waltzing matilda with me waltzing matilda waltzing matilda you'll come a waltzing matilda with me whose that jolly jumbuck you've got in your tuckerbag you'll come a waltzing matilda with me up jumped the swagman and sprang into the billabong you'll never catch me alive said he and his ghost may be heard as you pass by that billabong you'll come a waltzing matilda with me waltzing matilda waltzing matilda you'll come a waltzing matilda with me and his ghost may be heard as you pass by that billabong you'll come a waltzing matilda with me how many roads must a man walk down before you call him a man how many seas must the white dove sail before she can sleep in the sand and how many times must the cannonballs fly before they are forever banded the answer my friend is blowin in the wind the answer is blowin in the wind"; // this is gonna hold the text file
//var raw = "hi how are you";
var alice;
var thenotes = [60, 62, 65, 66, 68, 69, 71, 72]; // c major somehow
var thewords = new Array();
var theline = new Array();
var thechain = {}; // new JSON


var thecurrentword = 'jolly';
var k = 0;
var xpos = 20;
var ypos = 30;
var myVoice = new p5.Speech(); // new P5.Speech object
var iptr = 0; // a counter for the words
//function preload() {
  // ignore the bullshit error that happens when you do this:
  //alice = ["hi guys"];
 //alice = split(raw, ' ');
  //alice = loadStrings('./data/lyrics_cooked.txt');
//}

function setup() {
  alice = split(raw, ' '); //string to array
   console.log(alice);
  createCanvas(windowWidth, windowHeight);
  frameRate(1);

  var bigstring = ""; // the WHOLE BOOK in one HUGE STRING
  // concatenate whole book into one string:
  for (var i = 0; i<alice.length; i++)
  {
    bigstring+=alice[i]+" ";
  }
  thewords = bigstring.split(' ');
//myVoice.speak('shit!!!');
  domarkov();
}

function draw() {
  //background(255);
 
   var whichnote = round(map(mouseY, 0, height-1, 0, 7)); //vertical note chooser
  var thefreq = midiToFreq(thenotes[whichnote]); //note to frequency
  textSize(32);
  console.log(thecurrentword);
  text(thecurrentword, xpos, ypos);
  theline[k]=thecurrentword;
  xpos = xpos + textWidth(thecurrentword + ' ');
   myVoice.setVoice("Zarvox"); //tones
	  myVoice.interrupt = 1; // now it's more interactive
	  myVoice.setPitch(thefreq/440);
	  
  	myVoice.setRate(map(mouseX, 0, width-1, 1.0, 2.0));
	  myVoice.speak(thecurrentword);
  if(k==7) //new line after 8 words
  {
    xpos = 20;
    ypos = ypos + 36;
    k = -1;
   
	  

  }
  if(ypos>height) {
    background(255);
    ypos = 30;
  }
  thecurrentword = pickword(thecurrentword);
k = k+1;
}


function pickword(n)
{
  var pick = floor(random(0, thechain[n].length));
  return(thechain[n][pick]);
}

function domarkov()
{
  for(var i = 0;i<thewords.length;i++)
  {
    if(!thechain[thewords[i]]) { // isn't there yet
        //console.log(thewords[i] + " ain't there yet... adding... " + thewords[(i+1)%thewords.length]);
        thechain[thewords[i]] = new Array();
        thechain[thewords[i]][0] = thewords[(i+1)%thewords.length];
      }
      else { // it's there already
        thechain[thewords[i]].push(thewords[(i+1)%thewords.length]);
        //console.log("adding " + thewords[(i+1)%thewords.length] + " to " + thewords[i]);
      }
  }


}

