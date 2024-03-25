class Bottle extends MovableObject {
    height = 75;
    width = 75;
    IMAGES_WALKING = [
       'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
       'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]
    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.y =  350;
        this.x = 150 + Math.random() * 1800;
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
           }, 800);    }

           collect() {
               
           }
}