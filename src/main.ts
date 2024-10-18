import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "⛏️ World of Mine ⛏️";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.prepend(header);

type Upgrade = {
  name: string;
  cost: number;
  rate: number;
  count: number;
  button?: HTMLButtonElement;
};

//the button style
function styleButton(button: HTMLButtonElement) {
  button.style.width = "500px";
  button.style.height = "70px";
  button.style.border = "1px solid black";
  button.style.lineHeight = "1.5";
  button.style.fontSize = "1rem";
  button.style.textAlign = "center";
  button.style.backgroundColor = "white";
  button.style.color = "black";
  button.style.outline = "none";
  button.style.borderRadius = "0";
  button.style.display = "block";
  button.style.marginTop = "20px";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "grey";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "white";
  });
}

//constants and variables for diamond
let counterTotalDiamond = 0;
let growthRateDiamond = 0;
const multiplyerDiamond = 1.15;
const upgradesDiamond: Upgrade[] = [
  { name: "Pickaxe: upgrade your pickaxe and increase a little efficiency", cost: 10, rate: 0.1, count: 0 },
  { name: "Driller: upgrade your driller and increase a decent efficiency", cost: 100, rate: 2.0, count: 0 },
  { name: "Shield Tunneling Machine: upgrade your STM and increase a lot of efficiency", cost: 1000, rate: 33, count: 0 },
];

//constants and variables for iron
let counterTotalIron = 0;
let growthRateIron = 0;
const multiplyerIron = 1.05;
const upgradesIron: Upgrade[] = [
  { name: "Pickaxe: upgrade your pickaxe and increase a little efficiency", cost: 5, rate: 0.3, count: 0 },
  { name: "Driller: upgrade your driller and increase a decent efficiency", cost: 50, rate: 6.0, count: 0 },
  { name: "Shield Tunneling Machine: upgrade your STM and increase a lot of efficiency", cost: 500, rate: 50.0, count: 0 },
];

//constants and variables for gold
let counterTotalGold = 0;
let growthRateGold = 0;
const multiplyerGold = 1.10;
const upgradesGold: Upgrade[] = [
  { name: "Pickaxe: upgrade your pickaxe and increase a little efficiency", cost: 7.5, rate: 0.15, count: 0 },
  { name: "Driller: upgrade your driller and increase a decent efficiency", cost: 75, rate: 3.0, count: 0 },
  { name: "Shield Tunneling Machine: upgrade your STM and increase a lot of efficiency", cost: 750, rate: 42, count: 0 },
];

//the +1 iron button
const buttonIron = document.createElement("button");
buttonIron.innerHTML = "🪨";
styleButton(buttonIron);
app.append(buttonIron);

//the iron upgrade buttons
upgradesIron.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgrade.button = upgradeButton;
  upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost} 🪨)`;
  upgradeButton.disabled = true;
  styleButton(upgradeButton);
  app.append(upgradeButton);

  upgradeButton.addEventListener("click", () => {
    if (counterTotalIron >= upgrade.cost) {
      counterTotalIron -= upgrade.cost;
      upgrade.cost *= multiplyerIron;
      growthRateIron += upgrade.rate;
      upgrade.count++;
      updateCounterDisplay();
    }
  });
});

//the iron counter
const counterIron = document.createElement("div");
counterIron.innerHTML = `${counterTotalIron} 🪨`;
counterIron.style.marginTop = "20px";
counterIron.style.fontSize = "1rem";
app.append(counterIron);

//the +1 gold button
const buttonGold = document.createElement("button");
buttonGold.innerHTML = "🧈";
styleButton(buttonGold);
app.append(buttonGold);

//the gold buttons
upgradesGold.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgrade.button = upgradeButton;
  upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost} 🧈)`;
  upgradeButton.disabled = true;
  styleButton(upgradeButton);
  app.append(upgradeButton);

  upgradeButton.addEventListener("click", () => {
    if (counterTotalGold >= upgrade.cost) {
      counterTotalGold -= upgrade.cost;
      upgrade.cost *= multiplyerGold;
      growthRateGold += upgrade.rate;
      upgrade.count++;
      updateCounterDisplay();
    }
  });
});

//the gold counter
const counterGold = document.createElement("div");
counterGold.innerHTML = `${counterTotalGold} 🧈`;
counterGold.style.marginTop = "20px";
counterGold.style.fontSize = "1rem";
app.append(counterGold);

//the +1 diamond button
const buttonDiamond = document.createElement("button");
buttonDiamond.innerHTML = "💎";
styleButton(buttonDiamond);
app.append(buttonDiamond);

//the diamond upgrade buttons
upgradesDiamond.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgrade.button = upgradeButton;
  upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost} 💎)`;
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
    }
  });
});

//the diamond counter
const counterDiamond = document.createElement("div");
counterDiamond.innerHTML = `${counterTotalDiamond} 💎`;
counterDiamond.style.marginTop = "20px";
counterDiamond.style.fontSize = "1rem";
app.append(counterDiamond);

//button click to increment counterClick
buttonDiamond.addEventListener("click", () => {
  counterTotalDiamond += 1;
  updateCounterDisplay();
});

buttonIron.addEventListener("click", () => {
  counterTotalIron += 1;
  updateCounterDisplay();
});

buttonGold.addEventListener("click", () => {
  counterTotalGold += 1;
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
  counterTotalIron += (elapsed / 1000) * growthRateIron;
  counterTotalGold += (elapsed / 1000) * growthRateGold;
  updateCounterDisplay();
  requestAnimationFrame(step);
}

//update the displayed counter
function updateCounterDisplay() {
  counterDiamond.innerHTML = `${counterTotalDiamond.toFixed(2)} 💎<br>Current Diamond Efficiency: ${growthRateDiamond.toFixed(2)} units/sec<br>`;
  upgradesDiamond.forEach((upgrade) => {
    upgrade.button!.disabled = counterTotalDiamond < upgrade.cost;
    upgrade.button!.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)} 💎, Purchased: ${upgrade.count})`;
  });

  counterIron.innerHTML = `${counterTotalIron.toFixed(2)} 🪨<br>Current Iron Efficiency: ${growthRateIron.toFixed(2)} units/sec<br>`;
  upgradesIron.forEach((upgrade) => {
    upgrade.button!.disabled = counterTotalIron < upgrade.cost;
    upgrade.button!.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)} 🪨, Purchased: ${upgrade.count})`;
  });

  counterGold.innerHTML = `${counterTotalGold.toFixed(2)} 🧈<br>Current Gold Efficiency: ${growthRateGold.toFixed(2)} units/sec<br>`;
  upgradesGold.forEach((upgrade) => {
    upgrade.button!.disabled = counterTotalGold < upgrade.cost;
    upgrade.button!.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)} 🧈, Purchased: ${upgrade.count})`;
  });
}

requestAnimationFrame(step);
