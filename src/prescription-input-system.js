const rxState = document.querySelector("#rxState");
const copyPrevious = document.querySelector("#copyPrevious");
const savePrescription = document.querySelector("#savePrescription");
const totalPd = document.querySelector("#totalPd");
const currentSummary = document.querySelector("#currentSummary");
const historyCount = document.querySelector("#historyCount");
const rxHistory = document.querySelector("#rxHistory");
const stepButtons = [...document.querySelectorAll(".exam-step-list button")];
const navItems = [...document.querySelectorAll(".side-nav a")];

const fields = {
  rSph: document.querySelector("#rSph"),
  rCyl: document.querySelector("#rCyl"),
  rAxis: document.querySelector("#rAxis"),
  rAdd: document.querySelector("#rAdd"),
  rPd: document.querySelector("#rPd"),
  lSph: document.querySelector("#lSph"),
  lCyl: document.querySelector("#lCyl"),
  lAxis: document.querySelector("#lAxis"),
  lAdd: document.querySelector("#lAdd"),
  lPd: document.querySelector("#lPd"),
};

const previousValues = {
  rSph: "-2.00",
  rCyl: "-0.75",
  rAxis: "180",
  rAdd: "1.50",
  rPd: "31.5",
  lSph: "-2.00",
  lCyl: "-0.50",
  lAxis: "170",
  lAdd: "1.50",
  lPd: "32.0",
};

function signed(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return "0.00";
  return `${number > 0 ? "+" : ""}${number.toFixed(2)}`;
}

function clampAxis(input) {
  const number = Number(input.value);
  if (Number.isNaN(number)) {
    input.value = 0;
    return;
  }
  input.value = Math.min(180, Math.max(0, Math.round(number)));
}

function updateSummary() {
  clampAxis(fields.rAxis);
  clampAxis(fields.lAxis);

  const pd = Number(fields.rPd.value) + Number(fields.lPd.value);
  const pdText = Number.isNaN(pd) ? "未入力" : `${pd.toFixed(1)} mm`;
  totalPd.textContent = pdText;

  currentSummary.textContent =
    `R ${signed(fields.rSph.value)} / ${signed(fields.rCyl.value)} x ${fields.rAxis.value} ADD ${signed(fields.rAdd.value)}、` +
    `L ${signed(fields.lSph.value)} / ${signed(fields.lCyl.value)} x ${fields.lAxis.value} ADD ${signed(fields.lAdd.value)}、` +
    `PD ${pdText}`;
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", updateSummary);
});

copyPrevious.addEventListener("click", () => {
  Object.entries(previousValues).forEach(([key, value]) => {
    fields[key].value = value;
  });
  rxState.textContent = "Previous copied";
  updateSummary();
});

savePrescription.addEventListener("click", () => {
  rxState.textContent = "Saved";
  const saved = document.createElement("article");
  saved.innerHTML = `
    <div>
      <strong>2026-05-29 確定処方</strong>
      <p>${currentSummary.textContent}</p>
    </div>
    <span class="status ready">保存済</span>
  `;
  rxHistory.prepend(saved);
  historyCount.textContent = `${rxHistory.children.length} records`;
});

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    stepButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    rxState.textContent = button.dataset.step;
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});

updateSummary();
