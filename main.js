import Modal from "./libs/modal.js";

import { delay, blob2base64 } from "./libs/method.js";

// VARIABLE GLOBAL
const btnAR = document.querySelector(".btnar");
const welcomeModel = document.getElementById("welcome-modal");
const successModel = new Modal(document.getElementById("success-modal"));
const failureModel = new Modal(document.getElementById("failure-modal"));
const ardiv = document.getElementById("AR");
const welcomeModal = new Modal(welcomeModel);
const scene = document.querySelector("a-scene");

const soundSuccess = document.querySelector("#soundSuccess");
const audioFailure = document.querySelector("#soundFailure");

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
      el.setAttribute("animation-mixer", "clip:Take 001; timeScale: 1;");

      await delay(2000);
      if (gift) {
        soundSuccess.components.sound.playSound();
        await successModel.open();
      } else {
        audioFailure.components.sound.playSound();
        await failureModel.open();
      }
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

  welcomeModel.addEventListener("click", async function (e) {
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

// DETECT AR HIT TEST --> ONLY ANDROID

// AFRAME.registerComponent("ar-hit-test", {
//   init: function () {
//     this.xrHitTestSource = null;
//     this.viewerSpace = null;
//     this.refSpace = null;

//     this.el.sceneEl.renderer.xr.addEventListener("sessionend", (ev) => {
//       this.viewerSpace = null;
//       this.refSpace = null;
//       this.xrHitTestSource = null;
//     });
//     this.el.sceneEl.renderer.xr.addEventListener("sessionstart", (ev) => {
//       let session = this.el.sceneEl.renderer.xr.getSession();

//       let element = this.el;
//       session.addEventListener("select", function () {
//         let position = element.getAttribute("position");

//         document.getElementById("dino").setAttribute("position", position);
//         document.getElementById("light").setAttribute("position", {
//           x: position.x - 2,
//           y: position.y + 4,
//           z: position.z + 2,
//         });
//       });

//       session.requestReferenceSpace("viewer").then((space) => {
//         this.viewerSpace = space;
//         session
//           .requestHitTestSource({ space: this.viewerSpace })
//           .then((hitTestSource) => {
//             this.xrHitTestSource = hitTestSource;
//           });
//       });

//       session.requestReferenceSpace("local-floor").then((space) => {
//         this.refSpace = space;
//       });
//     });
//   },
//   tick: function () {
//     if (this.el.sceneEl.is("ar-mode")) {
//       if (!this.viewerSpace) return;

//       let frame = this.el.sceneEl.frame;
//       let xrViewerPose = frame.getViewerPose(this.refSpace);

//       if (this.xrHitTestSource && xrViewerPose) {
//         let hitTestResults = frame.getHitTestResults(this.xrHitTestSource);
//         if (hitTestResults.length > 0) {
//           let pose = hitTestResults[0].getPose(this.refSpace);

//           let inputMat = new THREE.Matrix4();
//           inputMat.fromArray(pose.transform.matrix);

//           let position = new THREE.Vector3();
//           position.setFromMatrixPosition(inputMat);
//           this.el.setAttribute("position", position);
//         }
//       }
//     }
//   },
// });
