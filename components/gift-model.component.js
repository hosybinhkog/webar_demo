AFRAME.registerComponent("open-gift", {
  schema: {},
  init: function () {
    const el = this.el;
    el.addEventListener("click", function () {
      el.setattribute("animation-mixer", "clip:OpenChest; timeScale: 1;");
    });
  },
});
