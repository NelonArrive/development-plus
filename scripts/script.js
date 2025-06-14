import { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } from './config.js'

// Accordion
const accordion = document.querySelector('.faq__item-title')

for (i = 0; i < accordion.length; i++) {
	accordion[i].addEventListener('click', () => {
		this.classList.toggle('active')
	})
}

// Lucide Icons
lucide.createIcons()

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
	const messengers = document.querySelector('.global__messengers')
	const btn = document.querySelector('.global__messengers-btn')
	const list = document.querySelector('.global-messengers__list')

	btn.addEventListener('click', () => {
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
	autoplay: { delay: 5000 },

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
	autoplay: { delay: 4000 },

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
})

const swiperPortfolio = new Swiper('.swiper--portfolio', {
	loop: true,
	spaceBetween: 30,
	slidesPerView: 2,
	speed: 600,
	autoplay: { delay: 4000 },

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

		const name = form.querySelector('[name="name"]')
		const phone = form.querySelector('[name="phone"]')
		const question = form.querySelector('[name="question"]') || { value: '' }
		const comment = form.querySelector('[name="comment"]') || { value: '' }
		const consent = form.querySelector('[name="consent"]')

		if (!name.value.trim() || !phone.value.trim() || !consent.checked) {
			alert('Пожалуйста, заполните имя, телефон и дайте согласие.')
			return
		}

		const message = `
			📝 Новая заявка с формы:
			------------------------------------
			👤 Имя: ${name.value}
			📞 Телефон: ${phone.value}
			❓ Вопрос: ${question.value || comment.value}
			-----------------------------------
			🔐 Согласие: ${consent.checked ? '✅' : '❌'}
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
