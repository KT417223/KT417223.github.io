const reserveContact = document.querySelector("#reserveContact");
const resetContact = document.querySelector("#resetContact");
const reserveState = document.querySelector("#reserveState");
const contactState = document.querySelector("#contactState");
const contactAlertCount = document.querySelector("#contactAlertCount");
const reservedBoxes = document.querySelector("#reservedBoxes");
const contactReservedRow = document.querySelector("#contactReservedRow");
const contactOrderState = document.querySelector("#contactOrderState");
const contactOrderStatus = document.querySelector("#contactOrderStatus");
const modeButtons = [...document.querySelectorAll(".search-mode-grid button")];
const navItems = [...document.querySelectorAll(".side-nav a")];

let reserved = 9;

function reserveBox() {
  reserved += 1;
  reservedBoxes.textContent = `${reserved} 箱`;
  contactReservedRow.textContent = "3箱";
  reserveState.textContent = "取り置き済み";
  contactState.textContent = "在庫更新済み";
  contactAlertCount.textContent = "7品目";
  contactOrderState.textContent = "補充候補";
  contactOrderStatus.textContent = "発注候補";
  contactOrderStatus.classList.remove("danger");
  contactOrderStatus.classList.add("warn");
}

function resetState() {
  reserved = 9;
  reservedBoxes.textContent = "9 箱";
  contactReservedRow.textContent = "2箱";
  reserveState.textContent = "受付中";
  contactState.textContent = "確認中";
  contactAlertCount.textContent = "6品目";
  contactOrderState.textContent = "発注候補";
  contactOrderStatus.textContent = "未発注";
  contactOrderStatus.classList.remove("warn");
  contactOrderStatus.classList.add("danger");
}

reserveContact.addEventListener("click", reserveBox);
resetContact.addEventListener("click", resetState);

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    contactState.textContent = `${button.textContent.trim()}を表示中`;
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});
