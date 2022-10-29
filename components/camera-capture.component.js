AFRAME.registerComponent("custom-capture-btn", {
  init() {
    const btn = document.getElementById("recorder-button");
    btn.innerHTML = `<img id="icon" src=${require("../assets/images/camera.svg")}> Capture now`;
  },
});
