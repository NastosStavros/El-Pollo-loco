class DrawableObject {
    x = 120;
    y = 230;
    img;
    height = 200;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
     * Load an image from the given path.
     *
     * @param {string} path - The path of the image to load
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
/**
 * Draws an image on the canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
 * @return {void} 
 */
draw(ctx) {
    try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
        console.log(error);
        console.log(this.img.src)
    }
    
}



    /**
     * Loads images from the given array of paths and stores them in the image cache.
     *
     * @param {Array} arr - the array of image paths to load
     * @return {undefined} 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    drawRectangles(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof SmallChicken || this instanceof Coin || this instanceof ThrowableObject) {
        ctx.beginPath(); // Start a new path
        ctx.strokeStyle = 'black';
        ctx.rect( this.x + this.offset.right, this.y + this.offset.bottom, this.width - this.offset.left, this.height - this.offset.top); // Add a rectangle to the current path
        ctx.stroke(); // Render the path
        ctx.beginPath(); // Start a new path
        ctx.strokeStyle = 'red';
        ctx.rect( this.x, this.y, this.width, this.height); // Add a rectangle to the current path
        ctx.stroke(); // Render the path
        }
    }

}

