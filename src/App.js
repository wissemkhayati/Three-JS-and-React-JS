import React, {useEffect, useState} from "react";
import { createEnvironment, createBin, showCategory, changeMaterial } from "./ThreeMiddleware";


function App() {
  
  const dummyData = [
    {x:0,y:0,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:1,y:0,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:0,y:1,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:1,y:1,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'blue', color:"blue"},
    {x:0,y:0,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'blue', color:"blue"},
    {x:1,y:1,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'blue', color:"blue"},
    {x:1,y:0,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'yellow', color:"yellow"},
    {x:0,y:1,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:2,y:0,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:3,y:0,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'yellow', color:"yellow"},
    {x:2,y:1,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:3,y:1,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'blue', color:"blue"},
    {x:2,y:0,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:3,y:1,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'green', color:"green"},
    {x:3,y:0,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:2,y:1,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'yellow', color:"yellow"},
    {x:4,y:0,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:5,y:0,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:4,y:1,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'yellow', color:"yellow"},
    {x:5,y:1,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'red', color:"red"},
    {x:4,y:0,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'yellow', color:"yellow"},
    {x:5,y:1,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'green', color:"green"},
    {x:5,y:0,z:1,sx:1,sy:1,sz:1, wireframe:true,category:'green', color:"green"},
    {x:4,y:1,z:0,sx:1,sy:1,sz:1, wireframe:true,category:'green', color:"green"}]

  useEffect(() => {
    createEnvironment();
    createBin(dummyData);
  });

  const category = (category) => {
    showCategory(category, false)
  }

  const material = (wireframe) => {
    changeMaterial(wireframe)
  }
 
  return (
    <div className="App">
      <button > -------------- </button>
      <button onClick={()=>category('green')}> green category</button>
      <button onClick={()=>category('yellow')}> yellow category</button>
      <button onClick={()=>category('red')}> red category</button>
      <button onClick={()=>category('blue')}> blue category</button>
      <button onClick={()=>category('all')}> All</button>
      <button > -------------- </button>
      <button onClick={()=>material(true)}> wireframe</button>
      <button onClick={()=>material(false)}> colored</button>
    </div>
  );
}

export default App;