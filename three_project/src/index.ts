import './styles.css';
import Alpine from 'alpinejs';
import * as THREE from 'three';
import { SceneManager } from './SceneManager';
import { InputManager } from './InputManager';
import { Vector } from './InputManager';
import { HandleMesh } from './HandleMesh';

declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

window.Alpine = Alpine;

let selectedMesh: THREE.Mesh;
let speed: number = 1;

document.addEventListener("alpine:init", () => {
    Alpine.store("input", {
        setup_input() {
            const sceneManager = SceneManager.GetInstance();
            const inputManager = InputManager.GetInstance();
            const handler = new HandleMesh();

            const update = () => {
                let direction = new THREE.Vector3(0, 0, 0);
                
                if (inputManager.GetKeyDown(inputManager.Instantiate))
                {
                    selectedMesh = handler.GenerateMesh();
                }

                if (selectedMesh != null)
                {
                    if (inputManager.GetKey(inputManager.Left)) {
                        direction.add(Vector.Left);
                    }
                    if (inputManager.GetKey(inputManager.Right)) {
                        direction.add(Vector.Right);
                    }
                    if (inputManager.GetKey(inputManager.Up)) {
                        direction.add(Vector.Up);
                    }
                    if (inputManager.GetKey(inputManager.Down)) {
                        direction.add(Vector.Down);
                    }
                    
                    direction.normalize();
                    handler.Move(selectedMesh, direction, speed / 10);
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