import * as THREE from 'three';
import { SceneManager } from './SceneManager';

export class HandleMesh
{
    private _sceneManager : SceneManager;

    public constructor()
    {
        this._sceneManager = SceneManager.GetInstance();
    }

    public Move(mesh : THREE.Mesh, direction : THREE.Vector3, distance : number)
    {
        direction.normalize();
        let offset = direction.multiplyScalar(distance);
        mesh.position.add(offset);
    }

    public GenerateMesh(): THREE.Mesh
    {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        const meshes = this._sceneManager.Scene.children.filter(child => child instanceof THREE.Mesh);
        let index = 0;
        let name = "mesh_" + index;
        while(true)
        {
            try
            {
                meshes[index].name == name;
            }
            catch (error)
            {
                break;
            }
            index++;
            name = "mesh_" + index;
        }
        cube.name = name;
        this._sceneManager.Scene.add(cube);
        this._sceneManager.Renderer.render(this._sceneManager.Scene, this._sceneManager.Camera);

        return cube;
    }
}