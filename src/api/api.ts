export interface Movie {
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

  // Movie[]
  return result.Search.map((item: APIResponse) => ({
    title: item.Title,
    year: item.Year,
    imdbID: item.imdbID,
    type: item.Type,
    poster: item.Poster
  }))
}
