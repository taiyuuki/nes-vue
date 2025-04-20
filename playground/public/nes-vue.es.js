var Er = Object.defineProperty;
var kr = (i, e, t) => e in i ? Er(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var h = (i, e, t) => kr(i, typeof e != "symbol" ? e + "" : e, t);
import { computed as pe, watch as Zt, onMounted as Cs, onBeforeUnmount as Es, ref as ks, defineComponent as Ir, watchEffect as Dr, nextTick as Nr, createElementBlock as bi, openBlock as Si, normalizeStyle as Tr, createElementVNode as Ai, withDirectives as Fr, createCommentVNode as wr, unref as Ci, vShow as Or, toDisplayString as Br } from "vue";
function ri(i, e, t) {
  return e > t && ([e, t] = [t, e]), Math.min(t, Math.max(e, i));
}
function Mr(i) {
  return i === void 0;
}
function yr(i) {
  return i === null;
}
function Is(i) {
  return typeof i == "number" ? Number.isNaN(i) : yr(i) || Mr(i);
}
function Lr(i) {
  return !Is(i);
}
function Ds(i) {
  return Object.keys(i);
}
function Ei(i, e) {
  return i in e;
}
function Vt(i, e = 16) {
  e = ri(e, 2, 36);
  let t = "";
  for (let s = 1; s <= i; s++)
    t += Math.floor(Math.random() * e).toString(e);
  return t;
}
function Ns() {
  let i = "";
  if (typeof crypto < "u" && "randomUUID" in crypto)
    i = crypto.randomUUID();
  else if (typeof Blob > "u")
    i = `${Vt(8)}-${Vt(4)}-${Vt(4)}-${Vt(4)}-${Vt(12)}`;
  else {
    const e = URL.createObjectURL(new Blob());
    i = e.toString().substring(e.lastIndexOf("/") + 1), URL.revokeObjectURL(e);
  }
  return i;
}
function Pr(i, e = Ns()) {
  const t = document.createElement("a");
  t.href = i, t.download = e, t.click();
}
function Vr(i, e = Ns()) {
  Pr(i.toDataURL("image/png"), e);
}
class vr {
  /**
   * 这是 IndexedDB 数据库的构造函数，用于创建对象存储。
   * @param dbName - 将创建或访问的 IndexedDB 数据库的名称。
   * @param storeName - 将在 IndexedDB 数据库中创建或访问的存储对象的名称。
   * @param version - 存储对象的版本。
   * @returns DB类的实例
   */
  constructor(e, t, s) {
    h(this, "_dataFactory", window.indexedDB);
    h(this, "_dbName");
    h(this, "_storeName");
    h(this, "_database");
    h(this, "_res");
    this._dataFactory = window.indexedDB, this._dbName = e, this._storeName = t, this._res = this._dataFactory.open(this._dbName, s), this._res.addEventListener("success", () => {
      this._database = this._res.result, this._database.objectStoreNames.contains(this._storeName) || this._database.createObjectStore(this._storeName, { keyPath: "id" });
    }), this._res.addEventListener("error", () => {
      console.error("indexedDB load error");
    }), this._res.addEventListener("upgradeneeded", () => {
      this._database = this._res.result, this._database.objectStoreNames.contains(this._storeName) || this._database.createObjectStore(this._storeName, { keyPath: "id" });
    });
  }
  get _store() {
    return this._database.transaction([this._storeName], "readwrite").objectStore(this._storeName);
  }
  /**
   * 将对象存储中的数据写入 IndexedDB 数据库。
   * @param id - 数据的唯一标识。
   * @param data - 数据。
   */
  set_item(e, t) {
    this._store.put({ id: e, data: t });
  }
  /**
   * 从对象存储中读取数据。
   * @param id - 数据的唯一标识。
   * @returns 数据，它是一个Promise。
   *
   */
  get_item(e) {
    const t = this._store.get(e);
    return new Promise((s, r) => {
      t.addEventListener("success", () => {
        s(t.result.data);
      }), t.addEventListener("error", r);
    });
  }
  /**
   * 从对象存储中删除数据。
   * @param id - 数据的唯一标识。
   */
  remove_item(e) {
    this._store.delete(e);
  }
  /**
   * 清空对象存储中的所有数据。
   */
  clear() {
    this._store.clear();
  }
}
function Gr(i, e) {
  return new vr(i, e);
}
/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
const qr = 4, ki = 0, Ii = 1, Hr = 2;
function yt(i) {
  let e = i.length;
  for (; --e >= 0; )
    i[e] = 0;
}
const Zr = 0, Ts = 1, Xr = 2, zr = 3, Ur = 258, hi = 29, ie = 256, Wt = ie + 1 + hi, Tt = 30, ai = 19, Fs = 2 * Wt + 1, mt = 15, Fe = 16, Yr = 7, ni = 256, ws = 16, Os = 17, Bs = 18, ze = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
), _e = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
), Wr = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
), Ms = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), $r = 512, rt = new Array((Wt + 2) * 2);
yt(rt);
const Xt = new Array(Tt * 2);
yt(Xt);
const $t = new Array($r);
yt($t);
const Kt = new Array(Ur - zr + 1);
yt(Kt);
const oi = new Array(hi);
yt(oi);
const Re = new Array(Tt);
yt(Re);
function we(i, e, t, s, r) {
  this.static_tree = i, this.extra_bits = e, this.extra_base = t, this.elems = s, this.max_length = r, this.has_stree = i && i.length;
}
let ys, Ls, Ps;
function Oe(i, e) {
  this.dyn_tree = i, this.max_code = 0, this.stat_desc = e;
}
const Vs = (i) => i < 256 ? $t[i] : $t[256 + (i >>> 7)], Jt = (i, e) => {
  i.pending_buf[i.pending++] = e & 255, i.pending_buf[i.pending++] = e >>> 8 & 255;
}, G = (i, e, t) => {
  i.bi_valid > Fe - t ? (i.bi_buf |= e << i.bi_valid & 65535, Jt(i, i.bi_buf), i.bi_buf = e >> Fe - i.bi_valid, i.bi_valid += t - Fe) : (i.bi_buf |= e << i.bi_valid & 65535, i.bi_valid += t);
}, K = (i, e, t) => {
  G(
    i,
    t[e * 2],
    t[e * 2 + 1]
    /*.Len*/
  );
}, vs = (i, e) => {
  let t = 0;
  do
    t |= i & 1, i >>>= 1, t <<= 1;
  while (--e > 0);
  return t >>> 1;
}, Kr = (i) => {
  i.bi_valid === 16 ? (Jt(i, i.bi_buf), i.bi_buf = 0, i.bi_valid = 0) : i.bi_valid >= 8 && (i.pending_buf[i.pending++] = i.bi_buf & 255, i.bi_buf >>= 8, i.bi_valid -= 8);
}, Jr = (i, e) => {
  const t = e.dyn_tree, s = e.max_code, r = e.stat_desc.static_tree, a = e.stat_desc.has_stree, o = e.stat_desc.extra_bits, n = e.stat_desc.extra_base, l = e.stat_desc.max_length;
  let f, c, d, _, p, m, k = 0;
  for (_ = 0; _ <= mt; _++)
    i.bl_count[_] = 0;
  for (t[i.heap[i.heap_max] * 2 + 1] = 0, f = i.heap_max + 1; f < Fs; f++)
    c = i.heap[f], _ = t[t[c * 2 + 1] * 2 + 1] + 1, _ > l && (_ = l, k++), t[c * 2 + 1] = _, !(c > s) && (i.bl_count[_]++, p = 0, c >= n && (p = o[c - n]), m = t[c * 2], i.opt_len += m * (_ + p), a && (i.static_len += m * (r[c * 2 + 1] + p)));
  if (k !== 0) {
    do {
      for (_ = l - 1; i.bl_count[_] === 0; )
        _--;
      i.bl_count[_]--, i.bl_count[_ + 1] += 2, i.bl_count[l]--, k -= 2;
    } while (k > 0);
    for (_ = l; _ !== 0; _--)
      for (c = i.bl_count[_]; c !== 0; )
        d = i.heap[--f], !(d > s) && (t[d * 2 + 1] !== _ && (i.opt_len += (_ - t[d * 2 + 1]) * t[d * 2], t[d * 2 + 1] = _), c--);
  }
}, Gs = (i, e, t) => {
  const s = new Array(mt + 1);
  let r = 0, a, o;
  for (a = 1; a <= mt; a++)
    r = r + t[a - 1] << 1, s[a] = r;
  for (o = 0; o <= e; o++) {
    let n = i[o * 2 + 1];
    n !== 0 && (i[o * 2] = vs(s[n]++, n));
  }
}, jr = () => {
  let i, e, t, s, r;
  const a = new Array(mt + 1);
  for (t = 0, s = 0; s < hi - 1; s++)
    for (oi[s] = t, i = 0; i < 1 << ze[s]; i++)
      Kt[t++] = s;
  for (Kt[t - 1] = s, r = 0, s = 0; s < 16; s++)
    for (Re[s] = r, i = 0; i < 1 << _e[s]; i++)
      $t[r++] = s;
  for (r >>= 7; s < Tt; s++)
    for (Re[s] = r << 7, i = 0; i < 1 << _e[s] - 7; i++)
      $t[256 + r++] = s;
  for (e = 0; e <= mt; e++)
    a[e] = 0;
  for (i = 0; i <= 143; )
    rt[i * 2 + 1] = 8, i++, a[8]++;
  for (; i <= 255; )
    rt[i * 2 + 1] = 9, i++, a[9]++;
  for (; i <= 279; )
    rt[i * 2 + 1] = 7, i++, a[7]++;
  for (; i <= 287; )
    rt[i * 2 + 1] = 8, i++, a[8]++;
  for (Gs(rt, Wt + 1, a), i = 0; i < Tt; i++)
    Xt[i * 2 + 1] = 5, Xt[i * 2] = vs(i, 5);
  ys = new we(rt, ze, ie + 1, Wt, mt), Ls = new we(Xt, _e, 0, Tt, mt), Ps = new we(new Array(0), Wr, 0, ai, Yr);
}, qs = (i) => {
  let e;
  for (e = 0; e < Wt; e++)
    i.dyn_ltree[e * 2] = 0;
  for (e = 0; e < Tt; e++)
    i.dyn_dtree[e * 2] = 0;
  for (e = 0; e < ai; e++)
    i.bl_tree[e * 2] = 0;
  i.dyn_ltree[ni * 2] = 1, i.opt_len = i.static_len = 0, i.sym_next = i.matches = 0;
}, Hs = (i) => {
  i.bi_valid > 8 ? Jt(i, i.bi_buf) : i.bi_valid > 0 && (i.pending_buf[i.pending++] = i.bi_buf), i.bi_buf = 0, i.bi_valid = 0;
}, Di = (i, e, t, s) => {
  const r = e * 2, a = t * 2;
  return i[r] < i[a] || i[r] === i[a] && s[e] <= s[t];
}, Be = (i, e, t) => {
  const s = i.heap[t];
  let r = t << 1;
  for (; r <= i.heap_len && (r < i.heap_len && Di(e, i.heap[r + 1], i.heap[r], i.depth) && r++, !Di(e, s, i.heap[r], i.depth)); )
    i.heap[t] = i.heap[r], t = r, r <<= 1;
  i.heap[t] = s;
}, Ni = (i, e, t) => {
  let s, r, a = 0, o, n;
  if (i.sym_next !== 0)
    do
      s = i.pending_buf[i.sym_buf + a++] & 255, s += (i.pending_buf[i.sym_buf + a++] & 255) << 8, r = i.pending_buf[i.sym_buf + a++], s === 0 ? K(i, r, e) : (o = Kt[r], K(i, o + ie + 1, e), n = ze[o], n !== 0 && (r -= oi[o], G(i, r, n)), s--, o = Vs(s), K(i, o, t), n = _e[o], n !== 0 && (s -= Re[o], G(i, s, n)));
    while (a < i.sym_next);
  K(i, ni, e);
}, Ue = (i, e) => {
  const t = e.dyn_tree, s = e.stat_desc.static_tree, r = e.stat_desc.has_stree, a = e.stat_desc.elems;
  let o, n, l = -1, f;
  for (i.heap_len = 0, i.heap_max = Fs, o = 0; o < a; o++)
    t[o * 2] !== 0 ? (i.heap[++i.heap_len] = l = o, i.depth[o] = 0) : t[o * 2 + 1] = 0;
  for (; i.heap_len < 2; )
    f = i.heap[++i.heap_len] = l < 2 ? ++l : 0, t[f * 2] = 1, i.depth[f] = 0, i.opt_len--, r && (i.static_len -= s[f * 2 + 1]);
  for (e.max_code = l, o = i.heap_len >> 1; o >= 1; o--)
    Be(i, t, o);
  f = a;
  do
    o = i.heap[
      1
      /*SMALLEST*/
    ], i.heap[
      1
      /*SMALLEST*/
    ] = i.heap[i.heap_len--], Be(
      i,
      t,
      1
      /*SMALLEST*/
    ), n = i.heap[
      1
      /*SMALLEST*/
    ], i.heap[--i.heap_max] = o, i.heap[--i.heap_max] = n, t[f * 2] = t[o * 2] + t[n * 2], i.depth[f] = (i.depth[o] >= i.depth[n] ? i.depth[o] : i.depth[n]) + 1, t[o * 2 + 1] = t[n * 2 + 1] = f, i.heap[
      1
      /*SMALLEST*/
    ] = f++, Be(
      i,
      t,
      1
      /*SMALLEST*/
    );
  while (i.heap_len >= 2);
  i.heap[--i.heap_max] = i.heap[
    1
    /*SMALLEST*/
  ], Jr(i, e), Gs(t, l, i.bl_count);
}, Ti = (i, e, t) => {
  let s, r = -1, a, o = e[0 * 2 + 1], n = 0, l = 7, f = 4;
  for (o === 0 && (l = 138, f = 3), e[(t + 1) * 2 + 1] = 65535, s = 0; s <= t; s++)
    a = o, o = e[(s + 1) * 2 + 1], !(++n < l && a === o) && (n < f ? i.bl_tree[a * 2] += n : a !== 0 ? (a !== r && i.bl_tree[a * 2]++, i.bl_tree[ws * 2]++) : n <= 10 ? i.bl_tree[Os * 2]++ : i.bl_tree[Bs * 2]++, n = 0, r = a, o === 0 ? (l = 138, f = 3) : a === o ? (l = 6, f = 3) : (l = 7, f = 4));
}, Fi = (i, e, t) => {
  let s, r = -1, a, o = e[0 * 2 + 1], n = 0, l = 7, f = 4;
  for (o === 0 && (l = 138, f = 3), s = 0; s <= t; s++)
    if (a = o, o = e[(s + 1) * 2 + 1], !(++n < l && a === o)) {
      if (n < f)
        do
          K(i, a, i.bl_tree);
        while (--n !== 0);
      else a !== 0 ? (a !== r && (K(i, a, i.bl_tree), n--), K(i, ws, i.bl_tree), G(i, n - 3, 2)) : n <= 10 ? (K(i, Os, i.bl_tree), G(i, n - 3, 3)) : (K(i, Bs, i.bl_tree), G(i, n - 11, 7));
      n = 0, r = a, o === 0 ? (l = 138, f = 3) : a === o ? (l = 6, f = 3) : (l = 7, f = 4);
    }
}, Qr = (i) => {
  let e;
  for (Ti(i, i.dyn_ltree, i.l_desc.max_code), Ti(i, i.dyn_dtree, i.d_desc.max_code), Ue(i, i.bl_desc), e = ai - 1; e >= 3 && i.bl_tree[Ms[e] * 2 + 1] === 0; e--)
    ;
  return i.opt_len += 3 * (e + 1) + 5 + 5 + 4, e;
}, th = (i, e, t, s) => {
  let r;
  for (G(i, e - 257, 5), G(i, t - 1, 5), G(i, s - 4, 4), r = 0; r < s; r++)
    G(i, i.bl_tree[Ms[r] * 2 + 1], 3);
  Fi(i, i.dyn_ltree, e - 1), Fi(i, i.dyn_dtree, t - 1);
}, eh = (i) => {
  let e = 4093624447, t;
  for (t = 0; t <= 31; t++, e >>>= 1)
    if (e & 1 && i.dyn_ltree[t * 2] !== 0)
      return ki;
  if (i.dyn_ltree[9 * 2] !== 0 || i.dyn_ltree[10 * 2] !== 0 || i.dyn_ltree[13 * 2] !== 0)
    return Ii;
  for (t = 32; t < ie; t++)
    if (i.dyn_ltree[t * 2] !== 0)
      return Ii;
  return ki;
};
let wi = !1;
const ih = (i) => {
  wi || (jr(), wi = !0), i.l_desc = new Oe(i.dyn_ltree, ys), i.d_desc = new Oe(i.dyn_dtree, Ls), i.bl_desc = new Oe(i.bl_tree, Ps), i.bi_buf = 0, i.bi_valid = 0, qs(i);
}, Zs = (i, e, t, s) => {
  G(i, (Zr << 1) + (s ? 1 : 0), 3), Hs(i), Jt(i, t), Jt(i, ~t), t && i.pending_buf.set(i.window.subarray(e, e + t), i.pending), i.pending += t;
}, sh = (i) => {
  G(i, Ts << 1, 3), K(i, ni, rt), Kr(i);
}, rh = (i, e, t, s) => {
  let r, a, o = 0;
  i.level > 0 ? (i.strm.data_type === Hr && (i.strm.data_type = eh(i)), Ue(i, i.l_desc), Ue(i, i.d_desc), o = Qr(i), r = i.opt_len + 3 + 7 >>> 3, a = i.static_len + 3 + 7 >>> 3, a <= r && (r = a)) : r = a = t + 5, t + 4 <= r && e !== -1 ? Zs(i, e, t, s) : i.strategy === qr || a === r ? (G(i, (Ts << 1) + (s ? 1 : 0), 3), Ni(i, rt, Xt)) : (G(i, (Xr << 1) + (s ? 1 : 0), 3), th(i, i.l_desc.max_code + 1, i.d_desc.max_code + 1, o + 1), Ni(i, i.dyn_ltree, i.dyn_dtree)), qs(i), s && Hs(i);
}, hh = (i, e, t) => (i.pending_buf[i.sym_buf + i.sym_next++] = e, i.pending_buf[i.sym_buf + i.sym_next++] = e >> 8, i.pending_buf[i.sym_buf + i.sym_next++] = t, e === 0 ? i.dyn_ltree[t * 2]++ : (i.matches++, e--, i.dyn_ltree[(Kt[t] + ie + 1) * 2]++, i.dyn_dtree[Vs(e) * 2]++), i.sym_next === i.sym_end);
var ah = ih, nh = Zs, oh = rh, lh = hh, fh = sh, ch = {
  _tr_init: ah,
  _tr_stored_block: nh,
  _tr_flush_block: oh,
  _tr_tally: lh,
  _tr_align: fh
};
const ph = (i, e, t, s) => {
  let r = i & 65535 | 0, a = i >>> 16 & 65535 | 0, o = 0;
  for (; t !== 0; ) {
    o = t > 2e3 ? 2e3 : t, t -= o;
    do
      r = r + e[s++] | 0, a = a + r | 0;
    while (--o);
    r %= 65521, a %= 65521;
  }
  return r | a << 16 | 0;
};
var jt = ph;
const _h = () => {
  let i, e = [];
  for (var t = 0; t < 256; t++) {
    i = t;
    for (var s = 0; s < 8; s++)
      i = i & 1 ? 3988292384 ^ i >>> 1 : i >>> 1;
    e[t] = i;
  }
  return e;
}, uh = new Uint32Array(_h()), mh = (i, e, t, s) => {
  const r = uh, a = s + t;
  i ^= -1;
  for (let o = s; o < a; o++)
    i = i >>> 8 ^ r[(i ^ e[o]) & 255];
  return i ^ -1;
};
var L = mh, Rt = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, Ae = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const { _tr_init: xh, _tr_stored_block: Ye, _tr_flush_block: dh, _tr_tally: ft, _tr_align: Rh } = ch, {
  Z_NO_FLUSH: ct,
  Z_PARTIAL_FLUSH: gh,
  Z_FULL_FLUSH: bh,
  Z_FINISH: Z,
  Z_BLOCK: Oi,
  Z_OK: P,
  Z_STREAM_END: Bi,
  Z_STREAM_ERROR: j,
  Z_DATA_ERROR: Sh,
  Z_BUF_ERROR: Me,
  Z_DEFAULT_COMPRESSION: Ah,
  Z_FILTERED: Ch,
  Z_HUFFMAN_ONLY: he,
  Z_RLE: Eh,
  Z_FIXED: kh,
  Z_DEFAULT_STRATEGY: Ih,
  Z_UNKNOWN: Dh,
  Z_DEFLATED: Ce
} = Ae, Nh = 9, Th = 15, Fh = 8, wh = 29, Oh = 256, We = Oh + 1 + wh, Bh = 30, Mh = 19, yh = 2 * We + 1, Lh = 15, D = 3, lt = 258, Q = lt + D + 1, Ph = 32, wt = 42, li = 57, $e = 69, Ke = 73, Je = 91, je = 103, xt = 113, Gt = 666, v = 1, Lt = 2, gt = 3, Pt = 4, Vh = 3, dt = (i, e) => (i.msg = Rt[e], e), Mi = (i) => i * 2 - (i > 4 ? 9 : 0), ot = (i) => {
  let e = i.length;
  for (; --e >= 0; )
    i[e] = 0;
}, vh = (i) => {
  let e, t, s, r = i.w_size;
  e = i.hash_size, s = e;
  do
    t = i.head[--s], i.head[s] = t >= r ? t - r : 0;
  while (--e);
  e = r, s = e;
  do
    t = i.prev[--s], i.prev[s] = t >= r ? t - r : 0;
  while (--e);
};
let Gh = (i, e, t) => (e << i.hash_shift ^ t) & i.hash_mask, pt = Gh;
const q = (i) => {
  const e = i.state;
  let t = e.pending;
  t > i.avail_out && (t = i.avail_out), t !== 0 && (i.output.set(e.pending_buf.subarray(e.pending_out, e.pending_out + t), i.next_out), i.next_out += t, e.pending_out += t, i.total_out += t, i.avail_out -= t, e.pending -= t, e.pending === 0 && (e.pending_out = 0));
}, H = (i, e) => {
  dh(i, i.block_start >= 0 ? i.block_start : -1, i.strstart - i.block_start, e), i.block_start = i.strstart, q(i.strm);
}, T = (i, e) => {
  i.pending_buf[i.pending++] = e;
}, vt = (i, e) => {
  i.pending_buf[i.pending++] = e >>> 8 & 255, i.pending_buf[i.pending++] = e & 255;
}, Qe = (i, e, t, s) => {
  let r = i.avail_in;
  return r > s && (r = s), r === 0 ? 0 : (i.avail_in -= r, e.set(i.input.subarray(i.next_in, i.next_in + r), t), i.state.wrap === 1 ? i.adler = jt(i.adler, e, r, t) : i.state.wrap === 2 && (i.adler = L(i.adler, e, r, t)), i.next_in += r, i.total_in += r, r);
}, Xs = (i, e) => {
  let t = i.max_chain_length, s = i.strstart, r, a, o = i.prev_length, n = i.nice_match;
  const l = i.strstart > i.w_size - Q ? i.strstart - (i.w_size - Q) : 0, f = i.window, c = i.w_mask, d = i.prev, _ = i.strstart + lt;
  let p = f[s + o - 1], m = f[s + o];
  i.prev_length >= i.good_match && (t >>= 2), n > i.lookahead && (n = i.lookahead);
  do
    if (r = e, !(f[r + o] !== m || f[r + o - 1] !== p || f[r] !== f[s] || f[++r] !== f[s + 1])) {
      s += 2, r++;
      do
        ;
      while (f[++s] === f[++r] && f[++s] === f[++r] && f[++s] === f[++r] && f[++s] === f[++r] && f[++s] === f[++r] && f[++s] === f[++r] && f[++s] === f[++r] && f[++s] === f[++r] && s < _);
      if (a = lt - (_ - s), s = _ - lt, a > o) {
        if (i.match_start = e, o = a, a >= n)
          break;
        p = f[s + o - 1], m = f[s + o];
      }
    }
  while ((e = d[e & c]) > l && --t !== 0);
  return o <= i.lookahead ? o : i.lookahead;
}, Ot = (i) => {
  const e = i.w_size;
  let t, s, r;
  do {
    if (s = i.window_size - i.lookahead - i.strstart, i.strstart >= e + (e - Q) && (i.window.set(i.window.subarray(e, e + e - s), 0), i.match_start -= e, i.strstart -= e, i.block_start -= e, i.insert > i.strstart && (i.insert = i.strstart), vh(i), s += e), i.strm.avail_in === 0)
      break;
    if (t = Qe(i.strm, i.window, i.strstart + i.lookahead, s), i.lookahead += t, i.lookahead + i.insert >= D)
      for (r = i.strstart - i.insert, i.ins_h = i.window[r], i.ins_h = pt(i, i.ins_h, i.window[r + 1]); i.insert && (i.ins_h = pt(i, i.ins_h, i.window[r + D - 1]), i.prev[r & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = r, r++, i.insert--, !(i.lookahead + i.insert < D)); )
        ;
  } while (i.lookahead < Q && i.strm.avail_in !== 0);
}, zs = (i, e) => {
  let t = i.pending_buf_size - 5 > i.w_size ? i.w_size : i.pending_buf_size - 5, s, r, a, o = 0, n = i.strm.avail_in;
  do {
    if (s = 65535, a = i.bi_valid + 42 >> 3, i.strm.avail_out < a || (a = i.strm.avail_out - a, r = i.strstart - i.block_start, s > r + i.strm.avail_in && (s = r + i.strm.avail_in), s > a && (s = a), s < t && (s === 0 && e !== Z || e === ct || s !== r + i.strm.avail_in)))
      break;
    o = e === Z && s === r + i.strm.avail_in ? 1 : 0, Ye(i, 0, 0, o), i.pending_buf[i.pending - 4] = s, i.pending_buf[i.pending - 3] = s >> 8, i.pending_buf[i.pending - 2] = ~s, i.pending_buf[i.pending - 1] = ~s >> 8, q(i.strm), r && (r > s && (r = s), i.strm.output.set(i.window.subarray(i.block_start, i.block_start + r), i.strm.next_out), i.strm.next_out += r, i.strm.avail_out -= r, i.strm.total_out += r, i.block_start += r, s -= r), s && (Qe(i.strm, i.strm.output, i.strm.next_out, s), i.strm.next_out += s, i.strm.avail_out -= s, i.strm.total_out += s);
  } while (o === 0);
  return n -= i.strm.avail_in, n && (n >= i.w_size ? (i.matches = 2, i.window.set(i.strm.input.subarray(i.strm.next_in - i.w_size, i.strm.next_in), 0), i.strstart = i.w_size, i.insert = i.strstart) : (i.window_size - i.strstart <= n && (i.strstart -= i.w_size, i.window.set(i.window.subarray(i.w_size, i.w_size + i.strstart), 0), i.matches < 2 && i.matches++, i.insert > i.strstart && (i.insert = i.strstart)), i.window.set(i.strm.input.subarray(i.strm.next_in - n, i.strm.next_in), i.strstart), i.strstart += n, i.insert += n > i.w_size - i.insert ? i.w_size - i.insert : n), i.block_start = i.strstart), i.high_water < i.strstart && (i.high_water = i.strstart), o ? Pt : e !== ct && e !== Z && i.strm.avail_in === 0 && i.strstart === i.block_start ? Lt : (a = i.window_size - i.strstart, i.strm.avail_in > a && i.block_start >= i.w_size && (i.block_start -= i.w_size, i.strstart -= i.w_size, i.window.set(i.window.subarray(i.w_size, i.w_size + i.strstart), 0), i.matches < 2 && i.matches++, a += i.w_size, i.insert > i.strstart && (i.insert = i.strstart)), a > i.strm.avail_in && (a = i.strm.avail_in), a && (Qe(i.strm, i.window, i.strstart, a), i.strstart += a, i.insert += a > i.w_size - i.insert ? i.w_size - i.insert : a), i.high_water < i.strstart && (i.high_water = i.strstart), a = i.bi_valid + 42 >> 3, a = i.pending_buf_size - a > 65535 ? 65535 : i.pending_buf_size - a, t = a > i.w_size ? i.w_size : a, r = i.strstart - i.block_start, (r >= t || (r || e === Z) && e !== ct && i.strm.avail_in === 0 && r <= a) && (s = r > a ? a : r, o = e === Z && i.strm.avail_in === 0 && s === r ? 1 : 0, Ye(i, i.block_start, s, o), i.block_start += s, q(i.strm)), o ? gt : v);
}, ye = (i, e) => {
  let t, s;
  for (; ; ) {
    if (i.lookahead < Q) {
      if (Ot(i), i.lookahead < Q && e === ct)
        return v;
      if (i.lookahead === 0)
        break;
    }
    if (t = 0, i.lookahead >= D && (i.ins_h = pt(i, i.ins_h, i.window[i.strstart + D - 1]), t = i.prev[i.strstart & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = i.strstart), t !== 0 && i.strstart - t <= i.w_size - Q && (i.match_length = Xs(i, t)), i.match_length >= D)
      if (s = ft(i, i.strstart - i.match_start, i.match_length - D), i.lookahead -= i.match_length, i.match_length <= i.max_lazy_match && i.lookahead >= D) {
        i.match_length--;
        do
          i.strstart++, i.ins_h = pt(i, i.ins_h, i.window[i.strstart + D - 1]), t = i.prev[i.strstart & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = i.strstart;
        while (--i.match_length !== 0);
        i.strstart++;
      } else
        i.strstart += i.match_length, i.match_length = 0, i.ins_h = i.window[i.strstart], i.ins_h = pt(i, i.ins_h, i.window[i.strstart + 1]);
    else
      s = ft(i, 0, i.window[i.strstart]), i.lookahead--, i.strstart++;
    if (s && (H(i, !1), i.strm.avail_out === 0))
      return v;
  }
  return i.insert = i.strstart < D - 1 ? i.strstart : D - 1, e === Z ? (H(i, !0), i.strm.avail_out === 0 ? gt : Pt) : i.sym_next && (H(i, !1), i.strm.avail_out === 0) ? v : Lt;
}, kt = (i, e) => {
  let t, s, r;
  for (; ; ) {
    if (i.lookahead < Q) {
      if (Ot(i), i.lookahead < Q && e === ct)
        return v;
      if (i.lookahead === 0)
        break;
    }
    if (t = 0, i.lookahead >= D && (i.ins_h = pt(i, i.ins_h, i.window[i.strstart + D - 1]), t = i.prev[i.strstart & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = i.strstart), i.prev_length = i.match_length, i.prev_match = i.match_start, i.match_length = D - 1, t !== 0 && i.prev_length < i.max_lazy_match && i.strstart - t <= i.w_size - Q && (i.match_length = Xs(i, t), i.match_length <= 5 && (i.strategy === Ch || i.match_length === D && i.strstart - i.match_start > 4096) && (i.match_length = D - 1)), i.prev_length >= D && i.match_length <= i.prev_length) {
      r = i.strstart + i.lookahead - D, s = ft(i, i.strstart - 1 - i.prev_match, i.prev_length - D), i.lookahead -= i.prev_length - 1, i.prev_length -= 2;
      do
        ++i.strstart <= r && (i.ins_h = pt(i, i.ins_h, i.window[i.strstart + D - 1]), t = i.prev[i.strstart & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = i.strstart);
      while (--i.prev_length !== 0);
      if (i.match_available = 0, i.match_length = D - 1, i.strstart++, s && (H(i, !1), i.strm.avail_out === 0))
        return v;
    } else if (i.match_available) {
      if (s = ft(i, 0, i.window[i.strstart - 1]), s && H(i, !1), i.strstart++, i.lookahead--, i.strm.avail_out === 0)
        return v;
    } else
      i.match_available = 1, i.strstart++, i.lookahead--;
  }
  return i.match_available && (s = ft(i, 0, i.window[i.strstart - 1]), i.match_available = 0), i.insert = i.strstart < D - 1 ? i.strstart : D - 1, e === Z ? (H(i, !0), i.strm.avail_out === 0 ? gt : Pt) : i.sym_next && (H(i, !1), i.strm.avail_out === 0) ? v : Lt;
}, qh = (i, e) => {
  let t, s, r, a;
  const o = i.window;
  for (; ; ) {
    if (i.lookahead <= lt) {
      if (Ot(i), i.lookahead <= lt && e === ct)
        return v;
      if (i.lookahead === 0)
        break;
    }
    if (i.match_length = 0, i.lookahead >= D && i.strstart > 0 && (r = i.strstart - 1, s = o[r], s === o[++r] && s === o[++r] && s === o[++r])) {
      a = i.strstart + lt;
      do
        ;
      while (s === o[++r] && s === o[++r] && s === o[++r] && s === o[++r] && s === o[++r] && s === o[++r] && s === o[++r] && s === o[++r] && r < a);
      i.match_length = lt - (a - r), i.match_length > i.lookahead && (i.match_length = i.lookahead);
    }
    if (i.match_length >= D ? (t = ft(i, 1, i.match_length - D), i.lookahead -= i.match_length, i.strstart += i.match_length, i.match_length = 0) : (t = ft(i, 0, i.window[i.strstart]), i.lookahead--, i.strstart++), t && (H(i, !1), i.strm.avail_out === 0))
      return v;
  }
  return i.insert = 0, e === Z ? (H(i, !0), i.strm.avail_out === 0 ? gt : Pt) : i.sym_next && (H(i, !1), i.strm.avail_out === 0) ? v : Lt;
}, Hh = (i, e) => {
  let t;
  for (; ; ) {
    if (i.lookahead === 0 && (Ot(i), i.lookahead === 0)) {
      if (e === ct)
        return v;
      break;
    }
    if (i.match_length = 0, t = ft(i, 0, i.window[i.strstart]), i.lookahead--, i.strstart++, t && (H(i, !1), i.strm.avail_out === 0))
      return v;
  }
  return i.insert = 0, e === Z ? (H(i, !0), i.strm.avail_out === 0 ? gt : Pt) : i.sym_next && (H(i, !1), i.strm.avail_out === 0) ? v : Lt;
};
function W(i, e, t, s, r) {
  this.good_length = i, this.max_lazy = e, this.nice_length = t, this.max_chain = s, this.func = r;
}
const qt = [
  /*      good lazy nice chain */
  new W(0, 0, 0, 0, zs),
  /* 0 store only */
  new W(4, 4, 8, 4, ye),
  /* 1 max speed, no lazy matches */
  new W(4, 5, 16, 8, ye),
  /* 2 */
  new W(4, 6, 32, 32, ye),
  /* 3 */
  new W(4, 4, 16, 16, kt),
  /* 4 lazy matches */
  new W(8, 16, 32, 32, kt),
  /* 5 */
  new W(8, 16, 128, 128, kt),
  /* 6 */
  new W(8, 32, 128, 256, kt),
  /* 7 */
  new W(32, 128, 258, 1024, kt),
  /* 8 */
  new W(32, 258, 258, 4096, kt)
  /* 9 max compression */
], Zh = (i) => {
  i.window_size = 2 * i.w_size, ot(i.head), i.max_lazy_match = qt[i.level].max_lazy, i.good_match = qt[i.level].good_length, i.nice_match = qt[i.level].nice_length, i.max_chain_length = qt[i.level].max_chain, i.strstart = 0, i.block_start = 0, i.lookahead = 0, i.insert = 0, i.match_length = i.prev_length = D - 1, i.match_available = 0, i.ins_h = 0;
};
function Xh() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Ce, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(yh * 2), this.dyn_dtree = new Uint16Array((2 * Bh + 1) * 2), this.bl_tree = new Uint16Array((2 * Mh + 1) * 2), ot(this.dyn_ltree), ot(this.dyn_dtree), ot(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(Lh + 1), this.heap = new Uint16Array(2 * We + 1), ot(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * We + 1), ot(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
const se = (i) => {
  if (!i)
    return 1;
  const e = i.state;
  return !e || e.strm !== i || e.status !== wt && //#ifdef GZIP
  e.status !== li && //#endif
  e.status !== $e && e.status !== Ke && e.status !== Je && e.status !== je && e.status !== xt && e.status !== Gt ? 1 : 0;
}, Us = (i) => {
  if (se(i))
    return dt(i, j);
  i.total_in = i.total_out = 0, i.data_type = Dh;
  const e = i.state;
  return e.pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = //#ifdef GZIP
  e.wrap === 2 ? li : (
    //#endif
    e.wrap ? wt : xt
  ), i.adler = e.wrap === 2 ? 0 : 1, e.last_flush = -2, xh(e), P;
}, Ys = (i) => {
  const e = Us(i);
  return e === P && Zh(i.state), e;
}, zh = (i, e) => se(i) || i.state.wrap !== 2 ? j : (i.state.gzhead = e, P), Ws = (i, e, t, s, r, a) => {
  if (!i)
    return j;
  let o = 1;
  if (e === Ah && (e = 6), s < 0 ? (o = 0, s = -s) : s > 15 && (o = 2, s -= 16), r < 1 || r > Nh || t !== Ce || s < 8 || s > 15 || e < 0 || e > 9 || a < 0 || a > kh || s === 8 && o !== 1)
    return dt(i, j);
  s === 8 && (s = 9);
  const n = new Xh();
  return i.state = n, n.strm = i, n.status = wt, n.wrap = o, n.gzhead = null, n.w_bits = s, n.w_size = 1 << n.w_bits, n.w_mask = n.w_size - 1, n.hash_bits = r + 7, n.hash_size = 1 << n.hash_bits, n.hash_mask = n.hash_size - 1, n.hash_shift = ~~((n.hash_bits + D - 1) / D), n.window = new Uint8Array(n.w_size * 2), n.head = new Uint16Array(n.hash_size), n.prev = new Uint16Array(n.w_size), n.lit_bufsize = 1 << r + 6, n.pending_buf_size = n.lit_bufsize * 4, n.pending_buf = new Uint8Array(n.pending_buf_size), n.sym_buf = n.lit_bufsize, n.sym_end = (n.lit_bufsize - 1) * 3, n.level = e, n.strategy = a, n.method = t, Ys(i);
}, Uh = (i, e) => Ws(i, e, Ce, Th, Fh, Ih), Yh = (i, e) => {
  if (se(i) || e > Oi || e < 0)
    return i ? dt(i, j) : j;
  const t = i.state;
  if (!i.output || i.avail_in !== 0 && !i.input || t.status === Gt && e !== Z)
    return dt(i, i.avail_out === 0 ? Me : j);
  const s = t.last_flush;
  if (t.last_flush = e, t.pending !== 0) {
    if (q(i), i.avail_out === 0)
      return t.last_flush = -1, P;
  } else if (i.avail_in === 0 && Mi(e) <= Mi(s) && e !== Z)
    return dt(i, Me);
  if (t.status === Gt && i.avail_in !== 0)
    return dt(i, Me);
  if (t.status === wt && t.wrap === 0 && (t.status = xt), t.status === wt) {
    let r = Ce + (t.w_bits - 8 << 4) << 8, a = -1;
    if (t.strategy >= he || t.level < 2 ? a = 0 : t.level < 6 ? a = 1 : t.level === 6 ? a = 2 : a = 3, r |= a << 6, t.strstart !== 0 && (r |= Ph), r += 31 - r % 31, vt(t, r), t.strstart !== 0 && (vt(t, i.adler >>> 16), vt(t, i.adler & 65535)), i.adler = 1, t.status = xt, q(i), t.pending !== 0)
      return t.last_flush = -1, P;
  }
  if (t.status === li) {
    if (i.adler = 0, T(t, 31), T(t, 139), T(t, 8), t.gzhead)
      T(
        t,
        (t.gzhead.text ? 1 : 0) + (t.gzhead.hcrc ? 2 : 0) + (t.gzhead.extra ? 4 : 0) + (t.gzhead.name ? 8 : 0) + (t.gzhead.comment ? 16 : 0)
      ), T(t, t.gzhead.time & 255), T(t, t.gzhead.time >> 8 & 255), T(t, t.gzhead.time >> 16 & 255), T(t, t.gzhead.time >> 24 & 255), T(t, t.level === 9 ? 2 : t.strategy >= he || t.level < 2 ? 4 : 0), T(t, t.gzhead.os & 255), t.gzhead.extra && t.gzhead.extra.length && (T(t, t.gzhead.extra.length & 255), T(t, t.gzhead.extra.length >> 8 & 255)), t.gzhead.hcrc && (i.adler = L(i.adler, t.pending_buf, t.pending, 0)), t.gzindex = 0, t.status = $e;
    else if (T(t, 0), T(t, 0), T(t, 0), T(t, 0), T(t, 0), T(t, t.level === 9 ? 2 : t.strategy >= he || t.level < 2 ? 4 : 0), T(t, Vh), t.status = xt, q(i), t.pending !== 0)
      return t.last_flush = -1, P;
  }
  if (t.status === $e) {
    if (t.gzhead.extra) {
      let r = t.pending, a = (t.gzhead.extra.length & 65535) - t.gzindex;
      for (; t.pending + a > t.pending_buf_size; ) {
        let n = t.pending_buf_size - t.pending;
        if (t.pending_buf.set(t.gzhead.extra.subarray(t.gzindex, t.gzindex + n), t.pending), t.pending = t.pending_buf_size, t.gzhead.hcrc && t.pending > r && (i.adler = L(i.adler, t.pending_buf, t.pending - r, r)), t.gzindex += n, q(i), t.pending !== 0)
          return t.last_flush = -1, P;
        r = 0, a -= n;
      }
      let o = new Uint8Array(t.gzhead.extra);
      t.pending_buf.set(o.subarray(t.gzindex, t.gzindex + a), t.pending), t.pending += a, t.gzhead.hcrc && t.pending > r && (i.adler = L(i.adler, t.pending_buf, t.pending - r, r)), t.gzindex = 0;
    }
    t.status = Ke;
  }
  if (t.status === Ke) {
    if (t.gzhead.name) {
      let r = t.pending, a;
      do {
        if (t.pending === t.pending_buf_size) {
          if (t.gzhead.hcrc && t.pending > r && (i.adler = L(i.adler, t.pending_buf, t.pending - r, r)), q(i), t.pending !== 0)
            return t.last_flush = -1, P;
          r = 0;
        }
        t.gzindex < t.gzhead.name.length ? a = t.gzhead.name.charCodeAt(t.gzindex++) & 255 : a = 0, T(t, a);
      } while (a !== 0);
      t.gzhead.hcrc && t.pending > r && (i.adler = L(i.adler, t.pending_buf, t.pending - r, r)), t.gzindex = 0;
    }
    t.status = Je;
  }
  if (t.status === Je) {
    if (t.gzhead.comment) {
      let r = t.pending, a;
      do {
        if (t.pending === t.pending_buf_size) {
          if (t.gzhead.hcrc && t.pending > r && (i.adler = L(i.adler, t.pending_buf, t.pending - r, r)), q(i), t.pending !== 0)
            return t.last_flush = -1, P;
          r = 0;
        }
        t.gzindex < t.gzhead.comment.length ? a = t.gzhead.comment.charCodeAt(t.gzindex++) & 255 : a = 0, T(t, a);
      } while (a !== 0);
      t.gzhead.hcrc && t.pending > r && (i.adler = L(i.adler, t.pending_buf, t.pending - r, r));
    }
    t.status = je;
  }
  if (t.status === je) {
    if (t.gzhead.hcrc) {
      if (t.pending + 2 > t.pending_buf_size && (q(i), t.pending !== 0))
        return t.last_flush = -1, P;
      T(t, i.adler & 255), T(t, i.adler >> 8 & 255), i.adler = 0;
    }
    if (t.status = xt, q(i), t.pending !== 0)
      return t.last_flush = -1, P;
  }
  if (i.avail_in !== 0 || t.lookahead !== 0 || e !== ct && t.status !== Gt) {
    let r = t.level === 0 ? zs(t, e) : t.strategy === he ? Hh(t, e) : t.strategy === Eh ? qh(t, e) : qt[t.level].func(t, e);
    if ((r === gt || r === Pt) && (t.status = Gt), r === v || r === gt)
      return i.avail_out === 0 && (t.last_flush = -1), P;
    if (r === Lt && (e === gh ? Rh(t) : e !== Oi && (Ye(t, 0, 0, !1), e === bh && (ot(t.head), t.lookahead === 0 && (t.strstart = 0, t.block_start = 0, t.insert = 0))), q(i), i.avail_out === 0))
      return t.last_flush = -1, P;
  }
  return e !== Z ? P : t.wrap <= 0 ? Bi : (t.wrap === 2 ? (T(t, i.adler & 255), T(t, i.adler >> 8 & 255), T(t, i.adler >> 16 & 255), T(t, i.adler >> 24 & 255), T(t, i.total_in & 255), T(t, i.total_in >> 8 & 255), T(t, i.total_in >> 16 & 255), T(t, i.total_in >> 24 & 255)) : (vt(t, i.adler >>> 16), vt(t, i.adler & 65535)), q(i), t.wrap > 0 && (t.wrap = -t.wrap), t.pending !== 0 ? P : Bi);
}, Wh = (i) => {
  if (se(i))
    return j;
  const e = i.state.status;
  return i.state = null, e === xt ? dt(i, Sh) : P;
}, $h = (i, e) => {
  let t = e.length;
  if (se(i))
    return j;
  const s = i.state, r = s.wrap;
  if (r === 2 || r === 1 && s.status !== wt || s.lookahead)
    return j;
  if (r === 1 && (i.adler = jt(i.adler, e, t, 0)), s.wrap = 0, t >= s.w_size) {
    r === 0 && (ot(s.head), s.strstart = 0, s.block_start = 0, s.insert = 0);
    let l = new Uint8Array(s.w_size);
    l.set(e.subarray(t - s.w_size, t), 0), e = l, t = s.w_size;
  }
  const a = i.avail_in, o = i.next_in, n = i.input;
  for (i.avail_in = t, i.next_in = 0, i.input = e, Ot(s); s.lookahead >= D; ) {
    let l = s.strstart, f = s.lookahead - (D - 1);
    do
      s.ins_h = pt(s, s.ins_h, s.window[l + D - 1]), s.prev[l & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = l, l++;
    while (--f);
    s.strstart = l, s.lookahead = D - 1, Ot(s);
  }
  return s.strstart += s.lookahead, s.block_start = s.strstart, s.insert = s.lookahead, s.lookahead = 0, s.match_length = s.prev_length = D - 1, s.match_available = 0, i.next_in = o, i.input = n, i.avail_in = a, s.wrap = r, P;
};
var Kh = Uh, Jh = Ws, jh = Ys, Qh = Us, ta = zh, ea = Yh, ia = Wh, sa = $h, ra = "pako deflate (from Nodeca project)", zt = {
  deflateInit: Kh,
  deflateInit2: Jh,
  deflateReset: jh,
  deflateResetKeep: Qh,
  deflateSetHeader: ta,
  deflate: ea,
  deflateEnd: ia,
  deflateSetDictionary: sa,
  deflateInfo: ra
};
const ha = (i, e) => Object.prototype.hasOwnProperty.call(i, e);
var aa = function(i) {
  const e = Array.prototype.slice.call(arguments, 1);
  for (; e.length; ) {
    const t = e.shift();
    if (t) {
      if (typeof t != "object")
        throw new TypeError(t + "must be non-object");
      for (const s in t)
        ha(t, s) && (i[s] = t[s]);
    }
  }
  return i;
}, na = (i) => {
  let e = 0;
  for (let s = 0, r = i.length; s < r; s++)
    e += i[s].length;
  const t = new Uint8Array(e);
  for (let s = 0, r = 0, a = i.length; s < a; s++) {
    let o = i[s];
    t.set(o, r), r += o.length;
  }
  return t;
}, Ee = {
  assign: aa,
  flattenChunks: na
};
let $s = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  $s = !1;
}
const Qt = new Uint8Array(256);
for (let i = 0; i < 256; i++)
  Qt[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
Qt[254] = Qt[254] = 1;
var oa = (i) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(i);
  let e, t, s, r, a, o = i.length, n = 0;
  for (r = 0; r < o; r++)
    t = i.charCodeAt(r), (t & 64512) === 55296 && r + 1 < o && (s = i.charCodeAt(r + 1), (s & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (s - 56320), r++)), n += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
  for (e = new Uint8Array(n), a = 0, r = 0; a < n; r++)
    t = i.charCodeAt(r), (t & 64512) === 55296 && r + 1 < o && (s = i.charCodeAt(r + 1), (s & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (s - 56320), r++)), t < 128 ? e[a++] = t : t < 2048 ? (e[a++] = 192 | t >>> 6, e[a++] = 128 | t & 63) : t < 65536 ? (e[a++] = 224 | t >>> 12, e[a++] = 128 | t >>> 6 & 63, e[a++] = 128 | t & 63) : (e[a++] = 240 | t >>> 18, e[a++] = 128 | t >>> 12 & 63, e[a++] = 128 | t >>> 6 & 63, e[a++] = 128 | t & 63);
  return e;
};
const la = (i, e) => {
  if (e < 65534 && i.subarray && $s)
    return String.fromCharCode.apply(null, i.length === e ? i : i.subarray(0, e));
  let t = "";
  for (let s = 0; s < e; s++)
    t += String.fromCharCode(i[s]);
  return t;
};
var fa = (i, e) => {
  const t = e || i.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(i.subarray(0, e));
  let s, r;
  const a = new Array(t * 2);
  for (r = 0, s = 0; s < t; ) {
    let o = i[s++];
    if (o < 128) {
      a[r++] = o;
      continue;
    }
    let n = Qt[o];
    if (n > 4) {
      a[r++] = 65533, s += n - 1;
      continue;
    }
    for (o &= n === 2 ? 31 : n === 3 ? 15 : 7; n > 1 && s < t; )
      o = o << 6 | i[s++] & 63, n--;
    if (n > 1) {
      a[r++] = 65533;
      continue;
    }
    o < 65536 ? a[r++] = o : (o -= 65536, a[r++] = 55296 | o >> 10 & 1023, a[r++] = 56320 | o & 1023);
  }
  return la(a, r);
}, ca = (i, e) => {
  e = e || i.length, e > i.length && (e = i.length);
  let t = e - 1;
  for (; t >= 0 && (i[t] & 192) === 128; )
    t--;
  return t < 0 || t === 0 ? e : t + Qt[i[t]] > e ? t : e;
}, te = {
  string2buf: oa,
  buf2string: fa,
  utf8border: ca
};
function pa() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var Ks = pa;
const Js = Object.prototype.toString, {
  Z_NO_FLUSH: _a,
  Z_SYNC_FLUSH: ua,
  Z_FULL_FLUSH: ma,
  Z_FINISH: xa,
  Z_OK: ge,
  Z_STREAM_END: da,
  Z_DEFAULT_COMPRESSION: Ra,
  Z_DEFAULT_STRATEGY: ga,
  Z_DEFLATED: ba
} = Ae;
function ke(i) {
  this.options = Ee.assign({
    level: Ra,
    method: ba,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: ga
  }, i || {});
  let e = this.options;
  e.raw && e.windowBits > 0 ? e.windowBits = -e.windowBits : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Ks(), this.strm.avail_out = 0;
  let t = zt.deflateInit2(
    this.strm,
    e.level,
    e.method,
    e.windowBits,
    e.memLevel,
    e.strategy
  );
  if (t !== ge)
    throw new Error(Rt[t]);
  if (e.header && zt.deflateSetHeader(this.strm, e.header), e.dictionary) {
    let s;
    if (typeof e.dictionary == "string" ? s = te.string2buf(e.dictionary) : Js.call(e.dictionary) === "[object ArrayBuffer]" ? s = new Uint8Array(e.dictionary) : s = e.dictionary, t = zt.deflateSetDictionary(this.strm, s), t !== ge)
      throw new Error(Rt[t]);
    this._dict_set = !0;
  }
}
ke.prototype.push = function(i, e) {
  const t = this.strm, s = this.options.chunkSize;
  let r, a;
  if (this.ended)
    return !1;
  for (e === ~~e ? a = e : a = e === !0 ? xa : _a, typeof i == "string" ? t.input = te.string2buf(i) : Js.call(i) === "[object ArrayBuffer]" ? t.input = new Uint8Array(i) : t.input = i, t.next_in = 0, t.avail_in = t.input.length; ; ) {
    if (t.avail_out === 0 && (t.output = new Uint8Array(s), t.next_out = 0, t.avail_out = s), (a === ua || a === ma) && t.avail_out <= 6) {
      this.onData(t.output.subarray(0, t.next_out)), t.avail_out = 0;
      continue;
    }
    if (r = zt.deflate(t, a), r === da)
      return t.next_out > 0 && this.onData(t.output.subarray(0, t.next_out)), r = zt.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === ge;
    if (t.avail_out === 0) {
      this.onData(t.output);
      continue;
    }
    if (a > 0 && t.next_out > 0) {
      this.onData(t.output.subarray(0, t.next_out)), t.avail_out = 0;
      continue;
    }
    if (t.avail_in === 0) break;
  }
  return !0;
};
ke.prototype.onData = function(i) {
  this.chunks.push(i);
};
ke.prototype.onEnd = function(i) {
  i === ge && (this.result = Ee.flattenChunks(this.chunks)), this.chunks = [], this.err = i, this.msg = this.strm.msg;
};
function Sa(i, e) {
  const t = new ke(e);
  if (t.push(i, !0), t.err)
    throw t.msg || Rt[t.err];
  return t.result;
}
function Aa(i, e) {
  return e = e || {}, e.gzip = !0, Sa(i, e);
}
var Ca = Aa, Ea = {
  gzip: Ca
};
const ae = 16209, ka = 16191;
var Ia = function(e, t) {
  let s, r, a, o, n, l, f, c, d, _, p, m, k, A, R, C, S, u, N, y, g, F, I, b;
  const E = e.state;
  s = e.next_in, I = e.input, r = s + (e.avail_in - 5), a = e.next_out, b = e.output, o = a - (t - e.avail_out), n = a + (e.avail_out - 257), l = E.dmax, f = E.wsize, c = E.whave, d = E.wnext, _ = E.window, p = E.hold, m = E.bits, k = E.lencode, A = E.distcode, R = (1 << E.lenbits) - 1, C = (1 << E.distbits) - 1;
  t:
    do {
      m < 15 && (p += I[s++] << m, m += 8, p += I[s++] << m, m += 8), S = k[p & R];
      e:
        for (; ; ) {
          if (u = S >>> 24, p >>>= u, m -= u, u = S >>> 16 & 255, u === 0)
            b[a++] = S & 65535;
          else if (u & 16) {
            N = S & 65535, u &= 15, u && (m < u && (p += I[s++] << m, m += 8), N += p & (1 << u) - 1, p >>>= u, m -= u), m < 15 && (p += I[s++] << m, m += 8, p += I[s++] << m, m += 8), S = A[p & C];
            i:
              for (; ; ) {
                if (u = S >>> 24, p >>>= u, m -= u, u = S >>> 16 & 255, u & 16) {
                  if (y = S & 65535, u &= 15, m < u && (p += I[s++] << m, m += 8, m < u && (p += I[s++] << m, m += 8)), y += p & (1 << u) - 1, y > l) {
                    e.msg = "invalid distance too far back", E.mode = ae;
                    break t;
                  }
                  if (p >>>= u, m -= u, u = a - o, y > u) {
                    if (u = y - u, u > c && E.sane) {
                      e.msg = "invalid distance too far back", E.mode = ae;
                      break t;
                    }
                    if (g = 0, F = _, d === 0) {
                      if (g += f - u, u < N) {
                        N -= u;
                        do
                          b[a++] = _[g++];
                        while (--u);
                        g = a - y, F = b;
                      }
                    } else if (d < u) {
                      if (g += f + d - u, u -= d, u < N) {
                        N -= u;
                        do
                          b[a++] = _[g++];
                        while (--u);
                        if (g = 0, d < N) {
                          u = d, N -= u;
                          do
                            b[a++] = _[g++];
                          while (--u);
                          g = a - y, F = b;
                        }
                      }
                    } else if (g += d - u, u < N) {
                      N -= u;
                      do
                        b[a++] = _[g++];
                      while (--u);
                      g = a - y, F = b;
                    }
                    for (; N > 2; )
                      b[a++] = F[g++], b[a++] = F[g++], b[a++] = F[g++], N -= 3;
                    N && (b[a++] = F[g++], N > 1 && (b[a++] = F[g++]));
                  } else {
                    g = a - y;
                    do
                      b[a++] = b[g++], b[a++] = b[g++], b[a++] = b[g++], N -= 3;
                    while (N > 2);
                    N && (b[a++] = b[g++], N > 1 && (b[a++] = b[g++]));
                  }
                } else if ((u & 64) === 0) {
                  S = A[(S & 65535) + (p & (1 << u) - 1)];
                  continue i;
                } else {
                  e.msg = "invalid distance code", E.mode = ae;
                  break t;
                }
                break;
              }
          } else if ((u & 64) === 0) {
            S = k[(S & 65535) + (p & (1 << u) - 1)];
            continue e;
          } else if (u & 32) {
            E.mode = ka;
            break t;
          } else {
            e.msg = "invalid literal/length code", E.mode = ae;
            break t;
          }
          break;
        }
    } while (s < r && a < n);
  N = m >> 3, s -= N, m -= N << 3, p &= (1 << m) - 1, e.next_in = s, e.next_out = a, e.avail_in = s < r ? 5 + (r - s) : 5 - (s - r), e.avail_out = a < n ? 257 + (n - a) : 257 - (a - n), E.hold = p, E.bits = m;
};
const It = 15, yi = 852, Li = 592, Pi = 0, Le = 1, Vi = 2, Da = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), Na = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]), Ta = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), Fa = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), wa = (i, e, t, s, r, a, o, n) => {
  const l = n.bits;
  let f = 0, c = 0, d = 0, _ = 0, p = 0, m = 0, k = 0, A = 0, R = 0, C = 0, S, u, N, y, g, F = null, I;
  const b = new Uint16Array(It + 1), E = new Uint16Array(It + 1);
  let tt = null, re, Et, at;
  for (f = 0; f <= It; f++)
    b[f] = 0;
  for (c = 0; c < s; c++)
    b[e[t + c]]++;
  for (p = l, _ = It; _ >= 1 && b[_] === 0; _--)
    ;
  if (p > _ && (p = _), _ === 0)
    return r[a++] = 1 << 24 | 64 << 16 | 0, r[a++] = 1 << 24 | 64 << 16 | 0, n.bits = 1, 0;
  for (d = 1; d < _ && b[d] === 0; d++)
    ;
  for (p < d && (p = d), A = 1, f = 1; f <= It; f++)
    if (A <<= 1, A -= b[f], A < 0)
      return -1;
  if (A > 0 && (i === Pi || _ !== 1))
    return -1;
  for (E[1] = 0, f = 1; f < It; f++)
    E[f + 1] = E[f] + b[f];
  for (c = 0; c < s; c++)
    e[t + c] !== 0 && (o[E[e[t + c]]++] = c);
  if (i === Pi ? (F = tt = o, I = 20) : i === Le ? (F = Da, tt = Na, I = 257) : (F = Ta, tt = Fa, I = 0), C = 0, c = 0, f = d, g = a, m = p, k = 0, N = -1, R = 1 << p, y = R - 1, i === Le && R > yi || i === Vi && R > Li)
    return 1;
  for (; ; ) {
    re = f - k, o[c] + 1 < I ? (Et = 0, at = o[c]) : o[c] >= I ? (Et = tt[o[c] - I], at = F[o[c] - I]) : (Et = 96, at = 0), S = 1 << f - k, u = 1 << m, d = u;
    do
      u -= S, r[g + (C >> k) + u] = re << 24 | Et << 16 | at | 0;
    while (u !== 0);
    for (S = 1 << f - 1; C & S; )
      S >>= 1;
    if (S !== 0 ? (C &= S - 1, C += S) : C = 0, c++, --b[f] === 0) {
      if (f === _)
        break;
      f = e[t + o[c]];
    }
    if (f > p && (C & y) !== N) {
      for (k === 0 && (k = p), g += d, m = f - k, A = 1 << m; m + k < _ && (A -= b[m + k], !(A <= 0)); )
        m++, A <<= 1;
      if (R += 1 << m, i === Le && R > yi || i === Vi && R > Li)
        return 1;
      N = C & y, r[N] = p << 24 | m << 16 | g - a | 0;
    }
  }
  return C !== 0 && (r[g + C] = f - k << 24 | 64 << 16 | 0), n.bits = p, 0;
};
var Ut = wa;
const Oa = 0, js = 1, Qs = 2, {
  Z_FINISH: vi,
  Z_BLOCK: Ba,
  Z_TREES: ne,
  Z_OK: bt,
  Z_STREAM_END: Ma,
  Z_NEED_DICT: ya,
  Z_STREAM_ERROR: X,
  Z_DATA_ERROR: tr,
  Z_MEM_ERROR: er,
  Z_BUF_ERROR: La,
  Z_DEFLATED: Gi
} = Ae, Ie = 16180, qi = 16181, Hi = 16182, Zi = 16183, Xi = 16184, zi = 16185, Ui = 16186, Yi = 16187, Wi = 16188, $i = 16189, be = 16190, et = 16191, Pe = 16192, Ki = 16193, Ve = 16194, Ji = 16195, ji = 16196, Qi = 16197, ts = 16198, oe = 16199, le = 16200, es = 16201, is = 16202, ss = 16203, rs = 16204, hs = 16205, ve = 16206, as = 16207, ns = 16208, O = 16209, ir = 16210, sr = 16211, Pa = 852, Va = 592, va = 15, Ga = va, os = (i) => (i >>> 24 & 255) + (i >>> 8 & 65280) + ((i & 65280) << 8) + ((i & 255) << 24);
function qa() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const St = (i) => {
  if (!i)
    return 1;
  const e = i.state;
  return !e || e.strm !== i || e.mode < Ie || e.mode > sr ? 1 : 0;
}, rr = (i) => {
  if (St(i))
    return X;
  const e = i.state;
  return i.total_in = i.total_out = e.total = 0, i.msg = "", e.wrap && (i.adler = e.wrap & 1), e.mode = Ie, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(Pa), e.distcode = e.distdyn = new Int32Array(Va), e.sane = 1, e.back = -1, bt;
}, hr = (i) => {
  if (St(i))
    return X;
  const e = i.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, rr(i);
}, ar = (i, e) => {
  let t;
  if (St(i))
    return X;
  const s = i.state;
  return e < 0 ? (t = 0, e = -e) : (t = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? X : (s.window !== null && s.wbits !== e && (s.window = null), s.wrap = t, s.wbits = e, hr(i));
}, nr = (i, e) => {
  if (!i)
    return X;
  const t = new qa();
  i.state = t, t.strm = i, t.window = null, t.mode = Ie;
  const s = ar(i, e);
  return s !== bt && (i.state = null), s;
}, Ha = (i) => nr(i, Ga);
let ls = !0, Ge, qe;
const Za = (i) => {
  if (ls) {
    Ge = new Int32Array(512), qe = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      i.lens[e++] = 8;
    for (; e < 256; )
      i.lens[e++] = 9;
    for (; e < 280; )
      i.lens[e++] = 7;
    for (; e < 288; )
      i.lens[e++] = 8;
    for (Ut(js, i.lens, 0, 288, Ge, 0, i.work, { bits: 9 }), e = 0; e < 32; )
      i.lens[e++] = 5;
    Ut(Qs, i.lens, 0, 32, qe, 0, i.work, { bits: 5 }), ls = !1;
  }
  i.lencode = Ge, i.lenbits = 9, i.distcode = qe, i.distbits = 5;
}, or = (i, e, t, s) => {
  let r;
  const a = i.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), s >= a.wsize ? (a.window.set(e.subarray(t - a.wsize, t), 0), a.wnext = 0, a.whave = a.wsize) : (r = a.wsize - a.wnext, r > s && (r = s), a.window.set(e.subarray(t - s, t - s + r), a.wnext), s -= r, s ? (a.window.set(e.subarray(t - s, t), 0), a.wnext = s, a.whave = a.wsize) : (a.wnext += r, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))), 0;
}, Xa = (i, e) => {
  let t, s, r, a, o, n, l, f, c, d, _, p, m, k, A = 0, R, C, S, u, N, y, g, F;
  const I = new Uint8Array(4);
  let b, E;
  const tt = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (St(i) || !i.output || !i.input && i.avail_in !== 0)
    return X;
  t = i.state, t.mode === et && (t.mode = Pe), o = i.next_out, r = i.output, l = i.avail_out, a = i.next_in, s = i.input, n = i.avail_in, f = t.hold, c = t.bits, d = n, _ = l, F = bt;
  t:
    for (; ; )
      switch (t.mode) {
        case Ie:
          if (t.wrap === 0) {
            t.mode = Pe;
            break;
          }
          for (; c < 16; ) {
            if (n === 0)
              break t;
            n--, f += s[a++] << c, c += 8;
          }
          if (t.wrap & 2 && f === 35615) {
            t.wbits === 0 && (t.wbits = 15), t.check = 0, I[0] = f & 255, I[1] = f >>> 8 & 255, t.check = L(t.check, I, 2, 0), f = 0, c = 0, t.mode = qi;
            break;
          }
          if (t.head && (t.head.done = !1), !(t.wrap & 1) || /* check if zlib header allowed */
          (((f & 255) << 8) + (f >> 8)) % 31) {
            i.msg = "incorrect header check", t.mode = O;
            break;
          }
          if ((f & 15) !== Gi) {
            i.msg = "unknown compression method", t.mode = O;
            break;
          }
          if (f >>>= 4, c -= 4, g = (f & 15) + 8, t.wbits === 0 && (t.wbits = g), g > 15 || g > t.wbits) {
            i.msg = "invalid window size", t.mode = O;
            break;
          }
          t.dmax = 1 << t.wbits, t.flags = 0, i.adler = t.check = 1, t.mode = f & 512 ? $i : et, f = 0, c = 0;
          break;
        case qi:
          for (; c < 16; ) {
            if (n === 0)
              break t;
            n--, f += s[a++] << c, c += 8;
          }
          if (t.flags = f, (t.flags & 255) !== Gi) {
            i.msg = "unknown compression method", t.mode = O;
            break;
          }
          if (t.flags & 57344) {
            i.msg = "unknown header flags set", t.mode = O;
            break;
          }
          t.head && (t.head.text = f >> 8 & 1), t.flags & 512 && t.wrap & 4 && (I[0] = f & 255, I[1] = f >>> 8 & 255, t.check = L(t.check, I, 2, 0)), f = 0, c = 0, t.mode = Hi;
        /* falls through */
        case Hi:
          for (; c < 32; ) {
            if (n === 0)
              break t;
            n--, f += s[a++] << c, c += 8;
          }
          t.head && (t.head.time = f), t.flags & 512 && t.wrap & 4 && (I[0] = f & 255, I[1] = f >>> 8 & 255, I[2] = f >>> 16 & 255, I[3] = f >>> 24 & 255, t.check = L(t.check, I, 4, 0)), f = 0, c = 0, t.mode = Zi;
        /* falls through */
        case Zi:
          for (; c < 16; ) {
            if (n === 0)
              break t;
            n--, f += s[a++] << c, c += 8;
          }
          t.head && (t.head.xflags = f & 255, t.head.os = f >> 8), t.flags & 512 && t.wrap & 4 && (I[0] = f & 255, I[1] = f >>> 8 & 255, t.check = L(t.check, I, 2, 0)), f = 0, c = 0, t.mode = Xi;
        /* falls through */
        case Xi:
          if (t.flags & 1024) {
            for (; c < 16; ) {
              if (n === 0)
                break t;
              n--, f += s[a++] << c, c += 8;
            }
            t.length = f, t.head && (t.head.extra_len = f), t.flags & 512 && t.wrap & 4 && (I[0] = f & 255, I[1] = f >>> 8 & 255, t.check = L(t.check, I, 2, 0)), f = 0, c = 0;
          } else t.head && (t.head.extra = null);
          t.mode = zi;
        /* falls through */
        case zi:
          if (t.flags & 1024 && (p = t.length, p > n && (p = n), p && (t.head && (g = t.head.extra_len - t.length, t.head.extra || (t.head.extra = new Uint8Array(t.head.extra_len)), t.head.extra.set(
            s.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + p
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            g
          )), t.flags & 512 && t.wrap & 4 && (t.check = L(t.check, s, p, a)), n -= p, a += p, t.length -= p), t.length))
            break t;
          t.length = 0, t.mode = Ui;
        /* falls through */
        case Ui:
          if (t.flags & 2048) {
            if (n === 0)
              break t;
            p = 0;
            do
              g = s[a + p++], t.head && g && t.length < 65536 && (t.head.name += String.fromCharCode(g));
            while (g && p < n);
            if (t.flags & 512 && t.wrap & 4 && (t.check = L(t.check, s, p, a)), n -= p, a += p, g)
              break t;
          } else t.head && (t.head.name = null);
          t.length = 0, t.mode = Yi;
        /* falls through */
        case Yi:
          if (t.flags & 4096) {
            if (n === 0)
              break t;
            p = 0;
            do
              g = s[a + p++], t.head && g && t.length < 65536 && (t.head.comment += String.fromCharCode(g));
            while (g && p < n);
            if (t.flags & 512 && t.wrap & 4 && (t.check = L(t.check, s, p, a)), n -= p, a += p, g)
              break t;
          } else t.head && (t.head.comment = null);
          t.mode = Wi;
        /* falls through */
        case Wi:
          if (t.flags & 512) {
            for (; c < 16; ) {
              if (n === 0)
                break t;
              n--, f += s[a++] << c, c += 8;
            }
            if (t.wrap & 4 && f !== (t.check & 65535)) {
              i.msg = "header crc mismatch", t.mode = O;
              break;
            }
            f = 0, c = 0;
          }
          t.head && (t.head.hcrc = t.flags >> 9 & 1, t.head.done = !0), i.adler = t.check = 0, t.mode = et;
          break;
        case $i:
          for (; c < 32; ) {
            if (n === 0)
              break t;
            n--, f += s[a++] << c, c += 8;
          }
          i.adler = t.check = os(f), f = 0, c = 0, t.mode = be;
        /* falls through */
        case be:
          if (t.havedict === 0)
            return i.next_out = o, i.avail_out = l, i.next_in = a, i.avail_in = n, t.hold = f, t.bits = c, ya;
          i.adler = t.check = 1, t.mode = et;
        /* falls through */
        case et:
          if (e === Ba || e === ne)
            break t;
        /* falls through */
        case Pe:
          if (t.last) {
            f >>>= c & 7, c -= c & 7, t.mode = ve;
            break;
          }
          for (; c < 3; ) {
            if (n === 0)
              break t;
            n--, f += s[a++] << c, c += 8;
          }
          switch (t.last = f & 1, f >>>= 1, c -= 1, f & 3) {
            case 0:
              t.mode = Ki;
              break;
            case 1:
              if (Za(t), t.mode = oe, e === ne) {
                f >>>= 2, c -= 2;
                break t;
              }
              break;
            case 2:
              t.mode = ji;
              break;
            case 3:
              i.msg = "invalid block type", t.mode = O;
          }
          f >>>= 2, c -= 2;
          break;
        case Ki:
          for (f >>>= c & 7, c -= c & 7; c < 32; ) {
            if (n === 0)
              break t;
            n--, f += s[a++] << c, c += 8;
          }
          if ((f & 65535) !== (f >>> 16 ^ 65535)) {
            i.msg = "invalid stored block lengths", t.mode = O;
            break;
          }
          if (t.length = f & 65535, f = 0, c = 0, t.mode = Ve, e === ne)
            break t;
        /* falls through */
        case Ve:
          t.mode = Ji;
        /* falls through */
        case Ji:
          if (p = t.length, p) {
            if (p > n && (p = n), p > l && (p = l), p === 0)
              break t;
            r.set(s.subarray(a, a + p), o), n -= p, a += p, l -= p, o += p, t.length -= p;
            break;
          }
          t.mode = et;
          break;
        case ji:
          for (; c < 14; ) {
            if (n === 0)
              break t;
            n--, f += s[a++] << c, c += 8;
          }
          if (t.nlen = (f & 31) + 257, f >>>= 5, c -= 5, t.ndist = (f & 31) + 1, f >>>= 5, c -= 5, t.ncode = (f & 15) + 4, f >>>= 4, c -= 4, t.nlen > 286 || t.ndist > 30) {
            i.msg = "too many length or distance symbols", t.mode = O;
            break;
          }
          t.have = 0, t.mode = Qi;
        /* falls through */
        case Qi:
          for (; t.have < t.ncode; ) {
            for (; c < 3; ) {
              if (n === 0)
                break t;
              n--, f += s[a++] << c, c += 8;
            }
            t.lens[tt[t.have++]] = f & 7, f >>>= 3, c -= 3;
          }
          for (; t.have < 19; )
            t.lens[tt[t.have++]] = 0;
          if (t.lencode = t.lendyn, t.lenbits = 7, b = { bits: t.lenbits }, F = Ut(Oa, t.lens, 0, 19, t.lencode, 0, t.work, b), t.lenbits = b.bits, F) {
            i.msg = "invalid code lengths set", t.mode = O;
            break;
          }
          t.have = 0, t.mode = ts;
        /* falls through */
        case ts:
          for (; t.have < t.nlen + t.ndist; ) {
            for (; A = t.lencode[f & (1 << t.lenbits) - 1], R = A >>> 24, C = A >>> 16 & 255, S = A & 65535, !(R <= c); ) {
              if (n === 0)
                break t;
              n--, f += s[a++] << c, c += 8;
            }
            if (S < 16)
              f >>>= R, c -= R, t.lens[t.have++] = S;
            else {
              if (S === 16) {
                for (E = R + 2; c < E; ) {
                  if (n === 0)
                    break t;
                  n--, f += s[a++] << c, c += 8;
                }
                if (f >>>= R, c -= R, t.have === 0) {
                  i.msg = "invalid bit length repeat", t.mode = O;
                  break;
                }
                g = t.lens[t.have - 1], p = 3 + (f & 3), f >>>= 2, c -= 2;
              } else if (S === 17) {
                for (E = R + 3; c < E; ) {
                  if (n === 0)
                    break t;
                  n--, f += s[a++] << c, c += 8;
                }
                f >>>= R, c -= R, g = 0, p = 3 + (f & 7), f >>>= 3, c -= 3;
              } else {
                for (E = R + 7; c < E; ) {
                  if (n === 0)
                    break t;
                  n--, f += s[a++] << c, c += 8;
                }
                f >>>= R, c -= R, g = 0, p = 11 + (f & 127), f >>>= 7, c -= 7;
              }
              if (t.have + p > t.nlen + t.ndist) {
                i.msg = "invalid bit length repeat", t.mode = O;
                break;
              }
              for (; p--; )
                t.lens[t.have++] = g;
            }
          }
          if (t.mode === O)
            break;
          if (t.lens[256] === 0) {
            i.msg = "invalid code -- missing end-of-block", t.mode = O;
            break;
          }
          if (t.lenbits = 9, b = { bits: t.lenbits }, F = Ut(js, t.lens, 0, t.nlen, t.lencode, 0, t.work, b), t.lenbits = b.bits, F) {
            i.msg = "invalid literal/lengths set", t.mode = O;
            break;
          }
          if (t.distbits = 6, t.distcode = t.distdyn, b = { bits: t.distbits }, F = Ut(Qs, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, b), t.distbits = b.bits, F) {
            i.msg = "invalid distances set", t.mode = O;
            break;
          }
          if (t.mode = oe, e === ne)
            break t;
        /* falls through */
        case oe:
          t.mode = le;
        /* falls through */
        case le:
          if (n >= 6 && l >= 258) {
            i.next_out = o, i.avail_out = l, i.next_in = a, i.avail_in = n, t.hold = f, t.bits = c, Ia(i, _), o = i.next_out, r = i.output, l = i.avail_out, a = i.next_in, s = i.input, n = i.avail_in, f = t.hold, c = t.bits, t.mode === et && (t.back = -1);
            break;
          }
          for (t.back = 0; A = t.lencode[f & (1 << t.lenbits) - 1], R = A >>> 24, C = A >>> 16 & 255, S = A & 65535, !(R <= c); ) {
            if (n === 0)
              break t;
            n--, f += s[a++] << c, c += 8;
          }
          if (C && (C & 240) === 0) {
            for (u = R, N = C, y = S; A = t.lencode[y + ((f & (1 << u + N) - 1) >> u)], R = A >>> 24, C = A >>> 16 & 255, S = A & 65535, !(u + R <= c); ) {
              if (n === 0)
                break t;
              n--, f += s[a++] << c, c += 8;
            }
            f >>>= u, c -= u, t.back += u;
          }
          if (f >>>= R, c -= R, t.back += R, t.length = S, C === 0) {
            t.mode = hs;
            break;
          }
          if (C & 32) {
            t.back = -1, t.mode = et;
            break;
          }
          if (C & 64) {
            i.msg = "invalid literal/length code", t.mode = O;
            break;
          }
          t.extra = C & 15, t.mode = es;
        /* falls through */
        case es:
          if (t.extra) {
            for (E = t.extra; c < E; ) {
              if (n === 0)
                break t;
              n--, f += s[a++] << c, c += 8;
            }
            t.length += f & (1 << t.extra) - 1, f >>>= t.extra, c -= t.extra, t.back += t.extra;
          }
          t.was = t.length, t.mode = is;
        /* falls through */
        case is:
          for (; A = t.distcode[f & (1 << t.distbits) - 1], R = A >>> 24, C = A >>> 16 & 255, S = A & 65535, !(R <= c); ) {
            if (n === 0)
              break t;
            n--, f += s[a++] << c, c += 8;
          }
          if ((C & 240) === 0) {
            for (u = R, N = C, y = S; A = t.distcode[y + ((f & (1 << u + N) - 1) >> u)], R = A >>> 24, C = A >>> 16 & 255, S = A & 65535, !(u + R <= c); ) {
              if (n === 0)
                break t;
              n--, f += s[a++] << c, c += 8;
            }
            f >>>= u, c -= u, t.back += u;
          }
          if (f >>>= R, c -= R, t.back += R, C & 64) {
            i.msg = "invalid distance code", t.mode = O;
            break;
          }
          t.offset = S, t.extra = C & 15, t.mode = ss;
        /* falls through */
        case ss:
          if (t.extra) {
            for (E = t.extra; c < E; ) {
              if (n === 0)
                break t;
              n--, f += s[a++] << c, c += 8;
            }
            t.offset += f & (1 << t.extra) - 1, f >>>= t.extra, c -= t.extra, t.back += t.extra;
          }
          if (t.offset > t.dmax) {
            i.msg = "invalid distance too far back", t.mode = O;
            break;
          }
          t.mode = rs;
        /* falls through */
        case rs:
          if (l === 0)
            break t;
          if (p = _ - l, t.offset > p) {
            if (p = t.offset - p, p > t.whave && t.sane) {
              i.msg = "invalid distance too far back", t.mode = O;
              break;
            }
            p > t.wnext ? (p -= t.wnext, m = t.wsize - p) : m = t.wnext - p, p > t.length && (p = t.length), k = t.window;
          } else
            k = r, m = o - t.offset, p = t.length;
          p > l && (p = l), l -= p, t.length -= p;
          do
            r[o++] = k[m++];
          while (--p);
          t.length === 0 && (t.mode = le);
          break;
        case hs:
          if (l === 0)
            break t;
          r[o++] = t.length, l--, t.mode = le;
          break;
        case ve:
          if (t.wrap) {
            for (; c < 32; ) {
              if (n === 0)
                break t;
              n--, f |= s[a++] << c, c += 8;
            }
            if (_ -= l, i.total_out += _, t.total += _, t.wrap & 4 && _ && (i.adler = t.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            t.flags ? L(t.check, r, _, o - _) : jt(t.check, r, _, o - _)), _ = l, t.wrap & 4 && (t.flags ? f : os(f)) !== t.check) {
              i.msg = "incorrect data check", t.mode = O;
              break;
            }
            f = 0, c = 0;
          }
          t.mode = as;
        /* falls through */
        case as:
          if (t.wrap && t.flags) {
            for (; c < 32; ) {
              if (n === 0)
                break t;
              n--, f += s[a++] << c, c += 8;
            }
            if (t.wrap & 4 && f !== (t.total & 4294967295)) {
              i.msg = "incorrect length check", t.mode = O;
              break;
            }
            f = 0, c = 0;
          }
          t.mode = ns;
        /* falls through */
        case ns:
          F = Ma;
          break t;
        case O:
          F = tr;
          break t;
        case ir:
          return er;
        case sr:
        /* falls through */
        default:
          return X;
      }
  return i.next_out = o, i.avail_out = l, i.next_in = a, i.avail_in = n, t.hold = f, t.bits = c, (t.wsize || _ !== i.avail_out && t.mode < O && (t.mode < ve || e !== vi)) && or(i, i.output, i.next_out, _ - i.avail_out), d -= i.avail_in, _ -= i.avail_out, i.total_in += d, i.total_out += _, t.total += _, t.wrap & 4 && _ && (i.adler = t.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  t.flags ? L(t.check, r, _, i.next_out - _) : jt(t.check, r, _, i.next_out - _)), i.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === et ? 128 : 0) + (t.mode === oe || t.mode === Ve ? 256 : 0), (d === 0 && _ === 0 || e === vi) && F === bt && (F = La), F;
}, za = (i) => {
  if (St(i))
    return X;
  let e = i.state;
  return e.window && (e.window = null), i.state = null, bt;
}, Ua = (i, e) => {
  if (St(i))
    return X;
  const t = i.state;
  return (t.wrap & 2) === 0 ? X : (t.head = e, e.done = !1, bt);
}, Ya = (i, e) => {
  const t = e.length;
  let s, r, a;
  return St(i) || (s = i.state, s.wrap !== 0 && s.mode !== be) ? X : s.mode === be && (r = 1, r = jt(r, e, t, 0), r !== s.check) ? tr : (a = or(i, e, t, t), a ? (s.mode = ir, er) : (s.havedict = 1, bt));
};
var Wa = hr, $a = ar, Ka = rr, Ja = Ha, ja = nr, Qa = Xa, t0 = za, e0 = Ua, i0 = Ya, s0 = "pako inflate (from Nodeca project)", ht = {
  inflateReset: Wa,
  inflateReset2: $a,
  inflateResetKeep: Ka,
  inflateInit: Ja,
  inflateInit2: ja,
  inflate: Qa,
  inflateEnd: t0,
  inflateGetHeader: e0,
  inflateSetDictionary: i0,
  inflateInfo: s0
};
function r0() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var h0 = r0;
const lr = Object.prototype.toString, {
  Z_NO_FLUSH: a0,
  Z_FINISH: n0,
  Z_OK: ee,
  Z_STREAM_END: He,
  Z_NEED_DICT: Ze,
  Z_STREAM_ERROR: o0,
  Z_DATA_ERROR: fs,
  Z_MEM_ERROR: l0
} = Ae;
function De(i) {
  this.options = Ee.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, i || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(i && i.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) === 0 && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Ks(), this.strm.avail_out = 0;
  let t = ht.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (t !== ee)
    throw new Error(Rt[t]);
  if (this.header = new h0(), ht.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = te.string2buf(e.dictionary) : lr.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (t = ht.inflateSetDictionary(this.strm, e.dictionary), t !== ee)))
    throw new Error(Rt[t]);
}
De.prototype.push = function(i, e) {
  const t = this.strm, s = this.options.chunkSize, r = this.options.dictionary;
  let a, o, n;
  if (this.ended) return !1;
  for (e === ~~e ? o = e : o = e === !0 ? n0 : a0, lr.call(i) === "[object ArrayBuffer]" ? t.input = new Uint8Array(i) : t.input = i, t.next_in = 0, t.avail_in = t.input.length; ; ) {
    for (t.avail_out === 0 && (t.output = new Uint8Array(s), t.next_out = 0, t.avail_out = s), a = ht.inflate(t, o), a === Ze && r && (a = ht.inflateSetDictionary(t, r), a === ee ? a = ht.inflate(t, o) : a === fs && (a = Ze)); t.avail_in > 0 && a === He && t.state.wrap > 0 && i[t.next_in] !== 0; )
      ht.inflateReset(t), a = ht.inflate(t, o);
    switch (a) {
      case o0:
      case fs:
      case Ze:
      case l0:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (n = t.avail_out, t.next_out && (t.avail_out === 0 || a === He))
      if (this.options.to === "string") {
        let l = te.utf8border(t.output, t.next_out), f = t.next_out - l, c = te.buf2string(t.output, l);
        t.next_out = f, t.avail_out = s - f, f && t.output.set(t.output.subarray(l, l + f), 0), this.onData(c);
      } else
        this.onData(t.output.length === t.next_out ? t.output : t.output.subarray(0, t.next_out));
    if (!(a === ee && n === 0)) {
      if (a === He)
        return a = ht.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
      if (t.avail_in === 0) break;
    }
  }
  return !0;
};
De.prototype.onData = function(i) {
  this.chunks.push(i);
};
De.prototype.onEnd = function(i) {
  i === ee && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Ee.flattenChunks(this.chunks)), this.chunks = [], this.err = i, this.msg = this.strm.msg;
};
function f0(i, e) {
  const t = new De(e);
  if (t.push(i), t.err) throw t.msg || Rt[t.err];
  return t.result;
}
var c0 = f0, p0 = {
  ungzip: c0
};
const { gzip: _0 } = Ea, { ungzip: u0 } = p0;
var m0 = _0, x0 = u0;
function it(i, e, t, s, r) {
  for (let a = 0; a < r; ++a)
    t[s + a] = i[e + a];
}
function At(i) {
  const e = {};
  for (let t = 0; t < i.JSON_PROPERTIES.length; ++t)
    e[i.JSON_PROPERTIES[t]] = i[i.JSON_PROPERTIES[t]];
  return e;
}
function Ct(i, e) {
  for (let t = 0; t < i.JSON_PROPERTIES.length; ++t)
    i[i.JSON_PROPERTIES[t]] = e[i.JSON_PROPERTIES[t]];
}
function U(i, e) {
  return Array.from({
    length: e
  }).fill(i);
}
function d0() {
  return U(32768, 0).map((i, e) => e);
}
function Bt(i) {
  const e = [];
  let t = i[0], s = 1;
  for (let r = 1; r <= i.length; r++)
    i[r] === t ? s++ : (s > 1 && e.push(-s), e.push(t), t = i[r], s = 1);
  return e;
}
function Mt(i) {
  const e = [];
  for (let t = 0; t < i.length; )
    if (i[t] >= 0)
      e.push(i[t]), t++;
    else {
      const s = -i[t], r = i[t + 1];
      for (let a = 0; a < s; a++)
        e.push(r);
      t += 2;
    }
  return e;
}
function R0(i) {
  const e = [], t = [];
  for (let s = 0; s < i.length; s++) {
    for (let r = 0; r < i[s].opaque.length; r++)
      i[s].opaque[r] === !1 ? e.push(0) : e.push(1);
    t.push(...i[s].pix);
  }
  return [Bt(e), Bt(t)];
}
function g0(i) {
  const e = [];
  let t = Array(8), s = [];
  const r = Mt(i[0]), a = Mt(i[1]);
  for (let o = 0; o < 512; o += 1) {
    for (let n = 0; n < 8; n += 1)
      r[o * 8 + n] === 0 && (t[n] = !1);
    for (let n = 0; n < 64; n += 1)
      s[n] = a[o * 64 + n];
    e.push({
      opaque: t,
      pix: s
    }), t = Array(8), s = [];
  }
  return e;
}
function b0(i) {
  const e = [], t = [];
  return i.reduce((s, r) => (e.push(...r.tile), t.push(...r.attrib), s), e), [Bt(e), Bt(t)];
}
function S0(i) {
  const e = [];
  let t = [], s = [];
  const r = Mt(i[0]), a = Mt(i[1]);
  for (let o = 0; o < 1024 * 4; o += 1)
    t.push(r[o]), s.push(a[o]), (o + 1) % 1024 === 0 && (e.push({
      tile: t,
      attrib: s
    }), t = [], s = []);
  return e;
}
function fe(i) {
  return +`0x${i}`;
}
function Xe(i) {
  return Object.entries(i);
}
class A0 {
  constructor() {
    h(this, "INS_ADC", 0);
    h(this, "INS_AND", 1);
    h(this, "INS_ASL", 2);
    h(this, "INS_BCC", 3);
    h(this, "INS_BCS", 4);
    h(this, "INS_BEQ", 5);
    h(this, "INS_BIT", 6);
    h(this, "INS_BMI", 7);
    h(this, "INS_BNE", 8);
    h(this, "INS_BPL", 9);
    h(this, "INS_BRK", 10);
    h(this, "INS_BVC", 11);
    h(this, "INS_BVS", 12);
    h(this, "INS_CLC", 13);
    h(this, "INS_CLD", 14);
    h(this, "INS_CLI", 15);
    h(this, "INS_CLV", 16);
    h(this, "INS_CMP", 17);
    h(this, "INS_CPX", 18);
    h(this, "INS_CPY", 19);
    h(this, "INS_DEC", 20);
    h(this, "INS_DEX", 21);
    h(this, "INS_DEY", 22);
    h(this, "INS_EOR", 23);
    h(this, "INS_INC", 24);
    h(this, "INS_INX", 25);
    h(this, "INS_INY", 26);
    h(this, "INS_JMP", 27);
    h(this, "INS_JSR", 28);
    h(this, "INS_LDA", 29);
    h(this, "INS_LDX", 30);
    h(this, "INS_LDY", 31);
    h(this, "INS_LSR", 32);
    h(this, "INS_NOP", 33);
    h(this, "INS_ORA", 34);
    h(this, "INS_PHA", 35);
    h(this, "INS_PHP", 36);
    h(this, "INS_PLA", 37);
    h(this, "INS_PLP", 38);
    h(this, "INS_ROL", 39);
    h(this, "INS_ROR", 40);
    h(this, "INS_RTI", 41);
    h(this, "INS_RTS", 42);
    h(this, "INS_SBC", 43);
    h(this, "INS_SEC", 44);
    h(this, "INS_SED", 45);
    h(this, "INS_SEI", 46);
    h(this, "INS_STA", 47);
    h(this, "INS_STX", 48);
    h(this, "INS_STY", 49);
    h(this, "INS_TAX", 50);
    h(this, "INS_TAY", 51);
    h(this, "INS_TSX", 52);
    h(this, "INS_TXA", 53);
    h(this, "INS_TXS", 54);
    h(this, "INS_TYA", 55);
    h(this, "INS_ALR", 56);
    h(this, "INS_ANC", 57);
    h(this, "INS_ARR", 58);
    h(this, "INS_AXS", 59);
    h(this, "INS_LAX", 60);
    h(this, "INS_SAX", 61);
    h(this, "INS_DCP", 62);
    h(this, "INS_ISC", 63);
    h(this, "INS_RLA", 64);
    h(this, "INS_RRA", 65);
    h(this, "INS_SLO", 66);
    h(this, "INS_SRE", 67);
    h(this, "INS_SKB", 68);
    h(this, "INS_IGN", 69);
    h(this, "INS_DUMMY", 70);
    // dummy instruction used for 'halting' the processor some cycles
    // -------------------------------- //
    // Addressing modes:
    h(this, "ADDR_ZP", 0);
    h(this, "ADDR_REL", 1);
    h(this, "ADDR_IMP", 2);
    h(this, "ADDR_ABS", 3);
    h(this, "ADDR_ACC", 4);
    h(this, "ADDR_IMM", 5);
    h(this, "ADDR_ZPX", 6);
    h(this, "ADDR_ZPY", 7);
    h(this, "ADDR_ABSX", 8);
    h(this, "ADDR_ABSY", 9);
    h(this, "ADDR_PREIDXIND", 10);
    h(this, "ADDR_POSTIDXIND", 11);
    h(this, "ADDR_INDABS", 12);
    h(this, "addrDesc", ["Zero Page           ", "Relative            ", "Implied             ", "Absolute            ", "Accumulator         ", "Immediate           ", "Zero Page,X         ", "Zero Page,Y         ", "Absolute,X          ", "Absolute,Y          ", "Preindexed Indirect ", "Postindexed Indirect", "Indirect Absolute   "]);
    h(this, "JSON_PROPERTIES", [
      "mem",
      "cyclesToHalt",
      "irqRequested",
      "irqType",
      // Registers
      "REG_ACC",
      "REG_X",
      "REG_Y",
      "REG_SP",
      "REG_PC",
      "REG_PC_NEW",
      "REG_STATUS",
      // Status
      "F_CARRY",
      "F_DECIMAL",
      "F_INTERRUPT",
      "F_INTERRUPT_NEW",
      "F_OVERFLOW",
      "F_SIGN",
      "F_ZERO",
      "F_NOTUSED",
      "F_NOTUSED_NEW",
      "F_BRK",
      "F_BRK_NEW"
    ]);
    /* eslint-disable */
    h(this, "cycTable", [
      /*0x00*/
      7,
      6,
      2,
      8,
      3,
      3,
      5,
      5,
      3,
      2,
      2,
      2,
      4,
      4,
      6,
      6,
      /*0x10*/
      2,
      5,
      2,
      8,
      4,
      4,
      6,
      6,
      2,
      4,
      2,
      7,
      4,
      4,
      7,
      7,
      /*0x20*/
      6,
      6,
      2,
      8,
      3,
      3,
      5,
      5,
      4,
      2,
      2,
      2,
      4,
      4,
      6,
      6,
      /*0x30*/
      2,
      5,
      2,
      8,
      4,
      4,
      6,
      6,
      2,
      4,
      2,
      7,
      4,
      4,
      7,
      7,
      /*0x40*/
      6,
      6,
      2,
      8,
      3,
      3,
      5,
      5,
      3,
      2,
      2,
      2,
      3,
      4,
      6,
      6,
      /*0x50*/
      2,
      5,
      2,
      8,
      4,
      4,
      6,
      6,
      2,
      4,
      2,
      7,
      4,
      4,
      7,
      7,
      /*0x60*/
      6,
      6,
      2,
      8,
      3,
      3,
      5,
      5,
      4,
      2,
      2,
      2,
      5,
      4,
      6,
      6,
      /*0x70*/
      2,
      5,
      2,
      8,
      4,
      4,
      6,
      6,
      2,
      4,
      2,
      7,
      4,
      4,
      7,
      7,
      /*0x80*/
      2,
      6,
      2,
      6,
      3,
      3,
      3,
      3,
      2,
      2,
      2,
      2,
      4,
      4,
      4,
      4,
      /*0x90*/
      2,
      6,
      2,
      6,
      4,
      4,
      4,
      4,
      2,
      5,
      2,
      5,
      5,
      5,
      5,
      5,
      /*0xA0*/
      2,
      6,
      2,
      6,
      3,
      3,
      3,
      3,
      2,
      2,
      2,
      2,
      4,
      4,
      4,
      4,
      /*0xB0*/
      2,
      5,
      2,
      5,
      4,
      4,
      4,
      4,
      2,
      4,
      2,
      4,
      4,
      4,
      4,
      4,
      /*0xC0*/
      2,
      6,
      2,
      8,
      3,
      3,
      5,
      5,
      2,
      2,
      2,
      2,
      4,
      4,
      6,
      6,
      /*0xD0*/
      2,
      5,
      2,
      8,
      4,
      4,
      6,
      6,
      2,
      4,
      2,
      7,
      4,
      4,
      7,
      7
    ]);
    /* eslint-enable */
    h(this, "instname");
    h(this, "opdata");
    this.opdata = new Array(256), this.instname = new Array(70);
    for (let e = 0; e < 256; e++) this.opdata[e] = 255;
    this.setOp(this.INS_ADC, 105, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ADC, 101, this.ADDR_ZP, 2, 3), this.setOp(this.INS_ADC, 117, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_ADC, 109, this.ADDR_ABS, 3, 4), this.setOp(this.INS_ADC, 125, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_ADC, 121, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_ADC, 97, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_ADC, 113, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_AND, 41, this.ADDR_IMM, 2, 2), this.setOp(this.INS_AND, 37, this.ADDR_ZP, 2, 3), this.setOp(this.INS_AND, 53, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_AND, 45, this.ADDR_ABS, 3, 4), this.setOp(this.INS_AND, 61, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_AND, 57, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_AND, 33, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_AND, 49, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_ASL, 10, this.ADDR_ACC, 1, 2), this.setOp(this.INS_ASL, 6, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ASL, 22, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ASL, 14, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ASL, 30, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_BCC, 144, this.ADDR_REL, 2, 2), this.setOp(this.INS_BCS, 176, this.ADDR_REL, 2, 2), this.setOp(this.INS_BEQ, 240, this.ADDR_REL, 2, 2), this.setOp(this.INS_BIT, 36, this.ADDR_ZP, 2, 3), this.setOp(this.INS_BIT, 44, this.ADDR_ABS, 3, 4), this.setOp(this.INS_BMI, 48, this.ADDR_REL, 2, 2), this.setOp(this.INS_BNE, 208, this.ADDR_REL, 2, 2), this.setOp(this.INS_BPL, 16, this.ADDR_REL, 2, 2), this.setOp(this.INS_BRK, 0, this.ADDR_IMP, 1, 7), this.setOp(this.INS_BVC, 80, this.ADDR_REL, 2, 2), this.setOp(this.INS_BVS, 112, this.ADDR_REL, 2, 2), this.setOp(this.INS_CLC, 24, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CLD, 216, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CLI, 88, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CLV, 184, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CMP, 201, this.ADDR_IMM, 2, 2), this.setOp(this.INS_CMP, 197, this.ADDR_ZP, 2, 3), this.setOp(this.INS_CMP, 213, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_CMP, 205, this.ADDR_ABS, 3, 4), this.setOp(this.INS_CMP, 221, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_CMP, 217, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_CMP, 193, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_CMP, 209, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_CPX, 224, this.ADDR_IMM, 2, 2), this.setOp(this.INS_CPX, 228, this.ADDR_ZP, 2, 3), this.setOp(this.INS_CPX, 236, this.ADDR_ABS, 3, 4), this.setOp(this.INS_CPY, 192, this.ADDR_IMM, 2, 2), this.setOp(this.INS_CPY, 196, this.ADDR_ZP, 2, 3), this.setOp(this.INS_CPY, 204, this.ADDR_ABS, 3, 4), this.setOp(this.INS_DEC, 198, this.ADDR_ZP, 2, 5), this.setOp(this.INS_DEC, 214, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_DEC, 206, this.ADDR_ABS, 3, 6), this.setOp(this.INS_DEC, 222, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_DEX, 202, this.ADDR_IMP, 1, 2), this.setOp(this.INS_DEY, 136, this.ADDR_IMP, 1, 2), this.setOp(this.INS_EOR, 73, this.ADDR_IMM, 2, 2), this.setOp(this.INS_EOR, 69, this.ADDR_ZP, 2, 3), this.setOp(this.INS_EOR, 85, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_EOR, 77, this.ADDR_ABS, 3, 4), this.setOp(this.INS_EOR, 93, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_EOR, 89, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_EOR, 65, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_EOR, 81, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_INC, 230, this.ADDR_ZP, 2, 5), this.setOp(this.INS_INC, 246, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_INC, 238, this.ADDR_ABS, 3, 6), this.setOp(this.INS_INC, 254, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_INX, 232, this.ADDR_IMP, 1, 2), this.setOp(this.INS_INY, 200, this.ADDR_IMP, 1, 2), this.setOp(this.INS_JMP, 76, this.ADDR_ABS, 3, 3), this.setOp(this.INS_JMP, 108, this.ADDR_INDABS, 3, 5), this.setOp(this.INS_JSR, 32, this.ADDR_ABS, 3, 6), this.setOp(this.INS_LDA, 169, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LDA, 165, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LDA, 181, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_LDA, 173, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LDA, 189, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_LDA, 185, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_LDA, 161, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_LDA, 177, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_LDX, 162, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LDX, 166, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LDX, 182, this.ADDR_ZPY, 2, 4), this.setOp(this.INS_LDX, 174, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LDX, 190, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_LDY, 160, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LDY, 164, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LDY, 180, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_LDY, 172, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LDY, 188, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_LSR, 74, this.ADDR_ACC, 1, 2), this.setOp(this.INS_LSR, 70, this.ADDR_ZP, 2, 5), this.setOp(this.INS_LSR, 86, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_LSR, 78, this.ADDR_ABS, 3, 6), this.setOp(this.INS_LSR, 94, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_NOP, 26, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 58, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 90, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 122, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 218, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 234, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 250, this.ADDR_IMP, 1, 2), this.setOp(this.INS_ORA, 9, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ORA, 5, this.ADDR_ZP, 2, 3), this.setOp(this.INS_ORA, 21, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_ORA, 13, this.ADDR_ABS, 3, 4), this.setOp(this.INS_ORA, 29, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_ORA, 25, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_ORA, 1, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_ORA, 17, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_PHA, 72, this.ADDR_IMP, 1, 3), this.setOp(this.INS_PHP, 8, this.ADDR_IMP, 1, 3), this.setOp(this.INS_PLA, 104, this.ADDR_IMP, 1, 4), this.setOp(this.INS_PLP, 40, this.ADDR_IMP, 1, 4), this.setOp(this.INS_ROL, 42, this.ADDR_ACC, 1, 2), this.setOp(this.INS_ROL, 38, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ROL, 54, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ROL, 46, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ROL, 62, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_ROR, 106, this.ADDR_ACC, 1, 2), this.setOp(this.INS_ROR, 102, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ROR, 118, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ROR, 110, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ROR, 126, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_RTI, 64, this.ADDR_IMP, 1, 6), this.setOp(this.INS_RTS, 96, this.ADDR_IMP, 1, 6), this.setOp(this.INS_SBC, 233, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SBC, 229, this.ADDR_ZP, 2, 3), this.setOp(this.INS_SBC, 245, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_SBC, 237, this.ADDR_ABS, 3, 4), this.setOp(this.INS_SBC, 253, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_SBC, 249, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_SBC, 225, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_SBC, 241, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_SEC, 56, this.ADDR_IMP, 1, 2), this.setOp(this.INS_SED, 248, this.ADDR_IMP, 1, 2), this.setOp(this.INS_SEI, 120, this.ADDR_IMP, 1, 2), this.setOp(this.INS_STA, 133, this.ADDR_ZP, 2, 3), this.setOp(this.INS_STA, 149, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_STA, 141, this.ADDR_ABS, 3, 4), this.setOp(this.INS_STA, 157, this.ADDR_ABSX, 3, 5), this.setOp(this.INS_STA, 153, this.ADDR_ABSY, 3, 5), this.setOp(this.INS_STA, 129, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_STA, 145, this.ADDR_POSTIDXIND, 2, 6), this.setOp(this.INS_STX, 134, this.ADDR_ZP, 2, 3), this.setOp(this.INS_STX, 150, this.ADDR_ZPY, 2, 4), this.setOp(this.INS_STX, 142, this.ADDR_ABS, 3, 4), this.setOp(this.INS_STY, 132, this.ADDR_ZP, 2, 3), this.setOp(this.INS_STY, 148, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_STY, 140, this.ADDR_ABS, 3, 4), this.setOp(this.INS_TAX, 170, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TAY, 168, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TSX, 186, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TXA, 138, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TXS, 154, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TYA, 152, this.ADDR_IMP, 1, 2), this.setOp(this.INS_ALR, 75, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ANC, 11, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ANC, 43, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ARR, 107, this.ADDR_IMM, 2, 2), this.setOp(this.INS_AXS, 203, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LAX, 163, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_LAX, 167, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LAX, 175, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LAX, 179, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_LAX, 183, this.ADDR_ZPY, 2, 4), this.setOp(this.INS_LAX, 191, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_SAX, 131, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_SAX, 135, this.ADDR_ZP, 2, 3), this.setOp(this.INS_SAX, 143, this.ADDR_ABS, 3, 4), this.setOp(this.INS_SAX, 151, this.ADDR_ZPY, 2, 4), this.setOp(this.INS_DCP, 195, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_DCP, 199, this.ADDR_ZP, 2, 5), this.setOp(this.INS_DCP, 207, this.ADDR_ABS, 3, 6), this.setOp(this.INS_DCP, 211, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_DCP, 215, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_DCP, 219, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_DCP, 223, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_ISC, 227, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_ISC, 231, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ISC, 239, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ISC, 243, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_ISC, 247, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ISC, 251, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_ISC, 255, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_RLA, 35, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_RLA, 39, this.ADDR_ZP, 2, 5), this.setOp(this.INS_RLA, 47, this.ADDR_ABS, 3, 6), this.setOp(this.INS_RLA, 51, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_RLA, 55, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_RLA, 59, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_RLA, 63, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_RRA, 99, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_RRA, 103, this.ADDR_ZP, 2, 5), this.setOp(this.INS_RRA, 111, this.ADDR_ABS, 3, 6), this.setOp(this.INS_RRA, 115, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_RRA, 119, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_RRA, 123, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_RRA, 127, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_SLO, 3, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_SLO, 7, this.ADDR_ZP, 2, 5), this.setOp(this.INS_SLO, 15, this.ADDR_ABS, 3, 6), this.setOp(this.INS_SLO, 19, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_SLO, 23, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_SLO, 27, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_SLO, 31, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_SRE, 67, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_SRE, 71, this.ADDR_ZP, 2, 5), this.setOp(this.INS_SRE, 79, this.ADDR_ABS, 3, 6), this.setOp(this.INS_SRE, 83, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_SRE, 87, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_SRE, 91, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_SRE, 95, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_SKB, 128, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SKB, 130, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SKB, 137, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SKB, 194, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SKB, 226, this.ADDR_IMM, 2, 2), this.setOp(this.INS_IGN, 12, this.ADDR_ABS, 3, 4), this.setOp(this.INS_IGN, 28, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 60, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 92, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 124, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 220, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 252, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 4, this.ADDR_ZP, 2, 3), this.setOp(this.INS_IGN, 68, this.ADDR_ZP, 2, 3), this.setOp(this.INS_IGN, 100, this.ADDR_ZP, 2, 3), this.setOp(this.INS_IGN, 20, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_IGN, 52, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_IGN, 84, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_IGN, 116, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_IGN, 212, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_IGN, 244, this.ADDR_ZPX, 2, 4), this.instname[0] = "ADC", this.instname[1] = "AND", this.instname[2] = "ASL", this.instname[3] = "BCC", this.instname[4] = "BCS", this.instname[5] = "BEQ", this.instname[6] = "BIT", this.instname[7] = "BMI", this.instname[8] = "BNE", this.instname[9] = "BPL", this.instname[10] = "BRK", this.instname[11] = "BVC", this.instname[12] = "BVS", this.instname[13] = "CLC", this.instname[14] = "CLD", this.instname[15] = "CLI", this.instname[16] = "CLV", this.instname[17] = "CMP", this.instname[18] = "CPX", this.instname[19] = "CPY", this.instname[20] = "DEC", this.instname[21] = "DEX", this.instname[22] = "DEY", this.instname[23] = "EOR", this.instname[24] = "INC", this.instname[25] = "INX", this.instname[26] = "INY", this.instname[27] = "JMP", this.instname[28] = "JSR", this.instname[29] = "LDA", this.instname[30] = "LDX", this.instname[31] = "LDY", this.instname[32] = "LSR", this.instname[33] = "NOP", this.instname[34] = "ORA", this.instname[35] = "PHA", this.instname[36] = "PHP", this.instname[37] = "PLA", this.instname[38] = "PLP", this.instname[39] = "ROL", this.instname[40] = "ROR", this.instname[41] = "RTI", this.instname[42] = "RTS", this.instname[43] = "SBC", this.instname[44] = "SEC", this.instname[45] = "SED", this.instname[46] = "SEI", this.instname[47] = "STA", this.instname[48] = "STX", this.instname[49] = "STY", this.instname[50] = "TAX", this.instname[51] = "TAY", this.instname[52] = "TSX", this.instname[53] = "TXA", this.instname[54] = "TXS", this.instname[55] = "TYA", this.instname[56] = "ALR", this.instname[57] = "ANC", this.instname[58] = "ARR", this.instname[59] = "AXS", this.instname[60] = "LAX", this.instname[61] = "SAX", this.instname[62] = "DCP", this.instname[63] = "ISC", this.instname[64] = "RLA", this.instname[65] = "RRA", this.instname[66] = "SLO", this.instname[67] = "SRE", this.instname[68] = "SKB", this.instname[69] = "IGN";
  }
  setOp(e, t, s, r, a) {
    this.opdata[t] = e & 255 | (s & 255) << 8 | (r & 255) << 16 | (a & 255) << 24;
  }
}
class fi {
  constructor(e) {
    h(this, "nes");
    h(this, "mem");
    h(this, "REG_ACC");
    h(this, "REG_X");
    h(this, "REG_Y");
    h(this, "REG_SP");
    h(this, "REG_PC");
    h(this, "REG_PC_NEW");
    h(this, "REG_STATUS");
    h(this, "F_CARRY");
    h(this, "F_DECIMAL");
    h(this, "F_INTERRUPT");
    h(this, "F_INTERRUPT_NEW");
    h(this, "F_OVERFLOW");
    h(this, "F_SIGN");
    h(this, "F_ZERO");
    h(this, "F_NOTUSED");
    h(this, "F_NOTUSED_NEW");
    h(this, "F_BRK");
    h(this, "F_BRK_NEW");
    h(this, "opdata");
    h(this, "cyclesToHalt");
    h(this, "crash");
    h(this, "irqRequested");
    h(this, "irqType");
    h(this, "IRQ_NORMAL", 0);
    h(this, "IRQ_NMI", 1);
    h(this, "IRQ_RESET", 2);
    h(this, "JSON_PROPERTIES", [
      "mem",
      "cyclesToHalt",
      "irqRequested",
      "irqType",
      // Registers
      "REG_ACC",
      "REG_X",
      "REG_Y",
      "REG_SP",
      "REG_PC",
      "REG_PC_NEW",
      "REG_STATUS",
      // Status
      "F_CARRY",
      "F_DECIMAL",
      "F_INTERRUPT",
      "F_INTERRUPT_NEW",
      "F_OVERFLOW",
      "F_SIGN",
      "F_ZERO",
      "F_NOTUSED",
      "F_NOTUSED_NEW",
      "F_BRK",
      "F_BRK_NEW"
    ]);
    this.nes = e, this.mem = new Array(65536);
    for (let t = 0; t < 8192; t++)
      this.mem[t] = 255;
    for (let t = 0; t < 4; t++) {
      const s = t * 2048;
      this.mem[s + 8] = 247, this.mem[s + 9] = 239, this.mem[s + 10] = 223, this.mem[s + 15] = 191;
    }
    for (let t = 8193; t < this.mem.length; t++)
      this.mem[t] = 0;
    this.REG_ACC = 0, this.REG_X = 0, this.REG_Y = 0, this.REG_SP = 511, this.REG_PC = 32767, this.REG_PC_NEW = 32767, this.REG_STATUS = 40, this.setStatus(40), this.F_CARRY = 0, this.F_DECIMAL = 0, this.F_INTERRUPT = 1, this.F_INTERRUPT_NEW = 1, this.F_OVERFLOW = 0, this.F_SIGN = 0, this.F_ZERO = 1, this.F_NOTUSED = 1, this.F_NOTUSED_NEW = 1, this.F_BRK = 1, this.F_BRK_NEW = 1, this.opdata = new A0().opdata, this.cyclesToHalt = 0, this.crash = !1, this.irqRequested = !1, this.irqType = null;
  }
  reset() {
    const e = new fi(this.nes);
    Object.assign(this, e);
  }
  emulate() {
    let e, t;
    if (this.irqRequested) {
      switch (e = this.F_CARRY | (this.F_ZERO === 0 ? 1 : 0) << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7, this.REG_PC_NEW = this.REG_PC, this.F_INTERRUPT_NEW = this.F_INTERRUPT, this.irqType) {
        case 0: {
          if (this.F_INTERRUPT !== 0)
            break;
          this.doIrq(e);
          break;
        }
        case 1: {
          this.doNonMaskableInterrupt(e);
          break;
        }
        case 2: {
          this.doResetInterrupt();
          break;
        }
      }
      this.REG_PC = this.REG_PC_NEW, this.F_INTERRUPT = this.F_INTERRUPT_NEW, this.F_BRK = this.F_BRK_NEW, this.irqRequested = !1;
    }
    const s = this.opdata[this.nes.mmap.load(this.REG_PC + 1)];
    let r = s >> 24, a = 0;
    const o = s >> 8 & 255, n = this.REG_PC;
    this.REG_PC += s >> 16 & 255;
    let l = 0;
    switch (o) {
      case 0: {
        l = this.load(n + 2);
        break;
      }
      case 1: {
        l = this.load(n + 2), l < 128 ? l += this.REG_PC : l += this.REG_PC - 256;
        break;
      }
      case 2:
        break;
      case 3: {
        l = this.load16bit(n + 2);
        break;
      }
      case 4: {
        l = this.REG_ACC;
        break;
      }
      case 5: {
        l = this.REG_PC;
        break;
      }
      case 6: {
        l = this.load(n + 2) + this.REG_X & 255;
        break;
      }
      case 7: {
        l = this.load(n + 2) + this.REG_Y & 255;
        break;
      }
      case 8: {
        l = this.load16bit(n + 2), (l & 65280) !== (l + this.REG_X & 65280) && (a = 1), l += this.REG_X;
        break;
      }
      case 9: {
        l = this.load16bit(n + 2), (l & 65280) !== (l + this.REG_Y & 65280) && (a = 1), l += this.REG_Y;
        break;
      }
      case 10: {
        l = this.load(n + 2), (l & 65280) !== (l + this.REG_X & 65280) && (a = 1), l += this.REG_X, l &= 255, l = this.load16bit(l);
        break;
      }
      case 11: {
        l = this.load16bit(this.load(n + 2)), (l & 65280) !== (l + this.REG_Y & 65280) && (a = 1), l += this.REG_Y;
        break;
      }
      case 12: {
        l = this.load16bit(n + 2), l < 8191 ? l = this.mem[l] + (this.mem[l & 65280 | (l & 255) + 1 & 255] << 8) : l = this.nes.mmap.load(l) + (this.nes.mmap.load(l & 65280 | (l & 255) + 1 & 255) << 8);
        break;
      }
    }
    switch (l &= 65535, s & 255) {
      case 0: {
        e = this.REG_ACC + this.load(l) + this.F_CARRY, ((this.REG_ACC ^ this.load(l)) & 128) === 0 && ((this.REG_ACC ^ e) & 128) !== 0 ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = e > 255 ? 1 : 0, this.F_SIGN = e >> 7 & 1, this.F_ZERO = e & 255, this.REG_ACC = e & 255, r += a;
        break;
      }
      case 1: {
        this.REG_ACC = this.REG_ACC & this.load(l), this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, o !== 11 && (r += a);
        break;
      }
      case 2: {
        o === 4 ? (this.F_CARRY = this.REG_ACC >> 7 & 1, this.REG_ACC = this.REG_ACC << 1 & 255, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC) : (e = this.load(l), this.F_CARRY = e >> 7 & 1, e = e << 1 & 255, this.F_SIGN = e >> 7 & 1, this.F_ZERO = e, this.write(l, e));
        break;
      }
      case 3: {
        this.F_CARRY === 0 && (r += (n & 65280) === (l & 65280) ? 1 : 2, this.REG_PC = l);
        break;
      }
      case 4: {
        this.F_CARRY === 1 && (r += (n & 65280) === (l & 65280) ? 1 : 2, this.REG_PC = l);
        break;
      }
      case 5: {
        this.F_ZERO === 0 && (r += (n & 65280) === (l & 65280) ? 1 : 2, this.REG_PC = l);
        break;
      }
      case 6: {
        e = this.load(l), this.F_SIGN = e >> 7 & 1, this.F_OVERFLOW = e >> 6 & 1, e &= this.REG_ACC, this.F_ZERO = e;
        break;
      }
      case 7: {
        this.F_SIGN === 1 && (r++, this.REG_PC = l);
        break;
      }
      case 8: {
        this.F_ZERO !== 0 && (r += (n & 65280) === (l & 65280) ? 1 : 2, this.REG_PC = l);
        break;
      }
      case 9: {
        this.F_SIGN === 0 && (r += (n & 65280) === (l & 65280) ? 1 : 2, this.REG_PC = l);
        break;
      }
      case 10: {
        this.REG_PC += 2, this.push(this.REG_PC >> 8 & 255), this.push(this.REG_PC & 255), this.F_BRK = 1, this.push(this.F_CARRY | (this.F_ZERO === 0 ? 1 : 0) << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7), this.F_INTERRUPT = 1, this.REG_PC = this.load16bit(65534), this.REG_PC--;
        break;
      }
      case 11: {
        this.F_OVERFLOW === 0 && (r += (n & 65280) === (l & 65280) ? 1 : 2, this.REG_PC = l);
        break;
      }
      case 12: {
        this.F_OVERFLOW === 1 && (r += (n & 65280) === (l & 65280) ? 1 : 2, this.REG_PC = l);
        break;
      }
      case 13: {
        this.F_CARRY = 0;
        break;
      }
      case 14: {
        this.F_DECIMAL = 0;
        break;
      }
      case 15: {
        this.F_INTERRUPT = 0;
        break;
      }
      case 16: {
        this.F_OVERFLOW = 0;
        break;
      }
      case 17: {
        e = this.REG_ACC - this.load(l), this.F_CARRY = e >= 0 ? 1 : 0, this.F_SIGN = e >> 7 & 1, this.F_ZERO = e & 255, r += a;
        break;
      }
      case 18: {
        e = this.REG_X - this.load(l), this.F_CARRY = e >= 0 ? 1 : 0, this.F_SIGN = e >> 7 & 1, this.F_ZERO = e & 255;
        break;
      }
      case 19: {
        e = this.REG_Y - this.load(l), this.F_CARRY = e >= 0 ? 1 : 0, this.F_SIGN = e >> 7 & 1, this.F_ZERO = e & 255;
        break;
      }
      case 20: {
        e = this.load(l) - 1 & 255, this.F_SIGN = e >> 7 & 1, this.F_ZERO = e, this.write(l, e);
        break;
      }
      case 21: {
        this.REG_X = this.REG_X - 1 & 255, this.F_SIGN = this.REG_X >> 7 & 1, this.F_ZERO = this.REG_X;
        break;
      }
      case 22: {
        this.REG_Y = this.REG_Y - 1 & 255, this.F_SIGN = this.REG_Y >> 7 & 1, this.F_ZERO = this.REG_Y;
        break;
      }
      case 23: {
        this.REG_ACC = (this.load(l) ^ this.REG_ACC) & 255, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, r += a;
        break;
      }
      case 24: {
        e = this.load(l) + 1 & 255, this.F_SIGN = e >> 7 & 1, this.F_ZERO = e, this.write(l, e & 255);
        break;
      }
      case 25: {
        this.REG_X = this.REG_X + 1 & 255, this.F_SIGN = this.REG_X >> 7 & 1, this.F_ZERO = this.REG_X;
        break;
      }
      case 26: {
        this.REG_Y++, this.REG_Y &= 255, this.F_SIGN = this.REG_Y >> 7 & 1, this.F_ZERO = this.REG_Y;
        break;
      }
      case 27: {
        this.REG_PC = l - 1;
        break;
      }
      case 28: {
        this.push(this.REG_PC >> 8 & 255), this.push(this.REG_PC & 255), this.REG_PC = l - 1;
        break;
      }
      case 29: {
        this.REG_ACC = this.load(l), this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, r += a;
        break;
      }
      case 30: {
        this.REG_X = this.load(l), this.F_SIGN = this.REG_X >> 7 & 1, this.F_ZERO = this.REG_X, r += a;
        break;
      }
      case 31: {
        this.REG_Y = this.load(l), this.F_SIGN = this.REG_Y >> 7 & 1, this.F_ZERO = this.REG_Y, r += a;
        break;
      }
      case 32: {
        o === 4 ? (e = this.REG_ACC & 255, this.F_CARRY = e & 1, e >>= 1, this.REG_ACC = e) : (e = this.load(l) & 255, this.F_CARRY = e & 1, e >>= 1, this.write(l, e)), this.F_SIGN = 0, this.F_ZERO = e;
        break;
      }
      case 33:
        break;
      case 34: {
        e = (this.load(l) | this.REG_ACC) & 255, this.F_SIGN = e >> 7 & 1, this.F_ZERO = e, this.REG_ACC = e, o !== 11 && (r += a);
        break;
      }
      case 35: {
        this.push(this.REG_ACC);
        break;
      }
      case 36: {
        this.F_BRK = 1, this.push(this.F_CARRY | (this.F_ZERO === 0 ? 1 : 0) << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7);
        break;
      }
      case 37: {
        this.REG_ACC = this.pull(), this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC;
        break;
      }
      case 38: {
        e = this.pull(), this.F_CARRY = e & 1, this.F_ZERO = (e >> 1 & 1) === 1 ? 0 : 1, this.F_INTERRUPT = e >> 2 & 1, this.F_DECIMAL = e >> 3 & 1, this.F_BRK = e >> 4 & 1, this.F_NOTUSED = e >> 5 & 1, this.F_OVERFLOW = e >> 6 & 1, this.F_SIGN = e >> 7 & 1, this.F_NOTUSED = 1;
        break;
      }
      case 39: {
        o === 4 ? (e = this.REG_ACC, t = this.F_CARRY, this.F_CARRY = e >> 7 & 1, e = (e << 1 & 255) + t, this.REG_ACC = e) : (e = this.load(l), t = this.F_CARRY, this.F_CARRY = e >> 7 & 1, e = (e << 1 & 255) + t, this.write(l, e)), this.F_SIGN = e >> 7 & 1, this.F_ZERO = e;
        break;
      }
      case 40: {
        o === 4 ? (t = this.F_CARRY << 7, this.F_CARRY = this.REG_ACC & 1, e = (this.REG_ACC >> 1) + t, this.REG_ACC = e) : (e = this.load(l), t = this.F_CARRY << 7, this.F_CARRY = e & 1, e = (e >> 1) + t, this.write(l, e)), this.F_SIGN = e >> 7 & 1, this.F_ZERO = e;
        break;
      }
      case 41: {
        if (e = this.pull(), this.F_CARRY = e & 1, this.F_ZERO = (e >> 1 & 1) === 0 ? 1 : 0, this.F_INTERRUPT = e >> 2 & 1, this.F_DECIMAL = e >> 3 & 1, this.F_BRK = e >> 4 & 1, this.F_NOTUSED = e >> 5 & 1, this.F_OVERFLOW = e >> 6 & 1, this.F_SIGN = e >> 7 & 1, this.REG_PC = this.pull(), this.REG_PC += this.pull() << 8, this.REG_PC === 65535)
          return 0;
        this.REG_PC--, this.F_NOTUSED = 1;
        break;
      }
      case 42: {
        if (this.REG_PC = this.pull(), this.REG_PC += this.pull() << 8, this.REG_PC === 65535)
          return 0;
        break;
      }
      case 43: {
        e = this.REG_ACC - this.load(l) - (1 - this.F_CARRY), this.F_SIGN = e >> 7 & 1, this.F_ZERO = e & 255, ((this.REG_ACC ^ e) & 128) !== 0 && ((this.REG_ACC ^ this.load(l)) & 128) !== 0 ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = e < 0 ? 0 : 1, this.REG_ACC = e & 255, o !== 11 && (r += a);
        break;
      }
      case 44: {
        this.F_CARRY = 1;
        break;
      }
      case 45: {
        this.F_DECIMAL = 1;
        break;
      }
      case 46: {
        this.F_INTERRUPT = 1;
        break;
      }
      case 47: {
        this.write(l, this.REG_ACC);
        break;
      }
      case 48: {
        this.write(l, this.REG_X);
        break;
      }
      case 49: {
        this.write(l, this.REG_Y);
        break;
      }
      case 50: {
        this.REG_X = this.REG_ACC, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC;
        break;
      }
      case 51: {
        this.REG_Y = this.REG_ACC, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC;
        break;
      }
      case 52: {
        this.REG_X = this.REG_SP - 256, this.F_SIGN = this.REG_SP >> 7 & 1, this.F_ZERO = this.REG_X;
        break;
      }
      case 53: {
        this.REG_ACC = this.REG_X, this.F_SIGN = this.REG_X >> 7 & 1, this.F_ZERO = this.REG_X;
        break;
      }
      case 54: {
        this.REG_SP = this.REG_X + 256, this.stackWrap();
        break;
      }
      case 55: {
        this.REG_ACC = this.REG_Y, this.F_SIGN = this.REG_Y >> 7 & 1, this.F_ZERO = this.REG_Y;
        break;
      }
      case 56: {
        e = this.REG_ACC & this.load(l), this.F_CARRY = e & 1, this.REG_ACC = this.F_ZERO = e >> 1, this.F_SIGN = 0;
        break;
      }
      case 57: {
        this.REG_ACC = this.F_ZERO = this.REG_ACC & this.load(l), this.F_CARRY = this.F_SIGN = this.REG_ACC >> 7 & 1;
        break;
      }
      case 58: {
        e = this.REG_ACC & this.load(l), this.REG_ACC = this.F_ZERO = (e >> 1) + (this.F_CARRY << 7), this.F_SIGN = this.F_CARRY, this.F_CARRY = e >> 7 & 1, this.F_OVERFLOW = (e >> 7 ^ e >> 6) & 1;
        break;
      }
      case 59: {
        e = (this.REG_X & this.REG_ACC) - this.load(l), this.F_SIGN = e >> 7 & 1, this.F_ZERO = e & 255, ((this.REG_X ^ e) & 128) !== 0 && ((this.REG_X ^ this.load(l)) & 128) !== 0 ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = e < 0 ? 0 : 1, this.REG_X = e & 255;
        break;
      }
      case 60: {
        this.REG_ACC = this.REG_X = this.F_ZERO = this.load(l), this.F_SIGN = this.REG_ACC >> 7 & 1, r += a;
        break;
      }
      case 61: {
        this.write(l, this.REG_ACC & this.REG_X);
        break;
      }
      case 62: {
        e = this.load(l) - 1 & 255, this.write(l, e), e = this.REG_ACC - e, this.F_CARRY = e >= 0 ? 1 : 0, this.F_SIGN = e >> 7 & 1, this.F_ZERO = e & 255, o !== 11 && (r += a);
        break;
      }
      case 63: {
        e = this.load(l) + 1 & 255, this.write(l, e), e = this.REG_ACC - e - (1 - this.F_CARRY), this.F_SIGN = e >> 7 & 1, this.F_ZERO = e & 255, ((this.REG_ACC ^ e) & 128) !== 0 && ((this.REG_ACC ^ this.load(l)) & 128) !== 0 ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = e < 0 ? 0 : 1, this.REG_ACC = e & 255, o !== 11 && (r += a);
        break;
      }
      case 64: {
        e = this.load(l), t = this.F_CARRY, this.F_CARRY = e >> 7 & 1, e = (e << 1 & 255) + t, this.write(l, e), this.REG_ACC = this.REG_ACC & e, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, o !== 11 && (r += a);
        break;
      }
      case 65: {
        e = this.load(l), t = this.F_CARRY << 7, this.F_CARRY = e & 1, e = (e >> 1) + t, this.write(l, e), e = this.REG_ACC + this.load(l) + this.F_CARRY, ((this.REG_ACC ^ this.load(l)) & 128) === 0 && ((this.REG_ACC ^ e) & 128) !== 0 ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = e > 255 ? 1 : 0, this.F_SIGN = e >> 7 & 1, this.F_ZERO = e & 255, this.REG_ACC = e & 255, o !== 11 && (r += a);
        break;
      }
      case 66: {
        e = this.load(l), this.F_CARRY = e >> 7 & 1, e = e << 1 & 255, this.write(l, e), this.REG_ACC = this.REG_ACC | e, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, o !== 11 && (r += a);
        break;
      }
      case 67: {
        e = this.load(l) & 255, this.F_CARRY = e & 1, e >>= 1, this.write(l, e), this.REG_ACC = this.REG_ACC ^ e, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, o !== 11 && (r += a);
        break;
      }
      case 68:
        break;
      case 69: {
        this.load(l), o !== 11 && (r += a);
        break;
      }
      default: {
        this.nes.stop(), this.nes.crashMessage = `Game crashed, invalid opcode at address $${n.toString(16)}`;
        break;
      }
    }
    return r;
  }
  load(e) {
    return e < 8192 ? this.mem[e & 2047] : this.nes.mmap.load(e);
  }
  load16bit(e) {
    return e < 8191 ? this.mem[e & 2047] | this.mem[e + 1 & 2047] << 8 : this.nes.mmap.load(e) | this.nes.mmap.load(e + 1) << 8;
  }
  write(e, t) {
    e < 8192 ? this.mem[e & 2047] = t : this.nes.mmap.write(e, t);
  }
  requestIrq(e) {
    this.irqRequested && e === this.IRQ_NORMAL || (this.irqRequested = !0, this.irqType = e);
  }
  push(e) {
    this.nes.mmap.write(this.REG_SP, e), this.REG_SP--, this.REG_SP = 256 | this.REG_SP & 255;
  }
  stackWrap() {
    this.REG_SP = 256 | this.REG_SP & 255;
  }
  pull() {
    return this.REG_SP++, this.REG_SP = 256 | this.REG_SP & 255, this.nes.mmap.load(this.REG_SP);
  }
  pageCrossed(e, t) {
    return (e & 65280) !== (t & 65280);
  }
  haltCycles(e) {
    this.cyclesToHalt += e;
  }
  doNonMaskableInterrupt(e) {
    (this.nes.mmap.load(8192) & 128) !== 0 && (this.REG_PC_NEW++, this.push(this.REG_PC_NEW >> 8 & 255), this.push(this.REG_PC_NEW & 255), this.push(e), this.REG_PC_NEW = this.nes.mmap.load(65530) | this.nes.mmap.load(65531) << 8, this.REG_PC_NEW--);
  }
  doResetInterrupt() {
    this.REG_PC_NEW = this.nes.mmap.load(65532) | this.nes.mmap.load(65533) << 8, this.REG_PC_NEW--;
  }
  setStatus(e) {
    this.F_CARRY = (e & 1) >> 0, this.F_DECIMAL = (e & 2) >> 1, this.F_INTERRUPT = (e & 4) >> 2, this.F_OVERFLOW = (e & 8) >> 3, this.F_SIGN = (e & 16) >> 4, this.F_ZERO = (e & 32) >> 5;
  }
  getStatus() {
    return this.F_CARRY << 0 | this.F_ZERO << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7;
  }
  doIrq(e) {
    this.REG_PC_NEW++, this.push(this.REG_PC_NEW >> 8 & 255), this.push(this.REG_PC_NEW & 255), this.push(e), this.F_INTERRUPT_NEW = 1, this.F_BRK_NEW = 0, this.REG_PC_NEW = this.nes.mmap.load(65534) | this.nes.mmap.load(65535) << 8, this.REG_PC_NEW--;
  }
  jmp(e) {
    this.REG_PC = e & 65535;
  }
  jsr(e) {
    const t = this.REG_PC - 1;
    this.push(t >> 8 & 255), this.push(t & 255), this.jmp(e);
  }
  toJSON() {
    const e = At(this);
    return e.mem = Bt(this.mem), e;
  }
  fromJSON(e) {
    e.mem = Mt(e.mem), Ct(this, e);
  }
}
class $ {
  constructor() {
    h(this, "state");
    this.state = new Array(8).fill(64);
  }
  buttonDown(e) {
    this.state[e] = 65;
  }
  buttonUp(e) {
    this.state[e] = 64;
  }
}
h($, "BUTTON_A", 0), h($, "BUTTON_B", 1), h($, "BUTTON_SELECT", 2), h($, "BUTTON_START", 3), h($, "BUTTON_UP", 4), h($, "BUTTON_DOWN", 5), h($, "BUTTON_LEFT", 6), h($, "BUTTON_RIGHT", 7);
class fr {
  constructor() {
    h(this, "pix", new Array(64));
    h(this, "fbIndex", 0);
    h(this, "tIndex", 0);
    h(this, "x", 0);
    h(this, "y", 0);
    h(this, "w", 0);
    h(this, "h", 0);
    h(this, "incX", 0);
    h(this, "incY", 0);
    h(this, "palIndex", 0);
    h(this, "tpri", 0);
    h(this, "c", 0);
    h(this, "initialized", !1);
    h(this, "opaque", new Array(8));
  }
  setBuffer(e) {
    for (this.y = 0; this.y < 8; this.y++)
      this.setScanline(this.y, e[this.y], e[this.y + 8]);
  }
  setScanline(e, t, s) {
    for (this.initialized = !0, this.tIndex = e << 3, this.x = 0; this.x < 8; this.x++)
      this.pix[this.tIndex + this.x] = (t >> 7 - this.x & 1) + ((s >> 7 - this.x & 1) << 1), this.pix[this.tIndex + this.x] === 0 && (this.opaque[e] = !1);
  }
  isTransparent(e, t) {
    return this.pix[(t << 3) + e] === 0;
  }
  toJSON() {
    return {
      opaque: this.opaque,
      pix: this.pix
    };
  }
  fromJSON(e) {
    this.opaque = e.opaque, this.pix = e.pix;
  }
  render(e, t, s, r, a, o, n, l, f, c, d, _, p) {
    if (!(o < -7 || o >= 256 || n < -7 || n >= 240))
      if (this.w = r - t, this.h = a - s, o < 0 && (t -= o), o + r >= 256 && (r = 256 - o), n < 0 && (s -= n), n + a >= 240 && (a = 240 - n), !c && !d)
        for (this.fbIndex = (n << 8) + o, this.tIndex = 0, this.y = 0; this.y < 8; this.y++) {
          for (this.x = 0; this.x < 8; this.x++)
            this.x >= t && this.x < r && this.y >= s && this.y < a && (this.palIndex = this.pix[this.tIndex], this.tpri = p[this.fbIndex], this.palIndex !== 0 && _ <= (this.tpri & 255) && (e[this.fbIndex] = f[this.palIndex + l], this.tpri = this.tpri & 3840 | _, p[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex++;
          this.fbIndex -= 8, this.fbIndex += 256;
        }
      else if (c && !d)
        for (this.fbIndex = (n << 8) + o, this.tIndex = 7, this.y = 0; this.y < 8; this.y++) {
          for (this.x = 0; this.x < 8; this.x++)
            this.x >= t && this.x < r && this.y >= s && this.y < a && (this.palIndex = this.pix[this.tIndex], this.tpri = p[this.fbIndex], this.palIndex !== 0 && _ <= (this.tpri & 255) && (e[this.fbIndex] = f[this.palIndex + l], this.tpri = this.tpri & 3840 | _, p[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex--;
          this.fbIndex -= 8, this.fbIndex += 256, this.tIndex += 16;
        }
      else if (d && !c)
        for (this.fbIndex = (n << 8) + o, this.tIndex = 56, this.y = 0; this.y < 8; this.y++) {
          for (this.x = 0; this.x < 8; this.x++)
            this.x >= t && this.x < r && this.y >= s && this.y < a && (this.palIndex = this.pix[this.tIndex], this.tpri = p[this.fbIndex], this.palIndex !== 0 && _ <= (this.tpri & 255) && (e[this.fbIndex] = f[this.palIndex + l], this.tpri = this.tpri & 3840 | _, p[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex++;
          this.fbIndex -= 8, this.fbIndex += 256, this.tIndex -= 16;
        }
      else
        for (this.fbIndex = (n << 8) + o, this.tIndex = 63, this.y = 0; this.y < 8; this.y++) {
          for (this.x = 0; this.x < 8; this.x++)
            this.x >= t && this.x < r && this.y >= s && this.y < a && (this.palIndex = this.pix[this.tIndex], this.tpri = p[this.fbIndex], this.palIndex !== 0 && _ <= (this.tpri & 255) && (e[this.fbIndex] = f[this.palIndex + l], this.tpri = this.tpri & 3840 | _, p[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex--;
          this.fbIndex -= 8, this.fbIndex += 256;
        }
  }
}
class C0 {
  constructor(e, t, s) {
    h(this, "width");
    h(this, "height");
    h(this, "name");
    h(this, "tile");
    h(this, "attrib");
    this.width = e, this.height = t, this.name = s, this.tile = new Array(e * t), this.attrib = new Array(e * t);
    for (let r = 0; r < e * t; r++)
      this.tile[r] = 0, this.attrib[r] = 0;
  }
  getTileIndex(e, t) {
    return this.tile[t * this.width + e];
  }
  getAttrib(e, t) {
    return this.attrib[t * this.width + e];
  }
  writeAttrib(e, t) {
    const s = e % 8 * 4, r = Math.floor(e / 8) * 4;
    let a, o, n, l;
    for (let f = 0; f < 2; f++)
      for (let c = 0; c < 2; c++) {
        a = t >> 2 * (f * 2 + c) & 3;
        for (let d = 0; d < 2; d++)
          for (let _ = 0; _ < 2; _++)
            o = s + c * 2 + _, n = r + f * 2 + d, l = n * this.width + o, this.attrib[l] = a << 2 & 12;
      }
  }
  toJSON() {
    return {
      tile: this.tile,
      attrib: this.attrib
    };
  }
  fromJSON(e) {
    this.tile = e.tile, this.attrib = e.attrib;
  }
}
class E0 {
  constructor() {
    h(this, "curTable", new Array(64));
    h(this, "emphTable");
    h(this, "currentEmph", 0);
    this.emphTable = [];
  }
  reset() {
    this.setEmphasis(0);
  }
  loadNTSCPalette() {
    this.curTable = [5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0], this.makeTables(), this.setEmphasis(0);
  }
  loadPALPalette() {
    this.curTable = [5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0], this.makeTables(), this.setEmphasis(0);
  }
  makeTables() {
    let e, t, s, r, a, o, n, l;
    for (let f = 0; f < 8; f++)
      for (o = 1, n = 1, l = 1, (f & 1) !== 0 && (o = 0.75, l = 0.75), (f & 2) !== 0 && (o = 0.75, n = 0.75), (f & 4) !== 0 && (n = 0.75, l = 0.75), this.emphTable[f] = new Array(64), a = 0; a < 64; a++)
        r = this.curTable[a], e = Math.floor(this.getRed(r) * o), t = Math.floor(this.getGreen(r) * n), s = Math.floor(this.getBlue(r) * l), this.emphTable[f][a] = this.getRgb(e, t, s);
  }
  setEmphasis(e) {
    if (e !== this.currentEmph) {
      this.currentEmph = e;
      for (let t = 0; t < 64; t++)
        this.curTable[t] = this.emphTable[e][t];
    }
  }
  getEntry(e) {
    return this.curTable[e];
  }
  getRed(e) {
    return e >> 16 & 255;
  }
  getGreen(e) {
    return e >> 8 & 255;
  }
  getBlue(e) {
    return e & 255;
  }
  getRgb(e, t, s) {
    return e << 16 | t << 8 | s;
  }
  loadDefaultPalette() {
    this.curTable[0] = this.getRgb(117, 117, 117), this.curTable[1] = this.getRgb(39, 27, 143), this.curTable[2] = this.getRgb(0, 0, 171), this.curTable[3] = this.getRgb(71, 0, 159), this.curTable[4] = this.getRgb(143, 0, 119), this.curTable[5] = this.getRgb(171, 0, 19), this.curTable[6] = this.getRgb(167, 0, 0), this.curTable[7] = this.getRgb(127, 11, 0), this.curTable[8] = this.getRgb(67, 47, 0), this.curTable[9] = this.getRgb(0, 71, 0), this.curTable[10] = this.getRgb(0, 81, 0), this.curTable[11] = this.getRgb(0, 63, 23), this.curTable[12] = this.getRgb(27, 63, 95), this.curTable[13] = this.getRgb(0, 0, 0), this.curTable[14] = this.getRgb(0, 0, 0), this.curTable[15] = this.getRgb(0, 0, 0), this.curTable[16] = this.getRgb(188, 188, 188), this.curTable[17] = this.getRgb(0, 115, 239), this.curTable[18] = this.getRgb(35, 59, 239), this.curTable[19] = this.getRgb(131, 0, 243), this.curTable[20] = this.getRgb(191, 0, 191), this.curTable[21] = this.getRgb(231, 0, 91), this.curTable[22] = this.getRgb(219, 43, 0), this.curTable[23] = this.getRgb(203, 79, 15), this.curTable[24] = this.getRgb(139, 115, 0), this.curTable[25] = this.getRgb(0, 151, 0), this.curTable[26] = this.getRgb(0, 171, 0), this.curTable[27] = this.getRgb(0, 147, 59), this.curTable[28] = this.getRgb(0, 131, 139), this.curTable[29] = this.getRgb(0, 0, 0), this.curTable[30] = this.getRgb(0, 0, 0), this.curTable[31] = this.getRgb(0, 0, 0), this.curTable[32] = this.getRgb(255, 255, 255), this.curTable[33] = this.getRgb(63, 191, 255), this.curTable[34] = this.getRgb(95, 151, 255), this.curTable[35] = this.getRgb(167, 139, 253), this.curTable[36] = this.getRgb(247, 123, 255), this.curTable[37] = this.getRgb(255, 119, 183), this.curTable[38] = this.getRgb(255, 119, 99), this.curTable[39] = this.getRgb(255, 155, 59), this.curTable[40] = this.getRgb(243, 191, 63), this.curTable[41] = this.getRgb(131, 211, 19), this.curTable[42] = this.getRgb(79, 223, 75), this.curTable[43] = this.getRgb(88, 248, 152), this.curTable[44] = this.getRgb(0, 235, 219), this.curTable[45] = this.getRgb(0, 0, 0), this.curTable[46] = this.getRgb(0, 0, 0), this.curTable[47] = this.getRgb(0, 0, 0), this.curTable[48] = this.getRgb(255, 255, 255), this.curTable[49] = this.getRgb(171, 231, 255), this.curTable[50] = this.getRgb(199, 215, 255), this.curTable[51] = this.getRgb(215, 203, 255), this.curTable[52] = this.getRgb(255, 199, 255), this.curTable[53] = this.getRgb(255, 199, 219), this.curTable[54] = this.getRgb(255, 191, 179), this.curTable[55] = this.getRgb(255, 219, 171), this.curTable[56] = this.getRgb(255, 231, 163), this.curTable[57] = this.getRgb(227, 255, 163), this.curTable[58] = this.getRgb(171, 243, 191), this.curTable[59] = this.getRgb(179, 255, 207), this.curTable[60] = this.getRgb(159, 255, 243), this.curTable[61] = this.getRgb(0, 0, 0), this.curTable[62] = this.getRgb(0, 0, 0), this.curTable[63] = this.getRgb(0, 0, 0), this.makeTables(), this.setEmphasis(0);
  }
}
class ci {
  constructor(e) {
    h(this, "nes");
    // Keep Chrome happy
    h(this, "vramMem");
    h(this, "spriteMem");
    h(this, "vramAddress", 0);
    h(this, "vramTmpAddress", 0);
    h(this, "vramBufferedReadValue", 0);
    h(this, "firstWrite", !0);
    h(this, "sramAddress", 0);
    h(this, "currentMirroring", 0);
    h(this, "requestEndFrame", !1);
    h(this, "nmiOk", !1);
    h(this, "dummyCycleToggle", !1);
    h(this, "validTileData", !1);
    h(this, "nmiCounter", 0);
    h(this, "scanlineAlreadyRendered", !1);
    h(this, "f_nmiOnVblank", 0);
    h(this, "f_spriteSize", 0);
    h(this, "f_bgPatternTable", 0);
    h(this, "f_spPatternTable", 0);
    h(this, "f_addrInc", 0);
    h(this, "f_nTblAddress", 0);
    h(this, "f_color", 0);
    h(this, "f_spVisibility", 0);
    h(this, "f_bgVisibility", 0);
    h(this, "f_spClipping", 0);
    h(this, "f_bgClipping", 0);
    h(this, "f_dispType", 0);
    h(this, "cntFV", 0);
    h(this, "cntV", 0);
    h(this, "cntH", 0);
    h(this, "cntVT", 0);
    h(this, "cntHT", 0);
    h(this, "regFV", 0);
    h(this, "regV", 0);
    h(this, "regH", 0);
    h(this, "regVT", 0);
    h(this, "regHT", 0);
    h(this, "regFH", 0);
    h(this, "regS", 0);
    h(this, "curNt", 0);
    h(this, "attrib");
    h(this, "buffer");
    h(this, "bgbuffer");
    h(this, "pixrendered");
    h(this, "srcy1", 0);
    h(this, "srcy2", 8);
    h(this, "scantile");
    h(this, "scanline", 0);
    h(this, "lastRenderedScanline", 0);
    h(this, "curX", 0);
    h(this, "sprX");
    h(this, "sprY");
    h(this, "sprTile");
    h(this, "sprCol");
    h(this, "vertFlip");
    h(this, "horiFlip");
    h(this, "bgPriority");
    h(this, "spr0HitX", 0);
    h(this, "spr0HitY", 0);
    h(this, "hitSpr0", !1);
    h(this, "sprPalette");
    h(this, "imgPalette");
    h(this, "ptTile");
    h(this, "ntable1");
    h(this, "nameTable");
    h(this, "vramMirrorTable");
    h(this, "palTable");
    h(this, "chrBankOffset", 0);
    // Rendering Options:
    h(this, "showSpr0Hit", !1);
    h(this, "clipToTvSize", !0);
    h(this, "STATUS_VRAMWRITE", 4);
    h(this, "STATUS_SLSPRITECOUNT", 5);
    h(this, "STATUS_SPRITE0HIT", 6);
    h(this, "STATUS_VBLANK", 7);
    h(this, "JSON_PROPERTIES", [
      // Memory
      "vramMem",
      "spriteMem",
      // Counters
      "cntFV",
      "cntV",
      "cntH",
      "cntVT",
      "cntHT",
      // Registers
      "regFV",
      "regV",
      "regH",
      "regVT",
      "regHT",
      "regFH",
      "regS",
      // VRAM addr
      "vramAddress",
      "vramTmpAddress",
      // Control/Status registers
      "f_nmiOnVblank",
      "f_spriteSize",
      "f_bgPatternTable",
      "f_spPatternTable",
      "f_addrInc",
      "f_nTblAddress",
      "f_color",
      "f_spVisibility",
      "f_bgVisibility",
      "f_spClipping",
      "f_bgClipping",
      "f_dispType",
      // VRAM I/O
      "vramBufferedReadValue",
      "firstWrite",
      // Mirroring
      // 'vramMirrorTable',
      "currentMirroring",
      "ntable1",
      // SPR-RAM I/O
      "sramAddress",
      // Sprites. Most sprite data is rebuilt from spriteMem
      "hitSpr0",
      // Palettes
      "sprPalette",
      "imgPalette",
      // Rendering progression
      "curX",
      "scanline",
      "lastRenderedScanline",
      "curNt",
      "scantile",
      // Used during rendering
      // 'attrib',
      // 'buffer',
      // 'bgbuffer',
      // 'pixrendered',
      // Misc
      "requestEndFrame",
      "nmiOk",
      "dummyCycleToggle",
      "nmiCounter",
      "validTileData",
      "scanlineAlreadyRendered",
      "chrBankOffset"
    ]);
    h(this, "KEEP_OPTIONS", ["showSpr0Hit", "clipToTvSize"]);
    this.nes = e;
    let t;
    for (this.vramMem = new Array(32768), this.spriteMem = new Array(256), t = 0; t < this.vramMem.length; t++)
      this.vramMem[t] = 0;
    for (t = 0; t < this.spriteMem.length; t++)
      this.spriteMem[t] = 0;
    for (this.vramAddress = 0, this.vramTmpAddress = 0, this.vramBufferedReadValue = 0, this.firstWrite = !0, this.sramAddress = 0, this.currentMirroring = -1, this.requestEndFrame = !1, this.nmiOk = !1, this.dummyCycleToggle = !1, this.validTileData = !1, this.nmiCounter = 0, this.scanlineAlreadyRendered = !1, this.f_nmiOnVblank = 0, this.f_spriteSize = 0, this.f_bgPatternTable = 0, this.f_spPatternTable = 0, this.f_addrInc = 0, this.f_nTblAddress = 0, this.f_color = 0, this.f_spVisibility = 0, this.f_bgVisibility = 0, this.f_spClipping = 0, this.f_bgClipping = 0, this.f_dispType = 0, this.cntFV = 0, this.cntV = 0, this.cntH = 0, this.cntVT = 0, this.cntHT = 0, this.regFV = 0, this.regV = 0, this.regH = 0, this.regVT = 0, this.regHT = 0, this.regFH = 0, this.regS = 0, this.curNt = 0, this.attrib = new Array(32), this.buffer = new Array(256 * 240), this.bgbuffer = new Array(256 * 240), this.pixrendered = new Array(256 * 240), this.validTileData = !1, this.scantile = new Array(32), this.scanline = 0, this.lastRenderedScanline = -1, this.curX = 0, this.sprX = new Array(64), this.sprY = new Array(64), this.sprTile = new Array(64), this.sprCol = new Array(64), this.vertFlip = new Array(64), this.horiFlip = new Array(64), this.bgPriority = new Array(64), this.spr0HitX = 0, this.spr0HitY = 0, this.hitSpr0 = !1, this.sprPalette = new Array(16), this.imgPalette = new Array(16), this.ptTile = new Array(512), t = 0; t < 512; t++)
      this.ptTile[t] = new fr();
    for (this.ntable1 = new Array(4), this.currentMirroring = -1, this.nameTable = new Array(4), t = 0; t < 4; t++)
      this.nameTable[t] = new C0(32, 32, `Nt${t}`);
    for (this.vramMirrorTable = new Array(32768), t = 0; t < 32768; t++)
      this.vramMirrorTable[t] = t;
    this.palTable = new E0(), this.palTable.loadNTSCPalette(), this.updateControlReg1(0), this.updateControlReg2(0);
  }
  reset() {
    const e = new ci(this.nes);
    for (const t of this.KEEP_OPTIONS)
      e[t] = this[t];
    Object.assign(this, e);
  }
  setChrBankOffset(e) {
    this.chrBankOffset = e, this.triggerRendering();
  }
  setMirroring(e) {
    if (e !== this.currentMirroring) {
      this.currentMirroring = e, this.triggerRendering(), this.vramMirrorTable == null && (this.vramMirrorTable = new Array(32768));
      for (let t = 0; t < 32768; t++)
        this.vramMirrorTable[t] = t;
      this.defineMirrorRegion(16160, 16128, 32), this.defineMirrorRegion(16192, 16128, 32), this.defineMirrorRegion(16256, 16128, 32), this.defineMirrorRegion(16320, 16128, 32), this.defineMirrorRegion(12288, 8192, 3840), this.defineMirrorRegion(16384, 0, 16384), e === this.nes.rom.HORIZONTAL_MIRRORING ? (this.ntable1[0] = 0, this.ntable1[1] = 0, this.ntable1[2] = 1, this.ntable1[3] = 1, this.defineMirrorRegion(9216, 8192, 1024), this.defineMirrorRegion(11264, 10240, 1024)) : e === this.nes.rom.VERTICAL_MIRRORING ? (this.ntable1[0] = 0, this.ntable1[1] = 1, this.ntable1[2] = 0, this.ntable1[3] = 1, this.defineMirrorRegion(10240, 8192, 1024), this.defineMirrorRegion(11264, 9216, 1024)) : e === this.nes.rom.SINGLESCREEN_MIRRORING ? (this.ntable1[0] = 0, this.ntable1[1] = 0, this.ntable1[2] = 0, this.ntable1[3] = 0, this.defineMirrorRegion(9216, 8192, 1024), this.defineMirrorRegion(10240, 8192, 1024), this.defineMirrorRegion(11264, 8192, 1024)) : e === this.nes.rom.SINGLESCREEN_MIRRORING2 ? (this.ntable1[0] = 1, this.ntable1[1] = 1, this.ntable1[2] = 1, this.ntable1[3] = 1, this.defineMirrorRegion(9216, 9216, 1024), this.defineMirrorRegion(10240, 9216, 1024), this.defineMirrorRegion(11264, 9216, 1024)) : (this.ntable1[0] = 0, this.ntable1[1] = 1, this.ntable1[2] = 2, this.ntable1[3] = 3);
    }
  }
  // Define a mirrored area in the address lookup table.
  // Assumes the regions don't overlap.
  // The 'to' region is the region that is physically in memory.
  defineMirrorRegion(e, t, s) {
    for (let r = 0; r < s; r++)
      this.vramMirrorTable[e + r] = t + r;
  }
  startVBlank() {
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NMI), this.lastRenderedScanline < 239 && this.renderFramePartially(this.lastRenderedScanline + 1, 240 - this.lastRenderedScanline), this.endFrame(), this.lastRenderedScanline = -1;
  }
  endScanline() {
    switch (this.scanline) {
      case 19:
        this.dummyCycleToggle && (this.curX = 1, this.dummyCycleToggle = !this.dummyCycleToggle);
        break;
      case 20:
        this.setStatusFlag(this.STATUS_VBLANK, !1), this.setStatusFlag(this.STATUS_SPRITE0HIT, !1), this.hitSpr0 = !1, this.spr0HitX = -1, this.spr0HitY = -1, (this.f_bgVisibility === 1 || this.f_spVisibility === 1) && (this.cntFV = this.regFV, this.cntV = this.regV, this.cntH = this.regH, this.cntVT = this.regVT, this.cntHT = this.regHT, this.f_bgVisibility === 1 && this.renderBgScanline(!1, 0)), this.f_bgVisibility === 1 && this.f_spVisibility === 1 && this.checkSprite0(0), (this.f_bgVisibility === 1 || this.f_spVisibility === 1) && this.nes.mmap.clockIrqCounter();
        break;
      case 261:
        this.setStatusFlag(this.STATUS_VBLANK, !0), this.requestEndFrame = !0, this.nmiCounter = 9, this.scanline = -1;
        break;
      default:
        this.scanline >= 21 && this.scanline <= 260 && (this.f_bgVisibility === 1 && (this.scanlineAlreadyRendered || (this.cntHT = this.regHT, this.cntH = this.regH, this.renderBgScanline(!0, this.scanline + 1 - 21)), this.scanlineAlreadyRendered = !1, !this.hitSpr0 && this.f_spVisibility === 1 && this.sprX[0] >= -7 && this.sprX[0] < 256 && this.sprY[0] + 1 <= this.scanline - 20 && this.sprY[0] + 1 + (this.f_spriteSize === 0 ? 8 : 16) >= this.scanline - 20 && this.checkSprite0(this.scanline - 20) && (this.hitSpr0 = !0)), (this.f_bgVisibility === 1 || this.f_spVisibility === 1) && this.nes.mmap.clockIrqCounter());
    }
    this.scanline++, this.regsToAddress(), this.cntsToAddress();
  }
  startFrame() {
    let e = 0;
    if (this.f_dispType === 0)
      e = this.imgPalette[0];
    else
      switch (this.f_color) {
        case 0:
          e = 0;
          break;
        case 1:
          e = 65280;
          break;
        case 2:
          e = 16711680;
          break;
        case 3:
          e = 0;
          break;
        case 4:
          e = 255;
          break;
        default:
          e = 0;
      }
    const t = this.buffer;
    let s;
    for (s = 0; s < 256 * 240; s++)
      t[s] = e;
    const r = this.pixrendered;
    for (s = 0; s < r.length; s++)
      r[s] = 65;
  }
  endFrame() {
    let e, t, s;
    const r = this.buffer;
    if (this.showSpr0Hit) {
      if (this.sprX[0] >= 0 && this.sprX[0] < 256 && this.sprY[0] >= 0 && this.sprY[0] < 240) {
        for (e = 0; e < 256; e++)
          r[(this.sprY[0] << 8) + e] = 16733525;
        for (e = 0; e < 240; e++)
          r[(e << 8) + this.sprX[0]] = 16733525;
      }
      if (this.spr0HitX >= 0 && this.spr0HitX < 256 && this.spr0HitY >= 0 && this.spr0HitY < 240) {
        for (e = 0; e < 256; e++)
          r[(this.spr0HitY << 8) + e] = 5635925;
        for (e = 0; e < 240; e++)
          r[(e << 8) + this.spr0HitX] = 5635925;
      }
    }
    if (this.clipToTvSize || this.f_bgClipping === 0 || this.f_spClipping === 0)
      for (s = 0; s < 240; s++)
        for (t = 0; t < 8; t++)
          r[(s << 8) + t] = 0;
    if (this.clipToTvSize)
      for (s = 0; s < 240; s++)
        for (t = 0; t < 8; t++)
          r[(s << 8) + 255 - t] = 0;
    if (this.clipToTvSize)
      for (s = 0; s < 8; s++)
        for (t = 0; t < 256; t++)
          r[(s << 8) + t] = 0, r[(239 - s << 8) + t] = 0;
    this.nes.ui.writeFrame(r);
  }
  updateControlReg1(e) {
    this.triggerRendering(), this.f_nmiOnVblank = e >> 7 & 1, this.f_spriteSize = e >> 5 & 1, this.f_bgPatternTable = e >> 4 & 1, this.f_spPatternTable = e >> 3 & 1, this.f_addrInc = e >> 2 & 1, this.f_nTblAddress = e & 3, this.regV = e >> 1 & 1, this.regH = e & 1, this.regS = e >> 4 & 1;
  }
  updateControlReg2(e) {
    this.triggerRendering(), this.f_color = e >> 5 & 7, this.f_spVisibility = e >> 4 & 1, this.f_bgVisibility = e >> 3 & 1, this.f_spClipping = e >> 2 & 1, this.f_bgClipping = e >> 1 & 1, this.f_dispType = e & 1, this.f_dispType === 0 && this.palTable.setEmphasis(this.f_color), this.updatePalettes();
  }
  setStatusFlag(e, t) {
    const s = 1 << e;
    this.nes.cpu.mem[8194] = this.nes.cpu.mem[8194] & 255 - s | (t ? s : 0);
  }
  // CPU Register $2002:
  // Read the Status Register.
  readStatusRegister() {
    const e = this.nes.cpu.mem[8194];
    return this.firstWrite = !0, this.setStatusFlag(this.STATUS_VBLANK, !1), e;
  }
  // CPU Register $2003:
  // Write the SPR-RAM address that is used for sramWrite (Register 0x2004 in CPU memory map)
  writeSRAMAddress(e) {
    this.sramAddress = e;
  }
  // CPU Register $2004 (R):
  // Read from SPR-RAM (Sprite RAM).
  // The address should be set first.
  sramLoad() {
    return this.spriteMem[this.sramAddress];
  }
  // CPU Register $2004 (W):
  // Write to SPR-RAM (Sprite RAM).
  // The address should be set first.
  sramWrite(e) {
    this.spriteMem[this.sramAddress] = e, this.spriteRamWriteUpdate(this.sramAddress, e), this.sramAddress++, this.sramAddress %= 256;
  }
  // CPU Register $2005:
  // Write to scroll registers.
  // The first write is the vertical offset, the second is the
  // horizontal offset:
  scrollWrite(e) {
    this.triggerRendering(), this.firstWrite ? (this.regHT = e >> 3 & 31, this.regFH = e & 7) : (this.regFV = e & 7, this.regVT = e >> 3 & 31), this.firstWrite = !this.firstWrite;
  }
  // CPU Register $2006:
  // Sets the adress used when reading/writing from/to VRAM.
  // The first write sets the high byte, the second the low byte.
  writeVRAMAddress(e) {
    this.firstWrite ? (this.regFV = e >> 4 & 3, this.regV = e >> 3 & 1, this.regH = e >> 2 & 1, this.regVT = this.regVT & 7 | (e & 3) << 3) : (this.triggerRendering(), this.regVT = this.regVT & 24 | e >> 5 & 7, this.regHT = e & 31, this.cntFV = this.regFV, this.cntV = this.regV, this.cntH = this.regH, this.cntVT = this.regVT, this.cntHT = this.regHT, this.checkSprite0(this.scanline - 20)), this.firstWrite = !this.firstWrite, this.cntsToAddress(), this.vramAddress < 8192 && this.nes.mmap.latchAccess(this.vramAddress);
  }
  // CPU Register $2007(R):
  // Read from PPU memory. The address should be set first.
  vramLoad() {
    let e;
    this.cntsToAddress(), this.regsToAddress();
    const t = this.vramAddress + this.chrBankOffset;
    return t <= 16127 ? (e = this.vramBufferedReadValue, t < 8192 ? this.vramBufferedReadValue = this.vramMem[t & 16383] : this.vramBufferedReadValue = this.mirroredLoad(t), t < 8192 && this.nes.mmap.latchAccess(t), this.vramAddress += this.f_addrInc === 1 ? 32 : 1, this.cntsFromAddress(), this.regsFromAddress(), e) : (e = this.mirroredLoad(t), this.vramAddress += this.f_addrInc === 1 ? 32 : 1, this.cntsFromAddress(), this.regsFromAddress(), e);
  }
  // CPU Register $2007(W):
  // Write to PPU memory. The address should be set first.
  vramWrite(e) {
    this.triggerRendering(), this.cntsToAddress(), this.regsToAddress(), this.vramAddress >= 8192 ? this.mirroredWrite(this.vramAddress, e) : (this.writeMem(this.vramAddress, e), this.nes.mmap.latchAccess(this.vramAddress)), this.vramAddress += this.f_addrInc === 1 ? 32 : 1, this.regsFromAddress(), this.cntsFromAddress();
  }
  // CPU Register $4014:
  // Write 256 bytes of main memory
  // into Sprite RAM.
  sramDMA(e) {
    const t = e * 256;
    let s;
    for (let r = this.sramAddress; r < 256; r++)
      s = this.nes.cpu.mem[t + r], this.spriteMem[r] = s, this.spriteRamWriteUpdate(r, s);
    this.nes.cpu.haltCycles(513);
  }
  // Updates the scroll registers from a new VRAM address.
  regsFromAddress() {
    let e = this.vramTmpAddress >> 8 & 255;
    this.regFV = e >> 4 & 7, this.regV = e >> 3 & 1, this.regH = e >> 2 & 1, this.regVT = this.regVT & 7 | (e & 3) << 3, e = this.vramTmpAddress & 255, this.regVT = this.regVT & 24 | e >> 5 & 7, this.regHT = e & 31;
  }
  // Updates the scroll registers from a new VRAM address.
  cntsFromAddress() {
    let e = this.vramAddress >> 8 & 255;
    this.cntFV = e >> 4 & 3, this.cntV = e >> 3 & 1, this.cntH = e >> 2 & 1, this.cntVT = this.cntVT & 7 | (e & 3) << 3, e = this.vramAddress & 255, this.cntVT = this.cntVT & 24 | e >> 5 & 7, this.cntHT = e & 31;
  }
  regsToAddress() {
    let e = (this.regFV & 7) << 4;
    e |= (this.regV & 1) << 3, e |= (this.regH & 1) << 2, e |= this.regVT >> 3 & 3;
    let t = (this.regVT & 7) << 5;
    t |= this.regHT & 31, this.vramTmpAddress = (e << 8 | t) & 32767;
  }
  cntsToAddress() {
    let e = (this.cntFV & 7) << 4;
    e |= (this.cntV & 1) << 3, e |= (this.cntH & 1) << 2, e |= this.cntVT >> 3 & 3;
    let t = (this.cntVT & 7) << 5;
    t |= this.cntHT & 31, this.vramAddress = (e << 8 | t) & 32767;
  }
  incTileCounter(e) {
    for (let t = e; t !== 0; t--)
      this.cntHT++, this.cntHT === 32 && (this.cntHT = 0, this.cntVT++, this.cntVT >= 30 && (this.cntH++, this.cntH === 2 && (this.cntH = 0, this.cntV++, this.cntV === 2 && (this.cntV = 0, this.cntFV++, this.cntFV &= 7))));
  }
  // Reads from memory, taking into account
  // mirroring/mapping of address ranges.
  mirroredLoad(e) {
    return this.vramMem[this.vramMirrorTable[e]];
  }
  // Writes to memory, taking into account
  // mirroring/mapping of address ranges.
  mirroredWrite(e, t) {
    if (e >= 16128 && e < 16160)
      e === 16128 || e === 16144 ? (this.writeMem(16128, t), this.writeMem(16144, t)) : e === 16132 || e === 16148 ? (this.writeMem(16132, t), this.writeMem(16148, t)) : e === 16136 || e === 16152 ? (this.writeMem(16136, t), this.writeMem(16152, t)) : e === 16140 || e === 16156 ? (this.writeMem(16140, t), this.writeMem(16156, t)) : this.writeMem(e, t);
    else if (e < this.vramMirrorTable.length)
      this.writeMem(this.vramMirrorTable[e], t);
    else
      throw new Error(`Invalid VRAM address: ${e.toString(16)}`);
  }
  triggerRendering() {
    this.scanline >= 21 && this.scanline <= 260 && (this.renderFramePartially(this.lastRenderedScanline + 1, this.scanline - 21 - this.lastRenderedScanline), this.lastRenderedScanline = this.scanline - 21);
  }
  renderFramePartially(e, t) {
    if (this.f_spVisibility === 1 && this.renderSpritesPartially(e, t, !0), this.f_bgVisibility === 1) {
      const s = e << 8;
      let r = e + t << 8;
      r > 61440 && (r = 61440);
      const a = this.buffer, o = this.bgbuffer, n = this.pixrendered;
      for (let l = s; l < r; l++)
        n[l] > 255 && (a[l] = o[l]);
    }
    this.f_spVisibility === 1 && this.renderSpritesPartially(e, t, !1), this.validTileData = !1;
  }
  renderBgScanline(e, t) {
    const s = this.regS === 0 ? 0 : 256;
    let r = (t << 8) - this.regFH;
    if (this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH], this.cntHT = this.regHT, this.cntH = this.regH, this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH], t < 240 && t - this.cntFV >= 0) {
      const a = this.cntFV << 3, o = this.scantile, n = this.attrib, l = this.ptTile, f = this.nameTable, c = this.imgPalette, d = this.pixrendered, _ = e ? this.bgbuffer : this.buffer;
      let p, m, k, A;
      for (let R = 0; R < 32; R++) {
        if (t >= 0) {
          if (this.validTileData) {
            if (p = o[R], typeof p > "u")
              continue;
            m = p.pix, k = n[R];
          } else {
            if (p = l[s + f[this.curNt].getTileIndex(this.cntHT, this.cntVT)], typeof p > "u")
              continue;
            m = p.pix, k = f[this.curNt].getAttrib(this.cntHT, this.cntVT), o[R] = p, n[R] = k;
          }
          let C = 0;
          const S = (R << 3) - this.regFH;
          if (S > -8)
            if (S < 0 && (r -= S, C = -S), p.opaque[this.cntFV])
              for (; C < 8; C++)
                _[r] = c[m[a + C] + k], d[r] |= 256, r++;
            else
              for (; C < 8; C++)
                A = m[a + C], A !== 0 && (_[r] = c[A + k], d[r] |= 256), r++;
        }
        ++this.cntHT === 32 && (this.cntHT = 0, this.cntH++, this.cntH %= 2, this.curNt = this.ntable1[(this.cntV << 1) + this.cntH]);
      }
      this.validTileData = !0;
    }
    this.cntFV++, this.cntFV === 8 && (this.cntFV = 0, this.cntVT++, this.cntVT === 30 ? (this.cntVT = 0, this.cntV++, this.cntV %= 2, this.curNt = this.ntable1[(this.cntV << 1) + this.cntH]) : this.cntVT === 32 && (this.cntVT = 0), this.validTileData = !1);
  }
  renderSpritesPartially(e, t, s) {
    if (this.f_spVisibility === 1) {
      for (let r = 0; r < 64; r++)
        if (this.bgPriority[r] === s && this.sprX[r] >= 0 && this.sprX[r] < 256 && this.sprY[r] + 8 >= e && this.sprY[r] < e + t)
          if (this.f_spriteSize === 0)
            this.srcy1 = 0, this.srcy2 = 8, this.sprY[r] < e && (this.srcy1 = e - this.sprY[r] - 1), this.sprY[r] + 8 > e + t && (this.srcy2 = e + t - this.sprY[r] + 1), this.f_spPatternTable === 0 ? this.ptTile[this.sprTile[r]].render(this.buffer, 0, this.srcy1, 8, this.srcy2, this.sprX[r], this.sprY[r] + 1, this.sprCol[r], this.sprPalette, this.horiFlip[r], this.vertFlip[r], r, this.pixrendered) : this.ptTile[this.sprTile[r] + 256].render(this.buffer, 0, this.srcy1, 8, this.srcy2, this.sprX[r], this.sprY[r] + 1, this.sprCol[r], this.sprPalette, this.horiFlip[r], this.vertFlip[r], r, this.pixrendered);
          else {
            let a = this.sprTile[r];
            (a & 1) !== 0 && (a = this.sprTile[r] - 1 + 256);
            let o = 0, n = 8;
            this.sprY[r] < e && (o = e - this.sprY[r] - 1), this.sprY[r] + 8 > e + t && (n = e + t - this.sprY[r]), this.ptTile[a + (this.vertFlip[r] ? 1 : 0)].render(this.buffer, 0, o, 8, n, this.sprX[r], this.sprY[r] + 1, this.sprCol[r], this.sprPalette, this.horiFlip[r], this.vertFlip[r], r, this.pixrendered), o = 0, n = 8, this.sprY[r] + 8 < e && (o = e - (this.sprY[r] + 8 + 1)), this.sprY[r] + 16 > e + t && (n = e + t - (this.sprY[r] + 8)), this.ptTile[a + (this.vertFlip[r] ? 0 : 1)].render(this.buffer, 0, o, 8, n, this.sprX[r], this.sprY[r] + 1 + 8, this.sprCol[r], this.sprPalette, this.horiFlip[r], this.vertFlip[r], r, this.pixrendered);
          }
    }
  }
  checkSprite0(e) {
    this.spr0HitX = -1, this.spr0HitY = -1;
    let t;
    const s = this.f_spPatternTable === 0 ? 0 : 256;
    let r, a, o, n = this.sprX[0];
    const l = this.sprY[0] + 1;
    if (this.f_spriteSize === 0) {
      if (l <= e && l + 8 > e && n >= -7 && n < 256)
        if (r = this.ptTile[this.sprTile[0] + s], this.vertFlip[0] ? t = 7 - (e - l) : t = e - l, t *= 8, o = e * 256 + n, this.horiFlip[0])
          for (a = 7; a >= 0; a--) {
            if (n >= 0 && n < 256 && o >= 0 && o < 61440 && this.pixrendered[o] !== 0 && r.pix[t + a] !== 0)
              return this.spr0HitX = o % 256, this.spr0HitY = e, !0;
            n++, o++;
          }
        else
          for (a = 0; a < 8; a++) {
            if (n >= 0 && n < 256 && o >= 0 && o < 61440 && this.pixrendered[o] !== 0 && r.pix[t + a] !== 0)
              return this.spr0HitX = o % 256, this.spr0HitY = e, !0;
            n++, o++;
          }
    } else if (l <= e && l + 16 > e && n >= -7 && n < 256)
      if (this.vertFlip[0] ? t = 15 - (e - l) : t = e - l, t < 8 ? r = this.ptTile[this.sprTile[0] + (this.vertFlip[0] ? 1 : 0) + ((this.sprTile[0] & 1) === 0 ? 0 : 255)] : (r = this.ptTile[this.sprTile[0] + (this.vertFlip[0] ? 0 : 1) + ((this.sprTile[0] & 1) === 0 ? 0 : 255)], this.vertFlip[0] ? t = 15 - t : t -= 8), t *= 8, o = e * 256 + n, this.horiFlip[0])
        for (a = 7; a >= 0; a--) {
          if (n >= 0 && n < 256 && o >= 0 && o < 61440 && this.pixrendered[o] !== 0 && r.pix[t + a] !== 0)
            return this.spr0HitX = o % 256, this.spr0HitY = e, !0;
          n++, o++;
        }
      else
        for (a = 0; a < 8; a++) {
          if (n >= 0 && n < 256 && o >= 0 && o < 61440 && this.pixrendered[o] !== 0 && r.pix[t + a] !== 0)
            return this.spr0HitX = o % 256, this.spr0HitY = e, !0;
          n++, o++;
        }
    return !1;
  }
  // This will write to PPU memory, and
  // update internally buffered data
  // appropriately.
  writeMem(e, t) {
    this.vramMem[e] = t, e < 8192 ? (this.vramMem[e] = t, this.patternWrite(e, t)) : e >= 8192 && e < 9152 ? this.nameTableWrite(this.ntable1[0], e - 8192, t) : e >= 9152 && e < 9216 ? this.attribTableWrite(this.ntable1[0], e - 9152, t) : e >= 9216 && e < 10176 ? this.nameTableWrite(this.ntable1[1], e - 9216, t) : e >= 10176 && e < 10240 ? this.attribTableWrite(this.ntable1[1], e - 10176, t) : e >= 10240 && e < 11200 ? this.nameTableWrite(this.ntable1[2], e - 10240, t) : e >= 11200 && e < 11264 ? this.attribTableWrite(this.ntable1[2], e - 11200, t) : e >= 11264 && e < 12224 ? this.nameTableWrite(this.ntable1[3], e - 11264, t) : e >= 12224 && e < 12288 ? this.attribTableWrite(this.ntable1[3], e - 12224, t) : e >= 16128 && e < 16160 && this.updatePalettes();
  }
  // Reads data from $3f00 to $f20
  // into the two buffered palettes.
  updatePalettes() {
    let e;
    for (e = 0; e < 16; e++)
      this.f_dispType === 0 ? this.imgPalette[e] = this.palTable.getEntry(this.vramMem[16128 + e] & 63) : this.imgPalette[e] = this.palTable.getEntry(this.vramMem[16128 + e] & 32);
    for (e = 0; e < 16; e++)
      this.f_dispType === 0 ? this.sprPalette[e] = this.palTable.getEntry(this.vramMem[16144 + e] & 63) : this.sprPalette[e] = this.palTable.getEntry(this.vramMem[16144 + e] & 32);
  }
  // Updates the internal pattern
  // table buffers with this new byte.
  // In vNES, there is a version of this with 4 arguments which isn't used.
  patternWrite(e, t) {
    const s = Math.floor(e / 16), r = e % 16;
    r < 8 ? this.ptTile[s].setScanline(r, t, this.vramMem[e + 8]) : this.ptTile[s].setScanline(r - 8, this.vramMem[e - 8], t);
  }
  // Updates the internal name table buffers
  // with this new byte.
  nameTableWrite(e, t, s) {
    this.nameTable[e].tile[t] = s, this.checkSprite0(this.scanline - 20);
  }
  // Updates the internal pattern
  // table buffers with this new attribute
  // table byte.
  attribTableWrite(e, t, s) {
    this.nameTable[e].writeAttrib(t, s);
  }
  // Updates the internally buffered sprite
  // data with this new byte of info.
  spriteRamWriteUpdate(e, t) {
    const s = Math.floor(e / 4);
    s === 0 && this.checkSprite0(this.scanline - 20), e % 4 === 0 ? this.sprY[s] = t : e % 4 === 1 ? this.sprTile[s] = t : e % 4 === 2 ? (this.vertFlip[s] = (t & 128) !== 0, this.horiFlip[s] = (t & 64) !== 0, this.bgPriority[s] = (t & 32) !== 0, this.sprCol[s] = (t & 3) << 2) : e % 4 === 3 && (this.sprX[s] = t);
  }
  doNMI() {
    this.setStatusFlag(this.STATUS_VBLANK, !0), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NMI);
  }
  isPixelWhite(e, t) {
    return this.triggerRendering(), this.nes.ppu.buffer[(t << 8) + e] === 16777215;
  }
  isDispON() {
    return (this.vramMem[8192] & 128) !== 0;
  }
  toJSON() {
    let e;
    const t = At(this), s = [];
    for (e = 0; e < this.nameTable.length; e++)
      s[e] = this.nameTable[e].toJSON();
    const r = [];
    for (e = 0; e < this.ptTile.length; e++)
      r[e] = this.ptTile[e].toJSON();
    return t.nameTable = b0(s), t.ptTile = R0(r), t.vramMem = Bt(this.vramMem), t;
  }
  fromJSON(e) {
    let t;
    for (e.nameTable = S0(e.nameTable), e.ptTile = g0(e.ptTile), e.vramMem = Mt(e.vramMem), e.vramMirrorTable = d0(), Ct(this, e), this.attrib = U(0, 32), this.bgbuffer = U(0, 61440), this.buffer = U(0, 61440), this.pixrendered = U(0, 61440), t = 0; t < this.nameTable.length; t++)
      this.nameTable[t].fromJSON(e.nameTable[t]);
    for (t = 0; t < this.ptTile.length; t++)
      this.ptTile[t].fromJSON(e.ptTile[t]);
    for (t = 0; t < this.spriteMem.length; t++)
      this.spriteRamWriteUpdate(t, this.spriteMem[t]);
  }
}
class k0 {
  constructor(e) {
    h(this, "papu");
    h(this, "MODE_NORMAL", 0);
    h(this, "MODE_LOOP", 1);
    h(this, "MODE_IRQ", 2);
    h(this, "isEnabled", null);
    h(this, "hasSample", null);
    h(this, "irqGenerated", !1);
    h(this, "playMode", null);
    h(this, "dmaFrequency", null);
    h(this, "dmaCounter", null);
    h(this, "deltaCounter", null);
    h(this, "playStartAddress", null);
    h(this, "playAddress", null);
    h(this, "playLength", null);
    h(this, "playLengthCounter", null);
    h(this, "shiftCounter", null);
    h(this, "reg4012", null);
    h(this, "reg4013", null);
    h(this, "sample", null);
    h(this, "dacLsb", null);
    h(this, "data", null);
    h(this, "JSON_PROPERTIES", ["MODE_NORMAL", "MODE_LOOP", "MODE_IRQ", "isEnabled", "hasSample", "irqGenerated", "playMode", "dmaFrequency", "dmaCounter", "deltaCounter", "playStartAddress", "playAddress", "playLength", "playLengthCounter", "shiftCounter", "reg4012", "reg4013", "sample", "dacLsb", "data"]);
    this.papu = e, this.reset();
  }
  clockDmc() {
    this.hasSample && ((this.data & 1) === 0 ? this.deltaCounter > 0 && this.deltaCounter-- : this.deltaCounter < 63 && this.deltaCounter++, this.sample = this.isEnabled ? (this.deltaCounter << 1) + this.dacLsb : 0, this.data >>= 1), this.dmaCounter--, this.dmaCounter <= 0 && (this.hasSample = !1, this.endOfSample(), this.dmaCounter = 8), this.irqGenerated && this.papu.nes.cpu.requestIrq(this.papu.nes.cpu.IRQ_NORMAL);
  }
  endOfSample() {
    this.playLengthCounter === 0 && this.playMode === this.MODE_LOOP && (this.playAddress = this.playStartAddress, this.playLengthCounter = this.playLength), this.playLengthCounter > 0 && (this.nextSample(), this.playLengthCounter === 0 && this.playMode === this.MODE_IRQ && (this.irqGenerated = !0));
  }
  nextSample() {
    this.data = this.papu.nes.mmap.load(this.playAddress), this.papu.nes.cpu.haltCycles(4), this.playLengthCounter--, this.playAddress++, this.playAddress > 65535 && (this.playAddress = 32768), this.hasSample = !0;
  }
  writeReg(e, t) {
    e === 16400 ? (t >> 6 === 0 ? this.playMode = this.MODE_NORMAL : (t >> 6 & 1) === 1 ? this.playMode = this.MODE_LOOP : t >> 6 === 2 && (this.playMode = this.MODE_IRQ), (t & 128) === 0 && (this.irqGenerated = !1), this.dmaFrequency = this.papu.getDmcFrequency(t & 15)) : e === 16401 ? (this.deltaCounter = t >> 1 & 63, this.dacLsb = t & 1, this.sample = (this.deltaCounter << 1) + this.dacLsb) : e === 16402 ? (this.playStartAddress = t << 6 | 49152, this.playAddress = this.playStartAddress, this.reg4012 = t) : e === 16403 ? (this.playLength = (t << 4) + 1, this.playLengthCounter = this.playLength, this.reg4013 = t) : e === 16405 && ((t >> 4 & 1) === 0 ? this.playLengthCounter = 0 : (this.playAddress = this.playStartAddress, this.playLengthCounter = this.playLength), this.irqGenerated = !1);
  }
  setEnabled(e) {
    !this.isEnabled && e && (this.playLengthCounter = this.playLength), this.isEnabled = e;
  }
  getLengthStatus() {
    return this.playLengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
  getIrqStatus() {
    return this.irqGenerated ? 1 : 0;
  }
  reset() {
    this.isEnabled = !1, this.irqGenerated = !1, this.playMode = this.MODE_NORMAL, this.dmaFrequency = 0, this.dmaCounter = 0, this.deltaCounter = 0, this.playStartAddress = 0, this.playAddress = 0, this.playLength = 0, this.playLengthCounter = 0, this.sample = 0, this.dacLsb = 0, this.shiftCounter = 0, this.reg4012 = 0, this.reg4013 = 0, this.data = 0;
  }
  toJSON() {
    return At(this);
  }
  fromJSON(e) {
    Ct(this, e);
  }
}
class I0 {
  constructor(e) {
    h(this, "papu");
    h(this, "isEnabled", null);
    h(this, "envDecayDisable", null);
    h(this, "envDecayLoopEnable", null);
    h(this, "lengthCounterEnable", null);
    h(this, "envReset", null);
    h(this, "shiftNow", null);
    h(this, "lengthCounter", null);
    h(this, "progTimerCount", null);
    h(this, "progTimerMax", null);
    h(this, "envDecayRate", null);
    h(this, "envDecayCounter", null);
    h(this, "envVolume", null);
    h(this, "masterVolume", null);
    h(this, "shiftReg", 16384);
    h(this, "randomBit", null);
    h(this, "randomMode", null);
    h(this, "sampleValue", null);
    h(this, "accValue", 0);
    h(this, "accCount", 1);
    h(this, "tmp", null);
    h(this, "JSON_PROPERTIES", ["isEnabled", "envDecayDisable", "envDecayLoopEnable", "lengthCounterEnable", "envReset", "shiftNow", "lengthCounter", "progTimerCount", "progTimerMax", "envDecayRate", "envDecayCounter", "envVolume", "masterVolume", "shiftReg", "randomBit", "randomMode", "sampleValue", "accValue", "accCount", "tmp"]);
    this.papu = e, this.reset();
  }
  reset() {
    this.progTimerCount = 0, this.progTimerMax = 0, this.isEnabled = !1, this.lengthCounter = 0, this.lengthCounterEnable = !1, this.envDecayDisable = !1, this.envDecayLoopEnable = !1, this.shiftNow = !1, this.envDecayRate = 0, this.envDecayCounter = 0, this.envVolume = 0, this.masterVolume = 0, this.shiftReg = 1, this.randomBit = 0, this.randomMode = 0, this.sampleValue = 0, this.tmp = 0;
  }
  clockLengthCounter() {
    this.lengthCounterEnable && this.lengthCounter > 0 && (this.lengthCounter--, this.lengthCounter === 0 && this.updateSampleValue());
  }
  clockEnvDecay() {
    this.envReset ? (this.envReset = !1, this.envDecayCounter = this.envDecayRate + 1, this.envVolume = 15) : --this.envDecayCounter <= 0 && (this.envDecayCounter = this.envDecayRate + 1, this.envVolume > 0 ? this.envVolume-- : this.envVolume = this.envDecayLoopEnable ? 15 : 0), this.masterVolume = this.envDecayDisable ? this.envDecayRate : this.envVolume, this.updateSampleValue();
  }
  updateSampleValue() {
    this.lengthCounter && this.isEnabled && this.lengthCounter > 0 && (this.sampleValue = this.randomBit * this.masterVolume);
  }
  writeReg(e, t) {
    e === 16396 ? (this.envDecayDisable = (t & 16) !== 0, this.envDecayRate = t & 15, this.envDecayLoopEnable = (t & 32) !== 0, this.lengthCounterEnable = (t & 32) === 0, this.envDecayDisable ? this.masterVolume = this.envDecayRate : this.masterVolume = this.envVolume) : e === 16398 ? (this.progTimerMax = this.papu.getNoiseWaveLength(t & 15), this.randomMode = t >> 7) : e === 16399 && (this.lengthCounter = this.papu.getLengthMax(t & 248), this.envReset = !0), this.updateSampleValue();
  }
  setEnabled(e) {
    this.isEnabled = e, e || (this.lengthCounter = 0), this.updateSampleValue();
  }
  getLengthStatus() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
  toJSON() {
    return At(this);
  }
  fromJSON(e) {
    Ct(this, e);
  }
}
class cs {
  constructor(e, t) {
    h(this, "papu");
    h(this, "dutyLookup");
    h(this, "impLookup");
    h(this, "sqr1");
    h(this, "isEnabled");
    h(this, "lengthCounterEnable");
    h(this, "sweepActive");
    h(this, "envDecayDisable");
    h(this, "envDecayLoopEnable");
    h(this, "envReset");
    h(this, "sweepCarry");
    h(this, "updateSweepPeriod");
    h(this, "progTimerCount");
    h(this, "progTimerMax");
    h(this, "lengthCounter");
    h(this, "squareCounter");
    h(this, "sweepCounter");
    h(this, "sweepCounterMax");
    h(this, "sweepMode");
    h(this, "sweepShiftAmount");
    h(this, "envDecayRate");
    h(this, "envDecayCounter");
    h(this, "envVolume");
    h(this, "masterVolume");
    h(this, "dutyMode");
    h(this, "sampleValue");
    h(this, "vol");
    h(this, "JSON_PROPERTIES", ["isEnabled", "lengthCounterEnable", "sweepActive", "envDecayDisable", "envDecayLoopEnable", "envReset", "sweepCarry", "updateSweepPeriod", "progTimerCount", "progTimerMax", "lengthCounter", "squareCounter", "sweepCounter", "sweepCounterMax", "sweepMode", "sweepShiftAmount", "envDecayRate", "envDecayCounter", "envVolume", "masterVolume", "dutyMode", "sweepResult", "sampleValue", "vol"]);
    this.papu = e, this.dutyLookup = [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1], this.impLookup = [1, -1, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 0], this.sqr1 = t, this.isEnabled = !1, this.lengthCounterEnable = !1, this.sweepActive = !1, this.envDecayDisable = !1, this.envDecayLoopEnable = !1, this.envReset = !1, this.sweepCarry = !1, this.updateSweepPeriod = !1, this.progTimerCount = 0, this.progTimerMax = 0, this.lengthCounter = 0, this.squareCounter = 0, this.sweepCounter = 0, this.sweepCounterMax = 0, this.sweepMode = 0, this.sweepShiftAmount = 0, this.envDecayRate = 0, this.envDecayCounter = 0, this.envVolume = 0, this.masterVolume = 0, this.dutyMode = 0, this.sampleValue = 0, this.vol = 0, this.reset();
  }
  reset() {
    this.progTimerCount = this.progTimerMax = this.lengthCounter = this.squareCounter = this.sweepCounter = this.sweepCounterMax = this.sweepMode = this.sweepShiftAmount = this.envDecayRate = this.envDecayCounter = this.envVolume = this.masterVolume = this.dutyMode = this.vol = 0, this.isEnabled = !1, this.lengthCounterEnable = !1, this.sweepActive = !1, this.sweepCarry = !1, this.envDecayDisable = !1, this.envDecayLoopEnable = !1;
  }
  clockLengthCounter() {
    this.lengthCounterEnable && this.lengthCounter > 0 && (this.lengthCounter--, this.lengthCounter === 0 && this.updateSampleValue());
  }
  clockEnvDecay() {
    this.envReset ? (this.envReset = !1, this.envDecayCounter = this.envDecayRate + 1, this.envVolume = 15) : --this.envDecayCounter <= 0 && (this.envDecayCounter = this.envDecayRate + 1, this.envVolume = Math.max(0, this.envVolume - 1), this.envVolume === 0 && !this.envDecayLoopEnable && (this.envVolume = 0)), this.masterVolume = this.envDecayDisable ? this.envDecayRate : this.envVolume, this.updateSampleValue();
  }
  clockSweep() {
    --this.sweepCounter <= 0 && (this.sweepCounter = this.sweepCounterMax + 1, this.sweepActive && this.sweepShiftAmount > 0 && this.progTimerMax > 7 && (this.sweepCarry = !1, this.sweepMode === 0 ? (this.progTimerMax += this.progTimerMax >> this.sweepShiftAmount, this.progTimerMax > 4095 && (this.progTimerMax = 4095, this.sweepCarry = !0)) : this.progTimerMax -= (this.progTimerMax >> this.sweepShiftAmount) - (this.sqr1 ? 1 : 0))), this.updateSweepPeriod && (this.updateSweepPeriod = !1, this.sweepCounter = this.sweepCounterMax + 1);
  }
  updateSampleValue() {
    this.isEnabled && this.lengthCounter > 0 && this.progTimerMax > 7 ? this.sweepMode === 0 && this.progTimerMax + (this.progTimerMax >> this.sweepShiftAmount) > 4095 ? this.sampleValue = 0 : this.sampleValue = this.masterVolume * this.dutyLookup[(this.dutyMode << 3) + this.squareCounter] : this.sampleValue = 0;
  }
  writeReg(e, t) {
    const s = this.sqr1 ? 0 : 4;
    e === 16384 + s ? (this.envDecayDisable = (t & 16) !== 0, this.envDecayRate = t & 15, this.envDecayLoopEnable = (t & 32) !== 0, this.dutyMode = t >> 6 & 3, this.lengthCounterEnable = (t & 32) === 0, this.masterVolume = this.envDecayDisable ? this.envDecayRate : this.envVolume, this.updateSampleValue()) : e === 16385 + s ? (this.sweepActive = (t & 128) !== 0, this.sweepCounterMax = t >> 4 & 7, this.sweepMode = t >> 3 & 1, this.sweepShiftAmount = t & 7, this.updateSweepPeriod = !0) : e === 16386 + s ? this.progTimerMax = this.progTimerMax & 1792 | t : e === 16387 + s && (this.progTimerMax = this.progTimerMax & 255 | (t & 7) << 8, this.isEnabled && (this.lengthCounter = this.papu.getLengthMax(t & 248)), this.envReset = !0);
  }
  setEnabled(e) {
    this.isEnabled = e, e || (this.lengthCounter = 0), this.updateSampleValue();
  }
  getLengthStatus() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
  toJSON() {
    return At(this);
  }
  fromJSON(e) {
    Ct(this, e);
  }
}
class D0 {
  constructor(e) {
    h(this, "papu");
    h(this, "isEnabled");
    h(this, "sampleCondition");
    h(this, "lengthCounterEnable");
    h(this, "lcHalt");
    h(this, "lcControl");
    h(this, "progTimerCount");
    h(this, "progTimerMax");
    h(this, "triangleCounter");
    h(this, "lengthCounter");
    h(this, "linearCounter");
    h(this, "lcLoadValue");
    h(this, "sampleValue");
    h(this, "tmp");
    h(this, "JSON_PROPERTIES", ["isEnabled", "sampleCondition", "lengthCounterEnable", "lcHalt", "lcControl", "progTimerCount", "progTimerMax", "triangleCounter", "lengthCounter", "linearCounter", "lcLoadValue", "sampleValue", "tmp"]);
    this.papu = e, this.progTimerCount = 0, this.progTimerMax = 0, this.triangleCounter = 0, this.isEnabled = !1, this.sampleCondition = !1, this.lengthCounter = 0, this.lengthCounterEnable = !1, this.linearCounter = 0, this.lcLoadValue = 0, this.lcHalt = !0, this.lcControl = !1, this.tmp = 0, this.sampleValue = 15;
  }
  reset() {
    this.progTimerCount = 0, this.progTimerMax = 0, this.triangleCounter = 0, this.isEnabled = !1, this.sampleCondition = !1, this.lengthCounter = 0, this.lengthCounterEnable = !1, this.linearCounter = 0, this.lcLoadValue = 0, this.lcHalt = !0, this.lcControl = !1, this.tmp = 0, this.sampleValue = 15;
  }
  clockLengthCounter() {
    this.lengthCounterEnable && this.lengthCounter > 0 && (this.lengthCounter--, this.lengthCounter === 0 && this.updateSampleCondition());
  }
  clockLinearCounter() {
    this.lcHalt ? (this.linearCounter = this.lcLoadValue, this.updateSampleCondition()) : this.linearCounter > 0 && (this.linearCounter--, this.updateSampleCondition()), this.lcControl || (this.lcHalt = !1);
  }
  getLengthStatus() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
  readReg(e) {
    return 0;
  }
  writeReg(e, t) {
    e === 16392 ? (this.lcControl = (t & 128) !== 0, this.lcLoadValue = t & 127, this.lengthCounterEnable = !this.lcControl) : e === 16394 ? this.progTimerMax = this.progTimerMax & 1792 | t : e === 16395 && (this.progTimerMax = this.progTimerMax & 255 | (t & 7) << 8, this.lengthCounter = this.papu.getLengthMax(t & 248), this.lcHalt = !0), this.updateSampleCondition();
  }
  clockProgrammableTimer(e) {
    if (this.progTimerMax > 0)
      for (this.progTimerCount += e; this.progTimerMax > 0 && this.progTimerCount >= this.progTimerMax; )
        this.progTimerCount -= this.progTimerMax, this.isEnabled && this.lengthCounter > 0 && this.linearCounter > 0 && this.clockTriangleGenerator();
  }
  clockTriangleGenerator() {
    this.triangleCounter++, this.triangleCounter &= 31;
  }
  setEnabled(e) {
    this.isEnabled = e, e || (this.lengthCounter = 0), this.updateSampleCondition();
  }
  updateSampleCondition() {
    this.sampleCondition = this.isEnabled && this.progTimerMax > 7 && this.linearCounter > 0 && this.lengthCounter > 0;
  }
  toJSON() {
    return At(this);
  }
  fromJSON(e) {
    Ct(this, e);
  }
}
const N0 = 17897725e-1;
class T0 {
  constructor(e) {
    h(this, "nes");
    h(this, "square1");
    h(this, "square2");
    h(this, "triangle");
    h(this, "noise");
    h(this, "dmc");
    h(this, "frameIrqCounter");
    h(this, "frameIrqCounterMax");
    h(this, "initCounter");
    h(this, "channelEnableValue");
    h(this, "sampleRate");
    h(this, "lengthLookup");
    h(this, "dmcFreqLookup");
    h(this, "noiseWavelengthLookup");
    h(this, "squareTable");
    h(this, "tndTable");
    h(this, "frameIrqEnabled");
    h(this, "frameIrqActive");
    h(this, "frameClockNow");
    h(this, "startedPlaying");
    h(this, "recordOutput");
    h(this, "initingHardware");
    h(this, "masterFrameCounter");
    h(this, "derivedFrameCounter");
    h(this, "countSequence");
    h(this, "sampleTimer");
    h(this, "frameTime");
    h(this, "sampleTimerMax");
    h(this, "sampleCount");
    h(this, "triValue");
    h(this, "smpSquare1");
    h(this, "smpSquare2");
    h(this, "smpTriangle");
    h(this, "smpDmc");
    h(this, "accCount");
    h(this, "prevSampleL");
    h(this, "prevSampleR");
    h(this, "smpAccumL");
    h(this, "smpAccumR");
    h(this, "dacRange");
    h(this, "dcValue");
    h(this, "masterVolume");
    h(this, "stereoPosLSquare1");
    h(this, "stereoPosLSquare2");
    h(this, "stereoPosLTriangle");
    h(this, "stereoPosLNoise");
    h(this, "stereoPosLDMC");
    h(this, "stereoPosRSquare1");
    h(this, "stereoPosRSquare2");
    h(this, "stereoPosRTriangle");
    h(this, "stereoPosRNoise");
    h(this, "stereoPosRDMC");
    h(this, "extraCycles");
    h(this, "maxSample");
    h(this, "minSample");
    h(this, "panning");
    h(this, "JSON_PROPERTIES", ["frameIrqCounter", "frameIrqCounterMax", "initCounter", "channelEnableValue", "sampleRate", "frameIrqEnabled", "frameIrqActive", "frameClockNow", "startedPlaying", "recordOutput", "initingHardware", "masterFrameCounter", "derivedFrameCounter", "countSequence", "sampleTimer", "frameTime", "sampleTimerMax", "sampleCount", "triValue", "smpSquare1", "smpSquare2", "smpTriangle", "smpDmc", "accCount", "prevSampleL", "prevSampleR", "smpAccumL", "smpAccumR", "masterVolume", "stereoPosLSquare1", "stereoPosLSquare2", "stereoPosLTriangle", "stereoPosLNoise", "stereoPosLDMC", "stereoPosRSquare1", "stereoPosRSquare2", "stereoPosRTriangle", "stereoPosRNoise", "stereoPosRDMC", "extraCycles", "maxSample", "minSample", "panning"]);
    this.nes = e, this.square1 = new cs(this, !0), this.square2 = new cs(this, !1), this.triangle = new D0(this), this.noise = new I0(this), this.dmc = new k0(this), this.frameIrqCounter = null, this.frameIrqCounterMax = 4, this.initCounter = 2048, this.channelEnableValue = null, this.sampleRate = 44100, this.lengthLookup = null, this.dmcFreqLookup = null, this.noiseWavelengthLookup = null, this.squareTable = null, this.tndTable = null, this.frameIrqEnabled = !1, this.frameIrqActive = null, this.frameClockNow = null, this.startedPlaying = !1, this.recordOutput = !1, this.initingHardware = !1, this.masterFrameCounter = null, this.derivedFrameCounter = null, this.countSequence = null, this.sampleTimer = null, this.frameTime = null, this.sampleTimerMax = null, this.sampleCount = null, this.triValue = 0, this.smpSquare1 = null, this.smpSquare2 = null, this.smpTriangle = null, this.smpDmc = null, this.accCount = null, this.prevSampleL = 0, this.prevSampleR = 0, this.smpAccumL = 0, this.smpAccumR = 0, this.dacRange = 0, this.dcValue = 0, this.masterVolume = 256, this.stereoPosLSquare1 = null, this.stereoPosLSquare2 = null, this.stereoPosLTriangle = null, this.stereoPosLNoise = null, this.stereoPosLDMC = null, this.stereoPosRSquare1 = null, this.stereoPosRSquare2 = null, this.stereoPosRTriangle = null, this.stereoPosRNoise = null, this.stereoPosRDMC = null, this.extraCycles = null, this.maxSample = null, this.minSample = null, this.panning = [80, 170, 100, 150, 128], this.setPanning(this.panning), this.initLengthLookup(), this.initDmcFrequencyLookup(), this.initNoiseWavelengthLookup(), this.initDACtables();
    for (let t = 0; t < 20; t++)
      t === 16 ? this.writeReg(16400, 16) : this.writeReg(16384 + t, 0);
    this.reset();
  }
  reset() {
    this.sampleRate = this.nes.opts.sampleRate, this.sampleTimerMax = Math.floor(1024 * N0 * this.nes.opts.preferredFrameRate / (this.sampleRate * 60)), this.frameTime = Math.floor(14915 * this.nes.opts.preferredFrameRate / 60), this.sampleTimer = 0, this.updateChannelEnable(0), this.masterFrameCounter = 0, this.derivedFrameCounter = 0, this.countSequence = 0, this.sampleCount = 0, this.initCounter = 2048, this.frameIrqEnabled = !1, this.initingHardware = !1, this.resetCounter(), this.square1.reset(), this.square2.reset(), this.triangle.reset(), this.noise.reset(), this.dmc.reset(), this.accCount = 0, this.smpSquare1 = 0, this.smpSquare2 = 0, this.smpTriangle = 0, this.smpDmc = 0, this.frameIrqCounterMax = 4, this.channelEnableValue = 255, this.startedPlaying = !1, this.prevSampleL = 0, this.prevSampleR = 0, this.smpAccumL = 0, this.smpAccumR = 0, this.maxSample = -5e5, this.minSample = 5e5;
  }
  readReg(e) {
    let t = 0;
    return t |= this.square1.getLengthStatus(), t |= this.square2.getLengthStatus() << 1, t |= this.triangle.getLengthStatus() << 2, t |= this.noise.getLengthStatus() << 3, t |= this.dmc.getLengthStatus() << 4, t |= (this.frameIrqActive && this.frameIrqEnabled ? 1 : 0) << 6, t |= this.dmc.getIrqStatus() << 7, this.frameIrqActive = !1, this.dmc.irqGenerated = !1, t & 65535;
  }
  writeReg(e, t) {
    e >= 16384 && e < 16388 ? this.square1.writeReg(e, t) : e >= 16388 && e < 16392 ? this.square2.writeReg(e, t) : e >= 16392 && e < 16396 ? this.triangle.writeReg(e, t) : e >= 16396 && e <= 16399 ? this.noise.writeReg(e, t) : e === 16400 ? this.dmc.writeReg(e, t) : e === 16401 ? this.dmc.writeReg(e, t) : e === 16402 ? this.dmc.writeReg(e, t) : e === 16403 ? this.dmc.writeReg(e, t) : e === 16405 ? (this.updateChannelEnable(t), t !== 0 && this.initCounter > 0 && (this.initingHardware = !0), this.dmc.writeReg(e, t)) : e === 16407 && (this.countSequence = t >> 7 & 1, this.masterFrameCounter = 0, this.frameIrqActive = !1, this.frameIrqEnabled = (t >> 6 & 1) === 0, this.countSequence === 0 ? (this.frameIrqCounterMax = 4, this.derivedFrameCounter = 4) : (this.frameIrqCounterMax = 5, this.derivedFrameCounter = 0, this.frameCounterTick()));
  }
  resetCounter() {
    this.derivedFrameCounter = this.countSequence === 0 ? 4 : 0;
  }
  updateChannelEnable(e) {
    this.channelEnableValue = e & 65535, this.square1.setEnabled((e & 1) !== 0), this.square2.setEnabled((e & 2) !== 0), this.triangle.setEnabled((e & 4) !== 0), this.noise.setEnabled((e & 8) !== 0), this.dmc.setEnabled((e & 16) !== 0);
  }
  clockFrameCounter(e) {
    if (this.initCounter > 0 && this.initingHardware) {
      this.initCounter -= e, this.initCounter <= 0 && (this.initingHardware = !1);
      return;
    }
    e += this.extraCycles || 0;
    const t = this.sampleTimerMax - (this.sampleTimer || 0);
    if (e << 10 > t ? (this.extraCycles = (e << 10) - t >> 10, e -= this.extraCycles) : this.extraCycles = 0, this.dmc.isEnabled)
      for (this.dmc.shiftCounter -= e << 3; this.dmc.shiftCounter <= 0 && this.dmc.dmaFrequency > 0; )
        this.dmc.shiftCounter += this.dmc.dmaFrequency, this.dmc.clockDmc();
    if (this.triangle.progTimerMax > 0)
      for (this.triangle.progTimerCount -= e; this.triangle.progTimerCount <= 0; )
        this.triangle.progTimerCount += this.triangle.progTimerMax + 1, this.triangle.linearCounter > 0 && this.triangle.lengthCounter > 0 && (this.triangle.triangleCounter++, this.triangle.triangleCounter &= 31, this.triangle.isEnabled && (this.triangle.triangleCounter >= 16 ? this.triangle.sampleValue = this.triangle.triangleCounter & 15 : this.triangle.sampleValue = 15 - (this.triangle.triangleCounter & 15), this.triangle.sampleValue <<= 4));
    this.square1.progTimerCount -= e, this.square1.progTimerCount <= 0 && (this.square1.progTimerCount += this.square1.progTimerMax + 1 << 1, this.square1.squareCounter++, this.square1.squareCounter &= 7, this.square1.updateSampleValue()), this.square2.progTimerCount -= e, this.square2.progTimerCount <= 0 && (this.square2.progTimerCount += this.square2.progTimerMax + 1 << 1, this.square2.squareCounter++, this.square2.squareCounter &= 7, this.square2.updateSampleValue());
    let s = e;
    if (this.noise.progTimerCount - s > 0)
      this.noise.progTimerCount -= s, this.noise.accCount += s, this.noise.accValue += s * this.noise.sampleValue;
    else
      for (; s-- > 0; )
        --this.noise.progTimerCount <= 0 && this.noise.progTimerMax > 0 && (this.noise.shiftReg <<= 1, this.noise.tmp = (this.noise.shiftReg << (this.noise.randomMode === 0 ? 1 : 6) ^ this.noise.shiftReg) & 32768, this.noise.tmp === 0 ? (this.noise.randomBit = 1, this.noise.sampleValue = this.noise.isEnabled && this.noise.lengthCounter > 0 ? this.noise.masterVolume : 0) : (this.noise.shiftReg |= 1, this.noise.randomBit = 0, this.noise.sampleValue = 0), this.noise.progTimerCount += this.noise.progTimerMax), this.noise.accValue += this.noise.sampleValue, this.noise.accCount++;
    this.frameIrqEnabled && this.frameIrqActive && this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL), this.masterFrameCounter += e << 1, this.masterFrameCounter >= this.frameTime && (this.masterFrameCounter -= this.frameTime, this.frameCounterTick()), this.accSample(e), this.sampleTimer += e << 10, this.sampleTimer >= this.sampleTimerMax && (this.sample(), this.sampleTimer -= this.sampleTimerMax);
  }
  accSample(e) {
    this.triangle.sampleCondition && (this.triValue = Math.floor((this.triangle.progTimerCount << 4) / (this.triangle.progTimerMax + 1)), this.triValue > 16 && (this.triValue = 16), this.triangle.triangleCounter >= 16 && (this.triValue = 16 - this.triValue), this.triValue += this.triangle.sampleValue), e === 2 ? (this.smpTriangle += this.triValue << 1, this.smpDmc += this.dmc.sample << 1, this.smpSquare1 += this.square1.sampleValue << 1, this.smpSquare2 += this.square2.sampleValue << 1, this.accCount += 2) : e === 4 ? (this.smpTriangle += this.triValue << 2, this.smpDmc += this.dmc.sample << 2, this.smpSquare1 += this.square1.sampleValue << 2, this.smpSquare2 += this.square2.sampleValue << 2, this.accCount += 4) : (this.smpTriangle += e * this.triValue, this.smpDmc += e * this.dmc.sample, this.smpSquare1 += e * this.square1.sampleValue, this.smpSquare2 += e * this.square2.sampleValue, this.accCount += e);
  }
  frameCounterTick() {
    this.derivedFrameCounter++, this.derivedFrameCounter >= this.frameIrqCounterMax && (this.derivedFrameCounter = 0), (this.derivedFrameCounter === 1 || this.derivedFrameCounter === 3) && (this.triangle.clockLengthCounter(), this.square1.clockLengthCounter(), this.square2.clockLengthCounter(), this.noise.clockLengthCounter(), this.square1.clockSweep(), this.square2.clockSweep()), this.derivedFrameCounter >= 0 && this.derivedFrameCounter < 4 && (this.square1.clockEnvDecay(), this.square2.clockEnvDecay(), this.noise.clockEnvDecay(), this.triangle.clockLinearCounter()), this.derivedFrameCounter === 3 && this.countSequence === 0 && (this.frameIrqActive = !0);
  }
  sample() {
    let e, t;
    this.accCount > 0 ? (this.smpSquare1 <<= 4, this.smpSquare1 = Math.floor(this.smpSquare1 / this.accCount), this.smpSquare2 <<= 4, this.smpSquare2 = Math.floor(this.smpSquare2 / this.accCount), this.smpTriangle = Math.floor(this.smpTriangle / this.accCount), this.smpDmc <<= 4, this.smpDmc = Math.floor(this.smpDmc / this.accCount), this.accCount = 0) : (this.smpSquare1 = this.square1.sampleValue << 4, this.smpSquare2 = this.square2.sampleValue << 4, this.smpTriangle = this.triangle.sampleValue, this.smpDmc = this.dmc.sample << 4);
    const s = Math.floor((this.noise.accValue << 4) / this.noise.accCount);
    this.noise.accValue = s >> 4, this.noise.accCount = 1, e = this.smpSquare1 * this.stereoPosLSquare1 + this.smpSquare2 * this.stereoPosLSquare2 >> 8, t = 3 * this.smpTriangle * this.stereoPosLTriangle + (s << 1) * this.stereoPosLNoise + this.smpDmc * this.stereoPosLDMC >> 8, e >= this.squareTable.length && (e = this.squareTable.length - 1), t >= this.tndTable.length && (t = this.tndTable.length - 1);
    let r = this.squareTable[e] + this.tndTable[t] - this.dcValue;
    e = this.smpSquare1 * this.stereoPosRSquare1 + this.smpSquare2 * this.stereoPosRSquare2 >> 8, t = 3 * this.smpTriangle * this.stereoPosRTriangle + (s << 1) * this.stereoPosRNoise + this.smpDmc * this.stereoPosRDMC >> 8, e >= this.squareTable.length && (e = this.squareTable.length - 1), t >= this.tndTable.length && (t = this.tndTable.length - 1);
    let a = this.squareTable[e] + this.tndTable[t] - this.dcValue;
    const o = r - this.prevSampleL;
    this.prevSampleL += o, this.smpAccumL += o - (this.smpAccumL >> 10), r = this.smpAccumL;
    const n = a - this.prevSampleR;
    this.prevSampleR += n, this.smpAccumR += n - (this.smpAccumR >> 10), a = this.smpAccumR, r > this.maxSample && (this.maxSample = r), r < this.minSample && (this.minSample = r), this.nes.opts.onAudioSample && this.nes.opts.onAudioSample(r / 32768, a / 32768), this.smpSquare1 = 0, this.smpSquare2 = 0, this.smpTriangle = 0, this.smpDmc = 0;
  }
  getLengthMax(e) {
    return this.lengthLookup[e >> 3];
  }
  getDmcFrequency(e) {
    return e >= 0 && e < 16 ? this.dmcFreqLookup[e] : 0;
  }
  getNoiseWaveLength(e) {
    return e >= 0 && e < 16 ? this.noiseWavelengthLookup[e] : 0;
  }
  setPanning(e) {
    for (let t = 0; t < 5; t++)
      this.panning[t] = e[t];
    this.updateStereoPos();
  }
  setMasterVolume(e) {
    e < 0 && (e = 0), e > 256 && (e = 256), this.masterVolume = e, this.updateStereoPos();
  }
  updateStereoPos() {
    this.stereoPosLSquare1 = this.panning[0] * this.masterVolume >> 8, this.stereoPosLSquare2 = this.panning[1] * this.masterVolume >> 8, this.stereoPosLTriangle = this.panning[2] * this.masterVolume >> 8, this.stereoPosLNoise = this.panning[3] * this.masterVolume >> 8, this.stereoPosLDMC = this.panning[4] * this.masterVolume >> 8, this.stereoPosRSquare1 = this.masterVolume - this.stereoPosLSquare1, this.stereoPosRSquare2 = this.masterVolume - this.stereoPosLSquare2, this.stereoPosRTriangle = this.masterVolume - this.stereoPosLTriangle, this.stereoPosRNoise = this.masterVolume - this.stereoPosLNoise, this.stereoPosRDMC = this.masterVolume - this.stereoPosLDMC;
  }
  initLengthLookup() {
    this.lengthLookup = [10, 254, 20, 2, 40, 4, 80, 6, 160, 8, 60, 10, 14, 12, 26, 14, 12, 16, 24, 18, 48, 20, 96, 22, 192, 24, 72, 26, 16, 28, 32, 30];
  }
  initDmcFrequencyLookup() {
    this.dmcFreqLookup = new Array(16), this.dmcFreqLookup[0] = 3424, this.dmcFreqLookup[1] = 3040, this.dmcFreqLookup[2] = 2720, this.dmcFreqLookup[3] = 2560, this.dmcFreqLookup[4] = 2288, this.dmcFreqLookup[5] = 2032, this.dmcFreqLookup[6] = 1808, this.dmcFreqLookup[7] = 1712, this.dmcFreqLookup[8] = 1520, this.dmcFreqLookup[9] = 1280, this.dmcFreqLookup[10] = 1136, this.dmcFreqLookup[11] = 1024, this.dmcFreqLookup[12] = 848, this.dmcFreqLookup[13] = 672, this.dmcFreqLookup[14] = 576, this.dmcFreqLookup[15] = 432;
  }
  initNoiseWavelengthLookup() {
    this.noiseWavelengthLookup = new Array(16), this.noiseWavelengthLookup[0] = 4, this.noiseWavelengthLookup[1] = 8, this.noiseWavelengthLookup[2] = 16, this.noiseWavelengthLookup[3] = 32, this.noiseWavelengthLookup[4] = 64, this.noiseWavelengthLookup[5] = 96, this.noiseWavelengthLookup[6] = 128, this.noiseWavelengthLookup[7] = 160, this.noiseWavelengthLookup[8] = 202, this.noiseWavelengthLookup[9] = 254, this.noiseWavelengthLookup[10] = 380, this.noiseWavelengthLookup[11] = 508, this.noiseWavelengthLookup[12] = 762, this.noiseWavelengthLookup[13] = 1016, this.noiseWavelengthLookup[14] = 2034, this.noiseWavelengthLookup[15] = 4068;
  }
  initDACtables() {
    let e, t;
    this.squareTable = new Array(32 * 16), this.tndTable = new Array(204 * 16);
    for (let s = 0; s < 32 * 16; s++)
      e = 95.52 / (8128 / (s / 16) + 100), e *= 0.98411, e *= 5e4, t = Math.floor(e), this.squareTable[s] = t;
    for (let s = 0; s < 204 * 16; s++)
      e = 163.67 / (24329 / (s / 16) + 100), e *= 0.98411, e *= 5e4, t = Math.floor(e), this.tndTable[s] = t;
    this.dacRange = Math.max(...this.squareTable) + Math.max(...this.tndTable), this.dcValue = this.dacRange / 2;
  }
  toJSON() {
    const e = At(this);
    return e.dmc = this.dmc.toJSON(), e.noise = this.noise.toJSON(), e.square1 = this.square1.toJSON(), e.square2 = this.square2.toJSON(), e.triangle = this.triangle.toJSON(), e;
  }
  fromJSON(e) {
    Ct(this, e), this.dmc.fromJSON(e.dmc), this.noise.fromJSON(e.noise), this.square1.fromJSON(e.square1), this.square2.fromJSON(e.square2), this.triangle.fromJSON(e.triangle);
  }
}
class F0 {
  constructor(e) {
    h(this, "nes");
    h(this, "joy1StrobeState", 0);
    h(this, "joy2StrobeState", 0);
    h(this, "joypadLastWrite", 0);
    h(this, "zapperFired", !1);
    h(this, "zapperX", 0);
    h(this, "zapperY", 0);
    this.nes = e;
  }
  reset() {
    this.joy1StrobeState = 0, this.joy2StrobeState = 0, this.joypadLastWrite = 0, this.zapperFired = !1, this.zapperX = 0, this.zapperY = 0;
  }
  toJSON() {
    const e = {};
    for (const t in this)
      t !== "nes" && (e[t] = this[t]);
    return e;
  }
  fromJSON(e) {
    Object.assign(this, e);
  }
}
class B extends F0 {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    t < 8192 ? this.nes.cpu.mem[t & 2047] = s : t > 16407 ? (this.nes.cpu.mem[t] = s, t >= 24576 && t < 32768 && this.nes.opts.onBatteryRamWrite(t, s)) : t > 8199 && t < 16384 ? this.regWrite(8192 + (t & 7), s) : this.regWrite(t, s);
  }
  writelow(t, s) {
    t < 8192 ? this.nes.cpu.mem[t & 2047] = s : t > 16407 ? this.nes.cpu.mem[t] = s : t > 8199 && t < 16384 ? this.regWrite(8192 + (t & 7), s) : this.regWrite(t, s);
  }
  load(t) {
    return t &= 65535, t > 16407 ? this.nes.cpu.mem[t] : t >= 8192 ? this.regLoad(t) : this.nes.cpu.mem[t & 2047];
  }
  regLoad(t) {
    switch (t >> 12) {
      case 0:
        break;
      case 1:
        break;
      case 2:
      // Fall through to case 3
      case 3:
        switch (t & 7) {
          case 0:
            return this.nes.cpu.mem[8192];
          case 1:
            return this.nes.cpu.mem[8193];
          case 2:
            return this.nes.ppu.readStatusRegister();
          case 3:
            return 0;
          case 4:
            return this.nes.ppu.sramLoad();
          case 5:
            return 0;
          case 6:
            return 0;
          case 7:
            return this.nes.ppu.vramLoad();
        }
        break;
      case 4:
        switch (t - 16405) {
          case 0:
            return this.nes.papu.readReg(t);
          case 1:
            return this.joy1Read();
          case 2:
            let s = 0;
            return this.zapperX != null && this.zapperY != null && this.nes.ppu.isPixelWhite(this.zapperX, this.zapperY) ? s = 0 : s = 8, this.zapperFired && (s |= 16), (this.joy2Read() | s) & 65535;
        }
        break;
    }
    return 0;
  }
  regWrite(t, s) {
    switch (t) {
      case 8192:
        this.nes.cpu.mem[t] = s, this.nes.ppu.updateControlReg1(s);
        break;
      case 8193:
        this.nes.cpu.mem[t] = s, this.nes.ppu.updateControlReg2(s);
        break;
      case 8195:
        this.nes.ppu.writeSRAMAddress(s);
        break;
      case 8196:
        this.nes.ppu.sramWrite(s);
        break;
      case 8197:
        this.nes.ppu.scrollWrite(s);
        break;
      case 8198:
        this.nes.ppu.writeVRAMAddress(s);
        break;
      case 8199:
        this.nes.ppu.vramWrite(s);
        break;
      case 16404:
        this.nes.ppu.sramDMA(s);
        break;
      case 16405:
        this.nes.papu.writeReg(t, s);
        break;
      case 16406:
        (s & 1) === 0 && (this.joypadLastWrite & 1) === 1 && (this.joy1StrobeState = 0, this.joy2StrobeState = 0), this.joypadLastWrite = s;
        break;
      case 16407:
        this.nes.papu.writeReg(t, s);
        break;
      default:
        t >= 16384 && t <= 16407 && this.nes.papu.writeReg(t, s);
    }
  }
  joy1Read() {
    let t;
    switch (this.joy1StrobeState) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        t = this.nes.controllers[1].state[this.joy1StrobeState];
        break;
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        t = 0;
        break;
      case 19:
        t = 1;
        break;
      default:
        t = 0;
    }
    return this.joy1StrobeState++, this.joy1StrobeState === 24 && (this.joy1StrobeState = 0), t;
  }
  joy2Read() {
    let t;
    switch (this.joy2StrobeState) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        t = this.nes.controllers[2].state[this.joy2StrobeState];
        break;
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        t = 0;
        break;
      case 19:
        t = 1;
        break;
      default:
        t = 0;
    }
    return this.joy2StrobeState++, this.joy2StrobeState === 24 && (this.joy2StrobeState = 0), t;
  }
  loadROM() {
    if (!this.nes.rom.valid || this.nes.rom.prgCount < 1)
      throw new Error("NoMapper: Invalid ROM! Unable to load.");
    this.loadPRGROM(), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  loadPRGROM() {
    this.nes.rom.prgCount > 1 ? (this.loadRomBank(0, 32768), this.loadRomBank(1, 49152)) : (this.loadRomBank(0, 32768), this.loadRomBank(0, 49152));
  }
  loadCHRROM() {
    this.nes.rom.chrCount > 0 && (this.nes.rom.chrCount === 1 ? (this.loadVromBank(0, 0), this.loadVromBank(0, 4096)) : (this.loadVromBank(0, 0), this.loadVromBank(1, 4096)));
  }
  loadBatteryRam() {
    if (this.nes.rom.batteryRam) {
      const t = this.nes.rom.batteryRamData;
      Array.isArray(t) && t.length === 8192 && it(t, 0, this.nes.cpu.mem, 24576, 8192);
    }
  }
  loadRomBank(t, s) {
    t %= this.nes.rom.prgCount, it(this.nes.rom.prg[t], 0, this.nes.cpu.mem, s, 16384);
  }
  loadVromBank(t, s) {
    if (this.nes.rom.chrCount === 0) return;
    t = t % this.nes.rom.chrCount, this.nes.ppu.triggerRendering(), it(this.nes.rom.chr[t], 0, this.nes.ppu.vramMem, s, 4096);
    const r = this.nes.rom.vromTile[t];
    it(r, 0, this.nes.ppu.ptTile, s >> 4, 256);
  }
  load32kRomBank(t, s) {
    this.loadRomBank(t * 2 % this.nes.rom.prgCount, s), this.loadRomBank((t * 2 + 1) % this.nes.rom.prgCount, s + 16384);
  }
  load16kRomBank(t, s) {
    if ((s & 16383) !== 0)
      throw new Error(`Invalid 16KB ROM address: 0x${s.toString(16)}`);
    const r = this.nes.rom.prgCount * 2;
    t = t % r, this.loadRomBank(t, s), this.loadRomBank(t + 1, s + 8192);
  }
  load8kVromBank(t, s) {
    this.nes.rom.chrCount !== 0 && (this.nes.ppu.triggerRendering(), this.loadVromBank(t % this.nes.rom.chrCount, s), this.loadVromBank((t + 1) % this.nes.rom.chrCount, s + 4096));
  }
  load1kVromBank(t, s) {
    if (this.nes.rom.chrCount === 0)
      return;
    this.nes.ppu.triggerRendering();
    const r = Math.floor(t / 4) % this.nes.rom.chrCount, a = t % 4 * 1024;
    it(this.nes.rom.chr[r], a, this.nes.ppu.vramMem, s, 1024);
    const o = this.nes.rom.vromTile[r], n = s >> 4;
    for (let l = 0; l < 64; l++)
      this.nes.ppu.ptTile[n + l] = o[(t % 4 << 6) + l];
  }
  load2kVromBank(t, s) {
    if (this.nes.rom.chrCount === 0)
      return;
    this.nes.ppu.triggerRendering();
    const r = Math.floor(t / 2) % this.nes.rom.chrCount, a = t % 2 * 2048;
    it(this.nes.rom.chr[r], a, this.nes.ppu.vramMem, s, 2048);
    const o = this.nes.rom.vromTile[r], n = s >> 4;
    for (let l = 0; l < 128; l++)
      this.nes.ppu.ptTile[n + l] = o[(t % 2 << 7) + l];
  }
  load8kRomBank(t, s) {
    const r = Math.floor(t / 2) % this.nes.rom.prgCount, a = t % 2 * 8192;
    it(this.nes.rom.prg[r], a, this.nes.cpu.mem, s, 8192);
  }
  clockIrqCounter() {
  }
  latchAccess(t) {
  }
}
class w0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    // 5-bit buffer:
    h(this, "regBuffer", 0);
    h(this, "regBufferCounter", 0);
    // Register 0:
    h(this, "mirroring", 0);
    h(this, "oneScreenMirroring", 0);
    h(this, "prgSwitchingArea", 1);
    h(this, "prgSwitchingSize", 1);
    h(this, "vromSwitchingSize", 0);
    // Register 1:
    h(this, "romSelectionReg0", 0);
    // Register 2:
    h(this, "romSelectionReg1", 0);
    // Register 3:
    h(this, "romBankSelect", 0);
    this.nes = t;
  }
  reset() {
    super.reset(), this.regBuffer = 0, this.regBufferCounter = 0, this.mirroring = 0, this.oneScreenMirroring = 0, this.prgSwitchingArea = 1, this.prgSwitchingSize = 1, this.vromSwitchingSize = 0, this.romSelectionReg0 = 0, this.romSelectionReg1 = 0, this.romBankSelect = 0;
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    }
    (s & 128) === 0 ? (this.regBuffer = this.regBuffer & 255 - (1 << this.regBufferCounter) | (s & 1) << this.regBufferCounter, this.regBufferCounter++, this.regBufferCounter === 5 && (this.setReg(this.getRegNumber(t), this.regBuffer), this.regBuffer = 0, this.regBufferCounter = 0)) : (this.regBufferCounter = 0, this.regBuffer = 0, this.getRegNumber(t) === 0 && (this.prgSwitchingArea = 1, this.prgSwitchingSize = 1));
  }
  setReg(t, s) {
    let r, a, o = 0;
    switch (t) {
      case 0:
        r = s & 3, r !== this.mirroring && (this.mirroring = r, (this.mirroring & 2) === 0 ? this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING) : (this.mirroring & 1) === 0 ? this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING) : this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING)), this.prgSwitchingArea = s >> 2 & 1, this.prgSwitchingSize = s >> 3 & 1, this.vromSwitchingSize = s >> 4 & 1;
        break;
      case 1:
        this.romSelectionReg0 = s >> 4 & 1, this.nes.rom.chrCount > 0 && (this.vromSwitchingSize === 0 ? this.romSelectionReg0 === 0 ? this.load8kVromBank(s & 15, 0) : this.load8kVromBank(Math.floor(this.nes.rom.chrCount / 2) + (s & 15), 0) : this.romSelectionReg0 === 0 ? this.loadVromBank(s & 15, 0) : this.loadVromBank(Math.floor(this.nes.rom.chrCount / 2) + (s & 15), 0));
        break;
      case 2:
        this.romSelectionReg1 = s >> 4 & 1, this.nes.rom.chrCount > 0 && this.vromSwitchingSize === 1 && (this.romSelectionReg1 === 0 ? this.loadVromBank(s & 15, 4096) : this.loadVromBank(Math.floor(this.nes.rom.chrCount / 2) + (s & 15), 4096));
        break;
      default:
        r = s & 15, this.nes.rom.prgCount >= 32 ? this.vromSwitchingSize === 0 ? this.romSelectionReg0 === 1 && (o = 16) : o = (this.romSelectionReg0 | this.romSelectionReg1 << 1) << 3 : this.nes.rom.prgCount >= 16 && this.romSelectionReg0 === 1 && (o = 8), this.prgSwitchingSize === 0 ? (a = o + (s & 15), this.load32kRomBank(a, 32768)) : (a = o * 2 + (s & 15), this.prgSwitchingArea === 0 ? this.loadRomBank(a, 49152) : this.loadRomBank(a, 32768));
    }
  }
  getRegNumber(t) {
    return t >= 32768 && t <= 40959 ? 0 : t >= 40960 && t <= 49151 ? 1 : t >= 49152 && t <= 57343 ? 2 : 3;
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("MMC1: Invalid ROM! Unable to load.");
    this.loadRomBank(0, 32768), this.loadRomBank(this.nes.rom.prgCount - 1, 49152), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  switchLowHighPrgRom(t) {
  }
  switch16to32() {
  }
  switch32to16() {
  }
}
class O0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    } else {
      const r = s;
      this.loadRomBank(r, 32768);
    }
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("UxROM: Invalid ROM! Unable to load.");
    this.loadRomBank(0, 32768), this.loadRomBank(this.nes.rom.prgCount - 1, 49152), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}
