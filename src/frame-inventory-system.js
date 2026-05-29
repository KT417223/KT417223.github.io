const scanFrame = document.querySelector("#scanFrame");
const scanFrameButton = document.querySelector("#scanFrameButton");
const resetFrame = document.querySelector("#resetFrame");
const allocateFrame = document.querySelector("#allocateFrame");
const releaseFrame = document.querySelector("#releaseFrame");
const frameScanState = document.querySelector("#frameScanState");
const stockState = document.querySelector("#stockState");
const allocationMessage = document.querySelector("#allocationMessage");
const allocatedQty = document.querySelector("#allocatedQty");
const availableQty = document.querySelector("#availableQty");
const tableAllocated = document.querySelector("#tableAllocated");
const tableAvailable = document.querySelector("#tableAvailable");
const navItems = [...document.querySelectorAll(".side-nav a")];

let allocated = 2;
const totalOwnStock = 10;

function renderStock(message = "在庫状態を更新しました。") {
  const available = totalOwnStock - allocated;
  allocatedQty.textContent = allocated;
  availableQty.textContent = available;
  tableAllocated.textContent = allocated;
  tableAvailable.textContent = available;
  allocationMessage.textContent = message;
  stockState.textContent = available <= 3 ? "残りわずか" : "販売可能";
}

function scanTag() {
  frameScanState.textContent = "読取済み";
  allocationMessage.textContent = "QRタグ FR-CL4820-C1 を読み取りました。自店・他店在庫を照合できます。";
  window.setTimeout(() => {
    frameScanState.textContent = "待機中";
  }, 1200);
}

function allocate() {
  if (allocated >= totalOwnStock) {
    renderStock("販売可能数がありません。他店舗在庫の取り寄せを確認してください。");
    return;
  }

  allocated += 1;
  renderStock("販売引当を1本追加しました。受注・加工完了まで在庫を確保します。");
}

function release() {
  if (allocated <= 0) {
    renderStock("解除できる引当はありません。");
    return;
  }

  allocated -= 1;
  renderStock("販売引当を1本解除しました。販売可能数へ戻します。");
}

function reset() {
  allocated = 2;
  frameScanState.textContent = "待機中";
  renderStock("初期状態に戻しました。");
}

[scanFrame, scanFrameButton].forEach((button) => {
  button.addEventListener("click", scanTag);
});

allocateFrame.addEventListener("click", allocate);
releaseFrame.addEventListener("click", release);
resetFrame.addEventListener("click", reset);

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});
