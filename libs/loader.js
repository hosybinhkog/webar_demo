export default class Loader {
  constructor(el, className = "loader") {
    this.loader = document.createElement("div");
    this.loader.className = className;
    this.hide();
    el.appendChild(this.loader);
  }

  show() {
    this.loader.style.display = "block";
  }

  hide() {
    this.loader.style.display = "none";
  }
}