class B0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    } else {
      const r = s % (this.nes.rom.chrCount / 2) * 2;
      this.loadVromBank(r, 0), this.loadVromBank(r + 1, 4096), this.load8kVromBank(s * 2, 0);
    }
  }
}
class pi extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    h(this, "CMD_SEL_2_1K_VROM_0000", 0);
    h(this, "CMD_SEL_2_1K_VROM_0800", 1);
    h(this, "CMD_SEL_1K_VROM_1000", 2);
    h(this, "CMD_SEL_1K_VROM_1400", 3);
    h(this, "CMD_SEL_1K_VROM_1800", 4);
    h(this, "CMD_SEL_1K_VROM_1C00", 5);
    h(this, "CMD_SEL_ROM_PAGE1", 6);
    h(this, "CMD_SEL_ROM_PAGE2", 7);
    h(this, "command", 0);
    h(this, "prgAddressSelect", 0);
    h(this, "chrAddressSelect", 0);
    h(this, "irqCounter", 0);
    h(this, "irqLatch", 0);
    h(this, "irqEnable", 0);
    h(this, "prgAddressChanged", !1);
    h(this, "prgBanks", new Array(8).fill(0));
    h(this, "currentCommand", 0);
    this.nes = t;
  }
  getCommand() {
    return this.currentCommand;
  }
  getPrgValue(t) {
    return this.prgBanks[t];
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    }
    const r = s >> 6 & 1;
    switch (t) {
      case 32768:
        this.command = s & 7, r !== this.prgAddressSelect && (this.prgAddressChanged = !0), this.prgAddressSelect = r, this.chrAddressSelect = s >> 7 & 1, this.currentCommand = s & 7, this.prgBanks[0] = s;
        break;
      case 32769:
        this.executeCommand(this.command, s), this.prgBanks[1] = s;
        break;
      case 40960:
        (s & 1) === 0 ? this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING) : this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING), this.prgBanks[2] = s;
        break;
      case 40961:
        this.prgBanks[3] = s;
        break;
      case 49152:
        this.irqCounter = s, this.prgBanks[4] = s;
        break;
      case 49153:
        this.irqLatch = s, this.prgBanks[5] = s;
        break;
      case 57344:
        this.irqEnable = 0, this.prgBanks[6] = s;
        break;
      case 57345:
        this.irqEnable = 1, this.prgBanks[7] = s;
        break;
    }
  }
  executeCommand(t, s) {
    switch (t) {
      case this.CMD_SEL_2_1K_VROM_0000:
        this.chrAddressSelect === 0 ? (this.load1kVromBank(s, 0), this.load1kVromBank(s + 1, 1024)) : (this.load1kVromBank(s, 4096), this.load1kVromBank(s + 1, 5120));
        break;
      case this.CMD_SEL_2_1K_VROM_0800:
        this.chrAddressSelect === 0 ? (this.load1kVromBank(s, 2048), this.load1kVromBank(s + 1, 3072)) : (this.load1kVromBank(s, 6144), this.load1kVromBank(s + 1, 7168));
        break;
      case this.CMD_SEL_1K_VROM_1000:
        this.chrAddressSelect === 0 ? this.load1kVromBank(s, 4096) : this.load1kVromBank(s, 0);
        break;
      case this.CMD_SEL_1K_VROM_1400:
        this.chrAddressSelect === 0 ? this.load1kVromBank(s, 5120) : this.load1kVromBank(s, 1024);
        break;
      case this.CMD_SEL_1K_VROM_1800:
        this.chrAddressSelect === 0 ? this.load1kVromBank(s, 6144) : this.load1kVromBank(s, 2048);
        break;
      case this.CMD_SEL_1K_VROM_1C00:
        this.chrAddressSelect === 0 ? this.load1kVromBank(s, 7168) : this.load1kVromBank(s, 3072);
        break;
      case this.CMD_SEL_ROM_PAGE1:
        this.prgAddressChanged && (this.prgAddressSelect === 0 ? this.load8kRomBank((this.nes.rom.prgCount - 1) * 2, 49152) : this.load8kRomBank((this.nes.rom.prgCount - 1) * 2, 32768), this.prgAddressChanged = !1), this.prgAddressSelect === 0 ? this.load8kRomBank(s, 32768) : this.load8kRomBank(s, 49152);
        break;
      case this.CMD_SEL_ROM_PAGE2:
        this.load8kRomBank(s, 40960), this.prgAddressChanged && (this.prgAddressSelect === 0 ? this.load8kRomBank((this.nes.rom.prgCount - 1) * 2, 49152) : this.load8kRomBank((this.nes.rom.prgCount - 1) * 2, 32768), this.prgAddressChanged = !1);
    }
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("MMC3: Invalid ROM! Unable to load.");
    this.load8kRomBank((this.nes.rom.prgCount - 1) * 2, 49152), this.load8kRomBank((this.nes.rom.prgCount - 1) * 2 + 1, 57344), this.load8kRomBank(0, 32768), this.load8kRomBank(1, 40960), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  clockIrqCounter() {
    this.irqEnable === 1 && (this.irqCounter--, this.irqCounter < 0 && (this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL), this.irqCounter = this.irqLatch));
  }
}
const M0 = class {
  constructor(i) {
    h(this, "nes");
    if (this.nes = i, this.nes.rom.isNES20 && this.nes.rom.submapper !== 0)
      throw this.nes.rom.notSupportError();
    return new pi(i);
  }
};
class y0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    h(this, "prg_size", 0);
    h(this, "chr_size", 0);
    h(this, "fill_chr", 0);
    h(this, "fill_pal", 0);
    h(this, "chr_mode", 0);
    h(this, "sram_we_a", 0);
    h(this, "sram_we_b", 0);
    h(this, "graphic_mode", 0);
    h(this, "nametable_mode", 0);
    h(this, "nametable_type", [0, 0, 0, 0]);
    h(this, "chr_page", []);
    h(this, "split_control", 0);
    h(this, "split_scroll", 0);
    h(this, "split_page", 0);
    h(this, "irq_line", 0);
    h(this, "irq_enable", 0);
    h(this, "mult_a", 0);
    h(this, "mult_b", 0);
    h(this, "irq_status", 0);
    this.nes = t;
  }
  write(t, s) {
    if (t < 20480) {
      super.write(t, s);
      return;
    }
    switch (t) {
      case 20736:
        this.prg_size = s & 3;
        break;
      case 20737:
        this.chr_size = s & 3;
        break;
      case 20738:
        this.sram_we_a = s & 3;
        break;
      case 20739:
        this.sram_we_b = s & 3;
        break;
      case 20740:
        this.graphic_mode = s & 3;
        break;
      case 20741:
        this.nametable_mode = s, this.nametable_type[0] = s & 3, this.load1kVromBank(s & 3, 8192), s >>= 2, this.nametable_type[1] = s & 3, this.load1kVromBank(s & 3, 9216), s >>= 2, this.nametable_type[2] = s & 3, this.load1kVromBank(s & 3, 10240), s >>= 2, this.nametable_type[3] = s & 3, this.load1kVromBank(s & 3, 11264);
        break;
      case 20742:
        this.fill_chr = s;
        break;
      case 20743:
        this.fill_pal = s & 3;
        break;
      case 20755:
        break;
      case 20756:
      case 20757:
      case 20758:
      case 20759:
        break;
      case 20768:
      case 20769:
      case 20770:
      case 20771:
      case 20772:
      case 20773:
      case 20774:
      case 20775:
        this.chr_mode = 0, this.chr_page[0][t & 7] = s;
        break;
      case 20776:
      case 20777:
      case 20778:
      case 20779:
        this.chr_mode = 1, this.chr_page[1][(t & 3) + 0] = s, this.chr_page[1][(t & 3) + 4] = s;
        break;
      case 20992:
        this.split_control = s;
        break;
      case 20993:
        this.split_scroll = s;
        break;
      case 20994:
        this.split_page = s & 63;
        break;
      case 20995:
        this.irq_line = s;
        break;
      case 20996:
        this.irq_enable = s;
        break;
      case 20997:
        this.mult_a = s;
        break;
      case 20998:
        this.mult_b = s;
        break;
      default:
        t >= 20480 && t <= 20501 ? this.nes.papu.writeReg(t, s) : t >= 23552 && t <= 24575 ? this.graphic_mode === 2 || this.graphic_mode !== 3 && this.irq_status & 64 : t >= 24576 && t <= 32767 && this.sram_we_a === 2 && this.sram_we_b;
        break;
    }
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("UNROM: Invalid ROM! Unable to load.");
    this.load8kRomBank(this.nes.rom.prgCount * 2 - 1, 32768), this.load8kRomBank(this.nes.rom.prgCount * 2 - 1, 40960), this.load8kRomBank(this.nes.rom.prgCount * 2 - 1, 49152), this.load8kRomBank(this.nes.rom.prgCount * 2 - 1, 57344), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}
