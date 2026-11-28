/* Procedural champagne ribbons behind the hero.
   Coordinates are "design units": 1672 × 941 on desktop, 430 × 860 on phones (≤700px).
   Each ribbon is a centre line that drifts on two incommensurate sine waves, with a signed
   width that can fold through zero, which reads as fabric twisting. Nothing ever loops visibly. */

export type Pt = readonly [number, number];

export type RibbonDef = {
  id: string;
  spine: readonly Pt[];
  width: number;
  amp: number;
  speed: number;
  phase: number;
  twist: number;
  twistSpeed: number;
  gradient: "wash" | "band" | "crest" | "veil";
  opacity: number;
  sheen: number;
};

export type RibbonLayout = { name: "desktop" | "mobile"; width: number; height: number; back: RibbonDef[]; front: RibbonDef[] };
export type RibbonPointer = { x: number; y: number; strength: number };
export type RibbonFrame = { body: string; sheen: string; shade: string };

const r = (n: number) => Math.round(n * 10) / 10;

/** Catmull-Rom through every point, as cubic Bézier segments (no leading M). */
function curveThrough(pts: [number, number][]): string {
  let d = "";
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    d += `C${r(p1[0] + (p2[0] - p0[0]) / 6)} ${r(p1[1] + (p2[1] - p0[1]) / 6)} ${r(p2[0] - (p3[0] - p1[0]) / 6)} ${r(p2[1] - (p3[1] - p1[1]) / 6)} ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}

export function ribbonFrame(def: RibbonDef, t: number, pointer?: RibbonPointer): RibbonFrame {
  const n = def.spine.length;
  const spine: [number, number][] = new Array(n);
  for (let i = 0; i < n; i++) {
    const [bx, by] = def.spine[i];
    const a = t * def.speed + def.phase;
    let y = by + def.amp * Math.sin(a + i * 0.83) + def.amp * 0.42 * Math.sin(a * 1.71 + i * 1.93 + def.phase);
    const x = bx + def.amp * 0.55 * Math.sin(a * 0.61 + i * 1.27);
    if (pointer && pointer.strength > 0.001) {
      // A very slight lean toward the cursor, with a wide, soft falloff.
      const dx = x - pointer.x;
      y += (pointer.y - y) * 0.045 * Math.exp(-(dx * dx) / (2 * 320 * 320)) * pointer.strength;
    }
    spine[i] = [x, y];
  }
  const top: [number, number][] = new Array(n);
  const bottom: [number, number][] = new Array(n);
  for (let i = 0; i < n; i++) {
    const prev = spine[Math.max(0, i - 1)], next = spine[Math.min(n - 1, i + 1)];
    const tx = next[0] - prev[0], ty = next[1] - prev[1];
    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len, ny = tx / len;
    const envelope = 0.55 + 0.45 * Math.sin((Math.PI * i) / (n - 1));
    const fold = 1 - def.twist + def.twist * Math.cos(t * def.twistSpeed + i * 0.71 + def.phase * 1.3);
    const half = (def.width * envelope * fold) / 2;
    top[i] = [spine[i][0] - nx * half, spine[i][1] - ny * half];
    bottom[i] = [spine[i][0] + nx * half, spine[i][1] + ny * half];
  }
  const back = [...bottom].reverse();
  return {
    body: `M${r(top[0][0])} ${r(top[0][1])}${curveThrough(top)}L${r(back[0][0])} ${r(back[0][1])}${curveThrough(back)}Z`,
    sheen: `M${r(top[0][0])} ${r(top[0][1])}${curveThrough(top)}`,
    shade: `M${r(bottom[0][0])} ${r(bottom[0][1])}${curveThrough(bottom)}`,
  };
}

/* Opacities are deliberately lower than a standalone piece: the hero's cards and headline lead. */
export const desktopRibbons: RibbonLayout = {
  name: "desktop", width: 1672, height: 941,
  back: [
    { id: "wash", width: 420, amp: 22, speed: 0.17, phase: 0.4, twist: 0.32, twistSpeed: 0.11, gradient: "wash", opacity: 0.5, sheen: 0.55,
      spine: [[-900, 760], [-300, 650], [200, 590], [620, 500], [1000, 350], [1360, 190], [1760, 50], [2400, -90]] },
    { id: "band", width: 150, amp: 30, speed: 0.22, phase: 2.1, twist: 0.82, twistSpeed: 0.16, gradient: "band", opacity: 0.62, sheen: 0.9,
      spine: [[-900, 600], [-260, 520], [180, 540], [560, 640], [920, 600], [1260, 420], [1600, 290], [2400, 200]] },
    { id: "crest", width: 130, amp: 18, speed: 0.2, phase: 4.2, twist: 0.9, twistSpeed: 0.14, gradient: "crest", opacity: 0.7, sheen: 1,
      spine: [[860, -220], [1120, -90], [1330, 20], [1500, 120], [1680, 175], [1960, 190], [2400, 160]] },
    { id: "crest-echo", width: 74, amp: 16, speed: 0.24, phase: 5.6, twist: 0.7, twistSpeed: 0.19, gradient: "band", opacity: 0.55, sheen: 0.8,
      spine: [[1100, -200], [1300, -70], [1470, 30], [1620, 70], [1820, 60], [2400, 20]] },
    { id: "floor", width: 340, amp: 24, speed: 0.15, phase: 1.2, twist: 0.3, twistSpeed: 0.09, gradient: "wash", opacity: 0.45, sheen: 0.45,
      spine: [[-900, 980], [-220, 900], [300, 840], [720, 900], [1120, 950], [1520, 840], [2400, 800]] },
  ],
  front: [
    { id: "veil", width: 170, amp: 20, speed: 0.19, phase: 3.3, twist: 0.55, twistSpeed: 0.12, gradient: "veil", opacity: 0.8, sheen: 0.7,
      spine: [[-600, 1100], [100, 1030], [560, 960], [920, 990], [1300, 1040], [1900, 1030], [2400, 1070]] },
  ],
};

export const mobileRibbons: RibbonLayout = {
  name: "mobile", width: 430, height: 860,
  back: [
    { id: "wash", width: 260, amp: 14, speed: 0.17, phase: 0.4, twist: 0.32, twistSpeed: 0.11, gradient: "wash", opacity: 0.5, sheen: 0.55,
      spine: [[-500, 700], [-120, 620], [120, 580], [300, 490], [480, 370], [760, 220]] },
    { id: "band", width: 96, amp: 16, speed: 0.22, phase: 2.1, twist: 0.82, twistSpeed: 0.16, gradient: "band", opacity: 0.62, sheen: 0.9,
      spine: [[-500, 540], [-90, 500], [140, 530], [300, 570], [470, 470], [760, 370]] },
    { id: "crest", width: 84, amp: 12, speed: 0.2, phase: 4.2, twist: 0.9, twistSpeed: 0.14, gradient: "crest", opacity: 0.7, sheen: 1,
      spine: [[150, -140], [290, -30], [390, 50], [500, 100], [760, 120]] },
    { id: "floor", width: 230, amp: 14, speed: 0.15, phase: 1.2, twist: 0.3, twistSpeed: 0.09, gradient: "wash", opacity: 0.45, sheen: 0.45,
      spine: [[-500, 900], [-80, 850], [180, 810], [380, 860], [760, 820]] },
  ],
  front: [
    { id: "veil", width: 110, amp: 12, speed: 0.19, phase: 3.3, twist: 0.55, twistSpeed: 0.12, gradient: "veil", opacity: 0.8, sheen: 0.7,
      spine: [[-400, 960], [60, 900], [250, 860], [460, 890], [760, 930]] },
  ],
};
