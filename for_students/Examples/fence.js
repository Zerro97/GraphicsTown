import * as T from "../THREE/src/Three.js";
import { GrObject } from "../Framework/GrObject.js";

export class Fence extends T.Mesh {
    constructor () {
        /**@type THREE.CurvePath */
        let fence_curve = new T.CurvePath();
        fence_curve.add(new T.LineCurve3(new T.Vector3(-0.5, 0, 0), new T.Vector3(-0.5, 0.8, 0)));
        fence_curve.add(new T.CubicBezierCurve3(new T.Vector3(-0.5, 0.8, 0), new T.Vector3(-0.5, 1, 0), new T.Vector3(0.5, 1, 0), new T.Vector3(0.5, 0.8, 0)));
        fence_curve.add(new T.LineCurve3(new T.Vector3(0.5, 0.8, 0), new T.Vector3(0.5, 0, 0)));
        
        let fence_geom = new T.TubeGeometry(fence_curve, 64, 0.1, 8);
        let fence_mat = new T.MeshStandardMaterial({color:"#999999", metalness:0.8, roughness:0.2});
        super(fence_geom, fence_mat)
        //let Fence = new T.Mesh();
        //Fence.scale.set(0.5,0.5,0.5);
    }
}