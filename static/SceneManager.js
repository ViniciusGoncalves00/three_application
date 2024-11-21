import * as THREE from 'three';
export class SceneManager {
    constructor() {
        this.Scene = new THREE.Scene();
        this.Camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.Camera.position.z = 5;
        this.Renderer = new THREE.WebGLRenderer();
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.Renderer.domElement);
        this.Renderer.render(this.Scene, this.Camera);
    }
    static GetInstance() {
        if (this._instance == null) {
            this._instance = new SceneManager();
        }
        return this._instance;
    }
}
SceneManager._instance = null;