class ps extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    h(this, "prgBank", 0);
    h(this, "chrBank", 0);
    h(this, "mirroring", 0);
    h(this, "wramEnabled", !0);
    h(this, "trainer", null);
    this.nes = t, this.nes.cpu.mem[17664] = 66, this.nes.cpu.mem[17151] = 16, this.nes.cpu.mem[17407] = 0;
  }
  reset() {
    super.reset(), this.prgBank = 0, this.chrBank = 0, this.mirroring = 0, this.wramEnabled = !0;
  }
  write(t, s) {
    var r, a;
    if (t < 8192)
      this.nes.cpu.mem[t & 2047] = s;
    else if (t >= 16416 && t <= 24575)
      switch (t) {
        case 17664:
          this.wramEnabled = (s & 64) === 0;
          break;
        case 17665:
          this.prgBank = s & 15, this.updateBanks();
          break;
        case 17666:
          this.chrBank = s & 15, this.updateBanks();
          break;
        case 17151:
          this.mirroring = s & 16, this.nes.ppu.setMirroring(this.mirroring ? this.nes.rom.HORIZONTAL_MIRRORING : this.nes.rom.VERTICAL_MIRRORING);
          break;
      }
    else {
      if (t >= 24576 && t < 32768) {
        this.wramEnabled && (this.nes.cpu.mem[t] = s, (a = (r = this.nes.opts).onBatteryRamWrite) == null || a.call(r, t, s));
        return;
      }
      super.write(t, s);
    }
  }
  updateBanks() {
    const t = this.prgBank * 32768;
    this.loadRomBank(t, 32768), this.loadRomBank(t + 16384, 49152);
    const s = this.chrBank * 8192;
    this.loadVromBank(s, 0);
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("Mapper6: Invalid ROM!");
    this.nes.rom.trainer && this.nes.rom.trainerData && it(this.nes.rom.trainerData, 0, this.nes.cpu.mem, 28672, 512), this.prgBank = 0, this.updateBanks(), this.nes.rom.chrCount > 0 && this.loadVromBank(0, 0), this.trainer && this.nes.cpu.jsr(28675), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  loadPRGROM() {
  }
  loadCHRROM() {
  }
  loadBatteryRam() {
    this.wramEnabled && super.loadBatteryRam();
  }
}
class L0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    t < 32768 ? super.write(t, s) : (this.load32kRomBank(s & 7, 32768), s & 16 ? this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING2) : this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING));
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("AOROM: Invalid ROM! Unable to load.");
    this.loadPRGROM(), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}
