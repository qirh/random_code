class Runner {
    constructor(x, y, maxspeed, img) {
        this.acceleration = createVector(1000, 1000);
        this.velocity = createVector(1000, 1000);
        this.position = createVector(x, y);
        this.maxspeed = maxspeed;
        this.maxforce = 0.1;
        this.img = img;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    arrive(target) {
        let desired = p5.Vector.sub(target, this.position);
        let d = desired.mag();
        if (d < 100) {
            let m = map(d, 0, 100, 0, this.maxspeed);
            desired.setMag(m);
        } else {
            desired.setMag(this.maxspeed);
        }

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }

    show() {
        image(this.img, this.position.x, this.position.y);
    }
}