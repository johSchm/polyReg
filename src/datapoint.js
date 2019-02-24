


function Datapoint(x,y)
{
	this.x = x;
	this.y = y;
}


Datapoint.prototype.mapToCartesianPlan = function()
{
	this.x = map(this.x, 0, width,  -1, 1);
	this.y = map(this.y, 0, height, 1, -1);
}


Datapoint.prototype.mapToCanvasPlan = function()
{
	this.x = map(this.x, -1, 1, 0, width);
	this.y = map(this.y, -1, 1, height, 0);
}


Datapoint.prototype.drawDatapoint = function()
{
	stroke(0);
	strokeWeight(6);

	var px = map(this.x, -1, 1, 0, width);
	var py = map(this.y, -1, 1, height, 0);
	point(px, py);
}