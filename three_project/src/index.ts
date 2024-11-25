import './styles.css';
import Alpine from 'alpinejs';
import * as THREE from 'three';
import { SceneManager } from './models/SceneManager';
import { Keyboard } from './models/Keyboard';
import { Mouse } from './models/Mouse';
import { Vector } from './models/Utils';
import { HandleMesh } from './models/HandleMesh';

declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

window.Alpine = Alpine;

let selectedMesh: THREE.Mesh | null;
let speed: number = 1;

document.addEventListener("alpine:init", () => {
    Alpine.store("input", {
        setup_input() {
            const sceneManager = SceneManager.GetInstance();
            const mouse = Mouse.GetInstance();
            const keyboard = Keyboard.GetInstance();
            const meshHandler = new HandleMesh();
            const raycaster = new THREE.Raycaster();

            for (let i = 0; i < 30; i++) {
                meshHandler.GenerateMesh()
            }

            const update = () => {
                let direction = new THREE.Vector3(0, 0, 0);
                
                if (keyboard.GetKeyDown(keyboard.Instantiate))
                {
                    meshHandler.GenerateMesh();
                }

                if(keyboard.GetKeyDown("p"))
                {
                    sceneManager.Scene.children.forEach(children => {
                        console.log(children.name)
                    });
                }

                if(mouse.GetButtonDown(mouse.leftButton))
                {
                    raycaster.setFromCamera(mouse.NormalizedPosition(), sceneManager.Camera);

                    const intersects = raycaster.intersectObjects(sceneManager.Scene.children, true);
                
                    if (intersects.length > 0) {
                        selectedMesh = intersects[0].object as THREE.Mesh;
                    }
                    else
                    {
                        selectedMesh = null;
                    }
                }

                if (selectedMesh != null)
                {
                    if (keyboard.GetKeyHeld(keyboard.Left)) {
                        direction.add(Vector.Left);
                    }
                    if (keyboard.GetKeyHeld(keyboard.Right)) {
                        direction.add(Vector.Right);
                    }
                    if (keyboard.GetKeyHeld(keyboard.Up)) {
                        direction.add(Vector.Up);
                    }
                    if (keyboard.GetKeyHeld(keyboard.Down)) {
                        direction.add(Vector.Down);
                    }
                    
                    direction.normalize();
                    meshHandler.Move(selectedMesh, direction, speed);
                }
            }

            const loop = () => {
                update();
                sceneManager.Renderer.render(sceneManager.Scene, sceneManager.Camera);
                requestAnimationFrame(loop);
            };
            loop();
        },
    });
    interface SceneStore {
        children: string[];
        setup_scene: () => void;
    }

    Alpine.store("scene", {
        children: [],
        setup_scene() {
            const sceneManager = SceneManager.GetInstance();
            this.children = sceneManager.Scene.children.map(child => child.name || "Unnamed Object");
        },
    } as SceneStore);
});

interface InputStore {
    setup_input: () => void;
}
interface SceneStore {
    setup_scene: () => void;
}

document.addEventListener("DOMContentLoaded", () => {
    Alpine.start();

    const input = Alpine.store("input") as InputStore;
    const scene = Alpine.store("scene") as SceneStore;
    input.setup_input();
    scene.setup_scene();
});