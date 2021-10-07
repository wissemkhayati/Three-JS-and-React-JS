import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//import * as dat from "dat.gui";

function Main() {
  let frameId = "";
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const loader = new GLTFLoader();
  const controls = new OrbitControls(camera, renderer.domElement);
  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);


  /*********/
  
  document.addEventListener('click', onClick, false);

var raycaster, mouse;
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2()

  function onClick(event) {

    event.preventDefault();
  
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    raycaster.setFromCamera(mouse, camera);
  
    var intersects = raycaster.intersectObject(scene, true);
  
    if (intersects.length > 0) {
    
      var object = intersects[0].object;
  
      object.material.color.set( Math.random() * 0xffffff );
  
    }
  
  }
  /*********/
  useEffect(() => {
    scene.add(light);
    camera.position.set(0, 5, 4);
    camera.rotation.x = -45;

    //loadModel(loader);

    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", handleResize);
    document.body.appendChild(renderer.domElement);

    init();

    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render(scene, camera);
    };
    /**************/

    // Instantiate a loader
  }, []);

  //ben
  let items = [];
  let c = 2;
  let r = 2;
  let d = 2;
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      for (let k = 0; k < d; k++) {
        const geometry = new THREE.BoxGeometry();
        geometry.translate(0.5, 0.5, 0.5);
        const material = new THREE.MeshBasicMaterial({
          color: Math.random() * 0xffffff,
        });
        const cube = new THREE.Mesh(geometry, material);

        cube.position.set(j, i, k);
        cube.scale.set(1, 1, 1);
        scene.add(cube);
      }
    }
  }

  // Load a glTF resource
  const loadModel = (loader) => {
    loader.load(
      "./Attijeri_out/Attijeri.gltf",
      (gltf) => {
        scene.add(gltf.scene);
        renderer.render(scene, camera);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log("An error happened");
      }
    );
  };

  const init = () => {
    if (!frameId) {
      frameId = requestAnimationFrame(animate);
    }
  };

  const animate = () => {
    controls.update();
    renderScene();
    frameId = window.requestAnimationFrame(animate);
  };

  const renderScene = () => {
    renderer.render(scene, camera);
  };

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  return <div>main cmp</div>;
}

export default Main;
