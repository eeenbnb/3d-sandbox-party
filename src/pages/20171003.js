import React, { Component } from 'react'
import THREELib from "three-js";

class View3d20171003 extends Component {
  render() {
    return (
      <div id="canvas">
      </div>
    )
  }
  componentDidMount(){
    var THREE = THREELib(['OrbitControls']);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( 500, 500 );
    //scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );
    scene.add( new THREE.AxisHelper(20) );
    //camera
    const camera = new THREE.PerspectiveCamera(45, 500 / 500, 1, 100000);
    camera.position.set(0, 17, -15);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);
    //light
    scene.add( new THREE.AmbientLight( 0xF0F0F0 ) );
    //control
    const controls = new THREE.OrbitControls(camera);
    //box
    const rand = ()=>{
      return Math.random() * 500 - 250;
    }
    for(var i=0;i<100;i++){
      let geometry = new THREE.BoxGeometry(10,10,10);
      let material = new THREE.MeshPhongMaterial({color: 0xffff00});
      let hako      = new THREE.Mesh(geometry, material);
      hako.position.set(rand(),rand(),rand());
      scene.add(hako);
    }
    var urls = [

      "assets/skybox/universe/right.png",
      "assets/skybox/universe/left.png",

      "assets/skybox/universe/up.png",
      "assets/skybox/universe/down.png",

      "assets/skybox/universe/front.png",
      "assets/skybox/universe/back.png",
    ];

    const cubeTexLoader = new THREE.CubeTextureLoader();
    var cubeShader;
    cubeTexLoader.load( urls,(tex)=> {
      cubeShader = THREE.ShaderLib[ 'cube' ];
      cubeShader.uniforms[ 'tCube' ].value = tex;

      const skyBoxMaterial = new THREE.ShaderMaterial({
          fragmentShader: cubeShader.fragmentShader,
          vertexShader: cubeShader.vertexShader,
          uniforms: cubeShader.uniforms,
          depthWrite: false,
          side: THREE.BackSide
      });
      const mesh = new THREE.Mesh( new THREE.BoxGeometry( 3000, 3000, 3000, 1, 1, 1 ),
                                skyBoxMaterial);
      scene.add( mesh );
    });

    document.getElementById('canvas').appendChild(renderer.domElement);
    const tick = ()=>{
      controls.update();
      requestAnimationFrame(tick);
      renderer.render(scene, camera);
    }
    tick();
  }
}
export default View3d20171003
