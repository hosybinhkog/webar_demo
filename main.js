import Modal from "./libs/modal.js";

// VARIABLE GLOBAL
const btnAR = document.querySelector(".btnar");
const welcomeModel = document.getElementById("welcome-modal");
const welcomeModal = new Modal(welcomeModel);

AFRAME.registerComponent("modify-materials", {
  init: function () {
    // Wait for model to load.
    this.el.addEventListener("model-loaded", () => {
      // Grab the mesh / scene.
      const obj = this.el.getObject3D("mesh");
      // Go over the submeshes and modify materials we want.
      obj.traverse((node) => {
        if (node.name.indexOf("ship") !== -1) {
          node.material.color.set("red");
        }
      });
    });
  },
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

AFRAME.registerComponent("open-gift", {
  schema: {},
  init: function () {
    const el = this.el;
    el.addEventListener("touchstart", function (e) {
      e.preventDefault();
      console.log("touchstart");

      el.setAttribute("animation-mixer", "clip:OpenChest; timeScale: 1;");
    });

    el.addEventListener("select", function (e) {
      e.preventDefault();
      console.log("select");

      el.setAttribute("animation-mixer", "clip:OpenChest; timeScale: 1;");
    });

    el.addEventListener("click", async function (e) {
      e.preventDefault();
      await delay(5000);
      await welcomeModal.open();

      el.setAttribute("animation-mixer", "clip:Take 001; timeScale: 1;");
    });

    el.addEventListener("mousedown", function (e) {
      e.preventDefault();
      el.setAttribute(
        "animation-mixer",
        "clip:OpenChest; timeScale: 1;loop:1000;"
      );
    });
  },
});

async function load() {
  await welcomeModal.open();

  const mycam = document.querySelector("a-camera");

  mycam.setAttribute("wasd-controls", "enabled", "false");
  mycam.setAttribute("look-controls", "mouseEnabled", "false");
  mycam.setAttribute("look-controls", "touchEnabled", "false");
  // mycam.setAttribute("look-controls", "true");

  AFRAME.registerComponent("cursor-listener", {
    init: function () {
      const element = this.el;

      this.el.addEventListener("mousedown", function (event) {
        console.log("bbb");
        element.setAttribute(
          "animation-mixer",
          "clip:OpenChest; timeScale: 1;"
        );
      });

      this.el.addEventListener("touchstart", function (event) {
        event.preventDefault();
        console.log("bbb");
        element.setAttribute(
          "animation-mixer",
          "clip:OpenChest; timeScale: 1;"
        );
      });

      this.el.addEventListener("click", function (event) {
        console.log("bbb");
        element.setAttribute(
          "animation-mixer",
          "clip:OpenChest; timeScale: 1;"
        );
      });
    },
  });
}

load();

AFRAME.registerComponent("raycaster-refresh", {
  init: function () {
    var sceneEl = this.el.sceneEl;
    sceneEl.addEventListener("object3dset", function () {
      var raycasterEl = sceneEl.querySelector("[raycaster]");
      raycasterEl.components.raycaster.refreshObjects();
    });
  },
});
