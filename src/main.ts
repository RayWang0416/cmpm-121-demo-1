import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The Most Boring Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//the button
const button = document.createElement("button_1");
button.innerHTML = "💎 The Best Button 💎";

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

app.append(button);

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

//the counter
let counter = 0;
const counterDiamond = document.createElement("div");

counterDiamond.innerHTML = `${counter} Diamonds💎`;
counterDiamond.style.marginTop = "20px";
counterDiamond.style.fontSize = "1rem";

app.append(counterDiamond);

button.addEventListener("click", () => {
  counter += 1;
  counterDiamond.innerHTML = `${counter} Diamonds💎`;
});

//the counter: diamond +1 each sec
setInterval(() => {
  counter += 1;
  counterDiamond.innerHTML = `${counter} Diamonds💎`;
}, 1000);