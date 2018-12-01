//changes by sushmitha starts
function getParam( name )
{
 name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)";
 var regex = new RegExp( regexS );
 var results = regex.exec( window.location.href );
 if( results == null )
  return "";
else
 return results[1];
}

//Sprint 3 - for status bar
var statusContentList = [];
var statusAreaList = [];
var rectList = [];
//Sprint 3 - changes after client review
var turnStatus = true;
// instruction text at th bottom of the canvas starts
var instructionText = new PointText(new Point(400, 550));
instructionText.content = "";
instructionText.fontSize = 15;
instructionText.fontWeight= 10;
instructionText.fillColor = 'black';
instructionText.visible=false;
// instruction text at th bottom of the canvas ends
var turnText = new PointText(new Point(1000, 50));

//Sprint 2: User's names
var player1 = getParam('player1')

var player2 = getParam('player2')

if(player1 == ""){
    player1 = 'Player 1';//default name
}
if(player2 == ""){
    player2 = 'Player 2';//default name
}
//changes by sushmitha ends
var currentPlayer = player1;


//list of circles in the canvas
var circles = []

//
var pathCrossed = false;

var startingCircleX="";
var startingCircleY="";

/* this function used for random number within range */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//this function checks if the user has touched inside the circle
function checkInCircle(x, y){
    console.log("inside checkInCircle x-"+x+" y-"+y);
	for (var i = 0; i < circles.length ; i++) {
		console.log('circles[i] ', circles[i].bounds.center._x)
		circle_x = circles[i].bounds.center._x
		circle_y = circles[i].bounds.center._y
		rad = 25
		if ((x - circle_x) * (x - circle_x) + 
			(y - circle_y) * (y - circle_y) <= rad * rad) 
        return {"status":true,"circle_x":circle_x,"circle_y":circle_y}; // modified with status and circle points
	}
	return {"status":false}; 
}

 

//creating the initial circles
//var circle1 = new Path.Circle(new Point(getRandomInt(200,500), getRandomInt(150,200)), 25);
var circle1 = new Path.Circle(new Point(200, 150), 25);
circle1.fillColor = 'red';
circle1.visible = false;//Sprint 2
circle1.pathCount = 0;
circles.push(circle1)
//var circle2 = new Path.Circle(new Point(getRandomInt(400,600), getRandomInt(300,400)), 25);
var circle2 = new Path.Circle(new Point(400, 300), 25);
circle2.fillColor = 'red';
circle2.visible = false;//Sprint 2
circle2.pathCount = 0;
circles.push(circle2)
//var circle3 = new Path.Circle(new Point(getRandomInt(400,600), getRandomInt(300,400)), 25);
var circle3 = new Path.Circle(new Point(600, 250), 25);
circle3.fillColor = 'red';
circle3.visible = false;//Sprint 3
circle3.pathCount = 0;
circles.push(circle3)
//var circle4 = new Path.Circle(new Point(getRandomInt(500,700), getRandomInt(300,400)), 25);
var circle4 = new Path.Circle(new Point(800, 400), 25);
circle4.fillColor = 'red';
circle4.visible = false;//Sprint 3
circle4.pathCount = 0;
circles.push(circle4)



//defining the curve
var path = new Path(); //created new path object.


//event handling on mouse down
function onMouseDown(event) {
    pathCrossed = false;
	
    var checkIn = {};
    checkIn = checkInCircle(event.point.x, event.point.y);
	if(!checkIn.status){
		return;
	}
    startingCircleX = checkIn.circle_x;
    startingCircleY = checkIn.circle_y;
    
	// If we produced a path before, deselect it:
	if (path) {
		path.selected = false;
	}
	console.log('event ', event.point)
	// Create a new path and set its stroke color to green for Player 1:
	path = new Path({
		segments: [event.point],
		strokeWidth: 6
		// Select the path, so we can see its segment points:
		//fullySelected: true
	});
    //Sprint 2: player based color 
    if(currentPlayer == player1){
        path.strokeColor = 'green';
    }else{
        path.strokeColor = 'darkblue';
    }
	console.log("Path:-"+path);
    
   /* var alreadyCreated = false;
    
    path.onClick = function(event) {
            if(!alreadyCreated){
                alreadyCreated = true;
                var circle = new Path.Circle(new Point(event.point.x, event.point.y), 20);
                circle.fillColor = 'purple';
                circle.visible = false;//Sprint 2
                circle.pathCount = 2;
                circles.push(circle);
                circle.visible = true;
            }
            
		};*/
    path.onMouseDrag = function(event) {
        console.log("stop");
        //alert("stop");
        pathCrossed = true;
    }
    
    
    
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
    //console.log(path);
    if(path != 0) {  //condition to check path exists or not
        path.add(event.point);
    }
	

	// Update the content of the text item to show how many
	// segments it has:
}


