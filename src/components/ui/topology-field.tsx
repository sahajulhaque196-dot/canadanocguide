'use client'
import { useMemo, type CSSProperties } from "react";

type EffectMode = "light" | "dark";

type FocusRole = "background" | "button" | "visual";

type FocusTarget = {
  selector: string;
  role: FocusRole;
  fit?: "cover" | "contain-square" | "wide-wordmark" | "portrait-stage";
  preserveTransform?: boolean;
};

type EffectDefinition = {
  title: string;
  source: string;
  background: string;
  targets: readonly FocusTarget[];
  theme?: {
    nativeMode?: EffectMode;
    lightBackground: string;
    darkBackground: string;
    invertBackground?: boolean;
  };
  hiddenTargets?: readonly string[];
};

export type TopologyFieldProps = {
  mode?: EffectMode;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

export const TOPOLOGY_FIELD_DEFAULTS = {
  mode: "dark",
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

const topologySource = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexus Architecture - Topology</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', sans-serif; background: #030712; overflow: hidden; margin: 0; padding: 0; height: 100vh; width: 100vw;">

    <div id="canvasGlow" style="position: absolute; pointer-events: none; border-radius: 9999px; filter: blur(120px); opacity: 0.32; background: #22d3ee; transition: all 1s; z-index: 0; transform: translate(-50%, -50%);"></div>
    <div id="leftGlow" style="position: absolute; pointer-events: none; border-radius: 9999px; filter: blur(140px); opacity: 0.18; background: #06b6d4; z-index: 0; transform: translate(-50%, -50%);"></div>

    <canvas id="animationCanvas" style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;"></canvas>

    <script>
        const canvas = document.getElementById('animationCanvas');
        
        let width = window.innerWidth;
        let height = window.innerHeight;

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x030712, 300, 1200);

        const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
        camera.position.z = 650;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // ─── 1. RIGHT PRIMARY TOPOLOGY SPHERE ───
        const rightGroup = new THREE.Group();
        scene.add(rightGroup);

        const numNodesRight = 135;
        const nodesRight = [];
        const nodeGeo = new THREE.SphereGeometry(1, 16, 16);
        
        for(let i = 0; i < numNodesRight; i++) {
            let phi = Math.acos(-1 + (2 * i) / numNodesRight);
            let theta = Math.sqrt(numNodesRight * Math.PI) * phi;
            let x = Math.cos(theta) * Math.sin(phi);
            let y = Math.sin(theta) * Math.sin(phi);
            let z = Math.cos(phi);

            let mesh = new THREE.Mesh(
                nodeGeo,
                new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.85 })
            );
            mesh.position.set(x, y, z);
            mesh.userData = {
                baseSize: Math.random() * 1.5 + 1.0,
                pulseSpeed: Math.random() * 0.02 + 0.015,
                pulseOffset: Math.random() * Math.PI * 2
            };
            rightGroup.add(mesh);
            nodesRight.push(mesh);
        }

        const linePosRight = [];
        const lineColorsRight = [];
        for(let i = 0; i < numNodesRight; i++) {
            for(let j = i + 1; j < numNodesRight; j++) {
                let dist = nodesRight[i].position.distanceTo(nodesRight[j].position);
                const threshold = 0.45;
                if(dist < threshold) {
                    linePosRight.push(nodesRight[i].position.x, nodesRight[i].position.y, nodesRight[i].position.z);
                    linePosRight.push(nodesRight[j].position.x, nodesRight[j].position.y, nodesRight[j].position.z);
                    
                    let alpha = (1 - dist / threshold) * 0.7;
                    lineColorsRight.push(alpha * 0.1, alpha * 0.82, alpha * 0.93);
                    lineColorsRight.push(alpha * 0.1, alpha * 0.82, alpha * 0.93);
                }
            }
        }
        
        const lineGeoRight = new THREE.BufferGeometry();
        lineGeoRight.setAttribute('position', new THREE.Float32BufferAttribute(linePosRight, 3));
        lineGeoRight.setAttribute('color', new THREE.Float32BufferAttribute(lineColorsRight, 3));
        const lineMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.88
        });
        const linesRight = new THREE.LineSegments(lineGeoRight, lineMat);
        rightGroup.add(linesRight);


        // ─── 2. LEFT SYMMETRICAL TWIN ORBIT NETWORK (FILLS EMPTY LEFT SIDE) ───
        const leftGroup = new THREE.Group();
        scene.add(leftGroup);

        const numNodesLeft = 90;
        const nodesLeft = [];
        
        for(let i = 0; i < numNodesLeft; i++) {
            let phi = Math.acos(-1 + (2 * i) / numNodesLeft);
            let theta = Math.sqrt(numNodesLeft * Math.PI) * phi;
            let x = Math.cos(theta) * Math.sin(phi);
            let y = Math.sin(theta) * Math.sin(phi);
            let z = Math.cos(phi);

            let mesh = new THREE.Mesh(
                nodeGeo,
                new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 })
            );
            mesh.position.set(x, y, z);
            mesh.userData = {
                baseSize: Math.random() * 1.4 + 0.9,
                pulseSpeed: Math.random() * 0.02 + 0.012,
                pulseOffset: Math.random() * Math.PI * 2
            };
            leftGroup.add(mesh);
            nodesLeft.push(mesh);
        }

        const linePosLeft = [];
        const lineColorsLeft = [];
        for(let i = 0; i < numNodesLeft; i++) {
            for(let j = i + 1; j < numNodesLeft; j++) {
                let dist = nodesLeft[i].position.distanceTo(nodesLeft[j].position);
                const threshold = 0.46;
                if(dist < threshold) {
                    linePosLeft.push(nodesLeft[i].position.x, nodesLeft[i].position.y, nodesLeft[i].position.z);
                    linePosLeft.push(nodesLeft[j].position.x, nodesLeft[j].position.y, nodesLeft[j].position.z);
                    
                    let alpha = (1 - dist / threshold) * 0.55;
                    lineColorsLeft.push(alpha * 0.08, alpha * 0.75, alpha * 0.95);
                    lineColorsLeft.push(alpha * 0.08, alpha * 0.75, alpha * 0.95);
                }
            }
        }
        
        const lineGeoLeft = new THREE.BufferGeometry();
        lineGeoLeft.setAttribute('position', new THREE.Float32BufferAttribute(linePosLeft, 3));
        lineGeoLeft.setAttribute('color', new THREE.Float32BufferAttribute(lineColorsLeft, 3));
        const linesLeft = new THREE.LineSegments(lineGeoLeft, lineMat);
        leftGroup.add(linesLeft);


        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            
            // Right Main Sphere Radius
            const R_Right = width > 768 ? 370 : 220;
            rightGroup.scale.set(R_Right, R_Right, R_Right);
            const centerRightX = width > 768 ? width * 0.22 : 0; 
            const centerRightY = width > 768 ? -height * 0.02 : 0;
            rightGroup.position.set(centerRightX, centerRightY, 0);

            // Left Twin Orbit Cluster Radius & Positioning (Harmoniously balanced near vertical center)
            const R_Left = width > 768 ? 290 : 160;
            leftGroup.scale.set(R_Left, R_Left, R_Left);
            const centerLeftX = width > 768 ? -width * 0.38 : -width * 0.3;
            const centerLeftY = width > 768 ? -height * 0.04 : -height * 0.02;
            leftGroup.position.set(centerLeftX, centerLeftY, -120); // slightly pushed back in z for deep 3D hierarchy

            const glow = document.getElementById('canvasGlow');
            if (glow) {
                glow.style.left = \`\${(width / 2) + centerRightX}px\`;
                glow.style.top = \`\${(height / 2) - centerRightY}px\`;
                glow.style.width = \`\${R_Right * 2.6}px\`;
                glow.style.height = \`\${R_Right * 2.6}px\`;
            }

            const leftGlow = document.getElementById('leftGlow');
            if (leftGlow) {
                leftGlow.style.left = \`\${(width / 2) + centerLeftX}px\`;
                leftGlow.style.top = \`\${(height / 2) - centerLeftY}px\`;
                leftGlow.style.width = \`\${R_Left * 2.4}px\`;
                leftGlow.style.height = \`\${R_Left * 2.4}px\`;
            }
        }

        window.addEventListener('resize', resize);
        resize();

        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 1;
            
            // Right Sphere Rotation
            rightGroup.rotation.y = time * 0.0010;
            rightGroup.rotation.x = 0.18;
            rightGroup.rotation.z = time * 0.00035;

            // Left Sphere Counter-Rotation (Smooth Symmetrical Harmony)
            leftGroup.rotation.y = -time * 0.0008;
            leftGroup.rotation.x = -0.15;
            leftGroup.rotation.z = -time * 0.0003;

            nodesRight.forEach(mesh => {
                let p = mesh.userData;
                let pulse = (Math.sin((time * p.pulseSpeed) + p.pulseOffset) + 1) / 2;
                let targetRadius = p.baseSize + pulse * 1.8;
                let scale = targetRadius / rightGroup.scale.x;
                mesh.scale.set(scale, scale, scale);
                mesh.material.opacity = 0.65 + (pulse * 0.35);
            });

            nodesLeft.forEach(mesh => {
                let p = mesh.userData;
                let pulse = (Math.sin((time * p.pulseSpeed) + p.pulseOffset) + 1) / 2;
                let targetRadius = p.baseSize + pulse * 1.6;
                let scale = targetRadius / leftGroup.scale.x;
                mesh.scale.set(scale, scale, scale);
                mesh.material.opacity = 0.3 + (pulse * 0.45);
            });

            renderer.render(scene, camera);
        }
        
        animate();
    </script>
</body>
</html>`;

const EFFECT: EffectDefinition = {
  title: "Nexus topology field",
  source: topologySource,
  background: "#030712",
  targets: [{ selector: "#animationCanvas", role: "background" }],
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function buildFocusedDocument(definition: EffectDefinition, mode: EffectMode) {
  const source = definition.source;
  const targetJson = JSON.stringify(definition.targets).replace(
    /</g,
    "\\u003c",
  );
  const hiddenTargetJson = JSON.stringify(
    definition.hiddenTargets ?? [],
  ).replace(/</g, "\\u003c");
  const modeJson = JSON.stringify(mode);
  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: #030712 !important; color-scheme: ${mode} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-hidden] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
</style>`;
  const focusScript = `<script data-threeui-focus>
(function () {
  document.documentElement.dataset.sfMode = ${modeJson};
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var hiddenSelectors = ${hiddenTargetJson};
    var roots = [];
    hiddenSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (element) {
        element.setAttribute('data-threeui-hidden', '');
        element.setAttribute('aria-hidden', 'true');
        if ('inert' in element) element.inert = true;
      });
    });
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.fit) element.setAttribute('data-threeui-fit', spec.fit);
      if (spec.preserveTransform) element.setAttribute('data-threeui-preserve-transform', '');
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) {
      var placeholderLink = root.matches('a[href="#"]') ? root : root.querySelector('a[href="#"]');
      if (placeholderLink) placeholderLink.addEventListener('click', function (event) { event.preventDefault(); });
      document.body.appendChild(root);
    });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;
  return source
    .replace(/<\/head>/i, `${focusStyle}</head>`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

export default function TopologyField({
  mode = TOPOLOGY_FIELD_DEFAULTS.mode,
  hue = TOPOLOGY_FIELD_DEFAULTS.hue,
  saturation = TOPOLOGY_FIELD_DEFAULTS.saturation,
  brightness = TOPOLOGY_FIELD_DEFAULTS.brightness,
  className,
  style,
}: TopologyFieldProps) {
  const safeMode: EffectMode = mode === "light" ? "light" : "dark";
  const source = useMemo(
    () => buildFocusedDocument(EFFECT, safeMode),
    [safeMode],
  );
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      className={className}
      data-mode={safeMode}
      title={EFFECT.title}
      srcDoc={source}
      sandbox="allow-scripts"
      loading="lazy"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: "#030712",
        filter,
        ...style,
      }}
    />
  );
}
