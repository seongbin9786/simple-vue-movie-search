import type { VercelRequest, VercelResponse } from "@vercel/node";

interface Movie {
    title: string;
    year: string;
    imdbID: string;
    type: string;
    poster: string;
}

interface APIResponse {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

const INTERNAL_SERVER_ERROR = "500";
const BAD_REQUEST = "400";

// TODO: 테스트가 가능하려면 key 주입을 할 수 있는 형태가 필요
const { IMDB_API_HOST, IMDB_API_KEY } = process.env;
const URL = `${IMDB_API_HOST}/?apikey=${IMDB_API_KEY}`;

/**
 * IMDB 영화 목록 API를 요청한 결과를 반환한다.
 *
 * 결과가 없으면 400, 예외 발생 시 500을 반환한다.
 *
 * @param title 영화 제목
 * @returns 영화 목록 배열
 */
export const fetchIMDBMovieList = async (title: string): Promise<Movie[]> => {
    let result;

    // CASE 1. Vercel 쪽에서 오류가 발생한 경우 (e.g. fetch가 없다거나 fetch 도중 오류)
    try {
        const res = await fetch(`${URL}&s=${title}`);
        result = await res.json();
    } catch (e) {
        throw new Error(INTERNAL_SERVER_ERROR);
    }

    // CASE 2. 결과가 없는 경우
    if (result.Response === "False") {
        throw new Error(BAD_REQUEST);
    }

    // CASE 3. 결과 필드가 없는 경우
    if (!result.Search) {
        throw new Error(INTERNAL_SERVER_ERROR);
    }

    // CASE 4. 정상 결과인 경우
    return result.Search.map((item: APIResponse) => ({
        title: item.Title,
        year: item.Year,
        imdbID: item.imdbID,
        type: item.Type,
        poster: item.Poster,
    }));
};

/**
 * GET /api/list
 *
 * IMDB 영화 목록 API 요청을 대신 수행해 일관되지 않은 응답을 일관성 있게 래핑한다.
 *
 * 입력 오류 시 400, 서버 오류 시 500을 반환한다.
 *
 * 결과가 없을는 검색어 또한 입력 오류에 포함된다.
 */
export default async function handleMovieList(request: VercelRequest, response: VercelResponse) {
    try {
        if (!request.query.searchKeyword) {
            throw new Error(BAD_REQUEST);
        }

        if (request.query.searchKeyword instanceof Array) {
            throw new Error(BAD_REQUEST);
        }

        const { searchKeyword } = request.query;
        const imdbApiResponse = await fetchIMDBMovieList(searchKeyword);
        response.status(200).json(imdbApiResponse);
    } catch (e) {
        const statusCode = Number((e as Error).message);
        response.status(statusCode).send("");
    }
}

//.env파일에 path 설정
// axios 써야됨
