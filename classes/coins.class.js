class Coin extends MovableObject {

    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    offset = {
        top: 110,
        bottom: 50,
        left: 65,
        right: 35
    };
    constructor() {
        super().loadImg('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_WALKING);   
        this.y = 50 + Math.random() * 200;
        this.x = 150 + Math.random() * 1800;
        this.animate();
    }
    animate() {
        setInterval(() => {
         this.playAnimation(this.IMAGES_WALKING);
        }, 500);
    }
}