class P0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    h(this, "latchLo", 254);
    h(this, "latchHi", 254);
    h(this, "latchLoVal1", 0);
    h(this, "latchLoVal2", 4);
    h(this, "latchHiVal1", 0);
    h(this, "latchHiVal2", 0);
    this.nes = t;
  }
  reset() {
    super.reset(), this.latchLo = 254, this.latchHi = 254, this.latchLoVal1 = 0, this.latchLoVal2 = 4, this.latchHiVal1 = 0, this.latchHiVal2 = 0;
  }
  loadCHRROM() {
    this.latchLo = 254, this.latchHi = 254, this.loadVromBank(this.latchLoVal1, 0), this.loadVromBank(this.latchHiVal1, 4096);
  }
  write(t, s) {
    if (t < 32768)
      super.write(t, s);
    else
      switch (s &= 255, t &= 61440, t >> 12) {
        case 10: {
          this.load8kRomBank(s, 32768);
          break;
        }
        case 11: {
          this.latchLoVal1 = s, this.latchLo === 253 && this.loadVromBank(s, 0);
          break;
        }
        case 12: {
          this.latchLoVal2 = s, this.latchLo === 254 && this.loadVromBank(s, 0);
          break;
        }
        case 13: {
          this.latchHiVal1 = s, this.latchHi === 253 && this.loadVromBank(s, 4096);
          break;
        }
        case 14: {
          this.latchHiVal2 = s, this.latchHi === 254 && this.loadVromBank(s, 4096);
          break;
        }
        case 15: {
          const r = s & 1;
          this.nes.ppu.setMirroring(r ? this.nes.rom.HORIZONTAL_MIRRORING : this.nes.rom.VERTICAL_MIRRORING);
          break;
        }
      }
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("AOROM: Invalid ROM! Unable to load.");
    const t = this.nes.rom.prgCount * 2;
    this.load8kRomBank(0, 32768), this.load8kRomBank(t - 3, 40960), this.load8kRomBank(t - 2, 49152), this.load8kRomBank(t - 1, 57344), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  latchAccess(t) {
    const s = t & 8191;
    s === 4056 && this.latchLo !== 253 ? (this.loadVromBank(this.latchLoVal1, 0), this.latchLo = 253) : s === 4072 && this.latchLo !== 254 ? (this.loadVromBank(this.latchLoVal2, 0), this.latchLo = 254) : s >= 8152 && s <= 8159 && this.latchHi !== 253 ? (this.loadVromBank(this.latchHiVal1, 4096), this.latchHi = 253) : s >= 8168 && s <= 8175 && this.latchHi !== 254 && (this.loadVromBank(this.latchHiVal2, 4096), this.latchHi = 254);
  }
}
class V0 extends B {
  constructor(t) {
    super(t);
    h(this, "latchLo", 0);
    h(this, "latchHi", 0);
    h(this, "latchLoVal1", 0);
    h(this, "latchLoVal2", 0);
    h(this, "latchHiVal1", 0);
    h(this, "latchHiVal2", 0);
  }
  write(t, s) {
    if (t < 32768)
      super.write(t, s);
    else
      switch (s &= 255, t >> 12) {
        case 10: {
          this.loadRomBank(s, 32768);
          break;
        }
        case 11: {
          this.latchLoVal1 = s, this.latchLo === 253 && this.loadVromBank(s, 0);
          break;
        }
        case 12: {
          this.latchLoVal2 = s, this.latchLo === 254 && this.loadVromBank(s, 0);
          break;
        }
        case 13: {
          this.latchHiVal1 = s, this.latchHi === 253 && this.loadVromBank(s, 4096);
          break;
        }
        case 14: {
          this.latchHiVal2 = s, this.latchHi === 254 && this.loadVromBank(s, 4096);
          break;
        }
        case 15: {
          (s & 1) === 0 ? this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING) : this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);
          break;
        }
      }
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("010: Invalid ROM! Unable to load.");
    const t = this.nes.rom.prgCount * 4;
    this.loadRomBank(0, 32768), this.loadRomBank(t - 1, 49152), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  latchAccess(t) {
    const s = t < 8192;
    t &= 4080, s ? t === 4048 ? (this.latchLo = 253, this.loadVromBank(this.latchLoVal1, 0)) : t === 4064 && (this.latchLo = 254, this.loadVromBank(this.latchLoVal2, 0)) : t === 4048 ? (this.latchHi = 253, this.loadVromBank(this.latchHiVal1, 4096)) : t === 4064 && (this.latchHi = 254, this.loadVromBank(this.latchHiVal2, 4096));
  }
  reset() {
    this.latchLo = 254, this.latchHi = 254, this.latchLoVal1 = 0, this.latchLoVal2 = 4, this.latchHiVal1 = 0, this.latchHiVal2 = 0;
  }
}
class v0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    } else {
      const r = (s & 15) * 2 % this.nes.rom.prgCount, a = ((s & 15) * 2 + 1) % this.nes.rom.prgCount;
      if (this.loadRomBank(r, 32768), this.loadRomBank(a, 49152), this.nes.rom.chrCount > 0) {
        const o = (s >> 4) * 2 % this.nes.rom.chrCount;
        this.loadVromBank(o, 0), this.loadVromBank(o + 1, 4096);
      }
    }
  }
}
class G0 extends B {
  constructor(e) {
    super(e);
  }
  write(e, t) {
    if (e < 32768)
      super.write(e, t);
    else
      switch (e) {
        case 32768:
          (t & 128) === 0 ? (this.load8kRomBank((t & 63) * 2 + 0, 32768), this.load8kRomBank((t & 63) * 2 + 1, 40960), this.load8kRomBank((t & 63) * 2 + 2, 49152), this.load8kRomBank((t & 63) * 2 + 3, 57344)) : (this.load8kRomBank((t & 63) * 2 + 1, 32768), this.load8kRomBank((t & 63) * 2 + 0, 40960), this.load8kRomBank((t & 63) * 2 + 3, 49152), this.load8kRomBank((t & 63) * 2 + 2, 57344)), (t & 64) === 0 ? this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING) : this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);
          break;
        case 32769:
          (t & 128) === 0 ? (this.load8kRomBank((t & 63) * 2 + 0, 49152), this.load8kRomBank((t & 63) * 2 + 1, 57344)) : (this.load8kRomBank((t & 63) * 2 + 1, 49152), this.load8kRomBank((t & 63) * 2 + 0, 57344));
          break;
        case 32770:
          (t & 128) === 0 ? (this.load8kRomBank((t & 63) * 2, 32768), this.load8kRomBank((t & 63) * 2, 40960), this.load8kRomBank((t & 63) * 2, 49152), this.load8kRomBank((t & 63) * 2, 57344)) : (this.load8kRomBank((t & 63) * 2 + 1, 32768), this.load8kRomBank((t & 63) * 2 + 1, 40960), this.load8kRomBank((t & 63) * 2 + 1, 49152), this.load8kRomBank((t & 63) * 2 + 1, 57344));
          break;
        case 32771:
          (t & 128) === 0 ? (this.load8kRomBank((t & 63) * 2 + 0, 49152), this.load8kRomBank((t & 63) * 2 + 1, 57344)) : (this.load8kRomBank((t & 63) * 2 + 1, 49152), this.load8kRomBank((t & 63) * 2 + 0, 57344)), (t & 64) === 0 ? this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING) : this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);
          break;
      }
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("015: Invalid ROM! Unable to load.");
    this.load8kRomBank(0, 32768), this.load8kRomBank(1, 40960), this.load8kRomBank(2, 49152), this.load8kRomBank(3, 57344), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}
