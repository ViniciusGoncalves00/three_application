import './styles.css';
import Alpine from 'alpinejs';
import * as THREE from 'three';
import { SceneManager } from './SceneManager';
import { Keyboard } from './Keyboard';
import { Mouse } from './Mouse';
import { Vector } from './Utils';
import { HandleMesh } from './HandleMesh';

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

            const update = () => {
                let direction = new THREE.Vector3(0, 0, 0);
                
                if (keyboard.GetKeyDown(keyboard.Instantiate))
                {
                    meshHandler.GenerateMesh();
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
                    if (keyboard.GetKey(keyboard.Left)) {
                        direction.add(Vector.Left);
                    }
                    if (keyboard.GetKey(keyboard.Right)) {
                        direction.add(Vector.Right);
                    }
                    if (keyboard.GetKey(keyboard.Up)) {
                        direction.add(Vector.Up);
                    }
                    if (keyboard.GetKey(keyboard.Down)) {
                        direction.add(Vector.Down);
                    }
                    
                    direction.normalize();
                    meshHandler.Move(selectedMesh, direction, speed / 10);
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
});

interface InputStore {
    setup_input: () => void;
}

document.addEventListener("DOMContentLoaded", () => {
    Alpine.start();

    const input = Alpine.store("input") as InputStore;
    input.setup_input();
});