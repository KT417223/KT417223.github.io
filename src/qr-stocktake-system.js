const resetScan = document.querySelector("#resetScan");
const scanNext = document.querySelector("#scanNext");
const scanState = document.querySelector("#scanState");
const lastScanCode = document.querySelector("#lastScanCode");
const lastScanText = document.querySelector("#lastScanText");
const targetCategory = document.querySelector("#targetCategory");
const scannedCount = document.querySelector("#scannedCount");
const differenceCount = document.querySelector("#differenceCount");
const unreadCount = document.querySelector("#unreadCount");
const scanRate = document.querySelector("#scanRate");
const scanLogCount = document.querySelector("#scanLogCount");
const scanLog = document.querySelector("#scanLog");
const differenceList = document.querySelector("#differenceList");
const reviewState = document.querySelector("#reviewState");
const unreadState = document.querySelector("#unreadState");
const unreadGrid = document.querySelector("#unreadGrid");
const categoryButtons = [...document.querySelectorAll(".scan-actions button")];
const navItems = [...document.querySelectorAll(".side-nav a")];

const scanItems = [
  { qr: "QR-001", code: "FR-CL-4820-C1", category: "Frame", result: "OK", note: "台帳2本中 1本目" },
  { qr: "QR-002", code: "FR-CL-4820-C1", category: "Frame", result: "OK", note: "台帳2本中 2本目" },
  { qr: "QR-003", code: "FR-KD-4412", category: "Frame", result: "Short", note: "台帳3本に対して読取1本。残り確認" },
  { qr: "QR-004", code: "LN-167-PROG-R", category: "Lens", result: "Over", note: "台帳0枚に対して実在庫1枚" },
  { qr: "QR-005", code: "CL-1D-250", category: "Contact", result: "OK", note: "箱数一致" },
  { qr: "QR-006", code: "FR-OTHER-900", category: "Frame", result: "Mixed", note: "別棚または他店品番の可能性" },
];

let scanIndex = 0;
const scannedCodes = new Set();
const differences = [];

function statusClass(result) {
  if (result === "OK") return "ready";
  if (result === "Over") return "progress";
  return "waiting";
}

function updateUnreadCards() {
  [...unreadGrid.querySelectorAll("article")].forEach((card) => {
    card.classList.toggle("read", scannedCodes.has(card.dataset.code));
  });
}

function updateSummary() {
  const scanned = scanIndex;
  const unread = Math.max(0, 8 - scannedCodes.size);
  scannedCount.textContent = scanned;
  unreadCount.textContent = unread;
  differenceCount.textContent = differences.length;
  scanLogCount.textContent = `${scanned} scans`;
  unreadState.textContent = `${unread} remaining`;
  scanRate.textContent = `${Math.round((scannedCodes.size / 8) * 100)}% complete`;
  reviewState.textContent = differences.length > 0 ? "Needs review" : "Watching";
  updateUnreadCards();
}

function renderDifference(item) {
  if (differences.length === 1) {
    differenceList.innerHTML = "";
  }

  const article = document.createElement("article");
  article.innerHTML = `
    <span class="status ${statusClass(item.result)}">${item.result}</span>
    <strong>${item.code}</strong>
    <p>${item.note}</p>
  `;
  differenceList.append(article);
}

function appendScan(item) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.qr}</td>
    <td>${item.code}</td>
    <td>${item.category}</td>
    <td><span class="status ${statusClass(item.result)}">${item.result}</span></td>
  `;
  scanLog.append(row);
}

function runScan() {
  const item = scanItems[scanIndex % scanItems.length];
  scanIndex += 1;
  scannedCodes.add(item.code);

  scanState.textContent = item.result;
  lastScanCode.textContent = item.code;
  lastScanText.textContent = item.note;
  appendScan(item);

  if (item.result !== "OK") {
    differences.push(item);
    renderDifference(item);
  }

  updateSummary();
}

scanNext.addEventListener("click", runScan);

resetScan.addEventListener("click", () => {
  scanIndex = 0;
  scannedCodes.clear();
  differences.length = 0;
  scanLog.innerHTML = "";
  differenceList.innerHTML = `
    <article>
      <span class="status ready">OK</span>
      <strong>スキャン待ち</strong>
      <p>QRを読み込むと、差異がある品番だけここに表示されます。</p>
    </article>
  `;
  scanState.textContent = "Ready";
  lastScanCode.textContent = "Scan standby";
  lastScanText.textContent = "次のQRタグを読み込んでください。";
  updateSummary();
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    targetCategory.textContent = button.textContent;
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});

updateSummary();
