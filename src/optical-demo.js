const navItems = [...document.querySelectorAll(".side-nav a")];
const issueTicket = document.querySelector("#issueTicket");
const nextTicket = document.querySelector("#nextTicket");
const queueCount = document.querySelector("#queueCount");
const inventoryTabs = [...document.querySelectorAll(".inventory-tabs button")];

let ticketNumber = 21;
let waitingGroups = 7;

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});

issueTicket.addEventListener("click", () => {
  ticketNumber += 1;
  waitingGroups += 1;
  nextTicket.textContent = `B-${String(ticketNumber).padStart(3, "0")}`;
  queueCount.textContent = `${waitingGroups} 組`;
});

inventoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    inventoryTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
  });
});
