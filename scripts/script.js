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
