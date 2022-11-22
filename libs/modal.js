const EventEmitter = THREE.EventDispatcher

export default class Modal extends EventEmitter {
	constructor(el) {
		super()
		this.el = el
		this.el.style.display = 'none'
		Array.from(this.el.getElementsByClassName('close')).forEach((el) =>
			el.addEventListener('click', this.close.bind(this))
		)
	}

	open() {
		this.el.style.display = 'block'
		this.bodyScroll =
			document.body.scrollTop || document.documentElement.scrollTop
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0
		document.body.style.marginTop = '-' + this.bodyScroll + 'px'
		document.body.style.overflow = 'hidden'
		this.dispatchEvent({type: 'open'})
		return new Promise((resolve) => this.addEventListener('close', resolve))
	}

	close(...args) {
		this.el.style.display = 'none'
		document.body.style.marginTop = ''
		document.body.style.overflow = ''
		document.body.scrollTop = this.bodyScroll
		document.documentElement.scrollTop = this.bodyScroll
		this.dispatchEvent({type: 'close', message: args})
	}
}
