/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
'use client'

import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import atmosphereVertexShader from "../../shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../../shaders/atmosphereFragment.glsl";
import "../../style/canvas.css";
import bumpMapTexture from '/assets/img/titan-black-and-white.jpg';
import planetTexture from '/assets/img/titan.jpg';

extend(THREE);

const Sphere = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(null);

  const texture = useLoader(THREE.TextureLoader, planetTexture);
  const bumpMap = useLoader(THREE.TextureLoader, bumpMapTexture);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  const geologicalFeatures = useMemo(() => generateGeologicalFeatures(20), []);

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[5, 50, 50]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            globeTexture: { value: texture },
            bumpMap: { value: bumpMap },
            bumpScale: { value: 0.08 },
          }}
        />
        {geologicalFeatures.map((feature, index) => (
          <Feature 
            key={index} 
            feature={feature} 
            setHovered={setHovered} 
          />
        ))}
      </mesh>
      <mesh>
        <sphereGeometry args={[5.1, 50, 50]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const Feature = ({ feature, setHovered }) => {
  const position = useMemo(() => latLonToVector3(feature.lat, feature.lon), [feature.lat, feature.lon]);
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        position.clone().normalize()
      );
    }
  });

  const handlePointerOver = (event) => {
    event.stopPropagation();
    setHovered(feature);
    setIsHovered(true);
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();
    setHovered(null);
    setIsHovered(false);
  };

  let geometry, material;

  if (feature.type === "Cryo-volcano") {
    geometry = <coneGeometry args={[0.2, 0.5, 32]} />;
    material = <meshStandardMaterial color={0xff5733} />;
  } else if (feature.type === "Hypothermal-Vent") {
    geometry = <sphereGeometry args={[0.1, 16, 16]} />;
    material = <meshStandardMaterial color={0x00ff00} />;
  } else if (feature.type === "MineralRegion") {
    geometry = <sphereGeometry args={[0.2, 32, 32]} />;
    material = <meshStandardMaterial color={0xdddd44} />;
  }

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {geometry}
        {material}
      </mesh>
      {isHovered && (
        <Html distanceFactor={15}>
          <div className="bg-white bg-opacity-20 font-lato text-black p-2 rounded-lg backdrop-blur-sm">
            {`${feature.type} at ${feature.lat.toFixed(2)}°, ${feature.lon.toFixed(2)}°`}
          </div>
        </Html>
      )}
    </group>
  );
};

const Stars = () => {
  const count = 5000;
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }
    return positions;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color={0xffffff} sizeAttenuation transparent />
    </points>
  );
};

const Titan = () => {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <color attach="background" args={['#000000']} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Sphere />
        <Stars />
      </Canvas>
    </div>
  );
};

// Helper functions
function latLonToVector3(lat, lon, radius = 5) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function generateGeologicalFeatures(count) {
  const features = [];

  for (let i = 0; i < count; i++) {
    const lat = Math.random() * 180 - 90;
    const lon = Math.random() * 360 - 180;
    const types = ["Cryo-volcano", "Hypothermal-Vent", "MineralRegion"];
    const type = types[Math.floor(Math.random() * types.length)];

    features.push({ lat, lon, type });
  }

  return features;
}

export default Titan;