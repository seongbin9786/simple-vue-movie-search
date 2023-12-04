import type { VercelRequest, VercelResponse } from "@vercel/node";
// .js를 붙이지 않으면 import 오류가 발생 (Error: Cannot find module '~~' imported from '~~')
import { InternalServerError } from "./_InternalServerError.js";
import { BadRequestError } from "./_BadRequestError.js";

/** 반환 값 */
interface MovieDetail {
    title: string;
    year: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    poster: string;
    production: string;
}

const { IMDB_API_HOST, IMDB_API_KEY } = process.env;

const URL = `${IMDB_API_HOST}/?apikey=${IMDB_API_KEY}`;

/**
 * IMDB 영화 목록 API를 요청한 결과를 반환한다.
 *
 * 결과가 없으면 400, 예외 발생 시 500을 반환한다.
 *
 * @param id 영화 ID
 * @returns 영화 상세
 */
const fetchIMDBMovieDetail = async (id: string): Promise<MovieDetail> => {
    let result;

    // CASE 1. Vercel 쪽에서 오류가 발생한 경우 (e.g. fetch가 없다거나 fetch 도중 오류)
    try {
        const res = await fetch(`${URL}&i=${id}`);
        result = await res.json();
    } catch (e) {
        console.log(e); // 예기치 못한 오류이기 때문에 디버깅 용도로 필요
        throw new InternalServerError("API 서버 오류가 발생했습니다.");
    }

    // CASE 2. 결과가 없는 경우
    if (result.Error === "Incorrect IMDb ID.") {
        throw new BadRequestError("존재하지 않는 ID 입니다.");
    }

    // CASE 3. 정상 결과인 경우
    return {
        title: result.Title,
        year: result.Year,
        released: result.Released,
        runtime: result.Runtime,
        genre: result.Genre,
        director: result.Director,
        writer: result.Writer,
        actors: result.Actors,
        plot: result.Plot,
        language: result.Language,
        country: result.Country,
        poster: result.Poster,
        production: result.Production,
    };
};

/**
 * GET /api/details
 *
 * IMDB 영화 상세 API 요청을 대신 수행해 일관되지 않은 응답을 일관성 있게 래핑한다.
 *
 * 입력 오류 시 400, 서버 오류 시 500을 반환한다.
 *
 * 결과가 없을는 검색어 또한 입력 오류에 포함된다.
 */
export default async function handleMovieDetail(request: VercelRequest, response: VercelResponse) {
    try {
        if (!request.query.id) {
            throw new BadRequestError("ID가 입력되지 않았습니다.");
        }

        if (request.query.id instanceof Array) {
            throw new BadRequestError("ID는 하나만 입력해주세요.");
        }

        const { id } = request.query;
        const imdbApiResponse = await fetchIMDBMovieDetail(id);
        response.status(200).json(imdbApiResponse);
    } catch (e) {
        if (e instanceof BadRequestError) {
            response.status(400).send(e.message);
            return;
        }

        response.status(500).send((e as Error).message);
    }
}
