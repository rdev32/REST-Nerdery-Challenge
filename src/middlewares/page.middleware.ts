import { Request } from 'express'

export function generatePagination(
  array: unknown[],
  page: number,
  limit: number,
  req: Request
): Page {
  const url: UrlStructure = {
    protocol: req.protocol,
    subdomain: req.get('host'),
    domain: req.originalUrl
  }

  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const results = {} as Page

  if (endIndex < array.length) {
    results.next = {
      page: page + 1,
      url: generateURL(url, this.page, limit)
    }
  }

  if (startIndex > 0) {
    results.prev = {
      page: page < 1 ? page : page - 1,
      url: generateURL(url, this.page, limit)
    }
  }

  results.data = array.slice(startIndex, endIndex)
  return results
}

function generateURL(path: UrlStructure, page: number, limit: number) {
  return new URL(`${path.protocol}://${path.subdomain}.${path.domain}/?page=${page}&limit=${limit}`)
}

interface Page {
  page: number
  limit: number
  next: {
    page: number
    url: URL
  }
  prev: {
    page: number
    url: URL
  }
  data: unknown
}

interface UrlStructure {
  protocol: string
  subdomain: string
  domain: string
}
