import * as THREE from 'three';

export class InputManager {
    private static _instance: InputManager;
    private keysHeld: Record<string, boolean> = {};
    private keysDown: Record<string, boolean> = {};
    private keysUp: Record<string, boolean> = {};

    public Instantiate: string = "i";
    public Right: string = "ArrowRight";
    public Left: string = "ArrowLeft";
    public Up: string = "ArrowUp";
    public Down: string = "ArrowDown";

    private constructor() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (!this.keysHeld[event.key]) {
                this.keysDown[event.key] = true;
            }
            this.keysHeld[event.key] = true;
        });

        document.addEventListener("keyup", (event: KeyboardEvent) => {
            this.keysUp[event.key] = true;
            this.keysHeld[event.key] = false;
        });
    }

    public static GetInstance(): InputManager {
        if (!this._instance) {
            this._instance = new InputManager();
        }
        return this._instance;
    }

    public GetKey(key: string): boolean {
        return this.keysHeld[key] ?? false;
    }

    public GetKeyDown(key: string): boolean {
        const isDown = this.keysDown[key] ?? false;
        this.keysDown[key] = false;
        return isDown;
    }

    public GetKeyUp(key: string): boolean {
        const isUp = this.keysUp[key] ?? false;
        this.keysUp[key] = false;
        return isUp;
    }
}

export class Vector {
    static Right = new THREE.Vector3(1, 0, 0);
    static Left = new THREE.Vector3(-1, 0, 0);
    static Up = new THREE.Vector3(0, 1, 0);
    static Down = new THREE.Vector3(0, -1, 0);
}
