// const elLoading = document.querySelector(".arjs-loader");

// window.addEventListener("arjs-nft-loaded", (event) => {
//   elLoading.style.display = "none";
// });
import Modal from "./libs/modal.js";

const btnAR = document.querySelector(".btnar");
console.log(btnAR);

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

AFRAME.registerComponent("open-gift", {
  schema: {},
  init: function () {
    const el = this.el;
    el.addEventListener("touchstart", function () {
      console.log("bbb");

      el.setAttribute("animation-mixer", "clip:OpenChest; timeScale: 1;");
    });

    el.addEventListener("select", function () {
      console.log("bbb");
      el.setAttribute("animation-mixer", "clip:OpenChest; timeScale: 1;");
    });

    el.addEventListener("click", function () {
      alert("bbb");
      el.setAttribute("animation-mixer", "clip:OpenChest; timeScale: 1;");
    });

    el.addEventListener("mousedown", function () {
      alert("bbb");
      el.setAttribute("animation-mixer", "clip:OpenChest; timeScale: 1;");
    });
  },
});

async function load() {
  const welcomeModal = new Modal(document.getElementById("welcome-modal"));
  await welcomeModal.open();

  const mycam = document.querySelector("a-camera");

  mycam.setAttribute("wasd-controls", "enabled", "false");
  mycam.setAttribute("look-controls", "mouseEnabled", "false");
  mycam.setAttribute("look-controls", "touchEnabled", "false");
  mycam.setAttribute("look-controls", "true");
}

load();
