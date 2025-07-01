// Установка cookie
function setCookie(name, value, days) {
	const expires = new Date()
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
	document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

// Получение cookie
function getCookie(name) {
	const nameEQ = name + '='
	const ca = document.cookie.split(';')
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) === ' ') c = c.substring(1, c.length)
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
	}
	return null
}

// Проверяем согласие на cookies при загрузке страницы
function checkCookieConsent() {
	const consent = getCookie('cookieConsent')
	const banner = document.getElementById('cookieBanner')

	if (!consent) {
		setTimeout(() => {
			banner.classList.add('show')
		}, 500)
	} else {
		banner.classList.remove('show')
	}
}

// Принять cookies
function acceptCookies() {
	setCookie('cookieConsent', 'accepted', 365)
	const banner = document.getElementById('cookieBanner')
	banner.classList.remove('show')
	initializeAnalytics()
}

// Инициализация аналитики после согласия
function initializeAnalytics() {
	initializeGoogleAnalytics()
	initializeYandexMetrika()
}

// Инициализация Google Analytics
function initializeGoogleAnalytics() {
	// Создаем и добавляем скрипт gtag
	const gtagScript = document.createElement('script')
	gtagScript.async = true
	gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-SLRDQD9TEG'
	document.head.appendChild(gtagScript)

	gtagScript.onload = function () {
		window.dataLayer = window.dataLayer || []
		function gtag() {
			dataLayer.push(arguments)
		}
		window.gtag = gtag
		gtag('js', new Date())
		gtag('config', 'G-SLRDQD9TEG')
	}
}

// Инициализация Яндекс.Метрики
function initializeYandexMetrika() {
	;(function (m, e, t, r, i, k, a) {
		m[i] =
			m[i] ||
			function () {
				;(m[i].a = m[i].a || []).push(arguments)
			}
		m[i].l = 1 * new Date()
		for (var j = 0; j < document.scripts.length; j++) {
			if (document.scripts[j].src === r) {
				return
			}
		}
		k = e.createElement(t)
		a = e.getElementsByTagName(t)[0]
		k.async = 1
		k.src = r
		a.parentNode.insertBefore(k, a)
	})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

	window.ym(103130277, 'init', {
		clickmap: true,
		trackLinks: true,
		accurateTrackBounce: true,
		webvisor: true
	})

	// Добавляем noscript для Яндекс.Метрики
	const noscript = document.createElement('noscript')
	noscript.innerHTML =
		'<div><img src="https://mc.yandex.ru/watch/103130277" style="position: absolute; left: -9999px" alt="" /></div>'
	document.body.appendChild(noscript)
}

// Запускаем проверку при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
	checkCookieConsent()

	// Если согласие уже есть, сразу инициализируем аналитику
	const consent = getCookie('cookieConsent')
	if (consent === 'accepted') {
		initializeAnalytics()
	}
})
