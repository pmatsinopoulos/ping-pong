describe("ping-pong Application", function() {
	describe("Position object", function() {
		it("should create a position object", function() {
			var position = new PingPong.Position(5, 15);
			expect(position.x).toBe(5);
			expect(position.y).toBe(15);
		});
	});
	
	describe("Size object", function() {
		it("should create a size object", function() {
			var size = new PingPong.Size(5, 15);
			expect(size.width).toBe(5);
			expect(size.height).toBe(15);
		});
	});
	
	describe("Table object", function() {
		it("should create a table object", function(){			
			var table = new PingPong.Table("White", 10, 20, 30, 40);
			expect(table.color).toBe("White");
			expect(table.position.x).toBe(10);
			expect(table.position.y).toBe(20);
			expect(table.size.width).toBe(30);
			expect(table.size.height).toBe(40);
		});
	});
	
	describe("Ball object", function(){
		it("should create a ball object", function() {
			var ball = new PingPong.Ball("Blue", 10, 30, 80, 5);
			expect(ball.color).toBe("Blue");
			expect(ball.position.x).toBe(10);
			expect(ball.position.y).toBe(30);
			expect(ball.angle).toBe(80);
			expect(ball.radius).toBe(5);
		});
	});
	
	describe("BallDirection object", function() {
		it("should create a ball direction object", function() {
			var ballDirection = new PingPong.BallDirection(80, 5, 15);
			expect(ballDirection.radians).toBe(80);
			expect(ballDirection.xunits).toBe(5);
			expect(ballDirection.yunits).toBe(15);
		});
	});
});
