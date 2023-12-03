import type { VercelRequest, VercelResponse } from '@vercel/node'

interface Movie {
  title: string
  year: string
  imdbID: string
  type: string
  poster: string
}

interface APIResponse {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const fetchMovie = async (title: string): Promise<Movie[]> => {
  const res = await fetch(
    `http://www.omdbapi.com/?i=tt3896198&apikey=8488a957&s=${title}`
  )
  const result = await res.json() // { 3개 필드 있음 }

  // imdb 쪽에서 어떤 이유로든 배열이 오지 않았음
  if (result.Response === 'False') {
    throw new Error()
  }

  // Movie[]
  return result.Search.map((item: APIResponse) => ({
    title: item.Title,
    year: item.Year,
    imdbID: item.imdbID,
    type: item.Type,
    poster: item.Poster
  }))
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (!request.query.searchKeyword) {
    throw new Error('bad request 400')
  }

  if (request.query.searchKeyword instanceof Array) {
    throw new Error('bad request 400')
  }

  const { searchKeyword } = request.query
  try {
    const imdbApiResponse = await fetchMovie(searchKeyword)
    response.status(200).json(imdbApiResponse)
  } catch {
    response.status(400).send('')
  }
}

//.env파일에 path 설정
// axios 써야됨
