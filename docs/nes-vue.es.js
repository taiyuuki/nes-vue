var Ii = Object.defineProperty;
var Ni = (t, i, s) => i in t ? Ii(t, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[i] = s;
var x = (t, i, s) => (Ni(t, typeof i != "symbol" ? i + "" : i, s), s);
import { computed as U, watch as Y, onMounted as Vt, onBeforeUnmount as Gt, ref as qt, defineComponent as Ei, effect as Ti, nextTick as Oi, openBlock as gt, createElementBlock as At, normalizeStyle as Fi, createElementVNode as Ct, unref as Dt, withDirectives as Mi, vShow as yi, toDisplayString as Pi, createCommentVNode as vi } from "vue";
function ut(t, i, s) {
  return i > s && ([i, s] = [s, i]), Math.min(s, Math.max(i, t));
}
function C(t, i) {
  return Array.from({ length: t }).fill(i);
}
function ki(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t);
}
function Li(t) {
  return t === void 0;
}
function wi(t) {
  return t === null;
}
function it(t) {
  return typeof t == "number" ? isNaN(t) : wi(t) || Li(t);
}
function Bi(t) {
  return !it(t);
}
function Vi(t, i = !0) {
  const s = i ? !1 : it(t);
  return Array.isArray(t) ? t.length === 0 : s;
}
function Gi(t, i = !0) {
  const s = i ? !1 : it(t);
  return ki(t) ? Vi(Object.keys(t)) : s;
}
function Xt(t) {
  return Object.keys(t);
}
function rt(t) {
  return Object.entries(t);
}
function bt(t, i) {
  return t in i;
}
function q(t, i = 16) {
  i = ut(i, 2, 36);
  let s = "";
  for (let e = 1; e <= t; e++)
    s += Math.floor(Math.random() * i).toString(i);
  return s;
}
function Yt() {
  let t = "";
  if (typeof crypto < "u" && "randomUUID" in crypto)
    t = crypto.randomUUID();
  else if (typeof Blob > "u")
    t = `${q(8)}-${q(4)}-${q(4)}-${q(4)}-${q(12)}`;
  else {
    const i = URL.createObjectURL(new Blob());
    t = i.toString().substring(i.lastIndexOf("/") + 1), URL.revokeObjectURL(i);
  }
  return t;
}
function qi(t, i = Yt()) {
  const s = document.createElement("a");
  s.href = t, s.download = i, s.click();
}
function Xi(t, i = Yt()) {
  qi(t.toDataURL("image/png"), i);
}
class Yi {
  constructor(i, s, e) {
    x(this, "_dataFactory", window.indexedDB);
    x(this, "_dbName");
    x(this, "_storeName");
    x(this, "_database");
    x(this, "_res");
    this._dataFactory = window.indexedDB, this._dbName = i, this._storeName = s, this._res = this._dataFactory.open(this._dbName, e), this._res.addEventListener("success", () => {
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
  set_item(i, s) {
    this._store.put({ id: i, data: s });
  }
  get_item(i) {
    const s = this._store.get(i);
    return new Promise((e, r) => {
      s.addEventListener("success", () => {
        e(s.result.data);
      }), s.addEventListener("error", r);
    });
  }
  remove_item(i) {
    this._store.delete(i);
  }
  clear() {
    this._store.clear();
  }
}
function Hi(t, i) {
  return new Yi(t, i);
}
var b = function() {
  this.state = new Array(8);
  for (var t = 0; t < this.state.length; t++)
    this.state[t] = 64;
};
b.BUTTON_A = 0;
b.BUTTON_B = 1;
b.BUTTON_SELECT = 2;
b.BUTTON_START = 3;
b.BUTTON_UP = 4;
b.BUTTON_DOWN = 5;
b.BUTTON_LEFT = 6;
b.BUTTON_RIGHT = 7;
b.prototype = {
  buttonDown: function(t) {
    this.state[t] = 65;
  },
  buttonUp: function(t) {
    this.state[t] = 64;
  }
};
var Ht = b, pt = {
  copyArrayElements: function(t, i, s, e, r) {
    for (var a = 0; a < r; ++a)
      s[e + a] = t[i + a];
  },
  copyArray: function(t) {
    return t.slice(0);
  },
  fromJSON: function(t, i) {
    for (var s = 0; s < t.JSON_PROPERTIES.length; s++)
      t[t.JSON_PROPERTIES[s]] = i[t.JSON_PROPERTIES[s]];
  },
  toJSON: function(t) {
    for (var i = {}, s = 0; s < t.JSON_PROPERTIES.length; s++)
      i[t.JSON_PROPERTIES[s]] = t[t.JSON_PROPERTIES[s]];
    return i;
  }
}, It = pt, Wt = function(t) {
  this.nes = t, this.mem = null, this.REG_ACC = null, this.REG_X = null, this.REG_Y = null, this.REG_SP = null, this.REG_PC = null, this.REG_PC_NEW = null, this.REG_STATUS = null, this.F_CARRY = null, this.F_DECIMAL = null, this.F_INTERRUPT = null, this.F_INTERRUPT_NEW = null, this.F_OVERFLOW = null, this.F_SIGN = null, this.F_ZERO = null, this.F_NOTUSED = null, this.F_NOTUSED_NEW = null, this.F_BRK = null, this.F_BRK_NEW = null, this.opdata = null, this.cyclesToHalt = null, this.crash = null, this.irqRequested = null, this.irqType = null, this.reset();
};
Wt.prototype = {
  IRQ_NORMAL: 0,
  IRQ_NMI: 1,
  IRQ_RESET: 2,
  reset: function() {
    this.mem = new Array(65536);
    for (var t = 0; t < 8192; t++)
      this.mem[t] = 255;
    for (var i = 0; i < 4; i++) {
      var s = i * 2048;
      this.mem[s + 8] = 247, this.mem[s + 9] = 239, this.mem[s + 10] = 223, this.mem[s + 15] = 191;
    }
    for (var e = 8193; e < this.mem.length; e++)
      this.mem[e] = 0;
    this.REG_ACC = 0, this.REG_X = 0, this.REG_Y = 0, this.REG_SP = 511, this.REG_PC = 32768 - 1, this.REG_PC_NEW = 32768 - 1, this.REG_STATUS = 40, this.setStatus(40), this.F_CARRY = 0, this.F_DECIMAL = 0, this.F_INTERRUPT = 1, this.F_INTERRUPT_NEW = 1, this.F_OVERFLOW = 0, this.F_SIGN = 0, this.F_ZERO = 1, this.F_NOTUSED = 1, this.F_NOTUSED_NEW = 1, this.F_BRK = 1, this.F_BRK_NEW = 1, this.opdata = new Zt().opdata, this.cyclesToHalt = 0, this.crash = !1, this.irqRequested = !1, this.irqType = null;
  },
  emulate: function() {
    var t, i;
    if (this.irqRequested) {
      switch (t = this.F_CARRY | (this.F_ZERO === 0 ? 1 : 0) << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7, this.REG_PC_NEW = this.REG_PC, this.F_INTERRUPT_NEW = this.F_INTERRUPT, this.irqType) {
        case 0: {
          if (this.F_INTERRUPT !== 0)
            break;
          this.doIrq(t);
          break;
        }
        case 1: {
          this.doNonMaskableInterrupt(t);
          break;
        }
        case 2: {
          this.doResetInterrupt();
          break;
        }
      }
      this.REG_PC = this.REG_PC_NEW, this.F_INTERRUPT = this.F_INTERRUPT_NEW, this.F_BRK = this.F_BRK_NEW, this.irqRequested = !1;
    }
    var s = this.opdata[this.nes.mmap.load(this.REG_PC + 1)], e = s >> 24, r = 0, a = s >> 8 & 255, n = this.REG_PC;
    this.REG_PC += s >> 16 & 255;
    var h = 0;
    switch (a) {
      case 0: {
        h = this.load(n + 2);
        break;
      }
      case 1: {
        h = this.load(n + 2), h < 128 ? h += this.REG_PC : h += this.REG_PC - 256;
        break;
      }
      case 2:
        break;
      case 3: {
        h = this.load16bit(n + 2);
        break;
      }
      case 4: {
        h = this.REG_ACC;
        break;
      }
      case 5: {
        h = this.REG_PC;
        break;
      }
      case 6: {
        h = this.load(n + 2) + this.REG_X & 255;
        break;
      }
      case 7: {
        h = this.load(n + 2) + this.REG_Y & 255;
        break;
      }
      case 8: {
        h = this.load16bit(n + 2), (h & 65280) !== (h + this.REG_X & 65280) && (r = 1), h += this.REG_X;
        break;
      }
      case 9: {
        h = this.load16bit(n + 2), (h & 65280) !== (h + this.REG_Y & 65280) && (r = 1), h += this.REG_Y;
        break;
      }
      case 10: {
        h = this.load(n + 2), (h & 65280) !== (h + this.REG_X & 65280) && (r = 1), h += this.REG_X, h &= 255, h = this.load16bit(h);
        break;
      }
      case 11: {
        h = this.load16bit(this.load(n + 2)), (h & 65280) !== (h + this.REG_Y & 65280) && (r = 1), h += this.REG_Y;
        break;
      }
      case 12: {
        h = this.load16bit(n + 2), h < 8191 ? h = this.mem[h] + (this.mem[h & 65280 | (h & 255) + 1 & 255] << 8) : h = this.nes.mmap.load(h) + (this.nes.mmap.load(
          h & 65280 | (h & 255) + 1 & 255
        ) << 8);
        break;
      }
    }
    switch (h &= 65535, s & 255) {
      case 0: {
        t = this.REG_ACC + this.load(h) + this.F_CARRY, ((this.REG_ACC ^ this.load(h)) & 128) === 0 && ((this.REG_ACC ^ t) & 128) !== 0 ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = t > 255 ? 1 : 0, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t & 255, this.REG_ACC = t & 255, e += r;
        break;
      }
      case 1: {
        this.REG_ACC = this.REG_ACC & this.load(h), this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, a !== 11 && (e += r);
        break;
      }
      case 2: {
        a === 4 ? (this.F_CARRY = this.REG_ACC >> 7 & 1, this.REG_ACC = this.REG_ACC << 1 & 255, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC) : (t = this.load(h), this.F_CARRY = t >> 7 & 1, t = t << 1 & 255, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t, this.write(h, t));
        break;
      }
      case 3: {
        this.F_CARRY === 0 && (e += (n & 65280) !== (h & 65280) ? 2 : 1, this.REG_PC = h);
        break;
      }
      case 4: {
        this.F_CARRY === 1 && (e += (n & 65280) !== (h & 65280) ? 2 : 1, this.REG_PC = h);
        break;
      }
      case 5: {
        this.F_ZERO === 0 && (e += (n & 65280) !== (h & 65280) ? 2 : 1, this.REG_PC = h);
        break;
      }
      case 6: {
        t = this.load(h), this.F_SIGN = t >> 7 & 1, this.F_OVERFLOW = t >> 6 & 1, t &= this.REG_ACC, this.F_ZERO = t;
        break;
      }
      case 7: {
        this.F_SIGN === 1 && (e++, this.REG_PC = h);
        break;
      }
      case 8: {
        this.F_ZERO !== 0 && (e += (n & 65280) !== (h & 65280) ? 2 : 1, this.REG_PC = h);
        break;
      }
      case 9: {
        this.F_SIGN === 0 && (e += (n & 65280) !== (h & 65280) ? 2 : 1, this.REG_PC = h);
        break;
      }
      case 10: {
        this.REG_PC += 2, this.push(this.REG_PC >> 8 & 255), this.push(this.REG_PC & 255), this.F_BRK = 1, this.push(
          this.F_CARRY | (this.F_ZERO === 0 ? 1 : 0) << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7
        ), this.F_INTERRUPT = 1, this.REG_PC = this.load16bit(65534), this.REG_PC--;
        break;
      }
      case 11: {
        this.F_OVERFLOW === 0 && (e += (n & 65280) !== (h & 65280) ? 2 : 1, this.REG_PC = h);
        break;
      }
      case 12: {
        this.F_OVERFLOW === 1 && (e += (n & 65280) !== (h & 65280) ? 2 : 1, this.REG_PC = h);
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
        t = this.REG_ACC - this.load(h), this.F_CARRY = t >= 0 ? 1 : 0, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t & 255, e += r;
        break;
      }
      case 18: {
        t = this.REG_X - this.load(h), this.F_CARRY = t >= 0 ? 1 : 0, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t & 255;
        break;
      }
      case 19: {
        t = this.REG_Y - this.load(h), this.F_CARRY = t >= 0 ? 1 : 0, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t & 255;
        break;
      }
      case 20: {
        t = this.load(h) - 1 & 255, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t, this.write(h, t);
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
        this.REG_ACC = (this.load(h) ^ this.REG_ACC) & 255, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, e += r;
        break;
      }
      case 24: {
        t = this.load(h) + 1 & 255, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t, this.write(h, t & 255);
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
        this.REG_PC = h - 1;
        break;
      }
      case 28: {
        this.push(this.REG_PC >> 8 & 255), this.push(this.REG_PC & 255), this.REG_PC = h - 1;
        break;
      }
      case 29: {
        this.REG_ACC = this.load(h), this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, e += r;
        break;
      }
      case 30: {
        this.REG_X = this.load(h), this.F_SIGN = this.REG_X >> 7 & 1, this.F_ZERO = this.REG_X, e += r;
        break;
      }
      case 31: {
        this.REG_Y = this.load(h), this.F_SIGN = this.REG_Y >> 7 & 1, this.F_ZERO = this.REG_Y, e += r;
        break;
      }
      case 32: {
        a === 4 ? (t = this.REG_ACC & 255, this.F_CARRY = t & 1, t >>= 1, this.REG_ACC = t) : (t = this.load(h) & 255, this.F_CARRY = t & 1, t >>= 1, this.write(h, t)), this.F_SIGN = 0, this.F_ZERO = t;
        break;
      }
      case 33:
        break;
      case 34: {
        t = (this.load(h) | this.REG_ACC) & 255, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t, this.REG_ACC = t, a !== 11 && (e += r);
        break;
      }
      case 35: {
        this.push(this.REG_ACC);
        break;
      }
      case 36: {
        this.F_BRK = 1, this.push(
          this.F_CARRY | (this.F_ZERO === 0 ? 1 : 0) << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7
        );
        break;
      }
      case 37: {
        this.REG_ACC = this.pull(), this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC;
        break;
      }
      case 38: {
        t = this.pull(), this.F_CARRY = t & 1, this.F_ZERO = (t >> 1 & 1) === 1 ? 0 : 1, this.F_INTERRUPT = t >> 2 & 1, this.F_DECIMAL = t >> 3 & 1, this.F_BRK = t >> 4 & 1, this.F_NOTUSED = t >> 5 & 1, this.F_OVERFLOW = t >> 6 & 1, this.F_SIGN = t >> 7 & 1, this.F_NOTUSED = 1;
        break;
      }
      case 39: {
        a === 4 ? (t = this.REG_ACC, i = this.F_CARRY, this.F_CARRY = t >> 7 & 1, t = (t << 1 & 255) + i, this.REG_ACC = t) : (t = this.load(h), i = this.F_CARRY, this.F_CARRY = t >> 7 & 1, t = (t << 1 & 255) + i, this.write(h, t)), this.F_SIGN = t >> 7 & 1, this.F_ZERO = t;
        break;
      }
      case 40: {
        a === 4 ? (i = this.F_CARRY << 7, this.F_CARRY = this.REG_ACC & 1, t = (this.REG_ACC >> 1) + i, this.REG_ACC = t) : (t = this.load(h), i = this.F_CARRY << 7, this.F_CARRY = t & 1, t = (t >> 1) + i, this.write(h, t)), this.F_SIGN = t >> 7 & 1, this.F_ZERO = t;
        break;
      }
      case 41: {
        if (t = this.pull(), this.F_CARRY = t & 1, this.F_ZERO = (t >> 1 & 1) === 0 ? 1 : 0, this.F_INTERRUPT = t >> 2 & 1, this.F_DECIMAL = t >> 3 & 1, this.F_BRK = t >> 4 & 1, this.F_NOTUSED = t >> 5 & 1, this.F_OVERFLOW = t >> 6 & 1, this.F_SIGN = t >> 7 & 1, this.REG_PC = this.pull(), this.REG_PC += this.pull() << 8, this.REG_PC === 65535)
          return;
        this.REG_PC--, this.F_NOTUSED = 1;
        break;
      }
      case 42: {
        if (this.REG_PC = this.pull(), this.REG_PC += this.pull() << 8, this.REG_PC === 65535)
          return;
        break;
      }
      case 43: {
        t = this.REG_ACC - this.load(h) - (1 - this.F_CARRY), this.F_SIGN = t >> 7 & 1, this.F_ZERO = t & 255, ((this.REG_ACC ^ t) & 128) !== 0 && ((this.REG_ACC ^ this.load(h)) & 128) !== 0 ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = t < 0 ? 0 : 1, this.REG_ACC = t & 255, a !== 11 && (e += r);
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
        this.write(h, this.REG_ACC);
        break;
      }
      case 48: {
        this.write(h, this.REG_X);
        break;
      }
      case 49: {
        this.write(h, this.REG_Y);
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
        t = this.REG_ACC & this.load(h), this.F_CARRY = t & 1, this.REG_ACC = this.F_ZERO = t >> 1, this.F_SIGN = 0;
        break;
      }
      case 57: {
        this.REG_ACC = this.F_ZERO = this.REG_ACC & this.load(h), this.F_CARRY = this.F_SIGN = this.REG_ACC >> 7 & 1;
        break;
      }
      case 58: {
        t = this.REG_ACC & this.load(h), this.REG_ACC = this.F_ZERO = (t >> 1) + (this.F_CARRY << 7), this.F_SIGN = this.F_CARRY, this.F_CARRY = t >> 7 & 1, this.F_OVERFLOW = (t >> 7 ^ t >> 6) & 1;
        break;
      }
      case 59: {
        t = (this.REG_X & this.REG_ACC) - this.load(h), this.F_SIGN = t >> 7 & 1, this.F_ZERO = t & 255, ((this.REG_X ^ t) & 128) !== 0 && ((this.REG_X ^ this.load(h)) & 128) !== 0 ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = t < 0 ? 0 : 1, this.REG_X = t & 255;
        break;
      }
      case 60: {
        this.REG_ACC = this.REG_X = this.F_ZERO = this.load(h), this.F_SIGN = this.REG_ACC >> 7 & 1, e += r;
        break;
      }
      case 61: {
        this.write(h, this.REG_ACC & this.REG_X);
        break;
      }
      case 62: {
        t = this.load(h) - 1 & 255, this.write(h, t), t = this.REG_ACC - t, this.F_CARRY = t >= 0 ? 1 : 0, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t & 255, a !== 11 && (e += r);
        break;
      }
      case 63: {
        t = this.load(h) + 1 & 255, this.write(h, t), t = this.REG_ACC - t - (1 - this.F_CARRY), this.F_SIGN = t >> 7 & 1, this.F_ZERO = t & 255, ((this.REG_ACC ^ t) & 128) !== 0 && ((this.REG_ACC ^ this.load(h)) & 128) !== 0 ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = t < 0 ? 0 : 1, this.REG_ACC = t & 255, a !== 11 && (e += r);
        break;
      }
      case 64: {
        t = this.load(h), i = this.F_CARRY, this.F_CARRY = t >> 7 & 1, t = (t << 1 & 255) + i, this.write(h, t), this.REG_ACC = this.REG_ACC & t, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, a !== 11 && (e += r);
        break;
      }
      case 65: {
        t = this.load(h), i = this.F_CARRY << 7, this.F_CARRY = t & 1, t = (t >> 1) + i, this.write(h, t), t = this.REG_ACC + this.load(h) + this.F_CARRY, ((this.REG_ACC ^ this.load(h)) & 128) === 0 && ((this.REG_ACC ^ t) & 128) !== 0 ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = t > 255 ? 1 : 0, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t & 255, this.REG_ACC = t & 255, a !== 11 && (e += r);
        break;
      }
      case 66: {
        t = this.load(h), this.F_CARRY = t >> 7 & 1, t = t << 1 & 255, this.write(h, t), this.REG_ACC = this.REG_ACC | t, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, a !== 11 && (e += r);
        break;
      }
      case 67: {
        t = this.load(h) & 255, this.F_CARRY = t & 1, t >>= 1, this.write(h, t), this.REG_ACC = this.REG_ACC ^ t, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, a !== 11 && (e += r);
        break;
      }
      case 68:
        break;
      case 69: {
        this.load(h), a !== 11 && (e += r);
        break;
      }
      default: {
        this.nes.stop(), this.nes.crashMessage = "Game crashed, invalid opcode at address $" + n.toString(16);
        break;
      }
    }
    return e;
  },
  load: function(t) {
    return t < 8192 ? this.mem[t & 2047] : this.nes.mmap.load(t);
  },
  load16bit: function(t) {
    return t < 8191 ? this.mem[t & 2047] | this.mem[t + 1 & 2047] << 8 : this.nes.mmap.load(t) | this.nes.mmap.load(t + 1) << 8;
  },
  write: function(t, i) {
    t < 8192 ? this.mem[t & 2047] = i : this.nes.mmap.write(t, i);
  },
  requestIrq: function(t) {
    this.irqRequested && t === this.IRQ_NORMAL || (this.irqRequested = !0, this.irqType = t);
  },
  push: function(t) {
    this.nes.mmap.write(this.REG_SP, t), this.REG_SP--, this.REG_SP = 256 | this.REG_SP & 255;
  },
  stackWrap: function() {
    this.REG_SP = 256 | this.REG_SP & 255;
  },
  pull: function() {
    return this.REG_SP++, this.REG_SP = 256 | this.REG_SP & 255, this.nes.mmap.load(this.REG_SP);
  },
  pageCrossed: function(t, i) {
    return (t & 65280) !== (i & 65280);
  },
  haltCycles: function(t) {
    this.cyclesToHalt += t;
  },
  doNonMaskableInterrupt: function(t) {
    (this.nes.mmap.load(8192) & 128) !== 0 && (this.REG_PC_NEW++, this.push(this.REG_PC_NEW >> 8 & 255), this.push(this.REG_PC_NEW & 255), this.push(t), this.REG_PC_NEW = this.nes.mmap.load(65530) | this.nes.mmap.load(65531) << 8, this.REG_PC_NEW--);
  },
  doResetInterrupt: function() {
    this.REG_PC_NEW = this.nes.mmap.load(65532) | this.nes.mmap.load(65533) << 8, this.REG_PC_NEW--;
  },
  doIrq: function(t) {
    this.REG_PC_NEW++, this.push(this.REG_PC_NEW >> 8 & 255), this.push(this.REG_PC_NEW & 255), this.push(t), this.F_INTERRUPT_NEW = 1, this.F_BRK_NEW = 0, this.REG_PC_NEW = this.nes.mmap.load(65534) | this.nes.mmap.load(65535) << 8, this.REG_PC_NEW--;
  },
  getStatus: function() {
    return this.F_CARRY | this.F_ZERO << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7;
  },
  setStatus: function(t) {
    this.F_CARRY = t & 1, this.F_ZERO = t >> 1 & 1, this.F_INTERRUPT = t >> 2 & 1, this.F_DECIMAL = t >> 3 & 1, this.F_BRK = t >> 4 & 1, this.F_NOTUSED = t >> 5 & 1, this.F_OVERFLOW = t >> 6 & 1, this.F_SIGN = t >> 7 & 1;
  },
  JSON_PROPERTIES: [
    "mem",
    "cyclesToHalt",
    "irqRequested",
    "irqType",
    "REG_ACC",
    "REG_X",
    "REG_Y",
    "REG_SP",
    "REG_PC",
    "REG_PC_NEW",
    "REG_STATUS",
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
  ],
  toJSON: function() {
    return It.toJSON(this);
  },
  fromJSON: function(t) {
    It.fromJSON(this, t);
  }
};
var Zt = function() {
  this.opdata = new Array(256);
  for (var t = 0; t < 256; t++)
    this.opdata[t] = 255;
  this.setOp(this.INS_ADC, 105, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ADC, 101, this.ADDR_ZP, 2, 3), this.setOp(this.INS_ADC, 117, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_ADC, 109, this.ADDR_ABS, 3, 4), this.setOp(this.INS_ADC, 125, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_ADC, 121, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_ADC, 97, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_ADC, 113, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_AND, 41, this.ADDR_IMM, 2, 2), this.setOp(this.INS_AND, 37, this.ADDR_ZP, 2, 3), this.setOp(this.INS_AND, 53, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_AND, 45, this.ADDR_ABS, 3, 4), this.setOp(this.INS_AND, 61, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_AND, 57, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_AND, 33, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_AND, 49, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_ASL, 10, this.ADDR_ACC, 1, 2), this.setOp(this.INS_ASL, 6, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ASL, 22, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ASL, 14, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ASL, 30, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_BCC, 144, this.ADDR_REL, 2, 2), this.setOp(this.INS_BCS, 176, this.ADDR_REL, 2, 2), this.setOp(this.INS_BEQ, 240, this.ADDR_REL, 2, 2), this.setOp(this.INS_BIT, 36, this.ADDR_ZP, 2, 3), this.setOp(this.INS_BIT, 44, this.ADDR_ABS, 3, 4), this.setOp(this.INS_BMI, 48, this.ADDR_REL, 2, 2), this.setOp(this.INS_BNE, 208, this.ADDR_REL, 2, 2), this.setOp(this.INS_BPL, 16, this.ADDR_REL, 2, 2), this.setOp(this.INS_BRK, 0, this.ADDR_IMP, 1, 7), this.setOp(this.INS_BVC, 80, this.ADDR_REL, 2, 2), this.setOp(this.INS_BVS, 112, this.ADDR_REL, 2, 2), this.setOp(this.INS_CLC, 24, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CLD, 216, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CLI, 88, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CLV, 184, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CMP, 201, this.ADDR_IMM, 2, 2), this.setOp(this.INS_CMP, 197, this.ADDR_ZP, 2, 3), this.setOp(this.INS_CMP, 213, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_CMP, 205, this.ADDR_ABS, 3, 4), this.setOp(this.INS_CMP, 221, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_CMP, 217, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_CMP, 193, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_CMP, 209, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_CPX, 224, this.ADDR_IMM, 2, 2), this.setOp(this.INS_CPX, 228, this.ADDR_ZP, 2, 3), this.setOp(this.INS_CPX, 236, this.ADDR_ABS, 3, 4), this.setOp(this.INS_CPY, 192, this.ADDR_IMM, 2, 2), this.setOp(this.INS_CPY, 196, this.ADDR_ZP, 2, 3), this.setOp(this.INS_CPY, 204, this.ADDR_ABS, 3, 4), this.setOp(this.INS_DEC, 198, this.ADDR_ZP, 2, 5), this.setOp(this.INS_DEC, 214, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_DEC, 206, this.ADDR_ABS, 3, 6), this.setOp(this.INS_DEC, 222, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_DEX, 202, this.ADDR_IMP, 1, 2), this.setOp(this.INS_DEY, 136, this.ADDR_IMP, 1, 2), this.setOp(this.INS_EOR, 73, this.ADDR_IMM, 2, 2), this.setOp(this.INS_EOR, 69, this.ADDR_ZP, 2, 3), this.setOp(this.INS_EOR, 85, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_EOR, 77, this.ADDR_ABS, 3, 4), this.setOp(this.INS_EOR, 93, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_EOR, 89, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_EOR, 65, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_EOR, 81, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_INC, 230, this.ADDR_ZP, 2, 5), this.setOp(this.INS_INC, 246, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_INC, 238, this.ADDR_ABS, 3, 6), this.setOp(this.INS_INC, 254, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_INX, 232, this.ADDR_IMP, 1, 2), this.setOp(this.INS_INY, 200, this.ADDR_IMP, 1, 2), this.setOp(this.INS_JMP, 76, this.ADDR_ABS, 3, 3), this.setOp(this.INS_JMP, 108, this.ADDR_INDABS, 3, 5), this.setOp(this.INS_JSR, 32, this.ADDR_ABS, 3, 6), this.setOp(this.INS_LDA, 169, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LDA, 165, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LDA, 181, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_LDA, 173, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LDA, 189, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_LDA, 185, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_LDA, 161, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_LDA, 177, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_LDX, 162, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LDX, 166, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LDX, 182, this.ADDR_ZPY, 2, 4), this.setOp(this.INS_LDX, 174, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LDX, 190, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_LDY, 160, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LDY, 164, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LDY, 180, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_LDY, 172, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LDY, 188, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_LSR, 74, this.ADDR_ACC, 1, 2), this.setOp(this.INS_LSR, 70, this.ADDR_ZP, 2, 5), this.setOp(this.INS_LSR, 86, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_LSR, 78, this.ADDR_ABS, 3, 6), this.setOp(this.INS_LSR, 94, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_NOP, 26, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 58, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 90, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 122, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 218, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 234, this.ADDR_IMP, 1, 2), this.setOp(this.INS_NOP, 250, this.ADDR_IMP, 1, 2), this.setOp(this.INS_ORA, 9, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ORA, 5, this.ADDR_ZP, 2, 3), this.setOp(this.INS_ORA, 21, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_ORA, 13, this.ADDR_ABS, 3, 4), this.setOp(this.INS_ORA, 29, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_ORA, 25, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_ORA, 1, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_ORA, 17, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_PHA, 72, this.ADDR_IMP, 1, 3), this.setOp(this.INS_PHP, 8, this.ADDR_IMP, 1, 3), this.setOp(this.INS_PLA, 104, this.ADDR_IMP, 1, 4), this.setOp(this.INS_PLP, 40, this.ADDR_IMP, 1, 4), this.setOp(this.INS_ROL, 42, this.ADDR_ACC, 1, 2), this.setOp(this.INS_ROL, 38, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ROL, 54, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ROL, 46, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ROL, 62, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_ROR, 106, this.ADDR_ACC, 1, 2), this.setOp(this.INS_ROR, 102, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ROR, 118, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ROR, 110, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ROR, 126, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_RTI, 64, this.ADDR_IMP, 1, 6), this.setOp(this.INS_RTS, 96, this.ADDR_IMP, 1, 6), this.setOp(this.INS_SBC, 233, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SBC, 229, this.ADDR_ZP, 2, 3), this.setOp(this.INS_SBC, 245, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_SBC, 237, this.ADDR_ABS, 3, 4), this.setOp(this.INS_SBC, 253, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_SBC, 249, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_SBC, 225, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_SBC, 241, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_SEC, 56, this.ADDR_IMP, 1, 2), this.setOp(this.INS_SED, 248, this.ADDR_IMP, 1, 2), this.setOp(this.INS_SEI, 120, this.ADDR_IMP, 1, 2), this.setOp(this.INS_STA, 133, this.ADDR_ZP, 2, 3), this.setOp(this.INS_STA, 149, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_STA, 141, this.ADDR_ABS, 3, 4), this.setOp(this.INS_STA, 157, this.ADDR_ABSX, 3, 5), this.setOp(this.INS_STA, 153, this.ADDR_ABSY, 3, 5), this.setOp(this.INS_STA, 129, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_STA, 145, this.ADDR_POSTIDXIND, 2, 6), this.setOp(this.INS_STX, 134, this.ADDR_ZP, 2, 3), this.setOp(this.INS_STX, 150, this.ADDR_ZPY, 2, 4), this.setOp(this.INS_STX, 142, this.ADDR_ABS, 3, 4), this.setOp(this.INS_STY, 132, this.ADDR_ZP, 2, 3), this.setOp(this.INS_STY, 148, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_STY, 140, this.ADDR_ABS, 3, 4), this.setOp(this.INS_TAX, 170, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TAY, 168, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TSX, 186, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TXA, 138, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TXS, 154, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TYA, 152, this.ADDR_IMP, 1, 2), this.setOp(this.INS_ALR, 75, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ANC, 11, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ANC, 43, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ARR, 107, this.ADDR_IMM, 2, 2), this.setOp(this.INS_AXS, 203, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LAX, 163, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_LAX, 167, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LAX, 175, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LAX, 179, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_LAX, 183, this.ADDR_ZPY, 2, 4), this.setOp(this.INS_LAX, 191, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_SAX, 131, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_SAX, 135, this.ADDR_ZP, 2, 3), this.setOp(this.INS_SAX, 143, this.ADDR_ABS, 3, 4), this.setOp(this.INS_SAX, 151, this.ADDR_ZPY, 2, 4), this.setOp(this.INS_DCP, 195, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_DCP, 199, this.ADDR_ZP, 2, 5), this.setOp(this.INS_DCP, 207, this.ADDR_ABS, 3, 6), this.setOp(this.INS_DCP, 211, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_DCP, 215, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_DCP, 219, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_DCP, 223, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_ISC, 227, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_ISC, 231, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ISC, 239, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ISC, 243, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_ISC, 247, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ISC, 251, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_ISC, 255, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_RLA, 35, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_RLA, 39, this.ADDR_ZP, 2, 5), this.setOp(this.INS_RLA, 47, this.ADDR_ABS, 3, 6), this.setOp(this.INS_RLA, 51, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_RLA, 55, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_RLA, 59, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_RLA, 63, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_RRA, 99, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_RRA, 103, this.ADDR_ZP, 2, 5), this.setOp(this.INS_RRA, 111, this.ADDR_ABS, 3, 6), this.setOp(this.INS_RRA, 115, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_RRA, 119, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_RRA, 123, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_RRA, 127, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_SLO, 3, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_SLO, 7, this.ADDR_ZP, 2, 5), this.setOp(this.INS_SLO, 15, this.ADDR_ABS, 3, 6), this.setOp(this.INS_SLO, 19, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_SLO, 23, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_SLO, 27, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_SLO, 31, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_SRE, 67, this.ADDR_PREIDXIND, 2, 8), this.setOp(this.INS_SRE, 71, this.ADDR_ZP, 2, 5), this.setOp(this.INS_SRE, 79, this.ADDR_ABS, 3, 6), this.setOp(this.INS_SRE, 83, this.ADDR_POSTIDXIND, 2, 8), this.setOp(this.INS_SRE, 87, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_SRE, 91, this.ADDR_ABSY, 3, 7), this.setOp(this.INS_SRE, 95, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_SKB, 128, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SKB, 130, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SKB, 137, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SKB, 194, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SKB, 226, this.ADDR_IMM, 2, 2), this.setOp(this.INS_IGN, 12, this.ADDR_ABS, 3, 4), this.setOp(this.INS_IGN, 28, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 60, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 92, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 124, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 220, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 252, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_IGN, 4, this.ADDR_ZP, 2, 3), this.setOp(this.INS_IGN, 68, this.ADDR_ZP, 2, 3), this.setOp(this.INS_IGN, 100, this.ADDR_ZP, 2, 3), this.setOp(this.INS_IGN, 20, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_IGN, 52, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_IGN, 84, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_IGN, 116, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_IGN, 212, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_IGN, 244, this.ADDR_ZPX, 2, 4), this.cycTable = new Array(
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
    2,
    6,
    3,
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
  ), this.instname = new Array(70), this.instname[0] = "ADC", this.instname[1] = "AND", this.instname[2] = "ASL", this.instname[3] = "BCC", this.instname[4] = "BCS", this.instname[5] = "BEQ", this.instname[6] = "BIT", this.instname[7] = "BMI", this.instname[8] = "BNE", this.instname[9] = "BPL", this.instname[10] = "BRK", this.instname[11] = "BVC", this.instname[12] = "BVS", this.instname[13] = "CLC", this.instname[14] = "CLD", this.instname[15] = "CLI", this.instname[16] = "CLV", this.instname[17] = "CMP", this.instname[18] = "CPX", this.instname[19] = "CPY", this.instname[20] = "DEC", this.instname[21] = "DEX", this.instname[22] = "DEY", this.instname[23] = "EOR", this.instname[24] = "INC", this.instname[25] = "INX", this.instname[26] = "INY", this.instname[27] = "JMP", this.instname[28] = "JSR", this.instname[29] = "LDA", this.instname[30] = "LDX", this.instname[31] = "LDY", this.instname[32] = "LSR", this.instname[33] = "NOP", this.instname[34] = "ORA", this.instname[35] = "PHA", this.instname[36] = "PHP", this.instname[37] = "PLA", this.instname[38] = "PLP", this.instname[39] = "ROL", this.instname[40] = "ROR", this.instname[41] = "RTI", this.instname[42] = "RTS", this.instname[43] = "SBC", this.instname[44] = "SEC", this.instname[45] = "SED", this.instname[46] = "SEI", this.instname[47] = "STA", this.instname[48] = "STX", this.instname[49] = "STY", this.instname[50] = "TAX", this.instname[51] = "TAY", this.instname[52] = "TSX", this.instname[53] = "TXA", this.instname[54] = "TXS", this.instname[55] = "TYA", this.instname[56] = "ALR", this.instname[57] = "ANC", this.instname[58] = "ARR", this.instname[59] = "AXS", this.instname[60] = "LAX", this.instname[61] = "SAX", this.instname[62] = "DCP", this.instname[63] = "ISC", this.instname[64] = "RLA", this.instname[65] = "RRA", this.instname[66] = "SLO", this.instname[67] = "SRE", this.instname[68] = "SKB", this.instname[69] = "IGN", this.addrDesc = new Array(
    "Zero Page           ",
    "Relative            ",
    "Implied             ",
    "Absolute            ",
    "Accumulator         ",
    "Immediate           ",
    "Zero Page,X         ",
    "Zero Page,Y         ",
    "Absolute,X          ",
    "Absolute,Y          ",
    "Preindexed Indirect ",
    "Postindexed Indirect",
    "Indirect Absolute   "
  );
};
Zt.prototype = {
  INS_ADC: 0,
  INS_AND: 1,
  INS_ASL: 2,
  INS_BCC: 3,
  INS_BCS: 4,
  INS_BEQ: 5,
  INS_BIT: 6,
  INS_BMI: 7,
  INS_BNE: 8,
  INS_BPL: 9,
  INS_BRK: 10,
  INS_BVC: 11,
  INS_BVS: 12,
  INS_CLC: 13,
  INS_CLD: 14,
  INS_CLI: 15,
  INS_CLV: 16,
  INS_CMP: 17,
  INS_CPX: 18,
  INS_CPY: 19,
  INS_DEC: 20,
  INS_DEX: 21,
  INS_DEY: 22,
  INS_EOR: 23,
  INS_INC: 24,
  INS_INX: 25,
  INS_INY: 26,
  INS_JMP: 27,
  INS_JSR: 28,
  INS_LDA: 29,
  INS_LDX: 30,
  INS_LDY: 31,
  INS_LSR: 32,
  INS_NOP: 33,
  INS_ORA: 34,
  INS_PHA: 35,
  INS_PHP: 36,
  INS_PLA: 37,
  INS_PLP: 38,
  INS_ROL: 39,
  INS_ROR: 40,
  INS_RTI: 41,
  INS_RTS: 42,
  INS_SBC: 43,
  INS_SEC: 44,
  INS_SED: 45,
  INS_SEI: 46,
  INS_STA: 47,
  INS_STX: 48,
  INS_STY: 49,
  INS_TAX: 50,
  INS_TAY: 51,
  INS_TSX: 52,
  INS_TXA: 53,
  INS_TXS: 54,
  INS_TYA: 55,
  INS_ALR: 56,
  INS_ANC: 57,
  INS_ARR: 58,
  INS_AXS: 59,
  INS_LAX: 60,
  INS_SAX: 61,
  INS_DCP: 62,
  INS_ISC: 63,
  INS_RLA: 64,
  INS_RRA: 65,
  INS_SLO: 66,
  INS_SRE: 67,
  INS_SKB: 68,
  INS_IGN: 69,
  INS_DUMMY: 70,
  ADDR_ZP: 0,
  ADDR_REL: 1,
  ADDR_IMP: 2,
  ADDR_ABS: 3,
  ADDR_ACC: 4,
  ADDR_IMM: 5,
  ADDR_ZPX: 6,
  ADDR_ZPY: 7,
  ADDR_ABSX: 8,
  ADDR_ABSY: 9,
  ADDR_PREIDXIND: 10,
  ADDR_POSTIDXIND: 11,
  ADDR_INDABS: 12,
  setOp: function(t, i, s, e, r) {
    this.opdata[i] = t & 255 | (s & 255) << 8 | (e & 255) << 16 | (r & 255) << 24;
  }
};
var Wi = Wt, Ut = function() {
  this.pix = new Array(64), this.fbIndex = null, this.tIndex = null, this.x = null, this.y = null, this.w = null, this.h = null, this.incX = null, this.incY = null, this.palIndex = null, this.tpri = null, this.c = null, this.initialized = !1, this.opaque = new Array(8);
};
Ut.prototype = {
  setBuffer: function(t) {
    for (this.y = 0; this.y < 8; this.y++)
      this.setScanline(this.y, t[this.y], t[this.y + 8]);
  },
  setScanline: function(t, i, s) {
    for (this.initialized = !0, this.tIndex = t << 3, this.x = 0; this.x < 8; this.x++)
      this.pix[this.tIndex + this.x] = (i >> 7 - this.x & 1) + ((s >> 7 - this.x & 1) << 1), this.pix[this.tIndex + this.x] === 0 && (this.opaque[t] = !1);
  },
  render: function(t, i, s, e, r, a, n, h, u, c, R, f, _) {
    if (!(a < -7 || a >= 256 || n < -7 || n >= 240))
      if (this.w = e - i, this.h = r - s, a < 0 && (i -= a), a + e >= 256 && (e = 256 - a), n < 0 && (s -= n), n + r >= 240 && (r = 240 - n), !c && !R)
        for (this.fbIndex = (n << 8) + a, this.tIndex = 0, this.y = 0; this.y < 8; this.y++) {
          for (this.x = 0; this.x < 8; this.x++)
            this.x >= i && this.x < e && this.y >= s && this.y < r && (this.palIndex = this.pix[this.tIndex], this.tpri = _[this.fbIndex], this.palIndex !== 0 && f <= (this.tpri & 255) && (t[this.fbIndex] = u[this.palIndex + h], this.tpri = this.tpri & 3840 | f, _[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex++;
          this.fbIndex -= 8, this.fbIndex += 256;
        }
      else if (c && !R)
        for (this.fbIndex = (n << 8) + a, this.tIndex = 7, this.y = 0; this.y < 8; this.y++) {
          for (this.x = 0; this.x < 8; this.x++)
            this.x >= i && this.x < e && this.y >= s && this.y < r && (this.palIndex = this.pix[this.tIndex], this.tpri = _[this.fbIndex], this.palIndex !== 0 && f <= (this.tpri & 255) && (t[this.fbIndex] = u[this.palIndex + h], this.tpri = this.tpri & 3840 | f, _[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex--;
          this.fbIndex -= 8, this.fbIndex += 256, this.tIndex += 16;
        }
      else if (R && !c)
        for (this.fbIndex = (n << 8) + a, this.tIndex = 56, this.y = 0; this.y < 8; this.y++) {
          for (this.x = 0; this.x < 8; this.x++)
            this.x >= i && this.x < e && this.y >= s && this.y < r && (this.palIndex = this.pix[this.tIndex], this.tpri = _[this.fbIndex], this.palIndex !== 0 && f <= (this.tpri & 255) && (t[this.fbIndex] = u[this.palIndex + h], this.tpri = this.tpri & 3840 | f, _[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex++;
          this.fbIndex -= 8, this.fbIndex += 256, this.tIndex -= 16;
        }
      else
        for (this.fbIndex = (n << 8) + a, this.tIndex = 63, this.y = 0; this.y < 8; this.y++) {
          for (this.x = 0; this.x < 8; this.x++)
            this.x >= i && this.x < e && this.y >= s && this.y < r && (this.palIndex = this.pix[this.tIndex], this.tpri = _[this.fbIndex], this.palIndex !== 0 && f <= (this.tpri & 255) && (t[this.fbIndex] = u[this.palIndex + h], this.tpri = this.tpri & 3840 | f, _[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex--;
          this.fbIndex -= 8, this.fbIndex += 256;
        }
  },
  isTransparent: function(t, i) {
    return this.pix[(i << 3) + t] === 0;
  },
  toJSON: function() {
    return {
      opaque: this.opaque,
      pix: this.pix
    };
  },
  fromJSON: function(t) {
    this.opaque = t.opaque, this.pix = t.pix;
  }
};
var Kt = Ut, Zi = Kt, Nt = pt, Jt = function(t) {
  this.nes = t, this.vramMem = null, this.spriteMem = null, this.vramAddress = null, this.vramTmpAddress = null, this.vramBufferedReadValue = null, this.firstWrite = null, this.sramAddress = null, this.currentMirroring = null, this.requestEndFrame = null, this.nmiOk = null, this.dummyCycleToggle = null, this.validTileData = null, this.nmiCounter = null, this.scanlineAlreadyRendered = null, this.f_nmiOnVblank = null, this.f_spriteSize = null, this.f_bgPatternTable = null, this.f_spPatternTable = null, this.f_addrInc = null, this.f_nTblAddress = null, this.f_color = null, this.f_spVisibility = null, this.f_bgVisibility = null, this.f_spClipping = null, this.f_bgClipping = null, this.f_dispType = null, this.cntFV = null, this.cntV = null, this.cntH = null, this.cntVT = null, this.cntHT = null, this.regFV = null, this.regV = null, this.regH = null, this.regVT = null, this.regHT = null, this.regFH = null, this.regS = null, this.curNt = null, this.attrib = null, this.buffer = null, this.bgbuffer = null, this.pixrendered = null, this.validTileData = null, this.scantile = null, this.scanline = null, this.lastRenderedScanline = null, this.curX = null, this.sprX = null, this.sprY = null, this.sprTile = null, this.sprCol = null, this.vertFlip = null, this.horiFlip = null, this.bgPriority = null, this.spr0HitX = null, this.spr0HitY = null, this.hitSpr0 = null, this.sprPalette = null, this.imgPalette = null, this.ptTile = null, this.ntable1 = null, this.currentMirroring = null, this.nameTable = null, this.vramMirrorTable = null, this.palTable = null, this.showSpr0Hit = !1, this.clipToTvSize = !0, this.reset();
};
Jt.prototype = {
  STATUS_VRAMWRITE: 4,
  STATUS_SLSPRITECOUNT: 5,
  STATUS_SPRITE0HIT: 6,
  STATUS_VBLANK: 7,
  reset: function() {
    var t;
    for (this.vramMem = new Array(32768), this.spriteMem = new Array(256), t = 0; t < this.vramMem.length; t++)
      this.vramMem[t] = 0;
    for (t = 0; t < this.spriteMem.length; t++)
      this.spriteMem[t] = 0;
    for (this.vramAddress = null, this.vramTmpAddress = null, this.vramBufferedReadValue = 0, this.firstWrite = !0, this.sramAddress = 0, this.currentMirroring = -1, this.requestEndFrame = !1, this.nmiOk = !1, this.dummyCycleToggle = !1, this.validTileData = !1, this.nmiCounter = 0, this.scanlineAlreadyRendered = null, this.f_nmiOnVblank = 0, this.f_spriteSize = 0, this.f_bgPatternTable = 0, this.f_spPatternTable = 0, this.f_addrInc = 0, this.f_nTblAddress = 0, this.f_color = 0, this.f_spVisibility = 0, this.f_bgVisibility = 0, this.f_spClipping = 0, this.f_bgClipping = 0, this.f_dispType = 0, this.cntFV = 0, this.cntV = 0, this.cntH = 0, this.cntVT = 0, this.cntHT = 0, this.regFV = 0, this.regV = 0, this.regH = 0, this.regVT = 0, this.regHT = 0, this.regFH = 0, this.regS = 0, this.curNt = null, this.attrib = new Array(32), this.buffer = new Array(256 * 240), this.bgbuffer = new Array(256 * 240), this.pixrendered = new Array(256 * 240), this.validTileData = null, this.scantile = new Array(32), this.scanline = 0, this.lastRenderedScanline = -1, this.curX = 0, this.sprX = new Array(64), this.sprY = new Array(64), this.sprTile = new Array(64), this.sprCol = new Array(64), this.vertFlip = new Array(64), this.horiFlip = new Array(64), this.bgPriority = new Array(64), this.spr0HitX = 0, this.spr0HitY = 0, this.hitSpr0 = !1, this.sprPalette = new Array(16), this.imgPalette = new Array(16), this.ptTile = new Array(512), t = 0; t < 512; t++)
      this.ptTile[t] = new Zi();
    for (this.ntable1 = new Array(4), this.currentMirroring = -1, this.nameTable = new Array(4), t = 0; t < 4; t++)
      this.nameTable[t] = new zt(32, 32, "Nt" + t);
    for (this.vramMirrorTable = new Array(32768), t = 0; t < 32768; t++)
      this.vramMirrorTable[t] = t;
    this.palTable = new jt(), this.palTable.loadNTSCPalette(), this.updateControlReg1(0), this.updateControlReg2(0);
  },
  setMirroring: function(t) {
    if (t !== this.currentMirroring) {
      this.currentMirroring = t, this.triggerRendering(), this.vramMirrorTable === null && (this.vramMirrorTable = new Array(32768));
      for (var i = 0; i < 32768; i++)
        this.vramMirrorTable[i] = i;
      this.defineMirrorRegion(16160, 16128, 32), this.defineMirrorRegion(16192, 16128, 32), this.defineMirrorRegion(16256, 16128, 32), this.defineMirrorRegion(16320, 16128, 32), this.defineMirrorRegion(12288, 8192, 3840), this.defineMirrorRegion(16384, 0, 16384), t === this.nes.rom.HORIZONTAL_MIRRORING ? (this.ntable1[0] = 0, this.ntable1[1] = 0, this.ntable1[2] = 1, this.ntable1[3] = 1, this.defineMirrorRegion(9216, 8192, 1024), this.defineMirrorRegion(11264, 10240, 1024)) : t === this.nes.rom.VERTICAL_MIRRORING ? (this.ntable1[0] = 0, this.ntable1[1] = 1, this.ntable1[2] = 0, this.ntable1[3] = 1, this.defineMirrorRegion(10240, 8192, 1024), this.defineMirrorRegion(11264, 9216, 1024)) : t === this.nes.rom.SINGLESCREEN_MIRRORING ? (this.ntable1[0] = 0, this.ntable1[1] = 0, this.ntable1[2] = 0, this.ntable1[3] = 0, this.defineMirrorRegion(9216, 8192, 1024), this.defineMirrorRegion(10240, 8192, 1024), this.defineMirrorRegion(11264, 8192, 1024)) : t === this.nes.rom.SINGLESCREEN_MIRRORING2 ? (this.ntable1[0] = 1, this.ntable1[1] = 1, this.ntable1[2] = 1, this.ntable1[3] = 1, this.defineMirrorRegion(9216, 9216, 1024), this.defineMirrorRegion(10240, 9216, 1024), this.defineMirrorRegion(11264, 9216, 1024)) : (this.ntable1[0] = 0, this.ntable1[1] = 1, this.ntable1[2] = 2, this.ntable1[3] = 3);
    }
  },
  defineMirrorRegion: function(t, i, s) {
    for (var e = 0; e < s; e++)
      this.vramMirrorTable[t + e] = i + e;
  },
  startVBlank: function() {
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NMI), this.lastRenderedScanline < 239 && this.renderFramePartially(
      this.lastRenderedScanline + 1,
      240 - this.lastRenderedScanline
    ), this.endFrame(), this.lastRenderedScanline = -1;
  },
  endScanline: function() {
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
  },
  startFrame: function() {
    var t = 0;
    if (this.f_dispType === 0)
      t = this.imgPalette[0];
    else
      switch (this.f_color) {
        case 0:
          t = 0;
          break;
        case 1:
          t = 65280;
          break;
        case 2:
          t = 16711680;
          break;
        case 3:
          t = 0;
          break;
        case 4:
          t = 255;
          break;
        default:
          t = 0;
      }
    var i = this.buffer, s;
    for (s = 0; s < 256 * 240; s++)
      i[s] = t;
    var e = this.pixrendered;
    for (s = 0; s < e.length; s++)
      e[s] = 65;
  },
  endFrame: function() {
    var t, i, s, e = this.buffer;
    if (this.showSpr0Hit) {
      if (this.sprX[0] >= 0 && this.sprX[0] < 256 && this.sprY[0] >= 0 && this.sprY[0] < 240) {
        for (t = 0; t < 256; t++)
          e[(this.sprY[0] << 8) + t] = 16733525;
        for (t = 0; t < 240; t++)
          e[(t << 8) + this.sprX[0]] = 16733525;
      }
      if (this.spr0HitX >= 0 && this.spr0HitX < 256 && this.spr0HitY >= 0 && this.spr0HitY < 240) {
        for (t = 0; t < 256; t++)
          e[(this.spr0HitY << 8) + t] = 5635925;
        for (t = 0; t < 240; t++)
          e[(t << 8) + this.spr0HitX] = 5635925;
      }
    }
    if (this.clipToTvSize || this.f_bgClipping === 0 || this.f_spClipping === 0)
      for (s = 0; s < 240; s++)
        for (i = 0; i < 8; i++)
          e[(s << 8) + i] = 0;
    if (this.clipToTvSize)
      for (s = 0; s < 240; s++)
        for (i = 0; i < 8; i++)
          e[(s << 8) + 255 - i] = 0;
    if (this.clipToTvSize)
      for (s = 0; s < 8; s++)
        for (i = 0; i < 256; i++)
          e[(s << 8) + i] = 0, e[(239 - s << 8) + i] = 0;
    this.nes.ui.writeFrame(e);
  },
  updateControlReg1: function(t) {
    this.triggerRendering(), this.f_nmiOnVblank = t >> 7 & 1, this.f_spriteSize = t >> 5 & 1, this.f_bgPatternTable = t >> 4 & 1, this.f_spPatternTable = t >> 3 & 1, this.f_addrInc = t >> 2 & 1, this.f_nTblAddress = t & 3, this.regV = t >> 1 & 1, this.regH = t & 1, this.regS = t >> 4 & 1;
  },
  updateControlReg2: function(t) {
    this.triggerRendering(), this.f_color = t >> 5 & 7, this.f_spVisibility = t >> 4 & 1, this.f_bgVisibility = t >> 3 & 1, this.f_spClipping = t >> 2 & 1, this.f_bgClipping = t >> 1 & 1, this.f_dispType = t & 1, this.f_dispType === 0 && this.palTable.setEmphasis(this.f_color), this.updatePalettes();
  },
  setStatusFlag: function(t, i) {
    var s = 1 << t;
    this.nes.cpu.mem[8194] = this.nes.cpu.mem[8194] & 255 - s | (i ? s : 0);
  },
  readStatusRegister: function() {
    var t = this.nes.cpu.mem[8194];
    return this.firstWrite = !0, this.setStatusFlag(this.STATUS_VBLANK, !1), t;
  },
  writeSRAMAddress: function(t) {
    this.sramAddress = t;
  },
  sramLoad: function() {
    return this.spriteMem[this.sramAddress];
  },
  sramWrite: function(t) {
    this.spriteMem[this.sramAddress] = t, this.spriteRamWriteUpdate(this.sramAddress, t), this.sramAddress++, this.sramAddress %= 256;
  },
  scrollWrite: function(t) {
    this.triggerRendering(), this.firstWrite ? (this.regHT = t >> 3 & 31, this.regFH = t & 7) : (this.regFV = t & 7, this.regVT = t >> 3 & 31), this.firstWrite = !this.firstWrite;
  },
  writeVRAMAddress: function(t) {
    this.firstWrite ? (this.regFV = t >> 4 & 3, this.regV = t >> 3 & 1, this.regH = t >> 2 & 1, this.regVT = this.regVT & 7 | (t & 3) << 3) : (this.triggerRendering(), this.regVT = this.regVT & 24 | t >> 5 & 7, this.regHT = t & 31, this.cntFV = this.regFV, this.cntV = this.regV, this.cntH = this.regH, this.cntVT = this.regVT, this.cntHT = this.regHT, this.checkSprite0(this.scanline - 20)), this.firstWrite = !this.firstWrite, this.cntsToAddress(), this.vramAddress < 8192 && this.nes.mmap.latchAccess(this.vramAddress);
  },
  vramLoad: function() {
    var t;
    return this.cntsToAddress(), this.regsToAddress(), this.vramAddress <= 16127 ? (t = this.vramBufferedReadValue, this.vramAddress < 8192 ? this.vramBufferedReadValue = this.vramMem[this.vramAddress] : this.vramBufferedReadValue = this.mirroredLoad(this.vramAddress), this.vramAddress < 8192 && this.nes.mmap.latchAccess(this.vramAddress), this.vramAddress += this.f_addrInc === 1 ? 32 : 1, this.cntsFromAddress(), this.regsFromAddress(), t) : (t = this.mirroredLoad(this.vramAddress), this.vramAddress += this.f_addrInc === 1 ? 32 : 1, this.cntsFromAddress(), this.regsFromAddress(), t);
  },
  vramWrite: function(t) {
    this.triggerRendering(), this.cntsToAddress(), this.regsToAddress(), this.vramAddress >= 8192 ? this.mirroredWrite(this.vramAddress, t) : (this.writeMem(this.vramAddress, t), this.nes.mmap.latchAccess(this.vramAddress)), this.vramAddress += this.f_addrInc === 1 ? 32 : 1, this.regsFromAddress(), this.cntsFromAddress();
  },
  sramDMA: function(t) {
    for (var i = t * 256, s, e = this.sramAddress; e < 256; e++)
      s = this.nes.cpu.mem[i + e], this.spriteMem[e] = s, this.spriteRamWriteUpdate(e, s);
    this.nes.cpu.haltCycles(513);
  },
  regsFromAddress: function() {
    var t = this.vramTmpAddress >> 8 & 255;
    this.regFV = t >> 4 & 7, this.regV = t >> 3 & 1, this.regH = t >> 2 & 1, this.regVT = this.regVT & 7 | (t & 3) << 3, t = this.vramTmpAddress & 255, this.regVT = this.regVT & 24 | t >> 5 & 7, this.regHT = t & 31;
  },
  cntsFromAddress: function() {
    var t = this.vramAddress >> 8 & 255;
    this.cntFV = t >> 4 & 3, this.cntV = t >> 3 & 1, this.cntH = t >> 2 & 1, this.cntVT = this.cntVT & 7 | (t & 3) << 3, t = this.vramAddress & 255, this.cntVT = this.cntVT & 24 | t >> 5 & 7, this.cntHT = t & 31;
  },
  regsToAddress: function() {
    var t = (this.regFV & 7) << 4;
    t |= (this.regV & 1) << 3, t |= (this.regH & 1) << 2, t |= this.regVT >> 3 & 3;
    var i = (this.regVT & 7) << 5;
    i |= this.regHT & 31, this.vramTmpAddress = (t << 8 | i) & 32767;
  },
  cntsToAddress: function() {
    var t = (this.cntFV & 7) << 4;
    t |= (this.cntV & 1) << 3, t |= (this.cntH & 1) << 2, t |= this.cntVT >> 3 & 3;
    var i = (this.cntVT & 7) << 5;
    i |= this.cntHT & 31, this.vramAddress = (t << 8 | i) & 32767;
  },
  incTileCounter: function(t) {
    for (var i = t; i !== 0; i--)
      this.cntHT++, this.cntHT === 32 && (this.cntHT = 0, this.cntVT++, this.cntVT >= 30 && (this.cntH++, this.cntH === 2 && (this.cntH = 0, this.cntV++, this.cntV === 2 && (this.cntV = 0, this.cntFV++, this.cntFV &= 7))));
  },
  mirroredLoad: function(t) {
    return this.vramMem[this.vramMirrorTable[t]];
  },
  mirroredWrite: function(t, i) {
    if (t >= 16128 && t < 16160)
      t === 16128 || t === 16144 ? (this.writeMem(16128, i), this.writeMem(16144, i)) : t === 16132 || t === 16148 ? (this.writeMem(16132, i), this.writeMem(16148, i)) : t === 16136 || t === 16152 ? (this.writeMem(16136, i), this.writeMem(16152, i)) : t === 16140 || t === 16156 ? (this.writeMem(16140, i), this.writeMem(16156, i)) : this.writeMem(t, i);
    else if (t < this.vramMirrorTable.length)
      this.writeMem(this.vramMirrorTable[t], i);
    else
      throw new Error("Invalid VRAM address: " + t.toString(16));
  },
  triggerRendering: function() {
    this.scanline >= 21 && this.scanline <= 260 && (this.renderFramePartially(
      this.lastRenderedScanline + 1,
      this.scanline - 21 - this.lastRenderedScanline
    ), this.lastRenderedScanline = this.scanline - 21);
  },
  renderFramePartially: function(t, i) {
    if (this.f_spVisibility === 1 && this.renderSpritesPartially(t, i, !0), this.f_bgVisibility === 1) {
      var s = t << 8, e = t + i << 8;
      e > 61440 && (e = 61440);
      for (var r = this.buffer, a = this.bgbuffer, n = this.pixrendered, h = s; h < e; h++)
        n[h] > 255 && (r[h] = a[h]);
    }
    this.f_spVisibility === 1 && this.renderSpritesPartially(t, i, !1), this.validTileData = !1;
  },
  renderBgScanline: function(t, i) {
    var s = this.regS === 0 ? 0 : 256, e = (i << 8) - this.regFH;
    if (this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH], this.cntHT = this.regHT, this.cntH = this.regH, this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH], i < 240 && i - this.cntFV >= 0) {
      for (var r = this.cntFV << 3, a = this.scantile, n = this.attrib, h = this.ptTile, u = this.nameTable, c = this.imgPalette, R = this.pixrendered, f = t ? this.bgbuffer : this.buffer, _, F, E, P, S = 0; S < 32; S++) {
        if (i >= 0) {
          if (this.validTileData) {
            if (_ = a[S], typeof _ > "u")
              continue;
            F = _.pix, E = n[S];
          } else {
            if (_ = h[s + u[this.curNt].getTileIndex(this.cntHT, this.cntVT)], typeof _ > "u")
              continue;
            F = _.pix, E = u[this.curNt].getAttrib(this.cntHT, this.cntVT), a[S] = _, n[S] = E;
          }
          var g = 0, T = (S << 3) - this.regFH;
          if (T > -8)
            if (T < 0 && (e -= T, g = -T), _.opaque[this.cntFV])
              for (; g < 8; g++)
                f[e] = c[F[r + g] + E], R[e] |= 256, e++;
            else
              for (; g < 8; g++)
                P = F[r + g], P !== 0 && (f[e] = c[P + E], R[e] |= 256), e++;
        }
        ++this.cntHT === 32 && (this.cntHT = 0, this.cntH++, this.cntH %= 2, this.curNt = this.ntable1[(this.cntV << 1) + this.cntH]);
      }
      this.validTileData = !0;
    }
    this.cntFV++, this.cntFV === 8 && (this.cntFV = 0, this.cntVT++, this.cntVT === 30 ? (this.cntVT = 0, this.cntV++, this.cntV %= 2, this.curNt = this.ntable1[(this.cntV << 1) + this.cntH]) : this.cntVT === 32 && (this.cntVT = 0), this.validTileData = !1);
  },
  renderSpritesPartially: function(t, i, s) {
    if (this.f_spVisibility === 1) {
      for (var e = 0; e < 64; e++)
        if (this.bgPriority[e] === s && this.sprX[e] >= 0 && this.sprX[e] < 256 && this.sprY[e] + 8 >= t && this.sprY[e] < t + i)
          if (this.f_spriteSize === 0)
            this.srcy1 = 0, this.srcy2 = 8, this.sprY[e] < t && (this.srcy1 = t - this.sprY[e] - 1), this.sprY[e] + 8 > t + i && (this.srcy2 = t + i - this.sprY[e] + 1), this.f_spPatternTable === 0 ? this.ptTile[this.sprTile[e]].render(
              this.buffer,
              0,
              this.srcy1,
              8,
              this.srcy2,
              this.sprX[e],
              this.sprY[e] + 1,
              this.sprCol[e],
              this.sprPalette,
              this.horiFlip[e],
              this.vertFlip[e],
              e,
              this.pixrendered
            ) : this.ptTile[this.sprTile[e] + 256].render(
              this.buffer,
              0,
              this.srcy1,
              8,
              this.srcy2,
              this.sprX[e],
              this.sprY[e] + 1,
              this.sprCol[e],
              this.sprPalette,
              this.horiFlip[e],
              this.vertFlip[e],
              e,
              this.pixrendered
            );
          else {
            var r = this.sprTile[e];
            (r & 1) !== 0 && (r = this.sprTile[e] - 1 + 256);
            var a = 0, n = 8;
            this.sprY[e] < t && (a = t - this.sprY[e] - 1), this.sprY[e] + 8 > t + i && (n = t + i - this.sprY[e]), this.ptTile[r + (this.vertFlip[e] ? 1 : 0)].render(
              this.buffer,
              0,
              a,
              8,
              n,
              this.sprX[e],
              this.sprY[e] + 1,
              this.sprCol[e],
              this.sprPalette,
              this.horiFlip[e],
              this.vertFlip[e],
              e,
              this.pixrendered
            ), a = 0, n = 8, this.sprY[e] + 8 < t && (a = t - (this.sprY[e] + 8 + 1)), this.sprY[e] + 16 > t + i && (n = t + i - (this.sprY[e] + 8)), this.ptTile[r + (this.vertFlip[e] ? 0 : 1)].render(
              this.buffer,
              0,
              a,
              8,
              n,
              this.sprX[e],
              this.sprY[e] + 1 + 8,
              this.sprCol[e],
              this.sprPalette,
              this.horiFlip[e],
              this.vertFlip[e],
              e,
              this.pixrendered
            );
          }
    }
  },
  checkSprite0: function(t) {
    this.spr0HitX = -1, this.spr0HitY = -1;
    var i, s = this.f_spPatternTable === 0 ? 0 : 256, e, r, a, n, h;
    if (e = this.sprX[0], r = this.sprY[0] + 1, this.f_spriteSize === 0) {
      if (r <= t && r + 8 > t && e >= -7 && e < 256)
        if (a = this.ptTile[this.sprTile[0] + s], this.vertFlip[0] ? i = 7 - (t - r) : i = t - r, i *= 8, h = t * 256 + e, this.horiFlip[0])
          for (n = 7; n >= 0; n--) {
            if (e >= 0 && e < 256 && h >= 0 && h < 61440 && this.pixrendered[h] !== 0 && a.pix[i + n] !== 0)
              return this.spr0HitX = h % 256, this.spr0HitY = t, !0;
            e++, h++;
          }
        else
          for (n = 0; n < 8; n++) {
            if (e >= 0 && e < 256 && h >= 0 && h < 61440 && this.pixrendered[h] !== 0 && a.pix[i + n] !== 0)
              return this.spr0HitX = h % 256, this.spr0HitY = t, !0;
            e++, h++;
          }
    } else if (r <= t && r + 16 > t && e >= -7 && e < 256)
      if (this.vertFlip[0] ? i = 15 - (t - r) : i = t - r, i < 8 ? a = this.ptTile[this.sprTile[0] + (this.vertFlip[0] ? 1 : 0) + ((this.sprTile[0] & 1) !== 0 ? 255 : 0)] : (a = this.ptTile[this.sprTile[0] + (this.vertFlip[0] ? 0 : 1) + ((this.sprTile[0] & 1) !== 0 ? 255 : 0)], this.vertFlip[0] ? i = 15 - i : i -= 8), i *= 8, h = t * 256 + e, this.horiFlip[0])
        for (n = 7; n >= 0; n--) {
          if (e >= 0 && e < 256 && h >= 0 && h < 61440 && this.pixrendered[h] !== 0 && a.pix[i + n] !== 0)
            return this.spr0HitX = h % 256, this.spr0HitY = t, !0;
          e++, h++;
        }
      else
        for (n = 0; n < 8; n++) {
          if (e >= 0 && e < 256 && h >= 0 && h < 61440 && this.pixrendered[h] !== 0 && a.pix[i + n] !== 0)
            return this.spr0HitX = h % 256, this.spr0HitY = t, !0;
          e++, h++;
        }
    return !1;
  },
  writeMem: function(t, i) {
    this.vramMem[t] = i, t < 8192 ? (this.vramMem[t] = i, this.patternWrite(t, i)) : t >= 8192 && t < 9152 ? this.nameTableWrite(this.ntable1[0], t - 8192, i) : t >= 9152 && t < 9216 ? this.attribTableWrite(this.ntable1[0], t - 9152, i) : t >= 9216 && t < 10176 ? this.nameTableWrite(this.ntable1[1], t - 9216, i) : t >= 10176 && t < 10240 ? this.attribTableWrite(this.ntable1[1], t - 10176, i) : t >= 10240 && t < 11200 ? this.nameTableWrite(this.ntable1[2], t - 10240, i) : t >= 11200 && t < 11264 ? this.attribTableWrite(this.ntable1[2], t - 11200, i) : t >= 11264 && t < 12224 ? this.nameTableWrite(this.ntable1[3], t - 11264, i) : t >= 12224 && t < 12288 ? this.attribTableWrite(this.ntable1[3], t - 12224, i) : t >= 16128 && t < 16160 && this.updatePalettes();
  },
  updatePalettes: function() {
    var t;
    for (t = 0; t < 16; t++)
      this.f_dispType === 0 ? this.imgPalette[t] = this.palTable.getEntry(
        this.vramMem[16128 + t] & 63
      ) : this.imgPalette[t] = this.palTable.getEntry(
        this.vramMem[16128 + t] & 32
      );
    for (t = 0; t < 16; t++)
      this.f_dispType === 0 ? this.sprPalette[t] = this.palTable.getEntry(
        this.vramMem[16144 + t] & 63
      ) : this.sprPalette[t] = this.palTable.getEntry(
        this.vramMem[16144 + t] & 32
      );
  },
  patternWrite: function(t, i) {
    var s = Math.floor(t / 16), e = t % 16;
    e < 8 ? this.ptTile[s].setScanline(
      e,
      i,
      this.vramMem[t + 8]
    ) : this.ptTile[s].setScanline(
      e - 8,
      this.vramMem[t - 8],
      i
    );
  },
  nameTableWrite: function(t, i, s) {
    this.nameTable[t].tile[i] = s, this.checkSprite0(this.scanline - 20);
  },
  attribTableWrite: function(t, i, s) {
    this.nameTable[t].writeAttrib(i, s);
  },
  spriteRamWriteUpdate: function(t, i) {
    var s = Math.floor(t / 4);
    s === 0 && this.checkSprite0(this.scanline - 20), t % 4 === 0 ? this.sprY[s] = i : t % 4 === 1 ? this.sprTile[s] = i : t % 4 === 2 ? (this.vertFlip[s] = (i & 128) !== 0, this.horiFlip[s] = (i & 64) !== 0, this.bgPriority[s] = (i & 32) !== 0, this.sprCol[s] = (i & 3) << 2) : t % 4 === 3 && (this.sprX[s] = i);
  },
  doNMI: function() {
    this.setStatusFlag(this.STATUS_VBLANK, !0), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NMI);
  },
  isPixelWhite: function(t, i) {
    return this.triggerRendering(), this.nes.ppu.buffer[(i << 8) + t] === 16777215;
  },
  JSON_PROPERTIES: [
    "vramMem",
    "spriteMem",
    "cntFV",
    "cntV",
    "cntH",
    "cntVT",
    "cntHT",
    "regFV",
    "regV",
    "regH",
    "regVT",
    "regHT",
    "regFH",
    "regS",
    "vramAddress",
    "vramTmpAddress",
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
    "vramBufferedReadValue",
    "firstWrite",
    "currentMirroring",
    "vramMirrorTable",
    "ntable1",
    "sramAddress",
    "hitSpr0",
    "sprPalette",
    "imgPalette",
    "curX",
    "scanline",
    "lastRenderedScanline",
    "curNt",
    "scantile",
    "attrib",
    "buffer",
    "bgbuffer",
    "pixrendered",
    "requestEndFrame",
    "nmiOk",
    "dummyCycleToggle",
    "nmiCounter",
    "validTileData",
    "scanlineAlreadyRendered"
  ],
  toJSON: function() {
    var t, i = Nt.toJSON(this);
    for (i.nameTable = [], t = 0; t < this.nameTable.length; t++)
      i.nameTable[t] = this.nameTable[t].toJSON();
    for (i.ptTile = [], t = 0; t < this.ptTile.length; t++)
      i.ptTile[t] = this.ptTile[t].toJSON();
    return i;
  },
  fromJSON: function(t) {
    var i;
    for (Nt.fromJSON(this, t), i = 0; i < this.nameTable.length; i++)
      this.nameTable[i].fromJSON(t.nameTable[i]);
    for (i = 0; i < this.ptTile.length; i++)
      this.ptTile[i].fromJSON(t.ptTile[i]);
    for (i = 0; i < this.spriteMem.length; i++)
      this.spriteRamWriteUpdate(i, this.spriteMem[i]);
  }
};
var zt = function(t, i, s) {
  this.width = t, this.height = i, this.name = s, this.tile = new Array(t * i), this.attrib = new Array(t * i);
  for (var e = 0; e < t * i; e++)
    this.tile[e] = 0, this.attrib[e] = 0;
};
zt.prototype = {
  getTileIndex: function(t, i) {
    return this.tile[i * this.width + t];
  },
  getAttrib: function(t, i) {
    return this.attrib[i * this.width + t];
  },
  writeAttrib: function(t, i) {
    for (var s = t % 8 * 4, e = Math.floor(t / 8) * 4, r, a, n, h, u = 0; u < 2; u++)
      for (var c = 0; c < 2; c++) {
        r = i >> 2 * (u * 2 + c) & 3;
        for (var R = 0; R < 2; R++)
          for (var f = 0; f < 2; f++)
            a = s + c * 2 + f, n = e + u * 2 + R, h = n * this.width + a, this.attrib[h] = r << 2 & 12;
      }
  },
  toJSON: function() {
    return {
      tile: this.tile,
      attrib: this.attrib
    };
  },
  fromJSON: function(t) {
    this.tile = t.tile, this.attrib = t.attrib;
  }
};
var jt = function() {
  this.curTable = new Array(64), this.emphTable = new Array(8), this.currentEmph = -1;
};
jt.prototype = {
  reset: function() {
    this.setEmphasis(0);
  },
  loadNTSCPalette: function() {
    this.curTable = [5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0], this.makeTables(), this.setEmphasis(0);
  },
  loadPALPalette: function() {
    this.curTable = [5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0], this.makeTables(), this.setEmphasis(0);
  },
  makeTables: function() {
    for (var t, i, s, e, r, a, n, h, u = 0; u < 8; u++)
      for (a = 1, n = 1, h = 1, (u & 1) !== 0 && (a = 0.75, h = 0.75), (u & 2) !== 0 && (a = 0.75, n = 0.75), (u & 4) !== 0 && (n = 0.75, h = 0.75), this.emphTable[u] = new Array(64), r = 0; r < 64; r++)
        e = this.curTable[r], t = Math.floor(this.getRed(e) * a), i = Math.floor(this.getGreen(e) * n), s = Math.floor(this.getBlue(e) * h), this.emphTable[u][r] = this.getRgb(t, i, s);
  },
  setEmphasis: function(t) {
    if (t !== this.currentEmph) {
      this.currentEmph = t;
      for (var i = 0; i < 64; i++)
        this.curTable[i] = this.emphTable[t][i];
    }
  },
  getEntry: function(t) {
    return this.curTable[t];
  },
  getRed: function(t) {
    return t >> 16 & 255;
  },
  getGreen: function(t) {
    return t >> 8 & 255;
  },
  getBlue: function(t) {
    return t & 255;
  },
  getRgb: function(t, i, s) {
    return t << 16 | i << 8 | s;
  },
  loadDefaultPalette: function() {
    this.curTable[0] = this.getRgb(117, 117, 117), this.curTable[1] = this.getRgb(39, 27, 143), this.curTable[2] = this.getRgb(0, 0, 171), this.curTable[3] = this.getRgb(71, 0, 159), this.curTable[4] = this.getRgb(143, 0, 119), this.curTable[5] = this.getRgb(171, 0, 19), this.curTable[6] = this.getRgb(167, 0, 0), this.curTable[7] = this.getRgb(127, 11, 0), this.curTable[8] = this.getRgb(67, 47, 0), this.curTable[9] = this.getRgb(0, 71, 0), this.curTable[10] = this.getRgb(0, 81, 0), this.curTable[11] = this.getRgb(0, 63, 23), this.curTable[12] = this.getRgb(27, 63, 95), this.curTable[13] = this.getRgb(0, 0, 0), this.curTable[14] = this.getRgb(0, 0, 0), this.curTable[15] = this.getRgb(0, 0, 0), this.curTable[16] = this.getRgb(188, 188, 188), this.curTable[17] = this.getRgb(0, 115, 239), this.curTable[18] = this.getRgb(35, 59, 239), this.curTable[19] = this.getRgb(131, 0, 243), this.curTable[20] = this.getRgb(191, 0, 191), this.curTable[21] = this.getRgb(231, 0, 91), this.curTable[22] = this.getRgb(219, 43, 0), this.curTable[23] = this.getRgb(203, 79, 15), this.curTable[24] = this.getRgb(139, 115, 0), this.curTable[25] = this.getRgb(0, 151, 0), this.curTable[26] = this.getRgb(0, 171, 0), this.curTable[27] = this.getRgb(0, 147, 59), this.curTable[28] = this.getRgb(0, 131, 139), this.curTable[29] = this.getRgb(0, 0, 0), this.curTable[30] = this.getRgb(0, 0, 0), this.curTable[31] = this.getRgb(0, 0, 0), this.curTable[32] = this.getRgb(255, 255, 255), this.curTable[33] = this.getRgb(63, 191, 255), this.curTable[34] = this.getRgb(95, 151, 255), this.curTable[35] = this.getRgb(167, 139, 253), this.curTable[36] = this.getRgb(247, 123, 255), this.curTable[37] = this.getRgb(255, 119, 183), this.curTable[38] = this.getRgb(255, 119, 99), this.curTable[39] = this.getRgb(255, 155, 59), this.curTable[40] = this.getRgb(243, 191, 63), this.curTable[41] = this.getRgb(131, 211, 19), this.curTable[42] = this.getRgb(79, 223, 75), this.curTable[43] = this.getRgb(88, 248, 152), this.curTable[44] = this.getRgb(0, 235, 219), this.curTable[45] = this.getRgb(0, 0, 0), this.curTable[46] = this.getRgb(0, 0, 0), this.curTable[47] = this.getRgb(0, 0, 0), this.curTable[48] = this.getRgb(255, 255, 255), this.curTable[49] = this.getRgb(171, 231, 255), this.curTable[50] = this.getRgb(199, 215, 255), this.curTable[51] = this.getRgb(215, 203, 255), this.curTable[52] = this.getRgb(255, 199, 255), this.curTable[53] = this.getRgb(255, 199, 219), this.curTable[54] = this.getRgb(255, 191, 179), this.curTable[55] = this.getRgb(255, 219, 171), this.curTable[56] = this.getRgb(255, 231, 163), this.curTable[57] = this.getRgb(227, 255, 163), this.curTable[58] = this.getRgb(171, 243, 191), this.curTable[59] = this.getRgb(179, 255, 207), this.curTable[60] = this.getRgb(159, 255, 243), this.curTable[61] = this.getRgb(0, 0, 0), this.curTable[62] = this.getRgb(0, 0, 0), this.curTable[63] = this.getRgb(0, 0, 0), this.makeTables(), this.setEmphasis(0);
  }
};
var Ui = Jt, Ki = 17897725e-1, $t = function(t) {
  this.nes = t, this.square1 = new at(this, !0), this.square2 = new at(this, !1), this.triangle = new ii(this), this.noise = new ti(this), this.dmc = new Qt(this), this.frameIrqCounter = null, this.frameIrqCounterMax = 4, this.initCounter = 2048, this.channelEnableValue = null, this.sampleRate = 44100, this.lengthLookup = null, this.dmcFreqLookup = null, this.noiseWavelengthLookup = null, this.square_table = null, this.tnd_table = null, this.frameIrqEnabled = !1, this.frameIrqActive = null, this.frameClockNow = null, this.startedPlaying = !1, this.recordOutput = !1, this.initingHardware = !1, this.masterFrameCounter = null, this.derivedFrameCounter = null, this.countSequence = null, this.sampleTimer = null, this.frameTime = null, this.sampleTimerMax = null, this.sampleCount = null, this.triValue = 0, this.smpSquare1 = null, this.smpSquare2 = null, this.smpTriangle = null, this.smpDmc = null, this.accCount = null, this.prevSampleL = 0, this.prevSampleR = 0, this.smpAccumL = 0, this.smpAccumR = 0, this.dacRange = 0, this.dcValue = 0, this.masterVolume = 256, this.stereoPosLSquare1 = null, this.stereoPosLSquare2 = null, this.stereoPosLTriangle = null, this.stereoPosLNoise = null, this.stereoPosLDMC = null, this.stereoPosRSquare1 = null, this.stereoPosRSquare2 = null, this.stereoPosRTriangle = null, this.stereoPosRNoise = null, this.stereoPosRDMC = null, this.extraCycles = null, this.maxSample = null, this.minSample = null, this.panning = [80, 170, 100, 150, 128], this.setPanning(this.panning), this.initLengthLookup(), this.initDmcFrequencyLookup(), this.initNoiseWavelengthLookup(), this.initDACtables();
  for (var i = 0; i < 20; i++)
    i === 16 ? this.writeReg(16400, 16) : this.writeReg(16384 + i, 0);
  this.reset();
};
$t.prototype = {
  reset: function() {
    this.sampleRate = this.nes.opts.sampleRate, this.sampleTimerMax = Math.floor(
      1024 * Ki * this.nes.opts.preferredFrameRate / (this.sampleRate * 60)
    ), this.frameTime = Math.floor(
      14915 * this.nes.opts.preferredFrameRate / 60
    ), this.sampleTimer = 0, this.updateChannelEnable(0), this.masterFrameCounter = 0, this.derivedFrameCounter = 0, this.countSequence = 0, this.sampleCount = 0, this.initCounter = 2048, this.frameIrqEnabled = !1, this.initingHardware = !1, this.resetCounter(), this.square1.reset(), this.square2.reset(), this.triangle.reset(), this.noise.reset(), this.dmc.reset(), this.accCount = 0, this.smpSquare1 = 0, this.smpSquare2 = 0, this.smpTriangle = 0, this.smpDmc = 0, this.frameIrqEnabled = !1, this.frameIrqCounterMax = 4, this.channelEnableValue = 255, this.startedPlaying = !1, this.prevSampleL = 0, this.prevSampleR = 0, this.smpAccumL = 0, this.smpAccumR = 0, this.maxSample = -5e5, this.minSample = 5e5;
  },
  readReg: function(t) {
    var i = 0;
    return i |= this.square1.getLengthStatus(), i |= this.square2.getLengthStatus() << 1, i |= this.triangle.getLengthStatus() << 2, i |= this.noise.getLengthStatus() << 3, i |= this.dmc.getLengthStatus() << 4, i |= (this.frameIrqActive && this.frameIrqEnabled ? 1 : 0) << 6, i |= this.dmc.getIrqStatus() << 7, this.frameIrqActive = !1, this.dmc.irqGenerated = !1, i & 65535;
  },
  writeReg: function(t, i) {
    t >= 16384 && t < 16388 ? this.square1.writeReg(t, i) : t >= 16388 && t < 16392 ? this.square2.writeReg(t, i) : t >= 16392 && t < 16396 ? this.triangle.writeReg(t, i) : t >= 16396 && t <= 16399 ? this.noise.writeReg(t, i) : t === 16400 ? this.dmc.writeReg(t, i) : t === 16401 ? this.dmc.writeReg(t, i) : t === 16402 ? this.dmc.writeReg(t, i) : t === 16403 ? this.dmc.writeReg(t, i) : t === 16405 ? (this.updateChannelEnable(i), i !== 0 && this.initCounter > 0 && (this.initingHardware = !0), this.dmc.writeReg(t, i)) : t === 16407 && (this.countSequence = i >> 7 & 1, this.masterFrameCounter = 0, this.frameIrqActive = !1, (i >> 6 & 1) === 0 ? this.frameIrqEnabled = !0 : this.frameIrqEnabled = !1, this.countSequence === 0 ? (this.frameIrqCounterMax = 4, this.derivedFrameCounter = 4) : (this.frameIrqCounterMax = 5, this.derivedFrameCounter = 0, this.frameCounterTick()));
  },
  resetCounter: function() {
    this.countSequence === 0 ? this.derivedFrameCounter = 4 : this.derivedFrameCounter = 0;
  },
  updateChannelEnable: function(t) {
    this.channelEnableValue = t & 65535, this.square1.setEnabled((t & 1) !== 0), this.square2.setEnabled((t & 2) !== 0), this.triangle.setEnabled((t & 4) !== 0), this.noise.setEnabled((t & 8) !== 0), this.dmc.setEnabled((t & 16) !== 0);
  },
  clockFrameCounter: function(t) {
    if (this.initCounter > 0 && this.initingHardware) {
      this.initCounter -= t, this.initCounter <= 0 && (this.initingHardware = !1);
      return;
    }
    t += this.extraCycles;
    var i = this.sampleTimerMax - this.sampleTimer;
    t << 10 > i ? (this.extraCycles = (t << 10) - i >> 10, t -= this.extraCycles) : this.extraCycles = 0;
    var s = this.dmc, e = this.triangle, r = this.square1, a = this.square2, n = this.noise;
    if (s.isEnabled)
      for (s.shiftCounter -= t << 3; s.shiftCounter <= 0 && s.dmaFrequency > 0; )
        s.shiftCounter += s.dmaFrequency, s.clockDmc();
    if (e.progTimerMax > 0)
      for (e.progTimerCount -= t; e.progTimerCount <= 0; )
        e.progTimerCount += e.progTimerMax + 1, e.linearCounter > 0 && e.lengthCounter > 0 && (e.triangleCounter++, e.triangleCounter &= 31, e.isEnabled && (e.triangleCounter >= 16 ? e.sampleValue = e.triangleCounter & 15 : e.sampleValue = 15 - (e.triangleCounter & 15), e.sampleValue <<= 4));
    r.progTimerCount -= t, r.progTimerCount <= 0 && (r.progTimerCount += r.progTimerMax + 1 << 1, r.squareCounter++, r.squareCounter &= 7, r.updateSampleValue()), a.progTimerCount -= t, a.progTimerCount <= 0 && (a.progTimerCount += a.progTimerMax + 1 << 1, a.squareCounter++, a.squareCounter &= 7, a.updateSampleValue());
    var h = t;
    if (n.progTimerCount - h > 0)
      n.progTimerCount -= h, n.accCount += h, n.accValue += h * n.sampleValue;
    else
      for (; h-- > 0; )
        --n.progTimerCount <= 0 && n.progTimerMax > 0 && (n.shiftReg <<= 1, n.tmp = (n.shiftReg << (n.randomMode === 0 ? 1 : 6) ^ n.shiftReg) & 32768, n.tmp !== 0 ? (n.shiftReg |= 1, n.randomBit = 0, n.sampleValue = 0) : (n.randomBit = 1, n.isEnabled && n.lengthCounter > 0 ? n.sampleValue = n.masterVolume : n.sampleValue = 0), n.progTimerCount += n.progTimerMax), n.accValue += n.sampleValue, n.accCount++;
    this.frameIrqEnabled && this.frameIrqActive && this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL), this.masterFrameCounter += t << 1, this.masterFrameCounter >= this.frameTime && (this.masterFrameCounter -= this.frameTime, this.frameCounterTick()), this.accSample(t), this.sampleTimer += t << 10, this.sampleTimer >= this.sampleTimerMax && (this.sample(), this.sampleTimer -= this.sampleTimerMax);
  },
  accSample: function(t) {
    this.triangle.sampleCondition && (this.triValue = Math.floor(
      (this.triangle.progTimerCount << 4) / (this.triangle.progTimerMax + 1)
    ), this.triValue > 16 && (this.triValue = 16), this.triangle.triangleCounter >= 16 && (this.triValue = 16 - this.triValue), this.triValue += this.triangle.sampleValue), t === 2 ? (this.smpTriangle += this.triValue << 1, this.smpDmc += this.dmc.sample << 1, this.smpSquare1 += this.square1.sampleValue << 1, this.smpSquare2 += this.square2.sampleValue << 1, this.accCount += 2) : t === 4 ? (this.smpTriangle += this.triValue << 2, this.smpDmc += this.dmc.sample << 2, this.smpSquare1 += this.square1.sampleValue << 2, this.smpSquare2 += this.square2.sampleValue << 2, this.accCount += 4) : (this.smpTriangle += t * this.triValue, this.smpDmc += t * this.dmc.sample, this.smpSquare1 += t * this.square1.sampleValue, this.smpSquare2 += t * this.square2.sampleValue, this.accCount += t);
  },
  frameCounterTick: function() {
    this.derivedFrameCounter++, this.derivedFrameCounter >= this.frameIrqCounterMax && (this.derivedFrameCounter = 0), (this.derivedFrameCounter === 1 || this.derivedFrameCounter === 3) && (this.triangle.clockLengthCounter(), this.square1.clockLengthCounter(), this.square2.clockLengthCounter(), this.noise.clockLengthCounter(), this.square1.clockSweep(), this.square2.clockSweep()), this.derivedFrameCounter >= 0 && this.derivedFrameCounter < 4 && (this.square1.clockEnvDecay(), this.square2.clockEnvDecay(), this.noise.clockEnvDecay(), this.triangle.clockLinearCounter()), this.derivedFrameCounter === 3 && this.countSequence === 0 && (this.frameIrqActive = !0);
  },
  sample: function() {
    var t, i;
    this.accCount > 0 ? (this.smpSquare1 <<= 4, this.smpSquare1 = Math.floor(this.smpSquare1 / this.accCount), this.smpSquare2 <<= 4, this.smpSquare2 = Math.floor(this.smpSquare2 / this.accCount), this.smpTriangle = Math.floor(this.smpTriangle / this.accCount), this.smpDmc <<= 4, this.smpDmc = Math.floor(this.smpDmc / this.accCount), this.accCount = 0) : (this.smpSquare1 = this.square1.sampleValue << 4, this.smpSquare2 = this.square2.sampleValue << 4, this.smpTriangle = this.triangle.sampleValue, this.smpDmc = this.dmc.sample << 4);
    var s = Math.floor((this.noise.accValue << 4) / this.noise.accCount);
    this.noise.accValue = s >> 4, this.noise.accCount = 1, t = this.smpSquare1 * this.stereoPosLSquare1 + this.smpSquare2 * this.stereoPosLSquare2 >> 8, i = 3 * this.smpTriangle * this.stereoPosLTriangle + (s << 1) * this.stereoPosLNoise + this.smpDmc * this.stereoPosLDMC >> 8, t >= this.square_table.length && (t = this.square_table.length - 1), i >= this.tnd_table.length && (i = this.tnd_table.length - 1);
    var e = this.square_table[t] + this.tnd_table[i] - this.dcValue;
    t = this.smpSquare1 * this.stereoPosRSquare1 + this.smpSquare2 * this.stereoPosRSquare2 >> 8, i = 3 * this.smpTriangle * this.stereoPosRTriangle + (s << 1) * this.stereoPosRNoise + this.smpDmc * this.stereoPosRDMC >> 8, t >= this.square_table.length && (t = this.square_table.length - 1), i >= this.tnd_table.length && (i = this.tnd_table.length - 1);
    var r = this.square_table[t] + this.tnd_table[i] - this.dcValue, a = e - this.prevSampleL;
    this.prevSampleL += a, this.smpAccumL += a - (this.smpAccumL >> 10), e = this.smpAccumL;
    var n = r - this.prevSampleR;
    this.prevSampleR += n, this.smpAccumR += n - (this.smpAccumR >> 10), r = this.smpAccumR, e > this.maxSample && (this.maxSample = e), e < this.minSample && (this.minSample = e), this.nes.opts.onAudioSample && this.nes.opts.onAudioSample(e / 32768, r / 32768), this.smpSquare1 = 0, this.smpSquare2 = 0, this.smpTriangle = 0, this.smpDmc = 0;
  },
  getLengthMax: function(t) {
    return this.lengthLookup[t >> 3];
  },
  getDmcFrequency: function(t) {
    return t >= 0 && t < 16 ? this.dmcFreqLookup[t] : 0;
  },
  getNoiseWaveLength: function(t) {
    return t >= 0 && t < 16 ? this.noiseWavelengthLookup[t] : 0;
  },
  setPanning: function(t) {
    for (var i = 0; i < 5; i++)
      this.panning[i] = t[i];
    this.updateStereoPos();
  },
  setMasterVolume: function(t) {
    t < 0 && (t = 0), t > 256 && (t = 256), this.masterVolume = t, this.updateStereoPos();
  },
  updateStereoPos: function() {
    this.stereoPosLSquare1 = this.panning[0] * this.masterVolume >> 8, this.stereoPosLSquare2 = this.panning[1] * this.masterVolume >> 8, this.stereoPosLTriangle = this.panning[2] * this.masterVolume >> 8, this.stereoPosLNoise = this.panning[3] * this.masterVolume >> 8, this.stereoPosLDMC = this.panning[4] * this.masterVolume >> 8, this.stereoPosRSquare1 = this.masterVolume - this.stereoPosLSquare1, this.stereoPosRSquare2 = this.masterVolume - this.stereoPosLSquare2, this.stereoPosRTriangle = this.masterVolume - this.stereoPosLTriangle, this.stereoPosRNoise = this.masterVolume - this.stereoPosLNoise, this.stereoPosRDMC = this.masterVolume - this.stereoPosLDMC;
  },
  initLengthLookup: function() {
    this.lengthLookup = [
      10,
      254,
      20,
      2,
      40,
      4,
      80,
      6,
      160,
      8,
      60,
      10,
      14,
      12,
      26,
      14,
      12,
      16,
      24,
      18,
      48,
      20,
      96,
      22,
      192,
      24,
      72,
      26,
      16,
      28,
      32,
      30
    ];
  },
  initDmcFrequencyLookup: function() {
    this.dmcFreqLookup = new Array(16), this.dmcFreqLookup[0] = 3424, this.dmcFreqLookup[1] = 3040, this.dmcFreqLookup[2] = 2720, this.dmcFreqLookup[3] = 2560, this.dmcFreqLookup[4] = 2288, this.dmcFreqLookup[5] = 2032, this.dmcFreqLookup[6] = 1808, this.dmcFreqLookup[7] = 1712, this.dmcFreqLookup[8] = 1520, this.dmcFreqLookup[9] = 1280, this.dmcFreqLookup[10] = 1136, this.dmcFreqLookup[11] = 1024, this.dmcFreqLookup[12] = 848, this.dmcFreqLookup[13] = 672, this.dmcFreqLookup[14] = 576, this.dmcFreqLookup[15] = 432;
  },
  initNoiseWavelengthLookup: function() {
    this.noiseWavelengthLookup = new Array(16), this.noiseWavelengthLookup[0] = 4, this.noiseWavelengthLookup[1] = 8, this.noiseWavelengthLookup[2] = 16, this.noiseWavelengthLookup[3] = 32, this.noiseWavelengthLookup[4] = 64, this.noiseWavelengthLookup[5] = 96, this.noiseWavelengthLookup[6] = 128, this.noiseWavelengthLookup[7] = 160, this.noiseWavelengthLookup[8] = 202, this.noiseWavelengthLookup[9] = 254, this.noiseWavelengthLookup[10] = 380, this.noiseWavelengthLookup[11] = 508, this.noiseWavelengthLookup[12] = 762, this.noiseWavelengthLookup[13] = 1016, this.noiseWavelengthLookup[14] = 2034, this.noiseWavelengthLookup[15] = 4068;
  },
  initDACtables: function() {
    var t, i, s, e = 0, r = 0;
    for (this.square_table = new Array(32 * 16), this.tnd_table = new Array(204 * 16), s = 0; s < 32 * 16; s++)
      t = 95.52 / (8128 / (s / 16) + 100), t *= 0.98411, t *= 5e4, i = Math.floor(t), this.square_table[s] = i, i > e && (e = i);
    for (s = 0; s < 204 * 16; s++)
      t = 163.67 / (24329 / (s / 16) + 100), t *= 0.98411, t *= 5e4, i = Math.floor(t), this.tnd_table[s] = i, i > r && (r = i);
    this.dacRange = e + r, this.dcValue = this.dacRange / 2;
  }
};
var Qt = function(t) {
  this.papu = t, this.MODE_NORMAL = 0, this.MODE_LOOP = 1, this.MODE_IRQ = 2, this.isEnabled = null, this.hasSample = null, this.irqGenerated = !1, this.playMode = null, this.dmaFrequency = null, this.dmaCounter = null, this.deltaCounter = null, this.playStartAddress = null, this.playAddress = null, this.playLength = null, this.playLengthCounter = null, this.shiftCounter = null, this.reg4012 = null, this.reg4013 = null, this.sample = null, this.dacLsb = null, this.data = null, this.reset();
};
Qt.prototype = {
  clockDmc: function() {
    this.hasSample && ((this.data & 1) === 0 ? this.deltaCounter > 0 && this.deltaCounter-- : this.deltaCounter < 63 && this.deltaCounter++, this.sample = this.isEnabled ? (this.deltaCounter << 1) + this.dacLsb : 0, this.data >>= 1), this.dmaCounter--, this.dmaCounter <= 0 && (this.hasSample = !1, this.endOfSample(), this.dmaCounter = 8), this.irqGenerated && this.papu.nes.cpu.requestIrq(this.papu.nes.cpu.IRQ_NORMAL);
  },
  endOfSample: function() {
    this.playLengthCounter === 0 && this.playMode === this.MODE_LOOP && (this.playAddress = this.playStartAddress, this.playLengthCounter = this.playLength), this.playLengthCounter > 0 && (this.nextSample(), this.playLengthCounter === 0 && this.playMode === this.MODE_IRQ && (this.irqGenerated = !0));
  },
  nextSample: function() {
    this.data = this.papu.nes.mmap.load(this.playAddress), this.papu.nes.cpu.haltCycles(4), this.playLengthCounter--, this.playAddress++, this.playAddress > 65535 && (this.playAddress = 32768), this.hasSample = !0;
  },
  writeReg: function(t, i) {
    t === 16400 ? (i >> 6 === 0 ? this.playMode = this.MODE_NORMAL : (i >> 6 & 1) === 1 ? this.playMode = this.MODE_LOOP : i >> 6 === 2 && (this.playMode = this.MODE_IRQ), (i & 128) === 0 && (this.irqGenerated = !1), this.dmaFrequency = this.papu.getDmcFrequency(i & 15)) : t === 16401 ? (this.deltaCounter = i >> 1 & 63, this.dacLsb = i & 1, this.sample = (this.deltaCounter << 1) + this.dacLsb) : t === 16402 ? (this.playStartAddress = i << 6 | 49152, this.playAddress = this.playStartAddress, this.reg4012 = i) : t === 16403 ? (this.playLength = (i << 4) + 1, this.playLengthCounter = this.playLength, this.reg4013 = i) : t === 16405 && ((i >> 4 & 1) === 0 ? this.playLengthCounter = 0 : (this.playAddress = this.playStartAddress, this.playLengthCounter = this.playLength), this.irqGenerated = !1);
  },
  setEnabled: function(t) {
    !this.isEnabled && t && (this.playLengthCounter = this.playLength), this.isEnabled = t;
  },
  getLengthStatus: function() {
    return this.playLengthCounter === 0 || !this.isEnabled ? 0 : 1;
  },
  getIrqStatus: function() {
    return this.irqGenerated ? 1 : 0;
  },
  reset: function() {
    this.isEnabled = !1, this.irqGenerated = !1, this.playMode = this.MODE_NORMAL, this.dmaFrequency = 0, this.dmaCounter = 0, this.deltaCounter = 0, this.playStartAddress = 0, this.playAddress = 0, this.playLength = 0, this.playLengthCounter = 0, this.sample = 0, this.dacLsb = 0, this.shiftCounter = 0, this.reg4012 = 0, this.reg4013 = 0, this.data = 0;
  }
};
var ti = function(t) {
  this.papu = t, this.isEnabled = null, this.envDecayDisable = null, this.envDecayLoopEnable = null, this.lengthCounterEnable = null, this.envReset = null, this.shiftNow = null, this.lengthCounter = null, this.progTimerCount = null, this.progTimerMax = null, this.envDecayRate = null, this.envDecayCounter = null, this.envVolume = null, this.masterVolume = null, this.shiftReg = 1 << 14, this.randomBit = null, this.randomMode = null, this.sampleValue = null, this.accValue = 0, this.accCount = 1, this.tmp = null, this.reset();
};
ti.prototype = {
  reset: function() {
    this.progTimerCount = 0, this.progTimerMax = 0, this.isEnabled = !1, this.lengthCounter = 0, this.lengthCounterEnable = !1, this.envDecayDisable = !1, this.envDecayLoopEnable = !1, this.shiftNow = !1, this.envDecayRate = 0, this.envDecayCounter = 0, this.envVolume = 0, this.masterVolume = 0, this.shiftReg = 1, this.randomBit = 0, this.randomMode = 0, this.sampleValue = 0, this.tmp = 0;
  },
  clockLengthCounter: function() {
    this.lengthCounterEnable && this.lengthCounter > 0 && (this.lengthCounter--, this.lengthCounter === 0 && this.updateSampleValue());
  },
  clockEnvDecay: function() {
    this.envReset ? (this.envReset = !1, this.envDecayCounter = this.envDecayRate + 1, this.envVolume = 15) : --this.envDecayCounter <= 0 && (this.envDecayCounter = this.envDecayRate + 1, this.envVolume > 0 ? this.envVolume-- : this.envVolume = this.envDecayLoopEnable ? 15 : 0), this.envDecayDisable ? this.masterVolume = this.envDecayRate : this.masterVolume = this.envVolume, this.updateSampleValue();
  },
  updateSampleValue: function() {
    this.isEnabled && this.lengthCounter > 0 && (this.sampleValue = this.randomBit * this.masterVolume);
  },
  writeReg: function(t, i) {
    t === 16396 ? (this.envDecayDisable = (i & 16) !== 0, this.envDecayRate = i & 15, this.envDecayLoopEnable = (i & 32) !== 0, this.lengthCounterEnable = (i & 32) === 0, this.envDecayDisable ? this.masterVolume = this.envDecayRate : this.masterVolume = this.envVolume) : t === 16398 ? (this.progTimerMax = this.papu.getNoiseWaveLength(i & 15), this.randomMode = i >> 7) : t === 16399 && (this.lengthCounter = this.papu.getLengthMax(i & 248), this.envReset = !0);
  },
  setEnabled: function(t) {
    this.isEnabled = t, t || (this.lengthCounter = 0), this.updateSampleValue();
  },
  getLengthStatus: function() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
};
var at = function(t, i) {
  this.papu = t, this.dutyLookup = [
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    1,
    1,
    1,
    1
  ], this.impLookup = [
    1,
    -1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    -1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    -1,
    0,
    0,
    0,
    -1,
    0,
    1,
    0,
    0,
    0,
    0,
    0
  ], this.sqr1 = i, this.isEnabled = null, this.lengthCounterEnable = null, this.sweepActive = null, this.envDecayDisable = null, this.envDecayLoopEnable = null, this.envReset = null, this.sweepCarry = null, this.updateSweepPeriod = null, this.progTimerCount = null, this.progTimerMax = null, this.lengthCounter = null, this.squareCounter = null, this.sweepCounter = null, this.sweepCounterMax = null, this.sweepMode = null, this.sweepShiftAmount = null, this.envDecayRate = null, this.envDecayCounter = null, this.envVolume = null, this.masterVolume = null, this.dutyMode = null, this.sweepResult = null, this.sampleValue = null, this.vol = null, this.reset();
};
at.prototype = {
  reset: function() {
    this.progTimerCount = 0, this.progTimerMax = 0, this.lengthCounter = 0, this.squareCounter = 0, this.sweepCounter = 0, this.sweepCounterMax = 0, this.sweepMode = 0, this.sweepShiftAmount = 0, this.envDecayRate = 0, this.envDecayCounter = 0, this.envVolume = 0, this.masterVolume = 0, this.dutyMode = 0, this.vol = 0, this.isEnabled = !1, this.lengthCounterEnable = !1, this.sweepActive = !1, this.sweepCarry = !1, this.envDecayDisable = !1, this.envDecayLoopEnable = !1;
  },
  clockLengthCounter: function() {
    this.lengthCounterEnable && this.lengthCounter > 0 && (this.lengthCounter--, this.lengthCounter === 0 && this.updateSampleValue());
  },
  clockEnvDecay: function() {
    this.envReset ? (this.envReset = !1, this.envDecayCounter = this.envDecayRate + 1, this.envVolume = 15) : --this.envDecayCounter <= 0 && (this.envDecayCounter = this.envDecayRate + 1, this.envVolume > 0 ? this.envVolume-- : this.envVolume = this.envDecayLoopEnable ? 15 : 0), this.envDecayDisable ? this.masterVolume = this.envDecayRate : this.masterVolume = this.envVolume, this.updateSampleValue();
  },
  clockSweep: function() {
    --this.sweepCounter <= 0 && (this.sweepCounter = this.sweepCounterMax + 1, this.sweepActive && this.sweepShiftAmount > 0 && this.progTimerMax > 7 && (this.sweepCarry = !1, this.sweepMode === 0 ? (this.progTimerMax += this.progTimerMax >> this.sweepShiftAmount, this.progTimerMax > 4095 && (this.progTimerMax = 4095, this.sweepCarry = !0)) : this.progTimerMax = this.progTimerMax - ((this.progTimerMax >> this.sweepShiftAmount) - (this.sqr1 ? 1 : 0)))), this.updateSweepPeriod && (this.updateSweepPeriod = !1, this.sweepCounter = this.sweepCounterMax + 1);
  },
  updateSampleValue: function() {
    this.isEnabled && this.lengthCounter > 0 && this.progTimerMax > 7 ? this.sweepMode === 0 && this.progTimerMax + (this.progTimerMax >> this.sweepShiftAmount) > 4095 ? this.sampleValue = 0 : this.sampleValue = this.masterVolume * this.dutyLookup[(this.dutyMode << 3) + this.squareCounter] : this.sampleValue = 0;
  },
  writeReg: function(t, i) {
    var s = this.sqr1 ? 0 : 4;
    t === 16384 + s ? (this.envDecayDisable = (i & 16) !== 0, this.envDecayRate = i & 15, this.envDecayLoopEnable = (i & 32) !== 0, this.dutyMode = i >> 6 & 3, this.lengthCounterEnable = (i & 32) === 0, this.envDecayDisable ? this.masterVolume = this.envDecayRate : this.masterVolume = this.envVolume, this.updateSampleValue()) : t === 16385 + s ? (this.sweepActive = (i & 128) !== 0, this.sweepCounterMax = i >> 4 & 7, this.sweepMode = i >> 3 & 1, this.sweepShiftAmount = i & 7, this.updateSweepPeriod = !0) : t === 16386 + s ? (this.progTimerMax &= 1792, this.progTimerMax |= i) : t === 16387 + s && (this.progTimerMax &= 255, this.progTimerMax |= (i & 7) << 8, this.isEnabled && (this.lengthCounter = this.papu.getLengthMax(i & 248)), this.envReset = !0);
  },
  setEnabled: function(t) {
    this.isEnabled = t, t || (this.lengthCounter = 0), this.updateSampleValue();
  },
  getLengthStatus: function() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
};
var ii = function(t) {
  this.papu = t, this.isEnabled = null, this.sampleCondition = null, this.lengthCounterEnable = null, this.lcHalt = null, this.lcControl = null, this.progTimerCount = null, this.progTimerMax = null, this.triangleCounter = null, this.lengthCounter = null, this.linearCounter = null, this.lcLoadValue = null, this.sampleValue = null, this.tmp = null, this.reset();
};
ii.prototype = {
  reset: function() {
    this.progTimerCount = 0, this.progTimerMax = 0, this.triangleCounter = 0, this.isEnabled = !1, this.sampleCondition = !1, this.lengthCounter = 0, this.lengthCounterEnable = !1, this.linearCounter = 0, this.lcLoadValue = 0, this.lcHalt = !0, this.lcControl = !1, this.tmp = 0, this.sampleValue = 15;
  },
  clockLengthCounter: function() {
    this.lengthCounterEnable && this.lengthCounter > 0 && (this.lengthCounter--, this.lengthCounter === 0 && this.updateSampleCondition());
  },
  clockLinearCounter: function() {
    this.lcHalt ? (this.linearCounter = this.lcLoadValue, this.updateSampleCondition()) : this.linearCounter > 0 && (this.linearCounter--, this.updateSampleCondition()), this.lcControl || (this.lcHalt = !1);
  },
  getLengthStatus: function() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  },
  readReg: function(t) {
    return 0;
  },
  writeReg: function(t, i) {
    t === 16392 ? (this.lcControl = (i & 128) !== 0, this.lcLoadValue = i & 127, this.lengthCounterEnable = !this.lcControl) : t === 16394 ? (this.progTimerMax &= 1792, this.progTimerMax |= i) : t === 16395 && (this.progTimerMax &= 255, this.progTimerMax |= (i & 7) << 8, this.lengthCounter = this.papu.getLengthMax(i & 248), this.lcHalt = !0), this.updateSampleCondition();
  },
  clockProgrammableTimer: function(t) {
    if (this.progTimerMax > 0)
      for (this.progTimerCount += t; this.progTimerMax > 0 && this.progTimerCount >= this.progTimerMax; )
        this.progTimerCount -= this.progTimerMax, this.isEnabled && this.lengthCounter > 0 && this.linearCounter > 0 && this.clockTriangleGenerator();
  },
  clockTriangleGenerator: function() {
    this.triangleCounter++, this.triangleCounter &= 31;
  },
  setEnabled: function(t) {
    this.isEnabled = t, t || (this.lengthCounter = 0), this.updateSampleCondition();
  },
  updateSampleCondition: function() {
    this.sampleCondition = this.isEnabled && this.progTimerMax > 7 && this.linearCounter > 0 && this.lengthCounter > 0;
  }
};
var Ji = $t, y = pt, o = {};
o[0] = function(t) {
  this.nes = t;
};
o[0].prototype = {
  reset: function() {
    this.joy1StrobeState = 0, this.joy2StrobeState = 0, this.joypadLastWrite = 0, this.zapperFired = !1, this.zapperX = null, this.zapperY = null;
  },
  write: function(t, i) {
    t < 8192 ? this.nes.cpu.mem[t & 2047] = i : t > 16407 ? (this.nes.cpu.mem[t] = i, t >= 24576 && t < 32768 && this.nes.opts.onBatteryRamWrite(t, i)) : t > 8199 && t < 16384 ? this.regWrite(8192 + (t & 7), i) : this.regWrite(t, i);
  },
  writelow: function(t, i) {
    t < 8192 ? this.nes.cpu.mem[t & 2047] = i : t > 16407 ? this.nes.cpu.mem[t] = i : t > 8199 && t < 16384 ? this.regWrite(8192 + (t & 7), i) : this.regWrite(t, i);
  },
  load: function(t) {
    return t &= 65535, t > 16407 ? this.nes.cpu.mem[t] : t >= 8192 ? this.regLoad(t) : this.nes.cpu.mem[t & 2047];
  },
  regLoad: function(t) {
    switch (t >> 12) {
      case 0:
        break;
      case 1:
        break;
      case 2:
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
            var i;
            return this.zapperX !== null && this.zapperY !== null && this.nes.ppu.isPixelWhite(this.zapperX, this.zapperY) ? i = 0 : i = 1 << 3, this.zapperFired && (i |= 1 << 4), (this.joy2Read() | i) & 65535;
        }
        break;
    }
    return 0;
  },
  regWrite: function(t, i) {
    switch (t) {
      case 8192:
        this.nes.cpu.mem[t] = i, this.nes.ppu.updateControlReg1(i);
        break;
      case 8193:
        this.nes.cpu.mem[t] = i, this.nes.ppu.updateControlReg2(i);
        break;
      case 8195:
        this.nes.ppu.writeSRAMAddress(i);
        break;
      case 8196:
        this.nes.ppu.sramWrite(i);
        break;
      case 8197:
        this.nes.ppu.scrollWrite(i);
        break;
      case 8198:
        this.nes.ppu.writeVRAMAddress(i);
        break;
      case 8199:
        this.nes.ppu.vramWrite(i);
        break;
      case 16404:
        this.nes.ppu.sramDMA(i);
        break;
      case 16405:
        this.nes.papu.writeReg(t, i);
        break;
      case 16406:
        (i & 1) === 0 && (this.joypadLastWrite & 1) === 1 && (this.joy1StrobeState = 0, this.joy2StrobeState = 0), this.joypadLastWrite = i;
        break;
      case 16407:
        this.nes.papu.writeReg(t, i);
        break;
      default:
        t >= 16384 && t <= 16407 && this.nes.papu.writeReg(t, i);
    }
  },
  joy1Read: function() {
    var t;
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
  },
  joy2Read: function() {
    var t;
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
  },
  loadROM: function() {
    if (!this.nes.rom.valid || this.nes.rom.romCount < 1)
      throw new Error("NoMapper: Invalid ROM! Unable to load.");
    this.loadPRGROM(), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  },
  loadPRGROM: function() {
    this.nes.rom.romCount > 1 ? (this.loadRomBank(0, 32768), this.loadRomBank(1, 49152)) : (this.loadRomBank(0, 32768), this.loadRomBank(0, 49152));
  },
  loadCHRROM: function() {
    this.nes.rom.vromCount > 0 && (this.nes.rom.vromCount === 1 ? (this.loadVromBank(0, 0), this.loadVromBank(0, 4096)) : (this.loadVromBank(0, 0), this.loadVromBank(1, 4096)));
  },
  loadBatteryRam: function() {
    if (this.nes.rom.batteryRam) {
      var t = this.nes.rom.batteryRam;
      t !== null && t.length === 8192 && y.copyArrayElements(t, 0, this.nes.cpu.mem, 24576, 8192);
    }
  },
  loadRomBank: function(t, i) {
    t %= this.nes.rom.romCount, y.copyArrayElements(
      this.nes.rom.rom[t],
      0,
      this.nes.cpu.mem,
      i,
      16384
    );
  },
  loadVromBank: function(t, i) {
    if (this.nes.rom.vromCount !== 0) {
      this.nes.ppu.triggerRendering(), y.copyArrayElements(
        this.nes.rom.vrom[t % this.nes.rom.vromCount],
        0,
        this.nes.ppu.vramMem,
        i,
        4096
      );
      var s = this.nes.rom.vromTile[t % this.nes.rom.vromCount];
      y.copyArrayElements(
        s,
        0,
        this.nes.ppu.ptTile,
        i >> 4,
        256
      );
    }
  },
  load32kRomBank: function(t, i) {
    this.loadRomBank(t * 2 % this.nes.rom.romCount, i), this.loadRomBank((t * 2 + 1) % this.nes.rom.romCount, i + 16384);
  },
  load8kVromBank: function(t, i) {
    this.nes.rom.vromCount !== 0 && (this.nes.ppu.triggerRendering(), this.loadVromBank(t % this.nes.rom.vromCount, i), this.loadVromBank(
      (t + 1) % this.nes.rom.vromCount,
      i + 4096
    ));
  },
  load1kVromBank: function(t, i) {
    if (this.nes.rom.vromCount !== 0) {
      this.nes.ppu.triggerRendering();
      var s = Math.floor(t / 4) % this.nes.rom.vromCount, e = t % 4 * 1024;
      y.copyArrayElements(
        this.nes.rom.vrom[s],
        e,
        this.nes.ppu.vramMem,
        i,
        1024
      );
      for (var r = this.nes.rom.vromTile[s], a = i >> 4, n = 0; n < 64; n++)
        this.nes.ppu.ptTile[a + n] = r[(t % 4 << 6) + n];
    }
  },
  load2kVromBank: function(t, i) {
    if (this.nes.rom.vromCount !== 0) {
      this.nes.ppu.triggerRendering();
      var s = Math.floor(t / 2) % this.nes.rom.vromCount, e = t % 2 * 2048;
      y.copyArrayElements(
        this.nes.rom.vrom[s],
        e,
        this.nes.ppu.vramMem,
        i,
        2048
      );
      for (var r = this.nes.rom.vromTile[s], a = i >> 4, n = 0; n < 128; n++)
        this.nes.ppu.ptTile[a + n] = r[(t % 2 << 7) + n];
    }
  },
  load8kRomBank: function(t, i) {
    var s = Math.floor(t / 2) % this.nes.rom.romCount, e = t % 2 * 8192;
    y.copyArrayElements(
      this.nes.rom.rom[s],
      e,
      this.nes.cpu.mem,
      i,
      8192
    );
  },
  clockIrqCounter: function() {
  },
  latchAccess: function(t) {
  },
  toJSON: function() {
    return {
      joy1StrobeState: this.joy1StrobeState,
      joy2StrobeState: this.joy2StrobeState,
      joypadLastWrite: this.joypadLastWrite
    };
  },
  fromJSON: function(t) {
    this.joy1StrobeState = t.joy1StrobeState, this.joy2StrobeState = t.joy2StrobeState, this.joypadLastWrite = t.joypadLastWrite;
  }
};
o[1] = function(t) {
  this.nes = t;
};
o[1].prototype = new o[0]();
o[1].prototype.reset = function() {
  o[0].prototype.reset.apply(this), this.regBuffer = 0, this.regBufferCounter = 0, this.mirroring = 0, this.oneScreenMirroring = 0, this.prgSwitchingArea = 1, this.prgSwitchingSize = 1, this.vromSwitchingSize = 0, this.romSelectionReg0 = 0, this.romSelectionReg1 = 0, this.romBankSelect = 0;
};
o[1].prototype.write = function(t, i) {
  if (t < 32768) {
    o[0].prototype.write.apply(this, arguments);
    return;
  }
  (i & 128) !== 0 ? (this.regBufferCounter = 0, this.regBuffer = 0, this.getRegNumber(t) === 0 && (this.prgSwitchingArea = 1, this.prgSwitchingSize = 1)) : (this.regBuffer = this.regBuffer & 255 - (1 << this.regBufferCounter) | (i & 1) << this.regBufferCounter, this.regBufferCounter++, this.regBufferCounter === 5 && (this.setReg(this.getRegNumber(t), this.regBuffer), this.regBuffer = 0, this.regBufferCounter = 0));
};
o[1].prototype.setReg = function(t, i) {
  var s;
  switch (t) {
    case 0:
      s = i & 3, s !== this.mirroring && (this.mirroring = s, (this.mirroring & 2) === 0 ? this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING) : (this.mirroring & 1) !== 0 ? this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING) : this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING)), this.prgSwitchingArea = i >> 2 & 1, this.prgSwitchingSize = i >> 3 & 1, this.vromSwitchingSize = i >> 4 & 1;
      break;
    case 1:
      this.romSelectionReg0 = i >> 4 & 1, this.nes.rom.vromCount > 0 && (this.vromSwitchingSize === 0 ? this.romSelectionReg0 === 0 ? this.load8kVromBank(i & 15, 0) : this.load8kVromBank(
        Math.floor(this.nes.rom.vromCount / 2) + (i & 15),
        0
      ) : this.romSelectionReg0 === 0 ? this.loadVromBank(i & 15, 0) : this.loadVromBank(
        Math.floor(this.nes.rom.vromCount / 2) + (i & 15),
        0
      ));
      break;
    case 2:
      this.romSelectionReg1 = i >> 4 & 1, this.nes.rom.vromCount > 0 && this.vromSwitchingSize === 1 && (this.romSelectionReg1 === 0 ? this.loadVromBank(i & 15, 4096) : this.loadVromBank(
        Math.floor(this.nes.rom.vromCount / 2) + (i & 15),
        4096
      ));
      break;
    default:
      s = i & 15;
      var e, r = 0;
      this.nes.rom.romCount >= 32 ? this.vromSwitchingSize === 0 ? this.romSelectionReg0 === 1 && (r = 16) : r = (this.romSelectionReg0 | this.romSelectionReg1 << 1) << 3 : this.nes.rom.romCount >= 16 && this.romSelectionReg0 === 1 && (r = 8), this.prgSwitchingSize === 0 ? (e = r + (i & 15), this.load32kRomBank(e, 32768)) : (e = r * 2 + (i & 15), this.prgSwitchingArea === 0 ? this.loadRomBank(e, 49152) : this.loadRomBank(e, 32768));
  }
};
o[1].prototype.getRegNumber = function(t) {
  return t >= 32768 && t <= 40959 ? 0 : t >= 40960 && t <= 49151 ? 1 : t >= 49152 && t <= 57343 ? 2 : 3;
};
o[1].prototype.loadROM = function() {
  if (!this.nes.rom.valid)
    throw new Error("MMC1: Invalid ROM! Unable to load.");
  this.loadRomBank(0, 32768), this.loadRomBank(this.nes.rom.romCount - 1, 49152), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};
o[1].prototype.switchLowHighPrgRom = function(t) {
};
o[1].prototype.switch16to32 = function() {
};
o[1].prototype.switch32to16 = function() {
};
o[1].prototype.toJSON = function() {
  var t = o[0].prototype.toJSON.apply(this);
  return t.mirroring = this.mirroring, t.oneScreenMirroring = this.oneScreenMirroring, t.prgSwitchingArea = this.prgSwitchingArea, t.prgSwitchingSize = this.prgSwitchingSize, t.vromSwitchingSize = this.vromSwitchingSize, t.romSelectionReg0 = this.romSelectionReg0, t.romSelectionReg1 = this.romSelectionReg1, t.romBankSelect = this.romBankSelect, t.regBuffer = this.regBuffer, t.regBufferCounter = this.regBufferCounter, t;
};
o[1].prototype.fromJSON = function(t) {
  o[0].prototype.fromJSON.apply(this, arguments), this.mirroring = t.mirroring, this.oneScreenMirroring = t.oneScreenMirroring, this.prgSwitchingArea = t.prgSwitchingArea, this.prgSwitchingSize = t.prgSwitchingSize, this.vromSwitchingSize = t.vromSwitchingSize, this.romSelectionReg0 = t.romSelectionReg0, this.romSelectionReg1 = t.romSelectionReg1, this.romBankSelect = t.romBankSelect, this.regBuffer = t.regBuffer, this.regBufferCounter = t.regBufferCounter;
};
o[2] = function(t) {
  this.nes = t;
};
o[2].prototype = new o[0]();
o[2].prototype.write = function(t, i) {
  if (t < 32768) {
    o[0].prototype.write.apply(this, arguments);
    return;
  } else
    this.loadRomBank(i, 32768);
};
o[2].prototype.loadROM = function() {
  if (!this.nes.rom.valid)
    throw new Error("UNROM: Invalid ROM! Unable to load.");
  this.loadRomBank(0, 32768), this.loadRomBank(this.nes.rom.romCount - 1, 49152), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};
o[3] = function(t) {
  this.nes = t;
};
o[3].prototype = new o[0]();
o[3].prototype.write = function(t, i) {
  if (t < 32768) {
    o[0].prototype.write.apply(this, arguments);
    return;
  } else {
    var s = i % (this.nes.rom.vromCount / 2) * 2;
    this.loadVromBank(s, 0), this.loadVromBank(s + 1, 4096), this.load8kVromBank(i * 2, 0);
  }
};
o[4] = function(t) {
  this.nes = t, this.CMD_SEL_2_1K_VROM_0000 = 0, this.CMD_SEL_2_1K_VROM_0800 = 1, this.CMD_SEL_1K_VROM_1000 = 2, this.CMD_SEL_1K_VROM_1400 = 3, this.CMD_SEL_1K_VROM_1800 = 4, this.CMD_SEL_1K_VROM_1C00 = 5, this.CMD_SEL_ROM_PAGE1 = 6, this.CMD_SEL_ROM_PAGE2 = 7, this.command = null, this.prgAddressSelect = null, this.chrAddressSelect = null, this.pageNumber = null, this.irqCounter = null, this.irqLatchValue = null, this.irqEnable = null, this.prgAddressChanged = !1;
};
o[4].prototype = new o[0]();
o[4].prototype.write = function(t, i) {
  if (t < 32768) {
    o[0].prototype.write.apply(this, arguments);
    return;
  }
  switch (t) {
    case 32768:
      this.command = i & 7;
      var s = i >> 6 & 1;
      s !== this.prgAddressSelect && (this.prgAddressChanged = !0), this.prgAddressSelect = s, this.chrAddressSelect = i >> 7 & 1;
      break;
    case 32769:
      this.executeCommand(this.command, i);
      break;
    case 40960:
      (i & 1) !== 0 ? this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING) : this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
      break;
    case 40961:
      break;
    case 49152:
      this.irqCounter = i;
      break;
    case 49153:
      this.irqLatchValue = i;
      break;
    case 57344:
      this.irqEnable = 0;
      break;
    case 57345:
      this.irqEnable = 1;
      break;
  }
};
o[4].prototype.executeCommand = function(t, i) {
  switch (t) {
    case this.CMD_SEL_2_1K_VROM_0000:
      this.chrAddressSelect === 0 ? (this.load1kVromBank(i, 0), this.load1kVromBank(i + 1, 1024)) : (this.load1kVromBank(i, 4096), this.load1kVromBank(i + 1, 5120));
      break;
    case this.CMD_SEL_2_1K_VROM_0800:
      this.chrAddressSelect === 0 ? (this.load1kVromBank(i, 2048), this.load1kVromBank(i + 1, 3072)) : (this.load1kVromBank(i, 6144), this.load1kVromBank(i + 1, 7168));
      break;
    case this.CMD_SEL_1K_VROM_1000:
      this.chrAddressSelect === 0 ? this.load1kVromBank(i, 4096) : this.load1kVromBank(i, 0);
      break;
    case this.CMD_SEL_1K_VROM_1400:
      this.chrAddressSelect === 0 ? this.load1kVromBank(i, 5120) : this.load1kVromBank(i, 1024);
      break;
    case this.CMD_SEL_1K_VROM_1800:
      this.chrAddressSelect === 0 ? this.load1kVromBank(i, 6144) : this.load1kVromBank(i, 2048);
      break;
    case this.CMD_SEL_1K_VROM_1C00:
      this.chrAddressSelect === 0 ? this.load1kVromBank(i, 7168) : this.load1kVromBank(i, 3072);
      break;
    case this.CMD_SEL_ROM_PAGE1:
      this.prgAddressChanged && (this.prgAddressSelect === 0 ? this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 49152) : this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 32768), this.prgAddressChanged = !1), this.prgAddressSelect === 0 ? this.load8kRomBank(i, 32768) : this.load8kRomBank(i, 49152);
      break;
    case this.CMD_SEL_ROM_PAGE2:
      this.load8kRomBank(i, 40960), this.prgAddressChanged && (this.prgAddressSelect === 0 ? this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 49152) : this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 32768), this.prgAddressChanged = !1);
  }
};
o[4].prototype.loadROM = function() {
  if (!this.nes.rom.valid)
    throw new Error("MMC3: Invalid ROM! Unable to load.");
  this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 49152), this.load8kRomBank((this.nes.rom.romCount - 1) * 2 + 1, 57344), this.load8kRomBank(0, 32768), this.load8kRomBank(1, 40960), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};
