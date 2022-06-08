let population;

let info;
let info1;
let info2;

let fitnessIsDissabled = false;

let canvasHolder;

let welcomeScreenImg;
let instructionsImg;

let helpScreenIsOn = true;

let reddirectGenReached = false;
let reddirectAtGeneration;

let welcomeScreenHasPassed = false;

let imageIsScaled = false;

let firstCanvasHolder;
let lastCanvasHolder;
let firstgenerationHasPassed = false;
let lastCanvasSaved = false;

function setup() {

	canvasHolder = createCanvas(1500, 1000); //createCanvas(800, 124); createCanvas(windowWidth, windowHeight);
	colorMode(RGB, 255, 255, 255, 100); //colorMode(RGB, 1.0, 1.0, 1.0, 1.0);

	let popmax = 10;
	let mutationRate = 0.1; //0.05 // A pretty high mutation rate here, our population is rather small we need to enforce variety
	// Create a population with a target phrase, mutation rate, and population max

	reddirectAtGeneration = 10;

	population = new Population(mutationRate, popmax);

	welcomeScreenImg = loadImage('welcomeScreen.png'); // Load the image
	instructionsImg = loadImage('instructionsScreen.png');

	info = createDiv(''); //Generation info
	info.position(width/2 - 100, 670); //10, 175
	info.style('font-size', '30px');

	info1 = createDiv(''); //Press h for instructions screen
	info1.position(width/2 - 150, 710);
	info1.style('font-size', '20px');

	info2 = createDiv(''); //Press SPACE for new generation
	info2.position(width/2 - 150, 730);
	info2.style('font-size', '20px');

	// console.log(population); //All the info about the population if needed

	background(255); //Addin a white background before everything else, because of the save feature

	population.mapGenes();
	population.calculatePointValues();
	// population.displayRegular();

	firstCanvasHolder = createGraphics(1500,1000);
	lastCanvasHolder = createGraphics(1500,1000);
}

function draw() {

	if (helpScreenIsOn) {
		background(255);
		fitnessIsDissabled = true;
		info.html("");
		info1.html("");
		info2.html("");

		if (welcomeScreenHasPassed == true) {
			image(instructionsImg, 200, 70);
		} else {
			image(welcomeScreenImg, 200, 70);
		}

	} else {
		info.html("Generation: " + (population.getGenerations()+1));
		info1.html("Press 'h' for instructions screen");
		info2.html("Press SPACE for new generation");
	}

	if (imageIsScaled == true) {
		info.html("");
		info2.html("");
		info1.html("Press ESCAPE to exit scaled mode");
		info1.position(10, 50);
		info1.style('font-size', '20px');
	} else if(imageIsScaled == false && helpScreenIsOn == false) {
		info.html("Generation: " + (population.getGenerations()+1));
		info1.html("Press 'h' for instructions screen");
		info1.position(width/2 - 150, 710);
		info1.style('font-size', '20px');
		info2.html("Press SPACE for new generation");
	}

	if (fitnessIsDissabled == false) {
		for (let y = 0; y < 2; y++) {
			for (let x = 0; x < 5; x++) {

				rectMode(CENTER);
				fill(255);
				noStroke();
				rect(140+x*275, 300+y*320 + 10, 100, 60);

			}
		}
		population.displayFitness();
	}

	population.rollover(mouseX, mouseY);

	//Reddirect to questionnaire:
	checkForReddirect();
	saveLastCanvas();

}

function nextGen() {
	// console.log("");
	// console.log("New generation");
	background(255);

	population.selection();
	population.reproduction();

	population.mapGenes();
	population.calculatePointValues();
	population.displayRegular();

	// console.log(population); All the info about the population if needed
}

function keyPressed(){

	if (keyCode == 49) { //Scale up 1st figure:
		background(255);
		population.population[0].displayScaled();
		fitnessIsDissabled = true;
		imageIsScaled = true;
	}

	if (keyCode == 50) { //Scale up 2nd figure:
		background(255);
		population.population[1].displayScaled();
		fitnessIsDissabled = true;
		imageIsScaled = true;
	}

	if (keyCode == 51) { //Scale up 3d figure:
		background(255);
		population.population[2].displayScaled();
		fitnessIsDissabled = true;
		imageIsScaled = true;
	}

	if (keyCode == 52) { //Scale up 4th figure:
		background(255);
		population.population[3].displayScaled();
		fitnessIsDissabled = true;
		imageIsScaled = true;
	}

	if (keyCode == 53) { //Scale up 5th figure:
		background(255);
		population.population[4].displayScaled();
		fitnessIsDissabled = true;
		imageIsScaled = true;
	}

	if (keyCode == 54) { //Scale up 6th figure:
		background(255);
		population.population[5].displayScaled();
		fitnessIsDissabled = true;
		imageIsScaled = true;
	}

	if (keyCode == 55) { //Scale up 7th figure:
		background(255);
		population.population[6].displayScaled();
		fitnessIsDissabled = true;
		imageIsScaled = true;
	}

	if (keyCode == 56) { //Scale up 8th figure:
		background(255);
		population.population[7].displayScaled();
		fitnessIsDissabled = true;
		imageIsScaled = true;
	}

	if (keyCode == 57) { //Scale up 9th figure:
		background(255);
		population.population[8].displayScaled();
		fitnessIsDissabled = true;
		imageIsScaled = true;
	}

	if (keyCode == 48) { //Scale up 10th figure:
		background(255);
		population.population[9].displayScaled();
		fitnessIsDissabled = true;
		imageIsScaled = true;
	}

	if (keyCode == ESCAPE) { //Exit zoomed mode and help screen:
		// clear();
		background(255);
		population.displayRegular();
		fitnessIsDissabled = false;

		//Exit help screen:
		if (helpScreenIsOn == true) helpScreenIsOn = false;
		if (welcomeScreenHasPassed == false) welcomeScreenHasPassed = true;
		if (imageIsScaled == true) imageIsScaled = false;

		//Save first generation:
		if (firstgenerationHasPassed == false) {
			firstCanvasHolder = get();
		}
		if (firstgenerationHasPassed == false) firstgenerationHasPassed = true;

	}

	//Save first and last canvases by pressing 'y':
	if (keyCode == 89) {
		save(firstCanvasHolder,'First_Generation','png');
		save(lastCanvasHolder,'Last_Generation','png');
	}

	//Press SPACE for new generation:
	if (keyCode == 32) {
		nextGen();
	}

	//Save entire canvas by pressing 's':
	if (keyCode == 83) {
		console.log('');
		console.log('Saving canvas');
		saveCanvas(canvasHolder,'Figures','png');
	}

	//Press 'h' for help screen
	if (keyCode == 72) {
		helpScreenIsOn = true;
	}

}

//Reddirect to link:
function checkForReddirect(){

	if (population.getGenerations() == reddirectAtGeneration && reddirectGenReached == false){
		window.open("https://forms.gle/5yxRHxMVhSTV8Kcq5");
		reddirectGenReached = true;
	}
}

//Save last generation:
function saveLastCanvas(){

	if (reddirectGenReached == true && lastCanvasSaved == false) {
		rectMode(CENTER);
		fill(255);
		rect(140, 300 + 10, 2700, 60);
		rect(140, 620 + 10, 2700, 60);
		lastCanvasHolder = get();
		lastCanvasSaved = true;
	}
}
