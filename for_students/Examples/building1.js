import * as T from "../THREE/src/Three.js";
import { GrObject } from "../Framework/GrObject.js";

export class Building1 extends GrObject {
    constructor (id) {
        let building = new T.Group();

        let geometry = new T.Geometry();
        geometry.vertices.push(new T.Vector3(-1,1,0)); //0 top left
        geometry.vertices.push(new T.Vector3( 0,0,0)); //1 bottom right
        geometry.vertices.push(new T.Vector3( -1,0,0)); //2 bottom left
        geometry.vertices.push(new T.Vector3( 0,1,0)); //3 top right
    
        geometry.faceVertexUvs = [ [] ];
        geometry.faces.push(new T.Face3(1,0,2));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);
        geometry.faces.push(new T.Face3(1,3,0));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        geometry.computeFaceNormals();

        let t = new T.TextureLoader().load("./Examples/window_texture.jpg");
        let mat = new T.MeshStandardMaterial({map:t, roughness:0.75});

        for(let h=0; h<5; h++){
            for(let w=0; w<3; w++){
                let block = new T.Mesh(geometry,mat);
                block.position.set(w,h,0);
                building.add(block);
            }
        }
        for(let h=0; h<5; h++){
            for(let w=0; w<3; w++){
                let block = new T.Mesh(geometry,mat);
                block.position.set(w-1,h,-2);
                block.rotation.set(0,Math.PI,0);
                building.add(block);
            }
        }
        
        let side1 = new T.Group();
        for(let h=0; h<5; h++){
            for(let d=0; d<2; d++){
                let block = new T.Mesh(geometry,mat);
                block.position.set(d,h,-2);
                side1.add(block);
            }
        }
        side1.rotation.set(0,-Math.PI/2,0);
        side1.position.set(-3,0,-1);
        building.add(side1);

        let side2 = new T.Group();
        for(let h=0; h<5; h++){
            for(let d=0; d<2; d++){
                let block = new T.Mesh(geometry,mat);
                block.position.set(d,h,-2);
                side2.add(block);
            }
        }
        side2.rotation.set(0,Math.PI/2,0);
        side2.position.set(4,0,-1);
        building.add(side1);
        building.add(side2);


        let geo = new T.PlaneGeometry(3,2);
        let roof = new T.Mesh(geo,new T.MeshStandardMaterial({color:"grey",roughness:0.75}));
        roof.position.set(0.5,5,-1);
        roof.rotation.set(-Math.PI/2, 0,0);
        building.add(roof);


        //building.position.set(0,2,0);

        super("Building_" + id, building);
    }
}