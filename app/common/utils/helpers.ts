import cheerio from 'cheerio'
import { extract, hasProvider } from 'oembed-parser'

export const findUrlWithProvider = (url: string) => {
	let provider

	// build up a list of URL variations to test against because the oembed
	// providers list is not always up to date with scheme or www vs non-www
	let baseUrl = url.replace(/^\/\/|^https?:\/\/(?:www\.)?/, '')
	let testUrls = [
		`http://${baseUrl}`,
		`https://${baseUrl}`,
		`http://www.${baseUrl}`,
		`https://www.${baseUrl}`,
	]

	for (let testUrl of testUrls) {
		provider = hasProvider(testUrl)
		if (provider) {
			url = testUrl
			break
		}
	}

	return { url, provider }
}

export const getOembed = async (url: string) => {
	try {
		const oembed = await extract(url)
		return oembed
	} catch (e) {
		console.trace(e)
		return null
	}
}

export const getOembedFromLink = async (url: string) => {
	// if provider is not in the list, then check to see if there's an oembed link tag
	const response = await fetch(url, {
		method: 'GET',
		redirect: 'follow',
	})
	const data = await response.text()
	try {
		const html = cheerio.parseHTML(data)
		const oembedUrl = cheerio(
			'link[type="application/json+oembed"]',
			html
		).attr('href')

		if (!oembedUrl) return null

		const oembedResponse = fetch(oembedUrl, {
			method: 'GET',
			redirect: 'follow',
		})

		console.log('response: ', oembedResponse)
		return {}
	} catch (e) {
		console.trace(e)
		return null
	}
}

export const getOembedDataFromScraper = async (url: string) => {
	const metascraper = require('metascraper')([
		require('metascraper-url')(),
		require('metascraper-title')(),
		require('metascraper-description')(),
		require('metascraper-author')(),
		require('metascraper-publisher')(),
		require('metascraper-image')(),
		require('metascraper-logo-favicon')(),
		require('metascraper-logo')(),
	])
	const response = await fetch(url, {
		method: 'GET',
		redirect: 'follow',
	})
	const data = await response.text()

	try {
		const html = cheerio.parseHTML(data)
		const scraperResponse = await metascraper({ html, url })
		const metadata = Object.assign({}, scraperResponse, {
			thumbnail: scraperResponse.image,
			icon: scraperResponse.logo,
		})

		delete metadata.image
		delete metadata.logo

		return {
			url,
			metadata,
		}
	} catch (e) {
		console.trace(e)
		return null
	}
}

export const getGreeting = (name: string) => {
	const hour = new Date().getHours()
	const firstName = name ? getFirstName(name) : ''

	if (hour >= 3 && hour < 6) return "Mornin' Sunshine!" // REALLY early
	if (hour >= 6 && hour < 12)
		return firstName ? `Good morning, ${firstName}!` : 'Good morning!' // After 6am
	if (hour >= 12 && hour < 17)
		return firstName ? `Good afternoon, ${firstName}!` : 'Good afternoon!' // After 12pm
	if (hour >= 17 && hour < 22)
		return firstName ? `Good evening, ${firstName}!` : 'Good evening!' // After 5pm
	if (hour >= 22 || hour < 3)
		return firstName ? `Go to bed, ${firstName}!` : 'Go to bed!' // After 10pm
}

export const getFirstName = (name: string) => {
	const names = name.split(' ')
	return names[0]
}
