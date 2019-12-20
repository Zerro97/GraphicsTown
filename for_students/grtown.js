/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 * 
 * This is the main file - it creates the world, populates it with 
 * objects and behaviors, and starts things running
 * 
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 * 
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import * as T from "./THREE/src/Three.js";
import { GrWorld } from "./Framework/GrWorld.js";
import {GrObject } from "./Framework/GrObject.js";  // only for typing
import * as Helpers from "./Libs/helpers.js";
import { WorldUI } from "./Framework/WorldUI.js";

import * as SimpleObjects from "./Framework/SimpleObjects.js";
import {shaderMaterial} from "./Framework/shaderHelper.js";

/** These imports are for the examples - feel free to remove them */
import {SimpleHouse} from "./Examples/house.js";
import {CircularTrack, TrackCube, TrackCar} from "./Examples/track.js";
import {Helicopter, Helipad} from "./Examples/helicopter.js";
import {ShinySculpture} from "./Examples/shinySculpture.js";
import {MorphTest} from "./Examples/morph.js";

// Objects
import {Building1} from "./Examples/building1.js";
import {House1} from "./Examples/house1.js";
import {Tree1} from "./Examples/tree1.js";
import {Road1} from "./Examples/road1.js";
import {Fence} from "./Examples/fence.js";
import {Carousel} from "./Examples/carousel.js";
import {Swing} from "./Examples/swing.js";
import {Car} from "./Examples/car.js";
import {Sun} from "./Examples/sun.js";
import {FireWork} from "./Examples/firework.js";


/**
 * The Graphics Town Main - 
 * This builds up the world and makes it go...
 */
