/* ==== Heart + Sparks + Scrolling Text Rings (no troika) ==== */
(function () {
  const dbgEl = document.getElementById('dbg');
  const dbg = (...args) => { console.log(...args); if (dbgEl) dbgEl.textContent = String(args.join(' ')).slice(0, 160); };

  // ===== Scene / Camera / Renderer =====
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0.1, 2.1);
  

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  document.body.appendChild(renderer.domElement);
  dbg('renderer OK');

  const controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.noPan = true; controls.maxDistance = 3; controls.minDistance = 0.7;

  const root = new THREE.Group();
  scene.add(root);

  // ===== Heart & Sparks (giữ như cũ) =====
  let heart = null, sampler = null, originHeart = null;

  let positions = [], colors = [];
  const geom = new THREE.BufferGeometry();
  const mat = new THREE.PointsMaterial({ vertexColors: true, size: 0.009 });
  const particles = new THREE.Points(geom, mat);
  root.add(particles);

  const simplex = new SimplexNoise();
  const tmpPos = new THREE.Vector3();
  const palette = [ new THREE.Color("#ffd4ee"), new THREE.Color("#ff77fc"), new THREE.Color("#ff77ae"), new THREE.Color("#ff1775") ];

  class SparkPoint {
    constructor() {
      sampler.sample(tmpPos);
      this.color = palette[Math.floor(Math.random() * palette.length)];
      this.rand = Math.random() * 0.03;
      this.pos = tmpPos.clone();
      this.one = null; this.two = null;
    }
    update(a) {
      const n1 = simplex.noise4D(this.pos.x, this.pos.y, this.pos.z, 0.1) + 1.5;
      const n2 = simplex.noise4D(this.pos.x*500, this.pos.y*500, this.pos.z*500, 1) + 1;
      this.one = this.pos.clone().multiplyScalar(1.01 + n1 * 0.15 * beat.a);
      this.two = this.pos.clone().multiplyScalar(1 + n2 * 1 * (beat.a + 0.3) - beat.a * 1.2);
    }
  }
  let spikes = [];
  function initSparks() { positions=[]; colors=[]; spikes.length=0; for (let i=0;i<10000;i++) spikes.push(new SparkPoint()); dbg('spikes:', spikes.length); }

  const HEART_URL = "https://assets.codepen.io/127738/heart_2.obj";
  new THREE.OBJLoader().load(
    HEART_URL,
    (obj) => {
      heart = obj.children[0];
      heart.geometry.rotateX(-Math.PI * 0.5);
      heart.geometry.scale(0.04, 0.04, 0.04);
      heart.geometry.translate(0, -0.4, 0);
      heart.material = new THREE.MeshBasicMaterial({ color: new THREE.Color("rgb(0,0,0)") });
      root.add(heart);

      originHeart = Array.from(heart.geometry.attributes.position.array);
      sampler = new THREE.MeshSurfaceSampler(heart).build();

      initSparks();
      buildTextRings();         // <-- tạo các vành chữ
      renderer.setAnimationLoop(render);
      dbg('heart loaded + rings ready');
    },
    (xhr)=>{ if(xhr.total){ dbg(`loading heart… ${(xhr.loaded/xhr.total*100).toFixed(0)}%`);} else dbg('loading heart…'); },
    (err)=>{ console.error('OBJ load error:', err); dbg('OBJ load error (xem console)'); }
  );

  // Beat chỉ cho heart/sparks (text không phụ thuộc beat)
  const beat = { a: 0 };
  gsap.timeline({ repeat: -1, repeatDelay: 0.3 })
    .to(beat, { a: 0.5, duration: 0.6, ease: "power2.in" })
    .to(beat, { a: 0.0, duration: 0.6, ease: "power3.out" });

  const maxZ = 0.23, rateZ = 0.5;

  // ====== TEXT RINGS (cuộn tròn + xoay quanh tim) ======
  const ringsGroup = new THREE.Group();
  ringsGroup.position.set(0, -0.55, 0);   // đặt dưới trái tim
  root.add(ringsGroup);

  const ringEntries = []; // {mesh, material, scrollSpeed}

  // Vẽ text lặp ngang vào canvas → tạo texture trong suốt
function makeRepeatedTextTexture(text, opts = {}) {
  const {
    fontFamily = 'Poppins, Inter, Arial, Helvetica, sans-serif',
    fontWeight = 800,
    fontSize = 72,        // px
    fill = '#ffffff',
    glow = true,
    glowBlur = 10,        // nhỏ để không nhoè
    stroke = true,
    strokeWidth = 10,     // viền đen rõ ràng
    letterSpacing = 10,   // px giữa ký tự
    gap = 120,            // px trống giữa 2 câu khi lặp
    padY = 20
  } = opts;

  const dpr = Math.min(2, window.devicePixelRatio || 1);

  // đo tổng rộng chữ với letterSpacing thủ công
  const tmp = document.createElement('canvas').getContext('2d');
  tmp.font = `${fontWeight} ${fontSize * dpr}px ${fontFamily}`;
  let wText = 0;
  for (let i = 0; i < text.length; i++) {
    wText += tmp.measureText(text[i]).width + (i < text.length - 1 ? letterSpacing * dpr : 0);
  }
  const unit = Math.ceil(wText + gap * dpr);   // 1 ô lặp = 1 câu + gap

  const W = unit;
  const H = Math.ceil((fontSize + padY * 2) * dpr);

  const cnv = document.createElement('canvas');
  cnv.width = W; cnv.height = H;
  const ctx = cnv.getContext('2d');

  ctx.font = `${fontWeight} ${fontSize * dpr}px ${fontFamily}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';

  const cx = Math.floor((W - wText) / 2);
  const cy = Math.floor(H / 2);

  // đổ bóng nhẹ (glow) trước
  if (glow) {
    ctx.save();
    ctx.shadowColor = 'rgba(255,255,255,0.9)';
    ctx.shadowBlur = glowBlur * dpr;
    ctx.fillStyle = fill;
    // vẽ ký tự từng cái để áp letterSpacing
    let x = cx;
    for (let i = 0; i < text.length; i++) {
      ctx.fillText(text[i], x, cy);
      x += tmp.measureText(text[i]).width + (i < text.length - 1 ? letterSpacing * dpr : 0);
    }
    ctx.restore();
  }

  // stroke đen để tách nền
  if (stroke) {
    ctx.lineWidth = strokeWidth * dpr;
    ctx.strokeStyle = 'rgba(0,0,0,0.95)';
    let x = cx;
    for (let i = 0; i < text.length; i++) {
      ctx.strokeText(text[i], x, cy);
      x += tmp.measureText(text[i]).width + (i < text.length - 1 ? letterSpacing * dpr : 0);
    }
  }

  // fill trắng
  ctx.fillStyle = fill;
  {
    let x = cx;
    for (let i = 0; i < text.length; i++) {
      ctx.fillText(text[i], x, cy);
      x += tmp.measureText(text[i]).width + (i < text.length - 1 ? letterSpacing * dpr : 0);
    }
  }

  const tex = new THREE.CanvasTexture(cnv);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  tex.generateMipmaps = false;
  tex.needsUpdate = true;

  return tex;
}

function createScrollingCylinderRing(text, radius, height, scrollSpeed, repeatCount = 2, tilt = 0.10) {
  const tex = makeRepeatedTextTexture(text, {
    fontSize: 84,
    letterSpacing: 12,
    gap: 140,
    glowBlur: 8,
    strokeWidth: 8
  });

  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(repeatCount, 1);  // đúng 2 câu / vòng
  tex.offset.set(0, 0);

  const material = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    side: THREE.DoubleSide,   // ✅ không đứt đoạn khi nhìn nửa vòng phía xa
    depthWrite: false
    // depthTest: false,      // bật nếu muốn chữ luôn nổi trên hạt
  });

  const radialSeg = 512;
  const geo = new THREE.CylinderGeometry(radius, radius, height, radialSeg, 1, true);

  const mesh = new THREE.Mesh(geo, material);
  mesh.rotation.x = tilt;     // hơi ngửa về camera

  ringsGroup.add(mesh);
  ringEntries.push({ mesh, material, scrollSpeed });
}

function buildTextRings() {
  const text1 = "Chúc bà chã ngày 20.10 luôn xinh đẹp và vui vẻ ";
  const text2 = "Ngập tràn niềm vui - Hạnh phúc - Bình an ";
  const text3 = "Yêu thương - 20/10 ";

  //               text , radius, height, scroll, repeat=2, tilt
  createScrollingCylinderRing(text1, 0.95, 0.12,  0.00, 2, 0.13); // scroll=0 -> đứng yên
  createScrollingCylinderRing(text2, 0.72, 0.10,  0.00, 2, 0.10);
  createScrollingCylinderRing(text3, 0.50, 0.08,  0.00, 2, 0.08);

  dbg('rings:', ringEntries.length);
}

  // ===== Render loop =====
  let lastT = 0;
  function render(ms) {
    const t = ms * 0.001;
    const dt = lastT ? (t - lastT) : 0.016;
    lastT = t;

    // — cập nhật sparks
    positions.length = 0; colors.length = 0;
    for (let i = 0; i < spikes.length; i++) {
      const g = spikes[i]; g.update(t);
      const rand = g.rand, color = g.color;
      if (maxZ*rateZ + rand > g.one.z && g.one.z > -maxZ*rateZ - rand) {
        positions.push(g.one.x, g.one.y, g.one.z); colors.push(color.r, color.g, color.b);
      }
      if (maxZ*rateZ + rand*2 > g.one.z && g.one.z > -maxZ*rateZ - rand*2) {
        positions.push(g.two.x, g.two.y, g.two.z); colors.push(color.r, color.g, color.b);
      }
    }
    geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    geom.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3));

    // — tim đập (giữ như cũ)
    if (heart) {
      const vs = heart.geometry.attributes.position.array;
      for (let i=0;i<vs.length;i+=3) {
        const v = new THREE.Vector3(originHeart[i], originHeart[i+1], originHeart[i+2]);
        const n = simplex.noise4D(originHeart[i]*1.5, originHeart[i+1]*1.5, originHeart[i+2]*1.5, t*0.0005) + 1;
        v.multiplyScalar(n * 0.15 * beat.a);
        vs[i]=v.x; vs[i+1]=v.y; vs[i+2]=v.z;
      }
      heart.geometry.attributes.position.needsUpdate = true;
    }

    // — TEXT RINGS: cuộn texture (scroll) + quay cả cụm quanh trái tim
    for (const r of ringEntries) {
      const map = r.material.map;
      // cuộn như băng chuyền, dt giúp tốc độ ổn định theo thời gian thực
      map.offset.x = (map.offset.x + r.scrollSpeed * dt) % 1;
    }

    // quay toàn bộ cụm rings quanh trục Y (trái tim làm tâm)
    ringsGroup.rotation.y -= 0.18 * dt; // tốc độ quay

    // — render
    controls.update();
    renderer.render(scene, camera);
  } // end render()

  // ===== Resize & WebGL context =====
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  renderer.domElement.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    console.warn('WebGL context lost');
  });
})();