class q0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    h(this, "prgBanks", new Array(11).fill(0));
    h(this, "irqLatch", 0);
    h(this, "irqCounter", 0);
    h(this, "irqEnabled", !1);
    h(this, "irqSizeMode", 0);
    h(this, "prgRamEnabled", !1);
    h(this, "prgRamWriteable", !1);
    this.nes = t, this.reset();
  }
  reset() {
    this.prgBanks.fill(0), this.prgBanks[0] = 0, this.prgBanks[1] = 1, this.prgBanks[2] = 2, this.prgBanks[3] = this.nes.rom.prgCount * 2 - 1, this.irqEnabled = !1, this.irqLatch = 0, this.irqCounter = 0, this.irqSizeMode = 0, this.prgRamEnabled = !1, this.prgRamWriteable = !1, super.reset();
  }
  write(t, s) {
    if (t < 32768) {
      if (t >= 24576 && t < 32768) {
        this.prgRamEnabled && this.prgRamWriteable && (super.write(t, s), this.nes.opts.onBatteryRamWrite && this.nes.opts.onBatteryRamWrite(t, s));
        return;
      }
      super.write(t, s);
      return;
    }
    switch (t & 61443) {
      case 32768:
        this.prgBanks[0] = this.prgBanks[0] & 240 | s & 15, this.load8kRomBank(this.prgBanks[0], 32768);
        break;
      case 32769:
        this.prgBanks[0] = this.prgBanks[0] & 15 | (s & 3) << 4, this.load8kRomBank(this.prgBanks[0], 32768);
        break;
      case 32770:
        this.prgBanks[1] = this.prgBanks[1] & 240 | s & 15, this.load8kRomBank(this.prgBanks[1], 40960);
        break;
      case 32771:
        this.prgBanks[1] = this.prgBanks[1] & 15 | (s & 15) << 4, this.load8kRomBank(this.prgBanks[1], 40960);
        break;
      case 36864:
        this.prgBanks[2] = this.prgBanks[2] & 240 | s & 15, this.load8kRomBank(this.prgBanks[2], 49152);
        break;
      case 36865:
        this.prgBanks[2] = this.prgBanks[2] & 15 | (s & 15) << 4, this.load8kRomBank(this.prgBanks[2], 49152);
        break;
      case 36866:
        this.prgRamEnabled = (s & 1) !== 0, this.prgRamWriteable = (s & 2) !== 0;
        break;
      case 40960:
        this.prgBanks[3] = this.prgBanks[3] & 240 | s & 15, this.load1kVromBank(this.prgBanks[3], 0);
        break;
      case 40961:
        this.prgBanks[3] = this.prgBanks[3] & 15 | (s & 15) << 4, this.load1kVromBank(this.prgBanks[3], 0);
        break;
      case 40962:
        this.prgBanks[4] = this.prgBanks[4] & 240 | s & 15, this.load1kVromBank(this.prgBanks[4], 1024);
        break;
      case 40963:
        this.prgBanks[4] = this.prgBanks[4] & 15 | (s & 15) << 4, this.load1kVromBank(this.prgBanks[4], 1024);
        break;
      case 45056:
        this.prgBanks[5] = this.prgBanks[5] & 240 | s & 15, this.load1kVromBank(this.prgBanks[5], 2048);
        break;
      case 45057:
        this.prgBanks[5] = this.prgBanks[5] & 15 | (s & 15) << 4, this.load1kVromBank(this.prgBanks[5], 2048);
        break;
      case 45058:
        this.prgBanks[6] = this.prgBanks[6] & 240 | s & 15, this.load1kVromBank(this.prgBanks[6], 3072);
        break;
      case 45059:
        this.prgBanks[6] = this.prgBanks[6] & 15 | (s & 15) << 4, this.load1kVromBank(this.prgBanks[6], 3072);
        break;
      case 49152:
        this.prgBanks[7] = this.prgBanks[7] & 240 | s & 15, this.load1kVromBank(this.prgBanks[7], 4096);
        break;
      case 49153:
        this.prgBanks[7] = this.prgBanks[7] & 15 | (s & 15) << 4, this.load1kVromBank(this.prgBanks[7], 4096);
        break;
      case 49154:
        this.prgBanks[8] = this.prgBanks[8] & 240 | s & 15, this.load1kVromBank(this.prgBanks[8], 5120);
        break;
      case 49155:
        this.prgBanks[8] = this.prgBanks[8] & 15 | (s & 15) << 4, this.load1kVromBank(this.prgBanks[8], 5120);
        break;
      case 53248:
        this.prgBanks[9] = this.prgBanks[9] & 240 | s & 15, this.load1kVromBank(this.prgBanks[9], 6144);
        break;
      case 53249:
        this.prgBanks[9] = this.prgBanks[9] & 15 | (s & 15) << 4, this.load1kVromBank(this.prgBanks[9], 6144);
        break;
      case 53250:
        this.prgBanks[10] = this.prgBanks[10] & 240 | s & 15, this.load1kVromBank(this.prgBanks[10], 7168);
        break;
      case 53251:
        this.prgBanks[10] = this.prgBanks[10] & 15 | (s & 15) << 4, this.load1kVromBank(this.prgBanks[10], 7168);
        break;
      case 57344:
      case 57345:
      case 57346:
      case 57347:
        const a = (t & 3) * 4;
        this.irqLatch = this.irqLatch & ~(15 << a) | (s & 15) << a;
        break;
      case 61440:
        this.irqCounter = this.irqLatch, this.nes.cpu.irqRequested = !1, this.nes.cpu.irqType = null;
        break;
      case 61441:
        this.irqSizeMode = s >> 2 & 7, this.irqEnabled = (s & 1) !== 0, this.nes.cpu.irqRequested = !1, this.nes.cpu.irqType = null;
        break;
      case 61442:
        switch (s & 3) {
          case 0:
            this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);
            break;
          case 1:
            this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
            break;
          case 2:
            this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING);
            break;
          case 3:
            this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING2);
            break;
        }
        break;
      default:
        super.write(t, s);
    }
  }
  updatePrgBanks() {
    this.load8kRomBank(this.prgBanks[0], 32768), this.load8kRomBank(this.prgBanks[1], 40960), this.load8kRomBank(this.prgBanks[2], 49152), this.load8kRomBank(this.nes.rom.prgCount * 2 - 1, 57344);
  }
  clockIrqCounter() {
    if (!this.irqEnabled) return;
    this.irqCounter--;
    const t = this.getIrqMask();
    (this.irqCounter & t) === 0 && (this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL), this.irqCounter = this.irqLatch);
  }
  getIrqMask() {
    switch (this.irqSizeMode) {
      case 4:
        return 15;
      // 4-bit (mask 0x000F)
      case 2:
        return 255;
      // 8-bit (mask 0x00FF)
      case 1:
        return 4095;
      // 12-bit (mask 0x0FFF)
      default:
        return 65535;
    }
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("Mapper18: Invalid ROM!");
    this.prgBanks[0] = 0, this.prgBanks[1] = 1, this.prgBanks[2] = 2, this.updatePrgBanks(), this.loadBatteryRam(), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  load(t) {
    return t >= 24576 && t < 32768 ? this.prgRamEnabled ? super.load(t) : 255 : super.load(t);
  }
}
class H0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    h(this, "prgBank0", 0);
    h(this, "prgBank1", 0);
    h(this, "patch", 0);
    h(this, "crc");
    this.nes = t, this.crc = t.rom.crc, (this.crc === 1587265889 || this.crc === 3973820324 || this.crc === 1506610225 || this.crc === 2205946690 || this.crc === 1121489892 || this.crc === 327724729 || this.crc === 133066127 || this.crc === 1368652628 || this.crc === 2803643474) && (this.patch = 1);
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    }
    switch (t) {
      case 32768:
        this.patch === 1 && this.nes.ppu.setMirroring(s & 64 ? this.nes.rom.HORIZONTAL_MIRRORING : this.nes.rom.VERTICAL_MIRRORING), this.prgBank0 = s & 31, this.load8kRomBank(this.prgBank0, 32768);
        break;
      case 32769:
        this.prgBank1 = this.patch === 1 ? s & 31 : s, this.load8kRomBank(this.prgBank1, 40960);
        break;
      case 32770:
        this.load2kVromBank(s, 0);
        break;
      case 32771:
        this.load2kVromBank(s, 2048);
        break;
      case 40960:
        this.load1kVromBank(s, 4096);
        break;
      case 40961:
        this.load1kVromBank(s, 5120);
        break;
      case 40962:
        this.load1kVromBank(s, 6144);
        break;
      case 40963:
        this.load1kVromBank(s, 7168);
        break;
      default:
        super.write(t, s);
        break;
    }
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("Mapper33: Invalid ROM!");
    const t = this.nes.rom.prgCount * 2;
    this.load8kRomBank(t - 2, 49152), this.load8kRomBank(t - 1, 57344), this.load8kRomBank(0, 32768), this.load8kRomBank(1, 40960), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}
