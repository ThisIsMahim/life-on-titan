/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from '../../shaders/vertex.glsl';
import fragmentShader from '../../shaders/fragment.glsl';
import atmosphereVertexShader from '../../shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from '../../shaders/atmosphereFragment.glsl';
import swooshSound from '../../assets/sounds/swoosh.mp3';
import { useNavigate } from 'react-router-dom';
import '../../style/canvas.css';

const Planet = ({ texturePath }) => {
    const canvasContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const audioRef = useRef(new Audio(swooshSound));
    const navigate = useNavigate();
  
    useEffect(() => {
      const canvasContainer = canvasContainerRef.current;
  
      // Set up the scene, camera, and renderer
      const scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera(
        75,
        canvasContainer.offsetWidth / canvasContainer.offsetHeight,
        0.1,
        1000
      );
  
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasRef.current
      });
      renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
  
      // Create the sphere (planet)
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
        new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            globeTexture: {
              value: new THREE.TextureLoader().load(texturePath)
            }
          }
        })
      );
  
      // Create atmosphere
      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
        new THREE.ShaderMaterial({
          vertexShader: atmosphereVertexShader,
          fragmentShader: atmosphereFragmentShader,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide
        })
      );
  
      atmosphere.scale.set(1.1, 1.1, 1.1);
      scene.add(atmosphere);
  
      const group = new THREE.Group();
      group.add(sphere);
      scene.add(group);
  
      // Create stars
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
      const starVertices = [];
  
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 3000;
        starVertices.push(x, y, z);
      }
  
      starGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(starVertices, 3)
      );
  
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
  
      camera.position.z = 15;
  
      sphere.rotation.y = -Math.PI / 2;
  
      group.rotation.offset = { x: 0, y: 0 };
  
      const mouse = {
        x: undefined,
        y: undefined,
        down: false,
        xPrev: undefined,
        yPrev: undefined
      };
  
      const raycaster = new THREE.Raycaster();
      const popUpEl = document.querySelector('#popUpEl');
      const populationEl = document.querySelector('#populationEl');
      const populationValueEl = document.querySelector('#populationValueEl');
  
      // Animate function
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        raycaster.setFromCamera(mouse, camera);
  
        // Rotate the planet continuously
        sphere.rotation.y += 0.005;
  
        const intersects = raycaster.intersectObjects(
          group.children.filter((mesh) => mesh.geometry.type === 'BoxGeometry')
        );
  
        group.children.forEach((mesh) => {
          mesh.material.opacity = 0.4;
        });
  
        gsap.set(popUpEl, { display: 'none' });
  
        for (let i = 0; i < intersects.length; i++) {
          const box = intersects[i].object;
          box.material.opacity = 1;
          gsap.set(popUpEl, { display: 'block' });
  
          populationEl.innerHTML = box.country;
          populationValueEl.innerHTML = box.population;
        }
  
        renderer.render(scene, camera);
      }
      animate();
  
      const zoomIn = () => {
        if (camera.position.z > 1) {
          camera.position.z -= 0.5;
          renderer.render(scene, camera);
          requestAnimationFrame(zoomIn);
        } else {
          navigate('/next-page');
        }
      };
  
      const handleGlobeClick = () => {
        audioRef.current.play();
  
        // Fast rotation of the planet for 1 second
        gsap.to(group.rotation, {
          y: group.rotation.y + Math.PI * 2,
          duration: 1,
          onComplete: zoomIn
        });
      };
  
      canvasContainer.addEventListener('mousedown', ({ clientX, clientY }) => {
        mouse.down = true;
        mouse.xPrev = clientX;
        mouse.yPrev = clientY;
      });
  
      addEventListener('mousemove', (event) => {
        if (innerWidth >= 1280) {
          mouse.x = ((event.clientX - innerWidth / 2) / (innerWidth / 2)) * 2 - 1;
          mouse.y = -(event.clientY / innerHeight) * 2 + 1;
        } else {
          const offset = canvasContainer.getBoundingClientRect().top;
          mouse.x = (event.clientX / innerWidth) * 2 - 1;
          mouse.y = -((event.clientY - offset) / innerHeight) * 2 + 1;
        }
  
        gsap.set(popUpEl, { x: event.clientX, y: event.clientY });
  
        if (mouse.down) {
          event.preventDefault();
  
          const deltaX = event.clientX - mouse.xPrev;
          const deltaY = event.clientY - mouse.yPrev;
  
          group.rotation.offset.x += deltaY * 0.005;
          group.rotation.offset.y += deltaX * 0.005;
  
          gsap.to(group.rotation, {
            y: group.rotation.offset.y,
            x: group.rotation.offset.x,
            duration: 2
          });
  
          mouse.xPrev = event.clientX;
          mouse.yPrev = event.clientY;
        }
      });
  
      addEventListener('mouseup', () => {
        mouse.down = false;
      });
  
      canvasContainer.addEventListener('click', handleGlobeClick);
  
      const handleResize = () => {
        renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
        camera.updateProjectionMatrix();
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        canvasContainer.removeEventListener('click', handleGlobeClick);
        scene.clear();
        renderer.dispose();
      };
    }, [texturePath, navigate]);
  
    return (
      <div ref={canvasContainerRef} id="canvasContainer" style={{ position: 'relative' }} className='w-full h-screen'>
        <canvas ref={canvasRef} />
        <div id="popUpEl" style={{ display: 'none', position: 'absolute' }}>
          <p id="populationEl" style={{ color: 'white', fontWeight: 'bold' }}></p>
          <p id="populationValueEl" style={{ color: 'white' }}></p>
        </div>
      </div>
    );
  };
  
  export default Planet;