class ThrowableObject extends MovableObject {

    speedY = 20;
    speedX = 20;
    throwDirection;

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    constructor(x, y, throwDirection) {
        super().loadImg('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.height = 60;
        this.width = 60;
        this.throw(x, y, throwDirection);
    }

    throw(x, y, throwDirection) {
        
        this.throwDirection = throwDirection; // Aktualisiere die Wurfrichtung
        this.speedX = 10 * throwDirection;
        this.speedY = 20;
        this.x = x;
        this.y = y;
        setInterval(() => {
            this.x += this.speedX;
            this.playAnimation(this.IMAGES_BOTTLES);
            
        }, 35)
        this.applyGravity();
    }
}

