import * as T from "../THREE/src/Three.js";
import { GrObject } from "../Framework/GrObject.js";

export class Road1 extends GrObject {
    constructor (length, id) {
        let road = new T.Group();

        let geometry = new T.Geometry();
        geometry.vertices.push(new T.Vector3(-1,0,-1)); //0 top left
        geometry.vertices.push(new T.Vector3( 0,0,0)); //1 bottom right
        geometry.vertices.push(new T.Vector3( -1,0,0)); //2 bottom left
        geometry.vertices.push(new T.Vector3( 0,0,-1)); //3 top right
    
        geometry.faceVertexUvs = [ [] ];
        geometry.faces.push(new T.Face3(1,0,2));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);
        geometry.faces.push(new T.Face3(1,3,0));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
        geometry.computeFaceNormals();

        let t = new T.TextureLoader().load("./Examples/road_texture.jpg");
        let mat = new T.MeshStandardMaterial({map:t, roughness:0.75});

        for(let i=0; i<length; i++){
            let block = new T.Mesh(geometry,mat);
            block.position.set(0,0.01,i);
            road.add(block);
        }
        
        super("Road_" + id, road);
    }
}