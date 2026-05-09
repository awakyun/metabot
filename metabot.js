//起動がわかりやすいように色付け
document.getElementById("message").style.backgroundColor="#556b7c";

(() => {

// =====================
// 定数
// =====================

const BOT      = "[ℳeta bot]";
const PREFIXES = ["$", "!"];
const API      = "https://ss1.xrea.com/zinrostats.s205.xrea.com/log_search";
const MAX_LEN  = 240;
const MASTER   = "◆Awakun.0rvDl";

// GAS エンドポイント（Gemini APIキーローテーションはGAS側で管理）
const GAS_URL  = "https://script.google.com/macros/s/AKfycbwdM06YAG_vCTdUozid1ZVg4EAPegw7W5YQTAFDLB1C2QG2q4JHUZt4LzNIbcbgzOoV/exec";

// alter クールダウン（ms）- 連続リクエスト抑制
const ALTER_COOLDOWN = 4000;

// タイ文字など荒らし判定文字
const NG_CHARS = [
  "็","่","้","๊","๋","์","ํ","ฺ","ู","ุ","ื","ึ","ี","ิ",
  "ࣚ","ࣛ","ࣜ","ࣝ","ࣞ"
];

// =====================
// state
// =====================

const state = {
  processed  : new Set(),
  queue      : [],
  sending    : false,
  alter      : false,
  lastAlterAt: 0,

  // plData（永続化DB）
  db: (() => {
    const saved = localStorage.getItem("plData");
    if (saved) return JSON.parse(saved);
    return { adTrip: [], bTrip: [], banName: [], NGwrd: [], maxLen: 150 };
  })(),

  // meta_cfg（admin設定）
  config: (() => {
    const saved = localStorage.getItem("meta_cfg");
    if (saved) return JSON.parse(saved);
    return { adminTrips: [MASTER] };
  })()
};

// =====================
// utils
// =====================

const prefix   = (t) => PREFIXES.find(p => t.startsWith(p));
const normTrip = (t) => (t || "").replace(/^◆/, "");
const showTrip = (t) => `◆${normTrip(t)}`;

function saveDB() {
  localStorage.setItem("plData", JSON.stringify(state.db));
}

// =====================
// player
// g_players の構造: { [id]: { id, name, trip, ... } }
// =====================

const P = {
  get(name) {
    for (const key of Object.keys(g_players)) {
      const p = g_players[key];
      if (p && typeof p === "object" && p.name === name) return p;
    }
    return null;
  }
};

// =====================
// 権限チェック
// =====================

function isAdmin(name) {
  const p = P.get(name);
  if (!p) return false;
  return state.db.adTrip.includes(p.trip) ||
         state.config.adminTrips.includes(p.trip);
}

function isMaster(name) {
  const p = P.get(name);
  if (!p) return false;
  return p.trip === MASTER;
}

// =====================
// send（安定キュー）
// =====================

async function send(text) {
  const msg = (BOT + text).slice(0, MAX_LEN);
  state.queue.push(msg);
  if (state.sending) return;
  state.sending = true;
  while (state.queue.length) {
    const m = state.queue.shift();
    try {
      await fetch(
        `/m/player.php?mode=message&to_user=ALL&message=${encodeURIComponent(m)}`,
        { credentials: "include" }
      );
    } catch(e) {}
    await new Promise(r => setTimeout(r, 1200));
  }
  state.sending = false;
}

// =====================
// kick
// =====================

async function kickPlayer(targetName) {
  const p = P.get(targetName);
  if (!p) {
    await send(`Error: ${targetName} は存在しません。`);
    return;
  }
  if (isAdmin(targetName)) {
    await send(`Error: 管理者はkickできません。`);
    return;
  }
  const id   = String(p.id);
  const trip = p.trip || "";
  if (trip && trip !== "非公開" && !state.db.bTrip.includes(trip)) {
    state.db.bTrip.push(trip);
  }
  await fetch(
    `https://zinro.net/m/player.php?kick=${id}&name=${encodeURIComponent(targetName)}`,
    { credentials: "include" }
  );
  await send("粛聖！あわビ――――ムwwwww");
}

// =====================
// Gemini（GAS経由）
// =====================

async function callGemini(msg) {
  try {
    const url = GAS_URL + "?text=" + encodeURIComponent(msg);
    const res = await fetch(url);
    if (!res.ok) return "";
    return (await res.text()).trim();
  } catch(e) {
    return "";
  }
}

// =====================
// alter（AI自動モデレート）
// =====================

async function runAlter(from, msg, trip) {
  if (!state.alter) return;
  if (isAdmin(from)) return;
  if (trip === MASTER) return;

  const now = Date.now();
  if (now - state.lastAlterAt < ALTER_COOLDOWN) return;
  state.lastAlterAt = now;

  try {
    const result = await callGemini(msg);
    if (result.indexOf("アウト") !== -1) {
      await kickPlayer(from);
      await send("(´・ω・｀)");
    }
  } catch(e) {}
}

// =====================
// 自動モデレート
// =====================

async function autoModerate(from, msg, trip) {
  if (from === "鯖") return;
  if (isAdmin(from)) return;

  // NGワード
  for (const w of state.db.NGwrd) {
    if (msg.indexOf(w) !== -1) {
      await kickPlayer(from);
      return;
    }
  }

  // 長文
  if (msg.length >= state.db.maxLen) {
    await kickPlayer(from);
    return;
  }

  // タイ文字等
  if (NG_CHARS.some(c => msg.indexOf(c) !== -1)) {
    await kickPlayer(from);
    return;
  }

  // AI判定（alter ON時のみ）
  await runAlter(from, msg, trip);
}

// =====================
// 入室処理
// =====================

async function onEnter(newPL) {
  // g_players への反映を最大3秒待つ（入室直後は未登録のことがある）
  let p = null;
  for (let i = 0; i < 6; i++) {
    p = P.get(newPL);
    if (p) break;
    await new Promise(r => setTimeout(r, 500));
  }

  // それでも見つからない場合はトリップなしで挨拶だけ送る
  if (!p) {
    await send(`こんにちは、${newPL}さん。`);
    return;
  }

  const id   = String(p.id);
  const trip = p.trip || "";

  // BANトリップ
  if (state.db.bTrip.includes(trip)) {
    await fetch(
      `https://zinro.net/m/player.php?kick=${id}&name=${encodeURIComponent(newPL)}`,
      { credentials: "include" }
    );
    return;
  }

  // BAN名前
  for (const bn of state.db.banName) {
    if (newPL.indexOf(bn) !== -1 && !isAdmin(newPL)) {
      if (trip && !state.db.bTrip.includes(trip)) state.db.bTrip.push(trip);
      await fetch(
        `https://zinro.net/m/player.php?kick=${id}&name=${encodeURIComponent(newPL)}`,
        { credentials: "include" }
      );
      return;
    }
  }

  // 挨拶
  if (state.db.adTrip.includes(trip) || state.config.adminTrips.includes(trip)) {
    await send(`おかえりなさいませ、${newPL}(${trip})様。`);
  } else {
    await send(`こんにちは、${newPL}(${trip})さん。`);
  }
}

// =====================
// ログ分析
// =====================

async function fetchLogs(param) {
  const res  = await fetch(API + "?" + param);
  const json = await res.json();
  if (json.error) return [];
  return json.log_data || [];
}

function makeBlocks(hour, total) {
  return [
    [0,6],[6,12],[12,18],[18,24]
  ].map(([a,b]) => {
    const sum = hour.slice(a,b).reduce((x,y) => x+y, 0);
    const bar = "█".repeat(Math.max(1, Math.round(sum / Math.max(total,1) * 10)));
    return `${String(a).padStart(2,"0")}-${String(b).padStart(2,"0")}: ${bar}`;
  });
}

function analyzeByName(logs, targetName) {
  const tripMap = {};
  const hour    = new Array(24).fill(0);
  for (const l of logs) {
    const d = new Date(l.date);
    if (!isNaN(d)) hour[d.getHours()]++;
    for (const p of l.players) {
      if (p.name !== targetName) continue;
      const t = normTrip(p.trip);
      if (!t) continue;
      tripMap[t] = (tripMap[t] || 0) + 1;
    }
  }
  const topTrips = Object.entries(tripMap)
    .sort((a,b) => b[1]-a[1]).slice(0,3)
    .map(([t,c]) => `${showTrip(t)}:${c}`);
  return { topTrips, hour };
}

function analyzeByTrip(logs, targetTrip) {
  const nameMap = {};
  const hour    = new Array(24).fill(0);
  const t0      = normTrip(targetTrip);
  for (const l of logs) {
    const d = new Date(l.date);
    if (!isNaN(d)) hour[d.getHours()]++;
    for (const p of l.players) {
      if (normTrip(p.trip) !== t0) continue;
      nameMap[p.name] = (nameMap[p.name] || 0) + 1;
    }
  }
  const topNames = Object.entries(nameMap)
    .sort((a,b) => b[1]-a[1]).slice(0,3)
    .map(([n,c]) => `${n}:${c}`);
  return { topNames, hour };
}

function formatName(name, logs, a) {
  return [
    `${name}`, `logs:${logs.length}`,
    `T: ${a.topTrips.join(" ")}`, `act:`,
    ...makeBlocks(a.hour, logs.length)
  ].join("\n");
}

function formatTrip(trip, logs, a) {
  return [
    `${showTrip(trip)}`, `logs:${logs.length}`,
    `U: ${a.topNames.join(" ")}`, `act:`,
    ...makeBlocks(a.hour, logs.length)
  ].join("\n");
}

// =====================
// コマンドハンドラ
// =====================

const commands = [

  // info / infobn
  {
    match: cmd => cmd.startsWith("info ") || cmd.startsWith("infobn "),
    run: async (cmd, from) => {
      if (!isAdmin(from)) return;
      const arg  = cmd.split(" ").slice(1).join(" ");
      const logs = arg.startsWith("◆")
        ? await fetchLogs("trip=" + encodeURIComponent(arg))
        : await fetchLogs("name=" + encodeURIComponent(arg));
      if (!logs.length) { await send(`${arg} not found`); return; }
      if (arg.startsWith("◆")) {
        await send(formatTrip(arg, logs, analyzeByTrip(logs, arg)));
      } else {
        await send(formatName(arg, logs, analyzeByName(logs, arg)));
      }
    }
  },

  // kick
  {
    match: cmd => cmd.startsWith("kick "),
    run: async (cmd, from) => {
      if (!isAdmin(from)) return;
      await kickPlayer(cmd.slice(5).trim());
    }
  },

  // ban
  {
    match: cmd => cmd.startsWith("ban "),
    run: async (cmd, from) => {
      if (!isMaster(from)) return;
      const name = cmd.slice(4).trim();
      state.db.banName.push(name);
      await send(`${name} の入室を禁止しました。`);
    }
  },

  // addmin
  {
    match: cmd => cmd.startsWith("addmin "),
    run: async (cmd, from) => {
      if (!isMaster(from)) return;
      const trip = cmd.slice(7).trim();
      if (state.db.adTrip.includes(trip)) {
        await send(`${trip} はすでに管理者です。`);
      } else {
        state.db.adTrip.push(trip);
        await send(`${trip} に管理者権限を付与しました。`);
      }
    }
  },

  // remadmin
  {
    match: cmd => cmd.startsWith("remadmin "),
    run: async (cmd, from) => {
      if (!isMaster(from)) return;
      const trip = cmd.slice(9).trim();
      state.db.adTrip = state.db.adTrip.filter(t => t !== trip);
      await send(`${trip} から管理者権限を剥奪しました。`);
    }
  },

  // rembt
  {
    match: cmd => cmd.startsWith("rembt "),
    run: async (cmd, from) => {
      if (!isMaster(from)) return;
      const trip = cmd.slice(6).trim();
      state.db.bTrip = state.db.bTrip.filter(t => t !== trip);
      await send(`${trip} をBanTripから削除しました。`);
    }
  },

  // rembn
  {
    match: cmd => cmd.startsWith("rembn "),
    run: async (cmd, from) => {
      if (!isMaster(from)) return;
      const name = cmd.slice(6).trim();
      state.db.banName = state.db.banName.filter(n => n !== name);
      await send(`${name} をBanNameから削除しました。`);
    }
  },

  // addwrd
  {
    match: cmd => cmd.startsWith("addwrd "),
    run: async (cmd, from) => {
      if (!isMaster(from)) return;
      const word = cmd.slice(7).trim();
      state.db.NGwrd.push(word);
      await send(`「${word}」を禁止ワードに追加しました。`);
    }
  },

  // remwrd
  {
    match: cmd => cmd.startsWith("remwrd "),
    run: async (cmd, from) => {
      if (!isMaster(from)) return;
      const word = cmd.slice(7).trim();
      state.db.NGwrd = state.db.NGwrd.filter(w => w !== word);
      await send(`「${word}」を禁止ワードから削除しました。`);
    }
  },

  // maxlen
  {
    match: cmd => cmd.startsWith("maxlen "),
    run: async (cmd, from) => {
      if (!isAdmin(from)) return;
      const len = Number(cmd.slice(7).trim());
      if (!isNaN(len) && len > 0) {
        state.db.maxLen = len;
        await send(`${len} 文字以上の発言を規制します。`);
      }
    }
  },

  // alter / alter stop
  {
    match: cmd => cmd === "alter" || cmd === "alter stop",
    run: async (cmd, from) => {
      if (!isAdmin(from)) return;
      if (cmd === "alter" && !state.alter) {
        state.alter = true;
        await send("Alterパッチが適用されました。AIによる自動モデレートを開始します。");
      } else if (cmd === "alter stop" && state.alter) {
        state.alter = false;
        await send("Alterパッチが解除されました。");
      }
    }
  },

  // save all
  {
    match: cmd => cmd === "save all",
    run: async (cmd, from) => {
      if (!isMaster(from)) return;
      saveDB();
      await send("変更内容をセーブしました。");
    }
  },

  // admin list
  {
    match: cmd => cmd === "admin list",
    run: async (cmd, from) => {
      if (!isAdmin(from)) return;
      const all = [...new Set([...state.db.adTrip, ...state.config.adminTrips])];
      await send(`admins: ${all.length}人`);
    }
  },

  // script（masterのみ）
  {
    match: cmd => cmd.startsWith("script "),
    run: async (cmd, from) => {
      if (!isMaster(from)) return;
      try { eval(cmd.slice(7)); } catch(e) { await send(`script error: ${e.message}`); }
    }
  },

  // help
  {
    match: cmd => cmd === "help",
    run: async (cmd, from) => {
      await send("botのhelpはここにあります→https://1145141919.wiki.fc2.com/wiki/bothelp");
    }
  },

];

// =====================
// hook（コア）
// =====================

const original = g_message_json.push;

g_message_json.push = async function(...msgs) {

  for (const m of msgs) {

    if (!m?.id) continue;
    if (state.processed.has(m.id)) continue;
    state.processed.add(m.id);

    const text = m.message;
    const from = m.from_user;

    if (!text) continue;

    // 入室検知
    if (from === "鯖" && text.indexOf("さんが入室しました") !== -1) {
      const newPL = text.replace("さんが入室しました", "");
      await onEnter(newPL);
      continue;
    }

    // 自動モデレート
    const sender = P.get(from);
    const trip   = sender?.trip || "";
    await autoModerate(from, text, trip);

    // コマンド判定
    const pfx = prefix(text);
    if (!pfx) continue;

    const cmd = text.slice(pfx.length).trim();

    for (const handler of commands) {
      if (handler.match(cmd)) {
        await handler.run(cmd, from);
        break;
      }
    }
  }

  return original.apply(this, msgs);
};

console.log("[ℳeta bot] loaded ✓");
send("- 起動完了 -");

})();
