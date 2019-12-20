import * as T from "../THREE/src/Three.js";
import { GrObject } from "../Framework/GrObject.js";

let carouselObCtr = 0;
/**
 * @typedef CarouselProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class Carousel extends GrObject {
    /**
     * @param {CarouselProperties} params 
     */
    constructor(params={}) {
		let width = 3;
		let carousel = new T.Group();

		let base_geom = new T.CylinderGeometry(width, width, 1, 32);
		let base_mat = new T.MeshStandardMaterial({color:"lightblue", metalness:0.3, roughness:0.8});
		let base = new T.Mesh(base_geom, base_mat);
		base.translateY(0.5);
		carousel.add(base);

		let platform_group = new T.Group();
		base.add(platform_group);
		platform_group.translateY(0.5);

		let platform_geom = new T.CylinderGeometry(0.95*width, 0.95*width, 0.2, 32);
		let platform_mat = new T.MeshStandardMaterial({color:"gold", metalness:0.3, roughness:0.8});
		let platform = new T.Mesh(platform_geom, platform_mat);
		platform_group.add(platform);

		let cpole_geom = new T.CylinderGeometry(0.3*width, 0.3*width, 3, 16);
		let cpole_mat = new T.MeshStandardMaterial({color:"gold", metalness:0.8, roughness:0.5});
		let cpole = new T.Mesh(cpole_geom, cpole_mat);
		platform_group.add(cpole);
		cpole.translateY(1.5);

		let top_trim = new T.Mesh(platform_geom, platform_mat);
		platform_group.add(top_trim);
		top_trim.translateY(3);

		let opole_geom = new T.CylinderGeometry(0.03*width, 0.03*width, 3, 16);
		let opole_mat = new T.MeshStandardMaterial({color:"#aaaaaa", metalness:0.8, roughness:0.5});
		let opole;
		let num_poles = 10;
		let poles = [];

		let horse_mat = new T.MeshStandardMaterial({color:"#aaaaaa", metalness:0.8, roughness:0.5});
		let horses = [];

		for (let i = 0; i < num_poles; i++)
		{
			opole = new T.Mesh(opole_geom, opole_mat);

			let horseHead = new T.Mesh(
				new T.SphereGeometry( 0.3, 32, 32 ),
				horse_mat
			);
			horseHead.position.set(0, 0.6, 0.6);
			let horseNeck = new T.Mesh(
				new T.CylinderGeometry( 0.1, 0.1, 0.5, 32 ),
				horse_mat
			);
			horseNeck.position.set(0, 0.4, 0.5);
			horseNeck.rotation.set(Math.PI/6, 0, 0);
			let horseBody = new T.Mesh(
				new T.CylinderGeometry( 0.3, 0.3, 1, 32 ),
				horse_mat
			)
			horseBody.position.set(0, 0, 0);
			horseBody.rotation.set(Math.PI/2, 0, 0);
			let horseleg1 = new T.Mesh(
				new T.CylinderGeometry( 0.07, 0.07, 0.5, 32 ),
				horse_mat
			);
			horseleg1.position.set(0.2, -0.35, 0.4);
			let horseleg2 = new T.Mesh(
				new T.CylinderGeometry( 0.07, 0.07, 0.5, 32 ),
				horse_mat
			);
			horseleg2.position.set(-0.2, -0.35, 0.4);
			let horseleg3 = new T.Mesh(
				new T.CylinderGeometry( 0.07, 0.07, 0.5, 32 ),
				horse_mat
			);
			horseleg3.position.set(0.2, -0.35, -0.4);
			let horseleg4 = new T.Mesh(
				new T.CylinderGeometry( 0.07, 0.07, 0.5, 32 ),
				horse_mat
			);
			horseleg4.position.set(-0.2, -0.35, -0.4);
			
			let horse = new T.Group;
			horse.add(horseHead, horseNeck, horseBody, horseleg1, horseleg2, horseleg3, horseleg4);

			platform_group.add(opole);
			opole.translateY(1.5);
			opole.rotateY(2*i*Math.PI/num_poles);
			opole.translateX(0.8*width);

			platform_group.add(horse);
			horse.translateY(i%2 == 0 ? 0.7 : 2.1);
			horse.rotateY(2*i*Math.PI/num_poles);
			horse.translateX(0.8*width);

			poles.push(opole);
			horses.push(horse);
		}

		let roof_geom = new T.ConeGeometry(width, 0.5*width, 32, 4);
		let roof = new T.Mesh(roof_geom, base_mat);
		carousel.add(roof);
		roof.translateY(4.8);
		
        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
		super(`Carousel-${carouselObCtr++}`,carousel);
		this.whole_ob = carousel;
		this.platform = platform;
		this.poles = poles;
		this.horses = horses;

		let vel = [horses.length];
		for(let i=0; i<horses.length; i++) {
			vel[i] = 0.01;
		}

		this.tick = function(delta, timeOfDay) { 
			this.whole_ob.rotateY(0.001*delta);

			for(let i=0; i<horses.length; i++) {
				if(horses[i].position.y > 2.2) {
					vel[i] = -0.01;
				} 
				
				if(horses[i].position.y < 0.5) {
					vel[i] = 0.01;
				}

				horses[i].position.y += vel[i];
			}
		}
		

        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
		this.whole_ob.position.z = params.z ? Number(params.z) : 0;
		let scale = params.size ? Number(params.size) : 1;
		carousel.scale.set(scale, scale, scale);
	}
}