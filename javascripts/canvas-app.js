// PingPong namespace
var PingPong = PingPong || {};

PingPong.Position = function(x, y) {
	this.x = x;
	this.y = y;
} // Position
	
PingPong.Size = function(w, h){
	this.width = w;
	this.height = h;
} // Size	
	
PingPong.Table = function(color, x, y, w, h) {
	this.color = color;
	this.position = new PingPong.Position(x, y);
	this.size = new PingPong.Size(w, h);
} // Table

PingPong.Ball = function(color, x, y, angle, radius) {
	this.color = color;
	this.position = new PingPong.Position(x, y);
	this.angle = angle;
	this.radius = radius;
} // Ball	

PingPong.BallDirection = function(radians, xunits, yunits) {
	this.radians = radians;
	this.xunits = xunits;
	this.yunits = yunits;
} // BallDirection
	
PingPong.canvasApp = function() {
	var Debugger = function() {};
	Debugger.log = function(message) {
		try {
			console.log(message);
		} catch (exception) {
			return;
		}
	};
	
	if (!Modernizr.canvas) {
		Debugger.log('Canvas is not supported');
		return;
	}				
				
	/*
	options: 
	 -- canvasElementId: We use document.getElementById('') to locate the canvas html element
	 -- canvasWidth 
	 -- canvasHeight 
	 -- canvasFillColor
	 -- tableWidth:      The ping-pong moving tables have a width and height 
	 -- tableHeight 
	 -- tableLeftOffset:  How far from the left edge of the canvas, the left table will be 
	 -- tableRightOffset: How far from the right edge of the canvas, the right table will be 
	 -- leftTableColor 
	 -- rightTableColor 
	 -- ballUpdateInterval: How often we calculate the new position of the ball 
	 -- ballMoveJump:       How far away in pixels, we move ball, from one iteration to the next. Hence, the actual speed of the ball,
							depends both on 'ballUpdateInterval' and 'ballMoveJump'
	 -- ballColor 
	 -- ballRadius
	 -- ballStartingAngle
	 */
	function Application(options) {							
		var canvas = document.getElementById(options['canvasElementId']);
		canvas.width = options['canvasWidth'];
		canvas.height = options['canvasHeight'];
		var context = canvas.getContext('2d');
		
		// This is the ball that will be travelling from left to right and back
		var ball = new PingPong.Ball(options['ballColor'], canvas.width / 2, canvas.height / 2, options['ballStartingAngle'], options['ballRadius']);
		// This will hold the mouse position at runtime
		var mousePosition = new PingPong.Position(0, 0);	
		
		// The left and right tables
		var tables = new Array();
		tables.push(new PingPong.Table(options['leftTableColor'], 0 + options['tableLeftOffset'], 0, options['tableWidth'], options['tableHeight']));
		tables.push(new PingPong.Table(options['rightTableColor'], canvas.width - options['tableRightOffset'] - options['tableWidth'], 0, options['tableWidth'], options['tableHeight']));			    				    

		var updateBallTimerId = 0; // the timer that is used to update the ball position
		
		var calculateBallDirection = function() {
			var radians = ball.angle * Math.PI / 180;
			return new PingPong.BallDirection(radians,
									          Math.cos(radians) * options['ballMoveJump'],
									          Math.sin(radians) * options['ballMoveJump']);
		}; // calculateBallDirection ()
		
		var onMouseMove = function(e) {
			mousePosition.x = e.clientX-canvas.offsetLeft;
			mousePosition.y = e.clientY-canvas.offsetTop;
			// Calculate the new table vertical position
			tables[0].position.y = mousePosition.y - tables[0].size.height / 2;
			tables[1].position.y = mousePosition.y - tables[1].size.height / 2;					   
	   
			drawScreen();		
		}; // onMouseMove
		
		// This is the main drawing function. Draws everything. Needs to be called whenever something
		// changes and we need to redraw the whole canvas
		var drawScreen = function () {
			fillCanvas();
			drawTables();					
			drawBall();
		}; // drawScreen
		
		var fillCanvas = function () {
			context.fillStyle = options['canvasFillColor'];
			context.fillRect(0, 0, canvas.width, canvas.height);
		}; // fillCanvas
		
		var drawTables = function() {
			drawTable(0);
			drawTable(1);	
		}; // drawTables 
		
		var drawTable = function(tableIndex) {
			context.fillStyle = tables[tableIndex].color;
			context.fillRect(tables[tableIndex].position.x, tables[tableIndex].position.y, tables[tableIndex].size.width, tables[tableIndex].size.height);
		};		
		
		var drawBall = function() {
			context.fillStyle = ball.color;
			context.beginPath();
			context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2, true);
			context.closePath();
			context.fill();	
		} // drawBall()
		
		var displayGameOver = function() {
			context.fillStyle = "Red";					
			context.font = "30px _sans";
			var message = "Game Over";
			var metrics = context.measureText(message);
			context.fillText(message, (canvas.width - metrics.width)/2, canvas.height / 2);
		} // displayGameOver()
		
		var updateBall = function() {
		   // Calculate the new ball position
		   var ballDirection = calculateBallDirection();
		   ball.position.x += ballDirection.xunits;
		   ball.position.y += ballDirection.yunits;
		   if (ball.position.x + ball.radius < tables[0].position.x + tables[0].size.width || ball.position.x - ball.radius > tables[1].position.x) {
			    // this is a game over situation
				displayGameOver();
				clearInterval(updateBallTimerId);
				canvas.removeEventListener('mousemove', onMouseMove, true);
				return;
		   } else if ( ball.position.x + ball.radius >= tables[1].position.x && ball.position.x - ball.radius <= tables[1].position.x + tables[1].size.width &&
				       ball.position.y + ball.radius >= tables[1].position.y && ball.position.y - ball.radius <= tables[1].position.y + tables[1].size.height        
				       ||
				       ball.position.x - ball.radius <= tables[0].position.x + tables[0].size.width && ball.position.x + ball.radius >= tables[0].position.x &&
				       ball.position.y + ball.radius >= tables[0].position.y && ball.position.y - ball.radius <= tables[0].position.y + tables[0].size.height
				) {						
				ball.angle = 180 - ball.angle;
			} else if (ball.position.y + ball.radius > canvas.height || ball.position.y - ball.radius <= 0) {
				ball.angle = 360 - ball.angle;
			} 
			drawScreen();  				    						
		} // updateBall()
			
		// The public main() function of the application.
		this.main = function () {					
			drawScreen();						
			canvas.addEventListener('mousemove', onMouseMove, true);			    
			updateBallTimerId = setInterval(updateBall, options['ballUpdateInterval']);	
		}; // main
						
	} // ApplicationConfiguration							
	//------------ end of CLASS declarations -------------------------------------------------------------------------------------------------

	var app = new Application({canvasElementId:    'canvasOne', 
							   canvasWidth:        500,         
							   canvasHeight:       500,         
							   canvasFillColor:    "Maroon",    
							   tableWidth:         15,          
							   tableHeight:        65,          
							   tableLeftOffset:    30,          
							   tableRightOffset:   30,          
							   leftTableColor:     "white",     
							   rightTableColor:    "white",     
							   ballUpdateInterval: 16,          
							   ballMoveJump:       15 / 3,           
							   ballColor:          "blue",
							   ballRadius:         15 / 3,      
							   ballStartingAngle:  25
							  });
	app.main();				
}; // canvasApp()
