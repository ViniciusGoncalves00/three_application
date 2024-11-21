import * as THREE from 'three';
import { SceneManager } from './SceneManager';
export class HandleMesh {
    constructor() {
        this._sceneManager = SceneManager.GetInstance();
    }
    Move(mesh, direction, distance) {
        direction.normalize();
        let offset = direction.multiplyScalar(distance);
        mesh.position.add(offset);
    }
    GenerateMesh() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this._sceneManager.Scene.add(cube);
        this._sceneManager.Renderer.render(this._sceneManager.Scene, this._sceneManager.Camera);
        return cube;
    }
}
