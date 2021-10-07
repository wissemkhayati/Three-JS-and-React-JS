import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

let frameId = "";
let c = 2;
let r =2;
let d =2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);
const stats = new Stats();
const mouse = new THREE.Vector2(1, 1);
const raycaster = new THREE.Raycaster();
const axesHelper = new THREE.AxesHelper( 5 );


const createEnvironment = () => {
  console.log("create environment");
 
  window.addEventListener("resize", handleResize);
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(stats.domElement);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener('click', onClick);

  scene.add( axesHelper );

  init();
}



const removeFromScene = (m) => {
  scene.remove(m);
}

const init = () => {
  if (!frameId) {
    frameId = requestAnimationFrame(animate);
  }

  camera.position.set(10, 5, 5);
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene.background = new THREE.Color( 0xA2AAAD );
}

const animate = () => {
  stats.update();
  renderer.render(scene, camera);
  controls.update()
  frameId = window.requestAnimationFrame(animate);
}

const handleResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const onMouseMove = (event) => {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

const onClick = (event) => {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObject(scene, true);

  if (intersects.length > 0) {
  
    var object = intersects[0].object;

    //object.material.color.set( Math.random() * 0xffffff );
   
    //change_opacity(object.name)
    object.material.opacity = 0;
   
  }
}

let i=0
function createBin(dummyData) {
  console.log(dummyData)
  setTimeout(function () {
    Box({
      position:{ x: dummyData[i].x, y: dummyData[i].y, z: dummyData[i].z },
      color:dummyData[i].color,
      opacity:1,
      id: Math.random() + i,
      scale :{ x: dummyData[i].sx, y: dummyData[i].sy, z: dummyData[i].sz },
    })
    i++
   
    if(i===dummyData.length) return
    createBin(dummyData);
  }, 1000);
}

const Box = ({ position, scale, color, opacity, id }) => {
  console.log("create boxes");

  const geometry = new THREE.BoxBufferGeometry();
  geometry.translate(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: false, opacity: opacity, transparent: true });
  const cube = new THREE.Mesh(geometry, material);
  cube.name = id
  cube.data = { position, scale, color, opacity, id }
  cube.position.set(position.x, position.y, position.z);
  if (scale !== undefined) {
    cube.scale.set(scale.x, scale.y, scale.z);
  }

  scene.add(cube);
 
  return cube
}

export { createEnvironment, createBin };
