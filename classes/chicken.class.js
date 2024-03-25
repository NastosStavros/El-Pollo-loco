class Chicken extends MovableObject {
    width = 80;
    height = 70;
    hp = 50;
    speedY = 20;
    enemyIsDead = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png']
    
    offset = {
        top: -5,
        bottom: -5,
        left: -1,
        right: -1
    };
   
    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImg(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 2000;
        this.y = 365;
        this.speed = 0.5 + Math.random() * 0.75;
        this.animate();
        this.chickenIsDead = false;
    }
    animate() {
        setInterval(() => {
            if (!this.enemyIsDead) {
            this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.enemyIsDead){
                this.loadImg(this.IMAGES_DEAD);
                this.y += this.speedY;
            }

        }, 100 / this.speed);
        this.moveLeft();
    }

  
}