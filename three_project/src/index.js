import './styles.css';
import Alpine from 'alpinejs';
import { plugin } from 'postcss';
import * as THREE from 'three';

window.Alpine = Alpine;

const threeJsRefs = {
    cube: null,
    scene: null,
    renderer: null,
    camera: null,
};

const keysPressed = {};

document.addEventListener("alpine:init", () =>
{
    Alpine.store("callbacks",
    {
        setup_scene()
        {
            threeJsRefs.scene = new THREE.Scene();

            threeJsRefs.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
            threeJsRefs.camera.position.z = 5;

            threeJsRefs.renderer = new THREE.WebGLRenderer();
            threeJsRefs.renderer.setSize( window.innerWidth, window.innerHeight );

            document.body.appendChild( threeJsRefs.renderer.domElement );

            threeJsRefs.renderer.render( threeJsRefs.scene, threeJsRefs.camera );
        },

        instantiate()
        {
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            threeJsRefs.cube = new THREE.Mesh( geometry, material );
            threeJsRefs.scene.add( threeJsRefs.cube );
            threeJsRefs.renderer.render( threeJsRefs.scene, threeJsRefs.camera );
        },

        move_cube(direction)
        {
            if (direction === 'left')
            {
                threeJsRefs.cube.position.x -= 1;
            }
            else if (direction === 'right')
            {
                threeJsRefs.cube.position.x += 1;
            }

            threeJsRefs.renderer.render( threeJsRefs.scene, threeJsRefs.camera );
        },
    })

    Alpine.store("input",
    {
        vector_left : new THREE.Vector3( -1, 0, 0 ),
        vector_right : new THREE.Vector3( 1, 0, 0 ),
        speed : 1,

        setup_input()
        {
            document.addEventListener('keydown', (event) => {
                keysPressed[event.key] = true;
            });

            document.addEventListener('keyup', (event) => {
                keysPressed[event.key] = false;
            });

            this.update_input();
        },

        update_input() {
            const loop = () => {
                this.move();
                threeJsRefs.renderer.render(threeJsRefs.scene, threeJsRefs.camera);
                requestAnimationFrame(loop);
            };
            loop();
        },

        move()
        {
            let direction = new THREE.Vector3( 0, 0, 0 )

            if (keysPressed['ArrowLeft']) {
                direction.add(this.vector_left);
            }
            if (keysPressed['ArrowRight']) {
                direction.add(this.vector_right);
            }
            
            direction.normalize()
            let offset = direction.multiplyScalar(this.speed)
            threeJsRefs.cube.position.x += offset.x / 100;
            threeJsRefs.cube.position.x += offset.y / 100;
        },

        handleKeyLeft(event)
        {
            keysPressed[event.key] = true;
        },
        handleKeyRight(event)
        {
            keysPressed[event.key] = true;
        },
    })
});

document.addEventListener("DOMContentLoaded", () => {
    Alpine.start();
    Alpine.store("callbacks").setup_scene();
    Alpine.store("callbacks").instantiate();
    Alpine.store("input").setup_input();
});