// When the mouse is released, we simplify the path:
function onMouseUp(event) {
    if(path !=0){ //condition to check path exists or not
     //if the curve is connecting two dots, it is a valid move, else 
        
    var checkIn = {};
        
    checkIn = checkInCircle(event.point.x, event.point.y);
        
 if(checkIn.circle_x == startingCircleX && checkIn.circle_y == startingCircleY){
     updateNoOfPaths(checkIn.circle_x,checkIn.circle_y);
     //alert("Self");
     var count = getPathcCount(checkIn.circle_x,checkIn.circle_y);
     //alert(count);
     if(count < 2){
         var alreadyCreated = false;
    
    path.onClick = function(event) {
            if(checkGameOver()){
                return;
            }
            if(!alreadyCreated){
                alreadyCreated = true;
                var circle = new Path.Circle(new Point(event.point.x, event.point.y), 20);
                circle.fillColor = 'purple';
                circle.visible = false;//Sprint 2
                circle.pathCount = 2;
                circles.push(circle);
                circle.visible = true;
                updateNoOfPaths(checkIn.circle_x,checkIn.circle_y);
                //Sprint 3: status bar on the right
                //remove all existing status bar for updating
                removeStatusBar();
                //add status bar
                addStatusBar();
                turnStatus = true;
                instructionText.content = "";
            }
            
		};
     }
     //path.removeEventListener('click');
 }else{
      var alreadyCreated = false;
    
    path.onClick = function(event) {
            if(checkGameOver()){
                return;
            }
            if(!alreadyCreated){
                alreadyCreated = true;
                var circle = new Path.Circle(new Point(event.point.x, event.point.y), 20);
                circle.fillColor = 'purple';
                circle.visible = false;//Sprint 2
                circle.pathCount = 2;
                circles.push(circle);
                circle.visible = true;
                //Sprint 3: status bar on the right
                //remove all existing status bar for updating
                removeStatusBar();
                //add status bar
                addStatusBar();
                turnStatus = true;
                instructionText.content = "";
            }
            
		};
 }
        
	if(!checkIn.status || pathCrossed || checkNoOfPaths(checkIn.circle_x,checkIn.circle_y)){
        //console.log("REMOVEEEEEEEEEE");
		path.remove()
		return;
	}
    //Sprint 3- hightlight bug issue fixed
    if(path.curves.length == 0){//Jay, pls check if it is impacting anything.
        return;    
    }
    updateNoOfPaths(checkIn.circle_x,checkIn.circle_y);

	var segmentCount = path.segments.length;

	// When the mouse is released, simplify it:
	path.simplify(10);

	// Select the path, so we can see its segments:
	//path.fullySelected = true;

	var newSegmentCount = path.segments.length;
	var difference = segmentCount - newSegmentCount;
	var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
	path = 0;   
   if(checkIn.circle_x == startingCircleX && checkIn.circle_y == startingCircleY){

        //for self loop, pass over the turn to next person without waiting for the dot to be put in the loop
        //Sprint 3: status bar on the right
        //remove all existing status bar for updating
        removeStatusBar();
        //add status bar
        addStatusBar();
        turnStatus = true;
        instructionText.content = "";
    }else{
        turnStatus = false;  
        instructionText.content = "INSTRUCTION: Put a dot in the connection you made.";
    }
    //Sprint 2: highlighting circle with pathcount ge 3
    highlight();
    if(checkGameOver()){
        removeStatusBar();
        addStatusBar();
    }
}
}

function checkNoOfPaths(x,y){
    for (var i = 0; i < circles.length ; i++) {
        
        if(circles[i].bounds.center._x == x && circles[i].bounds.center._y == y) {
           
            
            console.log( "start : "+circles[i].pathCount);
            if(circles[i].pathCount === 3) 
            return true;
        }
        
        if(circles[i].bounds.center._x == startingCircleX && circles[i].bounds.center._y == startingCircleY){
            
            console.log( "end : "+circles[i].pathCount);
            if(circles[i].pathCount === 3) 
            return true;
        } 
           
            
        
        
    }
    
    return false;
}

function updateNoOfPaths(x,y){
    
   for (var i = 0; i < circles.length ; i++) {
       
        if(circles[i].bounds.center._x == x && circles[i].bounds.center._y == y) {
           
           circles[i].pathCount = circles[i].pathCount + 1; 
            console.log( "start : "+circles[i].pathCount);
        }
           
        if(startingCircleX !=x && startingCircleY !=y){
           if(circles[i].bounds.center._x == startingCircleX && circles[i].bounds.center._y == startingCircleY) 
           circles[i].pathCount = circles[i].pathCount + 1;
            console.log( "end : "+circles[i].pathCount);
           }
        
       
    } 
    
}