o[4].prototype.clockIrqCounter = function() {
  this.irqEnable === 1 && (this.irqCounter--, this.irqCounter < 0 && (this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL), this.irqCounter = this.irqLatchValue));
};
o[4].prototype.toJSON = function() {
  var t = o[0].prototype.toJSON.apply(this);
  return t.command = this.command, t.prgAddressSelect = this.prgAddressSelect, t.chrAddressSelect = this.chrAddressSelect, t.pageNumber = this.pageNumber, t.irqCounter = this.irqCounter, t.irqLatchValue = this.irqLatchValue, t.irqEnable = this.irqEnable, t.prgAddressChanged = this.prgAddressChanged, t;
};
o[4].prototype.fromJSON = function(t) {
  o[0].prototype.fromJSON.apply(this, arguments), this.command = t.command, this.prgAddressSelect = t.prgAddressSelect, this.chrAddressSelect = t.chrAddressSelect, this.pageNumber = t.pageNumber, this.irqCounter = t.irqCounter, this.irqLatchValue = t.irqLatchValue, this.irqEnable = t.irqEnable, this.prgAddressChanged = t.prgAddressChanged;
};
o[5] = function(t) {
  this.nes = t;
};
o[5].prototype = new o[0]();
o[5].prototype.write = function(t, i) {
  t < 32768 ? o[0].prototype.write.apply(this, arguments) : this.load8kVromBank(i, 0);
};
o[5].prototype.write = function(t, i) {
  if (t < 20480) {
    o[0].prototype.write.apply(this, arguments);
    return;
  }
  switch (t) {
    case 20736:
      this.prg_size = i & 3;
      break;
    case 20737:
      this.chr_size = i & 3;
      break;
    case 20738:
      this.sram_we_a = i & 3;
      break;
    case 20739:
      this.sram_we_b = i & 3;
      break;
    case 20740:
      this.graphic_mode = i & 3;
      break;
    case 20741:
      this.nametable_mode = i, this.nametable_type[0] = i & 3, this.load1kVromBank(i & 3, 8192), i >>= 2, this.nametable_type[1] = i & 3, this.load1kVromBank(i & 3, 9216), i >>= 2, this.nametable_type[2] = i & 3, this.load1kVromBank(i & 3, 10240), i >>= 2, this.nametable_type[3] = i & 3, this.load1kVromBank(i & 3, 11264);
      break;
    case 20742:
      this.fill_chr = i;
      break;
    case 20743:
      this.fill_pal = i & 3;
      break;
    case 20755:
      this.SetBank_SRAM(3, i & 3);
      break;
    case 20756:
    case 20757:
    case 20758:
    case 20759:
      this.SetBank_CPU(t, i);
      break;
    case 20768:
    case 20769:
    case 20770:
    case 20771:
    case 20772:
    case 20773:
    case 20774:
    case 20775:
      this.chr_mode = 0, this.chr_page[0][t & 7] = i, this.SetBank_PPU();
      break;
    case 20776:
    case 20777:
    case 20778:
    case 20779:
      this.chr_mode = 1, this.chr_page[1][(t & 3) + 0] = i, this.chr_page[1][(t & 3) + 4] = i, this.SetBank_PPU();
      break;
    case 20992:
      this.split_control = i;
      break;
    case 20993:
      this.split_scroll = i;
      break;
    case 20994:
      this.split_page = i & 63;
      break;
    case 20995:
      this.irq_line = i, this.nes.cpu.ClearIRQ();
      break;
    case 20996:
      this.irq_enable = i, this.nes.cpu.ClearIRQ();
      break;
    case 20997:
      this.mult_a = i;
      break;
    case 20998:
      this.mult_b = i;
      break;
    default:
      t >= 20480 && t <= 20501 ? this.nes.papu.exWrite(t, i) : t >= 23552 && t <= 24575 ? this.graphic_mode === 2 || this.graphic_mode !== 3 && this.irq_status & 64 : t >= 24576 && t <= 32767 && this.sram_we_a === 2 && this.sram_we_b;
      break;
  }
};
o[5].prototype.loadROM = function() {
  if (!this.nes.rom.valid)
    throw new Error("UNROM: Invalid ROM! Unable to load.");
  this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 32768), this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 40960), this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 49152), this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 57344), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};
