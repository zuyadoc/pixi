/**
 * @constructor
 */

require("pixi.js");
require("pixi-filters");
import {TweenMax} from "gsap";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
    width : 600 ,
    height : 600 ,
    transparent : true
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
PIXI.loader.add('image', 'assets/images/sample3.jpg').load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    const image = new PIXI.Sprite(resources.image.texture);

    // Setup the position of the bunny
    image.x = app.renderer.width / 2;
    image.y = app.renderer.height / 2;

    // Rotate around the center
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(image);


    let padding = 20;
    let center = [app.renderer.width / 2, app.renderer.height / 2];
    let angle = 4;
    let radius = 400;
    let filter = new PIXI.filters.TwistFilter(radius, angle, padding);

    filter.offset = [300 , 200];
    image.filters = [filter];
    //
    TweenMax.to( { x: radius } , 1 ,{
        x: 0 ,
        onUpdate: function ( tween ){
            filter.radius = tween.target.x;
        },
        onUpdateParams: [ "{self}" ] ,
        delay : 1,
        ease: Bounce.easeIn
    });
});