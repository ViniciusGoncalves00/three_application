import './styles.css';
import Alpine from 'alpinejs';
import * as THREE from 'three';
import { SceneManager } from './SceneManager';
import { Vector } from './InputManager';
import * as InputManager from './InputManager';
import { HandleMesh } from './HandleMesh';

declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

window.Alpine = Alpine;

const keysPressed: Record<string, boolean> = {};
let selectedMesh: THREE.Mesh;
let speed: number = 1;

document.addEventListener("alpine:init", () => {
    Alpine.store("input", {
        setup_input() {
            const sceneManager = SceneManager.GetInstance();
            let handler = new HandleMesh();

            document.addEventListener("keydown", (event: KeyboardEvent) => {
                keysPressed[event.key] = true;
            });

            document.addEventListener("keyup", (event: KeyboardEvent) => {
                keysPressed[event.key] = false;
            });

            const update = () => {
                
                let direction = new THREE.Vector3(0, 0, 0);
                
                if (keysPressed["I"] || keysPressed["i"]){
                    selectedMesh = handler.GenerateMesh();
                }
                if (selectedMesh == null) {
                    return;
                }

                if (keysPressed["ArrowLeft"]) {
                    direction.add(Vector.Left);
                }
                if (keysPressed["ArrowRight"]) {
                    direction.add(Vector.Right);
                }
                
                direction.normalize();
                handler.Move(selectedMesh, direction, speed);
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