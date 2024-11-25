import * as THREE from 'three';

export class Mouse
{
    private static _instance : Mouse;

    public position = new THREE.Vector2();

    private buttonsHeld: Record<number, boolean> = {};
    private buttonsDown: Record<number, boolean> = {};
    private buttonsUp: Record<number, boolean> = {};

    public leftButton : number = 0;
    public rightButton : number = 1;
    public middleButton : number = 2;

    private constructor()
    {
        document.addEventListener("mousedown", (event: MouseEvent) => {
            if (!this.buttonsHeld[event.button]) {
                this.buttonsDown[event.button] = true;
            }
            this.buttonsHeld[event.button] = true;
        });

        document.addEventListener("mouseup", (event: MouseEvent) => {
            this.buttonsUp[event.button] = true;
            this.buttonsHeld[event.button] = false;
        });

        document.addEventListener("mousemove", (event: MouseEvent) => {
            this.position.x = event.clientX;
            this.position.y = event.clientY;
        });
    }

    public static GetInstance()
    {
        if (this._instance == null)
        {
            this._instance = new Mouse();
        }
        return this._instance;
    }

    public GetButtonHeld(button: number): boolean {
        return this.buttonsHeld[button] ?? false;
    }

    public GetButtonDown(button: number): boolean {
        const isDown = this.buttonsDown[button] ?? false;
        this.buttonsDown[button] = false;
        return isDown;
    }

    public GetButtonUp(button: number): boolean {
        const isUp = this.buttonsUp[button] ?? false;
        this.buttonsUp[button] = false;
        return isUp;
    }

    public GetPosition(): { x: number; y: number } {
        return this.position;
    }

    public NormalizedPosition(): THREE.Vector2
    {
        const x = (this.position.x / window.innerWidth) * 2 - 1;
        const y = -(this.position.y / window.innerHeight) * 2 + 1;
    
        return new THREE.Vector2(x,y);
    }
}