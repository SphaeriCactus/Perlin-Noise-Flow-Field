class Particle {
    constructor(x, y) {
        this.position = createVector(random(width), random(height));
        this.pathLength = 3;
        this.history = [];
        this.velocity = createVector();
        this.acceleration = createVector();

        this.maxSpeed = 4;
        this.maxForce = 0.2;

        for (let i = 0; i < this.pathLength; i ++) {
            this.history.push(this.position.copy());
        }

        //this.hue = random(0, 360);
        this.hue = 0;
    }

    // A function to loop the particle around the edges of the canavs
    edges() {
        if (this.position.x < 0) this.position.x = width;
        if (this.position.x > width) this.position.x = 0;

        if (this.position.y < 0) this.position.y = height;
        if (this.position.y > height) this.position.y = 0;
    }

    // A function to apply a force to the particle
    applyForce(force) {
        this.acceleration.add(force);
    }

    // A function to update the physics of the particle
    update() {
        this.history.push(this.position.copy());
        this.history.splice(0, 1);
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);

        let pos = this.position.copy();
        this.edges();
        if (!pos.equals(this.position)) {
            for (let i = 0; i < this.pathLength; i ++) {
                this.history[i] = this.position.copy();
            }
        }

        this.velocity.limit(this.maxSpeed);

        //this.hue = (this.position.x + this.position.y) % 360;
        this.hue += 1;
        if (this.hue > 360) this.hue = 0;
    }

    // A function to draw the particle to the screen
    show() {
        //stroke(this.hue, 100, 100, 5);
        //stroke(this.hue, 100, 50, 5);
        stroke(0, 0, 100, 5);
        strokeWeight(1);
        noFill();
        beginShape();
            vertex(this.position.x, this.position.y);
            for (let i = this.pathLength - 1; i >= 0; i --) {
                vertex(this.history[i].x, this.history[i].y);
            }
        endShape();
    }
}