class Z0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    } else
      this.load32kRomBank(s, 32768);
  }
}
class X0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 28672 || t > 32767) {
      super.write(t, s);
      return;
    } else
      this.load32kRomBank(s & 3, 32768), this.load8kVromBank((s >> 2 & 3) * 2, 0);
  }
}
class z0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    h(this, "irqCounter", 0);
    h(this, "irqReload", 0);
    h(this, "irqEnabled", !1);
    h(this, "irqDelay", 0);
    h(this, "mirroring", 0);
    this.nes = t;
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    }
    switch (t & 57347) {
      // PRG 设置
      case 32768:
        this.load8kRomBank(s & 63, 32768);
        break;
      case 32769:
        this.load8kRomBank(s & 63, 40960);
        break;
      // CHR 设置（2KB banks）
      case 32770:
        this.load2kVromBank(s, 0);
        break;
      case 32771:
        this.load2kVromBank(s, 2048);
        break;
      // CHR 设置（1KB banks）
      case 40960:
        this.load1kVromBank(s, 4096);
        break;
      case 40961:
        this.load1kVromBank(s, 5120);
        break;
      case 40962:
        this.load1kVromBank(s, 6144);
        break;
      case 40963:
        this.load1kVromBank(s, 7168);
        break;
      // IRQ 控制
      case 49152:
        this.irqReload = s ^ 255;
        break;
      case 49153:
        this.irqCounter = this.irqReload;
        break;
      case 49154:
        this.irqEnabled = !0;
        break;
      case 49155:
        this.irqEnabled = !1, this.nes.cpu.irqRequested = !1, this.nes.cpu.irqType = null;
        break;
      // 镜像设置
      case 57344:
        this.mirroring = s & 128, this.nes.ppu.setMirroring(this.mirroring ? this.nes.rom.HORIZONTAL_MIRRORING : this.nes.rom.VERTICAL_MIRRORING);
        break;
      default:
        super.write(t, s);
    }
  }
  clockIrqCounter() {
    this.irqDelay > 0 && (this.irqDelay--, this.irqDelay === 0 && this.irqEnabled && this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL)), this.irqEnabled && this.irqCounter > 0 && (this.irqCounter--, this.irqCounter === 0 && (this.irqCounter = this.irqReload, this.irqDelay = 4));
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("Mapper48: Invalid ROM!");
    const t = this.nes.rom.prgCount * 2;
    this.load8kRomBank(t - 2, 49152), this.load8kRomBank(t - 1, 57344), this.load8kRomBank(0, 32768), this.load8kRomBank(1, 40960), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}
