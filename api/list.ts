import type { VercelRequest, VercelResponse } from "@vercel/node";

/** 사용자 입력 오류를 표현 */
class BadRequestError extends Error {}

/** 서버 오류를 표현 */
class InternalServerError extends Error {}

/** 반환 값 */
interface Movie {
    title: string;
    year: string;
    imdbID: string;
    type: string;
    poster: string;
}

/** IMDB API의 반환 값 */
interface IMDBResponse {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

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
const fetchIMDBMovieList = async (title: string): Promise<Movie[]> => {
    let result;

    // CASE 1. Vercel 쪽에서 오류가 발생한 경우 (e.g. fetch가 없다거나 fetch 도중 오류)
    try {
        const res = await fetch(`${URL}&s=${title}`);
        result = await res.json();
    } catch (e) {
        console.log(e); // 예기치 못한 오류이기 때문에 디버깅 용도로 필요
        throw new InternalServerError("API 서버 오류가 발생했습니다.");
    }

    // CASE 2. 결과가 없는 경우
    if (result.Response === "False" || !result.Search) {
        return [];
    }

    // CASE 3. 정상 결과인 경우
    return result.Search.map((item: IMDBResponse) => ({
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
            throw new BadRequestError("검색어가 입력되지 않았습니다.");
        }

        if (request.query.searchKeyword instanceof Array) {
            throw new BadRequestError("검색어는 하나만 입력해주세요.");
        }

        const { searchKeyword } = request.query;
        const imdbApiResponse = await fetchIMDBMovieList(searchKeyword);
        response.status(200).json(imdbApiResponse);
    } catch (e) {
        if (e instanceof BadRequestError) {
            response.status(400).send(e.message);
            return;
        }

        response.status(500).send((e as Error).message);
    }
}
