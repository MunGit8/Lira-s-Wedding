/* ===== EASY-EDIT SETTINGS ===== */
const CONFIG = {
  weddingDate: "2026-12-12T19:00:00+06:00",   // 12 Dec 2026, 7:00 PM Bangladesh time
  musicVolume: 0.5                            // 0 to 1
};

const $ = id => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobile = innerWidth < 700;

/* ---------- Botanical wreath (SVG, generated) ---------- */
(function wreath(){
  const svg = $("wreath"); let s = "";
  const leaf = (a, r, sc, o) => `<g transform="rotate(${a}) translate(0 ${-r}) scale(${sc})" opacity="${o}"><path d="M0 0C9 -10 9 -26 0 -38C-9 -26 -9 -10 0 0Z" fill="#E6D3A3" stroke="#A78B55" stroke-width=".8"/><path d="M0 -3V-33" stroke="#A78B55" stroke-width=".6"/></g>`;
  s += `<circle r="62" fill="none" stroke="#C6A96C" stroke-width="1"/><circle r="58" fill="none" stroke="#C6A96C" stroke-width=".4" stroke-dasharray="1 3"/>`;
  for (let i = 0; i < 28; i++) s += leaf(i * 360/28, 64, .62, .95);
  for (let i = 0; i < 20; i++) s += leaf(i * 18 + 9, 50, -.5, .8).replace("translate(0 -50) scale(-0.5)", "translate(0 -50) scale(.5,-.5)");
  for (let i = 0; i < 8; i++) { const a = i*45 + 22.5; s += `<g transform="rotate(${a}) translate(0 -88)"><circle r="6" fill="#F4F0E6" stroke="#C6A96C"/><circle r="2.2" fill="#C6A96C"/><circle cx="0" cy="-8" r="2" fill="#C6A96C"/></g>`; }
  svg.innerHTML = s;
})();

/* ---------- Particle / firework canvas ---------- */
const cv = $("fx"), ctx = cv.getContext("2d");
let W, H, dpr = Math.min(devicePixelRatio || 1, 2), parts = [], boom = [], running = false, ambient = false;
function size(){ W = innerWidth; H = innerHeight; cv.width = W*dpr; cv.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
addEventListener("resize", size); size();
const gold = ["255,236,176","230,205,140","198,169,108","255,248,225"];
function dust(x, y, burst){
  const a = Math.random()*6.283, v = burst ? Math.random()*1.6+.3 : Math.random()*.4;
  parts.push({x, y, vx: Math.cos(a)*v, vy: Math.sin(a)*v - .25, r: Math.random()*(burst?2.4:3)+.6, l: 0, m: 90+Math.random()*120, c: gold[(Math.random()*4)|0], bokeh: Math.random() < .12});
}
function firework(x, y){
  const n = mobile ? 26 : 44, c = gold[(Math.random()*3)|0];
  for (let i = 0; i < n; i++){ const a = i/n*6.283, v = 1.8 + Math.random()*1.6; boom.push({x, y, vx: Math.cos(a)*v, vy: Math.sin(a)*v, l: 0, m: 55+Math.random()*25, c}); }
}
function tick(){
  if (!running) return;
  ctx.clearRect(0, 0, W, H); ctx.globalCompositeOperation = "lighter";
  if (ambient && parts.length < (mobile ? 28 : 55) && Math.random() < .5) dust(Math.random()*W, Math.random()*H, false);
  parts = parts.filter(p => p.l++ < p.m);
  for (const p of parts){
    p.x += p.vx; p.y += p.vy; const t = 1 - p.l/p.m, tw = .6 + .4*Math.sin(p.l*.3);
    ctx.beginPath(); ctx.fillStyle = `rgba(${p.c},${(p.bokeh ? .18 : .9)*t*tw})`; ctx.arc(p.x, p.y, p.bokeh ? p.r*5 : p.r, 0, 6.283); ctx.fill();
  }
  boom = boom.filter(p => p.l++ < p.m);
  for (const p of boom){
    p.vx *= .965; p.vy = p.vy*.965 + .035; p.x += p.vx; p.y += p.vy; const t = 1 - p.l/p.m;
    ctx.beginPath(); ctx.fillStyle = `rgba(${p.c},${t})`; ctx.arc(p.x, p.y, 1.8*t+.4, 0, 6.283); ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";
  if (parts.length || boom.length || ambient) requestAnimationFrame(tick); else running = false;
}
function start(){ if (!running && !reduce){ running = true; requestAnimationFrame(tick); } }

/* ---------- Botanical sprigs on every page ---------- */
function sprigSVG(){
  let s='<svg viewBox="0 0 120 160" aria-hidden="true"><path d="M8 152C30 100 60 60 104 8" fill="none" stroke="#C6A96C" stroke-width="1.2"/>';
  for(let i=1;i<9;i++){const t=i/9,u=1-t,x=u*u*u*8+3*u*u*t*30+3*u*t*t*60+t*t*t*104,y=u*u*u*152+3*u*u*t*100+3*u*t*t*60+t*t*t*8,side=i%2?1:-1;
    s+=`<path transform="translate(${x} ${y}) rotate(${35+side*55}) scale(${.5+(1-t)*.35})" d="M0 0C8-8 8-22 0-30C-8-22-8-8 0 0Z" fill="#C6A96C" fill-opacity=".22" stroke="#A78B55" stroke-opacity=".7" stroke-width=".8"/>`;}
  s+='<g transform="translate(104 8)">';
  for(let k=0;k<6;k++)s+=`<ellipse rx="3.4" ry="8" cy="-8" transform="rotate(${k*60})" fill="#C6A96C" fill-opacity=".22" stroke="#A78B55" stroke-opacity=".7" stroke-width=".7"/>`;
  return s+'<circle r="3" fill="#C6A96C" fill-opacity=".8"/></g></svg>';
}
document.querySelectorAll(".paper").forEach(p=>{["a","b"].forEach(k=>{const d=document.createElement("div");d.className="sprig "+k;d.innerHTML=sprigSVG();p.prepend(d);});});

/* ---------- Opening sequence ---------- */
let opened = false;
$("seal").addEventListener("click", () => {
  if (opened) return; opened = true;
  const cover = $("cover"); cover.classList.add("opening");
  const r = $("env").getBoundingClientRect(), cx = r.left + r.width/2, cy = r.top + r.height/2;
  start();
  const spawn = setInterval(() => { for (let i = 0; i < (mobile ? 3 : 6); i++) dust(cx + (Math.random()-.5)*r.width, cy + (Math.random()-.5)*r.height, true); }, 60);
  [2000, 2700, 3300].forEach((t, i) => setTimeout(() => firework(i === 1 ? cx : cx + (i ? 1 : -1)*r.width*.7, cy - r.height*(.3 + Math.random()*.15)), t));
  setTimeout(() => { clearInterval(spawn); cv.classList.add("free"); document.body.appendChild(cv); cover.classList.add("gone"); document.body.classList.remove("locked"); document.body.classList.add("ready"); ambient = true; start(); scrollTo(0, 0); }, 4800);
  setTimeout(() => { cover.style.display = "none"; }, 6600);
});

/* ---------- Countdown ---------- */
const target = new Date(CONFIG.weddingDate).getTime(), pad = n => String(n).padStart(2, "0");
function count(){
  const diff = target - Date.now();
  if (diff <= 0){ $("timer").hidden = true; $("done").hidden = false; return; }
  $("d").textContent = pad(Math.floor(diff/864e5)); $("h").textContent = pad(Math.floor(diff/36e5)%24);
  $("m").textContent = pad(Math.floor(diff/6e4)%60); $("s").textContent = pad(Math.floor(diff/1e3)%60);
}
count(); setInterval(count, 1000);

/* ---------- Navigation highlight ---------- */
const links = [...document.querySelectorAll("#nav a")];
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.hash === "#" + e.target.id)); }), {threshold: .5});
document.querySelectorAll(".page").forEach(p => io.observe(p));

