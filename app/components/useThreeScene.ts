"use client";

import { useEffect } from "react";
import type { Mesh, BufferGeometry } from "three";

/**
 * Decorative Three.js scene that floats hearts, rings, gems, and stardust
 * behind the hero illustration. Mounts into a ref'd container element.
 *
 * – Uses device pixel ratio capped at 1.6 for performance.
 * – Fully cleaned up on unmount: RAF, listeners, geometries, materials, renderer.
 * – Skipped entirely when prefers-reduced-motion is set.
 * – Shows nothing (not an error) if WebGL is unavailable.
 */

interface SceneItem {
  mesh: Mesh;
  y: number;
  phase: number;
  speed: number;
  spin: number;
}

export function useThreeScene(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 600) return;

    let rafId = 0;
    let disposed = false;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;opacity:.88";
    host.appendChild(canvas);

    // Dynamic import so Three.js is not in the initial client bundle waterfall
    import("three").then((THREE) => {
      if (disposed) { canvas.remove(); return; }

      let renderer: InstanceType<typeof THREE.WebGLRenderer> | null = null;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch {
        canvas.remove();
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setClearColor(0x000000, 0);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.z = 9;

      scene.add(new THREE.AmbientLight(0xffffff, 2.1));
      const ptLight = new THREE.PointLight(0xffc4d0, 26);
      ptLight.position.set(2, 3, 5);
      scene.add(ptLight);

      const group = new THREE.Group();
      scene.add(group);

      const matRose  = new THREE.MeshStandardMaterial({ color: 0xc96f87, metalness: 0.18, roughness: 0.3,  emissive: 0x401321, emissiveIntensity: 0.18 });
      const matGold  = new THREE.MeshStandardMaterial({ color: 0xc4a067, metalness: 0.45, roughness: 0.25, emissive: 0x38240e, emissiveIntensity: 0.15 });
      const matCream = new THREE.MeshStandardMaterial({ color: 0xffe8d4, metalness: 0.18, roughness: 0.32 });

      // Heart shape
      const shape = new THREE.Shape();
      shape.moveTo(0, 0.18);
      shape.bezierCurveTo(-0.08, 0.34, -0.38, 0.28, -0.36, 0.04);
      shape.bezierCurveTo(-0.34, -0.12, -0.1, -0.28, 0, -0.4);
      shape.bezierCurveTo(0.1, -0.28, 0.34, -0.12, 0.36, 0.04);
      shape.bezierCurveTo(0.38, 0.28, 0.08, 0.34, 0, 0.18);
      const heartGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 });
      heartGeo.center();

      const items: SceneItem[] = [];
      const extraGeos: BufferGeometry[] = [];

      for (let i = 0; i < 14; i++) {
        const isHeart = i % 3 === 0;
        const isTorus = i % 3 === 1;
        const geo = isHeart ? heartGeo : isTorus
          ? (() => { const g = new THREE.TorusGeometry(0.18, 0.05, 8, 20); extraGeos.push(g); return g; })()
          : (() => { const g = new THREE.OctahedronGeometry(0.17, 0); extraGeos.push(g); return g; })();
        const mat = isHeart ? matRose : (i % 2 ? matGold : matCream);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((Math.random() - 0.5) * 5.2, (Math.random() - 0.5) * 5.3, (Math.random() - 0.5) * 2.2);
        mesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
        mesh.scale.setScalar(0.5 + Math.random() * 0.75);
        group.add(mesh);
        items.push({ mesh, y: mesh.position.y, phase: Math.random() * Math.PI * 2, speed: 0.35 + Math.random() * 0.6, spin: (Math.random() - 0.5) * 0.006 });
      }

      const points: number[] = [];
      for (let i = 0; i < 190; i++) points.push((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4);
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
      const starMat = new THREE.PointsMaterial({ color: 0xc4a067, size: 0.025, transparent: true, opacity: 0.75 });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      let tick = 0;
      let targetX = 0;
      let targetY = 0;

      const doResize = () => {
        if (!renderer) return;
        const rect = host.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = w < 500 ? 11 : 9;
        camera.updateProjectionMatrix();
      };

      const onPointer = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width  - 0.5) * 0.42;
        targetY = ((e.clientY - rect.top)  / rect.height - 0.5) * 0.3;
      };

      const ro = new ResizeObserver(doResize);
      ro.observe(host);
      host.addEventListener("pointermove", onPointer, { passive: true });
      doResize();

      const animate = () => {
        if (disposed) { ro.disconnect(); return; }
        if (document.hidden) {
          rafId = requestAnimationFrame(animate);
          return;
        }
        rafId = requestAnimationFrame(animate);
        const t = tick++ * 0.012;
        group.rotation.y += (targetX - group.rotation.y) * 0.025;
        group.rotation.x += (-targetY - group.rotation.x) * 0.025;
        items.forEach((o) => {
          o.mesh.position.y = o.y + Math.sin(t * o.speed + o.phase) * 0.13;
          o.mesh.rotation.x += o.spin;
          o.mesh.rotation.y += o.spin * 0.8;
        });
        stars.rotation.y = t * 0.018;
        renderer!.render(scene, camera);
      };
      animate();

      // Attach cleanup so the useEffect return can call it
      const cleanup = () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        ro.disconnect();
        host.removeEventListener("pointermove", onPointer);
        heartGeo.dispose();
        starGeo.dispose();
        starMat.dispose();
        extraGeos.forEach((g) => g.dispose());
        matRose.dispose();
        matGold.dispose();
        matCream.dispose();
        renderer?.dispose();
        canvas.remove();
      };

      (canvas as HTMLCanvasElement & { _threeCleanup?: () => void })._threeCleanup = cleanup;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      const c = canvas as HTMLCanvasElement & { _threeCleanup?: () => void };
      if (c._threeCleanup) c._threeCleanup();
      else canvas.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
