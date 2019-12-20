import * as T from "../THREE/src/Three.js";
import { GrObject } from "../Framework/GrObject.js";

export class Sun extends GrObject{
    tick(delta,timeOfDay){
        this.u += (delta/30000);
        let p = this.u * 2 * Math.PI;
        
        let pos = [this.r * Math.cos(p), this.r * Math.sin(p), 0];
        this.objects[0].position.set(pos[0],pos[1],pos[2]);
    }

    constructor(){
        let sunMesh = new T.Mesh(
            new T.SphereGeometry( 5, 32, 32 ),
            new T.MeshStandardMaterial({emissive:"#ffcb8c"}),
        )
    
        let light = new T.PointLight( 0x000000, 1, 100 );

        super("Sun", sunMesh);

        this.u = 0;
        this.r = 70;
    }
}