import './styles.css';
import Alpine from 'alpinejs';
import * as THREE from 'three';
import { SceneManager } from './SceneManager';
import { Vector } from './InputManager';
import { HandleMesh } from './HandleMesh';
window.Alpine = Alpine;
const keysPressed = {};
let selectedMesh;
let speed = 1;
document.addEventListener("alpine:init", () => {
    Alpine.store("input", {
        setup_input() {
            const sceneManager = SceneManager.GetInstance();
            document.addEventListener("keydown", (event) => {
                keysPressed[event.key] = true;
            });
            document.addEventListener("keyup", (event) => {
                keysPressed[event.key] = false;
            });
            const loop = () => {
                move();
                sceneManager.Renderer.render(sceneManager.Scene, sceneManager.Camera);
                requestAnimationFrame(loop);
            };
            loop();
            const move = () => {
                if (selectedMesh == null) {
                    return;
                }
                let direction = new THREE.Vector3(0, 0, 0);
                if (keysPressed["ArrowLeft"]) {
                    direction.add(Vector.Left);
                }
                if (keysPressed["ArrowRight"]) {
                    direction.add(Vector.Right);
                }
                direction.normalize();
                let handler = new HandleMesh();
                handler.Move(selectedMesh, direction, speed);
            };
        },
    });
});
document.addEventListener("DOMContentLoaded", () => {
    Alpine.start();
    const handler = new HandleMesh();
    const mesh = handler.GenerateMesh();
    selectedMesh = mesh;
    const input = Alpine.store("input");
    input.setup_input();
});
