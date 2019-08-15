const electron = require("electron");
const rec = electron.remote.getGlobal("sharedObject").recorder;
const close = electron.remote.getGlobal("sharedObject").close;
const paste = electron.remote.getGlobal("sharedObject").paste;

function render() {
  const el = document.getElementById("list");

  const content = [];
  let r = 1;
  for (let i = rec.history.length - 1; i >= 0; i--) {
    const item = rec.history[i];
    content.push(`
        <li class="item" id="item-${i}">
        <span>${item}</span>
        <span class="index">${r}</span>
        </li>
        `);
    r++;
  }

  el.innerHTML = content.join("");

  document.body.addEventListener("click", evt => {
    if (evt.target.tagName === "LI") {
      const id = evt.target.id;
      const index = parseInt(id.split("-")[1]);
      paste(index);
    } else {
      debugger;
      close();
    }
  });

  window.addEventListener("keydown", evt => {
    const index = evt.keyCode - 48;
    if (index < 1 || index > rec.history.length) {
      close();
    }

    paste(rec.history.length - index);
  });
}

render();

return;
paste(rec.history.length - index);
index;
