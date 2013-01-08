Short description
=================

It is HTML5. Uses <code>canvas</code>. When you start it, (Ctrl + R) you will have to chase the ball with your mouse and make sure you hit it with the two tables.
One table on the right and one table on the left.

This is my first application on HTML5 canvas. So, bare with me!

The logic behind is quite primitive and I believe that code is self-explanatory. Start reading from file: "canvas-app.js" on method: "main()" of "PingPong.Application" class.

It does three things:

<code>
drawScreen();						
canvas.addEventListener('mousemove', onMouseMove, true);			    
updateBallTimerId = setInterval(updateBall, options['ballUpdateInterval']);	
</code>

1. Draws the tables and ball on canvas
2. Starts to track mouse movements
3. Starts to periodically calculate the ball position.

Inside step (2) and (3) we call "drawScreen()" again.

This takes place until the <code>gameOver</code> var is true.

The game is over when the ball goes far right, beyond the right table, or far left, beyond the left table. 
On top and bottom walls of the playing area, it just bounces. When ball hits any of the tables, it just bounces.

Next version will have more features, like:

1. Lifes. Game will end when player loses all his/her lifes.
2. Speed of ball. Will be increasing as time elapses. So, the more you play the more difficult becomes the game.
3. Scoring. Total score is the sum of hits during players lifetime.
4. Maybe add some sound on hits.
5. Change the bouncing angle taking into account various factors such as:
5.1. the speed of movement of the table
5.2. the part of the table the ball hits. For example, when on top part, towards top of the table, the bouncing might be with smaller angle, where as when the ball bounces in the middle
     of the table might be with bigger angle. We can have various maths here calculating the bouncing angle.
6. Two-player game:
6.1. Player against computer.
6.2. Players can be on their own keyboard/mouse and play against each other over the internet.

TESTING
=======
Maybe, you will find interesting that I used Jasmine to test / spec parts of the functionality of the game. Open the page <code>SpecRunner.html</code> and see what happens.

