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
circle3.visible = false;//Sprint 2
circle3.pathCount = 0;
circles.push(circle3)



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
     //alert("Self");
     var count = getPathcCount(checkIn.circle_x,checkIn.circle_y);
     //alert(count);
     if(count < 2){
         var alreadyCreated = false;
    
    path.onClick = function(event) {
            if(!alreadyCreated){
                alreadyCreated = true;
                var circle = new Path.Circle(new Point(event.point.x, event.point.y), 20);
                circle.fillColor = 'purple';
                circle.visible = false;//Sprint 2
                circle.pathCount = 2;
                circles.push(circle);
                circle.visible = true;
                updateNoOfPaths(checkIn.circle_x,checkIn.circle_y);
            }
            
		};
     }
     //path.removeEventListener('click');
 }else{
      var alreadyCreated = false;
    
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
            
		};
 }
        
	if(!checkIn.status || pathCrossed || checkNoOfPaths(checkIn.circle_x,checkIn.circle_y)){
        //console.log("REMOVEEEEEEEEEE");
		path.remove()
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
    //Sprint 2: Player's Move
    if(currentPlayer == player1){
        textItem.fillColor = 'darkblue';
        currentPlayer = player2;
        textItem.content = player2 + "'s turn";
    }else{
        textItem.fillColor = 'green';   
        currentPlayer = player1;
        textItem.content = player1 + "'s turn";
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


//Adding for Sprint 2: Text message saying the turn of the user.
var textItem = new PointText({
	content: player1 + "'s turn",
    point: (20,30),
	fillColor: 'green',
    fontSize: 20,
    fontWeight: 10,
    visible: false,
});
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
        textItem.visible = true;
    }
}