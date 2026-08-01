import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Sri Chakra (Sri Yantra) rendered in real WebGL:
 * bhupura square with four gates, 16- and 8-petal lotus rings, the triple
 * girdle circles, the nine interlocking trikonas and the central bindu.
 * Scroll dollies + banks the yantra; pointer parallaxes it.
 */
export default function VedicScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientWidth);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const GOLD = 0xd4af37;
    const IVORY = 0xf7f4ea;
    const MAROON = 0x9c3324;

    const root = new THREE.Group();
    root.scale.setScalar(0.72);
    scene.add(root);

    const seg = (pts: number[], color: number, opacity: number, z = 0) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      const l = new THREE.LineSegments(
        g,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      );
      l.position.z = z;
      return l;
    };

    const R = 2.0; // radius of the inner girdle circle

    /* ---------- Nine interlocking trikonas ---------- */
    // [base y, apex y, half-width] — all symmetric about the vertical axis
    const up: Array<[number, number, number]> = [
      [-0.735, 1.0, 0.7],
      [-0.51, 0.588, 0.87],
      [-0.313, 0.487, 0.95],
      [-0.145, 0.235, 0.62],
    ];
    const down: Array<[number, number, number]> = [
      [0.926, -0.735, 0.4],
      [0.588, -0.51, 0.82],
      [0.487, -0.313, 0.88],
      [0.235, -0.145, 0.97],
      [0.145, -0.4, 0.56],
    ];
    const triPts = (by: number, ay: number, hw: number) => {
      const b = by * R;
      const a = ay * R;
      const w = hw * R;
      return [-w, b, 0, w, b, 0, w, b, 0, 0, a, 0, 0, a, 0, -w, b, 0];
    };

    const trikonas = new THREE.Group();
    up.forEach(([by, ay, hw], i) =>
      trikonas.add(seg(triPts(by, ay, hw), GOLD, 0.92, 0.1 + i * 0.05))
    );
    down.forEach(([by, ay, hw], i) =>
      trikonas.add(seg(triPts(by, ay, hw), i % 2 ? MAROON : GOLD, 0.88, 0.12 + i * 0.05))
    );
    root.add(trikonas);


    /* ---------- Bindu ---------- */
    const bindu = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 20, 20),
      new THREE.MeshBasicMaterial({ color: GOLD })
    );
    bindu.position.set(0, 0, 0.45);
    root.add(bindu);

    /* ---------- Girdle circles ---------- */
    const circle = (r: number, color: number, opacity: number, z: number) => {
      const pts: number[] = [];
      const n = 180;
      for (let s = 0; s < n; s++) {
        const a1 = (s / n) * Math.PI * 2;
        const a2 = ((s + 1) / n) * Math.PI * 2;
        pts.push(Math.cos(a1) * r, Math.sin(a1) * r, 0, Math.cos(a2) * r, Math.sin(a2) * r, 0);
      }
      return seg(pts, color, opacity, z);
    };
    root.add(circle(R * 1.02, GOLD, 0.85, 0));
    root.add(circle(R * 1.32, GOLD, 0.7, -0.1));
    root.add(circle(R * 1.62, GOLD, 0.55, -0.2));
    root.add(circle(R * 1.68, IVORY, 0.25, -0.22));
    root.add(circle(R * 1.74, GOLD, 0.7, -0.24));

    /* ---------- Lotus petal rings ---------- */
    const lotus = (count: number, rIn: number, rOut: number, color: number, opacity: number, z: number) => {
      const pts: number[] = [];
      const step = (Math.PI * 2) / count;
      for (let i = 0; i < count; i++) {
        const c = i * step;
        // petal = two arcs bulging out from the inner ring, meeting at tips
        for (const dir of [-1, 1]) {
          const steps = 14;
          let px = 0;
          let py = 0;
          for (let s = 0; s <= steps; s++) {
            const t = s / steps;
            // angle sweeps across the petal, radius bulges mid-way
            const a = c - step / 2 + t * step;
            const bulge = Math.sin(t * Math.PI);
            const off = dir * bulge * step * 0.28;
            const r = rIn + (rOut - rIn) * bulge;
            const x = Math.cos(a + off) * r;
            const y = Math.sin(a + off) * r;
            if (s > 0) pts.push(px, py, 0, x, y, 0);
            px = x;
            py = y;
          }
        }
      }
      return seg(pts, color, opacity, z);
    };
    const lotus8 = lotus(8, R * 1.03, R * 1.3, GOLD, 0.8, -0.05);
    const lotus16 = lotus(16, R * 1.33, R * 1.6, GOLD, 0.65, -0.15);
    root.add(lotus8, lotus16);

    /* ---------- Bhupura: three nested squares with four gates ---------- */
    const bhupura = new THREE.Group();
    const gatedSquare = (h: number, gate: number, depth: number, color: number, opacity: number, z: number) => {
      const pts: number[] = [];
      const line = (x1: number, y1: number, x2: number, y2: number) =>
        pts.push(x1, y1, 0, x2, y2, 0);
      // one side with a T-gate, rotated four times
      const side = (rot: number) => {
        const rp = (x: number, y: number): [number, number] => [
          x * Math.cos(rot) - y * Math.sin(rot),
          x * Math.sin(rot) + y * Math.cos(rot),
        ];
        const P: Array<[number, number]> = [
          [-h, h],
          [-gate, h],
          [-gate, h + depth],
          [-gate * 0.45, h + depth],
          [-gate * 0.45, h + depth * 1.9],
          [gate * 0.45, h + depth * 1.9],
          [gate * 0.45, h + depth],
          [gate, h + depth],
          [gate, h],
          [h, h],
        ];
        for (let i = 0; i < P.length - 1; i++) {
          const a = rp(...P[i]);
          const b = rp(...P[i + 1]);
          line(a[0], a[1], b[0], b[1]);
        }
      };
      for (let i = 0; i < 4; i++) side((i * Math.PI) / 2);
      return seg(pts, color, opacity, z);
    };
    bhupura.add(gatedSquare(R * 1.86, R * 0.34, R * 0.14, GOLD, 0.75, -0.3));
    bhupura.add(gatedSquare(R * 2.02, R * 0.34, R * 0.14, MAROON, 0.7, -0.36));
    bhupura.add(gatedSquare(R * 2.18, R * 0.34, R * 0.14, GOLD, 0.55, -0.42));
    root.add(bhupura);

    /* ---------- Depth starfield ---------- */
    const starCount = 320;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 24;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      starPos[i * 3 + 2] = -Math.random() * 18 - 2;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: IVORY, size: 0.055, transparent: true, opacity: 0.5 })
    );
    scene.add(stars);

    /* ---------- Interaction ---------- */
    let scrollP = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    const onScroll = () => {
      scrollP = Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 1.5));
    };
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const resize = () => {
      const w = mount.clientWidth || mount.parentElement?.clientWidth || 0;
      if (!w) return;
      renderer.setSize(w, w, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    resize();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(mount);

    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();

      pointerX += (targetX - pointerX) * 0.05;
      pointerY += (targetY - pointerY) * 0.05;

      if (!reduced) {
        // the yantra itself stays upright (it is a fixed sacred diagram);
        // only the lotus rings and outer frame breathe / turn slowly
        lotus8.rotation.z = t * 0.05;
        lotus16.rotation.z = -t * 0.035;
        bhupura.rotation.z = Math.sin(t * 0.18) * 0.03;
        bindu.scale.setScalar(1 + Math.sin(t * 1.6) * 0.2);
        stars.rotation.z = t * 0.008;
      }

      root.rotation.x = -0.35 * scrollP + pointerY * 0.25;
      root.rotation.y = 0.5 * scrollP + pointerX * 0.32;
      root.position.z = -4.5 * scrollP;
      root.position.y = 0.8 * scrollP;
      camera.position.z = 12 + scrollP * 1.5;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      scene.traverse((o) => {
        const any = o as THREE.Mesh;
        if (any.geometry) any.geometry.dispose();
        const m = any.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="relative w-full max-w-[560px]"
      style={{ aspectRatio: "1 / 1", minWidth: "260px" }}
    />
  );
}
