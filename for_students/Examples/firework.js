import * as T from "../THREE/src/Three.js";
import { GrObject } from "../Framework/GrObject.js";

const randColor = ["#ffd666", "#ffa666", "#ff6666", "#b8ff66", "#ad66ff", "#66ffb3", "#66a3ff"];
const RISING = 0;
const EXPLODING = 1;
const REPEAT = 2;

export class FireWork extends GrObject{            
    tick(delta,timeOfDay){
        let position = new T.Vector3(this.objects[0].position.x, this.objects[0].position.y, this.objects[0].position.z);

        switch(this.state){
            case RISING:
                position.y += 0.5;
                this.objects[0].position.set(position.x, position.y, position.z);

                if(this.objects[0].position.y > 50){
                    this.state = EXPLODING;
                }
                break;
            case EXPLODING:
                this.vel -= 0.02
                position.y += this.vel;
                this.objects[0].position.set(position.x, position.y, position.z);

                for(let i=0; i<this.particles.length; i++){
                    this.particles[i].vy -= 0.02;

                    this.particles[i].mesh.position.x += this.particles[i].vx;
                    this.particles[i].mesh.position.z += this.particles[i].vz;
                    this.particles[i].mesh.position.y += this.particles[i].vy;
                }

                if(this.objects[0].position.y < -500){
                    this.state = REPEAT;
                }
                break;
            case REPEAT:
                position.y = 0;
                this.objects[0].position.set(position.x, position.y, position.z);
                this.vel = 0;

                for(let i=0; i<this.particles.length; i++){
                    this.particles[i].vy = Math.random() * 2;

                    this.particles[i].mesh.position.x = position.x
                    this.particles[i].mesh.position.y = position.y;
                    this.particles[i].mesh.position.z = position.z;
                }
                this.state = RISING;

                break;    
        }
    }

    constructor(id){
        // Main Particle
        let firework = new T.Group();

        let fireworkMesh = new T.Mesh(
            new T.SphereGeometry(0.2, 10, 10),
            new T.MeshStandardMaterial({color: randColor[Math.floor(Math.random()*randColor.length)]}),
        )
        firework.add(fireworkMesh)
        super("FireWork_" + id, firework);

        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(0.5);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;

        // Particles
        this.particles = [];
        for(let i=0; i<60; i++){
            let particleMesh = new T.Mesh(
                new T.SphereGeometry(0.2, 10, 10),
                new T.MeshStandardMaterial({color: randColor[Math.floor(Math.random()*randColor.length)]}),
            )
            this.particles.push({"mesh": particleMesh, "vx": Math.random()-0.5, "vz": Math.random()-0.5, "vy": Math.random()*2});
            firework.add(particleMesh);
        }

        // Timer tick
        this.u = 0;

        // States
        this.state = RISING;

        // Position/Velocity
        this.pos = [0,0,0];
        this.vel = 0;
    }
}