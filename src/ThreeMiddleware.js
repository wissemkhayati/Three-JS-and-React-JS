import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import ThreeMeshUI from 'three-mesh-ui/src/three-mesh-ui.js';
import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

let frameId = "";
let bin = []

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
let container = new ThreeMeshUI.Block();
let text = new ThreeMeshUI.Text();
let grid = new THREE.LineSegments();

let light_1 = new THREE.PointLight(0xffffff,3)
let light_2 = new THREE.PointLight(0xffffff,3)
let light_3 = new THREE.PointLight(0xffffff,3)
let light_4 = new THREE.PointLight(0xffffff,3)

const createEnvironment = () => {
  console.log("create environment");
 
  window.addEventListener("resize", handleResize);
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(stats.domElement);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener('click', onClick);
  scene.add( axesHelper );
  scene.add(light_1);
  scene.add(light_2);
  scene.add(light_3);
  scene.add(light_4);

  init();
}

const init = () => {
  if (!frameId) {
    frameId = requestAnimationFrame(animate);
  }

  camera.position.set(10, 5, 5);
  renderer.setSize(window.innerWidth, window.innerHeight);
  axesHelper.material.color.set( 0, 0, 0, 0 );
  scene.background = new THREE.Color( 0xA2AAAD );
  
  
  container.set({
    width: 2.8,
    height: 1.8,
    padding: 0.8,
    fontFamily: FontJSON,
    fontTexture: FontImage
  });
  container.position.set( -2,0,4.1 );

  text.set({
    content: "data",
    fontSize: 0.3
  });
  container.add( text ); 
  scene.add( container );


  light_1.position.set(0,3,5);
  light_2.position.set(5,1,0);
  light_3.position.set(0,1,-5);
  light_4.position.set(-5,3,0);


  grid = new THREE.LineSegments(
    new BoxLineGeometry( 80, 80, 80, 80, 80, 80 ).translate( 0, 39.9, 0 ),
    new THREE.LineBasicMaterial( { color: 0x999999 } )
  );
  scene.add( grid ); //I added the grid from here because I need an update immediately after setting config


}

const animate = () => {
  stats.update();
  renderer.render(scene, camera);
  controls.update()
  ThreeMeshUI.update();
  
  container.lookAt(0, 9000,180)

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
    if (object.type === "LineSegments") {return}
    textPanel("hola", object.position)
  }

    //object.material.color.set( Math.random() * 0xffffff );
    //change_opacity(object.name)
    //object.material.opacity = 0;
}

let i=0
function createBin(dummyData) {
  setTimeout(function () {
    bin.push(
      Box({
        position:{ x: dummyData[i].x, y: dummyData[i].y, z: dummyData[i].z },
        color:dummyData[i].color,
        opacity:1,
        id: Math.random() + i,
        scale :{ x: dummyData[i].sx, y: dummyData[i].sy, z: dummyData[i].sz },
        category: dummyData[i].category,
        wireframe: dummyData[i].wireframe
      })
    )
    i++  
    if(i===dummyData.length) return
    createBin(dummyData);
  }, 200);
}

const showCategory = (category, wireframe) => {
  if(category === 'all') {
    bin.map((b) => {
        b.material.opacity = 1;
    })
    return
  }
  bin.map((b) => {
    if(b.data.category !== category){
      b.material.opacity = 0.1;
    }else{ b.material.opacity = 1; }
  })
}

const changeMaterial = (wireframe) => {
    bin.map((b) => {
        b.material.wireframe = wireframe;
    })
}

const Box = ({ position, scale, color, opacity, id, category, wireframe }) => {
  console.log("create boxes");

  const geometry = new THREE.BoxBufferGeometry();
  geometry.translate(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: wireframe, opacity: opacity, transparent: true });
  const cube = new THREE.Mesh(geometry, material);
  cube.name = id
  cube.data = { position, scale, color, opacity, id, category, wireframe }
  cube.position.set(position.x, position.y, position.z);
  if (scale !== undefined) {
    cube.scale.set(scale.x, scale.y, scale.z);
  }

  scene.add(cube);
 
  return cube
}

function textPanel(message, position) {


  //container.position.set( position.x,3,5 );
  
};

export { createEnvironment, createBin, showCategory, changeMaterial };
