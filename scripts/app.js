import { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } from './config.js'

// Initialize Lenis
const lenis = new Lenis()
function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Accordion
const accordion = document.querySelector('.faq__item-title')

for (let i = 0; i < accordion?.length; i++) {
	accordion[i].addEventListener('click', () => {
		this.classList.toggle('active')
	})
}

// Accordion
document.querySelectorAll('.faq__item-title').forEach(title => {
	title.addEventListener('click', () => {
		const item = title.closest('.faq__item')
		const body = item.querySelector('.faq__item-body')

		item.classList.toggle('active')

		if (item.classList.contains('active')) {
			body.style.height = body.scrollHeight + 'px'
		} else {
			body.style.height = '0px'
		}
	})
})

// Scroll-To-Top
document.addEventListener('DOMContentLoaded', () => {
	const scrollBtn = document.querySelector('.scroll-to-top')

	window.addEventListener('scroll', () => {
		if (window.scrollY > 300) {
			scrollBtn.classList.add('active')
		} else {
			scrollBtn.classList.remove('active')
		}
	})

	scrollBtn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})
})

// Global Messages
document.addEventListener('DOMContentLoaded', () => {
	const btn = document.querySelector('.global__messengers-btn')
	const list = document.querySelector('.global-messengers__list')

	btn?.addEventListener('click', () => {
		btn.classList.toggle('active')
		list.classList.toggle('active')
	})
})

// Swiper
const swiperTariffs = new Swiper('.swiper--tariffs', {
	loop: true,
	spaceBetween: 16,
	slidesPerView: 4,
	speed: 600,
	lazy: true,
	// autoplay: { delay: 5000 },

	breakpoints: {
		0: {
			slidesPerView: 1
		},
		690: {
			slidesPerView: 2
		},
		1240: {
			slidesPerView: 4
		}
	},

	pagination: {
		el: '.swiper-pagination'
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
})

const swiperReviews = new Swiper('.swiper--reviews', {
	loop: true,
	spaceBetween: 30,
	slidesPerView: 2,
	speed: 600,
	// autoplay: { delay: 4000 },

	breakpoints: {
		0: {
			slidesPerView: 1
		},
		1120: {
			slidesPerView: 2
		}
	},

	pagination: {
		el: '.swiper-pagination'
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
})

const swiperPortfolio = new Swiper('.swiper--portfolio', {
	loop: true,
	spaceBetween: 30,
	slidesPerView: 2,
	speed: 500,
	// autoplay: { delay: 6000 },

	breakpoints: {
		0: {
			slidesPerView: 1
		},
		992: {
			slidesPerView: 2
		}
	},

	pagination: {
		el: '.swiper-pagination'
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
})

// Send message telegram
const forms = document.querySelectorAll('form')

forms.forEach(form => {
	form.addEventListener('submit', async e => {
		e.preventDefault()

		const name = form.querySelector('[name="name"]') || { value: '' }
		const phone = form.querySelector('[name="phone"]')
		const question = form.querySelector('[name="question"]') || form.querySelector('[name="comment"]') || { value: '' }
		const email = form.querySelector('[name="email"]') || { value: '' }
		const consent = form.querySelector('[name="consent"]')

		if (!phone?.value.trim()) {
			alert('Пожалуйста, заполните телефон.')
			return
		}

		if (consent && !consent.checked) {
			alert('Пожалуйста, дайте согласие на обработку данных.')
			return
		}

		const message = `
💜 Разработка+
------------------------------------
👤 Имя: ${name.value}
📧 Email: ${email.value}
📞 Телефон: ${phone.value}
❓ Вопрос: ${question.value}
-----------------------------------
🔐 Согласие: ${consent ? (consent.checked ? '✅' : '❌') : 'Нетребуется'}
		`

		await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: TELEGRAM_CHAT_ID,
				text: message
			})
		})

		form.reset()
	})
})

// ================= BURGER MENU =================
const burger = document.getElementById('burger')
const menu = document.getElementById('menu')
const close = document.getElementById('close')

burger.addEventListener('click', () => {
	menu.classList.add('active')
	document.body.style.overflow = 'hidden'
})

close.addEventListener('click', () => {
	menu.classList.remove('active')
	document.body.style.overflow = ''
})

// ================= POPUP =================
const overlay = document.getElementById('popupOverlay')
const closePopup = () => {
	overlay.classList.remove('active')
	setTimeout(() => (overlay.style.display = 'none'), 300)
}

document.querySelectorAll('.open-popup').forEach(btn => {
	btn.addEventListener('click', () => {
		overlay.style.display = 'flex'
		requestAnimationFrame(() => overlay.classList.add('active'))
	})
})

document.getElementById('popupClose')?.addEventListener('click', closePopup)
overlay.addEventListener('click', e => {
	if (e.target === e.currentTarget) closePopup()
})

// ================= PHONE MASK =================
document.querySelectorAll('.phone-input').forEach(input => {
	IMask(input, { mask: '+{7} (000) 000-00-00' })
})

AOS.init({
	disable: 'mobile',
	once: true,
	easing: 'ease-out'
})

lucide.createIcons()

document.addEventListener('DOMContentLoaded', () => {
	const body = document.querySelector('body')
	const cursor = document.getElementById('cursor')
	const aura = document.getElementById('aura')
	const links = document.getElementsByTagName('a')

	let mouseX = 0,
		mouseY = 0,
		posX = 0,
		posY = 0

	// Mouse coordinate tracking
	function mouseCoords(e) {
		mouseX = e.clientX
		mouseY = e.clientY
	}

	// Mouse move event
	body.addEventListener('mousemove', e => {
		mouseCoords(e)
		cursor.classList.remove('hidden')
		aura.classList.remove('hidden')
	})

	// Smooth cursor following animation
	gsap.to({}, 0.01, {
		repeat: -1,
		onRepeat: () => {
			posX += (mouseX - posX) / 5
			posY += (mouseY - posY) / 5

			gsap.set(cursor, {
				css: {
					left: mouseX,
					top: mouseY
				}
			})

			gsap.set(aura, {
				css: {
					left: posX,
					top: posY
				}
			})
		}
	})

	// Interactive elements hover effects
	const interactiveElements = [...links, ...document.getElementsByTagName('button')]

	for (let i = 0; i < interactiveElements.length; i++) {
		interactiveElements[i].addEventListener('mouseover', () => {
			cursor.classList.add('active')
			aura.classList.add('active')
		})

		interactiveElements[i].addEventListener('mouseout', () => {
			cursor.classList.remove('active')
			aura.classList.remove('active')
		})
	}

	// Hide cursor when mouse leaves the page
	body.addEventListener('mouseleave', () => {
		cursor.classList.add('hidden')
		aura.classList.add('hidden')
	})
})
