import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const GAME_NAME = "⛏️ World of Mine ⛏️";
document.title = GAME_NAME;

const header = document.createElement("h1");
header.innerHTML = GAME_NAME;
app.prepend(header);

type ResourceUpgrade = {
  name: string;
  cost: number;
  rateIncrease: number;
  purchases: number;
  buttonElement?: HTMLButtonElement;
};

type Resource = {
  total: number;
  growthRate: number;
  multiplier: number;
  upgrades: ResourceUpgrade[];
  icon: string;
  counterElement?: HTMLDivElement;
};

const resourceData: { [key: string]: Resource } = {
  diamond: {
    total: 0,
    growthRate: 0,
    multiplier: 1.15,
    icon: "💎",
    upgrades: [
      { name: "Pickaxe", cost: 10, rateIncrease: 0.1, purchases: 0 },
      { name: "Driller", cost: 100, rateIncrease: 2.0, purchases: 0 },
      { name: "Shield Tunneling Machine", cost: 1000, rateIncrease: 33, purchases: 0 }
    ]
  },
  iron: {
    total: 0,
    growthRate: 0,
    multiplier: 1.05,
    icon: "🪨",
    upgrades: [
      { name: "Pickaxe", cost: 5, rateIncrease: 0.3, purchases: 0 },
      { name: "Driller", cost: 50, rateIncrease: 6.0, purchases: 0 },
      { name: "Shield Tunneling Machine", cost: 500, rateIncrease: 50.0, purchases: 0 }
    ]
  },
  gold: {
    total: 0,
    growthRate: 0,
    multiplier: 1.10,
    icon: "🧈",
    upgrades: [
      { name: "Pickaxe", cost: 7.5, rateIncrease: 0.15, purchases: 0 },
      { name: "Driller", cost: 75, rateIncrease: 3.0, purchases: 0 },
      { name: "Shield Tunneling Machine", cost: 750, rateIncrease: 42, purchases: 0 }
    ]
  }
};

function applyStyleToButton(button: HTMLButtonElement) {
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

function createResourceButtons(resource: Resource) {
  const resourceButton = document.createElement("button");
  resourceButton.innerHTML = resource.icon;
  applyStyleToButton(resourceButton);
  app.append(resourceButton);

  resourceButton.addEventListener("click", () => {
    resource.total += 1;
    updateResourceDisplays();
  });

  resource.upgrades.forEach((upgrade) => {
    const upgradeButton = document.createElement("button");
    upgrade.buttonElement = upgradeButton;
    upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost} ${resource.icon})`;
    upgradeButton.disabled = true;
    applyStyleToButton(upgradeButton);
    app.append(upgradeButton);

    upgradeButton.addEventListener("click", () => {
      if (resource.total >= upgrade.cost) {
        resource.total -= upgrade.cost;
        upgrade.cost *= resource.multiplier;
        resource.growthRate += upgrade.rateIncrease;
        upgrade.purchases++;
        updateResourceDisplays();
      }
    });
  });

  const resourceCounter = document.createElement("div");
  resourceCounter.style.marginTop = "20px";
  resourceCounter.style.fontSize = "1rem";
  app.append(resourceCounter);
  resource.counterElement = resourceCounter;
}

function updateResourceDisplays() {
  Object.values(resourceData).forEach((resource) => {
    if (resource.counterElement) {
      resource.counterElement.innerHTML = `${resource.total.toFixed(2)} ${resource.icon}<br>Current Efficiency: ${resource.growthRate.toFixed(2)} units/sec<br>`;
      resource.upgrades.forEach((upgrade) => {
        if (upgrade.buttonElement) {
          upgrade.buttonElement.disabled = resource.total < upgrade.cost;
          upgrade.buttonElement.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)} ${resource.icon}, Purchased: ${upgrade.purchases})`;
        }
      });
    }
  });
}

let lastTimestamp: number | undefined;

function gameLoopStep(timestamp: number) {
  if (lastTimestamp === undefined) {
    lastTimestamp = timestamp;
  }
  const elapsedMillis = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  Object.values(resourceData).forEach(resource => {
    resource.total += (elapsedMillis / 1000) * resource.growthRate;
  });

  updateResourceDisplays();
  requestAnimationFrame(gameLoopStep);
}

// Create buttons for each resource
Object.values(resourceData).forEach((resource) => {
  createResourceButtons(resource);
});

requestAnimationFrame(gameLoopStep);