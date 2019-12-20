import * as T from "../THREE/src/Three.js";
import { GrObject } from "../Framework/GrObject.js";

// Directions
const TO_RIGHT = new T.Vector3(1,0,0);
const TO_LEFT = new T.Vector3(-1,0,0);
const TO_FRONT = new T.Vector3(0,0,1);
const TO_BACK = new T.Vector3(0,0,-1);

// Motions State
const FORWARD = 0;
const TURN_RIGHT180 = 1;
const TURN_LEFT180 = 2;
const TURN_RIGHT90 = 3;
const TURN_LEFT90 = 4;

// POSITIONS
// 1) 20, 10
// 2) 20, 30
// 3) 20, -10

// 4) 8, -9
// 5) 8, 10

// 6) -18.5, 10
// 7) -18.5, 

// 8) 33, 10
// 9) -27, 10

// ACTIONS: 

// define your vehicles here - remember, they need to be imported
// into the "main" program
export class Car extends GrObject {
    tick(delta,timeOfDay) {
        let velocity = 0.1;
        let direction = new T.Vector3(this.direction.x,this.direction.y,this.direction.z);
        let position = new T.Vector3(this.objects[0].position.x, this.objects[0].position.y, this.objects[0].position.z);

        direction.multiplyScalar(velocity);

        switch(this.motion) {
            case FORWARD:
                //direction.multiplyScalar(velocity);
                position.add(direction);
                this.objects[0].lookAt(position);
                this.objects[0].position.set(position.x, position.y, position.z);

                switch(this.action){
                    case 0:
                        this.direction = TO_LEFT;
                        if(this.objects[0].position.x < 20){
                            this.action = 1;
                        }
                        break;
                    case 1:
                        this.direction = TO_BACK;
                        if(this.objects[0].position.z < -10){
                            this.action = 2;
                        }
                        break;
                    case 2:
                        this.direction = TO_FRONT;
                        if(this.objects[0].position.z > 30){
                            this.action = 3;
                        }
                        break;
                    case 3:
                        this.direction = TO_BACK;
                        if(this.objects[0].position.z < 10){
                            this.action = 4;
                        }
                        break;
                    case 4:
                        this.direction = TO_LEFT;
                        if(this.objects[0].position.x < 8){
                            this.action = 5;
                        }
                        break;
                    case 5:
                        this.direction = TO_BACK;
                        if(this.objects[0].position.z < -9){
                            this.action = 6;
                        }
                        break;
                    case 6:
                        this.direction = TO_FRONT;
                        if(this.objects[0].position.z > 10){
                            this.action = 7;
                        }
                        break;
                    case 7:
                        this.direction = TO_LEFT;
                        if(this.objects[0].position.x < -18.5){
                            this.action = 8;
                        }
                        break;
                    case 8:
                        this.direction = TO_FRONT;
                        if(this.objects[0].position.z > 29){
                            this.action = 9;
                        }
                        break;
                    case 9:
                        this.direction = TO_BACK;
                        if(this.objects[0].position.z < 10){
                            this.action = 10;
                        }
                        break;
                    case 10:
                        this.direction = TO_LEFT;
                        if(this.objects[0].position.x < -27){
                            this.action = 11;
                        }
                        break;
                    case 11:
                        this.direction = TO_RIGHT;
                        if(this.objects[0].position.x > 33){
                            this.action = 0;
                        }
                        break;
                }
                break;
            case TURN_RIGHT180:
                break;
            case TURN_LEFT180:
                break;
            case TURN_RIGHT90:
                break;
            case TURN_LEFT90:
                break;
        }
    }

