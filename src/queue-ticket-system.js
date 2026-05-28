const devicePress = document.querySelector("#devicePress");
const deviceButton = document.querySelector("#deviceButton");
const resetQueue = document.querySelector("#resetQueue");
const callNext = document.querySelector("#callNext");
const skipTicket = document.querySelector("#skipTicket");
const currentTicket = document.querySelector("#currentTicket");
const announcement = document.querySelector("#announcement");
const eventLog = document.querySelector("#eventLog");
const deviceState = document.querySelector("#deviceState");
const monitorState = document.querySelector("#monitorState");
const speakerState = document.querySelector("#speakerState");
const navItems = [...document.querySelectorAll(".side-nav a")];

let ticketNumber = 1;
let queue = ["A-001"];

function now() {
  return new Date().toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function addLog(text) {
  const item = document.createElement("li");
  item.innerHTML = `<time>${now()}</time><span>${text}</span>`;
  eventLog.prepend(item);
}

function formatTicket(number) {
  return `A-${String(number).padStart(3, "0")}`;
}

function refreshTicket() {
  currentTicket.textContent = queue[0] || "待機中";
  announcement.textContent = queue[0]
    ? `「${queue[0]}番でお待ちのお客様、受付カウンターまでお越しください」`
    : "現在、呼び出し待ちの番号はありません。";
}

function issueTicket() {
  ticketNumber += 1;
  const next = formatTicket(ticketNumber);
  queue.push(next);
  deviceState.textContent = "Input detected";
  monitorState.textContent = "Ticket issued";
  addLog(`物理ボタン入力を検知。番号札 ${next} を発券。`);
  refreshTicket();
  window.setTimeout(() => {
    deviceState.textContent = "Standby";
    monitorState.textContent = "Watching";
  }, 1200);
}

function callTicket() {
  if (!queue.length) {
    speakerState.textContent = "No queue";
    addLog("呼出待ちがないため、音声呼び出しを停止。");
    refreshTicket();
    return;
  }

  const called = queue.shift();
  speakerState.textContent = `Calling ${called}`;
  addLog(`販売員操作により ${called} を音声呼び出し。`);
  refreshTicket();
}

function skipCurrentTicket() {
  if (!queue.length) {
    addLog("不在スキップ対象なし。");
    return;
  }

  const skipped = queue.shift();
  addLog(`${skipped} を不在としてスキップ。`);
  refreshTicket();
}

function resetState() {
  ticketNumber = 1;
  queue = ["A-001"];
  deviceState.textContent = "Standby";
  monitorState.textContent = "Watching";
  speakerState.textContent = "Speaker ready";
  eventLog.innerHTML = `
    <li><time>${now()}</time><span>監視アプリ起動。物理デバイス接続を確認。</span></li>
    <li><time>${now()}</time><span>音声出力デバイスを確認。呼出準備完了。</span></li>
  `;
  refreshTicket();
}

[devicePress, deviceButton].forEach((button) => {
  button.addEventListener("click", issueTicket);
});

callNext.addEventListener("click", callTicket);
skipTicket.addEventListener("click", skipCurrentTicket);
resetQueue.addEventListener("click", resetState);

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});
