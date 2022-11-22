import Modal from "./libs/modal.js";

import { delay, takeSnapshot } from "./libs/method.js";

// VARIABLE GLOBAL
const btnAR = document.querySelector(".btnar");
const welcomeModel = document.getElementById("welcome-modal");
const successModel = new Modal(document.getElementById("success-modal"));
const failureModel = new Modal(document.getElementById("failure-modal"));
const ardiv = document.getElementById("AR");
const welcomeModal = new Modal(welcomeModel);
const scene = document.querySelector("a-scene");
const btnScreenShort = document.querySelector(".btn-screenshort");
const btnShareFacebook = document.querySelector(".btn-share");

const soundSuccess = document.querySelector("#soundSuccess");
const audioFailure = document.querySelector("#soundFailure");

const url = window.location.href;

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
  schema: {
    gift: { type: "boolean", default: "false" },
  },
  init: function () {
    const el = this.el;
    const gift = this.data.gift;
    el.addEventListener("click", async function (e) {
      e.preventDefault();
      if (el.getAttribute("isClicked")) {
        alert("Model is clicked");
        return;
      }
      el.setAttribute(
        "animation-mixer",
        "clip: *; timeScale: 1;loop: once; clampWhenFinished: true"
      );
      await delay(1000);
      if (gift) {
        soundSuccess.components.sound.playSound();
        await successModel.open();
      } else {
        audioFailure.components.sound.playSound();
        await failureModel.open();
      }
      el.setAttribute("isClicked", true);
    });

    el.addEventListener("mousedown", function (e) {
      e.preventDefault();
      el.setAttribute(
        "animation-mixer",
        "clip:OpenChest; timeScale: 1;loop:1000;"
      );
    });
    el.addEventListener("mousenter", function (e) {
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

  welcomeModel.addEventListener("click", async function (e) {
    console.log("Start AR");
    console.log(ardiv);

    const mycam = document.querySelector("a-camera");

    mycam.setAttribute("wasd-controls", "enabled", "false");
    mycam.setAttribute("look-controls", "mouseEnabled", "false");
    mycam.setAttribute("look-controls", "touchEnabled", "false");
    mycam.setAttribute("look-controls", "true");

    btnScreenShort.addEventListener("click", function (e) {
      e.preventDefault();

      const video = document.querySelector("video");
      const snap = takeSnapshot(video);

      console.log(snap);
    });

    btnShareFacebook.addEventListener("click", function () {
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" + url,
        "facebook-share-dialog",
        "width=800,height=600"
      );
      return false;
    });
  });
}

load();
