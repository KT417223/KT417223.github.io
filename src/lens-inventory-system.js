const createLensOrder = document.querySelector("#createLensOrder");
const resetLens = document.querySelector("#resetLens");
const lensState = document.querySelector("#lensState");
const orderState = document.querySelector("#orderState");
const alertCount = document.querySelector("#alertCount");
const orderedCount = document.querySelector("#orderedCount");
const secondOrderStatus = document.querySelector("#secondOrderStatus");
const modeButtons = [...document.querySelectorAll(".search-mode-grid button")];
const navItems = [...document.querySelectorAll(".side-nav a")];

function markOrdered() {
  lensState.textContent = "発注作成済み";
  orderState.textContent = "発注済み";
  alertCount.textContent = "6品目";
  orderedCount.textContent = "17 枚";
  secondOrderStatus.textContent = "発注済";
  secondOrderStatus.classList.remove("danger");
  secondOrderStatus.classList.add("warn");
}

function resetState() {
  lensState.textContent = "確認中";
  orderState.textContent = "発注候補";
  alertCount.textContent = "9品目";
  orderedCount.textContent = "14 枚";
  secondOrderStatus.textContent = "未発注";
  secondOrderStatus.classList.remove("warn");
  secondOrderStatus.classList.add("danger");
}

createLensOrder.addEventListener("click", markOrdered);
resetLens.addEventListener("click", resetState);

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    lensState.textContent = `${button.textContent.trim()}を表示中`;
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});
