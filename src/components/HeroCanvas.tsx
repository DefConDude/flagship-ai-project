"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { content } from "@/data/content";
import { useTheme } from "./ThemeProvider";

/**
 * Sleek hero orb — plain three.js, no wrapper.
 *
 * - Shape: a finely divided icosphere whose vertex shader displaces every point
 *   with three multiplied sine waves plus a faster second copy, driven by time,
 *   so the surface keeps rippling organically (cheap stand-in for noise).
 * - Colour: fragment shader blends brand purple↔blue by wave height, adds a
 *   fresnel turquoise edge glow (lit-from-behind look) and fades the shadow side
 *   to navy.
 * - Orbiting cards: flat panels for the two DATA SOURCES (SharePoint, credit data),
 *   each face drawn at runtime on a 2D <canvas> (no image files). They circle
 *   the orb at different speeds/heights and always turn to face the camera.
 * - Sparkles: turquoise points in a shell, additive blend, drifting the other way.
 * - The scene tilts gently toward the mouse, pauses offscreen, shows one still
 *   frame under reduced-motion, and falls back to a CSS glow if WebGL is absent.
 */
export function HeroCanvas({ forceDark = false }: { forceDark?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dark = forceDark || theme === "dark";
    const dpr = Math.min(window.devicePixelRatio, 2);
    const sources = content.hero.orrery;
    const wide = mount.clientWidth >= 1024;

    // ---- WebGL capability check (CSS-glow fallback) --------------------
    const probe = document.createElement("canvas");
    const hasWebGL = !!(
      probe.getContext("webgl2") || probe.getContext("webgl")
    );
    if (!hasWebGL) {
      const fallback = document.createElement("div");
      fallback.className =
        "absolute left-1/2 top-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl";
      fallback.style.background =
        "radial-gradient(closest-side, rgba(157,76,205,0.5), rgba(7,194,201,0.2), transparent 72%)";
      mount.appendChild(fallback);
      return () => {
        if (fallback.parentNode === mount) mount.removeChild(fallback);
      };
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    // further back => everything reads smaller in frame
    camera.position.set(0, 0, 8.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // Everything hangs off a group we can tilt and place off to the side.
    // Pushed well to the right on wide screens so it lives in its own space,
    // clear of the headline on the left.
    const root = new THREE.Group();
    // sits in the right column, pulled in from the edge so nothing clips
    root.position.set(wide ? 2.2 : 0, wide ? 0.1 : 0.2, 0);
    root.scale.setScalar(wide ? 0.72 : 0.62); // smaller orb + data sources
    scene.add(root);

    const disposables: Array<{ dispose: () => void }> = [];

    // ---- The orb -------------------------------------------------------
    const uniforms = {
      uTime: { value: 0 },
      // Aligned to innovationdecoded.com accent trio
      uColorPurple: { value: new THREE.Color("#9d4ccd") },
      uColorBlue: { value: new THREE.Color("#3876ff") },
      uColorEdge: { value: new THREE.Color("#07c2c9") },
      uColorShadow: { value: new THREE.Color("#141430") },
      uDark: { value: dark ? 1 : 0 },
    };

    const vertexShader = /* glsl */ `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vView;
      varying float vWave;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        float t = uTime;
        // three multiplied sine waves => organic lumps
        float w = sin(position.x * 3.0 + t)
                * sin(position.y * 3.0 + t * 1.1)
                * sin(position.z * 3.0 + t * 0.9);
        // a faster, smaller second copy layered on top
        w += 0.5 * sin(position.x * 6.0 - t * 1.6)
                 * sin(position.y * 6.0 + t * 1.4)
                 * sin(position.z * 6.0 - t * 1.2);
        vWave = w;
        vec3 displaced = position + normal * w * 0.12;
        vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `;

    const fragmentShader = /* glsl */ `
      uniform vec3 uColorPurple;
      uniform vec3 uColorBlue;
      uniform vec3 uColorEdge;
      uniform vec3 uColorShadow;
      uniform float uDark;
      varying vec3 vNormal;
      varying vec3 vView;
      varying float vWave;

      void main() {
        float h = clamp(vWave * 0.5 + 0.5, 0.0, 1.0);
        vec3 body = mix(uColorBlue, uColorPurple, h);
        // fade the shadow side (facing away / low light) to navy
        float lit = clamp(dot(vNormal, normalize(vec3(0.4, 0.6, 1.0))) * 0.5 + 0.5, 0.0, 1.0);
        body = mix(uColorShadow, body, mix(0.55, 1.0, lit));
        // fresnel turquoise rim — looks lit from behind
        float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
        vec3 col = body + uColorEdge * fres * 1.7;
        // keep it a touch brighter in light mode
        col *= mix(1.15, 1.0, uDark);
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const orbGeo = new THREE.IcosahedronGeometry(1.45, 48);
    const orbMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    root.add(orb);
    disposables.push(orbGeo, orbMat);

    // ---- Orbiting data-source cards (runtime-drawn canvas textures) ----
    type Card = {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      phase: number;
      yAmp: number;
      tex: THREE.CanvasTexture;
    };

    const makeCardTexture = (label: string, hex: string) => {
      const W = 256;
      const H = 160;
      // Supersample: back the canvas with SCALE× the pixels, then scale the 2D
      // context so all drawing coords stay in logical W×H units. The GPU then
      // downsamples this high-res texture, so the card text/edges stay crisp
      // instead of pixelating when the plane is drawn large on screen.
      const SCALE = 4;
      const c = document.createElement("canvas");
      c.width = W * SCALE;
      c.height = H * SCALE;
      const ctx = c.getContext("2d")!;
      ctx.scale(SCALE, SCALE);

      // rounded panel
      const r = 18;
      const pad = 8;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = dark
        ? "rgba(29,29,63,0.92)"
        : "rgba(255,255,255,0.95)";
      ctx.strokeStyle = hex;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pad + r, pad);
      ctx.arcTo(W - pad, pad, W - pad, H - pad, r);
      ctx.arcTo(W - pad, H - pad, pad, H - pad, r);
      ctx.arcTo(pad, H - pad, pad, pad, r);
      ctx.arcTo(pad, pad, W - pad, pad, r);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // accent dot
      ctx.fillStyle = hex;
      ctx.beginPath();
      ctx.arc(32, 34, 7, 0, Math.PI * 2);
      ctx.fill();

      // "DATA SOURCE" eyebrow
      ctx.fillStyle = dark ? "#c3c3dc" : "#55556f";
      ctx.font = "600 14px Inter, sans-serif";
      ctx.fillText("DATA SOURCE", 50, 40);

      // label — shrink the font if a longer name (e.g. "PostgreSQL") would
      // overflow the card width, so every label fits on one line.
      ctx.fillStyle = dark ? "#f4f3f8" : "#1d1d3f";
      const maxLabelWidth = W - 56; // 28px padding each side
      let labelSize = 30;
      do {
        ctx.font = `700 ${labelSize}px Sora, Inter, sans-serif`;
        if (ctx.measureText(label).width <= maxLabelWidth) break;
        labelSize -= 2;
      } while (labelSize > 18);
      ctx.fillText(label, 28, 92);

      // a couple of faux data lines
      ctx.fillStyle = hex;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(28, 112, 150, 6);
      ctx.globalAlpha = 0.3;
      ctx.fillRect(28, 126, 96, 6);
      ctx.globalAlpha = 1;

      const tex = new THREE.CanvasTexture(c);
      // Crisp sampling: correct colour space, trilinear mipmaps, and the GPU's
      // max anisotropy so the card stays sharp at glancing angles.
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.needsUpdate = true;
      return tex;
    };

    const cards: Card[] = [];
    sources.forEach((s, i) => {
      const tex = makeCardTexture(s.label, s.color);
      const geo = new THREE.PlaneGeometry(1.15, 0.72);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      root.add(mesh);
      disposables.push(geo, mat, tex);
      cards.push({
        mesh,
        radius: 1.9 + i * 0.4,
        speed: i % 2 === 0 ? 0.3 : -0.24,
        phase: s.phase,
        yAmp: i % 2 === 0 ? 0.4 : -0.5,
        tex,
      });
    });

    // ---- Sparkles ------------------------------------------------------
    const sparkleCount = 140;
    const sp = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount; i++) {
      const r = 2.2 + Math.random() * 2.4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      sp[i * 3] = r * Math.sin(ph) * Math.cos(th);
      sp[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      sp[i * 3 + 2] = r * Math.cos(ph);
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: new THREE.Color("#07c2c9"),
      size: 0.045,
      transparent: true,
      opacity: dark ? 0.9 : 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sparkles = new THREE.Points(sparkGeo, sparkMat);
    root.add(sparkles);
    disposables.push(sparkGeo, sparkMat);

    // ---- Interaction: gentle mouse tilt --------------------------------
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove);

    let scrollN = 0;
    const onScroll = () => {
      scrollN = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ---- Animate (pauses offscreen) ------------------------------------
    let frame = 0;
    let running = true;
    const clock = new THREE.Clock();
    const baseX = wide ? 2.2 : 0;
    const baseY = wide ? 0.1 : 0.2;

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduce) tick();
      },
      { threshold: 0 },
    );
    io.observe(mount);

    const render = () => {
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;

      eased.x += (pointer.x - eased.x) * 0.05;
      eased.y += (pointer.y - eased.y) * 0.05;

      // whole scene tilts gently toward the mouse
      root.rotation.y = eased.x * 0.6;
      root.rotation.x = eased.y * 0.4;
      root.position.set(baseX, baseY + Math.sin(t * 0.5) * 0.06 - scrollN * 1.0, 0);

      orb.rotation.y = t * 0.08;

      // cards orbit at different speeds/heights, always facing the camera
      for (const card of cards) {
        const a = t * card.speed + card.phase;
        card.mesh.position.set(
          Math.cos(a) * card.radius,
          Math.sin(a * 1.3) * card.yAmp,
          Math.sin(a) * card.radius,
        );
        card.mesh.quaternion.copy(camera.quaternion);
      }

      sparkles.rotation.y = -t * 0.03;

      renderer.render(scene, camera);
    };

    render(); // one still frame always (covers reduced-motion)
    if (!reduce) tick();

    function tick() {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      render();
    }

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      for (const d of disposables) d.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [theme, forceDark]);

  return <div ref={mountRef} className="absolute inset-0 -z-10" aria-hidden="true" />;
}
