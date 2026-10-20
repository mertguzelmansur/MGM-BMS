/* MGM BMS – Android köprüsü.
   Masaüstündeki Python "Api" sınıfının (mgm_bms.py) JavaScript karşılığı. Arayüz (index.html) aynı
   window.pywebview.api.<metod>() çağrılarını kullanır; olaylar yine MGM.onEvent() ile iletilir.
   Bluetooth: @capacitor-community/bluetooth-le (Android yerel BLE). */
(function () {
"use strict";
const JK = window.JK;
const CAP = window.CAP || {};
const isNative = !!(CAP.Capacitor && CAP.Capacitor.isNativePlatform && CAP.Capacitor.isNativePlatform());
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const later = (ms, fn) => setTimeout(() => { try { const r = fn(); r && r.catch && r.catch(() => {}); } catch (e) { /* yut */ } }, ms);
const tsName = () => { const d = new Date(), p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}`; };

/* ============================================================ olay kanalı */
let ready = false; const buffer = [];
function emit(ev) {
  if (!ready || !window.MGM) { if (buffer.length < 200) buffer.push(ev); return; }
  try { window.MGM.onEvent(ev); } catch (e) { console.error(e); }
}
const strip = (d) => Object.fromEntries(Object.entries(d).filter(([k]) => !k.startsWith("_")));

/* ============================================================ BLE taşıyıcı (gerçek BMS) */
class BleTransport {
  constructor(onFrame, onDisconnect) {
    this.onFrame = onFrame; this.onDisconnect = onDisconnect;
    this.id = null; this.asm = new JK.FrameAssembler(); this.inited = false; this.lastCell = 0; this.ka = null; this.queue = Promise.resolve();
  }
  get B() { return CAP.BleClient; }
  async init() {
    if (!isNative || !this.B) throw new Error("Bluetooth yalnızca Android uygulamasında çalışır (tarayıcıda demo modunu kullanın)");
    if (!this.inited) { await this.B.initialize(); this.inited = true; }
    if (!(await this.B.isEnabled())) {
      try { await this.B.requestEnable(); } catch (e) { /* kullanıcı reddetti */ }
      if (!(await this.B.isEnabled())) throw new Error("Bluetooth kapalı – lütfen açın");
    }
  }
  async scan(seconds = 6) {
    await this.init();
    const found = new Map();
    await this.B.requestLEScan({ allowDuplicates: false }, (r) => {
      const name = r.localName || (r.device && r.device.name) || "";
      const uuids = (r.uuids || []).map(u => u.toLowerCase());
      const jk = uuids.includes(JK.SERVICE_UUID) || /^(JK|SQ)/i.test(name);
      found.set(r.device.deviceId, { jk, rssi: r.rssi ?? -999, name: name || "(isimsiz)", addr: r.device.deviceId });
    });
    await sleep(seconds * 1000);
    try { await this.B.stopLEScan(); } catch (e) { /* */ }
    return [...found.values()].sort((a, b) => (b.jk - a.jk) || (b.rssi - a.rssi));
  }
  async connect(id) {
    await this.init();
    this.asm = new JK.FrameAssembler();
    await this.B.connect(id, () => { this.id = null; clearInterval(this.ka); this.onDisconnect(); }, { timeout: 20000 });
    this.id = id;
    try { await this.B.requestConnectionPriority(id, 1); } catch (e) { /* yüksek öncelik isteği opsiyonel */ }
    await this.B.startNotifications(id, JK.SERVICE_UUID, JK.CHAR_UUID, (dv) => {
      const bytes = new Uint8Array(dv.buffer, dv.byteOffset, dv.byteLength);
      for (const f of this.asm.feed(bytes)) { if (f[4] === 2) this.lastCell = Date.now(); this.onFrame(f); }
    });
    await sleep(300);
    await this.write(JK.buildCommand(JK.CMD_DEVICE_INFO));
    await sleep(500);
    await this.write(JK.buildCommand(JK.CMD_SETTINGS_AND_DATA));
    this.lastCell = Date.now();
    clearInterval(this.ka);
    this.ka = setInterval(() => {                        // BMS 0x96'dan sonra sürekli 0x02 yollar; susarsa yinele
      if (this.id && Date.now() - this.lastCell > 6000) { this.lastCell = Date.now(); this.write(JK.buildCommand(JK.CMD_SETTINGS_AND_DATA)); }
    }, 2000);
  }
  async disconnect() {
    clearInterval(this.ka);
    if (this.id) { const id = this.id; this.id = null; try { await this.B.disconnect(id); } catch (e) { /* */ } }
  }
  write(bytes) {                                          // yazmaları sıraya koy (Android aynı anda tek GATT işlemi)
    const id = this.id; if (!id) return Promise.reject(new Error("Önce BMS'e bağlanın"));
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    this.queue = this.queue.then(async () => {
      api._raw("TX", bytes);
      try { await this.B.writeWithoutResponse(id, JK.SERVICE_UUID, JK.CHAR_UUID, dv); }
      catch (e) { await this.B.write(id, JK.SERVICE_UUID, JK.CHAR_UUID, dv); }
      await sleep(25);
    }).catch(e => emit({type: "error", text: "Yazma hatası: " + (e.message || e)}));
    return this.queue;
  }
}

/* ============================================================ demo BMS */
class DemoBms {
  constructor(onFrame) {
    this.onFrame = onFrame; this.t0 = Date.now();
    const [info, sett] = JK.makeDemoFrames(0);
    this.info = info.slice(); this.sett = sett.slice(); this.timer = null; this.paused = false;
  }
  fix(b) { b[299] = JK.sum8(b, 299); }
  emit(fr) { this.onFrame(fr.slice()); }
  start() { this.emit(this.info); this.emit(this.sett); this.timer = setInterval(() => this.tick(), 1000); }
  stop() { clearInterval(this.timer); }
  tick() {
    if (this.paused) return;
    const c = JK.makeDemoFrames((Date.now() - this.t0) / 1000)[2];
    c[6 + 192] = this.sett[6 + 112]; c[6 + 193] = this.sett[6 + 116]; this.fix(c); this.emit(c);
  }
  putStr(off, data) { const n = Math.min(data[5], 13); for (let i = 0; i < 16; i++) this.info[6 + off + i] = i < n ? data[6 + i] : 0; this.fix(this.info); }
  async sendLog() { this.paused = true; for (const f of JK.makeDemoLogFrames(30)) { await sleep(350); this.emit(f); } await sleep(300); this.paused = false; }
  write(data) {
    api._raw("TX", data);
    const cmd = data[4], ln = data[5];
    if (cmd === JK.CMD_SETTINGS_AND_DATA) later(250, () => this.emit(this.sett));
    else if (cmd === JK.CMD_DEVICE_INFO) later(250, () => this.emit(this.info));
    else if (cmd === JK.CMD_LOG) this.sendLog();
    else if (cmd === JK.CMD_RENAME) this.putStr(40, data);
    else if (cmd === 0x9C || cmd === 0xA0 || cmd === 0x9F) this.putStr({0x9C: 56, 0xA0: 112, 0x9F: 96}[cmd], data);
    else if (cmd === 0x68 || cmd === 0x69 || cmd === 0x6A) {
      const [ovp, uvp] = {0x68: [4200, 2800], 0x69: [3650, 2500], 0x6A: [2800, 1800]}[cmd];
      const dv = new DataView(this.sett.buffer); dv.setUint32(6 + 12, ovp, true); dv.setUint32(6 + 4, uvp, true); this.fix(this.sett);
    } else if (cmd >= 1 && cmd <= 0x22 && ln === 4) { const off = (cmd - 1) * 4; this.sett.set(data.subarray(6, 10), 6 + off); this.fix(this.sett); }
    else {
      const f = JK.T.ADV_FIELDS.find(x => x.reg === cmd && x.kind !== "ro");
      if (!f) return Promise.resolve();
      if (f.kind === "bit") {
        const val = data[6] ? 1 : 0;
        if (cmd === 107) { this.info[6 + 157] = (this.info[6 + 157] & ~8) | (val ? 8 : 0); this.fix(this.info); }
        else { const i = 6 + 281 + Math.floor(cmd / 8); this.sett[i] = (this.sett[i] & ~(1 << cmd % 8)) | (val << cmd % 8); this.fix(this.sett); }
      } else {
        const buf = f.src === "set" ? this.sett : this.info;
        buf.set(data.subarray(6, 6 + JK.SIZE[f.typ]), 6 + f.off); this.fix(buf);
      }
    }
    return Promise.resolve();
  }
}

/* ============================================================ dosya işlemleri */
async function saveAndShare(name, text, mime) {
  if (isNative && CAP.Filesystem) {
    const {Filesystem, Directory, Encoding, Share} = CAP;
    let uri;
    try { uri = (await Filesystem.writeFile({path: name, data: text, directory: Directory.Documents, encoding: Encoding.UTF8, recursive: true})).uri; }
    catch (e) { uri = (await Filesystem.writeFile({path: name, data: text, directory: Directory.Cache, encoding: Encoding.UTF8})).uri; }
    try { await Share.share({title: name, url: uri, dialogTitle: "Kaydet veya paylaş"}); } catch (e) { /* paylaşım iptal */ }
    return name;
  }
  const a = document.createElement("a");                         // tarayıcı: indir
  a.href = URL.createObjectURL(new Blob([text], {type: mime})); a.download = name; document.body.appendChild(a); a.click(); a.remove();
  return name;
}
function pickFile(accept) {
  return new Promise((resolve) => {
    const inp = document.createElement("input"); inp.type = "file"; inp.accept = accept; inp.style.display = "none";
    inp.onchange = () => { const f = inp.files && inp.files[0]; inp.remove(); if (!f) return resolve(null);
      const r = new FileReader(); r.onload = () => resolve({name: f.name, text: String(r.result)}); r.onerror = () => resolve(null); r.readAsText(f); };
    document.body.appendChild(inp); inp.click();
  });
}
const csvCell = (v) => { v = v === null || v === undefined ? "" : String(v); return /[;"\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
const csvRow = (a) => a.map(csvCell).join(";");

/* ============================================================ API (Python Api ile aynı yöntemler) */
const api = {
  _t: null, _demo: null, _connected: false, _settings: null, _info: null, _spay: null, _ipay: null, _adv: {},
  _pending: {}, _apending: {}, _log: null, _logRecs: [], _import: null, _csvRows: null,

  ready() { ready = true; const b = buffer.splice(0); b.forEach(emit); return true; },
  meta() {
    return {fields: JK.T.SETTING_FIELDS, adv: JK.advMeta(), have_ble: isNative, name_max: JK.NAME_MAX_LEN, version: "3.0",
            actions: Object.fromEntries(Object.entries(JK.T.ACTIONS).map(([k, v]) => [k, v[1]])), calibrations: JK.T.CALIBRATIONS, mobile: true};
  },
  async scan() {
    if (!this._t) this._t = new BleTransport(f => this._frame(f), () => this._disc());
    emit({type: "status", text: "Taranıyor…"});
    try { const devs = await this._t.scan(6); emit({type: "scan", devices: devs}); emit({type: "status", text: `${devs.length} cihaz bulundu`}); }
    catch (e) { emit({type: "error", text: "Tarama hatası: " + (e.message || e)}); }
    return true;
  },
  async connect(addr) {
    await this.demo(false);
    if (!this._t) this._t = new BleTransport(f => this._frame(f), () => this._disc());
    emit({type: "status", text: "Bağlanıyor…"});
    try {
      this._reset();
      await this._t.connect(addr);
      this._connected = true; emit({type: "connected", ok: true}); emit({type: "status", text: "Bağlandı – veriler isteniyor"});
    } catch (e) { emit({type: "error", text: "Bağlantı hatası: " + (e.message || e)}); emit({type: "connected", ok: false}); }
    return true;
  },
  async disconnect() { if (this._t) await this._t.disconnect(); this._disc(); return true; },
  _disc() { if (!this._connected) return; this._connected = false; this._reset(); emit({type: "connected", ok: false}); emit({type: "status", text: "Bağlantı kesildi"}); },
  async demo(on) {
    if (on && !this._demo) {
      if (this._connected) throw new Error("Demo için önce bağlantıyı kesin");
      this._reset(); this._demo = new DemoBms(f => this._frame(f)); emit({type: "demo", on: true}); this._demo.start();
    } else if (!on && this._demo) { this._demo.stop(); this._demo = null; this._reset(); emit({type: "demo", on: false}); }
    return !!this._demo;
  },

  /* ---------------- yazma */
  write_param(off, raw) {
    off = +off; raw = Math.trunc(raw);
    const fr = JK.buildSettingWrite(off, raw);
    this._pending[off] = [raw, Date.now()]; emit({type: "pending", off, state: "sent"});
    this._write(fr); later(600, () => this._write(JK.buildCommand(JK.CMD_SETTINGS_AND_DATA)));
    later(5000, () => this._pendingTimeout(off)); return true;
  },
  write_adv(key, raw) {
    if (this._isOld()) throw new Error("Eski protokollü (24S) BMS'te gelişmiş ayarlar desteklenmiyor");
    raw = Math.trunc(raw); const f = JK.ADV_BY_KEY[key], fr = JK.buildAdvWrite(key, raw);
    this._apending[key] = [raw, Date.now()]; emit({type: "apending", key, state: "sent"});
    this._write(fr);
    const ref = (f.src === "info" || f.reg === 107) ? JK.CMD_DEVICE_INFO : JK.CMD_SETTINGS_AND_DATA;
    later(600, () => this._write(JK.buildCommand(ref))); later(5000, () => this._apendingTimeout(key)); return true;
  },
  rename(name) { this._write(JK.buildRename(name)); later(1000, () => this._write(JK.buildCommand(JK.CMD_DEVICE_INFO))); return true; },
  set_string(kind, text, old = "") {
    if (!(kind in JK.T.STRING_CMDS)) throw new Error("Bilinmeyen alan");
    const cur = (this._info || {})[kind] || "";
    if ((kind === "device_password" || kind === "setting_password") && cur && old !== cur) throw new Error("Eski şifre yanlış");
    this._write(JK.buildStringCmd(kind, text)); later(1000, () => this._write(JK.buildCommand(JK.CMD_DEVICE_INFO))); return true;
  },
  action(name) {
    if (!(name in JK.T.ACTIONS)) throw new Error("Bilinmeyen işlem");
    this._write(JK.buildAction(name));
    if (name.startsWith("preset_")) later(1000, () => this._write(JK.buildCommand(JK.CMD_SETTINGS_AND_DATA)));
    return JK.T.ACTIONS[name][1];
  },
  calibrate(kind, raw) { this._write(JK.buildCalibration(kind, Math.trunc(raw))); return true; },
  sync_time() { this._write(JK.buildTimeSync()); return new Date().toLocaleString("tr-TR"); },
  refresh() { this._write(JK.buildCommand(JK.CMD_SETTINGS_AND_DATA)); later(500, () => this._write(JK.buildCommand(JK.CMD_DEVICE_INFO))); return true; },
  send_cmd(text) {
    const h = String(text).replace(/[^0-9a-fA-F]/g, "");
    let fr;
    if (h.length === 2) fr = JK.buildCommand(parseInt(h, 16));
    else if (h.length >= 4 && h.length % 2 === 0) fr = JK.fromHex(h);
    else throw new Error("Geçersiz hex komut");
    this._write(fr); return true;
  },

  /* ---------------- yedek / geri yükleme */
  async export_params() {
    if (!this._settings) throw new Error("Önce BMS'e bağlanın ve ayarların okunmasını bekleyin");
    const info = this._info || {}, raw = this._settings._raw;
    const data = {
      uygulama: "MGM BMS", surum: "3.0", tarih: new Date().toISOString().slice(0, 19), model: info.model, seri: info.serial, ad: info.name,
      parametreler: Object.fromEntries(JK.T.SETTING_FIELDS.map(f => [String(f[0]), raw[f[0]]])),
      gelismis: Object.fromEntries(Object.entries(this._adv).filter(([k]) => JK.ADV_BY_KEY[k].kind !== "ro")),
      okunabilir: Object.fromEntries(JK.T.SETTING_FIELDS.map(f => [f[1], (JK.fmtSetting(f[0], raw[f[0]]) + (f[4] ? " " + f[4] : ""))])),
    };
    return saveAndShare(`MGM_BMS_${(info.name || "yedek").replace(/ /g, "_")}_${tsName()}.json`, JSON.stringify(data, null, 2), "application/json");
  },
  async import_params() {
    if (!this._settings) throw new Error("Önce BMS'e bağlanın ve ayarların okunmasını bekleyin");
    const file = await pickFile(".json,application/json");
    if (!file) return null;
    let data; try { data = JSON.parse(file.text); } catch (e) { throw new Error("Dosya okunamadı (geçerli JSON değil)"); }
    if (data.uygulama !== "MGM BMS") throw new Error("Bu dosya bir MGM BMS yedeği değil");
    const changes = [], raw = this._settings._raw;
    for (const [o, v] of Object.entries(data.parametreler || {})) {
      const off = +o, f = JK.FIELD_BY_OFF[off];
      if (f && raw[off] !== v) changes.push({id: "p" + off, name: f[1], cur: this._fmtP(off, raw[off]), new: this._fmtP(off, v), raw: v});
    }
    if (!this._isOld()) for (const [k, v] of Object.entries(data.gelismis || {})) {
      const f = JK.ADV_BY_KEY[k];
      if (f && f.kind !== "ro" && this._adv[k] !== v) changes.push({id: "a" + k, name: f.name, cur: this._fmtA(f, this._adv[k]), new: this._fmtA(f, v), raw: v});
    }
    this._import = changes;
    return {file: file.name, model: data.model, date: data.tarih, changes, same_model: data.model === (this._info || {}).model};
  },
  apply_import() {
    const changes = this._import || []; this._import = null;
    if (!changes.length) return 0;
    (async () => {
      for (let i = 0; i < changes.length; i++) {
        const c = changes[i];
        try { this._write(c.id[0] === "p" ? JK.buildSettingWrite(+c.id.slice(1), c.raw) : JK.buildAdvWrite(c.id.slice(1), c.raw)); }
        catch (e) { emit({type: "toast", kind: "err", text: `${c.name}: ${e.message}`}); }
        emit({type: "import", done: i + 1, total: changes.length}); await sleep(350);
      }
      this._write(JK.buildCommand(JK.CMD_SETTINGS_AND_DATA)); await sleep(600);
      this._write(JK.buildCommand(JK.CMD_DEVICE_INFO)); await sleep(1200);
      const failed = changes.filter(c => !(c.id[0] === "p" ? this._settings && this._settings._raw[+c.id.slice(1)] === c.raw : this._adv[c.id.slice(1)] === c.raw)).map(c => c.name);
      emit({type: "import", finished: true, total: changes.length, failed});
    })();
    return changes.length;
  },

  /* ---------------- arıza kayıtları */
  download_log() {
    if (this._log && Date.now() - this._log.last < 8000) throw new Error("İndirme zaten sürüyor");
    this._log = {recs: new Map(), total: null, last: Date.now(), frames: 0};
    this._write(JK.buildCommand(JK.CMD_LOG)); later(10000, () => this._logWatchdog()); return true;
  },
  async save_log() {
    if (!this._logRecs.length) throw new Error("Önce kayıtları indirin");
    const rows = [["Zaman", "Olay", "Kod", "Şarj MOS", "Deşarj MOS", "Dengeleme", "Isıtma", "Maks hücre no", "Min hücre no", "Maks hücre V", "Min hücre V",
      "Batarya V", "Akım A", "Kalan Ah", "Tam Ah", "Maks sıcaklık", "Min sıcaklık", "MOS sıcaklık", "Isıtma akımı A"]];
    for (const r of this._logRecs) rows.push([r.time, r.event, r.code, ...["chg", "dsg", "bal", "heat"].map(k => r[k] ? "AÇIK" : "KAPALI"), r.max_no, r.min_no,
      r.max_v.toFixed(3), r.min_v.toFixed(3), r.voltage.toFixed(2), r.current.toFixed(1), r.remain_ah.toFixed(1), r.full_ah.toFixed(1), r.t_max, r.t_min, r.t_mos, r.heat_a.toFixed(1)]);
    return saveAndShare(`MGM_BMS_kayitlar_${tsName()}.csv`, "﻿" + rows.map(csvRow).join("\r\n"), "text/csv");
  },
  _logFinish(ok = true) {
    const lg = this._log; this._log = null; if (!lg) return;
    const recs = [...lg.recs.values()].sort((a, b) => b.ts - a.ts); this._logRecs = recs;
    if (!ok && !recs.length) emit({type: "log", state: "fail", text: "BMS kayıt göndermedi (bu model desteklemiyor olabilir)"});
    else emit({type: "log", state: "done", records: recs, total: lg.total});
  },
  _logWatchdog() { const lg = this._log; if (!lg) return; if (Date.now() - lg.last >= 4500) this._logFinish(lg.recs.size > 0); else later(1500, () => this._logWatchdog()); },

  /* ---------------- CSV (telefonda bellekte toplanır, kapatınca paylaşılır) */
  async csv(on) {
    if (on && !this._csvRows) {
      this._csvRows = [["zaman", "gerilim_V", "akim_A", "guc_W", "SOC_%", "kalan_Ah", "fark_V", "MOS_C", "T1_C", "T2_C", ...Array.from({length: 32}, (_, i) => `hucre${i + 1}`)]];
      emit({type: "toast", kind: "ok", text: "CSV kaydı başladı – kapattığınızda dosya kaydedilir"});
    } else if (!on && this._csvRows) {
      const rows = this._csvRows; this._csvRows = null;
      const f = await saveAndShare(`mgmbms_${tsName()}.csv`, "﻿" + rows.map(csvRow).join("\r\n"), "text/csv");
      emit({type: "toast", kind: "info", text: `CSV kaydedildi: ${f} (${rows.length - 1} satır)`});
    }
    return !!this._csvRows;
  },

  /* ---------------- iç işler */
  _isOld() { return !!(this._info && this._info.protocol === "eski (24S)"); },
  _reset() { this._pending = {}; this._apending = {}; this._settings = this._info = this._spay = this._ipay = null; this._adv = {}; this._log = null; this._old = false; },
  _fmtP(off, raw) { if (raw === undefined || raw === null) return "—"; const f = JK.FIELD_BY_OFF[off]; return (JK.fmtSetting(off, raw) + (f[4] ? " " + f[4] : "")).trim(); },
  _fmtA(f, raw) {
    if (raw === undefined || raw === null) return "—";
    if (f.kind === "bit") return raw ? "Açık" : "Kapalı";
    if (f.kind === "select") { const o = JK.T[f.options]; return raw >= 0 && raw < o.length ? o[raw] : String(raw); }
    const txt = f.scale === 1 ? String(raw) : (raw * f.scale).toFixed(f.scale === 0.1 ? 1 : 3);
    return (txt + " " + (f.unit || "")).trim();
  },
  _write(fr) {
    if (this._demo) return this._demo.write(fr);
    if (this._connected && this._t) return this._t.write(fr);
    throw new Error("Önce BMS'e bağlanın");
  },
  _raw(dir, bytes) { emit({type: "raw", dir, hex: JK.hex(bytes), len: bytes.length}); },
  _pendingTimeout(off) {
    const p = this._pending[off]; if (!p || Date.now() - p[1] < 4900) return; delete this._pending[off];
    const cur = this._settings ? this._settings._raw[off] : undefined;
    emit({type: "pending", off, state: "fail", text: `${JK.FIELD_BY_OFF[off][1]}: BMS değeri kabul etmedi` + (cur !== undefined ? ` (şu an ${JK.fmtSetting(off, cur)})` : "")});
  },
  _apendingTimeout(key) {
    const p = this._apending[key]; if (!p || Date.now() - p[1] < 4900) return; delete this._apending[key];
    const f = JK.ADV_BY_KEY[key];
    emit({type: "apending", key, state: "fail", text: `${f.name}: BMS değeri kabul etmedi (şu an ${this._fmtA(f, this._adv[key])})`});
  },
  _recomputeAdv() {
    if (this._isOld()) { emit({type: "adv", raw: {}, supported: false}); return; }
    this._adv = JK.parseAdvanced(this._spay, this._ipay);
    for (const [k, [want]] of Object.entries(this._apending)) if (this._adv[k] === want) {
      delete this._apending[k]; const f = JK.ADV_BY_KEY[k];
      emit({type: "apending", key: k, state: "ok", text: `${f.name} = ${this._fmtA(f, want)} kaydedildi`});
    }
    emit({type: "adv", raw: this._adv, supported: true});
  },
  _frame(fr) {
    this._raw("RX", fr);
    let t = fr[4];
    if (t === 3) {
      let info = JK.parseDeviceInfo(fr);
      this._old = JK.isOldProtocol(info);
      if (this._old) { info = JK.parseDeviceInfo(JK.oldToNew(fr)); info.protocol = "eski (24S)"; }
      this._info = info; this._ipay = info._payload;
      emit({type: "info", info: strip(info)}); this._recomputeAdv(); return;
    }
    if (t === 6) { this._logFrame(fr); return; }
    if (this._old) fr = JK.oldToNew(fr);
    if (t === 1) {
      const s = JK.parseSettings(fr); this._settings = s; this._spay = s._payload;
      for (const [o, [want]] of Object.entries(this._pending)) if (s._raw[o] === want) {
        delete this._pending[o];
        emit({type: "pending", off: +o, state: "ok", text: `${JK.FIELD_BY_OFF[o][1]} = ${JK.fmtSetting(+o, want)} kaydedildi`});
      }
      emit({type: "settings", raw: Object.fromEntries(Object.entries(s._raw).map(([k, v]) => [String(k), v]))});
      this._recomputeAdv();
    } else if (t === 2) {
      if (this._log && this._log.frames > 0) this._logFinish();
      const d = JK.parseCellInfo(fr); emit({type: "cells", d});
      if (this._csvRows) { const tt = d.temps;
        this._csvRows.push([new Date().toISOString().slice(0, 19), d.voltage.toFixed(3), d.current.toFixed(3), d.power.toFixed(1), d.soc,
          d.remain_ah.toFixed(3), d.delta_cell.toFixed(3), d.mos_temp, tt[0], tt[1], ...d.cells.map(c => c.toFixed(3))]); }
    }
  },
  _logFrame(fr) {
    const lg = this._log; if (!lg) return;
    const [total, recs] = JK.parseLogFrame(fr);
    lg.total = total; lg.frames++; lg.last = Date.now();
    for (const r of recs) lg.recs.set(`${r.ts}|${r.code}|${r.voltage}`, r);
    emit({type: "log", state: "progress", got: lg.recs.size, total});
    if (total && lg.recs.size >= total) this._logFinish();
  },
};

/* pywebview arayüzünü taklit et: yöntemler Promise döndürür, hatalar reddedilir */
const proxy = {};
for (const k of Object.keys(api)) if (!k.startsWith("_") && typeof api[k] === "function")
  proxy[k] = (...a) => { try { return Promise.resolve(api[k](...a)); } catch (e) { return Promise.reject(e); } };
window.pywebview = {api: proxy};
window.MGM_API = api;   // test için
// geri tuşu: açık pencereyi kapat
document.addEventListener("backbutton", () => { const m = document.querySelector("#modal .backdrop"); if (m) m.remove(); }, false);
window.dispatchEvent(new Event("pywebviewready"));
})();
