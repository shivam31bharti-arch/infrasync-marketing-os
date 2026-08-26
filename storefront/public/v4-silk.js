// v4 silk-waves + tilt engine — extracted verbatim from the Antigravity build.
// Wrapped so it can load after hydration and re-run safely.
(function () {
  if (window.__v4SilkStarted) return;
  window.__v4SilkStarted = true;
  if (!document.getElementById('silk-canvas')) return;
const canvas = document.getElementById('silk-canvas');
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: true, powerPreference: 'high-performance' })
            || canvas.getContext('webgl');

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const NUM_RIBBONS = 32;
    const POINTS_PER_RIBBON = 750;
    const TOTAL_POINTS = NUM_RIBBONS * POINTS_PER_RIBBON;

    const vsSource = `
      precision highp float;
      attribute vec3 aBasePos;
      attribute float aRibbonIndex;
      attribute float aU;

      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uAspect;
      uniform float uShockwave;
      uniform vec2 uShockOrigin;
      uniform float uScroll;

      varying float vRibbon;
      varying float vU;
      varying vec3 vPos;

      void main() {
        vRibbon = aRibbonIndex;
        vU = aU;

        float flowTime = uTime * 0.38 + aU * 3.2;
        float ribbonPhase = aRibbonIndex * 0.24;

        float x = (aU - 0.5) * 3.6;
        float y = sin(x * 1.45 + flowTime + ribbonPhase) * 0.42 
                + cos(x * 2.2 - flowTime * 0.65) * 0.20 
                + (aRibbonIndex - 16.0) * 0.056;
        float z = cos(x * 1.75 + flowTime * 1.05 + ribbonPhase) * 0.48;

        // Scroll Depth Parallax
        y += uScroll * 0.45;
        z -= uScroll * 0.35;

        // Interactive Cursor Hydrodynamic Wake
        vec2 toMouse = vec2(x, y) - uMouse;
        float distMouse = length(toMouse);
        if (distMouse < 0.8) {
          float force = (1.0 - distMouse / 0.8);
          y += toMouse.y * force * 0.4;
          z += force * 0.5;
        }

        // Synaptic Click Shockwave
        if (uShockwave > 0.0) {
          vec2 toShock = vec2(x, y) - uShockOrigin;
          float distShock = length(toShock);
          float waveDist = abs(distShock - (1.0 - uShockwave) * 2.4);
          if (waveDist < 0.32) {
            float shockForce = (1.0 - waveDist / 0.32) * uShockwave * 0.5;
            y += normalize(toShock).y * shockForce;
            z += shockForce * 0.6;
          }
        }

        vPos = vec3(x, y, z);
        vec4 pos = vec4(x / uAspect, y, z * 0.45, 1.0);
        gl_Position = pos;

        gl_PointSize = (2.0 + (z + 0.5) * 1.8) * (1.0 + sin(aU * 16.0 + uTime * 2.0) * 0.2);
      }
    `;

    const fsSource = `
      precision highp float;
      varying float vRibbon;
      varying float vU;
      varying vec3 vPos;
      uniform float uTime;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        float alpha = pow(clamp(1.0 - dist * 2.0, 0.0, 1.0), 1.7) * 0.45;

        vec3 colIndigo = vec3(0.31, 0.27, 0.90);
        vec3 colCyan = vec3(0.06, 0.65, 0.85);
        vec3 colEmerald = vec3(0.02, 0.72, 0.48);

        float colorPhase = sin(vRibbon * 0.28 + vU * 3.5 + uTime * 0.4) * 0.5 + 0.5;
        vec3 baseCol = mix(colIndigo, colCyan, colorPhase);
        baseCol = mix(baseCol, colEmerald, clamp(sin(vPos.y * 2.5 + uTime * 0.5) * 0.5 + 0.5, 0.0, 1.0));

        gl_FragColor = vec4(baseCol, alpha);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    const locBasePos = gl.getAttribLocation(program, 'aBasePos');
    const locRibbon = gl.getAttribLocation(program, 'aRibbonIndex');
    const locU = gl.getAttribLocation(program, 'aU');

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uAspect = gl.getUniformLocation(program, 'uAspect');
    const uShockwave = gl.getUniformLocation(program, 'uShockwave');
    const uShockOrigin = gl.getUniformLocation(program, 'uShockOrigin');
    const uScroll = gl.getUniformLocation(program, 'uScroll');

    const basePosArray = new Float32Array(TOTAL_POINTS * 3);
    const ribbonIndexArray = new Float32Array(TOTAL_POINTS);
    const uArray = new Float32Array(TOTAL_POINTS);

    let ptr = 0;
    for (let r = 0; r < NUM_RIBBONS; r++) {
      for (let p = 0; p < POINTS_PER_RIBBON; p++) {
        const u = p / (POINTS_PER_RIBBON - 1);
        basePosArray[ptr * 3] = (u - 0.5) * 3.6;
        basePosArray[ptr * 3 + 1] = 0;
        basePosArray[ptr * 3 + 2] = 0;

        ribbonIndexArray[ptr] = r;
        uArray[ptr] = u;
        ptr++;
      }
    }

    const bufPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, basePosArray, gl.STATIC_DRAW);

    const bufRibbon = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufRibbon);
    gl.bufferData(gl.ARRAY_BUFFER, ribbonIndexArray, gl.STATIC_DRAW);

    const bufU = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufU);
    gl.bufferData(gl.ARRAY_BUFFER, uArray, gl.STATIC_DRAW);

    let mousePos = [-999, -999];
    let targetMouse = [-999, -999];
    let shockwave = 0.0;
    let shockOrigin = [0, 0];
    let scrollNorm = 0.0;

    window.addEventListener('mousemove', (e) => {
      const aspect = window.innerWidth / window.innerHeight;
      const nx = ((e.clientX / window.innerWidth) * 2 - 1) * aspect;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      targetMouse = [nx, ny];
    });

    window.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.faq-header') || e.target.closest('input')) return;
      const aspect = window.innerWidth / window.innerHeight;
      const nx = ((e.clientX / window.innerWidth) * 2 - 1) * aspect;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      shockOrigin = [nx, ny];
      shockwave = 1.0;
    });

    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollNorm = maxScroll > 0 ? (window.scrollY / maxScroll) : 0;
    });

    const stickyBar = document.getElementById('sticky-bar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 550) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    });

    let startTime = performance.now();
    let lastTime = startTime;

    function render(now) {
      requestAnimationFrame(render);

      const time = (now - startTime) * 0.001;
      const delta = (now - lastTime) * 0.001;
      lastTime = now;

      mousePos[0] += (targetMouse[0] - mousePos[0]) * 0.06;
      mousePos[1] += (targetMouse[1] - mousePos[1]) * 0.06;

      if (shockwave > 0.0) {
        shockwave -= delta * 1.5;
        if (shockwave < 0.0) shockwave = 0.0;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.98, 0.97, 0.96, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
      gl.enableVertexAttribArray(locBasePos);
      gl.vertexAttribPointer(locBasePos, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, bufRibbon);
      gl.enableVertexAttribArray(locRibbon);
      gl.vertexAttribPointer(locRibbon, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, bufU);
      gl.enableVertexAttribArray(locU);
      gl.vertexAttribPointer(locU, 1, gl.FLOAT, false, 0, 0);

      const aspect = canvas.width / canvas.height;

      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mousePos[0], mousePos[1]);
      gl.uniform1f(uAspect, aspect);
      gl.uniform1f(uShockwave, shockwave);
      gl.uniform2f(uShockOrigin, shockOrigin[0], shockOrigin[1]);
      gl.uniform1f(uScroll, scrollNorm);

      gl.drawArrays(gl.POINTS, 0, TOTAL_POINTS);
    }

    requestAnimationFrame(render);

    window.addEventListener('resize', () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    });

    // 3D Magnetic Card Tilt
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach((card) => {
      const maxTilt = parseFloat(card.getAttribute('data-tilt') || '5');
      const sheen = card.querySelector('.specular-sheen');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;

        const rotX = -dy * maxTilt;
        const rotY = dx * maxTilt;

        card.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(8px)`;

        if (sheen) {
          const px = (x / rect.width) * 100;
          const py = (y / rect.height) * 100;
          sheen.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    });
})();
