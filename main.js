import Modal from "./libs/modal.js";

// VARIABLE GLOBAL
const btnAR = document.querySelector(".btnar");
const welcomeModel = document.getElementById("welcome-modal");
const ardiv = document.getElementById("AR");
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
      if (el.getAttribute("isClicked")) {
        alert("Model is clicked");
        return;
      }
      el.setAttribute("animation-mixer", "clip:Take 001; timeScale: 1;");

      await delay(2000);
      await welcomeModal.open();

      await delay(2000);
      el.setAttribute("animation-mixer", "clip: Static Pose");
      el.setAttribute("isClicked", true);
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

  welcomeModel.addEventListener("click", function (e) {
    console.log("Start AR");
    console.log(ardiv);

    const mycam = document.querySelector("a-camera");

    mycam.setAttribute("wasd-controls", "enabled", "false");
    mycam.setAttribute("look-controls", "mouseEnabled", "false");
    mycam.setAttribute("look-controls", "touchEnabled", "false");
    mycam.setAttribute("look-controls", "true");

    // const arScene = document.createElement("a-scene");
    // arScene.setAttribute("vr-mode-ui", "enabled", "false");
    // arScene.setAttribute(
    //   "arjs",
    //   "sourceType: webcam;debugUIEnabled: false; videoTexture: true;"
    // );
    // arScene.setAttribute("renderer", "logarithmicDepthBuffer", "true");
    // arScene.setAttribute("cursor", "rayOrigin: mouse; fuse: false");

    // ardiv.appendChild(arScene);
  });
}

load();
