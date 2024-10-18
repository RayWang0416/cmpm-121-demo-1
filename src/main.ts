import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The Most Boring Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

type Upgrade = {
  name: string;
  cost: number;
  rate: number;
  count: number;
  button?: HTMLButtonElement;
};

//the button style
function styleButton(button: HTMLButtonElement) {
  button.style.border = "1px solid black";
  button.style.lineHeight = "1.5";
  button.style.padding = "5px 10px";
  button.style.fontSize = "1rem";
  button.style.textAlign = "center";
  button.style.backgroundColor = "white";
  button.style.color = "black";
  button.style.outline = "none";
  button.style.borderRadius = "0";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "grey";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "white";
  });
}

//constants and variables for diamond counter
let counterTotalDiamond = 0;
let growthRateDiamond = 0;
const multiplyerDiamond = 1.15;
const upgradesDiamond: Upgrade[] = [
  { name: "1", cost: 10, rate: 0.1, count: 0 },
  { name: "2", cost: 100, rate: 2.0, count: 0 },
  { name: "3", cost: 1000, rate: 50.0, count: 0 },
];

//the +1 diamond button
const button = document.createElement("button");
button.innerHTML = "Diamond 💎";
styleButton(button);
app.append(button);

//the upgrade buttons
upgradesDiamond.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgrade.button = upgradeButton;
  upgradeButton.innerHTML = `Purchase Upgrade ${upgrade.name} (Cost: ${upgrade.cost} 💎)`;
  upgradeButton.disabled = true;
  styleButton(upgradeButton);
  app.append(upgradeButton);

  upgradeButton.addEventListener("click", () => {
    if (counterTotalDiamond >= upgrade.cost) {
      counterTotalDiamond -= upgrade.cost;
      upgrade.cost *= multiplyerDiamond;
      growthRateDiamond += upgrade.rate;
      upgrade.count++;
      updateCounterDisplay();
      updateStatusDisplay();
    }
  });
});

//the counter
const counterDiamond = document.createElement("div");
counterDiamond.innerHTML = `${counterTotalDiamond} 💎`;
counterDiamond.style.marginTop = "20px";
counterDiamond.style.fontSize = "1rem";

app.append(counterDiamond);

// Status display
const statusDisplay = document.createElement("div");
statusDisplay.style.marginTop = "20px";
statusDisplay.style.fontSize = "1rem";
app.append(statusDisplay);

//button click to increment counterClick
button.addEventListener("click", () => {
  counterTotalDiamond += 1;
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
  counterTotalDiamond += (elapsed / 1000) * growthRateDiamond;
  updateCounterDisplay();
  requestAnimationFrame(step);
}

//update the displayed counter
function updateCounterDisplay() {
  counterDiamond.innerHTML = `${counterTotalDiamond.toFixed(2)} 💎`;
  upgradesDiamond.forEach((upgrade) => {
    upgrade.button!.disabled = counterTotalDiamond < upgrade.cost;
  });
}

function updateStatusDisplay() {
  upgradesDiamond.forEach((upgrade) => {
    upgrade.button!.innerHTML = `Purchase Upgrade ${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)} Diamonds, Purchased: ${upgrade.count})`;
  });
  const statusText = `Current Diamond Growth Rate: ${growthRateDiamond.toFixed(2)} units/sec<br>`;
  statusDisplay.innerHTML = statusText;
}

requestAnimationFrame(step);
updateStatusDisplay();
