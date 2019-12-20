import * as T from "../THREE/src/Three.js";
import { GrObject } from "../Framework/GrObject.js";

export class House1 extends GrObject {
    constructor (id) {
        let house = new T.Group();
        let geometry = new T.Geometry();

        geometry.vertices.push(new T.Vector3(-1,1,0)); //0  front top left
        geometry.vertices.push(new T.Vector3( 0,0, 0)); //1 front bottom right
        geometry.vertices.push(new T.Vector3( -1,0, 0)); //2 front bottom left
        geometry.vertices.push(new T.Vector3( 0,1,0)); //3 front top right
    
        geometry.vertices.push(new T.Vector3( 0,0,-1)); //4 back bottom right
        geometry.vertices.push(new T.Vector3( 0,1, -1)); //5 back top right
        geometry.vertices.push(new T.Vector3( -1,0,-1)); //6 back bottom right
        geometry.vertices.push(new T.Vector3( -1,1,-1)); //7 back top right
    
        geometry.faceVertexUvs = [ [] ];
        geometry.faces.push(new T.Face3(1,0,2));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);

        geometry.faces.push(new T.Face3(1,3,0));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);


        geometry.faces.push(new T.Face3(1,4,3));
        geometry.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(0,1)]);

        geometry.faces.push(new T.Face3(4,5,3));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);


        geometry.faces.push(new T.Face3(4,6,5));
        geometry.faceVertexUvs[0].push([new T.Vector2(0,0), new T.Vector2(1,0), new T.Vector2(0,1)]);

        geometry.faces.push(new T.Face3(6,7,5));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);


        geometry.faces.push(new T.Face3(0,6,2));
        geometry.faceVertexUvs[0].push([new T.Vector2(0,1), new T.Vector2(0,0), new T.Vector2(1,0)]);

        geometry.faces.push(new T.Face3(0,7,6));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,1), new T.Vector2(0,1), new T.Vector2(1,0)]);

        
        geometry.faces.push(new T.Face3(3,7,0));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);

        geometry.faces.push(new T.Face3(3,5,7));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);

        
        geometry.faces.push(new T.Face3(2,6,4));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);

        geometry.faces.push(new T.Face3(2,4,1));
        geometry.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
    
        geometry.computeFaceNormals();
    
        let tl = new T.TextureLoader().load("./Examples/house_texture.jpg");
        let material = new T.MeshStandardMaterial({map:tl, roughness:0.75});
        let foundation = new T.Mesh(geometry,material);

        let A = new T.Vector2( 0, 0 );
        let B = new T.Vector2( 0.6, 0.8 );
        let C = new T.Vector2( 1.2, 0 );
        let vertices = [A,B,C];
        let height = 1;

        let Shape = new T.Shape();
        (function f( ctx ) {
            ctx.moveTo( vertices[0].x, vertices[0].y );
            for (var i=1; i < vertices.length; i++) {
                ctx.lineTo( vertices[i].x, vertices[i].y );
            }
            ctx.lineTo( vertices[0].x, vertices[0].y );
        } )( Shape );

        let settings = { };
        settings.amount = height;
        settings.bevelEnabled = false;

        let geo = new T.ExtrudeGeometry(Shape, settings);
        geo.computeFaceNormals();
        let t = new T.TextureLoader().load("./Examples/roof_texture.jpg");
        let mat = new T.MeshStandardMaterial({map:t, roughness:0.75});
        let prism1 = new T.Mesh(geo, mat);
        prism1.position.set(-1.1, 1, -1);


        let box = new T.Geometry();
        box.vertices.push(new T.Vector3(-0.4,0.8,0)); //0  front top left
        box.vertices.push(new T.Vector3( 0,0,0)); //1 front bottom right
        box.vertices.push(new T.Vector3(-0.4,0,0)); //2 front bottom left
        box.vertices.push(new T.Vector3( 0,0.8,0)); //3 front top right

        box.faceVertexUvs = [ [] ];
        box.faces.push(new T.Face3(1,0,2));
        box.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);

        box.faces.push(new T.Face3(1,3,0));
        box.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);

        let tl3 = new T.TextureLoader().load("./Examples/door_texture.jpg");
        let mat3 = new T.MeshStandardMaterial({map:tl3, roughness:0.75});

        box.computeFaceNormals();

        let door = new T.Mesh(
            box,
            mat3
        )
        door.position.set(-0.3,0,0.001);

        house.add(prism1);
        house.add(foundation);
        house.add(door);

        super("House_"+id, house);
    }
}