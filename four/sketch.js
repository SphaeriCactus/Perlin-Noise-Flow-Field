let n = 500; // Number of particles
let particles = []; // Array of particles

let time = 0; // The time coordinate (z) of the 3d Perlin noise space
let timeIncrement = 0.002; // How quickly we move through time (3rd dimension)

let scl = 20; // The size of each "cell" (the area which is controlled by 1 vector)
let increment = 0.1; // The size of the steps we take in the Perlin noise space

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100, 255); // Use hue, saturation and brightness for colour instead of RGB

    for (let i = 0; i < n; i ++) {
        let p = new Particle(); // The new particle that will be added to the array
        particles.push(p);
    }

    //background(38, 3, 98);
    background(0);
}

function draw() {
    //background(38, 3, 98, 8);

    // Loop through all of the particles
    for (let i = 0; i < n; i ++) {
        let p = particles[i]; // A shortcut to access the current particle in the array

        let xoff = p.position.x / scl * increment; // The x position of the particle, in noise space
        let yoff = p.position.y / scl * increment; // The y position of the particle, in noise space

        let angle = noise(xoff, yoff, time) * TWO_PI * 2;
        let vector = p5.Vector.fromAngle(angle).setMag(0.5);

        p.applyForce(vector);
        p.update(); // Update the particle
        p.show(); // Draw the particle
    }

    time += timeIncrement;
}