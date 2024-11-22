import * as THREE from 'three';
import { SceneManager } from './SceneManager';

export class Mouse
{
    private static _instance : Mouse;
    private _raycaster = new THREE.Raycaster();
    private _sceneManager : SceneManager;

    public position = new THREE.Vector2();

    private constructor()
    {
        this._sceneManager = SceneManager.GetInstance();

        document.addEventListener("pointermove", (event) => {
            const x = event.clientX;
            const y = event.clientY;
            this.position.set(x, y);
        });

        document.addEventListener("click", (event) => {
            this._raycaster.setFromCamera(this.position,  this._sceneManager.Camera);
            const intersects = this._raycaster.intersectObjects(this._sceneManager.Scene.children, true)

            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                console.log('Clicked object:', clickedObject);
            }
        })
    }

    public static GetInstance()
    {
        if (this._instance == null)
        {
            this._instance = new Mouse();
        }
        return this._instance;
    }
}