const scanQr = document.querySelector("#scanQr");
const clearSearch = document.querySelector("#clearSearch");
const lookupForm = document.querySelector("#lookupForm");
const lookupState = document.querySelector("#lookupState");
const scanLine = document.querySelector("#scanLine");
const selectedMember = document.querySelector("#selectedMember");
const memberRecord = document.querySelector("#memberRecord");
const modeButtons = [...document.querySelectorAll(".search-mode-grid button")];
const candidateCards = [...document.querySelectorAll(".candidate-card")];
const navItems = [...document.querySelectorAll(".side-nav a")];

function setState(text) {
  lookupState.textContent = text;
}

function runSearch(source) {
  setState(`${source}で検索中`);
  scanLine.textContent = `${source}で照合済み`;
  window.setTimeout(() => setState("検索待ち"), 1200);
}

function showMemberRecord(card) {
  selectedMember.textContent = card.dataset.memberLabel || card.dataset.member;
  memberRecord.hidden = false;
}

scanQr.addEventListener("click", () => {
  runSearch("QR");
});

lookupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runSearch("手入力");
});

clearSearch.addEventListener("click", () => {
  lookupForm.reset();
  setState("クリア済み");
  scanLine.textContent = "読取待ち";
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    setState(`${button.textContent.trim()}で検索`);
  });
});

candidateCards.forEach((card) => {
  card.addEventListener("click", () => {
    candidateCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    showMemberRecord(card);
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});
