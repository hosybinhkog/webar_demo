export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function takeSnapshot(video) {
  var hiddenCanvas = document.querySelector("canvas"),
    context = hiddenCanvas.getContext("2d");

  var width = video.videoWidth,
    height = video.videoHeight;

  if (width && height) {
    hiddenCanvas.width = width;
    hiddenCanvas.height = height;

    context.drawImage(video, 0, 0, width, height);
    return hiddenCanvas.toDataURL("image/png");
  }
}

export function blob2base64(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      resolve(this.result);
    };
    fileReader.readAsDataURL(blob);
  });
}

export const screenShort = async () => {
  const video = document.querySelector("video");

  const canvas = document
    .querySelector("a-scene")
    .components.screenshot.getCanvas("perspective");

  canvas.width = screen.width;
  canvas.height = screen.height;
  const imageWidth = video.videoHeight * (screen.width / screen.height);
  canvas
    .getContext("2d")
    .drawImage(
      video,
      (video.videoWidth - imageWidth) / 2,
      0,
      imageWidth,
      video.videoHeight,
      0,
      0,
      screen.width,
      screen.height
    );

  var dataUri = canvas.toDataURL("image/jpeg");

  let aScene = document
    .querySelector("a-scene")
    .components.screenshot.getCanvas("perspective");

  aScene = resizeCanvas(aScene, canvas.width, canvas.height);
  console.log(aScene);
  await mergeImages([aScene, dataUri]).then((b64) => {
    return b64;
  });
};

export function resizeCanvas(origCanvas, width, height) {
  let resizedCanvas = document.createElement("canvas");
  let resizedContext = resizedCanvas.getContext("2d");

  resizedCanvas.height = width;
  resizedCanvas.width = height;

  resizedContext.drawImage(origCanvas, 0, 0, width, height);
  return resizedCanvas.toDataURL();
}
