import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Loader({ add, position }) {
  const loader = new GLTFLoader();
  loader.load(
    "./model.gltf",
    (gltf) => {
      var model = gltf.scene;
      model.position.x = position.x;
      model.position.y = position.y;
      model.position.z = position.z;

      add(model);
      //renderer.render(scene, camera);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log("An error happened");
    }
  );
  return <> </>;
}
export default Loader;
