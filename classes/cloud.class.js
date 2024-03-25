class Cloud extends MovableObject {
    y = 20;
    width = 400;
    height = 250;


    constructor() {
        super().loadImg('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        
        this.animate();

    }

    animate() {
       this.moveLeft();
    }

 

}