o[7] = function(t) {
  this.nes = t;
};
o[7].prototype = new o[0]();
o[7].prototype.write = function(t, i) {
  t < 32768 ? o[0].prototype.write.apply(this, arguments) : (this.load32kRomBank(i & 7, 32768), i & 16 ? this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING2) : this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING));
};
o[7].prototype.loadROM = function() {
  if (!this.nes.rom.valid)
    throw new Error("AOROM: Invalid ROM! Unable to load.");
  this.loadPRGROM(), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};
o[11] = function(t) {
  this.nes = t;
};
o[11].prototype = new o[0]();
o[11].prototype.write = function(t, i) {
  if (t < 32768) {
    o[0].prototype.write.apply(this, arguments);
    return;
  } else {
    var s = (i & 15) * 2 % this.nes.rom.romCount, e = ((i & 15) * 2 + 1) % this.nes.rom.romCount;
    if (this.loadRomBank(s, 32768), this.loadRomBank(e, 49152), this.nes.rom.vromCount > 0) {
      var r = (i >> 4) * 2 % this.nes.rom.vromCount;
      this.loadVromBank(r, 0), this.loadVromBank(r + 1, 4096);
    }
  }
};
o[34] = function(t) {
  this.nes = t;
};
o[34].prototype = new o[0]();
o[34].prototype.write = function(t, i) {
  if (t < 32768) {
    o[0].prototype.write.apply(this, arguments);
    return;
  } else
    this.load32kRomBank(i, 32768);
};
o[38] = function(t) {
  this.nes = t;
};
o[38].prototype = new o[0]();
o[38].prototype.write = function(t, i) {
  if (t < 28672 || t > 32767) {
    o[0].prototype.write.apply(this, arguments);
    return;
  } else
    this.load32kRomBank(i & 3, 32768), this.load8kVromBank((i >> 2 & 3) * 2, 0);
};
o[66] = function(t) {
  this.nes = t;
};
o[66].prototype = new o[0]();
o[66].prototype.write = function(t, i) {
  if (t < 32768) {
    o[0].prototype.write.apply(this, arguments);
    return;
  } else
    this.load32kRomBank(i >> 4 & 3, 32768), this.load8kVromBank((i & 3) * 2, 0);
};
o[94] = function(t) {
  this.nes = t;
};
o[94].prototype = new o[0]();
o[94].prototype.write = function(t, i) {
  if (t < 32768) {
    o[0].prototype.write.apply(this, arguments);
    return;
  } else
    this.loadRomBank(i >> 2, 32768);
};
o[94].prototype.loadROM = function() {
  if (!this.nes.rom.valid)
    throw new Error("UN1ROM: Invalid ROM! Unable to load.");
  this.loadRomBank(0, 32768), this.loadRomBank(this.nes.rom.romCount - 1, 49152), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};