function grtown() {
    // make the world
    let world = new GrWorld({
        width:1000, height:600,         // make the window reasonably large
        groundplane: null,
        groundplanesize:0               // make the ground plane big enough for a world of stuff
    });

    // put stuff into it - you probably want to take the example stuff out first
    //let loader = new T.OBJLoader();

    /********************************************************************** */
    /** EXAMPLES - student should remove these and put their own things in  */
    /***/

    //***** SKYBOX *****//
    let cubemap = new T.CubeTextureLoader()
    .setPath('./Examples/')
    .load([
        'skybox_front.jpg', 'skybox_back.jpg',
        'skybox_up.jpg', 'skybox_down.jpg',
        'skybox_right.jpg', 'skybox_left.jpg',
    ]);
    cubemap.format = T.RGBFormat;
    world.scene.background = cubemap;

    //***** TERRAIN *****//
	let bumpTexture = new T.TextureLoader().load( './Examples/heightmap.png' );
	bumpTexture.wrapS = bumpTexture.wrapT = T.RepeatWrapping; 
	let bumpScale   = 10.0;
	
	let oceanTexture = new T.TextureLoader().load( './Examples/water.jpg' );
	oceanTexture.wrapS = oceanTexture.wrapT = T.RepeatWrapping; 
	
	let sandyTexture = new T.TextureLoader().load( './Examples/sand.jpg' );
	sandyTexture.wrapS = sandyTexture.wrapT = T.RepeatWrapping; 
	
	let grassTexture = new T.TextureLoader().load( './Examples/grass.jpg' );
	grassTexture.wrapS = grassTexture.wrapT = T.RepeatWrapping; 
	
	let rockyTexture = new T.TextureLoader().load( './Examples/rock.jpg' );
	rockyTexture.wrapS = rockyTexture.wrapT = T.RepeatWrapping; 
	
	let snowyTexture = new T.TextureLoader().load( './Examples/snow.jpg' );
	snowyTexture.wrapS = snowyTexture.wrapT = T.RepeatWrapping; 

	let customUniforms = {
		bumpTexture:	{ type: "t", value: bumpTexture },
		bumpScale:	    { type: "f", value: bumpScale },
		oceanTexture:	{ type: "t", value: oceanTexture },
		sandyTexture:	{ type: "t", value: sandyTexture },
		grassTexture:	{ type: "t", value: grassTexture },
		rockyTexture:	{ type: "t", value: rockyTexture },
		snowyTexture:	{ type: "t", value: snowyTexture },
    };
    
    var customMaterial = shaderMaterial("./mountain.vs","./mountain.fs",{
        uniforms: customUniforms,
        side: T.DoubleSide
    });

    let geometryPlane = new T.PlaneBufferGeometry(70, 70, 50, 50);
    let terrain = new GrObject("terrain", new T.Mesh( geometryPlane, customMaterial ));

    world.add(rotate(shift(terrain,0,-3.1,0),Math.PI/2,0,0));

    // Sun
    let sun = new Sun();
    world.add(sun);
    
    // Fireworks
    for(let i=0; i<15; i++){
        let firework = new FireWork(i);
        world.add(shift(firework, Math.random()*60-30, Math.random()*200-200, Math.random()*60-30));
    }


    //***** WORLD OBJECTS *****//
    // Houses
    for(let i=0; i<2; i++) {
        for(let j=0; j<5; j++){ 
            world.add(shift(new House1(i*6+j), i*2+17,0,j*2+22));
        }
        for(let j=0; j<5; j++){
             world.add(shift(new House1(i*6+j+11), i*2+22,0,j*2+22));
        }
    }

    // Black Road
    world.add(shift(rotate(new Road1(60, 0), 0,Math.PI/2,0), -9,0,-26));
    world.add(shift(rotate(new Road1(60, 1), 0,Math.PI/2,0), -10,0,-26));
    world.add(shift(new Road1(18, 1), 8.5,0,-8));
    world.add(shift(new Road1(18, 1), -18,0,12));


    // Grey Road
    let road1Mesh = new T.Mesh(
        new T.BoxGeometry(40,0.01,1.5),
        new T.MeshStandardMaterial({color: "#8f8f8f", roughness:1.0})
    )
    let road1 = new GrObject("Road1", road1Mesh);
    world.add(shift(rotate(road1, 0,Math.PI/2,0), -10,0.01,20));

    // Bridge
    let bridgeGr = new T.Group();
    let foundationMesh = new T.Mesh(
        new T.BoxGeometry(21,0.4,3.5),
        new T.MeshStandardMaterial({color: "#8f8f8f", roughness:1.0})
    )
    bridgeGr.add(foundationMesh);

    for(let i=0; i<7;i++){
        for(let j=0; j<2; j++) {
            let fence = new Fence();
            fence.scale.set(1.5,1,1.5);
            fence.position.set(i*2.5-8,0,1.5-j*3);
            bridgeGr.add(fence);
        }
    }

    let bridge = new GrObject("bridge", bridgeGr);
    world.add(shift(bridge, -5,-0.4,10));

    // Positions
    // 1) 20, 10
    // 2) 20, 30
    // 3) 20, -10

    // 4) 8, -9
    // 5) 8, 10

    // 6) -18.5, 10
    // 7) -18.5, 

    // 8) 33, 10
    // 9) -27, 10

    // Cars
    let car1 = new Car(9,0);
    world.add(shift(car1, -18.5,0.5,20));
    let car2 = new Car(0,1);
    world.add(shift(car2, 33,0.5,10));


    // Buildings
    for(let i=0; i<3; i++){
        world.add(shift(new Building1(i), 23,0,i*3-5));
        world.add(shift(new Building1(i+3), 16,0,i*3-5));
    }

    // Trees
    for(let i=0; i<12; i+=2) {
        world.add(shift(new Tree1(i), 6,0,i-4));
        world.add(shift(new Tree1(i+6), 10,0,i-4));
    }

    // THEME PARK
    // Objects
    world.add(shift(new Carousel(), -25,0,-5));
    world.add(shift(new Swing(), -32,0,1));
    world.add(shift(new Swing(), -32,0,4));


    /** Helicopter - first make places for it to land*/
    world.add(new Helipad(-30,0,-20));
    world.add(new Helipad(30,0,28));
    world.add(new Helipad(0,0,-15));
    world.add(new Helipad(-15,0,28));
    world.add(new Helipad(30,2.2,-15));
    let copter = new Helicopter();
    world.add(copter);
    copter.getPads(world.objects);

    world.add(shift(new ShinySculpture(world), 0,15,0));

    world.add(new MorphTest({x:-10, y:6, z:-10, r:2}));

    // @ts-ignore
    world.ui = new WorldUI(world);
    world.go();
}
Helpers.onWindowOnload(grtown);

function shift(grobj,x,y,z) {
    grobj.objects[0].translateX(x);
    grobj.objects[0].translateY(y);
    grobj.objects[0].translateZ(z);

    return grobj;
}

function rotate(grobj,x,y,z) {
    grobj.objects[0].rotateX(x);
    grobj.objects[0].rotateY(y);
    grobj.objects[0].rotateZ(z);

    return grobj;
}