/* ---------- Music: soft ambient piano-pad generated live in the browser ----------
   No audio file, no copyright: every note is synthesised by the Web Audio API.
   Starts only when the guest taps the ♪ button. */
(function music(){
  const AC = window.AudioContext || window.webkitAudioContext, box = $("music");
  if (!AC) return;
  box.hidden = false;
  const play = $("play"), mute = $("mute");
  let ctx, out, master, timers = [], step = 0, playing = false, muted = false;
  const chords = [[130.81,196,246.94,329.63],[110,164.81,261.63,329.63],[87.31,174.61,261.63,329.63],[98,196,246.94,329.63]];
  const pent = [523.25,587.33,659.25,783.99,880,1046.5];
  function tone(f, dur, vol, type, att){
    const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + att); g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + .1);
  }
  const chord = () => chords[step++ % 4].forEach(f => { tone(f, 9, .05, "triangle", 3); tone(f*1.004, 9, .03, "sine", 3); });
  const bell = () => { if (Math.random() < .7) tone(pent[(Math.random()*6)|0], 3.2, .035, "sine", .03); };
  function build(){
    ctx = new AC(); out = ctx.createGain(); out.gain.value = CONFIG.musicVolume; out.connect(ctx.destination);
    master = ctx.createGain(); master.connect(out);
    const d = ctx.createDelay(); d.delayTime.value = .55; const fb = ctx.createGain(); fb.gain.value = .45;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2200;
    master.connect(d); d.connect(lp); lp.connect(fb); fb.connect(d); lp.connect(out);
  }
  function go(){ chord(); timers = [setInterval(chord, 8000), setInterval(bell, 1900)]; }
  play.addEventListener("click", async () => {
    if (!ctx) build();
    if (!playing){ await ctx.resume(); go(); playing = true; play.classList.add("active"); play.setAttribute("aria-label", "Pause music"); }
    else { timers.forEach(clearInterval); await ctx.suspend(); playing = false; play.classList.remove("active"); play.setAttribute("aria-label", "Play music"); }
  });
  mute.addEventListener("click", () => {
    muted = !muted; if (out) out.gain.value = muted ? 0 : CONFIG.musicVolume;
    mute.textContent = muted ? "🔇" : "🔈"; mute.classList.toggle("active", muted);
  });
})();