o[140] = function(t) {
  this.nes = t;
};
o[140].prototype = new o[0]();
o[140].prototype.write = function(t, i) {
  if (t < 24576 || t > 32767) {
    o[0].prototype.write.apply(this, arguments);
    return;
  } else
    this.load32kRomBank(i >> 4 & 3, 32768), this.load8kVromBank((i & 15) * 2, 0);
};
o[180] = function(t) {
  this.nes = t;
};
o[180].prototype = new o[0]();
o[180].prototype.write = function(t, i) {
  if (t < 32768) {
    o[0].prototype.write.apply(this, arguments);
    return;
  } else
    this.loadRomBank(i, 49152);
};
o[180].prototype.loadROM = function() {
  if (!this.nes.rom.valid)
    throw new Error("Mapper 180: Invalid ROM! Unable to load.");
  this.loadRomBank(0, 32768), this.loadRomBank(this.nes.rom.romCount - 1, 49152), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};
var zi = o, Et = zi, ji = Kt, ei = function(t) {
  this.nes = t, this.mapperName = new Array(92);
  for (var i = 0; i < 92; i++)
    this.mapperName[i] = "Unknown Mapper";
  this.mapperName[0] = "Direct Access", this.mapperName[1] = "Nintendo MMC1", this.mapperName[2] = "UNROM", this.mapperName[3] = "CNROM", this.mapperName[4] = "Nintendo MMC3", this.mapperName[5] = "Nintendo MMC5", this.mapperName[6] = "FFE F4xxx", this.mapperName[7] = "AOROM", this.mapperName[8] = "FFE F3xxx", this.mapperName[9] = "Nintendo MMC2", this.mapperName[10] = "Nintendo MMC4", this.mapperName[11] = "Color Dreams Chip", this.mapperName[12] = "FFE F6xxx", this.mapperName[15] = "100-in-1 switch", this.mapperName[16] = "Bandai chip", this.mapperName[17] = "FFE F8xxx", this.mapperName[18] = "Jaleco SS8806 chip", this.mapperName[19] = "Namcot 106 chip", this.mapperName[20] = "Famicom Disk System", this.mapperName[21] = "Konami VRC4a", this.mapperName[22] = "Konami VRC2a", this.mapperName[23] = "Konami VRC2a", this.mapperName[24] = "Konami VRC6", this.mapperName[25] = "Konami VRC4b", this.mapperName[32] = "Irem G-101 chip", this.mapperName[33] = "Taito TC0190/TC0350", this.mapperName[34] = "32kB ROM switch", this.mapperName[64] = "Tengen RAMBO-1 chip", this.mapperName[65] = "Irem H-3001 chip", this.mapperName[66] = "GNROM switch", this.mapperName[67] = "SunSoft3 chip", this.mapperName[68] = "SunSoft4 chip", this.mapperName[69] = "SunSoft5 FME-7 chip", this.mapperName[71] = "Camerica chip", this.mapperName[78] = "Irem 74HC161/32-based", this.mapperName[91] = "Pirate HK-SF3 chip";
};
ei.prototype = {
  VERTICAL_MIRRORING: 0,
  HORIZONTAL_MIRRORING: 1,
  FOURSCREEN_MIRRORING: 2,
  SINGLESCREEN_MIRRORING: 3,
  SINGLESCREEN_MIRRORING2: 4,
  SINGLESCREEN_MIRRORING3: 5,
  SINGLESCREEN_MIRRORING4: 6,
  CHRROM_MIRRORING: 7,
  header: null,
  rom: null,
  vrom: null,
  vromTile: null,
  romCount: null,
  vromCount: null,
  mirroring: null,
  batteryRam: null,
  trainer: null,
  fourScreen: null,
  mapperType: null,
  valid: !1,
  load: function(t) {
    var i, s, e;
    if (t.indexOf("NES") === -1)
      throw new Error("Not a valid NES ROM.");
    for (this.header = new Array(16), i = 0; i < 16; i++)
      this.header[i] = t.charCodeAt(i) & 255;
    this.romCount = this.header[4], this.vromCount = this.header[5] * 2, this.mirroring = (this.header[6] & 1) !== 0 ? 1 : 0, this.batteryRam = (this.header[6] & 2) !== 0, this.trainer = (this.header[6] & 4) !== 0, this.fourScreen = (this.header[6] & 8) !== 0, this.mapperType = this.header[6] >> 4 | this.header[7] & 240;
    var r = !1;
    for (i = 8; i < 16; i++)
      if (this.header[i] !== 0) {
        r = !0;
        break;
      }
    r && (this.mapperType &= 15), this.rom = new Array(this.romCount);
    var a = 16;
    for (i = 0; i < this.romCount; i++) {
      for (this.rom[i] = new Array(16384), s = 0; s < 16384 && !(a + s >= t.length); s++)
        this.rom[i][s] = t.charCodeAt(a + s) & 255;
      a += 16384;
    }
    for (this.vrom = new Array(this.vromCount), i = 0; i < this.vromCount; i++) {
      for (this.vrom[i] = new Array(4096), s = 0; s < 4096 && !(a + s >= t.length); s++)
        this.vrom[i][s] = t.charCodeAt(a + s) & 255;
      a += 4096;
    }
    for (this.vromTile = new Array(this.vromCount), i = 0; i < this.vromCount; i++)
      for (this.vromTile[i] = new Array(256), s = 0; s < 256; s++)
        this.vromTile[i][s] = new ji();
    var n, h;
    for (e = 0; e < this.vromCount; e++)
      for (i = 0; i < 4096; i++)
        n = i >> 4, h = i % 16, h < 8 ? this.vromTile[e][n].setScanline(
          h,
          this.vrom[e][i],
          this.vrom[e][i + 8]
        ) : this.vromTile[e][n].setScanline(
          h - 8,
          this.vrom[e][i - 8],
          this.vrom[e][i]
        );
    this.valid = !0;
  },
  getMirroringType: function() {
    return this.fourScreen ? this.FOURSCREEN_MIRRORING : this.mirroring === 0 ? this.HORIZONTAL_MIRRORING : this.VERTICAL_MIRRORING;
  },
  getMapperName: function() {
    return this.mapperType >= 0 && this.mapperType < this.mapperName.length ? this.mapperName[this.mapperType] : "Unknown Mapper, " + this.mapperType;
  },
  mapperSupported: function() {
    return typeof Et[this.mapperType] < "u";
  },
  createMapper: function() {
    if (this.mapperSupported())
      return new Et[this.mapperType](this.nes);
    throw new Error(
      "This ROM uses a mapper not supported by JSNES: " + this.getMapperName() + "(" + this.mapperType + ")"
    );
  }
};
var $i = ei, Qi = Wi, Tt = Ht, te = Ui, ie = Ji, ee = $i, si = function(t) {
  if (this.opts = {
    onFrame: function() {
    },
    onAudioSample: null,
    onStatusUpdate: function() {
    },
    onBatteryRamWrite: function() {
    },
    preferredFrameRate: 60,
    emulateSound: !0,
    sampleRate: 48e3
  }, typeof t < "u") {
    var i;
    for (i in this.opts)
      typeof t[i] < "u" && (this.opts[i] = t[i]);
  }
  this.frameTime = 1e3 / this.opts.preferredFrameRate, this.ui = {
    writeFrame: this.opts.onFrame,
    updateStatus: this.opts.onStatusUpdate
  }, this.cpu = new Qi(this), this.ppu = new te(this), this.papu = new ie(this), this.mmap = null, this.controllers = {
    1: new Tt(),
    2: new Tt()
  }, this.ui.updateStatus("Ready to load a ROM."), this.frame = this.frame.bind(this), this.buttonDown = this.buttonDown.bind(this), this.buttonUp = this.buttonUp.bind(this), this.zapperMove = this.zapperMove.bind(this), this.zapperFireDown = this.zapperFireDown.bind(this), this.zapperFireUp = this.zapperFireUp.bind(this);
};
si.prototype = {
  fpsFrameCount: 0,
  romData: null,
  reset: function() {
    this.mmap !== null && this.mmap.reset(), this.cpu.reset(), this.ppu.reset(), this.papu.reset(), this.lastFpsTime = null, this.fpsFrameCount = 0;
  },
  frame: function() {
    this.ppu.startFrame();
    var t = 0, i = this.opts.emulateSound, s = this.cpu, e = this.ppu, r = this.papu;
    t:
      for (; ; )
        for (s.cyclesToHalt === 0 ? (t = s.emulate(), i && r.clockFrameCounter(t), t *= 3) : s.cyclesToHalt > 8 ? (t = 24, i && r.clockFrameCounter(8), s.cyclesToHalt -= 8) : (t = s.cyclesToHalt * 3, i && r.clockFrameCounter(s.cyclesToHalt), s.cyclesToHalt = 0); t > 0; t--) {
          if (e.curX === e.spr0HitX && e.f_spVisibility === 1 && e.scanline - 21 === e.spr0HitY && e.setStatusFlag(e.STATUS_SPRITE0HIT, !0), e.requestEndFrame && (e.nmiCounter--, e.nmiCounter === 0)) {
            e.requestEndFrame = !1, e.startVBlank();
            break t;
          }
          e.curX++, e.curX === 341 && (e.curX = 0, e.endScanline());
        }
    this.fpsFrameCount++;
  },
  buttonDown: function(t, i) {
    this.controllers[t].buttonDown(i);
  },
  buttonUp: function(t, i) {
    this.controllers[t].buttonUp(i);
  },
  zapperMove: function(t, i) {
    !this.mmap || (this.mmap.zapperX = t, this.mmap.zapperY = i);
  },
  zapperFireDown: function() {
    !this.mmap || (this.mmap.zapperFired = !0);
  },
  zapperFireUp: function() {
    !this.mmap || (this.mmap.zapperFired = !1);
  },
  getFPS: function() {
    var t = +new Date(), i = null;
    return this.lastFpsTime && (i = this.fpsFrameCount / ((t - this.lastFpsTime) / 1e3)), this.fpsFrameCount = 0, this.lastFpsTime = t, i;
  },
  reloadROM: function() {
    this.romData !== null && this.loadROM(this.romData);
  },
  loadROM: function(t) {
    this.rom = new ee(this), this.rom.load(t), this.reset(), this.mmap = this.rom.createMapper(), this.mmap.loadROM(), this.ppu.setMirroring(this.rom.getMirroringType()), this.romData = t;
  },
  setFramerate: function(t) {
    this.opts.preferredFrameRate = t, this.frameTime = 1e3 / t, this.papu.setSampleRate(this.opts.sampleRate, !1);
  },
  toJSON: function() {
    return {
      romData: this.romData,
      cpu: this.cpu.toJSON(),
      mmap: this.mmap.toJSON(),
      ppu: this.ppu.toJSON()
    };
  },
  fromJSON: function(t) {
    this.reset(), this.romData = t.romData, this.cpu.fromJSON(t.cpu), this.mmap.fromJSON(t.mmap), this.ppu.fromJSON(t.ppu);
  }
};
var se = si, he = {
  Controller: Ht,
  NES: se
};
function H(t) {
  return Array(t).fill(!1);
}
function re(t) {
  return t.filter(Boolean);
}
function ne() {
  return C(32768, 0).map((t, i) => i);
}
function w(t) {
  const i = [];
  let s = t[0], e = 1;
  for (let r = 1; r < t.length; r++)
    t[r] === s ? e++ : (e > 1 ? (i.push(e), i.push(s)) : i.push(-s - 1), s = t[r], e = 1);
  return i.push(e), i.push(s), i;
}
function B(t) {
  const i = [];
  for (let s = 0; s < t.length; )
    if (t[s] < 0)
      i.push(-t[s] - 1), s++;
    else {
      const e = t[s], r = t[s + 1];
      for (let a = 0; a < e; a++)
        i.push(r);
      s += 2;
    }
  return i;
}
function ae(t) {
  const i = [], s = [];
  for (let e = 0; e < t.length; e++) {
    for (let r = 0; r < t[e].opaque.length; r++)
      t[e].opaque[r] === !1 ? i.push(0) : i.push(1);
    s.push(...t[e].pix);
  }
  return [w(i), w(s)];
}
function oe(t) {
  const i = [];
  let s = Array(8), e = [];
  const r = B(t[0]), a = B(t[1]);
  for (let n = 0; n < 512; n += 1) {
    for (let h = 0; h < 8; h += 1)
      r[n * 8 + h] === 0 && (s[h] = !1);
    for (let h = 0; h < 64; h += 1)
      e[h] = a[n * 64 + h];
    i.push({
      opaque: s,
      pix: e
    }), s = Array(8), e = [];
  }
  return i;
}
function le(t) {
  const i = [], s = [];
  return t.reduce((e, r) => (i.push(...r.tile), s.push(...r.attrib), e), i), [w(i), w(s)];
}
function ue(t) {
  const i = [];
  let s = [], e = [];
  const r = B(t[0]), a = B(t[1]);
  for (let n = 0; n < 1024 * 4; n += 1)
    s.push(r[n]), e.push(a[n]), (n + 1) % 1024 === 0 && (i.push({ tile: s, attrib: e }), s = [], e = []);
  return i;
}
function W(t) {
  return Number(`0x${t}`);
}
const tt = class {
  constructor() {
    x(this, "enable");
    x(this, "fixed");
    x(this, "greater");
    x(this, "lesser");
    this.enable = !1, this.fixed = {}, this.greater = {}, this.lesser = {};
  }
  parse(i) {
    const s = tt.reg.exec(i);
    if (!s)
      return;
    const e = W(s[1]), r = W(s[2]), a = W(s[4]);
    this.on(e, r, a);
  }
  on(i, s, e) {
    if (!(i > p.cpu.mem.length - 1))
      switch (this.enable || (this.enable = !0), s) {
        case 0:
          this.fixed[i] = e;
          break;
        case 1:
          p.cpu.mem[i] = e;
          break;
        case 2:
          this.lesser[i] = e;
          break;
        case 3:
          this.greater[i] = e;
          break;
      }
  }
  remove(i) {
    delete this.fixed[i], delete this.greater[i], delete this.lesser[i];
  }
  disable(i) {
    const s = tt.reg.exec(i);
    if (!s)
      return;
    const e = W(s[1]);
    this.remove(e);
  }
  init() {
    this.enable = !1, this.fixed = {}, this.greater = {}, this.lesser = {};
  }
  onFrame() {
    this.enable && (rt(this.fixed).forEach(([i, s]) => {
      p.cpu.mem[i] = s;
    }), rt(this.greater).forEach(([i, s]) => {
      p.cpu.mem[i] < s && (p.cpu.mem[i] = s);
    }), rt(this.lesser).forEach(([i, s]) => {
      p.cpu.mem[i] > s && (p.cpu.mem[i] = s);
    }));
  }
};
let K = tt;
x(K, "reg", /([\da-fA-F]{4})-([0-3])([0-4])-([\da-fA-F]{2,8})/);
const k = new K(), et = 256, st = 240;
let J, hi, ri, z;
const ot = new ImageData(et, st);
function pe(t) {
  p.frameCounter++;
  for (let i = 0; i < 256 * 240; i += 1)
    ri[i] = 4278190080 | t[i];
  k.onFrame();
}
function fe() {
  ot.data.set(hi), z.putImageData(ot, 0, 0);
}
function ce(t) {
  z = t.getContext("2d"), z.fillStyle = "black", z.fillRect(0, 0, et, st);
  const i = new ArrayBuffer(ot.data.length);
  hi = new Uint8ClampedArray(i), ri = new Uint32Array(i), p.frameCounter = 1, J = requestAnimationFrame(s);
  function s() {
    cancelAnimationFrame(J), J = requestAnimationFrame(s), fe();
  }
}
function Ot(t) {
  const i = t.parentNode, s = i.clientWidth, e = i.clientHeight, r = s / e, a = et / st;
  a < r ? (t.style.height = `${e}px`, t.style.width = `${Math.round(e + a)}px`) : (t.style.width = `${s}px`, t.style.height = `${Math.round(s / a)}px`);
}
function Ft() {
  cancelAnimationFrame(J);
}
function me(t) {
  const i = new Image();
  return i.src = t.toDataURL("image/png"), i;
}
let V = {};
const Mt = "........", nt = /\|\d\|([LRUDTSAB.]{8})\|([LRUDTSAB.]{8})?\|\|/g;
function _e() {
  V = {};
}
function yt(t, i) {
  let s = nt.exec(t), e = 0 + i, r = !1;
  if (_e(), !!s)
    for (; s; ) {
      const a = s[1] === Mt, n = s[2] === Mt;
      if (a && n) {
        r && (V[e] = {
          p1: C(8, 64),
          p2: C(8, 64)
        }, r = !1), e++, s = nt.exec(t);
        continue;
      }
      r = !0;
      const h = s[1] ? s[1].split("").map((c) => c === "." ? 64 : 65).reverse() : C(8, 64), u = s[2] ? s[2].split("").map((c) => c === "." ? 64 : 65).reverse() : C(8, 64);
      s = nt.exec(t), V[e] = {
        p1: h,
        p2: u
      }, e++;
    }
}
const p = new he.NES({
  onFrame: pe,
  onAudioSample: ge,
  sampleRate: Ae()
});
p.videoMode = !1;
p.frameCounter = 1;
p.playbackMode = !1;
const N = { buffer: null };
function Re() {
  if (p.videoMode && p.frameCounter in V) {
    const t = V[p.frameCounter];
    p.frameCounter > 0 && (p.controllers[1].state = t.p1, p.controllers[2].state = t.p2);
  }
  p.frame();
}
function Pt(t) {
  const i = p.ppu.toJSON(), s = p.mmap.toJSON(), e = w(i.vramMem), r = le(i.nameTable), a = ae(i.ptTile);
  delete i.attrib, delete i.bgbuffer, delete i.buffer, delete i.pixrendered, delete i.vramMirrorTable, delete i.vramMem, delete i.nameTable, delete i.ptTile;
  const n = p.cpu.toJSON(), h = w(n.mem);
  return delete n.mem, {
    path: t,
    data: {
      cpu: n,
      mmap: s,
      ppu: i,
      vramMemZip: e,
      nameTableZip: r,
      cpuMemZip: h,
      ptTileZip: a,
      frameCounter: p.frameCounter
    }
  };
}
function xe(t, i, s) {
  if (s && t.path !== s)
    return i({
      code: 2,
      message: `Load Error: The saved data is inconsistent with the current game, saved: ${t.path}, current: ${s}.`
    });
  if (!N.buffer)
    return i({
      code: 3,
      message: "Load Error: NES ROM is not loaded."
    });
  try {
    const { ppu: e, cpu: r, mmap: a, frameCounter: n, vramMemZip: h, nameTableZip: u, cpuMemZip: c, ptTileZip: R } = t.data;
    e.attrib = C(32, 0), e.bgbuffer = C(61440, 0), e.buffer = C(61440, 0), e.pixrendered = C(61440, 0), e.vramMem = B(h), e.nameTable = ue(u), e.vramMirrorTable = ne(), e.ptTile = oe(R), r.mem = B(c), p.ppu.reset(), p.romData = N.buffer, p.cpu.fromJSON(r), p.mmap.fromJSON(a), p.ppu.fromJSON(e), p.frameCounter = n;
  } catch (e) {
    console.error(e), i({
      code: 3,
      message: "Load Error: The saved data is invalid."
    });
  }
}
class de {
  constructor() {
    x(this, "_events");
    x(this, "_auto");
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
  on(i, s) {
    this._events[i] || (this._events[i] = []), this._events[i].push(s);
  }
  emit(i, s, e) {
    var r;
    (r = this._events[i]) == null || r.forEach((a) => {
      const n = p.controllers[a.p].state;
      if (a.index <= 7)
        n[a.index] = s;
      else {
        const h = this._auto[a.p][a.index];
        s === 65 ? h.once && (n[a.index - 8] = 65, h.timeout = window.setInterval(() => {
          n[a.index - 8] = h.beDown ? 65 : 64, h.beDown = !h.beDown;
        }, e), h.once = !1) : (clearInterval(h.timeout), n[a.index - 8] = 64, h.once = !0, h.beDown = !1);
      }
    });
  }
  getState(i) {
    return this._events[i];
  }
  init() {
    this._events = {};
  }
}
const j = new de();
let O = new AudioContext(), L, lt = 1;
const vt = 512, ft = 4 * 1024, Q = ft - 1, ni = new Float32Array(ft), ai = new Float32Array(ft);
let X = 0, $ = 0;
function Se() {
  return X - $ & Q;
}
function ge(t, i) {
  ni[X] = t, ai[X] = i, X = X + 1 & Q;
}
function Ae() {
  if (!window.AudioContext)
    return 44100;
  const t = new window.AudioContext(), i = t.sampleRate;
  return t.close(), i;
}
function Ce() {
  O = new AudioContext(), L = O.createScriptProcessor(vt, 0, 2), L.onaudioprocess = (t) => {
    const i = t.outputBuffer, s = i.length;
    Se() < vt && Re();
    const e = i.getChannelData(0), r = i.getChannelData(1);
    for (let a = 0; a < s; a++) {
      const n = $ + a & Q;
      e[a] = ni[n] * lt, r[a] = ai[n] * lt;
    }
    $ = $ + s & Q;
  }, L.connect(O.destination);
}
function kt() {
  L.disconnect(O.destination), L.onaudioprocess = null, L = {}, "close" in O && O.close();
}
function De() {
  O.suspend();
}
function be() {
  O.resume();
}
function Lt(t) {
  lt = ut(t, 0, 100) / 100;
}
const Z = 0.3, wt = {
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
}, ct = {
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
}, mt = {
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
let oi = 1e3 / (2 * 16);
function A(t, i) {
  j.emit(t, i, oi);
}
class Ie {
  constructor(i) {
    x(this, "animationFrame");
    x(this, "axesHolding");
    x(this, "btnHolding");
    x(this, "gamepad_btns");
    window.addEventListener("gamepadconnected", this.connectHandler.bind(this, !0)), window.addEventListener("gamepaddisconnected", this.connectHandler.bind(this, !1)), this.animationFrame = requestAnimationFrame(this.frame.bind(this)), this.btnHolding = {
      p1: H(20),
      p2: H(20)
    }, this.axesHolding = {
      p1: H(4),
      p2: H(4)
    }, this.gamepad_btns = i;
  }
  get gamepads() {
    return re(navigator.getGamepads());
  }
  connectHandler(i, s) {
    i ? this.gamepads[s.gamepad.index] = s.gamepad : this.gamepads.length === 0 && this.close();
  }
  axesHandler(i, s, e, r) {
    var n;
    const a = (n = this.axesHolding[i]) == null ? void 0 : n[e];
    s ? a || (A(this.gamepad_btns.value[i][r], 65), this.axesHolding[i][e] = !0) : a && (A(this.gamepad_btns.value[i][r], 64), this.axesHolding[i][e] = !1);
  }
  btnHandler(i, s, e) {
    var a;
    const r = (a = this.btnHolding[i]) == null ? void 0 : a[e];
    if (s.pressed) {
      if (r)
        return;
      A(this.gamepad_btns.value[i][e], 65), this.btnHolding[i][e] = !0;
    } else
      r && (A(this.gamepad_btns.value[i][e], 64), this.btnHolding[i][e] = !1);
  }
  frame() {
    for (let i = 0; i < this.gamepads.length && !(i > 1); i++) {
      const s = `p${i + 1}`, e = this.gamepads[i];
      e.buttons.forEach(this.btnHandler.bind(this, s));
      const r = e.axes[0], a = e.axes[1];
      this.axesHandler(s, r > Z, 0, 15), this.axesHandler(s, r < -Z, 1, 14), this.axesHandler(s, a > Z, 2, 13), this.axesHandler(s, a < -Z, 3, 12);
    }
  }
  run() {
    this.frame(), cancelAnimationFrame(this.animationFrame), this.animationFrame = requestAnimationFrame(this.run.bind(this));
  }
  close() {
    this.btnHolding.p1.fill(!1), this.btnHolding.p2.fill(!1), this.axesHolding.p1.fill(!1), this.axesHolding.p2.fill(!1), cancelAnimationFrame(this.animationFrame);
  }
}
function Ne(t) {
  const i = U(() => Object.assign(ct, t.p1)), s = U(() => Object.assign(mt, t.p2));
  function e() {
    oi = 1e3 / (2 * ut(t.turbo, 5, 20));
  }
  function r() {
    j.init(), Xt(wt).forEach((h) => {
      const u = wt[h];
      j.on(i.value[h], {
        p: 1,
        index: u
      }), j.on(s.value[h], {
        p: h === "SELECT" || h === "START" ? 1 : 2,
        index: u
      });
    });
  }
  r(), e(), Y(() => t.p1, r, { deep: !0 }), Y(() => t.p2, r, { deep: !0 }), Y(() => t.turbo, e);
  const a = U(() => ({
    p1: [
      i.value.A,
      i.value.C,
      i.value.B,
      i.value.D,
      "",
      "",
      "",
      "",
      i.value.SELECT,
      i.value.START,
      "",
      "",
      i.value.UP,
      i.value.DOWN,
      i.value.LEFT,
      i.value.RIGHT
    ],
    p2: [
      s.value.A,
      s.value.C,
      s.value.B,
      s.value.D,
      "",
      "",
      "",
      "",
      i.value.SELECT,
      i.value.START,
      "",
      "",
      s.value.UP,
      s.value.DOWN,
      s.value.LEFT,
      s.value.RIGHT
    ]
  })), n = new Ie(a);
  return Vt(() => {
    n.run();
  }), Gt(() => {
    n.close();
  }), A;
}
const Ee = () => qt(), Te = ["width", "height"], Oe = { style: { position: "absolute", top: "0", left: "0%", "background-color": "#000", width: "100%", height: "100%" } }, Fe = { name: "NesVue" }, ve = /* @__PURE__ */ Ei({
  ...Fe,
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
    p1: { default: () => ct },
    p2: { default: () => mt }
  },
  emits: ["fps", "success", "error", "saved", "loaded", "update:url", "removed"],
  setup(t, { expose: i, emit: s }) {
    const e = t, r = s;
    if (!e.url)
      throw "nes-vue missing props: url.";
    const a = Ne(e), n = Ee(), h = qt(!0), u = Hi(e.dbName, "save_data");
    let c = !1, R;
    function f(l) {
      return l.message = `[nes-vue] ${l.message}`, e.debugger && console.error(l.message), r("error", l), !1;
    }
    Ti(() => {
      p.ppu.clipToTvSize = !e.noClip;
    });
    function _(l) {
      a(l.code, 65);
    }
    function F(l) {
      a(l.code, 64);
    }
    function E() {
      document.addEventListener("keydown", _), document.addEventListener("keyup", F);
    }
    function P() {
      document.removeEventListener("keydown", _), document.removeEventListener("keyup", F);
    }
    function S(l = e.url) {
      if (it(n.value))
        return;
      if (h.value ? h.value = !1 : (kt(), Ft(), clearInterval(R)), l !== e.url) {
        N.buffer = null, r("update:url", l);
        return;
      }
      ce(n.value), new Promise((d, G) => {
        function dt(I) {
          try {
            p.loadROM(I), R = window.setInterval(() => {
              const St = p.getFPS();
              r("fps", St || 0);
            }, 1e3), d("success");
          } catch {
            G({
              code: 0,
              message: `${l} loading Error: Probably the ROM is unsupported.`
            }), h.value = !0;
          }
        }
        if (Bi(N.buffer))
          dt(N.buffer);
        else {
          const I = new XMLHttpRequest();
          I.open("GET", l), I.overrideMimeType("text/plain; charset=x-user-defined"), I.onerror = () => {
            G({
              code: 404,
              message: `${l} loading Error: ${I.statusText}`
            });
          }, I.onload = function() {
            this.status === 200 ? (N.buffer = this.responseText, dt(N.buffer)) : G({
              code: 404,
              message: `${l} loading Error: ${I.statusText}`
            });
          }, I.send();
        }
        n.value && Ot(n.value), E();
      }).then(() => {
        Ce(), r("success");
      }, (d) => (f(d), d));
    }
    function g() {
      p.videoMode && Rt(), h.value || T(), c && (c = !1), k.init(), e.url && S();
    }
    function T() {
      h.value || (kt(), Ft(), clearInterval(R), p.reset(), k.init(), h.value = !0);
    }
    function M(l) {
      return l === void 0 ? f({
        code: 4,
        message: "TypeError: id is undefined."
      }) : !1;
    }
    function _t(l) {
      xe(l, f, e.url);
    }
    function li(l) {
      if (!M(l))
        try {
          localStorage.setItem(l, JSON.stringify(Pt(e.url))), r("saved", {
            id: l,
            message: "The state has been saved in localStorage",
            target: "localStorage"
          });
        } catch (m) {
          if (m.name === "QuotaExceededError")
            return f({
              code: 1,
              message: "Save Error: localStorage out of memory."
            });
        }
    }
    function ui(l) {
      if (M(l))
        return;
      const m = localStorage.getItem(l);
      if (!m)
        return f({
          code: 2,
          message: "Load Error: nothing to load."
        });
      _t(JSON.parse(m)), r("loaded", {
        id: l,
        message: "Loaded state from localStorage",
        target: "localStorage"
      });
    }
    function pi(l) {
      if (!M(l))
        try {
          u.set_item(l, Pt(e.url));
        } catch {
          f({
            code: 1,
            message: "Save Error: Unable to save data to indexedDB."
          });
        }
    }
    function fi(l) {
      M(l) || u.get_item(l).then((m) => {
        _t(m);
      });
    }
    function ci(l) {
      if (!M(l)) {
        if (!p.cpu.irqRequested || h.value)
          return f({
            code: 1,
            message: "Save Error: Can only be saved while the game is running."
          });
        e.storage ? li(l) : pi(l);
      }
    }
    function mi(l) {
      if (!M(l)) {
        if (!p.cpu.irqRequested || h.value)
          return f({
            code: 2,
            message: "Load Error: Can only be loaded when the game is running."
          });
        e.storage ? ui(l) : fi(l), c && xt();
      }
    }
    function _i(l) {
      M(l) || (e.storage ? localStorage.removeItem(l) : u.remove_item(l));
    }
    function Ri() {
      u.clear();
    }
    function xi(l, m) {
      if (!n.value || h.value)
        return;
      const d = me(n.value);
      return l && Xi(n.value, m), d;
    }
    function ht() {
      if (Gi(V, !1)) {
        f({
          code: 3,
          message: "FM2 Error: No fm2 scripts found."
        });
        return;
      }
      g(), p.videoMode = !0, P();
    }
    async function di(l, m = 0) {
      try {
        const G = await (await fetch(l)).text();
        yt(G, m);
      } catch (d) {
        return f({
          code: 4,
          message: "FM2 Error: Unable to load fm2 file."
        }), Promise.reject(d);
      }
      return ht;
    }
    function Rt() {
      p.videoMode = !1, p.controllers[1].state = C(8, 64), p.controllers[2].state = C(8, 64), E();
    }
    function Si(l, m = 0) {
      return yt(l, m), Promise.resolve(ht);
    }
    function gi(l) {
      k.parse(l);
    }
    function Ai(l) {
      k.disable(l);
    }
    function Ci() {
      k.init();
    }
    function Di() {
      c = !0, De();
    }
    function xt() {
      c = !1, be();
    }
    const bi = U(() => {
      const l = /^\d*$/;
      let m = e.width, d = e.height;
      return Oi(() => {
        n.value && Ot(n.value);
      }), l.test(String(m)) && (m += "px"), l.test(String(d)) && (d += "px"), `width: ${m};height: ${d};background-color: #000;margin: auto;position: relative;overflow: hidden;`;
    });
    return Y(() => e.url, () => {
      N.buffer = null, g();
    }), Y(
      () => e.gain,
      () => {
        Lt(e.gain);
      }
    ), Vt(() => {
      N.buffer = null, e.autoStart && S(), Lt(e.gain);
    }), Gt(() => {
      P(), T();
    }), i({
      start: S,
      reset: g,
      stop: T,
      pause: Di,
      play: xt,
      save: ci,
      load: mi,
      remove: _i,
      clear: Ri,
      screenshot: xi,
      fm2URL: di,
      fm2Text: Si,
      fm2Play: ht,
      fm2Stop: Rt,
      cheatCode: gi,
      cancelCheatCode: Ai,
      cancelCheatCodeAll: Ci
    }), (l, m) => (gt(), At("div", {
      style: Fi(bi.value)
    }, [
      Ct("canvas", {
        ref_key: "cvs",
        ref: n,
        width: Dt(et),
        height: Dt(st),
        style: { display: "inline-block" }
      }, null, 8, Te),
      Mi(Ct("div", Oe, null, 512), [
        [yi, h.value]
      ]),
      h.value ? (gt(), At("div", {
        key: 0,
        style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", cursor: "pointer", color: "#f8f4ed", "font-size": "20px" },
        onClick: m[0] || (m[0] = (d) => S())
      }, Pi(l.label), 1)) : vi("", !0)
    ], 4));
  }
}), D = {};
function v(t, i, s, e, r) {
  t.addEventListener(s, e, r), D[i] = D[i] || {}, D[i][s] = D[i][s] || [], D[i][s].push(e);
}
function Me(t, i) {
  D[i] && (Xt(D[i]).forEach((s) => {
    D[i][s].forEach((e) => {
      t.removeEventListener(s, e);
    }), delete D[i][s];
  }), delete D[i]);
}
function Bt(t) {
  return typeof t == "string" && (t = [t]), Array.from(new Set(t)).map((i) => i.toUpperCase()).sort();
}
const ke = (t, i) => {
  var h;
  if (!i.value)
    throw "[nes-vue] v-gamepad value is required";
  const s = ((h = i.arg) != null ? h : "").toLowerCase(), e = i.modifiers.p2 || i.modifiers.P2, r = e ? mt : ct;
  if (i.oldValue) {
    const u = Bt(i.oldValue).filter((R) => bt(R, r)), c = `gamepad-${`${s + (e ? "p2" : "p1")}-${u.join("-")}`}`;
    Me(t, c);
  }
  const a = Bt(i.value).filter((u) => bt(u, r)), n = `gamepad-${`${s + (e ? "p2" : "p1")}-${a.join("-")}`}`;
  a.length && (s === "touch" ? (v(t, n, "touchstart", () => {
    a.forEach((u) => {
      A(r[u], 65);
    });
  }), v(t, n, "touchend", () => {
    a.forEach((u) => {
      A(r[u], 64);
    });
  }), v(t, n, "touchcancel", () => {
    a.forEach((u) => {
      A(r[u], 64);
    });
  })) : (v(t, n, "mousedown", () => {
    a.forEach((u) => {
      A(r[u], 65);
    });
  }), v(t, n, "mouseup", () => {
    a.forEach((u) => {
      A(r[u], 64);
    });
  }), v(t, n, "mouseleave", () => {
    a.forEach((u) => {
      A(r[u], 64);
    });
  }), s && s !== "mouse" && console.warn("[nes-vue] argument should be mouse or touch, changed to default: mouse")));
};
export {
  ve as NesVue,
  p as nes,
  ke as vGamepad
};
