export const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export function blob2base64(blob) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.onload = function () {
			resolve(this.result)
		}
		fileReader.readAsDataURL(blob)
	})
}

export const screenShort = async () => {
	const video = document.querySelector('video')

	const canvas = document
		.querySelector('a-scene')
		.components.screenshot.getCanvas('perspective')

	canvas.width = screen.width
	canvas.height = screen.height
	const imageWidth = video.videoHeight * (screen.width / screen.height)
	canvas
		.getContext('2d')
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
		)

	const dataUri = canvas.toDataURL('image/jpeg')

	console.log(dataUri)

	let aScene = document
		.querySelector('a-scene')
		.components.screenshot.getCanvas('perspective')

	aScene = resizeCanvas(aScene, canvas.width, canvas.height)

	await mergeImages([aScene, dataUri]).then((b64) => {
		return b64
	})
}

export function resizeCanvas(origCanvas, width, height) {
	let resizedCanvas = document.createElement('canvas')
	let resizedContext = resizedCanvas.getContext('2d')

	resizedCanvas.height = width
	resizedCanvas.width = height

	resizedContext.drawImage(origCanvas, 0, 0, width, height)
	return resizedCanvas.toDataURL()
}

export function snapshort() {
	const canvas = document
		.querySelector('a-scene')
		.components.screenshot.getCanvas('perspective')

	const url = canvas.toDataURL('image/jpeg', 0.8)

	ZapparWebGLSnapshot({
		data: url,
	})
}

export function captureVideoFrame(video, format, width, height) {
	if (typeof video === 'string') {
		video = document.querySelector(video)
	}
	format = format || 'jpeg'

	if (!video || (format !== 'png' && format !== 'jpeg')) {
		return false
	}
	const canvas = document.createElement('canvas')
	canvas.width = width || video.videoWidth
	canvas.height = height || video.videoHeight
	canvas.getContext('2d').drawImage(video, 0, 0)
	const dataUri = canvas.toDataURL('image/' + format)
	const data = dataUri.split(',')[1]
	const mimeType = dataUri.split(';')[0].slice(5)

	const bytes = window.atob(data)
	const buf = new ArrayBuffer(bytes.length)
	const arr = new Uint8Array(buf)

	for (const i = 0; i < bytes.length; i++) {
		arr[i] = bytes.charCodeAt(i)
	}
	const blob = new Blob([arr], {type: mimeType})
	return {
		blob: blob,
		dataUri: dataUri,
		format: format,
		width: canvas.width,
		height: canvas.height,
	}
}

export function takeSnapshot(video) {
	const resizedCanvas = document.createElement('canvas')
	const resizedContext = resizedCanvas.getContext('2d')
	const width = video.videoWidth
	const height = video.videoHeight
	const aScene = document
		.querySelector('a-scene')
		.components.screenshot.getCanvas('perspective')

	if (width && height) {
		resizedCanvas.width = width
		resizedCanvas.height = height
		resizedContext.drawImage(video, 0, 0, width, height)

		if (width > height) {
			resizedContext.drawImage(aScene, 0, 0, width, height)
		} else {
			const scale = height / width
			const scaledWidth = height * scale
			const marginLeft = (width - scaledWidth) / 2
			resizedContext.drawImage(aScene, marginLeft, 0, scaledWidth, height)
		}
		return resizedCanvas.toDataURL('image/png')
	}
}
