import { useEffect, useRef } from "react";
import * as THREE from "three";

export function WebGLPortrait() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1.45, 18);
    const material = new THREE.MeshStandardMaterial({
      color: 0xf5efe2,
      roughness: 0.42,
      metalness: 0.2,
      emissive: 0x1b1222,
      emissiveIntensity: 0.22,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.47, 3),
      new THREE.MeshBasicMaterial({
        color: 0x111214,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      }),
    );
    group.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xc99b48,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });

    const rings = [1.9, 2.25, 2.6].map((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(radius, radius + 0.012, 160),
        ringMaterial.clone(),
      );
      ring.rotation.x = Math.PI / 2 + index * 0.34;
      ring.rotation.y = index * 0.42;
      group.add(ring);
      return ring;
    });

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0x7bc8a4,
        size: 0.022,
        transparent: true,
        opacity: 0.85,
      }),
    );
    group.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const key = new THREE.DirectionalLight(0xfff2d4, 2.2);
    key.position.set(2.6, 3.5, 4.2);
    scene.add(key);
    const rim = new THREE.PointLight(0xff6f61, 12, 8);
    rim.position.set(-2.5, -1.4, 2.2);
    scene.add(rim);
    const mint = new THREE.PointLight(0x7bc8a4, 8, 7);
    mint.position.set(2.2, -2.2, 2.8);
    scene.add(mint);

    const pointer = new THREE.Vector2(0, 0);
    const handlePointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    host.addEventListener("pointermove", handlePointerMove);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.position.z = camera.aspect < 1 ? 7.6 : 5.4;
      camera.updateProjectionMatrix();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      mesh.rotation.x = elapsed * 0.22 + pointer.y * 0.12;
      mesh.rotation.y = elapsed * 0.32 + pointer.x * 0.18;
      wire.rotation.x = -elapsed * 0.15;
      wire.rotation.y = elapsed * 0.2;
      particles.rotation.y = elapsed * 0.08;
      particles.rotation.x = Math.sin(elapsed * 0.3) * 0.12;

      rings.forEach((ring, index) => {
        ring.rotation.z = elapsed * (0.18 + index * 0.06);
        ring.scale.setScalar(1 + Math.sin(elapsed * 1.1 + index) * 0.025);
      });

      group.rotation.x += (pointer.y * 0.12 - group.rotation.x) * 0.04;
      group.rotation.y += (pointer.x * 0.2 - group.rotation.y) * 0.04;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      wire.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      particlesGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="h-full min-h-[360px] w-full overflow-hidden rounded-md"
    />
  );
}