    constructor(action, id) {
        // Making the car
        let car = new T.Group();

        let tire1 = Tire();
        let tire2 = Tire();
        let tire3 = Tire();
        let tire4 = Tire();

        let carBody = new T.Group();

        let exSettings = {
			steps: 2,
			depth: 0.6,
			bevelEnabled: true,
			bevelThickness: 0.2,
			bevelSize: 0.1,
			bevelSegments: 2
        };
        
        let base_curve = new T.Shape();
		base_curve.moveTo(-1, 0);
		base_curve.lineTo(-1.2, 0.1);
		base_curve.lineTo(-1.2, 0.4);
        base_curve.lineTo(-0.75, 0.55);
        base_curve.lineTo(-0.3, 1);
        base_curve.lineTo(0.9, 1);

		base_curve.lineTo(1, 0.7);
		base_curve.lineTo(1.2, 0.3);
		base_curve.lineTo(1.2, 0.1);
        base_curve.lineTo(1, 0);
        
		base_curve.lineTo(-1, 0);
		let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
		let car_mat = new T.MeshStandardMaterial({color:"grey", metalness:0.5, roughness:0.7});
		let base = new T.Mesh(base_geom, car_mat);

        base.position.set(1,0.3,0.07);
        carBody.add(base);

        let window1 = new T.Mesh(
            new T.PlaneGeometry(0.6,0.5),
            new T.MeshStandardMaterial({color:"#d1f8ff", metalness:0.5, roughness:0.7})
        );
        window1.position.set(0.35,1.1,0.36);
        window1.lookAt(-0.5,1.9,0.36);
        carBody.add(window1);

        let window2 = new T.Mesh(
            new T.PlaneGeometry(0.4,0.48),
            new T.MeshStandardMaterial({color:"#d1f8ff", metalness:0.5, roughness:0.7})
        );
        window2.position.set(1,1,0.872);
        carBody.add(window2);

        let window3 = new T.Mesh(
            new T.PlaneGeometry(0.5,0.48),
            new T.MeshStandardMaterial({color:"#d1f8ff", metalness:0.5, roughness:0.7})
        );
        window3.position.set(1.55,1,0.872);
        carBody.add(window3);

        let window4 = new T.Mesh(
            new T.PlaneGeometry(0.4,0.48),
            new T.MeshStandardMaterial({color:"#d1f8ff", metalness:0.5, roughness:0.7})
        );
        window4.position.set(1,1,-0.132);
        window4.rotation.set(0,Math.PI,0);
        carBody.add(window4);

        let window5 = new T.Mesh(
            new T.PlaneGeometry(0.5,0.48),
            new T.MeshStandardMaterial({color:"#d1f8ff", metalness:0.5, roughness:0.7})
        );
        window5.position.set(1.55,1,-0.132);
        window5.rotation.set(0,Math.PI,0);
        carBody.add(window5);

        carBody.position.set(-0.5,-1,1.2);
        tire1.position.set(-0.5,-1,-0.6);
        tire2.position.set(-0.5,-1,0.9);
        tire3.position.set(0.5,-1,-0.6);
        tire4.position.set(0.5,-1,0.9);

        carBody.rotation.set(0, Math.PI/2, 0);
        tire1.rotation.set(0, Math.PI/2, 0);
        tire2.rotation.set(0, Math.PI/2, 0);
        tire3.rotation.set(0, Math.PI/2, 0);
        tire4.rotation.set(0, Math.PI/2, 0);

        car.add(tire1);
        car.add(tire2);
        car.add(tire3);
        car.add(tire4);

        car.add(carBody);
        car.scale.set(0.6,0.6,0.6);

        super("Car_" + id, car);
        
        // Ride camera position
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(0.5);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;

        // Direction state
        this.direction = TO_LEFT;

        // Motion state
        this.motion = FORWARD;

        // Action state
        this.action = action;

        function Tire(){
            let tl1 = new T.TextureLoader().load("./Examples/tire_texture.jpg");
            let tire_mat1 = new T.MeshStandardMaterial({map:tl1, roughness:0.75});
            let tl2 = new T.TextureLoader().load("./Examples/tire_texture2.png");
            let tire_mat2 = new T.MeshStandardMaterial({map:tl2, roughness:0.75});
    
            let tire = new T.Group();
    
            let tireSide1 = new T.Mesh(
                new T.CircleGeometry( 0.4, 32 ),
                tire_mat1
            );
            tireSide1.position.set(0,0.4,0);
    
            let tireSide2 = new T.Mesh(
                new T.CircleGeometry( 0.4, 32 ),
                tire_mat1
            );
            tireSide2.position.set(0,0.4,-0.252);
            tireSide2.rotation.set(0,Math.PI,0);
    
            let tireAround = new T.Mesh(
                new T.CylinderGeometry( 0.4, 0.4, 0.25, 32 ),
                tire_mat2
            )
            tireAround.position.set(0,0.4,-0.126);
            tireAround.rotation.set(Math.PI/2,0,0);
    
            tire.add(tireSide1);
            tire.add(tireSide2);
            tire.add(tireAround);
    
            return tire;
        }
    }
}