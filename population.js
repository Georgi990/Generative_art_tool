// Create the population
class Population {
  constructor(m, num) {
    this.mutationRate = m; // Mutation rate
    this.population = []; // array to hold the current population
    this.matingPool = [];
    this.generations = 0; // Number of generations
    // for (let i = 0; i < num; i++) {
    //   this.population[i] = new Figure(new DNA(), 450 + i * 900, 400); //50 + i * 75, 60 |300 + i * 300, 300
    // }

    this.num = num;

    for (let i = 0; i < num; i++) {
      if (i < 5) {
        this.population[i] = new Figure(new DNA(), 450 + i * 900, 500);
    } else {
        this.population[i] = new Figure(new DNA(), 450 + (i-5) * 900, 1600);
    }
  }
  }

  //Map genes:
  mapGenes() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].mapGenes();
    }
  }

  //Calculate point values:
  calculatePointValues() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calculatePointValues();
    }
  }

  displayScaled() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].displayScaled();
    }
  }

  displayRegular() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].displayRegular();
    }
  }

  rollover(mx, my) {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].rollover(mx, my);
    }
  }

  // Generate a mating pool
  selection() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    let maxFitness = this.getMaxFitness();

    for (let i = 0; i < this.population.length; i++) {
      let fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
      let n = floor(fitnessNormal * 100); // Arbitrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Making the next generation
  reproduction() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      let m = floor(random(this.matingPool.length));
      let d = floor(random(this.matingPool.length));
      // Pick two parents
      let mom = this.matingPool[m];
      let dad = this.matingPool[d];
      // Get their genes
      let momgenes = mom.getDNA();
      let dadgenes = dad.getDNA();
      // Mate their genes
      let child = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new population with the new child
      // this.population[i] = new Figure(child, 50 + i * 75, 60);


        if (i < 5) {
          this.population[i] = new Figure(child, 450 + i * 900, 500);
      } else {
          this.population[i] = new Figure(child, 450 + (i-5) * 900, 1600);
    }

    }
    this.generations++;
  }

  getGenerations() {
    return this.generations;
  }

  // Find highest fitness for the population
  getMaxFitness() {
    let record = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
      }
    }
    return record;
  }

  //Call shit from figure:
  displayFitness(){
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].displayFitness();
    }
  }

}
