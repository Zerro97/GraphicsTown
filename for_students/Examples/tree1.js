import * as T from "../THREE/src/Three.js";
import { GrObject } from "../Framework/GrObject.js";

export class Tree1 extends GrObject {
    constructor(id) {
        let tl2 = new T.TextureLoader().load("./Examples/leaf_texture.jpg");
        let mat = new T.MeshStandardMaterial({map:tl2, roughness:0.75});

        const tree = new T.Group();
        const level1 = new T.Mesh(
            new T.ConeGeometry(0.5,0.75,8),
            mat
        );
        level1.position.y = 1.8;
        tree.add(level1);
        const level2 = new T.Mesh(
            new T.ConeGeometry(0.75,0.75,8),
            mat
        );
        level2.position.y = 1.4;
        tree.add(level2);
        const level3 = new T.Mesh(
            new T.ConeGeometry(1,0.75,8),
            mat
        );
        level3.position.y = 1;
        tree.add(level3);

        let tl = new T.TextureLoader().load("./Examples/trunk_texture.jpg");
        let material = new T.MeshStandardMaterial({map:tl, roughness:0.75});

        const trunk = new T.Mesh(
            new T.CylinderGeometry(0.35,0.35,1.2),
            material
        );
        trunk.position.y = 0.5;
        tree.add(trunk);

        super("Tree_" + id, tree);
    }
}