import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Real WebGL (three.js) zodiac assembly: concentric gold rings, spoke wheel,
 * a rotating Sri-Yantra style double triangle and a depth starfield.
 * Scroll drives camera dolly + tilt so the object reads as genuinely 3D.
 */
export default function VedicScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

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
    const MAROON = 0x8d2b3c;

    const root = new THREE.Group();
    scene.add(root);

    const line = (geo: THREE.BufferGeometry, color: number, opacity: number) =>
      new THREE.LineSegments(
        geo,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      );

    // --- Concentric rings on slightly different planes (depth) ---
    const ringGroup = new THREE.Group();
    const radii = [3.4, 3.1, 2.45, 1.75, 1.05];
    radii.forEach((r, i) => {
      const pts: number[] = [];
      const seg = 160;
      for (let s = 0; s < seg; s++) {
        const a1 = (s / seg) * Math.PI * 2;
        const a2 = ((s + 1) / seg) * Math.PI * 2;
        pts.push(Math.cos(a1) * r, Math.sin(a1) * r, 0, Math.cos(a2) * r, Math.sin(a2) * r, 0);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      const ring = line(geo, i % 2 === 0 ? GOLD : IVORY, i % 2 === 0 ? 0.85 : 0.35);
      ring.position.z = i * -0.28;
      ringGroup.add(ring);
    });
    root.add(ringGroup);

    // --- 12 house spokes + zodiac markers ---
    const spokes: number[] = [];
    const marks: number[] = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      spokes.push(Math.cos(a) * 1.05, Math.sin(a) * 1.05, 0, Math.cos(a) * 3.1, Math.sin(a) * 3.1, 0);
      const am = a + Math.PI / 12;
      marks.push(Math.cos(am) * 3.1, Math.sin(am) * 3.1, 0, Math.cos(am) * 3.4, Math.sin(am) * 3.4, 0);
    }
    const spokeGeo = new THREE.BufferGeometry();
    spokeGeo.setAttribute("position", new THREE.Float32BufferAttribute(spokes, 3));
    root.add(line(spokeGeo, GOLD, 0.45));
    const markGeo = new THREE.BufferGeometry();
    markGeo.setAttribute("position", new THREE.Float32BufferAttribute(marks, 3));
    root.add(line(markGeo, IVORY, 0.28));

    // --- Counter-rotating yantra triangles, lifted forward in Z ---
    const yantra = new THREE.Group();
    const tri = (r: number, rot: number, color: number, opacity: number, z: number) => {
      const p: number[] = [];
      for (let i = 0; i < 3; i++) {
        const a1 = rot + (i / 3) * Math.PI * 2;
        const a2 = rot + ((i + 1) / 3) * Math.PI * 2;
        p.push(Math.cos(a1) * r, Math.sin(a1) * r, 0, Math.cos(a2) * r, Math.sin(a2) * r, 0);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
      const l = line(g, color, opacity);
      l.position.z = z;
      return l;
    };
    yantra.add(tri(2.0, Math.PI / 2, GOLD, 0.7, 0.5));
    yantra.add(tri(2.0, -Math.PI / 2, MAROON, 0.85, 0.75));
    yantra.add(tri(1.25, Math.PI / 2, IVORY, 0.4, 1.0));
    root.add(yantra);

    // --- Bindu ---
    const bindu = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 20, 20),
      new THREE.MeshBasicMaterial({ color: GOLD })
    );
    bindu.position.z = 1.1;
    root.add(bindu);

    // --- Depth starfield ---
    const starCount = 320;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 22;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      starPos[i * 3 + 2] = -Math.random() * 18 - 1;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: IVORY, size: 0.055, transparent: true, opacity: 0.5 })
    );
    scene.add(stars);

    // --- Interaction state ---
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
        ringGroup.rotation.z = t * 0.06;
        yantra.rotation.z = -t * 0.11;
        bindu.scale.setScalar(1 + Math.sin(t * 1.6) * 0.18);
        stars.rotation.z = t * 0.008;
      }

      // Scroll dolly + tilt: the wheel turns edge-on and recedes as you scroll
      root.rotation.x = -0.35 * scrollP + pointerY * 0.25;
      root.rotation.y = 0.55 * scrollP + pointerX * 0.35;
      root.position.z = -4.5 * scrollP;
      root.position.y = 0.8 * scrollP;
      camera.position.z = 10 + scrollP * 1.5;

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
