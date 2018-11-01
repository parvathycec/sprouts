//Sprint 2: User's names
var player1 = 'Player 1';//default name
var player2 = 'Player 2';//default name
var currentPlayer = player1;

//list of circles in the canvas
var circles = []

//this function checks if the user has touched inside the circle
function checkInCircle(x, y){
	for (var i = 0; i < 2; i++) {
		console.log('circles[i] ', circles[i].bounds.center._x)
		circle_x = circles[i].bounds.center._x
		circle_y = circles[i].bounds.center._y
		rad = 25
		if ((x - circle_x) * (x - circle_x) + 
			(y - circle_y) * (y - circle_y) <= rad * rad) 
        return true; 
	}
	return false; 
}
//creating the initial circles
var circle1 = new Path.Circle(new Point(200, 150), 15);
circle1.fillColor = 'red';
circle1.visible = false;//Sprint 2
circles.push(circle1)
var circle2 = new Path.Circle(new Point(400, 300), 15);
circle2.fillColor = 'red';
circle2.visible = false;//Sprint 2
circles.push(circle2)

//defining the curve
var path = new Path(); //created new path object.


//event handling on mouse down
function onMouseDown(event) {
	console.log(checkInCircle(event.point.x, event.point.y))
	if(!checkInCircle(event.point.x, event.point.y)){
		return;
	}
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
	console.log(path)
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
     //if the curve is connecting two dots, it is a valid move, else no
	if(!checkInCircle(event.point.x, event.point.y)){
        //console.log("REMOVEEEEEEEEEE");
		path.remove()
		return;
	}

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
    textGameStarts.fontSize += 0.5;
    if(event.count == 120){
        textGameStarts.visible = false;
        circle1.visible = true;
        circle2.visible = true;
        textItem.visible = true;
    }
}
