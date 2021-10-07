import * as THREE from "three";
import { addToScene } from "../ThreeMiddleware";

function Box({ position, scale, color, opacity, id }) {
  console.log("creating");

  const geometry = new THREE.BoxBufferGeometry();
  geometry.translate(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: false, opacity: opacity, transparent: true });
  const cube = new THREE.Mesh(geometry, material);
  cube.name = id

  cube.position.set(position.x, position.y, position.z);
  if (scale !== undefined) {
    cube.scale.set(scale.x, scale.y, scale.z);
  }

  addToScene(cube);

  return <></>;
}

export default Box;
