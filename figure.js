class Figure{
  constructor(dna_, x_, y_){

    this.rolloverOn = false; // Are we rolling over this figure?
    this.dna = dna_; // Figure's DNA
    this.x = x_; // Position on screen
    this.y = y_;
    this.wh = 830;
    this.fitness = 1;
    this.r = new Rectangle(this.x/3.3-120, this.y/3.2 - 150, 230, 230);

    this.pointCount = 600; //vars that don't change 1000; 600
    this.lissajousPoints = [];
    this.lineWeight = 0.1;
    this.lineAlpha = 50;
    this.connectionRadius = 150; //100
    // this.connectionRamp = 6;
    this.lineColor = color(0,50);

    //Initialize changing vars that we use bellow:
    this.genes;

    this.freqX;
    this.freqY;
    this.phi;
    this.modFreqX;
    this.modFreqY;

    this.rr;
    this.gg;
    this.bb;

    this.myalpha;

    this.myColor;

    this.noisePicker;
    this.noisePicker1;
    this.noisePicker2;
    this.noisePicker3;

    this.genie;
    this.genie1;
    this.genie2;
    this.genie3;
  }

  mapGenes(){
    this.genes = this.dna.genes;

    this.freqX = floor(map(this.genes[0], 0, 1, 1, 20)); //1, 20
    this.freqY = floor(map(this.genes[1], 0, 1, 1, 20)); //1, 20
    this.phi = floor(map(this.genes[2], 0, 1, 1, 15)); //1, 15
    this.modFreqX = floor(map(this.genes[3], 0, 1, 1, 30)); //1, 30
    this.modFreqY = floor(map(this.genes[4], 0, 1, 1, 20)); //1, 20

    // //COLOR:
    this.rr = floor(map(this.genes[5], 0, 1, 20, 200));
    this.gg = floor(map(this.genes[6], 0, 1, 20, 200));
    this.bb = floor(map(this.genes[7], 0, 1, 20, 200));
    this.myalpha = floor(map(this.genes[8], 0, 1, 150, 255)); // 0 alpha = completelly translucent

    // this.mycolor = color(this.rr, this.gg, this.bb, this.myalpha); THIS IS WRONG

    this.noisePicker = this.genes[9];
    this.noisePicker1 = this.genes[10];
    this.noisePicker2 = this.genes[11];
    this.noisePicker3 = this.genes[12];

    this.genie = map(this.genes[13],0,1,0,1000);
    this.genie1 = map(this.genes[14],0,1,0,1000);
    this.genie2 = map(this.genes[15],0,1,0,1000);
    this.genie3 = map(this.genes[16],0,1,0,1000);

    // this.connectionRadius = floor(map(this.genes[13], 0, 1, 70, 170));
    // this.pointCount = floor(map(this.genes[14], 0, 1, 400, 1000));
  }

  calculatePointValues(){
    // Calculate point values:

    var cnt = 0;
    var cnt1 = 0;
    var cnt2 = 0;
    var cnt3 = 0;

    // if (this.genie == 0) { //NOISE:

      // console.log("noise");

      for (var i = 0; i <= this.pointCount; i++) {
        var angle = map(i, 0, this.pointCount, 0, TAU);

        cnt+=this.noisePicker/this.genie;
        cnt1+=this.noisePicker1/this.genie1;
        cnt2+=this.noisePicker2/this.genie2;
        cnt3+=this.noisePicker3/this.genie3;

        // cnt = noise(cnt);
        // console.log(cnt);

        // cnt+=0.00117;
        // cnt1+=0.00198;
        // cnt2+=0.00258;
        // cnt3+=0.00876;

        // cnt+=0.0005;
        // cnt1+=0.002213;

        var x = sin(angle * this.freqX *noise(cnt) + radians(this.phi)) * cos(angle * this.modFreqX *noise(cnt1));
        var y = sin(angle * this.freqY *noise(cnt2)) * cos(angle * this.modFreqY*noise(cnt3));

        // var x = sin(angle * this.freqX * cnt + radians(this.phi)) * cos(angle * this.modFreqX * cnt);
        // var y = sin(angle * this.freqY * cnt) * cos(angle * this.modFreqY * cnt);

        // var x = sin(angle * this.freqX * cnt + radians(this.phi)) * cos(angle * this.modFreqX * cnt1);
        // var y = sin(angle * this.freqY * cnt2) * cos(angle * this.modFreqY * cnt3);

        // var x = sin(angle * this.freqX + radians(this.phi)) * cos(angle * this.modFreqX);
        // var y = sin(angle * this.freqY) * cos(angle * this.modFreqY);

        x *= 800 / 2 - 30;  //width / 2 - 30;
        y *= 800 / 2 - 30; //height / 2 - 30;

        this.lissajousPoints[i] = createVector(x,y);
      }
    // } else { //NO NOISE:
    //   console.log("no noise");
    //   for (var i = 0; i <= this.pointCount; i++) {
    //     var angle = map(i, 0, this.pointCount, 0, TAU);
    //     this.noiseVal = 0.1;
    //
    //     // let noise = noise(noiseVal);
    //
    //     // let xoff = 0.0;
    //     // let n = noise(xoff);
    //     // let m = noise(xoff);
    //
    //     var x = sin(angle * this.freqX + radians(this.phi)) * cos(angle * this.modFreqX);
    //     var y = sin(angle * this.freqY) * cos(angle * this.modFreqY);
    //
    //     // var x = sin(angle*n * freqX + radians(phi)) * cos(angle*m * modFreqX);
    //     // var y = sin(angle*m * freqY) * cos(angle*n * modFreqY);
    //     x *= 800 / 2 - 30;  //width / 2 - 30;
    //     y *= 800 / 2 - 30; //height / 2 - 30;
    //
    //     this.lissajousPoints[i] = createVector(x,y);
    //   }
    // }
  }

    displayScaled(){

    push();
    strokeWeight(this.lineWeight);
    translate(windowWidth/2,windowHeight/2);

    for (var i1 = 0; i1 < this.pointCount; i1++) {
    	for (var i2 = 0; i2 < i1; i2++) {
    		var d = this.lissajousPoints[i1].dist(this.lissajousPoints[i2]);
    		var a = pow(1 / (d / this.connectionRadius + 1), 6);
    		if (d <= this.connectionRadius) {
    			//stroke(this.lineColor, a * this.lineAlpha); //stroke(this.mycolor, a * this.myalpha);

          stroke(this.rr,this.gg,this.bb, this.myalpha); //color
          //stroke(this.lineColor, a * this.lineAlpha); //no color

    			line(
    				this.lissajousPoints[i1].x,
    				this.lissajousPoints[i1].y,
    				this.lissajousPoints[i2].x,
    				this.lissajousPoints[i2].y
    			);
    		}
    	}
    }
    pop();
  } //end of displayScaled()

  displayRegular(){

  push();
  strokeWeight(this.lineWeight);
  scale(0.3);
  translate(this.x, this.y);

  for (var i1 = 0; i1 < this.pointCount; i1++) {
    for (var i2 = 0; i2 < i1; i2++) {
      var d = this.lissajousPoints[i1].dist(this.lissajousPoints[i2]);
      var a = pow(1 / (d / this.connectionRadius + 1), 6);
      if (d <= this.connectionRadius) {
        //stroke(this.lineColor, a * this.lineAlpha);
        stroke(this.rr,this.gg,this.bb, this.myalpha); //color
        // stroke(this.lineColor, a * this.lineAlpha); //no color

        line(
          this.lissajousPoints[i1].x,
          this.lissajousPoints[i1].y,
          this.lissajousPoints[i2].x,
          this.lissajousPoints[i2].y
        );

      }
    }
  }

  // Draw the bounding box
  // stroke(0.25);
  // if (this.rolloverOn) fill(100); //FIX THIS SHIT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // else noFill();
  // strokeWeight(1);
  // rectMode(CENTER);
  // rect(0, 0, this.wh, this.wh);

  pop();

} //end of displayRegular()


  displayFitness(){

    // Display fitness value:
    fill(0);
    textSize(25);
    text('' + floor(this.fitness), this.x/3.3, this.y/3.4+160);
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over face
  rollover(mx, my) {
    if (this.r.contains(mx, my) && mouseIsPressed) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }


}
