import * as THREE from 'three';

export class Vector {
    static Zero = new THREE.Vector3(0, 0, 0);
    static Right = new THREE.Vector3(1, 0, 0);
    static Left = new THREE.Vector3(-1, 0, 0);
    static Up = new THREE.Vector3(0, 0, 1);
    static Down = new THREE.Vector3(0, 0, -1);
}