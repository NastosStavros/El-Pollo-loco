class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    statusBar_Coin = new StatusBar_Coin();
    statusBar_Bottle = new StatusBar_Bottle();
    throwableObjects = []; 
    bottle_counter = 1110;
    coin_counter = 0;
    jump_audio = 

    /**
     * Constructor for initializing the canvas and setting up the keyboard input.
     *
     * @param {type} canvas - the canvas element to be initialized
     * @return {type} undefined
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }

    /**
     * Sets the world for the character.
     *
     */
    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionBottlesEnemy();
            this.checkIsAggressive();
        }, 50);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottle_counter > 0) {
            let throwDirection = 1;
            if (this.character.otherDirection) {
                throwDirection = -1;
            }
            this.throwableObjects.push(new ThrowableObject(this.character.x, this.character.y, throwDirection));
            this.bottle_counter = this.bottle_counter - 1;
            this.statusBar_Bottle.setPercentage(this.bottle_counter);
        }
    }

    checkCollisions() {
        // Überprüfen der Kollisionen mit Feinden
        this.level.enemies.forEach(enemy => {
            let i = this.level.enemies.indexOf(enemy); 
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.y + this.character.height - this.character.offset.bottom <= enemy.y + enemy.height && this.character.speedY <= 0){
                    enemy.enemyIsDead = true;
                    this.character.jump();
                } else {
                this.character.hit();
                this.statusBar.setPercentage(this.character.hp);
                
                }
            }
        });
    
        // Überprüfen der Kollisionen mit Flaschen
        this.level.bottles.forEach(bottle => {
            let i = this.level.bottles.indexOf(bottle);
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1); 
                this.bottle_counter = this.bottle_counter + 1;
                this.statusBar_Bottle.setPercentage(this.bottle_counter);
                
            }
        });

        this.level.coins.forEach(coin => {
            let i = this.level.coins.indexOf(coin);
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.coin_counter = this.coin_counter + 1;
                this.statusBar_Coin.setPercentage(this.coin_counter);
            }
        });
    }

    checkCollisionBottlesEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    enemy.enemyIsDead = true;
                    if (enemy instanceof Endboss) {
                       enemy.hit();
                       console.log(enemy.hp);
                    }
                }
            })
        }
    }

    checkIsAggressive() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                const aggressionThreshold = 1000;
                if (this.character.x >= aggressionThreshold) { 
                    enemy.aggressive = true;
                }
            }
        });
    }

    /**
     * Draws the canvas, adds background objects, character, enemies, and clouds to the map, and requests animation frame for continuous drawing.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        // space for fixed objects
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBar_Coin);
        this.addToMap(this.statusBar_Bottle);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    /**
     * Adds the given objects to the map.
     *
     * @param {Array} objects - the objects to be added to the map
     * @return {void} 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }
    /**
     * addToMap function adds the specified image to the canvas at the specified position and size.
     *
     * @param {object} mo - The object containing the image, x and y coordinates, as well as width and height.
     * @return {void} No return value
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        mo.draw(this.ctx);
        mo.drawRectangles(this.ctx);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}

