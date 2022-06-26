import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
	findUrlWithProvider,
	getOembed,
	getOembedDataFromScraper,
	getOembedFromLink,
} from '../common/utils/helpers'

export let loader: LoaderFunction = async ({ request, params }) => {
	switch (request.method) {
		case 'GET': {
			const requestUrl = new URL(request.url)
			const _url = requestUrl.searchParams.get('url')
			const decodedUrl = decodeURIComponent(_url as string)

			// check if given url is in the oembed list
			// if available, use extract to get oembed data
			const { url, provider } = findUrlWithProvider(decodedUrl as string)
			let oembed = null
			if (provider) {
				oembed = await getOembed(url)
				if (oembed) return json({ oembed }, 200)
			}

			oembed = await getOembedFromLink(decodedUrl)
			if (oembed) return json({ oembed }, 200)

			oembed = await getOembedDataFromScraper(decodedUrl)
			if (oembed) return json({ oembed }, 200)

			return json({})
		}
	}
}