class U0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    } else
      this.load32kRomBank(s >> 4 & 3, 32768), this.load8kVromBank((s & 3) * 2, 0);
  }
}
class Y0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    } else
      this.loadRomBank(s >> 2, 32768);
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("UN1ROM: Invalid ROM! Unable to load.");
    this.loadRomBank(0, 32768), this.loadRomBank(this.nes.rom.prgCount - 1, 49152), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}
class W0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    h(this, "coin", 0);
    h(this, "currentChrBank", 0);
    this.nes = t, this.nes.ppu.setMirroring(this.nes.rom.FOURSCREEN_MIRRORING);
  }
  reset() {
    super.reset();
    const t = this.nes.rom.prgCount;
    t >= 4 ? (this.loadRomBank(0, 32768), this.loadRomBank(1, 40960), this.loadRomBank(2, 49152), this.loadRomBank(3, 57344)) : t === 2 ? (this.loadRomBank(0, 32768), this.loadRomBank(1, 40960), this.loadRomBank(0, 49152), this.loadRomBank(1, 57344)) : (this.loadRomBank(0, 32768), this.loadRomBank(0, 40960), this.loadRomBank(0, 49152), this.loadRomBank(0, 57344)), this.nes.rom.chrCount > 0 && (this.loadVromBank(0, 0), this.currentChrBank = 0), this.coin = 0;
  }
  write(t, s) {
    if (t === 16406) {
      const r = s & 4 ? 1 : 0;
      r !== this.currentChrBank && this.nes.rom.chrCount > 1 && (this.loadVromBank(r, 0), this.currentChrBank = r), this.nes.rom.crc === 3382624345 && (s & 2 ? this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL) : (this.nes.cpu.irqRequested = !1, this.nes.cpu.irqType = null));
    }
    if (t >= 16416 && t <= 24575) {
      t === 16416 && (this.coin = s);
      return;
    }
    super.write(t, s);
  }
  regLoad(t) {
    return t >= 16416 && t <= 24575 ? t === 16416 ? this.coin : t >> 8 : super.regLoad(t);
  }
  loadVromBank(t, s) {
    this.nes.rom.chrCount !== 0 && (t %= this.nes.rom.chrCount, it(this.nes.rom.chr[t], 0, this.nes.ppu.vramMem, s, 8192));
  }
}
class $0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 24576 || t > 32767) {
      super.write(t, s);
      return;
    } else
      this.load32kRomBank(s >> 4 & 3, 32768), this.load8kVromBank((s & 15) * 2, 0);
  }
}
class K0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    } else
      this.loadRomBank(s, 49152);
  }
  loadROM() {
    if (!this.nes.rom.valid)
      throw new Error("Mapper 180: Invalid ROM! Unable to load.");
    this.loadRomBank(0, 32768), this.loadRomBank(this.nes.rom.prgCount - 1, 49152), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
}
class J0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 16416 || t > 24575) {
      super.write(t, s);
      return;
    } else
      this.load32kRomBank(s >> 4 & 3, 32768), this.load8kVromBank((s & 15) * 2, 0);
  }
}
class j0 extends B {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    } else
      this.load32kRomBank(s, 32768);
  }
}
class Q0 extends pi {
  constructor(t) {
    super(t);
    h(this, "reg0", 0);
    h(this, "reg3", 0);
    h(this, "prg0", 0);
    h(this, "prg1", 1);
    h(this, "irqLatch", 0);
    h(this, "irqRequest", !1);
  }
  reset() {
    super.reset(), this.reg0 = 0, this.reg3 = 0, this.prg0 = 0, this.prg1 = 1, this.irqCounter = 0, this.irqLatch = 0, this.irqEnable = 0, this.irqRequest = !1;
    const t = (this.nes.rom.prgCount - 1) * 2;
    this.load8kRomBank(t | this.reg3, 49152), this.load8kRomBank(t + 1 | this.reg3, 57344), this.load8kRomBank(this.prg0 | this.reg3, 32768), this.load8kRomBank(this.prg1 | this.reg3, 40960);
  }
  write(t, s) {
    if (t < 32768) {
      super.write(t, s);
      return;
    }
    switch (t) {
      case 32768:
        this.reg0 = s;
        break;
      case 32769:
        switch (this.reg0 & 7) {
          case 0:
            this.reg3 = (s & 2) << 5, this.load8kRomBank(62 | this.reg3, 49152), this.load8kRomBank(63 | this.reg3, 57344);
            break;
          case 6:
            this.prg0 = s;
            break;
          case 7:
            this.prg1 = s;
            break;
        }
        this.load8kRomBank(this.prg0 | this.reg3, 32768), this.load8kRomBank(this.prg1 | this.reg3, 40960);
        break;
      case 40960:
        if (!this.nes.rom.fourScreen) {
          const r = s & 1 ? this.nes.rom.HORIZONTAL_MIRRORING : this.nes.rom.VERTICAL_MIRRORING;
          this.nes.ppu.setMirroring(r);
        }
        break;
      case 49152:
        this.irqCounter = s, this.nes.cpu.irqRequested = !1, this.nes.cpu.irqType = null;
        break;
      case 49153:
        this.irqLatch = s, this.nes.cpu.irqRequested = !1, this.nes.cpu.irqType = null;
        break;
      case 57344:
        this.irqEnable = 0, this.nes.cpu.irqRequested = !1, this.nes.cpu.irqType = null;
        break;
      case 57345:
        this.irqEnable = 1, this.nes.cpu.irqRequested = !1, this.nes.cpu.irqType = null;
        break;
      default:
        super.write(t, s);
    }
  }
}
class tn extends pi {
  constructor(t) {
    super(t);
    h(this, "nes");
    this.nes = t;
  }
  write(t, s) {
    if (t >= 32768) {
      const r = t & 57344;
      if (r === 32768 || r === 40960 || r === 49152 || r === 57344) {
        const a = t >> 10 & 1;
        let o;
        switch (r) {
          case 32768:
            o = a ? 32769 : 32768;
            break;
          case 40960:
            o = a ? 40961 : 40960;
            break;
          case 49152:
            o = a ? 49153 : 49152;
            break;
          case 57344:
            o = a ? 57345 : 57344;
            break;
          default:
            return;
        }
        const n = t & 255;
        super.write(o, n);
        return;
      }
    }
    super.write(t, s);
  }
}
const _s = {
  0: B,
  1: w0,
  2: O0,
  3: B0,
  4: M0,
  5: y0,
  6: ps,
  7: L0,
  8: ps,
  9: P0,
  10: V0,
  11: v0,
  15: G0,
  18: q0,
  33: H0,
  34: Z0,
  38: X0,
  48: z0,
  66: U0,
  94: Y0,
  99: W0,
  140: $0,
  180: K0,
  240: J0,
  241: j0,
  245: Q0,
  250: tn
}, w = class w {
  static Crc(e, t) {
    w.m_Init || (w.MakeTable(), w.m_Init = !0);
    let s = 4294967295, r = 0;
    for (; --e >= 0; ) {
      const a = s >>> 32 - w.CHAR_BIT ^ t[r];
      s = s << w.CHAR_BIT ^ w.m_CrcTable[a & 255], r++, s = s >>> 0;
    }
    return ~s >>> 0 & 4294967295;
  }
  static CrcRev(e, t) {
    w.m_InitRev || (w.MakeTableRev(), w.m_InitRev = !0);
    let s = 4294967295, r = 0;
    for (; --e >= 0; ) {
      const a = s & 255 ^ t[r];
      s = s >>> w.CHAR_BIT ^ w.m_CrcTableRev[a & 255], r++, s = s >>> 0;
    }
    return (s ^ 4294967295) >>> 0;
  }
  static MakeTable() {
    for (let e = 0; e <= 255; e++) {
      let t = e << 32 - w.CHAR_BIT;
      for (let s = 0; s < w.CHAR_BIT; s++)
        t & 2147483648 ? t = t << 1 ^ w.CRCPOLY1 : t <<= 1;
      w.m_CrcTable[e] = t >>> 0;
    }
  }
  static MakeTableRev() {
    for (let e = 0; e <= 255; e++) {
      let t = e;
      for (let s = 0; s < w.CHAR_BIT; s++)
        t & 1 ? t = t >>> 1 ^ w.CRCPOLY2 : t >>>= 1;
      w.m_CrcTableRev[e] = t >>> 0;
    }
  }
};
h(w, "CHAR_BIT", 8), h(w, "CRCPOLY1", 79764919), h(w, "CRCPOLY2", 3988292384), h(w, "m_Init", !1), h(w, "m_InitRev", !1), h(w, "m_CrcTable", new Uint32Array(256)), h(w, "m_CrcTableRev", new Uint32Array(256));
let nt = w;
class en {
  constructor(e) {
    h(this, "nes");
    // Mirroring types:
    h(this, "VERTICAL_MIRRORING", 0);
    h(this, "HORIZONTAL_MIRRORING", 1);
    h(this, "FOURSCREEN_MIRRORING", 2);
    h(this, "SINGLESCREEN_MIRRORING", 3);
    h(this, "SINGLESCREEN_MIRRORING2", 4);
    h(this, "SINGLESCREEN_MIRRORING3", 5);
    h(this, "CHRROM_MIRRORING", 7);
    h(this, "TRAINER_SIZE", 512);
    h(this, "header", []);
    h(this, "prg", []);
    h(this, "chr", []);
    h(this, "vromTile", []);
    h(this, "prgCount", 0);
    h(this, "chrCount", 0);
    h(this, "mirroring", 0);
    h(this, "batteryRam", !1);
    h(this, "batteryRamData", null);
    h(this, "trainer", !1);
    h(this, "trainerData", null);
    h(this, "fourScreen", !1);
    h(this, "mapperType", 0);
    h(this, "valid", !1);
    h(this, "mapperName", new Array(92));
    h(this, "submapper", -1);
    h(this, "isNES20", !1);
    // crc32
    h(this, "crc", 0);
    h(this, "crcall", 0);
    h(this, "crcvrom", 0);
    this.nes = e;
    for (let t = 0; t < 92; t++)
      this.mapperName[t] = "Unknown Mapper";
    this.mapperName[0] = "Direct Access", this.mapperName[1] = "Nintendo MMC1", this.mapperName[2] = "UNROM", this.mapperName[3] = "CNROM", this.mapperName[4] = ["Nintendo MMC3", "Nintendo MMC6", "MMC3C", "MC-ACC", "NEC MMC3", "T9552"], this.mapperName[5] = "Nintendo MMC5", this.mapperName[6] = "FFE F4xxx", this.mapperName[7] = "AOROM", this.mapperName[8] = "FFE F3xxx", this.mapperName[9] = "Nintendo MMC2", this.mapperName[10] = "Nintendo MMC4", this.mapperName[11] = "Color Dreams Chip", this.mapperName[12] = "FFE F6xxx", this.mapperName[15] = "100-in-1 switch", this.mapperName[16] = "Bandai chip", this.mapperName[17] = "FFE F8xxx", this.mapperName[18] = "Jaleco SS8806 chip", this.mapperName[19] = "Namcot 106 chip", this.mapperName[20] = "Famicom Disk System", this.mapperName[21] = "Konami VRC4a", this.mapperName[22] = "Konami VRC2a", this.mapperName[23] = "Konami VRC2a", this.mapperName[24] = "Konami VRC6", this.mapperName[25] = "Konami VRC4b", this.mapperName[32] = "Irem G-101 chip", this.mapperName[33] = "Taito TC0190/TC0350", this.mapperName[34] = "32kB ROM switch", this.mapperName[64] = "Tengen RAMBO-1 chip", this.mapperName[65] = "Irem H-3001 chip", this.mapperName[66] = "GNROM switch", this.mapperName[67] = "SunSoft3 chip", this.mapperName[68] = "SunSoft4 chip", this.mapperName[69] = "SunSoft5 FME-7 chip", this.mapperName[71] = "Camerica chip", this.mapperName[78] = "Irem 74HC161/32-based", this.mapperName[91] = "Pirate HK-SF3 chip";
  }
  load(e) {
    let t, s, r, a;
    if (typeof e == "string") {
      a = new Uint8Array(e.length);
      for (let p = 0; p < e.length; p++)
        a[p] = e.charCodeAt(p) & 255;
    } else
      a = e;
    if (this.header = Array.from(a.subarray(0, 16)), String.fromCharCode(...a.subarray(0, 4)) !== "NES")
      throw new Error("Not a valid NES ROM.");
    this.prgCount = this.header[4], this.chrCount = this.header[5] * 2, this.mirroring = (this.header[6] & 1) === 0 ? 0 : 1, this.batteryRam = (this.header[6] & 2) !== 0, this.trainer = (this.header[6] & 4) !== 0, this.fourScreen = (this.header[6] & 8) !== 0, this.mapperType = this.header[6] >> 4 | this.header[7] & 240, this.isNES20 = (this.header[7] & 12) === 8, this.isNES20 && (this.submapper = this.header[8] >> 4);
    let o = !1;
    for (t = 8; t < 16; t++)
      if (this.header[t] !== 0) {
        o = !0;
        break;
      }
    o && (this.mapperType &= 15);
    let n = 16;
    this.trainer && (this.trainerData = a.subarray(n, n + this.TRAINER_SIZE), n += this.TRAINER_SIZE), this.prg = new Array(this.prgCount);
    for (let p = 0; p < this.prgCount; p++) {
      const m = n + p * 16384, k = m + 16384;
      this.prg[p] = Array.from(a.subarray(m, k));
    }
    n += this.prgCount * 16384, this.chr = new Array(this.chrCount);
    for (let p = 0; p < this.chrCount; p++) {
      const m = n + p * 4096, k = m + 4096;
      this.chr[p] = Array.from(a.subarray(m, k));
    }
    for (this.vromTile = new Array(this.chrCount), t = 0; t < this.chrCount; t++)
      for (this.vromTile[t] = new Array(256), s = 0; s < 256; s++)
        this.vromTile[t][s] = new fr();
    let l, f;
    for (r = 0; r < this.chrCount; r++)
      for (t = 0; t < 4096; t++)
        l = t >> 4, f = t % 16, f < 8 ? this.vromTile[r][l].setScanline(f, this.chr[r][t], this.chr[r][t + 8]) : this.vromTile[r][l].setScanline(f - 8, this.chr[r][t - 8], this.chr[r][t]);
    this.valid = !0;
    const c = a.subarray(16), d = this.prgCount * 16384, _ = this.chrCount * 4096;
    if (this.trainer) {
      if (this.crc = nt.CrcRev(this.TRAINER_SIZE + d, c), this.crcall = nt.CrcRev(this.TRAINER_SIZE + d + _, c), this.chrCount > 0) {
        const p = this.TRAINER_SIZE + d, m = c.subarray(p, p + _);
        this.crcvrom = nt.CrcRev(_, m);
      }
    } else if (this.crc = nt.CrcRev(d, c), this.crcall = nt.CrcRev(d + _, c), this.chrCount > 0) {
      const p = c.subarray(d, d + _);
      this.crcvrom = nt.CrcRev(_, p);
    }
  }
  getMirroringType() {
    return this.fourScreen ? this.FOURSCREEN_MIRRORING : this.mirroring === 0 ? this.HORIZONTAL_MIRRORING : this.VERTICAL_MIRRORING;
  }
  getMapperName() {
    return this.mapperType >= 0 && this.mapperType < this.mapperName.length ? Array.isArray(this.mapperName[this.mapperType]) ? this.isNES20 && this.submapper >= 0 && this.submapper < this.mapperName[this.mapperType].length ? this.mapperName[this.mapperType][this.submapper] : this.mapperName[this.mapperType][0] : this.mapperName[this.mapperType] : `Unknown Mapper, ${this.mapperType}`;
  }
  mapperSupported() {
    return typeof _s[this.mapperType] < "u";
  }
  createMapper() {
    if (this.mapperSupported())
      return new _s[this.mapperType](this.nes);
    throw this.notSupportError();
  }
  notSupportError() {
    throw new Error(`This ROM uses a mapper not supported: ${this.getMapperName()}(${this.mapperType})`);
  }
  toJSON() {
    return {
      header: this.header,
      rom: this.prg,
      vrom: this.chr,
      vromTile: this.vromTile,
      romCount: this.prgCount,
      vromCount: this.chrCount,
      mirroring: this.mirroring,
      batteryRam: this.batteryRam,
      trainer: this.trainer,
      fourScreen: this.fourScreen,
      mapperType: this.mapperType,
      valid: this.valid,
      mapperName: this.mapperName
    };
  }
}
const Yt = class Yt {
  constructor(e) {
    h(this, "nes");
    h(this, "enable");
    h(this, "fixed");
    h(this, "greater");
    h(this, "lesser");
    this.nes = e, this.enable = !1, this.fixed = {}, this.greater = {}, this.lesser = {};
  }
  on(e, t, s) {
    if (!(e > this.nes.cpu.mem.length - 1))
      switch (this.enable || (this.enable = !0), t) {
        case 0:
          this.fixed[e] = s;
          break;
        case 1:
          this.nes.cpu.mem[e] = s;
          break;
        case 2:
          this.lesser[e] = s;
          break;
        case 3:
          this.greater[e] = s;
          break;
      }
  }
  onCheat(e) {
    const t = Yt.REG.exec(e);
    if (!t)
      return;
    const s = fe(t[1]), r = fe(t[2]), a = fe(t[4]);
    this.on(s, r, a);
  }
  removeCheatCode(e) {
    delete this.fixed[e], delete this.greater[e], delete this.lesser[e];
  }
  disableCheat(e) {
    const t = Yt.REG.exec(e);
    if (!t)
      return;
    const s = fe(t[1]);
    this.removeCheatCode(s);
  }
  reset() {
    this.enable = !1, this.fixed = {}, this.greater = {}, this.lesser = {};
  }
  frame() {
    this.enable && (Xe(this.fixed).forEach(([e, t]) => {
      this.nes.cpu.mem[e] = t;
    }), Xe(this.greater).forEach(([e, t]) => {
      this.nes.cpu.mem[e] < t && (this.nes.cpu.mem[e] = t);
    }), Xe(this.lesser).forEach(([e, t]) => {
      this.nes.cpu.mem[e] > t && (this.nes.cpu.mem[e] = t);
    }));
  }
};
h(Yt, "REG", /$([\dA-Fa-f]{4})-([0-3])([0-4])-([\dA-Fa-f]{2,8})^/);
let ti = Yt;
const st = class st {
  constructor(e) {
    h(this, "nes");
    h(this, "running", !1);
    h(this, "offset", 0);
    h(this, "controllerState");
    this.nes = e, this.controllerState = {};
  }
  parseFM2(e) {
    let t = st.REG.exec(e);
    if (!t)
      return !1;
    let s = 0, r = !1;
    for (this.reset(); t; ) {
      const a = t[1] === st.NONE, o = t[2] === st.NONE;
      if (a && o) {
        r && (this.controllerState[s] = {
          p1: U(64, 8),
          p2: U(64, 8)
        }, r = !1), s++, t = st.REG.exec(e);
        continue;
      }
      r = !0;
      const n = t[1] ? t[1].split("").map((f) => f === "." ? 64 : 65).reverse() : U(64, 8), l = t[2] ? t[2].split("").map((f) => f === "." ? 64 : 65).reverse() : U(64, 8);
      t = st.REG.exec(e), this.controllerState[s] = {
        p1: n,
        p2: l
      }, s++;
    }
    return !0;
  }
  reset() {
    this.running = !1;
  }
  run(e) {
    if (Object.keys(this.controllerState).length === 0) {
      console.warn("[@nes/core] No video data found.");
      return;
    }
    this.running = !0, e && (this.offset = e);
  }
  frame() {
    if (this.running) {
      const e = this.nes.frameCount + 1 + this.offset;
      if (e in this.controllerState) {
        const t = this.controllerState[e];
        this.nes.controllers[1].state = t.p1, this.nes.controllers[2].state = t.p2;
      }
    }
  }
  stop() {
    this.running = !1, this.nes.controllers[1].state = U(64, 8), this.nes.controllers[2].state = U(64, 8);
  }
};
h(st, "REG", /\|\d\|([.ABDLR-U]{8})\|([.ABDLR-U]{8})?\|\|/g), h(st, "NONE", "........");
let ei = st;
class sn {
  constructor(e) {
    h(this, "opt");
    h(this, "fpsFrameCount", 0);
    // FPS counter
    h(this, "frameCount", 0);
    // Frame counter
    h(this, "romData");
    // Loaded ROM data
    h(this, "break", !1);
    // Flag to break out of frame loop
    h(this, "lastFpsTime", 0);
    // Time of last FPS calculation
    h(this, "opts", {
      onFrame: function() {
      },
      onAudioSample: function() {
      },
      onStatusUpdate: function() {
      },
      onBatteryRamWrite: function() {
      },
      // FIXME: not actually used except for in PAPU
      preferredFrameRate: 60,
      emulateSound: !0,
      sampleRate: 48e3,
      // Sound sample rate in hz
      compressSaveState: !0
    });
    h(this, "cpu");
    h(this, "ppu");
    h(this, "papu");
    h(this, "mmap");
    h(this, "rom");
    h(this, "cheat");
    h(this, "video");
    h(this, "crashMessage", "");
    h(this, "controllers");
    h(this, "ui");
    h(this, "frameTime");
    this.opt = e, Object.assign(this.opts, e), this.frameTime = 1e3 / this.opts.preferredFrameRate, this.ui = {
      writeFrame: this.opts.onFrame,
      updateStatus: this.opts.onStatusUpdate
    }, this.cpu = new fi(this), this.ppu = new ci(this), this.papu = new T0(this), this.cheat = new ti(this), this.video = new ei(this), this.controllers = {
      1: new $(),
      2: new $()
    }, this.ui.updateStatus("Ready to load a ROM."), this.frame = this.frame.bind(this), this.buttonDown = this.buttonDown.bind(this), this.buttonUp = this.buttonUp.bind(this), this.zapperMove = this.zapperMove.bind(this), this.zapperFireDown = this.zapperFireDown.bind(this), this.zapperFireUp = this.zapperFireUp.bind(this);
  }
  stop() {
    this.break = !0;
  }
  reset() {
    this.mmap != null && this.mmap.reset(), this.cpu.reset(), this.ppu.reset(), this.papu.reset(), this.cheat.reset(), this.video.reset(), this.lastFpsTime = 0, this.fpsFrameCount = 0, this.frameCount = 0, this.break = !1;
  }
  frame() {
    this.ppu.startFrame();
    let e = 0;
    const t = this.opts.emulateSound, s = this.cpu, r = this.ppu, a = this.papu;
    t: for (; !this.break; )
      for (s.cyclesToHalt === 0 ? (e = s.emulate(), t && a.clockFrameCounter(e), e *= 3) : s.cyclesToHalt > 8 ? (e = 24, t && a.clockFrameCounter(8), s.cyclesToHalt -= 8) : (e = s.cyclesToHalt * 3, t && a.clockFrameCounter(s.cyclesToHalt), s.cyclesToHalt = 0); e > 0; e--) {
        if (r.curX === r.spr0HitX && r.f_spVisibility === 1 && r.scanline - 21 === r.spr0HitY && r.setStatusFlag(r.STATUS_SPRITE0HIT, !0), r.requestEndFrame && (r.nmiCounter--, r.nmiCounter === 0)) {
          r.requestEndFrame = !1, r.startVBlank();
          break t;
        }
        r.curX++, r.curX === 341 && (r.curX = 0, r.endScanline());
      }
    this.fpsFrameCount++, this.frameCount++, this.cheat.frame(), this.video.frame();
  }
  playVideo(e, t = 0) {
    this.video.parseFM2(e) ? this.video.run(t) : console.warn("Invalid FM2 text.");
  }
  buttonDown(e, t) {
    this.controllers[e].buttonDown(t);
  }
  buttonUp(e, t) {
    this.controllers[e].buttonUp(t);
  }
  zapperMove(e, t) {
    this.mmap && (this.mmap.zapperX = e, this.mmap.zapperY = t);
  }
  zapperFireDown() {
    this.mmap && (this.mmap.zapperFired = !0);
  }
  zapperFireUp() {
    this.mmap && (this.mmap.zapperFired = !1);
  }
  getFPS() {
    const e = +/* @__PURE__ */ new Date();
    let t = 0;
    return this.lastFpsTime && (t = this.fpsFrameCount / ((e - this.lastFpsTime) / 1e3)), this.fpsFrameCount = 0, this.lastFpsTime = e, t;
  }
  reloadROM() {
    this.romData != null && this.loadROM(this.romData);
  }
  // Loads a ROM file into the CPU and PPU.
  // The ROM file is validated first.
  loadROM(e) {
    this.rom = new en(this), this.rom.load(e), this.romData = e, this.reset(), this.mmap = this.rom.createMapper(), this.mmap.loadROM(), this.ppu.setMirroring(this.rom.getMirroringType());
  }
  setFramerate(e) {
    this.opts.preferredFrameRate = e, this.frameTime = 1e3 / e;
  }
  toJSON() {
    const e = JSON.stringify({
      frameCount: this.frameCount,
      cpu: this.cpu.toJSON(),
      mmap: this.mmap.toJSON(),
      ppu: this.ppu.toJSON(),
      papu: this.papu.toJSON(),
      controllers: this.controllers
    });
    return {
      data: this.opts.compressSaveState ? m0(e) : e,
      compress: !!this.opts.compressSaveState
    };
  }
  fromJSON(e) {
    this.reset();
    const t = e.compress ? x0(e.data, {
      to: "string"
    }) : e.data, s = JSON.parse(t);
    this.ppu.reset(), this.frameCount = s.frameCount, this.cpu.fromJSON(s.cpu), this.mmap.fromJSON(s.mmap), this.ppu.fromJSON(s.ppu), this.papu.fromJSON(s.papu), Object.assign(this.controllers, s.controllers);
  }
}
const Ne = 256, Te = 240;
let ue, cr, pr, me;
const ii = new ImageData(Ne, Te);
function rn(i) {
  for (let e = 0; e < 256 * 240; e += 1)
    pr[e] = 4278190080 | i[e];
}
function hn() {
  ii.data.set(cr), me.putImageData(ii, 0, 0);
}
function an(i) {
  me = i.getContext("2d"), me.fillStyle = "black", me.fillRect(0, 0, Ne, Te);
  const e = new ArrayBuffer(ii.data.length);
  cr = new Uint8ClampedArray(e), pr = new Uint32Array(e), ue = requestAnimationFrame(t);
  function t() {
    cancelAnimationFrame(ue), ue = requestAnimationFrame(t), hn();
  }
}
function us(i) {
  const e = i.parentNode, t = e.clientWidth, s = e.clientHeight, r = t / s, a = Ne / Te;
  a < r ? (i.style.height = `${s}px`, i.style.width = `${Math.round(s + a)}px`) : (i.style.width = `${t}px`, i.style.height = `${Math.round(t / a)}px`);
}
function ms() {
  cancelAnimationFrame(ue);
}
function nn(i) {
  const e = new Image();
  return e.src = i.toDataURL("image/png"), e;
}
const V = new sn({
  onFrame: rn,
  onAudioSample: pn,
  sampleRate: _n()
}), Nt = { buffer: null };
function on() {
  V.frame();
}
function xs(i) {
  return {
    path: i,
    data: V.toJSON()
  };
}
function ln(i, e, t) {
  if (t && i.path !== t)
    return e({
      code: 2,
      message: `Load Error: The saved data is inconsistent with the current game, saved: ${i.path}, current: ${t}.`
    });
  if (!Nt.buffer)
    return e({
      code: 3,
      message: "Load Error: NES ROM is not loaded."
    });
  try {
    V.fromJSON(i.data);
  } catch (s) {
    console.error(s), e({
      code: 3,
      message: "Load Error: The saved data is invalid."
    });
  }
}
class fn {
  constructor() {
    h(this, "_events");
    h(this, "_auto");
    this._events = {}, this._auto = {
      1: {
        8: {
          timeout: 0,
          beDown: !1,
          once: !0
        },
        9: {
          timeout: 0,
          beDown: !1,
          once: !0
        }
      },
      2: {
        8: {
          timeout: 0,
          beDown: !1,
          once: !0
        },
        9: {
          timeout: 0,
          beDown: !1,
          once: !0
        }
      }
    };
  }
  on(e, t) {
    this._events[e] || (this._events[e] = []), this._events[e].push(t);
  }
  emit(e, t, s) {
    var r;
    (r = this._events[e]) == null || r.forEach((a) => {
      const o = a.p, n = V.controllers[o].state;
      if (a.index <= 7)
        n[a.index] = t;
      else {
        const l = this._auto[o][a.index];
        t === 65 ? l.once && (n[a.index - 8] = 65, l.timeout = window.setInterval(() => {
          n[a.index - 8] = l.beDown ? 65 : 64, l.beDown = !l.beDown;
        }, s), l.once = !1) : (clearInterval(l.timeout), n[a.index - 8] = 64, l.once = !0, l.beDown = !1);
      }
    });
  }
  getState(e) {
    return this._events[e];
  }
  init() {
    this._events = {};
  }
}
const xe = new fn();
let _t = new AudioContext(), Ft, si = 1;
const ds = 512, _i = 4 * 1024, Se = _i - 1, _r = new Float32Array(_i), ur = new Float32Array(_i);
let Ht = 0, de = 0;
function cn() {
  return Ht - de & Se;
}
function pn(i, e) {
  _r[Ht] = i, ur[Ht] = e, Ht = Ht + 1 & Se;
}
function _n() {
  if (!window.AudioContext)
    return 44100;
  const i = new window.AudioContext(), e = i.sampleRate;
  return i.close(), e;
}
function un() {
  _t = new AudioContext(), Ft = _t.createScriptProcessor(ds, 0, 2), Ft.onaudioprocess = (i) => {
    const e = i.outputBuffer, t = e.length;
    cn() < ds && on();
    const s = e.getChannelData(0), r = e.getChannelData(1);
    for (let a = 0; a < t; a++) {
      const o = de + a & Se;
      s[a] = _r[o] * si, r[a] = ur[o] * si;
    }
    de = de + t & Se;
  }, Ft.connect(_t.destination);
}
function Rs() {
  Ft.disconnect(_t.destination), Ft.onaudioprocess = null, Ft = {}, "close" in _t && _t.close();
}
function mn() {
  _t.suspend();
}
function xn() {
  _t.resume();
}
function gs(i) {
  si = ri(i, 0, 100) / 100;
}
function ce(i) {
  return Array(i).fill(!1);
}
function dn(i) {
  return i.filter(Boolean);
}
const bs = 0.3, Ss = {
  A: 0,
  B: 1,
  SELECT: 2,
  START: 3,
  UP: 4,
  DOWN: 5,
  LEFT: 6,
  RIGHT: 7,
  C: 8,
  D: 9
}, ui = {
  UP: "KeyW",
  DOWN: "KeyS",
  LEFT: "KeyA",
  RIGHT: "KeyD",
  A: "KeyK",
  B: "KeyJ",
  C: "KeyI",
  D: "KeyU",
  SELECT: "Digit2",
  START: "Digit1"
}, mi = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  A: "Numpad2",
  B: "Numpad1",
  C: "Numpad5",
  D: "Numpad4",
  SELECT: "NumpadDecimal",
  START: "NumpadEnter"
};
let mr = 1e3 / (2 * 16);
function Y(i, e) {
  xe.emit(i, e, mr);
}
class Rn {
  constructor(e) {
    h(this, "animationFrame");
    h(this, "axesHolding");
    h(this, "btnHolding");
    h(this, "gamepad_btns");
    window.addEventListener("gamepadconnected", this.connectHandler.bind(this, !0)), window.addEventListener("gamepaddisconnected", this.connectHandler.bind(this, !1)), this.animationFrame = requestAnimationFrame(this.frame.bind(this)), this.btnHolding = {
      p1: ce(20),
      p2: ce(20)
    }, this.axesHolding = {
      p1: ce(4),
      p2: ce(4)
    }, this.gamepad_btns = e;
  }
  get gamepads() {
    return dn(navigator.getGamepads());
  }
  connectHandler(e, t) {
    e ? this.gamepads[t.gamepad.index] = t.gamepad : this.gamepads.length === 0 && this.close();
  }
  axesHandler(e, t, s, r) {
    var o;
    const a = (o = this.axesHolding[e]) == null ? void 0 : o[s];
    t ? a || (Y(this.gamepad_btns.value[e][r], 65), this.axesHolding[e][s] = !0) : a && (Y(this.gamepad_btns.value[e][r], 64), this.axesHolding[e][s] = !1);
  }
  btnHandler(e, t, s) {
    var a;
    const r = (a = this.btnHolding[e]) == null ? void 0 : a[s];
    if (t.pressed) {
      if (r)
        return;
      Y(this.gamepad_btns.value[e][s], 65), this.btnHolding[e][s] = !0;
    } else r && (Y(this.gamepad_btns.value[e][s], 64), this.btnHolding[e][s] = !1);
  }
  frame() {
    for (let e = 0; e < this.gamepads.length && !(e > 1); e++) {
      const t = `p${e + 1}`, s = this.gamepads[e];
      s.buttons.forEach(this.btnHandler.bind(this, t));
      const r = s.axes[0], a = s.axes[1];
      this.axesHandler(t, r > bs, 0, 15), this.axesHandler(t, r < -0.3, 1, 14), this.axesHandler(t, a > bs, 2, 13), this.axesHandler(t, a < -0.3, 3, 12);
    }
  }
  run() {
    this.frame(), cancelAnimationFrame(this.animationFrame), this.animationFrame = requestAnimationFrame(this.run.bind(this));
  }
  close() {
    this.btnHolding.p1.fill(!1), this.btnHolding.p2.fill(!1), this.axesHolding.p1.fill(!1), this.axesHolding.p2.fill(!1), cancelAnimationFrame(this.animationFrame);
  }
}
function gn(i) {
  const e = pe(() => Object.assign(ui, i.p1)), t = pe(() => Object.assign(mi, i.p2));
  function s() {
    mr = 1e3 / (2 * ri(i.turbo, 5, 20));
  }
  function r() {
    xe.init(), Ds(Ss).forEach((n) => {
      const l = Ss[n];
      xe.on(e.value[n], {
        p: 1,
        index: l
      }), xe.on(t.value[n], {
        p: n === "SELECT" || n === "START" ? 1 : 2,
        index: l
      });
    });
  }
  r(), s(), Zt(() => i.p1, r, { deep: !0 }), Zt(() => i.p2, r, { deep: !0 }), Zt(() => i.turbo, s);
  const a = pe(() => ({
    p1: [
      e.value.A,
      e.value.C,
      e.value.B,
      e.value.D,
      "",
      "",
      "",
      "",
      e.value.SELECT,
      e.value.START,
      "",
      "",
      e.value.UP,
      e.value.DOWN,
      e.value.LEFT,
      e.value.RIGHT
    ],
    p2: [
      t.value.A,
      t.value.C,
      t.value.B,
      t.value.D,
      "",
      "",
      "",
      "",
      e.value.SELECT,
      e.value.START,
      "",
      "",
      t.value.UP,
      t.value.DOWN,
      t.value.LEFT,
      t.value.RIGHT
    ]
  })), o = new Rn(a);
  return Cs(() => {
    o.run();
  }), Es(() => {
    o.close();
  }), Y;
}
const bn = () => ks(), Sn = ["width", "height"], An = { style: { position: "absolute", top: "0", left: "0%", "background-color": "#000", width: "100%", height: "100%" } }, Cn = { name: "NesVue" }, Dn = /* @__PURE__ */ Ir({
  ...Cn,
  name: "NesVue",
  props: {
    url: {},
    autoStart: { type: Boolean, default: !1 },
    width: { default: "256px" },
    height: { default: "240px" },
    label: { default: "Game Start" },
    gain: { default: 100 },
    noClip: { type: Boolean, default: !1 },
    storage: { type: Boolean, default: !1 },
    debugger: { type: Boolean, default: !1 },
    turbo: { default: 16 },
    dbName: { default: "nes-vue" },
    p1: { default: () => ui },
    p2: { default: () => mi }
  },
  emits: ["fps", "success", "error", "saved", "loaded", "update:url", "removed"],
  setup(i, { expose: e, emit: t }) {
    const s = i, r = t;
    if (!s.url)
      throw "nes-vue missing props: url.";
    const a = gn(s), o = bn(), n = ks(!0), l = Gr(s.dbName, "save_data");
    let f = !1, c = "", d;
    function _(x) {
      return x.message = `[nes-vue] ${x.message}`, s.debugger && console.error(x.message), r("error", x), !1;
    }
    Dr(() => {
      V.ppu.clipToTvSize = !s.noClip;
    });
    function p(x) {
      a(x.code, 65);
    }
    function m(x) {
      a(x.code, 64);
    }
    function k() {
      document.addEventListener("keydown", p), document.addEventListener("keyup", m);
    }
    function A() {
      document.removeEventListener("keydown", p), document.removeEventListener("keyup", m);
    }
    function R(x = s.url) {
      if (Is(o.value))
        return;
      if (n.value ? n.value = !1 : (Rs(), ms(), clearInterval(d)), x !== s.url) {
        Nt.buffer = null, r("update:url", x);
        return;
      }
      an(o.value), new Promise((z, di) => {
        function Ri(ut) {
          try {
            V.loadROM(ut), d = window.setInterval(() => {
              const gi = V.getFPS();
              r("fps", gi || 0);
            }, 1e3), z("success");
          } catch {
            di({
              code: 0,
              message: `${x} loading Error: Probably the ROM is unsupported.`
            }), n.value = !0;
          }
        }
        Lr(Nt.buffer) ? Ri(Nt.buffer) : fetch(x).then((ut) => ut.arrayBuffer()).then((ut) => {
          Ri(new Uint8Array(ut));
        }).catch((ut) => {
          di({
            code: 0,
            message: `${x} loading Error: ${ut.message}`
          });
        }), o.value && us(o.value), k();
      }).then(() => {
        un(), r("success");
      }, (z) => (_(z), z));
    }
    function C() {
      V.reloadROM();
    }
    function S() {
      n.value || (Rs(), ms(), clearInterval(d), V.reset(), n.value = !0);
    }
    function u(x) {
      return x === void 0 ? _({
        code: 4,
        message: "TypeError: id is undefined."
      }) : !1;
    }
    function N(x) {
      ln(x, _, s.url);
    }
    function y(x) {
      if (!u(x))
        try {
          localStorage.setItem(x, JSON.stringify(xs(s.url))), r("saved", {
            id: x,
            message: "The state has been saved in localStorage",
            target: "localStorage"
          });
        } catch (M) {
          if (M.name === "QuotaExceededError")
            return _({
              code: 1,
              message: "Save Error: localStorage out of memory."
            });
        }
    }
    function g(x) {
      if (u(x))
        return;
      const M = localStorage.getItem(x);
      if (!M)
        return _({
          code: 2,
          message: "Load Error: nothing to load."
        });
      N(JSON.parse(M)), r("loaded", {
        id: x,
        message: "Loaded state from localStorage",
        target: "localStorage"
      });
    }
    function F(x) {
      if (!u(x))
        try {
          l.set_item(x, xs(s.url));
        } catch (M) {
          console.error(M), _({
            code: 1,
            message: "Save Error: Unable to save data to indexedDB."
          });
        }
    }
    function I(x) {
      u(x) || l.get_item(x).then((M) => {
        N(M);
      });
    }
    function b(x) {
      if (!u(x)) {
        if (n.value)
          return _({
            code: 1,
            message: "Save Error: Can only be saved while the game is running."
          });
        s.storage ? y(x) : F(x);
      }
    }
    function E(x) {
      if (!u(x)) {
        if (!V.cpu.irqRequested || n.value)
          return _({
            code: 2,
            message: "Load Error: Can only be loaded when the game is running."
          });
        s.storage ? g(x) : I(x), f && xi();
      }
    }
    function tt(x) {
      u(x) || (s.storage ? localStorage.removeItem(x) : l.remove_item(x));
    }
    function re() {
      l.clear();
    }
    function Et(x, M) {
      if (!o.value || n.value)
        return;
      const z = nn(o.value);
      return x && Vr(o.value, M), z;
    }
    function at(x = 0) {
      V.reloadROM(), A(), V.playVideo(c, x);
    }
    async function xr(x) {
      try {
        c = await (await fetch(x)).text();
      } catch (M) {
        return _({
          code: 4,
          message: "FM2 Error: Unable to load fm2 file."
        }), Promise.reject(M);
      }
      return at;
    }
    function dr() {
      V.video.stop(), k();
    }
    function Rr(x) {
      return c = x, Promise.resolve(at);
    }
    function gr(x) {
      V.cheat.onCheat(x);
    }
    function br(x) {
      V.cheat.disableCheat(x);
    }
    function Sr() {
      V.cheat.reset();
    }
    function Ar() {
      f = !0, mn();
    }
    function xi() {
      f = !1, xn();
    }
    const Cr = pe(() => {
      const x = /^\d*$/;
      let M = s.width, z = s.height;
      return Nr(() => {
        o.value && us(o.value);
      }), x.test(String(M)) && (M += "px"), x.test(String(z)) && (z += "px"), `width: ${M};height: ${z};background-color: #000;margin: auto;position: relative;overflow: hidden;`;
    });
    return Zt(() => s.url, () => {
      Nt.buffer = null, C();
    }), Zt(
      () => s.gain,
      () => {
        gs(s.gain);
      }
    ), Cs(() => {
      Nt.buffer = null, s.autoStart && R(), gs(s.gain);
    }), Es(() => {
      A(), S();
    }), e({
      start: R,
      reset: C,
      stop: S,
      pause: Ar,
      play: xi,
      save: b,
      load: E,
      remove: tt,
      clear: re,
      screenshot: Et,
      fm2URL: xr,
      fm2Text: Rr,
      fm2Play: at,
      fm2Stop: dr,
      cheatCode: gr,
      cancelCheatCode: br,
      cancelCheatCodeAll: Sr
    }), (x, M) => (Si(), bi("div", {
      style: Tr(Cr.value)
    }, [
      Ai("canvas", {
        ref_key: "cvs",
        ref: o,
        width: Ci(Ne),
        height: Ci(Te),
        style: { display: "inline-block" }
      }, null, 8, Sn),
      Fr(Ai("div", An, null, 512), [
        [Or, n.value]
      ]),
      n.value ? (Si(), bi("div", {
        key: 0,
        style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", cursor: "pointer", color: "#f8f4ed", "font-size": "20px" },
        onClick: M[0] || (M[0] = (z) => R())
      }, Br(x.label), 1)) : wr("", !0)
    ], 4));
  }
}), J = {};
function Dt(i, e, t, s, r) {
  i.addEventListener(t, s, r), J[e] = J[e] || {}, J[e][t] = J[e][t] || [], J[e][t].push(s);
}
function En(i, e) {
  J[e] && (Ds(J[e]).forEach((t) => {
    J[e][t].forEach((s) => {
      i.removeEventListener(t, s);
    }), delete J[e][t];
  }), delete J[e]);
}
function As(i) {
  return typeof i == "string" && (i = [i]), Array.from(new Set(i)).map((e) => e.toUpperCase()).sort();
}
const Nn = (i, e) => {
  if (!e.value)
    throw "[nes-vue] v-gamepad value is required";
  const t = (e.arg ?? "").toLowerCase(), s = e.modifiers.p2 || e.modifiers.P2, r = s ? mi : ui;
  if (e.oldValue) {
    const n = As(e.oldValue).filter((f) => Ei(f, r)), l = `gamepad-${`${t + (s ? "p2" : "p1")}-${n.join("-")}`}`;
    En(i, l);
  }
  const a = As(e.value).filter((n) => Ei(n, r)), o = `gamepad-${`${t + (s ? "p2" : "p1")}-${a.join("-")}`}`;
  a.length && (t === "touch" ? (Dt(i, o, "touchstart", () => {
    a.forEach((n) => {
      Y(r[n], 65);
    });
  }), Dt(i, o, "touchend", () => {
    a.forEach((n) => {
      Y(r[n], 64);
    });
  }), Dt(i, o, "touchcancel", () => {
    a.forEach((n) => {
      Y(r[n], 64);
    });
  })) : (Dt(i, o, "mousedown", () => {
    a.forEach((n) => {
      Y(r[n], 65);
    });
  }), Dt(i, o, "mouseup", () => {
    a.forEach((n) => {
      Y(r[n], 64);
    });
  }), Dt(i, o, "mouseleave", () => {
    a.forEach((n) => {
      Y(r[n], 64);
    });
  }), t && t !== "mouse" && console.warn("[nes-vue] argument should be mouse or touch, changed to default: mouse")));
};
export {
  Dn as NesVue,
  V as nes,
  Nn as vGamepad
};
