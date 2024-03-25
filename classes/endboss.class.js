class Endboss extends MovableObject {
    width = 500;
    height = 300;
    offset = {
        top: 60,
        bottom: 50,
        left: 55,
        right: 30
    };


    hp = 300;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]



    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACKING);
        this.x = 2200;
        this.y = 140;
        this.animate();
        this.aggressive = false;
    }

    animate() {
        let animation = setInterval(() => {
            if (this.isDead()) {
                clearInterval(animation);
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.loadImg(this.IMAGES_DEAD[2]);
                }, 1300);
                return;
            }
    
            if (this.aggressive && !this.isHurt()) {
                this.playAnimation(this.IMAGES_ATTACKING);
                setTimeout(() => {
                    if (!this.isDead()) {
                        this.x -= 85;
                    }
                }, 300);
            } else if (!this.aggressive && !this.isHurt()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 500);
    }
}