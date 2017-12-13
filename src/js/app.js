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
PIXI.loader.add('image', 'assets/images/sample.JPG').load((loader, resources) => {
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

    // filter様スプライト
    let map = PIXI.Sprite.fromImage("assets/images/clouds.jpg");
    app.stage.addChild(map);
    let displacementfilter = new PIXI.filters.DisplacementFilter(map);

    let scaleX = 1;
    let scaleY = 1;


    displacementfilter.scale.x = scaleX;
    displacementfilter.scale.y = scaleY;
    image.filters = [displacementfilter];

    // let radius = 200;
 // let angle = 4;
    // let padding = 100;
    //
    // const twistFilters = new PIXI.filters.TwistFilter(radius , angle ,padding);

    // const DisplacementFilter = new PIXI.filters.DisplacementFilter(image , 1);

// console.log(DisplacementFilter);
//     // Add a blur filter
//     image.filters = [DisplacementFilter];


    let k = 1;
    const MAX_X_SCALE = 200;
    const MAX_Y_SCALE = 70;
    const CHANGE_PARAM = 2;

    // マスクを動かす
    TweenMax.to(displacementfilter.scale , 1 ,{
        x: MAX_X_SCALE,
        y: MAX_Y_SCALE
    });

    // 動かす
    app.ticker.add((time) => {
            map.x += time * 10;
        map.y += 3;
    });


    // // Listen for frame updates
    // app.ticker.add((time) => {
    //     // each frame we spin the bunny around a bit
    //
    //     scaleX = scaleX + (CHANGE_PARAM * k);
    //
    //
    //     if(scaleX > MAX_SCALE) {
    //         k = -1;
    //     } else if(scaleX <= (MAX_SCALE * -1) ) {
    //         k = 1;
    //     }
    //
    //     scaleY = scaleY + (CHANGE_PARAM * k);
    //
    //     // scaleY = scaleY + 20;
    //     //
    //     // if(scaleY > 100) {
    //     //     yMode = true;
    //     // } else if(scaleY <= 0) {
    //     //     yMode = false;
    //     // }
    //
    //     displacementfilter.scale.x = scaleX;
    //     displacementfilter.scale.y = scaleY;
    // });
});