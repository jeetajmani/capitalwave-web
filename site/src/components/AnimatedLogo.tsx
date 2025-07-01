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
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    console.log('AnimatedLogo effect running');

    if (!mountRef.current) {
      console.log('No mount ref, returning');
      return;
    }

    // Force cleanup any existing canvas first
    const existingCanvas = mountRef.current.querySelector('canvas');
    if (existingCanvas) {
      console.log('Removing existing canvas before creating new one');
      existingCanvas.remove();
    }

    console.log('Creating new canvas');

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

    cameraRef.current = camera;

    const handleCanvasClick = (event: MouseEvent) => {
      if (!pyramidRef.current || !cameraRef.current || !mountRef.current) return;

      // Get mouse position relative to the canvas
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();

      // Convert mouse coordinates to normalized device coordinates (-1 to +1)
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Create raycaster
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      // Check for intersections with the pyramid
      const intersects = raycaster.intersectObject(pyramidRef.current);

      // Only trigger if pyramid was actually clicked
      if (intersects.length > 0) {
        isAnimatingRef.current = !isAnimatingRef.current;

        if (isAnimatingRef.current) {
          targetSpeedRef.current = baseSpeedRef.current;
          console.log('Animation resuming...');
        } else {
          targetSpeedRef.current = 0;
          console.log('Animation easing to stop...');
        }
      }
    };

    const handleCanvasMouseMove = (event: MouseEvent) => {
      if (!pyramidRef.current || !cameraRef.current || !mountRef.current) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);
      const intersects = raycaster.intersectObject(pyramidRef.current);

      // Change cursor when hovering over pyramid
      renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
    };

    // Add both event listeners
    renderer.domElement.addEventListener('click', handleCanvasClick);
    renderer.domElement.addEventListener('mousemove', handleCanvasMouseMove);

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

      console.log('AnimatedLogo cleanup running');

      // Enhanced cleanup - ensure canvas is definitely removed
      if (mountRef.current) {
        const canvases = mountRef.current.querySelectorAll('canvas');
        canvases.forEach(canvas => {
          console.log('Removing canvas in cleanup');
          canvas.remove();
        });
      }

      // Cancel animation frame
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      // Remove event listeners
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', handleCanvasClick);
        renderer.domElement.removeEventListener('mousemove', handleCanvasMouseMove);
      }

      // Remove canvas from DOM
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects
      if (pyramidRef.current) {
        scene.remove(pyramidRef.current);

        // Dispose of geometry and materials
        if (pyramidRef.current.geometry) {
          pyramidRef.current.geometry.dispose();
        }

        if (Array.isArray(pyramidRef.current.material)) {
          pyramidRef.current.material.forEach(material => material.dispose());
        } else if (pyramidRef.current.material) {
          pyramidRef.current.material.dispose();
        }
      }

      // Dispose of textures
      if (logoTexture) {
        logoTexture.dispose();
      }

      // Dispose of renderer
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }

      // Clear refs
      pyramidRef.current = null;
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
    };

  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '400px',
        background: 'transparent',
        cursor: 'default' // Remove pointer cursor since only pyramid is clickable
      }}
    />
  );
};

export default AnimatedLogo;