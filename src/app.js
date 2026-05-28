const tasks = [
  {
    title: "GitHub repository",
    body: "コード、Issue、PR、READMEを一箇所で管理する。",
    status: "Base",
  },
  {
    title: "Responsive UI",
    body: "スマホ、タブレット、PCで崩れにくいレイアウトを保つ。",
    status: "Ready",
  },
  {
    title: "Deploy path",
    body: "GitHub Pagesに載せやすい静的構成から始める。",
    status: "Next",
  },
];

const taskList = document.querySelector("#taskList");
const viewportSize = document.querySelector("#viewportSize");
const themeState = document.querySelector("#themeState");
const themeToggle = document.querySelector("#themeToggle");

function renderTasks() {
  taskList.innerHTML = tasks
    .map(
      (task) => `
        <div class="task-item">
          <span class="task-dot" aria-hidden="true"></span>
          <div>
            <h3>${task.title}</h3>
            <p>${task.body}</p>
          </div>
          <span class="task-badge">${task.status}</span>
        </div>
      `,
    )
    .join("");
}

function updateViewport() {
  viewportSize.textContent = `${window.innerWidth} x ${window.innerHeight}`;
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeState.textContent = theme === "dark" ? "Dark" : "Light";
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  setTheme(current === "dark" ? "light" : "dark");
});

window.addEventListener("resize", updateViewport);

renderTasks();
updateViewport();
setTheme(localStorage.getItem("theme") || "light");
