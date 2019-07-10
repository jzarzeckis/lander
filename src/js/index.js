import * as PIXI from 'pixi.js';

import img from '../img/*.png';

const loader = PIXI.Loader.shared;
const app = new PIXI.Application({
    backgroundColor: 0xcecece
});
 
// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);
 
// load the texture we need
loader.add('rocket', img.rocket).load((loader, resources) => {
 
    // This creates a texture from a 'rocket.png' image.
    const rocket = new PIXI.Sprite(resources.rocket.texture);
 
    // Setup the position of the bunny
    rocket.x = app.renderer.width / 2;
    rocket.y = app.renderer.height / 2;
 
    // Rotate around the center
    rocket.anchor.x = 0.5;
    rocket.anchor.y = 0.65;
 
    // Add the rocket to the scene we are building.
    app.stage.addChild(rocket);
    let vy = 0;
    let vx = 0;
    let isEngineRunning = false;
    let isRightThrusterRunning = false;
    let isLeftThrusterRunning = false;
    document.addEventListener("keydown", (e) => {
        e.preventDefault();
        console.log(e);
        if (e.code === "ArrowUp") {
            isEngineRunning = true;
        } else if (e.code === "ArrowRight") {
            isRightThrusterRunning = true
        } else if (e.code === "ArrowLeft") {
            isLeftThrusterRunning = true
        }
    });
    document.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.code === "ArrowUp") {
            isEngineRunning = false;
        } else if (e.code === "ArrowRight") {
            isRightThrusterRunning = false;
        } else if (e.code === "ArrowLeft") {
            isLeftThrusterRunning = false;
        }
    })
 
    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the rocket around a bit
        // rocket.rotation += 0.01;
        rocket.y = rocket.y + vy;
        rocket.x -= vx;
        vy = vy + 0.01; // Gravity is pulling us down
        if (isEngineRunning) {
            vy -= 0.03;
        }
        if (isLeftThrusterRunning) {
            vx += 0.04;
        }
        if (isRightThrusterRunning) {
            vx -= 0.04;
        }
    });
});
