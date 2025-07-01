import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const AnimatedLogo: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pyramidRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const isAnimatingRef = useRef<boolean>(true);
  const baseSpeedRef = useRef<number>(0.006);
  const currentSpeedRef = useRef<number>(baseSpeedRef.current);
  const targetSpeedRef = useRef<number>(baseSpeedRef.current);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create texture loader and texture inside the effect to avoid dependency issues
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('images/header_logo.png');

    // Improve texture quality
    logoTexture.generateMipmaps = false;
    logoTexture.minFilter = THREE.LinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;
    logoTexture.format = THREE.RGBAFormat;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      precision: "highp"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    logoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const createPyramidWithUVs = () => {
      const geometry = new THREE.BufferGeometry();

      // Define vertices
      const height = 1.5;
      const radius = 2;

      const vertices = [];
      const uvs = [];
      const indices = [];

      // Pyramid vertices
      const top = [0, height, 0];
      const corners = [
        [radius, -height, radius],    // 0: Front-right
        [-radius, -height, radius],   // 1: Front-left
        [-radius, -height, -radius],  // 2: Back-left
        [radius, -height, -radius]    // 3: Back-right
      ];

      // Create each face individually with proper UV mapping
      for (let faceIndex = 0; faceIndex < 4; faceIndex++) {
        const next = (faceIndex + 1) % 4;
        const baseVertexIndex = vertices.length / 3;

        // Add triangle vertices for this face
        vertices.push(...top);                // Top vertex
        vertices.push(...corners[faceIndex]); // First bottom vertex
        vertices.push(...corners[next]);      // Second bottom vertex

        uvs.push(
          0.5, 1.0,  // Top of triangle -> center top of texture
          1.0, 0.0,  // Bottom right -> bottom right of texture (FLIPPED THIS)
          0.0, 0.0   // Bottom left -> bottom left of texture (FLIPPED THIS)
        );

        // Add face indices
        indices.push(baseVertexIndex, baseVertexIndex + 1, baseVertexIndex + 2);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geometry.setIndex(indices);

      // Add groups for material separation
      for (let i = 0; i < 4; i++) {
        geometry.addGroup(i * 3, 3, i);
      }

      geometry.computeVertexNormals();
      return geometry;
    };

    const geometry = createPyramidWithUVs();

    // Configure texture for exact face scaling
    logoTexture.wrapS = THREE.ClampToEdgeWrapping;
    logoTexture.wrapT = THREE.ClampToEdgeWrapping;

    const materials = [
      new THREE.MeshLambertMaterial({
        map: logoTexture,
        transparent: true,
        alphaTest: 0.1,
        side: THREE.BackSide,
      }),
      new THREE.MeshLambertMaterial({
        map: logoTexture,
        transparent: true,
        alphaTest: 0.1,
        side: THREE.BackSide,
      }),
      new THREE.MeshLambertMaterial({
        map: logoTexture,
        transparent: true,
        alphaTest: 0.1,
        side: THREE.BackSide,
      }),
      new THREE.MeshLambertMaterial({
        map: logoTexture,
        transparent: true,
        alphaTest: 0.1,
        side: THREE.BackSide,
      })
    ];

    const pyramid = new THREE.Mesh(geometry, materials);
    pyramid.position.y = 1; // Center pyramid vertically
    pyramid.scale.set(1.2, 1.2, 1.2); // Make the pyramid much larger
    scene.add(pyramid);
    pyramidRef.current = pyramid;

    // Position camera
    camera.position.set(0, 1, 5);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 4.0);
    frontLight.position.set(0, 0, 10);
    frontLight.target.position.set(0, 0, 0);
    scene.add(frontLight);
    scene.add(frontLight.target);

    // Animation function
    const animate = (): void => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (pyramidRef.current) {
        // Smoothly transition current speed toward target speed
        const easingFactor = 0.03; // Lower = slower easing, higher = faster easing
        currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * easingFactor;

        // Apply rotation using current speed
        pyramidRef.current.rotation.y += currentSpeedRef.current;
      }

      renderer.render(scene, camera);
    };

    const handleCanvasClick = () => {
      isAnimatingRef.current = !isAnimatingRef.current;

      if (isAnimatingRef.current) {
        // Resume animation - set target speed back to normal
        targetSpeedRef.current = baseSpeedRef.current;
      } else {
        // Stop animation - set target speed to 0 (this triggers the easing)
        targetSpeedRef.current = 0;
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // Start animation
    animate();

    // Handle window resize
    const handleResize = (): void => {
      if (!mountRef.current || !camera || !renderer) return;

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);

      // Remove click listener
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', handleCanvasClick);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      if (renderer) {
        renderer.dispose();
      }
    };

  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '300px',
        background: 'transparent',
        cursor: 'pointer' // Add pointer cursor to indicate it's clickable
      }}
    />
  );
};

export default AnimatedLogo;