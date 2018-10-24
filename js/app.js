//list of circles in the canvas
circles = []

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
circles.push(circle1)
var circle2 = new Path.Circle(new Point(400, 300), 15);
circle2.fillColor = 'red';
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
	// Create a new path and set its stroke color to black:
	path = new Path({
		segments: [event.point],
		strokeColor: 'black',
		strokeWidth: 6
		// Select the path, so we can see its segment points:
		//fullySelected: true
	});
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
    }
}