function getPathcCount(x,y){

    for (var i = 0; i < circles.length ; i++) {
        
        if(circles[i].bounds.center._x == x && circles[i].bounds.center._y == y) {

            return circles[i].pathCount;
        }
    }
}

//var rectForText = new Path.Rectangle(50,30,120,30);
//rectForText.opacity = 0.5;
//rectForText.fillColor = 'yellow';


//Sprint 2: Game starts text message
var textGameStarts = new PointText({
	content: "GAME STARTS",
	justification: 'center',
    point: view.center,
	fillColor: 'green',
    fontSize: 10,
    fontWeight: 10
});

//Sprint 2: animation for game starts text
function onFrame(event) {
	textGameStarts.fillColor.hue += 1;
    textGameStarts.fontSize += 0.4;
    if(event.count == 160){
        textGameStarts.visible = false;
        circle1.visible = true;
        circle2.visible = true;
        circle3.visible = true;
        circle4.visible = true;
        currentPlayer = player1;
        turnContent = {fillColor:'green', content:' Game starts!! ' + player1 + "'s turn. "};
        insertTurnText(turnContent);
        instructionText.visible = true;
    }
}

//Sprint 3: 
//Function to insert Player turn text in the right top of canvas
function insertTurnText(turnContent){
    turnText.content = turnContent.content;
    turnText.fontSize = 20;
    turnText.fontWeight= 10;
    turnText.fillColor = 'white';
    var rect = new Path.Rectangle(turnText.bounds, new Size(10, 10));
    rect.fillColor = turnContent.fillColor;
    turnText.insertAbove(rect);
    rectList.push(rect);
}
//Sprint 3:
//Function to remove the status bar in the left on every mouse up.
function removeStatusBar(){
    for(var i=0;i<statusAreaList.length;i++){
        statusAreaList[i].remove();
    }
    for(var i=0; i<rectList.length; i++){
        rectList[i].remove();
    }
    turnText.remove();
}

//Sprint 3:
//Function to insert status content bar 
function insertStatusContentList(){
    var point = new Point(1000, 80);
	for (var i=statusContentList.length-1; i>=0; i--){
        var statusText = new PointText(point);
        statusText.content = statusContentList[i].content;
        statusText.fontSize = 20;
        statusText.fillColor = 'white';
        statusText.fontWeight= 10;
        var rect = new Path.Rectangle(statusText.bounds, new Size(10, 10));
        rect.fillColor = statusContentList[i].fillColor;
        statusText.insertAbove(rect);
        statusAreaList.push(statusText);
        rectList.push(rect);
        point = point + { x: 0, y: 30 };
    }
}

//Sprint 3: highlight circle with connection ge 3
function highlight(){
	for (var i = 0; i < circles.length ; i++) {
        console.log('Path count >> ', circles[i].pathCount)
        if(circles[i].pathCount >= 3){
            circles[i].strokeColor = 'orange';
            circles[i].strokeWidth = 10;
        }
    }
}

//Sprint 3: check if game over and who is the winner
function checkGameOver(){
    var allCirclesHighlighted = true;
    for(var i=0; i<circles.length; i++){
        if(circles[i].pathCount < 3){
            allCirclesHighlighted = false;
            break;
        }
    }  
    return allCirclesHighlighted;
}
//Sprint 3: changes after client review
function addStatusBar(){
    //create status of the latest event (who made the move)
    var statusContent = {content:'', fillColor:'lightblue'};
    if(statusContentList.length == 0){
       statusContent.content =' ' + currentPlayer + ' started the game. ';
        
    }else{
        statusContent.content = ' ' + currentPlayer + " made a move. ";
    }
	//set the color based on current player
    if(currentPlayer == player1){
        statusContent.fillColor = 'green';
    }else{
        statusContent.fillColor = 'darkBlue';
    }
	//add the status to a list
    statusContentList.push(statusContent);
     //Sprint 3: check if game is over
    if(!checkGameOver()){
       if(currentPlayer == player1){
            turnContent.fillColor = 'darkblue';
            currentPlayer = player2;
            turnContent.content = ' ' + player2 + "'s turn. ";
        }else{
            turnContent.fillColor = 'green';   
            currentPlayer = player1;
            turnContent.content = ' ' + player1 + "'s turn. ";
        }
    }else{
        turnContent.fillColor = 'orange';
        turnContent.content = ' ' + currentPlayer + " is the WINNER! ";
        if(currentPlayer == player1){
            currentPlayer = player2;
        }else{
            currentPlayer = player1;
        }
        instructionText.content = "";
        document.getElementById('btnNewGame').style.visibility = 'visible';
    } 
    //Sprint 3
	insertStatusContentList();
    insertTurnText(turnContent);
}
