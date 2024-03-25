class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    hp = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    jumping_audio = new Audio('audio/jump.mp3')




    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY >= 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;


        }, 1000 / 28);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 221;
        }
    }

    isOnGround() {
        return this.y >= 221;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }



    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
        this.jumping_audio.play();
    }

    hit() {
        this.hp -= 5;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.hp <= 0
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.25
    }

    jumpLeft() {
        if (!this.enemyIsDead) {
            if (this.y == 365) {
                setInterval(() => {
                    this.x -= this.speed;

                }, 1000 / 60);

                setInterval(() => {
                    this.speedY = 30;

                }, 1000);
            }

        }
    }
}

