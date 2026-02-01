const DEFAULT_PIN = "1234";

const lockScreen = document.getElementById("lockScreen");
const app = document.getElementById("app");

function unlock() {
  const pin = document.getElementById("pinInput").value;
  if (pin === (localStorage.getItem("pin") || DEFAULT_PIN)) {
    lockScreen.classList.add("hidden");
    app.classList.remove("hidden");
  } else {
    alert("Wrong PIN");
  }
}

const datePicker = document.getElementById("datePicker");
datePicker.valueAsDate = new Date();

function saveEntry() {
  const date = datePicker.value;
  const text = document.getElementById("entry").value;

  if (!text) return;

  const diary = JSON.parse(localStorage.getItem("diary")) || {};
  diary[date] = text;
  localStorage.setItem("diary", JSON.stringify(diary));

  document.getElementById("entry").value = "";
  loadEntries();
}

function loadEntries() {
  const diary = JSON.parse(localStorage.getItem("diary")) || {};
  const entries = document.getElementById("entries");
  entries.innerHTML = "";

  Object.keys(diary).reverse().forEach(date => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `<b>${date}</b><br>${diary[date]}`;
    entries.appendChild(div);
  });
}

loadEntries();

// 🌙 Theme
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// 🤖 AI Prompt
const prompts = [
  "What made you smile today?",
  "What did you learn today?",
  "What are you grateful for?",
  "What can you improve tomorrow?"
];

document.getElementById("aiToggle").addEventListener("change", e => {
  document.getElementById("aiPrompt").innerText =
    e.target.checked ? prompts[Math.floor(Math.random() * prompts.length)] : "";
});
