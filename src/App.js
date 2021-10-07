import React, {useEffect, useState} from "react";
import { createEnvironment, createBin } from "./ThreeMiddleware";


function App() {
  
  const dummyData = [
    {x:0,y:0,z:0,sx:1,sy:1,sz:1, color:"red"},
    {x:1,y:0,z:0,sx:1,sy:1,sz:1, color:"red"},
    {x:0,y:1,z:1,sx:1,sy:1,sz:1, color:"red"},
    {x:1,y:1,z:1,sx:1,sy:1,sz:1, color:"blue"},
    {x:0,y:0,z:1,sx:1,sy:1,sz:1, color:"blue"},
    {x:1,y:1,z:0,sx:1,sy:1,sz:1, color:"blue"},
    {x:1,y:0,z:1,sx:1,sy:1,sz:1, color:"yellow"},
    {x:0,y:1,z:0,sx:1,sy:1,sz:1, color:"red"},
    {x:2,y:0,z:0,sx:1,sy:1,sz:1, color:"red"},
    {x:3,y:0,z:0,sx:1,sy:1,sz:1, color:"yellow"},
    {x:2,y:1,z:1,sx:1,sy:1,sz:1, color:"red"},
    {x:3,y:1,z:1,sx:1,sy:1,sz:1, color:"blue"},
    {x:2,y:0,z:1,sx:1,sy:1,sz:1, color:"red"},
    {x:3,y:1,z:0,sx:1,sy:1,sz:1, color:"green"},
    {x:3,y:0,z:1,sx:1,sy:1,sz:1, color:"red"},
    {x:2,y:1,z:0,sx:1,sy:1,sz:1, color:"yellow"},
    {x:4,y:0,z:0,sx:1,sy:1,sz:1, color:"red"},
    {x:5,y:0,z:0,sx:1,sy:1,sz:1, color:"red"},
    {x:4,y:1,z:1,sx:1,sy:1,sz:1, color:"yellow"},
    {x:5,y:1,z:1,sx:1,sy:1,sz:1, color:"red"},
    {x:4,y:0,z:1,sx:1,sy:1,sz:1, color:"yellow"},
    {x:5,y:1,z:0,sx:1,sy:1,sz:1, color:"green"},
    {x:5,y:0,z:1,sx:1,sy:1,sz:1, color:"green"},
    {x:4,y:1,z:0,sx:1,sy:1,sz:1, color:"green"}]

  useEffect(() => {
    createEnvironment();
    createBin(dummyData);
  });
 
  return (
    <div className="App">
    </div>
  );
}

export default App;