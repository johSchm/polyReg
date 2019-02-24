// polynomial regression based on an interactive created 2D dataset
// with mean squared error as the loss function
// and stochastic gradient descent as the optimizer function

var datapointArr = [];

// polynomial function parameters
var a, b, c, d;


const learningRate = 0.2;

// optimizer = stochastic gradient descent
const optimizer = tf.train.sgd(learningRate);


function setup()
{
	createCanvas(800,800);

	// clarify those variables as changeable values
	// for the minimize function later on
	a = tf.variable(tf.scalar(random(-1,1)));
	b = tf.variable(tf.scalar(random(-1,1)));
	c = tf.variable(tf.scalar(random(-1,1)));
	d = tf.variable(tf.scalar(random(-1,1)));
}


function predict(xArray)
{
	const tensorXArr = tf.tensor1d(xArray);

	// y = mx + b
	//return tensorXArr.mul(m).add(b);

	// y = ax³ + bx² + cx + d
	return tensorXArr.pow(tf.scalar(3)).mul(a).
			add(tensorXArr.pow(2).mul(b)).
			add(tensorXArr.mul(c)).
			add(d);
}


function loss(predicts, labels)
{
	return predicts.sub(labels).square().mean();
}


function mousePressed()
{
	var datapoint = new Datapoint(mouseX, mouseY);
	datapoint.mapToCartesianPlan();
	datapointArr.push(datapoint);
}


function getAllXs()
{
	var xs = [];
	for (var i = 0; i < datapointArr.length; i++)
		xs.push(datapointArr[i].x);
	return xs;
}


function getAllYs()
{
	var ys = [];
	for (var i = 0; i < datapointArr.length; i++)
		ys.push(datapointArr[i].y);
	return ys;
}


function draw()
{
	tf.tidy(() =>
	{
		if (datapointArr.length > 0)
		{
			// call the minimze function from the optimizer, to
			// minimize the loss function output (error)
			optimizer.minimize(() =>
				loss(predict(getAllXs()),
				 	 tf.tensor1d(getAllYs()) ));
		}
	});


	background(255);

	// re-map the coordinates and draw the points
	for (var i = 0; i < datapointArr.length; i++)
	{
		datapointArr[i].drawDatapoint();
	}

	const curveX = [];
	for (var x = -1; x < 1.01; x += 0.05)
	{
		curveX.push(x);
	}

	const ys = tf.tidy(() => predict(curveX));
	var curveY = ys.dataSync();
	ys.dispose();

	beginShape();
	noFill();
	stroke(0);
	strokeWeight(2);
	for (var i = 0; i < curveX.length; i++)
	{
		var x = map(curveX[i], -1, 1, 0, width);
		var y = map(curveY[i], -1, 1, height, 0);
		vertex(x,y);
	}
	endShape();
}


