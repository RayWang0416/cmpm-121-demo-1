import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The Most Boring Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//variables for COUNTER
let counterClick = 0;
let counterFrame = 0;
let growthRate = 0;

//the button style
function styleButton(button: HTMLButtonElement) {
  button.style.border = "0";
  button.style.lineHeight = "2";
  button.style.padding = "20px 40px";
  button.style.fontSize = "1rem";
  button.style.textAlign = "center";
  button.style.color = "#fff";
  button.style.textShadow = "1px 1px 1px #000";
  button.style.borderRadius = "10px";
  button.style.backgroundColor = "black";
  button.style.backgroundImage =
    "linear-gradient(to top left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0))";
  button.style.boxShadow =
    "inset 2px 2px 3px rgba(255, 255, 255, 0.6), inset -2px -2px 3px rgba(0, 0, 0, 0.6)";
  button.style.outline = "none";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "grey";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "black";
  });

  button.addEventListener("mousedown", () => {
    button.style.boxShadow =
      "inset -2px -2px 3px rgba(255, 255, 255, 0.6), inset 2px 2px 3px rgba(0, 0, 0, 0.6)";
  });

  button.addEventListener("mouseup", () => {
    button.style.boxShadow =
      "inset 2px 2px 3px rgba(255, 255, 255, 0.6), inset -2px -2px 3px rgba(0, 0, 0, 0.6)";
  });
}

//the +1 diamond button
const button = document.createElement("button");
button.innerHTML = "💎 The Best Button 💎";
styleButton(button);
app.append(button);

//the upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Purchase Upgrade (Cost: 10 Diamonds)";
upgradeButton.disabled = true;
styleButton(upgradeButton);
app.append(upgradeButton);

upgradeButton.addEventListener("click", () => {
  if (getTotalCounter() >= 10) {
    counterClick -= 10;
    growthRate += 1;
    updateCounterDisplay();
  }
});

//the counter
const counterDiamond = document.createElement("div");

counterDiamond.innerHTML = `${counterClick} 💎`;
counterDiamond.style.marginTop = "20px";
counterDiamond.style.fontSize = "1rem";

app.append(counterDiamond);

//button click to increment counterClick
button.addEventListener("click", () => {
  counterClick += 1;
  updateCounterDisplay();
});

//continuous growth using requestAnimationFrame
let lastTimestamp: number | undefined;

function step(timestamp: number) {
  if (lastTimestamp === undefined) {
    lastTimestamp = timestamp;
  }
  const elapsed = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  counterFrame += (elapsed / 1000) * growthRate;
  updateCounterDisplay();
  requestAnimationFrame(step);
}

//update the displayed counter
function updateCounterDisplay() {
  const totalCounter = getTotalCounter();
  counterDiamond.innerHTML = `${totalCounter.toFixed(2)} 💎`;
  upgradeButton.disabled = totalCounter < 10;
}

function getTotalCounter() {
  return counterClick + counterFrame;
}

requestAnimationFrame(step);