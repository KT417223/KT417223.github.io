const downloadCsv = document.querySelector("#downloadCsv");
const copyCsv = document.querySelector("#copyCsv");
const exportState = document.querySelector("#exportState");
const csvPreview = document.querySelector("#csvPreview");
const salesRows = document.querySelector("#salesRows");
const staffBars = document.querySelector("#staffBars");
const productBars = document.querySelector("#productBars");
const customerBars = document.querySelector("#customerBars");
const navItems = [...document.querySelectorAll(".side-nav a")];

const records = [
  { time: "10:15", staff: "佐藤", category: "遠近両用レンズ", customer: "再購入 / 60代", amount: 78200 },
  { time: "10:42", staff: "田中", category: "フレーム", customer: "新規 / 30代", amount: 28600 },
  { time: "11:05", staff: "佐藤", category: "遠近両用レンズ", customer: "再購入 / 50代", amount: 91200 },
  { time: "11:38", staff: "鈴木", category: "コンタクト", customer: "再購入 / 20代", amount: 13200 },
  { time: "12:10", staff: "田中", category: "単焦点レンズ", customer: "新規 / 40代", amount: 42600 },
  { time: "13:24", staff: "佐藤", category: "保証オプション", customer: "再購入 / 60代", amount: 6600 },
  { time: "14:18", staff: "鈴木", category: "キッズフレーム", customer: "新規 / 10代", amount: 34800 },
  { time: "15:02", staff: "田中", category: "遠近両用レンズ", customer: "再購入 / 70代", amount: 88600 },
  { time: "16:25", staff: "佐藤", category: "フレーム", customer: "新規 / 50代", amount: 39200 },
  { time: "17:05", staff: "鈴木", category: "コンタクト", customer: "再購入 / 30代", amount: 18800 },
];

const yen = new Intl.NumberFormat("ja-JP");

function groupBy(key) {
  return records.reduce((groups, record) => {
    groups[record[key]] = (groups[record[key]] || 0) + record.amount;
    return groups;
  }, {});
}

function renderBars(target, grouped) {
  const max = Math.max(...Object.values(grouped));
  target.innerHTML = Object.entries(grouped)
    .sort((a, b) => b[1] - a[1])
    .map(([label, amount]) => {
      const width = Math.max(8, Math.round((amount / max) * 100));
      return `
        <article class="analytics-bar">
          <div>
            <strong>${label}</strong>
            <span>${yen.format(amount)}円</span>
          </div>
          <i style="--bar-width: ${width}%"></i>
        </article>
      `;
    })
    .join("");
}

function csvText() {
  const header = ["time", "staff", "category", "customer", "amount"];
  const rows = records.map((record) =>
    [record.time, record.staff, record.category, record.customer, record.amount].join(","),
  );
  return [header.join(","), ...rows].join("\n");
}

function renderRows() {
  salesRows.innerHTML = records
    .map(
      (record) => `
        <tr>
          <td>${record.time}</td>
          <td>${record.staff}</td>
          <td>${record.category}</td>
          <td>${record.customer}</td>
          <td>${yen.format(record.amount)}円</td>
        </tr>
      `,
    )
    .join("");
}

function download(filename, text) {
  const blob = new Blob([`\uFEFF${text}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

copyCsv.addEventListener("click", () => {
  csvPreview.textContent = csvText();
  exportState.textContent = "Previewed";
});

downloadCsv.addEventListener("click", () => {
  download("optiflow-sales-analytics.csv", csvText());
  exportState.textContent = "Downloaded";
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});

renderRows();
renderBars(staffBars, groupBy("staff"));
renderBars(productBars, groupBy("category"));
renderBars(customerBars, groupBy("customer"));
csvPreview.textContent = csvText().split("\n").slice(0, 5).join("\n");
